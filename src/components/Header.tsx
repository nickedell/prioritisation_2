import React, { useRef } from 'react';

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    onExportClick: () => void;
    onImportFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, onExportClick, onImportFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Read environment variables for debugging
    const branchName = import.meta.env.VITE_GIT_BRANCH;
    const context = import.meta.env.CONTEXT;
    const nodeEnv = import.meta.env.NODE_ENV;

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <div className="flex justify-end items-center mb-4 space-x-4">
                <button
                    onClick={handleImportClick}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                >
                    Import CSV
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onImportFileSelect}
                    className="hidden"
                    accept=".csv"
                />
                <button
                    onClick={onExportClick}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                >
                    Export CSV
                </button>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                >
                    <span className="text-sm font-medium">{darkMode ? 'Light Mode' :