"use strict";
cc._RF.push(module, 'e6e3agdOnJF/o7rgEOg4Iq+', 'ShaderTile');
// scripts/common/cmpt/shader/ShaderTile.ts

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
var ShaderTile = /** @class */ (function (_super) {
    __extends(ShaderTile, _super);
    function ShaderTile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scale = new cc.Vec2(1, 1);
        _this.offset = new cc.Vec2(0, 0);
        _this._mat = null;
        return _this;
    }
    Object.defineProperty(ShaderTile.prototype, "mat", {
        get: function () {
            if (!this._mat) {
                this._mat = this.getComponent(cc.RenderComponent).getMaterial(0);
            }
            return this._mat;
        },
        enumerable: false,
        configurable: true
    });
    ShaderTile.prototype.start = function () {
        this.updateShader();
    };
    ShaderTile.prototype.update = function () {
        if (CC_EDITOR) {
            this.updateShader();
        }
    };
    ShaderTile.prototype.updateShader = function () {
        this.mat.setProperty("tile", new cc.Vec4(this.scale.x, this.scale.y, this.offset.x, this.offset.y));
    };
    __decorate([
        property({ tooltip: CC_DEV && "uv坐标缩放倍数" })
    ], ShaderTile.prototype, "scale", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "uv坐标偏移值" })
    ], ShaderTile.prototype, "offset", void 0);
    ShaderTile = __decorate([
        ccclass,
        disallowMultiple,
        executeInEditMode,
        menu("Framework/Shader/ShaderTile")
    ], ShaderTile);
    return ShaderTile;
}(cc.Component));
exports.default = ShaderTile;

cc._RF.pop();