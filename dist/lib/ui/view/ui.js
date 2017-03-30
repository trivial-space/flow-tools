import { classes } from "typestyle/lib";
import { iconButtonStyle } from "./styles/ui";
export function iconBtn(_a) {
    var title = _a.title, onclick = _a.onclick, icon = _a.icon, className = _a.class;
    return ['button', {
            class: classes(iconButtonStyle, className),
            title: title,
            onclick: onclick
        }, icon];
}
//# sourceMappingURL=ui.js.map