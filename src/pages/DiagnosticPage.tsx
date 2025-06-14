// src/pages/DiagnosticPage.tsx

import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { diagnosticData } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import RadarChartComponent from '../components/RadarChart.tsx';
import Header from '../components/Header.tsx';

const DiagnosticPage = () => {
    const maturityContext = useContext(MaturityContext);
    const [openCategory, setOpenCategory] = useState('STRATEGY');
    const [darkMode, setDarkMode] = useState(true);

    if (!maturityContext) {
        return <div>Loading...</div>; // Or some other fallback
    }

    const { scores, updateScore } = maturityContext;

    const groupedData = useMemo(() => diagnosticData.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, typeof diagnosticData>), []);

    const chartData = useMemo(() => {
        const subDimensionScores: { [key: string]: { total: number, count: number } } = {};
        const getBaseSubDimension = (name: string) => name.includes(':') ? name.split(':')[0] : name;
        const uniqueSubDimensions = [...new Set(diagnosticData.map(item => getBaseSubDimension(item.name)))];
        uniqueSubDimensions.forEach(subDim => {
            subDimensionScores[subDim] = { total: 0, count: 0 };
        });
        Object.entries(scores).forEach(([dimensionName, score]) => {
            const item = diagnosticData.find(d => d.name === dimensionName);
            if (item) {
                const baseSubDim = getBaseSubDimension(item.name);
                if (subDimensionScores[baseSubDim]) {
                    subDimensionScores[baseSubDim].total += score;
                    subDimensionScores[baseSubDim].count += 1;
                }
            }
        });
        return Object.entries(subDimensionScores).map(([subDim, data]) => ({
            subject: subDim,
            score: data.count > 0 ? parseFloat((data.total / data.count).toFixed(2)) : 0,
            fullMark: 5,
        }));
    }, [scores]);

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className={`max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <Header
                    title="Maturity Diagnostic"
                    subtitle="Select the description that best fits your organisation's current state for each dimension."
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                <div className="sticky top-8 z-40 p-4 bg-gray-800 rounded-lg mb-12 shadow-lg border border-gray-700">
                    <RadarChartComponent data={chartData} />
                </div>

                <div className="space-y-4">
                    {Object.entries(groupedData).map(([category, items]) => (
                        <div key={category} className="bg-gray-800 rounded-lg border border-gray-700">
                            <button
                                onClick={() => setOpenCategory(openCategory === category ? '' : category)}
                                className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold"
                            >
                                <span>{category}</span>
                                {openCategory === category ? <ChevronDown /> : <ChevronRight />}
                            </button>
                            {openCategory === category && (
                                <div className="p-4 border-t border-gray-700 space-y-8">
                                    {items.map((item) => (
                                        <div key={item.name} className="p-4 bg-gray-900 rounded-lg">
                                            <div className="flex flex-col md:flex-row gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                                    <p className="text-sm text-gray-400">{item.description}</p>
                                                </div>
                                                <div className="flex flex-row md:flex-col justify-between md:justify-start gap-2 pt-2">
                                                    {item.levels.map((_, index) => {
                                                        const score = index + 1;
                                                        const isSelected = scores[item.name] === score;
                                                        return (
                                                            <div key={score} className="flex-1 text-center">
                                                                <label
                                                                    className={`flex flex-col justify-center p-2 border-2 rounded-md cursor-pointer transition-all h-full ${isSelected ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600 hover:border-gray-500'}`}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={item.name}
                                                                        value={score}
                                                                        checked={isSelected}
                                                                        onChange={() => updateScore(item.name, score)}
                                                                        className="hidden"
                                                                    />
                                                                    <strong className="block">Level {score}</strong>
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            {scores[item.name] && (
                                                <div className="mt-4 p-3 bg-gray-700 rounded-md text-sm">
                                                    {item.levels[scores[item.name] - 1]}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                <div className="flex justify-end mt-8">
                    <Link to="/prioritisation" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}>
                        Proceed to Prioritisation Tool →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticPage;