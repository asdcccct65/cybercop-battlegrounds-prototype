
import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, Target, CheckCircle, XCircle, Play, Pause } from "lucide-react"
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

export function MissionInterface({ mission, isOpen, onClose }: MissionInterfaceProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (mission && isStarted && !isCompleted) {
      const totalMinutes = parseInt(mission.duration.split(' ')[0]) * (mission.duration.includes('hour') ? 60 : 1)
      setTimeLeft(totalMinutes * 60) // Convert to seconds
      
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (totalMinutes * 60))
          if (newProgress >= 100) {
            setIsCompleted(true)
            setIsStarted(false)
            toast({
              title: "Mission Completed!",
              description: `You earned ${mission.points} points!`,
            })
            return 100
          }
          return newProgress
        })
        
        setTimeLeft(prev => Math.max(0, prev - 1))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isStarted, mission, isCompleted, toast])

  const handleStart = () => {
    setIsStarted(true)
    setProgress(0)
    setIsCompleted(false)
    toast({
      title: "Mission Started",
      description: "Good luck! Complete the objectives to earn points.",
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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyber-blue">
            {mission.title}
          </DialogTitle>
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

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Target className="h-5 w-5 text-cyber-blue" />
                <span>Objectives</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-cyber-green" />
                ) : (
                  <div className="h-5 w-5 border-2 border-muted rounded-full" />
                )}
                <span>Complete the security assessment</span>
              </div>
              <div className="flex items-center space-x-3">
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-cyber-green" />
                ) : (
                  <div className="h-5 w-5 border-2 border-muted rounded-full" />
                )}
                <span>Document findings and recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-cyber-green" />
                ) : (
                  <div className="h-5 w-5 border-2 border-muted rounded-full" />
                )}
                <span>Submit final report</span>
              </div>
            </CardContent>
          </Card>

          {(isStarted || progress > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Progress</span>
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
                <span className="font-semibold">Mission Completed! +{mission.points} points</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
