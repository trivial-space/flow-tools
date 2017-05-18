import { classes } from "typestyle/lib";
import { iconButtonStyle } from "./styles/ui";
export function iconBtn(_a) {
    var title = _a.title, onclick = _a.onclick, icon = _a.icon, key = _a.key, className = _a.class;
    var btn = ['button', {
            class: classes(iconButtonStyle, className),
            onmouseup: onclick,
            title: title
        }, icon];
    if (key)
        btn[1]['key'] = key;
    return btn;
}
//# sourceMappingURL=ui.js.map