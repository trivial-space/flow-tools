"use strict";
var targets = [];
export function getDragDeltas(onDragDelta, onMouseDown) {
    var oldX = 0;
    var oldY = 0;
    var target;
    function onmousedown(e) {
        target = e.currentTarget;
        targets.push(target);
        oldX = e.clientX;
        oldY = e.clientY;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        onMouseDown && onMouseDown(e);
    }
    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        targets = targets.filter(function (t) { return t !== target; });
    }
    function onMouseMove(e) {
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var t = targets_1[_i];
            if (t !== target && target.contains(t))
                return;
        }
        onDragDelta({
            x: oldX - e.clientX,
            y: oldY - e.clientY
        });
        oldX = e.clientX;
        oldY = e.clientY;
    }
    return { onmousedown: onmousedown };
}
//# sourceMappingURL=component-helpers.js.map