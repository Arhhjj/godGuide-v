
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/shader/ShaderFill.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFxzaGFkZXJcXFNoYWRlckZpbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFtRSxFQUFFLENBQUMsVUFBVSxFQUE5RSxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxpQkFBaUIsdUJBQWtCLENBQUM7QUFNdkY7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUE0QkM7UUExQlUsZUFBUyxHQUFhLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXJDLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFFckIsVUFBSSxHQUFnQixJQUFJLENBQUM7O0lBc0JyQyxDQUFDO0lBckJHLHNCQUFXLDJCQUFHO2FBQWQ7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRTtZQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVTLDBCQUFLLEdBQWY7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVTLDJCQUFNLEdBQWhCO1FBQ0ksSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRU0saUNBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQXpCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksTUFBTSxFQUFFLENBQUM7aURBQ0k7SUFFNUM7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztpREFDekI7SUFKWixVQUFVO1FBSjlCLE9BQU87UUFDUCxnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztPQUNmLFVBQVUsQ0E0QjlCO0lBQUQsaUJBQUM7Q0E1QkQsQUE0QkMsQ0E1QnVDLEVBQUUsQ0FBQyxTQUFTLEdBNEJuRDtrQkE1Qm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51LCBkaXNhbGxvd011bHRpcGxlLCBleGVjdXRlSW5FZGl0TW9kZSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkBleGVjdXRlSW5FZGl0TW9kZVxyXG5AbWVudShcIkZyYW1ld29yay9TaGFkZXIvU2hhZGVyRmlsbFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkZXJGaWxsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IENDX0RFViAmJiBcIuWhq+WFheminOiJslwiIH0pXHJcbiAgICBwdWJsaWMgZmlsbENvbG9yOiBjYy5Db2xvciA9IG5ldyBjYy5Db2xvcigpO1xyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogQ0NfREVWICYmIFwi5aGr5YWF546HXCIsIHJhbmdlOiBbMCwgMV0gfSlcclxuICAgIHB1YmxpYyBmaWxsUGhhc2U6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWF0OiBjYy5NYXRlcmlhbCA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IG1hdCgpOiBjYy5NYXRlcmlhbCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF0ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUmVuZGVyQ29tcG9uZW50KS5nZXRNYXRlcmlhbCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaGFkZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNoYWRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hdC5zZXRQcm9wZXJ0eShcImZpbGxDb2xvclwiLCB0aGlzLmZpbGxDb2xvcik7XHJcbiAgICAgICAgdGhpcy5tYXQuc2V0UHJvcGVydHkoXCJmaWxsUGhhc2VcIiwgdGhpcy5maWxsUGhhc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==