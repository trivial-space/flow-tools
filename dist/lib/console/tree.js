export function create(flow) {
    function callAll(name) {
        return function () {
            for (var key in this) {
                if (typeof this[key][name] === 'function') {
                    this[key][name]();
                }
            }
        };
    }
    function createObject(pathstring, root) {
        if (root === void 0) { root = {}; }
        var names = pathstring.split('.');
        return names.reduce(function (obj, name) { return obj[name] = obj[name] || {
            reset: callAll('reset'),
            watch: callAll('watch'),
            unwatch: callAll('unwatch')
        }; }, root);
    }
    function createTree(root) {
        var graph = flow.getGraph();
        var entities = graph.entities, arcs = graph.arcs, processes = graph.processes;
        return Object.keys(entities)
            .reduce(function (obj, eid) {
            var e = createObject(eid, obj);
            var entity = entities[eid];
            var streamIds = Object.keys(arcs)
                .map(function (k) { return arcs[k]; })
                .filter(function (a) { return a.entity === eid && !a.port; })
                .map(function (a) { return a.process; });
            e.id = eid;
            Object.defineProperty(e, 'val', {
                get: function () { return flow.get(eid); },
                set: function (v) { return flow.set(eid, v); }
            });
            e.update = function (fn) {
                flow.update(eid, fn);
            };
            e.reset = function () {
                if (entity.value != null) {
                    flow.set(eid, entity.value);
                }
            };
            e.watch = function () {
                flow.on(eid, function (v) { return console.log(eid, v); });
            };
            e.unwatch = function () {
                flow.off(eid);
            };
            e.streams = {};
            streamIds.forEach(function (p) {
                var name = p.split('.').pop();
                if (name) {
                    e.streams[name] = {
                        start: function () { flow.start(p); }
                    };
                    if (processes[p].async) {
                        e.streams[name].stop = function () { flow.stop(p); };
                    }
                }
            });
            return obj;
        }, root);
    }
    var root = {
        update: function () {
            for (var key in this) {
                if (key !== 'update') {
                    delete this[key];
                }
            }
            createTree(this);
        }
    };
    return createTree(root);
}
//# sourceMappingURL=tree.js.map