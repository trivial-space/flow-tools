import { style } from "typestyle/lib";
import { element, fontSize, resetUl } from "./main";


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
  display: 'flex',
  flexDirection: 'column',
  padding: 8
})


export const windowContentStyle = style({
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

