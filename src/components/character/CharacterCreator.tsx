
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CharacterAvatar } from "./CharacterAvatar"
import { CharacterCustomization } from "@/hooks/useUserProfile"

interface CharacterCreatorProps {
  isOpen: boolean
  onComplete: (username: string, character: CharacterCustomization) => void
}

const skinColors = ["#FDBCB4", "#F1C27D", "#E0AC69", "#C68642", "#8D5524", "#A0522D"]
const hairStyles = ["short", "long", "curly", "spiky", "bald"]
const hairColors = ["#8B4513", "#000000", "#FFD700", "#FF4500", "#800080", "#32CD32"]
const eyeColors = ["#8B4513", "#000000", "#0000FF", "#00FF00", "#808080", "#800080"]

export function CharacterCreator({ isOpen, onComplete }: CharacterCreatorProps) {
  const [username, setUsername] = useState("")
  const [character, setCharacter] = useState<CharacterCustomization>({
    skinColor: "#FDBCB4",
    hairStyle: "short",
    hairColor: "#8B4513",
    eyeColor: "#8B4513",
    equippedItems: {}
  })

  const handleComplete = () => {
    if (username.trim()) {
      onComplete(username, character)
    }
  }

  const ColorPicker = ({ colors, selected, onChange }: { colors: string[], selected: string, onChange: (color: string) => void }) => (
    <div className="flex space-x-2 flex-wrap">
      {colors.map(color => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full border-2 ${selected === color ? 'border-cyber-blue' : 'border-muted'}`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
            Create Your Cyber Agent
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Character Preview */}
          <div className="flex flex-col items-center space-y-4">
            <CharacterAvatar character={character} size="lg" />
            <div className="text-center">
              <Label htmlFor="username">Agent Name</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your agent name"
                className="mt-2"
                maxLength={20}
              />
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label className="text-sm font-medium">Skin Color</Label>
                  <div className="mt-2">
                    <ColorPicker
                      colors={skinColors}
                      selected={character.skinColor}
                      onChange={(color) => setCharacter(prev => ({ ...prev, skinColor: color }))}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Hair Style</Label>
                  <div className="mt-2 flex space-x-2 flex-wrap">
                    {hairStyles.map(style => (
                      <Button
                        key={style}
                        variant={character.hairStyle === style ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCharacter(prev => ({ ...prev, hairStyle: style }))}
                        className="capitalize"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Hair Color</Label>
                  <div className="mt-2">
                    <ColorPicker
                      colors={hairColors}
                      selected={character.hairColor}
                      onChange={(color) => setCharacter(prev => ({ ...prev, hairColor: color }))}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Eye Color</Label>
                  <div className="mt-2">
                    <ColorPicker
                      colors={eyeColors}
                      selected={character.eyeColor}
                      onChange={(color) => setCharacter(prev => ({ ...prev, eyeColor: color }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleComplete} 
              disabled={!username.trim()}
              className="w-full bg-cyber-blue hover:bg-cyber-blue/80"
              size="lg"
            >
              Enter CyberCop Academy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
