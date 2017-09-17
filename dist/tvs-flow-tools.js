!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.tvsFlowTools = t() : e.tvsFlowTools = t();
}(this, function() {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            });
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return t.d(n, "a", n), n;
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, t.p = "", t(t.s = 32);
    }([ function(e, t, n) {
        "use strict";
        function r(e, t) {
            return t ? t + "." + e : e;
        }
        function i(e) {
            var t, n, i, o = e.value, c = Object(f.a)(), s = [], u = {};
            return u.HOT = {
                entity: u,
                type: d.PORT_TYPES.HOT
            }, u.COLD = {
                entity: u,
                type: d.PORT_TYPES.COLD
            }, u.id = function(e, n) {
                return c = r(e, n), t = n, u;
            }, u.val = function(e) {
                return o = e, u;
            }, u.updateVal = function(e) {
                return o = e(o), u;
            }, u.accept = function(e) {
                return n = e, u;
            }, u.reset = function() {
                return i = !0, u;
            }, u.getId = function() {
                return c;
            }, e.procedure && s.push(e), u.react = function(e, t, n) {
                var r = a(e, t, n);
                r.pidSuffix = v;
                var i = r.dependencies;
                return r.dependencies = [ {
                    entity: u,
                    type: d.PORT_TYPES.ACCUMULATOR
                } ], i && i.length && (r.dependencies = r.dependencies.concat(i)), s.push(r), u;
            }, u.getGraph = function() {
                var e = l.empty();
                return e.entities[c] = Object(d.createEntity)({
                    id: c,
                    value: o,
                    accept: n,
                    reset: i
                }), s.forEach(function(n) {
                    var i = n.dependencies, o = n.processId ? r(n.processId, t) : c + n.pidSuffix + (i && i.length ? ":" + i.reduce(function(e, t) {
                        var n = t.entity.getId();
                        return n === c ? e : e + ":" + n;
                    }, "") : ""), a = [];
                    i && i.forEach(function(t, n) {
                        if (a[n] = t.type, t.type !== d.PORT_TYPES.ACCUMULATOR) {
                            var r = Object(d.createArc)({
                                process: o,
                                entity: t.entity.getId(),
                                port: n
                            });
                            e.arcs[r.id] = r;
                        }
                    });
                    var s = Object(d.createArc)({
                        process: o,
                        entity: c
                    });
                    e.arcs[s.id] = s, e.processes[o] = Object(d.createProcess)({
                        id: o,
                        ports: a,
                        procedure: n.procedure,
                        async: n.async,
                        autostart: n.autostart,
                        delta: n.delta
                    });
                }), e;
            }, u;
        }
        function o(e) {
            return i({
                value: e
            });
        }
        function a(e, t, n) {
            var r = {
                procedure: t
            };
            return null != e && (r.dependencies = e), "string" == typeof n ? r.processId = n : r.pidSuffix = h, 
            r;
        }
        function c(e) {
            return e && "function" == typeof e.id && "function" == typeof e.getGraph && e.HOT && e.COLD;
        }
        function s(e, t) {
            for (var n in e) {
                var r = e[n];
                c(r) && r.id(n, t);
            }
            return e;
        }
        function u(e) {
            var t = [];
            for (var n in e) {
                var r = e[n];
                c(r) && t.push(r);
            }
            return t.reduce(function(e, t) {
                return l.merge(e, t.getGraph());
            }, l.empty());
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.val = o, n.d(t, "stream", function() {
            return g;
        }), n.d(t, "asyncStream", function() {
            return y;
        }), n.d(t, "streamStart", function() {
            return m;
        }), n.d(t, "asyncStreamStart", function() {
            return b;
        }), n.d(t, "delta", function() {
            return _;
        }), t.isEntity = c, t.resolveEntityIds = s, t.getGraphFromAll = u;
        var l = n(18), d = n(9), f = n(17), p = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, h = "Stream", v = "Reaction", g = function(e, t, n) {
            return i(a(e, t, n));
        }, y = function(e, t, n) {
            return i(p({}, a(e, t, n), {
                async: !0
            }));
        }, m = function(e, t, n) {
            return i(p({}, a(e, t, n), {
                autostart: !0
            }));
        }, b = function(e, t, n) {
            return i(p({}, a(e, t, n), {
                async: !0,
                autostart: !0
            }));
        }, _ = function(e, t, n) {
            return i(p({}, a([ e.HOT ], t, n), {
                delta: !0
            }));
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            return {
                type: e,
                payload: t
            };
        }
        n.d(t, "a", function() {
            return i;
        }), n.d(t, "b", function() {
            return o;
        }), t.c = r;
        var i = {
            ENTITY_INSPECT: "flow:entity_inspect",
            ENTITY_RESET: "flow:entity_reset",
            PROCESS_RUN: "flow:process_run",
            PROCESS_STOP: "flow:process_stop",
            SET_RUNTIME: "flow:set_runtime",
            SELECT_ACTIVE_RUNTIME: "flow:select_active_runtime"
        }, o = {
            ENTITY: {
                WATCH_ACTIVE_ENTITY: "gui:entity:watch_active_entity",
                SAVE_VALUE: "gui:entity:save",
                SET_ACTIVE_PROCESS: "gui:entity:open_process",
                SET_ACTIVE_ENTITY: "gui:entity:open_entity",
                RESET_ACTIVE_NODE: "gui:entity:reset_entity"
            },
            GRAPH: {
                UPDATE_SCALE: "gui:graph:update_scale",
                UPDATE_SIZE: "gui:graph:update_size",
                MOVE_VIEWPORT: "gui:graph:move_viewport",
                SET_ENTITY_POSITION: "gui:graph:set_entity_position"
            },
            TREE: {
                TOGGLE_LEVEL: "gui:tree:toggle_level"
            },
            MAIN: {
                SET_ACTIVE_WINDOW: "gui:main:set_active_window",
                UPDATE_VISIBILITY: "gui:main:update_visibility",
                CLOSE_WINDOW: "gui:main.close_window"
            }
        };
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = new i.TypeStyle({
                autoGenerateTag: !1
            });
            return e && t.setStylesTarget(e), t;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(43);
        t.TypeStyle = i.TypeStyle;
        var o = n(45);
        t.types = o;
        var a = n(22);
        t.extend = a.extend, t.classes = a.classes, t.media = a.media;
        var c = new i.TypeStyle({
            autoGenerateTag: !0
        });
        t.setStylesTarget = c.setStylesTarget, t.cssRaw = c.cssRaw, t.cssRule = c.cssRule, 
        t.forceRenderStyles = c.forceRenderStyles, t.fontFace = c.fontFace, t.getStyles = c.getStyles, 
        t.keyframes = c.keyframes, t.reinit = c.reinit, t.style = c.style, t.createTypeStyle = r;
    }, function(e, t, n) {
        "use strict";
        var r = n(49);
        n.d(t, "d", function() {
            return r.a;
        }), n.d(t, "h", function() {
            return r.b;
        });
        var i = n(50);
        n.d(t, "a", function() {
            return i.a;
        }), n.d(t, "b", function() {
            return i.b;
        }), n.d(t, "c", function() {
            return i.c;
        }), n.d(t, "e", function() {
            return i.d;
        }), n.d(t, "f", function() {
            return i.e;
        }), n.d(t, "g", function() {
            return i.f;
        }), n.d(t, "i", function() {
            return i.g;
        });
        var o = n(51);
        n.d(t, "j", function() {
            return o.a;
        });
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "runtimes", function() {
            return s;
        }), n.d(t, "selectedRuntimeId", function() {
            return u;
        }), n.d(t, "runtime", function() {
            return l;
        }), n.d(t, "meta", function() {
            return d;
        }), n.d(t, "metaGraph", function() {
            return f;
        }), n.d(t, "metaTree", function() {
            return p;
        }), n.d(t, "metaEntity", function() {
            return h;
        }), n.d(t, "metaEntities", function() {
            return v;
        }), n.d(t, "graph", function() {
            return g;
        }), n.d(t, "state", function() {
            return y;
        });
        var r = n(0), i = n(7), o = n(12), a = n(1), c = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, s = Object(r.val)({}).react([ i.action.HOT ], function(e, t) {
            if (t.type === a.a.SET_RUNTIME) return c({}, e, (n = {}, n[t.payload.label] = t.payload.runtime, 
            n));
            var n;
        }).accept(o.b), u = Object(r.val)("").react([ s.HOT ], function(e, t) {
            return e || Object.keys(t)[0];
        }).react([ i.action.HOT ], function(e, t) {
            if (t.type === a.a.SELECT_ACTIVE_RUNTIME) return t.payload;
        }).accept(Object(o.a)(o.b, o.c)), l = Object(r.stream)([ s.COLD, u.HOT ], function(e, t) {
            return e[t];
        }).react([ i.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            switch (n) {
              case a.a.PROCESS_RUN:
                return void e.start(r);

              case a.a.PROCESS_STOP:
                return void e.stop(r);

              case a.a.ENTITY_RESET:
                return void e.set(r, e.getGraph().entities[r].value);

              case a.a.ENTITY_INSPECT:
                return void console.log(r, e.get(r));
            }
        }).accept(o.b), d = Object(r.stream)([ l.HOT ], function(e) {
            return e.getMeta();
        }).react([ i.action.HOT, l.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload, o = n, c = e.ui && e.ui.graph, s = e.ui && e.ui.tree, u = e.ui && e.ui.entity, l = c && c.viewBox;
            switch (r) {
              case a.b.MAIN.UPDATE_VISIBILITY:
                var d = e.ui && e.ui[i], f = d && d.window && d.window.visible;
                return o.setMeta({
                    ui: (v = {}, v[i] = {
                        window: {
                            visible: !f
                        }
                    }, v)
                });

              case a.b.MAIN.CLOSE_WINDOW:
                return o.setMeta({
                    ui: (g = {}, g[i] = {
                        window: {
                            visible: !1
                        }
                    }, g)
                });

              case a.b.TREE.TOGGLE_LEVEL:
                var p = s && s.fold || {};
                return o.setMeta({
                    ui: {
                        tree: {
                            fold: (y = {}, y[i] = !p[i], y)
                        }
                    }
                });

              case a.b.ENTITY.SET_ACTIVE_ENTITY:
                return o.setMeta({
                    ui: {
                        entity: {
                            activeEntityId: i,
                            watchingEntity: !0
                        }
                    }
                });

              case a.b.ENTITY.SET_ACTIVE_PROCESS:
                return o.setMeta({
                    ui: {
                        entity: {
                            activeProcessId: i,
                            watchingEntity: !1
                        }
                    }
                });

              case a.b.ENTITY.RESET_ACTIVE_NODE:
                return o.setMeta({
                    ui: {
                        entity: {
                            activeEntityId: "",
                            activeProcessId: "",
                            watchingEntity: !1
                        }
                    }
                });

              case a.b.ENTITY.SAVE_VALUE:
                var h = u && u.activeEntityId;
                return h && o.set(h, i), o.setMeta({
                    ui: {
                        entity: {
                            watchingEntity: !0
                        }
                    }
                });

              case a.b.ENTITY.WATCH_ACTIVE_ENTITY:
                return o.setMeta({
                    ui: {
                        entity: {
                            watchingEntity: i
                        }
                    }
                });

              case a.b.GRAPH.MOVE_VIEWPORT:
                return o.setMeta({
                    ui: {
                        graph: {
                            viewBox: {
                                offsetX: (l && l.offsetX || 0) + i.x,
                                offsetY: (l && l.offsetY || 0) + i.y
                            }
                        }
                    }
                });

              case a.b.GRAPH.UPDATE_SCALE:
                return o.setMeta({
                    ui: {
                        graph: {
                            viewBox: {
                                scale: i
                            }
                        }
                    }
                });

              case a.b.GRAPH.UPDATE_SIZE:
                if (i.width && i.height) return o.setMeta({
                    ui: {
                        graph: {
                            viewBox: {
                                width: i.width,
                                height: i.height
                            }
                        }
                    }
                });
                return;

              case a.b.GRAPH.SET_ENTITY_POSITION:
                return o.setMeta({
                    entities: (m = {}, m[i.eid] = {
                        ui: {
                            graph: {
                                position: i.pos
                            }
                        }
                    }, m)
                });
            }
            var v, g, y, m;
        }).accept(o.b), f = Object(r.stream)([ d.HOT ], function(e) {
            return e && e.ui && e.ui.graph;
        }).accept(o.c), p = Object(r.stream)([ d.HOT ], function(e) {
            return e && e.ui && e.ui.tree;
        }).accept(o.c), h = Object(r.stream)([ d.HOT ], function(e) {
            return e && e.ui && e.ui.entity;
        }).accept(o.c), v = Object(r.stream)([ d.HOT ], function(e) {
            return e && e.entities;
        }).accept(o.c), g = Object(r.stream)([ l.HOT ], function(e) {
            return e.getGraph();
        }), y = Object(r.stream)([ l.HOT ], function(e) {
            return e.getState();
        });
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o;
        }), n.d(t, "d", function() {
            return c;
        }), n.d(t, "e", function() {
            return s;
        }), n.d(t, "c", function() {
            return u;
        }), n.d(t, "b", function() {
            return l;
        }), n.d(t, "g", function() {
            return d;
        }), n.d(t, "f", function() {
            return f;
        });
        var r = n(2), i = (n.n(r), n(46)), o = "white", a = Object(i.a)(40, 40, 40, .75).toString(), c = 16, s = "cyan", u = {
            borderRadius: 4,
            backgroundColor: a,
            boxShadow: "0 10px 15px rgba(0,0,0,0.3)",
            borderTop: "1px solid rgba(255, 255, 255, 0.4)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.6)"
        }, l = {
            borderRadius: 4,
            boxShadow: "0 4px 8px rgba(0,0,0,0.3) inset",
            borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
            borderTop: "1px solid rgba(0, 0, 0, 0.6)"
        }, d = {
            padding: 0,
            listStyle: "none"
        }, f = Object(r.style)({
            position: "fixed",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            zIndex: 1e3,
            fontSize: c,
            fontFamily: "sans-serif",
            lineHeight: 1.5,
            color: o,
            userSelect: "none",
            $nest: {
                "& *": {
                    userSelect: "none",
                    MozUserSelect: "none"
                }
            }
        });
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            e.react([ g.COLD, y.HOT ], function(e, n, r) {
                if (n === t) return e.zIndex = r, e;
            });
        }
        function i(e, t) {
            return e.height > t.height - 20 && (e.height = t.height - 20), e.width > t.width - 20 && (e.width = t.width - 20), 
            e.top > t.height - 20 && (e.top = t.height - 20), e.left > t.width - 20 && (e.left = t.width - 20), 
            e.top < 0 && (e.top = 0), e.left < 0 && (e.left = 0), e;
        }
        function o(e) {
            e.react([ s.windowSize.HOT ], i);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "metaTreeWindow", function() {
            return f;
        }), n.d(t, "metaGraphWindow", function() {
            return p;
        }), n.d(t, "metaEntityWindow", function() {
            return h;
        }), n.d(t, "visibility", function() {
            return v;
        }), n.d(t, "activeWindow", function() {
            return g;
        }), n.d(t, "zIndex", function() {
            return y;
        }), n.d(t, "controlsPosition", function() {
            return m;
        }), n.d(t, "treeWindow", function() {
            return b;
        }), n.d(t, "graphWindow", function() {
            return _;
        }), n.d(t, "entityWindow", function() {
            return O;
        });
        var a = n(0), c = n(12), s = n(7), u = n(1), l = n(4), d = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, f = Object(a.stream)([ l.metaTree.HOT ], function(e) {
            return e.window;
        }).accept(Object(c.a)(c.b, c.c)), p = Object(a.stream)([ l.metaGraph.HOT ], function(e) {
            return e.window;
        }).accept(Object(c.a)(c.b, c.c)), h = Object(a.stream)([ l.metaEntity.HOT ], function(e) {
            return e.window;
        }).accept(Object(c.a)(c.b, c.c)), v = Object(a.val)({
            tree: !1,
            graph: !1,
            entity: !1
        }).react([ p.HOT ], function(e, t) {
            return d({}, e, {
                graph: !!t.visible
            });
        }).react([ h.HOT ], function(e, t) {
            return d({}, e, {
                entity: !!t.visible
            });
        }).react([ f.HOT ], function(e, t) {
            return d({}, e, {
                tree: !!t.visible
            });
        }).accept(function(e, t) {
            return t && e && (t.tree !== e.tree || t.entity !== e.entity || t.graph !== e.graph);
        }), g = Object(a.stream)([ s.action.HOT ], function(e) {
            var t = e.type, n = e.payload;
            if (t === u.b.MAIN.SET_ACTIVE_WINDOW || t === u.b.MAIN.UPDATE_VISIBILITY) return n;
        }).accept(Object(c.a)(c.b, c.c)).val(""), y = Object(a.val)(0).react([ g.HOT ], function(e) {
            return e + 1;
        }), m = Object(a.val)({
            left: 0,
            top: 0,
            zIndex: 0
        }).react([ g.COLD, s.dragDeltas.HOT, s.mouse.COLD, s.windowSize.COLD ], function(e, t, n, r, i) {
            var o = r.pressed[0] && r.pressed[0].target;
            if ("controls" === t && o && o.closest(".tvs-flow-controls") && (n.x || n.y)) return e.left -= n.x, 
            e.top -= n.y, e.top < 0 && (e.top = 0), e.left < 0 && (e.left = 0), e.top > i.height - 20 && (e.top = i.height - 20), 
            e.left > i.width - 20 && (e.left = i.width - 20), e;
        }).accept(c.b), b = Object(a.val)({
            top: 100,
            left: 0,
            width: 300,
            height: 400,
            zIndex: 0
        }).react([ g.COLD, s.mouse.COLD, s.dragDeltas.HOT, s.windowSize.COLD ], function(e, t, n, r, o) {
            var a = n.pressed[0] && n.pressed[0].target;
            if ("tree" === t && a && a.closest(".tvs-flow-tree") && (r.x || r.y)) return "resize" === a.className ? (e.width -= r.x, 
            e.height -= r.y) : (e.left -= r.x, e.top -= r.y), i(e, o);
        }).accept(c.b), _ = Object(a.val)({
            top: 200,
            left: 100,
            width: 600,
            height: 600,
            zIndex: 0
        }).react([ g.COLD, s.mouse.COLD, s.dragDeltas.HOT, s.windowSize.COLD ], function(e, t, n, r, o) {
            var a = n.pressed[0] && n.pressed[0].target;
            if ("graph" === t && a && a.closest(".tvs-flow-graph") && (r.x || r.y)) {
                if ("resize" === a.className) return e.width -= r.x, e.height -= r.y, i(e, o);
                if (!a.closest("svg")) return e.left -= r.x, e.top -= r.y, i(e, o);
            }
        }).accept(c.b), O = Object(a.val)({
            top: 50,
            left: 400,
            width: 400,
            height: 500,
            zIndex: 0
        }).react([ g.COLD, s.mouse.COLD, s.dragDeltas.HOT, s.windowSize.COLD ], function(e, t, n, r, o) {
            var a = n.pressed[0] && n.pressed[0].target;
            if ("entity" === t && a && a.closest(".tvs-flow-entity") && !a.closest("pre") && (r.x || r.y)) return "resize" === a.className ? (e.width -= r.x, 
            e.height -= r.y) : (e.left -= r.x, e.top -= r.y), i(e, o);
        }).accept(c.b);
        r(m, "controls"), r(b, "tree"), r(_, "graph"), r(O, "entity"), o(m), o(b), o(_), 
        o(O);
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "windowSize", function() {
            return c;
        }), n.d(t, "element", function() {
            return s;
        }), n.d(t, "mouse", function() {
            return u;
        }), n.d(t, "mouseDrag", function() {
            return l;
        }), n.d(t, "dragDeltas", function() {
            return d;
        }), n.d(t, "action", function() {
            return f;
        });
        var r = n(0), i = n(61), o = n(62), a = n(1), c = Object(r.asyncStreamStart)(null, i.a), s = Object(r.val)(), u = Object(r.asyncStream)([ s.HOT ], function(e, t) {
            return Object(o.a)(e, {
                el: t,
                enableRightButton: !0
            });
        }), l = Object(r.stream)([ u.HOT ], function(e) {
            return {
                x: e.drag.x,
                y: e.drag.y
            };
        }), d = Object(r.delta)(l, function(e, t) {
            return {
                x: 0 === e.x ? e.x : e.x - t.x,
                y: 0 === e.y ? e.y : e.y - t.y
            };
        }).accept(function(e) {
            return !(!e || !e.x && !e.y);
        }), f = Object(r.val)().react([ u.HOT ], function(e, t) {
            if (t.pressed[2] && t.pressed[2].target.closest("svg")) return Object(a.c)(a.b.ENTITY.RESET_ACTIVE_NODE);
        }).react([ u.COLD, d.HOT ], function(e, t, n) {
            var r = t.pressed[0] && t.pressed[0].target;
            if (r && "graph-ui" === r.id && (n.x || n.y)) return Object(a.c)(a.b.GRAPH.MOVE_VIEWPORT, n);
        });
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "activeEntityId", function() {
            return c;
        }), n.d(t, "activeProcessId", function() {
            return s;
        }), n.d(t, "activeEntity", function() {
            return u;
        }), n.d(t, "activeProcess", function() {
            return l;
        }), n.d(t, "activeNode", function() {
            return d;
        }), n.d(t, "watchingEntity", function() {
            return f;
        }), n.d(t, "activeValue", function() {
            return p;
        }), n.d(t, "entityViewProps", function() {
            return h;
        });
        var r = n(0), i = n(12), o = n(4), a = n(6), c = Object(r.stream)([ o.metaEntity.HOT ], function(e) {
            return e.activeEntityId;
        }).accept(Object(i.a)(i.b, i.c)), s = Object(r.stream)([ o.metaEntity.HOT ], function(e) {
            return e.activeProcessId;
        }).accept(Object(i.a)(i.b, i.c)), u = Object(r.stream)([ c.HOT, o.graph.COLD ], function(e, t) {
            return t.entities[e] || {
                id: e
            };
        }), l = Object(r.stream)([ s.HOT, o.graph.COLD ], function(e, t) {
            return t.processes[e] || {
                id: e
            };
        }), d = Object(r.val)({}).react([ u.HOT ], function(e, t) {
            return t;
        }).react([ l.HOT ], function(e, t) {
            return t;
        }), f = Object(r.stream)([ o.metaEntity.HOT ], function(e) {
            return e.watchingEntity;
        }).accept(Object(i.a)(i.b, i.c)), p = Object(r.asyncStream)([ o.runtime.COLD, c.HOT, a.visibility.HOT, f.HOT ], function(e, t, n, r, i) {
            if (n) {
                var o = t.get(n);
                if (e(o), r.entity && i) return t.on(n, e), function() {
                    return t.off(n, e);
                };
            } else e("");
        }), h = Object(r.stream)([ u.HOT, p.HOT, f.HOT ], function(e, t, n) {
            return {
                entity: e,
                value: t,
                watching: n
            };
        });
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = e.id, n = void 0 === t ? Object(a.a)() : t, r = e.value, i = e.json, o = e.accept, c = e.reset, s = e.meta;
            return void 0 === r && i && (r = JSON.parse(i)), {
                id: n,
                value: r,
                accept: o,
                reset: c,
                meta: s
            };
        }
        function i(e, t) {
            var n = e.id, r = void 0 === n ? Object(a.a)() : n, i = e.ports, o = void 0 === i ? [] : i, u = e.procedure, l = e.code, d = e.autostart, f = void 0 !== d && d, p = e.async, h = void 0 !== p && p, v = e.delta, g = void 0 !== v && v, y = e.meta;
            if (null == u && null != l && (u = Object(c.a)(l, t)), null == u) throw TypeError("Process must have procedure or code set");
            return g && !o.length && o.push(s.HOT), {
                id: r,
                ports: o,
                procedure: u,
                autostart: f,
                async: h,
                delta: g,
                meta: y
            };
        }
        function o(e) {
            var t = e.id, n = e.entity, r = e.process, i = e.port, o = e.meta;
            if (null == n) throw TypeError("no entity specified in arc " + t);
            if (null == r) throw TypeError("no process specified in arc " + t);
            return null == t && (t = null == i ? r + "->" + n : n + "->" + r + "::" + i), {
                id: t,
                entity: n,
                process: r,
                port: i,
                meta: o
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.createEntity = r, t.createProcess = i, t.createArc = o, n.d(t, "PORT_TYPES", function() {
            return s;
        });
        var a = n(17), c = n(36), s = {
            COLD: "COLD",
            HOT: "HOT",
            ACCUMULATOR: "ACCUMULATOR"
        };
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            function n(e) {
                return e.replace(v, m).replace(g, "-ms-");
            }
            function r(e) {
                for (var t = 5381, n = e.length; n--; ) t = 33 * t ^ e.charCodeAt(n);
                return (t >>> 0).toString(36);
            }
            function i(e, t) {
                return "number" != typeof t || 0 === t || _[e] ? e + ":" + t : e + ":" + t + "px";
            }
            function o(e) {
                return e.sort(function(e, t) {
                    return e[0] > t[0] ? 1 : -1;
                });
            }
            function a(e, r) {
                for (var i = [], a = [], s = !1, u = 0, l = Object.keys(e); u < l.length; u++) {
                    var d = l[u], f = e[d];
                    if (null !== f && void 0 !== f) if (d === t.IS_UNIQUE) s = !0; else if ("object" == typeof f) if (Array.isArray(f)) for (var p = n(d.trim()), h = 0; h < f.length; h++) i.push([ p, f[h] ]); else a.push([ d.trim(), f ]); else i.push([ n(d.trim()), f ]);
                }
                return {
                    styleString: c(o(i)),
                    nestedStyles: r ? a : o(a),
                    isUnique: s
                };
            }
            function c(e) {
                for (var t = e.length - 1, n = "", r = 0; r < e.length; r++) {
                    var o = e[r];
                    n += i(o[0], o[1]) + (r === t ? "" : ";");
                }
                return n;
            }
            function s(e, t) {
                return e.indexOf("&") > -1 ? e.replace(y, t) : t + " " + e;
            }
            function u(e, t, n, r, i) {
                var o = a(n, !!t), c = o.styleString, l = o.nestedStyles, d = o.isUnique, f = c;
                if (64 === t.charCodeAt(0)) {
                    var p = e.add(new N(t, i ? void 0 : c, e.hash));
                    if (c && i) {
                        var v = p.add(new I(c, p.hash, d ? "u" + (++h).toString(36) : void 0));
                        r.push([ i, v ]);
                    }
                    for (var g = 0, y = l; g < y.length; g++) {
                        var m = y[g], b = m[0], _ = m[1];
                        f += b + u(p, b, _, r, i);
                    }
                } else {
                    var O = i ? s(t, i) : t;
                    if (c) {
                        var v = e.add(new I(c, e.hash, d ? "u" + (++h).toString(36) : void 0));
                        r.push([ O, v ]);
                    }
                    for (var w = 0, T = l; w < T.length; w++) {
                        var k = T[w], b = k[0], _ = k[1];
                        f += b + u(e, b, _, r, O);
                    }
                }
                return f;
            }
            function l(e, t, n, r, i) {
                for (var o = new j(e.hash), a = [], c = u(o, t, n, a), l = "f" + o.hash(c), d = i ? i + "_" + l : l, f = 0, p = a; f < p.length; f++) {
                    var h = p[f], v = h[0], g = h[1], y = r ? s(v, "." + d) : v;
                    g.add(new C(y, g.hash, void 0, c));
                }
                return {
                    cache: o,
                    pid: c,
                    id: d
                };
            }
            function d(e) {
                for (var t = "", n = 0, r = e; n < r.length; n++) {
                    t += r[n];
                }
                return t;
            }
            function f(e, t, n) {
                return new M(e, t, void 0, n);
            }
            var p = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t;
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                };
                return function(t, n) {
                    function r() {
                        this.constructor = t;
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
                    new r());
                };
            }();
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var h = 0;
            t.IS_UNIQUE = "__DO_NOT_DEDUPE_STYLE__";
            for (var v = /[A-Z]/g, g = /^ms-/, y = /&/g, m = function(e) {
                return "-" + e.toLowerCase();
            }, b = [ "animation-iteration-count", "box-flex", "box-flex-group", "column-count", "counter-increment", "counter-reset", "flex", "flex-grow", "flex-positive", "flex-shrink", "flex-negative", "font-weight", "line-clamp", "line-height", "opacity", "order", "orphans", "tab-size", "widows", "z-index", "zoom", "fill-opacity", "stroke-dashoffset", "stroke-opacity", "stroke-width" ], _ = Object.create(null), O = 0, w = [ "-webkit-", "-ms-", "-moz-", "-o-", "" ]; O < w.length; O++) for (var T = w[O], k = 0, S = b; k < S.length; k++) {
                var E = S[k];
                _[T + E] = !0;
            }
            t.stringHash = r;
            var x = {
                add: function() {},
                change: function() {},
                remove: function() {}
            }, j = function() {
                function e(e, t) {
                    void 0 === e && (e = r), void 0 === t && (t = x), this.hash = e, this.changes = t, 
                    this.sheet = [], this.changeId = 0, this._keys = [], this._children = Object.create(null), 
                    this._counters = Object.create(null);
                }
                return e.prototype.add = function(t) {
                    var n = this._counters[t.id] || 0, r = this._children[t.id] || t.clone();
                    if (this._counters[t.id] = n + 1, 0 === n) this._children[r.id] = r, this._keys.push(r.id), 
                    this.sheet.push(r.getStyles()), this.changeId++, this.changes.add(r, this._keys.length - 1); else {
                        if (r.getIdentifier() !== t.getIdentifier()) throw new TypeError("Hash collision: " + t.getStyles() + " === " + r.getStyles());
                        var i = this._keys.indexOf(t.id), o = this._keys.length - 1, a = this.changeId;
                        if (i !== o && (this._keys.splice(i, 1), this._keys.push(t.id), this.changeId++), 
                        r instanceof e && t instanceof e) {
                            var c = r.changeId;
                            r.merge(t), r.changeId !== c && this.changeId++;
                        }
                        this.changeId !== a && (i === o ? this.sheet.splice(i, 1, r.getStyles()) : (this.sheet.splice(i, 1), 
                        this.sheet.splice(o, 0, r.getStyles())), this.changes.change(r, i, o));
                    }
                    return r;
                }, e.prototype.remove = function(t) {
                    var n = this._counters[t.id];
                    if (n > 0) {
                        this._counters[t.id] = n - 1;
                        var r = this._children[t.id], i = this._keys.indexOf(r.id);
                        if (1 === n) delete this._counters[t.id], delete this._children[t.id], this._keys.splice(i, 1), 
                        this.sheet.splice(i, 1), this.changeId++, this.changes.remove(r, i); else if (r instanceof e && t instanceof e) {
                            var o = r.changeId;
                            r.unmerge(t), r.changeId !== o && (this.sheet.splice(i, 1, r.getStyles()), this.changeId++, 
                            this.changes.change(r, i, i));
                        }
                    }
                }, e.prototype.merge = function(e) {
                    for (var t = 0, n = e._keys; t < n.length; t++) {
                        var r = n[t];
                        this.add(e._children[r]);
                    }
                    return this;
                }, e.prototype.unmerge = function(e) {
                    for (var t = 0, n = e._keys; t < n.length; t++) {
                        var r = n[t];
                        this.remove(e._children[r]);
                    }
                    return this;
                }, e.prototype.clone = function() {
                    return new e(this.hash).merge(this);
                }, e;
            }();
            t.Cache = j;
            var C = function() {
                function e(e, t, n, r) {
                    void 0 === n && (n = "s" + t(e)), void 0 === r && (r = ""), this.selector = e, this.hash = t, 
                    this.id = n, this.pid = r;
                }
                return e.prototype.getStyles = function() {
                    return this.selector;
                }, e.prototype.getIdentifier = function() {
                    return this.pid + "." + this.selector;
                }, e.prototype.clone = function() {
                    return new e(this.selector, this.hash, this.id, this.pid);
                }, e;
            }();
            t.Selector = C;
            var I = function(e) {
                function t(t, n, r) {
                    void 0 === r && (r = "c" + n(t));
                    var i = e.call(this, n) || this;
                    return i.style = t, i.hash = n, i.id = r, i;
                }
                return p(t, e), t.prototype.getStyles = function() {
                    return this.sheet.join(",") + "{" + this.style + "}";
                }, t.prototype.getIdentifier = function() {
                    return this.style;
                }, t.prototype.clone = function() {
                    return new t(this.style, this.hash, this.id).merge(this);
                }, t;
            }(j);
            t.Style = I;
            var N = function(e) {
                function t(t, n, r, i, o) {
                    void 0 === n && (n = ""), void 0 === i && (i = "a" + r(t + "." + n)), void 0 === o && (o = "");
                    var a = e.call(this, r) || this;
                    return a.rule = t, a.style = n, a.hash = r, a.id = i, a.pid = o, a;
                }
                return p(t, e), t.prototype.getStyles = function() {
                    return this.rule + "{" + this.style + d(this.sheet) + "}";
                }, t.prototype.getIdentifier = function() {
                    return this.pid + "." + this.rule + "." + this.style;
                }, t.prototype.clone = function() {
                    return new t(this.rule, this.style, this.hash, this.id, this.pid).merge(this);
                }, t;
            }(j);
            t.Rule = N;
            var M = function(t) {
                function n(n, i, o, a) {
                    void 0 === n && (n = r), void 0 === i && (i = void 0 !== e && !1), void 0 === o && (o = "f" + (++h).toString(36));
                    var c = t.call(this, n, a) || this;
                    return c.hash = n, c.debug = i, c.id = o, c;
                }
                return p(n, t), n.prototype.registerStyle = function(e, t) {
                    var n = l(this, "&", e, !0, this.debug ? t : void 0), r = n.cache, i = n.id;
                    return this.merge(r), i;
                }, n.prototype.registerKeyframes = function(e, t) {
                    return this.registerHashRule("@keyframes", e, t);
                }, n.prototype.registerHashRule = function(e, t, n) {
                    var r = l(this, "", t, !1, this.debug ? n : void 0), i = r.cache, o = r.pid, a = r.id, c = new N(e + " " + a, void 0, this.hash, void 0, o);
                    return this.add(c.merge(i)), a;
                }, n.prototype.registerRule = function(e, t) {
                    this.merge(l(this, e, t, !1).cache);
                }, n.prototype.registerCss = function(e) {
                    this.merge(l(this, "", e, !1).cache);
                }, n.prototype.getStyles = function() {
                    return d(this.sheet);
                }, n.prototype.getIdentifier = function() {
                    return this.id;
                }, n.prototype.clone = function() {
                    return new n(this.hash, this.debug, this.id, this.changes).merge(this);
                }, n;
            }(j);
            t.FreeStyle = M, t.create = f;
        }).call(t, n(41));
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c;
        }), n.d(t, "c", function() {
            return s;
        }), n.d(t, "b", function() {
            return u;
        });
        var r = n(2), i = (n.n(r), n(5)), o = (Object(r.style)({
            margin: "0 4px",
            verticalAlign: "top",
            display: "inline-block",
            $nest: {
                "& input": {
                    margin: 5,
                    verticalAlign: "middle"
                }
            }
        }), {
            margin: "0 4px",
            padding: "4px 10px 3px",
            border: 0,
            color: i.a,
            fontSize: "1.0em",
            verticalAlign: "middle",
            cursor: "pointer",
            $nest: {
                "& > svg": {
                    verticalAlign: "middle"
                }
            }
        }), a = {
            padding: "0 4px"
        }, c = Object(r.style)(i.c, o), s = Object(r.style)(i.c, o, a), u = Object(r.style)({
            display: "inline-block",
            margin: "0 2px",
            padding: 0,
            border: 0,
            background: "transparent",
            boxShadow: "none",
            fontSize: "0.9em"
        });
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return r;
        }), n.d(t, "b", function() {
            return i;
        }), n.d(t, "c", function() {
            return o;
        });
        var r = function(e, t) {
            return function(n, r) {
                return e(n, r) && t(n, r);
            };
        }, i = function(e) {
            return null != e;
        }, o = function(e, t) {
            return e !== t;
        };
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 24 24"
            }, [ "title", "close" ], [ "path", {
                d: "M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"
            } ] ];
        }
        function i() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 24 24"
            }, [ "title", "graph" ], [ "path", {
                d: "M18 16.078c1.594 0 2.906 1.313 2.906 2.906s-1.313 2.953-2.906 2.953-2.906-1.359-2.906-2.953c0-0.234 0-0.469 0.047-0.656l-7.078-4.125c-0.563 0.516-1.266 0.797-2.063 0.797-1.641 0-3-1.359-3-3s1.359-3 3-3c0.797 0 1.5 0.281 2.063 0.797l7.031-4.078c-0.047-0.234-0.094-0.469-0.094-0.703 0-1.641 1.359-3 3-3s3 1.359 3 3-1.359 3-3 3c-0.797 0-1.5-0.328-2.063-0.844l-7.031 4.125c0.047 0.234 0.094 0.469 0.094 0.703s-0.047 0.469-0.094 0.703l7.125 4.125c0.516-0.469 1.219-0.75 1.969-0.75z"
            } ] ];
        }
        function o() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 24 24"
            }, [ "title", "list" ], [ "path", {
                d: "M9 5.016h12v3.984h-12v-3.984zM9 18.984v-3.984h12v3.984h-12zM9 14.016v-4.031h12v4.031h-12zM3.984 9v-3.984h4.031v3.984h-4.031zM3.984 18.984v-3.984h4.031v3.984h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031z"
            } ] ];
        }
        function a() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 24 24"
            }, [ "title", "entity" ], [ "path", {
                d: "M16.641 1.688l5.672 5.672-5.672 5.625h4.359v8.016h-8.016v-8.016h3.656l-5.625-5.625v3.656h-8.016v-8.016h8.016v4.359zM3 21v-8.016h8.016v8.016h-8.016z"
            } ] ];
        }
        function c() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "play" ], [ "path", {
                d: "M6 4l20 12-20 12z"
            } ] ];
        }
        function s() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "stop" ], [ "path", {
                d: "M4 4h24v24h-24z"
            } ] ];
        }
        function u() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "stopMarked" ], [ "path", {
                d: "M4 4h24v24h-24z"
            } ], [ "circle", {
                cx: "16",
                cy: "16",
                r: "6",
                fill: "#666"
            } ] ];
        }
        function l() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "reset" ], [ "path", {
                d: "M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z"
            } ] ];
        }
        function d() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "show" ], [ "path", {
                d: "M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
            } ] ];
        }
        function f() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "copy" ], [ "path", {
                d: "M28.681 11.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-11.5c-1.379 0-2.5 1.122-2.5 2.5v23c0 1.378 1.121 2.5 2.5 2.5h19c1.378 0 2.5-1.122 2.5-2.5v-15.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 9.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268v0zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-19c-0.271 0-0.5-0.229-0.5-0.5v-23c0-0.271 0.229-0.5 0.5-0.5 0 0 11.499-0 11.5 0v7c0 0.552 0.448 1 1 1h7v15.5z"
            } ], [ "path", {
                d: "M18.841 1.319c-1.612-1.182-2.393-1.319-2.841-1.319h-11.5c-1.378 0-2.5 1.121-2.5 2.5v23c0 1.207 0.86 2.217 2 2.45v-25.45c0-0.271 0.229-0.5 0.5-0.5h15.215c-0.301-0.248-0.595-0.477-0.873-0.681z"
            } ] ];
        }
        function p() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "more" ], [ "path", {
                d: "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"
            } ], [ "path", {
                d: "M11.086 22.086l2.829 2.829 8.914-8.914-8.914-8.914-2.828 2.828 6.086 6.086z"
            } ] ];
        }
        t.a = r, t.d = i, t.e = o, t.c = a, t.g = c, t.j = s, t.k = u, t.h = l, t.i = d, 
        t.b = f, t.f = p;
        var h = n(20), v = n(5), g = Object(h.b)({
            display: "inline-block",
            width: "1.1em",
            height: "1.1em",
            margin: 4,
            strokeWidth: 0,
            stroke: "currentColor",
            fill: "currentColor",
            verticalAlign: "bottom",
            $nest: {
                "&.selected": {
                    fill: v.e
                }
            }
        });
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = e.title, n = e.onclick, r = e.icon, a = e.key, c = e.class, s = [ "button", {
                class: Object(i.classes)(o.c, c),
                onmouseup: n,
                title: t
            }, r ];
            return a && (s[1].key = a), s;
        }
        t.a = r;
        var i = n(2), o = (n.n(i), n(11));
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a;
        }), n.d(t, "e", function() {
            return c;
        }), n.d(t, "d", function() {
            return s;
        }), n.d(t, "c", function() {
            return u;
        }), n.d(t, "b", function() {
            return l;
        });
        var r = n(2), i = (n.n(r), n(5)), o = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, a = Object(r.style)(i.c, {
            display: "inline-block",
            position: "relative",
            padding: 2,
            whiteSpace: "nowrap",
            $nest: {
                "& h1": {
                    display: "inline-block",
                    margin: "0 8px",
                    fontSize: i.d,
                    fontWeight: "normal",
                    verticalAlign: "middle"
                },
                "& ul": o({}, i.g, {
                    display: "inline-block",
                    margin: 0,
                    fontSize: i.d,
                    fontWeight: "normal"
                }),
                "& li": {
                    display: "inline-block"
                },
                "& nav": {
                    display: "inline-block"
                }
            }
        }), c = Object(r.style)(i.c, {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            padding: 5,
            paddingTop: 1,
            alignItems: "stretch",
            alignContent: "stretch",
            $nest: {
                "&>.resize": {
                    position: "absolute",
                    width: 20,
                    height: 20,
                    bottom: 0,
                    right: 0,
                    borderRadius: 4,
                    cursor: "nwse-resize",
                    background: "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)"
                },
                "&>header": {
                    display: "flex",
                    alignItems: "center",
                    minHeight: 26
                },
                "&>header input": {
                    verticalAlign: "middle"
                },
                "&>header .gap": {
                    flexGrow: 1
                }
            }
        }), s = Object(r.style)(i.b, {
            overflow: "auto",
            position: "relative",
            flexGrow: 1,
            padding: 5
        }), u = Object(r.style)(i.g, {
            margin: 0,
            $nest: {
                "& ul": i.g,
                "& li": {
                    paddingLeft: "1.5em",
                    cursor: "pointer"
                },
                "&>li": {
                    paddingLeft: 0
                },
                "& .entity-controls": {
                    display: "none"
                },
                "& .entity-item:hover>.entity-controls": {
                    display: "inline"
                },
                "& .entity-item.selected": {
                    color: i.e
                }
            }
        }), l = Object(r.style)({
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflow: "auto",
            $nest: {
                "& pre": {
                    margin: 0,
                    MozUserSelect: "text",
                    userSelect: "text"
                }
            }
        });
    }, function(e, t, n) {
        e.exports = n(65).default, e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = c, n = 0;
            return t[e[n++]] + t[e[n++]] + t[e[n++]] + t[e[n++]] + "-" + t[e[n++]] + t[e[n++]] + "-" + t[e[n++]] + t[e[n++]] + "-" + t[e[n++]] + t[e[n++]] + "-" + t[e[n++]] + t[e[n++]] + t[e[n++]] + t[e[n++]] + t[e[n++]] + t[e[n++]];
        }
        function i() {
            var e = a();
            return e[6] = 15 & e[6] | 64, e[8] = 63 & e[8] | 128, r(e);
        }
        t.a = i;
        for (var o = new Array(16), a = function() {
            for (var e = 0, t = void 0; e < 16; e++) 0 == (3 & e) && (t = 4294967296 * Math.random(), 
            o[e] = t >>> ((3 & e) << 3) & 255);
            return o;
        }, c = [], s = {}, u = 0; u < 256; u++) c[u] = (u + 256).toString(16).substr(1), 
        s[c[u]] = u;
    }, function(e, t, n) {
        "use strict";
        function r() {
            return {
                entities: {},
                processes: {},
                arcs: {},
                meta: {}
            };
        }
        function i(e, t) {
            return {
                entities: o({}, e.entities, t.entities),
                processes: o({}, e.processes, t.processes),
                arcs: o({}, e.arcs, t.arcs),
                meta: o({}, e.meta, t.meta)
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.empty = r, t.merge = i;
        var o = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            return void 0 === t && (t = "."), e.split(".")[1].split("/").filter(function(e) {
                return e;
            }).join(t);
        }
        function i(e, t) {
            var n = e.keys().map(function(n) {
                var i = e(n);
                return Object.values(Object(o.resolveEntityIds)(i, r(n, t))).filter(o.isEntity);
            }).reduce(function(e, t) {
                return e.concat(t);
            }, []);
            return Object(o.getGraphFromAll)(n);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.modulePathToNamespace = r, t.getGraphFromModules = i;
        var o = n(0);
    }, function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return c;
        });
        var r = n(39), i = n(42), o = (n.n(i), n(21));
        n.d(t, "a", function() {
            return o.a;
        });
        var a = new r.a({
            autoGenerateTag: !0
        }), c = (a.setStylesTarget, a.cssRaw, a.cssRule, a.forceRenderStyles, a.fontFace, 
        a.getStyles, a.keyframes, a.reinit, a.style);
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return e.filter(function(e) {
                return !!e;
            }).join(" ");
        }
        function i() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            for (var n = {}, r = 0, o = e; r < o.length; r++) {
                var a = o[r];
                if (null != a && !1 !== a) for (var c in a) {
                    var s = a[c];
                    (s || 0 === s) && ("$nest" === c && s ? n[c] = n.$nest ? i(n.$nest, s) : s : -1 !== c.indexOf("&") || 0 === c.indexOf("@media") ? n[c] = n[c] ? i(n[c], s) : s : n[c] = s);
                }
            }
            return n;
        }
        n.d(t, "c", function() {
            return o;
        }), t.a = r, t.b = i;
        var o = "undefined" == typeof requestAnimationFrame ? setTimeout : requestAnimationFrame.bind(window);
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return e.filter(function(e) {
                return !!e;
            }).join(" ");
        }
        function i() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            for (var n = {}, r = 0, o = e; r < o.length; r++) {
                var a = o[r];
                if (null != a && !1 !== a) for (var c in a) {
                    var s = a[c];
                    (s || 0 === s) && ("$nest" === c && s ? n[c] = n.$nest ? i(n.$nest, s) : s : -1 !== c.indexOf("&") || 0 === c.indexOf("@media") ? n[c] = n[c] ? i(n[c], s) : s : n[c] = s);
                }
            }
            return n;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.raf = "undefined" == typeof requestAnimationFrame ? setTimeout : requestAnimationFrame.bind(window), 
        t.classes = r, t.extend = i, t.media = function(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            var r = [];
            e.type && r.push(e.type), e.orientation && r.push(e.orientation), e.minWidth && r.push("(min-width: " + o(e.minWidth) + ")"), 
            e.maxWidth && r.push("(max-width: " + o(e.maxWidth) + ")"), e.minHeight && r.push("(min-height: " + o(e.minHeight) + ")"), 
            e.maxHeight && r.push("(max-height: " + o(e.maxHeight) + ")");
            var a = "@media " + r.join(" and ");
            return {
                $nest: (c = {}, c[a] = i.apply(void 0, t), c)
            };
            var c;
        };
        var o = function(e) {
            return "string" == typeof e ? e : e + "px";
        };
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a;
        });
        var r = n(3), i = n(24), o = function(e) {
            return function() {
                return Object(r.d)(arguments, function(e) {
                    return e || 0 === e;
                }).map(function(e) {
                    return "number" == typeof e ? Object(i.a)(e) : e.toString();
                }).join(e);
            };
        }, a = o(" ");
        o(",");
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return i;
        });
        var r = n(3), i = (Object(r.g)("%"), Object(r.g)("deg"), Object(r.g)("em"), Object(r.g)("px"));
        Object(r.g)("rad"), Object(r.g)("rem"), Object(r.g)("vh"), Object(r.g)("vw"), Object(r.g)("turn");
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "entityWindowProps", function() {
            return a;
        }), n.d(t, "controlProps", function() {
            return c;
        }), n.d(t, "treeWindowProps", function() {
            return s;
        }), n.d(t, "graphWindowProps", function() {
            return u;
        });
        var r = n(0), i = n(8), o = n(6), a = Object(r.stream)([ o.entityWindow.HOT, i.activeNode.HOT, o.activeWindow.HOT ], function(e, t, n) {
            return {
                dimensions: e,
                node: t,
                window: n
            };
        }).val({}), c = Object(r.stream)([ o.visibility.HOT, o.controlsPosition.HOT ], function(e, t) {
            return {
                visibility: e,
                position: t
            };
        }), s = Object(r.stream)([ o.treeWindow.HOT, o.activeWindow.HOT ], function(e, t) {
            return {
                dimensions: e,
                window: t
            };
        }).val({}), u = Object(r.stream)([ o.graphWindow.HOT, o.activeWindow.HOT ], function(e, t) {
            return {
                dimensions: e,
                window: t
            };
        }).val({});
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = e.split(".");
            return {
                label: t.pop(),
                group: t.join(".")
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "viewBox", function() {
            return h;
        }), n.d(t, "entityPositions", function() {
            return v;
        }), n.d(t, "graphEntities", function() {
            return g;
        }), n.d(t, "graphProcesses", function() {
            return y;
        }), n.d(t, "viewData", function() {
            return m;
        });
        var i = n(0), o = n(7), a = n(12), c = n(4), s = n(9), u = n(6), l = n(8), d = n(27), f = n(1), p = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, h = Object(i.stream)([ c.metaGraph.HOT ], function(e) {
            return e.viewBox || d.b;
        }).accept(a.c), v = Object(i.stream)([ c.graph.HOT, c.metaEntities.HOT, u.graphWindow.COLD ], function(e, t, n) {
            var r = {};
            for (var i in e.entities) {
                var o = t[i];
                r[i] = o && o.ui && o.ui.graph && o.ui.graph.position || {
                    x: Math.random() * n.width,
                    y: Math.random() * n.height
                };
            }
            return r;
        });
        o.action.react([ l.activeEntityId.COLD, v.COLD, o.mouse.COLD, o.dragDeltas.HOT, h.COLD ], function(e, t, n, r, i, o) {
            var a = r.pressed[0] && r.pressed[0].target, c = a && (a.dataset.eid || a.parentElement && a.parentElement.dataset.eid);
            if (c && t === c && self[t] && (i.x || i.y)) return Object(f.c)(f.b.GRAPH.SET_ENTITY_POSITION, {
                eid: t,
                pos: {
                    x: n[t].x - i.x * o.scale,
                    y: n[t].y - i.y * o.scale
                }
            });
        }).accept(a.b);
        var g = Object(i.stream)([ c.graph.HOT, l.activeNode.HOT ], function(e, t) {
            var n = {}, i = {}, o = 0;
            for (var a in e.entities) {
                var c = e.entities[a], s = r(a), u = s.label, l = s.group;
                i[l] = i[l] || o++ % 7 + 1;
                var d = {
                    id: c.id,
                    class: "group-" + i[l],
                    label: u,
                    active: c.id === t.id
                };
                null != c.accept && (d.accept = !0), null != c.value && (d.initial = !0), n[a] = d;
            }
            return n;
        }).react([ v.HOT ], function(e, t) {
            for (var n in e) e[n].x = t[n].x, e[n].y = t[n].y;
            return e;
        }), y = Object(i.stream)([ c.graph.HOT, l.activeNode.HOT ], function(e, t) {
            var n = {};
            for (var i in e.processes) {
                var o = e.processes[i], a = p({
                    id: i
                }, r(i), {
                    from: [],
                    async: o.async,
                    autostart: o.autostart,
                    active: o.id === t.id,
                    acc: o.ports && o.ports.includes(s.PORT_TYPES.ACCUMULATOR)
                });
                for (var c in e.arcs) {
                    var u = e.arcs[c];
                    u.process === i && (null != u.port ? a.from.push([ u.entity, o.ports && o.ports[u.port] ]) : a.to = u.entity);
                }
                n[i] = a;
            }
            return n;
        }), m = Object(i.stream)([ g.HOT, y.HOT ], function(e, t) {
            var n = [], r = [];
            for (var i in t) {
                var o = t[i], a = e[o.to];
                if (o.class = a.class, o.from.length) {
                    o.x = 0, o.y = 0;
                    for (var c = 0, u = o.from; c < u.length; c++) {
                        var l = u[c], d = l[0], f = l[1], p = e[d], h = p.x - a.x, v = p.y - a.y;
                        f === s.PORT_TYPES.COLD && (h /= 2, v /= 2), o.x += h, o.y += v;
                    }
                    var g = Math.sqrt(o.x * o.x + o.y * o.y);
                    o.x = 50 * o.x / g + a.x, o.y = 50 * o.y / g + a.y;
                    for (var y = 0, m = o.from; y < m.length; y++) {
                        var b = m[y], d = b[0], f = b[1], p = e[d];
                        o.fromIsActive = o.fromIsActive || p.active, r.push({
                            from: p,
                            to: o,
                            class: "from" + (f === s.PORT_TYPES.COLD ? " cold" : ""),
                            title: f,
                            active: a.active || o.active || p.active
                        });
                    }
                } else o.x = a.x, o.y = a.y - 50;
                n.push(o), r.push({
                    from: o,
                    to: a,
                    class: "to" + (o.async ? " async" : ""),
                    active: a.active || o.active || o.fromIsActive
                }), o.acc && r.push({
                    from: o,
                    to: a,
                    class: "to acc"
                });
            }
            return {
                entities: Object.values(e),
                processes: n,
                edges: r
            };
        }).react([ h.HOT ], function(e, t) {
            return e.viewBox = {
                x: t.offsetX * t.scale,
                y: t.offsetY * t.scale,
                width: t.width * t.scale,
                height: t.height * t.scale
            }, e;
        });
    }, function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
            return r;
        }), n.d(t, "a", function() {
            return i;
        });
        var r = {
            width: 0,
            height: 0,
            offsetX: 0,
            offsetY: 0,
            scale: 1
        }, i = {
            ui: {
                entity: {
                    activeEntityId: "",
                    activeProcessId: "",
                    watchingEntity: !1,
                    window: {
                        visible: !1
                    }
                },
                graph: {
                    window: {
                        visible: !1
                    }
                },
                tree: {
                    window: {
                        visible: !1
                    }
                }
            }
        };
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "entityTree", function() {
            return c;
        }), n.d(t, "treeData", function() {
            return s;
        });
        var r = n(0), i = n(8), o = n(4), a = n(29), c = Object(r.stream)([ o.graph.HOT ], function(e) {
            return Object(a.createEntityTree)(e.entities);
        }), s = Object(r.stream)([ o.metaTree.HOT, c.HOT, i.activeEntity.HOT ], function(e, t, n) {
            return {
                fold: e.fold || {},
                tree: t,
                selected: n
            };
        }).val({
            fold: null,
            tree: null,
            selected: {}
        });
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            void 0 === t && (t = ".");
            var n = {};
            return Object.keys(e).sort().forEach(function(r) {
                var i = e[r], o = i.id.split(t), a = n, c = o.slice(), s = [];
                o.forEach(function() {
                    var e = c.shift();
                    c.length ? (s.push(e), a = a[e] = a[e] || {
                        __path__: s.join(t)
                    }) : a[e] = {
                        __entity__: i
                    };
                });
            }), n;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.createEntityTree = r;
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e in p) p[e]();
            p = {}, h = !0;
        }
        function i(e, t) {
            p[e] = t, h && (requestAnimationFrame(r), h = !1);
        }
        function o(e, t, n) {
            function r(n, r) {
                "string" == typeof n ? e.set(t, {
                    type: n,
                    payload: r
                }) : e.set(t, n);
            }
            void 0 === n && (n = !1);
            var o = {};
            return function t(c, s) {
                var u = s.getId(), l = u + c.toString();
                if (o[l]) return o[l];
                var p = function(o) {
                    function s() {
                        var t = null !== o && o.apply(this, arguments) || this;
                        return t.state = {
                            current: e.get(u)
                        }, t.update = function() {
                            t.setState(function(t) {
                                return t.current = e.get(u), t;
                            });
                        }, t.updateAsync = function() {
                            i(l, t.update);
                        }, t;
                    }
                    return d(s, o), s.prototype.render = function() {
                        return a(c(this.state.current, r, t));
                    }, s.prototype.componentDidMount = function() {
                        n && console.log("component mounted!", this), e.on(u, this.updateAsync);
                    }, s.prototype.componentWillUnmount = function() {
                        n && console.log("component will unmount!", this), e.off(u, this.updateAsync);
                    }, s;
                }(f);
                return o[l] = p, p;
            };
        }
        function a(e) {
            if ("function" == typeof e) return l()(e);
            if (!Array.isArray(e)) return e;
            var t = e.shift(), n = e[0];
            return "object" != typeof n || Array.isArray(n) ? n = {} : e.shift(), e.length ? l()(t, n, e.map(a)) : l()(t, n);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "ComponentClass", function() {
            return f;
        }), t.flowComponentFactory = o, t.h = a;
        var c = n(63), s = n.n(c), u = n(31), l = n.n(u), d = this && this.__extends || function() {
            var e = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(e, t) {
                e.__proto__ = t;
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            };
            return function(t, n) {
                function r() {
                    this.constructor = t;
                }
                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
                new r());
            };
        }(), f = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return d(t, e), t;
        }(s.a), p = {}, h = !0;
    }, function(e, t, n) {
        e.exports = n(66).default, e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "ui", function() {
            return s;
        }), n.d(t, "console", function() {
            return u;
        }), n.d(t, "utils", function() {
            return l;
        });
        var r = n(33), i = n(78), o = n(29), a = n(19), c = n(30);
        t.default = r;
        var s = r, u = {
            tree: i
        }, l = {
            entityTree: o,
            webpack: a,
            yoyo: c
        };
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return "tvsFlowTools::" + e;
        }
        function i(e) {
            function t(e, t) {
                var n = e.getMeta(), i = localStorage.getItem(r(t));
                if (e.setMeta(_({}, m.a, {
                    name: t
                })), i) {
                    var o = JSON.parse(i);
                    e.setMeta(o);
                }
                e.setMeta(n), requestAnimationFrame(function() {
                    l.set(u.action.getId(), {
                        type: g.a.SET_RUNTIME,
                        payload: {
                            label: t,
                            runtime: e
                        }
                    });
                });
            }
            function n() {
                document.body.removeChild(w), T.destroy();
            }
            var i = _({
                debug: !1,
                graph: null
            }, e), l = o.a.create();
            l.addGraph(Object(a.getGraphFromModules)(O)), l.flush();
            var f = Object(s.flowComponentFactory)(l, u.action.getId(), i.debug), h = Object(c.a)(f), w = document.createElement("div");
            w.className = "tvs-flow-tools-container", document.body.appendChild(w), p.a.render(v()(h), w), 
            l.set(u.element.getId(), w);
            var T = new d.a(".tvs-save-graph", {
                text: function() {
                    return JSON.stringify(l.get(y.meta.getId()), null, "  ");
                }
            });
            return T.on("success", function(e) {
                return console.log("saved graph to clipboard", e);
            }), T.on("error", function(e) {
                return console.log("error while saving graph to clipboard", e);
            }), l.on(y.meta.getId(), b(function(e) {
                var t = l.get(y.selectedRuntimeId.getId());
                t && localStorage.setItem(r(t), JSON.stringify(e));
            }, 300)), {
                setFlow: t,
                dispose: n,
                getState: function() {
                    return l;
                },
                getElement: function() {
                    return w;
                }
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.start = i;
        var o = n(34), a = n(19), c = n(38), s = n(30), u = n(7), l = n(67), d = n.n(l), f = n(16), p = n.n(f), h = n(31), v = n.n(h), g = n(1), y = n(4), m = n(27), b = n(75), _ = (n.n(b), 
        this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }), O = n(77);
    }, function(e, t, n) {
        "use strict";
        var r = n(35);
        n(0), n(18), n(9);
        t.a = r;
        r.create;
    }, function(e, t, n) {
        "use strict";
        function r() {
            function e() {
                return {
                    entities: M,
                    processes: A,
                    arcs: P,
                    meta: R
                };
            }
            function t() {
                var e = {};
                for (var t in H.es) e[t] = H.es[t].val;
                return e;
            }
            function n() {
                return L;
            }
            function r(e) {
                L = e;
            }
            function c() {
                return R;
            }
            function s(e) {
                return null == e || "object" != typeof e || Array.isArray(e) || (R = Object(o.a)(R, e)), 
                R;
            }
            function u(e) {
                D = e;
            }
            function l(e) {
                return H.es[e] && H.es[e].val;
            }
            function d(e, t) {
                E(I(e), t, !0) && k();
            }
            function f(e, t) {
                d(e, t(l(e)));
            }
            function p(e, t) {
                I(e).cb.push(t);
            }
            function h(e, t) {
                var n = I(e);
                n.cb = t ? n.cb.filter(function(e) {
                    return e !== t;
                }) : [];
            }
            function v(e) {
                var t = Object(i.createEntity)(e);
                M[t.id] = t;
                var n = I(t.id);
                return void 0 === t.value || !t.reset && void 0 !== n.val || (n.val = t.value, W[t.id] = !1, 
                z = !0), n.accept = t.accept, t.meta && s({
                    entities: (r = {}, r[t.id] = t.meta, r)
                }), t;
                var r;
            }
            function g(e) {
                var t = I(e);
                for (var n in t.arcs) _(n);
                var r = M[e];
                r && r.meta && s({
                    entities: (i = {}, i[r.id] = void 0, i)
                }), delete H.es[e], delete M[e];
                var i;
            }
            function y(e) {
                var t = Object(i.createProcess)(e, L), n = t.ports, r = N(t.id);
                A[t.id] = t, delete r.acc, r.values = [], r.sources = [], r.async = t.async, r.delta = t.delta, 
                Object.keys(r.arcs).forEach(function(e) {
                    var t = P[e].port;
                    null == t || n[t] && n[t] !== i.PORT_TYPES.ACCUMULATOR || _(e);
                }), n.forEach(function(e, t) {
                    e === i.PORT_TYPES.ACCUMULATOR && (r.acc = t);
                });
                for (var o in r.arcs) O(P[o]);
                return t.meta && s({
                    processes: (a = {}, a[t.id] = t.meta, a)
                }), t;
                var a;
            }
            function m(e) {
                var t = N(e);
                t.stop && (t.stop(), delete t.stop);
                for (var n in t.arcs) _(n);
                delete H.ps[e];
                var r = A[e];
                r && r.meta && s({
                    processes: (i = {}, i[r.id] = void 0, i)
                }), delete A[e];
                var i;
            }
            function b(e) {
                var t = Object(i.createArc)(e);
                P[t.id] = t, O(t);
                var n = N(t.process), r = A[t.process];
                return r && !0 === r.autostart && Object.keys(n.arcs).length === Object.keys(r.ports).length + 1 && x(n), 
                t.meta && s({
                    arcs: (o = {}, o[t.id] = t.meta, o)
                }), t;
                var o;
            }
            function _(e) {
                var t = P[e];
                if (t) {
                    var n = N(t.process), r = I(t.entity);
                    delete n.arcs[e], delete r.arcs[e], null != t.port ? (delete r.effects[t.process], 
                    delete n.sources[t.port], delete n.values[t.port]) : (n.stop && (n.stop(), delete n.stop), 
                    n.sink = function() {}, delete n.out, delete r.reactions[t.process]), t.meta && s({
                        arcs: (i = {}, i[t.id] = void 0, i)
                    });
                }
                delete P[e];
                var i;
            }
            function O(e) {
                var t = e.process, n = e.entity, r = N(t), o = I(n), a = A[t];
                o.arcs[e.id] = !0, a && (r.arcs[e.id] = !0, null != e.port ? (delete o.effects[t], 
                a.ports && null != a.ports[e.port] && (r.sources[e.port] = o, a.ports[e.port] === i.PORT_TYPES.HOT && (o.effects[t] = r))) : (r.out = o, 
                null != r.acc ? (r.sources[r.acc] = o, o.reactions[t] = r) : delete o.reactions[t], 
                r.sink = function(e) {
                    E(o, e, !0) && !V && k();
                }));
            }
            function w(e) {
                if (e.entities) for (var t in e.entities) v(e.entities[t]);
                if (e.processes) for (var t in e.processes) y(e.processes[t]);
                if (e.arcs) for (var t in e.arcs) b(e.arcs[t]);
                s(e.meta);
            }
            function T(e) {
                var t = {}, n = {};
                if (e.entities) for (var r in e.entities) {
                    var i = e.entities[r];
                    i.id && (t[i.id] = !0);
                }
                if (e.processes) for (var r in e.processes) {
                    var o = e.processes[r];
                    o.id && (n[o.id] = !0);
                }
                Object.keys(M).filter(function(e) {
                    return !t[e];
                }).forEach(g), Object.keys(A).filter(function(e) {
                    return !n[e];
                }).forEach(m), w(e);
            }
            function k() {
                D && console.log("flushing graph recursively with", W);
                for (var e = Object.keys(W), t = 0, n = e; t < n.length; t++) {
                    var r = n[t];
                    if (W[r]) {
                        var i = H.es[r];
                        for (var o in i.reactions) S(i.reactions[o]);
                    }
                }
                var a = {};
                W = {}, z = !1, V = !0;
                for (var c = 0, s = e; c < s.length; c++) {
                    var r = s[c], i = H.es[r];
                    i.cb.length > 0 && (U[r] = i);
                    for (var o in i.effects) a[o] || (S(i.effects[o]), a[o] = !0);
                }
                if (V = !1, z) k(); else {
                    var u = Object.keys(U);
                    U = {};
                    for (var l in u) for (var i = H.es[u[l]], d = 0, f = i.cb; d < f.length; d++) {
                        var p = f[d];
                        p(i.val);
                    }
                    D && console.log("flush finished");
                }
            }
            function S(e) {
                for (var t = !0, n = 0; n < e.sources.length; n++) {
                    var r = e.sources[n];
                    if (void 0 === r.val) {
                        t = !1;
                        break;
                    }
                    if (e.values[n] = r.val, e.delta) {
                        if (void 0 === r.oldVal) {
                            t = !1;
                            break;
                        }
                        e.values[n + 1] = r.oldVal;
                    }
                }
                if (t) if (D && console.log("running process", e.id), e.async) e.stop && e.stop(), 
                e.stop = A[e.id].procedure.apply(L, [ e.sink ].concat(e.values)); else {
                    var i = A[e.id].procedure.apply(L, e.values);
                    e.out && E(e.out, i, null == e.acc);
                }
            }
            function E(e, t, n) {
                return !(e.accept && !e.accept(t, e.val)) && (e.oldVal = e.val, e.val = t, void 0 !== t && (W[e.id] = n, 
                z = !0), !0);
            }
            function x(e) {
                e.async ? requestAnimationFrame(function() {
                    S(e);
                }) : (S(e), e.out && (W[e.out.id] = !1));
            }
            function j(e) {
                var t = N(e);
                S(t), t.async || k();
            }
            function C(e) {
                var t = N(e);
                t.stop && (t.stop(), delete t.stop);
            }
            function I(e) {
                return M[e] || v({
                    id: e
                }), H.es[e] || (H.es[e] = {
                    id: e,
                    val: void 0,
                    reactions: {},
                    effects: {},
                    arcs: {},
                    cb: []
                });
            }
            function N(e) {
                return H.ps[e] || (H.ps[e] = {
                    id: e,
                    arcs: {},
                    sink: function() {}
                });
            }
            var M = {}, A = {}, P = {}, H = {
                es: {},
                ps: {}
            }, R = {}, L = null, D = !1, U = {}, W = {}, V = !1, z = !1;
            return {
                addEntity: v,
                removeEntity: g,
                addProcess: y,
                removeProcess: m,
                addArc: b,
                removeArc: _,
                addGraph: w,
                replaceGraph: T,
                getGraph: e,
                getState: t,
                setMeta: s,
                getMeta: c,
                getContext: n,
                setContext: r,
                setDebug: u,
                get: l,
                set: d,
                update: f,
                on: p,
                off: h,
                start: j,
                stop: C,
                flush: k,
                PORT_TYPES: a({}, i.PORT_TYPES)
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.create = r;
        var i = n(9), o = n(37), a = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function evaluate(code, context) {
            var prefix = "(function(){ return ", postfix = "})", factory = eval(prefix + code + postfix);
            return factory.call(context);
        }
        __webpack_exports__.a = evaluate;
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            if ("object" == typeof e && "object" == typeof t && !Array.isArray(e) && !Array.isArray(t)) {
                var n = i({}, e);
                for (var o in t) {
                    var a = e[o], c = t[o];
                    void 0 !== c ? n[o] = r(a, c) : delete n[o];
                }
                return n;
            }
            return t;
        }
        t.a = r;
        var i = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        };
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return [ "h1", e ];
        }
        function i(e, t) {
            return function() {
                return t(_.b.MAIN.SET_ACTIVE_WINDOW, e);
            };
        }
        function o(e, t, n) {
            var o = e.visibility, a = e.position, c = function(e) {
                return function() {
                    return t(_.b.MAIN.UPDATE_VISIBILITY, e);
                };
            };
            return [ "header", {
                class: Object(d.a)("tvs-flow-controls", v.a),
                onmousedown: i("controls", t),
                style: x({}, a)
            }, n(r, E.selectedRuntimeId), [ "nav", {
                class: "tvs-controls-btns"
            }, [ "ul", [ "li", Object(h.a)({
                class: o.tree && j,
                onclick: c("tree"),
                icon: f.e(),
                title: "toggle entity tree"
            }) ], [ "li", Object(h.a)({
                class: o.graph && j,
                onclick: c("graph"),
                icon: f.d(),
                title: "toggle flow graph"
            }) ], [ "li", Object(h.a)({
                class: o.entity && j,
                onclick: c("entity"),
                icon: f.c(),
                title: "toggle entity details"
            }) ] ] ] ];
        }
        function a(e, t, n) {
            var r = e.dimensions, o = e.window;
            return [ "article", {
                class: Object(d.a)("tvs-flow-tree", v.e),
                style: x({}, r),
                onmousedown: i("tree", t)
            }, [ "header", f.e("tree" === o ? "selected" : ""), " Tree ", [ "span", {
                class: "gap"
            } ], " ", Object(h.a)({
                icon: f.a(),
                class: b.b,
                title: "close window",
                onclick: function() {
                    return t(_.b.MAIN.CLOSE_WINDOW, "tree");
                }
            }) ], [ "section", {
                class: v.d
            }, n(m.a, S.treeData) ], [ "footer", {
                class: "resize"
            } ] ];
        }
        function c(e, t, n) {
            function r(e) {
                if (e && e.querySelector) {
                    var n = e.querySelector("section");
                    requestAnimationFrame(function() {
                        t(_.b.GRAPH.UPDATE_SIZE, {
                            width: n.clientWidth,
                            height: n.clientHeight
                        });
                    });
                }
            }
            var o = e.dimensions, a = e.window, c = n(g.a, T.viewData);
            return [ "article", {
                ref: r,
                class: Object(d.a)("tvs-flow-graph", v.e),
                style: x({}, o),
                onmousedown: i("graph", t)
            }, [ "header", f.d("graph" === a ? "selected" : ""), " Graph ", [ "span", {
                class: "gap"
            } ], n(g.b, T.viewBox), " ", Object(h.a)({
                icon: f.b(),
                class: Object(d.a)(b.b, "tvs-save-graph"),
                title: "copy the current graph state to clipboard"
            }), Object(h.a)({
                icon: f.a(),
                class: b.b,
                title: "close window",
                onclick: function() {
                    return t(_.b.MAIN.CLOSE_WINDOW, "graph");
                }
            }) ], c, [ "footer", {
                class: "resize"
            } ] ];
        }
        function s(e, t, n) {
            var r = e.dimensions, o = e.node, a = e.window, c = o && o.procedure ? Object(y.b)(o, t) : n(y.a, k.entityViewProps);
            return [ "article", {
                class: Object(d.a)("tvs-flow-entity", v.e),
                style: x({}, r),
                onmousedown: i("entity", t)
            }, [ "header", f.c("entity" === a ? "selected" : ""), " ", o && o.id, " ", [ "span", {
                class: "gap"
            }, " " ], " ", Object(h.a)({
                icon: f.a(),
                class: b.b,
                title: "close window",
                onclick: function() {
                    return t(_.b.MAIN.CLOSE_WINDOW, "entity");
                }
            }) ], c, [ "footer", {
                class: "resize"
            } ] ];
        }
        function u(e, t, n) {
            var r = e.tree ? n(a, w.treeWindowProps) : "", i = e.graph ? n(c, w.graphWindowProps) : "", u = e.entity ? n(s, w.entityWindowProps) : "";
            return [ "article", {
                class: Object(d.a)("tvs-flow-tools", p.f)
            }, n(o, w.controlProps), i, u, r ];
        }
        function l(e) {
            return e(u, O.visibility);
        }
        t.a = l;
        var d = n(20), f = n(13), p = n(5), h = n(14), v = n(15), g = n(57), y = n(59), m = n(60), b = n(11), _ = n(1), O = n(6), w = n(25), T = n(26), k = n(8), S = n(28), E = n(4), x = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, j = Object(d.b)({
            color: p.e
        });
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return c;
        });
        var r = n(40), i = n(21), o = n(10), a = (n.n(o), function() {
            return o.create(void 0, !0);
        }), c = function() {
            function e(e) {
                var t = e.autoGenerateTag, n = this;
                this.cssRaw = function(e) {
                    e && (n._raw += e || "", n._pendingRawChange = !0, n._styleUpdated());
                }, this.cssRule = function(e) {
                    for (var t = [], o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
                    var a = Object(r.a)(i.b.apply(void 0, t)).result;
                    n._freeStyle.registerRule(e, a), n._styleUpdated();
                }, this.forceRenderStyles = function() {
                    var e = n._getTag();
                    e && (e.textContent = n.getStyles());
                }, this.fontFace = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    for (var r = n._freeStyle, i = 0, o = e; i < o.length; i++) {
                        var a = o[i];
                        r.registerRule("@font-face", a);
                    }
                    n._styleUpdated();
                }, this.getStyles = function() {
                    return (n._raw || "") + n._freeStyle.getStyles();
                }, this.keyframes = function(e) {
                    var t = Object(r.b)(e), i = t.keyframes, o = t.$debugName, a = n._freeStyle.registerKeyframes(i, o);
                    return n._styleUpdated(), a;
                }, this.reinit = function() {
                    var e = a();
                    n._freeStyle = e, n._lastFreeStyleChangeId = e.changeId, n._raw = "", n._pendingRawChange = !1;
                    var t = n._getTag();
                    t && (t.textContent = "");
                }, this.setStylesTarget = function(e) {
                    n._tag && (n._tag.textContent = ""), n._tag = e, n.forceRenderStyles();
                }, this.style = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    var o = n._freeStyle, a = Object(r.a)(i.b.apply(void 0, e)), c = a.result, s = a.debugName, u = s ? o.registerStyle(c, s) : o.registerStyle(c);
                    return n._styleUpdated(), u;
                };
                var o = a();
                this._autoGenerateTag = t, this._freeStyle = o, this._lastFreeStyleChangeId = o.changeId, 
                this._pending = 0, this._pendingRawChange = !1, this._raw = "", this._tag = void 0;
            }
            return e.prototype._afterAllSync = function(e) {
                var t = this;
                this._pending++;
                var n = this._pending;
                Object(i.c)(function() {
                    n === t._pending && e();
                });
            }, e.prototype._getTag = function() {
                if (this._tag) return this._tag;
                if (this._autoGenerateTag) {
                    var e = "undefined" == typeof window ? {
                        textContent: ""
                    } : document.createElement("style");
                    return "undefined" != typeof document && document.head.appendChild(e), this._tag = e, 
                    e;
                }
            }, e.prototype._styleUpdated = function() {
                var e = this, t = this._freeStyle.changeId, n = this._lastFreeStyleChangeId;
                (this._pendingRawChange || t !== n) && (this._lastFreeStyleChangeId = t, this._pendingRawChange = !1, 
                this._afterAllSync(function() {
                    return e.forceRenderStyles();
                }));
            }, e;
        }();
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = {}, n = "";
            for (var i in e) {
                var a = e[i];
                if ("$unique" === i) t[o.IS_UNIQUE] = a; else if ("$nest" === i) {
                    var c = a;
                    for (var s in c) {
                        var u = c[s];
                        t[s] = r(u).result;
                    }
                } else "$debugName" === i ? n = a : t[i] = a;
            }
            return {
                result: t,
                debugName: n
            };
        }
        function i(e) {
            var t = {
                $debugName: void 0,
                keyframes: {}
            };
            for (var n in e) {
                var r = e[n];
                "$debugName" === n ? t.$debugName = r : t.keyframes[n] = r;
            }
            return t;
        }
        t.a = r, t.b = i;
        var o = n(10);
        n.n(o);
    }, function(e, t) {
        function n() {
            throw new Error("setTimeout has not been defined");
        }
        function r() {
            throw new Error("clearTimeout has not been defined");
        }
        function i(e) {
            if (l === setTimeout) return setTimeout(e, 0);
            if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0);
            try {
                return l(e, 0);
            } catch (t) {
                try {
                    return l.call(null, e, 0);
                } catch (t) {
                    return l.call(this, e, 0);
                }
            }
        }
        function o(e) {
            if (d === clearTimeout) return clearTimeout(e);
            if ((d === r || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
            try {
                return d(e);
            } catch (t) {
                try {
                    return d.call(null, e);
                } catch (t) {
                    return d.call(this, e);
                }
            }
        }
        function a() {
            v && p && (v = !1, p.length ? h = p.concat(h) : g = -1, h.length && c());
        }
        function c() {
            if (!v) {
                var e = i(a);
                v = !0;
                for (var t = h.length; t; ) {
                    for (p = h, h = []; ++g < t; ) p && p[g].run();
                    g = -1, t = h.length;
                }
                p = null, v = !1, o(e);
            }
        }
        function s(e, t) {
            this.fun = e, this.array = t;
        }
        function u() {}
        var l, d, f = e.exports = {};
        !function() {
            try {
                l = "function" == typeof setTimeout ? setTimeout : n;
            } catch (e) {
                l = n;
            }
            try {
                d = "function" == typeof clearTimeout ? clearTimeout : r;
            } catch (e) {
                d = r;
            }
        }();
        var p, h = [], v = !1, g = -1;
        f.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            h.push(new s(e, t)), 1 !== h.length || v || i(c);
        }, s.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", 
        f.versions = {}, f.on = u, f.addListener = u, f.once = u, f.off = u, f.removeListener = u, 
        f.removeAllListeners = u, f.emit = u, f.prependListener = u, f.prependOnceListener = u, 
        f.listeners = function(e) {
            return [];
        }, f.binding = function(e) {
            throw new Error("process.binding is not supported");
        }, f.cwd = function() {
            return "/";
        }, f.chdir = function(e) {
            throw new Error("process.chdir is not supported");
        }, f.umask = function() {
            return 0;
        };
    }, function(e, t) {}, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(44), i = n(22), o = n(10), a = function() {
            return o.create(void 0, !0);
        }, c = function() {
            function e(e) {
                var t = e.autoGenerateTag, n = this;
                this.cssRaw = function(e) {
                    e && (n._raw += e || "", n._pendingRawChange = !0, n._styleUpdated());
                }, this.cssRule = function(e) {
                    for (var t = [], o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
                    var a = r.ensureStringObj(i.extend.apply(void 0, t)).result;
                    n._freeStyle.registerRule(e, a), n._styleUpdated();
                }, this.forceRenderStyles = function() {
                    var e = n._getTag();
                    e && (e.textContent = n.getStyles());
                }, this.fontFace = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    for (var r = n._freeStyle, i = 0, o = e; i < o.length; i++) {
                        var a = o[i];
                        r.registerRule("@font-face", a);
                    }
                    n._styleUpdated();
                }, this.getStyles = function() {
                    return (n._raw || "") + n._freeStyle.getStyles();
                }, this.keyframes = function(e) {
                    var t = r.explodeKeyframes(e), i = t.keyframes, o = t.$debugName, a = n._freeStyle.registerKeyframes(i, o);
                    return n._styleUpdated(), a;
                }, this.reinit = function() {
                    var e = a();
                    n._freeStyle = e, n._lastFreeStyleChangeId = e.changeId, n._raw = "", n._pendingRawChange = !1;
                    var t = n._getTag();
                    t && (t.textContent = "");
                }, this.setStylesTarget = function(e) {
                    n._tag && (n._tag.textContent = ""), n._tag = e, n.forceRenderStyles();
                }, this.style = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    var o = n._freeStyle, a = r.ensureStringObj(i.extend.apply(void 0, e)), c = a.result, s = a.debugName, u = s ? o.registerStyle(c, s) : o.registerStyle(c);
                    return n._styleUpdated(), u;
                };
                var o = a();
                this._autoGenerateTag = t, this._freeStyle = o, this._lastFreeStyleChangeId = o.changeId, 
                this._pending = 0, this._pendingRawChange = !1, this._raw = "", this._tag = void 0;
            }
            return e.prototype._afterAllSync = function(e) {
                var t = this;
                this._pending++;
                var n = this._pending;
                i.raf(function() {
                    n === t._pending && e();
                });
            }, e.prototype._getTag = function() {
                if (this._tag) return this._tag;
                if (this._autoGenerateTag) {
                    var e = "undefined" == typeof window ? {
                        textContent: ""
                    } : document.createElement("style");
                    return "undefined" != typeof document && document.head.appendChild(e), this._tag = e, 
                    e;
                }
            }, e.prototype._styleUpdated = function() {
                var e = this, t = this._freeStyle.changeId, n = this._lastFreeStyleChangeId;
                (this._pendingRawChange || t !== n) && (this._lastFreeStyleChangeId = t, this._pendingRawChange = !1, 
                this._afterAllSync(function() {
                    return e.forceRenderStyles();
                }));
            }, e;
        }();
        t.TypeStyle = c;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = {}, n = "";
            for (var i in e) {
                var a = e[i];
                if ("$unique" === i) t[o.IS_UNIQUE] = a; else if ("$nest" === i) {
                    var c = a;
                    for (var s in c) {
                        var u = c[s];
                        t[s] = r(u).result;
                    }
                } else "$debugName" === i ? n = a : t[i] = a;
            }
            return {
                result: t,
                debugName: n
            };
        }
        function i(e) {
            var t = {
                $debugName: void 0,
                keyframes: {}
            };
            for (var n in e) {
                var r = e[n];
                "$debugName" === n ? t.$debugName = r : t.keyframes[n] = r;
            }
            return t;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(10);
        t.ensureStringObj = r, t.explodeKeyframes = i;
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(47);
        n.d(t, "a", function() {
            return r.a;
        });
    }, function(e, t, n) {
        "use strict";
        var r = (n(48), n(52), n(53));
        n.d(t, "a", function() {
            return r.a;
        });
        n(54), n(23), n(55), n(56), n(24);
    }, function(e, t, n) {
        "use strict";
        n(3);
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return r;
        }), n.d(t, "b", function() {
            return i;
        });
        var r = function(e, t) {
            return Array.prototype.filter.call(e, t);
        }, i = function(e, t) {
            return Array.prototype.map.call(e, t);
        };
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return "number" == typeof e ? e : .01 * parseFloat(e);
        }
        function i(e) {
            return o(100 * e) + "%";
        }
        function o(e) {
            return l.exec(e.toString())[1];
        }
        function a(e) {
            if (null !== e && void 0 !== e) {
                var t = +e;
                return t === t ? e + "px" : e;
            }
        }
        function c(e) {
            var t = u.exec(e);
            if (t && t.length) return [ t[1] ].concat(t[2].split(","));
        }
        function s(e, t) {
            return e + "(" + Array.prototype.join.call(t, ",") + ")";
        }
        n.d(t, "f", function() {
            return d;
        }), t.c = r, t.e = i, t.d = o, t.b = a, t.g = c, t.a = s;
        var u = /[\s]*([a-z-]+)[\s]*\([\s]*([^\)]+)[\s]*\)[\s]*/i, l = /^(\-?\d+\.?\d{0,5})/, d = function(e) {
            return function(t) {
                return t + e;
            };
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            return Math.round(e * t) / t;
        }
        t.a = r;
    }, function(e, t, n) {
        "use strict";
        var r = (n(3), n(23));
        r.a, r.a, r.a;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return h(e) || v(e) || g(e) || h("red");
        }
        function i(e, t, n) {
            return new S(O, e, t, n, 1, !1);
        }
        function o(e, t, n, r) {
            return new S(O, e, t, n, Object(b.c)(r), !0);
        }
        function a(e) {
            var t = Math.round(e);
            return (t < 16 ? "0" : "") + t.toString(16);
        }
        function c(e) {
            return ((e < 0 ? 360 : 0) + e % 360) % 360;
        }
        function s(e, t, n, r, i) {
            var o, a = e / 255, c = t / 255, s = n / 255, u = Math.min(a, c, s), l = Math.max(a, c, s), d = (u + l) / 2, f = l - u;
            o = l === u ? 0 : a === l ? (c - s) / f : c === l ? 2 + (s - a) / f : s === l ? 4 + (a - c) / f : 0, 
            (o = Math.min(60 * o, 360)) < 0 && (o += 360);
            var p;
            return p = l === u ? 0 : d <= .5 ? f / (l + u) : f / (2 - l - u), new S(w, o, p, d, r, i);
        }
        function u(e, t, n, r, i) {
            var o = e / 360, a = t, c = n;
            if (0 === a) {
                var s = 255 * c;
                return new S(O, s, s, s, r, i);
            }
            for (var u = c < .5 ? c * (1 + a) : c + a - c * a, l = 2 * c - u, d = 0, f = 0, p = 0, h = 0; h < 3; h++) {
                var v = o + 1 / 3 * -(h - 1);
                v < 0 && v++, v > 1 && v--;
                var s = void 0;
                s = 6 * v < 1 ? l + 6 * (u - l) * v : 2 * v < 1 ? u : 3 * v < 2 ? l + (u - l) * (2 / 3 - v) * 6 : l, 
                s *= 255, 0 === h ? d = s : 1 === h ? f = s : p = s;
            }
            return new S(O, d, f, p, r, i);
        }
        function l(e, t, n, r, i, o, a) {
            return e === t ? new S(e, n, r, i, o, a) : T[e - t](n, r, i, o, a);
        }
        function d(e, t, n, r) {
            if (!_) return [ e || 0, t || 0, n || 0, r || 0 ];
            var i = new Float32Array(4);
            return i[0] = e || 0, i[1] = t || 0, i[2] = n || 0, i[3] = r || 0, i;
        }
        function f(e, t, n) {
            var r = k[e][t];
            return n < 0 ? 0 : n > r ? r : n;
        }
        function p(e) {
            return e instanceof S ? e : r(e);
        }
        function h(e) {
            return E[e] || void 0;
        }
        function v(e) {
            var t = e.match(/#(([a-f0-9]{6})|([a-f0-9]{3}))$/i);
            if (t) {
                var n = t[1], r = parseInt(3 === n.length ? n[0] + n[0] + n[1] + n[1] + n[2] + n[2] : n, 16);
                return new S(O, r >> 16 & 255, r >> 8 & 255, 255 & r, 1, !1);
            }
        }
        function g(e) {
            var t = Object(b.i)(e);
            if (t && (4 === t.length || 5 === t.length)) {
                var n, r = t[0], i = "rgba" === r, o = "hsla" === r, a = "rgb" === r, c = "hsl" === r, s = o || i;
                if (a || i) n = O; else {
                    if (!c && !o) throw new Error("unsupported color string");
                    n = w;
                }
                var u = parseFloat(t[1]), l = a || i ? parseFloat(t[2]) : Object(b.c)(t[2]), d = a || i ? parseFloat(t[3]) : Object(b.c)(t[3]), f = s ? parseFloat(t[4]) : 1;
                return new S(n, u, l, d, f, s);
            }
        }
        t.a = o;
        var y, m, b = n(3), _ = "undefined" != typeof Float32Array, O = 0, w = 1, T = (y = {}, 
        y[O - w] = s, y[w - O] = u, y), k = (m = {}, m[O] = d(255, 255, 255, 1), m[w] = d(360, 1, 1, 1), 
        m), S = function() {
            function e(e, t, n, r, i, o) {
                this._format = e, this._hasAlpha = o, this._values = d(f(e, 0, t), f(e, 1, n), f(e, 2, r), f(e, 3, i));
            }
            return e.convertHelper = function(e, t) {
                var n = t._format, r = t._values, i = t._hasAlpha;
                return n === e ? t : T[n - e](r[0], r[1], r[2], r[3], i);
            }, e.prototype.toString = function() {
                var e, t, n = this._format, r = this._values, i = this._hasAlpha;
                if (n === O) e = i ? "rgba" : "rgb", t = [ Math.round(r[0]), Math.round(r[1]), Math.round(r[2]) ]; else {
                    if (n !== w) throw new Error("Invalid color format");
                    e = i ? "hsla" : "hsl", t = [ Math.round(r[0]), Object(b.f)(Object(b.j)(r[1], 100)), Object(b.f)(Object(b.j)(r[2], 100)) ];
                }
                return i && t.push(Object(b.e)(Object(b.j)(r[3], 1e5))), Object(b.a)(e, t);
            }, e.prototype.toHexString = function() {
                var t = e.convertHelper(O, this)._values;
                return "#" + (a(t[0]) + a(t[1]) + a(t[2])).toUpperCase();
            }, e.prototype.toHSL = function() {
                var e = this._values;
                return l(this._format, w, e[0], e[1], e[2], 1, !1);
            }, e.prototype.toHSLA = function() {
                var e = this._values;
                return l(this._format, w, e[0], e[1], e[2], e[3], !0);
            }, e.prototype.toRGB = function() {
                var e = this._values;
                return l(this._format, O, e[0], e[1], e[2], 1, !1);
            }, e.prototype.toRGBA = function() {
                var e = this._values;
                return l(this._format, O, e[0], e[1], e[2], e[3], !0);
            }, e.prototype.red = function() {
                return (this._format === O ? this : this.toRGB())._values[0];
            }, e.prototype.green = function() {
                return (this._format === O ? this : this.toRGB())._values[1];
            }, e.prototype.blue = function() {
                return (this._format === O ? this : this.toRGB())._values[2];
            }, e.prototype.hue = function() {
                return (this._format === w ? this : this.toHSL())._values[0];
            }, e.prototype.saturation = function() {
                return (this._format === w ? this : this.toHSL())._values[1];
            }, e.prototype.lightness = function() {
                return (this._format === w ? this : this.toHSL())._values[2];
            }, e.prototype.alpha = function() {
                return this._values[3];
            }, e.prototype.opacity = function() {
                return this.alpha();
            }, e.prototype.invert = function() {
                var t = e.convertHelper(O, this)._values;
                return e.convertHelper(this._format, new e(O, 255 - t[0], 255 - t[1], 255 - t[2], this._values[3], this._hasAlpha));
            }, e.prototype.lighten = function(t, n) {
                var r = e.convertHelper(w, this)._values, i = k[w][2], o = r[2] + (n ? i - r[2] : i) * Object(b.c)(t);
                return e.convertHelper(this._format, new e(w, r[0], r[1], o, this._values[3], this._hasAlpha));
            }, e.prototype.darken = function(t, n) {
                var r = e.convertHelper(w, this)._values, i = r[2] - (n ? r[2] : k[w][2]) * Object(b.c)(t);
                return e.convertHelper(this._format, new e(w, r[0], r[1], i, this._values[3], this._hasAlpha));
            }, e.prototype.saturate = function(t, n) {
                var r = e.convertHelper(w, this)._values, i = k[w][1], o = r[1] + (n ? i - r[1] : i) * Object(b.c)(t);
                return e.convertHelper(this._format, new e(w, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.desaturate = function(t, n) {
                var r = e.convertHelper(w, this)._values, i = k[w][1], o = r[1] - (n ? r[1] : i) * Object(b.c)(t);
                return e.convertHelper(this._format, new e(w, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.grayscale = function() {
                return this.desaturate(1);
            }, e.prototype.fade = function(t) {
                var n = this._values, r = f(O, 3, Object(b.c)(t));
                return e.convertHelper(this._format, new e(this._format, n[0], n[1], n[2], r, !0));
            }, e.prototype.fadeOut = function(t, n) {
                var r = this._values, i = f(O, 3, r[3] - (n ? r[3] : 1) * Object(b.c)(t));
                return e.convertHelper(this._format, new e(this._format, r[0], r[1], r[2], i, !0));
            }, e.prototype.fadeIn = function(t, n) {
                var r = this._values, i = f(O, 3, r[3] + (n ? r[3] : 1) * Object(b.c)(t));
                return e.convertHelper(this._format, new e(this._format, r[0], r[1], r[2], i, !0));
            }, e.prototype.mix = function(t, n) {
                var r = this, i = p(t), o = e.convertHelper(O, r)._values, a = e.convertHelper(O, i)._values, c = void 0 === n ? .5 : n, s = 2 * c - 1, u = Math.abs(o[3] - a[3]), l = ((s * u == -1 ? s : (s + u) / (1 + s * u)) + 1) / 2, d = 1 - l, f = new e(O, Math.round(o[0] * l + a[0] * d), Math.round(o[1] * l + a[1] * d), Math.round(o[2] * l + a[2] * d), o[3] * c + a[3] * (1 - c), r._hasAlpha || i._hasAlpha);
                return e.convertHelper(this._format, f);
            }, e.prototype.tint = function(e) {
                return j.mix(this, e);
            }, e.prototype.shade = function(e) {
                return x.mix(this, e);
            }, e.prototype.spin = function(t) {
                var n = e.convertHelper(w, this)._values;
                return e.convertHelper(this._format, new e(w, c(n[0] + t), n[1], n[2], this._values[3], this._hasAlpha));
            }, e;
        }(), E = {
            aliceblue: i(240, 248, 245),
            antiquewhite: i(250, 235, 215),
            aqua: i(0, 255, 255),
            aquamarine: i(127, 255, 212),
            azure: i(240, 255, 255),
            beige: i(245, 245, 220),
            bisque: i(255, 228, 196),
            black: i(0, 0, 0),
            blanchedalmond: i(255, 235, 205),
            blue: i(0, 0, 255),
            blueviolet: i(138, 43, 226),
            brown: i(165, 42, 42),
            burlywood: i(222, 184, 35),
            cadetblue: i(95, 158, 160),
            chartreuse: i(127, 255, 0),
            chocolate: i(210, 105, 30),
            coral: i(255, 127, 80),
            cornflowerblue: i(100, 149, 237),
            cornsilk: i(255, 248, 220),
            crimson: i(220, 20, 60),
            cyan: i(0, 255, 255),
            darkblue: i(0, 0, 139),
            darkcyan: i(0, 139, 139),
            darkgoldenrod: i(184, 134, 11),
            darkgray: i(169, 169, 169),
            darkgreen: i(0, 100, 0),
            darkgrey: i(169, 169, 169),
            darkkhaki: i(189, 183, 107),
            darkmagenta: i(139, 0, 139),
            darkolivegreen: i(85, 107, 47),
            darkorange: i(255, 140, 0),
            darkorchid: i(153, 50, 204),
            darkred: i(139, 0, 0),
            darksalmon: i(233, 150, 122),
            darkseagreen: i(143, 188, 143),
            darkslateblue: i(72, 61, 139),
            darkslategray: i(47, 79, 79),
            darkslategrey: i(47, 79, 79),
            darkturquoise: i(0, 206, 209),
            darkviolet: i(148, 0, 211),
            deeppink: i(255, 20, 147),
            deepskyblue: i(0, 191, 255),
            dimgray: i(105, 105, 105),
            dimgrey: i(105, 105, 105),
            dodgerblue: i(30, 144, 255),
            firebrick: i(178, 34, 34),
            floralwhite: i(255, 250, 240),
            forestgreen: i(34, 139, 34),
            fuchsia: i(255, 0, 255),
            gainsboro: i(220, 220, 220),
            ghostwhite: i(248, 248, 255),
            gold: i(255, 215, 0),
            goldenrod: i(218, 165, 32),
            gray: i(128, 128, 128),
            green: i(0, 128, 0),
            greenyellow: i(173, 255, 47),
            grey: i(128, 128, 128),
            honeydew: i(240, 255, 240),
            hotpink: i(255, 105, 180),
            indianred: i(205, 92, 92),
            indigo: i(75, 0, 130),
            ivory: i(255, 255, 240),
            khaki: i(240, 230, 140),
            lavender: i(230, 230, 250),
            lavenderblush: i(255, 240, 245),
            lawngreen: i(124, 252, 0),
            lemonchiffon: i(255, 250, 205),
            lightblue: i(173, 216, 230),
            lightcoral: i(240, 128, 128),
            lightcyan: i(224, 255, 255),
            lightgoldenrodyellow: i(250, 250, 210),
            lightgray: i(211, 211, 211),
            lightgreen: i(144, 238, 144),
            lightgrey: i(211, 211, 211),
            lightpink: i(255, 182, 193),
            lightsalmon: i(255, 160, 122),
            lightseagreen: i(32, 178, 170),
            lightskyblue: i(135, 206, 250),
            lightslategray: i(119, 136, 153),
            lightslategrey: i(119, 136, 153),
            lightsteelblue: i(176, 196, 222),
            lightyellow: i(255, 255, 224),
            lime: i(0, 255, 0),
            limegreen: i(50, 205, 50),
            linen: i(250, 240, 230),
            maroon: i(128, 0, 0),
            mediumaquamarine: i(102, 205, 170),
            mediumblue: i(0, 0, 205),
            mediumorchid: i(186, 85, 211),
            mediumpurple: i(147, 112, 219),
            mediumseagreen: i(60, 179, 113),
            mediumslateblue: i(123, 104, 238),
            mediumspringgreen: i(0, 250, 154),
            mediumturquoise: i(72, 209, 204),
            mediumvioletred: i(199, 21, 133),
            midnightblue: i(25, 25, 112),
            mintcream: i(245, 255, 250),
            mistyrose: i(255, 228, 225),
            moccasin: i(255, 228, 181),
            navajowhite: i(255, 222, 173),
            navy: i(0, 0, 128),
            oldlace: i(253, 245, 230),
            olive: i(128, 128, 0),
            olivedrab: i(107, 142, 35),
            orange: i(255, 165, 0),
            purple: i(128, 0, 128),
            rebeccapurple: i(102, 51, 153),
            red: i(255, 0, 0),
            silver: i(192, 192, 192),
            teal: i(0, 128, 128),
            transparent: o(0, 0, 0, 0),
            white: i(255, 255, 255),
            yellow: i(255, 255, 0)
        }, x = (E.aliceblue, E.antiquewhite, E.aqua, E.aquamarine, E.azure, E.beige, E.bisque, 
        E.black), j = (E.blanchedalmond, E.blue, E.blueviolet, E.brown, E.burlywood, E.cadetblue, 
        E.chartreuse, E.chocolate, E.coral, E.cornflowerblue, E.cornsilk, E.crimson, E.cyan, 
        E.darkblue, E.darkcyan, E.darkgoldenrod, E.darkgray, E.darkgreen, E.darkgrey, E.darkkhaki, 
        E.darkmagenta, E.darkolivegreen, E.darkorange, E.darkorchid, E.darkred, E.darksalmon, 
        E.darkseagreen, E.darkslateblue, E.darkslategray, E.darkslategrey, E.darkturquoise, 
        E.darkviolet, E.deeppink, E.deepskyblue, E.dimgray, E.dimgrey, E.dodgerblue, E.firebrick, 
        E.floralwhite, E.forestgreen, E.fuchsia, E.gainsboro, E.ghostwhite, E.gold, E.goldenrod, 
        E.gray, E.green, E.greenyellow, E.grey, E.honeydew, E.hotpink, E.indianred, E.indigo, 
        E.ivory, E.khaki, E.lavender, E.lavenderblush, E.lawngreen, E.lemonchiffon, E.lightblue, 
        E.lightcoral, E.lightcyan, E.lightgoldenrodyellow, E.lightgray, E.lightgreen, E.lightgrey, 
        E.lightpink, E.lightsalmon, E.lightseagreen, E.lightskyblue, E.lightslategray, E.lightslategrey, 
        E.lightsteelblue, E.lightyellow, E.lime, E.limegreen, E.linen, E.maroon, E.mediumaquamarine, 
        E.mediumblue, E.mediumorchid, E.mediumpurple, E.mediumseagreen, E.mediumslateblue, 
        E.mediumspringgreen, E.mediumturquoise, E.mediumvioletred, E.midnightblue, E.mintcream, 
        E.mistyrose, E.moccasin, E.navajowhite, E.navy, E.oldlace, E.olive, E.olivedrab, 
        E.orange, E.purple, E.rebeccapurple, E.red, E.silver, E.teal, E.transparent, E.white);
        E.yellow;
    }, function(e, t, n) {
        "use strict";
        n(3);
    }, function(e, t, n) {
        "use strict";
    }, function(e, t, n) {
        "use strict";
        n(3);
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            return [ "span", [ "input", {
                type: "range",
                value: e.scale,
                min: .5,
                max: 3,
                step: .2,
                onchange: function(e) {
                    return t(c.b.GRAPH.UPDATE_SCALE, e.target.value);
                },
                onmousemove: function(e) {
                    return e.stopPropagation();
                }
            } ] ];
        }
        function i(e, t) {
            if (!e) return [ "section", {
                class: o.a
            } ];
            var n = e.entities, r = e.processes, i = e.edges, s = e.viewBox, u = void 0 === s ? {} : s;
            return [ "section", {
                class: o.a
            }, [ "svg", {
                width: "100%",
                height: "100%",
                id: "graph-ui",
                viewBox: u.x + ", " + u.y + ", " + u.width + ", " + u.height
            } ].concat(i.map(function(e) {
                return [ "line", {
                    x1: e.from.x,
                    y1: e.from.y,
                    x2: e.to.x,
                    y2: e.to.y,
                    class: Object(a.classes)(e.class, e.active && "active")
                } ];
            }), r.map(function(e) {
                return [ "circle", {
                    class: Object(a.classes)(e.class, e.active && "active"),
                    transform: "translate(" + e.x + ", " + e.y + ")",
                    onmousedown: function() {
                        return t(c.b.ENTITY.SET_ACTIVE_PROCESS, e.id);
                    },
                    cx: 0,
                    cy: 0,
                    r: e.autostart ? 13 : 8,
                    title: e.id
                } ];
            }), n.map(function(e) {
                return [ "g", {
                    "data-eid": e.id,
                    transform: "translate(" + e.x + ", " + e.y + ")",
                    onmousedown: function() {
                        return t(c.b.ENTITY.SET_ACTIVE_ENTITY, e.id);
                    },
                    title: e.id,
                    class: Object(a.classes)(e.class, e.active && "active")
                }, [ "rect", {
                    x: -15,
                    y: -15,
                    width: 30,
                    height: 30,
                    class: e.accept ? "accept" : ""
                } ], [ "text", {
                    "text-anchor": "middle",
                    x: 0,
                    y: 30
                }, e.label ], e.initial && [ "circle", {
                    cx: 0,
                    cy: 0,
                    r: 6,
                    class: "initial"
                } ] ];
            })) ];
        }
        t.b = r, t.a = i;
        var o = n(58), a = n(2), c = (n.n(a), n(1));
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o;
        });
        var r = n(2), i = (n.n(r), n(5)), o = Object(r.style)(i.b, {
            position: "relative",
            flexGrow: 1,
            $nest: {
                "& svg": {
                    position: "absolute",
                    filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.6))"
                },
                "& text": {
                    fill: "white",
                    stroke: "black",
                    paintOrder: "stroke"
                },
                "& line": {
                    stroke: "darkgray",
                    $nest: {
                        "&.active": {
                            stroke: "#ff7"
                        },
                        "&.to": {
                            strokeWidth: 6
                        },
                        "&.to.async": {
                            strokeDasharray: "4, 5"
                        },
                        "&.to.acc": {
                            stroke: "black",
                            strokeWidth: 2
                        },
                        "&.from": {
                            strokeWidth: 2
                        },
                        "&.from.cold": {
                            strokeDasharray: "7, 10"
                        }
                    }
                },
                "& rect": {
                    $nest: {
                        "&.accept": {
                            strokeWidth: 3,
                            strokeDasharray: "3, 3"
                        }
                    }
                },
                "& .group-1 rect": {
                    fill: "orangered"
                },
                "& .group-1.active rect": {
                    fill: "lightsalmon",
                    stroke: "orangered",
                    strokeWidth: 5
                },
                "& circle.group-1": {
                    fill: "orangered"
                },
                "& circle.group-1.active": {
                    fill: "lightsalmon"
                },
                "& .group-1 .initial": {
                    fill: "darkred"
                },
                "& .group-1 .accept": {
                    stroke: "darkred"
                },
                "& .group-2 rect": {
                    fill: "limegreen"
                },
                "& .group-2.active rect": {
                    fill: "palegreen",
                    stroke: "limegreen",
                    strokeWidth: 5
                },
                "& circle.group-2": {
                    fill: "limegreen"
                },
                "& circle.group-2.active": {
                    fill: "palegreen"
                },
                "& .group-2 .initial": {
                    fill: "darkgreen"
                },
                "& .group-2 .accept": {
                    stroke: "darkgreen"
                },
                "& .group-3 rect": {
                    fill: "cornflowerblue"
                },
                "& .group-3.active rect": {
                    fill: "lightblue",
                    stroke: "cornflowerblue",
                    strokeWidth: 5
                },
                "& circle.group-3": {
                    fill: "cornflowerblue"
                },
                "& circle.group-3.active": {
                    fill: "lightblue"
                },
                "& .group-3 .initial": {
                    fill: "darkslateblue"
                },
                "& .group-3 .accept": {
                    stroke: "darkslateblue"
                },
                "& .group-4 rect": {
                    fill: "orchid"
                },
                "& .group-4.active rect": {
                    fill: "thistle",
                    stroke: "orchid",
                    strokeWidth: 5
                },
                "& circle.group-4": {
                    fill: "orchid"
                },
                "& circle.group-4.active": {
                    fill: "thistle"
                },
                "& .group-4 .initial": {
                    fill: "purple"
                },
                "& .group-4 .accept": {
                    stroke: "purple"
                },
                "& .group-5 rect": {
                    fill: "gold"
                },
                "& .group-5.active rect": {
                    fill: "palegoldenrod",
                    stroke: "gold",
                    strokeWidth: 5
                },
                "& circle.group-5": {
                    fill: "gold"
                },
                "& circle.group-5.active": {
                    fill: "beige"
                },
                "& .group-5 .initial": {
                    fill: "darkgoldenrod"
                },
                "& .group-5 .accept": {
                    stroke: "darkgoldenrod"
                },
                "& .group-6 rect": {
                    fill: "lightseagreen"
                },
                "& .group-6.active rect": {
                    fill: "paleturquoise",
                    stroke: "lightseagreen",
                    strokeWidth: 5
                },
                "& circle.group-6": {
                    fill: "lightseagreen"
                },
                "& circle.group-6.active": {
                    fill: "paleturquoise"
                },
                "& .group-6 .initial": {
                    fill: "darkslategray"
                },
                "& .group-6 .accept": {
                    stroke: "darkslategray"
                },
                "& .group-7 rect": {
                    fill: "orange"
                },
                "& .group-7.active rect": {
                    fill: "moccasin",
                    stroke: "orange",
                    strokeWidth: 5
                },
                "& circle.group-7": {
                    fill: "orange"
                },
                "& circle.group-7.active": {
                    fill: "moccasin"
                },
                "& .group-7 .initial": {
                    fill: "saddlebrown"
                },
                "& .group-7 .accept": {
                    stroke: "saddlebrown"
                }
            }
        });
    }, function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            var r = "";
            try {
                r = JSON.stringify(e, null, "  ");
            } catch (e) {
                r = "Error: " + e.message;
            }
            return [ "code", [ "pre", {
                contentEditable: !t,
                onInput: function(e) {
                    return n.value = e.target.textContent;
                }
            }, r ] ];
        }
        function i(e, t) {
            var n = e.entity, i = e.value, o = e.watching, d = {
                value: i
            }, f = [ "div", {
                style: "margin-top: 4px"
            } ];
            return o ? (f.push([ "button", {
                class: s.a,
                key: "edit-btn",
                onclick: function() {
                    return t(l.b.ENTITY.WATCH_ACTIVE_ENTITY, !1);
                }
            }, "Edit" ], Object(c.a)({
                key: "inspect-btn-" + n.id,
                onclick: function() {
                    return t(l.a.ENTITY_INSPECT, n.id);
                },
                icon: a.i(),
                title: "Inspect entity value"
            })), n.value && f.push(Object(c.a)({
                key: "reset-btn-" + n.id,
                onclick: function() {
                    return t(l.a.ENTITY_RESET, n.id);
                },
                icon: a.h(),
                title: "Reset entity value"
            }))) : f.push([ "button", {
                class: s.a,
                onclick: function() {
                    return t(l.b.ENTITY.WATCH_ACTIVE_ENTITY, !0);
                }
            }, "Cancel" ], [ "button", {
                class: s.a,
                key: "save-btn-" + n.id,
                onclick: function() {
                    var e = JSON.parse(d.value);
                    t(l.b.ENTITY.SAVE_VALUE, e);
                }
            }, "Save" ]), [ "section", {
                class: u.b
            }, [ "div", {
                class: u.d,
                key: n.id + o
            }, r(i, o, d) ], f ];
        }
        function o(e, t) {
            var n = [ "div", {
                style: "margin-top: 4px"
            } ];
            return n.push(Object(c.a)({
                onclick: function() {
                    return t(l.a.PROCESS_RUN, e.id);
                },
                icon: a.g(),
                title: "Run process"
            })), e.async && n.push(Object(c.a)({
                onclick: function() {
                    return t(l.a.PROCESS_STOP, e.id);
                },
                icon: a.j(),
                title: "Stop async process"
            })), [ "section", {
                class: u.b
            }, [ "div", {
                class: u.d
            }, [ "code", [ "pre", e.procedure.toString() ] ] ], n ];
        }
        t.a = i, t.b = o;
        var a = n(13), c = n(14), s = n(11), u = n(15), l = n(1);
    }, function(e, t, n) {
        "use strict";
        function r(e, t, n, i, o) {
            if (t.__entity__) {
                var a = t.__entity__, f = [ "span", {
                    class: "entity-controls"
                }, Object(s.a)({
                    icon: c.i(),
                    class: u.b,
                    onclick: function() {
                        return i(l.a.ENTITY_INSPECT, a.id);
                    },
                    title: "Inspect entity value"
                }) ];
                null != a.value && f.push(Object(s.a)({
                    class: u.b,
                    onclick: function() {
                        return i(l.a.ENTITY_RESET, a.id);
                    },
                    icon: c.h(),
                    title: "Reset entity value"
                }));
                var p = "entity-item";
                return n === a.id && (p += " selected"), [ "li", [ "div", {
                    class: p,
                    onclick: function() {
                        return i(l.b.ENTITY.SET_ACTIVE_ENTITY, a.id);
                    }
                }, null != a.value ? c.k() : c.j(), " " + e + " ", f ] ];
            }
            var h = [ "li", [ "div", {
                onclick: function() {
                    return i(l.b.TREE.TOGGLE_LEVEL, t.__path__);
                }
            }, c.f(o[t.__path__] ? "" : d), " " + e ] ];
            if (!o[t.__path__]) {
                var v = [ "ul" ];
                for (var g in t) "__path__" !== g && v.push(r(g, t[g], n, i, o));
                h.push(v);
            }
            return h;
        }
        function i(e, t) {
            var n = e.fold, i = e.tree, a = e.selected, c = [ "ul", {
                class: o.c
            } ];
            if (i) {
                var s = Object.keys(i).map(function(e) {
                    return r(e, i[e], a.id, t, n);
                });
                c.push.apply(c, s);
            }
            return c;
        }
        t.a = i;
        var o = n(15), a = n(2), c = (n.n(a), n(13)), s = n(14), u = n(11), l = n(1), d = Object(a.style)({
            transform: "rotate(90deg)"
        });
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            function t() {
                e({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }
            return window.addEventListener("resize", t), t(), function() {
                window.removeEventListener("resize", t);
            };
        }
        t.a = r;
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            function n(t) {
                l.pressed[t.button] = t, t.button === i.LEFT && (d = t.clientX, f = t.clientY, p = !0), 
                e(l);
            }
            function r(t) {
                delete l.pressed[t.button], delete l.drag.event, l.drag.x = 0, l.drag.y = 0, p = !1, 
                e(l);
            }
            function o(t) {
                p && (l.drag.event = t, l.drag.x = d - t.clientX, l.drag.y = f - t.clientY, e(l));
            }
            function a(e) {
                e.preventDefault();
            }
            void 0 === t && (t = {});
            var c = t.element, s = void 0 === c ? document : c, u = t.enableRightButton, l = {
                pressed: {},
                drag: {
                    x: 0,
                    y: 0
                }
            }, d = 0, f = 0, p = !1;
            return s.addEventListener("mousedown", n), document.addEventListener("mouseup", r), 
            document.addEventListener("mousemove", o), u && s.addEventListener("contextmenu", a), 
            e(l), function() {
                s.removeEventListener("mousedown", n), document.removeEventListener("mousemove", o), 
                document.removeEventListener("mouseup", r), u && s.removeEventListener("contextmenu", a);
            };
        }
        t.a = r;
        var i = {
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2
        };
    }, function(e, t, n) {
        e.exports = n(64).default, e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = typeof e;
            return "string" === t || "number" === t;
        }
        function i(e) {
            return u(e) || c(e);
        }
        function o(e) {
            return c(e) || !1 === e || s(e) || u(e);
        }
        function a(e) {
            return "function" == typeof e;
        }
        function c(e) {
            return null === e;
        }
        function s(e) {
            return !0 === e;
        }
        function u(e) {
            return void 0 === e;
        }
        function l(e) {
            throw e || (e = m), new Error("Inferno Error: " + e);
        }
        function d(e, t) {
            var n = {};
            if (e) for (var r in e) n[r] = e[r];
            if (t) for (var i in t) n[i] = t[i];
            return n;
        }
        function f(e, t) {
            if (28 & e.flags) {
                var n = e.parentVNode;
                n && (n.dom = t, f(n, t));
            }
        }
        function p(e, t, n) {
            var r = _.get(e);
            void 0 === r && (r = [], _.set(e, r), O.then(function() {
                _.delete(e), e._updating = !0, v(e, t, function() {
                    for (var t = 0, n = r.length; t < n; t++) r[t].call(e);
                }), e._updating = !1;
            })), i(n) || r.push(n);
        }
        function h(e, t, n) {
            a(t) && (t = t(e.state, e.props, e.context));
            var r = e._pendingState;
            if (i(r)) e._pendingState = t; else for (var o in t) r[o] = t[o];
            e._pendingSetState || e._blockRender ? (e._pendingSetState = !0, !i(n) && e._blockRender && e._lifecycle.addListener(n.bind(e))) : e._updating ? p(e, !1, n) : (e._pendingSetState = !0, 
            e._updating = !0, v(e, !1, n), e._updating = !1);
        }
        function v(e, t, n) {
            if (!e._unmounted) {
                if (t || !e._blockRender) {
                    e._pendingSetState = !1;
                    var a = e._pendingState, s = e.state, u = d(s, a), p = e.props, h = e.context;
                    e._pendingState = null;
                    var v, m = e._updateComponent(s, u, p, p, h, t, !0), _ = !0;
                    if (o(m)) v = g.createVNode(4096, null); else if (m === y) v = e._lastInput, _ = !1; else if (r(m)) v = g.createVNode(1, null, null, m); else {
                        if (b(m)) return l();
                        v = m;
                    }
                    var O = e._lastInput, w = e._vNode, T = O.dom && O.dom.parentNode || (O.dom = w.dom);
                    if (28 & v.flags && (v.parentVNode = w), e._lastInput = v, _) {
                        var k;
                        i(e.getChildContext) || (k = e.getChildContext()), k = i(k) ? e._childContext : d(h, k);
                        var S = e._lifecycle;
                        if (g.internal_patch(O, v, T, S, k, e._isSVG, !1), e._unmounted) return;
                        S.trigger(), i(e.componentDidUpdate) || e.componentDidUpdate(p, s, h), c(g.options.afterUpdate) || g.options.afterUpdate(w);
                    }
                    var E = w.dom = v.dom;
                    g.options.findDOMNodeEnabled && g.internal_DOMNodeMap.set(e, v.dom), f(w, E);
                } else e.state = e._pendingState, e._pendingState = null;
                i(n) || n.call(e);
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var g = n(16), y = "$NO_OP", m = "a runtime error occured! Use Inferno in development environment to find the error.", b = Array.isArray, _ = new Map(), O = Promise.resolve(), w = function(e, t) {
            this.state = null, this._blockRender = !1, this._blockSetState = !0, this._pendingSetState = !1, 
            this._pendingState = null, this._lastInput = null, this._vNode = null, this._unmounted = !1, 
            this._lifecycle = null, this._childContext = null, this._isSVG = !1, this._updating = !0, 
            this.props = e || g.EMPTY_OBJ, this.context = t || g.EMPTY_OBJ;
        };
        w.prototype.forceUpdate = function(e) {
            this._unmounted || v(this, !0, e);
        }, w.prototype.setState = function(e, t) {
            this._unmounted || (this._blockSetState ? l() : h(this, e, t));
        }, w.prototype._updateComponent = function(e, t, n, r, o, a, c) {
            if (!0 === this._unmounted && l(), n !== r || r === g.EMPTY_OBJ || e !== t || a) {
                if (n !== r || r === g.EMPTY_OBJ) {
                    if (!i(this.componentWillReceiveProps) && !c) {
                        if (this._blockRender = !0, this.componentWillReceiveProps(r, o), this._unmounted) return y;
                        this._blockRender = !1;
                    }
                    this._pendingSetState && (t = d(t, this._pendingState), this._pendingSetState = !1, 
                    this._pendingState = null);
                }
                if (a || i(this.shouldComponentUpdate) || this.shouldComponentUpdate && this.shouldComponentUpdate(r, t, o)) {
                    i(this.componentWillUpdate) || (this._blockSetState = !0, this.componentWillUpdate(r, t, o), 
                    this._blockSetState = !1), this.props = r, this.state = t, this.context = o, g.options.beforeRender && g.options.beforeRender(this);
                    var s = this.render(r, t, o);
                    return g.options.afterRender && g.options.afterRender(this), s;
                }
                this.props = r, this.state = t, this.context = o;
            }
            return y;
        }, w.prototype.render = function(e, t, n) {}, t.default = w;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return !f(e.prototype) && !f(e.prototype.render);
        }
        function i(e) {
            var t = typeof e;
            return "string" === t || "number" === t;
        }
        function o(e) {
            return f(e) || l(e);
        }
        function a(e) {
            return l(e) || !1 === e || d(e) || f(e);
        }
        function c(e) {
            return "function" == typeof e;
        }
        function s(e) {
            return "string" == typeof e;
        }
        function u(e) {
            return "number" == typeof e;
        }
        function l(e) {
            return null === e;
        }
        function d(e) {
            return !0 === e;
        }
        function f(e) {
            return void 0 === e;
        }
        function p(e) {
            return "object" == typeof e;
        }
        function h(e) {
            throw e || (e = lt), new Error("Inferno Error: " + e);
        }
        function v(e, t) {
            var n = {};
            if (e) for (var r in e) n[r] = e[r];
            if (t) for (var i in t) n[i] = t[i];
            return n;
        }
        function g() {
            this.listeners = [];
        }
        function y(e, t, n, r) {
            var i = kt.get(e);
            if (n) i || (i = {
                items: new Map(),
                docEvent: null
            }, i.docEvent = O(e, i), kt.set(e, i)), t || Tt && "onClick" === e && T(r), i.items.set(r, n); else if (i) {
                var o = i.items;
                o.delete(r) && 0 === o.size && (document.removeEventListener(b(e), i.docEvent), 
                kt.delete(e));
            }
        }
        function m(e, t, n, r, i, o) {
            for (var a = t; r > 0; ) {
                var c = n.get(a);
                if (c && (r--, o.dom = a, c.event ? c.event(c.data, e) : c(e), e.cancelBubble)) return;
                if (null === (a = a.parentNode) || i && a.disabled) return;
            }
        }
        function b(e) {
            return e.substr(2).toLowerCase();
        }
        function _() {
            this.cancelBubble = !0, this.stopImmediatePropagation();
        }
        function O(e, t) {
            var n = function(e) {
                var n = t.items.size;
                if (n > 0) {
                    e.stopPropagation = _;
                    var r = {
                        dom: document
                    };
                    try {
                        Object.defineProperty(e, "currentTarget", {
                            configurable: !0,
                            get: function() {
                                return r.dom;
                            }
                        });
                    } catch (e) {}
                    m(e, e.target, t.items, n, "click" === e.type, r);
                }
            };
            return document.addEventListener(b(e), n), n;
        }
        function w() {}
        function T(e) {
            e.onclick = w;
        }
        function k(e) {
            return "checkbox" === e || "radio" === e;
        }
        function S(e) {
            var t = this.vNode, n = t.props || It, r = t.dom, i = n.value;
            if (n.onInput) {
                var o = n.onInput;
                o.event ? o.event(o.data, e) : o(e);
            } else n.oninput && n.oninput(e);
            var a = this.vNode, c = a.props || It;
            i !== c.value && C(c, r);
        }
        function E(e) {
            var t = this.vNode.props || It, n = t.onChange;
            n.event ? n.event(n.data, e) : n(e);
        }
        function x(e) {
            e.stopPropagation();
            var t = this.vNode, n = t.props || It, r = t.dom;
            if (n.onClick) {
                var i = n.onClick;
                i.event ? i.event(i.data, e) : i(e);
            } else n.onclick && n.onclick(e);
            C(this.vNode.props || It, r);
        }
        function j(e, t, n, r, i) {
            C(n, t), i && (t.vNode = e, r && (k(n.type) ? (t.onclick = x, t.onclick.wrapped = !0) : (t.oninput = S, 
            t.oninput.wrapped = !0), n.onChange && (t.onchange = E, t.onchange.wrapped = !0)));
        }
        function C(e, t) {
            var n = e.type, r = e.value, i = e.checked, a = e.multiple, c = e.defaultValue, s = !o(r);
            n && n !== t.type && t.setAttribute("type", n), a && a !== t.multiple && (t.multiple = a), 
            o(c) || s || (t.defaultValue = c + ""), k(n) ? (s && (t.value = r), o(i) || (t.checked = i)) : s && t.value !== r ? (t.defaultValue = r, 
            t.value = r) : o(i) || (t.checked = i);
        }
        function I(e, t) {
            if ("optgroup" === e.type) {
                var n = e.children;
                if (ft(n)) for (var r = 0, i = n.length; r < i; r++) N(n[r], t); else Qe(n) && N(n, t);
            } else N(e, t);
        }
        function N(e, t) {
            var n = e.props || It, r = e.dom;
            r.value = n.value, ft(t) && -1 !== t.indexOf(n.value) || n.value === t ? r.selected = !0 : o(t) && o(n.selected) || (r.selected = n.selected || !1);
        }
        function M(e) {
            var t = this.vNode, n = t.props || It, r = t.dom, i = n.value;
            if (n.onChange) {
                var o = n.onChange;
                o.event ? o.event(o.data, e) : o(e);
            } else n.onchange && n.onchange(e);
            var a = this.vNode, c = a.props || It;
            i !== c.value && P(a, r, c, !1);
        }
        function A(e, t, n, r, i) {
            P(e, t, n, r), i && (t.vNode = e, r && (t.onchange = M, t.onchange.wrapped = !0));
        }
        function P(e, t, n, r) {
            n.multiple !== t.multiple && (t.multiple = n.multiple);
            var i = e.children;
            if (!a(i)) {
                var c = n.value;
                if (r && o(c) && (c = n.defaultValue), ft(i)) for (var s = 0, u = i.length; s < u; s++) I(i[s], c); else Qe(i) && I(i, c);
            }
        }
        function H(e) {
            var t = this.vNode.props || It, n = t.onChange;
            n.event ? n.event(n.data, e) : n(e);
        }
        function R(e) {
            var t = this.vNode, n = t.props || It, r = n.value;
            if (n.onInput) {
                var i = n.onInput;
                i.event ? i.event(i.data, e) : i(e);
            } else n.oninput && n.oninput(e);
            var o = this.vNode;
            r !== (o.props || It).value && D(o, t.dom, !1);
        }
        function L(e, t, n, r, i) {
            D(n, t, r), i && (t.vNode = e, r && (t.oninput = R, t.oninput.wrapped = !0, n.onChange && (t.onchange = H, 
            t.onchange.wrapped = !0)));
        }
        function D(e, t, n) {
            var r = e.value, i = t.value;
            if (o(r)) {
                if (n) {
                    var a = e.defaultValue;
                    o(a) ? "" !== i && (t.defaultValue = "", t.value = "") : a !== i && (t.defaultValue = a, 
                    t.value = a);
                }
            } else i !== r && (t.defaultValue = r, t.value = r);
        }
        function U(e, t, n, r, i, o) {
            512 & e && j(t, n, r, i, o), 2048 & e && A(t, n, r, i, o), 1024 & e && L(t, n, r, i, o);
        }
        function W(e) {
            return e.type && k(e.type) ? !o(e.checked) : !o(e.value);
        }
        function V(e) {
            for (var t = e.firstChild; t; ) if (8 === t.nodeType) if ("!" === t.data) {
                var n = document.createTextNode("");
                e.replaceChild(n, t), t = t.nextSibling;
            } else {
                var r = t.previousSibling;
                e.removeChild(t), t = r || e.firstChild;
            } else t = t.nextSibling;
        }
        function z(e, t, n, r, i, o) {
            var a = e.type, c = e.ref, s = e.props || It;
            if (o) {
                var u = t.namespaceURI === gt, l = Ie(e, a, s, r, u, n), d = l._lastInput;
                l._vNode = e, $(d, t, n, l._childContext, u), e.dom = d.dom, xe(e, c, l, n), l._updating = !1, 
                pt.findDOMNodeEnabled && xt.set(l, t);
            } else {
                var f = Ae(e, a, s, r);
                $(f, t, n, r, i), e.children = f, e.dom = f.dom, je(s, c, t, n);
            }
            return t;
        }
        function Y(e, t, n, r, i) {
            var c = e.children, s = e.props, u = e.className, l = e.flags, d = e.ref;
            if (i = i || (128 & l) > 0, 1 !== t.nodeType || t.tagName.toLowerCase() !== e.type) {
                var f = ke(e, null, n, r, i);
                return e.dom = f, We(t.parentNode, f, t), f;
            }
            if (e.dom = t, a(c) ? null === t.firstChild || Be(t, s) || (t.textContent = "") : F(c, t, n, r, i), 
            s) {
                var p = !1, h = (3584 & l) > 0;
                h && (p = W(s));
                for (var v in s) ye(v, null, s[v], t, i, p);
                h && U(l, e, t, s, !0, p);
            }
            return o(u) ? "" !== t.className && t.removeAttribute("class") : i ? t.setAttribute("class", u) : t.className = u, 
            d && Ce(t, d, n), t;
        }
        function F(e, t, n, r, o) {
            V(t);
            var a = t.firstChild;
            if (i(e)) l(a) || 3 !== a.nodeType ? "" === e ? t.appendChild(document.createTextNode("")) : t.textContent = e : a.nodeValue !== e && (a.nodeValue = e), 
            l(a) || (a = a.nextSibling); else if (ft(e)) for (var c = 0, s = e.length; c < s; c++) {
                var u = e[c];
                if (!l(u) && p(u)) if (l(a)) Oe(u, t, n, r, o); else {
                    var d = a.nextSibling;
                    $(u, a, n, r, o), a = d;
                }
            } else l(a) ? Oe(e, t, n, r, o) : ($(e, a, n, r, o), a = a.nextSibling);
            for (;a; ) {
                var f = a.nextSibling;
                t.removeChild(a), a = f;
            }
        }
        function G(e, t) {
            if (3 !== t.nodeType) {
                var n = we(e, null);
                return e.dom = n, We(t.parentNode, n, t), n;
            }
            var r = e.children;
            return t.nodeValue !== r && (t.nodeValue = r), e.dom = t, t;
        }
        function B(e, t) {
            return e.dom = t, t;
        }
        function $(e, t, n, r, i) {
            var o = e.flags;
            28 & o ? z(e, t, n, r, i, (4 & o) > 0) : 3970 & o ? Y(e, t, n, r, i) : 1 & o ? G(e, t) : 4096 & o ? B(e, t) : h();
        }
        function q(e, t, n) {
            if (!l(t)) {
                var r = t.firstChild;
                if (!l(r)) {
                    for ($(e, r, n, It, !1), r = t.firstChild; r = r.nextSibling; ) t.removeChild(r);
                    return !0;
                }
            }
            return !1;
        }
        function K(e, t, n, r) {
            var i = e.type, o = Et.get(i);
            if (!f(o)) {
                var a = e.key, c = null === a ? o.nonKeyed : o.keyed.get(a);
                if (!f(c)) {
                    var s = c.pop();
                    if (!f(s)) return se(s, e, null, t, n, r, !0), e.dom;
                }
            }
            return null;
        }
        function J(e) {
            var t = e.type, n = e.key, r = Et.get(t);
            if (f(r) && (r = {
                keyed: new Map(),
                nonKeyed: []
            }, Et.set(t, r)), l(n)) r.nonKeyed.push(e); else {
                var i = r.keyed.get(n);
                f(i) && (i = [], r.keyed.set(n, i)), i.push(e);
            }
        }
        function X(e, t, n, r) {
            var i = e.type, o = St.get(i);
            if (!f(o)) {
                var a = e.key, c = null === a ? o.nonKeyed : o.keyed.get(a);
                if (!f(c)) {
                    var s = c.pop();
                    if (!f(s)) {
                        if (!le(s, e, null, t, n, r, (4 & e.flags) > 0, !0)) return e.dom;
                    }
                }
            }
            return null;
        }
        function Q(e) {
            var t = e.ref;
            if (!t || !(t.onComponentWillMount || t.onComponentWillUnmount || t.onComponentDidMount || t.onComponentWillUpdate || t.onComponentDidUpdate)) {
                var n = e.type, r = e.key, i = St.get(n);
                if (f(i) && (i = {
                    keyed: new Map(),
                    nonKeyed: []
                }, St.set(n, i)), l(r)) i.nonKeyed.push(e); else {
                    var o = i.keyed.get(r);
                    f(o) && (o = [], i.keyed.set(r, o)), o.push(e);
                }
            }
        }
        function Z(e, t, n, r, i) {
            var s = e.flags, u = e.dom;
            if (28 & s) {
                var d = e.children, h = (4 & s) > 0, v = e.props || It, g = e.ref;
                i || (h ? d._unmounted || (l(pt.beforeUnmount) || pt.beforeUnmount(e), f(d.componentWillUnmount) || d.componentWillUnmount(), 
                g && !i && g(null), d._unmounted = !0, pt.findDOMNodeEnabled && xt.delete(d), Z(d._lastInput, null, d._lifecycle, !1, i)) : (o(g) || o(g.onComponentWillUnmount) || g.onComponentWillUnmount(u, v), 
                Z(d, null, n, !1, i))), pt.recyclingEnabled && !h && (t || r) && Q(e);
            } else if (3970 & s) {
                var y = e.ref, m = e.props;
                !i && c(y) && y(null);
                var b = e.children;
                if (!o(b)) if (ft(b)) for (var _ = 0, O = b.length; _ < O; _++) {
                    var w = b[_];
                    !a(w) && p(w) && Z(w, null, n, !1, i);
                } else p(b) && Z(b, null, n, !1, i);
                if (!l(m)) for (var T in m) null !== m[T] && ge(T) && (me(T, m[T], null, u), m[T] = null);
                pt.recyclingEnabled && (t || r) && J(e);
            }
            l(t) || Ve(t, u);
        }
        function ee(e) {
            pt.findDOMNodeEnabled || h();
            var t = e && e.nodeType ? e : null;
            return xt.get(e) || t;
        }
        function te(e) {
            for (var t = 0, n = jt.length; t < n; t++) {
                var r = jt[t];
                if (r.dom === e) return r;
            }
            return null;
        }
        function ne(e, t, n) {
            var r = {
                dom: e,
                input: t,
                lifecycle: n
            };
            return jt.push(r), r;
        }
        function re(e) {
            for (var t = 0, n = jt.length; t < n; t++) if (jt[t] === e) return void jt.splice(t, 1);
        }
        function ie(e, t) {
            if (Ct === t && h(), e !== ut) {
                var n = te(t);
                if (l(n)) {
                    var r = new g();
                    a(e) || (e.dom && (e = qe(e)), q(e, t, r) || Oe(e, t, r, It, !1), n = ne(t, e, r), 
                    r.trigger());
                } else {
                    var i = n.lifecycle;
                    i.listeners = [], o(e) ? (Z(n.input, t, i, !1, !1), re(n)) : (e.dom && (e = qe(e)), 
                    ae(n.input, e, t, i, It, !1, !1)), n.input = e, i.trigger();
                }
                if (n) {
                    var c = n.input;
                    if (c && 28 & c.flags) return c.children;
                }
            }
        }
        function oe(e) {
            return function(t, n) {
                e || (e = t), ie(n, e);
            };
        }
        function ae(e, t, n, r, i, o, a) {
            if (e !== t) {
                var c = e.flags, s = t.flags;
                if (28 & s) {
                    var u = (4 & s) > 0;
                    28 & c ? le(e, t, n, r, i, o, u, a) : Me(n, Ee(t, null, r, i, o, u), e, r, a);
                } else 3970 & s ? 3970 & c ? se(e, t, n, r, i, o, a) : Me(n, ke(t, null, r, i, o), e, r, a) : 1 & s ? 1 & c ? de(e, t) : Me(n, we(t, null), e, r, a) : 4096 & s ? 4096 & c ? fe(e, t) : Me(n, Te(t, null), e, r, a) : Ne(e, t, n, r, i, o, a);
            }
        }
        function ce(e, t, n, r) {
            Qe(e) ? Z(e, t, n, !0, r) : ft(e) ? ze(t, e, n, r) : t.textContent = "";
        }
        function se(e, t, n, r, i, a, c) {
            var s = t.type;
            if (e.type !== s) Ue(e, t, n, r, i, a, c); else {
                var u = e.dom, l = e.props, d = t.props, f = e.children, p = t.children, h = e.flags, v = t.flags, g = t.ref, y = e.className, m = t.className;
                if (t.dom = u, a = a || (128 & v) > 0, f !== p && ue(h, v, f, p, u, r, i, !0 === a && "foreignObject" !== t.type, c), 
                l !== d) {
                    var b = l || It, _ = d || It, O = !1;
                    if (_ !== It) {
                        var w = (3584 & v) > 0;
                        w && (O = W(_));
                        for (var T in _) {
                            var k = _[T];
                            ye(T, b[T], k, u, a, O);
                        }
                        w && U(v, t, u, _, c, O);
                    }
                    if (b !== It) for (var S in b) o(_[S]) && !o(b[S]) && _e(S, b[S], u, v);
                }
                y !== m && (o(m) ? u.removeAttribute("class") : a ? u.setAttribute("class", m) : u.className = m), 
                g && (e.ref !== g || c) && Ce(u, g, r);
            }
        }
        function ue(e, t, n, r, o, c, s, u, l) {
            var d = !1, f = !1;
            if (64 & t ? d = !0 : (32 & e) > 0 && (32 & t) > 0 ? (f = !0, d = !0) : a(r) ? ce(n, o, c, l) : a(n) ? i(r) ? Pe(o, r) : ft(r) ? Se(r, o, c, s, u) : Oe(r, o, c, s, u) : i(r) ? i(n) ? He(o, r) : (ce(n, o, c, l), 
            Pe(o, r)) : ft(r) ? ft(n) ? (d = !0, Fe(n, r) && (f = !0)) : (ce(n, o, c, l), Se(r, o, c, s, u)) : ft(n) ? (ze(o, n, c, l), 
            Oe(r, o, c, s, u)) : Qe(r) && (Qe(n) ? ae(n, r, o, c, s, u, l) : (ce(n, o, c, l), 
            Oe(r, o, c, s, u))), d) {
                var p = n.length, h = r.length;
                0 === p ? h > 0 && Se(r, o, c, s, u) : 0 === h ? ze(o, n, c, l) : f ? he(n, r, o, c, s, u, l, p, h) : pe(n, r, o, c, s, u, l, p, h);
            }
        }
        function le(e, t, n, r, c, s, u, d) {
            var g = e.type, y = t.type, m = e.key, b = t.key;
            if (g !== y || m !== b) return Ue(e, t, n, r, c, s, d), !1;
            var _ = t.props || It;
            if (u) {
                var O = e.children;
                if (O._updating = !0, O._unmounted) {
                    if (l(n)) return !0;
                    We(n, Ee(t, null, r, c, s, (4 & t.flags) > 0), e.dom);
                } else {
                    var w = !f(O.componentDidUpdate), T = O.state, k = w ? v(T, null) : T, S = O.props;
                    t.children = O, O._isSVG = s;
                    var E = O._lastInput, x = O._updateComponent(k, T, S, _, c, !1, !1);
                    if (O._unmounted) return !1;
                    var j, C = !0;
                    o(O.getChildContext) || (j = O.getChildContext()), j = o(j) ? c : v(c, j), O._childContext = j, 
                    a(x) ? x = Je() : x === ut ? (x = E, C = !1) : i(x) ? x = Xe(x, null) : ft(x) ? h() : p(x) && (l(x.dom) || (x = qe(x))), 
                    28 & x.flags ? x.parentVNode = t : 28 & E.flags && (E.parentVNode = t), O._lastInput = x, 
                    O._vNode = t, C && (ae(E, x, n, r, j, s, d), w && O.componentDidUpdate && O.componentDidUpdate(S, k), 
                    l(pt.afterUpdate) || pt.afterUpdate(t), pt.findDOMNodeEnabled && xt.set(O, x.dom)), 
                    t.dom = x.dom;
                }
                O._updating = !1;
            } else {
                var I = !0, N = e.props, M = t.ref, A = !o(M), P = e.children, H = P;
                t.dom = e.dom, t.children = P, m !== b ? I = !0 : A && !o(M.onComponentShouldUpdate) && (I = M.onComponentShouldUpdate(N, _)), 
                !1 !== I && (A && !o(M.onComponentWillUpdate) && M.onComponentWillUpdate(N, _), 
                H = y(_, c), a(H) ? H = Je() : i(H) && H !== ut ? H = Xe(H, null) : ft(H) ? h() : p(H) && (l(H.dom) || (H = qe(H))), 
                H !== ut && (ae(P, H, n, r, c, s, d), t.children = H, A && !o(M.onComponentDidUpdate) && M.onComponentDidUpdate(N, _), 
                t.dom = H.dom)), 28 & H.flags ? H.parentVNode = t : 28 & P.flags && (P.parentVNode = t);
            }
            return !1;
        }
        function de(e, t) {
            var n = t.children, r = e.dom;
            t.dom = r, e.children !== n && (r.nodeValue = n);
        }
        function fe(e, t) {
            t.dom = e.dom;
        }
        function pe(e, t, n, r, i, o, a, c, s) {
            for (var u = c > s ? s : c, l = 0; l < u; l++) {
                var d = t[l];
                d.dom && (d = t[l] = qe(d)), ae(e[l], d, n, r, i, o, a);
            }
            if (c < s) for (l = u; l < s; l++) {
                var f = t[l];
                f.dom && (f = t[l] = qe(f)), Re(n, Oe(f, null, r, i, o));
            } else if (c > s) for (l = u; l < c; l++) Z(e[l], n, r, !1, a);
        }
        function he(e, t, n, r, i, o, a, c, s) {
            var u, d, p, h, v, g, y, m = c - 1, b = s - 1, _ = 0, O = 0, w = e[_], T = t[O], k = e[m], S = t[b];
            T.dom && (t[O] = T = qe(T)), S.dom && (t[b] = S = qe(S));
            e: {
                for (;w.key === T.key; ) {
                    if (ae(w, T, n, r, i, o, a), _++, O++, _ > m || O > b) break e;
                    w = e[_], T = t[O], T.dom && (t[O] = T = qe(T));
                }
                for (;k.key === S.key; ) {
                    if (ae(k, S, n, r, i, o, a), m--, b--, _ > m || O > b) break e;
                    k = e[m], S = t[b], S.dom && (t[b] = S = qe(S));
                }
            }
            if (_ > m) {
                if (O <= b) for (g = b + 1, v = g < s ? t[g].dom : null; O <= b; ) y = t[O], y.dom && (t[O] = y = qe(y)), 
                O++, Le(n, Oe(y, null, r, i, o), v);
            } else if (O > b) for (;_ <= m; ) Z(e[_++], n, r, !1, a); else {
                var E = m - _ + 1, x = b - O + 1, j = new Array(x);
                for (u = 0; u < x; u++) j[u] = -1;
                var C = !1, I = 0, N = 0;
                if (x <= 4 || E * x <= 16) {
                    for (u = _; u <= m; u++) if (p = e[u], N < x) for (d = O; d <= b; d++) if (h = t[d], 
                    p.key === h.key) {
                        j[d - O] = u, I > d ? C = !0 : I = d, h.dom && (t[d] = h = qe(h)), ae(p, h, n, r, i, o, a), 
                        N++, e[u] = null;
                        break;
                    }
                } else {
                    var M = new Map();
                    for (u = O; u <= b; u++) M.set(t[u].key, u);
                    for (u = _; u <= m; u++) p = e[u], N < x && (d = M.get(p.key), f(d) || (h = t[d], 
                    j[d - O] = u, I > d ? C = !0 : I = d, h.dom && (t[d] = h = qe(h)), ae(p, h, n, r, i, o, a), 
                    N++, e[u] = null));
                }
                if (E === c && 0 === N) for (ze(n, e, r, a); O < x; ) y = t[O], y.dom && (t[O] = y = qe(y)), 
                O++, Le(n, Oe(y, null, r, i, o), null); else {
                    for (u = E - N; u > 0; ) p = e[_++], l(p) || (Z(p, n, r, !0, a), u--);
                    if (C) {
                        var A = ve(j);
                        for (d = A.length - 1, u = x - 1; u >= 0; u--) -1 === j[u] ? (I = u + O, y = t[I], 
                        y.dom && (t[I] = y = qe(y)), g = I + 1, Le(n, Oe(y, null, r, i, o), g < s ? t[g].dom : null)) : d < 0 || u !== A[d] ? (I = u + O, 
                        y = t[I], g = I + 1, Le(n, y.dom, g < s ? t[g].dom : null)) : d--;
                    } else if (N !== x) for (u = x - 1; u >= 0; u--) -1 === j[u] && (I = u + O, y = t[I], 
                    y.dom && (t[I] = y = qe(y)), g = I + 1, Le(n, Oe(y, null, r, i, o), g < s ? t[g].dom : null));
                }
            }
        }
        function ve(e) {
            var t, n, r, i, o, a = e.slice(0), c = [ 0 ], s = e.length;
            for (t = 0; t < s; t++) {
                var u = e[t];
                if (-1 !== u) {
                    if (n = c[c.length - 1], e[n] < u) {
                        a[t] = n, c.push(t);
                        continue;
                    }
                    for (r = 0, i = c.length - 1; r < i; ) o = (r + i) / 2 | 0, e[c[o]] < u ? r = o + 1 : i = o;
                    u < e[c[r]] && (r > 0 && (a[t] = c[r - 1]), c[r] = t);
                }
            }
            for (r = c.length, i = c[r - 1]; r-- > 0; ) c[r] = i, i = a[i];
            return c;
        }
        function ge(e) {
            return "o" === e[0] && "n" === e[1];
        }
        function ye(e, t, n, r, i, a) {
            if (t !== n) {
                if (Ot.has(e) || a && "value" === e) return;
                if (mt.has(e)) e = "autoFocus" === e ? e.toLowerCase() : e, r[e] = !!n; else if (yt.has(e)) {
                    var c = o(n) ? "" : n;
                    r[e] !== c && (r[e] = c);
                } else if (ge(e)) me(e, t, n, r); else if (o(n)) r.removeAttribute(e); else if ("style" === e) be(t, n, r); else if ("dangerouslySetInnerHTML" === e) {
                    var s = t && t.__html, u = n && n.__html;
                    s !== u && (o(u) || Ge(r, u) || (r.innerHTML = u));
                } else i && bt.has(e) ? r.setAttributeNS(bt.get(e), e, n) : r.setAttribute(e, n);
            }
        }
        function me(e, t, n, r) {
            if (t !== n) if (wt.has(e)) y(e, t, n, r); else {
                var i = e.toLowerCase(), a = r[i];
                if (a && a.wrapped) return;
                if (c(n) || o(n)) r[i] = n; else {
                    var s = n.event;
                    s && c(s) ? r[i] = function(e) {
                        s(n.data, e);
                    } : h();
                }
            }
        }
        function be(e, t, n) {
            var r, i, a = n.style;
            if (s(t)) return void (a.cssText = t);
            if (o(e) || s(e)) for (r in t) i = t[r], a[r] = !u(i) || _t.has(r) ? i : i + "px"; else {
                for (r in t) (i = t[r]) !== e[r] && (a[r] = !u(i) || _t.has(r) ? i : i + "px");
                for (r in e) o(t[r]) && (a[r] = "");
            }
        }
        function _e(e, t, n, r) {
            "value" === e ? n.value = 2048 & r ? null : "" : "style" === e ? n.removeAttribute("style") : ge(e) ? y(e, t, null, n) : n.removeAttribute(e);
        }
        function Oe(e, t, n, r, i) {
            var o = e.flags;
            return 3970 & o ? ke(e, t, n, r, i) : 28 & o ? Ee(e, t, n, r, i, (4 & o) > 0) : 4096 & o ? Te(e, t) : 1 & o ? we(e, t) : void h();
        }
        function we(e, t) {
            var n = document.createTextNode(e.children);
            return e.dom = n, l(t) || Re(t, n), n;
        }
        function Te(e, t) {
            var n = document.createTextNode("");
            return e.dom = n, l(t) || Re(t, n), n;
        }
        function ke(e, t, n, r, o) {
            var c;
            if (pt.recyclingEnabled && (c = K(e, n, r, o), !l(c))) return l(t) || Re(t, c), 
            c;
            var s = e.flags;
            o = o || (128 & s) > 0, c = De(e.type, o);
            var u = e.children, d = e.props, f = e.className, p = e.ref;
            if (e.dom = c, !a(u)) if (i(u)) Pe(c, u); else {
                var h = !0 === o && "foreignObject" !== e.type;
                ft(u) ? Se(u, c, n, r, h) : Qe(u) && Oe(u, c, n, r, h);
            }
            if (!l(d)) {
                var v = !1, g = (3584 & s) > 0;
                g && (v = W(d));
                for (var y in d) ye(y, null, d[y], c, o, v);
                g && U(s, e, c, d, !0, v);
            }
            return null !== f && (o ? c.setAttribute("class", f) : c.className = f), l(p) || Ce(c, p, n), 
            l(t) || Re(t, c), c;
        }
        function Se(e, t, n, r, i) {
            for (var o = 0, c = e.length; o < c; o++) {
                var s = e[o];
                a(s) || (s.dom && (e[o] = s = qe(s)), Oe(e[o], t, n, r, i));
            }
        }
        function Ee(e, t, n, r, i, o) {
            var a;
            if (pt.recyclingEnabled && (a = X(e, n, r, i), !l(a))) return l(t) || Re(t, a), 
            a;
            var c = e.type, s = e.props || It, u = e.ref;
            if (o) {
                var d = Ie(e, c, s, r, i, n), f = d._lastInput;
                d._vNode = e, e.dom = a = Oe(f, null, n, d._childContext, i), l(t) || Re(t, a), 
                xe(e, u, d, n), d._updating = !1, pt.findDOMNodeEnabled && xt.set(d, a);
            } else {
                var p = Ae(e, c, s, r);
                e.dom = a = Oe(p, null, n, r, i), e.children = p, je(s, u, a, n), l(t) || Re(t, a);
            }
            return a;
        }
        function xe(e, t, n, r) {
            t && (c(t) ? t(n) : h());
            var i = !f(n.componentDidMount), o = pt.afterMount;
            !i && l(o) || r.addListener(function() {
                n._updating = !0, o && o(e), i && n.componentDidMount(), n._updating = !1;
            });
        }
        function je(e, t, n, r) {
            t && (o(t.onComponentWillMount) || t.onComponentWillMount(e), o(t.onComponentDidMount) || r.addListener(function() {
                return t.onComponentDidMount(n, e);
            }));
        }
        function Ce(e, t, n) {
            if (c(t)) n.addListener(function() {
                return t(e);
            }); else {
                if (a(t)) return;
                h();
            }
        }
        function Ie(e, t, n, r, c, s) {
            f(r) && (r = It);
            var u = new t(n, r);
            if (e.children = u, u._blockSetState = !1, u.context = r, u.props === It && (u.props = n), 
            u._lifecycle = s, u._unmounted = !1, u._isSVG = c, !o(u.componentWillMount)) {
                if (u._blockRender = !0, u.componentWillMount(), u._pendingSetState) {
                    var d = u.state, p = u._pendingState;
                    if (null === d) u.state = p; else for (var g in p) d[g] = p[g];
                    u._pendingSetState = !1, u._pendingState = null;
                }
                u._blockRender = !1;
            }
            var y;
            o(u.getChildContext) || (y = u.getChildContext()), o(y) ? u._childContext = r : u._childContext = v(r, y), 
            l(pt.beforeRender) || pt.beforeRender(u);
            var m = u.render(n, u.state, r);
            return l(pt.afterRender) || pt.afterRender(u), ft(m) ? h() : a(m) ? m = Je() : i(m) ? m = Xe(m, null) : (m.dom && (m = qe(m)), 
            28 & m.flags && (m.parentVNode = e)), u._lastInput = m, u;
        }
        function Ne(e, t, n, r, i, o, a) {
            Me(n, Oe(t, null, r, i, o), e, r, a);
        }
        function Me(e, t, n, r, i) {
            Z(n, null, r, !1, i), We(e, t, n.dom);
        }
        function Ae(e, t, n, r) {
            var o = t(n, r);
            return ft(o) ? h() : a(o) ? o = Je() : i(o) ? o = Xe(o, null) : (o.dom && (o = qe(o)), 
            28 & o.flags && (o.parentVNode = e)), o;
        }
        function Pe(e, t) {
            "" !== t ? e.textContent = t : e.appendChild(document.createTextNode(""));
        }
        function He(e, t) {
            e.firstChild.nodeValue = t;
        }
        function Re(e, t) {
            e.appendChild(t);
        }
        function Le(e, t, n) {
            o(n) ? Re(e, t) : e.insertBefore(t, n);
        }
        function De(e, t) {
            return !0 === t ? document.createElementNS(gt, e) : document.createElement(e);
        }
        function Ue(e, t, n, r, i, o, a) {
            Z(e, null, r, !1, a);
            var c = Oe(t, null, r, i, o);
            t.dom = c, We(n, c, e.dom);
        }
        function We(e, t, n) {
            e || (e = n.parentNode), e.replaceChild(t, n);
        }
        function Ve(e, t) {
            e.removeChild(t);
        }
        function ze(e, t, n, r) {
            (!pt.recyclingEnabled || pt.recyclingEnabled && !r) && Ye(null, t, n, r), e.textContent = "";
        }
        function Ye(e, t, n, r) {
            for (var i = 0, o = t.length; i < o; i++) {
                var c = t[i];
                a(c) || Z(c, e, n, !0, r);
            }
        }
        function Fe(e, t) {
            return t.length > 0 && !o(t[0]) && !o(t[0].key) && e.length > 0 && !o(e[0]) && !o(e[0].key);
        }
        function Ge(e, t) {
            var n = document.createElement("i");
            return n.innerHTML = t, n.innerHTML === e.innerHTML;
        }
        function Be(e, t) {
            return Boolean(t && t.dangerouslySetInnerHTML && t.dangerouslySetInnerHTML.__html && Ge(e, t.dangerouslySetInnerHTML.__html));
        }
        function $e(e, t, n, i, o, a, c, s) {
            16 & e && (e = r(t) ? 4 : 8);
            var u = {
                children: void 0 === i ? null : i,
                className: void 0 === n ? null : n,
                dom: null,
                flags: e,
                key: void 0 === a ? null : a,
                props: void 0 === o ? null : o,
                ref: void 0 === c ? null : c,
                type: t
            };
            return !0 !== s && ct(u), null !== pt.createVNode && pt.createVNode(u), u;
        }
        function qe(e) {
            var t, n = e.flags;
            if (28 & n) {
                var r, o = e.props;
                if (l(o)) r = It; else {
                    r = {};
                    for (var c in o) r[c] = o[c];
                }
                t = $e(n, e.type, null, null, r, e.key, e.ref, !0);
                var s = t.props, u = s.children;
                if (u) if (ft(u)) {
                    var d = u.length;
                    if (d > 0) {
                        for (var f = [], p = 0; p < d; p++) {
                            var h = u[p];
                            i(h) ? f.push(h) : !a(h) && Qe(h) && f.push(qe(h));
                        }
                        s.children = f;
                    }
                } else Qe(u) && (s.children = qe(u));
                t.children = null;
            } else if (3970 & n) {
                var v, g = e.children, y = e.props;
                if (null === y) v = It; else {
                    v = {};
                    for (var m in y) v[m] = y[m];
                }
                t = $e(n, e.type, e.className, g, v, e.key, e.ref, !g);
            } else 1 & n && (t = Xe(e.children, e.key));
            return t;
        }
        function Ke(e, t) {
            for (var n = [], r = arguments.length - 2; r-- > 0; ) n[r] = arguments[r + 2];
            var o = n, c = n.length;
            c > 0 && !f(n[0]) && (t || (t = {}), 1 === c && (o = n[0]), f(o) || (t.children = o));
            var s;
            if (ft(e)) {
                for (var u = [], l = 0, d = e.length; l < d; l++) u.push(qe(e[l]));
                s = u;
            } else {
                var p = e.flags, h = e.className, g = e.key, y = e.ref;
                if (t && (t.hasOwnProperty("className") && (h = t.className), t.hasOwnProperty("ref") && (y = t.ref), 
                t.hasOwnProperty("key") && (g = t.key)), 28 & p) {
                    s = $e(p, e.type, h, null, e.props || t ? v(e.props, t) : It, g, y, !0);
                    var m = s.props;
                    if (m) {
                        var b = m.children;
                        if (b) if (ft(b)) {
                            var _ = b.length;
                            if (_ > 0) {
                                for (var O = [], w = 0; w < _; w++) {
                                    var T = b[w];
                                    i(T) ? O.push(T) : !a(T) && Qe(T) && O.push(qe(T));
                                }
                                m.children = O;
                            }
                        } else Qe(b) && (m.children = qe(b));
                    }
                    s.children = null;
                } else 3970 & p ? (o = t && !f(t.children) ? t.children : e.children, s = $e(p, e.type, h, o, e.props || t ? v(e.props, t) : It, g, y, !1)) : 1 & p && (s = Xe(e.children, g));
            }
            return s;
        }
        function Je() {
            return $e(4096, null);
        }
        function Xe(e, t) {
            return $e(1, null, null, e, null, t);
        }
        function Qe(e) {
            return !!e.flags;
        }
        function Ze(e, t) {
            return t.key = e, t;
        }
        function et(e, t) {
            return u(e) && (e = "." + e), l(t.key) || "." === t.key[0] ? Ze(e, t) : t;
        }
        function tt(e, t) {
            return t.key = e + t.key, t;
        }
        function nt(e, t, n, r) {
            for (var o = e.length; n < o; n++) {
                var c = e[n], s = r + "." + n;
                a(c) || (ft(c) ? nt(c, t, 0, s) : (i(c) ? c = Xe(c, null) : (Qe(c) && c.dom || c.key && "." === c.key[0]) && (c = qe(c)), 
                c = l(c.key) || "." === c.key[0] ? Ze(s, c) : tt(r, c), t.push(c)));
            }
        }
        function rt(e) {
            var t;
            !0 === e.$ ? e = e.slice() : e.$ = !0;
            for (var n = 0, r = e.length; n < r; n++) {
                var o = e[n];
                if (a(o) || ft(o)) {
                    var c = (t || e).slice(0, n);
                    return nt(e, c, n, ""), c;
                }
                i(o) ? (t || (t = e.slice(0, n)), t.push(et(n, Xe(o, null)))) : Qe(o) && null !== o.dom || l(o.key) && 0 == (64 & o.flags) ? (t || (t = e.slice(0, n)), 
                t.push(et(n, qe(o)))) : t && t.push(et(n, qe(o)));
            }
            return t || e;
        }
        function it(e) {
            return ft(e) ? rt(e) : Qe(e) && null !== e.dom ? qe(e) : e;
        }
        function ot(e, t, n) {
            3970 & e.flags && (o(n) && t.hasOwnProperty("children") && (e.children = t.children), 
            t.hasOwnProperty("className") && (e.className = t.className || null, delete t.className)), 
            t.hasOwnProperty("ref") && (e.ref = t.ref, delete t.ref), t.hasOwnProperty("key") && (e.key = t.key, 
            delete t.key);
        }
        function at(e) {
            return "svg" === e ? 128 : "input" === e ? 512 : "select" === e ? 2048 : "textarea" === e ? 1024 : "media" === e ? 256 : 2;
        }
        function ct(e) {
            var t = e.props, n = e.children;
            if (28 & e.flags) {
                var r = e.type, i = r.defaultProps;
                if (!o(i)) if (t) for (var c in i) f(t[c]) && (t[c] = i[c]); else t = e.props = i;
                s(r) && (e.flags = at(r), t && t.children && (e.children = t.children, n = t.children));
            }
            t && (ot(e, t, n), a(t.children) || (t.children = it(t.children))), a(n) || (e.children = it(n));
        }
        function st(e, t) {
            return c(t) ? {
                data: e,
                event: t
            } : null;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var ut = "$NO_OP", lt = "a runtime error occured! Use Inferno in development environment to find the error.", dt = !("undefined" == typeof window || !window.document), ft = Array.isArray;
        g.prototype.addListener = function(e) {
            this.listeners.push(e);
        }, g.prototype.trigger = function() {
            for (var e, t = this.listeners; e = t.shift(); ) e();
        };
        var pt = {
            afterMount: null,
            afterRender: null,
            afterUpdate: null,
            beforeRender: null,
            beforeUnmount: null,
            createVNode: null,
            findDOMNodeEnabled: !1,
            recyclingEnabled: !1,
            roots: []
        }, ht = "http://www.w3.org/1999/xlink", vt = "http://www.w3.org/XML/1998/namespace", gt = "http://www.w3.org/2000/svg", yt = new Set();
        yt.add("volume"), yt.add("defaultChecked");
        var mt = new Set();
        mt.add("muted"), mt.add("scoped"), mt.add("loop"), mt.add("open"), mt.add("checked"), 
        mt.add("default"), mt.add("capture"), mt.add("disabled"), mt.add("readOnly"), mt.add("required"), 
        mt.add("autoplay"), mt.add("controls"), mt.add("seamless"), mt.add("reversed"), 
        mt.add("allowfullscreen"), mt.add("novalidate"), mt.add("hidden"), mt.add("autoFocus"), 
        mt.add("selected"), mt.add("indeterminate");
        var bt = new Map();
        bt.set("xlink:href", ht), bt.set("xlink:arcrole", ht), bt.set("xlink:actuate", ht), 
        bt.set("xlink:show", ht), bt.set("xlink:role", ht), bt.set("xlink:title", ht), bt.set("xlink:type", ht), 
        bt.set("xml:base", vt), bt.set("xml:lang", vt), bt.set("xml:space", vt);
        var _t = new Set();
        _t.add("animationIterationCount"), _t.add("borderImageOutset"), _t.add("borderImageSlice"), 
        _t.add("borderImageWidth"), _t.add("boxFlex"), _t.add("boxFlexGroup"), _t.add("boxOrdinalGroup"), 
        _t.add("columnCount"), _t.add("flex"), _t.add("flexGrow"), _t.add("flexPositive"), 
        _t.add("flexShrink"), _t.add("flexNegative"), _t.add("flexOrder"), _t.add("gridRow"), 
        _t.add("gridColumn"), _t.add("fontWeight"), _t.add("lineClamp"), _t.add("lineHeight"), 
        _t.add("opacity"), _t.add("order"), _t.add("orphans"), _t.add("tabSize"), _t.add("widows"), 
        _t.add("zIndex"), _t.add("zoom"), _t.add("fillOpacity"), _t.add("floodOpacity"), 
        _t.add("stopOpacity"), _t.add("strokeDasharray"), _t.add("strokeDashoffset"), _t.add("strokeMiterlimit"), 
        _t.add("strokeOpacity"), _t.add("strokeWidth");
        var Ot = new Set();
        Ot.add("children"), Ot.add("childrenType"), Ot.add("defaultValue"), Ot.add("ref"), 
        Ot.add("key"), Ot.add("checked"), Ot.add("multiple");
        var wt = new Set();
        wt.add("onClick"), wt.add("onMouseDown"), wt.add("onMouseUp"), wt.add("onMouseMove"), 
        wt.add("onSubmit"), wt.add("onDblClick"), wt.add("onKeyDown"), wt.add("onKeyUp"), 
        wt.add("onKeyPress");
        var Tt = dt && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform), kt = new Map(), St = new Map(), Et = new Map(), xt = new Map(), jt = pt.roots, Ct = dt ? document.body : null, It = {}, Nt = {
            EMPTY_OBJ: It,
            NO_OP: ut,
            cloneVNode: Ke,
            createRenderer: oe,
            createVNode: $e,
            findDOMNode: ee,
            getFlagsForElementVnode: at,
            internal_DOMNodeMap: xt,
            internal_isUnitlessNumber: _t,
            internal_normalize: ct,
            internal_patch: ae,
            linkEvent: st,
            options: pt,
            render: ie,
            version: "3.9.0"
        };
        t.default = Nt, t.EMPTY_OBJ = It, t.NO_OP = ut, t.cloneVNode = Ke, t.createRenderer = oe, 
        t.createVNode = $e, t.findDOMNode = ee, t.getFlagsForElementVnode = at, t.internal_DOMNodeMap = xt, 
        t.internal_isUnitlessNumber = _t, t.internal_normalize = ct, t.internal_patch = ae, 
        t.linkEvent = st, t.options = pt, t.render = ie, t.version = "3.9.0";
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return s(e) || a(e);
        }
        function i(e) {
            return a(e) || !1 === e || c(e) || s(e);
        }
        function o(e) {
            return "string" == typeof e;
        }
        function a(e) {
            return null === e;
        }
        function c(e) {
            return !0 === e;
        }
        function s(e) {
            return void 0 === e;
        }
        function u(e) {
            return "object" == typeof e;
        }
        function l(e, t) {
            for (var n = [], a = arguments.length - 2; a-- > 0; ) n[a] = arguments[a + 2];
            if (i(e) || u(e)) throw new Error("Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.");
            var c, l = n, p = null, h = null, v = null, g = 0;
            if (n && (1 === n.length ? l = n[0] : 0 === n.length && (l = void 0)), o(e)) {
                if (g = d.getFlagsForElementVnode(e), !r(t)) {
                    c = {};
                    for (var y in t) "className" === y || "class" === y ? v = t[y] : "key" === y ? h = t.key : "children" === y && s(l) ? l = t.children : "ref" === y ? p = t.ref : c[y] = t[y];
                }
            } else if (g = 16, s(l) || (t || (t = {}), t.children = l, l = null), !r(t)) {
                c = {};
                for (var m in t) f.has(m) ? (p || (p = {}), p[m] = t[m]) : "key" === m ? h = t.key : c[m] = t[m];
            }
            return d.createVNode(g, e, v, l, c, h, p);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var d = n(16), f = new Set();
        f.add("onComponentWillMount"), f.add("onComponentDidMount"), f.add("onComponentWillUnmount"), 
        f.add("onComponentShouldUpdate"), f.add("onComponentWillUpdate"), f.add("onComponentDidUpdate"), 
        t.default = l;
    }, function(e, t, n) {
        var r, i, o;
        !function(a, c) {
            i = [ e, n(68), n(70), n(71) ], r = c, void 0 !== (o = "function" == typeof r ? r.apply(t, i) : r) && (e.exports = o);
        }(0, function(e, t, n, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }
            function a(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t;
            }
            function c(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
            }
            function s(e, t) {
                var n = "data-clipboard-" + e;
                if (t.hasAttribute(n)) return t.getAttribute(n);
            }
            var u = i(t), l = i(n), d = i(r), f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, p = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            }(), h = function(e) {
                function t(e, n) {
                    o(this, t);
                    var r = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    return r.resolveOptions(n), r.listenClick(e), r;
                }
                return c(t, e), p(t, [ {
                    key: "resolveOptions",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, 
                        this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === f(e.container) ? e.container : document.body;
                    }
                }, {
                    key: "listenClick",
                    value: function(e) {
                        var t = this;
                        this.listener = (0, d.default)(e, "click", function(e) {
                            return t.onClick(e);
                        });
                    }
                }, {
                    key: "onClick",
                    value: function(e) {
                        var t = e.delegateTarget || e.currentTarget;
                        this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new u.default({
                            action: this.action(t),
                            target: this.target(t),
                            text: this.text(t),
                            container: this.container,
                            trigger: t,
                            emitter: this
                        });
                    }
                }, {
                    key: "defaultAction",
                    value: function(e) {
                        return s("action", e);
                    }
                }, {
                    key: "defaultTarget",
                    value: function(e) {
                        var t = s("target", e);
                        if (t) return document.querySelector(t);
                    }
                }, {
                    key: "defaultText",
                    value: function(e) {
                        return s("text", e);
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), 
                        this.clipboardAction = null);
                    }
                } ], [ {
                    key: "isSupported",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [ "copy", "cut" ], t = "string" == typeof e ? [ e ] : e, n = !!document.queryCommandSupported;
                        return t.forEach(function(e) {
                            n = n && !!document.queryCommandSupported(e);
                        }), n;
                    }
                } ]), t;
            }(l.default);
            e.exports = h;
        });
    }, function(e, t, n) {
        var r, i, o;
        !function(a, c) {
            i = [ e, n(69) ], r = c, void 0 !== (o = "function" == typeof r ? r.apply(t, i) : r) && (e.exports = o);
        }(0, function(e, t) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }(t), i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            }(), a = function() {
                function e(t) {
                    n(this, e), this.resolveOptions(t), this.initSelection();
                }
                return o(e, [ {
                    key: "resolveOptions",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this.action = e.action, this.container = e.container, this.emitter = e.emitter, 
                        this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = "";
                    }
                }, {
                    key: "initSelection",
                    value: function() {
                        this.text ? this.selectFake() : this.target && this.selectTarget();
                    }
                }, {
                    key: "selectFake",
                    value: function() {
                        var e = this, t = "rtl" == document.documentElement.getAttribute("dir");
                        this.removeFake(), this.fakeHandlerCallback = function() {
                            return e.removeFake();
                        }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, 
                        this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", 
                        this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", 
                        this.fakeElem.style.position = "absolute", this.fakeElem.style[t ? "right" : "left"] = "-9999px";
                        var n = window.pageYOffset || document.documentElement.scrollTop;
                        this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), 
                        this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, 
                        r.default)(this.fakeElem), this.copyText();
                    }
                }, {
                    key: "removeFake",
                    value: function() {
                        this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), 
                        this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), 
                        this.fakeElem = null);
                    }
                }, {
                    key: "selectTarget",
                    value: function() {
                        this.selectedText = (0, r.default)(this.target), this.copyText();
                    }
                }, {
                    key: "copyText",
                    value: function() {
                        var e = void 0;
                        try {
                            e = document.execCommand(this.action);
                        } catch (t) {
                            e = !1;
                        }
                        this.handleResult(e);
                    }
                }, {
                    key: "handleResult",
                    value: function(e) {
                        this.emitter.emit(e ? "success" : "error", {
                            action: this.action,
                            text: this.selectedText,
                            trigger: this.trigger,
                            clearSelection: this.clearSelection.bind(this)
                        });
                    }
                }, {
                    key: "clearSelection",
                    value: function() {
                        this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges();
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.removeFake();
                    }
                }, {
                    key: "action",
                    set: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                        if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"');
                    },
                    get: function() {
                        return this._action;
                    }
                }, {
                    key: "target",
                    set: function(e) {
                        if (void 0 !== e) {
                            if (!e || "object" !== (void 0 === e ? "undefined" : i(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                            if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                            if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                            this._target = e;
                        }
                    },
                    get: function() {
                        return this._target;
                    }
                } ]), e;
            }();
            e.exports = a;
        });
    }, function(e, t) {
        function n(e) {
            var t;
            if ("SELECT" === e.nodeName) e.focus(), t = e.value; else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
                var n = e.hasAttribute("readonly");
                n || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), 
                n || e.removeAttribute("readonly"), t = e.value;
            } else {
                e.hasAttribute("contenteditable") && e.focus();
                var r = window.getSelection(), i = document.createRange();
                i.selectNodeContents(e), r.removeAllRanges(), r.addRange(i), t = r.toString();
            }
            return t;
        }
        e.exports = n;
    }, function(e, t) {
        function n() {}
        n.prototype = {
            on: function(e, t, n) {
                var r = this.e || (this.e = {});
                return (r[e] || (r[e] = [])).push({
                    fn: t,
                    ctx: n
                }), this;
            },
            once: function(e, t, n) {
                function r() {
                    i.off(e, r), t.apply(n, arguments);
                }
                var i = this;
                return r._ = t, this.on(e, r, n);
            },
            emit: function(e) {
                var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), r = 0, i = n.length;
                for (r; r < i; r++) n[r].fn.apply(n[r].ctx, t);
                return this;
            },
            off: function(e, t) {
                var n = this.e || (this.e = {}), r = n[e], i = [];
                if (r && t) for (var o = 0, a = r.length; o < a; o++) r[o].fn !== t && r[o].fn._ !== t && i.push(r[o]);
                return i.length ? n[e] = i : delete n[e], this;
            }
        }, e.exports = n;
    }, function(e, t, n) {
        function r(e, t, n) {
            if (!e && !t && !n) throw new Error("Missing required arguments");
            if (!c.string(t)) throw new TypeError("Second argument must be a String");
            if (!c.fn(n)) throw new TypeError("Third argument must be a Function");
            if (c.node(e)) return i(e, t, n);
            if (c.nodeList(e)) return o(e, t, n);
            if (c.string(e)) return a(e, t, n);
            throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
        }
        function i(e, t, n) {
            return e.addEventListener(t, n), {
                destroy: function() {
                    e.removeEventListener(t, n);
                }
            };
        }
        function o(e, t, n) {
            return Array.prototype.forEach.call(e, function(e) {
                e.addEventListener(t, n);
            }), {
                destroy: function() {
                    Array.prototype.forEach.call(e, function(e) {
                        e.removeEventListener(t, n);
                    });
                }
            };
        }
        function a(e, t, n) {
            return s(document.body, e, t, n);
        }
        var c = n(72), s = n(73);
        e.exports = r;
    }, function(e, t) {
        t.node = function(e) {
            return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType;
        }, t.nodeList = function(e) {
            var n = Object.prototype.toString.call(e);
            return void 0 !== e && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in e && (0 === e.length || t.node(e[0]));
        }, t.string = function(e) {
            return "string" == typeof e || e instanceof String;
        }, t.fn = function(e) {
            return "[object Function]" === Object.prototype.toString.call(e);
        };
    }, function(e, t, n) {
        function r(e, t, n, r, o) {
            var a = i.apply(this, arguments);
            return e.addEventListener(n, a, o), {
                destroy: function() {
                    e.removeEventListener(n, a, o);
                }
            };
        }
        function i(e, t, n, r) {
            return function(n) {
                n.delegateTarget = o(n.target, t), n.delegateTarget && r.call(e, n);
            };
        }
        var o = n(74);
        e.exports = r;
    }, function(e, t) {
        function n(e, t) {
            for (;e && e.nodeType !== r; ) {
                if ("function" == typeof e.matches && e.matches(t)) return e;
                e = e.parentNode;
            }
        }
        var r = 9;
        if ("undefined" != typeof Element && !Element.prototype.matches) {
            var i = Element.prototype;
            i.matches = i.matchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector || i.webkitMatchesSelector;
        }
        e.exports = n;
    }, function(e, t, n) {
        (function(t) {
            function n(e, t, n) {
                function i(t) {
                    var n = v, r = g;
                    return v = g = void 0, k = t, m = e.apply(r, n);
                }
                function o(e) {
                    return k = e, b = setTimeout(l, t), S ? i(e) : m;
                }
                function s(e) {
                    var n = e - T, r = e - k, i = t - n;
                    return E ? O(i, y - r) : i;
                }
                function u(e) {
                    var n = e - T, r = e - k;
                    return void 0 === T || n >= t || n < 0 || E && r >= y;
                }
                function l() {
                    var e = w();
                    if (u(e)) return d(e);
                    b = setTimeout(l, s(e));
                }
                function d(e) {
                    return b = void 0, x && v ? i(e) : (v = g = void 0, m);
                }
                function f() {
                    void 0 !== b && clearTimeout(b), k = 0, v = T = g = b = void 0;
                }
                function p() {
                    return void 0 === b ? m : d(w());
                }
                function h() {
                    var e = w(), n = u(e);
                    if (v = arguments, g = this, T = e, n) {
                        if (void 0 === b) return o(T);
                        if (E) return b = setTimeout(l, t), i(T);
                    }
                    return void 0 === b && (b = setTimeout(l, t)), m;
                }
                var v, g, y, m, b, T, k = 0, S = !1, E = !1, x = !0;
                if ("function" != typeof e) throw new TypeError(c);
                return t = a(t) || 0, r(n) && (S = !!n.leading, E = "maxWait" in n, y = E ? _(a(n.maxWait) || 0, t) : y, 
                x = "trailing" in n ? !!n.trailing : x), h.cancel = f, h.flush = p, h;
            }
            function r(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t);
            }
            function i(e) {
                return !!e && "object" == typeof e;
            }
            function o(e) {
                return "symbol" == typeof e || i(e) && b.call(e) == u;
            }
            function a(e) {
                if ("number" == typeof e) return e;
                if (o(e)) return s;
                if (r(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = r(t) ? t + "" : t;
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(l, "");
                var n = f.test(e);
                return n || p.test(e) ? h(e.slice(2), n ? 2 : 8) : d.test(e) ? s : +e;
            }
            var c = "Expected a function", s = NaN, u = "[object Symbol]", l = /^\s+|\s+$/g, d = /^[-+]0x[0-9a-f]+$/i, f = /^0b[01]+$/i, p = /^0o[0-7]+$/i, h = parseInt, v = "object" == typeof t && t && t.Object === Object && t, g = "object" == typeof self && self && self.Object === Object && self, y = v || g || Function("return this")(), m = Object.prototype, b = m.toString, _ = Math.max, O = Math.min, w = function() {
                return y.Date.now();
            };
            e.exports = n;
        }).call(t, n(76));
    }, function(e, t) {
        var n;
        n = function() {
            return this;
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this");
        } catch (e) {
            "object" == typeof window && (n = window);
        }
        e.exports = n;
    }, function(e, t, n) {
        function r(e) {
            return n(i(e));
        }
        function i(e) {
            var t = o[e];
            if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
            return t;
        }
        var o = {
            "./events.ts": 7,
            "./state/entity.ts": 8,
            "./state/flow.ts": 4,
            "./state/graph.ts": 26,
            "./state/gui.ts": 6,
            "./state/tree.ts": 28,
            "./state/views.ts": 25
        };
        r.keys = function() {
            return Object.keys(o);
        }, r.resolve = i, e.exports = r, r.id = 77;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            function t(e) {
                return function() {
                    for (var t in this) "function" == typeof this[t][e] && this[t][e]();
                };
            }
            function n(e, n) {
                return void 0 === n && (n = {}), e.split(".").reduce(function(e, n) {
                    return e[n] = e[n] || {
                        reset: t("reset"),
                        watch: t("watch"),
                        unwatch: t("unwatch")
                    };
                }, n);
            }
            function r(t) {
                var r = e.getGraph(), i = r.entities, o = r.arcs, a = r.processes;
                return Object.keys(i).reduce(function(t, r) {
                    var c = n(r, t), s = i[r], u = Object.keys(o).map(function(e) {
                        return o[e];
                    }).filter(function(e) {
                        return e.entity === r && !e.port;
                    }).map(function(e) {
                        return e.process;
                    });
                    return c.id = r, Object.defineProperty(c, "val", {
                        get: function() {
                            return e.get(r);
                        },
                        set: function(t) {
                            return e.set(r, t);
                        }
                    }), c.update = function(t) {
                        e.update(r, t);
                    }, c.reset = function() {
                        null != s.value && e.set(r, s.value);
                    }, c.watch = function() {
                        e.on(r, function(e) {
                            return console.log(r, e);
                        });
                    }, c.unwatch = function() {
                        e.off(r);
                    }, c.streams = {}, u.forEach(function(t) {
                        var n = t.split(".").pop();
                        n && (c.streams[n] = {
                            start: function() {
                                e.start(t);
                            }
                        }, a[t].async && (c.streams[n].stop = function() {
                            e.stop(t);
                        }));
                    }), t;
                }, t);
            }
            return r({
                update: function() {
                    for (var e in this) "update" !== e && delete this[e];
                    r(this);
                }
            });
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.create = r;
    } ]);
});