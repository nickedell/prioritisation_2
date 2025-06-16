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
                
                {/* UPDATE: Using a standard YAxis component for debugging */}
                <YAxis
                    dataKey="dimension.name" // This tells the axis what text to display
                    type="category"
                    stroke="#fff"
                    width={220}
                    interval={0} // Ensure every label tries to render
                    tick={{ fontSize: 10 }} // Make the font small to fit
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