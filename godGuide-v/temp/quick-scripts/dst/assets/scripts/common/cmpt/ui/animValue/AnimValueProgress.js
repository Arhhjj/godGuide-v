
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/animValue/AnimValueProgress.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7f95cXxJPhAJaQaqRBZkHaC', 'AnimValueProgress');
// scripts/common/cmpt/ui/animValue/AnimValueProgress.ts

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
var AnimValue_1 = require("./AnimValue");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode;
/**
 * 数值渐变的进度条
 */
var AnimValueProgress = /** @class */ (function (_super) {
    __extends(AnimValueProgress, _super);
    function AnimValueProgress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._progressBar = null;
        return _this;
    }
    Object.defineProperty(AnimValueProgress.prototype, "progressBar", {
        get: function () {
            if (!this._progressBar)
                this._progressBar = this.getComponent(cc.ProgressBar);
            return this._progressBar;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @override
     */
    AnimValueProgress.prototype.onAnimUpdate = function () {
        this.progressBar.progress = this.curValue;
    };
    AnimValueProgress = __decorate([
        ccclass,
        executeInEditMode,
        requireComponent(cc.ProgressBar),
        menu("Framework/UI组件/AnimValueProgress")
    ], AnimValueProgress);
    return AnimValueProgress;
}(AnimValue_1.default));
exports.default = AnimValueProgress;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcYW5pbVZhbHVlXFxBbmltVmFsdWVQcm9ncmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFFOUIsSUFBQSxLQUFtRSxFQUFFLENBQUMsVUFBVSxFQUE5RSxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxpQkFBaUIsdUJBQWtCLENBQUM7QUFFdkY7O0dBRUc7QUFLSDtJQUErQyxxQ0FBUztJQUF4RDtRQUFBLHFFQWNDO1FBWlcsa0JBQVksR0FBbUIsSUFBSSxDQUFDOztJQVloRCxDQUFDO0lBWEcsc0JBQVcsMENBQVc7YUFBdEI7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7Z0JBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5RSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRDs7T0FFRztJQUNPLHdDQUFZLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUM5QyxDQUFDO0lBYmdCLGlCQUFpQjtRQUpyQyxPQUFPO1FBQ1AsaUJBQWlCO1FBQ2pCLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDO09BQ3BCLGlCQUFpQixDQWNyQztJQUFELHdCQUFDO0NBZEQsQUFjQyxDQWQ4QyxtQkFBUyxHQWN2RDtrQkFkb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFuaW1WYWx1ZSBmcm9tIFwiLi9BbmltVmFsdWVcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUsIHJlcXVpcmVDb21wb25lbnQsIGV4ZWN1dGVJbkVkaXRNb2RlIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIOaVsOWAvOa4kOWPmOeahOi/m+W6puadoVxyXG4gKi9cclxuQGNjY2xhc3NcclxuQGV4ZWN1dGVJbkVkaXRNb2RlXHJcbkByZXF1aXJlQ29tcG9uZW50KGNjLlByb2dyZXNzQmFyKVxyXG5AbWVudShcIkZyYW1ld29yay9VSee7hOS7ti9BbmltVmFsdWVQcm9ncmVzc1wiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltVmFsdWVQcm9ncmVzcyBleHRlbmRzIEFuaW1WYWx1ZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcHJvZ3Jlc3NCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgcHJvZ3Jlc3NCYXIoKTogY2MuUHJvZ3Jlc3NCYXIge1xyXG4gICAgICAgIGlmICghdGhpcy5fcHJvZ3Jlc3NCYXIpIHRoaXMuX3Byb2dyZXNzQmFyID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9ncmVzc0JhcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25BbmltVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSB0aGlzLmN1clZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==