import * as gui from './ui/index'
import * as uetree from './utils/entity-tree'
import * as uwebpack from './utils/webpack'
import * as uyoyo from './utils/yoyo'


export default gui

export const ui = gui

export const utils = {
  entityTree: uetree,
  webpack: uwebpack,
  yoyo: uyoyo
}
