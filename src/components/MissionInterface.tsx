
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
  type: "scan" | "analyze" | "report" | "phishing" | "incident" | "penetration" | "multiple-choice" | "input" | "code"
  completed: boolean
  points: number
  data?: any // For challenge-specific data like options, correct answers, etc.
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
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Initialize challenges when mission changes
  useEffect(() => {
    if (mission && isOpen) {
      console.log("Mission opened, initializing challenges for:", mission.title)
      const missionChallenges = getMissionChallenges(mission.title)
      setChallenges(missionChallenges)
      setCurrentChallenge(missionChallenges[0] || null)
      setProgress(0)
      setIsCompleted(false)
      setIsStarted(false)
      console.log("Challenges initialized:", missionChallenges.length, "challenges")
    }
  }, [mission, isOpen])

  useEffect(() => {
    if (mission && isStarted && timeLeft > 0 && !isCompleted) {
      const interval = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isStarted, timeLeft, isCompleted])

  useEffect(() => {
    if (challenges.length > 0) {
      const completedChallenges = challenges.filter(c => c.completed).length
      const newProgress = (completedChallenges / challenges.length) * 100
      setProgress(newProgress)
      console.log("Progress updated:", newProgress, "% complete")
      
      if (completedChallenges === challenges.length && challenges.length > 0) {
        setIsCompleted(true)
        setIsStarted(false)
        const totalPoints = challenges.reduce((sum, c) => sum + c.points, 0)
        toast({
          title: "Mission Completed!",
          description: `You earned ${totalPoints} points!`,
        })
      }
    }
  }, [challenges, toast])

  const getMissionChallenges = (missionTitle: string): Challenge[] => {
    console.log("Creating challenges for mission:", missionTitle)
    
    if (missionTitle.includes("SQL Injection")) {
      return [
        {
          id: 1,
          title: "Identify Vulnerable Parameter",
          description: "Which parameter is most likely vulnerable to SQL injection?",
          type: "multiple-choice",
          completed: false,
          points: 100,
          data: {
            question: "In the URL 'http://example.com/search.php?id=1&name=test', which parameter should you test first?",
            options: ["id", "name", "both", "neither"],
            correct: 0
          }
        },
        {
          id: 2,
          title: "SQL Injection Payload",
          description: "Enter a basic SQL injection payload to test for vulnerabilities",
          type: "input",
          completed: false,
          points: 150,
          data: {
            placeholder: "Enter SQL injection payload...",
            correctAnswers: ["' OR '1'='1", "1' OR '1'='1", "' OR 1=1--", "1' OR 1=1--"]
          }
        },
        {
          id: 3,
          title: "Exploit the Vulnerability",
          description: "Write a UNION SELECT statement to extract data",
          type: "code",
          completed: false,
          points: 200,
          data: {
            language: "sql",
            placeholder: "-- Write your UNION SELECT statement here\nSELECT...",
            keywords: ["UNION", "SELECT", "FROM"]
          }
        }
      ]
    } else if (missionTitle.includes("Phishing")) {
      return [
        {
          id: 1,
          title: "Email Analysis",
          description: "Identify phishing indicators in this email",
          type: "multiple-choice",
          completed: false,
          points: 75,
          data: {
            question: "What makes this email suspicious: 'From: security@payp4l.com - Your account will be suspended!'",
            options: ["Misspelled domain", "Urgent language", "Suspicious sender", "All of the above"],
            correct: 3
          }
        },
        {
          id: 2,
          title: "Report Phishing",
          description: "Document the phishing indicators you found",
          type: "input",
          completed: false,
          points: 100,
          data: {
            placeholder: "List the phishing indicators...",
            minLength: 20
          }
        }
      ]
    } else if (missionTitle.includes("Incident Response")) {
      return [
        {
          id: 1,
          title: "Incident Classification",
          description: "Classify the severity of this security incident",
          type: "multiple-choice",
          completed: false,
          points: 100,
          data: {
            question: "Multiple failed login attempts from IP 192.168.1.100 detected. What's the severity?",
            options: ["Low", "Medium", "High", "Critical"],
            correct: 1
          }
        },
        {
          id: 2,
          title: "Containment Strategy",
          description: "Outline your containment plan for this incident",
          type: "input",
          completed: false,
          points: 150,
          data: {
            placeholder: "Describe your containment steps...",
            minLength: 50
          }
        }
      ]
    } else if (missionTitle.includes("Penetration")) {
      return [
        {
          id: 1,
          title: "Network Reconnaissance",
          description: "What's the first step in penetration testing?",
          type: "multiple-choice",
          completed: false,
          points: 100,
          data: {
            question: "What should you do first when starting a penetration test?",
            options: ["Start scanning", "Review scope", "Launch exploits", "Write report"],
            correct: 1
          }
        },
        {
          id: 2,
          title: "Port Scanning Command",
          description: "Write an Nmap command to scan the target network",
          type: "code",
          completed: false,
          points: 150,
          data: {
            language: "bash",
            placeholder: "# Enter your nmap command\nnmap...",
            keywords: ["nmap", "-sS", "-sV", "-O"]
          }
        }
      ]
    } else if (missionTitle.includes("Malware")) {
      return [
        {
          id: 1,
          title: "Malware Type Identification",
          description: "Identify the type of malware based on behavior",
          type: "multiple-choice",
          completed: false,
          points: 125,
          data: {
            question: "A program that spreads by copying itself to other files is a:",
            options: ["Virus", "Worm", "Trojan", "Spyware"],
            correct: 0
          }
        },
        {
          id: 2,
          title: "Static Analysis",
          description: "Analyze the malware sample and document findings",
          type: "input",
          completed: false,
          points: 175,
          data: {
            placeholder: "Document your analysis findings...",
            minLength: 30
          }
        }
      ]
    } else {
      // Default comprehensive challenges
      return [
        {
          id: 1,
          title: "Security Assessment",
          description: "What type of security test should be performed first?",
          type: "multiple-choice",
          completed: false,
          points: 50,
          data: {
            question: "When assessing a new system, what should you do first?",
            options: ["Vulnerability scan", "Penetration test", "Risk assessment", "Code review"],
            correct: 2
          }
        },
        {
          id: 2,
          title: "Network Analysis",
          description: "Enter a command to check network connections",
          type: "input",
          completed: false,
          points: 75,
          data: {
            placeholder: "Enter network command...",
            correctAnswers: ["netstat", "ss", "lsof", "netstat -an"]
          }
        },
        {
          id: 3,
          title: "Security Report",
          description: "Write a brief security assessment summary",
          type: "input",
          completed: false,
          points: 100,
          data: {
            placeholder: "Write your security assessment...",
            minLength: 50
          }
        }
      ]
    }
  }

  const handleStart = () => {
    if (!mission) {
      console.error("No mission available")
      toast({
        title: "Error",
        description: "Mission data is not available. Please try again.",
        variant: "destructive"
      })
      return
    }
    
    if (challenges.length === 0) {
      console.error("No challenges available for mission")
      toast({
        title: "Error",
        description: "Mission challenges are not loaded. Please close and reopen the mission.",
        variant: "destructive"
      })
      return
    }
    
    console.log("Starting mission:", mission.title, "with", challenges.length, "challenges")
    
    const totalMinutes = parseInt(mission.duration.split(' ')[0]) * (mission.duration.includes('hour') ? 60 : 1)
    setTimeLeft(totalMinutes * 60)
    setIsStarted(true)
    setProgress(0)
    setIsCompleted(false)
    setScanResults([])
    setIsScanning(false)
    
    // Reset all challenges to not completed
    setChallenges(prev => prev.map(c => ({ ...c, completed: false })))
    setCurrentChallenge(challenges[0])
    
    console.log("Mission started successfully with first challenge:", challenges[0]?.title)
    
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
    setScanResults([])
    setIsScanning(false)
    
    // Reset challenges
    setChallenges(prev => prev.map(c => ({ ...c, completed: false })))
    setCurrentChallenge(challenges[0] || null)
  }

  const completeChallenge = (challengeId: number) => {
    console.log("Completing challenge:", challengeId)
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, completed: true } : c
    ))
    
    const nextChallenge = challenges.find(c => c.id === challengeId + 1)
    if (nextChallenge) {
      setCurrentChallenge(nextChallenge)
      console.log("Moving to next challenge:", nextChallenge.title)
    } else {
      console.log("No more challenges, mission should complete")
    }

    const challenge = challenges.find(c => c.id === challengeId)
    if (challenge) {
      toast({
        title: "Challenge Completed!",
        description: `You earned ${challenge.points} points for "${challenge.title}"`,
      })
    }
  }

  // Legacy handler functions for backward compatibility
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
          completeChallenge(currentChallenge?.id || 1)
        }
      }, (index + 1) * 800)
    })
  }

  const handleAnalyze = () => {
    completeChallenge(currentChallenge?.id || 0)
  }

  const handleReport = () => {
    completeChallenge(currentChallenge?.id || 0)
  }

  const handlePhishingAnalysis = () => {
    completeChallenge(currentChallenge?.id || 0)
  }

  const handleIncidentResponse = () => {
    completeChallenge(currentChallenge?.id || 0)
  }

  const handlePenetrationTest = () => {
    completeChallenge(currentChallenge?.id || 0)
  }

  if (!mission) return null

  console.log("Rendering MissionInterface with:", {
    isStarted,
    currentChallenge: currentChallenge?.title || null,
    challengesLength: challenges.length,
    missionTitle: mission.title,
    progress: isNaN(progress) ? 0 : progress
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
          
          {challenges.length > 0 ? (
            <ChallengeProgress challenges={challenges} />
          ) : (
            <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
              <p className="text-red-400">⚠️ Mission challenges are loading...</p>
            </div>
          )}
          
          {isStarted && currentChallenge ? (
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
                onCompleteChallenge={completeChallenge}
              />
            </div>
          ) : isStarted && !currentChallenge ? (
            <div className="border border-yellow-500/30 rounded-lg p-4 bg-yellow-500/5">
              <p className="text-yellow-400">⚠️ No current challenge available</p>
            </div>
          ) : null}

          <MissionProgress 
            progress={isNaN(progress) ? 0 : progress}
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
