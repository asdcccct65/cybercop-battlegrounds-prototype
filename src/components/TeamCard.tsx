
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TeamCardProps {
  title: string
  description: string
  color: "red" | "blue"
  skills: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  onSelect: () => void
}

export function TeamCard({ title, description, color, skills, difficulty, onSelect }: TeamCardProps) {
  const colorClasses = {
    red: "border-cyber-red/50 hover:border-cyber-red bg-gradient-to-br from-cyber-red/5 to-cyber-red/10",
    blue: "border-cyber-blue/50 hover:border-cyber-blue bg-gradient-to-br from-cyber-blue/5 to-cyber-blue/10"
  }

  const buttonClasses = {
    red: "bg-cyber-red hover:bg-cyber-red/80 text-white",
    blue: "bg-cyber-blue hover:bg-cyber-blue/80 text-white"
  }

  const difficultyColors = {
    Beginner: "bg-cyber-green/20 text-cyber-green border-cyber-green/30",
    Intermediate: "bg-cyber-orange/20 text-cyber-orange border-cyber-orange/30",
    Advanced: "bg-cyber-red/20 text-cyber-red border-cyber-red/30"
  }

  return (
    <Card className={`${colorClasses[color]} transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
        </div>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 text-sm">Key Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <Button 
          onClick={onSelect}
          className={`w-full ${buttonClasses[color]} transition-all duration-300`}
        >
          Join {title}
        </Button>
      </CardContent>
    </Card>
  )
}
