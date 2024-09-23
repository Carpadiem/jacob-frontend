// import React from 'react'
// import * as THREE from 'three'
// import { useFrame } from '@react-three/fiber'
// // store
// import { observer } from 'mobx-react-lite'
// import stylingStore from '@stores/styling.store'

// const CameraMovementExotic = () => {
//   const [vectorPositionForCamera, setVectorPositionForCamera] = React.useState<THREE.Vector3>(new THREE.Vector3(10, 3, 20))
//   const [lookVectorForCamera, setLookVectorForCamera] = React.useState<THREE.Vector3>(new THREE.Vector3(-7, 2, 0))

//   React.useEffect(() => {
//     if (stylingStore.menuLevel === 'styling.bodyparts.bumpers_front') {
//       setVectorPositionForCamera(new THREE.Vector3(-1, 1, -6))
//       setLookVectorForCamera(new THREE.Vector3(1, 1, 0))
//     } else if (stylingStore.menuLevel === 'styling.bodyparts.bumpers_rear') {
//       setVectorPositionForCamera(new THREE.Vector3(-7, 1, -3))
//       setLookVectorForCamera(new THREE.Vector3(0, 1, 0))
//     } else if (stylingStore.menuLevel === 'styling.bodyparts.skirts') {
//       setVectorPositionForCamera(new THREE.Vector3(0, 0.7, 5))
//       setLookVectorForCamera(new THREE.Vector3(-0.5, 0.55, 0))
//     } else if (stylingStore.menuLevel === 'styling.bodyparts.spoilers') {
//       setVectorPositionForCamera(new THREE.Vector3(-8, 1.6, -2))
//       setLookVectorForCamera(new THREE.Vector3(0, 1, 0))
//     } else if (stylingStore.menuLevel === 'styling' || stylingStore.menuLevel === 'styling.bodyparts') {
//       setVectorPositionForCamera(new THREE.Vector3(-3, 1.3, -6))
//       setLookVectorForCamera(new THREE.Vector3(1.5, 1, 0))
//     }
//   }, [stylingStore.menuLevel])

//   useFrame((state) => {
//     state.camera.position.lerp(vectorPositionForCamera, 0.1)
//     const startCameraQuaternion = state.camera.quaternion.clone()
//     state.camera.lookAt(lookVectorForCamera)
//     const endCameraQuaternion = state.camera.quaternion.clone()
//     state.camera.quaternion.copy(startCameraQuaternion)
//     state.camera.quaternion.slerp(endCameraQuaternion, THREE.MathUtils.smoothstep(.5, 0, 1))
//   })

//   return <></>
// }

// export default observer(CameraMovementExotic)

import React from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
// store
import { observer } from 'mobx-react-lite'
import stylingStore from '@stores/styling.store'

const CameraMovementExotic = () => {

  React.useEffect(() => {
    if (stylingStore.menuLevel === 'styling.bodyparts.bumpers_front') {

    }
  }, [stylingStore.menuLevel])

  useFrame((state)=>{
    
    let lookVec;
    let posVec;

    if (stylingStore.menuLevel === 'styling' || stylingStore.menuLevel === 'styling.bodyparts') {
      posVec = new THREE.Vector3(-3,1.2,-6)
      lookVec = new THREE.Vector3(1.5,1,0)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.bumpers_front') {
      posVec = new THREE.Vector3(-2,1,-6)
      lookVec = new THREE.Vector3(1.5,1,0)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.bumpers_rear') {
      posVec = new THREE.Vector3(-2,1,6)
      lookVec = new THREE.Vector3(0,1,0)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.skirts') {
      posVec = new THREE.Vector3(-7,1.5,-.7)
      lookVec = new THREE.Vector3(0,1,-.7)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.spoilers') {
      posVec = new THREE.Vector3(-1.1,1.7,7)
      lookVec = new THREE.Vector3(0,1,-.7)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.bonnets') {
      posVec = new THREE.Vector3(2,1.7,-6)
      lookVec = new THREE.Vector3(0.4,.75,0)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.mirrors') {
      posVec = new THREE.Vector3(-7,1.5,-.7)
      lookVec = new THREE.Vector3(0,1,-.7)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.head_lights') {
      posVec = new THREE.Vector3(-7,1.5,-.7)
      lookVec = new THREE.Vector3(0,1,-.7)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.tail_lights') {
      posVec = new THREE.Vector3(-7,1.5,-.7)
      lookVec = new THREE.Vector3(0,1,-.7)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.wings_front') {
      posVec = new THREE.Vector3(-7,1.5,-.7)
      lookVec = new THREE.Vector3(0,1,-.7)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.wings_rear') {
      posVec = new THREE.Vector3(-7,1.5,-.7)
      lookVec = new THREE.Vector3(0,1,-.7)
    } else if (stylingStore.menuLevel === 'styling.bodyparts.exhausts') {
      posVec = new THREE.Vector3(-7,1.5,-.7)
      lookVec = new THREE.Vector3(0,1,-.7)
    }

    state.camera.lookAt(lookVec)
    state.camera.position.lerp(posVec, .075)
    state.camera.updateProjectionMatrix()
  })

  return <></>
}

export default observer(CameraMovementExotic)
