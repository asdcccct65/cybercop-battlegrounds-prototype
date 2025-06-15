
import React, { useState, useEffect } from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"
import { cn } from "@/lib/utils"
import { AvatarBody } from "./AvatarBody"
import { AvatarEquipment } from "./AvatarEquipment"
import { getAnimationClasses, getBodyPartAnimation } from "./animationUtils"

interface AdvancedAvatarProps {
  character: CharacterCustomization
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animation?: string
  showAnimationControls?: boolean
  onAnimationChange?: (animation: string) => void
  showFullBody?: boolean
}

export function AdvancedAvatar({
  character,
  size = "md",
  className,
  animation = "idle",
  showAnimationControls = false,
  onAnimationChange,
  showFullBody = true
}: AdvancedAvatarProps) {
  const [currentAnimation, setCurrentAnimation] = useState(animation)
  const [isBlinking, setIsBlinking] = useState(false)
  const [expression, setExpression] = useState<'neutral' | 'smile' | 'focused' | 'surprised' | 'confident'>('neutral')
  const [breathePhase, setBreathePhase] = useState(0)

  const sizeClasses = {
    sm: showFullBody ? "w-24 h-36" : "w-20 h-20",
    md: showFullBody ? "w-40 h-60" : "w-32 h-32", 
    lg: showFullBody ? "w-56 h-84" : "w-48 h-48",
    xl: showFullBody ? "w-72 h-108" : "w-64 h-64"
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
    { id: "stretch", name: "Stretch", emoji: "🤸", description: "Body stretch" },
    { id: "walk", name: "Walk", emoji: "🚶", description: "Walking in place" },
    { id: "dance", name: "Dance", emoji: "💃", description: "Celebratory dance" },
    { id: "look-around", name: "Look Around", emoji: "👀", description: "Scanning environment" }
  ]

  // Enhanced blinking system with natural timing
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 120)
    }, 1500 + Math.random() * 4000)
    return () => clearInterval(blinkInterval)
  }, [])

  // Subtle breathing animation
  useEffect(() => {
    const breatheInterval = setInterval(() => {
      setBreathePhase(prev => (prev + 1) % 200)
    }, 40)
    return () => clearInterval(breatheInterval)
  }, [])

  // Dynamic expression changes
  useEffect(() => {
    const expressionInterval = setInterval(() => {
      const expressions: ('neutral' | 'smile' | 'focused' | 'surprised' | 'confident')[] = 
        ['neutral', 'smile', 'focused', 'confident']
      const newExpression = expressions[Math.floor(Math.random() * expressions.length)]
      setExpression(newExpression)
      
      // Reset to neutral after some time
      setTimeout(() => setExpression('neutral'), 2000 + Math.random() * 3000)
    }, 10000 + Math.random() * 10000)
    return () => clearInterval(expressionInterval)
  }, [])

  const breatheScale = 1 + Math.sin(breathePhase * 0.02) * 0.015

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Enhanced Avatar Container */}
      <div className={cn(
        "relative flex items-center justify-center rounded-3xl border-2 shadow-2xl transition-all duration-500 overflow-hidden group",
        "bg-gradient-to-br from-cyber-blue/5 via-background to-cyber-green/5",
        "border-cyber-blue/20 hover:border-cyber-blue/40",
        "hover:shadow-cyber-blue/15 hover:scale-105",
        sizeClasses[size],
        getAnimationClasses(currentAnimation)
      )}
      style={{ 
        transform: `scale(${breatheScale})`,
        background: `radial-gradient(ellipse at center, rgba(59, 130, 246, 0.03) 0%, rgba(34, 197, 94, 0.02) 50%, transparent 100%)`
      }}
      >
        {/* Character Aura for Legendary Items */}
        {Object.values(character.equippedItems).some(item => 
          ['elite-crown', 'legendary-blade', 'aegis-protocol', 'guardian-spirit'].includes(item || '')
        ) && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/15 via-yellow-400/15 to-orange-400/15 animate-pulse opacity-60" />
        )}

        {/* Enhanced SVG Character */}
        <div className="relative w-full h-full">
          <AvatarBody 
            character={character}
            expression={expression}
            isBlinking={isBlinking}
            breatheScale={breatheScale}
          />
        </div>

        {/* Equipment overlays with enhanced positioning */}
        <AvatarEquipment equippedItems={character.equippedItems} />

        {/* Ambient glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none" />
      </div>

      {/* Enhanced Animation Controls */}
      {showAnimationControls && (
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
          {animations.map(anim => (
            <button
              key={anim.id}
              onClick={() => {
                setCurrentAnimation(anim.id)
                onAnimationChange?.(anim.id)
              }}
              className={cn(
                "px-3 py-2 text-sm rounded-lg border-2 transition-all duration-300 hover:scale-105 shadow-md group backdrop-blur-sm",
                currentAnimation === anim.id 
                  ? "bg-cyber-blue/20 text-cyber-blue border-cyber-blue shadow-cyber-blue/20 ring-2 ring-cyber-blue/30" 
                  : "bg-background/80 border-border hover:border-cyber-blue/50 hover:shadow-lg hover:bg-cyber-blue/5"
              )}
              title={anim.description}
            >
              <span className="text-lg block">{anim.emoji}</span>
              <div className="text-xs mt-1 font-medium">{anim.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
