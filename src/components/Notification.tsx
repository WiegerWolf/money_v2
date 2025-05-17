import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  actionText?: string;
  onAction?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose, actionText, onAction }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white p-4 rounded-md shadow-lg max-w-md`}>
      <div className="flex flex-col">
        <div className="flex justify-between items-start">
          <p className="flex-grow mr-2">{message}</p>
          <button onMouseDown={onClose} className="ml-2 text-white hover:text-gray-200 text-2xl leading-none font-semibold outline-none focus:outline-none">
            &times;
          </button>
        </div>
        {actionText && onAction && (
          <div className="mt-2 pt-2 border-t border-white/50 flex justify-end">
            <button
              onMouseDown={onAction}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {actionText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};