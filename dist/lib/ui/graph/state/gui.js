"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { val, stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { unequal, defined, and } from 'tvs-libs/dist/lib/utils/predicates';
import { action, mouse, windowSize, dragDeltas } from '../events';
import { GUI } from '../../actions';
import { metaTree, metaGraph, metaEntity } from './flow';
export var metaTreeWindow = stream([metaTree.HOT], function (t) { return t.window; })
    .accept(and(defined, unequal));
export var metaGraphWindow = stream([metaGraph.HOT], function (g) { return g.window; })
    .accept(and(defined, unequal));
export var metaEntityWindow = stream([metaEntity.HOT], function (t) { return t.window; })
    .accept(and(defined, unequal));
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
export var activeWindow = stream([action.HOT], function (_a) {
    var type = _a.type, payload = _a.payload;
    if (type === GUI.MAIN.SET_ACTIVE_WINDOW
        || type === GUI.MAIN.UPDATE_VISIBILITY) {
        return payload;
    }
})
    .accept(and(defined, unequal))
    .val('');
export var zIndex = val(0)
    .react([activeWindow.HOT], function (self) { return self + 1; });
export var controlsPosition = val({
    left: 0,
    top: 0,
    zIndex: 0
})
    .react([activeWindow.COLD, dragDeltas.HOT, mouse.COLD, windowSize.COLD], function (self, window, delta, mouse, size) {
    var target = mouse.pressed[0] && mouse.pressed[0].target;
    if (window === 'controls'
        && target && target.closest('.tvs-flow-controls')
        && (delta.x || delta.y)) {
        self.left -= delta.x;
        self.top -= delta.y;
        if (self.top < 0)
            self.top = 0;
        if (self.left < 0)
            self.left = 0;
        if (self.top > size.height - 20)
            self.top = size.height - 20;
        if (self.left > size.width - 20)
            self.left = size.width - 20;
        return self;
    }
})
    .accept(defined);
export var treeWindow = val({
    top: 100,
    left: 0,
    width: 300,
    height: 400,
    zIndex: 0
})
    .react([activeWindow.COLD, mouse.COLD, dragDeltas.HOT, windowSize.COLD], function (self, window, mouse, delta, size) {
    var target = mouse.pressed[0] && mouse.pressed[0].target;
    if (window === 'tree'
        && target && target.closest('.tvs-flow-tree')
        && (delta.x || delta.y)) {
        if (target.className === 'resize') {
            self.width -= delta.x;
            self.height -= delta.y;
        }
        else {
            self.left -= delta.x;
            self.top -= delta.y;
        }
        return setSizeConstrains(self, size);
    }
})
    .accept(defined);
export var graphWindow = val({
    top: 200,
    left: 100,
    width: 600,
    height: 600,
    zIndex: 0
})
    .react([activeWindow.COLD, mouse.COLD, dragDeltas.HOT, windowSize.COLD], function (self, window, mouse, delta, size) {
    var target = mouse.pressed[0] && mouse.pressed[0].target;
    if (window === 'graph'
        && target && target.closest('.tvs-flow-graph')
        && (delta.x || delta.y)) {
        if (target.className === 'resize') {
            self.width -= delta.x;
            self.height -= delta.y;
            return setSizeConstrains(self, size);
        }
        else if (!target.closest('svg')) {
            self.left -= delta.x;
            self.top -= delta.y;
            return setSizeConstrains(self, size);
        }
    }
})
    .accept(defined);
export var entityWindow = val({
    top: 50,
    left: 400,
    width: 400,
    height: 500,
    zIndex: 0
})
    .react([activeWindow.COLD, mouse.COLD, dragDeltas.HOT, windowSize.COLD], function (self, window, mouse, delta, size) {
    var target = mouse.pressed[0] && mouse.pressed[0].target;
    if (window === 'entity'
        && target && target.closest('.tvs-flow-entity')
        && !target.closest('pre')
        && (delta.x || delta.y)) {
        if (target.className === 'resize') {
            self.width -= delta.x;
            self.height -= delta.y;
        }
        else {
            self.left -= delta.x;
            self.top -= delta.y;
        }
        return setSizeConstrains(self, size);
    }
})
    .accept(defined);
function updateWindowZIndex(entity, name) {
    entity.react([activeWindow.COLD, zIndex.HOT], function (self, window, zIndex) {
        if (window === name) {
            self.zIndex = zIndex;
            return self;
        }
    });
}
updateWindowZIndex(controlsPosition, 'controls');
updateWindowZIndex(treeWindow, 'tree');
updateWindowZIndex(graphWindow, 'graph');
updateWindowZIndex(entityWindow, 'entity');
function setSizeConstrains(dimensions, size) {
    if (dimensions.height > size.height - 20) {
        dimensions.height = size.height - 20;
    }
    if (dimensions.width > size.width - 20) {
        dimensions.width = size.width - 20;
    }
    if (dimensions.top > size.height - 20) {
        dimensions.top = size.height - 20;
    }
    if (dimensions.left > size.width - 20) {
        dimensions.left = size.width - 20;
    }
    if (dimensions.top < 0)
        dimensions.top = 0;
    if (dimensions.left < 0)
        dimensions.left = 0;
    return dimensions;
}
function updateWindowPosition(entity) {
    entity.react([windowSize.HOT], setSizeConstrains);
}
updateWindowPosition(controlsPosition);
updateWindowPosition(treeWindow);
updateWindowPosition(graphWindow);
updateWindowPosition(entityWindow);
//# sourceMappingURL=gui.js.map