import { style, classes } from "typestyle";
import * as css from 'dom-css'
import { Component, h } from '../../utils/yoyo';
import * as icon from "./icons";
import { highlightColor, mainStyle } from "./styles/main";
import { iconBtn } from "./ui";
import { radioBtnStyle } from "./styles/ui";
import { windowContentStyle, controlsStyle, windowStyle } from "./styles/components";
import { graphView, scaleSlider } from "./graph";
import { processView, entityView } from "./entities";
import { treeView, listView } from "./tree";


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


function treeWindow ({props, dimensions}, dispatch, component, root) {
  const comp = props.treeViewComponent === 'tree' ?
    component(treeView, 'state.gui.treeData') :
    component(listView, 'state.flow.state')

  function changeView(viewName) {
    return function() {
      dispatch('state.gui.setTreeView', viewName)
    }
  }

  const el = h(
    ['article', {
        'data-key': 'tree',
        class: classes('tvs-flow-tree', windowStyle),
        onmousedown: setActiveWindow('tree', dispatch)
      },
      ['header',
        icon.list(),
        ['label', {class: radioBtnStyle},
          ['input', {
            type: 'radio',
            name: 'viewTreeComponent',
            value: 'tree',
            onchange: changeView('tree'),
            checked: props.treeViewComponent === 'tree'
          }],
          'Tree'],
        ['label', {class: radioBtnStyle},
          ['input', {
            type: 'radio',
            name: 'viewTreeComponent',
            value: 'list',
            onchange: changeView('list'),
            checked: props.treeViewComponent !== 'tree'
          }],
          'List']],
      ['section', {class: windowContentStyle}, comp],
      ['footer', {
          class: 'resize',
          'data-key': 'resize'
        }]])

  css(root || el, dimensions)

  return el
}


function graphWindow (graphStyle, dispatch, component, root) {

  const graph = component(graphView, 'state.graph.viewData')

  const el = root || h(
    ['article', {
        'data-key': 'graph',
        class: classes('tvs-flow-graph', windowStyle),
        onmousedown: setActiveWindow('graph', dispatch)
      },
      ['header',
        icon.graph(),
        ' Graph ',
        component(scaleSlider, 'state.graph.viewBox')],
      graph,
      ['footer', {class: 'resize'}]])

  css(el, { ...graphStyle })

  requestAnimationFrame(function() {
    dispatch('updateGraphSize', {
      width: graph.clientWidth,
      height: graph.clientHeight
    })
  })

  return el
}


function entitiesWindow ({dimensions, node}, dispatch, component, root) {
  const view = node.procedure
    ? processView(node, dispatch)
    : component(entityView, 'state.gui.entityViewProps')

  const el = h(
    ['article', {
        'data-key': 'entities',
        class: classes('tvs-flow-entities', windowStyle),
        onmousedown: setActiveWindow('entities', dispatch)
      },
      ['header',
        icon.entities(), ' ',
        node.id],
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
  const graph = visibility.graph ? component(graphWindow, 'state.gui.graphWindow') : ''
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
