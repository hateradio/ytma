if (!Element.prototype.matches)
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest) {
	Element.prototype.closest = function (s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}

export const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

export const removeSearch = (uri, keepHash) => {
	// removes search query from a uri
	const s = uri.indexOf('?');
	const h = uri.indexOf('#');
	let hash = '';
	if (s > -1) {
		if (keepHash && h > -1) {
			hash = uri.substr(h);
		}
		uri = uri.substr(0, s) + hash;
	}
	return uri;
};

/**
 * @param {HTMLElement} element HTML element
 * @param {string} events Space- or coma-separated string of one or more types, eg "click dblclick"
 * @param {string} selector CSS selector for the elements to trigger the event on
 * @param {Function} listener A callback
 * @param {Boolean} cancel Cancel
 */
export const on = (element, events, selector, listener, cancel = true) => {
	events = events.split(/(?:\s+|,)/).filter(f => f);

	if (events.length === 0) return;

	const fn = event => {
		const found = event.target.closest(selector);
		if (found) listener.call(found, event);
	};

	events.forEach(type => element.addEventListener(type, fn, cancel));
};

export const debounce = (fn, delay = 250) => {
	let timeout;

	return function (...args) {
		const timed = () => {
			timeout = null;
			fn.apply(this, args);
		};

		window.clearTimeout(timeout);
		timeout = window.setTimeout(timed, delay);
	};
};