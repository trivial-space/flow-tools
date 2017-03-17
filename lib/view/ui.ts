import { buttonStyle } from "./styles/main";
import { classes } from "typestyle/lib";



export function iconBtn({
  title,
  onclick,
  icon,
  className,
}: {
  title?: string
  onclick?: Function
  icon?: SVGElement,
  className?: string
}) {
  return ['button', {
    className: classes(buttonStyle, className),
    title,
    onclick
  }, icon]

}
