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
        }, t.p = "", t(t.s = 31);
    }([ function(e, t, n) {
        "use strict";
        function r(e, t) {
            return t ? t + "." + e : e;
        }
        function i(e) {
            var t, n, i, o = e.value, s = Object(f.a)(), c = [], u = {};
            return u.HOT = {
                entity: u,
                type: d.PORT_TYPES.HOT
            }, u.COLD = {
                entity: u,
                type: d.PORT_TYPES.COLD
            }, u.id = function(e, n) {
                return s = r(e, n), t = n, u;
            }, u.val = function(e) {
                return o = e, u;
            }, u.updateVal = function(e) {
                return o = e(o), u;
            }, u.accept = function(e) {
                return n = e, u;
            }, u.reset = function() {
                return i = !0, u;
            }, u.getId = function() {
                return s;
            }, e.procedure && c.push(e), u.react = function(e, t, n) {
                var r = a(e, t, n);
                r.pidSuffix = v;
                var i = r.dependencies;
                return r.dependencies = [ {
                    entity: u,
                    type: d.PORT_TYPES.ACCUMULATOR
                } ], i && i.length && (r.dependencies = r.dependencies.concat(i)), c.push(r), u;
            }, u.getGraph = function() {
                var e = l.empty();
                return e.entities[s] = Object(d.createEntity)({
                    id: s,
                    value: o,
                    accept: n,
                    reset: i
                }), c.forEach(function(n) {
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
                    var c = Object(d.createArc)({
                        process: o,
                        entity: s
                    });
                    e.arcs[c.id] = c, e.processes[o] = Object(d.createProcess)({
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
        function s(e) {
            return e && "function" == typeof e.id && "function" == typeof e.getGraph && e.HOT && e.COLD;
        }
        function c(e, t) {
            for (var n in e) {
                var r = e[n];
                s(r) && r.id(n, t);
            }
            return e;
        }
        function u(e) {
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
        }), t.isEntity = s, t.resolveEntityIds = c, t.getGraphFromAll = u;
        var l = n(19), d = n(10), f = n(18), p = this && this.__assign || Object.assign || function(e) {
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
        var i = n(41);
        t.TypeStyle = i.TypeStyle;
        var o = n(43);
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
        var r = n(47);
        n.d(t, "d", function() {
            return r.a;
        }), n.d(t, "h", function() {
            return r.b;
        });
        var i = n(48);
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
        var o = n(49);
        n.d(t, "j", function() {
            return o.a;
        });
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "action", function() {
            return a;
        }), n.d(t, "windowSize", function() {
            return s;
        }), n.d(t, "element", function() {
            return c;
        }), n.d(t, "mouse", function() {
            return u;
        }), n.d(t, "mouseDrag", function() {
            return l;
        }), n.d(t, "dragDeltas", function() {
            return d;
        });
        var r = n(0), i = n(58), o = n(59), a = Object(r.val)(), s = Object(r.asyncStreamStart)(null, i.a), c = Object(r.val)(), u = Object(r.asyncStream)([ c.HOT ], function(e, t) {
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
        });
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
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
        }), n.d(t, "editedValue", function() {
            return h;
        }), n.d(t, "entityValueView", function() {
            return v;
        }), n.d(t, "entityViewProps", function() {
            return g;
        });
        var r = n(0), i = n(8), o = n(4), a = n(9), s = n(1), c = n(6), u = Object(r.val)({}).react([ o.action.HOT, a.graph.COLD ], function(e, t, n) {
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
        }).accept(i.b), d = Object(r.val)({}).react([ u.HOT ], function(e, t) {
            return t;
        }).react([ l.HOT ], function(e, t) {
            return t;
        }), f = Object(r.val)(!0).react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            return n === s.b.ENTITIES.SET_EDIT_MODE ? !r : n === s.b.ENTITIES.SAVE_VALUE || void 0;
        }).react([ u.HOT ], function() {
            return !0;
        }).accept(i.b), p = Object(r.asyncStream)([ a.runtime.COLD, u.HOT, c.visibility.HOT, f.HOT ], function(e, t, n, r, i) {
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
        }), g = Object(r.stream)([ u.HOT, f.HOT ], function(e, t) {
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
            e.react([ c.windowSize.HOT ], i);
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
        var a = n(0), s = n(8), c = n(4), u = n(1), l = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, d = Object(a.val)("").accept(s.c), f = Object(a.val)({
            tree: !1,
            graph: !1,
            entities: !1
        }).react([ c.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if (n === u.b.MAIN.UPDATE_VISIBILITY) return l({}, e, (i = {}, i[r] = !e[r], i));
            if (n === u.b.MAIN.CLOSE_WINDOW) return l({}, e, (o = {}, o[r] = !1, o));
            var i, o;
        }).accept(s.b), p = Object(a.stream)([ c.action.HOT ], function(e) {
            var t = e.type, n = e.payload;
            if (t === u.b.MAIN.SET_ACTIVE_WINDOW || t === u.b.MAIN.UPDATE_VISIBILITY) return n;
        }).accept(Object(s.a)(s.b, s.d)).val(""), h = Object(a.val)(0).react([ p.HOT ], function(e) {
            return e + 1;
        }), v = Object(a.val)({
            left: 0,
            top: 0,
            zIndex: 0
        }).react([ p.COLD, c.dragDeltas.HOT, c.mouse.COLD, c.windowSize.COLD ], function(e, t, n, r, i) {
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
        }).react([ p.COLD, c.mouse.COLD, c.dragDeltas.HOT, c.windowSize.COLD ], function(e, t, n, r, o) {
            var a = n.pressed[0] && n.pressed[0].target;
            if ("tree" === t && a && a.closest(".tvs-flow-tree") && (r.x || r.y)) return "resize" === a.className ? (e.width -= r.x, 
            e.height -= r.y) : (e.left -= r.x, e.top -= r.y), i(e, o);
        }).accept(s.b), y = Object(a.val)({
            top: 200,
            left: 100,
            width: 600,
            height: 600,
            zIndex: 0
        }).react([ p.COLD, c.mouse.COLD, c.dragDeltas.HOT, c.windowSize.COLD ], function(e, t, n, r, o) {
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
        }).react([ p.COLD, c.mouse.COLD, c.dragDeltas.HOT, c.windowSize.COLD ], function(e, t, n, r, o) {
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
            return c;
        }), n.d(t, "c", function() {
            return u;
        }), n.d(t, "b", function() {
            return l;
        }), n.d(t, "g", function() {
            return d;
        }), n.d(t, "f", function() {
            return f;
        });
        var r = n(2), i = (n.n(r), n(44)), o = "white", a = Object(i.a)(40, 40, 40, .75).toString(), s = 16, c = "cyan", u = {
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
            return c;
        }), n.d(t, "graph", function() {
            return u;
        }), n.d(t, "state", function() {
            return l;
        }), n.d(t, "entityTree", function() {
            return d;
        });
        var r = n(0), i = n(26), o = n(4), a = n(8), s = n(1), c = Object(r.val)().react([ o.action.HOT ], function(e, t) {
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
        }).accept(a.b), u = Object(r.stream)([ c.HOT ], function(e) {
            return e.getGraph();
        }), l = Object(r.stream)([ c.HOT ], function(e) {
            return e.getState();
        }), d = Object(r.stream)([ u.HOT ], function(e) {
            return Object(i.createEntityTree)(e.entities);
        });
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = e.id, n = void 0 === t ? Object(a.a)() : t, r = e.value, i = e.json, o = e.accept, s = e.reset, u = e.meta;
            return null == r && i && (r = JSON.parse(i)), {
                id: n,
                value: r,
                accept: o,
                reset: s,
                meta: c({}, u)
            };
        }
        function i(e, t) {
            var n = e.id, r = void 0 === n ? Object(a.a)() : n, i = e.ports, o = void 0 === i ? [] : i, l = e.procedure, d = e.code, f = e.autostart, p = void 0 !== f && f, h = e.async, v = void 0 !== h && h, g = e.delta, y = void 0 !== g && g, m = e.meta;
            if (null == l && null != d && (l = Object(s.a)(d, t)), null == l) throw TypeError("Process must have procedure or code set");
            return y && !o.length && o.push(u.HOT), {
                id: r,
                ports: o,
                procedure: l,
                autostart: p,
                async: v,
                delta: y,
                meta: c({}, m)
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
                meta: c({}, o)
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.createEntity = r, t.createProcess = i, t.createArc = o, n.d(t, "PORT_TYPES", function() {
            return u;
        });
        var a = n(18), s = n(35), c = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, u = {
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
            function c(e, r) {
                for (var o = [], a = [], c = !1, u = 0, l = Object.keys(e); u < l.length; u++) {
                    var d = l[u], f = e[d];
                    d === t.IS_UNIQUE ? c = !!f : i(f) ? a.push([ d.trim(), f ]) : o.push([ n(d.trim()), f ]);
                }
                return {
                    properties: s(o),
                    nestedStyles: r ? a : s(a),
                    isUnique: c
                };
            }
            function u(e) {
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
                var a = c(n, !!t), s = a.properties, f = a.nestedStyles, p = a.isUnique, h = u(s), v = h;
                if (r(t)) {
                    var y = e.add(new x(t, o ? void 0 : h, e.hash));
                    if (h && o) {
                        var m = y.add(new E(h, y.hash, p ? "u" + (++g).toString(36) : void 0));
                        i.push([ o, m ]);
                    }
                    for (var b = 0, _ = f; b < _.length; b++) {
                        var O = _[b], w = O[0], k = O[1];
                        v += w + d(y, w, k, i, o);
                    }
                } else {
                    var S = o ? l(t, o) : t;
                    if (h) {
                        var m = e.add(new E(h, e.hash, p ? "u" + (++g).toString(36) : void 0));
                        i.push([ S, m ]);
                    }
                    for (var T = 0, j = f; T < j.length; T++) {
                        var C = j[T], w = C[0], k = C[1];
                        v += w + d(e, w, k, i, S);
                    }
                }
                return v;
            }
            function f(e, t, n, r, i) {
                for (var o = new S(e.hash), a = [], s = d(o, t, n, a), c = "f" + o.hash(s), u = i ? i + "_" + c : c, f = 0, p = a; f < p.length; f++) {
                    var h = p[f], v = h[0], g = h[1], y = r ? l(v, "." + u) : v;
                    g.add(new T(y, g.hash, void 0, s));
                }
                return {
                    cache: o,
                    pid: s,
                    id: u
                };
            }
            function p(e) {
                return e.values().map(function(e) {
                    return e.getStyles();
                }).join("");
            }
            function h(t, n) {
                return void 0 === t && (t = o), void 0 === n && (n = void 0 !== e && !1), new j(t, n);
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
            }, m = 0, b = [ "-webkit-", "-ms-", "-moz-", "-o-" ]; m < b.length; m++) for (var _ = b[m], O = 0, w = Object.keys(y); O < w.length; O++) {
                var k = w[O];
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
            var E = function(e) {
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
            t.Style = E;
            var x = function(e) {
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
            t.Rule = x;
            var j = function(e) {
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
                    var r = f(this, "", t, !1, this.debug ? n : void 0), i = r.cache, o = r.pid, a = r.id, s = new x(e + " " + a, void 0, this.hash, void 0, o);
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
            t.FreeStyle = j, t.create = h;
        }).call(t, n(39));
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s;
        }), n.d(t, "c", function() {
            return c;
        }), n.d(t, "b", function() {
            return u;
        });
        var r = n(2), i = (n.n(r), n(7)), o = (Object(r.style)({
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
        }, s = Object(r.style)(i.c, o), c = Object(r.style)(i.c, o, a), u = Object(r.style)({
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
        function c() {
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
        t.a = r, t.d = i, t.e = o, t.c = a, t.g = s, t.j = c, t.k = u, t.h = l, t.i = d, 
        t.b = f, t.f = p;
        var h = n(21), v = n(7), g = Object(h.b)({
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
            var t = e.title, n = e.onclick, r = e.icon, a = e.key, s = e.class, c = [ "button", {
                class: Object(i.classes)(o.c, s),
                onmouseup: n,
                title: t
            }, r ];
            return a && (c[1].key = a), c;
        }
        t.a = r;
        var i = n(2), o = (n.n(i), n(12));
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return a;
        }), n.d(t, "e", function() {
            return s;
        }), n.d(t, "d", function() {
            return c;
        }), n.d(t, "c", function() {
            return u;
        }), n.d(t, "b", function() {
            return l;
        });
        var r = n(2), i = (n.n(r), n(7)), o = this && this.__assign || Object.assign || function(e) {
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
        }), c = Object(r.style)(i.b, {
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
        var i = n(0), o = n(4), a = n(8), s = n(9), c = n(10), u = n(6), l = n(1), d = n(5), f = this && this.__assign || Object.assign || function(e) {
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
        }).accept(a.b), h = Object(i.val)({}).react([ s.graph.HOT, u.graphWindow.COLD ], function(e, t, n) {
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
                var s = e.entities[a], c = r(a), u = c.label, l = c.group;
                i[l] = i[l] || o++ % 7 + 1;
                var d = {
                    id: s.id,
                    class: "group-" + i[l],
                    label: u,
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
                    acc: o.ports && o.ports.includes(c.PORT_TYPES.ACCUMULATOR)
                });
                for (var s in e.arcs) {
                    var u = e.arcs[s];
                    u.process === i && (null != u.port ? a.from.push([ u.entity, o.ports && o.ports[u.port] ]) : a.to = u.entity);
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
                    for (var s = 0, u = o.from; s < u.length; s++) {
                        var l = u[s], d = l[0], f = l[1], p = e[d], h = p.x - a.x, v = p.y - a.y;
                        f === c.PORT_TYPES.COLD && (h /= 2, v /= 2), o.x += h, o.y += v;
                    }
                    var g = Math.sqrt(o.x * o.x + o.y * o.y);
                    o.x = 50 * o.x / g + a.x, o.y = 50 * o.y / g + a.y;
                    for (var y = 0, m = o.from; y < m.length; y++) {
                        var b = m[y], d = b[0], f = b[1], p = e[d];
                        o.fromIsActive = o.fromIsActive || p.active, r.push({
                            from: p,
                            to: o,
                            class: "from" + (f === c.PORT_TYPES.COLD ? " cold" : ""),
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
        e.exports = n(63).default, e.exports.default = e.exports;
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
        }, s = [], c = {}, u = 0; u < 256; u++) s[u] = (u + 256).toString(16).substr(1), 
        c[s[u]] = u;
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
        var r = n(37), i = n(40), o = (n.n(i), n(22));
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
                    var c = a[s];
                    (c || 0 === c) && ("$nest" === s && c ? n[s] = n.$nest ? i(n.$nest, c) : c : -1 !== s.indexOf("&") || 0 === s.indexOf("@media") ? n[s] = n[s] ? i(n[s], c) : c : n[s] = c);
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
                    var c = a[s];
                    (c || 0 === c) && ("$nest" === s && c ? n[s] = n.$nest ? i(n.$nest, c) : c : -1 !== s.indexOf("&") || 0 === s.indexOf("@media") ? n[s] = n[s] ? i(n[s], c) : c : n[s] = c);
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
        n.d(t, "a", function() {
            return a;
        });
        var r = n(3), i = n(25), o = function(e) {
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
        function r(e, t) {
            void 0 === t && (t = ".");
            var n = {};
            return Object.keys(e).sort().forEach(function(r) {
                var i = e[r], o = i.id.split(t), a = n, s = o.slice(), c = [];
                o.forEach(function() {
                    var e = s.shift();
                    s.length ? (c.push(e), a = a[e] = a[e] || {
                        __path__: c.join(t)
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
            return c;
        }), n.d(t, "graphWindowProps", function() {
            return u;
        });
        var r = n(0), i = n(5), o = n(6), a = Object(r.stream)([ o.entitiesWindow.HOT, i.activeNode.HOT, o.activeWindow.HOT ], function(e, t, n) {
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
        }), c = Object(r.stream)([ o.treeWindow.HOT, o.activeWindow.HOT ], function(e, t) {
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "treeFold", function() {
            return l;
        }), n.d(t, "treeData", function() {
            return d;
        });
        var r = n(0), i = n(9), o = n(4), a = n(1), s = n(8), c = n(5), u = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, l = Object(r.val)({}).react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if (n === a.b.TREE.TOGGLE_LEVEL) return u({}, e, (i = {}, i[r] = !e[r], i));
            var i;
        }).accept(s.b), d = Object(r.stream)([ l.HOT, i.entityTree.HOT, c.activeEntity.HOT ], function(e, t, n) {
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
            return function t(s, c) {
                var u = c.getId(), l = u + s.name;
                if (o[l]) return o[l];
                var p = function(o) {
                    function c() {
                        var t = null !== o && o.apply(this, arguments) || this;
                        return t.state = {
                            current: e.get(u)
                        }, t.updateAsync = function() {
                            i(l, function() {
                                t.setState(function(t) {
                                    return t.current = e.get(u), t;
                                });
                            });
                        }, t;
                    }
                    return d(c, o), c.prototype.render = function() {
                        return a(s(this.state.current, r, t));
                    }, c.prototype.componentDidMount = function() {
                        n && console.log("component mounted!", this), e.on(u, this.updateAsync);
                    }, c.prototype.componentWillUnmount = function() {
                        n && console.log("component will unmount!", this), e.off(u, this.updateAsync);
                    }, c;
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
        var s = n(61), c = n.n(s), u = n(30), l = n.n(u), d = this && this.__extends || function() {
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
        }(c.a), p = {}, h = !0;
    }, function(e, t, n) {
        e.exports = n(64).default, e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), n.d(t, "ui", function() {
            return c;
        }), n.d(t, "console", function() {
            return u;
        }), n.d(t, "utils", function() {
            return l;
        });
        var r = n(32), i = n(74), o = n(26), a = n(20), s = n(29);
        t.default = r;
        var c = r, u = {
            tree: i
        }, l = {
            entityTree: o,
            webpack: a,
            yoyo: s
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
                document.body.removeChild(w), k.destroy();
            }
            var p = b({
                debug: !1,
                graph: null
            }, t), v = o.a.create();
            v.addGraph(Object(a.getGraphFromModules)(_)), v.flush(), e && v.set(u.title.getId(), e), 
            p.graph && v.set(f.nodeState.getId(), p.graph), r(e, f.viewBox, v), r(e, f.nodeState, v), 
            r(e, u.visibility, v), r(e, u.entitiesWindow, v), r(e, u.graphWindow, v), r(e, u.treeWindow, v), 
            r(e, u.controlsPosition, v);
            var y = Object(c.flowComponentFactory)(v, l.action.getId(), p.debug), O = Object(s.a)(y), w = document.createElement("div");
            w.className = "tvs-flow-tools-container", document.body.appendChild(w), g.a.render(m()(O), w), 
            v.set(l.element.getId(), w);
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
                    return w;
                }
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.start = i;
        var o = n(33), a = n(20), s = n(36), c = n(29), u = n(6), l = n(4), d = n(9), f = n(16), p = n(65), h = n.n(p), v = n(17), g = n.n(v), y = n(30), m = n.n(y), b = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, _ = n(73);
    }, function(e, t, n) {
        "use strict";
        var r = n(34);
        n(0), n(19), n(10);
        t.a = r;
        r.create;
    }, function(e, t, n) {
        "use strict";
        function r() {
            function e() {
                return {
                    entities: N,
                    processes: P,
                    arcs: A,
                    meta: H
                };
            }
            function t() {
                var e = {};
                for (var t in M.es) e[t] = M.es[t].val;
                return e;
            }
            function n() {
                return R;
            }
            function r(e) {
                R = e;
            }
            function a() {
                return H;
            }
            function s(e) {
                null == e || "object" != typeof e || e instanceof Array || (H = o({}, H, e));
            }
            function c(e) {
                L = e;
            }
            function u(e) {
                return M.es[e] && M.es[e].val;
            }
            function l(e, t) {
                T(C(e), t, !0) && k();
            }
            function d(e, t) {
                l(e, t(u(e)));
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
                N[t.id] = t;
                var n = C(t.id);
                return null == t.value || !t.reset && null != n.val || (n.val = t.value, U[t.id] = !1, 
                z = !0), n.accept = t.accept, t;
            }
            function v(e) {
                var t = C(e);
                for (var n in t.arcs) b(n);
                delete M.es[e], delete N[e];
            }
            function g(e) {
                var t = Object(i.createProcess)(e, R), n = t.ports, r = I(t.id);
                P[t.id] = t, delete r.acc, r.values = [], r.sources = [], r.async = t.async, r.delta = t.delta, 
                Object.keys(r.arcs).forEach(function(e) {
                    var t = A[e].port;
                    null == t || n[t] && n[t] !== i.PORT_TYPES.ACCUMULATOR || b(e);
                }), n.forEach(function(e, t) {
                    e === i.PORT_TYPES.ACCUMULATOR && (r.acc = t);
                });
                for (var o in r.arcs) _(A[o]);
                return t;
            }
            function y(e) {
                var t = I(e);
                t.stop && (t.stop(), delete t.stop);
                for (var n in t.arcs) b(n);
                delete M.ps[e], delete P[e];
            }
            function m(e) {
                var t = Object(i.createArc)(e);
                A[t.id] = t, _(t);
                var n = I(t.process), r = P[t.process];
                return r && !0 === r.autostart && Object.keys(n.arcs).length === Object.keys(r.ports).length + 1 && E(n), 
                t;
            }
            function b(e) {
                var t = A[e];
                if (t) {
                    var n = I(t.process), r = C(t.entity);
                    delete n.arcs[e], delete r.arcs[e], null != t.port ? (delete r.effects[t.process], 
                    delete n.sources[t.port], delete n.values[t.port]) : (n.stop && (n.stop(), delete n.stop), 
                    n.sink = function() {}, delete n.out, delete r.reactions[t.process]);
                }
                delete A[e];
            }
            function _(e) {
                var t = e.process, n = e.entity, r = I(t), o = C(n), a = P[t];
                o.arcs[e.id] = !0, a && (r.arcs[e.id] = !0, null != e.port ? (delete o.effects[t], 
                a.ports && null != a.ports[e.port] && (r.sources[e.port] = o, a.ports[e.port] === i.PORT_TYPES.HOT && (o.effects[t] = r))) : (r.out = o, 
                null != r.acc ? (r.sources[r.acc] = o, o.reactions[t] = r) : delete o.reactions[t], 
                r.sink = function(e) {
                    T(o, e, !0) && !W && k();
                }));
            }
            function O(e) {
                if (e.entities) for (var t in e.entities) h(e.entities[t]);
                if (e.processes) for (var t in e.processes) g(e.processes[t]);
                if (e.arcs) for (var t in e.arcs) m(e.arcs[t]);
                s(e.meta);
            }
            function w(e) {
                var t = {}, n = {};
                if (e.entities) for (var r in e.entities) {
                    var i = e.entities[r];
                    i.id && (t[i.id] = !0);
                }
                if (e.processes) for (var r in e.processes) {
                    var o = e.processes[r];
                    o.id && (n[o.id] = !0);
                }
                var a = Object.keys(N).filter(function(e) {
                    return !t[e];
                }), s = Object.keys(P).filter(function(e) {
                    return !n[e];
                });
                a.forEach(v), s.forEach(y), O(e);
            }
            function k() {
                L && console.log("flushing graph recursively with", U);
                for (var e = Object.keys(U), t = 0, n = e; t < n.length; t++) {
                    var r = n[t];
                    if (U[r]) {
                        var i = M.es[r];
                        for (var o in i.reactions) S(i.reactions[o]);
                    }
                }
                var a = {};
                U = {}, z = !1, W = !0;
                for (var s = 0, c = e; s < c.length; s++) {
                    var r = c[s], i = M.es[r];
                    i.cb.length > 0 && (D[r] = i);
                    for (var o in i.effects) a[o] || (S(i.effects[o]), a[o] = !0);
                }
                if (W = !1, z) k(); else {
                    var u = Object.keys(D);
                    D = {};
                    for (var l in u) for (var i = M.es[u[l]], d = 0, f = i.cb; d < f.length; d++) {
                        var p = f[d];
                        p(i.val);
                    }
                    L && console.log("flush finished");
                }
            }
            function S(e) {
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
                if (t) if (L && console.log("running process", e.id), e.async) e.stop && e.stop(), 
                e.stop = P[e.id].procedure.apply(R, [ e.sink ].concat(e.values)); else {
                    var i = P[e.id].procedure.apply(R, e.values);
                    e.out && T(e.out, i, null == e.acc);
                }
            }
            function T(e, t, n) {
                return !(e.accept && !e.accept(t, e.val)) && (e.oldVal = e.val, e.val = t, null != t && (U[e.id] = n, 
                z = !0), !0);
            }
            function E(e) {
                e.async ? requestAnimationFrame(function() {
                    S(e);
                }) : (S(e), e.out && (U[e.out.id] = !1));
            }
            function x(e) {
                var t = I(e);
                S(t), t.async || k();
            }
            function j(e) {
                var t = I(e);
                t.stop && (t.stop(), delete t.stop);
            }
            function C(e) {
                return N[e] || h({
                    id: e
                }), M.es[e] || (M.es[e] = {
                    id: e,
                    val: void 0,
                    reactions: {},
                    effects: {},
                    arcs: {},
                    cb: []
                });
            }
            function I(e) {
                return M.ps[e] || (M.ps[e] = {
                    id: e,
                    arcs: {},
                    sink: function() {}
                });
            }
            var N = {}, P = {}, A = {}, M = {
                es: {},
                ps: {}
            }, H = {}, R = null, L = !1, D = {}, U = {}, W = !1, z = !1;
            return {
                addEntity: h,
                removeEntity: v,
                addProcess: g,
                removeProcess: y,
                addArc: m,
                removeArc: b,
                addGraph: O,
                replaceGraph: w,
                getGraph: e,
                getState: t,
                setMeta: s,
                getMeta: a,
                getContext: n,
                setContext: r,
                setDebug: c,
                get: u,
                set: l,
                update: d,
                on: f,
                off: p,
                start: x,
                stop: j,
                flush: k,
                PORT_TYPES: o({}, i.PORT_TYPES)
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.create = r;
        var i = n(10), o = this && this.__assign || Object.assign || function(e) {
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
                style: E({}, a)
            }, n(r, O.title), [ "nav", {
                class: "tvs-controls-btns"
            }, [ "ul", [ "li", Object(h.a)({
                class: o.tree && x,
                onclick: s("tree"),
                icon: f.e(),
                title: "toggle entity tree"
            }) ], [ "li", Object(h.a)({
                class: o.graph && x,
                onclick: s("graph"),
                icon: f.d(),
                title: "toggle flow graph"
            }) ], [ "li", Object(h.a)({
                class: o.entities && x,
                onclick: s("entities"),
                icon: f.c(),
                title: "toggle entity details"
            }) ] ] ] ];
        }
        function a(e, t, n) {
            var r = e.dimensions, o = e.window;
            return [ "article", {
                class: Object(d.a)("tvs-flow-tree", v.e),
                style: E({}, r),
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
                style: E({}, o),
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
        function c(e, t, n) {
            var r = e.dimensions, o = e.node, a = e.window, s = o && o.procedure ? Object(y.b)(o, t) : n(y.a, S.entityViewProps);
            return [ "article", {
                class: Object(d.a)("tvs-flow-entities", v.e),
                style: E({}, r),
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
        function u(e, t, n) {
            var r = e.tree ? n(a, w.treeWindowProps) : "", i = e.graph ? n(s, w.graphWindowProps) : "", u = e.entities ? n(c, w.entitiesWindowProps) : "";
            return [ "article", {
                class: Object(d.a)("tvs-flow-tools", p.f)
            }, n(o, w.controlProps), i, u, r ];
        }
        function l(e) {
            return e(u, O.visibility);
        }
        t.a = l;
        var d = n(21), f = n(13), p = n(7), h = n(14), v = n(15), g = n(55), y = n(57), m = n(60), b = n(12), _ = n(1), O = n(6), w = n(27), k = n(16), S = n(5), T = n(28), E = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, x = Object(d.b)({
            color: p.e
        });
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s;
        });
        var r = n(38), i = n(22), o = n(11), a = (n.n(o), function() {
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
                    var o = n._freeStyle, a = Object(r.a)(i.b.apply(void 0, e)), s = a.result, c = a.debugName, u = c ? o.registerStyle(s, c) : o.registerStyle(s);
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
                    var s = a;
                    for (var c in s) {
                        var u = s[c];
                        t[c] = r(u).result;
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
        var o = n(11);
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
        function c(e, t) {
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
            h.push(new c(e, t)), 1 !== h.length || v || i(s);
        }, c.prototype.run = function() {
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
        var r = n(42), i = n(23), o = n(11), a = function() {
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
                    var o = n._freeStyle, a = r.ensureStringObj(i.extend.apply(void 0, e)), s = a.result, c = a.debugName, u = c ? o.registerStyle(s, c) : o.registerStyle(s);
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
        t.TypeStyle = s;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = {}, n = "";
            for (var i in e) {
                var a = e[i];
                if ("$unique" === i) t[o.IS_UNIQUE] = a; else if ("$nest" === i) {
                    var s = a;
                    for (var c in s) {
                        var u = s[c];
                        t[c] = r(u).result;
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
        var o = n(11);
        t.ensureStringObj = r, t.explodeKeyframes = i;
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(45);
        n.d(t, "a", function() {
            return r.a;
        });
    }, function(e, t, n) {
        "use strict";
        var r = (n(46), n(50), n(51));
        n.d(t, "a", function() {
            return r.a;
        });
        n(52), n(24), n(53), n(54), n(25);
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
        function s(e) {
            var t = u.exec(e);
            if (t && t.length) return [ t[1] ].concat(t[2].split(","));
        }
        function c(e, t) {
            return e + "(" + Array.prototype.join.call(t, ",") + ")";
        }
        n.d(t, "f", function() {
            return d;
        }), t.c = r, t.e = i, t.d = o, t.b = a, t.g = s, t.a = c;
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
        var r = (n(3), n(24));
        r.a, r.a, r.a;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return h(e) || v(e) || g(e) || h("red");
        }
        function i(e, t, n) {
            return new T(O, e, t, n, 1, !1);
        }
        function o(e, t, n, r) {
            return new T(O, e, t, n, Object(b.c)(r), !0);
        }
        function a(e) {
            var t = Math.round(e);
            return (t < 16 ? "0" : "") + t.toString(16);
        }
        function s(e) {
            return ((e < 0 ? 360 : 0) + e % 360) % 360;
        }
        function c(e, t, n, r, i) {
            var o, a = e / 255, s = t / 255, c = n / 255, u = Math.min(a, s, c), l = Math.max(a, s, c), d = (u + l) / 2, f = l - u;
            o = l === u ? 0 : a === l ? (s - c) / f : s === l ? 2 + (c - a) / f : c === l ? 4 + (a - s) / f : 0, 
            (o = Math.min(60 * o, 360)) < 0 && (o += 360);
            var p;
            return p = l === u ? 0 : d <= .5 ? f / (l + u) : f / (2 - l - u), new T(w, o, p, d, r, i);
        }
        function u(e, t, n, r, i) {
            var o = e / 360, a = t, s = n;
            if (0 === a) {
                var c = 255 * s;
                return new T(O, c, c, c, r, i);
            }
            for (var u = s < .5 ? s * (1 + a) : s + a - s * a, l = 2 * s - u, d = 0, f = 0, p = 0, h = 0; h < 3; h++) {
                var v = o + 1 / 3 * -(h - 1);
                v < 0 && v++, v > 1 && v--;
                var c = void 0;
                c = 6 * v < 1 ? l + 6 * (u - l) * v : 2 * v < 1 ? u : 3 * v < 2 ? l + (u - l) * (2 / 3 - v) * 6 : l, 
                c *= 255, 0 === h ? d = c : 1 === h ? f = c : p = c;
            }
            return new T(O, d, f, p, r, i);
        }
        function l(e, t, n, r, i, o, a) {
            return e === t ? new T(e, n, r, i, o, a) : k[e - t](n, r, i, o, a);
        }
        function d(e, t, n, r) {
            if (!_) return [ e || 0, t || 0, n || 0, r || 0 ];
            var i = new Float32Array(4);
            return i[0] = e || 0, i[1] = t || 0, i[2] = n || 0, i[3] = r || 0, i;
        }
        function f(e, t, n) {
            var r = S[e][t];
            return n < 0 ? 0 : n > r ? r : n;
        }
        function p(e) {
            return e instanceof T ? e : r(e);
        }
        function h(e) {
            return E[e] || void 0;
        }
        function v(e) {
            var t = e.match(/#(([a-f0-9]{6})|([a-f0-9]{3}))$/i);
            if (t) {
                var n = t[1], r = parseInt(3 === n.length ? n[0] + n[0] + n[1] + n[1] + n[2] + n[2] : n, 16);
                return new T(O, r >> 16 & 255, r >> 8 & 255, 255 & r, 1, !1);
            }
        }
        function g(e) {
            var t = Object(b.i)(e);
            if (t && (4 === t.length || 5 === t.length)) {
                var n, r = t[0], i = "rgba" === r, o = "hsla" === r, a = "rgb" === r, s = "hsl" === r, c = o || i;
                if (a || i) n = O; else {
                    if (!s && !o) throw new Error("unsupported color string");
                    n = w;
                }
                var u = parseFloat(t[1]), l = a || i ? parseFloat(t[2]) : Object(b.c)(t[2]), d = a || i ? parseFloat(t[3]) : Object(b.c)(t[3]), f = c ? parseFloat(t[4]) : 1;
                return new T(n, u, l, d, f, c);
            }
        }
        t.a = o;
        var y, m, b = n(3), _ = "undefined" != typeof Float32Array, O = 0, w = 1, k = (y = {}, 
        y[O - w] = c, y[w - O] = u, y), S = (m = {}, m[O] = d(255, 255, 255, 1), m[w] = d(360, 1, 1, 1), 
        m), T = function() {
            function e(e, t, n, r, i, o) {
                this._format = e, this._hasAlpha = o, this._values = d(f(e, 0, t), f(e, 1, n), f(e, 2, r), f(e, 3, i));
            }
            return e.convertHelper = function(e, t) {
                var n = t._format, r = t._values, i = t._hasAlpha;
                return n === e ? t : k[n - e](r[0], r[1], r[2], r[3], i);
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
                var r = e.convertHelper(w, this)._values, i = S[w][2], o = r[2] + (n ? i - r[2] : i) * Object(b.c)(t);
                return e.convertHelper(this._format, new e(w, r[0], r[1], o, this._values[3], this._hasAlpha));
            }, e.prototype.darken = function(t, n) {
                var r = e.convertHelper(w, this)._values, i = r[2] - (n ? r[2] : S[w][2]) * Object(b.c)(t);
                return e.convertHelper(this._format, new e(w, r[0], r[1], i, this._values[3], this._hasAlpha));
            }, e.prototype.saturate = function(t, n) {
                var r = e.convertHelper(w, this)._values, i = S[w][1], o = r[1] + (n ? i - r[1] : i) * Object(b.c)(t);
                return e.convertHelper(this._format, new e(w, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.desaturate = function(t, n) {
                var r = e.convertHelper(w, this)._values, i = S[w][1], o = r[1] - (n ? r[1] : i) * Object(b.c)(t);
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
                var r = this, i = p(t), o = e.convertHelper(O, r)._values, a = e.convertHelper(O, i)._values, s = void 0 === n ? .5 : n, c = 2 * s - 1, u = Math.abs(o[3] - a[3]), l = ((c * u == -1 ? c : (c + u) / (1 + c * u)) + 1) / 2, d = 1 - l, f = new e(O, Math.round(o[0] * l + a[0] * d), Math.round(o[1] * l + a[1] * d), Math.round(o[2] * l + a[2] * d), o[3] * s + a[3] * (1 - s), r._hasAlpha || i._hasAlpha);
                return e.convertHelper(this._format, f);
            }, e.prototype.tint = function(e) {
                return j.mix(this, e);
            }, e.prototype.shade = function(e) {
                return x.mix(this, e);
            }, e.prototype.spin = function(t) {
                var n = e.convertHelper(w, this)._values;
                return e.convertHelper(this._format, new e(w, s(n[0] + t), n[1], n[2], this._values[3], this._hasAlpha));
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
            var n = e.entities, r = e.processes, i = e.edges, c = e.viewBox, u = void 0 === c ? {} : c;
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
        var o = n(56), a = n(2), s = (n.n(a), n(1));
    }, function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return o;
        });
        var r = n(2), i = (n.n(r), n(7)), o = Object(r.style)(i.b, {
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
                class: c.a,
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
                class: c.a,
                onclick: function() {
                    return t(l.b.ENTITIES.SET_EDIT_MODE, !1);
                }
            }, "Cancel" ], [ "button", {
                class: c.a,
                key: "save-btn-" + i.id,
                onclick: function() {
                    return t(l.b.ENTITIES.SAVE_VALUE, i.id);
                }
            }, "Save" ]), [ "section", {
                class: u.b
            }, [ "div", {
                class: u.d
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
                class: u.b
            }, [ "div", {
                class: u.d
            }, [ "code", [ "pre", e.procedure.toString() ] ] ], n ];
        }
        t.a = i, t.b = o;
        var a = n(13), s = n(14), c = n(12), u = n(15), l = n(1), d = n(5);
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
            var s = t.element, c = void 0 === s ? document : s, u = t.enableRightButton, l = {
                pressed: {},
                drag: {
                    x: 0,
                    y: 0
                }
            }, d = 0, f = 0, p = !1;
            return c.addEventListener("mousedown", n), document.addEventListener("mouseup", r), 
            document.addEventListener("mousemove", o), u && c.addEventListener("contextmenu", a), 
            e(l), function() {
                c.removeEventListener("mousedown", n), document.removeEventListener("mousemove", o), 
                document.removeEventListener("mouseup", r), u && c.removeEventListener("contextmenu", a);
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
                }, Object(c.a)({
                    icon: s.i(),
                    class: u.b,
                    onclick: function() {
                        return i(l.a.ENTITY_INSPECT, a.id);
                    },
                    title: "Inspect entity value"
                }) ];
                null != a.value && f.push(Object(c.a)({
                    class: u.b,
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
                var c = Object.keys(i).map(function(e) {
                    return r(e, i[e], a.id, t, n);
                });
                s.push.apply(s, c);
            }
            return s;
        }
        t.a = i;
        var o = n(15), a = n(2), s = (n.n(a), n(13)), c = n(14), u = n(12), l = n(1), d = Object(a.style)({
            transform: "rotate(90deg)"
        });
    }, function(e, t, n) {
        e.exports = n(62).default, e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = typeof e;
            return "string" === t || "number" === t;
        }
        function i(e) {
            return u(e) || s(e);
        }
        function o(e) {
            return s(e) || !1 === e || c(e) || u(e);
        }
        function a(e) {
            return "function" == typeof e;
        }
        function s(e) {
            return null === e;
        }
        function c(e) {
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
            var r = O.get(e);
            void 0 === r && (r = [], O.set(e, r), w.then(function() {
                O.delete(e), e._updating = !0, v(e, t, function() {
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
                if (null === s) e.state = r; else for (var c in r) s[c] = r[c];
                e._pendingState = null, !i(n) && e._blockRender && e._lifecycle.addListener(n.bind(e));
            } else e._updating ? p(e, !1, n) : (e._pendingSetState = !0, e._updating = !0, v(e, !1, n), 
            e._updating = !1);
        }
        function v(e, t, n) {
            if (!e._unmounted) {
                if (t || !e._blockRender) {
                    e._pendingSetState = !1;
                    var a = e._pendingState, c = e.state, u = d(c, a), p = e.props, h = e.context;
                    e._pendingState = null;
                    var v = e._updateComponent(c, u, p, p, h, t, !0), m = !0;
                    o(v) ? v = g.createVNode(4096, null) : v === y ? (v = e._lastInput, m = !1) : r(v) ? v = g.createVNode(1, null, null, v) : _(v) && l();
                    var b = e._lastInput, O = e._vNode, w = b.dom && b.dom.parentNode || (b.dom = O.dom);
                    if (e._lastInput = v, m) {
                        var k;
                        i(e.getChildContext) || (k = e.getChildContext()), k = i(k) ? e._childContext : d(h, k);
                        var S = e._lifecycle;
                        g.internal_patch(b, v, w, S, k, e._isSVG, !1), S.trigger(), i(e.componentDidUpdate) || e.componentDidUpdate(p, c, h), 
                        s(g.options.afterUpdate) || g.options.afterUpdate(O);
                    }
                    var T = O.dom = v.dom;
                    g.options.findDOMNodeEnabled && g.internal_DOMNodeMap.set(e, v.dom), f(O, T);
                } else e.state = e._pendingState, e._pendingState = null;
                i(n) || n.call(e);
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var g = n(17), y = "$NO_OP", m = "a runtime error occured! Use Inferno in development environment to find the error.", b = !("undefined" == typeof window || !window.document), _ = Array.isArray, O = new Map(), w = Promise.resolve(), k = function(e, t) {
            this.state = null, this._blockRender = !1, this._blockSetState = !0, this._pendingSetState = !1, 
            this._pendingState = null, this._lastInput = null, this._vNode = null, this._unmounted = !1, 
            this._lifecycle = null, this._childContext = null, this._isSVG = !1, this._updating = !0, 
            this.props = e || g.EMPTY_OBJ, this.context = t || g.EMPTY_OBJ;
        };
        k.prototype.forceUpdate = function(e) {
            !this._unmounted && b && v(this, !0, e);
        }, k.prototype.setState = function(e, t) {
            this._unmounted || (this._blockSetState ? l() : h(this, e, t));
        }, k.prototype._updateComponent = function(e, t, n, r, o, a, s) {
            if (!0 === this._unmounted && l(), n !== r || r === g.EMPTY_OBJ || e !== t || a) {
                if (n !== r || r === g.EMPTY_OBJ) {
                    if (!i(this.componentWillReceiveProps) && !s) {
                        var c = d(this.state);
                        this._blockRender = !0, this.componentWillReceiveProps(r, o), this._blockRender = !1;
                        var u = this.state;
                        c !== u && (this.state = c, this._pendingSetState = !0, this._pendingState = u);
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
        function c(e) {
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
            throw e || (e = gt), new Error("Inferno Error: " + e);
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
            var i = It.get(e);
            if (n) i || (i = {
                items: new Map(),
                docEvent: null
            }, i.docEvent = O(e, i), It.set(e, i)), t || Ct && "onClick" === e && k(r), i.items.set(r, n); else if (i) {
                var o = i.items;
                o.delete(r) && 0 === o.size && (document.removeEventListener(b(e), i.docEvent), 
                It.delete(e));
            }
        }
        function m(e, t, n, r, i, o) {
            for (var a = t; r > 0; ) {
                var s = n.get(a);
                if (s && (r--, o.dom = a, s.event ? s.event(s.data, e) : s(e), e.cancelBubble)) return;
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
        function k(e) {
            e.onclick = w;
        }
        function S(e) {
            return "checkbox" === e || "radio" === e;
        }
        function T(e) {
            var t = this.vNode, n = t.props || Rt, r = t.dom, i = n.value;
            if (n.onInput) {
                var o = n.onInput;
                o.event ? o.event(o.data, e) : o(e);
            } else n.oninput && n.oninput(e);
            var a = this.vNode, s = a.props || Rt;
            i !== s.value && C(s, r);
        }
        function E(e) {
            var t = this.vNode.props || Rt, n = t.onChange;
            n.event ? n.event(n.data, e) : n(e);
        }
        function x(e) {
            e.stopPropagation();
            var t = this.vNode, n = t.props || Rt, r = t.dom;
            if (n.onClick) {
                var i = n.onClick;
                i.event ? i.event(i.data, e) : i(e);
            } else n.onclick && n.onclick(e);
            C(this.vNode.props || Rt, r);
        }
        function j(e, t, n, r, i) {
            C(n, t), i && (t.vNode = e, r && (S(n.type) ? (t.onclick = x, t.onclick.wrapped = !0) : (t.oninput = T, 
            t.oninput.wrapped = !0), n.onChange && (t.onchange = E, t.onchange.wrapped = !0)));
        }
        function C(e, t) {
            var n = e.type, r = e.value, i = e.checked, a = e.multiple, s = e.defaultValue, c = !o(r);
            n && n !== t.type && t.setAttribute("type", n), a && a !== t.multiple && (t.multiple = a), 
            o(s) || c || (t.defaultValue = s + ""), S(n) ? (c && (t.value = r), o(i) || (t.checked = i)) : c && t.value !== r ? (t.defaultValue = r, 
            t.value = r) : o(i) || (t.checked = i);
        }
        function I(e, t) {
            if ("optgroup" === e.type) {
                var n = e.children;
                if (mt(n)) for (var r = 0, i = n.length; r < i; r++) N(n[r], t); else it(n) && N(n, t);
            } else N(e, t);
        }
        function N(e, t) {
            var n = e.props || Rt, r = e.dom;
            r.value = n.value, mt(t) && -1 !== t.indexOf(n.value) || n.value === t ? r.selected = !0 : o(t) && o(n.selected) || (r.selected = n.selected || !1);
        }
        function P(e) {
            var t = this.vNode, n = t.props || Rt, r = t.dom, i = n.value;
            if (n.onChange) {
                var o = n.onChange;
                o.event ? o.event(o.data, e) : o(e);
            } else n.onchange && n.onchange(e);
            var a = this.vNode, s = a.props || Rt;
            i !== s.value && M(a, r, s, !1);
        }
        function A(e, t, n, r, i) {
            M(e, t, n, r), i && (t.vNode = e, r && (t.onchange = P, t.onchange.wrapped = !0));
        }
        function M(e, t, n, r) {
            n.multiple !== t.multiple && (t.multiple = n.multiple);
            var i = e.children;
            if (!a(i)) {
                var s = n.value;
                if (r && o(s) && (s = n.defaultValue), mt(i)) for (var c = 0, u = i.length; c < u; c++) I(i[c], s); else it(i) && I(i, s);
            }
        }
        function H(e) {
            var t = this.vNode.props || Rt, n = t.onChange;
            n.event ? n.event(n.data, e) : n(e);
        }
        function R(e) {
            var t = this.vNode, n = t.props || Rt, r = n.value;
            if (n.onInput) {
                var i = n.onInput;
                i.event ? i.event(i.data, e) : i(e);
            } else n.oninput && n.oninput(e);
            var o = this.vNode;
            r !== (o.props || Rt).value && D(o, t.dom, !1);
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
            return e.type && S(e.type) ? !o(e.checked) : !o(e.value);
        }
        function z(e) {
            for (var t = e.firstChild; t; ) if (8 === t.nodeType) if ("!" === t.data) {
                var n = document.createTextNode("");
                e.replaceChild(n, t), t = t.nextSibling;
            } else {
                var r = t.previousSibling;
                e.removeChild(t), t = r || e.firstChild;
            } else t = t.nextSibling;
        }
        function V(e, t, n, r, i, o) {
            var a = e.type, s = e.ref, c = e.props || Rt;
            if (o) {
                var u = t.namespaceURI === wt, l = He(e, a, c, r, u, n), d = l._lastInput;
                l._vNode = e, q(d, t, n, l._childContext, u), e.dom = d.dom, Pe(e, s, l, n), l._updating = !1, 
                bt.findDOMNodeEnabled && At.set(l, t);
            } else {
                var f = De(e, a, c, r);
                q(f, t, n, r, i), e.children = f, e.dom = f.dom, Ae(c, s, t, n);
            }
            return t;
        }
        function F(e, t, n, r, i) {
            var s = e.children, c = e.props, u = e.className, l = e.flags, d = e.ref;
            if (i = i || (128 & l) > 0, 1 !== t.nodeType || t.tagName.toLowerCase() !== e.type) {
                var f = Ce(e, null, n, r, i);
                return e.dom = f, Ye(t.parentNode, f, t), f;
            }
            if (e.dom = t, a(s) ? null === t.firstChild || Xe(t, c) || (t.textContent = "") : G(s, t, n, r, i), 
            c) {
                var p = !1, h = (3584 & l) > 0;
                h && (p = W(c));
                for (var v in c) we(v, null, c[v], t, i, p);
                h && U(l, e, t, c, !0, p);
            }
            return o(u) ? "" !== t.className && t.removeAttribute("class") : i ? t.setAttribute("class", u) : t.className = u, 
            d && Me(t, d, n), t;
        }
        function G(e, t, n, r, o) {
            z(t);
            var a = t.firstChild;
            if (i(e)) l(a) || 3 !== a.nodeType ? "" === e ? t.appendChild(document.createTextNode("")) : t.textContent = e : a.nodeValue !== e && (a.nodeValue = e), 
            l(a) || (a = a.nextSibling); else if (mt(e)) for (var s = 0, c = e.length; s < c; s++) {
                var u = e[s];
                if (!l(u) && p(u)) if (l(a)) Ee(u, t, n, r, o); else {
                    var d = a.nextSibling;
                    q(u, a, n, r, o), a = d;
                }
            } else l(a) ? Ee(e, t, n, r, o) : (q(e, a, n, r, o), a = a.nextSibling);
            for (;a; ) {
                var f = a.nextSibling;
                t.removeChild(a), a = f;
            }
        }
        function Y(e, t) {
            if (3 !== t.nodeType) {
                var n = xe(e, null);
                return e.dom = n, Ye(t.parentNode, n, t), n;
            }
            var r = e.children;
            return t.nodeValue !== r && (t.nodeValue = r), e.dom = t, t;
        }
        function B(e, t) {
            return e.dom = t, t;
        }
        function q(e, t, n, r, i) {
            var o = e.flags;
            28 & o ? V(e, t, n, r, i, (4 & o) > 0) : 3970 & o ? F(e, t, n, r, i) : 1 & o ? Y(e, t) : 4096 & o ? B(e, t) : h();
        }
        function $(e, t, n) {
            if (!l(t)) {
                var r = t.firstChild;
                if (!l(r)) {
                    for (q(e, r, n, Rt, !1), r = t.firstChild; r = r.nextSibling; ) t.removeChild(r);
                    return !0;
                }
            }
            return !1;
        }
        function K(e, t, n, r) {
            var i = e.type, o = Pt.get(i);
            if (!f(o)) {
                var a = e.key, s = null === a ? o.nonKeyed : o.keyed.get(a);
                if (!f(s)) {
                    var c = s.pop();
                    if (!f(c)) return pe(c, e, null, t, n, r, !0), e.dom;
                }
            }
            return null;
        }
        function J(e) {
            var t = e.type, n = e.key, r = Pt.get(t);
            if (f(r) && (r = {
                keyed: new Map(),
                nonKeyed: []
            }, Pt.set(t, r)), l(n)) r.nonKeyed.push(e); else {
                var i = r.keyed.get(n);
                f(i) && (i = [], r.keyed.set(n, i)), i.push(e);
            }
        }
        function X(e, t, n, r) {
            var i = e.type, o = Nt.get(i);
            if (!f(o)) {
                var a = e.key, s = null === a ? o.nonKeyed : o.keyed.get(a);
                if (!f(s)) {
                    var c = s.pop();
                    if (!f(c)) {
                        if (!ve(c, e, null, t, n, r, (4 & e.flags) > 0, !0)) return e.dom;
                    }
                }
            }
            return null;
        }
        function Q(e) {
            var t = e.ref;
            if (!t || !(t.onComponentWillMount || t.onComponentWillUnmount || t.onComponentDidMount || t.onComponentWillUpdate || t.onComponentDidUpdate)) {
                var n = e.type, r = e.key, i = Nt.get(n);
                if (f(i) && (i = {
                    keyed: new Map(),
                    nonKeyed: []
                }, Nt.set(n, i)), l(r)) i.nonKeyed.push(e); else {
                    var o = i.keyed.get(r);
                    f(o) && (o = [], i.keyed.set(r, o)), o.push(e);
                }
            }
        }
        function Z(e, t, n, r, i) {
            var o = e.flags;
            28 & o ? te(e, t, n, r, i) : 3970 & o ? ne(e, t, n, r, i) : 4097 & o && ee(e, t);
        }
        function ee(e, t) {
            l(t) || Be(t, e.dom);
        }
        function te(e, t, n, r, i) {
            var a = e.children, s = e.flags, c = 4 & s, u = e.props || Rt, d = e.ref, p = e.dom;
            i || (c ? a._unmounted || (l(bt.beforeUnmount) || bt.beforeUnmount(e), f(a.componentWillUnmount) || a.componentWillUnmount(), 
            d && !i && d(null), a._unmounted = !0, bt.findDOMNodeEnabled && At.delete(a), Z(a._lastInput, null, a._lifecycle, !1, i)) : (o(d) || o(d.onComponentWillUnmount) || d.onComponentWillUnmount(p, u), 
            Z(a, null, n, !1, i))), t && Be(t, p), bt.recyclingEnabled && !c && (t || r) && Q(e);
        }
        function ne(e, t, n, r, i) {
            var a = e.dom, s = e.ref, c = e.props;
            s && !i && ie(s);
            var u = e.children;
            if (o(u) || re(u, n, i), !l(c)) for (var d in c) null !== c[d] && Oe(d) && (ke(d, c[d], null, a), 
            c[d] = null);
            l(t) || Be(t, a), bt.recyclingEnabled && (t || r) && J(e);
        }
        function re(e, t, n) {
            if (mt(e)) for (var r = 0, i = e.length; r < i; r++) {
                var o = e[r];
                !a(o) && p(o) && Z(o, null, t, !1, n);
            } else p(e) && Z(e, null, t, !1, n);
        }
        function ie(e) {
            if (s(e)) e(null); else {
                if (a(e)) return;
                h();
            }
        }
        function oe(e) {
            bt.findDOMNodeEnabled || h();
            var t = e && e.nodeType ? e : null;
            return At.get(e) || t;
        }
        function ae(e) {
            for (var t = 0, n = Mt.length; t < n; t++) {
                var r = Mt[t];
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
            return Mt.push(r), r;
        }
        function ce(e) {
            for (var t = 0, n = Mt.length; t < n; t++) if (Mt[t] === e) return void Mt.splice(t, 1);
        }
        function ue(e, t) {
            if (Ht === t && h(), e !== vt) {
                var n = ae(t);
                if (l(n)) {
                    var r = new g();
                    a(e) || (e.dom && (e = et(e)), $(e, t, r) || Ee(e, t, r, Rt, !1), n = se(t, e, r), 
                    r.trigger());
                } else {
                    var i = n.lifecycle;
                    i.listeners = [], o(e) ? (Z(n.input, t, i, !1, !1), ce(n)) : (e.dom && (e = et(e)), 
                    de(n.input, e, t, i, Rt, !1, !1)), n.input = e, i.trigger();
                }
                if (n) {
                    var s = n.input;
                    if (s && 28 & s.flags) return s.children;
                }
            }
        }
        function le(e) {
            return function(t, n) {
                e || (e = t), ue(n, e);
            };
        }
        function de(e, t, n, r, i, o, a) {
            if (e !== t) {
                var s = e.flags, c = t.flags;
                if (28 & c) {
                    var u = (4 & c) > 0;
                    28 & s ? ve(e, t, n, r, i, o, u, a) : Le(n, Ne(t, null, r, i, o, u), e, r, a);
                } else 3970 & c ? 3970 & s ? pe(e, t, n, r, i, o, a) : Le(n, Ce(t, null, r, i, o), e, r, a) : 1 & c ? 1 & s ? ge(e, t) : Le(n, xe(t, null), e, r, a) : 4096 & c ? 4096 & s ? ye(e, t) : Le(n, je(t, null), e, r, a) : Re(e, t, n, r, i, o, a);
            }
        }
        function fe(e, t, n, r) {
            it(e) ? Z(e, t, n, !0, r) : mt(e) ? qe(t, e, n, r) : t.textContent = "";
        }
        function pe(e, t, n, r, i, a, s) {
            var c = t.type;
            if (e.type !== c) Ge(e, t, n, r, i, a, s); else {
                var u = e.dom, l = e.props, d = t.props, f = e.children, p = t.children, h = e.flags, v = t.flags, g = t.ref, y = e.className, m = t.className;
                if (t.dom = u, a = a || (128 & v) > 0, f !== p && he(h, v, f, p, u, r, i, !0 === a && "foreignObject" !== t.type, s), 
                l !== d) {
                    var b = l || Rt, _ = d || Rt, O = !1;
                    if (_ !== Rt) {
                        var w = (3584 & v) > 0;
                        w && (O = W(_));
                        for (var k in _) {
                            var S = _[k];
                            we(k, b[k], S, u, a, O);
                        }
                        w && U(v, t, u, _, s, O);
                    }
                    if (b !== Rt) for (var T in b) o(_[T]) && !o(b[T]) && Te(T, b[T], u, v);
                }
                y !== m && (o(m) ? u.removeAttribute("class") : a ? u.setAttribute("class", m) : u.className = m), 
                g && (e.ref !== g || s) && Me(u, g, r);
            }
        }
        function he(e, t, n, r, o, s, c, u, l) {
            var d = !1, f = !1;
            64 & t ? d = !0 : (32 & e) > 0 && (32 & t) > 0 ? (f = !0, d = !0) : a(r) ? fe(n, o, s, l) : a(n) ? i(r) ? Ue(o, r) : mt(r) ? Ie(r, o, s, c, u) : Ee(r, o, s, c, u) : i(r) ? i(n) ? We(o, r) : (fe(n, o, s, l), 
            Ue(o, r)) : mt(r) ? mt(n) ? (d = !0, Ke(n, r) && (f = !0)) : (fe(n, o, s, l), Ie(r, o, s, c, u)) : mt(n) ? (qe(o, n, s, l), 
            Ee(r, o, s, c, u)) : it(r) && (it(n) ? de(n, r, o, s, c, u, l) : (fe(n, o, s, l), 
            Ee(r, o, s, c, u))), d && (f ? be(n, r, o, s, c, u, l) : me(n, r, o, s, c, u, l));
        }
        function ve(e, t, n, r, s, c, u, d) {
            var g = e.type, y = t.type, m = e.key, b = t.key;
            if (g !== y || m !== b) return Ge(e, t, n, r, s, c, d), !1;
            var _ = t.props || Rt;
            if (u) {
                var O = e.children;
                if (O._updating = !0, O._unmounted) {
                    if (l(n)) return !0;
                    Ye(n, Ne(t, null, r, s, c, (4 & t.flags) > 0), e.dom);
                } else {
                    var w = !f(O.componentDidUpdate), k = O.state, S = w ? v(k, null) : k, T = O.props;
                    t.children = O, O._isSVG = c;
                    var E, x = O._lastInput, j = O._updateComponent(S, k, T, _, s, !1, !1), C = !0;
                    o(O.getChildContext) || (E = O.getChildContext()), E = o(E) ? s : v(s, E), O._childContext = E, 
                    a(j) ? j = nt() : j === vt ? (j = x, C = !1) : i(j) ? j = rt(j, null) : mt(j) ? h() : p(j) && (l(j.dom) || (j = et(j))), 
                    28 & j.flags ? j.parentVNode = t : 28 & x.flags && (x.parentVNode = t), O._lastInput = j, 
                    O._vNode = t, C && (de(x, j, n, r, E, c, d), w && O.componentDidUpdate && O.componentDidUpdate(T, S), 
                    l(bt.afterUpdate) || bt.afterUpdate(t), bt.findDOMNodeEnabled && At.set(O, j.dom)), 
                    t.dom = j.dom;
                }
                O._updating = !1;
            } else {
                var I = !0, N = e.props, P = t.ref, A = !o(P), M = e.children, H = M;
                t.dom = e.dom, t.children = M, m !== b ? I = !0 : A && !o(P.onComponentShouldUpdate) && (I = P.onComponentShouldUpdate(N, _)), 
                !1 !== I && (A && !o(P.onComponentWillUpdate) && P.onComponentWillUpdate(N, _), 
                H = y(_, s), a(H) ? H = nt() : i(H) && H !== vt ? H = rt(H, null) : mt(H) ? h() : p(H) && (l(H.dom) || (H = et(H))), 
                H !== vt && (de(M, H, n, r, s, c, d), t.children = H, A && !o(P.onComponentDidUpdate) && P.onComponentDidUpdate(N, _), 
                t.dom = H.dom)), 28 & H.flags ? H.parentVNode = t : 28 & M.flags && (M.parentVNode = t);
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
            for (var s = e.length, c = t.length, u = s > c ? c : s, l = 0; l < u; l++) {
                var d = t[l];
                d.dom && (d = t[l] = et(d)), de(e[l], d, n, r, i, o, a);
            }
            if (s < c) for (l = u; l < c; l++) {
                var f = t[l];
                f.dom && (f = t[l] = et(f)), ze(n, Ee(f, null, r, i, o));
            } else if (0 === c) qe(n, e, r, a); else if (s > c) for (l = u; l < s; l++) Z(e[l], n, r, !1, a);
        }
        function be(e, t, n, r, i, o, a) {
            var s, c, u, d, p, h, v, g = e.length, y = t.length, m = g - 1, b = y - 1, _ = 0, O = 0;
            if (0 === g) return void (y > 0 && Ie(t, n, r, i, o));
            if (0 === y) return void qe(n, e, r, a);
            var w = e[_], k = t[O], S = e[m], T = t[b];
            k.dom && (t[O] = k = et(k)), T.dom && (t[b] = T = et(T));
            e: for (;;) {
                for (;w.key === k.key; ) {
                    if (de(w, k, n, r, i, o, a), _++, O++, _ > m || O > b) break e;
                    w = e[_], k = t[O], k.dom && (t[O] = k = et(k));
                }
                for (;S.key === T.key; ) {
                    if (de(S, T, n, r, i, o, a), m--, b--, _ > m || O > b) break e;
                    S = e[m], T = t[b], T.dom && (t[b] = T = et(T));
                }
                if (S.key !== k.key) {
                    if (w.key !== T.key) break;
                    de(w, T, n, r, i, o, a), h = b + 1, p = h < t.length ? t[h].dom : null, Ve(n, T.dom, p), 
                    _++, b--, w = e[_], T = t[b], T.dom && (t[b] = T = et(T));
                } else de(S, k, n, r, i, o, a), Ve(n, k.dom, w.dom), m--, O++, S = e[m], k = t[O], 
                k.dom && (t[O] = k = et(k));
            }
            if (_ > m) {
                if (O <= b) for (h = b + 1, p = h < t.length ? t[h].dom : null; O <= b; ) v = t[O], 
                v.dom && (t[O] = v = et(v)), O++, Ve(n, Ee(v, null, r, i, o), p);
            } else if (O > b) for (;_ <= m; ) Z(e[_++], n, r, !1, a); else {
                g = m - _ + 1, y = b - O + 1;
                var E = new Array(y);
                for (s = 0; s < y; s++) E[s] = -1;
                var x = !1, j = 0, C = 0;
                if (y <= 4 || g * y <= 16) {
                    for (s = _; s <= m; s++) if (u = e[s], C < y) for (c = O; c <= b; c++) if (d = t[c], 
                    u.key === d.key) {
                        E[c - O] = s, j > c ? x = !0 : j = c, d.dom && (t[c] = d = et(d)), de(u, d, n, r, i, o, a), 
                        C++, e[s] = null;
                        break;
                    }
                } else {
                    var I = new Map();
                    for (s = O; s <= b; s++) I.set(t[s].key, s);
                    for (s = _; s <= m; s++) u = e[s], C < y && (c = I.get(u.key), f(c) || (d = t[c], 
                    E[c - O] = s, j > c ? x = !0 : j = c, d.dom && (t[c] = d = et(d)), de(u, d, n, r, i, o, a), 
                    C++, e[s] = null));
                }
                if (g === e.length && 0 === C) for (qe(n, e, r, a); O < y; ) v = t[O], v.dom && (t[O] = v = et(v)), 
                O++, Ve(n, Ee(v, null, r, i, o), null); else {
                    for (s = g - C; s > 0; ) u = e[_++], l(u) || (Z(u, n, r, !0, a), s--);
                    if (x) {
                        var N = _e(E);
                        for (c = N.length - 1, s = y - 1; s >= 0; s--) -1 === E[s] ? (j = s + O, v = t[j], 
                        v.dom && (t[j] = v = et(v)), h = j + 1, p = h < t.length ? t[h].dom : null, Ve(n, Ee(v, null, r, i, o), p)) : c < 0 || s !== N[c] ? (j = s + O, 
                        v = t[j], h = j + 1, p = h < t.length ? t[h].dom : null, Ve(n, v.dom, p)) : c--;
                    } else if (C !== y) for (s = y - 1; s >= 0; s--) -1 === E[s] && (j = s + O, v = t[j], 
                    v.dom && (t[j] = v = et(v)), h = j + 1, p = h < t.length ? t[h].dom : null, Ve(n, Ee(v, null, r, i, o), p));
                }
            }
        }
        function _e(e) {
            var t, n, r, i, o, a = e.slice(0), s = [ 0 ], c = e.length;
            for (t = 0; t < c; t++) {
                var u = e[t];
                if (-1 !== u) if (n = s[s.length - 1], e[n] < u) a[t] = n, s.push(t); else {
                    for (r = 0, i = s.length - 1; r < i; ) o = (r + i) / 2 | 0, e[s[o]] < u ? r = o + 1 : i = o;
                    u < e[s[r]] && (r > 0 && (a[t] = s[r - 1]), s[r] = t);
                }
            }
            for (r = s.length, i = s[r - 1]; r-- > 0; ) s[r] = i, i = a[i];
            return s;
        }
        function Oe(e) {
            return "o" === e[0] && "n" === e[1];
        }
        function we(e, t, n, r, i, a) {
            if (t !== n) {
                if (xt.has(e) || a && "value" === e) return;
                if (St.has(e)) e = "autoFocus" === e ? e.toLowerCase() : e, r[e] = !!n; else if (kt.has(e)) {
                    var s = o(n) ? "" : n;
                    r[e] !== s && (r[e] = s);
                } else if (Oe(e)) ke(e, t, n, r); else if (o(n)) r.removeAttribute(e); else if ("style" === e) Se(t, n, r); else if ("dangerouslySetInnerHTML" === e) {
                    var c = t && t.__html, u = n && n.__html;
                    c !== u && (o(u) || Je(r, u) || (r.innerHTML = u));
                } else i && Tt.has(e) ? r.setAttributeNS(Tt.get(e), e, n) : r.setAttribute(e, n);
            }
        }
        function ke(e, t, n, r) {
            if (t !== n) if (jt.has(e)) y(e, t, n, r); else {
                var i = e.toLowerCase(), a = r[i];
                if (a && a.wrapped) return;
                if (s(n) || o(n)) r[i] = n; else {
                    var c = n.event;
                    c && s(c) ? r[i] = function(e) {
                        c(n.data, e);
                    } : h();
                }
            }
        }
        function Se(e, t, n) {
            var r, i, a = n.style;
            if (c(t)) return void (a.cssText = t);
            if (o(e) || c(e)) for (r in t) i = t[r], a[r] = !u(i) || Et.has(r) ? i : i + "px"; else {
                for (r in t) (i = t[r]) !== e[r] && (a[r] = !u(i) || Et.has(r) ? i : i + "px");
                for (r in e) o(t[r]) && (a[r] = "");
            }
        }
        function Te(e, t, n, r) {
            "value" === e ? n.value = 2048 & r ? null : "" : "style" === e ? n.removeAttribute("style") : Oe(e) ? y(e, t, null, n) : n.removeAttribute(e);
        }
        function Ee(e, t, n, r, i) {
            var o = e.flags;
            return 3970 & o ? Ce(e, t, n, r, i) : 28 & o ? Ne(e, t, n, r, i, (4 & o) > 0) : 4096 & o ? je(e, t) : 1 & o ? xe(e, t) : void h();
        }
        function xe(e, t) {
            var n = document.createTextNode(e.children);
            return e.dom = n, l(t) || ze(t, n), n;
        }
        function je(e, t) {
            var n = document.createTextNode("");
            return e.dom = n, l(t) || ze(t, n), n;
        }
        function Ce(e, t, n, r, o) {
            var s;
            if (bt.recyclingEnabled && (s = K(e, n, r, o), !l(s))) return l(t) || ze(t, s), 
            s;
            var c = e.flags;
            o = o || (128 & c) > 0, s = Fe(e.type, o);
            var u = e.children, d = e.props, f = e.className, p = e.ref;
            if (e.dom = s, !a(u)) if (i(u)) Ue(s, u); else {
                var h = !0 === o && "foreignObject" !== e.type;
                mt(u) ? Ie(u, s, n, r, h) : it(u) && Ee(u, s, n, r, h);
            }
            if (!l(d)) {
                var v = !1, g = (3584 & c) > 0;
                g && (v = W(d));
                for (var y in d) we(y, null, d[y], s, o, v);
                g && U(c, e, s, d, !0, v);
            }
            return null !== f && (o ? s.setAttribute("class", f) : s.className = f), l(p) || Me(s, p, n), 
            l(t) || ze(t, s), s;
        }
        function Ie(e, t, n, r, i) {
            for (var o = 0, s = e.length; o < s; o++) {
                var c = e[o];
                a(c) || (c.dom && (e[o] = c = et(c)), Ee(e[o], t, n, r, i));
            }
        }
        function Ne(e, t, n, r, i, o) {
            var a;
            if (bt.recyclingEnabled && (a = X(e, n, r, i), !l(a))) return l(t) || ze(t, a), 
            a;
            var s = e.type, c = e.props || Rt, u = e.ref;
            if (o) {
                var d = He(e, s, c, r, i, n), f = d._lastInput;
                d._vNode = e, e.dom = a = Ee(f, null, n, d._childContext, i), l(t) || ze(t, a), 
                Pe(e, u, d, n), d._updating = !1, bt.findDOMNodeEnabled && At.set(d, a);
            } else {
                var p = De(e, s, c, r);
                e.dom = a = Ee(p, null, n, r, i), e.children = p, Ae(c, u, a, n), l(t) || ze(t, a);
            }
            return a;
        }
        function Pe(e, t, n, r) {
            t && (s(t) ? t(n) : h());
            var i = !f(n.componentDidMount), o = bt.afterMount;
            !i && l(o) || r.addListener(function() {
                n._updating = !0, o && o(e), i && n.componentDidMount(), n._updating = !1;
            });
        }
        function Ae(e, t, n, r) {
            t && (o(t.onComponentWillMount) || t.onComponentWillMount(e), o(t.onComponentDidMount) || r.addListener(function() {
                return t.onComponentDidMount(n, e);
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
        function He(e, t, n, r, s, c) {
            f(r) && (r = Rt);
            var u = new t(n, r);
            e.children = u, u._blockSetState = !1, u.context = r, u.props === Rt && (u.props = n), 
            u._lifecycle = c, u._unmounted = !1, u._pendingSetState = !0, u._isSVG = s, o(u.componentWillMount) || (u._blockRender = !0, 
            u.componentWillMount(), u._blockRender = !1);
            var d;
            o(u.getChildContext) || (d = u.getChildContext()), o(d) ? u._childContext = r : u._childContext = v(r, d), 
            l(bt.beforeRender) || bt.beforeRender(u);
            var p = u.render(n, u.state, r);
            return l(bt.afterRender) || bt.afterRender(u), mt(p) ? h() : a(p) ? p = nt() : i(p) ? p = rt(p, null) : (p.dom && (p = et(p)), 
            28 & p.flags && (p.parentVNode = e)), u._pendingSetState = !1, u._lastInput = p, 
            u;
        }
        function Re(e, t, n, r, i, o, a) {
            Le(n, Ee(t, null, r, i, o), e, r, a);
        }
        function Le(e, t, n, r, i) {
            Z(n, null, r, !1, i), Ye(e, t, n.dom);
        }
        function De(e, t, n, r) {
            var o = t(n, r);
            return mt(o) ? h() : a(o) ? o = nt() : i(o) ? o = rt(o, null) : (o.dom && (o = et(o)), 
            28 & o.flags && (o.parentVNode = e)), o;
        }
        function Ue(e, t) {
            "" !== t ? e.textContent = t : e.appendChild(document.createTextNode(""));
        }
        function We(e, t) {
            e.firstChild.nodeValue = t;
        }
        function ze(e, t) {
            e.appendChild(t);
        }
        function Ve(e, t, n) {
            o(n) ? ze(e, t) : e.insertBefore(t, n);
        }
        function Fe(e, t) {
            return !0 === t ? document.createElementNS(wt, e) : document.createElement(e);
        }
        function Ge(e, t, n, r, i, o, a) {
            Z(e, null, r, !1, a);
            var s = Ee(t, null, r, i, o);
            t.dom = s, Ye(n, s, e.dom);
        }
        function Ye(e, t, n) {
            e || (e = n.parentNode), e.replaceChild(t, n);
        }
        function Be(e, t) {
            e.removeChild(t);
        }
        function qe(e, t, n, r) {
            (!bt.recyclingEnabled || bt.recyclingEnabled && !r) && $e(null, t, n, r), e.textContent = "";
        }
        function $e(e, t, n, r) {
            for (var i = 0, o = t.length; i < o; i++) {
                var s = t[i];
                a(s) || Z(s, e, n, !0, r);
            }
        }
        function Ke(e, t) {
            return t.length > 0 && !o(t[0]) && !o(t[0].key) && e.length > 0 && !o(e[0]) && !o(e[0].key);
        }
        function Je(e, t) {
            var n = document.createElement("i");
            return n.innerHTML = t, n.innerHTML === e.innerHTML;
        }
        function Xe(e, t) {
            return Boolean(t && t.dangerouslySetInnerHTML && t.dangerouslySetInnerHTML.__html && Je(e, t.dangerouslySetInnerHTML.__html));
        }
        function Qe(e, t, n, r, i, o, a) {
            this.children = e, this.className = t, this.dom = null, this.flags = n, this.key = r, 
            this.props = i, this.ref = o, this.type = a;
        }
        function Ze(e, t, n, i, o, a, s, c) {
            16 & e && (e = r(t) ? 4 : 8);
            var u = new Qe(void 0 === i ? null : i, void 0 === n ? null : n, e, void 0 === a ? null : a, void 0 === o ? null : o, void 0 === s ? null : s, t);
            return !0 !== c && pt(u), null !== bt.createVNode && bt.createVNode(u), u;
        }
        function et(e) {
            var t, n = e.flags;
            if (28 & n) {
                var r, o = e.props;
                if (l(o)) r = Rt; else {
                    r = {};
                    for (var s in o) r[s] = o[s];
                }
                t = Ze(n, e.type, null, null, r, e.key, e.ref, !0);
                var c = t.props, u = c.children;
                if (u) if (mt(u)) {
                    var d = u.length;
                    if (d > 0) {
                        for (var f = [], p = 0; p < d; p++) {
                            var h = u[p];
                            i(h) ? f.push(h) : !a(h) && it(h) && f.push(et(h));
                        }
                        c.children = f;
                    }
                } else it(u) && (c.children = et(u));
                t.children = null;
            } else if (3970 & n) {
                var v, g = e.children, y = e.props;
                if (null === y) v = Rt; else {
                    v = {};
                    for (var m in y) v[m] = y[m];
                }
                t = Ze(n, e.type, e.className, g, v, e.key, e.ref, !g);
            } else 1 & n && (t = rt(e.children, e.key));
            return t;
        }
        function tt(e, t) {
            for (var n = [], r = arguments.length - 2; r-- > 0; ) n[r] = arguments[r + 2];
            var o = n, s = n.length;
            s > 0 && !f(n[0]) && (t || (t = {}), 1 === s && (o = n[0]), f(o) || (t.children = o));
            var c;
            if (mt(e)) {
                for (var u = [], l = 0, d = e.length; l < d; l++) u.push(et(e[l]));
                c = u;
            } else {
                var p = e.flags, h = e.className, g = e.key, y = e.ref;
                if (t && (t.hasOwnProperty("className") && (h = t.className), t.hasOwnProperty("ref") && (y = t.ref), 
                t.hasOwnProperty("key") && (g = t.key)), 28 & p) {
                    c = Ze(p, e.type, h, null, e.props || t ? v(e.props, t) : Rt, g, y, !0);
                    var m = c.props;
                    if (m) {
                        var b = m.children;
                        if (b) if (mt(b)) {
                            var _ = b.length;
                            if (_ > 0) {
                                for (var O = [], w = 0; w < _; w++) {
                                    var k = b[w];
                                    i(k) ? O.push(k) : !a(k) && it(k) && O.push(et(k));
                                }
                                m.children = O;
                            }
                        } else it(b) && (m.children = et(b));
                    }
                    c.children = null;
                } else 3970 & p ? (o = t && !f(t.children) ? t.children : e.children, c = Ze(p, e.type, h, o, e.props || t ? v(e.props, t) : Rt, g, y, !1)) : 1 & p && (c = rt(e.children, g));
            }
            return c;
        }
        function nt() {
            return Ze(4096, null);
        }
        function rt(e, t) {
            return Ze(1, null, null, e, null, t);
        }
        function it(e) {
            return !!e.flags;
        }
        function ot(e, t) {
            return t.key = e, t;
        }
        function at(e, t) {
            return u(e) && (e = "." + e), l(t.key) || "." === t.key[0] ? ot(e, t) : t;
        }
        function st(e, t) {
            return t.key = e + t.key, t;
        }
        function ct(e, t, n, r) {
            for (var o = e.length; n < o; n++) {
                var s = e[n], c = r + "." + n;
                a(s) || (mt(s) ? ct(s, t, 0, c) : (i(s) ? s = rt(s, null) : (it(s) && s.dom || s.key && "." === s.key[0]) && (s = et(s)), 
                s = l(s.key) || "." === s.key[0] ? ot(c, s) : st(r, s), t.push(s)));
            }
        }
        function ut(e) {
            var t;
            !0 === e.$ ? e = e.slice() : e.$ = !0;
            for (var n = 0, r = e.length; n < r; n++) {
                var o = e[n];
                if (a(o) || mt(o)) {
                    var s = (t || e).slice(0, n);
                    return ct(e, s, n, ""), s;
                }
                i(o) ? (t || (t = e.slice(0, n)), t.push(at(n, rt(o, null)))) : it(o) && null !== o.dom || l(o.key) && 0 == (64 & o.flags) ? (t || (t = e.slice(0, n)), 
                t.push(at(n, et(o)))) : t && t.push(at(n, et(o)));
            }
            return t || e;
        }
        function lt(e) {
            return mt(e) ? ut(e) : it(e) && null !== e.dom ? et(e) : e;
        }
        function dt(e, t, n) {
            3970 & e.flags && (o(n) && t.hasOwnProperty("children") && (e.children = t.children), 
            t.hasOwnProperty("className") && (e.className = t.className || null, delete t.className)), 
            t.hasOwnProperty("ref") && (e.ref = t.ref, delete t.ref), t.hasOwnProperty("key") && (e.key = t.key, 
            delete t.key);
        }
        function ft(e) {
            return "svg" === e ? 128 : "input" === e ? 512 : "select" === e ? 2048 : "textarea" === e ? 1024 : "media" === e ? 256 : 2;
        }
        function pt(e) {
            var t = e.props, n = e.children;
            if (28 & e.flags) {
                var r = e.type, i = r.defaultProps;
                if (!o(i)) if (t) for (var s in i) f(t[s]) && (t[s] = i[s]); else t = e.props = i;
                c(r) && (e.flags = ft(r), t && t.children && (e.children = t.children, n = t.children));
            }
            t && (dt(e, t, n), a(t.children) || (t.children = lt(t.children))), a(n) || (e.children = lt(n));
        }
        function ht(e, t) {
            return s(t) ? {
                data: e,
                event: t
            } : null;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var vt = "$NO_OP", gt = "a runtime error occured! Use Inferno in development environment to find the error.", yt = !("undefined" == typeof window || !window.document), mt = Array.isArray;
        g.prototype.addListener = function(e) {
            this.listeners.push(e);
        }, g.prototype.trigger = function() {
            for (var e, t = this.listeners; e = t.shift(); ) e();
        };
        var bt = {
            afterMount: null,
            afterRender: null,
            afterUpdate: null,
            beforeRender: null,
            beforeUnmount: null,
            createVNode: null,
            findDOMNodeEnabled: !1,
            recyclingEnabled: !1,
            roots: []
        }, _t = "http://www.w3.org/1999/xlink", Ot = "http://www.w3.org/XML/1998/namespace", wt = "http://www.w3.org/2000/svg", kt = new Set();
        kt.add("volume"), kt.add("defaultChecked");
        var St = new Set();
        St.add("muted"), St.add("scoped"), St.add("loop"), St.add("open"), St.add("checked"), 
        St.add("default"), St.add("capture"), St.add("disabled"), St.add("readOnly"), St.add("required"), 
        St.add("autoplay"), St.add("controls"), St.add("seamless"), St.add("reversed"), 
        St.add("allowfullscreen"), St.add("novalidate"), St.add("hidden"), St.add("autoFocus"), 
        St.add("selected"), St.add("indeterminate");
        var Tt = new Map();
        Tt.set("xlink:href", _t), Tt.set("xlink:arcrole", _t), Tt.set("xlink:actuate", _t), 
        Tt.set("xlink:show", _t), Tt.set("xlink:role", _t), Tt.set("xlink:title", _t), Tt.set("xlink:type", _t), 
        Tt.set("xml:base", Ot), Tt.set("xml:lang", Ot), Tt.set("xml:space", Ot);
        var Et = new Set();
        Et.add("animationIterationCount"), Et.add("borderImageOutset"), Et.add("borderImageSlice"), 
        Et.add("borderImageWidth"), Et.add("boxFlex"), Et.add("boxFlexGroup"), Et.add("boxOrdinalGroup"), 
        Et.add("columnCount"), Et.add("flex"), Et.add("flexGrow"), Et.add("flexPositive"), 
        Et.add("flexShrink"), Et.add("flexNegative"), Et.add("flexOrder"), Et.add("gridRow"), 
        Et.add("gridColumn"), Et.add("fontWeight"), Et.add("lineClamp"), Et.add("lineHeight"), 
        Et.add("opacity"), Et.add("order"), Et.add("orphans"), Et.add("tabSize"), Et.add("widows"), 
        Et.add("zIndex"), Et.add("zoom"), Et.add("fillOpacity"), Et.add("floodOpacity"), 
        Et.add("stopOpacity"), Et.add("strokeDasharray"), Et.add("strokeDashoffset"), Et.add("strokeMiterlimit"), 
        Et.add("strokeOpacity"), Et.add("strokeWidth");
        var xt = new Set();
        xt.add("children"), xt.add("childrenType"), xt.add("defaultValue"), xt.add("ref"), 
        xt.add("key"), xt.add("checked"), xt.add("multiple");
        var jt = new Set();
        jt.add("onClick"), jt.add("onMouseDown"), jt.add("onMouseUp"), jt.add("onMouseMove"), 
        jt.add("onSubmit"), jt.add("onDblClick"), jt.add("onKeyDown"), jt.add("onKeyUp"), 
        jt.add("onKeyPress");
        var Ct = yt && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform), It = new Map(), Nt = new Map(), Pt = new Map(), At = new Map(), Mt = bt.roots, Ht = yt ? document.body : null, Rt = {}, Lt = {
            EMPTY_OBJ: Rt,
            NO_OP: vt,
            cloneVNode: tt,
            createRenderer: le,
            createVNode: Ze,
            findDOMNode: oe,
            getFlagsForElementVnode: ft,
            internal_DOMNodeMap: At,
            internal_isUnitlessNumber: Et,
            internal_normalize: pt,
            internal_patch: de,
            linkEvent: ht,
            options: bt,
            render: ue,
            version: "3.8.2"
        };
        t.default = Lt, t.EMPTY_OBJ = Rt, t.NO_OP = vt, t.cloneVNode = tt, t.createRenderer = le, 
        t.createVNode = Ze, t.findDOMNode = oe, t.getFlagsForElementVnode = ft, t.internal_DOMNodeMap = At, 
        t.internal_isUnitlessNumber = Et, t.internal_normalize = pt, t.internal_patch = de, 
        t.linkEvent = ht, t.options = bt, t.render = ue, t.version = "3.8.2";
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return c(e) || a(e);
        }
        function i(e) {
            return a(e) || !1 === e || s(e) || c(e);
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
        function c(e) {
            return void 0 === e;
        }
        function u(e) {
            return "object" == typeof e;
        }
        function l(e, t) {
            for (var n = [], a = arguments.length - 2; a-- > 0; ) n[a] = arguments[a + 2];
            if (i(e) || u(e)) throw new Error("Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.");
            var s, l = n, p = null, h = null, v = null, g = 0;
            if (n && (1 === n.length ? l = n[0] : 0 === n.length && (l = void 0)), o(e)) {
                if (g = d.getFlagsForElementVnode(e), !r(t)) {
                    s = {};
                    for (var y in t) "className" === y || "class" === y ? v = t[y] : "key" === y ? h = t.key : "children" === y && c(l) ? l = t.children : "ref" === y ? p = t.ref : s[y] = t[y];
                }
            } else if (g = 16, c(l) || (t || (t = {}), t.children = l, l = null), !r(t)) {
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
            i = [ e, n(66), n(68), n(69) ], r = s, void 0 !== (o = "function" == typeof r ? r.apply(t, i) : r) && (e.exports = o);
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
            function c(e, t) {
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
                        return c("action", e);
                    }
                }, {
                    key: "defaultTarget",
                    value: function(e) {
                        var t = c("target", e);
                        if (t) return document.querySelector(t);
                    }
                }, {
                    key: "defaultText",
                    value: function(e) {
                        return c("text", e);
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
            i = [ e, n(67) ], r = s, void 0 !== (o = "function" == typeof r ? r.apply(t, i) : r) && (e.exports = o);
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
            return c(document.body, e, t, n);
        }
        var s = n(70), c = n(71);
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
        var o = n(72);
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
        function r(e) {
            return n(i(e));
        }
        function i(e) {
            var t = o[e];
            if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
            return t;
        }
        var o = {
            "./events.ts": 4,
            "./state/entity.ts": 5,
            "./state/flow.ts": 9,
            "./state/graph.ts": 16,
            "./state/gui.ts": 6,
            "./state/tree.ts": 28,
            "./state/views.ts": 27
        };
        r.keys = function() {
            return Object.keys(o);
        }, r.resolve = i, e.exports = r, r.id = 73;
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
                    var s = n(r, t), c = i[r], u = Object.keys(o).map(function(e) {
                        return o[e];
                    }).filter(function(e) {
                        return e.entity === r && !e.port;
                    }).map(function(e) {
                        return e.process;
                    });
                    return s.id = r, Object.defineProperty(s, "val", {
                        get: function() {
                            return e.get(r);
                        },
                        set: function(t) {
                            return e.set(r, t);
                        }
                    }), s.update = function(t) {
                        e.update(r, t);
                    }, s.reset = function() {
                        null != c.value ? e.set(r, c.value) : null != c.json && e.set(r, JSON.parse(c.json));
                    }, s.watch = function() {
                        e.on(r, function(e) {
                            return console.log(r, e);
                        });
                    }, s.unwatch = function() {
                        e.off(r);
                    }, s.streams = {}, u.forEach(function(t) {
                        var n = t.split(".").pop();
                        n && (s.streams[n] = {
                            start: function() {
                                e.start(t);
                            }
                        }, a[t].async && (s.streams[n].stop = function() {
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