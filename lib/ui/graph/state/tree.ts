import { stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { activeEntity } from './entity'
import { metaTree, enhancedEntityData } from './flow'
import { createEntityTree } from '../../../utils/entity-tree'


export const entityTree: EntityRef<{}> = stream(
	[enhancedEntityData.HOT], createEntityTree
)


export const treeData = stream(
	[metaTree.HOT, entityTree.HOT, activeEntity.HOT],
	(metaTree, tree, selected) => ({
		fold: metaTree.fold || {},
		tree, selected
	})
).val({ fold: null, tree: null, selected: {} })
