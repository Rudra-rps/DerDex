"use client"

import { useState } from "react"

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [snapId, setSnapId] = useState("local:http://localhost:8081") // Use prod Snap ID if needed
  const [error, setError] = useState("")

  const connectSnap = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask and try again.")
      return
    }

    try {
      const result = await window.ethereum.request({
        method: "wallet_enable",
        params: [{
          wallet_snap: {
            [snapId]: {} // dynamic snap ID
          }
        }]
      })

      console.log("Snap enabled:", result)
      setIsConnected(true)
      setError("")
    } catch (err: any) {
      console.error("Failed to enable Snap:", err)
      setError(err.message || "Unknown error")
      setIsConnected(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-4">Connect Your Qubic Wallet</h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        This will connect to the Qubic MetaMask Snap running at:
        <br />
        <code className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
          {snapId}
        </code>
      </p>

      <button
        onClick={connectSnap}
        className={`px-6 py-3 rounded-lg transition-colors ${
          isConnected
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white`}
      >
        {isConnected ? "✅ Wallet Connected" : "🔗 Connect Wallet"}
      </button>

      {error && (
        <p className="mt-4 text-red-600 font-medium">
          ⚠️ Error: {error}
        </p>
      )}

      {isConnected && (
        <p className="mt-4 text-green-600 font-medium">
          🎉 Snap connected! You can now call Qubic RPCs.
        </p>
      )}
    </div>
  )
}
