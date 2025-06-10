
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Star, Sparkles, Crown, Gem } from "lucide-react"
import { useUserProfile } from "@/hooks/useUserProfile"
import { CharacterAvatar } from "../character/CharacterAvatar"

interface StoreItem {
  id: string
  name: string
  type: "headgear" | "weapon" | "shield" | "accessory" | "outfit" | "companion"
  subtype?: string
  price: number
  rarity: "common" | "rare" | "epic" | "legendary"
  emoji: string
  description: string
}

const storeItems: StoreItem[] = [
  // Headgear
  { id: "basic-cap", name: "Agent Cap", type: "headgear", subtype: "hat", price: 25, rarity: "common", emoji: "🧢", description: "Standard issue cyber agent cap" },
  { id: "tactical-helmet", name: "Tactical Helmet", type: "headgear", subtype: "helmet", price: 50, rarity: "rare", emoji: "⛑️", description: "Military-grade protection helmet" },
  { id: "cyber-visor", name: "Cyber Visor", type: "headgear", subtype: "helmet", price: 75, rarity: "rare", emoji: "🥽", description: "High-tech heads-up display" },
  { id: "stealth-mask", name: "Stealth Mask", type: "headgear", subtype: "mask", price: 60, rarity: "rare", emoji: "🎭", description: "Infiltration specialist mask" },
  { id: "elite-crown", name: "Elite Crown", type: "headgear", subtype: "hat", price: 200, rarity: "legendary", emoji: "👑", description: "Ultimate status symbol" },
  { id: "neural-headset", name: "Neural Headset", type: "headgear", subtype: "helmet", price: 150, rarity: "epic", emoji: "🎧", description: "Direct neural interface" },

  // Weapons
  { id: "cyber-sword", name: "Cyber Sword", type: "weapon", subtype: "sword", price: 75, rarity: "rare", emoji: "⚔️", description: "High-tech energy blade" },
  { id: "data-axe", name: "Data Axe", type: "weapon", subtype: "axe", price: 80, rarity: "rare", emoji: "🪓", description: "Cleaves through firewalls" },
  { id: "hack-staff", name: "Hacker's Staff", type: "weapon", subtype: "staff", price: 90, rarity: "epic", emoji: "🔮", description: "Channel digital magic" },
  { id: "stealth-dagger", name: "Stealth Dagger", type: "weapon", subtype: "dagger", price: 45, rarity: "common", emoji: "🗡️", description: "Silent and deadly" },
  { id: "plasma-rifle", name: "Plasma Rifle", type: "weapon", subtype: "rifle", price: 120, rarity: "epic", emoji: "🔫", description: "Advanced energy weapon" },
  { id: "legendary-blade", name: "Excalibur.exe", type: "weapon", subtype: "sword", price: 300, rarity: "legendary", emoji: "🗡️", description: "The ultimate cyber weapon" },

  // Shields & Armor
  { id: "digital-shield", name: "Digital Shield", type: "shield", price: 60, rarity: "rare", emoji: "🛡️", description: "Advanced defensive matrix" },
  { id: "firewall-barrier", name: "Firewall Barrier", type: "shield", price: 85, rarity: "epic", emoji: "🔰", description: "Impenetrable cyber defense" },
  { id: "quantum-armor", name: "Quantum Armor", type: "shield", price: 110, rarity: "epic", emoji: "🦺", description: "Probability-based protection" },
  { id: "aegis-protocol", name: "Aegis Protocol", type: "shield", price: 250, rarity: "legendary", emoji: "⚔️", description: "Mythical defensive system" },

  // Accessories
  { id: "hacker-goggles", name: "Hacker Goggles", type: "accessory", subtype: "eyewear", price: 30, rarity: "common", emoji: "🕶️", description: "See through the matrix" },
  { id: "cyber-cape", name: "Cyber Cape", type: "accessory", subtype: "cloak", price: 70, rarity: "rare", emoji: "🧥", description: "Dramatic flair for cyber heroes" },
  { id: "data-gloves", name: "Data Gloves", type: "accessory", subtype: "gloves", price: 40, rarity: "common", emoji: "🧤", description: "Enhanced interface control" },
  { id: "power-belt", name: "Power Belt", type: "accessory", subtype: "belt", price: 55, rarity: "rare", emoji: "📿", description: "Utility storage and power boost" },
  { id: "holo-earrings", name: "Holo Earrings", type: "accessory", subtype: "jewelry", price: 35, rarity: "common", emoji: "💎", description: "Stylish holographic accessories" },
  { id: "phantom-cloak", name: "Phantom Cloak", type: "accessory", subtype: "cloak", price: 180, rarity: "epic", emoji: "👻", description: "Become one with the shadows" },

  // Outfits
  { id: "agent-suit", name: "Agent Suit", type: "outfit", price: 100, rarity: "rare", emoji: "🤵", description: "Professional cyber agent attire" },
  { id: "hacker-hoodie", name: "Hacker Hoodie", type: "outfit", price: 65, rarity: "common", emoji: "👕", description: "Casual underground style" },
  { id: "combat-gear", name: "Combat Gear", type: "outfit", price: 130, rarity: "epic", emoji: "🥋", description: "Battle-ready tactical outfit" },
  { id: "elite-uniform", name: "Elite Uniform", type: "outfit", price: 220, rarity: "legendary", emoji: "👔", description: "Top-tier agent uniform" },

  // Companions
  { id: "data-drone", name: "Data Drone", type: "companion", price: 90, rarity: "rare", emoji: "🚁", description: "Your personal reconnaissance bot" },
  { id: "cyber-pet", name: "Cyber Pet", type: "companion", price: 120, rarity: "epic", emoji: "🐱", description: "Digital companion with AI personality" },
  { id: "guardian-spirit", name: "Guardian Spirit", type: "companion", price: 200, rarity: "legendary", emoji: "👻", description: "Mystical digital protector" }
]

interface EquipmentStoreProps {
  isOpen: boolean
  onClose: () => void
}

export function EquipmentStore({ isOpen, onClose }: EquipmentStoreProps) {
  const { profile, spendShards, unlockItem, equipItem } = useUserProfile()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-green-500 border-green-500"
      case "rare": return "text-blue-500 border-blue-500"
      case "epic": return "text-purple-500 border-purple-500"
      case "legendary": return "text-orange-500 border-orange-500"
      default: return "text-gray-500 border-gray-500"
    }
  }

  const getRarityStars = (rarity: string) => {
    switch (rarity) {
      case "common": return 1
      case "rare": return 2
      case "epic": return 3
      case "legendary": return 4
      default: return 1
    }
  }

  const filteredItems = selectedCategory === "all" 
    ? storeItems 
    : storeItems.filter(item => item.type === selectedCategory)

  const handlePurchase = (item: StoreItem) => {
    if (profile.shards >= item.price && !profile.unlockedItems.includes(item.id)) {
      spendShards(item.price)
      unlockItem(item.id)
    }
  }

  const handleEquip = (item: StoreItem) => {
    // Map item types to character equipment slots
    const slotMapping = {
      headgear: 'hat' as const,
      weapon: 'sword' as const,
      shield: 'shield' as const,
      accessory: 'accessory' as const,
      outfit: 'hat' as const, // Could be expanded to separate outfit system
      companion: 'accessory' as const
    }
    
    const slot = slotMapping[item.type]
    const currentEquipped = profile.character.equippedItems[slot]
    
    if (currentEquipped === item.id) {
      equipItem(slot, undefined)
    } else {
      equipItem(slot, item.id)
    }
  }

  const isOwned = (itemId: string) => profile.unlockedItems.includes(itemId)
  const isEquipped = (item: StoreItem) => {
    const slotMapping = {
      headgear: 'hat' as const,
      weapon: 'sword' as const,
      shield: 'shield' as const,
      accessory: 'accessory' as const,
      outfit: 'hat' as const,
      companion: 'accessory' as const
    }
    const slot = slotMapping[item.type]
    return profile.character.equippedItems[slot] === item.id
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-cyber-blue" />
            <span className="text-2xl bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
              Equipment Store
            </span>
            <Badge variant="outline" className="ml-auto flex items-center space-x-1">
              <Gem className="h-4 w-4 text-cyber-blue" />
              <span>{profile.shards} Shards</span>
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Character Preview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <CharacterAvatar character={profile.character} size="lg" />
                <div className="text-center">
                  <p className="font-semibold">{profile.username}</p>
                  <p className="text-sm text-muted-foreground">
                    Level {Math.floor(profile.shards / 100) + 1}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Store Items */}
          <div className="lg:col-span-3">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="headgear">Head</TabsTrigger>
                <TabsTrigger value="weapon">Weapons</TabsTrigger>
                <TabsTrigger value="shield">Defense</TabsTrigger>
                <TabsTrigger value="accessory">Accessories</TabsTrigger>
                <TabsTrigger value="outfit">Outfits</TabsTrigger>
                <TabsTrigger value="companion">Companions</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map(item => (
                    <Card key={item.id} className={`hover:shadow-lg transition-all duration-300 ${getRarityColor(item.rarity)}`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <span className="text-2xl">{item.emoji}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex">
                            {Array.from({ length: getRarityStars(item.rarity) }).map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${getRarityColor(item.rarity)}`} fill="currentColor" />
                            ))}
                          </div>
                          <Badge variant="outline" className={`${getRarityColor(item.rarity)} capitalize`}>
                            {item.rarity}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="flex items-center space-x-1">
                            <Gem className="h-3 w-3" />
                            <span>{item.price}</span>
                          </Badge>
                          {isOwned(item.id) ? (
                            <Button
                              size="sm"
                              variant={isEquipped(item) ? "destructive" : "default"}
                              onClick={() => handleEquip(item)}
                            >
                              {isEquipped(item) ? "Unequip" : "Equip"}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handlePurchase(item)}
                              disabled={profile.shards < item.price}
                              className="bg-cyber-blue hover:bg-cyber-blue/80"
                            >
                              Buy
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
