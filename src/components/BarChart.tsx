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

// This is the corrected custom component to render the hierarchical tick labels
const CustomizedYAxisTick: React.FC<any> = (props) => {
    const { x, y, payload } = props;

    // The full dimension name is in payload.value
    const name = payload.value;

    // Safety check: if there's no name, don't render anything
    if (typeof name === 'undefined') {
        return null; 
    }

    const parts = name.split(': ');

    return (
        <g transform={`translate(<span class="math-inline">\{x\},</span>{y})`}>
            <text x={0} y={0} dy={4} textAnchor="end" fill="#fff" fontSize={12}>
                {parts.map((part, index) => (
                    <tspan
                        key={index}
                        x={-10}
                        dy={index > 0 ? 15 : 0} // Add vertical space for the second line
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
                    dataKey="dimension.name" // Use the unique