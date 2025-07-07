"use client"

import { DepositWithdrawPanel } from "@/components/deposit-withdraw-panel"
import { PriceOracleAdmin } from "@/components/price-oracle-admin"
import { PositionsMonitor } from "@/components/positions-monitor"

export function DexDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">DEX Dashboard</h1>
          <p className="text-muted-foreground text-lg">Manage your trading operations and monitor positions</p>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Deposit/Withdraw Panel */}
        <div className="lg:col-span-1">
          <DepositWithdrawPanel />
        </div>

        {/* Price Oracle Admin Panel */}
        <div className="lg:col-span-1">
          <PriceOracleAdmin />
        </div>

        {/* Positions Monitor - Full width on large screens */}
        <div className="lg:col-span-2 xl:col-span-1">
          <PositionsMonitor />
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card/50 backdrop-blur-sm border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">24h</span>
            </div>
            <div>
              <h3 className="text-foreground font-semibold">24h Volume</h3>
              <p className="text-muted-foreground text-sm">Total trading volume</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">$2.4M</div>
          <p className="text-green-500 text-sm">+12.5% from yesterday</p>
        </div>

        <div className="p-6 bg-card/50 backdrop-blur-sm border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">TVL</span>
            </div>
            <div>
              <h3 className="text-foreground font-semibold">Total Value Locked</h3>
              <p className="text-muted-foreground text-sm">Assets in protocol</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">$18.7M</div>
          <p className="text-blue-500 text-sm">+5.2% this week</p>
        </div>

        <div className="p-6 bg-card/50 backdrop-blur-sm border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">APY</span>
            </div>
            <div>
              <h3 className="text-foreground font-semibold">Average APY</h3>
              <p className="text-muted-foreground text-sm">Yield for liquidity providers</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">15.8%</div>
          <p className="text-purple-500 text-sm">Competitive rates</p>
        </div>
      </div>
    </div>
  )
}
