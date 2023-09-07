"use strict";
cc._RF.push(module, '23830xhEjVNzolJ3MKnKaIw', 'UserInfo');
// scripts/common/runtime/UserInfo.ts

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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoStorge = void 0;
var Singleton_1 = require("../cmpt/base/Singleton");
// 属性装饰器：用于添加get和set方法
function GetSet(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        configurable: true,
        enumerable: true,
        get: function () {
            return this["_" + propertyKey];
        },
        set: function (value) {
            this["_" + propertyKey] = value;
        },
    });
}
/**用户数据类 */
var UserInfo = /** @class */ (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._userName = ""; //用户名称
        _this._coin = 0; //金币
        _this._levelProgress = 1;
        _this._signInDays = 0;
        _this._lastSignInDate = null;
        _this._propConfig = [];
        _this._roleConfig = [];
        return _this;
    }
    Object.defineProperty(UserInfo, "instance", {
        get: function () {
            return _super.getInstance.call(this);
        },
        enumerable: false,
        configurable: true
    });
    /**初始化初始数据内容结构 */
    UserInfo.prototype.initUserInfo = function () {
        this.userName = "Ar";
        this.coin = 1000;
        this.levelProgress = 1;
        this.signInDays = 0;
        this.lastSignInDate = null;
        this.propConfig = [1, 1, 1, 1];
        this.roleConfig = [1107, 150, 580, 220];
    };
    /**设置用户数据 */
    UserInfo.prototype.setUserInfo = function (data) {
        if (!data)
            return;
        Object.assign(this, data);
    };
    /**获取用户数据 */
    UserInfo.prototype.getUserInfo = function () {
        var data = {
            userName: this.userName,
            coin: this.coin,
            levelProgress: this.levelProgress,
            signInDays: this.signInDays,
        };
        return data;
    };
    __decorate([
        GetSet
    ], UserInfo.prototype, "userName", void 0);
    __decorate([
        GetSet
    ], UserInfo.prototype, "coin", void 0);
    __decorate([
        GetSet
    ], UserInfo.prototype, "levelProgress", void 0);
    __decorate([
        GetSet
    ], UserInfo.prototype, "signInDays", void 0);
    __decorate([
        GetSet
    ], UserInfo.prototype, "lastSignInDate", void 0);
    __decorate([
        GetSet
    ], UserInfo.prototype, "propConfig", void 0);
    __decorate([
        GetSet
    ], UserInfo.prototype, "roleConfig", void 0);
    return UserInfo;
}(Singleton_1.default));
exports.default = UserInfo;
/**用户数据本地存储 */
var UserInfoStorge = /** @class */ (function () {
    function UserInfoStorge() {
    }
    /**储存数据 */
    UserInfoStorge.setUserInfo = function (value, key) {
        if (value === void 0) { value = UserInfo.instance.getUserInfo(); }
        if (key === void 0) { key = this.key; }
        cc.sys.localStorage.setItem(key, JSON.stringify(value));
    };
    /**获取数据 */
    UserInfoStorge.getUserInfo = function (key) {
        if (key === void 0) { key = this.key; }
        return JSON.parse(cc.sys.localStorage.getItem(key));
    };
    /**清除用户的本地数据 */
    UserInfoStorge.clearUserInfo = function (key) {
        if (key === void 0) { key = this.key; }
        cc.sys.localStorage.removeItem(key);
    };
    /**新增用户数据 -- value只包含新增的内容 */
    UserInfoStorge.addUserInfo = function (value, key) {
        if (key === void 0) { key = this.key; }
        var userInfo = this.getUserInfo(key);
        if (userInfo) {
            var addUserInfo = __assign(__assign({}, userInfo), value);
            this.setUserInfo(addUserInfo, key);
        }
    };
    /**是否存在本地数据 */
    UserInfoStorge.hasUserInfo = function (key) {
        if (key === void 0) { key = this.key; }
        return cc.sys.localStorage.getItem(key) !== null;
    };
    /**删除指定的本地数据 */
    UserInfoStorge.removeUserInfo = function (key) {
        cc.sys.localStorage.removeItem(key);
    };
    /**获取所有本地数据 */
    UserInfoStorge.getAllUserInfo = function () {
        var userInfo = [];
        for (var i = 0; i < cc.sys.localStorage.length; i++) {
            var key = cc.sys.localStorage.key(i);
            if (key.startsWith(this.key)) {
                var value = JSON.parse(cc.sys.localStorage.getItem(key));
                userInfo.push(value);
            }
        }
        return userInfo;
    };
    /**本地数据key */
    UserInfoStorge.key = "userInfo";
    return UserInfoStorge;
}());
exports.UserInfoStorge = UserInfoStorge;

cc._RF.pop();