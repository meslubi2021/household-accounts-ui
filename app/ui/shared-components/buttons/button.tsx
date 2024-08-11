import { FC, ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <button
        className="mr-3 bg-red-300 text-white py-2 px-4 rounded hover:bg-red-400"
        >
        {children}
    </button>
  );
};