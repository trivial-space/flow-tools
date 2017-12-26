import * as gui from './ui/index';
import * as consoleTree from './console/tree';
import * as uEntityData from './utils/entity-data-helpers';
import * as uWebpack from './utils/webpack';
import * as uInferno from './utils/inferno';
export default gui;
export declare const ui: typeof gui;
export declare const console: {
    tree: typeof consoleTree;
};
export declare const utils: {
    entityData: typeof uEntityData;
    webpack: typeof uWebpack;
    yoyo: typeof uInferno;
};
