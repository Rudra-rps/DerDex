"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Briefcase, Loader2 } from "lucide-react"
import { useQubicConnector } from "@/hooks/use-qubic-connector"

const positionsMock = [
  {
    id: 1,
    pair: "BTC/USD",
    type: "Long",
    size: "$5,000",
    entryPrice: 42100,
    currentPrice: 43250,
    pnl: 136.45,
    pnlPercent: 2.73,
    liquidationPrice: 38925,
    leverage: "10x",
  },
  {
    id: 2,
    pair: "ETH/USD",
    type: "Short",
    size: "$3,000",
    entryPrice: 2650,
    currentPrice: 2580,
    pnl: 79.25,
    pnlPercent: 2.64,
    liquidationPrice: 2915,
    leverage: "5x",
  },
  {
    id: 3,
    pair: "SOL/USD",
    type: "Long",
    size: "$2,000",
    entryPrice: 95.3,
    currentPrice: 98.42,
    pnl: 65.45,
    pnlPercent: 3.27,
    liquidationPrice: 86.12,
    leverage: "8x",
  },
]

export function Portfolio() {
  const { positions, closePosition, isSigningTransaction, wallet } = useQubicConnector()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Portfolio</h1>
          <p className="text-muted-foreground text-lg">Manage your positions and collateral</p>
        </div>
        <Badge variant="outline" className="border-purple-500 text-purple-400 bg-purple-500/10">
          <Briefcase className="w-3 h-3 mr-1" />
          Active Portfolio
        </Badge>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">$13,685.23</div>
            <p className="text-sm text-green-500">+$281.15 (+2.10%)</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Balance</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">$3,450.67</div>
            <p className="text-sm text-muted-foreground">Free Collateral</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Margin Used</CardTitle>
            <TrendingUp className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">$10,000</div>
            <p className="text-sm text-yellow-500">73% of total balance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Open Positions */}
        <div className="xl:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-foreground text-xl">Open Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Table Header */}
                <div className="grid grid-cols-8 gap-4 text-sm text-muted-foreground pb-3 border-b border-border">
                  <span>Pair</span>
                  <span>Type</span>
                  <span>Size</span>
                  <span>Entry</span>
                  <span>Current</span>
                  <span>PnL</span>
                  <span>Liq. Price</span>
                  <span>Actions</span>
                </div>

                {/* Position Rows */}
                {positions.map((position) => (
                  <div
                    key={position.id}
                    className="grid grid-cols-8 gap-4 text-sm py-4 border-b border-border last:border-b-0 bg-accent/20 rounded-lg px-4 hover:bg-accent/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-semibold">{position.pair}</span>
                      <Badge variant="outline" className="text-xs">
                        {position.leverage}x
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      {position.type === "long" ? (
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Long
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400 text-xs">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          Short
                        </Badge>
                      )}
                    </div>
                    <span className="text-foreground font-medium">${Number(position.size).toLocaleString()}</span>
                    <span className="text-muted-foreground">${Number(position.entryPrice).toLocaleString()}</span>
                    <span className="text-foreground font-medium">
                      ${Number(position.currentPrice).toLocaleString()}
                    </span>
                    <div className={`${Number(position.pnl) > 0 ? "text-green-500" : "text-red-500"}`}>
                      <div className="font-semibold">
                        {Number(position.pnl) > 0 ? "+" : ""}${Number(position.pnl).toFixed(2)}
                      </div>
                    </div>
                    <span className="text-yellow-500 font-medium">
                      ${Number(position.liquidationPrice).toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-border text-muted-foreground hover:text-foreground bg-transparent"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => closePosition(position.id)}
                        disabled={isSigningTransaction}
                        className="text-xs border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-500/10 bg-transparent"
                      >
                        {isSigningTransaction ? <Loader2 className="w-3 h-3 animate-spin" /> : "Close"}
                      </Button>
                    </div>
                  </div>
                ))}
                {positions.length === 0 && wallet?.isConnected && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No open positions</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collateral Management & Risk */}
        <div className="space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-foreground text-xl">Collateral Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="deposit" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-accent/30">
                  <TabsTrigger value="deposit">Deposit</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                </TabsList>

                <TabsContent value="deposit" className="space-y-4 mt-6">
                  <div className="space-y-3">
                    <Label className="text-muted-foreground text-sm font-medium">Amount (USD)</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      className="bg-accent/30 border-border text-foreground h-12"
                    />
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-600 h-12 shadow-lg shadow-green-500/20">
                    <ArrowDownRight className="w-4 h-4 mr-2" />
                    Deposit Collateral
                  </Button>
                </TabsContent>

                <TabsContent value="withdraw" className="space-y-4 mt-6">
                  <div className="space-y-3">
                    <Label className="text-muted-foreground text-sm font-medium">Amount (USD)</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      className="bg-accent/30 border-border text-foreground h-12"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">Available to withdraw: $3,450.67</div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 h-12 shadow-lg shadow-blue-500/20">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Withdraw Collateral
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-foreground text-xl">Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Portfolio Health</span>
                  <span className="text-green-500 font-bold text-lg">85%</span>
                </div>
                <Progress value={85} className="h-3" />
                <p className="text-xs text-muted-foreground">Excellent - Low liquidation risk</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Margin Ratio</span>
                  <span className="text-yellow-500 font-bold text-lg">73%</span>
                </div>
                <Progress value={73} className="h-3" />
                <p className="text-xs text-muted-foreground">Moderate - Monitor closely</p>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Maintenance Margin</span>
                  <span className="text-foreground font-semibold">$1,250.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
