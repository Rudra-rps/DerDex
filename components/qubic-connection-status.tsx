"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useQubicConnector } from "@/hooks/use-qubic-connector"
import { Wifi, WifiOff, Loader2 } from "lucide-react"

export function QubicConnectionStatus() {
  const { wallet, network, isConnecting, disconnectWallet } = useQubicConnector()

  if (isConnecting) {
    return (
      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
        Connecting...
      </Badge>
    )
  }

  if (wallet?.isConnected) {
    return (
      <div className="flex items-center gap-2">
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <Wifi className="w-3 h-3 mr-1" />
          Connected
        </Badge>
        <Badge variant="outline" className="text-xs">
          {network}
        </Badge>
        <Button
          size="sm"
          variant="ghost"
          onClick={disconnectWallet}
          className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
      <WifiOff className="w-3 h-3 mr-1" />
      Disconnected
    </Badge>
  )
}
