
import React, { useState, useEffect } from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"
import { cn } from "@/lib/utils"

interface EnhancedAvatarProps {
  character: CharacterCustomization
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animation?: string
  showAnimationControls?: boolean
  onAnimationChange?: (animation: string) => void
}

export function EnhancedAvatar({ 
  character, 
  size = "md", 
  className,
  animation = "idle",
  showAnimationControls = false,
  onAnimationChange
}: EnhancedAvatarProps) {
  const [currentAnimation, setCurrentAnimation] = useState(animation)
  const [isBlinking, setIsBlinking] = useState(false)
  const [expression, setExpression] = useState<'neutral' | 'smile' | 'focused' | 'surprised'>('neutral')

  const sizeClasses = {
    sm: "w-24 h-32",
    md: "w-40 h-52", 
    lg: "w-56 h-72",
    xl: "w-72 h-96"
  }

  const animations = [
    { id: "idle", name: "Idle", emoji: "🧍", description: "Relaxed standing" },
    { id: "wave", name: "Wave", emoji: "👋", description: "Friendly greeting" },
    { id: "heroic", name: "Heroic", emoji: "🦸", description: "Power pose" },
    { id: "thinking", name: "Think", emoji: "🤔", description: "Contemplative" },
    { id: "victory", name: "Victory", emoji: "🎉", description: "Celebration" },
    { id: "stretch", name: "Stretch", emoji: "🤸", description: "Body stretch" }
  ]

  // Auto-blink system
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 2000 + Math.random() * 4000)
    return () => clearInterval(blinkInterval)
  }, [])

  // Random expression changes
  useEffect(() => {
    const expressionInterval = setInterval(() => {
      const expressions: ('neutral' | 'smile' | 'focused' | 'surprised')[] = ['neutral', 'smile', 'focused', 'surprised']
      setExpression(expressions[Math.floor(Math.random() * expressions.length)])
    }, 8000 + Math.random() * 7000)
    return () => clearInterval(expressionInterval)
  }, [])

  const getHairPath = (style: string) => {
    switch (style) {
      case "afro":
        return "M20 15 Q10 5 30 5 Q50 5 40 15 Q45 25 30 25 Q15 25 20 15 Z"
      case "buzz-cut":
        return "M18 18 Q15 12 30 12 Q45 12 42 18 Z"
      case "long":
        return "M15 18 Q10 8 30 8 Q50 8 45 18 L48 35 Q45 38 30 38 Q15 38 12 35 Z"
      case "curly":
        return "M16 16 Q8 6 30 6 Q52 6 44 16 Q48 22 42 28 Q38 24 30 24 Q22 24 18 28 Q12 22 16 16 Z"
      case "spiky":
        return "M20 18 L22 8 L26 18 L30 6 L34 18 L38 8 L40 18 Q42 20 30 20 Q18 20 20 18 Z"
      case "ponytail":
        return "M18 18 Q15 12 30 12 Q45 12 42 18 Q44 20 46 22 L50 30 Q48 32 46 30 L44 22 Q42 20 30 20 Q18 20 18 18 Z"
      case "braided":
        return "M16 18 Q12 10 30 10 Q48 10 44 18 L46 35 Q44 38 42 35 L40 25 L38 35 Q36 38 34 35 L32 25 L30 35 Q28 38 26 35 L24 25 L22 35 Q20 38 18 35 L16 25 Q14 22 16 18 Z"
      case "bob":
        return "M15 18 Q12 10 30 10 Q48 10 45 18 Q46 25 42 28 Q38 30 30 30 Q22 30 18 28 Q14 25 15 18 Z"
      case "mohawk":
        return "M26 18 L28 6 L30 4 L32 6 L34 18 Q32 20 30 20 Q28 20 26 18 Z"
      case "wavy":
        return "M16 18 Q10 8 30 8 Q50 8 44 18 Q48 22 45 26 Q42 24 38 26 Q35 24 30 26 Q25 24 22 26 Q18 24 15 26 Q12 22 16 18 Z"
      case "dreads":
        return "M18 18 Q15 12 30 12 Q45 12 42 18 L20 35 L22 38 L24 35 L26 38 L28 35 L30 38 L32 35 L34 38 L36 35 L38 38 L40 35 Q42 20 30 20 Q18 20 18 18 Z"
      case "bald":
        return ""
      default:
        return "M18 18 Q15 12 30 12 Q45 12 42 18 Q44 20 30 20 Q16 20 18 18 Z"
    }
  }

  const getFacialExpression = () => {
    switch (expression) {
      case 'smile':
        return {
          mouth: "M25 38 Q30 42 35 38",
          eyebrows: { left: "M22 28 L26 26", right: "M34 26 L38 28" },
          cheeks: true
        }
      case 'focused':
        return {
          mouth: "M28 38 L32 38",
          eyebrows: { left: "M22 26 L26 28", right: "M34 28 L38 26" },
          cheeks: false
        }
      case 'surprised':
        return {
          mouth: "M30 38 Q30 40 30 38",
          eyebrows: { left: "M22 24 L26 26", right: "M34 26 L38 24" },
          cheeks: false
        }
      default:
        return {
          mouth: "M28 39 L32 39",
          eyebrows: { left: "M22 27 L26 27", right: "M34 27 L38 27" },
          cheeks: false
        }
    }
  }

  const getAnimationClasses = () => {
    switch (currentAnimation) {
      case "wave":
        return "animate-[avatar-wave_2s_ease-in-out_infinite]"
      case "heroic":
        return "animate-[avatar-heroic_3s_ease-in-out_infinite]"
      case "thinking":
        return "animate-[avatar-thinking_4s_ease-in-out_infinite]"
      case "victory":
        return "animate-[avatar-victory_2s_ease-in-out_infinite]"
      case "stretch":
        return "animate-[avatar-stretch_3s_ease-in-out_infinite]"
      default:
        return "animate-[avatar-idle_6s_ease-in-out_infinite]"
    }
  }

  const renderEquipment = () => {
    const equipment = character.equippedItems
    const elements = []

    // Enhanced equipment rendering with better positioning
    if (equipment.hat) {
      const headgearStyles = {
        "basic-cap": { emoji: "🧢", position: "top-2 left-1/2 -translate-x-1/2" },
        "tactical-helmet": { emoji: "⛑️", position: "top-1 left-1/2 -translate-x-1/2" },
        "cyber-visor": { emoji: "🥽", position: "top-6 left-1/2 -translate-x-1/2" },
        "stealth-mask": { emoji: "🎭", position: "top-6 left-1/2 -translate-x-1/2" },
        "elite-crown": { emoji: "👑", position: "top-0 left-1/2 -translate-x-1/2" },
        "neural-headset": { emoji: "🎧", position: "top-4 left-1/2 -translate-x-1/2" }
      }
      const style = headgearStyles[equipment.hat as keyof typeof headgearStyles]
      if (style) {
        elements.push(
          <div key="headgear" className={`absolute ${style.position} text-2xl z-20`}>
            {style.emoji}
          </div>
        )
      }
    }

    return elements
  }

  const facialData = getFacialExpression()

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Avatar Container */}
      <div className={cn(
        "relative flex items-center justify-center bg-gradient-to-br from-cyber-blue/10 via-background to-cyber-green/10 rounded-3xl border-2 border-cyber-blue/30 shadow-2xl transition-all duration-500 hover:shadow-cyber-blue/20 hover:border-cyber-blue/50 overflow-hidden",
        sizeClasses[size],
        getAnimationClasses()
      )}>
        {/* SVG Character */}
        <svg 
          viewBox="0 0 60 80" 
          className="w-full h-full p-2"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
        >
          {/* Hair */}
          {character.hairStyle !== "bald" && (
            <path
              d={getHairPath(character.hairStyle)}
              fill={character.hairColor}
              stroke={character.hairColor}
              strokeWidth="1"
              className="transition-all duration-300"
            />
          )}
          
          {/* Head */}
          <circle
            cx="30"
            cy="22"
            r="8"
            fill={character.skinColor}
            stroke={character.skinColor}
            strokeWidth="1"
            className="avatar-head"
          />
          
          {/* Neck */}
          <rect
            x="28"
            y="28"
            width="4"
            height="4"
            fill={character.skinColor}
            className="avatar-neck"
          />
          
          {/* Torso */}
          <rect
            x="24"
            y="32"
            width="12"
            height="16"
            rx="2"
            fill="#4A90E2"
            stroke="#3A7BD5"
            strokeWidth="1"
            className="avatar-torso"
          />
          
          {/* Arms */}
          <rect
            x="18"
            y="34"
            width="4"
            height="12"
            rx="2"
            fill={character.skinColor}
            className={cn(
              "avatar-arm-left origin-top",
              currentAnimation === 'wave' && 'animate-[arm-wave_2s_ease-in-out_infinite]',
              currentAnimation === 'heroic' && 'animate-[arm-heroic_3s_ease-in-out_infinite]',
              currentAnimation === 'stretch' && 'animate-[arm-stretch_3s_ease-in-out_infinite]'
            )}
          />
          <rect
            x="38"
            y="34"
            width="4"
            height="12"
            rx="2"
            fill={character.skinColor}
            className={cn(
              "avatar-arm-right origin-top",
              currentAnimation === 'victory' && 'animate-[arm-victory_2s_ease-in-out_infinite]'
            )}
          />
          
          {/* Hands */}
          <circle cx="20" cy="48" r="2" fill={character.skinColor} className="avatar-hand-left" />
          <circle cx="40" cy="48" r="2" fill={character.skinColor} className="avatar-hand-right" />
          
          {/* Legs */}
          <rect
            x="26"
            y="48"
            width="3"
            height="14"
            rx="1"
            fill="#2C3E50"
            className="avatar-leg-left"
          />
          <rect
            x="31"
            y="48"
            width="3"
            height="14"
            rx="1"
            fill="#2C3E50"
            className="avatar-leg-right"
          />
          
          {/* Feet */}
          <ellipse cx="26" cy="64" rx="3" ry="2" fill="#1A1A1A" className="avatar-foot-left" />
          <ellipse cx="33" cy="64" rx="3" ry="2" fill="#1A1A1A" className="avatar-foot-right" />
          
          {/* Facial Features */}
          {/* Eyebrows */}
          <path d={facialData.eyebrows.left} stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" />
          <path d={facialData.eyebrows.right} stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Eyes */}
          <circle 
            cx="26" 
            cy="20" 
            r={isBlinking ? "0.5" : "1.5"} 
            fill={isBlinking ? "#666" : character.eyeColor}
            className="transition-all duration-150"
          />
          <circle 
            cx="34" 
            cy="20" 
            r={isBlinking ? "0.5" : "1.5"} 
            fill={isBlinking ? "#666" : character.eyeColor}
            className="transition-all duration-150"
          />
          
          {/* Eye pupils */}
          {!isBlinking && (
            <>
              <circle cx="26" cy="20" r="0.5" fill="#000" />
              <circle cx="34" cy="20" r="0.5" fill="#000" />
            </>
          )}
          
          {/* Nose */}
          <circle cx="30" cy="22" r="0.5" fill="rgba(0,0,0,0.1)" />
          
          {/* Mouth */}
          <path 
            d={facialData.mouth} 
            stroke="#8B4513" 
            strokeWidth="1.5" 
            fill="none" 
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          
          {/* Cheeks (for smile) */}
          {facialData.cheeks && (
            <>
              <circle cx="22" cy="24" r="1" fill="rgba(255,182,193,0.5)" />
              <circle cx="38" cy="24" r="1" fill="rgba(255,182,193,0.5)" />
            </>
          )}
        </svg>

        {/* Equipment overlays */}
        {renderEquipment()}

        {/* Legendary glow effect */}
        {Object.values(character.equippedItems).some(item => 
          ['elite-crown', 'legendary-blade', 'aegis-protocol', 'guardian-spirit'].includes(item || '')
        ) && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 animate-pulse z-0" />
        )}

        {/* Breathing effect overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-cyber-blue/5 to-transparent animate-[breathe-glow_4s_ease-in-out_infinite] pointer-events-none" />
      </div>

      {/* Animation Controls */}
      {showAnimationControls && (
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
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
