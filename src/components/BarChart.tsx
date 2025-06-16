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
            <text x={0} y={0} dy={4} textAnchor="end" fill="#E5E7EB" fontSize={12}>
                <tspan x={-10} dy={parts.length > 1 ? -4 : 0} fontWeight="bold">
                    {parts[0]}
                </tspan>
                {parts.length > 1 && (
                    <tspan x={-10} dy="1.1em" fill="#9CA3AF">
                        ↳ {parts[1]}
                    </tspan>
                )}
            </text>
        </g>
    );
};


const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, height = 350, onMouseEnter, onMouseLeave }) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 180, bottom: 20 }}>
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
                    tickMargin={5}
                />
                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#F9FAFB' }}
                />
                <Bar dataKey="score" fill="#8884d8" barSize={12} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;