import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import base64ToArrayBuffer from "@utils/base64ToArrayBuffer"
import axios from 'axios'
import * as THREE from 'three'
import { type ObjectMap } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

function useLoaderGLB(
    url: string,
): GLTF & ObjectMap {
    // states
    const [glb, setGLB] = React.useState<GLTF & ObjectMap>()
   
    // loader
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('../node_modules/three/examples/jsm/libs/draco/gltf/')
    loader.setDRACOLoader(dracoLoader)
    
    // request
    React.useEffect(()=>{
        axios.get<string>(url).then((res)=>{
            const glb_array_buffer = base64ToArrayBuffer(res.data)
            loader.parse(glb_array_buffer, '', (gltf: GLTF)=>{
                const nodes = {}, materials = {}
                gltf.scene.traverse((child: THREE.Object3D) => {
                    if (child instanceof THREE.Mesh) {
                        nodes[child.name] = child
                        materials[(child.material as THREE.Material).name] = child.material
                    }
                })
                console.log(`gltf: ${JSON.stringify(gltf)}`)
                setGLB({...gltf, nodes: nodes, materials: materials})
            })
        })
    }, [])
    console.log(`glb: ${glb}`)
    return {...glb}
}

export default useLoaderGLB