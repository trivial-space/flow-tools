export const FLOW = {
	ENTITY_INSPECT: 'flow:entity_inspect',
	ENTITY_RESET: 'flow:entity_reset',
	PROCESS_RUN: 'flow:process_run',
	PROCESS_STOP: 'flow:process_stop'
}

export const GUI = {
	ENTITIES: {
		UPDATE_EDITED_VALUE: 'gui:entities:update_edited_value',
		SET_EDIT_MODE: 'gui:entities:set_edit_mode',
		SAVE_VALUE: 'gui:entities:save',
		OPEN_PROCESS: 'gui:entities:open_process',
		OPEN_ENTITY: 'gui:entities:open_entity'
	},
	GRAPH: {
		UPDATE_SCALE: 'gui:graph:update_scale',
		UPDATE_SIZE: 'gui:graph:update_size'
	},
	TREE: {
		TOGGLE_LEVEL: 'gui:tree:toggle_level'
	},
	MAIN: {
		SET_ACTIVE_WINDOW: 'gui:main:set_active_window',
		UPDATE_VISIBILITY: 'gui:main:update_visibility',
		CLOSE_WINDOW: 'gui:main.close_window'
	}
}
