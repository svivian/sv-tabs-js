
svTabs - a jQuery tab plugin
=================================================

Yawn, yet another tab plugin...

HTML structure:

	<div class="svtabs-wrapper">
		<ul class="svtabs-tab-list">
			<li class="svtabs-tab"><a href="#tab1">Tab 1</a></li>
			<li class="svtabs-tab"><a href="#tab2">Tab 2</a></li>
		</ul>
		<ul class="svtabs-panel-list">
			<li id="tab1" class="svtabs-panel">Tab 1 content.</li>
			<li id="tab2" class="svtabs-panel">Tab 2 content.</li>
		</ul>
	</div>

Javascript:

	$(function () {
		$('.svtabs-wrapper').svTabs();
	});

A few notes:

- The first tab in the list is the one set to be active initially.
- The anchor link on a tab must target an ID of one of the panels, i.e. `<a href="#mytabname">` would target `<li id="mytabname">`.
- The panels can appear in any order in the source. The anchor will show the tab with the corresponding ID, wherever it is.
- The CSS is generated from the SASS file `svtabs.scss`. Custom theme styles can be added in the placeholder selectors at the bottom of the file.
- The `hideSingle` option will hide the tab if there is only one (useful when tabs are auto-generated). Pass `{hideSingle: true}` into the `svTabs()` function to use it.
- The `equalHeight` option will set all tabs to be the same height; this prevents subsequent content from shifting up and down when tabs are clicked. Pass `{equalHeight: true}` into the `svTabs()` function to use it.
- The `useAnchors` option will add "hashtag anchors" to the URL, and load the appropriate tab when the page is reloaded or the users navigates away then comes back. Pass `{useAnchors: true}` into the `svTabs()` function to use it.
