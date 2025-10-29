
import React, { useState } from 'react';
import type { Settings } from '../types';

interface WelcomeProps {
    onSave: (settings: Settings) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onSave }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSave({ userName: name.trim(), hostingDay: 'FRIDAY' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-md text-center bg-white dark:bg-gray-800/50 p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-brand-text dark:text-brand-text-dark mb-2">ברוכים הבאים לשגרת האירוח!</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">בואו נתחיל בהיכרות קצרה. איך קוראים לך?</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="השם שלך"
                        className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary dark:bg-gray-700"
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 px-4 py-3 bg-brand-primary text-white font-bold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                        disabled={!name.trim()}
                    >
                        להתחיל
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Welcome;
