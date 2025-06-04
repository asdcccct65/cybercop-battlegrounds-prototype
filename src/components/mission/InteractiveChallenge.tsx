
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Terminal, Eye, Shield, Mail, FileText, Network } from "lucide-react"

interface Challenge {
  id: number
  title: string
  description: string
  type: "scan" | "analyze" | "report" | "phishing" | "incident" | "penetration"
  completed: boolean
  points: number
}

interface InteractiveChallengeProps {
  currentChallenge: Challenge
  scanResults: string[]
  isScanning: boolean
  challenges: Challenge[]
  onScan: () => void
  onAnalyze: () => void
  onReport: () => void
  onPhishingAnalysis: () => void
  onIncidentResponse: () => void
  onPenetrationTest: () => void
}

export function InteractiveChallenge({
  currentChallenge,
  scanResults,
  isScanning,
  challenges,
  onScan,
  onAnalyze,
  onReport,
  onPhishingAnalysis,
  onIncidentResponse,
  onPenetrationTest
}: InteractiveChallengeProps) {
  const [userInput, setUserInput] = useState("")
  const [phishingEmails] = useState([
    {
      id: 1,
      subject: "Urgent: Verify Your Account",
      sender: "security@payp4l.com",
      content: "Your account will be suspended. Click here to verify: http://payp4l-security.suspicious.com",
      isPhishing: true
    },
    {
      id: 2,
      subject: "Meeting Tomorrow",
      sender: "john@company.com",
      content: "Hi, don't forget about our meeting tomorrow at 2 PM in conference room A.",
      isPhishing: false
    }
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          {currentChallenge.type === "scan" && <Terminal className="h-5 w-5" />}
          {currentChallenge.type === "analyze" && <Eye className="h-5 w-5" />}
          {currentChallenge.type === "report" && <Shield className="h-5 w-5" />}
          {currentChallenge.type === "phishing" && <Mail className="h-5 w-5" />}
          {currentChallenge.type === "incident" && <FileText className="h-5 w-5" />}
          {currentChallenge.type === "penetration" && <Network className="h-5 w-5" />}
          <span>{currentChallenge.title}</span>
        </CardTitle>
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

        {currentChallenge.type === "phishing" && (
          <div className="space-y-4">
            <h4 className="font-semibold">Analyze these emails and identify which ones are phishing attempts:</h4>
            {phishingEmails.map((email) => (
              <div key={email.id} className="border p-4 rounded space-y-2">
                <div><strong>From:</strong> {email.sender}</div>
                <div><strong>Subject:</strong> {email.subject}</div>
                <div><strong>Content:</strong> {email.content}</div>
                <Button 
                  size="sm" 
                  variant={email.isPhishing ? "destructive" : "default"}
                  onClick={onPhishingAnalysis}
                  disabled={currentChallenge.completed}
                >
                  {email.isPhishing ? "Flag as Phishing" : "Mark as Safe"}
                </Button>
              </div>
            ))}
          </div>
        )}

        {currentChallenge.type === "incident" && (
          <div className="space-y-4">
            <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
              <h4 className="font-semibold text-red-400">INCIDENT ALERT</h4>
              <p>Suspicious activity detected: Multiple failed login attempts from IP 192.168.1.100</p>
              <p>Time: 2024-06-04 14:30:00 UTC</p>
              <p>Affected system: Web server (server-01)</p>
            </div>
            <Textarea 
              placeholder="Document your incident response steps here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={currentChallenge.completed}
            />
            <Button 
              onClick={onIncidentResponse}
              disabled={currentChallenge.completed || userInput.length < 10}
              className="bg-cyber-red hover:bg-cyber-red/80"
            >
              <FileText className="h-4 w-4 mr-2" />
              Submit Incident Response
            </Button>
          </div>
        )}

        {currentChallenge.type === "penetration" && (
          <div className="space-y-4">
            <div className="bg-black/80 text-cyber-green p-4 rounded font-mono text-sm">
              <div>Target: demo-corp.local</div>
              <div>Scope: 192.168.1.0/24</div>
              <div>Authorized testing window: 2 hours</div>
            </div>
            <Button 
              onClick={onPenetrationTest}
              disabled={currentChallenge.completed}
              className="bg-cyber-purple hover:bg-cyber-purple/80"
            >
              <Network className="h-4 w-4 mr-2" />
              Begin Penetration Test
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
