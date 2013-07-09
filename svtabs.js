/* svTabs v1.2 - jQuery tabs plugin */
(function ($) {
	$.fn.svTabs = function (options) {
		return this.each(function () {
			options = $.extend({hideSingle: false}, options);

			// Cache jQuery objects.
			var $wrapper = $(this);
			var $allTabs = $wrapper.find('> .svtabs-tab-list > .svtabs-tab');
			var $allPanels = $wrapper.find('> .svtabs-panel-list > .svtabs-panel');

			// Make sure tabs and panels match.
			var numTabs = $allTabs.length;
			var numPanels = $allPanels.length;
			if ( numTabs != numPanels ) {
				$.error('Number of tabs ('+numTabs+') does not match number of panels ('+numPanels+')');
				return;
			}

			// Add click event to each tab. We use a loop here so that we have the correct
			// index (in the case of non-tab siblings).
			$allTabs.each(function (i) {
				var $link = $('a', $(this));
				var tabId = $link.attr('href');
				// Manually add absolute positioning so that non-JS users don't get overlapping panels.
				$allPanels.eq(i).css({position: 'absolute'});

				$link.on('click', function () {
					// Reset tabs.
					$allTabs.removeClass('svtabs-active');
					$allPanels.addClass('svtabs-panel-hidden');
					// Set target tab as active.
					$allTabs.eq(i).addClass('svtabs-active');
					$(tabId).removeClass('svtabs-panel-hidden');

					return false;
				});
			});

			// Calculate tallest tab and sets panel wrapper to that height.
			var maxHeight = 0;
			$allPanels.each(function (i) {
				var ht = $(this).outerHeight();
				if ( ht > maxHeight )
					maxHeight = ht;
			});
			$('.svtabs-panel-list', $wrapper).height(maxHeight);

			// Set first tab to active.
			$allTabs.eq(0).find('a').click();

			if ( numTabs == 1 && options.hideSingle ) {
				$wrapper.addClass('svtabs-onetab');
			}

		});
	};
})(jQuery);
