import * as gui from './ui/index';
import * as consoleTree from './console/tree';
import * as uetree from './utils/entity-tree';
import * as uwebpack from './utils/webpack';
import * as uinferno from './utils/inferno';
export default gui;
export declare const ui: typeof gui;
export declare const console: {
    tree: typeof consoleTree;
};
export declare const utils: {
    entityTree: typeof uetree;
    webpack: typeof uwebpack;
    yoyo: typeof uinferno;
};
