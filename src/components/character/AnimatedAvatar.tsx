
import React, { useState, useEffect } from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"
import { cn } from "@/lib/utils"

interface AnimatedAvatarProps {
  character: CharacterCustomization
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animation?: "idle" | "wave" | "heroic" | "sit" | "breathe"
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

  const sizeClasses = {
    sm: "w-16 h-20",
    md: "w-24 h-30", 
    lg: "w-32 h-40",
    xl: "w-48 h-60"
  }

  const animations = [
    { id: "idle", name: "Idle", emoji: "🧍" },
    { id: "wave", name: "Wave", emoji: "👋" },
    { id: "heroic", name: "Heroic", emoji: "🦸" },
    { id: "sit", name: "Sit", emoji: "🪑" },
    { id: "breathe", name: "Breathe", emoji: "💨" }
  ]

  // Auto-blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(blinkInterval)
  }, [])

  const getHairStyle = (style: string) => {
    const baseClasses = "absolute rounded-full transition-all duration-300"
    switch (style) {
      case "afro":
        return `${baseClasses} -top-2 -left-2 -right-2 h-8 rounded-full`
      case "buzz-cut":
        return `${baseClasses} top-1 left-2 right-2 h-4`
      case "long":
        return `${baseClasses} -top-1 -left-1 -right-1 h-12 rounded-t-full`
      case "curly":
        return `${baseClasses} -top-1 -left-1 -right-1 h-8 rounded-full border-2 border-opacity-30`
      case "spiky":
        return `${baseClasses} -top-2 left-1 right-1 h-6`
      case "wavy":
        return `${baseClasses} -top-1 -left-1 -right-1 h-10 rounded-t-full`
      case "braided":
        return `${baseClasses} -top-1 left-0 right-0 h-14 rounded-t-full`
      case "ponytail":
        return `${baseClasses} -top-1 left-1 right-1 h-8`
      case "bob":
        return `${baseClasses} top-0 left-0 right-0 h-8 rounded-t-full`
      case "mohawk":
        return `${baseClasses} -top-2 left-4 right-4 h-8`
      case "bald":
        return "hidden"
      default:
        return `${baseClasses} top-1 left-2 right-2 h-6`
    }
  }

  const getAnimationClasses = () => {
    switch (currentAnimation) {
      case "wave":
        return "animate-bounce"
      case "heroic":
        return "transform scale-105"
      case "sit":
        return "transform translate-y-2"
      case "breathe":
        return "animate-pulse"
      default:
        return "animate-[gentle-sway_4s_ease-in-out_infinite]"
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
        <div key="headgear" className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-lg">
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
        <div key="weapon" className="absolute -right-2 top-8 text-lg">
          {emoji}
        </div>
      )
    }

    return elements
  }

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      {/* Avatar Container */}
      <div className={cn(
        "relative flex items-center justify-center bg-gradient-to-br from-cyber-blue/10 to-cyber-green/10 rounded-xl border-2 border-cyber-blue/30 shadow-lg transition-all duration-300",
        sizeClasses[size],
        getAnimationClasses()
      )}>
        {/* Character Body */}
        <div className="relative w-full h-full">
          {/* Head */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border shadow-inner" 
               style={{ backgroundColor: character.skinColor }}>
            
            {/* Hair */}
            {character.hairStyle !== "bald" && (
              <div 
                className={getHairStyle(character.hairStyle)}
                style={{ backgroundColor: character.hairColor }}
              />
            )}
            
            {/* Eyebrows */}
            <div className="absolute top-2 left-1.5 w-1.5 h-0.5 bg-gray-700 rounded-full"></div>
            <div className="absolute top-2 right-1.5 w-1.5 h-0.5 bg-gray-700 rounded-full"></div>
            
            {/* Eyes */}
            <div className={cn(
              "absolute top-2.5 left-2 w-1 h-1 rounded-full transition-all duration-150",
              isBlinking ? "h-0.5" : "h-1"
            )} style={{ backgroundColor: character.eyeColor }} />
            <div className={cn(
              "absolute top-2.5 right-2 w-1 h-1 rounded-full transition-all duration-150",
              isBlinking ? "h-0.5" : "h-1"
            )} style={{ backgroundColor: character.eyeColor }} />
            
            {/* Nose */}
            <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-black/10 rounded-full"></div>
            
            {/* Mouth */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-black/20 rounded-full"></div>
          </div>

          {/* Torso */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-6 h-8 rounded-t-lg" 
               style={{ backgroundColor: character.skinColor }}>
            {/* Shirt */}
            <div className="absolute inset-0 bg-cyber-blue/30 rounded-t-lg"></div>
          </div>

          {/* Arms */}
          <div className="absolute top-12 left-2 w-2 h-6 rounded-full" 
               style={{ backgroundColor: character.skinColor }}></div>
          <div className="absolute top-12 right-2 w-2 h-6 rounded-full" 
               style={{ backgroundColor: character.skinColor }}></div>

          {/* Legs */}
          <div className="absolute top-18 left-1/2 transform -translate-x-1/2 -translate-x-1 w-2 h-8 rounded-full bg-cyber-green/30"></div>
          <div className="absolute top-18 left-1/2 transform -translate-x-1/2 translate-x-1 w-2 h-8 rounded-full bg-cyber-green/30"></div>

          {/* Feet */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-x-1.5 w-3 h-1.5 rounded-full bg-gray-800"></div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-x-1.5 w-3 h-1.5 rounded-full bg-gray-800"></div>
        </div>

        {/* Equipment overlays */}
        {renderEquipment()}

        {/* Legendary glow effect */}
        {Object.values(character.equippedItems).some(item => 
          ['elite-crown', 'legendary-blade', 'aegis-protocol', 'guardian-spirit'].includes(item || '')
        ) && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 animate-pulse"></div>
        )}
      </div>

      {/* Animation Controls */}
      {showAnimationControls && (
        <div className="flex flex-wrap gap-1 justify-center max-w-xs">
          {animations.map(anim => (
            <button
              key={anim.id}
              onClick={() => {
                setCurrentAnimation(anim.id)
                onAnimationChange?.(anim.id)
              }}
              className={cn(
                "px-2 py-1 text-xs rounded-md border transition-all duration-200",
                currentAnimation === anim.id 
                  ? "bg-cyber-blue text-white border-cyber-blue" 
                  : "bg-background border-border hover:border-cyber-blue/50"
              )}
              title={anim.name}
            >
              {anim.emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
