export const tools = [
	{
		type: 'drag',
		icon: 'drag',
		name: '拖拽'
	},
	{
		type: 'connection',
		icon: 'fork',
		name: '连线',
		shape: [{
			name: "贝塞尔曲线",
			type: 'Bezier'
		},
		{
			name: "直线",
			type: 'Straight'
		}, {
			name: "流程图线",
			type: 'Flowchart'
		}, {
			name: "状态线",
			type: 'StateMachine'
		}]
	},
	{
		type: 'zoom-in',
		icon: 'zoom-in',
		name: '放大'
	},
	{
		type: 'zoom-out',
		icon: 'zoom-out',
		name: '缩小'
	}
];

export const commonNodes = [
	// ********************新增内容****************//
	{
		type: 'processor',
		nodeName: '处理器',
		icon: 'sync'
	},
	{
		type: 'in',
		nodeName: '输入',
		icon: 'import'
	},
	{
		type: 'out',
		nodeName: '输出',
		icon: 'export'
	},
	// ************************************//
	{
		type: 'start',
		nodeName: '开始',
		icon: 'pause-circle'
	},
	{
		type: 'end',
		nodeName: '结束',
		icon: 'check-circle'
	},
	{
		type: 'common',
		nodeName: '人工节点',
		icon: 'apartment'
	},
	{
		type: 'freedom',
		nodeName: '自动节点',
		icon: 'cluster'
	},
	{
		type: 'gateway',
		nodeName: '网关',
		icon: 'gold'
	},
	{
		type: 'event',
		nodeName: '事件节点',
		icon: 'gateway'
	}
];

export const highNodes = [
	{
		type: 'child-flow',
		nodeName: '子流程',
		icon: 'ChildFlowIcon'
	}
];

export const laneNodes = [
	{
		type: 'x-lane',
		nodeName: '横向泳道',
		icon: 'XLaneIcon'
	},
	{
		type: 'y-lane',
		nodeName: '纵向泳道',
		icon: 'YLaneIcon'
	}
];
