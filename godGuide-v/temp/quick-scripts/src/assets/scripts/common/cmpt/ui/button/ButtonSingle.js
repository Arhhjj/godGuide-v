"use strict";
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