import { val, asyncStreamStart } from 'tvs-flow/dist/lib/utils/entity-reference';
import { windowSize as getWindowSize } from 'tvs-libs/dist/lib/events/dom';
export var windowSize = asyncStreamStart(null, getWindowSize);
export var element = val();
export var action = val();
//# sourceMappingURL=events.js.map