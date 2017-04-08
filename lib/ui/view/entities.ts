import { h } from '../../utils/yoyo';
import * as icon from "./icons";
import { iconBtn } from "./ui";
import { buttonStyle } from "./styles/ui";
import { windowContentStyle, entityViewStyle } from "./styles/components";


function jsonCode ({value, watching}, dispatch) {
  let code = ''
  if (value) {
    try {
      code = JSON.stringify(value, null, '  ')
    } catch (e) {
      code = 'Error: ' + e.message
    }
  }

  return h(
    ['code',
      ['pre', {
          contenteditable: !watching,
          oninput: e => dispatch('updateEditedValue', e.target.textContent)
        },
        code]]
  )
}


export function entityView ({entity, watching}, dispatch, component) {
  const buttons: any = ['div', {
    'style': 'margin-top: 4px'
  }]

  if (watching) {

    buttons.push(
      ['button', {
          class: buttonStyle,
          onclick: () => dispatch('setEntityEditMode', true)
        }, 'Edit'],
      iconBtn({
        key: 'inspect-btn' + entity.id,
        onclick: () => dispatch('flowEntityInspect', entity.id),
        icon: icon.show(),
        title: "Inspect entity value"
      }))

    if (entity.value) {
      buttons.push(
        iconBtn({
          key: 'reset-btn' + entity.id,
          onclick: () => dispatch('flowEntityReset', entity.id),
          icon: icon.reset(),
          title: "Reset entity value"
        }))
    }

  } else {
    buttons.push(
      ['button', {
          class: buttonStyle,
          'data-key': 'cancel-btn',
          onclick: () => dispatch('setEntityEditMode', false)
        }, 'Cancel'],
      ['button', {
          class: buttonStyle,
          'data-key': 'save-btn' + entity.id,
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
        component(jsonCode, 'state.gui.entityValueView')],
      buttons]
  )

  return el
}


export function processView (process, dispatch) {
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

