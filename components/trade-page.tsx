"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, AlertCircle, BarChart3, Clock, Loader2 } from "lucide-react"
import { useQubicConnector } from "@/hooks/use-qubic-connector"

const orderHistory = [
  { time: "14:32:15", pair: "BTC/USD", type: "Long", size: "$5,000", price: "$42,100", status: "Filled" },
  { time: "13:45:22", pair: "ETH/USD", type: "Short", size: "$3,000", price: "$2,650", status: "Filled" },
  { time: "12:18:45", pair: "SOL/USD", type: "Long", size: "$2,000", price: "$95.30", status: "Partial" },
]

export function TradePage() {
  const [position, setPosition] = useState<"long" | "short">("long")
  const [leverage, setLeverage] = useState([10])
  const [margin, setMargin] = useState("")
  const [selectedPair, setSelectedPair] = useState("BTC/USD")

  const { wallet, openPosition, isSigningTransaction } = useQubicConnector()

  const currentPrice = 43250.5
  const liquidationPrice = position === "long" ? 38925.45 : 47575.55
  const positionSize = Number.parseFloat(margin || "0") * leverage[0]

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Trade</h1>
            <p className="text-muted-foreground text-lg">Open and manage your positions</p>
          </div>
          <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10">
            <BarChart3 className="w-3 h-3 mr-1" />
            Advanced Trading
          </Badge>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Trading Form */}
          <Card className="bg-card/50 backdrop-blur-sm border-border xl:col-span-1">
            <CardHeader>
              <CardTitle className="text-foreground text-xl">New Position</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pair Selection */}
              <div className="space-y-3">
                <Label className="text-muted-foreground text-sm font-medium">Trading Pair</Label>
                <Select value={selectedPair} onValueChange={setSelectedPair}>
                  <SelectTrigger className="bg-accent/30 border-border text-foreground h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="BTC/USD">BTC/USD</SelectItem>
                    <SelectItem value="ETH/USD">ETH/USD</SelectItem>
                    <SelectItem value="SOL/USD">SOL/USD</SelectItem>
                    <SelectItem value="AVAX/USD">AVAX/USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Long/Short Toggle */}
              <div className="space-y-3">
                <Label className="text-muted-foreground text-sm font-medium">Position Type</Label>
                <div className="flex gap-3">
                  <Button
                    variant={position === "long" ? "default" : "outline"}
                    onClick={() => setPosition("long")}
                    className={`flex-1 h-12 ${
                      position === "long"
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20"
                        : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Long
                  </Button>
                  <Button
                    variant={position === "short" ? "default" : "outline"}
                    onClick={() => setPosition("short")}
                    className={`flex-1 h-12 ${
                      position === "short"
                        ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
                        : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Short
                  </Button>
                </div>
              </div>

              {/* Leverage Slider */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-muted-foreground text-sm font-medium">Leverage</Label>
                  <span className="text-foreground font-bold text-lg">{leverage[0]}x</span>
                </div>
                <Slider value={leverage} onValueChange={setLeverage} max={100} min={1} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1x</span>
                  <span>50x</span>
                  <span>100x</span>
                </div>
              </div>

              {/* Margin Input */}
              <div className="space-y-3">
                <Label className="text-muted-foreground text-sm font-medium">Margin (USD)</Label>
                <Input
                  type="number"
                  placeholder="Enter margin amount"
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                  className="bg-accent/30 border-border text-foreground h-12"
                />
              </div>

              {/* Position Size Display */}
              <div className="p-4 bg-accent/30 rounded-xl border border-border">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Position Size:</span>
                  <span className="text-foreground font-semibold">${positionSize.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Entry Price:</span>
                  <span className="text-foreground font-semibold">${currentPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Liquidation Price Warning */}
              <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-yellow-500 font-medium">Liquidation Price</span>
                </div>
                <div className="text-2xl font-bold text-foreground">${liquidationPrice.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Your position will be liquidated if price reaches this level
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!wallet?.isConnected && (
                  <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                    <p className="text-yellow-500 text-sm text-center">Please connect your wallet to start trading</p>
                  </div>
                )}
                <Button
                  className={`w-full py-4 text-lg font-bold shadow-lg ${
                    position === "long"
                      ? "bg-green-500 hover:bg-green-600 shadow-green-500/20"
                      : "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                  }`}
                  disabled={!margin || Number.parseFloat(margin) <= 0 || !wallet?.isConnected || isSigningTransaction}
                  onClick={() => {
                    if (wallet?.isConnected && margin) {
                      openPosition(selectedPair, position, margin, leverage[0])
                    }
                  }}
                >
                  {isSigningTransaction ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : position === "long" ? (
                    "Open Long Position"
                  ) : (
                    "Open Short Position"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-4 border-border text-muted-foreground hover:text-foreground hover:bg-accent bg-transparent"
                >
                  Close All Positions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Chart and Order History */}
          <div className="xl:col-span-2 space-y-8">
            {/* Price Chart Placeholder */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground text-xl">{selectedPair} Chart</CardTitle>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
                    ${currentPrice.toLocaleString()}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400">+2.45%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-accent/20 rounded-xl flex items-center justify-center border border-border">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <BarChart3 className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-foreground text-lg font-medium mb-2">Advanced Price Chart</p>
                    <p className="text-muted-foreground text-sm">Interactive TradingView chart integration placeholder</p>
                    <p className="text-muted-foreground text-xs mt-2">
                      Real-time candlesticks, indicators, and drawing tools
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="recent" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-accent/30">
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="open">Open Orders</TabsTrigger>
                    <TabsTrigger value="history">All History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="recent" className="space-y-4 mt-6">
                    <div className="grid grid-cols-6 gap-4 text-sm text-muted-foreground pb-3 border-b border-border">
                      <span>Time</span>
                      <span>Pair</span>
                      <span>Type</span>
                      <span>Size</span>
                      <span>Price</span>
                      <span>Status</span>
                    </div>
                    {orderHistory.map((order, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-6 gap-4 text-sm py-3 bg-accent/20 rounded-lg px-4 hover:bg-accent/30 transition-colors"
                      >
                        <span className="text-muted-foreground">{order.time}</span>
                        <span className="text-foreground font-medium">{order.pair}</span>
                        <Badge
                          className={`w-fit ${
                            order.type === "Long"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {order.type}
                        </Badge>
                        <span className="text-foreground">{order.size}</span>
                        <span className="text-foreground">{order.price}</span>
                        <Badge
                          className={`w-fit ${
                            order.status === "Filled"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="open">
                    <div className="text-center py-12 text-muted-foreground">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No open orders</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="history">
                    <div className="text-center py-12 text-muted-foreground">
                      <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Complete order history will be displayed here</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
