import React, { useContext, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import BarChartComponent from '../components/BarChart.tsx';
import Header from '../components/Header.tsx';

const DiagnosticPage6: React.FC = () => {
    const maturityContext = useContext(MaturityContext);
    const [darkMode, setDarkMode] = useState(true);
    const [hoveredDimension, setHoveredDimension] = useState<any>(null);

    if (!maturityContext) { return <div>Loading...</div>; }

    const { scores, updateScore } = maturityContext;

    const chartData = useMemo(() => {
        return diagnosticData.filter(Boolean).map(item => ({
            dimension: item,
            score: scores[item.name] || 0,
        }));
    }, [scores]);

    const handleChartMouseEnter = (data: any) => {
        if (data && data.payload && data.payload.dimension) {
            setHoveredDimension(data.payload.dimension);
        }
    };
    const handleChartMouseLeave = () => {
        setHoveredDimension(null);
    };
    
    const levelHeaders = [
        'LEVEL 1 - AD HOC/REACTIVE', 'LEVEL 2 - MANAGED/DEFINED',
        'LEVEL 3 - PROACTIVE/STANDARDISED', 'LEVEL 4 - PREDICTIVE/OPTIMISED',
        'LEVEL 5 - ADAPTIVE/AGILE'
    ];

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className={`max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <Header
                    title="Maturity Diagnostic"
                    subtitle="Select the cell that best fits your organisation's current state for each dimension."
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    showDevTag={true}
                />
                
                <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 mb-8">
                    <h2 className="text-2xl font-bold mb-2">Maturity Overview</h2>
                    <p className="text-sm text-gray-400 mb-4">This chart summarises your scores. Hover over a bar for more details.</p>
                    {hoveredDimension && (
                        <div className="p-3 mb-4 bg-gray-900 rounded-md">
                            <h4 className="font-bold text-white">{hoveredDimension.name}</h4>
                            <p className="text-sm text-gray-400 mt-1">{hoveredDimension.description}</p>
                        </div>
                    )}
                    <BarChartComponent
                        data={chartData}
                        onMouseEnter={handleChartMouseEnter}
                        onMouseLeave={handleChartMouseLeave}
                    />
                </div>

                <div className="space-y-8">
                    {diagnosticData.filter(Boolean).map((item, index) => (
                        <div key={item.name} id={`dimension-card-${index}`} className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-gray-400 mt-1 mb-6">{item.description}</p>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            {levelHeaders.map(header => (
                                                <th key={header} className={`p-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-700 ${darkMode ? 'text-gray-400 bg-gray-900' : 'text-gray-500 bg-gray-200'}`}>
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {item.levels.map((levelText, levelIndex) => {
                                                const score = levelIndex + 1;
                                                const isSelected = scores[item.name] === score;
                                                return (
                                                    <td
                                                        key={score}
                                                        className={`p-4 border-2 align-top cursor-pointer transition-colors ${isSelected ? 'border-purple-500' : 'border-gray-700 hover:bg-gray-700'}`}
                                                        onClick={() => updateScore(item.name, score)}
                                                    >
                                                        <p className="text-sm text-gray-300">{levelText}</p>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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

export default DiagnosticPage6;