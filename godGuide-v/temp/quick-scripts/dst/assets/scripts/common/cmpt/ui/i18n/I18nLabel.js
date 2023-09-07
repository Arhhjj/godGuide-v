
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/i18n/I18nLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcaTE4blxcSTE4bkxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFDckQsK0NBQWtFO0FBQ2xFLDJDQUFzQztBQUVoQyxJQUFBLEtBQWlELEVBQUUsQ0FBQyxVQUFVLEVBQTVELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGlCQUFpQix1QkFBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQU1yRTtJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQXdGQztRQXZGZ0MsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQVNuRDs7V0FFRztRQUNLLGFBQU8sR0FBOEQsRUFBRSxDQUFDO1FBRXhFLFlBQU0sR0FBMkIsSUFBSSxDQUFDOztJQXlFbEQsQ0FBQztJQXBGRyxzQkFBVyw4QkFBTzthQUFsQixjQUErQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ3RELFVBQW1CLEdBQVc7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQUpxRDtJQVl0RCxzQkFBVyw0QkFBSzthQUFoQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2QsRUFBRSxDQUFDLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO29CQUMxRSxPQUFPLElBQUksQ0FBQztpQkFDZjth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QixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnN0L0V2ZW50TmFtZVwiO1xyXG5pbXBvcnQgeyBldmVudHNPbkxvYWQsIHByZWxvYWRFdmVudCB9IGZyb20gXCIuLi8uLi8uLi91dGlsL0V2ZW50c1wiO1xyXG5pbXBvcnQgSTE4biBmcm9tIFwiLi4vLi4vLi4vdXRpbC9JMThuXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBldmVudHNPbkxvYWQoKVxyXG5AZXhlY3V0ZUluRWRpdE1vZGVcclxuQG1lbnUoXCJGcmFtZXdvcmsvSTE4Ti9JMThuTGFiZWxcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSTE4bkxhYmVsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5TdHJpbmcpIHByaXZhdGUgX3RleHRLZXk6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3RyaW5nLCB0b29sdGlwOiBcImkxOG4ga2V5XCIgfSlcclxuICAgIHB1YmxpYyBnZXQgdGV4dEtleSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdGV4dEtleTsgfVxyXG4gICAgcHVibGljIHNldCB0ZXh0S2V5KGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdGV4dEtleSA9IGtleTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjkuo7mraPliJnmm7/mjaLnmoTphY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfb3B0aW9uOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfSB8IEFycmF5PHN0cmluZyB8IG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF9sYWJlbDogY2MuTGFiZWwgfCBjYy5SaWNoVGV4dCA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCk6IGNjLkxhYmVsIHwgY2MuUmljaFRleHQge1xyXG4gICAgICAgIGlmICghdGhpcy5fbGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKSB8fCB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJGYWlsZWQgdG8gdXBkYXRlIGxvY2FsaXplZCBsYWJlbCwgbGFiZWwgY29tcG9uZW50IGlzIGludmFsaWQhXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgSTE4bi5pbml0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGFiZWwoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhYmVsLnN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IEkxOG4uZ2V0S2V5QnlWYWx1ZSh0aGlzLmxhYmVsLnN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0S2V5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw6K+t6KiAXHJcbiAgICAgKi9cclxuICAgIEBwcmVsb2FkRXZlbnQoRXZlbnROYW1lLlVQREFURV9MT0NBTElaRURfQ01QVClcclxuICAgIHB1YmxpYyB1cGRhdGVMYWJlbCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbG9jYWxpemVkU3RyaW5nID0gdGhpcy5fb3B0aW9uIGluc3RhbmNlb2YgQXJyYXkgPyBJMThuLmdldFRleHQodGhpcy5fdGV4dEtleSwgLi4udGhpcy5fb3B0aW9uKSA6IEkxOG4uZ2V0VGV4dCh0aGlzLl90ZXh0S2V5LCB0aGlzLl9vcHRpb24pO1xyXG4gICAgICAgIGlmIChsb2NhbGl6ZWRTdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBsb2NhbGl6ZWRTdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6K+t6KiA5LiO6YWN572uXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUZXh0S2V5QW5kT3B0aW9uKGtleTogc3RyaW5nLCAuLi5vcHRpb246IFt7IFtrOiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfV0gfCBBcnJheTxzdHJpbmcgfCBudW1iZXI+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdGV4dEtleSA9IGtleTtcclxuICAgICAgICB0aGlzLnNldE9wdGlvbiguLi5vcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuF6K6+572u6YWN572uXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRPcHRpb24oLi4ub3B0aW9uOiBbeyBbazogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH1dIHwgQXJyYXk8c3RyaW5nIHwgbnVtYmVyPik6IHZvaWQge1xyXG4gICAgICAgIGlmIChvcHRpb24ubGVuZ3RoID09PSAxICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcHRpb25bMF0pID09PSBcIltvYmplY3QgT2JqZWN0XVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbiA9IG9wdGlvblswXSBhcyB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb24gPSBvcHRpb24gYXMgQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmka2V5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy50ZXh0S2V5ID0gXCJcIjtcclxuICAgIH1cclxufVxyXG4iXX0=