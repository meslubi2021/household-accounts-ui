import { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};