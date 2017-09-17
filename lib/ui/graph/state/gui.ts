import { val, stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { unequal, defined, and } from 'tvs-libs/dist/lib/utils/predicates'
import { action, mouse, windowSize, dragDeltas } from '../events'
import { GUI } from '../../actions'
import { metaTree, metaGraph, metaEntity } from './flow'
import { PartialUIWindow } from '../../types'


export interface Size {
	width: number
	height: number
}


export interface Position {
	top: number
	left: number
}


export type WindowDimension = Position & Size


export const metaTreeWindow: EntityRef<PartialUIWindow> = stream(
	[metaTree.HOT],
	t => t.window
)
.accept(and(defined, unequal))


export const metaGraphWindow = stream(
	[metaGraph.HOT],
	g => g.window
)
.accept(and(defined, unequal))


export const metaEntityWindow = stream(
	[metaEntity.HOT],
	t => t.window
)
.accept(and(defined, unequal))


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
	[action.HOT],
	({ type, payload }) => {
		if (type === GUI.MAIN.SET_ACTIVE_WINDOW
			|| type === GUI.MAIN.UPDATE_VISIBILITY) {
			return payload
		}
	}
)
.accept(and(defined, unequal))
.val('')


export const zIndex = val(0)
.react(
	[activeWindow.HOT],
	self => self + 1
)


export const controlsPosition = val({
	left: 0,
	top: 0,
	zIndex: 0
})
.react(
	[activeWindow.COLD, dragDeltas.HOT, mouse.COLD, windowSize.COLD],
	(self, window, delta, mouse, size) => {
		const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement

		if (
			window === 'controls'
			&& target && target.closest('.tvs-flow-controls')
			&& (delta.x || delta.y)
		) {
			self.left -= delta.x
			self.top -= delta.y
			if (self.top < 0) self.top = 0
			if (self.left < 0) self.left = 0
			if (self.top > size.height - 20) self.top = size.height - 20
			if (self.left > size.width - 20) self.left = size.width - 20
			return self
		}
	}
)
.accept(defined)



export const treeWindow = val({
	top: 100,
	left: 0,
	width: 300,
	height: 400,
	zIndex: 0
})
.react(
	[activeWindow.COLD, mouse.COLD, dragDeltas.HOT, windowSize.COLD],
	(self, window, mouse, delta, size) => {
		const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement

		if (
			window === 'tree'
			&& target && target.closest('.tvs-flow-tree')
			&& (delta.x || delta.y)
		) {
			if (target.className === 'resize') {
				self.width -= delta.x
				self.height -= delta.y
			} else {
				self.left -= delta.x
				self.top -= delta.y
			}
			return setSizeConstrains(self, size)
		}
	}
)
.accept(defined)


export const graphWindow = val({
	top: 200,
	left: 100,
	width: 600,
	height: 600,
	zIndex: 0
})
.react(
	[activeWindow.COLD, mouse.COLD, dragDeltas.HOT, windowSize.COLD],
	(self, window, mouse, delta, size) => {
		const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement

		if (
			window === 'graph'
			&& target && target.closest('.tvs-flow-graph')
			&& (delta.x || delta.y)
		) {
			if (target.className === 'resize') {
				self.width -= delta.x
				self.height -= delta.y
				return setSizeConstrains(self, size)
			} else if (!target.closest('svg')) {
				self.left -= delta.x
				self.top -= delta.y
				return setSizeConstrains(self, size)
			}
		}
	}
)
.accept(defined)


export const entityWindow = val({
	top: 50,
	left: 400,
	width: 400,
	height: 500,
	zIndex: 0
})
.react(
	[activeWindow.COLD, mouse.COLD, dragDeltas.HOT, windowSize.COLD],
	(self, window, mouse, delta, size) => {
		const target = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement

		if (
			window === 'entity'
			&& target && target.closest('.tvs-flow-entity')
			&& !target.closest('pre')
			&& (delta.x || delta.y)
		) {
			if (target.className === 'resize') {
				self.width -= delta.x
				self.height -= delta.y
			} else {
				self.left -= delta.x
				self.top -= delta.y
			}
			return setSizeConstrains(self, size)
		}
	}
)
.accept(defined)


function updateWindowZIndex (entity, name) {
	entity.react(
		[activeWindow.COLD, zIndex.HOT],
		(self, window, zIndex) => {
			if (window === name) {
				self.zIndex = zIndex
				return self
			}
		}
	)
}

updateWindowZIndex(controlsPosition, 'controls')
updateWindowZIndex(treeWindow, 'tree')
updateWindowZIndex(graphWindow, 'graph')
updateWindowZIndex(entityWindow, 'entity')


function setSizeConstrains (dimensions, size) {
	if (dimensions.height > size.height - 20) {
		dimensions.height = size.height - 20
	}
	if (dimensions.width > size.width - 20) {
		dimensions.width = size.width - 20
	}
	if (dimensions.top > size.height - 20) {
		dimensions.top = size.height - 20
	}
	if (dimensions.left > size.width - 20) {
		dimensions.left = size.width - 20
	}
	if (dimensions.top < 0) dimensions.top = 0
	if (dimensions.left < 0) dimensions.left = 0
	return dimensions
}


function updateWindowPosition (entity) {
	entity.react([windowSize.HOT], setSizeConstrains)
}

updateWindowPosition(controlsPosition)
updateWindowPosition(treeWindow)
updateWindowPosition(graphWindow)
updateWindowPosition(entityWindow)
