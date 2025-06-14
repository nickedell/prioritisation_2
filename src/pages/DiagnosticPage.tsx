import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { diagnosticData } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import RadarChartComponent from '../components/RadarChart.tsx';

const DiagnosticPage = () => {
    const maturityContext = useContext(MaturityContext);
    // NEW: State to track the currently open accordion category
    const [openCategory, setOpenCategory] = useState('STRATEGY');

    if (!maturityContext) {
        return <div>Loading...</div>;
    }

    const { scores, updateScore } = maturityContext;

    const groupedData = useMemo(() => diagnosticData.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, typeof diagnosticData>), []);

    const chartData = useMemo(() => {
        // ... (chart data logic remains the same)
    }, [scores]);

    // NEW: Effect to handle auto-advancing the accordion
    useEffect(() => {
        if (!openCategory) return; // Do nothing if no category is open

        const itemsInOpenCategory = groupedData[openCategory];
        if (!itemsInOpenCategory) return;

        // Check if all items in the current category have a score
        const isCategoryComplete = itemsInOpenCategory.every(item => scores[item.name] > 0);

        if (isCategoryComplete) {
            const allCategories = Object.keys(groupedData);
            const currentIndex = allCategories.indexOf(openCategory);
            const nextIndex = currentIndex + 1;

            if (nextIndex < allCategories.length) {
                // If there's a next category, open it
                setOpenCategory(allCategories[nextIndex]);
            } else {
                // If it's the last category, close it
                setOpenCategory('');
            }
        }
    }, [scores, openCategory, groupedData]);


    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Maturity Diagnostic</h1>
                    <Link to="/prioritisation" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        Proceed to Prioritisation Tool →
                    </Link>
                </div>

                <div className="sticky top-8 z-40 p-4 bg-gray-800 rounded-lg mb-12 shadow-lg">
                     <h2 className="text-2xl font-bold mb-4 text-center">Sub-Dimension Maturity Overview</h2>
                    <RadarChartComponent data={chartData} />
                </div>

                {/* UPDATE: New Accordion Layout */}
                <div className="space-y-4">
                    {Object.entries(groupedData).map(([category, items]) => (
                        <div key={category} className="bg-gray-800 rounded-lg">
                            <button
                                onClick={() => setOpenCategory(openCategory === category ? '' : category)}
                                className="w-full flex justify-between items-center p-4 text-left font-bold text-2xl"
                            >
                                <span>{category}</span>
                                {openCategory === category ? <ChevronDown /> : <ChevronRight />}
                            </button>
                            {openCategory === category && (
                                <div className="p-4 border-t border-gray-700 space-y-4">
                                    {items.map((item) => (
                                        <div key={item.name} className="p-4 bg-gray-900 rounded-lg">
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                                {item.levels.map((levelDescription, index) => {
                                                    const score = index + 1;
                                                    const isSelected = scores[item.name] === score;
                                                    return (
                                                        <div key={score} className={`p-3 border-2 rounded-md cursor-pointer transition-all ${isSelected ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600 hover:border-gray-500'}`} onClick={() => updateScore(item.name, score)}>
                                                            <div className="flex items-center">
                                                                <input type="radio" name={item.name} value={score} checked={isSelected} onChange={() => {}} className="hidden" />
                                                                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${isSelected ? 'bg-blue-400 border-blue-200' : 'border-gray-500'}`}></div>
                                                                <label className="text-sm cursor-pointer">
                                                                    <strong className="block">Level {score}</strong>
                                                                    {levelDescription}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiagnosticPage;