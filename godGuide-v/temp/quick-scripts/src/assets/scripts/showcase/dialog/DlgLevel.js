"use strict";
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