
import React from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"
import { AvatarFace } from "./AvatarFace"

interface AvatarBodyProps {
  character: CharacterCustomization
  expression: "neutral" | "smile" | "focused" | "surprised" | "confident"
  isBlinking: boolean
  breatheScale: number
}

export const AvatarBody: React.FC<AvatarBodyProps> = ({
  character,
  expression,
  isBlinking,
  breatheScale,
}) => {
  return (
    <svg 
      viewBox="0 0 100 140" 
      className="w-full h-full p-2"
      style={{ 
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))', 
        transform: `scale(${breatheScale})` 
      }}
    >
      {/* Background Character Shadow */}
      <ellipse
        cx="50"
        cy="135"
        rx="25"
        ry="3"
        fill="rgba(0,0,0,0.2)"
        className="character-shadow"
      />

      {/* Hair Back Layer */}
      {character.hairStyle !== "bald" && (
        <g className="hair-back-layer">
          <path
            d={getHairBackPath(character.hairStyle)}
            fill={character.hairColor}
            stroke={adjustColor(character.hairColor, -20)}
            strokeWidth="0.5"
            className="transition-all duration-300"
          />
        </g>
      )}

      {/* Body Structure */}
      <g className="body-structure">
        {/* Legs */}
        <g className="legs">
          {/* Left Leg */}
          <ellipse
            cx="40"
            cy="105"
            rx="6"
            ry="22"
            fill="#2C3E50"
            stroke="#1A252F"
            strokeWidth="1"
            className="leg-left transition-transform duration-300"
          />
          {/* Right Leg */}
          <ellipse
            cx="60"
            cy="105"
            rx="6"
            ry="22"
            fill="#2C3E50"
            stroke="#1A252F"
            strokeWidth="1"
            className="leg-right transition-transform duration-300"
          />
          
          {/* Leg Highlights */}
          <ellipse cx="38" cy="95" rx="2" ry="8" fill="rgba(255,255,255,0.1)" />
          <ellipse cx="58" cy="95" rx="2" ry="8" fill="rgba(255,255,255,0.1)" />
        </g>

        {/* Shoes */}
        <g className="shoes">
          <ellipse cx="38" cy="128" rx="8" ry="4" fill="#1A1A1A" className="shoe-left" />
          <ellipse cx="62" cy="128" rx="8" ry="4" fill="#1A1A1A" className="shoe-right" />
          {/* Shoe highlights */}
          <ellipse cx="40" cy="127" rx="3" ry="1.5" fill="rgba(255,255,255,0.2)" />
          <ellipse cx="60" cy="127" rx="3" ry="1.5" fill="rgba(255,255,255,0.2)" />
        </g>

        {/* Torso with detailed clothing */}
        <g className="torso">
          <ellipse
            cx="50"
            cy="75"
            rx="18"
            ry="20"
            fill="#4A90E2"
            stroke="#3A7BD5"
            strokeWidth="1.5"
            className="torso-base"
          />
          
          {/* Shirt details */}
          <rect x="40" y="65" width="20" height="25" rx="4" fill="#2C5282" opacity="0.9" />
          <rect x="42" y="67" width="16" height="21" rx="3" fill="#3A7BD5" opacity="0.7" />
          
          {/* Shirt buttons */}
          <circle cx="50" cy="72" r="1.2" fill="#1A365D" />
          <circle cx="50" cy="78" r="1.2" fill="#1A365D" />
          <circle cx="50" cy="84" r="1.2" fill="#1A365D" />
          
          {/* Collar */}
          <path d="M45 65 L50 62 L55 65 L52 68 L48 68 Z" fill="#2C5282" />
          
          {/* Torso highlights */}
          <ellipse cx="45" cy="70" rx="3" ry="6" fill="rgba(255,255,255,0.15)" />
        </g>

        {/* Arms with proper joints */}
        <g className="arms">
          {/* Left Arm */}
          <ellipse
            cx="32"
            cy="70"
            rx="5"
            ry="18"
            fill={character.skinColor}
            stroke={adjustColor(character.skinColor, -15)}
            strokeWidth="1"
            className="arm-left transition-transform duration-300 origin-center"
          />
          {/* Left Hand */}
          <circle 
            cx="32" 
            cy="88" 
            r="4" 
            fill={character.skinColor}
            stroke={adjustColor(character.skinColor, -15)}
            strokeWidth="0.5"
            className="hand-left transition-transform duration-300"
          />
          
          {/* Right Arm */}
          <ellipse
            cx="68"
            cy="70"
            rx="5"
            ry="18"
            fill={character.skinColor}
            stroke={adjustColor(character.skinColor, -15)}
            strokeWidth="1"
            className="arm-right transition-transform duration-300 origin-center"
          />
          {/* Right Hand */}
          <circle 
            cx="68" 
            cy="88" 
            r="4" 
            fill={character.skinColor}
            stroke={adjustColor(character.skinColor, -15)}
            strokeWidth="0.5"
            className="hand-right transition-transform duration-300"
          />
          
          {/* Arm highlights */}
          <ellipse cx="30" cy="65" rx="1.5" ry="5" fill="rgba(255,255,255,0.2)" />
          <ellipse cx="70" cy="65" rx="1.5" ry="5" fill="rgba(255,255,255,0.2)" />
        </g>

        {/* Neck */}
        <rect
          x="46"
          y="50"
          width="8"
          height="8"
          rx="2"
          fill={character.skinColor}
          stroke={adjustColor(character.skinColor, -10)}
          strokeWidth="0.5"
          className="neck"
        />
      </g>

      {/* Head */}
      <g className="head">
        <ellipse
          cx="50"
          cy="35"
          rx="14"
          ry="16"
          fill={character.skinColor}
          stroke={adjustColor(character.skinColor, -10)}
          strokeWidth="1"
          className="head-base"
        />
        
        {/* Head highlight */}
        <ellipse cx="45" cy="30" rx="4" ry="6" fill="rgba(255,255,255,0.15)" />
      </g>

      {/* Hair Front Layer */}
      {character.hairStyle !== "bald" && (
        <g className="hair-front-layer">
          <path
            d={getHairFrontPath(character.hairStyle)}
            fill={character.hairColor}
            stroke={adjustColor(character.hairColor, -20)}
            strokeWidth="0.5"
            className="transition-all duration-300"
          />
        </g>
      )}

      {/* Facial Features */}
      <AvatarFace character={character} expression={expression} isBlinking={isBlinking} />
    </svg>
  )
}

// Enhanced hair path functions with better visual accuracy
const getHairBackPath = (style: string) => {
  switch (style) {
    case "afro":
      return "M30 25 Q20 15 50 10 Q80 15 70 25 Q75 35 65 40 Q60 38 55 38 Q50 38 45 38 Q40 38 35 40 Q25 35 30 25 Z"
    case "long":
      return "M25 30 Q15 15 50 10 Q85 15 75 30 L80 55 Q75 65 70 60 L65 45 Q60 40 50 40 Q40 40 35 45 L30 60 Q25 65 20 55 Z"
    case "curly":
      return "M28 28 Q15 10 50 8 Q85 10 72 28 Q80 38 70 45 Q65 42 55 45 Q50 42 45 45 Q35 42 30 45 Q20 38 28 28 Z"
    case "dreads":
      return "M30 30 Q20 18 50 15 Q80 18 70 30 L35 65 L40 70 L45 65 L50 70 L55 65 L60 70 L65 65 Q75 32 50 32 Q25 32 30 30 Z"
    case "braided":
      return "M28 28 Q18 18 50 15 Q82 18 72 28 L75 60 Q72 68 68 60 L65 40 L62 60 Q58 68 54 60 L52 40 L50 60 Q48 68 46 60 L48 40 L46 60 Q42 68 38 60 L35 40 L32 60 Q28 68 25 60 Z"
    default:
      return "M30 30 Q25 20 50 18 Q75 20 70 30 Q72 35 65 38 Q60 36 50 36 Q40 36 35 38 Q28 35 30 30 Z"
  }
}

const getHairFrontPath = (style: string) => {
  switch (style) {
    case "afro":
      return "M38 22 Q35 18 50 18 Q65 18 62 22 Q64 25 58 28 Q54 26 50 26 Q46 26 42 28 Q36 25 38 22 Z"
    case "buzz-cut":
      return "M40 25 Q38 20 50 20 Q62 20 60 25 Q61 27 50 27 Q39 27 40 25 Z"
    case "spiky":
      return "M40 25 L42 12 L46 25 L50 10 L54 25 L58 12 L60 25 Q62 27 50 27 Q38 27 40 25 Z"
    case "mohawk":
      return "M45 25 L47 10 L50 8 L53 10 L55 25 Q53 27 50 27 Q47 27 45 25 Z"
    case "ponytail":
      return "M38 25 Q35 20 50 20 Q65 20 62 25 Q64 27 66 30 L72 45 Q69 48 66 45 L64 30 Q62 27 50 27 Q38 27 38 25 Z"
    case "bob":
      return "M32 28 Q28 18 50 18 Q72 18 68 28 Q72 38 65 42 Q58 44 50 44 Q42 44 35 42 Q28 38 32 28 Z"
    case "wavy":
      return "M35 28 Q25 15 50 15 Q75 15 65 28 Q72 35 68 40 Q63 38 58 40 Q53 38 50 40 Q47 38 42 40 Q37 38 32 40 Q28 35 35 28 Z"
    default:
      return "M38 28 Q35 22 50 22 Q65 22 62 28 Q64 30 50 30 Q36 30 38 28 Z"
  }
}

// Helper function to adjust color brightness
const adjustColor = (color: string, percent: number) => {
  const num = parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}
