"use strict";
cc._RF.push(module, 'c922bwmEw5OV4VVCBcsN/cG', 'MultiSprite');
// scripts/common/cmpt/ui/multiTexture/MultiSprite.ts

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
var EditorTool_1 = require("../../../util/EditorTool");
var MultiAssemblerBarFilled_1 = require("./assembler/MultiAssemblerBarFilled");
var MultiAssemblerRadialFilled_1 = require("./assembler/MultiAssemblerRadialFilled");
var MultiAssemblerSimple_1 = require("./assembler/MultiAssemblerSimple");
var MultiAssemblerSliced_1 = require("./assembler/MultiAssemblerSliced");
var MultiAssemblerTiled_1 = require("./assembler/MultiAssemblerTiled");
var MultiTextureManager_1 = require("./MultiTextureManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, menu = _a.menu, inspector = _a.inspector;
/**
 * Multi-Texture 渲染组件，兼容web与native，支持simple、sliced、tiled、filled
 */
var MultiSprite = /** @class */ (function (_super) {
    __extends(MultiSprite, _super);
    function MultiSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._textureIdx = 0;
        return _this;
    }
    Object.defineProperty(MultiSprite.prototype, "textureIdx", {
        /** 当前渲染组件使用的纹理下标，不需要主动调用，该组件内部会自行处理 */
        get: function () { return this._textureIdx; },
        set: function (v) {
            this._textureIdx = cc.misc.clampf(v, 0, MultiTextureManager_1.MultiTextureManager.MAX_TEXTURE_NUM - 1);
            this["setVertsDirty"]();
        },
        enumerable: false,
        configurable: true
    });
    MultiSprite.prototype.resetInEditor = function () {
        var _this = this;
        EditorTool_1.default.load("res/shader/materials/multiTexture.mtl").then(function (mat) {
            if (mat) {
                _this.setMaterial(0, mat);
            }
        });
    };
    MultiSprite.prototype.onLoad = function () {
        var _a;
        (_a = _super.prototype.onLoad) === null || _a === void 0 ? void 0 : _a.call(this);
        MultiTextureManager_1.MultiTextureManager.addSprite(this);
    };
    MultiSprite.prototype.onDestroy = function () {
        var _a;
        (_a = _super.prototype.onDestroy) === null || _a === void 0 ? void 0 : _a.call(this);
        MultiTextureManager_1.MultiTextureManager.removeSprite(this);
    };
    /**
     * 设置spriteFrame和material时引擎内部会调用，更新textureIdx，更新材质属性
     * @override
     */
    MultiSprite.prototype._updateMaterial = function () {
        // make sure material is belong to self.
        var material = this.getMaterial(0);
        if (material) {
            var texture = null;
            var textureImpl = null;
            if (this.spriteFrame) {
                texture = this.spriteFrame.getTexture();
                textureImpl = texture && texture.getImpl();
            }
            if (material.name.indexOf("multiTexture") >= 0) {
                // 初始化纹理管理器
                MultiTextureManager_1.MultiTextureManager.init(material["_material"]);
                // 更新textureIdx
                var idx = MultiTextureManager_1.MultiTextureManager.getIdx(texture);
                if (idx >= 0) {
                    this.textureIdx = idx;
                }
                if (material.getProperty("texture" + this.textureIdx, 0) !== textureImpl) {
                    material.setProperty("texture" + this.textureIdx, texture);
                }
            }
            else {
                if (material.getProperty("texture", 0) !== textureImpl) {
                    material.setProperty("texture", texture);
                }
            }
        }
        cc.BlendFunc.prototype["_updateMaterial"].call(this);
    };
    MultiSprite = __decorate([
        ccclass,
        menu("Framework/UI组件/MultiSprite"),
        inspector("packages://inspector/inspectors/comps/sprite.js")
    ], MultiSprite);
    return MultiSprite;
}(cc.Sprite));
exports.default = MultiSprite;
cc.Assembler.register(MultiSprite, {
    getConstructor: function (sprite) {
        var ctor = MultiAssemblerSimple_1.default;
        switch (sprite.type) {
            case cc.Sprite.Type.SLICED:
                ctor = MultiAssemblerSliced_1.default;
                break;
            case cc.Sprite.Type.TILED:
                ctor = MultiAssemblerTiled_1.default;
                break;
            case cc.Sprite.Type.FILLED:
                if (sprite._fillType === cc.Sprite.FillType.RADIAL) {
                    ctor = MultiAssemblerRadialFilled_1.default;
                }
                else {
                    ctor = MultiAssemblerBarFilled_1.default;
                }
                break;
        }
        return ctor;
    }
});

cc._RF.pop();