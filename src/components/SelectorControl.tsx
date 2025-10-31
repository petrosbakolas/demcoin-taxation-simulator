
import React from 'react';
import type { SelectorOption } from '../types';

interface SelectorControlProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[] | SelectorOption[];
}

export const SelectorControl: React.FC<SelectorControlProps> = ({ label, value, onChange, options }) => {
    const isSimpleArray = typeof options[0] === 'string';

    return (
        <div>
            <label className="block text-sm font-medium text-demcoin-text-secondary mb-1">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="w-full bg-gray-700 border border-demcoin-border text-demcoin-text text-sm rounded-lg focus:ring-demcoin-accent focus:border-demcoin-accent block p-2.5"
            >
                {isSimpleArray 
                    ? (options as string[]).map(opt => <option key={opt} value={opt}>{opt}</option>)
                    : (options as SelectorOption[]).map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)
                }
            </select>
        </div>
    );
};
