
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/base/Tip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '86d61wcIsZPSrb29FvmFJRL', 'Tip');
// scripts/common/cmpt/base/Tip.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
var Tip = /** @class */ (function (_super) {
    __extends(Tip, _super);
    function Tip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layout = null;
        _this.textLab = null;
        return _this;
    }
    Tip.prototype.init = function (text) {
        this.textLab.string = text;
        this.textLab["_forceUpdateRenderData"]();
        this.layout.updateLayout();
    };
    __decorate([
        property(cc.Layout)
    ], Tip.prototype, "layout", void 0);
    __decorate([
        property(cc.Label)
    ], Tip.prototype, "textLab", void 0);
    Tip = __decorate([
        ccclass,
        disallowMultiple,
        menu("Framework/基础组件/Tip")
    ], Tip);
    return Tip;
}(cc.Component));
exports.default = Tip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFxiYXNlXFxUaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFnRCxFQUFFLENBQUMsVUFBVSxFQUEzRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFLcEU7SUFBaUMsdUJBQVk7SUFBN0M7UUFBQSxxRUFVQztRQVJnQyxZQUFNLEdBQWMsSUFBSSxDQUFDO1FBQzFCLGFBQU8sR0FBYSxJQUFJLENBQUM7O0lBT3pELENBQUM7SUFMVSxrQkFBSSxHQUFYLFVBQVksSUFBWTtRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBUG9CO1FBQXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VDQUFrQztJQUNsQztRQUFuQixRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3Q0FBa0M7SUFIcEMsR0FBRztRQUh2QixPQUFPO1FBQ1AsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztPQUNOLEdBQUcsQ0FVdkI7SUFBRCxVQUFDO0NBVkQsQUFVQyxDQVZnQyxFQUFFLENBQUMsU0FBUyxHQVU1QztrQkFWb0IsR0FBRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGRpc2FsbG93TXVsdGlwbGUsIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AZGlzYWxsb3dNdWx0aXBsZVxyXG5AbWVudShcIkZyYW1ld29yay/ln7rnoYDnu4Tku7YvVGlwXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxheW91dCkgcHJpdmF0ZSBsYXlvdXQ6IGNjLkxheW91dCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpIHByaXZhdGUgdGV4dExhYjogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBpbml0KHRleHQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGV4dExhYi5zdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMudGV4dExhYltcIl9mb3JjZVVwZGF0ZVJlbmRlckRhdGFcIl0oKTtcclxuICAgICAgICB0aGlzLmxheW91dC51cGRhdGVMYXlvdXQoKTtcclxuICAgIH1cclxufVxyXG4iXX0=