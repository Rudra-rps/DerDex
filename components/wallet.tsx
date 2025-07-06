import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WalletIcon, Copy, ExternalLink, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function Wallet() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <WalletIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">Wallet</h1>
            <p className="text-gray-400 text-lg">Manage your Qubic Network assets</p>
          </div>
        </div>
        <Badge className="bg-green-600 text-white px-4 py-2">Connected</Badge>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white text-xl">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">$12,450.67</div>
            <p className="text-green-400 text-sm">+$234.56 (+1.92%)</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white text-xl">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">$8,234.12</div>
            <p className="text-gray-400 text-sm">Free to trade</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white text-xl">In Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">$4,216.55</div>
            <p className="text-yellow-400 text-sm">Margin used</p>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Address */}
      <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl">Wallet Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <div>
                <p className="text-white font-mono text-sm">QUBIC1234567890ABCDEF1234567890ABCDEF12345678</p>
                <p className="text-gray-400 text-xs">Qubic Network Address</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-gray-700/50 text-gray-400 hover:text-white bg-transparent"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-700/50 text-gray-400 hover:text-white bg-transparent"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-xl">Deposit Funds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400 text-sm">Add funds to your Qubic DEX wallet</p>
            <Button className="w-full bg-green-600 hover:bg-green-700 h-12 shadow-lg">
              <ArrowDownRight className="w-4 h-4 mr-2" />
              Deposit
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-xl">Withdraw Funds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400 text-sm">Transfer funds to external wallet</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 shadow-lg">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 text-sm text-gray-400 pb-3 border-b border-gray-800/50">
              <span>Type</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Time</span>
              <span>Hash</span>
            </div>
            <div className="grid grid-cols-5 gap-4 text-sm py-3 bg-gray-800/30 rounded-lg px-4">
              <div className="flex items-center gap-2">
                <ArrowDownRight className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Deposit</span>
              </div>
              <span className="text-white font-medium">$5,000.00</span>
              <Badge className="bg-green-600 text-white text-xs w-fit">Confirmed</Badge>
              <span className="text-gray-400">2 hours ago</span>
              <span className="text-blue-400 font-mono text-xs">0x1234...5678</span>
            </div>
            <div className="grid grid-cols-5 gap-4 text-sm py-3 bg-gray-800/30 rounded-lg px-4">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400">Withdraw</span>
              </div>
              <span className="text-white font-medium">$1,500.00</span>
              <Badge className="bg-green-600 text-white text-xs w-fit">Confirmed</Badge>
              <span className="text-gray-400">1 day ago</span>
              <span className="text-blue-400 font-mono text-xs">0xABCD...EFGH</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
