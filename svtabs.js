/* svTabs v1.4 - jQuery tabs plugin */
(function ($) {
	$.fn.svTabs = function (options) {
		return this.each(function () {
			options = $.extend({
				hideSingle: false,
				equalHeight: false,
				useAnchors: false
			}, options);

			// Cache jQuery objects.
			var $wrapper = $(this);
			var $allTabs = $wrapper.find('> .svtabs-tab-list > .svtabs-tab');
			var $allPanels = $wrapper.find('> .svtabs-panel-list > .svtabs-panel');

			// Make sure tabs and panels match.
			var numTabs = $allTabs.length;
			var numPanels = $allPanels.length;
			if ( numTabs !== numPanels ) {
				$.error('Number of tabs ('+numTabs+') does not match number of panels ('+numPanels+')');
				return;
			}

			// Add click event to each tab. We use a loop here so that we have the correct
			// index (in the case of non-tab siblings).
			$allTabs.each(function (i) {
				var $thisTab = $(this);
				var $link = $('a', $thisTab);
				var tabId = $link.attr('href');

				// Manually add absolute positioning so that non-JS users don't get overlapping panels.
				if ( options.equalHeight )
					$allPanels.eq(i).css({position: 'absolute'});

				$link.on('click', function (ev) {
					// Reset tabs.
					$allTabs.removeClass('svtabs-active');
					$allPanels.addClass('svtabs-panel-hidden');
					// Set target tab as active.
					$allTabs.eq(i).addClass('svtabs-active');
					$(tabId).removeClass('svtabs-panel-hidden');

					// Add clicked tab to hashbang anchor (except first one)
					if (options.useAnchors && history.replaceState) {
						if ($thisTab.index() > 0)
							history.replaceState(null, null, tabId.replace('#', '#!'));
						else
							history.replaceState(null, null, '');
					}

					// Prevent anchor jumping
					ev.preventDefault();
				});
			});

			// Hide tab if only one
			if ( numTabs == 1 && options.hideSingle ) {
				$wrapper.addClass('svtabs-onetab');
			}

			// Calculate tallest tab and sets panel wrapper to that height.
			if ( options.equalHeight ) {
				var maxHeight = 0;
				$allPanels.each(function (i) {
					var ht = $(this).outerHeight();
					if ( ht > maxHeight ) {
						maxHeight = ht;
					}
				});
				$wrapper.find('>.svtabs-panel-list').height(maxHeight);
			}

			// Set previously selected tab (or first tab otherwise) to active.
			var tabHash = location.hash.replace('#!', '#');
			var $matchTab = $('[href="'+tabHash+'"]', $allTabs);
			if (options.useAnchors && $matchTab.length) {
				$matchTab.click();
			}
			else {
				$allTabs.eq(0).find('a').click();
			}

		});
	};
})(jQuery);
