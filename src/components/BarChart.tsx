import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DiagnosticItem } from '../constants/diagnostic.ts';

interface ChartDataPoint {
    dimension: DiagnosticItem;
    score: number;
}

interface BarChartComponentProps {
    data: ChartDataPoint[];
    height?: number;
    onMouseEnter: (data: any) => void;
    onMouseLeave: () => void;
}

// A custom component to render the hierarchical tick labels
const CustomizedYAxisTick: React.FC<any> = (props) => {
    const { x, y, payload } = props;

    // The full dimension name is in payload.value
    const name = payload.value;

    // A safety check to prevent rendering if the name is not yet available
    if (typeof name !== 'string') {
        return null; 
    }

    const parts = name.split(': ');

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={4} textAnchor="end" fill="#E5E7EB" fontSize={12}>
                {parts.map((part, index) => (
                    <tspan
                        key={index}
                        x={-10}
                        dy={index > 0 ? 15 : 0} // Add vertical space for the second line
                        fontWeight={index === 0 ? 'bold' : 'normal'}
                        fill={index > 0 ? '#9CA3AF' : '#E5E7EB'} // Style sub-dimension differently
                    >
                        {/* Add an indented arrow for sub-dimensions */}
                        {index > 0 && '↳ '}
                        {part}
                    </tspan>
                ))}
            </text>
        </g>
    );
};


const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, height = 550, onMouseEnter, onMouseLeave }) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 5, right: 30, left: 180, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis type="number" domain={[0, 5]} stroke="#9CA3AF" tickCount={6} />
                <YAxis
                    yAxisId={0}
                    dataKey="dimension.name" // This tells the axis what text to display
                    type="category"
                    stroke="#9CA3AF"
                    width={220}
                    tick={<CustomizedYAxisTick />} // Use our custom component for rendering
                    interval={0} // Ensure every single label is rendered
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