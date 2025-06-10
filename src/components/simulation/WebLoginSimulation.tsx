
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Shield, CheckCircle, AlertTriangle } from "lucide-react"

interface WebLoginSimulationProps {
  title: string
  vulnerability: "sqli" | "weak-password" | "brute-force"
  expectedPayload: string
  onComplete: () => void
  completed: boolean
}

export function WebLoginSimulation({
  title,
  vulnerability,
  expectedPayload,
  onComplete,
  completed
}: WebLoginSimulationProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleLogin = () => {
    setAttempts(prev => prev + 1)
    
    let isCorrect = false
    
    switch (vulnerability) {
      case "sqli":
        isCorrect = username.includes(expectedPayload) || password.includes(expectedPayload)
        break
      case "weak-password":
        isCorrect = password === expectedPayload
        break
      case "brute-force":
        isCorrect = attempts >= 3 && password === expectedPayload
        break
    }

    if (isCorrect) {
      setMessage("🎉 Access Granted! Admin dashboard unlocked.")
      setIsSuccess(true)
      setTimeout(() => onComplete(), 2000)
    } else {
      if (vulnerability === "sqli") {
        setMessage("❌ Login failed. Try injecting SQL commands...")
      } else if (vulnerability === "weak-password") {
        setMessage("❌ Login failed. Try common passwords...")
      } else {
        setMessage(`❌ Login failed. Attempt ${attempts}/5`)
      }
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
          <p className="text-cyber-green">✅ Web application vulnerability exploited successfully!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Simulated Web App */}
        <div className="border-2 border-dashed border-muted p-6 rounded-lg bg-muted/5">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">SecureCorp Login Portal</h3>
            <p className="text-sm text-muted-foreground">Employee Access Only</p>
          </div>
          
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={isSuccess}
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isSuccess}
              />
            </div>
            
            <Button 
              onClick={handleLogin}
              className="w-full"
              disabled={isSuccess}
            >
              Login
            </Button>
          </div>
        </div>

        {/* Response Message */}
        {message && (
          <div className={`p-4 rounded ${
            isSuccess 
              ? "bg-cyber-green/20 text-cyber-green border border-cyber-green/30"
              : "bg-cyber-red/20 text-cyber-red border border-cyber-red/30"
          }`}>
            <div className="flex items-center space-x-2">
              {isSuccess ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertTriangle className="h-5 w-5" />
              )}
              <span>{message}</span>
            </div>
          </div>
        )}

        {/* Hint */}
        {!isSuccess && vulnerability === "sqli" && (
          <div className="text-sm text-muted-foreground">
            💡 Hint: Try SQL injection in the username field. Common payloads: ' OR 1=1 --
          </div>
        )}
      </CardContent>
    </Card>
  )
}
