import { style } from "typestyle/lib";
import { element, fontSize, resetUl, backgroundColor } from "./main";


export const controlsStyle = style(element, {
  display: 'inline-block',
  position: 'relative',
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
  padding: 8,
  alignItems: 'stretch',
  alignContent: 'stretch',

  $nest: {
    '&>.resize': {
      position: 'absolute',
      width: 20,
      height: 20,
      bottom: 0,
      right: 0,
      borderRadius: 4,
      cursor: 'nwse-resize',
      background: `linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, ${backgroundColor} 100%)`,
    }
  }
})


export const windowContentStyle = style({
  overflow: 'auto',
  position: 'relative',
  flexGrow: 1,
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
