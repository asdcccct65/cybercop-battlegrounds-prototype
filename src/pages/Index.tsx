import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Settings, Target, Trophy, Users } from "lucide-react"
import { useUserProfile } from "@/hooks/useUserProfile"
import { AdvancedAvatar } from "@/components/character/AdvancedAvatar"

const Index = () => {
  const navigate = useNavigate()
  const { profile, completeOnboarding } = useUserProfile()
  const [showCharacterCreator, setShowCharacterCreator] = useState(profile.isNewUser)
  const [username, setUsername] = useState(profile.username)
  const userLevel = Math.floor(profile.shards / 100) + 1
  const completedMissions = profile.completedMissions.length

  const handleComplete = () => {
    if (username.trim()) {
      completeOnboarding(username, profile.character)
      setShowCharacterCreator(false)
    }
  }

  useEffect(() => {
    if (!profile.isNewUser) {
      setShowCharacterCreator(false)
    }
  }, [profile.isNewUser])

  return (
    <>
      <main className="flex-1 p-6 cyber-grid matrix-bg">
        {/* Hero Section with Enhanced Avatar */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-purple bg-clip-text text-transparent">
                  Welcome to CyberCop Academy
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Master cybersecurity through immersive simulations, competitive missions, and hands-on learning. 
                  Join thousands of cyber agents protecting the digital frontier.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/mode-selection')}
                  size="lg" 
                  className="bg-cyber-blue hover:bg-cyber-blue/80 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-cyber-blue/25 transition-all duration-300"
                >
                  Start Training
                </Button>
                <Button 
                  onClick={() => setShowCharacterCreator(true)}
                  variant="outline" 
                  size="lg"
                  className="border-cyber-green text-cyber-green hover:bg-cyber-green/10 px-8 py-4 text-lg font-semibold"
                >
                  Customize Agent
                </Button>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20">
                  <div className="text-2xl font-bold text-cyber-blue">{profile.shards}</div>
                  <div className="text-sm text-muted-foreground">Shards Earned</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-cyber-green/10 border border-cyber-green/20">
                  <div className="text-2xl font-bold text-cyber-green">{userLevel}</div>
                  <div className="text-sm text-muted-foreground">Agent Level</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-cyber-purple/10 border border-cyber-purple/20">
                  <div className="text-2xl font-bold text-cyber-purple">{completedMissions}</div>
                  <div className="text-sm text-muted-foreground">Missions Done</div>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Avatar Display */}
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-cyber-blue">Agent {profile.username}</h2>
                <AdvancedAvatar 
                  character={profile.character} 
                  size="xl"
                  animation="heroic"
                  className="hover:scale-105 transition-transform duration-300"
                />
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setShowCharacterCreator(true)}
                    variant="outline"
                    size="sm"
                    className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Character
                  </Button>
                  <Button 
                    onClick={() => navigate('/settings')}
                    variant="outline"
                    size="sm"
                    className="border-cyber-green text-cyber-green hover:bg-cyber-green/10"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="border-cyber-blue/30 hover:border-cyber-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-blue/10 group cursor-pointer"
                  onClick={() => navigate('/missions')}>
              <CardHeader className="text-center">
                <Target className="h-12 w-12 mx-auto text-cyber-blue group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-cyber-blue">Active Missions</CardTitle>
                <CardDescription>Join live cybersecurity simulations</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-cyber-green/30 hover:border-cyber-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-green/10 group cursor-pointer"
                  onClick={() => navigate('/progress')}>
              <CardHeader className="text-center">
                <Trophy className="h-12 w-12 mx-auto text-cyber-green group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-cyber-green">Progress Tracker</CardTitle>
                <CardDescription>View achievements and badges</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-cyber-purple/30 hover:border-cyber-purple/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-purple/10 group cursor-pointer"
                  onClick={() => navigate('/mode-selection')}>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto text-cyber-purple group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-cyber-purple">Team Selection</CardTitle>
                <CardDescription>Choose Red or Blue Team missions</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>

      {/* Character Creator Modal */}
      <Dialog open={showCharacterCreator} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome, Cyber Agent!</DialogTitle>
            <DialogDescription>
              Set up your agent profile to begin your cybersecurity training.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Agent Name
              </Label>
              <Input id="name" value={username} onChange={(e) => setUsername(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <Button onClick={handleComplete}>
            Complete Onboarding
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Index
