
import React, { useState } from 'react'
import { Avatar3D } from './Avatar3D'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CharacterCustomization } from '@/hooks/useUserProfile'
import { Play, Pause, RotateCcw, Smile, Zap, Focus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Avatar3DControllerProps {
  character: CharacterCustomization
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showControls?: boolean
  allowRotation?: boolean
  className?: string
}

const animations = [
  { id: 'idle', name: 'Idle', emoji: '🧍', description: 'Natural breathing and subtle movement' },
  { id: 'wave', name: 'Wave', emoji: '👋', description: 'Friendly greeting gesture' },
  { id: 'heroic', name: 'Heroic', emoji: '🦸', description: 'Confident power stance' },
  { id: 'typing', name: 'Typing', emoji: '⌨️', description: 'Coding motion with hand movement' },
  { id: 'walk', name: 'Walk', emoji: '🚶', description: 'Walking cycle in place' }
]

const expressions = [
  { id: 'neutral', name: 'Neutral', icon: Focus, description: 'Calm and focused' },
  { id: 'happy', name: 'Happy', icon: Smile, description: 'Cheerful and optimistic' },
  { id: 'determined', name: 'Determined', icon: Zap, description: 'Ready for action' }
]

export const Avatar3DController: React.FC<Avatar3DControllerProps> = ({
  character,
  size = 'md',
  showControls = false,
  allowRotation = false,
  className = ''
}) => {
  const [currentAnimation, setCurrentAnimation] = useState('idle')
  const [currentExpression, setCurrentExpression] = useState('neutral')
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className={cn('flex flex-col items-center space-y-6', className)}>
      {/* Enhanced 3D Avatar Display */}
      <div className="relative">
        <Avatar3D
          character={character}
          animation={isPlaying ? currentAnimation : 'idle'}
          expression={currentExpression as 'neutral' | 'happy' | 'determined'}
          size={size}
          allowRotation={allowRotation}
          className="shadow-2xl shadow-cyber-blue/30 hover:shadow-cyber-blue/40 transition-all duration-500"
        />
        
        {/* Enhanced quality badge */}
        <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-purple text-white border-none px-3 py-1 animate-pulse">
          ✨ Game Quality
        </Badge>
      </div>

      {/* Enhanced Animation & Expression Controls */}
      {showControls && (
        <div className="space-y-4 w-full max-w-md">
          {/* Playback Controls */}
          <Card className="border-cyber-blue/30 bg-background/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-cyber-blue text-sm">Playback Controls</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-center space-x-3">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 transition-all duration-300",
                    isPlaying && "bg-cyber-blue/20"
                  )}
                >
                  {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                
                <Button
                  onClick={() => {
                    setCurrentAnimation('idle')
                    setCurrentExpression('neutral')
                  }}
                  variant="outline"
                  size="sm"
                  className="border-cyber-green text-cyber-green hover:bg-cyber-green/10 transition-all duration-300"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Expression Controls */}
          <Card className="border-cyber-purple/30 bg-background/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-cyber-purple text-sm">Facial Expression</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-2">
                {expressions.map(expr => {
                  const IconComponent = expr.icon
                  return (
                    <Button
                      key={expr.id}
                      onClick={() => setCurrentExpression(expr.id)}
                      variant={currentExpression === expr.id ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "h-auto py-3 px-2 flex flex-col items-center space-y-1 text-xs transition-all duration-300",
                        currentExpression === expr.id 
                          ? "bg-cyber-purple border-cyber-purple text-white shadow-lg shadow-cyber-purple/30" 
                          : "border-border hover:border-cyber-purple/50 hover:bg-cyber-purple/10"
                      )}
                      title={expr.description}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="font-medium">{expr.name}</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Animation Controls */}
          <Card className="border-cyber-green/30 bg-background/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-cyber-green text-sm">Animation Library</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2">
                {animations.map(anim => (
                  <Button
                    key={anim.id}
                    onClick={() => setCurrentAnimation(anim.id)}
                    variant={currentAnimation === anim.id ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "h-auto py-3 px-2 flex flex-col items-center space-y-1 text-xs transition-all duration-300 hover:scale-105",
                      currentAnimation === anim.id 
                        ? "bg-cyber-green border-cyber-green text-white shadow-lg shadow-cyber-green/30 scale-105" 
                        : "border-border hover:border-cyber-green/50 hover:bg-cyber-green/10"
                    )}
                    title={anim.description}
                  >
                    <span className="text-lg">{anim.emoji}</span>
                    <span className="font-medium">{anim.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Help */}
          {allowRotation && (
            <Card className="border-cyber-blue/20 bg-background/80 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="text-center text-xs text-muted-foreground space-y-1">
                  <div className="font-medium text-cyber-blue">3D Controls</div>
                  <div>🖱️ Click + Drag to rotate camera</div>
                  <div>🎯 Mouse wheel to zoom in/out</div>
                  <div>⚡ Real-time bone rigging & physics</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
