
import React, { useState } from 'react'
import { Avatar3D } from './Avatar3D'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CharacterCustomization } from '@/hooks/useUserProfile'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Avatar3DControllerProps {
  character: CharacterCustomization
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showControls?: boolean
  allowRotation?: boolean
  className?: string
}

const animations = [
  { id: 'idle', name: 'Idle', emoji: '🧍', description: 'Natural standing pose' },
  { id: 'wave', name: 'Wave', emoji: '👋', description: 'Friendly greeting' },
  { id: 'heroic', name: 'Heroic', emoji: '🦸', description: 'Power stance' },
  { id: 'typing', name: 'Typing', emoji: '⌨️', description: 'Coding motion' },
  { id: 'walk', name: 'Walk', emoji: '🚶', description: 'Walking in place' }
]

export const Avatar3DController: React.FC<Avatar3DControllerProps> = ({
  character,
  size = 'md',
  showControls = false,
  allowRotation = false,
  className = ''
}) => {
  const [currentAnimation, setCurrentAnimation] = useState('idle')
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className={cn('flex flex-col items-center space-y-4', className)}>
      {/* 3D Avatar Display */}
      <div className="relative">
        <Avatar3D
          character={character}
          animation={isPlaying ? currentAnimation : 'idle'}
          size={size}
          allowRotation={allowRotation}
          className="shadow-2xl shadow-cyber-blue/20"
        />
        
        {/* Quality badge */}
        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-cyber-blue to-cyber-green text-white border-none">
          3D Enhanced
        </Badge>
      </div>

      {/* Animation Controls */}
      {showControls && (
        <Card className="border-cyber-blue/20 bg-background/80 backdrop-blur-sm">
          <CardContent className="p-4 space-y-4">
            {/* Play/Pause Control */}
            <div className="flex items-center justify-center space-x-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                size="sm"
                className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button
                onClick={() => setCurrentAnimation('idle')}
                variant="outline"
                size="sm"
                className="border-cyber-green text-cyber-green hover:bg-cyber-green/10"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>

            {/* Animation Selection */}
            <div className="grid grid-cols-3 gap-2">
              {animations.map(anim => (
                <Button
                  key={anim.id}
                  onClick={() => setCurrentAnimation(anim.id)}
                  variant={currentAnimation === anim.id ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-auto py-3 px-2 flex flex-col items-center space-y-1 text-xs transition-all duration-300",
                    currentAnimation === anim.id 
                      ? "bg-cyber-blue border-cyber-blue text-white shadow-lg shadow-cyber-blue/25" 
                      : "border-border hover:border-cyber-blue/50 hover:bg-cyber-blue/5"
                  )}
                  title={anim.description}
                >
                  <span className="text-lg">{anim.emoji}</span>
                  <span className="font-medium">{anim.name}</span>
                </Button>
              ))}
            </div>

            {allowRotation && (
              <div className="text-center text-xs text-muted-foreground">
                Click and drag to rotate • Mouse wheel to zoom
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
