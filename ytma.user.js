// ==UserScript==
// Do not modify and re-release this script!
// If you would like to add support for other sites, please tell me and I'll put it in the includes.

// @id             youtube-me-again
// @name           YouTube Me Again!
// @namespace      hateradio)))
// @author         hateradio
// @version        7.9.1
// @description    ytma! automatically converts YouTube(TM), Vimeo, Vine, Soundcloud, WebM, and MP4 links into real embedded videos.
// @homepageURL    https://greasyfork.org/en/scripts/1023-youtube-me-again
// @icon           https://www.dropbox.com/s/b85qmq0bsim407s/ytma32.png?dl=1
// @icon64         https://www.dropbox.com/s/5zw3al38yf39wxb/ytma64.png?dl=1
// @screenshot     https://www.dropbox.com/s/syy9916b1prygl9/ytmascreen5.png?dl=1

// @include        https://vine.co/v/*/embed/simple
// @match          https://vine.co/v/*/embed/simple

// @include        https://gfycat.com/iframe/*
// @match          https://gfycat.com/iframe/*

// @include        http*://*.neogaf.com/threads/*
// @include        http*://*.resetera.com/threads/*

// @match          *://*.neogaf.com/threads/*
// @match          *://*.resetera.com/threads/*

// @updated        22 Jan 2019

// @grant          GM.xmlhttpRequest
// @grant          GM_xmlhttpRequest

// @run-at         document-end
// ==/UserScript==

/*

## Updates

#### 8

* Update YTMA to ESNext

#### 7.9.1

* Fix: (XenoForo) Ignore links in more text areas

#### 7.9

* Fix: (XenoForo) Ignore links in text areas

#### 7.8

* Fix iFrame selectors
* Adds a monitoring interface to check for updated pages

#### 7.7

* New: YTMA will now try to find new links on AJAX-loaded posts on ResetEra
* Reverts Gfycat iFrame support; removes video tag for wider support
* Removes an outdated Chrome blacklist

#### 7.6

* Fix: overrides resetera support of embeded videos

#### 7.5

* New: Support for ResetEra
* Fix: Parses hours from YouTube URLs

#### 7.2.2

* Updates YouTube iFrame to hide related video feature when pausing

#### 7.2.1

* New: Extension info
* Updates JSHint options
* Removes outdated @include links

#### 7.2

* New: CSS rule to make videos fit within smaller windows
* New: GitHub repository and update links
* New: Streamable favicon
* Fix: Vimeo favicon

#### 7.1

* HTTPS links for Vimeo and Gfycat
* Fix: Safari bug

#### 7

* New: NeoGAF HTTPS Support
* New: Streamable.com added
* New: Soundcloud playlist support
* Improved time parser
* Upon scrolling, cached descriptions are shown
* Code reorganization makes adding new media sites easier

### 6

* New: Imgur GIFV (WEBM/MP4) support
* New: Button to remove cache (descriptions/thumbnail links/etc)
* New: SoundCloud playlist support
* Default video quality is now 720p/HD
* Soundcloud now uses HTML5 player
* Players that open on scroll will no longer trigger the opening of players higher on the page
* Adds HTML5, Gfycat, Imgur icons on links
* Improved Soundcloud and GfyCat URL matchers
* Restructured code base to simplify creation of media controls
* Restructured CSS
* Patched back Gfycat iFrame setting for Safari (it is incompatible with new settings)
* Updates YouTube data API
* Removes:
	* Object tag for YouTube for Flash (Deprecated)
	* "Batch" loading of descriptions (Only manual and scroll methods are supported)

// #Updates

Whitelist these sites on NoScript/NotScript/etc.
------------------------------------------------

* neogaf.com
* youtube.com
* youtube-nocookie.com
* googlevideo.com (HTML5 player sends videos from this domain)
* googleapis.com (YT video descriptions)
* vimeo.com
* vimeocdn.com
* soundcloud.com
* sndcdn.com
* vineco.com
* vine.com
* vine.co
* gfycat.com
* github.io


Whitelist these on Ghostery
---------------------------

* SoundCloud (Widgets, Audio / Music Player)

 */


(() => {
	const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

	const removeSearch = (uri, keepHash) => {
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

	if (!Element.prototype.matches)
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

	if (!Element.prototype.closest) {
		Element.prototype.closest = function (s) {
			let el = this;
			if (!document.documentElement.contains(el)) return null;
			do {
				if (el.matches(s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);
			return null;
		};
	}

	// H E L P E R Handle
	const _ = {
		s: (selector, cb) => {
			const elements = _.x(selector);
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
		x: selector => Array.from(document.querySelectorAll(selector)),
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
		},
		/**
		 * @param {HTMLElement} element HTML element
		 * @param {string} types Space- or coma-separated string of one or more types, eg "click dblclick"
		 * @param {string} selector CSS selector for the elements to trigger the event on
		 * @param {Function} listener A callback
		 */
		on: (element, types, selector, listener) => {
			types = types.split(/(?:\s+|,)/).filter(f => f);

			if (types.length === 0) return;

			const fn = event => {
				const found = event.target.closest(selector);
				if (found) listener.call(found, event);
			};

			types.forEach(type => element.addEventListener(type, fn, true));
		},
		debounce: (fn, delay = 250) => {
			let timeout;

			return function (...args) {
				const timed = () => {
					timeout = null;
					fn.apply(this, args);
				};

				window.clearTimeout(timeout);
				timeout = window.setTimeout(timed, delay);
			};
		}
	};

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
			} catch (e) { }
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

	// U P D A T E HANDLE
	const update = {
		name: 'ytma!',
		version: 7910,
		key: 'ujs_YTMA_UPDT_HR',
		callback: 'ytmaupdater',
		page: 'https://greasyfork.org/scripts/1023-youtube-me-again',
		json: 'https://hateradio.github.io/ytma/update.json',
		interval: 7,
		day: (new Date()).getTime(),
		show: false,
		time: () => new Date(update.day + (1000 * 60 * 60 * 24 * update.interval)).getTime(),
		notification: ({ version, page }) => {
			if (update.version < version) {
				strg.save(update.key, { date: update.time(), version, page });
				update.link();
			}
		},
		link: () => {
			if (update.show) { return; }
			update.show = true;

			const { page } = strg.read(update.key);
			const link = `
				<a href="${page || update.page}" id=updater3 title=Update target=_blank>
					An update for ${update.name} is available.
				</a>`;

			_.css(update.css);
			document.body.insertAdjacentHTML('beforeend', link);
			_.on(document.body, 'click', '#updater3', e => e.target.style.display = 'none');
		},
		check: (opt) => {
			if (!strg.on) { return; }
			if (window.chrome && window.chrome.extension) { return; }
			const stored = strg.read(update.key);
			let page;

			if (opt || !stored || stored.date < update.day) {
				page = (stored && stored.page) || update.page;
				strg.save(update.key, { date: update.time(), version: update.version, page });
				fetch(update.json).then(res => res.json()).then(update.notification);
			} else if (update.version < stored.version) {
				update.link();
			}
		},
		css: '#updater3,#updater3:visited{box-shadow:1px 1px 6px #7776;border-bottom:3px solid #e39c2d;cursor:pointer;color:#555;font-family:sans-serif;font-size:12px;font-weight:700;text-align:justify;position:fixed;z-index:999999;right:10px;top:10px;background:#ebebeb url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTM0IDUxMiA1MTIiPjxwYXRoIGZpbGw9IiNlNWViZjUiIGQ9Ik0yNzAuNzgxIDcuNUgyNDEuMjJMOC42NiA0MTAuMzA1bDE0Ljc4MSAyNS42MDFINDg4LjU2bDE0Ljc4LTI1LjYwMXptMCAwIi8+PHBhdGggZmlsbD0iI2Y4ZTg2OCIgZD0iTTQ4LjcwNyA0MDAuOTM0TDI1My4xMjkgNDYuODY3aDUuNzQybDIwNC40MjIgMzU0LjA2N2MtMS4yNzcgMi4yMS0xLjU5NCAyLjc2NS0yLjg3MSA0Ljk3Nkg1MS41NzhjLTEuMjc3LTIuMjEtMS41OTQtMi43NjUtMi44NzEtNC45NzZ6bTAgMCIvPjxwYXRoIGZpbGw9IiNlMzljMmQiIGQ9Ik0yNzUuOTk2IDc2LjUyN2wtMTcuMTI1LTI5LjY2aC01Ljc0Mkw0OC43MDcgNDAwLjkzNGMxLjI3NyAyLjIxIDEuNTk0IDIuNzY1IDIuODcxIDQuOTc2aDM5Ljk5NmMtMS4yNzctMi4yMS0xLjU5Ny0yLjc2NS0yLjg3LTQuOTc2em0wIDAiLz48cGF0aCBmaWxsPSIjY2FkOGVhIiBkPSJNMjc1Ljk5NiAxNi41MzVMMjcwLjc4MSA3LjVIMjQxLjIyTDguNjYgNDEwLjMwNWM2LjU2NyAxMS4zNzkgOC4yMTEgMTQuMjIyIDE0Ljc4MSAyNS42MDFoMzkuOTk2Yy02LjU3LTExLjM3OS04LjIxNC0xNC4yMjItMTQuNzgtMjUuNjAxem0wIDAiLz48cGF0aCBmaWxsPSIjNzI4NjllIiBkPSJNMjcwLjg1NSAzMDIuNDU3aC0yOS43MWMtMy4wMDQtMy4wMDQtNC42OTItNC42ODctNy42OTYtNy42OTFWMTYzLjg2M2g0NS4xMDJ2MTMwLjkwM2MtMy4wMDggMy4wMDQtNC42OTIgNC42ODctNy42OTYgNy42OTF6bTAgMCIvPjxwYXRoIGZpbGw9IiM1MzYyNzUiIGQ9Ik0yNTMuNDUgMTYzLjg2M2gtMjB2MTMwLjkwM2MzLjAwMyAzLjAwNCA0LjY5IDQuNjg3IDcuNjk1IDcuNjkxaDE5Ljk5NmwtNy42OTItNy42OTF6bTAgMCIvPjxwYXRoIGZpbGw9IiM3Mjg2OWUiIGQ9Ik0yMzMuNDUgMzMwLjgxM2g0NS4xdjQ1LjEwMWgtNDUuMXptMCAwIi8+PHBhdGggZmlsbD0iIzUzNjI3NSIgZD0iTTIzMy40NSAzMzAuODEzaDIwdjQ1LjEwMWgtMjB6bTAgMCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNzUuOTk2IDE0MS4zNjdIMjYxdi0xNWgxNC45OTZ6bS0yNC45OTYgMGgtMTV2LTE1aDE1em0wIDAiLz48cGF0aCBkPSJNNDAwLjQzIDIxNy4wNTlsLTEyLjk4OSA3LjVMNDk0LjY4IDQxMC4zMDVsLTEwLjQ1IDE4LjEwMUgyNy43N2wtMTAuNDU0LTE4LjEwMUwyNDUuNTQ2IDE1aDIwLjkwN2wxMDcuMjM4IDE4NS43NDYgMTIuOTg5LTcuNUwyNzUuMTEzIDBoLTM4LjIyMkwwIDQxMC4zMDVsMTkuMTEgMzMuMTAxaDQ3My43NzdMNTEyIDQxMC4zMDV6bTAgMCIvPjxwYXRoIGQ9Ik0xMjUuMTU2IDQxMy40MDZINDY0Ljc1bDcuMjAzLTEyLjQ3Mi0yMDguNzUtMzYxLjU2N2gtMTQuNDA2TDQwLjA0NyA0MDAuOTM0bDcuMiAxMi40NzJoNTcuOTEzVjM5OC40MUg1OC44MjRMMjU2IDU2Ljg5bDE5Ny4xNzYgMzQxLjUyaC0zMjguMDJ6bTAgMCIvPjxwYXRoIGQ9Ik0yODYuMDQ3IDIyOS41NTl2LTczLjE5NmgtNjAuMDk4djE0MS41MDhsMTIuMDkgMTIuMDg2aDM1LjkyMmwxMi4wODYtMTIuMDg2VjI0OS41NkgyNzEuMDV2NDIuMDk3bC0zLjMwMSAzLjMwNWgtMjMuNWwtMy4zLTMuMzA1VjE3MS4zNjNoMzAuMXY1OC4xOTZ6bTAgME0yMjUuOTUgMzgzLjQxaDYwLjA5N3YtNjAuMDk4aC02MC4wOTh6bTE1LTQ1LjA5OGgzMC4xdjMwLjEwMmgtMzAuMXptMCAwIi8+PC9zdmc+) no-repeat 10px center;background-size:40px;padding:0 20px 0 60px;height:55px;line-height:55px}#updater3:hover,#updater3:visited:hover{color:#b33a3a !important;border-color:#ce4b30;text-decoration: none;}' // Icon made by Freepik from www.flaticon.com 
	};
	update.check();

	/** Y T M A CLASS
	 * @private
	 * Base YTMA class, filled through constructor() or reactivate() though sub-classes
	 * Y's only concerned about the anchor and the data props
	 *
	 * @param {object} props Properties
	 * @param {String|Number} props.id Unique ID
	 * @param {String} props.site Website name eg: youtube, vimeo
	 * @param {HTMLAnchorElement} props.anchor Anchor element
	 */
	class Y {

		constructor({ id, site, anchor }) {
			const uid = Y.escapeId(`${id}_${Y.num += 1}`);

			this.state = {
				id,
				uid: Y.escapeId(uid), // unique id
				sid: Y.escapeId(id), // shared id
				site,
				uri: anchor.href
			};

			if (anchor && !anchor.dataset.ytmscroll) { anchor.dataset.ytmscroll = true; }

			this.anchor = anchor;
		}

		/**
		 * Recreates a YTMA object from a trigger element
		 * @param {HTMLElement} element the element's dataset for the resurection!
		 */
		reactivate({ dataset }) {
			const id = dataset.ytmid;
			const anchor = document.querySelector(`a[data-ytmuid="${dataset.ytmuid}"]`);

			this.state = {
				id,
				uid: dataset.ytmuid,
				sid: dataset.ytmsid,
				site: dataset.ytmsite,
				uri: anchor.href
			};

			this.anchor = anchor;

			return this;
		}

		disableOpenOnScroll() {
			this.anchor.dataset.ytmscroll = false;
		}

		canScroll() {
			return this.anchor.dataset.ytmscroll === 'true';
		}

		isBelow(link) {
			return Scroll.compare(this.anchor, link) < 1;
		}

		canShowUnder(link) {
			this.canScroll() && this.isBelow(link);
		}

		updateAnchor() {
			if (this.anchor.getElementsByTagName('img').length === 0) {
				this.anchor.className += ` ytm_link ytm_link_${this.state.site} `;
			}
			this.anchor.dataset.ytmid = this.state.id;
			this.anchor.dataset.ytmuid = this.state.uid;
			this.anchor.dataset.ytmsid = this.state.sid;
			this.anchor.title = 'Visit the video page.';
		}

	}

	/** C O N T A I N E R CLASS
	 * The container, as the name implies, contains all the interactive elements
	 * Thumbnail, Player, Controls, etc.
	 */
	class Container extends Y {

		createInterface() {
			const { state } = this;
			this.site = Y.DB.sites[state.site];
			const { ajax, slim } = this.site;

			this.updateAnchor();

			this.body = _.e('div', {
				id: `w${state.uid}`,
				className: `ytm_spacer ytm_block ytm_site_${state.site}`,
				innerHTML: this.createThumbnailTemplate()
			});

			this.thumbnail = this.body.firstElementChild;

			if (ajax) { this.createAjaxLink(); }
			if (slim) { this.body.classList.add('ytm_site_slim'); }

			this.anchor.insertAdjacentElement('afterend', this.body);

			try {
				Container.decorators[state.site].gui(this);
			} catch (e) {
				// meh
			}
		}

		updateAnchor() {
			const { scroll, https } = this;
			if (scroll) { this.anchor.classList.add('ytm_scroll'); }
			if (https) { this.anchor.href = this.anchor.href.replace('http:', 'https:'); }

			super.updateAnchor();
		}

		createThumbnailTemplate() {
			const { title, thumb = '' } = this.site;
			const { id, uid, sid, site } = this.state;

			const bg = thumb ? `background-image: ${thumb.replace('%key', id)}` : '';

			const template = `
				<span class="ytm_trigger ytm_block ytm_normalize ytm_sans"
					title="${title}"
					data-ytmid="${id}"
					data-ytmsite="${id}"
					style="${bg}">
					<span class="ytm_init ytm_label ytm_sans ytm_box">${title}</span>
						<var class="ytm_label ytm_box"
							data-ytmid="${id}"
							data-ytmuid="${uid}"
							data-ytmsid="${sid}"
							data-ytmsite="${site}">\u25B6</var>
					</span>
				</span>`;
			return template;
		}

		createAjaxLink() {
			const { sid, id, site, uri } = this.state;
			const template = `
				<span class="ytm_bd ytm_normalize ytm_manual _${sid}">
					<a href="#" class="ytm_title" title="Load this video's description."
						data-ytmid="${id}"
						data-ytmsite="${site}"
						data-ytmuri="${uri}"
						data-ytmdescription="true"
					>Load Description</a>
				</span>`;
			this.body.insertAdjacentHTML('beforeend', template);
		}

		createProjector() {
			this.projector = _.e('div', {
				className: 'ytm_projector ytm_none ytm_block ytm_normalize ytm_sans',
				innerHTML: Container.templates.menu
			});
			this.thumbnail.insertAdjacentElement('afterend', this.projector);
		}

		showPlayer() {
			this.thumbnail.classList.add('ytm_none');
			this.projector.classList.remove('ytm_none');
		}

		hidePlayer() {
			this.thumbnail.classList.remove('ytm_none');
			this.projector.classList.add('ytm_none');
		}

	}

	Container.templates = {
		menu: `
			<ul class="ytm_options ytm_sans">
				<li>
					<ul class="ytm_ratios">
						<li data-type="ratio" data-value="1" title="SD">4:3</li>
						<li data-type="ratio" data-value="2" title="Landscape">16:9</li>
						<li data-type="ratio" data-value="3" title="Portrait">9:16</li>
					</ul>
				</li>
				<li>
					<ul class="ytm_sizes">
						<li data-type="size" data-value="0" title="Hide the video.">\u00D8</li>
						<li data-type="size" data-value="240" title="240p">S</li>
						<li data-type="size" data-value="360" title="360p">M</li>
						<li data-type="size" data-value="480" title="480p">L</li>
						<li data-type="size" data-value="720" title="720p">X</li>
					</ul>
				</li>
				<li>
					<ul class="ytm_options">
						${strg.on ? '<li data-type="settings" data-value="" title="YTMA Settings">!</li>' : ''}
						<li data-type="close" data-value="" title="Close the video.">\u00D7</li>
					</ul>
				</li>
			</ul>`
	};

	Container.decorators = { // modify interface according to site
		youtube: {
			gui: function (control) {
				control.anchor.href = this.anchor.href.replace('youtu.be/', 'youtube.com/watch?v=');
			},
			thumbEvent: _.debounce(function (e) {
				if (e.type === 'mouseenter') {
					this.dataset.thumb = ((this.dataset.thumb || 0) + 1) % 3;
					this.style.backgroundImage = `url(https://i3.ytimg.com/vi/${this.dataset.ytmid}/${(+this.dataset.thumb) + 1}.jpg)`;
					this.dataset.timeout = window.setTimeout(Container.decorators.youtube.thumbEvent.bind(this, e), 800);
				} else {
					window.clearTimeout(this.dataset.timeout);
				}
			}, 100)
		}
	};

	Container.events = {
		setup: () => {
			_.on(document.body, 'click', 'var[data-ytmuid]', Container.events.fromTarget);
			_.on(document.body, 'click', 'a[data-ytmdescription]', Container.events.manualLoad);
			_.on(document.body, 'dblclick', 'q[data-full]', Container.events.titleToggle);

			_.on(document.body, 'mouseenter mouseleave', '.ytm_site_youtube span.ytm_trigger', Container.decorators.youtube.thumbEvent);
		},
		fromTarget: ({ target }) => { // trigger the ui
			console.info('ytma//click+trig(id)', target.dataset.ytmuid);
			Control.createFromTrigger(target).showPlayer();
		},
		manualLoad: e => {
			e.preventDefault();
			const { target } = e;
			console.info('ytma//click+desc(id)', target.dataset.ytmid);
			if ((target.dataset.tries || 0) <= 4) {
				Y.ajax.loadFromDataset(target.dataset);
			}
		},
		titleToggle: e => {
			const target = e.target;
			target.classList.toggle('ytm_descr_open');
			target.textContent = target.textContent.length < 140 ? target.dataset.full : `${target.dataset.full.substr(0, 130)} . . .`;
			target.removeAttribute('style');
		}
	};

	Y.num = 0;

	Y.addToSet = ytma => Y.set[ytma.state.uid] = ytma;

	Y.create = link => Y.grabIdAndSite(link, (data, err) => {
		if (err) {
			console.warn(link.href, err);
			return {};
		}

		const control = new Control({ ...data, anchor: link });
		Y.addToSet(control);
		control.createInterface();

		return control;
	});

	Y.grabIdAndSite = (link, cb) => {
		let uri = link.href || link.src;
		let id;
		let match;
		try {
			const site = Y.reg.siteByTest[Y.reg.siteExpressions.test(uri) ? RegExp.lastMatch : ''];
			// console.log(site);

			if (site === 'html5') { // || site === 'html5-audio'
				id = uri.slice(-15);
			} else if (site === 'soundcloud') {
				if (!Y.reg.extra.soundcloud.playlist.test(uri)) {
					link.href = uri = Y.reg.fix.soundcloud(uri);
				}

				match = Y.DB.sites.soundcloud.matcher.exec(uri);
				id = Y.escapeId(match[1]);

				if (match && Y.reg.extra.soundcloud.tracks.test(uri)) {
					id = id.slice(-50);
				}
			} else {
				id = uri.match(Y.DB.sites[site].matcher)[1];
			}

			console.info('ytma//id+site', id, site, match);
			if (id && Y.DB.sites[site]) {
				return cb({ id, site }, null);
			}
			throw TypeError(`Invalid ID/Site: ${id} @ ${site}`);
		} catch (e) {
			return cb(null, e);
		}
	};

	Y.escapeId = id => `${id}`.replace(/(?:\W)/g, '_');

	Y.set = {};

	Y.collect = id => {
		const a = Object.values(Y.set).filter(ytma => ytma && ytma.data.id === id);
		return a;
	};

	Y.route = {
		host: document.location.host.replace('www.', ''),
		control: {
			$: {
				checkStorage: function () {
					if (strg.full() === true) {
						console.log('YTMA ERROR: Storage is full!');
						try {
							localStorage.removeItem(Y.external.version);
							strg.on = strg.test();
						} catch (e) {
							console.error(e);
						}
					}
				},
				runOnce: function (loop) {
					if (!document.body.dataset.ytmaenabled) {
						document.body.dataset.ytmaenabled = true;

						this.checkStorage();

						if (!Y.DB.extension) { update.check(); }

						Y.css();
						Y.user.init();
						Y.DB.postInit();

						if (loop) {
							document.body.dataset.YTMA_LOOP = window.setInterval(loop, 5000);
							loop();
						}

						Container.events.setup();
					}
				}
			},
			go: function (host) {
				console.info('ytma//host', host);
				if (/(?:googlevideo|youtube-nocookie\.com|youtube\.com\.?)/i.test(host)) {
					this.sites.youtube();
				} else if (this.sites[host]) {
					this.sites[host]();
				} else {
					this.sites.$generic();
				}
			},
			sites: {
				$generic: function () {
					function loop() {
						if (Y.selector.processor() > 0) {
							Y.user.fn.loadPreferences();
						}

						console.info('ytma//again++');
					}

					Y.route.control.$.runOnce(loop);
				},
				'resetera.com': function () {
					_.css('.ytm_options li ul li { height: 24px !important }');
					_.css('.bbCodeQuote .quoteContainer .quote { max-height: initial } .bbCodeQuote .quoteContainer .quoteExpand.quoteCut { display: none }');
					_.css('.bbCodeQuote .ytm_block iframe, .bbCodeQuote .ytm_block [data-s9e-mediaembed], .bbCodeQuote .ytm_block .fb_iframe_widget, .bbCodeQuote .ytm_block object, .bbCodeQuote .ytm_block embed { max-height: initial; max-width: initial }');
					this.$generic();
				},
				'gfycat.com': function () {
					const v = document.querySelector('video');
					v.controls = true;
					_.css('body,html {overflow:hidden;height:100%;width:100%} video {display:table;height:100%;margin:0 auto;}');
					document.body.appendChild(v);
				},
				'vine.co': function () {
					// console.log('vine.co');

					window.addEventListener('resize', () => {
						_.s('[style]', e => {
							e.removeAttribute('style');
						});
					});
				},
				youtube: function () { // lets force some quality parity
				}
			}
		},
		load: function () {
			this.control.go(this.host);
		}
	};

	Y.main = () => {
		Y.reg.siteExpressions = Y.reg.getAllSiteRegExps();
		// console.log(YTMA.reg.siteExpressions);
		Y.route.load();
	};

	Y.reg = {
		siteExpressions: null,
		time: /(?:t=(?:(\d+)h)?(?:(\d+)m)?(\d+))/,
		ios: /(?:\b(?:ipod|iphone|ipad))\b/i,
		extra: {
			soundcloud: {
				playlist: /(?:soundcloud\.com\/.+\/sets\/)/,
				tracks: /(?:soundcloud\.com\/.+\/tracks\/)/
			}
		},
		siteByTest: {
			youtu: 'youtube',
			vimeo: 'vimeo',
			vine: 'vine',
			gfycat: 'gfycat',
			imgur: 'imgur',
			'.webm': 'html5',
			'.mp4': 'html5',
			// '.mp3': 'html5-audio',
			'.gifv': 'html5',
			soundcloud: 'soundcloud',
			'streamable.com': 'streamable'
		},
		getAllSiteRegExps: function () {
			const regs = Object.values(Y.DB.sites)
				.filter(({ reg }) => reg)
				.map(({ reg }) => reg);

			return new RegExp(`\\b${regs.join('|')}`);
		},
		fix: {
			soundcloud: function (uri) {
				const match = Y.DB.sites.soundcloud.matcher.exec(uri);
				if (match) {
					const id = match[1].split('/', 2).join('/');
					uri = removeSearch(`https://soundcloud.com/${id}`, true);
				}

				return uri;
			}
		}
	};

	Y.selector = { // to build the selector
		parentBlacklist: ['.smallfont', '.colhead_dark', '.spoiler', 'pre', '.messageUserInfo', '.fr-box'],
		getAllSiteSelectors: function () {
			const sels = Object.values(Y.DB.sites)
				.filter(({ selector }) => selector)
				.map(({ selector }) => selector);

			return sels.join();
		},
		ignore: function () {
			const ignore = [];
			const all = Y.selector.getAllSiteSelectors().split(',');
			const blacklist = this.parentBlacklist;
			for (let i = 0; i < blacklist.length; i++) {
				for (let j = 0; j < all.length; j++) {
					ignore.push(`${blacklist[i]} ${all[j]}`);
				}
			}
			// console.log(ignore.join(','));
			return ignore.join(',');
		},
		iframes: function () { // for resetera, convert iframes back to anchors
			_.s('.message-body iframe', f => {
				if (/vi\/(.+?)\/hqdefault/.test(f.style.backgroundImage)) {
					const src = `https://youtu.be/${RegExp.$1}`;
					const span = f.closest('[data-s9e-mediaembed]');
					span.insertAdjacentHTML('beforebegin', `<a href="${src}">youtube</a>`);
					span.parentElement.removeChild(span);
				}
			});
		},
		links: function () {
			_.s(Y.selector.ignore(), ({ dataset }) => dataset.ytmaignore = true);

			const links = _.x(Y.selector.getAllSiteSelectors()).filter(({ dataset }) => {
				const r = !dataset.ytmaprocessed && !dataset.ytmaignore;
				dataset.ytmaprocessed = true;
				return r;
			});

			return links;
		},
		processor: function () {
			this.iframes();
			const links = this.links();

			if (links.length > 0) {
				links.forEach(Y.create);
			}

			return links.length;
		}
	};

	/**
	 * User Preferences
	 * size: Small (240p), Medium (360p), Large (480p), XL (720p)
	 * ratio: 1 4:3, 2 16:9
	 * quality: 240, 360, 480, 720, 1080
	 * focus: 0/1; Will attempt to set the window's focus near the video
	 * autoShow: 0/1; Will automatically display HTML5 videos, which currently lack descriptions and thumbnails
	 * desc: (Descriptions) 0 None; 1 Yes on scroll; 2 Yes all at once
	 * yt_nocookie: 0/1; Will disable/enable youtube-nocookie.com
	 * yt_annotation: 0/1; youtube annotations
	 */
	Y.user = {
		KEY: 'ytmasetts',
		$form: null,
		init: function () {
			this.load();

			if (strg.on) {
				this.fn.makeForm();
				this.mark();
			}
		},
		valid: {
			focus: [0, 1],
			desc: [0, 1, 2],
			ratio: [1, 2],
			size: [240, 360, 480, 720],
			quality: [240, 360, 480, 720, 1080],
			autoShow: [0, 1],
			yt_nocookie: [0, 1],
			yt_annotation: [0, 1] // hide | show
		},
		mapping: { // map values to some other values used by an external API, for example
			yt_annotation: [3, 1] // 3 = hide | 1 = show
		},
		validate: function (property, n) {
			n = +n;
			return Y.user.valid[property].includes(n) ? n : Y.user.defaults[property];
		},
		get defaults() {
			return {
				focus: 0,
				desc: 1,
				ratio: 2,
				size: 360,
				quality: 720,
				autoShow: 1,
				yt_nocookie: 0,
				yt_annotation: 1
			};
		},
		load: function () {
			const s = strg.grab(Y.user.KEY, {});

			Y.user.preferences = Object.keys(this.defaults).reduce((valid, k) => {
				valid[k] = Y.user.validate(k, s[k]);
				return valid;
			}, {});

			_.o(Y.user.mapping, (key, val) => {
				if (!val.hasOwnProperty('indexOf')) {
					Y.user.preferences[key] = val[Y.user.valid[key].indexOf(Y.user.preferences[key])];
				}
			});

			console.info('ytma//user+loaded(prefs)', Y.user.preferences);
		},
		mark: function () {
			const a = {};
			a.ytma__focus = !!Y.user.preferences.focus;
			a.ytma__autoShow = !!Y.user.preferences.autoShow;
			a.ytma__yt_nocookie = !!Y.user.preferences.yt_nocookie;
			a.ytma__yt_annotation = !!Y.user.preferences.yt_annotation;
			a[`ytma__ratio${Y.user.preferences.ratio}`] = true;
			a[`ytma__size${Y.user.preferences.size}`] = true;
			a[`ytma__desc${Y.user.preferences.desc}`] = true;
			a[`ytma__quality${Y.user.preferences.quality}`] = !!Y.user.preferences.quality;

			// console.log('marking', a);
			_.o(a, (id, val) => {
				try {
					const el = document.getElementById(id);
					el.checked = val;
					el.value = val;
				} catch (e) {
					// console.log(id, e);
				}
			});
		},
		events: {
			save: function () {
				// console.log(YTMA.user.$form.querySelectorAll('[data-key]'));
				// [data-key]:checked
				const settings = Array.from(Y.user.$form.querySelectorAll('[data-key]')).reduce((obj, e) => {
					let key = e.dataset.key;

					if (e.type === 'checkbox') {
						obj[key] = +e.checked;
					} else if (e.type === 'radio') {
						if (e.checked) {
							if (e.dataset.num) {
								obj[key] = +e.dataset.num;
							}
						}
					} else {
						obj[key] = +e.value;
					}

					return obj;
				}, {});

				if (strg.save(Y.user.KEY, settings)) {
					Y.user.load();
				} else {
					Y.user.error.classList.remove('ytm_none');
				}

			},
			reset: function () {
				Y.user.preferences = Y.user.defaults;
				Y.user.mark();
				strg.wipe(Y.user.KEY);
				Y.user.error.classList.add('ytm_none');
			},
			clear: function () {
				try {
					localStorage.removeItem(Y.external.version);
					Y.user.events.reset();
					console.info('ytma//cache+remove', 'removed all YTMA cache');
				} catch (e) {
					console.error(e);
				}
			},
			formToggle: function (e) {
				if (Y.user.$form && (!e || (e && e.target && !(/(?:INPUT|LABEL)/i).test(e.target.nodeName)))) {
					Y.user.$form.classList.toggle('ytm_none');
				}
			},
			formToggleKeyboard: function (e) {
				// press CTRL+SHIFT+Y (META+SHIFT+Y) to display settings form
				if ((e.ctrlKey || e.metaKey) && e.shiftKey && String.fromCharCode(e.which).toLowerCase() === 'y') {
					e.preventDefault();
					Y.user.events.formToggle();
				}
			}
		},
		fn: {
			$scroller: null,
			$once: false,
			loadPreferences: function () {
				Y.user.fn.onScrollLoadDescriptions(Y.user.preferences.desc === 1);

				this.loadPreferencesOnce();
			},
			loadPreferencesOnce: function () {
				if (this.$once) { return; }

				this.$once = true;

				if (Y.user.preferences.autoShow === 1) {
					Y.user.fn.onScrollViewMedia();
				}
			},
			showMedia: function () {
				// console.info('ytma//user+fn-showMedia');
				return new Scroll('a.ytm_scroll:not([data-ytmscroll="false"])', link => {
					if (Scroll.visibleAll(link, 50)) {
						_.s(`var[data-ytmsid="${link.dataset.ytmsid}"]:not([data-ytmscroll="false"])`, trigger => {
							const ui = Control.createFromTrigger(trigger);
							ui.showOnScroll(link);
						});
					}
				});
			},
			toggleMedia: function () {
				return new Scroll('div.ytm_panel_switcher', div => {
					const v = div.querySelector('video');
					const paused = v && (v.paused || v.ended);
					const ui = Y.set[div.dataset.ytmuid].getControl();

					if (paused && !Scroll.visibleAll(div, 0)) {
						return ui.play.switchStandby();
					}

					if (ui.play.isStandby() && Scroll.visibleAll(div, 200)) {
						return ui.play.switchOn();
					}

					// todo ascertain embedded player properties
					// f = div.querySelector('iframe, object');
					// if (f && !YTMA.Scroll.visibleAll(div, 200)) {
					// 	y.hidePlayer();
					// }
				});
			},
			onScrollViewMedia: function () {
				this.showMedia();
				this.toggleMedia();
			},
			onScrollLoadDescriptions: function (ajax) {
				if (Y.user.fn.$scroller) { Y.user.fn.$scroller.stop(); }

				Y.user.fn.$scroller = new Scroll('span.ytm_manual > a.ytm_title:not(.ytm_error)', a => {
					if (Scroll.visibleAll(a, 200)) {
						if (ajax) {
							Y.ajax.loadFromDataset(a.dataset);
						} else {
							Y.ajax.loadFromCacheDataset(a.dataset);
						}
						// console.log('doc', document.querySelectorAll(YTMA.user.fn.$scroller.selector).length, a.dataset.id);
					}

					if (document.querySelectorAll(Y.user.fn.$scroller.selector).length === 0) {
						Y.user.fn.$scroller.stop();
					}
				});
			},
			makeForm: function () {
				const template = `
					<div id="ytm_settings" class="ytm_sans ytm_block ytm_normalize">
						<form action="" title="Double click to close">
							<div id="ytm_settingst">ytma! Site Settings</div><div class="ytm_field_container">
								<fieldset><legend title="Load descriptions from the content sever.">Load Descriptions</legend><p><span><input id="ytma__desc0" type="radio" data-num="0" name="ytma__desc" data-key="desc"><label for="ytma__desc0" title="Load descriptions on demand">Manually</label></span><span><input id="ytma__desc1" type="radio" data-num="1" name="ytma__desc" data-key="desc"><label for="ytma__desc1" title="Load descriptions as they become visible on the screen.">Automatically, on scrolling</label></span></p></fieldset>
								<fieldset><legend>HTML5 Players</legend><p><input name="ytma__autoShow" data-key="autoShow" id="ytma__autoShow" type="checkbox"><label for="ytma__autoShow">Automatically show WebM, MP4 and Soundcloud players</label></p></fieldset>
								<fieldset><legend>Player Size</legend><p><span><input type="radio" name="ytma__size" data-key="size" data-num="240" id="ytma__size240" /><label for="ytma__size240">S <small>240p</small></label></span><span><input name="ytma__size" data-key="size" type="radio" id="ytma__size360" data-num="360" /><label for="ytma__size360">M <small>360p</small></label></span><span><input type="radio" name="ytma__size" data-key="size" data-num="480" id="ytma__size480" /><label for="ytma__size480">L <small>480p</small></label></span><span><input type="radio" name="ytma__size" data-key="size" data-num="720" id="ytma__size720" /><label for="ytma__size720">X <small>720p</small></label></span></p></fieldset>
								<fieldset><legend>Quality</legend><p><span><input name="ytma__quality" data-key="quality" data-num="240" id="ytma__quality240" type="radio"><label for="ytma__quality240">240p</label></span><span><input name="ytma__quality" data-key="quality" id="ytma__quality360" data-num="360" type="radio"><label for="ytma__quality360">360p</label></span><span><input name="ytma__quality" data-key="quality" data-num="480" id="ytma__quality480" type="radio"><label for="ytma__quality480">480p</label></span><span><input name="ytma__quality" data-key="quality" data-num="720" id="ytma__quality720" type="radio"><label for="ytma__quality720">720p</label></span><span><input name="ytma__quality" data-key="quality" data-num="1080" id="ytma__quality1080" type="radio"><label for="ytma__quality1080">1080p</label></span></p></fieldset>
								<fieldset><legend>Aspect Ratio</legend><p><span><input name="ytma__ratio" data-key="ratio" type="radio" id="ytma__ratio2" data-num="2" /><label for="ytma__ratio2">16:9</label></span><span><input type="radio" name="ytma__ratio" data-key="ratio" data-num="1" id="ytma__ratio1" /><label for="ytma__ratio1">4:3</label></span></p></fieldset>
								<fieldset><legend>YouTube</legend>
									<p><input name="ytma__yt_annotation" data-key="yt_annotation" type="checkbox" id="ytma__yt_annotation" /><label for="ytma__yt_annotation">Enable video annotations</label></p>
									<p><input name="ytma__yt_nocookie" data-key="yt_nocookie" type="checkbox" id="ytma__yt_nocookie" /><label for="ytma__yt_nocookie">Use https://youtube-nocookie.com to load videos</label></p>
								</fieldset>
								<fieldset><legend>Window Focus</legend><p><input name="ytma__focus" data-key="focus" type="checkbox" id="ytma__focus" value="focus" /><label for="ytma__focus">After clicking the thumbnail, set the video at the top of the window.</label></p></fieldset>
							</div>
							<p><small id="ytm_settings_error" class="ytm_error ytm_none ytm_title">Error! Your settings could not be saved.</small></p>
							<p id="ytm_opts">
								<button type="button" id="ytmaclose">Close</button> <button type="button" id="ytmareset">Reset</button> <button type="button" id="ytmaclear" title="Remove all video descriptions that have been cached">Reset & Remove Cache</button>
							</p>
						</form>
					</div>`;

				Y.user.$form = _.e('div', { className: 'ytm_fix_center ytm_none ytm_box', innerHTML: template }, document.body);
				Y.user.error = document.getElementById('ytm_settings_error');

				_.on(Y.user.$form, 'keyup click', 'input, label', _.debounce(Y.user.events.save, 500));
				Y.user.$form.addEventListener('submit', e => e.preventDefault(), false);

				document.getElementById('ytmareset').addEventListener('click', Y.user.events.reset, false);
				document.getElementById('ytmaclear').addEventListener('click', Y.user.events.clear, false);

				// close
				Y.user.$form.addEventListener('dblclick', Y.user.events.formToggle, false);
				document.getElementById('ytmaclose').addEventListener('click', Y.user.events.formToggle, false);
				document.body.addEventListener('keydown', Y.user.events.formToggleKeyboard, false);
			}
		}
	};

	Y.css = () => {
		const playerCss = Player.css.generator();
		const loadingIcon = 'data:image/gif;base64,R0lGODlhDgAKAJEAAP///+BKV////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAADgAKAAACHFSOeQYI71p6MtAJz41162yBH+do5Ih1kKG0QgEAIfkEBQoAAgAsAAABAA0ACAAAAhSUYGEoerkgdIzKGlu2ET/9ceJmFAAh+QQFCgACACwAAAEADQAIAAACFJRhcbmiglx78SXKYK6za+NxHyYVACH5BAUKAAIALAAAAQANAAgAAAIWVCSAl+hqEGRTLhtbdvTqnlUf9nhTAQAh+QQFCgACACwAAAEADQAIAAACFZRiYCh6uaCRzNXYsKVT+5eBW3gJBQAh+QQJCgACACwAAAAADgAKAAACGpSPaWGwfZhwQtIK8VTUvuxpm9Yp4XlmpiIUADs=';

		// console.log(playerCss);
		_.css(playerCss);

		// images
		// todo update(site, size, padding)
		_.css(`
			.ytm_loading{background:url(${loadingIcon}) 0 3px no-repeat;}
			.ytm_link{background:url(${Y.DB.sites.youtube.favicon}) 0 center no-repeat !important;margin-left:4px;padding-left:20px!important;}
			.ytm_link.ytm_link_vimeo{background-image:url(${Y.DB.sites.vimeo.favicon}) !important;background-size:12px 12px !important;padding-left:18px!important}
			.ytm_link.ytm_link_vine{background-image:url(${Y.DB.sites.vine.favicon}) !important;background-size:10px 10px!important;padding-left:16px!important}
			.ytm_link.ytm_link_soundcloud{background-image:url(${Y.DB.sites.soundcloud.favicon})!important;padding-left:17px!important}
			.ytm_link.ytm_link_html5{background-image:url(${Y.DB.sites.html5.favicon}) !important;padding-left:16px!important}
			.ytm_link.ytm_link_gfycat{background-image:url(${Y.DB.sites.gfycat.favicon}) !important;background-size:12px 12px !important;padding-left:16px!important;}
			.ytm_link.ytm_link_imgur{background-image:url(${Y.DB.sites.imgur.favicon}) !important;background-size:12px 12px !important;padding-left:16px!important}
			.ytm_link.ytm_link_streamable{background-image:url(${Y.DB.sites.streamable.favicon}) !important; background-size: 12px 12px !important;padding-left: 14px !important;}
		`);

		_.css('.ytm_none,.ytm_link br{display:none!important}.ytm_box{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.ytm_block{display:block;position:relative;clear:both;text-align:left;border:0;margin:0;padding:0;overflow:hidden}.ytm_normalize{font-weight:400!important;font-style:normal!important;line-height:1.2!important}.ytm_sans{font-family:Arial,Helvetica,sans-serif!important}.ytm_spacer{overflow:auto;margin:0 0 6px;padding:4px}.ytm_spacer.ytm_site_slim{display:inline}.ytm_clear:after{content:"";display:table;clear:both}.ytm_center{text-align:center}.ytm_link b,.ytm_link strong{font-weight:400!important}.ytm_link u{text-decoration:none!important}.ytm_link i,.ytm_link em{font-style:normal!important}.ytm_trigger{width:118px;height:66px;background-color:#262626!important;cursor:pointer;background-position:-1px -12px;float:left;box-shadow:2px 2px rgba(0,0,0,.3);background-size:auto 90px!important;color:#fff;text-shadow:#333 0 0 2px;font-size:13px}.ytm_trigger:hover{box-shadow:2px 2px #60656b80;opacity:.95}.ytm_trigger var{z-index:2;height:100%;width:100%;position:absolute;left:0;top:0;text-align:right}.ytm_label{display:block;padding:3px 6px;line-height:1.2;font-style:normal}.ytm_init{height:22px;background:rgba(11,11,11,.62);padding:4px 25px 6px 6px}.ytm_site_vine .ytm_trigger{background-color:#90ee90!important;background-size:120px auto!important}.ytm_site_slim .ytm_trigger{background:#e34c26!important;height:auto;box-shadow:0 0 2px #ffdb9d inset,2px 2px rgba(0,0,0,.3);margin:0 3px 0 0;width:auto;transition:all .3s ease-in-out 0s}.ytm_site_slim .ytm_trigger:hover{opacity:.8}.ytm_site_slim .ytm_label{text-shadow:0 0 1px #f06529}.ytm_site_slim .ytm_init{background:transparent}.ytm_bd{float:left;max-width:500px;margin:2px 10px;font-size:12px}.ytm_title{font-weight:700}.ytm_error{color:#cc2f24;font-style:italic}.ytm_loading{font-style:italic;padding:1px 1.5em}.ytm_descr{word-wrap:break-word;max-height:48px;overflow:auto;padding-right:20px}.ytm_descr[data-full]{cursor:pointer}.ytm_descr_open{resize:both;white-space:pre-line;background:linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 80%,rgba(0,0,0,0.1) 100%)}.ytm_descr_open[style]{max-height:none}.ytm_projector{margin-bottom:4px}ul.ytm_options{overflow:hidden;margin:0!important;padding:3px 0 1px;list-style-position:outside!important}.ytm_options li{display:inline;margin:0!important;padding:0!important}.ytm_options li>ul{display:inline-block;margin:0;padding:0 1px 0 0}.ytm_options li ul li{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none;list-style-type:none;cursor:pointer;float:left;color:#858585;border:1px solid #1d1d1d;border-bottom:1px solid #181818;border-top:1px solid #292929;box-shadow:0 0 1px #555;height:14px;font-size:12px!important;line-height:12px!important;background:#222;background:linear-gradient(#2d2c2c,#222);margin:0!important;padding:5px 9px 3px!important}.ytm_options li ul li:first-child{border-radius:2px 0 0 2px}.ytm_options li ul li:last-child{border-left:0!important;border-radius:0 2px 2px 0;margin:0 2px 0 0!important}.ytm_options li ul li:first-child:last-child,.ytm_li_setting{border-radius:2px}.ytm_options li ul li:hover{color:#ccc;text-shadow:1px 1px 0 #333;background:#181818}.ytm_options li ul li[id]{color:#ddd;text-shadow:0 0 2px #444}.ytm_panel_size{background:#000;max-width:100%;}.ytm_panel_switcher[data-standby="true"]{background:#111}.ytm_panel_switcher[data-standby="true"]:after{cursor:cell;color:#0e0e0e;content:"ytma!";display:block;font-size:85px;font-style:italic;font-weight:700;left:50%;position:absolute;text-shadow:2px 1px #181818,-1px -1px #0a0a0a;top:50%;transform:translate(-50%,-50%)}.ytm_site_soundcloud .ytm_panel_size.ytm_soundcloud-playlist{height:334px!important}.ytm_fix_center{background:rgba(51,51,51,.41);height:100%;left:0;position:fixed;top:0;width:100%;z-index:99998}#ytm_settings{z-index:99999;max-width:500px;max-height:85%;overflow:auto;background:#fbfbfb;border:1px solid #bbb;color:#444;box-shadow:0 0 5px rgba(0,0,0,.2),0 0 3px rgba(239,239,239,.1) inset;margin:4% auto;padding:4px 8px 0}#ytm_settings p{margin:5px 0;padding:0}#ytm_settings fieldset{vertical-align:top;border-radius:3px;border:1px solid #ccc;margin:0 0 5px;padding:3px}#ytm_settings legend{padding:3px}#ytm_settings fieldset span{display:inline-block;min-width:5em}#ytm_settings input{vertical-align:baseline!important;margin:3px 5px!important}#ytm_settingst{font-size:110%;border-bottom:1px solid #d00;margin:3px 0 9px;padding:0 3px 3px}#ytm_settings label{cursor:pointer}#ytm_settings small{font-size:90%}#ytm_opts button{cursor:pointer;margin:10px 5px 8px 2px;padding:3px;border:1px solid #adadad;border-radius:2px;background:#eee;font-size:90%}#ytm_opts button:hover{background:#ddd}');
	};

	Y.ajax = {
		load: function (site, id, uri) {
			console.info('ytma//ajax+load(id)', site, id, uri);
			uri = Y.DB.sites[site].ajax.replace('%key', id).replace('%uri', uri);

			if (Y.DB.sites[site].ajaxExtension) { return this.gmxhr(uri, site, id); }

			console.info('ytma//ajax+load(uri)', Y.DB.sites[site].ajax.replace('%key', id).replace('%uri', uri));
			if (Y.DB.sites[site].ajax) {
				// console.log('preping uri');
				return this.xhr(uri, site, id);
			}

			return null;
		},
		loadFromDataset: function (dataset) {
			if (!this.loadFromCacheDataset(dataset)) {
				return this.load(dataset.ytmsite, dataset.ytmid, dataset.ytmuri);
			}
		},
		loadFromCacheDataset: function ({ ytmsite, ytmid }) {
			const cache = Y.external.dataFromStorage(ytmsite, ytmid);

			console.info('ytma//ajax+cache(id)', ytmsite, ytmid);
			console.info('ytma//ajax+cache(data)', cache);

			if (cache) { Y.external.populate(cache); }

			return cache;
		},
		gmxhr: function (uri, site, id) {
			try {
				// console.log('gmxhr starting!');
				GM.xmlhttpRequest({
					method: 'GET',
					url: uri,
					onload: function ({ responseText }) {
						// console.log(response);
						Y.external.parse(responseText, site, id);
					},
					onerror: function () {
						console.log('GM Cannot XHR');
						Y.ajax.failure.call({ id });
					}
				});

				Y.ajax.preProcess(id);

			} catch (e) {
				if (Y.DB.extension) {
					console.info('ytma//gmxhr-cors');
					this.xhr(uri, site, id);
				} else {
					console.log('No applicable CORS request available.');
					this.failure.call({ id });
				}
			}
		},
		xhr: function (uri, site, id) {
			const x = new XMLHttpRequest();
			console.info('ytma//xhr', uri, id, site);

			Y.ajax.preProcess(id);

			x.onreadystatechange = function () {
				if (this.readyState === this.DONE) {
					// console.log(this.readyState, this.status);
					if (this.status === 200) {
						Y.external.parse(this.responseText, site, id);
					} else if (this.status === 403) {
						Y.external.populate({ site, id, title: 'Error 403', desc: '' });
						Y.external.save({ site, id, title: 'Error 403', desc: '' });
					} else { // if (this.status >= 400 || this.status === 0) {
						Y.ajax.failure.call({ id });
					}
				}
			};

			try {
				// console.info('ytma//xhr+sending');
				x.open('get', uri, true);
				x.send();
			} catch (e) {
				console.error('ytma//xhr+failed(cannot send xhr)', uri);
				Y.ajax.failure.call({ id });
				console.error(e);
			}
		},
		failure: function () {
			_.s(`.ytm_bd._${Y.escapeId(this.id)}`, el => {
				const a = el.querySelector('a');
				a.dataset.tries = a.dataset.tries ? parseFloat(a.dataset.tries) + 1 : 1;
				if (a.dataset.tries >= 5) {
					a.textContent = 'Max attempts reached';
				} else {
					a.textContent = `Error, unable to load data.${a.dataset.tries > 1 ? '' : ' [Retry]'}`;
				}
				a.className = 'ytm_error ytm_title';
			});
		},
		preProcess: function (id) {
			_.s(`.ytm_manual._${Y.escapeId(id)} a`, el => {
				el.classList.add('ytm_loading');
				el.textContent = 'Loading';
				el.title = 'Retry loading data.';
			});
		}
	};

	/** E X T E R N A L Apparatus
	 * Data from external sites
	 */
	Y.external = {
		version: 'ytma.4.1.dat',
		parse: function (response, site, id) {
			if (this.parsers[site]) {
				response = Y.DB.sites[site].rawResponse ? response : JSON.parse(response);
				this.populate(this.helper.cutDescription(this.parsers[site](response, id)));
			}
		},
		parsers: {
			soundcloud: function ({ title, description, thumbnail_url }, id) {
				return {
					site: 'soundcloud',
					id, //unescape(j.html).match(/tracks\/(\d+)/)[1],
					title,
					desc: description,
					th: removeSearch(thumbnail_url)
				};
			},
			vimeo: function (j) {
				j = j[0];
				return {
					site: 'vimeo',
					id: j.id,
					title: `${j.title} ${Y.external.time.fromSeconds(j.duration)}`,
					desc: j.description.replace(/<br.?.?>/g, ''),
					th: decodeURI(j.thumbnail_medium)
				};
			},
			youtube: function (j, id) {
				if (j.pageInfo.totalResults < 1 || j.items.length === 0) {
					return { id, error: true };
				}

				j = j.items[0];
				const o = {
					site: 'youtube',
					id,
					title: `${j.snippet.title} ${Y.external.time.fromIso8601(j.contentDetails.duration)}`,
					desc: j.snippet.description
					// aspectRatio: j.contentDetails.aspectRatio
				};

				return o;
			},
			vine: function ({ title, thumbnail_url }, id) {
				return {
					site: 'vine',
					id,
					title,
					th: removeSearch(thumbnail_url)
				};
			},
			gfycat: function (html, id) {
				if (html) {
					return {
						site: 'gfycat',
						id: id,
						title: id
					};
				}
			},
			streamable: function ({ title }, id) {
				return {
					site: 'streamable',
					id,
					title: title || 'Untitled'
				};
			}
		},
		set: function (data) {
			if (!this.db[data.site]) {
				this.db[data.site] = {};
			}
			this.db[data.site][data.id] = data;
			return this.save();
		},
		unset: function ({ site, id }) {
			// console.log('unset', data.id);
			if (site) {
				delete this.db[site][id];
				return this.save();
			}
		},
		limitDB: function (max, db) {
			// limits an object's items by half of the max
			// removes the older items at the start of the object
			const keys = Object.keys(db);

			const half = Math.floor(max / 2);
			let start;
			let ndb;
			let i;

			if (keys.length > max) {
				ndb = {};
				start = keys.length - half;

				for (i = start; i < keys.length; i++) {
					ndb[keys[i]] = db[keys[i]];
				}
			}

			return ndb || db;
		},
		save: function () {
			this.db = this.limitDB(1000, this.db);
			return strg.save(this.version, this.db);
		},
		helper: {
			cutDescription: function (data) {
				if (data.desc && data.desc.length > 140) {
					data.full = data.desc;
					data.desc = `${data.desc.substr(0, 130)} . . .`;
				}
				return data;
			},
			thumbnail: function ({ id, th }) {
				_.s(`[data-ytmid="${id}"].ytm_trigger`, el => el.setAttribute('style', `background: url(${th})`));
			}
		},
		time: {
			keepMinutesAndSeconds: function (v, i) {
				return i > 1 || v > 0;
			},
			leadingZero: function (v, i) {
				return i > 0 ? (`00${v}`).slice(-2) : v;
			},
			fromArray: function (a) {
				// [days, hours, mins, secs]
				let b;

				let p = '';

				try {
					// Remove empty values, but keep lower indexes (m:s); a[i] > 0 || i > 1
					// Add leading 0's, ignoring the first index
					// a.slice(0, 1).concat(a.slice(1))
					b = a.filter(this.keepMinutesAndSeconds).map(this.leadingZero);
					p = `(${b.join(':')})`;
				} catch (e) {
					console.error('Could not parse this time.');
				}

				console.info('ytma//time+array', { a, b, p });
				return p;
			},
			fromIso8601: function (iso8601) {
				// eg PT3M, T29S
				let a;

				const parseDigits = reg => {
					if (reg.test(iso8601)) {
						return RegExp.lastParen;
					}
					return 0;
				};

				// P#DT#H#M#S || PT#H#M#S
				a = [/(\d+)D/, /(\d+)H/, /(\d+)M/, /(\d+)S/].map(parseDigits);

				return this.fromArray(a);
			},
			fromSeconds: function (seconds) {
				const a = [
					Math.floor(seconds / 86400) % 24,
					Math.floor(seconds / 3600) % 60,
					Math.floor(seconds / 60) % 60,
					seconds % 60
				];
				return this.fromArray(a);
			}
		},
		validate: function (data) {
			if (!data || !data.id || data.error) {
				return Y.ajax.failure.call(data);
			}

			// todo? empty titles and descriptions should be okay
			// if (data.id && !data.title && !data.desc) {
			// 	this.unset(data.id);
			// 	return YTMA.ajax.failure.call(data);
			// }

			return true;
		},
		populate: function (data, ignoreValidation) {
			if (!ignoreValidation && !this.validate(data)) { return; }

			this.set(data);
			const { id, th, full, desc, title } = data;

			if (th) { this.helper.thumbnail(data); }

			_.s(`.ytm_bd._${Y.escapeId(id)}`, el => {
				el.innerHTML = `<span class="ytm_title">${title}</span>`;
				if (desc) {
					const q = _.e('q', { className: 'ytm_descr ytm_block', textContent: desc }, el);
					if (full.length > desc.length) {
						q.dataset.full = full;
						q.title = 'Double click to toggle the description.';
					}
				}
			});
		},
		dataFromStorage: function (site, id) {
			if (this.db && this.db[site]) {
				return this.db[site][id];
			}
		}
	};
	Y.external.db = strg.grab(Y.external.version, {});

	/** Database */
	Y.DB = {
		postInit: function () {
			if (Y.user.preferences.yt_nocookie) {
				Y.DB.sites.youtube.home = 'https://www.youtube-nocookie.com/';
				Y.DB.sites.youtube.embed = 'https://www.youtube-nocookie.com/embed/%key';
			}
		},
		extension: window.chrome && window.chrome.extension,
		sites: { // supported sites - to add more also make a parser (if api is available) and add an item to sources (if necessary)
			youtube: {
				title: 'ytma!',
				home: 'https://www.youtube.com/',
				embed: 'https://www.youtube.com/embed/%key',
				ajax: `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=%key${window.atob('JmtleT1BSXphU3lEVG5INkxzRERyVElYaFZTZWRQQjlyRHo1czBSczQzZnM=')}`,
				thumb: 'url(https://i3.ytimg.com/vi/%key/1.jpg)',
				selector: 'a[href*="youtube."], a[href*="youtu.be/"]',
				favicon: 'https://www.youtube.com/favicon.ico',
				key: 'id',
				reg: '(youtu)',
				matcher: /(?:(?:(?:v=|#p\/u\/\d*?\/)|(?:v=|#p\/c\/[a-zA-Z0-9]+\/\d*?\/)|(?:embed\/)|(?:v\/)|(?:\.be\/))([A-Za-z0-9-_]{11}))/i,
				https: true
			},
			vimeo: {
				title: 'vimeo too!',
				home: 'https://vimeo.com/',
				embed: 'https://player.vimeo.com/video/%key?badge=0',
				ajax: 'https://vimeo.com/api/v2/video/%key.json',
				selector: 'a[href*="vimeo.com/"]',
				favicon: 'https://f.vimeocdn.com/images_v6/favicon.ico',
				key: 'id',
				reg: '(vimeo)',
				matcher: /(?:vimeo\.com\/(\d+))/i,
				https: true
			},
			vine: {
				title: 'vine me!',
				home: 'https://vine.co/',
				embed: 'https://vine.co/v/%key/embed/simple?audio=1',
				ajaxExtension: true,
				ajax: 'https://vine.co/oembed.json?url=https%3A%2F%2Fvine.co%2Fv%2F%key',
				selector: 'a[href*="vine.co/"]',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABcklEQVQ4jX2SvyvFYRTGP+9NdzAYbpIkysA/ICnKoEwvA4vlUkoyGQzvoOiK4R0YbDLhDhbi9maWIjEqcScWkyRhMNzXcM/3On39OMt5nvOe85wfvSbGyH9mgs8Cq8AUkAMegU1gJVpXqfu3umpbwITiLUBB8HJGuryb4KMJ/izVvUMVnwNjwJPwGYCMkLL4zlT3XoUL0boD4FBNUhO4Fd9ogm9SRVmFn8Una79qgWuV2K3wvcLJdG3iL7TaiUocAI4Fn0vnHDBrgt+L1g2q3NoEl8CH4KHkMVr3CSwI7QeOTPA9WsAk/8AEvw+MSrwrWleuJQVfABZJWbTOZBTfVXg6lbgEHKjQTcL1BFngAWimeuH2aN2LvHUDV1JcjNbl0zdI9l0T2pDsboKvB7Yl/ga4X2+gku+AVqAC9AFzwLik5KN1xT8FRGQEOBL6yfdn2onWTZKyTDoQrSsB60KT4lNSh/1TQETmgQ1ZowQMy41+2BeLRXeRaKuHSAAAAABJRU5ErkJggg==',
				key: 'id',
				reg: '(vine)',
				matcher: /(?:vine\.co\/v\/([A-Za-z0-9-_]{11}))/i
			},
			soundcloud: {
				title: 'sound off!',
				home: 'https://soundcloud.com/',
				embed: 'https://w.soundcloud.com/player/?show_comments=false&url=%key',
				ajax: 'https://soundcloud.com/oembed?format=json&url=%uri',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXZJREFUeNp0UjFOw0AQnD3bCYaEoIgiUIQKikiAKKGgSAkFL0BQ0FEgUfECShpewB+QEE+gokDiBxGRiCCEBBzHd8ucLYGQ4Kw7+9azc7OzJ6oKnFYUxgD+W/DHYNA54GIooifTitYqg1okaPFff6BcTLF5fECYb5IJNJ3kMfUP2dxHPycwcQ0SliARocSGsA46YkKWQW0GS6BDAGlu5Myu84AgSmHKM/DY0NegwwR2+AJrSjBre5BaA1H7GFKpI729QHp9jqiaeTBn5mB7fWirjWB9B9JYBrwEMnop5d0zfD53YO9vYMY8SQcpZGkTZvsIstiivDfoaxfIxt8exYeXCLYOSOwlJZQ6twSpL0DfX4EoZtkCqc7/Njalbxnfdt+oSwhurkBnCWI/1FlgqgKNZ3JnZDSA3FFSpYdQAoF56tKNDmhOYTzJ3OSHXZkflJhYEyawcnH02HpmxZ+DrRJlgmacvrsHRmHln2tRnIiAy5WTLwEGAK4QoBQmtGHkAAAAAElFTkSuQmCC',
				selector: 'a[href*="soundcloud.com/"]',
				key: 'uri',
				reg: '(soundcloud)',
				matcher: /(?:\/\/(?:\bwww|m\.\b)?soundcloud\.com\/(.+?\/.+))/i,
				https: true,
				scroll: true
			},
			gfycat: {
				title: 'gfycat meow!',
				home: 'https://gfycat.com/',
				embed: 'https://gfycat.com/iframe/%key',
				ajaxExtension: true,
				rawResponse: true,
				ajax: 'https://gfycat.com/%key',
				thumb: 'url(https://thumbs.gfycat.com/%key-poster.jpg)',
				selector: 'a[href*="gfycat.com/"]',
				favicon: 'https://gfycat.com/favicon.ico',
				key: 'id',
				reg: '(gfycat)',
				matcher: /(?:gfycat\.com\/(?:(\b(?:[A-Z][a-z]*){3,}\b)))/i,
				https: true,
				scroll: true
			},
			streamable: {
				title: 'streamable!',
				home: 'https://streamable.com/',
				embed: 'https://streamable.com/e/%key',
				ajax: 'https://api.streamable.com/oembed.json?url=%uri',
				thumb: 'url(https://cdn.streamable.com/image/%key.jpg)',
				selector: 'a[href*="streamable.com/"]',
				favicon: 'https://streamable.com/favicon.ico',
				key: 'id',
				reg: '(streamable\\.com)',
				matcher: /(?:streamable\.com\/([A-Za-z0-9-_]+))/i,
				https: true
			},
			imgur: {
				title: 'imgur it!',
				home: 'https://i.imgur.com/',
				embed: 'https://i.imgur.com/%key',
				thumb: 'url(https://i.imgur.com/%keyh.jpg)',
				selector: 'a[href*=".gifv"]',
				favicon: 'https://imgur.com/favicon.ico',
				reg: '(\\.gifv$)|(imgur)',
				matcher: /(?:imgur\.com\/(\w+)\.(?:gifv|mp4|webm))/i,
				https: true,
				scroll: true,
				videoTag: true
			},
			html5: {
				home: true,
				title: 'html5 go!',
				selector: 'a[href*=".webm"], a[href*=".mp4"]',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdlJREFUeNpcks9rE0EUx7+b3TRktxvbhUhrNm6SrUWtxxbxJ9iLl0JFKWg8WLD05EWhIuRieogXwYPX4tGb/gPSq/oP6KH+uG2MFaRJJXaTbp7fWbsl+uDDzLx533lv3ozmeyUM2VlSJxeISULygTwhr5Og1JDgOXlPrpLRMAxTIpLlfJa8Ipv/i56Re4lT07SYKIqQSh2eO0/eqYnujI35HF8O19jr9XBneRmt1je0d3ag63qy5ZIAvNObE+WKTJXKktENoVPsrCntdlsWFxbiNXNJyS3KdMUXxv8w6LzY7XZhmiYer9fBYOTzR5HL5XCzWsWxYhFnTs/gxcYGgiCAZVmOyhR5BVcm8nlZvbsi29+3ZdgGg4Gs1+viua4UJiZVpkiJeqo0VaIqxbGPSKfTORRduXQ59peLx5PyItWaj9yDQtmt21XYto1GoxGvbywtxaNhGHE3ab+V6L6aKYczPo7ZuTk8WnuIWq2G64vX4JU8zJw8BXXv5D21gx+xydrn7VEb/f0+tj5twa/4+Pz1C6Y4Oo6DZrOJdDrdYuxkIlKP+ZbZzoV7e8iyk8kD/9rdRXpkBJlMpsmDC/98I97pPF//AQUBl/2/jRvsm5b1kxmeJgJlfwQYAKZQxgzeI6/EAAAAAElFTkSuQmCC',
				reg: '(\\.webm$)|(\\.mp4$)',
				slim: true,
				scroll: true,
				videoTag: true
			},
			'html5-audio': {
				home: true,
				title: 'hey, listen!',
				selector: 'a[href*=".mp3"]',
				reg: '(\\.mp3$)',
				slim: true,
				scroll: true
			}
		}
	};

	class Control extends Container {
		/** U I CLASS
		 * Class for the player controls
		 * This is the control bar once the user clicks on the thumbnail
		 * Contains its own instance of a Player
		 * Acts like a decorator on the YTMA and Container intances by adding events
		 * @param {Y} ytma A YTMA instance
		 */
		constructor(props) {
			super(props);

			this.open = false;
			this.selected = { size: null, ratio: null };
		}

		getControl() {
			if (!this.projector) {
				this.createProjector();
			}
			return this;
		}

		createProjector() {
			super.createProjector();
			this.projector.addEventListener('click', Control.events.videoBar.bind(this), false);
			this.play = new Player(this);

			this.markSelected(`li[data-type="size"][data-value="${this.play.attrs.size}"]`, 'size');
			this.markSelected(`li[data-type="ratio"][data-value="${this.play.attrs.ratio}"]`, 'ratio');
		}

		resetViewSize() {
			this.play.dimmensions();
			this.setControlBarSize(this.play.attrs.size);
		}

		showOnScroll(link) {
			if (!this.open && this.canShowUnder(link)) {
				this.showPlayer();
			}
		}

		showPlayer() {
			this.open = true;

			super.showPlayer();
			this.attachPlayerPanel();
			this.play.switchOn();

			if (Y.user.preferences.focus) {
				document.location.hash = `#${this.body.id}`;
			}
		}

		hidePlayer() {
			this.open = false;

			this.play.switchOff();
			super.hidePlayer();
		}

		attachPlayerPanel() {
			if (!this.play.panel.parentNode) {
				// console.log('attaching display panel');
				this.projector.appendChild(this.play.panel);
			}
		}

		hideAllPlayers() {
			const group = Y.collect(this.state.id);
			console.info('ytma//hide+all(id)', this.state.id, group.length);
			group.forEach(g => {
				g.disableOpenOnScroll();
				g.getControl().hidePlayer();
			});
		}

		setControlBarSize(size) {
			this.markSelected(`li[data-type="size"][data-value="${size}"]`, 'size');
		}

		markSelected(el, type) {
			if (typeof el === 'string') {
				el = this.projector.querySelector(el);
			}
			el.id = type + this.state.uid;
			try {
				this.selected[type].removeAttribute('id');
			} catch (e) { }
			this.selected[type] = el;
		}
	}

	Control.ratios = {
		SD: 1,
		HD: 2,
		PORTRAIT: 3
	};

	Control.sizes = {
		HIDDEN: 0,
		S: 240,
		M: 360,
		L: 480,
		X: 720
	};

	/** Trigger is the VAR element
	 * @param {HTMLElement} t VAR element
	 */
	Control.createFromTrigger = t => {
		// console.info('ytma//trigger');
		if (t && t.dataset.ytmuid && !Y.set[t.dataset.ytmuid]) {
			console.info('ytma//trigger+new');
			Y.addToSet(new Control().reactivate(t));
		}
		console.info('ytma//trigger+control');
		return Y.set[t.dataset.ytmuid].getControl();
	};

	Control.events = {
		$fire: {
			settings: function () {
				Y.user.events.formToggle();
			},
			close: function () {
				if (this.site.scroll) {
					// console.log('events.close-1');
					this.hideAllPlayers();
				} else {
					// console.log('events.close-2');
					this.disableOpenOnScroll();
					this.hidePlayer();
				}
			},
			ratio: function (li) {
				const ratio = parseInt(li.dataset.value, 10);
				this.play.dimmensions({ ratio });
				this.markSelected(li, 'ratio');
			},
			size: function (li) {
				const size = parseInt(li.dataset.value, 10);
				this.play.dimmensions({ size });
				this.markSelected(li, 'size');
			}
		},
		videoBar: function ({ target }) {
			if (target.tagName.toLowerCase() === 'li' && target.dataset && target.dataset.type) {
				const t = target.dataset.type;
				if (Control.events.$fire[t]) {
					Control.events.$fire[t].call(this, target);
				}
			}
		}
	};

	/** P L A Y E R CLASS
	 *  @param {Control} parent Instance
	 */
	class Player {

		constructor(parent) {
			this.parent = parent;

			this.mode = 'off';

			this.attrs = {
				sources: null,
				quality: this.quality,
				size: null,
				ratio: null,
				start: this.time(),
				type: null
			};

			this.attrs.sources = this.sources;

			// todo improve type/media
			this.attrs.type = this.findType();
			this.media = Player.makeMedia[this.attrs.type](this);

			this.channel = _.e('div', { className: 'ytm_panel_channel ytm_block' }, this.media, true);
			this.switcher = _.e('div', { className: `ytm_panel_switcher ytm_panel_size ytm_block ytm_${this.attrs.type}`, _ytmuid: this.parent.state.uid, _standby: true });
			this.panel = _.e('div', { className: 'ytm_panel ytm_block' }, this.switcher, true);

			if (parent.state.site === 'soundcloud' && Y.reg.extra.soundcloud.playlist.test(parent.anchor.href)) {
				this.media.classList.add('ytm_soundcloud-playlist');
				this.switcher.classList.add('ytm_soundcloud-playlist');
			}

			this.dimmensions(Y.user.preferences);
		}

		get sources() {
			try {
				return Player.sources[this.parent.state.site](this.parent.state, this.attrs);
			} catch (e) {
				console.error(e);
			}
		}

		get quality() {
			return Player.qualities[Y.user.preferences.quality] || Player.qualities[360];
		}

		get className() {
			return `ytm_panel ytm_block ytm_panel-${Player.dimms.ratios[this.attrs.ratio]} ytm_panel-${Player.dimms.sizes[this.attrs.size]}`;
		}

		dimmensions({ ratio, size }) {
			this.attrs.ratio = isNumber(ratio) ? ratio : this.attrs.ratio;
			this.attrs.size = isNumber(size) ? size : this.attrs.size;
			this.panel.className = this.className;
		}

		time() {
			try {
				// debugger;
				const m = this.parent.state.uri.match(Y.reg.time).slice(1, 4);
				return ((+m[0] || 0) * 60 * 60) + ((+m[1] || 0) * 60) + (+m[2] || 0);
			} catch (e) { return 0; }
		}

		findType() {
			if (this.parent.state.site === 'html5-audio') { return 'audio'; }
			if (this.parent.site.videoTag) { return 'video'; }
			return 'iframe';
		}

		switchOff() {
			// console.log('removed media');

			if (this.media.pause) {
				// console.log('pausing');
				this.media.pause();
			}

			try {
				this.switcher.removeChild(this.channel);
			} catch (e) {
				// console.error(e);
			}
			this.mode = 'off';
		}

		switchOn() {
			if (this.attrs.size === 0) {
				this.attrs.size = Y.user.preferences.size;
				this.parent.resetViewSize();
			}
			// console.log('switch to media');
			this.switcher.appendChild(this.channel);
			this.switcher.dataset.standby = false;
			this.mode = 'on';
		}

		switchStandby() {
			// console.log('switch to standby');
			this.switchOff();
			this.switcher.dataset.standby = true;
			this.mode = 'standby';
		}

		isStandby() {
			return this.mode === 'standby';
		}
	}

	Player.sources = {
		iframe: function (data) {
			const key = Y.DB.sites[data.site].key;

			return [
				{ type: 'text/html', src: Y.DB.sites[data.site].embed.replace('%key', data[key]) }
			];
		},
		'html5-audio': function ({ uri }) {
			return [
				{ type: 'audio/mp3', src: uri }
			];
		},
		html5: function ({ uri }) {
			// attaching the type as either mp4 or webm

			if (/(?:webm)/.test(uri)) {
				return [
					{ type: 'video/webm', src: uri }
				];
			}

			return [
				{ type: 'video/mp4', src: uri },
				{ type: 'video/webm', src: uri },
				{ type: 'video/ogg; codecs="theora, vorbis"', src: uri }
			];
		},
		imgur: function ({ id }) {
			const src = Y.DB.sites.imgur.embed.replace('%key', id);

			return [
				{ type: 'video/webm', src: `${src}.webm` },
				{ type: 'video/mp4', src: `${src}.mp4` }
			];
		},
		youtube: function ({ id }, { quality, start }) {
			const params = `?html5=1&version=3&modestbranding=1&rel=0&showinfo=1&vq=${quality}&iv_load_policy=${Y.user.preferences.yt_annotation}&start=${start}&rel=0`;

			return [
				{ type: 'text/html', src: Y.DB.sites.youtube.embed.replace('%key', id) + params }
			];
		}
	};

	Player.dimms = {
		ratios: {
			1: 'sd',
			2: 'hd',
			3: 'pr'
		},
		sizes: {
			0: 'h',
			240: 's',
			360: 'm',
			480: 'l',
			720: 'xl'
		},
		aspects: {
			1: 4 / 3,
			2: 16 / 9,
			3: 16 / 9
		}
	};

	Player.qualities = {
		240: 'small',
		360: 'medium',
		480: 'large',
		720: 'hd720',
		1080: 'hd1080',
		1081: 'highres'
	};

	Player.css = {
		item: function (key, value) {
			if (isNumber(value)) {
				value += 'px';
			}

			return `\t${key}: ${value};\n`;
		},
		iter: function (css, cssEntries) {
			_.o(cssEntries, (key, value) => {
				css.push(Player.css.item(key, value));
			});
			css.push('}');
		},
		generator: function () {
			const css = [];

			_.o(this.sizes, (size, sizes) => {
				_.o(sizes, (dimm, keys) => {
					css.push(`\n.ytm_panel-${size}.ytm_panel-${dimm} .ytm_panel_size {\n`);
					Player.css.iter(css, keys);
				});
			});

			// add site overrides
			_.o(this.sites, (site, data) => {
				_.o(data, (setting, keys) => {
					if (setting === 'all') {
						css.push(`\n.ytm_site_${site} .ytm_panel_size {\n`);
					} else {
						css.push(`\n.ytm_site_${site} .ytm_panel-${setting} .ytm_panel_size {\n`);
					}
					Player.css.iter(css, keys);
				});
			});

			return css.join('');
		},
		sizes: (() => {
			const merge = {};

			_.o(Player.dimms.sizes, (num, size) => {
				if (num >= 0) {
					merge[size] = {};

					_.o(Player.dimms.ratios, (k, ratio) => {
						if (ratio === 'pr') {
							const w = Math.floor(num * 0.95); // smaller than the normal sizes
							merge[size][ratio] = {
								width: w,
								height: Math.floor(w * Player.dimms.aspects[k])
							};
						} else {
							merge[size][ratio] = {
								width: Math.floor(num * Player.dimms.aspects[k]),
								height: num
							};
						}
					});
				}
			});

			return merge;
		})(),
		sites: { // custom sizes per site
			soundcloud: {
				all: {
					height: '118px !important'
				}
			},
			vine: {
				s: {
					width: 240,
					height: 240
				},
				m: {
					width: 360,
					height: 360
				},
				l: {
					width: 480,
					height: 480
				},
				xl: {
					width: 720,
					height: 720
				}
			}
		}
	};

	Player.makeMedia = {
		$css: function (type) {
			return `ytm_panel_media ytm_panel_size ytm_block ytm_${type}`;
		},
		video: function ({ attrs }) {
			const video = _.e('video', {
				controls: true,
				autoplay: false,
				loop: true,
				className: this.$css('video'),
				$allowscriptaccess: true,
				preload: 'metadata'
			});

			const links = [];

			attrs.sources.forEach(({ src, type }) => {
				_.e('source', { src, $type: type }, video);

				links.push(`<a href="${src}">${src}</a>`);
			});

			_.e('p', { innerHTML: `Could not load source(s): ${links.join('<br />')}` }, video);

			return video;
		},
		iframe: function ({ attrs }) {
			return _.e('iframe', {
				$allowfullscreen: true,
				$referrerpolicy: 'no-referrer',
				// $sandbox: 'allow-same-origin allow-scripts allow-popups',
				$type: attrs.sources[0].type,
				src: attrs.sources[0].src,
				className: this.$css('iframe')
			});
		},
		audio: function ({ attrs }) {
			return _.e('audio', {
				src: attrs.sources[0].src,
				$type: attrs.sources[0].type
			});
		}
	};

	/** S C R O L L CLASS
	 * Window-Scroll Event Helper
	 */
	class Scroll {
		constructor(selector, cb, delay = 500) {
			this.selector = selector;
			this.cb = cb;
			this.monitor = this.monitor.bind(this);

			// console.log('YTMA.Scroll Monitor: ', selector);
			this.bound = _.debounce(this.monitor, delay);

			this.bound();
			window.addEventListener('scroll', this.bound, false);
		}

		stop() {
			// console.log('clear scroll: ', this.selector);
			window.removeEventListener('scroll', this.bound);
		}

		monitor() {
			_.s(this.selector, this.cb);
		}
	}

	Scroll.visible = el => {
		const bound = el.getBoundingClientRect();
		return (bound.top >= 0 && bound.top <= document.documentElement.clientHeight);
	};

	Scroll.visibleAll = (el, offset) => {
		const bound = el.getBoundingClientRect();
		const height = document.documentElement.clientHeight;
		offset = isNumber(offset) ? +offset : 0;
		return ((bound.bottom + offset >= 0)
			&& (bound.top <= height + offset || bound.bottom <= height - offset));
	};

	/** Returns 1, 0, -1 when el1 is above, exactly the same, or below el2 */
	Scroll.compare = (el1, el2) => {
		const a = el1.getBoundingClientRect().y;
		const b = el2.getBoundingClientRect().y;

		if (a < b) { return 1; }
		if (a === b) { return 0; }
		return -1;
	};


	Y.main();
})();
