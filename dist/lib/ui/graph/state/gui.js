var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { val, stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { unequal } from 'tvs-libs/dist/lib/utils/predicates';
import { metaTree, metaGraph, metaEntity, metaControls, meta } from './flow';
export var metaTreeWindow = stream([metaTree.HOT], function (t) { return t.window; })
    .accept(unequal);
export var metaGraphWindow = stream([metaGraph.HOT], function (g) { return g.window; })
    .accept(unequal);
export var metaEntityWindow = stream([metaEntity.HOT], function (t) { return t.window; })
    .accept(unequal);
export var visibility = val({
    tree: false,
    graph: false,
    entity: false
})
    .react([metaGraphWindow.HOT], function (self, win) { return (__assign({}, self, { graph: !!win.visible })); })
    .react([metaEntityWindow.HOT], function (self, win) { return (__assign({}, self, { entity: !!win.visible })); })
    .react([metaTreeWindow.HOT], function (self, win) { return (__assign({}, self, { tree: !!win.visible })); })
    .accept(function (n, o) { return (o && n && (o.tree !== n.tree
    || o.entity !== n.entity
    || o.graph !== n.graph)); });
export var activeWindow = stream([meta.HOT], function (meta) { return meta.ui && meta.ui.activeWindow; })
    .accept(unequal);
export var zIndex = val(0)
    .react([activeWindow.HOT], function (self) { return self + 1; });
export var controlsPosition = stream([metaControls.HOT], function (controls) { return controls.position; })
    .accept(unequal);
export var treeWindow = stream([metaTreeWindow.HOT], function (win) { return win.area; })
    .accept(unequal);
export var graphWindow = stream([metaGraphWindow.HOT], function (win) { return win.area; })
    .accept(unequal);
export var entityWindow = stream([metaEntityWindow.HOT], function (win) { return win.area; })
    .accept(unequal);
function updateWindowZIndex(entity, name) {
    entity.react([activeWindow.COLD, zIndex.HOT], function (self, window, zIndex) {
        if (window === name) {
            return __assign({}, self, { zIndex: zIndex });
        }
    });
}
updateWindowZIndex(controlsPosition, 'controls');
updateWindowZIndex(treeWindow, 'tree');
updateWindowZIndex(graphWindow, 'graph');
updateWindowZIndex(entityWindow, 'entity');
//# sourceMappingURL=gui.js.map