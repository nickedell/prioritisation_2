import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Weights } from '../types/index.ts';

interface ConfigurationProps {
    weights: Weights;
    setWeights: (weights: Weights) => void;
    darkMode: boolean;
}

const defaultWeights: Weights = {
    businessImpact: 35,
    feasibility: 30,
    political: 20,
    foundation: 15,
};

const Configuration: React.FC<ConfigurationProps> = ({ weights, setWeights, darkMode }) => {
    const [showConfigure, setShowConfigure] = useState(false);
    const [showCriteriaDetails, setShowCriteriaDetails] = useState(false);
    const [chartType, setChartType] = useState('pie');

    const handleWeightChange = (criterion: keyof Weights, value: string) => {
        const newValue = Math.max(1, Math.min(97, parseInt(value) || 1));
        const otherCriteria = (Object.keys(weights) as Array<keyof Weights>).filter(key => key !== criterion);
        const otherSum = otherCriteria.reduce((sum, key) => sum + weights[key], 0);
        const remaining = 100 - newValue;

        if (remaining >= 3 && otherSum > 0) {
            const newWeights = { ...weights, [criterion]: newValue };
            const factor = remaining / otherSum;
            otherCriteria.forEach(key => {
                newWeights[key] = Math.max(1, Math.round(weights[key] * factor));
            });
            
            const total = Object.values(newWeights).reduce((sum, weight) => sum + weight, 0);
            if (total !== 100) {
                const diff = 100 - total;
                newWeights.businessImpact += diff;
            }
            
            setWeights(newWeights);
        }
    };

    const resetToDefaults = () => setWeights(defaultWeights);

    const getPieSegments = () => {
        let currentAngle = -90;
        const segments = [];
        const criteriaOrder: (keyof Weights)[] = ['businessImpact', 'feasibility', 'political', 'foundation'];
        const colors = darkMode ? ['#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6'] : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        
        criteriaOrder.forEach((key, index) => {
            const percentage = weights[key];
            const angle = (percentage / 100) * 360;
            const endAngle = currentAngle + angle;
            const radius = 80, centerX = 100, centerY = 100;
            const startAngleRad = (currentAngle * Math.PI) / 180;
            const endAngleRad = (endAngle * Math.PI) / 180;
            const midAngleRad = ((currentAngle + endAngle) / 2 * Math.PI) / 180;
            const x1 = centerX + radius * Math.cos(startAngleRad);
            const y1 = centerY + radius * Math.sin(startAngleRad);
            const x2 = centerX + radius * Math.cos(endAngleRad);
            const y2 = centerY + radius * Math.sin(endAngleRad);
            const labelX = centerX + (radius * 0.7) * Math.cos(midAngleRad);
            const labelY = centerY + (radius * 0.7) * Math.sin(midAngleRad);
            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = [`M ${centerX} ${centerY}`, `L ${x1} ${y1}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, 'Z'].join(' ');
            
            segments.push({ key, pathData, color: colors[index], percentage, labelX, labelY });
            currentAngle = endAngle;
        });
        return segments;
    };

    const getBarSegments = () => {
        const criteriaOrder: (keyof Weights)[] = ['businessImpact', 'feasibility', 'political', 'foundation'];
        const colors = darkMode ? ['#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6'] : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        const labels = ['Business Impact', 'Feasibility', 'Political Viability', 'Foundation Building'];
        let cumulativeWidth = 0;
        return criteriaOrder.map((key, index) => {
            const width = weights[key];
            const segment = { key, width, left: cumulativeWidth, color: colors[index], label: labels[index], percentage: weights[key] };
            cumulativeWidth += width;
            return segment;
        });
    };

    const detailsContent = [
        { title: 'Business Impact Potential', description: 'Measures how significantly this improvement will affect business outcomes, including revenue, risk mitigation, efficiency gains, and strategic objectives.', scale: ['5 - Critical: Directly impacts revenue, risk, or strategic objectives', '4 - High: Significant efficiency gains or cost reduction', '3 - Medium: Moderate improvement in business processes', '2 - Low: Minor operational benefits', '1 - Minimal: Limited business value'], questions: ['Will fixing this meaningfully improve business outcomes?', 'Does this address a major business pain point?', 'Will this improve data trust/reputation?', 'Can we measure ROI within 6-12 months?'] },
        { title: 'Implementation Feasibility', description: 'Assesses how realistic it is to deliver this improvement given available resources, organizational constraints, and technical dependencies.', scale: ['5 - Very Easy: Can implement immediately with existing resources', '4 - Easy: Minor effort, clear solution path', '3 - Moderate: Requires some new processes/tools but achievable', '2 - Hard: Significant effort, multiple dependencies', '1 - Very Hard: Major organizational change or technical overhaul required'], questions: ['Can we realistically deliver this with available resources?', 'Do we control the key levers for change?', 'What\'s the resource requirement (people, time, budget)?', 'Are there technical or regulatory constraints?'] },
        { title: 'Political Viability', description: 'Evaluates the likelihood of gaining necessary stakeholder support and navigating organizational politics to successfully implement this change.', scale: ['5 - Strong Support: Data Office and business actively supportive', '4 - Good Support: Some resistance but overall positive', '3 - Neutral: Mixed views, manageable politics', '2 - Some Resistance: Significant political hurdles to overcome', '1 - Strong Resistance: Major stakeholder opposition expected'], questions: ['Can we get the stakeholder support needed to succeed?', 'Does this step on Data Office territorial concerns?', 'Will the business champion this change?', 'Are there hidden political landmines?'] },
        { title: 'Foundation Building', description: 'Measures how much this improvement enables or unlocks other future improvements, building organizational capability and creating positive momentum.', scale: ['5 - Critical Foundation: Enables multiple other improvements', '4 - Important Enabler: Supports several other initiatives', '3 - Some Enablement: Helps with a few other areas', '2 - Limited Enablement: Minor knock-on effects', '1 - Standalone: Doesn\'t particularly enable other improvements'], questions: ['Does this unlock other improvements down the line?', 'Is this a prerequisite for other high-value changes?', 'Does this build organizational capability for future improvements?', 'Will this create positive momentum for the broader TOM?'] }
    ];

    return (
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Business Impact ({weights.businessImpact}%)</strong><br />1=Minimal, 5=Critical</div>
                <div><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Feasibility ({weights.feasibility}%)</strong><br />1=Very Hard, 5=Very Easy</div>
                <div><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Political Viability ({weights.political}%)</strong><br />1=Strong Resistance, 5=Strong Support</div>
                <div><strong className={darkMode ? 'text-white' : 'text-gray-900'}>Foundation Building ({weights.foundation}%)</strong><br />1=Standalone, 5=Critical Foundation</div>
            </div>
            
            <button onClick={() => setShowConfigure(!showConfigure)} className={`flex items-center font-semibold w-full transition-colors mb-3 ${darkMode ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                {showConfigure ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                Configure
            </button>
            
            {showConfigure && (
                 <div className="mb-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Adjust Criteria Weights</h4>
                        <div className="flex items-center space-x-3">
                            <button onClick={resetToDefaults} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Reset to Default</button>
                            <div className={`flex items-center space-x-2 rounded p-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <button onClick={() => setChartType('pie')} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${chartType === 'pie' ? (darkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-900 shadow-sm') : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}>Pie Chart</button>
                                <button onClick={() => setChartType('bar')} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${chartType === 'bar' ? (darkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-900 shadow-sm') : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}>Bar Chart</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center min-h-[210px]">
                        {chartType === 'pie' ? (
                            <svg width="200" height="200" viewBox="0 0 200 200" className="select-none">
                                {getPieSegments().map(s => <g key={s.key}><path d={s.pathData} fill={s.color} stroke={darkMode ? "#374151" : "#d1d5db"} strokeWidth="2"/><text x={s.labelX} y={s.labelY} textAnchor="middle" dominantBaseline="middle" className="text-xs font-semibold pointer-events-none" fill={darkMode ? "#111827" : "#ffffff"}>{s.percentage}%</text></g>)}
                            </svg>
                        ) : (
                            <div className="w-full max-w-md">
                                <div className={`relative h-16 rounded border overflow-hidden ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                    {getBarSegments().map(s => <div key={s.key} className="absolute top-0 h-full transition-all duration-150" style={{left: `${s.left}%`, width: `${s.width}%`, backgroundColor: s.color}}><div className="flex items-center justify-center h-full"><span className="text-xs font-semibold" style={{color: darkMode ? "#111827" : "#ffffff"}}>{s.percentage}%</span></div></div>)}
                                </div>
                                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                    {getBarSegments().map(s => <div key={s.key} className="flex items-center space-x-2"><div className="w-3 h-3 rounded-sm" style={{backgroundColor: s.color}}/><span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{s.label}</span></div>)}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(Object.keys(weights) as Array<keyof Weights>).map(criterion => (
                            <div key={criterion}>
                                <label className={`block text-xs mb-1 capitalize ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{criterion.replace(/([A-Z])/g, ' $1').trim()}</label>
                                <input type="number" min="1" max="97" value={weights[criterion]} onChange={(e) => handleWeightChange(criterion, e.target.value)} className={`w-full px-2 py-1 text-xs border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                            </div>
                        ))}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total: {Object.values(weights).reduce((s, v) => s + v, 0)}%</div>
                 </div>
            )}
            
            <button onClick={() => setShowCriteriaDetails(!showCriteriaDetails)} className={`flex items-center font-semibold w-full transition-colors mt-4 ${darkMode ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                {showCriteriaDetails ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                Details
            </button>
            
            {showCriteriaDetails && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                    {detailsContent.map(item => (
                        <div key={item.title} className="flex flex-col space-y-3">
                            <h4 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{item.title}</h4>
                            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{item.description}</p>
                            <div className="flex-1">
                                <div className="space-y-1 text-xs">
                                    {item.scale.map(line => {
                                        const [level, desc] = line.split(/:(.*)/s);
                                        return <div key={level}><span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{level}:</span> <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{desc}</span></div>
                                    })}
                                </div>
                            </div>
                            <div className={`text-xs p-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'} mt-auto`}>
                                <strong className={darkMode ? 'text-gray-300' : 'text-gray-800'}>Key Questions:</strong>
                                <ul className={`mt-1 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {item.questions.map(q => <li key={q}>• {q}</li>)}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Configuration;