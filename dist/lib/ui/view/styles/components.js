var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { style } from "typestyle/lib";
import { element, fontSize, resetUl } from "./main";
export var controlsStyle = style(element, {
    display: 'inline-block',
    position: 'relative',
    padding: 4,
    $nest: {
        '& h1': {
            display: 'inline-block',
            margin: '0 8px',
            fontSize: fontSize,
            fontWeight: 'normal'
        },
        '& ul': __assign({}, resetUl, { display: 'inline-block', margin: 0, fontSize: fontSize, fontWeight: 'normal' }),
        '& li': {
            display: 'inline-block',
        },
        '& nav': {
            display: 'inline-block',
        }
    }
});
export var windowStyle = style(element, {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    alignItems: 'stretch',
    alignContent: 'stretch',
    $nest: {
        '&>.resize': {
            position: 'absolute',
            width: 20,
            height: 20,
            bottom: 0,
            right: 0,
            borderRadius: 4,
            cursor: 'nwse-resize',
            background: "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)",
        }
    }
});
export var windowContentStyle = style({
    overflow: 'auto',
    position: 'relative',
    flexGrow: 1,
});
export var treeViewStyle = style(resetUl, {
    $nest: {
        '& ul': resetUl,
        '& li': {
            paddingLeft: '1em'
        }
    }
});
//# sourceMappingURL=components.js.map