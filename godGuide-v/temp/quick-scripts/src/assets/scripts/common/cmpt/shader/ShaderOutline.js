"use strict";
cc._RF.push(module, 'd2a0bLIldJHoqHhJxTVBs5H', 'ShaderOutline');
// scripts/common/cmpt/shader/ShaderOutline.ts

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
var OutlineType;
(function (OutlineType) {
    OutlineType[OutlineType["NONE"] = 0] = "NONE";
    /** 外描边 */
    OutlineType[OutlineType["OUT"] = 1] = "OUT";
    /** 内描边 */
    OutlineType[OutlineType["INNER"] = 2] = "INNER";
})(OutlineType || (OutlineType = {}));
var ShaderOutline = /** @class */ (function (_super) {
    __extends(ShaderOutline, _super);
    function ShaderOutline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.outlineColor = new cc.Color();
        _this.outLineWidth = 0;
        _this.outlineType = OutlineType.NONE;
        _this.textureSize = new cc.Size(1, 1);
        _this._mat = null;
        return _this;
    }
    Object.defineProperty(ShaderOutline.prototype, "mat", {
        get: function () {
            if (!this._mat) {
                this._mat = this.getComponent(cc.RenderComponent).getMaterial(0);
            }
            return this._mat;
        },
        enumerable: false,
        configurable: true
    });
    ShaderOutline.prototype.start = function () {
        this.updateShader();
    };
    ShaderOutline.prototype.update = function () {
        if (CC_EDITOR) {
            this.updateShader();
        }
    };
    ShaderOutline.prototype.updateShader = function () {
        this.mat.setProperty("outlineColor", this.outlineColor);
        this.mat.setProperty("outlineInfo", new cc.Vec4(this.textureSize.width, this.textureSize.height, this.outLineWidth, this.outlineType));
    };
    __decorate([
        property({ tooltip: CC_DEV && "描边颜色" })
    ], ShaderOutline.prototype, "outlineColor", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "描边宽度" })
    ], ShaderOutline.prototype, "outLineWidth", void 0);
    __decorate([
        property({ type: cc.Enum(OutlineType), tooltip: CC_DEV && "描边类型" })
    ], ShaderOutline.prototype, "outlineType", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "纹理大小" })
    ], ShaderOutline.prototype, "textureSize", void 0);
    ShaderOutline = __decorate([
        ccclass,
        disallowMultiple,
        executeInEditMode,
        menu("Framework/Shader/ShaderOutline")
    ], ShaderOutline);
    return ShaderOutline;
}(cc.Component));
exports.default = ShaderOutline;

cc._RF.pop();