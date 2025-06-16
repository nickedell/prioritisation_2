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

// UPDATE: The custom tick component is no longer needed and has been removed.

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, height = 350, onMouseEnter, onMouseLeave }) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                layout="vertical"
                data={data}
                // UPDATE: The left margin is reduced as there are no labels.
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis type="number" domain={[0, 5]} stroke="#9CA3AF" tickCount={6} />
                
                {/* UPDATE: The YAxis component has been removed completely. */}
                
                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#F9FAFB' }}
                    // This formatter will show the dimension name in the tooltip header
                    formatter={(value, name, props) => [value, props.payload.dimension.name]}
                />
                <Bar dataKey="score" fill="#8884d8" barSize={12} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;