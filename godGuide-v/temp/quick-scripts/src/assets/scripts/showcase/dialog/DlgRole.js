"use strict";
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