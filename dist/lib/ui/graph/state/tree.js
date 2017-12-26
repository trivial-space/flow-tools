import { stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { activeEntity } from './entity';
import { metaTree, enhancedGraphData } from './flow';
import { createEntityTree } from '../../../utils/entity-data-helpers';
export var entityTree = stream([enhancedGraphData.HOT], function (g) { return createEntityTree(g.entities); });
export var treeData = stream([metaTree.HOT, entityTree.HOT, activeEntity.HOT], function (metaTree, tree, selected) { return ({
    fold: metaTree.fold || {},
    tree: tree, selected: selected
}); }).val({ fold: {}, tree: {}, selected: null });
//# sourceMappingURL=tree.js.map