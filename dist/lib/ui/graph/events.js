"use strict";
import { val, asyncStreamStart, asyncStream, delta, stream } from 'tvs-flow/dist/lib/utils/entity-reference';
import { windowSize as getWindowSize } from 'tvs-libs/dist/lib/events/dom';
import { mouse as getMouse } from 'tvs-libs/dist/lib/events/mouse';
export var action = val();
export var windowSize = asyncStreamStart(null, getWindowSize);
export var element = val();
export var mouse = asyncStream([element.HOT], function (send, el) { return getMouse(send, { el: el, enableRightButton: true }); });
export var mouseDrag = stream([mouse.HOT], function (m) { return ({
    x: m.drag.x,
    y: m.drag.y
}); });
export var dragDeltas = delta(mouseDrag, function (n, o) { return ({
    x: n.x === 0 ? n.x : n.x - o.x,
    y: n.y === 0 ? n.y : n.y - o.y
}); })
    .accept(function (drag) { return !!(drag && (drag.x || drag.y)); });
//# sourceMappingURL=events.js.map