
import React from 'react';
import type { ShoppingItem } from '../types';
import Card from './Card';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggle: (id: number) => void;
  onCopy: () => void;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 me-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.5A1.125 1.125 0 0 1 4.875 6.375H7.5M15.75 17.25h3.375c.621 0 1.125-.504 1.125-1.125V4.125c0-.621-.504-1.125-1.125-1.125h-9.75a1.125 1.125 0 0 0-1.125 1.125v3.375m0 0V6.375m0 10.875H7.5m0 0H4.875m10.875 0H7.5" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
    </svg>
);

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onToggle, onCopy }) => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">רשימת קניות</h2>
        <button
          onClick={onCopy}
          className="flex items-center px-4 py-2 bg-brand-secondary text-brand-text rounded-lg hover:opacity-90 transition-opacity"
        >
          <CopyIcon />
          העתק חוסרים
        </button>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
            <label className="flex items-center cursor-pointer w-full">
               <div className="relative flex items-center">
                 <input
                  type="checkbox"
                  checked={item.purchased}
                  onChange={() => onToggle(item.id)}
                  className="peer appearance-none w-6 h-6 border-2 border-yellow-300 dark:border-yellow-600 rounded-md checked:bg-brand-secondary checked:border-transparent focus:outline-none"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                    <CheckIcon />
                </div>
              </div>
              <span className={`ms-4 text-lg ${item.purchased ? 'line-through text-gray-500' : ''}`}>
                {item.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ShoppingList;
