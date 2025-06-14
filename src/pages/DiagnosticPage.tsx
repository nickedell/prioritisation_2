import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import RadarChartComponent from '../components/RadarChart.tsx';

const DiagnosticPage = () => {
    const maturityContext = useContext(MaturityContext);

    if (!maturityContext) {
        return <div>Loading...</div>;
    }

    const { scores, updateScore } = maturityContext;

    const groupedData = useMemo(() => diagnosticData.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, typeof diagnosticData>), []);

    // UPDATE: New logic to group by sub-dimension for the chart
    const chartData = useMemo(() => {
        const subDimensionScores: { [key: string]: { total: number, count: number } } = {};

        // Helper to get the base sub-dimension name (e.g., "Governance" from "Governance: Risk Management")
        const getBaseSubDimension = (name: string) => {
            return name.includes(':') ? name.split(':')[0] : name;
        };
        
        // Find all unique base sub-dimensions to initialize them
        const uniqueSubDimensions = [...new Set(diagnosticData.map(item => getBaseSubDimension(item.name)))];
        uniqueSubDimensions.forEach(subDim => {
            subDimensionScores[subDim] = { total: 0, count: 0 };
        });

        // Tally scores for each base sub-dimension
        Object.entries(scores).forEach(([dimensionName, score]) => {
            const item = diagnosticData.find(d => d.name === dimensionName);
            if (item) {
                const baseSubDim = getBaseSubDimension(item.name);
                subDimensionScores[baseSubDim].total += score;
                subDimensionScores[baseSubDim].count += 1;
            }
        });
        
        // Calculate averages and format for the chart library
        return Object.entries(subDimensionScores).map(([subDim, data]) => ({
            subject: subDim,
            score: data.count > 0 ? parseFloat((data.total / data.count).toFixed(2)) : 0,
            fullMark: 5,
        }));

    }, [scores]);


    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Maturity Diagnostic</h1>
                    <Link to="/prioritisation" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        Proceed to Prioritisation Tool →
                    </Link>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mb-12">
                     <h2 className="text-2xl font-bold mb-4 text-center">Sub-Dimension Maturity Overview</h2>
                    <RadarChartComponent data={chartData} />
                </div>

                <div className="space-y-12">
                    {Object.entries(groupedData).map(([category, items]) => (
                        <div key={category}>
                            <h2 className="text-2xl font-bold border-b-2 border-gray-700 pb-2 mb-6">{category}</h2>
                            <div className="space-y-8">
                                {items.map((item) => (
                                    <div key={item.name} className="p-4 bg-gray-800 rounded-lg">
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                            {item.levels.map((levelDescription, index) => {
                                                const score = index + 1;
                                                const isSelected = scores[item.name] === score;
                                                return (
                                                    <div key={score} className={`p-3 border-2 rounded-md cursor-pointer transition-all ${isSelected ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600 hover:border-gray-500'}`} onClick={() => updateScore(item.name, score)}>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                name={item.name}
                                                                value={score}
                                                                checked={isSelected}
                                                                onChange={() => updateScore(item.name, score)}
                                                                className="hidden"
                                                            />
                                                            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${isSelected ? 'bg-blue-400 border-blue-200' : 'border-gray-500'}`}></div>
                                                            <label className="text-sm cursor-pointer">
                                                                <strong className="block">Level {score}</strong>
                                                                {levelDescription}
                                                            </label>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiagnosticPage;