import { stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { activeNode, activeEntity, activeValue, watchingEntity, activeProcess } from './entity';
import { activeWindow, visibility, controlsPosition, treeWindow, graphWindow, entityWindow } from './gui';
import { metaEntity, enhancedGraphData, metaEntities } from '../../graph/state/flow';
export var entityWindowProps = stream([metaEntity.HOT, entityWindow.HOT, activeNode.HOT, activeWindow.HOT], function (metaEntity, dimensions, node, window) { return ({
    viewMode: metaEntity.viewMode,
    dimensions: dimensions, node: node, window: window
}); });
export var controlProps = stream([visibility.HOT, controlsPosition.HOT], function (visibility, position) { return ({ visibility: visibility, position: position }); });
export var treeWindowProps = stream([treeWindow.HOT, activeWindow.HOT], function (dimensions, window) { return ({ dimensions: dimensions, window: window }); });
export var graphWindowProps = stream([graphWindow.HOT, activeWindow.HOT], function (dimensions, window) { return ({ dimensions: dimensions, window: window }); });
export var entityViewProps = stream([activeEntity.HOT, activeValue.HOT, watchingEntity.HOT, enhancedGraphData.COLD, metaEntities.HOT], function (entity, value, watching, graph, meta) { return ({ entity: entity, value: value, watching: watching, graph: graph, meta: meta[entity.id] }); });
export var processViewProps = stream([activeProcess.HOT, enhancedGraphData.COLD], function (process, graph) { return ({ process: process, graph: graph }); });
//# sourceMappingURL=views.js.map