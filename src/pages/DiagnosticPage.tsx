import React, { useContext, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { diagnosticData } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import RadarChartComponent from '../components/RadarChart.tsx';
import Header from '../components/Header.tsx';

const DiagnosticPage = () => {
    const maturityContext = useContext(MaturityContext);
    const [openCategory, setOpenCategory] = useState('');
    const [darkMode, setDarkMode] = useState(true);
    const [isChartVisible, setIsChartVisible] = useState(true);
    const accordionContainerRef = useRef<HTMLDivElement>(null);

    if (!maturityContext) { return <div>Loading...</div>; }

    const { scores, updateScore } = maturityContext;

    // ... (groupedData and chartData logic remains the same) ...

    const handleCategoryClick = (category: string) => { /* ... (logic is unchanged) ... */ };

    // NEW: Simpler import/export logic for this page
    const handleDiagnosticExport = () => {
        const headers = ['Dimension Name', 'Maturity Score'];
        const csvData = Object.entries(scores);
        const csvContent = [headers, ...csvData].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'maturity-diagnostic-scores.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDiagnosticImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const rows = text.split('\n').slice(1);
            rows.forEach(row => {
                if (row.trim() === '') return;
                const columns = row.trim().split(',');
                const name = columns[0]?.replace(/"/g, '').trim();
                const score = parseInt(columns[1]?.replace(/"/g, ''), 10);
                if (name && !isNaN(score)) {
                    updateScore(name, score);
                }
            });
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const tableHeaderClasses = `sticky top-0 p-3 text-left text-xs font-medium uppercase tracking-wider z-10 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`;

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className={`max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <div className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-4`}>
                    <Header
                        title="Maturity Diagnostic"
                        subtitle="Select the cell that best fits your organisation's current state for each dimension."
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        showDevTag={true}
                        onExportClick={handleDiagnosticExport}
                        onImportFileSelect={handleDiagnosticImport}
                    />
                    {/* ... (rest of Header and Chart JSX) ... */}
                </div>
                {/* ... (rest of Accordion JSX) ... */}
            </div>
        </div>
    );
};

export default DiagnosticPage;