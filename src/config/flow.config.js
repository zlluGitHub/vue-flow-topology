export const flowAnchors = ["Top", "Right", "Bottom", "Left"];
export const flowAnchor = "Continuous";
export const connectorType = ['Bezier', 'Flowchart', 'StateMachine', 'Straight'];
export const jsPlumbConfig = {
	isSource: true,// 是否可以拖动（作为连线起点）
	isTarget: true,// 是否可以放置（连线终点）
	connector: [
		"Straight",// 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
		// {
		// 	gap: 5,
		// 	cornerRadius: 8,
		// 	alwaysRespectStubs: true,
		// },
	],
	// connectionsDetachable: false,
	// anchors: ["Top", "Right", "Bottom", "Left"],//"Continuous", "AutoDefault","Top" ,"Right", "Bottom", "Left","TopRight", "TopLeft","BottomRight","BottomLeft", "Center"
	// anchor: "Continuous",//"Continuous", "AutoDefault","Top" ,"Right", "Bottom", "Left","TopRight", "TopLeft","BottomRight","BottomLeft", "Center"
	// isDetachable: false, //连线是否可重新编辑
	maxConnections: -1,
	// endpoint: 'Rectangle', //Dot:{radius,cssClass,hoverClass }、Rectangle:{width,height,cssClass,hoverClass }、Image:{src,cssClass,hoverClass }、Blank

	//锚点形状
	endpoints: [
		"Dot",
		{
			radius: 7,
			fill: "#000",
		},
	],

	//锚点样式
	paintStyle: {
		// fill: "#000",
		radius: 2, //锚点大小
		stroke: "#4caf50",
		strokeWidth: 1,
	},
	hoverPaintStyle: {
		// fill: "#4caf50",
		stroke: "#4caf50",
		strokeWidth: 3
	},

	//连线的样式
	connectorStyle: {
		// outlineStroke: "#000",
		strokeWidth: 1,
		// lineWidth: 1,
		stroke: "#4caf50",
		// joinstyle: "round",
		// fill: "pink",
		// outlineColor: "",
		// outlineWidth: "",
	},
	connectorHoverStyle: {
		strokeWidth: 2,
		//   lineWidth: 2,
		// strokeStyle: "red",
		// outlineWidth: 10,
		// outlineColor: "",
	},

	// Arrow 一个可配置的箭头
	// Label 标签，可以在连接上显示文字信息
	// PlainArrow 原始类型的箭头
	// Diamond 菱形箭头
	// Custom 自定义类型
	connectorOverlays: [
		[
			"Arrow",
			{
				width: 10,
				length: 10,
				visible: true,
				location: 1,
			},
		],
		// [
		// 	"Label",
		// 	{
		// 		label: "dfdf",
		// 		cssClass: "",
		// 		labelStyle: {
		// 			color: "red",
		// 		},
		// 		events: {
		// 			click: function (labelOverlay, originalEvent) {
		// 				console.log("点击了label");
		// 			},
		// 		},
		// 	},
		// ],
	],

}
// 节点默认参数
export const nodePrame = {
	// data: null
}
// 连线默认参数
export const linkPrame = {
	type: null
}
// 节点默认参数
export const flowConfig = {
	offsetX: -3000,
	offsetY: -3000,
	title:"",
	nodes: [],
	links: []
}