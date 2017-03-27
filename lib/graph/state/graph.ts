import * as vis from 'vis/dist/vis-network.min'
import { val, stream } from "tvs-flow/dist/lib/utils/entity-reference";
import { action } from "../events";
import { defined, unequal } from "../../utils/predicates";
import { graph } from "./flow";
import { PORT_TYPES } from "tvs-flow/dist/lib/runtime-types";
import { title } from "./gui";


export const nodeState = val({})
.react(
  [action.HOT],
  (self, {type, payload}) => {
    if (type === "state.gui.updateGraphNodePositions") {
      Object.assign(self, payload)
      return self
    }
  }
)
.accept(defined)


export const hasCustomUI = stream(
  [nodeState.HOT],
  nodes => Object.keys(nodes).length > 0
)
.accept(unequal)


export const saveNodeState = stream(
  [nodeState.HOT, title.COLD],
  (nodes, title) => {
    if (Object.keys(nodes).length) {
      localStorage.setItem(title, JSON.stringify(nodes))
    }
  }
)


export const graphOptions = val<any>({
  edges: {
    arrows: 'to',
    smooth: false,
    shadow: { x: 2 },
    width: 2
  },
  nodes: {
    shape: 'square',
    shadow: { x: 0 },
    borderWidthSelected: 1,
    font: {
      size: 20,
      color: 'white',
      strokeColor: 'black',
      strokeWidth: 2
    },
    size: 23
  },
  interaction: {
    tooltipDelay: 500,
    multiselect: true
  },
  physics: {
    stabilization: {
      iterations: 2000
    }
  }
})


function getLabelGroup (id) {
  const path = id.split('.')
  const label = path.pop()
  const group = path.join('.')
  return { label, group }
}


export const graphData = stream(
  [graph.HOT, nodeState.HOT],
  (graph, nodeState) => {

    const nodes: any[] = []
    const edges: any[] = []

    for (let key in graph.entities) {

      const e = graph.entities[key]

      const node = {
        id: key,
        title: key,
        ...getLabelGroup(key)
      }

      if (e.value != null) {
        Object.assign(node, {
          borderWidth: 5,
          borderWidthSelected: 5
        })
      }

      if (nodeState[key]) {
        Object.assign(node, nodeState[key])
      }

      nodes.push(node)
    }

    for (let key in graph.processes) {

      const p = graph.processes[key]

      const node = {
        id: key,
        title: key,
        shape: 'dot',
        size: 12,
        group: getLabelGroup(key).group
      }

      if (p.autostart) {
        Object.assign(node, {
          size: 20,
          borderWidth: 5,
          borderWidthSelected: 5
        })
      }

      if (nodeState[key]) {
        Object.assign(node, nodeState[key])
      }

      nodes.push(node)
    }

    for (let key in graph.arcs) {

      const arc = graph.arcs[key]
      const p = graph.processes[arc.process]
      const isAcc = p.ports && p.ports.includes(PORT_TYPES.ACCUMULATOR)

      if (arc.port != null) {

        const edge: any = {
          id: key,
          from: arc.entity,
          to: arc.process,
          length: 200,
          color: { inherit: 'from' }
        }

        if (p.ports && p.ports[arc.port] === PORT_TYPES.COLD) {

          Object.assign(edge, {
            width: 1,
            dashes: true,
            title: PORT_TYPES.COLD
          })

        } else {
          edge.title = PORT_TYPES.HOT
        }

        edges.push(edge)

      } else {

        const edge = {
          id: key,
          from: arc.process,
          to: arc.entity,
          length: 100,
          color: { inherit: 'to' }
        }

        if (p.async) {

          Object.assign(edge, {
            dashes: [1, 10],
            width: 3
          })

        } else if (isAcc) {

          Object.assign(edge, {
            arrows: { from: true, to: true },
            title: PORT_TYPES.ACCUMULATOR
          })

        }

        edges.push(edge)
      }
    }

    return { edges, nodes }
  }
)


export const graphDataSets = val({
  nodes: new vis.DataSet([]),
  edges: new vis.DataSet([])
})
.react(
  [graphData.HOT],
  (self, data) => {
    self.nodes.update(data.nodes)
    self.edges.update(data.edges)
  }
)
.accept(defined)


export const viewData = stream(
  [graphDataSets.COLD, graphOptions.COLD, hasCustomUI.HOT],
  (data, options, hasCustomUI) => ({data, options, hasCustomUI})
)
