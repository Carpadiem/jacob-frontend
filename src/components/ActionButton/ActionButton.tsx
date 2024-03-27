import React from 'react'


interface ActionButtonProps {
    bgColor: string
    icon?: React.ReactNode
    text: string
    textColor: string
    textWeight?: number
    border?: string
    onClick?: ()=>void
    stretched?: boolean
    enabled?: boolean
    padding?: { v: number, h: number }
}
const ActionButton = ( {
        bgColor,
        icon,
        text,
        textColor,
        textWeight=500,
        border='none',
        onClick,
        stretched=false,
        enabled=true,
        padding={ v: 14, h: 32 }
    }: ActionButtonProps) => {
    
    const [color, setColor] = React.useState('s:#343434')
    React.useEffect(()=>{
        const btnColorData = bgColor.split(':')
        if (btnColorData[0] === 'g') setColor(`linear-gradient(90deg, ${btnColorData[1]}, ${btnColorData[2]})`)
        else setColor(`${btnColorData[1]}`)
    }, [])

    return <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 3, border: border, } as React.CSSProperties}>

        {
        enabled === false &&
        <div
            style={{
                position: 'absolute',
                zIndex: 99,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(14,14,14,.5)',
                cursor: 'not-allowed',
                backdropFilter: 'grayscale(1)',
            } as React.CSSProperties}
        />
        }

        <div
            style={{
                paddingLeft: padding.h, paddingRight: padding.h,
                paddingTop: padding.v, paddingBottom: padding.v,
                background: color,
                fontFamily: 'Montserrat',
                fontSize: 14,
                fontWeight: textWeight === 0 ? 600 : textWeight,
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                position: 'relative',
                width: stretched ? '100%' : 'auto',
                cursor: 'pointer',
            } as React.CSSProperties}
            onClick={onClick}>
                
            {icon}
            {text}
        
        </div>
    </div>
}

export default ActionButton