import { h } from '../../utils/yoyo';
import { treeViewStyle } from "./styles/components";
import { style } from "typestyle/lib";
import * as icon from "./icons";


const openIcon = style({
  transform: 'rotate(90deg)'
})


function treeBranch (name, tree, dispatch, fold) {
  if (tree.__id__) {
    return ['li',
      ['div', {
          class: 'entity-item',
          onclick: () => dispatch('state.gui.openEntity', tree.__id__)
        },
        icon.stop(),
        ' ' + name + ' ',
        ['span', {
            class: 'entity-controls'
          },
          icon.show()]]]
  }

  const li = ['li',
    ['div', {
        onclick: () => dispatch('state.gui.toggleTreeLevel', tree.__path__)
      },
      icon.more(fold[tree.__path__] ? '' : openIcon),
      ' ' + name]]

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
