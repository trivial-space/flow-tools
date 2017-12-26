import * as icon from './icons';
import { iconBtn } from './ui';
import { buttonStyle } from './styles/ui';
import { windowContentStyle, entityViewStyle } from './styles/components';
import { GUI, FLOW } from '../actions';
import { printEntityName } from '../../utils/entity-data-helpers';
import { PORT_TYPES } from 'tvs-flow/dist/lib/runtime-types';
function jsonCode(initialValue, readonly, currentValueContainer) {
    var code = '';
    if (initialValue != null) {
        try {
            code = JSON.stringify(initialValue, null, '  ');
        }
        catch (e) {
            code = 'Error: ' + e.message;
        }
    }
    return ['code',
        ['pre', {
                contentEditable: !readonly,
                onInput: function (e) { return currentValueContainer.value = e.target.textContent; }
            },
            code]];
}
export function entityValueView(_a, dispatch) {
    var entity = _a.entity, value = _a.value, watching = _a.watching;
    var editingValue = { value: value };
    var buttons = ['div', {
            'style': 'margin-top: 4px'
        }];
    if (watching) {
        buttons.push(['button', {
                class: buttonStyle,
                key: 'edit-btn',
                onclick: function () { return dispatch(GUI.ENTITY.WATCH_ACTIVE_ENTITY, false); }
            }, 'Edit'], iconBtn({
            key: 'inspect-btn-' + entity.id,
            onclick: function () { return dispatch(FLOW.ENTITY_INSPECT, entity.id); },
            icon: icon.show(),
            title: 'Inspect entity value'
        }));
        if (entity.value) {
            buttons.push(iconBtn({
                key: 'reset-btn-' + entity.id,
                onclick: function () { return dispatch(FLOW.ENTITY_RESET, entity.id); },
                icon: icon.reset(),
                title: 'Reset entity value'
            }));
        }
    }
    else {
        buttons.push(['button', {
                class: buttonStyle,
                onclick: function () { return dispatch(GUI.ENTITY.WATCH_ACTIVE_ENTITY, true); }
            }, 'Cancel'], ['button', {
                class: buttonStyle,
                key: 'save-btn-' + entity.id,
                onclick: function () {
                    var val = JSON.parse(editingValue.value);
                    dispatch(GUI.ENTITY.SAVE_VALUE, val);
                }
            }, 'Save']);
    }
    var el = ['section', {
            class: entityViewStyle
        },
        ['div', { class: windowContentStyle, key: entity.id + watching },
            jsonCode(value, watching, editingValue)],
        entity.id && buttons];
    return el;
}
export function entityDetailsView(_a, dispatch) {
    var entity = _a.entity, graph = _a.graph, meta = _a.meta;
    var processes = (entity.processes || []).map(function (pid) { return graph.processes[pid]; });
    var streams = processes.filter(function (p) { return !p.reaction; });
    var reactions = processes.filter(function (p) { return p.reaction; });
    var tempMeta = { value: meta ? JSON.stringify(meta, null, '  ') : '' };
    function printProcessInputs(p) {
        var parts = [
            '(',
            p.inputs
                .filter(function (p) { return p.type !== PORT_TYPES.ACCUMULATOR; })
                .map(function (ePort) {
                var e = graph.entities[ePort.eid];
                return (e.namespace === entity.namespace
                    ? e.name
                    : e.namespace + '/' + e.name) + '::' + ePort.type;
            }).join(', '),
            ')'
        ];
        if (p.autostart) {
            parts.unshift('S');
        }
        if (p.async) {
            parts.unshift('A');
        }
        return parts.join('');
    }
    var el = ['section', {
            class: entityViewStyle
        },
        ['div', { class: windowContentStyle },
            ['table',
                ['tr',
                    ['td', 'name'],
                    ['td', entity.name]],
                ['tr',
                    ['td', 'namespace'],
                    ['td', entity.namespace]],
                (streams.length > 0 && ['tr',
                    ['td', 'streams'], ['td'].concat(streams.map(function (s) { return ['p',
                        ['a', {
                                onClick: function () { return dispatch(GUI.ENTITY.SET_ACTIVE_PROCESS, s.id); }
                            }, printProcessInputs(s)]]; }))]),
                (reactions.length > 0 && ['tr',
                    ['td', 'reactions'], ['td'].concat(reactions.map(function (r) { return ['p',
                        ['a', {
                                onClick: function () { return dispatch(GUI.ENTITY.SET_ACTIVE_PROCESS, r.id); }
                            }, printProcessInputs(r)]]; }))])
            ],
            (entity.value && ['p', 'initial value']),
            (entity.value && ['code', ['pre', JSON.stringify(entity.value, null, '  ')]]),
            (meta && ['p', 'meta data']),
            (meta && ['code', ['pre', {
                        contentEditable: true,
                        onInput: function (e) { tempMeta.value = e.target.textContent; console.log(tempMeta); }
                    }, tempMeta.value]]),
            ['div', {
                    'style': 'margin-top: 4px'
                },
                ['button', {
                        class: buttonStyle,
                        onclick: function () {
                            console.log(tempMeta.value);
                            var value = JSON.parse(tempMeta.value);
                            dispatch(GUI.ENTITY.SAVE_META, { id: entity.id, value: value });
                        }
                    }, 'Save']
            ]
        ],
        ['div', {
                'style': 'margin-top: 4px'
            },
            iconBtn({
                key: 'inspect-btn-' + entity.id,
                onclick: function () { return dispatch(FLOW.ENTITY_INSPECT, entity.id); },
                icon: icon.show(),
                title: 'Inspect entity value'
            })
        ]];
    return el;
}
function getProcessButtons(process, dispatch) {
    var buttons = ['div', {
            'style': 'margin-top: 4px'
        }];
    buttons.push(iconBtn({
        onclick: function () { return dispatch(FLOW.PROCESS_RUN, process.id); },
        icon: icon.play(),
        title: 'Run process'
    }));
    if (process.async) {
        buttons.push(iconBtn({
            onclick: function () { return dispatch(FLOW.PROCESS_STOP, process.id); },
            icon: icon.stop(),
            title: 'Stop async process'
        }));
    }
    return buttons;
}
export function processValueView(_a, dispatch) {
    var process = _a.process;
    return ['section', {
            class: entityViewStyle
        },
        ['div', { class: windowContentStyle },
            ['code',
                ['pre', process.procedure.toString()]]],
        getProcessButtons(process, dispatch)];
}
export function processDetailsView(_a, dispatch) {
    var process = _a.process, graph = _a.graph;
    var type = process.reaction
        ? 'Reaction'
        : process.async
            ? 'Async Stream'
            : 'Stream';
    if (process.autostart) {
        type += ' Autostart';
    }
    if (process.delta) {
        type = 'Delta ' + type;
    }
    var el = ['section', {
            class: entityViewStyle
        },
        ['div', { class: windowContentStyle },
            ['table',
                ['tr',
                    ['td', 'type'],
                    ['td', type]],
                ['tr',
                    ['td', 'output'],
                    ['td', ['a', {
                                onClick: function () { return dispatch(GUI.ENTITY.SET_ACTIVE_ENTITY, process.output); }
                            },
                            printEntityName(graph.entities[process.output])]]],
                ['tr',
                    ['td', 'inputs'], ['td'].concat(process.inputs
                        .filter(function (i) { return i.type !== PORT_TYPES.ACCUMULATOR; })
                        .map(function (i) { return ['p', ['a', {
                                onClick: function () { return dispatch(GUI.ENTITY.SET_ACTIVE_ENTITY, i.eid); }
                            },
                            printEntityName(graph.entities[i.eid]) + ' :: ' + i.type]]; }))]
            ]],
        getProcessButtons(process, dispatch)];
    return el;
}
//# sourceMappingURL=entity.js.map