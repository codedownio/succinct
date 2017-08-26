/*
 * Copyright (c) 2014 Mike King (@micjamking)
 *
 * jQuery Succinct plugin
 * Version 1.1.0 (October 2014)
 *
 * Licensed under the MIT License
 */

 /*global jQuery*/
	'use strict';

var $ = require('jquery');

$.fn.succinct = function(options) {

	var settings = $.extend({
		size: 240,
		omission: '...',
		ignore: true
	}, options);

	return this.each(function() {

		var textDefault,
			textTruncated,
			elements = $(this),
			regex    = /[!-\/:-@\[-`{-~]$/,
			init     = function() {
				elements.each(function() {
					textDefault = this.originalHTML || $(this).html();

                    if (!this.originalHTML) this.originalHTML = textDefault;

					if (textDefault.length > settings.size) {
						textTruncated = $.trim(textDefault)
							.substring(0, settings.size)
							.split(' ')
							.slice(0, -1)
							.join(' ');

						if (settings.ignore) {
							textTruncated = textTruncated.replace(regex, '');
						}

						$(this).html(textTruncated + settings.omission);
					} else {
                        $(this).html(textDefault);
                    }
				});
			};
		init();
	});
};
