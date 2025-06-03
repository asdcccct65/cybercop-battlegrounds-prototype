
import React from "react"
import { useNavigate } from "react-router-dom"
import { TeamCard } from "@/components/TeamCard"
import { useToast } from "@/hooks/use-toast"

const ModeSelection = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleTeamSelection = (team: "red" | "blue") => {
    toast({
      title: `${team === "red" ? "Red Team" : "Blue Team"} Selected!`,
      description: `Welcome to the ${team === "red" ? "Red Team" : "Blue Team"}. Redirecting to missions...`,
    })
    
    setTimeout(() => {
      navigate("/missions")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
          Choose Your Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select your role in the cybersecurity battlefield. Each team offers unique challenges 
          and learning opportunities tailored to different aspects of cybersecurity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <TeamCard
          title="Red Team"
          description="Take on the role of an ethical hacker. Learn offensive security techniques, penetration testing, and vulnerability assessment."
          color="red"
          skills={["Penetration Testing", "Social Engineering", "Exploit Development", "Network Scanning"]}
          difficulty="Advanced"
          onSelect={() => handleTeamSelection("red")}
        />

        <TeamCard
          title="Blue Team"
          description="Become a cybersecurity defender. Master incident response, threat hunting, and security monitoring techniques."
          color="blue"
          skills={["Incident Response", "Threat Hunting", "SIEM Management", "Forensics"]}
          difficulty="Intermediate"
          onSelect={() => handleTeamSelection("blue")}
        />
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground">
          Not sure which team to choose? You can always switch teams later or practice both approaches!
        </p>
      </div>
    </div>
  )
}

export default ModeSelection
