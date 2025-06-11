
import React, { useState, useEffect } from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"
import { cn } from "@/lib/utils"

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

  const getHairPath = (style: string) => {
    switch (style) {
      case "afro":
        return "M25 20 Q15 10 40 10 Q65 10 55 20 Q60 30 50 35 Q45 32 40 32 Q35 32 30 35 Q20 30 25 20 Z"
      case "buzz-cut":
        return "M28 25 Q25 18 40 18 Q55 18 52 25 Q54 27 40 27 Q26 27 28 25 Z"
      case "long":
        return "M22 25 Q18 12 40 12 Q62 12 58 25 L62 45 Q58 50 50 48 L48 35 Q44 32 40 32 Q36 32 32 35 L30 48 Q22 50 18 45 Z"
      case "curly":
        return "M24 24 Q12 8 40 8 Q68 8 56 24 Q62 32 54 38 Q48 34 40 34 Q32 34 26 38 Q18 32 24 24 Z"
      case "spiky":
        return "M28 25 L30 10 L34 25 L38 8 L42 25 L46 10 L50 25 Q52 27 40 27 Q28 27 28 25 Z"
      case "ponytail":
        return "M26 25 Q22 18 40 18 Q58 18 54 25 Q56 27 58 30 L65 45 Q62 48 58 45 L56 30 Q54 27 40 27 Q26 27 26 25 Z"
      case "braided":
        return "M24 25 Q20 15 40 15 Q60 15 56 25 L58 50 Q56 55 54 50 L52 35 L50 50 Q48 55 46 50 L44 35 L42 50 Q40 55 38 50 L36 35 L34 50 Q32 55 30 50 L28 35 L26 50 Q24 55 22 50 Z"
      case "bob":
        return "M22 25 Q18 15 40 15 Q62 15 58 25 Q60 35 54 40 Q48 42 40 42 Q32 42 26 40 Q20 35 22 25 Z"
      case "mohawk":
        return "M35 25 L37 8 L40 6 L43 8 L45 25 Q43 27 40 27 Q37 27 35 25 Z"
      case "wavy":
        return "M24 25 Q16 12 40 12 Q64 12 56 25 Q62 32 58 38 Q54 35 48 38 Q44 35 40 38 Q36 35 32 38 Q28 35 24 38 Q20 32 24 25 Z"
      case "dreads":
        return "M26 25 Q22 18 40 18 Q58 18 54 25 L30 50 L32 55 L34 50 L36 55 L38 50 L40 55 L42 50 L44 55 L46 50 L48 55 L50 50 Q56 27 40 27 Q26 27 26 25 Z"
      case "bald":
        return ""
      default:
        return "M26 25 Q22 18 40 18 Q58 18 54 25 Q56 27 40 27 Q24 27 26 25 Z"
    }
  }

  const getFacialExpression = () => {
    switch (expression) {
      case 'smile':
        return {
          mouth: "M32 52 Q40 58 48 52",
          eyebrows: { left: "M30 38 L36 36", right: "M44 36 L50 38" },
          cheeks: true
        }
      case 'focused':
        return {
          mouth: "M37 52 L43 52",
          eyebrows: { left: "M30 36 L36 38", right: "M44 38 L50 36" },
          cheeks: false
        }
      case 'surprised':
        return {
          mouth: "M40 52 Q40 56 40 52",
          eyebrows: { left: "M30 34 L36 36", right: "M44 36 L50 34" },
          cheeks: false
        }
      case 'confident':
        return {
          mouth: "M35 52 Q40 55 45 52",
          eyebrows: { left: "M30 37 L36 36", right: "M44 36 L50 37" },
          cheeks: false
        }
      default:
        return {
          mouth: "M37 53 L43 53",
          eyebrows: { left: "M30 37 L36 37", right: "M44 37 L50 37" },
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
      case "typing":
        return "animate-[avatar-typing_1s_ease-in-out_infinite]"
      case "thinking":
        return "animate-[avatar-thinking_4s_ease-in-out_infinite]"
      case "salute":
        return "animate-[avatar-salute_2s_ease-in-out_infinite]"
      case "cross-arms":
        return "animate-[avatar-cross-arms_3s_ease-in-out_infinite]"
      case "sit":
        return "animate-[avatar-sit_1s_ease-out_forwards]"
      case "stretch":
        return "animate-[avatar-stretch_3s_ease-in-out_infinite]"
      default:
        return "animate-[avatar-idle_6s_ease-in-out_infinite]"
    }
  }

  const renderEquipment = () => {
    const equipment = character.equippedItems
    const elements = []

    if (equipment.hat) {
      const headgearStyles = {
        "basic-cap": { emoji: "🧢", position: "top-4 left-1/2 -translate-x-1/2" },
        "tactical-helmet": { emoji: "⛑️", position: "top-2 left-1/2 -translate-x-1/2" },
        "cyber-visor": { emoji: "🥽", position: "top-8 left-1/2 -translate-x-1/2" },
        "stealth-mask": { emoji: "🎭", position: "top-8 left-1/2 -translate-x-1/2" },
        "elite-crown": { emoji: "👑", position: "top-1 left-1/2 -translate-x-1/2" },
        "neural-headset": { emoji: "🎧", position: "top-6 left-1/2 -translate-x-1/2" }
      }
      const style = headgearStyles[equipment.hat as keyof typeof headgearStyles]
      if (style) {
        elements.push(
          <div key="headgear" className={`absolute ${style.position} text-3xl z-20`}>
            {style.emoji}
          </div>
        )
      }
    }

    if (equipment.sword) {
      const weaponStyles = {
        "cyber-sword": { emoji: "⚔️", position: "top-20 -right-2" },
        "data-axe": { emoji: "🪓", position: "top-20 -right-2" },
        "hack-staff": { emoji: "🔮", position: "top-18 -right-1" },
        "stealth-dagger": { emoji: "🗡️", position: "top-22 -right-1" },
        "plasma-rifle": { emoji: "🔫", position: "top-20 -right-2" },
        "legendary-blade": { emoji: "⚔️", position: "top-20 -right-2" }
      }
      const style = weaponStyles[equipment.sword as keyof typeof weaponStyles]
      if (style) {
        elements.push(
          <div key="weapon" className={`absolute ${style.position} text-2xl z-10`}>
            {style.emoji}
          </div>
        )
      }
    }

    return elements
  }

  const facialData = getFacialExpression()
  const breatheScale = 1 + Math.sin(breathePhase * 0.1) * 0.02

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Avatar Container */}
      <div className={cn(
        "relative flex items-center justify-center bg-gradient-to-br from-cyber-blue/10 via-background to-cyber-green/10 rounded-3xl border-2 border-cyber-blue/30 shadow-2xl transition-all duration-500 hover:shadow-cyber-blue/20 hover:border-cyber-blue/50 overflow-hidden",
        sizeClasses[size],
        getAnimationClasses()
      )}
      style={{ transform: `scale(${breatheScale})` }}>
        
        {/* SVG Character */}
        <svg 
          viewBox="0 0 80 120" 
          className="w-full h-full p-2"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
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
          <ellipse
            cx="40"
            cy="30"
            rx="12"
            ry="14"
            fill={character.skinColor}
            stroke={character.skinColor}
            strokeWidth="1"
            className="avatar-head"
          />
          
          {/* Neck */}
          <rect
            x="36"
            y="42"
            width="8"
            height="6"
            rx="2"
            fill={character.skinColor}
            className="avatar-neck"
          />
          
          {/* Torso */}
          <ellipse
            cx="40"
            cy="62"
            rx="16"
            ry="18"
            fill="#4A90E2"
            stroke="#3A7BD5"
            strokeWidth="2"
            className="avatar-torso"
          />
          
          {/* Arms */}
          <ellipse
            cx="22"
            cy="58"
            rx="4"
            ry="16"
            fill={character.skinColor}
            className={cn(
              "avatar-arm-left origin-center transition-transform duration-300",
              currentAnimation === 'wave' && 'animate-[arm-wave_2s_ease-in-out_infinite]',
              currentAnimation === 'typing' && 'animate-[arm-typing_1s_ease-in-out_infinite]',
              currentAnimation === 'salute' && 'animate-[arm-salute_2s_ease-in-out_infinite]'
            )}
          />
          <ellipse
            cx="58"
            cy="58"
            rx="4"
            ry="16"
            fill={character.skinColor}
            className={cn(
              "avatar-arm-right origin-center transition-transform duration-300",
              currentAnimation === 'cross-arms' && 'animate-[arm-cross_3s_ease-in-out_infinite]',
              currentAnimation === 'stretch' && 'animate-[arm-stretch_3s_ease-in-out_infinite]'
            )}
          />
          
          {/* Hands */}
          <circle cx="22" cy="74" r="3" fill={character.skinColor} className="avatar-hand-left" />
          <circle cx="58" cy="74" r="3" fill={character.skinColor} className="avatar-hand-right" />
          
          {/* Torso Details */}
          <rect x="32" y="54" width="16" height="20" rx="3" fill="#2C5282" opacity="0.8" />
          <circle cx="36" cy="60" r="1" fill="#1A365D" />
          <circle cx="44" cy="60" r="1" fill="#1A365D" />
          
          {/* Legs */}
          <ellipse
            cx="32"
            cy="88"
            rx="5"
            ry="18"
            fill="#2C3E50"
            className={cn(
              "avatar-leg-left",
              currentAnimation === 'sit' && 'animate-[leg-sit_1s_ease-out_forwards]'
            )}
          />
          <ellipse
            cx="48"
            cy="88"
            rx="5"
            ry="18"
            fill="#2C3E50"
            className={cn(
              "avatar-leg-right", 
              currentAnimation === 'sit' && 'animate-[leg-sit_1s_ease-out_forwards]'
            )}
          />
          
          {/* Feet */}
          <ellipse cx="30" cy="108" rx="6" ry="3" fill="#1A1A1A" className="avatar-foot-left" />
          <ellipse cx="50" cy="108" rx="6" ry="3" fill="#1A1A1A" className="avatar-foot-right" />
          
          {/* Facial Features */}
          {/* Eyebrows */}
          <path d={facialData.eyebrows.left} stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" />
          <path d={facialData.eyebrows.right} stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" />
          
          {/* Eyes */}
          <ellipse 
            cx="34" 
            cy="28" 
            rx="2.5"
            ry={isBlinking ? "0.5" : "2"} 
            fill={isBlinking ? "#666" : character.eyeColor}
            className="transition-all duration-150"
          />
          <ellipse 
            cx="46" 
            cy="28" 
            rx="2.5"
            ry={isBlinking ? "0.5" : "2"} 
            fill={isBlinking ? "#666" : character.eyeColor}
            className="transition-all duration-150"
          />
          
          {/* Eye pupils */}
          {!isBlinking && (
            <>
              <circle cx="34" cy="28" r="0.8" fill="#000" />
              <circle cx="46" cy="28" r="0.8" fill="#000" />
              <circle cx="34.5" cy="27.5" r="0.3" fill="#fff" opacity="0.8" />
              <circle cx="46.5" cy="27.5" r="0.3" fill="#fff" opacity="0.8" />
            </>
          )}
          
          {/* Nose */}
          <path d="M40 30 Q39 33 40 34 Q41 33 40 30" fill="rgba(0,0,0,0.1)" />
          
          {/* Mouth */}
          <path 
            d={facialData.mouth} 
            stroke="#8B4513" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          
          {/* Cheeks (for smile) */}
          {facialData.cheeks && (
            <>
              <circle cx="26" cy="32" r="2" fill="rgba(255,182,193,0.6)" />
              <circle cx="54" cy="32" r="2" fill="rgba(255,182,193,0.6)" />
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
