# 🧩 Qubic DEX — Proof of Concept

Welcome to **Qubic DEX**, a modern decentralized exchange (DEX) built on the **Qubic Network**.  
This PoC demonstrates how to:

- Connect to the **Qubic RPC network**
- Query smart contract state
- Sign & broadcast transactions
- Integrate with **WalletConnect**
- Use **MetaMask Snap** (optional)
- Organize a clean **Next.js** + **React** + **Tailwind** frontend

---

## 🚀 **Tech Stack**

- **Framework**: Next.js (App Router)
- **Smart Contracts**: C++ on Qubic
- **Wallets**: WalletConnect, MetaMask Snap
- **RPC Communication**: `@qubic-lib/qubic-ts-library`

---

## 📁 **Project Structure**

/app
├─ layout.tsx # App shell with Theme & QubicProvider

├─ page.tsx # Root page, switches between sections

├─ /components

│ ├─ dashboard.tsx # Reads contract state

│ ├─ trade-page.tsx # Signs & sends trade TX

│ ├─ wallet-connect.tsx # WalletConnect UI

/hooks

├─ use-qubic-connector.ts # RPC connector context

├─ use-wallet-connect.ts # WalletConnect hook

/lib

├─ contracts.ts # Contract addresses, function indexes, TX builders

/contracts

├─ DEX.cpp # Your C++ smart contract

├─ deploy.sh # Example deploy script

## ⚙️ **Setup**

1️⃣ Clone the repo  
```bash
git clone https://github.com/your-org/qubic-dex.git
cd qubic-dex

npm install
npm run dev
