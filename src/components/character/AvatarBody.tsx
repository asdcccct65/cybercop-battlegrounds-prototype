
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
      viewBox="0 0 80 120" 
      className="w-full h-full p-2"
      style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))', transform: `scale(${breatheScale})` }}
    >
      {/* Body Illustration */}
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
        className="avatar-arm-left origin-center transition-transform duration-300"
      />
      <ellipse
        cx="58"
        cy="58"
        rx="4"
        ry="16"
        fill={character.skinColor}
        className="avatar-arm-right origin-center transition-transform duration-300"
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
        className="avatar-leg-left"
      />
      <ellipse
        cx="48"
        cy="88"
        rx="5"
        ry="18"
        fill="#2C3E50"
        className="avatar-leg-right"
      />
      
      {/* Feet */}
      <ellipse cx="30" cy="108" rx="6" ry="3" fill="#1A1A1A" className="avatar-foot-left" />
      <ellipse cx="50" cy="108" rx="6" ry="3" fill="#1A1A1A" className="avatar-foot-right" />

      {/* Facial Features */}
      <AvatarFace character={character} expression={expression} isBlinking={isBlinking} />
    </svg>
  )
}

// Simple copy of the hair path getter function (should be shared with base or utils in real project)
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

