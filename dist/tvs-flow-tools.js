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
        }, t.p = "", t(t.s = 57);
    }([ function(e, t, n) {
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
                var c = a + t.name;
                if (p[c]) return p[c];
                var l = e.get(a), f = t(l, r, o), h = "c" + d++;
                f.dataset.tvsComponent = "component";
                var v = function() {
                    var i = e.get(a), c = t(i, r, o, f);
                    n && console.log("updating", f), s.update(f, c, {
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
                return u(f, function() {
                    n && console.log("element inserted into dom!", f), e.on(a, g);
                }, function() {
                    n && console.log("element removed from dom!", f), e.off(a, g);
                }, o), p[c] = f, f;
            }
            return void 0 === n && (n = !1), o;
        }
        function a(e) {
            var t = e.shift(e), n = e[0];
            "object" != typeof n || Array.isArray(n) || n instanceof Element ? n = {} : e.shift();
            for (var r in n) "boolean" == typeof n[r] && (n[r] = "" + n[r]);
            return c.createElement(t, n, e.map(function(e) {
                return Array.isArray(e) ? a(e) : e;
            }));
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(27), c = (n.n(s), n(17)), u = (n.n(c), n(19));
        n.n(u);
        t.flowComponentFactory = o, t.h = a;
        var l = {}, f = !0, d = 0, p = {};
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
        var i = n(72), o = n(73);
        t.types = o;
        var a = n(25);
        t.extend = a.extend, t.classes = a.classes, t.media = a.media;
        var s = new i.TypeStyle({
            autoGenerateTag: !0
        });
        t.setStylesTarget = s.setStylesTarget, t.cssRaw = s.cssRaw, t.cssRule = s.cssRule, 
        t.forceRenderStyles = s.forceRenderStyles, t.fontFace = s.fontFace, t.getStyles = s.getStyles, 
        t.keyframes = s.keyframes, t.reinit = s.reinit, t.style = s.style, t.createTypeStyle = r;
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            return t ? t + "." + e : e;
        }
        function i(e) {
            var t, i, o = e.value, s = n.i(g.a)(), c = 0, u = [], l = {};
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
            }, e.procedure && u.push(e), l.react = function(e, t, n) {
                var r = a(e, t, n);
                r.pidSuffix = b + c++;
                var i = r.dependencies;
                return r.dependencies = [ {
                    entity: l,
                    type: v.PORT_TYPES.ACCUMULATOR
                } ], i && i.length && (r.dependencies = r.dependencies.concat(i)), u.push(r), l;
            }, l.getGraph = function() {
                var e = h.empty();
                return e.entities[s] = n.i(v.createEntity)({
                    id: s,
                    value: o,
                    accept: i
                }), u.forEach(function(i) {
                    var o = i.processId ? r(i.processId, t) : s + i.pidSuffix, a = i.dependencies, c = [];
                    if (a) for (var u in a) {
                        var l = a[u];
                        if (c[u] = l.type, l.type !== v.PORT_TYPES.ACCUMULATOR) {
                            var f = n.i(v.createArc)({
                                process: o,
                                entity: l.entity.getId(),
                                port: u
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
                        ports: c,
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
        function c(e, t, n) {
            return i(y({}, a(e, t, n), {
                async: !0
            }));
        }
        function u(e, t, n) {
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
        var h = n(21), v = n(8), g = n(22);
        t.val = o, t.stream = s, t.asyncStream = c, t.streamStart = u, t.asyncStreamStart = l, 
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(2), i = n(66), o = n(67);
        n.d(t, "action", function() {
            return a;
        }), n.d(t, "windowSize", function() {
            return s;
        }), n.d(t, "element", function() {
            return c;
        }), n.d(t, "mouse", function() {
            return u;
        });
        var a = n.i(r.val)(), s = n.i(r.asyncStreamStart)(i.a), c = n.i(r.val)(), u = n.i(r.asyncStream)([ c.HOT ], function(e, t) {
            return n.i(o.a)(e, {
                el: t,
                enableRightButton: !0
            });
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(1), i = (n.n(r), n(36));
        n.n(i);
        n.d(t, "g", function() {
            return o;
        }), n.d(t, "d", function() {
            return s;
        }), n.d(t, "a", function() {
            return c;
        }), n.d(t, "c", function() {
            return u;
        }), n.d(t, "f", function() {
            return l;
        }), n.d(t, "e", function() {
            return f;
        }), n.d(t, "b", function() {
            return d;
        });
        var o = "white", a = n.i(i.rgba)(40, 40, 40, .75).toString(), s = 16, c = "cyan", u = {
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
                    var f = l[u], d = e[f];
                    f === t.IS_UNIQUE ? c = !!d : i(d) ? a.push([ f.trim(), d ]) : o.push([ n(f.trim()), d ]);
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
            function f(e, t, n, i, o) {
                var a = c(n, !!t), s = a.properties, d = a.nestedStyles, p = a.isUnique, h = u(s), v = h;
                if (r(t)) {
                    var y = e.add(new E(t, o ? void 0 : h, e.hash));
                    if (h && o) {
                        var m = y.add(new T(h, y.hash, p ? "u" + (++g).toString(36) : void 0));
                        i.push([ o, m ]);
                    }
                    for (var b = 0, w = d; b < w.length; b++) {
                        var _ = w[b], k = _[0], x = _[1];
                        v += k + f(y, k, x, i, o);
                    }
                } else {
                    var S = o ? l(t, o) : t;
                    if (h) {
                        var m = e.add(new T(h, e.hash, p ? "u" + (++g).toString(36) : void 0));
                        i.push([ S, m ]);
                    }
                    for (var O = 0, C = d; O < C.length; O++) {
                        var A = C[O], k = A[0], x = A[1];
                        v += k + f(e, k, x, i, S);
                    }
                }
                return v;
            }
            function d(e, t, n, r, i) {
                for (var o = new S(e.hash), a = [], s = f(o, t, n, a), c = "f" + o.hash(s), u = i ? i + "_" + c : c, d = 0, p = a; d < p.length; d++) {
                    var h = p[d], v = h[0], g = h[1], y = r ? l(v, "." + u) : v;
                    g.add(new O(y, g.hash, void 0, s));
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
                return void 0 === t && (t = o), void 0 === n && (n = void 0 !== e && "production" !== e.env.NODE_ENV), 
                new C(t, n);
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
            }, m = 0, b = [ "-webkit-", "-ms-", "-moz-", "-o-" ]; m < b.length; m++) for (var w = b[m], _ = 0, k = Object.keys(y); _ < k.length; _++) {
                var x = k[_];
                y[w + x] = !0;
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
            var O = function() {
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
            t.Selector = O;
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
            }(S);
            t.Style = T;
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
                    var n = d(this, "&", e, !0, this.debug ? t : void 0), r = n.cache, i = n.id;
                    return this.merge(r), i;
                }, t.prototype.registerKeyframes = function(e, t) {
                    return this.registerHashRule("@keyframes", e, t);
                }, t.prototype.registerHashRule = function(e, t, n) {
                    var r = d(this, "", t, !1, this.debug ? n : void 0), i = r.cache, o = r.pid, a = r.id, s = new E(e + " " + a, void 0, this.hash, void 0, o);
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
            }(S);
            t.FreeStyle = C, t.create = h;
        }).call(t, n(51));
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(2), i = n(15), o = n(3), a = n(14);
        n.d(t, "runtime", function() {
            return s;
        }), n.d(t, "graph", function() {
            return c;
        }), n.d(t, "state", function() {
            return u;
        }), n.d(t, "entityTree", function() {
            return l;
        });
        var s = n.i(r.val)().react([ o.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            switch (n) {
              case "flowProcessRun":
                return void e.start(r);

              case "flowProcessStop":
                return void e.stop(r);

              case "flowEntityReset":
                return void e.set(r, e.getGraph().entities[r].value);

              case "flowEntityInspect":
                return void console.log(r, e.get(r));
            }
        }).accept(a.a), c = n.i(r.stream)([ s.HOT ], function(e) {
            return e.getGraph();
        }), u = n.i(r.stream)([ s.HOT ], function(e) {
            return e.getState();
        }), l = n.i(r.stream)([ c.HOT ], function(e) {
            return n.i(i.createEntityTree)(e.entities);
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(1), i = (n.n(r), n(4));
        n.d(t, "b", function() {
            return s;
        }), n.d(t, "c", function() {
            return c;
        }), n.d(t, "a", function() {
            return u;
        });
        var o = (n.i(r.style)({
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
            color: i.g,
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
        }, s = n.i(r.style)(i.c, o), c = n.i(r.style)(i.c, o, a), u = n.i(r.style)({
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
        function r(e) {
            var t = e.id, r = void 0 === t ? n.i(a.a)() : t, i = e.value, o = e.json, s = e.accept, u = e.meta;
            return null == i && o && (i = JSON.parse(o)), {
                id: r,
                value: i,
                accept: s,
                meta: c({}, u)
            };
        }
        function i(e, t) {
            var r = e.id, i = void 0 === r ? n.i(a.a)() : r, o = e.ports, u = void 0 === o ? [] : o, l = e.procedure, f = e.code, d = e.autostart, p = void 0 !== d && d, h = e.async, v = void 0 !== h && h, g = e.meta;
            if (null == l && null != f && (l = n.i(s.a)(f, t)), null == l) throw TypeError("Process must have procedure or code set");
            return {
                id: i,
                ports: u,
                procedure: l,
                autostart: p,
                async: v,
                meta: c({}, g)
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
        });
        var a = n(22), s = n(65);
        t.createEntity = r, t.createProcess = i, t.createArc = o, n.d(t, "PORT_TYPES", function() {
            return u;
        });
        var c = this && this.__assign || Object.assign || function(e) {
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
        });
        var a = n(2), s = n(14), c = n(3), u = n(6);
        n.d(t, "title", function() {
            return f;
        }), n.d(t, "visibility", function() {
            return d;
        }), n.d(t, "activeWindow", function() {
            return p;
        }), n.d(t, "zIndex", function() {
            return h;
        }), n.d(t, "controlsPosition", function() {
            return v;
        }), n.d(t, "treeWindow", function() {
            return g;
        }), n.d(t, "treeFold", function() {
            return y;
        }), n.d(t, "graphWindow", function() {
            return m;
        }), n.d(t, "entitiesWindow", function() {
            return b;
        }), n.d(t, "activeEntity", function() {
            return w;
        }), n.d(t, "activeProcess", function() {
            return _;
        }), n.d(t, "activeNode", function() {
            return k;
        }), n.d(t, "watchingEntity", function() {
            return x;
        }), n.d(t, "activeValue", function() {
            return S;
        }), n.d(t, "editedValue", function() {
            return O;
        }), n.d(t, "entityValueView", function() {
            return T;
        }), n.d(t, "entitiesWindowProps", function() {
            return E;
        }), n.d(t, "entityViewProps", function() {
            return C;
        }), n.d(t, "controlProps", function() {
            return A;
        }), n.d(t, "treeWindowProps", function() {
            return P;
        }), n.d(t, "graphWindowProps", function() {
            return M;
        }), n.d(t, "treeData", function() {
            return H;
        });
        var l = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, f = n.i(a.val)("").accept(s.b), d = n.i(a.val)({
            tree: !1,
            graph: !1,
            entities: !1
        }).react([ c.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if ("state.gui.updateVisibility" === n) return l({}, e, (i = {}, i[r] = !e[r], i));
            if ("closeWindow" === n) return l({}, e, (o = {}, o[r] = !1, o));
            var i, o;
        }).accept(s.a), p = n.i(a.stream)([ c.action.HOT ], function(e) {
            var t = e.type, n = e.payload;
            if ("state.gui.setActiveWindow" === t || "state.gui.updateVisibility" === t) return n;
        }).accept(n.i(s.c)(s.a, s.d)).val(""), h = n.i(a.val)(0).react([ p.HOT ], function(e) {
            return e + 1;
        }), v = n.i(a.val)({
            left: 0,
            top: 0,
            zIndex: 0
        }).react([ p.COLD, c.mouse.HOT, c.windowSize.COLD ], function(e, t, n, r) {
            var i = n.dragDelta, o = n.pressed[0] && n.pressed[0].target;
            if ("controls" === t && o && o.closest(".tvs-flow-controls") && (i.x || i.y)) return e.left -= i.x, 
            e.top -= i.y, e.top < 0 && (e.top = 0), e.left < 0 && (e.left = 0), e.top > r.height - 20 && (e.top = r.height - 20), 
            e.left > r.width - 20 && (e.left = r.width - 20), e;
        }).accept(s.a), g = n.i(a.val)({
            top: 100,
            left: 0,
            width: 300,
            height: 400,
            zIndex: 0
        }).react([ p.COLD, c.mouse.HOT, c.windowSize.COLD ], function(e, t, n, r) {
            var o = n.dragDelta, a = n.pressed[0] && n.pressed[0].target;
            if ("tree" === t && a && a.closest(".tvs-flow-tree") && (o.x || o.y)) return "resize" === a.className ? (e.width -= o.x, 
            e.height -= o.y) : (e.left -= o.x, e.top -= o.y), i(e, r);
        }).accept(s.a), y = n.i(a.val)({}).react([ c.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if ("state.gui.toggleTreeLevel" === n) return l({}, e, (i = {}, i[r] = !e[r], i));
            var i;
        }).accept(s.a), m = n.i(a.val)({
            top: 200,
            left: 100,
            width: 600,
            height: 600,
            zIndex: 0
        }).react([ p.COLD, c.mouse.HOT, c.windowSize.COLD ], function(e, t, n, r) {
            var o = n.dragDelta, a = n.pressed[0] && n.pressed[0].target;
            if ("graph" === t && a && a.closest(".tvs-flow-graph") && (o.x || o.y)) {
                if ("resize" === a.className) return e.width -= o.x, e.height -= o.y, i(e, r);
                if (!a.closest("svg")) return e.left -= o.x, e.top -= o.y, i(e, r);
            }
        }).accept(s.a), b = n.i(a.val)({
            top: 50,
            left: 400,
            width: 400,
            height: 500,
            zIndex: 0
        }).react([ p.COLD, c.mouse.HOT, c.windowSize.COLD ], function(e, t, n, r) {
            var o = n.dragDelta, a = n.pressed[0] && n.pressed[0].target;
            if ("entities" === t && a && a.closest(".tvs-flow-entities") && !a.closest("pre") && (o.x || o.y)) return "resize" === a.className ? (e.width -= o.x, 
            e.height -= o.y) : (e.left -= o.x, e.top -= o.y), i(e, r);
        }).accept(s.a), w = n.i(a.val)({}).react([ c.action.HOT, u.graph.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if ("state.gui.openEntity" === r) return n.entities[i];
        }).react([ c.mouse.HOT ], function(e, t) {
            if (t.pressed[2] && t.pressed[2].target.closest("svg")) return {
                id: ""
            };
        }).accept(s.a), _ = n.i(a.val)({}).react([ c.action.HOT, u.graph.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if ("state.gui.openProcess" === r) return n.processes[i];
        }).react([ c.mouse.HOT ], function(e, t) {
            if (t.pressed[2] && t.pressed[2].target.closest("svg")) return {
                id: ""
            };
        }).accept(s.a), k = n.i(a.val)({}).react([ w.HOT ], function(e, t) {
            return t;
        }).react([ _.HOT ], function(e, t) {
            return t;
        }), x = n.i(a.val)(!0).react([ c.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            return "setEntityEditMode" === n ? !r : "saveCurrentEntityValue" === n || void 0;
        }).react([ w.HOT ], function() {
            return !0;
        }).accept(s.a), S = n.i(a.asyncStream)([ u.runtime.COLD, w.HOT, d.HOT, x.HOT ], function(e, t, n, r, i) {
            if (n && n.id) {
                if (e(t.get(n.id)), r.entities && i) return t.on(n.id, e), function() {
                    return t.off(n.id, e);
                };
            } else e("");
        }), O = n.i(a.val)("").react([ c.action.HOT, u.runtime.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if ("updateEditedValue" === r) return i;
            e && "saveCurrentEntityValue" === r && requestAnimationFrame(function() {
                try {
                    n.set(i, JSON.parse(e));
                } catch (t) {
                    console.error("could not save value to entity", i, e), console.error(t);
                }
            });
        }).react([ S.HOT ], function() {
            return "";
        }).accept(n.i(s.c)(s.a, s.d)), T = n.i(a.stream)([ S.HOT, x.HOT ], function(e, t) {
            return {
                value: e,
                watching: t
            };
        }).val({
            value: null,
            watching: !0
        }), E = n.i(a.stream)([ b.HOT, k.HOT, p.HOT ], function(e, t, n) {
            return {
                dimensions: e,
                node: t,
                window: n
            };
        }).val({}), C = n.i(a.stream)([ w.HOT, x.HOT ], function(e, t) {
            return {
                entity: e,
                watching: t
            };
        }), A = n.i(a.stream)([ d.HOT, v.HOT ], function(e, t) {
            return {
                visibility: e,
                position: t
            };
        }), P = n.i(a.stream)([ g.HOT, p.HOT ], function(e, t) {
            return {
                dimensions: e,
                window: t
            };
        }).val({}), M = n.i(a.stream)([ m.HOT, p.HOT ], function(e, t) {
            return {
                dimensions: e,
                window: t
            };
        }).val({}), H = n.i(a.stream)([ y.HOT, u.entityTree.HOT, w.HOT ], function(e, t, n) {
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
        r(v, "controls"), r(g, "tree"), r(m, "graph"), r(b, "entities"), o(v), o(g), o(m), 
        o(b);
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>close</title>\n<path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>close</title>\n<path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>\n</svg>' ], 
            h(n, v.b.apply(void 0, [ m ].concat(e)));
            var n;
        }
        function i() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>graph</title>\n<path d="M18 16.078c1.594 0 2.906 1.313 2.906 2.906s-1.313 2.953-2.906 2.953-2.906-1.359-2.906-2.953c0-0.234 0-0.469 0.047-0.656l-7.078-4.125c-0.563 0.516-1.266 0.797-2.063 0.797-1.641 0-3-1.359-3-3s1.359-3 3-3c0.797 0 1.5 0.281 2.063 0.797l7.031-4.078c-0.047-0.234-0.094-0.469-0.094-0.703 0-1.641 1.359-3 3-3s3 1.359 3 3-1.359 3-3 3c-0.797 0-1.5-0.328-2.063-0.844l-7.031 4.125c0.047 0.234 0.094 0.469 0.094 0.703s-0.047 0.469-0.094 0.703l7.125 4.125c0.516-0.469 1.219-0.75 1.969-0.75z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>graph</title>\n<path d="M18 16.078c1.594 0 2.906 1.313 2.906 2.906s-1.313 2.953-2.906 2.953-2.906-1.359-2.906-2.953c0-0.234 0-0.469 0.047-0.656l-7.078-4.125c-0.563 0.516-1.266 0.797-2.063 0.797-1.641 0-3-1.359-3-3s1.359-3 3-3c0.797 0 1.5 0.281 2.063 0.797l7.031-4.078c-0.047-0.234-0.094-0.469-0.094-0.703 0-1.641 1.359-3 3-3s3 1.359 3 3-1.359 3-3 3c-0.797 0-1.5-0.328-2.063-0.844l-7.031 4.125c0.047 0.234 0.094 0.469 0.094 0.703s-0.047 0.469-0.094 0.703l7.125 4.125c0.516-0.469 1.219-0.75 1.969-0.75z"></path>\n</svg>' ], 
            h(n, v.b.apply(void 0, [ m ].concat(e)));
            var n;
        }
        function o() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>list</title>\n<path d="M9 5.016h12v3.984h-12v-3.984zM9 18.984v-3.984h12v3.984h-12zM9 14.016v-4.031h12v4.031h-12zM3.984 9v-3.984h4.031v3.984h-4.031zM3.984 18.984v-3.984h4.031v3.984h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>list</title>\n<path d="M9 5.016h12v3.984h-12v-3.984zM9 18.984v-3.984h12v3.984h-12zM9 14.016v-4.031h12v4.031h-12zM3.984 9v-3.984h4.031v3.984h-4.031zM3.984 18.984v-3.984h4.031v3.984h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031z"></path>\n</svg>' ], 
            h(n, v.b.apply(void 0, [ m ].concat(e)));
            var n;
        }
        function a() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>entities</title>\n<path d="M16.641 1.688l5.672 5.672-5.672 5.625h4.359v8.016h-8.016v-8.016h3.656l-5.625-5.625v3.656h-8.016v-8.016h8.016v4.359zM3 21v-8.016h8.016v8.016h-8.016z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 24 24">\n<title>entities</title>\n<path d="M16.641 1.688l5.672 5.672-5.672 5.625h4.359v8.016h-8.016v-8.016h3.656l-5.625-5.625v3.656h-8.016v-8.016h8.016v4.359zM3 21v-8.016h8.016v8.016h-8.016z"></path>\n</svg>' ], 
            h(n, v.b.apply(void 0, [ m ].concat(e)));
            var n;
        }
        function s() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 32 32">\n<title>play</title>\n<path d="M6 4l20 12-20 12z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 32 32">\n<title>play</title>\n<path d="M6 4l20 12-20 12z"></path>\n</svg>' ], 
            h(n, v.b.apply(void 0, [ m ].concat(e)));
            var n;
        }
        function c() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 32 32">\n<title>stop</title>\n<path d="M4 4h24v24h-24z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 32 32">\n<title>stop</title>\n<path d="M4 4h24v24h-24z"></path>\n</svg>' ], 
            h(n, v.b.apply(void 0, [ m ].concat(e)));
            var n;
        }
        function u() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n.i(g.h)([ "svg", {
                class: v.b.apply(void 0, [ m ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "stopMarked" ], [ "path", {
                d: "M4 4h24v24h-24z"
            } ], [ "circle", {
                cx: "16",
                cy: "16",
                r: "6",
                fill: "#666"
            } ] ]);
        }
        function l() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 32 32">\n<title>reset</title>\n<path d="M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 32 32">\n<title>reset</title>\n<path d="M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z"></path>\n</svg>' ], 
            h(n, v.b.apply(void 0, [ m ].concat(e)));
            var n;
        }
        function f() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n = [ '<svg class="', '" viewBox="0 0 32 32">\n<title>show</title>\n<path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>\n</svg>' ], 
            n.raw = [ '<svg class="', '" viewBox="0 0 32 32">\n<title>show</title>\n<path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>\n</svg>' ], 
            h(n, v.b.apply(void 0, [ m ].concat(e)));
            var n;
        }
        function d() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n.i(g.h)([ "svg", {
                class: v.b.apply(void 0, [ m ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "copy" ], [ "path", {
                d: "M28.681 11.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-11.5c-1.379 0-2.5 1.122-2.5 2.5v23c0 1.378 1.121 2.5 2.5 2.5h19c1.378 0 2.5-1.122 2.5-2.5v-15.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 9.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268v0zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-19c-0.271 0-0.5-0.229-0.5-0.5v-23c0-0.271 0.229-0.5 0.5-0.5 0 0 11.499-0 11.5 0v7c0 0.552 0.448 1 1 1h7v15.5z"
            } ], [ "path", {
                d: "M18.841 1.319c-1.612-1.182-2.393-1.319-2.841-1.319h-11.5c-1.378 0-2.5 1.121-2.5 2.5v23c0 1.207 0.86 2.217 2 2.45v-25.45c0-0.271 0.229-0.5 0.5-0.5h15.215c-0.301-0.248-0.595-0.477-0.873-0.681z"
            } ] ]);
        }
        function p() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return n.i(g.h)([ "svg", {
                class: v.b.apply(void 0, [ m ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "more" ], [ "path", {
                d: "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"
            } ], [ "path", {
                d: "M11.086 22.086l2.829 2.829 8.914-8.914-8.914-8.914-2.828 2.828 6.086 6.086z"
            } ] ]);
        }
        var h = n(27), v = (n.n(h), n(23)), g = n(0), y = n(4);
        t.d = r, t.b = i, t.a = o, t.c = a, t.h = s, t.i = c, t.j = u, t.g = l, t.f = f, 
        t.e = d, t.k = p;
        var m = n.i(v.a)({
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
                    fill: y.a
                }
            }
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(1), i = (n.n(r), n(4));
        n.d(t, "a", function() {
            return a;
        }), n.d(t, "b", function() {
            return s;
        }), n.d(t, "c", function() {
            return c;
        }), n.d(t, "e", function() {
            return u;
        }), n.d(t, "d", function() {
            return l;
        });
        var o = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, a = n.i(r.style)(i.c, {
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
                "& ul": o({}, i.e, {
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
        }), s = n.i(r.style)(i.c, {
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
        }), c = n.i(r.style)(i.f, {
            overflow: "auto",
            position: "relative",
            flexGrow: 1,
            padding: 5
        }), u = n.i(r.style)(i.e, {
            margin: 0,
            $nest: {
                "& ul": i.e,
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
                    color: i.a
                }
            }
        }), l = n.i(r.style)({
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
            var t = e.title, r = e.onclick, a = e.icon, s = e.key, c = e.class, u = [ "button", {
                class: n.i(i.classes)(o.c, c),
                onmouseup: r,
                title: t
            }, a ];
            return s && (u[1]["data-key"] = s), u;
        }
        var i = n(1), o = (n.n(i), n(7));
        t.a = r;
    }, function(e, t, n) {
        "use strict";
        n.d(t, "d", function() {
            return r;
        }), n.d(t, "a", function() {
            return i;
        }), n.d(t, "b", function() {
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
        function r(e, t) {
            void 0 === t && (t = ".");
            var n = {};
            return Object.keys(e).sort().forEach(function(r) {
                for (var i = e[r], o = i.id.split(t), a = n, s = o.slice(), c = [], u = 0; u < o.length; u++) {
                    var l = s.shift();
                    s.length ? (c.push(l), a = a[l] = a[l] || {
                        __path__: c.join(t)
                    }) : a[l] = {
                        __entity__: i
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
        var o = n(2);
        t.modulePathToNamespace = r, t.getGraphFromModules = i;
    }, function(e, t, n) {
        function r(e, t, n) {
            function o(e) {
                if (Array.isArray(e)) for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    if (Array.isArray(n)) o(n); else {
                        if (("number" == typeof n || "boolean" == typeof n || "function" == typeof n || n instanceof Date || n instanceof RegExp) && (n = n.toString()), 
                        "string" == typeof n) {
                            if (d.lastChild && "#text" === d.lastChild.nodeName) {
                                d.lastChild.nodeValue += n;
                                continue;
                            }
                            n = i.createTextNode(n);
                        }
                        n && n.nodeType && d.appendChild(n);
                    }
                }
            }
            var d;
            -1 !== f.indexOf(e) && (t.namespace = s);
            var p = !1;
            if (t.namespace && (p = t.namespace, delete t.namespace), p) d = i.createElementNS(p, e); else {
                if (e === l) return i.createComment(t.comment);
                d = i.createElement(e);
            }
            if (t.onload || t.onunload) {
                var h = t.onload || function() {}, v = t.onunload || function() {};
                a(d, function() {
                    h(d);
                }, function() {
                    v(d);
                }, r.caller.caller.caller), delete t.onload, delete t.onunload;
            }
            for (var g in t) if (t.hasOwnProperty(g)) {
                var y = g.toLowerCase(), m = t[g];
                if ("classname" === y && (y = "class", g = "class"), "htmlFor" === g && (g = "for"), 
                u[y]) if ("true" === m) m = y; else if ("false" === m) continue;
                "on" === y.slice(0, 2) ? d[g] = m : p ? "xlink:href" === g ? d.setAttributeNS(c, g, m) : /^xmlns($|:)/i.test(g) || d.setAttributeNS(null, g, m) : d.setAttribute(g, m);
            }
            return o(n), d;
        }
        var i = n(18), o = n(48), a = n(19), s = "http://www.w3.org/2000/svg", c = "http://www.w3.org/1999/xlink", u = {
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
        }, l = "!--", f = [ "svg", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern" ];
        e.exports = o(r, {
            comments: !0
        }), e.exports.default = e.exports, e.exports.createElement = r;
    }, function(e, t, n) {
        (function(t) {
            var r = void 0 !== t ? t : "undefined" != typeof window ? window : {}, i = n(75);
            if ("undefined" != typeof document) e.exports = document; else {
                var o = r["__GLOBAL_DOCUMENT_CACHE@4"];
                o || (o = r["__GLOBAL_DOCUMENT_CACHE@4"] = i), e.exports = o;
            }
        }).call(t, n(26));
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
        var c = n(18), u = n(44), l = Object.create(null), f = "onloadid" + (new Date() % 9e6).toString(36), d = "data-" + f, p = 0;
        if (u && u.MutationObserver) {
            new MutationObserver(function(e) {
                if (!(Object.keys(l).length < 1)) for (var t = 0; t < e.length; t++) e[t].attributeName !== d ? (s(e[t].removedNodes, i), 
                s(e[t].addedNodes, r)) : o(e[t], r, i);
            }).observe(c.body, {
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
        var i = n(2), o = n(3), a = n(14), s = n(6), c = n(8), u = n(10);
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
            if ("updateGraphSize" === n && (r.width && r.width !== e.width || r.height && r.height !== e.height)) return e.width = r.width, 
            e.height = r.height, e;
        }).react([ o.mouse.HOT ], function(e, t) {
            var n = t.dragDelta;
            if (t.pressed[0] && "svg" === t.pressed[0].target.tagName.toLowerCase() && (n.x || n.y)) return e.offsetX += n.x, 
            e.offsetY += n.y, e;
        }).accept(a.a), d = n.i(i.val)({}).react([ s.graph.HOT, u.graphWindow.COLD ], function(e, t, n) {
            for (var r in t.entities) e[r] || (e[r] = {
                x: Math.random() * n.width,
                y: Math.random() * n.height
            });
        }).react([ u.activeEntity.COLD, o.mouse.HOT, f.COLD ], function(e, t, n, r) {
            var i = t.id, o = n.dragDelta, a = n.pressed[0] && n.pressed[0].target, s = a && (a.dataset.key || a.parentElement && a.parentElement.dataset.key);
            if (s && i === s && e[i] && (o.x || o.y)) return e[i].x -= o.x * r.scale, e[i].y -= o.y * r.scale, 
            e;
        }).accept(a.a), p = n.i(i.stream)([ s.graph.HOT, u.activeNode.HOT ], function(e, t) {
            var n = {}, i = {}, o = 0;
            for (var a in e.entities) {
                var s = e.entities[a], c = r(a), u = c.label, f = c.group;
                i[f] = i[f] || o++ % 7 + 1;
                var p = l({
                    id: s.id,
                    class: "group-" + i[f],
                    label: u,
                    active: s.id === t.id
                }, d[a]);
                null != s.accept && (p.accept = !0), null != s.value && (p.initial = !0), n[a] = p;
            }
            return n;
        }).react([ d.HOT ], function(e, t) {
            for (var n in e) e[n].x = t[n].x, e[n].y = t[n].y;
            return e;
        }), h = n.i(i.stream)([ s.graph.HOT, u.activeNode.HOT ], function(e, t) {
            var n = {};
            for (var i in e.processes) {
                var o = e.processes[i], a = l({
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
        }), v = n.i(i.stream)([ p.HOT, h.HOT ], function(e, t) {
            var n = [], r = [];
            for (var i in t) {
                var o = t[i], a = e[o.to];
                if (o.class = a.class, o.from.length) {
                    o.x = 0, o.y = 0;
                    for (var s = 0; s < o.from.length; s++) {
                        var u = e[o.from[s][0]], l = o.from[s][1], f = u.x - a.x, d = u.y - a.y;
                        l === c.PORT_TYPES.COLD && (f /= 2, d /= 2), o.x += f, o.y += d;
                    }
                    var p = Math.sqrt(o.x * o.x + o.y * o.y);
                    o.x = 50 * o.x / p + a.x, o.y = 50 * o.y / p + a.y;
                    for (var s = 0; s < o.from.length; s++) {
                        var h = o.from[s], v = h[0], l = h[1], u = e[v];
                        o.fromIsActive = o.fromIsActive || u.active, r.push({
                            from: u,
                            to: o,
                            class: "from" + (l === c.PORT_TYPES.COLD ? " cold" : ""),
                            title: l,
                            active: a.active || o.active || u.active
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
        }, s = [], c = {}, u = 0; u < 256; u++) s[u] = (u + 256).toString(16).substr(1), 
        c[s[u]] = u;
    }, function(e, t, n) {
        "use strict";
        var r = n(69), i = n(70), o = (n.n(i), n(24));
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
        var r = n(17), i = n(49), o = n(74);
        e.exports = r, e.exports.update = function(e, t, n) {
            function r(e, t) {
                for (var r = n.events || o, i = 0; i < r.length; i++) {
                    var a = r[i];
                    t[a] ? e[a] = t[a] : e[a] && (e[a] = void 0);
                }
                var s = e.value, c = t.value;
                "INPUT" === e.nodeName && "file" !== e.type || "SELECT" === e.nodeName ? c ? c !== s && (e.value = c) : t.value = e.value : "TEXTAREA" === e.nodeName && null === t.getAttribute("value") && (e.value = t.value);
            }
            return n || (n = {}), !1 !== n.events && (n.onBeforeElUpdated || (n.onBeforeElUpdated = r)), 
            i(e, t, n);
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            var r = t.getId(), i = "tvsFlowTools" + (e ? "::" + e : "") + "::" + r, o = localStorage.getItem(i);
            if (o) {
                var a = JSON.parse(o);
                a.zIndex && (a.zIndex = 0), n.set(r, v({}, n.get(r), a));
            }
            n.on(t.getId(), function(e) {
                return localStorage.setItem(i, JSON.stringify(e));
            });
        }
        function i(e, t) {
            function i(e) {
                requestAnimationFrame(function() {
                    m.set(f.runtime.getId(), e);
                });
            }
            function p() {
                document.body.removeChild(w), _.destroy();
            }
            var y = v({
                debug: !1,
                graph: null
            }, t), m = o.a.create();
            m.addGraph(n.i(a.getGraphFromModules)(g)), m.flush(), e && m.set(u.title.getId(), e), 
            y.graph && m.set(d.nodeState.getId(), y.graph), r(e, d.viewBox, m), r(e, d.nodeState, m), 
            r(e, u.visibility, m), r(e, u.entitiesWindow, m), r(e, u.graphWindow, m), r(e, u.treeWindow, m), 
            r(e, u.controlsPosition, m);
            var b = n.i(c.flowComponentFactory)(m, l.action.getId(), y.debug), w = n.i(s.a)(b);
            document.body.appendChild(w), m.set(l.element.getId(), w);
            var _ = new h.a(".tvs-save-graph", {
                text: function() {
                    return JSON.stringify(m.get(d.nodeState.getId()), null, "  ");
                }
            });
            return _.on("success", function(e) {
                return console.log("saved graph to clipboard", e);
            }), _.on("error", function(e) {
                return console.log("error while saving graph to clipboard", e);
            }), {
                updateFlow: i,
                dispose: p,
                getState: function() {
                    return m;
                },
                getElement: function() {
                    return w;
                }
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(63), a = n(16), s = n(60), c = n(0), u = n(10), l = n(3), f = n(6), d = n(20), p = n(32), h = n.n(p);
        t.start = i;
        var v = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, g = n(29);
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
            "./state/flow.ts": 6,
            "./state/graph.ts": 20,
            "./state/gui.ts": 10
        };
        r.keys = function() {
            return Object.keys(o);
        }, r.resolve = i, e.exports = r, r.id = 29;
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
        var r, i, o;
        !function(a, s) {
            i = [ e, n(52) ], r = s, void 0 !== (o = "function" == typeof r ? r.apply(t, i) : r) && (e.exports = o);
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
                        this.action = e.action, this.emitter = e.emitter, this.target = e.target, this.text = e.text, 
                        this.trigger = e.trigger, this.selectedText = "";
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
                        }, this.fakeHandler = document.body.addEventListener("click", this.fakeHandlerCallback) || !0, 
                        this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", 
                        this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", 
                        this.fakeElem.style.position = "absolute", this.fakeElem.style[t ? "right" : "left"] = "-9999px";
                        var n = window.pageYOffset || document.documentElement.scrollTop;
                        this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), 
                        this.fakeElem.value = this.text, document.body.appendChild(this.fakeElem), this.selectedText = (0, 
                        r.default)(this.fakeElem), this.copyText();
                    }
                }, {
                    key: "removeFake",
                    value: function() {
                        this.fakeHandler && (document.body.removeEventListener("click", this.fakeHandlerCallback), 
                        this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (document.body.removeChild(this.fakeElem), 
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
                        this.target && this.target.blur(), window.getSelection().removeAllRanges();
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
    }, function(e, t, n) {
        var r, i, o;
        !function(a, s) {
            i = [ e, n(31), n(53), n(46) ], r = s, void 0 !== (o = "function" == typeof r ? r.apply(t, i) : r) && (e.exports = o);
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
            var u = i(t), l = i(n), f = i(r), d = function() {
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
            }(), p = function(e) {
                function t(e, n) {
                    o(this, t);
                    var r = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    return r.resolveOptions(n), r.listenClick(e), r;
                }
                return s(t, e), d(t, [ {
                    key: "resolveOptions",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, 
                        this.text = "function" == typeof e.text ? e.text : this.defaultText;
                    }
                }, {
                    key: "listenClick",
                    value: function(e) {
                        var t = this;
                        this.listener = (0, f.default)(e, "click", function(e) {
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
            e.exports = p;
        });
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
            return new T(x, u(e), w.ensurePercent(t), w.ensurePercent(n), 1, !1);
        }
        function o(e, t, n, r) {
            return new T(x, u(e), w.ensurePercent(t), w.ensurePercent(n), w.ensurePercent(r), !0);
        }
        function a(e, t, n) {
            return new T(k, e, t, n, 1, !1);
        }
        function s(e, t, n, r) {
            return new T(k, e, t, n, w.ensurePercent(r), !0);
        }
        function c(e) {
            var t = Math.round(e);
            return (t < 16 ? "0" : "") + t.toString(16);
        }
        function u(e) {
            return ((e < 0 ? 360 : 0) + e % 360) % 360;
        }
        function l(e, t) {
            return Math.round(Math.pow(10, t) * e) * Math.pow(10, -t);
        }
        function f(e, t, n, r, i) {
            var o, a = e / 255, s = t / 255, c = n / 255, u = Math.min(a, s, c), l = Math.max(a, s, c), f = (u + l) / 2, d = l - u;
            o = l === u ? 0 : a === l ? (s - c) / d : s === l ? 2 + (c - a) / d : c === l ? 4 + (a - s) / d : 0, 
            (o = Math.min(60 * o, 360)) < 0 && (o += 360);
            var p;
            return p = l === u ? 0 : f <= .5 ? d / (l + u) : d / (2 - l - u), new T(x, o, p, f, r, i);
        }
        function d(e, t, n, r, i) {
            var o = e / 360, a = t, s = n;
            if (0 === a) {
                var c = 255 * s;
                return new T(k, c, c, c, r, i);
            }
            for (var u = s < .5 ? s * (1 + a) : s + a - s * a, l = 2 * s - u, f = 0, d = 0, p = 0, h = 0; h < 3; h++) {
                var v = o + 1 / 3 * -(h - 1);
                v < 0 && v++, v > 1 && v--;
                var c = void 0;
                c = 6 * v < 1 ? l + 6 * (u - l) * v : 2 * v < 1 ? u : 3 * v < 2 ? l + (u - l) * (2 / 3 - v) * 6 : l, 
                c *= 255, 0 === h ? f = c : 1 === h ? d = c : p = c;
            }
            return new T(k, f, d, p, r, i);
        }
        function p(e, t, n, r, i, o, a) {
            return e === t ? new T(e, n, r, i, o, a) : S[e - t](n, r, i, o, a);
        }
        function h(e, t, n, r) {
            if (!_) return [ e || 0, t || 0, n || 0, r || 0 ];
            var i = new Float32Array(4);
            return i[0] = e || 0, i[1] = t || 0, i[2] = n || 0, i[3] = r || 0, i;
        }
        function v(e, t, n) {
            var r = O[e][t];
            return n < 0 ? 0 : n > r ? r : n;
        }
        function g(e) {
            return e instanceof T ? e : r(e);
        }
        function y(e) {
            return E[e] || void 0;
        }
        function m(e) {
            var t = e.match(/#(([a-f0-9]{6})|([a-f0-9]{3}))$/i);
            if (t) {
                var n = t[1], r = parseInt(3 === n.length ? n[0] + n[0] + n[1] + n[1] + n[2] + n[2] : n, 16);
                return new T(k, r >> 16 & 255, r >> 8 & 255, 255 & r, 1, !1);
            }
        }
        function b(e) {
            var t = w.parseCSSFunction(e);
            if (t && (4 === t.length || 5 === t.length)) {
                var n, r = t[0], i = "rgba" === r, o = "hsla" === r, a = "rgb" === r, s = "hsl" === r, c = o || i;
                if (a || i) n = k; else {
                    if (!s && !o) throw new Error("unsupported color string");
                    n = x;
                }
                var u = parseFloat(t[1]), l = a || i ? parseFloat(t[2]) : w.ensurePercent(t[2]), f = a || i ? parseFloat(t[3]) : w.ensurePercent(t[3]), d = c ? parseFloat(t[4]) : 1;
                return new T(n, u, l, f, d, c);
            }
        }
        var w = n(9), _ = "undefined" != typeof Float32Array, k = 0, x = 1, S = (C = {}, 
        C[k - x] = f, C[x - k] = d, C), O = (A = {}, A[k] = h(255, 255, 255, 1), A[x] = h(360, 1, 1, 1), 
        A);
        t.color = r, t.hsl = i, t.hsla = o, t.rgb = a, t.rgba = s;
        var T = function() {
            function e(e, t, n, r, i, o) {
                this._format = e, this._hasAlpha = o, this._values = h(v(e, 0, t), v(e, 1, n), v(e, 2, r), v(e, 3, i));
            }
            return e.convertHelper = function(e, t) {
                var n = t._format, r = t._values, i = t._hasAlpha;
                return n === e ? t : S[n - e](r[0], r[1], r[2], r[3], i);
            }, e.prototype.toString = function() {
                var e, t, n = this._format, r = this._values, i = this._hasAlpha;
                if (n === k) e = i ? "rgba" : "rgb", t = [ Math.round(r[0]), Math.round(r[1]), Math.round(r[2]) ]; else {
                    if (n !== x) throw new Error("Invalid color format");
                    e = i ? "hsla" : "hsl", t = [ Math.round(r[0]), w.formatPercent(l(r[1], 2)), w.formatPercent(l(r[2], 2)) ];
                }
                return i && t.push(l(r[3], 5)), w.cssFunction(e, t);
            }, e.prototype.toHexString = function() {
                var t = e.convertHelper(k, this)._values;
                return "#" + (c(t[0]) + c(t[1]) + c(t[2])).toUpperCase();
            }, e.prototype.toHSL = function() {
                var e = this._values;
                return p(this._format, x, e[0], e[1], e[2], 1, !1);
            }, e.prototype.toHSLA = function() {
                var e = this._values;
                return p(this._format, x, e[0], e[1], e[2], e[3], !0);
            }, e.prototype.toRGB = function() {
                var e = this._values;
                return p(this._format, k, e[0], e[1], e[2], 1, !1);
            }, e.prototype.toRGBA = function() {
                var e = this._values;
                return p(this._format, k, e[0], e[1], e[2], e[3], !0);
            }, e.prototype.red = function() {
                return (this._format === k ? this : this.toRGB())._values[0];
            }, e.prototype.green = function() {
                return (this._format === k ? this : this.toRGB())._values[1];
            }, e.prototype.blue = function() {
                return (this._format === k ? this : this.toRGB())._values[2];
            }, e.prototype.hue = function() {
                return (this._format === x ? this : this.toHSL())._values[0];
            }, e.prototype.saturation = function() {
                return (this._format === x ? this : this.toHSL())._values[1];
            }, e.prototype.lightness = function() {
                return (this._format === x ? this : this.toHSL())._values[2];
            }, e.prototype.alpha = function() {
                return this._values[3];
            }, e.prototype.opacity = function() {
                return this.alpha();
            }, e.prototype.invert = function() {
                var t = e.convertHelper(k, this)._values;
                return e.convertHelper(this._format, new e(k, 255 - t[0], 255 - t[1], 255 - t[2], this._values[3], this._hasAlpha));
            }, e.prototype.lighten = function(t, n) {
                var r = e.convertHelper(x, this)._values, i = O[x][2], o = r[2] + (n ? i - r[2] : i) * w.ensurePercent(t);
                return e.convertHelper(this._format, new e(x, r[0], r[1], o, this._values[3], this._hasAlpha));
            }, e.prototype.darken = function(t, n) {
                var r = e.convertHelper(x, this)._values, i = r[2] - (n ? r[2] : O[x][2]) * w.ensurePercent(t);
                return e.convertHelper(this._format, new e(x, r[0], r[1], i, this._values[3], this._hasAlpha));
            }, e.prototype.saturate = function(t, n) {
                var r = e.convertHelper(x, this)._values, i = O[x][1], o = r[1] + (n ? i - r[1] : i) * w.ensurePercent(t);
                return e.convertHelper(this._format, new e(x, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.desaturate = function(t, n) {
                var r = e.convertHelper(x, this)._values, i = O[x][1], o = r[1] - (n ? r[1] : i) * w.ensurePercent(t);
                return e.convertHelper(this._format, new e(x, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.grayscale = function() {
                return this.desaturate(1);
            }, e.prototype.fade = function(t) {
                var n = this._values, r = v(k, 3, w.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, n[0], n[1], n[2], r, !0));
            }, e.prototype.fadeOut = function(t, n) {
                var r = this._values, i = v(k, 3, r[3] - (n ? r[3] : 1) * w.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, r[0], r[1], r[2], i, !0));
            }, e.prototype.fadeIn = function(t, n) {
                var r = this._values, i = v(k, 3, r[3] + (n ? r[3] : 1) * w.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, r[0], r[1], r[2], i, !0));
            }, e.prototype.mix = function(t, n) {
                var r = this, i = g(t), o = e.convertHelper(k, r)._values, a = e.convertHelper(k, i)._values, s = void 0 === n ? .5 : n, c = 2 * s - 1, u = Math.abs(o[3] - a[3]), l = ((c * u == -1 ? c : (c + u) / (1 + c * u)) + 1) / 2, f = 1 - l, d = new e(k, Math.round(o[0] * l + a[0] * f), Math.round(o[1] * l + a[1] * f), Math.round(o[2] * l + a[2] * f), o[3] * s + a[3] * (1 - s), r._hasAlpha || i._hasAlpha);
                return e.convertHelper(this._format, d);
            }, e.prototype.tint = function(e) {
                return t.white.mix(this, e);
            }, e.prototype.shade = function(e) {
                return t.black.mix(this, e);
            }, e.prototype.spin = function(t) {
                var n = e.convertHelper(x, this)._values;
                return e.convertHelper(this._format, new e(x, u(n[0] + t), n[1], n[2], this._values[3], this._hasAlpha));
            }, e;
        }();
        t.ColorHelper = T;
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
        var C, A;
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
        var a = n(9);
        t.linearGradient = r, t.repeatingLinearGradient = i;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
        }
        r(n(34)), r(n(35)), r(n(37)), r(n(38)), r(n(39)), r(n(40)), r(n(33));
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
            return O.cssFunction("matrix", [ e, t, n, r, i, o ]);
        }
        function o(e, t, n, r, i, o, a, s, c, u, l, f, d, p, h, v) {
            return O.cssFunction("matrix3d", [ e, t, n, r, i, o, a, s, c, u, l, f, d, p, h, v ]);
        }
        function a(e) {
            return O.cssFunction("perspective", [ e ]);
        }
        function s(e) {
            return O.cssFunction("rotate", [ e ]);
        }
        function c(e, t, n) {
            return O.cssFunction("rotate3d", [ e, t, n ]);
        }
        function u(e) {
            return O.cssFunction("rotateX", [ e ]);
        }
        function l(e) {
            return O.cssFunction("rotateY", [ e ]);
        }
        function f(e) {
            return O.cssFunction("rotateZ", [ e ]);
        }
        function d(e, t) {
            return O.cssFunction("scale", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function p(e, t, n) {
            return O.cssFunction("scale3d", [ e, t, n ]);
        }
        function h(e) {
            return O.cssFunction("scaleX", [ e ]);
        }
        function v(e) {
            return O.cssFunction("scaleY", [ e ]);
        }
        function g(e) {
            return O.cssFunction("scaleZ", [ e ]);
        }
        function y(e, t) {
            return O.cssFunction("skew", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function m(e) {
            return O.cssFunction("skewX", [ e ]);
        }
        function b(e) {
            return O.cssFunction("skewY", [ e ]);
        }
        function w(e, t) {
            return O.cssFunction("translate", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function _(e, t, n) {
            return O.cssFunction("translate3d", [ e, t, n ]);
        }
        function k(e) {
            return O.cssFunction("translateX", [ e ]);
        }
        function x(e) {
            return O.cssFunction("translateY", [ e ]);
        }
        function S(e) {
            return O.cssFunction("translateZ", [ e ]);
        }
        var O = n(9);
        t.transform = r, t.matrix = i, t.matrix3d = o, t.perspective = a, t.rotate = s, 
        t.rotate3d = c, t.rotateX = u, t.rotateY = l, t.rotateZ = f, t.scale = d, t.scale3d = p, 
        t.scaleX = h, t.scaleY = v, t.scaleZ = g, t.skew = y, t.skewX = m, t.skewY = b, 
        t.translate = w, t.translate3d = _, t.translateX = k, t.translateY = x, t.translateZ = S;
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
        function c(e) {
            return e + "vh";
        }
        function u(e) {
            return e + "vw";
        }
        function l(e) {
            return e + "turn";
        }
        t.percent = r, t.px = i, t.em = o, t.rad = a, t.rem = s, t.viewHeight = c, t.viewWidth = u, 
        t.turn = l;
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
        var o = n(41);
        e.exports = r;
    }, function(e, t, n) {
        function r(e, t, n) {
            var r = u[t];
            if (void 0 === r && (r = o(t)), r) {
                if (void 0 === n) return e.style[r];
                e.style[r] = l(r, n);
            }
        }
        function i(e, t) {
            for (var n in t) t.hasOwnProperty(n) && r(e, n, t[n]);
        }
        function o(e) {
            var t = c(e), n = s(t);
            return u[t] = u[e] = u[n] = n, n;
        }
        function a() {
            2 === arguments.length ? "string" == typeof arguments[1] ? arguments[0].style.cssText = arguments[1] : i(arguments[0], arguments[1]) : r(arguments[0], arguments[1], arguments[2]);
        }
        var s = n(50), c = n(54), u = {
            float: "cssFloat"
        }, l = n(30);
        e.exports = a, e.exports.set = a, e.exports.get = function(e, t) {
            return Array.isArray(t) ? t.reduce(function(t, n) {
                return t[n] = r(e, n || ""), t;
            }, {}) : r(e, t || "");
        };
    }, function(e, t, n) {
        (function(t) {
            "undefined" != typeof window ? e.exports = window : void 0 !== t ? e.exports = t : "undefined" != typeof self ? e.exports = self : e.exports = {};
        }).call(t, n(26));
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
        var s = n(45), c = n(42);
        e.exports = r;
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
        var o = n(47), a = 1, s = 2, c = 3, u = 4, l = 5, f = 6, d = 7, p = 8, h = 9, v = 10, g = 11, y = 12, m = 13;
        e.exports = function(e, t) {
            function n(e) {
                return "function" == typeof e ? e : "string" == typeof e ? e : e && "object" == typeof e ? e : b("", e);
            }
            t || (t = {});
            var b = t.concat || function(e, t) {
                return String(e) + String(t);
            };
            return !1 !== t.attrToProp && (e = o(e)), function(o) {
                function w(e) {
                    var n = [];
                    _ === d && (_ = u);
                    for (var i = 0; i < e.length; i++) {
                        var o = e.charAt(i);
                        _ === a && "<" === o ? (k.length && n.push([ a, k ]), k = "", _ = s) : ">" !== o || r(_) || _ === m ? _ === m && /-$/.test(k) && "-" === o ? (t.comments && n.push([ p, k.substr(0, k.length - 1) ], [ c ]), 
                        k = "", _ = a) : _ === s && /^!--$/.test(k) ? (t.comments && n.push([ s, k ], [ l, "comment" ], [ g ]), 
                        k = o, _ = m) : _ === a || _ === m ? k += o : _ === s && /\s/.test(o) ? (n.push([ s, k ]), 
                        k = "", _ = u) : _ === s ? k += o : _ === u && /[^\s"'=\/]/.test(o) ? (_ = l, k = o) : _ === u && /\s/.test(o) ? (k.length && n.push([ l, k ]), 
                        n.push([ y ])) : _ === l && /\s/.test(o) ? (n.push([ l, k ]), k = "", _ = f) : _ === l && "=" === o ? (n.push([ l, k ], [ g ]), 
                        k = "", _ = d) : _ === l ? k += o : _ !== f && _ !== u || "=" !== o ? _ !== f && _ !== u || /\s/.test(o) ? _ === d && '"' === o ? _ = v : _ === d && "'" === o ? _ = h : _ === v && '"' === o ? (n.push([ p, k ], [ y ]), 
                        k = "", _ = u) : _ === h && "'" === o ? (n.push([ p, k ], [ y ]), k = "", _ = u) : _ !== d || /\s/.test(o) ? _ === p && /\s/.test(o) ? (n.push([ p, k ], [ y ]), 
                        k = "", _ = u) : _ !== p && _ !== h && _ !== v || (k += o) : (_ = p, i--) : (n.push([ y ]), 
                        /[\w-]/.test(o) ? (k += o, _ = l) : _ = u) : (n.push([ g ]), _ = d) : (_ === s ? n.push([ s, k ]) : _ === l ? n.push([ l, k ]) : _ === p && k.length && n.push([ p, k ]), 
                        n.push([ c ]), k = "", _ = a);
                    }
                    return _ === a && k.length ? (n.push([ a, k ]), k = "") : _ === p && k.length ? (n.push([ p, k ]), 
                    k = "") : _ === v && k.length ? (n.push([ p, k ]), k = "") : _ === h && k.length ? (n.push([ p, k ]), 
                    k = "") : _ === l && (n.push([ l, k ]), k = ""), n;
                }
                for (var _ = a, k = "", x = arguments.length, S = [], O = 0; O < o.length; O++) if (O < x - 1) {
                    var T = arguments[O + 1], E = w(o[O]), C = _;
                    C === v && (C = p), C === h && (C = p), C === d && (C = p), C === u && (C = l), 
                    E.push([ 0, C, T ]), S.push.apply(S, E);
                } else S.push.apply(S, w(o[O]));
                for (var A = [ null, {}, [] ], P = [ [ A, -1 ] ], O = 0; O < S.length; O++) {
                    var M = P[P.length - 1][0], E = S[O], H = E[0];
                    if (H === s && /^\//.test(E[1])) {
                        var j = P[P.length - 1][1];
                        P.length > 1 && (P.pop(), P[P.length - 1][0][2][j] = e(M[0], M[1], M[2].length ? M[2] : void 0));
                    } else if (H === s) {
                        var L = [ E[1], {}, [] ];
                        M[2].push(L), P.push([ L, M[2].length - 1 ]);
                    } else if (H === l || 0 === H && E[1] === l) {
                        for (var z, R = ""; O < S.length; O++) if (S[O][0] === l) R = b(R, S[O][1]); else {
                            if (0 !== S[O][0] || S[O][1] !== l) break;
                            if ("object" != typeof S[O][2] || R) R = b(R, S[O][2]); else for (z in S[O][2]) S[O][2].hasOwnProperty(z) && !M[1][z] && (M[1][z] = S[O][2][z]);
                        }
                        S[O][0] === g && O++;
                        for (var N = O; O < S.length; O++) if (S[O][0] === p || S[O][0] === l) M[1][R] ? M[1][R] = b(M[1][R], S[O][1]) : M[1][R] = n(S[O][1]); else {
                            if (0 !== S[O][0] || S[O][1] !== p && S[O][1] !== l) {
                                !R.length || M[1][R] || O !== N || S[O][0] !== c && S[O][0] !== y || (M[1][R] = R.toLowerCase());
                                break;
                            }
                            M[1][R] ? M[1][R] = b(M[1][R], S[O][2]) : M[1][R] = n(S[O][2]);
                        }
                    } else if (H === l) M[1][E[1]] = !0; else if (0 === H && E[1] === l) M[1][E[2]] = !0; else if (H === c) {
                        if (i(M[0]) && P.length) {
                            var j = P[P.length - 1][1];
                            P.pop(), P[P.length - 1][0][2][j] = e(M[0], M[1], M[2].length ? M[2] : void 0);
                        }
                    } else if (0 === H && E[1] === a) void 0 === E[2] || null === E[2] ? E[2] = "" : E[2] || (E[2] = b("", E[2])), 
                    Array.isArray(E[2][0]) ? M[2].push.apply(M[2], E[2]) : M[2].push(E[2]); else if (H === a) M[2].push(E[1]); else if (H !== g && H !== y) throw new Error("unhandled: " + H);
                }
                if (A[2].length > 1 && /^\s*$/.test(A[2][0]) && A[2].shift(), A[2].length > 2 || 2 === A[2].length && /\S/.test(A[2][1])) throw new Error("multiple root elements must be wrapped in an enclosing tag");
                return Array.isArray(A[2][0]) && "string" == typeof A[2][0][0] && Array.isArray(A[2][0][2]) && (A[2][0] = e(A[2][0][0], A[2][0][1], A[2][0][2])), 
                A[2][0];
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
            for (s = e.attributes, n = s.length - 1; n >= 0; --n) r = s[n], !1 !== r.specified && (i = r.name, 
            o = r.namespaceURI, o ? (i = r.localName || i, g(t, o, i) || e.removeAttributeNS(o, i)) : g(t, null, i) || e.removeAttribute(i));
        }
        function c(e, t, n) {
            e[n] !== t[n] && (e[n] = t[n], e[n] ? e.setAttribute(n, "") : e.removeAttribute(n, ""));
        }
        function u() {}
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
                c(e, t, "selected");
            },
            INPUT: function(e, t) {
                c(e, t, "checked"), c(e, t, "disabled"), e.value !== t.value && (e.value = t.value), 
                g(t, null, "value") || e.removeAttribute("value");
            },
            TEXTAREA: function(e, t) {
                var n = t.value;
                e.value !== n && (e.value = n);
                var r = e.firstChild;
                if (r) {
                    var i = r.nodeValue;
                    if (i == n || !n && i == e.placeholder) return;
                    r.nodeValue = n;
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
                function c(e) {
                    k ? k.push(e) : k = [ e ];
                }
                function f(e, t) {
                    if (e.nodeType === m) for (var n = e.firstChild; n; ) {
                        var r = void 0;
                        t && (r = x(n)) ? c(r) : (A(n), n.firstChild && f(n, t)), n = n.nextSibling;
                    }
                }
                function d(e, t, n) {
                    !1 !== C(e) && (t && t.removeChild(e), A(e), f(e, n));
                }
                function p(e) {
                    if (e.nodeType === m) for (var t = e.firstChild; t; ) {
                        var n = x(t);
                        n && (H[n] = t), p(t), t = t.nextSibling;
                    }
                }
                function v(e) {
                    O(e);
                    for (var t = e.firstChild; t; ) {
                        var n = t.nextSibling, r = x(t);
                        if (r) {
                            var o = H[r];
                            o && i(t, o) && (t.parentNode.replaceChild(o, t), g(o, t));
                        }
                        v(t), t = n;
                    }
                }
                function g(r, o, a) {
                    var s, u = x(o);
                    if (u && delete H[u], !n.isSameNode || !n.isSameNode(t)) {
                        if (!a) {
                            if (!1 === T(r, o)) return;
                            if (e(r, o), E(r), !1 === P(r, o)) return;
                        }
                        if ("TEXTAREA" !== r.nodeName) {
                            var l, f, p, _, k = o.firstChild, O = r.firstChild;
                            e: for (;k; ) {
                                for (p = k.nextSibling, l = x(k); O; ) {
                                    if (f = O.nextSibling, k.isSameNode && k.isSameNode(O)) {
                                        k = p, O = f;
                                        continue e;
                                    }
                                    s = x(O);
                                    var C = O.nodeType, A = void 0;
                                    if (C === k.nodeType && (C === m ? (l ? l !== s && ((_ = H[l]) ? O.nextSibling === _ ? A = !1 : (r.insertBefore(_, O), 
                                    f = O.nextSibling, s ? c(s) : d(O, r, !0), O = _) : A = !1) : s && (A = !1), (A = !1 !== A && i(O, k)) && g(O, k)) : C !== b && C != w || (A = !0, 
                                    O.nodeValue = k.nodeValue)), A) {
                                        k = p, O = f;
                                        continue e;
                                    }
                                    s ? c(s) : d(O, r, !0), O = f;
                                }
                                if (l && (_ = H[l]) && i(_, k)) r.appendChild(_), g(_, k); else {
                                    var M = S(k);
                                    !1 !== M && (M && (k = M), k.actualize && (k = k.actualize(r.ownerDocument || h)), 
                                    r.appendChild(k), v(k));
                                }
                                k = p, O = f;
                            }
                            for (;O; ) f = O.nextSibling, (s = x(O)) ? c(s) : d(O, r, !0), O = f;
                        }
                        var j = y[r.nodeName];
                        j && j(r, o);
                    }
                }
                if (s || (s = {}), "string" == typeof n) if ("#document" === t.nodeName || "HTML" === t.nodeName) {
                    var _ = n;
                    n = h.createElement("html"), n.innerHTML = _;
                } else n = r(n);
                var k, x = s.getNodeKey || l, S = s.onBeforeNodeAdded || u, O = s.onNodeAdded || u, T = s.onBeforeElUpdated || u, E = s.onElUpdated || u, C = s.onBeforeNodeDiscarded || u, A = s.onNodeDiscarded || u, P = s.onBeforeElChildrenUpdated || u, M = !0 === s.childrenOnly, H = {};
                p(t);
                var j = t, L = j.nodeType, z = n.nodeType;
                if (!M) if (L === m) z === m ? i(t, n) || (A(t), j = a(t, o(n.nodeName, n.namespaceURI))) : j = n; else if (L === b || L === w) {
                    if (z === L) return j.nodeValue = n.nodeValue, j;
                    j = n;
                }
                if (j === n) A(t); else if (g(j, n, M), k) for (var R = 0, N = k.length; R < N; R++) {
                    var F = H[k[R]];
                    F && d(F, F.parentNode, !1);
                }
                return !M && j !== t && t.parentNode && (j.actualize && (j = j.actualize(t.ownerDocument || h)), 
                t.parentNode.replaceChild(j, t)), j;
            };
        }(s);
        e.exports = _;
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
        function c(e, t) {
            this.fun = e, this.array = t;
        }
        function u() {}
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
            h.push(new c(e, t)), 1 !== h.length || v || i(s);
        }, c.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", 
        d.versions = {}, d.on = u, d.addListener = u, d.once = u, d.off = u, d.removeListener = u, 
        d.removeAllListeners = u, d.emit = u, d.binding = function(e) {
            throw new Error("process.binding is not supported");
        }, d.cwd = function() {
            return "/";
        }, d.chdir = function(e) {
            throw new Error("process.chdir is not supported");
        }, d.umask = function() {
            return 0;
        };
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
        function r(e) {
            return i(e).replace(/\s(\w)/g, function(e, t) {
                return t.toUpperCase();
            });
        }
        var i = n(56);
        e.exports = r;
    }, function(e, t) {
        function n(e) {
            return o.test(e) ? e.toLowerCase() : a.test(e) ? (r(e) || e).toLowerCase() : s.test(e) ? i(e).toLowerCase() : e.toLowerCase();
        }
        function r(e) {
            return e.replace(c, function(e, t) {
                return t ? " " + t : "";
            });
        }
        function i(e) {
            return e.replace(u, function(e, t, n) {
                return t + " " + n.toLowerCase().split("").join(" ");
            });
        }
        e.exports = n;
        var o = /\s/, a = /(_|-|\.|:)/, s = /([a-z][A-Z]|[A-Z][a-z])/, c = /[\W_]+(.|$)/g, u = /(.)([A-Z]+)/g;
    }, function(e, t, n) {
        function r(e) {
            return i(e).replace(/[\W_]+(.|$)/g, function(e, t) {
                return t ? " " + t : "";
            }).trim();
        }
        var i = n(55);
        e.exports = r;
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(28), i = n(15), o = n(16), a = n(0);
        n.d(t, "ui", function() {
            return s;
        }), n.d(t, "utils", function() {
            return c;
        }), t.default = r;
        var s = r, c = {
            entityTree: i,
            webpack: o,
            yoyo: a
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            var r = e.value, i = e.watching, o = "";
            if (r) try {
                o = JSON.stringify(r, null, "  ");
            } catch (e) {
                o = "Error: " + e.message;
            }
            return n.i(a.h)([ "code", [ "pre", {
                contenteditable: !i,
                oninput: function(e) {
                    return t("updateEditedValue", e.target.textContent);
                }
            }, o ] ]);
        }
        function i(e, t, i) {
            var o = e.entity, f = e.watching, d = [ "div", {
                style: "margin-top: 4px"
            } ];
            return f ? (d.push([ "button", {
                class: u.b,
                onclick: function() {
                    return t("setEntityEditMode", !0);
                }
            }, "Edit" ], n.i(c.a)({
                key: "inspect-btn" + o.id,
                onclick: function() {
                    return t("flowEntityInspect", o.id);
                },
                icon: s.f(),
                title: "Inspect entity value"
            })), o.value && d.push(n.i(c.a)({
                key: "reset-btn" + o.id,
                onclick: function() {
                    return t("flowEntityReset", o.id);
                },
                icon: s.g(),
                title: "Reset entity value"
            }))) : d.push([ "button", {
                class: u.b,
                "data-key": "cancel-btn",
                onclick: function() {
                    return t("setEntityEditMode", !1);
                }
            }, "Cancel" ], [ "button", {
                class: u.b,
                "data-key": "save-btn" + o.id,
                onclick: function() {
                    return t("saveCurrentEntityValue", o.id);
                }
            }, "Save" ]), n.i(a.h)([ "section", {
                "data-key": "entity-view",
                class: l.d
            }, [ "div", {
                class: l.c
            }, i(r, "state.gui.entityValueView") ], d ]);
        }
        function o(e, t) {
            var r = [ "div", {
                "data-key": "process-buttons",
                style: "margin-top: 4px"
            } ];
            return r.push(n.i(c.a)({
                onclick: function() {
                    return t("flowProcessRun", e.id);
                },
                icon: s.h(),
                title: "Run process"
            })), e.async && r.push(n.i(c.a)({
                onclick: function() {
                    return t("flowProcessStop", e.id);
                },
                icon: s.i(),
                title: "Stop async process"
            })), n.i(a.h)([ "section", {
                "data-key": "process-view",
                class: l.d
            }, [ "div", {
                class: l.c
            }, [ "code", [ "pre", e.procedure.toString() ] ] ], r ]);
        }
        var a = n(0), s = n(11), c = n(13), u = n(7), l = n(12);
        t.b = i, t.a = o;
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
            var r = e.entities, i = e.processes, c = e.edges, u = e.viewBox, l = void 0 === u ? {} : u;
            return n.i(a.h)([ "section", {
                class: o.a
            }, [ "svg", {
                width: "100%",
                height: "100%",
                viewBox: l.x + ", " + l.y + ", " + l.width + ", " + l.height
            } ].concat(c.map(function(e) {
                return [ "line", {
                    x1: e.from.x,
                    y1: e.from.y,
                    x2: e.to.x,
                    y2: e.to.y,
                    class: n.i(s.classes)(e.class, e.active && "active")
                } ];
            }), i.map(function(e) {
                return [ "circle", {
                    "data-key": e.id,
                    class: n.i(s.classes)(e.class, e.active && "active"),
                    transform: "translate(" + e.x + ", " + e.y + ")",
                    onmousedown: function() {
                        return t("state.gui.openProcess", e.id);
                    },
                    cx: 0,
                    cy: 0,
                    r: e.autostart ? 13 : 8,
                    title: e.id
                } ];
            }), r.map(function(e) {
                return [ "g", {
                    "data-key": e.id,
                    transform: "translate(" + e.x + ", " + e.y + ")",
                    onmousedown: function() {
                        return t("state.gui.openEntity", e.id);
                    },
                    title: e.id,
                    class: n.i(s.classes)(e.class, e.active && "active")
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
        var o = n(61), a = n(0), s = n(1);
        n.n(s);
        t.b = r, t.a = i;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return n.i(p.h)([ "h1", e ]);
        }
        function i(e, t) {
            return function() {
                return t("state.gui.setActiveWindow", e);
            };
        }
        function o(e, t, o, a) {
            var s = e.visibility, c = e.position, u = function(e) {
                return function() {
                    return t("state.gui.updateVisibility", e);
                };
            }, l = n.i(p.h)([ "header", {
                class: n.i(f.b)("tvs-flow-controls", y.a),
                onmousedown: i("controls", t)
            }, o(r, "state.gui.title"), [ "nav", {
                class: "tvs-controls-btns"
            }, [ "ul", [ "li", n.i(g.a)({
                class: s.tree && x,
                onclick: u("tree"),
                icon: h.a(),
                title: "toggle entity tree"
            }) ], [ "li", n.i(g.a)({
                class: s.graph && x,
                onclick: u("graph"),
                icon: h.b(),
                title: "toggle flow graph"
            }) ], [ "li", n.i(g.a)({
                class: s.entities && x,
                onclick: u("entities"),
                icon: h.c(),
                title: "toggle entity details"
            }) ] ] ] ]);
            return d(a || l, c), l;
        }
        function a(e, t, r, o) {
            var a = e.dimensions, s = e.window, c = n.i(p.h)([ "article", {
                "data-key": "tree",
                class: n.i(f.b)("tvs-flow-tree", y.b),
                onmousedown: i("tree", t)
            }, [ "header", h.a("tree" === s ? "selected" : ""), " Tree ", [ "span", {
                class: "gap"
            } ], " ", n.i(g.a)({
                icon: h.d(),
                class: _.a,
                title: "close window",
                onclick: function() {
                    return t("closeWindow", "tree");
                }
            }) ], [ "section", {
                class: y.c
            }, r(w.a, "state.gui.treeData") ], [ "footer", {
                class: "resize",
                "data-key": "resize"
            } ] ]);
            return d(o || c, a), c;
        }
        function s(e, t, r, o) {
            var a = e.dimensions, s = e.window, c = r(m.a, "state.graph.viewData"), u = n.i(p.h)([ "article", {
                "data-key": "graph",
                class: n.i(f.b)("tvs-flow-graph", y.b),
                onmousedown: i("graph", t)
            }, [ "header", h.b("graph" === s ? "selected" : ""), " Graph ", [ "span", {
                class: "gap"
            } ], r(m.b, "state.graph.viewBox"), " ", n.i(g.a)({
                icon: h.e(),
                class: n.i(f.b)(_.a, "tvs-save-graph"),
                title: "copy the current graph state to clipboard"
            }), n.i(g.a)({
                icon: h.d(),
                class: _.a,
                title: "close window",
                onclick: function() {
                    return t("closeWindow", "graph");
                }
            }) ], c, [ "footer", {
                "data-key": "resize",
                class: "resize"
            } ] ]);
            return d(o || u, k({}, a)), requestAnimationFrame(function() {
                t("updateGraphSize", {
                    width: c.clientWidth,
                    height: c.clientHeight
                });
            }), u;
        }
        function c(e, t, r, o) {
            var a = e.dimensions, s = e.node, c = e.window, u = s && s.procedure ? n.i(b.a)(s, t) : r(b.b, "state.gui.entityViewProps"), l = n.i(p.h)([ "article", {
                "data-key": "entities",
                class: n.i(f.b)("tvs-flow-entities", y.b),
                onmousedown: i("entities", t)
            }, [ "header", h.c("entities" === c ? "selected" : ""), " ", s && s.id, " ", [ "span", {
                class: "gap"
            }, " " ], " ", n.i(g.a)({
                icon: h.d(),
                class: _.a,
                title: "close window",
                onclick: function() {
                    return t("closeWindow", "entities");
                }
            }) ], u, [ "footer", {
                class: "resize",
                "data-key": "resize"
            } ] ]);
            return d(o || l, k({}, a)), l;
        }
        function u(e, t, r) {
            var i = e.tree ? r(a, "state.gui.treeWindowProps") : "", u = e.graph ? r(s, "state.gui.graphWindowProps") : "", l = e.entities ? r(c, "state.gui.entitiesWindowProps") : "";
            return n.i(p.h)([ "article", {
                class: n.i(f.b)("tvs-flow-tools", v.b)
            }, r(o, "state.gui.controlProps"), u, l, i ]);
        }
        function l(e) {
            return e(u, "state.gui.visibility");
        }
        var f = n(23), d = n(43), p = (n.n(d), n(0)), h = n(11), v = n(4), g = n(13), y = n(12), m = n(59), b = n(58), w = n(62), _ = n(7);
        t.a = l;
        var k = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, x = n.i(f.a)({
            color: v.a
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(1), i = (n.n(r), n(4));
        n.d(t, "a", function() {
            return o;
        });
        var o = n.i(r.style)(i.f, {
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
        function r(e, t, i, o, a) {
            if (t.__entity__) {
                var s = t.__entity__, d = [ "span", {
                    class: "entity-controls"
                }, n.i(u.a)({
                    icon: c.f(),
                    class: l.a,
                    onclick: function() {
                        return o("flowEntityInspect", s.id);
                    },
                    title: "Inspect entity value"
                }) ];
                null != s.value && d.push(n.i(u.a)({
                    class: l.a,
                    onclick: function() {
                        return o("flowEntityReset", s.id);
                    },
                    icon: c.g(),
                    title: "Reset entity value"
                }));
                var p = "entity-item";
                return i === s.id && (p += " selected"), [ "li", [ "div", {
                    "data-key": "li-" + s.id,
                    class: p,
                    onclick: function() {
                        return o("state.gui.openEntity", s.id);
                    }
                }, null != s.value ? c.j() : c.i(), " " + e + " ", d ] ];
            }
            var h = [ "li", [ "div", {
                onclick: function() {
                    return o("state.gui.toggleTreeLevel", t.__path__);
                }
            }, c.k(a[t.__path__] ? "" : f), " " + e ] ];
            if (!a[t.__path__]) {
                var v = [ "ul" ];
                for (var g in t) "__path__" !== g && v.push(r(g, t[g], i, o, a));
                h.push(v);
            }
            return h;
        }
        function i(e, t) {
            var i = e.fold, s = e.tree, c = e.selected, u = [ "ul", {
                "data-key": "treeView",
                class: a.e
            } ];
            if (s) {
                var l = Object.keys(s).map(function(e) {
                    return r(e, s[e], c.id, t, i);
                });
                u.push.apply(u, l);
            }
            return n.i(o.h)(u);
        }
        var o = n(0), a = n(12), s = n(1), c = (n.n(s), n(11)), u = n(13), l = n(7);
        t.a = i;
        var f = n.i(s.style)({
            transform: "rotate(90deg)"
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(64);
        n(2), n(21), n(8);
        t.a = r;
        r.create;
    }, function(e, t, n) {
        "use strict";
        function r() {
            function e() {
                return {
                    entities: A,
                    processes: P,
                    arcs: M,
                    meta: H
                };
            }
            function t() {
                var e = {};
                for (var t in L.es) e[t] = L.es[t].val;
                return e;
            }
            function n() {
                return j;
            }
            function r(e) {
                j = e;
            }
            function a() {
                return H;
            }
            function s(e) {
                null == e || "object" != typeof e || e instanceof Array || (H = Object.assign({}, H, e));
            }
            function c(e) {
                z = e;
            }
            function u(e) {
                return L.es[e] && L.es[e].val;
            }
            function l(e, t) {
                var n = E(e);
                n.accept && !n.accept(t, n.val) || (n.val = t, N[e] = !0, I = !0, k());
            }
            function f(e, t) {
                l(e, t(u(e)));
            }
            function d(e, t) {
                E(e).cb.push(t);
            }
            function p(e, t) {
                var n = E(e);
                n.cb = t ? n.cb.filter(function(e) {
                    return e !== t;
                }) : [];
            }
            function h(e) {
                var t = i.createEntity(e);
                A[t.id] = t;
                var n = E(t.id);
                return null != t.value && null == n.val && (n.val = t.value, N[t.id] = !1, I = !0), 
                n.accept = t.accept, t;
            }
            function v(e) {
                var t = E(e);
                for (var n in t.arcs) b(n);
                delete L.es[e], delete A[e];
            }
            function g(e) {
                var t = i.createProcess(e, j);
                P[t.id] = t;
                var n = C(t.id);
                delete n.acc, n.values = [], n.sources = [], n.async = t.async, Object.keys(n.arcs).forEach(function(e) {
                    var n = M[e].port;
                    null == n || t.ports[n] && t.ports[n] !== i.PORT_TYPES.ACCUMULATOR || b(e);
                });
                for (var r in t.ports) t.ports[r] === i.PORT_TYPES.ACCUMULATOR && (n.acc = r);
                for (var o in n.arcs) w(M[o]);
                return t;
            }
            function y(e) {
                var t = C(e);
                t.stop && (t.stop(), delete t.stop);
                for (var n in t.arcs) b(n);
                delete L.ps[e], delete P[e];
            }
            function m(e) {
                var t = i.createArc(e);
                M[t.id] = t, w(t);
                var n = C(t.process), r = P[t.process];
                return r && !0 === r.autostart && Object.keys(n.arcs).length === Object.keys(r.ports).length + 1 && S(n), 
                t;
            }
            function b(e) {
                var t = M[e];
                if (t) {
                    var n = C(t.process), r = E(t.entity);
                    delete n.arcs[e], delete r.arcs[e], null != t.port ? (delete r.effects[t.process], 
                    delete n.sources[t.port], delete n.values[t.port]) : (n.stop && (n.stop(), delete n.stop), 
                    n.sink = function() {}, delete n.out, delete r.reactions[t.process]);
                }
                delete M[e];
            }
            function w(e) {
                var t = e.process, n = e.entity, r = C(t), o = E(n), a = P[t];
                o.arcs[e.id] = !0, a && (r.arcs[e.id] = !0, null != e.port ? (delete o.effects[t], 
                a.ports && null != a.ports[e.port] && (r.sources[e.port] = o, a.ports[e.port] == i.PORT_TYPES.HOT && (o.effects[t] = r))) : (r.out = o, 
                null != r.acc ? (r.sources[r.acc] = o, o.reactions[t] = r) : delete o.reactions[t], 
                r.sink = function(e) {
                    o.accept && !o.accept(e, o.val) || (o.val = e, null != e && (N[o.id] = !0, I = !0), 
                    F || k());
                }));
            }
            function _(e) {
                if (e.entities) for (var t in e.entities) h(e.entities[t]);
                if (e.processes) for (var t in e.processes) g(e.processes[t]);
                if (e.arcs) for (var t in e.arcs) m(e.arcs[t]);
                e.meta && s(e.meta);
            }
            function k() {
                z && console.log("flushing graph recursively with", N);
                var e = Object.keys(N);
                if (I) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (N[n]) {
                            var r = L.es[n];
                            for (var i in r.reactions) x(r.reactions[i]);
                        }
                    }
                    var o = {};
                    N = {}, I = !1, F = !0;
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t], r = L.es[n];
                        r.cb.length > 0 && (R[n] = r);
                        for (var i in r.effects) o[i] || (x(r.effects[i]), o[i] = !0);
                    }
                    if (F = !1, I) k(); else {
                        var a = Object.keys(R);
                        R = {};
                        for (var t in a) for (var r = L.es[a[t]], s = 0; s < r.cb.length; s++) r.cb[s](r.val);
                        z && console.log("flush finished");
                    }
                }
            }
            function x(e) {
                for (var t = !0, n = 0; n < e.sources.length; n++) {
                    var r = e.sources[n];
                    if (null == r.val) {
                        t = !1;
                        break;
                    }
                    e.values[n] = r.val;
                }
                if (t) if (z && console.log("running process", e.id), e.async) e.stop && e.stop(), 
                e.stop = P[e.id].procedure.apply(j, [ e.sink ].concat(e.values)); else {
                    var i = P[e.id].procedure.apply(j, e.values);
                    if (e.out) {
                        var o = e.out;
                        o.accept && !o.accept(i, o.val) || (o.val = i, null != i && (N[e.out.id] = null == e.acc, 
                        I = !0));
                    }
                }
            }
            function S(e) {
                e.async ? setTimeout(function() {
                    x(e);
                }, 10) : (x(e), e.out && (N[e.out.id] = !1, I = !0));
            }
            function O(e) {
                var t = C(e);
                x(t), t.async || k();
            }
            function T(e) {
                var t = C(e);
                t.stop && (t.stop(), delete t.stop);
            }
            function E(e) {
                return A[e] || h({
                    id: e
                }), L.es[e] || (L.es[e] = {
                    id: e,
                    val: void 0,
                    reactions: {},
                    effects: {},
                    arcs: {},
                    cb: []
                });
            }
            function C(e) {
                return L.ps[e] || (L.ps[e] = {
                    id: e,
                    arcs: {},
                    sink: function() {}
                });
            }
            var A = {}, P = {}, M = {}, H = {}, j = null, L = {
                es: {},
                ps: {}
            }, z = !1, R = {}, N = {}, F = !1, I = !1;
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
                setDebug: c,
                get: u,
                set: l,
                update: f,
                on: d,
                off: p,
                start: O,
                stop: T,
                flush: k,
                PORT_TYPES: o({}, i.PORT_TYPES)
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(8);
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
            var s = t.element, c = void 0 === s ? document : s, u = t.enableRightButton, l = {
                pressed: {},
                dragDelta: {
                    x: 0,
                    y: 0
                }
            }, f = 0, d = 0, p = !1;
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
        var o = n(5);
        n.n(o);
        t.a = r, t.b = i;
    }, function(e, t, n) {
        "use strict";
        var r = n(68), i = n(24), o = n(5);
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
                    var a = o._freeStyle, s = n.i(r.a)(i.b.apply(void 0, e)), c = s.result, u = s.debugName, l = u ? a.registerStyle(c, u) : a.registerStyle(c);
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
        var o = n(5);
        t.ensureStringObj = r, t.explodeKeyframes = i;
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(71), i = n(25), o = n(5), a = function() {
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
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, function(e, t) {
        e.exports = [ "onclick", "ondblclick", "onmousedown", "onmouseup", "onmouseover", "onmousemove", "onmouseout", "ondragstart", "ondrag", "ondragenter", "ondragleave", "ondragover", "ondrop", "ondragend", "onkeydown", "onkeypress", "onkeyup", "onunload", "onabort", "onerror", "onresize", "onscroll", "onselect", "onchange", "onsubmit", "onreset", "onfocus", "onblur", "oninput", "oncontextmenu", "onfocusin", "onfocusout" ];
    }, function(e, t) {} ]);
});