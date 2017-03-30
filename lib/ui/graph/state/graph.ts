import { val, stream, EntityRef } from "tvs-flow/dist/lib/utils/entity-reference";
import { mouse, action } from "../events";
import { defined } from "tvs-libs/dist/lib/utils/predicates";
import { graph } from "./flow";
import { PORT_TYPES, Graph } from "tvs-flow/dist/lib/runtime-types";
import { graphWindow, activeEntity } from "./gui";
import { MouseState } from "tvs-libs/dist/lib/events/mouse";


export const viewBox = val({
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
  scale: 1
})
.react(
  [action.HOT],
  (self, {type, payload}) => {
    if (type === 'updateGraphScale'
        && (payload !== self.scale)) {
      self.scale = payload
      return self
    }
  }
)
.react(
  [action.HOT],
  (self, {type, payload}) => {
    if (type === 'updateGraphSize'
        && (payload.width !== self.width || payload.height !== self.height)) {
      self.width = payload.width
      self.height = payload.height
      return self
    }
  }
)
.react(
  [mouse.HOT],
  (self, mouse) => {
    const delta = mouse.dragDelta
    if (mouse.pressed[0] && mouse.pressed[0].target.tagName.toLowerCase() === 'svg'
        && (delta.x || delta.y)) {
      self.offsetX += delta.x
      self.offsetY += delta.y
      return self
    }
  }
)
.accept(defined)


export const nodeState: EntityRef<any> = val({})
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
  [activeEntity.COLD, mouse.HOT, viewBox.COLD],
  (self, id, mouse: MouseState, viewBox) => {
    const delta: any = mouse.dragDelta
    const t = mouse.pressed[0] && mouse.pressed[0].target as HTMLElement
    const targetId = t && (t.dataset.key || (t.parentElement && t.parentElement.dataset.key))
    if (targetId
        && id === targetId
        && self[id]
        && (delta.x || delta.y)) {
      self[id].x -= delta.x * viewBox.scale
      self[id].y -= delta.y * viewBox.scale
      return self
    }
  }
)
.accept(defined)


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
          const type = p.from[i][1]
          let x = from.x - to.x
          let y = from.y - to.y
          if (type === PORT_TYPES.COLD) {
            x /= 2
            y /= 2
          }
          p.x += x
          p.y += y
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
.react(
  [viewBox.HOT],
  (self: any, viewBox) => {
    self.viewBox = {
      x: viewBox.offsetX * viewBox.scale,
      y: viewBox.offsetY * viewBox.scale,
      width: viewBox.width * viewBox.scale,
      height: viewBox.height * viewBox.scale
    }
    return self
  }
)
