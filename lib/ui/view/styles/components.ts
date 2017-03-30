import { style } from "typestyle/lib";
import { element, fontSize, resetUl, content } from "./main";


export const controlsStyle = style(element, {
  display: 'inline-block',
  position: 'relative',
  padding: 2,
  whiteSpace: 'nowrap',
  $nest: {
    '& h1': {
      display: 'inline-block',
      margin: '0 8px',
      fontSize,
      fontWeight: 'normal',
      verticalAlign: 'middle'
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
  padding: 5,
  paddingTop: 1,
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
      background: `linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)`,
    }
  }
})


export const windowContentStyle = style(content, {
  overflow: 'auto',
  position: 'relative',
  flexGrow: 1,
  padding: 5,
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


export const entityViewStyle = style({

})