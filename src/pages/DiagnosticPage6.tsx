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
                            <div className="p-4 bg-gray-80