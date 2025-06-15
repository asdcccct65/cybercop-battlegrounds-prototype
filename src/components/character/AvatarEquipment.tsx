
import React from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"

interface AvatarEquipmentProps {
  equippedItems: CharacterCustomization["equippedItems"]
}

export const AvatarEquipment: React.FC<AvatarEquipmentProps> = ({ equippedItems }) => {
  const elements = []

  // Enhanced headgear with better positioning and visuals
  if (equippedItems.hat) {
    const headgearStyles = {
      "basic-cap": { 
        element: "🧢", 
        position: "top-6 left-1/2 -translate-x-1/2",
        size: "text-4xl",
        glow: false
      },
      "tactical-helmet": { 
        element: "⛑️", 
        position: "top-4 left-1/2 -translate-x-1/2",
        size: "text-4xl",
        glow: true
      },
      "cyber-visor": { 
        element: "🥽", 
        position: "top-10 left-1/2 -translate-x-1/2",
        size: "text-3xl",
        glow: true
      },
      "stealth-mask": { 
        element: "🎭", 
        position: "top-10 left-1/2 -translate-x-1/2",
        size: "text-3xl",
        glow: false
      },
      "elite-crown": { 
        element: "👑", 
        position: "top-2 left-1/2 -translate-x-1/2",
        size: "text-4xl",
        glow: true
      },
      "neural-headset": { 
        element: "🎧", 
        position: "top-8 left-1/2 -translate-x-1/2",
        size: "text-3xl",
        glow: true
      }
    }
    
    // @ts-ignore
    const style = headgearStyles[equippedItems.hat]
    if (style) {
      elements.push(
        <div 
          key="headgear" 
          className={`absolute ${style.position} ${style.size} z-20 transition-all duration-300 hover:scale-110 ${
            style.glow ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''
          }`}
        >
          {style.element}
        </div>
      )
    }
  }

  // Enhanced weapons with better positioning
  if (equippedItems.sword) {
    const weaponStyles = {
      "cyber-sword": { 
        element: "⚔️", 
        position: "top-24 -right-3 rotate-45",
        size: "text-3xl",
        glow: true
      },
      "data-axe": { 
        element: "🪓", 
        position: "top-24 -right-3 rotate-30",
        size: "text-3xl",
        glow: false
      },
      "hack-staff": { 
        element: "🔮", 
        position: "top-22 -right-2",
        size: "text-2xl",
        glow: true
      },
      "stealth-dagger": { 
        element: "🗡️", 
        position: "top-26 -right-2 rotate-45",
        size: "text-2xl",
        glow: false
      },
      "plasma-rifle": { 
        element: "🔫", 
        position: "top-24 -right-4 -rotate-12",
        size: "text-3xl",
        glow: true
      },
      "legendary-blade": { 
        element: "⚔️", 
        position: "top-24 -right-3 rotate-45",
        size: "text-4xl",
        glow: true
      }
    }
    
    // @ts-ignore
    const style = weaponStyles[equippedItems.sword]
    if (style) {
      elements.push(
        <div 
          key="weapon" 
          className={`absolute ${style.position} ${style.size} z-10 transition-all duration-300 hover:scale-110 ${
            style.glow ? 'drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]' : ''
          }`}
        >
          {style.element}
        </div>
      )
    }
  }

  // Add shields
  if (equippedItems.shield) {
    const shieldStyles = {
      "basic-shield": {
        element: "🛡️",
        position: "top-24 -left-3",
        size: "text-3xl",
        glow: false
      },
      "cyber-shield": {
        element: "🛡️",
        position: "top-24 -left-3",
        size: "text-3xl",
        glow: true
      },
      "aegis-protocol": {
        element: "🛡️",
        position: "top-24 -left-4",
        size: "text-4xl",
        glow: true
      }
    }
    
    // @ts-ignore
    const style = shieldStyles[equippedItems.shield]
    if (style) {
      elements.push(
        <div 
          key="shield" 
          className={`absolute ${style.position} ${style.size} z-10 transition-all duration-300 hover:scale-110 ${
            style.glow ? 'drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]' : ''
          }`}
        >
          {style.element}
        </div>
      )
    }
  }

  // Add accessories
  if (equippedItems.accessory) {
    const accessoryStyles = {
      "glasses": {
        element: "👓",
        position: "top-10 left-1/2 -translate-x-1/2",
        size: "text-2xl",
        glow: false
      },
      "earrings": {
        element: "💎",
        position: "top-12 left-8",
        size: "text-xl",
        glow: true
      },
      "watch": {
        element: "⌚",
        position: "top-28 left-4",
        size: "text-xl",
        glow: false
      },
      "badge": {
        element: "🏅",
        position: "top-20 left-8",
        size: "text-2xl",
        glow: true
      }
    }
    
    // @ts-ignore
    const style = accessoryStyles[equippedItems.accessory]
    if (style) {
      elements.push(
        <div 
          key="accessory" 
          className={`absolute ${style.position} ${style.size} z-15 transition-all duration-300 hover:scale-110 ${
            style.glow ? 'drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]' : ''
          }`}
        >
          {style.element}
        </div>
      )
    }
  }

  return <>{elements}</>
}
