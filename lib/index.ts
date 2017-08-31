import * as gui from './ui/index'
import * as consoleTree from './console/tree'
import * as uetree from './utils/entity-tree'
import * as uwebpack from './utils/webpack'
import * as uinferno from './utils/inferno'


export default gui

export const ui = gui

export const console = {
	tree: consoleTree
}

export const utils = {
	entityTree: uetree,
	webpack: uwebpack,
	yoyo: uinferno
}
