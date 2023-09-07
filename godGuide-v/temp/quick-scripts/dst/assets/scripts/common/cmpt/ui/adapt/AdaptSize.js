
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/adapt/AdaptSize.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6c391dfrNBD95q+Uj9I1ejA', 'AdaptSize');
// scripts/common/cmpt/ui/adapt/AdaptSize.ts

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
var EventName_1 = require("../../../const/EventName");
var Events_1 = require("../../../util/Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode;
/**
 * - 适配组件，使节点与设计分辨率size保持一致，不影响节点位置
 * - 不使用cc.Widget是因为某些需要改变节点position的情况下会产生冲突
 */
var AdaptSize = /** @class */ (function (_super) {
    __extends(AdaptSize, _super);
    function AdaptSize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptSize.prototype.onLoad = function () {
        this.adapt();
    };
    AdaptSize.prototype.adapt = function () {
        if (CC_EDITOR) {
            this.node.width = cc["engine"].getDesignResolutionSize().width;
            this.node.height = cc["engine"].getDesignResolutionSize().height;
        }
        else {
            this.node.width = cc.winSize.width;
            this.node.height = cc.winSize.height;
        }
    };
    __decorate([
        Events_1.preloadEvent(EventName_1.EventName.RESIZE)
    ], AdaptSize.prototype, "adapt", null);
    AdaptSize = __decorate([
        ccclass,
        Events_1.eventsOnLoad(),
        executeInEditMode,
        menu("Framework/UI组件/AdaptSize")
    ], AdaptSize);
    return AdaptSize;
}(cc.Component));
exports.default = AdaptSize;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcYWRhcHRcXEFkYXB0U2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFDckQsK0NBQWtFO0FBRTVELElBQUEsS0FBaUQsRUFBRSxDQUFDLFVBQVUsRUFBNUQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsaUJBQWlCLHVCQUFrQixDQUFDO0FBRXJFOzs7R0FHRztBQUtIO0lBQXVDLDZCQUFZO0lBQW5EOztJQWVBLENBQUM7SUFkYSwwQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBR08seUJBQUssR0FBYjtRQUNJLElBQUksU0FBUyxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHVCQUF1QixFQUFFLENBQUMsS0FBSyxDQUFDO1lBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNwRTthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBUkQ7UUFEQyxxQkFBWSxDQUFDLHFCQUFTLENBQUMsTUFBTSxDQUFDOzBDQVM5QjtJQWRnQixTQUFTO1FBSjdCLE9BQU87UUFDUCxxQkFBWSxFQUFFO1FBQ2QsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQywwQkFBMEIsQ0FBQztPQUNaLFNBQVMsQ0FlN0I7SUFBRCxnQkFBQztDQWZELEFBZUMsQ0Fmc0MsRUFBRSxDQUFDLFNBQVMsR0FlbEQ7a0JBZm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudE5hbWUgfSBmcm9tIFwiLi4vLi4vLi4vY29uc3QvRXZlbnROYW1lXCI7XHJcbmltcG9ydCB7IGV2ZW50c09uTG9hZCwgcHJlbG9hZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWwvRXZlbnRzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51LCBleGVjdXRlSW5FZGl0TW9kZSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiAtIOmAgumFjee7hOS7tu+8jOS9v+iKgueCueS4juiuvuiuoeWIhui+qOeOh3NpemXkv53mjIHkuIDoh7TvvIzkuI3lvbHlk43oioLngrnkvY3nva5cclxuICogLSDkuI3kvb/nlKhjYy5XaWRnZXTmmK/lm6DkuLrmn5DkupvpnIDopoHmlLnlj5joioLngrlwb3NpdGlvbueahOaDheWGteS4i+S8muS6p+eUn+WGsueqgVxyXG4gKi9cclxuQGNjY2xhc3NcclxuQGV2ZW50c09uTG9hZCgpXHJcbkBleGVjdXRlSW5FZGl0TW9kZVxyXG5AbWVudShcIkZyYW1ld29yay9VSee7hOS7ti9BZGFwdFNpemVcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRhcHRTaXplIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGFwdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcmVsb2FkRXZlbnQoRXZlbnROYW1lLlJFU0laRSlcclxuICAgIHByaXZhdGUgYWRhcHQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBjY1tcImVuZ2luZVwiXS5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gY2NbXCJlbmdpbmVcIl0uZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2Mud2luU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=