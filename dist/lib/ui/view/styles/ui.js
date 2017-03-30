import { style } from "typestyle/lib";
import { element, color } from "./main";
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
    $nest: {
        '& > svg': {
            verticalAlign: 'middle'
        }
    }
};
var iconButton = {
    padding: '0 4px',
};
export var buttonStyle = style(element, button);
export var iconButtonStyle = style(element, button, iconButton);
//# sourceMappingURL=ui.js.map