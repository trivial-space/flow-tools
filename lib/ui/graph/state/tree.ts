import { stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { activeEntity } from './entity'
import { metaTree, enhancedGraphData } from './flow'
import { createEntityTree } from '../../../utils/entity-data-helpers'
import { Entity } from 'tvs-flow/dist/lib/runtime-types'


export const entityTree: EntityRef<{}> = stream(
	[enhancedGraphData.HOT], g => createEntityTree(g.entities)
)


export const treeData = stream(
	[metaTree.HOT, entityTree.HOT, activeEntity.HOT],
	(metaTree, tree, selected: Entity | null) => ({
		fold: metaTree.fold || {},
		tree, selected
	})
).val({ fold: {}, tree: {}, selected: null })
