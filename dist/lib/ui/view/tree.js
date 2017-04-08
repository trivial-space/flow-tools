import { h } from '../../utils/yoyo';
import { treeViewStyle } from "./styles/components";
function treeBranch(name, tree, dispatch, fold) {
    if (tree.__id__) {
        return ['li',
            ['div', {
                    onclick: function () { return dispatch('state.gui.openEntity', tree.__id__); }
                }, name]];
    }
    var li = ['li',
        ['div', {
                onclick: function () { return dispatch('state.gui.toggleTreeLevel', tree.__path__); }
            }, name]];
    if (!fold[tree.__path__]) {
        var branches = ['ul'];
        for (var k in tree) {
            if (k === "__path__")
                continue;
            branches.push(treeBranch(k, tree[k], dispatch, fold));
        }
        li.push(branches);
    }
    return li;
}
export function treeView(_a, dispatch) {
    var fold = _a.fold, tree = _a.tree;
    var list = ['ul', {
            'data-key': 'treeView',
            class: treeViewStyle
        }];
    if (tree) {
        var items = Object.keys(tree).map(function (name) {
            return treeBranch(name, tree[name], dispatch, fold);
        });
        list.push.apply(list, items);
    }
    return h(list);
}
export function listView(entities, dispatch) {
    var list = ['ul', { 'data-key': 'listView' }];
    if (entities) {
        var items = Object.keys(entities).sort().map(function (name) {
            return ["li", {
                    'data-key': name,
                    onclick: function () { return dispatch('state.gui.openEntity', name); }
                },
                name];
        });
        list.push.apply(list, items);
    }
    return h(list);
}
//# sourceMappingURL=tree.js.map