/*!
 * jQuery JavaScript Library v1.10.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:48Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<10
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.10.2",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( jQuery.support.ownLast ) {
			for ( key in obj ) {
				return core_hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.10.2
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {

	var all, a, input, select, fragment, opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Finish early in limited (non-browser) environments
	all = div.getElementsByTagName("*") || [];
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !a || !a.style || !all.length ) {
		return support;
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName("tbody").length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName("link").length;

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone = document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Will be defined later
	support.inlineBlockNeedsLayout = false;
	support.shrinkWrapBlocks = false;
	support.pixelPosition = false;
	support.deleteExpando = true;
	support.noCloneEvent = true;
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: IE<9
	// Iteration over object's inherited properties before its own.
	for ( i in jQuery( support ) ) {
		break;
	}
	support.ownLast = i !== "0";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior.
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})({});

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"applet": true,
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			data = null,
			i = 0,
			elem = this[0];

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// Use proper attribute retrieval(#6932, #12072)
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var fn = jQuery.expr.attrHandle[ name ],
				ret = isXML ?
					undefined :
					/* jshint eqeqeq: false */
					(jQuery.expr.attrHandle[ name ] = undefined) !=
						getter( elem, name, isXML ) ?

						name.toLowerCase() :
						null;
			jQuery.expr.attrHandle[ name ] = fn;
			return ret;
		} :
		function( elem, name, isXML ) {
			return isXML ?
				undefined :
				elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};
	jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords =
		// Some attributes are constructed with empty-string values when not defined
		function( elem, name, isXML ) {
			var ret;
			return isXML ?
				undefined :
				(ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
		};
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ret.specified ?
				ret.value :
				undefined;
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = ret.push( cur );
					break;
				}
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});
jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Otherwise expose jQuery to the global object as usual
	window.jQuery = window.$ = jQuery;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

})( window );

/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

    div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';

    ref.parentNode.insertBefore(div,ref);

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.kickstarter.com']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
})( jQuery );

/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

/*! jQuery Validation Plugin - v1.12.0 - 4/1/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 JÃƒÂ¶rn Zaefferer; Licensed MIT */
!function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(a)).hide())},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",b).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=d.attr("type");return"radio"===e||"checkbox"===e?a("input[name='"+d.attr("name")+"']:checked").val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c[0].toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d=this.errorsFor(b);d.length?(d.removeClass(this.settings.validClass).addClass(this.settings.errorClass),d.html(c)):(d=a("<"+this.settings.errorElement+">").attr("for",this.idOrName(b)).addClass(this.settings.errorClass).html(c||""),this.settings.wrapper&&(d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b))),!c&&this.settings.success&&(d.text(""),"string"==typeof this.settings.success?d.addClass(this.settings.success):this.settings.success(d,b)),this.toShow=this.toShow.add(d)},errorsFor:function(b){var c=this.idOrName(b);return this.errors().filter(function(){return a(this).attr("for")===c})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){return this.checkable(a)&&(a=this.findByName(a.name).not(this.settings.ignore)[0]),a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c[0].toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(b.min&&b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),b.minlength&&b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."}}(jQuery),function(a){var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})}(jQuery),function(a){a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})}(jQuery);
/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function($){

  var plugin = {};

  var defaults = {

    // GENERAL
    mode: 'horizontal',
    slideSelector: '',
    infiniteLoop: true,
    hideControlOnEnd: false,
    speed: 500,
    easing: null,
    slideMargin: 0,
    startSlide: 0,
    randomStart: false,
    captions: false,
    ticker: false,
    tickerHover: false,
    adaptiveHeight: false,
    adaptiveHeightSpeed: 500,
    video: false,
    useCSS: true,
    preloadImages: 'visible',
    responsive: true,
    slideZIndex: 50,
    wrapperClass: 'bx-wrapper',

    // TOUCH
    touchEnabled: true,
    swipeThreshold: 50,
    oneToOneTouch: true,
    preventDefaultSwipeX: true,
    preventDefaultSwipeY: false,

    // PAGER
    pager: true,
    pagerType: 'full',
    pagerShortSeparator: ' / ',
    pagerSelector: null,
    buildPager: null,
    pagerCustom: null,

    // CONTROLS
    controls: true,
    nextText: 'Next',
    prevText: 'Prev',
    nextSelector: null,
    prevSelector: null,
    autoControls: false,
    startText: 'Start',
    stopText: 'Stop',
    autoControlsCombine: false,
    autoControlsSelector: null,

    // AUTO
    auto: false,
    pause: 4000,
    autoStart: true,
    autoDirection: 'next',
    autoHover: false,
    autoDelay: 0,
    autoSlideForOnePage: false,

    // CAROUSEL
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 0,
    slideWidth: 0,

    // CALLBACKS
    onSliderLoad: function() {},
    onSlideBefore: function() {},
    onSlideAfter: function() {},
    onSlideNext: function() {},
    onSlidePrev: function() {},
    onSliderResize: function() {}
  }

  $.fn.bxSlider = function(options){

    if(this.length == 0) return this;

    // support mutltiple elements
    if(this.length > 1){
      this.each(function(){$(this).bxSlider(options)});
      return this;
    }

    // create a namespace to be used throughout the plugin
    var slider = {};
    // set a reference to our slider element
    var el = this;
    plugin.el = this;

    /**
     * Makes slideshow responsive
     */
    // first get the original window dimens (thanks alot IE)
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();



    /**
     * ===================================================================================
     * = PRIVATE FUNCTIONS
     * ===================================================================================
     */

    /**
     * Initializes namespace settings to be used throughout plugin
     */
    var init = function(){
      // merge user-supplied options with the defaults
      slider.settings = $.extend({}, defaults, options);
      // parse slideWidth setting
      slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
      // store the original children
      slider.children = el.children(slider.settings.slideSelector);
      // check if actual number of slides is less than minSlides / maxSlides
      if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
      if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
      // if random start, set the startSlide setting to random number
      if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
      // store active slide information
      slider.active = { index: slider.settings.startSlide }
      // store if the slider is in carousel mode (displaying / moving multiple slides)
      slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
      // if carousel, force preloadImages = 'all'
      if(slider.carousel) slider.settings.preloadImages = 'all';
      // calculate the min / max width thresholds based on min / max number of slides
      // used to setup and update carousel slides dimensions
      slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
      slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
      // store the current state of the slider (if currently animating, working is true)
      slider.working = false;
      // initialize the controls object
      slider.controls = {};
      // initialize an auto interval
      slider.interval = null;
      // determine which property to use for transitions
      slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
      // determine if hardware acceleration can be used
      slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){
        // create our test div element
        var div = document.createElement('div');
        // css transition properties
        var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
        // test for each property
        for(var i in props){
          if(div.style[props[i]] !== undefined){
            slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
            slider.animProp = '-' + slider.cssPrefix + '-transform';
            return true;
          }
        }
        return false;
      }());
      // if vertical mode always make maxSlides and minSlides equal
      if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
      // save original style data
      el.data("origStyle", el.attr("style"));
      el.children(slider.settings.slideSelector).each(function() {
        $(this).data("origStyle", $(this).attr("style"));
      });
      // perform all DOM / CSS modifications
      setup();
    }

    /**
     * Performs all DOM and CSS modifications
     */
    var setup = function(){
      // wrap el in a wrapper
      el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
      // store a namspace reference to .bx-viewport
      slider.viewport = el.parent();
      // add a loading div to display while images are loading
      slider.loader = $('<div class="bx-loading" />');
      slider.viewport.prepend(slider.loader);
      // set el to a massive width, to hold any needed slides
      // also strip any margin and padding from el
      el.css({
        width: slider.settings.mode == 'horizontal' ? (slider.children.length * 100 + 215) + '%' : 'auto',
        position: 'relative'
      });
      // if using CSS, add the easing property
      if(slider.usingCSS && slider.settings.easing){
        el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
      // if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
      }else if(!slider.settings.easing){
        slider.settings.easing = 'swing';
      }
      var slidesShowing = getNumberSlidesShowing();
      // make modifications to the viewport (.bx-viewport)
      slider.viewport.css({
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      });
      slider.viewport.parent().css({
        maxWidth: getViewportMaxWidth()
      });
      // make modification to the wrapper (.bx-wrapper)
      if(!slider.settings.pager) {
        slider.viewport.parent().css({
        margin: '0 auto 0px'
        });
      }
      // apply css to all slider children
      slider.children.css({
        'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
        listStyle: 'none',
        position: 'relative'
      });
      // apply the calculated width after the float is applied to prevent scrollbar interference
      slider.children.css('width', getSlideWidth());
      // if slideMargin is supplied, add the css
      if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
      if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
      // if "fade" mode, add positioning and z-index CSS
      if(slider.settings.mode == 'fade'){
        slider.children.css({
          position: 'absolute',
          zIndex: 0,
          display: 'none'
        });
        // prepare the z-index on the showing element
        slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
      }
      // create an element to contain all slider controls (pager, start / stop, etc)
      slider.controls.el = $('<div class="bx-controls" />');
      // if captions are requested, add them
      if(slider.settings.captions) appendCaptions();
      // check if startSlide is last slide
      slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
      // if video is true, set up the fitVids plugin
      if(slider.settings.video) el.fitVids();
      // set the default preload selector (visible)
      var preloadSelector = slider.children.eq(slider.settings.startSlide);
      if (slider.settings.preloadImages == "all") preloadSelector = slider.children;
      // only check for control addition if not in "ticker" mode
      if(!slider.settings.ticker){
        // if pager is requested, add it
        if(slider.settings.pager) appendPager();
        // if controls are requested, add them
        if(slider.settings.controls) appendControls();
        // if auto is true, and auto controls are requested, add them
        if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
        // if any control option is requested, add the controls wrapper
        if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
      // if ticker mode, do not allow a pager
      }else{
        slider.settings.pager = false;
      }
      // preload all images, then perform final DOM / CSS modifications that depend on images being loaded
      loadElements(preloadSelector, start);
    }

    var loadElements = function(selector, callback){
      var total = selector.find('img, iframe').length;
      if (total == 0){
        callback();
        return;
      }
      var count = 0;
      selector.find('img, iframe').each(function(){
        $(this).one('load', function() {
          if(++count == total) callback();
        }).each(function() {
          if(this.complete) $(this).load();
        });
      });
    }

    /**
     * Start the slider
     */
    var start = function(){
      // if infinite loop, prepare additional slides
      if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){
        var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
        var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
        var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
        el.append(sliceAppend).prepend(slicePrepend);
      }
      // remove the loading DOM element
      slider.loader.remove();
      // set the left / top position of "el"
      setSlidePosition();
      // if "vertical" mode, always use adaptiveHeight to prevent odd behavior
      if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
      // set the viewport height
      slider.viewport.height(getViewportHeight());
      // make sure everything is positioned just right (same as a window resize)
      el.redrawSlider();
      // onSliderLoad callback
      slider.settings.onSliderLoad(slider.active.index);
      // slider has been fully initialized
      slider.initialized = true;
      // bind the resize call to the window
      if (slider.settings.responsive) $(window).bind('resize', resizeWindow);
      // if auto is true and has more than 1 page, start the show
      if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) initAuto();
      // if ticker is true, start the ticker
      if (slider.settings.ticker) initTicker();
      // if pager is requested, make the appropriate pager link active
      if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
      // check for any updates to the controls (like hideControlOnEnd updates)
      if (slider.settings.controls) updateDirectionControls();
      // if touchEnabled is true, setup the touch events
      if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
    }

    /**
     * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
     */
    var getViewportHeight = function(){
      var height = 0;
      // first determine which children (slides) should be used in our height calculation
      var children = $();
      // if mode is not "vertical" and adaptiveHeight is false, include all children
      if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){
        children = slider.children;
      }else{
        // if not carousel, return the single active child
        if(!slider.carousel){
          children = slider.children.eq(slider.active.index);
        // if carousel, return a slice of children
        }else{
          // get the individual slide index
          var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
          // add the current slide to the children
          children = slider.children.eq(currentIndex);
          // cycle through the remaining "showing" slides
          for (i = 1; i <= slider.settings.maxSlides - 1; i++){
            // if looped back to the start
            if(currentIndex + i >= slider.children.length){
              children = children.add(slider.children.eq(i - 1));
            }else{
              children = children.add(slider.children.eq(currentIndex + i));
            }
          }
        }
      }
      // if "vertical" mode, calculate the sum of the heights of the children
      if(slider.settings.mode == 'vertical'){
        children.each(function(index) {
          height += $(this).outerHeight();
        });
        // add user-supplied margins
        if(slider.settings.slideMargin > 0){
          height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
        }
      // if not "vertical" mode, calculate the max height of the children
      }else{
        height = Math.max.apply(Math, children.map(function(){
          return $(this).outerHeight(false);
        }).get());
      }

      if(slider.viewport.css('box-sizing') == 'border-box'){
        height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
              parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
      }else if(slider.viewport.css('box-sizing') == 'padding-box'){
        height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
      }

      return height;
    }

    /**
     * Returns the calculated width to be used for the outer wrapper / viewport
     */
    var getViewportMaxWidth = function(){
      var width = '100%';
      if(slider.settings.slideWidth > 0){
        if(slider.settings.mode == 'horizontal'){
          width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
        }else{
          width = slider.settings.slideWidth;
        }
      }
      return width;
    }

    /**
     * Returns the calculated width to be applied to each slide
     */
    var getSlideWidth = function(){
      // start with any user-supplied slide width
      var newElWidth = slider.settings.slideWidth;
      // get the current viewport width
      var wrapWidth = slider.viewport.width();
      // if slide width was not supplied, or is larger than the viewport use the viewport width
      if(slider.settings.slideWidth == 0 ||
        (slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
        slider.settings.mode == 'vertical'){
        newElWidth = wrapWidth;
      // if carousel, use the thresholds to determine the width
      }else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){
        if(wrapWidth > slider.maxThreshold){
          // newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
        }else if(wrapWidth < slider.minThreshold){
          newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
        }
      }
      return newElWidth;
    }

    /**
     * Returns the number of slides currently visible in the viewport (includes partially visible slides)
     */
    var getNumberSlidesShowing = function(){
      var slidesShowing = 1;
      if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){
        // if viewport is smaller than minThreshold, return minSlides
        if(slider.viewport.width() < slider.minThreshold){
          slidesShowing = slider.settings.minSlides;
        // if viewport is larger than minThreshold, return maxSlides
        }else if(slider.viewport.width() > slider.maxThreshold){
          slidesShowing = slider.settings.maxSlides;
        // if viewport is between min / max thresholds, divide viewport width by first child width
        }else{
          var childWidth = slider.children.first().width() + slider.settings.slideMargin;
          slidesShowing = Math.floor((slider.viewport.width() +
            slider.settings.slideMargin) / childWidth);
        }
      // if "vertical" mode, slides showing will always be minSlides
      }else if(slider.settings.mode == 'vertical'){
        slidesShowing = slider.settings.minSlides;
      }
      return slidesShowing;
    }

    /**
     * Returns the number of pages (one full viewport of slides is one "page")
     */
    var getPagerQty = function(){
      var pagerQty = 0;
      // if moveSlides is specified by the user
      if(slider.settings.moveSlides > 0){
        if(slider.settings.infiniteLoop){
          pagerQty = Math.ceil(slider.children.length / getMoveBy());
        }else{
          // use a while loop to determine pages
          var breakPoint = 0;
          var counter = 0
          // when breakpoint goes above children length, counter is the number of pages
          while (breakPoint < slider.children.length){
            ++pagerQty;
            breakPoint = counter + getNumberSlidesShowing();
            counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
          }
        }
      // if moveSlides is 0 (auto) divide children length by sides showing, then round up
      }else{
        pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
      }
      return pagerQty;
    }

    /**
     * Returns the number of indivual slides by which to shift the slider
     */
    var getMoveBy = function(){
      // if moveSlides was set by the user and moveSlides is less than number of slides showing
      if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
        return slider.settings.moveSlides;
      }
      // if moveSlides is 0 (auto)
      return getNumberSlidesShowing();
    }

    /**
     * Sets the slider's (el) left or top position
     */
    var setSlidePosition = function(){
      // if last slide, not infinite loop, and number of children is larger than specified maxSlides
      if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
        if (slider.settings.mode == 'horizontal'){
          // get the last child's position
          var lastChild = slider.children.last();
          var position = lastChild.position();
          // set the left position
          setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
        }else if(slider.settings.mode == 'vertical'){
          // get the last showing index's position
          var lastShowingIndex = slider.children.length - slider.settings.minSlides;
          var position = slider.children.eq(lastShowingIndex).position();
          // set the top position
          setPositionProperty(-position.top, 'reset', 0);
        }
      // if not last slide
      }else{
        // get the position of the first showing slide
        var position = slider.children.eq(slider.active.index * getMoveBy()).position();
        // check for last slide
        if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
        // set the repective position
        if (position != undefined){
          if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
          else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
        }
      }
    }

    /**
     * Sets the el's animating property position (which in turn will sometimes animate el).
     * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
     *
     * @param value (int)
     *  - the animating property's value
     *
     * @param type (string) 'slider', 'reset', 'ticker'
     *  - the type of instance for which the function is being
     *
     * @param duration (int)
     *  - the amount of time (in ms) the transition should occupy
     *
     * @param params (array) optional
     *  - an optional parameter containing any variables that need to be passed in
     */
    var setPositionProperty = function(value, type, duration, params){
      // use CSS transform
      if(slider.usingCSS){
        // determine the translate3d value
        var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
        // add the CSS transition-duration
        el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
        if(type == 'slide'){
          // set the property value
          el.css(slider.animProp, propValue);
          // bind a callback method - executes when CSS transition completes
          el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
            // unbind the callback
            el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
            updateAfterSlideTransition();
          });
        }else if(type == 'reset'){
          el.css(slider.animProp, propValue);
        }else if(type == 'ticker'){
          // make the transition use 'linear'
          el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
          el.css(slider.animProp, propValue);
          // bind a callback method - executes when CSS transition completes
          el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
            // unbind the callback
            el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
            // reset the position
            setPositionProperty(params['resetValue'], 'reset', 0);
            // start the loop again
            tickerLoop();
          });
        }
      // use JS animate
      }else{
        var animateObj = {};
        animateObj[slider.animProp] = value;
        if(type == 'slide'){
          el.animate(animateObj, duration, slider.settings.easing, function(){
            updateAfterSlideTransition();
          });
        }else if(type == 'reset'){
          el.css(slider.animProp, value)
        }else if(type == 'ticker'){
          el.animate(animateObj, speed, 'linear', function(){
            setPositionProperty(params['resetValue'], 'reset', 0);
            // run the recursive loop after animation
            tickerLoop();
          });
        }
      }
    }

    /**
     * Populates the pager with proper amount of pages
     */
    var populatePager = function(){
      var pagerHtml = '';
      var pagerQty = getPagerQty();
      // loop through each pager item
      for(var i=0; i < pagerQty; i++){
        var linkContent = '';
        // if a buildPager function is supplied, use it to get pager link value, else use index + 1
        if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){
          linkContent = slider.settings.buildPager(i);
          slider.pagerEl.addClass('bx-custom-pager');
        }else{
          linkContent = i + 1;
          slider.pagerEl.addClass('bx-default-pager');
        }
        // var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
        // add the markup to the string
        pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
      };
      // populate the pager element with pager links
      slider.pagerEl.html(pagerHtml);
    }

    /**
     * Appends the pager to the controls element
     */
    var appendPager = function(){
      if(!slider.settings.pagerCustom){
        // create the pager DOM element
        slider.pagerEl = $('<div class="bx-pager" />');
        // if a pager selector was supplied, populate it with the pager
        if(slider.settings.pagerSelector){
          $(slider.settings.pagerSelector).html(slider.pagerEl);
        // if no pager selector was supplied, add it after the wrapper
        }else{
          slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
        }
        // populate the pager
        populatePager();
      }else{
        slider.pagerEl = $(slider.settings.pagerCustom);
      }
      // assign the pager click binding
      slider.pagerEl.on('click', 'a', clickPagerBind);
    }

    /**
     * Appends prev / next controls to the controls element
     */
    var appendControls = function(){
      slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
      slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
      // bind click actions to the controls
      slider.controls.next.bind('click', clickNextBind);
      slider.controls.prev.bind('click', clickPrevBind);
      // if nextSlector was supplied, populate it
      if(slider.settings.nextSelector){
        $(slider.settings.nextSelector).append(slider.controls.next);
      }
      // if prevSlector was supplied, populate it
      if(slider.settings.prevSelector){
        $(slider.settings.prevSelector).append(slider.controls.prev);
      }
      // if no custom selectors were supplied
      if(!slider.settings.nextSelector && !slider.settings.prevSelector){
        // add the controls to the DOM
        slider.controls.directionEl = $('<div class="bx-controls-direction" />');
        // add the control elements to the directionEl
        slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
        // slider.viewport.append(slider.controls.directionEl);
        slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
      }
    }

    /**
     * Appends start / stop auto controls to the controls element
     */
    var appendControlsAuto = function(){
      slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
      slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
      // add the controls to the DOM
      slider.controls.autoEl = $('<div class="bx-controls-auto" />');
      // bind click actions to the controls
      slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
      slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
      // if autoControlsCombine, insert only the "start" control
      if(slider.settings.autoControlsCombine){
        slider.controls.autoEl.append(slider.controls.start);
      // if autoControlsCombine is false, insert both controls
      }else{
        slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
      }
      // if auto controls selector was supplied, populate it with the controls
      if(slider.settings.autoControlsSelector){
        $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
      // if auto controls selector was not supplied, add it after the wrapper
      }else{
        slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
      }
      // update the auto controls
      updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
    }

    /**
     * Appends image captions to the DOM
     */
    var appendCaptions = function(){
      // cycle through each child
      slider.children.each(function(index){
        // get the image title attribute
        var title = $(this).find('img:first').attr('title');
        // append the caption
        if (title != undefined && ('' + title).length) {
                    $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
                }
      });
    }

    /**
     * Click next binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickNextBind = function(e){
      // if auto show is running, stop it
      if (slider.settings.auto) el.stopAuto();
      el.goToNextSlide();
      e.preventDefault();
    }

    /**
     * Click prev binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickPrevBind = function(e){
      // if auto show is running, stop it
      if (slider.settings.auto) el.stopAuto();
      el.goToPrevSlide();
      e.preventDefault();
    }

    /**
     * Click start binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickStartBind = function(e){
      el.startAuto();
      e.preventDefault();
    }

    /**
     * Click stop binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickStopBind = function(e){
      el.stopAuto();
      e.preventDefault();
    }

    /**
     * Click pager binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickPagerBind = function(e){
      // if auto show is running, stop it
      if (slider.settings.auto) el.stopAuto();
      var pagerLink = $(e.currentTarget);
      if(pagerLink.attr('data-slide-index') !== undefined){
        var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
        // if clicked pager link is not active, continue with the goToSlide call
        if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
        e.preventDefault();
      }
    }

    /**
     * Updates the pager links with an active class
     *
     * @param slideIndex (int)
     *  - index of slide to make active
     */
    var updatePagerActive = function(slideIndex){
      // if "short" pager type
      var len = slider.children.length; // nb of children
      if(slider.settings.pagerType == 'short'){
        if(slider.settings.maxSlides > 1) {
          len = Math.ceil(slider.children.length/slider.settings.maxSlides);
        }
        slider.pagerEl.html( (slideIndex + 1) + slider.settings.pagerShortSeparator + len);
        return;
      }
      // remove all pager active classes
      slider.pagerEl.find('a').removeClass('active');
      // apply the active class for all pagers
      slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
    }

    /**
     * Performs needed actions after a slide transition
     */
    var updateAfterSlideTransition = function(){
      // if infinte loop is true
      if(slider.settings.infiniteLoop){
        var position = '';
        // first slide
        if(slider.active.index == 0){
          // set the new position
          position = slider.children.eq(0).position();
        // carousel, last slide
        }else if(slider.active.index == getPagerQty() - 1 && slider.carousel){
          position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
        // last slide
        }else if(slider.active.index == slider.children.length - 1){
          position = slider.children.eq(slider.children.length - 1).position();
        }
        if(position){
          if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
          else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
        }
      }
      // declare that the transition is complete
      slider.working = false;
      // onSlideAfter callback
      slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
    }

    /**
     * Updates the auto controls state (either active, or combined switch)
     *
     * @param state (string) "start", "stop"
     *  - the new state of the auto show
     */
    var updateAutoControls = function(state){
      // if autoControlsCombine is true, replace the current control with the new state
      if(slider.settings.autoControlsCombine){
        slider.controls.autoEl.html(slider.controls[state]);
      // if autoControlsCombine is false, apply the "active" class to the appropriate control
      }else{
        slider.controls.autoEl.find('a').removeClass('active');
        slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
      }
    }

    /**
     * Updates the direction controls (checks if either should be hidden)
     */
    var updateDirectionControls = function(){
      if(getPagerQty() == 1){
        slider.controls.prev.addClass('disabled');
        slider.controls.next.addClass('disabled');
      }else if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
        // if first slide
        if (slider.active.index == 0){
          slider.controls.prev.addClass('disabled');
          slider.controls.next.removeClass('disabled');
        // if last slide
        }else if(slider.active.index == getPagerQty() - 1){
          slider.controls.next.addClass('disabled');
          slider.controls.prev.removeClass('disabled');
        // if any slide in the middle
        }else{
          slider.controls.prev.removeClass('disabled');
          slider.controls.next.removeClass('disabled');
        }
      }
    }

    /**
     * Initialzes the auto process
     */
    var initAuto = function(){
      // if autoDelay was supplied, launch the auto show using a setTimeout() call
      if(slider.settings.autoDelay > 0){
        var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
      // if autoDelay was not supplied, start the auto show normally
      }else{
        el.startAuto();
      }
      // if autoHover is requested
      if(slider.settings.autoHover){
        // on el hover
        el.hover(function(){
          // if the auto show is currently playing (has an active interval)
          if(slider.interval){
            // stop the auto show and pass true agument which will prevent control update
            el.stopAuto(true);
            // create a new autoPaused value which will be used by the relative "mouseout" event
            slider.autoPaused = true;
          }
        }, function(){
          // if the autoPaused value was created be the prior "mouseover" event
          if(slider.autoPaused){
            // start the auto show and pass true agument which will prevent control update
            el.startAuto(true);
            // reset the autoPaused value
            slider.autoPaused = null;
          }
        });
      }
    }

    /**
     * Initialzes the ticker process
     */
    var initTicker = function(){
      var startPosition = 0;
      // if autoDirection is "next", append a clone of the entire slider
      if(slider.settings.autoDirection == 'next'){
        el.append(slider.children.clone().addClass('bx-clone'));
      // if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
      }else{
        el.prepend(slider.children.clone().addClass('bx-clone'));
        var position = slider.children.first().position();
        startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
      }
      setPositionProperty(startPosition, 'reset', 0);
      // do not allow controls in ticker mode
      slider.settings.pager = false;
      slider.settings.controls = false;
      slider.settings.autoControls = false;
      // if autoHover is requested
      if(slider.settings.tickerHover && !slider.usingCSS){
        // on el hover
        slider.viewport.hover(function(){
          el.stop();
        }, function(){
          // calculate the total width of children (used to calculate the speed ratio)
          var totalDimens = 0;
          slider.children.each(function(index){
            totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
          });
          // calculate the speed ratio (used to determine the new speed to finish the paused animation)
          var ratio = slider.settings.speed / totalDimens;
          // determine which property to use
          var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
          // calculate the new speed
          var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
          tickerLoop(newSpeed);
        });
      }
      // start the ticker loop
      tickerLoop();
    }

    /**
     * Runs a continuous loop, news ticker-style
     */
    var tickerLoop = function(resumeSpeed){
      speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
      var position = {left: 0, top: 0};
      var reset = {left: 0, top: 0};
      // if "next" animate left position to last child, then reset left to 0
      if(slider.settings.autoDirection == 'next'){
        position = el.find('.bx-clone').first().position();
      // if "prev" animate left position to 0, then reset left to first non-clone child
      }else{
        reset = slider.children.first().position();
      }
      var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
      var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
      var params = {resetValue: resetValue};
      setPositionProperty(animateProperty, 'ticker', speed, params);
    }

    /**
     * Initializes touch events
     */
    var initTouch = function(){
      // initialize object to contain all touch values
      slider.touch = {
        start: {x: 0, y: 0},
        end: {x: 0, y: 0}
      }
      slider.viewport.bind('touchstart', onTouchStart);
    }

    /**
     * Event handler for "touchstart"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchStart = function(e){
      if(slider.working){
        e.preventDefault();
      }else{
        // record the original position when touch starts
        slider.touch.originalPos = el.position();
        var orig = e.originalEvent;
        // record the starting touch x, y coordinates
        slider.touch.start.x = orig.changedTouches[0].pageX;
        slider.touch.start.y = orig.changedTouches[0].pageY;
        // bind a "touchmove" event to the viewport
        slider.viewport.bind('touchmove', onTouchMove);
        // bind a "touchend" event to the viewport
        slider.viewport.bind('touchend', onTouchEnd);
      }
    }

    /**
     * Event handler for "touchmove"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchMove = function(e){
      var orig = e.originalEvent;
      // if scrolling on y axis, do not prevent default
      var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
      var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
      // x axis swipe
      if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
        e.preventDefault();
      // y axis swipe
      }else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
        e.preventDefault();
      }
      if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
        var value = 0;
        // if horizontal, drag along x axis
        if(slider.settings.mode == 'horizontal'){
          var change = orig.changedTouches[0].pageX - slider.touch.start.x;
          value = slider.touch.originalPos.left + change;
        // if vertical, drag along y axis
        }else{
          var change = orig.changedTouches[0].pageY - slider.touch.start.y;
          value = slider.touch.originalPos.top + change;
        }
        setPositionProperty(value, 'reset', 0);
      }
    }

    /**
     * Event handler for "touchend"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchEnd = function(e){
      slider.viewport.unbind('touchmove', onTouchMove);
      var orig = e.originalEvent;
      var value = 0;
      // record end x, y positions
      slider.touch.end.x = orig.changedTouches[0].pageX;
      slider.touch.end.y = orig.changedTouches[0].pageY;
      // if fade mode, check if absolute x distance clears the threshold
      if(slider.settings.mode == 'fade'){
        var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
        if(distance >= slider.settings.swipeThreshold){
          slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
          el.stopAuto();
        }
      // not fade mode
      }else{
        var distance = 0;
        // calculate distance and el's animate property
        if(slider.settings.mode == 'horizontal'){
          distance = slider.touch.end.x - slider.touch.start.x;
          value = slider.touch.originalPos.left;
        }else{
          distance = slider.touch.end.y - slider.touch.start.y;
          value = slider.touch.originalPos.top;
        }
        // if not infinite loop and first / last slide, do not attempt a slide transition
        if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
          setPositionProperty(value, 'reset', 200);
        }else{
          // check if distance clears threshold
          if(Math.abs(distance) >= slider.settings.swipeThreshold){
            distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
            el.stopAuto();
          }else{
            // el.animate(property, 200);
            setPositionProperty(value, 'reset', 200);
          }
        }
      }
      slider.viewport.unbind('touchend', onTouchEnd);
    }

    /**
     * Window resize event callback
     */
    var resizeWindow = function(e){
      // don't do anything if slider isn't initialized.
      if(!slider.initialized) return;
      // get the new window dimens (again, thank you IE)
      var windowWidthNew = $(window).width();
      var windowHeightNew = $(window).height();
      // make sure that it is a true window resize
      // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
      // are resized. Can you just die already?*
      if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
        // set the new window dimens
        windowWidth = windowWidthNew;
        windowHeight = windowHeightNew;
        // update all dynamic elements
        el.redrawSlider();
        // Call user resize handler
        slider.settings.onSliderResize.call(el, slider.active.index);
      }
    }

    /**
     * ===================================================================================
     * = PUBLIC FUNCTIONS
     * ===================================================================================
     */

    /**
     * Performs slide transition to the specified slide
     *
     * @param slideIndex (int)
     *  - the destination slide's index (zero-based)
     *
     * @param direction (string)
     *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
     */
    el.goToSlide = function(slideIndex, direction){
      // if plugin is currently in motion, ignore request
      if(slider.working || slider.active.index == slideIndex) return;
      // declare that plugin is in motion
      slider.working = true;
      // store the old index
      slider.oldIndex = slider.active.index;
      // if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
      if(slideIndex < 0){
        slider.active.index = getPagerQty() - 1;
      // if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
      }else if(slideIndex >= getPagerQty()){
        slider.active.index = 0;
      // set active index to requested slide
      }else{
        slider.active.index = slideIndex;
      }
      // onSlideBefore, onSlideNext, onSlidePrev callbacks
      slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
      if(direction == 'next'){
        slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
      }else if(direction == 'prev'){
        slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
      }
      // check if last slide
      slider.active.last = slider.active.index >= getPagerQty() - 1;
      // update the pager with active class
      if(slider.settings.pager) updatePagerActive(slider.active.index);
      // // check for direction control update
      if(slider.settings.controls) updateDirectionControls();
      // if slider is set to mode: "fade"
      if(slider.settings.mode == 'fade'){
        // if adaptiveHeight is true and next height is different from current height, animate to the new height
        if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
          slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
        }
        // fade out the visible child and reset its z-index value
        slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
        // fade in the newly requested slide
        slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex+1).fadeIn(slider.settings.speed, function(){
          $(this).css('zIndex', slider.settings.slideZIndex);
          updateAfterSlideTransition();
        });
      // slider mode is not "fade"
      }else{
        // if adaptiveHeight is true and next height is different from current height, animate to the new height
        if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
          slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
        }
        var moveBy = 0;
        var position = {left: 0, top: 0};
        // if carousel and not infinite loop
        if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
          if(slider.settings.mode == 'horizontal'){
            // get the last child position
            var lastChild = slider.children.eq(slider.children.length - 1);
            position = lastChild.position();
            // calculate the position of the last slide
            moveBy = slider.viewport.width() - lastChild.outerWidth();
          }else{
            // get last showing index position
            var lastShowingIndex = slider.children.length - slider.settings.minSlides;
            position = slider.children.eq(lastShowingIndex).position();
          }
          // horizontal carousel, going previous while on first slide (infiniteLoop mode)
        }else if(slider.carousel && slider.active.last && direction == 'prev'){
          // get the last child position
          var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
          var lastChild = el.children('.bx-clone').eq(eq);
          position = lastChild.position();
        // if infinite loop and "Next" is clicked on the last slide
        }else if(direction == 'next' && slider.active.index == 0){
          // get the last clone position
          position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
          slider.active.last = false;
        // normal non-zero requests
        }else if(slideIndex >= 0){
          var requestEl = slideIndex * getMoveBy();
          position = slider.children.eq(requestEl).position();
        }

        /* If the position doesn't exist
         * (e.g. if you destroy the slider on a next click),
         * it doesn't throw an error.
         */
        if ("undefined" !== typeof(position)) {
          var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
          // plugin values to be animated
          setPositionProperty(value, 'slide', slider.settings.speed);
        }
      }
    }

    /**
     * Transitions to the next slide in the show
     */
    el.goToNextSlide = function(){
      // if infiniteLoop is false and last page is showing, disregard call
      if (!slider.settings.infiniteLoop && slider.active.last) return;
      var pagerIndex = parseInt(slider.active.index) + 1;
      el.goToSlide(pagerIndex, 'next');
    }

    /**
     * Transitions to the prev slide in the show
     */
    el.goToPrevSlide = function(){
      // if infiniteLoop is false and last page is showing, disregard call
      if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
      var pagerIndex = parseInt(slider.active.index) - 1;
      el.goToSlide(pagerIndex, 'prev');
    }

    /**
     * Starts the auto show
     *
     * @param preventControlUpdate (boolean)
     *  - if true, auto controls state will not be updated
     */
    el.startAuto = function(preventControlUpdate){
      // if an interval already exists, disregard call
      if(slider.interval) return;
      // create an interval
      slider.interval = setInterval(function(){
        slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
      }, slider.settings.pause);
      // if auto controls are displayed and preventControlUpdate is not true
      if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
    }

    /**
     * Stops the auto show
     *
     * @param preventControlUpdate (boolean)
     *  - if true, auto controls state will not be updated
     */
    el.stopAuto = function(preventControlUpdate){
      // if no interval exists, disregard call
      if(!slider.interval) return;
      // clear the interval
      clearInterval(slider.interval);
      slider.interval = null;
      // if auto controls are displayed and preventControlUpdate is not true
      if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
    }

    /**
     * Returns current slide index (zero-based)
     */
    el.getCurrentSlide = function(){
      return slider.active.index;
    }

    /**
     * Returns current slide element
     */
    el.getCurrentSlideElement = function(){
      return slider.children.eq(slider.active.index);
    }

    /**
     * Returns number of slides in show
     */
    el.getSlideCount = function(){
      return slider.children.length;
    }

    /**
     * Update all dynamic slider elements
     */
    el.redrawSlider = function(){
      // resize all children in ratio to new screen size
      slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
      // adjust the height
      slider.viewport.css('height', getViewportHeight());
      // update the slide position
      if(!slider.settings.ticker) setSlidePosition();
      // if active.last was true before the screen resize, we want
      // to keep it last no matter what screen size we end on
      if (slider.active.last) slider.active.index = getPagerQty() - 1;
      // if the active index (page) no longer exists due to the resize, simply set the index as last
      if (slider.active.index >= getPagerQty()) slider.active.last = true;
      // if a pager is being displayed and a custom pager is not being used, update it
      if(slider.settings.pager && !slider.settings.pagerCustom){
        populatePager();
        updatePagerActive(slider.active.index);
      }
    }

    /**
     * Destroy the current instance of the slider (revert everything back to original state)
     */
    el.destroySlider = function(){
      // don't do anything if slider has already been destroyed
      if(!slider.initialized) return;
      slider.initialized = false;
      $('.bx-clone', this).remove();
      slider.children.each(function() {
        $(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
      });
      $(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
      $(this).unwrap().unwrap();
      if(slider.controls.el) slider.controls.el.remove();
      if(slider.controls.next) slider.controls.next.remove();
      if(slider.controls.prev) slider.controls.prev.remove();
      if(slider.pagerEl && slider.settings.controls) slider.pagerEl.remove();
      $('.bx-caption', this).remove();
      if(slider.controls.autoEl) slider.controls.autoEl.remove();
      clearInterval(slider.interval);
      if(slider.settings.responsive) $(window).unbind('resize', resizeWindow);
    }

    /**
     * Reload the slider (revert all DOM changes, and re-initialize)
     */
    el.reloadSlider = function(settings){
      if (settings != undefined) options = settings;
      el.destroySlider();
      init();
    }

    init();

    // returns the current jQuery object
    return this;
  }

})(jQuery);

(function(){var aa=encodeURIComponent,ba=Infinity,ca=setTimeout,da=isNaN,m=Math,ea=decodeURIComponent;function Ie(a,b){return a.onload=b}function Je(a,b){return a.onerror=b}function ha(a,b){return a.name=b}
var p="replace",la="floor",ma="charAt",oa="match",pa="port",qa="createElement",g="getTime",u="host",v="toString",y="split",ta="stopPropagation",z="location",va="search",A="protocol",xa="href",ya="apply",n="push",ia="test",ja="slice",ka="load",na="value",q="indexOf",ra="path",r="name",w="length",x="prototype",sa="clientWidth",ua="scope",wa="clientHeight",B="substring",za="navigator",C="join",D="toLowerCase",E;function Aa(a,b){switch(b){case 0:return""+a;case 1:return 1*a;case 2:return!!a;case 3:return 1E3*a}return a}function Ba(a){return"function"==typeof a}function Ca(a){return void 0!=a&&-1<(a.constructor+"")[q]("String")}function F(a,b){return void 0==a||"-"==a&&!b||""==a}function Da(a){if(!a||""==a)return"";for(;a&&-1<" \n\r\t"[q](a[ma](0));)a=a[B](1);for(;a&&-1<" \n\r\t"[q](a[ma](a[w]-1));)a=a[B](0,a[w]-1);return a}function Ea(){return m.round(2147483647*m.random())}function Fa(){}
function G(a,b){if(aa instanceof Function)return b?encodeURI(a):aa(a);H(68);return escape(a)}function I(a){a=a[y]("+")[C](" ");if(ea instanceof Function)try{return ea(a)}catch(b){H(17)}else H(68);return unescape(a)}var Ga=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)};
function Ia(a,b){if(a){var c=J[qa]("script");c.type="text/javascript";c.async=!0;c.src=a;c.id=b;var d=J.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d);return c}}function K(a){return a&&0<a[w]?a[0]:""}function L(a){var b=a?a[w]:0;return 0<b?a[b-1]:""}var nf=function(){this.prefix="ga.";this.values={}};nf[x].set=function(a,b){this.values[this.prefix+a]=b};nf[x].get=function(a){return this.values[this.prefix+a]};nf[x].contains=function(a){return void 0!==this.get(a)};function Ka(a){0==a[q]("www.")&&(a=a[B](4));return a[D]()}function La(a,b){var c,d={url:a,protocol:"http",host:"",path:"",d:new nf,anchor:""};if(!a)return d;c=a[q]("://");0<=c&&(d.protocol=a[B](0,c),a=a[B](c+3));c=a[va]("/|\\?|#");if(0<=c)d.host=a[B](0,c)[D](),a=a[B](c);else return d.host=a[D](),d;c=a[q]("#");0<=c&&(d.anchor=a[B](c+1),a=a[B](0,c));c=a[q]("?");0<=c&&(Na(d.d,a[B](c+1)),a=a[B](0,c));d.anchor&&b&&Na(d.d,d.anchor);a&&"/"==a[ma](0)&&(a=a[B](1));d.path=a;return d}
function Oa(a,b){function c(a){var b=(a.hostname||"")[y](":")[0][D](),c=(a[A]||"")[D](),c=1*a[pa]||("http:"==c?80:"https:"==c?443:"");a=a.pathname||"";0==a[q]("/")||(a="/"+a);return[b,""+c,a]}var d=b||J[qa]("a");d.href=J[z][xa];var e=(d[A]||"")[D](),f=c(d),Be=d[va]||"",k=e+"//"+f[0]+(f[1]?":"+f[1]:"");0==a[q]("//")?a=e+a:0==a[q]("/")?a=k+a:a&&0!=a[q]("?")?0>a[y]("/")[0][q](":")&&(a=k+f[2][B](0,f[2].lastIndexOf("/"))+"/"+a):a=k+f[2]+(a||Be);d.href=a;e=c(d);return{protocol:(d[A]||"")[D](),host:e[0],
port:e[1],path:e[2],Oa:d[va]||"",url:a||""}}function Na(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b)[n](c)}for(var d=Da(b)[y]("&"),e=0;e<d[w];e++)if(d[e]){var f=d[e][q]("=");0>f?c(d[e],"1"):c(d[e][B](0,f),d[e][B](f+1))}}function Pa(a,b){if(F(a)||"["==a[ma](0)&&"]"==a[ma](a[w]-1))return"-";var c=J.domain;return a[q](c+(b&&"/"!=b?b:""))==(0==a[q]("http://")?7:0==a[q]("https://")?8:0)?"0":a};var Qa=0;function Ra(a,b,c){1<=Qa||1<=100*m.random()||ld()||(a=["utmt=error","utmerr="+a,"utmwv=5.6.4","utmn="+Ea(),"utmsp=1"],b&&a[n]("api="+b),c&&a[n]("msg="+G(c[B](0,100))),M.w&&a[n]("aip=1"),Sa(a[C]("&")),Qa++)};var Ta=0,Ua={};function N(a){return Va("x"+Ta++,a)}function Va(a,b){Ua[a]=!!b;return a}
var Wa=N(),Xa=Va("anonymizeIp"),Ya=N(),$a=N(),ab=N(),bb=N(),O=N(),P=N(),cb=N(),db=N(),eb=N(),fb=N(),gb=N(),hb=N(),ib=N(),jb=N(),kb=N(),lb=N(),nb=N(),ob=N(),pb=N(),qb=N(),rb=N(),sb=N(),tb=N(),ub=N(),vb=N(),wb=N(),xb=N(),yb=N(),zb=N(),Ab=N(),Bb=N(),Cb=N(),Db=N(),Eb=N(),Fb=N(!0),Gb=Va("currencyCode"),Hb=Va("page"),Ib=Va("title"),Jb=N(),Kb=N(),Lb=N(),Mb=N(),Nb=N(),Ob=N(),Pb=N(),Qb=N(),Rb=N(),Q=N(!0),Sb=N(!0),Tb=N(!0),Ub=N(!0),Vb=N(!0),Wb=N(!0),Zb=N(!0),$b=N(!0),ac=N(!0),bc=N(!0),cc=N(!0),R=N(!0),dc=N(!0),
ec=N(!0),fc=N(!0),gc=N(!0),hc=N(!0),ic=N(!0),jc=N(!0),S=N(!0),kc=N(!0),lc=N(!0),mc=N(!0),nc=N(!0),oc=N(!0),pc=N(!0),qc=N(!0),rc=Va("campaignParams"),sc=N(),tc=Va("hitCallback"),uc=N();N();var vc=N(),wc=N(),xc=N(),yc=N(),zc=N(),Ac=N(),Bc=N(),Cc=N(),Dc=N(),Ec=N(),Fc=N(),Gc=N(),Hc=N(),Ic=N();N();var Mc=N(),Nc=N(),Yb=N(),Jc=N(),Kc=N(),Lc=Va("utmtCookieName"),Cd=Va("displayFeatures"),Oc=N(),of=Va("gtmid"),Oe=Va("uaName"),Pe=Va("uaDomain"),Qe=Va("uaPath"),pf=Va("linkid");var Re=function(){function a(a,c,d){T(qf[x],a,c,d)}a("_createTracker",qf[x].r,55);a("_getTracker",qf[x].oa,0);a("_getTrackerByName",qf[x].u,51);a("_getTrackers",qf[x].pa,130);a("_anonymizeIp",qf[x].aa,16);a("_forceSSL",qf[x].la,125);a("_getPlugin",Pc,120)},Se=function(){function a(a,c,d){T(U[x],a,c,d)}Qc("_getName",$a,58);Qc("_getAccount",Wa,64);Qc("_visitCode",Q,54);Qc("_getClientInfo",ib,53,1);Qc("_getDetectTitle",lb,56,1);Qc("_getDetectFlash",jb,65,1);Qc("_getLocalGifPath",wb,57);Qc("_getServiceMode",
xb,59);V("_setClientInfo",ib,66,2);V("_setAccount",Wa,3);V("_setNamespace",Ya,48);V("_setAllowLinker",fb,11,2);V("_setDetectFlash",jb,61,2);V("_setDetectTitle",lb,62,2);V("_setLocalGifPath",wb,46,0);V("_setLocalServerMode",xb,92,void 0,0);V("_setRemoteServerMode",xb,63,void 0,1);V("_setLocalRemoteServerMode",xb,47,void 0,2);V("_setSampleRate",vb,45,1);V("_setCampaignTrack",kb,36,2);V("_setAllowAnchor",gb,7,2);V("_setCampNameKey",ob,41);V("_setCampContentKey",tb,38);V("_setCampIdKey",nb,39);V("_setCampMediumKey",
rb,40);V("_setCampNOKey",ub,42);V("_setCampSourceKey",qb,43);V("_setCampTermKey",sb,44);V("_setCampCIdKey",pb,37);V("_setCookiePath",P,9,0);V("_setMaxCustomVariables",yb,0,1);V("_setVisitorCookieTimeout",cb,28,1);V("_setSessionCookieTimeout",db,26,1);V("_setCampaignCookieTimeout",eb,29,1);V("_setReferrerOverride",Jb,49);V("_setSiteSpeedSampleRate",Dc,132);a("_trackPageview",U[x].Fa,1);a("_trackEvent",U[x].F,4);a("_trackPageLoadTime",U[x].Ea,100);a("_trackSocial",U[x].Ga,104);a("_trackTrans",U[x].Ia,
18);a("_sendXEvent",U[x].t,78);a("_createEventTracker",U[x].ia,74);a("_getVersion",U[x].qa,60);a("_setDomainName",U[x].B,6);a("_setAllowHash",U[x].va,8);a("_getLinkerUrl",U[x].na,52);a("_link",U[x].link,101);a("_linkByPost",U[x].ua,102);a("_setTrans",U[x].za,20);a("_addTrans",U[x].$,21);a("_addItem",U[x].Y,19);a("_clearTrans",U[x].ea,105);a("_setTransactionDelim",U[x].Aa,82);a("_setCustomVar",U[x].wa,10);a("_deleteCustomVar",U[x].ka,35);a("_getVisitorCustomVar",U[x].ra,50);a("_setXKey",U[x].Ca,83);
a("_setXValue",U[x].Da,84);a("_getXKey",U[x].sa,76);a("_getXValue",U[x].ta,77);a("_clearXKey",U[x].fa,72);a("_clearXValue",U[x].ga,73);a("_createXObj",U[x].ja,75);a("_addIgnoredOrganic",U[x].W,15);a("_clearIgnoredOrganic",U[x].ba,97);a("_addIgnoredRef",U[x].X,31);a("_clearIgnoredRef",U[x].ca,32);a("_addOrganic",U[x].Z,14);a("_clearOrganic",U[x].da,70);a("_cookiePathCopy",U[x].ha,30);a("_get",U[x].ma,106);a("_set",U[x].xa,107);a("_addEventListener",U[x].addEventListener,108);a("_removeEventListener",
U[x].removeEventListener,109);a("_addDevId",U[x].V);a("_getPlugin",Pc,122);a("_setPageGroup",U[x].ya,126);a("_trackTiming",U[x].Ha,124);a("_initData",U[x].v,2);a("_setVar",U[x].Ba,22);V("_setSessionTimeout",db,27,3);V("_setCookieTimeout",eb,25,3);V("_setCookiePersistence",cb,24,1);a("_setAutoTrackOutbound",Fa,79);a("_setTrackOutboundSubdomains",Fa,81);a("_setHrefExamineLimit",Fa,80)};function Pc(a){var b=this.plugins_;if(b)return b.get(a)}
var T=function(a,b,c,d){a[b]=function(){try{return void 0!=d&&H(d),c[ya](this,arguments)}catch(a){throw Ra("exc",b,a&&a[r]),a;}}},Qc=function(a,b,c,d){U[x][a]=function(){try{return H(c),Aa(this.a.get(b),d)}catch(e){throw Ra("exc",a,e&&e[r]),e;}}},V=function(a,b,c,d,e){U[x][a]=function(f){try{H(c),void 0==e?this.a.set(b,Aa(f,d)):this.a.set(b,e)}catch(Be){throw Ra("exc",a,Be&&Be[r]),Be;}}},Te=function(a,b){return{type:b,target:a,stopPropagation:function(){throw"aborted";}}};var Rc=new RegExp(/(^|\.)doubleclick\.net$/i),Sc=function(a,b){return Rc[ia](J[z].hostname)?!0:"/"!==b?!1:0!=a[q]("www.google.")&&0!=a[q](".google.")&&0!=a[q]("google.")||-1<a[q]("google.org")?!1:!0},Tc=function(a){var b=a.get(bb),c=a.c(P,"/");Sc(b,c)&&a[ta]()};var Zc=function(){var a={},b={},c=new Uc;this.g=function(a,b){c.add(a,b)};var d=new Uc;this.e=function(a,b){d.add(a,b)};var e=!1,f=!1,Be=!0;this.T=function(){e=!0};this.j=function(a){this[ka]();this.set(sc,a,!0);a=new Vc(this);e=!1;d.cb(this);e=!0;b={};this.n();a.Ja()};this.load=function(){e&&(e=!1,this.Ka(),Wc(this),f||(f=!0,c.cb(this),Xc(this),Wc(this)),e=!0)};this.n=function(){if(e)if(f)e=!1,Xc(this),e=!0;else this[ka]()};this.get=function(c){Ua[c]&&this[ka]();return void 0!==b[c]?b[c]:a[c]};this.set=
function(c,d,e){Ua[c]&&this[ka]();e?b[c]=d:a[c]=d;Ua[c]&&this.n()};this.Za=function(b){a[b]=this.b(b,0)+1};this.b=function(a,b){var c=this.get(a);return void 0==c||""===c?b:1*c};this.c=function(a,b){var c=this.get(a);return void 0==c?b:c+""};this.Ka=function(){if(Be){var b=this.c(bb,""),c=this.c(P,"/");Sc(b,c)||(a[O]=a[hb]&&""!=b?Yc(b):1,Be=!1)}}};Zc[x].stopPropagation=function(){throw"aborted";};
var Vc=function(a){var b=this;this.q=0;var c=a.get(tc);this.Ua=function(){0<b.q&&c&&(b.q--,b.q||c())};this.Ja=function(){!b.q&&c&&ca(c,10)};a.set(uc,b,!0)};function $c(a,b){b=b||[];for(var c=0;c<b[w];c++){var d=b[c];if(""+a==d||0==d[q](a+"."))return d}return"-"}
var bd=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(6!==b[w]||ad(b[0],c))return!1;c=1*b[1];var d=1*b[2],e=1*b[3],f=1*b[4];b=1*b[5];if(!(0<=c&&0<d&&0<e&&0<f&&0<=b))return!1;a.set(Q,c);a.set(Vb,d);a.set(Wb,e);a.set(Zb,f);a.set($b,b);return!0},cd=function(a){var b=a.get(Q),c=a.get(Vb),d=a.get(Wb),e=a.get(Zb),f=a.b($b,1);return[a.b(O,1),void 0!=b?b:"-",c||"-",d||"-",e||"-",f][C](".")},dd=function(a){return[a.b(O,1),a.b(cc,0),a.b(R,1),a.b(dc,0)][C](".")},ed=function(a,b,c){c=c?"":a.c(O,"1");var d=
b[y](".");if(4!==d[w]||ad(d[0],c))d=null;a.set(cc,d?1*d[1]:0);a.set(R,d?1*d[2]:10);a.set(dc,d?1*d[3]:a.get(ab));return null!=d||!ad(b,c)},fd=function(a,b){var c=G(a.c(Tb,"")),d=[],e=a.get(Fb);if(!b&&e){for(var f=0;f<e[w];f++){var Be=e[f];Be&&1==Be[ua]&&d[n](f+"="+G(Be[r])+"="+G(Be[na])+"=1")}0<d[w]&&(c+="|"+d[C]("^"))}return c?a.b(O,1)+"."+c:null},gd=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(2>b[w]||ad(b[0],c))return!1;b=b[ja](1)[C](".")[y]("|");0<b[w]&&a.set(Tb,I(b[0]));if(1>=b[w])return!0;
b=b[1][y](-1==b[1][q](",")?"^":",");for(c=0;c<b[w];c++){var d=b[c][y]("=");if(4==d[w]){var e={};ha(e,I(d[1]));e.value=I(d[2]);e.scope=1;a.get(Fb)[d[0]]=e}}return!0},hd=function(a,b){var c=Ue(a,b);return c?[a.b(O,1),a.b(ec,0),a.b(fc,1),a.b(gc,1),c][C]("."):""},Ue=function(a){function b(b,e){if(!F(a.get(b))){var f=a.c(b,""),f=f[y](" ")[C]("%20"),f=f[y]("+")[C]("%20");c[n](e+"="+f)}}var c=[];b(ic,"utmcid");b(nc,"utmcsr");b(S,"utmgclid");b(kc,"utmgclsrc");b(lc,"utmdclid");b(mc,"utmdsid");b(jc,"utmccn");
b(oc,"utmcmd");b(pc,"utmctr");b(qc,"utmcct");return c[C]("|")},id=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(5>b[w]||ad(b[0],c))return a.set(ec,void 0),a.set(fc,void 0),a.set(gc,void 0),a.set(ic,void 0),a.set(jc,void 0),a.set(nc,void 0),a.set(oc,void 0),a.set(pc,void 0),a.set(qc,void 0),a.set(S,void 0),a.set(kc,void 0),a.set(lc,void 0),a.set(mc,void 0),!1;a.set(ec,1*b[1]);a.set(fc,1*b[2]);a.set(gc,1*b[3]);Ve(a,b[ja](4)[C]("."));return!0},Ve=function(a,b){function c(a){return(a=b[oa](a+"=(.*?)(?:\\|utm|$)"))&&
2==a[w]?a[1]:void 0}function d(b,c){c?(c=e?I(c):c[y]("%20")[C](" "),a.set(b,c)):a.set(b,void 0)}-1==b[q]("=")&&(b=I(b));var e="2"==c("utmcvr");d(ic,c("utmcid"));d(jc,c("utmccn"));d(nc,c("utmcsr"));d(oc,c("utmcmd"));d(pc,c("utmctr"));d(qc,c("utmcct"));d(S,c("utmgclid"));d(kc,c("utmgclsrc"));d(lc,c("utmdclid"));d(mc,c("utmdsid"))},ad=function(a,b){return b?a!=b:!/^\d+$/[ia](a)};var Uc=function(){this.filters=[]};Uc[x].add=function(a,b){this.filters[n]({name:a,s:b})};Uc[x].cb=function(a){try{for(var b=0;b<this.filters[w];b++)this.filters[b].s.call(W,a)}catch(c){}};function jd(a){100!=a.get(vb)&&a.get(Q)%1E4>=100*a.get(vb)&&a[ta]()}function kd(a){ld(a.get(Wa))&&a[ta]()}function md(a){"file:"==J[z][A]&&a[ta]()}function Ge(a){He()&&a[ta]()}function nd(a){a.get(Ib)||a.set(Ib,J.title,!0);a.get(Hb)||a.set(Hb,J[z].pathname+J[z][va],!0)}
function lf(a){a.get(Wa)&&"UA-XXXXX-X"!=a.get(Wa)||a[ta]()};var od=new function(){var a=[];this.set=function(b){a[b]=!0};this.encode=function(){for(var b=[],c=0;c<a[w];c++)a[c]&&(b[m[la](c/6)]=b[m[la](c/6)]^1<<c%6);for(c=0;c<b[w];c++)b[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[ma](b[c]||0);return b[C]("")+"~"}};function H(a){od.set(a)};var W=window,J=document,ld=function(a){var b=W._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===W["ga-disable-"+a])return!0;try{var c=W.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(d){}return!1},He=function(){return W[za]&&"preview"==W[za].loadPurpose},We=function(a,b){ca(a,b)},pd=function(a){var b=[],c=J.cookie[y](";");a=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$");for(var d=0;d<c[w];d++){var e=c[d][oa](a);e&&b[n](e[1])}return b},X=function(a,b,c,d,e,f){e=ld(e)?!1:Sc(d,c)?!1:He()?!1:!0;
e&&((b=mf(b))&&2E3<b[w]&&(b=b[B](0,2E3),H(69)),a=a+"="+b+"; path="+c+"; ",f&&(a+="expires="+(new Date((new Date)[g]()+f)).toGMTString()+"; "),d&&(a+="domain="+d+";"),J.cookie=a)},mf=function(a){if(!a)return a;var b=a[q](";");-1!=b&&(a=a[B](0,b),H(141));if(!(0<=W[za].userAgent[q]("Firefox")))return a;a=a[p](/\n|\r/g," ");for(var b=0,c=a[w];b<c;++b){var d=a.charCodeAt(b)&255;if(10==d||13==d)a=a[B](0,b)+"?"+a[B](b+1)}return a};var qd,rd,sd=function(){if(!qd){var a={},b=W[za],c=W.screen;a.Q=c?c.width+"x"+c.height:"-";a.P=c?c.colorDepth+"-bit":"-";a.language=(b&&(b.language||b.browserLanguage)||"-")[D]();a.javaEnabled=b&&b.javaEnabled()?1:0;a.characterSet=J.characterSet||J.charset||"-";try{var d;var e=J.documentElement,f=J.body,Be=f&&f[sa]&&f[wa],b=[];e&&e[sa]&&e[wa]&&("CSS1Compat"===J.compatMode||!Be)?b=[e[sa],e[wa]]:Be&&(b=[f[sa],f[wa]]);d=0>=b[0]||0>=b[1]?"":b[C]("x");a.Wa=d}catch(k){H(135)}qd=a}},td=function(){sd();for(var a=
qd,b=W[za],a=b.appName+b.version+a.language+b.platform+b.userAgent+a.javaEnabled+a.Q+a.P+(J.cookie?J.cookie:"")+(J.referrer?J.referrer:""),b=a[w],c=W.history[w];0<c;)a+=c--^b++;return Yc(a)},ud=function(a){sd();var b=qd;a.set(Lb,b.Q);a.set(Mb,b.P);a.set(Pb,b.language);a.set(Qb,b.characterSet);a.set(Nb,b.javaEnabled);a.set(Rb,b.Wa);if(a.get(ib)&&a.get(jb)){if(!(b=rd)){var c,d,e;d="ShockwaveFlash";if((b=(b=W[za])?b.plugins:void 0)&&0<b[w])for(c=0;c<b[w]&&!e;c++)d=b[c],-1<d[r][q]("Shockwave Flash")&&
(e=d.description[y]("Shockwave Flash ")[1]);else{d=d+"."+d;try{c=new ActiveXObject(d+".7"),e=c.GetVariable("$version")}catch(f){}if(!e)try{c=new ActiveXObject(d+".6"),e="WIN 6,0,21,0",c.AllowScriptAccess="always",e=c.GetVariable("$version")}catch(Be){}if(!e)try{c=new ActiveXObject(d),e=c.GetVariable("$version")}catch(k){}e&&(e=e[y](" ")[1][y](","),e=e[0]+"."+e[1]+" r"+e[2])}b=e?e:"-"}rd=b;a.set(Ob,rd)}else a.set(Ob,"-")};var vd=function(a){if(Ba(a))this.s=a;else{var b=a[0],c=b.lastIndexOf(":"),d=b.lastIndexOf(".");this.h=this.i=this.l="";-1==c&&-1==d?this.h=b:-1==c&&-1!=d?(this.i=b[B](0,d),this.h=b[B](d+1)):-1!=c&&-1==d?(this.l=b[B](0,c),this.h=b[B](c+1)):c>d?(this.i=b[B](0,d),this.l=b[B](d+1,c),this.h=b[B](c+1)):(this.i=b[B](0,d),this.h=b[B](d+1));this.k=a[ja](1);this.Ma=!this.l&&"_require"==this.h;this.J=!this.i&&!this.l&&"_provide"==this.h}},Y=function(){T(Y[x],"push",Y[x][n],5);T(Y[x],"_getPlugin",Pc,121);T(Y[x],
"_createAsyncTracker",Y[x].Sa,33);T(Y[x],"_getAsyncTracker",Y[x].Ta,34);this.I=new nf;this.p=[]};E=Y[x];E.Na=function(a,b,c){var d=this.I.get(a);if(!Ba(d))return!1;b.plugins_=b.plugins_||new nf;b.plugins_.set(a,new d(b,c||{}));return!0};E.push=function(a){var b=Z.Va[ya](this,arguments),b=Z.p.concat(b);for(Z.p=[];0<b[w]&&!Z.O(b[0])&&!(b.shift(),0<Z.p[w]););Z.p=Z.p.concat(b);return 0};E.Va=function(a){for(var b=[],c=0;c<arguments[w];c++)try{var d=new vd(arguments[c]);d.J?this.O(d):b[n](d)}catch(e){}return b};
E.O=function(a){try{if(a.s)a.s[ya](W);else if(a.J)this.I.set(a.k[0],a.k[1]);else{var b="_gat"==a.i?M:"_gaq"==a.i?Z:M.u(a.i);if(a.Ma){if(!this.Na(a.k[0],b,a.k[2])){if(!a.Pa){var c=Oa(""+a.k[1]);var d=c[A],e=J[z][A];var f;if(f="https:"==d||d==e?!0:"http:"!=d?!1:"http:"==e)a:{var Be=Oa(J[z][xa]);if(!(c.Oa||0<=c.url[q]("?")||0<=c[ra][q]("://")||c[u]==Be[u]&&c[pa]==Be[pa]))for(var k="http:"==c[A]?80:443,Ja=M.S,b=0;b<Ja[w];b++)if(c[u]==Ja[b][0]&&(c[pa]||k)==(Ja[b][1]||k)&&0==c[ra][q](Ja[b][2])){f=!0;break a}f=
!1}f&&!ld()&&(a.Pa=Ia(c.url))}return!0}}else a.l&&(b=b.plugins_.get(a.l)),b[a.h][ya](b,a.k)}}catch(t){}};E.Sa=function(a,b){return M.r(a,b||"")};E.Ta=function(a){return M.u(a)};var yd=function(){function a(a,b,c,d){void 0==f[a]&&(f[a]={});void 0==f[a][b]&&(f[a][b]=[]);f[a][b][c]=d}function b(a,b,c){if(void 0!=f[a]&&void 0!=f[a][b])return f[a][b][c]}function c(a,b){if(void 0!=f[a]&&void 0!=f[a][b]){f[a][b]=void 0;var c=!0,d;for(d=0;d<Be[w];d++)if(void 0!=f[a][Be[d]]){c=!1;break}c&&(f[a]=void 0)}}function d(a){var b="",c=!1,d,e;for(d=0;d<Be[w];d++)if(e=a[Be[d]],void 0!=e){c&&(b+=Be[d]);for(var c=[],f=void 0,Bd=void 0,Bd=0;Bd<e[w];Bd++)if(void 0!=e[Bd]){f="";1!=Bd&&void 0==
e[Bd-1]&&(f+=Bd[v]()+"!");for(var fa=e[Bd],Ke="",Le=void 0,Me=void 0,ga=void 0,Le=0;Le<fa[w];Le++)Me=fa[ma](Le),ga=k[Me],Ke+=void 0!=ga?ga:Me;f+=Ke;c[n](f)}b+="("+c[C]("*")+")";c=!1}else c=!0;return b}var e=this,f=[],Be=["k","v"],k={"'":"'0",")":"'1","*":"'2","!":"'3"};e.Ra=function(a){return void 0!=f[a]};e.A=function(){for(var a="",b=0;b<f[w];b++)void 0!=f[b]&&(a+=b[v]()+d(f[b]));return a};e.Qa=function(a){if(void 0==a)return e.A();for(var b=a.A(),c=0;c<f[w];c++)void 0==f[c]||a.Ra(c)||(b+=c[v]()+
d(f[c]));return b};e.f=function(b,c,d){if(!wd(d))return!1;a(b,"k",c,d);return!0};e.o=function(b,c,d){if(!xd(d))return!1;a(b,"v",c,d[v]());return!0};e.getKey=function(a,c){return b(a,"k",c)};e.N=function(a,c){return b(a,"v",c)};e.L=function(a){c(a,"k")};e.M=function(a){c(a,"v")};T(e,"_setKey",e.f,89);T(e,"_setValue",e.o,90);T(e,"_getKey",e.getKey,87);T(e,"_getValue",e.N,88);T(e,"_clearKey",e.L,85);T(e,"_clearValue",e.M,86)};function wd(a){return"string"==typeof a}
function xd(a){return!("number"==typeof a||void 0!=Number&&a instanceof Number)||m.round(a)!=a||da(a)||a==ba?!1:!0};var zd=function(a){var b=W.gaGlobal;a&&!b&&(W.gaGlobal=b={});return b},Ad=function(){var a=zd(!0).hid;null==a&&(a=Ea(),zd(!0).hid=a);return a},Dd=function(a){a.set(Kb,Ad());var b=zd();if(b&&b.dh==a.get(O)){var c=b.sid;c&&(a.get(ac)?H(112):H(132),a.set(Zb,c),a.get(Sb)&&a.set(Wb,c));b=b.vid;a.get(Sb)&&b&&(b=b[y]("."),a.set(Q,1*b[0]),a.set(Vb,1*b[1]))}};var Ed,Fd=function(a,b,c,d){var e=a.c(bb,""),f=a.c(P,"/");d=void 0!=d?d:a.b(cb,0);a=a.c(Wa,"");X(b,c,f,e,a,d)},Xc=function(a){var b=a.c(bb,"");a.b(O,1);var c=a.c(P,"/"),d=a.c(Wa,"");X("__utma",cd(a),c,b,d,a.get(cb));X("__utmb",dd(a),c,b,d,a.get(db));X("__utmc",""+a.b(O,1),c,b,d);var e=hd(a,!0);e?X("__utmz",e,c,b,d,a.get(eb)):X("__utmz","",c,b,"",-1);(e=fd(a,!1))?X("__utmv",e,c,b,d,a.get(cb)):X("__utmv","",c,b,"",-1)},Wc=function(a){var b=a.b(O,1);if(!bd(a,$c(b,pd("__utma"))))return a.set(Ub,!0),!1;
var c=!ed(a,$c(b,pd("__utmb")));a.set(bc,c);id(a,$c(b,pd("__utmz")));gd(a,$c(b,pd("__utmv")));Ed=!c;return!0},Gd=function(a){Ed||0<pd("__utmb")[w]||(X("__utmd","1",a.c(P,"/"),a.c(bb,""),a.c(Wa,""),1E4),0==pd("__utmd")[w]&&a[ta]())};var h=0,Jd=function(a){void 0==a.get(Q)?Hd(a):a.get(Ub)&&!a.get(Mc)?Hd(a):a.get(bc)&&Id(a)},Kd=function(a){a.get(hc)&&!a.get(ac)&&(Id(a),a.set(fc,a.get($b)))},Hd=function(a){h++;1<h&&H(137);var b=a.get(ab);a.set(Sb,!0);a.set(Q,Ea()^td(a)&2147483647);a.set(Tb,"");a.set(Vb,b);a.set(Wb,b);a.set(Zb,b);a.set($b,1);a.set(ac,!0);a.set(cc,0);a.set(R,10);a.set(dc,b);a.set(Fb,[]);a.set(Ub,!1);a.set(bc,!1)},Id=function(a){h++;1<h&&H(137);a.set(Wb,a.get(Zb));a.set(Zb,a.get(ab));a.Za($b);a.set(ac,!0);a.set(cc,
0);a.set(R,10);a.set(dc,a.get(ab));a.set(bc,!1)};var Ld="daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q cnn:query virgilio:qs baidu:wd baidu:word alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT search.smt.docomo:MT onet:qt onet:q kvasir:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q centrum.cz:q 360.cn:q sogou:query tut.by:query globo:q ukr:q so.com:q haosou.com:q auone:q".split(" "),
Sd=function(a){if(a.get(kb)&&!a.get(Mc)){var b;b=!F(a.get(ic))||!F(a.get(nc))||!F(a.get(S))||!F(a.get(lc));for(var c={},d=0;d<Md[w];d++){var e=Md[d];c[e]=a.get(e)}(d=a.get(rc))?(H(149),e=new nf,Na(e,d),d=e):d=La(J[z][xa],a.get(gb)).d;if("1"!=L(d.get(a.get(ub)))||!b)if(d=Xe(a,d)||Qd(a),d||b||!a.get(ac)||(Pd(a,void 0,"(direct)",void 0,void 0,void 0,"(direct)","(none)",void 0,void 0),d=!0),d&&(a.set(hc,Rd(a,c)),b="(direct)"==a.get(nc)&&"(direct)"==a.get(jc)&&"(none)"==a.get(oc),a.get(hc)||a.get(ac)&&
!b))a.set(ec,a.get(ab)),a.set(fc,a.get($b)),a.Za(gc)}},Xe=function(a,b){function c(c,d){d=d||"-";var e=L(b.get(a.get(c)));return e&&"-"!=e?I(e):d}var d=L(b.get(a.get(nb)))||"-",e=L(b.get(a.get(qb)))||"-",f=L(b.get(a.get(pb)))||"-",Be=L(b.get("gclsrc"))||"-",k=L(b.get("dclid"))||"-",Ja=c(ob,"(not set)"),t=c(rb,"(not set)"),Za=c(sb),Ma=c(tb);if(F(d)&&F(f)&&F(k)&&F(e))return!1;var mb=!F(f)&&!F(Be),mb=F(e)&&(!F(k)||mb),Xb=F(Za);if(mb||Xb){var Bd=Nd(a),Bd=La(Bd,!0);(Bd=Od(a,Bd))&&!F(Bd[1]&&!Bd[2])&&(mb&&
(e=Bd[0]),Xb&&(Za=Bd[1]))}Pd(a,d,e,f,Be,k,Ja,t,Za,Ma);return!0},Qd=function(a){var b=Nd(a),c=La(b,!0);(b=!(void 0!=b&&null!=b&&""!=b&&"0"!=b&&"-"!=b&&0<=b[q]("://")))||(b=c&&-1<c[u][q]("google")&&c.d.contains("q")&&"cse"==c[ra]);if(b)return!1;if((b=Od(a,c))&&!b[2])return Pd(a,void 0,b[0],void 0,void 0,void 0,"(organic)","organic",b[1],void 0),!0;if(b||!a.get(ac))return!1;a:{for(var b=a.get(Bb),d=Ka(c[u]),e=0;e<b[w];++e)if(-1<d[q](b[e])){a=!1;break a}Pd(a,void 0,d,void 0,void 0,void 0,"(referral)",
"referral",void 0,"/"+c[ra]);a=!0}return a},Od=function(a,b){for(var c=a.get(zb),d=0;d<c[w];++d){var e=c[d][y](":");if(-1<b[u][q](e[0][D]())){var f=b.d.get(e[1]);if(f&&(f=K(f),!f&&-1<b[u][q]("google.")&&(f="(not provided)"),!e[3]||-1<b.url[q](e[3]))){f||H(151);a:{for(var c=f,d=a.get(Ab),c=I(c)[D](),Be=0;Be<d[w];++Be)if(c==d[Be]){c=!0;break a}c=!1}return[e[2]||e[0],f,c]}}}return null},Pd=function(a,b,c,d,e,f,Be,k,Ja,t){a.set(ic,b);a.set(nc,c);a.set(S,d);a.set(kc,e);a.set(lc,f);a.set(jc,Be);a.set(oc,
k);a.set(pc,Ja);a.set(qc,t)},Md=[jc,ic,S,lc,nc,oc,pc,qc],Rd=function(a,b){function c(a){a=(""+a)[y]("+")[C]("%20");return a=a[y](" ")[C]("%20")}function d(c){var d=""+(a.get(c)||"");c=""+(b[c]||"");return 0<d[w]&&d==c}if(d(S)||d(lc))return H(131),!1;for(var e=0;e<Md[w];e++){var f=Md[e],Be=b[f]||"-",f=a.get(f)||"-";if(c(Be)!=c(f))return!0}return!1},Td=new RegExp(/^https?:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i),jf=/^https?:\/\/r\.search\.yahoo\.com\/[^?]*$/i,Nd=function(a){a=Pa(a.get(Jb),
a.get(P));try{if(Td[ia](a))return H(136),a+"?q=";if(jf[ia](a))return H(150),a+"?p=(not provided)"}catch(b){H(145)}return a};var Ud,Vd,Wd=function(a){Ud=a.c(S,"");Vd=a.c(kc,"")},Xd=function(a){var b=a.c(S,""),c=a.c(kc,"");b!=Ud&&(-1<c[q]("ds")?a.set(mc,void 0):!F(Ud)&&-1<Vd[q]("ds")&&a.set(mc,Ud))};var Zd=function(a){Yd(a,J[z][xa])?(a.set(Mc,!0),H(12)):a.set(Mc,!1)},Yd=function(a,b){if(!a.get(fb))return!1;var c=La(b,a.get(gb)),d=K(c.d.get("__utma")),e=K(c.d.get("__utmb")),f=K(c.d.get("__utmc")),Be=K(c.d.get("__utmx")),k=K(c.d.get("__utmz")),Ja=K(c.d.get("__utmv")),c=K(c.d.get("__utmk"));if(Yc(""+d+e+f+Be+k+Ja)!=c){d=I(d);e=I(e);f=I(f);Be=I(Be);f=$d(d+e+f+Be,k,Ja,c);if(!f)return!1;k=f[0];Ja=f[1]}if(!bd(a,d,!0))return!1;ed(a,e,!0);id(a,k,!0);gd(a,Ja,!0);ae(a,Be,!0);return!0},ce=function(a,b,c){var d;
d=cd(a)||"-";var e=dd(a)||"-",f=""+a.b(O,1)||"-",Be=be(a)||"-",k=hd(a,!1)||"-";a=fd(a,!1)||"-";var Ja=Yc(""+d+e+f+Be+k+a),t=[];t[n]("__utma="+d);t[n]("__utmb="+e);t[n]("__utmc="+f);t[n]("__utmx="+Be);t[n]("__utmz="+k);t[n]("__utmv="+a);t[n]("__utmk="+Ja);d=t[C]("&");if(!d)return b;e=b[q]("#");if(c)return 0>e?b+"#"+d:b+"&"+d;c="";f=b[q]("?");0<e&&(c=b[B](e),b=b[B](0,e));return 0>f?b+"?"+d+c:b+"&"+d+c},$d=function(a,b,c,d){for(var e=0;3>e;e++){for(var f=0;3>f;f++){if(d==Yc(a+b+c))return H(127),[b,c];
var Be=b[p](/ /g,"%20"),k=c[p](/ /g,"%20");if(d==Yc(a+Be+k))return H(128),[Be,k];Be=Be[p](/\+/g,"%20");k=k[p](/\+/g,"%20");if(d==Yc(a+Be+k))return H(129),[Be,k];try{var Ja=b[oa]("utmctr=(.*?)(?:\\|utm|$)");if(Ja&&2==Ja[w]&&(Be=b[p](Ja[1],G(I(Ja[1]))),d==Yc(a+Be+c)))return H(139),[Be,c]}catch(t){}b=I(b)}c=I(c)}};var de="|",fe=function(a,b,c,d,e,f,Be,k,Ja){var t=ee(a,b);t||(t={},a.get(Cb)[n](t));t.id_=b;t.affiliation_=c;t.total_=d;t.tax_=e;t.shipping_=f;t.city_=Be;t.state_=k;t.country_=Ja;t.items_=t.items_||[];return t},ge=function(a,b,c,d,e,f,Be){a=ee(a,b)||fe(a,b,"",0,0,0,"","","");var k;a:{if(a&&a.items_){k=a.items_;for(var Ja=0;Ja<k[w];Ja++)if(k[Ja].sku_==c){k=k[Ja];break a}}k=null}Ja=k||{};Ja.transId_=b;Ja.sku_=c;Ja.name_=d;Ja.category_=e;Ja.price_=f;Ja.quantity_=Be;k||a.items_[n](Ja);return Ja},ee=function(a,
b){for(var c=a.get(Cb),d=0;d<c[w];d++)if(c[d].id_==b)return c[d];return null};var he,ie=function(a){if(!he){var b;b=J[z].hash;var c=W[r],d=/^#?gaso=([^&]*)/;if(c=(b=(b=b&&b[oa](d)||c&&c[oa](d))?b[1]:K(pd("GASO")))&&b[oa](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))Fd(a,"GASO",""+b,0),M._gasoDomain=a.get(bb),M._gasoCPath=a.get(P),a=c[1],Ia("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+Ea(),"_gasojs");he=!0}};var ae=function(a,b,c){c&&(b=I(b));c=a.b(O,1);b=b[y](".");2>b[w]||!/^\d+$/[ia](b[0])||(b[0]=""+c,Fd(a,"__utmx",b[C]("."),void 0))},be=function(a,b){var c=$c(a.get(O),pd("__utmx"));"-"==c&&(c="");return b?G(c):c},Ye=function(a){try{var b=La(J[z][xa],!1),c=ea(L(b.d.get("utm_referrer")))||"";c&&a.set(Jb,c);var d=ea(K(b.d.get("utm_expid")))||"";d&&(d=d[y](".")[0],a.set(Oc,""+d))}catch(e){H(146)}},l=function(a){var b=W.gaData&&W.gaData.expId;b&&a.set(Oc,""+b)};var ke=function(a,b){var c=m.min(a.b(Dc,0),100);if(a.b(Q,0)%100>=c)return!1;c=Ze()||$e();if(void 0==c)return!1;var d=c[0];if(void 0==d||d==ba||da(d))return!1;0<d?af(c)?b(je(c)):b(je(c[ja](0,1))):Ga(W,"load",function(){ke(a,b)},!1);return!0},me=function(a,b,c,d){var e=new yd;e.f(14,90,b[B](0,500));e.f(14,91,a[B](0,150));e.f(14,92,""+le(c));void 0!=d&&e.f(14,93,d[B](0,500));e.o(14,90,c);return e},af=function(a){for(var b=1;b<a[w];b++)if(da(a[b])||a[b]==ba||0>a[b])return!1;return!0},le=function(a){return da(a)||
0>a?0:5E3>a?10*m[la](a/10):5E4>a?100*m[la](a/100):41E5>a?1E3*m[la](a/1E3):41E5},je=function(a){for(var b=new yd,c=0;c<a[w];c++)b.f(14,c+1,""+le(a[c])),b.o(14,c+1,a[c]);return b},Ze=function(){var a=W.performance||W.webkitPerformance;if(a=a&&a.timing){var b=a.navigationStart;if(0==b)H(133);else return[a.loadEventStart-b,a.domainLookupEnd-a.domainLookupStart,a.connectEnd-a.connectStart,a.responseStart-a.requestStart,a.responseEnd-a.responseStart,a.fetchStart-b,a.domInteractive-b,a.domContentLoadedEventStart-
b]}},$e=function(){if(W.top==W){var a=W.external,b=a&&a.onloadT;a&&!a.isValidLoadTime&&(b=void 0);2147483648<b&&(b=void 0);0<b&&a.setPageReadyTime();return void 0==b?void 0:[b]}};var cf=function(a){if(a.get(Sb))try{var b;a:{var c=pd(a.get(Oe)||"_ga");if(c&&!(1>c[w])){for(var d=[],e=0;e<c[w];e++){var f;var Be=c[e][y]("."),k=Be.shift();if(("GA1"==k||"1"==k)&&1<Be[w]){var Ja=Be.shift()[y]("-");1==Ja[w]&&(Ja[1]="1");Ja[0]*=1;Ja[1]*=1;f={Ya:Ja,$a:Be[C](".")}}else f=void 0;f&&d[n](f)}if(1==d[w]){b=d[0].$a;break a}if(0!=d[w]){var t=a.get(Pe)||a.get(bb),d=bf(d,(0==t[q](".")?t.substr(1):t)[y](".")[w],0);if(1==d[w]){b=d[0].$a;break a}var Za=a.get(Qe)||a.get(P);(c=Za)?(1<c[w]&&"/"==
c[ma](c[w]-1)&&(c=c.substr(0,c[w]-1)),0!=c[q]("/")&&(c="/"+c),Za=c):Za="/";d=bf(d,"/"==Za?1:Za[y]("/")[w],1);b=d[0].$a;break a}}b=void 0}if(b){var Ma=(""+b)[y](".");2==Ma[w]&&/[0-9.]/[ia](Ma)&&(H(114),a.set(Q,Ma[0]),a.set(Vb,Ma[1]),a.set(Sb,!1))}}catch(mb){H(115)}},bf=function(a,b,c){for(var d=[],e=[],f=128,Be=0;Be<a[w];Be++){var k=a[Be];if(k.Ya[c]==b)d[n](k);else if(k.Ya[c]==f)e[n](k);else k.Ya[c]<f&&(e=[k],f=k.Ya[c])}return 0<d[w]?d:e};var kf=/^gtm\d+$/,hf=function(a){var b;b=!!a.b(Cd,1);b&&(H(140),"page"!=a.get(sc)?a.set(Kc,"",!0):(b=a.c(Lc,""),b||(b=(b=a.c($a,""))&&"~0"!=b?kf[ia](b)?"__utmt_"+G(a.c(Wa,"")):"__utmt_"+G(b):"__utmt"),0<pd(b)[w]?a.set(Kc,"",!0):(X(b,"1",a.c(P,"/"),a.c(bb,""),a.c(Wa,""),6E5),0<pd(b)[w]&&(a.set(Kc,Ea(),!0),a.set(Yb,1,!0),a.set(Jc,Ne()+"/r/__utm.gif?",!0)))))};var U=function(a,b,c){function d(a){return function(b){if((b=b.get(Nc)[a])&&b[w])for(var c=Te(e,a),d=0;d<b[w];d++)b[d].call(e,c)}}var e=this;this.a=new Zc;this.get=function(a){return this.a.get(a)};this.set=function(a,b,c){this.a.set(a,b,c)};this.set(Wa,b||"UA-XXXXX-X");this.set($a,a||"");this.set(Ya,c||"");this.set(ab,m.round((new Date)[g]()/1E3));this.set(P,"/");this.set(cb,63072E6);this.set(eb,15768E6);this.set(db,18E5);this.set(fb,!1);this.set(yb,50);this.set(gb,!1);this.set(hb,!0);this.set(ib,
!0);this.set(jb,!0);this.set(kb,!0);this.set(lb,!0);this.set(ob,"utm_campaign");this.set(nb,"utm_id");this.set(pb,"gclid");this.set(qb,"utm_source");this.set(rb,"utm_medium");this.set(sb,"utm_term");this.set(tb,"utm_content");this.set(ub,"utm_nooverride");this.set(vb,100);this.set(Dc,1);this.set(Ec,!1);this.set(wb,"/__utm.gif");this.set(xb,1);this.set(Cb,[]);this.set(Fb,[]);this.set(zb,Ld[ja](0));this.set(Ab,[]);this.set(Bb,[]);this.B("auto");this.set(Jb,J.referrer);Ye(this.a);this.set(Nc,{hit:[],
load:[]});this.a.g("0",Zd);this.a.g("1",Wd);this.a.g("2",Jd);this.a.g("3",cf);this.a.g("4",Sd);this.a.g("5",Xd);this.a.g("6",Kd);this.a.g("7",d("load"));this.a.g("8",ie);this.a.e("A",kd);this.a.e("B",md);this.a.e("C",Ge);this.a.e("D",Jd);this.a.e("E",jd);this.a.e("F",Tc);this.a.e("G",ne);this.a.e("H",lf);this.a.e("I",Gd);this.a.e("J",nd);this.a.e("K",ud);this.a.e("L",Dd);this.a.e("M",l);this.a.e("N",hf);this.a.e("O",d("hit"));this.a.e("P",oe);this.a.e("Q",pe);0===this.get(ab)&&H(111);this.a.T();this.H=
void 0};E=U[x];E.m=function(){var a=this.get(Db);a||(a=new yd,this.set(Db,a));return a};E.La=function(a){for(var b in a){var c=a[b];a.hasOwnProperty(b)&&this.set(b,c,!0)}};E.K=function(a){if(this.get(Ec))return!1;var b=this,c=ke(this.a,function(c){b.set(Hb,a,!0);b.t(c)});this.set(Ec,c);return c};E.Fa=function(a){a&&Ca(a)?(H(13),this.set(Hb,a,!0)):"object"===typeof a&&null!==a&&this.La(a);this.H=a=this.get(Hb);this.a.j("page");this.K(a)};
E.F=function(a,b,c,d,e){if(""==a||!wd(a)||""==b||!wd(b)||void 0!=c&&!wd(c)||void 0!=d&&!xd(d))return!1;this.set(wc,a,!0);this.set(xc,b,!0);this.set(yc,c,!0);this.set(zc,d,!0);this.set(vc,!!e,!0);this.a.j("event");return!0};E.Ha=function(a,b,c,d,e){var f=this.a.b(Dc,0);1*e===e&&(f=e);if(this.a.b(Q,0)%100>=f)return!1;c=1*(""+c);if(""==a||!wd(a)||""==b||!wd(b)||!xd(c)||da(c)||0>c||0>f||100<f||void 0!=d&&(""==d||!wd(d)))return!1;this.t(me(a,b,c,d));return!0};
E.Ga=function(a,b,c,d){if(!a||!b)return!1;this.set(Ac,a,!0);this.set(Bc,b,!0);this.set(Cc,c||J[z][xa],!0);d&&this.set(Hb,d,!0);this.a.j("social");return!0};E.Ea=function(){this.set(Dc,10);this.K(this.H)};E.Ia=function(){this.a.j("trans")};E.t=function(a){this.set(Eb,a,!0);this.a.j("event")};E.ia=function(a){this.v();var b=this;return{_trackEvent:function(c,d,e){H(91);b.F(a,c,d,e)}}};E.ma=function(a){return this.get(a)};
E.xa=function(a,b){if(a)if(Ca(a))this.set(a,b);else if("object"==typeof a)for(var c in a)a.hasOwnProperty(c)&&this.set(c,a[c])};E.addEventListener=function(a,b){var c=this.get(Nc)[a];c&&c[n](b)};E.removeEventListener=function(a,b){for(var c=this.get(Nc)[a],d=0;c&&d<c[w];d++)if(c[d]==b){c.splice(d,1);break}};E.qa=function(){return"5.6.4"};E.B=function(a){this.get(hb);a="auto"==a?Ka(J.domain):a&&"-"!=a&&"none"!=a?a[D]():"";this.set(bb,a)};E.va=function(a){this.set(hb,!!a)};
E.na=function(a,b){return ce(this.a,a,b)};E.link=function(a,b){if(this.a.get(fb)&&a){var c=ce(this.a,a,b);J[z].href=c}};E.ua=function(a,b){this.a.get(fb)&&a&&a.action&&(a.action=ce(this.a,a.action,b))};
E.za=function(){this.v();var a=this.a,b=J.getElementById?J.getElementById("utmtrans"):J.utmform&&J.utmform.utmtrans?J.utmform.utmtrans:null;if(b&&b[na]){a.set(Cb,[]);for(var b=b[na][y]("UTM:"),c=0;c<b[w];c++){b[c]=Da(b[c]);for(var d=b[c][y](de),e=0;e<d[w];e++)d[e]=Da(d[e]);"T"==d[0]?fe(a,d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8]):"I"==d[0]&&ge(a,d[1],d[2],d[3],d[4],d[5],d[6])}}};E.$=function(a,b,c,d,e,f,Be,k){return fe(this.a,a,b,c,d,e,f,Be,k)};E.Y=function(a,b,c,d,e,f){return ge(this.a,a,b,c,d,e,f)};
E.Aa=function(a){de=a||"|"};E.ea=function(){this.set(Cb,[])};E.wa=function(a,b,c,d){var e=this.a;if(0>=a||a>e.get(yb))a=!1;else if(!b||!c||128<b[w]+c[w])a=!1;else{1!=d&&2!=d&&(d=3);var f={};ha(f,b);f.value=c;f.scope=d;e.get(Fb)[a]=f;a=!0}a&&this.a.n();return a};E.ka=function(a){this.a.get(Fb)[a]=void 0;this.a.n()};E.ra=function(a){return(a=this.a.get(Fb)[a])&&1==a[ua]?a[na]:void 0};E.Ca=function(a,b,c){12==a&&1==b?this.set(pf,c):this.m().f(a,b,c)};E.Da=function(a,b,c){this.m().o(a,b,c)};
E.sa=function(a,b){return this.m().getKey(a,b)};E.ta=function(a,b){return this.m().N(a,b)};E.fa=function(a){this.m().L(a)};E.ga=function(a){this.m().M(a)};E.ja=function(){return new yd};E.W=function(a){a&&this.get(Ab)[n](a[D]())};E.ba=function(){this.set(Ab,[])};E.X=function(a){a&&this.get(Bb)[n](a[D]())};E.ca=function(){this.set(Bb,[])};E.Z=function(a,b,c,d,e){if(a&&b){a=[a,b[D]()][C](":");if(d||e)a=[a,d,e][C](":");d=this.get(zb);d.splice(c?0:d[w],0,a)}};E.da=function(){this.set(zb,[])};
E.ha=function(a){this.a[ka]();var b=this.get(P),c=be(this.a);this.set(P,a);this.a.n();ae(this.a,c);this.set(P,b)};E.ya=function(a,b){if(0<a&&5>=a&&Ca(b)&&""!=b){var c=this.get(Fc)||[];c[a]=b;this.set(Fc,c)}};E.V=function(a){a=""+a;if(a[oa](/^[A-Za-z0-9]{1,5}$/)){var b=this.get(Ic)||[];b[n](a);this.set(Ic,b)}};E.v=function(){this.a[ka]()};E.Ba=function(a){a&&""!=a&&(this.set(Tb,a),this.a.j("var"))};var ne=function(a){"trans"!==a.get(sc)&&500<=a.b(cc,0)&&a[ta]();if("event"===a.get(sc)){var b=(new Date)[g](),c=a.b(dc,0),d=a.b(Zb,0),c=m[la]((b-(c!=d?c:1E3*c))/1E3*1);0<c&&(a.set(dc,b),a.set(R,m.min(10,a.b(R,0)+c)));0>=a.b(R,0)&&a[ta]()}},pe=function(a){"event"===a.get(sc)&&a.set(R,m.max(0,a.b(R,10)-1))};var qe=function(){var a=[];this.add=function(b,c,d){d&&(c=G(""+c));a[n](b+"="+c)};this.toString=function(){return a[C]("&")}},re=function(a,b){(b||2!=a.get(xb))&&a.Za(cc)},se=function(a,b){b.add("utmwv","5.6.4");b.add("utms",a.get(cc));b.add("utmn",Ea());var c=J[z].hostname;F(c)||b.add("utmhn",c,!0);c=a.get(vb);100!=c&&b.add("utmsp",c,!0)},te=function(a,b){b.add("utmht",(new Date)[g]());b.add("utmac",Da(a.get(Wa)));a.get(Oc)&&b.add("utmxkey",a.get(Oc),!0);a.get(vc)&&b.add("utmni",1);a.get(of)&&b.add("utmgtm",
a.get(of),!0);var c=a.get(Ic);c&&0<c[w]&&b.add("utmdid",c[C]("."));ff(a,b);!1!==a.get(Xa)&&(a.get(Xa)||M.w)&&b.add("aip",1);void 0!==a.get(Kc)&&b.add("utmjid",a.c(Kc,""),!0);a.b(Yb,0)&&b.add("utmredir",a.b(Yb,0),!0);M.bb||(M.bb=a.get(Wa));(1<M.ab()||M.bb!=a.get(Wa))&&b.add("utmmt",1);b.add("utmu",od.encode())},ue=function(a,b){for(var c=a.get(Fc)||[],d=[],e=1;e<c[w];e++)c[e]&&d[n](e+":"+G(c[e][p](/%/g,"%25")[p](/:/g,"%3A")[p](/,/g,"%2C")));d[w]&&b.add("utmpg",d[C](","))},ff=function(a,b){function c(a,
b){b&&d[n](a+"="+b+";")}var d=[];c("__utma",cd(a));c("__utmz",hd(a,!1));c("__utmv",fd(a,!0));c("__utmx",be(a));b.add("utmcc",d[C]("+"),!0)},ve=function(a,b){a.get(ib)&&(b.add("utmcs",a.get(Qb),!0),b.add("utmsr",a.get(Lb)),a.get(Rb)&&b.add("utmvp",a.get(Rb)),b.add("utmsc",a.get(Mb)),b.add("utmul",a.get(Pb)),b.add("utmje",a.get(Nb)),b.add("utmfl",a.get(Ob),!0))},we=function(a,b){a.get(lb)&&a.get(Ib)&&b.add("utmdt",a.get(Ib),!0);b.add("utmhid",a.get(Kb));b.add("utmr",Pa(a.get(Jb),a.get(P)),!0);b.add("utmp",
G(a.get(Hb),!0),!0)},xe=function(a,b){for(var c=a.get(Db),d=a.get(Eb),e=a.get(Fb)||[],f=0;f<e[w];f++){var Be=e[f];Be&&(c||(c=new yd),c.f(8,f,Be[r]),c.f(9,f,Be[na]),3!=Be[ua]&&c.f(11,f,""+Be[ua]))}F(a.get(wc))||F(a.get(xc),!0)||(c||(c=new yd),c.f(5,1,a.get(wc)),c.f(5,2,a.get(xc)),e=a.get(yc),void 0!=e&&c.f(5,3,e),e=a.get(zc),void 0!=e&&c.o(5,1,e));F(a.get(pf))||(c||(c=new yd),c.f(12,1,a.get(pf)));c?b.add("utme",c.Qa(d),!0):d&&b.add("utme",d.A(),!0)},ye=function(a,b,c){var d=new qe;re(a,c);se(a,d);
d.add("utmt","tran");d.add("utmtid",b.id_,!0);d.add("utmtst",b.affiliation_,!0);d.add("utmtto",b.total_,!0);d.add("utmttx",b.tax_,!0);d.add("utmtsp",b.shipping_,!0);d.add("utmtci",b.city_,!0);d.add("utmtrg",b.state_,!0);d.add("utmtco",b.country_,!0);xe(a,d);ve(a,d);we(a,d);(b=a.get(Gb))&&d.add("utmcu",b,!0);c||(ue(a,d),te(a,d));return d[v]()},ze=function(a,b,c){var d=new qe;re(a,c);se(a,d);d.add("utmt","item");d.add("utmtid",b.transId_,!0);d.add("utmipc",b.sku_,!0);d.add("utmipn",b.name_,!0);d.add("utmiva",
b.category_,!0);d.add("utmipr",b.price_,!0);d.add("utmiqt",b.quantity_,!0);xe(a,d);ve(a,d);we(a,d);(b=a.get(Gb))&&d.add("utmcu",b,!0);c||(ue(a,d),te(a,d));return d[v]()},Ae=function(a,b){var c=a.get(sc);if("page"==c)c=new qe,re(a,b),se(a,c),xe(a,c),ve(a,c),we(a,c),b||(ue(a,c),te(a,c)),c=[c[v]()];else if("event"==c)c=new qe,re(a,b),se(a,c),c.add("utmt","event"),xe(a,c),ve(a,c),we(a,c),b||(ue(a,c),te(a,c)),c=[c[v]()];else if("var"==c)c=new qe,re(a,b),se(a,c),c.add("utmt","var"),!b&&te(a,c),c=[c[v]()];
else if("trans"==c)for(var c=[],d=a.get(Cb),e=0;e<d[w];++e){c[n](ye(a,d[e],b));for(var f=d[e].items_,Be=0;Be<f[w];++Be)c[n](ze(a,f[Be],b))}else"social"==c?b?c=[]:(c=new qe,re(a,b),se(a,c),c.add("utmt","social"),c.add("utmsn",a.get(Ac),!0),c.add("utmsa",a.get(Bc),!0),c.add("utmsid",a.get(Cc),!0),xe(a,c),ve(a,c),we(a,c),ue(a,c),te(a,c),c=[c[v]()]):"feedback"==c?b?c=[]:(c=new qe,re(a,b),se(a,c),c.add("utmt","feedback"),c.add("utmfbid",a.get(Gc),!0),c.add("utmfbpr",a.get(Hc),!0),xe(a,c),ve(a,c),we(a,
c),ue(a,c),te(a,c),c=[c[v]()]):c=[];return c},oe=function(a){var b,c=a.get(xb),d=a.get(uc),e=d&&d.Ua,f=0;if(0==c||2==c){var Be=a.get(wb)+"?";b=Ae(a,!0);for(var k=0,Ja=b[w];k<Ja;k++)Sa(b[k],e,Be,!0),f++}if(1==c||2==c)for(b=Ae(a),a=a.c(Jc,""),k=0,Ja=b[w];k<Ja;k++)try{Sa(b[k],e,a),f++}catch(t){t&&Ra(t[r],void 0,t.message)}d&&(d.q=f)};var Ne=function(){return"https:"==J[z][A]||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com"},Ce=function(a){ha(this,"len");this.message=a+"-8192"},De=function(a){ha(this,"ff2post");this.message=a+"-2036"},Sa=function(a,b,c,d){b=b||Fa;if(d||2036>=a[w])gf(a,b,c);else if(8192>=a[w]){if(0<=W[za].userAgent[q]("Firefox")&&![].reduce)throw new De(a[w]);df(a,b)||ef(a,b)||Ee(a,b)||b()}else throw new Ce(a[w]);},gf=function(a,b,c){c=c||Ne()+"/__utm.gif?";var d=new Image(1,1);d.src=c+
a;Ie(d,function(){Ie(d,null);Je(d,null);b()});Je(d,function(){Ie(d,null);Je(d,null);b()})},ef=function(a,b){if(0!=Ne()[q](J[z][A]))return!1;var c;c=W.XDomainRequest;if(!c)return!1;c=new c;c.open("POST",Ne()+"/p/__utm.gif");Je(c,function(){b()});Ie(c,b);c.send(a);return!0},df=function(a,b){var c=W.XMLHttpRequest;if(!c)return!1;var d=new c;if(!("withCredentials"in d))return!1;d.open("POST",Ne()+"/p/__utm.gif",!0);d.withCredentials=!0;d.setRequestHeader("Content-Type","text/plain");d.onreadystatechange=
function(){4==d.readyState&&(b(),d=null)};d.send(a);return!0},Ee=function(a,b){if(!J.body)return We(function(){Ee(a,b)},100),!0;a=aa(a);try{var c=J[qa]('<iframe name="'+a+'"></iframe>')}catch(d){c=J[qa]("iframe"),ha(c,a)}c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var e=Ne()+"/u/post_iframe.html";Ga(W,"beforeunload",function(){c.src="";c.parentNode&&c.parentNode.removeChild(c)});ca(b,1E3);J.body.appendChild(c);c.src=e;return!0};var qf=function(){this.G=this.w=!1;0==Ea()%1E4&&(H(142),this.G=!0);this.C={};this.D=[];this.U=0;this.S=[["www.google-analytics.com","","/plugins/"]];this._gasoCPath=this._gasoDomain=this.bb=void 0;Re();Se()};E=qf[x];E.oa=function(a,b){return this.r(a,void 0,b)};E.r=function(a,b,c){b&&H(23);c&&H(67);void 0==b&&(b="~"+M.U++);a=new U(b,a,c);M.C[b]=a;M.D[n](a);return a};E.u=function(a){a=a||"";return M.C[a]||M.r(void 0,a)};E.pa=function(){return M.D[ja](0)};E.ab=function(){return M.D[w]};
E.aa=function(){this.w=!0};E.la=function(){this.G=!0};var Fe=function(a){if("prerender"==J.visibilityState)return!1;a();return!0};var M=new qf;var Ha=W._gat;Ha&&Ba(Ha._getTracker)?M=Ha:W._gat=M;var Z=new Y;(function(a){if(!Fe(a)){H(123);var b=!1,c=function(){if(!b&&Fe(a)){b=!0;var d=J,e=c;d.removeEventListener?d.removeEventListener("visibilitychange",e,!1):d.detachEvent&&d.detachEvent("onvisibilitychange",e)}};Ga(J,"visibilitychange",c)}})(function(){var a=W._gaq,b=!1;if(a&&Ba(a[n])&&(b="[object Array]"==Object[x][v].call(Object(a)),!b)){Z=a;return}W._gaq=Z;b&&Z[n][ya](Z,a)});function Yc(a){var b=1,c=0,d;if(a)for(b=0,d=a[w]-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b;return b};})();

// ADDITIONAL JQUERY VALIDATE METHODS
(function($) {
  // Validate a multifield birthday
  $.validator.addMethod("mc_birthday", function(date, element, grouping_class) {
    var isValid = false;
    var $fields = $('input:not(:hidden)' , $(element).closest(grouping_class));
    if ($fields.filter(':filled').length == 0 && this.optional(element)) {
      isValid = true; // None have been filled out, so no error 
    } else {
      var dateArray = new Array();
      dateArray['month'] = $fields.filter("input[name*='[month]']").val();
      dateArray['day'] = $fields.filter("input[name*='[day]']").val();
          
          // correct month value
          dateArray['month'] = dateArray['month'] - 1;

          var testDate = new Date(1970, dateArray['month'], dateArray['day']);
          if (testDate.getDate()!=dateArray['day'] || testDate.getMonth()!=dateArray['month']) {
              isValid = false;
          } else {
              isValid = true;
          }
    }
    return isValid;
  }, "Please enter a valid month and day.");
  // Validate a multifield date
  $.validator.addMethod("mc_date", function(date, element, grouping_class) {
    var isValid = false;
    var $fields = $('input:not(:hidden)' , $(element).closest(grouping_class));
    if ($fields.filter(':filled').length == 0 && this.optional(element)) {
      isValid = true; // None have been filled out, so no error 
    } else {
      var dateArray = new Array();
      dateArray['month'] = $fields.filter("input[name*='[month]']").val();
      dateArray['day'] = $fields.filter("input[name*='[day]']").val();
      dateArray['year'] = $fields.filter("input[name*='[year]']").val();
          
          // correct month value
          dateArray['month'] = dateArray['month'] - 1;

          // correct year value
          if (dateArray['year'].length < 4) {
              dateArray['year'] = (parseInt(dateArray['year']) < 50) ? 2000 + parseInt(dateArray['year']) : 1900 + parseInt(dateArray['year']);
          }

          var testDate = new Date(dateArray['year'], dateArray['month'], dateArray['day']);
          if (testDate.getDate()!=dateArray['day'] || testDate.getMonth()!=dateArray['month'] || testDate.getFullYear()!=dateArray['year']) {
              isValid = false;
          } else {
              isValid = true;
          }
    }
    return isValid;
  }, "Please enter a valid date");

  // Validate a multifield phone number
  $.validator.addMethod("mc_phone", function(phone_number, element, grouping_class) {
    var isValid = false;
    var $fields = $('input:filled:not(:hidden)' , $(element).closest(grouping_class));
    if ($fields.length == 0 && this.optional(element)) {
      isValid = true; // None have been filled out, so no error 
    } else {
      phone_number = $fields.eq(0).val() + $fields.eq(1).val() + $fields.eq(2).val();
      isValid = phone_number.length == 10 && phone_number.match(/[0-9]{9}/);
    }
    return isValid;
  }, "Please specify a valid phone number");

  $.validator.addMethod("skip_or_complete_group", function(value, element, grouping_class) {
    var $fields = $('input:not(:hidden)' , $(element).closest(grouping_class)),
      $fieldsFirst = $fields.eq(0),
      validator = $fieldsFirst.data("valid_skip") ? $fieldsFirst.data("valid_skip") : $.extend({}, this),
      numberFilled = $fields.filter(function() {
        return validator.elementValue(this);
      }).length,
      isValid = numberFilled === 0 || numberFilled === $fields.length;

    // Store the cloned validator for future validation
    $fieldsFirst.data("valid_skip", validator);

    // If element isn't being validated, run each field's validation rules
    if (!$(element).data("being_validated")) {
      $fields.data("being_validated", true);
      $fields.each(function() {
        validator.element(this);
      });
      $fields.data("being_validated", false);
    }
    return isValid;
  }, $.validator.format("Please supply missing fields."));

  $.validator.addMethod("skip_or_fill_minimum", function(value, element, options) {
    var $fields = $(options[1], element.form),
      $fieldsFirst = $fields.eq(0),
      validator = $fieldsFirst.data("valid_skip") ? $fieldsFirst.data("valid_skip") : $.extend({}, this),
      numberFilled = $fields.filter(function() {
        return validator.elementValue(this);
      }).length,
      isValid = numberFilled === 0 || numberFilled >= options[0];
    console.log($fields.eq(0));
    // Store the cloned validator for future validation
    $fieldsFirst.data("valid_skip", validator);

    // If element isn't being validated, run each skip_or_fill_minimum field's validation rules
    if (!$(element).data("being_validated")) {
      $fields.data("being_validated", true);
      $fields.each(function() {
        validator.element(this);
      });
      $fields.data("being_validated", false);
    }
    return isValid;
  }, $.validator.format("Please either skip these fields or fill at least {0} of them."));

  $.validator.addMethod("zipcodeUS", function(value, element) {
    return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
  }, "The specified US ZIP Code is invalid");

}(jQuery));

// MC
(function($) {

  // TODO: Do we actually allow custom error styles or is this legacy code?
  var err_style = '';
  try {
      err_style = mc_custom_error_style;
  } catch(e){
      err_style = '#mc_embed_signup input.mce_inline_error { border-color:#6B0505; } #mc_embed_signup div.mce_inline_error { margin: 0 0 1em 0; padding: 5px 10px; background-color:#6B0505; font-weight: bold; z-index: 1; color:#fff; }';
  }
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = err_style;
  } else {
    style.appendChild(document.createTextNode(err_style));
  }
  head.appendChild(style);

  // Expose extra mc form methods in global var
  window.mc = {

    /**
       *  Open the evil popup   
     */
    openPopup: function() {
      $('#mc_embed_signup a.mc_embed_close').show();
        setTimeout( function(){ $('#mc_embed_signup').fadeIn(); } , mc.delayPopup);
    },
    /**
     *  Close the evil popup
     */
    closePopup: function() {
            $('#mc_embed_signup').hide();
            var now = new Date();
            var expires_date = new Date( now.getTime() + 31536000000 );
            document.cookie = 'MCEvilPopupClosed=yes;expires=' + expires_date.toGMTString()+';path=/';
        },
        /**
     *  Figure out if we should show the evil popup (if they've closed it before, don't show it.)
         */
        evalPopup: function() {
          $('#mc_embed_signup').hide();
        cks = document.cookie.split(';');
        for(i=0; i<cks.length; i++){
            parts = cks[i].split('=');
            if (parts[0].indexOf('MCEvilPopupClosed') != -1) mc.showPopup = false;
        }
        if (mc.showPopup) mc.openPopup();
        },
        /**
     *  Grab the list subscribe url from the form action and make it work for an ajax post.
         */
    getAjaxSubmitUrl: function() {
      var url = $("form#mc-embedded-subscribe-form").attr("action");
      url = url.replace("/post?u=", "/post-json?u=");
      url += "&c=?";
      return url;
    },
    /**
     *  Classify text inputs in the same field group as group for validation purposes.
     *  All this does is tell jQueryValidation to create one error div for the group, rather
     *  than one for each input. Primary use case is birthday and date fields, where we want 
     *  to display errors about the inputs collectively, not individually.
     *
     *  NOTE: Grouping inputs will give you one error div, but you still need to specify where
     *  that div should be displayed. By default, it's inserted after the first input with a
     *  validation error, which can break up a set of inputs. Use the errorPlacement setting in
     *  the validator to control error div placement.
     */
    getGroups: function (){ 
      var groups = {};
      $(".mc-field-group").each(function(index) {
        var inputs = $(this).find("input:text:not(:hidden)"); // TODO: What about non-text inputs like number?
        if (inputs.length > 1) {
          var mergeName = inputs.first().attr("name");
          var fieldNames = $.map(inputs, function(f) { return f.name; });
          groups[mergeName.substring(0, mergeName.indexOf("["))] = fieldNames.join(" ");
        }
      });
      return groups;
    },
    /**
     *  Chick if a field is part of a multipart field
     *  (e.g., A date merge field is composed of individual inputs for month, day and year)
     *  Used in jQuery validation onkeyup method to ensure that we don't evaluate a field
     *  if a user hasn't reached the last input in a multipart field yet.
     */
    isMultiPartField: function(element) {
      return ($('input:not(:hidden)' , $(element).closest(".mc-field-group")).length > 1);
    },
    /**
     *  Checks if the element is the last input in its fieldgroup. 
     *  If the field is not the last in a set of inputs we don't want to validate it on certain events (onfocusout, onblur)
     *  because the user might not be finished yet.
     */
    isTooEarly: function(element) {
      var fields = $('input:not(:hidden)' , $(element).closest(".mc-field-group"));
      return ($(fields).eq(-1).attr('id') != $(element).attr('id'));
    },
    /**
     *  Handle the error/success message after successful form submission.
     *  Success messages are appended to #mce-success-response
     *  Error messages are displayed with the invalid input when possible, or appended to #mce-error-response
     */
    mce_success_cb: function(resp){

        $('#mce-success-response').hide();
        $('#mce-error-response').hide();

        // On successful form submission, display a success message and reset the form
        if (resp.result == "success"){
            $('#mce-'+resp.result+'-response').show();
            $('#mce-'+resp.result+'-response').html(resp.msg);
            $('#mc-embedded-subscribe-form').each(function(){
                this.reset();
          });

        // If the form has errors, display them, inline if possible, or appended to #mce-error-response
        } else {

        // Example errors - Note: You only get one back at a time even if you submit several that are bad. 
        // Error structure - number indicates the index of the merge field that was invalid, then details
        // Object {result: "error", msg: "6 - Please enter the date"} 
        // Object {result: "error", msg: "4 - Please enter a value"} 
        // Object {result: "error", msg: "9 - Please enter a complete address"} 

        // Try to parse the error into a field index and a message.
        // On failure, just put the dump thing into in the msg variable.
            var index = -1;
            var msg;
            try {
                var parts = resp.msg.split(' - ',2);
                if (parts[1]==undefined){
                    msg = resp.msg;
                } else {
                    i = parseInt(parts[0]);
                    if (i.toString() == parts[0]){
                        index = parts[0];
                        msg = parts[1];
                    } else {
                        index = -1;
                        msg = resp.msg;
                    }
                }
            } catch(e){
                index = -1;
                msg = resp.msg;
            }

            try {
              // If index is -1 if means we don't have data on specifically which field was invalid.
              // Just lump the error message into the generic response div.
                if (index == -1){
                    $('#mce-'+resp.result+'-response').show();
                    $('#mce-'+resp.result+'-response').html(msg);      

                } else {
                    var fieldName = $("input[name*='"+fnames[index]+"']").attr('name'); // Make sure this exists (they haven't deleted the fnames array lookup)
                    var data = {};
                    data[fieldName] = msg;
                    mc.mce_validator.showErrors(data);
                }
            } catch(e){
                $('#mce-'+resp.result+'-response').show();
                $('#mce-'+resp.result+'-response').html(msg);
            }
        }
    }
  }

  window.mc.mce_validator = $("#mc-embedded-subscribe-form").validate({

    // Set error HTML: <div class="mce_inline_error"></div>
    errorClass: "mce_inline_error", 
      errorElement: "div", 
    
      // Validate fields on keyup, focusout and blur. 
    onkeyup: false,
    onfocusout: function(element) { 
      if (!mc.isTooEarly(element)) {
        $(element).valid();
      }
    },
    onblur: function(element) { 
      if (!mc.isTooEarly(element)) {
        $(element).valid();
      }
    },
    // Grouping fields makes jQuery Validation display one error for all the fields in the group
    // It doesn't have anything to do with how the fields are validated (together or separately), 
    // it's strictly for visual display of errors
    groups: mc.getGroups(),
    // Place a field's inline error HTML just before the div.mc-field-group closing tag 
    errorPlacement: function(error, element) {
      element.closest('.mc-field-group').append(error);
        },
        // Submit the form via ajax (see: jQuery Form plugin)
    submitHandler: function(form) {
      $(form).ajaxSubmit(mc.ajaxOptions);
    }
  });

  window.mc.ajaxOptions = { 
    url: mc.getAjaxSubmitUrl(), 
    type: 'GET', 
    dataType: 'json', 
    contentType: "application/json; charset=utf-8",
    success: mc.mce_success_cb
  };

  // Custom validation methods for fields with certain css classes
  $.validator.addClassRules("birthday", { digits: true, mc_birthday: ".datefield" });
  $.validator.addClassRules("datepart", { digits: true, mc_date: ".datefield" });
  $.validator.addClassRules("phonepart", { digits: true, mc_phone: ".phonefield" });

  // Evil Popup
  $('#mc_embed_signup a.mc_embed_close').click(function(){ 
    mc.closePopup(); 
  });
  $(document).keydown(function(e){
        keycode = (e == null) ? event.keyCode : e.which;
        if (keycode == 27 && typeof mc.showPopup != 'undefined') mc.closePopup();
    });

}(jQuery));
/*!
 * Salvattore 1.0.5 by @rnmp and @ppold
 * https://github.com/rnmp/salvattore
 */
!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.salvattore=t()}(this,function(){/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),n=document.getElementsByTagName("script")[0],r=null;t.type="text/css",t.id="matchmediajs-test",n.parentNode.insertBefore(t,n),r="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle,e={matchMedium:function(e){var n="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=n:t.textContent=n,"1px"===r.width}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}()),/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
function(){"use strict";if(window.matchMedia&&window.matchMedia("all").addListener)return!1;var e=window.matchMedia,t=e("only all").matches,n=!1,r=0,a=[],i=function(){clearTimeout(r),r=setTimeout(function(){for(var t=0,n=a.length;n>t;t++){var r=a[t].mql,i=a[t].listeners||[],o=e(r.media).matches;if(o!==r.matches){r.matches=o;for(var c=0,l=i.length;l>c;c++)i[c].call(window,r)}}},30)};window.matchMedia=function(r){var o=e(r),c=[],l=0;return o.addListener=function(e){t&&(n||(n=!0,window.addEventListener("resize",i,!0)),0===l&&(l=a.push({mql:o,listeners:c})),c.push(e))},o.removeListener=function(e){for(var t=0,n=c.length;n>t;t++)c[t]===e&&c.splice(t,1)},o}}(),function(){"use strict";for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-e)),a=window.setTimeout(function(){t(n+r)},r);return e=n+r,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),"function"!=typeof window.CustomEvent&&!function(){"use strict";function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}();var e=function(e,t){"use strict";var n={},r=[],a=[],i=[],o=function(e,t,n){e.dataset?e.dataset[t]=n:e.setAttribute("data-"+t,n)};return n.obtainGridSettings=function(t){var n=e.getComputedStyle(t,":before"),r=n.getPropertyValue("content").slice(1,-1),a=r.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/),i=1,o=[];return a?(i=a[1],o=a[2],o=o?o.split("."):["column"]):(a=r.match(/^\s*\.(.+)\s+(\d+)\s*$/),a&&(o=a[1],i=a[2],i&&(i=i.split(".")))),{numberOfColumns:i,columnClasses:o}},n.addColumns=function(e,r){for(var a,i=n.obtainGridSettings(e),c=i.numberOfColumns,l=i.columnClasses,s=new Array(+c),u=t.createDocumentFragment(),d=c;0!==d--;)a="[data-columns] > *:nth-child("+c+"n-"+d+")",s.push(r.querySelectorAll(a));s.forEach(function(e){var n=t.createElement("div"),r=t.createDocumentFragment();n.className=l.join(" "),Array.prototype.forEach.call(e,function(e){r.appendChild(e)}),n.appendChild(r),u.appendChild(n)}),e.appendChild(u),o(e,"columns",c)},n.removeColumns=function(n){var r=t.createRange();r.selectNodeContents(n);var a=Array.prototype.filter.call(r.extractContents().childNodes,function(t){return t instanceof e.HTMLElement}),i=a.length,c=a[0].childNodes.length,l=new Array(c*i);Array.prototype.forEach.call(a,function(e,t){Array.prototype.forEach.call(e.children,function(e,n){l[n*i+t]=e})});var s=t.createElement("div");return o(s,"columns",0),l.filter(function(e){return!!e}).forEach(function(e){s.appendChild(e)}),s},n.recreateColumns=function(t){e.requestAnimationFrame(function(){n.addColumns(t,n.removeColumns(t));var e=new CustomEvent("columnsChange");t.dispatchEvent(e)})},n.mediaQueryChange=function(e){e.matches&&Array.prototype.forEach.call(r,n.recreateColumns)},n.getCSSRules=function(e){var t;try{t=e.sheet.cssRules||e.sheet.rules}catch(n){return[]}return t||[]},n.getStylesheets=function(){return Array.prototype.concat.call(Array.prototype.slice.call(t.querySelectorAll("style[type='text/css']")),Array.prototype.slice.call(t.querySelectorAll("link[rel='stylesheet']")))},n.mediaRuleHasColumnsSelector=function(e){var t,n;try{t=e.length}catch(r){t=0}for(;t--;)if(n=e[t],n.selectorText&&n.selectorText.match(/\[data-columns\](.*)::?before$/))return!0;return!1},n.scanMediaQueries=function(){var t=[];if(e.matchMedia){n.getStylesheets().forEach(function(e){Array.prototype.forEach.call(n.getCSSRules(e),function(e){e.media&&e.cssRules&&n.mediaRuleHasColumnsSelector(e.cssRules)&&t.push(e)})});var r=a.filter(function(e){return-1===t.indexOf(e)});i.filter(function(e){return-1!==r.indexOf(e.rule)}).forEach(function(e){e.mql.removeListener(n.mediaQueryChange)}),i=i.filter(function(e){return-1===r.indexOf(e.rule)}),t.filter(function(e){return-1==a.indexOf(e)}).forEach(function(t){var r=e.matchMedia(t.media.mediaText);r.addListener(n.mediaQueryChange),i.push({rule:t,mql:r})}),a.length=0,a=t}},n.rescanMediaQueries=function(){n.scanMediaQueries(),Array.prototype.forEach.call(r,n.recreateColumns)},n.nextElementColumnIndex=function(e,t){var n,r,a,i=e.children,o=i.length,c=0,l=0;for(a=0;o>a;a++)n=i[a],r=n.children.length+(t[a].children||t[a].childNodes).length,0===c&&(c=r),c>r&&(l=a,c=r);return l},n.createFragmentsList=function(e){for(var n=new Array(e),r=0;r!==e;)n[r]=t.createDocumentFragment(),r++;return n},n.appendElements=function(e,t){var r=e.children,a=r.length,i=n.createFragmentsList(a);Array.prototype.forEach.call(t,function(t){var r=n.nextElementColumnIndex(e,i);i[r].appendChild(t)}),Array.prototype.forEach.call(r,function(e,t){e.appendChild(i[t])})},n.prependElements=function(e,r){var a=e.children,i=a.length,o=n.createFragmentsList(i),c=i-1;r.forEach(function(e){var t=o[c];t.insertBefore(e,t.firstChild),0===c?c=i-1:c--}),Array.prototype.forEach.call(a,function(e,t){e.insertBefore(o[t],e.firstChild)});for(var l=t.createDocumentFragment(),s=r.length%i;0!==s--;)l.appendChild(e.lastChild);e.insertBefore(l,e.firstChild)},n.registerGrid=function(a){if("none"!==e.getComputedStyle(a).display){var i=t.createRange();i.selectNodeContents(a);var c=t.createElement("div");c.appendChild(i.extractContents()),o(c,"columns",0),n.addColumns(a,c),r.push(a)}},n.init=function(){var e=t.createElement("style");e.innerHTML="[data-columns]::before{visibility:hidden;position:absolute;font-size:1px;}",t.head.appendChild(e);var r=t.querySelectorAll("[data-columns]");Array.prototype.forEach.call(r,n.registerGrid),n.scanMediaQueries()},n.init(),{appendElements:n.appendElements,prependElements:n.prependElements,registerGrid:n.registerGrid,recreateColumns:n.recreateColumns,rescanMediaQueries:n.rescanMediaQueries,append_elements:n.appendElements,prepend_elements:n.prependElements,register_grid:n.registerGrid,recreate_columns:n.recreateColumns,rescan_media_queries:n.rescanMediaQueries}}(window,window.document);return e});
/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
( function() {
	var container, button, menu;

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );

	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};
} )();

( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();



jQuery(function($) {
  $(document).ready(function() {


    // Walker Menu Navigation
    var $itemsWithChildren = $('.menu-item-has-children > a');
    var $subMenu = $('.sub-menu');

    $itemsWithChildren.on('click', function(event) {

      event.preventDefault();
      
      $subMenu.each(function() {
        var wrap = $(this);
        wrap.hide();
      });

      $(this).parent().find($subMenu).toggle();
    });



    $('.bxslider').bxSlider({
      video: true,
      useCSS: false
    });




    $('.bxslider-video').bxSlider({
      video: true,
      useCSS: false,
      pager: false,
      controls: true,
      adaptiveHeight: true,
      auto: false,
      nextText: '',
      prevText: '',
      onSliderLoad: function(currentIndex){
        $('.event-slider').css('opacity', '1');
      }
    });


    $('#gotovideo').click(function(event){
      event.preventDefault();
      var slider = $('.bxslider-video').bxSlider();
      
      slider.reloadSlider({
        video: true,
        useCSS: false,
        pager: false,
        controls: true,
        auto: false,
        nextText: '',
        prevText: '',
      });

      var current = slider.getCurrentSlide();
      console.log('current: ' + current);

      var slideQty = slider.getSlideCount();
      console.log('quantity: ' + slideQty);

      slider.goToSlide(slideQty - 1);

    });

    var str=location.href.toLowerCase();
    $(".calendar-filter .cat-item a").each(function() {
      if (str.indexOf(this.href.toLowerCase()) > -1) {
        $(this).parent().addClass("active");
      }
    });
 

    var trigger_in = $('#trigger-in');
    var trigger_out = $('#trigger-out');
    trigger_in.click(function(){
      $('.collapsed').show();
    });
    trigger_out.click(function(){
      $('.collapsed').hide();
    });

  

    // Adapt fontsize of featured title based on word count
    // Font size is 73px by default
    // Set at 50px for 
    var $featured_title = $(".featured-title");
    var $numWords = $featured_title.text().split(" ").length;
    
    if (($numWords >= 10) && ($numWords < 20)) {
        $featured_title.css("font-size", "50px");
        $featured_title.css("line-height", "50px");
    }
    else if ( $numWords >= 20 ) {
        $featured_title.css("font-size", "40px");
        $featured_title.css("line-height", "40px");
    }
    else {
    }

    // Adapt fontsize of featured title based on word count
    // Font size is 73px by default
    // Set at 50px for 
    var $event_title = $(".event-title");
    var $numWordTitle = $event_title.text().split(" ").length;
    
    if (($numWordTitle >= 10) && ($numWordTitle < 20)) {
        $event_title.css("font-size", "65px");
        $event_title.css("line-height", "55px");
    }
    else if ( $numWordTitle >= 20 ) {
        $event_title.css("font-size", "40px");
        $event_title.css("line-height", "40px");
    }
    else {
    }


  });
});
