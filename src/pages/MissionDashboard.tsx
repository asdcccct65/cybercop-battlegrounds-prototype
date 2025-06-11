import React from "react"
import { useNavigate } from "react-router-dom"
import { MissionCard } from "@/components/MissionCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, Shield } from "lucide-react"
import { allMissions } from "@/data/labMissions"

const MissionDashboard = () => {
  const navigate = useNavigate()

  // Transform lab missions to mission cards format
  const missionCards = allMissions.map(lab => ({
    id: lab.id,
    title: lab.title,
    description: lab.description,
    difficulty: lab.difficulty,
    duration: lab.duration,
    teamType: lab.teamType,
    points: lab.points,
    participants: lab.participants
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
          Cybersecurity Missions
        </h1>
        <p className="text-xl text-muted-foreground">
          Engage in realistic cybersecurity simulations to sharpen your skills and earn rewards
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missionCards.map(mission => (
          <MissionCard
            key={mission.id}
            title={mission.title}
            description={mission.description}
            difficulty={mission.difficulty}
            duration={mission.duration}
            teamType={mission.teamType}
            points={mission.points}
            participants={mission.participants}
            onStart={() => navigate(`/missions/${mission.id}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default MissionDashboard
