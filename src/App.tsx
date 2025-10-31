
import React, { useState, useMemo } from 'react';
import { personas, INFRASTRUCTURE_TYPES } from './constants';
import type { Persona, InfrastructureType } from './types';
import * as Calcs from './lib/calculations';
import { SliderControl } from './components/SliderControl';
import { SelectorControl } from './components/SelectorControl';
import { PersonaBreakdownChart } from './components/PersonaBreakdownChart';
import { CommunityStakeChart } from './components/CommunityStakeChart';
import { DistributionComparisonChart } from './components/DistributionComparisonChart';
import { FundingPieChart } from './components/FundingPieChart';
import { SviVsGdpChart } from './components/SviVsGdpChart';
import { IncentiveMatrix } from './components/IncentiveMatrix';
import { InfoBox } from './components/InfoBox';
import { formatCurrency, formatNumber, formatPercent } from './lib/utils';
import { Github, BookOpen, Mail } from 'lucide-react';
import { useDebounce } from './hooks/useDebounce';

const App: React.FC = () => {
    const [totalCommunityWealth, setTotalCommunityWealth] = useState(100_000_000);
    const [infrastructureInvestment, setInfrastructureInvestment] = useState(20_000_000);
    const [infrastructureType, setInfrastructureType] = useState<InfrastructureType>('Mixed Benefit');
    const [sviImpact, setSviImpact] = useState(30);
    const [numberOfResidents, setNumberOfResidents] = useState(100_000);
    const [selectedPersonaId, setSelectedPersonaId] = useState<string>('d');

    const debouncedSviImpact = useDebounce(sviImpact, 250);

    const selectedPersona = useMemo(() => {
        return personas.find(p => p.id === selectedPersonaId) || personas[3];
    }, [selectedPersonaId]);

    const communityCalculations = useMemo(() => {
        return personas.map(p => {
            const finalStake = Calcs.calculateFinalStake(p.wealth, p.redistribution, p.wisdomScore, p.participation);
            return {
                ...p,
                finalStake,
                totalContribution: finalStake + p.redistribution,
            };
        });
    }, []);

    const incentiveMatrixData = useMemo(() => {
        return personas.map(p => {
            const generousStake = Calcs.calculateFinalStake(p.wealth, p.redistribution, p.wisdomScore, p.participation);
            const hoardingStake = Calcs.calculateFinalStake(p.wealth, 0, 50, 0.1); // Hoarding: 0 redistribution, 50 wisdom, 10% participation
            return {
                name: p.name,
                hoardingStake,
                generousStake,
                diff: generousStake - hoardingStake,
            };
        });
    }, []);

    const personaCalculations = useMemo(() => {
        const { wealth, redistribution, wisdomScore, participation } = selectedPersona;
        const bsr = Calcs.calculateBSR(wealth);
        const rm = Calcs.calculateRM(wealth, redistribution);
        const wm = Calcs.calculateWM(wisdomScore);
        const gm = Calcs.calculateGM(participation);
    
        const baseStake = wealth * bsr;
        const afterRm = baseStake * rm;
        const afterWm = afterRm * wm;
        const finalStake = afterWm * gm;
    
        const finalStakeCorrected = Calcs.calculateFinalStake(wealth, redistribution, wisdomScore, participation);
    
        return {
            baseRate: bsr,
            redistributionDiscount: 1 - rm,
            wisdomDiscount: 1 - wm,
            participationDiscount: 1 - gm,
            finalEffectiveRate: finalStakeCorrected / wealth,
            wealth,
            baseStake,
            finalStake: finalStakeCorrected,
            redistribution,
            totalContribution: finalStakeCorrected + redistribution,
            chartData: [
                { name: 'Base Stake', value: baseStake },
                { name: 'After Redistribution', value: afterRm },
                { name: 'After Wisdom', value: afterWm },
                { name: 'Final Stake', value: finalStakeCorrected },
            ]
        };
    }, [selectedPersona]);

    const communityTotals = useMemo(() => {
        const totalStakes = communityCalculations.reduce((sum, p) => sum + p.finalStake, 0);
        const totalRedistribution = communityCalculations.reduce((sum, p) => sum + p.redistribution, 0);
        const totalTaxation = totalStakes + totalRedistribution;
        return {
            totalStakes,
            totalRedistribution,
            totalTaxation,
            commonsTreasury: totalStakes, // Assuming stakes go to commons
            totalTaxationRate: totalTaxation / totalCommunityWealth,
        };
    }, [communityCalculations, totalCommunityWealth]);


    return (
        <div className="min-h-screen bg-demcoin-bg text-demcoin-text p-4 sm:p-6 lg:p-8 font-sans">
            <header className="text-center mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-demcoin-accent">DemCoin Taxation Simulator</h1>
                <p className="text-lg text-demcoin-text-secondary mt-2">"From Coercion to Contribution"</p>
            </header>

            <main className="max-w-screen-2xl mx-auto space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls Panel */}
                    <div className="lg:col-span-1 bg-demcoin-panel p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 border-b border-demcoin-border pb-2">Simulation Controls</h2>
                        <div className="space-y-6">
                            <SliderControl
                                label="Total Community Wealth"
                                value={totalCommunityWealth}
                                min={10_000_000}
                                max={1_000_000_000}
                                step={1_000_000}
                                onChange={setTotalCommunityWealth}
                                format={formatCurrency}
                            />
                            <SliderControl
                                label="Proposed Infrastructure Investment"
                                value={infrastructureInvestment}
                                min={0}
                                max={100_000_000}
                                step={1_000_000}
                                onChange={setInfrastructureInvestment}
                                format={formatCurrency}
                            />
                            <SelectorControl
                                label="Infrastructure Type"
                                value={infrastructureType}
                                onChange={(e) => setInfrastructureType(e.target.value as InfrastructureType)}
                                options={INFRASTRUCTURE_TYPES}
                            />
                            <SliderControl
                                label="Projected Social Value Index (SVI) Impact"
                                value={sviImpact}
                                min={-50}
                                max={100}
                                step={1}
                                onChange={setSviImpact}
                                format={formatNumber}
                            />
                             <SliderControl
                                label="Number of Residents"
                                value={numberOfResidents}
                                min={10000}
                                max={1000000}
                                step={1000}
                                onChange={setNumberOfResidents}
                                format={formatNumber}
                            />
                            <SelectorControl
                                label="Select Persona"
                                value={selectedPersonaId}
                                onChange={(e) => setSelectedPersonaId(e.target.value)}
                                options={personas.map(p => ({ value: p.id, label: p.name }))}
                            />
                        </div>
                    </div>

                    {/* Persona Breakdown */}
                    <div className="lg:col-span-2 bg-demcoin-panel p-6 rounded-lg shadow-lg">
                         <h2 className="text-2xl font-bold mb-2">{selectedPersona.name} - Stake Breakdown</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="h-80">
                                <PersonaBreakdownChart data={personaCalculations.chartData} />
                            </div>
                            <div className="space-y-3 text-sm flex flex-col justify-center">
                                <div className="grid grid-cols-2 gap-2">
                                    <span className="font-semibold">Base Rate:</span><span>{formatPercent(personaCalculations.baseRate)}</span>
                                    <span className="font-semibold text-orange-400">Redistribution Discount:</span><span className="text-orange-400">-{formatPercent(personaCalculations.redistributionDiscount)}</span>
                                    <span className="font-semibold text-yellow-400">Wisdom Discount:</span><span className="text-yellow-400">-{formatPercent(personaCalculations.wisdomDiscount)}</span>
                                    <span className="font-semibold text-green-400">Participation Discount:</span><span className="text-green-400">-{formatPercent(personaCalculations.participationDiscount)}</span>
                                    <span className="font-bold text-demcoin-accent text-base mt-2">Final Effective Rate:</span><span className="font-bold text-demcoin-accent text-base mt-2">{formatPercent(personaCalculations.finalEffectiveRate)}</span>
                                </div>
                                <div className="border-t border-demcoin-border my-3"></div>
                                <div className="grid grid-cols-2 gap-2">
                                    <span className="font-semibold">Wealth:</span><span>{formatCurrency(personaCalculations.wealth)}</span>
                                    <span className="font-semibold">Base Stake:</span><span>{formatCurrency(personaCalculations.baseStake)}</span>
                                    <span className="font-semibold text-demcoin-accent">Final Stake:</span><span className="text-demcoin-accent">{formatCurrency(personaCalculations.finalStake)}</span>
                                    <span className="font-semibold">Redistribution:</span><span>{formatCurrency(personaCalculations.redistribution)}</span>
                                    <span className="font-bold text-lg mt-2">Total Contribution:</span><span className="font-bold text-lg mt-2">{formatCurrency(personaCalculations.totalContribution)}</span>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>

                <div className="bg-demcoin-panel p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Community-Wide Stake Distribution</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center mb-4">
                        <div><h3 className="text-demcoin-text-secondary">Total Stakes</h3><p className="text-xl font-bold text-demcoin-accent">{formatCurrency(communityTotals.totalStakes)}</p></div>
                        <div><h3 className="text-demcoin-text-secondary">Total Redistribution</h3><p className="text-xl font-bold">{formatCurrency(communityTotals.totalRedistribution)}</p></div>
                        <div><h3 className="text-demcoin-text-secondary">Commons Treasury</h3><p className="text-xl font-bold">{formatCurrency(communityTotals.commonsTreasury)}</p></div>
                        <div><h3 className="text-demcoin-text-secondary">Total "Taxation"</h3><p className="text-xl font-bold">{formatPercent(communityTotals.totalTaxationRate)}</p></div>
                    </div>
                    <div className="h-80">
                        <CommunityStakeChart data={communityCalculations} />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-demcoin-panel p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Wealth vs. Stake Distribution</h2>
                        <div className="h-96">
                            <DistributionComparisonChart data={communityCalculations} />
                        </div>
                    </div>
                    <div className="bg-demcoin-panel p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Infrastructure Funding Breakdown</h2>
                        <div className="h-96">
                            <FundingPieChart type={infrastructureType} />
                        </div>
                    </div>
                </div>

                <div className="bg-demcoin-panel p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">SVI vs. GDP Comparison</h2>
                    <p className="text-demcoin-text-secondary mb-4">Analysis of a project with a projected SVI impact of <span className="font-bold text-demcoin-accent">{debouncedSviImpact}</span> points.</p>
                    <div className="h-96">
                        <SviVsGdpChart sviImpact={debouncedSviImpact} />
                    </div>
                </div>
                
                <div className="bg-demcoin-panel p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Behavioral Incentives Matrix</h2>
                     <p className="text-demcoin-text-secondary mb-4">Comparing a persona's default "Generous Strategy" against a "Hoarding Strategy" (0 redistribution, low wisdom/participation). A negative difference shows the savings from contributing.</p>
                    <IncentiveMatrix data={incentiveMatrixData} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoBox title="Why This Matters">
                        Unlike traditional taxation based on coercion, DemCoin uses incentives. The wealthy find it economically rational to contribute to the community through redistribution and participation, as this significantly lowers their required stake. Hoarding wealth becomes the most expensive strategy.
                    </InfoBox>
                    <InfoBox title="Progressive & Voluntary">
                        The system achieves highly progressive outcomes without force. The base stake rate increases with wealth, ensuring those with the most contribute the most. However, discounts for pro-social behavior mean this contribution is voluntary and reputation-based, aligning individual and community interests.
                    </InfoBox>
                    <InfoBox title="Individual Agency">
                        DemCoin preserves individual agency, a core tenet for many who are skeptical of centralized authority. Each person chooses how to contribute—through direct redistribution, active governance, or developing wisdom. The system rewards all forms of positive contribution, not just financial ones.
                    </InfoBox>
                </div>

            </main>

            <footer className="text-center mt-12 pt-8 border-t border-demcoin-border text-demcoin-text-secondary text-sm">
                <p className="text-lg font-semibold">DemCoin Protocol: Taxation Simulator</p>
                <p>Version 1.0 | October 2025</p>
                <p className="mt-2 text-demcoin-accent">"Transforming taxation from coercion to contribution"</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="hover:text-demcoin-accent transition-colors"><BookOpen className="inline-block mr-1" /> Full Paper</a>
                    <a href="#" className="hover:text-demcoin-accent transition-colors"><Github className="inline-block mr-1" /> GitHub</a>
                    <a href="#" className="hover:text-demcoin-accent transition-colors"><Mail className="inline-block mr-1" /> Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default App;
