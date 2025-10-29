import React, { useState, useEffect, useCallback } from 'react';
import type { Task, ShoppingItem, Settings, DayOfWeek, Template } from './types';
import { db } from './services/db';
import { initialTasks, initialShoppingList, daysOfWeek, hostingTemplates } from './constants';
import Header from './components/Header';
import TaskList from './components/TaskList';
import ShoppingList from './components/ShoppingList';
import ActionsPanel from './components/ActionsPanel';
import Stats from './components/Stats';
import SettingsModal from './components/SettingsModal';
import Toast from './components/Toast';
import Welcome from './components/Welcome';
import TemplateSelector from './components/TemplateSelector';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [settings, setSettings] = useState<Settings>({
    userName: '',
    hostingDay: 'FRIDAY',
  });
  const [consecutiveWeeks, setConsecutiveWeeks] = useState(0);
  const [lastCompletionDate, setLastCompletionDate] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // Dark mode logic
    const hour = new Date().getHours();
    if (hour < 6 || hour >= 18) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const loadData = async () => {
      try {
        const [
          loadedTasks,
          loadedShoppingList,
          loadedSettings,
          loadedWeeks,
          loadedDate,
        ] = await Promise.all([
          db.get<Task[]>('tasks'),
          db.get<ShoppingItem[]>('shoppingList'),
          db.get<Settings>('settings'),
          db.get<number>('consecutiveWeeks'),
          db.get<string>('lastCompletionDate'),
        ]);

        setTasks(loadedTasks ?? initialTasks);
        setShoppingList(loadedShoppingList ?? initialShoppingList);
        if (loadedSettings?.userName) setSettings(loadedSettings);
        setConsecutiveWeeks(loadedWeeks ?? 0);
        setLastCompletionDate(loadedDate ?? null);
      } catch (error) {
        console.error("Failed to load data from IndexedDB", error);
        setTasks(initialTasks);
        setShoppingList(initialShoppingList);
      } finally {
        setIsDataLoaded(true);
      }
    };

    loadData();
  }, []);
  
  const handleSettingsSave = async (newSettings: Settings) => {
    setSettings(newSettings);
    await db.set('settings', newSettings);
    setIsSettingsOpen(false);
  };
  
  const checkConsecutiveWeeks = useCallback(async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (lastCompletionDate) {
        const lastDate = new Date(lastCompletionDate);
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 6 && diffDays <= 8) { // Allow for a bit of flexibility
            const newCount = consecutiveWeeks + 1;
            setConsecutiveWeeks(newCount);
            await db.set('consecutiveWeeks', newCount);
            setToastMessage(`כל הכבוד! ${newCount} שבועות של אירוח!`);
            setShowToast(true);
        } else if (diffDays > 8) {
            setConsecutiveWeeks(1); // Reset streak if more than a week passed
            await db.set('consecutiveWeeks', 1);
        }
    } else {
        setConsecutiveWeeks(1);
        await db.set('consecutiveWeeks', 1);
    }

    const todayString = today.toISOString();
    setLastCompletionDate(todayString);
    await db.set('lastCompletionDate', todayString);
  }, [consecutiveWeeks, lastCompletionDate]);


  const handleTaskToggle = async (id: number) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    await db.set('tasks', newTasks);

    const allCompleted = newTasks.every(task => task.completed);
    if(allCompleted) {
        checkConsecutiveWeeks();
    }
  };

  const handleShoppingItemToggle = async (id: number) => {
    const newShoppingList = shoppingList.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    setShoppingList(newShoppingList);
    await db.set('shoppingList', newShoppingList);
  };

  const handleCopyShoppingList = () => {
    const missingItems = shoppingList
      .filter((item) => !item.purchased)
      .map((item) => item.name)
      .join('\n');

    if (missingItems) {
      navigator.clipboard.writeText(missingItems);
      setToastMessage('רשימת הקניות הועתקה!');
      setShowToast(true);
    } else {
      setToastMessage('הכל נקנה, אין מה להעתיק!');
      setShowToast(true);
    }
  };

  const handleTemplateSelect = async (template: Template) => {
    // Removed window.confirm because it's blocked in the sandbox environment.
    const now = new Date().getTime();
    const newTasks: Task[] = template.tasks.map((task, index) => ({
      id: now + index,
      text: task.text,
      completed: false,
    }));
    const newShoppingList: ShoppingItem[] = template.shoppingItems.map(
      (item, index) => ({
        id: now + 1000 + index, // Add offset to avoid ID collision with tasks
        name: item.name,
        purchased: false,
      })
    );

    setTasks(newTasks);
    setShoppingList(newShoppingList);

    try {
      // Save sequentially for better stability
      await db.set('tasks', newTasks);
      await db.set('shoppingList', newShoppingList);

      setToastMessage('התבנית נטענה בהצלחה!');
      setShowToast(true);
    } catch (error) {
      console.error("Failed to save new template lists", error);
      setToastMessage('שגיאה בשמירת התבנית.');
      setShowToast(true);
    }
  };

  if (!isDataLoaded) {
    return <div className="flex items-center justify-center h-screen bg-brand-background dark:bg-brand-background-dark text-brand-text dark:text-brand-text-dark">טוען נתונים...</div>;
  }

  if (!settings.userName) {
    return <Welcome onSave={handleSettingsSave} />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Header userName={settings.userName} onSettingsClick={() => setIsSettingsOpen(true)} />
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TaskList tasks={tasks} onToggle={handleTaskToggle} />
            <ShoppingList
              items={shoppingList}
              onToggle={handleShoppingItemToggle}
              onCopy={handleCopyShoppingList}
            />
          </div>
          <div className="lg:col-span-1 space-y-8">
             <TemplateSelector templates={hostingTemplates} onSelect={handleTemplateSelect} />
             <Stats weeks={consecutiveWeeks} />
             <ActionsPanel hostingDay={daysOfWeek[settings.hostingDay]} />
          </div>
        </main>
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentSettings={settings}
        onSave={handleSettingsSave}
      />
      <Toast message={toastMessage} isVisible={showToast} onDismiss={() => setShowToast(false)} />
    </div>
  );
};

export default App;