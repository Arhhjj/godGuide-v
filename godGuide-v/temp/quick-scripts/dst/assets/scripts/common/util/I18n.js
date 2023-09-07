
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/I18n.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxJMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBOEI7QUFDOUIsbUNBQThCO0FBQzlCLGdEQUErQztBQUMvQyxtQ0FBOEI7QUFDOUIsK0JBQTBCO0FBRTFCOztHQUVHO0FBQ0gsSUFBWSxRQUlYO0FBSkQsV0FBWSxRQUFRO0lBQ2hCLHFCQUFTLENBQUE7SUFDVCxxQkFBUyxDQUFBO0lBQ1QscUJBQVMsQ0FBQTtBQUNiLENBQUMsRUFKVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUluQjtBQUVEOztHQUVHO0FBQ0g7SUFBQTtJQStGQSxDQUFDO0lBdkZHLHNCQUFrQixlQUFPO1FBRHpCLFlBQVk7YUFDWixjQUF3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUUvRDs7O09BR0c7SUFDVyxTQUFJLEdBQWxCLFVBQW1CLFFBQWtDO1FBQWxDLHlCQUFBLEVBQUEsV0FBcUIsUUFBUSxDQUFDLElBQUk7UUFDakQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxJQUFJLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBZ0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7O09BR0c7SUFDVyxXQUFNLEdBQXBCLFVBQXFCLFFBQWtCO1FBQ25DLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDNUIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsUUFBUSxRQUFRLEVBQUU7WUFDZCxLQUFLLFFBQVEsQ0FBQyxFQUFFO2dCQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBRSxDQUFDO2dCQUNuQixNQUFNO1lBQ1YsS0FBSyxRQUFRLENBQUMsRUFBRTtnQkFDWixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQUUsQ0FBQztnQkFDbkIsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFFLENBQUM7Z0JBQ25CLE1BQU07U0FDYjtRQUNELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7TUFFRTtJQUNZLHdCQUFtQixHQUFqQztRQUNJLGdCQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBR0Q7OztPQUdHO0lBQ1csa0JBQWEsR0FBM0IsVUFBNEIsS0FBYTtRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixFQUFFLENBQUMsS0FBSyxDQUFDLDJEQUE2QixDQUFDLENBQUM7WUFDeEMsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUM5QixPQUFPLEdBQUcsQ0FBQzthQUNkO1NBQ0o7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNXLFlBQU8sR0FBckIsVUFBc0IsR0FBVztRQUFFLGdCQUFxRTthQUFyRSxVQUFxRSxFQUFyRSxxQkFBcUUsRUFBckUsSUFBcUU7WUFBckUsK0JBQXFFOztRQUNwRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixFQUFFLENBQUMsS0FBSyxDQUFDLHFEQUF1QixDQUFDLENBQUM7WUFDbEMsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBRUQsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNoRixJQUFJLEdBQUcsY0FBSSxDQUFDLFlBQVksT0FBakIsY0FBSSxrQkFBYyxJQUFJLEdBQUssTUFBTSxFQUFDLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQTdGYyxVQUFLLEdBQVksS0FBSyxDQUFDO0lBRXRDLFVBQVU7SUFDSyxhQUFRLEdBQVEsSUFBSSxDQUFDO0lBRXJCLGFBQVEsR0FBYSxRQUFRLENBQUMsSUFBSSxDQUFDO0lBeUZ0RCxXQUFDO0NBL0ZELEFBK0ZDLElBQUE7a0JBL0ZvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVuIGZyb20gXCIuLi9jb25maWcvRW5cIjtcclxuaW1wb3J0IFpoIGZyb20gXCIuLi9jb25maWcvWmhcIjtcclxuaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcIi4uL2NvbnN0L0V2ZW50TmFtZVwiO1xyXG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuL0V2ZW50c1wiO1xyXG5pbXBvcnQgVG9vbCBmcm9tIFwiLi9Ub29sXCI7XHJcblxyXG4vKipcclxuICog6K+t6KiA57G75Z6LXHJcbiAqL1xyXG5leHBvcnQgZW51bSBMYW5nVHlwZSB7XHJcbiAgICBOT05FID0gXCJcIixcclxuICAgIFpIID0gXCJ6aFwiLFxyXG4gICAgRU4gPSBcImVuXCJcclxufVxyXG5cclxuLyoqXHJcbiAqIOWkmuivreiogOaOp+WItuexu1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSTE4biB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiDor63oqIDooaggKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9waHJhc2VzOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9jdXJMYW5nOiBMYW5nVHlwZSA9IExhbmdUeXBlLk5PTkU7XHJcbiAgICAvKiDlvZPliY3or63oqIDnsbvlnosgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGN1ckxhbmcoKTogTGFuZ1R5cGUgeyByZXR1cm4gdGhpcy5fY3VyTGFuZzsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6K+t6KiAXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbml0KGxhbmd1YWdlOiBMYW5nVHlwZSA9IExhbmdUeXBlLk5PTkUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faW5pdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBsYW5nID0gbGFuZ3VhZ2UgfHwgY2Muc3lzLmxhbmd1YWdlO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoKGxhbmcgYXMgTGFuZ1R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiH5o2i6K+t6KiAXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzd2l0Y2gobGFuZ3VhZ2U6IExhbmdUeXBlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ckxhbmcgPT09IGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1ckxhbmcgPSBsYW5ndWFnZTtcclxuICAgICAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ1R5cGUuWkg6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9waHJhc2VzID0gWmg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5nVHlwZS5FTjpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BocmFzZXMgPSBFbjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyTGFuZyA9IExhbmdUeXBlLkVOO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGhyYXNlcyA9IEVuO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlTG9jYWxpemVkQ21wdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmm7TmlrDmiYDmnInlpJror63oqIDnu4Tku7ZcclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZUxvY2FsaXplZENtcHQoKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRzLmVtaXQoRXZlbnROYW1lLlVQREFURV9MT0NBTElaRURfQ01QVCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H6K+t6KiA6KGodmFsdWXojrflj5blr7nlupTnmoRrZXlcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDor63oqIDooajnmoR2YWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEtleUJ5VmFsdWUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9waHJhc2VzKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGBbSTE4bi5nZXRLZXlCeVZhbHVlXSDmnKrmraPnoa7liJ3lp4vljJZgKTtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9waHJhc2VzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9waHJhc2VzW2tleV0gPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+Ha2V56I635Y+W6K+t6KiA6KGo5Lit55qE5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0ga2V5IOivreiogOihqOS4reeahGtleVxyXG4gICAgICogQHBhcmFtIG9wdGlvbiDnlKjkuo7mm7/mjaLnmoTmlbDmja7vvIzlj6/ku6XkvKDplK7lgLzlr7nvvIzkuZ/lj6/ku6XmjInpobrluo/kvKDlj4JcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyDor63oqIDooagge1widGVzdFwiOiBcInRlc3QgJXthcmcxfSAle2FyZzJ9ICEhIVwifVxyXG4gICAgICogSTE4bi5nZXRUZXh0KFwidGVzdFwiLCB7YXJnMTogXCJzb210aGluZ1wiLCBhcmcyOiAyfSk7IC8vIFwidGVzdCBzb210aGluZyAyICEhIVwiXHJcbiAgICAgKiBJMThuLmdldFRleHQoXCJ0ZXN0XCIsIFwic29tdGhpbmdcIiwgMik7IC8vIFwidGVzdCBzb210aGluZyAyICEhIVwiXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VGV4dChrZXk6IHN0cmluZywgLi4ub3B0aW9uOiBbUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPl0gfCBBcnJheTxzdHJpbmcgfCBudW1iZXI+KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3BocmFzZXMpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoYFtJMThuLmdldFRleHRdIOacquato+ehruWIneWni+WMlmApO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gdGhpcy5fcGhyYXNlcy5oYXNPd25Qcm9wZXJ0eShrZXkpID8gdGhpcy5fcGhyYXNlc1trZXldIDoga2V5O1xyXG4gICAgICAgIHRleHQgPSBUb29sLmZvcm1hdFN0cmluZyh0ZXh0LCAuLi5vcHRpb24pO1xyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==