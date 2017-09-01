import { Meta } from '../../../flow/dist/lib/runtime-types'


export interface Window {
	visible?: boolean
	area?: {
		top: number
		left: number
		width: number
		height: number
	}
}


export interface UIMeta extends Meta {
	name?: string

	ui: {
		entity?: {
			activeEntityId?: string
			activeProcessId?: string
			watchingEntity?: boolean
			window?: Window
		},

		graph?: {
			viewBox?: {
				width: number
				height: number,
				offsetX: number,
				offsetY: number,
				scale: number
			}
			window?: Window
		}

		tree?: {
			window?: Window
			fold?: { [path: string]: boolean }
		}
	}

	entities?: {
		[id: string]: {
			ui: {
				graph?: {
					position?: {
						x: number,
						y: number
					}
					visible?: boolean
				}
			}
		}
	}
}


export interface MetaFlow {
	setMeta: (UIMeta) => UIMeta
	getMeta: () => UIMeta
}
