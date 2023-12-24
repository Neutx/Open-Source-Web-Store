/* Help function
----------------------------------------------------------------------*/
/**
 * check if has 3d animation
 * return true if has
 */
var check3d = function check3d() {

	"use strict";

	if (!window.getComputedStyle) {
		return false;
	}

	var el = document.createElement('p'),
	    has3d,
	    transforms = {
		'webkitTransform': '-webkit-transform',
		'OTransform': '-o-transform',
		'msTransform': '-ms-transform',
		'MozTransform': '-moz-transform',
		'transform': 'transform'
	},
	    objectFit = {
		'objectFit': 'object-fit'
	};

	// Add it to the body to get the computed style
	document.body.insertBefore(el, null);

	for (var t in transforms) {
		if (el.style[t] !== undefined) {
			el.style[t] = 'translate3d(1px,1px,1px)';
			has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
		}
	}

	for (var t in objectFit) {
		if (el.style[t] !== undefined) {
			el.style[t] = 'cover';
			hasObjectFit = window.getComputedStyle(el).getPropertyValue(objectFit[t]);
		}
	}

	document.body.removeChild(el);

	return {
		has3d: has3d !== undefined && has3d.length > 0 && has3d !== "none",
		hasObjectFit: hasObjectFit !== undefined && has3d.length > 0 && hasObjectFit !== "none"
	};
};

export var has3d = check3d().has3d;
export var hasObjectFit = check3d().hasObjectFit;
