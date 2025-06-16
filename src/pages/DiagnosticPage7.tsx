import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import BarChartComponent from '../components/BarChart.tsx';
import Header from '../components/Header.tsx';

const DiagnosticPage7: React.FC = () => {
    const maturityContext = useContext(MaturityContext);
    const [darkMode, setDarkMode] = useState(true);
    const [selectedDimension, setSelectedDimension] = useState<DiagnosticItem>(diagnosticData[0]);
    const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(diagnosticData[0]);

    if (!maturityContext) { return <div>Loading...</div>; }

    const { scores, updateScore } = maturityContext;

    const groupedData = useMemo(() => diagnosticData.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, typeof diagnosticData>), []);

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