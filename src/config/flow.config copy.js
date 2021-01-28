

export const flowAnchors = ["Top", "Right", "Bottom", "Left"];
export const flowAnchor = "Continuous";
export const jsPlumbConfig = {
	isSource: true,// 是否可以拖动（作为连线起点）
	isTarget: true,// 是否可以放置（连线终点）
	connector: [
		"Bezier",// 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
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
	maxConnections: -1,// 设置连接点最多可以连接几条线
	// endpoint: 'Rectangle', //Dot:{radius,cssClass,hoverClass }、Rectangle:{width,height,cssClass,hoverClass }、Image:{src,cssClass,hoverClass }、Blank

	//锚点形状
	endpoints: [
		"Dot",
		{
			radius: 7,
			fill: "#aaa",
		},
	],

	//锚点样式
	paintStyle: {
		fill: "#aaa",
		radius: 2, //锚点大小
		stroke: "#aaa",
		strokeWidth: 1,
	},
	hoverPaintStyle: {
		fill: "#aaa",
		stroke: "#aaa",
		strokeWidth: 3
	},

	//连线的样式
	connectorStyle: {
		outlineStroke: "#aaa",
		strokeWidth: 1,
		// lineWidth: 1,
		// strokeStyle: "#4caf50",
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
				strokeStyle:  "#aaa"
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

export const flowData = {

	nodes: [
		{
			type: "start",
			name: "开始1",
			id: 'asfas1',
			icon: "pause-circle",
			height: 0,
			width: 0,
			x: 3200,
			y: 3200,
		},
		{
			type: "start",
			name: "开始2",
			id: 'asfas2',
			icon: "pause-circle",
			height: 50,
			width: 50,
			x: 3600,
			y: 3200,
		},
		{
			type: "start",
			name: "开始3",
			id: 'asfas3',
			icon: "pause-circle",
			height: 50,
			width: 50,
			x: 3400,
			y: 3400,
		},
		{
			type: "start",
			name: "开始4",
			id: 'asfas4',
			icon: "pause-circle",
			height: 50,
			width: 50,
			x: 3766,
			y: 3444,
		},
	],
	links: [
		{
			type: "link",
			id: "link-fg",
			sourceId: "asfas1",
			targetId: "asfas3",
			label: "aaaa"
		},
		// {
		// 	type: "link",
		// 	id: "link-df",
		// 	sourceId: "asfas1",
		// 	targetId: "asfas2",
		// 	label: "aaaa"
		// },
	]
}
export const flowData1 = {

	nodes: [
		{
			type: "start",
			name: "开1始1",
			id: 'as1fas1',
			icon: "pause-circle",
			height: 0,
			width: 0,
			x: 3220,
			y: 3220,
		},
		{
			type: "start",
			name: "开1始2",
			id: 'asfas12',
			icon: "pause-circle",
			height: 50,
			width: 50,
			x: 3620,
			y: 3220,
		},
		{
			type: "start",
			name: "开1始3",
			id: 'as1fas3',
			icon: "pause-circle",
			height: 50,
			width: 50,
			x: 3420,
			y: 3420,
		},
		{
			type: "start",
			name: "开1始4",
			id: 'asf1as4',
			icon: "pause-circle",
			height: 50,
			width: 50,
			x: 3726,
			y: 3424,
		},
	],
	links: [
		{
			type: "link",
			id: "linkw-fg",
			sourceId: "asfas12",
			targetId: "asf1as4",
			label: "aaaa"
		},
		// {
		// 	type: "link",
		// 	id: "link-df",
		// 	sourceId: "asfas1",
		// 	targetId: "asfas2",
		// 	label: "aaaa"
		// },
	]
}
