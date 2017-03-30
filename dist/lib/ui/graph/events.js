import { val, asyncStreamStart, asyncStream } from "tvs-flow/dist/lib/utils/entity-reference";
import { windowSize as getWindowSize } from 'tvs-libs/dist/lib/events/dom';
import { mouse as getMouse } from 'tvs-libs/dist/lib/events/mouse';
export var action = val();
export var windowSize = asyncStreamStart(getWindowSize);
export var element = val();
export var mouse = asyncStream([element.HOT], function (send, el) { return getMouse(send, { el: el, enableRightButton: true }); });
//# sourceMappingURL=events.js.map