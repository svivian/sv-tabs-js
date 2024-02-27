SV-Tabs
=================================================

**sv-tabs-js** is a vanilla JavaScript plugin for displaying tabs.


## Installation

SV-Tabs can be installed via npm:

```sh
npm install sv-tabs-js
```

Then use the file `node_modules/sv-tabs-js/src/sv-tabs.js` in your project - either directly in a `<script>` tag, or passing into your bundler/task runner.

Alternatively, you can download or link to a minified version via [jsDelivr](https://www.jsdelivr.com/package/npm/sv-tabs-js).


## Example usage

1. Start with this HTML structure:

	```html
	<div class="sv-tabs-wrapper">
		<nav class="sv-tabs-tab-list">
			<a class="sv-tabs-tab active" href="#tab1">Tab 1</a>
			<a class="sv-tabs-tab" href="#tab2">Tab 2</a>
		</nav>
		<div class="sv-tabs-panel-list">
			<div class="sv-tabs-panel active" id="tab1">Tab 1 content.</div>
			<div class="sv-tabs-panel" id="tab2">Tab 2 content.</div>
		</div>
	</div>
	```

	The classes we use are:

	- `.sv-tabs-wrapper` - the main container
	- `.sv-tabs-tab-list` - the container for the tab elements
	- `.sv-tabs-tab` - the tab elements, which must be links pointing to the ID of the panel (i.e. `href="#tab1"` to target `id="tab1"`)
	- `.sv-tabs-panel-list` - the container for the panel elements
	- `.sv-tabs-panel` - the panel elements, which contain the content for each tab, and must have an ID that matches the tab's `href`

2. Style the tabs and panels as desired. Some basic CSS can be found in `src/sv-tabs.css`, which includes custom properties (variables) that can be modified to suit. (The Sass file is now deprecated and will be removed in a future version.)

	```html
	<link rel="stylesheet" href="/path/to/sv-tabs.css">
	```

2. Include the SV-Tabs script in your page's `<head>`. For performance reasons we are using the `defer` attribute:

	```html
	<script defer src="/path/to/sv-tabs.js"></script>
	```

3. Initialize SV.Tabs by passing in the wrapper element followed by any custom options. As we are deferring script loading above, we must run this after page load:

	```html
	<script>
	// Run on page load
	document.addEventListener('DOMContentLoaded', function() {
		// get the wrapper element
		const wrapper = document.querySelector('.sv-tabs-wrapper');
		// create a new Tabs object
		let svTabs = new SV.Tabs(wrapper, {useAnchors: true});
	});
	</script>
	```


## Configuration

The following options can be passed in the second parameter to SV.Tabs:

- `useAnchors` (default: `false`): this will add "hashtag anchors" to the URL, and load the appropriate tab when the page is reloaded or the users navigates away then comes back. This allows linking to a specific tab on a page.

- `equalHeight` (default: `false`): this will set all tabs to be the same height; this prevents subsequent content from shifting up and down when tabs are clicked.


## Methods

SV-Tabs has 1 method, `showTab` which manually shows a particular tab given its ID, e.g. `svTabs.showTab('tab2')` in the above example.


## Extras

The first tab in the list will automatically be set to be active initially. However, it's recommended to add the "active" class to the HTML if possible (tab and panel), to avoid "FOUT" (Flash Of *Unactivated Tabs*).

The panels can appear in any order in the source (although this is not recommended). The anchor will show the tab with the corresponding ID, wherever it is.
