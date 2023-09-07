"use strict";
cc._RF.push(module, '435944whQBN4o91RvmJFpuA', 'Timer');
// scripts/common/cmpt/base/Timer.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventName_1 = require("../../const/EventName");
var Events_1 = require("../../util/Events");
var Tween_1 = require("../../util/Tween");
var _a = cc._decorator, ccclass = _a.ccclass, executionOrder = _a.executionOrder, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
if (!CC_EDITOR) {
    cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function (scene) {
        if (Timer.timer) {
            return;
        }
        cc.log("addPersistRootNode: TIMER");
        var node = new cc.Node("TIMER");
        cc.game.addPersistRootNode(node);
        node.addComponent(Timer);
    });
}
/**
 * - 全局时间管理器，场景加载后会自动绑定常驻节点，保证全局有且只有一个
 * - 负责TWEEN和SCALE_TWEEN的管理与更新
 */
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Timer_1 = Timer;
    Object.defineProperty(Timer, "timer", {
        get: function () {
            return this._timer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer, "timeScale", {
        /**
         * dt缩放倍数，1为正常速度，0为暂停
         * - 需要特别注意此值的修改和暂停、恢复如果同时多处调用产生的效果是否正确
         */
        get: function () { return this._timeScale; },
        set: function (v) {
            if (v === this._timeScale || v < 0) {
                return;
            }
            this._timeScale = v;
            Events_1.default.emit(EventName_1.EventName.TIME_SCALE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer, "realDt", {
        /** 距上一帧间隔的真实时间 */
        get: function () { return this._realDt; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer, "scaleDt", {
        /** 距上一帧间隔经过timeScale缩放的时间 */
        get: function () { return this._realDt * this._timeScale; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer, "gameSec", {
        /** 游戏启动经过的时长 s */
        get: function () { return this._gameSec; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer, "gameMs", {
        /** 游戏启动经过的时长 ms */
        get: function () { return this._gameSec * 1000; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer, "scaleGameSec", {
        /** 游戏经过缩放的时长 s */
        get: function () { return this._scaleGameSec; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer, "scaleGameMs", {
        /** 游戏经过缩放的时长 ms */
        get: function () { return this._scaleGameSec * 1000; },
        enumerable: false,
        configurable: true
    });
    /**
     * 重置 timeScale
     */
    Timer.reset = function () {
        this._puaseCount = 0;
        this._timeScale = 1;
        this._lastTimeScale = 1;
    };
    /**
     * 暂停游戏 timeScale设置为0 （需要与gameResume成对调用）
     */
    Timer.gamePause = function () {
        this._puaseCount++;
        if (this._puaseCount > 1) {
            return;
        }
        this._lastTimeScale = this._timeScale;
        this._timeScale = 0;
        Events_1.default.emit(EventName_1.EventName.GAME_PAUSE);
    };
    /**
     * 恢复游戏 （需要与gamePause成对调用）
     */
    Timer.gameResume = function () {
        if (this._puaseCount <= 0) {
            return;
        }
        this._puaseCount--;
        if (this._puaseCount <= 0) {
            this._timeScale = this._lastTimeScale;
            Events_1.default.emit(EventName_1.EventName.GAME_RESUME);
        }
    };
    //#endregion
    Timer.prototype.onLoad = function () {
        if (Timer_1._timer) {
            return;
        }
        Timer_1._timer = this;
    };
    Timer.prototype.onDestroy = function () {
        if (Timer_1._timer === this) {
            Timer_1._timer = null;
        }
        Tween_1.TWEEN.removeAll();
        Tween_1.SCALE_TWEEN.removeAll();
    };
    Timer.prototype.update = function (dt) {
        // 只启用第一个加载的组件
        if (Timer_1._timer !== this) {
            return;
        }
        Timer_1._realDt = dt;
        Timer_1._gameSec += dt;
        Timer_1._scaleGameSec += Timer_1.scaleDt;
        Tween_1.TWEEN.update(Timer_1.gameMs);
        // scaleDt大于0时更新SCALE_TWEEN
        if (Timer_1.scaleDt > 0) {
            Tween_1.SCALE_TWEEN.update(Timer_1.scaleGameMs);
        }
    };
    var Timer_1;
    //#region 静态成员
    /** 全局第一个加载的Timer组件 */
    Timer._timer = null;
    /** 游戏调用暂停的计数 */
    Timer._puaseCount = 0;
    Timer._lastTimeScale = 1;
    Timer._timeScale = 1;
    Timer._realDt = 0;
    Timer._gameSec = 0;
    Timer._scaleGameSec = 0;
    Timer = Timer_1 = __decorate([
        ccclass,
        disallowMultiple,
        executionOrder(-1000),
        menu("Framework/基础组件/Timer")
    ], Timer);
    return Timer;
}(cc.Component));
exports.default = Timer;

cc._RF.pop();