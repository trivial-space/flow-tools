import { stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { activeNode } from './entity'
import { activeWindow, entityWindow, visibility, controlsPosition, treeWindow, graphWindow } from './gui'
import { selectedRuntimeId } from './flow'



export const entityWindowProps: EntityRef<any> = stream(
	[entityWindow.HOT, activeNode.HOT, activeWindow.HOT],
	(dimensions, node, window) => ({ dimensions, node, window })
)


export const controlProps = stream(
	[visibility.HOT, controlsPosition.HOT],
	(visibility, position) => ({ visibility, position } as any)
)

export const controlTitleProps = stream(
	[controlsPosition.HOT, selectedRuntimeId.HOT],
	(position, title) => ({ position, title } as any)
)

export const treeWindowProps = stream(
	[treeWindow.HOT, activeWindow.HOT],
	(dimensions, window) => ({ dimensions, window } as any)
)


export const graphWindowProps = stream(
	[graphWindow.HOT, activeWindow.HOT],
	(dimensions, window) => ({ dimensions, window } as any)
)

