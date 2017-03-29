import { style } from "typestyle/lib";


export const graphViewStyle = style({
  position: 'relative',
  flexGrow: 1,

  $nest: {
    '& svg': {
      position: 'absolute',
      filter: 'drop-shadow(0 5px 5px #000)',
    },
    '& text': {
      fill: 'white',
      stroke: 'black',
      paintOrder: 'stroke'
    },
    '& line': {
      stroke: 'tomato',
      $nest: {
        '&.to': {
          strokeWidth: 6
        },
        '&.to.async': {
          strokeDasharray: '4, 5'
        },
        '&.to.acc': {
          stroke: 'black',
          strokeWidth: 2
        },
        '&.from': {
          strokeWidth: 2
        },
        '&.from.cold': {
          strokeDasharray: '7, 10'
        },
      }
    },
    '& rect': {
      fill: 'red',
      $nest: {
        '&.accept': {
          stroke: 'darkred',
          strokeWidth: 3,
          strokeDasharray: '3, 3'
        },
      }
    },
    '& .initial': {
      fill: 'darkred',
    },
  }
} as any)
