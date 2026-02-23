"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, Bot } from "lucide-react"

type HeaderProps = {
  onReset: () => void
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-8 py-4">
      <div className="flex items-center gap-2">
        <Bot className="h-8 w-8 shrink-0 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight whitespace-nowrap">
          Gemini Key Analyzer
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Badge className="whitespace-nowrap font-medium bg-green-700 text-white border-green-700 hover:bg-green-800">
          Health Check
        </Badge>
        <Button variant="outline" size="sm" onClick={onReset}>
          <LogOut className="mr-2 h-4 w-4" />
          Reset Key
        </Button>
      </div>
    </header>
  )
}
