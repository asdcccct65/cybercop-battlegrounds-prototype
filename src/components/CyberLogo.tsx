
import React from "react"
import { Shield } from "lucide-react"

interface CyberLogoProps {
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export function CyberLogo({ size = "md", animated = true }: CyberLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-20 w-20"
  }

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  }

  return (
    <div className="flex items-center space-x-3">
      <div className={`relative ${animated ? 'animate-glow' : ''}`}>
        <Shield 
          className={`${sizeClasses[size]} text-cyber-blue`}
          fill="currentColor"
        />
        <div className="absolute inset-0 bg-cyber-blue/20 rounded-full blur-xl"></div>
      </div>
      <span className={`font-bold ${textSizes[size]} bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent`}>
        CyberCop
      </span>
    </div>
  )
}
