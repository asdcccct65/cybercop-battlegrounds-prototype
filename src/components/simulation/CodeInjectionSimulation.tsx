
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Code, CheckCircle, Play } from "lucide-react"

interface CodeInjectionSimulationProps {
  title: string
  targetCode: string
  expectedPayload: string
  vulnerability: "xss" | "command-injection" | "file-inclusion"
  onComplete: () => void
  completed: boolean
}

export function CodeInjectionSimulation({
  title,
  targetCode,
  expectedPayload,
  vulnerability,
  onComplete,
  completed
}: CodeInjectionSimulationProps) {
  const [payload, setPayload] = useState("")
  const [output, setOutput] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const executePayload = () => {
    const isCorrect = payload.toLowerCase().includes(expectedPayload.toLowerCase())
    
    if (isCorrect) {
      switch (vulnerability) {
        case "xss":
          setOutput("🚨 XSS Alert! Script executed successfully: " + payload)
          break
        case "command-injection":
          setOutput("🚨 Command executed on server: " + payload.split(';')[1] || payload)
          break
        case "file-inclusion":
          setOutput("🚨 File included successfully: /etc/passwd contents revealed")
          break
      }
      setIsSuccess(true)
      setTimeout(() => onComplete(), 2000)
    } else {
      setOutput("❌ Payload failed. Try a different injection technique.")
    }
  }

  if (completed) {
    return (
      <Card className="border-cyber-green/30 bg-cyber-green/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyber-green">
            <CheckCircle className="h-5 w-5" />
            <span>{title} - Completed!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-cyber-green">✅ Code injection vulnerability exploited successfully!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Target Application Code */}
        <div>
          <h4 className="font-semibold mb-2">Target Application Code:</h4>
          <div className="bg-black text-cyber-green p-4 rounded font-mono text-sm">
            <pre>{targetCode}</pre>
          </div>
        </div>

        {/* Payload Input */}
        <div>
          <h4 className="font-semibold mb-2">Your Payload:</h4>
          <Textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            placeholder={`Enter your ${vulnerability} payload here...`}
            className="font-mono text-sm"
            disabled={isSuccess}
          />
        </div>

        <Button 
          onClick={executePayload}
          disabled={!payload.trim() || isSuccess}
          className="bg-cyber-red hover:bg-cyber-red/80"
        >
          <Play className="h-4 w-4 mr-2" />
          Execute Payload
        </Button>

        {/* Output */}
        {output && (
          <div className={`p-4 rounded font-mono text-sm ${
            isSuccess 
              ? "bg-cyber-green/20 text-cyber-green border border-cyber-green/30"
              : "bg-cyber-red/20 text-cyber-red border border-cyber-red/30"
          }`}>
            {output}
          </div>
        )}

        {/* Hints */}
        {!isSuccess && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p>💡 Hints:</p>
            {vulnerability === "xss" && <p>• Try: &lt;script&gt;alert('XSS')&lt;/script&gt;</p>}
            {vulnerability === "command-injection" && <p>• Try: ; cat /etc/passwd</p>}
            {vulnerability === "file-inclusion" && <p>• Try: ../../etc/passwd</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
