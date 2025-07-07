"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, TrendingUp, AlertCircle, Loader2, Shield } from "lucide-react"

export function PriceOracleAdmin() {
  const [selectedAsset, setSelectedAsset] = useState("BTC/USD")
  const [newPrice, setNewPrice] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // Mock current prices - replace with real data
  const currentPrices = {
    "BTC/USD": 43250.5,
    "ETH/USD": 2580.75,
    "SOL/USD": 98.42,
    "AVAX/USD": 35.67,
  }

  const handlePriceUpdate = async () => {
    if (!newPrice || Number.parseFloat(newPrice) <= 0) return

    setIsUpdating(true)
    // Simulate API call to update oracle price
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsUpdating(false)
    setNewPrice("")
  }

  const currentPrice = currentPrices[selectedAsset as keyof typeof currentPrices]
  const priceChange = newPrice ? ((Number.parseFloat(newPrice) - currentPrice) / currentPrice) * 100 : 0

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <Settings className="w-4 h-4 text-white" />
          </div>
          Price Oracle Admin
        </CardTitle>
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 w-fit">
          <Shield className="w-3 h-3 mr-1" />
          Admin Only
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Asset Selection */}
        <div className="space-y-3">
          <Label className="text-muted-foreground text-sm font-medium">Select Asset</Label>
          <Select value={selectedAsset} onValueChange={setSelectedAsset}>
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

        {/* Current Price Display */}
        <div className="p-4 bg-accent/30 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Current Price</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-foreground">${currentPrice.toLocaleString()}</div>
          <p className="text-muted-foreground text-xs mt-1">Last updated: 2 minutes ago</p>
        </div>

        {/* New Price Input */}
        <div className="space-y-3">
          <Label className="text-muted-foreground text-sm font-medium">New Price (USD)</Label>
          <Input
            type="number"
            placeholder="Enter new price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="bg-accent/30 border-border text-foreground h-12"
            step="0.01"
          />
          {newPrice && Number.parseFloat(newPrice) > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Price change:</span>
              <Badge
                className={`${priceChange >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
              >
                {priceChange >= 0 ? "+" : ""}
                {priceChange.toFixed(2)}%
              </Badge>
            </div>
          )}
        </div>

        {/* Update Button */}
        <Button
          onClick={handlePriceUpdate}
          disabled={!newPrice || Number.parseFloat(newPrice) <= 0 || isUpdating}
          className="w-full bg-purple-500 hover:bg-purple-600 h-12 shadow-lg shadow-purple-500/20"
        >
          {isUpdating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <TrendingUp className="w-4 h-4 mr-2" />}
          {isUpdating ? "Updating Price..." : "Push Price Update"}
        </Button>

        {/* Warning */}
        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-yellow-500 text-sm font-medium">Admin Warning</p>
              <p className="text-yellow-400 text-xs mt-1">
                Price updates affect all open positions and may trigger liquidations. Use with caution.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
