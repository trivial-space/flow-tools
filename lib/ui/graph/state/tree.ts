import { val, stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { entityTree } from './flow'
import { action } from '../events'
import { GUI } from '../../actions'
import { defined } from 'tvs-libs/dist/lib/utils/predicates'
import { activeEntity } from './entity'


export const treeFold: EntityRef<any> = val({} as any)
.react(
	[action.HOT],
	(self, { type, payload }) => {
		if (type === GUI.TREE.TOGGLE_LEVEL) {
			return { ...self, [payload]: !self[payload] }
		}
	}
)
.accept(defined)


export const treeData = stream(
	[treeFold.HOT, entityTree.HOT, activeEntity.HOT],
	(fold, tree, selected) => ({ fold, tree, selected })
).val({ fold: null, tree: null, selected: {} })
