import { stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { activeNode, activeEntity, activeValue, watchingEntity, activeProcess } from './entity'
import { activeWindow, visibility, controlsPosition, treeWindow, graphWindow, entityWindow } from './gui'
import { metaEntity, enhancedGraphData } from '../../graph/state/flow'
import { ProcessedGraph, ProcessedGraphEntity, ProcessedGraphProcess } from '../../../utils/entity-data-helpers'


export const entityWindowProps: EntityRef<any> = stream(
	[metaEntity.HOT, entityWindow.HOT, activeNode.HOT, activeWindow.HOT],
	(metaEntity, dimensions, node, window) => ({
		viewMode: metaEntity.viewMode,
		dimensions, node, window
	})
)


export const controlProps = stream(
	[visibility.HOT, controlsPosition.HOT],
	(visibility, position) => ({ visibility, position } as any)
)

export const treeWindowProps = stream(
	[treeWindow.HOT, activeWindow.HOT],
	(dimensions, window) => ({ dimensions, window } as any)
)


export const graphWindowProps = stream(
	[graphWindow.HOT, activeWindow.HOT],
	(dimensions, window) => ({ dimensions, window } as any)
)


export const entityViewProps: EntityRef<{
	entity: ProcessedGraphEntity,
	value: any,
	watching: boolean,
	graph: ProcessedGraph
}> = stream(
	[activeEntity.HOT, activeValue.HOT, watchingEntity.HOT, enhancedGraphData.COLD],
	(entity, value, watching, graph) => ({ entity, value, watching, graph })
)


export const processViewProps: EntityRef<{
	process: ProcessedGraphProcess,
	graph: ProcessedGraph
}> = stream(
	[activeProcess.HOT, enhancedGraphData.COLD],
	(process, graph) => ({ process, graph })
)
