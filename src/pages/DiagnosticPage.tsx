import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { diagnosticData } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
// We are temporarily removing the chart, so this import is not needed for now
// import RadarChartComponent from '../components/RadarChart.tsx';

const DiagnosticPage = () => {
    const maturityContext = useContext(MaturityContext);
    // State to track the currently open accordion category, defaulting to STRATEGY
    const [openCategory, setOpenCategory] = useState('STRATEGY');

    if (!maturityContext) {
        return <div>Loading...</div>;
    }

    const { scores, updateScore } = maturityContext;

    // Group data by category for rendering
    const groupedData = diagnosticData.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, typeof diagnosticData>);

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Maturity Diagnostic</h1>
                    <Link to="/prioritisation" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        Proceed to Prioritisation Tool →
                    </Link>
                </div>

                {/* The chart and auto-advancing logic have been temporarily removed to debug the layout. */}
                {/* We will add it back in the next step. */}

                <div className="space-y-4 mt-12">
                    {Object.entries(groupedData).map(([category, items]) => (
                        <div key={category} className="bg-gray-800 rounded-lg">
                            {/* This button controls the accordion drawer */}
                            <button
                                onClick={() => setOpenCategory(openCategory === category ? '' : category)}
                                className="w-full flex justify-between items-center p-4 text-left font-bold text-2xl hover:bg-gray-700 rounded-t-lg"
                            >
                                <span>{category}</span>
                                {openCategory === category ? <ChevronDown /> : <ChevronRight />}
                            </button>

                            {/* This block conditionally shows the content of the drawer */}
                            {openCategory === category && (
                                <div className="p-4 border-t border-gray-700 space-y-4">
                                    {items.map((item) => (
                                        <div key={item.name} className="p-4 bg-gray-900 rounded-lg">
                                            {/* This flex container creates the new grid-like layout */}
                                            <div className="flex flex-col md:flex-row gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                                    <p className="text-sm text-gray-400">{item.description}</p>
                                                </div>
                                                <div className="flex flex-row md:flex-col justify-between md:justify-start gap-2 pt-2">
                                                    {item.levels.map((levelDescription, index) => {
                                                        const score = index + 1;
                                                        const isSelected = scores[item.name] === score;
                                                        return (
                                                            <div key={score} className="flex-1 text-center">
                                                                <label
                                                                    className={`flex flex-col justify-center p-2 border-2 rounded-md cursor-pointer transition-all h-full ${isSelected ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600 hover:border-gray-500'}`}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={item.name}
                                                                        value={score}
                                                                        checked={isSelected}
                                                                        onChange={() => updateScore(item.name, score)}
                                                                        className="hidden"
                                                                    />
                                                                    <strong className="block">Level {score}</strong>
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            {/* Full description box for the selected level */}
                                            {scores[item.name] && (
                                                <div className="mt-4 p-3 bg-gray-700 rounded-md text-sm">
                                                    {item.levels[scores[item.name] - 1]}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiagnosticPage;