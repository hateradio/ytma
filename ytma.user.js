// ==UserScript==
// Do not modify and re-release this script!
// If you would like to add support for other sites, please tell me and I'll put it in the includes.

// @id             youtube-me-again
// @name           YouTube Me Again!
// @namespace      hateradio)))
// @author         hateradio
// @version        7.9
// @description    ytma! automatically converts YouTube(TM), Vimeo, Vine, Soundcloud, WebM, and MP4 links into real embedded videos.
// @homepageURL    https://greasyfork.org/en/scripts/1023-youtube-me-again
// @icon           https://www.dropbox.com/s/b85qmq0bsim407s/ytma32.png?dl=1
// @icon64         https://www.dropbox.com/s/5zw3al38yf39wxb/ytma64.png?dl=1
// @screenshot     https://www.dropbox.com/s/syy9916b1prygl9/ytmascreen5.png?dl=1

// @include        https://vine.co/v/*/embed/simple
// @match          https://vine.co/v/*/embed/simple

// @include        http*://*youtube-nocookie.com/embed/*
// @match          *://*.youtube-nocookie.com/embed/*

// @include        http*://*youtube.com/embed/*
// @match          *://*.youtube.com/embed/*

// @include        https://gfycat.com/iframe/*
// @match          https://gfycat.com/iframe/*

// @include        http*://*.neogaf.com/threads/*
// @include        http*://*.resetera.com/threads/*

// @match          *://*.neogaf.com/threads/*
// @match          *://*.resetera.com/threads/*

// @updated        05 Jan 2019

// @grant          GM_xmlhttpRequest

// @run-at         document-end
// ==/UserScript==

/*

## Updates

#### 7.9

* Fix: Ignore links in XenoForo text areas

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

(function () {
	'use strict';

	var $$, strg, update;

	if (!Function.prototype.bind) {
		Function.prototype.bind = function (self) {
			var args = [].slice.call(arguments, 1), fn = this;
			return function () {
				return fn.apply(self, args.concat([].slice.call(arguments)));
			};
		};
	}

	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	function removeSearch(uri, keepHash) { // removes search query from a uri
		var s = uri.indexOf('?'), h = uri.indexOf('#'), hash = '';
		if (s > -1) {
			if (keepHash && h > -1) {
				hash = uri.substr(h);
			}
			uri = uri.substr(0, s) + hash;
		}
		return uri;
	}

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

	// D O M Handle
	$$ = {
		s: function (selector, cb) { var s = document.querySelectorAll(selector), i = -1; while (++i < s.length) { if (cb(s[i], i, s) === false) { break; } } },
		o: function (object, cb) { var i; for (i in object) { if (object.hasOwnProperty(i)) { if (cb(i, object[i], object) === false) { break; } } } },
		a: function (e) { var i = 1, j = arguments.length, f = document.createDocumentFragment(); for (i; i < j; i++) { if (arguments[i]) { f.appendChild(arguments[i]); } } e.appendChild(f); return e; },
		e: function (t, o, e, p) {
			var c = document.createElement(t);
			$$.o(o, function (k, v) {
				var b = k.charAt(0);
				switch (b) {
					case '_':
						c.dataset[k.substring(1)] = v;
						break;
					case '$':
						c.setAttribute(k.substring(1), v);
						break;
					default:
						c[k] = v;
				}
			});

			if (e && p) {
				c.appendChild(e);
			} else if (e) {
				e.appendChild(c);
			}
			return c;
		},
		x: function (selector) { return this.ary(document.querySelectorAll(selector)); },
		ary: function (ary) { return Array.from ? Array.from(ary) : Array.prototype.slice.call(ary); },
		top: document.head || document.body,
		css: function (t) {
			if (!this.style) {
				this.style = document.createElement('style');
				this.style.type = 'text/css';
				this.top.appendChild(this.style);
			}
			this.style.appendChild(document.createTextNode(t + '\n'));
		},
		js: function (t) {
			var j = document.createElement('script');
			j.type = 'text/javascript';
			j[/^https?:\/\//i.test(t) ? 'src' : 'textContent'] = t;
			this.top.appendChild(j);
		}
	};

	// S T O R A G E HANDLE
	strg = {
		MAX: 5012,
		on: false,
		test: function () { try { var a, b = localStorage, c = Math.random().toString(16).substr(2, 8); b.setItem(c, c); a = b.getItem(c); return a === c ? !b.removeItem(c) : false; } catch (e) { return false; } },
		read: function (key) {
			try {
				return JSON.parse(localStorage.getItem(key));
			} catch (e) {
				console.error(e.lineNumber + ':' + e.message);
				return undefined;
			}
		},
		save: function (key, val) { return this.on ? !localStorage.setItem(key, JSON.stringify(val)) : false; },
		wipe: function (key) { return this.on ? !localStorage.removeItem(key) : false; },
		zero: function (o) { var k; for (k in o) { if (o.hasOwnProperty(k)) { return false; } } return true; },
		grab: function (key, def) { var s = strg.read(key); return strg.zero(s) ? def : s; },
		size: function () {
			var length = 0, key;
			try {
				for (key in window.localStorage) {
					if (window.localStorage.hasOwnProperty(key)) {
						length += window.localStorage[key].length;
					}
				}
			} catch (e) { }
			return 3 + ((length * 16) / (8 * 1024));
		},
		full: function () {
			try {
				var date = +(new Date());
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
		init: function () { this.on = this.test(); }
	};
	strg.init();

	// U P D A T E HANDLE
	update = {
		name: 'ytma!',
		version: 7900,
		key: 'ujs_YTMA_UPDT_HR',
		callback: 'ytmaupdater',
		page: 'https://greasyfork.org/scripts/1023-youtube-me-again',
		urij: 'https://hateradio.github.io/ytma/update.json',
		interval: 5,
		day: (new Date()).getTime(),
		time: function () { return new Date(this.day + (1000 * 60 * 60 * 24 * this.interval)).getTime(); },
		notification: function (j) {
			if (this.version < j.version) {
				strg.save(this.key, { date: this.time(), version: j.version, page: j.page });
				this.link();
			}
		},
		link: function () {
			this.csstxt();

			var a = document.createElement('a'), b = strg.read(this.key);
			a.href = b.page || this.page;
			a.id = 'userscriptupdater2';
			a.title = 'Update now.';
			a.target = '_blank';
			a.textContent = 'An update for ' + this.name + ' is available.';
			a.addEventListener('click', function () { this.style.display = 'none'; }, false);
			document.body.appendChild(a);
		},
		xhr: function () {
			var x = new XMLHttpRequest();
			x.addEventListener('load', function () { update.notification(JSON.parse(this.responseText)); }, false);
			x.open('get', update.urij, true);
			x.send();
		},
		check: function (opt) {
			if (!strg.on) { return; }
			if (window.chrome && window.chrome.extension) { return; }
			var stored = strg.read(this.key), page;

			if (opt || !stored || stored.date < this.day) {
				page = (stored && stored.page) || this.page;
				strg.save(this.key, { date: this.time(), version: this.version, page: page });
				this.xhr();
			} else if (this.version < stored.version) {
				this.link();
			}
		},
		csstxt: function () {
			if (!this.pop) { this.pop = true; $$.css('#userscriptupdater2,#userscriptupdater2:visited{box-shadow:1px 1px 6px #7776;border-bottom:3px solid #d65e55;cursor:pointer;color:#555;font-family:sans-serif;font-size:12px;font-weight:700;text-align:justify;position:fixed;z-index:999999;right:10px;top:10px;background:#ebebeb url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTguODQ4NTMgMTk5LjM4MzA3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNC4yNzYgLTE2LjM2NykiPjxjaXJjbGUgY3g9IjEwNC4zMjEiIGN5PSIxMTYuMzI3IiByPSI5OC4yNzQiIGZpbGw9IiNkNjVlNTUiLz48cGF0aCBmaWxsPSIjZTljZTAyIiBzdHJva2U9IiNlOWM4MDIiIHN0cm9rZS13aWR0aD0iMTYuNyIgZD0iTTE2Ni40NSAxNTcuMzEySDQxLjg5bDMxLjE0LTUzLjkzNSAzMS4xNC01My45MzUgMzEuMTM3IDUzLjkzNXoiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48dGV4dCB4PSI4NS42NDMiIHk9IjE1MS44NjYiIGZpbGw9IiNkNjVlNTUiIHN0cm9rZS13aWR0aD0iMS40NzciIHN0eWxlPSJsaW5lLWhlaWdodDoxLjI1Oy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246J0Jvb2sgQW50aXF1YSciIGZvbnQtd2VpZ2h0PSI0MDAiIGZvbnQtc2l6ZT0iNTkuMDg4IiBmb250LWZhbWlseT0iQm9vayBBbnRpcXVhIiBsZXR0ZXItc3BhY2luZz0iMCIgd29yZC1zcGFjaW5nPSIwIj48dHNwYW4geD0iODUuNjQzIiB5PSIxNTEuODY2IiBzdHlsZT0iLWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjonQm9vayBBbnRpcXVhJyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1zaXplPSIxMjYuMDU0Ij4hPC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg==) no-repeat 10px center;background-size:40px;padding:0 20px 0 60px;height:55px;line-height:55px}#userscriptupdater2:hover,#userscriptupdater2:visited:hover{color:#b33a3a !important;border-color:#ce4b30}'); }
		}
	};
	update.check();

	/** Y T M A CLASS
	 *  Bare YTMA class, filled through _new() or _reactivate()
	 */
	function YTMA() { }

	YTMA.events = {
		clicks: function (e) { // YTMA global click dispatcher
			var t = e.target;

			if (t) {
				// console.log('YTMA.clicks');
				if (t.tagName === 'VAR' && t.hasAttribute('data-ytmuid')) { // trigger the ui
					console.log('show', t.dataset.ytmuid);
					YTMA.UI.createFromTrigger(t).showPlayer();
				} else if (t.hasAttribute('data-ytmdescription')) {
					console.log('load', t.dataset.ytmid);
					YTMA.external.events.manualLoad(e);
				}
			}
		},
		thumb: {
			start: function (e) {
				var el = e.target;
				el.dataset.thumb = el.dataset.thumb > 0 ? (el.dataset.thumb % 3) + 1 : 2;
				el.style.backgroundImage = ['url(https://i3.ytimg.com/vi/', el.dataset.ytmid, '/', el.dataset.thumb, '.jpg)'].join('');
				el.dataset.timeout = window.setTimeout(YTMA.events.thumb.start.bind(this, e), 800);
			},
			stop: function (e) {
				window.clearTimeout(e.target.dataset.timeout);
			}
		}
	};

	YTMA.num = 0;

	YTMA.addToSet = function (ytma) {
		YTMA.set[ytma.data.uid] = ytma;
	};

	YTMA.create = function (link) {
		return YTMA.grabIdAndSite(link, function (data, err) {
			if (err) {
				console.error(link.href, err);
				return {};
			}

			var y = new YTMA()._new(data.id, data.site, link);
			YTMA.addToSet(y);
			y.setup();

			return y;
		});
	};

	YTMA.grabIdAndSite = function (link, cb) {
		var uri = link.href || link.src, id, site, match;
		try {
			site = YTMA.reg.siteByTest[YTMA.reg.siteExpressions.test(uri) ? RegExp.lastMatch : ''];
			// console.log(site);

			if (site === 'html5') { // || site === 'html5-audio'
				id = uri.slice(-15);
			} else if (site === 'soundcloud') {
				if (!YTMA.reg.extra.soundcloud.playlist.test(uri)) {
					link.href = uri = YTMA.reg.fix.soundcloud(uri);
				}

				match = YTMA.DB.sites.soundcloud.matcher.exec(uri);
				id = YTMA.escapeId(match[1]);

				if (match && YTMA.reg.extra.soundcloud.tracks.test(uri)) {
					id = id.slice(-50);
				}
			} else {
				id = uri.match(YTMA.DB.sites[site].matcher)[1];
			}

			console.log(id, site, match);
			if (id && YTMA.DB.sites[site]) {
				return cb({ id: id, site: site }, null);
			}
			throw TypeError('Invalid ID/Site: ' + id + ' @ ' + site);
		} catch (e) {
			return cb(null, e);
		}
	};

	YTMA.escapeId = function (id) {
		return (id += '').replace(/(?:\W)/g, '_');
	};

	YTMA.route = {
		host: document.location.host.replace('www.', ''),
		control: {
			$: {
				checkStorage: function () {
					if (strg.full() === true) {
						console.log('YTMA ERROR: Storage is full!');
						try {
							localStorage.removeItem(YTMA.external.version);
							strg.on = strg.test();
						} catch (e) {
							console.error(e);
						}
					}
				},
				runOnce: function (loop) {
					if (!document.body.hasAttribute('ytma-enabled')) {
						document.body.setAttribute('ytma-enabled', true);

						this.checkStorage();

						if (!YTMA.DB.extension) { update.check(); }

						YTMA.css();
						YTMA.user.init();
						YTMA.DB.postInit();

						if (loop) {
							document.body.dataset.YTMA_LOOP = window.setInterval(loop, 5000);
							loop();
						}

						document.body.addEventListener('click', YTMA.events.clicks, false);
					}
				}
			},
			go: function (host) {
				console.log(host);
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
						if (YTMA.selector.processor() > 0) {
							YTMA.user.fn.loadPreferences();
						}

						console.log('ytma! . . . again!!');
					}

					YTMA.route.control.$.runOnce(loop);
				},
				'resetera.com': function () {
					$$.css('.ytm_control li ul li { height: 24px !important }');
					$$.css('.bbCodeQuote .quoteContainer .quote { max-height: initial } .bbCodeQuote .quoteContainer .quoteExpand.quoteCut { display: none }');
					$$.css('.bbCodeQuote .ytm_block iframe, .bbCodeQuote .ytm_block [data-s9e-mediaembed], .bbCodeQuote .ytm_block .fb_iframe_widget, .bbCodeQuote .ytm_block object, .bbCodeQuote .ytm_block embed { max-height: initial; max-width: initial }');
					this.$generic();
				},
				'gfycat.com': function () {
					var v = document.querySelector('video');
					v.controls = true;
					$$.css('body,html {overflow:hidden;height:100%;width:100%} video {display:table;height:100%;margin:0 auto;}');
					document.body.appendChild(v);
				},
				'vine.co': function () {
					// console.log('vine.co');

					window.addEventListener('resize', function () {
						$$.s('[style]', function (e) {
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

	YTMA.main = function () {
		YTMA.reg.siteExpressions = YTMA.DB.views.getAllSiteRegExps();
		// console.log(YTMA.reg.siteExpressions);
		YTMA.route.load();
	};

	YTMA.set = {};

	YTMA.collect = function (id) {
		var i, a = [];
		for (i in YTMA.set) {
			if (YTMA.set.hasOwnProperty(i) && YTMA.set[i].data.id === id) {
				a.push(YTMA.set[i]);
			}
		}
		return a;
	};

	YTMA.reg = {
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
		fix: {
			soundcloud: function (uri) {
				var match = YTMA.DB.sites.soundcloud.matcher.exec(uri), id;
				if (match) {
					id = match[1].split('/', 2).join('/');
					uri = removeSearch('https://soundcloud.com/' + id, true);
				}

				return uri;
			}
		}
	};

	YTMA.selector = { // to build the selector
		parentBlacklist: ['.smallfont', '.colhead_dark', '.spoiler', 'pre', '.messageUserInfo', '.message-editorWrapper'],
		ignore: function () {
			var i, j, ignore = [], all = YTMA.DB.views.getAllSiteSelectors().split(','), blacklist = this.parentBlacklist;
			for (i = 0; i < blacklist.length; i++) {
				for (j = 0; j < all.length; j++) {
					ignore.push(blacklist[i] + ' ' + all[j]);
				}
			}
			//console.log(ignore);
			return ignore.join(',');
		},
		iframes: function () { // for resetera, convert iframes back to anchors
			$$.x('.message-body iframe').forEach(function (f) {
				if (/vi\/(.+?)\/hqdefault/.test(f.style.backgroundImage)) {
					var src = 'https://youtu.be/' + RegExp.$1,
						span = f.closest('[data-s9e-mediaembed]');
					span.insertAdjacentHTML('beforebegin', '<a href=' + src + '>youtube</a>');
					span.parentElement.removeChild(span);
				}
			});
		},
		links: function () {
			var links;

			$$.x(YTMA.selector.ignore()).map(function (el) { el.setAttribute('ytmaignore', true); });

			links = $$.x(YTMA.DB.views.getAllSiteSelectors()).filter(function (el) {
				var r = !el.hasAttribute('ytmaprocessed') && !el.hasAttribute('ytmaignore');
				el.setAttribute('ytmaprocessed', true);
				return r;
			});

			return links;
		},
		processor: function () {
			this.iframes();
			var links = this.links();

			if (links.length > 0) {
				links.forEach(YTMA.create);
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
	 * yt_volume: positive number; youtube volume
	 * yt_annotation: 0/1; youtube annotations
	 */
	YTMA.user = {
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
			yt_annotation: [0, 1], // hide | show
			yt_volume: 100 // todo? (function () { var a = new Array(101); for (i = 0; i <= 100; i++) { a[i] = i; } return a; }())
		},
		mapping: { // map values to some other values used by an external API, for example
			yt_annotation: [3, 1] // 3 = hide | 1 = show
		},
		validate: function (property, n) {
			n = +n;

			if (property === 'yt_volume') {
				return n >= 0 && n <= 100 ? (+n) : YTMA.user.defaults()[property];
			}
			return YTMA.user.valid[property].indexOf(n) > -1 ? n : YTMA.user.defaults()[property];
		},
		defaults: function () {
			return {
				focus: 0,
				desc: 1,
				ratio: 2,
				size: 360,
				quality: 720,
				autoShow: 1,
				yt_nocookie: 0,
				yt_annotation: 1,
				yt_volume: 100
			};
		},
		load: function () {
			var s = strg.grab(YTMA.user.KEY, {});

			YTMA.user.preferences = {
				size: YTMA.user.validate('size', s.size),
				ratio: YTMA.user.validate('ratio', s.ratio),
				desc: YTMA.user.validate('desc', s.desc),
				focus: YTMA.user.validate('focus', s.focus),
				quality: YTMA.user.validate('quality', s.quality),
				autoShow: YTMA.user.validate('autoShow', s.autoShow),
				yt_nocookie: YTMA.user.validate('yt_nocookie', s.yt_nocookie),
				yt_annotation: YTMA.user.validate('yt_annotation', s.yt_annotation),
				yt_volume: YTMA.user.validate('yt_volume', s.yt_volume)
			};

			$$.o(YTMA.user.mapping, function (key, val) {
				if (!val.hasOwnProperty('indexOf')) {
					YTMA.user.preferences[key] = val[YTMA.user.valid[key].indexOf(YTMA.user.preferences[key])];
				}
			});

			console.log('loaded: ', YTMA.user.preferences);
		},
		mark: function () {
			var a = {};
			a.ytma__focus = !!YTMA.user.preferences.focus;
			a.ytma__autoShow = !!YTMA.user.preferences.autoShow;
			a.ytma__yt_nocookie = !!YTMA.user.preferences.yt_nocookie;
			a.ytma__yt_annotation = !!YTMA.user.preferences.yt_annotation;
			a.ytma__yt_volume = YTMA.user.preferences.yt_volume;
			a['ytma__ratio' + YTMA.user.preferences.ratio] = true;
			a['ytma__size' + YTMA.user.preferences.size] = true;
			a['ytma__desc' + YTMA.user.preferences.desc] = true;
			a['ytma__quality' + YTMA.user.preferences.quality] = !!YTMA.user.preferences.quality;

			// console.log('marking', a);
			$$.o(a, function (id, val) {
				try {
					var el = document.getElementById(id);
					el.checked = val;
					el.value = val;
				} catch (e) {
					// console.log(id, e);
				}
			});
		},
		events: {
			save: function (e) {
				var o = {};

				if (e && (/(?:INPUT|LABEL)/i).test(e.target.nodeName)) {
					// console.log(YTMA.user.$form.querySelectorAll('[data-key]'));
					// [data-key]:checked
					$$.ary(YTMA.user.$form.querySelectorAll('[data-key]')).forEach(function (e) {
						var key;
						key = e.dataset.key;

						if (e.type === 'checkbox') {
							o[key] = +e.checked;
						} else if (e.type === 'radio') {
							if (e.checked) {
								if (e.hasAttribute('data-num')) {
									o[key] = +e.dataset.num;
								}
							}
						} else {
							o[key] = +e.value;
						}
					});

					if (strg.save(YTMA.user.KEY, o)) {
						YTMA.user.load();
					} else {
						YTMA.user.error.classList.remove('ytm_none');
					}
				}

			},
			reset: function () {
				YTMA.user.preferences = YTMA.user.defaults();
				YTMA.user.mark();
				strg.wipe(YTMA.user.KEY);
				YTMA.user.error.classList.add('ytm_none');
			},
			clear: function () {
				try {
					localStorage.removeItem(YTMA.external.version);
					YTMA.user.events.reset();
					console.log('removed all YTMA cache');
				} catch (e) {
					console.error(e);
				}
			},
			formToggle: function (e) {
				if (!e || (e && e.target && !(/(?:INPUT|LABEL)/i).test(e.target.nodeName))) {
					YTMA.user.$form.classList.toggle('ytm_none');
				}
			},
			formToggleKeyboard: function (e) {
				// press CTRL+SHIFT+Y (META+SHIFT+Y) to display settings form
				if ((e.ctrlKey || e.metaKey) && e.shiftKey && String.fromCharCode(e.which).toLowerCase() === 'y') {
					e.preventDefault();
					YTMA.user.events.formToggle();
				}
			}
		},
		fn: {
			$scroller: null,
			$once: false,
			loadPreferences: function () {
				YTMA.user.fn.onScrollLoadDescriptions(YTMA.user.preferences.desc === 1);

				this.loadPreferencesOnce();
			},
			loadPreferencesOnce: function () {
				if (this.$once) { return; }

				this.$once = true;

				if (YTMA.user.preferences.autoShow === 1) {
					YTMA.user.fn.onScrollViewMedia();
				}
			},
			showMedia: function () {
				console.log('showMedia');
				return new YTMA.Scroll('a.ytm_scroll:not([data-ytmscroll="false"])', function (link) {
					if (YTMA.Scroll.visibleAll(link, 50)) {
						$$.s('var[data-ytmsid="' + link.dataset.ytmsid + '"]:not([data-ytmscroll="false"])', function (trigger) {
							var ui = YTMA.UI.createFromTrigger(trigger);
							ui.showOnScroll(link);
						});
					}
				});
			},
			toggleMedia: function () {
				return new YTMA.Scroll('div.ytm_panel_switcher', function (div) {
					var v = div.querySelector('video'),
						paused = v && (v.paused || v.ended),
						ui = YTMA.set[div.dataset.ytmuid].getUI();

					if (paused && !YTMA.Scroll.visibleAll(div, 0)) {
						return ui.play.switchStandby();
					}

					if (ui.play.isStandby() && YTMA.Scroll.visibleAll(div, 200)) {
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
				if (YTMA.user.fn.$scroller) { YTMA.user.fn.$scroller.stop(); }

				YTMA.user.fn.$scroller = new YTMA.Scroll('span.ytm_manual > a.ytm_title:not(.ytm_error)', function (a) {
					if (YTMA.Scroll.visibleAll(a, 200)) {
						if (ajax) {
							YTMA.ajax.loadFromDataset(a.dataset);
						} else {
							YTMA.ajax.loadFromCacheDataset(a.dataset);
						}
						// console.log('doc', document.querySelectorAll(YTMA.user.fn.$scroller.selector).length, a.dataset.id);
					}

					if (document.querySelectorAll(YTMA.user.fn.$scroller.selector).length === 0) {
						YTMA.user.fn.$scroller.stop();
					}
				});
			},
			makeForm: function () {
				var e, f = [
					'<div id="ytm_settings" class="ytm_sans ytm_block ytm_normalize"><form action="" title="Double click to close"><div id="ytm_settingst">ytma! Site Settings</div><div class="ytm_field_container">',
					'<fieldset><legend title="Load descriptions from the content sever.">Load Descriptions</legend><p><span><input id="ytma__desc0" type="radio" data-num="0" name="ytma__desc" data-key="desc"><label for="ytma__desc0" title="Load descriptions on demand">Manually</label></span><span><input id="ytma__desc1" type="radio" data-num="1" name="ytma__desc" data-key="desc"><label for="ytma__desc1" title="Load descriptions as they become visible on the screen.">Automatically, on scrolling</label></span></p></fieldset>',
					'<fieldset><legend>HTML5 Players</legend><p><input name="ytma__autoShow" data-key="autoShow" id="ytma__autoShow" type="checkbox"><label for="ytma__autoShow">Automatically show WebM, MP4 and Soundcloud players</label></p></fieldset>',
					'<fieldset><legend>Player Size</legend><p><span><input type="radio" name="ytma__size" data-key="size" data-num="240" id="ytma__size240" /><label for="ytma__size240">S <small>240p</small></label></span><span><input name="ytma__size" data-key="size" type="radio" id="ytma__size360" data-num="360" /><label for="ytma__size360">M <small>360p</small></label></span><span><input type="radio" name="ytma__size" data-key="size" data-num="480" id="ytma__size480" /><label for="ytma__size480">L <small>480p</small></label></span><span><input type="radio" name="ytma__size" data-key="size" data-num="720" id="ytma__size720" /><label for="ytma__size720">X <small>720p</small></label></span></p></fieldset>',
					'<fieldset><legend>Quality</legend><p><span><input name="ytma__quality" data-key="quality" data-num="240" id="ytma__quality240" type="radio"><label for="ytma__quality240">240p</label></span><span><input name="ytma__quality" data-key="quality" id="ytma__quality360" data-num="360" type="radio"><label for="ytma__quality360">360p</label></span><span><input name="ytma__quality" data-key="quality" data-num="480" id="ytma__quality480" type="radio"><label for="ytma__quality480">480p</label></span><span><input name="ytma__quality" data-key="quality" data-num="720" id="ytma__quality720" type="radio"><label for="ytma__quality720">720p</label></span><span><input name="ytma__quality" data-key="quality" data-num="1080" id="ytma__quality1080" type="radio"><label for="ytma__quality1080">1080p</label></span></p></fieldset>',
					'<fieldset><legend>Aspect Ratio</legend><p><span><input name="ytma__ratio" data-key="ratio" type="radio" id="ytma__ratio2" data-num="2" /><label for="ytma__ratio2">16:9</label></span><span><input type="radio" name="ytma__ratio" data-key="ratio" data-num="1" id="ytma__ratio1" /><label for="ytma__ratio1">4:3</label></span></p></fieldset>',
					'<fieldset><legend>YouTube</legend>',
					'<p><input name="ytma__yt_annotation" data-key="yt_annotation" type="checkbox" id="ytma__yt_annotation" /><label for="ytma__yt_annotation">Enable video annotations</label></p>',
					'<p><input name="ytma__yt_nocookie" data-key="yt_nocookie" type="checkbox" id="ytma__yt_nocookie" /><label for="ytma__yt_nocookie">Use https://youtube-nocookie.com to load videos</label></p>',
					'</fieldset>',
					'<fieldset><legend>Window Focus</legend><p><input name="ytma__focus" data-key="focus" type="checkbox" id="ytma__focus" value="focus" /><label for="ytma__focus">After clicking the thumbnail, set the video at the top of the window.</label></p></fieldset>',
					'</div><p><small id="ytm_settings_error" class="ytm_error ytm_none ytm_title">Error! Your settings could not be saved.</small></p><p id="ytm_opts"><button type="button" id="ytmaclose">Close</button> <button type="button" id="ytmareset">Reset</button> <button type="button" id="ytmaclear" title="Remove all video descriptions that have been cached">Reset & Remove Cache</button></p></form></div>'
				].join('');

				YTMA.user.$form = $$.e('div', { className: 'ytm_fix_center ytm_none ytm_box', innerHTML: f }, document.body);
				YTMA.user.error = document.getElementById('ytm_settings_error');

				e = YTMA.Scroll.debounce(YTMA.user.events.save, 500);
				YTMA.user.$form.addEventListener('submit', function (evt) { evt.preventDefault(); }, false);
				YTMA.user.$form.addEventListener('keyup', e, false);
				YTMA.user.$form.addEventListener('click', e, false);

				YTMA.user.$form.addEventListener('dblclick', YTMA.user.events.formToggle, false);
				document.getElementById('ytmaclose').addEventListener('click', YTMA.user.events.formToggle, false);
				document.getElementById('ytmareset').addEventListener('click', YTMA.user.events.reset, false);
				document.getElementById('ytmaclear').addEventListener('click', YTMA.user.events.clear, false);
				document.body.addEventListener('keydown', YTMA.user.events.formToggleKeyboard, false);
			}
		}
	};

	YTMA.css = function () {
		var playerCss = YTMA.Player.css.generator(),
			loadingIcon = 'data:image/gif;base64,R0lGODlhDgAKAJEAAP///+BKV////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAADgAKAAACHFSOeQYI71p6MtAJz41162yBH+do5Ih1kKG0QgEAIfkEBQoAAgAsAAABAA0ACAAAAhSUYGEoerkgdIzKGlu2ET/9ceJmFAAh+QQFCgACACwAAAEADQAIAAACFJRhcbmiglx78SXKYK6za+NxHyYVACH5BAUKAAIALAAAAQANAAgAAAIWVCSAl+hqEGRTLhtbdvTqnlUf9nhTAQAh+QQFCgACACwAAAEADQAIAAACFZRiYCh6uaCRzNXYsKVT+5eBW3gJBQAh+QQJCgACACwAAAAADgAKAAACGpSPaWGwfZhwQtIK8VTUvuxpm9Yp4XlmpiIUADs=';

		// Roboto font-o
		// $$.e('link', {
		// rel: 'stylesheet',
		// $type: 'text/css',
		// href: 'https://fonts.googleapis.com/css?family=Roboto'
		// }, document.body);

		// console.log(playerCss);
		$$.css(playerCss);

		// images
		// todo update(site, size, padding)
		$$.css([
			'.ytm_loading{background:url(', loadingIcon, ') 0 3px no-repeat;}',
			'.ytm_link{background:url(', YTMA.DB.sites.youtube.favicon, ') 0 center no-repeat !important;margin-left:4px;padding-left:20px!important;}',
			'.ytm_link.ytm_link_vimeo{background-image:url(', YTMA.DB.sites.vimeo.favicon, ') !important;background-size:12px 12px !important;padding-left:18px!important}',
			'.ytm_link.ytm_link_vine{background-image:url(', YTMA.DB.sites.vine.favicon, ') !important;background-size:10px 10px!important;padding-left:16px!important}',
			'.ytm_link.ytm_link_soundcloud{background-image:url(', YTMA.DB.sites.soundcloud.favicon, ')!important;padding-left:17px!important}',
			'.ytm_link.ytm_link_html5{background-image:url(', YTMA.DB.sites.html5.favicon, ') !important;padding-left:16px!important}',
			'.ytm_link.ytm_link_gfycat{background-image:url(', YTMA.DB.sites.gfycat.favicon, ') !important;background-size:12px 12px !important;padding-left:16px!important;}',
			'.ytm_link.ytm_link_imgur{background-image:url(', YTMA.DB.sites.imgur.favicon, ') !important;background-size:12px 12px !important;padding-left:16px!important}',
			'.ytm_link.ytm_link_streamable{background-image:url(', YTMA.DB.sites.streamable.favicon, ') !important; background-size: 12px 12px !important;padding-left: 14px !important;}'
		].join(''));

		// todo
		// if (window.NO_YTMA_CSS) { return; }

		$$.css('.ytm_none,.ytm_link br{display:none!important}.ytm_box{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.ytm_block{display:block;position:relative;clear:both;text-align:left;border:0;margin:0;padding:0;overflow:hidden}.ytm_normalize{font-weight:400!important;font-style:normal!important;line-height:1.2!important}.ytm_sans{font-family:Arial,Helvetica,sans-serif!important}.ytm_spacer{overflow:auto;margin:0 0 6px;padding:4px}.ytm_spacer.ytm_site_slim{display:inline}.ytm_clear:after{content:"";display:table;clear:both}.ytm_center{text-align:center}.ytm_link b,.ytm_link strong{font-weight:400!important}.ytm_link u{text-decoration:none!important}.ytm_link i,.ytm_link em{font-style:normal!important}.ytm_trigger{width:118px;height:66px;background-color:#262626!important;cursor:pointer;background-position:-1px -12px;float:left;box-shadow:2px 2px rgba(0,0,0,.3);background-size:auto 90px!important;color:#fff;text-shadow:#333 0 0 2px;font-size:13px}.ytm_trigger:hover{box-shadow:2px 2px #60656b80;opacity:.95}.ytm_trigger var{z-index:2;height:100%;width:100%;position:absolute;left:0;top:0;text-align:right}.ytm_label{display:block;padding:3px 6px;line-height:1.2;font-style:normal}.ytm_init{height:22px;background:rgba(11,11,11,.62);padding:4px 25px 6px 6px}.ytm_site_vine .ytm_trigger{background-color:#90ee90!important;background-size:120px auto!important}.ytm_site_slim .ytm_trigger{background:#e34c26!important;height:auto;box-shadow:0 0 2px #ffdb9d inset,2px 2px rgba(0,0,0,.3);margin:0 3px 0 0;width:auto;transition:all .3s ease-in-out 0s}.ytm_site_slim .ytm_trigger:hover{opacity:.8}.ytm_site_slim .ytm_label{text-shadow:0 0 1px #f06529}.ytm_site_slim .ytm_init{background:transparent}.ytm_bd{float:left;max-width:500px;margin:2px 10px;font-size:90%}.ytm_title{font-weight:700}.ytm_error{color:#cc2f24;font-style:italic}.ytm_loading{font-style:italic;padding:1px 1.5em}.ytm_descr{word-wrap:break-word;max-height:48px;overflow:auto;padding-right:20px}.ytm_descr[data-full]{cursor:pointer}.ytm_descr_open{resize:both;white-space:pre-line}.ytm_descr_open[style]{max-height:none}.ytm_projector{margin-bottom:4px}ul.ytm_control{overflow:hidden;margin:0!important;padding:3px 0 1px;list-style-position:outside!important}.ytm_control li{display:inline;margin:0!important;padding:0!important}.ytm_control li>ul{display:inline-block;margin:0;padding:0 1px 0 0}.ytm_control li ul li{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none;list-style-type:none;cursor:pointer;float:left;color:#858585;border:1px solid #1d1d1d;border-bottom:1px solid #181818;border-top:1px solid #292929;box-shadow:0 0 1px #555;height:14px;font-size:12px!important;line-height:12px!important;background:#222;background:linear-gradient(#2d2c2c,#222);margin:0!important;padding:5px 9px 3px!important}.ytm_control li ul li:first-child{border-radius:2px 0 0 2px}.ytm_control li ul li:last-child{border-left:0!important;border-radius:0 2px 2px 0;margin:0 2px 0 0!important}.ytm_control li ul li:first-child:last-child,.ytm_li_setting{border-radius:2px}.ytm_control li ul li:hover{color:#ccc;text-shadow:1px 1px 0 #333;background:#181818}.ytm_control li ul li[id]{color:#ddd;text-shadow:0 0 2px #444}.ytm_panel_size{background:#000;max-width:100%;}.ytm_panel_switcher[data-standby="true"]{background:#111}.ytm_panel_switcher[data-standby="true"]:after{cursor:cell;color:#0e0e0e;content:"ytma!";display:block;font-size:85px;font-style:italic;font-weight:700;left:50%;position:absolute;text-shadow:2px 1px #181818,-1px -1px #0a0a0a;top:50%;transform:translate(-50%,-50%)}.ytm_site_soundcloud .ytm_panel_size.ytm_soundcloud-playlist{height:334px!important}.ytm_fix_center{background:rgba(51,51,51,.41);height:100%;left:0;position:fixed;top:0;width:100%;z-index:99998}#ytm_settings{z-index:99999;max-width:500px;max-height:85%;overflow:auto;background:#fbfbfb;border:1px solid #bbb;color:#444;box-shadow:0 0 5px rgba(0,0,0,.2),0 0 3px rgba(239,239,239,.1) inset;margin:4% auto;padding:4px 8px 0}#ytm_settings p{margin:5px 0;padding:0}#ytm_settings fieldset{vertical-align:top;border-radius:3px;border:1px solid #ccc;margin:0 0 5px;padding:3px}#ytm_settings legend{padding:3px}#ytm_settings fieldset span{display:inline-block;min-width:5em}#ytm_settings input{vertical-align:baseline!important;margin:3px 5px!important}#ytm_settingst{font-size:110%;border-bottom:1px solid #d00;margin:3px 0 9px;padding:0 3px 3px}#ytm_settings label{cursor:pointer}#ytm_settings small{font-size:90%}#ytm_opts button{cursor:pointer;margin:10px 5px 8px 2px;padding:3px;border:1px solid #adadad;border-radius:2px;background:#eee;font-size:90%}#ytm_opts button:hover{background:#ddd}');
		// $$.css('.ytm_site_youtube .ytm_sans { font-family: \'Roboto\'; }');
	};

	YTMA.ajax = {
		load: function (site, id, uri) {
			console.log('YTMA.ajax.load:', site, id, uri);
			uri = YTMA.DB.sites[site].ajax.replace('%key', id).replace('%uri', uri);

			if (YTMA.DB.sites[site].ajaxExtension) { return this.gmxhr(uri, site, id); }

			console.log('ajax.site?', YTMA.DB.sites[site].ajax.replace('%key', id).replace('%uri', uri));
			if (YTMA.DB.sites[site].ajax) {
				console.log('preping uri');
				return this.xhr(uri, site, id);
			}

			return null;
		},
		loadFromDataset: function (dataset) {
			if (!this.loadFromCacheDataset(dataset)) {
				return this.load(dataset.ytmsite, dataset.ytmid, dataset.ytmuri);
			}
		},
		loadFromCacheDataset: function (dataset) {
			var cache = YTMA.external.dataFromStorage(dataset.ytmsite, dataset.ytmid);

			console.log('YTMA.ajax.cache:', dataset.ytmsite, dataset.ytmid);
			console.log('@cache:', cache);

			if (cache) { YTMA.external.populate(cache); }

			return cache;
		},
		gmxhr: function (uri, site, id) {
			try {
				// console.log('gmxhr starting!');
				GM_xmlhttpRequest({
					method: 'GET',
					url: uri,
					onload: function (response) {
						// console.log(response);
						YTMA.external.parse(response.responseText, site, id);
					},
					onerror: function () {
						console.log('GM Cannot XHR');
						YTMA.ajax.failure.call({ id: id });
					}
				});

				YTMA.ajax.preProcess(id);

			} catch (e) {
				if (YTMA.DB.extension) {
					console.log('attempting cs xhr');
					this.xhr(uri, site, id);
				} else {
					console.log('No applicable CORS request available.');
					this.failure.call({ id: id });
				}
			}
		},
		xhr: function (uri, site, id) {
			var x = new XMLHttpRequest();
			console.log('xhr', uri, id, site);

			YTMA.ajax.preProcess(id);

			x.onreadystatechange = function () {
				if (this.readyState === this.DONE) {
					// console.log(this.readyState, this.status);
					if (this.status === 200) {
						YTMA.external.parse(this.responseText, site, id);
					} else if (this.status === 403) {
						YTMA.external.populate({ site: site, id: id, title: 'Error 403', desc: '' });
						YTMA.external.save({ site: site, id: id, title: 'Error 403', desc: '' });
					} else { // if (this.status >= 400 || this.status === 0) {
						YTMA.ajax.failure.call({ id: id });
					}
				}
			};

			try {
				console.log('sending');
				x.open('get', uri, true);
				x.send();
			} catch (e) {
				console.error('Cannot send xhr', uri);
				YTMA.ajax.failure.call({ id: id });
				console.error(e);
			}
		},
		failure: function () {
			$$.s('.ytm_bd._' + YTMA.escapeId(this.id), function (el) {
				var a = el.querySelector('a');
				a.dataset.tries = a.dataset.tries ? parseFloat(a.dataset.tries) + 1 : 1;
				a.textContent = 'Error, unable to load data. ' + (a.dataset.tries > 0 ? ('(' + a.dataset.tries + ')') : '[Retry]');
				a.className = 'ytm_error ytm_title';
			});
		},
		preProcess: function (id) {
			$$.s('.ytm_manual._' + YTMA.escapeId(id) + ' a', function (el) {
				el.classList.add('ytm_loading');
				el.textContent = 'Loading data . . .';
				el.title = 'Retry loading data.';
			});
		}
	};

	/** E X T E R N A L Apparatus
	 * Data from external sites
	 */
	YTMA.external = {
		version: 'ytma.4.1.dat',
		parse: function (response, site, id) {
			if (this.parsers[site]) {
				response = YTMA.DB.sites[site].rawResponse ? response : JSON.parse(response);
				this.populate(this.helper.cutDescription(this.parsers[site](response, id)));
			}
		},
		parsers: {
			soundcloud: function (j, id) {
				return {
					site: 'soundcloud',
					id: id, //unescape(j.html).match(/tracks\/(\d+)/)[1],
					title: j.title,
					desc: j.description,
					th: removeSearch(j.thumbnail_url)
				};
			},
			vimeo: function (j) {
				j = j[0];
				return {
					site: 'vimeo',
					id: j.id,
					title: j.title + ' ' + YTMA.external.time.fromSeconds(j.duration),
					desc: j.description.replace(/<br.?.?>/g, ''),
					th: decodeURI(j.thumbnail_medium)
				};
			},
			youtube: function (j, id) {
				if (j.pageInfo.totalResults < 1) {
					return { id: id, error: true };
				}

				j = j.items[0];
				var o = {
					site: 'youtube',
					id: id,
					title: j.snippet.title + ' ' + YTMA.external.time.fromIso8601(j.contentDetails.duration),
					desc: j.snippet.description
					// aspectRatio: j.contentDetails.aspectRatio
				};

				return o;
			},
			vine: function (j, id) {
				return {
					site: 'vine',
					id: id,
					title: j.title,
					th: removeSearch(j.thumbnail_url)
				};
			},
			gfycat: function (j, id) {
				j = j.gfyItem;
				if (j) {
					return {
						site: 'gfycat',
						id: id || j.gfyName,
						title: j.title || j.gfyName
					};
				}
			},
			streamable: function (j, id) {
				return {
					site: 'streamable',
					id: id,
					title: j.title || 'Untitled'
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
		unset: function (data) {
			// console.log('unset', data.id);
			if (data.site) {
				delete this.db[data.site][data.id];
				return this.save();
			}
		},
		limitDB: function (max, db) {
			// limits an object's items by half of the max
			// removes the older items at the start of the object
			var keys = Object.keys(db),
				half = Math.floor(max / 2),
				start,
				ndb,
				i;

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
					data.desc = data.desc.substr(0, 130) + ' . . .';
				}
				return data;
			},
			thumbnail: function (data) {
				$$.s('[data-ytmid="%id"].ytm_trigger'.replace('%id', data.id), function (el) {
					el.setAttribute('style', 'background: url(' + data.th + ')');
				});
			},
			titleToggle: function () {
				this.classList.toggle('ytm_descr_open');
				this.textContent = this.textContent.length < 140 ? this.dataset.full : this.dataset.full.substr(0, 130) + ' . . .';
				this.removeAttribute('style');
			}
		},
		time: {
			keepMinutesAndSeconds: function (v, i) {
				return i > 1 || v > 0;
			},
			leadingZero: function (v, i) {
				return i > 0 ? ('00' + v).slice(-2) : v;
			},
			fromArray: function (a) { // [days, hours, mins, secs]
				var b, p = '';

				try {
					// Remove empty values, but keep lower indexes (m:s); a[i] > 0 || i > 1
					// Add leading 0's, ignoring the first index
					// a.slice(0, 1).concat(a.slice(1))
					b = a.filter(this.keepMinutesAndSeconds).map(this.leadingZero);
					p = '(' + b.join(':') + ')';
				} catch (e) {
					console.error('Could not parse this time.');
				}

				console.log({ a: a, b: b, p: p });
				return p;
			},
			fromIso8601: function (iso8601) { // eg PT3M, T29S
				var a,
					parseDigits = function (reg) {
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
				var a = [
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
				return YTMA.ajax.failure.call(data);
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

			if (data.th) { this.helper.thumbnail(data); }

			$$.s('.ytm_bd._' + YTMA.escapeId(data.id), function (el) {
				var q;
				el.innerHTML = '<span class="ytm_title">' + data.title + '</span>';
				if (data.desc) {
					q = $$.e('q', { className: 'ytm_descr ytm_block', textContent: data.desc }, el);
					if (data.full) {
						q.dataset.full = data.full;
						q.title = 'Click to toggle the length of the description.';
						q.addEventListener('dblclick', YTMA.external.helper.titleToggle, false);
					}
				}
			});
		},
		dataFromStorage: function (site, id) {
			if (this.db && this.db[site]) {
				return this.db[site][id];
			}
		},
		events: {
			manualLoad: function (e) {
				// console.log(this);
				e.preventDefault();
				YTMA.ajax.loadFromDataset(e.target.dataset);
			}
		}
	};
	YTMA.external.db = strg.grab(YTMA.external.version, {});

	/** Database */
	YTMA.DB = {
		postInit: function () {
			if (YTMA.user.preferences.yt_nocookie) {
				YTMA.DB.sites.youtube.home = 'https://www.youtube-nocookie.com/';
				YTMA.DB.sites.youtube.embed = 'https://www.youtube-nocookie.com/embed/%key';
			}
		},
		extension: window.chrome && window.chrome.extension,
		browser: {
			pod: YTMA.reg.ios.test(navigator.userAgent),
			ie: !!document.documentMode, // IE, basically | window.navigator.cpuClass
			safari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0
		},
		views: {
			getAllSiteRegExps: function () {
				var regs = [];

				$$.o(YTMA.DB.sites, function (k, site) {
					if (site.reg) {
						regs.push(site.reg);
					}
				});

				return new RegExp('\\b' + regs.join('|'));
			},
			getAllSiteSelectors: function () {
				var sels = [];

				$$.o(YTMA.DB.sites, function (k, site) {
					if (site.selector) {
						sels.push(site.selector);
					}
				});

				return sels.join();
			},
			getPlayerSources: function (siteName) {
				return YTMA.DB.sources[siteName] || YTMA.DB.sources.iframe;
			},
			getToolbar: function (site) {
				var bar = YTMA.DB.customToolbars[site] || {};

				return {
					ratio: bar.ratio === undefined ? true : bar.ratio,
					size: bar.size === undefined ? true : bar.size
				};
			},
			getPlayerDimmensions: function (ratio, size) {
				return 'ytm_panel ytm_block ytm_panel-' + YTMA.DB.playerSize.ratios[ratio]
					+ ' ytm_panel-' + YTMA.DB.playerSize.sizes[size];
			},
			getPlayerQuality: function (quality) {
				return YTMA.DB.qualities[quality] || YTMA.DB.qualities[360];
			}
		},
		sites: { // supported sites - to add more also make a parser (if api is available) and add an item to sources (if necessary)
			youtube: {
				title: 'ytma!',
				home: 'https://www.youtube.com/',
				embed: 'https://www.youtube.com/embed/%key',
				ajax: 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=%key' + window.atob('JmtleT1BSXphU3lEVG5INkxzRERyVElYaFZTZWRQQjlyRHo1czBSczQzZnM='),
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
				ajax: 'https://gfycat.com/cajax/get/%key',
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
		},
		sources: {
			iframe: function (data) {
				var key = YTMA.DB.sites[data.site].key;

				return [
					{ type: 'text/html', src: YTMA.DB.sites[data.site].embed.replace('%key', data[key]) }
				];
			},
			'html5-audio': function (data) {
				return [
					{ type: 'audio/mp3', src: data.uri }
				];
			},
			html5: function (data) {
				// attaching the type as either mp4 or webm

				if (/(?:webm)/.test(data.uri)) {
					return [
						{ type: 'video/webm', src: data.uri }
					];
				}

				return [
					{ type: 'video/mp4', src: data.uri },
					{ type: 'video/webm', src: data.uri },
					{ type: 'video/ogg; codecs="theora, vorbis"', src: data.uri }
				];
			},
			imgur: function (data) {
				var src = YTMA.DB.sites.imgur.embed.replace('%key', data.id);

				return [
					{ type: 'video/webm', src: src + '.webm' },
					{ type: 'video/mp4', src: src + '.mp4' }
				];
			},
			youtube: function (data, attrs) {
				var params = '?html5=1&version=3&modestbranding=1&rel=0&showinfo=1&vq=' + attrs.quality
					+ '&iv_load_policy=' + YTMA.user.preferences.yt_annotation
					+ '&start=' + attrs.start
					+ '&rel=0';// + YTMA.user.preferences.yt_volume;

				return [
					{ type: 'text/html', src: YTMA.DB.sites.youtube.embed.replace('%key', data.id) + params }
				];
			}
		},
		customToolbars: {
			vine: {
				ratio: false,
				size: true
			},
			soundcloud: {
				ratio: false,
				size: false
			}
		},
		playerSize: {
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
		},
		qualities: {
			240: 'small',
			360: 'medium',
			480: 'large',
			720: 'hd720',
			1080: 'hd1080',
			1081: 'highres'
		}
		// videoTypes: (function () {
		// 	var v = document.createElement('video');

		// 	return {
		// 		ogg: !!v.canPlayType('video/ogg; codecs="theora, vorbis"'),
		// 		webm: !!v.canPlayType('video/webm'),
		// 		mp4: !!v.canPlayType('video/mp4')
		// 	};
		// }()),
	};

	/** U I CLASS
	 * Class for the player controls
	 */
	YTMA.UI = function (ytma) {
		this.ytmx = ytma;

		this.play = new YTMA.Player(this.ytmx);
		this.open = false;
		this.selected = { size: null, ratio: null };

		this.trigger = ytma.spn;
		this.projector = $$.e('div', { className: 'ytm_projector ytm_none ytm_block ytm_normalize ytm_sans' });
		this.control = $$.e('ul', { className: 'ytm_control ytm_sans' });
		this.customBar = YTMA.DB.views.getToolbar(this.ytmx.data.site);
		this.controlBar();
	};

	YTMA.UI.ratios = {
		SD: 1,
		HD: 2,
		PORTRAIT: 3
	};

	YTMA.UI.sizes = {
		HIDDEN: 0,
		S: 240,
		M: 360,
		L: 480,
		X: 720
	};

	/** Trigger is the VAR element */
	YTMA.UI.createFromTrigger = function (t) {
		console.log('createFromTrigger');
		if (t.hasAttribute('data-ytmuid') && !YTMA.set[t.dataset.ytmuid]) {
			console.log('createFromTrigger-new');
			YTMA.addToSet(new YTMA()._reactivate(t));
		}
		console.log('createFromTrigger-ui');
		return YTMA.set[t.dataset.ytmuid].getUI();
	};

	YTMA.UI.events = {
		$fire: {
			settings: function () {
				YTMA.user.events.formToggle();
			},
			close: function () {
				if (YTMA.DB.sites[this.ytmx.data.site].scroll) {
					console.log('events.close-1');
					this.hideAllPlayers();
				} else {
					console.log('events.close-2');
					this.ytmx.disableOpenOnScroll();
					this.hidePlayer();
				}
			},
			ratio: function (li) {
				var n = parseInt(li.dataset.value, 10);
				this.play.dimmensions(n);
				this.markSelected(li, 'ratio');
			},
			size: function (li) {
				var n = parseInt(li.dataset.value, 10);
				this.play.dimmensions(null, n);
				this.markSelected(li, 'size');
			}
		},
		videoBar: function (e) {
			var el = e.target, t;

			if (el.tagName.toLowerCase() === 'li' && el.dataset && el.dataset.type) {
				t = el.dataset.type;
				if (YTMA.UI.events.$fire[t]) {
					YTMA.UI.events.$fire[t].call(this, el);
				}
			}
		}
	};

	YTMA.UI.prototype = {
		constructor: YTMA.UI,
		resetViewSize: function () {
			this.play.dimmensions();
			this.setControlBarSize(this.play.attrs.size);
		},
		showOnScroll: function (el) {
			if (!this.open && this.ytmx.canScroll() && this.ytmx.isBelow(el)) {
				this.showPlayer();
			}
		},
		showPlayer: function () {
			this.open = true;

			this.trigger.classList.add('ytm_none');
			this.projector.classList.remove('ytm_none');

			this.attachPlayPanel();
			this.play.switchOn();

			if (YTMA.user.preferences.focus) {
				document.location.hash = '#' + this.ytmx.container.id;
			}
		},
		hidePlayer: function () {
			this.open = false;

			this.play.switchOff();
			this.trigger.classList.remove('ytm_none');
			this.projector.classList.add('ytm_none');
		},
		attachPlayPanel: function () {
			if (!this.play.panel.parentNode) {
				// console.log('attaching display panel');
				this.projector.appendChild(this.play.panel);
			}
		},
		hideAllPlayers: function () {
			var group = YTMA.collect(this.ytmx.data.id);
			console.log('closing all', this.ytmx.data.id, group.length);
			group.forEach(function (y) {
				y.disableOpenOnScroll();
				y.getUI().hidePlayer();
			});
		},
		setControlBarSize: function (size) {
			this.markSelected(this.control.querySelector('li[data-value="' + size + '"]'), 'size');
		},
		controlBar: function () {
			var f = document.createDocumentFragment();

			$$.a(f,
				this.customBar.ratio ? this.buildList('ytm_ratios', [
					{ type: 'ratio', text: '4:3', value: YTMA.UI.ratios.SD, title: 'SD' },
					{ type: 'ratio', text: '16:9', value: YTMA.UI.ratios.HD, title: 'Landscape' },
					{ type: 'ratio', text: '9:16', value: YTMA.UI.ratios.PORTRAIT, title: 'Portrait' }]) : null,
				this.customBar.size ? this.buildList('ytm_sizes', [
					{ type: 'size', text: '\u00D8', value: YTMA.UI.sizes.HIDDEN, title: 'Hide the video.' },
					{ type: 'size', text: 'S', value: YTMA.UI.sizes.S, title: '240p' },
					{ type: 'size', text: 'M', value: YTMA.UI.sizes.M, title: '360p' },
					{ type: 'size', text: 'L', value: YTMA.UI.sizes.L, title: '480p' },
					{ type: 'size', text: 'X', value: YTMA.UI.sizes.X, title: '720p' }]) : null,
				this.buildList('ytm_options', [
					strg.on ? { type: 'settings', text: '!', title: 'YTMA Settings' } : null,
					{ type: 'close', text: '\u00D7', title: 'Close the video.' }])
			);

			this.control.appendChild(f);
			this.control.addEventListener('click', YTMA.UI.events.videoBar.bind(this), false);
			this.projector.appendChild(this.control);
			this.ytmx.container.insertBefore(this.projector, this.trigger.nextSibling);
		},
		markSelected: function (el, type) {
			el.id = type + this.ytmx.data.uid;
			try {
				this.selected[type].removeAttribute('id');
			} catch (e) { }
			this.selected[type] = el;
		},
		buildList: function (className, elements) {
			var li = $$.e('li'),
				ul = $$.e('ul', { className: className }, li),
				f = document.createDocumentFragment(),
				i,
				e;

			for (i = 0; i < elements.length; i++) {
				e = elements[i];
				if (e) {
					f.appendChild(this.li(e.type, e.text, e.value, e.title));
				}
			}
			ul.appendChild(f);
			return li;
		},
		li: function (type, txt, value, title) {
			var l = $$.e('li', { _type: type, textContent: txt, _value: value, title: title });
			if ((type === 'size' && this.play.attrs.size === value) || (type === 'ratio' && this.play.attrs.ratio === value)) {
				this.markSelected(l, type);
			}
			return l;
		}
	};

	/** P L A Y E R CLASS
	 *  @param parent YTMA instance
	 */
	YTMA.Player = function (parent) {
		this.parent = parent;

		this.mode = 'off';

		this.attrs = {
			sources: null,
			quality: YTMA.DB.views.getPlayerQuality(YTMA.user.preferences.quality),
			size: null,
			ratio: null,
			start: this.time(),
			type: null
		};

		this.attrs.sources = YTMA.DB.views.getPlayerSources(parent.data.site)(parent.data, this.attrs);

		// todo improve type/media
		this.attrs.type = this.findType();
		this.media = YTMA.Player.makeMedia[this.attrs.type](this);

		this.channel = $$.e('div', { className: 'ytm_panel_channel ytm_block' }, this.media, true);
		this.switcher = $$.e('div', { className: 'ytm_panel_switcher ytm_panel_size ytm_block ytm_' + this.attrs.type, _ytmuid: this.parent.data.uid, _standby: true });
		this.panel = $$.e('div', { className: 'ytm_panel ytm_block' }, this.switcher, true);

		if (parent.data.site === 'soundcloud' && YTMA.reg.extra.soundcloud.playlist.test(parent.anchor.href)) {
			this.media.classList.add('ytm_soundcloud-playlist');
			this.switcher.classList.add('ytm_soundcloud-playlist');
		}

		this.dimmensions(YTMA.user.preferences.ratio, YTMA.user.preferences.size);
	};

	YTMA.Player.css = {
		item: function (key, value) {
			if (isNumber(value)) {
				value += 'px';
			}

			return '\t' + key + ': ' + value + ';\n';
		},
		iter: function (css, cssEntries) {
			$$.o(cssEntries, function (key, value) {
				css.push(YTMA.Player.css.item(key, value));
			});
			css.push('}');
		},
		generator: function () {
			var css = [];

			$$.o(this.sizes, function (size, sizes) {
				$$.o(sizes, function (dimm, keys) {
					css.push('\n.ytm_panel-' + size + '.ytm_panel-' + dimm + ' .ytm_panel_size {\n');
					YTMA.Player.css.iter(css, keys);
				});
			});

			// add site overrides
			$$.o(this.sites, function (site, data) {
				$$.o(data, function (setting, keys) {
					if (setting === 'all') {
						css.push('\n.ytm_site_' + site + ' .ytm_panel_size {\n');
					} else {
						css.push('\n.ytm_site_' + site + ' .ytm_panel-' + setting + ' .ytm_panel_size {\n');
					}
					YTMA.Player.css.iter(css, keys);
				});
			});

			return css.join('');
		},
		sizes: (function () {
			var merge = {};

			$$.o(YTMA.DB.playerSize.sizes, function (num, size) {
				if (num >= 0) {
					merge[size] = {};

					$$.o(YTMA.DB.playerSize.ratios, function (k, ratio) {
						if (ratio === 'pr') {
							var w = Math.floor(num * 0.95); // smaller than the normal sizes
							merge[size][ratio] = {
								width: w,
								height: Math.floor(w * YTMA.DB.playerSize.aspects[k])
							};
						} else {
							merge[size][ratio] = {
								width: Math.floor(num * YTMA.DB.playerSize.aspects[k]),
								height: num
							};
						}
					});
				}
			});

			return merge;
		}()),
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

	YTMA.Player.makeMedia = {
		$css: function (type) {
			return 'ytm_panel_media ytm_panel_size ytm_block ytm_' + type;
		},
		video: function (player) {
			var video = $$.e('video', {
				controls: true,
				autoplay: false,
				loop: true,
				className: this.$css('video'),
				$allowscriptaccess: true,
				preload: 'metadata'
			}), links = [];

			player.attrs.sources.forEach(function (source) {
				$$.e('source', { src: source.src, $type: source.type }, video);

				links.push('<a href="' + source.src + '">' + source.src + '</a>');
			});

			$$.e('p', { innerHTML: 'Could not load source(s): ' + links.join('<br />') }, video);

			return video;
		},
		iframe: function (player) {
			return $$.e('iframe', {
				$allowfullscreen: true,
				$referrerpolicy: 'no-referrer',
				// $sandbox: 'allow-same-origin allow-scripts allow-popups',
				$type: player.attrs.sources[0].type,
				src: player.attrs.sources[0].src,
				className: this.$css('iframe')
			});
		},
		audio: function (player) {
			return $$.e('audio', {
				src: player.attrs.sources[0].src,
				$type: player.attrs.sources[0].type
			});
		}
	};

	YTMA.Player.prototype = {
		constructor: YTMA.Player,
		dimmensions: function (ratio, size) {
			this.attrs.ratio = isNumber(ratio) ? ratio : this.attrs.ratio;
			this.attrs.size = isNumber(size) ? size : this.attrs.size;
			this.panel.className = YTMA.DB.views.getPlayerDimmensions(this.attrs.ratio, this.attrs.size);
		},
		time: function () {
			try {
				var m = this.parent.data.uri.match(YTMA.reg.time).slice(1, 3);
				return ((+m[0] || 0) * 60 * 60) + ((+m[1] || 0) * 60) + (+m[2] || 0);
			} catch (e) { return 0; }
		},
		findType: function () {
			if (this.parent.data.site === 'html5-audio') { return 'audio'; }
			if (YTMA.DB.sites[this.parent.data.site].videoTag) { return 'video'; }
			return 'iframe';
		},
		switchOff: function () {
			// console.log('removed media');

			if (this.media.pause) {
				console.log('pausing');
				this.media.pause();
			}

			try {
				this.switcher.removeChild(this.channel);
			} catch (e) {
				// console.error(e);
			}
			this.mode = 'off';
		},
		switchOn: function () {
			if (this.attrs.size === 0) {
				this.attrs.size = YTMA.user.preferences.size;
				this.parent.ui.resetViewSize();
			}
			// console.log('switch to media');
			this.switcher.appendChild(this.channel);
			this.switcher.dataset.standby = false;
			this.mode = 'on';
		},
		switchStandby: function () {
			// console.log('switch to standby');
			this.switchOff();
			this.switcher.dataset.standby = true;
			this.mode = 'standby';
		},
		isStandby: function () {
			return this.mode === 'standby';
		}
	};

	YTMA.prototype = {
		constructor: YTMA,
		getUI: function () {
			if (!this.ui) {
				this.ui = new YTMA.UI(this);
			}

			return this.ui;
		},
		setup: function () {
			var site = YTMA.DB.sites[this.data.site];

			if (site) {
				this.spn.title = site.title || 'ytma!';

				if (site.thumb) {
					this.spn.style.backgroundImage = site.thumb.replace('%key', this.data.id);
				}

				if (site.https) {
					this.anchor.href = this.anchor.href.replace('http:', 'https:');
				}
			}

			try {
				this.dom.custom[this.data.site].call(this);
			} catch (e) { }

			this.dom.link.call(this);
			this.dom.span.call(this);
		},
		disableOpenOnScroll: function () {
			this.anchor.dataset.ytmscroll = false;
		},
		canScroll: function () {
			return this.anchor.dataset.ytmscroll === 'true';
		},
		isBelow: function (link) {
			return YTMA.Scroll.compare(this.anchor, link) < 1;
		},
		dom: {
			custom: { // modifies interface according to site
				youtube: function () {
					this.spn.addEventListener('mouseenter', YTMA.events.thumb.start, false);
					this.spn.addEventListener('mouseleave', YTMA.events.thumb.stop, false);
					this.anchor.href = this.anchor.href.replace('youtu.be/', 'youtube.com/watch?v=');
				}
			},
			link: function () {
				if (this.anchor.getElementsByTagName('img').length === 0) {
					this.anchor.className += ' ytm_link ytm_link_' + this.data.site + ' ';
				}
				this.anchor.dataset.ytmid = this.data.id;
				this.anchor.dataset.ytmuid = this.data.uid;
				this.anchor.dataset.ytmsid = this.data.sid;
				this.anchor.title = 'Visit the video page.';
				this.anchor.parentNode.insertBefore(this.container, this.anchor.nextSibling);
			},
			span: function () {
				var f = document.createDocumentFragment(),
					site = YTMA.DB.sites[this.data.site];

				$$.e('span', { className: 'ytm_init ytm_label ytm_sans ytm_box', textContent: this.spn.title }, this.spn);
				$$.e('var', { className: 'ytm_label ytm_box', _ytmid: this.data.id, _ytmuid: this.data.uid, _ytmsid: this.data.sid, _ytmsite: this.data.site, textContent: '\u25B6' }, this.spn);

				this.spn.title = 'Watch now!';
				f.appendChild(this.spn);

				if (site.ajax) { f.appendChild(this.dom.dataLoadLink.call(this)); }
				if (site.slim) { this.container.classList.add('ytm_site_slim'); }
				if (site.scroll) { this.anchor.classList.add('ytm_scroll'); }

				this.container.appendChild(f);
			},
			dataLoadLink: function () {
				var a, s;
				s = $$.e('span', { className: 'ytm_bd ytm_normalize ytm_manual _' + this.data.sid });
				a = $$.e('a', {
					className: 'ytm_title',
					textContent: 'Load description.',
					href: '#',
					title: 'Load this video\'s description.',
					_ytmid: this.data.id,
					_ytmsite: this.data.site,
					_ytmuri: this.data.uri,
					_ytmdescription: 'true'
				});
				return $$.a(s, a);
			}
		}
	};

	/**
	 *  Creates a new YTMA from the given attributes
	 *  @String|Number id Unique ID
	 *  @String site Website eg: youtube, vimeo
	 *  @HTMLAnchorElement a Anchor element
	 */
	YTMA.prototype._new = function (id, site, a) {
		var uid = YTMA.escapeId(id + '_' + (YTMA.num += 1));

		this.data = {
			id: id,
			uid: YTMA.escapeId(uid), // unique id
			sid: YTMA.escapeId(id), // shared id
			site: site,
			uri: a.href
		};

		this.ui = null;

		if (!a.hasAttribute('data-ytmscroll')) { a.dataset.ytmscroll = true; }

		this.anchor = a;

		this.spn = $$.e('span', { className: 'ytm_trigger ytm_block ytm_normalize ytm_sans', _ytmid: this.data.id, _ytmsite: this.data.site });
		this.container = $$.e('div', { id: 'w' + this.data.uid, className: 'ytm_spacer ytm_block ytm_site_' + this.data.site });

		return this;
	};

	/**
	 *  Recreates a YTMA object from a trigger element
	 *  @HTMLElement
	 */
	YTMA.prototype._reactivate = function (trigger) {
		var id = trigger.dataset.ytmid,
			a = document.querySelector('a[data-ytmuid="' + trigger.dataset.ytmuid + '"]');

		this.data = {
			id: id,
			uid: trigger.dataset.ytmuid,
			sid: trigger.dataset.ytmsid,
			site: trigger.dataset.ytmsite,
			uri: a.href
		};

		this.ui = null;
		this.anchor = a;
		this.spn = trigger.parentElement;
		this.container = this.spn.parentElement;

		return this;
	};

	/** S C R O L L CLASS
	 * Window-Scroll Event Helper
	 */
	YTMA.Scroll = (function () {

		function Scroll(selector, cb, delay) {
			this.selector = selector;
			this.cb = cb;

			// console.log('YTMA.Scroll Monitor: ', selector);
			this.bound = Scroll.debounce(this.monitor.bind(this), delay || 500);

			this.bound();
			window.addEventListener('scroll', this.bound, false);
		}

		Scroll.debounce = function (fn, delay) {
			var timeout;
			delay = delay || 250;

			return function () {
				var self = this, args = arguments, timed;

				timed = function () {
					timeout = null;
					fn.apply(self, args);
				};

				window.clearTimeout(timeout);
				timeout = window.setTimeout(timed, delay);
			};
		};

		Scroll.visible = function (el) {
			var bound = el.getBoundingClientRect();
			return (bound.top >= 0 && bound.top <= document.documentElement.clientHeight);
		};

		Scroll.visibleAll = function (el, offset) {
			var bound = el.getBoundingClientRect(),
				height = document.documentElement.clientHeight;
			offset = isNumber(offset) ? +offset : 0;
			return ((bound.bottom + offset >= 0)
				&& (bound.top <= height + offset || bound.bottom <= height - offset));
		};

		/** Returns 1, 0, -1 when el1 is above, exactly the same, or below el2 */
		Scroll.compare = function (el1, el2) {
			var a = el1.getBoundingClientRect().y,
				b = el2.getBoundingClientRect().y;

			if (a < b) { return 1; }
			if (a === b) { return 0; }
			return -1;
		};

		Scroll.prototype = {
			stop: function () {
				// console.log('clear scroll: ', this.selector);
				window.removeEventListener('scroll', this.bound);
			},
			monitor: function () {
				$$.s(this.selector, this.cb);
			}
		};

		return Scroll;

	}());

	YTMA.main();

}());
