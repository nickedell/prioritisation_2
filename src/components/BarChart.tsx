import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DiagnosticItem } from '../constants/diagnostic.ts';

// This defines the shape of the data a single bar receives
interface ChartDataPoint {
    dimension: DiagnosticItem;
    score: number;
}

interface BarChartComponentProps {
    data: ChartDataPoint[];
    onMouseEnter: (data: any) => void;
    onMouseLeave: () => void;
}

// A custom component to render the hierarchical tick labels
const CustomizedYAxisTick: React.FC<any> = (props) => {
    const { x, y, payload } = props;

    // Safety check: The full data object for the tick is in payload.payload
    if (!payload.payload.dimension) {
        return null;
    }

    const { dimension } = payload.payload;
    const parts = dimension.name.split(': ');

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={4} textAnchor="end" fill="#fff" fontSize={12}>
                {parts.map((part, index) => (
                    <tspan
                        key={index}
                        x={-10}
                        dy={index > 0 ? 15 : 0}
                        fontWeight={index === 0 ? 'bold' : 'normal'}
                    >
                        {index > 0 && '↳ '}
                        {part}
                    </tspan>
                ))}
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
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis type="number" domain={[0, 5]} stroke="#fff" tickCount={6} />
                <YAxis
                    yAxisId={0}
                    dataKey="dimension.name" // Use the unique name as the key for the axis
                    type="category"
                    stroke="#fff"
                    width={220}
                    tick={<CustomizedYAxisTick />} // Use our custom component for rendering
                    interval={0} // Ensure every single label is rendered
                />
                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    contentStyle={{ backgroundColor: '#333', border: 'none' }}
                />
                <Bar dataKey="score" fill="#8884d8" barSize={15} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;