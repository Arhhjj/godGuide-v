
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/dialog/DlgSign.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f1944gf/AFFOaTBYctN8omX', 'DlgSign');
// scripts/showcase/dialog/DlgSign.ts

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
var DlgSign = /** @class */ (function (_super) {
    __extends(DlgSign, _super);
    function DlgSign() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DlgSign.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        Events_1.default.targetOn(this);
    };
    DlgSign.prototype.onDestroy = function () {
        Events_1.default.targetOff(this);
    };
    DlgSign.prototype.update = function () { };
    DlgSign.pUrl = Url_1.DirUrl.PREFAB_DIALOG + "DlgSign";
    DlgSign = __decorate([
        ccclass
    ], DlgSign);
    return DlgSign;
}(DialogBase_1.default));
exports.default = DlgSign;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGRpYWxvZ1xcRGxnU2lnbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBMkQ7QUFDM0QsOENBQWdEO0FBQ2hELG1EQUE4QztBQUV4QyxJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQXpDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUdsRDtJQUFxQywyQkFBVTtJQUEvQzs7SUFjQSxDQUFDO0lBWGEsd0JBQU0sR0FBaEI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGdCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFUywyQkFBUyxHQUFuQjtRQUNJLGdCQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFUyx3QkFBTSxHQUFoQixjQUFxQixDQUFDO0lBWFIsWUFBSSxHQUFXLFlBQU0sQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO0lBRDdDLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FjM0I7SUFBRCxjQUFDO0NBZEQsQUFjQyxDQWRvQyxvQkFBVSxHQWM5QztrQkFkb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaWFsb2dCYXNlIGZyb20gXCIuLi8uLi9jb21tb24vY21wdC9iYXNlL0RpYWxvZ0Jhc2VcIjtcclxuaW1wb3J0IHsgRGlyVXJsIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25zdC9VcmxcIjtcclxuaW1wb3J0IEV2ZW50cyBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWwvRXZlbnRzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGxnU2lnbiBleHRlbmRzIERpYWxvZ0Jhc2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBwVXJsOiBzdHJpbmcgPSBEaXJVcmwuUFJFRkFCX0RJQUxPRyArIFwiRGxnU2lnblwiO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgRXZlbnRzLnRhcmdldE9uKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgRXZlbnRzLnRhcmdldE9mZih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKCkgeyB9XHJcblxyXG59XHJcbiJdfQ==