"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Copy, ExternalLink, Loader2 } from "lucide-react"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"
import { NetworkSelector } from "@/components/network-selector"
import { TransactionStatus } from "@/components/transaction-status"
import { useWalletConnect } from "@/hooks/use-wallet-connect"

export function WalletConnect() {
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const { connectWallet, account, isConnecting, walletType } = useWalletConnect()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-1">Wallet</h1>
            <p className="text-muted-foreground text-lg">Connect and manage your Qubic Network wallet</p>
          </div>
        </div>
        {!account && (
          <Button
            onClick={() => setShowConnectionModal(true)}
            disabled={isConnecting}
            className="bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20"
          >
            {isConnecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wallet className="w-4 h-4 mr-2" />}
            Connect Wallet
          </Button>
        )}
      </div>

      {account ? (
        <div className="space-y-8">
          {/* Wallet Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-foreground text-xl">Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">$12,450.67</div>
                <p className="text-green-500 text-sm">+$234.56 (+1.92%)</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-foreground text-xl">Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">$8,234.12</div>
                <p className="text-muted-foreground text-sm">Free to trade</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-foreground text-xl">In Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">$4,216.55</div>
                <p className="text-yellow-500 text-sm">Margin used</p>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Details */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-foreground text-xl">Wallet Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-accent/30 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Q</span>
                  </div>
                  <div>
                    <p className="text-foreground font-mono text-sm">{account}</p>
                    <p className="text-muted-foreground text-xs">Connected via {walletType || "Wallet"}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border text-muted-foreground hover:text-foreground bg-transparent"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border text-muted-foreground hover:text-foreground bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <NetworkSelector />
            <TransactionStatus />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NetworkSelector />
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-foreground text-xl flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-500" />
                Connect Your Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                  <Wallet className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold text-lg mb-2">Get Started</h3>
                  <p className="text-muted-foreground text-sm">
                    Connect your Qubic wallet to start trading derivatives on the decentralized exchange
                  </p>
                </div>
              </div>
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full bg-blue-500 hover:bg-blue-600 h-12 shadow-lg shadow-blue-500/20"
              >
                {isConnecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wallet className="w-4 h-4 mr-2" />}
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <WalletConnectionModal open={showConnectionModal} onOpenChange={setShowConnectionModal} />
    </div>
  )
}
