'use client';

import React, { useState, useEffect } from 'react';

interface ToggleButtonType {
    initial: boolean
    onToggle: (t: boolean) => void
}

export const ToggleButton:React.FC<ToggleButtonType> = ({ initial = false, onToggle }) => {
  const [enabled, setEnabled] = useState(() => initial);

  useEffect(() => {
    setEnabled(initial)
  }, [initial])

  const handleToggle = () => {
    setEnabled(!enabled);
    if (onToggle) {
      onToggle(!enabled);
    }
  };
  return (
    <button
      type="button"
      aria-pressed={enabled}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
        enabled ? 'bg-red-300' : 'bg-gray-300'
      }`}
      onClick={handleToggle}
    >
      <span
        className={`transform transition-transform inline-block w-4 h-4 bg-white rounded-full ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};