
import React from 'react';

interface SliderControlProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
    format: (value: number) => string;
}

export const SliderControl: React.FC<SliderControlProps> = ({ label, value, min, max, step, onChange, format }) => {
    return (
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <label className="text-sm font-medium text-demcoin-text-secondary">{label}</label>
                <span className="text-sm font-semibold text-demcoin-accent">{format(value)}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-demcoin-border rounded-lg appearance-none cursor-pointer accent-demcoin-accent"
            />
        </div>
    );
};
