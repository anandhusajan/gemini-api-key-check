"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Model } from "@/lib/types"
import { cn } from "@/lib/utils"
import SmartErrorDisplay from "./smart-error-display"
import { testModelWithKey, type TestModelResult } from "@/app/actions/validate-key"
import { Bot, Cpu, Type, CheckCircle2, XCircle, AlertTriangle, Loader2, TestTube } from "lucide-react"

type ModelDetailDialogProps = {
  model: Model | null
  open: boolean
  onOpenChange: (open: boolean) => void
  apiKey?: string
  /** Pre-fetched result from table (avoids duplicate request when opening dialog) */
  initialTestResult?: TestModelResult | "pending"
}

const statusConfig: Record<string, { icon: typeof CheckCircle2; label: string; badgeClass: string }> = {
    working: {
        icon: CheckCircle2,
        label: "Working",
        badgeClass: "bg-primary/20 text-primary border-primary/30",
    },
    blocked: {
        icon: XCircle,
        label: "Blocked",
        badgeClass: "bg-destructive/20 text-destructive border-destructive/30",
    },
    "quota-exhausted": {
        icon: AlertTriangle,
        label: "Quota exceeded",
        badgeClass: "bg-warning/20 text-warning border-warning/30",
    },
    error: {
        icon: XCircle,
        label: "Error",
        badgeClass: "bg-destructive/20 text-destructive border-destructive/30",
    },
}


function DetailItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) {
  return (
    <div className="flex items-start gap-4">
        <div className="p-2 bg-muted rounded-md mt-1">
            <Icon className="size-4 text-muted-foreground" />
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        </div>
    </div>
  )
}


export default function ModelDetailDialog({ model, open, onOpenChange, apiKey, initialTestResult }: ModelDetailDialogProps) {
  const [testResult, setTestResult] = useState<TestModelResult | null>(null)
  const [isTesting, setIsTesting] = useState(false)

  useEffect(() => {
    if (model) {
      setTestResult(null)
      setIsTesting(false)
    }
  }, [model?.id])

  if (!model) return null
  const currentModel = model

  const effectiveResult: TestModelResult | null =
    testResult ?? (initialTestResult && initialTestResult !== "pending" ? initialTestResult : null)
  const statusKey = effectiveResult ? effectiveResult.status : model.status
  const { icon: StatusIcon, label: statusLabel, badgeClass } = statusConfig[statusKey] ?? statusConfig.working
  const displayError =
    model.error ?? (effectiveResult && "error" in effectiveResult ? effectiveResult.error : undefined)

  async function handleTestWithKey() {
    if (!apiKey || apiKey.length < 10) return
    setIsTesting(true)
    setTestResult(null)
    try {
      const result = await testModelWithKey(apiKey, currentModel.id)
      setTestResult(result)
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-w-[calc(100vw-2rem)] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl flex items-center gap-3">
            <Bot className="size-6 text-primary" />
            {model.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information and status for the selected model.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="outline" className={cn("text-sm", badgeClass)}>
                    <StatusIcon className="mr-2 h-4 w-4" />
                    {statusLabel}
                </Badge>
            </div>
            <DetailItem icon={Type} label="Model Type" value={model.type.charAt(0).toUpperCase() + model.type.slice(1)} />
            <DetailItem icon={Cpu} label="Context Window" value={model.contextWindow > 0 ? model.contextWindow : "—"} />
        </div>

        {apiKey && apiKey.length >= 10 && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/90 font-medium shadow-sm shrink-0"
                onClick={handleTestWithKey}
                disabled={isTesting}
              >
                {isTesting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing…
                  </>
                ) : (
                  <>
                    <TestTube className="mr-2 h-4 w-4" />
                    Test with your key
                  </>
                )}
              </Button>
              {testResult && (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-sm shrink-0",
                    testResult.status === "working" && "bg-primary/20 text-primary border-primary/30",
                    testResult.status === "blocked" && "bg-destructive/20 text-destructive border-destructive/30",
                    (testResult.status === "quota-exhausted" || testResult.status === "error") && "bg-warning/20 text-warning border-warning/30"
                  )}
                >
                  {testResult.status === "working" && <CheckCircle2 className="mr-2 h-4 w-4" />}
                  {(testResult.status === "blocked" || testResult.status === "error") && <XCircle className="mr-2 h-4 w-4" />}
                  {testResult.status === "quota-exhausted" && <AlertTriangle className="mr-2 h-4 w-4" />}
                  {testResult.status.replace("-", " ")}
                </Badge>
              )}
            </div>
          </div>
        )}

        {displayError && (
          <div className="min-w-0 overflow-hidden">
            <SmartErrorDisplay rawError={displayError} />
          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}
