"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Brain, AlertTriangle, Target, Lightbulb, Clock, Zap, BarChart3 } from "lucide-react"

const riskAlerts = [
  {
    id: 1,
    type: "warning",
    title: "High Correlation Risk",
    message: "Your BTC and ETH positions are highly correlated. Consider diversifying across different asset classes.",
    timestamp: "2 hours ago",
    severity: "medium",
    confidence: 87,
  },
  {
    id: 2,
    type: "info",
    title: "Optimal Rebalancing",
    message: "Consider reducing leverage on SOL/USD position to improve risk-adjusted returns.",
    timestamp: "4 hours ago",
    severity: "low",
    confidence: 72,
  },
]

const tradeIdeas = [
  {
    id: 1,
    pair: "SOL/USD",
    direction: "Long",
    entry: 95.5,
    target: 105.0,
    stopLoss: 88.0,
    confidence: 78,
    reasoning: "Strong support at $95 level with bullish divergence on RSI. Volume profile shows accumulation.",
    timeframe: "2-5 days",
  },
  {
    id: 2,
    pair: "AVAX/USD",
    direction: "Short",
    entry: 36.2,
    target: 32.5,
    stopLoss: 39.0,
    confidence: 68,
    reasoning: "Resistance at $36 with bearish volume pattern. Overbought on multiple timeframes.",
    timeframe: "1-3 days",
  },
]

const marketInsights = [
  {
    id: 1,
    title: "BTC Momentum Shift",
    description: "Technical indicators suggest potential bullish momentum for BTC/USD in the next 24-48 hours.",
    confidence: 82,
    impact: "High",
    category: "Technical Analysis",
  },
  {
    id: 2,
    title: "ETH Volatility Spike Expected",
    description: "Expected volatility increase due to upcoming network upgrade announcement.",
    confidence: 91,
    impact: "Medium",
    category: "Fundamental Analysis",
  },
]

export function AIInsights() {
  const [selectedInsight, setSelectedInsight] = useState<any>(null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-1">AI Insights</h1>
            <p className="text-muted-foreground text-lg">AI-powered trading intelligence and risk management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-purple-500/20 text-purple-400 px-4 py-2">
            <Zap className="w-3 h-3 mr-1" />
            AI Active
          </Badge>
          <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
            87% Accuracy
          </Badge>
        </div>
      </div>

      {/* AI Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">87%</div>
            <div className="text-muted-foreground text-sm">Prediction Accuracy</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">+15.3%</div>
            <div className="text-muted-foreground text-sm">AI-Suggested Returns</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">142</div>
            <div className="text-muted-foreground text-sm">Signals Generated</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">23</div>
            <div className="text-muted-foreground text-sm">Risk Alerts Sent</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Alerts */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2 text-xl">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 bg-accent/30 rounded-xl border-l-4 border-yellow-500 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => setSelectedInsight(alert)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-foreground font-semibold text-sm">{alert.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        alert.severity === "high"
                          ? "border-red-500 text-red-400"
                          : alert.severity === "medium"
                            ? "border-yellow-500 text-yellow-400"
                            : "border-blue-500 text-blue-400"
                      }`}
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.confidence}%</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.timestamp}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-border text-muted-foreground hover:text-foreground bg-transparent"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}

            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold h-12 shadow-lg shadow-yellow-500/20">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Market Insights */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2 text-xl">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => setSelectedInsight(insight)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-foreground font-semibold text-sm">{insight.title}</h4>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-xs font-bold">{insight.confidence}%</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                    {insight.category}
                  </Badge>
                  <Badge
                    className={`text-xs ${insight.impact === "High" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}
                  >
                    {insight.impact} Impact
                  </Badge>
                </div>
              </div>
            ))}

            <Button className="w-full bg-blue-500 hover:bg-blue-600 h-12 shadow-lg shadow-blue-500/20">
              Generate New Insights
            </Button>
          </CardContent>
        </Card>

        {/* Trade Ideas */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2 text-xl">
              <Lightbulb className="w-6 h-6 text-purple-500" />
              AI Trade Ideas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tradeIdeas.map((idea) => (
              <div
                key={idea.id}
                className="p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => setSelectedInsight(idea)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-bold">{idea.pair}</span>
                    <Badge
                      className={`text-xs ${idea.direction === "Long" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                    >
                      {idea.direction}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-purple-500" />
                    <span className="text-purple-500 text-xs font-bold">{idea.confidence}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-muted-foreground block">Entry</span>
                    <span className="text-foreground font-semibold">${idea.entry}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Target</span>
                    <span className="text-green-500 font-semibold">${idea.target}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Stop</span>
                    <span className="text-red-500 font-semibold">${idea.stopLoss}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {idea.timeframe}
                  </Badge>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-purple-500 hover:bg-purple-600 text-xs h-10 shadow-lg shadow-purple-500/20"
                >
                  Execute Trade
                </Button>
              </div>
            ))}

            <Button className="w-full bg-purple-500 hover:bg-purple-600 h-12 shadow-lg shadow-purple-500/20">
              Get More Ideas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Insight Modal */}
      <Dialog open={!!selectedInsight} onOpenChange={() => setSelectedInsight(null)}>
        <DialogContent className="bg-background border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">{selectedInsight?.title || selectedInsight?.pair}</DialogTitle>
          </DialogHeader>
          {selectedInsight && (
            <div className="space-y-4">
              {selectedInsight.reasoning && (
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Analysis</h4>
                  <p className="text-muted-foreground text-sm">{selectedInsight.reasoning}</p>
                </div>
              )}
              {selectedInsight.message && (
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Details</h4>
                  <p className="text-muted-foreground text-sm">{selectedInsight.message}</p>
                </div>
              )}
              {selectedInsight.confidence && (
                <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                  <span className="text-muted-foreground">Confidence Level</span>
                  <span className="text-foreground font-bold">{selectedInsight.confidence}%</span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
