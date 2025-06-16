import React from 'react';
import { DiagnosticItem, diagnosticData } from '../constants/diagnostic.ts';

interface DiagnosticQuestionListProps {
    scores: { [key: string]: number };
    updateScore: (name: string, score: number) => void;
    handleSelectScore: (name: string, score: number, index: number) => void;
    darkMode: boolean;
}

const DiagnosticQuestionList: React.FC<DiagnosticQuestionListProps> = ({ scores, handleSelectScore, darkMode }) => {
    const levelHeaders = [
        'LEVEL 1 - AD HOC/REACTIVE', 'LEVEL 2 - MANAGED/DEFINED',
        'LEVEL 3 - PROACTIVE/STANDARDISED', 'LEVEL 4 - PREDICTIVE/OPTIMISED',
        'LEVEL 5 - ADAPTIVE/AGILE'
    ];

    return (
        <div className="space-y-12">
            {diagnosticData.filter(Boolean).map((item, index) => {
                const showCategoryHeader = index === 0 || item.category !== diagnosticData[index - 1]?.category;
                return (
                    <React.Fragment key={item.name}>
                        {showCategoryHeader && <div id={item.category} className="pt-8 -mt-8"></div>}
                        <div id={`dimension-card-${index}`} className="p-6 bg-gray-800 rounded-lg border border-gray-700 scroll-mt-32">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-gray-400 mt-1 mb-6">{item.description}</p>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            {levelHeaders.map(header => (
                                                <th key={header} className={`p-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-700 ${darkMode ? 'text-gray-400 bg-gray-900' : 'text-gray-500 bg-gray-200'}`}>
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-900">
                                        <tr>
                                            {item.levels.map((levelText, levelIndex) => {
                                                const score = levelIndex + 1;
                                                const isSelected = scores[item.name] === score;
                                                return (
                                                    <td
                                                        key={score}
                                                        className={`p-4 border-2 align-top cursor-pointer transition-colors ${isSelected ? 'border-purple-500' : 'border-gray-700 hover:bg-gray-700'}`}
                                                        onClick={() => handleSelectScore(item.name, score, index)}
                                                    >
                                                        <p className="text-sm text-gray-300">{levelText}</p>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
        </div>
    );
};

export default DiagnosticQuestionList;