
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../lib/utils';

interface CommunityStakeChartProps {
    data: { name: string; finalStake: number }[];
}

export const CommunityStakeChart: React.FC<CommunityStakeChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="name" stroke="#a0aec0" tick={{ fontSize: 12 }} />
                <YAxis stroke="#a0aec0" tickFormatter={(tick) => formatCurrency(tick)} />
                <Tooltip
                    cursor={{ fill: 'rgba(74, 85, 104, 0.5)' }}
                    contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568', color: '#e2e8f0' }}
                    formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="finalStake" fill="#4fd1c5" />
            </BarChart>
        </ResponsiveContainer>
    );
};
