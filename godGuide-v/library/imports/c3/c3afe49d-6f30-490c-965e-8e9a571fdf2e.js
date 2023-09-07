"use strict";
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