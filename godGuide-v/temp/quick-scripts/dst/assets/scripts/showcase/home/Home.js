
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/home/Home.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1d227cGCflICZGjBQkLC7vS', 'Home');
// scripts/showcase/home/Home.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Layer_1 = require("../../common/cmpt/base/Layer");
var EventName_1 = require("../../common/const/EventName");
var Url_1 = require("../../common/const/Url");
var Events_1 = require("../../common/util/Events");
var DlgLevel_1 = require("../dialog/DlgLevel");
var DlgRole_1 = require("../dialog/DlgRole");
var DlgSign_1 = require("../dialog/DlgSign");
var DlgStore_1 = require("../dialog/DlgStore");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.onLoad = function () {
        Events_1.default.targetOn(this);
    };
    Home.prototype.onDestroy = function () {
        Events_1.default.targetOff(this);
    };
    Home.prototype.start = function () {
        Events_1.default.emit(EventName_1.EventName.EXCUTE_GUIDE_TASK, "guideTask1");
    };
    Home.prototype.addCoin = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Home.prototype.onClickGame = function () {
        Layer_1.default.inst.enterMain(Url_1.ResUrl.PREFAB.GAME);
    };
    Home.prototype.onClickLevel = function () {
        Layer_1.default.inst.openUniDialogAsync(DlgLevel_1.default.pUrl);
    };
    Home.prototype.onClickSign = function () {
        Layer_1.default.inst.openUniDialogAsync(DlgSign_1.default.pUrl);
    };
    Home.prototype.onClickRole = function () {
        Layer_1.default.inst.openUniDialogAsync(DlgRole_1.default.pUrl);
    };
    Home.prototype.onClickStore = function () {
        Layer_1.default.inst.openUniDialogAsync(DlgStore_1.default.pUrl);
    };
    __decorate([
        Events_1.preloadEvent(EventName_1.EventName.ADD_COIN)
    ], Home.prototype, "addCoin", null);
    Home = __decorate([
        ccclass
    ], Home);
    return Home;
}(cc.Component));
exports.default = Home;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGhvbWVcXEhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBQ2pELDBEQUF5RDtBQUN6RCw4Q0FBZ0Q7QUFDaEQsbURBQWdFO0FBQ2hFLCtDQUEwQztBQUMxQyw2Q0FBd0M7QUFDeEMsNkNBQXdDO0FBQ3hDLCtDQUEwQztBQUVwQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFrQyx3QkFBWTtJQUE5Qzs7SUF1Q0EsQ0FBQztJQXJDYSxxQkFBTSxHQUFoQjtRQUNJLGdCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFUyx3QkFBUyxHQUFuQjtRQUNJLGdCQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFUyxvQkFBSyxHQUFmO1FBQ0ksZ0JBQU0sQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUMxRCxDQUFDO0lBR0ssc0JBQU8sR0FBYjs7Ozs7O0tBRUM7SUFFTywwQkFBVyxHQUFuQjtRQUNJLGVBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLDJCQUFZLEdBQXBCO1FBQ0ksZUFBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTywwQkFBVyxHQUFuQjtRQUNJLGVBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU8sMEJBQVcsR0FBbkI7UUFDSSxlQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVPLDJCQUFZLEdBQXBCO1FBQ0ksZUFBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUF0QkQ7UUFEQyxxQkFBWSxDQUFDLHFCQUFTLENBQUMsUUFBUSxDQUFDO3VDQUdoQztJQWpCZ0IsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQXVDeEI7SUFBRCxXQUFDO0NBdkNELEFBdUNDLENBdkNpQyxFQUFFLENBQUMsU0FBUyxHQXVDN0M7a0JBdkNvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExheWVyIGZyb20gXCIuLi8uLi9jb21tb24vY21wdC9iYXNlL0xheWVyXCI7XHJcbmltcG9ydCB7IEV2ZW50TmFtZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uc3QvRXZlbnROYW1lXCI7XHJcbmltcG9ydCB7IFJlc1VybCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uc3QvVXJsXCI7XHJcbmltcG9ydCBFdmVudHMsIHsgcHJlbG9hZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsL0V2ZW50c1wiO1xyXG5pbXBvcnQgRGxnTGV2ZWwgZnJvbSBcIi4uL2RpYWxvZy9EbGdMZXZlbFwiO1xyXG5pbXBvcnQgRGxnUm9sZSBmcm9tIFwiLi4vZGlhbG9nL0RsZ1JvbGVcIjtcclxuaW1wb3J0IERsZ1NpZ24gZnJvbSBcIi4uL2RpYWxvZy9EbGdTaWduXCI7XHJcbmltcG9ydCBEbGdTdG9yZSBmcm9tIFwiLi4vZGlhbG9nL0RsZ1N0b3JlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICBFdmVudHMudGFyZ2V0T24odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBFdmVudHMudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudHMuZW1pdChFdmVudE5hbWUuRVhDVVRFX0dVSURFX1RBU0ssIFwiZ3VpZGVUYXNrMVwiKVxyXG4gICAgfVxyXG5cclxuICAgIEBwcmVsb2FkRXZlbnQoRXZlbnROYW1lLkFERF9DT0lOKVxyXG4gICAgYXN5bmMgYWRkQ29pbigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrR2FtZSgpIHtcclxuICAgICAgICBMYXllci5pbnN0LmVudGVyTWFpbihSZXNVcmwuUFJFRkFCLkdBTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0xldmVsKCkge1xyXG4gICAgICAgIExheWVyLmluc3Qub3BlblVuaURpYWxvZ0FzeW5jKERsZ0xldmVsLnBVcmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1NpZ24oKSB7XHJcbiAgICAgICAgTGF5ZXIuaW5zdC5vcGVuVW5pRGlhbG9nQXN5bmMoRGxnU2lnbi5wVXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tSb2xlKCkge1xyXG4gICAgICAgIExheWVyLmluc3Qub3BlblVuaURpYWxvZ0FzeW5jKERsZ1JvbGUucFVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU3RvcmUoKSB7XHJcbiAgICAgICAgTGF5ZXIuaW5zdC5vcGVuVW5pRGlhbG9nQXN5bmMoRGxnU3RvcmUucFVybCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==