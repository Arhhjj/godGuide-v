
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/scrollList/VirtualItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '37390yL2g9Gx56ICLo3MK1K', 'VirtualItem');
// scripts/common/cmpt/ui/scrollList/VirtualItem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, disallowMultiple = _a.disallowMultiple;
/**
 * 虚拟列表的元素组件
 */
var VirtualItem = /** @class */ (function (_super) {
    __extends(VirtualItem, _super);
    function VirtualItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 列表数据索引 */
        _this.dataIdx = 0;
        /** 列表数据 */
        _this.args = null;
        /** 分层的其余节点，顺序为Others数组的顺序 */
        _this.others = [];
        return _this;
    }
    /**
     * 根据数据刷新item显示
     * @virtual
     */
    VirtualItem.prototype.onRefresh = function (args) {
    };
    /**
     * 在onRefresh之后调用，参数为分层显示的节点，参数顺序为Others数组的顺序
     * @virtual
     */
    VirtualItem.prototype.onRefreshOthers = function () {
        var nodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nodes[_i] = arguments[_i];
        }
    };
    /**
     * 回收item时重置内部状态
     * @virtual
     */
    VirtualItem.prototype.onReset = function () {
    };
    /**
     * 获取item显示当前数据所需的真实大小（若节点size会根据数据改变，请在此函数内返回准确的size）
     * @virtual
     */
    VirtualItem.prototype.getRealSize = function () {
        return this.node.getContentSize();
    };
    VirtualItem = __decorate([
        ccclass,
        disallowMultiple
    ], VirtualItem);
    return VirtualItem;
}(cc.Component));
exports.default = VirtualItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcc2Nyb2xsTGlzdFxcVmlydHVhbEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxLQUFnQyxFQUFFLENBQUMsVUFBVSxFQUEzQyxPQUFPLGFBQUEsRUFBRSxnQkFBZ0Isc0JBQWtCLENBQUM7QUFFcEQ7O0dBRUc7QUFHSDtJQUFnRSwrQkFBWTtJQUE1RTtRQUFBLHFFQW9DQztRQW5DRyxhQUFhO1FBQ04sYUFBTyxHQUFXLENBQUMsQ0FBQztRQUMzQixXQUFXO1FBQ0osVUFBSSxHQUFNLElBQUksQ0FBQztRQUN0Qiw2QkFBNkI7UUFDdEIsWUFBTSxHQUFjLEVBQUUsQ0FBQzs7SUE4QmxDLENBQUM7SUE1Qkc7OztPQUdHO0lBQ0ksK0JBQVMsR0FBaEIsVUFBaUIsSUFBTztJQUN4QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0kscUNBQWUsR0FBdEI7UUFBdUIsZUFBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLDBCQUFtQjs7SUFDMUMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDZCQUFPLEdBQWQ7SUFDQSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUNBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQW5DZ0IsV0FBVztRQUYvQixPQUFPO1FBQ1AsZ0JBQWdCO09BQ0ksV0FBVyxDQW9DL0I7SUFBRCxrQkFBQztDQXBDRCxBQW9DQyxDQXBDK0QsRUFBRSxDQUFDLFNBQVMsR0FvQzNFO2tCQXBDb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpcnR1YWxBcmdzIH0gZnJvbSBcIi4vVmlydHVhbExpc3RcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgZGlzYWxsb3dNdWx0aXBsZSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiDomZrmi5/liJfooajnmoTlhYPntKDnu4Tku7ZcclxuICovXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpcnR1YWxJdGVtPFQgZXh0ZW5kcyBWaXJ0dWFsQXJncz4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgLyoqIOWIl+ihqOaVsOaNrue0ouW8lSAqL1xyXG4gICAgcHVibGljIGRhdGFJZHg6IG51bWJlciA9IDA7XHJcbiAgICAvKiog5YiX6KGo5pWw5o2uICovXHJcbiAgICBwdWJsaWMgYXJnczogVCA9IG51bGw7XHJcbiAgICAvKiog5YiG5bGC55qE5YW25L2Z6IqC54K577yM6aG65bqP5Li6T3RoZXJz5pWw57uE55qE6aG65bqPICovXHJcbiAgICBwdWJsaWMgb3RoZXJzOiBjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruaVsOaNruWIt+aWsGl0ZW3mmL7npLpcclxuICAgICAqIEB2aXJ0dWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblJlZnJlc2goYXJnczogVCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyob25SZWZyZXNo5LmL5ZCO6LCD55So77yM5Y+C5pWw5Li65YiG5bGC5pi+56S655qE6IqC54K577yM5Y+C5pWw6aG65bqP5Li6T3RoZXJz5pWw57uE55qE6aG65bqPXHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25SZWZyZXNoT3RoZXJzKC4uLm5vZGVzOiBjYy5Ob2RlW10pOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWbnuaUtml0ZW3ml7bph43nva7lhoXpg6jnirbmgIFcclxuICAgICAqIEB2aXJ0dWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblJlc2V0KCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WaXRlbeaYvuekuuW9k+WJjeaVsOaNruaJgOmcgOeahOecn+WunuWkp+Wwj++8iOiLpeiKgueCuXNpemXkvJrmoLnmja7mlbDmja7mlLnlj5jvvIzor7flnKjmraTlh73mlbDlhoXov5Tlm57lh4bnoa7nmoRzaXpl77yJXHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmVhbFNpemUoKTogY2MuU2l6ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==