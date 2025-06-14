import React, { useContext, useMemo, useState } from 'react';
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

    if (!maturityContext) { return <div>Loading...</div>; }

    const { scores, updateScore } = maturityContext;

    const groupedData = useMemo(() => diagnosticData.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, typeof diagnosticData>), []);

    const chartData = useMemo(() => {
        const subDimensionScores: { [key: string]: { total: number, count: number } } = {};
        const getBaseSubDimension = (name: string) => name.includes(':') ? name.split(':')[0] : name;
        const uniqueSubDimensions = [...new Set(diagnosticData.map(item => getBaseSubDimension(item.name)))];
        uniqueSubDimensions.forEach(subDim => { subDimensionScores[subDim] = { total: 0, count: 0 }; });
        Object.entries(scores).forEach(([dimensionName, score]) => {
            const item = diagnosticData.find(d => d.name === dimensionName);
            if (item) {
                const baseSubDim = getBaseSubDimension(item.name);
                if (subDimensionScores[baseSubDim]) {
                    subDimensionScores[baseSubDim].total += score;
                    subDimensionScores[baseSubDim].count += 1;
                }
            }
        });
        return Object.entries(subDimensionScores).map(([subDim, data]) => ({
            subject: subDim,
            score: data.count > 0 ? parseFloat((data.total / data.count).toFixed(2)) : 0,
            fullMark: 5,
        }));
    }, [scores]);

    const tableHeaderClasses = `p-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`;

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
                    />
                    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                        <button
                            onClick={() => setIsChartVisible(!isChartVisible)}
                            className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold"
                        >
                            <span>Maturity Overview</span>
                            {isChartVisible ? <ChevronDown /> : <ChevronRight />}
                        </button>
                        {isChartVisible && (
                            <div className="p-4 border-t border-gray-700">
                                <RadarChartComponent data={chartData} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4 mt-8">
                    {Object.entries(groupedData).map(([category, items]) => (
                        <div key={category} className="bg-gray-800 rounded-lg border border-gray-700">
                            <button
                                onClick={() => setOpenCategory(openCategory === category ? '' : category)}
                                className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold"
                            >
                                <span>{category}</span>
                                {openCategory === category ? <ChevronDown /> : <ChevronRight />}
                            </button>
                            {openCategory === category && (
                                <div className="p-1 border-t border-gray-700">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className={tableHeaderClasses}>Dimension</th>
                                                <th className={tableHeaderClasses}>Description</th>
                                                <th className={tableHeaderClasses}>Level 1 - Ad Hoc/Reactive</th>
                                                <th className={tableHeaderClasses}>Level 2 - Managed/Defined</th>
                                                <th className={tableHeaderClasses}>Level 3 - Proactive/Standardised</th>
                                                <th className={tableHeaderClasses}>Level 4 - Predictive/Optimised</th>
                                                <th className={tableHeaderClasses}>Level 5 - Adaptive/Agile</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-gray-900">
                                            {items.map((item) => (
                                                <tr key={item.name} className="border-t border-gray-700">
                                                    {/* UPDATE: This is the line with the corrected className */}
                                                    <td className={`p-3 text-sm font-medium border-r border-gray-700 align-top ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</td>
                                                    <td className={`p-3 text-sm border-r border-gray-700 align-top ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.description}</td>
                                                    {item.levels.map((levelText, index) => {
                                                        const score = index + 1;
                                                        const isSelected = scores[item.name] === score;
                                                        return (
                                                            <td
                                                                key={score}
                                                                className={`p-3 border-r text-sm text-gray-300 border-gray-700 cursor-pointer transition-colors border-b-4 text-left align-top ${isSelected ? 'border-b-purple-500 bg-gray-700' : 'border-b-transparent hover:bg-gray-800'}`}
                                                                onClick={() => updateScore(item.name, score)}
                                                            >
                                                                {levelText}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
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

export default DiagnosticPage;