import { classes } from "typestyle/lib";
import { iconButtonStyle } from "./styles/ui";



export function iconBtn({
  title,
  onclick,
  icon,
  key,
  class: className,
}: {
  title?: string
  onclick?: Function
  icon?: SVGElement,
  class?: string,
  key?: string
}) {
  const btn: any = ['button', {
    class: classes(iconButtonStyle, className),
    onmouseup: onclick,
    title
  }, icon]

  if (key) btn[1]['data-key'] = key

  return btn
}
