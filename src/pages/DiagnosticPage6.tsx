import React, { useContext, useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import BarChartComponent from '../components/BarChart.tsx';
import Header from '../components/Header.tsx';

const DiagnosticPage6: React.FC = () => {
    const maturityContext = useContext(MaturityContext);
    const [darkMode, setDarkMode] = useState(true);
    const [selectedDimension, setSelectedDimension] = useState<DiagnosticItem>(diagnosticData[0]);
    // UPDATE: Initialize the hover state with the first dimension
    const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(diagnosticData[0]);

    if (!maturityContext) { return <div>Loading...</div>; }

    const { scores, updateScore } = maturityContext;

    const chartData = useMemo(() => {
        return diagnosticData.filter(Boolean).map(item => ({
            dimension: item,
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

    const stickyHeaderRef = useRef<HTMLDivElement>(null);
    const [visibleCategory, setVisibleCategory] = useState('STRATEGY');

    useEffect(() => {
        const categoryElements: HTMLElement[] = [];
        diagnosticData.filter(Boolean).forEach(item => {
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
                <div ref={stickyHeaderRef} className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} pt-4 pb-4`}>
                    <Header
                        title="Maturity Diagnostic"
                        subtitle="Select a dimension from the left to score its maturity."
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        showDevTag={true}
                    />
                    <div className="flex gap-8 items-start">
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
                </div>

                <div className="space-y-12">
                    {diagnosticData.filter(Boolean).map((item, index) => {
                        const showCategoryHeader = index === 0 || item.category !== diagnosticData[index - 1]?.category;
                        return (
                            <React.Fragment key={item.name}>
                                {showCategoryHeader && <div id={item.category} className="pt-8 -mt-8"></div>}
                                <div id={`dimension-card-${index}`} className="p-6 bg-gray-800 rounded-lg border border-gray-700 scroll-mt-32">
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

export default DiagnosticPage6;