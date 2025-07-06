"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQubicConnector } from "@/hooks/use-qubic-connector"
import { QUBIC_CONFIG, type QubicNetwork } from "@/lib/qubic-config"
import { Globe, Server } from "lucide-react"

export function NetworkSelector() {
  const { network, rpcUrl, switchNetwork, setCustomRpcUrl } = useQubicConnector()

  const handleNetworkChange = (value: QubicNetwork) => {
    switchNetwork(value)
  }

  const handleCustomRpcChange = (value: string) => {
    setCustomRpcUrl(value)
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="text-foreground text-xl flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          Network Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-muted-foreground text-sm font-medium">Select Network</Label>
          <Select value={network} onValueChange={handleNetworkChange}>
            <SelectTrigger className="bg-accent/30 border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="mainnet">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Qubic Mainnet
                </div>
              </SelectItem>
              <SelectItem value="testnet">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Qubic Testnet
                </div>
              </SelectItem>
              <SelectItem value="custom">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Custom RPC
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-muted-foreground text-sm font-medium flex items-center gap-2">
            <Server className="w-4 h-4" />
            RPC URL
          </Label>
          <Input
            value={rpcUrl}
            onChange={(e) => handleCustomRpcChange(e.target.value)}
            placeholder="https://your-custom-rpc.qubic.org"
            className="bg-accent/30 border-border text-foreground"
            disabled={network !== "custom"}
          />
          <p className="text-muted-foreground text-xs">
            {network === "custom"
              ? "Enter your custom RPC endpoint URL"
              : `Using ${QUBIC_CONFIG.networks[network].name} default RPC`}
          </p>
        </div>

        <div className="p-4 bg-accent/20 rounded-lg border border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Network:</span>
            <span className="text-foreground font-medium">{QUBIC_CONFIG.networks[network].name}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Chain ID:</span>
            <span className="text-foreground font-mono text-xs">{QUBIC_CONFIG.networks[network].chainId}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
