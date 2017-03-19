import { style } from "typestyle/lib";
import { rgba } from 'csx'


export const color = 'white'
export const backgroundColor = rgba(0, 0, 0, 0.7).toString()

export const fontSize = 18

export const highlightColor = 'cyan'

export const element = {
  borderRadius: 4,
  backgroundColor
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
})
