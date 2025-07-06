// /hooks/use-wallet-connect.ts

"use client";

import { useState, useEffect } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export function useWalletConnect() {
  const [connector, setConnector] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = () => {
    // Create a connector
    const wc = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // WalletConnect bridge
    });

    if (!wc.connected) {
      wc.createSession().then(() => {
        // Show QR code modal
        QRCodeModal.open(wc.uri, () => {
          console.log("QR Code Modal closed");
        });
      });
    }

    wc.on("connect", (error, payload) => {
      if (error) throw error;

      QRCodeModal.close();
      // Get accounts
      const { accounts } = payload.params[0];
      setAccount(accounts[0]);
    });

    wc.on("disconnect", () => {
      setAccount(null);
    });

    setConnector(wc);
  };

  return { connector, account, connectWallet };
}
