"use strict";
cc._RF.push(module, '47957NchK9M3pnXr5DdUH/B', 'LoopList');
// scripts/common/cmpt/ui/scrollList/LoopList.ts

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
var Res_1 = require("../../../util/Res");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
/** 列表元素模板类型 */
var TemplateType;
(function (TemplateType) {
    TemplateType[TemplateType["NODE"] = 0] = "NODE";
    TemplateType[TemplateType["PREFAB"] = 1] = "PREFAB";
})(TemplateType || (TemplateType = {}));
/**
 * 无限循环列表(轮播图)
 */
var LoopList = /** @class */ (function (_super) {
    __extends(LoopList, _super);
    function LoopList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.templateType = TemplateType.PREFAB;
        _this.templatePrefab = null;
        _this.templateNode = null;
        _this._firstDirty = false;
        _this._refreshDirty = false;
        /** 当前显示的数据下标 */
        _this._curIdx = 0;
        /** 所有item的中间节点下标 */
        _this._midIdx = 2;
        /** 实际需显示的数据长度 */
        _this._dataLen = 0;
        _this._refreshCall = null;
        _this._target = null;
        _this._pageView = null;
        return _this;
    }
    Object.defineProperty(LoopList.prototype, "pageView", {
        get: function () {
            if (!this._pageView) {
                this._pageView = this.getComponent(cc.PageView);
            }
            return this._pageView;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoopList.prototype, "view", {
        get: function () { return this.pageView.content.parent; },
        enumerable: false,
        configurable: true
    });
    LoopList.prototype.start = function () {
        // 注册事件
        this.node.on("scroll-ended", this.onScrollEnd, this);
    };
    LoopList.prototype.lateUpdate = function () {
        if (this.pageView.getPages().length === 0) {
            return;
        }
        if (this._firstDirty) {
            this._firstDirty = false;
            this.pageView.setContentPosition(cc.v2(-this.view.width / 2 - this._midIdx * this.view.width, 0));
            this.pageView.setCurrentPageIndex(this._midIdx);
        }
        if (this._refreshDirty) {
            this._refreshDirty = false;
            this.refresh();
        }
    };
    /**
     * 初始化循环列表
     * @param length 数据长度
     * @param curIdx 初始显示的数据
     * @param refreshCall 每个item刷新时的回调
     * @param target 调用refreshCall时的this
     */
    LoopList.prototype.onInit = function (length, curIdx, refreshCall, target) {
        if (target === void 0) { target = null; }
        this._dataLen = length;
        this._curIdx = cc.misc.clampf(curIdx, 0, this._dataLen - 1);
        this._refreshCall = refreshCall;
        this._target = target;
        this._firstDirty = true;
        this._refreshDirty = true;
        // 生成节点
        if (this.pageView.getPages().length === 0) {
            var tmp = this.templateType === TemplateType.PREFAB ? this.templatePrefab : this.templateNode;
            for (var i = 0; i < 5; i++) {
                var node = Res_1.default.instantiate(tmp, this.node);
                node.active = true;
                node.setPosition(0, 0);
                this.pageView.addPage(node);
            }
            this.pageView.content.getComponent(cc.Layout).updateLayout();
        }
    };
    /**
     * 重置数据长度与当前显示的数据下标
     */
    LoopList.prototype.resetData = function (length, curIdx) {
        if (curIdx === void 0) { curIdx = null; }
        this._dataLen = length;
        this._curIdx = cc.misc.clampf(curIdx === null ? this._curIdx : curIdx, 0, this._dataLen - 1);
        this._refreshDirty = true;
    };
    /**
     * 根据下标设置当前显示的数据
     */
    LoopList.prototype.setCurIdx = function (curIdx) {
        this._curIdx = curIdx;
        this._refreshDirty = true;
    };
    LoopList.prototype.onScrollEnd = function () {
        var cur = this.pageView.getCurrentPageIndex();
        if (cur === this._midIdx) {
            return;
        }
        this.pageView.setContentPosition(cc.v2(-this.view.width / 2 - this._midIdx * this.view.width, 0));
        this.pageView.setCurrentPageIndex(this._midIdx);
        this._curIdx += cur - this._midIdx;
        while (this._curIdx < 0) {
            this._curIdx += this._dataLen;
        }
        while (this._curIdx > this._dataLen - 1) {
            this._curIdx -= this._dataLen;
        }
        this._refreshDirty = true;
    };
    LoopList.prototype.refresh = function () {
        var _this = this;
        this.pageView.content.children.forEach(function (item, index) {
            var i = _this._curIdx - (_this._midIdx - index);
            while (i < 0) {
                i += _this._dataLen;
            }
            while (i > _this._dataLen - 1) {
                i -= _this._dataLen;
            }
            if (_this._refreshCall) {
                _this._refreshCall.call(_this._target, item, i, i === _this._curIdx);
            }
        });
    };
    /** item刷新事件 */
    LoopList.ITEM_REFRESH = "LoopList-itemRefresh";
    __decorate([
        property({
            type: cc.Enum(TemplateType),
            tooltip: CC_DEV && "列表元素模板类型"
        })
    ], LoopList.prototype, "templateType", void 0);
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: CC_DEV && "列表元素模板预制体",
            visible: function () { return this.templateType === TemplateType.PREFAB; }
        })
    ], LoopList.prototype, "templatePrefab", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: CC_DEV && "列表元素模板节点",
            visible: function () { return this.templateType === TemplateType.NODE; }
        })
    ], LoopList.prototype, "templateNode", void 0);
    LoopList = __decorate([
        ccclass,
        disallowMultiple,
        requireComponent(cc.PageView),
        menu("Framework/UI组件/LoopList")
    ], LoopList);
    return LoopList;
}(cc.Component));
exports.default = LoopList;

cc._RF.pop();