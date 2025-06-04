
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, Eye, Shield } from "lucide-react"

interface Challenge {
  id: number
  title: string
  description: string
  type: "scan" | "analyze" | "report"
  completed: boolean
}

interface InteractiveChallengeProps {
  currentChallenge: Challenge
  scanResults: string[]
  isScanning: boolean
  challenges: Challenge[]
  onScan: () => void
  onAnalyze: () => void
  onReport: () => void
}

export function InteractiveChallenge({
  currentChallenge,
  scanResults,
  isScanning,
  challenges,
  onScan,
  onAnalyze,
  onReport
}: InteractiveChallengeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{currentChallenge.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{currentChallenge.description}</p>
        
        {currentChallenge.type === "scan" && (
          <div className="space-y-4">
            <Button 
              onClick={onScan} 
              disabled={isScanning || currentChallenge.completed}
              className="bg-cyber-blue hover:bg-cyber-blue/80"
            >
              <Terminal className="h-4 w-4 mr-2" />
              {isScanning ? "Scanning..." : "Start Network Scan"}
            </Button>
            
            {scanResults.length > 0 && (
              <div className="bg-black/80 text-cyber-green p-4 rounded font-mono text-sm">
                {scanResults.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {currentChallenge.type === "analyze" && (
          <Button 
            onClick={onAnalyze}
            disabled={currentChallenge.completed || !challenges.find(c => c.id === 1)?.completed}
            className="bg-cyber-orange hover:bg-cyber-orange/80"
          >
            <Eye className="h-4 w-4 mr-2" />
            Analyze Scan Results
          </Button>
        )}
        
        {currentChallenge.type === "report" && (
          <Button 
            onClick={onReport}
            disabled={currentChallenge.completed || !challenges.find(c => c.id === 2)?.completed}
            className="bg-cyber-green hover:bg-cyber-green/80"
          >
            <Shield className="h-4 w-4 mr-2" />
            Generate Security Report
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
