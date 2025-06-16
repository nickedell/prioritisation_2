import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import BarChartComponent from '../components/BarChart.tsx'; // Import the new Bar Chart
import Header from '../components/Header.tsx';

const DiagnosticPage4: React.FC = () => {
    const maturityContext = useContext(MaturityContext);
    const [darkMode, setDarkMode] = useState(true);

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
        // Sort the data so the bar chart is ordered
        const sortedData = Object.entries(subDimensionScores).sort(([, a], [, b]) => (b.total / b.count || 0) - (a.total / a.count || 0));
        
        return sortedData.map(([subDim, data]) => ({
            subject: subDim,
            score: data.count > 0 ? parseFloat((data.total / data.count).toFixed(2)) : 0,
        }));
    }, [scores]);

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
                
                <div className="flex flex-col md:flex-row gap-8">
                    {/* --- Left Content Area (Now the main questions) --- */}
                    <main className="w-full">
                        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                             <h2 className="text-2xl font-bold mb-4">Sub-Dimension Scores</h2>
                            <BarChartComponent data={chartData} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticPage4;