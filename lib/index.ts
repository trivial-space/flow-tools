import * as gui from './ui/index'
import * as consoleTree from './console/tree'
import * as uEntityData from './utils/entity-data-helpers'
import * as uWebpack from './utils/webpack'
import * as uInferno from './utils/inferno'


export default gui

export const ui = gui

export const console = {
	tree: consoleTree
}

export const utils = {
	entityData: uEntityData,
	webpack: uWebpack,
	yoyo: uInferno
}
