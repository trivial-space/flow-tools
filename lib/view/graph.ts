import * as vis from 'vis/dist/vis-network.min'
import * as css from 'dom-css'
import { graphViewStyle } from "./styles/components";


/*


(defn get-graph-options
  [{:keys [mode physics]}]
  (let [opts
        {:layout {:randomSeed 3}
         :edges {:arrows "to"
                 :smooth false
                 :color {:inherit "from"}
                 :shadow {:x 2}
                 :width 2}
         :nodes {:shadow {:x 0}
                 :borderWidthSelected 1
                 :font {:size 20
                        :strokeColor "white"
                        :strokeWidth 2}
                 :size 23}
         :groups
         {:useDefaultGroups false
          :entities
          {:shape "square"
           :color {:border "#2B7CE9"
                   :background "#97C2FC"
                   :highlight {:border "#2B7CE9"
                               :background "#b8fafe"}}}
          :processes
          {:shape "dot"
           :color {:border "#de7a13"
                   :background "#f7d26e"
                   :highlight {:border "#de7a13"
                               :background "#f5fba8"}}}}
           ;;:size 15
           ;;:font {:size 0}}}


         :interaction {:multiselect true
                       :tooltipDelay 500}
         :physics {:enabled false
                   :stabilization {:iterations 2000}}}
        opts (if (= mode :entities)
               (-> opts
                 (assoc-in [:groups :processes :size] 15)
                 (assoc-in [:groups :processes :font :size] 0))
               (if (= mode :processes)
                 (-> opts
                   (assoc-in [:groups :entities :size] 15)
                   (assoc-in [:groups :entities :font :size] 0))
                 opts))
        opts (if physics
               (assoc-in opts [:physics :enabled] true)
               opts)]
    (clj->js opts)))


(defn get-vis-graph
  [graph types]
  (let [adjust-pos (fn [item node]
                     (let [ui (get-in item [:meta :ui])
                           x (:x ui)
                           y (:y ui)
                           pos? (not (and x y))]
                       (merge node {:x (:x ui)
                                    :y (:y ui)
                                    :physics (boolean pos?)})))

        entity-nodes (->> (:entities graph)
                       (map (fn [[eid e]]
                              (let [node {:id (e-node-id (name eid))
                                          :label eid
                                          :group "entities"}
                                    node (adjust-pos e node)
                                    node (if (:json e)
                                           (assoc node :borderWidth 5
                                                       :borderWidthSelected 5)
                                           node)
                                    node (if (:isEvent e)
                                           (assoc node :shape "diamond")
                                           node)]
                                node))))

        process-nodes (->> (:processes graph)
                        (map (fn [[pid p]]
                               (let [node {:id (p-node-id (name pid))
                                           :label pid
                                           :group "processes"}
                                     node (adjust-pos p node)]
                                 (if (:autostart p)
                                   (assoc node :borderWidth 5
                                               :borderWidthSelected 5)
                                   node)))))

        nodes (concat entity-nodes process-nodes)

        edges (->> (:arcs graph)
                (vals)
                (map (fn [a]
                       (let [pid (p-node-id (:process a))
                             eid (e-node-id (:entity a))
                             p (get-in graph [:processes (keyword (:process a))])
                             ports (:ports p)
                             acc (and (not (:port a))
                                      (->> ports
                                        (filter (fn [[k v]] (= v (get types "ACCUMULATOR"))))
                                        (keys)
                                        (first)))]
                         (if (or acc (:port a))
                           (let [port (get ports (keyword (:port a)))
                                 edge {:from eid :to pid}] ;;:title (str "port: " (:port a))}]
                             (if (= port (get types "COLD"))
                               (assoc edge :dashes true
                                           :width 1
                                           :title "COLD")
                               (if acc
                                 (assoc edge :arrows {:middle true :from true :to true}
                                             :color {:inherit "to"}
                                             :title "ACCUMULATOR")
                                 (assoc edge :title "HOT"))))
                           (let [async (:async p)
                                 edge {:from pid :to eid}]
                             (if async
                               (assoc edge :dashes [1, 10]
                                           :width 3)
                               edge)))))))]

    {:nodes nodes :edges edges}))


(defn init-vis
  [net mode]
  (.setOptions net (get-graph-options {:physics true :mode mode}))

  (.on net "doubleClick"
    (fn [e]
      (let [evt (js->clj e :keywordize-keys true)
            nodes (:nodes evt)
            edges (:edges evt)]
        (when (= (count nodes) 1)
          (dispatch [:flow-runtime-ui/open-node (first nodes)])))))

  (.on net "oncontext"
    (fn [e]
      (let [evt (js->clj e :keywordize-keys true)
            nodes (:nodes evt)
            edges (:edges evt)]
        (when (and (= 0 (count nodes))
                   (= 0 (count edges)))
          (dispatch [:graph-ui/set-new-node-position (get-in evt [:pointer :canvas])])
          (dispatch [:graph-ui/open-context-menu :context/add-node
                                                 (get-in evt [:pointer :DOM])])))
      (.preventDefault (aget e "event"))))

  (.on net "dragEnd"
    (fn [e]
      (let [nodes (aget e "nodes")]
        (when (< 0 (aget nodes "length"))
          (dispatch [:flow-runtime-ui/set-node-positions (.getPositions net nodes)])))))

  (.on net "stabilized"
    (fn [stabilized-event]
      (println stabilized-event)
      (dispatch [:flow-runtime-ui/set-node-positions (.getPositions net)])))

  (.on net "deselectNode"
    (fn [e]
      (when (= 0 (.-length (aget e "nodes")))
        (dispatch [:graph-ui/set-active-node nil])))))




*/



export function graphView ({data, options}, dispatch, _, root) {
  const el = root || document.createElement('div')

  if (!root) {
    el.className = graphViewStyle

    const net = new vis.Network(el, data, options)

    css(el.querySelector('.vis-network'), { position: 'absolute' })

    net.on('select', e => dispatch(
      'state.gui.openEntity',
      e.nodes[0]
    ))

    net.on('dragEnd', e => {
      dispatch(
        'state.gui.updateGraphNodePositions',
        net.getPositions(e.nodes)
      )
      if (!hasCustomUI) {
        net.setOptions({ physics: { enabled: false } })
      }
    })

    net.on('stabilized', () => {
      dispatch(
        'state.gui.updateGraphNodePositions',
        net.getPositions()
      )
      if (!hasCustomUI) {
        net.setOptions({ physics: { enabled: false } })
      }
    })

    el.dataset.visnet = net
  }

  return el
}
