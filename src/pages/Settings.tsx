
import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CharacterCreator } from "@/components/character/CharacterCreator"
import { AnimatedAvatar } from "@/components/character/AnimatedAvatar"
import { useUserProfile } from "@/hooks/useUserProfile"
import { useToast } from "@/hooks/use-toast"
import { 
  User, 
  Palette, 
  Volume2, 
  Bell, 
  Settings as SettingsIcon, 
  Save, 
  RotateCcw,
  Sparkles,
  Shield,
  Gem
} from "lucide-react"

const Settings = () => {
  const { profile, updateCharacter } = useUserProfile()
  const { toast } = useToast()
  
  const [showCharacterEditor, setShowCharacterEditor] = useState(false)
  const [settings, setSettings] = useState({
    username: profile.username,
    email: "agent@cybercop.dev", // Demo email
    idleAnimations: true,
    soundEffects: true,
    notifications: true,
    autoSave: true
  })
  
  const [hasChanges, setHasChanges] = useState(false)

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Here you would typically save to backend/localStorage
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    })
    setHasChanges(false)
  }

  const handleReset = () => {
    setSettings({
      username: profile.username,
      email: "agent@cybercop.dev",
      idleAnimations: true,
      soundEffects: true,
      notifications: true,
      autoSave: true
    })
    setHasChanges(false)
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults.",
    })
  }

  const handleCharacterSave = (character: any) => {
    updateCharacter(character)
    setShowCharacterEditor(false)
    toast({
      title: "Avatar Updated",
      description: "Your character customization has been saved.",
    })
  }

  const userLevel = Math.floor(profile.shards / 100) + 1

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <SettingsIcon className="h-8 w-8 text-cyber-blue" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
              Settings & Preferences
            </h1>
          </div>
          <p className="text-muted-foreground">
            Customize your CyberCop experience and manage your agent profile
          </p>
        </div>

        {/* Profile Overview */}
        <Card className="border-cyber-blue/30 bg-gradient-to-r from-cyber-blue/5 to-cyber-green/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-cyber-blue" />
              <span>Agent Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6 items-center">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Agent Name</Label>
                  <Input
                    id="username"
                    value={settings.username}
                    onChange={(e) => handleSettingChange('username', e.target.value)}
                    className="border-cyber-blue/30 focus:border-cyber-blue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                    className="border-cyber-blue/30 focus:border-cyber-blue"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <AnimatedAvatar 
                  character={profile.character} 
                  size="lg"
                  animation="idle"
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-cyber-blue" />
                    <div>
                      <p className="font-semibold">Level {userLevel}</p>
                      <p className="text-muted-foreground">Agent Rank</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gem className="h-4 w-4 text-cyber-green" />
                    <div>
                      <p className="font-semibold">{profile.shards}</p>
                      <p className="text-muted-foreground">Shards</p>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowCharacterEditor(true)}
                  className="w-full bg-cyber-green hover:bg-cyber-green/80"
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Customize Avatar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Animation Preferences */}
        <Card className="border-cyber-green/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-cyber-green" />
              <span>Animation Preferences</span>
            </CardTitle>
            <CardDescription>
              Control how your avatar behaves and moves throughout the application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="idle-animations">Idle Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Enable subtle movements when your avatar is not performing actions
                </p>
              </div>
              <Switch 
                id="idle-animations"
                checked={settings.idleAnimations}
                onCheckedChange={(checked) => handleSettingChange('idleAnimations', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-save">Auto-save Preferences</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save your settings and progress
                </p>
              </div>
              <Switch 
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sound & Notifications */}
        <Card className="border-cyber-purple/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5 text-cyber-purple" />
              <span>Audio & Notifications</span>
            </CardTitle>
            <CardDescription>
              Manage sound effects and notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound-effects">Sound Effects</Label>
                <p className="text-sm text-muted-foreground">
                  Play audio feedback for actions and interactions
                </p>
              </div>
              <Switch 
                id="sound-effects"
                checked={settings.soundEffects}
                onCheckedChange={(checked) => handleSettingChange('soundEffects', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Mission Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for new missions and achievements
                </p>
              </div>
              <Switch 
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="border-cyber-orange/30">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="border-cyber-orange text-cyber-orange hover:bg-cyber-orange/10"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!hasChanges}
                className="bg-cyber-blue hover:bg-cyber-blue/80"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
                {hasChanges && <Badge variant="destructive" className="ml-2">•</Badge>}
              </Button>
            </div>
            {hasChanges && (
              <p className="text-sm text-muted-foreground mt-2 text-right">
                You have unsaved changes
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Character Editor Modal */}
      <CharacterCreator 
        isOpen={showCharacterEditor}
        editMode={true}
        currentCharacter={profile.character}
        currentUsername={profile.username}
        onSave={handleCharacterSave}
        onCancel={() => setShowCharacterEditor(false)}
      />
    </div>
  )
}

export default Settings
