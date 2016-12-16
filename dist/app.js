/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by Administrator on 2016/12/16.
	 */
	var user_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./struct/user\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var ajax_1 = __webpack_require__(1);
	__webpack_require__(18);
	__webpack_require__(19);
	// function getX<T>():
	// console.log(ajax.get('./data/rxjs-ajax.json')
	//     .map(res =>{return res.response;}));
	// ajax.get('./data/rxjs-ajax.json')
	//     .map(res =>{return res.response;})
	//     .subscribe(data =>{
	//         let users:User[] = <User[]>(data)
	//         console.log(users[0]);
	//         // console.log( users[0] instanceof User);
	//     });
	var Users = (function () {
	    function Users() {
	    }
	    Users.prototype.getUsers = function (url) {
	        return ajax_1.ajax.get(url)
	            .map(function (res) { return (res.response); });
	        // .subscribe(data =>{
	        //     let users:User[] = <User[]>(data.response)
	        //     console.log(users[0]);
	        //     // console.log( users[0] instanceof User);
	        // });
	    };
	    return Users;
	}());
	exports.Users = Users;
	var users = new Users;
	var url = './data/rxjs-ajax.json';
	users.getUsers(url).subscribe(function (data) {
	    alert(data[0] instanceof user_1.User);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AjaxObservable_1 = __webpack_require__(2);
	exports.ajax = AjaxObservable_1.AjaxObservable.create;
	//# sourceMappingURL=ajax.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(3);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(5);
	var Observable_1 = __webpack_require__(6);
	var Subscriber_1 = __webpack_require__(8);
	var map_1 = __webpack_require__(17);
	function getCORSRequest() {
	    if (root_1.root.XMLHttpRequest) {
	        var xhr = new root_1.root.XMLHttpRequest();
	        if ('withCredentials' in xhr) {
	            xhr.withCredentials = !!this.withCredentials;
	        }
	        return xhr;
	    }
	    else if (!!root_1.root.XDomainRequest) {
	        return new root_1.root.XDomainRequest();
	    }
	    else {
	        throw new Error('CORS is not supported by your browser');
	    }
	}
	function getXMLHttpRequest() {
	    if (root_1.root.XMLHttpRequest) {
	        return new root_1.root.XMLHttpRequest();
	    }
	    else {
	        var progId = void 0;
	        try {
	            var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
	            for (var i = 0; i < 3; i++) {
	                try {
	                    progId = progIds[i];
	                    if (new root_1.root.ActiveXObject(progId)) {
	                        break;
	                    }
	                }
	                catch (e) {
	                }
	            }
	            return new root_1.root.ActiveXObject(progId);
	        }
	        catch (e) {
	            throw new Error('XMLHttpRequest is not supported by your browser');
	        }
	    }
	}
	function ajaxGet(url, headers) {
	    if (headers === void 0) { headers = null; }
	    return new AjaxObservable({ method: 'GET', url: url, headers: headers });
	}
	exports.ajaxGet = ajaxGet;
	;
	function ajaxPost(url, body, headers) {
	    return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
	}
	exports.ajaxPost = ajaxPost;
	;
	function ajaxDelete(url, headers) {
	    return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
	}
	exports.ajaxDelete = ajaxDelete;
	;
	function ajaxPut(url, body, headers) {
	    return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
	}
	exports.ajaxPut = ajaxPut;
	;
	function ajaxGetJSON(url, headers) {
	    return new AjaxObservable({ method: 'GET', url: url, responseType: 'json', headers: headers })
	        .lift(new map_1.MapOperator(function (x, index) { return x.response; }, null));
	}
	exports.ajaxGetJSON = ajaxGetJSON;
	;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var AjaxObservable = (function (_super) {
	    __extends(AjaxObservable, _super);
	    function AjaxObservable(urlOrRequest) {
	        _super.call(this);
	        var request = {
	            async: true,
	            createXHR: function () {
	                return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
	            },
	            crossDomain: false,
	            withCredentials: false,
	            headers: {},
	            method: 'GET',
	            responseType: 'json',
	            timeout: 0
	        };
	        if (typeof urlOrRequest === 'string') {
	            request.url = urlOrRequest;
	        }
	        else {
	            for (var prop in urlOrRequest) {
	                if (urlOrRequest.hasOwnProperty(prop)) {
	                    request[prop] = urlOrRequest[prop];
	                }
	            }
	        }
	        this.request = request;
	    }
	    AjaxObservable.prototype._subscribe = function (subscriber) {
	        return new AjaxSubscriber(subscriber, this.request);
	    };
	    /**
	     * Creates an observable for an Ajax request with either a request object with
	     * url, headers, etc or a string for a URL.
	     *
	     * @example
	     * source = Rx.Observable.ajax('/products');
	     * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
	     *
	     * @param {string|Object} request Can be one of the following:
	     *   A string of the URL to make the Ajax call.
	     *   An object with the following properties
	     *   - url: URL of the request
	     *   - body: The body of the request
	     *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
	     *   - async: Whether the request is async
	     *   - headers: Optional headers
	     *   - crossDomain: true if a cross domain request, else false
	     *   - createXHR: a function to override if you need to use an alternate
	     *   XMLHttpRequest implementation.
	     *   - resultSelector: a function to use to alter the output value type of
	     *   the Observable. Gets {@link AjaxResponse} as an argument.
	     * @return {Observable} An observable sequence containing the XMLHttpRequest.
	     * @static true
	     * @name ajax
	     * @owner Observable
	    */
	    AjaxObservable.create = (function () {
	        var create = function (urlOrRequest) {
	            return new AjaxObservable(urlOrRequest);
	        };
	        create.get = ajaxGet;
	        create.post = ajaxPost;
	        create.delete = ajaxDelete;
	        create.put = ajaxPut;
	        create.getJSON = ajaxGetJSON;
	        return create;
	    })();
	    return AjaxObservable;
	}(Observable_1.Observable));
	exports.AjaxObservable = AjaxObservable;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AjaxSubscriber = (function (_super) {
	    __extends(AjaxSubscriber, _super);
	    function AjaxSubscriber(destination, request) {
	        _super.call(this, destination);
	        this.request = request;
	        this.done = false;
	        var headers = request.headers = request.headers || {};
	        // force CORS if requested
	        if (!request.crossDomain && !headers['X-Requested-With']) {
	            headers['X-Requested-With'] = 'XMLHttpRequest';
	        }
	        // ensure content type is set
	        if (!('Content-Type' in headers) && !(root_1.root.FormData && request.body instanceof root_1.root.FormData) && typeof request.body !== 'undefined') {
	            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	        }
	        // properly serialize body
	        request.body = this.serializeBody(request.body, request.headers['Content-Type']);
	        this.send();
	    }
	    AjaxSubscriber.prototype.next = function (e) {
	        this.done = true;
	        var _a = this, xhr = _a.xhr, request = _a.request, destination = _a.destination;
	        var response = new AjaxResponse(e, xhr, request);
	        destination.next(response);
	    };
	    AjaxSubscriber.prototype.send = function () {
	        var _a = this, request = _a.request, _b = _a.request, user = _b.user, method = _b.method, url = _b.url, async = _b.async, password = _b.password, headers = _b.headers, body = _b.body;
	        var createXHR = request.createXHR;
	        var xhr = tryCatch_1.tryCatch(createXHR).call(request);
	        if (xhr === errorObject_1.errorObject) {
	            this.error(errorObject_1.errorObject.e);
	        }
	        else {
	            this.xhr = xhr;
	            // open XHR first
	            var result = void 0;
	            if (user) {
	                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
	            }
	            else {
	                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
	            }
	            if (result === errorObject_1.errorObject) {
	                this.error(errorObject_1.errorObject.e);
	                return null;
	            }
	            // timeout and responseType can be set once the XHR is open
	            xhr.timeout = request.timeout;
	            xhr.responseType = request.responseType;
	            // set headers
	            this.setHeaders(xhr, headers);
	            // now set up the events
	            this.setupEvents(xhr, request);
	            // finally send the request
	            result = body ? tryCatch_1.tryCatch(xhr.send).call(xhr, body) : tryCatch_1.tryCatch(xhr.send).call(xhr);
	            if (result === errorObject_1.errorObject) {
	                this.error(errorObject_1.errorObject.e);
	                return null;
	            }
	        }
	        return xhr;
	    };
	    AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
	        if (!body || typeof body === 'string') {
	            return body;
	        }
	        else if (root_1.root.FormData && body instanceof root_1.root.FormData) {
	            return body;
	        }
	        if (contentType) {
	            var splitIndex = contentType.indexOf(';');
	            if (splitIndex !== -1) {
	                contentType = contentType.substring(0, splitIndex);
	            }
	        }
	        switch (contentType) {
	            case 'application/x-www-form-urlencoded':
	                return Object.keys(body).map(function (key) { return (encodeURI(key) + "=" + encodeURI(body[key])); }).join('&');
	            case 'application/json':
	                return JSON.stringify(body);
	            default:
	                return body;
	        }
	    };
	    AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
	        for (var key in headers) {
	            if (headers.hasOwnProperty(key)) {
	                xhr.setRequestHeader(key, headers[key]);
	            }
	        }
	    };
	    AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
	        var progressSubscriber = request.progressSubscriber;
	        function xhrTimeout(e) {
	            var _a = xhrTimeout, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
	            if (progressSubscriber) {
	                progressSubscriber.error(e);
	            }
	            subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
	        }
	        ;
	        xhr.ontimeout = xhrTimeout;
	        xhrTimeout.request = request;
	        xhrTimeout.subscriber = this;
	        xhrTimeout.progressSubscriber = progressSubscriber;
	        if (xhr.upload && 'withCredentials' in xhr && root_1.root.XDomainRequest) {
	            if (progressSubscriber) {
	                var xhrProgress_1;
	                xhrProgress_1 = function (e) {
	                    var progressSubscriber = xhrProgress_1.progressSubscriber;
	                    progressSubscriber.next(e);
	                };
	                xhr.onprogress = xhrProgress_1;
	                xhrProgress_1.progressSubscriber = progressSubscriber;
	            }
	            var xhrError_1;
	            xhrError_1 = function (e) {
	                var _a = xhrError_1, progressSubscriber = _a.progressSubscriber, subscriber = _a.subscriber, request = _a.request;
	                if (progressSubscriber) {
	                    progressSubscriber.error(e);
	                }
	                subscriber.error(new AjaxError('ajax error', this, request));
	            };
	            xhr.onerror = xhrError_1;
	            xhrError_1.request = request;
	            xhrError_1.subscriber = this;
	            xhrError_1.progressSubscriber = progressSubscriber;
	        }
	        function xhrReadyStateChange(e) {
	            var _a = xhrReadyStateChange, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
	            if (this.readyState === 4) {
	                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
	                var status_1 = this.status === 1223 ? 204 : this.status;
	                var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
	                // fix status code when it is 0 (0 status is undocumented).
	                // Occurs when accessing file resources or on Android 4.1 stock browser
	                // while retrieving files from application cache.
	                if (status_1 === 0) {
	                    status_1 = response ? 200 : 0;
	                }
	                if (200 <= status_1 && status_1 < 300) {
	                    if (progressSubscriber) {
	                        progressSubscriber.complete();
	                    }
	                    subscriber.next(e);
	                    subscriber.complete();
	                }
	                else {
	                    if (progressSubscriber) {
	                        progressSubscriber.error(e);
	                    }
	                    subscriber.error(new AjaxError('ajax error ' + status_1, this, request));
	                }
	            }
	        }
	        ;
	        xhr.onreadystatechange = xhrReadyStateChange;
	        xhrReadyStateChange.subscriber = this;
	        xhrReadyStateChange.progressSubscriber = progressSubscriber;
	        xhrReadyStateChange.request = request;
	    };
	    AjaxSubscriber.prototype.unsubscribe = function () {
	        var _a = this, done = _a.done, xhr = _a.xhr;
	        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
	            xhr.abort();
	        }
	        _super.prototype.unsubscribe.call(this);
	    };
	    return AjaxSubscriber;
	}(Subscriber_1.Subscriber));
	exports.AjaxSubscriber = AjaxSubscriber;
	/**
	 * A normalized AJAX response.
	 *
	 * @see {@link ajax}
	 *
	 * @class AjaxResponse
	 */
	var AjaxResponse = (function () {
	    function AjaxResponse(originalEvent, xhr, request) {
	        this.originalEvent = originalEvent;
	        this.xhr = xhr;
	        this.request = request;
	        this.status = xhr.status;
	        this.responseType = xhr.responseType || request.responseType;
	        switch (this.responseType) {
	            case 'json':
	                if ('response' in xhr) {
	                    //IE does not support json as responseType, parse it internally
	                    this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
	                }
	                else {
	                    this.response = JSON.parse(xhr.responseText || 'null');
	                }
	                break;
	            case 'xml':
	                this.response = xhr.responseXML;
	                break;
	            case 'text':
	            default:
	                this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
	                break;
	        }
	    }
	    return AjaxResponse;
	}());
	exports.AjaxResponse = AjaxResponse;
	/**
	 * A normalized AJAX error.
	 *
	 * @see {@link ajax}
	 *
	 * @class AjaxError
	 */
	var AjaxError = (function (_super) {
	    __extends(AjaxError, _super);
	    function AjaxError(message, xhr, request) {
	        _super.call(this, message);
	        this.message = message;
	        this.xhr = xhr;
	        this.request = request;
	        this.status = xhr.status;
	    }
	    return AjaxError;
	}(Error));
	exports.AjaxError = AjaxError;
	/**
	 * @see {@link ajax}
	 *
	 * @class AjaxTimeoutError
	 */
	var AjaxTimeoutError = (function (_super) {
	    __extends(AjaxTimeoutError, _super);
	    function AjaxTimeoutError(xhr, request) {
	        _super.call(this, 'ajax timeout', xhr, request);
	    }
	    return AjaxTimeoutError;
	}(AjaxError));
	exports.AjaxTimeoutError = AjaxTimeoutError;
	//# sourceMappingURL=AjaxObservable.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	/**
	 * window: browser in DOM main thread
	 * self: browser in WebWorker
	 * global: Node.js/other
	 */
	exports.root = (typeof window == 'object' && window.window === window && window
	    || typeof self == 'object' && self.self === self && self
	    || typeof global == 'object' && global.global === global && global);
	if (!exports.root) {
	    throw new Error('RxJS could not find any global context (window, self, global)');
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var errorObject_1 = __webpack_require__(5);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(3);
	var toSubscriber_1 = __webpack_require__(7);
	var observable_1 = __webpack_require__(16);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this.source);
	        }
	        else {
	            sink.add(this._subscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable_1.$$observable] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subscriber_1 = __webpack_require__(8);
	var rxSubscriber_1 = __webpack_require__(15);
	var Observer_1 = __webpack_require__(14);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1.Subscriber(Observer_1.empty);
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(9);
	var Subscription_1 = __webpack_require__(10);
	var Observer_1 = __webpack_require__(14);
	var rxSubscriber_1 = __webpack_require__(15);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(11);
	var isObject_1 = __webpack_require__(12);
	var isFunction_1 = __webpack_require__(9);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(5);
	var UnsubscriptionError_1 = __webpack_require__(13);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.closed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `closed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === Subscription.EMPTY)) {
	            return Subscription.EMPTY;
	        }
	        if (teardown === this) {
	            return this;
	        }
	        var sub = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.closed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.closed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.closed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ?
	            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error));
	exports.UnsubscriptionError = UnsubscriptionError;
	//# sourceMappingURL=UnsubscriptionError.js.map

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	exports.empty = {
	    closed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};
	//# sourceMappingURL=Observer.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(3);
	var Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(3);
	function getSymbolObservable(context) {
	    var $$observable;
	    var Symbol = context.Symbol;
	    if (typeof Symbol === 'function') {
	        if (Symbol.observable) {
	            $$observable = Symbol.observable;
	        }
	        else {
	            $$observable = Symbol('observable');
	            Symbol.observable = $$observable;
	        }
	    }
	    else {
	        $$observable = '@@observable';
	    }
	    return $$observable;
	}
	exports.getSymbolObservable = getSymbolObservable;
	exports.$$observable = getSymbolObservable(root_1.root);
	//# sourceMappingURL=observable.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(8);
	/**
	 * Applies a given `project` function to each value emitted by the source
	 * Observable, and emits the resulting values as an Observable.
	 *
	 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
	 * it passes each source value through a transformation function to get
	 * corresponding output values.</span>
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the output
	 * Observable.
	 *
	 * @example <caption>Map every every click to the clientX position of that click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks.map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link mapTo}
	 * @see {@link pluck}
	 *
	 * @param {function(value: T, index: number): R} project The function to apply
	 * to each `value` emitted by the source Observable. The `index` parameter is
	 * the number `i` for the i-th emission that has happened since the
	 * subscription, starting from the number `0`.
	 * @param {any} [thisArg] An optional argument to define what `this` is in the
	 * `project` function.
	 * @return {Observable<R>} An Observable that emits the values from the source
	 * Observable transformed by the given `project` function.
	 * @method map
	 * @owner Observable
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}
	exports.map = map;
	var MapOperator = (function () {
	    function MapOperator(project, thisArg) {
	        this.project = project;
	        this.thisArg = thisArg;
	    }
	    MapOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
	    };
	    return MapOperator;
	}());
	exports.MapOperator = MapOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapSubscriber = (function (_super) {
	    __extends(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.count = 0;
	        this.thisArg = thisArg || this;
	    }
	    // NOTE: This looks unoptimized, but it's actually purposefully NOT
	    // using try/catch optimizations.
	    MapSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.project.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return MapSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=map.js.map

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(6);
	var map_1 = __webpack_require__(17);
	Observable_1.Observable.prototype.map = map_1.map;
	//# sourceMappingURL=map.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(20);
	__webpack_require__(40);
	__webpack_require__(66);
	__webpack_require__(70);
	module.exports = __webpack_require__(39).Promise;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(21)
	  , test    = {};
	test[__webpack_require__(23)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(27)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(22)
	  , TAG = __webpack_require__(23)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(24)('wks')
	  , uid        = __webpack_require__(26)
	  , Symbol     = __webpack_require__(25).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(25)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 26 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(25)
	  , hide      = __webpack_require__(28)
	  , has       = __webpack_require__(38)
	  , SRC       = __webpack_require__(26)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	__webpack_require__(39).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(29)
	  , createDesc = __webpack_require__(37);
	module.exports = __webpack_require__(33) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(30)
	  , IE8_DOM_DEFINE = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(36)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(33) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(31);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(33) && !__webpack_require__(34)(function(){
	  return Object.defineProperty(__webpack_require__(35)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(34)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(31)
	  , document = __webpack_require__(25).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(31);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(41)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(44)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , defined   = __webpack_require__(43);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(45)
	  , $export        = __webpack_require__(46)
	  , redefine       = __webpack_require__(27)
	  , hide           = __webpack_require__(28)
	  , has            = __webpack_require__(38)
	  , Iterators      = __webpack_require__(49)
	  , $iterCreate    = __webpack_require__(50)
	  , setToStringTag = __webpack_require__(63)
	  , getPrototypeOf = __webpack_require__(64)
	  , ITERATOR       = __webpack_require__(23)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(25)
	  , core      = __webpack_require__(39)
	  , hide      = __webpack_require__(28)
	  , redefine  = __webpack_require__(27)
	  , ctx       = __webpack_require__(47)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(48);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(51)
	  , descriptor     = __webpack_require__(37)
	  , setToStringTag = __webpack_require__(63)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(28)(IteratorPrototype, __webpack_require__(23)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(30)
	  , dPs         = __webpack_require__(52)
	  , enumBugKeys = __webpack_require__(61)
	  , IE_PROTO    = __webpack_require__(60)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(35)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(62).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(29)
	  , anObject = __webpack_require__(30)
	  , getKeys  = __webpack_require__(53);

	module.exports = __webpack_require__(33) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(54)
	  , enumBugKeys = __webpack_require__(61);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(38)
	  , toIObject    = __webpack_require__(55)
	  , arrayIndexOf = __webpack_require__(57)(false)
	  , IE_PROTO     = __webpack_require__(60)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(56)
	  , defined = __webpack_require__(43);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(22);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(55)
	  , toLength  = __webpack_require__(58)
	  , toIndex   = __webpack_require__(59);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(42)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(24)('keys')
	  , uid    = __webpack_require__(26);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25).document && document.documentElement;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(29).f
	  , has = __webpack_require__(38)
	  , TAG = __webpack_require__(23)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(38)
	  , toObject    = __webpack_require__(65)
	  , IE_PROTO    = __webpack_require__(60)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(43);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(67)
	  , redefine      = __webpack_require__(27)
	  , global        = __webpack_require__(25)
	  , hide          = __webpack_require__(28)
	  , Iterators     = __webpack_require__(49)
	  , wks           = __webpack_require__(23)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(68)
	  , step             = __webpack_require__(69)
	  , Iterators        = __webpack_require__(49)
	  , toIObject        = __webpack_require__(55);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(44)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(23)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(28)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(45)
	  , global             = __webpack_require__(25)
	  , ctx                = __webpack_require__(47)
	  , classof            = __webpack_require__(21)
	  , $export            = __webpack_require__(46)
	  , isObject           = __webpack_require__(31)
	  , aFunction          = __webpack_require__(48)
	  , anInstance         = __webpack_require__(71)
	  , forOf              = __webpack_require__(72)
	  , speciesConstructor = __webpack_require__(76)
	  , task               = __webpack_require__(77).set
	  , microtask          = __webpack_require__(79)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(23)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(80)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(63)($Promise, PROMISE);
	__webpack_require__(81)(PROMISE);
	Wrapper = __webpack_require__(39)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(82)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(47)
	  , call        = __webpack_require__(73)
	  , isArrayIter = __webpack_require__(74)
	  , anObject    = __webpack_require__(30)
	  , toLength    = __webpack_require__(58)
	  , getIterFn   = __webpack_require__(75)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(30);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(49)
	  , ITERATOR   = __webpack_require__(23)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(21)
	  , ITERATOR  = __webpack_require__(23)('iterator')
	  , Iterators = __webpack_require__(49);
	module.exports = __webpack_require__(39).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(30)
	  , aFunction = __webpack_require__(48)
	  , SPECIES   = __webpack_require__(23)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(47)
	  , invoke             = __webpack_require__(78)
	  , html               = __webpack_require__(62)
	  , cel                = __webpack_require__(35)
	  , global             = __webpack_require__(25)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(22)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(25)
	  , macrotask = __webpack_require__(77).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(22)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(27);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(25)
	  , dP          = __webpack_require__(29)
	  , DESCRIPTORS = __webpack_require__(33)
	  , SPECIES     = __webpack_require__(23)('species');

	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(23)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ }
/******/ ]);