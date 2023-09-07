
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/button/ButtonSingle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0dd4fIEsu5H8YHrLixEwxNu', 'ButtonSingle');
// scripts/common/cmpt/ui/button/ButtonSingle.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, requireComponent = _a.requireComponent;
/**
 * 按钮分组
 */
var ButtonGroup;
(function (ButtonGroup) {
    ButtonGroup[ButtonGroup["DEFAULT"] = 0] = "DEFAULT";
    ButtonGroup[ButtonGroup["GROUP1"] = 1] = "GROUP1";
    ButtonGroup[ButtonGroup["GROUP2"] = 2] = "GROUP2";
})(ButtonGroup || (ButtonGroup = {}));
/**
 * 防多点触摸的按钮，同组按钮同一时刻只会有一个生效
 */
var ButtonSingle = /** @class */ (function (_super) {
    __extends(ButtonSingle, _super);
    function ButtonSingle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buttonGroup = ButtonGroup.DEFAULT;
        _this._button = null;
        return _this;
    }
    ButtonSingle_1 = ButtonSingle;
    Object.defineProperty(ButtonSingle, "groupMap", {
        get: function () {
            if (this._groupMap === null) {
                this._groupMap = new Map();
            }
            return this._groupMap;
        },
        enumerable: false,
        configurable: true
    });
    ButtonSingle.prototype.onLoad = function () {
        this._button = this.getComponent(cc.Button);
        var groupData = ButtonSingle_1.groupMap.get(this.buttonGroup);
        if (groupData === undefined) {
            groupData = {
                lock: false,
                buttonSet: new Set()
            };
            ButtonSingle_1.groupMap.set(this.buttonGroup, groupData);
        }
        groupData.buttonSet.add(this._button);
        // 监听触摸事件
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    };
    ButtonSingle.prototype.onDestroy = function () {
        var groupData = ButtonSingle_1.groupMap.get(this.buttonGroup);
        if (groupData === undefined) {
            cc.error("[ButtonSingle.onDestroy] \u6570\u636E\u5F02\u5E38 ButtonGroup: " + this.buttonGroup);
            return;
        }
        groupData.buttonSet.delete(this._button);
        this.unlock(groupData);
    };
    ButtonSingle.prototype.onTouchStart = function (event) {
        var _this = this;
        var groupData = ButtonSingle_1.groupMap.get(this.buttonGroup);
        if (groupData === undefined) {
            cc.error("[ButtonSingle.onTouchStart] \u6570\u636E\u5F02\u5E38 ButtonGroup: " + this.buttonGroup);
            return;
        }
        if (groupData.lock) {
            return;
        }
        groupData.lock = true;
        groupData.buttonSet.forEach(function (e) {
            e.enabled = (e === _this._button);
        });
    };
    ButtonSingle.prototype.onTouchEnd = function (event) {
        var groupData = ButtonSingle_1.groupMap.get(this.buttonGroup);
        if (groupData === undefined) {
            cc.error("[ButtonSingle.onTouchEnd] \u6570\u636E\u5F02\u5E38 ButtonGroup: " + this.buttonGroup);
            return;
        }
        this.unlock(groupData);
    };
    /**
     * 当前按钮松开或销毁时解除同组按钮锁定状态
     */
    ButtonSingle.prototype.unlock = function (groupData) {
        if (groupData.lock && this._button.enabled) {
            groupData.lock = false;
            groupData.buttonSet.forEach(function (e) {
                e.enabled = true;
            });
        }
    };
    var ButtonSingle_1;
    /** 记录所有绑定该组件的按钮数据 */
    ButtonSingle._groupMap = null;
    __decorate([
        property({ type: cc.Enum(ButtonGroup), tooltip: CC_DEV && "按钮分组，同组按钮同一时刻只会有一个生效" })
    ], ButtonSingle.prototype, "buttonGroup", void 0);
    ButtonSingle = ButtonSingle_1 = __decorate([
        ccclass,
        requireComponent(cc.Button),
        menu("Framework/UI组件/ButtonSingle")
    ], ButtonSingle);
    return ButtonSingle;
}(cc.Component));
exports.default = ButtonSingle;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcYnV0dG9uXFxCdXR0b25TaW5nbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFnRCxFQUFFLENBQUMsVUFBVSxFQUEzRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQWtCLENBQUM7QUFZcEU7O0dBRUc7QUFDSCxJQUFLLFdBSUo7QUFKRCxXQUFLLFdBQVc7SUFDWixtREFBTyxDQUFBO0lBQ1AsaURBQU0sQ0FBQTtJQUNOLGlEQUFNLENBQUE7QUFDVixDQUFDLEVBSkksV0FBVyxLQUFYLFdBQVcsUUFJZjtBQUVEOztHQUVHO0FBSUg7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFnRkM7UUE5RVUsaUJBQVcsR0FBZ0IsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQVc5QyxhQUFPLEdBQWMsSUFBSSxDQUFDOztJQW1FdEMsQ0FBQztxQkFoRm9CLFlBQVk7SUFNN0Isc0JBQW1CLHdCQUFRO2FBQTNCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtnQkFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO2FBQzlCO1lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBSVMsNkJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLElBQUksU0FBUyxHQUFjLGNBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDekIsU0FBUyxHQUFHO2dCQUNSLElBQUksRUFBRSxL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Q0FBQzs7SUEzRUQscUJBQXFCO0lBQ04sc0JBQVMsR0FBZ0MsSUFBSSxDQUFDO0lBSDdEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxzQkFBc0IsRUFBRSxDQUFDO3FEQUM5QjtJQUZyQyxZQUFZO1FBSGhDLE9BQU87UUFDUCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztPQUNmLFlBQVksQ0FnRmhDO0lBQUQsbUJBQUM7Q0FoRkQsQUFnRkMsQ0FoRnlDLEVBQUUsQ0FBQyxTQUFTLEdBZ0ZyRDtrQkFoRm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51LCByZXF1aXJlQ29tcG9uZW50IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIOaMiemSrue7hOaVsOaNrlxyXG4gKi9cclxuaW50ZXJmYWNlIEdyb3VwRGF0YSB7XHJcbiAgICAvKiog6K+l57uE5piv5ZCm6ZSB5a6a77yM5ZCM57uE5oyJ6ZKu6KKr6Kem5pG45pe26L+b5YWl6ZSB5a6a54q25oCBICovXHJcbiAgICBsb2NrOiBib29sZWFuO1xyXG4gICAgLyoqIOWQjOe7hOaMiemSriAqL1xyXG4gICAgYnV0dG9uU2V0OiBTZXQ8Y2MuQnV0dG9uPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaMiemSruWIhue7hFxyXG4gKi9cclxuZW51bSBCdXR0b25Hcm91cCB7XHJcbiAgICBERUZBVUxULFxyXG4gICAgR1JPVVAxLFxyXG4gICAgR1JPVVAyLFxyXG59XHJcblxyXG4vKipcclxuICog6Ziy5aSa54K56Kem5pG455qE5oyJ6ZKu77yM5ZCM57uE5oyJ6ZKu5ZCM5LiA5pe25Yi75Y+q5Lya5pyJ5LiA5Liq55Sf5pWIXHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5AcmVxdWlyZUNvbXBvbmVudChjYy5CdXR0b24pXHJcbkBtZW51KFwiRnJhbWV3b3JrL1VJ57uE5Lu2L0J1dHRvblNpbmdsZVwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b25TaW5nbGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShCdXR0b25Hcm91cCksIHRvb2x0aXA6IENDX0RFViAmJiBcIuaMiemSruWIhue7hO+8jOWQjOe7hOaMiemSruWQjOS4gOaXtuWIu+WPquS8muacieS4gOS4queUn+aViFwiIH0pXHJcbiAgICBwdWJsaWMgYnV0dG9uR3JvdXA6IEJ1dHRvbkdyb3VwID0gQnV0dG9uR3JvdXAuREVGQVVMVDtcclxuXHJcbiAgICAvKiog6K6w5b2V5omA5pyJ57uR5a6a6K+l57uE5Lu255qE5oyJ6ZKu5pWw5o2uICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfZ3JvdXBNYXA6IE1hcDxCdXR0b25Hcm91cCwgR3JvdXBEYXRhPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXQgZ3JvdXBNYXAoKTogTWFwPEJ1dHRvbkdyb3VwLCBHcm91cERhdGE+IHtcclxuICAgICAgICBpZiAodGhpcy5fZ3JvdXBNYXAgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ3JvdXBNYXAgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91cE1hcDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9idXR0b246IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9idXR0b24gPSB0aGlzLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIGxldCBncm91cERhdGE6IEdyb3VwRGF0YSA9IEJ1dHRvblNpbmdsZS5ncm91cE1hcC5nZXQodGhpcy5idXR0b25Hcm91cCk7XHJcbiAgICAgICAgaWYgKGdyb3VwRGF0YSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGdyb3VwRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGxvY2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uU2V0OiBuZXcgU2V0KClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgQnV0dG9uU2luZ2xlLmdyb3VwTWFwLnNldCh0aGlzLmJ1dHRvbkdyb3VwLCBncm91cERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBncm91cERhdGEuYnV0dG9uU2V0LmFkZCh0aGlzLl9idXR0b24pO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzop6bmkbjkuovku7ZcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZ3JvdXBEYXRhOiBHcm91cERhdGEgPSBCdXR0b25TaW5nbGUuZ3JvdXBNYXAuZ2V0KHRoaXMuYnV0dG9uR3JvdXApO1xyXG4gICAgICAgIGlmIChncm91cERhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihgW0J1dHRvblNpbmdsZS5vbkRlc3Ryb3ldIOaVsOaNruW8guW4uCBCdXR0b25Hcm91cDogJHt0aGlzLmJ1dHRvbkdyb3VwfWApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyb3VwRGF0YS5idXR0b25TZXQuZGVsZXRlKHRoaXMuX2J1dHRvbik7XHJcbiAgICAgICAgdGhpcy51bmxvY2soZ3JvdXBEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG91Y2hTdGFydChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBncm91cERhdGE6IEdyb3VwRGF0YSA9IEJ1dHRvblNpbmdsZS5ncm91cE1hcC5nZXQodGhpcy5idXR0b25Hcm91cCk7XHJcbiAgICAgICAgaWYgKGdyb3VwRGF0YSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGBbQnV0dG9uU2luZ2xlLm9uVG91Y2hTdGFydF0g5pWw5o2u5byC5bi4IEJ1dHRvbkdyb3VwOiAke3RoaXMuYnV0dG9uR3JvdXB9YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChncm91cERhdGEubG9jaykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyb3VwRGF0YS5sb2NrID0gdHJ1ZTtcclxuICAgICAgICBncm91cERhdGEuYnV0dG9uU2V0LmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICAgICAgZS5lbmFibGVkID0gKGUgPT09IHRoaXMuX2J1dHRvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRvdWNoRW5kKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGdyb3VwRGF0YTogR3JvdXBEYXRhID0gQnV0dG9uU2luZ2xlLmdyb3VwTWFwLmdldCh0aGlzLmJ1dHRvbkdyb3VwKTtcclxuICAgICAgICBpZiAoZ3JvdXBEYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoYFtCdXR0b25TaW5nbGUub25Ub3VjaEVuZF0g5pWw5o2u5byC5bi4IEJ1dHRvbkdyb3VwOiAke3RoaXMuYnV0dG9uR3JvdXB9YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudW5sb2NrKGdyb3VwRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3mjInpkq7mnb7lvIDmiJbplIDmr4Hml7bop6PpmaTlkIznu4TmjInpkq7plIHlrprnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1bmxvY2soZ3JvdXBEYXRhOiBHcm91cERhdGEpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ3JvdXBEYXRhLmxvY2sgJiYgdGhpcy5fYnV0dG9uLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgZ3JvdXBEYXRhLmxvY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgZ3JvdXBEYXRhLmJ1dHRvblNldC5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19