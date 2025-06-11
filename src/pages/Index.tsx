
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CyberLogo } from "@/components/CyberLogo"
import { CharacterCreator } from "@/components/character/CharacterCreator"
import { AnimatedAvatar } from "@/components/character/AnimatedAvatar"
import { EquipmentStore } from "@/components/store/EquipmentStore"
import { useUserProfile } from "@/hooks/useUserProfile"
import { ArrowRight, Shield, Target, Trophy, ShoppingBag, Gem, Edit3, Settings, Sparkles } from "lucide-react"

const Index = () => {
  const { profile, completeOnboarding, updateCharacter } = useUserProfile()
  const [showStore, setShowStore] = useState(false)
  const [showCharacterEdit, setShowCharacterEdit] = useState(false)
  const [avatarAnimation, setAvatarAnimation] = useState("idle")

  const handleCharacterSave = (character: any) => {
    updateCharacter(character)
    setShowCharacterEdit(false)
  }

  const userLevel = Math.floor(profile.shards / 100) + 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced User HUD with Animated Avatar */}
        {!profile.isNewUser && (
          <div className="fixed top-4 right-4 z-50 flex items-center space-x-3">
            <Card className="bg-card/90 backdrop-blur-sm border-cyber-blue/30 shadow-lg">
              <CardContent className="p-4 flex items-center space-x-4">
                <AnimatedAvatar 
                  character={profile.character} 
                  size="sm" 
                  animation="idle"
                />
                <div className="text-sm">
                  <p className="font-semibold flex items-center space-x-2">
                    <span>{profile.username}</span>
                    <Badge variant="outline" className="text-xs">Lv.{userLevel}</Badge>
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Gem className="h-4 w-4 text-cyber-blue" />
                      <span className="font-medium">{profile.shards}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-cyber-orange" />
                      <span>{profile.completedMissions.length}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowCharacterEdit(true)}
                    className="border-cyber-green text-cyber-green hover:bg-cyber-green/10"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowStore(true)}
                    className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="animate-fade-in">
            <CyberLogo size="lg" animated />
          </div>
          
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-purple bg-clip-text text-transparent">
              Master Cybersecurity Through Practice
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the ultimate cybersecurity training platform. Create your unique animated avatar, complete missions, 
              earn shards, and unlock legendary equipment as you master digital defense.
            </p>
            {!profile.isNewUser && (
              <div className="flex items-center justify-center space-x-4">
                <Badge variant="outline" className="bg-cyber-blue/10 border-cyber-blue text-cyber-blue">
                  Welcome back, Agent {profile.username}!
                </Badge>
                <Badge variant="outline" className="bg-cyber-green/10 border-cyber-green text-cyber-green">
                  Level {userLevel}
                </Badge>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button asChild size="lg" className="bg-cyber-blue hover:bg-cyber-blue/80 text-white">
              <Link to="/mode-selection">
                Start Training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {!profile.isNewUser && (
              <>
                <Button 
                  onClick={() => setShowStore(true)}
                  variant="outline" 
                  size="lg" 
                  className="border-cyber-green text-cyber-green hover:bg-cyber-green/10"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Equipment Store
                </Button>
                <Button 
                  onClick={() => setShowCharacterEdit(true)}
                  variant="outline" 
                  size="lg" 
                  className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10"
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Customize Avatar
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Character Showcase with Full Body Avatar */}
        {!profile.isNewUser && (
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-cyber-blue/10 via-cyber-green/10 to-cyber-purple/10 border-cyber-blue/30 hover:border-cyber-blue/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="text-center lg:text-left space-y-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent flex items-center space-x-2">
                      <Sparkles className="h-6 w-6 text-cyber-blue" />
                      <span>Agent {profile.username}</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Gem className="h-5 w-5 text-cyber-blue" />
                        <div>
                          <p className="font-semibold">{profile.shards}</p>
                          <p className="text-muted-foreground">Shards</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-cyber-orange" />
                        <div>
                          <p className="font-semibold">{profile.completedMissions.length}</p>
                          <p className="text-muted-foreground">Missions</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ShoppingBag className="h-5 w-5 text-cyber-green" />
                        <div>
                          <p className="font-semibold">{profile.unlockedItems.length}</p>
                          <p className="text-muted-foreground">Items</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Settings className="h-5 w-5 text-cyber-purple" />
                        <div>
                          <p className="font-semibold">Level {userLevel}</p>
                          <p className="text-muted-foreground">Agent Rank</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="relative">
                      <AnimatedAvatar 
                        character={profile.character} 
                        size="xl" 
                        animation={avatarAnimation}
                        showAnimationControls={true}
                        onAnimationChange={setAvatarAnimation}
                      />
                      <div className="absolute -inset-4 bg-gradient-to-r from-cyber-blue/20 to-cyber-green/20 rounded-xl animate-pulse opacity-50"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={() => setShowStore(true)}
                      className="w-full bg-cyber-blue hover:bg-cyber-blue/80"
                      size="lg"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Upgrade Equipment
                    </Button>
                    <Button 
                      onClick={() => setShowCharacterEdit(true)}
                      variant="outline"
                      className="w-full border-cyber-green text-cyber-green hover:bg-cyber-green/10"
                      size="lg"
                    >
                      <Edit3 className="mr-2 h-5 w-5" />
                      Customize Avatar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-blue/10">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-cyber-blue/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-cyber-blue" />
              </div>
              <CardTitle className="text-cyber-blue">Choose Your Team</CardTitle>
              <CardDescription>
                Join the Red Team as an ethical hacker or the Blue Team as a cybersecurity defender
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-cyber-green/20 hover:border-cyber-green/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-green/10">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-cyber-green/10 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-cyber-green" />
              </div>
              <CardTitle className="text-cyber-green">Earn Shards & Level Up</CardTitle>
              <CardDescription>
                Complete missions to earn Shards and unlock amazing equipment for your animated avatar
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-cyber-orange/20 hover:border-cyber-orange/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-orange/10">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-cyber-orange/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-cyber-orange" />
              </div>
              <CardTitle className="text-cyber-orange">Customize Your Agent</CardTitle>
              <CardDescription>
                Create your unique animated avatar and collect legendary gear as you progress through missions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-cyber-blue/10 via-cyber-green/10 to-cyber-purple/10 border-cyber-blue/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
              Ready to Begin Your Cyber Journey?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Create your unique animated avatar, master cybersecurity skills, and unlock an arsenal of legendary equipment. 
              Join thousands of agents who have elevated their skills through CyberCop's immersive training.
            </p>
            <Button asChild size="lg" className="bg-cyber-blue hover:bg-cyber-blue/80 text-white">
              <Link to="/mode-selection">
                Choose Your Path
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Character Creator for new users */}
      <CharacterCreator 
        isOpen={profile.isNewUser} 
        onComplete={completeOnboarding}
      />

      {/* Character Editor for existing users */}
      <CharacterCreator 
        isOpen={showCharacterEdit}
        editMode={true}
        currentCharacter={profile.character}
        currentUsername={profile.username}
        onSave={handleCharacterSave}
        onCancel={() => setShowCharacterEdit(false)}
      />

      {/* Equipment Store */}
      <EquipmentStore 
        isOpen={showStore} 
        onClose={() => setShowStore(false)} 
      />
    </div>
  )
}

export default Index
