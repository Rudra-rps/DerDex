export const QUBIC_CONFIG = {
  networks: {
    mainnet: {
      name: "Qubic Mainnet",
      rpcUrl: "https://mainnet-rpc.qubic.org",
      chainId: "qubic-mainnet",
      explorerUrl: "https://explorer.qubic.org",
    },
    testnet: {
      name: "Qubic Testnet",
      rpcUrl: "https://testnet-rpc.qubic.org",
      chainId: "qubic-testnet",
      explorerUrl: "https://testnet-explorer.qubic.org",
    },
    custom: {
      name: "Custom RPC",
      rpcUrl: "",
      chainId: "qubic-custom",
      explorerUrl: "",
    },
  },
  contracts: {
    derivatives: {
      address: "QUBIC_DERIVATIVES_CONTRACT_ADDRESS_PLACEHOLDER",
      name: "Qubic Derivatives Exchange",
    },
    collateral: {
      address: "QUBIC_COLLATERAL_CONTRACT_ADDRESS_PLACEHOLDER",
      name: "Collateral Manager",
    },
  },
} as const

export type QubicNetwork = keyof typeof QUBIC_CONFIG.networks
export type QubicContract = keyof typeof QUBIC_CONFIG.contracts
