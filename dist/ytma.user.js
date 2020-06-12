// ==UserScript==
// Do not modify and re-release this script!
// If you would like to add support for other sites, please tell me and I'll put it in the includes.

// @id             youtube-me-again
// @name           YouTube Me Again!
// @namespace      hateradio)))
// @author         hateradio
// @version        8.0.0
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

// @updated        2020-06-12T08:16:14.343Z

// @grant          GM.xmlhttpRequest
// @grant          GM_xmlhttpRequest

// @run-at         document-end
// ==/UserScript==

/*

## Updates

#### 8

* Update YTMA to ESNext
* Fix: (XenoForo) YouTube embed

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


/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Helpers */ "./src/modules/Helpers.js");
/* harmony import */ var _modules___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/_ */ "./src/modules/_.js");
/* harmony import */ var _modules_strg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/strg */ "./src/modules/strg.js");
/* harmony import */ var _modules_update__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/update */ "./src/modules/update.js");





(() => {

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
				this.anchor.classList.add('ytm_link', `ytm_link_${this.state.site}`);
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

			this.body = _modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('div', {
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
			this.projector = _modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('div', {
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
						${_modules_strg__WEBPACK_IMPORTED_MODULE_2__["default"].on ? '<li data-type="settings" data-value="" title="YTMA Settings">!</li>' : ''}
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
			thumbEvent: function (e) {
				let time = +this.dataset.time || 1;
				if (this.classList.contains('ytm_trigger') && e.type === 'mouseenter' && time < 50) {
					this.dataset.thumb = ((this.dataset.thumb || 0) + 1) % 3;
					this.style.backgroundImage = `url(https://i3.ytimg.com/vi/${this.dataset.ytmid}/${(+this.dataset.thumb) + 1}.jpg)`;
					window.clearTimeout(this.dataset.timeout);
					console.log('mouseenter -- clear before setting new ', this.dataset);
					this.dataset.timeout = window.setTimeout(Container.decorators.youtube.thumbEvent.bind(this, e), 800);
					console.log('mouseenter -- new timeout', this.dataset);
					this.dataset.time = time += 1;
				} else {
					window.clearTimeout(this.dataset.timeout);
					this.dataset.time = 0;
					console.log('mouseleave -- ', this.dataset);
				}
			}
		}
	};

	Container.events = {
		setup: () => {
			Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["on"])(document.body, 'click', 'var[data-ytmuid]', Container.events.fromTarget);
			Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["on"])(document.body, 'click', 'a[data-ytmdescription]', Container.events.manualLoad);
			Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["on"])(document.body, 'dblclick', 'q[data-full]', Container.events.titleToggle);

			Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["on"])(document.body, 'mouseenter mouseleave', 'div.ytm_site_youtube span.ytm_trigger', Container.decorators.youtube.thumbEvent);
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
					if (_modules_strg__WEBPACK_IMPORTED_MODULE_2__["default"].full() === true) {
						console.log('YTMA ERROR: Storage is full!');
						try {
							localStorage.removeItem(Y.external.version);
							_modules_strg__WEBPACK_IMPORTED_MODULE_2__["default"].on = _modules_strg__WEBPACK_IMPORTED_MODULE_2__["default"].test();
						} catch (e) {
							console.error(e);
						}
					}
				},
				runOnce: function (loop) {
					if (!document.body.dataset.ytmaenabled) {
						document.body.dataset.ytmaenabled = true;

						this.checkStorage();

						if (!Y.DB.extension) { _modules_update__WEBPACK_IMPORTED_MODULE_3__["default"].check(); }

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
					_modules___WEBPACK_IMPORTED_MODULE_1__["default"].css('.ytm_options li ul li { height: 24px !important }');
					_modules___WEBPACK_IMPORTED_MODULE_1__["default"].css('.bbCodeQuote .quoteContainer .quote { max-height: initial } .bbCodeQuote .quoteContainer .quoteExpand.quoteCut { display: none }');
					_modules___WEBPACK_IMPORTED_MODULE_1__["default"].css('.bbCodeQuote .ytm_block iframe, .bbCodeQuote .ytm_block [data-s9e-mediaembed], .bbCodeQuote .ytm_block .fb_iframe_widget, .bbCodeQuote .ytm_block object, .bbCodeQuote .ytm_block embed { max-height: initial; max-width: initial }');
					this.$generic();
				},
				'gfycat.com': function () {
					const v = document.querySelector('video');
					v.controls = true;
					_modules___WEBPACK_IMPORTED_MODULE_1__["default"].css('body,html {overflow:hidden;height:100%;width:100%} video {display:table;height:100%;margin:0 auto;}');
					document.body.appendChild(v);
				},
				'vine.co': function () {
					// console.log('vine.co');

					window.addEventListener('resize', () => {
						_modules___WEBPACK_IMPORTED_MODULE_1__["default"].s('[style]', e => {
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
					uri = Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["removeSearch"])(`https://soundcloud.com/${id}`, true);
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
			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].s('.message-body iframe', f => {
				if (/vi\/(.+?)\/hqdefault/.test(f.style.backgroundImage)) {
					const src = `https://youtu.be/${RegExp.$1}`;
					const span = f.closest('[data-s9e-mediaembed]');
					span.insertAdjacentHTML('beforebegin', `<a href="${src}">youtube</a>`);
					span.parentElement.removeChild(span);
				}
			});

			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].s('[data-s9e-mediaembed-iframe]', s => {
				const dat = JSON.parse(s.dataset.s9eMediaembedIframe);
				s.parentElement.parentElement.innerHTML = `<a href="${dat[dat.length - 1]}">youtube</a>`;
			});
		},
		links: function () {
			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].s(Y.selector.ignore(), ({ dataset }) => dataset.ytmaignore = true);

			const links = _modules___WEBPACK_IMPORTED_MODULE_1__["default"].qsa(Y.selector.getAllSiteSelectors()).filter(({ dataset }) => {
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

			if (_modules_strg__WEBPACK_IMPORTED_MODULE_2__["default"].on) {
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
			const s = _modules_strg__WEBPACK_IMPORTED_MODULE_2__["default"].grab(Y.user.KEY, {});

			Y.user.preferences = Object.keys(this.defaults).reduce((valid, k) => {
				valid[k] = Y.user.validate(k, s[k]);
				return valid;
			}, {});

			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].o(Y.user.mapping, (key, val) => {
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
			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].o(a, (id, val) => {
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

				if (_modules_strg__WEBPACK_IMPORTED_MODULE_2__["default"].save(Y.user.KEY, settings)) {
					Y.user.load();
				} else {
					Y.user.error.classList.remove('ytm_none');
				}

			},
			reset: function () {
				Y.user.preferences = Y.user.defaults;
				Y.user.mark();
				_modules_strg__WEBPACK_IMPORTED_MODULE_2__["default"].wipe(Y.user.KEY);
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
						_modules___WEBPACK_IMPORTED_MODULE_1__["default"].s(`var[data-ytmsid="${link.dataset.ytmsid}"]:not([data-ytmscroll="false"])`, trigger => {
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

				Y.user.$form = _modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('div', { className: 'ytm_fix_center ytm_none ytm_box', innerHTML: template }, document.body);
				Y.user.error = document.getElementById('ytm_settings_error');

				Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["on"])(Y.user.$form, 'keyup click', 'input, label', Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["debounce"])(Y.user.events.save, 500));
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
		_modules___WEBPACK_IMPORTED_MODULE_1__["default"].css(playerCss);

		// images
		// todo update(site, size, padding)
		_modules___WEBPACK_IMPORTED_MODULE_1__["default"].css(`
			.ytm_loading{background:url(${loadingIcon}) 0 3px no-repeat;}
			.ytm_link{position:relative !important;background:url(${Y.DB.sites.youtube.favicon}) 0 center no-repeat !important;margin-left:4px;padding-left:20px!important;}
			.ytm_link.ytm_link_vimeo{background-image:url(${Y.DB.sites.vimeo.favicon}) !important;background-size:12px 12px !important;padding-left:18px!important}
			.ytm_link.ytm_link_vine{background-image:url(${Y.DB.sites.vine.favicon}) !important;background-size:10px 10px!important;padding-left:16px!important}
			.ytm_link.ytm_link_soundcloud{background-image:url(${Y.DB.sites.soundcloud.favicon})!important;padding-left:17px!important}
			.ytm_link.ytm_link_html5{background-image:url(${Y.DB.sites.html5.favicon}) !important;padding-left:16px!important}
			.ytm_link.ytm_link_gfycat{background-image:url(${Y.DB.sites.gfycat.favicon}) !important;background-size:12px 12px !important;padding-left:16px!important;}
			.ytm_link.ytm_link_imgur{background-image:url(${Y.DB.sites.imgur.favicon}) !important;background-size:12px 12px !important;padding-left:16px!important}
			.ytm_link.ytm_link_streamable{background-image:url(${Y.DB.sites.streamable.favicon}) !important; background-size: 12px 12px !important;padding-left: 14px !important;}
		`);

		_modules___WEBPACK_IMPORTED_MODULE_1__["default"].css('.ytm_none,.ytm_link br{display:none!important}.ytm_box{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.ytm_block{display:block;position:relative;clear:both;text-align:left;border:0;margin:0;padding:0;overflow:hidden}.ytm_normalize{font-weight:400!important;font-style:normal!important;line-height:1.2!important}.ytm_sans{font-family:Arial,Helvetica,sans-serif!important}.ytm_spacer{overflow:auto;margin:0 0 6px;padding:4px}.ytm_spacer.ytm_site_slim{display:inline}.ytm_clear:after{content:"";display:table;clear:both}.ytm_center{text-align:center}.ytm_link b,.ytm_link strong{font-weight:400!important}.ytm_link u{text-decoration:none!important}.ytm_link i,.ytm_link em{font-style:normal!important}.ytm_trigger{width:118px;height:66px;background-color:#262626!important;cursor:pointer;background-position:-1px -12px;float:left;box-shadow:2px 2px rgba(0,0,0,.3);background-size:auto 90px!important;color:#fff;text-shadow:#333 0 0 2px;font-size:13px}.ytm_trigger:hover{box-shadow:2px 2px #60656b80;opacity:.95}.ytm_trigger var{z-index:2;height:100%;width:100%;position:absolute;left:0;top:0;text-align:right}.ytm_label{display:block;padding:3px 6px;line-height:1.2;font-style:normal}.ytm_init{height:22px;background:rgba(11,11,11,.62);padding:4px 25px 6px 6px}.ytm_site_vine .ytm_trigger{background-color:#90ee90!important;background-size:120px auto!important}.ytm_site_slim .ytm_trigger{background:#e34c26!important;height:auto;box-shadow:0 0 2px #ffdb9d inset,2px 2px rgba(0,0,0,.3);margin:0 3px 0 0;width:auto;transition:all .3s ease-in-out 0s}.ytm_site_slim .ytm_trigger:hover{opacity:.8}.ytm_site_slim .ytm_label{text-shadow:0 0 1px #f06529}.ytm_site_slim .ytm_init{background:transparent}.ytm_bd{float:left;max-width:450px;margin:2px 10px;font-size:12px}.ytm_title{font-weight:700}.ytm_error{color:#cc2f24;font-style:italic}.ytm_loading{font-style:italic;padding:1px 1.5em}.ytm_descr{word-wrap:break-word;max-height:48px;overflow:auto;padding-right:20px}.ytm_descr[data-full]{cursor:pointer}.ytm_descr_open{resize:both;white-space:pre-line;background:linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 80%,rgba(0,0,0,0.1) 100%)}.ytm_descr_open[style]{max-height:none}.ytm_projector{margin-bottom:4px}ul.ytm_options{overflow:hidden;margin:0!important;padding:3px 0 1px;list-style-position:outside!important}.ytm_options li{display:inline;margin:0!important;padding:0!important}.ytm_options li>ul{display:inline-block;margin:0;padding:0 1px 0 0}.ytm_options li ul li{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none;list-style-type:none;cursor:pointer;float:left;color:#858585;border:1px solid #1d1d1d;border-bottom:1px solid #181818;border-top:1px solid #292929;box-shadow:0 0 1px #555;height:14px;font-size:12px!important;line-height:12px!important;background:#222;background:linear-gradient(#2d2c2c,#222);margin:0!important;padding:5px 9px 3px!important}.ytm_options li ul li:first-child{border-radius:2px 0 0 2px}.ytm_options li ul li:last-child{border-left:0!important;border-radius:0 2px 2px 0;margin:0 2px 0 0!important}.ytm_options li ul li:first-child:last-child,.ytm_li_setting{border-radius:2px}.ytm_options li ul li:hover{color:#ccc;text-shadow:1px 1px 0 #333;background:#181818}.ytm_options li ul li[id]{color:#ddd;text-shadow:0 0 2px #444}.ytm_panel_size{background:#000;max-width:100%;}.ytm_panel_switcher[data-standby="true"]{background:#111}.ytm_panel_switcher[data-standby="true"]:after{cursor:cell;color:#0e0e0e;content:"ytma!";display:block;font-size:85px;font-style:italic;font-weight:700;left:50%;position:absolute;text-shadow:2px 1px #181818,-1px -1px #0a0a0a;top:50%;transform:translate(-50%,-50%)}.ytm_site_soundcloud .ytm_panel_size.ytm_soundcloud-playlist{height:334px!important}.ytm_fix_center{background:rgba(51,51,51,.41);height:100%;left:0;position:fixed;top:0;width:100%;z-index:99998}#ytm_settings{z-index:99999;max-width:500px;max-height:85%;overflow:auto;background:#fbfbfb;border:1px solid #bbb;color:#444;box-shadow:0 0 5px rgba(0,0,0,.2),0 0 3px rgba(239,239,239,.1) inset;margin:4% auto;padding:4px 8px 0}#ytm_settings p{margin:5px 0;padding:0}#ytm_settings fieldset{vertical-align:top;border-radius:3px;border:1px solid #ccc;margin:0 0 5px;padding:3px}#ytm_settings legend{padding:3px}#ytm_settings fieldset span{display:inline-block;min-width:5em}#ytm_settings input{vertical-align:baseline!important;margin:3px 5px!important}#ytm_settingst{font-size:110%;border-bottom:1px solid #d00;margin:3px 0 9px;padding:0 3px 3px}#ytm_settings label{cursor:pointer}#ytm_settings small{font-size:90%}#ytm_opts button{cursor:pointer;margin:10px 5px 8px 2px;padding:3px;border:1px solid #adadad;border-radius:2px;background:#eee;font-size:90%}#ytm_opts button:hover{background:#ddd}');
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
			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].s(`.ytm_bd._${Y.escapeId(this.id)}`, el => {
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
			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].s(`.ytm_manual._${Y.escapeId(id)} a`, el => {
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
					th: Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["removeSearch"])(thumbnail_url)
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
					th: Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["removeSearch"])(thumbnail_url)
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
			return _modules_strg__WEBPACK_IMPORTED_MODULE_2__["default"].save(this.version, this.db);
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
				_modules___WEBPACK_IMPORTED_MODULE_1__["default"].s(`[data-ytmid="${id}"].ytm_trigger`, el => el.setAttribute('style', `background: url(${th})`));
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

			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].s(`.ytm_bd._${Y.escapeId(id)}`, el => {
				el.innerHTML = `<span class="ytm_title">${title}</span>`;
				if (desc) {
					const q = _modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('q', { className: 'ytm_descr ytm_block', textContent: desc }, el);
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
	Y.external.db = _modules_strg__WEBPACK_IMPORTED_MODULE_2__["default"].grab(Y.external.version, {});

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

			this.channel = _modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('div', { className: 'ytm_panel_channel ytm_block' }, this.media, true);
			this.switcher = _modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('div', { className: `ytm_panel_switcher ytm_panel_size ytm_block ytm_${this.attrs.type}`, _ytmuid: this.parent.state.uid, _standby: true });
			this.panel = _modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('div', { className: 'ytm_panel ytm_block' }, this.switcher, true);

			if (parent.state.site === 'soundcloud' && Y.reg.extra.soundcloud.playlist.test(parent.anchor.href)) {
				this.media.classList.add('ytm_soundcloud-playlist');
				this.switcher.classList.add('ytm_soundcloud-playlist');
			}

			this.dimmensions(Y.user.preferences);
		}

		get sources() {
			try {
				return (Player.sources[this.parent.state.site] || Player.sources.iframe)(this.parent.state, this.attrs);
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
			this.attrs.ratio = Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(ratio) ? ratio : this.attrs.ratio;
			this.attrs.size = Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(size) ? size : this.attrs.size;
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
			if (Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(value)) {
				value += 'px';
			}

			return `\t${key}: ${value};\n`;
		},
		iter: function (css, cssEntries) {
			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].o(cssEntries, (key, value) => {
				css.push(Player.css.item(key, value));
			});
			css.push('}');
		},
		generator: function () {
			const css = [];

			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].o(this.sizes, (size, sizes) => {
				_modules___WEBPACK_IMPORTED_MODULE_1__["default"].o(sizes, (dimm, keys) => {
					css.push(`\n.ytm_panel-${size}.ytm_panel-${dimm} .ytm_panel_size {\n`);
					Player.css.iter(css, keys);
				});
			});

			// add site overrides
			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].o(this.sites, (site, data) => {
				_modules___WEBPACK_IMPORTED_MODULE_1__["default"].o(data, (setting, keys) => {
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

			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].o(Player.dimms.sizes, (num, size) => {
				if (num >= 0) {
					merge[size] = {};

					_modules___WEBPACK_IMPORTED_MODULE_1__["default"].o(Player.dimms.ratios, (k, ratio) => {
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
			const video = _modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('video', {
				controls: true,
				autoplay: false,
				loop: true,
				className: this.$css('video'),
				$allowscriptaccess: true,
				preload: 'metadata'
			});

			const links = [];

			attrs.sources.forEach(({ src, type }) => {
				_modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('source', { src, $type: type }, video);

				links.push(`<a href="${src}">${src}</a>`);
			});

			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('p', { innerHTML: `Could not load source(s): ${links.join('<br />')}` }, video);

			return video;
		},
		iframe: function ({ attrs }) {
			return _modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('iframe', {
				$allowfullscreen: true,
				$referrerpolicy: 'no-referrer',
				// $sandbox: 'allow-same-origin allow-scripts allow-popups',
				$type: attrs.sources[0].type,
				src: attrs.sources[0].src,
				className: this.$css('iframe')
			});
		},
		audio: function ({ attrs }) {
			return _modules___WEBPACK_IMPORTED_MODULE_1__["default"].e('audio', {
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
			this.bound = Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["debounce"])(this.monitor, delay);

			this.bound();
			window.addEventListener('scroll', this.bound, false);
		}

		stop() {
			// console.log('clear scroll: ', this.selector);
			window.removeEventListener('scroll', this.bound);
		}

		monitor() {
			_modules___WEBPACK_IMPORTED_MODULE_1__["default"].s(this.selector, this.cb);
		}
	}

	Scroll.visible = el => {
		const bound = el.getBoundingClientRect();
		return (bound.top >= 0 && bound.top <= document.documentElement.clientHeight);
	};

	Scroll.visibleAll = (el, offset) => {
		const bound = el.getBoundingClientRect();
		const height = document.documentElement.clientHeight;
		offset = Object(_modules_Helpers__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(offset) ? +offset : 0;
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


/***/ }),

/***/ "./src/modules/Helpers.js":
/*!********************************!*\
  !*** ./src/modules/Helpers.js ***!
  \********************************/
/*! exports provided: isNumber, removeSearch, on, debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSearch", function() { return removeSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
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

/**
 * @param {HTMLElement} element HTML element
 * @param {string} events Space- or coma-separated string of one or more types, eg "click dblclick"
 * @param {string} selector CSS selector for the elements to trigger the event on
 * @param {Function} listener A callback
 * @param {Boolean} cancel Cancel
 */
const on = (element, events, selector, listener, cancel = true) => {
	events = events.split(/(?:\s+|,)/).filter(f => f);

	if (events.length === 0) return;

	const fn = event => {
		const found = event.target.closest(selector);
		if (found) listener.call(found, event);
	};

	events.forEach(type => element.addEventListener(type, fn, cancel));
};

const debounce = (fn, delay = 250) => {
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

/***/ }),

/***/ "./src/modules/_.js":
/*!**************************!*\
  !*** ./src/modules/_.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (_);

/***/ }),

/***/ "./src/modules/strg.js":
/*!*****************************!*\
  !*** ./src/modules/strg.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (strg);

/***/ }),

/***/ "./src/modules/update.js":
/*!*******************************!*\
  !*** ./src/modules/update.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _strg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./strg */ "./src/modules/strg.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_ */ "./src/modules/_.js");



// U P D A T E HANDLE
const update = {
	name: 'ytma!',
	version: 8000,
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
			_strg__WEBPACK_IMPORTED_MODULE_0__["default"].save(update.key, { date: update.time(), version, page });
			update.link();
		}
	},
	link: () => {
		if (update.show) { return; }
		update.show = true;

		const { page } = _strg__WEBPACK_IMPORTED_MODULE_0__["default"].read(update.key);
		const link = `
				<a href="${page || update.page}" id=updatev3 title=Update target=_blank>
					An update for ${update.name} is available.
				</a>`;

		___WEBPACK_IMPORTED_MODULE_1__["default"].css(update.css);
		document.body.insertAdjacentHTML('beforeend', link);
		___WEBPACK_IMPORTED_MODULE_1__["default"].on(document.body, 'click', '#updatev3', e => e.target.style.display = 'none');
	},
	check: (opt) => {
		if (!_strg__WEBPACK_IMPORTED_MODULE_0__["default"].on) { return; }
		if (window.chrome && window.chrome.extension) { return; }
		const stored = _strg__WEBPACK_IMPORTED_MODULE_0__["default"].read(update.key);
		let page;

		if (opt || !stored || stored.date < update.day) {
			page = (stored && stored.page) || update.page;
			_strg__WEBPACK_IMPORTED_MODULE_0__["default"].save(update.key, { date: update.time(), version: update.version, page });
			fetch(update.json).then(res => res.json()).then(update.notification);
		} else if (update.version < stored.version) {
			update.link();
		}
	},
	css: '#updater3,#updater3:visited{box-shadow:1px 1px 6px #7776;border-bottom:3px solid #e39c2d;cursor:pointer;color:#555;font-family:sans-serif;font-size:12px;font-weight:700;text-align:justify;position:fixed;z-index:999999;right:10px;top:10px;background:#ebebeb url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTM0IDUxMiA1MTIiPjxwYXRoIGZpbGw9IiNlNWViZjUiIGQ9Ik0yNzAuNzgxIDcuNUgyNDEuMjJMOC42NiA0MTAuMzA1bDE0Ljc4MSAyNS42MDFINDg4LjU2bDE0Ljc4LTI1LjYwMXptMCAwIi8+PHBhdGggZmlsbD0iI2Y4ZTg2OCIgZD0iTTQ4LjcwNyA0MDAuOTM0TDI1My4xMjkgNDYuODY3aDUuNzQybDIwNC40MjIgMzU0LjA2N2MtMS4yNzcgMi4yMS0xLjU5NCAyLjc2NS0yLjg3MSA0Ljk3Nkg1MS41NzhjLTEuMjc3LTIuMjEtMS41OTQtMi43NjUtMi44NzEtNC45NzZ6bTAgMCIvPjxwYXRoIGZpbGw9IiNlMzljMmQiIGQ9Ik0yNzUuOTk2IDc2LjUyN2wtMTcuMTI1LTI5LjY2aC01Ljc0Mkw0OC43MDcgNDAwLjkzNGMxLjI3NyAyLjIxIDEuNTk0IDIuNzY1IDIuODcxIDQuOTc2aDM5Ljk5NmMtMS4yNzctMi4yMS0xLjU5Ny0yLjc2NS0yLjg3LTQuOTc2em0wIDAiLz48cGF0aCBmaWxsPSIjY2FkOGVhIiBkPSJNMjc1Ljk5NiAxNi41MzVMMjcwLjc4MSA3LjVIMjQxLjIyTDguNjYgNDEwLjMwNWM2LjU2NyAxMS4zNzkgOC4yMTEgMTQuMjIyIDE0Ljc4MSAyNS42MDFoMzkuOTk2Yy02LjU3LTExLjM3OS04LjIxNC0xNC4yMjItMTQuNzgtMjUuNjAxem0wIDAiLz48cGF0aCBmaWxsPSIjNzI4NjllIiBkPSJNMjcwLjg1NSAzMDIuNDU3aC0yOS43MWMtMy4wMDQtMy4wMDQtNC42OTItNC42ODctNy42OTYtNy42OTFWMTYzLjg2M2g0NS4xMDJ2MTMwLjkwM2MtMy4wMDggMy4wMDQtNC42OTIgNC42ODctNy42OTYgNy42OTF6bTAgMCIvPjxwYXRoIGZpbGw9IiM1MzYyNzUiIGQ9Ik0yNTMuNDUgMTYzLjg2M2gtMjB2MTMwLjkwM2MzLjAwMyAzLjAwNCA0LjY5IDQuNjg3IDcuNjk1IDcuNjkxaDE5Ljk5NmwtNy42OTItNy42OTF6bTAgMCIvPjxwYXRoIGZpbGw9IiM3Mjg2OWUiIGQ9Ik0yMzMuNDUgMzMwLjgxM2g0NS4xdjQ1LjEwMWgtNDUuMXptMCAwIi8+PHBhdGggZmlsbD0iIzUzNjI3NSIgZD0iTTIzMy40NSAzMzAuODEzaDIwdjQ1LjEwMWgtMjB6bTAgMCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNzUuOTk2IDE0MS4zNjdIMjYxdi0xNWgxNC45OTZ6bS0yNC45OTYgMGgtMTV2LTE1aDE1em0wIDAiLz48cGF0aCBkPSJNNDAwLjQzIDIxNy4wNTlsLTEyLjk4OSA3LjVMNDk0LjY4IDQxMC4zMDVsLTEwLjQ1IDE4LjEwMUgyNy43N2wtMTAuNDU0LTE4LjEwMUwyNDUuNTQ2IDE1aDIwLjkwN2wxMDcuMjM4IDE4NS43NDYgMTIuOTg5LTcuNUwyNzUuMTEzIDBoLTM4LjIyMkwwIDQxMC4zMDVsMTkuMTEgMzMuMTAxaDQ3My43NzdMNTEyIDQxMC4zMDV6bTAgMCIvPjxwYXRoIGQ9Ik0xMjUuMTU2IDQxMy40MDZINDY0Ljc1bDcuMjAzLTEyLjQ3Mi0yMDguNzUtMzYxLjU2N2gtMTQuNDA2TDQwLjA0NyA0MDAuOTM0bDcuMiAxMi40NzJoNTcuOTEzVjM5OC40MUg1OC44MjRMMjU2IDU2Ljg5bDE5Ny4xNzYgMzQxLjUyaC0zMjguMDJ6bTAgMCIvPjxwYXRoIGQ9Ik0yODYuMDQ3IDIyOS41NTl2LTczLjE5NmgtNjAuMDk4djE0MS41MDhsMTIuMDkgMTIuMDg2aDM1LjkyMmwxMi4wODYtMTIuMDg2VjI0OS41NkgyNzEuMDV2NDIuMDk3bC0zLjMwMSAzLjMwNWgtMjMuNWwtMy4zLTMuMzA1VjE3MS4zNjNoMzAuMXY1OC4xOTZ6bTAgME0yMjUuOTUgMzgzLjQxaDYwLjA5N3YtNjAuMDk4aC02MC4wOTh6bTE1LTQ1LjA5OGgzMC4xdjMwLjEwMmgtMzAuMXptMCAwIi8+PC9zdmc+) no-repeat 10px center;background-size:40px;padding:0 20px 0 60px;height:55px;line-height:55px}#updater3:hover,#updater3:visited:hover{color:#b33a3a !important;border-color:#ce4b30;text-decoration: none;}' // Icon made by Freepik from www.flaticon.com 
};
update.check();

/* harmony default export */ __webpack_exports__["default"] = (update);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL0hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvXy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9zdHJnLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL3VwZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7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QUNGO0FBQ0EsT0FBTyw2Q0FBSSxNQUFNLFFBQVE7QUFDekIsaURBQWlELFFBQVE7QUFDekQsaUJBQWlCLDZDQUFJO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQSxHQUFHLDZDQUFJLG1CQUFtQixxREFBcUQ7QUFDL0U7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7QUFDRixtQ0FBbUMsNkJBQTZCLGdDQUFnQyxlQUFlLFdBQVcsdUJBQXVCLGVBQWUsZ0JBQWdCLG1CQUFtQixlQUFlLGVBQWUsV0FBVyxTQUFTLDBDQUEwQyxteEVBQW14RSxxQkFBcUIsc0JBQXNCLFlBQVksaUJBQWlCLHdDQUF3Qyx5QkFBeUIscUJBQXFCLHVCQUF1QjtBQUN2dUY7QUFDQTs7QUFFZSxxRUFBTSxFIiwiZmlsZSI6Inl0bWEudXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgaXNOdW1iZXIsIHJlbW92ZVNlYXJjaCwgb24sIGRlYm91bmNlIH0gZnJvbSAnLi9tb2R1bGVzL0hlbHBlcnMnO1xuaW1wb3J0IF8gZnJvbSAnLi9tb2R1bGVzL18nO1xuaW1wb3J0IHN0cmcgZnJvbSAnLi9tb2R1bGVzL3N0cmcnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICcuL21vZHVsZXMvdXBkYXRlJztcblxuKCgpID0+IHtcblxuXHQvKiogWSBUIE0gQSBDTEFTU1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBCYXNlIFlUTUEgY2xhc3MsIGZpbGxlZCB0aHJvdWdoIGNvbnN0cnVjdG9yKCkgb3IgcmVhY3RpdmF0ZSgpIHRob3VnaCBzdWItY2xhc3Nlc1xuXHQgKiBZJ3Mgb25seSBjb25jZXJuZWQgYWJvdXQgdGhlIGFuY2hvciBhbmQgdGhlIGRhdGEgcHJvcHNcblx0ICpcblx0ICogQHBhcmFtIHtvYmplY3R9IHByb3BzIFByb3BlcnRpZXNcblx0ICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBwcm9wcy5pZCBVbmlxdWUgSURcblx0ICogQHBhcmFtIHtTdHJpbmd9IHByb3BzLnNpdGUgV2Vic2l0ZSBuYW1lIGVnOiB5b3V0dWJlLCB2aW1lb1xuXHQgKiBAcGFyYW0ge0hUTUxBbmNob3JFbGVtZW50fSBwcm9wcy5hbmNob3IgQW5jaG9yIGVsZW1lbnRcblx0ICovXG5cdGNsYXNzIFkge1xuXG5cdFx0Y29uc3RydWN0b3IoeyBpZCwgc2l0ZSwgYW5jaG9yIH0pIHtcblx0XHRcdGNvbnN0IHVpZCA9IFkuZXNjYXBlSWQoYCR7aWR9XyR7WS5udW0gKz0gMX1gKTtcblxuXHRcdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdFx0aWQsXG5cdFx0XHRcdHVpZDogWS5lc2NhcGVJZCh1aWQpLCAvLyB1bmlxdWUgaWRcblx0XHRcdFx0c2lkOiBZLmVzY2FwZUlkKGlkKSwgLy8gc2hhcmVkIGlkXG5cdFx0XHRcdHNpdGUsXG5cdFx0XHRcdHVyaTogYW5jaG9yLmhyZWZcblx0XHRcdH07XG5cblx0XHRcdGlmIChhbmNob3IgJiYgIWFuY2hvci5kYXRhc2V0Lnl0bXNjcm9sbCkgeyBhbmNob3IuZGF0YXNldC55dG1zY3JvbGwgPSB0cnVlOyB9XG5cblx0XHRcdHRoaXMuYW5jaG9yID0gYW5jaG9yO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJlY3JlYXRlcyBhIFlUTUEgb2JqZWN0IGZyb20gYSB0cmlnZ2VyIGVsZW1lbnRcblx0XHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IHRoZSBlbGVtZW50J3MgZGF0YXNldCBmb3IgdGhlIHJlc3VyZWN0aW9uIVxuXHRcdCAqL1xuXHRcdHJlYWN0aXZhdGUoeyBkYXRhc2V0IH0pIHtcblx0XHRcdGNvbnN0IGlkID0gZGF0YXNldC55dG1pZDtcblx0XHRcdGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGFbZGF0YS15dG11aWQ9XCIke2RhdGFzZXQueXRtdWlkfVwiXWApO1xuXG5cdFx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0XHRpZCxcblx0XHRcdFx0dWlkOiBkYXRhc2V0Lnl0bXVpZCxcblx0XHRcdFx0c2lkOiBkYXRhc2V0Lnl0bXNpZCxcblx0XHRcdFx0c2l0ZTogZGF0YXNldC55dG1zaXRlLFxuXHRcdFx0XHR1cmk6IGFuY2hvci5ocmVmXG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmFuY2hvciA9IGFuY2hvcjtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0ZGlzYWJsZU9wZW5PblNjcm9sbCgpIHtcblx0XHRcdHRoaXMuYW5jaG9yLmRhdGFzZXQueXRtc2Nyb2xsID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y2FuU2Nyb2xsKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuYW5jaG9yLmRhdGFzZXQueXRtc2Nyb2xsID09PSAndHJ1ZSc7XG5cdFx0fVxuXG5cdFx0aXNCZWxvdyhsaW5rKSB7XG5cdFx0XHRyZXR1cm4gU2Nyb2xsLmNvbXBhcmUodGhpcy5hbmNob3IsIGxpbmspIDwgMTtcblx0XHR9XG5cblx0XHRjYW5TaG93VW5kZXIobGluaykge1xuXHRcdFx0dGhpcy5jYW5TY3JvbGwoKSAmJiB0aGlzLmlzQmVsb3cobGluayk7XG5cdFx0fVxuXG5cdFx0dXBkYXRlQW5jaG9yKCkge1xuXHRcdFx0aWYgKHRoaXMuYW5jaG9yLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0dGhpcy5hbmNob3IuY2xhc3NMaXN0LmFkZCgneXRtX2xpbmsnLCBgeXRtX2xpbmtfJHt0aGlzLnN0YXRlLnNpdGV9YCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmFuY2hvci5kYXRhc2V0Lnl0bWlkID0gdGhpcy5zdGF0ZS5pZDtcblx0XHRcdHRoaXMuYW5jaG9yLmRhdGFzZXQueXRtdWlkID0gdGhpcy5zdGF0ZS51aWQ7XG5cdFx0XHR0aGlzLmFuY2hvci5kYXRhc2V0Lnl0bXNpZCA9IHRoaXMuc3RhdGUuc2lkO1xuXHRcdFx0dGhpcy5hbmNob3IudGl0bGUgPSAnVmlzaXQgdGhlIHZpZGVvIHBhZ2UuJztcblx0XHR9XG5cblx0fVxuXG5cdC8qKiBDIE8gTiBUIEEgSSBOIEUgUiBDTEFTU1xuXHQgKiBUaGUgY29udGFpbmVyLCBhcyB0aGUgbmFtZSBpbXBsaWVzLCBjb250YWlucyBhbGwgdGhlIGludGVyYWN0aXZlIGVsZW1lbnRzXG5cdCAqIFRodW1ibmFpbCwgUGxheWVyLCBDb250cm9scywgZXRjLlxuXHQgKi9cblx0Y2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgWSB7XG5cblx0XHRjcmVhdGVJbnRlcmZhY2UoKSB7XG5cdFx0XHRjb25zdCB7IHN0YXRlIH0gPSB0aGlzO1xuXHRcdFx0dGhpcy5zaXRlID0gWS5EQi5zaXRlc1tzdGF0ZS5zaXRlXTtcblx0XHRcdGNvbnN0IHsgYWpheCwgc2xpbSB9ID0gdGhpcy5zaXRlO1xuXG5cdFx0XHR0aGlzLnVwZGF0ZUFuY2hvcigpO1xuXG5cdFx0XHR0aGlzLmJvZHkgPSBfLmUoJ2RpdicsIHtcblx0XHRcdFx0aWQ6IGB3JHtzdGF0ZS51aWR9YCxcblx0XHRcdFx0Y2xhc3NOYW1lOiBgeXRtX3NwYWNlciB5dG1fYmxvY2sgeXRtX3NpdGVfJHtzdGF0ZS5zaXRlfWAsXG5cdFx0XHRcdGlubmVySFRNTDogdGhpcy5jcmVhdGVUaHVtYm5haWxUZW1wbGF0ZSgpXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy50aHVtYm5haWwgPSB0aGlzLmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cblx0XHRcdGlmIChhamF4KSB7IHRoaXMuY3JlYXRlQWpheExpbmsoKTsgfVxuXHRcdFx0aWYgKHNsaW0pIHsgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ3l0bV9zaXRlX3NsaW0nKTsgfVxuXG5cdFx0XHR0aGlzLmFuY2hvci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgdGhpcy5ib2R5KTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Q29udGFpbmVyLmRlY29yYXRvcnNbc3RhdGUuc2l0ZV0uZ3VpKHRoaXMpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHQvLyBtZWhcblx0XHRcdH1cblx0XHR9XG5cblx0XHR1cGRhdGVBbmNob3IoKSB7XG5cdFx0XHRjb25zdCB7IHNjcm9sbCwgaHR0cHMgfSA9IHRoaXM7XG5cdFx0XHRpZiAoc2Nyb2xsKSB7IHRoaXMuYW5jaG9yLmNsYXNzTGlzdC5hZGQoJ3l0bV9zY3JvbGwnKTsgfVxuXHRcdFx0aWYgKGh0dHBzKSB7IHRoaXMuYW5jaG9yLmhyZWYgPSB0aGlzLmFuY2hvci5ocmVmLnJlcGxhY2UoJ2h0dHA6JywgJ2h0dHBzOicpOyB9XG5cblx0XHRcdHN1cGVyLnVwZGF0ZUFuY2hvcigpO1xuXHRcdH1cblxuXHRcdGNyZWF0ZVRodW1ibmFpbFRlbXBsYXRlKCkge1xuXHRcdFx0Y29uc3QgeyB0aXRsZSwgdGh1bWIgPSAnJyB9ID0gdGhpcy5zaXRlO1xuXHRcdFx0Y29uc3QgeyBpZCwgdWlkLCBzaWQsIHNpdGUgfSA9IHRoaXMuc3RhdGU7XG5cblx0XHRcdGNvbnN0IGJnID0gdGh1bWIgPyBgYmFja2dyb3VuZC1pbWFnZTogJHt0aHVtYi5yZXBsYWNlKCcla2V5JywgaWQpfWAgOiAnJztcblxuXHRcdFx0Y29uc3QgdGVtcGxhdGUgPSBgXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwieXRtX3RyaWdnZXIgeXRtX2Jsb2NrIHl0bV9ub3JtYWxpemUgeXRtX3NhbnNcIlxuXHRcdFx0XHRcdHRpdGxlPVwiJHt0aXRsZX1cIlxuXHRcdFx0XHRcdGRhdGEteXRtaWQ9XCIke2lkfVwiXG5cdFx0XHRcdFx0ZGF0YS15dG1zaXRlPVwiJHtpZH1cIlxuXHRcdFx0XHRcdHN0eWxlPVwiJHtiZ31cIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInl0bV9pbml0IHl0bV9sYWJlbCB5dG1fc2FucyB5dG1fYm94XCI+JHt0aXRsZX08L3NwYW4+XG5cdFx0XHRcdFx0XHQ8dmFyIGNsYXNzPVwieXRtX2xhYmVsIHl0bV9ib3hcIlxuXHRcdFx0XHRcdFx0XHRkYXRhLXl0bWlkPVwiJHtpZH1cIlxuXHRcdFx0XHRcdFx0XHRkYXRhLXl0bXVpZD1cIiR7dWlkfVwiXG5cdFx0XHRcdFx0XHRcdGRhdGEteXRtc2lkPVwiJHtzaWR9XCJcblx0XHRcdFx0XHRcdFx0ZGF0YS15dG1zaXRlPVwiJHtzaXRlfVwiPlxcdTI1QjY8L3Zhcj5cblx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdDwvc3Bhbj5gO1xuXHRcdFx0cmV0dXJuIHRlbXBsYXRlO1xuXHRcdH1cblxuXHRcdGNyZWF0ZUFqYXhMaW5rKCkge1xuXHRcdFx0Y29uc3QgeyBzaWQsIGlkLCBzaXRlLCB1cmkgfSA9IHRoaXMuc3RhdGU7XG5cdFx0XHRjb25zdCB0ZW1wbGF0ZSA9IGBcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ5dG1fYmQgeXRtX25vcm1hbGl6ZSB5dG1fbWFudWFsIF8ke3NpZH1cIj5cblx0XHRcdFx0XHQ8YSBocmVmPVwiI1wiIGNsYXNzPVwieXRtX3RpdGxlXCIgdGl0bGU9XCJMb2FkIHRoaXMgdmlkZW8ncyBkZXNjcmlwdGlvbi5cIlxuXHRcdFx0XHRcdFx0ZGF0YS15dG1pZD1cIiR7aWR9XCJcblx0XHRcdFx0XHRcdGRhdGEteXRtc2l0ZT1cIiR7c2l0ZX1cIlxuXHRcdFx0XHRcdFx0ZGF0YS15dG11cmk9XCIke3VyaX1cIlxuXHRcdFx0XHRcdFx0ZGF0YS15dG1kZXNjcmlwdGlvbj1cInRydWVcIlxuXHRcdFx0XHRcdD5Mb2FkIERlc2NyaXB0aW9uPC9hPlxuXHRcdFx0XHQ8L3NwYW4+YDtcblx0XHRcdHRoaXMuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRlbXBsYXRlKTtcblx0XHR9XG5cblx0XHRjcmVhdGVQcm9qZWN0b3IoKSB7XG5cdFx0XHR0aGlzLnByb2plY3RvciA9IF8uZSgnZGl2Jywge1xuXHRcdFx0XHRjbGFzc05hbWU6ICd5dG1fcHJvamVjdG9yIHl0bV9ub25lIHl0bV9ibG9jayB5dG1fbm9ybWFsaXplIHl0bV9zYW5zJyxcblx0XHRcdFx0aW5uZXJIVE1MOiBDb250YWluZXIudGVtcGxhdGVzLm1lbnVcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy50aHVtYm5haWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIHRoaXMucHJvamVjdG9yKTtcblx0XHR9XG5cblx0XHRzaG93UGxheWVyKCkge1xuXHRcdFx0dGhpcy50aHVtYm5haWwuY2xhc3NMaXN0LmFkZCgneXRtX25vbmUnKTtcblx0XHRcdHRoaXMucHJvamVjdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ3l0bV9ub25lJyk7XG5cdFx0fVxuXG5cdFx0aGlkZVBsYXllcigpIHtcblx0XHRcdHRoaXMudGh1bWJuYWlsLmNsYXNzTGlzdC5yZW1vdmUoJ3l0bV9ub25lJyk7XG5cdFx0XHR0aGlzLnByb2plY3Rvci5jbGFzc0xpc3QuYWRkKCd5dG1fbm9uZScpO1xuXHRcdH1cblxuXHR9XG5cblx0Q29udGFpbmVyLnRlbXBsYXRlcyA9IHtcblx0XHRtZW51OiBgXG5cdFx0XHQ8dWwgY2xhc3M9XCJ5dG1fb3B0aW9ucyB5dG1fc2Fuc1wiPlxuXHRcdFx0XHQ8bGk+XG5cdFx0XHRcdFx0PHVsIGNsYXNzPVwieXRtX3JhdGlvc1wiPlxuXHRcdFx0XHRcdFx0PGxpIGRhdGEtdHlwZT1cInJhdGlvXCIgZGF0YS12YWx1ZT1cIjFcIiB0aXRsZT1cIlNEXCI+NDozPC9saT5cblx0XHRcdFx0XHRcdDxsaSBkYXRhLXR5cGU9XCJyYXRpb1wiIGRhdGEtdmFsdWU9XCIyXCIgdGl0bGU9XCJMYW5kc2NhcGVcIj4xNjo5PC9saT5cblx0XHRcdFx0XHRcdDxsaSBkYXRhLXR5cGU9XCJyYXRpb1wiIGRhdGEtdmFsdWU9XCIzXCIgdGl0bGU9XCJQb3J0cmFpdFwiPjk6MTY8L2xpPlxuXHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdDwvbGk+XG5cdFx0XHRcdDxsaT5cblx0XHRcdFx0XHQ8dWwgY2xhc3M9XCJ5dG1fc2l6ZXNcIj5cblx0XHRcdFx0XHRcdDxsaSBkYXRhLXR5cGU9XCJzaXplXCIgZGF0YS12YWx1ZT1cIjBcIiB0aXRsZT1cIkhpZGUgdGhlIHZpZGVvLlwiPlxcdTAwRDg8L2xpPlxuXHRcdFx0XHRcdFx0PGxpIGRhdGEtdHlwZT1cInNpemVcIiBkYXRhLXZhbHVlPVwiMjQwXCIgdGl0bGU9XCIyNDBwXCI+UzwvbGk+XG5cdFx0XHRcdFx0XHQ8bGkgZGF0YS10eXBlPVwic2l6ZVwiIGRhdGEtdmFsdWU9XCIzNjBcIiB0aXRsZT1cIjM2MHBcIj5NPC9saT5cblx0XHRcdFx0XHRcdDxsaSBkYXRhLXR5cGU9XCJzaXplXCIgZGF0YS12YWx1ZT1cIjQ4MFwiIHRpdGxlPVwiNDgwcFwiPkw8L2xpPlxuXHRcdFx0XHRcdFx0PGxpIGRhdGEtdHlwZT1cInNpemVcIiBkYXRhLXZhbHVlPVwiNzIwXCIgdGl0bGU9XCI3MjBwXCI+WDwvbGk+XG5cdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0PC9saT5cblx0XHRcdFx0PGxpPlxuXHRcdFx0XHRcdDx1bCBjbGFzcz1cInl0bV9vcHRpb25zXCI+XG5cdFx0XHRcdFx0XHQke3N0cmcub24gPyAnPGxpIGRhdGEtdHlwZT1cInNldHRpbmdzXCIgZGF0YS12YWx1ZT1cIlwiIHRpdGxlPVwiWVRNQSBTZXR0aW5nc1wiPiE8L2xpPicgOiAnJ31cblx0XHRcdFx0XHRcdDxsaSBkYXRhLXR5cGU9XCJjbG9zZVwiIGRhdGEtdmFsdWU9XCJcIiB0aXRsZT1cIkNsb3NlIHRoZSB2aWRlby5cIj5cXHUwMEQ3PC9saT5cblx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHQ8L2xpPlxuXHRcdFx0PC91bD5gXG5cdH07XG5cblx0Q29udGFpbmVyLmRlY29yYXRvcnMgPSB7IC8vIG1vZGlmeSBpbnRlcmZhY2UgYWNjb3JkaW5nIHRvIHNpdGVcblx0XHR5b3V0dWJlOiB7XG5cdFx0XHRndWk6IGZ1bmN0aW9uIChjb250cm9sKSB7XG5cdFx0XHRcdGNvbnRyb2wuYW5jaG9yLmhyZWYgPSB0aGlzLmFuY2hvci5ocmVmLnJlcGxhY2UoJ3lvdXR1LmJlLycsICd5b3V0dWJlLmNvbS93YXRjaD92PScpO1xuXHRcdFx0fSxcblx0XHRcdHRodW1iRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGxldCB0aW1lID0gK3RoaXMuZGF0YXNldC50aW1lIHx8IDE7XG5cdFx0XHRcdGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygneXRtX3RyaWdnZXInKSAmJiBlLnR5cGUgPT09ICdtb3VzZWVudGVyJyAmJiB0aW1lIDwgNTApIHtcblx0XHRcdFx0XHR0aGlzLmRhdGFzZXQudGh1bWIgPSAoKHRoaXMuZGF0YXNldC50aHVtYiB8fCAwKSArIDEpICUgMztcblx0XHRcdFx0XHR0aGlzLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoaHR0cHM6Ly9pMy55dGltZy5jb20vdmkvJHt0aGlzLmRhdGFzZXQueXRtaWR9LyR7KCt0aGlzLmRhdGFzZXQudGh1bWIpICsgMX0uanBnKWA7XG5cdFx0XHRcdFx0d2luZG93LmNsZWFyVGltZW91dCh0aGlzLmRhdGFzZXQudGltZW91dCk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ21vdXNlZW50ZXIgLS0gY2xlYXIgYmVmb3JlIHNldHRpbmcgbmV3ICcsIHRoaXMuZGF0YXNldCk7XG5cdFx0XHRcdFx0dGhpcy5kYXRhc2V0LnRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChDb250YWluZXIuZGVjb3JhdG9ycy55b3V0dWJlLnRodW1iRXZlbnQuYmluZCh0aGlzLCBlKSwgODAwKTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnbW91c2VlbnRlciAtLSBuZXcgdGltZW91dCcsIHRoaXMuZGF0YXNldCk7XG5cdFx0XHRcdFx0dGhpcy5kYXRhc2V0LnRpbWUgPSB0aW1lICs9IDE7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0d2luZG93LmNsZWFyVGltZW91dCh0aGlzLmRhdGFzZXQudGltZW91dCk7XG5cdFx0XHRcdFx0dGhpcy5kYXRhc2V0LnRpbWUgPSAwO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdtb3VzZWxlYXZlIC0tICcsIHRoaXMuZGF0YXNldCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0Q29udGFpbmVyLmV2ZW50cyA9IHtcblx0XHRzZXR1cDogKCkgPT4ge1xuXHRcdFx0b24oZG9jdW1lbnQuYm9keSwgJ2NsaWNrJywgJ3ZhcltkYXRhLXl0bXVpZF0nLCBDb250YWluZXIuZXZlbnRzLmZyb21UYXJnZXQpO1xuXHRcdFx0b24oZG9jdW1lbnQuYm9keSwgJ2NsaWNrJywgJ2FbZGF0YS15dG1kZXNjcmlwdGlvbl0nLCBDb250YWluZXIuZXZlbnRzLm1hbnVhbExvYWQpO1xuXHRcdFx0b24oZG9jdW1lbnQuYm9keSwgJ2RibGNsaWNrJywgJ3FbZGF0YS1mdWxsXScsIENvbnRhaW5lci5ldmVudHMudGl0bGVUb2dnbGUpO1xuXG5cdFx0XHRvbihkb2N1bWVudC5ib2R5LCAnbW91c2VlbnRlciBtb3VzZWxlYXZlJywgJ2Rpdi55dG1fc2l0ZV95b3V0dWJlIHNwYW4ueXRtX3RyaWdnZXInLCBDb250YWluZXIuZGVjb3JhdG9ycy55b3V0dWJlLnRodW1iRXZlbnQpO1xuXHRcdH0sXG5cdFx0ZnJvbVRhcmdldDogKHsgdGFyZ2V0IH0pID0+IHsgLy8gdHJpZ2dlciB0aGUgdWlcblx0XHRcdGNvbnNvbGUuaW5mbygneXRtYS8vY2xpY2srdHJpZyhpZCknLCB0YXJnZXQuZGF0YXNldC55dG11aWQpO1xuXHRcdFx0Q29udHJvbC5jcmVhdGVGcm9tVHJpZ2dlcih0YXJnZXQpLnNob3dQbGF5ZXIoKTtcblx0XHR9LFxuXHRcdG1hbnVhbExvYWQ6IGUgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc3QgeyB0YXJnZXQgfSA9IGU7XG5cdFx0XHRjb25zb2xlLmluZm8oJ3l0bWEvL2NsaWNrK2Rlc2MoaWQpJywgdGFyZ2V0LmRhdGFzZXQueXRtaWQpO1xuXHRcdFx0aWYgKCh0YXJnZXQuZGF0YXNldC50cmllcyB8fCAwKSA8PSA0KSB7XG5cdFx0XHRcdFkuYWpheC5sb2FkRnJvbURhdGFzZXQodGFyZ2V0LmRhdGFzZXQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dGl0bGVUb2dnbGU6IGUgPT4ge1xuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgneXRtX2Rlc2NyX29wZW4nKTtcblx0XHRcdHRhcmdldC50ZXh0Q29udGVudCA9IHRhcmdldC50ZXh0Q29udGVudC5sZW5ndGggPCAxNDAgPyB0YXJnZXQuZGF0YXNldC5mdWxsIDogYCR7dGFyZ2V0LmRhdGFzZXQuZnVsbC5zdWJzdHIoMCwgMTMwKX0gLiAuIC5gO1xuXHRcdFx0dGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcblx0XHR9XG5cdH07XG5cblx0WS5udW0gPSAwO1xuXG5cdFkuYWRkVG9TZXQgPSB5dG1hID0+IFkuc2V0W3l0bWEuc3RhdGUudWlkXSA9IHl0bWE7XG5cblx0WS5jcmVhdGUgPSBsaW5rID0+IFkuZ3JhYklkQW5kU2l0ZShsaW5rLCAoZGF0YSwgZXJyKSA9PiB7XG5cdFx0aWYgKGVycikge1xuXHRcdFx0Y29uc29sZS53YXJuKGxpbmsuaHJlZiwgZXJyKTtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cblx0XHRjb25zdCBjb250cm9sID0gbmV3IENvbnRyb2woeyAuLi5kYXRhLCBhbmNob3I6IGxpbmsgfSk7XG5cdFx0WS5hZGRUb1NldChjb250cm9sKTtcblx0XHRjb250cm9sLmNyZWF0ZUludGVyZmFjZSgpO1xuXG5cdFx0cmV0dXJuIGNvbnRyb2w7XG5cdH0pO1xuXG5cdFkuZ3JhYklkQW5kU2l0ZSA9IChsaW5rLCBjYikgPT4ge1xuXHRcdGxldCB1cmkgPSBsaW5rLmhyZWYgfHwgbGluay5zcmM7XG5cdFx0bGV0IGlkO1xuXHRcdGxldCBtYXRjaDtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3Qgc2l0ZSA9IFkucmVnLnNpdGVCeVRlc3RbWS5yZWcuc2l0ZUV4cHJlc3Npb25zLnRlc3QodXJpKSA/IFJlZ0V4cC5sYXN0TWF0Y2ggOiAnJ107XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhzaXRlKTtcblxuXHRcdFx0aWYgKHNpdGUgPT09ICdodG1sNScpIHsgLy8gfHwgc2l0ZSA9PT0gJ2h0bWw1LWF1ZGlvJ1xuXHRcdFx0XHRpZCA9IHVyaS5zbGljZSgtMTUpO1xuXHRcdFx0fSBlbHNlIGlmIChzaXRlID09PSAnc291bmRjbG91ZCcpIHtcblx0XHRcdFx0aWYgKCFZLnJlZy5leHRyYS5zb3VuZGNsb3VkLnBsYXlsaXN0LnRlc3QodXJpKSkge1xuXHRcdFx0XHRcdGxpbmsuaHJlZiA9IHVyaSA9IFkucmVnLmZpeC5zb3VuZGNsb3VkKHVyaSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRtYXRjaCA9IFkuREIuc2l0ZXMuc291bmRjbG91ZC5tYXRjaGVyLmV4ZWModXJpKTtcblx0XHRcdFx0aWQgPSBZLmVzY2FwZUlkKG1hdGNoWzFdKTtcblxuXHRcdFx0XHRpZiAobWF0Y2ggJiYgWS5yZWcuZXh0cmEuc291bmRjbG91ZC50cmFja3MudGVzdCh1cmkpKSB7XG5cdFx0XHRcdFx0aWQgPSBpZC5zbGljZSgtNTApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZCA9IHVyaS5tYXRjaChZLkRCLnNpdGVzW3NpdGVdLm1hdGNoZXIpWzFdO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zb2xlLmluZm8oJ3l0bWEvL2lkK3NpdGUnLCBpZCwgc2l0ZSwgbWF0Y2gpO1xuXHRcdFx0aWYgKGlkICYmIFkuREIuc2l0ZXNbc2l0ZV0pIHtcblx0XHRcdFx0cmV0dXJuIGNiKHsgaWQsIHNpdGUgfSwgbnVsbCk7XG5cdFx0XHR9XG5cdFx0XHR0aHJvdyBUeXBlRXJyb3IoYEludmFsaWQgSUQvU2l0ZTogJHtpZH0gQCAke3NpdGV9YCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGNiKG51bGwsIGUpO1xuXHRcdH1cblx0fTtcblxuXHRZLmVzY2FwZUlkID0gaWQgPT4gYCR7aWR9YC5yZXBsYWNlKC8oPzpcXFcpL2csICdfJyk7XG5cblx0WS5zZXQgPSB7fTtcblxuXHRZLmNvbGxlY3QgPSBpZCA9PiB7XG5cdFx0Y29uc3QgYSA9IE9iamVjdC52YWx1ZXMoWS5zZXQpLmZpbHRlcih5dG1hID0+IHl0bWEgJiYgeXRtYS5kYXRhLmlkID09PSBpZCk7XG5cdFx0cmV0dXJuIGE7XG5cdH07XG5cblx0WS5yb3V0ZSA9IHtcblx0XHRob3N0OiBkb2N1bWVudC5sb2NhdGlvbi5ob3N0LnJlcGxhY2UoJ3d3dy4nLCAnJyksXG5cdFx0Y29udHJvbDoge1xuXHRcdFx0JDoge1xuXHRcdFx0XHRjaGVja1N0b3JhZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoc3RyZy5mdWxsKCkgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdZVE1BIEVSUk9SOiBTdG9yYWdlIGlzIGZ1bGwhJyk7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShZLmV4dGVybmFsLnZlcnNpb24pO1xuXHRcdFx0XHRcdFx0XHRzdHJnLm9uID0gc3RyZy50ZXN0KCk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRydW5PbmNlOiBmdW5jdGlvbiAobG9vcCkge1xuXHRcdFx0XHRcdGlmICghZG9jdW1lbnQuYm9keS5kYXRhc2V0Lnl0bWFlbmFibGVkKSB7XG5cdFx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LmRhdGFzZXQueXRtYWVuYWJsZWQgPSB0cnVlO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmNoZWNrU3RvcmFnZSgpO1xuXG5cdFx0XHRcdFx0XHRpZiAoIVkuREIuZXh0ZW5zaW9uKSB7IHVwZGF0ZS5jaGVjaygpOyB9XG5cblx0XHRcdFx0XHRcdFkuY3NzKCk7XG5cdFx0XHRcdFx0XHRZLnVzZXIuaW5pdCgpO1xuXHRcdFx0XHRcdFx0WS5EQi5wb3N0SW5pdCgpO1xuXG5cdFx0XHRcdFx0XHRpZiAobG9vcCkge1xuXHRcdFx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LmRhdGFzZXQuWVRNQV9MT09QID0gd2luZG93LnNldEludGVydmFsKGxvb3AsIDUwMDApO1xuXHRcdFx0XHRcdFx0XHRsb29wKCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdENvbnRhaW5lci5ldmVudHMuc2V0dXAoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRnbzogZnVuY3Rpb24gKGhvc3QpIHtcblx0XHRcdFx0Y29uc29sZS5pbmZvKCd5dG1hLy9ob3N0JywgaG9zdCk7XG5cdFx0XHRcdGlmICgvKD86Z29vZ2xldmlkZW98eW91dHViZS1ub2Nvb2tpZVxcLmNvbXx5b3V0dWJlXFwuY29tXFwuPykvaS50ZXN0KGhvc3QpKSB7XG5cdFx0XHRcdFx0dGhpcy5zaXRlcy55b3V0dWJlKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5zaXRlc1tob3N0XSkge1xuXHRcdFx0XHRcdHRoaXMuc2l0ZXNbaG9zdF0oKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnNpdGVzLiRnZW5lcmljKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzaXRlczoge1xuXHRcdFx0XHQkZ2VuZXJpYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGZ1bmN0aW9uIGxvb3AoKSB7XG5cdFx0XHRcdFx0XHRpZiAoWS5zZWxlY3Rvci5wcm9jZXNzb3IoKSA+IDApIHtcblx0XHRcdFx0XHRcdFx0WS51c2VyLmZuLmxvYWRQcmVmZXJlbmNlcygpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjb25zb2xlLmluZm8oJ3l0bWEvL2FnYWluKysnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRZLnJvdXRlLmNvbnRyb2wuJC5ydW5PbmNlKGxvb3ApO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQncmVzZXRlcmEuY29tJzogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdF8uY3NzKCcueXRtX29wdGlvbnMgbGkgdWwgbGkgeyBoZWlnaHQ6IDI0cHggIWltcG9ydGFudCB9Jyk7XG5cdFx0XHRcdFx0Xy5jc3MoJy5iYkNvZGVRdW90ZSAucXVvdGVDb250YWluZXIgLnF1b3RlIHsgbWF4LWhlaWdodDogaW5pdGlhbCB9IC5iYkNvZGVRdW90ZSAucXVvdGVDb250YWluZXIgLnF1b3RlRXhwYW5kLnF1b3RlQ3V0IHsgZGlzcGxheTogbm9uZSB9Jyk7XG5cdFx0XHRcdFx0Xy5jc3MoJy5iYkNvZGVRdW90ZSAueXRtX2Jsb2NrIGlmcmFtZSwgLmJiQ29kZVF1b3RlIC55dG1fYmxvY2sgW2RhdGEtczllLW1lZGlhZW1iZWRdLCAuYmJDb2RlUXVvdGUgLnl0bV9ibG9jayAuZmJfaWZyYW1lX3dpZGdldCwgLmJiQ29kZVF1b3RlIC55dG1fYmxvY2sgb2JqZWN0LCAuYmJDb2RlUXVvdGUgLnl0bV9ibG9jayBlbWJlZCB7IG1heC1oZWlnaHQ6IGluaXRpYWw7IG1heC13aWR0aDogaW5pdGlhbCB9Jyk7XG5cdFx0XHRcdFx0dGhpcy4kZ2VuZXJpYygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQnZ2Z5Y2F0LmNvbSc6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRjb25zdCB2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcblx0XHRcdFx0XHR2LmNvbnRyb2xzID0gdHJ1ZTtcblx0XHRcdFx0XHRfLmNzcygnYm9keSxodG1sIHtvdmVyZmxvdzpoaWRkZW47aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0gdmlkZW8ge2Rpc3BsYXk6dGFibGU7aGVpZ2h0OjEwMCU7bWFyZ2luOjAgYXV0bzt9Jyk7XG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0J3ZpbmUuY28nOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ3ZpbmUuY28nKTtcblxuXHRcdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRfLnMoJ1tzdHlsZV0nLCBlID0+IHtcblx0XHRcdFx0XHRcdFx0ZS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0eW91dHViZTogZnVuY3Rpb24gKCkgeyAvLyBsZXRzIGZvcmNlIHNvbWUgcXVhbGl0eSBwYXJpdHlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bG9hZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5jb250cm9sLmdvKHRoaXMuaG9zdCk7XG5cdFx0fVxuXHR9O1xuXG5cdFkubWFpbiA9ICgpID0+IHtcblx0XHRZLnJlZy5zaXRlRXhwcmVzc2lvbnMgPSBZLnJlZy5nZXRBbGxTaXRlUmVnRXhwcygpO1xuXHRcdC8vIGNvbnNvbGUubG9nKFlUTUEucmVnLnNpdGVFeHByZXNzaW9ucyk7XG5cdFx0WS5yb3V0ZS5sb2FkKCk7XG5cdH07XG5cblx0WS5yZWcgPSB7XG5cdFx0c2l0ZUV4cHJlc3Npb25zOiBudWxsLFxuXHRcdHRpbWU6IC8oPzp0PSg/OihcXGQrKWgpPyg/OihcXGQrKW0pPyhcXGQrKSkvLFxuXHRcdGlvczogLyg/OlxcYig/Omlwb2R8aXBob25lfGlwYWQpKVxcYi9pLFxuXHRcdGV4dHJhOiB7XG5cdFx0XHRzb3VuZGNsb3VkOiB7XG5cdFx0XHRcdHBsYXlsaXN0OiAvKD86c291bmRjbG91ZFxcLmNvbVxcLy4rXFwvc2V0c1xcLykvLFxuXHRcdFx0XHR0cmFja3M6IC8oPzpzb3VuZGNsb3VkXFwuY29tXFwvLitcXC90cmFja3NcXC8pL1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0c2l0ZUJ5VGVzdDoge1xuXHRcdFx0eW91dHU6ICd5b3V0dWJlJyxcblx0XHRcdHZpbWVvOiAndmltZW8nLFxuXHRcdFx0dmluZTogJ3ZpbmUnLFxuXHRcdFx0Z2Z5Y2F0OiAnZ2Z5Y2F0Jyxcblx0XHRcdGltZ3VyOiAnaW1ndXInLFxuXHRcdFx0Jy53ZWJtJzogJ2h0bWw1Jyxcblx0XHRcdCcubXA0JzogJ2h0bWw1Jyxcblx0XHRcdC8vICcubXAzJzogJ2h0bWw1LWF1ZGlvJyxcblx0XHRcdCcuZ2lmdic6ICdodG1sNScsXG5cdFx0XHRzb3VuZGNsb3VkOiAnc291bmRjbG91ZCcsXG5cdFx0XHQnc3RyZWFtYWJsZS5jb20nOiAnc3RyZWFtYWJsZSdcblx0XHR9LFxuXHRcdGdldEFsbFNpdGVSZWdFeHBzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCByZWdzID0gT2JqZWN0LnZhbHVlcyhZLkRCLnNpdGVzKVxuXHRcdFx0XHQuZmlsdGVyKCh7IHJlZyB9KSA9PiByZWcpXG5cdFx0XHRcdC5tYXAoKHsgcmVnIH0pID0+IHJlZyk7XG5cblx0XHRcdHJldHVybiBuZXcgUmVnRXhwKGBcXFxcYiR7cmVncy5qb2luKCd8Jyl9YCk7XG5cdFx0fSxcblx0XHRmaXg6IHtcblx0XHRcdHNvdW5kY2xvdWQ6IGZ1bmN0aW9uICh1cmkpIHtcblx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBZLkRCLnNpdGVzLnNvdW5kY2xvdWQubWF0Y2hlci5leGVjKHVyaSk7XG5cdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdGNvbnN0IGlkID0gbWF0Y2hbMV0uc3BsaXQoJy8nLCAyKS5qb2luKCcvJyk7XG5cdFx0XHRcdFx0dXJpID0gcmVtb3ZlU2VhcmNoKGBodHRwczovL3NvdW5kY2xvdWQuY29tLyR7aWR9YCwgdHJ1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdXJpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRZLnNlbGVjdG9yID0geyAvLyB0byBidWlsZCB0aGUgc2VsZWN0b3Jcblx0XHRwYXJlbnRCbGFja2xpc3Q6IFsnLnNtYWxsZm9udCcsICcuY29saGVhZF9kYXJrJywgJy5zcG9pbGVyJywgJ3ByZScsICcubWVzc2FnZVVzZXJJbmZvJywgJy5mci1ib3gnXSxcblx0XHRnZXRBbGxTaXRlU2VsZWN0b3JzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCBzZWxzID0gT2JqZWN0LnZhbHVlcyhZLkRCLnNpdGVzKVxuXHRcdFx0XHQuZmlsdGVyKCh7IHNlbGVjdG9yIH0pID0+IHNlbGVjdG9yKVxuXHRcdFx0XHQubWFwKCh7IHNlbGVjdG9yIH0pID0+IHNlbGVjdG9yKTtcblxuXHRcdFx0cmV0dXJuIHNlbHMuam9pbigpO1xuXHRcdH0sXG5cdFx0aWdub3JlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCBpZ25vcmUgPSBbXTtcblx0XHRcdGNvbnN0IGFsbCA9IFkuc2VsZWN0b3IuZ2V0QWxsU2l0ZVNlbGVjdG9ycygpLnNwbGl0KCcsJyk7XG5cdFx0XHRjb25zdCBibGFja2xpc3QgPSB0aGlzLnBhcmVudEJsYWNrbGlzdDtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYmxhY2tsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgYWxsLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0aWdub3JlLnB1c2goYCR7YmxhY2tsaXN0W2ldfSAke2FsbFtqXX1gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gY29uc29sZS5sb2coaWdub3JlLmpvaW4oJywnKSk7XG5cdFx0XHRyZXR1cm4gaWdub3JlLmpvaW4oJywnKTtcblx0XHR9LFxuXHRcdGlmcmFtZXM6IGZ1bmN0aW9uICgpIHsgLy8gZm9yIHJlc2V0ZXJhLCBjb252ZXJ0IGlmcmFtZXMgYmFjayB0byBhbmNob3JzXG5cdFx0XHRfLnMoJy5tZXNzYWdlLWJvZHkgaWZyYW1lJywgZiA9PiB7XG5cdFx0XHRcdGlmICgvdmlcXC8oLis/KVxcL2hxZGVmYXVsdC8udGVzdChmLnN0eWxlLmJhY2tncm91bmRJbWFnZSkpIHtcblx0XHRcdFx0XHRjb25zdCBzcmMgPSBgaHR0cHM6Ly95b3V0dS5iZS8ke1JlZ0V4cC4kMX1gO1xuXHRcdFx0XHRcdGNvbnN0IHNwYW4gPSBmLmNsb3Nlc3QoJ1tkYXRhLXM5ZS1tZWRpYWVtYmVkXScpO1xuXHRcdFx0XHRcdHNwYW4uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIGA8YSBocmVmPVwiJHtzcmN9XCI+eW91dHViZTwvYT5gKTtcblx0XHRcdFx0XHRzcGFuLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoc3Bhbik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRfLnMoJ1tkYXRhLXM5ZS1tZWRpYWVtYmVkLWlmcmFtZV0nLCBzID0+IHtcblx0XHRcdFx0Y29uc3QgZGF0ID0gSlNPTi5wYXJzZShzLmRhdGFzZXQuczllTWVkaWFlbWJlZElmcmFtZSk7XG5cdFx0XHRcdHMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlubmVySFRNTCA9IGA8YSBocmVmPVwiJHtkYXRbZGF0Lmxlbmd0aCAtIDFdfVwiPnlvdXR1YmU8L2E+YDtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bGlua3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdF8ucyhZLnNlbGVjdG9yLmlnbm9yZSgpLCAoeyBkYXRhc2V0IH0pID0+IGRhdGFzZXQueXRtYWlnbm9yZSA9IHRydWUpO1xuXG5cdFx0XHRjb25zdCBsaW5rcyA9IF8ucXNhKFkuc2VsZWN0b3IuZ2V0QWxsU2l0ZVNlbGVjdG9ycygpKS5maWx0ZXIoKHsgZGF0YXNldCB9KSA9PiB7XG5cdFx0XHRcdGNvbnN0IHIgPSAhZGF0YXNldC55dG1hcHJvY2Vzc2VkICYmICFkYXRhc2V0Lnl0bWFpZ25vcmU7XG5cdFx0XHRcdGRhdGFzZXQueXRtYXByb2Nlc3NlZCA9IHRydWU7XG5cdFx0XHRcdHJldHVybiByO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBsaW5rcztcblx0XHR9LFxuXHRcdHByb2Nlc3NvcjogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pZnJhbWVzKCk7XG5cdFx0XHRjb25zdCBsaW5rcyA9IHRoaXMubGlua3MoKTtcblxuXHRcdFx0aWYgKGxpbmtzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0bGlua3MuZm9yRWFjaChZLmNyZWF0ZSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBsaW5rcy5sZW5ndGg7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBVc2VyIFByZWZlcmVuY2VzXG5cdCAqIHNpemU6IFNtYWxsICgyNDBwKSwgTWVkaXVtICgzNjBwKSwgTGFyZ2UgKDQ4MHApLCBYTCAoNzIwcClcblx0ICogcmF0aW86IDEgNDozLCAyIDE2Ojlcblx0ICogcXVhbGl0eTogMjQwLCAzNjAsIDQ4MCwgNzIwLCAxMDgwXG5cdCAqIGZvY3VzOiAwLzE7IFdpbGwgYXR0ZW1wdCB0byBzZXQgdGhlIHdpbmRvdydzIGZvY3VzIG5lYXIgdGhlIHZpZGVvXG5cdCAqIGF1dG9TaG93OiAwLzE7IFdpbGwgYXV0b21hdGljYWxseSBkaXNwbGF5IEhUTUw1IHZpZGVvcywgd2hpY2ggY3VycmVudGx5IGxhY2sgZGVzY3JpcHRpb25zIGFuZCB0aHVtYm5haWxzXG5cdCAqIGRlc2M6IChEZXNjcmlwdGlvbnMpIDAgTm9uZTsgMSBZZXMgb24gc2Nyb2xsOyAyIFllcyBhbGwgYXQgb25jZVxuXHQgKiB5dF9ub2Nvb2tpZTogMC8xOyBXaWxsIGRpc2FibGUvZW5hYmxlIHlvdXR1YmUtbm9jb29raWUuY29tXG5cdCAqIHl0X2Fubm90YXRpb246IDAvMTsgeW91dHViZSBhbm5vdGF0aW9uc1xuXHQgKi9cblx0WS51c2VyID0ge1xuXHRcdEtFWTogJ3l0bWFzZXR0cycsXG5cdFx0JGZvcm06IG51bGwsXG5cdFx0aW5pdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5sb2FkKCk7XG5cblx0XHRcdGlmIChzdHJnLm9uKSB7XG5cdFx0XHRcdHRoaXMuZm4ubWFrZUZvcm0oKTtcblx0XHRcdFx0dGhpcy5tYXJrKCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR2YWxpZDoge1xuXHRcdFx0Zm9jdXM6IFswLCAxXSxcblx0XHRcdGRlc2M6IFswLCAxLCAyXSxcblx0XHRcdHJhdGlvOiBbMSwgMl0sXG5cdFx0XHRzaXplOiBbMjQwLCAzNjAsIDQ4MCwgNzIwXSxcblx0XHRcdHF1YWxpdHk6IFsyNDAsIDM2MCwgNDgwLCA3MjAsIDEwODBdLFxuXHRcdFx0YXV0b1Nob3c6IFswLCAxXSxcblx0XHRcdHl0X25vY29va2llOiBbMCwgMV0sXG5cdFx0XHR5dF9hbm5vdGF0aW9uOiBbMCwgMV0gLy8gaGlkZSB8IHNob3dcblx0XHR9LFxuXHRcdG1hcHBpbmc6IHsgLy8gbWFwIHZhbHVlcyB0byBzb21lIG90aGVyIHZhbHVlcyB1c2VkIGJ5IGFuIGV4dGVybmFsIEFQSSwgZm9yIGV4YW1wbGVcblx0XHRcdHl0X2Fubm90YXRpb246IFszLCAxXSAvLyAzID0gaGlkZSB8IDEgPSBzaG93XG5cdFx0fSxcblx0XHR2YWxpZGF0ZTogZnVuY3Rpb24gKHByb3BlcnR5LCBuKSB7XG5cdFx0XHRuID0gK247XG5cdFx0XHRyZXR1cm4gWS51c2VyLnZhbGlkW3Byb3BlcnR5XS5pbmNsdWRlcyhuKSA/IG4gOiBZLnVzZXIuZGVmYXVsdHNbcHJvcGVydHldO1xuXHRcdH0sXG5cdFx0Z2V0IGRlZmF1bHRzKCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Zm9jdXM6IDAsXG5cdFx0XHRcdGRlc2M6IDEsXG5cdFx0XHRcdHJhdGlvOiAyLFxuXHRcdFx0XHRzaXplOiAzNjAsXG5cdFx0XHRcdHF1YWxpdHk6IDcyMCxcblx0XHRcdFx0YXV0b1Nob3c6IDEsXG5cdFx0XHRcdHl0X25vY29va2llOiAwLFxuXHRcdFx0XHR5dF9hbm5vdGF0aW9uOiAxXG5cdFx0XHR9O1xuXHRcdH0sXG5cdFx0bG9hZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3QgcyA9IHN0cmcuZ3JhYihZLnVzZXIuS0VZLCB7fSk7XG5cblx0XHRcdFkudXNlci5wcmVmZXJlbmNlcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVmYXVsdHMpLnJlZHVjZSgodmFsaWQsIGspID0+IHtcblx0XHRcdFx0dmFsaWRba10gPSBZLnVzZXIudmFsaWRhdGUoaywgc1trXSk7XG5cdFx0XHRcdHJldHVybiB2YWxpZDtcblx0XHRcdH0sIHt9KTtcblxuXHRcdFx0Xy5vKFkudXNlci5tYXBwaW5nLCAoa2V5LCB2YWwpID0+IHtcblx0XHRcdFx0aWYgKCF2YWwuaGFzT3duUHJvcGVydHkoJ2luZGV4T2YnKSkge1xuXHRcdFx0XHRcdFkudXNlci5wcmVmZXJlbmNlc1trZXldID0gdmFsW1kudXNlci52YWxpZFtrZXldLmluZGV4T2YoWS51c2VyLnByZWZlcmVuY2VzW2tleV0pXTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnNvbGUuaW5mbygneXRtYS8vdXNlcitsb2FkZWQocHJlZnMpJywgWS51c2VyLnByZWZlcmVuY2VzKTtcblx0XHR9LFxuXHRcdG1hcms6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnN0IGEgPSB7fTtcblx0XHRcdGEueXRtYV9fZm9jdXMgPSAhIVkudXNlci5wcmVmZXJlbmNlcy5mb2N1cztcblx0XHRcdGEueXRtYV9fYXV0b1Nob3cgPSAhIVkudXNlci5wcmVmZXJlbmNlcy5hdXRvU2hvdztcblx0XHRcdGEueXRtYV9feXRfbm9jb29raWUgPSAhIVkudXNlci5wcmVmZXJlbmNlcy55dF9ub2Nvb2tpZTtcblx0XHRcdGEueXRtYV9feXRfYW5ub3RhdGlvbiA9ICEhWS51c2VyLnByZWZlcmVuY2VzLnl0X2Fubm90YXRpb247XG5cdFx0XHRhW2B5dG1hX19yYXRpbyR7WS51c2VyLnByZWZlcmVuY2VzLnJhdGlvfWBdID0gdHJ1ZTtcblx0XHRcdGFbYHl0bWFfX3NpemUke1kudXNlci5wcmVmZXJlbmNlcy5zaXplfWBdID0gdHJ1ZTtcblx0XHRcdGFbYHl0bWFfX2Rlc2Mke1kudXNlci5wcmVmZXJlbmNlcy5kZXNjfWBdID0gdHJ1ZTtcblx0XHRcdGFbYHl0bWFfX3F1YWxpdHkke1kudXNlci5wcmVmZXJlbmNlcy5xdWFsaXR5fWBdID0gISFZLnVzZXIucHJlZmVyZW5jZXMucXVhbGl0eTtcblxuXHRcdFx0Ly8gY29uc29sZS5sb2coJ21hcmtpbmcnLCBhKTtcblx0XHRcdF8ubyhhLCAoaWQsIHZhbCkgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXHRcdFx0XHRcdGVsLmNoZWNrZWQgPSB2YWw7XG5cdFx0XHRcdFx0ZWwudmFsdWUgPSB2YWw7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhpZCwgZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0ZXZlbnRzOiB7XG5cdFx0XHRzYXZlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKFlUTUEudXNlci4kZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1rZXldJykpO1xuXHRcdFx0XHQvLyBbZGF0YS1rZXldOmNoZWNrZWRcblx0XHRcdFx0Y29uc3Qgc2V0dGluZ3MgPSBBcnJheS5mcm9tKFkudXNlci4kZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1rZXldJykpLnJlZHVjZSgob2JqLCBlKSA9PiB7XG5cdFx0XHRcdFx0bGV0IGtleSA9IGUuZGF0YXNldC5rZXk7XG5cblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnY2hlY2tib3gnKSB7XG5cdFx0XHRcdFx0XHRvYmpba2V5XSA9ICtlLmNoZWNrZWQ7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChlLnR5cGUgPT09ICdyYWRpbycpIHtcblx0XHRcdFx0XHRcdGlmIChlLmNoZWNrZWQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGUuZGF0YXNldC5udW0pIHtcblx0XHRcdFx0XHRcdFx0XHRvYmpba2V5XSA9ICtlLmRhdGFzZXQubnVtO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG9ialtrZXldID0gK2UudmFsdWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIG9iajtcblx0XHRcdFx0fSwge30pO1xuXG5cdFx0XHRcdGlmIChzdHJnLnNhdmUoWS51c2VyLktFWSwgc2V0dGluZ3MpKSB7XG5cdFx0XHRcdFx0WS51c2VyLmxvYWQoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRZLnVzZXIuZXJyb3IuY2xhc3NMaXN0LnJlbW92ZSgneXRtX25vbmUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LFxuXHRcdFx0cmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0WS51c2VyLnByZWZlcmVuY2VzID0gWS51c2VyLmRlZmF1bHRzO1xuXHRcdFx0XHRZLnVzZXIubWFyaygpO1xuXHRcdFx0XHRzdHJnLndpcGUoWS51c2VyLktFWSk7XG5cdFx0XHRcdFkudXNlci5lcnJvci5jbGFzc0xpc3QuYWRkKCd5dG1fbm9uZScpO1xuXHRcdFx0fSxcblx0XHRcdGNsZWFyOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oWS5leHRlcm5hbC52ZXJzaW9uKTtcblx0XHRcdFx0XHRZLnVzZXIuZXZlbnRzLnJlc2V0KCk7XG5cdFx0XHRcdFx0Y29uc29sZS5pbmZvKCd5dG1hLy9jYWNoZStyZW1vdmUnLCAncmVtb3ZlZCBhbGwgWVRNQSBjYWNoZScpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGZvcm1Ub2dnbGU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmIChZLnVzZXIuJGZvcm0gJiYgKCFlIHx8IChlICYmIGUudGFyZ2V0ICYmICEoLyg/OklOUFVUfExBQkVMKS9pKS50ZXN0KGUudGFyZ2V0Lm5vZGVOYW1lKSkpKSB7XG5cdFx0XHRcdFx0WS51c2VyLiRmb3JtLmNsYXNzTGlzdC50b2dnbGUoJ3l0bV9ub25lJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRmb3JtVG9nZ2xlS2V5Ym9hcmQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIHByZXNzIENUUkwrU0hJRlQrWSAoTUVUQStTSElGVCtZKSB0byBkaXNwbGF5IHNldHRpbmdzIGZvcm1cblx0XHRcdFx0aWYgKChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSAmJiBlLnNoaWZ0S2V5ICYmIFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCkudG9Mb3dlckNhc2UoKSA9PT0gJ3knKSB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFkudXNlci5ldmVudHMuZm9ybVRvZ2dsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRmbjoge1xuXHRcdFx0JHNjcm9sbGVyOiBudWxsLFxuXHRcdFx0JG9uY2U6IGZhbHNlLFxuXHRcdFx0bG9hZFByZWZlcmVuY2VzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFkudXNlci5mbi5vblNjcm9sbExvYWREZXNjcmlwdGlvbnMoWS51c2VyLnByZWZlcmVuY2VzLmRlc2MgPT09IDEpO1xuXG5cdFx0XHRcdHRoaXMubG9hZFByZWZlcmVuY2VzT25jZSgpO1xuXHRcdFx0fSxcblx0XHRcdGxvYWRQcmVmZXJlbmNlc09uY2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHRoaXMuJG9uY2UpIHsgcmV0dXJuOyB9XG5cblx0XHRcdFx0dGhpcy4kb25jZSA9IHRydWU7XG5cblx0XHRcdFx0aWYgKFkudXNlci5wcmVmZXJlbmNlcy5hdXRvU2hvdyA9PT0gMSkge1xuXHRcdFx0XHRcdFkudXNlci5mbi5vblNjcm9sbFZpZXdNZWRpYSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c2hvd01lZGlhOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIGNvbnNvbGUuaW5mbygneXRtYS8vdXNlcitmbi1zaG93TWVkaWEnKTtcblx0XHRcdFx0cmV0dXJuIG5ldyBTY3JvbGwoJ2EueXRtX3Njcm9sbDpub3QoW2RhdGEteXRtc2Nyb2xsPVwiZmFsc2VcIl0pJywgbGluayA9PiB7XG5cdFx0XHRcdFx0aWYgKFNjcm9sbC52aXNpYmxlQWxsKGxpbmssIDUwKSkge1xuXHRcdFx0XHRcdFx0Xy5zKGB2YXJbZGF0YS15dG1zaWQ9XCIke2xpbmsuZGF0YXNldC55dG1zaWR9XCJdOm5vdChbZGF0YS15dG1zY3JvbGw9XCJmYWxzZVwiXSlgLCB0cmlnZ2VyID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdWkgPSBDb250cm9sLmNyZWF0ZUZyb21UcmlnZ2VyKHRyaWdnZXIpO1xuXHRcdFx0XHRcdFx0XHR1aS5zaG93T25TY3JvbGwobGluayk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdHRvZ2dsZU1lZGlhOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgU2Nyb2xsKCdkaXYueXRtX3BhbmVsX3N3aXRjaGVyJywgZGl2ID0+IHtcblx0XHRcdFx0XHRjb25zdCB2ID0gZGl2LnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG5cdFx0XHRcdFx0Y29uc3QgcGF1c2VkID0gdiAmJiAodi5wYXVzZWQgfHwgdi5lbmRlZCk7XG5cdFx0XHRcdFx0Y29uc3QgdWkgPSBZLnNldFtkaXYuZGF0YXNldC55dG11aWRdLmdldENvbnRyb2woKTtcblxuXHRcdFx0XHRcdGlmIChwYXVzZWQgJiYgIVNjcm9sbC52aXNpYmxlQWxsKGRpdiwgMCkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB1aS5wbGF5LnN3aXRjaFN0YW5kYnkoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodWkucGxheS5pc1N0YW5kYnkoKSAmJiBTY3JvbGwudmlzaWJsZUFsbChkaXYsIDIwMCkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB1aS5wbGF5LnN3aXRjaE9uKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gdG9kbyBhc2NlcnRhaW4gZW1iZWRkZWQgcGxheWVyIHByb3BlcnRpZXNcblx0XHRcdFx0XHQvLyBmID0gZGl2LnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZSwgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0Ly8gaWYgKGYgJiYgIVlUTUEuU2Nyb2xsLnZpc2libGVBbGwoZGl2LCAyMDApKSB7XG5cdFx0XHRcdFx0Ly8gXHR5LmhpZGVQbGF5ZXIoKTtcblx0XHRcdFx0XHQvLyB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdG9uU2Nyb2xsVmlld01lZGlhOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRoaXMuc2hvd01lZGlhKCk7XG5cdFx0XHRcdHRoaXMudG9nZ2xlTWVkaWEoKTtcblx0XHRcdH0sXG5cdFx0XHRvblNjcm9sbExvYWREZXNjcmlwdGlvbnM6IGZ1bmN0aW9uIChhamF4KSB7XG5cdFx0XHRcdGlmIChZLnVzZXIuZm4uJHNjcm9sbGVyKSB7IFkudXNlci5mbi4kc2Nyb2xsZXIuc3RvcCgpOyB9XG5cblx0XHRcdFx0WS51c2VyLmZuLiRzY3JvbGxlciA9IG5ldyBTY3JvbGwoJ3NwYW4ueXRtX21hbnVhbCA+IGEueXRtX3RpdGxlOm5vdCgueXRtX2Vycm9yKScsIGEgPT4ge1xuXHRcdFx0XHRcdGlmIChTY3JvbGwudmlzaWJsZUFsbChhLCAyMDApKSB7XG5cdFx0XHRcdFx0XHRpZiAoYWpheCkge1xuXHRcdFx0XHRcdFx0XHRZLmFqYXgubG9hZEZyb21EYXRhc2V0KGEuZGF0YXNldCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRZLmFqYXgubG9hZEZyb21DYWNoZURhdGFzZXQoYS5kYXRhc2V0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdkb2MnLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFlUTUEudXNlci5mbi4kc2Nyb2xsZXIuc2VsZWN0b3IpLmxlbmd0aCwgYS5kYXRhc2V0LmlkKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChZLnVzZXIuZm4uJHNjcm9sbGVyLnNlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFkudXNlci5mbi4kc2Nyb2xsZXIuc3RvcCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0bWFrZUZvcm06IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y29uc3QgdGVtcGxhdGUgPSBgXG5cdFx0XHRcdFx0PGRpdiBpZD1cInl0bV9zZXR0aW5nc1wiIGNsYXNzPVwieXRtX3NhbnMgeXRtX2Jsb2NrIHl0bV9ub3JtYWxpemVcIj5cblx0XHRcdFx0XHRcdDxmb3JtIGFjdGlvbj1cIlwiIHRpdGxlPVwiRG91YmxlIGNsaWNrIHRvIGNsb3NlXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgaWQ9XCJ5dG1fc2V0dGluZ3N0XCI+eXRtYSEgU2l0ZSBTZXR0aW5nczwvZGl2PjxkaXYgY2xhc3M9XCJ5dG1fZmllbGRfY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGZpZWxkc2V0PjxsZWdlbmQgdGl0bGU9XCJMb2FkIGRlc2NyaXB0aW9ucyBmcm9tIHRoZSBjb250ZW50IHNldmVyLlwiPkxvYWQgRGVzY3JpcHRpb25zPC9sZWdlbmQ+PHA+PHNwYW4+PGlucHV0IGlkPVwieXRtYV9fZGVzYzBcIiB0eXBlPVwicmFkaW9cIiBkYXRhLW51bT1cIjBcIiBuYW1lPVwieXRtYV9fZGVzY1wiIGRhdGEta2V5PVwiZGVzY1wiPjxsYWJlbCBmb3I9XCJ5dG1hX19kZXNjMFwiIHRpdGxlPVwiTG9hZCBkZXNjcmlwdGlvbnMgb24gZGVtYW5kXCI+TWFudWFsbHk8L2xhYmVsPjwvc3Bhbj48c3Bhbj48aW5wdXQgaWQ9XCJ5dG1hX19kZXNjMVwiIHR5cGU9XCJyYWRpb1wiIGRhdGEtbnVtPVwiMVwiIG5hbWU9XCJ5dG1hX19kZXNjXCIgZGF0YS1rZXk9XCJkZXNjXCI+PGxhYmVsIGZvcj1cInl0bWFfX2Rlc2MxXCIgdGl0bGU9XCJMb2FkIGRlc2NyaXB0aW9ucyBhcyB0aGV5IGJlY29tZSB2aXNpYmxlIG9uIHRoZSBzY3JlZW4uXCI+QXV0b21hdGljYWxseSwgb24gc2Nyb2xsaW5nPC9sYWJlbD48L3NwYW4+PC9wPjwvZmllbGRzZXQ+XG5cdFx0XHRcdFx0XHRcdFx0PGZpZWxkc2V0PjxsZWdlbmQ+SFRNTDUgUGxheWVyczwvbGVnZW5kPjxwPjxpbnB1dCBuYW1lPVwieXRtYV9fYXV0b1Nob3dcIiBkYXRhLWtleT1cImF1dG9TaG93XCIgaWQ9XCJ5dG1hX19hdXRvU2hvd1wiIHR5cGU9XCJjaGVja2JveFwiPjxsYWJlbCBmb3I9XCJ5dG1hX19hdXRvU2hvd1wiPkF1dG9tYXRpY2FsbHkgc2hvdyBXZWJNLCBNUDQgYW5kIFNvdW5kY2xvdWQgcGxheWVyczwvbGFiZWw+PC9wPjwvZmllbGRzZXQ+XG5cdFx0XHRcdFx0XHRcdFx0PGZpZWxkc2V0PjxsZWdlbmQ+UGxheWVyIFNpemU8L2xlZ2VuZD48cD48c3Bhbj48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cInl0bWFfX3NpemVcIiBkYXRhLWtleT1cInNpemVcIiBkYXRhLW51bT1cIjI0MFwiIGlkPVwieXRtYV9fc2l6ZTI0MFwiIC8+PGxhYmVsIGZvcj1cInl0bWFfX3NpemUyNDBcIj5TIDxzbWFsbD4yNDBwPC9zbWFsbD48L2xhYmVsPjwvc3Bhbj48c3Bhbj48aW5wdXQgbmFtZT1cInl0bWFfX3NpemVcIiBkYXRhLWtleT1cInNpemVcIiB0eXBlPVwicmFkaW9cIiBpZD1cInl0bWFfX3NpemUzNjBcIiBkYXRhLW51bT1cIjM2MFwiIC8+PGxhYmVsIGZvcj1cInl0bWFfX3NpemUzNjBcIj5NIDxzbWFsbD4zNjBwPC9zbWFsbD48L2xhYmVsPjwvc3Bhbj48c3Bhbj48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cInl0bWFfX3NpemVcIiBkYXRhLWtleT1cInNpemVcIiBkYXRhLW51bT1cIjQ4MFwiIGlkPVwieXRtYV9fc2l6ZTQ4MFwiIC8+PGxhYmVsIGZvcj1cInl0bWFfX3NpemU0ODBcIj5MIDxzbWFsbD40ODBwPC9zbWFsbD48L2xhYmVsPjwvc3Bhbj48c3Bhbj48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cInl0bWFfX3NpemVcIiBkYXRhLWtleT1cInNpemVcIiBkYXRhLW51bT1cIjcyMFwiIGlkPVwieXRtYV9fc2l6ZTcyMFwiIC8+PGxhYmVsIGZvcj1cInl0bWFfX3NpemU3MjBcIj5YIDxzbWFsbD43MjBwPC9zbWFsbD48L2xhYmVsPjwvc3Bhbj48L3A+PC9maWVsZHNldD5cblx0XHRcdFx0XHRcdFx0XHQ8ZmllbGRzZXQ+PGxlZ2VuZD5RdWFsaXR5PC9sZWdlbmQ+PHA+PHNwYW4+PGlucHV0IG5hbWU9XCJ5dG1hX19xdWFsaXR5XCIgZGF0YS1rZXk9XCJxdWFsaXR5XCIgZGF0YS1udW09XCIyNDBcIiBpZD1cInl0bWFfX3F1YWxpdHkyNDBcIiB0eXBlPVwicmFkaW9cIj48bGFiZWwgZm9yPVwieXRtYV9fcXVhbGl0eTI0MFwiPjI0MHA8L2xhYmVsPjwvc3Bhbj48c3Bhbj48aW5wdXQgbmFtZT1cInl0bWFfX3F1YWxpdHlcIiBkYXRhLWtleT1cInF1YWxpdHlcIiBpZD1cInl0bWFfX3F1YWxpdHkzNjBcIiBkYXRhLW51bT1cIjM2MFwiIHR5cGU9XCJyYWRpb1wiPjxsYWJlbCBmb3I9XCJ5dG1hX19xdWFsaXR5MzYwXCI+MzYwcDwvbGFiZWw+PC9zcGFuPjxzcGFuPjxpbnB1dCBuYW1lPVwieXRtYV9fcXVhbGl0eVwiIGRhdGEta2V5PVwicXVhbGl0eVwiIGRhdGEtbnVtPVwiNDgwXCIgaWQ9XCJ5dG1hX19xdWFsaXR5NDgwXCIgdHlwZT1cInJhZGlvXCI+PGxhYmVsIGZvcj1cInl0bWFfX3F1YWxpdHk0ODBcIj40ODBwPC9sYWJlbD48L3NwYW4+PHNwYW4+PGlucHV0IG5hbWU9XCJ5dG1hX19xdWFsaXR5XCIgZGF0YS1rZXk9XCJxdWFsaXR5XCIgZGF0YS1udW09XCI3MjBcIiBpZD1cInl0bWFfX3F1YWxpdHk3MjBcIiB0eXBlPVwicmFkaW9cIj48bGFiZWwgZm9yPVwieXRtYV9fcXVhbGl0eTcyMFwiPjcyMHA8L2xhYmVsPjwvc3Bhbj48c3Bhbj48aW5wdXQgbmFtZT1cInl0bWFfX3F1YWxpdHlcIiBkYXRhLWtleT1cInF1YWxpdHlcIiBkYXRhLW51bT1cIjEwODBcIiBpZD1cInl0bWFfX3F1YWxpdHkxMDgwXCIgdHlwZT1cInJhZGlvXCI+PGxhYmVsIGZvcj1cInl0bWFfX3F1YWxpdHkxMDgwXCI+MTA4MHA8L2xhYmVsPjwvc3Bhbj48L3A+PC9maWVsZHNldD5cblx0XHRcdFx0XHRcdFx0XHQ8ZmllbGRzZXQ+PGxlZ2VuZD5Bc3BlY3QgUmF0aW88L2xlZ2VuZD48cD48c3Bhbj48aW5wdXQgbmFtZT1cInl0bWFfX3JhdGlvXCIgZGF0YS1rZXk9XCJyYXRpb1wiIHR5cGU9XCJyYWRpb1wiIGlkPVwieXRtYV9fcmF0aW8yXCIgZGF0YS1udW09XCIyXCIgLz48bGFiZWwgZm9yPVwieXRtYV9fcmF0aW8yXCI+MTY6OTwvbGFiZWw+PC9zcGFuPjxzcGFuPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwieXRtYV9fcmF0aW9cIiBkYXRhLWtleT1cInJhdGlvXCIgZGF0YS1udW09XCIxXCIgaWQ9XCJ5dG1hX19yYXRpbzFcIiAvPjxsYWJlbCBmb3I9XCJ5dG1hX19yYXRpbzFcIj40OjM8L2xhYmVsPjwvc3Bhbj48L3A+PC9maWVsZHNldD5cblx0XHRcdFx0XHRcdFx0XHQ8ZmllbGRzZXQ+PGxlZ2VuZD5Zb3VUdWJlPC9sZWdlbmQ+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cD48aW5wdXQgbmFtZT1cInl0bWFfX3l0X2Fubm90YXRpb25cIiBkYXRhLWtleT1cInl0X2Fubm90YXRpb25cIiB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInl0bWFfX3l0X2Fubm90YXRpb25cIiAvPjxsYWJlbCBmb3I9XCJ5dG1hX195dF9hbm5vdGF0aW9uXCI+RW5hYmxlIHZpZGVvIGFubm90YXRpb25zPC9sYWJlbD48L3A+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cD48aW5wdXQgbmFtZT1cInl0bWFfX3l0X25vY29va2llXCIgZGF0YS1rZXk9XCJ5dF9ub2Nvb2tpZVwiIHR5cGU9XCJjaGVja2JveFwiIGlkPVwieXRtYV9feXRfbm9jb29raWVcIiAvPjxsYWJlbCBmb3I9XCJ5dG1hX195dF9ub2Nvb2tpZVwiPlVzZSBodHRwczovL3lvdXR1YmUtbm9jb29raWUuY29tIHRvIGxvYWQgdmlkZW9zPC9sYWJlbD48L3A+XG5cdFx0XHRcdFx0XHRcdFx0PC9maWVsZHNldD5cblx0XHRcdFx0XHRcdFx0XHQ8ZmllbGRzZXQ+PGxlZ2VuZD5XaW5kb3cgRm9jdXM8L2xlZ2VuZD48cD48aW5wdXQgbmFtZT1cInl0bWFfX2ZvY3VzXCIgZGF0YS1rZXk9XCJmb2N1c1wiIHR5cGU9XCJjaGVja2JveFwiIGlkPVwieXRtYV9fZm9jdXNcIiB2YWx1ZT1cImZvY3VzXCIgLz48bGFiZWwgZm9yPVwieXRtYV9fZm9jdXNcIj5BZnRlciBjbGlja2luZyB0aGUgdGh1bWJuYWlsLCBzZXQgdGhlIHZpZGVvIGF0IHRoZSB0b3Agb2YgdGhlIHdpbmRvdy48L2xhYmVsPjwvcD48L2ZpZWxkc2V0PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PHA+PHNtYWxsIGlkPVwieXRtX3NldHRpbmdzX2Vycm9yXCIgY2xhc3M9XCJ5dG1fZXJyb3IgeXRtX25vbmUgeXRtX3RpdGxlXCI+RXJyb3IhIFlvdXIgc2V0dGluZ3MgY291bGQgbm90IGJlIHNhdmVkLjwvc21hbGw+PC9wPlxuXHRcdFx0XHRcdFx0XHQ8cCBpZD1cInl0bV9vcHRzXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJ5dG1hY2xvc2VcIj5DbG9zZTwvYnV0dG9uPiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cInl0bWFyZXNldFwiPlJlc2V0PC9idXR0b24+IDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwieXRtYWNsZWFyXCIgdGl0bGU9XCJSZW1vdmUgYWxsIHZpZGVvIGRlc2NyaXB0aW9ucyB0aGF0IGhhdmUgYmVlbiBjYWNoZWRcIj5SZXNldCAmIFJlbW92ZSBDYWNoZTwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdFx0PC9kaXY+YDtcblxuXHRcdFx0XHRZLnVzZXIuJGZvcm0gPSBfLmUoJ2RpdicsIHsgY2xhc3NOYW1lOiAneXRtX2ZpeF9jZW50ZXIgeXRtX25vbmUgeXRtX2JveCcsIGlubmVySFRNTDogdGVtcGxhdGUgfSwgZG9jdW1lbnQuYm9keSk7XG5cdFx0XHRcdFkudXNlci5lcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5dG1fc2V0dGluZ3NfZXJyb3InKTtcblxuXHRcdFx0XHRvbihZLnVzZXIuJGZvcm0sICdrZXl1cCBjbGljaycsICdpbnB1dCwgbGFiZWwnLCBkZWJvdW5jZShZLnVzZXIuZXZlbnRzLnNhdmUsIDUwMCkpO1xuXHRcdFx0XHRZLnVzZXIuJGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCksIGZhbHNlKTtcblxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXRtYXJlc2V0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBZLnVzZXIuZXZlbnRzLnJlc2V0LCBmYWxzZSk7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5dG1hY2xlYXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFkudXNlci5ldmVudHMuY2xlYXIsIGZhbHNlKTtcblxuXHRcdFx0XHQvLyBjbG9zZVxuXHRcdFx0XHRZLnVzZXIuJGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCBZLnVzZXIuZXZlbnRzLmZvcm1Ub2dnbGUsIGZhbHNlKTtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3l0bWFjbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgWS51c2VyLmV2ZW50cy5mb3JtVG9nZ2xlLCBmYWxzZSk7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIFkudXNlci5ldmVudHMuZm9ybVRvZ2dsZUtleWJvYXJkLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdFkuY3NzID0gKCkgPT4ge1xuXHRcdGNvbnN0IHBsYXllckNzcyA9IFBsYXllci5jc3MuZ2VuZXJhdG9yKCk7XG5cdFx0Y29uc3QgbG9hZGluZ0ljb24gPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoRGdBS0FKRUFBUC8vLytCS1YvLy8vd0FBQUNIL0MwNUZWRk5EUVZCRk1pNHdBd0VBQUFBaCtRUUZDZ0FDQUN3QUFBQUFEZ0FLQUFBQ0hGU09lUVlJNzFwNk10QUp6NDExNjJ5QkgrZG81SWgxa0tHMFFnRUFJZmtFQlFvQUFnQXNBQUFCQUEwQUNBQUFBaFNVWUdFb2Vya2dkSXpLR2x1MkVULzljZUptRkFBaCtRUUZDZ0FDQUN3QUFBRUFEUUFJQUFBQ0ZKUmhjYm1pZ2x4NzhTWEtZSzZ6YStOeEh5WVZBQ0g1QkFVS0FBSUFMQUFBQVFBTkFBZ0FBQUlXVkNTQWwraHFFR1JUTGh0YmR2VHFubFVmOW5oVEFRQWgrUVFGQ2dBQ0FDd0FBQUVBRFFBSUFBQUNGWlJpWUNoNnVhQ1J6TlhZc0tWVCs1ZUJXM2dKQlFBaCtRUUpDZ0FDQUN3QUFBQUFEZ0FLQUFBQ0dwU1BhV0d3Zlpod1F0SUs4VlRVdnV4cG05WXA0WGxtcGlJVUFEcz0nO1xuXG5cdFx0Ly8gY29uc29sZS5sb2cocGxheWVyQ3NzKTtcblx0XHRfLmNzcyhwbGF5ZXJDc3MpO1xuXG5cdFx0Ly8gaW1hZ2VzXG5cdFx0Ly8gdG9kbyB1cGRhdGUoc2l0ZSwgc2l6ZSwgcGFkZGluZylcblx0XHRfLmNzcyhgXG5cdFx0XHQueXRtX2xvYWRpbmd7YmFja2dyb3VuZDp1cmwoJHtsb2FkaW5nSWNvbn0pIDAgM3B4IG5vLXJlcGVhdDt9XG5cdFx0XHQueXRtX2xpbmt7cG9zaXRpb246cmVsYXRpdmUgIWltcG9ydGFudDtiYWNrZ3JvdW5kOnVybCgke1kuREIuc2l0ZXMueW91dHViZS5mYXZpY29ufSkgMCBjZW50ZXIgbm8tcmVwZWF0ICFpbXBvcnRhbnQ7bWFyZ2luLWxlZnQ6NHB4O3BhZGRpbmctbGVmdDoyMHB4IWltcG9ydGFudDt9XG5cdFx0XHQueXRtX2xpbmsueXRtX2xpbmtfdmltZW97YmFja2dyb3VuZC1pbWFnZTp1cmwoJHtZLkRCLnNpdGVzLnZpbWVvLmZhdmljb259KSAhaW1wb3J0YW50O2JhY2tncm91bmQtc2l6ZToxMnB4IDEycHggIWltcG9ydGFudDtwYWRkaW5nLWxlZnQ6MThweCFpbXBvcnRhbnR9XG5cdFx0XHQueXRtX2xpbmsueXRtX2xpbmtfdmluZXtiYWNrZ3JvdW5kLWltYWdlOnVybCgke1kuREIuc2l0ZXMudmluZS5mYXZpY29ufSkgIWltcG9ydGFudDtiYWNrZ3JvdW5kLXNpemU6MTBweCAxMHB4IWltcG9ydGFudDtwYWRkaW5nLWxlZnQ6MTZweCFpbXBvcnRhbnR9XG5cdFx0XHQueXRtX2xpbmsueXRtX2xpbmtfc291bmRjbG91ZHtiYWNrZ3JvdW5kLWltYWdlOnVybCgke1kuREIuc2l0ZXMuc291bmRjbG91ZC5mYXZpY29ufSkhaW1wb3J0YW50O3BhZGRpbmctbGVmdDoxN3B4IWltcG9ydGFudH1cblx0XHRcdC55dG1fbGluay55dG1fbGlua19odG1sNXtiYWNrZ3JvdW5kLWltYWdlOnVybCgke1kuREIuc2l0ZXMuaHRtbDUuZmF2aWNvbn0pICFpbXBvcnRhbnQ7cGFkZGluZy1sZWZ0OjE2cHghaW1wb3J0YW50fVxuXHRcdFx0Lnl0bV9saW5rLnl0bV9saW5rX2dmeWNhdHtiYWNrZ3JvdW5kLWltYWdlOnVybCgke1kuREIuc2l0ZXMuZ2Z5Y2F0LmZhdmljb259KSAhaW1wb3J0YW50O2JhY2tncm91bmQtc2l6ZToxMnB4IDEycHggIWltcG9ydGFudDtwYWRkaW5nLWxlZnQ6MTZweCFpbXBvcnRhbnQ7fVxuXHRcdFx0Lnl0bV9saW5rLnl0bV9saW5rX2ltZ3Vye2JhY2tncm91bmQtaW1hZ2U6dXJsKCR7WS5EQi5zaXRlcy5pbWd1ci5mYXZpY29ufSkgIWltcG9ydGFudDtiYWNrZ3JvdW5kLXNpemU6MTJweCAxMnB4ICFpbXBvcnRhbnQ7cGFkZGluZy1sZWZ0OjE2cHghaW1wb3J0YW50fVxuXHRcdFx0Lnl0bV9saW5rLnl0bV9saW5rX3N0cmVhbWFibGV7YmFja2dyb3VuZC1pbWFnZTp1cmwoJHtZLkRCLnNpdGVzLnN0cmVhbWFibGUuZmF2aWNvbn0pICFpbXBvcnRhbnQ7IGJhY2tncm91bmQtc2l6ZTogMTJweCAxMnB4ICFpbXBvcnRhbnQ7cGFkZGluZy1sZWZ0OiAxNHB4ICFpbXBvcnRhbnQ7fVxuXHRcdGApO1xuXG5cdFx0Xy5jc3MoJy55dG1fbm9uZSwueXRtX2xpbmsgYnJ7ZGlzcGxheTpub25lIWltcG9ydGFudH0ueXRtX2JveHstd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lnl0bV9ibG9ja3tkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO2NsZWFyOmJvdGg7dGV4dC1hbGlnbjpsZWZ0O2JvcmRlcjowO21hcmdpbjowO3BhZGRpbmc6MDtvdmVyZmxvdzpoaWRkZW59Lnl0bV9ub3JtYWxpemV7Zm9udC13ZWlnaHQ6NDAwIWltcG9ydGFudDtmb250LXN0eWxlOm5vcm1hbCFpbXBvcnRhbnQ7bGluZS1oZWlnaHQ6MS4yIWltcG9ydGFudH0ueXRtX3NhbnN7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWYhaW1wb3J0YW50fS55dG1fc3BhY2Vye292ZXJmbG93OmF1dG87bWFyZ2luOjAgMCA2cHg7cGFkZGluZzo0cHh9Lnl0bV9zcGFjZXIueXRtX3NpdGVfc2xpbXtkaXNwbGF5OmlubGluZX0ueXRtX2NsZWFyOmFmdGVye2NvbnRlbnQ6XCJcIjtkaXNwbGF5OnRhYmxlO2NsZWFyOmJvdGh9Lnl0bV9jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lnl0bV9saW5rIGIsLnl0bV9saW5rIHN0cm9uZ3tmb250LXdlaWdodDo0MDAhaW1wb3J0YW50fS55dG1fbGluayB1e3RleHQtZGVjb3JhdGlvbjpub25lIWltcG9ydGFudH0ueXRtX2xpbmsgaSwueXRtX2xpbmsgZW17Zm9udC1zdHlsZTpub3JtYWwhaW1wb3J0YW50fS55dG1fdHJpZ2dlcnt3aWR0aDoxMThweDtoZWlnaHQ6NjZweDtiYWNrZ3JvdW5kLWNvbG9yOiMyNjI2MjYhaW1wb3J0YW50O2N1cnNvcjpwb2ludGVyO2JhY2tncm91bmQtcG9zaXRpb246LTFweCAtMTJweDtmbG9hdDpsZWZ0O2JveC1zaGFkb3c6MnB4IDJweCByZ2JhKDAsMCwwLC4zKTtiYWNrZ3JvdW5kLXNpemU6YXV0byA5MHB4IWltcG9ydGFudDtjb2xvcjojZmZmO3RleHQtc2hhZG93OiMzMzMgMCAwIDJweDtmb250LXNpemU6MTNweH0ueXRtX3RyaWdnZXI6aG92ZXJ7Ym94LXNoYWRvdzoycHggMnB4ICM2MDY1NmI4MDtvcGFjaXR5Oi45NX0ueXRtX3RyaWdnZXIgdmFye3otaW5kZXg6MjtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt0ZXh0LWFsaWduOnJpZ2h0fS55dG1fbGFiZWx7ZGlzcGxheTpibG9jaztwYWRkaW5nOjNweCA2cHg7bGluZS1oZWlnaHQ6MS4yO2ZvbnQtc3R5bGU6bm9ybWFsfS55dG1faW5pdHtoZWlnaHQ6MjJweDtiYWNrZ3JvdW5kOnJnYmEoMTEsMTEsMTEsLjYyKTtwYWRkaW5nOjRweCAyNXB4IDZweCA2cHh9Lnl0bV9zaXRlX3ZpbmUgLnl0bV90cmlnZ2Vye2JhY2tncm91bmQtY29sb3I6IzkwZWU5MCFpbXBvcnRhbnQ7YmFja2dyb3VuZC1zaXplOjEyMHB4IGF1dG8haW1wb3J0YW50fS55dG1fc2l0ZV9zbGltIC55dG1fdHJpZ2dlcntiYWNrZ3JvdW5kOiNlMzRjMjYhaW1wb3J0YW50O2hlaWdodDphdXRvO2JveC1zaGFkb3c6MCAwIDJweCAjZmZkYjlkIGluc2V0LDJweCAycHggcmdiYSgwLDAsMCwuMyk7bWFyZ2luOjAgM3B4IDAgMDt3aWR0aDphdXRvO3RyYW5zaXRpb246YWxsIC4zcyBlYXNlLWluLW91dCAwc30ueXRtX3NpdGVfc2xpbSAueXRtX3RyaWdnZXI6aG92ZXJ7b3BhY2l0eTouOH0ueXRtX3NpdGVfc2xpbSAueXRtX2xhYmVse3RleHQtc2hhZG93OjAgMCAxcHggI2YwNjUyOX0ueXRtX3NpdGVfc2xpbSAueXRtX2luaXR7YmFja2dyb3VuZDp0cmFuc3BhcmVudH0ueXRtX2Jke2Zsb2F0OmxlZnQ7bWF4LXdpZHRoOjQ1MHB4O21hcmdpbjoycHggMTBweDtmb250LXNpemU6MTJweH0ueXRtX3RpdGxle2ZvbnQtd2VpZ2h0OjcwMH0ueXRtX2Vycm9ye2NvbG9yOiNjYzJmMjQ7Zm9udC1zdHlsZTppdGFsaWN9Lnl0bV9sb2FkaW5ne2ZvbnQtc3R5bGU6aXRhbGljO3BhZGRpbmc6MXB4IDEuNWVtfS55dG1fZGVzY3J7d29yZC13cmFwOmJyZWFrLXdvcmQ7bWF4LWhlaWdodDo0OHB4O292ZXJmbG93OmF1dG87cGFkZGluZy1yaWdodDoyMHB4fS55dG1fZGVzY3JbZGF0YS1mdWxsXXtjdXJzb3I6cG9pbnRlcn0ueXRtX2Rlc2NyX29wZW57cmVzaXplOmJvdGg7d2hpdGUtc3BhY2U6cHJlLWxpbmU7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDAsMCwwLDApIDAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsMCkgODAlLHJnYmEoMCwwLDAsMC4xKSAxMDAlKX0ueXRtX2Rlc2NyX29wZW5bc3R5bGVde21heC1oZWlnaHQ6bm9uZX0ueXRtX3Byb2plY3RvcnttYXJnaW4tYm90dG9tOjRweH11bC55dG1fb3B0aW9uc3tvdmVyZmxvdzpoaWRkZW47bWFyZ2luOjAhaW1wb3J0YW50O3BhZGRpbmc6M3B4IDAgMXB4O2xpc3Qtc3R5bGUtcG9zaXRpb246b3V0c2lkZSFpbXBvcnRhbnR9Lnl0bV9vcHRpb25zIGxpe2Rpc3BsYXk6aW5saW5lO21hcmdpbjowIWltcG9ydGFudDtwYWRkaW5nOjAhaW1wb3J0YW50fS55dG1fb3B0aW9ucyBsaT51bHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46MDtwYWRkaW5nOjAgMXB4IDAgMH0ueXRtX29wdGlvbnMgbGkgdWwgbGl7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstby11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7bGlzdC1zdHlsZS10eXBlOm5vbmU7Y3Vyc29yOnBvaW50ZXI7ZmxvYXQ6bGVmdDtjb2xvcjojODU4NTg1O2JvcmRlcjoxcHggc29saWQgIzFkMWQxZDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjMTgxODE4O2JvcmRlci10b3A6MXB4IHNvbGlkICMyOTI5Mjk7Ym94LXNoYWRvdzowIDAgMXB4ICM1NTU7aGVpZ2h0OjE0cHg7Zm9udC1zaXplOjEycHghaW1wb3J0YW50O2xpbmUtaGVpZ2h0OjEycHghaW1wb3J0YW50O2JhY2tncm91bmQ6IzIyMjtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgjMmQyYzJjLCMyMjIpO21hcmdpbjowIWltcG9ydGFudDtwYWRkaW5nOjVweCA5cHggM3B4IWltcG9ydGFudH0ueXRtX29wdGlvbnMgbGkgdWwgbGk6Zmlyc3QtY2hpbGR7Ym9yZGVyLXJhZGl1czoycHggMCAwIDJweH0ueXRtX29wdGlvbnMgbGkgdWwgbGk6bGFzdC1jaGlsZHtib3JkZXItbGVmdDowIWltcG9ydGFudDtib3JkZXItcmFkaXVzOjAgMnB4IDJweCAwO21hcmdpbjowIDJweCAwIDAhaW1wb3J0YW50fS55dG1fb3B0aW9ucyBsaSB1bCBsaTpmaXJzdC1jaGlsZDpsYXN0LWNoaWxkLC55dG1fbGlfc2V0dGluZ3tib3JkZXItcmFkaXVzOjJweH0ueXRtX29wdGlvbnMgbGkgdWwgbGk6aG92ZXJ7Y29sb3I6I2NjYzt0ZXh0LXNoYWRvdzoxcHggMXB4IDAgIzMzMztiYWNrZ3JvdW5kOiMxODE4MTh9Lnl0bV9vcHRpb25zIGxpIHVsIGxpW2lkXXtjb2xvcjojZGRkO3RleHQtc2hhZG93OjAgMCAycHggIzQ0NH0ueXRtX3BhbmVsX3NpemV7YmFja2dyb3VuZDojMDAwO21heC13aWR0aDoxMDAlO30ueXRtX3BhbmVsX3N3aXRjaGVyW2RhdGEtc3RhbmRieT1cInRydWVcIl17YmFja2dyb3VuZDojMTExfS55dG1fcGFuZWxfc3dpdGNoZXJbZGF0YS1zdGFuZGJ5PVwidHJ1ZVwiXTphZnRlcntjdXJzb3I6Y2VsbDtjb2xvcjojMGUwZTBlO2NvbnRlbnQ6XCJ5dG1hIVwiO2Rpc3BsYXk6YmxvY2s7Zm9udC1zaXplOjg1cHg7Zm9udC1zdHlsZTppdGFsaWM7Zm9udC13ZWlnaHQ6NzAwO2xlZnQ6NTAlO3Bvc2l0aW9uOmFic29sdXRlO3RleHQtc2hhZG93OjJweCAxcHggIzE4MTgxOCwtMXB4IC0xcHggIzBhMGEwYTt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKX0ueXRtX3NpdGVfc291bmRjbG91ZCAueXRtX3BhbmVsX3NpemUueXRtX3NvdW5kY2xvdWQtcGxheWxpc3R7aGVpZ2h0OjMzNHB4IWltcG9ydGFudH0ueXRtX2ZpeF9jZW50ZXJ7YmFja2dyb3VuZDpyZ2JhKDUxLDUxLDUxLC40MSk7aGVpZ2h0OjEwMCU7bGVmdDowO3Bvc2l0aW9uOmZpeGVkO3RvcDowO3dpZHRoOjEwMCU7ei1pbmRleDo5OTk5OH0jeXRtX3NldHRpbmdze3otaW5kZXg6OTk5OTk7bWF4LXdpZHRoOjUwMHB4O21heC1oZWlnaHQ6ODUlO292ZXJmbG93OmF1dG87YmFja2dyb3VuZDojZmJmYmZiO2JvcmRlcjoxcHggc29saWQgI2JiYjtjb2xvcjojNDQ0O2JveC1zaGFkb3c6MCAwIDVweCByZ2JhKDAsMCwwLC4yKSwwIDAgM3B4IHJnYmEoMjM5LDIzOSwyMzksLjEpIGluc2V0O21hcmdpbjo0JSBhdXRvO3BhZGRpbmc6NHB4IDhweCAwfSN5dG1fc2V0dGluZ3MgcHttYXJnaW46NXB4IDA7cGFkZGluZzowfSN5dG1fc2V0dGluZ3MgZmllbGRzZXR7dmVydGljYWwtYWxpZ246dG9wO2JvcmRlci1yYWRpdXM6M3B4O2JvcmRlcjoxcHggc29saWQgI2NjYzttYXJnaW46MCAwIDVweDtwYWRkaW5nOjNweH0jeXRtX3NldHRpbmdzIGxlZ2VuZHtwYWRkaW5nOjNweH0jeXRtX3NldHRpbmdzIGZpZWxkc2V0IHNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2s7bWluLXdpZHRoOjVlbX0jeXRtX3NldHRpbmdzIGlucHV0e3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lIWltcG9ydGFudDttYXJnaW46M3B4IDVweCFpbXBvcnRhbnR9I3l0bV9zZXR0aW5nc3R7Zm9udC1zaXplOjExMCU7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2QwMDttYXJnaW46M3B4IDAgOXB4O3BhZGRpbmc6MCAzcHggM3B4fSN5dG1fc2V0dGluZ3MgbGFiZWx7Y3Vyc29yOnBvaW50ZXJ9I3l0bV9zZXR0aW5ncyBzbWFsbHtmb250LXNpemU6OTAlfSN5dG1fb3B0cyBidXR0b257Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjEwcHggNXB4IDhweCAycHg7cGFkZGluZzozcHg7Ym9yZGVyOjFweCBzb2xpZCAjYWRhZGFkO2JvcmRlci1yYWRpdXM6MnB4O2JhY2tncm91bmQ6I2VlZTtmb250LXNpemU6OTAlfSN5dG1fb3B0cyBidXR0b246aG92ZXJ7YmFja2dyb3VuZDojZGRkfScpO1xuXHR9O1xuXG5cdFkuYWpheCA9IHtcblx0XHRsb2FkOiBmdW5jdGlvbiAoc2l0ZSwgaWQsIHVyaSkge1xuXHRcdFx0Y29uc29sZS5pbmZvKCd5dG1hLy9hamF4K2xvYWQoaWQpJywgc2l0ZSwgaWQsIHVyaSk7XG5cdFx0XHR1cmkgPSBZLkRCLnNpdGVzW3NpdGVdLmFqYXgucmVwbGFjZSgnJWtleScsIGlkKS5yZXBsYWNlKCcldXJpJywgdXJpKTtcblxuXHRcdFx0aWYgKFkuREIuc2l0ZXNbc2l0ZV0uYWpheEV4dGVuc2lvbikgeyByZXR1cm4gdGhpcy5nbXhocih1cmksIHNpdGUsIGlkKTsgfVxuXG5cdFx0XHRjb25zb2xlLmluZm8oJ3l0bWEvL2FqYXgrbG9hZCh1cmkpJywgWS5EQi5zaXRlc1tzaXRlXS5hamF4LnJlcGxhY2UoJyVrZXknLCBpZCkucmVwbGFjZSgnJXVyaScsIHVyaSkpO1xuXHRcdFx0aWYgKFkuREIuc2l0ZXNbc2l0ZV0uYWpheCkge1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygncHJlcGluZyB1cmknKTtcblx0XHRcdFx0cmV0dXJuIHRoaXMueGhyKHVyaSwgc2l0ZSwgaWQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9LFxuXHRcdGxvYWRGcm9tRGF0YXNldDogZnVuY3Rpb24gKGRhdGFzZXQpIHtcblx0XHRcdGlmICghdGhpcy5sb2FkRnJvbUNhY2hlRGF0YXNldChkYXRhc2V0KSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkKGRhdGFzZXQueXRtc2l0ZSwgZGF0YXNldC55dG1pZCwgZGF0YXNldC55dG11cmkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bG9hZEZyb21DYWNoZURhdGFzZXQ6IGZ1bmN0aW9uICh7IHl0bXNpdGUsIHl0bWlkIH0pIHtcblx0XHRcdGNvbnN0IGNhY2hlID0gWS5leHRlcm5hbC5kYXRhRnJvbVN0b3JhZ2UoeXRtc2l0ZSwgeXRtaWQpO1xuXG5cdFx0XHRjb25zb2xlLmluZm8oJ3l0bWEvL2FqYXgrY2FjaGUoaWQpJywgeXRtc2l0ZSwgeXRtaWQpO1xuXHRcdFx0Y29uc29sZS5pbmZvKCd5dG1hLy9hamF4K2NhY2hlKGRhdGEpJywgY2FjaGUpO1xuXG5cdFx0XHRpZiAoY2FjaGUpIHsgWS5leHRlcm5hbC5wb3B1bGF0ZShjYWNoZSk7IH1cblxuXHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdH0sXG5cdFx0Z214aHI6IGZ1bmN0aW9uICh1cmksIHNpdGUsIGlkKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnZ214aHIgc3RhcnRpbmchJyk7XG5cdFx0XHRcdEdNLnhtbGh0dHBSZXF1ZXN0KHtcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHRcdHVybDogdXJpLFxuXHRcdFx0XHRcdG9ubG9hZDogZnVuY3Rpb24gKHsgcmVzcG9uc2VUZXh0IH0pIHtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdFkuZXh0ZXJuYWwucGFyc2UocmVzcG9uc2VUZXh0LCBzaXRlLCBpZCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbmVycm9yOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnR00gQ2Fubm90IFhIUicpO1xuXHRcdFx0XHRcdFx0WS5hamF4LmZhaWx1cmUuY2FsbCh7IGlkIH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0WS5hamF4LnByZVByb2Nlc3MoaWQpO1xuXG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGlmIChZLkRCLmV4dGVuc2lvbikge1xuXHRcdFx0XHRcdGNvbnNvbGUuaW5mbygneXRtYS8vZ214aHItY29ycycpO1xuXHRcdFx0XHRcdHRoaXMueGhyKHVyaSwgc2l0ZSwgaWQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdObyBhcHBsaWNhYmxlIENPUlMgcmVxdWVzdCBhdmFpbGFibGUuJyk7XG5cdFx0XHRcdFx0dGhpcy5mYWlsdXJlLmNhbGwoeyBpZCB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0eGhyOiBmdW5jdGlvbiAodXJpLCBzaXRlLCBpZCkge1xuXHRcdFx0Y29uc3QgeCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0Y29uc29sZS5pbmZvKCd5dG1hLy94aHInLCB1cmksIGlkLCBzaXRlKTtcblxuXHRcdFx0WS5hamF4LnByZVByb2Nlc3MoaWQpO1xuXG5cdFx0XHR4Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2codGhpcy5yZWFkeVN0YXRlLCB0aGlzLnN0YXR1cyk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdFx0XHRcdFkuZXh0ZXJuYWwucGFyc2UodGhpcy5yZXNwb25zZVRleHQsIHNpdGUsIGlkKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuc3RhdHVzID09PSA0MDMpIHtcblx0XHRcdFx0XHRcdFkuZXh0ZXJuYWwucG9wdWxhdGUoeyBzaXRlLCBpZCwgdGl0bGU6ICdFcnJvciA0MDMnLCBkZXNjOiAnJyB9KTtcblx0XHRcdFx0XHRcdFkuZXh0ZXJuYWwuc2F2ZSh7IHNpdGUsIGlkLCB0aXRsZTogJ0Vycm9yIDQwMycsIGRlc2M6ICcnIH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7IC8vIGlmICh0aGlzLnN0YXR1cyA+PSA0MDAgfHwgdGhpcy5zdGF0dXMgPT09IDApIHtcblx0XHRcdFx0XHRcdFkuYWpheC5mYWlsdXJlLmNhbGwoeyBpZCB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIGNvbnNvbGUuaW5mbygneXRtYS8veGhyK3NlbmRpbmcnKTtcblx0XHRcdFx0eC5vcGVuKCdnZXQnLCB1cmksIHRydWUpO1xuXHRcdFx0XHR4LnNlbmQoKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcigneXRtYS8veGhyK2ZhaWxlZChjYW5ub3Qgc2VuZCB4aHIpJywgdXJpKTtcblx0XHRcdFx0WS5hamF4LmZhaWx1cmUuY2FsbCh7IGlkIH0pO1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZmFpbHVyZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0Xy5zKGAueXRtX2JkLl8ke1kuZXNjYXBlSWQodGhpcy5pZCl9YCwgZWwgPT4ge1xuXHRcdFx0XHRjb25zdCBhID0gZWwucXVlcnlTZWxlY3RvcignYScpO1xuXHRcdFx0XHRhLmRhdGFzZXQudHJpZXMgPSBhLmRhdGFzZXQudHJpZXMgPyBwYXJzZUZsb2F0KGEuZGF0YXNldC50cmllcykgKyAxIDogMTtcblx0XHRcdFx0aWYgKGEuZGF0YXNldC50cmllcyA+PSA1KSB7XG5cdFx0XHRcdFx0YS50ZXh0Q29udGVudCA9ICdNYXggYXR0ZW1wdHMgcmVhY2hlZCc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YS50ZXh0Q29udGVudCA9IGBFcnJvciwgdW5hYmxlIHRvIGxvYWQgZGF0YS4ke2EuZGF0YXNldC50cmllcyA+IDEgPyAnJyA6ICcgW1JldHJ5XSd9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRhLmNsYXNzTmFtZSA9ICd5dG1fZXJyb3IgeXRtX3RpdGxlJztcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0cHJlUHJvY2VzczogZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRfLnMoYC55dG1fbWFudWFsLl8ke1kuZXNjYXBlSWQoaWQpfSBhYCwgZWwgPT4ge1xuXHRcdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCd5dG1fbG9hZGluZycpO1xuXHRcdFx0XHRlbC50ZXh0Q29udGVudCA9ICdMb2FkaW5nJztcblx0XHRcdFx0ZWwudGl0bGUgPSAnUmV0cnkgbG9hZGluZyBkYXRhLic7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0LyoqIEUgWCBUIEUgUiBOIEEgTCBBcHBhcmF0dXNcblx0ICogRGF0YSBmcm9tIGV4dGVybmFsIHNpdGVzXG5cdCAqL1xuXHRZLmV4dGVybmFsID0ge1xuXHRcdHZlcnNpb246ICd5dG1hLjQuMS5kYXQnLFxuXHRcdHBhcnNlOiBmdW5jdGlvbiAocmVzcG9uc2UsIHNpdGUsIGlkKSB7XG5cdFx0XHRpZiAodGhpcy5wYXJzZXJzW3NpdGVdKSB7XG5cdFx0XHRcdHJlc3BvbnNlID0gWS5EQi5zaXRlc1tzaXRlXS5yYXdSZXNwb25zZSA/IHJlc3BvbnNlIDogSlNPTi5wYXJzZShyZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucG9wdWxhdGUodGhpcy5oZWxwZXIuY3V0RGVzY3JpcHRpb24odGhpcy5wYXJzZXJzW3NpdGVdKHJlc3BvbnNlLCBpZCkpKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHBhcnNlcnM6IHtcblx0XHRcdHNvdW5kY2xvdWQ6IGZ1bmN0aW9uICh7IHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsX3VybCB9LCBpZCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHNpdGU6ICdzb3VuZGNsb3VkJyxcblx0XHRcdFx0XHRpZCwgLy91bmVzY2FwZShqLmh0bWwpLm1hdGNoKC90cmFja3NcXC8oXFxkKykvKVsxXSxcblx0XHRcdFx0XHR0aXRsZSxcblx0XHRcdFx0XHRkZXNjOiBkZXNjcmlwdGlvbixcblx0XHRcdFx0XHR0aDogcmVtb3ZlU2VhcmNoKHRodW1ibmFpbF91cmwpXG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0dmltZW86IGZ1bmN0aW9uIChqKSB7XG5cdFx0XHRcdGogPSBqWzBdO1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHNpdGU6ICd2aW1lbycsXG5cdFx0XHRcdFx0aWQ6IGouaWQsXG5cdFx0XHRcdFx0dGl0bGU6IGAke2oudGl0bGV9ICR7WS5leHRlcm5hbC50aW1lLmZyb21TZWNvbmRzKGouZHVyYXRpb24pfWAsXG5cdFx0XHRcdFx0ZGVzYzogai5kZXNjcmlwdGlvbi5yZXBsYWNlKC88YnIuPy4/Pi9nLCAnJyksXG5cdFx0XHRcdFx0dGg6IGRlY29kZVVSSShqLnRodW1ibmFpbF9tZWRpdW0pXG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0eW91dHViZTogZnVuY3Rpb24gKGosIGlkKSB7XG5cdFx0XHRcdGlmIChqLnBhZ2VJbmZvLnRvdGFsUmVzdWx0cyA8IDEgfHwgai5pdGVtcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4geyBpZCwgZXJyb3I6IHRydWUgfTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGogPSBqLml0ZW1zWzBdO1xuXHRcdFx0XHRjb25zdCBvID0ge1xuXHRcdFx0XHRcdHNpdGU6ICd5b3V0dWJlJyxcblx0XHRcdFx0XHRpZCxcblx0XHRcdFx0XHR0aXRsZTogYCR7ai5zbmlwcGV0LnRpdGxlfSAke1kuZXh0ZXJuYWwudGltZS5mcm9tSXNvODYwMShqLmNvbnRlbnREZXRhaWxzLmR1cmF0aW9uKX1gLFxuXHRcdFx0XHRcdGRlc2M6IGouc25pcHBldC5kZXNjcmlwdGlvblxuXHRcdFx0XHRcdC8vIGFzcGVjdFJhdGlvOiBqLmNvbnRlbnREZXRhaWxzLmFzcGVjdFJhdGlvXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmV0dXJuIG87XG5cdFx0XHR9LFxuXHRcdFx0dmluZTogZnVuY3Rpb24gKHsgdGl0bGUsIHRodW1ibmFpbF91cmwgfSwgaWQpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzaXRlOiAndmluZScsXG5cdFx0XHRcdFx0aWQsXG5cdFx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdFx0dGg6IHJlbW92ZVNlYXJjaCh0aHVtYm5haWxfdXJsKVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdGdmeWNhdDogZnVuY3Rpb24gKGh0bWwsIGlkKSB7XG5cdFx0XHRcdGlmIChodG1sKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHNpdGU6ICdnZnljYXQnLFxuXHRcdFx0XHRcdFx0aWQ6IGlkLFxuXHRcdFx0XHRcdFx0dGl0bGU6IGlkXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHN0cmVhbWFibGU6IGZ1bmN0aW9uICh7IHRpdGxlIH0sIGlkKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0c2l0ZTogJ3N0cmVhbWFibGUnLFxuXHRcdFx0XHRcdGlkLFxuXHRcdFx0XHRcdHRpdGxlOiB0aXRsZSB8fCAnVW50aXRsZWQnXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRpZiAoIXRoaXMuZGJbZGF0YS5zaXRlXSkge1xuXHRcdFx0XHR0aGlzLmRiW2RhdGEuc2l0ZV0gPSB7fTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZGJbZGF0YS5zaXRlXVtkYXRhLmlkXSA9IGRhdGE7XG5cdFx0XHRyZXR1cm4gdGhpcy5zYXZlKCk7XG5cdFx0fSxcblx0XHR1bnNldDogZnVuY3Rpb24gKHsgc2l0ZSwgaWQgfSkge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ3Vuc2V0JywgZGF0YS5pZCk7XG5cdFx0XHRpZiAoc2l0ZSkge1xuXHRcdFx0XHRkZWxldGUgdGhpcy5kYltzaXRlXVtpZF07XG5cdFx0XHRcdHJldHVybiB0aGlzLnNhdmUoKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGxpbWl0REI6IGZ1bmN0aW9uIChtYXgsIGRiKSB7XG5cdFx0XHQvLyBsaW1pdHMgYW4gb2JqZWN0J3MgaXRlbXMgYnkgaGFsZiBvZiB0aGUgbWF4XG5cdFx0XHQvLyByZW1vdmVzIHRoZSBvbGRlciBpdGVtcyBhdCB0aGUgc3RhcnQgb2YgdGhlIG9iamVjdFxuXHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRiKTtcblxuXHRcdFx0Y29uc3QgaGFsZiA9IE1hdGguZmxvb3IobWF4IC8gMik7XG5cdFx0XHRsZXQgc3RhcnQ7XG5cdFx0XHRsZXQgbmRiO1xuXHRcdFx0bGV0IGk7XG5cblx0XHRcdGlmIChrZXlzLmxlbmd0aCA+IG1heCkge1xuXHRcdFx0XHRuZGIgPSB7fTtcblx0XHRcdFx0c3RhcnQgPSBrZXlzLmxlbmd0aCAtIGhhbGY7XG5cblx0XHRcdFx0Zm9yIChpID0gc3RhcnQ7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bmRiW2tleXNbaV1dID0gZGJba2V5c1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG5kYiB8fCBkYjtcblx0XHR9LFxuXHRcdHNhdmU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuZGIgPSB0aGlzLmxpbWl0REIoMTAwMCwgdGhpcy5kYik7XG5cdFx0XHRyZXR1cm4gc3RyZy5zYXZlKHRoaXMudmVyc2lvbiwgdGhpcy5kYik7XG5cdFx0fSxcblx0XHRoZWxwZXI6IHtcblx0XHRcdGN1dERlc2NyaXB0aW9uOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRpZiAoZGF0YS5kZXNjICYmIGRhdGEuZGVzYy5sZW5ndGggPiAxNDApIHtcblx0XHRcdFx0XHRkYXRhLmZ1bGwgPSBkYXRhLmRlc2M7XG5cdFx0XHRcdFx0ZGF0YS5kZXNjID0gYCR7ZGF0YS5kZXNjLnN1YnN0cigwLCAxMzApfSAuIC4gLmA7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHR9LFxuXHRcdFx0dGh1bWJuYWlsOiBmdW5jdGlvbiAoeyBpZCwgdGggfSkge1xuXHRcdFx0XHRfLnMoYFtkYXRhLXl0bWlkPVwiJHtpZH1cIl0ueXRtX3RyaWdnZXJgLCBlbCA9PiBlbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGJhY2tncm91bmQ6IHVybCgke3RofSlgKSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR0aW1lOiB7XG5cdFx0XHRrZWVwTWludXRlc0FuZFNlY29uZHM6IGZ1bmN0aW9uICh2LCBpKSB7XG5cdFx0XHRcdHJldHVybiBpID4gMSB8fCB2ID4gMDtcblx0XHRcdH0sXG5cdFx0XHRsZWFkaW5nWmVybzogZnVuY3Rpb24gKHYsIGkpIHtcblx0XHRcdFx0cmV0dXJuIGkgPiAwID8gKGAwMCR7dn1gKS5zbGljZSgtMikgOiB2O1xuXHRcdFx0fSxcblx0XHRcdGZyb21BcnJheTogZnVuY3Rpb24gKGEpIHtcblx0XHRcdFx0Ly8gW2RheXMsIGhvdXJzLCBtaW5zLCBzZWNzXVxuXHRcdFx0XHRsZXQgYjtcblxuXHRcdFx0XHRsZXQgcCA9ICcnO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIGVtcHR5IHZhbHVlcywgYnV0IGtlZXAgbG93ZXIgaW5kZXhlcyAobTpzKTsgYVtpXSA+IDAgfHwgaSA+IDFcblx0XHRcdFx0XHQvLyBBZGQgbGVhZGluZyAwJ3MsIGlnbm9yaW5nIHRoZSBmaXJzdCBpbmRleFxuXHRcdFx0XHRcdC8vIGEuc2xpY2UoMCwgMSkuY29uY2F0KGEuc2xpY2UoMSkpXG5cdFx0XHRcdFx0YiA9IGEuZmlsdGVyKHRoaXMua2VlcE1pbnV0ZXNBbmRTZWNvbmRzKS5tYXAodGhpcy5sZWFkaW5nWmVybyk7XG5cdFx0XHRcdFx0cCA9IGAoJHtiLmpvaW4oJzonKX0pYDtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSB0aGlzIHRpbWUuJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zb2xlLmluZm8oJ3l0bWEvL3RpbWUrYXJyYXknLCB7IGEsIGIsIHAgfSk7XG5cdFx0XHRcdHJldHVybiBwO1xuXHRcdFx0fSxcblx0XHRcdGZyb21Jc284NjAxOiBmdW5jdGlvbiAoaXNvODYwMSkge1xuXHRcdFx0XHQvLyBlZyBQVDNNLCBUMjlTXG5cdFx0XHRcdGxldCBhO1xuXG5cdFx0XHRcdGNvbnN0IHBhcnNlRGlnaXRzID0gcmVnID0+IHtcblx0XHRcdFx0XHRpZiAocmVnLnRlc3QoaXNvODYwMSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBSZWdFeHAubGFzdFBhcmVuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBQI0RUI0gjTSNTIHx8IFBUI0gjTSNTXG5cdFx0XHRcdGEgPSBbLyhcXGQrKUQvLCAvKFxcZCspSC8sIC8oXFxkKylNLywgLyhcXGQrKVMvXS5tYXAocGFyc2VEaWdpdHMpO1xuXG5cdFx0XHRcdHJldHVybiB0aGlzLmZyb21BcnJheShhKTtcblx0XHRcdH0sXG5cdFx0XHRmcm9tU2Vjb25kczogZnVuY3Rpb24gKHNlY29uZHMpIHtcblx0XHRcdFx0Y29uc3QgYSA9IFtcblx0XHRcdFx0XHRNYXRoLmZsb29yKHNlY29uZHMgLyA4NjQwMCkgJSAyNCxcblx0XHRcdFx0XHRNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKSAlIDYwLFxuXHRcdFx0XHRcdE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKSAlIDYwLFxuXHRcdFx0XHRcdHNlY29uZHMgJSA2MFxuXHRcdFx0XHRdO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5mcm9tQXJyYXkoYSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR2YWxpZGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdGlmICghZGF0YSB8fCAhZGF0YS5pZCB8fCBkYXRhLmVycm9yKSB7XG5cdFx0XHRcdHJldHVybiBZLmFqYXguZmFpbHVyZS5jYWxsKGRhdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB0b2RvPyBlbXB0eSB0aXRsZXMgYW5kIGRlc2NyaXB0aW9ucyBzaG91bGQgYmUgb2theVxuXHRcdFx0Ly8gaWYgKGRhdGEuaWQgJiYgIWRhdGEudGl0bGUgJiYgIWRhdGEuZGVzYykge1xuXHRcdFx0Ly8gXHR0aGlzLnVuc2V0KGRhdGEuaWQpO1xuXHRcdFx0Ly8gXHRyZXR1cm4gWVRNQS5hamF4LmZhaWx1cmUuY2FsbChkYXRhKTtcblx0XHRcdC8vIH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblx0XHRwb3B1bGF0ZTogZnVuY3Rpb24gKGRhdGEsIGlnbm9yZVZhbGlkYXRpb24pIHtcblx0XHRcdGlmICghaWdub3JlVmFsaWRhdGlvbiAmJiAhdGhpcy52YWxpZGF0ZShkYXRhKSkgeyByZXR1cm47IH1cblxuXHRcdFx0dGhpcy5zZXQoZGF0YSk7XG5cdFx0XHRjb25zdCB7IGlkLCB0aCwgZnVsbCwgZGVzYywgdGl0bGUgfSA9IGRhdGE7XG5cblx0XHRcdGlmICh0aCkgeyB0aGlzLmhlbHBlci50aHVtYm5haWwoZGF0YSk7IH1cblxuXHRcdFx0Xy5zKGAueXRtX2JkLl8ke1kuZXNjYXBlSWQoaWQpfWAsIGVsID0+IHtcblx0XHRcdFx0ZWwuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwieXRtX3RpdGxlXCI+JHt0aXRsZX08L3NwYW4+YDtcblx0XHRcdFx0aWYgKGRlc2MpIHtcblx0XHRcdFx0XHRjb25zdCBxID0gXy5lKCdxJywgeyBjbGFzc05hbWU6ICd5dG1fZGVzY3IgeXRtX2Jsb2NrJywgdGV4dENvbnRlbnQ6IGRlc2MgfSwgZWwpO1xuXHRcdFx0XHRcdGlmIChmdWxsLmxlbmd0aCA+IGRlc2MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRxLmRhdGFzZXQuZnVsbCA9IGZ1bGw7XG5cdFx0XHRcdFx0XHRxLnRpdGxlID0gJ0RvdWJsZSBjbGljayB0byB0b2dnbGUgdGhlIGRlc2NyaXB0aW9uLic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGRhdGFGcm9tU3RvcmFnZTogZnVuY3Rpb24gKHNpdGUsIGlkKSB7XG5cdFx0XHRpZiAodGhpcy5kYiAmJiB0aGlzLmRiW3NpdGVdKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmRiW3NpdGVdW2lkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdFkuZXh0ZXJuYWwuZGIgPSBzdHJnLmdyYWIoWS5leHRlcm5hbC52ZXJzaW9uLCB7fSk7XG5cblx0LyoqIERhdGFiYXNlICovXG5cdFkuREIgPSB7XG5cdFx0cG9zdEluaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChZLnVzZXIucHJlZmVyZW5jZXMueXRfbm9jb29raWUpIHtcblx0XHRcdFx0WS5EQi5zaXRlcy55b3V0dWJlLmhvbWUgPSAnaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb20vJztcblx0XHRcdFx0WS5EQi5zaXRlcy55b3V0dWJlLmVtYmVkID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkLyVrZXknO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZXh0ZW5zaW9uOiB3aW5kb3cuY2hyb21lICYmIHdpbmRvdy5jaHJvbWUuZXh0ZW5zaW9uLFxuXHRcdHNpdGVzOiB7IC8vIHN1cHBvcnRlZCBzaXRlcyAtIHRvIGFkZCBtb3JlIGFsc28gbWFrZSBhIHBhcnNlciAoaWYgYXBpIGlzIGF2YWlsYWJsZSkgYW5kIGFkZCBhbiBpdGVtIHRvIHNvdXJjZXMgKGlmIG5lY2Vzc2FyeSlcblx0XHRcdHlvdXR1YmU6IHtcblx0XHRcdFx0dGl0bGU6ICd5dG1hIScsXG5cdFx0XHRcdGhvbWU6ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS8nLFxuXHRcdFx0XHRlbWJlZDogJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyVrZXknLFxuXHRcdFx0XHRhamF4OiBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My92aWRlb3M/cGFydD1zbmlwcGV0LGNvbnRlbnREZXRhaWxzJmlkPSVrZXkke3dpbmRvdy5hdG9iKCdKbXRsZVQxQlNYcGhVM2xFVkc1SU5reHpSRVJ5VkVsWWFGWlRaV1JRUWpseVJIbzFjekJTY3pRelpuTT0nKX1gLFxuXHRcdFx0XHR0aHVtYjogJ3VybChodHRwczovL2kzLnl0aW1nLmNvbS92aS8la2V5LzEuanBnKScsXG5cdFx0XHRcdHNlbGVjdG9yOiAnYVtocmVmKj1cInlvdXR1YmUuXCJdLCBhW2hyZWYqPVwieW91dHUuYmUvXCJdJyxcblx0XHRcdFx0ZmF2aWNvbjogJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2Zhdmljb24uaWNvJyxcblx0XHRcdFx0a2V5OiAnaWQnLFxuXHRcdFx0XHRyZWc6ICcoeW91dHUpJyxcblx0XHRcdFx0bWF0Y2hlcjogLyg/Oig/Oig/OnY9fCNwXFwvdVxcL1xcZCo/XFwvKXwoPzp2PXwjcFxcL2NcXC9bYS16QS1aMC05XStcXC9cXGQqP1xcLyl8KD86ZW1iZWRcXC8pfCg/OnZcXC8pfCg/OlxcLmJlXFwvKSkoW0EtWmEtejAtOS1fXXsxMX0pKS9pLFxuXHRcdFx0XHRodHRwczogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHZpbWVvOiB7XG5cdFx0XHRcdHRpdGxlOiAndmltZW8gdG9vIScsXG5cdFx0XHRcdGhvbWU6ICdodHRwczovL3ZpbWVvLmNvbS8nLFxuXHRcdFx0XHRlbWJlZDogJ2h0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8la2V5P2JhZGdlPTAnLFxuXHRcdFx0XHRhamF4OiAnaHR0cHM6Ly92aW1lby5jb20vYXBpL3YyL3ZpZGVvLyVrZXkuanNvbicsXG5cdFx0XHRcdHNlbGVjdG9yOiAnYVtocmVmKj1cInZpbWVvLmNvbS9cIl0nLFxuXHRcdFx0XHRmYXZpY29uOiAnaHR0cHM6Ly9mLnZpbWVvY2RuLmNvbS9pbWFnZXNfdjYvZmF2aWNvbi5pY28nLFxuXHRcdFx0XHRrZXk6ICdpZCcsXG5cdFx0XHRcdHJlZzogJyh2aW1lbyknLFxuXHRcdFx0XHRtYXRjaGVyOiAvKD86dmltZW9cXC5jb21cXC8oXFxkKykpL2ksXG5cdFx0XHRcdGh0dHBzOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0dmluZToge1xuXHRcdFx0XHR0aXRsZTogJ3ZpbmUgbWUhJyxcblx0XHRcdFx0aG9tZTogJ2h0dHBzOi8vdmluZS5jby8nLFxuXHRcdFx0XHRlbWJlZDogJ2h0dHBzOi8vdmluZS5jby92LyVrZXkvZW1iZWQvc2ltcGxlP2F1ZGlvPTEnLFxuXHRcdFx0XHRhamF4RXh0ZW5zaW9uOiB0cnVlLFxuXHRcdFx0XHRhamF4OiAnaHR0cHM6Ly92aW5lLmNvL29lbWJlZC5qc29uP3VybD1odHRwcyUzQSUyRiUyRnZpbmUuY28lMkZ2JTJGJWtleScsXG5cdFx0XHRcdHNlbGVjdG9yOiAnYVtocmVmKj1cInZpbmUuY28vXCJdJyxcblx0XHRcdFx0ZmF2aWNvbjogJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQkFBQUFBUUNBWUFBQUFmOC85aEFBQUJja2xFUVZRNGpYMlN2eXZGWVJUR1ArOU5kekFZYnBJa3lzQS9JQ25Lb0V3dkE0dmxVa295R1F6dm9PaUs0UjBZYkRMaERoYmk5bWFXSWpFcWNTY1dreVJoTU56WGNNLzNPbjM5T010NW52T2U4NXdmdlNiR3lIOW1nczhDcThBVWtBTWVnVTFnSlZwWHFmdTN1bXBid0lUaUxVQkI4SEpHdXJ5YjRLTUovaXpWdlVNVm53Tmp3SlB3R1lDTWtMTDR6bFQzWG9VTDBib0Q0RkJOVWhPNEZkOW9nbTlTUlZtRm44VW5hNzlxZ1d1VjJLM3d2Y0xKZEczaUw3VGFpVW9jQUk0Rm4wdm5IREJyZ3QrTDFnMnEzTm9FbDhDSDRLSGtNVnIzQ1N3STdRZU9UUEE5V3NBay84QUV2dytNU3J3cldsZXVKUVZmQUJaSldiVE9aQlRmVlhnNmxiZ0VIS2pRVGNMMUJGbmdBV2ltZXVIMmFOMkx2SFVEVjFKY2pOYmwwemRJOWwwVDJwRHNib0t2QjdZbC9nYTRYMitna3UrQVZxQUM5QUZ6d0xpazVLTjF4VDhGUkdRRU9CTDZ5ZmRuMm9uV1RaS3lURG9RclNzQjYwS1Q0bE5TaC8xVFFFVG1nUTFab3dRTXk0MSsyQmVMUlhlUmFLdUhTQUFBQUFCSlJVNUVya0pnZ2c9PScsXG5cdFx0XHRcdGtleTogJ2lkJyxcblx0XHRcdFx0cmVnOiAnKHZpbmUpJyxcblx0XHRcdFx0bWF0Y2hlcjogLyg/OnZpbmVcXC5jb1xcL3ZcXC8oW0EtWmEtejAtOS1fXXsxMX0pKS9pXG5cdFx0XHR9LFxuXHRcdFx0c291bmRjbG91ZDoge1xuXHRcdFx0XHR0aXRsZTogJ3NvdW5kIG9mZiEnLFxuXHRcdFx0XHRob21lOiAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS8nLFxuXHRcdFx0XHRlbWJlZDogJ2h0dHBzOi8vdy5zb3VuZGNsb3VkLmNvbS9wbGF5ZXIvP3Nob3dfY29tbWVudHM9ZmFsc2UmdXJsPSVrZXknLFxuXHRcdFx0XHRhamF4OiAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9vZW1iZWQ/Zm9ybWF0PWpzb24mdXJsPSV1cmknLFxuXHRcdFx0XHRmYXZpY29uOiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBd0FBQUFNQ0FZQUFBQldkVnpuQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUFYWkpSRUZVZU5wMFVqRk93MEFRbkQzYkNZYUVvSWdpVUlRS2lraUFLS0dnU0FrRkwwQlEwRkVnVWZFQ1NocGV3QitRRUUrZ29rRGlCeEdSaUNDRUJCekhkOHVjTFlHUTRLdzcrOWF6YzdPeko2b0tuRllVeGdEK1cvREhZTkE1NEdJb29pZlRpdFlxZzFva2FQRmZmNkJjVExGNWZFQ1liNUlKTkoza01mVVAyZHhIUHljd2NRMFNsaUFSb2NTR3NBNDZZa0tXUVcwR1M2QkRBR2x1NU15dTg0QWdTbUhLTS9EWTBOZWd3d1IyK0FKclNqQnJlNUJhQTFIN0dGS3BJNzI5UUhwOWpxaWFlVEJuNW1CN2ZXaXJqV0I5QjlKWUJyd0VNbm9wNWQwemZENTNZTzl2WU1ZOFNRY3BaR2tUWnZzSXN0aWl2RGZvYXhmSXh0OGV4WWVYQ0xZT1NPd2xKWlE2dHdTcEwwRGZYNEVvWnRrQ3FjNy9OamFsYnhuZmR0K29Td2h1cmtCbkNXSS8xRmxncWdLTlozSm5aRFNBM0ZGU3BZZFFBb0Y1NnRLTkRtaE9ZVHpKM09TSFhaa2ZsSmhZRXlhd2NuSDAySHBteForRHJSSmxnbWFjdnJzSFJtSGxuMnRSbklpQXk1V1RMd0VHQUs0UW9CUW10R0hrQUFBQUFFbEZUa1N1UW1DQycsXG5cdFx0XHRcdHNlbGVjdG9yOiAnYVtocmVmKj1cInNvdW5kY2xvdWQuY29tL1wiXScsXG5cdFx0XHRcdGtleTogJ3VyaScsXG5cdFx0XHRcdHJlZzogJyhzb3VuZGNsb3VkKScsXG5cdFx0XHRcdG1hdGNoZXI6IC8oPzpcXC9cXC8oPzpcXGJ3d3d8bVxcLlxcYik/c291bmRjbG91ZFxcLmNvbVxcLyguKz9cXC8uKykpL2ksXG5cdFx0XHRcdGh0dHBzOiB0cnVlLFxuXHRcdFx0XHRzY3JvbGw6IHRydWVcblx0XHRcdH0sXG5cdFx0XHRnZnljYXQ6IHtcblx0XHRcdFx0dGl0bGU6ICdnZnljYXQgbWVvdyEnLFxuXHRcdFx0XHRob21lOiAnaHR0cHM6Ly9nZnljYXQuY29tLycsXG5cdFx0XHRcdGVtYmVkOiAnaHR0cHM6Ly9nZnljYXQuY29tL2lmcmFtZS8la2V5Jyxcblx0XHRcdFx0YWpheEV4dGVuc2lvbjogdHJ1ZSxcblx0XHRcdFx0cmF3UmVzcG9uc2U6IHRydWUsXG5cdFx0XHRcdGFqYXg6ICdodHRwczovL2dmeWNhdC5jb20vJWtleScsXG5cdFx0XHRcdHRodW1iOiAndXJsKGh0dHBzOi8vdGh1bWJzLmdmeWNhdC5jb20vJWtleS1wb3N0ZXIuanBnKScsXG5cdFx0XHRcdHNlbGVjdG9yOiAnYVtocmVmKj1cImdmeWNhdC5jb20vXCJdJyxcblx0XHRcdFx0ZmF2aWNvbjogJ2h0dHBzOi8vZ2Z5Y2F0LmNvbS9mYXZpY29uLmljbycsXG5cdFx0XHRcdGtleTogJ2lkJyxcblx0XHRcdFx0cmVnOiAnKGdmeWNhdCknLFxuXHRcdFx0XHRtYXRjaGVyOiAvKD86Z2Z5Y2F0XFwuY29tXFwvKD86KFxcYig/OltBLVpdW2Etel0qKXszLH1cXGIpKSkvaSxcblx0XHRcdFx0aHR0cHM6IHRydWUsXG5cdFx0XHRcdHNjcm9sbDogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHN0cmVhbWFibGU6IHtcblx0XHRcdFx0dGl0bGU6ICdzdHJlYW1hYmxlIScsXG5cdFx0XHRcdGhvbWU6ICdodHRwczovL3N0cmVhbWFibGUuY29tLycsXG5cdFx0XHRcdGVtYmVkOiAnaHR0cHM6Ly9zdHJlYW1hYmxlLmNvbS9lLyVrZXknLFxuXHRcdFx0XHRhamF4OiAnaHR0cHM6Ly9hcGkuc3RyZWFtYWJsZS5jb20vb2VtYmVkLmpzb24/dXJsPSV1cmknLFxuXHRcdFx0XHR0aHVtYjogJ3VybChodHRwczovL2Nkbi5zdHJlYW1hYmxlLmNvbS9pbWFnZS8la2V5LmpwZyknLFxuXHRcdFx0XHRzZWxlY3RvcjogJ2FbaHJlZio9XCJzdHJlYW1hYmxlLmNvbS9cIl0nLFxuXHRcdFx0XHRmYXZpY29uOiAnaHR0cHM6Ly9zdHJlYW1hYmxlLmNvbS9mYXZpY29uLmljbycsXG5cdFx0XHRcdGtleTogJ2lkJyxcblx0XHRcdFx0cmVnOiAnKHN0cmVhbWFibGVcXFxcLmNvbSknLFxuXHRcdFx0XHRtYXRjaGVyOiAvKD86c3RyZWFtYWJsZVxcLmNvbVxcLyhbQS1aYS16MC05LV9dKykpL2ksXG5cdFx0XHRcdGh0dHBzOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0aW1ndXI6IHtcblx0XHRcdFx0dGl0bGU6ICdpbWd1ciBpdCEnLFxuXHRcdFx0XHRob21lOiAnaHR0cHM6Ly9pLmltZ3VyLmNvbS8nLFxuXHRcdFx0XHRlbWJlZDogJ2h0dHBzOi8vaS5pbWd1ci5jb20vJWtleScsXG5cdFx0XHRcdHRodW1iOiAndXJsKGh0dHBzOi8vaS5pbWd1ci5jb20vJWtleWguanBnKScsXG5cdFx0XHRcdHNlbGVjdG9yOiAnYVtocmVmKj1cIi5naWZ2XCJdJyxcblx0XHRcdFx0ZmF2aWNvbjogJ2h0dHBzOi8vaW1ndXIuY29tL2Zhdmljb24uaWNvJyxcblx0XHRcdFx0cmVnOiAnKFxcXFwuZ2lmdiQpfChpbWd1ciknLFxuXHRcdFx0XHRtYXRjaGVyOiAvKD86aW1ndXJcXC5jb21cXC8oXFx3KylcXC4oPzpnaWZ2fG1wNHx3ZWJtKSkvaSxcblx0XHRcdFx0aHR0cHM6IHRydWUsXG5cdFx0XHRcdHNjcm9sbDogdHJ1ZSxcblx0XHRcdFx0dmlkZW9UYWc6IHRydWVcblx0XHRcdH0sXG5cdFx0XHRodG1sNToge1xuXHRcdFx0XHRob21lOiB0cnVlLFxuXHRcdFx0XHR0aXRsZTogJ2h0bWw1IGdvIScsXG5cdFx0XHRcdHNlbGVjdG9yOiAnYVtocmVmKj1cIi53ZWJtXCJdLCBhW2hyZWYqPVwiLm1wNFwiXScsXG5cdFx0XHRcdGZhdmljb246ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUEwQUFBQU5DQVlBQUFCeTYrUjhBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQWRsSlJFRlVlTnBja3M5ckUwRVV4NytiM1RSa3R4dmJoVWhyTm02U3JVV3R4eGJ4SjlpTGwwSkZLV2c4V0xEMDVFV2hJdVJpZW9nWHdZUFg0dEdiL2dQU3Evb1A2S0grdUcyTUZhUkpKWGFUYnA3Zldic2wrdUREekx4NTMzbHYzb3ptZXlVTTJWbFNKeGVJU1VMeWdUd2hyNU9nMUpEZ09YbFBycExSTUF4VElwTGxmSmE4SXB2L2k1NlJlNGxUMDdTWUtJcVFTaDJlTzAvZXFZbnVqSTM1SEY4TzE5anI5WEJuZVJtdDFqZTBkM2FnNjNxeTVaSUF2Tk9iRStXS1RKWEtrdEVOb1ZQc3JDbnRkbHNXRnhiaU5YTkp5UzNLZE1VWHh2OHc2THpZN1haaG1pWWVyOWZCWU9UelI1SEw1WEN6V3NXeFloRm5Ucy9neGNZR2dpQ0FaVm1PeWhSNUJWY204bmxadmJzaTI5KzNaZGdHZzRHczErdml1YTRVSmlaVnBraUplcW8wVmFJcXhiR1BTS2ZUT1JSZHVYUTU5cGVMeDVQeUl0V2FqOXlEUXRtdDIxWFl0bzFHb3hHdmJ5d3R4YU5oR0hFM2FiK1Y2TDZhS1ljelBvN1p1VGs4V251SVdxMkc2NHZYNEpVOHpKdzhCWFh2NUQyMWd4K3h5ZHJuN1ZFYi9mMCt0ajV0d2EvNCtQejFDNlk0T282RFpyT0pkRHJkWXV4a0lsS1ArWmJaem9WN2U4aXlrOGtELzlyZFJYcGtCSmxNcHNtREMvOThJOTdwUEYvL0FRVUJsLzIvalJ2c201YjFreG1lSmdKbGZ3UVlBS1pReGd6ZUk2L0VBQUFBQUVsRlRrU3VRbUNDJyxcblx0XHRcdFx0cmVnOiAnKFxcXFwud2VibSQpfChcXFxcLm1wNCQpJyxcblx0XHRcdFx0c2xpbTogdHJ1ZSxcblx0XHRcdFx0c2Nyb2xsOiB0cnVlLFxuXHRcdFx0XHR2aWRlb1RhZzogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdCdodG1sNS1hdWRpbyc6IHtcblx0XHRcdFx0aG9tZTogdHJ1ZSxcblx0XHRcdFx0dGl0bGU6ICdoZXksIGxpc3RlbiEnLFxuXHRcdFx0XHRzZWxlY3RvcjogJ2FbaHJlZio9XCIubXAzXCJdJyxcblx0XHRcdFx0cmVnOiAnKFxcXFwubXAzJCknLFxuXHRcdFx0XHRzbGltOiB0cnVlLFxuXHRcdFx0XHRzY3JvbGw6IHRydWVcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0Y2xhc3MgQ29udHJvbCBleHRlbmRzIENvbnRhaW5lciB7XG5cdFx0LyoqIFUgSSBDTEFTU1xuXHRcdCAqIENsYXNzIGZvciB0aGUgcGxheWVyIGNvbnRyb2xzXG5cdFx0ICogVGhpcyBpcyB0aGUgY29udHJvbCBiYXIgb25jZSB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHRodW1ibmFpbFxuXHRcdCAqIENvbnRhaW5zIGl0cyBvd24gaW5zdGFuY2Ugb2YgYSBQbGF5ZXJcblx0XHQgKiBBY3RzIGxpa2UgYSBkZWNvcmF0b3Igb24gdGhlIFlUTUEgYW5kIENvbnRhaW5lciBpbnRhbmNlcyBieSBhZGRpbmcgZXZlbnRzXG5cdFx0ICogQHBhcmFtIHtZfSB5dG1hIEEgWVRNQSBpbnN0YW5jZVxuXHRcdCAqL1xuXHRcdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHRcdHRoaXMub3BlbiA9IGZhbHNlO1xuXHRcdFx0dGhpcy5zZWxlY3RlZCA9IHsgc2l6ZTogbnVsbCwgcmF0aW86IG51bGwgfTtcblx0XHR9XG5cblx0XHRnZXRDb250cm9sKCkge1xuXHRcdFx0aWYgKCF0aGlzLnByb2plY3Rvcikge1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVByb2plY3RvcigpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Y3JlYXRlUHJvamVjdG9yKCkge1xuXHRcdFx0c3VwZXIuY3JlYXRlUHJvamVjdG9yKCk7XG5cdFx0XHR0aGlzLnByb2plY3Rvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIENvbnRyb2wuZXZlbnRzLnZpZGVvQmFyLmJpbmQodGhpcyksIGZhbHNlKTtcblx0XHRcdHRoaXMucGxheSA9IG5ldyBQbGF5ZXIodGhpcyk7XG5cblx0XHRcdHRoaXMubWFya1NlbGVjdGVkKGBsaVtkYXRhLXR5cGU9XCJzaXplXCJdW2RhdGEtdmFsdWU9XCIke3RoaXMucGxheS5hdHRycy5zaXplfVwiXWAsICdzaXplJyk7XG5cdFx0XHR0aGlzLm1hcmtTZWxlY3RlZChgbGlbZGF0YS10eXBlPVwicmF0aW9cIl1bZGF0YS12YWx1ZT1cIiR7dGhpcy5wbGF5LmF0dHJzLnJhdGlvfVwiXWAsICdyYXRpbycpO1xuXHRcdH1cblxuXHRcdHJlc2V0Vmlld1NpemUoKSB7XG5cdFx0XHR0aGlzLnBsYXkuZGltbWVuc2lvbnMoKTtcblx0XHRcdHRoaXMuc2V0Q29udHJvbEJhclNpemUodGhpcy5wbGF5LmF0dHJzLnNpemUpO1xuXHRcdH1cblxuXHRcdHNob3dPblNjcm9sbChsaW5rKSB7XG5cdFx0XHRpZiAoIXRoaXMub3BlbiAmJiB0aGlzLmNhblNob3dVbmRlcihsaW5rKSkge1xuXHRcdFx0XHR0aGlzLnNob3dQbGF5ZXIoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzaG93UGxheWVyKCkge1xuXHRcdFx0dGhpcy5vcGVuID0gdHJ1ZTtcblxuXHRcdFx0c3VwZXIuc2hvd1BsYXllcigpO1xuXHRcdFx0dGhpcy5hdHRhY2hQbGF5ZXJQYW5lbCgpO1xuXHRcdFx0dGhpcy5wbGF5LnN3aXRjaE9uKCk7XG5cblx0XHRcdGlmIChZLnVzZXIucHJlZmVyZW5jZXMuZm9jdXMpIHtcblx0XHRcdFx0ZG9jdW1lbnQubG9jYXRpb24uaGFzaCA9IGAjJHt0aGlzLmJvZHkuaWR9YDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoaWRlUGxheWVyKCkge1xuXHRcdFx0dGhpcy5vcGVuID0gZmFsc2U7XG5cblx0XHRcdHRoaXMucGxheS5zd2l0Y2hPZmYoKTtcblx0XHRcdHN1cGVyLmhpZGVQbGF5ZXIoKTtcblx0XHR9XG5cblx0XHRhdHRhY2hQbGF5ZXJQYW5lbCgpIHtcblx0XHRcdGlmICghdGhpcy5wbGF5LnBhbmVsLnBhcmVudE5vZGUpIHtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ2F0dGFjaGluZyBkaXNwbGF5IHBhbmVsJyk7XG5cdFx0XHRcdHRoaXMucHJvamVjdG9yLmFwcGVuZENoaWxkKHRoaXMucGxheS5wYW5lbCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aGlkZUFsbFBsYXllcnMoKSB7XG5cdFx0XHRjb25zdCBncm91cCA9IFkuY29sbGVjdCh0aGlzLnN0YXRlLmlkKTtcblx0XHRcdGNvbnNvbGUuaW5mbygneXRtYS8vaGlkZSthbGwoaWQpJywgdGhpcy5zdGF0ZS5pZCwgZ3JvdXAubGVuZ3RoKTtcblx0XHRcdGdyb3VwLmZvckVhY2goZyA9PiB7XG5cdFx0XHRcdGcuZGlzYWJsZU9wZW5PblNjcm9sbCgpO1xuXHRcdFx0XHRnLmdldENvbnRyb2woKS5oaWRlUGxheWVyKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzZXRDb250cm9sQmFyU2l6ZShzaXplKSB7XG5cdFx0XHR0aGlzLm1hcmtTZWxlY3RlZChgbGlbZGF0YS10eXBlPVwic2l6ZVwiXVtkYXRhLXZhbHVlPVwiJHtzaXplfVwiXWAsICdzaXplJyk7XG5cdFx0fVxuXG5cdFx0bWFya1NlbGVjdGVkKGVsLCB0eXBlKSB7XG5cdFx0XHRpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRlbCA9IHRoaXMucHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoZWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWwuaWQgPSB0eXBlICsgdGhpcy5zdGF0ZS51aWQ7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkW3R5cGVdLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHsgfVxuXHRcdFx0dGhpcy5zZWxlY3RlZFt0eXBlXSA9IGVsO1xuXHRcdH1cblx0fVxuXG5cdENvbnRyb2wucmF0aW9zID0ge1xuXHRcdFNEOiAxLFxuXHRcdEhEOiAyLFxuXHRcdFBPUlRSQUlUOiAzXG5cdH07XG5cblx0Q29udHJvbC5zaXplcyA9IHtcblx0XHRISURERU46IDAsXG5cdFx0UzogMjQwLFxuXHRcdE06IDM2MCxcblx0XHRMOiA0ODAsXG5cdFx0WDogNzIwXG5cdH07XG5cblx0LyoqIFRyaWdnZXIgaXMgdGhlIFZBUiBlbGVtZW50XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHQgVkFSIGVsZW1lbnRcblx0ICovXG5cdENvbnRyb2wuY3JlYXRlRnJvbVRyaWdnZXIgPSB0ID0+IHtcblx0XHQvLyBjb25zb2xlLmluZm8oJ3l0bWEvL3RyaWdnZXInKTtcblx0XHRpZiAodCAmJiB0LmRhdGFzZXQueXRtdWlkICYmICFZLnNldFt0LmRhdGFzZXQueXRtdWlkXSkge1xuXHRcdFx0Y29uc29sZS5pbmZvKCd5dG1hLy90cmlnZ2VyK25ldycpO1xuXHRcdFx0WS5hZGRUb1NldChuZXcgQ29udHJvbCgpLnJlYWN0aXZhdGUodCkpO1xuXHRcdH1cblx0XHRjb25zb2xlLmluZm8oJ3l0bWEvL3RyaWdnZXIrY29udHJvbCcpO1xuXHRcdHJldHVybiBZLnNldFt0LmRhdGFzZXQueXRtdWlkXS5nZXRDb250cm9sKCk7XG5cdH07XG5cblx0Q29udHJvbC5ldmVudHMgPSB7XG5cdFx0JGZpcmU6IHtcblx0XHRcdHNldHRpbmdzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFkudXNlci5ldmVudHMuZm9ybVRvZ2dsZSgpO1xuXHRcdFx0fSxcblx0XHRcdGNsb3NlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICh0aGlzLnNpdGUuc2Nyb2xsKSB7XG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ2V2ZW50cy5jbG9zZS0xJyk7XG5cdFx0XHRcdFx0dGhpcy5oaWRlQWxsUGxheWVycygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdldmVudHMuY2xvc2UtMicpO1xuXHRcdFx0XHRcdHRoaXMuZGlzYWJsZU9wZW5PblNjcm9sbCgpO1xuXHRcdFx0XHRcdHRoaXMuaGlkZVBsYXllcigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cmF0aW86IGZ1bmN0aW9uIChsaSkge1xuXHRcdFx0XHRjb25zdCByYXRpbyA9IHBhcnNlSW50KGxpLmRhdGFzZXQudmFsdWUsIDEwKTtcblx0XHRcdFx0dGhpcy5wbGF5LmRpbW1lbnNpb25zKHsgcmF0aW8gfSk7XG5cdFx0XHRcdHRoaXMubWFya1NlbGVjdGVkKGxpLCAncmF0aW8nKTtcblx0XHRcdH0sXG5cdFx0XHRzaXplOiBmdW5jdGlvbiAobGkpIHtcblx0XHRcdFx0Y29uc3Qgc2l6ZSA9IHBhcnNlSW50KGxpLmRhdGFzZXQudmFsdWUsIDEwKTtcblx0XHRcdFx0dGhpcy5wbGF5LmRpbW1lbnNpb25zKHsgc2l6ZSB9KTtcblx0XHRcdFx0dGhpcy5tYXJrU2VsZWN0ZWQobGksICdzaXplJyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR2aWRlb0JhcjogZnVuY3Rpb24gKHsgdGFyZ2V0IH0pIHtcblx0XHRcdGlmICh0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnbGknICYmIHRhcmdldC5kYXRhc2V0ICYmIHRhcmdldC5kYXRhc2V0LnR5cGUpIHtcblx0XHRcdFx0Y29uc3QgdCA9IHRhcmdldC5kYXRhc2V0LnR5cGU7XG5cdFx0XHRcdGlmIChDb250cm9sLmV2ZW50cy4kZmlyZVt0XSkge1xuXHRcdFx0XHRcdENvbnRyb2wuZXZlbnRzLiRmaXJlW3RdLmNhbGwodGhpcywgdGFyZ2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvKiogUCBMIEEgWSBFIFIgQ0xBU1Ncblx0ICogIEBwYXJhbSB7Q29udHJvbH0gcGFyZW50IEluc3RhbmNlXG5cdCAqL1xuXHRjbGFzcyBQbGF5ZXIge1xuXG5cdFx0Y29uc3RydWN0b3IocGFyZW50KSB7XG5cdFx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblxuXHRcdFx0dGhpcy5tb2RlID0gJ29mZic7XG5cblx0XHRcdHRoaXMuYXR0cnMgPSB7XG5cdFx0XHRcdHNvdXJjZXM6IG51bGwsXG5cdFx0XHRcdHF1YWxpdHk6IHRoaXMucXVhbGl0eSxcblx0XHRcdFx0c2l6ZTogbnVsbCxcblx0XHRcdFx0cmF0aW86IG51bGwsXG5cdFx0XHRcdHN0YXJ0OiB0aGlzLnRpbWUoKSxcblx0XHRcdFx0dHlwZTogbnVsbFxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5hdHRycy5zb3VyY2VzID0gdGhpcy5zb3VyY2VzO1xuXG5cdFx0XHQvLyB0b2RvIGltcHJvdmUgdHlwZS9tZWRpYVxuXHRcdFx0dGhpcy5hdHRycy50eXBlID0gdGhpcy5maW5kVHlwZSgpO1xuXHRcdFx0dGhpcy5tZWRpYSA9IFBsYXllci5tYWtlTWVkaWFbdGhpcy5hdHRycy50eXBlXSh0aGlzKTtcblxuXHRcdFx0dGhpcy5jaGFubmVsID0gXy5lKCdkaXYnLCB7IGNsYXNzTmFtZTogJ3l0bV9wYW5lbF9jaGFubmVsIHl0bV9ibG9jaycgfSwgdGhpcy5tZWRpYSwgdHJ1ZSk7XG5cdFx0XHR0aGlzLnN3aXRjaGVyID0gXy5lKCdkaXYnLCB7IGNsYXNzTmFtZTogYHl0bV9wYW5lbF9zd2l0Y2hlciB5dG1fcGFuZWxfc2l6ZSB5dG1fYmxvY2sgeXRtXyR7dGhpcy5hdHRycy50eXBlfWAsIF95dG11aWQ6IHRoaXMucGFyZW50LnN0YXRlLnVpZCwgX3N0YW5kYnk6IHRydWUgfSk7XG5cdFx0XHR0aGlzLnBhbmVsID0gXy5lKCdkaXYnLCB7IGNsYXNzTmFtZTogJ3l0bV9wYW5lbCB5dG1fYmxvY2snIH0sIHRoaXMuc3dpdGNoZXIsIHRydWUpO1xuXG5cdFx0XHRpZiAocGFyZW50LnN0YXRlLnNpdGUgPT09ICdzb3VuZGNsb3VkJyAmJiBZLnJlZy5leHRyYS5zb3VuZGNsb3VkLnBsYXlsaXN0LnRlc3QocGFyZW50LmFuY2hvci5ocmVmKSkge1xuXHRcdFx0XHR0aGlzLm1lZGlhLmNsYXNzTGlzdC5hZGQoJ3l0bV9zb3VuZGNsb3VkLXBsYXlsaXN0Jyk7XG5cdFx0XHRcdHRoaXMuc3dpdGNoZXIuY2xhc3NMaXN0LmFkZCgneXRtX3NvdW5kY2xvdWQtcGxheWxpc3QnKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5kaW1tZW5zaW9ucyhZLnVzZXIucHJlZmVyZW5jZXMpO1xuXHRcdH1cblxuXHRcdGdldCBzb3VyY2VzKCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmV0dXJuIChQbGF5ZXIuc291cmNlc1t0aGlzLnBhcmVudC5zdGF0ZS5zaXRlXSB8fCBQbGF5ZXIuc291cmNlcy5pZnJhbWUpKHRoaXMucGFyZW50LnN0YXRlLCB0aGlzLmF0dHJzKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRnZXQgcXVhbGl0eSgpIHtcblx0XHRcdHJldHVybiBQbGF5ZXIucXVhbGl0aWVzW1kudXNlci5wcmVmZXJlbmNlcy5xdWFsaXR5XSB8fCBQbGF5ZXIucXVhbGl0aWVzWzM2MF07XG5cdFx0fVxuXG5cdFx0Z2V0IGNsYXNzTmFtZSgpIHtcblx0XHRcdHJldHVybiBgeXRtX3BhbmVsIHl0bV9ibG9jayB5dG1fcGFuZWwtJHtQbGF5ZXIuZGltbXMucmF0aW9zW3RoaXMuYXR0cnMucmF0aW9dfSB5dG1fcGFuZWwtJHtQbGF5ZXIuZGltbXMuc2l6ZXNbdGhpcy5hdHRycy5zaXplXX1gO1xuXHRcdH1cblxuXHRcdGRpbW1lbnNpb25zKHsgcmF0aW8sIHNpemUgfSkge1xuXHRcdFx0dGhpcy5hdHRycy5yYXRpbyA9IGlzTnVtYmVyKHJhdGlvKSA/IHJhdGlvIDogdGhpcy5hdHRycy5yYXRpbztcblx0XHRcdHRoaXMuYXR0cnMuc2l6ZSA9IGlzTnVtYmVyKHNpemUpID8gc2l6ZSA6IHRoaXMuYXR0cnMuc2l6ZTtcblx0XHRcdHRoaXMucGFuZWwuY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWU7XG5cdFx0fVxuXG5cdFx0dGltZSgpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIGRlYnVnZ2VyO1xuXHRcdFx0XHRjb25zdCBtID0gdGhpcy5wYXJlbnQuc3RhdGUudXJpLm1hdGNoKFkucmVnLnRpbWUpLnNsaWNlKDEsIDQpO1xuXHRcdFx0XHRyZXR1cm4gKCgrbVswXSB8fCAwKSAqIDYwICogNjApICsgKCgrbVsxXSB8fCAwKSAqIDYwKSArICgrbVsyXSB8fCAwKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHsgcmV0dXJuIDA7IH1cblx0XHR9XG5cblx0XHRmaW5kVHlwZSgpIHtcblx0XHRcdGlmICh0aGlzLnBhcmVudC5zdGF0ZS5zaXRlID09PSAnaHRtbDUtYXVkaW8nKSB7IHJldHVybiAnYXVkaW8nOyB9XG5cdFx0XHRpZiAodGhpcy5wYXJlbnQuc2l0ZS52aWRlb1RhZykgeyByZXR1cm4gJ3ZpZGVvJzsgfVxuXHRcdFx0cmV0dXJuICdpZnJhbWUnO1xuXHRcdH1cblxuXHRcdHN3aXRjaE9mZigpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdyZW1vdmVkIG1lZGlhJyk7XG5cblx0XHRcdGlmICh0aGlzLm1lZGlhLnBhdXNlKSB7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdwYXVzaW5nJyk7XG5cdFx0XHRcdHRoaXMubWVkaWEucGF1c2UoKTtcblx0XHRcdH1cblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhpcy5zd2l0Y2hlci5yZW1vdmVDaGlsZCh0aGlzLmNoYW5uZWwpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHQvLyBjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5tb2RlID0gJ29mZic7XG5cdFx0fVxuXG5cdFx0c3dpdGNoT24oKSB7XG5cdFx0XHRpZiAodGhpcy5hdHRycy5zaXplID09PSAwKSB7XG5cdFx0XHRcdHRoaXMuYXR0cnMuc2l6ZSA9IFkudXNlci5wcmVmZXJlbmNlcy5zaXplO1xuXHRcdFx0XHR0aGlzLnBhcmVudC5yZXNldFZpZXdTaXplKCk7XG5cdFx0XHR9XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnc3dpdGNoIHRvIG1lZGlhJyk7XG5cdFx0XHR0aGlzLnN3aXRjaGVyLmFwcGVuZENoaWxkKHRoaXMuY2hhbm5lbCk7XG5cdFx0XHR0aGlzLnN3aXRjaGVyLmRhdGFzZXQuc3RhbmRieSA9IGZhbHNlO1xuXHRcdFx0dGhpcy5tb2RlID0gJ29uJztcblx0XHR9XG5cblx0XHRzd2l0Y2hTdGFuZGJ5KCkge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ3N3aXRjaCB0byBzdGFuZGJ5Jyk7XG5cdFx0XHR0aGlzLnN3aXRjaE9mZigpO1xuXHRcdFx0dGhpcy5zd2l0Y2hlci5kYXRhc2V0LnN0YW5kYnkgPSB0cnVlO1xuXHRcdFx0dGhpcy5tb2RlID0gJ3N0YW5kYnknO1xuXHRcdH1cblxuXHRcdGlzU3RhbmRieSgpIHtcblx0XHRcdHJldHVybiB0aGlzLm1vZGUgPT09ICdzdGFuZGJ5Jztcblx0XHR9XG5cdH1cblxuXHRQbGF5ZXIuc291cmNlcyA9IHtcblx0XHRpZnJhbWU6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRjb25zdCBrZXkgPSBZLkRCLnNpdGVzW2RhdGEuc2l0ZV0ua2V5O1xuXG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7IHR5cGU6ICd0ZXh0L2h0bWwnLCBzcmM6IFkuREIuc2l0ZXNbZGF0YS5zaXRlXS5lbWJlZC5yZXBsYWNlKCcla2V5JywgZGF0YVtrZXldKSB9XG5cdFx0XHRdO1xuXHRcdH0sXG5cdFx0J2h0bWw1LWF1ZGlvJzogZnVuY3Rpb24gKHsgdXJpIH0pIHtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHsgdHlwZTogJ2F1ZGlvL21wMycsIHNyYzogdXJpIH1cblx0XHRcdF07XG5cdFx0fSxcblx0XHRodG1sNTogZnVuY3Rpb24gKHsgdXJpIH0pIHtcblx0XHRcdC8vIGF0dGFjaGluZyB0aGUgdHlwZSBhcyBlaXRoZXIgbXA0IG9yIHdlYm1cblxuXHRcdFx0aWYgKC8oPzp3ZWJtKS8udGVzdCh1cmkpKSB7XG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0eyB0eXBlOiAndmlkZW8vd2VibScsIHNyYzogdXJpIH1cblx0XHRcdFx0XTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0eyB0eXBlOiAndmlkZW8vbXA0Jywgc3JjOiB1cmkgfSxcblx0XHRcdFx0eyB0eXBlOiAndmlkZW8vd2VibScsIHNyYzogdXJpIH0sXG5cdFx0XHRcdHsgdHlwZTogJ3ZpZGVvL29nZzsgY29kZWNzPVwidGhlb3JhLCB2b3JiaXNcIicsIHNyYzogdXJpIH1cblx0XHRcdF07XG5cdFx0fSxcblx0XHRpbWd1cjogZnVuY3Rpb24gKHsgaWQgfSkge1xuXHRcdFx0Y29uc3Qgc3JjID0gWS5EQi5zaXRlcy5pbWd1ci5lbWJlZC5yZXBsYWNlKCcla2V5JywgaWQpO1xuXG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7IHR5cGU6ICd2aWRlby93ZWJtJywgc3JjOiBgJHtzcmN9LndlYm1gIH0sXG5cdFx0XHRcdHsgdHlwZTogJ3ZpZGVvL21wNCcsIHNyYzogYCR7c3JjfS5tcDRgIH1cblx0XHRcdF07XG5cdFx0fSxcblx0XHR5b3V0dWJlOiBmdW5jdGlvbiAoeyBpZCB9LCB7IHF1YWxpdHksIHN0YXJ0IH0pIHtcblx0XHRcdGNvbnN0IHBhcmFtcyA9IGA/aHRtbDU9MSZ2ZXJzaW9uPTMmbW9kZXN0YnJhbmRpbmc9MSZyZWw9MCZzaG93aW5mbz0xJnZxPSR7cXVhbGl0eX0maXZfbG9hZF9wb2xpY3k9JHtZLnVzZXIucHJlZmVyZW5jZXMueXRfYW5ub3RhdGlvbn0mc3RhcnQ9JHtzdGFydH0mcmVsPTBgO1xuXG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7IHR5cGU6ICd0ZXh0L2h0bWwnLCBzcmM6IFkuREIuc2l0ZXMueW91dHViZS5lbWJlZC5yZXBsYWNlKCcla2V5JywgaWQpICsgcGFyYW1zIH1cblx0XHRcdF07XG5cdFx0fVxuXHR9O1xuXG5cdFBsYXllci5kaW1tcyA9IHtcblx0XHRyYXRpb3M6IHtcblx0XHRcdDE6ICdzZCcsXG5cdFx0XHQyOiAnaGQnLFxuXHRcdFx0MzogJ3ByJ1xuXHRcdH0sXG5cdFx0c2l6ZXM6IHtcblx0XHRcdDA6ICdoJyxcblx0XHRcdDI0MDogJ3MnLFxuXHRcdFx0MzYwOiAnbScsXG5cdFx0XHQ0ODA6ICdsJyxcblx0XHRcdDcyMDogJ3hsJ1xuXHRcdH0sXG5cdFx0YXNwZWN0czoge1xuXHRcdFx0MTogNCAvIDMsXG5cdFx0XHQyOiAxNiAvIDksXG5cdFx0XHQzOiAxNiAvIDlcblx0XHR9XG5cdH07XG5cblx0UGxheWVyLnF1YWxpdGllcyA9IHtcblx0XHQyNDA6ICdzbWFsbCcsXG5cdFx0MzYwOiAnbWVkaXVtJyxcblx0XHQ0ODA6ICdsYXJnZScsXG5cdFx0NzIwOiAnaGQ3MjAnLFxuXHRcdDEwODA6ICdoZDEwODAnLFxuXHRcdDEwODE6ICdoaWdocmVzJ1xuXHR9O1xuXG5cdFBsYXllci5jc3MgPSB7XG5cdFx0aXRlbTogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdGlmIChpc051bWJlcih2YWx1ZSkpIHtcblx0XHRcdFx0dmFsdWUgKz0gJ3B4Jztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGBcXHQke2tleX06ICR7dmFsdWV9O1xcbmA7XG5cdFx0fSxcblx0XHRpdGVyOiBmdW5jdGlvbiAoY3NzLCBjc3NFbnRyaWVzKSB7XG5cdFx0XHRfLm8oY3NzRW50cmllcywgKGtleSwgdmFsdWUpID0+IHtcblx0XHRcdFx0Y3NzLnB1c2goUGxheWVyLmNzcy5pdGVtKGtleSwgdmFsdWUpKTtcblx0XHRcdH0pO1xuXHRcdFx0Y3NzLnB1c2goJ30nKTtcblx0XHR9LFxuXHRcdGdlbmVyYXRvcjogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3QgY3NzID0gW107XG5cblx0XHRcdF8ubyh0aGlzLnNpemVzLCAoc2l6ZSwgc2l6ZXMpID0+IHtcblx0XHRcdFx0Xy5vKHNpemVzLCAoZGltbSwga2V5cykgPT4ge1xuXHRcdFx0XHRcdGNzcy5wdXNoKGBcXG4ueXRtX3BhbmVsLSR7c2l6ZX0ueXRtX3BhbmVsLSR7ZGltbX0gLnl0bV9wYW5lbF9zaXplIHtcXG5gKTtcblx0XHRcdFx0XHRQbGF5ZXIuY3NzLml0ZXIoY3NzLCBrZXlzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gYWRkIHNpdGUgb3ZlcnJpZGVzXG5cdFx0XHRfLm8odGhpcy5zaXRlcywgKHNpdGUsIGRhdGEpID0+IHtcblx0XHRcdFx0Xy5vKGRhdGEsIChzZXR0aW5nLCBrZXlzKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHNldHRpbmcgPT09ICdhbGwnKSB7XG5cdFx0XHRcdFx0XHRjc3MucHVzaChgXFxuLnl0bV9zaXRlXyR7c2l0ZX0gLnl0bV9wYW5lbF9zaXplIHtcXG5gKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y3NzLnB1c2goYFxcbi55dG1fc2l0ZV8ke3NpdGV9IC55dG1fcGFuZWwtJHtzZXR0aW5nfSAueXRtX3BhbmVsX3NpemUge1xcbmApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRQbGF5ZXIuY3NzLml0ZXIoY3NzLCBrZXlzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGNzcy5qb2luKCcnKTtcblx0XHR9LFxuXHRcdHNpemVzOiAoKCkgPT4ge1xuXHRcdFx0Y29uc3QgbWVyZ2UgPSB7fTtcblxuXHRcdFx0Xy5vKFBsYXllci5kaW1tcy5zaXplcywgKG51bSwgc2l6ZSkgPT4ge1xuXHRcdFx0XHRpZiAobnVtID49IDApIHtcblx0XHRcdFx0XHRtZXJnZVtzaXplXSA9IHt9O1xuXG5cdFx0XHRcdFx0Xy5vKFBsYXllci5kaW1tcy5yYXRpb3MsIChrLCByYXRpbykgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHJhdGlvID09PSAncHInKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHcgPSBNYXRoLmZsb29yKG51bSAqIDAuOTUpOyAvLyBzbWFsbGVyIHRoYW4gdGhlIG5vcm1hbCBzaXplc1xuXHRcdFx0XHRcdFx0XHRtZXJnZVtzaXplXVtyYXRpb10gPSB7XG5cdFx0XHRcdFx0XHRcdFx0d2lkdGg6IHcsXG5cdFx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBNYXRoLmZsb29yKHcgKiBQbGF5ZXIuZGltbXMuYXNwZWN0c1trXSlcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdG1lcmdlW3NpemVdW3JhdGlvXSA9IHtcblx0XHRcdFx0XHRcdFx0XHR3aWR0aDogTWF0aC5mbG9vcihudW0gKiBQbGF5ZXIuZGltbXMuYXNwZWN0c1trXSksXG5cdFx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBudW1cblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBtZXJnZTtcblx0XHR9KSgpLFxuXHRcdHNpdGVzOiB7IC8vIGN1c3RvbSBzaXplcyBwZXIgc2l0ZVxuXHRcdFx0c291bmRjbG91ZDoge1xuXHRcdFx0XHRhbGw6IHtcblx0XHRcdFx0XHRoZWlnaHQ6ICcxMThweCAhaW1wb3J0YW50J1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0dmluZToge1xuXHRcdFx0XHRzOiB7XG5cdFx0XHRcdFx0d2lkdGg6IDI0MCxcblx0XHRcdFx0XHRoZWlnaHQ6IDI0MFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRtOiB7XG5cdFx0XHRcdFx0d2lkdGg6IDM2MCxcblx0XHRcdFx0XHRoZWlnaHQ6IDM2MFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRsOiB7XG5cdFx0XHRcdFx0d2lkdGg6IDQ4MCxcblx0XHRcdFx0XHRoZWlnaHQ6IDQ4MFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR4bDoge1xuXHRcdFx0XHRcdHdpZHRoOiA3MjAsXG5cdFx0XHRcdFx0aGVpZ2h0OiA3MjBcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRQbGF5ZXIubWFrZU1lZGlhID0ge1xuXHRcdCRjc3M6IGZ1bmN0aW9uICh0eXBlKSB7XG5cdFx0XHRyZXR1cm4gYHl0bV9wYW5lbF9tZWRpYSB5dG1fcGFuZWxfc2l6ZSB5dG1fYmxvY2sgeXRtXyR7dHlwZX1gO1xuXHRcdH0sXG5cdFx0dmlkZW86IGZ1bmN0aW9uICh7IGF0dHJzIH0pIHtcblx0XHRcdGNvbnN0IHZpZGVvID0gXy5lKCd2aWRlbycsIHtcblx0XHRcdFx0Y29udHJvbHM6IHRydWUsXG5cdFx0XHRcdGF1dG9wbGF5OiBmYWxzZSxcblx0XHRcdFx0bG9vcDogdHJ1ZSxcblx0XHRcdFx0Y2xhc3NOYW1lOiB0aGlzLiRjc3MoJ3ZpZGVvJyksXG5cdFx0XHRcdCRhbGxvd3NjcmlwdGFjY2VzczogdHJ1ZSxcblx0XHRcdFx0cHJlbG9hZDogJ21ldGFkYXRhJ1xuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IGxpbmtzID0gW107XG5cblx0XHRcdGF0dHJzLnNvdXJjZXMuZm9yRWFjaCgoeyBzcmMsIHR5cGUgfSkgPT4ge1xuXHRcdFx0XHRfLmUoJ3NvdXJjZScsIHsgc3JjLCAkdHlwZTogdHlwZSB9LCB2aWRlbyk7XG5cblx0XHRcdFx0bGlua3MucHVzaChgPGEgaHJlZj1cIiR7c3JjfVwiPiR7c3JjfTwvYT5gKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRfLmUoJ3AnLCB7IGlubmVySFRNTDogYENvdWxkIG5vdCBsb2FkIHNvdXJjZShzKTogJHtsaW5rcy5qb2luKCc8YnIgLz4nKX1gIH0sIHZpZGVvKTtcblxuXHRcdFx0cmV0dXJuIHZpZGVvO1xuXHRcdH0sXG5cdFx0aWZyYW1lOiBmdW5jdGlvbiAoeyBhdHRycyB9KSB7XG5cdFx0XHRyZXR1cm4gXy5lKCdpZnJhbWUnLCB7XG5cdFx0XHRcdCRhbGxvd2Z1bGxzY3JlZW46IHRydWUsXG5cdFx0XHRcdCRyZWZlcnJlcnBvbGljeTogJ25vLXJlZmVycmVyJyxcblx0XHRcdFx0Ly8gJHNhbmRib3g6ICdhbGxvdy1zYW1lLW9yaWdpbiBhbGxvdy1zY3JpcHRzIGFsbG93LXBvcHVwcycsXG5cdFx0XHRcdCR0eXBlOiBhdHRycy5zb3VyY2VzWzBdLnR5cGUsXG5cdFx0XHRcdHNyYzogYXR0cnMuc291cmNlc1swXS5zcmMsXG5cdFx0XHRcdGNsYXNzTmFtZTogdGhpcy4kY3NzKCdpZnJhbWUnKVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRhdWRpbzogZnVuY3Rpb24gKHsgYXR0cnMgfSkge1xuXHRcdFx0cmV0dXJuIF8uZSgnYXVkaW8nLCB7XG5cdFx0XHRcdHNyYzogYXR0cnMuc291cmNlc1swXS5zcmMsXG5cdFx0XHRcdCR0eXBlOiBhdHRycy5zb3VyY2VzWzBdLnR5cGVcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcblxuXHQvKiogUyBDIFIgTyBMIEwgQ0xBU1Ncblx0ICogV2luZG93LVNjcm9sbCBFdmVudCBIZWxwZXJcblx0ICovXG5cdGNsYXNzIFNjcm9sbCB7XG5cdFx0Y29uc3RydWN0b3Ioc2VsZWN0b3IsIGNiLCBkZWxheSA9IDUwMCkge1xuXHRcdFx0dGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXHRcdFx0dGhpcy5jYiA9IGNiO1xuXHRcdFx0dGhpcy5tb25pdG9yID0gdGhpcy5tb25pdG9yLmJpbmQodGhpcyk7XG5cblx0XHRcdC8vIGNvbnNvbGUubG9nKCdZVE1BLlNjcm9sbCBNb25pdG9yOiAnLCBzZWxlY3Rvcik7XG5cdFx0XHR0aGlzLmJvdW5kID0gZGVib3VuY2UodGhpcy5tb25pdG9yLCBkZWxheSk7XG5cblx0XHRcdHRoaXMuYm91bmQoKTtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmJvdW5kLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0c3RvcCgpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdjbGVhciBzY3JvbGw6ICcsIHRoaXMuc2VsZWN0b3IpO1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuYm91bmQpO1xuXHRcdH1cblxuXHRcdG1vbml0b3IoKSB7XG5cdFx0XHRfLnModGhpcy5zZWxlY3RvciwgdGhpcy5jYik7XG5cdFx0fVxuXHR9XG5cblx0U2Nyb2xsLnZpc2libGUgPSBlbCA9PiB7XG5cdFx0Y29uc3QgYm91bmQgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRyZXR1cm4gKGJvdW5kLnRvcCA+PSAwICYmIGJvdW5kLnRvcCA8PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcblx0fTtcblxuXHRTY3JvbGwudmlzaWJsZUFsbCA9IChlbCwgb2Zmc2V0KSA9PiB7XG5cdFx0Y29uc3QgYm91bmQgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRjb25zdCBoZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXHRcdG9mZnNldCA9IGlzTnVtYmVyKG9mZnNldCkgPyArb2Zmc2V0IDogMDtcblx0XHRyZXR1cm4gKChib3VuZC5ib3R0b20gKyBvZmZzZXQgPj0gMClcblx0XHRcdCYmIChib3VuZC50b3AgPD0gaGVpZ2h0ICsgb2Zmc2V0IHx8IGJvdW5kLmJvdHRvbSA8PSBoZWlnaHQgLSBvZmZzZXQpKTtcblx0fTtcblxuXHQvKiogUmV0dXJucyAxLCAwLCAtMSB3aGVuIGVsMSBpcyBhYm92ZSwgZXhhY3RseSB0aGUgc2FtZSwgb3IgYmVsb3cgZWwyICovXG5cdFNjcm9sbC5jb21wYXJlID0gKGVsMSwgZWwyKSA9PiB7XG5cdFx0Y29uc3QgYSA9IGVsMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55O1xuXHRcdGNvbnN0IGIgPSBlbDIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueTtcblxuXHRcdGlmIChhIDwgYikgeyByZXR1cm4gMTsgfVxuXHRcdGlmIChhID09PSBiKSB7IHJldHVybiAwOyB9XG5cdFx0cmV0dXJuIC0xO1xuXHR9O1xuXG5cblx0WS5tYWluKCk7XG59KSgpO1xuIiwiaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKVxuXHRFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuXG5pZiAoIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcblx0RWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uIChzKSB7XG5cdFx0dmFyIGVsID0gdGhpcztcblx0XHRpZiAoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhlbCkpIHJldHVybiBudWxsO1xuXHRcdGRvIHtcblx0XHRcdGlmIChlbC5tYXRjaGVzKHMpKSByZXR1cm4gZWw7XG5cdFx0XHRlbCA9IGVsLnBhcmVudEVsZW1lbnQgfHwgZWwucGFyZW50Tm9kZTtcblx0XHR9IHdoaWxlIChlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH07XG59XG5cbmV4cG9ydCBjb25zdCBpc051bWJlciA9IG4gPT4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pO1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlU2VhcmNoID0gKHVyaSwga2VlcEhhc2gpID0+IHtcblx0Ly8gcmVtb3ZlcyBzZWFyY2ggcXVlcnkgZnJvbSBhIHVyaVxuXHRjb25zdCBzID0gdXJpLmluZGV4T2YoJz8nKTtcblx0Y29uc3QgaCA9IHVyaS5pbmRleE9mKCcjJyk7XG5cdGxldCBoYXNoID0gJyc7XG5cdGlmIChzID4gLTEpIHtcblx0XHRpZiAoa2VlcEhhc2ggJiYgaCA+IC0xKSB7XG5cdFx0XHRoYXNoID0gdXJpLnN1YnN0cihoKTtcblx0XHR9XG5cdFx0dXJpID0gdXJpLnN1YnN0cigwLCBzKSArIGhhc2g7XG5cdH1cblx0cmV0dXJuIHVyaTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBIVE1MIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudHMgU3BhY2UtIG9yIGNvbWEtc2VwYXJhdGVkIHN0cmluZyBvZiBvbmUgb3IgbW9yZSB0eXBlcywgZWcgXCJjbGljayBkYmxjbGlja1wiXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgQ1NTIHNlbGVjdG9yIGZvciB0aGUgZWxlbWVudHMgdG8gdHJpZ2dlciB0aGUgZXZlbnQgb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2tcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FuY2VsIENhbmNlbFxuICovXG5leHBvcnQgY29uc3Qgb24gPSAoZWxlbWVudCwgZXZlbnRzLCBzZWxlY3RvciwgbGlzdGVuZXIsIGNhbmNlbCA9IHRydWUpID0+IHtcblx0ZXZlbnRzID0gZXZlbnRzLnNwbGl0KC8oPzpcXHMrfCwpLykuZmlsdGVyKGYgPT4gZik7XG5cblx0aWYgKGV2ZW50cy5sZW5ndGggPT09IDApIHJldHVybjtcblxuXHRjb25zdCBmbiA9IGV2ZW50ID0+IHtcblx0XHRjb25zdCBmb3VuZCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKTtcblx0XHRpZiAoZm91bmQpIGxpc3RlbmVyLmNhbGwoZm91bmQsIGV2ZW50KTtcblx0fTtcblxuXHRldmVudHMuZm9yRWFjaCh0eXBlID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FuY2VsKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVib3VuY2UgPSAoZm4sIGRlbGF5ID0gMjUwKSA9PiB7XG5cdGxldCB0aW1lb3V0O1xuXG5cdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdGNvbnN0IHRpbWVkID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXG5cdFx0d2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQodGltZWQsIGRlbGF5KTtcblx0fTtcbn07IiwiLy8gSCBFIEwgUCBFIFIgSGFuZGxlXG5jb25zdCBfID0ge1xuXHRzOiAoc2VsZWN0b3IsIGNiKSA9PiB7XG5cdFx0Y29uc3QgZWxlbWVudHMgPSBfLnFzYShzZWxlY3Rvcik7XG5cdFx0ZWxlbWVudHMuc29tZSgoZWxlbWVudCwgaW5kZXgpID0+IGNiKGVsZW1lbnQsIGluZGV4LCBlbGVtZW50cykgPT09IGZhbHNlKTtcblx0fSxcblx0bzogZnVuY3Rpb24gKG9iamVjdCwgY2IpIHtcblx0XHRPYmplY3Qua2V5cyhvYmplY3QpLnNvbWUoa2V5ID0+IGNiKGtleSwgb2JqZWN0W2tleV0sIG9iamVjdCkgPT09IGZhbHNlKTtcblx0fSxcblx0ZTogZnVuY3Rpb24gKHQsIG8sIGUsIHApIHtcblx0XHRjb25zdCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0KTtcblx0XHRfLm8obywgKGssIHYpID0+IHtcblx0XHRcdGNvbnN0IGIgPSBrLmNoYXJBdCgwKTtcblx0XHRcdGlmIChiID09PSAnXycpXG5cdFx0XHRcdGMuZGF0YXNldFtrLnN1YnN0cmluZygxKV0gPSB2O1xuXHRcdFx0ZWxzZSBpZiAoYiA9PT0gJyQnKVxuXHRcdFx0XHRjLnNldEF0dHJpYnV0ZShrLnN1YnN0cmluZygxKSwgdik7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNba10gPSB2O1xuXHRcdH0pO1xuXG5cdFx0aWYgKGUgJiYgcCkge1xuXHRcdFx0Yy5hcHBlbmRDaGlsZChlKTtcblx0XHR9IGVsc2UgaWYgKGUpIHtcblx0XHRcdGUuYXBwZW5kQ2hpbGQoYyk7XG5cdFx0fVxuXHRcdHJldHVybiBjO1xuXHR9LFxuXHRxc2E6IHNlbGVjdG9yID0+IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpLFxuXHRjc3M6IGZ1bmN0aW9uICh0ZXh0KSB7XG5cdFx0aWYgKCF0aGlzLnN0eWxlKSB7XG5cdFx0XHR0aGlzLnN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHRcdHRoaXMuc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc3R5bGUpO1xuXHRcdH1cblx0XHR0aGlzLnN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke3RleHR9XFxuYCkpO1xuXHR9LFxuXHRqczogdCA9PiB7XG5cdFx0Y29uc3QgaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXHRcdGoudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuXHRcdGpbL15odHRwcz86XFwvXFwvL2kudGVzdCh0KSA/ICdzcmMnIDogJ3RleHRDb250ZW50J10gPSB0O1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoaik7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IF87IiwiLy8gUyBUIE8gUiBBIEcgRSBIQU5ETEVcbmNvbnN0IHN0cmcgPSB7XG5cdE1BWDogNTAxMixcblx0b246IGZhbHNlLFxuXHR0ZXN0OiAoKSA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGwgPSBsb2NhbFN0b3JhZ2U7XG5cdFx0XHRjb25zdCBjID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyKDIsIDgpO1xuXHRcdFx0bC5zZXRJdGVtKGMsIGMpO1xuXHRcdFx0cmV0dXJuIGwuZ2V0SXRlbShjKSA9PT0gYyA/ICFsLnJlbW92ZUl0ZW0oYykgOiBmYWxzZTtcblx0XHR9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9LFxuXHRyZWFkOiAoa2V5KSA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBjb25zb2xlLmVycm9yKGAke2UubGluZU51bWJlcn06JHtlLm1lc3NhZ2V9YCk7XG5cdFx0fVxuXHR9LFxuXHRzYXZlOiAoa2V5LCB2YWwpID0+IHN0cmcub24gPyAhbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWwpKSA6IGZhbHNlLFxuXHR3aXBlOiBrZXkgPT4gc3RyZy5vbiA/ICFsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpIDogZmFsc2UsXG5cdHplcm86IG8gPT4geyBmb3IgKGxldCBrIGluIG8pIHsgaWYgKG8uaGFzT3duUHJvcGVydHkoaykpIHsgcmV0dXJuIGZhbHNlOyB9IH0gcmV0dXJuIHRydWU7IH0sIC8vIGNoZWNrIGlmIHRoZSBvYmplY3QgaXMgZW1wdHlcblx0Z3JhYjogKGtleSwgZGVmKSA9PiB7IGNvbnN0IHMgPSBzdHJnLnJlYWQoa2V5KTsgcmV0dXJuIHN0cmcuemVybyhzKSA/IGRlZiA6IHM7IH0sXG5cdHNpemU6ICgpID0+IHtcblx0XHRsZXQgbGVuZ3RoID0gMDtcblx0XHRsZXQga2V5O1xuXHRcdHRyeSB7XG5cdFx0XHRmb3IgKGtleSBpbiB3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRsZW5ndGggKz0gd2luZG93LmxvY2FsU3RvcmFnZVtrZXldLmxlbmd0aDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIG5vIG1vcmUgc3BhY2Vcblx0XHR9XG5cdFx0cmV0dXJuIDMgKyAoKGxlbmd0aCAqIDE2KSAvICg4ICogMTAyNCkpO1xuXHR9LFxuXHRmdWxsOiAoKSA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGRhdGUgPSArKG5ldyBEYXRlKCkpO1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oZGF0ZSwgZGF0ZSk7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShkYXRlKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuXHRcdFx0XHRcdGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGluaXQ6ICgpID0+IHsgc3RyZy5vbiA9IHN0cmcudGVzdCgpOyB9XG59O1xuc3RyZy5pbml0KCk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmc7IiwiaW1wb3J0IHN0cmcgZnJvbSAnLi9zdHJnJztcbmltcG9ydCBfIGZyb20gJy4vXyc7XG5cbi8vIFUgUCBEIEEgVCBFIEhBTkRMRVxuY29uc3QgdXBkYXRlID0ge1xuXHRuYW1lOiAneXRtYSEnLFxuXHR2ZXJzaW9uOiA4MDAwLFxuXHRrZXk6ICd1anNfWVRNQV9VUERUX0hSJyxcblx0Y2FsbGJhY2s6ICd5dG1hdXBkYXRlcicsXG5cdHBhZ2U6ICdodHRwczovL2dyZWFzeWZvcmsub3JnL3NjcmlwdHMvMTAyMy15b3V0dWJlLW1lLWFnYWluJyxcblx0anNvbjogJ2h0dHBzOi8vaGF0ZXJhZGlvLmdpdGh1Yi5pby95dG1hL3VwZGF0ZS5qc29uJyxcblx0aW50ZXJ2YWw6IDcsXG5cdGRheTogKG5ldyBEYXRlKCkpLmdldFRpbWUoKSxcblx0c2hvdzogZmFsc2UsXG5cdHRpbWU6ICgpID0+IG5ldyBEYXRlKHVwZGF0ZS5kYXkgKyAoMTAwMCAqIDYwICogNjAgKiAyNCAqIHVwZGF0ZS5pbnRlcnZhbCkpLmdldFRpbWUoKSxcblx0bm90aWZpY2F0aW9uOiAoeyB2ZXJzaW9uLCBwYWdlIH0pID0+IHtcblx0XHRpZiAodXBkYXRlLnZlcnNpb24gPCB2ZXJzaW9uKSB7XG5cdFx0XHRzdHJnLnNhdmUodXBkYXRlLmtleSwgeyBkYXRlOiB1cGRhdGUudGltZSgpLCB2ZXJzaW9uLCBwYWdlIH0pO1xuXHRcdFx0dXBkYXRlLmxpbmsoKTtcblx0XHR9XG5cdH0sXG5cdGxpbms6ICgpID0+IHtcblx0XHRpZiAodXBkYXRlLnNob3cpIHsgcmV0dXJuOyB9XG5cdFx0dXBkYXRlLnNob3cgPSB0cnVlO1xuXG5cdFx0Y29uc3QgeyBwYWdlIH0gPSBzdHJnLnJlYWQodXBkYXRlLmtleSk7XG5cdFx0Y29uc3QgbGluayA9IGBcblx0XHRcdFx0PGEgaHJlZj1cIiR7cGFnZSB8fCB1cGRhdGUucGFnZX1cIiBpZD11cGRhdGV2MyB0aXRsZT1VcGRhdGUgdGFyZ2V0PV9ibGFuaz5cblx0XHRcdFx0XHRBbiB1cGRhdGUgZm9yICR7dXBkYXRlLm5hbWV9IGlzIGF2YWlsYWJsZS5cblx0XHRcdFx0PC9hPmA7XG5cblx0XHRfLmNzcyh1cGRhdGUuY3NzKTtcblx0XHRkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgbGluayk7XG5cdFx0Xy5vbihkb2N1bWVudC5ib2R5LCAnY2xpY2snLCAnI3VwZGF0ZXYzJywgZSA9PiBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcblx0fSxcblx0Y2hlY2s6IChvcHQpID0+IHtcblx0XHRpZiAoIXN0cmcub24pIHsgcmV0dXJuOyB9XG5cdFx0aWYgKHdpbmRvdy5jaHJvbWUgJiYgd2luZG93LmNocm9tZS5leHRlbnNpb24pIHsgcmV0dXJuOyB9XG5cdFx0Y29uc3Qgc3RvcmVkID0gc3RyZy5yZWFkKHVwZGF0ZS5rZXkpO1xuXHRcdGxldCBwYWdlO1xuXG5cdFx0aWYgKG9wdCB8fCAhc3RvcmVkIHx8IHN0b3JlZC5kYXRlIDwgdXBkYXRlLmRheSkge1xuXHRcdFx0cGFnZSA9IChzdG9yZWQgJiYgc3RvcmVkLnBhZ2UpIHx8IHVwZGF0ZS5wYWdlO1xuXHRcdFx0c3RyZy5zYXZlKHVwZGF0ZS5rZXksIHsgZGF0ZTogdXBkYXRlLnRpbWUoKSwgdmVyc2lvbjogdXBkYXRlLnZlcnNpb24sIHBhZ2UgfSk7XG5cdFx0XHRmZXRjaCh1cGRhdGUuanNvbikudGhlbihyZXMgPT4gcmVzLmpzb24oKSkudGhlbih1cGRhdGUubm90aWZpY2F0aW9uKTtcblx0XHR9IGVsc2UgaWYgKHVwZGF0ZS52ZXJzaW9uIDwgc3RvcmVkLnZlcnNpb24pIHtcblx0XHRcdHVwZGF0ZS5saW5rKCk7XG5cdFx0fVxuXHR9LFxuXHRjc3M6ICcjdXBkYXRlcjMsI3VwZGF0ZXIzOnZpc2l0ZWR7Ym94LXNoYWRvdzoxcHggMXB4IDZweCAjNzc3Njtib3JkZXItYm90dG9tOjNweCBzb2xpZCAjZTM5YzJkO2N1cnNvcjpwb2ludGVyO2NvbG9yOiM1NTU7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo3MDA7dGV4dC1hbGlnbjpqdXN0aWZ5O3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6OTk5OTk5O3JpZ2h0OjEwcHg7dG9wOjEwcHg7YmFja2dyb3VuZDojZWJlYmViIHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTFRNMElEVXhNaUExTVRJaVBqeHdZWFJvSUdacGJHdzlJaU5sTldWaVpqVWlJR1E5SWsweU56QXVOemd4SURjdU5VZ3lOREV1TWpKTU9DNDJOaUEwTVRBdU16QTFiREUwTGpjNE1TQXlOUzQyTURGSU5EZzRMalUyYkRFMExqYzRMVEkxTGpZd01YcHRNQ0F3SWk4K1BIQmhkR2dnWm1sc2JEMGlJMlk0WlRnMk9DSWdaRDBpVFRRNExqY3dOeUEwTURBdU9UTTBUREkxTXk0eE1qa2dORFl1T0RZM2FEVXVOelF5YkRJd05DNDBNaklnTXpVMExqQTJOMk10TVM0eU56Y2dNaTR5TVMweExqVTVOQ0F5TGpjMk5TMHlMamczTVNBMExqazNOa2cxTVM0MU56aGpMVEV1TWpjM0xUSXVNakV0TVM0MU9UUXRNaTQzTmpVdE1pNDROekV0TkM0NU56WjZiVEFnTUNJdlBqeHdZWFJvSUdacGJHdzlJaU5sTXpsak1tUWlJR1E5SWsweU56VXVPVGsySURjMkxqVXlOMnd0TVRjdU1USTFMVEk1TGpZMmFDMDFMamMwTWt3ME9DNDNNRGNnTkRBd0xqa3pOR014TGpJM055QXlMakl4SURFdU5UazBJREl1TnpZMUlESXVPRGN4SURRdU9UYzJhRE01TGprNU5tTXRNUzR5TnpjdE1pNHlNUzB4TGpVNU55MHlMamMyTlMweUxqZzNMVFF1T1RjMmVtMHdJREFpTHo0OGNHRjBhQ0JtYVd4c1BTSWpZMkZrT0dWaElpQmtQU0pOTWpjMUxqazVOaUF4Tmk0MU16Vk1NamN3TGpjNE1TQTNMalZJTWpReExqSXlURGd1TmpZZ05ERXdMak13TldNMkxqVTJOeUF4TVM0ek56a2dPQzR5TVRFZ01UUXVNakl5SURFMExqYzRNU0F5TlM0Mk1ERm9Nemt1T1RrMll5MDJMalUzTFRFeExqTTNPUzA0TGpJeE5DMHhOQzR5TWpJdE1UUXVOemd0TWpVdU5qQXhlbTB3SURBaUx6NDhjR0YwYUNCbWFXeHNQU0lqTnpJNE5qbGxJaUJrUFNKTk1qY3dMamcxTlNBek1ESXVORFUzYUMweU9TNDNNV010TXk0d01EUXRNeTR3TURRdE5DNDJPVEl0TkM0Mk9EY3ROeTQyT1RZdE55NDJPVEZXTVRZekxqZzJNMmcwTlM0eE1ESjJNVE13TGprd00yTXRNeTR3TURnZ015NHdNRFF0TkM0Mk9USWdOQzQyT0RjdE55NDJPVFlnTnk0Mk9URjZiVEFnTUNJdlBqeHdZWFJvSUdacGJHdzlJaU0xTXpZeU56VWlJR1E5SWsweU5UTXVORFVnTVRZekxqZzJNMmd0TWpCMk1UTXdMamt3TTJNekxqQXdNeUF6TGpBd05DQTBMalk1SURRdU5qZzNJRGN1TmprMUlEY3VOamt4YURFNUxqazVObXd0Tnk0Mk9USXROeTQyT1RGNmJUQWdNQ0l2UGp4d1lYUm9JR1pwYkd3OUlpTTNNamcyT1dVaUlHUTlJazB5TXpNdU5EVWdNek13TGpneE0yZzBOUzR4ZGpRMUxqRXdNV2d0TkRVdU1YcHRNQ0F3SWk4K1BIQmhkR2dnWm1sc2JEMGlJelV6TmpJM05TSWdaRDBpVFRJek15NDBOU0F6TXpBdU9ERXphREl3ZGpRMUxqRXdNV2d0TWpCNmJUQWdNQ0l2UGp4d1lYUm9JR1pwYkd3OUlpTm1abVlpSUdROUlrMHlOelV1T1RrMklERTBNUzR6TmpkSU1qWXhkaTB4TldneE5DNDVPVFo2YlMweU5DNDVPVFlnTUdndE1UVjJMVEUxYURFMWVtMHdJREFpTHo0OGNHRjBhQ0JrUFNKTk5EQXdMalF6SURJeE55NHdOVGxzTFRFeUxqazRPU0EzTGpWTU5EazBMalk0SURReE1DNHpNRFZzTFRFd0xqUTFJREU0TGpFd01VZ3lOeTQzTjJ3dE1UQXVORFUwTFRFNExqRXdNVXd5TkRVdU5UUTJJREUxYURJd0xqa3dOMnd4TURjdU1qTTRJREU0TlM0M05EWWdNVEl1T1RnNUxUY3VOVXd5TnpVdU1URXpJREJvTFRNNExqSXlNa3d3SURReE1DNHpNRFZzTVRrdU1URWdNek11TVRBeGFEUTNNeTQzTnpkTU5URXlJRFF4TUM0ek1EVjZiVEFnTUNJdlBqeHdZWFJvSUdROUlrMHhNalV1TVRVMklEUXhNeTQwTURaSU5EWTBMamMxYkRjdU1qQXpMVEV5TGpRM01pMHlNRGd1TnpVdE16WXhMalUyTjJndE1UUXVOREEyVERRd0xqQTBOeUEwTURBdU9UTTBiRGN1TWlBeE1pNDBOekpvTlRjdU9URXpWak01T0M0ME1VZzFPQzQ0TWpSTU1qVTJJRFUyTGpnNWJERTVOeTR4TnpZZ016UXhMalV5YUMwek1qZ3VNREo2YlRBZ01DSXZQanh3WVhSb0lHUTlJazB5T0RZdU1EUTNJREl5T1M0MU5UbDJMVGN6TGpFNU5tZ3ROakF1TURrNGRqRTBNUzQxTURoc01USXVNRGtnTVRJdU1EZzJhRE0xTGpreU1td3hNaTR3T0RZdE1USXVNRGcyVmpJME9TNDFOa2d5TnpFdU1EVjJOREl1TURrM2JDMHpMak13TVNBekxqTXdOV2d0TWpNdU5Xd3RNeTR6TFRNdU16QTFWakUzTVM0ek5qTm9NekF1TVhZMU9DNHhPVFo2YlRBZ01FMHlNalV1T1RVZ016Z3pMalF4YURZd0xqQTVOM1l0TmpBdU1EazRhQzAyTUM0d09UaDZiVEUxTFRRMUxqQTVPR2d6TUM0eGRqTXdMakV3TW1ndE16QXVNWHB0TUNBd0lpOCtQQzl6ZG1jKykgbm8tcmVwZWF0IDEwcHggY2VudGVyO2JhY2tncm91bmQtc2l6ZTo0MHB4O3BhZGRpbmc6MCAyMHB4IDAgNjBweDtoZWlnaHQ6NTVweDtsaW5lLWhlaWdodDo1NXB4fSN1cGRhdGVyMzpob3ZlciwjdXBkYXRlcjM6dmlzaXRlZDpob3Zlcntjb2xvcjojYjMzYTNhICFpbXBvcnRhbnQ7Ym9yZGVyLWNvbG9yOiNjZTRiMzA7dGV4dC1kZWNvcmF0aW9uOiBub25lO30nIC8vIEljb24gbWFkZSBieSBGcmVlcGlrIGZyb20gd3d3LmZsYXRpY29uLmNvbSBcbn07XG51cGRhdGUuY2hlY2soKTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlOyJdLCJzb3VyY2VSb290IjoiIn0=