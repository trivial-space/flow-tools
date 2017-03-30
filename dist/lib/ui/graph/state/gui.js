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
import { action, mouse } from "../events";
import { entityTree, runtime, graph } from "./flow";
export var title = val('flow inspector')
    .accept(notEmpty);
export var activeWindow = stream([action.HOT], function (_a) {
    var type = _a.type, payload = _a.payload;
    if (type === "state.gui.setActiveWindow") {
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
    if (window === 'controls' && (delta.x || delta.y)) {
        self.left -= delta.x;
        self.top -= delta.y;
        return self;
    }
})
    .react([activeWindow.COLD, zIndex.HOT], function (self, window, zIndex) {
    if (window === 'controls') {
        self.zIndex = zIndex;
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
    .react([activeWindow.COLD, mouse.HOT], function (self, window, mouse) {
    var delta = mouse.dragDelta;
    if (window === 'tree' && mouse.pressed[0] && (delta.x || delta.y)) {
        if (mouse.pressed[0].target.className === 'resize') {
            self.width -= delta.x;
            self.height -= delta.y;
        }
        else {
            self.left -= delta.x;
            self.top -= delta.y;
        }
        return self;
    }
})
    .react([activeWindow.COLD, zIndex.HOT], function (self, window, zIndex) {
    if (window === 'tree') {
        self.zIndex = zIndex;
        return self;
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
    .react([activeWindow.COLD, mouse.HOT], function (self, window, mouse) {
    var delta = mouse.dragDelta;
    if (window === 'graph' && mouse.pressed[0] && (delta.x || delta.y)) {
        if (mouse.pressed[0].target.className === 'resize') {
            self.width -= delta.x;
            self.height -= delta.y;
            return self;
        }
        else if (!mouse.pressed[0].target.closest('svg')) {
            self.left -= delta.x;
            self.top -= delta.y;
            return self;
        }
    }
})
    .react([activeWindow.COLD, zIndex.HOT], function (self, window, zIndex) {
    if (window === 'graph') {
        self.zIndex = zIndex;
        return self;
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
    .react([activeWindow.COLD, mouse.HOT], function (self, window, mouse) {
    var delta = mouse.dragDelta;
    if (window === 'entities' && mouse.pressed[0] && (delta.x || delta.y)) {
        if (mouse.pressed[0].target.className === 'resize') {
            self.width -= delta.x;
            self.height -= delta.y;
        }
        else {
            self.left -= delta.x;
            self.top -= delta.y;
        }
        return self;
    }
})
    .react([activeWindow.COLD, zIndex.HOT], function (self, window, zIndex) {
    if (window === 'entities') {
        self.zIndex = zIndex;
        return self;
    }
})
    .accept(defined);
export var visibility = val({
    tree: true,
    graph: true,
    entities: true,
})
    .react([action.HOT], function (self, _a) {
    var type = _a.type, payload = _a.payload;
    if (type === "state.gui.updateVisibility") {
        return __assign({}, self, (_b = {}, _b[payload] = !self[payload], _b));
    }
    var _b;
})
    .accept(defined);
export var activeEntity = val('')
    .react([action.HOT, graph.COLD], function (_, _a, graph) {
    var type = _a.type, payload = _a.payload;
    if (type === 'state.gui.openEntity'
        && graph.entities[payload] != null) {
        return payload;
    }
})
    .accept(and(defined, unequal));
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
    send(flow.get(entity));
    if (visibility.entities && watching) {
        flow.on(entity, send);
        return function () { return flow.off(entity, send); };
    }
});
export var editedValue = val('')
    .react([action.HOT, runtime.COLD], function (self, _a, flow) {
    var type = _a.type, payload = _a.payload;
    if (type === 'updateEditedValue') {
        console.log('=========== input!!', payload);
        return payload;
    }
    else if (self && type === 'saveCurrentEntityValue') {
        console.log('=========== saveing!!', self, payload);
        requestAnimationFrame(function () {
            flow.set(payload, JSON.parse(self));
        });
    }
})
    .react([activeValue.HOT], function () { return ''; })
    .accept(and(defined, unequal));
export var entityView = stream([activeValue.HOT, watchingEntity.HOT], function (value, watching) { return ({ value: value, watching: watching }); }).val({ value: null, watching: true });
export var entitiesWindowProps = stream([entitiesWindow.HOT, activeEntity.HOT, watchingEntity.HOT], function (dimensions, entity, watching) { return ({ dimensions: dimensions, entity: entity, watching: watching }); });
export var controlProps = stream([visibility.HOT, controlsPosition.HOT], function (visibility, position) { return ({ visibility: visibility, position: position }); });
//# sourceMappingURL=gui.js.map