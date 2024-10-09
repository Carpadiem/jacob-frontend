import React from 'react'
import { SpriteRenderer,} from 'three-nebula';

import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber';
import { System } from 'three-nebula';
import { observer } from 'mobx-react-lite';

import vfx_exhaust_smoke from 'public/assets/vfx/vfx_exhaust_smoke'
import stylingStore from '@stores/styling.store';

interface ExpiredSystem {
    system: System
    created_timestamp: number
}

const ExhaustSmoke = () => {
    
    const { scene } = useThree()
    const renderer = new SpriteRenderer(scene, THREE)
    const [expiredSystems, setExpiredSystems] = React.useState<ExpiredSystem[]>([])

    const onStart = () => {}
    const onEnd = () => {}
    const onUpdate = () => {}
    
    // effects
    React.useEffect(()=>{
        System.fromJSONAsync(vfx_exhaust_smoke['particleSystemState'], THREE).then(s=>{
            s.addRenderer(renderer)
            s.emit({ onStart, onEnd, onUpdate })
            setExpiredSystems([...expiredSystems, {system: s, created_timestamp: Date.now()}])
        })
    }, [stylingStore.styling.paint_color_id])
    
    React.useEffect(()=>{
        if (expiredSystems.length >= 5) {
            expiredSystems[0].system.destroy()
            expiredSystems.shift()
        }
    }, [expiredSystems])

    useFrame(state=>{
        expiredSystems.forEach(es=>{
            if (es.system) es.system.update()
        })
    })

    return <></>
}

export default observer(ExhaustSmoke)