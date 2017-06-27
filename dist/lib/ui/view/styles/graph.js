"use strict";
import { style } from 'typestyle/lib';
import { content } from './main';
export var graphViewStyle = style(content, {
    position: 'relative',
    flexGrow: 1,
    $nest: {
        '& svg': {
            position: 'absolute',
            filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.6))'
        },
        '& text': {
            fill: 'white',
            stroke: 'black',
            paintOrder: 'stroke'
        },
        '& line': {
            stroke: 'darkgray',
            $nest: {
                '&.active': {
                    stroke: '#ff7'
                },
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
                }
            }
        },
        '& rect': {
            $nest: {
                '&.accept': {
                    strokeWidth: 3,
                    strokeDasharray: '3, 3'
                }
            }
        },
        '& .group-1 rect': {
            fill: 'orangered'
        },
        '& .group-1.active rect': {
            fill: 'lightsalmon',
            stroke: 'orangered',
            strokeWidth: 5
        },
        '& circle.group-1': {
            fill: 'orangered'
        },
        '& circle.group-1.active': {
            fill: 'lightsalmon'
        },
        '& .group-1 .initial': {
            fill: 'darkred'
        },
        '& .group-1 .accept': {
            stroke: 'darkred'
        },
        '& .group-2 rect': {
            fill: 'limegreen'
        },
        '& .group-2.active rect': {
            fill: 'palegreen',
            stroke: 'limegreen',
            strokeWidth: 5
        },
        '& circle.group-2': {
            fill: 'limegreen'
        },
        '& circle.group-2.active': {
            fill: 'palegreen'
        },
        '& .group-2 .initial': {
            fill: 'darkgreen'
        },
        '& .group-2 .accept': {
            stroke: 'darkgreen'
        },
        '& .group-3 rect': {
            fill: 'cornflowerblue'
        },
        '& .group-3.active rect': {
            fill: 'lightblue',
            stroke: 'cornflowerblue',
            strokeWidth: 5
        },
        '& circle.group-3': {
            fill: 'cornflowerblue'
        },
        '& circle.group-3.active': {
            fill: 'lightblue'
        },
        '& .group-3 .initial': {
            fill: 'darkslateblue'
        },
        '& .group-3 .accept': {
            stroke: 'darkslateblue'
        },
        '& .group-4 rect': {
            fill: 'orchid'
        },
        '& .group-4.active rect': {
            fill: 'thistle',
            stroke: 'orchid',
            strokeWidth: 5
        },
        '& circle.group-4': {
            fill: 'orchid'
        },
        '& circle.group-4.active': {
            fill: 'thistle'
        },
        '& .group-4 .initial': {
            fill: 'purple'
        },
        '& .group-4 .accept': {
            stroke: 'purple'
        },
        '& .group-5 rect': {
            fill: 'gold'
        },
        '& .group-5.active rect': {
            fill: 'palegoldenrod',
            stroke: 'gold',
            strokeWidth: 5
        },
        '& circle.group-5': {
            fill: 'gold'
        },
        '& circle.group-5.active': {
            fill: 'beige'
        },
        '& .group-5 .initial': {
            fill: 'darkgoldenrod'
        },
        '& .group-5 .accept': {
            stroke: 'darkgoldenrod'
        },
        '& .group-6 rect': {
            fill: 'lightseagreen'
        },
        '& .group-6.active rect': {
            fill: 'paleturquoise',
            stroke: 'lightseagreen',
            strokeWidth: 5
        },
        '& circle.group-6': {
            fill: 'lightseagreen'
        },
        '& circle.group-6.active': {
            fill: 'paleturquoise'
        },
        '& .group-6 .initial': {
            fill: 'darkslategray'
        },
        '& .group-6 .accept': {
            stroke: 'darkslategray'
        },
        '& .group-7 rect': {
            fill: 'orange'
        },
        '& .group-7.active rect': {
            fill: 'moccasin',
            stroke: 'orange',
            strokeWidth: 5
        },
        '& circle.group-7': {
            fill: 'orange'
        },
        '& circle.group-7.active': {
            fill: 'moccasin'
        },
        '& .group-7 .initial': {
            fill: 'saddlebrown'
        },
        '& .group-7 .accept': {
            stroke: 'saddlebrown'
        }
    }
});
//# sourceMappingURL=graph.js.map