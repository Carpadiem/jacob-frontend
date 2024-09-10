import React from 'react'
import { Bloom, EffectComposer, FXAA, N8AO, ChromaticAberration } from '@react-three/postprocessing'
import { NormalBlending, Vector2 } from 'three'

const EffectsExotic = () => {
    return (
        <EffectComposer>
            <N8AO aoRadius={3.5} aoSamples={24} denoiseRadius={8} denoiseSamples={24} intensity={3} quality='high' />
            <FXAA samples={16} />
            <Bloom intensity={.2} luminanceThreshold={0.9} luminanceSmoothing={0.025} mipmapBlur={true} />
        </EffectComposer>
    )
}

export default EffectsExotic