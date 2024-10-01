import React from 'react'
import styles from './StylingWheelsRange.module.css'

interface StylingWheelsRangeProps {
    title: string
    from: number
    to: number
    step: number
    value: number
    onChange: (rangeValue: number)=>void
}

const StylingWheelsRange = ({ title, from=0, to=1, step=.1, value, onChange, }: StylingWheelsRangeProps) => {
    
    
    // states
    const [rangeValue, setRangeValue] = React.useState<number>(value)

    // refs
    const ref_flyNumber = React.useRef<HTMLParagraphElement>(null!)
    const ref_track = React.useRef<HTMLInputElement>(null!)
    
    // functions1
    const flyingNumber = (
        from: number,
        to: number,
        rv: number,
        trackWidth: number,
        wordWidth: number
    ): number => {
        let left = 0
        if (from >= 0) left = trackWidth * (rv/to) - wordWidth/2
        else left = trackWidth - ((trackWidth*-rv)/2) - trackWidth/2 - wordWidth/2
        return left
    }
    
    // handlers
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // page design change
        setRangeValue(e.target.valueAsNumber)
        const left = flyingNumber(from, to, rangeValue, e.currentTarget.clientWidth, ref_flyNumber.current.clientWidth)
        ref_flyNumber.current.style.left = left + 'px'
        
    }

    // effects
    React.useEffect(()=>{
        if (ref_track.current && ref_flyNumber.current) {
            const left = flyingNumber(from, to, rangeValue, ref_track.current.clientWidth, ref_flyNumber.current.clientWidth)
            ref_flyNumber.current.style.left = left + 'px'
        }
    }, [])

    // game data change
    React.useEffect(()=>{
        onChange(rangeValue)
    }, [rangeValue])

    return (
        
        <div className={styles.frame}>
            <p className={styles.title}>{ title }</p>
            
            <div className={styles.from_to_container}>
                <p className={styles.from_to_text}>{from.toFixed(2)}</p>
                <p className={styles.from_to_text}>{to.toFixed(2)}</p>
            </div>
            <input
                className={styles.range}
                ref={ref_track}
                type="range"
                min={from}
                max={to}
                step={step}
                value={rangeValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>changeHandler(e)}
            />
            <p ref={ref_flyNumber} className={styles.flyNumber}>{ rangeValue.toFixed(2) }</p>
        </div>

    )
}

export default StylingWheelsRange