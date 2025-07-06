"use client";

import { useState } from "react";
import SignClient from "@walletconnect/sign-client"; // ✅ Correct import for v2
import QRCodeModal from "@walletconnect/qrcode-modal";

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState(""); // "snap" or "walletconnect"
  const [snapId] = useState("npm:@qubic-lib/qubic-mm-snap"); // ✅ Your Snap ID for MetaMask
  const [error, setError] = useState("");
  const [connector, setConnector] = useState<any>(null);

  // ✅ MetaMask Snap connect — using wallet_requestSnaps
  const connectSnap = async () => {
    if (!(window as any).ethereum) {
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
      const newConnector = await SignClient.init({
        projectId: "9eb33018ac85ff782ebfc1c9c2e06dff", // ✅ YOUR PROJECT ID
        relayUrl: "wss://relay.walletconnect.org",
        metadata: {
          name: "Qubic DEX",
          description: "Qubic WalletConnect Integration",
          url: "http://localhost:3000",
          icons: ["https://your-dapp.example/logo.png"],
        },
      });

      newConnector.on("session_proposal", (proposal) => {
        console.log("🔗 Session proposal:", proposal);
      });

      newConnector.on("session_created", (session) => {
        console.log("✅ WalletConnect session created:", session);
      });

      newConnector.on("session_delete", () => {
        console.log("❌ Session disconnected.");
        setIsConnected(false);
        setConnector(null);
      });

      const session = await newConnector.connect({
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

      console.log("🔗 Session:", session);

      if (!newConnector.session) {
        QRCodeModal.open(newConnector.uri, () => {
          console.log("QR Modal closed");
        });
      }

      setConnectionType("walletconnect");
      setIsConnected(true);
      setConnector(newConnector);
      setError("");
    } catch (err: any) {
      console.error("❌ WalletConnect error:", err);
      setError(err.message || "Unknown error");
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
          onClick={connectWalletConnect}
          className="w-full px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          📱 Connect Mobile Wallet (QR)
        </button>
      </div>

      {isConnected && (
        <p className="mt-6 text-green-600 font-medium">
          ✅ Connected via {connectionType}! You can now use Qubic RPCs.
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-medium">
          ⚠️ Error: {error}
        </p>
      )}
    </div>
  );
}
