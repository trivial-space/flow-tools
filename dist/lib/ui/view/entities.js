import * as icon from "./icons";
import { iconBtn } from "./ui";
import { buttonStyle } from "./styles/ui";
import { windowContentStyle, entityViewStyle } from "./styles/components";
function jsonCode(_a, dispatch) {
    var value = _a.value, watching = _a.watching;
    var code = '';
    if (value) {
        try {
            code = JSON.stringify(value, null, '  ');
        }
        catch (e) {
            code = 'Error: ' + e.message;
        }
    }
    return ['code',
        ['pre', {
                contenteditable: !watching,
                oninput: function (e) { return dispatch('updateEditedValue', e.target.textContent); }
            },
            code]];
}
export function entityView(_a, dispatch, component) {
    var entity = _a.entity, watching = _a.watching;
    var buttons = ['div', {
            'style': 'margin-top: 4px'
        }];
    if (watching) {
        buttons.push(['button', {
                class: buttonStyle,
                onclick: function () { return dispatch('setEntityEditMode', true); }
            }, 'Edit'], iconBtn({
            key: 'inspect-btn' + entity.id,
            onclick: function () { return dispatch('flowEntityInspect', entity.id); },
            icon: icon.show(),
            title: "Inspect entity value"
        }));
        if (entity.value) {
            buttons.push(iconBtn({
                key: 'reset-btn' + entity.id,
                onclick: function () { return dispatch('flowEntityReset', entity.id); },
                icon: icon.reset(),
                title: "Reset entity value"
            }));
        }
    }
    else {
        buttons.push(['button', {
                class: buttonStyle,
                'data-key': 'cancel-btn',
                onclick: function () { return dispatch('setEntityEditMode', false); }
            }, 'Cancel'], ['button', {
                class: buttonStyle,
                'data-key': 'save-btn' + entity.id,
                onclick: function () { return dispatch('saveCurrentEntityValue', entity.id); }
            }, 'Save']);
    }
    var el = ['section', {
            'data-key': 'entity-view',
            class: entityViewStyle
        },
        ['div', { class: windowContentStyle },
            component(jsonCode, 'state.gui.entityValueView')],
        buttons];
    return el;
}
export function processView(process, dispatch) {
    var buttons = ['div', {
            'data-key': 'process-buttons',
            'style': 'margin-top: 4px'
        }];
    buttons.push(iconBtn({
        onclick: function () { return dispatch('flowProcessRun', process.id); },
        icon: icon.play(),
        title: "Run process"
    }));
    if (process.async) {
        buttons.push(iconBtn({
            onclick: function () { return dispatch('flowProcessStop', process.id); },
            icon: icon.stop(),
            title: "Stop async process"
        }));
    }
    return ['section', {
            'data-key': 'process-view',
            class: entityViewStyle
        },
        ['div', { class: windowContentStyle },
            ['code',
                ['pre', process.procedure.toString()]]],
        buttons];
}
//# sourceMappingURL=entities.js.map