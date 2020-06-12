import strg from './strg';
import _ from './_';

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
			strg.save(update.key, { date: update.time(), version, page });
			update.link();
		}
	},
	link: () => {
		if (update.show) { return; }
		update.show = true;

		const { page } = strg.read(update.key);
		const link = `
				<a href="${page || update.page}" id=updatev3 title=Update target=_blank>
					An update for ${update.name} is available.
				</a>`;

		_.css(update.css);
		document.body.insertAdjacentHTML('beforeend', link);
		_.on(document.body, 'click', '#updatev3', e => e.target.style.display = 'none');
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

export default update;