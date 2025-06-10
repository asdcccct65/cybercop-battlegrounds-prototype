
import React, { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Terminal, CheckCircle, XCircle } from "lucide-react"

interface TerminalSimulationProps {
  title: string
  prompt: string
  expectedCommands: string[]
  successResponse: string
  onComplete: () => void
  completed: boolean
}

export function TerminalSimulation({
  title,
  prompt,
  expectedCommands,
  successResponse,
  onComplete,
  completed
}: TerminalSimulationProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([prompt])
  const [isSuccess, setIsSuccess] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const handleCommand = () => {
    if (!input.trim()) return

    const newOutput = [...output, `$ ${input}`]
    
    const isCorrect = expectedCommands.some(cmd => 
      input.toLowerCase().includes(cmd.toLowerCase())
    )

    if (isCorrect) {
      newOutput.push(successResponse)
      newOutput.push("✅ Lab completed successfully!")
      setIsSuccess(true)
      setTimeout(() => onComplete(), 2000)
    } else {
      newOutput.push("Command not recognized or incorrect. Try again.")
    }

    setOutput(newOutput)
    setInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand()
    }
  }

  if (completed) {
    return (
      <Card className="border-cyber-green/30 bg-cyber-green/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyber-green">
            <CheckCircle className="h-5 w-5" />
            <span>{title} - Completed!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-cyber-green">✅ Terminal simulation completed successfully!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Terminal className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          ref={terminalRef}
          className="bg-black text-cyber-green p-4 rounded font-mono text-sm h-64 overflow-y-auto"
        >
          {output.map((line, index) => (
            <div key={index} className="mb-1">
              {line}
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <div className="flex-1 flex items-center space-x-2 bg-black p-2 rounded">
            <span className="text-cyber-green font-mono">$</span>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter command..."
              className="bg-transparent border-none text-cyber-green font-mono focus:ring-0"
              disabled={isSuccess}
            />
          </div>
          <Button 
            onClick={handleCommand}
            disabled={!input.trim() || isSuccess}
            className="bg-cyber-blue hover:bg-cyber-blue/80"
          >
            Execute
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
