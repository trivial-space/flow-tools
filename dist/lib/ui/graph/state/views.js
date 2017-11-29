import { stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { activeNode } from './entity';
import { activeWindow, entityWindow, visibility, controlsPosition, treeWindow, graphWindow } from './gui';
import { selectedRuntimeId } from './flow';
export var entityWindowProps = stream([entityWindow.HOT, activeNode.HOT, activeWindow.HOT], function (dimensions, node, window) { return ({ dimensions: dimensions, node: node, window: window }); });
export var controlProps = stream([visibility.HOT, controlsPosition.HOT], function (visibility, position) { return ({ visibility: visibility, position: position }); });
export var controlTitleProps = stream([controlsPosition.HOT, selectedRuntimeId.HOT], function (position, title) { return ({ position: position, title: title }); });
export var treeWindowProps = stream([treeWindow.HOT, activeWindow.HOT], function (dimensions, window) { return ({ dimensions: dimensions, window: window }); });
export var graphWindowProps = stream([graphWindow.HOT, activeWindow.HOT], function (dimensions, window) { return ({ dimensions: dimensions, window: window }); });
//# sourceMappingURL=views.js.map