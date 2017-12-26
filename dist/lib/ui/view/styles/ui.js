import { style } from 'typestyle/lib';
import { element, color } from './main';
export var radioBtnStyle = style({
    margin: '0 4px',
    verticalAlign: 'top',
    display: 'inline-block',
    $nest: {
        '& input': {
            margin: 5,
            verticalAlign: 'middle'
        }
    }
});
var button = {
    margin: '0 4px',
    padding: '4px 10px 3px',
    border: 0,
    color: color,
    fontSize: '1.0em',
    verticalAlign: 'middle',
    cursor: 'pointer',
    outline: 'none',
    $nest: {
        '& > svg': {
            verticalAlign: 'middle'
        },
        '&.selected': {
            backgroundColor: 'transparent'
        },
        '&.tiny': {
            margin: 0,
            fontSize: '0.9em',
            padding: '2px 5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }
    }
};
var iconButton = {
    padding: '0 4px'
};
export var buttonStyle = style(element, button);
export var iconButtonStyle = style(element, button, iconButton);
export var iconButtonLightStyle = style({
    display: 'inline-block',
    margin: '0 2px',
    padding: 0,
    border: 0,
    background: 'transparent',
    boxShadow: 'none',
    fontSize: '0.9em'
});
//# sourceMappingURL=ui.js.map