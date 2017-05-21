var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { val, stream } from "tvs-flow/dist/lib/utils/entity-reference";
import { entityTree } from "./flow";
import { action } from "../events";
import { GUI } from "ui/actions";
import { defined } from "tvs-libs/dist/lib/utils/predicates";
import { activeEntity } from "./entity";
export var treeFold = val({})
    .react([action.HOT], function (self, _a) {
    var type = _a.type, payload = _a.payload;
    if (type === GUI.TREE.TOGGLE_LEVEL) {
        return __assign({}, self, (_b = {}, _b[payload] = !self[payload], _b));
    }
    var _b;
})
    .accept(defined);
export var treeData = stream([treeFold.HOT, entityTree.HOT, activeEntity.HOT], function (fold, tree, selected) { return ({ fold: fold, tree: tree, selected: selected }); }).val({ fold: null, tree: null, selected: {} });
//# sourceMappingURL=tree.js.map