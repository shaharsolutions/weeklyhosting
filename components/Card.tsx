
import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg animate-fade-in">
      {children}
    </div>
  );
};

export default Card;
