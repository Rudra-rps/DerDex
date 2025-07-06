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
import { buildTradeTx } from "@/lib/contracts"

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
  const [isSending, setIsSending] = useState(false)
  const [txResult, setTxResult] = useState<any>(null)

  const { wallet, connector } = useQubicConnector()

  const currentPrice = 43250.5
  const liquidationPrice = position === "long" ? 38925.45 : 47575.55
  const positionSize = Number.parseFloat(margin || "0") * leverage[0]

  const handleOpenPosition = async () => {
    if (!wallet?.isConnected || !connector) {
      alert("Please connect your wallet first")
      return
    }

    if (!margin || Number.parseFloat(margin) <= 0) {
      alert("Please enter a valid margin amount")
      return
    }

    try {
      setIsSending(true)

      // ✅ build the TX payload
      const txPayload = buildTradeTx({
        fromAddress: wallet.address, // use your connected wallet address
        amount: Number(margin),
        pairId: selectedPair,
      })

      // ✅ create TX
      const tx = await connector.createTransaction(txPayload)

      // ✅ sign and broadcast TX
      const broadcast = await connector.broadcastTransaction(tx)

      console.log("TX broadcasted:", broadcast)
      setTxResult(broadcast)
    } catch (err) {
      console.error("Failed to open position:", err)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
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
                  className={`flex-1 h-12 ${position === "long"
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
                  className={`flex-1 h-12 ${position === "short"
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
                className={`w-full py-4 text-lg font-bold shadow-lg ${position === "long"
                  ? "bg-green-500 hover:bg-green-600 shadow-green-500/20"
                  : "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                  }`}
                disabled={!margin || Number.parseFloat(margin) <= 0 || !wallet?.isConnected || isSending}
                onClick={handleOpenPosition}
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : position === "long" ? (
                  "Open Long Position"
                ) : (
                  "Open Short Position"
                )}
              </Button>
              {txResult && (
                <div className="p-4 border border-green-500/30 bg-green-500/10 rounded-xl text-green-400 text-sm">
                  TX Broadcasted: {JSON.stringify(txResult)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ... (keep your Chart + Order History as is) */}
        <div className="xl:col-span-2 space-y-8">
          {/* Chart + Order History remain unchanged */}
        </div>
      </div>
    </div>
  )
}
