
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
      meshToonMaterial: ThreeElements['meshToonMaterial']
      primitive: ThreeElements['primitive']
    }
  }
}

interface Avatar3DProps {
  character: CharacterCustomization
  animation?: string
  expression?: 'neutral' | 'happy' | 'determined'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  allowRotation?: boolean
  className?: string
}

// Enhanced 3D Avatar Mesh Component with proper rigging
function AvatarMesh({ 
  character, 
  animation = 'idle', 
  expression = 'neutral' 
}: { 
  character: CharacterCustomization
  animation: string
  expression: string
}) {
  // Bone references for proper rigging
  const rootRef = useRef<THREE.Group>(null)
  const spineRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const neckRef = useRef<THREE.Group>(null)
  const leftShoulderRef = useRef<THREE.Group>(null)
  const rightShoulderRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftForearmRef = useRef<THREE.Group>(null)
  const rightForearmRef = useRef<THREE.Group>(null)
  const hipsRef = useRef<THREE.Group>(null)
  const leftThighRef = useRef<THREE.Group>(null)
  const rightThighRef = useRef<THREE.Group>(null)
  const leftCalfRef = useRef<THREE.Group>(null)
  const rightCalfRef = useRef<THREE.Group>(null)
  const hairRef = useRef<THREE.Group>(null)
  
  const [time, setTime] = useState(0)
  const [blinkTimer, setBlinkTimer] = useState(0)
  const [isBlinking, setIsBlinking] = useState(false)

  // Advanced animation system
  useFrame((state, delta) => {
    setTime(prev => prev + delta)
    setBlinkTimer(prev => prev + delta)
    
    // Blinking system
    if (blinkTimer > 4 + Math.random() * 2 && !isBlinking) {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
      setBlinkTimer(0)
    }
    
    if (!rootRef.current) return

    // Base breathing animation (affects spine)
    const breathe = Math.sin(time * 1.5) * 0.015 + 1
    if (spineRef.current) {
      spineRef.current.scale.y = breathe
      spineRef.current.position.y = (breathe - 1) * 0.1
    }

    // Subtle head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.7) * 0.05
      headRef.current.rotation.x = Math.sin(time * 0.5) * 0.02
    }

    // Hair physics
    if (hairRef.current) {
      hairRef.current.rotation.y = Math.sin(time * 1.1) * 0.02
      hairRef.current.position.y = Math.sin(time * 2.2) * 0.003
    }

    // Weight shift animation
    const weightShift = Math.sin(time * 0.8) * 0.008
    if (hipsRef.current) {
      hipsRef.current.rotation.z = weightShift
      hipsRef.current.position.x = weightShift * 0.5
    }

    // Animation-specific behaviors
    switch (animation) {
      case 'wave':
        if (rightShoulderRef.current && rightArmRef.current) {
          rightShoulderRef.current.rotation.z = Math.sin(time * 3) * 0.3 - 0.5
          rightArmRef.current.rotation.z = Math.sin(time * 3) * 0.4
          rightForearmRef.current!.rotation.x = Math.sin(time * 3) * 0.2 - 0.3
        }
        break
        
      case 'heroic':
        if (leftShoulderRef.current && rightShoulderRef.current) {
          leftShoulderRef.current.rotation.z = 0.2
          rightShoulderRef.current.rotation.z = -0.2
          leftArmRef.current!.rotation.x = -0.1
          rightArmRef.current!.rotation.x = -0.1
        }
        if (rootRef.current) {
          rootRef.current.position.y = Math.sin(time * 1.2) * 0.05
        }
        break
        
      case 'typing':
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(time * 4) * 0.1 - 0.4
          rightArmRef.current.rotation.x = Math.sin(time * 4 + Math.PI) * 0.1 - 0.4
          leftForearmRef.current!.rotation.x = Math.sin(time * 4) * 0.15 - 0.2
          rightForearmRef.current!.rotation.x = Math.sin(time * 4 + Math.PI) * 0.15 - 0.2
        }
        break
        
      case 'walk':
        const walkCycle = time * 2
        if (leftThighRef.current && rightThighRef.current) {
          leftThighRef.current.rotation.x = Math.sin(walkCycle) * 0.4
          rightThighRef.current.rotation.x = Math.sin(walkCycle + Math.PI) * 0.4
          leftCalfRef.current!.rotation.x = Math.max(0, Math.sin(walkCycle + Math.PI * 0.5) * 0.6)
          rightCalfRef.current!.rotation.x = Math.max(0, Math.sin(walkCycle + Math.PI * 1.5) * 0.6)
        }
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(walkCycle + Math.PI) * 0.3
          rightArmRef.current.rotation.x = Math.sin(walkCycle) * 0.3
        }
        break
    }
  })

  // Advanced materials with anime-style shading
  const createAnimeMaterial = (color: string, metalness = 0.1, roughness = 0.8) => {
    return new THREE.MeshToonMaterial({
      color,
      transparent: true,
      opacity: 0.95,
    })
  }

  const skinMaterial = createAnimeMaterial(character.skinColor, 0.05, 0.9)
  const hairMaterial = createAnimeMaterial(character.hairColor, 0.02, 0.95)
  const clothingMaterial = createAnimeMaterial('#4A90E2', 0.1, 0.7)
  const pantsMaterial = createAnimeMaterial('#2C3E50', 0.15, 0.8)

  // Eye material with proper shine
  const eyeMaterial = new THREE.MeshPhysicalMaterial({
    color: character.eyeColor,
    metalness: 0.1,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  })

  return (
    <group ref={rootRef} position={[0, -1.2, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* Hip bone - root of lower body */}
      <group ref={hipsRef} position={[0, 0.8, 0]}>
        
        {/* Spine bone - torso */}
        <group ref={spineRef} position={[0, 0.5, 0]}>
          
          {/* Torso mesh - heroic proportions */}
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.18, 0.7, 16]} />
            <primitive object={clothingMaterial} />
          </mesh>
          
          {/* Chest definition */}
          <mesh position={[0, 0.5, 0.05]} castShadow receiveShadow>
            <boxGeometry args={[0.25, 0.15, 0.1]} />
            <primitive object={clothingMaterial} />
          </mesh>
          
          {/* Neck bone */}
          <group ref={neckRef} position={[0, 0.7, 0]}>
            
            {/* Head bone */}
            <group ref={headRef} position={[0, 0.15, 0]}>
              
              {/* Head mesh - anime proportions */}
              <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.22, 24, 24]} />
                <primitive object={skinMaterial} />
              </mesh>
              
              {/* Anime-style eyes */}
              <mesh position={[-0.06, 0.15, 0.19]} castShadow>
                <sphereGeometry args={[0.025, 12, 12]} />
                <primitive object={eyeMaterial} />
              </mesh>
              <mesh position={[0.06, 0.15, 0.19]} castShadow>
                <sphereGeometry args={[0.025, 12, 12]} />
                <primitive object={eyeMaterial} />
              </mesh>
              
              {/* Eye highlights */}
              <mesh position={[-0.055, 0.16, 0.21]}>
                <sphereGeometry args={[0.008, 8, 8]} />
                <meshBasicMaterial color="white" />
              </mesh>
              <mesh position={[0.065, 0.16, 0.21]}>
                <sphereGeometry args={[0.008, 8, 8]} />
                <meshBasicMaterial color="white" />
              </mesh>
              
              {/* Eyelids for blinking */}
              {isBlinking && (
                <>
                  <mesh position={[-0.06, 0.15, 0.20]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.05, 0.01, 0.02]} />
                    <primitive object={skinMaterial} />
                  </mesh>
                  <mesh position={[0.06, 0.15, 0.20]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.05, 0.01, 0.02]} />
                    <primitive object={skinMaterial} />
                  </mesh>
                </>
              )}
              
              {/* Nose */}
              <mesh position={[0, 0.1, 0.20]} castShadow>
                <boxGeometry args={[0.008, 0.015, 0.008]} />
                <primitive object={skinMaterial} />
              </mesh>
              
              {/* Mouth based on expression */}
              <mesh 
                position={[0, 0.08, 0.19]} 
                rotation={expression === 'happy' ? [0, 0, 0.1] : [0, 0, 0]}
                castShadow
              >
                <boxGeometry args={expression === 'happy' ? [0.03, 0.005, 0.005] : [0.02, 0.003, 0.003]} />
                <meshBasicMaterial color={expression === 'happy' ? '#ff6b6b' : '#8b4513'} />
              </mesh>
              
              {/* Hair group */}
              <group ref={hairRef} position={[0, 0.12, 0]}>
                {character.hairStyle !== 'bald' && (
                  <>
                    {/* Base hair volume */}
                    <mesh castShadow>
                      <sphereGeometry args={[0.26, 16, 16]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                    
                    {/* Hair style specifics */}
                    {character.hairStyle === 'ponytail' && (
                      <mesh position={[0, -0.1, -0.25]} rotation={[0.3, 0, 0]} castShadow>
                        <cylinderGeometry args={[0.04, 0.02, 0.3, 8]} />
                        <primitive object={hairMaterial} />
                      </mesh>
                    )}
                    
                    {character.hairStyle === 'afro' && (
                      <>
                        <mesh position={[0.1, 0.05, 0.1]} castShadow>
                          <sphereGeometry args={[0.08, 12, 12]} />
                          <primitive object={hairMaterial} />
                        </mesh>
                        <mesh position={[-0.1, 0.05, 0.1]} castShadow>
                          <sphereGeometry args={[0.08, 12, 12]} />
                          <primitive object={hairMaterial} />
                        </mesh>
                        <mesh position={[0, 0.15, -0.05]} castShadow>
                          <sphereGeometry args={[0.12, 12, 12]} />
                          <primitive object={hairMaterial} />
                        </mesh>
                      </>
                    )}
                  </>
                )}
              </group>
            </group>
          </group>
          
          {/* Left shoulder bone */}
          <group ref={leftShoulderRef} position={[-0.22, 0.5, 0]}>
            
            {/* Left arm bone */}
            <group ref={leftArmRef} position={[0, -0.1, 0]} rotation={[0, 0, 0.1]}>
              
              {/* Upper arm mesh */}
              <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.045, 0.055, 0.3, 12]} />
                <primitive object={skinMaterial} />
              </mesh>
              
              {/* Left forearm bone */}
              <group ref={leftForearmRef} position={[0, -0.3, 0]}>
                
                {/* Forearm mesh */}
                <mesh position={[0, -0.12, 0]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.035, 0.045, 0.24, 12]} />
                  <primitive object={skinMaterial} />
                </mesh>
                
                {/* Hand */}
                <mesh position={[0, -0.26, 0]} castShadow>
                  <sphereGeometry args={[0.045, 12, 12]} />
                  <primitive object={skinMaterial} />
                </mesh>
              </group>
            </group>
          </group>
          
          {/* Right shoulder bone */}
          <group ref={rightShoulderRef} position={[0.22, 0.5, 0]}>
            
            {/* Right arm bone */}
            <group ref={rightArmRef} position={[0, -0.1, 0]} rotation={[0, 0, -0.1]}>
              
              {/* Upper arm mesh */}
              <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.045, 0.055, 0.3, 12]} />
                <primitive object={skinMaterial} />
              </mesh>
              
              {/* Right forearm bone */}
              <group ref={rightForearmRef} position={[0, -0.3, 0]}>
                
                {/* Forearm mesh */}
                <mesh position={[0, -0.12, 0]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.035, 0.045, 0.24, 12]} />
                  <primitive object={skinMaterial} />
                </mesh>
                
                {/* Hand */}
                <mesh position={[0, -0.26, 0]} castShadow>
                  <sphereGeometry args={[0.045, 12, 12]} />
                  <primitive object={skinMaterial} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
        
        {/* Waist */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.15, 0.15, 16]} />
          <primitive object={pantsMaterial} />
        </mesh>
        
        {/* Left thigh bone */}
        <group ref={leftThighRef} position={[-0.08, 0.2, 0]}>
          
          {/* Thigh mesh */}
          <mesh position={[0, -0.18, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.055, 0.07, 0.36, 12]} />
            <primitive object={pantsMaterial} />
          </mesh>
          
          {/* Left calf bone */}
          <group ref={leftCalfRef} position={[0, -0.36, 0]}>
            
            {/* Calf mesh */}
            <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.04, 0.055, 0.3, 12]} />
              <primitive object={skinMaterial} />
            </mesh>
            
            {/* Foot */}
            <mesh position={[0, -0.32, 0.08]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.06, 0.2]} />
              <meshToonMaterial color="#1a1a1a" />
            </mesh>
          </group>
        </group>
        
        {/* Right thigh bone */}
        <group ref={rightThighRef} position={[0.08, 0.2, 0]}>
          
          {/* Thigh mesh */}
          <mesh position={[0, -0.18, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.055, 0.07, 0.36, 12]} />
            <primitive object={pantsMaterial} />
          </mesh>
          
          {/* Right calf bone */}
          <group ref={rightCalfRef} position={[0, -0.36, 0]}>
            
            {/* Calf mesh */}
            <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.04, 0.055, 0.3, 12]} />
              <primitive object={skinMaterial} />
            </mesh>
            
            {/* Foot */}
            <mesh position={[0, -0.32, 0.08]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.06, 0.2]} />
              <meshToonMaterial color="#1a1a1a" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

export const Avatar3D: React.FC<Avatar3DProps> = ({
  character,
  animation = 'idle',
  expression = 'neutral',
  size = 'md',
  allowRotation = false,
  className = ''
}) => {
  const sizeMap = {
    sm: { width: 200, height: 250 },
    md: { width: 300, height: 350 },
    lg: { width: 400, height: 450 },
    xl: { width: 500, height: 550 }
  }

  const dimensions = sizeMap[size]

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden border-2 border-cyber-blue/30 bg-gradient-to-b from-slate-900 to-slate-800 ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <Canvas
        shadows={{
          enabled: true,
          type: THREE.PCFSoftShadowMap
        }}
        camera={{ 
          position: [2, 1.5, 3], 
          fov: 45,
          near: 0.1,
          far: 100
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          shadowMap: true
        }}
      >
        {/* Advanced lighting setup */}
        <ambientLight intensity={0.3} color="#f0f8ff" />
        
        {/* Main directional light */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Rim lighting for separation */}
        <directionalLight 
          position={[-3, 2, -5]} 
          intensity={0.4}
          color="#22d3ee"
        />
        
        {/* Fill light */}
        <pointLight 
          position={[2, -1, 2]} 
          intensity={0.3} 
          color="#a855f7" 
        />

        {/* Character with enhanced shading */}
        <AvatarMesh 
          character={character} 
          animation={animation}
          expression={expression}
        />

        {/* Enhanced ground shadows */}
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.6}
          scale={3}
          blur={2.5}
          far={4}
          color="#000020"
        />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Camera controls with constraints */}
        {allowRotation && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
            maxAzimuthAngle={Math.PI / 3}
            minAzimuthAngle={-Math.PI / 3}
            minDistance={2}
            maxDistance={6}
            target={[0, 0.5, 0]}
          />
        )}
      </Canvas>

      {/* Cyber grid overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
      
      {/* Quality badge */}
      <div className="absolute top-2 right-2 text-xs text-cyber-blue bg-background/90 px-2 py-1 rounded border border-cyber-blue/30">
        Anime 3D
      </div>
    </div>
  )
}
