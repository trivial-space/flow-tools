import { classes } from "typestyle/lib";
import { iconButtonStyle } from "./styles/ui";



export function iconBtn({
  title,
  onclick,
  icon,
  class: className,
}: {
  title?: string
  onclick?: Function
  icon?: SVGElement,
  class?: string
}) {
  return ['button', {
    class: classes(iconButtonStyle, className),
    title,
    onclick
  }, icon]

}
