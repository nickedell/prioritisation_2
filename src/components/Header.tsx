import React, { useRef } from 'react';

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    onExportClick: () => void;
    onImportFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, onExportClick, onImportFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    // --- START DEBUGGING CODE ---
    // We will now try to display the environment variables directly on the page.
    const branchName = import.meta.env.VITE_GIT_BRANCH;
    const context = import.meta.env.CONTEXT;
    const nodeEnv = import.meta.env.NODE_ENV;
    // --- END DEBUGGING CODE ---

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
                    <span className="text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                        <div className={`w-3 h-3 rounded-full absolute top-0.5 transition-transform ${darkMode ? 'bg-white translate-x-4' : 'bg-gray-600 translate-x-0.5'}`} />
                    </div>
                </button>
            </div>
            <div className="mb-8">
                <div className="flex items-center gap-4">
                    <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>TOM Prioritisation Tool</h1>
                    {/* The original tag logic remains here for now */}
                    {branchName === 'dev' && (
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full -translate-y-1">
                            #dev
                        </span>
                    )}
                </div>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Score each dimension on a 1-5 scale. The tool will automatically calculate priorities and apply special filters.</p>
            </div>

            {/* --- NEW DEBUGGING UI --- */}
            <div className="fixed bottom-0 left-0 bg-yellow-400 text-black p-4 z-50 w-full text-xs">
                <h3 className="font-bold text-lg">Debug Info: