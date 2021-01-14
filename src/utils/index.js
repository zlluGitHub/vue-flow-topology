import { EventEmitter } from 'events';
export const events = new EventEmitter();
function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export const getUUID = () => {
	// let s = [];
	// let hexDigits = "0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
	// for (let i = 0; i < 36; i++) {
	// 	s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	// }
	// s[14] = "4";
	// s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	// s[8] = s[13] = s[18] = s[23] = "-";

	// let uuid = s.join("");
	// return uuid.replace(/-/g, '');

	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export default {
	events, getUUID
}