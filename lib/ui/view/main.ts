import { style, classes } from "typestyle";
import { Component, ComponentClass } from '../../utils/inferno';
import * as icon from "./icons";
import { highlightColor, mainStyle } from "./styles/main";
import { iconBtn } from "./ui";
import { windowContentStyle, controlsStyle, windowStyle } from "./styles/components";
import { graphView, scaleSlider } from "./graph";
import { processView, entityView } from "./entities";
import { treeView } from "./tree";
import { iconButtonLightStyle } from "./styles/ui";
import { GUI } from "ui/actions";
import { visibility, title } from "ui/graph/state/gui";
import { controlProps, entitiesWindowProps, graphWindowProps, treeWindowProps } from "ui/graph/state/views";
import { viewBox, viewData } from "ui/graph/state/graph";
import { entityViewProps } from "ui/graph/state/entity";
import { treeData } from "ui/graph/state/tree";


function titleView (title) {
  return ['h1', title]
}


const activeButton = style({
  color: highlightColor
})


function setActiveWindow(label, dispatch) {
  return () => dispatch(GUI.MAIN.SET_ACTIVE_WINDOW, label)
}


function controls({visibility, position}, dispatch, component) {

  const click =
    label =>
      () => dispatch(GUI.MAIN.UPDATE_VISIBILITY, label)

  const el =
    ['header', {
        class: classes('tvs-flow-controls', controlsStyle),
        onmousedown: setActiveWindow('controls', dispatch),
        style: {...position}
      },
      component(titleView, title),
      ['nav', {class: 'tvs-controls-btns'},
        ['ul',
          ['li',
            iconBtn({
              class: visibility.tree && activeButton,
              onclick: click('tree'),
              icon: icon.list(),
              title: "toggle entity tree"
            })],
          ['li',
            iconBtn({
              class: visibility.graph && activeButton,
              onclick: click('graph'),
              icon: icon.graph(),
              title: "toggle flow graph"
            })],
          ['li',
            iconBtn({
              class: visibility.entities && activeButton,
              onclick: click('entities'),
              icon: icon.entities(),
              title: "toggle entity details"
            })]]]]

  return el
}


function treeWindow ({dimensions, window}, dispatch, component) {
  const el =
    ['article', {
        class: classes('tvs-flow-tree', windowStyle),
        style: {...dimensions},
        onmousedown: setActiveWindow('tree', dispatch)
      },
      ['header',
        icon.list(window === "tree" ? 'selected': ''),
        ' Tree ',
        ['span', {class: 'gap'}],
        ' ',
        iconBtn({
          icon: icon.close(),
          class: iconButtonLightStyle,
          title: 'close window',
          onclick: () => dispatch(GUI.MAIN.CLOSE_WINDOW, 'tree')
        })],
      ['section', {class: windowContentStyle}, component(treeView, treeData)],
      ['footer', { class: 'resize' }]]

  return el
}


function graphWindow ({dimensions, window}, dispatch, component) {

  const graph = component(graphView, viewData)

  function updateGraphSize (parent) {
    if (parent && parent.querySelector) {
      const graphNode = parent.querySelector('section')
      dispatch(GUI.GRAPH.UPDATE_SIZE, {
        width: graphNode.clientWidth,
        height: graphNode.clientHeight
      })
    }
  }

  const el =
    ['article', {
        ref: updateGraphSize,
        class: classes('tvs-flow-graph', windowStyle),
        style: {...dimensions},
        onmousedown: setActiveWindow('graph', dispatch)
      },
      ['header',
        icon.graph(window === "graph" ? 'selected': ''),
        ' Graph ',
        ['span', {class: 'gap'}],
        component(scaleSlider, viewBox),
        ' ',
        iconBtn({
          icon: icon.copy(),
          class: classes(iconButtonLightStyle, 'tvs-save-graph'),
          title: 'copy the current graph state to clipboard'
        }),
        iconBtn({
          icon: icon.close(),
          class: iconButtonLightStyle,
          title: 'close window',
          onclick: () => dispatch(GUI.MAIN.CLOSE_WINDOW, 'graph')
        })],
      graph,
      ['footer', { class: 'resize' }]]

  return el
}


function entitiesWindow ({dimensions, node, window}, dispatch, component) {
  const view = node && node.procedure
    ? processView(node, dispatch)
    : component(entityView, entityViewProps)

  const el =
    ['article', {
        class: classes('tvs-flow-entities', windowStyle),
        style: {...dimensions},
        onmousedown: setActiveWindow('entities', dispatch)
      },
      ['header',
        icon.entities(window === "entities" ? 'selected': ''),
        ' ',
        node && node.id,
        ' ',
        ['span', {class: 'gap'}, ' '],
        ' ',
        iconBtn({
          icon: icon.close(),
          class: iconButtonLightStyle,
          title: 'close window',
          onclick: () => dispatch(GUI.MAIN.CLOSE_WINDOW, 'entities')
        })],
      view,
      ['footer', { class: 'resize' }]]

  return el
}


function root (visibility, _, component) {

  const tree = visibility.tree ? component(treeWindow, treeWindowProps) : ''
  const graph = visibility.graph ? component(graphWindow, graphWindowProps) : ''
  const entities = visibility.entities ? component(entitiesWindow, entitiesWindowProps) : ''

  const el = ['article', {class: classes('tvs-flow-tools', mainStyle)},
    component(controls, controlProps),
    graph,
    entities,
    tree
  ]

  return el
}


export function mainView (component: Component): ComponentClass {
  return component(root, visibility)
}
