// /lib/contracts.ts

/**
 * ✅ Qubic Smart Contract Constants
 * Store all your important contract addresses & function indexes here
 */

export const CONTRACTS = {
  DEX: {
    ADDRESS: "YOUR_CONTRACT_ADDRESS", // Replace with your real deployed contract
    FUNCTION_INDEXES: {
      ECHO: 0, // Example read function index
      TRADE: 1, // Example trade execution function index
      CANCEL_ORDER: 2, // Example cancel function index
      // Add more as needed
    },
  },
};

/**
 * ✅ Example TX Builder
 * Use this to prepare a TX payload to send to your connector.
 */

export function buildTradeTx({
  fromAddress,
  amount,
  pairId,
}: {
  fromAddress: string;
  amount: number;
  pairId: string;
}) {
  return {
    contractAddress: CONTRACTS.DEX.ADDRESS,
    functionIndex: CONTRACTS.DEX.FUNCTION_INDEXES.TRADE,
    params: [
      fromAddress, // Example param
      amount.toString(),
      pairId,
    ],
  };
}
