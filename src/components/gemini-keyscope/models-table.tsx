"use client"

import { useState, useEffect, useRef } from "react"
import { models as allModels } from "@/lib/data"
import type { Model } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, AlertTriangle, Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import ModelDetailDialog from "./model-detail-dialog"
import { testModelWithKey, type TestModelResult } from "@/app/actions/validate-key"

type DisplayStatus = "working" | "blocked" | "quota-exhausted" | "error" | "pending"

const statusConfig: Record<DisplayStatus, { icon: typeof CheckCircle2; className: string; label: string }> = {
  working: {
    icon: CheckCircle2,
    className: "bg-primary/20 text-primary border-primary/30",
    label: "Working",
  },
  blocked: {
    icon: XCircle,
    className: "bg-destructive/20 text-destructive border-destructive/30",
    label: "Blocked",
  },
  "quota-exhausted": {
    icon: AlertTriangle,
    className: "bg-warning/20 text-warning border-warning/30",
    label: "Quota exceeded",
  },
  error: {
    icon: XCircle,
    className: "bg-destructive/20 text-destructive border-destructive/30",
    label: "Error",
  },
  pending: {
    icon: Loader2,
    className: "bg-muted text-muted-foreground border-muted",
    label: "Checking...",
  },
}

type ModelsTableProps = {
  apiKey: string
}

function getDisplayStatus(entry: TestModelResult | "pending" | undefined): DisplayStatus {
  if (!entry || entry === "pending") return "pending"
  return entry.status
}

function formatContextWindow(n: number): string {
  if (!n || n <= 0) return "—"
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`
  return String(n)
}

export default function ModelsTable({ apiKey }: ModelsTableProps) {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modelStatuses, setModelStatuses] = useState<Record<string, TestModelResult | "pending">>({})
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const runRef = useRef(0)

  useEffect(() => {
    if (!apiKey || apiKey.trim().length < 10) {
      setModelStatuses({})
      return
    }
    const runId = ++runRef.current
    setModelStatuses(
      Object.fromEntries(allModels.map((m) => [m.id, "pending" as const]))
    )
    let cancelled = false
    ;(async () => {
      for (const model of allModels) {
        if (cancelled || runRef.current !== runId) return
        const result = await testModelWithKey(apiKey, model.id)
        if (cancelled || runRef.current !== runId) return
        setModelStatuses((prev) => ({ ...prev, [model.id]: result }))
      }
    })()
    return () => {
      cancelled = true
    }
  }, [apiKey, refreshTrigger])

  const handleRowClick = (model: Model) => {
    setSelectedModel(model)
    setIsModalOpen(true)
  }

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open)
    if (!open) {
      setTimeout(() => setSelectedModel(null), 300)
    }
  }

  const completedCount = allModels.filter(
    (m) => modelStatuses[m.id] && modelStatuses[m.id] !== "pending"
  ).length
  const workingCount = allModels.filter((m) => {
    const entry = modelStatuses[m.id]
    return entry !== undefined && entry !== "pending" && entry.status === "working"
  }).length
  const isChecking = completedCount < allModels.length && Object.keys(modelStatuses).length > 0

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="font-bold">Available Models</CardTitle>
            <div className="flex items-center gap-2">
              {isChecking ? (
                <span className="text-sm text-muted-foreground">
                  Checking models… {completedCount}/{allModels.length}
                </span>
              ) : Object.keys(modelStatuses).length > 0 ? (
                <div className="flex items-center gap-1.5">
                  <Badge variant="secondary" className="bg-primary/15 text-primary font-semibold border-primary/30">
                    {workingCount} working
                  </Badge>
                  <span className="text-muted-foreground/60 text-xs">/</span>
                  <Badge variant="secondary" className="font-medium">
                    {allModels.length} total
                  </Badge>
                </div>
              ) : null}
              {apiKey && apiKey.trim().length >= 10 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRefreshTrigger((t) => t + 1)}
                  disabled={isChecking}
                  title="Check again with same key"
                >
                  <RefreshCw className={cn("h-4 w-4", isChecking && "animate-spin")} />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Model Type</TableHead>
                  <TableHead>Context Window</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allModels.map((model) => {
                  const entry = modelStatuses[model.id]
                  const displayStatus = getDisplayStatus(entry)
                  const { icon: Icon, className, label } = statusConfig[displayStatus]
                  return (
                    <TableRow
                      key={model.id}
                      onClick={() => handleRowClick(model)}
                      className="cursor-pointer"
                    >
                      <TableCell className="font-medium">{model.name}</TableCell>
                      <TableCell className="capitalize text-muted-foreground">{model.type}</TableCell>
                      <TableCell className="text-muted-foreground tabular-nums">{formatContextWindow(model.contextWindow)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn("capitalize", className)}>
                          <Icon
                            className={cn("mr-2 h-4 w-4", displayStatus === "pending" && "animate-spin")}
                          />
                          {label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <ModelDetailDialog
        model={selectedModel}
        open={isModalOpen}
        onOpenChange={handleModalOpenChange}
        apiKey={apiKey}
        initialTestResult={selectedModel ? modelStatuses[selectedModel.id] : undefined}
      />
    </>
  )
}
