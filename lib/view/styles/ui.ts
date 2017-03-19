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


export const buttonStyle = style(element, {
  margin: '0 4px',
  padding: '0 4px',
  border: 0,
  color,
  fontSize: '1.0em',
  $nest: {
    '& > svg': {
      verticalAlign: 'middle'
    }
  }
})

