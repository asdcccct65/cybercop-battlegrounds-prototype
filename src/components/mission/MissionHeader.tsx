
import React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MissionHeaderProps {
  mission: {
    title: string
    description: string
    difficulty: "Easy" | "Medium" | "Hard"
    teamType: "Red Team" | "Blue Team" | "Both"
  }
}

export function MissionHeader({ mission }: MissionHeaderProps) {
  const difficultyColors = {
    Easy: "bg-cyber-green/20 text-cyber-green border-cyber-green/30",
    Medium: "bg-cyber-orange/20 text-cyber-orange border-cyber-orange/30",
    Hard: "bg-cyber-red/20 text-cyber-red border-cyber-red/30"
  }

  return (
    <>
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
    </>
  )
}
