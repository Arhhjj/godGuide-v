"use strict";
cc._RF.push(module, '63dfaBxVipD7bEv99K+9+0u', 'ShaderFill');
// scripts/common/cmpt/shader/ShaderFill.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple, executeInEditMode = _a.executeInEditMode;
var ShaderFill = /** @class */ (function (_super) {
    __extends(ShaderFill, _super);
    function ShaderFill() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fillColor = new cc.Color();
        _this.fillPhase = 0;
        _this._mat = null;
        return _this;
    }
    Object.defineProperty(ShaderFill.prototype, "mat", {
        get: function () {
            if (!this._mat) {
                this._mat = this.getComponent(cc.RenderComponent).getMaterial(0);
            }
            return this._mat;
        },
        enumerable: false,
        configurable: true
    });
    ShaderFill.prototype.start = function () {
        this.updateShader();
    };
    ShaderFill.prototype.update = function () {
        if (CC_EDITOR) {
            this.updateShader();
        }
    };
    ShaderFill.prototype.updateShader = function () {
        this.mat.setProperty("fillColor", this.fillColor);
        this.mat.setProperty("fillPhase", this.fillPhase);
    };
    __decorate([
        property({ tooltip: CC_DEV && "填充颜色" })
    ], ShaderFill.prototype, "fillColor", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "填充率", range: [0, 1] })
    ], ShaderFill.prototype, "fillPhase", void 0);
    ShaderFill = __decorate([
        ccclass,
        disallowMultiple,
        executeInEditMode,
        menu("Framework/Shader/ShaderFill")
    ], ShaderFill);
    return ShaderFill;
}(cc.Component));
exports.default = ShaderFill;

cc._RF.pop();