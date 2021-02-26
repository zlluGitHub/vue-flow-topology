import { deepClone } from "@/utils";
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let storeData = {
  state: {
    jspInit: null,
    flowMenuObj: {
      type: 'drag-drop',
      connector: 'Bezier'
    },
    // flowData:{ "offsetX": -2993, "offsetY": -2991,nodes:[],links:[]},
    flowData: { "offsetX": -2993, "offsetY": -2991, "title": "数据处理流程图", "nodes": [{ "name": "终止节点", "type": "end-node", "id": "03b711a6-e730-7dc4", "x": 3369, "y": 3237 }, { "name": "输出", "type": "out-node", "id": "2f2f5c9c-effb-9846", "x": 4062, "y": 3233 }, { "name": "起始节点", "type": "start-node", "id": "efa686eb-c07b-4d92", "x": 3683, "y": 3088 }, { "name": "输入", "type": "in-node", "id": "5dbc5113-c54a-c119", "x": 3091, "y": 3302 }, { "name": "基础配置", "type": "cog-node", "icon": "md-cog", "id": "008a6541-ccfc-03b5", "x": 3548, "y": 3693 }, { "name": "抽离模块", "type": "codepen-node", "icon": "md-cube", "id": "9b593548-5b94-220c", "x": 3041, "y": 3567 }, { "name": "进程监听", "type": "pulse-node", "icon": "md-pulse", "id": "d59a2dbd-140a-80ff", "x": 4030, "y": 3536 }, { "name": "输出", "type": "out-node", "id": "7a42861e-6e6b-ad35", "x": 4213, "y": 3091 }, { "name": "抽离模块", "type": "codepen-node", "icon": "md-cube", "id": "b7184cb9-95ca-3b77", "x": 3580, "y": 3381 }, { "name": "进程监听", "type": "pulse-node", "icon": "md-pulse", "id": "c00fb55c-2ebf-22d6", "x": 3102, "y": 3072 }], "links": [{ "id": "93525b44-b67d-b02c", "connector": "Flowchart", "sourceId": "03b711a6-e730-7dc4", "targetId": "5dbc5113-c54a-c119" }, { "id": "dfbdad0e-baf2-45ae", "connector": "Flowchart", "sourceId": "03b711a6-e730-7dc4", "targetId": "efa686eb-c07b-4d92" }, { "id": "5b75278a-ce70-1339", "connector": "Flowchart", "sourceId": "efa686eb-c07b-4d92", "targetId": "2f2f5c9c-effb-9846" }, { "id": "8b78c9ed-b270-b66a", "connector": "Bezier", "sourceId": "03b711a6-e730-7dc4", "targetId": "9b593548-5b94-220c", "label": "开发" }, { "id": "ea20501e-c11a-7639", "connector": "Bezier", "sourceId": "2f2f5c9c-effb-9846", "targetId": "d59a2dbd-140a-80ff" }, { "id": "4d63a745-f096-f3dc", "connector": "Straight", "sourceId": "2f2f5c9c-effb-9846", "targetId": "008a6541-ccfc-03b5" }, { "id": "f3706e5b-404b-3552", "connector": "Straight", "sourceId": "03b711a6-e730-7dc4", "targetId": "008a6541-ccfc-03b5" }, { "id": "e5bb1821-f195-d534", "connector": "Flowchart", "sourceId": "008a6541-ccfc-03b5", "targetId": "d59a2dbd-140a-80ff" }, { "id": "3629f98f-fa50-a83e", "connector": "Flowchart", "sourceId": "9b593548-5b94-220c", "targetId": "008a6541-ccfc-03b5" }, { "id": "ad71eb33-0dea-8661", "connector": "Flowchart", "sourceId": "7a42861e-6e6b-ad35", "targetId": "d59a2dbd-140a-80ff" }, { "id": "16d48ac7-bfc8-c9ae", "connector": "Bezier", "sourceId": "7a42861e-6e6b-ad35", "targetId": "2f2f5c9c-effb-9846" }, { "id": "cb69aad0-5126-7b18", "connector": "Bezier", "sourceId": "efa686eb-c07b-4d92", "targetId": "b7184cb9-95ca-3b77" }, { "id": "e3e31972-0274-1e76", "connector": "Bezier", "sourceId": "b7184cb9-95ca-3b77", "targetId": "2f2f5c9c-effb-9846" }, { "id": "871a35d1-408d-baef", "connector": "Bezier", "sourceId": "b7184cb9-95ca-3b77", "targetId": "008a6541-ccfc-03b5" }, { "id": "b0ec12a6-1089-088d", "connector": "Bezier", "sourceId": "b7184cb9-95ca-3b77", "targetId": "03b711a6-e730-7dc4" }, { "id": "71032d91-8f54-91ec", "connector": "Bezier", "sourceId": "b7184cb9-95ca-3b77", "targetId": "b7184cb9-95ca-3b77" }, { "id": "59a2af00-5710-ce4e", "connector": "Bezier", "sourceId": "d59a2dbd-140a-80ff", "targetId": "d59a2dbd-140a-80ff" }, { "id": "ffb1c9ef-0ccb-874b", "connector": "Flowchart", "sourceId": "03b711a6-e730-7dc4", "targetId": "c00fb55c-2ebf-22d6" }] },
    // 添加新节点
    newNode: {
      state: false,
      node: {}
    },
    //选中的节点、连线数据
    selectContent: {
      type: "",
      data: {}
    },
    //步骤缓存
    flowStepData: [],
    stepIndex: 0,
  },
  mutations: {
    setSelectContent(state, data) {
      state.selectContent = {
        type: data.type ? data.type : '',
        data: data.data ? data.data : ''
      };
    },
    setJspInit(state, data) {
      state.jspInit = data;
    },
    setFlowData(state, dataObj) {
      let data = deepClone(dataObj)
      if (data.method) {
        if (data.method === "add-node") {
          state.flowData.nodes.push(data.node);
          storeData.mutations.setFlowStepData(state, state.flowData);
        } else if (data.method === "delete-node") {
          let nodes = state.flowData.nodes.filter(node => data.node.id !== node.id)
          let links = state.flowData.links.filter(link => {
            if (link.sourceId === data.node.id || link.targetId === data.node.id) {
              return false
            }
            return true
          });
          state.flowData = { ...state.flowData, ...{ nodes, links } };
          storeData.mutations.setFlowStepData(state, state.flowData);
        } else if (data.method === "add-link") {
          state.flowData.links.push(data.link);
          storeData.mutations.setFlowStepData(state, state.flowData);
        } else if (data.method === "delete-link") {
          state.flowData.links = state.flowData.links.filter(item => {
            if (((item.sourceId === data.link.sourceId) && (item.targetId === data.link.targetId)) || ((item.sourceId === data.link.targetId) && (item.targetId === data.link.sourceId))) {
              return false
            }
            return true;
          })
          storeData.mutations.setFlowStepData(state, state.flowData);
        } else if (data.method === "all-update") {
          state.flowData = data.data
          state.flowStepData = [];
          state.stepIndex = 0;
          storeData.mutations.setFlowStepData(state, state.flowData);
        }
      } else {
        state.flowData = { ...state.flowData, ...data };
      }

      sessionStorage.setItem("flowData", JSON.stringify(state.flowData));
      console.log(state.flowData);
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
    // 缓存flow步骤
    setFlowStepData(state, data) {
      if (!data) {
        state.flowStepData = [];
        state.stepIndex = 0;
      } else {
        let newArr = deepClone(state.flowStepData.slice(0, state.stepIndex + 1))
        newArr.push(deepClone(data));
        state.flowStepData = newArr;
        state.stepIndex = newArr.length - 1
      }
    },
    setStepIndex(state, i) {
      state.stepIndex = i;
    },
  },
  actions: {
  },
  modules: {
  }
};

export default new Vuex.Store(storeData);
