"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Settings, Layout, Palette, Navigation } from "lucide-react"
import { usePreferences } from "@/contexts/preferences-context"

export function PreferencesPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { navigationStyle, setNavigationStyle, culturalTheme, setCulturalTheme } = usePreferences()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="fixed bottom-4 right-4 z-50 shadow-lg bg-transparent">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Preferences</h2>
            <p className="text-sm text-muted-foreground">Customize your portfolio experience</p>
          </div>

          {/* Navigation Style */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-4 w-4" />
                Navigation Style
              </CardTitle>
              <CardDescription>Choose how you want to navigate the portfolio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={navigationStyle === "top" ? "default" : "outline"}
                  onClick={() => setNavigationStyle("top")}
                  className="h-auto p-3 flex flex-col gap-2"
                >
                  <Layout className="h-4 w-4" />
                  <span className="text-xs">Top Bar</span>
                </Button>
                <Button
                  variant={navigationStyle === "side" ? "default" : "outline"}
                  onClick={() => setNavigationStyle("side")}
                  className="h-auto p-3 flex flex-col gap-2"
                >
                  <Layout className="h-4 w-4 rotate-90" />
                  <span className="text-xs">Sidebar</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cultural Theme */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Cultural Theme
              </CardTitle>
              <CardDescription>Add personality with cultural themes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  variant={culturalTheme === "default" ? "default" : "outline"}
                  onClick={() => setCulturalTheme("default")}
                  className="w-full justify-start h-auto p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    <div className="text-left">
                      <div className="font-medium">Default</div>
                      <div className="text-xs text-muted-foreground">Clean & Professional</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={culturalTheme === "brazil" ? "default" : "outline"}
                  onClick={() => setCulturalTheme("brazil")}
                  className="w-full justify-start h-auto p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500" />
                    <div className="text-left">
                      <div className="font-medium flex items-center gap-2">
                        Brazil 🇧🇷
                        <Badge variant="secondary" className="text-xs">
                          Vibrant
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Verde, Amarelo, Azul</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={culturalTheme === "japan" ? "default" : "outline"}
                  onClick={() => setCulturalTheme("japan")}
                  className="w-full justify-start h-auto p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-600 via-white to-red-600 border" />
                    <div className="text-left">
                      <div className="font-medium flex items-center gap-2">
                        Japan 🇯🇵
                        <Badge variant="secondary" className="text-xs">
                          Minimal
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">赤と白 (Red & White)</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={culturalTheme === "portugal" ? "default" : "outline"}
                  onClick={() => setCulturalTheme("portugal")}
                  className="w-full justify-start h-auto p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-600 via-red-600 to-green-600" />
                    <div className="text-left">
                      <div className="font-medium flex items-center gap-2">
                        Portugal 🇵🇹
                        <Badge variant="secondary" className="text-xs">
                          Elegante
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Verde e Vermelho</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={culturalTheme === "england" ? "default" : "outline"}
                  onClick={() => setCulturalTheme("england")}
                  className="w-full justify-start h-auto p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-700 via-white to-red-600 border" />
                    <div className="text-left">
                      <div className="font-medium flex items-center gap-2">
                        England 🇬🇧
                        <Badge variant="secondary" className="text-xs">
                          Classic
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Red, White & Blue</div>
                    </div>
                  </div>
                </Button>
              </div>

              {/* Theme Preview */}
              <div className="mt-4 p-3 rounded-lg border bg-muted/50">
                <div className="text-xs font-medium mb-2">Current Theme Preview:</div>
                <div className="flex gap-2">
                  {culturalTheme === "brazil" && (
                    <>
                      <div className="w-6 h-6 rounded bg-green-500" />
                      <div className="w-6 h-6 rounded bg-yellow-400" />
                      <div className="w-6 h-6 rounded bg-blue-500" />
                    </>
                  )}
                  {culturalTheme === "japan" && (
                    <>
                      <div className="w-6 h-6 rounded bg-red-600" />
                      <div className="w-6 h-6 rounded bg-white border" />
                      <div className="w-6 h-6 rounded bg-gray-900" />
                    </>
                  )}
                  {culturalTheme === "default" && (
                    <>
                      <div className="w-6 h-6 rounded bg-blue-500" />
                      <div className="w-6 h-6 rounded bg-purple-500" />
                      <div className="w-6 h-6 rounded bg-indigo-500" />
                    </>
                  )}
                  {culturalTheme === "portugal" && (
                    <>
                      <div className="w-6 h-6 rounded bg-green-600" />
                      <div className="w-6 h-6 rounded bg-red-600" />
                      <div className="w-6 h-6 rounded bg-yellow-500" />
                    </>
                  )}
                  {culturalTheme === "england" && (
                    <>
                      <div className="w-6 h-6 rounded bg-blue-700" />
                      <div className="w-6 h-6 rounded bg-white border" />
                      <div className="w-6 h-6 rounded bg-red-600" />
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-xs text-muted-foreground space-y-2">
                <p>🎨 Cultural themes add personality and reflect your global perspective</p>
                <p>🧭 Navigation styles adapt to your browsing preference</p>
                <p>💾 Your preferences are saved automatically</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
