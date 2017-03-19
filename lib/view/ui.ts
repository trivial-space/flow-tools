import { classes } from "typestyle/lib";
import { buttonStyle } from "./styles/ui";



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
    class: classes(buttonStyle, className),
    title,
    onclick
  }, icon]

}
