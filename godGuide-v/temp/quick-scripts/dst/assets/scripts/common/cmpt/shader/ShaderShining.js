
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/shader/ShaderShining.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFxzaGFkZXJcXFNoYWRlclNoaW5pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQWtDO0FBRTVCLElBQUEsS0FBbUUsRUFBRSxDQUFDLFVBQVUsRUFBOUUsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsaUJBQWlCLHVCQUFrQixDQUFDO0FBTXZGO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBa0NDO1FBaENVLFdBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixTQUFHLEdBQVcsSUFBSSxDQUFDO1FBRW5CLGNBQVEsR0FBVyxDQUFDLENBQUM7UUFFckIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixlQUFTLEdBQVksS0FBSyxDQUFDO1FBRTFCLFVBQUksR0FBZ0IsSUFBSSxDQUFDOztJQW9CckMsQ0FBQztJQW5CRyxzQkFBVyw4QkFBRzthQUFkO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEU7WUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFUyw2QkFBSyxHQUFmO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFUyw4QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sb0NBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZUFBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsZUFBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBL0JEO1FBREMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQztnREFDZjtJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksTUFBTSxFQUFFLENBQUM7Z0RBQ2Y7SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQzs4Q0FDbkQ7SUFFMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQzttREFDakQ7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQzttREFDMUQ7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLHNCQUFzQixFQUFFLENBQUM7b0RBQ3RCO0lBWmpCLGFBQWE7UUFKakMsT0FBTztRQUNQLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGdDQUFnQyxDQUFDO09BQ2xCLGFBQWEsQ0FrQ2pDO0lBQUQsb0JBQUM7Q0FsQ0QsQUFrQ0MsQ0FsQzBDLEVBQUUsQ0FBQyxTQUFTLEdBa0N0RDtrQkFsQ29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGltZXIgZnJvbSBcIi4uL2Jhc2UvVGltZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUsIGRpc2FsbG93TXVsdGlwbGUsIGV4ZWN1dGVJbkVkaXRNb2RlIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuQGRpc2FsbG93TXVsdGlwbGVcclxuQGV4ZWN1dGVJbkVkaXRNb2RlXHJcbkBtZW51KFwiRnJhbWV3b3JrL1NoYWRlci9TaGFkZXJTaGluaW5nXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYWRlclNoaW5pbmcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogQ0NfREVWICYmIFwi5rWB5YWJ6YCf5bqmXCIgfSlcclxuICAgIHB1YmxpYyBzcGVlZDogbnVtYmVyID0gMTtcclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IENDX0RFViAmJiBcIua1geWFieaWnOeOh1wiIH0pXHJcbiAgICBwdWJsaWMgc2xvcGU6IG51bWJlciA9IDE7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBDQ19ERVYgJiYgXCLmtYHlhYnlrr3luqZcIiwgcmFuZ2U6IFswLCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUl0gfSlcclxuICAgIHB1YmxpYyBsZW46IG51bWJlciA9IDAuMjU7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBDQ19ERVYgJiYgXCLmtYHlhYnlvLrluqZcIiwgcmFuZ2U6IFswLCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUl0gfSlcclxuICAgIHB1YmxpYyBzdHJlbmd0aDogbnVtYmVyID0gMjtcclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IENDX0RFViAmJiBcIuS4pOasoea1geWFieWKqOeUu+S5i+mXtOeahOmXtOmalOaXtumXtFwiLCByYW5nZTogWzAsIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXSB9KVxyXG4gICAgcHVibGljIGludGVydmFsOiBudW1iZXIgPSAxO1xyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogQ0NfREVWICYmIFwi5rWB5YWJ6YCf5bqm5piv5ZCm5Y+X5YiwdGltZVNjYWxl55qE5b2x5ZONXCIgfSlcclxuICAgIHB1YmxpYyB0aW1lU2NhbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9tYXQ6IGNjLk1hdGVyaWFsID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgbWF0KCk6IGNjLk1hdGVyaWFsIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXQgPSB0aGlzLmdldENvbXBvbmVudChjYy5SZW5kZXJDb21wb25lbnQpLmdldE1hdGVyaWFsKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hhZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWF0LnNldFByb3BlcnR5KFwic2hpbmluZ0RhdGFcIiwgbmV3IGNjLlZlYzQodGhpcy5zcGVlZCwgdGhpcy5zbG9wZSwgdGhpcy5sZW4sIHRoaXMuaW50ZXJ2YWwpKTtcclxuICAgICAgICB0aGlzLm1hdC5zZXRQcm9wZXJ0eShcImV4dHJhXCIsIG5ldyBjYy5WZWM0KHRoaXMudGltZVNjYWxlID8gVGltZXIuc2NhbGVHYW1lU2VjIDogVGltZXIuZ2FtZVNlYywgdGhpcy5zdHJlbmd0aCkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==