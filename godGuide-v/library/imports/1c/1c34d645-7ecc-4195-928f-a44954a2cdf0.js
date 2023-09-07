"use strict";
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