
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Persona } from '../types';

interface DistributionComparisonChartProps {
    data: (Persona & { finalStake: number })[];
}

const getDistribution = (personas: (Persona & { finalStake: number })[]) => {
    const sortedByWealth = [...personas].sort((a, b) => b.wealth - a.wealth);
    const totalWealth = sortedByWealth.reduce((sum, p) => sum + p.wealth, 0);
    const totalStake = sortedByWealth.reduce((sum, p) => sum + p.finalStake, 0);

    // This is a simplified grouping for 6 personas.
    // Top 10% -> Persona 1
    // Middle 40% -> Personas 2, 3
    // Bottom 50% -> Personas 4, 5, 6
    const top10 = sortedByWealth.slice(0, 1);
    const middle40 = sortedByWealth.slice(1, 3);
    const bottom50 = sortedByWealth.slice(3);

    const wealthDist = {
        'Top 10%': top10.reduce((s, p) => s + p.wealth, 0) / totalWealth,
        'Middle 40%': middle40.reduce((s, p) => s + p.wealth, 0) / totalWealth,
        'Bottom 50%': bottom50.reduce((s, p) => s + p.wealth, 0) / totalWealth,
    };

    const stakeDist = {
        'Top 10%': top10.reduce((s, p) => s + p.finalStake, 0) / totalStake,
        'Middle 40%': middle40.reduce((s, p) => s + p.finalStake, 0) / totalStake,
        'Bottom 50%': bottom50.reduce((s, p) => s + p.finalStake, 0) / totalStake,
    };
    
    return [
        { name: 'Top 10%', wealth: wealthDist['Top 10%'] * 100, stake: stakeDist['Top 10%'] * 100 },
        { name: 'Middle 40%', wealth: wealthDist['Middle 40%'] * 100, stake: stakeDist['Middle 40%'] * 100 },
        { name: 'Bottom 50%', wealth: wealthDist['Bottom 50%'] * 100, stake: stakeDist['Bottom 50%'] * 100 },
    ];
};

export const DistributionComparisonChart: React.FC<DistributionComparisonChartProps> = ({ data }) => {
    const chartData = useMemo(() => getDistribution(data), [data]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568"/>
                <XAxis dataKey="name" stroke="#a0aec0" />
                <YAxis stroke="#a0aec0" unit="%" />
                <Tooltip 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    cursor={{ fill: 'rgba(74, 85, 104, 0.5)' }}
                    contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568', color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                <Bar dataKey="wealth" name="Wealth Distribution" fill="#8884d8" />
                <Bar dataKey="stake" name="Stake Distribution" fill="#4fd1c5" />
            </BarChart>
        </ResponsiveContainer>
    );
};
