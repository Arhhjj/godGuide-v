
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/button/ButtonChildPos.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1c34dZFfsxBlZKPpElUos3w', 'ButtonChildPos');
// scripts/common/cmpt/ui/button/ButtonChildPos.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, requireComponent = _a.requireComponent;
/**
 * 根据button组件过渡状态，移动子节点坐标
 */
var ButtonChildPos = /** @class */ (function (_super) {
    __extends(ButtonChildPos, _super);
    function ButtonChildPos() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.normal = cc.v2(0, 0);
        _this.pressed = cc.v2(0, 0);
        _this.hover = cc.v2(0, 0);
        _this.disabled = cc.v2(0, 0);
        return _this;
    }
    ButtonChildPos.prototype.onLoad = function () {
        this.node.on(ButtonHack_1.ButtonHackEvent.STATE_CHANGE, this.onStateChange, this);
    };
    ButtonChildPos.prototype.onStateChange = function (state) {
        var pos = cc.v2(0, 0);
        switch (state) {
            case ButtonHack_1.ButtonState.NORMAL:
                pos = this.normal;
                break;
            case ButtonHack_1.ButtonState.PRESSED:
                pos = this.pressed;
                break;
            case ButtonHack_1.ButtonState.HOVER:
                pos = this.hover;
                break;
            case ButtonHack_1.ButtonState.DISABLED:
                pos = this.disabled;
                break;
            default:
                break;
        }
        this.node.children.forEach(function (e) {
            e.setPosition(pos);
        });
    };
    __decorate([
        property({ tooltip: CC_DEV && "普通状态下按钮子节点坐标" })
    ], ButtonChildPos.prototype, "normal", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "按下状态下按钮子节点坐标" })
    ], ButtonChildPos.prototype, "pressed", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "悬停状态下按钮子节点坐标" })
    ], ButtonChildPos.prototype, "hover", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "禁用状态下按钮子节点坐标" })
    ], ButtonChildPos.prototype, "disabled", void 0);
    ButtonChildPos = __decorate([
        ccclass,
        requireComponent(cc.Button),
        menu("Framework/UI组件/ButtonChildPos")
    ], ButtonChildPos);
    return ButtonChildPos;
}(cc.Component));
exports.default = ButtonChildPos;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcYnV0dG9uXFxCdXR0b25DaGlsZFBvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBd0U7QUFFbEUsSUFBQSxLQUFnRCxFQUFFLENBQUMsVUFBVSxFQUEzRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQWtCLENBQUM7QUFFcEU7O0dBRUc7QUFJSDtJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQWdDQztRQS9CMkQsWUFBTSxHQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLGFBQU8sR0FBWSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixXQUFLLEdBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsY0FBUSxHQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztJQTRCNUYsQ0FBQztJQTFCYSwrQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDRCQUFlLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVPLHNDQUFhLEdBQXJCLFVBQXNCLEtBQWtCO1FBQ3BDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLFFBQVEsS0FBSyxFQUFFO1lBQ1gsS0FBSyx3QkFBVyxDQUFDLE1BQU07Z0JBQ25CLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNsQixNQUFNO1lBQ1YsS0FBSyx3QkFBVyxDQUFDLE9BQU87Z0JBQ3BCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNuQixNQUFNO1lBQ1YsS0FBSyx3QkFBVyxDQUFDLEtBQUs7Z0JBQ2xCLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNqQixNQUFNO1lBQ1YsS0FBSyx3QkFBVyxDQUFDLFFBQVE7Z0JBQ3JCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNwQixNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTlCZ0Q7UUFBaEQsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxjQUFjLEVBQUUsQ0FBQztrREFBc0M7SUFDckM7UUFBaEQsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxjQUFjLEVBQUUsQ0FBQzttREFBdUM7SUFDdEM7UUFBaEQsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxjQUFjLEVBQUUsQ0FBQztpREFBcUM7SUFDcEM7UUFBaEQsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxjQUFjLEVBQUUsQ0FBQztvREFBd0M7SUFKdkUsY0FBYztRQUhsQyxPQUFPO1FBQ1AsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsK0JBQStCLENBQUM7T0FDakIsY0FBYyxDQWdDbEM7SUFBRCxxQkFBQztDQWhDRCxBQWdDQyxDQWhDMkMsRUFBRSxDQUFDLFNBQVMsR0FnQ3ZEO2tCQWhDb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvbkhhY2tFdmVudCwgQnV0dG9uU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vaGFjay9CdXR0b25IYWNrXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51LCByZXF1aXJlQ29tcG9uZW50IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIOagueaNrmJ1dHRvbue7hOS7tui/h+a4oeeKtuaAge+8jOenu+WKqOWtkOiKgueCueWdkOagh1xyXG4gKi9cclxuQGNjY2xhc3NcclxuQHJlcXVpcmVDb21wb25lbnQoY2MuQnV0dG9uKVxyXG5AbWVudShcIkZyYW1ld29yay9VSee7hOS7ti9CdXR0b25DaGlsZFBvc1wiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b25DaGlsZFBvcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBDQ19ERVYgJiYgXCLmma7pgJrnirbmgIHkuIvmjInpkq7lrZDoioLngrnlnZDmoIdcIiB9KSBwdWJsaWMgbm9ybWFsOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBDQ19ERVYgJiYgXCLmjInkuIvnirbmgIHkuIvmjInpkq7lrZDoioLngrnlnZDmoIdcIiB9KSBwdWJsaWMgcHJlc3NlZDogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogQ0NfREVWICYmIFwi5oKs5YGc54q25oCB5LiL5oyJ6ZKu5a2Q6IqC54K55Z2Q5qCHXCIgfSkgcHVibGljIGhvdmVyOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBDQ19ERVYgJiYgXCLnpoHnlKjnirbmgIHkuIvmjInpkq7lrZDoioLngrnlnZDmoIdcIiB9KSBwdWJsaWMgZGlzYWJsZWQ6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihCdXR0b25IYWNrRXZlbnQuU1RBVEVfQ0hBTkdFLCB0aGlzLm9uU3RhdGVDaGFuZ2UsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TdGF0ZUNoYW5nZShzdGF0ZTogQnV0dG9uU3RhdGUpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcG9zID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIEJ1dHRvblN0YXRlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgIHBvcyA9IHRoaXMubm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnV0dG9uU3RhdGUuUFJFU1NFRDpcclxuICAgICAgICAgICAgICAgIHBvcyA9IHRoaXMucHJlc3NlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1dHRvblN0YXRlLkhPVkVSOlxyXG4gICAgICAgICAgICAgICAgcG9zID0gdGhpcy5ob3ZlcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1dHRvblN0YXRlLkRJU0FCTEVEOlxyXG4gICAgICAgICAgICAgICAgcG9zID0gdGhpcy5kaXNhYmxlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbi5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=