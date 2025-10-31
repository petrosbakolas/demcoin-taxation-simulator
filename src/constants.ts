
import type { Persona, InfrastructureType } from './types';

export const personas: Persona[] = [
  {
    id: 'a',
    name: 'Ultra-Wealthy Tech Founder',
    description: 'Top 0.01%',
    wealth: 50_000_000,
    wisdomScore: 65,
    participation: 0.40,
    redistribution: 5_000_000,
  },
  {
    id: 'b',
    name: 'Generous Philanthropist',
    description: 'Top 0.1%',
    wealth: 20_000_000,
    wisdomScore: 85,
    participation: 0.80,
    redistribution: 8_000_000,
  },
  {
    id: 'c',
    name: 'Wealthy Business Owner',
    description: 'Top 1%',
    wealth: 3_000_000,
    wisdomScore: 55,
    participation: 0.30,
    redistribution: 100_000,
  },
  {
    id: 'd',
    name: 'Professional Middle Class',
    description: 'Median',
    wealth: 300_000,
    wisdomScore: 70,
    participation: 0.60,
    redistribution: 10_000,
  },
  {
    id: 'e',
    name: 'Working Class Activist',
    description: 'Lower Middle',
    wealth: 50_000,
    wisdomScore: 90,
    participation: 0.95,
    redistribution: 2_000,
  },
  {
    id: 'f',
    name: 'Struggling Worker',
    description: 'Bottom 20%',
    wealth: 15_000,
    wisdomScore: 45,
    participation: 0.50,
    redistribution: 500,
  },
];

export const INFRASTRUCTURE_TYPES: InfrastructureType[] = [
    'Revenue-Generating',
    'Public Good',
    'Mixed Benefit'
];
