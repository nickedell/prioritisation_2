import React from 'react';

interface HeaderProps {
    title: string;
    subtitle: string;
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    showDevTag?: boolean; // New optional prop
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, darkMode, setDarkMode, showDevTag }) => {
    return (
        <>
            <div className="flex justify-end items-center mb-4 space-x-4">
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
                    <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
                    {/* Conditionally render the #dev tag based on the new prop */}
                    {showDevTag && (
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full -translate-y-1">
                            #dev
                        </span>
                    )}
                </div>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>
            </div>
        </>
    );
};

export default Header;