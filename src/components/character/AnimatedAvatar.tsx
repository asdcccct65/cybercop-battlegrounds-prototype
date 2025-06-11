
import React, { useState, useEffect } from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"
import { cn } from "@/lib/utils"

interface AnimatedAvatarProps {
  character: CharacterCustomization
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animation?: string
  showAnimationControls?: boolean
  onAnimationChange?: (animation: string) => void
}

export function AnimatedAvatar({ 
  character, 
  size = "md", 
  className,
  animation = "idle",
  showAnimationControls = false,
  onAnimationChange
}: AnimatedAvatarProps) {
  const [currentAnimation, setCurrentAnimation] = useState(animation)
  const [isBlinking, setIsBlinking] = useState(false)
  const [expression, setExpression] = useState<'neutral' | 'smile' | 'focused'>('neutral')

  const sizeClasses = {
    sm: "w-20 h-24",
    md: "w-32 h-40", 
    lg: "w-48 h-60",
    xl: "w-64 h-80"
  }

  const animations = [
    { id: "idle", name: "Idle", emoji: "🧍" },
    { id: "wave", name: "Wave", emoji: "👋" },
    { id: "heroic", name: "Heroic", emoji: "🦸" },
    { id: "sit", name: "Sit", emoji: "🪑" },
    { id: "breathe", name: "Breathe", emoji: "💨" },
    { id: "dance", name: "Dance", emoji: "💃" }
  ]

  // Automatic blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 2000 + Math.random() * 3000)

    return () => clearInterval(blinkInterval)
  }, [])

  // Random expression changes
  useEffect(() => {
    const expressionInterval = setInterval(() => {
      const expressions: ('neutral' | 'smile' | 'focused')[] = ['neutral', 'smile', 'focused']
      setExpression(expressions[Math.floor(Math.random() * expressions.length)])
    }, 8000 + Math.random() * 5000)

    return () => clearInterval(expressionInterval)
  }, [])

  const getHairStyle = (style: string) => {
    const baseClasses = "absolute transition-all duration-300"
    switch (style) {
      case "afro":
        return `${baseClasses} -top-4 -left-4 -right-4 h-12 rounded-full border-4 border-opacity-20`
      case "buzz-cut":
        return `${baseClasses} top-0 left-2 right-2 h-3 rounded-t-full`
      case "long":
        return `${baseClasses} -top-2 -left-2 -right-2 h-16 rounded-t-full`
      case "curly":
        return `${baseClasses} -top-3 -left-3 -right-3 h-10 rounded-full border-2 border-dotted border-opacity-40`
      case "spiky":
        return `${baseClasses} -top-4 left-1 right-1 h-8 clip-path-polygon`
      case "wavy":
        return `${baseClasses} -top-2 -left-2 -right-2 h-12 rounded-t-full border-b-2 border-wavy`
      case "braided":
        return `${baseClasses} -top-2 left-0 right-0 h-18 rounded-t-full border-l-2 border-r-2`
      case "ponytail":
        return `${baseClasses} -top-2 left-2 right-2 h-10 rounded-t-full after:absolute after:right-0 after:top-4 after:w-2 after:h-8 after:rounded-full after:bg-inherit`
      case "bob":
        return `${baseClasses} top-0 left-0 right-0 h-10 rounded-t-full`
      case "mohawk":
        return `${baseClasses} -top-4 left-6 right-6 h-10 transform rotate-0`
      case "bald":
        return "hidden"
      default:
        return `${baseClasses} top-0 left-1 right-1 h-6 rounded-t-full`
    }
  }

  const getAnimationClasses = () => {
    switch (currentAnimation) {
      case "wave":
        return "animate-[avatar-wave_2s_ease-in-out_infinite]"
      case "heroic":
        return "animate-[avatar-heroic_3s_ease-in-out_infinite]"
      case "sit":
        return "animate-[avatar-sit_1s_ease-out_forwards]"
      case "breathe":
        return "animate-[avatar-breathe_4s_ease-in-out_infinite]"
      case "dance":
        return "animate-[avatar-dance_2s_ease-in-out_infinite]"
      default:
        return "animate-[avatar-idle_6s_ease-in-out_infinite]"
    }
  }

  const getFacialExpression = () => {
    switch (expression) {
      case 'smile':
        return {
          mouth: "w-4 h-2 border-2 border-t-0 border-black/40 rounded-b-full",
          eyebrows: "rotate-3"
        }
      case 'focused':
        return {
          mouth: "w-2 h-1 bg-black/30 rounded-full",
          eyebrows: "-rotate-6"
        }
      default:
        return {
          mouth: "w-3 h-1 bg-black/20 rounded-full",
          eyebrows: "rotate-0"
        }
    }
  }

  const renderEquipment = () => {
    const equipment = character.equippedItems
    const elements = []

    // Headgear
    if (equipment.hat) {
      const headgearEmojis = {
        "basic-cap": "🧢",
        "tactical-helmet": "⛑️",
        "cyber-visor": "🥽",
        "stealth-mask": "🎭",
        "elite-crown": "👑",
        "neural-headset": "🎧"
      }
      const emoji = headgearEmojis[equipment.hat as keyof typeof headgearEmojis] || "🎩"
      elements.push(
        <div key="headgear" className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-2xl z-10">
          {emoji}
        </div>
      )
    }

    // Weapons
    if (equipment.sword) {
      const weaponEmojis = {
        "cyber-sword": "⚔️",
        "data-axe": "🪓",
        "hack-staff": "🔮",
        "stealth-dagger": "🗡️",
        "plasma-rifle": "🔫",
        "legendary-blade": "🗡️"
      }
      const emoji = weaponEmojis[equipment.sword as keyof typeof weaponEmojis] || "⚔️"
      elements.push(
        <div key="weapon" className="absolute -right-4 top-12 text-xl z-10">
          {emoji}
        </div>
      )
    }

    return elements
  }

  const expressionData = getFacialExpression()

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Avatar Container */}
      <div className={cn(
        "relative flex items-center justify-center bg-gradient-to-br from-cyber-blue/10 via-background to-cyber-green/10 rounded-2xl border-2 border-cyber-blue/30 shadow-2xl transition-all duration-500 hover:shadow-cyber-blue/20 hover:border-cyber-blue/50",
        sizeClasses[size],
        getAnimationClasses()
      )}>
        {/* Character Body */}
        <div className="relative w-full h-full p-2">
          {/* Head */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-2 shadow-lg avatar-head" 
               style={{ backgroundColor: character.skinColor, borderColor: `${character.skinColor}dd` }}>
            
            {/* Hair */}
            {character.hairStyle !== "bald" && (
              <div 
                className={getHairStyle(character.hairStyle)}
                style={{ backgroundColor: character.hairColor }}
              />
            )}
            
            {/* Eyebrows */}
            <div className={cn("absolute top-3 left-2 w-2 h-0.5 bg-gray-800 rounded-full transition-transform duration-300", expressionData.eyebrows)}></div>
            <div className={cn("absolute top-3 right-2 w-2 h-0.5 bg-gray-800 rounded-full transition-transform duration-300", expressionData.eyebrows)}></div>
            
            {/* Eyes */}
            <div className={cn(
              "absolute top-4 left-2.5 w-1.5 h-1.5 rounded-full transition-all duration-150 shadow-sm",
              isBlinking ? "h-0.5 bg-gray-600" : "h-1.5"
            )} style={{ backgroundColor: isBlinking ? '#666' : character.eyeColor }} />
            <div className={cn(
              "absolute top-4 right-2.5 w-1.5 h-1.5 rounded-full transition-all duration-150 shadow-sm",
              isBlinking ? "h-0.5 bg-gray-600" : "h-1.5"
            )} style={{ backgroundColor: isBlinking ? '#666' : character.eyeColor }} />
            
            {/* Eye pupils */}
            {!isBlinking && (
              <>
                <div className="absolute top-4.5 left-3 w-0.5 h-0.5 bg-black rounded-full"></div>
                <div className="absolute top-4.5 right-3 w-0.5 h-0.5 bg-black rounded-full"></div>
              </>
            )}
            
            {/* Nose */}
            <div className="absolute top-5.5 left-1/2 transform -translate-x-1/2 w-1 h-1.5 bg-black/10 rounded-full shadow-sm"></div>
            
            {/* Mouth */}
            <div className={cn("absolute top-7 left-1/2 transform -translate-x-1/2 transition-all duration-300", expressionData.mouth)}></div>
          </div>

          {/* Neck */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-3 rounded-full avatar-neck" 
               style={{ backgroundColor: character.skinColor }}></div>

          {/* Torso */}
          <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-10 h-12 rounded-lg avatar-torso border shadow-lg" 
               style={{ backgroundColor: character.skinColor, borderColor: `${character.skinColor}dd` }}>
            {/* Shirt */}
            <div className="absolute inset-1 bg-gradient-to-b from-cyber-blue/40 to-cyber-blue/60 rounded-md shadow-inner"></div>
          </div>

          {/* Arms */}
          <div className={cn("absolute top-20 left-1 w-3 h-8 rounded-full avatar-arm-left shadow-md", 
                            currentAnimation === 'wave' ? 'animate-[arm-wave_2s_ease-in-out_infinite]' : 'animate-[arm-idle_6s_ease-in-out_infinite]')} 
               style={{ backgroundColor: character.skinColor }}></div>
          <div className={cn("absolute top-20 right-1 w-3 h-8 rounded-full avatar-arm-right shadow-md",
                            currentAnimation === 'wave' ? 'animate-[arm-still_2s_ease-in-out_infinite]' : 'animate-[arm-idle_6s_ease-in-out_infinite_1s]')} 
               style={{ backgroundColor: character.skinColor }}></div>

          {/* Hands */}
          <div className="absolute top-28 left-0.5 w-2 h-2 rounded-full shadow-sm" 
               style={{ backgroundColor: character.skinColor }}></div>
          <div className="absolute top-28 right-0.5 w-2 h-2 rounded-full shadow-sm" 
               style={{ backgroundColor: character.skinColor }}></div>

          {/* Legs */}
          <div className={cn("absolute top-30 left-1/2 transform -translate-x-1/2 -translate-x-2 w-3 h-12 rounded-full avatar-leg-left shadow-md",
                            currentAnimation === 'sit' ? 'animate-[leg-sit_1s_ease-out_forwards]' : 'animate-[leg-sway_8s_ease-in-out_infinite]')} 
               style={{ backgroundColor: '#4A90E2' }}></div>
          <div className={cn("absolute top-30 left-1/2 transform -translate-x-1/2 translate-x-2 w-3 h-12 rounded-full avatar-leg-right shadow-md",
                            currentAnimation === 'sit' ? 'animate-[leg-sit_1s_ease-out_forwards]' : 'animate-[leg-sway_8s_ease-in-out_infinite_0.5s]')} 
               style={{ backgroundColor: '#4A90E2' }}></div>

          {/* Feet */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-x-3 w-4 h-2 rounded-full bg-gray-800 shadow-md"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-x-3 w-4 h-2 rounded-full bg-gray-800 shadow-md"></div>
        </div>

        {/* Equipment overlays */}
        {renderEquipment()}

        {/* Legendary glow effect */}
        {Object.values(character.equippedItems).some(item => 
          ['elite-crown', 'legendary-blade', 'aegis-protocol', 'guardian-spirit'].includes(item || '')
        ) && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/30 to-yellow-500/30 animate-pulse z-0"></div>
        )}

        {/* Breathing effect overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-cyber-blue/5 to-transparent animate-[breathe-glow_4s_ease-in-out_infinite] pointer-events-none"></div>
      </div>

      {/* Animation Controls */}
      {showAnimationControls && (
        <div className="flex flex-wrap gap-2 justify-center max-w-xs">
          {animations.map(anim => (
            <button
              key={anim.id}
              onClick={() => {
                setCurrentAnimation(anim.id)
                onAnimationChange?.(anim.id)
              }}
              className={cn(
                "px-3 py-2 text-sm rounded-lg border-2 transition-all duration-300 hover:scale-105 shadow-md",
                currentAnimation === anim.id 
                  ? "bg-cyber-blue text-white border-cyber-blue shadow-cyber-blue/30" 
                  : "bg-background border-border hover:border-cyber-blue/50 hover:shadow-lg"
              )}
              title={anim.name}
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
