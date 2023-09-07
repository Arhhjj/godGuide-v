"use strict";
cc._RF.push(module, '10bd9Ws1BRG/ZPICDgLNLvK', 'ShaderShining');
// scripts/common/cmpt/shader/ShaderShining.ts

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
var Timer_1 = require("../base/Timer");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple, executeInEditMode = _a.executeInEditMode;
var ShaderShining = /** @class */ (function (_super) {
    __extends(ShaderShining, _super);
    function ShaderShining() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 1;
        _this.slope = 1;
        _this.len = 0.25;
        _this.strength = 2;
        _this.interval = 1;
        _this.timeScale = false;
        _this._mat = null;
        return _this;
    }
    Object.defineProperty(ShaderShining.prototype, "mat", {
        get: function () {
            if (!this._mat) {
                this._mat = this.getComponent(cc.RenderComponent).getMaterial(0);
            }
            return this._mat;
        },
        enumerable: false,
        configurable: true
    });
    ShaderShining.prototype.start = function () {
        this.updateShader();
    };
    ShaderShining.prototype.update = function () {
        this.updateShader();
    };
    ShaderShining.prototype.updateShader = function () {
        this.mat.setProperty("shiningData", new cc.Vec4(this.speed, this.slope, this.len, this.interval));
        this.mat.setProperty("extra", new cc.Vec4(this.timeScale ? Timer_1.default.scaleGameSec : Timer_1.default.gameSec, this.strength));
    };
    __decorate([
        property({ tooltip: CC_DEV && "流光速度" })
    ], ShaderShining.prototype, "speed", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "流光斜率" })
    ], ShaderShining.prototype, "slope", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "流光宽度", range: [0, Number.MAX_SAFE_INTEGER] })
    ], ShaderShining.prototype, "len", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "流光强度", range: [0, Number.MAX_SAFE_INTEGER] })
    ], ShaderShining.prototype, "strength", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "两次流光动画之间的间隔时间", range: [0, Number.MAX_SAFE_INTEGER] })
    ], ShaderShining.prototype, "interval", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "流光速度是否受到timeScale的影响" })
    ], ShaderShining.prototype, "timeScale", void 0);
    ShaderShining = __decorate([
        ccclass,
        disallowMultiple,
        executeInEditMode,
        menu("Framework/Shader/ShaderShining")
    ], ShaderShining);
    return ShaderShining;
}(cc.Component));
exports.default = ShaderShining;

cc._RF.pop();