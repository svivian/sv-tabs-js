
CleverTabs - a jQuery tab plugin
=================================================

Yawn, yet another tab plugin...

HTML structure:

	<div class="ctabs-wrapper">
		<ul class="ctabs-tab-list">
			<li class="ctabs-tab"><a href="#tab1">Tab 1</a></li>
			<li class="ctabs-tab"><a href="#tab2">Tab 2</a></li>
		</ul>
		<ul class="ctabs-panel-list">
			<li id="tab1" class="ctabs-panel">Tab 1 content.</li>
			<li id="tab2" class="ctabs-panel">Tab 2 content.</li>
		</ul>
	</div>

Javascript:

	$(function () {
		$('.ctabs-wrapper').clevertabs();
	});

A few notes:

- The first tab in the list is the one set to be active initially.
- The anchor link on a tab must target an ID of one of the panels, i.e. `<a href="#mytabname">` would target `<li id="mytabname">`.
- The panels can appear in any order in the source. The anchor will show the tab with the corresponding ID, wherever it is.
- The CSS is generated from the SASS file `clevertabs.scss`. Custom theme styles can be added in the placeholder selectors at the bottom of the file.
