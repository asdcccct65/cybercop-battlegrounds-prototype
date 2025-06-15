
import React from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"

interface AvatarEquipmentProps {
  equippedItems: CharacterCustomization["equippedItems"]
}

export const AvatarEquipment: React.FC<AvatarEquipmentProps> = ({ equippedItems }) => {
  const elements = []

  if (equippedItems.hat) {
    const headgearStyles = {
      "basic-cap": { emoji: "🧢", position: "top-4 left-1/2 -translate-x-1/2" },
      "tactical-helmet": { emoji: "⛑️", position: "top-2 left-1/2 -translate-x-1/2" },
      "cyber-visor": { emoji: "🥽", position: "top-8 left-1/2 -translate-x-1/2" },
      "stealth-mask": { emoji: "🎭", position: "top-8 left-1/2 -translate-x-1/2" },
      "elite-crown": { emoji: "👑", position: "top-1 left-1/2 -translate-x-1/2" },
      "neural-headset": { emoji: "🎧", position: "top-6 left-1/2 -translate-x-1/2" }
    }
    // @ts-ignore
    const style = headgearStyles[equippedItems.hat]
    if (style) {
      elements.push(
        <div key="headgear" className={`absolute ${style.position} text-3xl z-20`}>
          {style.emoji}
        </div>
      )
    }
  }

  if (equippedItems.sword) {
    const weaponStyles = {
      "cyber-sword": { emoji: "⚔️", position: "top-20 -right-2" },
      "data-axe": { emoji: "🪓", position: "top-20 -right-2" },
      "hack-staff": { emoji: "🔮", position: "top-18 -right-1" },
      "stealth-dagger": { emoji: "🗡️", position: "top-22 -right-1" },
      "plasma-rifle": { emoji: "🔫", position: "top-20 -right-2" },
      "legendary-blade": { emoji: "⚔️", position: "top-20 -right-2" }
    }
    // @ts-ignore
    const style = weaponStyles[equippedItems.sword]
    if (style) {
      elements.push(
        <div key="weapon" className={`absolute ${style.position} text-2xl z-10`}>
          {style.emoji}
        </div>
      )
    }
  }

  return <>{elements}</>
}
