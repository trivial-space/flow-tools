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
        }, t.p = "", t(t.s = 67);
    }([ function(e, t, n) {
        e.exports = n(57), e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            function r(n, r, i, o, a, s) {
                y.isUndefined(o) && (o = t.EMPTY_OBJ);
                var l = new r(i, o);
                n.children = l, l._blockSetState = !1, l.context = o, l.props === t.EMPTY_OBJ && (l.props = i), 
                l._lifecycle = s, l._unmounted = !1, l._pendingSetState = !0, l._isSVG = a, y.isUndefined(l.componentWillMount) || (l._blockRender = !0, 
                l.componentWillMount(), l._blockRender = !1);
                var u;
                y.isUndefined(l.getChildContext) || (u = l.getChildContext()), y.isNullOrUndef(u) ? l._childContext = o : l._childContext = y.combineFrom(o, u), 
                y.isNull(b.options.beforeRender) || b.options.beforeRender(l);
                var c = l.render(i, l.state, o);
                return y.isNull(b.options.afterRender) || b.options.afterRender(l), y.isArray(c) ? ("production" !== e.env.NODE_ENV && y.throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object."), 
                y.throwError()) : y.isInvalid(c) ? c = _.createVoidVNode() : y.isStringOrNumber(c) ? c = _.createTextVNode(c, null) : (c.dom && (c = _.directClone(c)), 
                28 & c.flags && (c.parentVNode = n)), l._pendingSetState = !1, l._lastInput = c, 
                l;
            }
            function i(e, t, n, r, i, a, s) {
                o(n, k.mount(t, null, r, i, a), e, r, s);
            }
            function o(e, t, n, r, i) {
                O.unmount(n, null, r, !1, i), p(e, t, n.dom);
            }
            function a(t, n, r, i) {
                var o = n(r, i);
                return y.isArray(o) ? ("production" !== e.env.NODE_ENV && y.throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object."), 
                y.throwError()) : y.isInvalid(o) ? o = _.createVoidVNode() : y.isStringOrNumber(o) ? o = _.createTextVNode(o, null) : (o.dom && (o = _.directClone(o)), 
                28 & o.flags && (o.parentVNode = t)), o;
            }
            function s(e, t) {
                "" !== t ? e.textContent = t : e.appendChild(document.createTextNode(""));
            }
            function l(e, t) {
                e.firstChild.nodeValue = t;
            }
            function u(e, t) {
                e.appendChild(t);
            }
            function c(e, t, n) {
                y.isNullOrUndef(n) ? u(e, t) : e.insertBefore(t, n);
            }
            function d(e, t) {
                return !0 === t ? document.createElementNS(w.svgNS, e) : document.createElement(e);
            }
            function f(e, t, n, r, i, o, a) {
                O.unmount(e, null, r, !1, a);
                var s = k.mount(t, null, r, i, o);
                t.dom = s, p(n, s, e.dom);
            }
            function p(e, t, n) {
                e || (e = n.parentNode), e.replaceChild(t, n);
            }
            function h(e, t) {
                e.removeChild(t);
            }
            function v(e, t, n, r) {
                e.textContent = "", (!b.options.recyclingEnabled || b.options.recyclingEnabled && !r) && g(null, t, n, r);
            }
            function g(e, t, n, r) {
                for (var i = 0, o = t.length; i < o; i++) {
                    var a = t[i];
                    y.isInvalid(a) || O.unmount(a, e, n, !0, r);
                }
            }
            function m(e, t) {
                return t.length > 0 && !y.isNullOrUndef(t[0]) && !y.isNullOrUndef(t[0].key) && e.length > 0 && !y.isNullOrUndef(e[0]) && !y.isNullOrUndef(e[0].key);
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var y = n(0), b = n(3), _ = n(4), w = n(12), k = n(13), O = n(18);
            t.EMPTY_OBJ = {}, "production" !== e.env.NODE_ENV && Object.freeze(t.EMPTY_OBJ), 
            t.createClassComponentInstance = r, t.replaceLastChildAndUnmount = i, t.replaceVNode = o, 
            t.createFunctionalComponentInput = a, t.setTextContent = s, t.updateTextContent = l, 
            t.appendChild = u, t.insertOrAppend = c, t.documentCreateElement = d, t.replaceWithNewNode = f, 
            t.replaceChild = p, t.removeChild = h, t.removeAllChildren = v, t.removeChildren = g, 
            t.isKeyed = m;
        }).call(t, n(2));
    }, function(e, t) {
        function n() {
            throw new Error("setTimeout has not been defined");
        }
        function r() {
            throw new Error("clearTimeout has not been defined");
        }
        function i(e) {
            if (c === setTimeout) return setTimeout(e, 0);
            if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(e, 0);
            try {
                return c(e, 0);
            } catch (t) {
                try {
                    return c.call(null, e, 0);
                } catch (t) {
                    return c.call(this, e, 0);
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
        function l(e, t) {
            this.fun = e, this.array = t;
        }
        function u() {}
        var c, d, f = e.exports = {};
        !function() {
            try {
                c = "function" == typeof setTimeout ? setTimeout : n;
            } catch (e) {
                c = n;
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
            h.push(new l(e, t)), 1 !== h.length || v || i(s);
        }, l.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", 
        f.versions = {}, f.on = u, f.addListener = u, f.once = u, f.off = u, f.removeListener = u, 
        f.removeAllListeners = u, f.emit = u, f.binding = function(e) {
            throw new Error("process.binding is not supported");
        }, f.cwd = function() {
            return "/";
        }, f.chdir = function(e) {
            throw new Error("process.chdir is not supported");
        }, f.umask = function() {
            return 0;
        };
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.options = {
            afterMount: null,
            afterRender: null,
            afterUpdate: null,
            beforeRender: null,
            beforeUnmount: null,
            createVNode: null,
            findDOMNodeEnabled: !1,
            recyclingEnabled: !1,
            roots: []
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t, n, r, i, o, a) {
            this.children = e, this.className = t, this.dom = null, this.flags = n, this.key = r, 
            this.props = i, this.ref = o, this.type = a;
        }
        function i(e, t, n, i, o, a, s, l) {
            16 & e && (e = c.isStatefulComponent(t) ? 4 : 8);
            var u = new r(void 0 === i ? null : i, void 0 === n ? null : n, e, void 0 === a ? null : a, void 0 === o ? null : o, void 0 === s ? null : s, t);
            return !0 !== l && f.normalize(u), null !== p.options.createVNode && p.options.createVNode(u), 
            u;
        }
        function o(e) {
            var t, n = e.flags;
            if (28 & n) {
                var r = void 0, a = e.props;
                if (c.isNull(a)) r = d.EMPTY_OBJ; else {
                    r = {};
                    for (var s in a) r[s] = a[s];
                }
                t = i(n, e.type, null, null, r, e.key, e.ref, !0);
                var f = t.props, p = f.children;
                if (p) if (c.isArray(p)) {
                    var h = p.length;
                    if (h > 0) {
                        for (var v = [], g = 0; g < h; g++) {
                            var m = p[g];
                            c.isStringOrNumber(m) ? v.push(m) : !c.isInvalid(m) && u(m) && v.push(o(m));
                        }
                        f.children = v;
                    }
                } else u(p) && (f.children = o(p));
                t.children = null;
            } else if (3970 & n) {
                var y = e.children, r = void 0, a = e.props;
                if (null === a) r = d.EMPTY_OBJ; else {
                    r = {};
                    for (var s in a) r[s] = a[s];
                }
                t = i(n, e.type, e.className, y, r, e.key, e.ref, !y);
            } else 1 & n && (t = l(e.children, e.key));
            return t;
        }
        function a(e, t) {
            for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
            var a = n, s = n.length;
            s > 0 && !c.isUndefined(n[0]) && (t || (t = {}), 1 === s && (a = n[0]), c.isUndefined(a) || (t.children = a));
            var f;
            if (c.isArray(e)) {
                for (var p = [], h = 0, v = e.length; h < v; h++) p.push(o(e[h]));
                f = p;
            } else {
                var g = e.flags, m = e.className || t && t.className, y = c.isNullOrUndef(e.key) ? t ? t.key : null : e.key, b = e.ref || (t ? t.ref : null);
                if (28 & g) {
                    f = i(g, e.type, m, null, e.props || t ? c.combineFrom(e.props, t) : d.EMPTY_OBJ, y, b, !0);
                    var _ = f.props;
                    if (_) {
                        var w = _.children;
                        if (w) if (c.isArray(w)) {
                            var v = w.length;
                            if (v > 0) {
                                for (var p = [], h = 0; h < v; h++) {
                                    var k = w[h];
                                    c.isStringOrNumber(k) ? p.push(k) : !c.isInvalid(k) && u(k) && p.push(o(k));
                                }
                                _.children = p;
                            }
                        } else u(w) && (_.children = o(w));
                    }
                    f.children = null;
                } else 3970 & g ? (a = t && !c.isUndefined(t.children) ? t.children : e.children, 
                f = i(g, e.type, m, a, e.props || t ? c.combineFrom(e.props, t) : d.EMPTY_OBJ, y, b, !a)) : 1 & g && (f = l(e.children, y));
            }
            return f;
        }
        function s() {
            return i(4096, null);
        }
        function l(e, t) {
            return i(1, null, null, e, null, t);
        }
        function u(e) {
            return !!e.flags;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = n(0), d = n(1), f = n(31), p = n(3);
        t.createVNode = i, t.directClone = o, t.cloneVNode = a, t.createVoidVNode = s, t.createTextVNode = l, 
        t.isVNode = u;
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
        var i = n(82), o = n(83);
        t.types = o;
        var a = n(37);
        t.extend = a.extend, t.classes = a.classes, t.media = a.media;
        var s = new i.TypeStyle({
            autoGenerateTag: !0
        });
        t.setStylesTarget = s.setStylesTarget, t.cssRaw = s.cssRaw, t.cssRule = s.cssRule, 
        t.forceRenderStyles = s.forceRenderStyles, t.fontFace = s.fontFace, t.getStyles = s.getStyles, 
        t.keyframes = s.keyframes, t.reinit = s.reinit, t.style = s.style, t.createTypeStyle = r;
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            function r(e, t, n, r, i, a, c) {
                if (e !== t) {
                    var d = e.flags, f = t.flags;
                    28 & f ? 28 & d ? s(e, t, n, r, i, a, 4 & f, c) : x.replaceVNode(n, O.mountComponent(t, null, r, i, a, (4 & f) > 0), e, r, c) : 3970 & f ? 3970 & d ? o(e, t, n, r, i, a, c) : x.replaceVNode(n, O.mountElement(t, null, r, i, a), e, r, c) : 1 & f ? 1 & d ? l(e, t) : x.replaceVNode(n, O.mountText(t, null), e, r, c) : 4096 & f ? 4096 & d ? u(e, t) : x.replaceVNode(n, O.mountVoid(t, null), e, r, c) : x.replaceLastChildAndUnmount(e, t, n, r, i, a, c);
                }
            }
            function i(e, t, n, r) {
                _.isVNode(e) ? E.unmount(e, t, n, !0, r) : y.isArray(e) ? x.removeAllChildren(t, e, n, r) : t.textContent = "";
            }
            function o(e, t, n, r, i, o, s) {
                var l = t.type;
                if (e.type !== l) x.replaceWithNewNode(e, t, n, r, i, o, s); else {
                    var u = e.dom, c = e.props, d = t.props, f = e.children, p = t.children, v = e.flags, g = t.flags, b = t.ref, _ = e.className, w = t.className;
                    if (t.dom = u, o = o || (128 & g) > 0, f !== p && a(v, g, f, p, u, r, i, o, s), 
                    c !== d) {
                        var k = c || x.EMPTY_OBJ, N = d || x.EMPTY_OBJ, E = !1;
                        if (N !== x.EMPTY_OBJ) {
                            var C = (3584 & g) > 0;
                            C && (E = S.isControlledFormElement(N));
                            for (var T in N) {
                                var P = N[T];
                                h(T, k[T], P, u, o, E);
                            }
                            C && S.processElement(g, t, u, N, !1, E);
                        }
                        if (k !== x.EMPTY_OBJ) for (var T in k) y.isNullOrUndef(N[T]) && m(T, k[T], u);
                    }
                    _ !== w && (y.isNullOrUndef(w) ? u.removeAttribute("class") : o ? u.setAttribute("class", w) : u.className = w), 
                    b && (e.ref !== b || s) && O.mountRef(u, b, r);
                }
            }
            function a(e, t, n, o, a, s, l, u, f) {
                var p = !1, h = !1;
                64 & t ? p = !0 : (32 & e) > 0 && (32 & t) > 0 ? (h = !0, p = !0) : y.isInvalid(o) ? i(n, a, s, f) : y.isInvalid(n) ? y.isStringOrNumber(o) ? x.setTextContent(a, o) : y.isArray(o) ? O.mountArrayChildren(o, a, s, l, u) : O.mount(o, a, s, l, u) : y.isStringOrNumber(o) ? y.isStringOrNumber(n) ? x.updateTextContent(a, o) : (i(n, a, s, f), 
                x.setTextContent(a, o)) : y.isArray(o) ? y.isArray(n) ? (p = !0, x.isKeyed(n, o) && (h = !0)) : (i(n, a, s, f), 
                O.mountArrayChildren(o, a, s, l, u)) : y.isArray(n) ? (x.removeAllChildren(a, n, s, f), 
                O.mount(o, a, s, l, u)) : _.isVNode(o) && (_.isVNode(n) ? r(n, o, a, s, l, u, f) : (i(n, a, s, f), 
                O.mount(o, a, s, l, u))), p && (h ? d(n, o, a, s, l, u, f) : c(n, o, a, s, l, u, f));
            }
            function s(t, n, i, o, a, s, l, u) {
                var c = t.type, d = n.type, f = t.key, p = n.key;
                if (c !== d || f !== p) return x.replaceWithNewNode(t, n, i, o, a, s, u), !1;
                var h = n.props || x.EMPTY_OBJ;
                if (l) {
                    var v = t.children;
                    if (v._updating = !0, v._unmounted) {
                        if (y.isNull(i)) return !0;
                        x.replaceChild(i, O.mountComponent(n, null, o, a, s, (4 & n.flags) > 0), t.dom);
                    } else {
                        var g = !y.isUndefined(v.componentDidUpdate), m = v.state, w = g ? y.combineFrom(m, null) : m, k = v.props, E = void 0;
                        y.isUndefined(v.getChildContext) || (E = v.getChildContext()), n.children = v, v._isSVG = s, 
                        E = y.isNullOrUndef(E) ? a : y.combineFrom(a, E);
                        var S = v._lastInput, C = v._updateComponent(w, m, k, h, a, !1, !1), T = !0;
                        v._childContext = E, y.isInvalid(C) ? C = _.createVoidVNode() : C === y.NO_OP ? (C = S, 
                        T = !1) : y.isStringOrNumber(C) ? C = _.createTextVNode(C, null) : y.isArray(C) ? ("production" !== e.env.NODE_ENV && y.throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object."), 
                        y.throwError()) : y.isObject(C) && (y.isNull(C.dom) || (C = _.directClone(C))), 
                        28 & C.flags ? C.parentVNode = n : 28 & S.flags && (S.parentVNode = n), v._lastInput = C, 
                        v._vNode = n, T && (r(S, C, i, o, E, s, u), g && v.componentDidUpdate(k, w), y.isNull(b.options.afterUpdate) || b.options.afterUpdate(n), 
                        b.options.findDOMNodeEnabled && N.componentToDOMNodeMap.set(v, C.dom)), n.dom = C.dom;
                    }
                    v._updating = !1;
                } else {
                    var P = !0, k = t.props, M = n.ref, U = !y.isNullOrUndef(M), S = t.children, C = S;
                    n.dom = t.dom, n.children = S, f !== p ? P = !0 : U && !y.isNullOrUndef(M.onComponentShouldUpdate) && (P = M.onComponentShouldUpdate(k, h)), 
                    !1 !== P && (U && !y.isNullOrUndef(M.onComponentWillUpdate) && M.onComponentWillUpdate(k, h), 
                    C = d(h, a), y.isInvalid(C) ? C = _.createVoidVNode() : y.isStringOrNumber(C) && C !== y.NO_OP ? C = _.createTextVNode(C, null) : y.isArray(C) ? ("production" !== e.env.NODE_ENV && y.throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object."), 
                    y.throwError()) : y.isObject(C) && (y.isNull(C.dom) || (C = _.directClone(C))), 
                    C !== y.NO_OP && (r(S, C, i, o, a, s, u), n.children = C, U && !y.isNullOrUndef(M.onComponentDidUpdate) && M.onComponentDidUpdate(k, h), 
                    n.dom = C.dom)), 28 & C.flags ? C.parentVNode = n : 28 & S.flags && (S.parentVNode = n);
                }
                return !1;
            }
            function l(e, t) {
                var n = t.children, r = e.dom;
                t.dom = r, e.children !== n && (r.nodeValue = n);
            }
            function u(e, t) {
                t.dom = e.dom;
            }
            function c(e, t, n, i, o, a, s) {
                for (var l = e.length, u = t.length, c = l > u ? u : l, d = 0; d < c; d++) {
                    var f = t[d];
                    f.dom && (f = t[d] = _.directClone(f)), r(e[d], f, n, i, o, a, s);
                }
                if (l < u) for (d = c; d < u; d++) {
                    var f = t[d];
                    f.dom && (f = t[d] = _.directClone(f)), x.appendChild(n, O.mount(f, null, i, o, a));
                } else if (0 === u) x.removeAllChildren(n, e, i, s); else if (l > u) for (d = c; d < l; d++) E.unmount(e[d], n, i, !1, s);
            }
            function d(e, t, n, i, o, a, s) {
                var l, u, c, d, p, h, v, g = e.length, m = t.length, b = g - 1, w = m - 1, k = 0, N = 0;
                if (0 === g) return void (m > 0 && O.mountArrayChildren(t, n, i, o, a));
                if (0 === m) return void x.removeAllChildren(n, e, i, s);
                var S = e[k], C = t[N], T = e[b], P = t[w];
                C.dom && (t[N] = C = _.directClone(C)), P.dom && (t[w] = P = _.directClone(P));
                e: for (;;) {
                    for (;S.key === C.key; ) {
                        if (r(S, C, n, i, o, a, s), k++, N++, k > b || N > w) break e;
                        S = e[k], C = t[N], C.dom && (t[N] = C = _.directClone(C));
                    }
                    for (;T.key === P.key; ) {
                        if (r(T, P, n, i, o, a, s), b--, w--, k > b || N > w) break e;
                        T = e[b], P = t[w], P.dom && (t[w] = P = _.directClone(P));
                    }
                    if (T.key !== C.key) {
                        if (S.key !== P.key) break;
                        r(S, P, n, i, o, a, s), h = w + 1, p = h < t.length ? t[h].dom : null, x.insertOrAppend(n, P.dom, p), 
                        k++, w--, S = e[k], P = t[w], P.dom && (t[w] = P = _.directClone(P));
                    } else r(T, C, n, i, o, a, s), x.insertOrAppend(n, C.dom, S.dom), b--, N++, T = e[b], 
                    C = t[N], C.dom && (t[N] = C = _.directClone(C));
                }
                if (k > b) {
                    if (N <= w) for (h = w + 1, p = h < t.length ? t[h].dom : null; N <= w; ) v = t[N], 
                    v.dom && (t[N] = v = _.directClone(v)), N++, x.insertOrAppend(n, O.mount(v, null, i, o, a), p);
                } else if (N > w) for (;k <= b; ) E.unmount(e[k++], n, i, !1, s); else {
                    g = b - k + 1, m = w - N + 1;
                    var M = new Array(m);
                    for (l = 0; l < m; l++) M[l] = -1;
                    var U = !1, A = 0, I = 0;
                    if (m <= 4 || g * m <= 16) {
                        for (l = k; l <= b; l++) if (c = e[l], I < m) for (u = N; u <= w; u++) if (d = t[u], 
                        c.key === d.key) {
                            M[u - N] = l, A > u ? U = !0 : A = u, d.dom && (t[u] = d = _.directClone(d)), r(c, d, n, i, o, a, s), 
                            I++, e[l] = null;
                            break;
                        }
                    } else {
                        var j = new Map();
                        for (l = N; l <= w; l++) j.set(t[l].key, l);
                        for (l = k; l <= b; l++) c = e[l], I < m && (u = j.get(c.key), y.isUndefined(u) || (d = t[u], 
                        M[u - N] = l, A > u ? U = !0 : A = u, d.dom && (t[u] = d = _.directClone(d)), r(c, d, n, i, o, a, s), 
                        I++, e[l] = null));
                    }
                    if (g === e.length && 0 === I) for (x.removeAllChildren(n, e, i, s); N < m; ) v = t[N], 
                    v.dom && (t[N] = v = _.directClone(v)), N++, x.insertOrAppend(n, O.mount(v, null, i, o, a), null); else {
                        for (l = g - I; l > 0; ) c = e[k++], y.isNull(c) || (E.unmount(c, n, i, !0, s), 
                        l--);
                        if (U) {
                            var V = f(M);
                            for (u = V.length - 1, l = m - 1; l >= 0; l--) -1 === M[l] ? (A = l + N, v = t[A], 
                            v.dom && (t[A] = v = _.directClone(v)), h = A + 1, p = h < t.length ? t[h].dom : null, 
                            x.insertOrAppend(n, O.mount(v, n, i, o, a), p)) : u < 0 || l !== V[u] ? (A = l + N, 
                            v = t[A], h = A + 1, p = h < t.length ? t[h].dom : null, x.insertOrAppend(n, v.dom, p)) : u--;
                        } else if (I !== m) for (l = m - 1; l >= 0; l--) -1 === M[l] && (A = l + N, v = t[A], 
                        v.dom && (t[A] = v = _.directClone(v)), h = A + 1, p = h < t.length ? t[h].dom : null, 
                        x.insertOrAppend(n, O.mount(v, null, i, o, a), p));
                    }
                }
            }
            function f(e) {
                var t, n, r, i, o, a = e.slice(0), s = [ 0 ], l = e.length;
                for (t = 0; t < l; t++) {
                    var u = e[t];
                    if (-1 !== u) if (n = s[s.length - 1], e[n] < u) a[t] = n, s.push(t); else {
                        for (r = 0, i = s.length - 1; r < i; ) o = (r + i) / 2 | 0, e[s[o]] < u ? r = o + 1 : i = o;
                        u < e[s[r]] && (r > 0 && (a[t] = s[r - 1]), s[r] = t);
                    }
                }
                for (r = s.length, i = s[r - 1]; r-- > 0; ) s[r] = i, i = a[i];
                return s;
            }
            function p(e) {
                return "o" === e[0] && "n" === e[1];
            }
            function h(e, t, n, r, i, o) {
                if (t !== n) {
                    if (w.skipProps.has(e) || o && "value" === e) return;
                    if (w.booleanProps.has(e)) e = "autoFocus" === e ? e.toLowerCase() : e, r[e] = !!n; else if (w.strictProps.has(e)) {
                        var a = y.isNullOrUndef(n) ? "" : n;
                        r[e] !== a && (r[e] = a);
                    } else if (p(e)) v(e, t, n, r); else if (y.isNullOrUndef(n)) r.removeAttribute(e); else if ("style" === e) g(t, n, r); else if ("dangerouslySetInnerHTML" === e) {
                        var s = t && t.__html, l = n && n.__html;
                        s !== l && (y.isNullOrUndef(l) || (r.innerHTML = l));
                    } else i && w.namespaces.has(e) ? r.setAttributeNS(w.namespaces.get(e), e, n) : r.setAttribute(e, n);
                }
            }
            function v(t, n, r, i) {
                if (n !== r) if (w.delegatedEvents.has(t)) k.handleEvent(t, n, r, i); else {
                    var o = t.toLowerCase(), a = i[o];
                    if (a && a.wrapped) return;
                    if (y.isFunction(r) || y.isNullOrUndef(r)) i[o] = r; else {
                        var s = r.event;
                        s && y.isFunction(s) ? i[o] = function(e) {
                            s(r.data, e);
                        } : ("production" !== e.env.NODE_ENV && y.throwError('an event on a VNode "' + t + '". was not a function or a valid linkEvent.'), 
                        y.throwError());
                    }
                }
            }
            function g(e, t, n) {
                var r = n.style;
                if (y.isString(t)) return void (r.cssText = t);
                for (var i in t) {
                    var o = t[i];
                    !y.isNumber(o) || w.isUnitlessNumber.has(i) ? r[i] = o : r[i] = o + "px";
                }
                if (!y.isNullOrUndef(e)) for (var i in e) y.isNullOrUndef(t[i]) && (r[i] = "");
            }
            function m(e, t, n) {
                "value" === e ? n.value = "" : "style" === e ? n.removeAttribute("style") : p(e) ? k.handleEvent(e, t, null, n) : n.removeAttribute(e);
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var y = n(0), b = n(3), _ = n(4), w = n(12), k = n(58), O = n(13), N = n(8), E = n(18), x = n(1), S = n(19);
            t.patch = r, t.patchElement = o, t.patchComponent = s, t.patchText = l, t.patchVoid = u, 
            t.patchNonKeyedChildren = c, t.patchKeyedChildren = d, t.isAttrAnEvent = p, t.patchProp = h, 
            t.patchEvent = v, t.patchStyle = g;
        }).call(t, n(2));
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            return t ? t + "." + e : e;
        }
        function i(e) {
            var t, i, o = e.value, s = n.i(g.a)(), l = 0, u = [], c = {};
            return c.HOT = {
                entity: c,
                type: v.PORT_TYPES.HOT
            }, c.COLD = {
                entity: c,
                type: v.PORT_TYPES.COLD
            }, c.id = function(e, n) {
                return s = r(e, n), t = n, c;
            }, c.val = function(e) {
                return o = e, c;
            }, c.accept = function(e) {
                return i = e, c;
            }, c.getId = function() {
                return s;
            }, e.procedure && u.push(e), c.react = function(e, t, n) {
                var r = a(e, t, n);
                r.pidSuffix = b + l++;
                var i = r.dependencies;
                return r.dependencies = [ {
                    entity: c,
                    type: v.PORT_TYPES.ACCUMULATOR
                } ], i && i.length && (r.dependencies = r.dependencies.concat(i)), u.push(r), c;
            }, c.getGraph = function() {
                var e = h.empty();
                return e.entities[s] = n.i(v.createEntity)({
                    id: s,
                    value: o,
                    accept: i
                }), u.forEach(function(i) {
                    var o = i.processId ? r(i.processId, t) : s + i.pidSuffix, a = i.dependencies, l = [];
                    if (a) for (var u in a) {
                        var c = a[u];
                        if (l[u] = c.type, c.type !== v.PORT_TYPES.ACCUMULATOR) {
                            var d = n.i(v.createArc)({
                                process: o,
                                entity: c.entity.getId(),
                                port: u
                            });
                            e.arcs[d.id] = d;
                        }
                    }
                    var f = n.i(v.createArc)({
                        process: o,
                        entity: s
                    });
                    e.arcs[f.id] = f, e.processes[o] = n.i(v.createProcess)({
                        id: o,
                        ports: l,
                        procedure: i.procedure,
                        async: i.async,
                        autostart: i.autostart
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
            if ("function" == typeof e) return {
                procedure: e,
                pidSuffix: y
            };
            if (Array.isArray(e) && "function" == typeof t) return {
                dependencies: e,
                procedure: t,
                pidSuffix: y
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
        function l(e, t, n) {
            return i(m({}, a(e, t, n), {
                async: !0
            }));
        }
        function u(e, t, n) {
            return i(m({}, a(e, t, n), {
                autostart: !0
            }));
        }
        function c(e, t, n) {
            return i(m({}, a(e, t, n), {
                async: !0,
                autostart: !0
            }));
        }
        function d(e) {
            return e && "function" == typeof e.id && "function" == typeof e.getGraph && e.HOT && e.COLD;
        }
        function f(e, t) {
            for (var n in e) {
                var r = e[n];
                d(r) && r.id(n, t);
            }
            return e;
        }
        function p(e) {
            var t = [];
            for (var n in e) {
                var r = e[n];
                d(r) && t.push(r);
            }
            return t.reduce(function(e, t) {
                return h.merge(e, t.getGraph());
            }, h.empty());
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var h = n(33), v = n(16), g = n(34);
        t.val = o, t.stream = s, t.asyncStream = l, t.streamStart = u, t.asyncStreamStart = c, 
        t.isEntity = d, t.resolveEntityIds = f, t.getGraphFromAll = p;
        var m = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, y = "Stream", b = "Reaction";
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            function r(n) {
                c.options.findDOMNodeEnabled || ("production" !== e.env.NODE_ENV && u.throwError("findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!"), 
                u.throwError());
                var r = n && n.nodeType ? n : null;
                return t.componentToDOMNodeMap.get(n) || r;
            }
            function i(e) {
                for (var t = 0, n = m.length; t < n; t++) {
                    var r = m[t];
                    if (r.dom === e) return r;
                }
                return null;
            }
            function o(e, t, n) {
                var r = {
                    dom: e,
                    input: t,
                    lifecycle: n
                };
                return m.push(r), r;
            }
            function a(e) {
                for (var t = 0, n = m.length; t < n; t++) if (m[t] === e) return void m.splice(t, 1);
            }
            function s(t, n) {
                if (y === n && ("production" !== e.env.NODE_ENV && u.throwError('you cannot render() to the "document.body". Use an empty element as a container instead.'), 
                u.throwError()), t !== u.NO_OP) {
                    var r = i(n);
                    if (u.isNull(r)) {
                        var s = new u.Lifecycle();
                        u.isInvalid(t) || (t.dom && (t = d.directClone(t)), f.hydrateRoot(t, n, s) || p.mount(t, n, s, g.EMPTY_OBJ, !1), 
                        r = o(n, t, s), s.trigger());
                    } else {
                        var s = r.lifecycle;
                        s.listeners = [], u.isNullOrUndef(t) ? (v.unmount(r.input, n, s, !1, !1), a(r)) : (t.dom && (t = d.directClone(t)), 
                        h.patch(r.input, t, n, s, g.EMPTY_OBJ, !1, !1)), r.input = t, s.trigger();
                    }
                    if (r) {
                        var l = r.input;
                        if (l && 28 & l.flags) return l.children;
                    }
                }
            }
            function l(e) {
                return function(t, n) {
                    e || (e = t), s(n, e);
                };
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var u = n(0), c = n(3), d = n(4), f = n(60), p = n(13), h = n(6), v = n(18), g = n(1);
            t.componentToDOMNodeMap = new Map();
            var m = c.options.roots;
            t.findDOMNode = r, "production" !== e.env.NODE_ENV && u.isBrowser && null === document.body && u.warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
            var y = u.isBrowser ? document.body : null;
            t.render = s, t.createRenderer = l;
        }).call(t, n(2));
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(7), i = n(76), o = n(77);
        n.d(t, "action", function() {
            return a;
        }), n.d(t, "windowSize", function() {
            return s;
        }), n.d(t, "element", function() {
            return l;
        }), n.d(t, "mouse", function() {
            return u;
        });
        var a = n.i(r.val)(), s = n.i(r.asyncStreamStart)(i.a), l = n.i(r.val)(), u = n.i(r.asyncStream)([ l.HOT ], function(e, t) {
            return n.i(o.a)(e, {
                el: t,
                enableRightButton: !0
            });
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(5), i = (n.n(r), n(45));
        n.n(i);
        n.d(t, "g", function() {
            return o;
        }), n.d(t, "d", function() {
            return s;
        }), n.d(t, "a", function() {
            return l;
        }), n.d(t, "c", function() {
            return u;
        }), n.d(t, "f", function() {
            return c;
        }), n.d(t, "e", function() {
            return d;
        }), n.d(t, "b", function() {
            return f;
        });
        var o = "white", a = n.i(i.rgba)(40, 40, 40, .75).toString(), s = 16, l = "cyan", u = {
            borderRadius: 4,
            backgroundColor: a,
            boxShadow: "0 10px 15px rgba(0,0,0,0.3)",
            borderTop: "1px solid rgba(255, 255, 255, 0.4)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.6)"
        }, c = {
            borderRadius: 4,
            boxShadow: "0 4px 8px rgba(0,0,0,0.3) inset",
            borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
            borderTop: "1px solid rgba(0, 0, 0, 0.6)"
        }, d = {
            padding: 0,
            listStyle: "none"
        }, f = n.i(r.style)({
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
                return "number" != typeof t || 0 === t || m[e] || (t += "px"), e + ":" + String(t);
            }
            function s(e) {
                return e.sort(function(e, t) {
                    return e[0] > t[0] ? 1 : -1;
                });
            }
            function l(e, r) {
                for (var o = [], a = [], l = !1, u = 0, c = Object.keys(e); u < c.length; u++) {
                    var d = c[u], f = e[d];
                    d === t.IS_UNIQUE ? l = !!f : i(f) ? a.push([ d.trim(), f ]) : o.push([ n(d.trim()), f ]);
                }
                return {
                    properties: s(o),
                    nestedStyles: r ? a : s(a),
                    isUnique: l
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
            function c(e, t) {
                return e.indexOf("&") > -1 ? e.replace(/&/g, t) : t + " " + e;
            }
            function d(e, t, n, i, o) {
                var a = l(n, !!t), s = a.properties, f = a.nestedStyles, p = a.isUnique, h = u(s), v = h;
                if (r(t)) {
                    var m = e.add(new S(t, o ? void 0 : h, e.hash));
                    if (h && o) {
                        var y = m.add(new x(h, m.hash, p ? "u" + (++g).toString(36) : void 0));
                        i.push([ o, y ]);
                    }
                    for (var b = 0, _ = f; b < _.length; b++) {
                        var w = _[b], k = w[0], O = w[1];
                        v += k + d(m, k, O, i, o);
                    }
                } else {
                    var N = o ? c(t, o) : t;
                    if (h) {
                        var y = e.add(new x(h, e.hash, p ? "u" + (++g).toString(36) : void 0));
                        i.push([ N, y ]);
                    }
                    for (var E = 0, C = f; E < C.length; E++) {
                        var T = C[E], k = T[0], O = T[1];
                        v += k + d(e, k, O, i, N);
                    }
                }
                return v;
            }
            function f(e, t, n, r, i) {
                for (var o = new N(e.hash), a = [], s = d(o, t, n, a), l = "f" + o.hash(s), u = i ? i + "_" + l : l, f = 0, p = a; f < p.length; f++) {
                    var h = p[f], v = h[0], g = h[1], m = r ? c(v, "." + u) : v;
                    g.add(new E(m, g.hash, void 0, s));
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
            for (var m = {
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
            }, y = 0, b = [ "-webkit-", "-ms-", "-moz-", "-o-" ]; y < b.length; y++) for (var _ = b[y], w = 0, k = Object.keys(m); w < k.length; w++) {
                var O = k[w];
                m[_ + O] = !0;
            }
            t.stringHash = o;
            var N = function() {
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
            t.Cache = N;
            var E = function() {
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
            t.Selector = E;
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
            }(N);
            t.Style = x;
            var S = function(e) {
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
            }(N);
            t.Rule = S;
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
                    var r = f(this, "", t, !1, this.debug ? n : void 0), i = r.cache, o = r.pid, a = r.id, s = new S(e + " " + a, void 0, this.hash, void 0, o);
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
            }(N);
            t.FreeStyle = C, t.create = h;
        }).call(t, n(2));
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.xlinkNS = "http://www.w3.org/1999/xlink", t.xmlNS = "http://www.w3.org/XML/1998/namespace", 
        t.svgNS = "http://www.w3.org/2000/svg", t.strictProps = new Set(), t.strictProps.add("volume"), 
        t.strictProps.add("defaultChecked"), t.booleanProps = new Set(), t.booleanProps.add("muted"), 
        t.booleanProps.add("scoped"), t.booleanProps.add("loop"), t.booleanProps.add("open"), 
        t.booleanProps.add("checked"), t.booleanProps.add("default"), t.booleanProps.add("capture"), 
        t.booleanProps.add("disabled"), t.booleanProps.add("readOnly"), t.booleanProps.add("required"), 
        t.booleanProps.add("autoplay"), t.booleanProps.add("controls"), t.booleanProps.add("seamless"), 
        t.booleanProps.add("reversed"), t.booleanProps.add("allowfullscreen"), t.booleanProps.add("novalidate"), 
        t.booleanProps.add("hidden"), t.booleanProps.add("autoFocus"), t.booleanProps.add("selected"), 
        t.namespaces = new Map(), t.namespaces.set("xlink:href", t.xlinkNS), t.namespaces.set("xlink:arcrole", t.xlinkNS), 
        t.namespaces.set("xlink:actuate", t.xlinkNS), t.namespaces.set("xlink:show", t.xlinkNS), 
        t.namespaces.set("xlink:role", t.xlinkNS), t.namespaces.set("xlink:title", t.xlinkNS), 
        t.namespaces.set("xlink:type", t.xlinkNS), t.namespaces.set("xml:base", t.xmlNS), 
        t.namespaces.set("xml:lang", t.xmlNS), t.namespaces.set("xml:space", t.xmlNS), t.isUnitlessNumber = new Set(), 
        t.isUnitlessNumber.add("animationIterationCount"), t.isUnitlessNumber.add("borderImageOutset"), 
        t.isUnitlessNumber.add("borderImageSlice"), t.isUnitlessNumber.add("borderImageWidth"), 
        t.isUnitlessNumber.add("boxFlex"), t.isUnitlessNumber.add("boxFlexGroup"), t.isUnitlessNumber.add("boxOrdinalGroup"), 
        t.isUnitlessNumber.add("columnCount"), t.isUnitlessNumber.add("flex"), t.isUnitlessNumber.add("flexGrow"), 
        t.isUnitlessNumber.add("flexPositive"), t.isUnitlessNumber.add("flexShrink"), t.isUnitlessNumber.add("flexNegative"), 
        t.isUnitlessNumber.add("flexOrder"), t.isUnitlessNumber.add("gridRow"), t.isUnitlessNumber.add("gridColumn"), 
        t.isUnitlessNumber.add("fontWeight"), t.isUnitlessNumber.add("lineClamp"), t.isUnitlessNumber.add("lineHeight"), 
        t.isUnitlessNumber.add("opacity"), t.isUnitlessNumber.add("order"), t.isUnitlessNumber.add("orphans"), 
        t.isUnitlessNumber.add("tabSize"), t.isUnitlessNumber.add("widows"), t.isUnitlessNumber.add("zIndex"), 
        t.isUnitlessNumber.add("zoom"), t.isUnitlessNumber.add("fillOpacity"), t.isUnitlessNumber.add("floodOpacity"), 
        t.isUnitlessNumber.add("stopOpacity"), t.isUnitlessNumber.add("strokeDasharray"), 
        t.isUnitlessNumber.add("strokeDashoffset"), t.isUnitlessNumber.add("strokeMiterlimit"), 
        t.isUnitlessNumber.add("strokeOpacity"), t.isUnitlessNumber.add("strokeWidth"), 
        t.skipProps = new Set(), t.skipProps.add("children"), t.skipProps.add("childrenType"), 
        t.skipProps.add("defaultValue"), t.skipProps.add("ref"), t.skipProps.add("key"), 
        t.skipProps.add("checked"), t.skipProps.add("multiple"), t.delegatedEvents = new Set(), 
        t.delegatedEvents.add("onClick"), t.delegatedEvents.add("onMouseDown"), t.delegatedEvents.add("onMouseUp"), 
        t.delegatedEvents.add("onMouseMove"), t.delegatedEvents.add("onSubmit"), t.delegatedEvents.add("onDblClick"), 
        t.delegatedEvents.add("onKeyDown"), t.delegatedEvents.add("onKeyUp"), t.delegatedEvents.add("onKeyPress");
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            function r(t, n, r, s, u) {
                var c = t.flags;
                return 3970 & c ? a(t, n, r, s, u) : 28 & c ? l(t, n, r, s, u, (4 & c) > 0) : 4096 & c ? o(t, n) : 1 & c ? i(t, n) : ("production" !== e.env.NODE_ENV && ("object" == typeof t ? f.throwError("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + JSON.stringify(t) + '".') : f.throwError('mount() expects a valid VNode, instead it received an object with the type "' + typeof t + '".')), 
                void f.throwError());
            }
            function i(e, t) {
                var n = document.createTextNode(e.children);
                return e.dom = n, f.isNull(t) || y.appendChild(t, n), n;
            }
            function o(e, t) {
                var n = document.createTextNode("");
                return e.dom = n, f.isNull(t) || y.appendChild(t, n), n;
            }
            function a(e, t, n, i, o) {
                if (p.options.recyclingEnabled) {
                    var a = g.recycleElement(e, n, i, o);
                    if (!f.isNull(a)) return f.isNull(t) || y.appendChild(t, a), a;
                }
                var l = e.flags;
                o = o || (128 & l) > 0;
                var u = y.documentCreateElement(e.type, o), c = e.children, m = e.props, _ = e.className, w = e.ref;
                if (e.dom = u, f.isInvalid(c) || (f.isStringOrNumber(c) ? y.setTextContent(u, c) : f.isArray(c) ? s(c, u, n, i, o) : h.isVNode(c) && r(c, u, n, i, o)), 
                !f.isNull(m)) {
                    var k = !1, O = (3584 & l) > 0;
                    O && (k = b.isControlledFormElement(m));
                    for (var N in m) v.patchProp(N, null, m[N], u, o, k);
                    O && b.processElement(l, e, u, m, !0, k);
                }
                return null !== _ && (o ? u.setAttribute("class", _) : u.className = _), f.isNull(w) || d(u, w, n), 
                f.isNull(t) || y.appendChild(t, u), u;
            }
            function s(e, t, n, i, o) {
                for (var a = 0, s = e.length; a < s; a++) {
                    var l = e[a];
                    f.isInvalid(l) || (l.dom && (e[a] = l = h.directClone(l)), r(e[a], t, n, i, o));
                }
            }
            function l(e, t, n, i, o, a) {
                if (p.options.recyclingEnabled) {
                    var s = g.recycleComponent(e, n, i, o);
                    if (!f.isNull(s)) return f.isNull(t) || y.appendChild(t, s), s;
                }
                var l, d = e.type, h = e.props || y.EMPTY_OBJ, v = e.ref;
                if (a) {
                    var b = y.createClassComponentInstance(e, d, h, i, o, n), _ = b._lastInput;
                    b._vNode = e, e.dom = l = r(_, null, n, b._childContext, o), f.isNull(t) || y.appendChild(t, l), 
                    u(e, v, b, n), b._updating = !1, p.options.findDOMNodeEnabled && m.componentToDOMNodeMap.set(b, l);
                } else {
                    var _ = y.createFunctionalComponentInput(e, d, h, i);
                    e.dom = l = r(_, null, n, i, o), e.children = _, c(v, l, n), f.isNull(t) || y.appendChild(t, l);
                }
                return l;
            }
            function u(t, n, r, i) {
                n && (f.isFunction(n) ? n(r) : ("production" !== e.env.NODE_ENV && (f.isStringOrNumber(n) ? f.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.') : f.isObject(n) && 4 & t.flags ? f.throwError("functional component lifecycle events are not supported on ES2015 class components.") : f.throwError('a bad value for "ref" was used on component: "' + JSON.stringify(n) + '"')), 
                f.throwError()));
                var o = !f.isUndefined(r.componentDidMount), a = p.options.afterMount;
                !o && f.isNull(a) || i.addListener(function() {
                    r._updating = !0, a && a(t), o && r.componentDidMount(), r._updating = !1;
                });
            }
            function c(e, t, n) {
                e && (f.isNullOrUndef(e.onComponentWillMount) || e.onComponentWillMount(), f.isNullOrUndef(e.onComponentDidMount) || n.addListener(function() {
                    return e.onComponentDidMount(t);
                }));
            }
            function d(t, n, r) {
                if (f.isFunction(n)) r.addListener(function() {
                    return n(t);
                }); else {
                    if (f.isInvalid(n)) return;
                    "production" !== e.env.NODE_ENV && f.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.'), 
                    f.throwError();
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var f = n(0), p = n(3), h = n(4), v = n(6), g = n(30), m = n(8), y = n(1), b = n(19);
            t.mount = r, t.mountText = i, t.mountVoid = o, t.mountElement = a, t.mountArrayChildren = s, 
            t.mountComponent = l, t.mountClassComponentCallbacks = u, t.mountFunctionalComponentCallbacks = c, 
            t.mountRef = d;
        }).call(t, n(2));
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(7), i = n(26), o = n(9), a = n(25);
        n.d(t, "runtime", function() {
            return s;
        }), n.d(t, "graph", function() {
            return l;
        }), n.d(t, "state", function() {
            return u;
        }), n.d(t, "entityTree", function() {
            return c;
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
        }).accept(a.a), l = n.i(r.stream)([ s.HOT ], function(e) {
            return e.getGraph();
        }), u = n.i(r.stream)([ s.HOT ], function(e) {
            return e.getState();
        }), c = n.i(r.stream)([ l.HOT ], function(e) {
            return n.i(i.createEntityTree)(e.entities);
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(5), i = (n.n(r), n(10));
        n.d(t, "b", function() {
            return s;
        }), n.d(t, "c", function() {
            return l;
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
        }, s = n.i(r.style)(i.c, o), l = n.i(r.style)(i.c, o, a), u = n.i(r.style)({
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
                meta: l({}, u)
            };
        }
        function i(e, t) {
            var r = e.id, i = void 0 === r ? n.i(a.a)() : r, o = e.ports, u = void 0 === o ? [] : o, c = e.procedure, d = e.code, f = e.autostart, p = void 0 !== f && f, h = e.async, v = void 0 !== h && h, g = e.meta;
            if (null == c && null != d && (c = n.i(s.a)(d, t)), null == c) throw TypeError("Process must have procedure or code set");
            return {
                id: i,
                ports: u,
                procedure: c,
                autostart: p,
                async: v,
                meta: l({}, g)
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
                meta: l({}, o)
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(34), s = n(75);
        t.createEntity = r, t.createProcess = i, t.createArc = o, n.d(t, "PORT_TYPES", function() {
            return u;
        });
        var l = this && this.__assign || Object.assign || function(e) {
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
        (function(e) {
            function r(e, t, n, r, s) {
                var l = e.flags;
                28 & l ? o(e, t, n, r, s) : 3970 & l ? a(e, t, n, r, s) : 4097 & l && i(e, t);
            }
            function i(e, t) {
                u.isNull(t) || h.removeChild(t, e.dom);
            }
            function o(e, t, n, i, o) {
                var a = e.children, s = e.flags, l = 4 & s, d = e.ref, v = e.dom;
                if (o || (l ? a._unmounted || (a._blockSetState = !0, u.isNull(c.options.beforeUnmount) || c.options.beforeUnmount(e), 
                u.isUndefined(a.componentWillUnmount) || a.componentWillUnmount(), d && !o && d(null), 
                a._unmounted = !0, c.options.findDOMNodeEnabled && p.componentToDOMNodeMap.delete(a), 
                r(a._lastInput, null, a._lifecycle, !1, o)) : (u.isNullOrUndef(d) || u.isNullOrUndef(d.onComponentWillUnmount) || d.onComponentWillUnmount(v), 
                r(a, null, n, !1, o))), t) {
                    var g = a._lastInput;
                    u.isNullOrUndef(g) && (g = a), h.removeChild(t, v);
                }
                c.options.recyclingEnabled && !l && (t || i) && f.poolComponent(e);
            }
            function a(e, t, n, r, i) {
                var o = e.dom, a = e.ref, p = e.props;
                a && !i && l(a);
                var v = e.children;
                if (u.isNullOrUndef(v) || s(v, n, i), !u.isNull(p)) for (var g in p) null !== p[g] && d.isAttrAnEvent(g) && (d.patchEvent(g, p[g], null, o), 
                p[g] = null);
                u.isNull(t) || h.removeChild(t, o), c.options.recyclingEnabled && (t || r) && f.poolElement(e);
            }
            function s(e, t, n) {
                if (u.isArray(e)) for (var i = 0, o = e.length; i < o; i++) {
                    var a = e[i];
                    !u.isInvalid(a) && u.isObject(a) && r(a, null, t, !1, n);
                } else u.isObject(e) && r(e, null, t, !1, n);
            }
            function l(t) {
                if (u.isFunction(t)) t(null); else {
                    if (u.isInvalid(t)) return;
                    "production" !== e.env.NODE_ENV && u.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.'), 
                    u.throwError();
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var u = n(0), c = n(3), d = n(6), f = n(30), p = n(8), h = n(1);
            t.unmount = r, t.unmountComponent = o, t.unmountElement = a;
        }).call(t, n(2));
    }, function(e, t, n) {
        "use strict";
        function r(e, t, n, r, i, o) {
            512 & e && a.processInput(t, n, r, i, o), 2048 & e && s.processSelect(t, n, r, i, o), 
            1024 & e && l.processTextarea(t, n, r, i, o);
        }
        function i(e) {
            return e.type && a.isCheckedType(e.type) ? !o.isNullOrUndef(e.checked) : !o.isNullOrUndef(e.value);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(0), a = n(61), s = n(62), l = n(63);
        t.processElement = r, t.isControlledFormElement = i;
    }, function(e, t, n) {
        e.exports = n(64).default, e.exports.default = e.exports;
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
            e.react([ l.windowSize.HOT ], i);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(7), s = n(25), l = n(9), u = n(14);
        n.d(t, "title", function() {
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
        }), n.d(t, "treeFold", function() {
            return m;
        }), n.d(t, "graphWindow", function() {
            return y;
        }), n.d(t, "entitiesWindow", function() {
            return b;
        }), n.d(t, "activeEntity", function() {
            return _;
        }), n.d(t, "activeProcess", function() {
            return w;
        }), n.d(t, "activeNode", function() {
            return k;
        }), n.d(t, "watchingEntity", function() {
            return O;
        }), n.d(t, "activeValue", function() {
            return N;
        }), n.d(t, "editedValue", function() {
            return E;
        }), n.d(t, "entityValueView", function() {
            return x;
        }), n.d(t, "entitiesWindowProps", function() {
            return S;
        }), n.d(t, "entityViewProps", function() {
            return C;
        }), n.d(t, "controlProps", function() {
            return T;
        }), n.d(t, "treeWindowProps", function() {
            return P;
        }), n.d(t, "graphWindowProps", function() {
            return M;
        }), n.d(t, "treeData", function() {
            return U;
        });
        var c = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, d = n.i(a.val)("").accept(s.b), f = n.i(a.val)({
            tree: !1,
            graph: !1,
            entities: !1
        }).react([ l.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if ("state.gui.updateVisibility" === n) return c({}, e, (i = {}, i[r] = !e[r], i));
            if ("closeWindow" === n) return c({}, e, (o = {}, o[r] = !1, o));
            var i, o;
        }).accept(s.a), p = n.i(a.stream)([ l.action.HOT ], function(e) {
            var t = e.type, n = e.payload;
            if ("state.gui.setActiveWindow" === t || "state.gui.updateVisibility" === t) return n;
        }).accept(n.i(s.c)(s.a, s.d)).val(""), h = n.i(a.val)(0).react([ p.HOT ], function(e) {
            return e + 1;
        }), v = n.i(a.val)({
            left: 100,
            top: 0,
            zIndex: 0
        }).react([ p.COLD, l.mouse.HOT, l.windowSize.COLD ], function(e, t, n, r) {
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
        }).react([ p.COLD, l.mouse.HOT, l.windowSize.COLD ], function(e, t, n, r) {
            var o = n.dragDelta, a = n.pressed[0] && n.pressed[0].target;
            if ("tree" === t && a && a.closest(".tvs-flow-tree") && (o.x || o.y)) return "resize" === a.className ? (e.width -= o.x, 
            e.height -= o.y) : (e.left -= o.x, e.top -= o.y), i(e, r);
        }).accept(s.a), m = n.i(a.val)({}).react([ l.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            if ("state.gui.toggleTreeLevel" === n) return c({}, e, (i = {}, i[r] = !e[r], i));
            var i;
        }).accept(s.a), y = n.i(a.val)({
            top: 200,
            left: 100,
            width: 600,
            height: 600,
            zIndex: 0
        }).react([ p.COLD, l.mouse.HOT, l.windowSize.COLD ], function(e, t, n, r) {
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
        }).react([ p.COLD, l.mouse.HOT, l.windowSize.COLD ], function(e, t, n, r) {
            var o = n.dragDelta, a = n.pressed[0] && n.pressed[0].target;
            if ("entities" === t && a && a.closest(".tvs-flow-entities") && !a.closest("pre") && (o.x || o.y)) return "resize" === a.className ? (e.width -= o.x, 
            e.height -= o.y) : (e.left -= o.x, e.top -= o.y), i(e, r);
        }).accept(s.a), _ = n.i(a.val)({}).react([ l.action.HOT, u.graph.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if ("state.gui.openEntity" === r) return n.entities[i];
        }).react([ l.mouse.HOT ], function(e, t) {
            if (t.pressed[2] && t.pressed[2].target.closest("svg")) return {
                id: ""
            };
        }).accept(s.a), w = n.i(a.val)({}).react([ l.action.HOT, u.graph.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if ("state.gui.openProcess" === r) return n.processes[i];
        }).react([ l.mouse.HOT ], function(e, t) {
            if (t.pressed[2] && t.pressed[2].target.closest("svg")) return {
                id: ""
            };
        }).accept(s.a), k = n.i(a.val)({}).react([ _.HOT ], function(e, t) {
            return t;
        }).react([ w.HOT ], function(e, t) {
            return t;
        }), O = n.i(a.val)(!0).react([ l.action.HOT ], function(e, t) {
            var n = t.type, r = t.payload;
            return "setEntityEditMode" === n ? !r : "saveCurrentEntityValue" === n || void 0;
        }).react([ _.HOT ], function() {
            return !0;
        }).accept(s.a), N = n.i(a.asyncStream)([ u.runtime.COLD, _.HOT, f.HOT, O.HOT ], function(e, t, n, r, i) {
            if (n && n.id) {
                if (e(t.get(n.id)), r.entities && i) return t.on(n.id, e), function() {
                    return t.off(n.id, e);
                };
            } else e("");
        }), E = n.i(a.val)("").react([ l.action.HOT, u.runtime.COLD ], function(e, t, n) {
            var r = t.type, i = t.payload;
            if ("updateEditedValue" === r) return i;
            e && "saveCurrentEntityValue" === r && requestAnimationFrame(function() {
                try {
                    n.set(i, JSON.parse(e));
                } catch (t) {
                    console.error("could not save value to entity", i, e), console.error(t);
                }
            });
        }).react([ N.HOT ], function() {
            return "";
        }).accept(n.i(s.c)(s.a, s.d)), x = n.i(a.stream)([ N.HOT, O.HOT ], function(e, t) {
            return {
                value: e,
                watching: t
            };
        }).val({
            value: null,
            watching: !0
        }), S = n.i(a.stream)([ b.HOT, k.HOT, p.HOT ], function(e, t, n) {
            return {
                dimensions: e,
                node: t,
                window: n
            };
        }).val({}), C = n.i(a.stream)([ _.HOT, O.HOT ], function(e, t) {
            return {
                entity: e,
                watching: t
            };
        }), T = n.i(a.stream)([ f.HOT, v.HOT ], function(e, t) {
            return {
                visibility: e,
                position: t
            };
        }), P = n.i(a.stream)([ g.HOT, p.HOT ], function(e, t) {
            return {
                dimensions: e,
                window: t
            };
        }).val({}), M = n.i(a.stream)([ y.HOT, p.HOT ], function(e, t) {
            return {
                dimensions: e,
                window: t
            };
        }).val({}), U = n.i(a.stream)([ m.HOT, u.entityTree.HOT, _.HOT ], function(e, t, n) {
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
        r(v, "controls"), r(g, "tree"), r(y, "graph"), r(b, "entities"), o(v), o(g), o(y), 
        o(b);
    }, function(e, t, n) {
        "use strict";
        function r() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.b.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 24 24"
            }, [ "title", "close" ], [ "path", {
                d: "M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"
            } ] ];
        }
        function i() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.b.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 24 24"
            }, [ "title", "graph" ], [ "path", {
                d: "M18 16.078c1.594 0 2.906 1.313 2.906 2.906s-1.313 2.953-2.906 2.953-2.906-1.359-2.906-2.953c0-0.234 0-0.469 0.047-0.656l-7.078-4.125c-0.563 0.516-1.266 0.797-2.063 0.797-1.641 0-3-1.359-3-3s1.359-3 3-3c0.797 0 1.5 0.281 2.063 0.797l7.031-4.078c-0.047-0.234-0.094-0.469-0.094-0.703 0-1.641 1.359-3 3-3s3 1.359 3 3-1.359 3-3 3c-0.797 0-1.5-0.328-2.063-0.844l-7.031 4.125c0.047 0.234 0.094 0.469 0.094 0.703s-0.047 0.469-0.094 0.703l7.125 4.125c0.516-0.469 1.219-0.75 1.969-0.75z"
            } ] ];
        }
        function o() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.b.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 24 24"
            }, [ "title", "list" ], [ "path", {
                d: "M9 5.016h12v3.984h-12v-3.984zM9 18.984v-3.984h12v3.984h-12zM9 14.016v-4.031h12v4.031h-12zM3.984 9v-3.984h4.031v3.984h-4.031zM3.984 18.984v-3.984h4.031v3.984h-4.031zM3.984 14.016v-4.031h4.031v4.031h-4.031z"
            } ] ];
        }
        function a() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.b.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 24 24"
            }, [ "title", "entities" ], [ "path", {
                d: "M16.641 1.688l5.672 5.672-5.672 5.625h4.359v8.016h-8.016v-8.016h3.656l-5.625-5.625v3.656h-8.016v-8.016h8.016v4.359zM3 21v-8.016h8.016v8.016h-8.016z"
            } ] ];
        }
        function s() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.b.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "play" ], [ "path", {
                d: "M6 4l20 12-20 12z"
            } ] ];
        }
        function l() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.b.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "stop" ], [ "path", {
                d: "M4 4h24v24h-24z"
            } ] ];
        }
        function u() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.b.apply(void 0, [ g ].concat(e)),
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
        function c() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.b.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "reset" ], [ "path", {
                d: "M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z"
            } ] ];
        }
        function d() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.b.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "show" ], [ "path", {
                d: "M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
            } ] ];
        }
        function f() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return [ "svg", {
                class: h.b.apply(void 0, [ g ].concat(e)),
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
                class: h.b.apply(void 0, [ g ].concat(e)),
                viewBox: "0 0 32 32"
            }, [ "title", "more" ], [ "path", {
                d: "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"
            } ], [ "path", {
                d: "M11.086 22.086l2.829 2.829 8.914-8.914-8.914-8.914-2.828 2.828 6.086 6.086z"
            } ] ];
        }
        var h = n(35), v = n(10);
        t.d = r, t.b = i, t.a = o, t.c = a, t.h = s, t.i = l, t.j = u, t.g = c, t.f = d, 
        t.e = f, t.k = p;
        var g = n.i(h.a)({
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
                    fill: v.a
                }
            }
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(5), i = (n.n(r), n(10));
        n.d(t, "a", function() {
            return a;
        }), n.d(t, "b", function() {
            return s;
        }), n.d(t, "c", function() {
            return l;
        }), n.d(t, "e", function() {
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
        }), l = n.i(r.style)(i.f, {
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
        }), c = n.i(r.style)({
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
            var t = e.title, r = e.onclick, a = e.icon, s = e.key, l = e.class, u = [ "button", {
                class: n.i(i.classes)(o.c, l),
                onmouseup: r,
                title: t
            }, a ];
            return s && (u[1].key = s), u;
        }
        var i = n(5), o = (n.n(i), n(15));
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
                for (var i = e[r], o = i.id.split(t), a = n, s = o.slice(), l = [], u = 0; u < o.length; u++) {
                    var c = s.shift();
                    s.length ? (l.push(c), a = a[c] = a[c] || {
                        __path__: l.join(t)
                    }) : a[c] = {
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
            return function t(s, l) {
                var u = l + s.name;
                if (o[u]) return o[u];
                var c = function(o) {
                    function c() {
                        var t = null !== o && o.apply(this, arguments) || this;
                        return t.state = {
                            current: e.get(l)
                        }, t.updateAsync = function() {
                            i(u, function() {
                                t.setState(function(t) {
                                    return t.current = e.get(l), t;
                                });
                            });
                        }, t;
                    }
                    return d(c, o), c.prototype.render = function() {
                        return a(s(this.state.current, r, t));
                    }, c.prototype.componentDidMount = function() {
                        n && console.log("component mounted!", this), e.on(l, this.updateAsync);
                    }, c.prototype.componentWillUnmount = function() {
                        n && console.log("component will unmount!", this), e.off(l, this.updateAsync);
                    }, c;
                }(f);
                return o[u] = c, c;
            };
        }
        function a(e) {
            if ("function" == typeof e) return c()(e);
            if (!Array.isArray(e)) return e;
            var t = e.shift(), n = e[0];
            return "object" != typeof n || Array.isArray(n) ? n = {} : e.shift(), e.length ? c()(t, n, e.map(a)) : c()(t, n);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(55), l = n.n(s), u = n(29), c = n.n(u);
        n.d(t, "ComponentClass", function() {
            return f;
        }), t.flowComponentFactory = o, t.h = a;
        var d = this && this.__extends || function() {
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
        }(l.a), p = {}, h = !0;
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
        var o = n(7);
        t.modulePathToNamespace = r, t.getGraphFromModules = i;
    }, function(e, t, n) {
        e.exports = n(56).default, e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        function r(e, t, n, r) {
            var i = e.type, o = c.get(i);
            if (!s.isUndefined(o)) {
                var a = e.key, u = null === a ? o.nonKeyed : o.keyed.get(a);
                if (!s.isUndefined(u)) {
                    var d = u.pop();
                    if (!s.isUndefined(d)) return l.patchElement(d, e, null, t, n, r, !0), e.dom;
                }
            }
            return null;
        }
        function i(e) {
            var t = e.type, n = e.key, r = c.get(t);
            if (s.isUndefined(r) && (r = {
                keyed: new Map(),
                nonKeyed: []
            }, c.set(t, r)), s.isNull(n)) r.nonKeyed.push(e); else {
                var i = r.keyed.get(n);
                s.isUndefined(i) && (i = [], r.keyed.set(n, i)), i.push(e);
            }
        }
        function o(e, t, n, r) {
            var i = e.type, o = u.get(i);
            if (!s.isUndefined(o)) {
                var a = e.key, c = null === a ? o.nonKeyed : o.keyed.get(a);
                if (!s.isUndefined(c)) {
                    var d = c.pop();
                    if (!s.isUndefined(d)) {
                        var f = e.flags;
                        if (!l.patchComponent(d, e, null, t, n, r, 4 & f, !0)) return e.dom;
                    }
                }
            }
            return null;
        }
        function a(e) {
            var t = e.ref;
            if (!t || !(t.onComponentWillMount || t.onComponentWillUnmount || t.onComponentDidMount || t.onComponentWillUpdate || t.onComponentDidUpdate)) {
                var n = e.type, r = e.key, i = u.get(n);
                if (s.isUndefined(i) && (i = {
                    keyed: new Map(),
                    nonKeyed: []
                }, u.set(n, i)), s.isNull(r)) i.nonKeyed.push(e); else {
                    var o = i.keyed.get(r);
                    s.isUndefined(o) && (o = [], i.keyed.set(r, o)), o.push(e);
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(0), l = n(6), u = new Map(), c = new Map();
        t.recycleElement = r, t.poolElement = i, t.recycleComponent = o, t.poolComponent = a;
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            function r(e, t) {
                return t.key = e, t;
            }
            function i(e, t) {
                return f.isNumber(e) && (e = "." + e), f.isNull(t.key) || "." === t.key[0] ? r(e, t) : t;
            }
            function o(e, t) {
                return t.key = e + t.key, t;
            }
            function a(e, t, n, i) {
                for (var s = e.length; n < s; n++) {
                    var l = e[n], u = i + "." + n;
                    f.isInvalid(l) || (f.isArray(l) ? a(l, t, 0, u) : (f.isStringOrNumber(l) ? l = p.createTextVNode(l, null) : (p.isVNode(l) && l.dom || l.key && "." === l.key[0]) && (l = p.directClone(l)), 
                    l = f.isNull(l.key) || "." === l.key[0] ? r(u, l) : o(i, l), t.push(l)));
                }
            }
            function s(e) {
                var t;
                !0 === e.$ ? e = e.slice() : e.$ = !0;
                for (var n = 0, r = e.length; n < r; n++) {
                    var o = e[n];
                    if (f.isInvalid(o) || f.isArray(o)) {
                        var s = (t || e).slice(0, n);
                        return a(e, s, n, ""), s;
                    }
                    f.isStringOrNumber(o) ? (t || (t = e.slice(0, n)), t.push(i(n, p.createTextVNode(o, null)))) : p.isVNode(o) && null !== o.dom || f.isNull(o.key) && 0 == (64 & o.flags) ? (t || (t = e.slice(0, n)), 
                    t.push(i(n, p.directClone(o)))) : t && t.push(i(n, p.directClone(o)));
                }
                return t || e;
            }
            function l(e) {
                return f.isArray(e) ? s(e) : p.isVNode(e) && null !== e.dom ? p.directClone(e) : e;
            }
            function u(e, t, n) {
                3970 & e.flags && (f.isNullOrUndef(n) && !f.isNullOrUndef(t.children) && (e.children = t.children), 
                f.isNullOrUndef(t.className) || (e.className = t.className, delete t.className)), 
                t.ref && (e.ref = t.ref, delete t.ref), f.isNullOrUndef(t.key) || (e.key = t.key, 
                delete t.key);
            }
            function c(e) {
                return "svg" === e ? 128 : "input" === e ? 512 : "select" === e ? 2048 : "textarea" === e ? 1024 : "media" === e ? 256 : 2;
            }
            function d(t) {
                var n = t.props, r = t.children;
                if (28 & t.flags) {
                    var i = t.type, o = i.defaultProps;
                    if (!f.isNullOrUndef(o)) if (n) for (var a in o) f.isUndefined(n[a]) && (n[a] = o[a]); else n = t.props = o;
                    f.isString(i) && (t.flags = c(i), n && n.children && (t.children = n.children, r = n.children));
                }
                if (n && (u(t, n, r), f.isInvalid(n.children) || (n.children = l(n.children))), 
                f.isInvalid(r) || (t.children = l(r)), "production" !== e.env.NODE_ENV) {
                    t.children && Array.isArray(t.children) && function(e) {
                        var t = e.map(function(e) {
                            return e.key;
                        });
                        t.some(function(e, n) {
                            var r = t.indexOf(e) !== n;
                            return r && f.warning("Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:" + e), 
                            r;
                        });
                    }(t.children);
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var f = n(0), p = n(4);
            t.normalizeVNodes = s, t.getFlagsForElementVnode = c, t.normalize = d;
        }).call(t, n(2));
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
        var i = n(7), o = n(9), a = n(25), s = n(14), l = n(16), u = n(21);
        n.d(t, "viewBox", function() {
            return d;
        }), n.d(t, "nodeState", function() {
            return f;
        }), n.d(t, "graphEntities", function() {
            return p;
        }), n.d(t, "graphProcesses", function() {
            return h;
        }), n.d(t, "viewData", function() {
            return v;
        });
        var c = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, d = n.i(i.val)({
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
        }).accept(a.a), f = n.i(i.val)({}).react([ s.graph.HOT, u.graphWindow.COLD ], function(e, t, n) {
            for (var r in t.entities) e[r] || (e[r] = {
                x: Math.random() * n.width,
                y: Math.random() * n.height
            });
        }).react([ u.activeEntity.COLD, o.mouse.HOT, d.COLD ], function(e, t, n, r) {
            var i = t.id, o = n.dragDelta, a = n.pressed[0] && n.pressed[0].target, s = a && (a.dataset.key || a.parentElement && a.parentElement.dataset.key);
            if (s && i === s && e[i] && (o.x || o.y)) return e[i].x -= o.x * r.scale, e[i].y -= o.y * r.scale, 
            e;
        }).accept(a.a), p = n.i(i.stream)([ s.graph.HOT, u.activeNode.HOT ], function(e, t) {
            var n = {}, i = {}, o = 0;
            for (var a in e.entities) {
                var s = e.entities[a], l = r(a), u = l.label, d = l.group;
                i[d] = i[d] || o++ % 7 + 1;
                var p = c({
                    id: s.id,
                    class: "group-" + i[d],
                    label: u,
                    active: s.id === t.id
                }, f[a]);
                null != s.accept && (p.accept = !0), null != s.value && (p.initial = !0), n[a] = p;
            }
            return n;
        }).react([ f.HOT ], function(e, t) {
            for (var n in e) e[n].x = t[n].x, e[n].y = t[n].y;
            return e;
        }), h = n.i(i.stream)([ s.graph.HOT, u.activeNode.HOT ], function(e, t) {
            var n = {};
            for (var i in e.processes) {
                var o = e.processes[i], a = c({
                    id: i
                }, r(i), {
                    from: [],
                    async: o.async,
                    autostart: o.autostart,
                    active: o.id === t.id,
                    acc: o.ports && o.ports.includes(l.PORT_TYPES.ACCUMULATOR)
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
                        var u = e[o.from[s][0]], c = o.from[s][1], d = u.x - a.x, f = u.y - a.y;
                        c === l.PORT_TYPES.COLD && (d /= 2, f /= 2), o.x += d, o.y += f;
                    }
                    var p = Math.sqrt(o.x * o.x + o.y * o.y);
                    o.x = 50 * o.x / p + a.x, o.y = 50 * o.y / p + a.y;
                    for (var s = 0; s < o.from.length; s++) {
                        var h = o.from[s], v = h[0], c = h[1], u = e[v];
                        o.fromIsActive = o.fromIsActive || u.active, r.push({
                            from: u,
                            to: o,
                            class: "from" + (c === l.PORT_TYPES.COLD ? " cold" : ""),
                            title: c,
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
        }).react([ d.HOT ], function(e, t) {
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
        }, s = [], l = {}, u = 0; u < 256; u++) s[u] = (u + 256).toString(16).substr(1), 
        l[s[u]] = u;
    }, function(e, t, n) {
        "use strict";
        var r = n(79), i = n(80), o = (n.n(i), n(36));
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
                    var l = a[s];
                    (l || 0 === l) && ("$nest" === s && l ? n[s] = n.$nest ? i(n.$nest, l) : l : -1 !== s.indexOf("&") || 0 === s.indexOf("@media") ? n[s] = n[s] ? i(n[s], l) : l : n[s] = l);
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
                    var l = a[s];
                    (l || 0 === l) && ("$nest" === s && l ? n[s] = n.$nest ? i(n.$nest, l) : l : -1 !== s.indexOf("&") || 0 === s.indexOf("@media") ? n[s] = n[s] ? i(n[s], l) : l : n[s] = l);
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
            function i(e) {
                requestAnimationFrame(function() {
                    m.set(d.runtime.getId(), e);
                });
            }
            function p() {
                document.body.removeChild(O), N.destroy();
            }
            var v = b({
                debug: !1,
                graph: null
            }, t), m = o.a.create();
            m.addGraph(n.i(a.getGraphFromModules)(_)), m.flush(), e && m.set(u.title.getId(), e), 
            v.graph && m.set(f.nodeState.getId(), v.graph), r(e, f.viewBox, m), r(e, f.nodeState, m), 
            r(e, u.visibility, m), r(e, u.entitiesWindow, m), r(e, u.graphWindow, m), r(e, u.treeWindow, m), 
            r(e, u.controlsPosition, m);
            var w = n.i(l.flowComponentFactory)(m, c.action.getId(), v.debug), k = n.i(s.a)(w), O = document.createElement("div");
            O.className = "tvs-flow-tools-container", document.body.appendChild(O), g.a.render(y()(k), O), 
            m.set(c.element.getId(), O);
            var N = new h.a(".tvs-save-graph", {
                text: function() {
                    return JSON.stringify(m.get(f.nodeState.getId()), null, "  ");
                }
            });
            return N.on("success", function(e) {
                return console.log("saved graph to clipboard", e);
            }), N.on("error", function(e) {
                return console.log("error while saving graph to clipboard", e);
            }), {
                updateFlow: i,
                dispose: p,
                getState: function() {
                    return m;
                },
                getElement: function() {
                    return O;
                }
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(73), a = n(28), s = n(70), l = n(27), u = n(21), c = n(9), d = n(14), f = n(32), p = n(41), h = n.n(p), v = n(20), g = n.n(v), m = n(29), y = n.n(m);
        t.start = i;
        var b = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, _ = n(39);
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
            "./events.ts": 9,
            "./state/flow.ts": 14,
            "./state/graph.ts": 32,
            "./state/gui.ts": 21
        };
        r.keys = function() {
            return Object.keys(o);
        }, r.resolve = i, e.exports = r, r.id = 39;
    }, function(e, t, n) {
        var r, i, o;
        !function(a, s) {
            i = [ e, n(65) ], r = s, void 0 !== (o = "function" == typeof r ? r.apply(t, i) : r) && (e.exports = o);
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
            i = [ e, n(40), n(66), n(53) ], r = s, void 0 !== (o = "function" == typeof r ? r.apply(t, i) : r) && (e.exports = o);
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
            function l(e, t) {
                var n = "data-clipboard-" + e;
                if (t.hasAttribute(n)) return t.getAttribute(n);
            }
            var u = i(t), c = i(n), d = i(r), f = function() {
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
                return s(t, e), f(t, [ {
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
                            trigger: t,
                            emitter: this
                        });
                    }
                }, {
                    key: "defaultAction",
                    value: function(e) {
                        return l("action", e);
                    }
                }, {
                    key: "defaultTarget",
                    value: function(e) {
                        var t = l("target", e);
                        if (t) return document.querySelector(t);
                    }
                }, {
                    key: "defaultText",
                    value: function(e) {
                        return l("text", e);
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
            }(c.default);
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
            return m(e) || y(e) || b(e) || m("red");
        }
        function i(e, t, n) {
            return new x(O, u(e), _.ensurePercent(t), _.ensurePercent(n), 1, !1);
        }
        function o(e, t, n, r) {
            return new x(O, u(e), _.ensurePercent(t), _.ensurePercent(n), _.ensurePercent(r), !0);
        }
        function a(e, t, n) {
            return new x(k, e, t, n, 1, !1);
        }
        function s(e, t, n, r) {
            return new x(k, e, t, n, _.ensurePercent(r), !0);
        }
        function l(e) {
            var t = Math.round(e);
            return (t < 16 ? "0" : "") + t.toString(16);
        }
        function u(e) {
            return ((e < 0 ? 360 : 0) + e % 360) % 360;
        }
        function c(e, t) {
            return Math.round(Math.pow(10, t) * e) * Math.pow(10, -t);
        }
        function d(e, t, n, r, i) {
            var o, a = e / 255, s = t / 255, l = n / 255, u = Math.min(a, s, l), c = Math.max(a, s, l), d = (u + c) / 2, f = c - u;
            o = c === u ? 0 : a === c ? (s - l) / f : s === c ? 2 + (l - a) / f : l === c ? 4 + (a - s) / f : 0, 
            (o = Math.min(60 * o, 360)) < 0 && (o += 360);
            var p;
            return p = c === u ? 0 : d <= .5 ? f / (c + u) : f / (2 - c - u), new x(O, o, p, d, r, i);
        }
        function f(e, t, n, r, i) {
            var o = e / 360, a = t, s = n;
            if (0 === a) {
                var l = 255 * s;
                return new x(k, l, l, l, r, i);
            }
            for (var u = s < .5 ? s * (1 + a) : s + a - s * a, c = 2 * s - u, d = 0, f = 0, p = 0, h = 0; h < 3; h++) {
                var v = o + 1 / 3 * -(h - 1);
                v < 0 && v++, v > 1 && v--;
                var l = void 0;
                l = 6 * v < 1 ? c + 6 * (u - c) * v : 2 * v < 1 ? u : 3 * v < 2 ? c + (u - c) * (2 / 3 - v) * 6 : c, 
                l *= 255, 0 === h ? d = l : 1 === h ? f = l : p = l;
            }
            return new x(k, d, f, p, r, i);
        }
        function p(e, t, n, r, i, o, a) {
            return e === t ? new x(e, n, r, i, o, a) : N[e - t](n, r, i, o, a);
        }
        function h(e, t, n, r) {
            if (!w) return [ e || 0, t || 0, n || 0, r || 0 ];
            var i = new Float32Array(4);
            return i[0] = e || 0, i[1] = t || 0, i[2] = n || 0, i[3] = r || 0, i;
        }
        function v(e, t, n) {
            var r = E[e][t];
            return n < 0 ? 0 : n > r ? r : n;
        }
        function g(e) {
            return e instanceof x ? e : r(e);
        }
        function m(e) {
            return S[e] || void 0;
        }
        function y(e) {
            var t = e.match(/#(([a-f0-9]{6})|([a-f0-9]{3}))$/i);
            if (t) {
                var n = t[1], r = parseInt(3 === n.length ? n[0] + n[0] + n[1] + n[1] + n[2] + n[2] : n, 16);
                return new x(k, r >> 16 & 255, r >> 8 & 255, 255 & r, 1, !1);
            }
        }
        function b(e) {
            var t = _.parseCSSFunction(e);
            if (t && (4 === t.length || 5 === t.length)) {
                var n, r = t[0], i = "rgba" === r, o = "hsla" === r, a = "rgb" === r, s = "hsl" === r, l = o || i;
                if (a || i) n = k; else {
                    if (!s && !o) throw new Error("unsupported color string");
                    n = O;
                }
                var u = parseFloat(t[1]), c = a || i ? parseFloat(t[2]) : _.ensurePercent(t[2]), d = a || i ? parseFloat(t[3]) : _.ensurePercent(t[3]), f = l ? parseFloat(t[4]) : 1;
                return new x(n, u, c, d, f, l);
            }
        }
        var _ = n(17), w = "undefined" != typeof Float32Array, k = 0, O = 1, N = (C = {}, 
        C[k - O] = d, C[O - k] = f, C), E = (T = {}, T[k] = h(255, 255, 255, 1), T[O] = h(360, 1, 1, 1), 
        T);
        t.color = r, t.hsl = i, t.hsla = o, t.rgb = a, t.rgba = s;
        var x = function() {
            function e(e, t, n, r, i, o) {
                this._format = e, this._hasAlpha = o, this._values = h(v(e, 0, t), v(e, 1, n), v(e, 2, r), v(e, 3, i));
            }
            return e.convertHelper = function(e, t) {
                var n = t._format, r = t._values, i = t._hasAlpha;
                return n === e ? t : N[n - e](r[0], r[1], r[2], r[3], i);
            }, e.prototype.toString = function() {
                var e, t, n = this._format, r = this._values, i = this._hasAlpha;
                if (n === k) e = i ? "rgba" : "rgb", t = [ Math.round(r[0]), Math.round(r[1]), Math.round(r[2]) ]; else {
                    if (n !== O) throw new Error("Invalid color format");
                    e = i ? "hsla" : "hsl", t = [ Math.round(r[0]), _.formatPercent(c(r[1], 2)), _.formatPercent(c(r[2], 2)) ];
                }
                return i && t.push(c(r[3], 5)), _.cssFunction(e, t);
            }, e.prototype.toHexString = function() {
                var t = e.convertHelper(k, this)._values;
                return "#" + (l(t[0]) + l(t[1]) + l(t[2])).toUpperCase();
            }, e.prototype.toHSL = function() {
                var e = this._values;
                return p(this._format, O, e[0], e[1], e[2], 1, !1);
            }, e.prototype.toHSLA = function() {
                var e = this._values;
                return p(this._format, O, e[0], e[1], e[2], e[3], !0);
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
                return (this._format === O ? this : this.toHSL())._values[0];
            }, e.prototype.saturation = function() {
                return (this._format === O ? this : this.toHSL())._values[1];
            }, e.prototype.lightness = function() {
                return (this._format === O ? this : this.toHSL())._values[2];
            }, e.prototype.alpha = function() {
                return this._values[3];
            }, e.prototype.opacity = function() {
                return this.alpha();
            }, e.prototype.invert = function() {
                var t = e.convertHelper(k, this)._values;
                return e.convertHelper(this._format, new e(k, 255 - t[0], 255 - t[1], 255 - t[2], this._values[3], this._hasAlpha));
            }, e.prototype.lighten = function(t, n) {
                var r = e.convertHelper(O, this)._values, i = E[O][2], o = r[2] + (n ? i - r[2] : i) * _.ensurePercent(t);
                return e.convertHelper(this._format, new e(O, r[0], r[1], o, this._values[3], this._hasAlpha));
            }, e.prototype.darken = function(t, n) {
                var r = e.convertHelper(O, this)._values, i = r[2] - (n ? r[2] : E[O][2]) * _.ensurePercent(t);
                return e.convertHelper(this._format, new e(O, r[0], r[1], i, this._values[3], this._hasAlpha));
            }, e.prototype.saturate = function(t, n) {
                var r = e.convertHelper(O, this)._values, i = E[O][1], o = r[1] + (n ? i - r[1] : i) * _.ensurePercent(t);
                return e.convertHelper(this._format, new e(O, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.desaturate = function(t, n) {
                var r = e.convertHelper(O, this)._values, i = E[O][1], o = r[1] - (n ? r[1] : i) * _.ensurePercent(t);
                return e.convertHelper(this._format, new e(O, r[0], o, r[2], this._values[3], this._hasAlpha));
            }, e.prototype.grayscale = function() {
                return this.desaturate(1);
            }, e.prototype.fade = function(t) {
                var n = this._values, r = v(k, 3, _.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, n[0], n[1], n[2], r, !0));
            }, e.prototype.fadeOut = function(t, n) {
                var r = this._values, i = v(k, 3, r[3] - (n ? r[3] : 1) * _.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, r[0], r[1], r[2], i, !0));
            }, e.prototype.fadeIn = function(t, n) {
                var r = this._values, i = v(k, 3, r[3] + (n ? r[3] : 1) * _.ensurePercent(t));
                return e.convertHelper(this._format, new e(this._format, r[0], r[1], r[2], i, !0));
            }, e.prototype.mix = function(t, n) {
                var r = this, i = g(t), o = e.convertHelper(k, r)._values, a = e.convertHelper(k, i)._values, s = void 0 === n ? .5 : n, l = 2 * s - 1, u = Math.abs(o[3] - a[3]), c = ((l * u == -1 ? l : (l + u) / (1 + l * u)) + 1) / 2, d = 1 - c, f = new e(k, Math.round(o[0] * c + a[0] * d), Math.round(o[1] * c + a[1] * d), Math.round(o[2] * c + a[2] * d), o[3] * s + a[3] * (1 - s), r._hasAlpha || i._hasAlpha);
                return e.convertHelper(this._format, f);
            }, e.prototype.tint = function(e) {
                return t.white.mix(this, e);
            }, e.prototype.shade = function(e) {
                return t.black.mix(this, e);
            }, e.prototype.spin = function(t) {
                var n = e.convertHelper(O, this)._values;
                return e.convertHelper(this._format, new e(O, u(n[0] + t), n[1], n[2], this._values[3], this._hasAlpha));
            }, e;
        }();
        t.ColorHelper = x;
        var S = {
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
        t.aliceblue = S.aliceblue, t.antiquewhite = S.antiquewhite, t.aqua = S.aqua, t.aquamarine = S.aquamarine, 
        t.azure = S.azure, t.beige = S.beige, t.bisque = S.bisque, t.black = S.black, t.blanchedalmond = S.blanchedalmond, 
        t.blue = S.blue, t.blueviolet = S.blueviolet, t.brown = S.brown, t.burlywood = S.burlywood, 
        t.cadetblue = S.cadetblue, t.chartreuse = S.chartreuse, t.chocolate = S.chocolate, 
        t.coral = S.coral, t.cornflowerblue = S.cornflowerblue, t.cornsilk = S.cornsilk, 
        t.crimson = S.crimson, t.cyan = S.cyan, t.darkblue = S.darkblue, t.darkcyan = S.darkcyan, 
        t.darkgoldenrod = S.darkgoldenrod, t.darkgray = S.darkgray, t.darkgreen = S.darkgreen, 
        t.darkgrey = S.darkgrey, t.darkkhaki = S.darkkhaki, t.darkmagenta = S.darkmagenta, 
        t.darkolivegreen = S.darkolivegreen, t.darkorange = S.darkorange, t.darkorchid = S.darkorchid, 
        t.darkred = S.darkred, t.darksalmon = S.darksalmon, t.darkseagreen = S.darkseagreen, 
        t.darkslateblue = S.darkslateblue, t.darkslategray = S.darkslategray, t.darkslategrey = S.darkslategrey, 
        t.darkturquoise = S.darkturquoise, t.darkviolet = S.darkviolet, t.deeppink = S.deeppink, 
        t.deepskyblue = S.deepskyblue, t.dimgray = S.dimgray, t.dimgrey = S.dimgrey, t.dodgerblue = S.dodgerblue, 
        t.firebrick = S.firebrick, t.floralwhite = S.floralwhite, t.forestgreen = S.forestgreen, 
        t.fuchsia = S.fuchsia, t.gainsboro = S.gainsboro, t.ghostwhite = S.ghostwhite, t.gold = S.gold, 
        t.goldenrod = S.goldenrod, t.gray = S.gray, t.green = S.green, t.greenyellow = S.greenyellow, 
        t.grey = S.grey, t.honeydew = S.honeydew, t.hotpink = S.hotpink, t.indianred = S.indianred, 
        t.indigo = S.indigo, t.ivory = S.ivory, t.khaki = S.khaki, t.lavender = S.lavender, 
        t.lavenderblush = S.lavenderblush, t.lawngreen = S.lawngreen, t.lemonchiffon = S.lemonchiffon, 
        t.lightblue = S.lightblue, t.lightcoral = S.lightcoral, t.lightcyan = S.lightcyan, 
        t.lightgoldenrodyellow = S.lightgoldenrodyellow, t.lightgray = S.lightgray, t.lightgreen = S.lightgreen, 
        t.lightgrey = S.lightgrey, t.lightpink = S.lightpink, t.lightsalmon = S.lightsalmon, 
        t.lightseagreen = S.lightseagreen, t.lightskyblue = S.lightskyblue, t.lightslategray = S.lightslategray, 
        t.lightslategrey = S.lightslategrey, t.lightsteelblue = S.lightsteelblue, t.lightyellow = S.lightyellow, 
        t.lime = S.lime, t.limegreen = S.limegreen, t.linen = S.linen, t.maroon = S.maroon, 
        t.mediumaquamarine = S.mediumaquamarine, t.mediumblue = S.mediumblue, t.mediumorchid = S.mediumorchid, 
        t.mediumpurple = S.mediumpurple, t.mediumseagreen = S.mediumseagreen, t.mediumslateblue = S.mediumslateblue, 
        t.mediumspringgreen = S.mediumspringgreen, t.mediumturquoise = S.mediumturquoise, 
        t.mediumvioletred = S.mediumvioletred, t.midnightblue = S.midnightblue, t.mintcream = S.mintcream, 
        t.mistyrose = S.mistyrose, t.moccasin = S.moccasin, t.navajowhite = S.navajowhite, 
        t.navy = S.navy, t.oldlace = S.oldlace, t.olive = S.olive, t.olivedrab = S.olivedrab, 
        t.orange = S.orange, t.purple = S.purple, t.rebeccapurple = S.rebeccapurple, t.red = S.red, 
        t.silver = S.silver, t.teal = S.teal, t.transparent = S.transparent, t.white = S.white, 
        t.yellow = S.yellow;
        var C, T;
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
        var a = n(17);
        t.linearGradient = r, t.repeatingLinearGradient = i;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
        }
        r(n(43)), r(n(44)), r(n(46)), r(n(47)), r(n(48)), r(n(49)), r(n(42));
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
            return E.cssFunction("matrix", [ e, t, n, r, i, o ]);
        }
        function o(e, t, n, r, i, o, a, s, l, u, c, d, f, p, h, v) {
            return E.cssFunction("matrix3d", [ e, t, n, r, i, o, a, s, l, u, c, d, f, p, h, v ]);
        }
        function a(e) {
            return E.cssFunction("perspective", [ e ]);
        }
        function s(e) {
            return E.cssFunction("rotate", [ e ]);
        }
        function l(e, t, n) {
            return E.cssFunction("rotate3d", [ e, t, n ]);
        }
        function u(e) {
            return E.cssFunction("rotateX", [ e ]);
        }
        function c(e) {
            return E.cssFunction("rotateY", [ e ]);
        }
        function d(e) {
            return E.cssFunction("rotateZ", [ e ]);
        }
        function f(e, t) {
            return E.cssFunction("scale", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function p(e, t, n) {
            return E.cssFunction("scale3d", [ e, t, n ]);
        }
        function h(e) {
            return E.cssFunction("scaleX", [ e ]);
        }
        function v(e) {
            return E.cssFunction("scaleY", [ e ]);
        }
        function g(e) {
            return E.cssFunction("scaleZ", [ e ]);
        }
        function m(e, t) {
            return E.cssFunction("skew", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function y(e) {
            return E.cssFunction("skewX", [ e ]);
        }
        function b(e) {
            return E.cssFunction("skewY", [ e ]);
        }
        function _(e, t) {
            return E.cssFunction("translate", t || 0 === t ? [ e, t ] : [ e ]);
        }
        function w(e, t, n) {
            return E.cssFunction("translate3d", [ e, t, n ]);
        }
        function k(e) {
            return E.cssFunction("translateX", [ e ]);
        }
        function O(e) {
            return E.cssFunction("translateY", [ e ]);
        }
        function N(e) {
            return E.cssFunction("translateZ", [ e ]);
        }
        var E = n(17);
        t.transform = r, t.matrix = i, t.matrix3d = o, t.perspective = a, t.rotate = s, 
        t.rotate3d = l, t.rotateX = u, t.rotateY = c, t.rotateZ = d, t.scale = f, t.scale3d = p, 
        t.scaleX = h, t.scaleY = v, t.scaleZ = g, t.skew = m, t.skewX = y, t.skewY = b, 
        t.translate = _, t.translate3d = w, t.translateX = k, t.translateY = O, t.translateZ = N;
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
        function l(e) {
            return e + "vh";
        }
        function u(e) {
            return e + "vw";
        }
        function c(e) {
            return e + "turn";
        }
        t.percent = r, t.px = i, t.em = o, t.rad = a, t.rem = s, t.viewHeight = l, t.viewWidth = u, 
        t.turn = c;
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
        var o = n(50);
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
            return l(document.body, e, t, n);
        }
        var s = n(52), l = n(51);
        e.exports = r;
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            function r(e, t) {
                if (28 & e.flags) {
                    var n = e.parentVNode;
                    n && (n.dom = t, r(n, t));
                }
            }
            function i(e, t, n) {
                var r = c.get(e);
                void 0 === r && (r = [], c.set(e, r), d.then(function() {
                    c.delete(e), e._updating = !0, a(e, t, function() {
                        for (var t = 0, n = r.length; t < n; t++) r[t].call(e);
                    }), e._updating = !1;
                })), l.isNullOrUndef(n) || r.push(n);
            }
            function o(e, t, n) {
                l.isFunction(t) && (t = t(e.state, e.props, e.context));
                var r = e._pendingState;
                if (null === r) e._pendingState = r = t; else for (var o in t) r[o] = t[o];
                if (!l.isBrowser || e._pendingSetState || e._blockRender) {
                    var s = e.state;
                    if (null === s) e.state = r; else for (var u in r) s[u] = r[u];
                    e._pendingState = null, !l.isNullOrUndef(n) && e._blockRender && e._lifecycle.addListener(n.bind(e));
                } else e._updating ? i(e, !1, n) : (e._pendingSetState = !0, e._updating = !0, a(e, !1, n), 
                e._updating = !1);
            }
            function a(t, n, i) {
                if (!t._unmounted) {
                    if (n || !t._blockRender) {
                        t._pendingSetState = !1;
                        var o = t._pendingState, a = t.state, u = l.combineFrom(a, o), c = t.props, d = t.context;
                        t._pendingState = null;
                        var f = t._updateComponent(a, u, c, c, d, n, !0), p = !0;
                        l.isInvalid(f) ? f = s.createVNode(4096, null) : f === l.NO_OP ? (f = t._lastInput, 
                        p = !1) : l.isStringOrNumber(f) ? f = s.createVNode(1, null, null, f) : l.isArray(f) && ("production" !== e.env.NODE_ENV && l.throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object."), 
                        l.throwError());
                        var h = t._lastInput, v = t._vNode, g = h.dom && h.dom.parentNode || (h.dom = v.dom);
                        if (t._lastInput = f, p) {
                            var m = void 0;
                            l.isUndefined(t.getChildContext) || (m = t.getChildContext()), m = l.isNullOrUndef(m) ? t._childContext : l.combineFrom(d, m);
                            var y = t._lifecycle;
                            s.internal_patch(h, f, g, y, m, t._isSVG, !1), y.trigger(), l.isUndefined(t.componentDidUpdate) || t.componentDidUpdate(c, a, d), 
                            l.isNull(s.options.afterUpdate) || s.options.afterUpdate(v);
                        }
                        var b = v.dom = f.dom;
                        s.options.findDOMNodeEnabled && s.internal_DOMNodeMap.set(t, f.dom), r(v, b);
                    } else t.state = t._pendingState, t._pendingState = null;
                    l.isNullOrUndef(i) || i.call(t);
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var s = n(20), l = n(0), u = l.ERROR_MSG;
            "production" !== e.env.NODE_ENV && (u = "Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.");
            var c = new Map(), d = Promise.resolve(), f = !1, p = function() {
                function t(e, t) {
                    this.state = null, this._blockRender = !1, this._blockSetState = !0, this._pendingSetState = !1, 
                    this._pendingState = null, this._lastInput = null, this._vNode = null, this._unmounted = !1, 
                    this._lifecycle = null, this._childContext = null, this._isSVG = !1, this._updating = !0, 
                    this.props = e || s.EMPTY_OBJ, this.context = t || s.EMPTY_OBJ;
                }
                return t.prototype.forceUpdate = function(e) {
                    !this._unmounted && l.isBrowser && a(this, !0, e);
                }, t.prototype.setState = function(t, n) {
                    this._unmounted || (this._blockSetState ? ("production" !== e.env.NODE_ENV && l.throwError("cannot update state via setState() in componentWillUpdate() or constructor."), 
                    l.throwError()) : o(this, t, n));
                }, t.prototype.setStateSync = function(t) {
                    "production" !== e.env.NODE_ENV && (f || (f = !0, console.warn("Inferno WARNING: setStateSync has been deprecated and will be removed in next release. Use setState instead."))), 
                    this.setState(t);
                }, t.prototype._updateComponent = function(t, n, r, i, o, a, c) {
                    if (!0 === this._unmounted && ("production" !== e.env.NODE_ENV && l.throwError(u), 
                    l.throwError()), r !== i || i === s.EMPTY_OBJ || t !== n || a) {
                        if (r === i && i !== s.EMPTY_OBJ || (l.isUndefined(this.componentWillReceiveProps) || c || (this._blockRender = !0, 
                        this.componentWillReceiveProps(i, o), this._blockRender = !1), this._pendingSetState && (n = l.combineFrom(n, this._pendingState), 
                        this._pendingSetState = !1, this._pendingState = null)), l.isUndefined(this.shouldComponentUpdate) || this.shouldComponentUpdate(i, n, o) || a) {
                            l.isUndefined(this.componentWillUpdate) || (this._blockSetState = !0, this.componentWillUpdate(i, n, o), 
                            this._blockSetState = !1), this.props = i, this.state = n, this.context = o, s.options.beforeRender && s.options.beforeRender(this);
                            var d = this.render(i, n, o);
                            return s.options.afterRender && s.options.afterRender(this), d;
                        }
                        this.props = i, this.state = n, this.context = o;
                    }
                    return l.NO_OP;
                }, t.prototype.render = function(e, t, n) {}, t;
            }();
            t.default = p;
        }).call(t, n(2));
    }, function(e, t, n) {
        e.exports = n(54).default, e.exports.default = e.exports;
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
            if (o.isInvalid(e) || o.isObject(e)) throw new Error("Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.");
            var s, l = n, u = null, c = null, d = null, f = 0;
            if (n && (1 === n.length ? l = n[0] : 0 === n.length && (l = void 0)), o.isString(e)) {
                if (f = i.getFlagsForElementVnode(e), !o.isNullOrUndef(t)) {
                    s = {};
                    for (var p in t) "className" === p || "class" === p ? d = t[p] : "key" === p ? c = t.key : "children" === p && o.isUndefined(l) ? l = t.children : "ref" === p ? u = t.ref : s[p] = t[p];
                }
            } else if (f = 16, o.isUndefined(l) || (t || (t = {}), t.children = l, l = null), 
            !o.isNullOrUndef(t)) {
                s = {};
                for (var p in t) a.has(p) ? (u || (u = {}), u[p] = t[p]) : "key" === p ? c = t.key : s[p] = t[p];
            }
            return i.createVNode(f, e, d, l, s, c, u);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(20), o = n(0), a = new Set();
        a.add("onComponentWillMount"), a.add("onComponentDidMount"), a.add("onComponentWillUnmount"), 
        a.add("onComponentShouldUpdate"), a.add("onComponentWillUpdate"), a.add("onComponentDidUpdate"), 
        t.default = r;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return t.isArray(e) ? e : e ? [ e ] : e;
        }
        function i(e) {
            return !p(e.prototype) && !p(e.prototype.render);
        }
        function o(e) {
            var t = typeof e;
            return "string" === t || "number" === t;
        }
        function a(e) {
            return p(e) || d(e);
        }
        function s(e) {
            return d(e) || !1 === e || f(e) || p(e);
        }
        function l(e) {
            return "function" == typeof e;
        }
        function u(e) {
            return "string" == typeof e;
        }
        function c(e) {
            return "number" == typeof e;
        }
        function d(e) {
            return null === e;
        }
        function f(e) {
            return !0 === e;
        }
        function p(e) {
            return void 0 === e;
        }
        function h(e) {
            return "object" == typeof e;
        }
        function v(e) {
            throw e || (e = t.ERROR_MSG), new Error("Inferno Error: " + e);
        }
        function g(e) {
            console.warn(e);
        }
        function m(e, t) {
            var n = {};
            if (e) for (var r in e) n[r] = e[r];
            if (t) for (var r in t) n[r] = t[r];
            return n;
        }
        function y() {
            this.listeners = [];
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.NO_OP = "$NO_OP", t.ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.", 
        t.isBrowser = !("undefined" == typeof window || !window.document), t.toArray = r, 
        t.isArray = Array.isArray, t.isStatefulComponent = i, t.isStringOrNumber = o, t.isNullOrUndef = a, 
        t.isInvalid = s, t.isFunction = l, t.isString = u, t.isNumber = c, t.isNull = d, 
        t.isTrue = f, t.isUndefined = p, t.isObject = h, t.throwError = v, t.warning = g, 
        t.combineFrom = m, t.Lifecycle = y, y.prototype.addListener = function(e) {
            this.listeners.push(e);
        }, y.prototype.trigger = function() {
            for (var e, t = this.listeners; e = t.shift(); ) e();
        };
    }, function(e, t, n) {
        "use strict";
        function r(e, t, n, r) {
            var i = f.get(e);
            if (n) i || (i = {
                items: new Map(),
                docEvent: null
            }, i.docEvent = s(e, i), f.set(e, i)), t || d && "onClick" === e && u(r), i.items.set(r, n); else if (i) {
                var a = i.items;
                a.delete(r) && 0 === a.size && (document.removeEventListener(o(e), i.docEvent), 
                f.delete(e));
            }
        }
        function i(e, t, n, r, o, a) {
            var s = n.get(t);
            if ((!s || (r--, a.dom = t, s.event ? s.event(s.data, e) : s(e), !e.cancelBubble)) && r > 0) {
                var l = t.parentNode;
                if (null === l || o && 1 === l.nodeType && l.disabled) return;
                i(e, l, n, r, o, a);
            }
        }
        function o(e) {
            return e.substr(2).toLowerCase();
        }
        function a() {
            this.cancelBubble = !0, this.stopImmediatePropagation();
        }
        function s(e, t) {
            var n = function(e) {
                var n = t.items.size;
                if (n > 0) {
                    e.stopPropagation = a;
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
                    i(e, e.target, t.items, n, "click" === e.type, r);
                }
            };
            return document.addEventListener(o(e), n), n;
        }
        function l() {}
        function u(e) {
            e.onclick = l;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = n(0), d = c.isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform), f = new Map();
        t.handleEvent = r;
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            return {
                data: e,
                event: t
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.linkEvent = r;
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            function r(e) {
                for (var t = e.firstChild; t; ) if (8 === t.nodeType) if ("!" === t.data) {
                    var n = document.createTextNode("");
                    e.replaceChild(n, t), t = t.nextSibling;
                } else {
                    var r = t.previousSibling;
                    e.removeChild(t), t = r || e.firstChild;
                } else t = t.nextSibling;
            }
            function i(e, t, n, r, i, o) {
                var a = e.type, s = e.ref;
                e.dom = t;
                var l = e.props || m.EMPTY_OBJ;
                if (o) {
                    var c = t.namespaceURI === p.svgNS, d = m.createClassComponentInstance(e, a, l, r, c, n), v = d._lastInput;
                    d._vNode = e, u(v, t, n, d._childContext, c), h.mountClassComponentCallbacks(e, s, d, n), 
                    d._updating = !1, f.options.findDOMNodeEnabled && g.componentToDOMNodeMap.set(d, t);
                } else {
                    var v = m.createFunctionalComponentInput(e, a, l, r);
                    u(v, t, n, r, i), e.children = v, e.dom = v.dom, h.mountFunctionalComponentCallbacks(s, t, n);
                }
                return t;
            }
            function o(t, n, r, i, o) {
                var s = t.children, l = t.props, u = t.className, c = t.flags, f = t.ref;
                if (o = o || (128 & c) > 0, 1 !== n.nodeType || n.tagName.toLowerCase() !== t.type) {
                    "production" !== e.env.NODE_ENV && d.warning("Inferno hydration: Server-side markup doesn't match client-side markup or Initial render target is not empty");
                    var p = h.mountElement(t, null, r, i, o);
                    return t.dom = p, m.replaceChild(n.parentNode, p, n), p;
                }
                if (t.dom = n, s && a(s, n, r, i, o), l) {
                    var g = !1, b = (3584 & c) > 0;
                    b && (g = y.isControlledFormElement(l));
                    for (var _ in l) v.patchProp(_, null, l[_], n, o, g);
                    b && y.processElement(c, t, n, l, !0, g);
                }
                return d.isNullOrUndef(u) ? n.removeAttribute("class") : o ? n.setAttribute("class", u) : n.className = u, 
                f && h.mountRef(n, f, r), n;
            }
            function a(e, t, n, i, o) {
                r(t);
                var a = t.firstChild;
                if (d.isArray(e)) for (var s = 0, l = e.length; s < l; s++) {
                    var c = e[s];
                    !d.isNull(c) && d.isObject(c) && (d.isNull(a) ? h.mount(c, t, n, i, o) : a = u(c, a, n, i, o).nextSibling);
                } else d.isStringOrNumber(e) ? (a && 3 === a.nodeType ? a.nodeValue !== e && (a.nodeValue = e) : e && (t.textContent = e), 
                a = a.nextSibling) : d.isObject(e) && (u(e, a, n, i, o), a = a.nextSibling);
                for (;a; ) {
                    var f = a.nextSibling;
                    t.removeChild(a), a = f;
                }
            }
            function s(e, t) {
                if (3 !== t.nodeType) {
                    var n = h.mountText(e, null);
                    return e.dom = n, m.replaceChild(t.parentNode, n, t), n;
                }
                var r = e.children;
                return t.nodeValue !== r && (t.nodeValue = r), e.dom = t, t;
            }
            function l(e, t) {
                return e.dom = t, t;
            }
            function u(t, n, r, a, u) {
                var c = t.flags;
                return 28 & c ? i(t, n, r, a, u, (4 & c) > 0) : 3970 & c ? o(t, n, r, a, u) : 1 & c ? s(t, n) : 4096 & c ? l(t, n) : ("production" !== e.env.NODE_ENV && d.throwError('hydrate() expects a valid VNode, instead it received an object with the type "' + typeof t + '".'), 
                void d.throwError());
            }
            function c(e, t, n) {
                if (!d.isNull(t)) {
                    var r = t.firstChild;
                    if (!d.isNull(r)) {
                        for (u(e, r, n, m.EMPTY_OBJ, !1), r = t.firstChild; r = r.nextSibling; ) t.removeChild(r);
                        return !0;
                    }
                }
                return !1;
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var d = n(0), f = n(3), p = n(12), h = n(13), v = n(6), g = n(8), m = n(1), y = n(19);
            t.normalizeChildNodes = r, t.hydrateRoot = c;
        }).call(t, n(2));
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return "checkbox" === e || "radio" === e;
        }
        function i(e) {
            var t = this, n = t.props || c.EMPTY_OBJ, r = t.dom, i = n.value;
            if (n.onInput) {
                var o = n.onInput;
                o.event ? o.event(o.data, e) : o(e);
            } else n.oninput && n.oninput(e);
            var a = this, s = a.props || c.EMPTY_OBJ;
            i !== s.value && l(s, r);
        }
        function o(e) {
            var t = this.props || c.EMPTY_OBJ, n = t.onChange;
            n.event ? n.event(n.data, e) : n(e);
        }
        function a(e) {
            e.stopPropagation();
            var t = this, n = t.props || c.EMPTY_OBJ, r = t.dom, i = n.value;
            if (n.onClick) {
                var o = n.onClick;
                o.event ? o.event(o.data, e) : o(e);
            } else n.onclick && n.onclick(e);
            var a = this, s = a.props || c.EMPTY_OBJ;
            i !== s.value && l(s, r);
        }
        function s(e, t, n, s, u) {
            l(n, t), s && u && (r(n.type) ? (t.onclick = a.bind(e), t.onclick.wrapped = !0) : (t.oninput = i.bind(e), 
            t.oninput.wrapped = !0), n.onChange && (t.onchange = o.bind(e), t.onchange.wrapped = !0));
        }
        function l(e, t) {
            var n = e.type, i = e.value, o = e.checked, a = e.multiple, s = e.defaultValue, l = !u.isNullOrUndef(i);
            n && n !== t.type && t.setAttribute("type", n), a && a !== t.multiple && (t.multiple = a), 
            u.isNullOrUndef(s) || l || (t.defaultValue = s + ""), r(n) ? (l && (t.value = i), 
            u.isNullOrUndef(o) || (t.checked = o)) : l && t.value !== i ? t.value = i : u.isNullOrUndef(o) || (t.checked = o);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = n(0), c = n(1);
        t.isCheckedType = r, t.processInput = s, t.applyValue = l;
    }, function(e, t, n) {
        "use strict";
        function r(e, t) {
            if ("optgroup" === e.type) {
                var n = e.children;
                if (l.isArray(n)) for (var r = 0, o = n.length; r < o; r++) i(n[r], t); else u.isVNode(n) && i(n, t);
            } else i(e, t);
        }
        function i(e, t) {
            var n = e.props || c.EMPTY_OBJ, r = e.dom;
            r.value = n.value, l.isArray(t) && -1 !== t.indexOf(n.value) || n.value === t ? r.selected = !0 : l.isNullOrUndef(t) && l.isNullOrUndef(n.selected) || (r.selected = n.selected || !1);
        }
        function o(e) {
            var t = this, n = t.props || c.EMPTY_OBJ, r = t.dom, i = n.value;
            if (n.onChange) {
                var o = n.onChange;
                o.event ? o.event(o.data, e) : o(e);
            } else n.onchange && n.onchange(e);
            var a = this, l = a.props || c.EMPTY_OBJ;
            i !== l.value && s(a, r, l, !1);
        }
        function a(e, t, n, r, i) {
            s(e, t, n, r), r && i && (t.onchange = o.bind(e), t.onchange.wrapped = !0);
        }
        function s(e, t, n, i) {
            n.multiple !== t.multiple && (t.multiple = n.multiple);
            var o = e.children;
            if (!l.isInvalid(o)) {
                var a = n.value;
                if (i && l.isNullOrUndef(a) && (a = n.defaultValue), l.isArray(o)) for (var s = 0, c = o.length; s < c; s++) r(o[s], a); else u.isVNode(o) && r(o, a);
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var l = n(0), u = n(4), c = n(1);
        t.processSelect = a, t.applyValue = s;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            var t = this.props || l.EMPTY_OBJ, n = t.onChange;
            n.event ? n.event(n.data, e) : n(e);
        }
        function i(e) {
            var t = this, n = t.props || l.EMPTY_OBJ, r = n.value;
            if (n.onInput) {
                var i = n.onInput;
                i.event ? i.event(i.data, e) : i(e);
            } else n.oninput && n.oninput(e);
            var o = this;
            r !== (o.props || l.EMPTY_OBJ).value && a(o, t.dom, !1);
        }
        function o(e, t, n, o, s) {
            a(n, t, o), o && s && (t.oninput = i.bind(e), t.oninput.wrapped = !0, n.onChange && (t.onchange = r.bind(e), 
            t.onchange.wrapped = !0));
        }
        function a(e, t, n) {
            var r = e.value, i = t.value;
            if (s.isNullOrUndef(r)) {
                if (n) {
                    var o = e.defaultValue;
                    s.isNullOrUndef(o) ? "" !== i && (t.value = "") : o !== i && (t.value = o);
                }
            } else i !== r && (t.value = r);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(0), l = n(1);
        t.processTextarea = o, t.applyValue = a;
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(0);
            t.NO_OP = r.NO_OP;
            var i = n(31);
            t.getFlagsForElementVnode = i.getFlagsForElementVnode, t.internal_normalize = i.normalize;
            var o = n(3);
            t.options = o.options;
            var a = n(4);
            t.cloneVNode = a.cloneVNode, t.createVNode = a.createVNode;
            var s = n(12);
            t.internal_isUnitlessNumber = s.isUnitlessNumber;
            var l = n(59);
            t.linkEvent = l.linkEvent;
            var u = n(6);
            t.internal_patch = u.patch;
            var c = n(8);
            t.internal_DOMNodeMap = c.componentToDOMNodeMap, t.createRenderer = c.createRenderer, 
            t.findDOMNode = c.findDOMNode, t.render = c.render;
            var d = n(1);
            if (t.EMPTY_OBJ = d.EMPTY_OBJ, "production" !== e.env.NODE_ENV) {
                var f = function() {};
                -1 === (f.name || f.toString()).indexOf("testFn") && r.warning("It looks like you're using a minified copy of the development build of Inferno. When deploying Inferno apps to production, make sure to use the production build which skips development warnings and is faster. See http://infernojs.org for more details.");
            }
            t.version = "3.1.0", t.default = {
                getFlagsForElementVnode: i.getFlagsForElementVnode,
                linkEvent: l.linkEvent,
                createVNode: a.createVNode,
                cloneVNode: a.cloneVNode,
                NO_OP: r.NO_OP,
                EMPTY_OBJ: d.EMPTY_OBJ,
                render: c.render,
                findDOMNode: c.findDOMNode,
                createRenderer: c.createRenderer,
                options: o.options,
                version: "3.1.0",
                internal_patch: u.patch,
                internal_DOMNodeMap: c.componentToDOMNodeMap,
                internal_isUnitlessNumber: s.isUnitlessNumber,
                internal_normalize: i.normalize
            };
        }).call(t, n(2));
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
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(38), i = n(26), o = n(28), a = n(27);
        n.d(t, "ui", function() {
            return s;
        }), n.d(t, "utils", function() {
            return l;
        }), t.default = r;
        var s = r, l = {
            entityTree: i,
            webpack: o,
            yoyo: a
        };
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
                contenteditable: !r,
                oninput: function(e) {
                    return t("updateEditedValue", e.target.textContent);
                }
            }, i ] ];
        }
        function i(e, t, i) {
            var o = e.entity, c = e.watching, d = [ "div", {
                style: "margin-top: 4px"
            } ];
            return c ? (d.push([ "button", {
                class: l.b,
                onclick: function() {
                    return t("setEntityEditMode", !0);
                }
            }, "Edit" ], n.i(s.a)({
                key: "inspect-btn" + o.id,
                onclick: function() {
                    return t("flowEntityInspect", o.id);
                },
                icon: a.f(),
                title: "Inspect entity value"
            })), o.value && d.push(n.i(s.a)({
                key: "reset-btn" + o.id,
                onclick: function() {
                    return t("flowEntityReset", o.id);
                },
                icon: a.g(),
                title: "Reset entity value"
            }))) : d.push([ "button", {
                class: l.b,
                "data-key": "cancel-btn",
                onclick: function() {
                    return t("setEntityEditMode", !1);
                }
            }, "Cancel" ], [ "button", {
                class: l.b,
                "data-key": "save-btn" + o.id,
                onclick: function() {
                    return t("saveCurrentEntityValue", o.id);
                }
            }, "Save" ]), [ "section", {
                "data-key": "entity-view",
                class: u.d
            }, [ "div", {
                class: u.c
            }, i(r, "state.gui.entityValueView") ], d ];
        }
        function o(e, t) {
            var r = [ "div", {
                "data-key": "process-buttons",
                style: "margin-top: 4px"
            } ];
            return r.push(n.i(s.a)({
                onclick: function() {
                    return t("flowProcessRun", e.id);
                },
                icon: a.h(),
                title: "Run process"
            })), e.async && r.push(n.i(s.a)({
                onclick: function() {
                    return t("flowProcessStop", e.id);
                },
                icon: a.i(),
                title: "Stop async process"
            })), [ "section", {
                "data-key": "process-view",
                class: u.d
            }, [ "div", {
                class: u.c
            }, [ "code", [ "pre", e.procedure.toString() ] ] ], r ];
        }
        var a = n(22), s = n(24), l = n(15), u = n(23);
        t.b = i, t.a = o;
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
                    return t("updateGraphScale", e.target.value);
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
            var r = e.entities, i = e.processes, s = e.edges, l = e.viewBox, u = void 0 === l ? {} : l;
            return [ "section", {
                class: o.a
            }, [ "svg", {
                width: "100%",
                height: "100%",
                viewBox: u.x + ", " + u.y + ", " + u.width + ", " + u.height
            } ].concat(s.map(function(e) {
                return [ "line", {
                    x1: e.from.x,
                    y1: e.from.y,
                    x2: e.to.x,
                    y2: e.to.y,
                    class: n.i(a.classes)(e.class, e.active && "active")
                } ];
            }), i.map(function(e) {
                return [ "circle", {
                    "data-key": e.id,
                    class: n.i(a.classes)(e.class, e.active && "active"),
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
                    class: n.i(a.classes)(e.class, e.active && "active")
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
        var o = n(71), a = n(5);
        n.n(a);
        t.b = r, t.a = i;
    }, function(e, t, n) {
        "use strict";
        function r(e) {
            return [ "h1", e ];
        }
        function i(e, t) {
            return function() {
                return t("state.gui.setActiveWindow", e);
            };
        }
        function o(e, t, o) {
            var a = e.visibility, s = e.position, l = function(e) {
                return function() {
                    return t("state.gui.updateVisibility", e);
                };
            };
            return [ "header", {
                class: n.i(d.b)("tvs-flow-controls", v.a),
                onmousedown: i("controls", t),
                style: _({}, s)
            }, o(r, "state.gui.title"), [ "nav", {
                class: "tvs-controls-btns"
            }, [ "ul", [ "li", n.i(h.a)({
                class: a.tree && w,
                onclick: l("tree"),
                icon: f.a(),
                title: "toggle entity tree"
            }) ], [ "li", n.i(h.a)({
                class: a.graph && w,
                onclick: l("graph"),
                icon: f.b(),
                title: "toggle flow graph"
            }) ], [ "li", n.i(h.a)({
                class: a.entities && w,
                onclick: l("entities"),
                icon: f.c(),
                title: "toggle entity details"
            }) ] ] ] ];
        }
        function a(e, t, r) {
            var o = e.dimensions, a = e.window;
            return [ "article", {
                "data-key": "tree",
                class: n.i(d.b)("tvs-flow-tree", v.b),
                style: _({}, o),
                onmousedown: i("tree", t)
            }, [ "header", f.a("tree" === a ? "selected" : ""), " Tree ", [ "span", {
                class: "gap"
            } ], " ", n.i(h.a)({
                icon: f.d(),
                class: b.a,
                title: "close window",
                onclick: function() {
                    return t("closeWindow", "tree");
                }
            }) ], [ "section", {
                class: v.c
            }, r(y.a, "state.gui.treeData") ], [ "footer", {
                class: "resize",
                "data-key": "resize"
            } ] ];
        }
        function s(e, t, r) {
            function o(e) {
                if (e && e.querySelector) {
                    var n = e.querySelector("section");
                    t("updateGraphSize", {
                        width: n.clientWidth,
                        height: n.clientHeight
                    });
                }
            }
            var a = e.dimensions, s = e.window, l = r(g.a, "state.graph.viewData");
            return [ "article", {
                "data-key": "graph",
                ref: o,
                class: n.i(d.b)("tvs-flow-graph", v.b),
                style: _({}, a),
                onmousedown: i("graph", t)
            }, [ "header", f.b("graph" === s ? "selected" : ""), " Graph ", [ "span", {
                class: "gap"
            } ], r(g.b, "state.graph.viewBox"), " ", n.i(h.a)({
                icon: f.e(),
                class: n.i(d.b)(b.a, "tvs-save-graph"),
                title: "copy the current graph state to clipboard"
            }), n.i(h.a)({
                icon: f.d(),
                class: b.a,
                title: "close window",
                onclick: function() {
                    return t("closeWindow", "graph");
                }
            }) ], l, [ "footer", {
                "data-key": "resize",
                class: "resize"
            } ] ];
        }
        function l(e, t, r) {
            var o = e.dimensions, a = e.node, s = e.window, l = a && a.procedure ? n.i(m.a)(a, t) : r(m.b, "state.gui.entityViewProps");
            return [ "article", {
                "data-key": "entities",
                class: n.i(d.b)("tvs-flow-entities", v.b),
                style: _({}, o),
                onmousedown: i("entities", t)
            }, [ "header", f.c("entities" === s ? "selected" : ""), " ", a && a.id, " ", [ "span", {
                class: "gap"
            }, " " ], " ", n.i(h.a)({
                icon: f.d(),
                class: b.a,
                title: "close window",
                onclick: function() {
                    return t("closeWindow", "entities");
                }
            }) ], l, [ "footer", {
                class: "resize",
                "data-key": "resize"
            } ] ];
        }
        function u(e, t, r) {
            var i = e.tree ? r(a, "state.gui.treeWindowProps") : "", u = e.graph ? r(s, "state.gui.graphWindowProps") : "", c = e.entities ? r(l, "state.gui.entitiesWindowProps") : "";
            return [ "article", {
                class: n.i(d.b)("tvs-flow-tools", p.b)
            }, r(o, "state.gui.controlProps"), u, c, i ];
        }
        function c(e) {
            return e(u, "state.gui.visibility");
        }
        var d = n(35), f = n(22), p = n(10), h = n(24), v = n(23), g = n(69), m = n(68), y = n(72), b = n(15);
        t.a = c;
        var _ = this && this.__assign || Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        }, w = n.i(d.a)({
            color: p.a
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(5), i = (n.n(r), n(10));
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
                var d = t.__entity__, f = [ "span", {
                    class: "entity-controls"
                }, n.i(l.a)({
                    icon: s.f(),
                    class: u.a,
                    onclick: function() {
                        return o("flowEntityInspect", d.id);
                    },
                    title: "Inspect entity value"
                }) ];
                null != d.value && f.push(n.i(l.a)({
                    class: u.a,
                    onclick: function() {
                        return o("flowEntityReset", d.id);
                    },
                    icon: s.g(),
                    title: "Reset entity value"
                }));
                var p = "entity-item";
                return i === d.id && (p += " selected"), [ "li", [ "div", {
                    "data-key": "li-" + d.id,
                    class: p,
                    onclick: function() {
                        return o("state.gui.openEntity", d.id);
                    }
                }, null != d.value ? s.j() : s.i(), " " + e + " ", f ] ];
            }
            var h = [ "li", [ "div", {
                onclick: function() {
                    return o("state.gui.toggleTreeLevel", t.__path__);
                }
            }, s.k(a[t.__path__] ? "" : c), " " + e ] ];
            if (!a[t.__path__]) {
                var v = [ "ul" ];
                for (var g in t) "__path__" !== g && v.push(r(g, t[g], i, o, a));
                h.push(v);
            }
            return h;
        }
        function i(e, t) {
            var n = e.fold, i = e.tree, a = e.selected, s = [ "ul", {
                "data-key": "treeView",
                class: o.e
            } ];
            if (i) {
                var l = Object.keys(i).map(function(e) {
                    return r(e, i[e], a.id, t, n);
                });
                s.push.apply(s, l);
            }
            return s;
        }
        var o = n(23), a = n(5), s = (n.n(a), n(22)), l = n(24), u = n(15);
        t.a = i;
        var c = n.i(a.style)({
            transform: "rotate(90deg)"
        });
    }, function(e, t, n) {
        "use strict";
        var r = n(74);
        n(7), n(33), n(16);
        t.a = r;
        r.create;
    }, function(e, t, n) {
        "use strict";
        function r() {
            function e() {
                return {
                    entities: T,
                    processes: P,
                    arcs: M,
                    meta: U
                };
            }
            function t() {
                var e = {};
                for (var t in I.es) e[t] = I.es[t].val;
                return e;
            }
            function n() {
                return A;
            }
            function r(e) {
                A = e;
            }
            function a() {
                return U;
            }
            function s(e) {
                null == e || "object" != typeof e || e instanceof Array || (U = Object.assign({}, U, e));
            }
            function l(e) {
                j = e;
            }
            function u(e) {
                return I.es[e] && I.es[e].val;
            }
            function c(e, t) {
                var n = S(e);
                n.accept && !n.accept(t, n.val) || (n.val = t, R[e] = !0, F = !0, k());
            }
            function d(e, t) {
                c(e, t(u(e)));
            }
            function f(e, t) {
                S(e).cb.push(t);
            }
            function p(e, t) {
                var n = S(e);
                n.cb = t ? n.cb.filter(function(e) {
                    return e !== t;
                }) : [];
            }
            function h(e) {
                var t = i.createEntity(e);
                T[t.id] = t;
                var n = S(t.id);
                return null != t.value && null == n.val && (n.val = t.value, R[t.id] = !1, F = !0), 
                n.accept = t.accept, t;
            }
            function v(e) {
                var t = S(e);
                for (var n in t.arcs) b(n);
                delete I.es[e], delete T[e];
            }
            function g(e) {
                var t = i.createProcess(e, A);
                P[t.id] = t;
                var n = C(t.id);
                delete n.acc, n.values = [], n.sources = [], n.async = t.async, Object.keys(n.arcs).forEach(function(e) {
                    var n = M[e].port;
                    null == n || t.ports[n] && t.ports[n] !== i.PORT_TYPES.ACCUMULATOR || b(e);
                });
                for (var r in t.ports) t.ports[r] === i.PORT_TYPES.ACCUMULATOR && (n.acc = r);
                for (var o in n.arcs) _(M[o]);
                return t;
            }
            function m(e) {
                var t = C(e);
                t.stop && (t.stop(), delete t.stop);
                for (var n in t.arcs) b(n);
                delete I.ps[e], delete P[e];
            }
            function y(e) {
                var t = i.createArc(e);
                M[t.id] = t, _(t);
                var n = C(t.process), r = P[t.process];
                return r && !0 === r.autostart && Object.keys(n.arcs).length === Object.keys(r.ports).length + 1 && N(n), 
                t;
            }
            function b(e) {
                var t = M[e];
                if (t) {
                    var n = C(t.process), r = S(t.entity);
                    delete n.arcs[e], delete r.arcs[e], null != t.port ? (delete r.effects[t.process], 
                    delete n.sources[t.port], delete n.values[t.port]) : (n.stop && (n.stop(), delete n.stop), 
                    n.sink = function() {}, delete n.out, delete r.reactions[t.process]);
                }
                delete M[e];
            }
            function _(e) {
                var t = e.process, n = e.entity, r = C(t), o = S(n), a = P[t];
                o.arcs[e.id] = !0, a && (r.arcs[e.id] = !0, null != e.port ? (delete o.effects[t], 
                a.ports && null != a.ports[e.port] && (r.sources[e.port] = o, a.ports[e.port] == i.PORT_TYPES.HOT && (o.effects[t] = r))) : (r.out = o, 
                null != r.acc ? (r.sources[r.acc] = o, o.reactions[t] = r) : delete o.reactions[t], 
                r.sink = function(e) {
                    o.accept && !o.accept(e, o.val) || (o.val = e, null != e && (R[o.id] = !0, F = !0), 
                    D || k());
                }));
            }
            function w(e) {
                if (e.entities) for (var t in e.entities) h(e.entities[t]);
                if (e.processes) for (var t in e.processes) g(e.processes[t]);
                if (e.arcs) for (var t in e.arcs) y(e.arcs[t]);
                e.meta && s(e.meta);
            }
            function k() {
                j && console.log("flushing graph recursively with", R);
                var e = Object.keys(R);
                if (F) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (R[n]) {
                            var r = I.es[n];
                            for (var i in r.reactions) O(r.reactions[i]);
                        }
                    }
                    var o = {};
                    R = {}, F = !1, D = !0;
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t], r = I.es[n];
                        r.cb.length > 0 && (V[n] = r);
                        for (var i in r.effects) o[i] || (O(r.effects[i]), o[i] = !0);
                    }
                    if (D = !1, F) k(); else {
                        var a = Object.keys(V);
                        V = {};
                        for (var t in a) for (var r = I.es[a[t]], s = 0; s < r.cb.length; s++) r.cb[s](r.val);
                        j && console.log("flush finished");
                    }
                }
            }
            function O(e) {
                for (var t = !0, n = 0; n < e.sources.length; n++) {
                    var r = e.sources[n];
                    if (null == r.val) {
                        t = !1;
                        break;
                    }
                    e.values[n] = r.val;
                }
                if (t) if (j && console.log("running process", e.id), e.async) e.stop && e.stop(), 
                e.stop = P[e.id].procedure.apply(A, [ e.sink ].concat(e.values)); else {
                    var i = P[e.id].procedure.apply(A, e.values);
                    if (e.out) {
                        var o = e.out;
                        o.accept && !o.accept(i, o.val) || (o.val = i, null != i && (R[e.out.id] = null == e.acc, 
                        F = !0));
                    }
                }
            }
            function N(e) {
                e.async ? setTimeout(function() {
                    O(e);
                }, 10) : (O(e), e.out && (R[e.out.id] = !1, F = !0));
            }
            function E(e) {
                var t = C(e);
                O(t), t.async || k();
            }
            function x(e) {
                var t = C(e);
                t.stop && (t.stop(), delete t.stop);
            }
            function S(e) {
                return T[e] || h({
                    id: e
                }), I.es[e] || (I.es[e] = {
                    id: e,
                    val: void 0,
                    reactions: {},
                    effects: {},
                    arcs: {},
                    cb: []
                });
            }
            function C(e) {
                return I.ps[e] || (I.ps[e] = {
                    id: e,
                    arcs: {},
                    sink: function() {}
                });
            }
            var T = {}, P = {}, M = {}, U = {}, A = null, I = {
                es: {},
                ps: {}
            }, j = !1, V = {}, R = {}, D = !1, F = !1;
            return {
                addEntity: h,
                removeEntity: v,
                addProcess: g,
                removeProcess: m,
                addArc: y,
                removeArc: b,
                addGraph: w,
                getGraph: e,
                getState: t,
                setMeta: s,
                getMeta: a,
                getContext: n,
                setContext: r,
                setDebug: l,
                get: u,
                set: c,
                update: d,
                on: f,
                off: p,
                start: E,
                stop: x,
                flush: k,
                PORT_TYPES: o({}, i.PORT_TYPES)
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(16);
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
                c.pressed[t.button] = t, t.button === i.LEFT && (d = t.clientX, f = t.clientY, p = !0), 
                e(c);
            }
            function r(t) {
                delete c.pressed[t.button], delete c.dragDelta.event, c.dragDelta.x = 0, c.dragDelta.y = 0, 
                p = !1, e(c);
            }
            function o(t) {
                p && (c.dragDelta.event = t, c.dragDelta.x = d - t.clientX, c.dragDelta.y = f - t.clientY, 
                d = t.clientX, f = t.clientY, e(c));
            }
            function a(e) {
                e.preventDefault();
            }
            void 0 === t && (t = {});
            var s = t.element, l = void 0 === s ? document : s, u = t.enableRightButton, c = {
                pressed: {},
                dragDelta: {
                    x: 0,
                    y: 0
                }
            }, d = 0, f = 0, p = !1;
            return l.addEventListener("mousedown", n), document.addEventListener("mouseup", r), 
            document.addEventListener("mousemove", o), u && l.addEventListener("contextmenu", a), 
            e(c), function() {
                l.removeEventListener("mousedown", n), document.removeEventListener("mousemove", o), 
                document.removeEventListener("mouseup", r), u && l.removeEventListener("contextmenu", a);
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
                    for (var l in s) {
                        var u = s[l];
                        t[l] = r(u).result;
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
        var o = n(11);
        n.n(o);
        t.a = r, t.b = i;
    }, function(e, t, n) {
        "use strict";
        var r = n(78), i = n(36), o = n(11);
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
                    var a = o._freeStyle, s = n.i(r.a)(i.b.apply(void 0, e)), l = s.result, u = s.debugName, c = u ? a.registerStyle(l, u) : a.registerStyle(l);
                    return o._styleUpdated(), c;
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
                    for (var l in s) {
                        var u = s[l];
                        t[l] = r(u).result;
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
        var r = n(81), i = n(37), o = n(11), a = function() {
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
                    var o = n._freeStyle, a = r.ensureStringObj(i.extend.apply(void 0, e)), s = a.result, l = a.debugName, u = l ? o.registerStyle(s, l) : o.registerStyle(s);
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
    } ]);
});