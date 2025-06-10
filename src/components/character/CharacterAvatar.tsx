
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

  const getHairStyle = (style: string) => {
    const baseStyle = "absolute rounded-full"
    switch (style) {
      case "short":
        return `${baseStyle} inset-2 top-1`
      case "long":
        return `${baseStyle} inset-1 top-0 bottom-4`
      case "curly":
        return `${baseStyle} inset-1 top-0`
      case "spiky":
        return `${baseStyle} inset-1 top-0`
      case "wavy":
        return `${baseStyle} inset-1 top-0 bottom-3`
      case "braided":
        return `${baseStyle} inset-1 top-0 bottom-2`
      case "buzz-cut":
        return `${baseStyle} inset-3 top-2`
      case "bald":
        return "hidden"
      default:
        return `${baseStyle} inset-2 top-1`
    }
  }

  // Enhanced equipment rendering based on item IDs
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
        "neural-headset": "🎧",
        "agent-suit": "🤵",
        "hacker-hoodie": "👕",
        "combat-gear": "🥋",
        "elite-uniform": "👔"
      }
      const emoji = headgearEmojis[equipment.hat as keyof typeof headgearEmojis] || "🎩"
      elements.push(
        <div key="headgear" className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs">
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
        <div key="weapon" className="absolute -right-1 top-1/2 text-xs transform -translate-y-1/2">
          {emoji}
        </div>
      )
    }

    // Shields
    if (equipment.shield) {
      const shieldEmojis = {
        "digital-shield": "🛡️",
        "firewall-barrier": "🔰",
        "quantum-armor": "🦺",
        "aegis-protocol": "⚔️"
      }
      const emoji = shieldEmojis[equipment.shield as keyof typeof shieldEmojis] || "🛡️"
      elements.push(
        <div key="shield" className="absolute -left-1 top-1/2 text-xs transform -translate-y-1/2">
          {emoji}
        </div>
      )
    }

    // Accessories
    if (equipment.accessory) {
      const accessoryEmojis = {
        "hacker-goggles": "🕶️",
        "cyber-cape": "🧥",
        "data-gloves": "🧤",
        "power-belt": "📿",
        "holo-earrings": "💎",
        "phantom-cloak": "👻",
        "data-drone": "🚁",
        "cyber-pet": "🐱",
        "guardian-spirit": "👻"
      }
      const emoji = accessoryEmojis[equipment.accessory as keyof typeof accessoryEmojis] || "🕶️"
      elements.push(
        <div key="accessory" className="absolute top-0 right-0 text-xs">
          {emoji}
        </div>
      )
    }

    return elements
  }

  return (
    <div className={cn(
      "relative flex items-center justify-center rounded-full border-2 border-cyber-blue/30 bg-gradient-to-br from-cyber-blue/10 to-cyber-green/10 shadow-lg hover:shadow-cyber-blue/20 transition-all duration-300", 
      sizeClasses[size], 
      className
    )}>
      {/* Character representation */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        {/* Face */}
        <div 
          className="absolute inset-2 rounded-full shadow-inner"
          style={{ backgroundColor: character.skinColor }}
        />
        
        {/* Hair */}
        {character.hairStyle !== "bald" && (
          <div 
            className={getHairStyle(character.hairStyle)}
            style={{ backgroundColor: character.hairColor }}
          />
        )}
        
        {/* Eyes with better positioning */}
        <div 
          className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full shadow-sm" 
          style={{ backgroundColor: character.eyeColor }} 
        />
        <div 
          className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full shadow-sm" 
          style={{ backgroundColor: character.eyeColor }} 
        />
        
        {/* Mouth hint */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-black/20 rounded-full" />
      </div>
      
      {/* Equipment overlays */}
      {renderEquipment()}
      
      {/* Glow effect for legendary items */}
      {Object.values(character.equippedItems).some(item => 
        ['elite-crown', 'legendary-blade', 'aegis-protocol', 'guardian-spirit', 'elite-uniform'].includes(item || '')
      ) && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 animate-pulse"></div>
      )}
    </div>
  )
}
