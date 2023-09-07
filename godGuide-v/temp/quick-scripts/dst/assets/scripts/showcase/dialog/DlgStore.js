
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/dialog/DlgStore.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bdc4fUopChJ+rPzHAjnTbeE', 'DlgStore');
// scripts/showcase/dialog/DlgStore.ts

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
var DlgStore = /** @class */ (function (_super) {
    __extends(DlgStore, _super);
    function DlgStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DlgStore.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        Events_1.default.targetOn(this);
    };
    DlgStore.prototype.onDestroy = function () {
        Events_1.default.targetOff(this);
    };
    /**
     * @override
     */
    DlgStore.prototype.onOpen = function () { };
    DlgStore.pUrl = Url_1.DirUrl.PREFAB_DIALOG + "DlgStore";
    DlgStore = __decorate([
        ccclass
    ], DlgStore);
    return DlgStore;
}(DialogBase_1.default));
exports.default = DlgStore;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGRpYWxvZ1xcRGxnU3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBRzNELDhDQUFnRDtBQUVoRCxtREFBOEM7QUFHeEMsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEQ7SUFBc0MsNEJBQVU7SUFBaEQ7O0lBaUJBLENBQUM7SUFkYSx5QkFBTSxHQUFoQjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVTLDRCQUFTLEdBQW5CO1FBQ0ksZ0JBQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0kseUJBQU0sR0FBYixjQUFrQixDQUFDO0lBZEwsYUFBSSxHQUFXLFlBQU0sQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO0lBRDlDLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FpQjVCO0lBQUQsZUFBQztDQWpCRCxBQWlCQyxDQWpCcUMsb0JBQVUsR0FpQi9DO2tCQWpCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaWFsb2dCYXNlIGZyb20gXCIuLi8uLi9jb21tb24vY21wdC9iYXNlL0RpYWxvZ0Jhc2VcIjtcclxuaW1wb3J0IExheWVyIGZyb20gXCIuLi8uLi9jb21tb24vY21wdC9iYXNlL0xheWVyXCI7XHJcbmltcG9ydCB7IEV2ZW50TmFtZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uc3QvRXZlbnROYW1lXCI7XHJcbmltcG9ydCB7IERpclVybCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uc3QvVXJsXCI7XHJcbmltcG9ydCBVc2VySW5mbywgeyBVc2VySW5mb1N0b3JnZSB9IGZyb20gXCIuLi8uLi9jb21tb24vcnVudGltZS9Vc2VySW5mb1wiO1xyXG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuLi8uLi9jb21tb24vdXRpbC9FdmVudHNcIjtcclxuaW1wb3J0IFRvb2wgZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsL1Rvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEbGdTdG9yZSBleHRlbmRzIERpYWxvZ0Jhc2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBwVXJsOiBzdHJpbmcgPSBEaXJVcmwuUFJFRkFCX0RJQUxPRyArIFwiRGxnU3RvcmVcIjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIEV2ZW50cy50YXJnZXRPbih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCkge1xyXG4gICAgICAgIEV2ZW50cy50YXJnZXRPZmYodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uT3BlbigpIHsgfVxyXG5cclxufVxyXG4iXX0=