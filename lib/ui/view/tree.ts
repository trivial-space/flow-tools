import { h } from '../../utils/yoyo';
import { treeViewStyle } from "./styles/components";


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


export function treeView ({fold, tree}, dispatch) {
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


export function listView (entities, dispatch) {
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


