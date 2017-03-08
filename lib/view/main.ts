import * as yo from 'yo-yo'
import { Component } from "utils/yoyo-component";


function template(title) {
  return yo`<h1>${title}</h1>`
}


export function mainView (component: Component) {
  return component(template, 'view.title')
}
