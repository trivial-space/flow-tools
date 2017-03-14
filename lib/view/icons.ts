import * as yo from 'yo-yo'
import { style, classes } from 'typestyle'


export const iconClass = style({
  display: 'inline-block',
  width: '1em',
  height: '1em',
  strokeWidth: 0,
  stroke: 'currentColor',
  fill: 'currentColor'
})


export function check (...moreClasses) {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 24 24">
<title>check</title>
<path d="M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z"></path>
</svg>`
}


export function close (...moreClasses) {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 24 24">
<title>close</title>
<path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
</svg>`
}


export function graph (...moreClasses) {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 24 24">
<title>graph</title>
<path d="M18 16.078c1.594 0 2.906 1.313 2.906 2.906s-1.313 2.953-2.906 2.953-2.906-1.359-2.906-2.953c0-0.234 0-0.469 0.047-0.656l-7.078-4.125c-0.563 0.516-1.266 0.797-2.063 0.797-1.641 0-3-1.359-3-3s1.359-3 3-3c0.797 0 1.5 0.281 2.063 0.797l7.031-4.078c-0.047-0.234-0.094-0.469-0.094-0.703 0-1.641 1.359-3 3-3s3 1.359 3 3-1.359 3-3 3c-0.797 0-1.5-0.328-2.063-0.844l-7.031 4.125c0.047 0.234 0.094 0.469 0.094 0.703s-0.047 0.469-0.094 0.703l7.125 4.125c0.516-0.469 1.219-0.75 1.969-0.75z"></path>
</svg>`
}


export function list (...moreClasses) {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 24 24">
<title>list</title>
<path d="M9 5.016h12v3.984h-12v-3.984zM9 18.984v-3.984h12v3.984h-12zM9 14.016v-4.031h12v4.031h-12zM3.984 9v-3.984h4.031v3.984h-4.031zM3.984 18.984v-3.984h4.031v3.984h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031z"></path>
</svg>`
}


export function entities (...moreClasses) {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 24 24">
<title>entities</title>
<path d="M16.641 1.688l5.672 5.672-5.672 5.625h4.359v8.016h-8.016v-8.016h3.656l-5.625-5.625v3.656h-8.016v-8.016h8.016v4.359zM3 21v-8.016h8.016v8.016h-8.016z"></path>
</svg>`
}
