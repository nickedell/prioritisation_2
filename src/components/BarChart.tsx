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

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, height = 350, onMouseEnter, onMouseLeave }) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis type="number" domain={[0, 5]} stroke="#9CA3AF" tickCount={6} />
                
                {/* UPDATE: Re-added the YAxis component, but with tick={false} to hide the labels */}
                <YAxis type="category" dataKey="dimension.name" yAxisId={0} tick={false} axisLine={true} width={1} />

                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#F9FAFB' }}
                    formatter={(value, name, props) => [value, props.payload.dimension.name]}
                />
                <Bar dataKey="score" yAxisId={0} fill="#8884d8" barSize={12} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;