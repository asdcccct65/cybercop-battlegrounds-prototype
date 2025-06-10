
import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, Trophy, AlertTriangle } from "lucide-react"
import { MissionHeader } from "./mission/MissionHeader"
import { MissionProgress } from "./mission/MissionProgress"
import { ChallengeProgress } from "./mission/ChallengeProgress"
import { TerminalSimulation } from "./simulation/TerminalSimulation"
import { WebLoginSimulation } from "./simulation/WebLoginSimulation"
import { CodeInjectionSimulation } from "./simulation/CodeInjectionSimulation"
import { InteractiveChallenge } from "./mission/InteractiveChallenge"
import { labMissions, LabMission, LabStep } from "../data/labMissions"
import { useMissionProgress } from "../hooks/useMissionProgress"
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
    participants: number
  } | null
  isOpen: boolean
  onClose: () => void
}

export function MissionInterface({ mission, isOpen, onClose }: MissionInterfaceProps) {
  const { toast } = useToast()
  const { saveProgress, getMissionProgress } = useMissionProgress()
  const [currentStep, setCurrentStep] = useState(0)
  const [labMission, setLabMission] = useState<LabMission | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [loadingError, setLoadingError] = useState<string | null>(null)

  // Load lab mission data
  useEffect(() => {
    if (mission) {
      const lab = labMissions.find(m => m.id === mission.id)
      if (lab) {
        setLabMission(lab)
        setLoadingError(null)
        
        // Load saved progress
        const progress = getMissionProgress(mission.id)
        if (progress) {
          lab.steps.forEach(step => {
            step.completed = progress.completedChallenges.includes(step.id)
          })
          
          // Find current step
          const nextIncomplete = lab.steps.findIndex(step => !step.completed)
          setCurrentStep(nextIncomplete === -1 ? lab.steps.length - 1 : nextIncomplete)
        } else {
          setCurrentStep(0)
        }
      } else {
        setLoadingError("Lab simulation could not be loaded")
      }
    }
  }, [mission, getMissionProgress])

  // Timer logic
  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isStarted, timeLeft])

  const startMission = () => {
    if (labMission) {
      const durationMinutes = parseInt(labMission.duration.split(' ')[0])
      setTimeLeft(durationMinutes * 60)
      setIsStarted(true)
      toast({
        title: "Mission Started",
        description: `${labMission.title} is now active!`,
      })
    }
  }

  const handleStepComplete = (stepId: number, points: number) => {
    if (labMission && mission) {
      // Save progress
      saveProgress(mission.id, stepId, points)
      
      // Update local state
      setLabMission(prev => {
        if (!prev) return prev
        const updated = { ...prev }
        updated.steps = updated.steps.map(step =>
          step.id === stepId ? { ...step, completed: true } : step
        )
        return updated
      })

      // Move to next step
      const nextStep = currentStep + 1
      if (nextStep < labMission.steps.length) {
        setCurrentStep(nextStep)
      } else {
        // Mission completed
        toast({
          title: "Mission Completed!",
          description: `Congratulations! You earned ${labMission.points} points.`,
        })
      }
    }
  }

  const resetMission = () => {
    if (labMission) {
      setCurrentStep(0)
      setIsStarted(false)
      setTimeLeft(0)
      setLabMission(prev => {
        if (!prev) return prev
        const reset = { ...prev }
        reset.steps = reset.steps.map(step => ({ ...step, completed: false }))
        return reset
      })
    }
  }

  const getProgress = () => {
    if (!labMission) return 0
    const completed = labMission.steps.filter(step => step.completed).length
    return (completed / labMission.steps.length) * 100
  }

  const isCompleted = () => {
    return labMission ? labMission.steps.every(step => step.completed) : false
  }

  const renderCurrentStep = () => {
    if (!labMission || !labMission.steps[currentStep]) return null

    const step = labMission.steps[currentStep]

    switch (step.type) {
      case "terminal":
        return (
          <TerminalSimulation
            title={step.title}
            prompt={step.data.prompt}
            expectedCommands={step.data.expectedCommands}
            successResponse={step.data.successResponse}
            onComplete={() => handleStepComplete(step.id, step.points)}
            completed={step.completed}
          />
        )

      case "web-login":
        return (
          <WebLoginSimulation
            title={step.title}
            vulnerability={step.data.vulnerability}
            expectedPayload={step.data.expectedPayload}
            onComplete={() => handleStepComplete(step.id, step.points)}
            completed={step.completed}
          />
        )

      case "code-injection":
        return (
          <CodeInjectionSimulation
            title={step.title}
            targetCode={step.data.targetCode}
            expectedPayload={step.data.expectedPayload}
            vulnerability={step.data.vulnerability}
            onComplete={() => handleStepComplete(step.id, step.points)}
            completed={step.completed}
          />
        )

      case "multiple-choice":
      case "input":
        return (
          <InteractiveChallenge
            currentChallenge={{
              id: step.id,
              title: step.title,
              description: step.description,
              type: step.type,
              completed: step.completed,
              points: step.points,
              data: step.data
            }}
            scanResults={[]}
            isScanning={false}
            challenges={labMission.steps.map(s => ({
              id: s.id,
              title: s.title,
              description: s.description,
              type: s.type,
              completed: s.completed,
              points: s.points
            }))}
            onScan={() => {}}
            onAnalyze={() => {}}
            onReport={() => {}}
            onPhishingAnalysis={() => {}}
            onIncidentResponse={() => {}}
            onPenetrationTest={() => {}}
            onCompleteChallenge={(id) => handleStepComplete(id, step.points)}
          />
        )

      default:
        return (
          <div className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-cyber-orange" />
            <h3 className="text-lg font-semibold mb-2">Step Type Not Supported</h3>
            <p className="text-muted-foreground">This simulation type is not yet implemented.</p>
          </div>
        )
    }
  }

  if (!isOpen || !mission) return null

  if (loadingError) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-cyber-red" />
              <span>Lab Loading Error</span>
            </DialogTitle>
          </DialogHeader>
          <div className="p-8 text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-cyber-red" />
            <h3 className="text-xl font-semibold mb-2">⚠️ This lab couldn't load</h3>
            <p className="text-muted-foreground mb-4">{loadingError}</p>
            <p className="text-sm text-muted-foreground">Please try again or contact support if the issue persists.</p>
            <Button onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!labMission) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-8 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-cyber-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading lab simulation...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            <MissionHeader mission={labMission} />
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mission Controls */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                {!isStarted && getProgress() === 0 && (
                  <Button onClick={startMission} className="bg-cyber-blue hover:bg-cyber-blue/80">
                    <Target className="h-4 w-4 mr-2" />
                    Start Lab
                  </Button>
                )}
                
                {(getProgress() > 0 && !isCompleted()) && (
                  <Button onClick={resetMission} variant="destructive">
                    Reset Lab
                  </Button>
                )}
                
                {isCompleted() && (
                  <div className="flex items-center space-x-2 text-cyber-green">
                    <Trophy className="h-5 w-5" />
                    <span className="font-semibold">
                      Lab Completed! +{labMission.points} points
                    </span>
                  </div>
                )}
              </div>
              
              {isStarted && timeLeft > 0 && (
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
              )}
            </div>

            {/* Current Step */}
            {(isStarted || getProgress() > 0) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Step {currentStep + 1} of {labMission.steps.length}
                  </h3>
                  <Badge variant="outline">
                    {labMission.steps[currentStep]?.points || 0} points
                  </Badge>
                </div>
                
                {renderCurrentStep()}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            {(isStarted || getProgress() > 0) && (
              <MissionProgress
                progress={getProgress()}
                timeLeft={timeLeft}
                isStarted={isStarted}
              />
            )}

            {/* Challenge List */}
            <ChallengeProgress
              challenges={labMission.steps.map(step => ({
                id: step.id,
                title: step.title,
                description: step.description,
                type: step.type,
                completed: step.completed,
                points: step.points
              }))}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
