import React, { useContext, useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import BarChartComponent from '../components/BarChart.tsx';
import Header from '../components/Header.tsx';

const DiagnosticPage6: React.FC = () => {
    const maturityContext = useContext(MaturityContext);
    const [darkMode, setDarkMode] = useState(true);
    const stickyHeaderRef = useRef<HTMLDivElement>(null);
    const [visibleCategory, setVisibleCategory] = useState('STRATEGY');
    const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(null);

    if (!maturityContext) { return <div>Loading...</div>; }

    const { scores, updateScore } = maturityContext;

    // UPDATE: We are injecting hard-coded scores to test rendering
    const chartData = useMemo(() => {
        const createChartData = (category: string) => {
            return diagnosticData
                .filter(item => item && item.category === category)
                .map((item, index) => ({
                    dimension: item,
                    // Hard-code a score for testing purposes instead of using the live scores
                    score: (index % 5) + 1, 
                }));
        };
        return {
            strategy: createChartData('STRATEGY'),
            implementation: createChartData('IMPLEMENTATION'),
            service: createChartData('SERVICE & VALUE DELIVERY'),
        };
    }, []); // Note: The dependency array is empty so this runs only once

    // This logic is temporarily unused while we debug the chart
    const handleSelectScore = (dimensionName: string, score: number, currentIndex: number) => {
        updateScore(dimensionName, score);
    };

    useEffect(() => {
        // Scroll logic is temporarily not needed for this test
    }, []);

    const handleChartMouseEnter = (data: any) => {
        if (data && data.payload && data.payload.dimension) {
            setHoveredDimension(data.payload.dimension);
        }
    };
    const handleChartMouseLeave = () => {
        setHoveredDimension(null);
    };

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className={`max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
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
                                <h3 className="text-lg font-semibold mb-2 text-center">Strategy</h3>
                                <BarChartComponent data={chartData.strategy} onMouseEnter={handleChartMouseEnter} onMouseLeave={handleChartMouseLeave} height={300} />
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                                <h3 className="text-lg font-semibold mb-2 text-center">Implementation</h3>
                                <BarChartComponent data={chartData.implementation} onMouseEnter={handleChartMouseEnter} onMouseLeave={handleChartMouseLeave} height={300} />
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                                <h3 className="text-lg font-semibold mb-2 text-center">Service & Value Delivery</h3>
                                <BarChartComponent data={chartData.service} onMouseEnter={handleChartMouseEnter} onMouseLeave={handleChartMouseLeave} height={300} />
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

                {/* UPDATE: The dimension selectors below are commented out for this test
                <div className="space-y-12 mt-8">
                    ...
                </div>
                
                 <div className="flex justify-end mt-8">
                    ...
                </div>
                */}
            </div>
        </div>
    );
};

export default DiagnosticPage6;