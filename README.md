# 🧩 Qubic DEX — Proof of Concept

Welcome to **Qubic DEX**, a modern decentralized exchange (DEX) built on the **Qubic Network**.  
This **Proof of Concept (PoC)** demonstrates how to:

✅ Connect to the **Qubic RPC network**  
✅ Query smart contract state  
✅ Sign & broadcast transactions  
✅ Integrate **WalletConnect**  
✅ Use **MetaMask Snap** (optional)  
✅ Organize a clean **Next.js + React + Tailwind** frontend  
✅ Open & manage trading positions with a sleek trade page

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Smart Contracts:** C++ on Qubic
- **Wallets:** WalletConnect, MetaMask Snap
- **RPC Communication:** [`@qubic-lib/qubic-ts-library`](https://www.npmjs.com/package/@qubic-lib/qubic-ts-library)
- **UI:** Tailwind CSS, Shadcn UI, Lucide React Icons

---

## 📁 Project Structure

/app
├─ layout.tsx # App shell with Theme & QubicProvider

├─ page.tsx # Root page, switches between sections

├─ /components

│ ├─ dashboard.tsx # Reads contract state & shows balances

│ ├─ trade-page.tsx # Trade form, position manager, order history

│ ├─ wallet-connect.tsx # WalletConnect UI

/hooks

├─ use-qubic-connector.ts # RPC connector context & signer

├─ use-wallet-connect.ts # WalletConnect hook

/lib

├─ contracts.ts # Contract addresses, TX builders

/contracts

├─ DEX.cpp # Example C++ smart contract

├─ deploy.sh # Example deploy script


---

## ⚙️ Getting Started

1️⃣ Clone the repo  
```bash
git clone https://github.com/your-org/qubic-dex.git
cd qubic-dex

npm install
npm run dev

2️⃣ Connect your wallet, open the Trade Page, and place a test position.

3️⃣ Check the Order History to see your trades listed.

🗂️ Features
🔗 Qubic RPC connection

🧩 Sign & broadcast trades

📈 TradingView-ready chart placeholder

🏦 Margin, leverage & liquidation calculations

📜 Order history tabs

🦊 MetaMask Snap integration (optional)

🔒 WalletConnect v2


🙌 Contributing
PRs, issues & forks are welcome — this is an MVP PoC to show how Qubic DEXes work.
For deeper integrations, check Qubic Docs.



