/**
 * Created by alpuysal on 19/02/16.
 */
function r ( fn ) {
	var done = false, top = true,

		doc               = window.document,
		root              = doc.documentElement,
		modern            = doc.addEventListener,

		add               = modern ? 'addEventListener' : 'attachEvent',
		rem               = modern ? 'removeEventListener' : 'detachEvent',
		pre               = modern ? '' : 'on',

		init              = function ( e ) {
			if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
			(e.type == 'load' ? window : doc)[rem]( pre + e.type, init, false );
			if (!done && (done = true)) fn.call( window, e.type || e );
		},

		poll              = function () {
			try {
				root.doScroll( 'left' );
			} catch (e) {
				setTimeout( poll, 50 );
				return;
			}
			init( 'poll' );
		};

	if (doc.readyState == 'complete') fn.call( window, 'lazy' );
	else {
		if (!modern && root.doScroll) {
			try {
				top = !window.frameElement;
			} catch (e) {
			}
			if (top) poll();
		}
		doc[add]( pre + 'DOMContentLoaded', init, false );
		doc[add]( pre + 'readystatechange', init, false );
		window[add]( pre + 'load', init, false );
	}
}

Number.prototype.format = function ( precision ) {
	if (!isFinite( this )) {
		return this.toString();
	}

	var a = this.toFixed( precision ).split( '.' );

	a[0] = a[0]
		.split( '' ).reverse().join( '' )
		.replace( /\d{3}(?=\d)/g, '$&,' )
		.split( '' ).reverse().join( '' );

	return a.join( '.' );
};

Document.prototype.setCookie = function ( cookieName, cookieValue, expirationDays ) {
	var d = new Date();
	d.setTime( d.getTime() + (expirationDays * 24 * 60 * 60 * 1000) );
	var expires = "expires=" + d.toUTCString();
	document.cookie = cookieName + "=" + cookieValue + "; " + expires;
};

Document.prototype.getCookie = function ( cookieName ) {
	var name = cookieName + "=";
	var ca = document.cookie.split( ';' );
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt( 0 ) == ' ') c = c.substring( 1 );
		if (c.indexOf( name ) == 0) return c.substring( name.length, c.length );
	}
	return null;
};

Document.prototype.randomString = function ( length ) {
	if (!length) length = 12;
	var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var arr = new Array( length );
	return arr.join().split( ',' ).map( function () {
		return s.charAt( Math.floor( Math.random() * s.length ) );
	} ).join( '' );
};

Document.prototype.randomInt = function ( min, max ) {
	if (!min)min = 0;
	if (!max)max = 100;
	return Math.floor( Math.random() * (max - min + 1) ) + min;
};

Document.prototype.querySelecterAllToArray = function ( query ) {
	var elems = document.querySelectorAll( query );
	var array = [];
	for (var i = 0; i < elems.length; i++) {
		if (!!elems[i]) {
			array.push( elems[i] );
		}
	}
	return array;
};

Document.prototype.createPlacehold = function ( width, height, backColor, text, textSize, textColor ) {
	var url = "https://placeholdit.imgix.net/~text?";
	if (!!width) url += "&w=" + width;
	if (!!height) url += "&h=" + height;
	if (!!text) url += "&txt=" + encodeURIComponent( text );
	if (!!textSize) url += "&txtsize=" + textSize;
	if (!!textColor) url += "&txtclr=" + textColor;
	if (!!backColor) url += "&bg=" + backColor;

	return url;
};

HTMLElement.prototype.querySelecterAllToArray = function ( query ) {
	var elems = document.querySelectorAll( query );
	var array = [];
	for (var i = 0; i < elems.length; i++) {
		if (!!elems[i]) {
			array.push( elems[i] );
		}
	}
	return array;
};

HTMLElement.prototype.prependChild = function ( element ) {
	if (!!this.firstChild)
		return this.insertBefore( element, this.firstChild );

	return this.appendChild( element );
};

HTMLElement.prototype.insertAfter = function ( element ) {
	var parent = this.parentNode;
	var sibling = this.nextSibling;
	if (!!sibling && !!parent)return parent.insertBefore( element, sibling );
	if (!!parent)return parent.appendChild( element );
};

HTMLElement.prototype.removeFromParent = function () {
	this.parentNode.removeChild( this );
};

HTMLElement.prototype.removeAllChildren = function () {
	while (this.firstChild) {
		this.removeChild( this.firstChild );
	}
};

HTMLElement.prototype.assignMouseEvents = function ( down, move, end ) {
	var hasTouch = ("ontouchstart" in window);
	var prevX, prevY;
	var that = this;

	/**
	 * @param e TouchEvent
	 * @returns {{x: (Number|number|*), y: (Number|number|*)}}
	 */
	function locationFromEvent ( e ) {
		var x, y;
		if (hasTouch && e.hasOwnProperty( "touches" )) {
			x = e.touches[0].clientX;
			y = e.touches[0].clientY;
		} else {
			x = e.clientX;
			y = e.clientY;
		}
		return {x: x, y: y};
	}

	that.ontouchstart = function ( e ) {
		var xy = locationFromEvent( e );
		prevX = xy.x;
		prevY = xy.y;

		if (!!down)
			down( xy.x, xy.y, prevX, prevY );

		that.ontouchmove = function ( e ) {
			var xy = locationFromEvent( e );

			if (!!move)
				move( xy.x, xy.y, prevX, prevY );

			prevX = xy.x;
			prevY = xy.y;

			e.stopPropagation();
			e.preventDefault();
			return false;
		};

		that.ontouchend = function ( e ) {
			var xy = locationFromEvent( e );

			if (!!end)
				end( xy.x, xy.y, prevX, prevY );

			prevX = xy.x;
			prevY = xy.y;

			that.ontouchmove = null;
			that.ontouchend = null;

			e.stopPropagation();
			e.preventDefault();
			return false;
		};

		e.stopPropagation();
		e.preventDefault();
		return false;
	};

	that.onmousedown = function ( e ) {
		var xy = locationFromEvent( e );
		prevX = xy.x;
		prevY = xy.y;

		if (!!down)
			down( xy.x, xy.y, prevX, prevY );

		that.onmousemove = function ( e ) {
			var xy = locationFromEvent( e );

			if (!!move)
				move( xy.x, xy.y, prevX, prevY );

			prevX = xy.x;
			prevY = xy.y;

			e.stopPropagation();
			e.preventDefault();
			return false;
		};

		that.onmouseup = function ( e ) {
			var xy = locationFromEvent( e );

			if (!!end)
				end( xy.x, xy.y, prevX, prevY );

			prevX = xy.x;
			prevY = xy.y;

			that.onmousemove = null;
			that.onmouseup = null;

			e.stopPropagation();
			e.preventDefault();
			return false;
		};

		e.stopPropagation();
		e.preventDefault();
		return false;
	};
};

HTMLElement.prototype.assignMouseEventsDocument = function ( down, move, end ) {
	var hasTouch = ("ontouchstart" in window);
	var prevX, prevY;
	var that = this;

	/**
	 * @param e TouchEvent
	 * @returns {{x: (Number|number|*), y: (Number|number|*)}}
	 */
	function locationFromEvent ( e ) {
		var x, y;
		if (hasTouch && e.hasOwnProperty( "touches" )) {
			x = e.touches[0].clientX;
			y = e.touches[0].clientY;
		} else {
			x = e.clientX;
			y = e.clientY;
		}
		return {x: x, y: y};
	}

	that.ontouchstart = function ( e ) {
		var xy = locationFromEvent( e );
		prevX = xy.x;
		prevY = xy.y;

		if (!!down)
			down( xy.x, xy.y, prevX, prevY );

		document.ontouchmove = function ( e ) {
			var xy = locationFromEvent( e );

			if (!!move)
				move( xy.x, xy.y, prevX, prevY );

			prevX = xy.x;
			prevY = xy.y;

			e.stopPropagation();
			e.preventDefault();
			return false;
		};

		document.ontouchend = function ( e ) {
			var xy = locationFromEvent( e );

			if (!!end)
				end( xy.x, xy.y, prevX, prevY );

			document.ontouchmove = null;
			document.ontouchend = null;

			e.stopPropagation();
			e.preventDefault();
			return false;
		};

		e.stopPropagation();
		e.preventDefault();
		return false;
	};

	that.onmousedown = function ( e ) {
		var xy = locationFromEvent( e );
		prevX = xy.x;
		prevY = xy.y;

		if (!!down)
			down( xy.x, xy.y, prevX, prevY );

		document.onmousemove = function ( e ) {
			var xy = locationFromEvent( e );

			if (!!move)
				move( xy.x, xy.y, prevX, prevY );

			prevX = xy.x;
			prevY = xy.y;

			e.stopPropagation();
			e.preventDefault();
			return false;
		};

		document.onmouseup = function ( e ) {
			var xy = locationFromEvent( e );

			if (!!end)
				end( xy.x, xy.y, prevX, prevY );

			prevX = xy.x;
			prevY = xy.y;

			document.onmousemove = null;
			document.onmouseup = null;

			e.stopPropagation();
			e.preventDefault();
			return false
		};

		e.stopPropagation();
		e.preventDefault();
		return false;
	};
};

HTMLElement.prototype.getTranslateX = function () {
	var style = this.style;
	var transform = style.transform || style.webkitTransform || style.mozTransform;
	if (!transform) return '0';
	var zT = transform.match( /translateX\((.*[0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/ );
	return zT ? zT[1] : '0';
};

HTMLElement.prototype.getTranslateY = function () {
	var style = this.style;
	var transform = style.transform || style.webkitTransform || style.mozTransform;
	if (!transform) return '0';
	var zT = transform.match( /translateY\((.*[0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/ );
	return zT ? zT[1] : '0';
};

HTMLElement.prototype.transformSelect = function () {
	var el = this;
	var retVal = "transform";
	if (el.style.webkitTransform)retVal = "webkitTransform";
	if (el.style.WebkitTransform)retVal = "WebkitTransform";
	if (el.style.OTransform)retVal = "OTransform";
	if (el.style.MozTransform)retVal = "MozTransform";
	return retVal;
};

HTMLElement.prototype.transitionSelect = function () {
	var el = this;
	var retVal = "transition";
	if (el.style.webkitTransition)retVal = "webkitTransition";
	if (el.style.WebkitTransition)retVal = "WebkitTransition";
	if (el.style.OTransition)retVal = "OTransition";
	if (el.style.MozTransition)retVal = "MozTransition";
	return retVal;
};

HTMLElement.prototype.findClosestParentByClass = function ( className ) {
	var el = this;
	while ((el = el.parentElement) && !el.classList.contains( className ));
	return el;
};

HTMLElement.prototype.removeAllAttributes = function () {
	while (this.attributes.length > 0) {
		this.removeAttribute( this.attributes[0].name );
	}

	var nodes = this.childNodes;
	if (nodes.length) {
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.nodeType == 1)
				node.removeAllAttributes();
		}
	}
};

HTMLElement.prototype.setAttributes = function () {
	if (!(arguments && arguments.length))
		throw new Error( "Specify a single object, or multiple strings." );

	//<editor-fold desc="Object argument">
	{
		if (arguments.length == 1) {
			var obj = arguments[0];
			if (typeof obj !== "object")
				throw new Error( "Single argument must be a key value object" );

			for (var k in obj)
				if (obj.hasOwnProperty( k ))this.setAttribute( k, obj[k] );

			return;
		}
	}
	//</editor-fold>

	//<editor-fold desc="String list argument">
	{
		if (!(arguments.length % 2 == 0))
			throw new Error( "Argument count is odd numbered." );

		for (var i = 0; i < arguments.length; i += 2)
			this.setAttribute( arguments[i], arguments[i + 1] );
	}
	//</editor-fold>
};

HTMLElement.prototype.hasClass = function ( cls ) {
	if (this.className) {
		return this.className.match( new RegExp( '(\\s|^)' + cls + '(\\s|$)' ) );
	}
	return false;
};

HTMLElement.prototype.resizeTextArea = function () {
	if (this.tagName.toLowerCase() == 'textarea') {
		this.style.height = "1px";
		this.style.height = (15 + this.scrollHeight) + "px";
	}
};

Array.prototype.randomElement = function () {
	return this[Math.floor( Math.random() * this.length )]
};

Array.prototype.clone = function () {
	return this.slice( 0 );
};

Array.prototype.contains = function ( obj ) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
};

Array.prototype.position = function ( obj ) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return i;
		}
	}
	return -1;
};

Array.prototype.remove = function ( obj ) {
	for (var i = this.length; i--;) {
		if (this[i] === obj) {
			this.splice( i, 1 );
		}
	}
};

Array.prototype.moveToEnd = function ( oldObject ) {
	var oldIndex = this.position( oldObject );
	var newIndex = this.length - 1;

	if (newIndex >= this.length) {
		var k = newIndex - this.length;
		while ((k--) + 1) {
			this.push( undefined );
		}
	}
	this.splice( newIndex, 0, this.splice( oldIndex, 1 )[0] );
};

Array.prototype.moveToFront = function ( oldObject ) {
	var oldIndex = this.position( oldObject );
	var newIndex = 0;

	if (newIndex >= this.length) {
		var k = newIndex - this.length;
		while ((k--) + 1) {
			this.push( undefined );
		}
	}
	this.splice( newIndex, 0, this.splice( oldIndex, 1 )[0] );
};

Array.prototype.sortByKey = function ( key, desc ) {
	if (!desc) desc = false;
	return this.sort( function ( a, b ) {
		var x = a[key];
		var y = b[key];
		if (desc)
			return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * -1;
		else
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	} );
};

String.prototype.replaceAll = function ( find, replace ) {
	function safeRegexEscape ( str ) {
		return str.replace( /([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1" );
	}

	return this.replace( new RegExp( safeRegexEscape( find ), 'g' ), replace );
};

String.prototype.language = function () {
	function safeRegexEscape ( str ) {
		return str.replace( /([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1" );
	}

	var current = this;
	for (var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		current = current.replace( new RegExp( safeRegexEscape( "%%" ) ), arg );
	}
	return current;
};

String.prototype.contains = function ( string ) {
	return this.toLowerCase().indexOf( string.toLowerCase() ) >= 0;
};

String.prototype.stripTags = function ( allowed ) {
	allowed = (((allowed || '') + '').toLowerCase().match( /<[a-z][a-z0-9]*>/g ) || []).join( '' );

	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
	var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

	return this.replace( commentsAndPhpTags, '' )
		.replace( tags, function ( $0, $1 ) {
			return allowed.indexOf( '<' + $1.toLowerCase() + '>' ) > -1 ? $0 : '';
		} );
};

String.prototype.capitalize = function () {
	return this.replace( /\w\S*/g, function ( txt ) {
		return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase();
	} );
};

XMLHttpRequest.prototype.sendWithToken = function ( data, isjson ) {
	this.setRequestHeader( 'token', document.getCookie( 'token' ) );
	if (!data) data = {};
	if (typeof isjson === 'undefined') {
		this.setRequestHeader( 'Content-Type', 'application/json; charset=utf-8' );
		this.send( JSON.stringify( data ) );
	} else {
		this.send( data );
	}
};