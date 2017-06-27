import { stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { activeNode } from './entity'
import { activeWindow, entitiesWindow, visibility, controlsPosition, treeWindow, graphWindow } from './gui'



export const entitiesWindowProps: EntityRef<any> = stream(
	[entitiesWindow.HOT, activeNode.HOT, activeWindow.HOT],
	(dimensions, node, window) => ({ dimensions, node, window })
).val({} as any)


export const controlProps = stream(
	[visibility.HOT, controlsPosition.HOT],
	(visibility, position) => ({ visibility, position })
)


export const treeWindowProps = stream(
	[treeWindow.HOT, activeWindow.HOT],
	(dimensions, window) => ({ dimensions, window })
).val({} as any)


export const graphWindowProps = stream(
	[graphWindow.HOT, activeWindow.HOT],
	(dimensions, window) => ({ dimensions, window })
).val({} as any)

