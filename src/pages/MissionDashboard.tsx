
import React, { useState } from "react"
import { MissionCard } from "@/components/MissionCard"
import { MissionInterface } from "@/components/MissionInterface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { labMissions } from "@/data/labMissions"
import { useMissionProgress } from "@/hooks/useMissionProgress"

const MissionDashboard = () => {
  const { toast } = useToast()
  const { getTotalScore, getMissionProgress } = useMissionProgress()
  const [selectedMission, setSelectedMission] = useState<typeof labMissions[0] | null>(null)
  const [isMissionOpen, setIsMissionOpen] = useState(false)

  const handleStartMission = (missionId: number) => {
    const mission = labMissions.find(m => m.id === missionId)
    if (mission) {
      setSelectedMission(mission)
      setIsMissionOpen(true)
      toast({
        title: "Lab Loading",
        description: `Opening ${mission.title}...`,
      })
    }
  }

  const handleCloseMission = () => {
    setIsMissionOpen(false)
    setSelectedMission(null)
  }

  const getCompletedMissions = () => {
    return labMissions.filter(mission => {
      const progress = getMissionProgress(mission.id)
      return progress && progress.completedChallenges.length === mission.steps.length
    }).length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
          Cybersecurity Lab Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Hands-on interactive labs with real cybersecurity simulations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-cyber-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Labs</CardTitle>
            <Activity className="h-4 w-4 text-cyber-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyber-blue">{getCompletedMissions()}</div>
            <p className="text-xs text-muted-foreground">of {labMissions.length} available labs</p>
          </CardContent>
        </Card>

        <Card className="border-cyber-green/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <Clock className="h-4 w-4 text-cyber-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyber-green">1.2h</div>
            <p className="text-xs text-muted-foreground">-15min from last week</p>
          </CardContent>
        </Card>

        <Card className="border-cyber-orange/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-cyber-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyber-orange">{getTotalScore()}</div>
            <p className="text-xs text-muted-foreground">Points earned from labs</p>
          </CardContent>
        </Card>
      </div>

      {/* Mission Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labMissions.map((mission) => {
          const progress = getMissionProgress(mission.id)
          const isCompleted = progress && progress.completedChallenges.length === mission.steps.length
          
          return (
            <div key={mission.id} className="relative">
              <MissionCard
                title={mission.title}
                description={mission.description}
                difficulty={mission.difficulty}
                duration={mission.duration}
                teamType={mission.teamType}
                points={mission.points}
                participants={mission.participants}
                onStart={() => handleStartMission(mission.id)}
              />
              {isCompleted && (
                <Badge className="absolute top-2 right-2 bg-cyber-green text-white">
                  Completed
                </Badge>
              )}
              {progress && progress.completedChallenges.length > 0 && !isCompleted && (
                <Badge className="absolute top-2 right-2 bg-cyber-orange text-white">
                  In Progress
                </Badge>
              )}
            </div>
          )
        })}
      </div>

      {/* Mission Interface Modal */}
      <MissionInterface
        mission={selectedMission}
        isOpen={isMissionOpen}
        onClose={handleCloseMission}
      />
    </div>
  )
}

export default MissionDashboard
