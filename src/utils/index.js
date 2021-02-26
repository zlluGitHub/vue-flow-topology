
const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
export const getUUID = () => {
	return (S4() + S4() + "-" + S4() + "-" + S4());
}
export const deepClone = source => {
	const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
	for (let keys in source) {
		// 遍历目标
		if (source.hasOwnProperty(keys)) {
			if (source[keys] && typeof source[keys] === "object") {
				// 如果值是对象，就递归一下
				targetObj[keys] = source[keys].constructor === Array ? [] : {};
				targetObj[keys] = deepClone(source[keys]);
			} else {
				// 如果不是，就直接赋值
				targetObj[keys] = source[keys];
			}
		}
	}
	return targetObj;
}
export const uploadFile = (input, callBack) => {
	//支持chrome IE10  
	if (window.FileReader) {
		let file = input.files[0], filename = file.name.split(".")[0];
		let reader = new FileReader();
		reader.onload = function () {
			// console.log(this.result);
			callBack(this.result, filename)
		}
		reader.readAsText(file);
	}
	//支持IE 7 8 9 10  
	else if (typeof window.ActiveXObject != 'undefined') {
		let xmlDoc;
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.load(input.value);
		callBack(xmlDoc.xml)
	}
	//支持FF  
	else if (document.implementation && document.implementation.createDocument) {
		let xmlDoc;
		xmlDoc = document.implementation.createDocument("", "", null);
		xmlDoc.async = false;
		xmlDoc.load(input.value);
		callBack(xmlDoc.xml)
	} else {
		console.error('文件读取失败！')
	}
}
export default { getUUID, uploadFile }