"use strict";
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