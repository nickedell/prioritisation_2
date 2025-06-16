import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DiagnosticItem } from '../constants/diagnostic.ts';

interface ChartData {
    dimension: DiagnosticItem;
    score: number;
}

interface BarChartComponentProps {
    data: ChartData[];
    onMouseEnter: (data: any) => void;
    onMouseLeave: () => void;
}

// UPDATE: This component is now styled to be more legible.
const CustomizedYAxisTick: React.FC<any> = (props) => {
    const { x, y, payload } = props;

    if (typeof payload.value === 'undefined') {
        return null; 
    }

    const name = payload.value;
    const parts = name.split(': ');

    // Main dimension part (e.g., "Governance")
    const primaryText = parts[0];
    // Sub-dimension part (e.g., "Risk Management"), if it exists
    const secondaryText = parts.length > 1 ? parts[1] : null;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={4} textAnchor="end" fill="#E5E7EB" fontSize={12}>
                <tspan x={-10} dy={0} fontWeight="bold">
                    {primaryText}
                </tspan>
                {/* If there is a second part, render it on a new line and indented */}
                {secondaryText && (
                    <tspan x={-10} dy="1.2em" fill="#9CA3AF">
                        ↳ {secondaryText}
                    </tspan>
                )}
            </text>
        </g>
    );
};


const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, onMouseEnter, onMouseLeave }) => {
    return (
        <ResponsiveContainer width="100%" height={550}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 5, right: 30, left: 180, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis type="number" domain={[0, 5]} stroke="#9CA3AF" tickCount={6} />
                <YAxis
                    yAxisId={0}
                    dataKey="dimension.name"
                    type="category"
                    stroke="#9CA3AF"
                    width={220}
                    tick={<CustomizedYAxisTick />}
                    interval={0}
                    // Add extra space between ticks for multi-line labels
                    tickMargin={20}
                />
                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#F9FAFB' }}
                />
                <Bar dataKey="score" fill="#8884d8" barSize={15} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;