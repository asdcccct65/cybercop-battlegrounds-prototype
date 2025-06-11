import React from "react"
import { BadgeCard } from "@/components/BadgeCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Target, 
  Zap, 
  Crown, 
  Star, 
  Award,
  TrendingUp,
  Clock,
  Trophy
} from "lucide-react"
import { useMissionProgress } from "@/hooks/useMissionProgress"
import { allMissions } from "@/data/labMissions"

const badges = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first mission",
    icon: Shield,
    earned: true,
    rarity: "Common" as const
  },
  {
    id: 2,
    title: "SQL Slayer",
    description: "Master SQL injection techniques",
    icon: Target,
    earned: true,
    rarity: "Rare" as const
  },
  {
    id: 3,
    title: "Speed Demon",
    description: "Complete 5 missions in under 30 minutes each",
    icon: Zap,
    earned: false,
    rarity: "Epic" as const,
    progress: 60
  },
  {
    id: 4,
    title: "Cyber Royalty",
    description: "Reach the top 1% of all users",
    icon: Crown,
    earned: false,
    rarity: "Legendary" as const,
    progress: 25
  },
  {
    id: 5,
    title: "Mission Master",
    description: "Complete 50 missions",
    icon: Star,
    earned: false,
    rarity: "Epic" as const,
    progress: 76
  },
  {
    id: 6,
    title: "Team Player",
    description: "Complete missions from both teams",
    icon: Award,
    earned: true,
    rarity: "Rare" as const
  }
]

const ProgressTracker = () => {
  const { progress, getTotalScore } = useMissionProgress()
  const totalMissions = allMissions.length
  const completedMissions = progress.length
  const totalScore = getTotalScore()
  
  const earnedBadges = badges.filter(badge => badge.earned).length
  const totalBadges = badges.length
  const overallProgress = totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
          Progress Tracker
        </h1>
        <p className="text-xl text-muted-foreground">
          Track your achievements and unlock new badges as you master cybersecurity skills
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-cyber-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Trophy className="h-4 w-4 text-cyber-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyber-blue">{earnedBadges}/{totalBadges}</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-cyber-green/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missions Completed</CardTitle>
            <Target className="h-4 w-4 text-cyber-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyber-green">{completedMissions}/{totalMissions}</div>
            <Progress value={overallProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round(overallProgress)}% complete</p>
          </CardContent>
        </Card>

        <Card className="border-cyber-orange/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-cyber-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyber-orange">{totalScore}</div>
            <p className="text-xs text-muted-foreground">Points earned</p>
          </CardContent>
        </Card>

        <Card className="border-cyber-purple/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
            <Clock className="h-4 w-4 text-cyber-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyber-purple">127h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievement */}
      <Card className="mb-8 bg-gradient-to-r from-cyber-blue/10 to-cyber-green/10 border-cyber-blue/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-cyber-orange" />
            Latest Achievement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Team Player</h3>
              <p className="text-muted-foreground">Completed missions from both Red and Blue teams</p>
            </div>
            <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
              Rare
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Badges Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Achievement Badges</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <BadgeCard
              key={badge.id}
              title={badge.title}
              description={badge.description}
              icon={badge.icon}
              earned={badge.earned}
              rarity={badge.rarity}
              progress={badge.progress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressTracker
