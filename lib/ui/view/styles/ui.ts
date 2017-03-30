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

