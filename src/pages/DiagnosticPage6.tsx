import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import BarChartComponent from '../components/BarChart.tsx';
import Header from '../components/Header.tsx';

const DiagnosticPage4: React.FC = () => {
    const maturityContext = useContext(MaturityContext);
    const [darkMode, setDarkMode] = useState(true);
    const [selectedDimension, setSelectedDimension] = useState<DiagnosticItem>(diagnosticData[0]);
    const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(null);

    if (!maturityContext) { return <div>Loading...</div>; }

    const { scores, updateScore } = maturityContext;

    const chartData = useMemo(() => {
        return diagnosticData.map(item => ({
            // Pass the full dimension object to the chart
            dimension: item,
            score: scores[item.name] || 0,
        }));
    }, [scores]);

    const handleChartMouseEnter = (data: any) => {
        setHoveredDimension(data.payload.dimension);
    };
    const handleChartMouseLeave = () => {
        setHoveredDimension(null);
    };

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className={`max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <Header
                    title="Maturity Diagnostic"
                    subtitle="Select a dimension from the left to score its maturity."
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    showDevTag={true}
                />
                
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/3 lg:w-1/4">
                        <div className="sticky top-8">
                            <h3 className="font-semibold mb-3">Diagnostic Dimensions</h3>
                            <div className="space-y-4">
                                {Object.entries(diagnosticData.reduce((acc, item) => {
                                    (acc[item.category] = acc[item.category] || []).push(item);
                                    return acc;
                                }, {} as Record<string, typeof diagnosticData>)).map(([category, items]) => (
                                    <div key={category}>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{category}</h4>
                                        <ul className="space-y-1">
                                            {items.map(item => (
                                                <li key={item.name}>
                                                    <button 
                                                        onClick={() => setSelectedDimension(item)}
                                                        className={`w-full text-left p-2 rounded-md text-sm flex items-center justify-between ${selectedDimension.name === item.name ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
                                                    >
                                                        <span>{item.name}</span>
                                                        {scores[item.name] && <CheckCircle className="w-4 h-4 text-green-400" />}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <main className="flex-1">
                        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 mb-8 flex gap-8 items-start">
                            <div className="w-2/3">
                                <h2 className="text-2xl font-bold mb-4">Dimension Scores</h2>
                                <BarChartComponent
                                    data={chartData}
                                    onMouseEnter={handleChartMouseEnter}
                                    onMouseLeave={handleChartMouseLeave}
                                />
                            </div>
                            <div className="w-1/3 mt-12">
                                <h3 className="text-lg font-semibold mb-2">Dimension Details</h3>
                                <div className="p-4 bg-gray-900 rounded-md h-80">
                                    {hoveredDimension ? (
                                        <>
                                            <h4 className="font-bold text-white">{hoveredDimension.name}</h4>
                                            <p className="text-sm text-gray-400 mt-2">{hoveredDimension.description}</p>
                                        </>
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <p className="text-gray-500">Hover over a bar to see details</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {selectedDimension && (
                            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                                <h2 className="text-2xl font-bold">{selectedDimension.name}</h2>
                                <p className="text-md text-gray-400 mt-1 mb-6">{selectedDimension.description}</p>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    {selectedDimension.levels.map((levelText, levelIndex) => {
                                        const score = levelIndex + 1;
                                        const isSelected = scores[selectedDimension.name] === score;
                                        return (
                                            <div
                                                key={score}
                                                className={`p-4 border-2 rounded-md cursor-pointer transition-all h-full flex flex-col ${isSelected ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600 hover:border-gray-500'}`}
                                                onClick={() => updateScore(selectedDimension.name, score)}
                                            >
                                                <strong className="block text-lg mb-2">Level {score}</strong>
                                                <p className="text-sm text-gray-300">{levelText}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end mt-8">
                            <Link to="/prioritisation" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}>
                                Proceed to Prioritisation Tool →
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticPage4;