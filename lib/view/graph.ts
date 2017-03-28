import { graphViewStyle } from "./styles/graph";
import { h } from "../utils/yoyo";


export function graphView (data, dispatch) {

  if (!data) return h(
    ['section', {class: graphViewStyle}]
  )

  const {entities, processes, edges} = data
  return h(
    ['section', {class: graphViewStyle},
      ['svg', {
          width: '100%',
          height: '100%',
          style: 'position: absolute'
        },
        ...edges.map(e =>
          ['line', {
                x1: e.from.x,
                y1: e.from.y,
                x2: e.to.x,
                y2: e.to.y,
                stroke: 'tomato',
                zIndex: -1
              }]),
        ...processes.map(p =>
          ['g', {
              'data-key': p.id,
              class: '',
              transform: `translate(${p.x}, ${p.y})`
            },
            ['circle', {
                cx: 0,
                cy: 0,
                r: 5,
                fill: 'tomato'
              }]]),
        ...entities.map(e =>
          ['g', {
              'data-key': e.id,
              class: '',
              transform: `translate(${e.x}, ${e.y})`,
              onmousedown: () => dispatch('state.gui.openEntity', e.id)
            },
            ['rect', {
                x: -10,
                y: -10,
                width: 20,
                height: 20,
                fill: 'red'
              }],
            ['text', {
                'text-anchor': 'middle',
                x: 0,
                y: 30
              },
              e.label]]),
        ]]
  )
}
