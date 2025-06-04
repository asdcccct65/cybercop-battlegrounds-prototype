import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { MissionHeader } from "./mission/MissionHeader"
import { ChallengeProgress } from "./mission/ChallengeProgress"
import { InteractiveChallenge } from "./mission/InteractiveChallenge"
import { MissionProgress } from "./mission/MissionProgress"
import { MissionControls } from "./mission/MissionControls"

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

  if (!mission) return null

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
          <MissionHeader mission={mission} />
          <ChallengeProgress challenges={challenges} />
          
          {isStarted && currentChallenge && (
            <InteractiveChallenge
              currentChallenge={currentChallenge}
              scanResults={scanResults}
              isScanning={isScanning}
              challenges={challenges}
              onScan={handleScan}
              onAnalyze={handleAnalyze}
              onReport={handleReport}
            />
          )}

          <MissionProgress 
            progress={progress}
            timeLeft={timeLeft}
            isStarted={isStarted}
          />

          <MissionControls
            isStarted={isStarted}
            progress={progress}
            isCompleted={isCompleted}
            challenges={challenges}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
