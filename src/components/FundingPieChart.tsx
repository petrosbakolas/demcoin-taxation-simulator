
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { InfrastructureType } from '../types';

interface FundingPieChartProps {
    type: InfrastructureType;
}

const dataMap = {
    'Revenue-Generating': [
        { name: 'Investment Pool (Wealthy)', value: 70 },
        { name: 'Investment Pool (Middle Class)', value: 20 },
        { name: 'Subsidized Access (Working Class)', value: 10 },
    ],
    'Public Good': [
        { name: 'Ultra-Wealthy Contributions', value: 50 },
        { name: 'Commons Treasury', value: 30 },
        { name: 'Middle-Class Voluntary', value: 20 },
    ],
    'Mixed Benefit': [
        { name: 'Future Revenue Pool', value: 40 },
        { name: 'Commons Treasury', value: 30 },
        { name: 'Property Value Capture', value: 20 },
        { name: 'External Partnership', value: 10 },
    ],
};

const COLORS = ['#4fd1c5', '#81e6d9', '#b2f5ea', '#4a5568', '#a0aec0'];

export const FundingPieChart: React.FC<FundingPieChartProps> = ({ type }) => {
    const data = dataMap[type];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip 
                    formatter={(value: number) => `${value}%`}
                    contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568', color: '#e2e8f0' }}
                />
                 <Legend wrapperStyle={{ color: '#e2e8f0', fontSize: '14px' }} />
            </PieChart>
        </ResponsiveContainer>
    );
};
