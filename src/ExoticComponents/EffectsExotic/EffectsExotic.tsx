import React from 'react'
import { Bloom, EffectComposer, FXAA, N8AO, ChromaticAberration, SSAO } from '@react-three/postprocessing'
import { NormalBlending, Vector2 } from 'three'
import * as THREE from 'three'

const EffectsExotic = () => {
    return (
        <EffectComposer>
            <N8AO aoRadius={4} aoSamples={16} denoiseRadius={8} denoiseSamples={16} intensity={2} quality='medium' />
            <FXAA samples={16} />
            <Bloom intensity={.2} luminanceThreshold={0.9} luminanceSmoothing={0.025} mipmapBlur={true} />
        </EffectComposer>
    )
}

export default EffectsExotic