import {h1, section, ul, li, button, div} from './utils'
import * as css from 'dom-css'
import * as cn from 'classnames'
import { Component } from "utils/yoyo-component";


function title(title) {
  return h1({}, [title])
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

  const el =
    section({className: 'tvs-controls'}, [
      component(title, 'state.gui.title'),
      ul({className: 'tvs-controls-btns'}, [
        li({}, [
          button({
            className: cn({active: visibility.tree}),
            onclick: click('tree')
          }, ['tree'])]),
        li({}, [
          button({
            className: cn({active: visibility.graph}),
            onclick: click('graph')
          }, ['graph'])]),
        li({}, [
          button({
            className: cn({active: visibility.entities}),
            onclick: click('entities')
          }, ['entities'])]),
      ])
    ])

  return el
}


const windowStyle = {
  position: 'absolute'
}


function treeWindow (tree) {
  const el = div({"data-key": "tree"}, ['Tree'])

  css(el, {
    ...windowStyle,
    ...tree,
    backgroundColor: 'tomato'
  })

  return el
}


function graphWindow (graph) {
  const el = div({"data-key": "graph"}, ['Graph'])

  css(el, {
    ...windowStyle,
    ...graph,
    backgroundColor: 'green'
  })

  return el
}

function entitiesWindow (entities) {
  const el = div({"data-key": "entities"}, ['Entities'])

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

  const el = div({id: "tvs-tools"}, [
    controls(visibility, dispatch, component),
    tree,
    graph,
    entities
  ])

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
