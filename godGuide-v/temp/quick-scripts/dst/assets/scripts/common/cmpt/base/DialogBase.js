
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/base/DialogBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9b83e2KZopKTb+TLQZNTspz', 'DialogBase');
// scripts/common/cmpt/base/DialogBase.ts

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
var EditorTool_1 = require("../../util/EditorTool");
var Tool_1 = require("../../util/Tool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
/**
 * 弹窗基类
 */
var DialogBase = /** @class */ (function (_super) {
    __extends(DialogBase, _super);
    function DialogBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dlgAnim = null;
        _this.openClip = null;
        _this.closeClip = null;
        /** 外部的resolve函数，在弹窗close时调用 */
        _this._resolveList = [];
        _this._prefabUrl = "";
        return _this;
    }
    Object.defineProperty(DialogBase.prototype, "prefabUrl", {
        /** 弹窗prefab路径，规则同Res加载路径 */
        get: function () { return this._prefabUrl; },
        enumerable: false,
        configurable: true
    });
    DialogBase.prototype.onLoad = function () {
        if (this.dlgAnim) {
            this.openClip && this.dlgAnim.addClip(this.openClip);
            this.closeClip && this.dlgAnim.addClip(this.closeClip);
            this.dlgAnim.on(cc.Animation.EventType.FINISHED, this.onAnimFinished, this);
        }
    };
    DialogBase.prototype.resetInEditor = function () {
        var _this = this;
        if (!CC_EDITOR) {
            return;
        }
        // 动画
        for (var i = 0; i < this.node.childrenCount; i++) {
            var anim = this.node.children[i].getComponent(cc.Animation);
            if (anim) {
                this.dlgAnim = anim;
                EditorTool_1.default.load("res/animation/dialog/open.anim").then(function (v) { _this.openClip = v; });
                EditorTool_1.default.load("res/animation/dialog/close.anim").then(function (v) { _this.closeClip = v; });
                break;
            }
        }
        // 触摸拦截
        if (this.node.childrenCount <= 0 || !this.node.children[0].getComponent(cc.BlockInputEvents)) {
            var block = new cc.Node("Block");
            this.node.addChild(block);
            block.setSiblingIndex(0);
            block.setContentSize(this.node.getContentSize());
            block.addComponent(cc.BlockInputEvents);
            var widget = block.addComponent(cc.Widget);
            widget.isAlignTop = true;
            widget.isAlignBottom = true;
            widget.isAlignLeft = true;
            widget.isAlignRight = true;
        }
    };
    DialogBase.prototype.onAnimFinished = function () {
        if (this.dlgAnim.currentClip === this.closeClip) {
            this.close();
        }
    };
    /**
     * 打开动画
     */
    DialogBase.prototype.playOpen = function () {
        if (this.dlgAnim && this.openClip) {
            this.dlgAnim.play(this.openClip.name);
        }
    };
    /**
     * 关闭动画，动画结束回调中会调用close销毁
     */
    DialogBase.prototype.playClose = function () {
        if (this.dlgAnim && this.closeClip) {
            if (this.dlgAnim.getAnimationState(this.closeClip.name).isPlaying) {
                return;
            }
            this.dlgAnim.play(this.closeClip.name);
        }
        else {
            this.close();
        }
    };
    /**
     * 打开弹窗时的处理
     * @virtual
     */
    DialogBase.prototype.onOpen = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    /**
     * 关闭弹窗时的处理
     * @virtual
     */
    DialogBase.prototype.onClose = function () {
    };
    /**
     * 销毁弹窗节点时的处理。
     * - 必须使用此接口销毁，子类重写时请调用super.close()
     * @virtual
     */
    DialogBase.prototype.close = function () {
        this.onClose();
        this._resolveList.forEach(function (resolve) { resolve(); });
        this.node.removeFromParent();
        this.node.destroy();
    };
    /**
     * 关闭按钮回调
     * @virtual
     */
    DialogBase.prototype.onClickClose = function () {
        this.playClose();
    };
    /**
     * 添加外部resolve函数，在弹窗close时调用
     */
    DialogBase.prototype.addResolve = function (resolve) {
        Tool_1.default.arrayAdd(this._resolveList, resolve);
    };
    /** 弹窗prefab路径，规则同Res加载路径 */
    DialogBase.pUrl = "";
    __decorate([
        property(cc.Animation)
    ], DialogBase.prototype, "dlgAnim", void 0);
    __decorate([
        property({
            type: cc.AnimationClip,
            tooltip: CC_DEV && "打开弹窗的动画",
            visible: function () { return !!this.dlgAnim; }
        })
    ], DialogBase.prototype, "openClip", void 0);
    __decorate([
        property({
            type: cc.AnimationClip,
            tooltip: CC_DEV && "关闭弹窗的动画",
            visible: function () { return !!this.dlgAnim; }
        })
    ], DialogBase.prototype, "closeClip", void 0);
    DialogBase = __decorate([
        ccclass,
        disallowMultiple,
        menu("Framework/基础组件/DialogBase")
    ], DialogBase);
    return DialogBase;
}(cc.Component));
exports.default = DialogBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFxiYXNlXFxEaWFsb2dCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUMvQyx3Q0FBbUM7QUFFN0IsSUFBQSxLQUFnRCxFQUFFLENBQUMsVUFBVSxFQUEzRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFFcEU7O0dBRUc7QUFJSDtJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQXNJQztRQWpJYSxhQUFPLEdBQWlCLElBQUksQ0FBQztRQU83QixjQUFRLEdBQXFCLElBQUksQ0FBQztRQU9sQyxlQUFTLEdBQXFCLElBQUksQ0FBQztRQUU3QywrQkFBK0I7UUFDdkIsa0JBQVksR0FBaUMsRUFBRSxDQUFDO1FBRWhELGdCQUFVLEdBQVcsRUFBRSxDQUFDOztJQThHcEMsQ0FBQztJQTVHRyxzQkFBVyxpQ0FBUztRQURwQiw0QkFBNEI7YUFDNUIsY0FBaUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFaEQsMkJBQU0sR0FBaEI7UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMvRTtJQUNMLENBQUM7SUFFUyxr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LElBQUksU0FBUztZQUM1QixPQUFPLGdCQUFLLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDLENBQUM7aURBQzJDO0lBbkI1QixVQUFVO1FBSDlCLE9BQU87UUFDUCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLDJCQUEyQixDQUFDO09BQ2IsVUFBVSxDQXNJOUI7SUFBRCxpQkFBQztDQXRJRCxBQXNJQyxDQXRJdUMsRUFBRSxDQUFDLFNBQVMsR0FzSW5EO2tCQXRJb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFZGl0b3JUb29sIGZyb20gXCIuLi8uLi91dGlsL0VkaXRvclRvb2xcIjtcclxuaW1wb3J0IFRvb2wgZnJvbSBcIi4uLy4uL3V0aWwvVG9vbFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgZGlzYWxsb3dNdWx0aXBsZSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiDlvLnnqpfln7rnsbtcclxuICovXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkBtZW51KFwiRnJhbWV3b3JrL+WfuuehgOe7hOS7ti9EaWFsb2dCYXNlXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpYWxvZ0Jhc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgLyoqIOW8ueeql3ByZWZhYui3r+W+hO+8jOinhOWImeWQjFJlc+WKoOi9vei3r+W+hCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBwVXJsOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5BbmltYXRpb24pXHJcbiAgICBwcm90ZWN0ZWQgZGxnQW5pbTogY2MuQW5pbWF0aW9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbkNsaXAsXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5omT5byA5by556qX55qE5Yqo55S7XCIsXHJcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuICEhdGhpcy5kbGdBbmltOyB9XHJcbiAgICB9KVxyXG4gICAgcHJvdGVjdGVkIG9wZW5DbGlwOiBjYy5BbmltYXRpb25DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvbkNsaXAsXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5YWz6Zet5by556qX55qE5Yqo55S7XCIsXHJcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuICEhdGhpcy5kbGdBbmltOyB9XHJcbiAgICB9KVxyXG4gICAgcHJvdGVjdGVkIGNsb3NlQ2xpcDogY2MuQW5pbWF0aW9uQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgLyoqIOWklumDqOeahHJlc29sdmXlh73mlbDvvIzlnKjlvLnnqpdjbG9zZeaXtuiwg+eUqCAqL1xyXG4gICAgcHJpdmF0ZSBfcmVzb2x2ZUxpc3Q6IEFycmF5PCh2YWx1ZT86IGFueSkgPT4gdm9pZD4gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF9wcmVmYWJVcmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKiog5by556qXcHJlZmFi6Lev5b6E77yM6KeE5YiZ5ZCMUmVz5Yqg6L296Lev5b6EICovXHJcbiAgICBwdWJsaWMgZ2V0IHByZWZhYlVybCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcHJlZmFiVXJsOyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kbGdBbmltKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkNsaXAgJiYgdGhpcy5kbGdBbmltLmFkZENsaXAodGhpcy5vcGVuQ2xpcCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VDbGlwICYmIHRoaXMuZGxnQW5pbS5hZGRDbGlwKHRoaXMuY2xvc2VDbGlwKTtcclxuICAgICAgICAgICAgdGhpcy5kbGdBbmltLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsIHRoaXMub25BbmltRmluaXNoZWQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJbkVkaXRvcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWKqOeUu1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYW5pbTogY2MuQW5pbWF0aW9uID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICBpZiAoYW5pbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kbGdBbmltID0gYW5pbTtcclxuICAgICAgICAgICAgICAgIEVkaXRvclRvb2wubG9hZDxjYy5BbmltYXRpb25DbGlwPihcInJlcy9hbmltYXRpb24vZGlhbG9nL29wZW4uYW5pbVwiKS50aGVuKCh2KSA9PiB7IHRoaXMub3BlbkNsaXAgPSB2OyB9KTtcclxuICAgICAgICAgICAgICAgIEVkaXRvclRvb2wubG9hZDxjYy5BbmltYXRpb25DbGlwPihcInJlcy9hbmltYXRpb24vZGlhbG9nL2Nsb3NlLmFuaW1cIikudGhlbigodikgPT4geyB0aGlzLmNsb3NlQ2xpcCA9IHY7IH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6Kem5pG45oum5oiqXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZHJlbkNvdW50IDw9IDAgfHwgIXRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuQmxvY2tJbnB1dEV2ZW50cykpIHtcclxuICAgICAgICAgICAgbGV0IGJsb2NrID0gbmV3IGNjLk5vZGUoXCJCbG9ja1wiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGJsb2NrKTtcclxuICAgICAgICAgICAgYmxvY2suc2V0U2libGluZ0luZGV4KDApO1xyXG4gICAgICAgICAgICBibG9jay5zZXRDb250ZW50U2l6ZSh0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKSk7XHJcbiAgICAgICAgICAgIGJsb2NrLmFkZENvbXBvbmVudChjYy5CbG9ja0lucHV0RXZlbnRzKTtcclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IGJsb2NrLmFkZENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkFuaW1GaW5pc2hlZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kbGdBbmltLmN1cnJlbnRDbGlwID09PSB0aGlzLmNsb3NlQ2xpcCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbGF5T3BlbigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kbGdBbmltICYmIHRoaXMub3BlbkNsaXApIHtcclxuICAgICAgICAgICAgdGhpcy5kbGdBbmltLnBsYXkodGhpcy5vcGVuQ2xpcC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63liqjnlLvvvIzliqjnlLvnu5PmnZ/lm57osIPkuK3kvJrosIPnlKhjbG9zZemUgOavgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGxheUNsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmRsZ0FuaW0gJiYgdGhpcy5jbG9zZUNsaXApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGxnQW5pbS5nZXRBbmltYXRpb25TdGF0ZSh0aGlzLmNsb3NlQ2xpcC5uYW1lKS5pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRsZ0FuaW0ucGxheSh0aGlzLmNsb3NlQ2xpcC5uYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA5by556qX5pe255qE5aSE55CGXHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25PcGVuKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63lvLnnqpfml7bnmoTlpITnkIZcclxuICAgICAqIEB2aXJ0dWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkNsb3NlKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+B5by556qX6IqC54K55pe255qE5aSE55CG44CCXHJcbiAgICAgKiAtIOW/hemhu+S9v+eUqOatpOaOpeWPo+mUgOavge+8jOWtkOexu+mHjeWGmeaXtuivt+iwg+eUqHN1cGVyLmNsb3NlKClcclxuICAgICAqIEB2aXJ0dWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlTGlzdC5mb3JFYWNoKChyZXNvbHZlKSA9PiB7IHJlc29sdmUoKTsgfSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5oyJ6ZKu5Zue6LCDXHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25DbGlja0Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGxheUNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDlpJbpg6hyZXNvbHZl5Ye95pWw77yM5Zyo5by556qXY2xvc2Xml7bosIPnlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFJlc29sdmUocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgVG9vbC5hcnJheUFkZCh0aGlzLl9yZXNvbHZlTGlzdCwgcmVzb2x2ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19