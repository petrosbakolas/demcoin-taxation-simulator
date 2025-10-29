
import React from 'react';
import { formatCurrency } from '../lib/utils';

interface IncentiveMatrixProps {
    data: {
        name: string;
        hoardingStake: number;
        generousStake: number;
        diff: number;
    }[];
}

export const IncentiveMatrix: React.FC<IncentiveMatrixProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-demcoin-text-secondary">
                <thead className="text-xs text-demcoin-text uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">Persona</th>
                        <th scope="col" className="px-6 py-3 text-right">Hoarding Strategy Stake</th>
                        <th scope="col" className="px-6 py-3 text-right">Generous Strategy Stake</th>
                        <th scope="col" className="px-6 py-3 text-right">Difference (Savings)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="bg-demcoin-panel border-b border-demcoin-border hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-demcoin-text whitespace-nowrap">{row.name}</th>
                            <td className="px-6 py-4 text-right text-red-400">{formatCurrency(row.hoardingStake)}</td>
                            <td className="px-6 py-4 text-right text-green-400">{formatCurrency(row.generousStake)}</td>
                            <td className={`px-6 py-4 text-right font-bold ${row.diff < 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {formatCurrency(row.diff)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
