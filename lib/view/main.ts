import * as yo from 'yo-yo'
import { Component } from "utils/yoyo-component";


function template(state) {
  return yo`<h1>${state.title}</h1>`
}


export function view (component: Component) {
  return component(template, 'state.viewState')
}
