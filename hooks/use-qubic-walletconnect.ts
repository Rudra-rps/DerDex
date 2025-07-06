"use client"

import Client from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"
import { useState } from "react"

export function useQubicWalletConnect() {
  const [connector, setConnector] = useState<Client | null>(null)
  const [connected, setConnected] = useState(false)
  const [session, setSession] = useState<any>(null)

  const connect = async () => {
    const newConnector = new Client({
      projectId: "YOUR_WC_PROJECT_ID", // get this from WalletConnect Cloud
    })

    newConnector.on("connect", (error, payload) => {
      if (error) throw error
      setConnected(true)
      setSession(payload)
    })

    newConnector.on("disconnect", () => {
      setConnected(false)
      setSession(null)
    })

    await newConnector.connect({
      requiredNamespaces: {
        qubic: {
          chains: ["qubic:mainnet"],
          methods: [
            "qubic_requestAccounts",
            "qubic_sendQubic",
            "qubic_signTransaction",
            "qubic_sendTransaction",
            "qubic_sign",
            "qubic_sendAsset"
          ],
          events: ["accountsChanged", "amountChanged", "assetAmountChanged"]
        }
      }
    })

    if (!newConnector.connected) {
      QRCodeModal.open(newConnector.uri, () => {
        console.log("QR modal closed")
      })
    }

    setConnector(newConnector)
  }

  const disconnect = async () => {
    if (connector) {
      await connector.killSession()
      setConnector(null)
      setConnected(false)
    }
  }

  return { connect, disconnect, connected, session }
}
