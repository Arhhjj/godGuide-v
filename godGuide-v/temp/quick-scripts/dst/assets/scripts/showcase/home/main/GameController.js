
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/home/main/GameController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a485dwPWwRG2JkV3PtgayiE', 'GameController');
// scripts/showcase/home/main/GameController.ts

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
var Layer_1 = require("../../../common/cmpt/base/Layer");
var EventName_1 = require("../../../common/const/EventName");
var EnumIndex_1 = require("../../../common/runtime/EnumIndex");
var Events_1 = require("../../../common/util/Events");
var Tool_1 = require("../../../common/util/Tool");
var BarrierManager_1 = require("./BarrierManager");
var MoveCtr_1 = require("./MoveCtr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameController = /** @class */ (function (_super) {
    __extends(GameController, _super);
    function GameController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.touchArea = null;
        _this.targetMove = null;
        _this.targetShow = null;
        _this.moveCtrCmpt = null;
        _this.barrierArea = null;
        _this.barrierManagerCmpt = null;
        _this.gameStatus = EnumIndex_1.EGameStatus.END;
        _this.dlgOver = null;
        _this.isOver = false; //控制开始游戏的速度
        return _this;
    }
    GameController.prototype.onLoad = function () {
        Events_1.default.targetOn(this);
        this.moveCtrCmpt = new MoveCtr_1.default(this.targetMove, this.targetShow);
        this.barrierManagerCmpt = new BarrierManager_1.default(this.barrierArea);
    };
    GameController.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isOver)
                            return [2 /*return*/];
                        this.isOver = true;
                        this.gameStatus = EnumIndex_1.EGameStatus.START;
                        this.toggleDlgOver();
                        this.moveCtrCmpt.startMoving();
                        _a.label = 1;
                    case 1:
                        if (!(this.gameStatus === EnumIndex_1.EGameStatus.START)) return [3 /*break*/, 3];
                        this.barrierManagerCmpt.createBarrier();
                        return [4 /*yield*/, Tool_1.default.waitCmpt(this, 1)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        this.isOver = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**改变移动方向 */
    GameController.prototype.changeMoveDirection = function () {
        if (this.gameStatus !== EnumIndex_1.EGameStatus.START)
            return;
        this.moveCtrCmpt.changeMoveDirection();
    };
    GameController.prototype.judgResult = function (barrierID) {
        var tip = {
            text: "",
            unique: false,
            end: cc.v2(0, 100)
        };
        if (barrierID === 7) {
            console.log("加道具数量");
            tip.text = "获得道具：";
            Layer_1.default.inst.showTip(tip);
            return;
        }
        var targetID = this.moveCtrCmpt.targetID;
        if (barrierID === targetID) {
            console.log("加点金币");
            tip.text = "获得金币：";
            Layer_1.default.inst.showTip(tip);
        }
        else {
            console.log("gameOver");
            tip.text = "结束获取";
            Layer_1.default.inst.showTip(tip);
            this.gameOver();
        }
    };
    GameController.prototype.gameOver = function () {
        this.gameStatus = EnumIndex_1.EGameStatus.END;
        this.moveCtrCmpt.randomID();
        this.moveCtrCmpt.gameOver();
        this.barrierArea.destroyAllChildren();
        this.toggleDlgOver();
    };
    GameController.prototype.toggleDlgOver = function () {
        this.dlgOver.active = this.gameStatus === EnumIndex_1.EGameStatus.END;
    };
    GameController.prototype.onDestroy = function () {
        Events_1.default.targetOff(this);
        // this.moveCtrCmpt.onDestroy()
    };
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "touchArea", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "targetMove", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "targetShow", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "barrierArea", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "dlgOver", void 0);
    __decorate([
        Events_1.preloadEvent(EventName_1.EventName.JUDG_RESULT)
    ], GameController.prototype, "judgResult", null);
    GameController = __decorate([
        ccclass
    ], GameController);
    return GameController;
}(cc.Component));
exports.default = GameController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGhvbWVcXG1haW5cXEdhbWVDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUNwRCw2REFBNEQ7QUFDNUQsK0RBQWdFO0FBQ2hFLHNEQUFtRTtBQUNuRSxrREFBNkM7QUFDN0MsbURBQThDO0FBQzlDLHFDQUFnQztBQUUxQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQTRGQztRQTNGc0IsZUFBUyxHQUFZLElBQUksQ0FBQTtRQUN6QixnQkFBVSxHQUFZLElBQUksQ0FBQTtRQUMxQixnQkFBVSxHQUFZLElBQUksQ0FBQTtRQUNyQyxpQkFBVyxHQUFZLElBQUksQ0FBQTtRQUVoQixpQkFBVyxHQUFZLElBQUksQ0FBQTtRQUN0Qyx3QkFBa0IsR0FBbUIsSUFBSSxDQUFBO1FBRXpDLGdCQUFVLEdBQWdCLHVCQUFXLENBQUMsR0FBRyxDQUFBO1FBQzlCLGFBQU8sR0FBWSxJQUFJLENBQUE7UUFDbEMsWUFBTSxHQUFZLEtBQUssQ0FBQSxDQUFDLFdBQVc7O0lBaUYvQyxDQUFDO0lBL0VhLCtCQUFNLEdBQWhCO1FBQ0ksZ0JBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGlCQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDaEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksd0JBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDbEUsQ0FBQztJQUVLLGtDQUFTLEdBQWY7Ozs7O3dC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QUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFBMkI7SUFHMUI7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQTRCO0lBSTNCO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUF3QjtJQWlDMUM7UUFEQyxxQkFBWSxDQUFDLHFCQUFTLENBQUMsV0FBVyxDQUFDO29EQStCbkM7SUF6RWdCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0E0RmxDO0lBQUQscUJBQUM7Q0E1RkQsQUE0RkMsQ0E1RjJDLEVBQUUsQ0FBQyxTQUFTLEdBNEZ2RDtrQkE1Rm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF5ZXIgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jbXB0L2Jhc2UvTGF5ZXJcIjtcclxuaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb25zdC9FdmVudE5hbWVcIjtcclxuaW1wb3J0IHsgRUdhbWVTdGF0dXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3J1bnRpbWUvRW51bUluZGV4XCI7XHJcbmltcG9ydCBFdmVudHMsIHsgcHJlbG9hZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi91dGlsL0V2ZW50c1wiO1xyXG5pbXBvcnQgVG9vbCBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3V0aWwvVG9vbFwiO1xyXG5pbXBvcnQgQmFycmllck1hbmFnZXIgZnJvbSBcIi4vQmFycmllck1hbmFnZXJcIjtcclxuaW1wb3J0IE1vdmVDdHIgZnJvbSBcIi4vTW92ZUN0clwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSB0b3VjaEFyZWE6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgdGFyZ2V0TW92ZTogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSB0YXJnZXRTaG93OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBtb3ZlQ3RyQ21wdDogTW92ZUN0ciA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgYmFycmllckFyZWE6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIGJhcnJpZXJNYW5hZ2VyQ21wdDogQmFycmllck1hbmFnZXIgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lU3RhdHVzOiBFR2FtZVN0YXR1cyA9IEVHYW1lU3RhdHVzLkVORFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpIGRsZ092ZXI6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIGlzT3ZlcjogYm9vbGVhbiA9IGZhbHNlIC8v5o6n5Yi25byA5aeL5ri45oiP55qE6YCf5bqmXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudHMudGFyZ2V0T24odGhpcylcclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlQ3RyQ21wdCA9IG5ldyBNb3ZlQ3RyKHRoaXMudGFyZ2V0TW92ZSwgdGhpcy50YXJnZXRTaG93KVxyXG4gICAgICAgIHRoaXMuYmFycmllck1hbmFnZXJDbXB0ID0gbmV3IEJhcnJpZXJNYW5hZ2VyKHRoaXMuYmFycmllckFyZWEpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc3RhcnRHYW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT3ZlcikgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5pc092ZXIgPSB0cnVlXHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXR1cyA9IEVHYW1lU3RhdHVzLlNUQVJUXHJcbiAgICAgICAgdGhpcy50b2dnbGVEbGdPdmVyKClcclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlQ3RyQ21wdC5zdGFydE1vdmluZygpXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZ2FtZVN0YXR1cyA9PT0gRUdhbWVTdGF0dXMuU1RBUlQpIHtcclxuICAgICAgICAgICAgdGhpcy5iYXJyaWVyTWFuYWdlckNtcHQuY3JlYXRlQmFycmllcigpXHJcbiAgICAgICAgICAgIGF3YWl0IFRvb2wud2FpdENtcHQodGhpcywgMSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNPdmVyID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICAvKirmlLnlj5jnp7vliqjmlrnlkJEgKi9cclxuICAgIGNoYW5nZU1vdmVEaXJlY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZVN0YXR1cyAhPT0gRUdhbWVTdGF0dXMuU1RBUlQpIHJldHVyblxyXG4gICAgICAgIHRoaXMubW92ZUN0ckNtcHQuY2hhbmdlTW92ZURpcmVjdGlvbigpXHJcbiAgICB9XHJcblxyXG4gICAgQHByZWxvYWRFdmVudChFdmVudE5hbWUuSlVER19SRVNVTFQpXHJcbiAgICBqdWRnUmVzdWx0KGJhcnJpZXJJRDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdGlwID0ge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICB1bmlxdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICBlbmQ6IGNjLnYyKDAsIDEwMClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChiYXJyaWVySUQgPT09IDcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLliqDpgZPlhbfmlbDph49cIik7XHJcblxyXG4gICAgICAgICAgICB0aXAudGV4dCA9IFwi6I635b6X6YGT5YW377yaXCJcclxuICAgICAgICAgICAgTGF5ZXIuaW5zdC5zaG93VGlwKHRpcClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0YXJnZXRJRCA9IHRoaXMubW92ZUN0ckNtcHQudGFyZ2V0SURcclxuICAgICAgICBpZiAoYmFycmllcklEID09PSB0YXJnZXRJRCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOeCuemHkeW4gVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRpcC50ZXh0ID0gXCLojrflvpfph5HluIHvvJpcIlxyXG4gICAgICAgICAgICBMYXllci5pbnN0LnNob3dUaXAodGlwKVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWVPdmVyXCIpO1xyXG5cclxuICAgICAgICAgICAgdGlwLnRleHQgPSBcIue7k+adn+iOt+WPllwiXHJcbiAgICAgICAgICAgIExheWVyLmluc3Quc2hvd1RpcCh0aXApXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdhbWVPdmVyKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXR1cyA9IEVHYW1lU3RhdHVzLkVORFxyXG4gICAgICAgIHRoaXMubW92ZUN0ckNtcHQucmFuZG9tSUQoKVxyXG4gICAgICAgIHRoaXMubW92ZUN0ckNtcHQuZ2FtZU92ZXIoKVxyXG4gICAgICAgIHRoaXMuYmFycmllckFyZWEuZGVzdHJveUFsbENoaWxkcmVuKClcclxuICAgICAgICB0aGlzLnRvZ2dsZURsZ092ZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZURsZ092ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5kbGdPdmVyLmFjdGl2ZSA9IHRoaXMuZ2FtZVN0YXR1cyA9PT0gRUdhbWVTdGF0dXMuRU5EXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudHMudGFyZ2V0T2ZmKHRoaXMpXHJcbiAgICAgICAgLy8gdGhpcy5tb3ZlQ3RyQ21wdC5vbkRlc3Ryb3koKVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=