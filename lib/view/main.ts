import { style, classes } from "typestyle";
import * as css from 'dom-css'
import { h } from './utils'
import { Component } from '../utils/yoyo-component';
import * as icon from "./icons";
import { highlightColor, mainStyle, controlsStyle, windowStyle } from "./styles/main";
import { iconBtn } from "./ui";


function title(title) {
  return h(['h1', title])
}


const activeButton = style({
  color: highlightColor
})


function controls(visibility, dispatch, component) {

  function click(label) {
    return function() {
      dispatch({
        type: 'update-visibility',
        payload: label
      })
    }
  }

  return h(
    ['header', {className: classes('tvs-controls', controlsStyle)},
      component(title, 'state.gui.title'),
      ['nav', {className: 'tvs-controls-btns'},
        ['ul',
          ['li',
            iconBtn({
              className: visibility.tree && activeButton,
              onclick: click('tree'),
              icon: icon.list(),
              title: "toggle entity tree"
            })],
          ['li',
            iconBtn({
              className: visibility.graph && activeButton,
              onclick: click('graph'),
              icon: icon.graph(),
              title: "toggle flow graph"
            })],
          ['li',
            iconBtn({
              className: visibility.entities && activeButton,
              onclick: click('entities'),
              icon: icon.entities(),
              title: "toggle entity details"
            })]]]])
}


function treeWindow (windowDimensions, _, component) {
  const el = h(['div', {
    'data-key': 'tree',
    className: windowStyle
  }, component(treeView, 'state.flow.state')])

  css(el, windowDimensions)

  return el
}


function treeView (entities) {
  const list: any[] = ['ul']

  if (entities) {
    const items = Object.keys(entities).map(eName =>
      ["li", { 'data-key': eName }, eName])
    list.push(...items)
  }

  return h(list)
}


function graphWindow (graph) {
  const el = h(['div', {
    'data-key': 'graph',
    className: windowStyle
  }, 'Graph'])

  css(el, {
    ...graph,
    backgroundColor: 'tomato'
  })

  return el
}


function entitiesWindow (entities) {
  const el = h(['div', {
    'data-key': 'entities',
    className: windowStyle
  }, 'Entities'])

  css(el, {
    ...entities,
    backgroundColor: 'aqua'
  })

  return el
}


function root (visibility, dispatch, component) {

  const tree = visibility.tree ? component(treeWindow, 'state.gui.treeWindow') : ''
  const graph = visibility.graph ? component(graphWindow, 'state.gui.graphWindow') : ''
  const entities = visibility.entities ? component(entitiesWindow, 'state.gui.entitiesWindow') : ''

  const el = h(['article', {className: classes('tvs-tools', mainStyle)},
    controls(visibility, dispatch, component),
    graph,
    entities,
    tree
  ])

  return el
}


export function mainView (component: Component) {
  return component(root, 'state.gui.visibility')
}
