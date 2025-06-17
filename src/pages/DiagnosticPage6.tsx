import React, { useContext, useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import BarChartComponent from '../components/BarChart.tsx';
import Header from '../components/Header.tsx';

const DiagnosticPage6: React.FC = () => {
    const maturityContext = useContext(MaturityContext);
    const [darkMode, setDarkMode] = useState(true);
    const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(null);
    
    // UPDATE: Adding a ref to measure the height of the sticky header
    const stickyHeaderRef = useRef<HTMLDivElement>(null);

    if (!maturityContext) { return <div>Loading...</div>; }

    const { scores, updateScore } = maturityContext;

    const chartData = useMemo(() => {
        const createChartData = (category: string) => {
            return diagnosticData
                .filter(item => item && item.category === category)
                .map(item => ({
                    dimension: item,
                    score: scores[item.name] || 0,
                }));
        };
        return {
            strategy: createChartData('STRATEGY'),
            implementation: createChartData('IMPLEMENTATION'),
            service: createChartData('SERVICE & VALUE DELIVERY'),
        };
    }, [scores]);

    // UPDATE: New handler function that updates score AND handles scrolling
    const handleSelectScore = (dimensionName: string, score: number, currentIndex: number) => {
        updateScore(dimensionName, score);

        const nextIndex = currentIndex + 1;
        if (nextIndex < diagnosticData.length) {
            const nextDimensionId = `dimension-card-${nextIndex}`;
            setTimeout(() => {
                const nextElement = document.getElementById(nextDimensionId);
                if (nextElement && stickyHeaderRef.current) {
                    // Calculate the precise scroll position
                    const headerHeight = stickyHeaderRef.current.offsetHeight;
                    const elementPosition = nextElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // 20px buffer

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 150); // Small delay for rendering to catch up
        }
    };

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
                {/* UPDATE: The ref is attached to the sticky container */}
                <div ref={stickyHeaderRef} className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} pt-4 pb-4`}>
                    <Header
                        title="Maturity Diagnostic"
                        subtitle="Select the cell that best fits your organisation's current state for each dimension."
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        showDevTag={true}
                    />
                    <div className="mt-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">Strategy</h3>
                                <BarChartComponent data={chartData.strategy} onMouseEnter={handleChartMouseEnter} onMouseLeave={handleChartMouseLeave} height={250} />
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                                <BarChartComponent data={chartData.implementation} onMouseEnter={handleChartMouseEnter} onMouseLeave={handleChartMouseLeave} height={300} />
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">Service & Value Delivery</h3>
                                <BarChartComponent data={chartData.service} onMouseEnter={handleChartMouseEnter} onMouseLeave={handleChartMouseLeave} height={250} />
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700 min-h-[100px]">
                            <h3 className="text-lg font-semibold mb-2">Dimension Details</h3>
                            {hoveredDimension ? (
                                <>
                                    <h4 className="font-bold text-white">{hoveredDimension.name}</h4>
                                    <p className="text-sm text-gray-400 mt-2">{hoveredDimension.description}</p>
                                </>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <p className="text-gray-500">Hover over a bar in any chart to see details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-12 mt-8">
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
                                                        // UPDATE: The onClick now calls the new handler with the index
                                                        onClick={() => handleSelectScore(item.name, score, index)}
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