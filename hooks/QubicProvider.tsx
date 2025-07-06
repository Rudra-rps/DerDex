"use client";

import React, { createContext, useContext, useState } from "react";
// ✨ Correct import path below:
import { QubicConnector } from "@qubic-lib/qubic-ts-library/dist/qubicConnector";


type QubicContextType = {
  connector: QubicConnector | null;
};

const QubicContext = createContext<QubicContextType | null>(null);

export const QubicProvider = ({ children }: { children: React.ReactNode }) => {
  const [connector] = useState(
    new QubicConnector("https://testnet-rpc.qubic.org")
  );

  return (
    <QubicContext.Provider value={{ connector }}>
      {children}
    </QubicContext.Provider>
  );
};

export const useQubic = () => {
  const context = useContext(QubicContext);
  if (!context) throw new Error("useQubic must be inside QubicProvider");
  return context;
};
