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
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, height = 350 }) => {
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
                    type="category"
                    dataKey="dimension.name" // We are just using the default text label for now
                    stroke="#9CA3AF"
                    width={220}
                    interval={0}
                    tick={{ fontSize: 10 }} // Use a small font to prevent overlap
                />
                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#F9FAFB' }}
                />
                <Bar dataKey="score" fill="#8884d8" barSize={12} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;