
import React, { useState, useEffect } from 'react';
import type { Settings, DayOfWeek } from '../types';
import { daysOfWeek } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: Settings;
  onSave: (newSettings: Settings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentSettings, onSave }) => {
  const [userName, setUserName] = useState(currentSettings.userName);
  const [hostingDay, setHostingDay] = useState<DayOfWeek>(currentSettings.hostingDay);

  useEffect(() => {
    if (isOpen) {
      setUserName(currentSettings.userName);
      setHostingDay(currentSettings.hostingDay);
    }
  }, [isOpen, currentSettings]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ userName, hostingDay });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md m-4">
        <h2 className="text-2xl font-bold mb-4 text-brand-text dark:text-brand-text-dark">הגדרות</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">שם המשתמש</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <div>
            <label htmlFor="hostingDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300">יום האירוח הקבוע</label>
            <select
              id="hostingDay"
              value={hostingDay}
              onChange={(e) => setHostingDay(e.target.value as DayOfWeek)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            >
              {Object.entries(daysOfWeek).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-reverse space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          >
            ביטול
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-brand-primary text-white rounded-md hover:opacity-90 transition"
          >
            שמירה
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
