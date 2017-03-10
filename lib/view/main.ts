import * as yo from 'yo-yo'
import * as css from 'dom-css'
import { Component } from "utils/yoyo-component";


function title(title) {
  return yo`<h1>${title}</h1>`
}


function controls(visibility, dispatch, component) {

  function click(label) {
    return function() {
      dispatch({
        type: 'update-visibility',
        payload: label
      })
    }
  }

  return yo`<section class="tvs-controls">
    ${component(title, 'state.gui.title')}
    <ul id="tvs-controls-btns">
      <li>
        <button class="${visibility.tree ? "active": ""}" onclick=${click('tree')}>
          tree
        </button>
      </li>
      <li>
        <button class="${visibility.graph ? "active": ""}" onclick=${click('graph')}>
          graph
        </button>
      </li>
      <li>
        <button class="${visibility.entities ? "active": ""}" onclick=${click('entities')}>
          entities
        </button>
      </li>
    </ul>
  </section>`
}


const windowStyle = {
  position: 'absolute'
}


function treeWindow (tree) {
  const el = yo`<div id="tvs-tools-tree">Tree</div>`

  css(el, {
    ...windowStyle,
    ...tree,
    backgroundColor: 'tomato'
  })

  return el
}


function graphWindow (graph) {
  const el = yo`<div id="tvs-tools-graph">Graph</div>`

  css(el, {
    ...windowStyle,
    ...graph,
    backgroundColor: 'green'
  })

  return el
}

function entitiesWindow (entities) {
  const el = yo`<div id="tvs-tools-entities">Entities</div>`

  css(el, {
    ...windowStyle,
    ...entities,
    backgroundColor: 'aqua'
  })

  return el
}


function root (visibility, dispatch, component) {

  const tree = visibility.tree ? component(treeWindow, 'state.gui.treeWindow') : ''
  const graph = visibility.graph ? component(graphWindow, 'state.gui.graphWindow') : ''
  const entities = visibility.entities ? component(entitiesWindow, 'state.gui.entitiesWindow') : ''

  const el = yo`<div id="tvs-tools">
    ${controls(visibility, dispatch, component)}
    ${tree}
    ${graph}
    ${entities}
  </div>`

  css(el, {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  })

  return el
}


export function mainView (component: Component) {
  return component(root, 'state.gui.visibility')
}
