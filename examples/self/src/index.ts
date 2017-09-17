import * as flowTools from '../../../lib/index'

export const tools = flowTools.ui.start({
	graph: require('./graph.json'),
	debug: true
})

const runtime = tools.getState()
window['toolsFlow'] = runtime

tools.setFlow(runtime, 'self debug')
window['entities'] = flowTools.console.tree.create(runtime)

if (module.hot) {
	module.hot.accept()
	module.hot.dispose(tools.dispose)
}
