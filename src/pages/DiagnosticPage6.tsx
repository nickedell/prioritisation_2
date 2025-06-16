import React, { useContext, useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import BarChartComponent from '../components/BarChart.tsx';
import Header from '../components/Header.tsx';

const DiagnosticPage6: React.FC = () => {
    const maturityContext = useContext(MaturityContext);
    const [darkMode, setDarkMode] = useState(true);
    const stickyHeaderRef = useRef<HTMLDivElement>(null);
    const [visibleCategory, setVisibleCategory] = useState('STRATEGY');

    if (!maturityContext) { return <div>Loading...</div>; }

    const { scores, updateScore } = maturityContext;

    const chartData = useMemo(() => {
        const subDimensionScores: { [key: string]: { total: number, count: number } } = {};
        const getBaseSubDimension = (name: string) => name.includes(':') ? name.split(':')[0] : name;
        const uniqueSubDimensions = [...new Set(diagnosticData.map(item => getBaseSubDimension(item.name)))];
        uniqueSubDimensions.forEach(subDim => { subDimensionScores[subDim] = { total: 0, count: 0 }; });
        Object.entries(scores || {}).forEach(([dimensionName, score]) => {
            const item = diagnosticData.find(d => d.name === dimensionName);
            if (item) {
                const baseSubDim = getBaseSubDimension(item.name);
                if (subDimensionScores[baseSubDim]) {
                    subDimensionScores[baseSubDim].total += score;
                    subDimensionScores[baseSubDim].count += 1;
                }
            }
        });
        const sortedData = Object.entries(subDimensionScores).sort(([, a], [, b]) => {
            const scoreA = a.count > 0 ? a.total / a.count : 0;
            const scoreB = b.count > 0 ? b.total / b.count : 0;
            return scoreB - scoreA;
        });
        return sortedData.map(([subDim, data]) => ({
            subject: subDim,
            score: data.count > 0 ? parseFloat((data.total / data.count).toFixed(2)) : 0,
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

    const levelHeaders = [
        'LEVEL 1 - AD HOC/REACTIVE', 'LEVEL 2 - MANAGED/DEFINED',
        'LEVEL 3 - PROACTIVE/STANDARDISED', 'LEVEL 4 - PREDICTIVE/OPTIMISED',
        'LEVEL 5 - ADAPTIVE/AGILE'
    ];

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className={`max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'text-gray-100'