
import React from 'react';
import type { Task } from '../types';
import Card from './Card';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
    </svg>
);

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle }) => {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">משימות השבוע</h2>
      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li key={task.id} className="flex items-center animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
            <label className="flex items-center cursor-pointer w-full">
              <div className="relative flex items-center">
                 <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                  className="peer appearance-none w-6 h-6 border-2 border-purple-300 dark:border-purple-600 rounded-md checked:bg-brand-primary checked:border-transparent focus:outline-none"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                    <CheckIcon />
                </div>
              </div>
              <span className={`ms-4 text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TaskList;
