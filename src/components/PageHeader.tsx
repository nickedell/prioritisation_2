// src/components/PageHeader.tsx

import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  showDevTag: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-md text-gray-400">{subtitle}</p>
    </header>
  );
};

export default PageHeader;