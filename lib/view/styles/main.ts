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


export const mainStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  fontSize,
  fontFamily: 'sans-serif',
  color,
})


export const buttonStyle = style(element, {
  margin: '0 4px',
  border: 0,
  color,
  fontSize: '1.0em',
  $nest: {
    '& > svg': {
      verticalAlign: 'middle'
    }
  }
})


export const controlsStyle = style(element, {
  display: 'inline-block',
  padding: 4,
  $nest: {
    '& h1': {
      display: 'inline-block',
      margin: '0 8px',
      fontSize,
      fontWeight: 'normal'
    },
    '& ul': {
      display: 'inline-block',
      margin: 0,
      padding: 0,
      fontSize,
      listStyle: 'none',
      fontWeight: 'normal'
    },
    '& li': {
      display: 'inline-block',
    },
    '& nav': {
      display: 'inline-block',
    }
  }
})


export const windowStyle = style(element, {
  position: 'absolute',
  padding: 8,
  overflow: 'auto'
})

