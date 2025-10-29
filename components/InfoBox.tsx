
import React from 'react';
import { Info } from 'lucide-react';

interface InfoBoxProps {
    title: string;
    children: React.ReactNode;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, children }) => {
    return (
        <div className="bg-demcoin-panel p-5 rounded-lg border border-demcoin-border">
            <h3 className="text-lg font-bold text-demcoin-accent flex items-center mb-2">
                <Info className="w-5 h-5 mr-2" />
                {title}
            </h3>
            <p className="text-sm text-demcoin-text-secondary leading-relaxed">
                {children}
            </p>
        </div>
    );
};
