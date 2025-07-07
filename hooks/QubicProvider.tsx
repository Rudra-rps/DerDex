"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { QubicConnector } from "@qubic-lib/qubic-ts-library/dist/qubicConnector";

type QubicContextType = {
  connector: QubicConnector | null;
  querySmartContract: (body: any) => Promise<any>;
  sendTransaction: (body: any) => Promise<any>;
};

const QubicContext = createContext<QubicContextType | null>(null);

export const QubicProvider = ({ children }: { children: React.ReactNode }) => {
  const [connector] = useState(new QubicConnector("wss://webbridge.qubic.li/"));

  const querySmartContract = useCallback(async (body: any) => {
    const res = await fetch("https://testnet-rpc.qubic.org/v1/querySmartContract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`RPC error: ${res.status}`);
    return res.json();
  }, []);

  const sendTransaction = useCallback(async (body: any) => {
    const res = await fetch("https://testnet-rpc.qubic.org/v1/broadcast-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`RPC error: ${res.status}`);
    return res.json();
  }, []);

  return (
    <QubicContext.Provider value={{ connector, querySmartContract, sendTransaction }}>
      {children}
    </QubicContext.Provider>
  );
};

export const useQubic = () => {
  const context = useContext(QubicContext);
  if (!context) throw new Error("useQubic must be inside QubicProvider");
  return context;
};
