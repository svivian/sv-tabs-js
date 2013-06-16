/*
	svTabs v1.1 - jQuery tabs plugin
*/
(function ($) {
	$.fn.svTabs = function (options) {
		return this.each(function () {
			options = $.extend({/*defaults*/}, options);

			// Cache jQuery objects.
			var $wrapper = $(this);
			var $allTabs = $wrapper.find('> .svtabs-tab-list > .svtabs-tab');
			var $allPanels = $wrapper.find('> .svtabs-panel-list > .svtabs-panel');

			// Make sure tabs and panels match.
			var nt = $allTabs.length;
			var np = $allPanels.length;
			if ( nt != np ) {
				$.error('Number of tabs ('+nt+') does not match number of panels ('+np+')');
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
					$allPanels.addClass('svtabs-hidden');
					// Set target tab as active.
					$allTabs.eq(i).addClass('svtabs-active');
					$(tabId).removeClass('svtabs-hidden');

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

		});
	};
})(jQuery);
