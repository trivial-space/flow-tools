import { style } from "typestyle/lib";
import { element, color } from "./main";

export const radioBtnStyle = style({
  margin: '0 4px',
  verticalAlign: 'top',
  display: 'inline-block',
  $nest: {
    '& input': {
      margin: 5,
      verticalAlign: 'middle'
    }
  }
})


const button = {
  margin: '0 4px',
  padding: '4px 10px 3px',
  border: 0,
  color,
  fontSize: '1.0em',
  verticalAlign: 'middle',
  cursor: 'pointer',
  $nest: {
    '& > svg': {
      verticalAlign: 'middle'
    }
  }
}


const iconButton = {
  padding: '0 4px',
}


export const buttonStyle = style(element, button)

export const iconButtonStyle = style(element, button, iconButton)

export const iconButtonLightStyle = style({
  display: 'inline-block',
  margin: '0 2px',
  padding: 0,
  border: 0,
  background: 'transparent',
  boxShadow: 'none',
  fontSize: '0.9em'
})

