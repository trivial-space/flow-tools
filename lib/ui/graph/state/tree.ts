import { stream, EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference'
import { activeEntity } from './entity'
import { graph, metaTree } from './flow'
import { createEntityTree } from '../../../utils/entity-tree'


export const entityTree: EntityRef<{}> = stream(
	[graph.HOT],
	graph => createEntityTree(graph.entities)
)


export const treeData = stream(
	[metaTree.HOT, entityTree.HOT, activeEntity.HOT],
	(metaTree, tree, selected) => ({
		fold: metaTree.fold || {},
		tree, selected
	})
).val({ fold: null, tree: null, selected: {} })
