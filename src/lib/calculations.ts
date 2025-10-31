
// Base Stake Rate (BSR)
export function calculateBSR(wealth: number): number {
  if (wealth < 100000) return 0.03;
  if (wealth < 500000) return 0.05;
  if (wealth < 2000000) return 0.08;
  if (wealth < 10000000) return 0.12;
  return 0.15;
}

// Redistribution Multiplier (RM)
export function calculateRM(wealth: number, redistribution: number): number {
  if (wealth === 0) return 1;
  const redistributionRate = redistribution / wealth;
  const multiplier = 1 - (redistributionRate * 2);
  return Math.max(0.5, multiplier); // Minimum 50% of base
}

// Wisdom Multiplier (WM)
export function calculateWM(wisdomScore: number): number {
  return 1 - (wisdomScore / 100) * 0.3;
}

// Governance Multiplier (GM)
export function calculateGM(participationRate: number): number {
  return 1 - (participationRate * 0.2);
}

// Final Stake Calculation
export function calculateFinalStake(wealth: number, redistribution: number, wisdom: number, participation: number): number {
  const bsr = calculateBSR(wealth);
  const rm = calculateRM(wealth, redistribution);
  const wm = calculateWM(wisdom);
  const gm = calculateGM(participation);
  
  const finalStake = wealth * bsr * rm * wm * gm;
  const minimumStake = wealth * 0.02; // Never below 2%
  
  return Math.max(finalStake, minimumStake);
}
