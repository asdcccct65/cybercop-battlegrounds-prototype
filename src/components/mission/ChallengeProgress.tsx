
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, CheckCircle } from "lucide-react"

interface Challenge {
  id: number
  title: string
  completed: boolean
  points: number
}

interface ChallengeProgressProps {
  challenges: Challenge[]
}

export function ChallengeProgress({ challenges }: ChallengeProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Target className="h-5 w-5 text-cyber-blue" />
          <span>Challenges</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="flex items-center space-x-3">
            {challenge.completed ? (
              <CheckCircle className="h-5 w-5 text-cyber-green" />
            ) : (
              <div className="h-5 w-5 border-2 border-muted rounded-full" />
            )}
            <span className={challenge.completed ? "line-through text-muted-foreground" : ""}>
              {challenge.title} ({challenge.points} pts)
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
