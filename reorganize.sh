#!/bin/bash

# Reorganize DemCoin Taxation Simulator for Vercel
# Run this from the demcoin-taxation-simulator directory

echo "🔧 Reorganizing files for Vite/Vercel..."

# Create directories
mkdir -p src/components
mkdir -p src/hooks
mkdir -p src/lib

# Move main files
echo "📁 Moving main files to src/..."
mv App.tsx src/ 2>/dev/null || echo "App.tsx already moved"
mv index.tsx src/ 2>/dev/null || echo "index.tsx already moved"
mv constants.ts src/ 2>/dev/null || echo "constants.ts already moved"
mv types.ts src/ 2>/dev/null || echo "types.ts already moved"

# Move components
echo "📁 Moving components to src/components/..."
mv CommunityStakeChart.tsx src/components/ 2>/dev/null || echo "CommunityStakeChart.tsx already moved"
mv DistributionComparisonChart.tsx src/components/ 2>/dev/null || echo "DistributionComparisonChart.tsx already moved"
mv FundingPieChart.tsx src/components/ 2>/dev/null || echo "FundingPieChart.tsx already moved"
mv IncentiveMatrix.tsx src/components/ 2>/dev/null || echo "IncentiveMatrix.tsx already moved"
mv InfoBox.tsx src/components/ 2>/dev/null || echo "InfoBox.tsx already moved"
mv PersonaBreakdownChart.tsx src/components/ 2>/dev/null || echo "PersonaBreakdownChart.tsx already moved"
mv SelectorControl.tsx src/components/ 2>/dev/null || echo "SelectorControl.tsx already moved"
mv SliderControl.tsx src/components/ 2>/dev/null || echo "SliderControl.tsx already moved"
mv SviVsGdpChart.tsx src/components/ 2>/dev/null || echo "SviVsGdpChart.tsx already moved"

# Move hooks
echo "📁 Moving hooks to src/hooks/..."
mv useDebounce.ts src/hooks/ 2>/dev/null || echo "useDebounce.ts already moved"

# Create utils.ts
echo "📝 Creating src/lib/utils.ts..."
cat > src/lib/utils.ts << 'EOF'
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
EOF

# Update index.html
echo "📝 Updating index.html..."
sed -i.bak 's|src="/index.tsx"|src="/src/index.tsx"|g' index.html && rm index.html.bak

echo "✅ Reorganization complete!"
echo ""
echo "📊 New structure:"
echo "   src/"
echo "   ├── index.tsx"
echo "   ├── App.tsx"
echo "   ├── constants.ts"
echo "   ├── types.ts"
echo "   ├── components/ (9 files)"
echo "   ├── hooks/ (1 file)"
echo "   └── lib/ (1 file)"
echo ""
echo "🚀 Next steps:"
echo "   1. git add ."
echo "   2. git commit -m 'Reorganize into proper Vite structure'"
echo "   3. git push"
echo "   4. Vercel will auto-redeploy"
