"use client";

import { useState } from "react";
import SignClient from "@walletconnect/sign-client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState<"snap" | "walletconnect" | "">("");
  const [snapId] = useState("npm:@qubic-lib/qubic-mm-snap");
  const [error, setError] = useState("");
  const [signClient, setSignClient] = useState<SignClient | null>(null);

  // ✅ MetaMask Snap connect — using wallet_requestSnaps
  const connectSnap = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("MetaMask is not installed.");
      return;
    }

    try {
      const result = await (window as any).ethereum.request({
        method: "wallet_requestSnaps",
        params: {
          [snapId]: {},
        },
      });

      console.log("✅ Snap enabled:", result);
      setConnectionType("snap");
      setIsConnected(true);
      setError("");
    } catch (err: any) {
      console.error("❌ Snap error:", err);
      setError(err.message || "Unknown error");
      setIsConnected(false);
    }
  };

  // ✅ WalletConnect Mobile QR using SignClient v2
  const connectWalletConnect = async () => {
    try {
      const client = await SignClient.init({
        projectId: "9eb33018ac85ff782ebfc1c9c2e06dff",
        relayUrl: "wss://relay.walletconnect.org",
        metadata: {
          name: "Qubic DEX",
          description: "Qubic WalletConnect Integration",
          url: "http://localhost:3000",
          icons: ["https://your-dapp.example/logo.png"],
        },
      });

      client.on("session_proposal", (proposal) => {
        console.log("🔗 Session proposal:", proposal);
      });

      client.on("session_delete", () => {
        console.log("❌ WalletConnect session disconnected.");
        setIsConnected(false);
        setSignClient(null);
        setConnectionType("");
      });

      // ✅ Correct: get { uri, approval } from connect()
      const { uri, approval } = await client.connect({
        requiredNamespaces: {
          qubic: {
            chains: ["qubic:mainnet"],
            methods: [
              "qubic_requestAccounts",
              "qubic_sendQubic",
              "qubic_signTransaction",
              "qubic_sendTransaction",
              "qubic_sign",
              "qubic_sendAsset",
            ],
            events: ["accountsChanged", "amountChanged", "assetAmountChanged"],
          },
        },
      });

      if (uri) {
        QRCodeModal.open(uri, () => {
          console.log("QR Modal closed");
        });
      }

      const session = await approval();
      console.log("✅ Approved session:", session);

      setConnectionType("walletconnect");
      setIsConnected(true);
      setSignClient(client);
      setError("");
    } catch (err: any) {
      console.error("❌ WalletConnect error:", err);
      setError(err.message || "Unknown error");
    }
  };

  const disconnectWalletConnect = async () => {
    if (signClient) {
      // SignClient v2 doesn't have disconnect(), you delete the session by calling sessionDelete()
      // For this example assume you handle session storage externally.
      console.log("⚠️ Please handle session cleanup logic as needed.");
      setSignClient(null);
      setIsConnected(false);
      setConnectionType("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-4">🔗 Connect Your Qubic Wallet</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={connectSnap}
          className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          🦊 Connect MetaMask Snap
        </button>

        <button
          onClick={
            isConnected && connectionType === "walletconnect"
              ? disconnectWalletConnect
              : connectWalletConnect
          }
          className="w-full px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          {isConnected && connectionType === "walletconnect"
            ? "🔌 Disconnect WalletConnect"
            : "📱 Connect Mobile Wallet (QR)"}
        </button>
      </div>

      {isConnected && (
        <p className="mt-6 text-green-600 font-medium">
          ✅ Connected via {connectionType}! You can now use Qubic RPCs.
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-medium">⚠️ Error: {error}</p>
      )}
    </div>
  );
}
