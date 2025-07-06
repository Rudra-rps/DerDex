export interface QubicWallet {
  address: string
  publicKey: string
  type: "metamask-snap" | "walletconnect" | "seed-phrase" | "vault-file"
  isConnected: boolean
}

export interface QubicTransaction {
  id: string
  from: string
  to: string
  data: string
  value?: string
  gasLimit?: string
  status: "pending" | "confirmed" | "failed"
  hash?: string
  blockNumber?: number
  timestamp: number
}

export interface QubicPosition {
  id: string
  pair: string
  type: "long" | "short"
  size: string
  entryPrice: string
  currentPrice: string
  pnl: string
  liquidationPrice: string
  leverage: number
  timestamp: number
}

export interface QubicContractCall {
  contractAddress: string
  functionName: string
  parameters: any[]
  value?: string
}

export interface QubicRPCResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  transactionHash?: string
}
