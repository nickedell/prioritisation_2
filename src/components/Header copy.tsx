// src/components/Header.tsx

import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  // Add other props here if needed, with dummy functions
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  showDevTag: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-md text-gray-400">{subtitle}</p>
    </header>
  );
};

export default Header;