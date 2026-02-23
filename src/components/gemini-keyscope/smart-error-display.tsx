"use client"

import { useEffect, useState } from "react"
import { interpretGeminiError } from "@/ai/flows/smart-error-interpretation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, Terminal } from "lucide-react"

type SmartErrorDisplayProps = {
  rawError: string
}

export default function SmartErrorDisplay({ rawError }: SmartErrorDisplayProps) {
  const [interpretation, setInterpretation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getInterpretation() {
      if (!rawError) return
      setIsLoading(true)
      setError(null)
      try {
        const result = await interpretGeminiError({ rawErrorMessage: rawError })
        setInterpretation(result.userFriendlyMessage)
      } catch (e) {
        console.error("Error interpreting Gemini error:", e)
        setError("Failed to get AI interpretation. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    getInterpretation()
  }, [rawError])

  return (
    <div className="space-y-4 min-w-0 w-full overflow-hidden">
      <Alert variant="destructive" className="overflow-hidden">
        <Sparkles className="h-4 w-4 shrink-0" />
        <AlertTitle className="font-bold">Smart Error Interpretation</AlertTitle>
        <AlertDescription className="min-w-0 overflow-hidden">
          {isLoading ? (
            <div className="space-y-2 mt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : error ? (
            <p className="break-all max-w-full">{error}</p>
          ) : (
            <p className="leading-relaxed break-all max-w-full">
              {interpretation}
            </p>
          )}
        </AlertDescription>
      </Alert>
      <Accordion type="single" collapsible className="w-full min-w-0">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Terminal className="h-4 w-4 shrink-0" />
              View Raw Error Message
            </div>
          </AccordionTrigger>
          <AccordionContent className="min-w-0 overflow-hidden">
            <div className="max-w-full overflow-x-auto rounded-md bg-muted">
              <pre className="p-4 text-xs whitespace-pre-wrap break-all min-w-0">
                <code>{rawError}</code>
              </pre>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
