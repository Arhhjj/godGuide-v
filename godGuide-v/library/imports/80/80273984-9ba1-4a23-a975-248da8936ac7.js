"use strict";
cc._RF.push(module, '80273mEm6FKI6l1JI2ok2rH', 'I18nSprite');
// scripts/common/cmpt/ui/i18n/I18nSprite.ts

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
var EventName_1 = require("../../../const/EventName");
var Events_1 = require("../../../util/Events");
var I18n_1 = require("../../../util/I18n");
var ResSprite_1 = require("../res/ResSprite");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, requireComponent = _a.requireComponent;
var I18nSprite = /** @class */ (function (_super) {
    __extends(I18nSprite, _super);
    function I18nSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sprite = null;
        _this._imageKey = "";
        return _this;
    }
    Object.defineProperty(I18nSprite.prototype, "imageKey", {
        /** 图片名 */
        get: function () { return this._imageKey; },
        set: function (v) {
            if (this._imageKey === v) {
                return;
            }
            this._imageKey = v;
            this.updateSprite();
        },
        enumerable: false,
        configurable: true
    });
    I18nSprite.prototype.onLoad = function () {
        try {
            I18n_1.default.init();
            this._sprite = this.getComponent(ResSprite_1.default);
            if (this._sprite.spriteFrame) {
                this.imageKey = this._sprite.spriteFrame.name;
            }
        }
        catch (err) {
            cc.error(err);
        }
    };
    I18nSprite.prototype.updateSprite = function () {
        if (!this.imageKey) {
            return;
        }
        var url = "";
        switch (I18n_1.default.curLang) {
            case I18n_1.LangType.ZH:
                url = "textures/localizedImage/zh/";
                break;
            case I18n_1.LangType.EN:
                url = "textures/localizedImage/en/";
                break;
            default:
                return;
        }
        url += this.imageKey;
        this._sprite.setSpriteFrame(url);
    };
    __decorate([
        Events_1.preloadEvent(EventName_1.EventName.UPDATE_LOCALIZED_CMPT)
    ], I18nSprite.prototype, "updateSprite", null);
    I18nSprite = __decorate([
        ccclass,
        Events_1.eventsOnLoad(),
        requireComponent(ResSprite_1.default),
        menu("Framework/I18N/I18nSprite")
    ], I18nSprite);
    return I18nSprite;
}(cc.Component));
exports.default = I18nSprite;

cc._RF.pop();