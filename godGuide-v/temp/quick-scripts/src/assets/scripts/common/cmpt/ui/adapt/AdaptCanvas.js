"use strict";
cc._RF.push(module, '2174f+PKGlGH7csvm0koWVs', 'AdaptCanvas');
// scripts/common/cmpt/ui/adapt/AdaptCanvas.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
// 仅web有效
cc.view.setResizeCallback(function () {
    Events_1.default.emit(EventName_1.EventName.RESIZE);
});
/**
 * 分辨率适配组件，保证设计分辨率区域全部都能显示
 */
var AdaptCanvas = /** @class */ (function (_super) {
    __extends(AdaptCanvas, _super);
    function AdaptCanvas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptCanvas.prototype.onLoad = function () {
        this.adapt();
    };
    AdaptCanvas.prototype.adapt = function () {
        var resolutionRatio = cc.Canvas.instance.designResolution.width / cc.Canvas.instance.designResolution.height;
        var ratio = cc.winSize.width / cc.winSize.height;
        if (ratio > resolutionRatio) {
            cc.Canvas.instance.fitHeight = true;
            cc.Canvas.instance.fitWidth = false;
        }
        else {
            cc.Canvas.instance.fitHeight = false;
            cc.Canvas.instance.fitWidth = true;
        }
    };
    __decorate([
        Events_1.preloadEvent(EventName_1.EventName.RESIZE)
    ], AdaptCanvas.prototype, "adapt", null);
    AdaptCanvas = __decorate([
        ccclass,
        Events_1.eventsOnLoad(),
        disallowMultiple,
        menu("Framework/UI组件/AdaptCanvas")
    ], AdaptCanvas);
    return AdaptCanvas;
}(cc.Component));
exports.default = AdaptCanvas;

cc._RF.pop();