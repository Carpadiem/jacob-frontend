import React from 'react'
import { SpriteRenderer,} from 'three-nebula';

import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber';
import { System } from 'three-nebula';
import { observer } from 'mobx-react-lite';
import stylingStore from '@stores/styling.store';
import shopPaintColor from 'src/shop/graphics/paint_color';

import vfx_paint_color from 'public/assets/vfx/vfx_paint_color'

interface ExpiredSystem {
    system: System
    created_timestamp: number
}

const PaintSpray = () => {
    
    const { scene } = useThree()
    const renderer = new SpriteRenderer(scene, THREE)
    const [expiredSystems, setExpiredSystems] = React.useState<ExpiredSystem[]>([])

    const onStart = () => {}
    const onEnd = () => {}
    const onUpdate = () => {}
    
    // effects
    React.useEffect(()=>{
        const color_id = stylingStore.styling.paint_color_id
        const as_shop_item = shopPaintColor.filter(color=>color.id===color_id)[0]
        const hex = as_shop_item.hex

        // const newColorA = darkerHexColor(hex, -60)

        vfx_paint_color.particleSystemState.emitters[0].behaviours.filter(a=>a.type==='Color')[0].properties.colorA = '#050505'
        vfx_paint_color.particleSystemState.emitters[0].behaviours.filter(a=>a.type==='Color')[0].properties.colorB = hex

        System.fromJSONAsync(vfx_paint_color['particleSystemState'], THREE).then(s=>{
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

export default observer(PaintSpray)