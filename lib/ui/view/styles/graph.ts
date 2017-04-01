import { style } from "typestyle/lib";
import { content } from "./main";


export const graphViewStyle = style(content, {
  position: 'relative',
  flexGrow: 1,

  $nest: {
    '& svg': {
      position: 'absolute',
      filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.6))',
    },
    '& text': {
      fill: 'white',
      stroke: 'black',
      paintOrder: 'stroke'
    },
    '& line': {
      stroke: 'darkgray',
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
      $nest: {
        '&.accept': {
          strokeWidth: 3,
          strokeDasharray: '3, 3'
        },
      }
    },
    '& .group-1 rect': {
      fill: 'orangered'
    },
    '& circle.group-1': {
      fill: 'orangered'
    },
    '& .group-1 .initial': {
      fill: 'darkred',
    },
    '& .group-1 .accept': {
      stroke: 'darkred'
    },
    '& .group-2 rect': {
      fill: 'limegreen'
    },
    '& circle.group-2': {
      fill: 'limegreen'
    },
    '& .group-2 .initial': {
      fill: 'darkgreen',
    },
    '& .group-2 .accept': {
      stroke: 'darkgreen'
    },
    '& .group-3 rect': {
      fill: 'cornflowerblue'
    },
    '& circle.group-3': {
      fill: 'cornflowerblue'
    },
    '& .group-3 .initial': {
      fill: 'darkslateblue',
    },
    '& .group-3 .accept': {
      stroke: 'darkslateblue'
    },
    '& .group-4 rect': {
      fill: 'orchid'
    },
    '& circle.group-4': {
      fill: 'orchid'
    },
    '& .group-4 .initial': {
      fill: 'purple',
    },
    '& .group-4 .accept': {
      stroke: 'purple'
    },
    '& .group-5 rect': {
      fill: 'gold'
    },
    '& circle.group-5': {
      fill: 'gold'
    },
    '& .group-5 .initial': {
      fill: 'darkgoldenrod',
    },
    '& .group-5 .accept': {
      stroke: 'darkgoldenrod'
    },
    '& .group-6 rect': {
      fill: 'lightseagreen'
    },
    '& circle.group-6': {
      fill: 'lightseagreen'
    },
    '& .group-6 .initial': {
      fill: 'darkslategray',
    },
    '& .group-6 .accept': {
      stroke: 'darkslategray'
    },
    '& .group-7 rect': {
      fill: 'orange'
    },
    '& circle.group-7': {
      fill: 'orange'
    },
    '& .group-7 .initial': {
      fill: 'saddlebrown',
    },
    '& .group-7 .accept': {
      stroke: 'saddlebrown'
    }
  }
} as any)
