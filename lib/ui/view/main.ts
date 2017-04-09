import { style, classes } from "typestyle";
import * as css from 'dom-css'
import { Component, h } from '../../utils/yoyo';
import * as icon from "./icons";
import { highlightColor, mainStyle } from "./styles/main";
import { iconBtn } from "./ui";
import { windowContentStyle, controlsStyle, windowStyle } from "./styles/components";
import { graphView, scaleSlider } from "./graph";
import { processView, entityView } from "./entities";
import { treeView } from "./tree";


function title (title) {
  return h(['h1', title])
}


const activeButton = style({
  color: highlightColor
})


function setActiveWindow(label, dispatch) {
  return () => dispatch('state.gui.setActiveWindow', label)
}


function controls({visibility, position}, dispatch, component, root) {

  const click =
    label =>
      () => dispatch('state.gui.updateVisibility', label)

  const el = h(
    ['header', {
        class: classes('tvs-flow-controls', controlsStyle),
        onmousedown: setActiveWindow('controls', dispatch)
      },
      component(title, 'state.gui.title'),
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
            })]]]])

  css(root || el, position)

  return el
}


function treeWindow ({dimensions, window}, dispatch, component, root) {
  const el = h(
    ['article', {
        'data-key': 'tree',
        class: classes('tvs-flow-tree', windowStyle),
        onmousedown: setActiveWindow('tree', dispatch)
      },
      ['header',
        icon.list(window === "tree" ? 'selected': ''),
        ' Tree'],
      ['section', {class: windowContentStyle}, component(treeView, 'state.gui.treeData')],
      ['footer', {
          class: 'resize',
          'data-key': 'resize'
        }]])

  css(root || el, dimensions)

  return el
}


function graphWindow ({dimensions, window}, dispatch, component, root) {

  const graph = component(graphView, 'state.graph.viewData')

  const el = h(
    ['article', {
        'data-key': 'graph',
        class: classes('tvs-flow-graph', windowStyle),
        onmousedown: setActiveWindow('graph', dispatch)
      },
      ['header',
        icon.graph(window === "graph" ? 'selected': ''),
        ' Graph ',
        component(scaleSlider, 'state.graph.viewBox')],
      graph,
      ['footer', {
          'data-key': 'resize',
          class: 'resize'
        }]])

  css(root || el, { ...dimensions })

  requestAnimationFrame(function() {
    dispatch('updateGraphSize', {
      width: graph.clientWidth,
      height: graph.clientHeight
    })
  })

  return el
}


function entitiesWindow ({dimensions, node, window}, dispatch, component, root) {
  const view = node && node.procedure
    ? processView(node, dispatch)
    : component(entityView, 'state.gui.entityViewProps')

  const el = h(
    ['article', {
        'data-key': 'entities',
        class: classes('tvs-flow-entities', windowStyle),
        onmousedown: setActiveWindow('entities', dispatch)
      },
      ['header',
        icon.entities(window === "entities" ? 'selected': ''),
        ' ',
        node && node.id],
      view,
      ['footer', {
          class: 'resize',
          'data-key': 'resize'
        }]])

  css(root || el, { ...dimensions })

  return el
}


function root (visibility, _, component) {

  const tree = visibility.tree ? component(treeWindow, 'state.gui.treeWindowProps') : ''
  const graph = visibility.graph ? component(graphWindow, 'state.gui.graphWindowProps') : ''
  const entities = visibility.entities ? component(entitiesWindow, 'state.gui.entitiesWindowProps') : ''

  const el = h(['article', {class: classes('tvs-flow-tools', mainStyle)},
    component(controls, 'state.gui.controlProps'),
    graph,
    entities,
    tree
  ])

  return el
}


export function mainView (component: Component) {
  return component(root, 'state.gui.visibility')
}
