// react
import React from 'react'
// router
import { Link } from 'react-router-dom'

interface LinkButtonProps {
  bgColor: string
  icon?: React.ReactNode
  text: string
  textColor: string
  link: string
  isNewTab?: boolean
  stretched?: boolean
  padding?: { v: number; h: number }
  filter?: string
}

const LinkButton = ({
  bgColor,
  icon,
  text,
  textColor,
  link,
  isNewTab = false,
  stretched = false,
  padding = { v: 14, h: 32 },
  filter = 'none',
}: LinkButtonProps) => {
  const [color, setColor] = React.useState('s:#343434')
  React.useEffect(() => {
    const btnColorData = bgColor.split(':')
    if (btnColorData[0] === 'g') setColor(`linear-gradient(90deg, ${btnColorData[1]}, ${btnColorData[2]})`)
    else setColor(`${btnColorData[1]}`)
  }, [])

  return (
    <>
      <div
        style={
          {
            paddingLeft: padding.h,
            paddingRight: padding.h,
            paddingTop: padding.v,
            paddingBottom: padding.v,
            background: color,
            fontFamily: 'Tektur',
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 4,
            cursor: 'pointer',
            color: textColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            position: 'relative',
            width: stretched ? '100%' : 'auto',
            filter: filter,
          } as React.CSSProperties
        }
      >
        {icon}
        {text}
        <Link
          to={link}
          target={isNewTab ? '_blank' : ''}
          style={
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            } as React.CSSProperties
          }
        />
      </div>
    </>
  )
}

export default LinkButton
