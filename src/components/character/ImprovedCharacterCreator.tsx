
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar3DController } from "./Avatar3DController"
import { CharacterCustomization } from "@/hooks/useUserProfile"
import { Palette, Edit3, Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImprovedCharacterCreatorProps {
  isOpen: boolean
  onComplete?: (username: string, character: CharacterCustomization) => void
  editMode?: boolean
  currentCharacter?: CharacterCustomization
  currentUsername?: string
  onSave?: (character: CharacterCustomization) => void
  onCancel?: () => void
}

// Enhanced skin tone palette
const skinColors = [
  "#FDBCB4", "#F1C27D", "#E0AC69", "#C68642", "#8D5524", 
  "#6B4423", "#4A2C17", "#F4E4D6", "#E8B4A0", "#CD9777"
]

// Comprehensive hairstyle options
const hairStyles = [
  { id: "short", name: "Short" },
  { id: "afro", name: "Afro" },
  { id: "buzz-cut", name: "Buzz Cut" },
  { id: "long", name: "Long" },
  { id: "curly", name: "Curly" },
  { id: "spiky", name: "Spiky" },
  { id: "ponytail", name: "Ponytail" },
  { id: "braided", name: "Braided" },
  { id: "bob", name: "Bob" },
  { id: "mohawk", name: "Mohawk" },
  { id: "wavy", name: "Wavy" },
  { id: "dreads", name: "Dreads" },
  { id: "bald", name: "Bald" }
]

// Expanded hair color palette
const hairColors = [
  "#2C1B18", "#8B4513", "#D2691E", "#DEB887", "#B22222", "#696969", 
  "#FFFFFF", "#F4A460", "#CD853F", "#800080", "#FF1493", "#00CED1"
]

// Natural eye colors
const eyeColors = [
  "#8B4513", "#4682B4", "#228B22", "#2F4F4F", "#800080", 
  "#000000", "#DAA520", "#008B8B", "#1E90FF", "#32CD32"
]

export function ImprovedCharacterCreator({ 
  isOpen, 
  onComplete, 
  editMode = false,
  currentCharacter,
  currentUsername = "",
  onSave,
  onCancel 
}: ImprovedCharacterCreatorProps) {
  const [username, setUsername] = useState(editMode ? currentUsername : "")
  const [character, setCharacter] = useState<CharacterCustomization>(
    currentCharacter || {
      skinColor: "#FDBCB4",
      hairStyle: "short",
      hairColor: "#8B4513",
      eyeColor: "#8B4513",
      equippedItems: {}
    }
  )
  const [previewAnimation, setPreviewAnimation] = useState<string>("idle")

  const handleComplete = () => {
    if (editMode && onSave) {
      onSave(character)
    } else if (username.trim() && onComplete) {
      onComplete(username, character)
    }
  }

  const ColorPicker = ({ colors, selected, onChange, label }: { 
    colors: string[], 
    selected: string, 
    onChange: (color: string) => void,
    label: string 
  }) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium flex items-center space-x-2">
        <Palette className="h-4 w-4" />
        <span>{label}</span>
      </Label>
      <div className="grid grid-cols-6 gap-2">
        {colors.map(color => (
          <button
            key={color}
            className={cn(
              "w-8 h-8 rounded-full border-2 transition-all hover:scale-110 shadow-md",
              selected === color ? 'border-cyber-blue shadow-lg ring-2 ring-cyber-blue/30' : 'border-muted hover:border-cyber-blue/50'
            )}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            title={`Select ${label.toLowerCase()}`}
          />
        ))}
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={editMode ? onCancel : () => {}}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent flex items-center space-x-2">
            {editMode ? (
              <>
                <Edit3 className="h-6 w-6 text-cyber-blue" />
                <span>Customize Your 3D Avatar</span>
              </>
            ) : (
              <>
                <Sparkles className="h-6 w-6 text-cyber-blue" />
                <span>Create Your 3D Cyber Agent</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Enhanced 3D Character Preview */}
          <div className="lg:col-span-2 flex flex-col items-center space-y-6">
            <div className="relative">
              <Avatar3DController 
                character={character} 
                size="xl" 
                showControls={true}
                allowRotation={true}
              />
              <Badge className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-cyber-blue/10 border-cyber-blue text-cyber-blue">
                {editMode ? "3D Preview" : "Your Agent"}
              </Badge>
            </div>
            
            {!editMode && (
              <div className="text-center space-y-3 w-full max-w-xs">
                <Label htmlFor="username" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Agent Name</span>
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your agent name"
                  className="text-center border-cyber-blue/30 focus:border-cyber-blue"
                  maxLength={20}
                />
              </div>
            )}
          </div>

          {/* Customization Options */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-cyber-blue/20">
              <CardContent className="p-6 space-y-6">
                <ColorPicker
                  colors={skinColors}
                  selected={character.skinColor}
                  onChange={(color) => setCharacter(prev => ({ ...prev, skinColor: color }))}
                  label="Skin Tone"
                />

                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Hair Style</span>
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {hairStyles.map(style => (
                      <Button
                        key={style.id}
                        variant={character.hairStyle === style.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCharacter(prev => ({ ...prev, hairStyle: style.id }))}
                        className={cn(
                          "h-auto py-3 px-2 flex flex-col items-center space-y-1 text-xs",
                          character.hairStyle === style.id && "bg-cyber-blue border-cyber-blue text-white"
                        )}
                      >
                        <span className="font-medium">{style.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <ColorPicker
                  colors={hairColors}
                  selected={character.hairColor}
                  onChange={(color) => setCharacter(prev => ({ ...prev, hairColor: color }))}
                  label="Hair Color"
                />

                <ColorPicker
                  colors={eyeColors}
                  selected={character.eyeColor}
                  onChange={(color) => setCharacter(prev => ({ ...prev, eyeColor: color }))}
                  label="Eye Color"
                />
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button 
                onClick={handleComplete} 
                disabled={!editMode && !username.trim()}
                className="flex-1 bg-cyber-blue hover:bg-cyber-blue/80 text-white"
                size="lg"
              >
                {editMode ? "Save 3D Character" : "Enter CyberCop Academy"}
              </Button>
              
              {editMode && onCancel && (
                <Button 
                  onClick={onCancel}
                  variant="outline"
                  size="lg"
                  className="border-cyber-orange text-cyber-orange hover:bg-cyber-orange/10"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
