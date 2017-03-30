var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { style } from "typestyle/lib";
import { element, fontSize, resetUl, content } from "./main";
export var controlsStyle = style(element, {
    display: 'inline-block',
    position: 'relative',
    padding: 2,
    whiteSpace: 'nowrap',
    $nest: {
        '& h1': {
            display: 'inline-block',
            margin: '0 8px',
            fontSize: fontSize,
            fontWeight: 'normal',
            verticalAlign: 'middle'
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
    padding: 5,
    paddingTop: 1,
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
export var windowContentStyle = style(content, {
    overflow: 'auto',
    position: 'relative',
    flexGrow: 1,
    padding: 5,
});
export var treeViewStyle = style(resetUl, {
    $nest: {
        '& ul': resetUl,
        '& li': {
            paddingLeft: '1em'
        }
    }
});
export var entityViewStyle = style({});
//# sourceMappingURL=components.js.map