import { style } from "typestyle/lib";
import { rgba } from 'csx'


export const color = 'white'
export const backgroundColor = rgba(40, 40, 40, 0.7).toString()

export const fontSize = 17

export const highlightColor = 'cyan'

export const element = {
  borderRadius: 4,
  backgroundColor,
  boxShadow: '0 10px 15px rgba(0,0,0,0.3)',
  borderTop: '1px solid rgba(255, 255, 255, 0.4)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.6)'
}

export const resetUl = {
  padding: 0,
  listStyle: 'none'
}


export const mainStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  fontSize,
  fontFamily: 'sans-serif',
  lineHeight: 1.5,
  color,
  userSelect: 'none',
  $nest: {
    '& *': {
      userSelect: 'none',
      MozUserSelect: 'none'
    } as any
  }
})
