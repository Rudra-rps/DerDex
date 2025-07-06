"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, TrendingUp, Briefcase, Brain, Wallet, Settings, Menu, Wifi } from "lucide-react"

interface TopNavbarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "trade", label: "Trade", icon: TrendingUp },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "ai-insights", label: "AI Insights", icon: Brain },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "settings", label: "Settings", icon: Settings },
]

export function TopNavbar({ currentPage, setCurrentPage }: TopNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-xl">Qubic DEX</h1>
              <p className="text-gray-400 text-xs -mt-1">Derivatives Exchange</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-white font-bold text-lg">Qubic DEX</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out
                    flex items-center gap-2 group
                    ${
                      isActive
                        ? "text-white bg-blue-600/20 shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>

                  {/* Animated underline */}
                  <div
                    className={`
                    absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 
                    transition-all duration-300 ease-out
                    ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}
                  `}
                  />
                </button>
              )
            })}
          </div>

          {/* Network Status and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Network Status Badge */}
            <Badge className="bg-green-600/20 text-green-400 border-green-500/30 backdrop-blur-sm shadow-lg">
              <Wifi className="w-3 h-3 mr-1" />
              Online
            </Badge>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-gray-300 hover:text-white hover:bg-gray-800/50"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gray-900/95 backdrop-blur-xl border-gray-800/50 shadow-2xl">
                <div className="flex items-center gap-3 mb-8 pt-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">Q</span>
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-xl">Qubic DEX</h1>
                    <p className="text-gray-400 text-xs">Derivatives Exchange</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = currentPage === item.id

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentPage(item.id)
                          setMobileMenuOpen(false)
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                          transition-all duration-300 ease-out
                          ${
                            isActive
                              ? "text-white bg-blue-600/20 shadow-lg border border-blue-500/30"
                              : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Network Status</span>
                      <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                        <Wifi className="w-3 h-3 mr-1" />
                        Online
                      </Badge>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
