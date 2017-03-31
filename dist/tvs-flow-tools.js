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
        return t.m = e, t.c = n, t.i = function(e) {
            return e;
        }, t.d = function(e, n, r) {
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
        }, t.p = "", t(t.s = 65);
    }([ function(e, t, n) {
        "use strict";
        function r(e, t) {
            return t ? t + "." + e : e;
        }
        function i(e) {
            var t, i, o = e.value, s = n.i(g.a)(), u = 0, c = [], l = {};
            return l.HOT = {
                entity: l,
                type: v.PORT_TYPES.HOT
            }, l.COLD = {
                entity: l,
                type: v.PORT_TYPES.COLD
            }, l.id = function(e, n) {
                return s = r(e, n), t = n, l;
            }, l.val = function(e) {
                return o = e, l;
            }, l.accept = function(e) {
                return i = e, l;
            }, l.getId = function() {
                return s;
            }, e.procedure && c.push(e), l.react = function(e, t, n) {
                var r = a(e, t, n);
                r.pidSuffix = b + u++;
                var i = r.dependencies;
                return r.dependencies = [ {
                    entity: l,
                    type: v.PORT_TYPES.ACCUMULATOR
                } ], i && i.length && (r.dependencies = r.dependencies.concat(i)), c.push(r), l;
            }, l.getGraph = function() {
                var e = h.empty();
                return e.entities[s] = n.i(v.createEntity)({
                    id: s,
                    value: o,
                    accept: i
                }), c.forEach(function(i) {
                    var o = i.processId ? r(i.processId, t) : s + i.pidSuffix, a = i.dependencies, u = [];
                    if (a) for (var c in a) {
                        var l = a[c];
                        if (u[c] = l.type, l.type !== v.PORT_TYPES.ACCUMULATOR) {
                            var f = n.i(v.createArc)({
                                process: o,
                                entity: l.entity.getId(),
                                port: c
                            });
                            e.arcs[f.id] = f;
                        }
                    }
                    var d = n.i(v.createArc)({
                        process: o,
                        entity: s
                    });
                    e.arcs[d.id] = d, e.processes[o] = n.i(v.createProcess)({
                        id: o,
                        ports: u,
                        procedure: i.procedure,
                        async: i.async,
                        autostart: i.autostart
                    });
                }), e;
            }, l;
        }
        function o(e) {
            return i({
                value: e
            });
        }
        function a(e, t, n) {
            if ("function" == typeof e) return {
                procedure: e,
                pidSuffix: m
            };
            if (Array.isArray(e) && "function" == typeof t) return {
                dependencies: e,
                procedure: t,
                pidSuffix: m
            };
            if ("string" == typeof e && "function" == typeof t) return {
                processId: e,
                procedure: t
            };
            if ("string" == typeof e && Array.isArray(t) && "function" == typeof n) return {
                processId: e,
                dependencies: t,
                procedure: n
            };
            throw TypeError("Wrong stream arguments");
        }
        function s(e, t, n) {
            return i(a(e, t, n));
        }
        function u(e, t, n) {
            return i(y({}, a(e, t, n), {
                async: !0
            }));
        }
        function c(e, t, n) {
            return i(y({}, a(e, t, n), {
                autostart: !0
            }));
        }
        function l(e, t, n) {
            return i(y({}, a(e, t, n), {
                async: !0,
                autostart: !0
            }));
        }
        function f(e) {
            return e && "function" == typeof e.id && "function" == typeof e.getGraph && e.HOT && e.COLD;
        }
        function d(e, t) {
            for (var n in e) {
                var r = e[n];
                f(r) && r.id(n, t);
            }
            return e;
        }
        function p(e) {
            var t = [];
            for (var n in e) {
                var r = e[n];
                f(r) && t.push(r);
            }
            return t.reduce(function(e, t) {
                return h.merge(e, t.getGraph());
            }, h.empty());
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var h = n(17), v = n(7), g = n(18);
        t.val = o, t.stream = s, t.asyncStream = u, t.streamStart = c, t.asyncStreamStart = l, 
        t.isEntity = f, t.resolveEntityIds = d, t.getGraphFromAll = p;
        var y = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, m = "Stream", b = "Reaction";
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
        var i = n(61), o = n(62);
        t.types = o;
        var a = n(22);
        t.extend = a.extend, t.classes = a.classes, t.media = a.media;
        var s = new i.TypeStyle({
            autoGenerateTag: !0
        });
        t.setStylesTarget = s.setStylesTarget, t.cssRaw = s.cssRaw, t.cssRule = s.cssRule, 
        t.forceRenderStyles = s.forceRenderStyles, t.fontFace = s.fontFace, t.getStyles = s.getStyles, 
        t.keyframes = s.keyframes, t.reinit = s.reinit, t.style = s.style, t.createTypeStyle = r;
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e in l) l[e]();
            l = {}, f = !0;
        }
        function i(e, t) {
            f && (requestAnimationFrame(r), f = !1), l[e] = t;
        }
        function o(e, t, n) {
            function r(n, r) {
                "string" == typeof n ? e.set(t, {
                    type: n,
                    payload: r
                }) : e.set(t, n);
            }
            function o(t, a) {
                var u = a + t.name;
                if (p[u]) return p[u];
                var l = e.get(a), f = t(l, r, o), h = "c" + d++;
                f.dataset.tvsComponent = "component";
                var v = function() {
                    var i = e.get(a), u = t(i, r, o, f);
                    n && console.log("updating", f), s.update(f, u, {
                        getNodeKey: function(e) {
                            return e.id || e.dataset && e.dataset.key;
                        },
                        childrenOnly: !0,
                        onBeforeElUpdated: function(e, t) {
                            return "component" !== e.dataset.tvsComponent && e !== t;
                        }
                    });
                }, g = function() {
                    return i(h, v);
                };
                return c(f, function() {
                    n && console.log("element inserted into dom!", f), e.on(a, g);
                }, function() {
                    n && console.log("element removed from dom!", f), e.off(a, g);
                }, o), p[u] = f, f;
            }
            return void 0 === n && (n = !1), o;
        }
        function a(e) {
            var t = e.shift(e), n = e[0];
            "object" != typeof n || Array.isArray(n) || n instanceof Element ? n = {} : e.shift();
            for (var r in n) "boolean" == typeof n[r] && (n[r] = "" + n[r]);
            return u.createElement(t, n, e.map(function(e) {
                return Array.isArray(e) ? a(e) : e;
            }));
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(24), u = (n.n(s), n(12)), c = (n.n(u), n(14));
        n.n(c);
        t.flowComponentFactory = o, t.h = a;
        var l = {}, f = !0, d = 0, p = {};
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
                    var f = l[c], d = e[f];
                    f === t.IS_UNIQUE ? u = !!d : i(d) ? a.push([ f.trim(), d ]) : o.push([ n(f.trim()), d ]);
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
            function f(e, t, n, i, o) {
                var a = u(n, !!t), s = a.properties, d = a.nestedStyles, p = a.isUnique, h = c(s), v = h;
                if (r(t)) {
                    var y = e.add(new C(t, o ? void 0 : h, e.hash));
                    if (h && o) {
                        var m = y.add(new T(h, y.hash, p ? "u" + (++g).toString(36) : void 0));
                        i.push([ o, m ]);
                    }
                    for (var b = 0, w = d; b < w.length; b++) {
                        var _ = w[b], x = _[0], k = _[1];
                        v += x + f(y, x, k, i, o);
                    }
                } else {
                    var O = o ? l(t, o) : t;
                    if (h) {
                        var m = e.add(new T(h, e.hash, p ? "u" + (++g).toString(36) : void 0));
                        i.push([ O, m ]);
                    }
                    for (var S = 0, A = d; S < A.length; S++) {
                        var E = A[S], x = E[0], k = E[1];
                        v += x + f(e, x, k, i, O);
                    }
                }
                return v;
            }
            function d(e, t, n, r, i) {
                for (var o = new O(e.hash), a = [], s = f(o, t, n, a), u = "f" + o.hash(s), c = i ? i + "_" + u : u, d = 0, p = a; d < p.length; d++) {
                    var h = p[d], v = h[0], g = h[1], y = r ? l(v, "." + c) : v;
                    g.add(new S(y, g.hash, void 0, s));
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
                return void 0 === t && (t = o), void 0 === n && (n = void 0 !== e && "production" !== e.env.NODE_ENV), 
                new A(t, n);
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
            }, m = 0, b = [ "-webkit-", "-ms-", "-moz-", "-o-" ]; m < b.length; m++) for (var w = b[m], _ = 0, x = Object.keys(y); _ < x.length; _++) {
                var k = x[_];
                y[w + k] = !0;
            }
            t.stringHash = o;
            var O = function() {
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
            t.Cache = O;
            var S = function() {
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
            t.Selector = S;
            var T = function(e) {
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
            }(O);
            t.Style = T;
            var C = function(e) {
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
            }(O);
            t.Rule = C;
            var A = function(e) {
                function t(t, n, r) {
                    void 0 === r && (r = "f" + (++g).toString(36));
                    var i = e.call(this, t) || this;
                    return i.hash = t, i.debug = n, i.id = r, i;
                }
                return v(t, e), t.prototype.registerStyle = function(e, t) {
                    var n = d(this, "&", e, !0, this.debug ? t : void 0), r = n.cache, i = n.id;
                    return this.merge(r), i;
                }, t.prototype.registerKeyframes = function(e, t) {
                    return this.registerHashRule("@keyframes", e, t);
                }, t.prototype.registerHashRule = function(e, t, n) {
                    var r = d(this, "", t, !1, this.debug ? n : void 0), i = r.cache, o = r.pid, a = r.id, s = new C(e + " " + a, void 0, this.hash, void 0, o);
                    return this.add(s.merge(i)), a;
                }, t.prototype.registerRule = function(e, t) {
                    this.merge(d(this, e, t, !1).cache);
                }, t.prototype.registerCss = function(e) {
                    this.merge(d(this, "", e, !1).cache);
                }, t.prototype.getStyles = function() {
                    return p(this);
                }, t.prototype.getIdentifier = function() {
                    return this.id;
                }, t.prototype.clone = function() {
                    return new t(this.hash, this.debug, this.id).merge(this);
                }, t;
            }(O);
            t.FreeStyle = A, t.create = h;
        }).call(t, n(41));
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(0), i = n(55), o = n(56);
        n.d(t, "action", function() {
            return a;
        }), n.d(t, "windowSize", function() {
            return s;
        }), n.d(t, "element", function() {
            return u;
        }), n.d(t, "mouse", function() {
            return c;
        });
        var a = n.i(r.val)(), s = n.i(r.asyncStreamStart)(i.a), u = n.i(r.val)(), c = n.i(r.asyncStream)([ u.HOT ], function(e, t) {
            return n.i(o.a)(e, {
                el: t,
                enableRightButton: !0
            });
        });
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(0), i = n(10);
        n.d(t, "runtime", function() {
            return o;
        }), n.d(t, "graph", function() {
            return a;
        }), n.d(t, "state", function() {
            return s;
        }), n.d(t, "entityTree", function() {
            return u;
        });
        var o = n.i(r.val)(), a = n.i(r.stream)([ o.HOT ], function(e) {
            return e.getGraph();
        }), s = n.i(r.stream)([ o.HOT ], function(e) {
            return e.getState();
        }), u = n.i(r.stream)([ a.HOT ], function(e) {
            return n.i(i.createEntityTree)(e.entities);
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(1), i = (n.n(r), n(31));
        n.n(i);
        n.d(t, "c", function() {
            return o;
        }), n.d(t, "f", function() {
            return s;
        }), n.d(t, "a", function() {
            return u;
        }), n.d(t, "d", function() {
            return c;
        }), n.d(t, "e", function() {
            return l;
        }), n.d(t, "g", function() {
            return f;
        }), n.d(t, "b", function() {
            return d;
        });
        var o = "white", a = n.i(i.rgba)(40, 40, 40, .75).toString(), s = 16, u = "cyan", c = {
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
        }, f = {
            padding: 0,
            listStyle: "none"
        }, d = n.i(r.style)({
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
        function r(e) {
            var t = e.id, r = void 0 === t ? n.i(a.a)() : t, i = e.value, o = e.json, s = e.accept, c = e.meta;
            return null == i && o && (i = JSON.parse(o)), {
                id: r,
                value: i,
                accept: s,
                meta: u({}, c)
            };
        }
        function i(e, t) {
            var r = e.id, i = void 0 === r ? n.i(a.a)() : r, o = e.ports, c = void 0 === o ? [] : o, l = e.procedure, f = e.code, d = e.autostart, p = void 0 !== d && d, h = e.async, v = void 0 !== h && h, g = e.meta;
            if (null == l && null != f && (l = n.i(s.a)(f, t)), null == l) throw TypeError("Process must have procedure or code set");
            return {
                id: i,
                ports: c,
                procedure: l,
                autostart: p,
                async: v,
                meta: u({}, g)
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
        });
        var a = n(18), s = n(54);
        t.createEntity = r, t.createProcess = i, t.createArc = o, n.d(t, "PORT_TYPES", function() {
            return c;
        });
        var u = this && this.__assign || Object.assign || function(e) {
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(0), i = n(19), o = n(4), a = n(5);
        n.d(t, "title", function() {
            return u;
        }), n.d(t, "visibility", function() {
            return c;
        }), n.d(t, "activeWindow", function() {
            return l;
        }), n.d(t, "zIndex", function() {
            return f;
        }), n.d(t, "controlsPosition", function() {
            return d;
        }), n.d(t, "treeWindow", function() {
            return p;
        }), n.d(t, "treeViewProps", function() {
            return h;
        }), n.d(t, "treeFold", function() {
            return v;
        }), n.d(t, "treeData", function() {
            return g;
        }), n.d(t, "treeWindowProps", function() {
            return y;
        }), n.d(t, "graphWindow", function() {
            return m;
        }), n.d(t, "entitiesWindow", function() {
            return b;
        }), n.d(t, "activeEntity", function() {
            return w;
        }), n.d(t, "watchingEntity", function() {
            return _;
        }), n.d(t, "activeValue", function() {
            return x;
        }), n.d(t, "editedValue", function() {
            return k;
        }), n.d(t, "entityView", function() {
            return O;
        }), n.d(t, "entitiesWindowProps", function() {
            return S;
        }), n.d(t, "controlProps", function() {
            return T;
        });
        var s = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, u = n.i(r.val)("").accept(i.a), c = n.i(r.val)({
            tree: !1,
            graph: !1,
            entities: !1
        }).react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if ("state.gui.updateVisibility" === n) return s({}, e, (i = {}, i[r] = !e[r], i));
            var i;
        }).accept(i.b), l = n.i(r.stream)([ o.action.HOT ], function(e) {
            var t = e.type, n = e.payload;
            if ("state.gui.setActiveWindow" === t || "state.gui.updateVisibility" === t) return n;
        }).accept(n.i(i.c)(i.b, i.d)), f = n.i(r.val)(0).react([ l.HOT ], function(e) {
            return e + 1;
        }), d = n.i(r.val)({
            left: 0,
            top: 0,
            zIndex: 0
        }).react([ l.COLD, o.mouse.HOT ], function(e, t, n) {
            var r = n.dragDelta;
            if ("controls" === t && (r.x || r.y)) return e.left -= r.x, e.top -= r.y, e;
        }).react([ l.COLD, f.HOT ], function(e, t, n) {
            if ("controls" === t) return e.zIndex = n, e;
        }).accept(i.b), p = n.i(r.val)({
            top: 100,
            left: 0,
            width: 300,
            height: 400,
            zIndex: 0
        }).react([ l.COLD, o.mouse.HOT ], function(e, t, n) {
            var r = n.dragDelta;
            if ("tree" === t && n.pressed[0] && (r.x || r.y)) return "resize" === n.pressed[0].target.className ? (e.width -= r.x, 
            e.height -= r.y) : (e.left -= r.x, e.top -= r.y), e;
        }).react([ l.COLD, f.HOT ], function(e, t, n) {
            if ("tree" === t) return e.zIndex = n, e;
        }).accept(i.b), h = n.i(r.val)({
            treeViewComponent: "tree"
        }).react([ o.action.HOT ], function(e, t) {
            if ("state.gui.setTreeView" === t.type) return s({}, e, {
                treeViewComponent: t.payload
            });
        }).accept(i.b), v = n.i(r.val)({}).react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if ("state.gui.toggleTreeLevel" === n) return s({}, e, (i = {}, i[r] = !e[r], i));
            var i;
        }).accept(i.b), g = n.i(r.stream)([ v.HOT, a.entityTree.HOT ], function(e, t) {
            return {
                fold: e,
                tree: t
            };
        }).val({
            fold: null,
            tree: null
        }), y = n.i(r.stream)([ p.HOT, h.HOT ], function(e, t) {
            return {
                dimensions: e,
                props: t
            };
        }), m = n.i(r.val)({
            top: 200,
            left: 100,
            width: 600,
            height: 600,
            zIndex: 0
        }).react([ l.COLD, o.mouse.HOT ], function(e, t, n) {
            var r = n.dragDelta;
            if ("graph" === t && n.pressed[0] && (r.x || r.y)) {
                if ("resize" === n.pressed[0].target.className) return e.width -= r.x, e.height -= r.y, 
                e;
                if (!n.pressed[0].target.closest("svg")) return e.left -= r.x, e.top -= r.y, e;
            }
        }).react([ l.COLD, f.HOT ], function(e, t, n) {
            if ("graph" === t) return e.zIndex = n, e;
        }).accept(i.b), b = n.i(r.val)({
            top: 50,
            left: 400,
            width: 400,
            height: 500,
            zIndex: 0
        }).react([ l.COLD, o.mouse.HOT ], function(e, t, n) {
            var r = n.dragDelta;
            if ("entities" === t && n.pressed[0] && (r.x || r.y)) return "resize" === n.pressed[0].target.className ? (e.width -= r.x, 
            e.height -= r.y) : (e.left -= r.x, e.top -= r.y), e;
        }).react([ l.COLD, f.HOT ], function(e, t, n) {
            if ("entities" === t) return e.zIndex = n, e;
        }).accept(i.b), w = n.i(r.val)("").react([ o.action.HOT, a.graph.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if ("state.gui.openEntity" === r && null != n.entities[i]) return i;
        }).accept(n.i(i.c)(i.b, i.d)), _ = n.i(r.val)(!0).react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            return "setEntityEditMode" === n ? !r : "saveCurrentEntityValue" === n || void 0;
        }).react([ w.HOT ], function() {
            return !0;
        }).accept(i.b), x = n.i(r.asyncStream)([ a.runtime.COLD, w.HOT, c.HOT, _.HOT ], function(e, t, n, r, i) {
            if (e(t.get(n)), r.entities && i) return t.on(n, e), function() {
                return t.off(n, e);
            };
        }), k = n.i(r.val)("").react([ o.action.HOT, a.runtime.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if ("updateEditedValue" === r) return i;
            e && "saveCurrentEntityValue" === r && requestAnimationFrame(function() {
                n.set(i, JSON.parse(e));
            });
        }).react([ x.HOT ], function() {
            return "";
        }).accept(n.i(i.c)(i.b, i.d)), O = n.i(r.stream)([ x.HOT, _.HOT ], function(e, t) {
            return {
                value: e,
                watching: t
            };
        }).val({
            value: null,
            watching: !0
        }), S = n.i(r.stream)([ b.HOT, w.HOT, _.HOT ], function(e, t, n) {
            return {
                dimensions: e,
                entity: t,
                watching: n
            };
        }), T = n.i(r.stream)([ c.HOT, d.HOT ], function(e, t) {
            return {
                visibility: e,
                position: t
            };
        });
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            void 0 === t && (t = ".");
            var n = {};
            return Object.keys(e).sort().forEach(function(r) {
                for (var i = e[r], o = i.id, a = o.split(t), s = n, u = a.slice(), c = [], l = 0; l < a.length; l++) {
                    var f = u.shift();
                    u.length ? (c.push(f), s = s[f] = s[f] || {
                        __path__: c.join(t)
                    }) : s[f] = {
                        __id__: o
                    };
                }
            }), n;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.createEntityTree = r;
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            return void 0 === t && (t = "."), e.split(".")[1].split("/").filter(function(e) {
                return e;
            }).join(t);
        }
        function i(e, t) {
            var i = e.keys().map(function(i) {
                var a = e(i);
                return Object.values(n.i(o.resolveEntityIds)(a, r(i, t))).filter(o.isEntity);
            }).reduce(function(e, t) {
                return e.concat(t);
            }, []);
            return n.i(o.getGraphFromAll)(i);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(0);
        t.modulePathToNamespace = r, t.getGraphFromModules = i;
    }, function(e, t, n) {
        function r(e, t, n) {
            function o(e) {
                if (Array.isArray(e)) for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    if (Array.isArray(n)) o(n); else {
                        if (("number" == typeof n || "boolean" == typeof n || n instanceof Date || n instanceof RegExp) && (n = n.toString()), 
                        "string" == typeof n) {
                            if (f.lastChild && "#text" === f.lastChild.nodeName) {
                                f.lastChild.nodeValue += n;
                                continue;
                            }
                            n = i.createTextNode(n);
                        }
                        n && n.nodeType && f.appendChild(n);
                    }
                }
            }
            var f;
            l.indexOf(e) !== -1 && (t.namespace = s);
            var d = !1;
            if (t.namespace && (d = t.namespace, delete t.namespace), f = d ? i.createElementNS(d, e) : i.createElement(e), 
            t.onload || t.onunload) {
                var p = t.onload || function() {}, h = t.onunload || function() {};
                a(f, function() {
                    p(f);
                }, function() {
                    h(f);
                }, r.caller.caller.caller), delete t.onload, delete t.onunload;
            }
            for (var v in t) if (t.hasOwnProperty(v)) {
                var g = v.toLowerCase(), y = t[v];
                if ("classname" === g && (g = "class", v = "class"), "htmlFor" === v && (v = "for"), 
                c[g]) if ("true" === y) y = g; else if ("false" === y) continue;
                "on" === g.slice(0, 2) ? f[v] = y : d ? "xlink:href" === v ? f.setAttributeNS(u, v, y) : /^xmlns($|:)/i.test(v) || f.setAttributeNS(null, v, y) : f.setAttribute(v, y);
            }
            return o(n), f;
        }
        var i = n(13), o = n(39), a = n(14), s = "http://www.w3.org/2000/svg", u = "http://www.w3.org/1999/xlink", c = {
            autofocus: 1,
            checked: 1,
            defaultchecked: 1,
            disabled: 1,
            formnovalidate: 1,
            indeterminate: 1,
            readonly: 1,
            required: 1,
            selected: 1,
            willvalidate: 1
        }, l = [ "svg", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern" ];
        e.exports = o(r), e.exports.default = e.exports, e.exports.createElement = r;
    }, function(e, t, n) {
        (function(t) {
            var r = void 0 !== t ? t : "undefined" != typeof window ? window : {}, i = n(64);
            if ("undefined" != typeof document) e.exports = document; else {
                var o = r["__GLOBAL_DOCUMENT_CACHE@4"];
                o || (o = r["__GLOBAL_DOCUMENT_CACHE@4"] = i), e.exports = o;
            }
        }).call(t, n(23));
    }, function(e, t, n) {
        function r(e, t) {
            l[e][0] && 0 === l[e][2] && (l[e][0](t), l[e][2] = 1);
        }
        function i(e, t) {
            l[e][1] && 1 === l[e][2] && (l[e][1](t), l[e][2] = 0);
        }
        function o(e, t, n) {
            var r = e.target.getAttribute(d);
            if (a(e.oldValue, r)) return void (l[r] = l[e.oldValue]);
            l[e.oldValue] && n(e.oldValue, e.target), l[r] && t(r, e.target);
        }
        function a(e, t) {
            return !(!e || !t) && l[e][3] === l[t][3];
        }
        function s(e, t) {
            for (var n = Object.keys(l), r = 0; r < e.length; r++) {
                if (e[r] && e[r].getAttribute && e[r].getAttribute(d)) {
                    var i = e[r].getAttribute(d);
                    n.forEach(function(n) {
                        i === n && t(n, e[r]);
                    });
                }
                e[r].childNodes.length > 0 && s(e[r].childNodes, t);
            }
        }
        var u = n(13), c = n(37), l = Object.create(null), f = "onloadid" + (new Date() % 9e6).toString(36), d = "data-" + f, p = 0;
        if (c && c.MutationObserver) {
            new MutationObserver(function(e) {
                if (!(Object.keys(l).length < 1)) for (var t = 0; t < e.length; t++) e[t].attributeName !== d ? (s(e[t].removedNodes, i), 
                s(e[t].addedNodes, r)) : o(e[t], r, i);
            }).observe(u.body, {
                childList: !0,
                subtree: !0,
                attributes: !0,
                attributeOldValue: !0,
                attributeFilter: [ d ]
            });
        }
        e.exports = function e(t, n, r, i) {
            return n = n || function() {}, r = r || function() {}, t.setAttribute(d, "o" + p), 
            l["o" + p] = [ n, r, 0, i || e.caller ], p += 1, t;
        };
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
        });
        var i = n(0), o = n(4), a = n(19), s = n(5), u = n(7), c = n(9);
        n.d(t, "viewBox", function() {
            return f;
        }), n.d(t, "nodeState", function() {
            return d;
        }), n.d(t, "graphEntities", function() {
            return p;
        }), n.d(t, "graphProcesses", function() {
            return h;
        }), n.d(t, "viewData", function() {
            return v;
        });
        var l = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, f = n.i(i.val)({
            width: 0,
            height: 0,
            offsetX: 0,
            offsetY: 0,
            scale: 1
        }).react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if ("updateGraphScale" === n && r !== e.scale) return e.scale = r, e;
        }).react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if ("updateGraphSize" === n && (r.width !== e.width || r.height !== e.height)) return e.width = r.width, 
            e.height = r.height, e;
        }).react([ o.mouse.HOT ], function(e, t) {
            var n = t.dragDelta;
            if (t.pressed[0] && "svg" === t.pressed[0].target.tagName.toLowerCase() && (n.x || n.y)) return e.offsetX += n.x, 
            e.offsetY += n.y, e;
        }).accept(a.b), d = n.i(i.val)({}).react([ s.graph.HOT, c.graphWindow.COLD ], function(e, t, n) {
            for (var r in t.entities) e[r] || (e[r] = {
                x: Math.random() * n.width,
                y: Math.random() * n.height
            });
        }).react([ c.activeEntity.COLD, o.mouse.HOT, f.COLD ], function(e, t, n, r) {
            var i = n.dragDelta, o = n.pressed[0] && n.pressed[0].target, a = o && (o.dataset.key || o.parentElement && o.parentElement.dataset.key);
            if (a && t === a && e[t] && (i.x || i.y)) return e[t].x -= i.x * r.scale, e[t].y -= i.y * r.scale, 
            e;
        }).accept(a.b), p = n.i(i.stream)([ s.graph.HOT ], function(e) {
            var t = {};
            for (var n in e.entities) {
                var i = e.entities[n], o = l({
                    id: i.id,
                    class: "entity"
                }, r(n), d[n]);
                null != i.accept && (o.accept = !0), null != i.value && (o.initial = !0), t[n] = o;
            }
            return t;
        }).react([ d.HOT ], function(e, t) {
            for (var n in e) e[n].x = t[n].x, e[n].y = t[n].y;
            return e;
        }), h = n.i(i.stream)([ s.graph.HOT ], function(e) {
            var t = {};
            for (var n in e.processes) {
                var i = e.processes[n], o = l({
                    id: n
                }, r(n), {
                    from: [],
                    async: i.async,
                    autostart: i.autostart,
                    acc: i.ports && i.ports.includes(u.PORT_TYPES.ACCUMULATOR)
                });
                for (var a in e.arcs) {
                    var s = e.arcs[a];
                    s.process === n && (null != s.port ? o.from.push([ s.entity, i.ports && i.ports[s.port] ]) : o.to = s.entity);
                }
                t[n] = o;
            }
            return t;
        }), v = n.i(i.stream)([ p.HOT, h.HOT ], function(e, t) {
            var n = [], r = [];
            for (var i in t) {
                var o = t[i], a = e[o.to];
                if (o.from.length) {
                    o.x = 0, o.y = 0;
                    for (var s = 0; s < o.from.length; s++) {
                        var c = e[o.from[s][0]], l = o.from[s][1], f = c.x - a.x, d = c.y - a.y;
                        l === u.PORT_TYPES.COLD && (f /= 2, d /= 2), o.x += f, o.y += d;
                    }
                    var p = Math.sqrt(o.x * o.x + o.y * o.y);
                    o.x = 50 * o.x / p + a.x, o.y = 50 * o.y / p + a.y;
                    for (var s = 0; s < o.from.length; s++) {
                        var h = o.from[s], v = h[0], l = h[1];
                        r.push({
                            from: e[v],
                            to: o,
                            class: "from" + (l === u.PORT_TYPES.COLD ? " cold" : ""),
                            title: l
                        });
                    }
                } else o.x = a.x, o.y = a.y - 50;
                n.push(o), r.push({
                    from: o,
                    to: a,
                    class: "to" + (o.async ? " async" : "")
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
        }).react([ f.HOT ], function(e, t) {
            return e.viewBox = {
                x: t.offsetX * t.scale,
                y: t.offsetY * t.scale,
                width: t.width * t.scale,
                height: t.height * t.scale
            }, e;
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(1), i = (n.n(r), n(6));
        n.d(t, "a", function() {
            return o;
        }), n.d(t, "b", function() {
            return u;
        }), n.d(t, "c", function() {
            return c;
        });
        var o = n.i(r.style)({
            margin: "0 4px",
            verticalAlign: "top",
            display: "inline-block",
            $nest: {
                "& input": {
                    margin: 5,
                    verticalAlign: "middle"
                }
            }
        }), a = {
            margin: "0 4px",
            padding: "4px 10px 3px",
            border: 0,
            color: i.c,
            fontSize: "1.0em",
            $nest: {
                "& > svg": {
                    verticalAlign: "middle"
                }
            }
        }, s = {
            padding: "0 4px"
        }, u = n.i(r.style)(i.d, a), c = n.i(r.style)(i.d, a, s);
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
        function r(e) {
            var t = 0, n = s;
            return n[e[t++]] + n[e[t++]] + n[e[t++]] + n[e[t++]] + "-" + n[e[t++]] + n[e[t++]] + "-" + n[e[t++]] + n[e[t++]] + "-" + n[e[t++]] + n[e[t++]] + "-" + n[e[t++]] + n[e[t++]] + n[e[t++]] + n[e[t++]] + n[e[t++]] + n[e[t++]];
        }
        function i() {
            var e = a();
            return e[6] = 15 & e[6] | 64, e[8] = 63 & e[8] | 128, r(e);
        }
        t.a = i;
        for (var o = new Array(16), a = function() {
            for (var e, t = 0; t < 16; t++) 0 == (3 & t) && (e = 4294967296 * Math.random()), 
            o[t] = e >>> ((3 & t) << 3) & 255;
            return o;
        }, s = [], u = {}, c = 0; c < 256; c++) s[c] = (c + 256).toString(16).substr(1), 
        u[s[c]] = c;
    }, function(e, t, n) {
        "use strict";
        n.d(t, "d", function() {
            return r;
        }), n.d(t, "b", function() {
            return i;
        }), n.d(t, "a", function() {
            return o;
        }), n.d(t, "c", function() {
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
        var r = n(58), i = n(59), o = (n.n(i), n(21));
        n.d(t, "b", function() {
            return o.a;
        }), n.d(t, "a", function() {
            return s;
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
                if (null != a && a !== !1) for (var s in a) {
                    var u = a[s];
                    (u || 0 === u) && ("$nest" === s && u ? n[s] = n.$nest ? i(n.$nest, u) : u : s.indexOf("&") !== -1 || 0 === s.indexOf("@media") ? n[s] = n[s] ? i(n[s], u) : u : n[s] = u);
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
                if (null != a && a !== !1) for (var s in a) {
                    var u = a[s];
                    (u || 0 === u) && ("$nest" === s && u ? n[s] = n.$nest ? i(n.$nest, u) : u : s.indexOf("&") !== -1 || 0 === s.indexOf("@media") ? n[s] = n[s] ? i(n[s], u) : u : n[s] = u);
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
            e.type && r.push(e.type), e.orientation && r.push(e.orientation), e.minWidth && r.push("(min-width: " + e.minWidth + "px)"), 
            e.maxWidth && r.push("(max-width: " + e.maxWidth + "px)"), e.minHeight && r.push("(min-height: " + e.minHeight + "px)"), 
            e.maxHeight && r.push("(max-height: " + e.maxHeight + "px)");
            var o = "@media " + r.join(" and ");
            return {
                $nest: (a = {}, a[o] = i.apply(void 0, t), a)
            };
            var a;
        };
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
        var r = n(12), i = n(40), o = n(63);
        e.exports = r, e.exports.update = function(e, t, n) {
            function r(e, t) {
                for (var r = n.events || o, i = 0; i < r.length; i++) {
                    var a = r[i];
                    t[a] ? e[a] = t[a] : e[a] && (e[a] = void 0);
                }
                var s = e.value, u = t.value;
                "INPUT" === e.nodeName && "file" !== e.type || "SELECT" === e.nodeName ? u ? u !== s && (e.value = u) : t.value = e.value : "TEXTAREA" === e.nodeName && null === t.getAttribute("value") && (e.value = t.value);
            }
            return n || (n = {}), n.events !== !1 && (n.onBeforeElUpdated || (n.onBeforeElUpdated = r)), 
            i(e, t, n);
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            var r = e + "::" + t.getId(), i = localStorage.getItem(r);
            if (i) {
                var o = JSON.parse(i);
                o.zIndex && (o.zIndex = 0), n.set(t.getId(), o);
            }
            n.on(t.getId(), function(e) {
                return localStorage.setItem(r, JSON.stringify(e));
            });
        }
        function i(e, t) {
            function i(e) {
                requestAnimationFrame(function() {
                    v.set(f.runtime.getId(), e);
                });
            }
            function h() {
                document.body.removeChild(y);
            }
            void 0 === e && (e = "tvs-flow tools"), void 0 === t && (t = !1);
            var v = o.a.create();
            v.addGraph(n.i(a.getGraphFromModules)(p)), v.set(c.title.getId(), e), r(e, d.viewBox, v), 
            r(e, d.nodeState, v), r(e, c.visibility, v), r(e, c.entitiesWindow, v), r(e, c.graphWindow, v), 
            r(e, c.treeWindow, v), r(e, c.controlsPosition, v);
            var g = n.i(u.flowComponentFactory)(v, l.action.getId(), t), y = n.i(s.a)(g);
            return document.body.appendChild(y), v.set(l.element.getId(), y), {
                updateFlow: i,
                dispose: h,
                getState: function() {
                    return v;
                },
                getElement: function() {
                    return y;
                }
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(52), a = n(11), s = n(48), u = n(2), c = n(9), l = n(4), f = n(5), d = n(15);
        t.start = i;
        var p = n(26);
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
            "./state/flow.ts": 5,
            "./state/graph.ts": 15,
            "./state/gui.ts": 9
        };
        r.keys = function() {
            return Object.keys(o);
        }, r.resolve = i, e.exports = r, r.id = 26;
    }, function(e, t) {
        var n = {
            animationIterationCount: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridRow: !0,
            gridColumn: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            stopOpacity: !0,
            strokeDashoffset: !0,
            strokeOpacity: !0,
            strokeWidth: !0
        };
        e.exports = function(e, t) {
            return "number" != typeof t || n[e] ? t : t + "px";
        };
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
        function r(e) {
            return y(e) || m(e) || b(e) || y("red");
        }
        function i(e, t, n) {
            return new T(k, c(e), w.ensurePercent(t), w.ensurePercent(n), 1, !1);
        }
        function o(e, t, n, r) {
            return new T(k, c(e), w.ensurePercent(t), w.ensurePercent(n), w.ensurePercent(r), !0);
        }
        function a(e, t, n) {
            return new T(x, e, t, n, 1, !1);
        }
        function s(e, t, n, r) {
            return new T(x, e, t, n, w.ensurePercent(r), !0);
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
        function f(e, t, n, r, i) {
            var o, a = e / 255, s = t / 255, u = n / 255, c = Math.min(a, s, u), l = Math.max(a, s, u), f = (c + l) / 2, d = l - c;
            o = l === c ? 0 : a === l ? (s - u) / d : s === l ? 2 + (u - a) / d : u === l ? 4 + (a - s) / d : 0, 
            (o = Math.min(60 * o, 360)) < 0 && (o += 360);
            var p;
            return p = l === c ? 0 : f <= .5 ? d / (l + c) : d / (2 - l - c), new T(k, o, p, f, r, i);
        }
        function d(e, t, n, r, i) {
            var o = e / 360, a = t, s = n;
            if (0 === a) {
                var u = 255 * s;
                return new T(x, u, u, u, r, i);
            }
            for (var c = s < .5 ? s * (1 + a) : s + a - s * a, l = 2 * s - c, f = 0, d = 0, p = 0, h = 0; h < 3; h++) {
                var v = o + 1 / 3 * -(h - 1);
                v < 0 && v++, v > 1 && v--;
                var u = void 0;
                u = 6 * v < 1 ? l + 6 * (c - l) * v : 2 * v < 1 ? c : 3 * v < 2 ? l + (c - l) * (2 / 3 - v) * 6 : l, 
                u *= 255, 0 === h ? f = u : 1 === h ? d = u : p = u;
            }
            return new T(x, f, d, p, r, i);
        }
        function p(e, t, n, r, i, o, a) {
            return e === t ? new T(e, n, r, i, o, a) : O[e - t](n, r, i, o, a);
        }
        function h(e, t, n, r) {
            if (!_) return [ e || 0, t || 0, n || 0, r || 0 ];
            var i = new Float32Array(4);
            return i[0] = e || 0, i[1] = t || 0, i[2] = n || 0, i[3] = r || 0, i;
        }
        function v(e, t, n) {
            var r = S[e][t];
            return n < 0 ? 0 : n > r ? r : n;
        }
        function g(e) {
            return e instanceof T ? e : r(e);
        }
        function y(e) {
            return C[e] || void 0;
        }
        function m(e) {
            var t = e.match(/#(([a-f0-9]{6})|([a-f0-9]{3}))$/i);
            if (t) {
                var n = t[1], r = parseInt(3 === n.length ? n[0] + n[0] + n[1] + n[1] + n[2] + n[2] : n, 16);
                return new T(x, r >> 16 & 255, r >> 8 & 255, 255 & r, 1, !1);
            }
        }
        function b(e) {
            var t = w.parseCSSFunction(e);
            if (t && (4 === t.length || 5 === t.length)) {
                var n, r = t[0], i = "rgba" === r, o = "hsla" === r, a = "rgb" === r, s = "hsl" === r, u = o || i;
                if (a || i) n = x; else {
                    if (!s && !o) throw new Error("unsupported color string");
                    n = k;
                }
                return new T(n, parseFloat(t[1]), a || i ? parseFloat(t[2]) : w.ensurePercent(t[2]), a || i ? parseFloat(t[3]) : w.ensurePercent(t[3]), u ? parseFloat(t[4]) : 1, u);
            }
        }
        var w = n(8), _ = "undefined" != typeof Float32Array, x = 0, k = 1, O = (A = {}, 
        A[x - k] = f, A[k - x] = d, A), S = (E = {}, E[x] = h(255, 255, 255, 1), E[k] = h(360, 1, 1, 1), 
        E);
        t.color = r, t.hsl = i, t.hsla = o, t.rgb = a, t.rgba = s;
        var T = function() {
            function e(e, t, n, r, i, o) {
                this._format = e, this._hasAlpha = o, this._values = h(v(e, 0, t), v(e, 1, n), v(e, 2, r), v(e, 3, i));
            }
            return e.convertHelper = function(e, t) {
                var n = t._format, r = t._values, i = t._hasAlpha;
                return n === e ? t : O[n - e](r[0], r[1], r[2], r[3], i);
            }, e.prototype.toString = function() {
                var e, t, n = this._format, r = this._values, i = this._hasAlpha;
                if (n === x) e = i ? "rgba" : "rgb", t = [ Math.round(r[0]), Math.round(r[1]), Math.round(r[2]) ]; else {
                    if (n !== k) throw new Error("Invalid color format");
                    e = i ? "hsla" : "hsl", t = [ Math.round(r[0]), w.formatPercent(l(r[1], 2)), w.formatPercent(l(r[2], 2)) ];
                }
                return i && t.push(l(r[3], 5)), w.cssFunction(e, t);
            }, e.prototype.toHexString = function() {
                var t = e.convertHelper(x, this)._values;
                return "#" + (u(t[0]) + u(t[1]) + u(t[2])).toUpperCase();
            }, e.prototype.toHSL = function() {
                var e = this._values;
                return p(this._format, k, e[0], e[1], e[2], 1, !1);
            }, e.prototype.toHSLA = function() {
                var e = this._values;
                return p(this._format, k, e[0], e[1], e[2], e[3], !0);
            }, e.prototype.toRGB = function() {
                var e = this._values;
                return p(this._format, x, e[0], e[1], e[2], 1, !1);
            }, e.prototype.toRGBA = function() {
                var e = this._values;
                return p(this._format, x, e[0], e[1], e[2], e[3], !0);
            }, e.prototype.red = function() {
                return (this._format === x ? this : this.toRGB())._values[0];
            }, e.prototype.green = function() {
                return (this._format === x ? this : this.toRGB())._values[1];
            }, e.prototype.blue = function() {
                return (this._format === x ? this : this.toRGB())._values[2];
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
                var t = e.convertHelper(x, this)._values;
                return e.convertHelper(this._format, new e(x, 255 - t[0], 255 - t[1], 255 - t[2], this._values[3], this._hasAlpha));
            }, e.prototype.lighten = function(t, n) {
                var r = e.convertHelper(k, this)._values, i = S[k][2], o = r[2] + (n ? i - r[2] : i) * w.ensurePercent(t);
                return e.convertHelper(this._format, new e(k, r[0], r[1], o, this._values[3], this._hasAlpha));
            }, e.prototype.darken = function(t, n) {
                var r = e.convertHelper(k, this)._values, i = r[2] - (n ? r[2] : S[k][2]) * w.ensurePercent(t);
                return e.convertHelper(this._format, new e(k, r[0], r[1], i, this._values[3], this._hasAlpha));
            }, e.prototype.saturate = function(t, n) {
                var r = e.convertHelper(k, this)._values, i = S[k][1], o = r[1] + (n ? i - r[1] : i) * w.ensurePercent(t);
                return e.convertHelper(this._format, new e(k, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.desaturate = function(t, n) {
                var r = e.convertHelper(k, this)._values, i = S[k][1], o = r[1] - (n ? r[1] : i) * w.ensurePercent(t);
                return e.convertHelper(this._format, new e(k, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.grayscale = function() {
                return this.desaturate(1);
            }, e.prototype.fade = function(t) {
                var n = this._values, r = v(x, 3, w.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, n[0], n[1], n[2], r, !0));
            }, e.prototype.fadeOut = function(t, n) {
                var r = this._values, i = v(x, 3, r[3] - (n ? r[3] : 1) * w.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, r[0], r[1], r[2], i, !0));
            }, e.prototype.fadeIn = function(t, n) {
                var r = this._values, i = v(x, 3, r[3] + (n ? r[3] : 1) * w.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, r[0], r[1], r[2], i, !0));
            }, e.prototype.mix = function(t, n) {
                var r = this, i = g(t), o = e.convertHelper(x, r)._values, a = e.convertHelper(x, i)._values, s = void 0 === n ? .5 : n, u = 2 * s - 1, c = Math.abs(o[3] - a[3]), l = ((u * c == -1 ? u : (u + c) / (1 + u * c)) + 1) / 2, f = 1 - l, d = new e(x, Math.round(o[0] * l + a[0] * f), Math.round(o[1] * l + a[1] * f), Math.round(o[2] * l + a[2] * f), o[3] * s + a[3] * (1 - s), r._hasAlpha || i._hasAlpha);
                return e.convertHelper(this._format, d);
            }, e.prototype.tint = function(e) {
                return t.white.mix(this, e);
            }, e.prototype.shade = function(e) {
                return t.black.mix(this, e);
            }, e.prototype.spin = function(t) {
                var n = e.convertHelper(k, this)._values;
                return e.convertHelper(this._format, new e(k, c(n[0] + t), n[1], n[2], this._values[3], this._hasAlpha));
            }, e;
        }();
        t.ColorHelper = T;
        var C = {
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
        t.aliceblue = C.aliceblue, t.antiquewhite = C.antiquewhite, t.aqua = C.aqua, t.aquamarine = C.aquamarine, 
        t.azure = C.azure, t.beige = C.beige, t.bisque = C.bisque, t.black = C.black, t.blanchedalmond = C.blanchedalmond, 
        t.blue = C.blue, t.blueviolet = C.blueviolet, t.brown = C.brown, t.burlywood = C.burlywood, 
        t.cadetblue = C.cadetblue, t.chartreuse = C.chartreuse, t.chocolate = C.chocolate, 
        t.coral = C.coral, t.cornflowerblue = C.cornflowerblue, t.cornsilk = C.cornsilk, 
        t.crimson = C.crimson, t.cyan = C.cyan, t.darkblue = C.darkblue, t.darkcyan = C.darkcyan, 
        t.darkgoldenrod = C.darkgoldenrod, t.darkgray = C.darkgray, t.darkgreen = C.darkgreen, 
        t.darkgrey = C.darkgrey, t.darkkhaki = C.darkkhaki, t.darkmagenta = C.darkmagenta, 
        t.darkolivegreen = C.darkolivegreen, t.darkorange = C.darkorange, t.darkorchid = C.darkorchid, 
        t.darkred = C.darkred, t.darksalmon = C.darksalmon, t.darkseagreen = C.darkseagreen, 
        t.darkslateblue = C.darkslateblue, t.darkslategray = C.darkslategray, t.darkslategrey = C.darkslategrey, 
        t.darkturquoise = C.darkturquoise, t.darkviolet = C.darkviolet, t.deeppink = C.deeppink, 
        t.deepskyblue = C.deepskyblue, t.dimgray = C.dimgray, t.dimgrey = C.dimgrey, t.dodgerblue = C.dodgerblue, 
        t.firebrick = C.firebrick, t.floralwhite = C.floralwhite, t.forestgreen = C.forestgreen, 
        t.fuchsia = C.fuchsia, t.gainsboro = C.gainsboro, t.ghostwhite = C.ghostwhite, t.gold = C.gold, 
        t.goldenrod = C.goldenrod, t.gray = C.gray, t.green = C.green, t.greenyellow = C.greenyellow, 
        t.grey = C.grey, t.honeydew = C.honeydew, t.hotpink = C.hotpink, t.indianred = C.indianred, 
        t.indigo = C.indigo, t.ivory = C.ivory, t.khaki = C.khaki, t.lavender = C.lavender, 
        t.lavenderblush = C.lavenderblush, t.lawngreen = C.lawngreen, t.lemonchiffon = C.lemonchiffon, 
        t.lightblue = C.lightblue, t.lightcoral = C.lightcoral, t.lightcyan = C.lightcyan, 
        t.lightgoldenrodyellow = C.lightgoldenrodyellow, t.lightgray = C.lightgray, t.lightgreen = C.lightgreen, 
        t.lightgrey = C.lightgrey, t.lightpink = C.lightpink, t.lightsalmon = C.lightsalmon, 
        t.lightseagreen = C.lightseagreen, t.lightskyblue = C.lightskyblue, t.lightslategray = C.lightslategray, 
        t.lightslategrey = C.lightslategrey, t.lightsteelblue = C.lightsteelblue, t.lightyellow = C.lightyellow, 
        t.lime = C.lime, t.limegreen = C.limegreen, t.linen = C.linen, t.maroon = C.maroon, 
        t.mediumaquamarine = C.mediumaquamarine, t.mediumblue = C.mediumblue, t.mediumorchid = C.mediumorchid, 
        t.mediumpurple = C.mediumpurple, t.mediumseagreen = C.mediumseagreen, t.mediumslateblue = C.mediumslateblue, 
        t.mediumspringgreen = C.mediumspringgreen, t.mediumturquoise = C.mediumturquoise, 
        t.mediumvioletred = C.mediumvioletred, t.midnightblue = C.midnightblue, t.mintcream = C.mintcream, 
        t.mistyrose = C.mistyrose, t.moccasin = C.moccasin, t.navajowhite = C.navajowhite, 
        t.navy = C.navy, t.oldlace = C.oldlace, t.olive = C.olive, t.olivedrab = C.olivedrab, 
        t.orange = C.orange, t.purple = C.purple, t.rebeccapurple = C.rebeccapurple, t.red = C.red, 
        t.silver = C.silver, t.teal = C.teal, t.transparent = C.transparent, t.white = C.white, 
        t.yellow = C.yellow;
        var A, E;
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
        var a = n(8);
        t.linearGradient = r, t.repeatingLinearGradient = i;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
        }
        r(n(29)), r(n(30)), r(n(32)), r(n(33)), r(n(34)), r(n(35)), r(n(28));
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
            return S.cssFunction("matrix", [ e, t, n, r, i, o ]);
        }
        function o(e, t, n, r, i, o, a, s, u, c, l, f, d, p, h, v) {
            return S.cssFunction("matrix3d", [ e, t, n, r, i, o, a, s, u, c, l, f, d, p, h, v ]);
        }
        function a(e) {
            return S.cssFunction("perspective", [ e ]);
        }
        function s(e) {
            return S.cssFunction("rotate", [ e ]);
        }
        function u(e, t, n) {
            return S.cssFunction("rotate3d", [ e, t, n ]);
        }
        function c(e) {
            return S.cssFunction("rotateX", [ e ]);
        }
        function l(e) {
            return S.cssFunction("rotateY", [ e ]);
        }
        function f(e) {
            return S.cssFunction("rotateZ", [ e ]);
        }
        function d(e, t) {
            return S.cssFunction("scale", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function p(e, t, n) {
            return S.cssFunction("scale3d", [ e, t, n ]);
        }
        function h(e) {
            return S.cssFunction("scaleX", [ e ]);
        }
        function v(e) {
            return S.cssFunction("scaleY", [ e ]);
        }
        function g(e) {
            return S.cssFunction("scaleZ", [ e ]);
        }
        function y(e, t) {
            return S.cssFunction("skew", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function m(e) {
            return S.cssFunction("skewX", [ e ]);
        }
        function b(e) {
            return S.cssFunction("skewY", [ e ]);
        }
        function w(e, t) {
            return S.cssFunction("translate", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function _(e, t, n) {
            return S.cssFunction("translate3d", [ e, t, n ]);
        }
        function x(e) {
            return S.cssFunction("translateX", [ e ]);
        }
        function k(e) {
            return S.cssFunction("translateY", [ e ]);
        }
        function O(e) {
            return S.cssFunction("translateZ", [ e ]);
        }
        var S = n(8);
        t.transform = r, t.matrix = i, t.matrix3d = o, t.perspective = a, t.rotate = s, 
        t.rotate3d = u, t.rotateX = c, t.rotateY = l, t.rotateZ = f, t.scale = d, t.scale3d = p, 
        t.scaleX = h, t.scaleY = v, t.scaleZ = g, t.skew = y, t.skewX = m, t.skewY = b, 
        t.translate = w, t.translate3d = _, t.translateX = x, t.translateY = k, t.translateZ = O;
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
        function r(e, t, n) {
            var r = c[t];
            if (void 0 === r && (r = o(t)), r) {
                if (void 0 === n) return e.style[r];
                e.style[r] = l(r, n);
            }
        }
        function i(e, t) {
            for (var n in t) t.hasOwnProperty(n) && r(e, n, t[n]);
        }
        function o(e) {
            var t = u(e), n = s(t);
            return c[t] = c[e] = c[n] = n, n;
        }
        function a() {
            2 === arguments.length ? "string" == typeof arguments[1] ? arguments[0].style.cssText = arguments[1] : i(arguments[0], arguments[1]) : r(arguments[0], arguments[1], arguments[2]);
        }
        var s = n(42), u = n(43), c = {
            float: "cssFloat"
        }, l = n(27);
        e.exports = a, e.exports.set = a, e.exports.get = function(e, t) {
            return Array.isArray(t) ? t.reduce(function(t, n) {
                return t[n] = r(e, n || ""), t;
            }, {}) : r(e, t || "");
        };
    }, function(e, t, n) {
        (function(t) {
            "undefined" != typeof window ? e.exports = window : void 0 !== t ? e.exports = t : "undefined" != typeof self ? e.exports = self : e.exports = {};
        }).call(t, n(23));
    }, function(e, t) {
        function n(e) {
            return function(t, n, i) {
                for (var o in n) o in r && (n[r[o]] = n[o], delete n[o]);
                return e(t, n, i);
            };
        }
        e.exports = n;
        var r = {
            class: "className",
            for: "htmlFor",
            "http-equiv": "httpEquiv"
        };
    }, function(e, t, n) {
        function r(e) {
            return e === h || e === v;
        }
        function i(e) {
            return b.test(e);
        }
        var o = n(38), a = 1, s = 2, u = 3, c = 4, l = 5, f = 6, d = 7, p = 8, h = 9, v = 10, g = 11, y = 12, m = 13;
        e.exports = function(e, t) {
            function n(e) {
                return "function" == typeof e ? e : "string" == typeof e ? e : e && "object" == typeof e ? e : b("", e);
            }
            t || (t = {});
            var b = t.concat || function(e, t) {
                return String(e) + String(t);
            };
            return t.attrToProp !== !1 && (e = o(e)), function(o) {
                function w(e) {
                    var n = [];
                    _ === d && (_ = c);
                    for (var i = 0; i < e.length; i++) {
                        var o = e.charAt(i);
                        _ === a && "<" === o ? (x.length && n.push([ a, x ]), x = "", _ = s) : ">" !== o || r(_) || _ === m ? _ === m && /-$/.test(x) && "-" === o ? (t.comments && n.push([ p, x.substr(0, x.length - 1) ], [ u ]), 
                        x = "", _ = a) : _ === s && /^!--$/.test(x) ? (t.comments && n.push([ s, x ], [ l, "comment" ], [ g ]), 
                        x = o, _ = m) : _ === a || _ === m ? x += o : _ === s && /\s/.test(o) ? (n.push([ s, x ]), 
                        x = "", _ = c) : _ === s ? x += o : _ === c && /[^\s"'=\/]/.test(o) ? (_ = l, x = o) : _ === c && /\s/.test(o) ? (x.length && n.push([ l, x ]), 
                        n.push([ y ])) : _ === l && /\s/.test(o) ? (n.push([ l, x ]), x = "", _ = f) : _ === l && "=" === o ? (n.push([ l, x ], [ g ]), 
                        x = "", _ = d) : _ === l ? x += o : _ !== f && _ !== c || "=" !== o ? _ !== f && _ !== c || /\s/.test(o) ? _ === d && '"' === o ? _ = v : _ === d && "'" === o ? _ = h : _ === v && '"' === o ? (n.push([ p, x ], [ y ]), 
                        x = "", _ = c) : _ === h && "'" === o ? (n.push([ p, x ], [ y ]), x = "", _ = c) : _ !== d || /\s/.test(o) ? _ === p && /\s/.test(o) ? (n.push([ p, x ], [ y ]), 
                        x = "", _ = c) : _ !== p && _ !== h && _ !== v || (x += o) : (_ = p, i--) : (n.push([ y ]), 
                        /[\w-]/.test(o) ? (x += o, _ = l) : _ = c) : (n.push([ g ]), _ = d) : (_ === s ? n.push([ s, x ]) : _ === l ? n.push([ l, x ]) : _ === p && x.length && n.push([ p, x ]), 
                        n.push([ u ]), x = "", _ = a);
                    }
                    return _ === a && x.length ? (n.push([ a, x ]), x = "") : _ === p && x.length ? (n.push([ p, x ]), 
                    x = "") : _ === v && x.length ? (n.push([ p, x ]), x = "") : _ === h && x.length ? (n.push([ p, x ]), 
                    x = "") : _ === l && (n.push([ l, x ]), x = ""), n;
                }
                for (var _ = a, x = "", k = arguments.length, O = [], S = 0; S < o.length; S++) if (S < k - 1) {
                    var T = arguments[S + 1], C = w(o[S]), A = _;
                    A === v && (A = p), A === h && (A = p), A === d && (A = p), A === c && (A = l), 
                    C.push([ 0, A, T ]), O.push.apply(O, C);
                } else O.push.apply(O, w(o[S]));
                for (var E = [ null, {}, [] ], P = [ [ E, -1 ] ], S = 0; S < O.length; S++) {
                    var H = P[P.length - 1][0], C = O[S], M = C[0];
                    if (M === s && /^\//.test(C[1])) {
                        var j = P[P.length - 1][1];
                        P.length > 1 && (P.pop(), P[P.length - 1][0][2][j] = e(H[0], H[1], H[2].length ? H[2] : void 0));
                    } else if (M === s) {
                        var F = [ C[1], {}, [] ];
                        H[2].push(F), P.push([ F, H[2].length - 1 ]);
                    } else if (M === l || 0 === M && C[1] === l) {
                        for (var N, I = ""; S < O.length; S++) if (O[S][0] === l) I = b(I, O[S][1]); else {
                            if (0 !== O[S][0] || O[S][1] !== l) break;
                            if ("object" != typeof O[S][2] || I) I = b(I, O[S][2]); else for (N in O[S][2]) O[S][2].hasOwnProperty(N) && !H[1][N] && (H[1][N] = O[S][2][N]);
                        }
                        O[S][0] === g && S++;
                        for (var L = S; S < O.length; S++) if (O[S][0] === p || O[S][0] === l) H[1][I] ? H[1][I] = b(H[1][I], O[S][1]) : H[1][I] = n(O[S][1]); else {
                            if (0 !== O[S][0] || O[S][1] !== p && O[S][1] !== l) {
                                !I.length || H[1][I] || S !== L || O[S][0] !== u && O[S][0] !== y || (H[1][I] = I.toLowerCase());
                                break;
                            }
                            H[1][I] ? H[1][I] = b(H[1][I], O[S][2]) : H[1][I] = n(O[S][2]);
                        }
                    } else if (M === l) H[1][C[1]] = !0; else if (0 === M && C[1] === l) H[1][C[2]] = !0; else if (M === u) {
                        if (i(H[0]) && P.length) {
                            var j = P[P.length - 1][1];
                            P.pop(), P[P.length - 1][0][2][j] = e(H[0], H[1], H[2].length ? H[2] : void 0);
                        }
                    } else if (0 === M && C[1] === a) void 0 === C[2] || null === C[2] ? C[2] = "" : C[2] || (C[2] = b("", C[2])), 
                    Array.isArray(C[2][0]) ? H[2].push.apply(H[2], C[2]) : H[2].push(C[2]); else if (M === a) H[2].push(C[1]); else if (M !== g && M !== y) throw new Error("unhandled: " + M);
                }
                if (E[2].length > 1 && /^\s*$/.test(E[2][0]) && E[2].shift(), E[2].length > 2 || 2 === E[2].length && /\S/.test(E[2][1])) throw new Error("multiple root elements must be wrapped in an enclosing tag");
                return Array.isArray(E[2][0]) && "string" == typeof E[2][0][0] && Array.isArray(E[2][0][2]) && (E[2][0] = e(E[2][0][0], E[2][0][1], E[2][0][2])), 
                E[2][0];
            };
        };
        var b = (Object.prototype.hasOwnProperty, RegExp("^(" + [ "area", "base", "basefont", "bgsound", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr", "!--", "animate", "animateTransform", "circle", "cursor", "desc", "ellipse", "feBlend", "feColorMatrix", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "font-face-format", "font-face-name", "font-face-uri", "glyph", "glyphRef", "hkern", "image", "line", "missing-glyph", "mpath", "path", "polygon", "polyline", "rect", "set", "stop", "tref", "use", "view", "vkern" ].join("|") + ")(?:[.#][a-zA-Z0-9-￿_:-]+)*$"));
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            !f && h.createRange && (f = h.createRange(), f.selectNode(h.body));
            var t;
            return f && f.createContextualFragment ? t = f.createContextualFragment(e) : (t = h.createElement("body"), 
            t.innerHTML = e), t.childNodes[0];
        }
        function i(e, t) {
            var n = e.nodeName, r = t.nodeName;
            return n === r || !!(t.actualize && n.charCodeAt(0) < 91 && r.charCodeAt(0) > 90) && n === r.toUpperCase();
        }
        function o(e, t) {
            return t && t !== p ? h.createElementNS(t, e) : h.createElement(e);
        }
        function a(e, t) {
            for (var n = e.firstChild; n; ) {
                var r = n.nextSibling;
                t.appendChild(n), n = r;
            }
            return t;
        }
        function s(e, t) {
            var n, r, i, o, a, s = t.attributes;
            for (n = s.length - 1; n >= 0; --n) r = s[n], i = r.name, o = r.namespaceURI, a = r.value, 
            o ? (i = r.localName || i, e.getAttributeNS(o, i) !== a && e.setAttributeNS(o, i, a)) : e.getAttribute(i) !== a && e.setAttribute(i, a);
            for (s = e.attributes, n = s.length - 1; n >= 0; --n) r = s[n], r.specified !== !1 && (i = r.name, 
            o = r.namespaceURI, o ? (i = r.localName || i, g(t, o, i) || e.removeAttributeNS(o, i)) : g(t, null, i) || e.removeAttribute(i));
        }
        function u(e, t, n) {
            e[n] !== t[n] && (e[n] = t[n], e[n] ? e.setAttribute(n, "") : e.removeAttribute(n, ""));
        }
        function c() {}
        function l(e) {
            return e.id;
        }
        var f, d, p = "http://www.w3.org/1999/xhtml", h = "undefined" == typeof document ? void 0 : document, v = h ? h.body || h.createElement("div") : {};
        d = v.hasAttributeNS ? function(e, t, n) {
            return e.hasAttributeNS(t, n);
        } : v.hasAttribute ? function(e, t, n) {
            return e.hasAttribute(n);
        } : function(e, t, n) {
            return null != e.getAttributeNode(t, n);
        };
        var g = d, y = {
            OPTION: function(e, t) {
                u(e, t, "selected");
            },
            INPUT: function(e, t) {
                u(e, t, "checked"), u(e, t, "disabled"), e.value !== t.value && (e.value = t.value), 
                g(t, null, "value") || e.removeAttribute("value");
            },
            TEXTAREA: function(e, t) {
                var n = t.value;
                if (e.value !== n && (e.value = n), e.firstChild) {
                    if ("" === n && e.firstChild.nodeValue === e.placeholder) return;
                    e.firstChild.nodeValue = n;
                }
            },
            SELECT: function(e, t) {
                if (!g(t, null, "multiple")) {
                    for (var n = 0, r = t.firstChild; r; ) {
                        var i = r.nodeName;
                        if (i && "OPTION" === i.toUpperCase()) {
                            if (g(r, null, "selected")) {
                                n;
                                break;
                            }
                            n++;
                        }
                        r = r.nextSibling;
                    }
                    e.selectedIndex = n;
                }
            }
        }, m = 1, b = 3, w = 8, _ = function(e) {
            return function(t, n, s) {
                function u(e) {
                    x ? x.push(e) : x = [ e ];
                }
                function f(e, t) {
                    if (e.nodeType === m) for (var n = e.firstChild; n; ) {
                        var r = void 0;
                        t && (r = k(n)) ? u(r) : (E(n), n.firstChild && f(n, t)), n = n.nextSibling;
                    }
                }
                function d(e, t, n) {
                    A(e) !== !1 && (t && t.removeChild(e), E(e), f(e, n));
                }
                function p(e) {
                    if (e.nodeType === m) for (var t = e.firstChild; t; ) {
                        var n = k(t);
                        n && (M[n] = t), p(t), t = t.nextSibling;
                    }
                }
                function v(e) {
                    S(e);
                    for (var t = e.firstChild; t; ) {
                        var n = t.nextSibling, r = k(t);
                        if (r) {
                            var o = M[r];
                            o && i(t, o) && (t.parentNode.replaceChild(o, t), g(o, t));
                        }
                        v(t), t = n;
                    }
                }
                function g(r, o, a) {
                    var s, c = k(o);
                    if (c && delete M[c], !n.isSameNode || !n.isSameNode(t)) {
                        if (!a) {
                            if (T(r, o) === !1) return;
                            if (e(r, o), C(r), P(r, o) === !1) return;
                        }
                        if ("TEXTAREA" !== r.nodeName) {
                            var l, f, p, _, x = o.firstChild, S = r.firstChild;
                            e: for (;x; ) {
                                for (p = x.nextSibling, l = k(x); S; ) {
                                    if (f = S.nextSibling, x.isSameNode && x.isSameNode(S)) {
                                        x = p, S = f;
                                        continue e;
                                    }
                                    s = k(S);
                                    var A = S.nodeType, E = void 0;
                                    if (A === x.nodeType && (A === m ? (l ? l !== s && ((_ = M[l]) ? S.nextSibling === _ ? E = !1 : (r.insertBefore(_, S), 
                                    f = S.nextSibling, s ? u(s) : d(S, r, !0), S = _) : E = !1) : s && (E = !1), (E = E !== !1 && i(S, x)) && g(S, x)) : A !== b && A != w || (E = !0, 
                                    S.nodeValue = x.nodeValue)), E) {
                                        x = p, S = f;
                                        continue e;
                                    }
                                    s ? u(s) : d(S, r, !0), S = f;
                                }
                                if (l && (_ = M[l]) && i(_, x)) r.appendChild(_), g(_, x); else {
                                    var H = O(x);
                                    H !== !1 && (H && (x = H), x.actualize && (x = x.actualize(r.ownerDocument || h)), 
                                    r.appendChild(x), v(x));
                                }
                                x = p, S = f;
                            }
                            for (;S; ) f = S.nextSibling, (s = k(S)) ? u(s) : d(S, r, !0), S = f;
                        }
                        var j = y[r.nodeName];
                        j && j(r, o);
                    }
                }
                if (s || (s = {}), "string" == typeof n) if ("#document" === t.nodeName || "HTML" === t.nodeName) {
                    var _ = n;
                    n = h.createElement("html"), n.innerHTML = _;
                } else n = r(n);
                var x, k = s.getNodeKey || l, O = s.onBeforeNodeAdded || c, S = s.onNodeAdded || c, T = s.onBeforeElUpdated || c, C = s.onElUpdated || c, A = s.onBeforeNodeDiscarded || c, E = s.onNodeDiscarded || c, P = s.onBeforeElChildrenUpdated || c, H = s.childrenOnly === !0, M = {};
                p(t);
                var j = t, F = j.nodeType, N = n.nodeType;
                if (!H) if (F === m) N === m ? i(t, n) || (E(t), j = a(t, o(n.nodeName, n.namespaceURI))) : j = n; else if (F === b || F === w) {
                    if (N === F) return j.nodeValue = n.nodeValue, j;
                    j = n;
                }
                if (j === n) E(t); else if (g(j, n, H), x) for (var I = 0, L = x.length; I < L; I++) {
                    var R = M[x[I]];
                    R && d(R, R.parentNode, !1);
                }
                return !H && j !== t && t.parentNode && (j.actualize && (j = j.actualize(t.ownerDocument || h)), 
                t.parentNode.replaceChild(j, t)), j;
            };
        }(s);
        e.exports = _;
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
            if (f === clearTimeout) return clearTimeout(e);
            if ((f === r || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e);
            try {
                return f(e);
            } catch (t) {
                try {
                    return f.call(null, e);
                } catch (t) {
                    return f.call(this, e);
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
        var l, f, d = e.exports = {};
        !function() {
            try {
                l = "function" == typeof setTimeout ? setTimeout : n;
            } catch (e) {
                l = n;
            }
            try {
                f = "function" == typeof clearTimeout ? clearTimeout : r;
            } catch (e) {
                f = r;
            }
        }();
        var p, h = [], v = !1, g = -1;
        d.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            h.push(new u(e, t)), 1 !== h.length || v || i(s);
        }, u.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", 
        d.versions = {}, d.on = c, d.addListener = c, d.once = c, d.off = c, d.removeListener = c, 
        d.removeAllListeners = c, d.emit = c, d.binding = function(e) {
            throw new Error("process.binding is not supported");
        }, d.cwd = function() {
            return "/";
        }, d.chdir = function(e) {
            throw new Error("process.chdir is not supported");
        }, d.umask = function() {
            return 0;
        };
    }, function(e, t) {
        var n = null, r = [ "Webkit", "Moz", "O", "ms" ];
        e.exports = function(e) {
            n || (n = document.createElement("div"));
            var t = n.style;
            if (e in t) return e;
            for (var i = e.charAt(0).toUpperCase() + e.slice(1), o = r.length; o >= 0; o--) {
                var a = r[o] + i;
                if (a in t) return a;
            }
            return !1;
        };
    }, function(e, t, n) {
        function r(e) {
            return i(e).replace(/\s(\w)/g, function(e, t) {
                return t.toUpperCase();
            });
        }
        var i = n(45);
        e.exports = r;
    }, function(e, t) {
        function n(e) {
            return o.test(e) ? e.toLowerCase() : a.test(e) ? (r(e) || e).toLowerCase() : s.test(e) ? i(e).toLowerCase() : e.toLowerCase();
        }
        function r(e) {
            return e.replace(u, function(e, t) {
                return t ? " " + t : "";
            });
        }
        function i(e) {
            return e.replace(c, function(e, t, n) {
                return t + " " + n.toLowerCase().split("").join(" ");
            });
        }
        e.exports = n;
        var o = /\s/, a = /(_|-|\.|:)/, s = /([a-z][A-Z]|[A-Z][a-z])/, u = /[\W_]+(.|$)/g, c = /(.)([A-Z]+)/g;
    }, function(e, t, n) {
        function r(e) {
            return i(e).replace(/[\W_]+(.|$)/g, function(e, t) {
                return t ? " " + t : "";
            }).trim();
        }
        var i = n(44);
        e.exports = r;
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            var r = e.scale;
            return n.i(a.h)([ "span", [ "input", {
                type: "range",
                value: r,
                min: .5,
                max: 3,
                step: .2,
                onchange: function(e) {
                    return t("updateGraphScale", e.target.value);
                },
                onmousemove: function(e) {
                    return e.stopPropagation();
                }
            } ] ]);
        }
        function i(e, t) {
            if (!e) return n.i(a.h)([ "section", {
                class: o.a
            } ]);
            var r = e.entities, i = e.processes, s = e.edges, u = e.viewBox, c = void 0 === u ? {} : u;
            return n.i(a.h)([ "section", {
                class: o.a
            }, [ "svg", {
                width: "100%",
                height: "100%",
                viewBox: c.x + ", " + c.y + ", " + c.width + ", " + c.height
            } ].concat(s.map(function(e) {
                return [ "line", {
                    x1: e.from.x,
                    y1: e.from.y,
                    x2: e.to.x,
                    y2: e.to.y,
                    class: e.class
                } ];
            }), i.map(function(e) {
                return [ "circle", {
                    "data-key": e.id,
                    class: "",
                    transform: "translate(" + e.x + ", " + e.y + ")",
                    cx: 0,
                    cy: 0,
                    r: e.autostart ? 13 : 8,
                    fill: "tomato",
                    title: e.id
                } ];
            }), r.map(function(e) {
                return [ "g", {
                    "data-key": e.id,
                    transform: "translate(" + e.x + ", " + e.y + ")",
                    onmousedown: function() {
                        return t("state.gui.openEntity", e.id);
                    },
                    title: e.id
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
            })) ]);
        }
        var o = n(50), a = n(2);
        t.b = r, t.a = i;
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>graph</title>\n<path d="M18 16.078c1.594 0 2.906 1.313 2.906 2.906s-1.313 2.953-2.906 2.953-2.906-1.359-2.906-2.953c0-0.234 0-0.469 0.047-0.656l-7.078-4.125c-0.563 0.516-1.266 0.797-2.063 0.797-1.641 0-3-1.359-3-3s1.359-3 3-3c0.797 0 1.5 0.281 2.063 0.797l7.031-4.078c-0.047-0.234-0.094-0.469-0.094-0.703 0-1.641 1.359-3 3-3s3 1.359 3 3-1.359 3-3 3c-0.797 0-1.5-0.328-2.063-0.844l-7.031 4.125c0.047 0.234 0.094 0.469 0.094 0.703s-0.047 0.469-0.094 0.703l7.125 4.125c0.516-0.469 1.219-0.75 1.969-0.75z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>graph</title>\n<path d="M18 16.078c1.594 0 2.906 1.313 2.906 2.906s-1.313 2.953-2.906 2.953-2.906-1.359-2.906-2.953c0-0.234 0-0.469 0.047-0.656l-7.078-4.125c-0.563 0.516-1.266 0.797-2.063 0.797-1.641 0-3-1.359-3-3s1.359-3 3-3c0.797 0 1.5 0.281 2.063 0.797l7.031-4.078c-0.047-0.234-0.094-0.469-0.094-0.703 0-1.641 1.359-3 3-3s3 1.359 3 3-1.359 3-3 3c-0.797 0-1.5-0.328-2.063-0.844l-7.031 4.125c0.047 0.234 0.094 0.469 0.094 0.703s-0.047 0.469-0.094 0.703l7.125 4.125c0.516-0.469 1.219-0.75 1.969-0.75z"></path>\n</svg>' ], 
            a(n, s.b.apply(void 0, [ u ].concat(e)));
            var n;
        }
        function i() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>list</title>\n<path d="M9 5.016h12v3.984h-12v-3.984zM9 18.984v-3.984h12v3.984h-12zM9 14.016v-4.031h12v4.031h-12zM3.984 9v-3.984h4.031v3.984h-4.031zM3.984 18.984v-3.984h4.031v3.984h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>list</title>\n<path d="M9 5.016h12v3.984h-12v-3.984zM9 18.984v-3.984h12v3.984h-12zM9 14.016v-4.031h12v4.031h-12zM3.984 9v-3.984h4.031v3.984h-4.031zM3.984 18.984v-3.984h4.031v3.984h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031z"></path>\n</svg>' ], 
            a(n, s.b.apply(void 0, [ u ].concat(e)));
            var n;
        }
        function o() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>entities</title>\n<path d="M16.641 1.688l5.672 5.672-5.672 5.625h4.359v8.016h-8.016v-8.016h3.656l-5.625-5.625v3.656h-8.016v-8.016h8.016v4.359zM3 21v-8.016h8.016v8.016h-8.016z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>entities</title>\n<path d="M16.641 1.688l5.672 5.672-5.672 5.625h4.359v8.016h-8.016v-8.016h3.656l-5.625-5.625v3.656h-8.016v-8.016h8.016v4.359zM3 21v-8.016h8.016v8.016h-8.016z"></path>\n</svg>' ], 
            a(n, s.b.apply(void 0, [ u ].concat(e)));
            var n;
        }
        var a = n(24), s = (n.n(a), n(20));
        t.b = r, t.a = i, t.c = o;
        var u = n.i(s.a)({
            display: "inline-block",
            width: "1.1em",
            height: "1.1em",
            margin: 4,
            strokeWidth: 0,
            stroke: "currentColor",
            fill: "currentColor",
            verticalAlign: "bottom"
        });
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return n.i(y.h)([ "h1", e ]);
        }
        function i(e, t) {
            return function() {
                return t("state.gui.setActiveWindow", e);
            };
        }
        function o(e, t, o, a) {
            var s = e.visibility, u = e.position, c = function(e) {
                return function() {
                    return t("state.gui.updateVisibility", e);
                };
            }, l = n.i(y.h)([ "header", {
                class: n.i(v.b)("tvs-controls", x.a),
                onmousedown: i("controls", t)
            }, o(r, "state.gui.title"), [ "nav", {
                class: "tvs-controls-btns"
            }, [ "ul", [ "li", n.i(w.a)({
                class: s.tree && S,
                onclick: c("tree"),
                icon: m.a(),
                title: "toggle entity tree"
            }) ], [ "li", n.i(w.a)({
                class: s.graph && S,
                onclick: c("graph"),
                icon: m.b(),
                title: "toggle flow graph"
            }) ], [ "li", n.i(w.a)({
                class: s.entities && S,
                onclick: c("entities"),
                icon: m.c(),
                title: "toggle entity details"
            }) ] ] ] ]);
            return g(a || l, u), l;
        }
        function a(e, t, r, o) {
            function a(e) {
                return function() {
                    t("state.gui.setTreeView", e);
                };
            }
            var s = e.props, l = e.dimensions, f = "tree" === s.treeViewComponent ? r(u, "state.gui.treeData") : r(c, "state.flow.state"), d = n.i(y.h)([ "article", {
                "data-key": "tree",
                class: x.b,
                onmousedown: i("tree", t)
            }, [ "header", m.a(), [ "label", {
                class: _.a
            }, [ "input", {
                type: "radio",
                name: "viewTreeComponent",
                value: "tree",
                onchange: a("tree"),
                checked: "tree" === s.treeViewComponent
            } ], "Tree" ], [ "label", {
                class: _.a
            }, [ "input", {
                type: "radio",
                name: "viewTreeComponent",
                value: "list",
                onchange: a("list"),
                checked: "tree" !== s.treeViewComponent
            } ], "List" ] ], [ "section", {
                class: x.c
            }, f ], [ "footer", {
                class: "resize"
            } ] ]);
            return g(o || d, l), d;
        }
        function s(e, t, n, r) {
            if (t.__id__) return [ "li", [ "div", {
                onclick: function() {
                    return n("state.gui.openEntity", t.__id__);
                }
            }, e ] ];
            var i = [ "li", [ "div", {
                onclick: function() {
                    return n("state.gui.toggleTreeLevel", t.__path__);
                }
            }, e ] ];
            if (!r[t.__path__]) {
                var o = [ "ul" ];
                for (var a in t) "__path__" !== a && o.push(s(a, t[a], n, r));
                i.push(o);
            }
            return i;
        }
        function u(e, t) {
            var r = e.fold, i = e.tree, o = [ "ul", {
                "data-key": "treeView",
                class: x.d
            } ];
            if (i) {
                var a = Object.keys(i).map(function(e) {
                    return s(e, i[e], t, r);
                });
                o.push.apply(o, a);
            }
            return n.i(y.h)(o);
        }
        function c(e, t) {
            var r = [ "ul", {
                "data-key": "listView"
            } ];
            if (e) {
                var i = Object.keys(e).sort().map(function(e) {
                    return [ "li", {
                        "data-key": e,
                        onclick: function() {
                            return t("state.gui.openEntity", e);
                        }
                    }, e ];
                });
                r.push.apply(r, i);
            }
            return n.i(y.h)(r);
        }
        function l(e, t, r, o) {
            var a = r(k.a, "state.graph.viewData"), s = o || n.i(y.h)([ "article", {
                "data-key": "graph",
                class: x.b,
                onmousedown: i("graph", t)
            }, [ "header", m.b(), " Graph ", r(k.b, "state.graph.viewBox") ], a, [ "footer", {
                class: "resize"
            } ] ]);
            return g(s, O({}, e)), requestAnimationFrame(function() {
                t("updateGraphSize", {
                    width: a.clientWidth,
                    height: a.clientHeight
                });
            }), s;
        }
        function f(e, t) {
            var r = e.value, i = e.watching;
            return n.i(y.h)([ "code", [ "pre", {
                contenteditable: !i,
                oninput: function(e) {
                    return t({
                        type: "updateEditedValue",
                        payload: e.target.textContent
                    });
                }
            }, r ? JSON.stringify(r, null, "   ") : "" ] ]);
        }
        function d(e, t, r, o) {
            var a = e.dimensions, s = e.entity, u = e.watching, c = [ "div", {
                "data-key": "entity-buttons",
                style: "margin-top: 4px"
            } ];
            u ? c.push([ "button", {
                class: _.b,
                "data-key": "edit-button",
                onclick: function() {
                    return t("setEntityEditMode", !0);
                }
            }, "Edit" ]) : c.push([ "button", {
                class: _.b,
                "data-key": "cancel-button",
                onclick: function() {
                    return t("setEntityEditMode", !1);
                }
            }, "Cancel" ], [ "button", {
                class: _.b,
                "data-key": "save-button",
                onclick: function() {
                    return t("saveCurrentEntityValue", s);
                }
            }, "Save" ]);
            var l = n.i(y.h)([ "article", {
                "data-key": "entities",
                class: x.b,
                onmousedown: i("entities", t)
            }, [ "header", m.c(), " ", s ], [ "section", {
                class: x.c
            }, r(f, "state.gui.entityView") ], c, [ "footer", {
                class: "resize"
            } ] ]);
            return g(o || l, O({}, a)), l;
        }
        function p(e, t, r) {
            var i = e.tree ? r(a, "state.gui.treeWindowProps") : "", s = e.graph ? r(l, "state.gui.graphWindow") : "", u = e.entities ? r(d, "state.gui.entitiesWindowProps") : "";
            return n.i(y.h)([ "article", {
                class: n.i(v.b)("tvs-tools", b.b)
            }, r(o, "state.gui.controlProps"), s, u, i ]);
        }
        function h(e) {
            return e(p, "state.gui.visibility");
        }
        var v = n(20), g = n(36), y = (n.n(g), n(2)), m = n(47), b = n(6), w = n(51), _ = n(16), x = n(49), k = n(46);
        t.a = h;
        var O = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, S = n.i(v.a)({
            color: b.a
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(1), i = (n.n(r), n(6));
        n.d(t, "a", function() {
            return a;
        }), n.d(t, "b", function() {
            return s;
        }), n.d(t, "c", function() {
            return u;
        }), n.d(t, "d", function() {
            return c;
        });
        var o = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, a = n.i(r.style)(i.d, {
            display: "inline-block",
            position: "relative",
            padding: 2,
            whiteSpace: "nowrap",
            $nest: {
                "& h1": {
                    display: "inline-block",
                    margin: "0 8px",
                    fontSize: i.f,
                    fontWeight: "normal",
                    verticalAlign: "middle"
                },
                "& ul": o({}, i.g, {
                    display: "inline-block",
                    margin: 0,
                    fontSize: i.f,
                    fontWeight: "normal"
                }),
                "& li": {
                    display: "inline-block"
                },
                "& nav": {
                    display: "inline-block"
                }
            }
        }), s = n.i(r.style)(i.d, {
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
                }
            }
        }), u = n.i(r.style)(i.e, {
            overflow: "auto",
            position: "relative",
            flexGrow: 1,
            padding: 5
        }), c = n.i(r.style)(i.g, {
            $nest: {
                "& ul": i.g,
                "& li": {
                    paddingLeft: "1em"
                }
            }
        });
        n.i(r.style)({});
    }, function(e, t, n) {
        "use strict";
        var r = n(1), i = (n.n(r), n(6));
        n.d(t, "a", function() {
            return o;
        });
        var o = n.i(r.style)(i.e, {
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
                    stroke: "tomato",
                    $nest: {
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
                    fill: "red",
                    $nest: {
                        "&.accept": {
                            stroke: "darkred",
                            strokeWidth: 3,
                            strokeDasharray: "3, 3"
                        }
                    }
                },
                "& .initial": {
                    fill: "darkred"
                }
            }
        });
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = e.title, r = e.onclick, a = e.icon, s = e.class;
            return [ "button", {
                class: n.i(i.classes)(o.c, s),
                onmouseup: r,
                title: t
            }, a ];
        }
        var i = n(1), o = (n.n(i), n(16));
        t.a = r;
    }, function(e, t, n) {
        "use strict";
        var r = n(53);
        n(0), n(17), n(7);
        t.a = r;
        r.create;
    }, function(e, t, n) {
        "use strict";
        function r() {
            function e() {
                return {
                    entities: E,
                    processes: P,
                    arcs: H,
                    meta: M
                };
            }
            function t() {
                var e = {};
                for (var t in F.es) e[t] = F.es[t].val;
                return e;
            }
            function n() {
                return j;
            }
            function r(e) {
                j = e;
            }
            function a() {
                return M;
            }
            function s(e) {
                null == e || "object" != typeof e || e instanceof Array || (M = Object.assign({}, M, e));
            }
            function u(e) {
                N = e;
            }
            function c(e) {
                return F.es[e] && F.es[e].val;
            }
            function l(e, t) {
                var n = C(e);
                n.accept && !n.accept(t, n.val) || (n.val = t, L[e] = !0, z = !0, x());
            }
            function f(e, t) {
                l(e, t(c(e)));
            }
            function d(e, t) {
                C(e).cb.push(t);
            }
            function p(e, t) {
                var n = C(e);
                n.cb = t ? n.cb.filter(function(e) {
                    return e !== t;
                }) : [];
            }
            function h(e) {
                var t = i.createEntity(e);
                E[t.id] = t;
                var n = C(t.id);
                return null != t.value && null == n.val && (n.val = t.value, L[t.id] = !1, z = !0), 
                n.accept = t.accept, t;
            }
            function v(e) {
                var t = C(e);
                for (var n in t.arcs) b(n);
                delete F.es[e], delete E[e];
            }
            function g(e) {
                var t = i.createProcess(e, j);
                P[t.id] = t;
                var n = A(t.id);
                delete n.acc, n.values = [], n.sources = [], n.async = t.async, Object.keys(n.arcs).forEach(function(e) {
                    var n = H[e].port;
                    null == n || t.ports[n] && t.ports[n] !== i.PORT_TYPES.ACCUMULATOR || b(e);
                });
                for (var r in t.ports) t.ports[r] === i.PORT_TYPES.ACCUMULATOR && (n.acc = r);
                for (var o in n.arcs) w(H[o]);
                return t;
            }
            function y(e) {
                var t = A(e);
                t.stop && (t.stop(), delete t.stop);
                for (var n in t.arcs) b(n);
                delete F.ps[e], delete P[e];
            }
            function m(e) {
                var t = i.createArc(e);
                H[t.id] = t, w(t);
                var n = A(t.process), r = P[t.process];
                return r && r.autostart === !0 && Object.keys(n.arcs).length === Object.keys(r.ports).length + 1 && O(n), 
                t;
            }
            function b(e) {
                var t = H[e];
                if (t) {
                    var n = A(t.process), r = C(t.entity);
                    delete n.arcs[e], delete r.arcs[e], null != t.port ? (delete r.effects[t.process], 
                    delete n.sources[t.port], delete n.values[t.port]) : (n.stop && (n.stop(), delete n.stop), 
                    n.sink = function() {}, delete n.out, delete r.reactions[t.process]);
                }
                delete H[e];
            }
            function w(e) {
                var t = e.process, n = e.entity, r = A(t), o = C(n), a = P[t];
                o.arcs[e.id] = !0, a && (r.arcs[e.id] = !0, null != e.port ? (delete o.effects[t], 
                a.ports && null != a.ports[e.port] && (r.sources[e.port] = o, a.ports[e.port] == i.PORT_TYPES.HOT && (o.effects[t] = r))) : (r.out = o, 
                null != r.acc ? (r.sources[r.acc] = o, o.reactions[t] = r) : delete o.reactions[t], 
                r.sink = function(e) {
                    o.accept && !o.accept(e, o.val) || (o.val = e, null != e && (L[o.id] = !0, z = !0), 
                    R || x());
                }));
            }
            function _(e) {
                if (e.entities) for (var t in e.entities) h(e.entities[t]);
                if (e.processes) for (var t in e.processes) g(e.processes[t]);
                if (e.arcs) for (var t in e.arcs) m(e.arcs[t]);
                e.meta && s(e.meta);
            }
            function x() {
                N && console.log("flushing graph recursively with", L);
                var e = Object.keys(L);
                if (z) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (L[n]) {
                            var r = F.es[n];
                            for (var i in r.reactions) k(r.reactions[i]);
                        }
                    }
                    var o = {};
                    L = {}, z = !1, R = !0;
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t], r = F.es[n];
                        r.cb.length > 0 && (I[n] = r);
                        for (var i in r.effects) o[i] || (k(r.effects[i]), o[i] = !0);
                    }
                    if (R = !1, z) x(); else {
                        var a = Object.keys(I);
                        I = {};
                        for (var t in a) for (var r = F.es[a[t]], s = 0; s < r.cb.length; s++) r.cb[s](r.val);
                        N && console.log("flush finished");
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
                    e.values[n] = r.val;
                }
                if (t) if (N && console.log("running process", e.id), e.async) e.stop && e.stop(), 
                e.stop = P[e.id].procedure.apply(j, [ e.sink ].concat(e.values)); else {
                    var i = P[e.id].procedure.apply(j, e.values);
                    if (e.out) {
                        var o = e.out;
                        o.accept && !o.accept(i, o.val) || (o.val = i, null != i && (L[e.out.id] = null == e.acc, 
                        z = !0));
                    }
                }
            }
            function O(e) {
                e.async ? setTimeout(function() {
                    k(e);
                }, 10) : (k(e), e.out && (L[e.out.id] = !1, z = !0));
            }
            function S(e) {
                var t = A(e);
                k(t), t.async || x();
            }
            function T(e) {
                var t = A(e);
                t.stop && (t.stop(), delete t.stop);
            }
            function C(e) {
                return E[e] || h({
                    id: e
                }), F.es[e] || (F.es[e] = {
                    id: e,
                    val: void 0,
                    reactions: {},
                    effects: {},
                    arcs: {},
                    cb: []
                });
            }
            function A(e) {
                return F.ps[e] || (F.ps[e] = {
                    id: e,
                    arcs: {},
                    sink: function() {}
                });
            }
            var E = {}, P = {}, H = {}, M = {}, j = null, F = {
                es: {},
                ps: {}
            }, N = !1, I = {}, L = {}, R = !1, z = !1;
            return {
                addEntity: h,
                removeEntity: v,
                addProcess: g,
                removeProcess: y,
                addArc: m,
                removeArc: b,
                addGraph: _,
                getGraph: e,
                getState: t,
                setMeta: s,
                getMeta: a,
                getContext: n,
                setContext: r,
                setDebug: u,
                get: c,
                set: l,
                update: f,
                on: d,
                off: p,
                start: S,
                stop: T,
                flush: x,
                PORT_TYPES: o({}, i.PORT_TYPES)
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(7);
        t.create = r;
        var o = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function evaluate(code, context) {
            var prefix = "(function(){ return ", postfix = "})", factory = eval("(function(){ return " + code + "})");
            return factory.call(context);
        }
        __webpack_exports__.a = evaluate;
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
                l.pressed[t.button] = t, t.button === i.LEFT && (f = t.clientX, d = t.clientY, p = !0), 
                e(l);
            }
            function r(t) {
                delete l.pressed[t.button], delete l.dragDelta.event, l.dragDelta.x = 0, l.dragDelta.y = 0, 
                p = !1, e(l);
            }
            function o(t) {
                p && (l.dragDelta.event = t, l.dragDelta.x = f - t.clientX, l.dragDelta.y = d - t.clientY, 
                f = t.clientX, d = t.clientY, e(l));
            }
            function a(e) {
                e.preventDefault();
            }
            void 0 === t && (t = {});
            var s = t.element, u = void 0 === s ? document : s, c = t.enableRightButton, l = {
                pressed: {},
                dragDelta: {
                    x: 0,
                    y: 0
                }
            }, f = 0, d = 0, p = !1;
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
        var o = n(3);
        n.n(o);
        t.a = r, t.b = i;
    }, function(e, t, n) {
        "use strict";
        var r = n(57), i = n(21), o = n(3);
        n.n(o);
        n.d(t, "a", function() {
            return s;
        });
        var a = function() {
            return o.create(void 0, !0);
        }, s = function() {
            function e(e) {
                var t = e.autoGenerateTag, o = this;
                this.cssRaw = function(e) {
                    e && (o._raw += e || "", o._pendingRawChange = !0, o._styleUpdated());
                }, this.cssRule = function(e) {
                    for (var t = [], a = 1; a < arguments.length; a++) t[a - 1] = arguments[a];
                    var s = n.i(r.a)(i.b.apply(void 0, t)).result;
                    o._freeStyle.registerRule(e, s), o._styleUpdated();
                }, this.forceRenderStyles = function() {
                    var e = o._getTag();
                    e && (e.textContent = o.getStyles());
                }, this.fontFace = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    for (var n = o._freeStyle, r = 0, i = e; r < i.length; r++) {
                        var a = i[r];
                        n.registerRule("@font-face", a);
                    }
                    o._styleUpdated();
                }, this.getStyles = function() {
                    return (o._raw || "") + o._freeStyle.getStyles();
                }, this.keyframes = function(e) {
                    var t = n.i(r.b)(e), i = t.keyframes, a = t.$debugName, s = o._freeStyle.registerKeyframes(i, a);
                    return o._styleUpdated(), s;
                }, this.reinit = function() {
                    var e = a();
                    o._freeStyle = e, o._lastFreeStyleChangeId = e.changeId, o._raw = "", o._pendingRawChange = !1;
                    var t = o._getTag();
                    t && (t.textContent = "");
                }, this.setStylesTarget = function(e) {
                    o._tag && (o._tag.textContent = ""), o._tag = e, o.forceRenderStyles();
                }, this.style = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    var a = o._freeStyle, s = n.i(r.a)(i.b.apply(void 0, e)), u = s.result, c = s.debugName, l = c ? a.registerStyle(u, c) : a.registerStyle(u);
                    return o._styleUpdated(), l;
                };
                var s = a();
                this._autoGenerateTag = t, this._freeStyle = s, this._lastFreeStyleChangeId = s.changeId, 
                this._pending = 0, this._pendingRawChange = !1, this._raw = "", this._tag = void 0;
            }
            return e.prototype._afterAllSync = function(e) {
                var t = this;
                this._pending++;
                var r = this._pending;
                n.i(i.c)(function() {
                    r === t._pending && e();
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
    }, function(e, t) {}, function(e, t, n) {
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
        var o = n(3);
        t.ensureStringObj = r, t.explodeKeyframes = i;
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(60), i = n(22), o = n(3), a = function() {
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, function(e, t) {
        e.exports = [ "onclick", "ondblclick", "onmousedown", "onmouseup", "onmouseover", "onmousemove", "onmouseout", "ondragstart", "ondrag", "ondragenter", "ondragleave", "ondragover", "ondrop", "ondragend", "onkeydown", "onkeypress", "onkeyup", "onunload", "onabort", "onerror", "onresize", "onscroll", "onselect", "onchange", "onsubmit", "onreset", "onfocus", "onblur", "oninput", "oncontextmenu", "onfocusin", "onfocusout" ];
    }, function(e, t) {}, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(25), i = n(10), o = n(11), a = n(2);
        n.d(t, "ui", function() {
            return s;
        }), n.d(t, "utils", function() {
            return u;
        }), t.default = r;
        var s = r, u = {
            entityTree: i,
            webpack: o,
            yoyo: a
        };
    } ]);
});