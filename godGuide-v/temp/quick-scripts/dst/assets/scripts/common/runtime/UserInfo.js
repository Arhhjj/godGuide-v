
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/runtime/UserInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxydW50aW1lXFxVc2VySW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBOEM7QUFFOUMsc0JBQXNCO0FBQ3RCLFNBQVMsTUFBTSxDQUFDLE1BQVcsRUFBRSxXQUFtQjtJQUM1QyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUU7UUFDdkMsWUFBWSxFQUFFLElBQUk7UUFDbEIsVUFBVSxFQUFFLElBQUk7UUFDaEIsR0FBRyxFQUFFO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBSSxXQUFhLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsR0FBRyxFQUFFLFVBQVUsS0FBVTtZQUNyQixJQUFJLENBQUMsTUFBSSxXQUFhLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQztLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxXQUFXO0FBQ1g7SUFBc0MsNEJBQVM7SUFBL0M7UUFBQSxxRUFzREM7UUFqRFcsZUFBUyxHQUFXLEVBQUUsQ0FBQSxDQUFDLE1BQU07UUFHN0IsV0FBSyxHQUFXLENBQUMsQ0FBQSxDQUFDLElBQUk7UUFHdEIsb0JBQWMsR0FBVyxDQUFDLENBQUE7UUFHMUIsaUJBQVcsR0FBVyxDQUFDLENBQUE7UUFHdkIscUJBQWUsR0FBUSxJQUFJLENBQUE7UUFHM0IsaUJBQVcsR0FBYSxFQUFFLENBQUE7UUFHMUIsaUJBQVcsR0FBYSxFQUFFLENBQUE7O0lBK0J0QyxDQUFDO0lBckRHLHNCQUFXLG9CQUFRO2FBQW5CO1lBQ0ksT0FBTyxPQUFNLFdBQVcsV0FBWSxDQUFBO1FBQ3hDLENBQUM7OztPQUFBO0lBd0JELGlCQUFpQjtJQUNWLCtCQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUE7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUE7UUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUE7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRUQsWUFBWTtJQUNMLDhCQUFXLEdBQWxCLFVBQW1CLElBQUk7UUFDbkIsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFNO1FBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFFRCxZQUFZO0lBQ0wsOEJBQVcsR0FBbEI7UUFDSSxJQUFNLElBQUksR0FBRztZQUNULFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQzlCLENBQUE7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUEvQ087UUFBUCxNQUFNOzhDQUFpQjtJQUdoQjtRQUFQLE1BQU07MENBQWE7SUFHWjtRQUFQLE1BQU07bURBQXNCO0lBR3JCO1FBQVAsTUFBTTtnREFBbUI7SUFHbEI7UUFBUCxNQUFNO29EQUFvQjtJQUduQjtRQUFQLE1BQU07Z0RBQXFCO0lBR3BCO1FBQVAsTUFBTTtnREFBcUI7SUE4QmhDLGVBQUM7Q0F0REQsQUFzREMsQ0F0RHFDLG1CQUFTLEdBc0Q5QztrQkF0RG9CLFFBQVE7QUF3RDdCLGNBQWM7QUFDZDtJQUFBO0lBbURBLENBQUM7SUEvQ0csVUFBVTtJQUNJLDBCQUFXLEdBQXpCLFVBQTBCLEtBQTRDLEVBQUUsR0FBYztRQUE1RCxzQkFBQSxFQUFBLFFBQWEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFBRSxvQkFBQSxFQUFBLE1BQU0sSUFBSSxDQUFDLEdBQUc7UUFDbEYsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDM0QsQ0FBQztJQUVELFVBQVU7SUFDSSwwQkFBVyxHQUF6QixVQUEwQixHQUFjO1FBQWQsb0JBQUEsRUFBQSxNQUFNLElBQUksQ0FBQyxHQUFHO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsZUFBZTtJQUNELDRCQUFhLEdBQTNCLFVBQTRCLEdBQWM7UUFBZCxvQkFBQSxFQUFBLE1BQU0sSUFBSSxDQUFDLEdBQUc7UUFDdEMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFRCw2QkFBNkI7SUFDZiwwQkFBVyxHQUF6QixVQUEwQixLQUFVLEVBQUUsR0FBYztRQUFkLG9CQUFBLEVBQUEsTUFBTSxJQUFJLENBQUMsR0FBRztRQUNoRCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3RDLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBTSxXQUFXLHlCQUFRLFFBQVEsR0FBSyxLQUFLLENBQUUsQ0FBQTtZQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNyQztJQUNMLENBQUM7SUFFRCxjQUFjO0lBQ0EsMEJBQVcsR0FBekIsVUFBMEIsR0FBYztRQUFkLG9CQUFBLEVBQUEsTUFBTSxJQUFJLENBQUMsR0FBRztRQUNwQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUE7SUFDcEQsQ0FBQztJQUVELGVBQWU7SUFDRCw2QkFBYyxHQUE1QixVQUE2QixHQUFXO1FBQ3BDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRUQsY0FBYztJQUNBLDZCQUFjLEdBQTVCO1FBQ0ksSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakQsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQzFELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDdkI7U0FDSjtRQUNELE9BQU8sUUFBUSxDQUFBO0lBQ25CLENBQUM7SUFoREQsYUFBYTtJQUNFLGtCQUFHLEdBQVcsVUFBVSxDQUFBO0lBaUQzQyxxQkFBQztDQW5ERCxBQW1EQyxJQUFBO0FBbkRZLHdDQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNpbmdsZXRvbiBmcm9tIFwiLi4vY21wdC9iYXNlL1NpbmdsZXRvblwiXG5cbi8vIOWxnuaAp+ijhemlsOWZqO+8mueUqOS6jua3u+WKoGdldOWSjHNldOaWueazlVxuZnVuY3Rpb24gR2V0U2V0KHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW2BfJHtwcm9wZXJ0eUtleX1gXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWU6IGFueSkge1xuICAgICAgICAgICAgdGhpc1tgXyR7cHJvcGVydHlLZXl9YF0gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuLyoq55So5oi35pWw5o2u57G7ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyBleHRlbmRzIFNpbmdsZXRvbiB7XG4gICAgc3RhdGljIGdldCBpbnN0YW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldEluc3RhbmNlPFVzZXJJbmZvPigpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXNlck5hbWU6IHN0cmluZyA9IFwiXCIgLy/nlKjmiLflkI3np7BcbiAgICBAR2V0U2V0IHVzZXJOYW1lOiBzdHJpbmdcblxuICAgIHByaXZhdGUgX2NvaW46IG51bWJlciA9IDAgLy/ph5HluIFcbiAgICBAR2V0U2V0IGNvaW46IG51bWJlclxuXG4gICAgcHJpdmF0ZSBfbGV2ZWxQcm9ncmVzczogbnVtYmVyID0gMVxuICAgIEBHZXRTZXQgbGV2ZWxQcm9ncmVzczogbnVtYmVyXG5cbiAgICBwcml2YXRlIF9zaWduSW5EYXlzOiBudW1iZXIgPSAwXG4gICAgQEdldFNldCBzaWduSW5EYXlzOiBudW1iZXJcblxuICAgIHByaXZhdGUgX2xhc3RTaWduSW5EYXRlOiBhbnkgPSBudWxsXG4gICAgQEdldFNldCBsYXN0U2lnbkluRGF0ZTogYW55XG5cbiAgICBwcml2YXRlIF9wcm9wQ29uZmlnOiBudW1iZXJbXSA9IFtdXG4gICAgQEdldFNldCBwcm9wQ29uZmlnOiBudW1iZXJbXVxuXG4gICAgcHJpdmF0ZSBfcm9sZUNvbmZpZzogbnVtYmVyW10gPSBbXVxuICAgIEBHZXRTZXQgcm9sZUNvbmZpZzogbnVtYmVyW11cblxuXG4gICAgLyoq5Yid5aeL5YyW5Yid5aeL5pWw5o2u5YaF5a6557uT5p6EICovXG4gICAgcHVibGljIGluaXRVc2VySW5mbygpIHtcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IFwiQXJcIlxuICAgICAgICB0aGlzLmNvaW4gPSAxMDAwXG4gICAgICAgIHRoaXMubGV2ZWxQcm9ncmVzcyA9IDFcbiAgICAgICAgdGhpcy5zaWduSW5EYXlzID0gMFxuICAgICAgICB0aGlzLmxhc3RTaWduSW5EYXRlID0gbnVsbFxuICAgICAgICB0aGlzLnByb3BDb25maWcgPSBbMSwgMSwgMSwgMV1cbiAgICAgICAgdGhpcy5yb2xlQ29uZmlnID0gWzExMDcsIDE1MCwgNTgwLCAyMjBdXG4gICAgfVxuXG4gICAgLyoq6K6+572u55So5oi35pWw5o2uICovXG4gICAgcHVibGljIHNldFVzZXJJbmZvKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKVxuICAgIH1cblxuICAgIC8qKuiOt+WPlueUqOaIt+aVsOaNriAqL1xuICAgIHB1YmxpYyBnZXRVc2VySW5mbygpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJOYW1lOiB0aGlzLnVzZXJOYW1lLFxuICAgICAgICAgICAgY29pbjogdGhpcy5jb2luLFxuICAgICAgICAgICAgbGV2ZWxQcm9ncmVzczogdGhpcy5sZXZlbFByb2dyZXNzLFxuICAgICAgICAgICAgc2lnbkluRGF5czogdGhpcy5zaWduSW5EYXlzLFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgfVxufVxuXG4vKirnlKjmiLfmlbDmja7mnKzlnLDlrZjlgqggKi9cbmV4cG9ydCBjbGFzcyBVc2VySW5mb1N0b3JnZSB7XG4gICAgLyoq5pys5Zyw5pWw5o2ua2V5ICovXG4gICAgcHJpdmF0ZSBzdGF0aWMga2V5OiBzdHJpbmcgPSBcInVzZXJJbmZvXCJcblxuICAgIC8qKuWCqOWtmOaVsOaNriAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0VXNlckluZm8odmFsdWU6IGFueSA9IFVzZXJJbmZvLmluc3RhbmNlLmdldFVzZXJJbmZvKCksIGtleSA9IHRoaXMua2V5KSB7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSlcbiAgICB9XG5cbiAgICAvKirojrflj5bmlbDmja4gKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFVzZXJJbmZvKGtleSA9IHRoaXMua2V5KSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKVxuICAgIH1cblxuICAgIC8qKua4hemZpOeUqOaIt+eahOacrOWcsOaVsOaNriAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJVc2VySW5mbyhrZXkgPSB0aGlzLmtleSkge1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KVxuICAgIH1cblxuICAgIC8qKuaWsOWinueUqOaIt+aVsOaNriAtLSB2YWx1ZeWPquWMheWQq+aWsOWinueahOWGheWuuSAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkVXNlckluZm8odmFsdWU6IGFueSwga2V5ID0gdGhpcy5rZXkpIHtcbiAgICAgICAgY29uc3QgdXNlckluZm8gPSB0aGlzLmdldFVzZXJJbmZvKGtleSlcbiAgICAgICAgaWYgKHVzZXJJbmZvKSB7XG4gICAgICAgICAgICBjb25zdCBhZGRVc2VySW5mbyA9IHsgLi4udXNlckluZm8sIC4uLnZhbHVlIH1cbiAgICAgICAgICAgIHRoaXMuc2V0VXNlckluZm8oYWRkVXNlckluZm8sIGtleSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuaYr+WQpuWtmOWcqOacrOWcsOaVsOaNriAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaGFzVXNlckluZm8oa2V5ID0gdGhpcy5rZXkpIHtcbiAgICAgICAgcmV0dXJuIGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpICE9PSBudWxsXG4gICAgfVxuXG4gICAgLyoq5Yig6Zmk5oyH5a6a55qE5pys5Zyw5pWw5o2uICovXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVVc2VySW5mbyhrZXk6IHN0cmluZykge1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KVxuICAgIH1cblxuICAgIC8qKuiOt+WPluaJgOacieacrOWcsOaVsOaNriAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QWxsVXNlckluZm8oKSB7XG4gICAgICAgIGNvbnN0IHVzZXJJbmZvID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYy5zeXMubG9jYWxTdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmtleShpKVxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKHRoaXMua2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSlcbiAgICAgICAgICAgICAgICB1c2VySW5mby5wdXNoKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2VySW5mb1xuICAgIH1cblxufSBcbiJdfQ==