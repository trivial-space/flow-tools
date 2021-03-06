import { Action } from '../utils/inferno'

export const FLOW = {
	ENTITY_INSPECT: 'flow:entity_inspect',
	ENTITY_RESET: 'flow:entity_reset',
	PROCESS_RUN: 'flow:process_run',
	PROCESS_STOP: 'flow:process_stop',
	SET_RUNTIME: 'flow:set_runtime',
	SELECT_ACTIVE_RUNTIME: 'flow:select_active_runtime'
}

export const GUI = {
	ENTITY: {
		WATCH_ACTIVE_ENTITY: 'gui:entity:watch_active_entity',
		SAVE_VALUE: 'gui:entity:save_value',
		SAVE_META: 'gui:entity:save_meta',
		SET_ACTIVE_PROCESS: 'gui:entity:open_process',
		SET_ACTIVE_ENTITY: 'gui:entity:open_entity',
		RESET_ACTIVE_NODE: 'gui:entity:reset_entity',
		SET_VIEW_MODE: 'gui:entity:set_view_mode'
	},
	GRAPH: {
		UPDATE_SCALE: 'gui:graph:update_scale',
		UPDATE_SIZE: 'gui:graph:update_size',
		MOVE_VIEWPORT: 'gui:graph:move_viewport',
		MOVE_ENTITY_POSITION: 'gui:graph:set_entity_position'
	},
	TREE: {
		TOGGLE_LEVEL: 'gui:tree:toggle_level'
	},
	MAIN: {
		SET_ACTIVE_WINDOW: 'gui:main:set_active_window',
		UPDATE_VISIBILITY: 'gui:main:update_visibility',
		CLOSE_WINDOW: 'gui:main:close_window',
		MOVE_WINDOW: 'gui:main:set_window_position',
		RESIZE_WINDOW: 'gui:main:resize_window'
	}
}


export function newAction(type: string, payload?: any): Action {
	return { type, payload }
}
