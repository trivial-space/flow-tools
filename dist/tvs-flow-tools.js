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
        }, t.p = "", t(t.s = 29);
    }([ function(e, t, n) {
        "use strict";
        function r(e, t) {
            return t ? t + "." + e : e;
        }
        function i(e) {
            var t, n, i, o = e.value, s = Object(f.a)(), u = [], c = {};
            return c.HOT = {
                entity: c,
                type: d.PORT_TYPES.HOT
            }, c.COLD = {
                entity: c,
                type: d.PORT_TYPES.COLD
            }, c.id = function(e, n) {
                return s = r(e, n), t = n, c;
            }, c.val = function(e) {
                return o = e, c;
            }, c.updateVal = function(e) {
                return o = e(o), c;
            }, c.accept = function(e) {
                return n = e, c;
            }, c.reset = function() {
                return i = !0, c;
            }, c.getId = function() {
                return s;
            }, e.procedure && u.push(e), c.react = function(e, t, n) {
                var r = a(e, t, n);
                r.pidSuffix = v;
                var i = r.dependencies;
                return r.dependencies = [ {
                    entity: c,
                    type: d.PORT_TYPES.ACCUMULATOR
                } ], i && i.length && (r.dependencies = r.dependencies.concat(i)), u.push(r), c;
            }, c.getGraph = function() {
                var e = l.empty();
                return e.entities[s] = Object(d.createEntity)({
                    id: s,
                    value: o,
                    accept: n,
                    reset: i
                }), u.forEach(function(n) {
                    var i = n.dependencies, o = n.processId ? r(n.processId, t) : s + n.pidSuffix + (i && i.length ? ":" + i.reduce(function(e, t) {
                        var n = t.entity.getId();
                        return n === s ? e : e + ":" + n;
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
                    var u = Object(d.createArc)({
                        process: o,
                        entity: s
                    });
                    e.arcs[u.id] = u, e.processes[o] = Object(d.createProcess)({
                        id: o,
                        ports: a,
                        procedure: n.procedure,
                        async: n.async,
                        autostart: n.autostart,
                        delta: n.delta
                    });
                }), e;
            }, c;
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
        function s(e) {
            return e && "function" == typeof e.id && "function" == typeof e.getGraph && e.HOT && e.COLD;
        }
        function u(e, t) {
            for (var n in e) {
                var r = e[n];
                s(r) && r.id(n, t);
            }
            return e;
        }
        function c(e) {
            var t = [];
            for (var n in e) {
                var r = e[n];
                s(r) && t.push(r);
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
        }), t.isEntity = s, t.resolveEntityIds = u, t.getGraphFromAll = c;
        var l = n(19), d = n(9), f = n(18), p = this && this.__assign || Object.assign || function(e) {
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
        n.d(t, "a", function() {
            return r;
        }), n.d(t, "b", function() {
            return i;
        });
        var r = {
            ENTITY_INSPECT: "flow:entity_inspect",
            ENTITY_RESET: "flow:entity_reset",
            PROCESS_RUN: "flow:process_run",
            PROCESS_STOP: "flow:process_stop"
        }, i = {
            ENTITIES: {
                UPDATE_EDITED_VALUE: "gui:entities:update_edited_value",
                SET_EDIT_MODE: "gui:entities:set_edit_mode",
                SAVE_VALUE: "gui:entities:save",
                OPEN_PROCESS: "gui:entities:open_process",
                OPEN_ENTITY: "gui:entities:open_entity"
            },
            GRAPH: {
                UPDATE_SCALE: "gui:graph:update_scale",
                UPDATE_SIZE: "gui:graph:update_size"
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
        var i = n(39);
        t.TypeStyle = i.TypeStyle;
        var o = n(41);
        t.types = o;
        var a = n(23);
        t.extend = a.extend, t.classes = a.classes, t.media = a.media;
        var s = new i.TypeStyle({
            autoGenerateTag: !0
        });
        t.setStylesTarget = s.setStylesTarget, t.cssRaw = s.cssRaw, t.cssRule = s.cssRule, 
        t.forceRenderStyles = s.forceRenderStyles, t.fontFace = s.fontFace, t.getStyles = s.getStyles, 
        t.keyframes = s.keyframes, t.reinit = s.reinit, t.style = s.style, t.createTypeStyle = r;
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "action", function() {
            return a;
        }), n.d(t, "windowSize", function() {
            return s;
        }), n.d(t, "element", function() {
            return u;
        }), n.d(t, "mouse", function() {
            return c;
        }), n.d(t, "mouseDrag", function() {
            return l;
        }), n.d(t, "dragDeltas", function() {
            return d;
        });
        var r = n(0), i = n(53), o = n(54), a = Object(r.val)(), s = Object(r.asyncStreamStart)(null, i.a), u = Object(r.val)(), c = Object(r.asyncStream)([ u.HOT ], function(e, t) {
            return Object(o.a)(e, {
                el: t,
                enableRightButton: !0
            });
        }), l = Object(r.stream)([ c.HOT ], function(e) {
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
        });
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "activeEntity", function() {
            return c;
        }), n.d(t, "activeProcess", function() {
            return l;
        }), n.d(t, "activeNode", function() {
            return d;
        }), n.d(t, "watchingEntity", function() {
            return f;
        }), n.d(t, "activeValue", function() {
            return p;
        }), n.d(t, "editedValue", function() {
            return h;
        }), n.d(t, "entityValueView", function() {
            return v;
        }), n.d(t, "entityViewProps", function() {
            return g;
        });
        var r = n(0), i = n(7), o = n(3), a = n(8), s = n(1), u = n(5), c = Object(r.val)({}).react([ o.action.HOT, a.graph.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if (r === s.b.ENTITIES.OPEN_ENTITY) return n.entities[i];
        }).react([ o.mouse.HOT ], function(e, t) {
            if (t.pressed[2] && t.pressed[2].target.closest("svg")) return {
                id: ""
            };
        }).accept(i.b), l = Object(r.val)({}).react([ o.action.HOT, a.graph.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if (r === s.b.ENTITIES.OPEN_PROCESS) return n.processes[i];
        }).react([ o.mouse.HOT ], function(e, t) {
            if (t.pressed[2] && t.pressed[2].target.closest("svg")) return {
                id: ""
            };
        }).accept(i.b), d = Object(r.val)({}).react([ c.HOT ], function(e, t) {
            return t;
        }).react([ l.HOT ], function(e, t) {
            return t;
        }), f = Object(r.val)(!0).react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            return n === s.b.ENTITIES.SET_EDIT_MODE ? !r : n === s.b.ENTITIES.SAVE_VALUE || void 0;
        }).react([ c.HOT ], function() {
            return !0;
        }).accept(i.b), p = Object(r.asyncStream)([ a.runtime.COLD, c.HOT, u.visibility.HOT, f.HOT ], function(e, t, n, r, i) {
            if (n && n.id) {
                var o = t.get(n.id);
                if (e(null != o ? o : ""), r.entities && i) return t.on(n.id, e), function() {
                    return t.off(n.id, e);
                };
            } else e("");
        }), h = Object(r.val)("").react([ o.action.HOT, a.runtime.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if (r === s.b.ENTITIES.UPDATE_EDITED_VALUE) return i;
            e && r === s.b.ENTITIES.SAVE_VALUE && requestAnimationFrame(function() {
                try {
                    n.set(i, JSON.parse(e));
                } catch (t) {
                    console.error("could not save value to entity", i, e), console.error(t);
                }
            });
        }).react([ p.HOT ], function() {
            return "";
        }).accept(Object(i.a)(i.b, i.d)), v = Object(r.stream)([ p.HOT, f.HOT ], function(e, t) {
            return {
                value: e,
                watching: t
            };
        }).val({
            value: null,
            watching: !0
        }), g = Object(r.stream)([ c.HOT, f.HOT ], function(e, t) {
            return {
                entity: e,
                watching: t
            };
        });
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            e.react([ p.COLD, h.HOT ], function(e, n, r) {
                if (n === t) return e.zIndex = r, e;
            });
        }
        function i(e, t) {
            return e.height > t.height - 20 && (e.height = t.height - 20), e.width > t.width - 20 && (e.width = t.width - 20), 
            e.top > t.height - 20 && (e.top = t.height - 20), e.left > t.width - 20 && (e.left = t.width - 20), 
            e.top < 0 && (e.top = 0), e.left < 0 && (e.left = 0), e;
        }
        function o(e) {
            e.react([ u.windowSize.HOT ], i);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "title", function() {
            return d;
        }), n.d(t, "visibility", function() {
            return f;
        }), n.d(t, "activeWindow", function() {
            return p;
        }), n.d(t, "zIndex", function() {
            return h;
        }), n.d(t, "controlsPosition", function() {
            return v;
        }), n.d(t, "treeWindow", function() {
            return g;
        }), n.d(t, "graphWindow", function() {
            return y;
        }), n.d(t, "entitiesWindow", function() {
            return m;
        });
        var a = n(0), s = n(7), u = n(3), c = n(1), l = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, d = Object(a.val)("").accept(s.c), f = Object(a.val)({
            tree: !1,
            graph: !1,
            entities: !1
        }).react([ u.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if (n === c.b.MAIN.UPDATE_VISIBILITY) return l({}, e, (i = {}, i[r] = !e[r], i));
            if (n === c.b.MAIN.CLOSE_WINDOW) return l({}, e, (o = {}, o[r] = !1, o));
            var i, o;
        }).accept(s.b), p = Object(a.stream)([ u.action.HOT ], function(e) {
            var t = e.type, n = e.payload;
            if (t === c.b.MAIN.SET_ACTIVE_WINDOW || t === c.b.MAIN.UPDATE_VISIBILITY) return n;
        }).accept(Object(s.a)(s.b, s.d)).val(""), h = Object(a.val)(0).react([ p.HOT ], function(e) {
            return e + 1;
        }), v = Object(a.val)({
            left: 0,
            top: 0,
            zIndex: 0
        }).react([ p.COLD, u.dragDeltas.HOT, u.mouse.COLD, u.windowSize.COLD ], function(e, t, n, r, i) {
            var o = r.pressed[0] && r.pressed[0].target;
            if ("controls" === t && o && o.closest(".tvs-flow-controls") && (n.x || n.y)) return e.left -= n.x, 
            e.top -= n.y, e.top < 0 && (e.top = 0), e.left < 0 && (e.left = 0), e.top > i.height - 20 && (e.top = i.height - 20), 
            e.left > i.width - 20 && (e.left = i.width - 20), e;
        }).accept(s.b), g = Object(a.val)({
            top: 100,
            left: 0,
            width: 300,
            height: 400,
            zIndex: 0
        }).react([ p.COLD, u.mouse.COLD, u.dragDeltas.HOT, u.windowSize.COLD ], function(e, t, n, r, o) {
            var a = n.pressed[0] && n.pressed[0].target;
            if ("tree" === t && a && a.closest(".tvs-flow-tree") && (r.x || r.y)) return "resize" === a.className ? (e.width -= r.x, 
            e.height -= r.y) : (e.left -= r.x, e.top -= r.y), i(e, o);
        }).accept(s.b), y = Object(a.val)({
            top: 200,
            left: 100,
            width: 600,
            height: 600,
            zIndex: 0
        }).react([ p.COLD, u.mouse.COLD, u.dragDeltas.HOT, u.windowSize.COLD ], function(e, t, n, r, o) {
            var a = n.pressed[0] && n.pressed[0].target;
            if ("graph" === t && a && a.closest(".tvs-flow-graph") && (r.x || r.y)) {
                if ("resize" === a.className) return e.width -= r.x, e.height -= r.y, i(e, o);
                if (!a.closest("svg")) return e.left -= r.x, e.top -= r.y, i(e, o);
            }
        }).accept(s.b), m = Object(a.val)({
            top: 50,
            left: 400,
            width: 400,
            height: 500,
            zIndex: 0
        }).react([ p.COLD, u.mouse.COLD, u.dragDeltas.HOT, u.windowSize.COLD ], function(e, t, n, r, o) {
            var a = n.pressed[0] && n.pressed[0].target;
            if ("entities" === t && a && a.closest(".tvs-flow-entities") && !a.closest("pre") && (r.x || r.y)) return "resize" === a.className ? (e.width -= r.x, 
            e.height -= r.y) : (e.left -= r.x, e.top -= r.y), i(e, o);
        }).accept(s.b);
        r(v, "controls"), r(g, "tree"), r(y, "graph"), r(m, "entities"), o(v), o(g), o(y), 
        o(m);
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o;
        }), n.d(t, "d", function() {
            return s;
        }), n.d(t, "e", function() {
            return u;
        }), n.d(t, "c", function() {
            return c;
        }), n.d(t, "b", function() {
            return l;
        }), n.d(t, "g", function() {
            return d;
        }), n.d(t, "f", function() {
            return f;
        });
        var r = n(2), i = (n.n(r), n(42)), o = (n.n(i), "white"), a = Object(i.rgba)(40, 40, 40, .75).toString(), s = 16, u = "cyan", c = {
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
            fontSize: s,
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
        n.d(t, "d", function() {
            return r;
        }), n.d(t, "b", function() {
            return i;
        }), n.d(t, "c", function() {
            return o;
        }), n.d(t, "a", function() {
            return a;
        });
        var r = function(e, t) {
            return e !== t;
        }, i = function(e) {
            return null != e;
        }, o = function(e) {
            return e && e.length;
        }, a = function(e, t) {
            return function(n, r) {
                return e(n, r) && t(n, r);
            };
        };
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "runtime", function() {
            return u;
        }), n.d(t, "graph", function() {
            return c;
        }), n.d(t, "state", function() {
            return l;
        }), n.d(t, "entityTree", function() {
            return d;
        });
        var r = n(0), i = n(24), o = n(3), a = n(7), s = n(1), u = Object(r.val)().react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            switch (n) {
              case s.a.PROCESS_RUN:
                return void e.start(r);

              case s.a.PROCESS_STOP:
                return void e.stop(r);

              case s.a.ENTITY_RESET:
                return void e.set(r, e.getGraph().entities[r].value);

              case s.a.ENTITY_INSPECT:
                return void console.log(r, e.get(r));
            }
        }).accept(a.b), c = Object(r.stream)([ u.HOT ], function(e) {
            return e.getGraph();
        }), l = Object(r.stream)([ u.HOT ], function(e) {
            return e.getState();
        }), d = Object(r.stream)([ c.HOT ], function(e) {
            return Object(i.createEntityTree)(e.entities);
        });
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = e.id, n = void 0 === t ? Object(a.a)() : t, r = e.value, i = e.json, o = e.accept, s = e.reset, c = e.meta;
            return null == r && i && (r = JSON.parse(i)), {
                id: n,
                value: r,
                accept: o,
                reset: s,
                meta: u({}, c)
            };
        }
        function i(e, t) {
            var n = e.id, r = void 0 === n ? Object(a.a)() : n, i = e.ports, o = void 0 === i ? [] : i, l = e.procedure, d = e.code, f = e.autostart, p = void 0 !== f && f, h = e.async, v = void 0 !== h && h, g = e.delta, y = void 0 !== g && g, m = e.meta;
            if (null == l && null != d && (l = Object(s.a)(d, t)), null == l) throw TypeError("Process must have procedure or code set");
            return y && !o.length && o.push(c.HOT), {
                id: r,
                ports: o,
                procedure: l,
                autostart: p,
                async: v,
                delta: y,
                meta: u({}, m)
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
                meta: u({}, o)
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.createEntity = r, t.createProcess = i, t.createArc = o, n.d(t, "PORT_TYPES", function() {
            return c;
        });
        var a = n(18), s = n(33), u = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, c = {
            COLD: "COLD",
            HOT: "HOT",
            ACCUMULATOR: "ACCUMULATOR"
        };
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            function n(e) {
                return e.replace(/([A-Z])/g, "-$1").replace(/^ms-/, "-ms-").toLowerCase();
            }
            function r(e) {
                return "@" === e.charAt(0);
            }
            function i(e) {
                return null != e && "object" == typeof e && !Array.isArray(e);
            }
            function o(e) {
                for (var t = 5381, n = e.length; n; ) t = 33 * t ^ e.charCodeAt(--n);
                return (t >>> 0).toString(36);
            }
            function a(e, t) {
                return "number" != typeof t || 0 === t || y[e] || (t += "px"), e + ":" + String(t);
            }
            function s(e) {
                return e.sort(function(e, t) {
                    return e[0] > t[0] ? 1 : -1;
                });
            }
            function u(e, r) {
                for (var o = [], a = [], u = !1, c = 0, l = Object.keys(e); c < l.length; c++) {
                    var d = l[c], f = e[d];
                    d === t.IS_UNIQUE ? u = !!f : i(f) ? a.push([ d.trim(), f ]) : o.push([ n(d.trim()), f ]);
                }
                return {
                    properties: s(o),
                    nestedStyles: r ? a : s(a),
                    isUnique: u
                };
            }
            function c(e) {
                for (var t = [], n = 0, r = e; n < r.length; n++) {
                    var i = r[n], o = i[0], s = i[1];
                    !function(e, n) {
                        null != n && (Array.isArray(n) ? n.forEach(function(n) {
                            n && t.push(a(e, n));
                        }) : t.push(a(e, n)));
                    }(o, s);
                }
                return t.join(";");
            }
            function l(e, t) {
                return e.indexOf("&") > -1 ? e.replace(/&/g, t) : t + " " + e;
            }
            function d(e, t, n, i, o) {
                var a = u(n, !!t), s = a.properties, f = a.nestedStyles, p = a.isUnique, h = c(s), v = h;
                if (r(t)) {
                    var y = e.add(new E(t, o ? void 0 : h, e.hash));
                    if (h && o) {
                        var m = y.add(new x(h, y.hash, p ? "u" + (++g).toString(36) : void 0));
                        i.push([ o, m ]);
                    }
                    for (var b = 0, _ = f; b < _.length; b++) {
                        var w = _[b], O = w[0], k = w[1];
                        v += O + d(y, O, k, i, o);
                    }
                } else {
                    var S = o ? l(t, o) : t;
                    if (h) {
                        var m = e.add(new x(h, e.hash, p ? "u" + (++g).toString(36) : void 0));
                        i.push([ S, m ]);
                    }
                    for (var T = 0, C = f; T < C.length; T++) {
                        var j = C[T], O = j[0], k = j[1];
                        v += O + d(e, O, k, i, S);
                    }
                }
                return v;
            }
            function f(e, t, n, r, i) {
                for (var o = new S(e.hash), a = [], s = d(o, t, n, a), u = "f" + o.hash(s), c = i ? i + "_" + u : u, f = 0, p = a; f < p.length; f++) {
                    var h = p[f], v = h[0], g = h[1], y = r ? l(v, "." + c) : v;
                    g.add(new T(y, g.hash, void 0, s));
                }
                return {
                    cache: o,
                    pid: s,
                    id: c
                };
            }
            function p(e) {
                return e.values().map(function(e) {
                    return e.getStyles();
                }).join("");
            }
            function h(t, n) {
                return void 0 === t && (t = o), void 0 === n && (n = void 0 !== e && !1), new C(t, n);
            }
            var v = this && this.__extends || function() {
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
            var g = 0;
            t.IS_UNIQUE = "__DO_NOT_DEDUPE_STYLE__";
            for (var y = {
                "animation-iteration-count": !0,
                "box-flex": !0,
                "box-flex-group": !0,
                "column-count": !0,
                "counter-increment": !0,
                "counter-reset": !0,
                flex: !0,
                "flex-grow": !0,
                "flex-positive": !0,
                "flex-shrink": !0,
                "flex-negative": !0,
                "font-weight": !0,
                "line-clamp": !0,
                "line-height": !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                "tab-size": !0,
                widows: !0,
                "z-index": !0,
                zoom: !0,
                "fill-opacity": !0,
                "stroke-dashoffset": !0,
                "stroke-opacity": !0,
                "stroke-width": !0
            }, m = 0, b = [ "-webkit-", "-ms-", "-moz-", "-o-" ]; m < b.length; m++) for (var _ = b[m], w = 0, O = Object.keys(y); w < O.length; w++) {
                var k = O[w];
                y[_ + k] = !0;
            }
            t.stringHash = o;
            var S = function() {
                function e(e) {
                    this.hash = e, this.changeId = 0, this._children = {}, this._keys = [], this._counters = {};
                }
                return e.prototype.values = function() {
                    var e = this;
                    return this._keys.map(function(t) {
                        return e._children[t];
                    });
                }, e.prototype.add = function(t) {
                    var n = this._counters[t.id] || 0, r = this._children[t.id] || t.clone();
                    if (this._counters[t.id] = n + 1, 0 === n) this._keys.push(r.id), this._children[r.id] = r, 
                    this.changeId++; else {
                        if (r.getIdentifier() !== t.getIdentifier()) throw new TypeError("Hash collision: " + t.getStyles() + " === " + r.getStyles());
                        if (this._keys.splice(this._keys.indexOf(t.id), 1), this._keys.push(t.id), r instanceof e && t instanceof e) {
                            var i = r.changeId;
                            r.merge(t), r.changeId !== i && this.changeId++;
                        }
                    }
                    return r;
                }, e.prototype.remove = function(t) {
                    var n = this._counters[t.id];
                    if (n > 0) {
                        this._counters[t.id] = n - 1;
                        var r = this._children[t.id];
                        if (1 === n) delete this._counters[t.id], delete this._children[t.id], this._keys.splice(this._keys.indexOf(t.id), 1), 
                        this.changeId++; else if (r instanceof e && t instanceof e) {
                            var i = r.changeId;
                            r.unmerge(t), r.changeId !== i && this.changeId++;
                        }
                    }
                }, e.prototype.merge = function(e) {
                    for (var t = 0, n = e.values(); t < n.length; t++) {
                        var r = n[t];
                        this.add(r);
                    }
                    return this;
                }, e.prototype.unmerge = function(e) {
                    for (var t = 0, n = e.values(); t < n.length; t++) {
                        var r = n[t];
                        this.remove(r);
                    }
                    return this;
                }, e.prototype.clone = function() {
                    return new e(this.hash).merge(this);
                }, e;
            }();
            t.Cache = S;
            var T = function() {
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
            t.Selector = T;
            var x = function(e) {
                function t(t, n, r) {
                    void 0 === r && (r = "c" + n(t));
                    var i = e.call(this, n) || this;
                    return i.style = t, i.hash = n, i.id = r, i;
                }
                return v(t, e), t.prototype.getStyles = function() {
                    return this.values().map(function(e) {
                        return e.getStyles();
                    }).join(",") + "{" + this.style + "}";
                }, t.prototype.getIdentifier = function() {
                    return this.style;
                }, t.prototype.clone = function() {
                    return new t(this.style, this.hash, this.id).merge(this);
                }, t;
            }(S);
            t.Style = x;
            var E = function(e) {
                function t(t, n, r, i, o) {
                    void 0 === n && (n = ""), void 0 === i && (i = "a" + r(t + "." + n)), void 0 === o && (o = "");
                    var a = e.call(this, r) || this;
                    return a.rule = t, a.style = n, a.hash = r, a.id = i, a.pid = o, a;
                }
                return v(t, e), t.prototype.getStyles = function() {
                    return this.rule + "{" + this.style + p(this) + "}";
                }, t.prototype.getIdentifier = function() {
                    return this.pid + "." + this.rule + "." + this.style;
                }, t.prototype.clone = function() {
                    return new t(this.rule, this.style, this.hash, this.id, this.pid).merge(this);
                }, t;
            }(S);
            t.Rule = E;
            var C = function(e) {
                function t(t, n, r) {
                    void 0 === r && (r = "f" + (++g).toString(36));
                    var i = e.call(this, t) || this;
                    return i.hash = t, i.debug = n, i.id = r, i;
                }
                return v(t, e), t.prototype.registerStyle = function(e, t) {
                    var n = f(this, "&", e, !0, this.debug ? t : void 0), r = n.cache, i = n.id;
                    return this.merge(r), i;
                }, t.prototype.registerKeyframes = function(e, t) {
                    return this.registerHashRule("@keyframes", e, t);
                }, t.prototype.registerHashRule = function(e, t, n) {
                    var r = f(this, "", t, !1, this.debug ? n : void 0), i = r.cache, o = r.pid, a = r.id, s = new E(e + " " + a, void 0, this.hash, void 0, o);
                    return this.add(s.merge(i)), a;
                }, t.prototype.registerRule = function(e, t) {
                    this.merge(f(this, e, t, !1).cache);
                }, t.prototype.registerCss = function(e) {
                    this.merge(f(this, "", e, !1).cache);
                }, t.prototype.getStyles = function() {
                    return p(this);
                }, t.prototype.getIdentifier = function() {
                    return this.id;
                }, t.prototype.clone = function() {
                    return new t(this.hash, this.debug, this.id).merge(this);
                }, t;
            }(S);
            t.FreeStyle = C, t.create = h;
        }).call(t, n(37));
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s;
        }), n.d(t, "c", function() {
            return u;
        }), n.d(t, "b", function() {
            return c;
        });
        var r = n(2), i = (n.n(r), n(6)), o = (Object(r.style)({
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
        }, s = Object(r.style)(i.c, o), u = Object(r.style)(i.c, o, a), c = Object(r.style)({
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
            }, [ "title", "entities" ], [ "path", {
                d: "M16.641 1.688l5.672 5.672-5.672 5.625h4.359v8.016h-8.016v-8.016h3.656l-5.625-5.625v3.656h-8.016v-8.016h8.016v4.359zM3 21v-8.016h8.016v8.016h-8.016z"
            } ] ];
        }
        function s() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "play" ], [ "path", {
                d: "M6 4l20 12-20 12z"
            } ] ];
        }
        function u() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.a.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "stop" ], [ "path", {
                d: "M4 4h24v24h-24z"
            } ] ];
        }
        function c() {
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
        t.a = r, t.d = i, t.e = o, t.c = a, t.g = s, t.j = u, t.k = c, t.h = l, t.i = d, 
        t.b = f, t.f = p;
        var h = n(21), v = n(6), g = Object(h.b)({
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
            return "number" == typeof e ? e : .01 * parseFloat(e);
        }
        function i(e) {
            return 100 * e + "%";
        }
        function o(e) {
            var t = /[\s]*([a-z-]+)[\s]*\([\s]*([^\)]+)[\s]*\)[\s]*/gi.exec(e);
            if (t && t.length) return [ t[1] ].concat(t[2].split(","));
        }
        function a(e, t) {
            return e + "(" + t.join(",") + ")";
        }
        t.ensurePercent = r, t.formatPercent = i, t.parseCSSFunction = o, t.cssFunction = a;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = e.title, n = e.onclick, r = e.icon, a = e.key, s = e.class, u = [ "button", {
                class: Object(i.classes)(o.c, s),
                onmouseup: n,
                title: t
            }, r ];
            return a && (u[1].key = a), u;
        }
        t.a = r;
        var i = n(2), o = (n.n(i), n(11));
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a;
        }), n.d(t, "e", function() {
            return s;
        }), n.d(t, "d", function() {
            return u;
        }), n.d(t, "c", function() {
            return c;
        }), n.d(t, "b", function() {
            return l;
        });
        var r = n(2), i = (n.n(r), n(6)), o = this && this.__assign || Object.assign || function(e) {
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
        }), s = Object(r.style)(i.c, {
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
        }), u = Object(r.style)(i.b, {
            overflow: "auto",
            position: "relative",
            flexGrow: 1,
            padding: 5
        }), c = Object(r.style)(i.g, {
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
            return p;
        }), n.d(t, "nodeState", function() {
            return h;
        }), n.d(t, "graphEntities", function() {
            return v;
        }), n.d(t, "graphProcesses", function() {
            return g;
        }), n.d(t, "viewData", function() {
            return y;
        });
        var i = n(0), o = n(3), a = n(7), s = n(8), u = n(9), c = n(5), l = n(1), d = n(4), f = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, p = Object(i.val)({
            width: 0,
            height: 0,
            offsetX: 0,
            offsetY: 0,
            scale: 1
        }).react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            return n === l.b.GRAPH.UPDATE_SCALE && r !== e.scale ? (e.scale = r, e) : n === l.b.GRAPH.UPDATE_SIZE && (r.width && r.width !== e.width || r.height && r.height !== e.height) ? (e.width = r.width, 
            e.height = r.height, e) : void 0;
        }).react([ o.mouse.COLD, o.dragDeltas.HOT ], function(e, t, n) {
            var r = t.pressed[0] && t.pressed[0].target;
            if (r && "graph-ui" === r.id && (n.x || n.y)) return e.offsetX += n.x, e.offsetY += n.y, 
            e;
        }).accept(a.b), h = Object(i.val)({}).react([ s.graph.HOT, c.graphWindow.COLD ], function(e, t, n) {
            for (var r in t.entities) e[r] || (e[r] = {
                x: Math.random() * n.width,
                y: Math.random() * n.height
            });
        }).react([ d.activeEntity.COLD, o.mouse.COLD, o.dragDeltas.HOT, p.COLD ], function(e, t, n, r, i) {
            var o = t.id, a = n.pressed[0] && n.pressed[0].target, s = a && (a.dataset.eid || a.parentElement && a.parentElement.dataset.eid);
            if (s && o === s && e[o] && (r.x || r.y)) return e[o].x -= r.x * i.scale, e[o].y -= r.y * i.scale, 
            e;
        }).accept(a.b), v = Object(i.stream)([ s.graph.HOT, d.activeNode.HOT ], function(e, t) {
            var n = {}, i = {}, o = 0;
            for (var a in e.entities) {
                var s = e.entities[a], u = r(a), c = u.label, l = u.group;
                i[l] = i[l] || o++ % 7 + 1;
                var d = {
                    id: s.id,
                    class: "group-" + i[l],
                    label: c,
                    active: s.id === t.id
                };
                null != s.accept && (d.accept = !0), null != s.value && (d.initial = !0), n[a] = d;
            }
            return n;
        }).react([ h.HOT ], function(e, t) {
            for (var n in e) e[n].x = t[n].x, e[n].y = t[n].y;
            return e;
        }), g = Object(i.stream)([ s.graph.HOT, d.activeNode.HOT ], function(e, t) {
            var n = {};
            for (var i in e.processes) {
                var o = e.processes[i], a = f({
                    id: i
                }, r(i), {
                    from: [],
                    async: o.async,
                    autostart: o.autostart,
                    active: o.id === t.id,
                    acc: o.ports && o.ports.includes(u.PORT_TYPES.ACCUMULATOR)
                });
                for (var s in e.arcs) {
                    var c = e.arcs[s];
                    c.process === i && (null != c.port ? a.from.push([ c.entity, o.ports && o.ports[c.port] ]) : a.to = c.entity);
                }
                n[i] = a;
            }
            return n;
        }), y = Object(i.stream)([ v.HOT, g.HOT ], function(e, t) {
            var n = [], r = [];
            for (var i in t) {
                var o = t[i], a = e[o.to];
                if (o.class = a.class, o.from.length) {
                    o.x = 0, o.y = 0;
                    for (var s = 0, c = o.from; s < c.length; s++) {
                        var l = c[s], d = l[0], f = l[1], p = e[d], h = p.x - a.x, v = p.y - a.y;
                        f === u.PORT_TYPES.COLD && (h /= 2, v /= 2), o.x += h, o.y += v;
                    }
                    var g = Math.sqrt(o.x * o.x + o.y * o.y);
                    o.x = 50 * o.x / g + a.x, o.y = 50 * o.y / g + a.y;
                    for (var y = 0, m = o.from; y < m.length; y++) {
                        var b = m[y], d = b[0], f = b[1], p = e[d];
                        o.fromIsActive = o.fromIsActive || p.active, r.push({
                            from: p,
                            to: o,
                            class: "from" + (f === u.PORT_TYPES.COLD ? " cold" : ""),
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
        }).react([ p.HOT ], function(e, t) {
            return e.viewBox = {
                x: t.offsetX * t.scale,
                y: t.offsetY * t.scale,
                width: t.width * t.scale,
                height: t.height * t.scale
            }, e;
        });
    }, function(e, t, n) {
        e.exports = n(58).default, e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = s, n = 0;
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
        }, s = [], u = {}, c = 0; c < 256; c++) s[c] = (c + 256).toString(16).substr(1), 
        u[s[c]] = c;
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
            return s;
        });
        var r = n(35), i = n(38), o = (n.n(i), n(22));
        n.d(t, "a", function() {
            return o.a;
        });
        var a = new r.a({
            autoGenerateTag: !0
        }), s = (a.setStylesTarget, a.cssRaw, a.cssRule, a.forceRenderStyles, a.fontFace, 
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
                if (null != a && !1 !== a) for (var s in a) {
                    var u = a[s];
                    (u || 0 === u) && ("$nest" === s && u ? n[s] = n.$nest ? i(n.$nest, u) : u : -1 !== s.indexOf("&") || 0 === s.indexOf("@media") ? n[s] = n[s] ? i(n[s], u) : u : n[s] = u);
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
                if (null != a && !1 !== a) for (var s in a) {
                    var u = a[s];
                    (u || 0 === u) && ("$nest" === s && u ? n[s] = n.$nest ? i(n.$nest, u) : u : -1 !== s.indexOf("&") || 0 === s.indexOf("@media") ? n[s] = n[s] ? i(n[s], u) : u : n[s] = u);
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
                $nest: (s = {}, s[a] = i.apply(void 0, t), s)
            };
            var s;
        };
        var o = function(e) {
            return "string" == typeof e ? e : e + "px";
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            void 0 === t && (t = ".");
            var n = {};
            return Object.keys(e).sort().forEach(function(r) {
                var i = e[r], o = i.id.split(t), a = n, s = o.slice(), u = [];
                o.forEach(function() {
                    var e = s.shift();
                    s.length ? (u.push(e), a = a[e] = a[e] || {
                        __path__: u.join(t)
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "entitiesWindowProps", function() {
            return a;
        }), n.d(t, "controlProps", function() {
            return s;
        }), n.d(t, "treeWindowProps", function() {
            return u;
        }), n.d(t, "graphWindowProps", function() {
            return c;
        });
        var r = n(0), i = n(4), o = n(5), a = Object(r.stream)([ o.entitiesWindow.HOT, i.activeNode.HOT, o.activeWindow.HOT ], function(e, t, n) {
            return {
                dimensions: e,
                node: t,
                window: n
            };
        }).val({}), s = Object(r.stream)([ o.visibility.HOT, o.controlsPosition.HOT ], function(e, t) {
            return {
                visibility: e,
                position: t
            };
        }), u = Object(r.stream)([ o.treeWindow.HOT, o.activeWindow.HOT ], function(e, t) {
            return {
                dimensions: e,
                window: t
            };
        }).val({}), c = Object(r.stream)([ o.graphWindow.HOT, o.activeWindow.HOT ], function(e, t) {
            return {
                dimensions: e,
                window: t
            };
        }).val({});
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "treeFold", function() {
            return l;
        }), n.d(t, "treeData", function() {
            return d;
        });
        var r = n(0), i = n(8), o = n(3), a = n(1), s = n(7), u = n(4), c = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, l = Object(r.val)({}).react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if (n === a.b.TREE.TOGGLE_LEVEL) return c({}, e, (i = {}, i[r] = !e[r], i));
            var i;
        }).accept(s.b), d = Object(r.stream)([ l.HOT, i.entityTree.HOT, u.activeEntity.HOT ], function(e, t, n) {
            return {
                fold: e,
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
        function r() {
            for (var e in p) p[e]();
            p = {}, h = !0;
        }
        function i(e, t) {
            h && (requestAnimationFrame(r), h = !1), p[e] = t;
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
            return function t(s, u) {
                var c = u.getId(), l = c + s.name;
                if (o[l]) return o[l];
                var p = function(o) {
                    function u() {
                        var t = null !== o && o.apply(this, arguments) || this;
                        return t.state = {
                            current: e.get(c)
                        }, t.updateAsync = function() {
                            i(l, function() {
                                t.setState(function(t) {
                                    return t.current = e.get(c), t;
                                });
                            });
                        }, t;
                    }
                    return d(u, o), u.prototype.render = function() {
                        return a(s(this.state.current, r, t));
                    }, u.prototype.componentDidMount = function() {
                        n && console.log("component mounted!", this), e.on(c, this.updateAsync);
                    }, u.prototype.componentWillUnmount = function() {
                        n && console.log("component will unmount!", this), e.off(c, this.updateAsync);
                    }, u;
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
        var s = n(56), u = n.n(s), c = n(28), l = n.n(c), d = this && this.__extends || function() {
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
        }(u.a), p = {}, h = !0;
    }, function(e, t, n) {
        e.exports = n(59).default, e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "ui", function() {
            return s;
        }), n.d(t, "utils", function() {
            return u;
        });
        var r = n(30), i = n(24), o = n(20), a = n(27);
        t.default = r;
        var s = r, u = {
            entityTree: i,
            webpack: o,
            yoyo: a
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            var r = t.getId(), i = "tvsFlowTools" + (e ? "::" + e : "") + "::" + r, o = localStorage.getItem(i);
            if (o) {
                var a = JSON.parse(o);
                a.zIndex && (a.zIndex = 0), n.set(r, b({}, n.get(r), a));
            }
            n.on(t.getId(), function(e) {
                return localStorage.setItem(i, JSON.stringify(e));
            });
        }
        function i(e, t) {
            function n(e) {
                requestAnimationFrame(function() {
                    v.set(d.runtime.getId(), e);
                });
            }
            function i() {
                document.body.removeChild(O), k.destroy();
            }
            var p = b({
                debug: !1,
                graph: null
            }, t), v = o.a.create();
            v.addGraph(Object(a.getGraphFromModules)(_)), v.flush(), e && v.set(c.title.getId(), e), 
            p.graph && v.set(f.nodeState.getId(), p.graph), r(e, f.viewBox, v), r(e, f.nodeState, v), 
            r(e, c.visibility, v), r(e, c.entitiesWindow, v), r(e, c.graphWindow, v), r(e, c.treeWindow, v), 
            r(e, c.controlsPosition, v);
            var y = Object(u.flowComponentFactory)(v, l.action.getId(), p.debug), w = Object(s.a)(y), O = document.createElement("div");
            O.className = "tvs-flow-tools-container", document.body.appendChild(O), g.a.render(m()(w), O), 
            v.set(l.element.getId(), O);
            var k = new h.a(".tvs-save-graph", {
                text: function() {
                    return JSON.stringify(v.get(f.nodeState.getId()), null, "  ");
                }
            });
            return k.on("success", function(e) {
                return console.log("saved graph to clipboard", e);
            }), k.on("error", function(e) {
                return console.log("error while saving graph to clipboard", e);
            }), {
                updateFlow: n,
                dispose: i,
                getState: function() {
                    return v;
                },
                getElement: function() {
                    return O;
                }
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.start = i;
        var o = n(31), a = n(20), s = n(34), u = n(27), c = n(5), l = n(3), d = n(8), f = n(16), p = n(60), h = n.n(p), v = n(17), g = n.n(v), y = n(28), m = n.n(y), b = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, _ = n(68);
    }, function(e, t, n) {
        "use strict";
        var r = n(32);
        n(0), n(19), n(9);
        t.a = r;
        r.create;
    }, function(e, t, n) {
        "use strict";
        function r() {
            function e() {
                return {
                    entities: I,
                    processes: P,
                    arcs: N,
                    meta: M
                };
            }
            function t() {
                var e = {};
                for (var t in A.es) e[t] = A.es[t].val;
                return e;
            }
            function n() {
                return R;
            }
            function r(e) {
                R = e;
            }
            function a() {
                return M;
            }
            function s(e) {
                null == e || "object" != typeof e || e instanceof Array || (M = o({}, M, e));
            }
            function u(e) {
                H = e;
            }
            function c(e) {
                return A.es[e] && A.es[e].val;
            }
            function l(e, t) {
                S(C(e), t, !0) && O();
            }
            function d(e, t) {
                l(e, t(c(e)));
            }
            function f(e, t) {
                C(e).cb.push(t);
            }
            function p(e, t) {
                var n = C(e);
                n.cb = t ? n.cb.filter(function(e) {
                    return e !== t;
                }) : [];
            }
            function h(e) {
                var t = Object(i.createEntity)(e);
                I[t.id] = t;
                var n = C(t.id);
                return null == t.value || !t.reset && null != n.val || (n.val = t.value, L[t.id] = !1, 
                F = !0), n.accept = t.accept, t;
            }
            function v(e) {
                var t = C(e);
                for (var n in t.arcs) b(n);
                delete A.es[e], delete I[e];
            }
            function g(e) {
                var t = Object(i.createProcess)(e, R), n = t.ports, r = j(t.id);
                P[t.id] = t, delete r.acc, r.values = [], r.sources = [], r.async = t.async, r.delta = t.delta, 
                Object.keys(r.arcs).forEach(function(e) {
                    var t = N[e].port;
                    null == t || n[t] && n[t] !== i.PORT_TYPES.ACCUMULATOR || b(e);
                }), n.forEach(function(e, t) {
                    e === i.PORT_TYPES.ACCUMULATOR && (r.acc = t);
                });
                for (var o in r.arcs) _(N[o]);
                return t;
            }
            function y(e) {
                var t = j(e);
                t.stop && (t.stop(), delete t.stop);
                for (var n in t.arcs) b(n);
                delete A.ps[e], delete P[e];
            }
            function m(e) {
                var t = Object(i.createArc)(e);
                N[t.id] = t, _(t);
                var n = j(t.process), r = P[t.process];
                return r && !0 === r.autostart && Object.keys(n.arcs).length === Object.keys(r.ports).length + 1 && T(n), 
                t;
            }
            function b(e) {
                var t = N[e];
                if (t) {
                    var n = j(t.process), r = C(t.entity);
                    delete n.arcs[e], delete r.arcs[e], null != t.port ? (delete r.effects[t.process], 
                    delete n.sources[t.port], delete n.values[t.port]) : (n.stop && (n.stop(), delete n.stop), 
                    n.sink = function() {}, delete n.out, delete r.reactions[t.process]);
                }
                delete N[e];
            }
            function _(e) {
                var t = e.process, n = e.entity, r = j(t), o = C(n), a = P[t];
                o.arcs[e.id] = !0, a && (r.arcs[e.id] = !0, null != e.port ? (delete o.effects[t], 
                a.ports && null != a.ports[e.port] && (r.sources[e.port] = o, a.ports[e.port] === i.PORT_TYPES.HOT && (o.effects[t] = r))) : (r.out = o, 
                null != r.acc ? (r.sources[r.acc] = o, o.reactions[t] = r) : delete o.reactions[t], 
                r.sink = function(e) {
                    S(o, e, !0) && !U && O();
                }));
            }
            function w(e) {
                if (e.entities) for (var t in e.entities) h(e.entities[t]);
                if (e.processes) for (var t in e.processes) g(e.processes[t]);
                if (e.arcs) for (var t in e.arcs) m(e.arcs[t]);
                e.meta && s(e.meta);
            }
            function O() {
                H && console.log("flushing graph recursively with", L);
                var e = Object.keys(L);
                if (F) {
                    for (var t = 0, n = e; t < n.length; t++) {
                        var r = n[t];
                        if (L[r]) {
                            var i = A.es[r];
                            for (var o in i.reactions) k(i.reactions[o]);
                        }
                    }
                    var a = {};
                    L = {}, F = !1, U = !0;
                    for (var s = 0, u = e; s < u.length; s++) {
                        var r = u[s], i = A.es[r];
                        i.cb.length > 0 && (D[r] = i);
                        for (var o in i.effects) a[o] || (k(i.effects[o]), a[o] = !0);
                    }
                    if (U = !1, F) O(); else {
                        var c = Object.keys(D);
                        D = {};
                        for (var l in c) for (var i = A.es[c[l]], d = 0, f = i.cb; d < f.length; d++) {
                            var p = f[d];
                            p(i.val);
                        }
                        H && console.log("flush finished");
                    }
                }
            }
            function k(e) {
                for (var t = !0, n = 0; n < e.sources.length; n++) {
                    var r = e.sources[n];
                    if (null == r.val) {
                        t = !1;
                        break;
                    }
                    if (e.values[n] = r.val, e.delta) {
                        if (null == r.oldVal) {
                            t = !1;
                            break;
                        }
                        e.values[n + 1] = r.oldVal;
                    }
                }
                if (t) if (H && console.log("running process", e.id), e.async) e.stop && e.stop(), 
                e.stop = P[e.id].procedure.apply(R, [ e.sink ].concat(e.values)); else {
                    var i = P[e.id].procedure.apply(R, e.values);
                    e.out && S(e.out, i, null == e.acc);
                }
            }
            function S(e, t, n) {
                return !(e.accept && !e.accept(t, e.val)) && (e.oldVal = e.val, e.val = t, null != t && (L[e.id] = n, 
                F = !0), !0);
            }
            function T(e) {
                e.async ? requestAnimationFrame(function() {
                    k(e);
                }) : (k(e), e.out && (L[e.out.id] = !1));
            }
            function x(e) {
                var t = j(e);
                k(t), t.async || O();
            }
            function E(e) {
                var t = j(e);
                t.stop && (t.stop(), delete t.stop);
            }
            function C(e) {
                return I[e] || h({
                    id: e
                }), A.es[e] || (A.es[e] = {
                    id: e,
                    val: void 0,
                    reactions: {},
                    effects: {},
                    arcs: {},
                    cb: []
                });
            }
            function j(e) {
                return A.ps[e] || (A.ps[e] = {
                    id: e,
                    arcs: {},
                    sink: function() {}
                });
            }
            var I = {}, P = {}, N = {}, A = {
                es: {},
                ps: {}
            }, M = {}, R = null, H = !1, D = {}, L = {}, U = !1, F = !1;
            return {
                addEntity: h,
                removeEntity: v,
                addProcess: g,
                removeProcess: y,
                addArc: m,
                removeArc: b,
                addGraph: w,
                getGraph: e,
                getState: t,
                setMeta: s,
                getMeta: a,
                getContext: n,
                setContext: r,
                setDebug: u,
                get: c,
                set: l,
                update: d,
                on: f,
                off: p,
                start: x,
                stop: E,
                flush: O,
                PORT_TYPES: o({}, i.PORT_TYPES)
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.create = r;
        var i = n(9), o = this && this.__assign || Object.assign || function(e) {
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
        function r(e) {
            return [ "h1", e ];
        }
        function i(e, t) {
            return function() {
                return t(_.b.MAIN.SET_ACTIVE_WINDOW, e);
            };
        }
        function o(e, t, n) {
            var o = e.visibility, a = e.position, s = function(e) {
                return function() {
                    return t(_.b.MAIN.UPDATE_VISIBILITY, e);
                };
            };
            return [ "header", {
                class: Object(d.a)("tvs-flow-controls", v.a),
                onmousedown: i("controls", t),
                style: x({}, a)
            }, n(r, w.title), [ "nav", {
                class: "tvs-controls-btns"
            }, [ "ul", [ "li", Object(h.a)({
                class: o.tree && E,
                onclick: s("tree"),
                icon: f.e(),
                title: "toggle entity tree"
            }) ], [ "li", Object(h.a)({
                class: o.graph && E,
                onclick: s("graph"),
                icon: f.d(),
                title: "toggle flow graph"
            }) ], [ "li", Object(h.a)({
                class: o.entities && E,
                onclick: s("entities"),
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
            }, n(m.a, T.treeData) ], [ "footer", {
                class: "resize"
            } ] ];
        }
        function s(e, t, n) {
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
            var o = e.dimensions, a = e.window, s = n(g.a, k.viewData);
            return [ "article", {
                ref: r,
                class: Object(d.a)("tvs-flow-graph", v.e),
                style: x({}, o),
                onmousedown: i("graph", t)
            }, [ "header", f.d("graph" === a ? "selected" : ""), " Graph ", [ "span", {
                class: "gap"
            } ], n(g.b, k.viewBox), " ", Object(h.a)({
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
            }) ], s, [ "footer", {
                class: "resize"
            } ] ];
        }
        function u(e, t, n) {
            var r = e.dimensions, o = e.node, a = e.window, s = o && o.procedure ? Object(y.b)(o, t) : n(y.a, S.entityViewProps);
            return [ "article", {
                class: Object(d.a)("tvs-flow-entities", v.e),
                style: x({}, r),
                onmousedown: i("entities", t)
            }, [ "header", f.c("entities" === a ? "selected" : ""), " ", o && o.id, " ", [ "span", {
                class: "gap"
            }, " " ], " ", Object(h.a)({
                icon: f.a(),
                class: b.b,
                title: "close window",
                onclick: function() {
                    return t(_.b.MAIN.CLOSE_WINDOW, "entities");
                }
            }) ], s, [ "footer", {
                class: "resize"
            } ] ];
        }
        function c(e, t, n) {
            var r = e.tree ? n(a, O.treeWindowProps) : "", i = e.graph ? n(s, O.graphWindowProps) : "", c = e.entities ? n(u, O.entitiesWindowProps) : "";
            return [ "article", {
                class: Object(d.a)("tvs-flow-tools", p.f)
            }, n(o, O.controlProps), i, c, r ];
        }
        function l(e) {
            return e(c, w.visibility);
        }
        t.a = l;
        var d = n(21), f = n(12), p = n(6), h = n(14), v = n(15), g = n(50), y = n(52), m = n(55), b = n(11), _ = n(1), w = n(5), O = n(25), k = n(16), S = n(4), T = n(26), x = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, E = Object(d.b)({
            color: p.e
        });
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s;
        });
        var r = n(36), i = n(22), o = n(10), a = (n.n(o), function() {
            return o.create(void 0, !0);
        }), s = function() {
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
                    var o = n._freeStyle, a = Object(r.a)(i.b.apply(void 0, e)), s = a.result, u = a.debugName, c = u ? o.registerStyle(s, u) : o.registerStyle(s);
                    return n._styleUpdated(), c;
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
                    var s = a;
                    for (var u in s) {
                        var c = s[u];
                        t[u] = r(c).result;
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
            v && p && (v = !1, p.length ? h = p.concat(h) : g = -1, h.length && s());
        }
        function s() {
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
        function u(e, t) {
            this.fun = e, this.array = t;
        }
        function c() {}
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
            h.push(new u(e, t)), 1 !== h.length || v || i(s);
        }, u.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", 
        f.versions = {}, f.on = c, f.addListener = c, f.once = c, f.off = c, f.removeListener = c, 
        f.removeAllListeners = c, f.emit = c, f.binding = function(e) {
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
        var r = n(40), i = n(23), o = n(10), a = function() {
            return o.create(void 0, !0);
        }, s = function() {
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
                    var o = n._freeStyle, a = r.ensureStringObj(i.extend.apply(void 0, e)), s = a.result, u = a.debugName, c = u ? o.registerStyle(s, u) : o.registerStyle(s);
                    return n._styleUpdated(), c;
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
        t.TypeStyle = s;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = {}, n = "";
            for (var i in e) {
                var a = e[i];
                if ("$unique" === i) t[o.IS_UNIQUE] = a; else if ("$nest" === i) {
                    var s = a;
                    for (var u in s) {
                        var c = s[u];
                        t[u] = r(c).result;
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
        function r(e) {
            for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
        }
        r(n(43)), r(n(44)), r(n(45)), r(n(46)), r(n(47)), r(n(48)), r(n(49));
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return y(e) || m(e) || b(e) || y("red");
        }
        function i(e, t, n) {
            return new x(k, c(e), _.ensurePercent(t), _.ensurePercent(n), 1, !1);
        }
        function o(e, t, n, r) {
            return new x(k, c(e), _.ensurePercent(t), _.ensurePercent(n), _.ensurePercent(r), !0);
        }
        function a(e, t, n) {
            return new x(O, e, t, n, 1, !1);
        }
        function s(e, t, n, r) {
            return new x(O, e, t, n, _.ensurePercent(r), !0);
        }
        function u(e) {
            var t = Math.round(e);
            return (t < 16 ? "0" : "") + t.toString(16);
        }
        function c(e) {
            return ((e < 0 ? 360 : 0) + e % 360) % 360;
        }
        function l(e, t) {
            return Math.round(Math.pow(10, t) * e) * Math.pow(10, -t);
        }
        function d(e, t, n, r, i) {
            var o, a = e / 255, s = t / 255, u = n / 255, c = Math.min(a, s, u), l = Math.max(a, s, u), d = (c + l) / 2, f = l - c;
            o = l === c ? 0 : a === l ? (s - u) / f : s === l ? 2 + (u - a) / f : u === l ? 4 + (a - s) / f : 0, 
            (o = Math.min(60 * o, 360)) < 0 && (o += 360);
            var p;
            return p = l === c ? 0 : d <= .5 ? f / (l + c) : f / (2 - l - c), new x(k, o, p, d, r, i);
        }
        function f(e, t, n, r, i) {
            var o = e / 360, a = t, s = n;
            if (0 === a) {
                var u = 255 * s;
                return new x(O, u, u, u, r, i);
            }
            for (var c = s < .5 ? s * (1 + a) : s + a - s * a, l = 2 * s - c, d = 0, f = 0, p = 0, h = 0; h < 3; h++) {
                var v = o + 1 / 3 * -(h - 1);
                v < 0 && v++, v > 1 && v--;
                var u = void 0;
                u = 6 * v < 1 ? l + 6 * (c - l) * v : 2 * v < 1 ? c : 3 * v < 2 ? l + (c - l) * (2 / 3 - v) * 6 : l, 
                u *= 255, 0 === h ? d = u : 1 === h ? f = u : p = u;
            }
            return new x(O, d, f, p, r, i);
        }
        function p(e, t, n, r, i, o, a) {
            return e === t ? new x(e, n, r, i, o, a) : S[e - t](n, r, i, o, a);
        }
        function h(e, t, n, r) {
            if (!w) return [ e || 0, t || 0, n || 0, r || 0 ];
            var i = new Float32Array(4);
            return i[0] = e || 0, i[1] = t || 0, i[2] = n || 0, i[3] = r || 0, i;
        }
        function v(e, t, n) {
            var r = T[e][t];
            return n < 0 ? 0 : n > r ? r : n;
        }
        function g(e) {
            return e instanceof x ? e : r(e);
        }
        function y(e) {
            return E[e] || void 0;
        }
        function m(e) {
            var t = e.match(/#(([a-f0-9]{6})|([a-f0-9]{3}))$/i);
            if (t) {
                var n = t[1], r = parseInt(3 === n.length ? n[0] + n[0] + n[1] + n[1] + n[2] + n[2] : n, 16);
                return new x(O, r >> 16 & 255, r >> 8 & 255, 255 & r, 1, !1);
            }
        }
        function b(e) {
            var t = _.parseCSSFunction(e);
            if (t && (4 === t.length || 5 === t.length)) {
                var n, r = t[0], i = "rgba" === r, o = "hsla" === r, a = "rgb" === r, s = "hsl" === r, u = o || i;
                if (a || i) n = O; else {
                    if (!s && !o) throw new Error("unsupported color string");
                    n = k;
                }
                var c = parseFloat(t[1]), l = a || i ? parseFloat(t[2]) : _.ensurePercent(t[2]), d = a || i ? parseFloat(t[3]) : _.ensurePercent(t[3]), f = u ? parseFloat(t[4]) : 1;
                return new x(n, c, l, d, f, u);
            }
        }
        var _ = n(13), w = "undefined" != typeof Float32Array, O = 0, k = 1, S = (C = {}, 
        C[O - k] = d, C[k - O] = f, C), T = (j = {}, j[O] = h(255, 255, 255, 1), j[k] = h(360, 1, 1, 1), 
        j);
        t.color = r, t.hsl = i, t.hsla = o, t.rgb = a, t.rgba = s;
        var x = function() {
            function e(e, t, n, r, i, o) {
                this._format = e, this._hasAlpha = o, this._values = h(v(e, 0, t), v(e, 1, n), v(e, 2, r), v(e, 3, i));
            }
            return e.convertHelper = function(e, t) {
                var n = t._format, r = t._values, i = t._hasAlpha;
                return n === e ? t : S[n - e](r[0], r[1], r[2], r[3], i);
            }, e.prototype.toString = function() {
                var e, t, n = this._format, r = this._values, i = this._hasAlpha;
                if (n === O) e = i ? "rgba" : "rgb", t = [ Math.round(r[0]), Math.round(r[1]), Math.round(r[2]) ]; else {
                    if (n !== k) throw new Error("Invalid color format");
                    e = i ? "hsla" : "hsl", t = [ Math.round(r[0]), _.formatPercent(l(r[1], 2)), _.formatPercent(l(r[2], 2)) ];
                }
                return i && t.push(l(r[3], 5)), _.cssFunction(e, t);
            }, e.prototype.toHexString = function() {
                var t = e.convertHelper(O, this)._values;
                return "#" + (u(t[0]) + u(t[1]) + u(t[2])).toUpperCase();
            }, e.prototype.toHSL = function() {
                var e = this._values;
                return p(this._format, k, e[0], e[1], e[2], 1, !1);
            }, e.prototype.toHSLA = function() {
                var e = this._values;
                return p(this._format, k, e[0], e[1], e[2], e[3], !0);
            }, e.prototype.toRGB = function() {
                var e = this._values;
                return p(this._format, O, e[0], e[1], e[2], 1, !1);
            }, e.prototype.toRGBA = function() {
                var e = this._values;
                return p(this._format, O, e[0], e[1], e[2], e[3], !0);
            }, e.prototype.red = function() {
                return (this._format === O ? this : this.toRGB())._values[0];
            }, e.prototype.green = function() {
                return (this._format === O ? this : this.toRGB())._values[1];
            }, e.prototype.blue = function() {
                return (this._format === O ? this : this.toRGB())._values[2];
            }, e.prototype.hue = function() {
                return (this._format === k ? this : this.toHSL())._values[0];
            }, e.prototype.saturation = function() {
                return (this._format === k ? this : this.toHSL())._values[1];
            }, e.prototype.lightness = function() {
                return (this._format === k ? this : this.toHSL())._values[2];
            }, e.prototype.alpha = function() {
                return this._values[3];
            }, e.prototype.opacity = function() {
                return this.alpha();
            }, e.prototype.invert = function() {
                var t = e.convertHelper(O, this)._values;
                return e.convertHelper(this._format, new e(O, 255 - t[0], 255 - t[1], 255 - t[2], this._values[3], this._hasAlpha));
            }, e.prototype.lighten = function(t, n) {
                var r = e.convertHelper(k, this)._values, i = T[k][2], o = r[2] + (n ? i - r[2] : i) * _.ensurePercent(t);
                return e.convertHelper(this._format, new e(k, r[0], r[1], o, this._values[3], this._hasAlpha));
            }, e.prototype.darken = function(t, n) {
                var r = e.convertHelper(k, this)._values, i = r[2] - (n ? r[2] : T[k][2]) * _.ensurePercent(t);
                return e.convertHelper(this._format, new e(k, r[0], r[1], i, this._values[3], this._hasAlpha));
            }, e.prototype.saturate = function(t, n) {
                var r = e.convertHelper(k, this)._values, i = T[k][1], o = r[1] + (n ? i - r[1] : i) * _.ensurePercent(t);
                return e.convertHelper(this._format, new e(k, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.desaturate = function(t, n) {
                var r = e.convertHelper(k, this)._values, i = T[k][1], o = r[1] - (n ? r[1] : i) * _.ensurePercent(t);
                return e.convertHelper(this._format, new e(k, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.grayscale = function() {
                return this.desaturate(1);
            }, e.prototype.fade = function(t) {
                var n = this._values, r = v(O, 3, _.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, n[0], n[1], n[2], r, !0));
            }, e.prototype.fadeOut = function(t, n) {
                var r = this._values, i = v(O, 3, r[3] - (n ? r[3] : 1) * _.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, r[0], r[1], r[2], i, !0));
            }, e.prototype.fadeIn = function(t, n) {
                var r = this._values, i = v(O, 3, r[3] + (n ? r[3] : 1) * _.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, r[0], r[1], r[2], i, !0));
            }, e.prototype.mix = function(t, n) {
                var r = this, i = g(t), o = e.convertHelper(O, r)._values, a = e.convertHelper(O, i)._values, s = void 0 === n ? .5 : n, u = 2 * s - 1, c = Math.abs(o[3] - a[3]), l = ((u * c == -1 ? u : (u + c) / (1 + u * c)) + 1) / 2, d = 1 - l, f = new e(O, Math.round(o[0] * l + a[0] * d), Math.round(o[1] * l + a[1] * d), Math.round(o[2] * l + a[2] * d), o[3] * s + a[3] * (1 - s), r._hasAlpha || i._hasAlpha);
                return e.convertHelper(this._format, f);
            }, e.prototype.tint = function(e) {
                return t.white.mix(this, e);
            }, e.prototype.shade = function(e) {
                return t.black.mix(this, e);
            }, e.prototype.spin = function(t) {
                var n = e.convertHelper(k, this)._values;
                return e.convertHelper(this._format, new e(k, c(n[0] + t), n[1], n[2], this._values[3], this._hasAlpha));
            }, e;
        }();
        t.ColorHelper = x;
        var E = {
            aliceblue: a(240, 248, 245),
            antiquewhite: a(250, 235, 215),
            aqua: a(0, 255, 255),
            aquamarine: a(127, 255, 212),
            azure: a(240, 255, 255),
            beige: a(245, 245, 220),
            bisque: a(255, 228, 196),
            black: a(0, 0, 0),
            blanchedalmond: a(255, 235, 205),
            blue: a(0, 0, 255),
            blueviolet: a(138, 43, 226),
            brown: a(165, 42, 42),
            burlywood: a(222, 184, 35),
            cadetblue: a(95, 158, 160),
            chartreuse: a(127, 255, 0),
            chocolate: a(210, 105, 30),
            coral: a(255, 127, 80),
            cornflowerblue: a(100, 149, 237),
            cornsilk: a(255, 248, 220),
            crimson: a(220, 20, 60),
            cyan: a(0, 255, 255),
            darkblue: a(0, 0, 139),
            darkcyan: a(0, 139, 139),
            darkgoldenrod: a(184, 134, 11),
            darkgray: a(169, 169, 169),
            darkgreen: a(0, 100, 0),
            darkgrey: a(169, 169, 169),
            darkkhaki: a(189, 183, 107),
            darkmagenta: a(139, 0, 139),
            darkolivegreen: a(85, 107, 47),
            darkorange: a(255, 140, 0),
            darkorchid: a(153, 50, 204),
            darkred: a(139, 0, 0),
            darksalmon: a(233, 150, 122),
            darkseagreen: a(143, 188, 143),
            darkslateblue: a(72, 61, 139),
            darkslategray: a(47, 79, 79),
            darkslategrey: a(47, 79, 79),
            darkturquoise: a(0, 206, 209),
            darkviolet: a(148, 0, 211),
            deeppink: a(255, 20, 147),
            deepskyblue: a(0, 191, 255),
            dimgray: a(105, 105, 105),
            dimgrey: a(105, 105, 105),
            dodgerblue: a(30, 144, 255),
            firebrick: a(178, 34, 34),
            floralwhite: a(255, 250, 240),
            forestgreen: a(34, 139, 34),
            fuchsia: a(255, 0, 255),
            gainsboro: a(220, 220, 220),
            ghostwhite: a(248, 248, 255),
            gold: a(255, 215, 0),
            goldenrod: a(218, 165, 32),
            gray: a(128, 128, 128),
            green: a(0, 128, 0),
            greenyellow: a(173, 255, 47),
            grey: a(128, 128, 128),
            honeydew: a(240, 255, 240),
            hotpink: a(255, 105, 180),
            indianred: a(205, 92, 92),
            indigo: a(75, 0, 130),
            ivory: a(255, 255, 240),
            khaki: a(240, 230, 140),
            lavender: a(230, 230, 250),
            lavenderblush: a(255, 240, 245),
            lawngreen: a(124, 252, 0),
            lemonchiffon: a(255, 250, 205),
            lightblue: a(173, 216, 230),
            lightcoral: a(240, 128, 128),
            lightcyan: a(224, 255, 255),
            lightgoldenrodyellow: a(250, 250, 210),
            lightgray: a(211, 211, 211),
            lightgreen: a(144, 238, 144),
            lightgrey: a(211, 211, 211),
            lightpink: a(255, 182, 193),
            lightsalmon: a(255, 160, 122),
            lightseagreen: a(32, 178, 170),
            lightskyblue: a(135, 206, 250),
            lightslategray: a(119, 136, 153),
            lightslategrey: a(119, 136, 153),
            lightsteelblue: a(176, 196, 222),
            lightyellow: a(255, 255, 224),
            lime: a(0, 255, 0),
            limegreen: a(50, 205, 50),
            linen: a(250, 240, 230),
            maroon: a(128, 0, 0),
            mediumaquamarine: a(102, 205, 170),
            mediumblue: a(0, 0, 205),
            mediumorchid: a(186, 85, 211),
            mediumpurple: a(147, 112, 219),
            mediumseagreen: a(60, 179, 113),
            mediumslateblue: a(123, 104, 238),
            mediumspringgreen: a(0, 250, 154),
            mediumturquoise: a(72, 209, 204),
            mediumvioletred: a(199, 21, 133),
            midnightblue: a(25, 25, 112),
            mintcream: a(245, 255, 250),
            mistyrose: a(255, 228, 225),
            moccasin: a(255, 228, 181),
            navajowhite: a(255, 222, 173),
            navy: a(0, 0, 128),
            oldlace: a(253, 245, 230),
            olive: a(128, 128, 0),
            olivedrab: a(107, 142, 35),
            orange: a(255, 165, 0),
            purple: a(128, 0, 128),
            rebeccapurple: a(102, 51, 153),
            red: a(255, 0, 0),
            silver: a(192, 192, 192),
            teal: a(0, 128, 128),
            transparent: s(0, 0, 0, 0),
            white: a(255, 255, 255),
            yellow: a(255, 255, 0)
        };
        t.aliceblue = E.aliceblue, t.antiquewhite = E.antiquewhite, t.aqua = E.aqua, t.aquamarine = E.aquamarine, 
        t.azure = E.azure, t.beige = E.beige, t.bisque = E.bisque, t.black = E.black, t.blanchedalmond = E.blanchedalmond, 
        t.blue = E.blue, t.blueviolet = E.blueviolet, t.brown = E.brown, t.burlywood = E.burlywood, 
        t.cadetblue = E.cadetblue, t.chartreuse = E.chartreuse, t.chocolate = E.chocolate, 
        t.coral = E.coral, t.cornflowerblue = E.cornflowerblue, t.cornsilk = E.cornsilk, 
        t.crimson = E.crimson, t.cyan = E.cyan, t.darkblue = E.darkblue, t.darkcyan = E.darkcyan, 
        t.darkgoldenrod = E.darkgoldenrod, t.darkgray = E.darkgray, t.darkgreen = E.darkgreen, 
        t.darkgrey = E.darkgrey, t.darkkhaki = E.darkkhaki, t.darkmagenta = E.darkmagenta, 
        t.darkolivegreen = E.darkolivegreen, t.darkorange = E.darkorange, t.darkorchid = E.darkorchid, 
        t.darkred = E.darkred, t.darksalmon = E.darksalmon, t.darkseagreen = E.darkseagreen, 
        t.darkslateblue = E.darkslateblue, t.darkslategray = E.darkslategray, t.darkslategrey = E.darkslategrey, 
        t.darkturquoise = E.darkturquoise, t.darkviolet = E.darkviolet, t.deeppink = E.deeppink, 
        t.deepskyblue = E.deepskyblue, t.dimgray = E.dimgray, t.dimgrey = E.dimgrey, t.dodgerblue = E.dodgerblue, 
        t.firebrick = E.firebrick, t.floralwhite = E.floralwhite, t.forestgreen = E.forestgreen, 
        t.fuchsia = E.fuchsia, t.gainsboro = E.gainsboro, t.ghostwhite = E.ghostwhite, t.gold = E.gold, 
        t.goldenrod = E.goldenrod, t.gray = E.gray, t.green = E.green, t.greenyellow = E.greenyellow, 
        t.grey = E.grey, t.honeydew = E.honeydew, t.hotpink = E.hotpink, t.indianred = E.indianred, 
        t.indigo = E.indigo, t.ivory = E.ivory, t.khaki = E.khaki, t.lavender = E.lavender, 
        t.lavenderblush = E.lavenderblush, t.lawngreen = E.lawngreen, t.lemonchiffon = E.lemonchiffon, 
        t.lightblue = E.lightblue, t.lightcoral = E.lightcoral, t.lightcyan = E.lightcyan, 
        t.lightgoldenrodyellow = E.lightgoldenrodyellow, t.lightgray = E.lightgray, t.lightgreen = E.lightgreen, 
        t.lightgrey = E.lightgrey, t.lightpink = E.lightpink, t.lightsalmon = E.lightsalmon, 
        t.lightseagreen = E.lightseagreen, t.lightskyblue = E.lightskyblue, t.lightslategray = E.lightslategray, 
        t.lightslategrey = E.lightslategrey, t.lightsteelblue = E.lightsteelblue, t.lightyellow = E.lightyellow, 
        t.lime = E.lime, t.limegreen = E.limegreen, t.linen = E.linen, t.maroon = E.maroon, 
        t.mediumaquamarine = E.mediumaquamarine, t.mediumblue = E.mediumblue, t.mediumorchid = E.mediumorchid, 
        t.mediumpurple = E.mediumpurple, t.mediumseagreen = E.mediumseagreen, t.mediumslateblue = E.mediumslateblue, 
        t.mediumspringgreen = E.mediumspringgreen, t.mediumturquoise = E.mediumturquoise, 
        t.mediumvioletred = E.mediumvioletred, t.midnightblue = E.midnightblue, t.mintcream = E.mintcream, 
        t.mistyrose = E.mistyrose, t.moccasin = E.moccasin, t.navajowhite = E.navajowhite, 
        t.navy = E.navy, t.oldlace = E.oldlace, t.olive = E.olive, t.olivedrab = E.olivedrab, 
        t.orange = E.orange, t.purple = E.purple, t.rebeccapurple = E.rebeccapurple, t.red = E.red, 
        t.silver = E.silver, t.teal = E.teal, t.transparent = E.transparent, t.white = E.white, 
        t.yellow = E.yellow;
        var C, j;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            return a.cssFunction("linear-gradient", [ e ].concat(t.map(o)));
        }
        function i(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            return a.cssFunction("repeating-linear-gradient", [ e ].concat(t.map(o)));
        }
        function o(e) {
            return Array.isArray(e) ? e.map(function(e) {
                return e.toString();
            }).join(" ") : e.toString();
        }
        var a = n(13);
        t.linearGradient = r, t.repeatingLinearGradient = i;
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return (e || []).filter(function(e) {
                return e || 0 === e;
            }).map(function(e) {
                return e.toString();
            }).join(",");
        }
        t.list = r;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return "'" + (e || 0 === e ? e.toString() : "").replace(/\'/g, "\\'") + "'";
        }
        function i(e) {
            return e || 0 === e ? e.toString() + " !important" : "";
        }
        function o(e) {
            return "url(" + (e || "") + ")";
        }
        t.quote = r, t.important = i, t.url = o;
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return e.length ? e.join(" ") : "none";
        }
        function i(e, t, n, r, i, o) {
            return T.cssFunction("matrix", [ e, t, n, r, i, o ]);
        }
        function o(e, t, n, r, i, o, a, s, u, c, l, d, f, p, h, v) {
            return T.cssFunction("matrix3d", [ e, t, n, r, i, o, a, s, u, c, l, d, f, p, h, v ]);
        }
        function a(e) {
            return T.cssFunction("perspective", [ e ]);
        }
        function s(e) {
            return T.cssFunction("rotate", [ e ]);
        }
        function u(e, t, n) {
            return T.cssFunction("rotate3d", [ e, t, n ]);
        }
        function c(e) {
            return T.cssFunction("rotateX", [ e ]);
        }
        function l(e) {
            return T.cssFunction("rotateY", [ e ]);
        }
        function d(e) {
            return T.cssFunction("rotateZ", [ e ]);
        }
        function f(e, t) {
            return T.cssFunction("scale", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function p(e, t, n) {
            return T.cssFunction("scale3d", [ e, t, n ]);
        }
        function h(e) {
            return T.cssFunction("scaleX", [ e ]);
        }
        function v(e) {
            return T.cssFunction("scaleY", [ e ]);
        }
        function g(e) {
            return T.cssFunction("scaleZ", [ e ]);
        }
        function y(e, t) {
            return T.cssFunction("skew", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function m(e) {
            return T.cssFunction("skewX", [ e ]);
        }
        function b(e) {
            return T.cssFunction("skewY", [ e ]);
        }
        function _(e, t) {
            return T.cssFunction("translate", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function w(e, t, n) {
            return T.cssFunction("translate3d", [ e, t, n ]);
        }
        function O(e) {
            return T.cssFunction("translateX", [ e ]);
        }
        function k(e) {
            return T.cssFunction("translateY", [ e ]);
        }
        function S(e) {
            return T.cssFunction("translateZ", [ e ]);
        }
        var T = n(13);
        t.transform = r, t.matrix = i, t.matrix3d = o, t.perspective = a, t.rotate = s, 
        t.rotate3d = u, t.rotateX = c, t.rotateY = l, t.rotateZ = d, t.scale = f, t.scale3d = p, 
        t.scaleX = h, t.scaleY = v, t.scaleZ = g, t.skew = y, t.skewX = m, t.skewY = b, 
        t.translate = _, t.translate3d = w, t.translateX = O, t.translateY = k, t.translateZ = S;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return e + "%";
        }
        function i(e) {
            return e + "px";
        }
        function o(e) {
            return e + "em";
        }
        function a(e) {
            return e + "rad";
        }
        function s(e) {
            return e + "rem";
        }
        function u(e) {
            return e + "vh";
        }
        function c(e) {
            return e + "vw";
        }
        function l(e) {
            return e + "turn";
        }
        t.percent = r, t.px = i, t.em = o, t.rad = a, t.rem = s, t.viewHeight = u, t.viewWidth = c, 
        t.turn = l;
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return (e || []).map(function(e) {
                var t = "";
                return e.image && (t += " " + e.image), e.position && (t += " " + e.position), (e.size || 0 === e.size) && (t += " " + e.size), 
                e.repeat && (t += " " + e.repeat), e.origin && (t += " " + e.origin), e.clip && (t += " " + e.clip), 
                e.attachment && (t += " " + e.attachment), e.color && (t += " " + e.color), t.trim();
            }).filter(function(e) {
                return "" !== e;
            }).join(",");
        }
        t.background = r;
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
                    return t(s.b.GRAPH.UPDATE_SCALE, e.target.value);
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
            var n = e.entities, r = e.processes, i = e.edges, u = e.viewBox, c = void 0 === u ? {} : u;
            return [ "section", {
                class: o.a
            }, [ "svg", {
                width: "100%",
                height: "100%",
                id: "graph-ui",
                viewBox: c.x + ", " + c.y + ", " + c.width + ", " + c.height
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
                        return t(s.b.ENTITIES.OPEN_PROCESS, e.id);
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
                        return t(s.b.ENTITIES.OPEN_ENTITY, e.id);
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
        var o = n(51), a = n(2), s = (n.n(a), n(1));
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o;
        });
        var r = n(2), i = (n.n(r), n(6)), o = Object(r.style)(i.b, {
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
        function r(e, t) {
            var n = e.value, r = e.watching, i = "";
            if (n) try {
                i = JSON.stringify(n, null, "  ");
            } catch (e) {
                i = "Error: " + e.message;
            }
            return [ "code", [ "pre", {
                contentEditable: !r,
                onInput: function(e) {
                    return t(l.b.ENTITIES.UPDATE_EDITED_VALUE, e.target.textContent);
                }
            }, i ] ];
        }
        function i(e, t, n) {
            var i = e.entity, o = e.watching, f = [ "div", {
                style: "margin-top: 4px"
            } ];
            return o ? (f.push([ "button", {
                class: u.a,
                key: "edit-btn",
                onclick: function() {
                    return t(l.b.ENTITIES.SET_EDIT_MODE, !0);
                }
            }, "Edit" ], Object(s.a)({
                key: "inspect-btn-" + i.id,
                onclick: function() {
                    return t(l.a.ENTITY_INSPECT, i.id);
                },
                icon: a.i(),
                title: "Inspect entity value"
            })), i.value && f.push(Object(s.a)({
                key: "reset-btn-" + i.id,
                onclick: function() {
                    return t(l.a.ENTITY_RESET, i.id);
                },
                icon: a.h(),
                title: "Reset entity value"
            }))) : f.push([ "button", {
                class: u.a,
                onclick: function() {
                    return t(l.b.ENTITIES.SET_EDIT_MODE, !1);
                }
            }, "Cancel" ], [ "button", {
                class: u.a,
                key: "save-btn-" + i.id,
                onclick: function() {
                    return t(l.b.ENTITIES.SAVE_VALUE, i.id);
                }
            }, "Save" ]), [ "section", {
                class: c.b
            }, [ "div", {
                class: c.d
            }, n(r, d.entityValueView) ], f ];
        }
        function o(e, t) {
            var n = [ "div", {
                style: "margin-top: 4px"
            } ];
            return n.push(Object(s.a)({
                onclick: function() {
                    return t(l.a.PROCESS_RUN, e.id);
                },
                icon: a.g(),
                title: "Run process"
            })), e.async && n.push(Object(s.a)({
                onclick: function() {
                    return t(l.a.PROCESS_STOP, e.id);
                },
                icon: a.j(),
                title: "Stop async process"
            })), [ "section", {
                class: c.b
            }, [ "div", {
                class: c.d
            }, [ "code", [ "pre", e.procedure.toString() ] ] ], n ];
        }
        t.a = i, t.b = o;
        var a = n(12), s = n(14), u = n(11), c = n(15), l = n(1), d = n(4);
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
            var s = t.element, u = void 0 === s ? document : s, c = t.enableRightButton, l = {
                pressed: {},
                drag: {
                    x: 0,
                    y: 0
                }
            }, d = 0, f = 0, p = !1;
            return u.addEventListener("mousedown", n), document.addEventListener("mouseup", r), 
            document.addEventListener("mousemove", o), c && u.addEventListener("contextmenu", a), 
            e(l), function() {
                u.removeEventListener("mousedown", n), document.removeEventListener("mousemove", o), 
                document.removeEventListener("mouseup", r), c && u.removeEventListener("contextmenu", a);
            };
        }
        t.a = r;
        var i = {
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t, n, i, o) {
            if (t.__entity__) {
                var a = t.__entity__, f = [ "span", {
                    class: "entity-controls"
                }, Object(u.a)({
                    icon: s.i(),
                    class: c.b,
                    onclick: function() {
                        return i(l.a.ENTITY_INSPECT, a.id);
                    },
                    title: "Inspect entity value"
                }) ];
                null != a.value && f.push(Object(u.a)({
                    class: c.b,
                    onclick: function() {
                        return i(l.a.ENTITY_RESET, a.id);
                    },
                    icon: s.h(),
                    title: "Reset entity value"
                }));
                var p = "entity-item";
                return n === a.id && (p += " selected"), [ "li", [ "div", {
                    class: p,
                    onclick: function() {
                        return i(l.b.ENTITIES.OPEN_ENTITY, a.id);
                    }
                }, null != a.value ? s.k() : s.j(), " " + e + " ", f ] ];
            }
            var h = [ "li", [ "div", {
                onclick: function() {
                    return i(l.b.TREE.TOGGLE_LEVEL, t.__path__);
                }
            }, s.f(o[t.__path__] ? "" : d), " " + e ] ];
            if (!o[t.__path__]) {
                var v = [ "ul" ];
                for (var g in t) "__path__" !== g && v.push(r(g, t[g], n, i, o));
                h.push(v);
            }
            return h;
        }
        function i(e, t) {
            var n = e.fold, i = e.tree, a = e.selected, s = [ "ul", {
                class: o.c
            } ];
            if (i) {
                var u = Object.keys(i).map(function(e) {
                    return r(e, i[e], a.id, t, n);
                });
                s.push.apply(s, u);
            }
            return s;
        }
        t.a = i;
        var o = n(15), a = n(2), s = (n.n(a), n(12)), u = n(14), c = n(11), l = n(1), d = Object(a.style)({
            transform: "rotate(90deg)"
        });
    }, function(e, t, n) {
        e.exports = n(57).default, e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = typeof e;
            return "string" === t || "number" === t;
        }
        function i(e) {
            return c(e) || s(e);
        }
        function o(e) {
            return s(e) || !1 === e || u(e) || c(e);
        }
        function a(e) {
            return "function" == typeof e;
        }
        function s(e) {
            return null === e;
        }
        function u(e) {
            return !0 === e;
        }
        function c(e) {
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
            var r = w.get(e);
            void 0 === r && (r = [], w.set(e, r), O.then(function() {
                w.delete(e), e._updating = !0, v(e, t, function() {
                    for (var t = 0, n = r.length; t < n; t++) r[t].call(e);
                }), e._updating = !1;
            })), i(n) || r.push(n);
        }
        function h(e, t, n) {
            a(t) && (t = t(e.state, e.props, e.context));
            var r = e._pendingState;
            if (i(r)) e._pendingState = r = t; else for (var o in t) r[o] = t[o];
            if (!b || e._pendingSetState || e._blockRender) {
                var s = e.state;
                if (null === s) e.state = r; else for (var u in r) s[u] = r[u];
                e._pendingState = null, !i(n) && e._blockRender && e._lifecycle.addListener(n.bind(e));
            } else e._updating ? p(e, !1, n) : (e._pendingSetState = !0, e._updating = !0, v(e, !1, n), 
            e._updating = !1);
        }
        function v(e, t, n) {
            if (!e._unmounted) {
                if (t || !e._blockRender) {
                    e._pendingSetState = !1;
                    var a = e._pendingState, u = e.state, c = d(u, a), p = e.props, h = e.context;
                    e._pendingState = null;
                    var v = e._updateComponent(u, c, p, p, h, t, !0), m = !0;
                    o(v) ? v = g.createVNode(4096, null) : v === y ? (v = e._lastInput, m = !1) : r(v) ? v = g.createVNode(1, null, null, v) : _(v) && l();
                    var b = e._lastInput, w = e._vNode, O = b.dom && b.dom.parentNode || (b.dom = w.dom);
                    if (e._lastInput = v, m) {
                        var k;
                        i(e.getChildContext) || (k = e.getChildContext()), k = i(k) ? e._childContext : d(h, k);
                        var S = e._lifecycle;
                        g.internal_patch(b, v, O, S, k, e._isSVG, !1), S.trigger(), i(e.componentDidUpdate) || e.componentDidUpdate(p, u, h), 
                        s(g.options.afterUpdate) || g.options.afterUpdate(w);
                    }
                    var T = w.dom = v.dom;
                    g.options.findDOMNodeEnabled && g.internal_DOMNodeMap.set(e, v.dom), f(w, T);
                } else e.state = e._pendingState, e._pendingState = null;
                i(n) || n.call(e);
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var g = n(17), y = "$NO_OP", m = "a runtime error occured! Use Inferno in development environment to find the error.", b = !("undefined" == typeof window || !window.document), _ = Array.isArray, w = new Map(), O = Promise.resolve(), k = function(e, t) {
            this.state = null, this._blockRender = !1, this._blockSetState = !0, this._pendingSetState = !1, 
            this._pendingState = null, this._lastInput = null, this._vNode = null, this._unmounted = !1, 
            this._lifecycle = null, this._childContext = null, this._isSVG = !1, this._updating = !0, 
            this.props = e || g.EMPTY_OBJ, this.context = t || g.EMPTY_OBJ;
        };
        k.prototype.forceUpdate = function(e) {
            !this._unmounted && b && v(this, !0, e);
        }, k.prototype.setState = function(e, t) {
            this._unmounted || (this._blockSetState ? l() : h(this, e, t));
        }, k.prototype.setStateSync = function(e) {
            this.setState(e);
        }, k.prototype._updateComponent = function(e, t, n, r, o, a, s) {
            if (!0 === this._unmounted && l(), n !== r || r === g.EMPTY_OBJ || e !== t || a) {
                if (n !== r || r === g.EMPTY_OBJ) {
                    if (!i(this.componentWillReceiveProps) && !s) {
                        var u = d(this.state);
                        this._blockRender = !0, this.componentWillReceiveProps(r, o), this._blockRender = !1;
                        var c = this.state;
                        u !== c && (this.state = u, this._pendingSetState = !0, this._pendingState = c);
                    }
                    this._pendingSetState && (t = d(t, this._pendingState), this._pendingSetState = !1, 
                    this._pendingState = null);
                }
                if (a || i(this.shouldComponentUpdate) || this.shouldComponentUpdate && this.shouldComponentUpdate(r, t, o)) {
                    i(this.componentWillUpdate) || (this._blockSetState = !0, this.componentWillUpdate(r, t, o), 
                    this._blockSetState = !1), this.props = r, this.state = t, this.context = o, g.options.beforeRender && g.options.beforeRender(this);
                    var f = this.render(r, t, o);
                    return g.options.afterRender && g.options.afterRender(this), f;
                }
                this.props = r, this.state = t, this.context = o;
            }
            return y;
        }, k.prototype.render = function(e, t, n) {}, t.default = k;
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
        function s(e) {
            return "function" == typeof e;
        }
        function u(e) {
            return "string" == typeof e;
        }
        function c(e) {
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
            throw e || (e = ht), new Error("Inferno Error: " + e);
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
            var i = Ct.get(e);
            if (n) i || (i = {
                items: new Map(),
                docEvent: null
            }, i.docEvent = w(e, i), Ct.set(e, i)), t || Et && "onClick" === e && k(r), i.items.set(r, n); else if (i) {
                var o = i.items;
                o.delete(r) && 0 === o.size && (document.removeEventListener(b(e), i.docEvent), 
                Ct.delete(e));
            }
        }
        function m(e, t, n, r, i, o) {
            var a = n.get(t);
            if ((!a || (r--, o.dom = t, a.event ? a.event(a.data, e) : a(e), !e.cancelBubble)) && r > 0) {
                var s = t.parentNode;
                if (null === s || i && 1 === s.nodeType && s.disabled) return;
                m(e, s, n, r, i, o);
            }
        }
        function b(e) {
            return e.substr(2).toLowerCase();
        }
        function _() {
            this.cancelBubble = !0, this.stopImmediatePropagation();
        }
        function w(e, t) {
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
        function O() {}
        function k(e) {
            e.onclick = O;
        }
        function S(e) {
            return "checkbox" === e || "radio" === e;
        }
        function T(e) {
            var t = this.vNode, n = t.props || Mt, r = t.dom, i = n.value;
            if (n.onInput) {
                var o = n.onInput;
                o.event ? o.event(o.data, e) : o(e);
            } else n.oninput && n.oninput(e);
            var a = this.vNode, s = a.props || Mt;
            i !== s.value && j(s, r);
        }
        function x(e) {
            var t = this.vNode.props || Mt, n = t.onChange;
            n.event ? n.event(n.data, e) : n(e);
        }
        function E(e) {
            e.stopPropagation();
            var t = this.vNode, n = t.props || Mt, r = t.dom;
            if (n.onClick) {
                var i = n.onClick;
                i.event ? i.event(i.data, e) : i(e);
            } else n.onclick && n.onclick(e);
            j(this.vNode.props || Mt, r);
        }
        function C(e, t, n, r, i) {
            j(n, t), i && (t.vNode = e, r && (S(n.type) ? (t.onclick = E, t.onclick.wrapped = !0) : (t.oninput = T, 
            t.oninput.wrapped = !0), n.onChange && (t.onchange = x, t.onchange.wrapped = !0)));
        }
        function j(e, t) {
            var n = e.type, r = e.value, i = e.checked, a = e.multiple, s = e.defaultValue, u = !o(r);
            n && n !== t.type && t.setAttribute("type", n), a && a !== t.multiple && (t.multiple = a), 
            o(s) || u || (t.defaultValue = s + ""), S(n) ? (u && (t.value = r), o(i) || (t.checked = i)) : u && t.value !== r ? (t.defaultValue = r, 
            t.value = r) : o(i) || (t.checked = i);
        }
        function I(e, t) {
            if ("optgroup" === e.type) {
                var n = e.children;
                if (gt(n)) for (var r = 0, i = n.length; r < i; r++) P(n[r], t); else nt(n) && P(n, t);
            } else P(e, t);
        }
        function P(e, t) {
            var n = e.props || Mt, r = e.dom;
            r.value = n.value, gt(t) && -1 !== t.indexOf(n.value) || n.value === t ? r.selected = !0 : o(t) && o(n.selected) || (r.selected = n.selected || !1);
        }
        function N(e) {
            var t = this.vNode, n = t.props || Mt, r = t.dom, i = n.value;
            if (n.onChange) {
                var o = n.onChange;
                o.event ? o.event(o.data, e) : o(e);
            } else n.onchange && n.onchange(e);
            var a = this.vNode, s = a.props || Mt;
            i !== s.value && M(a, r, s, !1);
        }
        function A(e, t, n, r, i) {
            M(e, t, n, r), i && (t.vNode = e, r && (t.onchange = N, t.onchange.wrapped = !0));
        }
        function M(e, t, n, r) {
            n.multiple !== t.multiple && (t.multiple = n.multiple);
            var i = e.children;
            if (!a(i)) {
                var s = n.value;
                if (r && o(s) && (s = n.defaultValue), gt(i)) for (var u = 0, c = i.length; u < c; u++) I(i[u], s); else nt(i) && I(i, s);
            }
        }
        function R(e) {
            var t = this.vNode.props || Mt, n = t.onChange;
            n.event ? n.event(n.data, e) : n(e);
        }
        function H(e) {
            var t = this.vNode, n = t.props || Mt, r = n.value;
            if (n.onInput) {
                var i = n.onInput;
                i.event ? i.event(i.data, e) : i(e);
            } else n.oninput && n.oninput(e);
            var o = this.vNode;
            r !== (o.props || Mt).value && L(o, t.dom, !1);
        }
        function D(e, t, n, r, i) {
            L(n, t, r), i && (t.vNode = e, r && (t.oninput = H, t.oninput.wrapped = !0, n.onChange && (t.onchange = R, 
            t.onchange.wrapped = !0)));
        }
        function L(e, t, n) {
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
            512 & e && C(t, n, r, i, o), 2048 & e && A(t, n, r, i, o), 1024 & e && D(t, n, r, i, o);
        }
        function F(e) {
            return e.type && S(e.type) ? !o(e.checked) : !o(e.value);
        }
        function W(e) {
            for (var t = e.firstChild; t; ) if (8 === t.nodeType) if ("!" === t.data) {
                var n = document.createTextNode("");
                e.replaceChild(n, t), t = t.nextSibling;
            } else {
                var r = t.previousSibling;
                e.removeChild(t), t = r || e.firstChild;
            } else t = t.nextSibling;
        }
        function z(e, t, n, r, i, o) {
            var a = e.type, s = e.ref, u = e.props || Mt;
            if (o) {
                var c = t.namespaceURI === _t, l = Re(e, a, u, r, c, n), d = l._lastInput;
                l._vNode = e, B(d, t, n, l._childContext, c), e.dom = d.dom, Ne(e, s, l, n), l._updating = !1, 
                yt.findDOMNodeEnabled && Pt.set(l, t);
            } else {
                var f = Le(e, a, u, r);
                B(f, t, n, r, i), e.children = f, e.dom = f.dom, Ae(s, t, n);
            }
            return t;
        }
        function V(e, t, n, r, i) {
            var s = e.children, u = e.props, c = e.className, l = e.flags, d = e.ref;
            if (i = i || (128 & l) > 0, 1 !== t.nodeType || t.tagName.toLowerCase() !== e.type) {
                var f = je(e, null, n, r, i);
                return e.dom = f, Ye(t.parentNode, f, t), f;
            }
            if (e.dom = t, a(s) ? null !== t.firstChild && (t.textContent = "") : G(s, t, n, r, i), 
            u) {
                var p = !1, h = (3584 & l) > 0;
                h && (p = F(u));
                for (var v in u) Oe(v, null, u[v], t, i, p);
                h && U(l, e, t, u, !0, p);
            }
            return o(c) ? "" !== t.className && t.removeAttribute("class") : i ? t.setAttribute("class", c) : t.className = c, 
            d && Me(t, d, n), t;
        }
        function G(e, t, n, r, o) {
            W(t);
            var a = t.firstChild;
            if (i(e)) l(a) || 3 !== a.nodeType ? "" === e ? t.appendChild(document.createTextNode("")) : t.textContent = e : a.nodeValue !== e && (a.nodeValue = e), 
            l(a) || (a = a.nextSibling); else if (gt(e)) for (var s = 0, u = e.length; s < u; s++) {
                var c = e[s];
                if (!l(c) && p(c)) if (l(a)) xe(c, t, n, r, o); else {
                    var d = a.nextSibling;
                    B(c, a, n, r, o), a = d;
                }
            } else l(a) ? xe(e, t, n, r, o) : (B(e, a, n, r, o), a = a.nextSibling);
            for (;a; ) {
                var f = a.nextSibling;
                t.removeChild(a), a = f;
            }
        }
        function Y(e, t) {
            if (3 !== t.nodeType) {
                var n = Ee(e, null);
                return e.dom = n, Ye(t.parentNode, n, t), n;
            }
            var r = e.children;
            return t.nodeValue !== r && (t.nodeValue = r), e.dom = t, t;
        }
        function q(e, t) {
            return e.dom = t, t;
        }
        function B(e, t, n, r, i) {
            var o = e.flags;
            28 & o ? z(e, t, n, r, i, (4 & o) > 0) : 3970 & o ? V(e, t, n, r, i) : 1 & o ? Y(e, t) : 4096 & o ? q(e, t) : h();
        }
        function $(e, t, n) {
            if (!l(t)) {
                var r = t.firstChild;
                if (!l(r)) {
                    for (B(e, r, n, Mt, !1), r = t.firstChild; r = r.nextSibling; ) t.removeChild(r);
                    return !0;
                }
            }
            return !1;
        }
        function X(e, t, n, r) {
            var i = e.type, o = It.get(i);
            if (!f(o)) {
                var a = e.key, s = null === a ? o.nonKeyed : o.keyed.get(a);
                if (!f(s)) {
                    var u = s.pop();
                    if (!f(u)) return pe(u, e, null, t, n, r, !0), e.dom;
                }
            }
            return null;
        }
        function K(e) {
            var t = e.type, n = e.key, r = It.get(t);
            if (f(r) && (r = {
                keyed: new Map(),
                nonKeyed: []
            }, It.set(t, r)), l(n)) r.nonKeyed.push(e); else {
                var i = r.keyed.get(n);
                f(i) && (i = [], r.keyed.set(n, i)), i.push(e);
            }
        }
        function J(e, t, n, r) {
            var i = e.type, o = jt.get(i);
            if (!f(o)) {
                var a = e.key, s = null === a ? o.nonKeyed : o.keyed.get(a);
                if (!f(s)) {
                    var u = s.pop();
                    if (!f(u)) {
                        if (!ve(u, e, null, t, n, r, (4 & e.flags) > 0, !0)) return e.dom;
                    }
                }
            }
            return null;
        }
        function Z(e) {
            var t = e.ref;
            if (!t || !(t.onComponentWillMount || t.onComponentWillUnmount || t.onComponentDidMount || t.onComponentWillUpdate || t.onComponentDidUpdate)) {
                var n = e.type, r = e.key, i = jt.get(n);
                if (f(i) && (i = {
                    keyed: new Map(),
                    nonKeyed: []
                }, jt.set(n, i)), l(r)) i.nonKeyed.push(e); else {
                    var o = i.keyed.get(r);
                    f(o) && (o = [], i.keyed.set(r, o)), o.push(e);
                }
            }
        }
        function Q(e, t, n, r, i) {
            var o = e.flags;
            28 & o ? te(e, t, n, r, i) : 3970 & o ? ne(e, t, n, r, i) : 4097 & o && ee(e, t);
        }
        function ee(e, t) {
            l(t) || qe(t, e.dom);
        }
        function te(e, t, n, r, i) {
            var a = e.children, s = e.flags, u = 4 & s, c = e.ref, d = e.dom;
            if (i || (u ? a._unmounted || (l(yt.beforeUnmount) || yt.beforeUnmount(e), f(a.componentWillUnmount) || a.componentWillUnmount(), 
            c && !i && c(null), a._unmounted = !0, yt.findDOMNodeEnabled && Pt.delete(a), Q(a._lastInput, null, a._lifecycle, !1, i)) : (o(c) || o(c.onComponentWillUnmount) || c.onComponentWillUnmount(d), 
            Q(a, null, n, !1, i))), t) {
                var p = a._lastInput;
                o(p) && (p = a), qe(t, d);
            }
            yt.recyclingEnabled && !u && (t || r) && Z(e);
        }
        function ne(e, t, n, r, i) {
            var a = e.dom, s = e.ref, u = e.props;
            s && !i && ie(s);
            var c = e.children;
            if (o(c) || re(c, n, i), !l(u)) for (var d in u) null !== u[d] && we(d) && (ke(d, u[d], null, a), 
            u[d] = null);
            l(t) || qe(t, a), yt.recyclingEnabled && (t || r) && K(e);
        }
        function re(e, t, n) {
            if (gt(e)) for (var r = 0, i = e.length; r < i; r++) {
                var o = e[r];
                !a(o) && p(o) && Q(o, null, t, !1, n);
            } else p(e) && Q(e, null, t, !1, n);
        }
        function ie(e) {
            if (s(e)) e(null); else {
                if (a(e)) return;
                h();
            }
        }
        function oe(e) {
            yt.findDOMNodeEnabled || h();
            var t = e && e.nodeType ? e : null;
            return Pt.get(e) || t;
        }
        function ae(e) {
            for (var t = 0, n = Nt.length; t < n; t++) {
                var r = Nt[t];
                if (r.dom === e) return r;
            }
            return null;
        }
        function se(e, t, n) {
            var r = {
                dom: e,
                input: t,
                lifecycle: n
            };
            return Nt.push(r), r;
        }
        function ue(e) {
            for (var t = 0, n = Nt.length; t < n; t++) if (Nt[t] === e) return void Nt.splice(t, 1);
        }
        function ce(e, t) {
            if (At === t && h(), e !== pt) {
                var n = ae(t);
                if (l(n)) {
                    var r = new g();
                    a(e) || (e.dom && (e = Ze(e)), $(e, t, r) || xe(e, t, r, Mt, !1), n = se(t, e, r), 
                    r.trigger());
                } else {
                    var i = n.lifecycle;
                    i.listeners = [], o(e) ? (Q(n.input, t, i, !1, !1), ue(n)) : (e.dom && (e = Ze(e)), 
                    de(n.input, e, t, i, Mt, !1, !1)), n.input = e, i.trigger();
                }
                if (n) {
                    var s = n.input;
                    if (s && 28 & s.flags) return s.children;
                }
            }
        }
        function le(e) {
            return function(t, n) {
                e || (e = t), ce(n, e);
            };
        }
        function de(e, t, n, r, i, o, a) {
            if (e !== t) {
                var s = e.flags, u = t.flags;
                if (28 & u) {
                    var c = (4 & u) > 0;
                    28 & s ? ve(e, t, n, r, i, o, c, a) : De(n, Pe(t, null, r, i, o, c), e, r, a);
                } else 3970 & u ? 3970 & s ? pe(e, t, n, r, i, o, a) : De(n, je(t, null, r, i, o), e, r, a) : 1 & u ? 1 & s ? ge(e, t) : De(n, Ee(t, null), e, r, a) : 4096 & u ? 4096 & s ? ye(e, t) : De(n, Ce(t, null), e, r, a) : He(e, t, n, r, i, o, a);
            }
        }
        function fe(e, t, n, r) {
            nt(e) ? Q(e, t, n, !0, r) : gt(e) ? Be(t, e, n, r) : t.textContent = "";
        }
        function pe(e, t, n, r, i, a, s) {
            var u = t.type;
            if (e.type !== u) Ge(e, t, n, r, i, a, s); else {
                var c = e.dom, l = e.props, d = t.props, f = e.children, p = t.children, h = e.flags, v = t.flags, g = t.ref, y = e.className, m = t.className;
                if (t.dom = c, a = a || (128 & v) > 0, f !== p && he(h, v, f, p, c, r, i, !0 === a && "foreignObject" !== t.type, s), 
                l !== d) {
                    var b = l || Mt, _ = d || Mt, w = !1;
                    if (_ !== Mt) {
                        var O = (3584 & v) > 0;
                        O && (w = F(_));
                        for (var k in _) {
                            var S = _[k];
                            Oe(k, b[k], S, c, a, w);
                        }
                        O && U(v, t, c, _, s, w);
                    }
                    if (b !== Mt) for (var T in b) o(_[T]) && !o(b[T]) && Te(T, b[T], c, v);
                }
                y !== m && (o(m) ? c.removeAttribute("class") : a ? c.setAttribute("class", m) : c.className = m), 
                g && (e.ref !== g || s) && Me(c, g, r);
            }
        }
        function he(e, t, n, r, o, s, u, c, l) {
            var d = !1, f = !1;
            64 & t ? d = !0 : (32 & e) > 0 && (32 & t) > 0 ? (f = !0, d = !0) : a(r) ? fe(n, o, s, l) : a(n) ? i(r) ? Ue(o, r) : gt(r) ? Ie(r, o, s, u, c) : xe(r, o, s, u, c) : i(r) ? i(n) ? Fe(o, r) : (fe(n, o, s, l), 
            Ue(o, r)) : gt(r) ? gt(n) ? (d = !0, Xe(n, r) && (f = !0)) : (fe(n, o, s, l), Ie(r, o, s, u, c)) : gt(n) ? (Be(o, n, s, l), 
            xe(r, o, s, u, c)) : nt(r) && (nt(n) ? de(n, r, o, s, u, c, l) : (fe(n, o, s, l), 
            xe(r, o, s, u, c))), d && (f ? be(n, r, o, s, u, c, l) : me(n, r, o, s, u, c, l));
        }
        function ve(e, t, n, r, s, u, c, d) {
            var g = e.type, y = t.type, m = e.key, b = t.key;
            if (g !== y || m !== b) return Ge(e, t, n, r, s, u, d), !1;
            var _ = t.props || Mt;
            if (c) {
                var w = e.children;
                if (w._updating = !0, w._unmounted) {
                    if (l(n)) return !0;
                    Ye(n, Pe(t, null, r, s, u, (4 & t.flags) > 0), e.dom);
                } else {
                    var O, k = !f(w.componentDidUpdate), S = w.state, T = k ? v(S, null) : S, x = w.props;
                    o(w.getChildContext) || (O = w.getChildContext()), t.children = w, w._isSVG = u, 
                    O = o(O) ? s : v(s, O);
                    var E = w._lastInput, C = w._updateComponent(T, S, x, _, s, !1, !1), j = !0;
                    w._childContext = O, a(C) ? C = et() : C === pt ? (C = E, j = !1) : i(C) ? C = tt(C, null) : gt(C) ? h() : p(C) && (l(C.dom) || (C = Ze(C))), 
                    28 & C.flags ? C.parentVNode = t : 28 & E.flags && (E.parentVNode = t), w._lastInput = C, 
                    w._vNode = t, j && (de(E, C, n, r, O, u, d), k && w.componentDidUpdate && w.componentDidUpdate(x, T), 
                    l(yt.afterUpdate) || yt.afterUpdate(t), yt.findDOMNodeEnabled && Pt.set(w, C.dom)), 
                    t.dom = C.dom;
                }
                w._updating = !1;
            } else {
                var I = !0, P = e.props, N = t.ref, A = !o(N), M = e.children, R = M;
                t.dom = e.dom, t.children = M, m !== b ? I = !0 : A && !o(N.onComponentShouldUpdate) && (I = N.onComponentShouldUpdate(P, _)), 
                !1 !== I && (A && !o(N.onComponentWillUpdate) && N.onComponentWillUpdate(P, _), 
                R = y(_, s), a(R) ? R = et() : i(R) && R !== pt ? R = tt(R, null) : gt(R) ? h() : p(R) && (l(R.dom) || (R = Ze(R))), 
                R !== pt && (de(M, R, n, r, s, u, d), t.children = R, A && !o(N.onComponentDidUpdate) && N.onComponentDidUpdate(P, _), 
                t.dom = R.dom)), 28 & R.flags ? R.parentVNode = t : 28 & M.flags && (M.parentVNode = t);
            }
            return !1;
        }
        function ge(e, t) {
            var n = t.children, r = e.dom;
            t.dom = r, e.children !== n && (r.nodeValue = n);
        }
        function ye(e, t) {
            t.dom = e.dom;
        }
        function me(e, t, n, r, i, o, a) {
            for (var s = e.length, u = t.length, c = s > u ? u : s, l = 0; l < c; l++) {
                var d = t[l];
                d.dom && (d = t[l] = Ze(d)), de(e[l], d, n, r, i, o, a);
            }
            if (s < u) for (l = c; l < u; l++) {
                var f = t[l];
                f.dom && (f = t[l] = Ze(f)), We(n, xe(f, null, r, i, o));
            } else if (0 === u) Be(n, e, r, a); else if (s > u) for (l = c; l < s; l++) Q(e[l], n, r, !1, a);
        }
        function be(e, t, n, r, i, o, a) {
            var s, u, c, d, p, h, v, g = e.length, y = t.length, m = g - 1, b = y - 1, _ = 0, w = 0;
            if (0 === g) return void (y > 0 && Ie(t, n, r, i, o));
            if (0 === y) return void Be(n, e, r, a);
            var O = e[_], k = t[w], S = e[m], T = t[b];
            k.dom && (t[w] = k = Ze(k)), T.dom && (t[b] = T = Ze(T));
            e: for (;;) {
                for (;O.key === k.key; ) {
                    if (de(O, k, n, r, i, o, a), _++, w++, _ > m || w > b) break e;
                    O = e[_], k = t[w], k.dom && (t[w] = k = Ze(k));
                }
                for (;S.key === T.key; ) {
                    if (de(S, T, n, r, i, o, a), m--, b--, _ > m || w > b) break e;
                    S = e[m], T = t[b], T.dom && (t[b] = T = Ze(T));
                }
                if (S.key !== k.key) {
                    if (O.key !== T.key) break;
                    de(O, T, n, r, i, o, a), h = b + 1, p = h < t.length ? t[h].dom : null, ze(n, T.dom, p), 
                    _++, b--, O = e[_], T = t[b], T.dom && (t[b] = T = Ze(T));
                } else de(S, k, n, r, i, o, a), ze(n, k.dom, O.dom), m--, w++, S = e[m], k = t[w], 
                k.dom && (t[w] = k = Ze(k));
            }
            if (_ > m) {
                if (w <= b) for (h = b + 1, p = h < t.length ? t[h].dom : null; w <= b; ) v = t[w], 
                v.dom && (t[w] = v = Ze(v)), w++, ze(n, xe(v, null, r, i, o), p);
            } else if (w > b) for (;_ <= m; ) Q(e[_++], n, r, !1, a); else {
                g = m - _ + 1, y = b - w + 1;
                var x = new Array(y);
                for (s = 0; s < y; s++) x[s] = -1;
                var E = !1, C = 0, j = 0;
                if (y <= 4 || g * y <= 16) {
                    for (s = _; s <= m; s++) if (c = e[s], j < y) for (u = w; u <= b; u++) if (d = t[u], 
                    c.key === d.key) {
                        x[u - w] = s, C > u ? E = !0 : C = u, d.dom && (t[u] = d = Ze(d)), de(c, d, n, r, i, o, a), 
                        j++, e[s] = null;
                        break;
                    }
                } else {
                    var I = new Map();
                    for (s = w; s <= b; s++) I.set(t[s].key, s);
                    for (s = _; s <= m; s++) c = e[s], j < y && (u = I.get(c.key), f(u) || (d = t[u], 
                    x[u - w] = s, C > u ? E = !0 : C = u, d.dom && (t[u] = d = Ze(d)), de(c, d, n, r, i, o, a), 
                    j++, e[s] = null));
                }
                if (g === e.length && 0 === j) for (Be(n, e, r, a); w < y; ) v = t[w], v.dom && (t[w] = v = Ze(v)), 
                w++, ze(n, xe(v, null, r, i, o), null); else {
                    for (s = g - j; s > 0; ) c = e[_++], l(c) || (Q(c, n, r, !0, a), s--);
                    if (E) {
                        var P = _e(x);
                        for (u = P.length - 1, s = y - 1; s >= 0; s--) -1 === x[s] ? (C = s + w, v = t[C], 
                        v.dom && (t[C] = v = Ze(v)), h = C + 1, p = h < t.length ? t[h].dom : null, ze(n, xe(v, n, r, i, o), p)) : u < 0 || s !== P[u] ? (C = s + w, 
                        v = t[C], h = C + 1, p = h < t.length ? t[h].dom : null, ze(n, v.dom, p)) : u--;
                    } else if (j !== y) for (s = y - 1; s >= 0; s--) -1 === x[s] && (C = s + w, v = t[C], 
                    v.dom && (t[C] = v = Ze(v)), h = C + 1, p = h < t.length ? t[h].dom : null, ze(n, xe(v, null, r, i, o), p));
                }
            }
        }
        function _e(e) {
            var t, n, r, i, o, a = e.slice(0), s = [ 0 ], u = e.length;
            for (t = 0; t < u; t++) {
                var c = e[t];
                if (-1 !== c) if (n = s[s.length - 1], e[n] < c) a[t] = n, s.push(t); else {
                    for (r = 0, i = s.length - 1; r < i; ) o = (r + i) / 2 | 0, e[s[o]] < c ? r = o + 1 : i = o;
                    c < e[s[r]] && (r > 0 && (a[t] = s[r - 1]), s[r] = t);
                }
            }
            for (r = s.length, i = s[r - 1]; r-- > 0; ) s[r] = i, i = a[i];
            return s;
        }
        function we(e) {
            return "o" === e[0] && "n" === e[1];
        }
        function Oe(e, t, n, r, i, a) {
            if (t !== n) {
                if (Tt.has(e) || a && "value" === e) return;
                if (Ot.has(e)) e = "autoFocus" === e ? e.toLowerCase() : e, r[e] = !!n; else if (wt.has(e)) {
                    var s = o(n) ? "" : n;
                    r[e] !== s && (r[e] = s);
                } else if (we(e)) ke(e, t, n, r); else if (o(n)) r.removeAttribute(e); else if ("style" === e) Se(t, n, r); else if ("dangerouslySetInnerHTML" === e) {
                    var u = t && t.__html, c = n && n.__html;
                    u !== c && (o(c) || (r.innerHTML = c));
                } else i && kt.has(e) ? r.setAttributeNS(kt.get(e), e, n) : r.setAttribute(e, n);
            }
        }
        function ke(e, t, n, r) {
            if (t !== n) if (xt.has(e)) y(e, t, n, r); else {
                var i = e.toLowerCase(), a = r[i];
                if (a && a.wrapped) return;
                if (s(n) || o(n)) r[i] = n; else {
                    var u = n.event;
                    u && s(u) ? r[i] = function(e) {
                        u(n.data, e);
                    } : h();
                }
            }
        }
        function Se(e, t, n) {
            var r, i, a = n.style;
            if (u(t)) return void (a.cssText = t);
            if (o(e) || u(e)) for (r in t) i = t[r], a[r] = !c(i) || St.has(r) ? i : i + "px"; else {
                for (r in t) (i = t[r]) !== e[r] && (a[r] = !c(i) || St.has(r) ? i : i + "px");
                for (r in e) o(t[r]) && (a[r] = "");
            }
        }
        function Te(e, t, n, r) {
            "value" === e ? n.value = 2048 & r ? null : "" : "style" === e ? n.removeAttribute("style") : we(e) ? y(e, t, null, n) : n.removeAttribute(e);
        }
        function xe(e, t, n, r, i) {
            var o = e.flags;
            return 3970 & o ? je(e, t, n, r, i) : 28 & o ? Pe(e, t, n, r, i, (4 & o) > 0) : 4096 & o ? Ce(e, t) : 1 & o ? Ee(e, t) : void h();
        }
        function Ee(e, t) {
            var n = document.createTextNode(e.children);
            return e.dom = n, l(t) || We(t, n), n;
        }
        function Ce(e, t) {
            var n = document.createTextNode("");
            return e.dom = n, l(t) || We(t, n), n;
        }
        function je(e, t, n, r, o) {
            if (yt.recyclingEnabled) {
                var s = X(e, n, r, o);
                if (!l(s)) return l(t) || We(t, s), s;
            }
            var u = e.flags;
            o = o || (128 & u) > 0;
            var c = Ve(e.type, o), d = e.children, f = e.props, p = e.className, h = e.ref;
            if (e.dom = c, !a(d)) if (i(d)) Ue(c, d); else {
                var v = !0 === o && "foreignObject" !== e.type;
                gt(d) ? Ie(d, c, n, r, v) : nt(d) && xe(d, c, n, r, v);
            }
            if (!l(f)) {
                var g = !1, y = (3584 & u) > 0;
                y && (g = F(f));
                for (var m in f) Oe(m, null, f[m], c, o, g);
                y && U(u, e, c, f, !0, g);
            }
            return null !== p && (o ? c.setAttribute("class", p) : c.className = p), l(h) || Me(c, h, n), 
            l(t) || We(t, c), c;
        }
        function Ie(e, t, n, r, i) {
            for (var o = 0, s = e.length; o < s; o++) {
                var u = e[o];
                a(u) || (u.dom && (e[o] = u = Ze(u)), xe(e[o], t, n, r, i));
            }
        }
        function Pe(e, t, n, r, i, o) {
            if (yt.recyclingEnabled) {
                var a = J(e, n, r, i);
                if (!l(a)) return l(t) || We(t, a), a;
            }
            var s, u = e.type, c = e.props || Mt, d = e.ref;
            if (o) {
                var f = Re(e, u, c, r, i, n), p = f._lastInput;
                f._vNode = e, e.dom = s = xe(p, null, n, f._childContext, i), l(t) || We(t, s), 
                Ne(e, d, f, n), f._updating = !1, yt.findDOMNodeEnabled && Pt.set(f, s);
            } else {
                var h = Le(e, u, c, r);
                e.dom = s = xe(h, null, n, r, i), e.children = h, Ae(d, s, n), l(t) || We(t, s);
            }
            return s;
        }
        function Ne(e, t, n, r) {
            t && (s(t) ? t(n) : h());
            var i = !f(n.componentDidMount), o = yt.afterMount;
            !i && l(o) || r.addListener(function() {
                n._updating = !0, o && o(e), i && n.componentDidMount(), n._updating = !1;
            });
        }
        function Ae(e, t, n) {
            e && (o(e.onComponentWillMount) || e.onComponentWillMount(), o(e.onComponentDidMount) || n.addListener(function() {
                return e.onComponentDidMount(t);
            }));
        }
        function Me(e, t, n) {
            if (s(t)) n.addListener(function() {
                return t(e);
            }); else {
                if (a(t)) return;
                h();
            }
        }
        function Re(e, t, n, r, s, u) {
            f(r) && (r = Mt);
            var c = new t(n, r);
            e.children = c, c._blockSetState = !1, c.context = r, c.props === Mt && (c.props = n), 
            c._lifecycle = u, c._unmounted = !1, c._pendingSetState = !0, c._isSVG = s, o(c.componentWillMount) || (c._blockRender = !0, 
            c.componentWillMount(), c._blockRender = !1);
            var d;
            o(c.getChildContext) || (d = c.getChildContext()), o(d) ? c._childContext = r : c._childContext = v(r, d), 
            l(yt.beforeRender) || yt.beforeRender(c);
            var p = c.render(n, c.state, r);
            return l(yt.afterRender) || yt.afterRender(c), gt(p) ? h() : a(p) ? p = et() : i(p) ? p = tt(p, null) : (p.dom && (p = Ze(p)), 
            28 & p.flags && (p.parentVNode = e)), c._pendingSetState = !1, c._lastInput = p, 
            c;
        }
        function He(e, t, n, r, i, o, a) {
            De(n, xe(t, null, r, i, o), e, r, a);
        }
        function De(e, t, n, r, i) {
            Q(n, null, r, !1, i), Ye(e, t, n.dom);
        }
        function Le(e, t, n, r) {
            var o = t(n, r);
            return gt(o) ? h() : a(o) ? o = et() : i(o) ? o = tt(o, null) : (o.dom && (o = Ze(o)), 
            28 & o.flags && (o.parentVNode = e)), o;
        }
        function Ue(e, t) {
            "" !== t ? e.textContent = t : e.appendChild(document.createTextNode(""));
        }
        function Fe(e, t) {
            e.firstChild.nodeValue = t;
        }
        function We(e, t) {
            e.appendChild(t);
        }
        function ze(e, t, n) {
            o(n) ? We(e, t) : e.insertBefore(t, n);
        }
        function Ve(e, t) {
            return !0 === t ? document.createElementNS(_t, e) : document.createElement(e);
        }
        function Ge(e, t, n, r, i, o, a) {
            Q(e, null, r, !1, a);
            var s = xe(t, null, r, i, o);
            t.dom = s, Ye(n, s, e.dom);
        }
        function Ye(e, t, n) {
            e || (e = n.parentNode), e.replaceChild(t, n);
        }
        function qe(e, t) {
            e.removeChild(t);
        }
        function Be(e, t, n, r) {
            (!yt.recyclingEnabled || yt.recyclingEnabled && !r) && $e(null, t, n, r), e.textContent = "";
        }
        function $e(e, t, n, r) {
            for (var i = 0, o = t.length; i < o; i++) {
                var s = t[i];
                a(s) || Q(s, e, n, !0, r);
            }
        }
        function Xe(e, t) {
            return t.length > 0 && !o(t[0]) && !o(t[0].key) && e.length > 0 && !o(e[0]) && !o(e[0].key);
        }
        function Ke(e, t, n, r, i, o, a) {
            this.children = e, this.className = t, this.dom = null, this.flags = n, this.key = r, 
            this.props = i, this.ref = o, this.type = a;
        }
        function Je(e, t, n, i, o, a, s, u) {
            16 & e && (e = r(t) ? 4 : 8);
            var c = new Ke(void 0 === i ? null : i, void 0 === n ? null : n, e, void 0 === a ? null : a, void 0 === o ? null : o, void 0 === s ? null : s, t);
            return !0 !== u && dt(c), null !== yt.createVNode && yt.createVNode(c), c;
        }
        function Ze(e) {
            var t, n = e.flags;
            if (28 & n) {
                var r, o = e.props;
                if (l(o)) r = Mt; else {
                    r = {};
                    for (var s in o) r[s] = o[s];
                }
                t = Je(n, e.type, null, null, r, e.key, e.ref, !0);
                var u = t.props, c = u.children;
                if (c) if (gt(c)) {
                    var d = c.length;
                    if (d > 0) {
                        for (var f = [], p = 0; p < d; p++) {
                            var h = c[p];
                            i(h) ? f.push(h) : !a(h) && nt(h) && f.push(Ze(h));
                        }
                        u.children = f;
                    }
                } else nt(c) && (u.children = Ze(c));
                t.children = null;
            } else if (3970 & n) {
                var v, g = e.children, y = e.props;
                if (null === y) v = Mt; else {
                    v = {};
                    for (var m in y) v[m] = y[m];
                }
                t = Je(n, e.type, e.className, g, v, e.key, e.ref, !g);
            } else 1 & n && (t = tt(e.children, e.key));
            return t;
        }
        function Qe(e, t) {
            for (var n = [], r = arguments.length - 2; r-- > 0; ) n[r] = arguments[r + 2];
            var o = n, s = n.length;
            s > 0 && !f(n[0]) && (t || (t = {}), 1 === s && (o = n[0]), f(o) || (t.children = o));
            var u;
            if (gt(e)) {
                for (var c = [], l = 0, d = e.length; l < d; l++) c.push(Ze(e[l]));
                u = c;
            } else {
                var p = e.flags, h = e.className, g = e.key, y = e.ref;
                if (t && (t.hasOwnProperty("className") && (h = t.className), t.hasOwnProperty("ref") && (y = t.ref), 
                t.hasOwnProperty("key") && (g = t.key)), 28 & p) {
                    u = Je(p, e.type, h, null, e.props || t ? v(e.props, t) : Mt, g, y, !0);
                    var m = u.props;
                    if (m) {
                        var b = m.children;
                        if (b) if (gt(b)) {
                            var _ = b.length;
                            if (_ > 0) {
                                for (var w = [], O = 0; O < _; O++) {
                                    var k = b[O];
                                    i(k) ? w.push(k) : !a(k) && nt(k) && w.push(Ze(k));
                                }
                                m.children = w;
                            }
                        } else nt(b) && (m.children = Ze(b));
                    }
                    u.children = null;
                } else 3970 & p ? (o = t && !f(t.children) ? t.children : e.children, u = Je(p, e.type, h, o, e.props || t ? v(e.props, t) : Mt, g, y, !1)) : 1 & p && (u = tt(e.children, g));
            }
            return u;
        }
        function et() {
            return Je(4096, null);
        }
        function tt(e, t) {
            return Je(1, null, null, e, null, t);
        }
        function nt(e) {
            return !!e.flags;
        }
        function rt(e, t) {
            return t.key = e, t;
        }
        function it(e, t) {
            return c(e) && (e = "." + e), l(t.key) || "." === t.key[0] ? rt(e, t) : t;
        }
        function ot(e, t) {
            return t.key = e + t.key, t;
        }
        function at(e, t, n, r) {
            for (var o = e.length; n < o; n++) {
                var s = e[n], u = r + "." + n;
                a(s) || (gt(s) ? at(s, t, 0, u) : (i(s) ? s = tt(s, null) : (nt(s) && s.dom || s.key && "." === s.key[0]) && (s = Ze(s)), 
                s = l(s.key) || "." === s.key[0] ? rt(u, s) : ot(r, s), t.push(s)));
            }
        }
        function st(e) {
            var t;
            !0 === e.$ ? e = e.slice() : e.$ = !0;
            for (var n = 0, r = e.length; n < r; n++) {
                var o = e[n];
                if (a(o) || gt(o)) {
                    var s = (t || e).slice(0, n);
                    return at(e, s, n, ""), s;
                }
                i(o) ? (t || (t = e.slice(0, n)), t.push(it(n, tt(o, null)))) : nt(o) && null !== o.dom || l(o.key) && 0 == (64 & o.flags) ? (t || (t = e.slice(0, n)), 
                t.push(it(n, Ze(o)))) : t && t.push(it(n, Ze(o)));
            }
            return t || e;
        }
        function ut(e) {
            return gt(e) ? st(e) : nt(e) && null !== e.dom ? Ze(e) : e;
        }
        function ct(e, t, n) {
            3970 & e.flags && (o(n) && t.hasOwnProperty("children") && (e.children = t.children), 
            t.hasOwnProperty("className") && (e.className = t.className || null, delete t.className)), 
            t.hasOwnProperty("ref") && (e.ref = t.ref, delete t.ref), t.hasOwnProperty("key") && (e.key = t.key, 
            delete t.key);
        }
        function lt(e) {
            return "svg" === e ? 128 : "input" === e ? 512 : "select" === e ? 2048 : "textarea" === e ? 1024 : "media" === e ? 256 : 2;
        }
        function dt(e) {
            var t = e.props, n = e.children;
            if (28 & e.flags) {
                var r = e.type, i = r.defaultProps;
                if (!o(i)) if (t) for (var s in i) f(t[s]) && (t[s] = i[s]); else t = e.props = i;
                u(r) && (e.flags = lt(r), t && t.children && (e.children = t.children, n = t.children));
            }
            t && (ct(e, t, n), a(t.children) || (t.children = ut(t.children))), a(n) || (e.children = ut(n));
        }
        function ft(e, t) {
            return s(t) ? {
                data: e,
                event: t
            } : null;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var pt = "$NO_OP", ht = "a runtime error occured! Use Inferno in development environment to find the error.", vt = !("undefined" == typeof window || !window.document), gt = Array.isArray;
        g.prototype.addListener = function(e) {
            this.listeners.push(e);
        }, g.prototype.trigger = function() {
            for (var e, t = this.listeners; e = t.shift(); ) e();
        };
        var yt = {
            afterMount: null,
            afterRender: null,
            afterUpdate: null,
            beforeRender: null,
            beforeUnmount: null,
            createVNode: null,
            findDOMNodeEnabled: !1,
            recyclingEnabled: !1,
            roots: []
        }, mt = "http://www.w3.org/1999/xlink", bt = "http://www.w3.org/XML/1998/namespace", _t = "http://www.w3.org/2000/svg", wt = new Set();
        wt.add("volume"), wt.add("defaultChecked");
        var Ot = new Set();
        Ot.add("muted"), Ot.add("scoped"), Ot.add("loop"), Ot.add("open"), Ot.add("checked"), 
        Ot.add("default"), Ot.add("capture"), Ot.add("disabled"), Ot.add("readOnly"), Ot.add("required"), 
        Ot.add("autoplay"), Ot.add("controls"), Ot.add("seamless"), Ot.add("reversed"), 
        Ot.add("allowfullscreen"), Ot.add("novalidate"), Ot.add("hidden"), Ot.add("autoFocus"), 
        Ot.add("selected");
        var kt = new Map();
        kt.set("xlink:href", mt), kt.set("xlink:arcrole", mt), kt.set("xlink:actuate", mt), 
        kt.set("xlink:show", mt), kt.set("xlink:role", mt), kt.set("xlink:title", mt), kt.set("xlink:type", mt), 
        kt.set("xml:base", bt), kt.set("xml:lang", bt), kt.set("xml:space", bt);
        var St = new Set();
        St.add("animationIterationCount"), St.add("borderImageOutset"), St.add("borderImageSlice"), 
        St.add("borderImageWidth"), St.add("boxFlex"), St.add("boxFlexGroup"), St.add("boxOrdinalGroup"), 
        St.add("columnCount"), St.add("flex"), St.add("flexGrow"), St.add("flexPositive"), 
        St.add("flexShrink"), St.add("flexNegative"), St.add("flexOrder"), St.add("gridRow"), 
        St.add("gridColumn"), St.add("fontWeight"), St.add("lineClamp"), St.add("lineHeight"), 
        St.add("opacity"), St.add("order"), St.add("orphans"), St.add("tabSize"), St.add("widows"), 
        St.add("zIndex"), St.add("zoom"), St.add("fillOpacity"), St.add("floodOpacity"), 
        St.add("stopOpacity"), St.add("strokeDasharray"), St.add("strokeDashoffset"), St.add("strokeMiterlimit"), 
        St.add("strokeOpacity"), St.add("strokeWidth");
        var Tt = new Set();
        Tt.add("children"), Tt.add("childrenType"), Tt.add("defaultValue"), Tt.add("ref"), 
        Tt.add("key"), Tt.add("checked"), Tt.add("multiple");
        var xt = new Set();
        xt.add("onClick"), xt.add("onMouseDown"), xt.add("onMouseUp"), xt.add("onMouseMove"), 
        xt.add("onSubmit"), xt.add("onDblClick"), xt.add("onKeyDown"), xt.add("onKeyUp"), 
        xt.add("onKeyPress");
        var Et = vt && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform), Ct = new Map(), jt = new Map(), It = new Map(), Pt = new Map(), Nt = yt.roots, At = vt ? document.body : null, Mt = {}, Rt = {
            EMPTY_OBJ: Mt,
            NO_OP: pt,
            cloneVNode: Qe,
            createRenderer: le,
            createVNode: Je,
            findDOMNode: oe,
            getFlagsForElementVnode: lt,
            internal_DOMNodeMap: Pt,
            internal_isUnitlessNumber: St,
            internal_normalize: dt,
            internal_patch: de,
            linkEvent: ft,
            options: yt,
            render: ce,
            version: "3.6.4"
        };
        t.default = Rt, t.EMPTY_OBJ = Mt, t.NO_OP = pt, t.cloneVNode = Qe, t.createRenderer = le, 
        t.createVNode = Je, t.findDOMNode = oe, t.getFlagsForElementVnode = lt, t.internal_DOMNodeMap = Pt, 
        t.internal_isUnitlessNumber = St, t.internal_normalize = dt, t.internal_patch = de, 
        t.linkEvent = ft, t.options = yt, t.render = ce, t.version = "3.6.4";
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return u(e) || a(e);
        }
        function i(e) {
            return a(e) || !1 === e || s(e) || u(e);
        }
        function o(e) {
            return "string" == typeof e;
        }
        function a(e) {
            return null === e;
        }
        function s(e) {
            return !0 === e;
        }
        function u(e) {
            return void 0 === e;
        }
        function c(e) {
            return "object" == typeof e;
        }
        function l(e, t) {
            for (var n = [], a = arguments.length - 2; a-- > 0; ) n[a] = arguments[a + 2];
            if (i(e) || c(e)) throw new Error("Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.");
            var s, l = n, p = null, h = null, v = null, g = 0;
            if (n && (1 === n.length ? l = n[0] : 0 === n.length && (l = void 0)), o(e)) {
                if (g = d.getFlagsForElementVnode(e), !r(t)) {
                    s = {};
                    for (var y in t) "className" === y || "class" === y ? v = t[y] : "key" === y ? h = t.key : "children" === y && u(l) ? l = t.children : "ref" === y ? p = t.ref : s[y] = t[y];
                }
            } else if (g = 16, u(l) || (t || (t = {}), t.children = l, l = null), !r(t)) {
                s = {};
                for (var m in t) f.has(m) ? (p || (p = {}), p[m] = t[m]) : "key" === m ? h = t.key : s[m] = t[m];
            }
            return d.createVNode(g, e, v, l, s, h, p);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var d = n(17), f = new Set();
        f.add("onComponentWillMount"), f.add("onComponentDidMount"), f.add("onComponentWillUnmount"), 
        f.add("onComponentShouldUpdate"), f.add("onComponentWillUpdate"), f.add("onComponentDidUpdate"), 
        t.default = l;
    }, function(e, t, n) {
        var r, i, o;
        !function(a, s) {
            i = [ e, n(61), n(63), n(64) ], r = s, void 0 !== (o = "function" == typeof r ? r.apply(t, i) : r) && (e.exports = o);
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
            function s(e, t) {
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
            function u(e, t) {
                var n = "data-clipboard-" + e;
                if (t.hasAttribute(n)) return t.getAttribute(n);
            }
            var c = i(t), l = i(n), d = i(r), f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
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
                return s(t, e), p(t, [ {
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
                        this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new c.default({
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
                        return u("action", e);
                    }
                }, {
                    key: "defaultTarget",
                    value: function(e) {
                        var t = u("target", e);
                        if (t) return document.querySelector(t);
                    }
                }, {
                    key: "defaultText",
                    value: function(e) {
                        return u("text", e);
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
        !function(a, s) {
            i = [ e, n(62) ], r = s, void 0 !== (o = "function" == typeof r ? r.apply(t, i) : r) && (e.exports = o);
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
            if (!s.string(t)) throw new TypeError("Second argument must be a String");
            if (!s.fn(n)) throw new TypeError("Third argument must be a Function");
            if (s.node(e)) return i(e, t, n);
            if (s.nodeList(e)) return o(e, t, n);
            if (s.string(e)) return a(e, t, n);
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
            return u(document.body, e, t, n);
        }
        var s = n(65), u = n(66);
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
        var o = n(67);
        e.exports = r;
    }, function(e, t) {
        function n(e, t) {
            for (;e && e.nodeType !== r; ) {
                if (e.matches(t)) return e;
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
        function r(e) {
            return n(i(e));
        }
        function i(e) {
            var t = o[e];
            if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
            return t;
        }
        var o = {
            "./events.ts": 3,
            "./state/entity.ts": 4,
            "./state/flow.ts": 8,
            "./state/graph.ts": 16,
            "./state/gui.ts": 5,
            "./state/tree.ts": 26,
            "./state/views.ts": 25
        };
        r.keys = function() {
            return Object.keys(o);
        }, r.resolve = i, e.exports = r, r.id = 68;
    } ]);
});