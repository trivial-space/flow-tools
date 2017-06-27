"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import InfernoComponent from 'inferno-component';
import createElement from 'inferno-create-element';
var ComponentClass = (function (_super) {
    __extends(ComponentClass, _super);
    function ComponentClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ComponentClass;
}(InfernoComponent));
export { ComponentClass };
var rafActions = {};
var callRaf = true;
function executeRafActions() {
    for (var key in rafActions) {
        rafActions[key]();
    }
    rafActions = {};
    callRaf = true;
}
function updateOnAnimationFrame(key, fn) {
    if (callRaf) {
        requestAnimationFrame(executeRafActions);
        callRaf = false;
    }
    rafActions[key] = fn;
}
export function flowComponentFactory(stateFlow, dispatchId, debug) {
    if (debug === void 0) { debug = false; }
    function dispatch(action, payload) {
        if (typeof action === 'string') {
            stateFlow.set(dispatchId, { type: action, payload: payload });
        }
        else {
            stateFlow.set(dispatchId, action);
        }
    }
    var cache = {};
    return function component(template, entity) {
        var viewStateId = entity.getId();
        var arghash = viewStateId + template.name;
        if (cache[arghash]) {
            return cache[arghash];
        }
        var compClass = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = {
                    current: stateFlow.get(viewStateId)
                };
                _this.updateAsync = function () {
                    updateOnAnimationFrame(arghash, function () {
                        _this.setState(function (state) {
                            state.current = stateFlow.get(viewStateId);
                            return state;
                        });
                    });
                };
                return _this;
            }
            class_1.prototype.render = function () {
                return h(template(this.state.current, dispatch, component));
            };
            class_1.prototype.componentDidMount = function () {
                debug && console.log('component mounted!', this);
                stateFlow.on(viewStateId, this.updateAsync);
            };
            class_1.prototype.componentWillUnmount = function () {
                debug && console.log('component will unmount!', this);
                stateFlow.off(viewStateId, this.updateAsync);
            };
            return class_1;
        }(ComponentClass));
        cache[arghash] = compClass;
        return compClass;
    };
}
export function h(el) {
    if (typeof el === 'function') {
        return createElement(el);
    }
    if (!Array.isArray(el)) {
        return el;
    }
    var tag = el.shift();
    var props = el[0];
    if (typeof props === 'object' && !Array.isArray(props)) {
        el.shift();
    }
    else {
        props = {};
    }
    if (el.length) {
        return createElement(tag, props, el.map(h));
    }
    else {
        return createElement(tag, props);
    }
}
//# sourceMappingURL=inferno.js.map