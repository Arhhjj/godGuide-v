
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/ShakeNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '936e8flAq9L248TlLh5Hzd0', 'ShakeNode');
// scripts/common/cmpt/ui/ShakeNode.ts

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
var Tween_1 = require("../../util/Tween");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
/**
 * 节点振动
 */
var ShakeNode = /** @class */ (function (_super) {
    __extends(ShakeNode, _super);
    function ShakeNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shakePower = 5;
        _this.shakeTime = 0.16;
        _this.timeScale = false;
        _this._tween = null;
        return _this;
    }
    /**
     * 振动
     * @param times 振动几个周期
     */
    ShakeNode.prototype.shake = function (times) {
        if (times === void 0) { times = 5; }
        if ((this._tween && this._tween.isPlaying()) || times <= 0 || this.shakePower <= 0 || this.shakeTime <= 0) {
            return;
        }
        var sv = cc.v2(0, this.shakePower);
        this.node.setPosition(sv);
        var xArr = [];
        var yArr = [];
        for (var i = 1; i <= 8; i++) {
            var v = sv.rotate(Math.PI / 4 * (i * 3));
            xArr.push(v.x);
            yArr.push(v.y);
        }
        this._tween = this.timeScale ? new Tween_1.Tween(this.node, Tween_1.SCALE_TWEEN) : new Tween_1.Tween(this.node);
        this._tween.to({ x: xArr, y: yArr }, this.shakeTime * 1000)
            .repeat(times)
            .start();
    };
    __decorate([
        property({ tooltip: CC_DEV && "振动幅度" })
    ], ShakeNode.prototype, "shakePower", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "振动周期，单位：秒" })
    ], ShakeNode.prototype, "shakeTime", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && "变化速度是否受到timeScale的影响"
        })
    ], ShakeNode.prototype, "timeScale", void 0);
    ShakeNode = __decorate([
        ccclass,
        disallowMultiple,
        menu("Framework/UI组件/ShakeNode")
    ], ShakeNode);
    return ShakeNode;
}(cc.Component));
exports.default = ShakeNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcU2hha2VOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFzRDtBQUVoRCxJQUFBLEtBQWdELEVBQUUsQ0FBQyxVQUFVLEVBQTNELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBQSxFQUFFLGdCQUFnQixzQkFBa0IsQ0FBQztBQUVwRTs7R0FFRztBQUlIO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBc0NDO1FBcENVLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBR3ZCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFLekIsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUUxQixZQUFNLEdBQW1CLElBQUksQ0FBQzs7SUEwQjFDLENBQUM7SUF4Qkc7OztPQUdHO0lBQ0kseUJBQUssR0FBWixVQUFhLEtBQWlCO1FBQWpCLHNCQUFBLEVBQUEsU0FBaUI7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDdkcsT0FBTztTQUNWO1FBRUQsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7UUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3RELE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDYixLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBbkNEO1FBREMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQztpREFDVjtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksV0FBVyxFQUFFLENBQUM7Z0RBQ2I7SUFLaEM7UUFIQyxRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsTUFBTSxJQUFJLHNCQUFzQjtTQUM1QyxDQUFDO2dEQUNnQztJQVZqQixTQUFTO1FBSDdCLE9BQU87UUFDUCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLDBCQUEwQixDQUFDO09BQ1osU0FBUyxDQXNDN0I7SUFBRCxnQkFBQztDQXRDRCxBQXNDQyxDQXRDc0MsRUFBRSxDQUFDLFNBQVMsR0FzQ2xEO2tCQXRDb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNDQUxFX1RXRUVOLCBUd2VlbiB9IGZyb20gXCIuLi8uLi91dGlsL1R3ZWVuXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51LCBkaXNhbGxvd011bHRpcGxlIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIOiKgueCueaMr+WKqFxyXG4gKi9cclxuQGNjY2xhc3NcclxuQGRpc2FsbG93TXVsdGlwbGVcclxuQG1lbnUoXCJGcmFtZXdvcmsvVUnnu4Tku7YvU2hha2VOb2RlXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYWtlTm9kZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBDQ19ERVYgJiYgXCLmjK/liqjluYXluqZcIiB9KVxyXG4gICAgcHVibGljIHNoYWtlUG93ZXI6IG51bWJlciA9IDU7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogQ0NfREVWICYmIFwi5oyv5Yqo5ZGo5pyf77yM5Y2V5L2N77ya56eSXCIgfSlcclxuICAgIHB1YmxpYyBzaGFrZVRpbWU6IG51bWJlciA9IDAuMTY7XHJcblxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgXCLlj5jljJbpgJ/luqbmmK/lkKblj5fliLB0aW1lU2NhbGXnmoTlvbHlk41cIlxyXG4gICAgfSlcclxuICAgIHB1YmxpYyB0aW1lU2NhbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF90d2VlbjogVHdlZW48Y2MuTm9kZT4gPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oyv5YqoXHJcbiAgICAgKiBAcGFyYW0gdGltZXMg5oyv5Yqo5Yeg5Liq5ZGo5pyfXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaGFrZSh0aW1lczogbnVtYmVyID0gNSkge1xyXG4gICAgICAgIGlmICgodGhpcy5fdHdlZW4gJiYgdGhpcy5fdHdlZW4uaXNQbGF5aW5nKCkpIHx8IHRpbWVzIDw9IDAgfHwgdGhpcy5zaGFrZVBvd2VyIDw9IDAgfHwgdGhpcy5zaGFrZVRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3YgPSBjYy52MigwLCB0aGlzLnNoYWtlUG93ZXIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihzdik7XHJcbiAgICAgICAgbGV0IHhBcnI6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgbGV0IHlBcnI6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gODsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB2ID0gc3Yucm90YXRlKE1hdGguUEkgLyA0ICogKGkgKiAzKSk7XHJcbiAgICAgICAgICAgIHhBcnIucHVzaCh2LngpO1xyXG4gICAgICAgICAgICB5QXJyLnB1c2godi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3R3ZWVuID0gdGhpcy50aW1lU2NhbGUgPyBuZXcgVHdlZW4odGhpcy5ub2RlLCBTQ0FMRV9UV0VFTikgOiBuZXcgVHdlZW4odGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLl90d2Vlbi50byh7IHg6IHhBcnIsIHk6IHlBcnIgfSwgdGhpcy5zaGFrZVRpbWUgKiAxMDAwKVxyXG4gICAgICAgICAgICAucmVwZWF0KHRpbWVzKVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH1cclxufVxyXG4iXX0=