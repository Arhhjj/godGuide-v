
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/dialog/DlgRole.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '31c8afnQq1Lq702NAstz5ei', 'DlgRole');
// scripts/showcase/dialog/DlgRole.ts

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
var DlgRole = /** @class */ (function (_super) {
    __extends(DlgRole, _super);
    function DlgRole() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DlgRole.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        Events_1.default.targetOn(this);
    };
    DlgRole.prototype.onDestroy = function () {
        Events_1.default.targetOff(this);
    };
    DlgRole.prototype.update = function () { };
    /**
     * @override
     */
    DlgRole.prototype.onOpen = function () { };
    DlgRole.pUrl = Url_1.DirUrl.PREFAB_DIALOG + "DlgRole";
    DlgRole = __decorate([
        ccclass
    ], DlgRole);
    return DlgRole;
}(DialogBase_1.default));
exports.default = DlgRole;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGRpYWxvZ1xcRGxnUm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBMkQ7QUFDM0QsOENBQWdEO0FBQ2hELG1EQUE4QztBQUV4QyxJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQXpDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUdsRDtJQUFxQywyQkFBVTtJQUEvQzs7SUFrQkEsQ0FBQztJQWZhLHdCQUFNLEdBQWhCO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixnQkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRVMsMkJBQVMsR0FBbkI7UUFDSSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRVMsd0JBQU0sR0FBaEIsY0FBcUIsQ0FBQztJQUV0Qjs7T0FFRztJQUNJLHdCQUFNLEdBQWIsY0FBa0IsQ0FBQztJQWhCTCxZQUFJLEdBQVcsWUFBTSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFEN0MsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQWtCM0I7SUFBRCxjQUFDO0NBbEJELEFBa0JDLENBbEJvQyxvQkFBVSxHQWtCOUM7a0JBbEJvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpYWxvZ0Jhc2UgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbXB0L2Jhc2UvRGlhbG9nQmFzZVwiO1xyXG5pbXBvcnQgeyBEaXJVcmwgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbnN0L1VybFwiO1xyXG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuLi8uLi9jb21tb24vdXRpbC9FdmVudHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEbGdSb2xlIGV4dGVuZHMgRGlhbG9nQmFzZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHBVcmw6IHN0cmluZyA9IERpclVybC5QUkVGQUJfRElBTE9HICsgXCJEbGdSb2xlXCI7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBFdmVudHMudGFyZ2V0T24odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBFdmVudHMudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25PcGVuKCkgeyB9XHJcbn1cclxuXHJcblxyXG5cclxuIl19