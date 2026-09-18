import React, { useState, useMemo } from 'react';

/**
 * Interactive Insurance Savings Calculator Island.
 * 
 * Provides prospective policyholders with a live simulation of bundled savings.
 * Adjusting current monthly premiums and toggling coverage categories updates
 * the estimated annual savings dynamically. Designed with clean editorial pills.
 */
export default function SavingsCalculator() {
  const [monthlySpend, setMonthlySpend] = useState<number>(340);
  const [selectedCoverages, setSelectedCoverages] = useState<{
    auto: boolean;
    home: boolean;
    life: boolean;
    health: boolean;
  }>({
    auto: true,
    home: true,
    life: false,
    health: false,
  });

  const toggleCoverage = (key: keyof typeof selectedCoverages) => {
    setSelectedCoverages((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const hasActive = Object.values(next).some(Boolean);
      return hasActive ? next : prev;
    });
  };

  const activeCount = useMemo(() => {
    return Object.values(selectedCoverages).filter(Boolean).length;
  }, [selectedCoverages]);

  const discountRate = useMemo(() => {
    switch (activeCount) {
      case 1: return 0.12;
      case 2: return 0.22;
      case 3: return 0.30;
      case 4: return 0.35;
      default: return 0.15;
    }
  }, [activeCount]);

  const annualSavings = useMemo(() => {
    return Math.round(monthlySpend * 12 * discountRate);
  }, [monthlySpend, discountRate]);

  const newEstimatedMonthly = useMemo(() => {
    return Math.round(monthlySpend * (1 - discountRate));
  }, [monthlySpend, discountRate]);

  const handleClaimSavings = () => {
    const quoteElement = document.getElementById('quote-form');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="calculator" className="reveal-on-scroll w-full bg-[#11141D] rounded-[32px] sm:rounded-[44px] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/5 my-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculate Your Bundled Savings
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal">
            Adjust your current monthly premium and select policies to estimate multi-line discounts with Texas carriers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 space-y-7 bg-[#161B26] p-6 sm:p-8 rounded-2xl border border-white/10">
            
            {/* Slider: Monthly Spend */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="premiumSlider" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Current Total Monthly Payment:
                </label>
                <span className="text-2xl font-bold font-mono text-white">
                  ${monthlySpend} <span className="text-xs text-slate-400 font-normal">/ mo</span>
                </span>
              </div>
              <input
                id="premiumSlider"
                type="range"
                min="120"
                max="800"
                step="10"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
                <span>$120/mo</span>
                <span>$450/mo</span>
                <span>$800/mo</span>
              </div>
            </div>

            {/* Coverage Toggle Chips (Clean modern capsules, NO white dots) */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                Select Policies to Combine:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(
                  [
                    { id: 'auto', label: 'Auto' },
                    { id: 'home', label: 'Home' },
                    { id: 'life', label: 'Life' },
                    { id: 'health', label: 'Health' },
                  ] as const
                ).map((item) => {
                  const isActive = selectedCoverages[item.id];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleCoverage(item.id)}
                      className={`px-4 py-3 rounded-full text-xs font-bold transition-all text-center border ${
                        isActive
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Dynamic Output Card (Right) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl min-h-[300px]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
                Estimated Annual Savings
              </div>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight my-2">
                ${annualSavings.toLocaleString()}
                <span className="text-sm font-semibold text-emerald-600 ml-1">/ year</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                Estimated multi-line discount for Texas households bundling {activeCount} primary coverages.
              </p>
            </div>

            <div className="my-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Projected Monthly Rate:</span>
              <span className="text-base font-bold text-blue-600">${newEstimatedMonthly}/mo</span>
            </div>

            <button
              type="button"
              onClick={handleClaimSavings}
              className="w-full py-4 px-6 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2 group"
            >
              <span>Lock In These Rates</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:translate-x-1 transition-transform"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
