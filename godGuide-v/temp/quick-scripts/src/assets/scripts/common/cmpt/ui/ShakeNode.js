"use strict";
cc._RF.push(module, '936e8flAq9L248TlLh5Hzd0', 'ShakeNode');
// scripts/common/cmpt/ui/ShakeNode.ts

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
var Tween_1 = require("../../util/Tween");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
/**
 * 节点振动
 */
var ShakeNode = /** @class */ (function (_super) {
    __extends(ShakeNode, _super);
    function ShakeNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shakePower = 5;
        _this.shakeTime = 0.16;
        _this.timeScale = false;
        _this._tween = null;
        return _this;
    }
    /**
     * 振动
     * @param times 振动几个周期
     */
    ShakeNode.prototype.shake = function (times) {
        if (times === void 0) { times = 5; }
        if ((this._tween && this._tween.isPlaying()) || times <= 0 || this.shakePower <= 0 || this.shakeTime <= 0) {
            return;
        }
        var sv = cc.v2(0, this.shakePower);
        this.node.setPosition(sv);
        var xArr = [];
        var yArr = [];
        for (var i = 1; i <= 8; i++) {
            var v = sv.rotate(Math.PI / 4 * (i * 3));
            xArr.push(v.x);
            yArr.push(v.y);
        }
        this._tween = this.timeScale ? new Tween_1.Tween(this.node, Tween_1.SCALE_TWEEN) : new Tween_1.Tween(this.node);
        this._tween.to({ x: xArr, y: yArr }, this.shakeTime * 1000)
            .repeat(times)
            .start();
    };
    __decorate([
        property({ tooltip: CC_DEV && "振动幅度" })
    ], ShakeNode.prototype, "shakePower", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "振动周期，单位：秒" })
    ], ShakeNode.prototype, "shakeTime", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && "变化速度是否受到timeScale的影响"
        })
    ], ShakeNode.prototype, "timeScale", void 0);
    ShakeNode = __decorate([
        ccclass,
        disallowMultiple,
        menu("Framework/UI组件/ShakeNode")
    ], ShakeNode);
    return ShakeNode;
}(cc.Component));
exports.default = ShakeNode;

cc._RF.pop();