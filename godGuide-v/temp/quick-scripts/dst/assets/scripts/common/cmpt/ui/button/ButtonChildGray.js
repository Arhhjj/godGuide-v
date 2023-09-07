
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/button/ButtonChildGray.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '19687AwHRhAjoLcsGZTr1YH', 'ButtonChildGray');
// scripts/common/cmpt/ui/button/ButtonChildGray.ts

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
var ButtonHack_1 = require("../../../hack/ButtonHack");
var Tool_1 = require("../../../util/Tool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode;
/**
 * 根据button组件过渡状态，置灰子节点
 */
var ButtonChildGray = /** @class */ (function (_super) {
    __extends(ButtonChildGray, _super);
    function ButtonChildGray() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.relatedNodes = [];
        _this.normalMaterial = null;
        _this.grayMaterial = null;
        return _this;
    }
    ButtonChildGray.prototype.onLoad = function () {
        this.node.on(ButtonHack_1.ButtonHackEvent.STATE_CHANGE, this.onStateChange, this);
    };
    ButtonChildGray.prototype.onStateChange = function (state) {
        var _this = this;
        if (state === ButtonHack_1.ButtonState.DISABLED) {
            if (!this.grayMaterial) {
                this.grayMaterial = cc.Material.getBuiltinMaterial("2d-gray-sprite");
            }
            var cb = function (n) {
                var rc = n.getComponent(cc.RenderComponent);
                if (rc && (rc instanceof cc.Sprite || rc instanceof cc.Label)) {
                    rc.setMaterial(0, _this.grayMaterial);
                }
            };
            Tool_1.default.nodeRecursive(this.node.children, cb);
            Tool_1.default.nodeRecursive(this.relatedNodes, cb);
        }
        else {
            if (!this.normalMaterial) {
                this.normalMaterial = cc.Material.getBuiltinMaterial("2d-sprite");
            }
            var cb = function (n) {
                var rc = n.getComponent(cc.RenderComponent);
                if (rc && (rc instanceof cc.Sprite || rc instanceof cc.Label)) {
                    rc.setMaterial(0, _this.normalMaterial);
                }
            };
            Tool_1.default.nodeRecursive(this.node.children, cb);
            Tool_1.default.nodeRecursive(this.relatedNodes, cb);
        }
    };
    __decorate([
        property({ type: cc.Node, tooltip: CC_DEV && "需要同步置灰的关联节点" })
    ], ButtonChildGray.prototype, "relatedNodes", void 0);
    __decorate([
        property(cc.Material)
    ], ButtonChildGray.prototype, "normalMaterial", void 0);
    __decorate([
        property(cc.Material)
    ], ButtonChildGray.prototype, "grayMaterial", void 0);
    ButtonChildGray = __decorate([
        ccclass,
        executeInEditMode,
        requireComponent(cc.Button),
        menu("Framework/UI组件/ButtonChildGray")
    ], ButtonChildGray);
    return ButtonChildGray;
}(cc.Component));
exports.default = ButtonChildGray;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcYnV0dG9uXFxCdXR0b25DaGlsZEdyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXdFO0FBQ3hFLDJDQUFzQztBQUVoQyxJQUFBLEtBQW1FLEVBQUUsQ0FBQyxVQUFVLEVBQTlFLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLGlCQUFpQix1QkFBa0IsQ0FBQztBQUV2Rjs7R0FFRztBQUtIO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBcUNDO1FBbkN5RSxrQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUNyRSxvQkFBYyxHQUFnQixJQUFJLENBQUM7UUFDbkMsa0JBQVksR0FBZ0IsSUFBSSxDQUFDOztJQWlDbkUsQ0FBQztJQS9CYSxnQ0FBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDRCQUFlLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVPLHVDQUFhLEdBQXJCLFVBQXNCLEtBQWtCO1FBQXhDLGlCQTBCQztRQXpCRyxJQUFJLEtBQUssS0FBSyx3QkFBVyxDQUFDLFFBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDeEU7WUFDRCxJQUFJLEVBQUUsR0FBRyxVQUFDLENBQVU7Z0JBQ2hCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsTUFBTSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzNELEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDeEM7WUFDTCxDQUFDLENBQUM7WUFDRixjQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLGNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM3QzthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNyRTtZQUNELElBQUksRUFBRSxHQUFHLFVBQUMsQ0FBVTtnQkFDaEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzVDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDM0QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUMxQztZQUNMLENBQUMsQ0FBQztZQUNGLGNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsY0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQWxDOEQ7UUFBOUQsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxhQUFhLEVBQUUsQ0FBQzt5REFBcUM7SUFDNUU7UUFBdEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7MkRBQTJDO0lBQzFDO1FBQXRCLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO3lEQUF5QztJQUo5QyxlQUFlO1FBSm5DLE9BQU87UUFDUCxpQkFBaUI7UUFDakIsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsZ0NBQWdDLENBQUM7T0FDbEIsZUFBZSxDQXFDbkM7SUFBRCxzQkFBQztDQXJDRCxBQXFDQyxDQXJDNEMsRUFBRSxDQUFDLFNBQVMsR0FxQ3hEO2tCQXJDb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvbkhhY2tFdmVudCwgQnV0dG9uU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vaGFjay9CdXR0b25IYWNrXCI7XHJcbmltcG9ydCBUb29sIGZyb20gXCIuLi8uLi8uLi91dGlsL1Rvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUsIHJlcXVpcmVDb21wb25lbnQsIGV4ZWN1dGVJbkVkaXRNb2RlIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIOagueaNrmJ1dHRvbue7hOS7tui/h+a4oeeKtuaAge+8jOe9rueBsOWtkOiKgueCuVxyXG4gKi9cclxuQGNjY2xhc3NcclxuQGV4ZWN1dGVJbkVkaXRNb2RlXHJcbkByZXF1aXJlQ29tcG9uZW50KGNjLkJ1dHRvbilcclxuQG1lbnUoXCJGcmFtZXdvcmsvVUnnu4Tku7YvQnV0dG9uQ2hpbGRHcmF5XCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbkNoaWxkR3JheSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogQ0NfREVWICYmIFwi6ZyA6KaB5ZCM5q2l572u54Gw55qE5YWz6IGU6IqC54K5XCIgfSkgcHVibGljIHJlbGF0ZWROb2RlczogY2MuTm9kZVtdID0gW107XHJcbiAgICBAcHJvcGVydHkoY2MuTWF0ZXJpYWwpIHB1YmxpYyBub3JtYWxNYXRlcmlhbDogY2MuTWF0ZXJpYWwgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk1hdGVyaWFsKSBwdWJsaWMgZ3JheU1hdGVyaWFsOiBjYy5NYXRlcmlhbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oQnV0dG9uSGFja0V2ZW50LlNUQVRFX0NIQU5HRSwgdGhpcy5vblN0YXRlQ2hhbmdlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU3RhdGVDaGFuZ2Uoc3RhdGU6IEJ1dHRvblN0YXRlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHN0YXRlID09PSBCdXR0b25TdGF0ZS5ESVNBQkxFRCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ3JheU1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXlNYXRlcmlhbCA9IGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjYiA9IChuOiBjYy5Ob2RlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmMgPSBuLmdldENvbXBvbmVudChjYy5SZW5kZXJDb21wb25lbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJjICYmIChyYyBpbnN0YW5jZW9mIGNjLlNwcml0ZSB8fCByYyBpbnN0YW5jZW9mIGNjLkxhYmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJjLnNldE1hdGVyaWFsKDAsIHRoaXMuZ3JheU1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgVG9vbC5ub2RlUmVjdXJzaXZlKHRoaXMubm9kZS5jaGlsZHJlbiwgY2IpO1xyXG4gICAgICAgICAgICBUb29sLm5vZGVSZWN1cnNpdmUodGhpcy5yZWxhdGVkTm9kZXMsIGNiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubm9ybWFsTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9ybWFsTWF0ZXJpYWwgPSBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNiID0gKG46IGNjLk5vZGUpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByYyA9IG4uZ2V0Q29tcG9uZW50KGNjLlJlbmRlckNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmMgJiYgKHJjIGluc3RhbmNlb2YgY2MuU3ByaXRlIHx8IHJjIGluc3RhbmNlb2YgY2MuTGFiZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmMuc2V0TWF0ZXJpYWwoMCwgdGhpcy5ub3JtYWxNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFRvb2wubm9kZVJlY3Vyc2l2ZSh0aGlzLm5vZGUuY2hpbGRyZW4sIGNiKTtcclxuICAgICAgICAgICAgVG9vbC5ub2RlUmVjdXJzaXZlKHRoaXMucmVsYXRlZE5vZGVzLCBjYik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==