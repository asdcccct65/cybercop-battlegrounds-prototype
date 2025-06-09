
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
  type: "scan" | "analyze" | "report" | "phishing" | "incident" | "penetration"
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

  const getMissionChallenges = (missionTitle: string): Challenge[] => {
    console.log("Creating challenges for mission:", missionTitle)
    
    if (missionTitle.includes("SQL Injection")) {
      console.log("Generating SQL Injection challenges")
      return [
        {
          id: 1,
          title: "SQL Injection Scan",
          description: "Scan the web application for SQL injection vulnerabilities",
          type: "scan",
          completed: false,
          points: 100
        },
        {
          id: 2,
          title: "Exploit Analysis",
          description: "Analyze and exploit the discovered SQL injection vulnerability",
          type: "analyze",
          completed: false,
          points: 150
        },
        {
          id: 3,
          title: "Impact Assessment",
          description: "Document the potential impact and create a security report",
          type: "report",
          completed: false,
          points: 100
        }
      ]
    } else if (missionTitle.includes("Phishing")) {
      return [
        {
          id: 1,
          title: "Email Analysis",
          description: "Identify phishing emails from a set of suspicious messages",
          type: "phishing",
          completed: false,
          points: 75
        },
        {
          id: 2,
          title: "Defense Implementation",
          description: "Document defensive measures to prevent future phishing attacks",
          type: "report",
          completed: false,
          points: 100
        }
      ]
    } else if (missionTitle.includes("Incident Response")) {
      return [
        {
          id: 1,
          title: "Incident Assessment",
          description: "Analyze the security incident and document initial findings",
          type: "incident",
          completed: false,
          points: 100
        },
        {
          id: 2,
          title: "Containment Plan",
          description: "Create a containment strategy for the security breach",
          type: "report",
          completed: false,
          points: 150
        }
      ]
    } else if (missionTitle.includes("Penetration")) {
      return [
        {
          id: 1,
          title: "Network Reconnaissance",
          description: "Gather information about the target network infrastructure",
          type: "penetration",
          completed: false,
          points: 150
        },
        {
          id: 2,
          title: "Vulnerability Assessment",
          description: "Identify and document security vulnerabilities",
          type: "analyze",
          completed: false,
          points: 200
        }
      ]
    } else if (missionTitle.includes("Malware")) {
      return [
        {
          id: 1,
          title: "Malware Scan",
          description: "Scan and identify malware samples in the lab environment",
          type: "scan",
          completed: false,
          points: 125
        },
        {
          id: 2,
          title: "Behavior Analysis",
          description: "Analyze malware behavior and create signatures",
          type: "analyze",
          completed: false,
          points: 175
        }
      ]
    } else {
      // Default challenges for other missions
      console.log("Generating default challenges")
      return [
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
    }
  }

  const handleStart = () => {
    if (!mission) {
      console.error("No mission available")
      return
    }
    
    console.log("Starting mission:", mission.title)
    const missionChallenges = getMissionChallenges(mission.title)
    console.log("Generated challenges:", missionChallenges)
    
    if (missionChallenges.length === 0) {
      console.error("No challenges generated!")
      return
    }
    
    // Set challenges first
    setChallenges(missionChallenges)
    
    // Then set the current challenge
    const firstChallenge = missionChallenges[0]
    setCurrentChallenge(firstChallenge)
    console.log("Set current challenge:", firstChallenge)
    
    const totalMinutes = parseInt(mission.duration.split(' ')[0]) * (mission.duration.includes('hour') ? 60 : 1)
    setTimeLeft(totalMinutes * 60)
    setIsStarted(true)
    setProgress(0)
    setIsCompleted(false)
    setScanResults([])
    setIsScanning(false)
    
    console.log("Mission started successfully with:", {
      challenges: missionChallenges.length,
      currentChallenge: firstChallenge.title,
      isStarted: true
    })
    
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
    completeChallenge(currentChallenge?.id || 0)
    toast({
      title: "Analysis Complete",
      description: "Vulnerabilities identified successfully",
    })
  }

  const handleReport = () => {
    completeChallenge(currentChallenge?.id || 0)
    toast({
      title: "Report Generated",
      description: "Security assessment report has been compiled",
    })
  }

  const handlePhishingAnalysis = () => {
    completeChallenge(1)
    toast({
      title: "Phishing Analysis Complete",
      description: "Successfully identified phishing attempts",
    })
  }

  const handleIncidentResponse = () => {
    completeChallenge(1)
    toast({
      title: "Incident Response Documented",
      description: "Response plan has been recorded",
    })
  }

  const handlePenetrationTest = () => {
    completeChallenge(1)
    toast({
      title: "Penetration Test Started",
      description: "Initial reconnaissance completed",
    })
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

  console.log("Rendering MissionInterface with:", {
    isStarted,
    currentChallenge: currentChallenge?.title || null,
    challengesLength: challenges.length,
    missionTitle: mission.title
  })

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
          
          {challenges.length > 0 && <ChallengeProgress challenges={challenges} />}
          
          {isStarted && currentChallenge && (
            <div className="border border-cyber-blue/30 rounded-lg p-4 bg-cyber-blue/5">
              <h3 className="text-lg font-semibold mb-4 text-cyber-blue">Current Challenge</h3>
              <InteractiveChallenge
                currentChallenge={currentChallenge}
                scanResults={scanResults}
                isScanning={isScanning}
                challenges={challenges}
                onScan={handleScan}
                onAnalyze={handleAnalyze}
                onReport={handleReport}
                onPhishingAnalysis={handlePhishingAnalysis}
                onIncidentResponse={handleIncidentResponse}
                onPenetrationTest={handlePenetrationTest}
              />
            </div>
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
