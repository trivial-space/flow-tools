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
              class: e.class
            }]),
        ...processes.map(p =>
          ['circle', {
              'data-key': p.id,
              class: '',
              transform: `translate(${p.x}, ${p.y})`,
              cx: 0,
              cy: 0,
              r: p.autostart ? 13 : 8,
              fill: 'tomato',
              title: p.id
            }]),
        ...entities.map(e =>
          ['g', {
              'data-key': e.id,
              transform: `translate(${e.x}, ${e.y})`,
              onmousedown: () => dispatch('state.gui.openEntity', e.id),
              title: e.id
            },
            ['rect', {
                x: -15,
                y: -15,
                width: 30,
                height: 30,
                class: e.accept ? 'accept' : ''
              }],
            ['text', {
                'text-anchor': 'middle',
                x: 0,
                y: 30
              },
              e.label],
            e.initial && ['circle', {
              cx: 0,
              cy: 0,
              r: 6,
              class: 'initial'
            }]]),
        ]]
  )
}
