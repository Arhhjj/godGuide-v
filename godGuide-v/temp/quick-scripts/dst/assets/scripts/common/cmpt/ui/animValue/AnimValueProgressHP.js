
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/animValue/AnimValueProgressHP.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c3afeSdbzBJDJZejppXH98u', 'AnimValueProgressHP');
// scripts/common/cmpt/ui/animValue/AnimValueProgressHP.ts

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
var AnimValueProgress_1 = require("./AnimValueProgress");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode;
/**
 * 血条组件
 */
var AnimValueProgressHP = /** @class */ (function (_super) {
    __extends(AnimValueProgressHP, _super);
    function AnimValueProgressHP() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.barShadow = null;
        return _this;
    }
    AnimValueProgressHP.prototype.setBarShadow = function (progress) {
        switch (this.progressBar.mode) {
            case cc.ProgressBar.Mode.HORIZONTAL:
                this.barShadow.node.width = this.progressBar.totalLength * progress;
                break;
            case cc.ProgressBar.Mode.VERTICAL:
                this.barShadow.node.height = this.progressBar.totalLength * progress;
                break;
            case cc.ProgressBar.Mode.FILLED:
                this.barShadow.fillRange = progress;
            default:
                break;
        }
    };
    /**
     * @override
     */
    AnimValueProgressHP.prototype.onAnimStart = function () {
        if (this.isAdd) {
        }
        else {
            this.progressBar.progress = this.endValue;
        }
    };
    /**
     * @override
     */
    AnimValueProgressHP.prototype.onAnimUpdate = function () {
        if (this.isAdd) {
            this.setBarShadow(this.curValue);
            this.progressBar.progress = this.curValue;
        }
        else {
            this.setBarShadow(this.curValue);
        }
    };
    __decorate([
        property({
            type: cc.Sprite,
            tooltip: CC_DEV && "血条阴影，如果barSprite渲染模式为filled模式，此sprite也要对应修改，保持一致"
        })
    ], AnimValueProgressHP.prototype, "barShadow", void 0);
    AnimValueProgressHP = __decorate([
        ccclass,
        executeInEditMode,
        requireComponent(cc.ProgressBar),
        menu("Framework/UI组件/AnimValueProgressHP")
    ], AnimValueProgressHP);
    return AnimValueProgressHP;
}(AnimValueProgress_1.default));
exports.default = AnimValueProgressHP;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcYW5pbVZhbHVlXFxBbmltVmFsdWVQcm9ncmVzc0hQLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUU5QyxJQUFBLEtBQW1FLEVBQUUsQ0FBQyxVQUFVLEVBQTlFLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLGlCQUFpQix1QkFBa0IsQ0FBQztBQUV2Rjs7R0FFRztBQUtIO0lBQWlELHVDQUFpQjtJQUFsRTtRQUFBLHFFQTRDQztRQXZDVSxlQUFTLEdBQWMsSUFBSSxDQUFDOztJQXVDdkMsQ0FBQztJQXJDVywwQ0FBWSxHQUFwQixVQUFxQixRQUFnQjtRQUNqQyxRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQzNCLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVTtnQkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztnQkFDcEUsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztnQkFDckUsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTTtnQkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQ3hDO2dCQUNJLE1BQU07U0FDYjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNPLHlDQUFXLEdBQXJCO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1NBRWY7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDTywwQ0FBWSxHQUF0QjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDN0M7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQXRDRDtRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTTtZQUNmLE9BQU8sRUFBRSxNQUFNLElBQUksa0RBQWtEO1NBQ3hFLENBQUM7MERBQ2lDO0lBTGxCLG1CQUFtQjtRQUp2QyxPQUFPO1FBQ1AsaUJBQWlCO1FBQ2pCLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDO09BQ3RCLG1CQUFtQixDQTRDdkM7SUFBRCwwQkFBQztDQTVDRCxBQTRDQyxDQTVDZ0QsMkJBQWlCLEdBNENqRTtrQkE1Q29CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbmltVmFsdWVQcm9ncmVzcyBmcm9tIFwiLi9BbmltVmFsdWVQcm9ncmVzc1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSwgcmVxdWlyZUNvbXBvbmVudCwgZXhlY3V0ZUluRWRpdE1vZGUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICog6KGA5p2h57uE5Lu2XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5AZXhlY3V0ZUluRWRpdE1vZGVcclxuQHJlcXVpcmVDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpXHJcbkBtZW51KFwiRnJhbWV3b3JrL1VJ57uE5Lu2L0FuaW1WYWx1ZVByb2dyZXNzSFBcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbVZhbHVlUHJvZ3Jlc3NIUCBleHRlbmRzIEFuaW1WYWx1ZVByb2dyZXNzIHtcclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiBcIuihgOadoemYtOW9se+8jOWmguaenGJhclNwcml0Zea4suafk+aooeW8j+S4umZpbGxlZOaooeW8j++8jOatpHNwcml0ZeS5n+imgeWvueW6lOS/ruaUue+8jOS/neaMgeS4gOiHtFwiXHJcbiAgICB9KVxyXG4gICAgcHVibGljIGJhclNoYWRvdzogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHNldEJhclNoYWRvdyhwcm9ncmVzczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb2dyZXNzQmFyLm1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5Qcm9ncmVzc0Jhci5Nb2RlLkhPUklaT05UQUw6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhclNoYWRvdy5ub2RlLndpZHRoID0gdGhpcy5wcm9ncmVzc0Jhci50b3RhbExlbmd0aCAqIHByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuUHJvZ3Jlc3NCYXIuTW9kZS5WRVJUSUNBTDpcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFyU2hhZG93Lm5vZGUuaGVpZ2h0ID0gdGhpcy5wcm9ncmVzc0Jhci50b3RhbExlbmd0aCAqIHByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuUHJvZ3Jlc3NCYXIuTW9kZS5GSUxMRUQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhclNoYWRvdy5maWxsUmFuZ2UgPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25BbmltU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNBZGQpIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHRoaXMuZW5kVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkFuaW1VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNBZGQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRCYXJTaGFkb3codGhpcy5jdXJWYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSB0aGlzLmN1clZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QmFyU2hhZG93KHRoaXMuY3VyVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=