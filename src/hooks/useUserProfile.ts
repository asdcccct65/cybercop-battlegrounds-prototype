
import { useState, useEffect } from "react"

export interface CharacterCustomization {
  skinColor: string
  hairStyle: string
  hairColor: string
  eyeColor: string
  equippedItems: {
    hat?: string
    helmet?: string
    sword?: string
    shield?: string
    accessory?: string
  }
}

export interface UserProfile {
  username: string
  shards: number
  character: CharacterCustomization
  unlockedItems: string[]
  completedMissions: number[]
  isNewUser: boolean
}

const defaultCharacter: CharacterCustomization = {
  skinColor: "#FDBCB4",
  hairStyle: "short",
  hairColor: "#8B4513",
  eyeColor: "#8B4513",
  equippedItems: {}
}

const defaultProfile: UserProfile = {
  username: "Cyber Agent",
  shards: 0,
  character: defaultCharacter,
  unlockedItems: [],
  completedMissions: [],
  isNewUser: true
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)

  // Load profile from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cybercop-user-profile')
    if (saved) {
      try {
        const parsedProfile = JSON.parse(saved)
        setProfile({ ...defaultProfile, ...parsedProfile })
      } catch (error) {
        console.error('Failed to load user profile:', error)
      }
    }
  }, [])

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cybercop-user-profile', JSON.stringify(profile))
  }, [profile])

  const updateCharacter = (updates: Partial<CharacterCustomization>) => {
    setProfile(prev => ({
      ...prev,
      character: { ...prev.character, ...updates }
    }))
  }

  const addShards = (amount: number) => {
    setProfile(prev => ({
      ...prev,
      shards: prev.shards + amount
    }))
  }

  const spendShards = (amount: number) => {
    setProfile(prev => ({
      ...prev,
      shards: Math.max(0, prev.shards - amount)
    }))
  }

  const unlockItem = (itemId: string) => {
    setProfile(prev => ({
      ...prev,
      unlockedItems: [...new Set([...prev.unlockedItems, itemId])]
    }))
  }

  const equipItem = (slot: keyof CharacterCustomization['equippedItems'], itemId: string | undefined) => {
    setProfile(prev => ({
      ...prev,
      character: {
        ...prev.character,
        equippedItems: {
          ...prev.character.equippedItems,
          [slot]: itemId
        }
      }
    }))
  }

  const completeOnboarding = (username: string, character: CharacterCustomization) => {
    setProfile(prev => ({
      ...prev,
      username,
      character,
      isNewUser: false
    }))
  }

  return {
    profile,
    updateCharacter,
    addShards,
    spendShards,
    unlockItem,
    equipItem,
    completeOnboarding
  }
}
