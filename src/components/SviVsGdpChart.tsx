
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Label } from 'recharts';

interface SviVsGdpChartProps {
    sviImpact: number;
}

const gdpScenarioData = [
  { year: 0, gdp: 0, svi: 0 },
  { year: 10, gdp: 50, svi: -20 },
];

const sviScenarioData = [
  { year: 0, gdp: 0, svi: 0 },
  { year: 10, gdp: 30, svi: 40 },
];

export const SviVsGdpChart: React.FC<SviVsGdpChartProps> = ({ sviImpact }) => {
    const decision = sviImpact >= 0 ? 'Approved by DemCoin' : 'Rejected by DemCoin';
    const decisionColor = sviImpact >= 0 ? '#4fd1c5' : '#f87171';

    return (
        <div className="relative w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                    <XAxis dataKey="year" type="number" domain={[0, 10]} stroke="#a0aec0" label={{ value: 'Years', position: 'insideBottom', offset: -10, fill: '#a0aec0' }} />
                    <YAxis yAxisId="left" stroke="#8884d8" label={{ value: 'GDP Impact (€M)', angle: -90, position: 'insideLeft', fill: '#8884d8' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#4fd1c5" label={{ value: 'SVI Impact (Points)', angle: 90, position: 'insideRight', fill: '#4fd1c5' }} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568', color: '#e2e8f0' }}
                        labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                    <Line yAxisId="left" type="monotone" data={gdpScenarioData} dataKey="gdp" name="GDP-Optimized" stroke="#f87171" strokeWidth={2} dot={{r: 5}}/>
                    <Line yAxisId="right" type="monotone" data={gdpScenarioData} dataKey="svi" name="SVI (GDP-Optimized)" stroke="#f87171" strokeDasharray="5 5" />
                    <Line yAxisId="left" type="monotone" data={sviScenarioData} dataKey="gdp" name="SVI-Optimized" stroke="#8884d8" strokeWidth={2} dot={{r: 5}}/>
                    <Line yAxisId="right" type="monotone" data={sviScenarioData} dataKey="svi" name="SVI (SVI-Optimized)" stroke="#4fd1c5" strokeWidth={2} dot={{r: 5}}/>
                     <ReferenceLine y={0} yAxisId="right" stroke="#a0aec0" strokeDasharray="2 2">
                         <Label value="Decision Threshold" position="top" fill="#a0aec0" />
                     </ReferenceLine>
                </LineChart>
            </ResponsiveContainer>
            <div className="absolute top-0 right-0 p-2 bg-demcoin-panel bg-opacity-80 rounded-bl-lg">
                <h3 className="text-lg font-bold" style={{color: decisionColor}}>{decision}</h3>
            </div>
        </div>
    );
};
