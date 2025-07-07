import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Activity } from "lucide-react"
import { DexDashboard } from "@/components/dex-dashboard"

const marketData = [
  { symbol: "BTC/USD", price: 43250.5, change: 2.45, changePercent: 5.67, volume: "2.4B" },
  { symbol: "ETH/USD", price: 2580.75, change: -15.3, changePercent: -0.59, volume: "1.8B" },
  { symbol: "SOL/USD", price: 98.42, change: 4.12, changePercent: 4.37, volume: "456M" },
  { symbol: "AVAX/USD", price: 35.67, change: 1.23, changePercent: 3.57, volume: "234M" },
]

const recentActivity = [
  { type: "Long", pair: "BTC/USD", price: 42100, pnl: 5.2, time: "2m ago" },
  { type: "Short", pair: "ETH/USD", price: 2650, pnl: -2.1, time: "15m ago" },
  { type: "Long", pair: "SOL/USD", price: 95.3, pnl: 8.4, time: "1h ago" },
]

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">Welcome back to Qubic DEX</p>
        </div>
        <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
          <Activity className="w-3 h-3 mr-1" />
          Live Market Data
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Wallet Balance</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">$12,450.67</div>
            <p className="text-sm text-muted-foreground">Available Collateral</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Positions</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">3</div>
            <p className="text-sm text-green-500">2 Long, 1 Short</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unrealized PnL</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500 mb-1">+$1,234.56</div>
            <p className="text-sm text-muted-foreground">+9.91% Total</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Liquidation Risk</CardTitle>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500 mb-1">Low</div>
            <p className="text-sm text-muted-foreground">Health: 85%</p>
          </CardContent>
        </Card>
      </div>

       {/* DEX Dashboard Components */}
      <DexDashboard />

      {/* Market Overview */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-xl flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Live Market Tickers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketData.map((market) => (
              <div
                key={market.symbol}
                className="p-6 bg-accent/30 rounded-xl border border-border hover:bg-accent/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-foreground font-semibold text-lg">{market.symbol}</span>
                  {market.change > 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">${market.price.toLocaleString()}</div>
                <div className={`text-sm font-medium mb-1 ${market.change > 0 ? "text-green-500" : "text-red-500"}`}>
                  {market.change > 0 ? "+" : ""}
                  {market.change} ({market.changePercent > 0 ? "+" : ""}
                  {market.changePercent}%)
                </div>
                <div className="text-xs text-muted-foreground">Vol: {market.volume}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity and Risk Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-accent/30 rounded-xl border border-border hover:bg-accent/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      activity.type === "Long" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }
                  >
                    {activity.type}
                  </Badge>
                  <div>
                    <p className="text-foreground font-semibold">{activity.pair}</p>
                    <p className="text-muted-foreground text-sm">Entry: ${activity.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${activity.pnl > 0 ? "text-green-500" : "text-red-500"}`}>
                    {activity.pnl > 0 ? "+" : ""}
                    {activity.pnl}%
                  </div>
                  <div className="text-muted-foreground text-sm">{activity.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-xl">Risk Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Portfolio Health</span>
                <span className="text-green-500 font-bold text-lg">85%</span>
              </div>
              <Progress value={85} className="h-3" />
              <p className="text-xs text-muted-foreground">Excellent - Low liquidation risk</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Margin Usage</span>
                <span className="text-yellow-500 font-bold text-lg">45%</span>
              </div>
              <Progress value={45} className="h-3" />
              <p className="text-xs text-muted-foreground">Moderate - Room for more positions</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Diversification</span>
                <span className="text-blue-500 font-bold text-lg">72%</span>
              </div>
              <Progress value={72} className="h-3" />
              <p className="text-xs text-muted-foreground">Good - Well distributed across assets</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
