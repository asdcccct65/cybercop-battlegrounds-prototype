
import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, extend, ThreeElements } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { CharacterCustomization } from '@/hooks/useUserProfile'

// Extend Three.js elements for JSX
extend(THREE)

// Declare module to include Three.js elements in JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: ThreeElements['group']
      mesh: ThreeElements['mesh']
      sphereGeometry: ThreeElements['sphereGeometry']
      cylinderGeometry: ThreeElements['cylinderGeometry']
      boxGeometry: ThreeElements['boxGeometry']
      meshPhysicalMaterial: ThreeElements['meshPhysicalMaterial']
      primitive: ThreeElements['primitive']
    }
  }
}

interface Avatar3DProps {
  character: CharacterCustomization
  animation?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  allowRotation?: boolean
  className?: string
}

// 3D Avatar Mesh Component
function AvatarMesh({ character, animation = 'idle' }: { character: CharacterCustomization, animation: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const hairRef = useRef<THREE.Group>(null)
  const torsoRef = useRef<THREE.Mesh>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const leftLegRef = useRef<THREE.Mesh>(null)
  const rightLegRef = useRef<THREE.Mesh>(null)
  
  const [time, setTime] = useState(0)

  // Animation system
  useFrame((state, delta) => {
    setTime(prev => prev + delta)
    
    if (!groupRef.current) return

    // Breathing animation
    const breathe = Math.sin(time * 2) * 0.02 + 1
    if (torsoRef.current) {
      torsoRef.current.scale.y = breathe
    }

    // Idle head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.8) * 0.1
      headRef.current.rotation.x = Math.sin(time * 0.6) * 0.05
    }

    // Hair physics
    if (hairRef.current) {
      hairRef.current.rotation.y = Math.sin(time * 1.2) * 0.03
      hairRef.current.position.y = Math.sin(time * 2.5) * 0.005
    }

    // Animation-specific movements
    switch (animation) {
      case 'wave':
        if (rightArmRef.current) {
          rightArmRef.current.rotation.z = Math.sin(time * 4) * 0.5 - 0.5
          rightArmRef.current.rotation.x = Math.sin(time * 4) * 0.2
        }
        break
      case 'heroic':
        if (groupRef.current) {
          groupRef.current.position.y = Math.sin(time * 1.5) * 0.1
        }
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = 0.3
          rightArmRef.current.rotation.z = -0.3
        }
        break
      case 'typing':
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(time * 6) * 0.1 - 0.3
          rightArmRef.current.rotation.x = Math.sin(time * 6 + Math.PI) * 0.1 - 0.3
        }
        break
      case 'walk':
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = Math.sin(time * 3) * 0.3
          rightLegRef.current.rotation.x = Math.sin(time * 3 + Math.PI) * 0.3
        }
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(time * 3 + Math.PI) * 0.2
          rightArmRef.current.rotation.x = Math.sin(time * 3) * 0.2
        }
        break
    }
  })

  // Create materials with proper shading
  const skinMaterial = new THREE.MeshPhysicalMaterial({
    color: character.skinColor,
    roughness: 0.8,
    metalness: 0.1,
    clearcoat: 0.1,
  })

  const hairMaterial = new THREE.MeshPhysicalMaterial({
    color: character.hairColor,
    roughness: 0.9,
    metalness: 0.05,
  })

  const clothingMaterial = new THREE.MeshPhysicalMaterial({
    color: '#4A90E2',
    roughness: 0.7,
    metalness: 0.1,
    normalScale: new THREE.Vector2(0.3, 0.3),
  })

  const pantsMaterial = new THREE.MeshPhysicalMaterial({
    color: '#2C3E50',
    roughness: 0.8,
    metalness: 0.1,
  })

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.6, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <primitive object={skinMaterial} />
      </mesh>

      {/* Hair */}
      <group ref={hairRef} position={[0, 1.6, 0]}>
        {character.hairStyle !== 'bald' && (
          <mesh castShadow>
            <sphereGeometry args={[0.28, 24, 24]} />
            <primitive object={hairMaterial} />
          </mesh>
        )}
      </group>

      {/* Eyes */}
      <mesh position={[-0.08, 1.65, 0.22]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshPhysicalMaterial color={character.eyeColor} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0.08, 1.65, 0.22]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshPhysicalMaterial color={character.eyeColor} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Torso - slimmed down */}
      <mesh ref={torsoRef} position={[0, 1.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.8, 16]} />
        <primitive object={clothingMaterial} />
      </mesh>

      {/* Arms - more proportional */}
      <mesh ref={leftArmRef} position={[-0.35, 1.2, 0]} rotation={[0, 0, 0.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.6, 12]} />
        <primitive object={skinMaterial} />
      </mesh>
      <mesh ref={rightArmRef} position={[0.35, 1.2, 0]} rotation={[0, 0, -0.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.6, 12]} />
        <primitive object={skinMaterial} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.42, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <primitive object={skinMaterial} />
      </mesh>
      <mesh position={[0.42, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <primitive object={skinMaterial} />
      </mesh>

      {/* Waist - slim */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.2, 16]} />
        <primitive object={clothingMaterial} />
      </mesh>

      {/* Legs - slimmed and more natural */}
      <mesh ref={leftLegRef} position={[-0.12, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.7, 12]} />
        <primitive object={pantsMaterial} />
      </mesh>
      <mesh ref={rightLegRef} position={[0.12, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.7, 12]} />
        <primitive object={pantsMaterial} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.12, -0.25, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.08, 0.25]} />
        <meshPhysicalMaterial color="#1A1A1A" roughness={0.9} />
      </mesh>
      <mesh position={[0.12, -0.25, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.08, 0.25]} />
        <meshPhysicalMaterial color="#1A1A1A" roughness={0.9} />
      </mesh>
    </group>
  )
}

export const Avatar3D: React.FC<Avatar3DProps> = ({
  character,
  animation = 'idle',
  size = 'md',
  allowRotation = false,
  className = ''
}) => {
  const sizeMap = {
    sm: { width: 150, height: 200 },
    md: { width: 250, height: 300 },
    lg: { width: 350, height: 400 },
    xl: { width: 450, height: 500 }
  }

  const dimensions = sizeMap[size]

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden border-2 border-cyber-blue/20 ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 1, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting setup for 3D effect */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-2, 2, 2]} intensity={0.5} color="#22D3EE" />
        <pointLight position={[2, -1, 1]} intensity={0.3} color="#A855F7" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Avatar */}
        <AvatarMesh character={character} animation={animation} />

        {/* Ground shadows */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={2}
          blur={2}
          far={4}
        />

        {/* Camera controls */}
        {allowRotation && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
          />
        )}
      </Canvas>

      {/* Overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
        3D Avatar
      </div>
    </div>
  )
}
