import { val, stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { unequal } from 'tvs-libs/dist/lib/utils/predicates'
import { metaTree, metaGraph, metaEntity, metaControls, meta } from './flow'
import { PartialUIWindow, Position, Area } from '../../types'


export interface Size {
	width: number
	height: number
}


export type WindowDimension = Position & Size


export const metaTreeWindow: EntityRef<PartialUIWindow> = stream(
	[metaTree.HOT],
	t => t.window
)
.accept(unequal)


export const metaGraphWindow = stream(
	[metaGraph.HOT],
	g => g.window
)
.accept(unequal)


export const metaEntityWindow = stream(
	[metaEntity.HOT],
	t => t.window
)
.accept(unequal)


export const visibility = val({
	tree: false,
	graph: false,
	entity: false
})
.react(
	[metaGraphWindow.HOT],
	(self, win) => ({ ...self, graph: !!win.visible })
)
.react(
	[metaEntityWindow.HOT],
	(self, win) => ({ ...self, entity: !!win.visible })
)
.react(
	[metaTreeWindow.HOT],
	(self, win) => ({ ...self, tree: !!win.visible })
)
.accept((n, o) => (o && n && (
	o.tree !== n.tree
	|| o.entity !== n.entity
	|| o.graph !== n.graph
)) as boolean)


export const activeWindow: EntityRef<string> = stream(
	[meta.HOT], meta => meta.ui && meta.ui.activeWindow
)
.accept(unequal)


export const zIndex = val(0)
.react(
	[activeWindow.HOT],
	self => self + 1
)


export const controlsPosition = stream(
	[metaControls.HOT], controls => controls.position
)
.accept(unequal)


export const treeWindow: EntityRef<Area> = stream(
	[metaTreeWindow.HOT], win => win.area as Area
)
.accept(unequal)

export const graphWindow: EntityRef<Area> = stream(
	[metaGraphWindow.HOT], win => win.area as Area
)
.accept(unequal)

export const entityWindow: EntityRef<Area> = stream(
	[metaEntityWindow.HOT], win => win.area as Area
)
.accept(unequal)


function updateWindowZIndex (entity, name) {
	entity.react(
		[activeWindow.COLD, zIndex.HOT],
		(self, window, zIndex) => {
			if (window === name) {
				return { ...self, zIndex }
			}
		}
	)
}

updateWindowZIndex(controlsPosition, 'controls')
updateWindowZIndex(treeWindow, 'tree')
updateWindowZIndex(graphWindow, 'graph')
updateWindowZIndex(entityWindow, 'entity')
