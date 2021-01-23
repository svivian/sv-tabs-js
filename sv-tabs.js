// load namespace
SV = window.SV || {};

SV.Tabs = (function() {

	// constructor
	return function(tabsWrapper, userConfig) {

		// private members

		const defaultOptions = {
			equalHeight: false,
			useAnchors: false,
		};
		let config = {};

		let allTabs, allPanels;

		// public api
		let methods = {};

		// private methods

		// override default options with user config
		const extend = function(defaults, userArgs) {
			for (let i in userArgs) {
				defaults[i] = userArgs[i];
			}

			return defaults;
		};

		// get tab ID from element
		const getTabId = function(elem) {
			let href = elem.getAttribute('href');
			if (href)
				return href.replace('#', '');

			return '';
		}

		const init = function() {
			// tabHolder = tabsWrapper;
			config = extend(defaultOptions, userConfig);

			tabList = tabsWrapper.querySelector(':scope > .sv-tabs-tab-list');
			allTabs = tabsWrapper.querySelectorAll(':scope > .sv-tabs-tab-list > .sv-tabs-tab');
			allPanels = tabsWrapper.querySelectorAll(':scope > .sv-tabs-panel-list > .sv-tabs-panel');

			if (!tabList || !allTabs || !allPanels) {
				throw 'HTML structure is incorrect';
			}

			// check panels and tabs match
			const numTabs = allTabs.length;
			const numPanels = allPanels.length;
			if (numTabs !== numPanels) {
				throw 'Number of tabs (' + numTabs + ') does not match number of panels (' + numPanels + ')';
			}

			// switch tabs on click
			tabList.addEventListener('click', function(ev) {
				ev.preventDefault();

				let tab = ev.target.closest('.sv-tabs-tab');
				if (!tab)
					return;

				let tabId = getTabId(tab);
				methods.showTab(tabId);
			});

			let regex = location.hash.match(/#tab=(.+)/);
			if (regex) {
				// activate tab from hash (#tab=ID)
				methods.showTab(regex[1]);
			} else if (allTabs[0]) {
				// activate first tab
				methods.showTab(getTabId(allTabs[0]))
			}
		};

		// public methods

		// make tab (and panel) with this ID visible
		methods.showTab = function(tabId) {
			let showingFirst = false;

			// panels can be out of order, so loop all and check IDs
			for (let i = 0; i < allTabs.length; i++) {
				const thisTab = allTabs[i];
				const thisPanel = allPanels[i];

				// show/hide this tab
				if (getTabId(thisTab) === tabId) {
					thisTab.classList.add('active');
					if (i === 0)
						showingFirst = true;
				} else {
					thisTab.classList.remove('active');
				}

				// show/hide this panel
				if (thisPanel.id === tabId) {
					thisPanel.classList.add('active');
				} else {
					thisPanel.classList.remove('active');
				}
			}

			// add clicked tab to hashbang anchor as #tab=ID, except first one
			if (config.useAnchors && history.replaceState) {
				var state = showingFirst ? window.location.pathname + window.location.search : '#tab=' + tabId;
				history.replaceState(null, null, state);
			}
		};

		init();

		return methods;
	};

})();
