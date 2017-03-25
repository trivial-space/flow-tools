import { style, classes } from "typestyle";
import * as css from 'dom-css'
import { Component, h } from '../utils/yoyo';
import * as icon from "./icons";
import { highlightColor, mainStyle } from "./styles/main";
import { iconBtn } from "./ui";
import { radioBtnStyle } from "./styles/ui";
import { windowContentStyle, controlsStyle, windowStyle, treeViewStyle } from "./styles/components";


function title (title) {
  return h(['h1', title])
}


const activeButton = style({
  color: highlightColor
})


function setActiveWindow(label, dispatch) {
  return () => dispatch({
    type: 'state.gui.setActiveWindow',
    payload: label
  })
}

function controls({visibility, position}, dispatch, component, root) {

  function click(label) {
    return function() {
      dispatch({
        type: 'state.gui.updateVisibility',
        payload: label
      })
    }
  }

  const el = h(
    ['header', {
        class: classes('tvs-controls', controlsStyle),
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
      dispatch({
        type: 'state.gui.setTreeView',
        payload: viewName
      })
    }
  }

  const el = h(
    ['div', {
        'data-key': 'tree',
        class: windowStyle,
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
      ['section', {class: windowContentStyle}, comp]])

  css(root || el, dimensions)

  return el
}


function treeBranch (name, tree, dispatch, fold) {
  if (tree.__id__) {
    return ['li',
      ['div', {
        onclick: () => dispatch({
          type: 'state.gui.openEntity',
          payload: tree.__id__,
        })
      }, name]]
  }

  const li = ['li',
    ['div', {
      onclick: () => dispatch({
        type: 'state.gui.toggleTreeLevel',
        payload: tree.__path__
      })
    }, name]]


  if (!fold[tree.__path__]) {
    const branches: any[] = ['ul']

    for (let k in tree) {
      if (k === "__path__") continue
      branches.push(treeBranch(k, tree[k], dispatch, fold))
    }

    li.push(branches)
  }

  return li
}


function treeView ({fold, tree}, dispatch) {
  const list: any[] = ['ul', {
    'data-key': 'treeView',
    class: treeViewStyle
  }]

  if (tree) {
    const items = Object.keys(tree).map(name =>
      treeBranch(name, tree[name], dispatch, fold))
    list.push(...items)
  }

  return h(list)
}


function listView (entities, dispatch) {
  const list: any[] = ['ul', {'data-key': 'listView'}]

  if (entities) {
    const items = Object.keys(entities).map(name =>
      ["li", {
        'data-key': name,
        onclick: () => dispatch({
          type: 'state.gui.openEntity',
          payload: name
        })
      }, name])
    list.push(...items)
  }

  return h(list)
}


function graphWindow (graph, dispatch, _, root) {
  const el = h(['div', {
    'data-key': 'graph',
    class: windowStyle,
    onmousedown: setActiveWindow('graph', dispatch)
  }, 'Graph'])

  css(root || el, { ...graph })

  return el
}


function jsonCode (value) {
  return h(
    ['code',
      ['pre',
        JSON.stringify(value, null, '   ')]]
  )
}

function entitiesWindow ({dimensions, entity}, dispatch, component, root) {
  const el = h(
    ['div', {
        'data-key': 'entities',
        class: windowStyle,
        onmousedown: setActiveWindow('entities', dispatch)
    },
      ['header',
        icon.entities(), ' ',
        entity && entity.id],
      ['section', { class: windowContentStyle },
        component(jsonCode, 'state.gui.activeValue')]])

  css(root || el, { ...dimensions })

  return el
}


function root (visibility, _, component) {

  const tree = visibility.tree ? component(treeWindow, 'state.gui.treeWindowProps') : ''
  const graph = visibility.graph ? component(graphWindow, 'state.gui.graphWindow') : ''
  const entities = visibility.entities ? component(entitiesWindow, 'state.gui.entitiesWindowProps') : ''

  const el = h(['article', {class: classes('tvs-tools', mainStyle)},
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
