import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    subject: string;
    score: number;
}

interface BarChartComponentProps {
    data: ChartData[];
    onMouseEnter: (data: any) => void;
    onMouseLeave: () => void;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, onMouseEnter, onMouseLeave }) => {
    return (
        // UPDATE: Changed height from 450 to 350
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 120,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis type="number" domain={[0, 5]} stroke="#fff" tickCount={6} />
                <YAxis yAxisId={0} type="category" dataKey="subject" stroke="#fff" width={150} tick={{ fontSize: 12 }} />
                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    contentStyle={{ backgroundColor: '#333', border: 'none' }}
                />
                {/* UPDATE: Added mouse events to the bar to trigger the hover effect */}
                <Bar dataKey="score" fill="#8884d8" barSize={20} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;