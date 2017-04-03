import { style, classes } from "typestyle";
import * as css from 'dom-css'
import { Component, h } from '../../utils/yoyo';
import * as icon from "./icons";
import { highlightColor, mainStyle } from "./styles/main";
import { iconBtn } from "./ui";
import { radioBtnStyle, buttonStyle } from "./styles/ui";
import { windowContentStyle, controlsStyle, windowStyle, treeViewStyle, entityViewStyle } from "./styles/components";
import { graphView, scaleSlider } from "./graph";


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
      dispatch('state.gui.setTreeView', viewName)
    }
  }

  const el = h(
    ['article', {
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
      ['section', {class: windowContentStyle}, comp],
      ['footer', {class: 'resize'}]])

  css(root || el, dimensions)

  return el
}


function treeBranch (name, tree, dispatch, fold) {
  if (tree.__id__) {
    return ['li',
      ['div', {
        onclick: () => dispatch('state.gui.openEntity', tree.__id__)
      }, name]]
  }

  const li = ['li',
    ['div', {
      onclick: () => dispatch('state.gui.toggleTreeLevel', tree.__path__)
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
    const items = Object.keys(entities).sort().map(name =>
      ["li", {
          'data-key': name,
          onclick: () => dispatch('state.gui.openEntity', name)
        },
        name])

    list.push(...items)
  }

  return h(list)
}


function graphWindow (graphStyle, dispatch, component, root) {

  const graph = component(graphView, 'state.graph.viewData')

  const el = root || h(
    ['article', {
        'data-key': 'graph',
        class: windowStyle,
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


function jsonCode ({value, watching}, dispatch) {
  let code = ''
  if (value) {
    try {
      code = JSON.stringify(value, null, '   ')
    } catch (e) {
      code = 'Error: ' + e.message
    }
  }

  return h(
    ['code',
      ['pre', {
          contenteditable: !watching,
          oninput: e => dispatch({
            type: 'updateEditedValue',
            payload: e.target.textContent
          })
        },
        code]]
  )
}


function entityView ({entity, watching}, dispatch, component) {
  const buttons: any = ['div', {
    'data-key': 'entity-buttons',
    'style': 'margin-top: 4px'
  }]

  if (watching) {

    buttons.push(
      ['button', {
          class: buttonStyle,
          'data-key': 'edit-button',
          onclick: () => dispatch('setEntityEditMode', true)
        }, 'Edit'])

    if (entity.value) {
      buttons.push(
        iconBtn({
          onclick: () => dispatch('flowEntityReset', entity.id),
          icon: icon.reset(),
          title: "Reset entity value"
        }))
    }

  } else {
    buttons.push(
      ['button', {
          class: buttonStyle,
          'data-key': 'cancel-button',
          onclick: () => dispatch('setEntityEditMode', false)
        }, 'Cancel'],
      ['button', {
          class: buttonStyle,
          'data-key': 'save-button',
          onclick: () => dispatch('saveCurrentEntityValue', entity.id)
        }, 'Save']
    )
  }

  const el = h(
      ['section', {
          'data-key': 'entity-view',
          class: entityViewStyle
        },
        ['div', { class: windowContentStyle },
          component(jsonCode, 'state.gui.entityView')],
        buttons]
  )

  return el
}


function processView (process, dispatch) {
  const buttons: any = ['div', {
    'data-key': 'process-buttons',
    'style': 'margin-top: 4px'
  }]

  buttons.push(
    iconBtn({
      onclick: () => dispatch('flowProcessRun', process.id),
      icon: icon.play(),
      title: "Run process"
    }))

  if (process.async) {
    buttons.push(
      iconBtn({
        onclick: () => dispatch('flowProcessStop', process.id),
        icon: icon.stop(),
        title: "Stop async process"
      }))
  }

  return h(
    ['section', {
        'data-key': 'process-view',
        class: entityViewStyle
      },
      ['div', { class: windowContentStyle },
        ['code',
          ['pre', process.procedure.toString()]]],
      buttons]
  )
}


function entitiesWindow ({dimensions, node}, dispatch, component, root) {
  const view = node.procedure
    ? processView(node, dispatch)
    : component(entityView, 'state.gui.entityViewProps')

  const el = h(
    ['article', {
        'data-key': 'entities',
        class: windowStyle,
        onmousedown: setActiveWindow('entities', dispatch)
      },
      ['header',
        icon.entities(), ' ',
        node.id],
      view,
      ['footer', {class: 'resize'}]])

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
