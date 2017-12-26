var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { style } from 'typestyle/lib';
import { element, fontSize, resetUl, content, highlightColor } from './main';
export var controlsStyle = style(element, {
    display: 'inline-block',
    position: 'relative',
    padding: 2,
    whiteSpace: 'nowrap',
    $nest: {
        '& h1, & h2': {
            display: 'inline-block',
            margin: '0 8px',
            fontSize: fontSize,
            fontWeight: 'normal',
            verticalAlign: 'middle'
        },
        '& ul': __assign({}, resetUl, { display: 'inline-block', margin: 0, fontSize: fontSize, fontWeight: 'normal' }),
        '& li': {
            display: 'inline-block'
        },
        '& nav': {
            display: 'inline-block'
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
            background: "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)"
        },
        '&>header': {
            display: 'flex',
            alignItems: 'center',
            minHeight: 26
        },
        '&>header input': {
            verticalAlign: 'middle'
        },
        '&>header .gap': {
            flexGrow: 1
        }
    }
});
export var windowContentStyle = style(content, {
    overflow: 'auto',
    position: 'relative',
    flexGrow: 1,
    padding: 5,
    $nest: {
        '& h3': {
            fontSize: '1em'
        },
        '& a': {
            $nest: {
                '&:hover, &:focus': {
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }
            }
        },
        '& td, & th': {
            paddingRight: '1em',
            paddingBottom: '0.5em',
            verticalAlign: 'top',
            textAlign: 'left'
        },
        '& p, & div': {
            marginTop: 0,
            marginBottom: '0.5em'
        }
    }
});
export var treeViewStyle = style(resetUl, {
    margin: 0,
    $nest: {
        '& ul': resetUl,
        '& li': {
            paddingLeft: '1.5em',
            cursor: 'pointer'
        },
        '&>li': {
            paddingLeft: 0
        },
        '& .entity-controls': {
            display: 'none'
        },
        '& .entity-item:hover>.entity-controls': {
            display: 'inline'
        },
        '& .entity-item.selected': {
            color: highlightColor
        }
    }
});
export var entityViewStyle = style({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
    $nest: {
        '& pre': {
            margin: 0,
            MozUserSelect: 'text',
            userSelect: 'text'
        }
    }
});
//# sourceMappingURL=components.js.map