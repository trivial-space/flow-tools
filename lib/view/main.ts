import { style, classes } from "typestyle";
import * as css from 'dom-css'
import { h } from './utils'
import { Component } from '../utils/yoyo-component';
import * as icon from "./icons";
import { highlightColor, buttonStyle, mainStyle, controlsStyle } from "./styles/main";


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

  const el =
    h(['header', {className: classes('tvs-controls', controlsStyle)},
        component(title, 'state.gui.title'),
        ['nav', {className: 'tvs-controls-btns'},
          ['ul',
            ['li',
              ['button', {
                  className: buttonStyle,
                  onclick: click('tree')
                },
                icon.list(visibility.tree && activeButton)]],
            ['li',
              ['button', {
                  className: buttonStyle,
                  onclick: click('graph')
                },
                icon.graph(visibility.graph && activeButton)]],
            ['li',
              ['button', {
                  className: buttonStyle,
                  onclick: click('entities')
                },
                icon.entities(visibility.entities && activeButton)]]]]])

  return el
}


const windowStyle = style({
  position: 'absolute'
})


function treeWindow (tree) {
  const el = h(['div', {
    'data-key': 'tree',
    className: windowStyle
  }, 'Tree'])

  css(el, {
    ...tree,
    backgroundColor: 'tomato'
  })

  return el
}


function graphWindow (graph) {
  const el = h(['div', {
    'data-key': 'graph',
    className: windowStyle
  }, 'Graph'])

  css(el, {
    ...graph,
    backgroundColor: 'green'
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
    tree,
    graph,
    entities
  ])

  return el
}


export function mainView (component: Component) {
  return component(root, 'state.gui.visibility')
}
