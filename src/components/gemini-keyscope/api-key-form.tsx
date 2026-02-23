"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { validateGeminiKey } from "@/app/actions/validate-key"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { KeyRound, Loader2, Bot } from "lucide-react"

const formSchema = z.object({
  apiKey: z.string().min(10, {
    message: "API Key must be at least 10 characters.",
  }),
})

type ApiKeyFormProps = {
  onValidate: (apiKey: string) => void
}

export default function ApiKeyForm({ onValidate }: ApiKeyFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const result = await validateGeminiKey(values.apiKey)
    if (result.valid) {
      toast({
        title: "Validation Successful",
        description: "Your Gemini API key is active.",
      })
      onValidate(values.apiKey)
    } else {
      toast({
        variant: "destructive",
        title: "Validation Failed",
        description: result.error,
      })
    }
    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="pt-8">
            <Badge className="absolute top-4 right-4 font-medium bg-green-700 text-white border-green-700 hover:bg-green-800">
              Health Check
            </Badge>
            <div className="flex flex-col items-center justify-center gap-2 mb-4 mt-4">
              <Bot className="w-14 h-14 shrink-0 text-primary" />
              <CardTitle className="text-3xl font-bold whitespace-nowrap text-center">Gemini API Key Check</CardTitle>
            </div>
            <CardDescription className="text-center">
              Enter your Gemini API key to check its status and available models.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gemini API Key</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Enter your API key"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validating...
                </>
              ) : (
                "Validate Key"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
