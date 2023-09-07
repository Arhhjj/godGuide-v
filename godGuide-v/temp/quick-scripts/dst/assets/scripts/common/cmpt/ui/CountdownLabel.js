
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/CountdownLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a125eaLZLVO+LQud2BLjWcd', 'CountdownLabel');
// scripts/common/cmpt/ui/CountdownLabel.ts

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
var Tool_1 = require("../../util/Tool");
var Tween_1 = require("../../util/Tween");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
/**
 * 倒计时显示组件
 */
var CountdownLabel = /** @class */ (function (_super) {
    __extends(CountdownLabel, _super);
    function CountdownLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeScale = false;
        _this._tween = null;
        _this._updateCall = null;
        _this._completeCall = null;
        /** 格式化参数，详见`Tool.formatTimeString` */
        _this._format = "%{hh}:%{mm}:%{ss}";
        /** 剩余秒数 */
        _this._leftSec = 0;
        _this._leftFloorSec = 0;
        _this._label = null;
        return _this;
    }
    Object.defineProperty(CountdownLabel.prototype, "leftSec", {
        get: function () { return this._leftSec; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CountdownLabel.prototype, "label", {
        get: function () {
            var _a;
            if (!this._label) {
                this._label = (_a = this.getComponent(cc.Label)) !== null && _a !== void 0 ? _a : this.getComponent(cc.RichText);
            }
            return this._label;
        },
        enumerable: false,
        configurable: true
    });
    CountdownLabel.prototype.startCountdown = function (sec, format, updateCall, completeCall) {
        var _this = this;
        var _a;
        if (format === void 0) { format = "%{hh}:%{mm}:%{ss}"; }
        if (updateCall === void 0) { updateCall = null; }
        if (completeCall === void 0) { completeCall = null; }
        this._leftSec = sec;
        this._leftFloorSec = Math.floor(sec);
        this._format = format;
        this._updateCall = updateCall;
        this._completeCall = completeCall;
        (_a = this._tween) === null || _a === void 0 ? void 0 : _a.stop();
        this._tween = this.timeScale ? new Tween_1.Tween(this, Tween_1.SCALE_TWEEN) : new Tween_1.Tween(this);
        this._tween.to({ _leftSec: 0 }, sec * 1000)
            .onUpdate(function () {
            _this.onUpdate();
        })
            .onComplete(function () {
            _this.onComplete();
        })
            .start();
    };
    CountdownLabel.prototype.onUpdate = function () {
        var _a;
        // 每隔1s更新一次
        var floorSec = Math.floor(this._leftSec);
        if (floorSec === this._leftFloorSec) {
            return;
        }
        // 更新文本显示
        this._leftFloorSec = floorSec;
        if (this.label) {
            this.label.string = Tool_1.default.formatTimeString(this._leftFloorSec, this._format);
        }
        // 更新回调
        (_a = this._updateCall) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    CountdownLabel.prototype.onComplete = function () {
        var _a;
        (_a = this._completeCall) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    __decorate([
        property({
            tooltip: CC_DEV && "倒计时是否受到timeScale的影响"
        })
    ], CountdownLabel.prototype, "timeScale", void 0);
    CountdownLabel = __decorate([
        ccclass,
        menu("Framework/UI组件/CountdownLabel")
    ], CountdownLabel);
    return CountdownLabel;
}(cc.Component));
exports.default = CountdownLabel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcQ291bnRkb3duTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQW1DO0FBQ25DLDBDQUFzRDtBQUVoRCxJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQXpDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUlsRDs7R0FFRztBQUdIO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBK0RDO1FBM0RVLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFFMUIsWUFBTSxHQUFnQixJQUFJLENBQUM7UUFDM0IsaUJBQVcsR0FBZSxJQUFJLENBQUM7UUFDL0IsbUJBQWEsR0FBZSxJQUFJLENBQUM7UUFFekMsc0NBQXNDO1FBQzlCLGFBQU8sR0FBb0IsbUJBQW1CLENBQUM7UUFDdkQsV0FBVztRQUNILGNBQVEsR0FBVyxDQUFDLENBQUM7UUFFckIsbUJBQWEsR0FBVyxDQUFDLENBQUM7UUFFMUIsWUFBTSxHQUEyQixJQUFJLENBQUM7O0lBOENsRCxDQUFDO0lBakRHLHNCQUFXLG1DQUFPO2FBQWxCLGNBQStCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBSXRELHNCQUFXLGlDQUFLO2FBQWhCOztZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNkLElBQUksQ0FBQyxNQUFNLFNBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLG1DQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQy9FO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRU0sdUNBQWMsR0FBckIsVUFBc0IsR0FBVyxFQUFFLE1BQTZDLEVBQUUsVUFBNkIsRUFBRSxZQUErQjtRQUFoSixpQkFnQkM7O1FBaEJrQyx1QkFBQSxFQUFBLDRCQUE2QztRQUFFLDJCQUFBLEVBQUEsaUJBQTZCO1FBQUUsNkJBQUEsRUFBQSxtQkFBK0I7UUFDNUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsSUFBSSxHQUFHO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFLLENBQUMsSUFBSSxFQUFFLG1CQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQzthQUN0QyxRQUFRLENBQUM7WUFDTixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDO2FBQ0QsVUFBVSxDQUFDO1lBQ1IsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQzthQUNELEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTyxpQ0FBUSxHQUFoQjs7UUFDSSxXQUFXO1FBQ1gsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNqQyxPQUFPO1NBQ1Y7UUFFRCxTQUFTO1FBQ1QsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsY0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9FO1FBRUQsT0FBTztRQUNQLE1BQUEsSUFBSSxDQUFDLFdBQVcsK0NBQWhCLElBQUksRUFBaUI7SUFDekIsQ0FBQztJQUVPLG1DQUFVLEdBQWxCOztRQUNJLE1BQUEsSUFBSSxDQUFDLGFBQWEsK0NBQWxCLElBQUksRUFBbUI7SUFDM0IsQ0FBQztJQTFERDtRQUhDLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxNQUFNLElBQUkscUJBQXFCO1NBQzNDLENBQUM7cURBQ2dDO0lBSmpCLGNBQWM7UUFGbEMsT0FBTztRQUNQLElBQUksQ0FBQywrQkFBK0IsQ0FBQztPQUNqQixjQUFjLENBK0RsQztJQUFELHFCQUFDO0NBL0RELEFBK0RDLENBL0QyQyxFQUFFLENBQUMsU0FBUyxHQStEdkQ7a0JBL0RvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvb2wgZnJvbSBcIi4uLy4uL3V0aWwvVG9vbFwiO1xyXG5pbXBvcnQgeyBTQ0FMRV9UV0VFTiwgVHdlZW4gfSBmcm9tIFwiLi4vLi4vdXRpbC9Ud2VlblwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbnR5cGUgQ291bnRkb3duRm9ybWF0ID0gc3RyaW5nIHwgeyBcIlNcIjogc3RyaW5nOyBcIk1cIjogc3RyaW5nOyBcIkhcIjogc3RyaW5nOyBcIkRcIjogc3RyaW5nIH07XHJcblxyXG4vKipcclxuICog5YCS6K6h5pe25pi+56S657uE5Lu2XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIkZyYW1ld29yay9VSee7hOS7ti9Db3VudGRvd25MYWJlbFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3VudGRvd25MYWJlbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiBcIuWAkuiuoeaXtuaYr+WQpuWPl+WIsHRpbWVTY2FsZeeahOW9seWTjVwiXHJcbiAgICB9KVxyXG4gICAgcHVibGljIHRpbWVTY2FsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3R3ZWVuOiBUd2Vlbjx0aGlzPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF91cGRhdGVDYWxsOiAoKSA9PiB2b2lkID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2NvbXBsZXRlQ2FsbDogKCkgPT4gdm9pZCA9IG51bGw7XHJcblxyXG4gICAgLyoqIOagvOW8j+WMluWPguaVsO+8jOivpuingWBUb29sLmZvcm1hdFRpbWVTdHJpbmdgICovXHJcbiAgICBwcml2YXRlIF9mb3JtYXQ6IENvdW50ZG93bkZvcm1hdCA9IFwiJXtoaH06JXttbX06JXtzc31cIjtcclxuICAgIC8qKiDliankvZnnp5LmlbAgKi9cclxuICAgIHByaXZhdGUgX2xlZnRTZWM6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRTZWMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xlZnRTZWM7IH1cclxuICAgIHByaXZhdGUgX2xlZnRGbG9vclNlYzogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIF9sYWJlbDogY2MuTGFiZWwgfCBjYy5SaWNoVGV4dCA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCk6IGNjLkxhYmVsIHwgY2MuUmljaFRleHQge1xyXG4gICAgICAgIGlmICghdGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChjYy5MYWJlbCkgPz8gdGhpcy5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0Q291bnRkb3duKHNlYzogbnVtYmVyLCBmb3JtYXQ6IENvdW50ZG93bkZvcm1hdCA9IFwiJXtoaH06JXttbX06JXtzc31cIiwgdXBkYXRlQ2FsbDogKCkgPT4gdm9pZCA9IG51bGwsIGNvbXBsZXRlQ2FsbDogKCkgPT4gdm9pZCA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sZWZ0U2VjID0gc2VjO1xyXG4gICAgICAgIHRoaXMuX2xlZnRGbG9vclNlYyA9IE1hdGguZmxvb3Ioc2VjKTtcclxuICAgICAgICB0aGlzLl9mb3JtYXQgPSBmb3JtYXQ7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2FsbCA9IHVwZGF0ZUNhbGw7XHJcbiAgICAgICAgdGhpcy5fY29tcGxldGVDYWxsID0gY29tcGxldGVDYWxsO1xyXG4gICAgICAgIHRoaXMuX3R3ZWVuPy5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5fdHdlZW4gPSB0aGlzLnRpbWVTY2FsZSA/IG5ldyBUd2Vlbih0aGlzLCBTQ0FMRV9UV0VFTikgOiBuZXcgVHdlZW4odGhpcyk7XHJcbiAgICAgICAgdGhpcy5fdHdlZW4udG8oeyBfbGVmdFNlYzogMCB9LCBzZWMgKiAxMDAwKVxyXG4gICAgICAgICAgICAub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub25Db21wbGV0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyDmr4/pmpQxc+abtOaWsOS4gOasoVxyXG4gICAgICAgIGxldCBmbG9vclNlYyA9IE1hdGguZmxvb3IodGhpcy5fbGVmdFNlYyk7XHJcbiAgICAgICAgaWYgKGZsb29yU2VjID09PSB0aGlzLl9sZWZ0Rmxvb3JTZWMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5pu05paw5paH5pys5pi+56S6XHJcbiAgICAgICAgdGhpcy5fbGVmdEZsb29yU2VjID0gZmxvb3JTZWM7XHJcbiAgICAgICAgaWYgKHRoaXMubGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBUb29sLmZvcm1hdFRpbWVTdHJpbmcodGhpcy5fbGVmdEZsb29yU2VjLCB0aGlzLl9mb3JtYXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5pu05paw5Zue6LCDXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2FsbD8uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbXBsZXRlQ2FsbD8uKCk7XHJcbiAgICB9XHJcbn1cclxuIl19