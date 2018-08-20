// JavaScript Document
var EventUtil = {
	getevent: function (event) {
		"use strict";
		return event ? event : window.event;
	},
	preventDefault: function (event) {
		"use strict";
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	stopPropagation: function (event) {
		"use strict";
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};
