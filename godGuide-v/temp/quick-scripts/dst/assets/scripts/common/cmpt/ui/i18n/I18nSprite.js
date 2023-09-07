
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/i18n/I18nSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcaTE4blxcSTE4blNwcml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFDckQsK0NBQWtFO0FBQ2xFLDJDQUFvRDtBQUNwRCw4Q0FBeUM7QUFFbkMsSUFBQSxLQUFzQyxFQUFFLENBQUMsVUFBVSxFQUFqRCxPQUFPLGFBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQWtCLENBQUM7QUFNMUQ7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUE4Q0M7UUE3Q1csYUFBTyxHQUFjLElBQUksQ0FBQztRQUMxQixlQUFTLEdBQVcsRUFBRSxDQUFDOztJQTRDbkMsQ0FBQztJQTFDRyxzQkFBVyxnQ0FBUTtRQURuQixVQUFVO2FBQ1YsY0FBZ0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUN4RCxVQUFvQixDQUFTO1lBQ3pCLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7T0FQdUQ7SUFTOUMsMkJBQU0sR0FBaEI7UUFDSSxJQUFJO1lBQ0EsY0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVosSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztZQUM1QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQzthQUNqRDtTQUNKO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUdNLGlDQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsT0FBTztTQUNWO1FBRUQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsUUFBUSxjQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2xCLEtBQUssZUFBUSxDQUFDLEVBQUU7Z0JBQ1osR0FBRyxHQUFHLDZCQUE2QixDQUFDO2dCQUNwQyxNQUFNO1lBQ1YsS0FBSyxlQUFRLENBQUMsRUFBRTtnQkFDWixHQUFHLEdBQUcsNkJBQTZCLENBQUM7Z0JBQ3BDLE1BQU07WUFDVjtnQkFDSSxPQUFPO1NBQ2Q7UUFDRCxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBbEJEO1FBREMscUJBQVksQ0FBQyxxQkFBUyxDQUFDLHFCQUFxQixDQUFDO2tEQW1CN0M7SUE3Q2dCLFVBQVU7UUFKOUIsT0FBTztRQUNQLHFCQUFZLEVBQUU7UUFDZCxnQkFBZ0IsQ0FBQyxtQkFBUyxDQUFDO1FBQzNCLElBQUksQ0FBQywyQkFBMkIsQ0FBQztPQUNiLFVBQVUsQ0E4QzlCO0lBQUQsaUJBQUM7Q0E5Q0QsQUE4Q0MsQ0E5Q3VDLEVBQUUsQ0FBQyxTQUFTLEdBOENuRDtrQkE5Q29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudE5hbWUgfSBmcm9tIFwiLi4vLi4vLi4vY29uc3QvRXZlbnROYW1lXCI7XHJcbmltcG9ydCB7IGV2ZW50c09uTG9hZCwgcHJlbG9hZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWwvRXZlbnRzXCI7XHJcbmltcG9ydCBJMThuLCB7IExhbmdUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWwvSTE4blwiO1xyXG5pbXBvcnQgUmVzU3ByaXRlIGZyb20gXCIuLi9yZXMvUmVzU3ByaXRlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIG1lbnUsIHJlcXVpcmVDb21wb25lbnQgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AZXZlbnRzT25Mb2FkKClcclxuQHJlcXVpcmVDb21wb25lbnQoUmVzU3ByaXRlKVxyXG5AbWVudShcIkZyYW1ld29yay9JMThOL0kxOG5TcHJpdGVcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSTE4blNwcml0ZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIF9zcHJpdGU6IFJlc1Nwcml0ZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9pbWFnZUtleTogc3RyaW5nID0gXCJcIjtcclxuICAgIC8qKiDlm77niYflkI0gKi9cclxuICAgIHB1YmxpYyBnZXQgaW1hZ2VLZXkoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2ltYWdlS2V5OyB9XHJcbiAgICBwdWJsaWMgc2V0IGltYWdlS2V5KHY6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbWFnZUtleSA9PT0gdikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2ltYWdlS2V5ID0gdjtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNwcml0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgSTE4bi5pbml0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChSZXNTcHJpdGUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3ByaXRlLnNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlS2V5ID0gdGhpcy5fc3ByaXRlLnNwcml0ZUZyYW1lLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQHByZWxvYWRFdmVudChFdmVudE5hbWUuVVBEQVRFX0xPQ0FMSVpFRF9DTVBUKVxyXG4gICAgcHVibGljIHVwZGF0ZVNwcml0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW1hZ2VLZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHVybCA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChJMThuLmN1ckxhbmcpIHtcclxuICAgICAgICAgICAgY2FzZSBMYW5nVHlwZS5aSDpcclxuICAgICAgICAgICAgICAgIHVybCA9IFwidGV4dHVyZXMvbG9jYWxpemVkSW1hZ2UvemgvXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5nVHlwZS5FTjpcclxuICAgICAgICAgICAgICAgIHVybCA9IFwidGV4dHVyZXMvbG9jYWxpemVkSW1hZ2UvZW4vXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXJsICs9IHRoaXMuaW1hZ2VLZXk7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlLnNldFNwcml0ZUZyYW1lKHVybCk7XHJcbiAgICB9XHJcbn1cclxuIl19