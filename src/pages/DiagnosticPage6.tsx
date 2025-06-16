import React, { useContext, useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import BarChartComponent from '../components/BarChart.tsx'; // UPDATE: Import BarChart instead of RadarChart
import Header from '../components/Header.tsx';

const DiagnosticPage3: React.FC = () => {
    const maturityContext = useContext(MaturityContext);
    const [darkMode, setDarkMode] = useState(true);
    const stickyHeaderRef = useRef<HTMLDivElement>(null);
    const [visibleCategory, setVisibleCategory] = useState('STRATEGY');

    if (!maturityContext) { return <div>Loading...</div>; }

    const { scores, updateScore } = maturityContext;

    // UPDATE: Simplified chartData logic for the bar chart.
    // This creates one bar for each dimension and keeps them in the original order.
    const chartData = useMemo(() => {
        return diagnosticData.map(item => ({
            subject: item.name,
            score: scores[item.name] || 0,
        }));
    }, [scores]);

    const handleSelectScore = (dimensionName: string, score: number, currentIndex: number) => {
        updateScore(dimensionName, score);
        const nextIndex = currentIndex + 1;
        if (nextIndex < diagnosticData.length) {
            const nextDimensionId = `dimension-card-${nextIndex}`;
            setTimeout(() => {
                const nextElement = document.getElementById(nextDimensionId);
                if (nextElement && stickyHeaderRef.current) {
                    const headerHeight = stickyHeaderRef.current.offsetHeight;
                    const elementPosition = nextElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }, 150);
        }
    };

    useEffect(() => {
        const categoryElements: HTMLElement[] = [];
        diagnosticData.forEach(item => {
            if (!categoryElements.some(el => el.id === item.category)) {
                const el = document.getElementById(item.category);
                if (el) categoryElements.push(el);
            }
        });

        const handleScroll = () => {
            const headerBottom = stickyHeaderRef.current?.getBoundingClientRect().bottom || 0;
            let currentTopCategory = '';
            
            for (const el of categoryElements) {
                if (el.getBoundingClientRect().top <= headerBottom) {
                    currentTopCategory = el.id;
                }
            }
            setVisibleCategory(currentTopCategory || 'STRATEGY');
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className={`max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <div ref={stickyHeaderRef} className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} pt-4 pb-4`}>
                    <Header
                        title="Maturity Diagnostic"
                        subtitle="Select the description that best fits your organisation's current state for each dimension."
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        showDevTag={true}
                    />
                    <div className="mb-4">
                        {/* UPDATE: Using the BarChartComponent */}
                        <BarChartComponent data={chartData} />
                    </div>
                    <h2 className="text-2xl font-bold border-b-2 border-gray-700 pb-2">
                        {visibleCategory}
                    </h2>
                </div>

                <div className="space-y-12">
                    {diagnosticData.map((item, index) => {
                        const showCategoryHeader = index === 0 || item.category !== diagnosticData[index - 1].category;
                        return (
                            <React.Fragment key={item.name}>
                                {showCategoryHeader && <div id={item.category} className="pt-8 -mt-8"></div>}
                                <div id={`dimension-card-${index}`} className="p-6 bg-gray-800 rounded-lg border border-gray-700 scroll-mt-[30rem]">
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className="text-sm text-gray-400 mt-1 mb-6">{item.description}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                        {item.levels.map((levelText, levelIndex) => {
                                            const score = levelIndex + 1;
                                            const isSelected = scores[item.name] === score;
                                            return (
                                                <div
                                                    key={score}
                                                    className={`p-4 border-2 rounded-md cursor-pointer transition-all h-full flex flex-col ${isSelected ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600 hover:border-gray-500'}`}
                                                    onClick={() => handleSelectScore(item.name, score, index)}
                                                >
                                                    <strong className="block text-lg mb-2">Level {score}</strong>
                                                    <p className="text-sm text-gray-300">{levelText}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
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

export default DiagnosticPage3;