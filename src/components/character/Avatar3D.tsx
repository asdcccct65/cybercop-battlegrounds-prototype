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

// Improved mesh, proportions, hair, and facial detail
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

  // --- PROPORTIONS: Heroic/anime, 7.5 heads tall ---
  // Body unit: head height = 0.23 (good sphere size for stylized anime)
  // Shoulders: widened, thighs/calf shape improved, waist tapered.
  // New Cel-shaded skin material with a soft gradient texture
  // Materials
  const skinMaterial = new THREE.MeshToonMaterial({
    color: character.skinColor, // Custom user color
    gradientMap: null // Will upgrade later with custom gradient
  })
  const hairMaterial = new THREE.MeshToonMaterial({
    color: character.hairColor, // Custom user color
    gradientMap: null
  })
  const clothingMaterial = new THREE.MeshToonMaterial({
    color: '#6783EC',
    gradientMap: null
  })
  const pantsMaterial = new THREE.MeshToonMaterial({
    color: '#2C3E50',
    gradientMap: null
  })
  const eyeMaterial = new THREE.MeshPhysicalMaterial({
    color: character.eyeColor,
    metalness: 0.15,
    roughness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05
  })
  // Face detail color
  const mouthColor = expression === 'happy' ? '#d53a3a' : '#85593a'
  // More realistic head and rig placement: proportions improved!
  return (
    <group ref={rootRef} position={[0, -1.55, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Hip root */}
      <group ref={hipsRef} position={[0, 1.1, 0]}>
        {/* Spine */}
        <group ref={spineRef} position={[0, 0.58, 0]}>
          {/* Torso - slightly V shape  */}
          <mesh position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.18, 0.21, 0.95, 18]} />
            <primitive object={clothingMaterial} />
          </mesh>
          {/* Chest: better definition */}
          <mesh position={[0, 0.90, 0.06]}>
            <boxGeometry args={[0.29, 0.18, 0.11]} />
            <primitive object={clothingMaterial} />
          </mesh>
          {/* Neck */}
          <group ref={neckRef} position={[0, 0.97, 0]}>
            {/* Head: improved anime shape */}
            <group ref={headRef} position={[0, 0.165, 0]}>
              {/* Anime head */}
              <mesh position={[0, 0.20, 0]}>
                <sphereGeometry args={[0.23, 28, 30]} />
                <primitive object={skinMaterial} />
              </mesh>
              {/* Face: more detail for anime */}
              {/* Eyes: large, oval, anime-like with soft shading */}
              <mesh position={[-0.066, 0.27, 0.198]}>
                <sphereGeometry args={[0.029, 13, 14]} />
                <primitive object={eyeMaterial} />
              </mesh>
              <mesh position={[0.066, 0.27, 0.198]}>
                <sphereGeometry args={[0.029, 13, 14]} />
                <primitive object={eyeMaterial} />
              </mesh>
              {/* Eye highlight */}
              <mesh position={[-0.059, 0.282, 0.217]}>
                <sphereGeometry args={[0.009, 5, 5]} />
                <meshBasicMaterial color="#fff" />
              </mesh>
              <mesh position={[0.074, 0.283, 0.218]}>
                <sphereGeometry args={[0.009, 5, 5]} />
                <meshBasicMaterial color="#fff" />
              </mesh>
              {/* Eyelids for blinking */}
              {isBlinking && (
                <>
                  <mesh position={[-0.066, 0.27, 0.20]}>
                    <boxGeometry args={[0.05, 0.017, 0.016]} />
                    <primitive object={skinMaterial} />
                  </mesh>
                  <mesh position={[0.066, 0.27, 0.20]}>
                    <boxGeometry args={[0.05, 0.017, 0.016]} />
                    <primitive object={skinMaterial} />
                  </mesh>
                </>
              )}
              {/* Nose: slightly more natural */}
              <mesh position={[0, 0.22, 0.206]}>
                <cylinderGeometry args={[0.006, 0.008, 0.025, 8]} />
                <primitive object={skinMaterial} />
              </mesh>
              {/* Mouth: more expressive curve */}
              <mesh position={[0, 0.192, 0.194]} rotation={expression === 'happy' ? [0, 0, 0.09] : expression === "determined" ? [0, 0, -0.07] : [0, 0, 0]}>
                <boxGeometry args={expression === "happy" ? [0.042, 0.009, 0.01] : expression === "determined" ? [0.036, 0.006, 0.009] : [0.027, 0.005, 0.007]} />
                <meshBasicMaterial color={mouthColor} />
              </mesh>
              {/* Cheek blush */}
              {expression === "happy" && (
                <>
                  <mesh position={[-0.1, 0.222, 0.189]}>
                    <sphereGeometry args={[0.013, 7, 7]} />
                    <meshBasicMaterial color="#ffbdbd" />
                  </mesh>
                  <mesh position={[0.1, 0.222, 0.189]}>
                    <sphereGeometry args={[0.013, 7, 7]} />
                    <meshBasicMaterial color="#ffbdbd" />
                  </mesh>
                </>
              )}
              {/* --- CUSTOM LAYERED HAIR STYLES --- */}
              <group ref={hairRef} position={[0, 0.20, 0]}>
                {/* All hair meshes layer together according to chosen style */}
                {character.hairStyle === "afro" && (
                  <>
                    {/* Large sphere with three blobs */}
                    <mesh position={[0, 0.03, 0]}>
                      <sphereGeometry args={[0.25, 18, 16]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                    <mesh position={[0.12, 0.08, 0]}>
                      <sphereGeometry args={[0.13, 10, 14]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                    <mesh position={[-0.12, 0.10, 0]}>
                      <sphereGeometry args={[0.13, 10, 14]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                  </>
                )}
                {character.hairStyle === "ponytail" && (
                  <>
                    {/* Volume on top */}
                    <mesh position={[0, 0.05, 0]}>
                      <sphereGeometry args={[0.19, 17, 16]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                    {/* Ponytail strand: cylinder gently arcing back */}
                    <mesh position={[0, -0.06, -0.26]} rotation={[0.6, 0, 0]}>
                      <cylinderGeometry args={[0.038, 0.018, 0.38, 10]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                  </>
                )}
                {character.hairStyle === "curly" && (
                  <>
                    {/* Top */}
                    <mesh position={[0, 0.08, 0]}>
                      <sphereGeometry args={[0.19, 14, 14]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                    {/* Side curls */}
                    <mesh position={[-0.10, 0.05, 0.13]}>
                      <sphereGeometry args={[0.07, 9, 10]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                    <mesh position={[0.10, 0.05, 0.12]}>
                      <sphereGeometry args={[0.07, 9, 10]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                  </>
                )}
                {character.hairStyle === "long" && (
                  <>
                    {/* Soft cap */}
                    <mesh position={[0, 0.07, 0]}>
                      <sphereGeometry args={[0.19, 18, 15]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                    {/* Back hair curtain: elongated sphere */}
                    <mesh position={[0, -0.09, -0.11]} rotation={[0.30, 0, 0]}>
                      <sphereGeometry args={[0.135, 13, 13]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                  </>
                )}
                {/* Short/Default style */}
                {["short", "buzz-cut"].includes(character.hairStyle) && (
                  <mesh>
                    <sphereGeometry args={[0.173, 16, 15]} />
                    <primitive object={hairMaterial} />
                  </mesh>
                )}
                {/* Mohawk style example */}
                {character.hairStyle === "mohawk" && (
                  <>
                    {/* Side fade */}
                    <mesh position={[0, 0.05, 0]}>
                      <sphereGeometry args={[0.148, 12, 10]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                    {/* Mohawk strip */}
                    <mesh position={[0, 0.12, 0]}>
                      <cylinderGeometry args={[0.025, 0.025, 0.43, 6]} />
                      <primitive object={hairMaterial} />
                    </mesh>
                  </>
                )}
                {/* Bald: render nothing */}
              </group>
            </group>
          </group>
          {/* Shoulders (wider) and arms - HEROIC proportions & accurate joint placement */}
          <group ref={leftShoulderRef} position={[-0.24, 0.93, 0]}>
            <group ref={leftArmRef} position={[0, -0.13, 0]} rotation={[0, 0, 0.09]}>
              {/* Upper arm */}
              <mesh position={[0, -0.19, 0]}>
                <cylinderGeometry args={[0.047, 0.06, 0.37, 11]} />
                <primitive object={skinMaterial} />
              </mesh>
              <group ref={leftForearmRef} position={[0, -0.349, 0]}>
                <mesh position={[0, -0.13, 0]}>
                  <cylinderGeometry args={[0.035, 0.041, 0.22, 11]} />
                  <primitive object={skinMaterial} />
                </mesh>
                {/* Hand (slimmer, more natural) */}
                <mesh position={[0, -0.21, 0]}>
                  <sphereGeometry args={[0.039, 9, 9]} />
                  <primitive object={skinMaterial} />
                </mesh>
              </group>
            </group>
          </group>
          <group ref={rightShoulderRef} position={[0.24, 0.93, 0]}>
            <group ref={rightArmRef} position={[0, -0.13, 0]} rotation={[0, 0, -0.09]}>
              <mesh position={[0, -0.19, 0]}>
                <cylinderGeometry args={[0.047, 0.06, 0.37, 11]} />
                <primitive object={skinMaterial} />
              </mesh>
              <group ref={rightForearmRef} position={[0, -0.349, 0]}>
                <mesh position={[0, -0.13, 0]}>
                  <cylinderGeometry args={[0.035, 0.041, 0.22, 11]} />
                  <primitive object={skinMaterial} />
                </mesh>
                <mesh position={[0, -0.21, 0]}>
                  <sphereGeometry args={[0.039, 9, 9]} />
                  <primitive object={skinMaterial} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
        {/* Waist */}
        <mesh position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.13, 0.171, 0.14, 15]} />
          <primitive object={pantsMaterial} />
        </mesh>
        {/* Hips/legs: natural athletic thigh shape, knees in the right place! */}
        <group ref={leftThighRef} position={[-0.088, 0.29, 0]}>
          <mesh position={[0, -0.21, 0]}>
            <cylinderGeometry args={[0.063, 0.07, 0.41, 12]} />
            <primitive object={pantsMaterial} />
          </mesh>
          {/* Knee joint is top of the calf! */}
          <group ref={leftCalfRef} position={[0, -0.41, 0]}>
            <mesh position={[0, -0.17, 0]}>
              <cylinderGeometry args={[0.044, 0.061, 0.29, 11]} />
              <primitive object={skinMaterial} />
            </mesh>
            {/* Foot */}
            <mesh position={[0, -0.34, 0.11]}>
              <boxGeometry args={[0.086, 0.062, 0.21]} />
              <meshToonMaterial color="#1a1a1a" />
            </mesh>
          </group>
        </group>
        <group ref={rightThighRef} position={[0.088, 0.29, 0]}>
          <mesh position={[0, -0.21, 0]}>
            <cylinderGeometry args={[0.063, 0.07, 0.41, 12]} />
            <primitive object={pantsMaterial} />
          </mesh>
          <group ref={rightCalfRef} position={[0, -0.41, 0]}>
            <mesh position={[0, -0.17, 0]}>
              <cylinderGeometry args={[0.044, 0.061, 0.29, 11]} />
              <primitive object={skinMaterial} />
            </mesh>
            <mesh position={[0, -0.34, 0.11]}>
              <boxGeometry args={[0.086, 0.062, 0.21]} />
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
          alpha: true
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
