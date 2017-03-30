import * as yo from 'yo-yo';
import * as bel from 'bel';
import * as onLoad from 'on-load';
var rafActions = {};
var callRaf = true;
function executeRafActions() {
    console.log('executeRafActions');
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
var componentCount = 0;
var cachedComponents = {};
export function flowComponentFactory(stateFlow, dispatchId) {
    function dispatch(action, payload) {
        if (typeof action === "string") {
            stateFlow.set(dispatchId, { type: action, payload: payload });
        }
        else {
            stateFlow.set(dispatchId, action);
        }
    }
    function component(template, viewStateId) {
        var arghash = viewStateId + template.name;
        if (cachedComponents[arghash])
            return cachedComponents[arghash];
        var firstState = stateFlow.get(viewStateId);
        var element = template(firstState, dispatch, component);
        var cid = 'c' + componentCount++;
        element.dataset.tvsComponent = "component";
        var updateElement = function () {
            var newState = stateFlow.get(viewStateId);
            var newElement = template(newState, dispatch, component, element);
            console.log('updating', element);
            yo.update(element, newElement, {
                getNodeKey: function (node) {
                    return node.id || (node.dataset && node.dataset.key);
                },
                childrenOnly: true,
                onBeforeElUpdated: function (fromEl, toEl) {
                    return fromEl.dataset.tvsComponent !== "component"
                        && fromEl !== toEl;
                }
            });
        };
        var update = function () { return updateOnAnimationFrame(cid, updateElement); };
        var onload = function () {
            console.log('element inserted into dom!', element);
            stateFlow.on(viewStateId, update);
        };
        var onunload = function () {
            console.log('element removed from dom!', element);
            stateFlow.off(viewStateId, update);
        };
        onLoad(element, onload, onunload, component);
        cachedComponents[arghash] = element;
        return element;
    }
    return component;
}
export function h(elData) {
    var tag = elData.shift(elData);
    var props = elData[0];
    if (typeof props === "object" && !Array.isArray(props) && !(props instanceof Element)) {
        elData.shift();
    }
    else {
        props = {};
    }
    for (var k in props) {
        if (typeof props[k] === 'boolean') {
            props[k] = '' + props[k];
        }
    }
    return bel.createElement(tag, props, elData.map(function (el) { return Array.isArray(el) ? h(el) : el; }));
}
//# sourceMappingURL=yoyo.js.map