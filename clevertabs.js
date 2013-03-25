/*!
 * CleverTabs 0.5
 * Copyright (c) 2010 Scott Vivian
 * Licensed under GPL: http://www.gnu.org/licenses/gpl.html
*/
(function ($) {
	$.fn.clevertabs = function (options) {
		return this.each(function () {
			options = $.extend({/*defaults*/}, options);

			// Cache jQuery objects.
			var $wrapper = $(this);
			var $allTabs = $('.ctabs-tab', $wrapper);
			var $allPanels = $('.ctabs-panel', $wrapper);

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
					$allTabs.removeClass('ctabs-active');
					$allPanels.addClass('ctabs-hidden');
					// Set target tab as active.
					$allTabs.eq(i).addClass('ctabs-active');
					$(tabId).removeClass('ctabs-hidden');

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
			$('.ctabs-panel-list', $wrapper).height(maxHeight);

			// Set first tab to active.
			$allTabs.eq(0).find('a').click();

		});
	};
})(jQuery);
