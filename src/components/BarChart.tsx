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

const CustomizedYAxisTick: React.FC<any> = (props) => {
    const { x, y, payload } = props;
    const name = payload.value;

    if (typeof name !== 'string') { return null; }

    const parts = name.split(': ');

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={4} textAnchor="end" fill="#E5E7EB" fontSize={10}>
                {parts.map((part, index) => (
                    <tspan key={index} x={-5} dy={index > 0 ? 12 : 0} fontWeight={index === 0 ? 'bold' : 'normal'} fill={index > 0 ? '#9CA3AF' : '#E5E7EB'}>
                        {index > 0 && '↳ '}
                        {part}
                    </tspan>
                ))}
            </text>
        </g>
    );
};

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, height = 350, onMouseEnter, onMouseLeave }) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                layout="vertical"
                data={data}
                // UPDATE: Reduced left margin and bar size for smaller containers
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis type="number" domain={[0, 5]} stroke="#9CA3AF" tickCount={6} />
                <YAxis
                    yAxisId={0}
                    dataKey="dimension.name"
                    type="category"
                    stroke="#9CA3AF"
                    // UPDATE: Reduced width of the axis area
                    width={150}
                    tick={<CustomizedYAxisTick />}
                    interval={0}
                    tickMargin={5}
                />
                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#F9FAFB' }}
                />
                <Bar dataKey="score" yAxisId={0} fill="#8884d8" barSize={10} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;