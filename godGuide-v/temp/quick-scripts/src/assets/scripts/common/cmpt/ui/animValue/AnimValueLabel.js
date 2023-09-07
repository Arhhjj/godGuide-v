"use strict";
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