import React from 'react'
import { Bloom, EffectComposer, FXAA, N8AO, SMAA, ChromaticAberration, SSAO } from '@react-three/postprocessing'
import { NormalBlending, Vector2 } from 'three'
import * as THREE from 'three'

const EffectsExotic = () => {
    return (
        <EffectComposer multisampling={16}>
            <Bloom intensity={.2} luminanceThreshold={0.9} luminanceSmoothing={0.025} mipmapBlur={true} />
            {/* <N8AO
                aoRadius={1.2}
                distanceFalloff={.5}
                halfRes={false}
                aoSamples={16}
                denoiseRadius={8}
                denoiseSamples={16}
                intensity={2}
                quality='high'
            /> */}
            <SMAA />
        </EffectComposer>
    )
}

export default EffectsExotic