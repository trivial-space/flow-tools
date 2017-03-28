import { val, stream } from "tvs-flow/dist/lib/utils/entity-reference";
import { mouse } from "../events";
import { defined } from "../../utils/predicates";
import { graph } from "./flow";
import { PORT_TYPES, Graph } from "tvs-flow/dist/lib/runtime-types";
import { title, graphWindow, activeEntity } from "./gui";
import { MouseState } from "tvs-libs/dist/lib/events/mouse";


export const nodeState = val<any>({})
.react(
  [graph.HOT, graphWindow.COLD],
  (self, graph, size) => {
    for (let eid in graph.entities) {
      if (!self[eid]) {
        self[eid] = {
          x: Math.random() * size.width,
          y: Math.random() * size.height
        }
      }
    }
  }
)
.react(
  [activeEntity.COLD, mouse.HOT],
  (self, {id}, mouse: MouseState) => {
    const delta: any = mouse.dragDelta
    if (delta.event
        && delta.event.target.closest('svg')
        && self[id]
        && (delta.x || delta.y)) {
      self[id].x -= delta.x
      self[id].y -= delta.y
      return self
    }
  }
)
.accept(defined)


export const saveNodeState = stream(
  [nodeState.HOT, title.COLD],
  (nodes, title) => {
    if (Object.keys(nodes).length) {
      localStorage.setItem(title, JSON.stringify(nodes))
    }
  }
)


function getLabelGroup (id) {
  const path = id.split('.')
  const label = path.pop()
  const group = path.join('.')
  return { label, group }
}


export const graphEntities = stream(
  [graph.HOT],
  (graph) => {

    const entities: any = {}

    for (let key in graph.entities) {

      const e = graph.entities[key]

      const node: any = {
        id: e.id,
        class: 'entity',
        ...getLabelGroup(key),
        ...nodeState[key],
      }

      if (e.accept != null) {
        node.accept = true
      }
      if (e.value != null) {
        node.initial = true
      }

      entities[key] = node
    }

    return entities
  }
)
.react(
  [nodeState.HOT],
  (self, state) => {
    for (let eid in self) {
      self[eid].x = state[eid].x
      self[eid].y = state[eid].y
    }
    return self
  }
)


export const graphProcesses = stream(
  [graph.HOT], (graph: Graph) => {

    const processes: any = {}

    for (let key in graph.processes) {

      const p = graph.processes[key]

      const node: any = {
        id: key,
        ...getLabelGroup(key),
        from: [],
        async: p.async,
        autostart: p.autostart,
        acc: p.ports && p.ports.includes(PORT_TYPES.ACCUMULATOR)
      }

      for (let akey in graph.arcs) {
        const a = graph.arcs[akey]
        if (a.process === key) {
          if (a.port != null) {
            node.from.push([a.entity, p.ports && p.ports[a.port]])
          } else {
            node.to = a.entity
          }
        }
      }

      processes[key] = node
    }

    return processes
  }
)


const pDistance = 50

export const viewData = stream(
  [graphEntities.HOT, graphProcesses.HOT],
  (entities, processes) => {

    const ps: any[] = []
    const edges: any[] = []

    for (let pid in processes) {
      const p = processes[pid]
      const to = entities[p.to]
      if (p.from.length) {
        p.x = 0
        p.y = 0
        for (let i = 0; i < p.from.length; i++) {
          const from = entities[p.from[i][0]]
          p.x += from.x - to.x
          p.y += from.y - to.y
        }
        const l = Math.sqrt(p.x * p.x + p.y * p.y)
        p.x = pDistance * p.x / l + to.x
        p.y = pDistance * p.y / l + to.y
        for (let i = 0; i < p.from.length; i++) {
          const [eid, type] = p.from[i]
          edges.push({
            from: entities[eid],
            to: p,
            class: 'from' + (type === PORT_TYPES.COLD ? ' cold': ''),
            title: type
          })
        }
      } else {
        p.x = to.x
        p.y = to.y - pDistance
      }
      ps.push(p)
      edges.push({
        from: p,
        to,
        class: 'to' + (p.async ? ' async' : '')
      })
      if (p.acc) {
        edges.push({
          from: p,
          to,
          class: 'to acc'
        })
      }

    }

    return {
      entities: Object.values(entities),
      processes: ps,
      edges
    }
  }
)
