// src/components/Header.tsx

import React from 'react';
import { Sun, Moon } from 'lucide-react';

export interface HeaderProps {
  title: string;
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  onImport?: () => void;
  onExport?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, mode, toggleTheme, onImport, onExport }) => {
  return (
    <header className="bg-gray-900 text-white">
      {/* UPDATED: Changed padding from p-4 to px-6 py-4 to match page content */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-xl font-bold">
          {title}
        </h1>

        {/* Buttons Container */}
        <div className="flex items-center gap-4">
          {onImport && (
            <button 
              onClick={onImport}
              className="px-3 py-1.5 text-sm font-medium bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Upload CSV
            </button>
          )}
          {onExport && (
            <button 
              onClick={onExport}
              className="px-3 py-1.5 text-sm font-medium bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Download CSV
            </button>
          )}

          <button 
            onClick={toggleTheme}
            className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            aria-label="Toggle theme"
          >
            {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;