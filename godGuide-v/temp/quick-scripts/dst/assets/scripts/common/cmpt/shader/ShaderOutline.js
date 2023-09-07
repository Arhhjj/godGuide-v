
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/shader/ShaderOutline.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFxzaGFkZXJcXFNoYWRlck91dGxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFtRSxFQUFFLENBQUMsVUFBVSxFQUE5RSxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxpQkFBaUIsdUJBQWtCLENBQUM7QUFFdkYsSUFBSyxXQU1KO0FBTkQsV0FBSyxXQUFXO0lBQ1osNkNBQVEsQ0FBQTtJQUNSLFVBQVU7SUFDViwyQ0FBTyxDQUFBO0lBQ1AsVUFBVTtJQUNWLCtDQUFTLENBQUE7QUFDYixDQUFDLEVBTkksV0FBVyxLQUFYLFdBQVcsUUFNZjtBQU1EO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBZ0NDO1FBOUJVLGtCQUFZLEdBQWEsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFeEMsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsaUJBQVcsR0FBZ0IsV0FBVyxDQUFDLElBQUksQ0FBQztRQUU1QyxpQkFBVyxHQUFZLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFeEMsVUFBSSxHQUFnQixJQUFJLENBQUM7O0lBc0JyQyxDQUFDO0lBckJHLHNCQUFXLDhCQUFHO2FBQWQ7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRTtZQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVTLDZCQUFLLEdBQWY7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVTLDhCQUFNLEdBQWhCO1FBQ0ksSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRU0sb0NBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUMzSSxDQUFDO0lBN0JEO1FBREMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQzt1REFDTztJQUUvQztRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksTUFBTSxFQUFFLENBQUM7dURBQ1I7SUFFaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLE1BQU0sRUFBRSxDQUFDO3NEQUNqQjtJQUVuRDtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksTUFBTSxFQUFFLENBQUM7c0RBQ1E7SUFSL0IsYUFBYTtRQUpqQyxPQUFPO1FBQ1AsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsZ0NBQWdDLENBQUM7T0FDbEIsYUFBYSxDQWdDakM7SUFBRCxvQkFBQztDQWhDRCxBQWdDQyxDQWhDMEMsRUFBRSxDQUFDLFNBQVMsR0FnQ3REO2tCQWhDb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUsIGRpc2FsbG93TXVsdGlwbGUsIGV4ZWN1dGVJbkVkaXRNb2RlIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZW51bSBPdXRsaW5lVHlwZSB7XHJcbiAgICBOT05FID0gMCxcclxuICAgIC8qKiDlpJbmj4/ovrkgKi9cclxuICAgIE9VVCA9IDEsXHJcbiAgICAvKiog5YaF5o+P6L65ICovXHJcbiAgICBJTk5FUiA9IDIsXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkBleGVjdXRlSW5FZGl0TW9kZVxyXG5AbWVudShcIkZyYW1ld29yay9TaGFkZXIvU2hhZGVyT3V0bGluZVwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkZXJPdXRsaW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IENDX0RFViAmJiBcIuaPj+i+ueminOiJslwiIH0pXHJcbiAgICBwdWJsaWMgb3V0bGluZUNvbG9yOiBjYy5Db2xvciA9IG5ldyBjYy5Db2xvcigpO1xyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogQ0NfREVWICYmIFwi5o+P6L655a695bqmXCIgfSlcclxuICAgIHB1YmxpYyBvdXRMaW5lV2lkdGg6IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKE91dGxpbmVUeXBlKSwgdG9vbHRpcDogQ0NfREVWICYmIFwi5o+P6L6557G75Z6LXCIgfSlcclxuICAgIHB1YmxpYyBvdXRsaW5lVHlwZTogT3V0bGluZVR5cGUgPSBPdXRsaW5lVHlwZS5OT05FO1xyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogQ0NfREVWICYmIFwi57q555CG5aSn5bCPXCIgfSlcclxuICAgIHB1YmxpYyB0ZXh0dXJlU2l6ZTogY2MuU2l6ZSA9IG5ldyBjYy5TaXplKDEsIDEpO1xyXG5cclxuICAgIHByaXZhdGUgX21hdDogY2MuTWF0ZXJpYWwgPSBudWxsO1xyXG4gICAgcHVibGljIGdldCBtYXQoKTogY2MuTWF0ZXJpYWwge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWF0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hdCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlJlbmRlckNvbXBvbmVudCkuZ2V0TWF0ZXJpYWwoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2hhZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTaGFkZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXQuc2V0UHJvcGVydHkoXCJvdXRsaW5lQ29sb3JcIiwgdGhpcy5vdXRsaW5lQ29sb3IpO1xyXG4gICAgICAgIHRoaXMubWF0LnNldFByb3BlcnR5KFwib3V0bGluZUluZm9cIiwgbmV3IGNjLlZlYzQodGhpcy50ZXh0dXJlU2l6ZS53aWR0aCwgdGhpcy50ZXh0dXJlU2l6ZS5oZWlnaHQsIHRoaXMub3V0TGluZVdpZHRoLCB0aGlzLm91dGxpbmVUeXBlKSk7XHJcbiAgICB9XHJcbn1cclxuIl19