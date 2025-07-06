"use client"

import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from "react"
import type {
  QubicWallet,
  QubicTransaction,
  QubicPosition,
  QubicContractCall,
  QubicRPCResponse,
} from "@/lib/types/qubic"
import { QUBIC_CONFIG, type QubicNetwork } from "@/lib/qubic-config"

interface QubicState {
  wallet: QubicWallet | null
  network: QubicNetwork
  rpcUrl: string
  isConnecting: boolean
  isSigningTransaction: boolean
  transactions: QubicTransaction[]
  positions: QubicPosition[]
  error: string | null
}

type QubicAction =
  | { type: "SET_WALLET"; payload: QubicWallet | null }
  | { type: "SET_NETWORK"; payload: QubicNetwork }
  | { type: "SET_RPC_URL"; payload: string }
  | { type: "SET_CONNECTING"; payload: boolean }
  | { type: "SET_SIGNING"; payload: boolean }
  | { type: "ADD_TRANSACTION"; payload: QubicTransaction }
  | { type: "UPDATE_TRANSACTION"; payload: { id: string; updates: Partial<QubicTransaction> } }
  | { type: "SET_POSITIONS"; payload: QubicPosition[] }
  | { type: "SET_ERROR"; payload: string | null }

const initialState: QubicState = {
  wallet: null,
  network: "testnet",
  rpcUrl: QUBIC_CONFIG.networks.testnet.rpcUrl,
  isConnecting: false,
  isSigningTransaction: false,
  transactions: [],
  positions: [],
  error: null,
}

function qubicReducer(state: QubicState, action: QubicAction): QubicState {
  switch (action.type) {
    case "SET_WALLET":
      return { ...state, wallet: action.payload, error: null }
    case "SET_NETWORK":
      return {
        ...state,
        network: action.payload,
        rpcUrl: QUBIC_CONFIG.networks[action.payload].rpcUrl,
      }
    case "SET_RPC_URL":
      return { ...state, rpcUrl: action.payload }
    case "SET_CONNECTING":
      return { ...state, isConnecting: action.payload }
    case "SET_SIGNING":
      return { ...state, isSigningTransaction: action.payload }
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((tx) =>
          tx.id === action.payload.id ? { ...tx, ...action.payload.updates } : tx,
        ),
      }
    case "SET_POSITIONS":
      return { ...state, positions: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    default:
      return state
  }
}

interface QubicContextType extends QubicState {
  connectWallet: (type: QubicWallet["type"], credentials?: any) => Promise<void>
  disconnectWallet: () => void
  switchNetwork: (network: QubicNetwork) => void
  setCustomRpcUrl: (url: string) => void
  querySmartContract: (call: QubicContractCall) => Promise<QubicRPCResponse>
  sendTransaction: (call: QubicContractCall) => Promise<QubicRPCResponse>
  fetchPositions: () => Promise<void>
  openPosition: (pair: string, type: "long" | "short", size: string, leverage: number) => Promise<void>
  closePosition: (positionId: string) => Promise<void>
}

const QubicContext = createContext<QubicContextType | null>(null)

export function QubicProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(qubicReducer, initialState)

  // Simulate wallet connection
  const connectWallet = useCallback(async (type: QubicWallet["type"], credentials?: any) => {
    dispatch({ type: "SET_CONNECTING", payload: true })
    dispatch({ type: "SET_ERROR", payload: null })

    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock wallet connection based on type
      let mockWallet: QubicWallet

      switch (type) {
        case "metamask-snap":
          mockWallet = {
            address: "QUBIC1234567890ABCDEF1234567890ABCDEF12345678",
            publicKey: "PUBKEY1234567890ABCDEF1234567890ABCDEF12345678",
            type: "metamask-snap",
            isConnected: true,
          }
          break
        case "walletconnect":
          mockWallet = {
            address: "QUBICWC1234567890ABCDEF1234567890ABCDEF123456",
            publicKey: "PUBKEYWC1234567890ABCDEF1234567890ABCDEF123456",
            type: "walletconnect",
            isConnected: true,
          }
          break
        case "seed-phrase":
          if (!credentials?.seedPhrase) {
            throw new Error("Seed phrase is required")
          }
          mockWallet = {
            address: "QUBICSEED1234567890ABCDEF1234567890ABCDEF1234",
            publicKey: "PUBKEYSEED1234567890ABCDEF1234567890ABCDEF1234",
            type: "seed-phrase",
            isConnected: true,
          }
          break
        case "vault-file":
          if (!credentials?.vaultFile || !credentials?.password) {
            throw new Error("Vault file and password are required")
          }
          mockWallet = {
            address: "QUBICVAULT1234567890ABCDEF1234567890ABCDEF123",
            publicKey: "PUBKEYVAULT1234567890ABCDEF1234567890ABCDEF123",
            type: "vault-file",
            isConnected: true,
          }
          break
        default:
          throw new Error("Unsupported wallet type")
      }

      dispatch({ type: "SET_WALLET", payload: mockWallet })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : "Connection failed" })
    } finally {
      dispatch({ type: "SET_CONNECTING", payload: false })
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    dispatch({ type: "SET_WALLET", payload: null })
    dispatch({ type: "SET_POSITIONS", payload: [] })
    dispatch({ type: "SET_ERROR", payload: null })
  }, [])

  const switchNetwork = useCallback((network: QubicNetwork) => {
    dispatch({ type: "SET_NETWORK", payload: network })
  }, [])

  const setCustomRpcUrl = useCallback((url: string) => {
    dispatch({ type: "SET_RPC_URL", payload: url })
  }, [])

  // Simulate smart contract query
  const querySmartContract = useCallback(async (call: QubicContractCall): Promise<QubicRPCResponse> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock response based on function name
      if (call.functionName === "getOpenPositions") {
        const mockPositions: QubicPosition[] = [
          {
            id: "1",
            pair: "BTC/USD",
            type: "long",
            size: "5000",
            entryPrice: "42100",
            currentPrice: "43250",
            pnl: "136.45",
            liquidationPrice: "38925",
            leverage: 10,
            timestamp: Date.now() - 3600000,
          },
          {
            id: "2",
            pair: "ETH/USD",
            type: "short",
            size: "3000",
            entryPrice: "2650",
            currentPrice: "2580",
            pnl: "79.25",
            liquidationPrice: "2915",
            leverage: 5,
            timestamp: Date.now() - 7200000,
          },
        ]

        return {
          success: true,
          data: mockPositions,
        }
      }

      return {
        success: true,
        data: { result: "Mock contract query result" },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Query failed",
      }
    }
  }, [])

  // Simulate transaction sending
  const sendTransaction = useCallback(
    async (call: QubicContractCall): Promise<QubicRPCResponse> => {
      if (!state.wallet) {
        return {
          success: false,
          error: "Wallet not connected",
        }
      }

      dispatch({ type: "SET_SIGNING", payload: true })

      try {
        // Create transaction
        const transaction: QubicTransaction = {
          id: `tx_${Date.now()}`,
          from: state.wallet.address,
          to: call.contractAddress,
          data: JSON.stringify({ function: call.functionName, params: call.parameters }),
          value: call.value,
          status: "pending",
          timestamp: Date.now(),
        }

        dispatch({ type: "ADD_TRANSACTION", payload: transaction })

        // Simulate signing delay
        await new Promise((resolve) => setTimeout(resolve, 3000))

        // Simulate transaction confirmation
        const txHash = `0x${Math.random().toString(16).substr(2, 64)}`

        dispatch({
          type: "UPDATE_TRANSACTION",
          payload: {
            id: transaction.id,
            updates: {
              status: "confirmed",
              hash: txHash,
              blockNumber: Math.floor(Math.random() * 1000000) + 1000000,
            },
          },
        })

        return {
          success: true,
          transactionHash: txHash,
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Transaction failed",
        }
      } finally {
        dispatch({ type: "SET_SIGNING", payload: false })
      }
    },
    [state.wallet],
  )

  // Fetch positions from contract
  const fetchPositions = useCallback(async () => {
    if (!state.wallet) return

    const response = await querySmartContract({
      contractAddress: QUBIC_CONFIG.contracts.derivatives.address,
      functionName: "getOpenPositions",
      parameters: [state.wallet.address],
    })

    if (response.success && response.data) {
      dispatch({ type: "SET_POSITIONS", payload: response.data })
    }
  }, [state.wallet, querySmartContract])

  // Open a new position
  const openPosition = useCallback(
    async (pair: string, type: "long" | "short", size: string, leverage: number) => {
      const response = await sendTransaction({
        contractAddress: QUBIC_CONFIG.contracts.derivatives.address,
        functionName: "openPosition",
        parameters: [pair, type, size, leverage],
      })

      if (response.success) {
        // Refresh positions after successful transaction
        setTimeout(() => fetchPositions(), 2000)
      }
    },
    [sendTransaction, fetchPositions],
  )

  // Close a position
  const closePosition = useCallback(
    async (positionId: string) => {
      const response = await sendTransaction({
        contractAddress: QUBIC_CONFIG.contracts.derivatives.address,
        functionName: "closePosition",
        parameters: [positionId],
      })

      if (response.success) {
        // Refresh positions after successful transaction
        setTimeout(() => fetchPositions(), 2000)
      }
    },
    [sendTransaction, fetchPositions],
  )

  // Auto-fetch positions when wallet connects
  useEffect(() => {
    if (state.wallet?.isConnected) {
      fetchPositions()
    }
  }, [state.wallet?.isConnected, fetchPositions])

  const contextValue: QubicContextType = {
    ...state,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    setCustomRpcUrl,
    querySmartContract,
    sendTransaction,
    fetchPositions,
    openPosition,
    closePosition,
  }

  return <QubicContext.Provider value={contextValue}>{children}</QubicContext.Provider>
}

export function useQubicConnector() {
  const context = useContext(QubicContext)
  if (!context) {
    throw new Error("useQubicConnector must be used within a QubicProvider")
  }
  return context
}
