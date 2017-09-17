"use strict";
import { stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { activeEntity } from './entity';
import { graph, metaTree } from './flow';
import { createEntityTree } from '../../../utils/entity-tree';
export var entityTree = stream([graph.HOT], function (graph) { return createEntityTree(graph.entities); });
export var treeData = stream([metaTree.HOT, entityTree.HOT, activeEntity.HOT], function (metaTree, tree, selected) { return ({
    fold: metaTree.fold || {},
    tree: tree, selected: selected
}); }).val({ fold: null, tree: null, selected: {} });
//# sourceMappingURL=tree.js.map