"use strict";
import { stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { activeEntity } from './entity';
import { metaTree, enhancedEntityData } from './flow';
import { createEntityTree } from '../../../utils/entity-tree';
export var entityTree = stream([enhancedEntityData.HOT], createEntityTree);
export var treeData = stream([metaTree.HOT, entityTree.HOT, activeEntity.HOT], function (metaTree, tree, selected) { return ({
    fold: metaTree.fold || {},
    tree: tree, selected: selected
}); }).val({ fold: null, tree: null, selected: {} });
//# sourceMappingURL=tree.js.map