"use strict";
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