import { treeViewStyle } from "./styles/components";
import { style } from "typestyle/lib";
import * as icon from "./icons";
import { iconBtn } from "./ui";
import { iconButtonLightStyle } from "./styles/ui";
import { FLOW, GUI } from "ui/actions";


const openIcon = style({
  transform: 'rotate(90deg)'
})


function treeBranch (name, tree, selected, dispatch, fold) {
  if (tree.__entity__) {
    const e = tree.__entity__

    const btns =
      ['span', {
          class: 'entity-controls'
        },
        iconBtn({
          icon: icon.show(),
          class: iconButtonLightStyle,
          onclick: () => dispatch(FLOW.ENTITY_INSPECT, e.id),
          title: "Inspect entity value"
        })]

    if (e.value != null) {
      btns.push(iconBtn({
        class: iconButtonLightStyle,
        onclick: () => dispatch(FLOW.ENTITY_RESET, e.id),
        icon: icon.reset(),
        title: "Reset entity value"
      }))
    }

    let className = 'entity-item'
    if (selected === e.id) className += ' selected'

    return ['li',
      ['div', {
          class: className,
          onclick: () => dispatch(GUI.ENTITIES.OPEN_ENTITY, e.id)
        },
        (e.value != null) ? icon.stopMarked() : icon.stop(),
        ' ' + name + ' ',
        btns]]
  }

  const li = ['li',
    ['div', {
        onclick: () => dispatch(GUI.TREE.TOGGLE_LEVEL, tree.__path__)
      },
      icon.more(fold[tree.__path__] ? '' : openIcon),
      ' ' + name]]

  if (!fold[tree.__path__]) {
    const branches: any[] = ['ul']

    for (let k in tree) {
      if (k === "__path__") continue
      branches.push(treeBranch(k, tree[k], selected, dispatch, fold))
    }

    li.push(branches)
  }

  return li
}


export function treeView ({fold, tree, selected}, dispatch) {
  const list: any[] = ['ul', { class: treeViewStyle }]

  if (tree) {
    const items = Object.keys(tree).map(name =>
      treeBranch(name, tree[name], selected.id, dispatch, fold))
    list.push(...items)
  }

  return list
}
