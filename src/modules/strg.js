// S T O R A G E HANDLE
const strg = {
	MAX: 5012,
	on: false,
	test: () => {
		try {
			const l = localStorage;
			const c = Math.random().toString(16).substr(2, 8);
			l.setItem(c, c);
			return l.getItem(c) === c ? !l.removeItem(c) : false;
		} catch (e) { return false; }
	},
	read: (key) => {
		try {
			return JSON.parse(localStorage.getItem(key));
		} catch (e) {
			return console.error(`${e.lineNumber}:${e.message}`);
		}
	},
	save: (key, val) => strg.on ? !localStorage.setItem(key, JSON.stringify(val)) : false,
	wipe: key => strg.on ? !localStorage.removeItem(key) : false,
	zero: o => { for (let k in o) { if (o.hasOwnProperty(k)) { return false; } } return true; }, // check if the object is empty
	grab: (key, def) => { const s = strg.read(key); return strg.zero(s) ? def : s; },
	size: () => {
		let length = 0;
		let key;
		try {
			for (key in window.localStorage) {
				if (window.localStorage.hasOwnProperty(key)) {
					length += window.localStorage[key].length;
				}
			}
		} catch (e) {
			// no more space
		}
		return 3 + ((length * 16) / (8 * 1024));
	},
	full: () => {
		try {
			const date = +(new Date());
			localStorage.setItem(date, date);
			localStorage.removeItem(date);
			return false;
		} catch (e) {
			if (e.name === 'QuotaExceededError' ||
					e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
				return true;
			}
		}
	},
	init: () => { strg.on = strg.test(); }
};
strg.init();

export default strg;