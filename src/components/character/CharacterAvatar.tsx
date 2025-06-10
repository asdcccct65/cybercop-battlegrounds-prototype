
import React from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"
import { cn } from "@/lib/utils"

interface CharacterAvatarProps {
  character: CharacterCustomization
  size?: "sm" | "md" | "lg"
  className?: string
}

export function CharacterAvatar({ character, size = "md", className }: CharacterAvatarProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20", 
    lg: "w-32 h-32"
  }

  return (
    <div className={cn("relative flex items-center justify-center rounded-full border-2 border-cyber-blue/30 bg-gradient-to-br from-cyber-blue/10 to-cyber-green/10", sizeClasses[size], className)}>
      {/* Character representation */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        {/* Face */}
        <div 
          className="absolute inset-2 rounded-full"
          style={{ backgroundColor: character.skinColor }}
        />
        
        {/* Hair */}
        {character.hairStyle !== "bald" && (
          <div 
            className={cn(
              "absolute rounded-full",
              character.hairStyle === "short" && "inset-1 top-1",
              character.hairStyle === "long" && "inset-0 top-0",
              character.hairStyle === "curly" && "inset-1 top-0",
              character.hairStyle === "spiky" && "inset-1 top-0"
            )}
            style={{ backgroundColor: character.hairColor }}
          />
        )}
        
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full" style={{ backgroundColor: character.eyeColor }} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full" style={{ backgroundColor: character.eyeColor }} />
        
        {/* Equipment overlays */}
        {character.equippedItems.hat && (
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs">🎩</div>
        )}
        {character.equippedItems.helmet && (
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs">⛑️</div>
        )}
        {character.equippedItems.accessory && (
          <div className="absolute top-0 right-0 text-xs">🕶️</div>
        )}
      </div>
      
      {/* Equipment indicators */}
      {character.equippedItems.sword && (
        <div className="absolute -right-1 top-1/2 text-xs transform -translate-y-1/2">⚔️</div>
      )}
      {character.equippedItems.shield && (
        <div className="absolute -left-1 top-1/2 text-xs transform -translate-y-1/2">🛡️</div>
      )}
    </div>
  )
}
