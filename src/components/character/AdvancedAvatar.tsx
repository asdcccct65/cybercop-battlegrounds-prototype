import React, { useState, useEffect } from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"
import { cn } from "@/lib/utils"
import { AvatarBody } from "./AvatarBody"
import { AvatarEquipment } from "./AvatarEquipment"
import { getAnimationClasses } from "./animationUtils"

interface AdvancedAvatarProps {
  character: CharacterCustomization
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animation?: string
  showAnimationControls?: boolean
  onAnimationChange?: (animation: string) => void
}

export function AdvancedAvatar({
  character,
  size = "md",
  className,
  animation = "idle",
  showAnimationControls = false,
  onAnimationChange
}: AdvancedAvatarProps) {
  const [currentAnimation, setCurrentAnimation] = useState(animation)
  const [isBlinking, setIsBlinking] = useState(false)
  const [expression, setExpression] = useState<'neutral' | 'smile' | 'focused' | 'surprised' | 'confident'>('neutral')
  const [breathePhase, setBreathePhase] = useState(0)

  const sizeClasses = {
    sm: "w-32 h-48",
    md: "w-48 h-72", 
    lg: "w-64 h-96",
    xl: "w-80 h-120"
  }

  const animations = [
    { id: "idle", name: "Idle", emoji: "🧍", description: "Standing naturally" },
    { id: "wave", name: "Wave", emoji: "👋", description: "Friendly greeting" },
    { id: "heroic", name: "Heroic", emoji: "🦸", description: "Power stance" },
    { id: "typing", name: "Typing", emoji: "⌨️", description: "Coding motion" },
    { id: "thinking", name: "Think", emoji: "🤔", description: "Deep thought" },
    { id: "salute", name: "Salute", emoji: "🫡", description: "Military salute" },
    { id: "cross-arms", name: "Cross Arms", emoji: "💪", description: "Confident pose" },
    { id: "sit", name: "Sit", emoji: "🪑", description: "Seated position" },
    { id: "stretch", name: "Stretch", emoji: "🤸", description: "Body stretch" }
  ]

  // Enhanced blinking system
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 2000 + Math.random() * 3000)
    return () => clearInterval(blinkInterval)
  }, [])

  // Breathing animation
  useEffect(() => {
    const breatheInterval = setInterval(() => {
      setBreathePhase(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(breatheInterval)
  }, [])

  // Expression changes
  useEffect(() => {
    const expressionInterval = setInterval(() => {
      const expressions: ('neutral' | 'smile' | 'focused' | 'surprised' | 'confident')[] = 
        ['neutral', 'smile', 'focused', 'surprised', 'confident']
      setExpression(expressions[Math.floor(Math.random() * expressions.length)])
    }, 8000 + Math.random() * 7000)
    return () => clearInterval(expressionInterval)
  }, [])

  const breatheScale = 1 + Math.sin(breathePhase * 0.1) * 0.02

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Avatar Container */}
      <div className={cn(
        "relative flex items-center justify-center bg-gradient-to-br from-cyber-blue/10 via-background to-cyber-green/10 rounded-3xl border-2 border-cyber-blue/30 shadow-2xl transition-all duration-500 hover:shadow-cyber-blue/20 hover:border-cyber-blue/50 overflow-hidden",
        sizeClasses[size],
        getAnimationClasses(currentAnimation)
      )}
      style={{ transform: `scale(${breatheScale})` }}
      >
        {/* SVG Character Body and Face */}
        <AvatarBody 
          character={character}
          expression={expression}
          isBlinking={isBlinking}
          breatheScale={breatheScale}
        />

        {/* Equipment overlays */}
        <AvatarEquipment equippedItems={character.equippedItems} />

        {/* Legendary glow effect */}
        {Object.values(character.equippedItems).some(item => 
          ['elite-crown', 'legendary-blade', 'aegis-protocol', 'guardian-spirit'].includes(item || '')
        ) && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 animate-pulse z-0" />
        )}
      </div>

      {/* Animation Controls */}
      {showAnimationControls && (
        <div className="flex flex-wrap gap-2 justify-center max-w-lg">
          {animations.map(anim => (
            <button
              key={anim.id}
              onClick={() => {
                setCurrentAnimation(anim.id)
                onAnimationChange?.(anim.id)
              }}
              className={cn(
                "px-3 py-2 text-sm rounded-lg border-2 transition-all duration-300 hover:scale-105 shadow-md group",
                currentAnimation === anim.id 
                  ? "bg-cyber-blue text-white border-cyber-blue shadow-cyber-blue/30" 
                  : "bg-background border-border hover:border-cyber-blue/50 hover:shadow-lg"
              )}
              title={anim.description}
            >
              <span className="text-lg">{anim.emoji}</span>
              <div className="text-xs mt-1">{anim.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
