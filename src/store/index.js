import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flowMenuObj: {
      type: 'drag-drop',
      connector: 'Bezier'
    },
    // flowData: {
    //   offsetX: -3000,
    //   offsetY: -3000,
    //   nodes: [],
    //   links: []
    // },
    flowData: { "offsetX": -3000, "offsetY": -3000, "nodes": [{ "name": "scsds", "type": "start-node", "id": "6785de53-2bbe-10a3-eb47-354442de881a", "x": 3237, "y": 3111 }, { "name": "scsds", "type": "start-node", "id": "cb0184d0-fd8a-7acf-1448-b7fa3b77fa20", "x": 3472, "y": 3192 }, { "name": "scsds", "type": "start-node", "id": "115678b9-4a4a-c8b9-68e7-8cfc95aca8bd", "x": 3658, "y": 3333 }], "links": [{ "id": "c185cada-5e2f-5c89-3c17-984a78618814", "sourceId": "6785de53-2bbe-10a3-eb47-354442de881a", "targetId": "cb0184d0-fd8a-7acf-1448-b7fa3b77fa20" }, { "id": "e43fea79-5a63-6b91-bddd-cb297e9d858a", "sourceId": "6785de53-2bbe-10a3-eb47-354442de881a", "targetId": "6785de53-2bbe-10a3-eb47-354442de881a" }, { "id": "1459dfc9-9ae9-1744-ba36-80b9e131f196", "sourceId": "cb0184d0-fd8a-7acf-1448-b7fa3b77fa20", "targetId": "115678b9-4a4a-c8b9-68e7-8cfc95aca8bd" }] },
    newNode: {
      state: false,
      node: {}
    }
  },
  mutations: {
    setFlowData(state, data) {
      if (data.method && (data.node || data.link)) {
        if (data.method === "add-node") {
          state.flowData.nodes.push(data.node)
        } else if (data.method === "delete-node") {
          let nodes = state.flowData.nodes.filter(node => data.node.id !== node.id)
          let links = state.flowData.links.filter(link => {
            if (link.sourceId === data.node.id || link.targetId === data.node.id) {
              return false
            }
            return true
          });
          state.flowData = { ...state.flowData, ...{ nodes, links } };
        } else if (data.method === "add-link") {
          state.flowData.links.push(data.link);
        } else if (data.method === "delete-link") {
          state.flowData.links = state.flowData.links.filter(item => {
            if (((item.sourceId === data.link.sourceId) && (item.targetId === data.link.targetId)) || ((item.sourceId === data.link.targetId) && (item.targetId === data.link.sourceId))) {
              return false
            }
            return true;
          })
        }
      } else {
        state.flowData = { ...state.flowData, ...data };
      }
      // console.log(JSON.stringify(state.flowData));

    },
    setFlowMenuObj(state, data) {
      state.flowMenuObj = {
        type: data.type,
        connector: data.connector
      };
    },
    setNewNode(state, data) {
      if (data.state) {
        state.newNode.state = data.state;
      } else {
        state.newNode.state = false
      }
      if (data.node) {
        state.newNode.node = data.node;
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
