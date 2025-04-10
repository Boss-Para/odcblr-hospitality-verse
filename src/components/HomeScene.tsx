
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Placeholder Hotel Component
const Hotel = ({ position, scale, onClick }: { position: [number, number, number], scale: number, onClick: () => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <mesh 
      position={position} 
      scale={[scale, scale, scale]} 
      ref={meshRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color={hovered ? "#FF9933" : "#FFFFFF"} />
      {hovered && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-black/80 text-white p-2 rounded-md text-xs">
            <p className="font-bold">Hotel Elegance</p>
            <p>5 waitstaff needed</p>
            <p>₹150/hour</p>
          </div>
        </Html>
      )}
    </mesh>
  );
};

// Placeholder Restaurant Component
const Restaurant = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });
  
  return (
    <mesh position={position} scale={[1, 0.5, 1]} ref={meshRef}>
      <cylinderGeometry args={[1, 1, 1, 32]} />
      <meshStandardMaterial color="#138808" />
    </mesh>
  );
};

// Student Avatar
const StudentAvatar = ({ position, speed = 0.05 }: { position: [number, number, number], speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [targetPos] = useState(new THREE.Vector3().fromArray(position));
  const [velocity] = useState(new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize().multiplyScalar(speed));
  const [clicked, setClicked] = useState(false);
  
  useFrame(() => {
    if (meshRef.current) {
      // Move student around
      meshRef.current.position.add(velocity);
      
      // Bounce off invisible boundaries
      if (Math.abs(meshRef.current.position.x) > 8) {
        velocity.x *= -1;
      }
      if (Math.abs(meshRef.current.position.z) > 8) {
        velocity.z *= -1;
      }
      
      // Face movement direction
      meshRef.current.lookAt(meshRef.current.position.clone().add(velocity));
    }
  });
  
  return (
    <mesh 
      position={position} 
      ref={meshRef} 
      onClick={() => setClicked(!clicked)}
    >
      <capsuleGeometry args={[0.3, 0.5, 8, 16]} />
      <meshStandardMaterial color="#000080" />
      {clicked && (
        <Html position={[0, 1.5, 0]} center>
          <div className="bg-white rounded-lg p-4 shadow-lg w-64 text-center animate-spin-slow">
            <h3 className="font-bold text-india-blue text-lg">Digital CV</h3>
            <img src="https://api.dicebear.com/7.x/micah/svg?seed=42" alt="Avatar" className="w-20 h-20 mx-auto my-2 rounded-full" />
            <p className="text-sm text-gray-700">Rahul Singh</p>
            <p className="text-xs text-gray-500">Hotel Management Student</p>
            <div className="mt-2">
              <p className="text-xs">Exp: 2 years • Rating: ★★★★☆</p>
              <p className="text-xs">Skills: Bartending, Hosting, Service</p>
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
};

// Logo Component
const Logo = ({ onClick }: { onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        position={[0, 4, 0]}
        fontSize={1.5}
        color="#FF9933"
        font="/fonts/Inter-Bold.woff"
        anchorX="center"
        anchorY="middle"
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        OdcBlR
        <meshStandardMaterial color={hovered ? "#138808" : "#FF9933"} emissive={hovered ? "#FF9933" : undefined} emissiveIntensity={hovered ? 0.5 : 0} />
      </Text>
    </Float>
  );
};

// CTA Button
const CtaButton = () => {
  const { viewport } = useThree();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!visible) return null;
  
  return (
    <Html position={[0, -3, 0]} center>
      <Button 
        className="bg-india-saffron hover:bg-india-green text-white text-lg px-8 py-6 rounded-full animate-pulse-glow shadow-lg"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        Invest Now
      </Button>
    </Html>
  );
};

// Main Scene
export const HomeScene = () => {
  const [voiceOver, setVoiceOver] = useState(false);
  
  const playVoiceOver = () => {
    setVoiceOver(true);
    toast.success("Welcome to India's hospitality future!", {
      duration: 5000,
      position: "top-center",
    });
    setTimeout(() => setVoiceOver(false), 5000);
  };
  
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.1} />
        
        {/* City Base */}
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#CCCCCC" />
        </mesh>
        
        {/* Buildings */}
        <Hotel position={[-4, 0, -3]} scale={1.5} onClick={() => toast.info("5 waitstaff needed at Grand Hotel!")} />
        <Hotel position={[3, 0, -2]} scale={1.2} onClick={() => toast.info("3 bartenders needed at Royal Palace!")} />
        <Hotel position={[-2, 0, 4]} scale={1.3} onClick={() => toast.info("2 hosts needed at Riverside Inn!")} />
        
        <Restaurant position={[4, 0, 2]} />
        <Restaurant position={[-3, 0, 0]} />
        <Restaurant position={[0, 0, -4]} />
        
        {/* Students */}
        <StudentAvatar position={[2, 0, 2]} speed={0.03} />
        <StudentAvatar position={[-2, 0, -2]} speed={0.04} />
        <StudentAvatar position={[0, 0, 3]} speed={0.02} />
        <StudentAvatar position={[3, 0, -3]} speed={0.05} />
        
        {/* Logo */}
        <Logo onClick={playVoiceOver} />
        
        {/* CTA Button */}
        <CtaButton />
      </Canvas>
    </div>
  );
};

export default HomeScene;
