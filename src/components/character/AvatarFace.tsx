
import React from "react"
import { CharacterCustomization } from "@/hooks/useUserProfile"

interface AvatarFaceProps {
  character: CharacterCustomization
  expression: "neutral" | "smile" | "focused" | "surprised" | "confident"
  isBlinking: boolean
}

export const AvatarFace: React.FC<AvatarFaceProps> = ({
  character,
  expression,
  isBlinking
}) => {
  // Expression mapping
  const facialData = getFacialExpression(expression)

  return (
    <>
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
    </>
  )
}

const getFacialExpression = (expression: string) => {
  switch (expression) {
    case "smile":
      return {
        mouth: "M32 52 Q40 58 48 52",
        eyebrows: { left: "M30 38 L36 36", right: "M44 36 L50 38" },
        cheeks: true
      }
    case "focused":
      return {
        mouth: "M37 52 L43 52",
        eyebrows: { left: "M30 36 L36 38", right: "M44 38 L50 36" },
        cheeks: false
      }
    case "surprised":
      return {
        mouth: "M40 52 Q40 56 40 52",
        eyebrows: { left: "M30 34 L36 36", right: "M44 36 L50 34" },
        cheeks: false
      }
    case "confident":
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

