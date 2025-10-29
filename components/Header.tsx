import React from 'react';

interface HeaderProps {
  userName: string;
  onSettingsClick: () => void;
}

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61.22l2 3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ userName, onSettingsClick }) => {
  return (
    <header className="flex justify-between items-center animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-brand-text dark:text-brand-text-dark">שגרת אירוח שבועית</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">ברוך הבא, {userName}!</p>
      </div>
      <button 
        onClick={onSettingsClick}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
        aria-label="הגדרות"
      >
        <SettingsIcon />
      </button>
    </header>
  );
};

export default Header;