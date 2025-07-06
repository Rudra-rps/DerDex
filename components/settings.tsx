"use client"

import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SettingsIcon, Bell, Shield, Palette, Globe, Monitor, Sun, Moon } from "lucide-react"

export function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <SettingsIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-1">Settings</h1>
            <p className="text-muted-foreground text-lg">Customize your trading experience</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appearance */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-xl flex items-center gap-2">
              <Palette className="w-6 h-6 text-blue-500" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-foreground font-medium">Theme</Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="flex items-center gap-2 h-12"
                >
                  <Sun className="w-4 h-4" />
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="flex items-center gap-2 h-12"
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className="flex items-center gap-2 h-12"
                >
                  <Monitor className="w-4 h-4" />
                  System
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Auto-refresh Prices</Label>
                <p className="text-muted-foreground text-sm">Automatically update market prices</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Compact Mode</Label>
                <p className="text-muted-foreground text-sm">Reduce spacing for more information</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Trading Preferences */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-xl flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-purple-500" />
              Trading Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-foreground font-medium">Default Leverage</Label>
              <Select defaultValue="10">
                <SelectTrigger className="bg-accent/30 border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="5">5x</SelectItem>
                  <SelectItem value="10">10x</SelectItem>
                  <SelectItem value="20">20x</SelectItem>
                  <SelectItem value="50">50x</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Confirmation Dialogs</Label>
                <p className="text-muted-foreground text-sm">Show confirmation before placing orders</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Advanced Mode</Label>
                <p className="text-muted-foreground text-sm">Enable advanced trading features</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-xl flex items-center gap-2">
              <Bell className="w-6 h-6 text-yellow-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Price Alerts</Label>
                <p className="text-muted-foreground text-sm">Get notified of significant price changes</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Position Updates</Label>
                <p className="text-muted-foreground text-sm">Notifications for position changes</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">AI Insights</Label>
                <p className="text-muted-foreground text-sm">Receive AI-generated trading insights</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Risk Alerts</Label>
                <p className="text-muted-foreground text-sm">Warnings for high-risk situations</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Two-Factor Authentication</Label>
                <p className="text-muted-foreground text-sm">Add extra security to your account</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10 bg-transparent"
              >
                Enable
              </Button>
            </div>

            <div className="space-y-3">
              <Label className="text-foreground font-medium">Session Timeout</Label>
              <Select defaultValue="30">
                <SelectTrigger className="bg-accent/30 border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Biometric Login</Label>
                <p className="text-muted-foreground text-sm">Use fingerprint or face recognition</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-xl flex items-center gap-2">
              <Globe className="w-6 h-6 text-purple-500" />
              Regional Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-foreground font-medium">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="bg-accent/30 border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-foreground font-medium">Currency Display</Label>
              <Select defaultValue="usd">
                <SelectTrigger className="bg-accent/30 border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="jpy">JPY (¥)</SelectItem>
                  <SelectItem value="cad">CAD (C$)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-foreground font-medium">Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger className="bg-accent/30 border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST (New York)</SelectItem>
                  <SelectItem value="pst">PST (Los Angeles)</SelectItem>
                  <SelectItem value="gmt">GMT (London)</SelectItem>
                  <SelectItem value="cet">CET (Berlin)</SelectItem>
                  <SelectItem value="jst">JST (Tokyo)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-xl flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-red-500" />
              Advanced Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Developer Mode</Label>
                <p className="text-muted-foreground text-sm">Enable advanced debugging features</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Beta Features</Label>
                <p className="text-muted-foreground text-sm">Access experimental features</p>
              </div>
              <Switch />
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-500/10 bg-transparent"
              >
                Reset All Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg font-semibold shadow-lg">
          Save Settings
        </Button>
      </div>
    </div>
  )
}
