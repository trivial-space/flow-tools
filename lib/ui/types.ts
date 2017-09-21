import { clamp } from 'tvs-libs/dist/lib/math/core'


export interface Position {
	top: number
	left: number
}

export interface Area extends Position {
	width: number
	height: number
}


export interface UIWindow {
	visible: boolean
	area: Area
}

export interface PartialUIWindow {
	visible?: boolean
	area?: Partial<Area>
}


export interface GraphViewBox {
	width: number
	height: number,
	offsetX: number,
	offsetY: number,
	scale: number
}

export const graphDefaultViewBox: GraphViewBox = {
	width: 0,
	height: 0,
	offsetX: 0,
	offsetY: 0,
	scale: 1
}



export interface UIMetaGraph {
	viewBox: GraphViewBox
	window: UIWindow
}

export interface PartialUIMetaGraph {
	viewBox?: Partial<GraphViewBox>
	window?: PartialUIWindow
}


export interface UIEntityProperties {
	activeEntityId: string
	activeProcessId: string
	watchingEntity: boolean
}

export interface UIMetaEntity extends UIEntityProperties {
	window: UIWindow
}

export interface PartialUIMetaEntity extends Partial<UIEntityProperties>{
	window?: PartialUIWindow
}


export interface UIMetaTree {
	fold: { [path: string]: boolean }
	window: UIWindow
}

export interface PartialUIMetaTree {
	fold?: { [path: string]: boolean }
	window?: PartialUIWindow
}


export interface MetaEntitiesUI {
	graph?: {
		position?: {
			x: number,
			y: number
		}
		visible?: boolean
	}
}


export interface UIMetaControls {
	position?: Position
}


export interface UIMeta {
	name?: string

	ui?: {
		entity?: PartialUIMetaEntity
		graph?: PartialUIMetaGraph
		tree?: PartialUIMetaTree
		controls?: UIMetaControls

		activeWindow?: string
	}

	entities?: {
		[id: string]: {
			ui?: MetaEntitiesUI
		}
	}
}


export interface MetaFlow {
	setMeta: (meta: UIMeta) => UIMeta
	getMeta: () => UIMeta
}


export const defaultUIMeta: UIMeta = {
	ui: {
		entity: {
			activeEntityId: '',
			activeProcessId: '',
			watchingEntity: false,
			window: {
				visible: false,
				area: {
					top: 50,
					left: 400,
					width: 400,
					height: 500
				}
			}
		},
		graph: {
			viewBox: {
				width: 600,
				height: 600,
				offsetX: 0,
				offsetY: 0,
				scale: 1
			},
			window: {
				visible: false,
				area: {
					top: 200,
					left: 100,
					width: 600,
					height: 600
				}
			}
		},
		tree: {
			window: {
				visible: false,
				area: {
					top: 100,
					left: 0,
					width: 300,
					height: 400
				}
			}
		},
		controls: {
			position: {
				top: 0,
				left: 0
			}
		}
	},
	entities: {}
}


// Guards

const topGuard = (val: number) => clamp(val, 0, window.innerHeight - 20)
const leftGuard = (val: number) => clamp(val, 0, window.innerWidth - 20)
const widthGuard = (val: number) => Math.min(val, window.innerWidth - 20)
const heightGuard = (val: number) => Math.min(val, window.innerHeight - 20)


export const metaGuards = {
	ui: {
		entity: {
			window: {
				area: {
					top: topGuard,
					left: leftGuard,
					width: widthGuard,
					height: heightGuard
				}
			}
		},
		graph: {
			window: {
				area: {
					top: topGuard,
					left: leftGuard,
					width: widthGuard,
					height: heightGuard
				}
			}
		},
		tree: {
			window: {
				area: {
					top: topGuard,
					left: leftGuard,
					width: widthGuard,
					height: heightGuard
				}
			}
		},
		controls: {
			position: {
				top: topGuard,
				left: leftGuard
			}
		}
	}
}


export function applyGuard(data, guard) {
	for (const key in data) {
		if (typeof guard[key] === 'function') {
			data[key] = guard[key](data[key])
		} else if (
			data[key]
			&& typeof data[key] === 'object'
			&& guard[key]
			&& typeof guard[key] === 'object'
		) {
			applyGuard(data[key], guard[key])
		}
	}
	return data
}


export function guardMeta(data) {
	return applyGuard(data, metaGuards)
}
