
export interface Persona {
    id: string;
    name: string;
    description: string;
    wealth: number;
    wisdomScore: number;
    participation: number; // as a decimal, e.g., 0.4 for 40%
    redistribution: number;
}

export type InfrastructureType = 'Revenue-Generating' | 'Public Good' | 'Mixed Benefit';

export interface SelectorOption {
    value: string;
    label: string;
}
