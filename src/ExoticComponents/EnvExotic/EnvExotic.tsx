import React from 'react'
import * as THREE from 'three'
import { Environment } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { RGBELoader } from 'three-stdlib'


const EnvExotic = ({ intensity=1, path='assets/3d/hdri/metro_vijzelgracht_1k.hdr' }) => {
    const texture = useLoader(RGBELoader, path)
    return (
        <Environment background>
            <color attach="background" args={['black']} />
            <mesh scale={100}>
                <sphereGeometry />
                <meshBasicMaterial transparent opacity={intensity} map={texture} side={THREE.BackSide} toneMapped={false} />
            </mesh>
        </Environment>
    )
}

export default EnvExotic