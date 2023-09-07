"use strict";
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