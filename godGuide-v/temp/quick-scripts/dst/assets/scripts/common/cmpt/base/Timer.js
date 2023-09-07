
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/base/Timer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFxiYXNlXFxUaW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0Q7QUFDbEQsNENBQXVDO0FBQ3ZDLDBDQUFzRDtBQUVoRCxJQUFBLEtBQXNELEVBQUUsQ0FBQyxVQUFVLEVBQWpFLE9BQU8sYUFBQSxFQUFFLGNBQWMsb0JBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQWtCLENBQUM7QUFFMUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtJQUNaLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxLQUFlO1FBQ2pFLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNiLE9BQU87U0FDVjtRQUVELEVBQUUsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNwQyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0NBQ047QUFFRDs7O0dBR0c7QUFLSDtJQUFtQyx5QkFBWTtJQUEvQzs7SUFrSEEsQ0FBQztjQWxIb0IsS0FBSztJQUt0QixzQkFBa0IsY0FBSzthQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQVdELHNCQUFrQixrQkFBUztRQUozQjs7O1dBR0c7YUFDSCxjQUF3QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ2pFLFVBQTRCLENBQVM7WUFDakMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFD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QUFDO1FBQ25CLE9BQUssQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ3JCLE9BQUssQ0FBQyxhQUFhLElBQUksT0FBSyxDQUFDLE9BQU8sQ0FBQztRQUVyQyxhQUFLLENBQUMsTUFBTSxDQUFDLE9BQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQiwyQkFBMkI7UUFDM0IsSUFBSSxPQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtZQUNuQixtQkFBVyxDQUFDLE1BQU0sQ0FBQyxPQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDOztJQWhIRCxjQUFjO0lBRWQsc0JBQXNCO0lBQ1AsWUFBTSxHQUFVLElBQUksQ0FBQztJQUtwQyxnQkFBZ0I7SUFDRCxpQkFBVyxHQUFXLENBQUMsQ0FBQztJQUV4QixvQkFBYyxHQUFXLENBQUMsQ0FBQztJQUMzQixnQkFBVSxHQUFXLENBQUMsQ0FBQztJQWN2QixhQUFPLEdBQVcsQ0FBQyxDQUFDO0lBTXBCLGNBQVEsR0FBVyxDQUFDLENBQUM7SUFDckIsbUJBQWEsR0FBVyxDQUFDLENBQUM7SUFsQ3hCLEtBQUs7UUFKekIsT0FBTztRQUNQLGdCQUFnQjtRQUNoQixjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLHNCQUFzQixDQUFDO09BQ1IsS0FBSyxDQWtIekI7SUFBRCxZQUFDO0NBbEhELEFBa0hDLENBbEhrQyxFQUFFLENBQUMsU0FBUyxHQWtIOUM7a0JBbEhvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcIi4uLy4uL2NvbnN0L0V2ZW50TmFtZVwiO1xyXG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuLi8uLi91dGlsL0V2ZW50c1wiO1xyXG5pbXBvcnQgeyBTQ0FMRV9UV0VFTiwgVFdFRU4gfSBmcm9tIFwiLi4vLi4vdXRpbC9Ud2VlblwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBleGVjdXRpb25PcmRlciwgbWVudSwgZGlzYWxsb3dNdWx0aXBsZSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmlmICghQ0NfRURJVE9SKSB7XHJcbiAgICBjYy5kaXJlY3Rvci5vbihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9TQ0VORV9MQVVOQ0gsIChzY2VuZTogY2MuU2NlbmUpID0+IHtcclxuICAgICAgICBpZiAoVGltZXIudGltZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2MubG9nKFwiYWRkUGVyc2lzdFJvb3ROb2RlOiBUSU1FUlwiKTtcclxuICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKFwiVElNRVJcIik7XHJcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUobm9kZSk7XHJcbiAgICAgICAgbm9kZS5hZGRDb21wb25lbnQoVGltZXIpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAtIOWFqOWxgOaXtumXtOeuoeeQhuWZqO+8jOWcuuaZr+WKoOi9veWQjuS8muiHquWKqOe7keWumuW4uOmpu+iKgueCue+8jOS/neivgeWFqOWxgOacieS4lOWPquacieS4gOS4qlxyXG4gKiAtIOi0n+i0o1RXRUVO5ZKMU0NBTEVfVFdFRU7nmoTnrqHnkIbkuI7mm7TmlrBcclxuICovXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkBleGVjdXRpb25PcmRlcigtMTAwMClcclxuQG1lbnUoXCJGcmFtZXdvcmsv5Z+656GA57uE5Lu2L1RpbWVyXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIC8vI3JlZ2lvbiDpnZnmgIHmiJDlkZhcclxuXHJcbiAgICAvKiog5YWo5bGA56ys5LiA5Liq5Yqg6L2955qEVGltZXLnu4Tku7YgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF90aW1lcjogVGltZXIgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdGltZXIoKTogVGltZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5ri45oiP6LCD55So5pqC5YGc55qE6K6h5pWwICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfcHVhc2VDb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbGFzdFRpbWVTY2FsZTogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgc3RhdGljIF90aW1lU2NhbGU6IG51bWJlciA9IDE7XHJcbiAgICAvKiogXHJcbiAgICAgKiBkdOe8qeaUvuWAjeaVsO+8jDHkuLrmraPluLjpgJ/luqbvvIww5Li65pqC5YGcXHJcbiAgICAgKiAtIOmcgOimgeeJueWIq+azqOaEj+atpOWAvOeahOS/ruaUueWSjOaaguWBnOOAgeaBouWkjeWmguaenOWQjOaXtuWkmuWkhOiwg+eUqOS6p+eUn+eahOaViOaenOaYr+WQpuato+ehrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCB0aW1lU2NhbGUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RpbWVTY2FsZTsgfVxyXG4gICAgcHVibGljIHN0YXRpYyBzZXQgdGltZVNjYWxlKHY6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh2ID09PSB0aGlzLl90aW1lU2NhbGUgfHwgdiA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90aW1lU2NhbGUgPSB2O1xyXG4gICAgICAgIEV2ZW50cy5lbWl0KEV2ZW50TmFtZS5USU1FX1NDQUxFKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfcmVhbER0OiBudW1iZXIgPSAwO1xyXG4gICAgLyoqIOi3neS4iuS4gOW4p+mXtOmalOeahOecn+WunuaXtumXtCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgcmVhbER0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9yZWFsRHQ7IH1cclxuICAgIC8qKiDot53kuIrkuIDluKfpl7TpmpTnu4/ov4d0aW1lU2NhbGXnvKnmlL7nmoTml7bpl7QgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHNjYWxlRHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3JlYWxEdCAqIHRoaXMuX3RpbWVTY2FsZTsgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9nYW1lU2VjOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3NjYWxlR2FtZVNlYzogbnVtYmVyID0gMDtcclxuICAgIC8qKiDmuLjmiI/lkK/liqjnu4/ov4fnmoTml7bplb8gcyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZ2FtZVNlYygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZ2FtZVNlYzsgfVxyXG4gICAgLyoqIOa4uOaIj+WQr+WKqOe7j+i/h+eahOaXtumVvyBtcyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZ2FtZU1zKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9nYW1lU2VjICogMTAwMDsgfVxyXG4gICAgLyoqIOa4uOaIj+e7j+i/h+e8qeaUvueahOaXtumVvyBzICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBzY2FsZUdhbWVTZWMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NjYWxlR2FtZVNlYzsgfVxyXG4gICAgLyoqIOa4uOaIj+e7j+i/h+e8qeaUvueahOaXtumVvyBtcyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgc2NhbGVHYW1lTXMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NjYWxlR2FtZVNlYyAqIDEwMDA7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjee9riB0aW1lU2NhbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wdWFzZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lU2NhbGUgPSAxO1xyXG4gICAgICAgIHRoaXMuX2xhc3RUaW1lU2NhbGUgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pqC5YGc5ri45oiPIHRpbWVTY2FsZeiuvue9ruS4ujAg77yI6ZyA6KaB5LiOZ2FtZVJlc3VtZeaIkOWvueiwg+eUqO+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdhbWVQYXVzZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wdWFzZUNvdW50Kys7XHJcbiAgICAgICAgaWYgKHRoaXMuX3B1YXNlQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGFzdFRpbWVTY2FsZSA9IHRoaXMuX3RpbWVTY2FsZTtcclxuICAgICAgICB0aGlzLl90aW1lU2NhbGUgPSAwO1xyXG4gICAgICAgIEV2ZW50cy5lbWl0KEV2ZW50TmFtZS5HQU1FX1BBVVNFKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaBouWkjea4uOaIjyDvvIjpnIDopoHkuI5nYW1lUGF1c2XmiJDlr7nosIPnlKjvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnYW1lUmVzdW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9wdWFzZUNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wdWFzZUNvdW50LS07XHJcbiAgICAgICAgaWYgKHRoaXMuX3B1YXNlQ291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lU2NhbGUgPSB0aGlzLl9sYXN0VGltZVNjYWxlO1xyXG4gICAgICAgICAgICBFdmVudHMuZW1pdChFdmVudE5hbWUuR0FNRV9SRVNVTUUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChUaW1lci5fdGltZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUaW1lci5fdGltZXIgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFRpbWVyLl90aW1lciA9PT0gdGhpcykge1xyXG4gICAgICAgICAgICBUaW1lci5fdGltZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVFdFRU4ucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgU0NBTEVfVFdFRU4ucmVtb3ZlQWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8g5Y+q5ZCv55So56ys5LiA5Liq5Yqg6L2955qE57uE5Lu2XHJcbiAgICAgICAgaWYgKFRpbWVyLl90aW1lciAhPT0gdGhpcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUaW1lci5fcmVhbER0ID0gZHQ7XHJcbiAgICAgICAgVGltZXIuX2dhbWVTZWMgKz0gZHQ7XHJcbiAgICAgICAgVGltZXIuX3NjYWxlR2FtZVNlYyArPSBUaW1lci5zY2FsZUR0O1xyXG5cclxuICAgICAgICBUV0VFTi51cGRhdGUoVGltZXIuZ2FtZU1zKTtcclxuICAgICAgICAvLyBzY2FsZUR05aSn5LqOMOaXtuabtOaWsFNDQUxFX1RXRUVOXHJcbiAgICAgICAgaWYgKFRpbWVyLnNjYWxlRHQgPiAwKSB7XHJcbiAgICAgICAgICAgIFNDQUxFX1RXRUVOLnVwZGF0ZShUaW1lci5zY2FsZUdhbWVNcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==