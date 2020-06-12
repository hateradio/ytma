// H E L P E R Handle
const _ = {
	s: (selector, cb) => {
		const elements = _.qsa(selector);
		elements.some((element, index) => cb(element, index, elements) === false);
	},
	o: function (object, cb) {
		Object.keys(object).some(key => cb(key, object[key], object) === false);
	},
	e: function (t, o, e, p) {
		const c = document.createElement(t);
		_.o(o, (k, v) => {
			const b = k.charAt(0);
			if (b === '_')
				c.dataset[k.substring(1)] = v;
			else if (b === '$')
				c.setAttribute(k.substring(1), v);
			else
				c[k] = v;
		});

		if (e && p) {
			c.appendChild(e);
		} else if (e) {
			e.appendChild(c);
		}
		return c;
	},
	qsa: selector => Array.from(document.querySelectorAll(selector)),
	css: function (text) {
		if (!this.style) {
			this.style = document.createElement('style');
			this.style.type = 'text/css';
			document.body.appendChild(this.style);
		}
		this.style.appendChild(document.createTextNode(`${text}\n`));
	},
	js: t => {
		const j = document.createElement('script');
		j.type = 'text/javascript';
		j[/^https?:\/\//i.test(t) ? 'src' : 'textContent'] = t;
		document.head.appendChild(j);
	}
};

export default _;