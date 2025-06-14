import React, { useState, useMemo } from 'react';
import { TOMDimension } from '../types/index.ts';
import { dimensionDescriptions } from '../constants/dimensions.ts';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface DimensionTableProps {
    tomDimensions: TOMDimension[];
    updateScore: (id: number, field: keyof TOMDimension, value: string) => void;
    darkMode: boolean;
}

const DimensionTable: React.FC<DimensionTableProps> = ({ tomDimensions, updateScore, darkMode }) => {
    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
        'STRATEGY': true, 'IMPLEMENTATION': true, 'SERVICE & VALUE DELIVERY': true
    });
    const [expandedSubDimensions, setExpandedSubDimensions] = useState<{ [key: string]: boolean }>({
        'Governance': true, 'Processes': true, 'Data Culture': true
    });
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    const toggleCategory = (category: string) => setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
    const toggleSubDimension = (subDim: string) => setExpandedSubDimensions(prev => ({ ...prev, [subDim]: !prev[subDim] }));

    const groupedDimensions = useMemo(() => {
        const groups: { [category: string]: { [subGroup: string]: TOMDimension[] } } = {};
        tomDimensions.forEach(dim => {
            if (!groups[dim.category]) groups[dim.category] = {};
            const subKey = dim.subDimension || '_main';
            if (!groups[dim.category][subKey]) groups[dim.category][subKey] = [];
            groups[dim.category][subKey].push(dim);
        });
        return groups;
    }, [tomDimensions]);

    const renderDimensionRow = (dim: TOMDimension, isSubItem = false) => (
        <tr key={dim.id} className={`${isSubItem ? (darkMode ? 'bg-gray-750' : 'bg-gray-50') : ''}`}>
            <td className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} p-3 ${isSubItem ? 'pl-8 text-sm' : 'font-medium'} ${darkMode ? (isSubItem ? 'text-gray-300' : 'text-gray-200') : (isSubItem ? 'text-gray-600' : 'text-gray-900')} relative`}>
                {isSubItem && <span className={`mr-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>↳</span>}
                <span className="cursor-help relative" onMouseEnter={() => setActiveTooltip(`${dim.id}-${dim.name}`)} onMouseLeave={() => setActiveTooltip(null)}>
                    {dim.name}
                    {activeTooltip === `${dim.id}-${dim.name}` && dimensionDescriptions[dim.name] && (
                        <div className={`absolute z-50 p-3 rounded-lg shadow-lg border text-sm max-w-2xl left-0 top-full mt-1 ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`}>
                            {dimensionDescriptions[dim.name]}
                        </div>
                    )}
                </span>
            </td>
            <td className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} p-3 text-center`}>
                <input type="number" value={dim.currentScore} onChange={(e) => updateScore(dim.id, 'currentScore', e.target.value)} className={`w-16 p-1 border rounded text-center font-semibold ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} min="0" max="5" step="0.1" />
            </td>
            {['businessImpact', 'feasibility', 'political', 'foundation'].map(field => (
                <td key={field} className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} p-3 text-center`}>
                    <select value={dim[field as keyof TOMDimension] as number} onChange={(e) => updateScore(dim.id, field as keyof TOMDimension, e.target.value)} className={`w-16 p-1 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                        <option value="0">-</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>
                    </select>
                </td>
            ))}
        </tr>
    );

    // UPDATE: The top offset is adjusted to the new height of the caption.
    const headerClasses = `sticky top-[44px] z-10 border p-3 text-center ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-gray-100 border-gray-300 text-gray-900'}`;

    return (
        <table className={`w-full border-collapse border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            {/* UPDATE: Changed padding from p-4 to px-4 pt-4 to remove bottom padding and close the gap. */}
            <caption className={`sticky top-0 z-20 px-4 pt-4 text-xl font-semibold text-left ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                Input Scores
            </caption>
            <thead>
                <tr>
                    <th className={`${headerClasses} text-left`}>TOM Dimension</th>
                    <th className={headerClasses}>Maturity Score</th>
                    <th className={headerClasses}>Business Impact</th>
                    <th className={headerClasses}>Feasibility</th>
                    <th className={headerClasses}>Political Viability</th>
                    <th className={headerClasses}>Foundation Building</th>
                </tr>
            </thead>
            <tbody className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                {Object.entries(groupedDimensions).map(([category, subGroups]) => (
                    <React.Fragment key={category}>
                        <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-200'}>
                            <td colSpan={6} className={`border p-3 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                <button onClick={() => toggleCategory(category)} className={`flex items-center font-bold text-lg w-full transition-colors ${darkMode ? 'text-gray-200 hover:text-white' : 'text-gray-800 hover:text-gray-900'}`}>
                                    {expandedCategories[category] ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />} {category}
                                </button>
                            </td>
                        </tr>
                        {expandedCategories[category] && Object.entries(subGroups).map(([subGroup, dimensions]) => (
                            <React.Fragment key={subGroup}>
                                {subGroup !== '_main' && (
                                    <tr className={darkMode ? 'bg-gray-600' : 'bg-gray-100'}>
                                        <td colSpan={6} className={`border p-2 pl-6 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                            <button onClick={() => toggleSubDimension(subGroup)} className={`flex items-center font-semibold transition-colors ${darkMode ? 'text-gray-300 hover:text-gray-200' : 'text-gray-700 hover:text-gray-800'}`}>
                                                {expandedSubDimensions[subGroup] ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />} {subGroup}
                                            </button>
                                        </td>
                                    </tr>
                                )}
                                {(subGroup === '_main' || expandedSubDimensions[subGroup]) && dimensions.map(dim => renderDimensionRow(dim, subGroup !== '_main'))}
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default DimensionTable;