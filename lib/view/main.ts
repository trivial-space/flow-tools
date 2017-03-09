import * as yo from 'yo-yo'
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
    <ul class="tvs-controls-btns">
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


export function mainView (component: Component) {
  return component(controls, 'state.gui.visibility')
}
