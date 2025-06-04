
import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Clock, Target, CheckCircle, XCircle, Play, Pause, Terminal, Shield, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MissionInterfaceProps {
  mission: {
    id: number
    title: string
    description: string
    difficulty: "Easy" | "Medium" | "Hard"
    duration: string
    teamType: "Red Team" | "Blue Team" | "Both"
    points: number
  } | null
  isOpen: boolean
  onClose: () => void
}

interface Challenge {
  id: number
  title: string
  description: string
  type: "scan" | "analyze" | "report"
  completed: boolean
  points: number
}

export function MissionInterface({ mission, isOpen, onClose }: MissionInterfaceProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [scanResults, setScanResults] = useState<string[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (mission && isStarted && timeLeft > 0 && !isCompleted) {
      const interval = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isStarted, timeLeft, isCompleted])

  useEffect(() => {
    if (mission && isStarted) {
      // Initialize challenges based on mission type
      const missionChallenges: Challenge[] = [
        {
          id: 1,
          title: "Network Scan",
          description: "Perform a network scan to identify open ports and services",
          type: "scan",
          completed: false,
          points: 50
        },
        {
          id: 2,
          title: "Vulnerability Analysis",
          description: "Analyze the scan results to identify potential vulnerabilities",
          type: "analyze",
          completed: false,
          points: 75
        },
        {
          id: 3,
          title: "Security Report",
          description: "Generate a comprehensive security report with findings",
          type: "report",
          completed: false,
          points: 100
        }
      ]
      setChallenges(missionChallenges)
      setCurrentChallenge(missionChallenges[0])
    }
  }, [mission, isStarted])

  useEffect(() => {
    const completedChallenges = challenges.filter(c => c.completed).length
    const newProgress = (completedChallenges / challenges.length) * 100
    setProgress(newProgress)
    
    if (completedChallenges === challenges.length && challenges.length > 0) {
      setIsCompleted(true)
      setIsStarted(false)
      const totalPoints = challenges.reduce((sum, c) => sum + c.points, 0)
      toast({
        title: "Mission Completed!",
        description: `You earned ${totalPoints} points!`,
      })
    }
  }, [challenges, toast])

  const handleStart = () => {
    if (!mission) return
    const totalMinutes = parseInt(mission.duration.split(' ')[0]) * (mission.duration.includes('hour') ? 60 : 1)
    setTimeLeft(totalMinutes * 60)
    setIsStarted(true)
    setProgress(0)
    setIsCompleted(false)
    toast({
      title: "Mission Started",
      description: "Complete the challenges to earn points!",
    })
  }

  const handlePause = () => {
    setIsStarted(false)
  }

  const handleReset = () => {
    setIsStarted(false)
    setProgress(0)
    setTimeLeft(0)
    setIsCompleted(false)
    setChallenges([])
    setCurrentChallenge(null)
    setScanResults([])
  }

  const handleScan = () => {
    setIsScanning(true)
    setScanResults([])
    
    // Simulate network scanning
    const scanData = [
      "Scanning 192.168.1.0/24...",
      "Port 22/tcp - SSH - OPEN",
      "Port 80/tcp - HTTP - OPEN", 
      "Port 443/tcp - HTTPS - OPEN",
      "Port 3306/tcp - MySQL - OPEN",
      "Scan complete. 4 open ports found."
    ]
    
    scanData.forEach((line, index) => {
      setTimeout(() => {
        setScanResults(prev => [...prev, line])
        if (index === scanData.length - 1) {
          setIsScanning(false)
          completeChallenge(1)
        }
      }, (index + 1) * 800)
    })
  }

  const handleAnalyze = () => {
    if (challenges.find(c => c.id === 1)?.completed) {
      completeChallenge(2)
      toast({
        title: "Analysis Complete",
        description: "Vulnerabilities identified: Outdated SSH, MySQL exposure",
      })
    }
  }

  const handleReport = () => {
    if (challenges.find(c => c.id === 2)?.completed) {
      completeChallenge(3)
      toast({
        title: "Report Generated",
        description: "Security assessment report has been compiled",
      })
    }
  }

  const completeChallenge = (challengeId: number) => {
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, completed: true } : c
    ))
    
    const nextChallenge = challenges.find(c => c.id === challengeId + 1)
    if (nextChallenge) {
      setCurrentChallenge(nextChallenge)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!mission) return null

  const difficultyColors = {
    Easy: "bg-cyber-green/20 text-cyber-green border-cyber-green/30",
    Medium: "bg-cyber-orange/20 text-cyber-orange border-cyber-orange/30",
    Hard: "bg-cyber-red/20 text-cyber-red border-cyber-red/30"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyber-blue">
            {mission.title}
          </DialogTitle>
          <DialogDescription>
            Complete the interactive challenges to finish this mission
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge className={difficultyColors[mission.difficulty]}>
              {mission.difficulty}
            </Badge>
            <Badge variant="outline" className="text-cyber-purple">
              {mission.teamType}
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mission Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mission.description}</p>
            </CardContent>
          </Card>

          {/* Challenge Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Target className="h-5 w-5 text-cyber-blue" />
                <span>Challenges</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="flex items-center space-x-3">
                  {challenge.completed ? (
                    <CheckCircle className="h-5 w-5 text-cyber-green" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-muted rounded-full" />
                  )}
                  <span className={challenge.completed ? "line-through text-muted-foreground" : ""}>
                    {challenge.title} ({challenge.points} pts)
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Interactive Challenge Area */}
          {isStarted && currentChallenge && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{currentChallenge.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{currentChallenge.description}</p>
                
                {currentChallenge.type === "scan" && (
                  <div className="space-y-4">
                    <Button 
                      onClick={handleScan} 
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
                    onClick={handleAnalyze}
                    disabled={currentChallenge.completed || !challenges.find(c => c.id === 1)?.completed}
                    className="bg-cyber-orange hover:bg-cyber-orange/80"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Analyze Scan Results
                  </Button>
                )}
                
                {currentChallenge.type === "report" && (
                  <Button 
                    onClick={handleReport}
                    disabled={currentChallenge.completed || !challenges.find(c => c.id === 2)?.completed}
                    className="bg-cyber-green hover:bg-cyber-green/80"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Generate Security Report
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Progress Display */}
          {(isStarted || progress > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Mission Progress</span>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                  {Math.round(progress)}% Complete
                </p>
              </CardContent>
            </Card>
          )}

          {/* Control Buttons */}
          <div className="flex space-x-4">
            {!isStarted && progress === 0 && (
              <Button onClick={handleStart} className="bg-cyber-blue hover:bg-cyber-blue/80">
                <Play className="h-4 w-4 mr-2" />
                Start Mission
              </Button>
            )}
            
            {isStarted && (
              <Button onClick={handlePause} variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            
            {(progress > 0 && !isCompleted) && (
              <Button onClick={handleReset} variant="destructive">
                Reset Mission
              </Button>
            )}
            
            {isCompleted && (
              <div className="flex items-center space-x-2 text-cyber-green">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Mission Completed! +{challenges.reduce((sum, c) => sum + c.points, 0)} points</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
