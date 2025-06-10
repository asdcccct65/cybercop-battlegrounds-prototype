
import { useState, useEffect } from "react"

interface MissionProgress {
  missionId: number
  completedChallenges: number[]
  totalScore: number
  completedAt?: string
}

interface UseMissionProgressReturn {
  progress: MissionProgress[]
  saveProgress: (missionId: number, challengeId: number, points: number) => void
  getMissionProgress: (missionId: number) => MissionProgress | undefined
  resetMissionProgress: (missionId: number) => void
  getTotalScore: () => number
}

export function useMissionProgress(): UseMissionProgressReturn {
  const [progress, setProgress] = useState<MissionProgress[]>([])

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cybercop-mission-progress')
    if (saved) {
      try {
        setProgress(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load mission progress:', error)
      }
    }
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cybercop-mission-progress', JSON.stringify(progress))
  }, [progress])

  const saveProgress = (missionId: number, challengeId: number, points: number) => {
    setProgress(prev => {
      const existing = prev.find(p => p.missionId === missionId)
      
      if (existing) {
        // Update existing mission progress
        return prev.map(p => 
          p.missionId === missionId
            ? {
                ...p,
                completedChallenges: [...new Set([...p.completedChallenges, challengeId])],
                totalScore: p.totalScore + points
              }
            : p
        )
      } else {
        // Create new mission progress
        return [...prev, {
          missionId,
          completedChallenges: [challengeId],
          totalScore: points
        }]
      }
    })
  }

  const getMissionProgress = (missionId: number) => {
    return progress.find(p => p.missionId === missionId)
  }

  const resetMissionProgress = (missionId: number) => {
    setProgress(prev => prev.filter(p => p.missionId !== missionId))
  }

  const getTotalScore = () => {
    return progress.reduce((total, p) => total + p.totalScore, 0)
  }

  return {
    progress,
    saveProgress,
    getMissionProgress,
    resetMissionProgress,
    getTotalScore
  }
}
