import React from 'react';
import type { TextButtonProps } from '@/types/button';

const TextButton: React.FC<TextButtonProps> = ({
  onClick,
  colorClass = 'text-yellow-400 text-sm',
  label = 'Edit',
}) => {
  return (
    <button
      className={`font-bold text-sm uppercase hover:text-yellow-800 cursor-pointer transition duration-300 ${colorClass}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TextButton;
