export function createEntityTree(entities, separator) {
    if (separator === void 0) { separator = '.'; }
    var tree = {};
    Object.keys(entities).sort().forEach(function (entityKey) {
        var entity = entities[entityKey];
        var id = entity.id;
        var parts = id.split(separator);
        var subtree = tree;
        var steps = parts.slice();
        var path = [];
        for (var i = 0; i < parts.length; i++) {
            var p = steps.shift();
            if (!steps.length) {
                subtree[p] = { __id__: id };
            }
            else {
                path.push(p);
                subtree = subtree[p] = subtree[p] || {
                    __path__: path.join(separator),
                };
            }
        }
    });
    return tree;
}
//# sourceMappingURL=entity-tree.js.map