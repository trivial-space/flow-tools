import { stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { activeNode } from './entity';
import { activeWindow, entitiesWindow, visibility, controlsPosition, treeWindow, graphWindow } from './gui';
export var entitiesWindowProps = stream([entitiesWindow.HOT, activeNode.HOT, activeWindow.HOT], function (dimensions, node, window) { return ({ dimensions: dimensions, node: node, window: window }); }).val({});
export var controlProps = stream([visibility.HOT, controlsPosition.HOT], function (visibility, position) { return ({ visibility: visibility, position: position }); });
export var treeWindowProps = stream([treeWindow.HOT, activeWindow.HOT], function (dimensions, window) { return ({ dimensions: dimensions, window: window }); }).val({});
export var graphWindowProps = stream([graphWindow.HOT, activeWindow.HOT], function (dimensions, window) { return ({ dimensions: dimensions, window: window }); }).val({});
//# sourceMappingURL=views.js.map