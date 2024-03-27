import React from 'react'
import { Bloom, EffectComposer, FXAA, N8AO } from '@react-three/postprocessing'

const EffectsExotic = () => {
    return (
        <EffectComposer>
            <N8AO aoRadius={4} aoSamples={12} denoiseRadius={4} denoiseSamples={12} intensity={3} quality='medium' />
            <FXAA samples={16} />
            <Bloom intensity={.2} luminanceThreshold={0.9} luminanceSmoothing={0.025} mipmapBlur={true} />
        </EffectComposer>
    )
}

export default EffectsExotic