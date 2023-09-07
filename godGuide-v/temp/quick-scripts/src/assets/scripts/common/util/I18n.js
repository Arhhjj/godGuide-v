"use strict";
cc._RF.push(module, 'a24383d1j1FRbXaBkcPctfn', 'I18n');
// scripts/common/util/I18n.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangType = void 0;
var En_1 = require("../config/En");
var Zh_1 = require("../config/Zh");
var EventName_1 = require("../const/EventName");
var Events_1 = require("./Events");
var Tool_1 = require("./Tool");
/**
 * 语言类型
 */
var LangType;
(function (LangType) {
    LangType["NONE"] = "";
    LangType["ZH"] = "zh";
    LangType["EN"] = "en";
})(LangType = exports.LangType || (exports.LangType = {}));
/**
 * 多语言控制类
 */
var I18n = /** @class */ (function () {
    function I18n() {
    }
    Object.defineProperty(I18n, "curLang", {
        /* 当前语言类型 */
        get: function () { return this._curLang; },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化语言
     * @param language
     */
    I18n.init = function (language) {
        if (language === void 0) { language = LangType.NONE; }
        if (this._init) {
            return;
        }
        this._init = true;
        var lang = language || cc.sys.language;
        this.switch(lang);
    };
    /**
     * 切换语言
     * @param language
     */
    I18n.switch = function (language) {
        if (this._curLang === language) {
            return;
        }
        this._curLang = language;
        switch (language) {
            case LangType.ZH:
                this._phrases = Zh_1.default;
                break;
            case LangType.EN:
                this._phrases = En_1.default;
                break;
            default:
                this._curLang = LangType.EN;
                this._phrases = En_1.default;
                break;
        }
        this.updateLocalizedCmpt();
    };
    /**
    * 更新所有多语言组件
    */
    I18n.updateLocalizedCmpt = function () {
        Events_1.default.emit(EventName_1.EventName.UPDATE_LOCALIZED_CMPT);
    };
    /**
     * 通过语言表value获取对应的key
     * @param value 语言表的value
     */
    I18n.getKeyByValue = function (value) {
        if (!this._phrases) {
            cc.error("[I18n.getKeyByValue] \u672A\u6B63\u786E\u521D\u59CB\u5316");
            return "";
        }
        for (var key in this._phrases) {
            if (this._phrases[key] === value) {
                return key;
            }
        }
        return "";
    };
    /**
     * 通过key获取语言表中的字符串
     * @param key 语言表中的key
     * @param option 用于替换的数据，可以传键值对，也可以按顺序传参
     * @example
     * // 语言表 {"test": "test %{arg1} %{arg2} !!!"}
     * I18n.getText("test", {arg1: "somthing", arg2: 2}); // "test somthing 2 !!!"
     * I18n.getText("test", "somthing", 2); // "test somthing 2 !!!"
     */
    I18n.getText = function (key) {
        var option = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            option[_i - 1] = arguments[_i];
        }
        if (!this._phrases) {
            cc.error("[I18n.getText] \u672A\u6B63\u786E\u521D\u59CB\u5316");
            return "";
        }
        if (!key) {
            return "";
        }
        var text = this._phrases.hasOwnProperty(key) ? this._phrases[key] : key;
        text = Tool_1.default.formatString.apply(Tool_1.default, __spreadArrays([text], option));
        return text;
    };
    I18n._init = false;
    /** 语言表 */
    I18n._phrases = null;
    I18n._curLang = LangType.NONE;
    return I18n;
}());
exports.default = I18n;

cc._RF.pop();