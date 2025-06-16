import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    subject: string;
    score: number;
}

interface BarChartComponentProps {
    data: ChartData[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 100, // Increased left margin for long labels
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis type="number" domain={[0, 5]} stroke="#fff" tickCount={6} />
                <YAxis type="category" dataKey="subject" stroke="#fff" width={150} tick={{ fontSize: 12 }} />
                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    contentStyle={{ backgroundColor: '#333', border: 'none' }}
                />
                <Bar dataKey="score" fill="#8884d8" barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;