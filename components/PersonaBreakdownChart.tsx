
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '../lib/utils';

interface PersonaBreakdownChartProps {
    data: { name: string; value: number }[];
}

const colors = ['#f87171', '#fb923c', '#facc15', '#4fd1c5'];

export const PersonaBreakdownChart: React.FC<PersonaBreakdownChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis type="number" stroke="#a0aec0" tickFormatter={(tick) => formatCurrency(tick)} />
                <YAxis dataKey="name" type="category" stroke="#a0aec0" width={80} />
                <Tooltip
                    cursor={{ fill: 'rgba(74, 85, 104, 0.5)' }}
                    contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568', color: '#e2e8f0' }}
                    formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="value" barSize={30}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
