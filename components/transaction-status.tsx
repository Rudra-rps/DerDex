"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useQubicConnector } from "@/hooks/use-qubic-connector"
import { Clock, CheckCircle, XCircle, ExternalLink, Loader2 } from "lucide-react"

export function TransactionStatus() {
  const { transactions, network } = useQubicConnector()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>
      case "confirmed":
        return <Badge className="bg-green-500/20 text-green-400">Confirmed</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (transactions.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-xl flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No transactions yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="text-foreground text-xl flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-accent/20 rounded-lg border border-border hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(tx.status)}
                <div>
                  <p className="text-foreground font-medium text-sm">
                    {JSON.parse(tx.data).function || "Contract Call"}
                  </p>
                  <p className="text-muted-foreground text-xs">{new Date(tx.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(tx.status)}
                {tx.hash && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      const explorerUrl = `${network === "mainnet" ? "https://explorer.qubic.org" : "https://testnet-explorer.qubic.org"}/tx/${tx.hash}`
                      window.open(explorerUrl, "_blank")
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
