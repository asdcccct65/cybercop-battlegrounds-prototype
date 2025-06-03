
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface BadgeCardProps {
  title: string
  description: string
  icon: LucideIcon
  earned: boolean
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  progress?: number
}

export function BadgeCard({ title, description, icon: Icon, earned, rarity, progress }: BadgeCardProps) {
  const rarityColors = {
    Common: "border-gray-400 bg-gray-400/10",
    Rare: "border-cyber-blue bg-cyber-blue/10",
    Epic: "border-cyber-purple bg-cyber-purple/10",
    Legendary: "border-cyber-orange bg-cyber-orange/10"
  }

  const rarityText = {
    Common: "text-gray-400",
    Rare: "text-cyber-blue",
    Epic: "text-cyber-purple",
    Legendary: "text-cyber-orange"
  }

  return (
    <Card className={`${rarityColors[rarity]} transition-all duration-300 ${earned ? 'hover:shadow-lg hover:scale-105' : 'opacity-60'}`}>
      <CardContent className="p-4 text-center space-y-3">
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${earned ? 'bg-current/20' : 'bg-muted/20'}`}>
          <Icon className={`h-8 w-8 ${earned ? rarityText[rarity] : 'text-muted-foreground'}`} />
        </div>
        <div>
          <h3 className={`font-semibold ${earned ? rarityText[rarity] : 'text-muted-foreground'}`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="space-y-2">
          <Badge 
            variant="outline" 
            className={`${rarityColors[rarity]} ${rarityText[rarity]} border-current/30`}
          >
            {rarity}
          </Badge>
          {progress !== undefined && !earned && (
            <div className="space-y-1">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-cyber-blue h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">{progress}% complete</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
