"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownRight, ArrowUpRight, Wallet, DollarSign, Loader2 } from "lucide-react"
import { useQubicConnector } from "@/hooks/use-qubic-connector"

export function DepositWithdrawPanel() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { wallet } = useQubicConnector()

  // Mock balances - replace with real data
  const walletBalance = 15420.67
  const vaultBalance = 8234.12

  const handleDeposit = async () => {
    if (!depositAmount || !wallet?.isConnected) return

    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setDepositAmount("")
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || !wallet?.isConnected) return

    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setWithdrawAmount("")
  }

  const setMaxDeposit = () => {
    setDepositAmount(walletBalance.toString())
  }

  const setMaxWithdraw = () => {
    setWithdrawAmount(vaultBalance.toString())
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
            <Wallet className="w-4 h-4 text-white" />
          </div>
          Deposit / Withdraw
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Balance Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-accent/30 rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4 text-blue-500" />
              <span className="text-muted-foreground text-sm">Wallet Balance</span>
            </div>
            <div className="text-2xl font-bold text-foreground">${walletBalance.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-accent/30 rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-muted-foreground text-sm">Vault Balance</span>
            </div>
            <div className="text-2xl font-bold text-foreground">${vaultBalance.toLocaleString()}</div>
          </div>
        </div>

        {/* Deposit/Withdraw Tabs */}
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-accent/30">
            <TabsTrigger
              value="deposit"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              <ArrowDownRight className="w-4 h-4 mr-2" />
              Deposit
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Withdraw
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-4 mt-6">
            <div className="space-y-3">
              <Label className="text-muted-foreground text-sm font-medium">Amount (USD)</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="bg-accent/30 border-border text-foreground h-12 pr-16"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={setMaxDeposit}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  MAX
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">Available: ${walletBalance.toLocaleString()}</p>
            </div>
            <Button
              onClick={handleDeposit}
              disabled={!depositAmount || Number.parseFloat(depositAmount) <= 0 || !wallet?.isConnected || isProcessing}
              className="w-full bg-green-500 hover:bg-green-600 h-12 shadow-lg shadow-green-500/20"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-2" />
              )}
              {isProcessing ? "Processing..." : "Deposit Collateral"}
            </Button>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4 mt-6">
            <div className="space-y-3">
              <Label className="text-muted-foreground text-sm font-medium">Amount (USD)</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="bg-accent/30 border-border text-foreground h-12 pr-16"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={setMaxWithdraw}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  MAX
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">Available: ${vaultBalance.toLocaleString()}</p>
            </div>
            <Button
              onClick={handleWithdraw}
              disabled={
                !withdrawAmount || Number.parseFloat(withdrawAmount) <= 0 || !wallet?.isConnected || isProcessing
              }
              className="w-full bg-blue-500 hover:bg-blue-600 h-12 shadow-lg shadow-blue-500/20"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <ArrowUpRight className="w-4 h-4 mr-2" />
              )}
              {isProcessing ? "Processing..." : "Withdraw Collateral"}
            </Button>
          </TabsContent>
        </Tabs>

        {/* Connection Status */}
        {!wallet?.isConnected && (
          <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
            <p className="text-yellow-500 text-sm text-center">Connect your wallet to deposit or withdraw funds</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
