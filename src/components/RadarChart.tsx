import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface ChartData {
    subject: string;
    score: number;
    fullMark: number;
}

interface RadarChartComponentProps {
    data: ChartData[];
}

const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#555" />
                <PolarAngleAxis dataKey="subject" stroke="#fff" tickLine={false} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} stroke="#555" />
                <Radar name="Maturity Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default RadarChartComponent;