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
      ...resetUl,
      display: 'inline-block',
      margin: 0,
      fontSize,
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


export const treeViewStyle = style(
  resetUl, {
  $nest: {
    '& ul': resetUl,
    '& li': {
      paddingLeft: '1em'
    }
  }
})

