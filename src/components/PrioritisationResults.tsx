import React from 'react';
import { PrioritisedDimension } from '../types/index.ts';
import { ArrowUp, Star, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface PrioritisationResultsProps {
    prioritisedDimensions: PrioritisedDimension[];
    darkMode: boolean;
}

const PrioritisationResults: React.FC<PrioritisationResultsProps> = ({ prioritisedDimensions, darkMode }) => {

    const getTierColor = (tier: string) => {
        if (darkMode) {
            switch (tier) {
                case 'Priority 1': return 'bg-gray-700 border-gray-500 text-gray-200';
                case 'Priority 2': return 'bg-gray-600 border-gray-400 text-gray-200';
                case 'Priority 3': return 'bg-gray-500 border-gray-300 text-gray-100';
                default: return 'bg-gray-800 border-gray-600 text-gray-300';
            }
        }
        switch (tier) {
            case 'Priority 1': return 'bg-blue-50 border-blue-300 text-gray-800';
            case 'Priority 2': return 'bg-green-50 border-green-300 text-gray-800';
            case 'Priority 3': return 'bg-yellow-50 border-yellow-300 text-gray-800';
            default: return 'bg-gray-100 border-gray-300 text-gray-600';
        }
    };

    const getFilterIcon = (filter: string) => {
        const iconColor = darkMode ? 'text-gray-300' : 'text-gray-600';
        switch (filter) {
            case 'Quick Win': return <Star className={`w-4 h-4 ${iconColor}`} />;
            case 'Reputation Recovery': return <CheckCircle className={`w-4 h-4 ${iconColor}`} />;
            case 'Political Risk': return <AlertTriangle className={`w-4 h-4 ${iconColor}`} />;
            case 'Foundation Builder': return <ArrowUp className={`w-4 h-4 ${iconColor}`} />;
            case 'Paradox': return <TrendingUp className={`w-4 h-4 ${iconColor}`} />;
            default: return null;
        }
    };

    return (
        <>
            {/* UPDATE: Added pt-4 to align with the other title */}
            <div className="flex items-center justify-between mb-4 pt-4">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Prioritised Results</h2>
            </div>
            <div className={`max-h-[calc(100vh-12rem)] overflow-y-auto space-y-2 rounded-lg p-4 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                {prioritisedDimensions.map((dim, index) => (
                    <div key={dim.id} className={`p-3 rounded-lg border-2 ${getTierColor(dim.tier)}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 min-w-0">
                                <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>#{index + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-semibold text-sm leading-tight truncate ${darkMode ? 'text-white' : 'text-gray-900'}`} title={dim.name}>{dim.name}</h3>
                                    <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{dim.category.split(' ')[0]}{dim.subDimension && ` → ${dim.subDimension}`}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="flex space-x-1">{dim.filters.map(filter => <span key={filter} title={filter}>{getFilterIcon(filter)}</span>)}</div>
                                <div className="text-right">
                                    <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{dim.adjustedScore.toFixed(1)}</div>
                                    <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{dim.tier}</div>
                                </div>
                            </div>
                        </div>
                        {dim.filters.includes('Paradox') && dim.paradoxDescription && (
                            <div className="mt-2 text-xs">
                                <span className={`${darkMode ? 'text-yellow-300' : 'text-yellow-700'} font-medium`}>Paradox: </span>
                                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{dim.paradoxDescription}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className={`mt-4 p-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                <h3 className={`font-semibold mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Legend</h3>
                <div className="space-y-1 text-xs text-gray-300">
                    <div className="flex items-center gap-2"><Star className="w-3 h-3 text-gray-500" /><span>Quick Win</span></div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-gray-500" /><span>Reputation Recovery</span></div>
                    <div className="flex items-center gap-2"><AlertTriangle className="w-3 h-3 text-gray-500" /><span>Political Risk</span></div>
                    <div className="flex items-center gap-2"><ArrowUp className="w-3 h-3 text-gray-500" /><span>Foundation Builder</span></div>
                    <div className="flex items-center gap-2"><TrendingUp className="w-3 h-3 text-gray-500" /><span>Paradox</span></div>
                </div>
            </div>
        </>
    );
};

export default PrioritisationResults;