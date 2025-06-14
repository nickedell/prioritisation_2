// src/pages/DiagnosticPage.tsx
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { diagnosticData } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import RadarChartComponent from '../components/RadarChart.tsx';
import Header from '../components/Header.tsx'; // Import the Header

const DiagnosticPage = () => {
    const maturityContext = useContext(MaturityContext);
    const [openCategory, setOpenCategory] = useState('STRATEGY');
    const [darkMode, setDarkMode] = useState(true); // Add darkMode state

    // ... (logic from before remains the same)

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className="max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'text-gray-100' : 'text-gray-900'}">
                {/* UPDATE: Added Header component for consistent title and dark mode toggle */}
                <Header
                    title="Maturity Diagnostic"
                    subtitle="Select the description that best fits your organisation's current state for each dimension."
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                {/* UPDATE: Styling of chart container now matches Configuration component */}
                <div className="sticky top-8 z-40 p-4 bg-gray-800 rounded-lg mb-12 shadow-lg border border-gray-700">
                    {/* UPDATE: Removed the h2 title from here */}
                    <RadarChartComponent data={chartData} />
                </div>

                {/* UPDATE: Increased spacing between accordion items with space-y-8 */}
                <div className="space-y-8">
                    {Object.entries(groupedData).map(([category, items]) => (
                        <div key={category} className="p-4 rounded-lg border bg-gray-800 border-gray-700">
                             {/* UPDATE: Accordion button style changed to match prioritisation page summary text */}
                            <button
                                onClick={() => setOpenCategory(openCategory === category ? '' : category)}
                                className="w-full flex justify-between items-center text-left text-sm"
                            >
                                <strong className={darkMode ? 'text-white' : 'text-gray-900'}>{category}</strong>
                                {openCategory === category ? <ChevronDown /> : <ChevronRight />}
                            </button>
                            {openCategory === category && (
                                <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
                                     {/* ... (rest of the accordion content remains the same) ... */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                {/* UPDATE: "Proceed" button style now matches header buttons */}
                <div className="flex justify-end mt-8">
                    <Link to="/prioritisation" className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                        Proceed to Prioritisation Tool →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticPage;