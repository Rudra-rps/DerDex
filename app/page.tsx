"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { TopNavigation } from "@/components/top-navigation"
import { Dashboard } from "@/components/dashboard"
import { TradePage } from "@/components/trade-page"
import { Portfolio } from "@/components/portfolio"
import { AIInsights } from "@/components/ai-insights"
import WalletConnect from "@/components/wallet-connect"
import { useQubicWalletConnect } from "@/hooks/use-qubic-walletconnect"
import { Settings } from "@/components/settings"
import { QubicProvider } from "@/hooks/use-qubic-connector"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "trade":
        return <TradePage />
      case "portfolio":
        return <Portfolio />
      case "ai-insights":
        return <AIInsights />
      case "wallet":
        return <WalletConnect />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="qubic-dex-theme">
      <QubicProvider>
        <div className="min-h-screen bg-background transition-colors duration-300">
          <TopNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-7xl mx-auto">{renderPage()}</div>
          </main>
        </div>
      </QubicProvider>
    </ThemeProvider>
  )
}
