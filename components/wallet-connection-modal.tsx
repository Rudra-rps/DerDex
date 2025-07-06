"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useQubicConnector } from "@/hooks/use-qubic-connector"
import { Wallet, Shield, Key, Upload, Loader2, AlertCircle } from "lucide-react"

interface WalletConnectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletConnectionModal({ open, onOpenChange }: WalletConnectionModalProps) {
  const { connectWallet, isConnecting, error } = useQubicConnector()
  const [seedPhrase, setSeedPhrase] = useState("")
  const [vaultPassword, setVaultPassword] = useState("")
  const [vaultFile, setVaultFile] = useState<File | null>(null)

  const handleMetaMaskConnect = async () => {
    await connectWallet("metamask-snap")
    if (!error) onOpenChange(false)
  }

  const handleWalletConnect = async () => {
    await connectWallet("walletconnect")
    if (!error) onOpenChange(false)
  }

  const handleSeedPhraseConnect = async () => {
    if (!seedPhrase.trim()) return
    await connectWallet("seed-phrase", { seedPhrase })
    if (!error) onOpenChange(false)
  }

  const handleVaultFileConnect = async () => {
    if (!vaultFile || !vaultPassword) return
    await connectWallet("vault-file", { vaultFile, password: vaultPassword })
    if (!error) onOpenChange(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setVaultFile(file)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-border max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Qubic Wallet
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-accent/30">
            <TabsTrigger value="quick">Quick Connect</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="quick" className="space-y-6 mt-6">
            {/* MetaMask Snap */}
            <div className="p-6 bg-accent/30 rounded-xl border border-border hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">MetaMask Snap</h3>
                    <p className="text-muted-foreground text-sm">Connect using MetaMask with Qubic Snap</p>
                  </div>
                </div>
                <Button
                  onClick={handleMetaMaskConnect}
                  disabled={isConnecting}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
                </Button>
              </div>
            </div>

            {/* WalletConnect */}
            <div className="p-6 bg-accent/30 rounded-xl border border-border hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">WalletConnect</h3>
                    <p className="text-muted-foreground text-sm">Connect using WalletConnect protocol</p>
                  </div>
                </div>
                <Button onClick={handleWalletConnect} disabled={isConnecting} className="bg-blue-500 hover:bg-blue-600">
                  {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6 mt-6">
            <Tabs defaultValue="seed" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-accent/30">
                <TabsTrigger value="seed">Seed Phrase</TabsTrigger>
                <TabsTrigger value="vault">Vault File</TabsTrigger>
              </TabsList>

              <TabsContent value="seed" className="space-y-4 mt-6">
                <div className="space-y-3">
                  <Label className="text-muted-foreground text-sm font-medium">Enter your 24-word seed phrase</Label>
                  <Textarea
                    placeholder="Enter your seed phrase here..."
                    value={seedPhrase}
                    onChange={(e) => setSeedPhrase(e.target.value)}
                    className="bg-accent/30 border-border text-foreground min-h-[100px] resize-none"
                  />
                  <p className="text-muted-foreground text-xs">
                    Your seed phrase is encrypted and never stored on our servers
                  </p>
                </div>
                <Button
                  onClick={handleSeedPhraseConnect}
                  disabled={isConnecting || !seedPhrase.trim()}
                  className="w-full bg-green-500 hover:bg-green-600 h-12 shadow-lg shadow-green-500/20"
                >
                  {isConnecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Key className="w-4 h-4 mr-2" />}
                  Import from Seed
                </Button>
              </TabsContent>

              <TabsContent value="vault" className="space-y-4 mt-6">
                <div className="space-y-3">
                  <Label className="text-muted-foreground text-sm font-medium">Upload vault file</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept=".vault,.json"
                      onChange={handleFileChange}
                      className="hidden"
                      id="vault-file"
                    />
                    <label htmlFor="vault-file" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">
                        {vaultFile ? vaultFile.name : "Click to upload or drag and drop your vault file"}
                      </p>
                    </label>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-muted-foreground text-sm font-medium">Vault password</Label>
                  <Input
                    type="password"
                    placeholder="Enter vault password"
                    value={vaultPassword}
                    onChange={(e) => setVaultPassword(e.target.value)}
                    className="bg-accent/30 border-border text-foreground h-12"
                  />
                </div>
                <Button
                  onClick={handleVaultFileConnect}
                  disabled={isConnecting || !vaultFile || !vaultPassword}
                  className="w-full bg-purple-500 hover:bg-purple-600 h-12 shadow-lg shadow-purple-500/20"
                >
                  {isConnecting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Shield className="w-4 h-4 mr-2" />
                  )}
                  Import from Vault
                </Button>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
