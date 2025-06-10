
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Terminal, Eye, Shield, Mail, FileText, Network, CheckCircle } from "lucide-react"

interface Challenge {
  id: number
  title: string
  description: string
  type: "scan" | "analyze" | "report" | "phishing" | "incident" | "penetration" | "multiple-choice" | "input" | "code" | "terminal" | "web-login" | "code-injection"
  completed: boolean
  points: number
  data?: any
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
  onCompleteChallenge: (challengeId: number) => void
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
  onPenetrationTest,
  onCompleteChallenge
}: InteractiveChallengeProps) {
  const [userInput, setUserInput] = useState("")
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const getIcon = () => {
    switch (currentChallenge.type) {
      case "scan": return <Terminal className="h-5 w-5" />
      case "analyze": return <Eye className="h-5 w-5" />
      case "report": return <Shield className="h-5 w-5" />
      case "phishing": return <Mail className="h-5 w-5" />
      case "incident": return <FileText className="h-5 w-5" />
      case "penetration": return <Network className="h-5 w-5" />
      case "multiple-choice": return <CheckCircle className="h-5 w-5" />
      case "input": return <Terminal className="h-5 w-5" />
      case "code": return <Terminal className="h-5 w-5" />
      default: return <Terminal className="h-5 w-5" />
    }
  }

  const handleMultipleChoiceSubmit = () => {
    if (selectedAnswer === null) return
    
    const isCorrect = selectedAnswer === currentChallenge.data?.correct
    setShowResult(true)
    
    if (isCorrect) {
      setTimeout(() => {
        onCompleteChallenge(currentChallenge.id)
        setShowResult(false)
        setSelectedAnswer(null)
      }, 1500)
    }
  }

  const handleInputSubmit = () => {
    if (!userInput.trim()) return
    
    let isCorrect = false
    
    if (currentChallenge.data?.correctAnswers) {
      // Check against multiple correct answers
      isCorrect = currentChallenge.data.correctAnswers.some((answer: string) => 
        userInput.toLowerCase().includes(answer.toLowerCase())
      )
    } else if (currentChallenge.data?.minLength) {
      // Check minimum length requirement
      isCorrect = userInput.length >= currentChallenge.data.minLength
    } else {
      // For code challenges, check for keywords
      if (currentChallenge.data?.keywords) {
        isCorrect = currentChallenge.data.keywords.some((keyword: string) =>
          userInput.toLowerCase().includes(keyword.toLowerCase())
        )
      } else {
        isCorrect = userInput.length > 10 // Basic validation
      }
    }
    
    setShowResult(true)
    
    if (isCorrect) {
      setTimeout(() => {
        onCompleteChallenge(currentChallenge.id)
        setShowResult(false)
        setUserInput("")
      }, 1500)
    }
  }

  const resetAnswer = () => {
    setShowResult(false)
    setSelectedAnswer(null)
    setUserInput("")
  }

  if (currentChallenge.completed) {
    return (
      <Card className="border-cyber-green/30 bg-cyber-green/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2 text-cyber-green">
            <CheckCircle className="h-5 w-5" />
            <span>{currentChallenge.title} - Completed!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-cyber-green">✅ Challenge completed successfully! (+{currentChallenge.points} points)</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          {getIcon()}
          <span>{currentChallenge.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{currentChallenge.description}</p>
        
        {/* Multiple Choice Challenge */}
        {currentChallenge.type === "multiple-choice" && currentChallenge.data && (
          <div className="space-y-4">
            <h4 className="font-semibold">{currentChallenge.data.question}</h4>
            <div className="space-y-2">
              {currentChallenge.data.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  className={`w-full text-left p-3 rounded border transition-colors ${
                    selectedAnswer === index
                      ? "border-cyber-blue bg-cyber-blue/10"
                      : "border-gray-300 hover:border-cyber-blue/50"
                  }`}
                  disabled={showResult}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>
            
            {showResult && (
              <div className={`p-4 rounded ${
                selectedAnswer === currentChallenge.data.correct
                  ? "bg-cyber-green/20 text-cyber-green border border-cyber-green/30"
                  : "bg-cyber-red/20 text-cyber-red border border-cyber-red/30"
              }`}>
                {selectedAnswer === currentChallenge.data.correct
                  ? "✅ Correct! Great job!"
                  : `❌ Incorrect. The correct answer was: ${String.fromCharCode(65 + currentChallenge.data.correct)}. ${currentChallenge.data.options[currentChallenge.data.correct]}`
                }
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleMultipleChoiceSubmit}
                disabled={selectedAnswer === null || showResult}
                className="bg-cyber-blue hover:bg-cyber-blue/80"
              >
                Submit Answer
              </Button>
              {showResult && selectedAnswer !== currentChallenge.data.correct && (
                <Button onClick={resetAnswer} variant="outline">
                  Try Again
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Input Challenge */}
        {(currentChallenge.type === "input" || currentChallenge.type === "code") && (
          <div className="space-y-4">
            {currentChallenge.type === "code" ? (
              <Textarea
                placeholder={currentChallenge.data?.placeholder || "Enter your answer..."}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={showResult}
                className="font-mono text-sm min-h-[120px]"
              />
            ) : (
              <Input
                placeholder={currentChallenge.data?.placeholder || "Enter your answer..."}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={showResult}
              />
            )}
            
            {showResult && (
              <div className={`p-4 rounded ${
                userInput && (
                  currentChallenge.data?.correctAnswers?.some((answer: string) => 
                    userInput.toLowerCase().includes(answer.toLowerCase())
                  ) ||
                  (currentChallenge.data?.minLength && userInput.length >= currentChallenge.data.minLength) ||
                  (currentChallenge.data?.keywords?.some((keyword: string) =>
                    userInput.toLowerCase().includes(keyword.toLowerCase())
                  ))
                )
                  ? "bg-cyber-green/20 text-cyber-green border border-cyber-green/30"
                  : "bg-cyber-red/20 text-cyber-red border border-cyber-red/30"
              }`}>
                {userInput && (
                  currentChallenge.data?.correctAnswers?.some((answer: string) => 
                    userInput.toLowerCase().includes(answer.toLowerCase())
                  ) ||
                  (currentChallenge.data?.minLength && userInput.length >= currentChallenge.data.minLength) ||
                  (currentChallenge.data?.keywords?.some((keyword: string) =>
                    userInput.toLowerCase().includes(keyword.toLowerCase())
                  ))
                )
                  ? "✅ Correct! Well done!"
                  : "❌ Not quite right. Try again with a different approach."
                }
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleInputSubmit}
                disabled={!userInput.trim() || showResult}
                className="bg-cyber-blue hover:bg-cyber-blue/80"
              >
                Submit
              </Button>
              {showResult && (
                <Button onClick={resetAnswer} variant="outline">
                  Try Again
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Legacy challenge types for backward compatibility */}
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
            Analyze Results
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

        {currentChallenge.type === "phishing" && currentChallenge.id === 1 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Analyze these emails and identify which ones are phishing attempts:</h4>
            {[
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
            ].map((email) => (
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
