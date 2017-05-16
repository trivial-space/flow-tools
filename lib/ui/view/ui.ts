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
  icon?: any[],
  class?: string,
  key?: string
}) {
  const btn: any[] = ['button', {
    class: classes(iconButtonStyle, className),
    onmouseup: onclick,
    title
  }, icon]

  if (key) btn[1]['key'] = key

  return btn
}
