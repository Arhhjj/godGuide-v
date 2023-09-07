
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/animValue/AnimValueLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '93188RmKh1GHJhJYMxNsu+u', 'AnimValueLabel');
// scripts/common/cmpt/ui/animValue/AnimValueLabel.ts

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
 * 数值渐变的数字
 */
var AnimValueLabel = /** @class */ (function (_super) {
    __extends(AnimValueLabel, _super);
    function AnimValueLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._label = null;
        return _this;
    }
    Object.defineProperty(AnimValueLabel.prototype, "label", {
        get: function () {
            if (!this._label)
                this._label = this.getComponent(cc.Label);
            return this._label;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @override
     */
    AnimValueLabel.prototype.onAnimUpdate = function () {
        this.label.string = "" + Math.round(this.curValue);
    };
    AnimValueLabel = __decorate([
        ccclass,
        executeInEditMode,
        requireComponent(cc.Label),
        menu("Framework/UI组件/AnimValueLabel")
    ], AnimValueLabel);
    return AnimValueLabel;
}(AnimValue_1.default));
exports.default = AnimValueLabel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcYW5pbVZhbHVlXFxBbmltVmFsdWVMYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFFOUIsSUFBQSxLQUFtRSxFQUFFLENBQUMsVUFBVSxFQUE5RSxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxpQkFBaUIsdUJBQWtCLENBQUM7QUFFdkY7O0dBRUc7QUFLSDtJQUE0QyxrQ0FBUztJQUFyRDtRQUFBLHFFQWNDO1FBWlcsWUFBTSxHQUFhLElBQUksQ0FBQzs7SUFZcEMsQ0FBQztJQVhHLHNCQUFXLGlDQUFLO2FBQWhCO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQ7O09BRUc7SUFDTyxxQ0FBWSxHQUF0QjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFHLENBQUM7SUFDdkQsQ0FBQztJQWJnQixjQUFjO1FBSmxDLE9BQU87UUFDUCxpQkFBaUI7UUFDakIsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsK0JBQStCLENBQUM7T0FDakIsY0FBYyxDQWNsQztJQUFELHFCQUFDO0NBZEQsQUFjQyxDQWQyQyxtQkFBUyxHQWNwRDtrQkFkb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbmltVmFsdWUgZnJvbSBcIi4vQW5pbVZhbHVlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51LCByZXF1aXJlQ29tcG9uZW50LCBleGVjdXRlSW5FZGl0TW9kZSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiDmlbDlgLzmuJDlj5jnmoTmlbDlrZdcclxuICovXHJcbkBjY2NsYXNzXHJcbkBleGVjdXRlSW5FZGl0TW9kZVxyXG5AcmVxdWlyZUNvbXBvbmVudChjYy5MYWJlbClcclxuQG1lbnUoXCJGcmFtZXdvcmsvVUnnu4Tku7YvQW5pbVZhbHVlTGFiZWxcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbVZhbHVlTGFiZWwgZXh0ZW5kcyBBbmltVmFsdWUge1xyXG5cclxuICAgIHByaXZhdGUgX2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCk6IGNjLkxhYmVsIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xhYmVsKSB0aGlzLl9sYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQW5pbVVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IGAke01hdGgucm91bmQodGhpcy5jdXJWYWx1ZSl9YDtcclxuICAgIH1cclxufVxyXG4iXX0=