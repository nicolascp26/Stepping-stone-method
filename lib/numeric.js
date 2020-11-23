(function ($) {
	$.fn.numeric = function (config, callback) {
		if (typeof config === 'boolean') {
			config = { decimal: config };
		}
		config = config || {};
		// if config.negative undefined, set to true (default is to allow negative numbers)
		if (typeof config.negative == "undefined") config.negative = true;
		// set decimal point
		var decimal = (config.decimal === false) ? "" : config.decimal || ".";
		// allow negatives
		var negative = (config.negative === true) ? true : false;
		// callback function
		var callback = typeof callback == "function" ? callback : function () { };
		// set data and methods
		return this.data("numeric.decimal", decimal).data("numeric.negative", negative).data("numeric.callback", callback).keyup($.fn.numeric.keyup);
	}

	$.fn.numeric.keyup = function (e) {
		var val = this.value;
		if (val.length > 0) {
			// get carat (cursor) position
			var carat = $.fn.getSelectionStart(this);
			// get decimal character and determine if negatives are allowed
			var decimal = $.data(this, "numeric.decimal");
			var negative = $.data(this, "numeric.negative");

			// prepend a 0 if necessary
			if (decimal != "") {
				// find decimal point
				var dot = val.indexOf(decimal);
				// if dot at start, add 0 before
				if (dot == 0) {
					this.value = "0" + val;
				}
				// if dot at position 1, check if there is a - symbol before it
				if (dot == 1 && val.charAt(0) == "-") {
					this.value = "-0" + val.substring(1);
				}
				val = this.value;
			}

			// if pasted in, only allow the following characters
			var validChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '-', decimal];
			// get length of the value (to loop through)
			var length = val.length;
			// loop backwards (to prevent going out of bounds)
			for (var i = length - 1; i >= 0; i--) {
				var ch = val.charAt(i);
				// remove '-' if it is in the wrong place
				if (i != 0 && ch == "-") {
					val = val.substring(0, i) + val.substring(i + 1);
				}
				// remove character if it is at the start, a '-' and negatives aren't allowed
				else if (i == 0 && !negative && ch == "-") {
					val = val.substring(1);
				}
				var validChar = false;
				// loop through validChars
				for (var j = 0; j < validChars.length; j++) {
					// if it is valid, break out the loop
					if (ch == validChars[j]) {
						validChar = true;
						break;
					}
				}
				// if not a valid character, or a space, remove
				if (!validChar || ch == " ") {
					val = val.substring(0, i) + val.substring(i + 1);
				}
			}
			// remove extra decimal characters
			var firstDecimal = val.indexOf(decimal);
			if (firstDecimal > 0) {
				for (var i = length - 1; i > firstDecimal; i--) {
					var ch = val.charAt(i);
					// remove decimal character
					if (ch == decimal) {
						val = val.substring(0, i) + val.substring(i + 1);
					}
				}
			}
			// set the value and prevent the cursor moving to the end
			this.value = val;
			$.fn.setSelection(this, carat);
		}
	}

	$.fn.getSelectionStart = function (o) {
		if (o.createTextRange) {
			var r = document.selection.createRange().duplicate();
			r.moveEnd('character', o.value.length);
			if (r.text == '') return o.value.length;
			return o.value.lastIndexOf(r.text);
		} else return o.selectionStart;
	}

	// set the selection, o is the object (input), p is the position ([start, end] or just start)
	$.fn.setSelection = function (o, p) {
		// if p is number, start and end are the same
		if (typeof p == "number") p = [p, p];
		// only set if p is an array of length 2
		if (p && p.constructor == Array && p.length == 2) {
			if (o.createTextRange) {
				var r = o.createTextRange();
				r.collapse(true);
				r.moveStart('character', p[0]);
				r.moveEnd('character', p[1]);
				r.select();
			}
			else if (o.setSelectionRange) {
				o.focus();
				o.setSelectionRange(p[0], p[1]);
			}
		}
	}

})(jQuery);