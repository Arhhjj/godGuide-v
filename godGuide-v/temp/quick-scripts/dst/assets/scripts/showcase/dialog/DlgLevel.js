
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/dialog/DlgLevel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '30e60gY31BNFpQWA4Yd11XL', 'DlgLevel');
// scripts/showcase/dialog/DlgLevel.ts

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
var DialogBase_1 = require("../../common/cmpt/base/DialogBase");
var Url_1 = require("../../common/const/Url");
var Events_1 = require("../../common/util/Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var DlgLevel = /** @class */ (function (_super) {
    __extends(DlgLevel, _super);
    function DlgLevel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DlgLevel.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        Events_1.default.targetOn(this);
    };
    DlgLevel.prototype.onDestroy = function () {
        Events_1.default.targetOff(this);
    };
    DlgLevel.prototype.update = function () { };
    /**
     * @override
     */
    DlgLevel.prototype.onOpen = function () { };
    DlgLevel.pUrl = Url_1.DirUrl.PREFAB_DIALOG + "DlgLevel";
    DlgLevel = __decorate([
        ccclass
    ], DlgLevel);
    return DlgLevel;
}(DialogBase_1.default));
exports.default = DlgLevel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGRpYWxvZ1xcRGxnTGV2ZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBRTNELDhDQUF3RDtBQUd4RCxtREFBOEM7QUFFeEMsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEQ7SUFBc0MsNEJBQVU7SUFBaEQ7O0lBbUJBLENBQUM7SUFoQmEseUJBQU0sR0FBaEI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGdCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFUyw0QkFBUyxHQUFuQjtRQUNJLGdCQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFUyx5QkFBTSxHQUFoQixjQUFxQixDQUFDO0lBRXRCOztPQUVHO0lBQ0kseUJBQU0sR0FBYixjQUFrQixDQUFDO0lBaEJMLGFBQUksR0FBVyxZQUFNLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztJQUQ5QyxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBbUI1QjtJQUFELGVBQUM7Q0FuQkQsQUFtQkMsQ0FuQnFDLG9CQUFVLEdBbUIvQztrQkFuQm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlhbG9nQmFzZSBmcm9tIFwiLi4vLi4vY29tbW9uL2NtcHQvYmFzZS9EaWFsb2dCYXNlXCI7XHJcbmltcG9ydCBMYXllciBmcm9tIFwiLi4vLi4vY29tbW9uL2NtcHQvYmFzZS9MYXllclwiO1xyXG5pbXBvcnQgeyBEaXJVcmwsIFJlc1VybCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uc3QvVXJsXCI7XHJcbmltcG9ydCBHbG9iYWxJbmZvIGZyb20gXCIuLi8uLi9jb21tb24vcnVudGltZS9HbG9iYWxJbmZvXCI7XHJcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vLi4vY29tbW9uL3J1bnRpbWUvVXNlckluZm9cIjtcclxuaW1wb3J0IEV2ZW50cyBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWwvRXZlbnRzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGxnTGV2ZWwgZXh0ZW5kcyBEaWFsb2dCYXNlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcFVybDogc3RyaW5nID0gRGlyVXJsLlBSRUZBQl9ESUFMT0cgKyBcIkRsZ0xldmVsXCI7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBFdmVudHMudGFyZ2V0T24odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBFdmVudHMudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25PcGVuKCkgeyB9XHJcblxyXG59XHJcbiJdfQ==