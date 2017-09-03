import { Entity, EntityData } from 'tvs-flow/dist/lib/runtime-types'


export function createEntityTree(entities: { [id: string]: EntityData }, separator = '.') {

	const tree = {} as any

	Object.keys(entities).sort().forEach(entityKey => {

		const entity = entities[entityKey] as Entity
		const parts = entity.id.split(separator)

		let subtree = tree
		const steps = [...parts]
		const path: string[] = []

		parts.forEach(() => {
			const p = steps.shift() as string
			if (!steps.length) {
				subtree[p] = {__entity__: entity}
			} else {
				path.push(p)
				subtree = subtree[p] = subtree[p] || {
					__path__: path.join(separator)
				}
			}
		})
	})

	return tree
}
