import { treeViewStyle } from "./styles/components";
import { style } from "typestyle/lib";
import * as icon from "./icons";
import { iconBtn } from "./ui";
import { iconButtonLightStyle } from "./styles/ui";
import { FLOW, GUI } from "ui/actions";
var openIcon = style({
    transform: 'rotate(90deg)'
});
function treeBranch(name, tree, selected, dispatch, fold) {
    if (tree.__entity__) {
        var e_1 = tree.__entity__;
        var btns = ['span', {
                class: 'entity-controls'
            },
            iconBtn({
                icon: icon.show(),
                class: iconButtonLightStyle,
                onclick: function () { return dispatch(FLOW.ENTITY_INSPECT, e_1.id); },
                title: "Inspect entity value"
            })];
        if (e_1.value != null) {
            btns.push(iconBtn({
                class: iconButtonLightStyle,
                onclick: function () { return dispatch(FLOW.ENTITY_RESET, e_1.id); },
                icon: icon.reset(),
                title: "Reset entity value"
            }));
        }
        var className = 'entity-item';
        if (selected === e_1.id)
            className += ' selected';
        return ['li',
            ['div', {
                    class: className,
                    onclick: function () { return dispatch(GUI.ENTITIES.OPEN_ENTITY, e_1.id); }
                },
                (e_1.value != null) ? icon.stopMarked() : icon.stop(),
                ' ' + name + ' ',
                btns]];
    }
    var li = ['li',
        ['div', {
                onclick: function () { return dispatch(GUI.TREE.TOGGLE_LEVEL, tree.__path__); }
            },
            icon.more(fold[tree.__path__] ? '' : openIcon),
            ' ' + name]];
    if (!fold[tree.__path__]) {
        var branches = ['ul'];
        for (var k in tree) {
            if (k === "__path__")
                continue;
            branches.push(treeBranch(k, tree[k], selected, dispatch, fold));
        }
        li.push(branches);
    }
    return li;
}
export function treeView(_a, dispatch) {
    var fold = _a.fold, tree = _a.tree, selected = _a.selected;
    var list = ['ul', { class: treeViewStyle }];
    if (tree) {
        var items = Object.keys(tree).map(function (name) {
            return treeBranch(name, tree[name], selected.id, dispatch, fold);
        });
        list.push.apply(list, items);
    }
    return list;
}
//# sourceMappingURL=tree.js.map