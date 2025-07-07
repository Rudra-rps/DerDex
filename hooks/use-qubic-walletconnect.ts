"use client"

import SignClient from "@walletconnect/sign-client"
import QRCodeModal from "@walletconnect/qrcode-modal"
import { useState } from "react"

export function useQubicWalletConnect() {
  const [client, setClient] = useState<SignClient | null>(null)
  const [connected, setConnected] = useState(false)
  const [session, setSession] = useState<any>(null)

  const connect = async () => {
    const signClient = await SignClient.init({
      projectId: "9eb33018ac85ff782ebfc1c9c2e06dff", // ✅ Your real project ID
      relayUrl: "wss://relay.walletconnect.org",
      metadata: {
        name: "Qubic DEX",
        description: "Trade on Qubic using WalletConnect",
        url: "https://your-dapp.example",
        icons: ["https://your-dapp.example/logo.png"],
      },
    })

    signClient.on("session_proposal", (proposal) => {
      console.log("🔗 Session proposal:", proposal)
    })

    signClient.on("session_created", (session) => {
      console.log("✅ Session created:", session)
      setConnected(true)
      setSession(session)
    })

    signClient.on("session_delete", () => {
      console.log("❌ Session disconnected")
      setConnected(false)
      setSession(null)
    })

    const session = await signClient.connect({
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
    })

    if (!signClient.session) {
      QRCodeModal.open(signClient.uri, () => {
        console.log("QR modal closed")
      })
    }

    setClient(signClient)
  }

  const disconnect = async () => {
    if (client) {
      await client.disconnect()
      setClient(null)
      setConnected(false)
      setSession(null)
    }
  }

  return { connect, disconnect, connected, session }
}
