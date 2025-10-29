
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onDismiss }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in">
      {message}
    </div>
  );
};

export default Toast;
