// src/components/BarChart.tsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// This interface is simplified as the chart only needs name and score
interface ChartDataPoint {
    name: string;
    score: number;
}

interface BarChartComponentProps {
    data: ChartDataPoint[];
    // These props are no longer needed by this version of the chart
    // onMouseEnter: (data: any) => void; 
    // onMouseLeave: () => void;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis type="number" domain={[0, 5]} stroke="#9CA3AF" tickCount={6} />
                <YAxis type="category" dataKey="name" stroke="#9CA3AF" width={150} />
                
                {/* CORRECTED TOOLTIP LOGIC */}
                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#F9FAFB' }}
                    // This formatter is now safer and checks if payload exists before using it
                    formatter={(value: number, name: string, props: any) => {
                        if (props.payload && props.payload.name) {
                            return [value, 'Score'];
                        }
                        return [value, name];
                    }}
                    // This sets the title of the tooltip
                    labelFormatter={(label) => label}
                />
                <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;