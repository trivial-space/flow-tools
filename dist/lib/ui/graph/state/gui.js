var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { val, stream, asyncStream } from "tvs-flow/dist/lib/utils/entity-reference";
import { unequal, defined, and, notEmpty } from "tvs-libs/dist/lib/utils/predicates";
import { action, mouse, windowSize } from "../events";
import { entityTree, runtime, graph } from "./flow";
export var title = val('').accept(notEmpty);
export var visibility = val({
    tree: false,
    graph: false,
    entities: false,
})
    .react([action.HOT], function (self, _a) {
    var type = _a.type, payload = _a.payload;
    if (type === "state.gui.updateVisibility") {
        return __assign({}, self, (_b = {}, _b[payload] = !self[payload], _b));
    }
    var _b;
})
    .accept(defined);
export var activeWindow = stream([action.HOT], function (_a) {
    var type = _a.type, payload = _a.payload;
    if (type === "state.gui.setActiveWindow"
        || type === "state.gui.updateVisibility") {
        return payload;
    }
})
    .accept(and(defined, unequal));
export var zIndex = val(0)
    .react([activeWindow.HOT], function (self) { return self + 1; });
export var controlsPosition = val({
    left: 0,
    top: 0,
    zIndex: 0
})
    .react([activeWindow.COLD, mouse.HOT], function (self, window, mouse) {
    var delta = mouse.dragDelta;
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
    .react([activeWindow.COLD, mouse.HOT, windowSize.COLD], function (self, window, mouse, size) {
    var delta = mouse.dragDelta;
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
export var treeViewProps = val({
    treeViewComponent: 'tree'
})
    .react([action.HOT], function (self, action) {
    if (action.type === "state.gui.setTreeView") {
        return __assign({}, self, { treeViewComponent: action.payload });
    }
})
    .accept(defined);
export var treeFold = val({})
    .react([action.HOT], function (self, _a) {
    var type = _a.type, payload = _a.payload;
    if (type === 'state.gui.toggleTreeLevel') {
        return __assign({}, self, (_b = {}, _b[payload] = !self[payload], _b));
    }
    var _b;
})
    .accept(defined);
export var treeData = stream([treeFold.HOT, entityTree.HOT], function (fold, tree) { return ({ fold: fold, tree: tree }); }).val({ fold: null, tree: null });
export var treeWindowProps = stream([treeWindow.HOT, treeViewProps.HOT], function (dimensions, props) { return ({ dimensions: dimensions, props: props }); });
export var graphWindow = val({
    top: 200,
    left: 100,
    width: 600,
    height: 600,
    zIndex: 0
})
    .react([activeWindow.COLD, mouse.HOT, windowSize.COLD], function (self, window, mouse, size) {
    var delta = mouse.dragDelta;
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
export var entitiesWindow = val({
    top: 50,
    left: 400,
    width: 400,
    height: 500,
    zIndex: 0
})
    .react([activeWindow.COLD, mouse.HOT, windowSize.COLD], function (self, window, mouse, size) {
    var delta = mouse.dragDelta;
    var target = mouse.pressed[0] && mouse.pressed[0].target;
    if (window === 'entities'
        && target && target.closest('.tvs-flow-entities')
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
export var activeEntity = val({})
    .react([action.HOT, graph.COLD], function (_, _a, graph) {
    var type = _a.type, payload = _a.payload;
    if (type === 'state.gui.openEntity') {
        return graph.entities[payload];
    }
})
    .accept(defined);
export var activeProcess = val({})
    .react([action.HOT, graph.COLD], function (_, _a, graph) {
    var type = _a.type, payload = _a.payload;
    if (type === 'state.gui.openProcess') {
        return graph.processes[payload];
    }
})
    .accept(defined);
export var activeNode = val({})
    .react([activeEntity.HOT], function (_, e) { return e; })
    .react([activeProcess.HOT], function (_, p) { return p; });
export var watchingEntity = val(true)
    .react([action.HOT], function (_, _a) {
    var type = _a.type, payload = _a.payload;
    if (type === 'setEntityEditMode') {
        return !payload;
    }
    else if (type === 'saveCurrentEntityValue') {
        return true;
    }
})
    .react([activeEntity.HOT], function () { return true; })
    .accept(defined);
export var activeValue = asyncStream([runtime.COLD, activeEntity.HOT, visibility.HOT, watchingEntity.HOT], function (send, flow, entity, visibility, watching) {
    send(flow.get(entity.id));
    if (visibility.entities && watching) {
        flow.on(entity.id, send);
        return function () { return flow.off(entity.id, send); };
    }
});
export var editedValue = val('')
    .react([action.HOT, runtime.COLD], function (self, _a, flow) {
    var type = _a.type, payload = _a.payload;
    if (type === 'updateEditedValue') {
        return payload;
    }
    else if (self && type === 'saveCurrentEntityValue') {
        requestAnimationFrame(function () {
            flow.set(payload, JSON.parse(self));
        });
    }
})
    .react([activeValue.HOT], function () { return ''; })
    .accept(and(defined, unequal));
export var entityValueView = stream([activeValue.HOT, watchingEntity.HOT], function (value, watching) { return ({ value: value, watching: watching }); }).val({ value: null, watching: true });
export var entitiesWindowProps = stream([entitiesWindow.HOT, activeNode.HOT], function (dimensions, node) { return ({ dimensions: dimensions, node: node }); });
export var entityViewProps = stream([activeEntity.HOT, watchingEntity.HOT], function (entity, watching) { return ({ entity: entity, watching: watching }); });
export var controlProps = stream([visibility.HOT, controlsPosition.HOT], function (visibility, position) { return ({ visibility: visibility, position: position }); });
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
updateWindowZIndex(entitiesWindow, 'entities');
function setSizeConstrains(dimensions, size) {
    if (dimensions.height > size.height - 40) {
        dimensions.height = size.height - 40;
    }
    if (dimensions.width > size.width - 40) {
        dimensions.width = size.width - 40;
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
updateWindowPosition(entitiesWindow);
//# sourceMappingURL=gui.js.map