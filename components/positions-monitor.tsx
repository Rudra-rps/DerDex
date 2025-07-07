"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, Eye, X, Loader2 } from "lucide-react"
import { useQubicConnector } from "@/hooks/use-qubic-connector"

export function PositionsMonitor() {
  const [closingPosition, setClosingPosition] = useState<string | null>(null)
  const { positions, closePosition } = useQubicConnector()

  const handleClosePosition = async (positionId: string) => {
    setClosingPosition(positionId)
    await closePosition(positionId)
    setClosingPosition(null)
  }

  const getLiquidationRisk = (currentPrice: number, liquidationPrice: number, positionType: string) => {
    const threshold =
      positionType === "long"
        ? (currentPrice - liquidationPrice) / currentPrice
        : (liquidationPrice - currentPrice) / currentPrice

    if (threshold < 0.05) return "high"
    if (threshold < 0.15) return "medium"
    return "low"
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge className="bg-red-500/20 text-red-400 animate-pulse">High Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Medium Risk</Badge>
      default:
        return <Badge className="bg-green-500/20 text-green-400">Low Risk</Badge>
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
            <Eye className="w-4 h-4 text-white" />
          </div>
          Positions Monitor
          {positions.length > 0 && (
            <Badge variant="outline" className="ml-auto">
              {positions.length} Open
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {positions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No Open Positions</p>
            <p className="text-sm">Your active positions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-8 gap-3 text-xs text-muted-foreground pb-3 border-b border-border font-medium">
              <span>Pair</span>
              <span>Type</span>
              <span>Entry Price</span>
              <span>Leverage</span>
              <span>Size</span>
              <span>Liq. Price</span>
              <span>PnL</span>
              <span>Actions</span>
            </div>

            {/* Position Rows */}
            {positions.map((position) => {
              const risk = getLiquidationRisk(
                Number(position.currentPrice),
                Number(position.liquidationPrice),
                position.type,
              )
              const pnlValue = Number(position.pnl)

              return (
                <div
                  key={position.id}
                  className={`grid grid-cols-8 gap-3 text-sm py-4 px-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                    risk === "high"
                      ? "bg-red-500/5 border-red-500/30 shadow-red-500/10"
                      : "bg-accent/20 border-border hover:bg-accent/30"
                  }`}
                >
                  {/* Pair */}
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-semibold">{position.pair}</span>
                    {risk === "high" && <AlertTriangle className="w-3 h-3 text-red-500" />}
                  </div>

                  {/* Position Type */}
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

                  {/* Entry Price */}
                  <span className="text-muted-foreground font-mono">
                    ${Number(position.entryPrice).toLocaleString()}
                  </span>

                  {/* Leverage */}
                  <Badge variant="outline" className="text-xs w-fit">
                    {position.leverage}x
                  </Badge>

                  {/* Size */}
                  <span className="text-foreground font-medium">${Number(position.size).toLocaleString()}</span>

                  {/* Liquidation Price */}
                  <span
                    className={`font-mono text-sm ${risk === "high" ? "text-red-400 font-bold" : "text-yellow-500"}`}
                  >
                    ${Number(position.liquidationPrice).toLocaleString()}
                  </span>

                  {/* PnL */}
                  <div className="flex flex-col">
                    <span className={`font-semibold ${pnlValue >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {pnlValue >= 0 ? "+" : ""}${pnlValue.toFixed(2)}
                    </span>
                    {getRiskBadge(risk)}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleClosePosition(position.id)}
                      disabled={closingPosition === position.id}
                      className="h-8 px-3 text-xs border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-500/10 bg-transparent"
                    >
                      {closingPosition === position.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>
              )
            })}

            {/* Summary Stats */}
            <div className="mt-6 p-4 bg-accent/20 rounded-xl border border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">{positions.length}</div>
                  <div className="text-muted-foreground text-sm">Total Positions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">
                    +${positions.reduce((sum, pos) => sum + Math.max(0, Number(pos.pnl)), 0).toFixed(2)}
                  </div>
                  <div className="text-muted-foreground text-sm">Total Profit</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">
                    ${Math.abs(positions.reduce((sum, pos) => sum + Math.min(0, Number(pos.pnl)), 0)).toFixed(2)}
                  </div>
                  <div className="text-muted-foreground text-sm">Total Loss</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
