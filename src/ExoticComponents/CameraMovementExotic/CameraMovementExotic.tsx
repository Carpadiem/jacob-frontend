import React from 'react'
import storeStyling from '../../stores/storeStyling'
import { observer } from 'mobx-react-lite'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import storeGarage from '@stores/storeGarage'

const CameraMovementExotic = () => {
  const [vectorPositionForCamera, setvectorPositionForCamera] = React.useState<THREE.Vector3>(new THREE.Vector3(10, 3, 20))
  const [lookVectorForCamera, setLookVectorForCamera] = React.useState<THREE.Vector3>(new THREE.Vector3(-7, 2, 0))

  React.useEffect(() => {
    if (storeStyling.locationBodyparts === 'bumpers_front') {
      setvectorPositionForCamera(new THREE.Vector3(3, 1, 7))
      setLookVectorForCamera(new THREE.Vector3(0, 1, 0))
    } else if (storeStyling.locationBodyparts === 'bumpers_rear') {
      setvectorPositionForCamera(new THREE.Vector3(-7, 1, -3))
      setLookVectorForCamera(new THREE.Vector3(0, 1, 0))
    } else if (storeStyling.locationBodyparts === 'skirts') {
      setvectorPositionForCamera(new THREE.Vector3(0, 0.7, 5))
      setLookVectorForCamera(new THREE.Vector3(-0.5, 0.55, 0))
    } else if (storeStyling.locationBodyparts === 'bonnets') {
      setvectorPositionForCamera(new THREE.Vector3(3, 2, 6))
      setLookVectorForCamera(new THREE.Vector3(0, 0.6, 0))
    } else if (storeStyling.locationBodyparts === 'spoilers') {
      setvectorPositionForCamera(new THREE.Vector3(-8, 1.6, -2))
      setLookVectorForCamera(new THREE.Vector3(0, 1, 0))
    } else if (storeStyling.locationBodyparts === 'splitters') {
      setvectorPositionForCamera(new THREE.Vector3(2.5, 1, 5.5))
      setLookVectorForCamera(new THREE.Vector3(0, 0.3, 0))
    } else if (storeStyling.locationBodyparts === 'diffusers') {
      setvectorPositionForCamera(new THREE.Vector3(-6, 0.7, -4))
      setLookVectorForCamera(new THREE.Vector3(0, 0.6, 0))
    } else if (storeStyling.locationBodyparts === 'canards') {
      setvectorPositionForCamera(new THREE.Vector3(2, 0.5, 5))
      setLookVectorForCamera(new THREE.Vector3(0.6, 0.4, 0))
    } else if (storeStyling.locationBodyparts === 'wings_front') {
      setvectorPositionForCamera(new THREE.Vector3(-1, 1.5, 6))
      setLookVectorForCamera(new THREE.Vector3(0.6, 0.4, 0))
    } else if (storeStyling.locationBodyparts === 'wings_rear') {
      setvectorPositionForCamera(new THREE.Vector3(-7, 2, 1))
      setLookVectorForCamera(new THREE.Vector3(-0.5, 0.6, 0))
    } else if (storeStyling.locationBodyparts === 'exhausts') {
      setvectorPositionForCamera(new THREE.Vector3(-6, 0.7, -4))
      setLookVectorForCamera(new THREE.Vector3(0, 0.6, 0))
    } else if (storeStyling.locationBodyparts === 'bodyshell' || storeStyling.locationBodyparts === '') {
      setvectorPositionForCamera(new THREE.Vector3(0, 1, 7))
      setLookVectorForCamera(new THREE.Vector3(0, 1, 0))
    }
  }, [storeStyling.locationBodyparts])

  useFrame((state) => {
    state.camera.position.lerp(vectorPositionForCamera, 0.1)
    const startCameraQuaternion = state.camera.quaternion.clone()
    state.camera.lookAt(lookVectorForCamera)
    const endCameraQuaternion = state.camera.quaternion.clone()
    state.camera.quaternion.copy(startCameraQuaternion)
    state.camera.quaternion.slerp(endCameraQuaternion, THREE.MathUtils.smoothstep(0.5, 0, 1))
  })

  return <></>
}

export default observer(CameraMovementExotic)
