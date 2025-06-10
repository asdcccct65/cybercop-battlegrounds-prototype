
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Star } from "lucide-react"
import { useUserProfile } from "@/hooks/useUserProfile"
import { CharacterAvatar } from "../character/CharacterAvatar"

interface StoreItem {
  id: string
  name: string
  type: "hat" | "helmet" | "sword" | "shield" | "accessory"
  price: number
  rarity: "common" | "rare" | "legendary"
  emoji: string
  description: string
}

const storeItems: StoreItem[] = [
  { id: "cyber-hat", name: "Cyber Hat", type: "hat", price: 25, rarity: "common", emoji: "🎩", description: "Classic cyber agent headwear" },
  { id: "tactical-helmet", name: "Tactical Helmet", type: "helmet", price: 50, rarity: "rare", emoji: "⛑️", description: "Military-grade protection" },
  { id: "cyber-sword", name: "Cyber Sword", type: "sword", price: 75, rarity: "rare", emoji: "⚔️", description: "High-tech energy blade" },
  { id: "digital-shield", name: "Digital Shield", type: "shield", price: 60, rarity: "rare", emoji: "🛡️", description: "Advanced defensive matrix" },
  { id: "hacker-goggles", name: "Hacker Goggles", type: "accessory", price: 30, rarity: "common", emoji: "🕶️", description: "See through the matrix" },
  { id: "legendary-crown", name: "Elite Crown", type: "hat", price: 200, rarity: "legendary", emoji: "👑", description: "Ultimate status symbol" },
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
      case "common": return "text-green-500"
      case "rare": return "text-blue-500"
      case "legendary": return "text-purple-500"
      default: return "text-gray-500"
    }
  }

  const getRarityStars = (rarity: string) => {
    switch (rarity) {
      case "common": return 1
      case "rare": return 2
      case "legendary": return 3
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
    const currentEquipped = profile.character.equippedItems[item.type]
    if (currentEquipped === item.id) {
      // Unequip
      equipItem(item.type, undefined)
    } else {
      // Equip
      equipItem(item.type, item.id)
    }
  }

  const isOwned = (itemId: string) => profile.unlockedItems.includes(itemId)
  const isEquipped = (item: StoreItem) => profile.character.equippedItems[item.type] === item.id

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-cyber-blue" />
            <span className="text-2xl bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
              Equipment Store
            </span>
            <Badge variant="outline" className="ml-auto">
              {profile.shards} Shards
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Character Preview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <CharacterAvatar character={profile.character} size="lg" />
                <p className="text-sm text-muted-foreground text-center">
                  {profile.username}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Store Items */}
          <div className="lg:col-span-3">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="hat">Hats</TabsTrigger>
                <TabsTrigger value="helmet">Helmets</TabsTrigger>
                <TabsTrigger value="sword">Swords</TabsTrigger>
                <TabsTrigger value="shield">Shields</TabsTrigger>
                <TabsTrigger value="accessory">Accessories</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map(item => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <span className="text-2xl">{item.emoji}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {Array.from({ length: getRarityStars(item.rarity) }).map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${getRarityColor(item.rarity)}`} fill="currentColor" />
                            ))}
                          </div>
                          <Badge variant="outline" className={getRarityColor(item.rarity)}>
                            {item.rarity}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{item.price} Shards</Badge>
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
