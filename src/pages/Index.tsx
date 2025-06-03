
import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CyberLogo } from "@/components/CyberLogo"
import { ArrowRight, Shield, Target, Trophy } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
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
              Join the ultimate cybersecurity training platform. Choose your side, complete missions, 
              and become an elite digital defender or ethical hacker.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button asChild size="lg" className="bg-cyber-blue hover:bg-cyber-blue/80 text-white">
              <Link to="/mode-selection">
                Start Training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
              <Link to="/learning">
                Learn More
              </Link>
            </Button>
          </div>
        </div>

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
              <CardTitle className="text-cyber-green">Real-World Missions</CardTitle>
              <CardDescription>
                Practice with realistic scenarios based on actual cybersecurity challenges
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-cyber-orange/20 hover:border-cyber-orange/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-orange/10">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-cyber-orange/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-cyber-orange" />
              </div>
              <CardTitle className="text-cyber-orange">Earn Badges</CardTitle>
              <CardDescription>
                Track your progress and earn achievement badges as you master new skills
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
              Join thousands of cybersecurity professionals who have enhanced their skills through CyberCop's 
              immersive training experience.
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
    </div>
  )
}

export default Index
