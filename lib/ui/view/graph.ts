import { graphViewStyle } from "./styles/graph";
import { classes } from "typestyle/lib";
import { GUI } from "ui/actions";


export function scaleSlider ({ scale }, dispatch) {
  return ['span',
    ['input', {
      type: 'range',
      value: scale,
      min: 0.5,
      max: 3,
      step: 0.2,
      onchange: e => dispatch(GUI.GRAPH.UPDATE_SCALE, e.target.value),
      onmousemove: e => e.stopPropagation()
    }]]
}


export function graphView (data, dispatch) {

  if (!data) return ['section', { class: graphViewStyle }]

  const { entities, processes, edges, viewBox = {} as any } = data
  return ['section', { class: graphViewStyle },
    ['svg', {
        width: '100%',
        height: '100%',
        viewBox: `${viewBox.x}, ${viewBox.y}, ${viewBox.width}, ${viewBox.height}`
      },
      ...edges.map(e =>
        ['line', {
            x1: e.from.x,
            y1: e.from.y,
            x2: e.to.x,
            y2: e.to.y,
            class: classes(e.class, e.active && 'active')
          }]),
      ...processes.map(p =>
        ['circle', {
            class: classes(p.class, p.active && 'active'),
            transform: `translate(${p.x}, ${p.y})`,
            onmousedown: () => dispatch(GUI.ENTITIES.OPEN_PROCESS, p.id),
            cx: 0,
            cy: 0,
            r: p.autostart ? 13 : 8,
            title: p.id
          }]),
      ...entities.map(e =>
        ['g', {
            transform: `translate(${e.x}, ${e.y})`,
            onmousedown: () => dispatch(GUI.ENTITIES.OPEN_ENTITY, e.id),
            title: e.id,
            class: classes(e.class, e.active && 'active')
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
}
