(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"米悠","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 115:
/*!**********************************************!*\
  !*** D:/项目文件/米悠/static/images/medium/zm.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUQAAAEXCAYAAADV8D2fAAAAAXNSR0IArs4c6QAAHVNJREFUeF7tnVuMJNdZgM+pqp6emZ2d9a69duxdr7BNIAlro2QTFBLlIVJeEISLECGKopAXrk88EIEigQQPkSKMlDcECCkIIqEggaIkBiVGkUBAJDsOdsAgFGfj3Y0ve5nrTk/3dF3Q3+varWn37Ex3n2v3d6zRrHa7zvnr+6s/n1Pn1CmtRpSqqvR/qK2TK6p9T6X6y5VKWolSyajP8ncQgAAEQidQKlVqVfa1anVuqt7GT6rVda11NRy3Hv6Lf602Tp5Q2Vml9ELoJ0l8EIAABCYjUO1tqvzKB/Q9683j9wnxO1Xn4UpV90/WAEdBAAIQiIuAVvrq43r5ch31bSEiw7gSSbQQgIAZAk0pDoR4a5jcetRM9dQCAQhAIDYC/e89oe9Z1zKB8h21c557hrElkHghAAFzBKq9x9Wx/9L/Xm2eWlHZI+YqpiYIQAAC8RG4qfKL+oWq+6hSxcn4widiCEAAAiYJpOv6+Wr7vFZJ22S11AUBCEAgNgKVKnv6P6udd7LoOrbUES8EIGCawGDx9gvVzgXTFVMfBCAAgRgJIMQYs0bMEICAFQII0QpWKoUABGIkgBBjzBoxQwACVgggRCtYqRQCEIiRAEKMMWvEDAEIWCGAEK1gpVIIQCBGAggxxqwRMwQgYIUAQrSClUohAIEYCSDEGLNGzBCAgBUCCNEKViqFAARiJIAQY8waMUMAAlYIIEQrWKkUAhCIkQBCjDFrxAwBCFghgBCtYKVSCEAgRgIIMcasETMEIGCFAEK0gpVKIQCBGAkgxBizRswQgIAVAlEI8TPfevpZk2f/6QsferfJ+qgLArNKYN6+ewhxVq9kzgsCBgggRAMQTVcxb0kxzY/6IDApgXn77kXXQ2S4O+mlzXEQ8EOgKdXQv78I0c81QqsQmBsCCNFwqmMCavjUqQ4C0ROI6ftLDzH6y40TgEDYBBCi4fzEBNTwqVMdBKInENP3lx5i9JcbJwCBsAkgRMP5iQmo4VOnOghETyCm7y89xOgvN04AAmETQIiG8+MSaK762nD4VAeBoAlkqlXZDNDl93fa85j7HmJTgLqfI8NpryiOj5JA1cpuS9G0IBGi4UvCBtBahE0J6ryvtRIptpQa/KZAYJYJiAT7qsqyqmr0Ems5mhKjje+vrazMZQ+xKcM7EtRa57ckKJKU/+TPrSyzxZ56IeCNQD/PVZZlleorVS2JEEWO8ruqquzWENqUGBGi4TSbBLpPhqqvdV4kIsIi7yZaaa2V0jrvaVUorYZcqPOCXqPh3FKdGwJVlr75PmGlBn9XZu0yU2lVZlkpvUWlqqrMlspaitP2FE1+f23TmqseYlOGSb6biPsSEWFeJKWIseglZbGXqELrLFWqKO4IUDf+bDsp1A8BWwSq9I4Y0zStclVV8rvMFsqqSss0a5cDMS4ulqXKjEgRIRrOpimgIkQZDus3eoZlt5smqpckvb30oWMPvev48omfz5KFJ7TWJwyfAtVBIEgClar2qqp4qdPt/POV7Ytf7uuFbqnSMllsF1WWltJTnHbobOr76wLg3PQQb8twMHFSJNIzLPNe2trttR+97+2/3V5Y/GkXwGkDAqESKKvy+69svPz7672bl5P2Ql5mi2UpYlStSqQ46dAZIRrOuAmgtRBlqCxD5CTvpVWvk7311Nt+BxkaThjVRUugrMrXL1777m90dG9NLy7fkmK2WCDEaFM6OvA7QuymZfdmmuZlembx3nefOn7/n8zYqXI6EJiKwF7e++r/Xf+fJ4v2cp5k7cJEL3GqgBweHMWQ2QSPoi89w76WnqEMldNeJ/vR02//o1ba/oCJ+qkDArNCoKqq/ktXX/zFzoLeSKp2US61i/pe4qTD5ljYzIUQh4fLVd7LVGej9fhD7/l7JlBiuVSJ0yWBG9uv/d4rO9e+WbQX8mRxpZh22Owy9mnamjMh5kmyezOtik5W7XZbT5x7z9PTwONYCMwqge3d9c++vPnyP8mwWS8ek3uJU91HjIXTnAnxjfuHvb0sLbrZO84gxFguVOJ0S2B7d/3Jlzdf/mqRLud65VheqbQsl5ZKhsxu82CltTdNqBR7merstB4/996vW2mQSiEQOYHt3bUnL61dfCpfPt6XNYmlknuJCDHytN4KvynENO+mZa+DEGcis5yELQIDIW5efKpIlwY9xFJmm1sI0RZvp/UiRKe4aWwGCIgQL659/x/VwmIfIc5AQpunMEqIentr4fwj7//ajJ0qpwMBIwQQohGMYVYyLMRqZ7uldndaCDHMfBGVfwII0X8OrEWAEK2hpeIZJYAQZzSxoyZV6CHOcLI5NSMEEKIRjGFWQg8xzLwQVbgEEGK4uZk6MoQ4NUIqmDMCCHGGE44QZzi5AZxaVVUqz3PZYV2VZSlvJbkdVZIkSn7SNB38DF5SEUFBiBEkadIQbQrx6tWrqtvtjh3aysqKOnXq1L7j5AvV6XTGrsvHAfIlP3bsmI+mvbe5t7c3yLn89Pv9gQyPUkSGrVZLLSwsqMXFxcGPSDLEghBDzIqhmGwK8ZlnnlHXrl0bO9Jz586p8+fP7ztOvmivvvrq2HX5OEC+2A899JCPpr20KdK7efOm2tnZObIAjxJou91W8j9H+Z9LSL1HhHiU7EX6GYRoPnHzIkQZAm9sbAxk2BwKmyYqPe4TJ06o48ePByFGhGg6wwHVhxDNJ2MehChD4uvXrw/uDboqMpw+ffq0vDPZVZMj20GIXvHbbRwhmuc760KU2xevvfaa1V7hQVkRGb7lLW/xen8RIZr/zgRTI0I0n4pZFqIMjeVerkyY+Coy4XL//fd7Gz4jRF+Zd9AuQjQPeZaFuLm5Obhv6LucPHlSra6uegkDIXrB7qZRhGie86wKUXqHP/jBD5zeNzwoOzLRcubMmcE6RtcFIbom7rA9m0J0eBo05YDA7u6ukrWloRRZqyozz64LQnRN3GF7CNEh7MibWl9fV1tbW8GchaxTlAkW1wUhuibusD2E6BB25E29/vrrEz15ZOu0ZbH2ww8/7HxyBSHaymgA9SLEAJIQSQivvPKK19nlUZjkiSC5Z+uyIESXtB23hRAdA4+4uStXrgQxodJE+MADDwyee3ZZEKJL2o7bQoiOgUfc3OXLlwc71oRU5MmV5eVlpyEhRKe43TaGEN3yjrk1hHgrewgx5qv4kNgR4gwn1/CpjSNEmfCQZ49l7aI86merMGS2RfbN9eoXqp0L7prz0xJC9MM9xlZlUfZB+xuKAOU546WlpcGPLImpt+wSIcpyHdnP0vSuOA8++OBAvC4LPUSXtB23hRAdA4+4uYNmmeUentzLO6zI/UeRYq/XG/Qa5XnoUYKsd9GW2WP5kR11ZIuxUUWW3bh+WgUhHpbpiP/dphCHt4w/KibpWQxf5KZ7FkeNZdLPhbSh6aTnMHyc7HAjMhsu0wxbR71WYJidfEZmuIevAblGRIiuC0J0TdxhezaFyI7ZDhPpoCl5bE8e32sW2eb/7Nmz1luXvRdlR+5m4UkV69j3NcA9xCl5I8QpAQZ2uLwOYvi9NvIs8fD7b2yELTIUKTbLUYfqpuOhh2iaaED10UM0n4xZ3O3mxo0bI+/j3XfffU5eqCWTOTKpM1xkAkf2RnRZEKJL2o7bQojmgc+iEGVT2FHLZ1w+Ojdq2Y+P+4gI0fx3JpgaEaL5VMy6EOsXPslkhyy1cTWBVL+/Re5jSo9Viqt7mM2rBCGa/84EUyNCNJ+KWRRic6cbn7tVS7aa9xNFyLJRrMuCEF3SdtwWQjQPfBaF2JzllXcl33vvvebBHbHG5msMZGMHWfbjsiBEl7Qdt2VTiPIlktdVjlvkxeTSC2mWelHvuHX5+Lzc13K94YDt85QnTWSDWCm+hd9c/uNqlpshs1Isu7H9LaP+aAjIgmxZmF0X2ala1gG6LsOzzex24y4DCNEda1qKgEDz0T2ZzJBhswxZXU2qiJRlMqV+Bar0xGVRuKv26xQxZI7gYp00RJtD5klj4rgwCciibFmc3Swy43zPPfdYD3jUC658Te4gROvp9tcAQvTHPsaWh180JTvNyI4ztsva2pra3t6+3YzcZ5YequveoQSAEG1n22P9CNEj/Eiblp1n6nWAcgoybJUhtM3S3HrMx0RK89wQos1Me64bIXpOQITNy64zsvtM/ToB2+9HlnuGcv+yLj72QESIzDJ/LcLvKiE7ItBcl2h7LeDGxoaStYdSfCzEHkZKD9HRReajGXqIPqjH3+bwBIs8LSKyMl2kNyrD5fqxvdXV1TetUTXd5mH1IcTDCEX87wgx4uR5DH142GxrtnlYvC43kzgIL0L0eOHZbhoh2iY8u/U3Z5xlTaD0Ek1u5y/SlcXg9S47tofmR80UQjwqqQg/Z1OIL7300uDlQuMW2WNveGt4eUKhfnRs3Ppcf15mXF1smur6vIbbk2GsDGfrrf1Nz/4Oz2ZP86oCk6wQokmagdVlU4jsmB1Ysi2EM7wuUTZrlU1bpy0ysyx7MNayDaV3KOeFEKfNbsDHI0TzyfG9+YH5Mzq4Rll6I0ti6kkPGTKLFKd5zllkKNuN1XXK4mtZaiNcQygIMYQsWIoBIZoHO09CFHqyo5EIrC4iMHmcT4bQ4zxJIr1BGSbLMpt6jaPUKU+kyJZjoRSEGEomLMSBEM1DnTchCsHh+33yd3IvVR7tk+U40nOUHxFkLUkRoPxIT1B+RKx1r7DOiq3Z62myjhCnoRf4sQjRfILmUYhCUXaylkf6TLxDW6QpmzdILzO0ghBDy4jBeBCiQZhvVDWvQpTTr1cDDL+udBzKsrmuDLlDuWc4HDtCHCebkX3WphBffPHFwf2gcYssr3jsscf2HSY32psbCoxbp8vPy1BRNi6d5yJilP0LJW/1kLgeIje51MNoGVaLAGU22cYTLyZzgRBN0gysLptCDOxUCQcCRgggRCMYw6wEIYaZF6IKlwBCDDc3U0eGEKdGSAVjEKiHzfK7nnEeZ2nOqKaaddZD8DFCGvujCHFsZPEcgBDjyZXLSGUdoOxS3VwP2Gy/KTFZWiPLYw4rzdeHNj97txdWSfvy2oKm9Eb9ua5PYpF70CafqR4+L4R4WKYj/neEGHHyLIUuEpKF1vWmCkdp5ihv4Rt+zK+u927PKB8k0bvFJI8OyqTWtD3Pg9pAiEe5IiL9DEKMNHGWwpbel/TI5KVO4xTpmYkU7yahUYu35fOypdeomeXhLcbGiUeW7Ryl1zpOnfVnEeIk1CI5BiFGkihHYU7SI6tDO+wteCI46XnKcpy63E1c8lIpGbZPWmy9agAhTpqRCI5DiBEkyVGIw+8uGbdZuW8nvb27vXBKnmaR1w/URbZ5G3W/T+Qpm0bIesZJi2wwIb1W0wUhmiYaUH0IMaBkeA5Fem/yPPE0RV4PKvtZHlSGe6AH9eKGxTlpTHIvUZ58MVkQokmagdWFEANLiKdwhnesmSaMu02SNF9OJW2IPEWiw0X2QhxnUuegeOXpF5GuyQkWhDjN1RH4sQgx8AQ5Ck+26m/e25um2btJaLidUfcQZULn6tWr04Sw71jTvUSEaCw14VWEEMPLieuIpCcmPTKT5aDJksuXL+9b2zhqiG1i6N48F9O7bSNEk1dKYHUhxMAS4iEcmcmVGV2TZdRyGtnkQV5w3yyyXEeGtHWRXqr0Ik0Xk69JRYimsxNQfQgxoGR4CGX4vccmQ5DJjOauP6PuU8oMc/OFYrIGcpqtww6K3+RGswjR5FUSWF0IMbCEOA7H5GTKqNCbL50atTBbjjl79uxgqc60y37uhs7kHpUI0fFF6rI5hOiSdnhtHfQ4nalI5QkUWZsoQ+jDHt2T/S5FmraKqZfcI0RbGQqgXoQYQBI8hmBqecvdTqGeYJGZ41GPBMpLpOT54+Y7nm0gOexJmqO2iRCPSirCzyHECJNmKGTZxEFmfW2XeoJFhCjD4uGyuro6+KutrS2roYh0ZQg/bUGI0xIM+HiEGHByLIdm+/5hM3yR0UEbRsgjdrL0x8TLqe6GTCZw5H7ltIu0EaLlC9Nn9QjRJ32/bUuPTO7rzVMxcR8RIc7wFYMQZzi5h5za8GN080DioEcFxzl3hDgOrcg+ixAjS5jBcF1MqBgM10hVJtYjIkQjqQizEoQYZl5cRCVPjcjTI/NUhheLT3LuCHESapEcgxAjSZThMGUC49KlS4ZrDb86E3skIsTw8zxxhAhxYnRRHygbr8q6v3krslBcnmuepiDEaegFfixCDDxBlsKztYmCpXCNVTv87PQkFSPESahFcgxCjCRRhsM0veeg4fCsVSdrEM+dOzdV/QhxKnxhH4wQw86PrehMbdFvKz5b9SLEycnqF6qdC5MfHseRCDGOPJmO8qCdZ0y3E1p9squOPK0yTaGHOA29wI9FiIEnyFJ48tiezZ1lLIU9dbUiRNnkYZqCEKehF/ixCDHwBBFecAQQYnApMRcQQjTHkprmgwBCnOE8I8QZTi6nZoUAQrSCNYxKEWIYeSCKeAggxHhyNXakCHFsZBww5wQQ4gxfAAhxhpPLqVkhgBCtYA2jUoQYRh6IIh4CCDGeXI0dKUIcGxkHzDkBhDjDFwBCnOHkcmpWCCBEK1jDqBQhhpEHooiHAEKMJ1djR2pTiLIBaYiPhz3yyCOD9wDXRbbCks0O5rmsrKyohYWFeUZw5HNHiEdGFd8HbQrxmWeeUdeuXQsOyvve9z4lL0+vy7xudNBMzOnTp5Vsr085nABCPJxRtJ9AiGrQi71x40a0OTQROEI8OkWEeHRW0X0SISJEuWgR4tG/ugjx6Kyi+yRCRIgIcbyvLUIcj1dUn0aICBEhjveVRYjj8Yrq0wgRISLE8b6yCHE8XlF92qYQn3/+ebW2thYcjwsXLqjV1dXbcXU6HbW+vh5cnC4DOnXq1L6lSC7bjq0thBhbxsaI16YQxwiDj0IgGgIIMZpUjR8oQhyfGUfMNwGEOMP5R4gznFxOzQoBhGgFaxiVIsQw8kAU8RBAiPHkauxIEeLYyDhgzgkgxBm+AIaFWPY6md7eWjj/yPu/NsOnzalBYGICCHFidOEfiBDDzxERhkUAIYaVD6PRjBKi6uy0Hj/33q8bbYjKIDAjBBDijCRy1GkgxBlOLqdmhYAI8dLaxafy5eP9ZLFdlKpdlEtLZaZalZUGA6lUv1DtXAgkFmthNIVYdm+maW8vS4tu9o4z73naWqNUDIGICWzvrj95ae17AyHqxWN5pdISIUac0Gbod4SYJ0l+M626nSzd67YQ4owkmNMwTmBzd+2PL29eeqpIl3O9ciwvs8WiamUVPUTjqN1XeEeIu0my20tLXaSqs9F64sxPfEUpdWefffeh0SIEgiSw0bn+B5e3Xv2Xor2QJ4srBUIMMk2TB1X0dxOt+jrp9tIy76Vpr5O97f4f+1yWtH588lo5EgIzSaC6tPbdj24Wu6/pdDkvl0SIWUkPcYZyvW9ipdtNZS3iD504+1PHl07+7gydJqcCgakJ5EX/2f+99t+fKtrLeZK1i3KxXVSqVSHEqdGaqeAz33r62bqmT1/40LsnqbU5bNZ5kVTdnSzb6y38yIOPfy5LsvOT1MkxEJg1AlVV9V7dvPJbN/ob3y2yhcLEcNnE99cV5yhmmU0ArYWo877WqkhS6SXme+lqkt575uSjn82S7K2uoNMOBEIkUKlqd2Nn7Q+vbL/yzbLdLqR3WGVpWWZLUw2XTXx/XfGaGyEK0OFeYpJ3E5FiKy+Xzt37w7+81Fr+Oa31KVfwaQcCYRCo+v1879+ub7/+l9d7m5eTdrsoBzLMqnoyReKcdIYZIRrOsimgIkQJTfdzneS7iQydkzxPiryXaF0kaVGlp9qrD2dJ+5TSOlGqHHyeAoHZI5AMFljnZb+ztbvx8p4qOlXaLsssLW/1DLNK1h5W2fT3Dk19f13kYK56iM1eovxZpKjEfHk30bnSAzGqQiuttM6LW/Isbv2mQGBWCFRpOpBhlaWVypWq2mlZqaxKs1u/h2U4Te9QjkWIhq8c00DrofNAeIN7ilorlWud51qrXOeD3/LHwTiBAoHZIiDXtVzai2nVz3OVVdlgBnkgwoEUbz2eJ383rQwRooVLx7QQ657iQIj9/FZPcCBG+XNLBhIje4UiTAunR5UQsE5AZHdwI9UbvcL9IjQhQ4RoIbU2hNiUYlOMw+GLKC2cElVCwBsBuS84qvG6R2hKhHUbtr6/NgDO3T3Eu0GsJ11sgKZOCIROYNJZ5MPOCyEeRmjMf48J6JinxschMPMEYvr+0kOc+cuRE4SAXwII0TD/mIAaPnWqg0D0BGL6/tJDjP5y4wQgEDYBhGg4PzEBNXzqVAeB6AnE9P2lhxj95cYJQCBsAgjRcH5iAmr41KkOAtETiOn7Sw8x+suNE4BA2AQQouH8NIGaqHrSTWZNtE0dEIiJwLx996LrIZq4mBCiCYrUMQ8EEGKAWZ63pASYAkKaUwLz9t2Looc4p9cipw0BCDgmgBAdA6c5CEAgXAIIMdzcEBkEIOCYAEJ0DJzmIACBcAkgxHBzQ2QQgIBjAgjRMXCagwAEwiWAEMPNDZFBAAKOCSBEx8BpDgIQCJcAQgw3N0QGAQg4JoAQHQOnOQhAIFwCCDHc3BAZBCDgmABCdAyc5iAAgXAJIMRwc0NkEICAYwII0TFwmoMABMIlgBDDzQ2RQQACjgkgRMfAaQ4CEAiXAEIMNzdEBgEIOCaAEB0DpzkIQCBcAggx3NwQGQQg4JgAQnQMnOYgAIFwCSDEcHNDZBCAgGMCCNExcJqDAATCJYAQw80NkUEAAo4JIETHwGkOAhAIlwBCDDc3RAYBCDgmgBAdA6c5CEAgXAIIMdzcEBkEIOCYAEJ0DJzmIACBcAkgxHBzQ2QQgIBjAvqjz36pctwmzUEAAhAIkgBCDDItBAUBCPgggBB9UKdNCEAgSAIIMci0EBQEIOCDAEL0QZ02IQCBIAkgxCDTQlAQgIAPAgjRB3XahAAEgiSAEINMC0FBAAI+CCBEH9RpEwIQCJIAQgwyLQQFAQj4IIAQfVCnTQhAIEgCCDHItBAUBCDggwBC9EGdNiEAgSAJIMQg00JQEICADwII0Qd12oQABIIkgBCDTAtBQQACPgggRB/UaRMCEAiSAEIMMi0EBQEI+CCAEH1Qp00IQCBIAggxyLQQFAQg4IMAQvRBnTYhAIEgCSDEINNCUBCAgA8CCNEHddqEAASCJIAQg0wLQUEAAj4IIEQf1GkTAhAIkgBCDDItBAUBCPgggBB9UKdNCEAgSAIIMci0EBQEIOCDAEL0QZ02IQCBIAkgxCDTQlAQgIAPAgjRB3XahAAEgiSAEINMC0FBAAI+CCBEH9RpEwIQCJIAQgwyLQQFAQj4IIAQfVCnTQhAIEgCCDHItBAUBCDggwBC9EGdNiEAgSAJIMQg00JQEICADwII0Qd12oQABIIkgBCDTAtBQQACPgggRB/UaRMCEAiSAEIMMi0EBQEI+CCAEH1Qp00IQCBIAggxyLQQFAQg4IMAQvRBnTYhAIEgCSDEINNCUBCAgA8CCNEHddqEAASCJIAQg0wLQUEAAj4IIEQf1GkTAhAIkgBCDDItBAUBCPggIELcU0q1fDROmxCAAAQCItDXH3vuy5fLsjwbUFCEAgEIQMA5gSRJruiPP/flL+Vl+bPOW6dBCEAAAgERSJP0S/oT3/7Kr+wVxecDiotQIAABCDgnsJCmn9Sf/MY3FnvHt75XKfWg8whoEAIQgEAABBKdvLqwtfKollg+8e2vfmyvyL8QQFyEAAEIQMA5gXaafPyv3vnhLwyEKOXj3/7Kn+VF8WvOI6FBCEAAAh4JtNL0z//6nT/z6xLCbSH+0he/mC4+tvSn/ar8VY+x0TQEIAABZwRaOvmL7ku7v/l3H/lIsU+IdQQyfM7L8smyKrmn6CwtNAQBCLgkIPcME6U+9TcXPrzvVuHtHmIzGJloKVa3P1oq/QuVVu8qy/IBFm+7TBdtQQAChgn0kyR5XVfquURV/5BuHf/bz3/wg93hNv4fO5erFQG9lvkAAAAASUVORK5CYII="

/***/ }),

/***/ 116:
/*!**********************************************!*\
  !*** D:/项目文件/米悠/static/images/medium/fm.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 12:
/*!***************************************!*\
  !*** D:/项目文件/米悠/utils/request/api.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 13));
var _uploadFile = _interopRequireDefault(__webpack_require__(/*! ./uploadFile.js */ 14));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // import { POST } from "./request.js"
// let base = 'http://localhost:8888';
//微信登录
// module export const WXlogin = params => { return POST('POST',`${base}/tokens`,params).then(res => res.data); }; 
// //通过openid获取用户的信息
// module export const OpenidGetUser = (openId,params) => { return POST('GET',`${base}/User/openid/${openId}`,params).then(res => res.data); }; 
// module.exports = {
// 	hc : function(params){
// 		return POST('POST',`${base}/tokens`,params);
// 	}
// }
var _default = { //添加实名api/user/ocr/idcard/update
  api_addmynames: function api_addmynames(params) {return (0, _request.default)({ method: "POST", url: "api/user/idcard/update", data: params });}, //获取使用帮助视频列表api/user/guide/title/list
  api_gettitles: function api_gettitles(params) {return (0, _request.default)({
      method: "POST",
      url: "api/user/guide/title/list?brandId=" + params.brandId,
      data: params });

  },
  //获取操作视频api/user/guide/get/{id}
  api_gettitlesId: function api_gettitlesId(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/guide/get/" + params.id,
      data: params });

  },
  // 获取省
  api_getProvinces: function api_getProvinces(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/province/list",
      data: params });

  },
  //获取市aapi/payment/city/list
  api_getMarket: function api_getMarket(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/city/list?parent=" + params.parent,
      data: params });

  },
  // 注册

  api_register: function api_register(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/pass/register",
      data: params });

  },

  // 发送验证码api_sendCode
  api_sendCode: function api_sendCode(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/notice/pass/dm/sms/send",
      data: params });

  },

  // 密码登录和验证码登录
  api_login: function api_login(params) {
    // let url = "api/user/pass/login/password"
    // console.log("api_login-arams",params)
    // if(params.type==="codeLogin"){
    // 	url = "api/user/pass/login/vericode"
    // }
    // console.log("url=",url)
    return (0, _request.default)({
      method: "POST",
      url: "api/user/pass/login/vericode",
      data: params });

  },
  api_loginpasswordLogin: function api_loginpasswordLogin(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/pass/login/password",
      data: params });

  },
  // 上传身份证正面
  api_ocrUploadA: function api_ocrUploadA(params) {
    return (0, _uploadFile.default)({
      method: "POST",
      url: "api/user/ocr/front/upload",
      data: params });

  },

  // 上传身份证国徽面
  api_ocrUploadB: function api_ocrUploadB(params) {
    return (0, _uploadFile.default)({
      method: "POST",
      url: "api/user/ocr/back/upload",
      data: params });

  },
  // 调取实名认证人脸识别认证api/user/face/upload

  api_brandIdfan: function api_brandIdfan(params) {
    return (0, _uploadFile.default)({
      method: "POST",
      url: "api/user/face/upload",
      data: params });

  },
  // 实名后添加身份证信息api/user/ocr/idcard/update
  // api_addname:function(params){
  // 	return request({
  // 		method: "POST",
  // 		url: "api/user/ocr/idcard/update",
  // 		data: params
  // 	});
  // },

  // 上传银行卡
  api_ocrUploadBankcard: function api_ocrUploadBankcard(params) {
    return (0, _uploadFile.default)({
      method: "POST",
      url: "api/user/ocr/bankcard",
      data: params });

  },


  // 绑定信用卡api/user/bind/crebit/card
  api_bindCard: function api_bindCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/bind/credit/card",
      data: params });

  },
  // 预修改信用卡api/user/credit/card/get
  api_xyCard: function api_xyCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/credit/card/get/" + params.id,
      data: params });

  },
  api_xyCard1: function api_xyCard1(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/credit/card/get/" + params.id + "?empowerToken=" + params.empowerToken,
      data: params });

  },
  // 修改信用卡api/user/credit /card/update
  api_modifiesxyCard: function api_modifiesxyCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/credit/card/update",
      data: params });

  },
  // 删除信用卡
  api_deletexyCard: function api_deletexyCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/credit/card/delete/" + params.id,
      data: params });

  },
  // // 获取信用卡lieb
  // api_creditCard:function(params){
  // 	return request({
  // 		method: "POST",
  // 		url: "api/user/credit/card/list",
  // 		data: params
  // 	});
  // },
  // 设置默认信用卡api/user/credit/card/change/def
  api_changexyCard: function api_changexyCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/credit/card/change/def/" + params.id,
      data: params });

  },
  // 获取信用卡lieb
  api_creditCard: function api_creditCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/credit/card/list",
      data: params });

  },
  // 获取默认信用卡api/user/credit/card/def
  api_getMrXyCard: function api_getMrXyCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/credit/card/def",
      data: params });

  },

  // 获取储蓄卡
  api_debitCard: function api_debitCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/debit/card/list",
      data: params });

  },
  // api/user/debit/list
  api_debitCard1: function api_debitCard1(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/debit/list?empowerToken=" + params.empowerToken,
      data: params });

  },

  // 绑定储蓄银行卡api/user/bind/debit/card
  api_bindBankcard: function api_bindBankcard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/bind/debit/card",
      data: params });

  },
  // 删除储蓄卡api/user/debit/card/delete/{id}
  api_deletecxCard: function api_deletecxCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/debit/card/delete/" + params.id,
      data: params });

  },
  // 设置默认储蓄卡
  api_setDefaultCard: function api_setDefaultCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/debit/card/change/def/" + params.id,
      data: params });

  },
  // 获取默认储蓄卡
  api_getMrCxCard: function api_getMrCxCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/debit/card/def",
      data: params });

  },

  // 预修改储蓄卡getcard
  api_getcard: function api_getcard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/debit/card/get/" + params.id,
      data: params });

  },
  api_getcard1: function api_getcard1(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/debit/card/get/" + params.id + "?empowerToken=" + params.empowerToken,
      data: params });

  },
  // 修改储蓄卡
  api_turegetcard: function api_turegetcard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/debit/card/update",
      data: params });

  },



  // 查看可刷卡通道
  api_showGetpassage: function api_showGetpassage(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/quick/choose/channel",
      data: params });

  },

  // 查看通道银行限额api/payment/quick/channel/bank/list/{id}
  api_showBankQuota: function api_showBankQuota(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/quick/channel/bank/list/" + params.id,
      data: params });

  },



  // 选择通道/api/payment/fast/verify/bindcard
  api_fastApplys: function api_fastApplys(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/fast/verify/bindcard",
      data: params });

  },
  //刷卡
  api_fastApply: function api_fastApply(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/fast/apply",
      data: params });

  },
  // 确认刷卡
  api_tureApply: function api_tureApply(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/fast/confirm",
      data: params });

  },
  // 刷卡订单列表api/payment/quick/order/lis
  api_quickOrderList: function api_quickOrderList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/quick/order/list",
      data: params });

  },
  // 刷卡订单详情/api/payment/quick/order/{id}
  api_quickOrder: function api_quickOrder(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/quick/order/" + params.id,
      data: params });

  },
  //---------------------------------------------------余额还款api----------------------------

  //余额还款 查看所有信用还款计划状态
  api_getBalancePlanList: function api_getBalancePlanList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/get/balance/plan/list",
      data: params });

  },
  api_getBalancePlanList1: function api_getBalancePlanList1(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/get/balance/plan/list?empowerToken=" + params.empowerToken,
      data: params });

  },
  // 获取余额还款头顶
  api_getBalancePlanListfee: function api_getBalancePlanListfee(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/balance/fee",
      data: params });

  },


  // getHistoryList余额还款-历史记录
  api_getHistoryList: function api_getHistoryList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/get/all/plan?cardNo=" + params.cardNo,
      data: params });

  },
  api_getHistoryList1: function api_getHistoryList1(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/get/all/plan?cardNo=" + params.cardNo + "&empowerToken=" + params.empowerToken,
      data: params });

  },
  //余额还款-历史记录-计划详情/api/credit/get/plan/has/item
  api_getPlanHhasItem: function api_getPlanHhasItem(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/get/plan/has/item?id=" + params.id,
      data: params });

  },
  api_getPlanHhasItem1: function api_getPlanHhasItem1(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/get/plan/has/item?id=" + params.id + "&empowerToken=" + params.empowerToken,
      data: params });

  },

  // 余额还款-制定计划
  api_planNewMake: function api_planNewMake(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/create/plan/new",
      data: params });

  },

  // startNewPlan启动计划 非jsonapi/credit/save/new/plan
  //api/credit/bind/card/confirm
  api_startNewPlan: function api_startNewPlan(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/save/new/plan?cardNo=" + params.cardNo,
      data: params });

  },
  api_startNewPlan1: function api_startNewPlan1(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/save/new/plan?cardNo=" + params.cardNo + "&empowerToken=" + params.empowerToken,
      data: params });

  },
  // 查询计划所需最少天数
  api_budGetDay: function api_budGetDay(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/budget/day",
      data: params });

  },
  // 检验是否绑卡	非json	启动计划前调用
  api_orCard: function api_orCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/verify/band/card?cardNo=" + params.cardNo,
      data: params });

  },

  // 预绑卡	非json获取验证码时调用
  api_orbindCard: function api_orbindCard(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/bind/card?cardNo=" + params.cardNo,
      data: params });

  },
  //余额还款确认绑卡 非json/api/credit/bind/card/confirmapi_bindCardConfirm
  api_bindCardConfirm: function api_bindCardConfirm(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/bind/card/confirm?idCard =" + params.idCard + "&cardNo=" + params.cardNo + "&smsCode=" + params.smsCode + "&bindId=" + params.bindId,
      data: params });

  },
  // channelId:t.id,orderCode:t.orderCode,

  api_showtureApply: function api_showtureApply(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/fast/query?channelId=" + params.channelId + "&orderCode=" + params.orderCode,
      data: params });

  },
  // 余额还款历史记录-终止计划api/credit/plan/stop
  api_planStop: function api_planStop(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/plan/stop?id=" + params.id,
      data: params });

  },

  api_planStop1: function api_planStop1(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/credit/plan/stop?id=" + params.id + "&empowerToken=" + params.empowerToken,
      data: params });

  },

  //获取app版本
  api_getUpdateApp: function api_getUpdateApp(params) {
    console.log("进入api_getUpdateApp");
    return (0, _request.default)({
      method: "POST",
      url: "tokens",
      data: params });

  },
  ///获取首页的功能列表
  api_getFunList: function api_getFunList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/app_fun/getFunList",
      data: params });

  },
  // 获取交易记录
  api_getallMoneyList: function api_getallMoneyList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/app_fun/getFunList",
      data: params });

  },

  // 获取交易状态api/payment/fast/query
  api_getalLfastQuery: function api_getalLfastQuery(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/fast/query",
      data: params });

  },

  // 调级列表
  api_tiaojiList: function api_tiaojiList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/change/direct/vip/level?subUserId=" + params.id,
      data: params });

  } };exports.default = _default;

/***/ }),

/***/ 13:
/*!*******************************************!*\
  !*** D:/项目文件/米悠/utils/request/request.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 不需要登录的接口
// const noToken = [
// 	'api/user/pass/login/password',
// 	"api/user/pass/login/vericode",
// 	"api/user/pass/register"
// ];

var request = function request(params) {
  // if (!(noToken.indexOf(params.url) >= 0)) {
  // 	if(res.data.code!=0){
  // 		uni.reLaunch({
  // 			url:"/pages/login/login"
  // 		})
  // 		return
  // 	}
  // 	uni.request({
  // 		url:baseUrl + "api/user/get/"+uni.getStorageSync("users").id,
  // 		success(res) {
  // 			if(res.data.code!=0){
  // 				uni.reLaunch({
  // 					url:"/pages/login/login"
  // 				})
  // 			}
  // 		}
  // 	})
  // }

  // 显示加载数据的提示
  // uni.showLoading({
  // 	title: 'loading...',
  // 	mask: true
  // })
  return new Promise(function (resolve, reject) {
    var baseUrl = _vue.default.prototype.$baseUrl;

    var token_value = uni.getStorageSync('token') || [];

    console.log("params.data=", params.data);

    uni.request({
      method: params.method,
      data: params.data,
      url: baseUrl + params.url,
      // url:"http://api.zhifu168.com/api/user/ocr/idcard/update",
      header: {
        'token': token_value,
        "platform": "h5"
        // "Access-Control-Allow-Origin":"*"
        // "Content-Type":''
      },
      success: function success(res) {
        resolve(res.data);
      },
      fail: function fail(err) {
        reject(err);

      },
      complete: function complete() {
        // uni.hideLoading()
      } });

  });
};var _default =
request;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**********************************************!*\
  !*** D:/项目文件/米悠/utils/request/uploadFile.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _wCompress = _interopRequireDefault(__webpack_require__(/*! @/components/w-compress/w-compress.vue */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var request = function request(params) {




  // 显示加载数据的提示
  uni.showLoading({
    title: '上传中...',
    mask: true });



  console.log("上传的地址", params.data.filePath);
  return new Promise(function (resolve, reject) {
    var baseUrl = _vue.default.prototype.$baseUrl;
    var token_value;
    try {
      token_value = uni.getStorageSync('token');
      if (token_value) {
        token_value = 'Bearer' + token_value;
      }
    } catch (e) {

    } // error
    // console.log("params.data.filePath=",params.data.filePath)
    uni.uploadFile({
      method: params.method,
      //data: params.data,
      url: baseUrl + params.url,
      filePath: params.data.filePath,
      name: 'file',
      // fileType:"image",
      header: {
        'token': uni.getStorageSync('token'),
        "platform": "h5" },

      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      },
      complete: function complete() {
        uni.hideLoading();

      } });

  });
};var _default =
request;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 21);

/***/ }),

/***/ 21:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 22);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 22:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 23:
/*!****************************************************!*\
  !*** D:/项目文件/米悠/components/w-compress/compress.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 图片压缩
                                                                                                      * @param {String} imgUrl  需要压缩的图片路径
                                                                                                      * @param {Object} self	必传，当前组件对象
                                                                                                      * @param {Object} options 压缩参数
                                                                                                      * 		width: 压缩到多宽，默认图片宽度(待优化，传入宽度，应计算高度)
                                                                                                      * 		height: 压缩到多高，默认图片高度
                                                                                                      * 		pixels: 压缩图片的最大分辨率，默认二百万
                                                                                                      * 		quality: 压缩质量，默认0.8
                                                                                                      * 		type: 获取的base64类型，默认jpg
                                                                                                      * 		base64: 是否返回base64，默认true(非H5有效)
                                                                                                      * @return {Promise}
                                                                                                      * 		reject
                                                                                                      * 			code
                                                                                                      * 				-1: 获取图片信息错误
                                                                                                      * 				-2: 极大可能创建图片对象出错(h5会出现，出现概率无限接近0)
                                                                                                      * 				-3: canvas转图片错误(小程序会出现)
                                                                                                      * 				-4: 图片转base64错误(小程序会出现)
                                                                                                      */

// 图片分辨率压缩
var calcImageSize = function calcImageSize(res, pixels) {
  var imgW, imgH;
  imgW = res.width;
  imgH = res.height;

  var ratio;
  if ((ratio = imgW * imgH / pixels) > 1) {
    ratio = Math.sqrt(ratio);
    imgW = parseInt(imgW / ratio);
    imgH = parseInt(imgH / ratio);
  } else {
    ratio = 1;
  }

  return { imgW: imgW, imgH: imgH };
};

var urlTobase64 = function urlTobase64(url, type) {
  return new Promise(function (resolve, reject) {
    uni.getFileSystemManager().readFile({
      filePath: url,
      encoding: 'base64',
      success: function success(res) {
        var base64 = res.data;
        base64 = "data:image/".concat(type, ";base64,").concat(base64);
        resolve(base64);
      } });

  });
};

var compress = function compress(imgUrl, slef) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  /*************** 参数默认值 ***************/
  var MAX_PIXELS = 2000000; // 最大分辨率，宽 * 高 的值
  var MAX_QUALITY = 0.8; // 压缩质量
  var IMG_TYPE = 'jpg';
  var CANVAS_ID = 'compress_canvas';
  var BASE_64 = false;

  return new Promise(function (resolve, reject) {
    uni.getImageInfo({
      src: imgUrl,
      success: function success(res) {
        var pixels = options.pixels || MAX_PIXELS;
        var quality = options.quality || MAX_QUALITY;
        var type = options.type || IMG_TYPE;
        var canvasId = options.canvasId || CANVAS_ID;
        var isBase64 = options.base64 || BASE_64;var _calcImageSize =

        calcImageSize(res, pixels),imgW = _calcImageSize.imgW,imgH = _calcImageSize.imgH;
        var w = options.width || imgW;
        var h = options.height || imgH;





        type = type == 'png' ? 'png' : 'jpg',

        console.log("%c \u5BBD: ".concat(w, " %c \u9AD8: ").concat(h, " %c \u5206\u8FA8\u7387: ").concat(w * h, " %c \u8D28\u91CF: ").concat(quality, " %c \u7C7B\u578B: ").concat(type), 'color:#f00', 'background-color:#f60;color:#fff', 'color:#F00', 'background-color:#f60;color:#fff', 'color:#F00');




















        // 非h5

        slef.height = h;
        slef.width = w;

        slef.$nextTick(function () {
          var canvas = null;
          if (!canvas) {
            canvas = uni.createCanvasContext(canvasId, slef);
          }
          canvas.drawImage(res.path, 0, 0, w, h);
          canvas.draw();
          setTimeout(function () {
            uni.canvasToTempFilePath({
              canvasId: canvasId,
              x: 0,
              y: 0,
              width: w,
              height: h,
              destWidth: w,
              destHeight: h,
              fileType: type,
              quality: quality,
              success: function success(file) {
                if (isBase64) {
                  urlTobase64(file.tempFilePath, type).
                  then(function (res) {
                    canvas = null;
                    resolve(res);
                  }).
                  catch(function (e) {
                    reject({
                      code: -4,
                      msg: '图片转base64错误',
                      data: e });

                  });
                } else {
                  resolve(file.tempFilePath);
                }
              },
              fail: function fail(e) {
                reject({
                  code: -3,
                  msg: 'canvas转图片错误',
                  data: e });

              } },
            slef);
          }, 500);
        });

      } });

  });
};var _default =

compress;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 237:
/*!********************************!*\
  !*** D:/项目文件/米悠/static/p2.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/p2.png";

/***/ }),

/***/ 238:
/*!********************************!*\
  !*** D:/项目文件/米悠/static/p1.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/p1.png";

/***/ }),

/***/ 26:
/*!******************************************!*\
  !*** D:/项目文件/米悠/utils/request/me_api.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 13));
var _uploadFile = _interopRequireDefault(__webpack_require__(/*! ./uploadFile.js */ 14));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  // 素材管理/api/user/material/get/list
  api_getmateriallist: function api_getmateriallist(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/material/get/list",
      data: params });

  },

  // 获取招商收益api/user/get/attract/profit/list
  api_getZsMoney: function api_getZsMoney(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/attract/profit/list",
      data: params });

  },
  // 招商收益详细按月查找 非json /api/user/get/attract/profit/time/list
  api_profitTime: function api_profitTime(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/attract/profit/time/list?year=" + params.year + "&month=" + params.month,
      data: params });

  },
  // 获取首页轮播图

  api_getbanner: function api_getbanner(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/advert/get?title=" + params.title,

      data: params });

  },
  // 获取总收益
  api_getallMoney: function api_getallMoney(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/account",
      data: params });

  },
  // 获取体现记录
  api_getTxMoney: function api_getTxMoney(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/turnover/get/withdraw",
      data: params });

  },
  // // 获取收益记录
  api_getaddMoney: function api_getaddMoney(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/turnover/get/profit",
      data: params });

  },

  // 提现api/payment/withdraw
  api_txMoney: function api_txMoney(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/payment/withdraw?amount=" + params.amount + "&payId=" + params.payId + "&type=" + params.type,
      data: params });

  },
  // getAlipayLst查询支付宝列表	/api/user/alipay/list

  api_getAlipayLst: function api_getAlipayLst(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/alipay/list",
      data: params });

  },

  //添加用户支付宝api/user/alipay/add   api/user/alipay/add
  api_getAlipayAdd: function api_getAlipayAdd(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/alipay/add",
      data: params });

  },
  //修改支付宝 非jsonapi/user/alipay/change changeAlipay
  api_changeAlipay: function api_changeAlipay(params) {
    return (0, _request.default)({
      method: "POST",
      //url: "api/user/alipay/change?oldAccount="+params.oldAccount+"&newAccount"+params.newAccount,
      url: "api/user/alipay/change?newAccount=" + params.newAccount + "&oldAccount" + params.oldAccount,
      data: params });

  },
  // api_changeAlipay:function(params){
  // 	return request({
  // 		method: "POST",
  // 		url: "api/user/alipay/change",
  // 		data: params
  // 	});
  // },

  //个人中心/api/user/get/{id}
  api_getUser: function api_getUser(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/" + params.id,
      data: params });

  },

  // -----------------------------------------------------------个人中心---------------------------------
  // 获取刷卡分润api/user/get/quick/profit/list
  api_profitList: function api_profitList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/quick/profit/list",
      data: params });

  },
  //获取下级还款分润api/user/get/balance/profit/list
  api_balanceProfitList: function api_balanceProfitList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/balance/profit/list",
      data: params });

  },

  //自用返现api/user/get/self/profit/list
  api_selfProfitList: function api_selfProfitList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/self/profit/list",
      data: params });

  },
  //管理分润api/user/get/manage/profit/list
  api_managefitList: function api_managefitList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/manage/profit/list",
      data: params });

  },

  //其他收益/api/user/get/other/profit/list
  api_otherProfitList: function api_otherProfitList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/other/profit/list",
      data: params });

  },

  // --------------------------------信息修改-----------------------------
  //重置密码
  api_updatePassword: function api_updatePassword(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/update/pwd",
      data: params });

  },
  //修改手机号api/user/update/username
  api_updatePhone: function api_updatePhone(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/update/username",
      data: params });

  },
  //设置交易密码/api/user/change/pay/pwd
  api_updatePaypwd: function api_updatePaypwd(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/change/pay/pwd",
      data: params });

  },
  //更改昵称  api/user/update/nick
  api_updatNick: function api_updatNick(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/update/nick?nick=" + params.nick,
      data: params });

  },
  // ------------------------------------我的团队----------------------
  // 获取直推用户列表/api/user/get/direct/list
  api_getDirectList: function api_getDirectList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/direct/list",
      data: params });

  },

  // 获取间接推用户列表/api/user/get/indirect/list
  api_getIndirectList: function api_getIndirectList(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/indirect/list",
      data: params });

  },


  // -------------------------------------------激活码管理------------



  // 获取未使用的激活码/api/user/key/get/unused

  api_userKeyunused: function api_userKeyunused(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/key/get/unused",
      data: params });

  },


  // 获取已使用的激活码/api/user/key/used
  api_userKey: function api_userKey(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/key/get/used",
      data: params });

  },

  //	获取激活码购买记录/api/user/key/get

  api_userKeGget: function api_userKeGget(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/key/get",
      data: params });

  },

  //获取激活码数量/api/user/key/get/count
  //获取激活码/api/user/key/get/count
  api_keyGetCount: function api_keyGetCount(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/key/get/count",
      data: params });

  },

  // 活动中心获取数据api/user/get/centre
  api_getCentre: function api_getCentre(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/centre",
      data: params });

  },

  // 使用激活码/api/user/key/use   非jsonapi/user/key/use

  api_vipuserKey: function api_vipuserKey(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/key/use?key=" + params.key,
      data: params });

  },

  // 获取二维码链接
  api_brandId: function api_brandId(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/app/config/get",
      data: params });

  } };exports.default = _default;

/***/ }),

/***/ 27:
/*!******************************************!*\
  !*** D:/项目文件/米悠/utils/request/medapi.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 13));
var _uploadFileMedium = _interopRequireDefault(__webpack_require__(/*! ./uploadFileMedium.js */ 28));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{

  // 获取中介还款用户api/credit/empower/list
  api_getMyUsers: function api_getMyUsers(params) {
    return (0, _request.default)({
      method: "POST",
      // url: "api/credit/empower/list",
      url: "api/credit/empower/list?page=" + params.page + "&size=" + params.size,
      data: params });

  },

  // 1.上级代注册接口api/user/pre/register
  api_addMyUsers: function api_addMyUsers(params) {
    return (0, _request.default)({
      method: "POST",
      // url: "api/user/pre/register",
      url: "api/user/pre/register?phone=" + params.phone,
      data: params });

  },
  //3.获取中介token
  api_getMyToken: function api_getMyToken(params) {
    return (0, _request.default)({
      method: "POST",
      // url: "api/user/pre/register",
      url: "api/user/empower/token?userId=" + params.userId,
      data: params });

  },
  //4.4.删除中介下级api/user/empower/close
  api_closeEmpower: function api_closeEmpower(params) {
    return (0, _request.default)({
      method: "POST",
      // url: "api/user/empower/close",
      url: "api/user/empower/close?userId=" + params.userId,
      data: params });

  },
  //5.5.开户/关闭  中介授权api/user/empower/switch
  api_switchEmpower: function api_switchEmpower(params) {
    return (0, _request.default)({
      method: "POST",
      // url: "api/user/empower/close",
      url: "api/user/empower/switch?status=" + params.status,
      data: params });

  },
  // 上传身份证正面
  api_ocrUploadA: function api_ocrUploadA(params) {
    return (0, _uploadFileMedium.default)({
      method: "POST",
      url: "api/user/ocr/front/upload",
      data: params });

  },

  // 上传身份证国徽面
  api_ocrUploadB: function api_ocrUploadB(params) {
    return (0, _uploadFileMedium.default)({
      method: "POST",
      url: "api/user/ocr/back/upload",
      data: params });

  },


  // 获取首页轮播图

  api_getbanner: function api_getbanner(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/advert/get?title=" + params.title,

      data: params });

  },
  // 获取总收益
  api_getallMoney: function api_getallMoney(params) {
    return (0, _request.default)({
      method: "POST",
      url: "api/user/get/account",
      data: params });

  } };exports.default = _default;

/***/ }),

/***/ 28:
/*!****************************************************!*\
  !*** D:/项目文件/米悠/utils/request/uploadFileMedium.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _wCompress = _interopRequireDefault(__webpack_require__(/*! @/components/w-compress/w-compress.vue */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var request = function request(params) {




  // 显示加载数据的提示
  uni.showLoading({
    title: '上传中...',
    mask: true });



  console.log("上传的地址", params.data.filePath);
  return new Promise(function (resolve, reject) {
    var baseUrl = _vue.default.prototype.$baseUrl;
    var token_value;
    try {
      token_value = uni.getStorageSync('token');
      if (token_value) {
        token_value = 'Bearer' + token_value;
      }
    } catch (e) {
      // error
    }
    console.log("params.data.empowerToken=", params.data.empowerToken);
    uni.uploadFile({
      method: params.method,
      //data: params.data,
      url: baseUrl + params.url,
      filePath: params.data.filePath,
      formData: {
        empowerToken: params.data.empowerToken },

      name: 'file',
      // fileType:"image",
      header: {
        'token': uni.getStorageSync('token'),
        "platform": "h5" },

      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      },
      complete: function complete() {
        uni.hideLoading();

      } });

  });
};var _default =
request;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 287:
/*!*******************************!*\
  !*** D:/项目文件/米悠/utils/MD5.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */

/*
                                                                               * These are the functions you'll usually want to call
                                                                               * They take string arguments and return either hex or base-64 encoded strings
                                                                               */
function hex_md5(s) {return rstr2hex(rstr_md5(str2rstr_utf8(s)));}
function b64_md5(s) {return rstr2b64(rstr_md5(str2rstr_utf8(s)));}
function any_md5(s, e) {return rstr2any(rstr_md5(str2rstr_utf8(s)), e);}
function hex_hmac_md5(k, d)
{return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));}
function b64_hmac_md5(k, d)
{return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));}
function any_hmac_md5(k, d, e)
{return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);}

/*
                                                                          * Perform a simple self-test to see if the VM is working
                                                                          */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
   * Calculate the MD5 of a raw string
   */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
   * Calculate the HMAC-MD5, of a key and some data (raw strings)
   */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16),opad = Array(16);
  for (var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
   * Convert a raw string to a hex string
   */
function rstr2hex(input)
{
  try {hexcase;} catch (e) {hexcase = 0;}
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for (var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt(x >>> 4 & 0x0F) +
    hex_tab.charAt(x & 0x0F);
  }
  return output;
}

/*
   * Convert a raw string to a base-64 string
   */
function rstr2b64(input)
{
  try {b64pad;} catch (e) {b64pad = '';}
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for (var i = 0; i < len; i += 3)
  {
    var triplet = input.charCodeAt(i) << 16 | (
    i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (
    i + 2 < len ? input.charCodeAt(i + 2) : 0);
    for (var j = 0; j < 4; j++)
    {
      if (i * 8 + j * 6 > input.length * 8) output += b64pad;else
      output += tab.charAt(triplet >>> 6 * (3 - j) & 0x3F);
    }
  }
  return output;
}

/*
   * Convert a raw string to an arbitrary string encoding
   */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for (i = 0; i < dividend.length; i++)
  {
    dividend[i] = input.charCodeAt(i * 2) << 8 | input.charCodeAt(i * 2 + 1);
  }

  /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
  var full_length = Math.ceil(input.length * 8 / (
  Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for (j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for (i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if (quotient.length > 0 || q > 0)
      quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for (i = remainders.length - 1; i >= 0; i--) {
    output += encoding.charAt(remainders[i]);}

  return output;
}

/*
   * Encode a string as utf-8.
   * For efficiency, this assumes the input is valid utf-16.
   */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while (++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if (x <= 0x7F)
    output += String.fromCharCode(x);else
    if (x <= 0x7FF)
    output += String.fromCharCode(0xC0 | x >>> 6 & 0x1F,
    0x80 | x & 0x3F);else
    if (x <= 0xFFFF)
    output += String.fromCharCode(0xE0 | x >>> 12 & 0x0F,
    0x80 | x >>> 6 & 0x3F,
    0x80 | x & 0x3F);else
    if (x <= 0x1FFFFF)
    output += String.fromCharCode(0xF0 | x >>> 18 & 0x07,
    0x80 | x >>> 12 & 0x3F,
    0x80 | x >>> 6 & 0x3F,
    0x80 | x & 0x3F);
  }
  return output;
}

/*
   * Encode a string as utf-16
   */
function str2rstr_utf16le(input)
{
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
    input.charCodeAt(i) >>> 8 & 0xFF);}
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) >>> 8 & 0xFF,
    input.charCodeAt(i) & 0xFF);}
  return output;
}

/*
   * Convert a raw string to an array of little-endian words
   * Characters >255 have their high-byte silently ignored.
   */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for (var i = 0; i < output.length; i++) {
    output[i] = 0;}
  for (var i = 0; i < input.length * 8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;}
  return output;
}

/*
   * Convert an array of little-endian words to a string
   */
function binl2rstr(input)
{
  var output = "";
  for (var i = 0; i < input.length * 32; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);}
  return output;
}

/*
   * Calculate the MD5 of an array of little-endian words, and a bit length.
   */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;

  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
   * These functions implement the four basic operations the algorithm uses.
   */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

/*
   * Bitwise rotate a 32-bit number to the left.
   */
function bit_rol(num, cnt)
{
  return num << cnt | num >>> 32 - cnt;
}

module.exports = {
  md5: function md5(str) {
    return hex_md5(str);
  } };

/***/ }),

/***/ 29:
/*!********************************!*\
  !*** D:/项目文件/米悠/utils/time.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @param {String} str (y-m-d h:i:s) y:年 m:月 d:日 h:时 i:分 s:秒
 */
function dateTimeStr(str, addday) {
  //var date = new Date(),
  var date = new Date(new Date().setDate(new Date().getDate() + addday));
  var year = "";
  var month = "";
  var day = "";
  var hour = "";
  var minute = "";
  var second = "";
  year = date.getFullYear(), //年
  month = date.getMonth() + 1, //月
  day = date.getDate(), //日
  hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(), //时
  minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(), //分
  second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
  month >= 1 && month <= 9 ? month = "0" + month : "";
  day >= 0 && day <= 9 ? day = "0" + day : "";
  hour >= 0 && hour <= 9 ? hour = "0" + hour : "";
  minute >= 0 && minute <= 9 ? minute = "0" + minute : "";
  second >= 0 && second <= 9 ? second = "0" + second : "";
  if (str.indexOf('y') != -1) {
    str = str.replace('y', year);
  }
  if (str.indexOf('m') != -1) {
    str = str.replace('m', month);
  }
  if (str.indexOf('d') != -1) {
    str = str.replace('d', day);
  }
  if (str.indexOf('h') != -1) {
    str = str.replace('h', hour);
  }
  if (str.indexOf('i') != -1) {
    str = str.replace('i', minute);
  }
  if (str.indexOf('s') != -1) {
    str = str.replace('s', second);
  }
  return str;
}

module.exports = {
  dateTimeStr: dateTimeStr };

/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' &&
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"米悠","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"米悠","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"米悠","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"米悠","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent'])
        .call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        })
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 336:
/*!******************************************!*\
  !*** D:/项目文件/米悠/static/ico/in_nav/1.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 337:
/*!******************************************!*\
  !*** D:/项目文件/米悠/static/ico/in_nav/2.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAAAAXNSR0IArs4c6QAABNNJREFUeF7tm0nIXEUQx39/F4wLooTgbvAgCB5ExCRqFMUdRNGDoGguiolKNF7NYozL1Q1XzEVFwYOiCGrcghpjFBEPAQ8iuOCKKOKKS0lhf2G++ea9rp6Z980bZhre6f1fddX/dVdXV1eLaUNTDmiWBDM7BDgGOBg4MD171BD/N/Bjer4BPpb0ddM/amgjwcz2AY4HzgJOAo4FDgL2HMCIv4BvgZ3AduBV4ENJvw0gc86nA5FgZrsBS4GrgAuBRcNUrkLW98DzwGZgh6R/B+2zLxKS8RcA64ATB1VigO/fB24HXhiEjGISzOw44OE0AgbQf6if7gBWSvqoH6lhEtLfXwv4s1c/nTX8zZ/AHf6UjooQCcnpPQFc3LAhwxD/LHBFifPMkmBmewNvtGz458jy6XGGpN9zQH9fS4KZ+fvHnNmIsJZhfOSukGQ5vXIk3JzmWU5OW9+vlXRnTrlKEtIq4MOqjU4wZ9fMe3eWS3OrRk8S0jR4F1gS7a3FuPeAZXXToooEj/6ea7FhpapdJMmjzJ5tDglpFHgkdkJpTy3Gf+CRbdVo6EWCb37eabFB/ap2siTfhM1pvUh4NG2Iop35EuSbmGzMERUYwHmfvnkr6XOzpKuzJKTI8HNgYUARhzwC3Jf2/yUKBcVXwpwEz0+sBq4JCvsBOLJXJDlLcTM7FXgzKPQlSecHsY3BzOxF4LxgB6dJeqsb203CrcCGoMCbJN0dxDYGM7M1wF3BDjZJuiVHwsvAOUGBqyT5lnqkzcxWAg8Fldgi6dwcCV8AhwcFeuePB7FNwq5M+Y1IH19KOqKSBDM7FPgMqEuEdn7/c1oVIp03ifFVYv9gB57IXSzpq078Lp9gZqenLXNQ3tjCfIu9tYqEy4Anx9a0uOKXS3qqioTrgPvjsvBQ1KfPqNviwhD/ekkPVJHgmePbCizyxKYHSyNtZubBUskqtV6SZ6h3tU6f4OvnxgKLrpUUXZoKxJZBzWwV8GDBVxsleTw0JWFKwnQk0Nx0MLMD0kFsVXbX/c92ST8VzN8stFU+wcz8bMIDrrr2uqQzs5YVANpGwqfAURn9P5F0dIGNWeiwSSiNE2YtkWbmqatlGa23SVqetawA0AcJtXFCacTYTcJhQJ2B7iu2SvquwMYstA8SaiPG0r3DuAZLtXuH0l3kuJJQu4sszSeMIwn1+QSffGZWklkaRxLqM0uJhGmO0czWA5uyLvl/wBpJ9wSxjcHM7EYgmvXeIGlOuqA75X4K8HZQ49ckec3iSJuZeW1jNApdLmlbt8LdJHhBZskJ1L2pntBPd+b7BMpPybx+8obgX4idQCW/UHoW6Z/9MwISdg8aPwOLnUUmEqan0tP6hDRwzGyyK1XSlHAnN9k1S4kIr2Ge3Oq1GXdqZl7HPCtHX+iRRw1fJ8nrnWtbrpjTl6GngUtyglr4/hngUkm+fPdPQpoW+wGvBLJGub7m8737s7Ml/RLpNBTlmdmCdNS1IiJ0xBivxfYjwj+ieoRI6Fgx3Ed4LrKNpb5ewuv+y+87ZIu6OwkKk9DhLCf35ksncxN/B6oHGZN5G66XwzGzfdO9SK9+8+r4Yd+L9Gr1Lele5K9RpxfBFfuEiNAO/zFZN2RLyGkbttGR0DZjq/SZkjDPKbHWDoz/ABxc61EFYicEAAAAAElFTkSuQmCC"

/***/ }),

/***/ 338:
/*!******************************************!*\
  !*** D:/项目文件/米悠/static/ico/in_nav/3.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAAAAXNSR0IArs4c6QAABPJJREFUeF7tmnuon3Mcx19v90uJPzTDctmIjai5/OEuJqHWmktTi1AUMo0ScgmpbViWZMulZLklGtLGP/YHI/8wY6OY64blEobx0ft3nt/p+T17nt/l/E6d55zz/dTpd379vs/l83o+9+8jkqDEgATBRpAsIUEYCAbJEhKEgiVExGnALGDHMZwxtgFLJa3N6zjoDhHxHnDcGAbQVG2NpBOrIHwETBsHENZKOipBSBBIlgAJgkNBsoQEYSAlJEvoBOFj4MhxUCeskzS1qk44ZJz0EgFslPRvE0TqIsfJk+/o4ckSkiVsP0+4A5jQ0XZG/4JNku5KXWTqIsdexfgL8B2wGfgd2AfYD9g7+ytz3jFRNns++ArwBvCBpN+KmkbEntmU7BhgJjAD2ClbN6ohvAXcDazOV3vdxOmI8NhwHjAXWD8ax2sbgeslvdyNwu3WRIQHydcCl0ty+dy6+RIRdRy0rgLmSPqhXwDN4yNiB/8v6b/RAGExMF+S9wpKJSL2BdwRHghMAjYBXwAbJH3dLbj8vkOdLOFBSTeWKRERu9k6gIuBkwAHwaIY3BrgdWCZpO/bAakjhFclnV8B4FzgAeCIbp8ysAW4E1iSjwN1rhhtztMk/VSS9pwZbuuj37FVOL78XDx33SxhlqSXSgA8nEX1HgygdOlq4DxJv9bVEpz/TykBMB9Y0K/2uePfAc6U9Gcds8Mlkp7NKxsRJwMuknYeRgg+1SJJhtuQuriDo/dkSX8UILwNGESV/A14QHxsj5B83NGS1tcJgiP3dQUAZwEr2yjnQemlgEF90yMEL39K0mV1gjBb0osFCMuAKyqUc7V3taSlETEZ+GwIEGx1kyRtqYs7HC5pQ1ORiHAMcM/gtrhM5kl6yD9EhCvGljdPegDSiEN1gOBWeEI+WkfEFOBToFHnF+RWSfflgLmCnA7sAZwKXAC4he5GFki6uQ4QXOtPybfHWVawrxelspzOQfE7Vy6pFwITO5B4XtJFdYCw3ZAjIvwCWUuMyJRpsYJ2CkaEXWlFZiVVS1dJOrsOEL7MLGGwW4wIT4I8OSqKA+JVkh7PPfldgRMAV4GbJXnc1pCI2B/wC2n+LJPlkubUAYLnhBMLMcE+/n7FjTs1zpX0TKboQVn77K9bAUN9AXhC0ucRcQbwZkXPsVDSTXWA4AmPIbh5aj5BD0qtzF4VIP6y33vaFBGeJTiTFHfTvOYx4HbgyWzWWDzdDEkr6wDBNzazOD6LiOeAC9v4vfO8W2tXfd+26S49V7gXKI7n3GIfIGlrXSCUVYxVcSHPxYq8m8FoFyefBs4BPIlqymJJN/hLXSC44psq6Z+cSzjVueMbjrds3TH63E33squ4d2gUaHWB4Htxn/9a/nFGxOlZF9nv7rnjjiHskp3/fkm3NK9VJwilY7WIeAS4pp2t9/jbOuB4Sd6xakgewki/s+SnZWvwGGxQIsI7R8uB2T0qW7b8Kw9nJflzUPIQHEEbgWIExalueslcwT2Ey2DvIg1VPnRfIcmpt0VafC2jPtSLDMdxVnZbfmOkYBVujhYBh/VwMafSJcA9ZfuWLe7Qw0lHdGlE7A5c6a054ODcRmvxvmzyriofleQmrVL6jbojBiTbTjvUqS6D4U0Yj81+BD5x2S3J3zvKqIXQUbMeFiQIfezm9MC5/kuTJSRLGLDSZAkJwoAl/A8Ri/lRgsNX/gAAAABJRU5ErkJggg=="

/***/ }),

/***/ 339:
/*!******************************************!*\
  !*** D:/项目文件/米悠/static/ico/in_nav/4.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAAAAXNSR0IArs4c6QAAAyxJREFUeF7tms+rTVEUxz9L+AswVYYMjMiQJ2Rg6qGQ0jMQMpAwoEiGSBEpHmXyMvEjykAZ6ZkoTEgIkzeQDBhgab17vI7dve/ce86+Z++y7vDee9Za+7O/a+299j6CfxBnQBoIqnoGOBxMwLiI7EwxKUmUoKqngSPBgK+JyC6H4BBwJYBDsFLgSnAInSXBleAQXAkz2yNPB0+H/zQdTgDHgz7hsojsSdI7qKo1LYdadr4QWBD4/Ap8bjGOkyJyy/yJqu4FLrToPBdXu0XkqkNwCLgSoBrCc+AgMG8ICfwb2AFsD2zfBi4CcyL7/AWcAlYFdiuVMCkiKyMHM2NOVS2oY20dr6nqA2BDbhBaPWNU1YfAeofgEBIrQVWttnwRkdd/5djPkbuqWuGcEJHvTWtT0nRQ1RWAFSXbEq8WkQ82oCoIqrofOAfcAUabgkgGQVWXA49KPcK7AsT72SCo6gHgbGn2DcRmEflRVxFJIBQKuAssCgJ/C4wAY8DR4LdLwIsefcw9YKuIfKsDIhWEbXZI0mOz9QZ4bDu2YED2/ZIemyWrJ5ZOtbrMJBCKvN8CXAfm15m90jMGZ42IfKxrJxmEAsTWQhF1QZgCRpoAKOJIu1lSVQNhihi0DzEFWAp8qquA0pKcFkIpNW4Ac/scUDQAWSihNBujwHgfNcJSwGpAYwVkpYRSMFU1IkoNCNWWtDB2k/4sNSJqCpR9ZwehR40YGoCsakIXiVqNsFXD+omoNSD7dAhkuhSYEpGpPleNWn/LMh1qjaTBQw6h07qn3yw1mMQoj9aF8AxYGyWCPIxMAOuCUCqP3KdXljzijxJFtzd3+4IQxXvGRhxCP9dwGU9gtNAqlWD3hVYTkrwFH22YHUM2DrvfDMdSCWES2FTjICRy/FHM2YXszeKAt2ywGsIwL2SjDG0AI3X3CUO9lR4g/ih/dQi+bS4qY83e4amIhG92RJFmCiOqeh/YOOi22a67Xg3h1ZkUDMzn4i5XgpWrQ6pg2/TrEHzb3NHbP0rYB5xvU4eZ+BoTkSsWi73bvMzu/ICfmQTXRhjWRzwRkZfTENrwmLsPh+BK6Gj0Dw/HWmCfoRB7AAAAAElFTkSuQmCC"

/***/ }),

/***/ 340:
/*!******************************************!*\
  !*** D:/项目文件/米悠/static/ico/in_nav/5.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACGCAMAAAAvpwKjAAAAAXNSR0IArs4c6QAAASxQTFRFAAAAgID/Var/Zsz/Var/YL/fVarjYL/vWrTwXbnoXLjrXbnwV7bwWrjsW7ruWrnvXLfrWbjtW7juW7ntW7jtWrjsWbnsWrjtWbjtWrjsW7ntWrftWrjtWrntWrjuWrjuWbjuW7jtWrftWrjtWrjtWrjtWrftWrjuWbjuWrnsWrjtWbjtWrntW7jtWrjtWrftWrjtWrjuWrjsWrjtWbjtWrjtWrntWbjtWrjtWrjtW7jtWrjtWrjtWrjtWrjtWrjuWrjsWrftWrjtWrjtWrjtWrjtWrjtWrjtWbntWrjtWrjtW7jtWrjtWrjtWrjsWrjtWrjtWrjtWrjtWrjtWrjtWrjtWrjtWrjtWrjtWrjtWrntWrjtWrjsWrjtWrjtWrjtWrjtWrjtWrjtWrjtvFHlDwAAAGN0Uk5TAAIDBQYICRARFhkhIzY7PkBTWmJlbHt9j5aYmZucr7Cxt7m6u7y9vr/AwcLHyMrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+mXsy1wAAA1xJREFUeNrtm+lT2kAUwK32sLZa7aGttZeVYtWqHI0gNwQIBhJyABJCIHn////QNOh0Xx2/dGZZZvp+n3Z3dia/YY/3dhOWlgiCIAiCIAiCWAxeJkEYpTe3FlsglK2ZxXpXrEZ3PdLYA8HsRRpnYcnYfi2EbSN8+Fmk0QhLx6JWx3H48EZUksNSfFmMxXI8fLgcFWth6WhFjMbKUfjwGmmQBmmQxj9rHIrazA+RxsnmxgsBbGyeII2pN/YEMPamSEMoC6fhi1LwkUZi94MQdhOLuGBpF2U1vi8thMbXzVdzOxRsrd2r0ZnMcZGerd2nMV/eLYbG8WJoxBdD4xtp/G8abr44Qg1mzsA9zMsad42JqpcHbIMt6efYS262mrw13CSYQ6YeGBpkHbbHVQucNm8NpwFSm61L4PQDtke1AiXug1LwoOcydS8HGR39XOpomuGu8dNXVJTpDkHpsQ2dC+i6vDUsHToKCqS+1sHrpAYp7hpJbWKjqdKCehWNSQWCWULBU0Nxu2m2LlmBMUZep1Ab8N6+mk0YWmjG2vYlHrUeFHTeGrVKkEPzUYVeEyddk9Eg4Kzhai4U2IZ8Huq4SyWolHnHlKskaOymMdGHkxTqUe+BZfHWsBs3i/GGdhasIeqR7l7LvCPs6DKMbGx2b5UgjdaJ1w36Od4a4wTk2aDutcK146G5UgTT5a3RHUCJfUnl/IAGHpOO6ie4pz2nvqWxdyQjE7JoJ7dkGCu8NQI53DfYhtTEM9BBUE9Dfsxbo2SDhgJKOaggLd8aQGbEWyNj9ktsvT0AHF2dJBimz1ljYAZmEaUexjXeQsdlkHTemXmpCkqAttCpfYF6VD2/2eetYVrTcxQ9ZND7qEfKV1q8zymWAn2UdKqqj+NJmAKwKRAfDeMSsuzqHKiBi/IuyPa8qwlnDd/xIc+GNS0HRRdnZmNb4n14dCVoojHRCiDh05o6UjXeGn5HrqPDmVNVHHz7beTVORylrb/FendOdAHdb5AGaZAGaZAGaZAGaZDGXY3G3DVif15Lx+D2e9Hq3DX2Hzya8fDp7xugaqSxP3eNxsdYLHYQ8iX6snw/0tgBwexEGqufxFp8Xp1Nk2cFkRaV57fT9fHbg0K9JgC5GH//hP58QRAEQRAEQQjlF/iFO/LpKo6jAAAAAElFTkSuQmCC"

/***/ }),

/***/ 341:
/*!******************************************!*\
  !*** D:/项目文件/米悠/static/ico/in_nav/6.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 342:
/*!******************************************!*\
  !*** D:/项目文件/米悠/static/ico/in_nav/7.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 343:
/*!******************************************!*\
  !*** D:/项目文件/米悠/static/ico/in_nav/8.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 416:
/*!************************************!*\
  !*** D:/项目文件/米悠/static/upcard.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAAEDCAYAAABUEFHxAAAAAXNSR0IArs4c6QAAIABJREFUeF7t3X2sJXd93/HP9/ebsw9+2PXDrr01ZtMACRBUKxCISgnFJlRIaUiDgo1TNYldSvJHIrXKg+V4AwXTUEyrqEqVSigCu2oKiVEbluSPkFiYJlBobGgt8+AoJsbGLOvHZXdt79575vf7VnN273q9T3funDlnzsx53z8Msmd+D6/vb+7nzpw5M6ZTf9zt6s/dsfniTdu3bdpsF2bZedGtcAt22rb8CwQQQAABBFoWiLHMPo7jHNLR1RU/fGD14KHPXX3Disz85K5eEErX3nln1Ku2bddzKzvleWsIOUQLlgmvlstDcwgggAACZxUYS6HInjx7ziHLwhGdt/kJfe3QwU9ed11a2+9EgP3IRz4y+oHX7dpprh1ealO1QdUAxAgggAACCHQlkMtjV/+s0Kqbntx/cNvjn7vmmnLy76p/XOt3Rn1Ru1SMdkYPBcHVVanoFwEEEEDgTALVlcBU5jKuhsfTvpXHqjMxk7td+/XPXFwcXbmyOvMivFg8CCCAAAKLKFCdjVVnYkfL9J0//tG3P21X3337lp0XXPJ9o5AvWMQBMyYEEEAAAQTWBCYhFsfPfPfw4W/Z2+/7n5cVK3YFlw5ZIAgggAACiy5QBViyXJabfZ9d++W9LwsetkUruU1+0SvH+BBAAAEElLzwbPmQXXvvp/7ByHxy1yE/CCCAAAII9EFg7LZq19+z99WKisG5Zb4PRWOMCCCAwLILTL6bnJTsnff+yWss5ECALfuSYP4IIIBAPwSqAPMcMgHWj3oxSgQQQACB4wIEGEsBAQQQQKCXAgRYL8vGoBFAAAEECDDWAAIIIIBALwUIsF6WjUEjgAACCBBgrAEEEEAAgV4KEGC9LBuDRgABBBAgwFgDCCCAAAK9FCDAelk2Bo0AAgggQICxBhBAAAEEeilAgPWybAwaAQQQQIAAYw0ggAACCPRSgADrZdkYNAIIIIAAAcYaQAABBBDopQAB1suyMWgEEEAAAQKs4zWQPHtWHLf1HraqoEFpFKsXvfGDAAJnFeDY6//iIMA6rGF1ACmPokK6WB5jK0OxlJTjAYVxIsRaEaWRAQpw7A2jqARYh3Ucu61a0hUW9CELtrONoXj2JzzrZo/aNzLf1EabtIHA0AQ49oZRUQKswzqm7CuusNvMPmrSrlaGYno8B7/RyvxIDLa5lTZpBIGBCUyOvSLsDtlul+uyNqbn0n53f5eJY68NzzptEGB1lGa0TXUQScWLLfjvy/Uil0qTnpRUytToMyzOwGZULJodlEArZ2Aul1S4tMOkQqbveLZ3S+W3+eNxPsuFAJuP8xl7OTXAJO2X55vk2ucWm13+4zOwDitK130RaOMzMPO0KtMVsvBhVVdQCLC5l58Amzv58x2eIcAeVc43hFHxSCrHjS7/cRdihwWl614JTHsXYixGK3lc7lYId0i6kgCbf/kJsPmbn+jxtADjL7gOq0HXCGxMgON3Y16z2JoAm4VqzTY5AGpCsRkCCyjA8dt9UQiwDmvAAdAhPl0jMKUAx++UgC3sToC1gNi0CQ6ApnLsh0D3Ahy/3deAAOuwBhwAHeLTNQJTCnD8TgnYwu4EWAuITZvgAGgqx34IdC/A8dt9DQiwDmvAAdAhPl0jMKUAx++UgC3sToC1gNi0CQ6ApnLsh0D3Ahy/3deAAOuwBhwAHeLTNQJTCnD8TgnYwu4EWAuITZvgAGgqx34IdC/A8dt9DQiwDmvAAdAhPl0jMKUAx++UgC3sToC1gNi0CQ6ApnLsh0D3Ahy/3deAAOuwBhwAHeLTNQJTCnD8TgnYwu4EWAuITZs49YWWvBCvqST7ITB/AY7f+Zuf2iMB1mENTn2pHi+j7LAYdI3ABgU4fjcINoPNCbAZoNZt8rSX6vEyyrp0bIdA5wIcv52XQARYxzU4+aV6vIyy42LQPQIbFOD43SBYy5sTYC2D0hwCCCCAwHwECLD5ONMLAggggEDLAgRYy6A0hwACCCAwHwECbD7O9IIAAggg0LIAAdYyKM0hgAACCMxHgACbjzO9IIAAAgi0LECAtQxKcwgggAAC8xEgwObjTC8IIIAAAi0LEGAtg9IcAggggMB8BAiw+TjTSw2B5IWbZw+ePRWFazxWKKJL4xp7s0m7AqPJY3piWdrkl0T1/620dvugNQSmEyDApvNj7xYEJo/jySEXMeRynEdhFEeePcoVg+VgIQZPiV+eLViv14TF6J4t55iz55SVlKLi2JXGGo2kvBqjBWqxHiT/fS4CBNhcmOnkTAJrwRWKwm0lbfGRbzfZK1y226SL5L5dwS6Q6wJJI5ccydkJmGRyJZmeddNhkx0y94Muf1Syb1gKT5dWHqnqRZDNrg60XF+AAKtvxZYtCVSXCmMsc1p1l/vWUGza5UpvcNmPSXqppC1yLxQsVGdhkuLklysB1lIFztqMVX8kmCvLlCQll6pT3xV3/7aZfUnyv8puD7vnZ6tWQigClxZnXRbaP5sAAcbamKtAddYVc8jjqGihuNxS/nGT3urSbjOdL1eY64DorJbA8bPfI5I/LoW7PKe/KKz4Vopa4WysFiEbzUCAAJsBKk2eWaAKr2BF6fLtOdvrzfRTcl1lNrlEyOcq/Vk4z0l60N3/xOR3WQhPe1QMKfPHR39qOIiREmCDKOPiT2ItvCTbkd3fIdfbzbSzujy4+KNnhKcKTM7I3A+Y6c/cwx8ol/sUnRs8WCpzFSDA5sq9nJ2dOPOysFOeb5DrbZK2L6fG4GZ9xKW/NPOPeJn/zjbHwJnY4Gq8sBMiwBa2NMMYWHXDhoKSedqmbDfI9A5J24YxO2ZxXGDV5XcFt/+koMeylwW32rM25iFAgM1DeZn7SEpJeWSx+Am5fkXSjmXmGOrcXTos94+77L9ZTM9Et2Koc2VeiyNAgC1OLQY3kurSocKmFOQ/lLP/W0k/ePx2+MHNlQlNBPa7220m/1/V01NCiNzUwcKYqQABNlPe5W48lV7mUXFRzPlXJPspSZuWW2TYs598h0z2BZc+EMz3Zw8F3xEbds27nh0B1nUFBtp/9Wio6vl5Znq9cn6PTJdvfKrVKZwdNb7AvHG6KfZwqTDTqOF38g5m998Lpk+n7CujyF2mU5SCXdcRIMBYIjMRqM6+3OL2EPTLLv9pk23k7Kt6EsRBd/2NSffLtepVFPIzY4GK3YK7LjKzl0j+ErkultUPoWNP8vAvWbBbJe3jLGzGJVvy5gmwJV8As5j+2mdfyvkHJX2wejxU/c++fCzZ/ZI+JekrivFAcvdY8jDfWdTqjG1GxZx1YQjh5XL/SUn/UNJ5dft36Qkzf797/OLk7QKBLzjXtWO7jQkQYBvzYusaArl6inkexRz1T4L0G5IurrFb9ajDsRTuVs4fC9EfdIVxtmSx5Oyrnt/0W629xqZqKW8yK3LY5dKNclWfYW6p2cOzcr+jdH3c5M9xGbGmGpttWIAA2zAZO6wnkMxLT/GCUP3ik/9zmW1dbx+Zsrt/XbJbs/wBZY88KHZdtZltsPbAZbc0Tql4SVB4j9x/pHp+73qdulT9yXGXLPxHH4+fjAW31K9nxn9vJkCANXNjr3MIVGdOSnaxB/8Nd73VTHW+E/SMy2/PRfyDsDJe4ZfegiyxpDTOiqGwf2qyf1PzbLp67c39nvV+FeGbyorcjbgg9RzYMAiwgRV0EaYzefmhNu1w9/e79Iaan399V57fJ4V7qjnwuckiVLJ6n0rhwXLpWX9/8nmm6YfqPHjZpUc8a4+Piq+GdDTwZI7FqOfQRkGADa2iCzAfc1tNIV6mnG6TrLrsVOfnAc9pT4jxQe5cq8M1v22qP0iSjy4NsvdK+R9LVucy4n4z+01lv8+tNAJsfvVapp4IsGWq9pzmWgXY2IvLg6UPS3p1nW69uuRkvifKHibA6ojNb5vqkrDnfInL9pjZNTXfIPCY3PZI/hUCbH61WraeCLBlq/gc5kuAzQF5jl2cOAOrAsn8agJsjvh0dU4BAowF0rpAowBz/6qHeEtU5gys9YpM1yABNp0fe89OgACbne3StkyADav0BNiw6jmk2RBgQ6rmgsyFAFuQQrQ0DAKsJUiaaV2AAGudlAYJsGGtAQJsWPUc0mwIsCFVc0Hm0ijAqof2mt1Syh8peA3HglTy2DCeDzDfIzNu4lio6iz3YAiw5a7/TGbfMMDuc/dft5C/ExRHMxkYjTYSyErj4MWlrvweuf14zafTcxt9I2122ogAAbYRLbatJdAkwCT/hmf77az06LHHSNV5+lSt4bDRlAJZeWwpXSzFXzXTG7iNfkpQdm9NgABrjZKG1gSaBZgOuenrQXomu6JVL/flZyEE3Kw0TV5w+UqXdtZ8NBhnYAtRvWEPggAbdn07mV3DAKveheiSVQ+CrT55IcA6qd6ZOj1WE5dCzfCqNifAFqZ+wx0IATbc2nY2s4YB1tl46XgmAgTYTFhp9GQBAoz10LoAAdY6aR8bJMD6WLWejZkA61nB+jBcAqwPVZr5GAmwmRPTAQHGGmhdgABrnbSPDRJgfaxaz8ZMgPWsYH0YLgHWhyrNfIwE2MyJ6YAAYw20LkCAtU7axwYJsD5WrWdjJsB6VrA+DJcA60OVZj5GAmzmxHRAgLEGWhcgwFon7WODBFgfq9azMRNgPStYH4ZLgPWhSjMfIwE2c2I6IMBYA60LEGCtk/axQQKsj1Xr2ZgJsJ4VrA/DJcD6UKWZj5EAmzkxHRBgrIHWBQiw1kn72CAB1seq9WzMBFjPCtaH4RJgfajSzMdIgM2cmA4IMNZA6wIEWOukfWyQAOtj1Xo2ZgKsZwXrw3AJsD5UaeZjJMBmTkwHBBhroHWBRgHmSjI9K1NyF+8Ca70qzRu04y9qM/n5UvW27Fr1IcCak7NnTQECrCYUm9UXaBZg/qib/ZHLn5BsVL83tpy1gGUvFcJWc/8ZmV4pKdTokwCrgcQm0wkQYNP5sfcZBJoEmJvdF+Q3lynvD8qj6g32/CyGQFYaK/ol0ePNcr1ZplhjZARYDSQ2mU6AAJvOj73bCjD3+1262ZQfyYUVsazeXs/PIgi40ji7Lg0Wf8tM10gE2CLUhTFIBBiroHWBRmdg7l812R4L+lb2UEQrCbDWK9OswSrAko8uDW57ZH41AdbMkb3aFyDA2jdd+habBpiHeEtUfpgAW6wlRIAtVj0YzfMCBBiroXUBAqx10k4bJMA65afzcwgQYCyP1gUIsNZJO22QAOuUn84JMNbAPAUIsHlqz74vAmz2xvTQTIAzsGZu7HUOAQJsWMuDABtWPYc0GwJsSNVckLkQYAtSiJaGQYC1BEkzrQsQYK2T0iABNqw1QIANq55Dmg0BNqRqLshcCLAFKURLwyDAWoKkmdYFCLDWSWmQABvWGiDAhlXPIc2GABtSNRdkLgTYghSipWEQYC1B0kzrAgRY66Q0SIANaw0QYMOq55BmQ4ANqZoLMhcCbEEK0dIwCLCWIGmmdQECrHVSGiTAhrUGCLBh1XNIsyHAhlTNBZkLAbYghWhpGARYS5A007oAAdY6KQ0SYMNaAwTYsOo5pNkQYEOq5oLMhQBbkEK0NAwCrCVImmldgABrnZQGCbBhrQECbFj1HNJsCLAhVXNB5kKALUghWhoGAdYSJM20LkCAtU5KgwTYsNYAATaseg5pNgTYkKq5IHMhwBakEC0NgwBrCZJmWhcgwFonpUECbFhrgAAbVj2HNBsCbEjVXJC5EGDNC5G88OZ7b2zPaKXV2YMAq6PENl0IEGBdqA+8TwJsYwVOnj3nkIsY8sb2nG7rXCbLZhZCDtHCWcOMAJvOmb1nJ0CAzc52aVsmwOqXvgquKsDkvjWanacQtriZSWX9Rja8ZSFP2aLZUcXwjKd8VBrLbbOd6ayMANswMDvMSYAAmxP0MnVDgNWrdo4hexlM7i8O5tdk06vMdalLQdIsLyVWZ1tBrgNm9v+k/H+Cxwez8tgtnBZiBFi9erLV/AUIsPmbD75HAmz9EldnXtVW2XRVMP2i3K+SbKukuP7ebW3hWbLn5Ho4m/57kH82RF9RfuEYCLC2vGmnbQECrG1R2hMBdu5FMLlRI42Tol1uZjfJ7U2Siq6Wjktu0t961q1xlL+W0gs/EyPAuqoM/a4nQICtJ8R/37AAAXZuspxTdrfCwujN8nyTzC7ZMHL7Ozwr2UdTKv9QZkdG8fmzMAKsfWxabEeAAGvHkVZOEiDA1jkDs6I0s/M9lz8vt58z6byuF5BLpbnukvJtFsLTpjxaGxMB1nV16P9sAgQYa6N1AQKsToCl85Xs51z6+UUIMLmSme5yzx8iwFo/JGhwRgIE2Ixgl7lZAmz9S4jKo+hB15jZzZIvwCVEe1bud8j940n+HJcQl/kI7s/cCbD+1Ko3IyXA1jkDO/kmDg+3yPRj87378LTxVV9E+5rcPhiL/AA3cfTmUFv6gRJgS78E2gdoFGDS/Z59T4z2cPZQ1H3MUfujn0+L1W301XeuzP21Un63zF5RfZlZwarvhc1nEFKS2Ypc35T7f/UifN5KL6snc5w8gOc/A/M9Mru6Ztg+Jrc9kn/FrbRzPeljXpOln+EJEGDDq2nnM2oUYO5f9aBbopYjwKoiTR4hZcGCwveZ+5ske6WkrTKlWRbRs44/NsoOmuWHsoUvWNJDZl6e7YvMnuMlHsIec11DgM2yOrS9EQECbCNabFtLoAqwFOJlSvnfy/S6Oju59KCkW3LOfxtCEYZ+BrZmsvYoqcJ9a6lia4ipcLeZPhMxqnpUVRVDtlrKVlWWR6ozpDOFV7VZdQYmbdrh7rdKev3kKR7r/vh3lf0WWbiPM7B1sdigoQAB1hCO3c4uMPmFV4YdXsT3yvXGer/w9JS7bsspfzbGlEOINX5JDqMKJz/Mt3rAbijizK8hrvVTVtTneJjv5DmNYVMyT6+Q229Leom0dgZ3jjXgeshle7yI3wjp6DkfFjyMKjKLLgQIsC7UB96nK4yT6SJL+tdm+klJm2pMedXdP2OKvxMtPVUqjfjcpIbajDdJpZcx2Oak8A4z/ZKkbet1WT3ZQ657PYQPmOmR6tFUy3JGvZ4N/71dAQKsXU9akzROStUNCUWM73TTu+S6oAZMddbxlKTfTZ4/s8nsSPKyONsT0mu0xyZTCEzOvJKlyetWzK4y2U0KeqW8zuVDrbrrT035P3v2A7Gwzh6TNQUBu/ZAgADrQZH6NsTJ5zrVpalC/8gU3itpR505TP5yl77pWR+LSv+7zPZMMQrj6lUf/MxXoEwx2Cicb0lX6diXrV+7gec1HpL0e5LvPdPDgec7E3obsgABNuTqdjS3ycNqq6uIOV4p1wfc9MNW43OTyXBNWa6nZPorN31BKX3TFZ4N7l6dDXQ0paXpNoaQU87V2y2vMLM3S7pGrhfJNvKUfH/UXXtMdj83cCzN0ulkogRYJ+zD77S6jBhVvaDR/oVLv9DgcUmrkh922QFzf1qmFZctzY0dXa0QU3Xt0EYm+3uSXza5rX9jP6Vcf5FN/yGanjr5mYoba4atEVhfgABb34gtGgis3VkXY/Fy9/zvJL209lnY6f25qq/3Vv/kZ6YCk69R++Q++4bW/rjLPpgtfz7mkE/9UvRMB0/jSydAgC1dyec34eosLMS4xaTrPPu/MtOF8+udnuYt4NKKSXtTtv8SvPweN2/MuwLL1x8Btnw1n9uMq7OwYEWZ3XYF+c2uydMmuAw4twrMr6NjN+D4A3K7VTF8Q3k18jWI+fkva08E2LJWfk7zXnvSRCzCa5R1s6SX1fki7JyGRzdtCbgek/x3Fe3PQ5lLnfRCzLa6oB0EThUgwFgTsxdISmkUR578LUH+Sy7b3fwzltkPlx42LHDA5Z/Iyp8IYXSYLy5v2I8dGgoQYA3h2K2+QHVbfcxldXP2ZmW9Uabq6esvrflQ2PodseVcBaprhiY9Kel/yPMfVV9aVnQuHc61CsvdGQG23PWf2+zXQiwpjsz0asl/4fj3w86b2yDoqDWB4zdsPCTpkznrrhj1vexlwederRHTUA0BAqwGEpu0I1CFmPmKjzVSdL8yBHubS2+V6XJzbW6nF1qZsUD1WJQDcrtbZp8OXj6YYrHCTRszVqf5MwoQYCyMuQtMXuaYU/YQLwjBXuXub5Gqx07pIpfO4/OxuZdk/Q5dR2U6KOlek+52z1/2WByIZWlpiV5/sz4UW8xTgACbpzZ9nRBYe01H9Zd7znahmV4aLL5OZq9X9l0ybZk8e88VZR6PfbeWn1kLHHsddKheqJkkr/53pXrIsrvfI/MvusIDbvlQ9fUIq76nnF749uZZj4/2EThZgABjPXQqsHY2ljeZKcULzHSFebrc3HYp2HZJ25W1zYNGcpv5e7I6xViAzqtHSUk6LFVnW37QLOxPOT0WwuhRxfSMr6RcBRdvCViAYjEEEWAsgoUQyDHksJp9PNqkyecpXn0DWnEUQqhuy3ZLZnH2L3pcCIyOB+Ges4Kql+Kk6kxrHCwFz27HX37Z8fDoHoETAgQYi2GhBKpLi+aFhyJ79RaV5O7zeEPxQiF0PJjqbc0ajVR9vjX5BWGlcXdhx0Wh+zMKEGAsDAQQQACBXgoQYL0sG4NGAAEEECDAWAMIIIAAAr0UIMB6WTYGjQACCCBAgHW8BiYvflQcV3d5VcUISiM+MO+4KHSPQE0Bjt+aUDPajACbEWydZidf5s2jqJAulscoS0k5HlAYJ0KsjiDbINCdAMdvd/ZrPRNgHdZg7LZqSVdY0Ics2E7P/oRn3exR+0bmmzocGl0jgMA6Ahy/3S8RAqzDGqTsK66w28w+atIul/a7+7tM+ZFYvXqEHwQQWFgBjt/uS0OAdViD6gCQihdb8N+X60UyfcezvVsqv02AdVgYukaghgDHbw2kGW9CgM0Y+FzNcwB0iE/XCEwpwPE7JWALuxNgLSA2bYIDoKkc+yHQvQDHb/c1IMA6rAEHQIf4dI3AlAIcv1MCtrA7AdYCYtMmOACayrEfAt0LcPx2XwMCrMMacAB0iE/XCEwpwPE7JWALuxNgLSA2bYIDoKkc+yHQvQDHb/c1IMA6rAEHQIf4dI3AlAIcv1MCtrA7AdYCYtMmOACayrEfAt0LcPx2XwMCrMMacAB0iE/XCEwpwPE7JWALuxNgLSA2bYIDoKkc+yHQvQDHb/c1IMA6rAEHQIf4dI3AlAIcv1MCtrA7AdYCYtMmOACayrEfAt0LcPx2XwMCrMManHYASI8q5xvCqHgkleNGT6PnpZgdFpSueyVw8ssomww8FqOVPC53K4Q7JF3Jw7ibKE63DwE2nd9Ue58hwPbL801y7XOLzd4Hxksxp6oJOy+HwGkvo2wwbfO0KtMVsvBhSbsIsAaIU+5CgE0JOM3upwaYS6VJT0oqZbImbfNSzCZq7LNsAqe+jLLR/F0uqXBph0kFAdZIcaqdCLCp+Kbb+dQX4k3X2vG9TY/n4DdayUsxW/GkkUEKTI69IuwO2W6X67I2JskLadtQ3FgbBNjGvFrdupW/Ak8ZEWdgrZaIxgYqwLE3jMISYB3WsY3r8KcNn8/AOqwoXfdFgGOvL5U69zgJsI7rOO2dUKcOn7sQOy4o3fdGgGOvN6U660AJsP7XkBkggAACSylAgC1l2Zk0Aggg0H8BAqz/NWQGCCCAwFIKEGBLWXYmjQACCPRfgADrfw2ZAQIIILCUAgTYUpadSSOAAAL9FyDA+l9DZoAAAggspQABtpRlZ9IIIIBA/wUIsP7XkBkggAACSylwIsB+9kt7rypDDkUMeSklmDQCCCCAQK8EypRDkUO2n/3rT78pBQ8xGAHWqxIyWAQQQGA5BVL2ELNlu/6eT+1102bJxstJwawRQAABBPol4CNzrdj1X9572F1bTJOXtPGDAAIIIIDAQgu4ZGY6atffu/eIpC0LPVoGhwACCCCAwAsFJgH2nKStyCCAAAIIINAjgSMEWI+qxVARQAABBE4IEGAsBgQQQACBXgoQYL0sG4NGAAEEECDAWAMIIIAAAr0UIMB6WTYGjQACCCBAgLEGEEAAAQR6KUCA9bJsDBoBBBBAgABjDSCAAAII9FKAAOtl2Rg0AggggAABxhpAAAEEEOilAAHWy7IxaAQQQAABAow1gAACCCDQSwECrJdlY9AIIIAAAgQYawABBBBAoJcCBFgvy8agEUAAAQQIMNYAAggggEAvBQiwXpaNQSOAAAIIEGCsAQQQQACBXgoQYL0sG4NGAAEEECDAWAMIIIAAAr0UIMB6WTYGjQACCCBAgLEGEEAAAQR6KUCA9bJsDBoBBBBAgABjDSCAAAII9FKAAOtl2Rg0AggggAABxhpAAAEEEOilAAHWy7IxaAQQQAABAow1gAACCCDQSwECrJdlY9AIIIAAAgQYawABBBBAoJcCBFgvy8agEUAAAQQIMNYAAggggEAvBQiwXpaNQSOAAAIIEGCsAQQQQACBXgoQYL0sG4NGAAEEECDAWAMIIIAAAr0UIMB6WTYGjQACCCBAgLEGEEAAAQR6KUCA9bJsDBoBBBBAgABjDSCAAAII9FKAAOtl2Rg0AggggAABxhpAAAEEEOilwBG7/p69B2Xa1svhM2gEEEAAgWUVeNbeee/eh03avawCzBsBBBBAoJcC+6oA+6ykN5pU9HIKDBoBBBBAYKkEXCpN9nm77t69v2XSr5l00VIJMFkEEEAAgV4KuPQ9U/4d+5kv7b1qVNjHXP4ak6yXs2HQCCCAAAJLIeCSS/q/wXSjXX333Vsuv/DQjSZ/n2SXLYUAk0QAAQQQ6KmAP+6y9209/PTtkzOua//yzp1h6+ZbzPQvJe5I7GlVGTYCCCAwdIFDcv+oWfzgJ177tidPXDK8/q8/9WKZ3aSg69y1k8uJQ18HzA8BBBDoh0B12dCkJ2W6U8lv+8Mf/elvVyN/wWde137lzp3Rt7xd7jdKerlLF3J3Yj8KzCgRQACBoQl4GMnpAAAAWklEQVQcu9tQhyX9jcxuT3b0jz/5muueWJvnaTdt3PDQ7VuOHNr5Mq2W/8xMb6mCTLLqi85haDjMBwEEEEBgIQWy5Ieq4HLXXdpU7N267YkH7/j+G4+ePNr/D2QQpXHLDkGkAAAAAElFTkSuQmCC"

/***/ }),

/***/ 5:
/*!*****************************!*\
  !*** D:/项目文件/米悠/pages.json ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 600:
/*!*******************************************************!*\
  !*** D:/项目文件/米悠/components/pick-regions/regions.json ***!
  \*******************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"code\":\"11\",\"name\":\"北京市\",\"childs\":[{\"code\":\"1101\",\"name\":\"市辖区\",\"childs\":[{\"code\":\"110101\",\"name\":\"东城区\"},{\"code\":\"110102\",\"name\":\"西城区\"},{\"code\":\"110105\",\"name\":\"朝阳区\"},{\"code\":\"110106\",\"name\":\"丰台区\"},{\"code\":\"110107\",\"name\":\"石景山区\"},{\"code\":\"110108\",\"name\":\"海淀区\"},{\"code\":\"110109\",\"name\":\"门头沟区\"},{\"code\":\"110111\",\"name\":\"房山区\"},{\"code\":\"110112\",\"name\":\"通州区\"},{\"code\":\"110113\",\"name\":\"顺义区\"},{\"code\":\"110114\",\"name\":\"昌平区\"},{\"code\":\"110115\",\"name\":\"大兴区\"},{\"code\":\"110116\",\"name\":\"怀柔区\"},{\"code\":\"110117\",\"name\":\"平谷区\"},{\"code\":\"110118\",\"name\":\"密云区\"},{\"code\":\"110119\",\"name\":\"延庆区\"}]}]},{\"code\":\"12\",\"name\":\"天津市\",\"childs\":[{\"code\":\"1201\",\"name\":\"市辖区\",\"childs\":[{\"code\":\"120101\",\"name\":\"和平区\"},{\"code\":\"120102\",\"name\":\"河东区\"},{\"code\":\"120103\",\"name\":\"河西区\"},{\"code\":\"120104\",\"name\":\"南开区\"},{\"code\":\"120105\",\"name\":\"河北区\"},{\"code\":\"120106\",\"name\":\"红桥区\"},{\"code\":\"120110\",\"name\":\"东丽区\"},{\"code\":\"120111\",\"name\":\"西青区\"},{\"code\":\"120112\",\"name\":\"津南区\"},{\"code\":\"120113\",\"name\":\"北辰区\"},{\"code\":\"120114\",\"name\":\"武清区\"},{\"code\":\"120115\",\"name\":\"宝坻区\"},{\"code\":\"120116\",\"name\":\"滨海新区\"},{\"code\":\"120117\",\"name\":\"宁河区\"},{\"code\":\"120118\",\"name\":\"静海区\"},{\"code\":\"120119\",\"name\":\"蓟州区\"}]}]},{\"code\":\"13\",\"name\":\"河北省\",\"childs\":[{\"code\":\"1301\",\"name\":\"石家庄市\",\"childs\":[{\"code\":\"130102\",\"name\":\"长安区\"},{\"code\":\"130104\",\"name\":\"桥西区\"},{\"code\":\"130105\",\"name\":\"新华区\"},{\"code\":\"130107\",\"name\":\"井陉矿区\"},{\"code\":\"130108\",\"name\":\"裕华区\"},{\"code\":\"130109\",\"name\":\"藁城区\"},{\"code\":\"130110\",\"name\":\"鹿泉区\"},{\"code\":\"130111\",\"name\":\"栾城区\"},{\"code\":\"130121\",\"name\":\"井陉县\"},{\"code\":\"130123\",\"name\":\"正定县\"},{\"code\":\"130125\",\"name\":\"行唐县\"},{\"code\":\"130126\",\"name\":\"灵寿县\"},{\"code\":\"130127\",\"name\":\"高邑县\"},{\"code\":\"130128\",\"name\":\"深泽县\"},{\"code\":\"130129\",\"name\":\"赞皇县\"},{\"code\":\"130130\",\"name\":\"无极县\"},{\"code\":\"130131\",\"name\":\"平山县\"},{\"code\":\"130132\",\"name\":\"元氏县\"},{\"code\":\"130133\",\"name\":\"赵县\"},{\"code\":\"130183\",\"name\":\"晋州市\"},{\"code\":\"130184\",\"name\":\"新乐市\"}]},{\"code\":\"1302\",\"name\":\"唐山市\",\"childs\":[{\"code\":\"130202\",\"name\":\"路南区\"},{\"code\":\"130203\",\"name\":\"路北区\"},{\"code\":\"130204\",\"name\":\"古冶区\"},{\"code\":\"130205\",\"name\":\"开平区\"},{\"code\":\"130207\",\"name\":\"丰南区\"},{\"code\":\"130208\",\"name\":\"丰润区\"},{\"code\":\"130209\",\"name\":\"曹妃甸区\"},{\"code\":\"130223\",\"name\":\"滦县\"},{\"code\":\"130224\",\"name\":\"滦南县\"},{\"code\":\"130225\",\"name\":\"乐亭县\"},{\"code\":\"130227\",\"name\":\"迁西县\"},{\"code\":\"130229\",\"name\":\"玉田县\"},{\"code\":\"130281\",\"name\":\"遵化市\"},{\"code\":\"130283\",\"name\":\"迁安市\"}]},{\"code\":\"1303\",\"name\":\"秦皇岛市\",\"childs\":[{\"code\":\"130302\",\"name\":\"海港区\"},{\"code\":\"130303\",\"name\":\"山海关区\"},{\"code\":\"130304\",\"name\":\"北戴河区\"},{\"code\":\"130306\",\"name\":\"抚宁区\"},{\"code\":\"130321\",\"name\":\"青龙满族自治县\"},{\"code\":\"130322\",\"name\":\"昌黎县\"},{\"code\":\"130324\",\"name\":\"卢龙县\"}]},{\"code\":\"1304\",\"name\":\"邯郸市\",\"childs\":[{\"code\":\"130402\",\"name\":\"邯山区\"},{\"code\":\"130403\",\"name\":\"丛台区\"},{\"code\":\"130404\",\"name\":\"复兴区\"},{\"code\":\"130406\",\"name\":\"峰峰矿区\"},{\"code\":\"130421\",\"name\":\"邯郸县\"},{\"code\":\"130423\",\"name\":\"临漳县\"},{\"code\":\"130424\",\"name\":\"成安县\"},{\"code\":\"130425\",\"name\":\"大名县\"},{\"code\":\"130426\",\"name\":\"涉县\"},{\"code\":\"130427\",\"name\":\"磁县\"},{\"code\":\"130428\",\"name\":\"肥乡县\"},{\"code\":\"130429\",\"name\":\"永年县\"},{\"code\":\"130430\",\"name\":\"邱县\"},{\"code\":\"130431\",\"name\":\"鸡泽县\"},{\"code\":\"130432\",\"name\":\"广平县\"},{\"code\":\"130433\",\"name\":\"馆陶县\"},{\"code\":\"130434\",\"name\":\"魏县\"},{\"code\":\"130435\",\"name\":\"曲周县\"},{\"code\":\"130481\",\"name\":\"武安市\"}]},{\"code\":\"1305\",\"name\":\"邢台市\",\"childs\":[{\"code\":\"130502\",\"name\":\"桥东区\"},{\"code\":\"130503\",\"name\":\"桥西区\"},{\"code\":\"130521\",\"name\":\"邢台县\"},{\"code\":\"130522\",\"name\":\"临城县\"},{\"code\":\"130523\",\"name\":\"内丘县\"},{\"code\":\"130524\",\"name\":\"柏乡县\"},{\"code\":\"130525\",\"name\":\"隆尧县\"},{\"code\":\"130526\",\"name\":\"任县\"},{\"code\":\"130527\",\"name\":\"南和县\"},{\"code\":\"130528\",\"name\":\"宁晋县\"},{\"code\":\"130529\",\"name\":\"巨鹿县\"},{\"code\":\"130530\",\"name\":\"新河县\"},{\"code\":\"130531\",\"name\":\"广宗县\"},{\"code\":\"130532\",\"name\":\"平乡县\"},{\"code\":\"130533\",\"name\":\"威县\"},{\"code\":\"130534\",\"name\":\"清河县\"},{\"code\":\"130535\",\"name\":\"临西县\"},{\"code\":\"130581\",\"name\":\"南宫市\"},{\"code\":\"130582\",\"name\":\"沙河市\"}]},{\"code\":\"1306\",\"name\":\"保定市\",\"childs\":[{\"code\":\"130602\",\"name\":\"竞秀区\"},{\"code\":\"130606\",\"name\":\"莲池区\"},{\"code\":\"130607\",\"name\":\"满城区\"},{\"code\":\"130608\",\"name\":\"清苑区\"},{\"code\":\"130609\",\"name\":\"徐水区\"},{\"code\":\"130623\",\"name\":\"涞水县\"},{\"code\":\"130624\",\"name\":\"阜平县\"},{\"code\":\"130626\",\"name\":\"定兴县\"},{\"code\":\"130627\",\"name\":\"唐县\"},{\"code\":\"130628\",\"name\":\"高阳县\"},{\"code\":\"130629\",\"name\":\"容城县\"},{\"code\":\"130630\",\"name\":\"涞源县\"},{\"code\":\"130631\",\"name\":\"望都县\"},{\"code\":\"130632\",\"name\":\"安新县\"},{\"code\":\"130633\",\"name\":\"易县\"},{\"code\":\"130634\",\"name\":\"曲阳县\"},{\"code\":\"130635\",\"name\":\"蠡县\"},{\"code\":\"130636\",\"name\":\"顺平县\"},{\"code\":\"130637\",\"name\":\"博野县\"},{\"code\":\"130638\",\"name\":\"雄县\"},{\"code\":\"130681\",\"name\":\"涿州市\"},{\"code\":\"130683\",\"name\":\"安国市\"},{\"code\":\"130684\",\"name\":\"高碑店市\"}]},{\"code\":\"1307\",\"name\":\"张家口市\",\"childs\":[{\"code\":\"130702\",\"name\":\"桥东区\"},{\"code\":\"130703\",\"name\":\"桥西区\"},{\"code\":\"130705\",\"name\":\"宣化区\"},{\"code\":\"130706\",\"name\":\"下花园区\"},{\"code\":\"130708\",\"name\":\"万全区\"},{\"code\":\"130709\",\"name\":\"崇礼区\"},{\"code\":\"130722\",\"name\":\"张北县\"},{\"code\":\"130723\",\"name\":\"康保县\"},{\"code\":\"130724\",\"name\":\"沽源县\"},{\"code\":\"130725\",\"name\":\"尚义县\"},{\"code\":\"130726\",\"name\":\"蔚县\"},{\"code\":\"130727\",\"name\":\"阳原县\"},{\"code\":\"130728\",\"name\":\"怀安县\"},{\"code\":\"130730\",\"name\":\"怀来县\"},{\"code\":\"130731\",\"name\":\"涿鹿县\"},{\"code\":\"130732\",\"name\":\"赤城县\"}]},{\"code\":\"1308\",\"name\":\"承德市\",\"childs\":[{\"code\":\"130802\",\"name\":\"双桥区\"},{\"code\":\"130803\",\"name\":\"双滦区\"},{\"code\":\"130804\",\"name\":\"鹰手营子矿区\"},{\"code\":\"130821\",\"name\":\"承德县\"},{\"code\":\"130822\",\"name\":\"兴隆县\"},{\"code\":\"130823\",\"name\":\"平泉县\"},{\"code\":\"130824\",\"name\":\"滦平县\"},{\"code\":\"130825\",\"name\":\"隆化县\"},{\"code\":\"130826\",\"name\":\"丰宁满族自治县\"},{\"code\":\"130827\",\"name\":\"宽城满族自治县\"},{\"code\":\"130828\",\"name\":\"围场满族蒙古族自治县\"}]},{\"code\":\"1309\",\"name\":\"沧州市\",\"childs\":[{\"code\":\"130902\",\"name\":\"新华区\"},{\"code\":\"130903\",\"name\":\"运河区\"},{\"code\":\"130921\",\"name\":\"沧县\"},{\"code\":\"130922\",\"name\":\"青县\"},{\"code\":\"130923\",\"name\":\"东光县\"},{\"code\":\"130924\",\"name\":\"海兴县\"},{\"code\":\"130925\",\"name\":\"盐山县\"},{\"code\":\"130926\",\"name\":\"肃宁县\"},{\"code\":\"130927\",\"name\":\"南皮县\"},{\"code\":\"130928\",\"name\":\"吴桥县\"},{\"code\":\"130929\",\"name\":\"献县\"},{\"code\":\"130930\",\"name\":\"孟村回族自治县\"},{\"code\":\"130981\",\"name\":\"泊头市\"},{\"code\":\"130982\",\"name\":\"任丘市\"},{\"code\":\"130983\",\"name\":\"黄骅市\"},{\"code\":\"130984\",\"name\":\"河间市\"}]},{\"code\":\"1310\",\"name\":\"廊坊市\",\"childs\":[{\"code\":\"131002\",\"name\":\"安次区\"},{\"code\":\"131003\",\"name\":\"广阳区\"},{\"code\":\"131022\",\"name\":\"固安县\"},{\"code\":\"131023\",\"name\":\"永清县\"},{\"code\":\"131024\",\"name\":\"香河县\"},{\"code\":\"131025\",\"name\":\"大城县\"},{\"code\":\"131026\",\"name\":\"文安县\"},{\"code\":\"131028\",\"name\":\"大厂回族自治县\"},{\"code\":\"131081\",\"name\":\"霸州市\"},{\"code\":\"131082\",\"name\":\"三河市\"}]},{\"code\":\"1311\",\"name\":\"衡水市\",\"childs\":[{\"code\":\"131102\",\"name\":\"桃城区\"},{\"code\":\"131103\",\"name\":\"冀州区\"},{\"code\":\"131121\",\"name\":\"枣强县\"},{\"code\":\"131122\",\"name\":\"武邑县\"},{\"code\":\"131123\",\"name\":\"武强县\"},{\"code\":\"131124\",\"name\":\"饶阳县\"},{\"code\":\"131125\",\"name\":\"安平县\"},{\"code\":\"131126\",\"name\":\"故城县\"},{\"code\":\"131127\",\"name\":\"景县\"},{\"code\":\"131128\",\"name\":\"阜城县\"},{\"code\":\"131182\",\"name\":\"深州市\"}]},{\"code\":\"1390\",\"name\":\"省直辖县级行政区划\",\"childs\":[{\"code\":\"139001\",\"name\":\"定州市\"},{\"code\":\"139002\",\"name\":\"辛集市\"}]}]},{\"code\":\"14\",\"name\":\"山西省\",\"childs\":[{\"code\":\"1401\",\"name\":\"太原市\",\"childs\":[{\"code\":\"140105\",\"name\":\"小店区\"},{\"code\":\"140106\",\"name\":\"迎泽区\"},{\"code\":\"140107\",\"name\":\"杏花岭区\"},{\"code\":\"140108\",\"name\":\"尖草坪区\"},{\"code\":\"140109\",\"name\":\"万柏林区\"},{\"code\":\"140110\",\"name\":\"晋源区\"},{\"code\":\"140121\",\"name\":\"清徐县\"},{\"code\":\"140122\",\"name\":\"阳曲县\"},{\"code\":\"140123\",\"name\":\"娄烦县\"},{\"code\":\"140181\",\"name\":\"古交市\"}]},{\"code\":\"1402\",\"name\":\"大同市\",\"childs\":[{\"code\":\"140202\",\"name\":\"城区\"},{\"code\":\"140203\",\"name\":\"矿区\"},{\"code\":\"140211\",\"name\":\"南郊区\"},{\"code\":\"140212\",\"name\":\"新荣区\"},{\"code\":\"140221\",\"name\":\"阳高县\"},{\"code\":\"140222\",\"name\":\"天镇县\"},{\"code\":\"140223\",\"name\":\"广灵县\"},{\"code\":\"140224\",\"name\":\"灵丘县\"},{\"code\":\"140225\",\"name\":\"浑源县\"},{\"code\":\"140226\",\"name\":\"左云县\"},{\"code\":\"140227\",\"name\":\"大同县\"}]},{\"code\":\"1403\",\"name\":\"阳泉市\",\"childs\":[{\"code\":\"140302\",\"name\":\"城区\"},{\"code\":\"140303\",\"name\":\"矿区\"},{\"code\":\"140311\",\"name\":\"郊区\"},{\"code\":\"140321\",\"name\":\"平定县\"},{\"code\":\"140322\",\"name\":\"盂县\"}]},{\"code\":\"1404\",\"name\":\"长治市\",\"childs\":[{\"code\":\"140402\",\"name\":\"城区\"},{\"code\":\"140411\",\"name\":\"郊区\"},{\"code\":\"140421\",\"name\":\"长治县\"},{\"code\":\"140423\",\"name\":\"襄垣县\"},{\"code\":\"140424\",\"name\":\"屯留县\"},{\"code\":\"140425\",\"name\":\"平顺县\"},{\"code\":\"140426\",\"name\":\"黎城县\"},{\"code\":\"140427\",\"name\":\"壶关县\"},{\"code\":\"140428\",\"name\":\"长子县\"},{\"code\":\"140429\",\"name\":\"武乡县\"},{\"code\":\"140430\",\"name\":\"沁县\"},{\"code\":\"140431\",\"name\":\"沁源县\"},{\"code\":\"140481\",\"name\":\"潞城市\"}]},{\"code\":\"1405\",\"name\":\"晋城市\",\"childs\":[{\"code\":\"140502\",\"name\":\"城区\"},{\"code\":\"140521\",\"name\":\"沁水县\"},{\"code\":\"140522\",\"name\":\"阳城县\"},{\"code\":\"140524\",\"name\":\"陵川县\"},{\"code\":\"140525\",\"name\":\"泽州县\"},{\"code\":\"140581\",\"name\":\"高平市\"}]},{\"code\":\"1406\",\"name\":\"朔州市\",\"childs\":[{\"code\":\"140602\",\"name\":\"朔城区\"},{\"code\":\"140603\",\"name\":\"平鲁区\"},{\"code\":\"140621\",\"name\":\"山阴县\"},{\"code\":\"140622\",\"name\":\"应县\"},{\"code\":\"140623\",\"name\":\"右玉县\"},{\"code\":\"140624\",\"name\":\"怀仁县\"}]},{\"code\":\"1407\",\"name\":\"晋中市\",\"childs\":[{\"code\":\"140702\",\"name\":\"榆次区\"},{\"code\":\"140721\",\"name\":\"榆社县\"},{\"code\":\"140722\",\"name\":\"左权县\"},{\"code\":\"140723\",\"name\":\"和顺县\"},{\"code\":\"140724\",\"name\":\"昔阳县\"},{\"code\":\"140725\",\"name\":\"寿阳县\"},{\"code\":\"140726\",\"name\":\"太谷县\"},{\"code\":\"140727\",\"name\":\"祁县\"},{\"code\":\"140728\",\"name\":\"平遥县\"},{\"code\":\"140729\",\"name\":\"灵石县\"},{\"code\":\"140781\",\"name\":\"介休市\"}]},{\"code\":\"1408\",\"name\":\"运城市\",\"childs\":[{\"code\":\"140802\",\"name\":\"盐湖区\"},{\"code\":\"140821\",\"name\":\"临猗县\"},{\"code\":\"140822\",\"name\":\"万荣县\"},{\"code\":\"140823\",\"name\":\"闻喜县\"},{\"code\":\"140824\",\"name\":\"稷山县\"},{\"code\":\"140825\",\"name\":\"新绛县\"},{\"code\":\"140826\",\"name\":\"绛县\"},{\"code\":\"140827\",\"name\":\"垣曲县\"},{\"code\":\"140828\",\"name\":\"夏县\"},{\"code\":\"140829\",\"name\":\"平陆县\"},{\"code\":\"140830\",\"name\":\"芮城县\"},{\"code\":\"140881\",\"name\":\"永济市\"},{\"code\":\"140882\",\"name\":\"河津市\"}]},{\"code\":\"1409\",\"name\":\"忻州市\",\"childs\":[{\"code\":\"140902\",\"name\":\"忻府区\"},{\"code\":\"140921\",\"name\":\"定襄县\"},{\"code\":\"140922\",\"name\":\"五台县\"},{\"code\":\"140923\",\"name\":\"代县\"},{\"code\":\"140924\",\"name\":\"繁峙县\"},{\"code\":\"140925\",\"name\":\"宁武县\"},{\"code\":\"140926\",\"name\":\"静乐县\"},{\"code\":\"140927\",\"name\":\"神池县\"},{\"code\":\"140928\",\"name\":\"五寨县\"},{\"code\":\"140929\",\"name\":\"岢岚县\"},{\"code\":\"140930\",\"name\":\"河曲县\"},{\"code\":\"140931\",\"name\":\"保德县\"},{\"code\":\"140932\",\"name\":\"偏关县\"},{\"code\":\"140981\",\"name\":\"原平市\"}]},{\"code\":\"1410\",\"name\":\"临汾市\",\"childs\":[{\"code\":\"141002\",\"name\":\"尧都区\"},{\"code\":\"141021\",\"name\":\"曲沃县\"},{\"code\":\"141022\",\"name\":\"翼城县\"},{\"code\":\"141023\",\"name\":\"襄汾县\"},{\"code\":\"141024\",\"name\":\"洪洞县\"},{\"code\":\"141025\",\"name\":\"古县\"},{\"code\":\"141026\",\"name\":\"安泽县\"},{\"code\":\"141027\",\"name\":\"浮山县\"},{\"code\":\"141028\",\"name\":\"吉县\"},{\"code\":\"141029\",\"name\":\"乡宁县\"},{\"code\":\"141030\",\"name\":\"大宁县\"},{\"code\":\"141031\",\"name\":\"隰县\"},{\"code\":\"141032\",\"name\":\"永和县\"},{\"code\":\"141033\",\"name\":\"蒲县\"},{\"code\":\"141034\",\"name\":\"汾西县\"},{\"code\":\"141081\",\"name\":\"侯马市\"},{\"code\":\"141082\",\"name\":\"霍州市\"}]},{\"code\":\"1411\",\"name\":\"吕梁市\",\"childs\":[{\"code\":\"141102\",\"name\":\"离石区\"},{\"code\":\"141121\",\"name\":\"文水县\"},{\"code\":\"141122\",\"name\":\"交城县\"},{\"code\":\"141123\",\"name\":\"兴县\"},{\"code\":\"141124\",\"name\":\"临县\"},{\"code\":\"141125\",\"name\":\"柳林县\"},{\"code\":\"141126\",\"name\":\"石楼县\"},{\"code\":\"141127\",\"name\":\"岚县\"},{\"code\":\"141128\",\"name\":\"方山县\"},{\"code\":\"141129\",\"name\":\"中阳县\"},{\"code\":\"141130\",\"name\":\"交口县\"},{\"code\":\"141181\",\"name\":\"孝义市\"},{\"code\":\"141182\",\"name\":\"汾阳市\"}]}]},{\"code\":\"15\",\"name\":\"内蒙古自治区\",\"childs\":[{\"code\":\"1501\",\"name\":\"呼和浩特市\",\"childs\":[{\"code\":\"150102\",\"name\":\"新城区\"},{\"code\":\"150103\",\"name\":\"回民区\"},{\"code\":\"150104\",\"name\":\"玉泉区\"},{\"code\":\"150105\",\"name\":\"赛罕区\"},{\"code\":\"150121\",\"name\":\"土默特左旗\"},{\"code\":\"150122\",\"name\":\"托克托县\"},{\"code\":\"150123\",\"name\":\"和林格尔县\"},{\"code\":\"150124\",\"name\":\"清水河县\"},{\"code\":\"150125\",\"name\":\"武川县\"}]},{\"code\":\"1502\",\"name\":\"包头市\",\"childs\":[{\"code\":\"150202\",\"name\":\"东河区\"},{\"code\":\"150203\",\"name\":\"昆都仑区\"},{\"code\":\"150204\",\"name\":\"青山区\"},{\"code\":\"150205\",\"name\":\"石拐区\"},{\"code\":\"150206\",\"name\":\"白云鄂博矿区\"},{\"code\":\"150207\",\"name\":\"九原区\"},{\"code\":\"150221\",\"name\":\"土默特右旗\"},{\"code\":\"150222\",\"name\":\"固阳县\"},{\"code\":\"150223\",\"name\":\"达尔罕茂明安联合旗\"}]},{\"code\":\"1503\",\"name\":\"乌海市\",\"childs\":[{\"code\":\"150302\",\"name\":\"海勃湾区\"},{\"code\":\"150303\",\"name\":\"海南区\"},{\"code\":\"150304\",\"name\":\"乌达区\"}]},{\"code\":\"1504\",\"name\":\"赤峰市\",\"childs\":[{\"code\":\"150402\",\"name\":\"红山区\"},{\"code\":\"150403\",\"name\":\"元宝山区\"},{\"code\":\"150404\",\"name\":\"松山区\"},{\"code\":\"150421\",\"name\":\"阿鲁科尔沁旗\"},{\"code\":\"150422\",\"name\":\"巴林左旗\"},{\"code\":\"150423\",\"name\":\"巴林右旗\"},{\"code\":\"150424\",\"name\":\"林西县\"},{\"code\":\"150425\",\"name\":\"克什克腾旗\"},{\"code\":\"150426\",\"name\":\"翁牛特旗\"},{\"code\":\"150428\",\"name\":\"喀喇沁旗\"},{\"code\":\"150429\",\"name\":\"宁城县\"},{\"code\":\"150430\",\"name\":\"敖汉旗\"}]},{\"code\":\"1505\",\"name\":\"通辽市\",\"childs\":[{\"code\":\"150502\",\"name\":\"科尔沁区\"},{\"code\":\"150521\",\"name\":\"科尔沁左翼中旗\"},{\"code\":\"150522\",\"name\":\"科尔沁左翼后旗\"},{\"code\":\"150523\",\"name\":\"开鲁县\"},{\"code\":\"150524\",\"name\":\"库伦旗\"},{\"code\":\"150525\",\"name\":\"奈曼旗\"},{\"code\":\"150526\",\"name\":\"扎鲁特旗\"},{\"code\":\"150581\",\"name\":\"霍林郭勒市\"}]},{\"code\":\"1506\",\"name\":\"鄂尔多斯市\",\"childs\":[{\"code\":\"150602\",\"name\":\"东胜区\"},{\"code\":\"150603\",\"name\":\"康巴什区\"},{\"code\":\"150621\",\"name\":\"达拉特旗\"},{\"code\":\"150622\",\"name\":\"准格尔旗\"},{\"code\":\"150623\",\"name\":\"鄂托克前旗\"},{\"code\":\"150624\",\"name\":\"鄂托克旗\"},{\"code\":\"150625\",\"name\":\"杭锦旗\"},{\"code\":\"150626\",\"name\":\"乌审旗\"},{\"code\":\"150627\",\"name\":\"伊金霍洛旗\"}]},{\"code\":\"1507\",\"name\":\"呼伦贝尔市\",\"childs\":[{\"code\":\"150702\",\"name\":\"海拉尔区\"},{\"code\":\"150703\",\"name\":\"扎赉诺尔区\"},{\"code\":\"150721\",\"name\":\"阿荣旗\"},{\"code\":\"150722\",\"name\":\"莫力达瓦达斡尔族自治旗\"},{\"code\":\"150723\",\"name\":\"鄂伦春自治旗\"},{\"code\":\"150724\",\"name\":\"鄂温克族自治旗\"},{\"code\":\"150725\",\"name\":\"陈巴尔虎旗\"},{\"code\":\"150726\",\"name\":\"新巴尔虎左旗\"},{\"code\":\"150727\",\"name\":\"新巴尔虎右旗\"},{\"code\":\"150781\",\"name\":\"满洲里市\"},{\"code\":\"150782\",\"name\":\"牙克石市\"},{\"code\":\"150783\",\"name\":\"扎兰屯市\"},{\"code\":\"150784\",\"name\":\"额尔古纳市\"},{\"code\":\"150785\",\"name\":\"根河市\"}]},{\"code\":\"1508\",\"name\":\"巴彦淖尔市\",\"childs\":[{\"code\":\"150802\",\"name\":\"临河区\"},{\"code\":\"150821\",\"name\":\"五原县\"},{\"code\":\"150822\",\"name\":\"磴口县\"},{\"code\":\"150823\",\"name\":\"乌拉特前旗\"},{\"code\":\"150824\",\"name\":\"乌拉特中旗\"},{\"code\":\"150825\",\"name\":\"乌拉特后旗\"},{\"code\":\"150826\",\"name\":\"杭锦后旗\"}]},{\"code\":\"1509\",\"name\":\"乌兰察布市\",\"childs\":[{\"code\":\"150902\",\"name\":\"集宁区\"},{\"code\":\"150921\",\"name\":\"卓资县\"},{\"code\":\"150922\",\"name\":\"化德县\"},{\"code\":\"150923\",\"name\":\"商都县\"},{\"code\":\"150924\",\"name\":\"兴和县\"},{\"code\":\"150925\",\"name\":\"凉城县\"},{\"code\":\"150926\",\"name\":\"察哈尔右翼前旗\"},{\"code\":\"150927\",\"name\":\"察哈尔右翼中旗\"},{\"code\":\"150928\",\"name\":\"察哈尔右翼后旗\"},{\"code\":\"150929\",\"name\":\"四子王旗\"},{\"code\":\"150981\",\"name\":\"丰镇市\"}]},{\"code\":\"1522\",\"name\":\"兴安盟\",\"childs\":[{\"code\":\"152201\",\"name\":\"乌兰浩特市\"},{\"code\":\"152202\",\"name\":\"阿尔山市\"},{\"code\":\"152221\",\"name\":\"科尔沁右翼前旗\"},{\"code\":\"152222\",\"name\":\"科尔沁右翼中旗\"},{\"code\":\"152223\",\"name\":\"扎赉特旗\"},{\"code\":\"152224\",\"name\":\"突泉县\"}]},{\"code\":\"1525\",\"name\":\"锡林郭勒盟\",\"childs\":[{\"code\":\"152501\",\"name\":\"二连浩特市\"},{\"code\":\"152502\",\"name\":\"锡林浩特市\"},{\"code\":\"152522\",\"name\":\"阿巴嘎旗\"},{\"code\":\"152523\",\"name\":\"苏尼特左旗\"},{\"code\":\"152524\",\"name\":\"苏尼特右旗\"},{\"code\":\"152525\",\"name\":\"东乌珠穆沁旗\"},{\"code\":\"152526\",\"name\":\"西乌珠穆沁旗\"},{\"code\":\"152527\",\"name\":\"太仆寺旗\"},{\"code\":\"152528\",\"name\":\"镶黄旗\"},{\"code\":\"152529\",\"name\":\"正镶白旗\"},{\"code\":\"152530\",\"name\":\"正蓝旗\"},{\"code\":\"152531\",\"name\":\"多伦县\"}]},{\"code\":\"1529\",\"name\":\"阿拉善盟\",\"childs\":[{\"code\":\"152921\",\"name\":\"阿拉善左旗\"},{\"code\":\"152922\",\"name\":\"阿拉善右旗\"},{\"code\":\"152923\",\"name\":\"额济纳旗\"}]}]},{\"code\":\"21\",\"name\":\"辽宁省\",\"childs\":[{\"code\":\"2101\",\"name\":\"沈阳市\",\"childs\":[{\"code\":\"210102\",\"name\":\"和平区\"},{\"code\":\"210103\",\"name\":\"沈河区\"},{\"code\":\"210104\",\"name\":\"大东区\"},{\"code\":\"210105\",\"name\":\"皇姑区\"},{\"code\":\"210106\",\"name\":\"铁西区\"},{\"code\":\"210111\",\"name\":\"苏家屯区\"},{\"code\":\"210112\",\"name\":\"浑南区\"},{\"code\":\"210113\",\"name\":\"沈北新区\"},{\"code\":\"210114\",\"name\":\"于洪区\"},{\"code\":\"210115\",\"name\":\"辽中区\"},{\"code\":\"210123\",\"name\":\"康平县\"},{\"code\":\"210124\",\"name\":\"法库县\"},{\"code\":\"210181\",\"name\":\"新民市\"}]},{\"code\":\"2102\",\"name\":\"大连市\",\"childs\":[{\"code\":\"210202\",\"name\":\"中山区\"},{\"code\":\"210203\",\"name\":\"西岗区\"},{\"code\":\"210204\",\"name\":\"沙河口区\"},{\"code\":\"210211\",\"name\":\"甘井子区\"},{\"code\":\"210212\",\"name\":\"旅顺口区\"},{\"code\":\"210213\",\"name\":\"金州区\"},{\"code\":\"210214\",\"name\":\"普兰店区\"},{\"code\":\"210224\",\"name\":\"长海县\"},{\"code\":\"210281\",\"name\":\"瓦房店市\"},{\"code\":\"210283\",\"name\":\"庄河市\"}]},{\"code\":\"2103\",\"name\":\"鞍山市\",\"childs\":[{\"code\":\"210302\",\"name\":\"铁东区\"},{\"code\":\"210303\",\"name\":\"铁西区\"},{\"code\":\"210304\",\"name\":\"立山区\"},{\"code\":\"210311\",\"name\":\"千山区\"},{\"code\":\"210321\",\"name\":\"台安县\"},{\"code\":\"210323\",\"name\":\"岫岩满族自治县\"},{\"code\":\"210381\",\"name\":\"海城市\"}]},{\"code\":\"2104\",\"name\":\"抚顺市\",\"childs\":[{\"code\":\"210402\",\"name\":\"新抚区\"},{\"code\":\"210403\",\"name\":\"东洲区\"},{\"code\":\"210404\",\"name\":\"望花区\"},{\"code\":\"210411\",\"name\":\"顺城区\"},{\"code\":\"210421\",\"name\":\"抚顺县\"},{\"code\":\"210422\",\"name\":\"新宾满族自治县\"},{\"code\":\"210423\",\"name\":\"清原满族自治县\"}]},{\"code\":\"2105\",\"name\":\"本溪市\",\"childs\":[{\"code\":\"210502\",\"name\":\"平山区\"},{\"code\":\"210503\",\"name\":\"溪湖区\"},{\"code\":\"210504\",\"name\":\"明山区\"},{\"code\":\"210505\",\"name\":\"南芬区\"},{\"code\":\"210521\",\"name\":\"本溪满族自治县\"},{\"code\":\"210522\",\"name\":\"桓仁满族自治县\"}]},{\"code\":\"2106\",\"name\":\"丹东市\",\"childs\":[{\"code\":\"210602\",\"name\":\"元宝区\"},{\"code\":\"210603\",\"name\":\"振兴区\"},{\"code\":\"210604\",\"name\":\"振安区\"},{\"code\":\"210624\",\"name\":\"宽甸满族自治县\"},{\"code\":\"210681\",\"name\":\"东港市\"},{\"code\":\"210682\",\"name\":\"凤城市\"}]},{\"code\":\"2107\",\"name\":\"锦州市\",\"childs\":[{\"code\":\"210702\",\"name\":\"古塔区\"},{\"code\":\"210703\",\"name\":\"凌河区\"},{\"code\":\"210711\",\"name\":\"太和区\"},{\"code\":\"210726\",\"name\":\"黑山县\"},{\"code\":\"210727\",\"name\":\"义县\"},{\"code\":\"210781\",\"name\":\"凌海市\"},{\"code\":\"210782\",\"name\":\"北镇市\"}]},{\"code\":\"2108\",\"name\":\"营口市\",\"childs\":[{\"code\":\"210802\",\"name\":\"站前区\"},{\"code\":\"210803\",\"name\":\"西市区\"},{\"code\":\"210804\",\"name\":\"鲅鱼圈区\"},{\"code\":\"210811\",\"name\":\"老边区\"},{\"code\":\"210881\",\"name\":\"盖州市\"},{\"code\":\"210882\",\"name\":\"大石桥市\"}]},{\"code\":\"2109\",\"name\":\"阜新市\",\"childs\":[{\"code\":\"210902\",\"name\":\"海州区\"},{\"code\":\"210903\",\"name\":\"新邱区\"},{\"code\":\"210904\",\"name\":\"太平区\"},{\"code\":\"210905\",\"name\":\"清河门区\"},{\"code\":\"210911\",\"name\":\"细河区\"},{\"code\":\"210921\",\"name\":\"阜新蒙古族自治县\"},{\"code\":\"210922\",\"name\":\"彰武县\"}]},{\"code\":\"2110\",\"name\":\"辽阳市\",\"childs\":[{\"code\":\"211002\",\"name\":\"白塔区\"},{\"code\":\"211003\",\"name\":\"文圣区\"},{\"code\":\"211004\",\"name\":\"宏伟区\"},{\"code\":\"211005\",\"name\":\"弓长岭区\"},{\"code\":\"211011\",\"name\":\"太子河区\"},{\"code\":\"211021\",\"name\":\"辽阳县\"},{\"code\":\"211081\",\"name\":\"灯塔市\"}]},{\"code\":\"2111\",\"name\":\"盘锦市\",\"childs\":[{\"code\":\"211102\",\"name\":\"双台子区\"},{\"code\":\"211103\",\"name\":\"兴隆台区\"},{\"code\":\"211104\",\"name\":\"大洼区\"},{\"code\":\"211122\",\"name\":\"盘山县\"}]},{\"code\":\"2112\",\"name\":\"铁岭市\",\"childs\":[{\"code\":\"211202\",\"name\":\"银州区\"},{\"code\":\"211204\",\"name\":\"清河区\"},{\"code\":\"211221\",\"name\":\"铁岭县\"},{\"code\":\"211223\",\"name\":\"西丰县\"},{\"code\":\"211224\",\"name\":\"昌图县\"},{\"code\":\"211281\",\"name\":\"调兵山市\"},{\"code\":\"211282\",\"name\":\"开原市\"}]},{\"code\":\"2113\",\"name\":\"朝阳市\",\"childs\":[{\"code\":\"211302\",\"name\":\"双塔区\"},{\"code\":\"211303\",\"name\":\"龙城区\"},{\"code\":\"211321\",\"name\":\"朝阳县\"},{\"code\":\"211322\",\"name\":\"建平县\"},{\"code\":\"211324\",\"name\":\"喀喇沁左翼蒙古族自治县\"},{\"code\":\"211381\",\"name\":\"北票市\"},{\"code\":\"211382\",\"name\":\"凌源市\"}]},{\"code\":\"2114\",\"name\":\"葫芦岛市\",\"childs\":[{\"code\":\"211402\",\"name\":\"连山区\"},{\"code\":\"211403\",\"name\":\"龙港区\"},{\"code\":\"211404\",\"name\":\"南票区\"},{\"code\":\"211421\",\"name\":\"绥中县\"},{\"code\":\"211422\",\"name\":\"建昌县\"},{\"code\":\"211481\",\"name\":\"兴城市\"}]}]},{\"code\":\"22\",\"name\":\"吉林省\",\"childs\":[{\"code\":\"2201\",\"name\":\"长春市\",\"childs\":[{\"code\":\"220102\",\"name\":\"南关区\"},{\"code\":\"220103\",\"name\":\"宽城区\"},{\"code\":\"220104\",\"name\":\"朝阳区\"},{\"code\":\"220105\",\"name\":\"二道区\"},{\"code\":\"220106\",\"name\":\"绿园区\"},{\"code\":\"220112\",\"name\":\"双阳区\"},{\"code\":\"220113\",\"name\":\"九台区\"},{\"code\":\"220122\",\"name\":\"农安县\"},{\"code\":\"220182\",\"name\":\"榆树市\"},{\"code\":\"220183\",\"name\":\"德惠市\"}]},{\"code\":\"2202\",\"name\":\"吉林市\",\"childs\":[{\"code\":\"220202\",\"name\":\"昌邑区\"},{\"code\":\"220203\",\"name\":\"龙潭区\"},{\"code\":\"220204\",\"name\":\"船营区\"},{\"code\":\"220211\",\"name\":\"丰满区\"},{\"code\":\"220221\",\"name\":\"永吉县\"},{\"code\":\"220281\",\"name\":\"蛟河市\"},{\"code\":\"220282\",\"name\":\"桦甸市\"},{\"code\":\"220283\",\"name\":\"舒兰市\"},{\"code\":\"220284\",\"name\":\"磐石市\"}]},{\"code\":\"2203\",\"name\":\"四平市\",\"childs\":[{\"code\":\"220302\",\"name\":\"铁西区\"},{\"code\":\"220303\",\"name\":\"铁东区\"},{\"code\":\"220322\",\"name\":\"梨树县\"},{\"code\":\"220323\",\"name\":\"伊通满族自治县\"},{\"code\":\"220381\",\"name\":\"公主岭市\"},{\"code\":\"220382\",\"name\":\"双辽市\"}]},{\"code\":\"2204\",\"name\":\"辽源市\",\"childs\":[{\"code\":\"220402\",\"name\":\"龙山区\"},{\"code\":\"220403\",\"name\":\"西安区\"},{\"code\":\"220421\",\"name\":\"东丰县\"},{\"code\":\"220422\",\"name\":\"东辽县\"}]},{\"code\":\"2205\",\"name\":\"通化市\",\"childs\":[{\"code\":\"220502\",\"name\":\"东昌区\"},{\"code\":\"220503\",\"name\":\"二道江区\"},{\"code\":\"220521\",\"name\":\"通化县\"},{\"code\":\"220523\",\"name\":\"辉南县\"},{\"code\":\"220524\",\"name\":\"柳河县\"},{\"code\":\"220581\",\"name\":\"梅河口市\"},{\"code\":\"220582\",\"name\":\"集安市\"}]},{\"code\":\"2206\",\"name\":\"白山市\",\"childs\":[{\"code\":\"220602\",\"name\":\"浑江区\"},{\"code\":\"220605\",\"name\":\"江源区\"},{\"code\":\"220621\",\"name\":\"抚松县\"},{\"code\":\"220622\",\"name\":\"靖宇县\"},{\"code\":\"220623\",\"name\":\"长白朝鲜族自治县\"},{\"code\":\"220681\",\"name\":\"临江市\"}]},{\"code\":\"2207\",\"name\":\"松原市\",\"childs\":[{\"code\":\"220702\",\"name\":\"宁江区\"},{\"code\":\"220721\",\"name\":\"前郭尔罗斯蒙古族自治县\"},{\"code\":\"220722\",\"name\":\"长岭县\"},{\"code\":\"220723\",\"name\":\"乾安县\"},{\"code\":\"220781\",\"name\":\"扶余市\"}]},{\"code\":\"2208\",\"name\":\"白城市\",\"childs\":[{\"code\":\"220802\",\"name\":\"洮北区\"},{\"code\":\"220821\",\"name\":\"镇赉县\"},{\"code\":\"220822\",\"name\":\"通榆县\"},{\"code\":\"220881\",\"name\":\"洮南市\"},{\"code\":\"220882\",\"name\":\"大安市\"}]},{\"code\":\"2224\",\"name\":\"延边朝鲜族自治州\",\"childs\":[{\"code\":\"222401\",\"name\":\"延吉市\"},{\"code\":\"222402\",\"name\":\"图们市\"},{\"code\":\"222403\",\"name\":\"敦化市\"},{\"code\":\"222404\",\"name\":\"珲春市\"},{\"code\":\"222405\",\"name\":\"龙井市\"},{\"code\":\"222406\",\"name\":\"和龙市\"},{\"code\":\"222424\",\"name\":\"汪清县\"},{\"code\":\"222426\",\"name\":\"安图县\"}]}]},{\"code\":\"23\",\"name\":\"黑龙江省\",\"childs\":[{\"code\":\"2301\",\"name\":\"哈尔滨市\",\"childs\":[{\"code\":\"230102\",\"name\":\"道里区\"},{\"code\":\"230103\",\"name\":\"南岗区\"},{\"code\":\"230104\",\"name\":\"道外区\"},{\"code\":\"230108\",\"name\":\"平房区\"},{\"code\":\"230109\",\"name\":\"松北区\"},{\"code\":\"230110\",\"name\":\"香坊区\"},{\"code\":\"230111\",\"name\":\"呼兰区\"},{\"code\":\"230112\",\"name\":\"阿城区\"},{\"code\":\"230113\",\"name\":\"双城区\"},{\"code\":\"230123\",\"name\":\"依兰县\"},{\"code\":\"230124\",\"name\":\"方正县\"},{\"code\":\"230125\",\"name\":\"宾县\"},{\"code\":\"230126\",\"name\":\"巴彦县\"},{\"code\":\"230127\",\"name\":\"木兰县\"},{\"code\":\"230128\",\"name\":\"通河县\"},{\"code\":\"230129\",\"name\":\"延寿县\"},{\"code\":\"230183\",\"name\":\"尚志市\"},{\"code\":\"230184\",\"name\":\"五常市\"}]},{\"code\":\"2302\",\"name\":\"齐齐哈尔市\",\"childs\":[{\"code\":\"230202\",\"name\":\"龙沙区\"},{\"code\":\"230203\",\"name\":\"建华区\"},{\"code\":\"230204\",\"name\":\"铁锋区\"},{\"code\":\"230205\",\"name\":\"昂昂溪区\"},{\"code\":\"230206\",\"name\":\"富拉尔基区\"},{\"code\":\"230207\",\"name\":\"碾子山区\"},{\"code\":\"230208\",\"name\":\"梅里斯达斡尔族区\"},{\"code\":\"230221\",\"name\":\"龙江县\"},{\"code\":\"230223\",\"name\":\"依安县\"},{\"code\":\"230224\",\"name\":\"泰来县\"},{\"code\":\"230225\",\"name\":\"甘南县\"},{\"code\":\"230227\",\"name\":\"富裕县\"},{\"code\":\"230229\",\"name\":\"克山县\"},{\"code\":\"230230\",\"name\":\"克东县\"},{\"code\":\"230231\",\"name\":\"拜泉县\"},{\"code\":\"230281\",\"name\":\"讷河市\"}]},{\"code\":\"2303\",\"name\":\"鸡西市\",\"childs\":[{\"code\":\"230302\",\"name\":\"鸡冠区\"},{\"code\":\"230303\",\"name\":\"恒山区\"},{\"code\":\"230304\",\"name\":\"滴道区\"},{\"code\":\"230305\",\"name\":\"梨树区\"},{\"code\":\"230306\",\"name\":\"城子河区\"},{\"code\":\"230307\",\"name\":\"麻山区\"},{\"code\":\"230321\",\"name\":\"鸡东县\"},{\"code\":\"230381\",\"name\":\"虎林市\"},{\"code\":\"230382\",\"name\":\"密山市\"}]},{\"code\":\"2304\",\"name\":\"鹤岗市\",\"childs\":[{\"code\":\"230402\",\"name\":\"向阳区\"},{\"code\":\"230403\",\"name\":\"工农区\"},{\"code\":\"230404\",\"name\":\"南山区\"},{\"code\":\"230405\",\"name\":\"兴安区\"},{\"code\":\"230406\",\"name\":\"东山区\"},{\"code\":\"230407\",\"name\":\"兴山区\"},{\"code\":\"230421\",\"name\":\"萝北县\"},{\"code\":\"230422\",\"name\":\"绥滨县\"}]},{\"code\":\"2305\",\"name\":\"双鸭山市\",\"childs\":[{\"code\":\"230502\",\"name\":\"尖山区\"},{\"code\":\"230503\",\"name\":\"岭东区\"},{\"code\":\"230505\",\"name\":\"四方台区\"},{\"code\":\"230506\",\"name\":\"宝山区\"},{\"code\":\"230521\",\"name\":\"集贤县\"},{\"code\":\"230522\",\"name\":\"友谊县\"},{\"code\":\"230523\",\"name\":\"宝清县\"},{\"code\":\"230524\",\"name\":\"饶河县\"}]},{\"code\":\"2306\",\"name\":\"大庆市\",\"childs\":[{\"code\":\"230602\",\"name\":\"萨尔图区\"},{\"code\":\"230603\",\"name\":\"龙凤区\"},{\"code\":\"230604\",\"name\":\"让胡路区\"},{\"code\":\"230605\",\"name\":\"红岗区\"},{\"code\":\"230606\",\"name\":\"大同区\"},{\"code\":\"230621\",\"name\":\"肇州县\"},{\"code\":\"230622\",\"name\":\"肇源县\"},{\"code\":\"230623\",\"name\":\"林甸县\"},{\"code\":\"230624\",\"name\":\"杜尔伯特蒙古族自治县\"}]},{\"code\":\"2307\",\"name\":\"伊春市\",\"childs\":[{\"code\":\"230702\",\"name\":\"伊春区\"},{\"code\":\"230703\",\"name\":\"南岔区\"},{\"code\":\"230704\",\"name\":\"友好区\"},{\"code\":\"230705\",\"name\":\"西林区\"},{\"code\":\"230706\",\"name\":\"翠峦区\"},{\"code\":\"230707\",\"name\":\"新青区\"},{\"code\":\"230708\",\"name\":\"美溪区\"},{\"code\":\"230709\",\"name\":\"金山屯区\"},{\"code\":\"230710\",\"name\":\"五营区\"},{\"code\":\"230711\",\"name\":\"乌马河区\"},{\"code\":\"230712\",\"name\":\"汤旺河区\"},{\"code\":\"230713\",\"name\":\"带岭区\"},{\"code\":\"230714\",\"name\":\"乌伊岭区\"},{\"code\":\"230715\",\"name\":\"红星区\"},{\"code\":\"230716\",\"name\":\"上甘岭区\"},{\"code\":\"230722\",\"name\":\"嘉荫县\"},{\"code\":\"230781\",\"name\":\"铁力市\"}]},{\"code\":\"2308\",\"name\":\"佳木斯市\",\"childs\":[{\"code\":\"230803\",\"name\":\"向阳区\"},{\"code\":\"230804\",\"name\":\"前进区\"},{\"code\":\"230805\",\"name\":\"东风区\"},{\"code\":\"230811\",\"name\":\"郊区\"},{\"code\":\"230822\",\"name\":\"桦南县\"},{\"code\":\"230826\",\"name\":\"桦川县\"},{\"code\":\"230828\",\"name\":\"汤原县\"},{\"code\":\"230881\",\"name\":\"同江市\"},{\"code\":\"230882\",\"name\":\"富锦市\"},{\"code\":\"230883\",\"name\":\"抚远市\"}]},{\"code\":\"2309\",\"name\":\"七台河市\",\"childs\":[{\"code\":\"230902\",\"name\":\"新兴区\"},{\"code\":\"230903\",\"name\":\"桃山区\"},{\"code\":\"230904\",\"name\":\"茄子河区\"},{\"code\":\"230921\",\"name\":\"勃利县\"}]},{\"code\":\"2310\",\"name\":\"牡丹江市\",\"childs\":[{\"code\":\"231002\",\"name\":\"东安区\"},{\"code\":\"231003\",\"name\":\"阳明区\"},{\"code\":\"231004\",\"name\":\"爱民区\"},{\"code\":\"231005\",\"name\":\"西安区\"},{\"code\":\"231025\",\"name\":\"林口县\"},{\"code\":\"231081\",\"name\":\"绥芬河市\"},{\"code\":\"231083\",\"name\":\"海林市\"},{\"code\":\"231084\",\"name\":\"宁安市\"},{\"code\":\"231085\",\"name\":\"穆棱市\"},{\"code\":\"231086\",\"name\":\"东宁市\"}]},{\"code\":\"2311\",\"name\":\"黑河市\",\"childs\":[{\"code\":\"231102\",\"name\":\"爱辉区\"},{\"code\":\"231121\",\"name\":\"嫩江县\"},{\"code\":\"231123\",\"name\":\"逊克县\"},{\"code\":\"231124\",\"name\":\"孙吴县\"},{\"code\":\"231181\",\"name\":\"北安市\"},{\"code\":\"231182\",\"name\":\"五大连池市\"}]},{\"code\":\"2312\",\"name\":\"绥化市\",\"childs\":[{\"code\":\"231202\",\"name\":\"北林区\"},{\"code\":\"231221\",\"name\":\"望奎县\"},{\"code\":\"231222\",\"name\":\"兰西县\"},{\"code\":\"231223\",\"name\":\"青冈县\"},{\"code\":\"231224\",\"name\":\"庆安县\"},{\"code\":\"231225\",\"name\":\"明水县\"},{\"code\":\"231226\",\"name\":\"绥棱县\"},{\"code\":\"231281\",\"name\":\"安达市\"},{\"code\":\"231282\",\"name\":\"肇东市\"},{\"code\":\"231283\",\"name\":\"海伦市\"}]},{\"code\":\"2327\",\"name\":\"大兴安岭地区\",\"childs\":[{\"code\":\"232721\",\"name\":\"呼玛县\"},{\"code\":\"232722\",\"name\":\"塔河县\"},{\"code\":\"232723\",\"name\":\"漠河县\"}]}]},{\"code\":\"31\",\"name\":\"上海市\",\"childs\":[{\"code\":\"3101\",\"name\":\"市辖区\",\"childs\":[{\"code\":\"310101\",\"name\":\"黄浦区\"},{\"code\":\"310104\",\"name\":\"徐汇区\"},{\"code\":\"310105\",\"name\":\"长宁区\"},{\"code\":\"310106\",\"name\":\"静安区\"},{\"code\":\"310107\",\"name\":\"普陀区\"},{\"code\":\"310109\",\"name\":\"虹口区\"},{\"code\":\"310110\",\"name\":\"杨浦区\"},{\"code\":\"310112\",\"name\":\"闵行区\"},{\"code\":\"310113\",\"name\":\"宝山区\"},{\"code\":\"310114\",\"name\":\"嘉定区\"},{\"code\":\"310115\",\"name\":\"浦东新区\"},{\"code\":\"310116\",\"name\":\"金山区\"},{\"code\":\"310117\",\"name\":\"松江区\"},{\"code\":\"310118\",\"name\":\"青浦区\"},{\"code\":\"310120\",\"name\":\"奉贤区\"},{\"code\":\"310151\",\"name\":\"崇明区\"}]}]},{\"code\":\"32\",\"name\":\"江苏省\",\"childs\":[{\"code\":\"3201\",\"name\":\"南京市\",\"childs\":[{\"code\":\"320102\",\"name\":\"玄武区\"},{\"code\":\"320104\",\"name\":\"秦淮区\"},{\"code\":\"320105\",\"name\":\"建邺区\"},{\"code\":\"320106\",\"name\":\"鼓楼区\"},{\"code\":\"320111\",\"name\":\"浦口区\"},{\"code\":\"320113\",\"name\":\"栖霞区\"},{\"code\":\"320114\",\"name\":\"雨花台区\"},{\"code\":\"320115\",\"name\":\"江宁区\"},{\"code\":\"320116\",\"name\":\"六合区\"},{\"code\":\"320117\",\"name\":\"溧水区\"},{\"code\":\"320118\",\"name\":\"高淳区\"}]},{\"code\":\"3202\",\"name\":\"无锡市\",\"childs\":[{\"code\":\"320205\",\"name\":\"锡山区\"},{\"code\":\"320206\",\"name\":\"惠山区\"},{\"code\":\"320211\",\"name\":\"滨湖区\"},{\"code\":\"320213\",\"name\":\"梁溪区\"},{\"code\":\"320214\",\"name\":\"新吴区\"},{\"code\":\"320281\",\"name\":\"江阴市\"},{\"code\":\"320282\",\"name\":\"宜兴市\"}]},{\"code\":\"3203\",\"name\":\"徐州市\",\"childs\":[{\"code\":\"320302\",\"name\":\"鼓楼区\"},{\"code\":\"320303\",\"name\":\"云龙区\"},{\"code\":\"320305\",\"name\":\"贾汪区\"},{\"code\":\"320311\",\"name\":\"泉山区\"},{\"code\":\"320312\",\"name\":\"铜山区\"},{\"code\":\"320321\",\"name\":\"丰县\"},{\"code\":\"320322\",\"name\":\"沛县\"},{\"code\":\"320324\",\"name\":\"睢宁县\"},{\"code\":\"320381\",\"name\":\"新沂市\"},{\"code\":\"320382\",\"name\":\"邳州市\"}]},{\"code\":\"3204\",\"name\":\"常州市\",\"childs\":[{\"code\":\"320402\",\"name\":\"天宁区\"},{\"code\":\"320404\",\"name\":\"钟楼区\"},{\"code\":\"320411\",\"name\":\"新北区\"},{\"code\":\"320412\",\"name\":\"武进区\"},{\"code\":\"320413\",\"name\":\"金坛区\"},{\"code\":\"320481\",\"name\":\"溧阳市\"}]},{\"code\":\"3205\",\"name\":\"苏州市\",\"childs\":[{\"code\":\"320505\",\"name\":\"虎丘区\"},{\"code\":\"320506\",\"name\":\"吴中区\"},{\"code\":\"320507\",\"name\":\"相城区\"},{\"code\":\"320508\",\"name\":\"姑苏区\"},{\"code\":\"320509\",\"name\":\"吴江区\"},{\"code\":\"320581\",\"name\":\"常熟市\"},{\"code\":\"320582\",\"name\":\"张家港市\"},{\"code\":\"320583\",\"name\":\"昆山市\"},{\"code\":\"320585\",\"name\":\"太仓市\"}]},{\"code\":\"3206\",\"name\":\"南通市\",\"childs\":[{\"code\":\"320602\",\"name\":\"崇川区\"},{\"code\":\"320611\",\"name\":\"港闸区\"},{\"code\":\"320612\",\"name\":\"通州区\"},{\"code\":\"320621\",\"name\":\"海安县\"},{\"code\":\"320623\",\"name\":\"如东县\"},{\"code\":\"320681\",\"name\":\"启东市\"},{\"code\":\"320682\",\"name\":\"如皋市\"},{\"code\":\"320684\",\"name\":\"海门市\"}]},{\"code\":\"3207\",\"name\":\"连云港市\",\"childs\":[{\"code\":\"320703\",\"name\":\"连云区\"},{\"code\":\"320706\",\"name\":\"海州区\"},{\"code\":\"320707\",\"name\":\"赣榆区\"},{\"code\":\"320722\",\"name\":\"东海县\"},{\"code\":\"320723\",\"name\":\"灌云县\"},{\"code\":\"320724\",\"name\":\"灌南县\"}]},{\"code\":\"3208\",\"name\":\"淮安市\",\"childs\":[{\"code\":\"320803\",\"name\":\"淮安区\"},{\"code\":\"320804\",\"name\":\"淮阴区\"},{\"code\":\"320812\",\"name\":\"清江浦区\"},{\"code\":\"320813\",\"name\":\"洪泽区\"},{\"code\":\"320826\",\"name\":\"涟水县\"},{\"code\":\"320830\",\"name\":\"盱眙县\"},{\"code\":\"320831\",\"name\":\"金湖县\"}]},{\"code\":\"3209\",\"name\":\"盐城市\",\"childs\":[{\"code\":\"320902\",\"name\":\"亭湖区\"},{\"code\":\"320903\",\"name\":\"盐都区\"},{\"code\":\"320904\",\"name\":\"大丰区\"},{\"code\":\"320921\",\"name\":\"响水县\"},{\"code\":\"320922\",\"name\":\"滨海县\"},{\"code\":\"320923\",\"name\":\"阜宁县\"},{\"code\":\"320924\",\"name\":\"射阳县\"},{\"code\":\"320925\",\"name\":\"建湖县\"},{\"code\":\"320981\",\"name\":\"东台市\"}]},{\"code\":\"3210\",\"name\":\"扬州市\",\"childs\":[{\"code\":\"321002\",\"name\":\"广陵区\"},{\"code\":\"321003\",\"name\":\"邗江区\"},{\"code\":\"321012\",\"name\":\"江都区\"},{\"code\":\"321023\",\"name\":\"宝应县\"},{\"code\":\"321081\",\"name\":\"仪征市\"},{\"code\":\"321084\",\"name\":\"高邮市\"}]},{\"code\":\"3211\",\"name\":\"镇江市\",\"childs\":[{\"code\":\"321102\",\"name\":\"京口区\"},{\"code\":\"321111\",\"name\":\"润州区\"},{\"code\":\"321112\",\"name\":\"丹徒区\"},{\"code\":\"321181\",\"name\":\"丹阳市\"},{\"code\":\"321182\",\"name\":\"扬中市\"},{\"code\":\"321183\",\"name\":\"句容市\"}]},{\"code\":\"3212\",\"name\":\"泰州市\",\"childs\":[{\"code\":\"321202\",\"name\":\"海陵区\"},{\"code\":\"321203\",\"name\":\"高港区\"},{\"code\":\"321204\",\"name\":\"姜堰区\"},{\"code\":\"321281\",\"name\":\"兴化市\"},{\"code\":\"321282\",\"name\":\"靖江市\"},{\"code\":\"321283\",\"name\":\"泰兴市\"}]},{\"code\":\"3213\",\"name\":\"宿迁市\",\"childs\":[{\"code\":\"321302\",\"name\":\"宿城区\"},{\"code\":\"321311\",\"name\":\"宿豫区\"},{\"code\":\"321322\",\"name\":\"沭阳县\"},{\"code\":\"321323\",\"name\":\"泗阳县\"},{\"code\":\"321324\",\"name\":\"泗洪县\"}]}]},{\"code\":\"33\",\"name\":\"浙江省\",\"childs\":[{\"code\":\"3301\",\"name\":\"杭州市\",\"childs\":[{\"code\":\"330102\",\"name\":\"上城区\"},{\"code\":\"330103\",\"name\":\"下城区\"},{\"code\":\"330104\",\"name\":\"江干区\"},{\"code\":\"330105\",\"name\":\"拱墅区\"},{\"code\":\"330106\",\"name\":\"西湖区\"},{\"code\":\"330108\",\"name\":\"滨江区\"},{\"code\":\"330109\",\"name\":\"萧山区\"},{\"code\":\"330110\",\"name\":\"余杭区\"},{\"code\":\"330111\",\"name\":\"富阳区\"},{\"code\":\"330122\",\"name\":\"桐庐县\"},{\"code\":\"330127\",\"name\":\"淳安县\"},{\"code\":\"330182\",\"name\":\"建德市\"},{\"code\":\"330185\",\"name\":\"临安市\"}]},{\"code\":\"3302\",\"name\":\"宁波市\",\"childs\":[{\"code\":\"330203\",\"name\":\"海曙区\"},{\"code\":\"330204\",\"name\":\"江东区\"},{\"code\":\"330205\",\"name\":\"江北区\"},{\"code\":\"330206\",\"name\":\"北仑区\"},{\"code\":\"330211\",\"name\":\"镇海区\"},{\"code\":\"330212\",\"name\":\"鄞州区\"},{\"code\":\"330225\",\"name\":\"象山县\"},{\"code\":\"330226\",\"name\":\"宁海县\"},{\"code\":\"330281\",\"name\":\"余姚市\"},{\"code\":\"330282\",\"name\":\"慈溪市\"},{\"code\":\"330283\",\"name\":\"奉化市\"}]},{\"code\":\"3303\",\"name\":\"温州市\",\"childs\":[{\"code\":\"330302\",\"name\":\"鹿城区\"},{\"code\":\"330303\",\"name\":\"龙湾区\"},{\"code\":\"330304\",\"name\":\"瓯海区\"},{\"code\":\"330305\",\"name\":\"洞头区\"},{\"code\":\"330324\",\"name\":\"永嘉县\"},{\"code\":\"330326\",\"name\":\"平阳县\"},{\"code\":\"330327\",\"name\":\"苍南县\"},{\"code\":\"330328\",\"name\":\"文成县\"},{\"code\":\"330329\",\"name\":\"泰顺县\"},{\"code\":\"330381\",\"name\":\"瑞安市\"},{\"code\":\"330382\",\"name\":\"乐清市\"}]},{\"code\":\"3304\",\"name\":\"嘉兴市\",\"childs\":[{\"code\":\"330402\",\"name\":\"南湖区\"},{\"code\":\"330411\",\"name\":\"秀洲区\"},{\"code\":\"330421\",\"name\":\"嘉善县\"},{\"code\":\"330424\",\"name\":\"海盐县\"},{\"code\":\"330481\",\"name\":\"海宁市\"},{\"code\":\"330482\",\"name\":\"平湖市\"},{\"code\":\"330483\",\"name\":\"桐乡市\"}]},{\"code\":\"3305\",\"name\":\"湖州市\",\"childs\":[{\"code\":\"330502\",\"name\":\"吴兴区\"},{\"code\":\"330503\",\"name\":\"南浔区\"},{\"code\":\"330521\",\"name\":\"德清县\"},{\"code\":\"330522\",\"name\":\"长兴县\"},{\"code\":\"330523\",\"name\":\"安吉县\"}]},{\"code\":\"3306\",\"name\":\"绍兴市\",\"childs\":[{\"code\":\"330602\",\"name\":\"越城区\"},{\"code\":\"330603\",\"name\":\"柯桥区\"},{\"code\":\"330604\",\"name\":\"上虞区\"},{\"code\":\"330624\",\"name\":\"新昌县\"},{\"code\":\"330681\",\"name\":\"诸暨市\"},{\"code\":\"330683\",\"name\":\"嵊州市\"}]},{\"code\":\"3307\",\"name\":\"金华市\",\"childs\":[{\"code\":\"330702\",\"name\":\"婺城区\"},{\"code\":\"330703\",\"name\":\"金东区\"},{\"code\":\"330723\",\"name\":\"武义县\"},{\"code\":\"330726\",\"name\":\"浦江县\"},{\"code\":\"330727\",\"name\":\"磐安县\"},{\"code\":\"330781\",\"name\":\"兰溪市\"},{\"code\":\"330782\",\"name\":\"义乌市\"},{\"code\":\"330783\",\"name\":\"东阳市\"},{\"code\":\"330784\",\"name\":\"永康市\"}]},{\"code\":\"3308\",\"name\":\"衢州市\",\"childs\":[{\"code\":\"330802\",\"name\":\"柯城区\"},{\"code\":\"330803\",\"name\":\"衢江区\"},{\"code\":\"330822\",\"name\":\"常山县\"},{\"code\":\"330824\",\"name\":\"开化县\"},{\"code\":\"330825\",\"name\":\"龙游县\"},{\"code\":\"330881\",\"name\":\"江山市\"}]},{\"code\":\"3309\",\"name\":\"舟山市\",\"childs\":[{\"code\":\"330902\",\"name\":\"定海区\"},{\"code\":\"330903\",\"name\":\"普陀区\"},{\"code\":\"330921\",\"name\":\"岱山县\"},{\"code\":\"330922\",\"name\":\"嵊泗县\"}]},{\"code\":\"3310\",\"name\":\"台州市\",\"childs\":[{\"code\":\"331002\",\"name\":\"椒江区\"},{\"code\":\"331003\",\"name\":\"黄岩区\"},{\"code\":\"331004\",\"name\":\"路桥区\"},{\"code\":\"331021\",\"name\":\"玉环县\"},{\"code\":\"331022\",\"name\":\"三门县\"},{\"code\":\"331023\",\"name\":\"天台县\"},{\"code\":\"331024\",\"name\":\"仙居县\"},{\"code\":\"331081\",\"name\":\"温岭市\"},{\"code\":\"331082\",\"name\":\"临海市\"}]},{\"code\":\"3311\",\"name\":\"丽水市\",\"childs\":[{\"code\":\"331102\",\"name\":\"莲都区\"},{\"code\":\"331121\",\"name\":\"青田县\"},{\"code\":\"331122\",\"name\":\"缙云县\"},{\"code\":\"331123\",\"name\":\"遂昌县\"},{\"code\":\"331124\",\"name\":\"松阳县\"},{\"code\":\"331125\",\"name\":\"云和县\"},{\"code\":\"331126\",\"name\":\"庆元县\"},{\"code\":\"331127\",\"name\":\"景宁畲族自治县\"},{\"code\":\"331181\",\"name\":\"龙泉市\"}]}]},{\"code\":\"34\",\"name\":\"安徽省\",\"childs\":[{\"code\":\"3401\",\"name\":\"合肥市\",\"childs\":[{\"code\":\"340102\",\"name\":\"瑶海区\"},{\"code\":\"340103\",\"name\":\"庐阳区\"},{\"code\":\"340104\",\"name\":\"蜀山区\"},{\"code\":\"340111\",\"name\":\"包河区\"},{\"code\":\"340121\",\"name\":\"长丰县\"},{\"code\":\"340122\",\"name\":\"肥东县\"},{\"code\":\"340123\",\"name\":\"肥西县\"},{\"code\":\"340124\",\"name\":\"庐江县\"},{\"code\":\"340181\",\"name\":\"巢湖市\"}]},{\"code\":\"3402\",\"name\":\"芜湖市\",\"childs\":[{\"code\":\"340202\",\"name\":\"镜湖区\"},{\"code\":\"340203\",\"name\":\"弋江区\"},{\"code\":\"340207\",\"name\":\"鸠江区\"},{\"code\":\"340208\",\"name\":\"三山区\"},{\"code\":\"340221\",\"name\":\"芜湖县\"},{\"code\":\"340222\",\"name\":\"繁昌县\"},{\"code\":\"340223\",\"name\":\"南陵县\"},{\"code\":\"340225\",\"name\":\"无为县\"}]},{\"code\":\"3403\",\"name\":\"蚌埠市\",\"childs\":[{\"code\":\"340302\",\"name\":\"龙子湖区\"},{\"code\":\"340303\",\"name\":\"蚌山区\"},{\"code\":\"340304\",\"name\":\"禹会区\"},{\"code\":\"340311\",\"name\":\"淮上区\"},{\"code\":\"340321\",\"name\":\"怀远县\"},{\"code\":\"340322\",\"name\":\"五河县\"},{\"code\":\"340323\",\"name\":\"固镇县\"}]},{\"code\":\"3404\",\"name\":\"淮南市\",\"childs\":[{\"code\":\"340402\",\"name\":\"大通区\"},{\"code\":\"340403\",\"name\":\"田家庵区\"},{\"code\":\"340404\",\"name\":\"谢家集区\"},{\"code\":\"340405\",\"name\":\"八公山区\"},{\"code\":\"340406\",\"name\":\"潘集区\"},{\"code\":\"340421\",\"name\":\"凤台县\"},{\"code\":\"340422\",\"name\":\"寿县\"}]},{\"code\":\"3405\",\"name\":\"马鞍山市\",\"childs\":[{\"code\":\"340503\",\"name\":\"花山区\"},{\"code\":\"340504\",\"name\":\"雨山区\"},{\"code\":\"340506\",\"name\":\"博望区\"},{\"code\":\"340521\",\"name\":\"当涂县\"},{\"code\":\"340522\",\"name\":\"含山县\"},{\"code\":\"340523\",\"name\":\"和县\"}]},{\"code\":\"3406\",\"name\":\"淮北市\",\"childs\":[{\"code\":\"340602\",\"name\":\"杜集区\"},{\"code\":\"340603\",\"name\":\"相山区\"},{\"code\":\"340604\",\"name\":\"烈山区\"},{\"code\":\"340621\",\"name\":\"濉溪县\"}]},{\"code\":\"3407\",\"name\":\"铜陵市\",\"childs\":[{\"code\":\"340705\",\"name\":\"铜官区\"},{\"code\":\"340706\",\"name\":\"义安区\"},{\"code\":\"340711\",\"name\":\"郊区\"},{\"code\":\"340722\",\"name\":\"枞阳县\"}]},{\"code\":\"3408\",\"name\":\"安庆市\",\"childs\":[{\"code\":\"340802\",\"name\":\"迎江区\"},{\"code\":\"340803\",\"name\":\"大观区\"},{\"code\":\"340811\",\"name\":\"宜秀区\"},{\"code\":\"340822\",\"name\":\"怀宁县\"},{\"code\":\"340824\",\"name\":\"潜山县\"},{\"code\":\"340825\",\"name\":\"太湖县\"},{\"code\":\"340826\",\"name\":\"宿松县\"},{\"code\":\"340827\",\"name\":\"望江县\"},{\"code\":\"340828\",\"name\":\"岳西县\"},{\"code\":\"340881\",\"name\":\"桐城市\"}]},{\"code\":\"3410\",\"name\":\"黄山市\",\"childs\":[{\"code\":\"341002\",\"name\":\"屯溪区\"},{\"code\":\"341003\",\"name\":\"黄山区\"},{\"code\":\"341004\",\"name\":\"徽州区\"},{\"code\":\"341021\",\"name\":\"歙县\"},{\"code\":\"341022\",\"name\":\"休宁县\"},{\"code\":\"341023\",\"name\":\"黟县\"},{\"code\":\"341024\",\"name\":\"祁门县\"}]},{\"code\":\"3411\",\"name\":\"滁州市\",\"childs\":[{\"code\":\"341102\",\"name\":\"琅琊区\"},{\"code\":\"341103\",\"name\":\"南谯区\"},{\"code\":\"341122\",\"name\":\"来安县\"},{\"code\":\"341124\",\"name\":\"全椒县\"},{\"code\":\"341125\",\"name\":\"定远县\"},{\"code\":\"341126\",\"name\":\"凤阳县\"},{\"code\":\"341181\",\"name\":\"天长市\"},{\"code\":\"341182\",\"name\":\"明光市\"}]},{\"code\":\"3412\",\"name\":\"阜阳市\",\"childs\":[{\"code\":\"341202\",\"name\":\"颍州区\"},{\"code\":\"341203\",\"name\":\"颍东区\"},{\"code\":\"341204\",\"name\":\"颍泉区\"},{\"code\":\"341221\",\"name\":\"临泉县\"},{\"code\":\"341222\",\"name\":\"太和县\"},{\"code\":\"341225\",\"name\":\"阜南县\"},{\"code\":\"341226\",\"name\":\"颍上县\"},{\"code\":\"341282\",\"name\":\"界首市\"}]},{\"code\":\"3413\",\"name\":\"宿州市\",\"childs\":[{\"code\":\"341302\",\"name\":\"埇桥区\"},{\"code\":\"341321\",\"name\":\"砀山县\"},{\"code\":\"341322\",\"name\":\"萧县\"},{\"code\":\"341323\",\"name\":\"灵璧县\"},{\"code\":\"341324\",\"name\":\"泗县\"}]},{\"code\":\"3415\",\"name\":\"六安市\",\"childs\":[{\"code\":\"341502\",\"name\":\"金安区\"},{\"code\":\"341503\",\"name\":\"裕安区\"},{\"code\":\"341504\",\"name\":\"叶集区\"},{\"code\":\"341522\",\"name\":\"霍邱县\"},{\"code\":\"341523\",\"name\":\"舒城县\"},{\"code\":\"341524\",\"name\":\"金寨县\"},{\"code\":\"341525\",\"name\":\"霍山县\"}]},{\"code\":\"3416\",\"name\":\"亳州市\",\"childs\":[{\"code\":\"341602\",\"name\":\"谯城区\"},{\"code\":\"341621\",\"name\":\"涡阳县\"},{\"code\":\"341622\",\"name\":\"蒙城县\"},{\"code\":\"341623\",\"name\":\"利辛县\"}]},{\"code\":\"3417\",\"name\":\"池州市\",\"childs\":[{\"code\":\"341702\",\"name\":\"贵池区\"},{\"code\":\"341721\",\"name\":\"东至县\"},{\"code\":\"341722\",\"name\":\"石台县\"},{\"code\":\"341723\",\"name\":\"青阳县\"}]},{\"code\":\"3418\",\"name\":\"宣城市\",\"childs\":[{\"code\":\"341802\",\"name\":\"宣州区\"},{\"code\":\"341821\",\"name\":\"郎溪县\"},{\"code\":\"341822\",\"name\":\"广德县\"},{\"code\":\"341823\",\"name\":\"泾县\"},{\"code\":\"341824\",\"name\":\"绩溪县\"},{\"code\":\"341825\",\"name\":\"旌德县\"},{\"code\":\"341881\",\"name\":\"宁国市\"}]}]},{\"code\":\"35\",\"name\":\"福建省\",\"childs\":[{\"code\":\"3501\",\"name\":\"福州市\",\"childs\":[{\"code\":\"350102\",\"name\":\"鼓楼区\"},{\"code\":\"350103\",\"name\":\"台江区\"},{\"code\":\"350104\",\"name\":\"仓山区\"},{\"code\":\"350105\",\"name\":\"马尾区\"},{\"code\":\"350111\",\"name\":\"晋安区\"},{\"code\":\"350121\",\"name\":\"闽侯县\"},{\"code\":\"350122\",\"name\":\"连江县\"},{\"code\":\"350123\",\"name\":\"罗源县\"},{\"code\":\"350124\",\"name\":\"闽清县\"},{\"code\":\"350125\",\"name\":\"永泰县\"},{\"code\":\"350128\",\"name\":\"平潭县\"},{\"code\":\"350181\",\"name\":\"福清市\"},{\"code\":\"350182\",\"name\":\"长乐市\"}]},{\"code\":\"3502\",\"name\":\"厦门市\",\"childs\":[{\"code\":\"350203\",\"name\":\"思明区\"},{\"code\":\"350205\",\"name\":\"海沧区\"},{\"code\":\"350206\",\"name\":\"湖里区\"},{\"code\":\"350211\",\"name\":\"集美区\"},{\"code\":\"350212\",\"name\":\"同安区\"},{\"code\":\"350213\",\"name\":\"翔安区\"}]},{\"code\":\"3503\",\"name\":\"莆田市\",\"childs\":[{\"code\":\"350302\",\"name\":\"城厢区\"},{\"code\":\"350303\",\"name\":\"涵江区\"},{\"code\":\"350304\",\"name\":\"荔城区\"},{\"code\":\"350305\",\"name\":\"秀屿区\"},{\"code\":\"350322\",\"name\":\"仙游县\"}]},{\"code\":\"3504\",\"name\":\"三明市\",\"childs\":[{\"code\":\"350402\",\"name\":\"梅列区\"},{\"code\":\"350403\",\"name\":\"三元区\"},{\"code\":\"350421\",\"name\":\"明溪县\"},{\"code\":\"350423\",\"name\":\"清流县\"},{\"code\":\"350424\",\"name\":\"宁化县\"},{\"code\":\"350425\",\"name\":\"大田县\"},{\"code\":\"350426\",\"name\":\"尤溪县\"},{\"code\":\"350427\",\"name\":\"沙县\"},{\"code\":\"350428\",\"name\":\"将乐县\"},{\"code\":\"350429\",\"name\":\"泰宁县\"},{\"code\":\"350430\",\"name\":\"建宁县\"},{\"code\":\"350481\",\"name\":\"永安市\"}]},{\"code\":\"3505\",\"name\":\"泉州市\",\"childs\":[{\"code\":\"350502\",\"name\":\"鲤城区\"},{\"code\":\"350503\",\"name\":\"丰泽区\"},{\"code\":\"350504\",\"name\":\"洛江区\"},{\"code\":\"350505\",\"name\":\"泉港区\"},{\"code\":\"350521\",\"name\":\"惠安县\"},{\"code\":\"350524\",\"name\":\"安溪县\"},{\"code\":\"350525\",\"name\":\"永春县\"},{\"code\":\"350526\",\"name\":\"德化县\"},{\"code\":\"350527\",\"name\":\"金门县\"},{\"code\":\"350581\",\"name\":\"石狮市\"},{\"code\":\"350582\",\"name\":\"晋江市\"},{\"code\":\"350583\",\"name\":\"南安市\"}]},{\"code\":\"3506\",\"name\":\"漳州市\",\"childs\":[{\"code\":\"350602\",\"name\":\"芗城区\"},{\"code\":\"350603\",\"name\":\"龙文区\"},{\"code\":\"350622\",\"name\":\"云霄县\"},{\"code\":\"350623\",\"name\":\"漳浦县\"},{\"code\":\"350624\",\"name\":\"诏安县\"},{\"code\":\"350625\",\"name\":\"长泰县\"},{\"code\":\"350626\",\"name\":\"东山县\"},{\"code\":\"350627\",\"name\":\"南靖县\"},{\"code\":\"350628\",\"name\":\"平和县\"},{\"code\":\"350629\",\"name\":\"华安县\"},{\"code\":\"350681\",\"name\":\"龙海市\"}]},{\"code\":\"3507\",\"name\":\"南平市\",\"childs\":[{\"code\":\"350702\",\"name\":\"延平区\"},{\"code\":\"350703\",\"name\":\"建阳区\"},{\"code\":\"350721\",\"name\":\"顺昌县\"},{\"code\":\"350722\",\"name\":\"浦城县\"},{\"code\":\"350723\",\"name\":\"光泽县\"},{\"code\":\"350724\",\"name\":\"松溪县\"},{\"code\":\"350725\",\"name\":\"政和县\"},{\"code\":\"350781\",\"name\":\"邵武市\"},{\"code\":\"350782\",\"name\":\"武夷山市\"},{\"code\":\"350783\",\"name\":\"建瓯市\"}]},{\"code\":\"3508\",\"name\":\"龙岩市\",\"childs\":[{\"code\":\"350802\",\"name\":\"新罗区\"},{\"code\":\"350803\",\"name\":\"永定区\"},{\"code\":\"350821\",\"name\":\"长汀县\"},{\"code\":\"350823\",\"name\":\"上杭县\"},{\"code\":\"350824\",\"name\":\"武平县\"},{\"code\":\"350825\",\"name\":\"连城县\"},{\"code\":\"350881\",\"name\":\"漳平市\"}]},{\"code\":\"3509\",\"name\":\"宁德市\",\"childs\":[{\"code\":\"350902\",\"name\":\"蕉城区\"},{\"code\":\"350921\",\"name\":\"霞浦县\"},{\"code\":\"350922\",\"name\":\"古田县\"},{\"code\":\"350923\",\"name\":\"屏南县\"},{\"code\":\"350924\",\"name\":\"寿宁县\"},{\"code\":\"350925\",\"name\":\"周宁县\"},{\"code\":\"350926\",\"name\":\"柘荣县\"},{\"code\":\"350981\",\"name\":\"福安市\"},{\"code\":\"350982\",\"name\":\"福鼎市\"}]}]},{\"code\":\"36\",\"name\":\"江西省\",\"childs\":[{\"code\":\"3601\",\"name\":\"南昌市\",\"childs\":[{\"code\":\"360102\",\"name\":\"东湖区\"},{\"code\":\"360103\",\"name\":\"西湖区\"},{\"code\":\"360104\",\"name\":\"青云谱区\"},{\"code\":\"360105\",\"name\":\"湾里区\"},{\"code\":\"360111\",\"name\":\"青山湖区\"},{\"code\":\"360112\",\"name\":\"新建区\"},{\"code\":\"360121\",\"name\":\"南昌县\"},{\"code\":\"360123\",\"name\":\"安义县\"},{\"code\":\"360124\",\"name\":\"进贤县\"}]},{\"code\":\"3602\",\"name\":\"景德镇市\",\"childs\":[{\"code\":\"360202\",\"name\":\"昌江区\"},{\"code\":\"360203\",\"name\":\"珠山区\"},{\"code\":\"360222\",\"name\":\"浮梁县\"},{\"code\":\"360281\",\"name\":\"乐平市\"}]},{\"code\":\"3603\",\"name\":\"萍乡市\",\"childs\":[{\"code\":\"360302\",\"name\":\"安源区\"},{\"code\":\"360313\",\"name\":\"湘东区\"},{\"code\":\"360321\",\"name\":\"莲花县\"},{\"code\":\"360322\",\"name\":\"上栗县\"},{\"code\":\"360323\",\"name\":\"芦溪县\"}]},{\"code\":\"3604\",\"name\":\"九江市\",\"childs\":[{\"code\":\"360402\",\"name\":\"濂溪区\"},{\"code\":\"360403\",\"name\":\"浔阳区\"},{\"code\":\"360421\",\"name\":\"九江县\"},{\"code\":\"360423\",\"name\":\"武宁县\"},{\"code\":\"360424\",\"name\":\"修水县\"},{\"code\":\"360425\",\"name\":\"永修县\"},{\"code\":\"360426\",\"name\":\"德安县\"},{\"code\":\"360428\",\"name\":\"都昌县\"},{\"code\":\"360429\",\"name\":\"湖口县\"},{\"code\":\"360430\",\"name\":\"彭泽县\"},{\"code\":\"360481\",\"name\":\"瑞昌市\"},{\"code\":\"360482\",\"name\":\"共青城市\"},{\"code\":\"360483\",\"name\":\"庐山市\"}]},{\"code\":\"3605\",\"name\":\"新余市\",\"childs\":[{\"code\":\"360502\",\"name\":\"渝水区\"},{\"code\":\"360521\",\"name\":\"分宜县\"}]},{\"code\":\"3606\",\"name\":\"鹰潭市\",\"childs\":[{\"code\":\"360602\",\"name\":\"月湖区\"},{\"code\":\"360622\",\"name\":\"余江县\"},{\"code\":\"360681\",\"name\":\"贵溪市\"}]},{\"code\":\"3607\",\"name\":\"赣州市\",\"childs\":[{\"code\":\"360702\",\"name\":\"章贡区\"},{\"code\":\"360703\",\"name\":\"南康区\"},{\"code\":\"360721\",\"name\":\"赣县\"},{\"code\":\"360722\",\"name\":\"信丰县\"},{\"code\":\"360723\",\"name\":\"大余县\"},{\"code\":\"360724\",\"name\":\"上犹县\"},{\"code\":\"360725\",\"name\":\"崇义县\"},{\"code\":\"360726\",\"name\":\"安远县\"},{\"code\":\"360727\",\"name\":\"龙南县\"},{\"code\":\"360728\",\"name\":\"定南县\"},{\"code\":\"360729\",\"name\":\"全南县\"},{\"code\":\"360730\",\"name\":\"宁都县\"},{\"code\":\"360731\",\"name\":\"于都县\"},{\"code\":\"360732\",\"name\":\"兴国县\"},{\"code\":\"360733\",\"name\":\"会昌县\"},{\"code\":\"360734\",\"name\":\"寻乌县\"},{\"code\":\"360735\",\"name\":\"石城县\"},{\"code\":\"360781\",\"name\":\"瑞金市\"}]},{\"code\":\"3608\",\"name\":\"吉安市\",\"childs\":[{\"code\":\"360802\",\"name\":\"吉州区\"},{\"code\":\"360803\",\"name\":\"青原区\"},{\"code\":\"360821\",\"name\":\"吉安县\"},{\"code\":\"360822\",\"name\":\"吉水县\"},{\"code\":\"360823\",\"name\":\"峡江县\"},{\"code\":\"360824\",\"name\":\"新干县\"},{\"code\":\"360825\",\"name\":\"永丰县\"},{\"code\":\"360826\",\"name\":\"泰和县\"},{\"code\":\"360827\",\"name\":\"遂川县\"},{\"code\":\"360828\",\"name\":\"万安县\"},{\"code\":\"360829\",\"name\":\"安福县\"},{\"code\":\"360830\",\"name\":\"永新县\"},{\"code\":\"360881\",\"name\":\"井冈山市\"}]},{\"code\":\"3609\",\"name\":\"宜春市\",\"childs\":[{\"code\":\"360902\",\"name\":\"袁州区\"},{\"code\":\"360921\",\"name\":\"奉新县\"},{\"code\":\"360922\",\"name\":\"万载县\"},{\"code\":\"360923\",\"name\":\"上高县\"},{\"code\":\"360924\",\"name\":\"宜丰县\"},{\"code\":\"360925\",\"name\":\"靖安县\"},{\"code\":\"360926\",\"name\":\"铜鼓县\"},{\"code\":\"360981\",\"name\":\"丰城市\"},{\"code\":\"360982\",\"name\":\"樟树市\"},{\"code\":\"360983\",\"name\":\"高安市\"}]},{\"code\":\"3610\",\"name\":\"抚州市\",\"childs\":[{\"code\":\"361002\",\"name\":\"临川区\"},{\"code\":\"361021\",\"name\":\"南城县\"},{\"code\":\"361022\",\"name\":\"黎川县\"},{\"code\":\"361023\",\"name\":\"南丰县\"},{\"code\":\"361024\",\"name\":\"崇仁县\"},{\"code\":\"361025\",\"name\":\"乐安县\"},{\"code\":\"361026\",\"name\":\"宜黄县\"},{\"code\":\"361027\",\"name\":\"金溪县\"},{\"code\":\"361028\",\"name\":\"资溪县\"},{\"code\":\"361029\",\"name\":\"东乡县\"},{\"code\":\"361030\",\"name\":\"广昌县\"}]},{\"code\":\"3611\",\"name\":\"上饶市\",\"childs\":[{\"code\":\"361102\",\"name\":\"信州区\"},{\"code\":\"361103\",\"name\":\"广丰区\"},{\"code\":\"361121\",\"name\":\"上饶县\"},{\"code\":\"361123\",\"name\":\"玉山县\"},{\"code\":\"361124\",\"name\":\"铅山县\"},{\"code\":\"361125\",\"name\":\"横峰县\"},{\"code\":\"361126\",\"name\":\"弋阳县\"},{\"code\":\"361127\",\"name\":\"余干县\"},{\"code\":\"361128\",\"name\":\"鄱阳县\"},{\"code\":\"361129\",\"name\":\"万年县\"},{\"code\":\"361130\",\"name\":\"婺源县\"},{\"code\":\"361181\",\"name\":\"德兴市\"}]}]},{\"code\":\"37\",\"name\":\"山东省\",\"childs\":[{\"code\":\"3701\",\"name\":\"济南市\",\"childs\":[{\"code\":\"370102\",\"name\":\"历下区\"},{\"code\":\"370103\",\"name\":\"市中区\"},{\"code\":\"370104\",\"name\":\"槐荫区\"},{\"code\":\"370105\",\"name\":\"天桥区\"},{\"code\":\"370112\",\"name\":\"历城区\"},{\"code\":\"370113\",\"name\":\"长清区\"},{\"code\":\"370124\",\"name\":\"平阴县\"},{\"code\":\"370125\",\"name\":\"济阳县\"},{\"code\":\"370126\",\"name\":\"商河县\"},{\"code\":\"370181\",\"name\":\"章丘市\"}]},{\"code\":\"3702\",\"name\":\"青岛市\",\"childs\":[{\"code\":\"370202\",\"name\":\"市南区\"},{\"code\":\"370203\",\"name\":\"市北区\"},{\"code\":\"370211\",\"name\":\"黄岛区\"},{\"code\":\"370212\",\"name\":\"崂山区\"},{\"code\":\"370213\",\"name\":\"李沧区\"},{\"code\":\"370214\",\"name\":\"城阳区\"},{\"code\":\"370281\",\"name\":\"胶州市\"},{\"code\":\"370282\",\"name\":\"即墨市\"},{\"code\":\"370283\",\"name\":\"平度市\"},{\"code\":\"370285\",\"name\":\"莱西市\"}]},{\"code\":\"3703\",\"name\":\"淄博市\",\"childs\":[{\"code\":\"370302\",\"name\":\"淄川区\"},{\"code\":\"370303\",\"name\":\"张店区\"},{\"code\":\"370304\",\"name\":\"博山区\"},{\"code\":\"370305\",\"name\":\"临淄区\"},{\"code\":\"370306\",\"name\":\"周村区\"},{\"code\":\"370321\",\"name\":\"桓台县\"},{\"code\":\"370322\",\"name\":\"高青县\"},{\"code\":\"370323\",\"name\":\"沂源县\"}]},{\"code\":\"3704\",\"name\":\"枣庄市\",\"childs\":[{\"code\":\"370402\",\"name\":\"市中区\"},{\"code\":\"370403\",\"name\":\"薛城区\"},{\"code\":\"370404\",\"name\":\"峄城区\"},{\"code\":\"370405\",\"name\":\"台儿庄区\"},{\"code\":\"370406\",\"name\":\"山亭区\"},{\"code\":\"370481\",\"name\":\"滕州市\"}]},{\"code\":\"3705\",\"name\":\"东营市\",\"childs\":[{\"code\":\"370502\",\"name\":\"东营区\"},{\"code\":\"370503\",\"name\":\"河口区\"},{\"code\":\"370505\",\"name\":\"垦利区\"},{\"code\":\"370522\",\"name\":\"利津县\"},{\"code\":\"370523\",\"name\":\"广饶县\"}]},{\"code\":\"3706\",\"name\":\"烟台市\",\"childs\":[{\"code\":\"370602\",\"name\":\"芝罘区\"},{\"code\":\"370611\",\"name\":\"福山区\"},{\"code\":\"370612\",\"name\":\"牟平区\"},{\"code\":\"370613\",\"name\":\"莱山区\"},{\"code\":\"370634\",\"name\":\"长岛县\"},{\"code\":\"370681\",\"name\":\"龙口市\"},{\"code\":\"370682\",\"name\":\"莱阳市\"},{\"code\":\"370683\",\"name\":\"莱州市\"},{\"code\":\"370684\",\"name\":\"蓬莱市\"},{\"code\":\"370685\",\"name\":\"招远市\"},{\"code\":\"370686\",\"name\":\"栖霞市\"},{\"code\":\"370687\",\"name\":\"海阳市\"}]},{\"code\":\"3707\",\"name\":\"潍坊市\",\"childs\":[{\"code\":\"370702\",\"name\":\"潍城区\"},{\"code\":\"370703\",\"name\":\"寒亭区\"},{\"code\":\"370704\",\"name\":\"坊子区\"},{\"code\":\"370705\",\"name\":\"奎文区\"},{\"code\":\"370724\",\"name\":\"临朐县\"},{\"code\":\"370725\",\"name\":\"昌乐县\"},{\"code\":\"370781\",\"name\":\"青州市\"},{\"code\":\"370782\",\"name\":\"诸城市\"},{\"code\":\"370783\",\"name\":\"寿光市\"},{\"code\":\"370784\",\"name\":\"安丘市\"},{\"code\":\"370785\",\"name\":\"高密市\"},{\"code\":\"370786\",\"name\":\"昌邑市\"}]},{\"code\":\"3708\",\"name\":\"济宁市\",\"childs\":[{\"code\":\"370811\",\"name\":\"任城区\"},{\"code\":\"370812\",\"name\":\"兖州区\"},{\"code\":\"370826\",\"name\":\"微山县\"},{\"code\":\"370827\",\"name\":\"鱼台县\"},{\"code\":\"370828\",\"name\":\"金乡县\"},{\"code\":\"370829\",\"name\":\"嘉祥县\"},{\"code\":\"370830\",\"name\":\"汶上县\"},{\"code\":\"370831\",\"name\":\"泗水县\"},{\"code\":\"370832\",\"name\":\"梁山县\"},{\"code\":\"370881\",\"name\":\"曲阜市\"},{\"code\":\"370883\",\"name\":\"邹城市\"}]},{\"code\":\"3709\",\"name\":\"泰安市\",\"childs\":[{\"code\":\"370902\",\"name\":\"泰山区\"},{\"code\":\"370911\",\"name\":\"岱岳区\"},{\"code\":\"370921\",\"name\":\"宁阳县\"},{\"code\":\"370923\",\"name\":\"东平县\"},{\"code\":\"370982\",\"name\":\"新泰市\"},{\"code\":\"370983\",\"name\":\"肥城市\"}]},{\"code\":\"3710\",\"name\":\"威海市\",\"childs\":[{\"code\":\"371002\",\"name\":\"环翠区\"},{\"code\":\"371003\",\"name\":\"文登区\"},{\"code\":\"371082\",\"name\":\"荣成市\"},{\"code\":\"371083\",\"name\":\"乳山市\"}]},{\"code\":\"3711\",\"name\":\"日照市\",\"childs\":[{\"code\":\"371102\",\"name\":\"东港区\"},{\"code\":\"371103\",\"name\":\"岚山区\"},{\"code\":\"371121\",\"name\":\"五莲县\"},{\"code\":\"371122\",\"name\":\"莒县\"}]},{\"code\":\"3712\",\"name\":\"莱芜市\",\"childs\":[{\"code\":\"371202\",\"name\":\"莱城区\"},{\"code\":\"371203\",\"name\":\"钢城区\"}]},{\"code\":\"3713\",\"name\":\"临沂市\",\"childs\":[{\"code\":\"371302\",\"name\":\"兰山区\"},{\"code\":\"371311\",\"name\":\"罗庄区\"},{\"code\":\"371312\",\"name\":\"河东区\"},{\"code\":\"371321\",\"name\":\"沂南县\"},{\"code\":\"371322\",\"name\":\"郯城县\"},{\"code\":\"371323\",\"name\":\"沂水县\"},{\"code\":\"371324\",\"name\":\"兰陵县\"},{\"code\":\"371325\",\"name\":\"费县\"},{\"code\":\"371326\",\"name\":\"平邑县\"},{\"code\":\"371327\",\"name\":\"莒南县\"},{\"code\":\"371328\",\"name\":\"蒙阴县\"},{\"code\":\"371329\",\"name\":\"临沭县\"}]},{\"code\":\"3714\",\"name\":\"德州市\",\"childs\":[{\"code\":\"371402\",\"name\":\"德城区\"},{\"code\":\"371403\",\"name\":\"陵城区\"},{\"code\":\"371422\",\"name\":\"宁津县\"},{\"code\":\"371423\",\"name\":\"庆云县\"},{\"code\":\"371424\",\"name\":\"临邑县\"},{\"code\":\"371425\",\"name\":\"齐河县\"},{\"code\":\"371426\",\"name\":\"平原县\"},{\"code\":\"371427\",\"name\":\"夏津县\"},{\"code\":\"371428\",\"name\":\"武城县\"},{\"code\":\"371481\",\"name\":\"乐陵市\"},{\"code\":\"371482\",\"name\":\"禹城市\"}]},{\"code\":\"3715\",\"name\":\"聊城市\",\"childs\":[{\"code\":\"371502\",\"name\":\"东昌府区\"},{\"code\":\"371521\",\"name\":\"阳谷县\"},{\"code\":\"371522\",\"name\":\"莘县\"},{\"code\":\"371523\",\"name\":\"茌平县\"},{\"code\":\"371524\",\"name\":\"东阿县\"},{\"code\":\"371525\",\"name\":\"冠县\"},{\"code\":\"371526\",\"name\":\"高唐县\"},{\"code\":\"371581\",\"name\":\"临清市\"}]},{\"code\":\"3716\",\"name\":\"滨州市\",\"childs\":[{\"code\":\"371602\",\"name\":\"滨城区\"},{\"code\":\"371603\",\"name\":\"沾化区\"},{\"code\":\"371621\",\"name\":\"惠民县\"},{\"code\":\"371622\",\"name\":\"阳信县\"},{\"code\":\"371623\",\"name\":\"无棣县\"},{\"code\":\"371625\",\"name\":\"博兴县\"},{\"code\":\"371626\",\"name\":\"邹平县\"}]},{\"code\":\"3717\",\"name\":\"菏泽市\",\"childs\":[{\"code\":\"371702\",\"name\":\"牡丹区\"},{\"code\":\"371703\",\"name\":\"定陶区\"},{\"code\":\"371721\",\"name\":\"曹县\"},{\"code\":\"371722\",\"name\":\"单县\"},{\"code\":\"371723\",\"name\":\"成武县\"},{\"code\":\"371724\",\"name\":\"巨野县\"},{\"code\":\"371725\",\"name\":\"郓城县\"},{\"code\":\"371726\",\"name\":\"鄄城县\"},{\"code\":\"371728\",\"name\":\"东明县\"}]}]},{\"code\":\"41\",\"name\":\"河南省\",\"childs\":[{\"code\":\"4101\",\"name\":\"郑州市\",\"childs\":[{\"code\":\"410102\",\"name\":\"中原区\"},{\"code\":\"410103\",\"name\":\"二七区\"},{\"code\":\"410104\",\"name\":\"管城回族区\"},{\"code\":\"410105\",\"name\":\"金水区\"},{\"code\":\"410106\",\"name\":\"上街区\"},{\"code\":\"410108\",\"name\":\"惠济区\"},{\"code\":\"410122\",\"name\":\"中牟县\"},{\"code\":\"410181\",\"name\":\"巩义市\"},{\"code\":\"410182\",\"name\":\"荥阳市\"},{\"code\":\"410183\",\"name\":\"新密市\"},{\"code\":\"410184\",\"name\":\"新郑市\"},{\"code\":\"410185\",\"name\":\"登封市\"}]},{\"code\":\"4102\",\"name\":\"开封市\",\"childs\":[{\"code\":\"410202\",\"name\":\"龙亭区\"},{\"code\":\"410203\",\"name\":\"顺河回族区\"},{\"code\":\"410204\",\"name\":\"鼓楼区\"},{\"code\":\"410205\",\"name\":\"禹王台区\"},{\"code\":\"410211\",\"name\":\"金明区\"},{\"code\":\"410212\",\"name\":\"祥符区\"},{\"code\":\"410221\",\"name\":\"杞县\"},{\"code\":\"410222\",\"name\":\"通许县\"},{\"code\":\"410223\",\"name\":\"尉氏县\"},{\"code\":\"410225\",\"name\":\"兰考县\"}]},{\"code\":\"4103\",\"name\":\"洛阳市\",\"childs\":[{\"code\":\"410302\",\"name\":\"老城区\"},{\"code\":\"410303\",\"name\":\"西工区\"},{\"code\":\"410304\",\"name\":\"瀍河回族区\"},{\"code\":\"410305\",\"name\":\"涧西区\"},{\"code\":\"410306\",\"name\":\"吉利区\"},{\"code\":\"410311\",\"name\":\"洛龙区\"},{\"code\":\"410322\",\"name\":\"孟津县\"},{\"code\":\"410323\",\"name\":\"新安县\"},{\"code\":\"410324\",\"name\":\"栾川县\"},{\"code\":\"410325\",\"name\":\"嵩县\"},{\"code\":\"410326\",\"name\":\"汝阳县\"},{\"code\":\"410327\",\"name\":\"宜阳县\"},{\"code\":\"410328\",\"name\":\"洛宁县\"},{\"code\":\"410329\",\"name\":\"伊川县\"},{\"code\":\"410381\",\"name\":\"偃师市\"}]},{\"code\":\"4104\",\"name\":\"平顶山市\",\"childs\":[{\"code\":\"410402\",\"name\":\"新华区\"},{\"code\":\"410403\",\"name\":\"卫东区\"},{\"code\":\"410404\",\"name\":\"石龙区\"},{\"code\":\"410411\",\"name\":\"湛河区\"},{\"code\":\"410421\",\"name\":\"宝丰县\"},{\"code\":\"410422\",\"name\":\"叶县\"},{\"code\":\"410423\",\"name\":\"鲁山县\"},{\"code\":\"410425\",\"name\":\"郏县\"},{\"code\":\"410481\",\"name\":\"舞钢市\"},{\"code\":\"410482\",\"name\":\"汝州市\"}]},{\"code\":\"4105\",\"name\":\"安阳市\",\"childs\":[{\"code\":\"410502\",\"name\":\"文峰区\"},{\"code\":\"410503\",\"name\":\"北关区\"},{\"code\":\"410505\",\"name\":\"殷都区\"},{\"code\":\"410506\",\"name\":\"龙安区\"},{\"code\":\"410522\",\"name\":\"安阳县\"},{\"code\":\"410523\",\"name\":\"汤阴县\"},{\"code\":\"410526\",\"name\":\"滑县\"},{\"code\":\"410527\",\"name\":\"内黄县\"},{\"code\":\"410581\",\"name\":\"林州市\"}]},{\"code\":\"4106\",\"name\":\"鹤壁市\",\"childs\":[{\"code\":\"410602\",\"name\":\"鹤山区\"},{\"code\":\"410603\",\"name\":\"山城区\"},{\"code\":\"410611\",\"name\":\"淇滨区\"},{\"code\":\"410621\",\"name\":\"浚县\"},{\"code\":\"410622\",\"name\":\"淇县\"}]},{\"code\":\"4107\",\"name\":\"新乡市\",\"childs\":[{\"code\":\"410702\",\"name\":\"红旗区\"},{\"code\":\"410703\",\"name\":\"卫滨区\"},{\"code\":\"410704\",\"name\":\"凤泉区\"},{\"code\":\"410711\",\"name\":\"牧野区\"},{\"code\":\"410721\",\"name\":\"新乡县\"},{\"code\":\"410724\",\"name\":\"获嘉县\"},{\"code\":\"410725\",\"name\":\"原阳县\"},{\"code\":\"410726\",\"name\":\"延津县\"},{\"code\":\"410727\",\"name\":\"封丘县\"},{\"code\":\"410728\",\"name\":\"长垣县\"},{\"code\":\"410781\",\"name\":\"卫辉市\"},{\"code\":\"410782\",\"name\":\"辉县市\"}]},{\"code\":\"4108\",\"name\":\"焦作市\",\"childs\":[{\"code\":\"410802\",\"name\":\"解放区\"},{\"code\":\"410803\",\"name\":\"中站区\"},{\"code\":\"410804\",\"name\":\"马村区\"},{\"code\":\"410811\",\"name\":\"山阳区\"},{\"code\":\"410821\",\"name\":\"修武县\"},{\"code\":\"410822\",\"name\":\"博爱县\"},{\"code\":\"410823\",\"name\":\"武陟县\"},{\"code\":\"410825\",\"name\":\"温县\"},{\"code\":\"410882\",\"name\":\"沁阳市\"},{\"code\":\"410883\",\"name\":\"孟州市\"}]},{\"code\":\"4109\",\"name\":\"濮阳市\",\"childs\":[{\"code\":\"410902\",\"name\":\"华龙区\"},{\"code\":\"410922\",\"name\":\"清丰县\"},{\"code\":\"410923\",\"name\":\"南乐县\"},{\"code\":\"410926\",\"name\":\"范县\"},{\"code\":\"410927\",\"name\":\"台前县\"},{\"code\":\"410928\",\"name\":\"濮阳县\"}]},{\"code\":\"4110\",\"name\":\"许昌市\",\"childs\":[{\"code\":\"411002\",\"name\":\"魏都区\"},{\"code\":\"411023\",\"name\":\"许昌县\"},{\"code\":\"411024\",\"name\":\"鄢陵县\"},{\"code\":\"411025\",\"name\":\"襄城县\"},{\"code\":\"411081\",\"name\":\"禹州市\"},{\"code\":\"411082\",\"name\":\"长葛市\"}]},{\"code\":\"4111\",\"name\":\"漯河市\",\"childs\":[{\"code\":\"411102\",\"name\":\"源汇区\"},{\"code\":\"411103\",\"name\":\"郾城区\"},{\"code\":\"411104\",\"name\":\"召陵区\"},{\"code\":\"411121\",\"name\":\"舞阳县\"},{\"code\":\"411122\",\"name\":\"临颍县\"}]},{\"code\":\"4112\",\"name\":\"三门峡市\",\"childs\":[{\"code\":\"411202\",\"name\":\"湖滨区\"},{\"code\":\"411203\",\"name\":\"陕州区\"},{\"code\":\"411221\",\"name\":\"渑池县\"},{\"code\":\"411224\",\"name\":\"卢氏县\"},{\"code\":\"411281\",\"name\":\"义马市\"},{\"code\":\"411282\",\"name\":\"灵宝市\"}]},{\"code\":\"4113\",\"name\":\"南阳市\",\"childs\":[{\"code\":\"411302\",\"name\":\"宛城区\"},{\"code\":\"411303\",\"name\":\"卧龙区\"},{\"code\":\"411321\",\"name\":\"南召县\"},{\"code\":\"411322\",\"name\":\"方城县\"},{\"code\":\"411323\",\"name\":\"西峡县\"},{\"code\":\"411324\",\"name\":\"镇平县\"},{\"code\":\"411325\",\"name\":\"内乡县\"},{\"code\":\"411326\",\"name\":\"淅川县\"},{\"code\":\"411327\",\"name\":\"社旗县\"},{\"code\":\"411328\",\"name\":\"唐河县\"},{\"code\":\"411329\",\"name\":\"新野县\"},{\"code\":\"411330\",\"name\":\"桐柏县\"},{\"code\":\"411381\",\"name\":\"邓州市\"}]},{\"code\":\"4114\",\"name\":\"商丘市\",\"childs\":[{\"code\":\"411402\",\"name\":\"梁园区\"},{\"code\":\"411403\",\"name\":\"睢阳区\"},{\"code\":\"411421\",\"name\":\"民权县\"},{\"code\":\"411422\",\"name\":\"睢县\"},{\"code\":\"411423\",\"name\":\"宁陵县\"},{\"code\":\"411424\",\"name\":\"柘城县\"},{\"code\":\"411425\",\"name\":\"虞城县\"},{\"code\":\"411426\",\"name\":\"夏邑县\"},{\"code\":\"411481\",\"name\":\"永城市\"}]},{\"code\":\"4115\",\"name\":\"信阳市\",\"childs\":[{\"code\":\"411502\",\"name\":\"浉河区\"},{\"code\":\"411503\",\"name\":\"平桥区\"},{\"code\":\"411521\",\"name\":\"罗山县\"},{\"code\":\"411522\",\"name\":\"光山县\"},{\"code\":\"411523\",\"name\":\"新县\"},{\"code\":\"411524\",\"name\":\"商城县\"},{\"code\":\"411525\",\"name\":\"固始县\"},{\"code\":\"411526\",\"name\":\"潢川县\"},{\"code\":\"411527\",\"name\":\"淮滨县\"},{\"code\":\"411528\",\"name\":\"息县\"}]},{\"code\":\"4116\",\"name\":\"周口市\",\"childs\":[{\"code\":\"411602\",\"name\":\"川汇区\"},{\"code\":\"411621\",\"name\":\"扶沟县\"},{\"code\":\"411622\",\"name\":\"西华县\"},{\"code\":\"411623\",\"name\":\"商水县\"},{\"code\":\"411624\",\"name\":\"沈丘县\"},{\"code\":\"411625\",\"name\":\"郸城县\"},{\"code\":\"411626\",\"name\":\"淮阳县\"},{\"code\":\"411627\",\"name\":\"太康县\"},{\"code\":\"411628\",\"name\":\"鹿邑县\"},{\"code\":\"411681\",\"name\":\"项城市\"}]},{\"code\":\"4117\",\"name\":\"驻马店市\",\"childs\":[{\"code\":\"411702\",\"name\":\"驿城区\"},{\"code\":\"411721\",\"name\":\"西平县\"},{\"code\":\"411722\",\"name\":\"上蔡县\"},{\"code\":\"411723\",\"name\":\"平舆县\"},{\"code\":\"411724\",\"name\":\"正阳县\"},{\"code\":\"411725\",\"name\":\"确山县\"},{\"code\":\"411726\",\"name\":\"泌阳县\"},{\"code\":\"411727\",\"name\":\"汝南县\"},{\"code\":\"411728\",\"name\":\"遂平县\"},{\"code\":\"411729\",\"name\":\"新蔡县\"}]},{\"code\":\"4190\",\"name\":\"省直辖县级行政区划\",\"childs\":[{\"code\":\"419001\",\"name\":\"济源市\"}]}]},{\"code\":\"42\",\"name\":\"湖北省\",\"childs\":[{\"code\":\"4201\",\"name\":\"武汉市\",\"childs\":[{\"code\":\"420102\",\"name\":\"江岸区\"},{\"code\":\"420103\",\"name\":\"江汉区\"},{\"code\":\"420104\",\"name\":\"硚口区\"},{\"code\":\"420105\",\"name\":\"汉阳区\"},{\"code\":\"420106\",\"name\":\"武昌区\"},{\"code\":\"420107\",\"name\":\"青山区\"},{\"code\":\"420111\",\"name\":\"洪山区\"},{\"code\":\"420112\",\"name\":\"东西湖区\"},{\"code\":\"420113\",\"name\":\"汉南区\"},{\"code\":\"420114\",\"name\":\"蔡甸区\"},{\"code\":\"420115\",\"name\":\"江夏区\"},{\"code\":\"420116\",\"name\":\"黄陂区\"},{\"code\":\"420117\",\"name\":\"新洲区\"}]},{\"code\":\"4202\",\"name\":\"黄石市\",\"childs\":[{\"code\":\"420202\",\"name\":\"黄石港区\"},{\"code\":\"420203\",\"name\":\"西塞山区\"},{\"code\":\"420204\",\"name\":\"下陆区\"},{\"code\":\"420205\",\"name\":\"铁山区\"},{\"code\":\"420222\",\"name\":\"阳新县\"},{\"code\":\"420281\",\"name\":\"大冶市\"}]},{\"code\":\"4203\",\"name\":\"十堰市\",\"childs\":[{\"code\":\"420302\",\"name\":\"茅箭区\"},{\"code\":\"420303\",\"name\":\"张湾区\"},{\"code\":\"420304\",\"name\":\"郧阳区\"},{\"code\":\"420322\",\"name\":\"郧西县\"},{\"code\":\"420323\",\"name\":\"竹山县\"},{\"code\":\"420324\",\"name\":\"竹溪县\"},{\"code\":\"420325\",\"name\":\"房县\"},{\"code\":\"420381\",\"name\":\"丹江口市\"}]},{\"code\":\"4205\",\"name\":\"宜昌市\",\"childs\":[{\"code\":\"420502\",\"name\":\"西陵区\"},{\"code\":\"420503\",\"name\":\"伍家岗区\"},{\"code\":\"420504\",\"name\":\"点军区\"},{\"code\":\"420505\",\"name\":\"猇亭区\"},{\"code\":\"420506\",\"name\":\"夷陵区\"},{\"code\":\"420525\",\"name\":\"远安县\"},{\"code\":\"420526\",\"name\":\"兴山县\"},{\"code\":\"420527\",\"name\":\"秭归县\"},{\"code\":\"420528\",\"name\":\"长阳土家族自治县\"},{\"code\":\"420529\",\"name\":\"五峰土家族自治县\"},{\"code\":\"420581\",\"name\":\"宜都市\"},{\"code\":\"420582\",\"name\":\"当阳市\"},{\"code\":\"420583\",\"name\":\"枝江市\"}]},{\"code\":\"4206\",\"name\":\"襄阳市\",\"childs\":[{\"code\":\"420602\",\"name\":\"襄城区\"},{\"code\":\"420606\",\"name\":\"樊城区\"},{\"code\":\"420607\",\"name\":\"襄州区\"},{\"code\":\"420624\",\"name\":\"南漳县\"},{\"code\":\"420625\",\"name\":\"谷城县\"},{\"code\":\"420626\",\"name\":\"保康县\"},{\"code\":\"420682\",\"name\":\"老河口市\"},{\"code\":\"420683\",\"name\":\"枣阳市\"},{\"code\":\"420684\",\"name\":\"宜城市\"}]},{\"code\":\"4207\",\"name\":\"鄂州市\",\"childs\":[{\"code\":\"420702\",\"name\":\"梁子湖区\"},{\"code\":\"420703\",\"name\":\"华容区\"},{\"code\":\"420704\",\"name\":\"鄂城区\"}]},{\"code\":\"4208\",\"name\":\"荆门市\",\"childs\":[{\"code\":\"420802\",\"name\":\"东宝区\"},{\"code\":\"420804\",\"name\":\"掇刀区\"},{\"code\":\"420821\",\"name\":\"京山县\"},{\"code\":\"420822\",\"name\":\"沙洋县\"},{\"code\":\"420881\",\"name\":\"钟祥市\"}]},{\"code\":\"4209\",\"name\":\"孝感市\",\"childs\":[{\"code\":\"420902\",\"name\":\"孝南区\"},{\"code\":\"420921\",\"name\":\"孝昌县\"},{\"code\":\"420922\",\"name\":\"大悟县\"},{\"code\":\"420923\",\"name\":\"云梦县\"},{\"code\":\"420981\",\"name\":\"应城市\"},{\"code\":\"420982\",\"name\":\"安陆市\"},{\"code\":\"420984\",\"name\":\"汉川市\"}]},{\"code\":\"4210\",\"name\":\"荆州市\",\"childs\":[{\"code\":\"421002\",\"name\":\"沙市区\"},{\"code\":\"421003\",\"name\":\"荆州区\"},{\"code\":\"421022\",\"name\":\"公安县\"},{\"code\":\"421023\",\"name\":\"监利县\"},{\"code\":\"421024\",\"name\":\"江陵县\"},{\"code\":\"421081\",\"name\":\"石首市\"},{\"code\":\"421083\",\"name\":\"洪湖市\"},{\"code\":\"421087\",\"name\":\"松滋市\"}]},{\"code\":\"4211\",\"name\":\"黄冈市\",\"childs\":[{\"code\":\"421102\",\"name\":\"黄州区\"},{\"code\":\"421121\",\"name\":\"团风县\"},{\"code\":\"421122\",\"name\":\"红安县\"},{\"code\":\"421123\",\"name\":\"罗田县\"},{\"code\":\"421124\",\"name\":\"英山县\"},{\"code\":\"421125\",\"name\":\"浠水县\"},{\"code\":\"421126\",\"name\":\"蕲春县\"},{\"code\":\"421127\",\"name\":\"黄梅县\"},{\"code\":\"421181\",\"name\":\"麻城市\"},{\"code\":\"421182\",\"name\":\"武穴市\"}]},{\"code\":\"4212\",\"name\":\"咸宁市\",\"childs\":[{\"code\":\"421202\",\"name\":\"咸安区\"},{\"code\":\"421221\",\"name\":\"嘉鱼县\"},{\"code\":\"421222\",\"name\":\"通城县\"},{\"code\":\"421223\",\"name\":\"崇阳县\"},{\"code\":\"421224\",\"name\":\"通山县\"},{\"code\":\"421281\",\"name\":\"赤壁市\"}]},{\"code\":\"4213\",\"name\":\"随州市\",\"childs\":[{\"code\":\"421303\",\"name\":\"曾都区\"},{\"code\":\"421321\",\"name\":\"随县\"},{\"code\":\"421381\",\"name\":\"广水市\"}]},{\"code\":\"4228\",\"name\":\"恩施土家族苗族自治州\",\"childs\":[{\"code\":\"422801\",\"name\":\"恩施市\"},{\"code\":\"422802\",\"name\":\"利川市\"},{\"code\":\"422822\",\"name\":\"建始县\"},{\"code\":\"422823\",\"name\":\"巴东县\"},{\"code\":\"422825\",\"name\":\"宣恩县\"},{\"code\":\"422826\",\"name\":\"咸丰县\"},{\"code\":\"422827\",\"name\":\"来凤县\"},{\"code\":\"422828\",\"name\":\"鹤峰县\"}]},{\"code\":\"4290\",\"name\":\"省直辖县级行政区划\",\"childs\":[{\"code\":\"429004\",\"name\":\"仙桃市\"},{\"code\":\"429005\",\"name\":\"潜江市\"},{\"code\":\"429006\",\"name\":\"天门市\"},{\"code\":\"429021\",\"name\":\"神农架林区\"}]}]},{\"code\":\"43\",\"name\":\"湖南省\",\"childs\":[{\"code\":\"4301\",\"name\":\"长沙市\",\"childs\":[{\"code\":\"430102\",\"name\":\"芙蓉区\"},{\"code\":\"430103\",\"name\":\"天心区\"},{\"code\":\"430104\",\"name\":\"岳麓区\"},{\"code\":\"430105\",\"name\":\"开福区\"},{\"code\":\"430111\",\"name\":\"雨花区\"},{\"code\":\"430112\",\"name\":\"望城区\"},{\"code\":\"430121\",\"name\":\"长沙县\"},{\"code\":\"430124\",\"name\":\"宁乡县\"},{\"code\":\"430181\",\"name\":\"浏阳市\"}]},{\"code\":\"4302\",\"name\":\"株洲市\",\"childs\":[{\"code\":\"430202\",\"name\":\"荷塘区\"},{\"code\":\"430203\",\"name\":\"芦淞区\"},{\"code\":\"430204\",\"name\":\"石峰区\"},{\"code\":\"430211\",\"name\":\"天元区\"},{\"code\":\"430221\",\"name\":\"株洲县\"},{\"code\":\"430223\",\"name\":\"攸县\"},{\"code\":\"430224\",\"name\":\"茶陵县\"},{\"code\":\"430225\",\"name\":\"炎陵县\"},{\"code\":\"430281\",\"name\":\"醴陵市\"}]},{\"code\":\"4303\",\"name\":\"湘潭市\",\"childs\":[{\"code\":\"430302\",\"name\":\"雨湖区\"},{\"code\":\"430304\",\"name\":\"岳塘区\"},{\"code\":\"430321\",\"name\":\"湘潭县\"},{\"code\":\"430381\",\"name\":\"湘乡市\"},{\"code\":\"430382\",\"name\":\"韶山市\"}]},{\"code\":\"4304\",\"name\":\"衡阳市\",\"childs\":[{\"code\":\"430405\",\"name\":\"珠晖区\"},{\"code\":\"430406\",\"name\":\"雁峰区\"},{\"code\":\"430407\",\"name\":\"石鼓区\"},{\"code\":\"430408\",\"name\":\"蒸湘区\"},{\"code\":\"430412\",\"name\":\"南岳区\"},{\"code\":\"430421\",\"name\":\"衡阳县\"},{\"code\":\"430422\",\"name\":\"衡南县\"},{\"code\":\"430423\",\"name\":\"衡山县\"},{\"code\":\"430424\",\"name\":\"衡东县\"},{\"code\":\"430426\",\"name\":\"祁东县\"},{\"code\":\"430481\",\"name\":\"耒阳市\"},{\"code\":\"430482\",\"name\":\"常宁市\"}]},{\"code\":\"4305\",\"name\":\"邵阳市\",\"childs\":[{\"code\":\"430502\",\"name\":\"双清区\"},{\"code\":\"430503\",\"name\":\"大祥区\"},{\"code\":\"430511\",\"name\":\"北塔区\"},{\"code\":\"430521\",\"name\":\"邵东县\"},{\"code\":\"430522\",\"name\":\"新邵县\"},{\"code\":\"430523\",\"name\":\"邵阳县\"},{\"code\":\"430524\",\"name\":\"隆回县\"},{\"code\":\"430525\",\"name\":\"洞口县\"},{\"code\":\"430527\",\"name\":\"绥宁县\"},{\"code\":\"430528\",\"name\":\"新宁县\"},{\"code\":\"430529\",\"name\":\"城步苗族自治县\"},{\"code\":\"430581\",\"name\":\"武冈市\"}]},{\"code\":\"4306\",\"name\":\"岳阳市\",\"childs\":[{\"code\":\"430602\",\"name\":\"岳阳楼区\"},{\"code\":\"430603\",\"name\":\"云溪区\"},{\"code\":\"430611\",\"name\":\"君山区\"},{\"code\":\"430621\",\"name\":\"岳阳县\"},{\"code\":\"430623\",\"name\":\"华容县\"},{\"code\":\"430624\",\"name\":\"湘阴县\"},{\"code\":\"430626\",\"name\":\"平江县\"},{\"code\":\"430681\",\"name\":\"汨罗市\"},{\"code\":\"430682\",\"name\":\"临湘市\"}]},{\"code\":\"4307\",\"name\":\"常德市\",\"childs\":[{\"code\":\"430702\",\"name\":\"武陵区\"},{\"code\":\"430703\",\"name\":\"鼎城区\"},{\"code\":\"430721\",\"name\":\"安乡县\"},{\"code\":\"430722\",\"name\":\"汉寿县\"},{\"code\":\"430723\",\"name\":\"澧县\"},{\"code\":\"430724\",\"name\":\"临澧县\"},{\"code\":\"430725\",\"name\":\"桃源县\"},{\"code\":\"430726\",\"name\":\"石门县\"},{\"code\":\"430781\",\"name\":\"津市市\"}]},{\"code\":\"4308\",\"name\":\"张家界市\",\"childs\":[{\"code\":\"430802\",\"name\":\"永定区\"},{\"code\":\"430811\",\"name\":\"武陵源区\"},{\"code\":\"430821\",\"name\":\"慈利县\"},{\"code\":\"430822\",\"name\":\"桑植县\"}]},{\"code\":\"4309\",\"name\":\"益阳市\",\"childs\":[{\"code\":\"430902\",\"name\":\"资阳区\"},{\"code\":\"430903\",\"name\":\"赫山区\"},{\"code\":\"430921\",\"name\":\"南县\"},{\"code\":\"430922\",\"name\":\"桃江县\"},{\"code\":\"430923\",\"name\":\"安化县\"},{\"code\":\"430981\",\"name\":\"沅江市\"}]},{\"code\":\"4310\",\"name\":\"郴州市\",\"childs\":[{\"code\":\"431002\",\"name\":\"北湖区\"},{\"code\":\"431003\",\"name\":\"苏仙区\"},{\"code\":\"431021\",\"name\":\"桂阳县\"},{\"code\":\"431022\",\"name\":\"宜章县\"},{\"code\":\"431023\",\"name\":\"永兴县\"},{\"code\":\"431024\",\"name\":\"嘉禾县\"},{\"code\":\"431025\",\"name\":\"临武县\"},{\"code\":\"431026\",\"name\":\"汝城县\"},{\"code\":\"431027\",\"name\":\"桂东县\"},{\"code\":\"431028\",\"name\":\"安仁县\"},{\"code\":\"431081\",\"name\":\"资兴市\"}]},{\"code\":\"4311\",\"name\":\"永州市\",\"childs\":[{\"code\":\"431102\",\"name\":\"零陵区\"},{\"code\":\"431103\",\"name\":\"冷水滩区\"},{\"code\":\"431121\",\"name\":\"祁阳县\"},{\"code\":\"431122\",\"name\":\"东安县\"},{\"code\":\"431123\",\"name\":\"双牌县\"},{\"code\":\"431124\",\"name\":\"道县\"},{\"code\":\"431125\",\"name\":\"江永县\"},{\"code\":\"431126\",\"name\":\"宁远县\"},{\"code\":\"431127\",\"name\":\"蓝山县\"},{\"code\":\"431128\",\"name\":\"新田县\"},{\"code\":\"431129\",\"name\":\"江华瑶族自治县\"}]},{\"code\":\"4312\",\"name\":\"怀化市\",\"childs\":[{\"code\":\"431202\",\"name\":\"鹤城区\"},{\"code\":\"431221\",\"name\":\"中方县\"},{\"code\":\"431222\",\"name\":\"沅陵县\"},{\"code\":\"431223\",\"name\":\"辰溪县\"},{\"code\":\"431224\",\"name\":\"溆浦县\"},{\"code\":\"431225\",\"name\":\"会同县\"},{\"code\":\"431226\",\"name\":\"麻阳苗族自治县\"},{\"code\":\"431227\",\"name\":\"新晃侗族自治县\"},{\"code\":\"431228\",\"name\":\"芷江侗族自治县\"},{\"code\":\"431229\",\"name\":\"靖州苗族侗族自治县\"},{\"code\":\"431230\",\"name\":\"通道侗族自治县\"},{\"code\":\"431281\",\"name\":\"洪江市\"}]},{\"code\":\"4313\",\"name\":\"娄底市\",\"childs\":[{\"code\":\"431302\",\"name\":\"娄星区\"},{\"code\":\"431321\",\"name\":\"双峰县\"},{\"code\":\"431322\",\"name\":\"新化县\"},{\"code\":\"431381\",\"name\":\"冷水江市\"},{\"code\":\"431382\",\"name\":\"涟源市\"}]},{\"code\":\"4331\",\"name\":\"湘西土家族苗族自治州\",\"childs\":[{\"code\":\"433101\",\"name\":\"吉首市\"},{\"code\":\"433122\",\"name\":\"泸溪县\"},{\"code\":\"433123\",\"name\":\"凤凰县\"},{\"code\":\"433124\",\"name\":\"花垣县\"},{\"code\":\"433125\",\"name\":\"保靖县\"},{\"code\":\"433126\",\"name\":\"古丈县\"},{\"code\":\"433127\",\"name\":\"永顺县\"},{\"code\":\"433130\",\"name\":\"龙山县\"}]}]},{\"code\":\"44\",\"name\":\"广东省\",\"childs\":[{\"code\":\"4401\",\"name\":\"广州市\",\"childs\":[{\"code\":\"440103\",\"name\":\"荔湾区\"},{\"code\":\"440104\",\"name\":\"越秀区\"},{\"code\":\"440105\",\"name\":\"海珠区\"},{\"code\":\"440106\",\"name\":\"天河区\"},{\"code\":\"440111\",\"name\":\"白云区\"},{\"code\":\"440112\",\"name\":\"黄埔区\"},{\"code\":\"440113\",\"name\":\"番禺区\"},{\"code\":\"440114\",\"name\":\"花都区\"},{\"code\":\"440115\",\"name\":\"南沙区\"},{\"code\":\"440117\",\"name\":\"从化区\"},{\"code\":\"440118\",\"name\":\"增城区\"}]},{\"code\":\"4402\",\"name\":\"韶关市\",\"childs\":[{\"code\":\"440203\",\"name\":\"武江区\"},{\"code\":\"440204\",\"name\":\"浈江区\"},{\"code\":\"440205\",\"name\":\"曲江区\"},{\"code\":\"440222\",\"name\":\"始兴县\"},{\"code\":\"440224\",\"name\":\"仁化县\"},{\"code\":\"440229\",\"name\":\"翁源县\"},{\"code\":\"440232\",\"name\":\"乳源瑶族自治县\"},{\"code\":\"440233\",\"name\":\"新丰县\"},{\"code\":\"440281\",\"name\":\"乐昌市\"},{\"code\":\"440282\",\"name\":\"南雄市\"}]},{\"code\":\"4403\",\"name\":\"深圳市\",\"childs\":[{\"code\":\"440303\",\"name\":\"罗湖区\"},{\"code\":\"440304\",\"name\":\"福田区\"},{\"code\":\"440305\",\"name\":\"南山区\"},{\"code\":\"440306\",\"name\":\"宝安区\"},{\"code\":\"440307\",\"name\":\"龙岗区\"},{\"code\":\"440308\",\"name\":\"盐田区\"}]},{\"code\":\"4404\",\"name\":\"珠海市\",\"childs\":[{\"code\":\"440402\",\"name\":\"香洲区\"},{\"code\":\"440403\",\"name\":\"斗门区\"},{\"code\":\"440404\",\"name\":\"金湾区\"}]},{\"code\":\"4405\",\"name\":\"汕头市\",\"childs\":[{\"code\":\"440507\",\"name\":\"龙湖区\"},{\"code\":\"440511\",\"name\":\"金平区\"},{\"code\":\"440512\",\"name\":\"濠江区\"},{\"code\":\"440513\",\"name\":\"潮阳区\"},{\"code\":\"440514\",\"name\":\"潮南区\"},{\"code\":\"440515\",\"name\":\"澄海区\"},{\"code\":\"440523\",\"name\":\"南澳县\"}]},{\"code\":\"4406\",\"name\":\"佛山市\",\"childs\":[{\"code\":\"440604\",\"name\":\"禅城区\"},{\"code\":\"440605\",\"name\":\"南海区\"},{\"code\":\"440606\",\"name\":\"顺德区\"},{\"code\":\"440607\",\"name\":\"三水区\"},{\"code\":\"440608\",\"name\":\"高明区\"}]},{\"code\":\"4407\",\"name\":\"江门市\",\"childs\":[{\"code\":\"440703\",\"name\":\"蓬江区\"},{\"code\":\"440704\",\"name\":\"江海区\"},{\"code\":\"440705\",\"name\":\"新会区\"},{\"code\":\"440781\",\"name\":\"台山市\"},{\"code\":\"440783\",\"name\":\"开平市\"},{\"code\":\"440784\",\"name\":\"鹤山市\"},{\"code\":\"440785\",\"name\":\"恩平市\"}]},{\"code\":\"4408\",\"name\":\"湛江市\",\"childs\":[{\"code\":\"440802\",\"name\":\"赤坎区\"},{\"code\":\"440803\",\"name\":\"霞山区\"},{\"code\":\"440804\",\"name\":\"坡头区\"},{\"code\":\"440811\",\"name\":\"麻章区\"},{\"code\":\"440823\",\"name\":\"遂溪县\"},{\"code\":\"440825\",\"name\":\"徐闻县\"},{\"code\":\"440881\",\"name\":\"廉江市\"},{\"code\":\"440882\",\"name\":\"雷州市\"},{\"code\":\"440883\",\"name\":\"吴川市\"}]},{\"code\":\"4409\",\"name\":\"茂名市\",\"childs\":[{\"code\":\"440902\",\"name\":\"茂南区\"},{\"code\":\"440904\",\"name\":\"电白区\"},{\"code\":\"440981\",\"name\":\"高州市\"},{\"code\":\"440982\",\"name\":\"化州市\"},{\"code\":\"440983\",\"name\":\"信宜市\"}]},{\"code\":\"4412\",\"name\":\"肇庆市\",\"childs\":[{\"code\":\"441202\",\"name\":\"端州区\"},{\"code\":\"441203\",\"name\":\"鼎湖区\"},{\"code\":\"441204\",\"name\":\"高要区\"},{\"code\":\"441223\",\"name\":\"广宁县\"},{\"code\":\"441224\",\"name\":\"怀集县\"},{\"code\":\"441225\",\"name\":\"封开县\"},{\"code\":\"441226\",\"name\":\"德庆县\"},{\"code\":\"441284\",\"name\":\"四会市\"}]},{\"code\":\"4413\",\"name\":\"惠州市\",\"childs\":[{\"code\":\"441302\",\"name\":\"惠城区\"},{\"code\":\"441303\",\"name\":\"惠阳区\"},{\"code\":\"441322\",\"name\":\"博罗县\"},{\"code\":\"441323\",\"name\":\"惠东县\"},{\"code\":\"441324\",\"name\":\"龙门县\"}]},{\"code\":\"4414\",\"name\":\"梅州市\",\"childs\":[{\"code\":\"441402\",\"name\":\"梅江区\"},{\"code\":\"441403\",\"name\":\"梅县区\"},{\"code\":\"441422\",\"name\":\"大埔县\"},{\"code\":\"441423\",\"name\":\"丰顺县\"},{\"code\":\"441424\",\"name\":\"五华县\"},{\"code\":\"441426\",\"name\":\"平远县\"},{\"code\":\"441427\",\"name\":\"蕉岭县\"},{\"code\":\"441481\",\"name\":\"兴宁市\"}]},{\"code\":\"4415\",\"name\":\"汕尾市\",\"childs\":[{\"code\":\"441502\",\"name\":\"城区\"},{\"code\":\"441521\",\"name\":\"海丰县\"},{\"code\":\"441523\",\"name\":\"陆河县\"},{\"code\":\"441581\",\"name\":\"陆丰市\"}]},{\"code\":\"4416\",\"name\":\"河源市\",\"childs\":[{\"code\":\"441602\",\"name\":\"源城区\"},{\"code\":\"441621\",\"name\":\"紫金县\"},{\"code\":\"441622\",\"name\":\"龙川县\"},{\"code\":\"441623\",\"name\":\"连平县\"},{\"code\":\"441624\",\"name\":\"和平县\"},{\"code\":\"441625\",\"name\":\"东源县\"}]},{\"code\":\"4417\",\"name\":\"阳江市\",\"childs\":[{\"code\":\"441702\",\"name\":\"江城区\"},{\"code\":\"441704\",\"name\":\"阳东区\"},{\"code\":\"441721\",\"name\":\"阳西县\"},{\"code\":\"441781\",\"name\":\"阳春市\"}]},{\"code\":\"4418\",\"name\":\"清远市\",\"childs\":[{\"code\":\"441802\",\"name\":\"清城区\"},{\"code\":\"441803\",\"name\":\"清新区\"},{\"code\":\"441821\",\"name\":\"佛冈县\"},{\"code\":\"441823\",\"name\":\"阳山县\"},{\"code\":\"441825\",\"name\":\"连山壮族瑶族自治县\"},{\"code\":\"441826\",\"name\":\"连南瑶族自治县\"},{\"code\":\"441881\",\"name\":\"英德市\"},{\"code\":\"441882\",\"name\":\"连州市\"}]},{\"code\":\"441900\",\"name\":\"东莞市\",\"childs\":[{\"code\":\"441900003\",\"name\":\"东城街道办事处\"},{\"code\":\"441900004\",\"name\":\"南城街道办事处\"},{\"code\":\"441900005\",\"name\":\"万江街道办事处\"},{\"code\":\"441900006\",\"name\":\"莞城街道办事处\"},{\"code\":\"441900101\",\"name\":\"石碣镇\"},{\"code\":\"441900102\",\"name\":\"石龙镇\"},{\"code\":\"441900103\",\"name\":\"茶山镇\"},{\"code\":\"441900104\",\"name\":\"石排镇\"},{\"code\":\"441900105\",\"name\":\"企石镇\"},{\"code\":\"441900106\",\"name\":\"横沥镇\"},{\"code\":\"441900107\",\"name\":\"桥头镇\"},{\"code\":\"441900108\",\"name\":\"谢岗镇\"},{\"code\":\"441900109\",\"name\":\"东坑镇\"},{\"code\":\"441900110\",\"name\":\"常平镇\"},{\"code\":\"441900111\",\"name\":\"寮步镇\"},{\"code\":\"441900112\",\"name\":\"樟木头镇\"},{\"code\":\"441900113\",\"name\":\"大朗镇\"},{\"code\":\"441900114\",\"name\":\"黄江镇\"},{\"code\":\"441900115\",\"name\":\"清溪镇\"},{\"code\":\"441900116\",\"name\":\"塘厦镇\"},{\"code\":\"441900117\",\"name\":\"凤岗镇\"},{\"code\":\"441900118\",\"name\":\"大岭山镇\"},{\"code\":\"441900119\",\"name\":\"长安镇\"},{\"code\":\"441900121\",\"name\":\"虎门镇\"},{\"code\":\"441900122\",\"name\":\"厚街镇\"},{\"code\":\"441900123\",\"name\":\"沙田镇\"},{\"code\":\"441900124\",\"name\":\"道滘镇\"},{\"code\":\"441900125\",\"name\":\"洪梅镇\"},{\"code\":\"441900126\",\"name\":\"麻涌镇\"},{\"code\":\"441900127\",\"name\":\"望牛墩镇\"},{\"code\":\"441900128\",\"name\":\"中堂镇\"},{\"code\":\"441900129\",\"name\":\"高埗镇\"},{\"code\":\"441900401\",\"name\":\"松山湖管委会\"},{\"code\":\"441900402\",\"name\":\"虎门港管委会\"},{\"code\":\"441900403\",\"name\":\"东莞生态园\"}]},{\"code\":\"442000\",\"name\":\"中山市\",\"childs\":[{\"code\":\"442000001\",\"name\":\"石岐区街道办事处\"},{\"code\":\"442000002\",\"name\":\"东区街道办事处\"},{\"code\":\"442000003\",\"name\":\"火炬开发区街道办事处\"},{\"code\":\"442000004\",\"name\":\"西区街道办事处\"},{\"code\":\"442000005\",\"name\":\"南区街道办事处\"},{\"code\":\"442000006\",\"name\":\"五桂山街道办事处\"},{\"code\":\"442000100\",\"name\":\"小榄镇\"},{\"code\":\"442000101\",\"name\":\"黄圃镇\"},{\"code\":\"442000102\",\"name\":\"民众镇\"},{\"code\":\"442000103\",\"name\":\"东凤镇\"},{\"code\":\"442000104\",\"name\":\"东升镇\"},{\"code\":\"442000105\",\"name\":\"古镇镇\"},{\"code\":\"442000106\",\"name\":\"沙溪镇\"},{\"code\":\"442000107\",\"name\":\"坦洲镇\"},{\"code\":\"442000108\",\"name\":\"港口镇\"},{\"code\":\"442000109\",\"name\":\"三角镇\"},{\"code\":\"442000110\",\"name\":\"横栏镇\"},{\"code\":\"442000111\",\"name\":\"南头镇\"},{\"code\":\"442000112\",\"name\":\"阜沙镇\"},{\"code\":\"442000113\",\"name\":\"南朗镇\"},{\"code\":\"442000114\",\"name\":\"三乡镇\"},{\"code\":\"442000115\",\"name\":\"板芙镇\"},{\"code\":\"442000116\",\"name\":\"大涌镇\"},{\"code\":\"442000117\",\"name\":\"神湾镇\"}]},{\"code\":\"4451\",\"name\":\"潮州市\",\"childs\":[{\"code\":\"445102\",\"name\":\"湘桥区\"},{\"code\":\"445103\",\"name\":\"潮安区\"},{\"code\":\"445122\",\"name\":\"饶平县\"}]},{\"code\":\"4452\",\"name\":\"揭阳市\",\"childs\":[{\"code\":\"445202\",\"name\":\"榕城区\"},{\"code\":\"445203\",\"name\":\"揭东区\"},{\"code\":\"445222\",\"name\":\"揭西县\"},{\"code\":\"445224\",\"name\":\"惠来县\"},{\"code\":\"445281\",\"name\":\"普宁市\"}]},{\"code\":\"4453\",\"name\":\"云浮市\",\"childs\":[{\"code\":\"445302\",\"name\":\"云城区\"},{\"code\":\"445303\",\"name\":\"云安区\"},{\"code\":\"445321\",\"name\":\"新兴县\"},{\"code\":\"445322\",\"name\":\"郁南县\"},{\"code\":\"445381\",\"name\":\"罗定市\"}]}]},{\"code\":\"45\",\"name\":\"广西壮族自治区\",\"childs\":[{\"code\":\"4501\",\"name\":\"南宁市\",\"childs\":[{\"code\":\"450102\",\"name\":\"兴宁区\"},{\"code\":\"450103\",\"name\":\"青秀区\"},{\"code\":\"450105\",\"name\":\"江南区\"},{\"code\":\"450107\",\"name\":\"西乡塘区\"},{\"code\":\"450108\",\"name\":\"良庆区\"},{\"code\":\"450109\",\"name\":\"邕宁区\"},{\"code\":\"450110\",\"name\":\"武鸣区\"},{\"code\":\"450123\",\"name\":\"隆安县\"},{\"code\":\"450124\",\"name\":\"马山县\"},{\"code\":\"450125\",\"name\":\"上林县\"},{\"code\":\"450126\",\"name\":\"宾阳县\"},{\"code\":\"450127\",\"name\":\"横县\"}]},{\"code\":\"4502\",\"name\":\"柳州市\",\"childs\":[{\"code\":\"450202\",\"name\":\"城中区\"},{\"code\":\"450203\",\"name\":\"鱼峰区\"},{\"code\":\"450204\",\"name\":\"柳南区\"},{\"code\":\"450205\",\"name\":\"柳北区\"},{\"code\":\"450206\",\"name\":\"柳江区\"},{\"code\":\"450222\",\"name\":\"柳城县\"},{\"code\":\"450223\",\"name\":\"鹿寨县\"},{\"code\":\"450224\",\"name\":\"融安县\"},{\"code\":\"450225\",\"name\":\"融水苗族自治县\"},{\"code\":\"450226\",\"name\":\"三江侗族自治县\"}]},{\"code\":\"4503\",\"name\":\"桂林市\",\"childs\":[{\"code\":\"450302\",\"name\":\"秀峰区\"},{\"code\":\"450303\",\"name\":\"叠彩区\"},{\"code\":\"450304\",\"name\":\"象山区\"},{\"code\":\"450305\",\"name\":\"七星区\"},{\"code\":\"450311\",\"name\":\"雁山区\"},{\"code\":\"450312\",\"name\":\"临桂区\"},{\"code\":\"450321\",\"name\":\"阳朔县\"},{\"code\":\"450323\",\"name\":\"灵川县\"},{\"code\":\"450324\",\"name\":\"全州县\"},{\"code\":\"450325\",\"name\":\"兴安县\"},{\"code\":\"450326\",\"name\":\"永福县\"},{\"code\":\"450327\",\"name\":\"灌阳县\"},{\"code\":\"450328\",\"name\":\"龙胜各族自治县\"},{\"code\":\"450329\",\"name\":\"资源县\"},{\"code\":\"450330\",\"name\":\"平乐县\"},{\"code\":\"450331\",\"name\":\"荔浦县\"},{\"code\":\"450332\",\"name\":\"恭城瑶族自治县\"}]},{\"code\":\"4504\",\"name\":\"梧州市\",\"childs\":[{\"code\":\"450403\",\"name\":\"万秀区\"},{\"code\":\"450405\",\"name\":\"长洲区\"},{\"code\":\"450406\",\"name\":\"龙圩区\"},{\"code\":\"450421\",\"name\":\"苍梧县\"},{\"code\":\"450422\",\"name\":\"藤县\"},{\"code\":\"450423\",\"name\":\"蒙山县\"},{\"code\":\"450481\",\"name\":\"岑溪市\"}]},{\"code\":\"4505\",\"name\":\"北海市\",\"childs\":[{\"code\":\"450502\",\"name\":\"海城区\"},{\"code\":\"450503\",\"name\":\"银海区\"},{\"code\":\"450512\",\"name\":\"铁山港区\"},{\"code\":\"450521\",\"name\":\"合浦县\"}]},{\"code\":\"4506\",\"name\":\"防城港市\",\"childs\":[{\"code\":\"450602\",\"name\":\"港口区\"},{\"code\":\"450603\",\"name\":\"防城区\"},{\"code\":\"450621\",\"name\":\"上思县\"},{\"code\":\"450681\",\"name\":\"东兴市\"}]},{\"code\":\"4507\",\"name\":\"钦州市\",\"childs\":[{\"code\":\"450702\",\"name\":\"钦南区\"},{\"code\":\"450703\",\"name\":\"钦北区\"},{\"code\":\"450721\",\"name\":\"灵山县\"},{\"code\":\"450722\",\"name\":\"浦北县\"}]},{\"code\":\"4508\",\"name\":\"贵港市\",\"childs\":[{\"code\":\"450802\",\"name\":\"港北区\"},{\"code\":\"450803\",\"name\":\"港南区\"},{\"code\":\"450804\",\"name\":\"覃塘区\"},{\"code\":\"450821\",\"name\":\"平南县\"},{\"code\":\"450881\",\"name\":\"桂平市\"}]},{\"code\":\"4509\",\"name\":\"玉林市\",\"childs\":[{\"code\":\"450902\",\"name\":\"玉州区\"},{\"code\":\"450903\",\"name\":\"福绵区\"},{\"code\":\"450921\",\"name\":\"容县\"},{\"code\":\"450922\",\"name\":\"陆川县\"},{\"code\":\"450923\",\"name\":\"博白县\"},{\"code\":\"450924\",\"name\":\"兴业县\"},{\"code\":\"450981\",\"name\":\"北流市\"}]},{\"code\":\"4510\",\"name\":\"百色市\",\"childs\":[{\"code\":\"451002\",\"name\":\"右江区\"},{\"code\":\"451021\",\"name\":\"田阳县\"},{\"code\":\"451022\",\"name\":\"田东县\"},{\"code\":\"451023\",\"name\":\"平果县\"},{\"code\":\"451024\",\"name\":\"德保县\"},{\"code\":\"451026\",\"name\":\"那坡县\"},{\"code\":\"451027\",\"name\":\"凌云县\"},{\"code\":\"451028\",\"name\":\"乐业县\"},{\"code\":\"451029\",\"name\":\"田林县\"},{\"code\":\"451030\",\"name\":\"西林县\"},{\"code\":\"451031\",\"name\":\"隆林各族自治县\"},{\"code\":\"451081\",\"name\":\"靖西市\"}]},{\"code\":\"4511\",\"name\":\"贺州市\",\"childs\":[{\"code\":\"451102\",\"name\":\"八步区\"},{\"code\":\"451103\",\"name\":\"平桂区\"},{\"code\":\"451121\",\"name\":\"昭平县\"},{\"code\":\"451122\",\"name\":\"钟山县\"},{\"code\":\"451123\",\"name\":\"富川瑶族自治县\"}]},{\"code\":\"4512\",\"name\":\"河池市\",\"childs\":[{\"code\":\"451202\",\"name\":\"金城江区\"},{\"code\":\"451221\",\"name\":\"南丹县\"},{\"code\":\"451222\",\"name\":\"天峨县\"},{\"code\":\"451223\",\"name\":\"凤山县\"},{\"code\":\"451224\",\"name\":\"东兰县\"},{\"code\":\"451225\",\"name\":\"罗城仫佬族自治县\"},{\"code\":\"451226\",\"name\":\"环江毛南族自治县\"},{\"code\":\"451227\",\"name\":\"巴马瑶族自治县\"},{\"code\":\"451228\",\"name\":\"都安瑶族自治县\"},{\"code\":\"451229\",\"name\":\"大化瑶族自治县\"},{\"code\":\"451281\",\"name\":\"宜州市\"}]},{\"code\":\"4513\",\"name\":\"来宾市\",\"childs\":[{\"code\":\"451302\",\"name\":\"兴宾区\"},{\"code\":\"451321\",\"name\":\"忻城县\"},{\"code\":\"451322\",\"name\":\"象州县\"},{\"code\":\"451323\",\"name\":\"武宣县\"},{\"code\":\"451324\",\"name\":\"金秀瑶族自治县\"},{\"code\":\"451381\",\"name\":\"合山市\"}]},{\"code\":\"4514\",\"name\":\"崇左市\",\"childs\":[{\"code\":\"451402\",\"name\":\"江州区\"},{\"code\":\"451421\",\"name\":\"扶绥县\"},{\"code\":\"451422\",\"name\":\"宁明县\"},{\"code\":\"451423\",\"name\":\"龙州县\"},{\"code\":\"451424\",\"name\":\"大新县\"},{\"code\":\"451425\",\"name\":\"天等县\"},{\"code\":\"451481\",\"name\":\"凭祥市\"}]}]},{\"code\":\"46\",\"name\":\"海南省\",\"childs\":[{\"code\":\"4601\",\"name\":\"海口市\",\"childs\":[{\"code\":\"460105\",\"name\":\"秀英区\"},{\"code\":\"460106\",\"name\":\"龙华区\"},{\"code\":\"460107\",\"name\":\"琼山区\"},{\"code\":\"460108\",\"name\":\"美兰区\"}]},{\"code\":\"4602\",\"name\":\"三亚市\",\"childs\":[{\"code\":\"460202\",\"name\":\"海棠区\"},{\"code\":\"460203\",\"name\":\"吉阳区\"},{\"code\":\"460204\",\"name\":\"天涯区\"},{\"code\":\"460205\",\"name\":\"崖州区\"}]},{\"code\":\"4603\",\"name\":\"三沙市\",\"childs\":[{\"code\":\"460321\",\"name\":\"西沙群岛\"},{\"code\":\"460322\",\"name\":\"南沙群岛\"},{\"code\":\"460323\",\"name\":\"中沙群岛的岛礁及其海域\"}]},{\"code\":\"460400\",\"name\":\"儋州市\",\"childs\":[{\"code\":\"460400100\",\"name\":\"那大镇\"},{\"code\":\"460400101\",\"name\":\"和庆镇\"},{\"code\":\"460400102\",\"name\":\"南丰镇\"},{\"code\":\"460400103\",\"name\":\"大成镇\"},{\"code\":\"460400104\",\"name\":\"雅星镇\"},{\"code\":\"460400105\",\"name\":\"兰洋镇\"},{\"code\":\"460400106\",\"name\":\"光村镇\"},{\"code\":\"460400107\",\"name\":\"木棠镇\"},{\"code\":\"460400108\",\"name\":\"海头镇\"},{\"code\":\"460400109\",\"name\":\"峨蔓镇\"},{\"code\":\"460400110\",\"name\":\"三都镇\"},{\"code\":\"460400111\",\"name\":\"王五镇\"},{\"code\":\"460400112\",\"name\":\"白马井镇\"},{\"code\":\"460400113\",\"name\":\"中和镇\"},{\"code\":\"460400114\",\"name\":\"排浦镇\"},{\"code\":\"460400115\",\"name\":\"东成镇\"},{\"code\":\"460400116\",\"name\":\"新州镇\"},{\"code\":\"460400400\",\"name\":\"国营西培农场\"},{\"code\":\"460400404\",\"name\":\"国营西联农场\"},{\"code\":\"460400405\",\"name\":\"国营蓝洋农场\"},{\"code\":\"460400407\",\"name\":\"国营八一农场\"},{\"code\":\"460400499\",\"name\":\"洋浦经济开发区\"},{\"code\":\"460400500\",\"name\":\"华南热作学院\"}]},{\"code\":\"4690\",\"name\":\"省直辖县级行政区划\",\"childs\":[{\"code\":\"469001\",\"name\":\"五指山市\"},{\"code\":\"469002\",\"name\":\"琼海市\"},{\"code\":\"469005\",\"name\":\"文昌市\"},{\"code\":\"469006\",\"name\":\"万宁市\"},{\"code\":\"469007\",\"name\":\"东方市\"},{\"code\":\"469021\",\"name\":\"定安县\"},{\"code\":\"469022\",\"name\":\"屯昌县\"},{\"code\":\"469023\",\"name\":\"澄迈县\"},{\"code\":\"469024\",\"name\":\"临高县\"},{\"code\":\"469025\",\"name\":\"白沙黎族自治县\"},{\"code\":\"469026\",\"name\":\"昌江黎族自治县\"},{\"code\":\"469027\",\"name\":\"乐东黎族自治县\"},{\"code\":\"469028\",\"name\":\"陵水黎族自治县\"},{\"code\":\"469029\",\"name\":\"保亭黎族苗族自治县\"},{\"code\":\"469030\",\"name\":\"琼中黎族苗族自治县\"}]}]},{\"code\":\"50\",\"name\":\"重庆市\",\"childs\":[{\"code\":\"5001\",\"name\":\"市辖区\",\"childs\":[{\"code\":\"500101\",\"name\":\"万州区\"},{\"code\":\"500102\",\"name\":\"涪陵区\"},{\"code\":\"500103\",\"name\":\"渝中区\"},{\"code\":\"500104\",\"name\":\"大渡口区\"},{\"code\":\"500105\",\"name\":\"江北区\"},{\"code\":\"500106\",\"name\":\"沙坪坝区\"},{\"code\":\"500107\",\"name\":\"九龙坡区\"},{\"code\":\"500108\",\"name\":\"南岸区\"},{\"code\":\"500109\",\"name\":\"北碚区\"},{\"code\":\"500110\",\"name\":\"綦江区\"},{\"code\":\"500111\",\"name\":\"大足区\"},{\"code\":\"500112\",\"name\":\"渝北区\"},{\"code\":\"500113\",\"name\":\"巴南区\"},{\"code\":\"500114\",\"name\":\"黔江区\"},{\"code\":\"500115\",\"name\":\"长寿区\"},{\"code\":\"500116\",\"name\":\"江津区\"},{\"code\":\"500117\",\"name\":\"合川区\"},{\"code\":\"500118\",\"name\":\"永川区\"},{\"code\":\"500119\",\"name\":\"南川区\"},{\"code\":\"500120\",\"name\":\"璧山区\"},{\"code\":\"500151\",\"name\":\"铜梁区\"},{\"code\":\"500152\",\"name\":\"潼南区\"},{\"code\":\"500153\",\"name\":\"荣昌区\"},{\"code\":\"500154\",\"name\":\"开州区\"}]},{\"code\":\"5002\",\"name\":\"县\",\"childs\":[{\"code\":\"500228\",\"name\":\"梁平县\"},{\"code\":\"500229\",\"name\":\"城口县\"},{\"code\":\"500230\",\"name\":\"丰都县\"},{\"code\":\"500231\",\"name\":\"垫江县\"},{\"code\":\"500232\",\"name\":\"武隆县\"},{\"code\":\"500233\",\"name\":\"忠县\"},{\"code\":\"500235\",\"name\":\"云阳县\"},{\"code\":\"500236\",\"name\":\"奉节县\"},{\"code\":\"500237\",\"name\":\"巫山县\"},{\"code\":\"500238\",\"name\":\"巫溪县\"},{\"code\":\"500240\",\"name\":\"石柱土家族自治县\"},{\"code\":\"500241\",\"name\":\"秀山土家族苗族自治县\"},{\"code\":\"500242\",\"name\":\"酉阳土家族苗族自治县\"},{\"code\":\"500243\",\"name\":\"彭水苗族土家族自治县\"}]}]},{\"code\":\"51\",\"name\":\"四川省\",\"childs\":[{\"code\":\"5101\",\"name\":\"成都市\",\"childs\":[{\"code\":\"510104\",\"name\":\"锦江区\"},{\"code\":\"510105\",\"name\":\"青羊区\"},{\"code\":\"510106\",\"name\":\"金牛区\"},{\"code\":\"510107\",\"name\":\"武侯区\"},{\"code\":\"510108\",\"name\":\"成华区\"},{\"code\":\"510112\",\"name\":\"龙泉驿区\"},{\"code\":\"510113\",\"name\":\"青白江区\"},{\"code\":\"510114\",\"name\":\"新都区\"},{\"code\":\"510115\",\"name\":\"温江区\"},{\"code\":\"510116\",\"name\":\"双流区\"},{\"code\":\"510121\",\"name\":\"金堂县\"},{\"code\":\"510124\",\"name\":\"郫县\"},{\"code\":\"510129\",\"name\":\"大邑县\"},{\"code\":\"510131\",\"name\":\"蒲江县\"},{\"code\":\"510132\",\"name\":\"新津县\"},{\"code\":\"510181\",\"name\":\"都江堰市\"},{\"code\":\"510182\",\"name\":\"彭州市\"},{\"code\":\"510183\",\"name\":\"邛崃市\"},{\"code\":\"510184\",\"name\":\"崇州市\"},{\"code\":\"510185\",\"name\":\"简阳市\"}]},{\"code\":\"5103\",\"name\":\"自贡市\",\"childs\":[{\"code\":\"510302\",\"name\":\"自流井区\"},{\"code\":\"510303\",\"name\":\"贡井区\"},{\"code\":\"510304\",\"name\":\"大安区\"},{\"code\":\"510311\",\"name\":\"沿滩区\"},{\"code\":\"510321\",\"name\":\"荣县\"},{\"code\":\"510322\",\"name\":\"富顺县\"}]},{\"code\":\"5104\",\"name\":\"攀枝花市\",\"childs\":[{\"code\":\"510402\",\"name\":\"东区\"},{\"code\":\"510403\",\"name\":\"西区\"},{\"code\":\"510411\",\"name\":\"仁和区\"},{\"code\":\"510421\",\"name\":\"米易县\"},{\"code\":\"510422\",\"name\":\"盐边县\"}]},{\"code\":\"5105\",\"name\":\"泸州市\",\"childs\":[{\"code\":\"510502\",\"name\":\"江阳区\"},{\"code\":\"510503\",\"name\":\"纳溪区\"},{\"code\":\"510504\",\"name\":\"龙马潭区\"},{\"code\":\"510521\",\"name\":\"泸县\"},{\"code\":\"510522\",\"name\":\"合江县\"},{\"code\":\"510524\",\"name\":\"叙永县\"},{\"code\":\"510525\",\"name\":\"古蔺县\"}]},{\"code\":\"5106\",\"name\":\"德阳市\",\"childs\":[{\"code\":\"510603\",\"name\":\"旌阳区\"},{\"code\":\"510623\",\"name\":\"中江县\"},{\"code\":\"510626\",\"name\":\"罗江县\"},{\"code\":\"510681\",\"name\":\"广汉市\"},{\"code\":\"510682\",\"name\":\"什邡市\"},{\"code\":\"510683\",\"name\":\"绵竹市\"}]},{\"code\":\"5107\",\"name\":\"绵阳市\",\"childs\":[{\"code\":\"510703\",\"name\":\"涪城区\"},{\"code\":\"510704\",\"name\":\"游仙区\"},{\"code\":\"510705\",\"name\":\"安州区\"},{\"code\":\"510722\",\"name\":\"三台县\"},{\"code\":\"510723\",\"name\":\"盐亭县\"},{\"code\":\"510725\",\"name\":\"梓潼县\"},{\"code\":\"510726\",\"name\":\"北川羌族自治县\"},{\"code\":\"510727\",\"name\":\"平武县\"},{\"code\":\"510781\",\"name\":\"江油市\"}]},{\"code\":\"5108\",\"name\":\"广元市\",\"childs\":[{\"code\":\"510802\",\"name\":\"利州区\"},{\"code\":\"510811\",\"name\":\"昭化区\"},{\"code\":\"510812\",\"name\":\"朝天区\"},{\"code\":\"510821\",\"name\":\"旺苍县\"},{\"code\":\"510822\",\"name\":\"青川县\"},{\"code\":\"510823\",\"name\":\"剑阁县\"},{\"code\":\"510824\",\"name\":\"苍溪县\"}]},{\"code\":\"5109\",\"name\":\"遂宁市\",\"childs\":[{\"code\":\"510903\",\"name\":\"船山区\"},{\"code\":\"510904\",\"name\":\"安居区\"},{\"code\":\"510921\",\"name\":\"蓬溪县\"},{\"code\":\"510922\",\"name\":\"射洪县\"},{\"code\":\"510923\",\"name\":\"大英县\"}]},{\"code\":\"5110\",\"name\":\"内江市\",\"childs\":[{\"code\":\"511002\",\"name\":\"市中区\"},{\"code\":\"511011\",\"name\":\"东兴区\"},{\"code\":\"511024\",\"name\":\"威远县\"},{\"code\":\"511025\",\"name\":\"资中县\"},{\"code\":\"511028\",\"name\":\"隆昌县\"}]},{\"code\":\"5111\",\"name\":\"乐山市\",\"childs\":[{\"code\":\"511102\",\"name\":\"市中区\"},{\"code\":\"511111\",\"name\":\"沙湾区\"},{\"code\":\"511112\",\"name\":\"五通桥区\"},{\"code\":\"511113\",\"name\":\"金口河区\"},{\"code\":\"511123\",\"name\":\"犍为县\"},{\"code\":\"511124\",\"name\":\"井研县\"},{\"code\":\"511126\",\"name\":\"夹江县\"},{\"code\":\"511129\",\"name\":\"沐川县\"},{\"code\":\"511132\",\"name\":\"峨边彝族自治县\"},{\"code\":\"511133\",\"name\":\"马边彝族自治县\"},{\"code\":\"511181\",\"name\":\"峨眉山市\"}]},{\"code\":\"5113\",\"name\":\"南充市\",\"childs\":[{\"code\":\"511302\",\"name\":\"顺庆区\"},{\"code\":\"511303\",\"name\":\"高坪区\"},{\"code\":\"511304\",\"name\":\"嘉陵区\"},{\"code\":\"511321\",\"name\":\"南部县\"},{\"code\":\"511322\",\"name\":\"营山县\"},{\"code\":\"511323\",\"name\":\"蓬安县\"},{\"code\":\"511324\",\"name\":\"仪陇县\"},{\"code\":\"511325\",\"name\":\"西充县\"},{\"code\":\"511381\",\"name\":\"阆中市\"}]},{\"code\":\"5114\",\"name\":\"眉山市\",\"childs\":[{\"code\":\"511402\",\"name\":\"东坡区\"},{\"code\":\"511403\",\"name\":\"彭山区\"},{\"code\":\"511421\",\"name\":\"仁寿县\"},{\"code\":\"511423\",\"name\":\"洪雅县\"},{\"code\":\"511424\",\"name\":\"丹棱县\"},{\"code\":\"511425\",\"name\":\"青神县\"}]},{\"code\":\"5115\",\"name\":\"宜宾市\",\"childs\":[{\"code\":\"511502\",\"name\":\"翠屏区\"},{\"code\":\"511503\",\"name\":\"南溪区\"},{\"code\":\"511521\",\"name\":\"宜宾县\"},{\"code\":\"511523\",\"name\":\"江安县\"},{\"code\":\"511524\",\"name\":\"长宁县\"},{\"code\":\"511525\",\"name\":\"高县\"},{\"code\":\"511526\",\"name\":\"珙县\"},{\"code\":\"511527\",\"name\":\"筠连县\"},{\"code\":\"511528\",\"name\":\"兴文县\"},{\"code\":\"511529\",\"name\":\"屏山县\"}]},{\"code\":\"5116\",\"name\":\"广安市\",\"childs\":[{\"code\":\"511602\",\"name\":\"广安区\"},{\"code\":\"511603\",\"name\":\"前锋区\"},{\"code\":\"511621\",\"name\":\"岳池县\"},{\"code\":\"511622\",\"name\":\"武胜县\"},{\"code\":\"511623\",\"name\":\"邻水县\"},{\"code\":\"511681\",\"name\":\"华蓥市\"}]},{\"code\":\"5117\",\"name\":\"达州市\",\"childs\":[{\"code\":\"511702\",\"name\":\"通川区\"},{\"code\":\"511703\",\"name\":\"达川区\"},{\"code\":\"511722\",\"name\":\"宣汉县\"},{\"code\":\"511723\",\"name\":\"开江县\"},{\"code\":\"511724\",\"name\":\"大竹县\"},{\"code\":\"511725\",\"name\":\"渠县\"},{\"code\":\"511781\",\"name\":\"万源市\"}]},{\"code\":\"5118\",\"name\":\"雅安市\",\"childs\":[{\"code\":\"511802\",\"name\":\"雨城区\"},{\"code\":\"511803\",\"name\":\"名山区\"},{\"code\":\"511822\",\"name\":\"荥经县\"},{\"code\":\"511823\",\"name\":\"汉源县\"},{\"code\":\"511824\",\"name\":\"石棉县\"},{\"code\":\"511825\",\"name\":\"天全县\"},{\"code\":\"511826\",\"name\":\"芦山县\"},{\"code\":\"511827\",\"name\":\"宝兴县\"}]},{\"code\":\"5119\",\"name\":\"巴中市\",\"childs\":[{\"code\":\"511902\",\"name\":\"巴州区\"},{\"code\":\"511903\",\"name\":\"恩阳区\"},{\"code\":\"511921\",\"name\":\"通江县\"},{\"code\":\"511922\",\"name\":\"南江县\"},{\"code\":\"511923\",\"name\":\"平昌县\"}]},{\"code\":\"5120\",\"name\":\"资阳市\",\"childs\":[{\"code\":\"512002\",\"name\":\"雁江区\"},{\"code\":\"512021\",\"name\":\"安岳县\"},{\"code\":\"512022\",\"name\":\"乐至县\"}]},{\"code\":\"5132\",\"name\":\"阿坝藏族羌族自治州\",\"childs\":[{\"code\":\"513201\",\"name\":\"马尔康市\"},{\"code\":\"513221\",\"name\":\"汶川县\"},{\"code\":\"513222\",\"name\":\"理县\"},{\"code\":\"513223\",\"name\":\"茂县\"},{\"code\":\"513224\",\"name\":\"松潘县\"},{\"code\":\"513225\",\"name\":\"九寨沟县\"},{\"code\":\"513226\",\"name\":\"金川县\"},{\"code\":\"513227\",\"name\":\"小金县\"},{\"code\":\"513228\",\"name\":\"黑水县\"},{\"code\":\"513230\",\"name\":\"壤塘县\"},{\"code\":\"513231\",\"name\":\"阿坝县\"},{\"code\":\"513232\",\"name\":\"若尔盖县\"},{\"code\":\"513233\",\"name\":\"红原县\"}]},{\"code\":\"5133\",\"name\":\"甘孜藏族自治州\",\"childs\":[{\"code\":\"513301\",\"name\":\"康定市\"},{\"code\":\"513322\",\"name\":\"泸定县\"},{\"code\":\"513323\",\"name\":\"丹巴县\"},{\"code\":\"513324\",\"name\":\"九龙县\"},{\"code\":\"513325\",\"name\":\"雅江县\"},{\"code\":\"513326\",\"name\":\"道孚县\"},{\"code\":\"513327\",\"name\":\"炉霍县\"},{\"code\":\"513328\",\"name\":\"甘孜县\"},{\"code\":\"513329\",\"name\":\"新龙县\"},{\"code\":\"513330\",\"name\":\"德格县\"},{\"code\":\"513331\",\"name\":\"白玉县\"},{\"code\":\"513332\",\"name\":\"石渠县\"},{\"code\":\"513333\",\"name\":\"色达县\"},{\"code\":\"513334\",\"name\":\"理塘县\"},{\"code\":\"513335\",\"name\":\"巴塘县\"},{\"code\":\"513336\",\"name\":\"乡城县\"},{\"code\":\"513337\",\"name\":\"稻城县\"},{\"code\":\"513338\",\"name\":\"得荣县\"}]},{\"code\":\"5134\",\"name\":\"凉山彝族自治州\",\"childs\":[{\"code\":\"513401\",\"name\":\"西昌市\"},{\"code\":\"513422\",\"name\":\"木里藏族自治县\"},{\"code\":\"513423\",\"name\":\"盐源县\"},{\"code\":\"513424\",\"name\":\"德昌县\"},{\"code\":\"513425\",\"name\":\"会理县\"},{\"code\":\"513426\",\"name\":\"会东县\"},{\"code\":\"513427\",\"name\":\"宁南县\"},{\"code\":\"513428\",\"name\":\"普格县\"},{\"code\":\"513429\",\"name\":\"布拖县\"},{\"code\":\"513430\",\"name\":\"金阳县\"},{\"code\":\"513431\",\"name\":\"昭觉县\"},{\"code\":\"513432\",\"name\":\"喜德县\"},{\"code\":\"513433\",\"name\":\"冕宁县\"},{\"code\":\"513434\",\"name\":\"越西县\"},{\"code\":\"513435\",\"name\":\"甘洛县\"},{\"code\":\"513436\",\"name\":\"美姑县\"},{\"code\":\"513437\",\"name\":\"雷波县\"}]}]},{\"code\":\"52\",\"name\":\"贵州省\",\"childs\":[{\"code\":\"5201\",\"name\":\"贵阳市\",\"childs\":[{\"code\":\"520102\",\"name\":\"南明区\"},{\"code\":\"520103\",\"name\":\"云岩区\"},{\"code\":\"520111\",\"name\":\"花溪区\"},{\"code\":\"520112\",\"name\":\"乌当区\"},{\"code\":\"520113\",\"name\":\"白云区\"},{\"code\":\"520115\",\"name\":\"观山湖区\"},{\"code\":\"520121\",\"name\":\"开阳县\"},{\"code\":\"520122\",\"name\":\"息烽县\"},{\"code\":\"520123\",\"name\":\"修文县\"},{\"code\":\"520181\",\"name\":\"清镇市\"}]},{\"code\":\"5202\",\"name\":\"六盘水市\",\"childs\":[{\"code\":\"520201\",\"name\":\"钟山区\"},{\"code\":\"520203\",\"name\":\"六枝特区\"},{\"code\":\"520221\",\"name\":\"水城县\"},{\"code\":\"520222\",\"name\":\"盘县\"}]},{\"code\":\"5203\",\"name\":\"遵义市\",\"childs\":[{\"code\":\"520302\",\"name\":\"红花岗区\"},{\"code\":\"520303\",\"name\":\"汇川区\"},{\"code\":\"520304\",\"name\":\"播州区\"},{\"code\":\"520322\",\"name\":\"桐梓县\"},{\"code\":\"520323\",\"name\":\"绥阳县\"},{\"code\":\"520324\",\"name\":\"正安县\"},{\"code\":\"520325\",\"name\":\"道真仡佬族苗族自治县\"},{\"code\":\"520326\",\"name\":\"务川仡佬族苗族自治县\"},{\"code\":\"520327\",\"name\":\"凤冈县\"},{\"code\":\"520328\",\"name\":\"湄潭县\"},{\"code\":\"520329\",\"name\":\"余庆县\"},{\"code\":\"520330\",\"name\":\"习水县\"},{\"code\":\"520381\",\"name\":\"赤水市\"},{\"code\":\"520382\",\"name\":\"仁怀市\"}]},{\"code\":\"5204\",\"name\":\"安顺市\",\"childs\":[{\"code\":\"520402\",\"name\":\"西秀区\"},{\"code\":\"520403\",\"name\":\"平坝区\"},{\"code\":\"520422\",\"name\":\"普定县\"},{\"code\":\"520423\",\"name\":\"镇宁布依族苗族自治县\"},{\"code\":\"520424\",\"name\":\"关岭布依族苗族自治县\"},{\"code\":\"520425\",\"name\":\"紫云苗族布依族自治县\"}]},{\"code\":\"5205\",\"name\":\"毕节市\",\"childs\":[{\"code\":\"520502\",\"name\":\"七星关区\"},{\"code\":\"520521\",\"name\":\"大方县\"},{\"code\":\"520522\",\"name\":\"黔西县\"},{\"code\":\"520523\",\"name\":\"金沙县\"},{\"code\":\"520524\",\"name\":\"织金县\"},{\"code\":\"520525\",\"name\":\"纳雍县\"},{\"code\":\"520526\",\"name\":\"威宁彝族回族苗族自治县\"},{\"code\":\"520527\",\"name\":\"赫章县\"}]},{\"code\":\"5206\",\"name\":\"铜仁市\",\"childs\":[{\"code\":\"520602\",\"name\":\"碧江区\"},{\"code\":\"520603\",\"name\":\"万山区\"},{\"code\":\"520621\",\"name\":\"江口县\"},{\"code\":\"520622\",\"name\":\"玉屏侗族自治县\"},{\"code\":\"520623\",\"name\":\"石阡县\"},{\"code\":\"520624\",\"name\":\"思南县\"},{\"code\":\"520625\",\"name\":\"印江土家族苗族自治县\"},{\"code\":\"520626\",\"name\":\"德江县\"},{\"code\":\"520627\",\"name\":\"沿河土家族自治县\"},{\"code\":\"520628\",\"name\":\"松桃苗族自治县\"}]},{\"code\":\"5223\",\"name\":\"黔西南布依族苗族自治州\",\"childs\":[{\"code\":\"522301\",\"name\":\"兴义市\"},{\"code\":\"522322\",\"name\":\"兴仁县\"},{\"code\":\"522323\",\"name\":\"普安县\"},{\"code\":\"522324\",\"name\":\"晴隆县\"},{\"code\":\"522325\",\"name\":\"贞丰县\"},{\"code\":\"522326\",\"name\":\"望谟县\"},{\"code\":\"522327\",\"name\":\"册亨县\"},{\"code\":\"522328\",\"name\":\"安龙县\"}]},{\"code\":\"5226\",\"name\":\"黔东南苗族侗族自治州\",\"childs\":[{\"code\":\"522601\",\"name\":\"凯里市\"},{\"code\":\"522622\",\"name\":\"黄平县\"},{\"code\":\"522623\",\"name\":\"施秉县\"},{\"code\":\"522624\",\"name\":\"三穗县\"},{\"code\":\"522625\",\"name\":\"镇远县\"},{\"code\":\"522626\",\"name\":\"岑巩县\"},{\"code\":\"522627\",\"name\":\"天柱县\"},{\"code\":\"522628\",\"name\":\"锦屏县\"},{\"code\":\"522629\",\"name\":\"剑河县\"},{\"code\":\"522630\",\"name\":\"台江县\"},{\"code\":\"522631\",\"name\":\"黎平县\"},{\"code\":\"522632\",\"name\":\"榕江县\"},{\"code\":\"522633\",\"name\":\"从江县\"},{\"code\":\"522634\",\"name\":\"雷山县\"},{\"code\":\"522635\",\"name\":\"麻江县\"},{\"code\":\"522636\",\"name\":\"丹寨县\"}]},{\"code\":\"5227\",\"name\":\"黔南布依族苗族自治州\",\"childs\":[{\"code\":\"522701\",\"name\":\"都匀市\"},{\"code\":\"522702\",\"name\":\"福泉市\"},{\"code\":\"522722\",\"name\":\"荔波县\"},{\"code\":\"522723\",\"name\":\"贵定县\"},{\"code\":\"522725\",\"name\":\"瓮安县\"},{\"code\":\"522726\",\"name\":\"独山县\"},{\"code\":\"522727\",\"name\":\"平塘县\"},{\"code\":\"522728\",\"name\":\"罗甸县\"},{\"code\":\"522729\",\"name\":\"长顺县\"},{\"code\":\"522730\",\"name\":\"龙里县\"},{\"code\":\"522731\",\"name\":\"惠水县\"},{\"code\":\"522732\",\"name\":\"三都水族自治县\"}]}]},{\"code\":\"53\",\"name\":\"云南省\",\"childs\":[{\"code\":\"5301\",\"name\":\"昆明市\",\"childs\":[{\"code\":\"530102\",\"name\":\"五华区\"},{\"code\":\"530103\",\"name\":\"盘龙区\"},{\"code\":\"530111\",\"name\":\"官渡区\"},{\"code\":\"530112\",\"name\":\"西山区\"},{\"code\":\"530113\",\"name\":\"东川区\"},{\"code\":\"530114\",\"name\":\"呈贡区\"},{\"code\":\"530122\",\"name\":\"晋宁县\"},{\"code\":\"530124\",\"name\":\"富民县\"},{\"code\":\"530125\",\"name\":\"宜良县\"},{\"code\":\"530126\",\"name\":\"石林彝族自治县\"},{\"code\":\"530127\",\"name\":\"嵩明县\"},{\"code\":\"530128\",\"name\":\"禄劝彝族苗族自治县\"},{\"code\":\"530129\",\"name\":\"寻甸回族彝族自治县\"},{\"code\":\"530181\",\"name\":\"安宁市\"}]},{\"code\":\"5303\",\"name\":\"曲靖市\",\"childs\":[{\"code\":\"530302\",\"name\":\"麒麟区\"},{\"code\":\"530303\",\"name\":\"沾益区\"},{\"code\":\"530321\",\"name\":\"马龙县\"},{\"code\":\"530322\",\"name\":\"陆良县\"},{\"code\":\"530323\",\"name\":\"师宗县\"},{\"code\":\"530324\",\"name\":\"罗平县\"},{\"code\":\"530325\",\"name\":\"富源县\"},{\"code\":\"530326\",\"name\":\"会泽县\"},{\"code\":\"530381\",\"name\":\"宣威市\"}]},{\"code\":\"5304\",\"name\":\"玉溪市\",\"childs\":[{\"code\":\"530402\",\"name\":\"红塔区\"},{\"code\":\"530403\",\"name\":\"江川区\"},{\"code\":\"530422\",\"name\":\"澄江县\"},{\"code\":\"530423\",\"name\":\"通海县\"},{\"code\":\"530424\",\"name\":\"华宁县\"},{\"code\":\"530425\",\"name\":\"易门县\"},{\"code\":\"530426\",\"name\":\"峨山彝族自治县\"},{\"code\":\"530427\",\"name\":\"新平彝族傣族自治县\"},{\"code\":\"530428\",\"name\":\"元江哈尼族彝族傣族自治县\"}]},{\"code\":\"5305\",\"name\":\"保山市\",\"childs\":[{\"code\":\"530502\",\"name\":\"隆阳区\"},{\"code\":\"530521\",\"name\":\"施甸县\"},{\"code\":\"530523\",\"name\":\"龙陵县\"},{\"code\":\"530524\",\"name\":\"昌宁县\"},{\"code\":\"530581\",\"name\":\"腾冲市\"}]},{\"code\":\"5306\",\"name\":\"昭通市\",\"childs\":[{\"code\":\"530602\",\"name\":\"昭阳区\"},{\"code\":\"530621\",\"name\":\"鲁甸县\"},{\"code\":\"530622\",\"name\":\"巧家县\"},{\"code\":\"530623\",\"name\":\"盐津县\"},{\"code\":\"530624\",\"name\":\"大关县\"},{\"code\":\"530625\",\"name\":\"永善县\"},{\"code\":\"530626\",\"name\":\"绥江县\"},{\"code\":\"530627\",\"name\":\"镇雄县\"},{\"code\":\"530628\",\"name\":\"彝良县\"},{\"code\":\"530629\",\"name\":\"威信县\"},{\"code\":\"530630\",\"name\":\"水富县\"}]},{\"code\":\"5307\",\"name\":\"丽江市\",\"childs\":[{\"code\":\"530702\",\"name\":\"古城区\"},{\"code\":\"530721\",\"name\":\"玉龙纳西族自治县\"},{\"code\":\"530722\",\"name\":\"永胜县\"},{\"code\":\"530723\",\"name\":\"华坪县\"},{\"code\":\"530724\",\"name\":\"宁蒗彝族自治县\"}]},{\"code\":\"5308\",\"name\":\"普洱市\",\"childs\":[{\"code\":\"530802\",\"name\":\"思茅区\"},{\"code\":\"530821\",\"name\":\"宁洱哈尼族彝族自治县\"},{\"code\":\"530822\",\"name\":\"墨江哈尼族自治县\"},{\"code\":\"530823\",\"name\":\"景东彝族自治县\"},{\"code\":\"530824\",\"name\":\"景谷傣族彝族自治县\"},{\"code\":\"530825\",\"name\":\"镇沅彝族哈尼族拉祜族自治县\"},{\"code\":\"530826\",\"name\":\"江城哈尼族彝族自治县\"},{\"code\":\"530827\",\"name\":\"孟连傣族拉祜族佤族自治县\"},{\"code\":\"530828\",\"name\":\"澜沧拉祜族自治县\"},{\"code\":\"530829\",\"name\":\"西盟佤族自治县\"}]},{\"code\":\"5309\",\"name\":\"临沧市\",\"childs\":[{\"code\":\"530902\",\"name\":\"临翔区\"},{\"code\":\"530921\",\"name\":\"凤庆县\"},{\"code\":\"530922\",\"name\":\"云县\"},{\"code\":\"530923\",\"name\":\"永德县\"},{\"code\":\"530924\",\"name\":\"镇康县\"},{\"code\":\"530925\",\"name\":\"双江拉祜族佤族布朗族傣族自治县\"},{\"code\":\"530926\",\"name\":\"耿马傣族佤族自治县\"},{\"code\":\"530927\",\"name\":\"沧源佤族自治县\"}]},{\"code\":\"5323\",\"name\":\"楚雄彝族自治州\",\"childs\":[{\"code\":\"532301\",\"name\":\"楚雄市\"},{\"code\":\"532322\",\"name\":\"双柏县\"},{\"code\":\"532323\",\"name\":\"牟定县\"},{\"code\":\"532324\",\"name\":\"南华县\"},{\"code\":\"532325\",\"name\":\"姚安县\"},{\"code\":\"532326\",\"name\":\"大姚县\"},{\"code\":\"532327\",\"name\":\"永仁县\"},{\"code\":\"532328\",\"name\":\"元谋县\"},{\"code\":\"532329\",\"name\":\"武定县\"},{\"code\":\"532331\",\"name\":\"禄丰县\"}]},{\"code\":\"5325\",\"name\":\"红河哈尼族彝族自治州\",\"childs\":[{\"code\":\"532501\",\"name\":\"个旧市\"},{\"code\":\"532502\",\"name\":\"开远市\"},{\"code\":\"532503\",\"name\":\"蒙自市\"},{\"code\":\"532504\",\"name\":\"弥勒市\"},{\"code\":\"532523\",\"name\":\"屏边苗族自治县\"},{\"code\":\"532524\",\"name\":\"建水县\"},{\"code\":\"532525\",\"name\":\"石屏县\"},{\"code\":\"532527\",\"name\":\"泸西县\"},{\"code\":\"532528\",\"name\":\"元阳县\"},{\"code\":\"532529\",\"name\":\"红河县\"},{\"code\":\"532530\",\"name\":\"金平苗族瑶族傣族自治县\"},{\"code\":\"532531\",\"name\":\"绿春县\"},{\"code\":\"532532\",\"name\":\"河口瑶族自治县\"}]},{\"code\":\"5326\",\"name\":\"文山壮族苗族自治州\",\"childs\":[{\"code\":\"532601\",\"name\":\"文山市\"},{\"code\":\"532622\",\"name\":\"砚山县\"},{\"code\":\"532623\",\"name\":\"西畴县\"},{\"code\":\"532624\",\"name\":\"麻栗坡县\"},{\"code\":\"532625\",\"name\":\"马关县\"},{\"code\":\"532626\",\"name\":\"丘北县\"},{\"code\":\"532627\",\"name\":\"广南县\"},{\"code\":\"532628\",\"name\":\"富宁县\"}]},{\"code\":\"5328\",\"name\":\"西双版纳傣族自治州\",\"childs\":[{\"code\":\"532801\",\"name\":\"景洪市\"},{\"code\":\"532822\",\"name\":\"勐海县\"},{\"code\":\"532823\",\"name\":\"勐腊县\"}]},{\"code\":\"5329\",\"name\":\"大理白族自治州\",\"childs\":[{\"code\":\"532901\",\"name\":\"大理市\"},{\"code\":\"532922\",\"name\":\"漾濞彝族自治县\"},{\"code\":\"532923\",\"name\":\"祥云县\"},{\"code\":\"532924\",\"name\":\"宾川县\"},{\"code\":\"532925\",\"name\":\"弥渡县\"},{\"code\":\"532926\",\"name\":\"南涧彝族自治县\"},{\"code\":\"532927\",\"name\":\"巍山彝族回族自治县\"},{\"code\":\"532928\",\"name\":\"永平县\"},{\"code\":\"532929\",\"name\":\"云龙县\"},{\"code\":\"532930\",\"name\":\"洱源县\"},{\"code\":\"532931\",\"name\":\"剑川县\"},{\"code\":\"532932\",\"name\":\"鹤庆县\"}]},{\"code\":\"5331\",\"name\":\"德宏傣族景颇族自治州\",\"childs\":[{\"code\":\"533102\",\"name\":\"瑞丽市\"},{\"code\":\"533103\",\"name\":\"芒市\"},{\"code\":\"533122\",\"name\":\"梁河县\"},{\"code\":\"533123\",\"name\":\"盈江县\"},{\"code\":\"533124\",\"name\":\"陇川县\"}]},{\"code\":\"5333\",\"name\":\"怒江傈僳族自治州\",\"childs\":[{\"code\":\"533301\",\"name\":\"泸水市\"},{\"code\":\"533323\",\"name\":\"福贡县\"},{\"code\":\"533324\",\"name\":\"贡山独龙族怒族自治县\"},{\"code\":\"533325\",\"name\":\"兰坪白族普米族自治县\"}]},{\"code\":\"5334\",\"name\":\"迪庆藏族自治州\",\"childs\":[{\"code\":\"533401\",\"name\":\"香格里拉市\"},{\"code\":\"533422\",\"name\":\"德钦县\"},{\"code\":\"533423\",\"name\":\"维西傈僳族自治县\"}]}]},{\"code\":\"54\",\"name\":\"西藏自治区\",\"childs\":[{\"code\":\"5401\",\"name\":\"拉萨市\",\"childs\":[{\"code\":\"540102\",\"name\":\"城关区\"},{\"code\":\"540103\",\"name\":\"堆龙德庆区\"},{\"code\":\"540121\",\"name\":\"林周县\"},{\"code\":\"540122\",\"name\":\"当雄县\"},{\"code\":\"540123\",\"name\":\"尼木县\"},{\"code\":\"540124\",\"name\":\"曲水县\"},{\"code\":\"540126\",\"name\":\"达孜县\"},{\"code\":\"540127\",\"name\":\"墨竹工卡县\"}]},{\"code\":\"5402\",\"name\":\"日喀则市\",\"childs\":[{\"code\":\"540202\",\"name\":\"桑珠孜区\"},{\"code\":\"540221\",\"name\":\"南木林县\"},{\"code\":\"540222\",\"name\":\"江孜县\"},{\"code\":\"540223\",\"name\":\"定日县\"},{\"code\":\"540224\",\"name\":\"萨迦县\"},{\"code\":\"540225\",\"name\":\"拉孜县\"},{\"code\":\"540226\",\"name\":\"昂仁县\"},{\"code\":\"540227\",\"name\":\"谢通门县\"},{\"code\":\"540228\",\"name\":\"白朗县\"},{\"code\":\"540229\",\"name\":\"仁布县\"},{\"code\":\"540230\",\"name\":\"康马县\"},{\"code\":\"540231\",\"name\":\"定结县\"},{\"code\":\"540232\",\"name\":\"仲巴县\"},{\"code\":\"540233\",\"name\":\"亚东县\"},{\"code\":\"540234\",\"name\":\"吉隆县\"},{\"code\":\"540235\",\"name\":\"聂拉木县\"},{\"code\":\"540236\",\"name\":\"萨嘎县\"},{\"code\":\"540237\",\"name\":\"岗巴县\"}]},{\"code\":\"5403\",\"name\":\"昌都市\",\"childs\":[{\"code\":\"540302\",\"name\":\"卡若区\"},{\"code\":\"540321\",\"name\":\"江达县\"},{\"code\":\"540322\",\"name\":\"贡觉县\"},{\"code\":\"540323\",\"name\":\"类乌齐县\"},{\"code\":\"540324\",\"name\":\"丁青县\"},{\"code\":\"540325\",\"name\":\"察雅县\"},{\"code\":\"540326\",\"name\":\"八宿县\"},{\"code\":\"540327\",\"name\":\"左贡县\"},{\"code\":\"540328\",\"name\":\"芒康县\"},{\"code\":\"540329\",\"name\":\"洛隆县\"},{\"code\":\"540330\",\"name\":\"边坝县\"}]},{\"code\":\"5404\",\"name\":\"林芝市\",\"childs\":[{\"code\":\"540402\",\"name\":\"巴宜区\"},{\"code\":\"540421\",\"name\":\"工布江达县\"},{\"code\":\"540422\",\"name\":\"米林县\"},{\"code\":\"540423\",\"name\":\"墨脱县\"},{\"code\":\"540424\",\"name\":\"波密县\"},{\"code\":\"540425\",\"name\":\"察隅县\"},{\"code\":\"540426\",\"name\":\"朗县\"}]},{\"code\":\"5405\",\"name\":\"山南市\",\"childs\":[{\"code\":\"540502\",\"name\":\"乃东区\"},{\"code\":\"540521\",\"name\":\"扎囊县\"},{\"code\":\"540522\",\"name\":\"贡嘎县\"},{\"code\":\"540523\",\"name\":\"桑日县\"},{\"code\":\"540524\",\"name\":\"琼结县\"},{\"code\":\"540525\",\"name\":\"曲松县\"},{\"code\":\"540526\",\"name\":\"措美县\"},{\"code\":\"540527\",\"name\":\"洛扎县\"},{\"code\":\"540528\",\"name\":\"加查县\"},{\"code\":\"540529\",\"name\":\"隆子县\"},{\"code\":\"540530\",\"name\":\"错那县\"},{\"code\":\"540531\",\"name\":\"浪卡子县\"}]},{\"code\":\"5424\",\"name\":\"那曲地区\",\"childs\":[{\"code\":\"542421\",\"name\":\"那曲县\"},{\"code\":\"542422\",\"name\":\"嘉黎县\"},{\"code\":\"542423\",\"name\":\"比如县\"},{\"code\":\"542424\",\"name\":\"聂荣县\"},{\"code\":\"542425\",\"name\":\"安多县\"},{\"code\":\"542426\",\"name\":\"申扎县\"},{\"code\":\"542427\",\"name\":\"索县\"},{\"code\":\"542428\",\"name\":\"班戈县\"},{\"code\":\"542429\",\"name\":\"巴青县\"},{\"code\":\"542430\",\"name\":\"尼玛县\"},{\"code\":\"542431\",\"name\":\"双湖县\"}]},{\"code\":\"5425\",\"name\":\"阿里地区\",\"childs\":[{\"code\":\"542521\",\"name\":\"普兰县\"},{\"code\":\"542522\",\"name\":\"札达县\"},{\"code\":\"542523\",\"name\":\"噶尔县\"},{\"code\":\"542524\",\"name\":\"日土县\"},{\"code\":\"542525\",\"name\":\"革吉县\"},{\"code\":\"542526\",\"name\":\"改则县\"},{\"code\":\"542527\",\"name\":\"措勤县\"}]}]},{\"code\":\"61\",\"name\":\"陕西省\",\"childs\":[{\"code\":\"6101\",\"name\":\"西安市\",\"childs\":[{\"code\":\"610102\",\"name\":\"新城区\"},{\"code\":\"610103\",\"name\":\"碑林区\"},{\"code\":\"610104\",\"name\":\"莲湖区\"},{\"code\":\"610111\",\"name\":\"灞桥区\"},{\"code\":\"610112\",\"name\":\"未央区\"},{\"code\":\"610113\",\"name\":\"雁塔区\"},{\"code\":\"610114\",\"name\":\"阎良区\"},{\"code\":\"610115\",\"name\":\"临潼区\"},{\"code\":\"610116\",\"name\":\"长安区\"},{\"code\":\"610117\",\"name\":\"高陵区\"},{\"code\":\"610122\",\"name\":\"蓝田县\"},{\"code\":\"610124\",\"name\":\"周至县\"},{\"code\":\"610125\",\"name\":\"户县\"}]},{\"code\":\"6102\",\"name\":\"铜川市\",\"childs\":[{\"code\":\"610202\",\"name\":\"王益区\"},{\"code\":\"610203\",\"name\":\"印台区\"},{\"code\":\"610204\",\"name\":\"耀州区\"},{\"code\":\"610222\",\"name\":\"宜君县\"}]},{\"code\":\"6103\",\"name\":\"宝鸡市\",\"childs\":[{\"code\":\"610302\",\"name\":\"渭滨区\"},{\"code\":\"610303\",\"name\":\"金台区\"},{\"code\":\"610304\",\"name\":\"陈仓区\"},{\"code\":\"610322\",\"name\":\"凤翔县\"},{\"code\":\"610323\",\"name\":\"岐山县\"},{\"code\":\"610324\",\"name\":\"扶风县\"},{\"code\":\"610326\",\"name\":\"眉县\"},{\"code\":\"610327\",\"name\":\"陇县\"},{\"code\":\"610328\",\"name\":\"千阳县\"},{\"code\":\"610329\",\"name\":\"麟游县\"},{\"code\":\"610330\",\"name\":\"凤县\"},{\"code\":\"610331\",\"name\":\"太白县\"}]},{\"code\":\"6104\",\"name\":\"咸阳市\",\"childs\":[{\"code\":\"610402\",\"name\":\"秦都区\"},{\"code\":\"610403\",\"name\":\"杨陵区\"},{\"code\":\"610404\",\"name\":\"渭城区\"},{\"code\":\"610422\",\"name\":\"三原县\"},{\"code\":\"610423\",\"name\":\"泾阳县\"},{\"code\":\"610424\",\"name\":\"乾县\"},{\"code\":\"610425\",\"name\":\"礼泉县\"},{\"code\":\"610426\",\"name\":\"永寿县\"},{\"code\":\"610427\",\"name\":\"彬县\"},{\"code\":\"610428\",\"name\":\"长武县\"},{\"code\":\"610429\",\"name\":\"旬邑县\"},{\"code\":\"610430\",\"name\":\"淳化县\"},{\"code\":\"610431\",\"name\":\"武功县\"},{\"code\":\"610481\",\"name\":\"兴平市\"}]},{\"code\":\"6105\",\"name\":\"渭南市\",\"childs\":[{\"code\":\"610502\",\"name\":\"临渭区\"},{\"code\":\"610503\",\"name\":\"华州区\"},{\"code\":\"610522\",\"name\":\"潼关县\"},{\"code\":\"610523\",\"name\":\"大荔县\"},{\"code\":\"610524\",\"name\":\"合阳县\"},{\"code\":\"610525\",\"name\":\"澄城县\"},{\"code\":\"610526\",\"name\":\"蒲城县\"},{\"code\":\"610527\",\"name\":\"白水县\"},{\"code\":\"610528\",\"name\":\"富平县\"},{\"code\":\"610581\",\"name\":\"韩城市\"},{\"code\":\"610582\",\"name\":\"华阴市\"}]},{\"code\":\"6106\",\"name\":\"延安市\",\"childs\":[{\"code\":\"610602\",\"name\":\"宝塔区\"},{\"code\":\"610603\",\"name\":\"安塞区\"},{\"code\":\"610621\",\"name\":\"延长县\"},{\"code\":\"610622\",\"name\":\"延川县\"},{\"code\":\"610623\",\"name\":\"子长县\"},{\"code\":\"610625\",\"name\":\"志丹县\"},{\"code\":\"610626\",\"name\":\"吴起县\"},{\"code\":\"610627\",\"name\":\"甘泉县\"},{\"code\":\"610628\",\"name\":\"富县\"},{\"code\":\"610629\",\"name\":\"洛川县\"},{\"code\":\"610630\",\"name\":\"宜川县\"},{\"code\":\"610631\",\"name\":\"黄龙县\"},{\"code\":\"610632\",\"name\":\"黄陵县\"}]},{\"code\":\"6107\",\"name\":\"汉中市\",\"childs\":[{\"code\":\"610702\",\"name\":\"汉台区\"},{\"code\":\"610721\",\"name\":\"南郑县\"},{\"code\":\"610722\",\"name\":\"城固县\"},{\"code\":\"610723\",\"name\":\"洋县\"},{\"code\":\"610724\",\"name\":\"西乡县\"},{\"code\":\"610725\",\"name\":\"勉县\"},{\"code\":\"610726\",\"name\":\"宁强县\"},{\"code\":\"610727\",\"name\":\"略阳县\"},{\"code\":\"610728\",\"name\":\"镇巴县\"},{\"code\":\"610729\",\"name\":\"留坝县\"},{\"code\":\"610730\",\"name\":\"佛坪县\"}]},{\"code\":\"6108\",\"name\":\"榆林市\",\"childs\":[{\"code\":\"610802\",\"name\":\"榆阳区\"},{\"code\":\"610803\",\"name\":\"横山区\"},{\"code\":\"610821\",\"name\":\"神木县\"},{\"code\":\"610822\",\"name\":\"府谷县\"},{\"code\":\"610824\",\"name\":\"靖边县\"},{\"code\":\"610825\",\"name\":\"定边县\"},{\"code\":\"610826\",\"name\":\"绥德县\"},{\"code\":\"610827\",\"name\":\"米脂县\"},{\"code\":\"610828\",\"name\":\"佳县\"},{\"code\":\"610829\",\"name\":\"吴堡县\"},{\"code\":\"610830\",\"name\":\"清涧县\"},{\"code\":\"610831\",\"name\":\"子洲县\"}]},{\"code\":\"6109\",\"name\":\"安康市\",\"childs\":[{\"code\":\"610902\",\"name\":\"汉滨区\"},{\"code\":\"610921\",\"name\":\"汉阴县\"},{\"code\":\"610922\",\"name\":\"石泉县\"},{\"code\":\"610923\",\"name\":\"宁陕县\"},{\"code\":\"610924\",\"name\":\"紫阳县\"},{\"code\":\"610925\",\"name\":\"岚皋县\"},{\"code\":\"610926\",\"name\":\"平利县\"},{\"code\":\"610927\",\"name\":\"镇坪县\"},{\"code\":\"610928\",\"name\":\"旬阳县\"},{\"code\":\"610929\",\"name\":\"白河县\"}]},{\"code\":\"6110\",\"name\":\"商洛市\",\"childs\":[{\"code\":\"611002\",\"name\":\"商州区\"},{\"code\":\"611021\",\"name\":\"洛南县\"},{\"code\":\"611022\",\"name\":\"丹凤县\"},{\"code\":\"611023\",\"name\":\"商南县\"},{\"code\":\"611024\",\"name\":\"山阳县\"},{\"code\":\"611025\",\"name\":\"镇安县\"},{\"code\":\"611026\",\"name\":\"柞水县\"}]}]},{\"code\":\"62\",\"name\":\"甘肃省\",\"childs\":[{\"code\":\"6201\",\"name\":\"兰州市\",\"childs\":[{\"code\":\"620102\",\"name\":\"城关区\"},{\"code\":\"620103\",\"name\":\"七里河区\"},{\"code\":\"620104\",\"name\":\"西固区\"},{\"code\":\"620105\",\"name\":\"安宁区\"},{\"code\":\"620111\",\"name\":\"红古区\"},{\"code\":\"620121\",\"name\":\"永登县\"},{\"code\":\"620122\",\"name\":\"皋兰县\"},{\"code\":\"620123\",\"name\":\"榆中县\"}]},{\"code\":\"620201\",\"name\":\"嘉峪关市\",\"childs\":[{\"code\":\"620201100\",\"name\":\"新城镇\"},{\"code\":\"620201101\",\"name\":\"峪泉镇\"},{\"code\":\"620201102\",\"name\":\"文殊镇\"},{\"code\":\"620201401\",\"name\":\"雄关区\"},{\"code\":\"620201402\",\"name\":\"镜铁区\"},{\"code\":\"620201403\",\"name\":\"长城区\"}]},{\"code\":\"6203\",\"name\":\"金昌市\",\"childs\":[{\"code\":\"620302\",\"name\":\"金川区\"},{\"code\":\"620321\",\"name\":\"永昌县\"}]},{\"code\":\"6204\",\"name\":\"白银市\",\"childs\":[{\"code\":\"620402\",\"name\":\"白银区\"},{\"code\":\"620403\",\"name\":\"平川区\"},{\"code\":\"620421\",\"name\":\"靖远县\"},{\"code\":\"620422\",\"name\":\"会宁县\"},{\"code\":\"620423\",\"name\":\"景泰县\"}]},{\"code\":\"6205\",\"name\":\"天水市\",\"childs\":[{\"code\":\"620502\",\"name\":\"秦州区\"},{\"code\":\"620503\",\"name\":\"麦积区\"},{\"code\":\"620521\",\"name\":\"清水县\"},{\"code\":\"620522\",\"name\":\"秦安县\"},{\"code\":\"620523\",\"name\":\"甘谷县\"},{\"code\":\"620524\",\"name\":\"武山县\"},{\"code\":\"620525\",\"name\":\"张家川回族自治县\"}]},{\"code\":\"6206\",\"name\":\"武威市\",\"childs\":[{\"code\":\"620602\",\"name\":\"凉州区\"},{\"code\":\"620621\",\"name\":\"民勤县\"},{\"code\":\"620622\",\"name\":\"古浪县\"},{\"code\":\"620623\",\"name\":\"天祝藏族自治县\"}]},{\"code\":\"6207\",\"name\":\"张掖市\",\"childs\":[{\"code\":\"620702\",\"name\":\"甘州区\"},{\"code\":\"620721\",\"name\":\"肃南裕固族自治县\"},{\"code\":\"620722\",\"name\":\"民乐县\"},{\"code\":\"620723\",\"name\":\"临泽县\"},{\"code\":\"620724\",\"name\":\"高台县\"},{\"code\":\"620725\",\"name\":\"山丹县\"}]},{\"code\":\"6208\",\"name\":\"平凉市\",\"childs\":[{\"code\":\"620802\",\"name\":\"崆峒区\"},{\"code\":\"620821\",\"name\":\"泾川县\"},{\"code\":\"620822\",\"name\":\"灵台县\"},{\"code\":\"620823\",\"name\":\"崇信县\"},{\"code\":\"620824\",\"name\":\"华亭县\"},{\"code\":\"620825\",\"name\":\"庄浪县\"},{\"code\":\"620826\",\"name\":\"静宁县\"}]},{\"code\":\"6209\",\"name\":\"酒泉市\",\"childs\":[{\"code\":\"620902\",\"name\":\"肃州区\"},{\"code\":\"620921\",\"name\":\"金塔县\"},{\"code\":\"620922\",\"name\":\"瓜州县\"},{\"code\":\"620923\",\"name\":\"肃北蒙古族自治县\"},{\"code\":\"620924\",\"name\":\"阿克塞哈萨克族自治县\"},{\"code\":\"620981\",\"name\":\"玉门市\"},{\"code\":\"620982\",\"name\":\"敦煌市\"}]},{\"code\":\"6210\",\"name\":\"庆阳市\",\"childs\":[{\"code\":\"621002\",\"name\":\"西峰区\"},{\"code\":\"621021\",\"name\":\"庆城县\"},{\"code\":\"621022\",\"name\":\"环县\"},{\"code\":\"621023\",\"name\":\"华池县\"},{\"code\":\"621024\",\"name\":\"合水县\"},{\"code\":\"621025\",\"name\":\"正宁县\"},{\"code\":\"621026\",\"name\":\"宁县\"},{\"code\":\"621027\",\"name\":\"镇原县\"}]},{\"code\":\"6211\",\"name\":\"定西市\",\"childs\":[{\"code\":\"621102\",\"name\":\"安定区\"},{\"code\":\"621121\",\"name\":\"通渭县\"},{\"code\":\"621122\",\"name\":\"陇西县\"},{\"code\":\"621123\",\"name\":\"渭源县\"},{\"code\":\"621124\",\"name\":\"临洮县\"},{\"code\":\"621125\",\"name\":\"漳县\"},{\"code\":\"621126\",\"name\":\"岷县\"}]},{\"code\":\"6212\",\"name\":\"陇南市\",\"childs\":[{\"code\":\"621202\",\"name\":\"武都区\"},{\"code\":\"621221\",\"name\":\"成县\"},{\"code\":\"621222\",\"name\":\"文县\"},{\"code\":\"621223\",\"name\":\"宕昌县\"},{\"code\":\"621224\",\"name\":\"康县\"},{\"code\":\"621225\",\"name\":\"西和县\"},{\"code\":\"621226\",\"name\":\"礼县\"},{\"code\":\"621227\",\"name\":\"徽县\"},{\"code\":\"621228\",\"name\":\"两当县\"}]},{\"code\":\"6229\",\"name\":\"临夏回族自治州\",\"childs\":[{\"code\":\"622901\",\"name\":\"临夏市\"},{\"code\":\"622921\",\"name\":\"临夏县\"},{\"code\":\"622922\",\"name\":\"康乐县\"},{\"code\":\"622923\",\"name\":\"永靖县\"},{\"code\":\"622924\",\"name\":\"广河县\"},{\"code\":\"622925\",\"name\":\"和政县\"},{\"code\":\"622926\",\"name\":\"东乡族自治县\"},{\"code\":\"622927\",\"name\":\"积石山保安族东乡族撒拉族自治县\"}]},{\"code\":\"6230\",\"name\":\"甘南藏族自治州\",\"childs\":[{\"code\":\"623001\",\"name\":\"合作市\"},{\"code\":\"623021\",\"name\":\"临潭县\"},{\"code\":\"623022\",\"name\":\"卓尼县\"},{\"code\":\"623023\",\"name\":\"舟曲县\"},{\"code\":\"623024\",\"name\":\"迭部县\"},{\"code\":\"623025\",\"name\":\"玛曲县\"},{\"code\":\"623026\",\"name\":\"碌曲县\"},{\"code\":\"623027\",\"name\":\"夏河县\"}]}]},{\"code\":\"63\",\"name\":\"青海省\",\"childs\":[{\"code\":\"6301\",\"name\":\"西宁市\",\"childs\":[{\"code\":\"630102\",\"name\":\"城东区\"},{\"code\":\"630103\",\"name\":\"城中区\"},{\"code\":\"630104\",\"name\":\"城西区\"},{\"code\":\"630105\",\"name\":\"城北区\"},{\"code\":\"630121\",\"name\":\"大通回族土族自治县\"},{\"code\":\"630122\",\"name\":\"湟中县\"},{\"code\":\"630123\",\"name\":\"湟源县\"}]},{\"code\":\"6302\",\"name\":\"海东市\",\"childs\":[{\"code\":\"630202\",\"name\":\"乐都区\"},{\"code\":\"630203\",\"name\":\"平安区\"},{\"code\":\"630222\",\"name\":\"民和回族土族自治县\"},{\"code\":\"630223\",\"name\":\"互助土族自治县\"},{\"code\":\"630224\",\"name\":\"化隆回族自治县\"},{\"code\":\"630225\",\"name\":\"循化撒拉族自治县\"}]},{\"code\":\"6322\",\"name\":\"海北藏族自治州\",\"childs\":[{\"code\":\"632221\",\"name\":\"门源回族自治县\"},{\"code\":\"632222\",\"name\":\"祁连县\"},{\"code\":\"632223\",\"name\":\"海晏县\"},{\"code\":\"632224\",\"name\":\"刚察县\"}]},{\"code\":\"6323\",\"name\":\"黄南藏族自治州\",\"childs\":[{\"code\":\"632321\",\"name\":\"同仁县\"},{\"code\":\"632322\",\"name\":\"尖扎县\"},{\"code\":\"632323\",\"name\":\"泽库县\"},{\"code\":\"632324\",\"name\":\"河南蒙古族自治县\"}]},{\"code\":\"6325\",\"name\":\"海南藏族自治州\",\"childs\":[{\"code\":\"632521\",\"name\":\"共和县\"},{\"code\":\"632522\",\"name\":\"同德县\"},{\"code\":\"632523\",\"name\":\"贵德县\"},{\"code\":\"632524\",\"name\":\"兴海县\"},{\"code\":\"632525\",\"name\":\"贵南县\"}]},{\"code\":\"6326\",\"name\":\"果洛藏族自治州\",\"childs\":[{\"code\":\"632621\",\"name\":\"玛沁县\"},{\"code\":\"632622\",\"name\":\"班玛县\"},{\"code\":\"632623\",\"name\":\"甘德县\"},{\"code\":\"632624\",\"name\":\"达日县\"},{\"code\":\"632625\",\"name\":\"久治县\"},{\"code\":\"632626\",\"name\":\"玛多县\"}]},{\"code\":\"6327\",\"name\":\"玉树藏族自治州\",\"childs\":[{\"code\":\"632701\",\"name\":\"玉树市\"},{\"code\":\"632722\",\"name\":\"杂多县\"},{\"code\":\"632723\",\"name\":\"称多县\"},{\"code\":\"632724\",\"name\":\"治多县\"},{\"code\":\"632725\",\"name\":\"囊谦县\"},{\"code\":\"632726\",\"name\":\"曲麻莱县\"}]},{\"code\":\"6328\",\"name\":\"海西蒙古族藏族自治州\",\"childs\":[{\"code\":\"632801\",\"name\":\"格尔木市\"},{\"code\":\"632802\",\"name\":\"德令哈市\"},{\"code\":\"632821\",\"name\":\"乌兰县\"},{\"code\":\"632822\",\"name\":\"都兰县\"},{\"code\":\"632823\",\"name\":\"天峻县\"}]}]},{\"code\":\"64\",\"name\":\"宁夏回族自治区\",\"childs\":[{\"code\":\"6401\",\"name\":\"银川市\",\"childs\":[{\"code\":\"640104\",\"name\":\"兴庆区\"},{\"code\":\"640105\",\"name\":\"西夏区\"},{\"code\":\"640106\",\"name\":\"金凤区\"},{\"code\":\"640121\",\"name\":\"永宁县\"},{\"code\":\"640122\",\"name\":\"贺兰县\"},{\"code\":\"640181\",\"name\":\"灵武市\"}]},{\"code\":\"6402\",\"name\":\"石嘴山市\",\"childs\":[{\"code\":\"640202\",\"name\":\"大武口区\"},{\"code\":\"640205\",\"name\":\"惠农区\"},{\"code\":\"640221\",\"name\":\"平罗县\"}]},{\"code\":\"6403\",\"name\":\"吴忠市\",\"childs\":[{\"code\":\"640302\",\"name\":\"利通区\"},{\"code\":\"640303\",\"name\":\"红寺堡区\"},{\"code\":\"640323\",\"name\":\"盐池县\"},{\"code\":\"640324\",\"name\":\"同心县\"},{\"code\":\"640381\",\"name\":\"青铜峡市\"}]},{\"code\":\"6404\",\"name\":\"固原市\",\"childs\":[{\"code\":\"640402\",\"name\":\"原州区\"},{\"code\":\"640422\",\"name\":\"西吉县\"},{\"code\":\"640423\",\"name\":\"隆德县\"},{\"code\":\"640424\",\"name\":\"泾源县\"},{\"code\":\"640425\",\"name\":\"彭阳县\"}]},{\"code\":\"6405\",\"name\":\"中卫市\",\"childs\":[{\"code\":\"640502\",\"name\":\"沙坡头区\"},{\"code\":\"640521\",\"name\":\"中宁县\"},{\"code\":\"640522\",\"name\":\"海原县\"}]}]},{\"code\":\"65\",\"name\":\"新疆维吾尔自治区\",\"childs\":[{\"code\":\"6501\",\"name\":\"乌鲁木齐市\",\"childs\":[{\"code\":\"650102\",\"name\":\"天山区\"},{\"code\":\"650103\",\"name\":\"沙依巴克区\"},{\"code\":\"650104\",\"name\":\"新市区\"},{\"code\":\"650105\",\"name\":\"水磨沟区\"},{\"code\":\"650106\",\"name\":\"头屯河区\"},{\"code\":\"650107\",\"name\":\"达坂城区\"},{\"code\":\"650109\",\"name\":\"米东区\"},{\"code\":\"650121\",\"name\":\"乌鲁木齐县\"}]},{\"code\":\"6502\",\"name\":\"克拉玛依市\",\"childs\":[{\"code\":\"650202\",\"name\":\"独山子区\"},{\"code\":\"650203\",\"name\":\"克拉玛依区\"},{\"code\":\"650204\",\"name\":\"白碱滩区\"},{\"code\":\"650205\",\"name\":\"乌尔禾区\"}]},{\"code\":\"6504\",\"name\":\"吐鲁番市\",\"childs\":[{\"code\":\"650402\",\"name\":\"高昌区\"},{\"code\":\"650421\",\"name\":\"鄯善县\"},{\"code\":\"650422\",\"name\":\"托克逊县\"}]},{\"code\":\"6505\",\"name\":\"哈密市\",\"childs\":[{\"code\":\"650502\",\"name\":\"伊州区\"},{\"code\":\"650521\",\"name\":\"巴里坤哈萨克自治县\"},{\"code\":\"650522\",\"name\":\"伊吾县\"}]},{\"code\":\"6523\",\"name\":\"昌吉回族自治州\",\"childs\":[{\"code\":\"652301\",\"name\":\"昌吉市\"},{\"code\":\"652302\",\"name\":\"阜康市\"},{\"code\":\"652323\",\"name\":\"呼图壁县\"},{\"code\":\"652324\",\"name\":\"玛纳斯县\"},{\"code\":\"652325\",\"name\":\"奇台县\"},{\"code\":\"652327\",\"name\":\"吉木萨尔县\"},{\"code\":\"652328\",\"name\":\"木垒哈萨克自治县\"}]},{\"code\":\"6527\",\"name\":\"博尔塔拉蒙古自治州\",\"childs\":[{\"code\":\"652701\",\"name\":\"博乐市\"},{\"code\":\"652702\",\"name\":\"阿拉山口市\"},{\"code\":\"652722\",\"name\":\"精河县\"},{\"code\":\"652723\",\"name\":\"温泉县\"}]},{\"code\":\"6528\",\"name\":\"巴音郭楞蒙古自治州\",\"childs\":[{\"code\":\"652801\",\"name\":\"库尔勒市\"},{\"code\":\"652822\",\"name\":\"轮台县\"},{\"code\":\"652823\",\"name\":\"尉犁县\"},{\"code\":\"652824\",\"name\":\"若羌县\"},{\"code\":\"652825\",\"name\":\"且末县\"},{\"code\":\"652826\",\"name\":\"焉耆回族自治县\"},{\"code\":\"652827\",\"name\":\"和静县\"},{\"code\":\"652828\",\"name\":\"和硕县\"},{\"code\":\"652829\",\"name\":\"博湖县\"}]},{\"code\":\"6529\",\"name\":\"阿克苏地区\",\"childs\":[{\"code\":\"652901\",\"name\":\"阿克苏市\"},{\"code\":\"652922\",\"name\":\"温宿县\"},{\"code\":\"652923\",\"name\":\"库车县\"},{\"code\":\"652924\",\"name\":\"沙雅县\"},{\"code\":\"652925\",\"name\":\"新和县\"},{\"code\":\"652926\",\"name\":\"拜城县\"},{\"code\":\"652927\",\"name\":\"乌什县\"},{\"code\":\"652928\",\"name\":\"阿瓦提县\"},{\"code\":\"652929\",\"name\":\"柯坪县\"}]},{\"code\":\"6530\",\"name\":\"克孜勒苏柯尔克孜自治州\",\"childs\":[{\"code\":\"653001\",\"name\":\"阿图什市\"},{\"code\":\"653022\",\"name\":\"阿克陶县\"},{\"code\":\"653023\",\"name\":\"阿合奇县\"},{\"code\":\"653024\",\"name\":\"乌恰县\"}]},{\"code\":\"6531\",\"name\":\"喀什地区\",\"childs\":[{\"code\":\"653101\",\"name\":\"喀什市\"},{\"code\":\"653121\",\"name\":\"疏附县\"},{\"code\":\"653122\",\"name\":\"疏勒县\"},{\"code\":\"653123\",\"name\":\"英吉沙县\"},{\"code\":\"653124\",\"name\":\"泽普县\"},{\"code\":\"653125\",\"name\":\"莎车县\"},{\"code\":\"653126\",\"name\":\"叶城县\"},{\"code\":\"653127\",\"name\":\"麦盖提县\"},{\"code\":\"653128\",\"name\":\"岳普湖县\"},{\"code\":\"653129\",\"name\":\"伽师县\"},{\"code\":\"653130\",\"name\":\"巴楚县\"},{\"code\":\"653131\",\"name\":\"塔什库尔干塔吉克自治县\"}]},{\"code\":\"6532\",\"name\":\"和田地区\",\"childs\":[{\"code\":\"653201\",\"name\":\"和田市\"},{\"code\":\"653221\",\"name\":\"和田县\"},{\"code\":\"653222\",\"name\":\"墨玉县\"},{\"code\":\"653223\",\"name\":\"皮山县\"},{\"code\":\"653224\",\"name\":\"洛浦县\"},{\"code\":\"653225\",\"name\":\"策勒县\"},{\"code\":\"653226\",\"name\":\"于田县\"},{\"code\":\"653227\",\"name\":\"民丰县\"}]},{\"code\":\"6540\",\"name\":\"伊犁哈萨克自治州\",\"childs\":[{\"code\":\"654002\",\"name\":\"伊宁市\"},{\"code\":\"654003\",\"name\":\"奎屯市\"},{\"code\":\"654004\",\"name\":\"霍尔果斯市\"},{\"code\":\"654021\",\"name\":\"伊宁县\"},{\"code\":\"654022\",\"name\":\"察布查尔锡伯自治县\"},{\"code\":\"654023\",\"name\":\"霍城县\"},{\"code\":\"654024\",\"name\":\"巩留县\"},{\"code\":\"654025\",\"name\":\"新源县\"},{\"code\":\"654026\",\"name\":\"昭苏县\"},{\"code\":\"654027\",\"name\":\"特克斯县\"},{\"code\":\"654028\",\"name\":\"尼勒克县\"}]},{\"code\":\"6542\",\"name\":\"塔城地区\",\"childs\":[{\"code\":\"654201\",\"name\":\"塔城市\"},{\"code\":\"654202\",\"name\":\"乌苏市\"},{\"code\":\"654221\",\"name\":\"额敏县\"},{\"code\":\"654223\",\"name\":\"沙湾县\"},{\"code\":\"654224\",\"name\":\"托里县\"},{\"code\":\"654225\",\"name\":\"裕民县\"},{\"code\":\"654226\",\"name\":\"和布克赛尔蒙古自治县\"}]},{\"code\":\"6543\",\"name\":\"阿勒泰地区\",\"childs\":[{\"code\":\"654301\",\"name\":\"阿勒泰市\"},{\"code\":\"654321\",\"name\":\"布尔津县\"},{\"code\":\"654322\",\"name\":\"富蕴县\"},{\"code\":\"654323\",\"name\":\"福海县\"},{\"code\":\"654324\",\"name\":\"哈巴河县\"},{\"code\":\"654325\",\"name\":\"青河县\"},{\"code\":\"654326\",\"name\":\"吉木乃县\"}]},{\"code\":\"6590\",\"name\":\"自治区直辖县级行政区划\",\"childs\":[{\"code\":\"659001\",\"name\":\"石河子市\"},{\"code\":\"659002\",\"name\":\"阿拉尔市\"},{\"code\":\"659003\",\"name\":\"图木舒克市\"},{\"code\":\"659004\",\"name\":\"五家渠市\"},{\"code\":\"659006\",\"name\":\"铁门关市\"}]}]},{\"code\":\"71\",\"name\":\"台湾省\",\"childs\":[]},{\"code\":\"81\",\"name\":\"香港特别行政区\",\"childs\":[]},{\"code\":\"82\",\"name\":\"澳门特别行政区\",\"childs\":[]}]");

/***/ }),

/***/ 613:
/*!***************************************************!*\
  !*** D:/项目文件/米悠/components/yz-qr/weapp-qrcode.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//Core code comes from https://github.com/davidshimjs/qrcodejs

var QRCode;

(function () {
  /**
               * Get the type by string length
               * 
               * @private
               * @param {String} sText
               * @param {Number} nCorrectLevel
               * @return {Number} type
               */
  function _getTypeNumber(sText, nCorrectLevel) {
    var nType = 1;
    var length = _getUTF8Length(sText);

    for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
      var nLimit = 0;

      switch (nCorrectLevel) {
        case QRErrorCorrectLevel.L:
          nLimit = QRCodeLimitLength[i][0];
          break;
        case QRErrorCorrectLevel.M:
          nLimit = QRCodeLimitLength[i][1];
          break;
        case QRErrorCorrectLevel.Q:
          nLimit = QRCodeLimitLength[i][2];
          break;
        case QRErrorCorrectLevel.H:
          nLimit = QRCodeLimitLength[i][3];
          break;}


      if (length <= nLimit) {
        break;
      } else {
        nType++;
      }
    }

    if (nType > QRCodeLimitLength.length) {
      throw new Error("Too long data");
    }

    return nType;
  }

  function _getUTF8Length(sText) {
    var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
    return replacedText.length + (replacedText.length != sText ? 3 : 0);
  }

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
    this.parsedData = [];

    // Added to support UTF-8 Characters
    for (var i = 0, l = this.data.length; i < l; i++) {
      var byteArray = [];
      var code = this.data.charCodeAt(i);

      if (code > 0x10000) {
        byteArray[0] = 0xF0 | (code & 0x1C0000) >>> 18;
        byteArray[1] = 0x80 | (code & 0x3F000) >>> 12;
        byteArray[2] = 0x80 | (code & 0xFC0) >>> 6;
        byteArray[3] = 0x80 | code & 0x3F;
      } else if (code > 0x800) {
        byteArray[0] = 0xE0 | (code & 0xF000) >>> 12;
        byteArray[1] = 0x80 | (code & 0xFC0) >>> 6;
        byteArray[2] = 0x80 | code & 0x3F;
      } else if (code > 0x80) {
        byteArray[0] = 0xC0 | (code & 0x7C0) >>> 6;
        byteArray[1] = 0x80 | code & 0x3F;
      } else {
        byteArray[0] = code;
      }

      this.parsedData.push(byteArray);
    }

    this.parsedData = Array.prototype.concat.apply([], this.parsedData);

    if (this.parsedData.length != this.data.length) {
      this.parsedData.unshift(191);
      this.parsedData.unshift(187);
      this.parsedData.unshift(239);
    }
  }

  QR8bitByte.prototype = {
    getLength: function getLength(buffer) {
      return this.parsedData.length;
    },
    write: function write(buffer) {
      for (var i = 0, l = this.parsedData.length; i < l; i++) {
        buffer.put(this.parsedData[i], 8);
      }
    } };



  // QRCodeModel
  function QRCodeModel(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
  }
  QRCodeModel.prototype = {
    addData: function addData(data) {
      var newData = new QR8bitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    },
    isDark: function isDark(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    },
    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },
    make: function make() {
      this.makeImpl(false, this.getBestMaskPattern());
    },
    makeImpl: function makeImpl(test, maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null;
        }
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }
      if (this.dataCache == null) {
        this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.
        dataList);
      }
      this.mapData(this.dataCache, maskPattern);
    },
    setupPositionProbePattern: function setupPositionProbePattern(row, col) {
      for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (var c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r ==
          6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },
    getBestMaskPattern: function getBestMaskPattern() {
      var minLostPoint = 0;
      var pattern = 0;
      for (var i = 0; i < 8; i++) {
        this.makeImpl(true, i);
        var lostPoint = QRUtil.getLostPoint(this);
        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }
      return pattern;
    },
    createMovieClip: function createMovieClip(target_mc, instance_name, depth) {
      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;
      this.make();
      for (var row = 0; row < this.modules.length; row++) {
        var y = row * cs;
        for (var col = 0; col < this.modules[row].length; col++) {
          var x = col * cs;
          var dark = this.modules[row][col];
          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }
      return qr_mc;
    },
    setupTimingPattern: function setupTimingPattern() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }
      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    },
    setupPositionAdjustPattern: function setupPositionAdjustPattern() {
      var pos = QRUtil.getPatternPosition(this.typeNumber);
      for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i];
          var col = pos[j];
          if (this.modules[row][col] != null) {
            continue;
          }
          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },
    setupTypeNumber: function setupTypeNumber(test) {
      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      }
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },
    setupTypeInfo: function setupTypeInfo(test, maskPattern) {
      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
      }
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }
      this.modules[this.moduleCount - 8][8] = !test;
    },
    mapData: function mapData(data, maskPattern) {
      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;
        while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }
              var mask = QRUtil.getMask(maskPattern, row, col - c);
              if (mask) {
                dark = !dark;
              }
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    } };

  QRCodeModel.PAD0 = 0xEC;
  QRCodeModel.PAD1 = 0x11;
  QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
    var buffer = new QRBitBuffer();
    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" +
      buffer.getLengthInBits() +
      ">" +
      totalDataCount * 8 +
      ")");
    }
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }
    while (true) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeModel.PAD0, 8);
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeModel.PAD1, 8);
    }
    return QRCodeModel.createBytes(buffer, rsBlocks);
  };
  QRCodeModel.createBytes = function (buffer, rsBlocks) {
    var offset = 0;
    var maxDcCount = 0;
    var maxEcCount = 0;
    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);
    for (var r = 0; r < rsBlocks.length; r++) {
      var dcCount = rsBlocks[r].dataCount;
      var ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;
      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }
    }
    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }
    var data = new Array(totalCodeCount);
    var index = 0;
    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }
    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }
    return data;
  };
  var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3 };

  var QRErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2 };

  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };

  var QRUtil = {
    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],

    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },
    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },
    getBCHDigit: function getBCHDigit(data) {
      var digit = 0;
      while (data != 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    },
    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },
    getMask: function getMask(maskPattern, i, j) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },
    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    },
    getLengthInBits: function getLengthInBits(mode, type) {
      if (1 <= type && type < 10) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + mode);}

      } else if (type < 27) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);}

      } else if (type < 41) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + mode);}

      } else {
        throw new Error("type:" + type);
      }
    },
    getLostPoint: function getLostPoint(qrCode) {
      var moduleCount = qrCode.getModuleCount();
      var lostPoint = 0;
      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount; col++) {
          var sameCount = 0;
          var dark = qrCode.isDark(row, col);
          for (var r = -1; r <= 1; r++) {
            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }
            for (var c = -1; c <= 1; c++) {
              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }
              if (r == 0 && c == 0) {
                continue;
              }
              if (dark == qrCode.isDark(row + r, col + c)) {
                sameCount++;
              }
            }
          }
          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }
      for (var row = 0; row < moduleCount - 1; row++) {
        for (var col = 0; col < moduleCount - 1; col++) {
          var count = 0;
          if (qrCode.isDark(row, col)) count++;
          if (qrCode.isDark(row + 1, col)) count++;
          if (qrCode.isDark(row, col + 1)) count++;
          if (qrCode.isDark(row + 1, col + 1)) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }
      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount - 6; col++) {
          if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col +
          2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.
          isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }
      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount - 6; row++) {
          if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2,
          col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.
          isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }
      var darkCount = 0;
      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount; row++) {
          if (qrCode.isDark(row, col)) {
            darkCount++;
          }
        }
      }
      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    } };

  var QRMath = {
    glog: function glog(n) {
      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }
      return QRMath.LOG_TABLE[n];
    },
    gexp: function gexp(n) {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return QRMath.EXP_TABLE[n];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256) };

  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.
    EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }

  function QRPolynomial(num, shift) {
    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }
    var offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }
  QRPolynomial.prototype = {
    get: function get(index) {
      return this.num[index];
    },
    getLength: function getLength() {
      return this.num.length;
    },
    multiply: function multiply(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);
      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    },
    mod: function mod(e) {
      if (this.getLength() - e.getLength() < 0) {
        return this;
      }
      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
      var num = new Array(this.getLength());
      for (var i = 0; i < this.getLength(); i++) {
        num[i] = this.get(i);
      }
      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }
      return new QRPolynomial(num, 0).mod(e);
    } };


  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }
  QRRSBlock.RS_BLOCK_TABLE = [
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];

  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" +
      errorCorrectLevel);
    }
    var length = rsBlock.length / 3;
    var list = [];
    for (var i = 0; i < length; i++) {
      var count = rsBlock[i * 3 + 0];
      var totalCount = rsBlock[i * 3 + 1];
      var dataCount = rsBlock[i * 3 + 2];
      for (var j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount));
      }
    }
    return list;
  };
  QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return undefined;}

  };

  function QRBitBuffer() {
    this.buffer = [];
    this.length = 0;
  }
  QRBitBuffer.prototype = {
    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    },
    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit((num >>> length - i - 1 & 1) == 1);
      }
    },
    getLengthInBits: function getLengthInBits() {
      return this.length;
    },
    putBit: function putBit(bit) {
      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }
      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }
      this.length++;
    } };

  var QRCodeLimitLength = [
  [17, 14, 11, 7],
  [32, 26, 20, 14],
  [53, 42, 32, 24],
  [78, 62, 46, 34],
  [106, 84, 60, 44],
  [134, 106, 74, 58],
  [154, 122, 86, 64],
  [192, 152, 108, 84],
  [230, 180, 130, 98],
  [271, 213, 151, 119],
  [321, 251, 177, 137],
  [367, 287, 203, 155],
  [425, 331, 241, 177],
  [458, 362, 258, 194],
  [520, 412, 292, 220],
  [586, 450, 322, 250],
  [644, 504, 364, 280],
  [718, 560, 394, 310],
  [792, 624, 442, 338],
  [858, 666, 482, 382],
  [929, 711, 509, 403],
  [1003, 779, 565, 439],
  [1091, 857, 611, 461],
  [1171, 911, 661, 511],
  [1273, 997, 715, 535],
  [1367, 1059, 751, 593],
  [1465, 1125, 805, 625],
  [1528, 1190, 868, 658],
  [1628, 1264, 908, 698],
  [1732, 1370, 982, 742],
  [1840, 1452, 1030, 790],
  [1952, 1538, 1112, 842],
  [2068, 1628, 1168, 898],
  [2188, 1722, 1228, 958],
  [2303, 1809, 1283, 983],
  [2431, 1911, 1351, 1051],
  [2563, 1989, 1423, 1093],
  [2699, 2099, 1499, 1139],
  [2809, 2213, 1579, 1219],
  [2953, 2331, 1663, 1273]];


  // QRCode object
  QRCode = function QRCode(canvasId, vOption) {
    this._htOption = {
      width: 256,
      height: 256,
      typeNumber: 4,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRErrorCorrectLevel.H };


    if (typeof vOption === 'string') {
      vOption = {
        text: vOption };

    }

    // Overwrites options
    if (vOption) {
      for (var i in vOption) {
        this._htOption[i] = vOption[i];
      }
    }

    this._oQRCode = null;
    this.canvasId = canvasId;

    if (this._htOption.text && this.canvasId) {
      this.makeCode(this._htOption.text);
    }
  };

  QRCode.prototype.makeCode = function (sText) {
    this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.
    correctLevel);
    this._oQRCode.addData(sText);
    this._oQRCode.make();
    this.makeImage();
  };

  QRCode.prototype.makeImage = function () {
    var _oContext;
    if (this._htOption.usingIn) {
      _oContext = wx.createCanvasContext(this.canvasId, this._htOption.usingIn);
    } else {
      _oContext = wx.createCanvasContext(this.canvasId);
    }
    var _htOption = this._htOption;
    var oQRCode = this._oQRCode;

    var nCount = oQRCode.getModuleCount();
    var nWidth = _htOption.width / nCount;
    var nHeight = _htOption.height / nCount;
    var nRoundedWidth = Math.round(nWidth);
    var nRoundedHeight = Math.round(nHeight);

    if (_htOption.image && _htOption.image != '') {
      _oContext.drawImage(_htOption.image, 0, 0, _htOption.width, _htOption.height);
    }

    for (var row = 0; row < nCount; row++) {
      for (var col = 0; col < nCount; col++) {
        var bIsDark = oQRCode.isDark(row, col);
        var nLeft = col * nWidth;
        var nTop = row * nHeight;
        _oContext.setStrokeStyle(bIsDark ? _htOption.colorDark : _htOption.colorLight);
        // _oContext.setStrokeStyle('yellow')
        _oContext.setLineWidth(1);
        _oContext.setFillStyle(bIsDark ? _htOption.colorDark : _htOption.colorLight);
        // _oContext.setFillStyle('red')
        // if (bIsDark) {
        _oContext.fillRect(nLeft, nTop, nWidth, nHeight);
        // }

        // 안티 앨리어싱 방지 처리
        // if (bIsDark) {
        _oContext.strokeRect(
        Math.floor(nLeft) + 0.5,
        Math.floor(nTop) + 0.5,
        nRoundedWidth,
        nRoundedHeight);


        _oContext.strokeRect(
        Math.ceil(nLeft) - 0.5,
        Math.ceil(nTop) - 0.5,
        nRoundedWidth,
        nRoundedHeight);

        // }
        // _oContext.fillRect(
        //     Math.floor(nLeft) + 0.5,
        //     Math.floor(nTop) + 0.5,
        //     nRoundedWidth,
        //     nRoundedHeight
        // );
        // _oContext.fillRect(
        //     Math.ceil(nLeft) - 0.5,
        //     Math.ceil(nTop) - 0.5,
        //     nRoundedWidth,
        //     nRoundedHeight
        // );
        // _oContext.clearRect(
        //     Math.floor(nLeft) + 0.5,
        //     Math.floor(nTop) + 0.5,
        //     nRoundedWidth,
        //     nRoundedHeight
        // );
        // _oContext.clearRect(
        //     Math.ceil(nLeft) - 0.5,
        //     Math.ceil(nTop) - 0.5,
        //     nRoundedWidth,
        //     nRoundedHeight
        // );
      }
    }

    _oContext.draw();
  };

  // 保存为图片，将临时路径传给回调
  QRCode.prototype.exportImage = function (callback) {
    if (!callback) {
      return;
    }
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this._htOption.width,
      height: this._htOption.height,
      destWidth: this._htOption.width,
      destHeight: this._htOption.height,
      canvasId: this.canvasId,
      success: function success(res) {
        console.log(res.tempFilePath);
        callback(res.tempFilePath);
      } });

  };

  QRCode.CorrectLevel = QRErrorCorrectLevel;
})();

module.exports = QRCode;

/***/ }),

/***/ 628:
/*!***************************************!*\
  !*** D:/项目文件/米悠/static/images/zm.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 629:
/*!***************************************!*\
  !*** D:/项目文件/米悠/static/images/fm.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map