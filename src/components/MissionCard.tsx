
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"

interface MissionCardProps {
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  teamType: "Red Team" | "Blue Team" | "Both"
  points: number
  participants: number
  onStart: () => void
}

export function MissionCard({ 
  title, 
  description, 
  difficulty, 
  duration, 
  teamType, 
  points, 
  participants, 
  onStart 
}: MissionCardProps) {
  const difficultyColors = {
    Easy: "bg-cyber-green/20 text-cyber-green border-cyber-green/30",
    Medium: "bg-cyber-orange/20 text-cyber-orange border-cyber-orange/30",
    Hard: "bg-cyber-red/20 text-cyber-red border-cyber-red/30"
  }

  const teamColors = {
    "Red Team": "text-cyber-red",
    "Blue Team": "text-cyber-blue",
    "Both": "text-cyber-purple"
  }

  return (
    <Card className="border-border/50 hover:border-cyber-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-blue/10 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold group-hover:text-cyber-blue transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{participants} participants</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-cyber-orange" />
            <span>{points} points</span>
          </div>
          <div className={`font-semibold ${teamColors[teamType]}`}>
            {teamType}
          </div>
        </div>
        <Button 
          onClick={onStart}
          className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-white transition-all duration-300"
        >
          Start Mission
        </Button>
      </CardContent>
    </Card>
  )
}
