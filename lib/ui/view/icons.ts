import * as yo from 'yo-yo'
import { style, classes } from 'typestyle'
import { h } from "../../utils/yoyo";


export const iconClass = style({
  display: 'inline-block',
  width: '1.1em',
  height: '1.1em',
  margin: 4,
  strokeWidth: 0,
  stroke: 'currentColor',
  fill: 'currentColor',
  verticalAlign: 'bottom'
})


export function check (...moreClasses: string[]): SVGElement {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 24 24">
<title>check</title>
<path d="M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z"></path>
</svg>`
}


export function close (...moreClasses: string[]): SVGElement {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 24 24">
<title>close</title>
<path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
</svg>`
}


export function graph (...moreClasses: string[]): SVGElement {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 24 24">
<title>graph</title>
<path d="M18 16.078c1.594 0 2.906 1.313 2.906 2.906s-1.313 2.953-2.906 2.953-2.906-1.359-2.906-2.953c0-0.234 0-0.469 0.047-0.656l-7.078-4.125c-0.563 0.516-1.266 0.797-2.063 0.797-1.641 0-3-1.359-3-3s1.359-3 3-3c0.797 0 1.5 0.281 2.063 0.797l7.031-4.078c-0.047-0.234-0.094-0.469-0.094-0.703 0-1.641 1.359-3 3-3s3 1.359 3 3-1.359 3-3 3c-0.797 0-1.5-0.328-2.063-0.844l-7.031 4.125c0.047 0.234 0.094 0.469 0.094 0.703s-0.047 0.469-0.094 0.703l7.125 4.125c0.516-0.469 1.219-0.75 1.969-0.75z"></path>
</svg>`
}


export function list (...moreClasses: string[]): SVGElement {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 24 24">
<title>list</title>
<path d="M9 5.016h12v3.984h-12v-3.984zM9 18.984v-3.984h12v3.984h-12zM9 14.016v-4.031h12v4.031h-12zM3.984 9v-3.984h4.031v3.984h-4.031zM3.984 18.984v-3.984h4.031v3.984h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031z"></path>
</svg>`
}


export function entities (...moreClasses: string[]): SVGElement {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 24 24">
<title>entities</title>
<path d="M16.641 1.688l5.672 5.672-5.672 5.625h4.359v8.016h-8.016v-8.016h3.656l-5.625-5.625v3.656h-8.016v-8.016h8.016v4.359zM3 21v-8.016h8.016v8.016h-8.016z"></path>
</svg>`
}


export function play (...moreClasses: string[]): SVGElement {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 32 32">
<title>play</title>
<path d="M6 4l20 12-20 12z"></path>
</svg>`
}


export function stop (...moreClasses: string[]): SVGElement {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 32 32">
<title>stop</title>
<path d="M4 4h24v24h-24z"></path>
</svg>`
}


export function reset (...moreClasses: string[]): SVGElement {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 32 32">
<title>reset</title>
<path d="M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z"></path>
</svg>`
}


export function show (...moreClasses: string[]): SVGElement {
  return yo`<svg class="${classes(iconClass, ...moreClasses)}" viewBox="0 0 32 32">
<title>show</title>
<path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
</svg>`
}


export function copy (...moreClasses: string[]): SVGElement {
  return h(
    ['svg', {
        class: classes(iconClass, ...moreClasses),
        viewBox: "0 0 32 32"
      },
      ['title', 'copy'],
      ['path', { d: "M28.681 11.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-11.5c-1.379 0-2.5 1.122-2.5 2.5v23c0 1.378 1.121 2.5 2.5 2.5h19c1.378 0 2.5-1.122 2.5-2.5v-15.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 9.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268v0zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-19c-0.271 0-0.5-0.229-0.5-0.5v-23c0-0.271 0.229-0.5 0.5-0.5 0 0 11.499-0 11.5 0v7c0 0.552 0.448 1 1 1h7v15.5z" }],
      ['path', { d: "M18.841 1.319c-1.612-1.182-2.393-1.319-2.841-1.319h-11.5c-1.378 0-2.5 1.121-2.5 2.5v23c0 1.207 0.86 2.217 2 2.45v-25.45c0-0.271 0.229-0.5 0.5-0.5h15.215c-0.301-0.248-0.595-0.477-0.873-0.681z"}]]
  )
}

export function more (...moreClasses: string[]): SVGElement {
  return h(
    ['svg', {
        class: classes(iconClass, ...moreClasses),
        viewBox: "0 0 32 32"
      },
      ['title', 'more'],
      ['path', { d: "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z" }],
      ['path', { d: "M11.086 22.086l2.829 2.829 8.914-8.914-8.914-8.914-2.828 2.828 6.086 6.086z"}]]
  )
}
