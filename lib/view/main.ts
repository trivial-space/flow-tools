import { style, classes } from "typestyle";
import * as css from 'dom-css'
import { Component, h } from '../utils/yoyo';
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
        type: 'state.gui.updateVisibility',
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


function treeWindow ({props, dimensions}, dispatch, component) {
  const comp = props.treeViewComponent === 'tree' ?
    component(treeView, 'state.flow.entityTree') :
    component(listView, 'state.flow.state')

  function changeView(viewName) {
    return function() {
      dispatch({
        type: 'state.gui.setTreeView',
        payload: viewName
      })
    }
  }

  const el = h(
    ['div', {
        'data-key': 'tree',
        className: windowStyle
      },
      ['header',
        ['label',
          ['input', {
            type: 'radio',
            name: 'viewTreeComponent',
            value: 'tree',
            onchange: changeView('tree'),
            checked: props.treeViewComponent === 'tree'
          }],
          'Tree'],
        ['label',
          ['input', {
            type: 'radio',
            name: 'viewTreeComponent',
            value: 'list',
            onchange: changeView('list'),
            checked: props.treeViewComponent !== 'tree'
          }],
          'List']],
      comp])

  css(el, dimensions)

  return el
}


function treeView (entities) {
  const list: any[] = ['ul', {'data-key': 'treeView'}]

  if (entities) {
    const items = Object.keys(entities).map(eName =>
      ["li", { 'data-key': eName }, eName])
    list.push(...items)
  }

  return h(list)
}


function listView (entities) {
  const list: any[] = ['ul', {'data-key': 'listView'}]

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

  const tree = visibility.tree ? component(treeWindow, 'state.gui.treeWindowProps') : ''
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
