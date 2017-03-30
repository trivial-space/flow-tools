import { style } from "typestyle/lib";
import { rgba } from 'csx';
export var color = 'white';
export var backgroundColor = rgba(40, 40, 40, 0.7).toString();
export var fontSize = 17;
export var highlightColor = 'cyan';
export var element = {
    borderRadius: 4,
    backgroundColor: backgroundColor,
    boxShadow: '0 10px 15px rgba(0,0,0,0.3)',
    borderTop: '1px solid rgba(255, 255, 255, 0.4)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.6)'
};
export var resetUl = {
    padding: 0,
    listStyle: 'none'
};
export var mainStyle = style({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    fontSize: fontSize,
    fontFamily: 'sans-serif',
    lineHeight: 1.5,
    color: color,
    userSelect: 'none',
    $nest: {
        '& *': {
            userSelect: 'none',
            MozUserSelect: 'none'
        }
    }
});
//# sourceMappingURL=main.js.map