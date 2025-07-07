"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type {
  QubicWallet,
  QubicTransaction,
  QubicPosition,
  QubicContractCall,
  QubicRPCResponse,
} from "@/lib/types/qubic";
import { QUBIC_CONFIG, type QubicNetwork } from "@/lib/qubic-config";

interface QubicState {
  wallet: QubicWallet | null;
  session: any | null;               // ✅ NEW
  signClient: any | null;            // ✅ NEW
  network: QubicNetwork;
  rpcUrl: string;
  isConnecting: boolean;
  isSigningTransaction: boolean;
  transactions: QubicTransaction[];
  positions: QubicPosition[];
  error: string | null;
}

type QubicAction =
  | { type: "SET_WALLET"; payload: QubicWallet | null }
  | { type: "SET_SESSION"; payload: any | null }
  | { type: "SET_SIGN_CLIENT"; payload: any | null }
  | { type: "SET_NETWORK"; payload: QubicNetwork }
  | { type: "SET_RPC_URL"; payload: string }
  | { type: "SET_CONNECTING"; payload: boolean }
  | { type: "SET_SIGNING"; payload: boolean }
  | { type: "ADD_TRANSACTION"; payload: QubicTransaction }
  | {
      type: "UPDATE_TRANSACTION";
      payload: { id: string; updates: Partial<QubicTransaction> };
    }
  | { type: "SET_POSITIONS"; payload: QubicPosition[] }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: QubicState = {
  wallet: null,
  session: null,         // ✅
  signClient: null,      // ✅
  network: "testnet",
  rpcUrl: QUBIC_CONFIG.networks.testnet.rpcUrl,
  isConnecting: false,
  isSigningTransaction: false,
  transactions: [],
  positions: [],
  error: null,
};

function qubicReducer(state: QubicState, action: QubicAction): QubicState {
  switch (action.type) {
    case "SET_WALLET":
      return { ...state, wallet: action.payload, error: null };
    case "SET_SESSION":
      return { ...state, session: action.payload }; // ✅
    case "SET_SIGN_CLIENT":
      return { ...state, signClient: action.payload }; // ✅
    case "SET_NETWORK":
      return {
        ...state,
        network: action.payload,
        rpcUrl: QUBIC_CONFIG.networks[action.payload].rpcUrl,
      };
    case "SET_RPC_URL":
      return { ...state, rpcUrl: action.payload };
    case "SET_CONNECTING":
      return { ...state, isConnecting: action.payload };
    case "SET_SIGNING":
      return { ...state, isSigningTransaction: action.payload };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((tx) =>
          tx.id === action.payload.id ? { ...tx, ...action.payload.updates } : tx
        ),
      };
    case "SET_POSITIONS":
      return { ...state, positions: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

interface QubicContextType extends QubicState {
  connectWallet: (type: QubicWallet["type"], credentials?: any) => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (network: QubicNetwork) => void;
  setCustomRpcUrl: (url: string) => void;
  querySmartContract: (call: QubicContractCall) => Promise<QubicRPCResponse>;
  sendTransaction: (call: QubicContractCall) => Promise<QubicRPCResponse>;
  fetchPositions: () => Promise<void>;
  openPosition: (
    pair: string,
    type: "long" | "short",
    size: string,
    leverage: number
  ) => Promise<void>;
  closePosition: (positionId: string) => Promise<void>;
}

const QubicContext = createContext<QubicContextType | null>(null);

export function QubicProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(qubicReducer, initialState);

  const connectWallet = useCallback(
    async (type: QubicWallet["type"], credentials?: any) => {
      dispatch({ type: "SET_CONNECTING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        let mockWallet: QubicWallet;

        switch (type) {
          case "metamask-snap":
            mockWallet = {
              address: "QUBIC1234567890ABCDEF",
              publicKey: "PUBKEY_SNAP",
              type: "metamask-snap",
              isConnected: true,
            };
            break;
          case "walletconnect":
            mockWallet = {
              address: "QUBICWC1234567890ABCDEF",
              publicKey: "PUBKEY_WC",
              type: "walletconnect",
              isConnected: true,
            };

            // Example: mock signClient + session:
            const mockSession = { topic: "mock_topic_123" };
            dispatch({ type: "SET_SESSION", payload: mockSession });
            dispatch({ type: "SET_SIGN_CLIENT", payload: { request: () => {} } });

            break;
          default:
            throw new Error("Unsupported wallet type");
        }

        dispatch({ type: "SET_WALLET", payload: mockWallet });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "Connection failed",
        });
      } finally {
        dispatch({ type: "SET_CONNECTING", payload: false });
      }
    },
    []
  );

  const disconnectWallet = useCallback(() => {
    dispatch({ type: "SET_WALLET", payload: null });
    dispatch({ type: "SET_SESSION", payload: null });
    dispatch({ type: "SET_SIGN_CLIENT", payload: null });
    dispatch({ type: "SET_POSITIONS", payload: [] });
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  const switchNetwork = useCallback((network: QubicNetwork) => {
    dispatch({ type: "SET_NETWORK", payload: network });
  }, []);

  const setCustomRpcUrl = useCallback((url: string) => {
    dispatch({ type: "SET_RPC_URL", payload: url });
  }, []);

  const querySmartContract = useCallback(async () => {
    return { success: true, data: {} };
  }, []);

  const sendTransaction = useCallback(async () => {
    return { success: true, transactionHash: "0x1234" };
  }, []);

  const fetchPositions = useCallback(async () => {}, []);

  const openPosition = useCallback(async () => {}, []);
  const closePosition = useCallback(async () => {}, []);

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
  };

  return (
    <QubicContext.Provider value={contextValue}>
      {children}
    </QubicContext.Provider>
  );
}

export function useQubicConnector() {
  const context = useContext(QubicContext);
  if (!context) {
    throw new Error("useQubicConnector must be used within a QubicProvider");
  }
  return context;
}
