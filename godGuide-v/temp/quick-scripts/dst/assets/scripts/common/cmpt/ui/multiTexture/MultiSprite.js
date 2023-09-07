
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/MultiSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcbXVsdGlUZXh0dXJlXFxNdWx0aVNwcml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBa0Q7QUFDbEQsK0VBQTBFO0FBQzFFLHFGQUFnRjtBQUNoRix5RUFBb0U7QUFDcEUseUVBQW9FO0FBQ3BFLHVFQUFrRTtBQUNsRSw2REFBNEQ7QUFFdEQsSUFBQSxLQUEyRCxFQUFFLENBQUMsVUFBVSxFQUF0RSxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxTQUFTLGVBQWtCLENBQUM7QUFFL0U7O0dBRUc7QUFJSDtJQUF5QywrQkFBUztJQUFsRDtRQUFBLHFFQThEQztRQTVEVyxpQkFBVyxHQUFXLENBQUMsQ0FBQzs7SUE0RHBDLENBQUM7SUExREcsc0JBQVksbUNBQVU7UUFEdEIsdUNBQXVDO2FBQ3ZDLGNBQW1DLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDN0QsVUFBdUIsQ0FBUztZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUseUNBQW1CLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1FBQzVCLENBQUM7OztPQUo0RDtJQU1uRCxtQ0FBYSxHQUF2QjtRQUFBLGlCQU1DO1FBTEcsb0JBQVUsQ0FBQyxJQUFJLENBQWMsdUNBQXVDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQzNFLElBQUksR0FBRyxFQUFFO2dCQUNMLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFD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Q0FBMEIsQ0FBQztpQkFDckM7cUJBQU07b0JBQ0gsSUFBSSxHQUFHLGlDQUF1QixDQUFDO2lCQUNsQztnQkFDRCxNQUFNO1NBQ2I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVkaXRvclRvb2wgZnJvbSBcIi4uLy4uLy4uL3V0aWwvRWRpdG9yVG9vbFwiO1xyXG5pbXBvcnQgTXVsdGlBc3NlbWJsZXJCYXJGaWxsZWQgZnJvbSBcIi4vYXNzZW1ibGVyL011bHRpQXNzZW1ibGVyQmFyRmlsbGVkXCI7XHJcbmltcG9ydCBNdWx0aUFzc2VtYmxlclJhZGlhbEZpbGxlZCBmcm9tIFwiLi9hc3NlbWJsZXIvTXVsdGlBc3NlbWJsZXJSYWRpYWxGaWxsZWRcIjtcclxuaW1wb3J0IE11bHRpQXNzZW1ibGVyU2ltcGxlIGZyb20gXCIuL2Fzc2VtYmxlci9NdWx0aUFzc2VtYmxlclNpbXBsZVwiO1xyXG5pbXBvcnQgTXVsdGlBc3NlbWJsZXJTbGljZWQgZnJvbSBcIi4vYXNzZW1ibGVyL011bHRpQXNzZW1ibGVyU2xpY2VkXCI7XHJcbmltcG9ydCBNdWx0aUFzc2VtYmxlclRpbGVkIGZyb20gXCIuL2Fzc2VtYmxlci9NdWx0aUFzc2VtYmxlclRpbGVkXCI7XHJcbmltcG9ydCB7IE11bHRpVGV4dHVyZU1hbmFnZXIgfSBmcm9tIFwiLi9NdWx0aVRleHR1cmVNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCByZXF1aXJlQ29tcG9uZW50LCBtZW51LCBpbnNwZWN0b3IgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICogTXVsdGktVGV4dHVyZSDmuLLmn5Pnu4Tku7bvvIzlhbzlrrl3ZWLkuI5uYXRpdmXvvIzmlK/mjIFzaW1wbGXjgIFzbGljZWTjgIF0aWxlZOOAgWZpbGxlZFxyXG4gKi9cclxuQGNjY2xhc3NcclxuQG1lbnUoXCJGcmFtZXdvcmsvVUnnu4Tku7YvTXVsdGlTcHJpdGVcIilcclxuQGluc3BlY3RvcihcInBhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvc3ByaXRlLmpzXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpU3ByaXRlIGV4dGVuZHMgY2MuU3ByaXRlIHtcclxuXHJcbiAgICBwcml2YXRlIF90ZXh0dXJlSWR4OiBudW1iZXIgPSAwO1xyXG4gICAgLyoqIOW9k+WJjea4suafk+e7hOS7tuS9v+eUqOeahOe6ueeQhuS4i+agh++8jOS4jemcgOimgeS4u+WKqOiwg+eUqO+8jOivpee7hOS7tuWGhemDqOS8muiHquihjOWkhOeQhiAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgdGV4dHVyZUlkeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdGV4dHVyZUlkeDsgfVxyXG4gICAgcHJpdmF0ZSBzZXQgdGV4dHVyZUlkeCh2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlSWR4ID0gY2MubWlzYy5jbGFtcGYodiwgMCwgTXVsdGlUZXh0dXJlTWFuYWdlci5NQVhfVEVYVFVSRV9OVU0gLSAxKTtcclxuICAgICAgICB0aGlzW1wic2V0VmVydHNEaXJ0eVwiXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEluRWRpdG9yKCk6IHZvaWQge1xyXG4gICAgICAgIEVkaXRvclRvb2wubG9hZDxjYy5NYXRlcmlhbD4oXCJyZXMvc2hhZGVyL21hdGVyaWFscy9tdWx0aVRleHR1cmUubXRsXCIpLnRoZW4oKG1hdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWF0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1hdGVyaWFsKDAsIG1hdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZD8uKCk7XHJcbiAgICAgICAgTXVsdGlUZXh0dXJlTWFuYWdlci5hZGRTcHJpdGUodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkRlc3Ryb3k/LigpO1xyXG4gICAgICAgIE11bHRpVGV4dHVyZU1hbmFnZXIucmVtb3ZlU3ByaXRlKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572uc3ByaXRlRnJhbWXlkoxtYXRlcmlhbOaXtuW8leaTjuWGhemDqOS8muiwg+eUqO+8jOabtOaWsHRleHR1cmVJZHjvvIzmm7TmlrDmnZDotKjlsZ7mgKdcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX3VwZGF0ZU1hdGVyaWFsKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSBtYXRlcmlhbCBpcyBiZWxvbmcgdG8gc2VsZi5cclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLmdldE1hdGVyaWFsKDApO1xyXG4gICAgICAgIGlmIChtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBsZXQgdGV4dHVyZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlSW1wbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlID0gdGhpcy5zcHJpdGVGcmFtZS5nZXRUZXh0dXJlKCk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlSW1wbCA9IHRleHR1cmUgJiYgdGV4dHVyZS5nZXRJbXBsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFsLm5hbWUuaW5kZXhPZihcIm11bHRpVGV4dHVyZVwiKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDliJ3lp4vljJbnurnnkIbnrqHnkIblmahcclxuICAgICAgICAgICAgICAgIE11bHRpVGV4dHVyZU1hbmFnZXIuaW5pdChtYXRlcmlhbFtcIl9tYXRlcmlhbFwiXSk7XHJcbiAgICAgICAgICAgICAgICAvLyDmm7TmlrB0ZXh0dXJlSWR4XHJcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gTXVsdGlUZXh0dXJlTWFuYWdlci5nZXRJZHgodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWR4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmVJZHggPSBpZHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWwuZ2V0UHJvcGVydHkoYHRleHR1cmUke3RoaXMudGV4dHVyZUlkeH1gLCAwKSAhPT0gdGV4dHVyZUltcGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eShgdGV4dHVyZSR7dGhpcy50ZXh0dXJlSWR4fWAsIHRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsLmdldFByb3BlcnR5KGB0ZXh0dXJlYCwgMCkgIT09IHRleHR1cmVJbXBsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuc2V0UHJvcGVydHkoYHRleHR1cmVgLCB0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2MuQmxlbmRGdW5jLnByb3RvdHlwZVtcIl91cGRhdGVNYXRlcmlhbFwiXS5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jYy5Bc3NlbWJsZXIucmVnaXN0ZXIoTXVsdGlTcHJpdGUsIHtcclxuICAgIGdldENvbnN0cnVjdG9yKHNwcml0ZSkge1xyXG4gICAgICAgIGxldCBjdG9yOiBhbnkgPSBNdWx0aUFzc2VtYmxlclNpbXBsZTtcclxuICAgICAgICBzd2l0Y2ggKHNwcml0ZS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuU3ByaXRlLlR5cGUuU0xJQ0VEOlxyXG4gICAgICAgICAgICAgICAgY3RvciA9IE11bHRpQXNzZW1ibGVyU2xpY2VkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuU3ByaXRlLlR5cGUuVElMRUQ6XHJcbiAgICAgICAgICAgICAgICBjdG9yID0gTXVsdGlBc3NlbWJsZXJUaWxlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLlNwcml0ZS5UeXBlLkZJTExFRDpcclxuICAgICAgICAgICAgICAgIGlmIChzcHJpdGUuX2ZpbGxUeXBlID09PSBjYy5TcHJpdGUuRmlsbFR5cGUuUkFESUFMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RvciA9IE11bHRpQXNzZW1ibGVyUmFkaWFsRmlsbGVkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdG9yID0gTXVsdGlBc3NlbWJsZXJCYXJGaWxsZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN0b3I7XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=