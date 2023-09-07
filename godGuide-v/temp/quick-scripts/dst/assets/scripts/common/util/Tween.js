
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/Tween.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c1812TWgDxL9rRQRBc+TfTK', 'Tween');
// scripts/common/util/Tween.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCALE_TWEEN = exports.TWEEN = exports.VERSION = exports.Tween = exports.Sequence = exports.Interpolation = exports.Group = exports.Easing = void 0;
var Timer_1 = require("../cmpt/base/Timer");
/**
 * The Ease class provides a collection of easing functions for use with tween.js.
 */
exports.Easing = {
    Linear: {
        None: function (amount) {
            return amount;
        },
    },
    Quadratic: {
        In: function (amount) {
            return amount * amount;
        },
        Out: function (amount) {
            return amount * (2 - amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount;
            }
            return -0.5 * (--amount * (amount - 2) - 1);
        },
    },
    Cubic: {
        In: function (amount) {
            return amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount + 2);
        },
    },
    Quartic: {
        In: function (amount) {
            return amount * amount * amount * amount;
        },
        Out: function (amount) {
            return 1 - --amount * amount * amount * amount;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount;
            }
            return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
        },
    },
    Quintic: {
        In: function (amount) {
            return amount * amount * amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
        },
    },
    Sinusoidal: {
        In: function (amount) {
            return 1 - Math.cos((amount * Math.PI) / 2);
        },
        Out: function (amount) {
            return Math.sin((amount * Math.PI) / 2);
        },
        InOut: function (amount) {
            return 0.5 * (1 - Math.cos(Math.PI * amount));
        },
    },
    Exponential: {
        In: function (amount) {
            return amount === 0 ? 0 : Math.pow(1024, amount - 1);
        },
        Out: function (amount) {
            return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            if ((amount *= 2) < 1) {
                return 0.5 * Math.pow(1024, amount - 1);
            }
            return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
        },
    },
    Circular: {
        In: function (amount) {
            return 1 - Math.sqrt(1 - amount * amount);
        },
        Out: function (amount) {
            return Math.sqrt(1 - --amount * amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
        },
    },
    Elastic: {
        In: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        },
        Out: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            amount *= 2;
            if (amount < 1) {
                return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            }
            return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
        },
    },
    Back: {
        In: function (amount) {
            var s = 1.70158;
            return amount * amount * ((s + 1) * amount - s);
        },
        Out: function (amount) {
            var s = 1.70158;
            return --amount * amount * ((s + 1) * amount + s) + 1;
        },
        InOut: function (amount) {
            var s = 1.70158 * 1.525;
            if ((amount *= 2) < 1) {
                return 0.5 * (amount * amount * ((s + 1) * amount - s));
            }
            return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
        },
    },
    Bounce: {
        In: function (amount) {
            return 1 - exports.Easing.Bounce.Out(1 - amount);
        },
        Out: function (amount) {
            if (amount < 1 / 2.75) {
                return 7.5625 * amount * amount;
            }
            else if (amount < 2 / 2.75) {
                return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
            }
            else if (amount < 2.5 / 2.75) {
                return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
            }
            else {
                return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
            }
        },
        InOut: function (amount) {
            if (amount < 0.5) {
                return exports.Easing.Bounce.In(amount * 2) * 0.5;
            }
            return exports.Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
        },
    },
};
var now;
// Include a performance.now polyfill.
// In node.js, use process.hrtime.
// eslint-disable-next-line
// @ts-ignore
// if (typeof self === "undefined" && typeof process !== "undefined" && process.hrtime) {
//     now = function () {
//         // eslint-disable-next-line
//         // @ts-ignore
//         var time = process.hrtime();
//         // Convert [seconds, nanoseconds] to milliseconds.
//         return time[0] * 1000 + time[1] / 1000000;
//     };
// }
// // In a browser, use self.performance.now if it is available.
// else 
if (typeof self !== "undefined" && self.performance !== undefined && self.performance.now !== undefined) {
    // This must be bound, because directly assigning this function
    // leads to an invocation exception in Chrome.
    now = self.performance.now.bind(self.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
    now = Date.now;
}
// Otherwise, use "new Date().getTime()".
else {
    now = function () {
        return new Date().getTime();
    };
}
var now$1 = now;
/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tween
 */
var Group = /** @class */ (function () {
    function Group() {
        this._tweens = {};
        this._tweensAddedDuringUpdate = {};
    }
    Group.prototype.getAll = function () {
        var _this = this;
        return Object.keys(this._tweens).map(function (tweenId) {
            return _this._tweens[tweenId];
        });
    };
    Group.prototype.removeAll = function () {
        this._tweens = {};
    };
    Group.prototype.add = function (tween) {
        this._tweens[tween.getId()] = tween;
        this._tweensAddedDuringUpdate[tween.getId()] = tween;
    };
    Group.prototype.remove = function (tween) {
        delete this._tweens[tween.getId()];
        delete this._tweensAddedDuringUpdate[tween.getId()];
    };
    Group.prototype.removeByCCObject = function (target) {
        var tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0) {
            return;
        }
        for (var i = 0; i < tweenIds.length; i++) {
            var tween = this._tweens[tweenIds[i]];
            if (tween && tween.ccObject === target) {
                tween.stop();
            }
        }
    };
    Group.prototype.update = function (time, preserve) {
        if (time === void 0) {
            time = now$1();
        }
        if (preserve === void 0) {
            preserve = false;
        }
        var tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0) {
            return false;
        }
        // 检测tween绑定的cc.Object是否已经销毁，对应的tween也需销毁
        for (var i = 0; i < tweenIds.length; i++) {
            var tween = this._tweens[tweenIds[i]];
            if (tween && !tween.isCCObjectValid()) {
                tween.stop();
            }
        }
        tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0) {
            return false;
        }
        // Tweens are updated in "batches". If you add a new tween during an
        // update, then the new tween will be updated in the next batch.
        // If you remove a tween during an update, it may or may not be updated.
        // However, if the removed tween was added during the current batch,
        // then it will not be updated.
        while (tweenIds.length > 0) {
            this._tweensAddedDuringUpdate = {};
            for (var i = 0; i < tweenIds.length; i++) {
                var tween = this._tweens[tweenIds[i]];
                var autoStart = !preserve;
                if (tween && tween.update(time, autoStart) === false && !preserve) {
                    delete this._tweens[tweenIds[i]];
                }
            }
            tweenIds = Object.keys(this._tweensAddedDuringUpdate);
        }
        return true;
    };
    return Group;
}());
exports.Group = Group;
/**
 * Tween.to中参数使用数组时应用
 */
exports.Interpolation = {
    Linear: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = exports.Interpolation.Utils.Linear;
        if (k < 0) {
            return fn(v[0], v[1], f);
        }
        if (k > 1) {
            return fn(v[m], v[m - 1], m - f);
        }
        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function (v, k) {
        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = exports.Interpolation.Utils.Bernstein;
        for (var i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }
        return b;
    },
    CatmullRom: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = exports.Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor((f = m * (1 + k)));
            }
            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        }
        else {
            if (k < 0) {
                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
            }
            if (k > 1) {
                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }
            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    },
    Utils: {
        Linear: function (p0, p1, t) {
            return (p1 - p0) * t + p0;
        },
        Bernstein: function (n, i) {
            var fc = exports.Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: (function () {
            var a = [1];
            return function (n) {
                var s = 1;
                if (a[n]) {
                    return a[n];
                }
                for (var i = n; i > 1; i--) {
                    s *= i;
                }
                a[n] = s;
                return s;
            };
        })(),
        CatmullRom: function (p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        },
    },
};
/**
 * Utils
 */
var Sequence = /** @class */ (function () {
    function Sequence() {
    }
    Sequence.nextId = function () {
        return Sequence._nextId++;
    };
    Sequence._nextId = 0;
    return Sequence;
}());
exports.Sequence = Sequence;
var mainGroup = new Group();
/** 基于Timer.timeScale缩放速度 */
var scaleGroup = new Group();
/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you"re awesome!
 */
var Tween = /** @class */ (function () {
    function Tween(_object, _group) {
        if (_group === void 0) {
            _group = mainGroup;
        }
        this._object = _object;
        this._group = _group;
        this._isPaused = false;
        this._pauseStart = 0;
        this._valuesStart = {};
        this._valuesEnd = {};
        this._valuesStartRepeat = {};
        this._duration = 1000;
        this._initialRepeat = 0;
        this._repeat = 0;
        this._yoyo = false;
        this._isPlaying = false;
        this._reversed = false;
        this._delayTime = 0;
        this._startTime = 0;
        this._easingFunction = exports.Easing.Linear.None;
        this._interpolationFunction = exports.Interpolation.Linear;
        this._chainedTweens = [];
        this._onStartCallbackFired = false;
        this._id = Sequence.nextId();
        this._isChainStopped = false;
        this._goToEnd = false;
    }
    Object.defineProperty(Tween.prototype, "ccObject", {
        get: function () { return this._ccObject; },
        enumerable: false,
        configurable: true
    });
    /**
     * 绑定cc.Object，则cc.Object销毁时，tween也会销毁
     */
    Tween.prototype.bindCCObject = function (obj) {
        this._ccObject = obj;
        return this;
    };
    /**
     * - 返回tween绑定的cc.Object是否可用
     * - 如果绑定了cc.Object，则检测tween绑定的cc.Object是否已经销毁，对应的tween也需销毁
     * - 如果没绑定则返回true
     */
    Tween.prototype.isCCObjectValid = function () {
        if (this._object instanceof cc.Object && !cc.isValid(this._object, true)) {
            return false;
        }
        if (this._ccObject instanceof cc.Object && !cc.isValid(this._ccObject, true)) {
            return false;
        }
        return true;
    };
    Tween.prototype.getId = function () {
        return this._id;
    };
    Tween.prototype.isPlaying = function () {
        return this._isPlaying;
    };
    Tween.prototype.isPaused = function () {
        return this._isPaused;
    };
    /**
     * @param properties
     * @param duration ms
     */
    Tween.prototype.to = function (properties, duration) {
        // TODO? restore this, then update the 07_dynamic_to example to set fox
        // tween"s to on each update. That way the behavior is opt-in (there"s
        // currently no opt-out).
        // for (const prop in properties) this._valuesEnd[prop] = properties[prop]
        this._valuesEnd = Object.create(properties);
        if (duration !== undefined) {
            this._duration = duration;
        }
        return this;
    };
    Tween.prototype.duration = function (d) {
        this._duration = d;
        return this;
    };
    /**
     * @param time ms
     */
    Tween.prototype.start = function (time) {
        if (this._isPlaying) {
            return this;
        }
        // 对不同分组应用不同的默认参数
        if (time === void 0) {
            if (this._group === mainGroup) {
                time = Timer_1.default.gameMs;
            }
            else if (this._group === scaleGroup) {
                time = Timer_1.default.scaleGameMs;
            }
        }
        // eslint-disable-next-line
        this._group && this._group.add(this);
        this._repeat = this._initialRepeat;
        if (this._reversed) {
            // If we were reversed (f.e. using the yoyo feature) then we need to
            // flip the tween direction back to forward.
            this._reversed = false;
            for (var property in this._valuesStartRepeat) {
                this._swapEndStartRepeatValues(property);
                this._valuesStart[property] = this._valuesStartRepeat[property];
            }
        }
        this._isPlaying = true;
        this._isPaused = false;
        this._onStartCallbackFired = false;
        this._isChainStopped = false;
        this._startTime = time !== undefined ? (typeof time === "string" ? now$1() + parseFloat(time) : time) : now$1();
        this._startTime += this._delayTime;
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
        return this;
    };
    Tween.prototype._setupProperties = function (_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
        for (var property in _valuesEnd) {
            var startValue = _object[property];
            var startValueIsArray = Array.isArray(startValue);
            var propType = startValueIsArray ? "array" : typeof startValue;
            var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
            // If `to()` specifies a property that doesn"t exist in the source object,
            // we should not set that property in the object
            if (propType === "undefined" || propType === "function") {
                continue;
            }
            // Check if an Array was provided as property value
            if (isInterpolationList) {
                var endValues = _valuesEnd[property];
                if (endValues.length === 0) {
                    continue;
                }
                // handle an array of relative values
                endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
                // Create a local copy of the Array with the start value at the front
                _valuesEnd[property] = [startValue].concat(endValues);
            }
            // handle the deepness of the values
            if ((propType === "object" || startValueIsArray) && startValue && !isInterpolationList) {
                _valuesStart[property] = startValueIsArray ? [] : {};
                // eslint-disable-next-line
                for (var prop in startValue) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStart[property][prop] = startValue[prop];
                }
                _valuesStartRepeat[property] = startValueIsArray ? [] : {}; // TODO? repeat nested values? And yoyo? And array values?
                // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
            }
            else {
                // Save the starting value, but only once.
                if (typeof _valuesStart[property] === "undefined") {
                    _valuesStart[property] = startValue;
                }
                if (!startValueIsArray) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStart[property] *= 1.0; // Ensures we"re using numbers, not strings
                }
                if (isInterpolationList) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
                }
                else {
                    _valuesStartRepeat[property] = _valuesStart[property] || 0;
                }
            }
        }
    };
    Tween.prototype.stop = function () {
        if (!this._isChainStopped) {
            this._isChainStopped = true;
            this.stopChainedTweens();
        }
        if (!this._isPlaying) {
            return this;
        }
        // eslint-disable-next-line
        this._group && this._group.remove(this);
        this._isPlaying = false;
        this._isPaused = false;
        if (this._onStopCallback) {
            this._onStopCallback(this._object);
        }
        return this;
    };
    Tween.prototype.end = function () {
        this._goToEnd = true;
        this.update(Infinity);
        return this;
    };
    Tween.prototype.pause = function (time) {
        if (time === void 0) {
            time = now$1();
        }
        if (this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = true;
        this._pauseStart = time;
        // eslint-disable-next-line
        this._group && this._group.remove(this);
        return this;
    };
    Tween.prototype.resume = function (time) {
        if (time === void 0) {
            time = now$1();
        }
        if (!this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = false;
        this._startTime += time - this._pauseStart;
        this._pauseStart = 0;
        // eslint-disable-next-line
        this._group && this._group.add(this);
        return this;
    };
    Tween.prototype.stopChainedTweens = function () {
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
            this._chainedTweens[i].stop();
        }
        return this;
    };
    Tween.prototype.group = function (group) {
        this._group = group;
        return this;
    };
    Tween.prototype.delay = function (amount) {
        this._delayTime = amount;
        return this;
    };
    /**
     * tween结束之后额外的重复次数
     */
    Tween.prototype.repeat = function (times) {
        this._initialRepeat = times;
        this._repeat = times;
        return this;
    };
    Tween.prototype.repeatDelay = function (amount) {
        this._repeatDelayTime = amount;
        return this;
    };
    Tween.prototype.yoyo = function (yoyo) {
        this._yoyo = yoyo;
        return this;
    };
    Tween.prototype.easing = function (easingFunction) {
        this._easingFunction = easingFunction;
        return this;
    };
    Tween.prototype.interpolation = function (interpolationFunction) {
        this._interpolationFunction = interpolationFunction;
        return this;
    };
    Tween.prototype.chain = function () {
        var tweens = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            tweens[_a] = arguments[_a];
        }
        //@ts-ignore
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tweens[_i] = arguments[_i];
        }
        this._chainedTweens = tweens;
        return this;
    };
    Tween.prototype.onStart = function (callback) {
        this._onStartCallback = callback;
        return this;
    };
    Tween.prototype.onUpdate = function (callback) {
        this._onUpdateCallback = callback;
        return this;
    };
    Tween.prototype.onRepeat = function (callback) {
        this._onRepeatCallback = callback;
        return this;
    };
    Tween.prototype.onComplete = function (callback) {
        this._onCompleteCallback = callback;
        return this;
    };
    Tween.prototype.onStop = function (callback) {
        this._onStopCallback = callback;
        return this;
    };
    /**
     * @returns true if the tween is still playing after the update, false
     * otherwise (calling update on a paused tween still returns true because
     * it is still playing, just paused).
     */
    Tween.prototype.update = function (time, autoStart) {
        if (time === void 0) {
            time = now$1();
        }
        if (autoStart === void 0) {
            autoStart = true;
        }
        if (this._isPaused)
            return true;
        var property;
        var elapsed;
        var endTime = this._startTime + this._duration;
        if (!this._goToEnd && !this._isPlaying) {
            if (time > endTime)
                return false;
            if (autoStart)
                this.start(time);
        }
        this._goToEnd = false;
        if (time < this._startTime) {
            return true;
        }
        if (this._onStartCallbackFired === false) {
            if (this._onStartCallback) {
                this._onStartCallback(this._object);
            }
            this._onStartCallbackFired = true;
        }
        elapsed = (time - this._startTime) / this._duration;
        elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
        var value = this._easingFunction(elapsed);
        // properties transformations
        this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
        if (this._onUpdateCallback) {
            this._onUpdateCallback(this._object, elapsed);
        }
        if (elapsed === 1) {
            if (this._repeat > 0) {
                if (isFinite(this._repeat)) {
                    this._repeat--;
                }
                // Reassign starting values, restart by making startTime = now
                for (property in this._valuesStartRepeat) {
                    if (!this._yoyo && typeof this._valuesEnd[property] === "string") {
                        this._valuesStartRepeat[property] =
                            // eslint-disable-next-line
                            // @ts-ignore FIXME?
                            this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                    }
                    if (this._yoyo) {
                        this._swapEndStartRepeatValues(property);
                    }
                    this._valuesStart[property] = this._valuesStartRepeat[property];
                }
                if (this._yoyo) {
                    this._reversed = !this._reversed;
                }
                if (this._repeatDelayTime !== undefined) {
                    this._startTime = time + this._repeatDelayTime;
                }
                else {
                    this._startTime = time + this._delayTime;
                }
                if (this._onRepeatCallback) {
                    this._onRepeatCallback(this._object);
                }
                return true;
            }
            else {
                if (this._onCompleteCallback) {
                    this._onCompleteCallback(this._object);
                }
                for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                    // Make the chained tweens start exactly at the time they should,
                    // even if the `update()` method was called way past the duration of the tween
                    this._chainedTweens[i].start(this._startTime + this._duration);
                }
                this._isPlaying = false;
                return false;
            }
        }
        return true;
    };
    Tween.prototype._updateProperties = function (_object, _valuesStart, _valuesEnd, value) {
        for (var property in _valuesEnd) {
            // Don"t update properties that do not exist in the source object
            if (_valuesStart[property] === undefined) {
                continue;
            }
            var start = _valuesStart[property] || 0;
            var end = _valuesEnd[property];
            var startIsArray = Array.isArray(_object[property]);
            var endIsArray = Array.isArray(end);
            var isInterpolationList = !startIsArray && endIsArray;
            if (isInterpolationList) {
                _object[property] = this._interpolationFunction(end, value);
            }
            else if (typeof end === "object" && end) {
                // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._updateProperties(_object[property], start, end, value);
            }
            else {
                // Parses relative end values with start as base (e.g.: +10, -3)
                end = this._handleRelativeValue(start, end);
                // Protect against non numeric properties.
                if (typeof end === "number") {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _object[property] = start + (end - start) * value;
                }
            }
        }
    };
    Tween.prototype._handleRelativeValue = function (start, end) {
        if (typeof end !== "string") {
            return end;
        }
        if (end.charAt(0) === "+" || end.charAt(0) === "-") {
            return start + parseFloat(end);
        }
        else {
            return parseFloat(end);
        }
    };
    Tween.prototype._swapEndStartRepeatValues = function (property) {
        var tmp = this._valuesStartRepeat[property];
        var endValue = this._valuesEnd[property];
        if (typeof endValue === "string") {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
        }
        else {
            this._valuesStartRepeat[property] = this._valuesEnd[property];
        }
        this._valuesEnd[property] = tmp;
    };
    return Tween;
}());
exports.Tween = Tween;
exports.VERSION = "18.6.4";
var nextId = Sequence.nextId;
/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tweens.
 */
exports.TWEEN = mainGroup;
/**
 * 基于Timer.timeScale缩放速度的group
 */
exports.SCALE_TWEEN = scaleGroup;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxUd2Vlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBdUM7QUFLdkM7O0dBRUc7QUFDUSxRQUFBLE1BQU0sR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVSxNQUFNO1lBQ2xCLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FDSjtJQUNELFNBQVMsRUFBRTtRQUNQLEVBQUUsRUFBRSxVQUFVLE1BQU07WUFDaEIsT0FBTyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzNCLENBQUM7UUFDRCxHQUFHLEVBQUUsVUFBVSxNQUFNO1lBQ2pCLE9BQU8sTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxLQUFLLEVBQUUsVUFBVSxNQUFNO1lBQ25CLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixPQUFPLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FDSjtJQUNELEtBQUssRUFBRTtRQUNILEVBQUUsRUFBRSxVQUFVLE1BQU07WUFDaEIsT0FBTyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNwQyxDQUFDO1FBQ0QsR0FBRyxFQUFFLFVBQVUsTUFBTTtZQUNqQixPQUFPLEVBQUUsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxLQUFLLEVBQUUsVUFBVSxNQUFNO1lBQ25CLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixPQUFP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dEQ7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsR0FBRyxxQkFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNQLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckM7WUFDRCxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5RTthQUNJO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFB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LENBQUMsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFDRCx5Q0FBeUIsR0FBekIsVUFBMEIsUUFBUTtRQUM5QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoRzthQUNJO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakU7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNwQyxDQUFDO0lBQ0wsWUFBQztBQUFELENBdmNBLEFBdWNDLElBQUE7QUF2Y1ksc0JBQUs7QUF5Y1AsUUFBQSxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBRTlCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDN0I7Ozs7O0dBS0c7QUFDUSxRQUFBLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDN0I7O0dBRUc7QUFDUSxRQUFBLFdBQVcsR0FBRyxVQUFVLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGltZXIgZnJvbSBcIi4uL2NtcHQvYmFzZS9UaW1lclwiO1xyXG5cclxuZGVjbGFyZSB0eXBlIEVhc2luZ0Z1bmN0aW9uID0gKGFtb3VudDogbnVtYmVyKSA9PiBudW1iZXI7XHJcbmRlY2xhcmUgdHlwZSBJbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSAodjogbnVtYmVyW10sIGs6IG51bWJlcikgPT4gbnVtYmVyO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFYXNlIGNsYXNzIHByb3ZpZGVzIGEgY29sbGVjdGlvbiBvZiBlYXNpbmcgZnVuY3Rpb25zIGZvciB1c2Ugd2l0aCB0d2Vlbi5qcy5cclxuICovXHJcbmV4cG9ydCB2YXIgRWFzaW5nID0ge1xyXG4gICAgTGluZWFyOiB7XHJcbiAgICAgICAgTm9uZTogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYW1vdW50O1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUXVhZHJhdGljOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFtb3VudCAqIGFtb3VudDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYW1vdW50ICogKDIgLSBhbW91bnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAgICAgaWYgKChhbW91bnQgKj0gMikgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogYW1vdW50ICogYW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAtMC41ICogKC0tYW1vdW50ICogKGFtb3VudCAtIDIpIC0gMSk7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBDdWJpYzoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0tYW1vdW50ICogYW1vdW50ICogYW1vdW50ICsgMTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgICAgIGlmICgoYW1vdW50ICo9IDIpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKChhbW91bnQgLT0gMikgKiBhbW91bnQgKiBhbW91bnQgKyAyKTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIFF1YXJ0aWM6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYW1vdW50ICogYW1vdW50ICogYW1vdW50ICogYW1vdW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxIC0gLS1hbW91bnQgKiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICBpZiAoKGFtb3VudCAqPSAyKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoKGFtb3VudCAtPSAyKSAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudCAtIDIpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUXVpbnRpYzoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0tYW1vdW50ICogYW1vdW50ICogYW1vdW50ICogYW1vdW50ICogYW1vdW50ICsgMTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgICAgIGlmICgoYW1vdW50ICo9IDIpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKChhbW91bnQgLT0gMikgKiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQgKyAyKTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIFNpbnVzb2lkYWw6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMSAtIE1hdGguY29zKChhbW91bnQgKiBNYXRoLlBJKSAvIDIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNpbigoYW1vdW50ICogTWF0aC5QSSkgLyAyKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBhbW91bnQpKTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIEV4cG9uZW50aWFsOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFtb3VudCA9PT0gMCA/IDAgOiBNYXRoLnBvdygxMDI0LCBhbW91bnQgLSAxKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYW1vdW50ID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdygyLCAtMTAgKiBhbW91bnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAgICAgaWYgKGFtb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFtb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKChhbW91bnQgKj0gMikgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogTWF0aC5wb3coMTAyNCwgYW1vdW50IC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogKGFtb3VudCAtIDEpKSArIDIpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgQ2lyY3VsYXI6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMSAtIE1hdGguc3FydCgxIC0gYW1vdW50ICogYW1vdW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KDEgLSAtLWFtb3VudCAqIGFtb3VudCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICBpZiAoKGFtb3VudCAqPSAyKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gYW1vdW50ICogYW1vdW50KSAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoYW1vdW50IC09IDIpICogYW1vdW50KSArIDEpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgRWxhc3RpYzoge1xyXG4gICAgICAgIEluOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgICAgIGlmIChhbW91bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbW91bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAtTWF0aC5wb3coMiwgMTAgKiAoYW1vdW50IC0gMSkpICogTWF0aC5zaW4oKGFtb3VudCAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAgICAgaWYgKGFtb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFtb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucG93KDIsIC0xMCAqIGFtb3VudCkgKiBNYXRoLnNpbigoYW1vdW50IC0gMC4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICBpZiAoYW1vdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYW1vdW50ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbW91bnQgKj0gMjtcclxuICAgICAgICAgICAgaWYgKGFtb3VudCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMC41ICogTWF0aC5wb3coMiwgMTAgKiAoYW1vdW50IC0gMSkpICogTWF0aC5zaW4oKGFtb3VudCAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChhbW91bnQgLSAxKSkgKiBNYXRoLnNpbigoYW1vdW50IC0gMS4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBCYWNrOiB7XHJcbiAgICAgICAgSW46IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG4gICAgICAgICAgICByZXR1cm4gYW1vdW50ICogYW1vdW50ICogKChzICsgMSkgKiBhbW91bnQgLSBzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XHJcbiAgICAgICAgICAgIHJldHVybiAtLWFtb3VudCAqIGFtb3VudCAqICgocyArIDEpICogYW1vdW50ICsgcykgKyAxO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XHJcbiAgICAgICAgICAgIGlmICgoYW1vdW50ICo9IDIpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIChhbW91bnQgKiBhbW91bnQgKiAoKHMgKyAxKSAqIGFtb3VudCAtIHMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKChhbW91bnQgLT0gMikgKiBhbW91bnQgKiAoKHMgKyAxKSAqIGFtb3VudCArIHMpICsgMik7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBCb3VuY2U6IHtcclxuICAgICAgICBJbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMSAtIEVhc2luZy5Cb3VuY2UuT3V0KDEgLSBhbW91bnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgICAgIGlmIChhbW91bnQgPCAxIC8gMi43NSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIGFtb3VudCAqIGFtb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhbW91bnQgPCAyIC8gMi43NSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIChhbW91bnQgLT0gMS41IC8gMi43NSkgKiBhbW91bnQgKyAwLjc1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFtb3VudCA8IDIuNSAvIDIuNzUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiAoYW1vdW50IC09IDIuMjUgLyAyLjc1KSAqIGFtb3VudCArIDAuOTM3NTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiAoYW1vdW50IC09IDIuNjI1IC8gMi43NSkgKiBhbW91bnQgKyAwLjk4NDM3NTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAgICAgaWYgKGFtb3VudCA8IDAuNSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVhc2luZy5Cb3VuY2UuSW4oYW1vdW50ICogMikgKiAwLjU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEVhc2luZy5Cb3VuY2UuT3V0KGFtb3VudCAqIDIgLSAxKSAqIDAuNSArIDAuNTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbnZhciBub3c7XHJcbi8vIEluY2x1ZGUgYSBwZXJmb3JtYW5jZS5ub3cgcG9seWZpbGwuXHJcbi8vIEluIG5vZGUuanMsIHVzZSBwcm9jZXNzLmhydGltZS5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbi8vIEB0cy1pZ25vcmVcclxuLy8gaWYgKHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuaHJ0aW1lKSB7XHJcbi8vICAgICBub3cgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbi8vICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4vLyAgICAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcclxuLy8gICAgICAgICAvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxyXG4vLyAgICAgICAgIHJldHVybiB0aW1lWzBdICogMTAwMCArIHRpbWVbMV0gLyAxMDAwMDAwO1xyXG4vLyAgICAgfTtcclxuLy8gfVxyXG4vLyAvLyBJbiBhIGJyb3dzZXIsIHVzZSBzZWxmLnBlcmZvcm1hbmNlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXHJcbi8vIGVsc2UgXHJcbmlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiYgc2VsZi5wZXJmb3JtYW5jZS5ub3cgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgLy8gVGhpcyBtdXN0IGJlIGJvdW5kLCBiZWNhdXNlIGRpcmVjdGx5IGFzc2lnbmluZyB0aGlzIGZ1bmN0aW9uXHJcbiAgICAvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXHJcbiAgICBub3cgPSBzZWxmLnBlcmZvcm1hbmNlLm5vdy5iaW5kKHNlbGYucGVyZm9ybWFuY2UpO1xyXG59XHJcbi8vIFVzZSBEYXRlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXHJcbmVsc2UgaWYgKERhdGUubm93ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIG5vdyA9IERhdGUubm93O1xyXG59XHJcbi8vIE90aGVyd2lzZSwgdXNlIFwibmV3IERhdGUoKS5nZXRUaW1lKClcIi5cclxuZWxzZSB7XHJcbiAgICBub3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgfTtcclxufVxyXG52YXIgbm93JDEgPSBub3c7XHJcblxyXG5kZWNsYXJlIHR5cGUgVW5rbm93blByb3BzID0gUmVjb3JkPHN0cmluZywgYW55PjtcclxuLyoqXHJcbiAqIENvbnRyb2xsaW5nIGdyb3VwcyBvZiB0d2VlbnNcclxuICpcclxuICogVXNpbmcgdGhlIFRXRUVOIHNpbmdsZXRvbiB0byBtYW5hZ2UgeW91ciB0d2VlbnMgY2FuIGNhdXNlIGlzc3VlcyBpbiBsYXJnZSBhcHBzIHdpdGggbWFueSBjb21wb25lbnRzLlxyXG4gKiBJbiB0aGVzZSBjYXNlcywgeW91IG1heSB3YW50IHRvIGNyZWF0ZSB5b3VyIG93biBzbWFsbGVyIGdyb3VwcyBvZiB0d2VlblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdyb3VwIHtcclxuICAgIHByaXZhdGUgX3R3ZWVucyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcclxuXHJcbiAgICBnZXRBbGwoKTogQXJyYXk8VHdlZW48VW5rbm93blByb3BzPj4ge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucykubWFwKGZ1bmN0aW9uICh0d2VlbklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fdHdlZW5zW3R3ZWVuSWRdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3R3ZWVucyA9IHt9O1xyXG4gICAgfVxyXG4gICAgYWRkKHR3ZWVuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdHdlZW5zW3R3ZWVuLmdldElkKCldID0gdHdlZW47XHJcbiAgICAgICAgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV0gPSB0d2VlbjtcclxuICAgIH1cclxuICAgIHJlbW92ZSh0d2Vlbikge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl90d2VlbnNbdHdlZW4uZ2V0SWQoKV07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlQnlDQ09iamVjdCh0YXJnZXQ6IGNjLk9iamVjdCkge1xyXG4gICAgICAgIGxldCB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucyk7XHJcbiAgICAgICAgaWYgKHR3ZWVuSWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR3ZWVuSWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0d2VlbjogVHdlZW48YW55PiA9IHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XHJcbiAgICAgICAgICAgIGlmICh0d2VlbiAmJiB0d2Vlbi5jY09iamVjdCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGUodGltZT86IG51bWJlciwgcHJlc2VydmU/OiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRpbWUgPT09IHZvaWQgMCkgeyB0aW1lID0gbm93JDEoKTsgfVxyXG4gICAgICAgIGlmIChwcmVzZXJ2ZSA9PT0gdm9pZCAwKSB7IHByZXNlcnZlID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgdHdlZW5JZHMgPSBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpO1xyXG4gICAgICAgIGlmICh0d2Vlbklkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5qOA5rWLdHdlZW7nu5HlrprnmoRjYy5PYmplY3TmmK/lkKblt7Lnu4/plIDmr4HvvIzlr7nlupTnmoR0d2VlbuS5n+mcgOmUgOavgVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHdlZW5JZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHR3ZWVuOiBUd2Vlbjxhbnk+ID0gdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcclxuICAgICAgICAgICAgaWYgKHR3ZWVuICYmICF0d2Vlbi5pc0NDT2JqZWN0VmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdHdlZW4uc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucyk7XHJcbiAgICAgICAgaWYgKHR3ZWVuSWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUd2VlbnMgYXJlIHVwZGF0ZWQgaW4gXCJiYXRjaGVzXCIuIElmIHlvdSBhZGQgYSBuZXcgdHdlZW4gZHVyaW5nIGFuXHJcbiAgICAgICAgLy8gdXBkYXRlLCB0aGVuIHRoZSBuZXcgdHdlZW4gd2lsbCBiZSB1cGRhdGVkIGluIHRoZSBuZXh0IGJhdGNoLlxyXG4gICAgICAgIC8vIElmIHlvdSByZW1vdmUgYSB0d2VlbiBkdXJpbmcgYW4gdXBkYXRlLCBpdCBtYXkgb3IgbWF5IG5vdCBiZSB1cGRhdGVkLlxyXG4gICAgICAgIC8vIEhvd2V2ZXIsIGlmIHRoZSByZW1vdmVkIHR3ZWVuIHdhcyBhZGRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgYmF0Y2gsXHJcbiAgICAgICAgLy8gdGhlbiBpdCB3aWxsIG5vdCBiZSB1cGRhdGVkLlxyXG4gICAgICAgIHdoaWxlICh0d2Vlbklkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHdlZW5JZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB0d2VlbiA9IHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XHJcbiAgICAgICAgICAgICAgICB2YXIgYXV0b1N0YXJ0ID0gIXByZXNlcnZlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR3ZWVuICYmIHR3ZWVuLnVwZGF0ZSh0aW1lLCBhdXRvU3RhcnQpID09PSBmYWxzZSAmJiAhcHJlc2VydmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUd2Vlbi50b+S4reWPguaVsOS9v+eUqOaVsOe7hOaXtuW6lOeUqFxyXG4gKi9cclxuZXhwb3J0IHZhciBJbnRlcnBvbGF0aW9uID0ge1xyXG4gICAgTGluZWFyOiBmdW5jdGlvbiAodiwgaykge1xyXG4gICAgICAgIHZhciBtID0gdi5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBmID0gbSAqIGs7XHJcbiAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG4gICAgICAgIHZhciBmbiA9IEludGVycG9sYXRpb24uVXRpbHMuTGluZWFyO1xyXG4gICAgICAgIGlmIChrIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm4odlswXSwgdlsxXSwgZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChrID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm4odlttXSwgdlttIC0gMV0sIG0gLSBmKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xyXG4gICAgfSxcclxuICAgIEJlemllcjogZnVuY3Rpb24gKHYsIGspIHtcclxuICAgICAgICB2YXIgYiA9IDA7XHJcbiAgICAgICAgdmFyIG4gPSB2Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdmFyIHB3ID0gTWF0aC5wb3c7XHJcbiAgICAgICAgdmFyIGJuID0gSW50ZXJwb2xhdGlvbi5VdGlscy5CZXJuc3RlaW47XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGIgKz0gcHcoMSAtIGssIG4gLSBpKSAqIHB3KGssIGkpICogdltpXSAqIGJuKG4sIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYjtcclxuICAgIH0sXHJcbiAgICBDYXRtdWxsUm9tOiBmdW5jdGlvbiAodiwgaykge1xyXG4gICAgICAgIHZhciBtID0gdi5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBmID0gbSAqIGs7XHJcbiAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGYpO1xyXG4gICAgICAgIHZhciBmbiA9IEludGVycG9sYXRpb24uVXRpbHMuQ2F0bXVsbFJvbTtcclxuICAgICAgICBpZiAodlswXSA9PT0gdlttXSkge1xyXG4gICAgICAgICAgICBpZiAoayA8IDApIHtcclxuICAgICAgICAgICAgICAgIGkgPSBNYXRoLmZsb29yKChmID0gbSAqICgxICsgaykpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZm4odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChrIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGsgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdlttXSAtIChmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmbih2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBVdGlsczoge1xyXG4gICAgICAgIExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHAxIC0gcDApICogdCArIHAwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQmVybnN0ZWluOiBmdW5jdGlvbiAobiwgaSkge1xyXG4gICAgICAgICAgICB2YXIgZmMgPSBJbnRlcnBvbGF0aW9uLlV0aWxzLkZhY3RvcmlhbDtcclxuICAgICAgICAgICAgcmV0dXJuIGZjKG4pIC8gZmMoaSkgLyBmYyhuIC0gaSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhID0gWzFdO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG4pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzID0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChhW25dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFbbl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gbjsgaSA+IDE7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHMgKj0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFbbl0gPSBzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKSxcclxuICAgICAgICBDYXRtdWxsUm9tOiBmdW5jdGlvbiAocDAsIHAxLCBwMiwgcDMsIHQpIHtcclxuICAgICAgICAgICAgdmFyIHYwID0gKHAyIC0gcDApICogMC41O1xyXG4gICAgICAgICAgICB2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XHJcbiAgICAgICAgICAgIHZhciB0MiA9IHQgKiB0O1xyXG4gICAgICAgICAgICB2YXIgdDMgPSB0ICogdDI7XHJcbiAgICAgICAgICAgIHJldHVybiAoMiAqIHAxIC0gMiAqIHAyICsgdjAgKyB2MSkgKiB0MyArICgtMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVdGlsc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9uZXh0SWQgPSAwO1xyXG4gICAgc3RhdGljIG5leHRJZCgpIHtcclxuICAgICAgICByZXR1cm4gU2VxdWVuY2UuX25leHRJZCsrO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgbWFpbkdyb3VwID0gbmV3IEdyb3VwKCk7XHJcbi8qKiDln7rkuo5UaW1lci50aW1lU2NhbGXnvKnmlL7pgJ/luqYgKi9cclxudmFyIHNjYWxlR3JvdXAgPSBuZXcgR3JvdXAoKTtcclxuXHJcbi8qKlxyXG4gKiBUd2Vlbi5qcyAtIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qc1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qcy9ncmFwaHMvY29udHJpYnV0b3JzIGZvciB0aGUgZnVsbCBsaXN0IG9mIGNvbnRyaWJ1dG9ycy5cclxuICogVGhhbmsgeW91IGFsbCwgeW91XCJyZSBhd2Vzb21lIVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFR3ZWVuPFQgZXh0ZW5kcyBVbmtub3duUHJvcHM+IHtcclxuICAgIC8qKiDnu5HlrprnmoRjYy5PYmplY3QgKi9cclxuICAgIHByaXZhdGUgX2NjT2JqZWN0O1xyXG4gICAgcHVibGljIGdldCBjY09iamVjdCgpIHsgcmV0dXJuIHRoaXMuX2NjT2JqZWN0OyB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBfZ3JvdXA7XHJcbiAgICBwcml2YXRlIF9pc1BhdXNlZDtcclxuICAgIHByaXZhdGUgX3BhdXNlU3RhcnQ7XHJcbiAgICBwcml2YXRlIF92YWx1ZXNTdGFydDtcclxuICAgIHByaXZhdGUgX3ZhbHVlc0VuZDtcclxuICAgIHByaXZhdGUgX3ZhbHVlc1N0YXJ0UmVwZWF0O1xyXG4gICAgcHJpdmF0ZSBfZHVyYXRpb247XHJcbiAgICBwcml2YXRlIF9pbml0aWFsUmVwZWF0O1xyXG4gICAgcHJpdmF0ZSBfcmVwZWF0O1xyXG4gICAgcHJpdmF0ZSBfcmVwZWF0RGVsYXlUaW1lPztcclxuICAgIHByaXZhdGUgX3lveW87XHJcbiAgICBwcml2YXRlIF9pc1BsYXlpbmc7XHJcbiAgICBwcml2YXRlIF9yZXZlcnNlZDtcclxuICAgIHByaXZhdGUgX2RlbGF5VGltZTtcclxuICAgIHByaXZhdGUgX3N0YXJ0VGltZTtcclxuICAgIHByaXZhdGUgX2Vhc2luZ0Z1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBfaW50ZXJwb2xhdGlvbkZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBfY2hhaW5lZFR3ZWVucztcclxuICAgIHByaXZhdGUgX29uU3RhcnRDYWxsYmFjaz87XHJcbiAgICBwcml2YXRlIF9vblN0YXJ0Q2FsbGJhY2tGaXJlZDtcclxuICAgIHByaXZhdGUgX29uVXBkYXRlQ2FsbGJhY2s/O1xyXG4gICAgcHJpdmF0ZSBfb25SZXBlYXRDYWxsYmFjaz87XHJcbiAgICBwcml2YXRlIF9vbkNvbXBsZXRlQ2FsbGJhY2s/O1xyXG4gICAgcHJpdmF0ZSBfb25TdG9wQ2FsbGJhY2s/O1xyXG4gICAgcHJpdmF0ZSBfaWQ7XHJcbiAgICBwcml2YXRlIF9pc0NoYWluU3RvcHBlZDtcclxuICAgIHByaXZhdGUgX2dvVG9FbmQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoX29iamVjdDogVCwgX2dyb3VwPzogR3JvdXAgfCBmYWxzZSkge1xyXG4gICAgICAgIGlmIChfZ3JvdXAgPT09IHZvaWQgMCkgeyBfZ3JvdXAgPSBtYWluR3JvdXA7IH1cclxuICAgICAgICB0aGlzLl9vYmplY3QgPSBfb2JqZWN0O1xyXG4gICAgICAgIHRoaXMuX2dyb3VwID0gX2dyb3VwO1xyXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGF1c2VTdGFydCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcclxuICAgICAgICB0aGlzLl92YWx1ZXNFbmQgPSB7fTtcclxuICAgICAgICB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcclxuICAgICAgICB0aGlzLl9pbml0aWFsUmVwZWF0ID0gMDtcclxuICAgICAgICB0aGlzLl9yZXBlYXQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3lveW8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2RlbGF5VGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IEVhc2luZy5MaW5lYXIuTm9uZTtcclxuICAgICAgICB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBJbnRlcnBvbGF0aW9uLkxpbmVhcjtcclxuICAgICAgICB0aGlzLl9jaGFpbmVkVHdlZW5zID0gW107XHJcbiAgICAgICAgdGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pZCA9IFNlcXVlbmNlLm5leHRJZCgpO1xyXG4gICAgICAgIHRoaXMuX2lzQ2hhaW5TdG9wcGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZ29Ub0VuZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uR5a6aY2MuT2JqZWN077yM5YiZY2MuT2JqZWN06ZSA5q+B5pe277yMdHdlZW7kuZ/kvJrplIDmr4FcclxuICAgICAqL1xyXG4gICAgYmluZENDT2JqZWN0KG9iajogY2MuT2JqZWN0KTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5fY2NPYmplY3QgPSBvYmo7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAtIOi/lOWbnnR3ZWVu57uR5a6a55qEY2MuT2JqZWN05piv5ZCm5Y+v55SoXHJcbiAgICAgKiAtIOWmguaenOe7keWumuS6hmNjLk9iamVjdO+8jOWImeajgOa1i3R3ZWVu57uR5a6a55qEY2MuT2JqZWN05piv5ZCm5bey57uP6ZSA5q+B77yM5a+55bqU55qEdHdlZW7kuZ/pnIDplIDmr4FcclxuICAgICAqIC0g5aaC5p6c5rKh57uR5a6a5YiZ6L+U5ZuedHJ1ZVxyXG4gICAgICovXHJcbiAgICBpc0NDT2JqZWN0VmFsaWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29iamVjdCBpbnN0YW5jZW9mIGNjLk9iamVjdCAmJiAhY2MuaXNWYWxpZCh0aGlzLl9vYmplY3QsIHRydWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2NjT2JqZWN0IGluc3RhbmNlb2YgY2MuT2JqZWN0ICYmICFjYy5pc1ZhbGlkKHRoaXMuX2NjT2JqZWN0LCB0cnVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG4gICAgaXNQbGF5aW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XHJcbiAgICB9XHJcbiAgICBpc1BhdXNlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNQYXVzZWQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBwcm9wZXJ0aWVzIFxyXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIG1zXHJcbiAgICAgKi9cclxuICAgIHRvKHByb3BlcnRpZXM6IFVua25vd25Qcm9wcywgZHVyYXRpb24/OiBudW1iZXIpOiB0aGlzIHtcclxuICAgICAgICAvLyBUT0RPPyByZXN0b3JlIHRoaXMsIHRoZW4gdXBkYXRlIHRoZSAwN19keW5hbWljX3RvIGV4YW1wbGUgdG8gc2V0IGZveFxyXG4gICAgICAgIC8vIHR3ZWVuXCJzIHRvIG9uIGVhY2ggdXBkYXRlLiBUaGF0IHdheSB0aGUgYmVoYXZpb3IgaXMgb3B0LWluICh0aGVyZVwic1xyXG4gICAgICAgIC8vIGN1cnJlbnRseSBubyBvcHQtb3V0KS5cclxuICAgICAgICAvLyBmb3IgKGNvbnN0IHByb3AgaW4gcHJvcGVydGllcykgdGhpcy5fdmFsdWVzRW5kW3Byb3BdID0gcHJvcGVydGllc1twcm9wXVxyXG4gICAgICAgIHRoaXMuX3ZhbHVlc0VuZCA9IE9iamVjdC5jcmVhdGUocHJvcGVydGllcyk7XHJcbiAgICAgICAgaWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBkdXJhdGlvbihkOiBudW1iZXIpOiB0aGlzIHtcclxuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IGQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB0aW1lIG1zXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KHRpbWU/OiBudW1iZXIpOiB0aGlzIHtcclxuICAgICAgICBpZiAodGhpcy5faXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5a+55LiN5ZCM5YiG57uE5bqU55So5LiN5ZCM55qE6buY6K6k5Y+C5pWwXHJcbiAgICAgICAgaWYgKHRpbWUgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZ3JvdXAgPT09IG1haW5Hcm91cCkge1xyXG4gICAgICAgICAgICAgICAgdGltZSA9IFRpbWVyLmdhbWVNcztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ncm91cCA9PT0gc2NhbGVHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgdGltZSA9IFRpbWVyLnNjYWxlR2FtZU1zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICB0aGlzLl9ncm91cCAmJiB0aGlzLl9ncm91cC5hZGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fcmVwZWF0ID0gdGhpcy5faW5pdGlhbFJlcGVhdDtcclxuICAgICAgICBpZiAodGhpcy5fcmV2ZXJzZWQpIHtcclxuICAgICAgICAgICAgLy8gSWYgd2Ugd2VyZSByZXZlcnNlZCAoZi5lLiB1c2luZyB0aGUgeW95byBmZWF0dXJlKSB0aGVuIHdlIG5lZWQgdG9cclxuICAgICAgICAgICAgLy8gZmxpcCB0aGUgdHdlZW4gZGlyZWN0aW9uIGJhY2sgdG8gZm9yd2FyZC5cclxuICAgICAgICAgICAgdGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N3YXBFbmRTdGFydFJlcGVhdFZhbHVlcyhwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNDaGFpblN0b3BwZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyAodHlwZW9mIHRpbWUgPT09IFwic3RyaW5nXCIgPyBub3ckMSgpICsgcGFyc2VGbG9hdCh0aW1lKSA6IHRpbWUpIDogbm93JDEoKTtcclxuICAgICAgICB0aGlzLl9zdGFydFRpbWUgKz0gdGhpcy5fZGVsYXlUaW1lO1xyXG4gICAgICAgIHRoaXMuX3NldHVwUHJvcGVydGllcyh0aGlzLl9vYmplY3QsIHRoaXMuX3ZhbHVlc1N0YXJ0LCB0aGlzLl92YWx1ZXNFbmQsIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIF9zZXR1cFByb3BlcnRpZXMoX29iamVjdCwgX3ZhbHVlc1N0YXJ0LCBfdmFsdWVzRW5kLCBfdmFsdWVzU3RhcnRSZXBlYXQpIHtcclxuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBfdmFsdWVzRW5kKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydFZhbHVlID0gX29iamVjdFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgIHZhciBzdGFydFZhbHVlSXNBcnJheSA9IEFycmF5LmlzQXJyYXkoc3RhcnRWYWx1ZSk7XHJcbiAgICAgICAgICAgIHZhciBwcm9wVHlwZSA9IHN0YXJ0VmFsdWVJc0FycmF5ID8gXCJhcnJheVwiIDogdHlwZW9mIHN0YXJ0VmFsdWU7XHJcbiAgICAgICAgICAgIHZhciBpc0ludGVycG9sYXRpb25MaXN0ID0gIXN0YXJ0VmFsdWVJc0FycmF5ICYmIEFycmF5LmlzQXJyYXkoX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xyXG4gICAgICAgICAgICAvLyBJZiBgdG8oKWAgc3BlY2lmaWVzIGEgcHJvcGVydHkgdGhhdCBkb2VzblwidCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcclxuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgIGlmIChwcm9wVHlwZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBwcm9wVHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBhbiBBcnJheSB3YXMgcHJvdmlkZWQgYXMgcHJvcGVydHkgdmFsdWVcclxuICAgICAgICAgICAgaWYgKGlzSW50ZXJwb2xhdGlvbkxpc3QpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbmRWYWx1ZXMgPSBfdmFsdWVzRW5kW3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgIGlmIChlbmRWYWx1ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGUgYW4gYXJyYXkgb2YgcmVsYXRpdmUgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICBlbmRWYWx1ZXMgPSBlbmRWYWx1ZXMubWFwKHRoaXMuX2hhbmRsZVJlbGF0aXZlVmFsdWUuYmluZCh0aGlzLCBzdGFydFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcclxuICAgICAgICAgICAgICAgIF92YWx1ZXNFbmRbcHJvcGVydHldID0gW3N0YXJ0VmFsdWVdLmNvbmNhdChlbmRWYWx1ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGhhbmRsZSB0aGUgZGVlcG5lc3Mgb2YgdGhlIHZhbHVlc1xyXG4gICAgICAgICAgICBpZiAoKHByb3BUeXBlID09PSBcIm9iamVjdFwiIHx8IHN0YXJ0VmFsdWVJc0FycmF5KSAmJiBzdGFydFZhbHVlICYmICFpc0ludGVycG9sYXRpb25MaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBfdmFsdWVzU3RhcnRbcHJvcGVydHldID0gc3RhcnRWYWx1ZUlzQXJyYXkgPyBbXSA6IHt9O1xyXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHN0YXJ0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIEZJWE1FP1xyXG4gICAgICAgICAgICAgICAgICAgIF92YWx1ZXNTdGFydFtwcm9wZXJ0eV1bcHJvcF0gPSBzdGFydFZhbHVlW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHN0YXJ0VmFsdWVJc0FycmF5ID8gW10gOiB7fTsgLy8gVE9ETz8gcmVwZWF0IG5lc3RlZCB2YWx1ZXM/IEFuZCB5b3lvPyBBbmQgYXJyYXkgdmFsdWVzP1xyXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIEZJWE1FP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBQcm9wZXJ0aWVzKHN0YXJ0VmFsdWUsIF92YWx1ZXNTdGFydFtwcm9wZXJ0eV0sIF92YWx1ZXNFbmRbcHJvcGVydHldLCBfdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFNhdmUgdGhlIHN0YXJ0aW5nIHZhbHVlLCBidXQgb25seSBvbmNlLlxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfdmFsdWVzU3RhcnRbcHJvcGVydHldID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHN0YXJ0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0VmFsdWVJc0FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBGSVhNRT9cclxuICAgICAgICAgICAgICAgICAgICBfdmFsdWVzU3RhcnRbcHJvcGVydHldICo9IDEuMDsgLy8gRW5zdXJlcyB3ZVwicmUgdXNpbmcgbnVtYmVycywgbm90IHN0cmluZ3NcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0ludGVycG9sYXRpb25MaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBGSVhNRT9cclxuICAgICAgICAgICAgICAgICAgICBfdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gX3ZhbHVlc0VuZFtwcm9wZXJ0eV0uc2xpY2UoKS5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RvcCgpOiB0aGlzIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ2hhaW5TdG9wcGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQ2hhaW5TdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2lzUGxheWluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICAgdGhpcy5fZ3JvdXAgJiYgdGhpcy5fZ3JvdXAucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uU3RvcENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uU3RvcENhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZW5kKCk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuX2dvVG9FbmQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKEluZmluaXR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHBhdXNlKHRpbWU/OiBudW1iZXIpOiB0aGlzIHtcclxuICAgICAgICBpZiAodGltZSA9PT0gdm9pZCAwKSB7IHRpbWUgPSBub3ckMSgpOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzUGF1c2VkIHx8ICF0aGlzLl9pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9wYXVzZVN0YXJ0ID0gdGltZTtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICB0aGlzLl9ncm91cCAmJiB0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXN1bWUodGltZT86IG51bWJlcik6IHRoaXMge1xyXG4gICAgICAgIGlmICh0aW1lID09PSB2b2lkIDApIHsgdGltZSA9IG5vdyQxKCk7IH1cclxuICAgICAgICBpZiAoIXRoaXMuX2lzUGF1c2VkIHx8ICF0aGlzLl9pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lICs9IHRpbWUgLSB0aGlzLl9wYXVzZVN0YXJ0O1xyXG4gICAgICAgIHRoaXMuX3BhdXNlU3RhcnQgPSAwO1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgIHRoaXMuX2dyb3VwICYmIHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHN0b3BDaGFpbmVkVHdlZW5zKCk6IHRoaXMge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZ3JvdXAoZ3JvdXA6IEdyb3VwKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5fZ3JvdXAgPSBncm91cDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGRlbGF5KGFtb3VudDogbnVtYmVyKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5fZGVsYXlUaW1lID0gYW1vdW50O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB0d2Vlbue7k+adn+S5i+WQjumineWklueahOmHjeWkjeasoeaVsFxyXG4gICAgICovXHJcbiAgICByZXBlYXQodGltZXM6IG51bWJlcik6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxSZXBlYXQgPSB0aW1lcztcclxuICAgICAgICB0aGlzLl9yZXBlYXQgPSB0aW1lcztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlcGVhdERlbGF5KGFtb3VudDogbnVtYmVyKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgeW95byh5b3lvOiBib29sZWFuKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5feW95byA9IHlveW87XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBlYXNpbmcoZWFzaW5nRnVuY3Rpb246IEVhc2luZ0Z1bmN0aW9uKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBlYXNpbmdGdW5jdGlvbjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGludGVycG9sYXRpb24oaW50ZXJwb2xhdGlvbkZ1bmN0aW9uOiBJbnRlcnBvbGF0aW9uRnVuY3Rpb24pOiB0aGlzIHtcclxuICAgICAgICB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcnBvbGF0aW9uRnVuY3Rpb247XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjaGFpbiguLi50d2VlbnM6IEFycmF5PFR3ZWVuPFVua25vd25Qcm9wcz4+KTogdGhpcyB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgdmFyIHR3ZWVucyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHR3ZWVuc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jaGFpbmVkVHdlZW5zID0gdHdlZW5zO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25TdGFydChjYWxsYmFjazogKG9iamVjdDogVCkgPT4gdm9pZCk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25VcGRhdGUoY2FsbGJhY2s6IChvYmplY3Q6IFQsIGVsYXBzZWQ6IG51bWJlcikgPT4gdm9pZCk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uUmVwZWF0KGNhbGxiYWNrOiAob2JqZWN0OiBUKSA9PiB2b2lkKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5fb25SZXBlYXRDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25Db21wbGV0ZShjYWxsYmFjazogKG9iamVjdDogVCkgPT4gdm9pZCk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25TdG9wKGNhbGxiYWNrOiAob2JqZWN0OiBUKSA9PiB2b2lkKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgdHdlZW4gaXMgc3RpbGwgcGxheWluZyBhZnRlciB0aGUgdXBkYXRlLCBmYWxzZVxyXG4gICAgICogb3RoZXJ3aXNlIChjYWxsaW5nIHVwZGF0ZSBvbiBhIHBhdXNlZCB0d2VlbiBzdGlsbCByZXR1cm5zIHRydWUgYmVjYXVzZVxyXG4gICAgICogaXQgaXMgc3RpbGwgcGxheWluZywganVzdCBwYXVzZWQpLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGUodGltZT86IG51bWJlciwgYXV0b1N0YXJ0PzogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aW1lID09PSB2b2lkIDApIHsgdGltZSA9IG5vdyQxKCk7IH1cclxuICAgICAgICBpZiAoYXV0b1N0YXJ0ID09PSB2b2lkIDApIHsgYXV0b1N0YXJ0ID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmICh0aGlzLl9pc1BhdXNlZClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgdmFyIHByb3BlcnR5O1xyXG4gICAgICAgIHZhciBlbGFwc2VkO1xyXG4gICAgICAgIHZhciBlbmRUaW1lID0gdGhpcy5fc3RhcnRUaW1lICsgdGhpcy5fZHVyYXRpb247XHJcbiAgICAgICAgaWYgKCF0aGlzLl9nb1RvRW5kICYmICF0aGlzLl9pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRpbWUgPiBlbmRUaW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoYXV0b1N0YXJ0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCh0aW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZ29Ub0VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aW1lIDwgdGhpcy5fc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxhcHNlZCA9ICh0aW1lIC0gdGhpcy5fc3RhcnRUaW1lKSAvIHRoaXMuX2R1cmF0aW9uO1xyXG4gICAgICAgIGVsYXBzZWQgPSB0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xyXG4gICAgICAgIC8vIHByb3BlcnRpZXMgdHJhbnNmb3JtYXRpb25zXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvcGVydGllcyh0aGlzLl9vYmplY3QsIHRoaXMuX3ZhbHVlc1N0YXJ0LCB0aGlzLl92YWx1ZXNFbmQsIHZhbHVlKTtcclxuICAgICAgICBpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9vblVwZGF0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCwgZWxhcHNlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbGFwc2VkID09PSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGaW5pdGUodGhpcy5fcmVwZWF0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlcGVhdC0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gUmVhc3NpZ24gc3RhcnRpbmcgdmFsdWVzLCByZXN0YXJ0IGJ5IG1ha2luZyBzdGFydFRpbWUgPSBub3dcclxuICAgICAgICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3lveW8gJiYgdHlwZW9mIHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBGSVhNRT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSArIHBhcnNlRmxvYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl95b3lvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N3YXBFbmRTdGFydFJlcGVhdFZhbHVlcyhwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl95b3lvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmV2ZXJzZWQgPSAhdGhpcy5fcmV2ZXJzZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVwZWF0RGVsYXlUaW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5fcmVwZWF0RGVsYXlUaW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX2RlbGF5VGltZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vblJlcGVhdENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25SZXBlYXRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgY2hhaW5lZCB0d2VlbnMgc3RhcnQgZXhhY3RseSBhdCB0aGUgdGltZSB0aGV5IHNob3VsZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBldmVuIGlmIHRoZSBgdXBkYXRlKClgIG1ldGhvZCB3YXMgY2FsbGVkIHdheSBwYXN0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdHdlZW5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgX3VwZGF0ZVByb3BlcnRpZXMoX29iamVjdCwgX3ZhbHVlc1N0YXJ0LCBfdmFsdWVzRW5kLCB2YWx1ZSkge1xyXG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIF92YWx1ZXNFbmQpIHtcclxuICAgICAgICAgICAgLy8gRG9uXCJ0IHVwZGF0ZSBwcm9wZXJ0aWVzIHRoYXQgZG8gbm90IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0XHJcbiAgICAgICAgICAgIGlmIChfdmFsdWVzU3RhcnRbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IF92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcclxuICAgICAgICAgICAgdmFyIGVuZCA9IF92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRJc0FycmF5ID0gQXJyYXkuaXNBcnJheShfb2JqZWN0W3Byb3BlcnR5XSk7XHJcbiAgICAgICAgICAgIHZhciBlbmRJc0FycmF5ID0gQXJyYXkuaXNBcnJheShlbmQpO1xyXG4gICAgICAgICAgICB2YXIgaXNJbnRlcnBvbGF0aW9uTGlzdCA9ICFzdGFydElzQXJyYXkgJiYgZW5kSXNBcnJheTtcclxuICAgICAgICAgICAgaWYgKGlzSW50ZXJwb2xhdGlvbkxpc3QpIHtcclxuICAgICAgICAgICAgICAgIF9vYmplY3RbcHJvcGVydHldID0gdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uKGVuZCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09IFwib2JqZWN0XCIgJiYgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgRklYTUU/XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQcm9wZXJ0aWVzKF9vYmplY3RbcHJvcGVydHldLCBzdGFydCwgZW5kLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXHJcbiAgICAgICAgICAgICAgICBlbmQgPSB0aGlzLl9oYW5kbGVSZWxhdGl2ZVZhbHVlKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgLy8gUHJvdGVjdCBhZ2FpbnN0IG5vbiBudW1lcmljIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgRklYTUU/XHJcbiAgICAgICAgICAgICAgICAgICAgX29iamVjdFtwcm9wZXJ0eV0gPSBzdGFydCArIChlbmQgLSBzdGFydCkgKiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9oYW5kbGVSZWxhdGl2ZVZhbHVlKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGVuZCAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW5kLmNoYXJBdCgwKSA9PT0gXCIrXCIgfHwgZW5kLmNoYXJBdCgwKSA9PT0gXCItXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXJ0ICsgcGFyc2VGbG9hdChlbmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoZW5kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfc3dhcEVuZFN0YXJ0UmVwZWF0VmFsdWVzKHByb3BlcnR5KSB7XHJcbiAgICAgICAgdmFyIHRtcCA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcclxuICAgICAgICB2YXIgZW5kVmFsdWUgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kVmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldICsgcGFyc2VGbG9hdChlbmRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIFZFUlNJT04gPSBcIjE4LjYuNFwiO1xyXG5cclxudmFyIG5leHRJZCA9IFNlcXVlbmNlLm5leHRJZDtcclxuLyoqXHJcbiAqIENvbnRyb2xsaW5nIGdyb3VwcyBvZiB0d2VlbnNcclxuICpcclxuICogVXNpbmcgdGhlIFRXRUVOIHNpbmdsZXRvbiB0byBtYW5hZ2UgeW91ciB0d2VlbnMgY2FuIGNhdXNlIGlzc3VlcyBpbiBsYXJnZSBhcHBzIHdpdGggbWFueSBjb21wb25lbnRzLlxyXG4gKiBJbiB0aGVzZSBjYXNlcywgeW91IG1heSB3YW50IHRvIGNyZWF0ZSB5b3VyIG93biBzbWFsbGVyIGdyb3VwcyBvZiB0d2VlbnMuXHJcbiAqL1xyXG5leHBvcnQgdmFyIFRXRUVOID0gbWFpbkdyb3VwO1xyXG4vKiogXHJcbiAqIOWfuuS6jlRpbWVyLnRpbWVTY2FsZee8qeaUvumAn+W6pueahGdyb3VwXHJcbiAqL1xyXG5leHBvcnQgdmFyIFNDQUxFX1RXRUVOID0gc2NhbGVHcm91cDtcclxuIl19