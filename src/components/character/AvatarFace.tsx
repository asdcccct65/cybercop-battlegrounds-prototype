
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
  const facialData = getFacialExpression(expression)

  return (
    <g className="facial-features">
      {/* Eyebrows with proper structure */}
      <g className="eyebrows">
        <path 
          d={facialData.eyebrows.left} 
          stroke="#4A4A4A" 
          strokeWidth="2" 
          strokeLinecap="round"
          fill="none"
          className="eyebrow-left transition-all duration-300"
        />
        <path 
          d={facialData.eyebrows.right} 
          stroke="#4A4A4A" 
          strokeWidth="2" 
          strokeLinecap="round"
          fill="none"
          className="eyebrow-right transition-all duration-300"
        />
      </g>
      
      {/* Eye sockets and structure */}
      <g className="eye-structure">
        {/* Left Eye Socket */}
        <ellipse cx="44" cy="32" rx="4" ry="3" fill="rgba(0,0,0,0.05)" />
        {/* Right Eye Socket */}
        <ellipse cx="56" cy="32" rx="4" ry="3" fill="rgba(0,0,0,0.05)" />
      </g>

      {/* Eyes with detailed structure */}
      <g className="eyes">
        {/* Left Eye */}
        <ellipse 
          cx="44" 
          cy="32" 
          rx="3.5"
          ry={isBlinking ? "0.5" : "2.5"} 
          fill="white"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="0.5"
          className="eye-left transition-all duration-150"
        />
        {/* Left Iris */}
        {!isBlinking && (
          <ellipse 
            cx="44" 
            cy="32" 
            rx="2"
            ry="2" 
            fill={character.eyeColor}
            className="iris-left"
          />
        )}
        {/* Left Pupil */}
        {!isBlinking && (
          <circle cx="44" cy="32" r="1" fill="#000" className="pupil-left" />
        )}
        {/* Left Eye Highlight */}
        {!isBlinking && (
          <circle cx="44.8" cy="31.3" r="0.4" fill="#fff" opacity="0.9" className="highlight-left" />
        )}

        {/* Right Eye */}
        <ellipse 
          cx="56" 
          cy="32" 
          rx="3.5"
          ry={isBlinking ? "0.5" : "2.5"} 
          fill="white"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="0.5"
          className="eye-right transition-all duration-150"
        />
        {/* Right Iris */}
        {!isBlinking && (
          <ellipse 
            cx="56" 
            cy="32" 
            rx="2"
            ry="2" 
            fill={character.eyeColor}
            className="iris-right"
          />
        )}
        {/* Right Pupil */}
        {!isBlinking && (
          <circle cx="56" cy="32" r="1" fill="#000" className="pupil-right" />
        )}
        {/* Right Eye Highlight */}
        {!isBlinking && (
          <circle cx="56.8" cy="31.3" r="0.4" fill="#fff" opacity="0.9" className="highlight-right" />
        )}

        {/* Eyelashes */}
        {!isBlinking && (
          <g className="eyelashes">
            <path d="M41 30 Q42 29 43 30" stroke="#333" strokeWidth="0.5" fill="none" />
            <path d="M45 29.5 Q46 28.5 47 29.5" stroke="#333" strokeWidth="0.5" fill="none" />
            <path d="M53 29.5 Q54 28.5 55 29.5" stroke="#333" strokeWidth="0.5" fill="none" />
            <path d="M57 30 Q58 29 59 30" stroke="#333" strokeWidth="0.5" fill="none" />
          </g>
        )}
      </g>

      {/* Nose with proper structure */}
      <g className="nose">
        <path d="M50 35 Q49 37.5 50 39 Q51 37.5 50 35" fill="rgba(0,0,0,0.08)" />
        <path d="M48.5 37.5 Q49.5 38 50 37.8" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" fill="none" />
        <path d="M51.5 37.5 Q50.5 38 50 37.8" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" fill="none" />
        {/* Nose highlight */}
        <ellipse cx="50" cy="36.5" rx="0.5" ry="1" fill="rgba(255,255,255,0.3)" />
      </g>

      {/* Mouth with detailed structure */}
      <g className="mouth">
        <path 
          d={facialData.mouth} 
          stroke="#B8860B" 
          strokeWidth="1.5" 
          fill={facialData.mouthFill || "none"}
          strokeLinecap="round"
          className="mouth-path transition-all duration-300"
        />
        {/* Teeth for smile */}
        {expression === "smile" && (
          <path d="M45 44 Q50 46 55 44" stroke="white" strokeWidth="1" fill="none" />
        )}
        {/* Mouth corners */}
        <circle cx={facialData.leftCorner?.x || 45} cy={facialData.leftCorner?.y || 43} r="0.3" fill="rgba(0,0,0,0.1)" />
        <circle cx={facialData.rightCorner?.x || 55} cy={facialData.rightCorner?.y || 43} r="0.3" fill="rgba(0,0,0,0.1)" />
      </g>

      {/* Cheeks for expressions */}
      {facialData.cheeks && (
        <g className="cheeks">
          <ellipse cx="36" cy="36" rx="2.5" ry="2" fill="rgba(255,182,193,0.4)" className="cheek-left" />
          <ellipse cx="64" cy="36" rx="2.5" ry="2" fill="rgba(255,182,193,0.4)" className="cheek-right" />
        </g>
      )}

      {/* Facial contours and shadows */}
      <g className="facial-contours">
        {/* Jawline */}
        <path d="M38 45 Q50 48 62 45" stroke="rgba(0,0,0,0.05)" strokeWidth="1" fill="none" />
        {/* Cheekbones */}
        <path d="M40 35 Q45 33 50 35" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" fill="none" />
        <path d="M50 35 Q55 33 60 35" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" fill="none" />
      </g>
    </g>
  )
}

const getFacialExpression = (expression: string) => {
  switch (expression) {
    case "smile":
      return {
        mouth: "M45 43 Q50 46 55 43",
        mouthFill: "rgba(255,100,100,0.3)",
        eyebrows: { left: "M40 29 L47 28", right: "M53 28 L60 29" },
        cheeks: true,
        leftCorner: { x: 45, y: 43 },
        rightCorner: { x: 55, y: 43 }
      }
    case "focused":
      return {
        mouth: "M47 43 L53 43",
        eyebrows: { left: "M40 28 L47 30", right: "M53 30 L60 28" },
        cheeks: false,
        leftCorner: { x: 47, y: 43 },
        rightCorner: { x: 53, y: 43 }
      }
    case "surprised":
      return {
        mouth: "M49 43 Q50 46 51 43",
        mouthFill: "rgba(0,0,0,0.2)",
        eyebrows: { left: "M40 26 L47 28", right: "M53 28 L60 26" },
        cheeks: false,
        leftCorner: { x: 49, y: 43 },
        rightCorner: { x: 51, y: 43 }
      }
    case "confident":
      return {
        mouth: "M46 43 Q50 45 54 43",
        eyebrows: { left: "M40 29 L47 28", right: "M53 28 L60 29" },
        cheeks: false,
        leftCorner: { x: 46, y: 43 },
        rightCorner: { x: 54, y: 43 }
      }
    default: // neutral
      return {
        mouth: "M47 43 L53 43",
        eyebrows: { left: "M40 29 L47 29", right: "M53 29 L60 29" },
        cheeks: false,
        leftCorner: { x: 47, y: 43 },
        rightCorner: { x: 53, y: 43 }
      }
  }
}
