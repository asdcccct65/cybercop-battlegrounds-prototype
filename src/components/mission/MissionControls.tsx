
import React from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, CheckCircle } from "lucide-react"

interface Challenge {
  id: number
  points: number
}

interface MissionControlsProps {
  isStarted: boolean
  progress: number
  isCompleted: boolean
  challenges: Challenge[]
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export function MissionControls({
  isStarted,
  progress,
  isCompleted,
  challenges,
  onStart,
  onPause,
  onReset
}: MissionControlsProps) {
  return (
    <div className="flex space-x-4">
      {!isStarted && progress === 0 && (
        <Button onClick={onStart} className="bg-cyber-blue hover:bg-cyber-blue/80">
          <Play className="h-4 w-4 mr-2" />
          Start Mission
        </Button>
      )}
      
      {isStarted && (
        <Button onClick={onPause} variant="outline">
          <Pause className="h-4 w-4 mr-2" />
          Pause
        </Button>
      )}
      
      {(progress > 0 && !isCompleted) && (
        <Button onClick={onReset} variant="destructive">
          Reset Mission
        </Button>
      )}
      
      {isCompleted && (
        <div className="flex items-center space-x-2 text-cyber-green">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">
            Mission Completed! +{challenges.reduce((sum, c) => sum + c.points, 0)} points
          </span>
        </div>
      )}
    </div>
  )
}
