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


function title (title) {
  return ['h1', title]
}


const activeButton = style({
  color: highlightColor
})


function setActiveWindow(label, dispatch) {
  return () => dispatch('state.gui.setActiveWindow', label)
}


function controls({visibility, position}, dispatch, component) {

  const click =
    label =>
      () => dispatch('state.gui.updateVisibility', label)

  const el =
    ['header', {
        class: classes('tvs-flow-controls', controlsStyle),
        onmousedown: setActiveWindow('controls', dispatch),
        style: {...position}
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
            })]]]]

  return el
}


function treeWindow ({dimensions, window}, dispatch, component) {
  const el =
    ['article', {
        'data-key': 'tree',
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
          onclick: () => dispatch('closeWindow', 'tree')
        })],
      ['section', {class: windowContentStyle}, component(treeView, 'state.gui.treeData')],
      ['footer', {
          class: 'resize',
          'data-key': 'resize'
        }]]

  return el
}


function graphWindow ({dimensions, window}, dispatch, component) {

  const graph = component(graphView, 'state.graph.viewData')

  function updateGraphSize (parent) {
    if (parent && parent.querySelector) {
      const graphNode = parent.querySelector('section')
      dispatch('updateGraphSize', {
        width: graphNode.clientWidth,
        height: graphNode.clientHeight
      })
    }
  }

  const el =
    ['article', {
        'data-key': 'graph',
        ref: updateGraphSize,
        class: classes('tvs-flow-graph', windowStyle),
        style: {...dimensions},
        onmousedown: setActiveWindow('graph', dispatch)
      },
      ['header',
        icon.graph(window === "graph" ? 'selected': ''),
        ' Graph ',
        ['span', {class: 'gap'}],
        component(scaleSlider, 'state.graph.viewBox'),
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
          onclick: () => dispatch('closeWindow', 'graph')
        })],
      graph,
      ['footer', {
          'data-key': 'resize',
          class: 'resize'
        }]]

  return el
}


function entitiesWindow ({dimensions, node, window}, dispatch, component) {
  const view = node && node.procedure
    ? processView(node, dispatch)
    : component(entityView, 'state.gui.entityViewProps')

  const el =
    ['article', {
        'data-key': 'entities',
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
          onclick: () => dispatch('closeWindow', 'entities')
        })],
      view,
      ['footer', {
          class: 'resize',
          'data-key': 'resize'
        }]]

  return el
}


function root (visibility, _, component) {

  const tree = visibility.tree ? component(treeWindow, 'state.gui.treeWindowProps') : ''
  const graph = visibility.graph ? component(graphWindow, 'state.gui.graphWindowProps') : ''
  const entities = visibility.entities ? component(entitiesWindow, 'state.gui.entitiesWindowProps') : ''

  const el = ['article', {class: classes('tvs-flow-tools', mainStyle)},
    component(controls, 'state.gui.controlProps'),
    graph,
    entities,
    tree
  ]

  return el
}


export function mainView (component: Component): ComponentClass {
  return component(root, 'state.gui.visibility')
}
