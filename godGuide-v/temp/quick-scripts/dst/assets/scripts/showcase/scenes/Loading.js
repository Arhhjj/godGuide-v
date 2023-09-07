
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/scenes/Loading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b2c36x3CPpApKUXS2CnhQU6', 'Loading');
// scripts/showcase/scenes/Loading.ts

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
var Url_1 = require("../../common/const/Url");
var UserInfo_1 = require("../../common/runtime/UserInfo");
var Res_1 = require("../../common/util/Res");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Loading.prototype.onLoad = function () {
        UserInfo_1.default.instance.initUserInfo();
        // console.log = () => { } //置空log 不显示打印
        var userInfo = UserInfo_1.UserInfoStorge.getUserInfo();
        console.log(">>> 本地的UserInfo___> ", userInfo);
        if (!userInfo) //如果本地没有数据则储存数据在本地
            UserInfo_1.UserInfoStorge.setUserInfo();
        else //若本地已有数据则将UserInfo更新为已有的数据
            UserInfo_1.default.instance.setUserInfo(userInfo);
    };
    Loading.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initData()];
                    case 1:
                        _a.sent();
                        this.preloadScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Loading.prototype.enterMain = function () {
        Layer_1.default.inst.enterScene("Main");
    };
    Loading.prototype.preloadScene = function () {
        return new Promise(function (reslove, reject) {
            cc.director.preloadScene('Main', function (completedCount, totalCount, item) {
                var progress = completedCount / totalCount;
                console.log('预加载进度：', progress);
            }, function (error) {
                if (error) {
                    console.error('预加载Main场景资源失败：', error);
                }
                else {
                    console.log('预加载Main场景资源成功！');
                }
            });
        });
    };
    Loading.prototype.initData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(">>> initData__> 开始加载资源");
                        promises = [];
                        // 添加各个资源加载函数返回的Promise对象到数组
                        promises.push(Res_1.default.loadDir(Url_1.DirUrl.TEXTURE, cc.SpriteFrame));
                        promises.push(Res_1.default.loadDir(Url_1.DirUrl.PREFAB, cc.Prefab));
                        promises.push(Res_1.default.loadDir(Url_1.DirUrl.AUDIO, cc.AudioClip));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        _a.sent();
                        console.log(">>> 资源加载完成");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(">>> 资源加载失败：", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Loading = __decorate([
        ccclass
    ], Loading);
    return Loading;
}(cc.Component));
exports.default = Loading;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXHNjZW5lc1xcTG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBaUQ7QUFDakQsOENBQWdEO0FBQ2hELDBEQUF5RTtBQUN6RSw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBcUMsMkJBQVk7SUFBakQ7O0lBNERBLENBQUM7SUExREcsd0JBQU0sR0FBTjtRQUNJLGtCQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ2hDLHdDQUF3QztRQUV4QyxJQUFJLFFBQVEsR0FBRyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFN0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxrQkFBa0I7WUFDN0IseUJBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTthQUMzQiwyQkFBMkI7WUFDNUIsa0JBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFFSyx1QkFBSyxHQUFYOzs7OzRCQUNJLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7d0JBQXJCLFNBQXFCLENBQUE7d0JBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTs7Ozs7S0FDdEI7SUFFRCwyQkFBUyxHQUFUO1FBQ0ksZUFBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELDhCQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDckMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFVBQUMsY0FBYyxFQUFFLFVBQVUsRUFBRSxJQUFJO2dCQUM5RCxJQUFNLFFBQVEsR0FBRyxjQUFjLEdBQUcsVUFBVSxDQUFDO2dCQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNwQyxDQUFDLEVBQUUsVUFBQyxLQUFLO2dCQUNMLElBQUksS0FBSyxFQUFFO29CQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzFDO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDakM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVhLDBCQUFRLEdBQXRCOzs7Ozs7d0JBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO3dCQUVoQyxRQUFRLEdBQUcsRUFBRSxDQUFDO3dCQUVwQiw0QkFBNEI7d0JBQzVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBRyxDQUFDLE9BQU8sQ0FBQyxZQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUMzRCxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQUcsQ0FBQyxPQUFPLENBQUMsWUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDckQsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFHLENBQUMsT0FBTyxDQUFDLFlBQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7d0JBS25ELHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUE7O3dCQUEzQixTQUEyQixDQUFDO3dCQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7O3dCQUUxQixPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxPQUFLLENBQUMsQ0FBQzs7Ozs7O0tBRTNDO0lBekRnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBNEQzQjtJQUFELGNBQUM7Q0E1REQsQUE0REMsQ0E1RG9DLEVBQUUsQ0FBQyxTQUFTLEdBNERoRDtrQkE1RG9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF5ZXIgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbXB0L2Jhc2UvTGF5ZXJcIjtcbmltcG9ydCB7IERpclVybCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uc3QvVXJsXCI7XG5pbXBvcnQgVXNlckluZm8sIHsgVXNlckluZm9TdG9yZ2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3J1bnRpbWUvVXNlckluZm9cIjtcbmltcG9ydCBSZXMgZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsL1Jlc1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIFVzZXJJbmZvLmluc3RhbmNlLmluaXRVc2VySW5mbygpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nID0gKCkgPT4geyB9IC8v572u56m6bG9nIOS4jeaYvuekuuaJk+WNsFxuXG4gICAgICAgIGxldCB1c2VySW5mbyA9IFVzZXJJbmZvU3RvcmdlLmdldFVzZXJJbmZvKClcbiAgICAgICAgY29uc29sZS5sb2coXCI+Pj4g5pys5Zyw55qEVXNlckluZm9fX18+IFwiLCB1c2VySW5mbylcblxuICAgICAgICBpZiAoIXVzZXJJbmZvKSAvL+WmguaenOacrOWcsOayoeacieaVsOaNruWImeWCqOWtmOaVsOaNruWcqOacrOWcsFxuICAgICAgICAgICAgVXNlckluZm9TdG9yZ2Uuc2V0VXNlckluZm8oKVxuICAgICAgICBlbHNlIC8v6Iul5pys5Zyw5bey5pyJ5pWw5o2u5YiZ5bCGVXNlckluZm/mm7TmlrDkuLrlt7LmnInnmoTmlbDmja5cbiAgICAgICAgICAgIFVzZXJJbmZvLmluc3RhbmNlLnNldFVzZXJJbmZvKHVzZXJJbmZvKVxuICAgIH1cblxuICAgIGFzeW5jIHN0YXJ0KCkge1xuICAgICAgICBhd2FpdCB0aGlzLmluaXREYXRhKClcbiAgICAgICAgdGhpcy5wcmVsb2FkU2NlbmUoKVxuICAgIH1cblxuICAgIGVudGVyTWFpbigpIHtcbiAgICAgICAgTGF5ZXIuaW5zdC5lbnRlclNjZW5lKFwiTWFpblwiKVxuICAgIH1cblxuICAgIHByZWxvYWRTY2VuZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNsb3ZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgnTWFpbicsIChjb21wbGV0ZWRDb3VudCwgdG90YWxDb3VudCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfpooTliqDovb3ov5vluqbvvJonLCBwcm9ncmVzcyk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign6aKE5Yqg6L29TWFpbuWcuuaZr+i1hOa6kOWksei0pe+8micsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6aKE5Yqg6L29TWFpbuWcuuaZr+i1hOa6kOaIkOWKn++8gScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgaW5pdERhdGEoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiPj4+IGluaXREYXRhX18+IOW8gOWni+WKoOi9vei1hOa6kFwiKTtcblxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIC8vIOa3u+WKoOWQhOS4qui1hOa6kOWKoOi9veWHveaVsOi/lOWbnueahFByb21pc2Xlr7nosaHliLDmlbDnu4RcbiAgICAgICAgcHJvbWlzZXMucHVzaChSZXMubG9hZERpcihEaXJVcmwuVEVYVFVSRSwgY2MuU3ByaXRlRnJhbWUpKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChSZXMubG9hZERpcihEaXJVcmwuUFJFRkFCLCBjYy5QcmVmYWIpKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChSZXMubG9hZERpcihEaXJVcmwuQVVESU8sIGNjLkF1ZGlvQ2xpcCkpO1xuICAgICAgICAvLyBwcm9taXNlcy5wdXNoKFJlcy5sb2FkRGlyKERpclVybC5KU09OLCBjYy5Kc29uQXNzZXQpKTtcbiAgICAgICAgLy8gcHJvbWlzZXMucHVzaChSZXMubG9hZERpcihEaXJVcmwuQU5JTUFUSU9OLCBjYy5BbmltYXRpb25DbGlwKSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPj4+IOi1hOa6kOWKoOi9veWujOaIkFwiKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCI+Pj4g6LWE5rqQ5Yqg6L295aSx6LSl77yaXCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG4iXX0=