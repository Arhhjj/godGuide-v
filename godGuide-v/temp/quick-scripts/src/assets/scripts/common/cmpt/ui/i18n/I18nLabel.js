"use strict";
cc._RF.push(module, '102e7zRjoBIIaR3Sun9XFVJ', 'I18nLabel');
// scripts/common/cmpt/ui/i18n/I18nLabel.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventName_1 = require("../../../const/EventName");
var Events_1 = require("../../../util/Events");
var I18n_1 = require("../../../util/I18n");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, menu = _a.menu;
var I18nLabel = /** @class */ (function (_super) {
    __extends(I18nLabel, _super);
    function I18nLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._textKey = "";
        /**
         * 用于正则替换的配置
         */
        _this._option = [];
        _this._label = null;
        return _this;
    }
    Object.defineProperty(I18nLabel.prototype, "textKey", {
        get: function () { return this._textKey; },
        set: function (key) {
            this._textKey = key;
            this.updateLabel();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(I18nLabel.prototype, "label", {
        get: function () {
            if (!this._label) {
                this._label = this.node.getComponent(cc.Label) || this.node.getComponent(cc.RichText);
                if (!this._label) {
                    cc.error("Failed to update localized label, label component is invalid!");
                    return null;
                }
            }
            return this._label;
        },
        enumerable: false,
        configurable: true
    });
    I18nLabel.prototype.onLoad = function () {
        try {
            I18n_1.default.init();
            this.updateLabel();
        }
        catch (err) {
            cc.error(err);
        }
    };
    I18nLabel.prototype.update = function () {
        if (CC_EDITOR) {
            if (this.label.string) {
                var key = I18n_1.default.getKeyByValue(this.label.string);
                if (key) {
                    this.textKey = key;
                }
            }
        }
    };
    /**
     * 更新语言
     */
    I18nLabel.prototype.updateLabel = function () {
        var localizedString = this._option instanceof Array ? I18n_1.default.getText.apply(I18n_1.default, __spreadArrays([this._textKey], this._option)) : I18n_1.default.getText(this._textKey, this._option);
        if (localizedString) {
            this.label.string = localizedString;
        }
    };
    /**
     * 设置语言与配置
     * @param key
     * @param option
     */
    I18nLabel.prototype.setTextKeyAndOption = function (key) {
        var option = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            option[_i - 1] = arguments[_i];
        }
        this._textKey = key;
        this.setOption.apply(this, option);
    };
    /**
     * 仅设置配置
     * @param option
     */
    I18nLabel.prototype.setOption = function () {
        var option = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            option[_i] = arguments[_i];
        }
        if (option.length === 1 && Object.prototype.toString.call(option[0]) === "[object Object]") {
            this._option = option[0];
        }
        else {
            this._option = option;
        }
        this.updateLabel();
    };
    /**
     * 清除key
     */
    I18nLabel.prototype.clear = function () {
        this.label.string = "";
        this.textKey = "";
    };
    __decorate([
        property(cc.String)
    ], I18nLabel.prototype, "_textKey", void 0);
    __decorate([
        property({ type: cc.String, tooltip: "i18n key" })
    ], I18nLabel.prototype, "textKey", null);
    __decorate([
        Events_1.preloadEvent(EventName_1.EventName.UPDATE_LOCALIZED_CMPT)
    ], I18nLabel.prototype, "updateLabel", null);
    I18nLabel = __decorate([
        ccclass,
        Events_1.eventsOnLoad(),
        executeInEditMode,
        menu("Framework/I18N/I18nLabel")
    ], I18nLabel);
    return I18nLabel;
}(cc.Component));
exports.default = I18nLabel;

cc._RF.pop();