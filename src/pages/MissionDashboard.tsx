
import React from "react"
import { MissionCard } from "@/components/MissionCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const missions = [
  {
    id: 1,
    title: "SQL Injection Attack",
    description: "Practice identifying and exploiting SQL injection vulnerabilities in a web application.",
    difficulty: "Medium" as const,
    duration: "45 min",
    teamType: "Red Team" as const,
    points: 150,
    participants: 234
  },
  {
    id: 2,
    title: "Incident Response Simulation",
    description: "Respond to a simulated security breach and contain the threat using proper procedures.",
    difficulty: "Hard" as const,
    duration: "2 hours",
    teamType: "Blue Team" as const,
    points: 300,
    participants: 187
  },
  {
    id: 3,
    title: "Phishing Campaign Analysis",
    description: "Analyze a phishing campaign and implement defensive measures to protect users.",
    difficulty: "Easy" as const,
    duration: "30 min",
    teamType: "Both" as const,
    points: 100,
    participants: 456
  },
  {
    id: 4,
    title: "Network Penetration Test",
    description: "Conduct a comprehensive penetration test on a corporate network infrastructure.",
    difficulty: "Hard" as const,
    duration: "3 hours",
    teamType: "Red Team" as const,
    points: 500,
    participants: 89
  },
  {
    id: 5,
    title: "Malware Analysis Lab",
    description: "Safely analyze malware samples to understand their behavior and create signatures.",
    difficulty: "Medium" as const,
    duration: "1.5 hours",
    teamType: "Blue Team" as const,
    points: 250,
    participants: 156
  },
  {
    id: 6,
    title: "Social Engineering Defense",
    description: "Learn to identify and defend against various social engineering attack vectors.",
    difficulty: "Easy" as const,
    duration: "25 min",
    teamType: "Both" as const,
    points: 75,
    participants: 389
  }
]

const MissionDashboard = () => {
  const { toast } = useToast()

  const handleStartMission = (missionTitle: string) => {
    toast({
      title: "Mission Starting",
      description: `Preparing ${missionTitle}. Please wait...`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
          Mission Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose from our extensive library of cybersecurity training missions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-cyber-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
            <Activity className="h-4 w-4 text-cyber-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyber-blue">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
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
            <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
            <Trophy className="h-4 w-4 text-cyber-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyber-orange">2,847</div>
            <p className="text-xs text-muted-foreground">+425 from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Mission Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            title={mission.title}
            description={mission.description}
            difficulty={mission.difficulty}
            duration={mission.duration}
            teamType={mission.teamType}
            points={mission.points}
            participants={mission.participants}
            onStart={() => handleStartMission(mission.title)}
          />
        ))}
      </div>
    </div>
  )
}

export default MissionDashboard
