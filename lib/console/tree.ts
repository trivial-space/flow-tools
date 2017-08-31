import { Runtime } from 'tvs-flow/dist/lib/runtime-types'


export function create (flow: Runtime) {

	function callAll (name: string) {
		return function(this: any) {
			for (const key in this) {
				if (typeof this[key][name] === 'function') {
					this[key][name]()
				}
			}
		}
	}

	function createObject (pathstring: string, root: any = {}) {
		const names = pathstring.split('.')
		return names.reduce((obj, name) => obj[name] = obj[name] || {
			reset: callAll('reset'),
			watch: callAll('watch'),
			unwatch: callAll('unwatch')
		}, root)
	}


	function createTree (root: any) {

		const graph = flow.getGraph()
		const { entities, arcs, processes } = graph

		return Object.keys(entities)
			.reduce((obj, eid) => {
				const e: any = createObject(eid, obj)
				const entity = entities[eid]
				const streamIds = Object.keys(arcs)
					.map(k => arcs[k])
					.filter(a => a.entity === eid && !a.port)
					.map(a => a.process)

				e.id = eid
				Object.defineProperty(e, 'val', {
					get: () => flow.get(eid),
					set: (v) => flow.set(eid, v)
				})
				e.update = function(fn: (a: any) => any) {
					flow.update(eid, fn)
				}
				e.reset = function() {
					if (entity.value != null) {
						flow.set(eid, entity.value)
					} else if (entity.json != null) {
						flow.set(eid, JSON.parse(entity.json))
					}
				}
				e.watch = function() {
					flow.on(eid, v => console.log(eid, v))
				}
				e.unwatch = function() {
					flow.off(eid)
				}

				e.streams = {}
				streamIds.forEach((p: string) => {
					const name = p.split('.').pop()
					if (name) {
						e.streams[name] = {
							start: function() { flow.start(p) }
						}
						if (processes[p].async) {
							e.streams[name].stop = function() { flow.stop(p) }
						}
					}
				})

				return obj
			}, root)
	}


	const root: any = {
		update: function() {
			for (const key in this) {
				if (key !== 'update') {
					delete this[key]
				}
			}
			createTree(this)
		}
	}

	return createTree(root)
}
