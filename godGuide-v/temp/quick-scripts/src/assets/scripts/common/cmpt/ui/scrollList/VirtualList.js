"use strict";
cc._RF.push(module, '8815fg/3FJEjohj/PrC9n21', 'VirtualList');
// scripts/common/cmpt/ui/scrollList/VirtualList.ts

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
exports.OtherLayoutData = exports.MainLayoutData = exports.OtherTemplateType = exports.MainTemplateType = void 0;
var EditorTool_1 = require("../../../util/EditorTool");
var Tool_1 = require("../../../util/Tool");
var VirtualLayout_1 = require("./VirtualLayout");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
/** 主元素模板类型 */
var MainTemplateType;
(function (MainTemplateType) {
    MainTemplateType[MainTemplateType["NODE"] = 0] = "NODE";
    MainTemplateType[MainTemplateType["PREFAB"] = 1] = "PREFAB";
})(MainTemplateType = exports.MainTemplateType || (exports.MainTemplateType = {}));
/** 副元素模板类型 */
var OtherTemplateType;
(function (OtherTemplateType) {
    OtherTemplateType[OtherTemplateType["NODE"] = 0] = "NODE";
    OtherTemplateType[OtherTemplateType["PREFAB"] = 1] = "PREFAB";
    OtherTemplateType[OtherTemplateType["MAIN_ITEM_CHILD"] = 2] = "MAIN_ITEM_CHILD";
})(OtherTemplateType = exports.OtherTemplateType || (exports.OtherTemplateType = {}));
/**
 * 虚拟列表主容器
 */
var MainLayoutData = /** @class */ (function () {
    function MainLayoutData() {
        this.content = null;
        this._templateType = MainTemplateType.PREFAB;
        this._templatePrefab = null;
        this._templateNode = null;
        this.editorCall = null;
    }
    Object.defineProperty(MainLayoutData.prototype, "templateType", {
        get: function () { return this._templateType; },
        set: function (v) {
            if (this._templateType === v) {
                return;
            }
            this._templateType = v;
            this.resetMainItemChild(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MainLayoutData.prototype, "templatePrefab", {
        get: function () { return this._templatePrefab; },
        set: function (v) {
            if (this._templatePrefab === v) {
                return;
            }
            this._templatePrefab = v;
            this.resetMainItemChild(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MainLayoutData.prototype, "templateNode", {
        get: function () { return this._templateNode; },
        set: function (v) {
            if (this._templateNode === v) {
                return;
            }
            this._templateNode = v;
            this.resetMainItemChild(true);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 更新枚举内容
     * @param refresh 是否强制刷新inspector
     * @returns
     */
    MainLayoutData.prototype.resetMainItemChild = function (refresh) {
        var _a;
        if (refresh === void 0) { refresh = false; }
        if (!CC_EDITOR) {
            return;
        }
        var mainItemChild = {};
        if (this.templateType === MainTemplateType.NODE && this.templateNode) {
            this.templateNode.children.forEach(function (c, i) { mainItemChild[c.name] = i; });
        }
        else if (this.templateType === MainTemplateType.PREFAB && this.templatePrefab) {
            this.templatePrefab.data.children.forEach(function (c, i) { mainItemChild[c.name] = i; });
        }
        (_a = this.editorCall) === null || _a === void 0 ? void 0 : _a.call(this, mainItemChild, refresh);
    };
    __decorate([
        property({
            type: cc.Node,
            tooltip: CC_DEV && "列表容器节点",
            visible: function () { return false; }
        })
    ], MainLayoutData.prototype, "content", void 0);
    __decorate([
        property({ type: cc.Enum(MainTemplateType) })
    ], MainLayoutData.prototype, "_templateType", void 0);
    __decorate([
        property({
            type: cc.Enum(MainTemplateType),
            tooltip: CC_DEV && "列表元素模板类型"
        })
    ], MainLayoutData.prototype, "templateType", null);
    __decorate([
        property(cc.Prefab)
    ], MainLayoutData.prototype, "_templatePrefab", void 0);
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: CC_DEV && "列表元素模板预制体",
            visible: function () { return this.templateType === MainTemplateType.PREFAB; }
        })
    ], MainLayoutData.prototype, "templatePrefab", null);
    __decorate([
        property(cc.Node)
    ], MainLayoutData.prototype, "_templateNode", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: CC_DEV && "列表元素模板节点",
            visible: function () { return this.templateType === MainTemplateType.NODE; }
        })
    ], MainLayoutData.prototype, "templateNode", null);
    MainLayoutData = __decorate([
        ccclass("MainLayoutData")
    ], MainLayoutData);
    return MainLayoutData;
}());
exports.MainLayoutData = MainLayoutData;
/**
 * 虚拟列表副容器
 */
var OtherLayoutData = /** @class */ (function () {
    function OtherLayoutData() {
        this.content = null;
        this.templateType = OtherTemplateType.PREFAB;
        this.templatePrefab = null;
        this.templateNode = null;
        this.templateChild = -1;
    }
    __decorate([
        property({
            type: cc.Node,
            tooltip: CC_DEV && "列表容器节点",
        })
    ], OtherLayoutData.prototype, "content", void 0);
    __decorate([
        property({
            type: cc.Enum(OtherTemplateType),
            tooltip: CC_DEV && "列表元素模板类型"
        })
    ], OtherLayoutData.prototype, "templateType", void 0);
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: CC_DEV && "列表元素模板预制体",
            visible: function () { return this.templateType === OtherTemplateType.PREFAB; }
        })
    ], OtherLayoutData.prototype, "templatePrefab", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: CC_DEV && "列表元素模板节点",
            visible: function () { return this.templateType === OtherTemplateType.NODE; }
        })
    ], OtherLayoutData.prototype, "templateNode", void 0);
    __decorate([
        property({
            type: cc.Enum({}),
            tooltip: CC_DEV && "以列表主元素的子节点作为模板节点",
            visible: function () { return this.templateType === OtherTemplateType.MAIN_ITEM_CHILD; }
        })
    ], OtherLayoutData.prototype, "templateChild", void 0);
    OtherLayoutData = __decorate([
        ccclass("OtherLayoutData")
    ], OtherLayoutData);
    return OtherLayoutData;
}());
exports.OtherLayoutData = OtherLayoutData;
/**
 * 虚拟列表
 */
var VirtualList = /** @class */ (function (_super) {
    __extends(VirtualList, _super);
    function VirtualList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.main = new MainLayoutData();
        _this.others = [];
        _this.isFixedSize = true;
        _this._scrollView = null;
        _this._layout = null;
        _this._argsArr = [];
        _this._calcItemSize = null;
        return _this;
    }
    Object.defineProperty(VirtualList.prototype, "scrollView", {
        get: function () {
            if (!this._scrollView) {
                this._scrollView = this.getComponent(cc.ScrollView);
            }
            return this._scrollView;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VirtualList.prototype, "layout", {
        get: function () {
            if (!this._layout) {
                this._layout = this.scrollView.content.getComponent(VirtualLayout_1.default);
            }
            return this._layout;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VirtualList.prototype, "argsArr", {
        /** 列表缓存的所有数据 */
        get: function () { return this._argsArr; },
        set: function (v) {
            this._argsArr = v;
            this.layout.rearrange();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VirtualList.prototype, "calcItemSize", {
        /** 根据参数计算元素大小的接口（isFixedSize为false时必须提供） */
        get: function () { return this._calcItemSize; },
        enumerable: false,
        configurable: true
    });
    ;
    VirtualList.prototype.onLoad = function () {
        if (CC_EDITOR) {
            this.runEditor();
            return;
        }
        if (this.layout) {
            this.layout.onInit(this);
        }
    };
    VirtualList.prototype.resetInEditor = function () {
        this.runEditor();
    };
    VirtualList.prototype.onFocusInEditor = function () {
        this.main.resetMainItemChild();
    };
    /**
     * 编辑器模式下的一些设置
     */
    VirtualList.prototype.runEditor = function () {
        var _this = this;
        if (!CC_EDITOR) {
            return;
        }
        var scrollView = this.getComponent(cc.ScrollView);
        var layout = scrollView.content.getComponent(VirtualLayout_1.default);
        if (!this.main.content) {
            this.main.content = scrollView.content;
        }
        if (!layout) {
            scrollView.content.addComponent(VirtualLayout_1.default);
        }
        this.main.editorCall = function (mainItemChild, refresh) {
            var hasChildType = false;
            for (var i = 0; i < _this.others.length; i++) {
                if (_this.others[i].templateType === OtherTemplateType.MAIN_ITEM_CHILD) {
                    hasChildType = true;
                    break;
                }
            }
            if (hasChildType) {
                EditorTool_1.default.setClassAttrPropEnum(OtherLayoutData, "templateChild", cc.Enum["getList"](mainItemChild));
                if (refresh) {
                    EditorTool_1.default.refreshSelectedInspector(_this.node);
                }
            }
        };
        this.main.resetMainItemChild();
    };
    /**
     * 滚动元素节点到view的指定位置
     * @param idx 元素下标
     * @param itemAnchor 元素的锚点位置（左下角为0点）
     * @param viewAnchor view的锚点位置（左下角为0点）
     * @param t 时间 s
     * @param a 加速度是否衰减，为true且滚动距离大时滚动会不准确
     */
    VirtualList.prototype.scrollItemToView = function (idx, itemAnchor, viewAnchor, t, a) {
        if (itemAnchor === void 0) { itemAnchor = cc.v2(); }
        if (viewAnchor === void 0) { viewAnchor = cc.v2(); }
        if (t === void 0) { t = 0; }
        if (a === void 0) { a = true; }
        this.scrollView.scrollToOffset(this.layout.getScrollOffset(idx, itemAnchor, viewAnchor), t, a);
    };
    /**
     * 滚动到视图顶部
     */
    VirtualList.prototype.scrollToTop = function (timeInSecond, attenuated) {
        if (timeInSecond === void 0) { timeInSecond = 0; }
        if (attenuated === void 0) { attenuated = true; }
        this.scrollView.scrollToTop(timeInSecond, attenuated);
    };
    /**
     * 滚动到视图底部
     */
    VirtualList.prototype.scrollToBottom = function (timeInSecond, attenuated) {
        if (timeInSecond === void 0) { timeInSecond = 0; }
        if (attenuated === void 0) { attenuated = true; }
        this.scrollView.scrollToBottom(timeInSecond, attenuated);
    };
    /**
     * 滚动到视图左部
     */
    VirtualList.prototype.scrollToLeft = function (timeInSecond, attenuated) {
        if (timeInSecond === void 0) { timeInSecond = 0; }
        if (attenuated === void 0) { attenuated = true; }
        this.scrollView.scrollToLeft(timeInSecond, attenuated);
    };
    /**
     * 滚动到视图右部
     */
    VirtualList.prototype.scrollToRight = function (timeInSecond, attenuated) {
        if (timeInSecond === void 0) { timeInSecond = 0; }
        if (attenuated === void 0) { attenuated = true; }
        this.scrollView.scrollToRight(timeInSecond, attenuated);
    };
    /**
     * 根据参数计算元素大小的接口（isFixedSize为false时必须提供）
     */
    VirtualList.prototype.setCalcItemSize = function (call) {
        this._calcItemSize = call;
    };
    /**
     * 立即更新布局
     */
    VirtualList.prototype.forceUpdate = function () {
        this.layout.forceUpdate();
    };
    /**
     * 刷新所有激活的item
     */
    VirtualList.prototype.refreshAllItems = function () {
        this.layout.refreshAllItems();
    };
    /**
     * 重置某个元素数据
     * @param index
     * @param args 元素所需参数
     */
    VirtualList.prototype.reset = function (index, args) {
        if (Tool_1.default.inRange(0, this._argsArr.length - 1, index)) {
            this._argsArr[index] = args;
            this.layout.rearrange();
        }
    };
    /**
     * 添加元素数据到尾部
     * @param args 元素所需参数
     */
    VirtualList.prototype.push = function (args) {
        var result = this._argsArr.push(args);
        this.layout.rearrange(false);
        return result;
    };
    /**
     * 删除尾部元素数据
     */
    VirtualList.prototype.pop = function () {
        var result = this._argsArr.pop();
        this.layout.rearrange();
        return result;
    };
    /**
     * 添加元素数据到头部
     * @param args
     */
    VirtualList.prototype.unshift = function (args) {
        var result = this._argsArr.unshift(args);
        this.layout.rearrange();
        return result;
    };
    /**
     * 删除头部元素数据
     */
    VirtualList.prototype.shift = function () {
        var result = this._argsArr.shift();
        this.layout.rearrange();
        return result;
    };
    /**
     * 插入或删除元素 用法同数组splice
     */
    VirtualList.prototype.splice = function (start, deleteCount) {
        var _a;
        var argsArr = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            argsArr[_i - 2] = arguments[_i];
        }
        var result;
        if (deleteCount === undefined) {
            result = this._argsArr.splice(start);
        }
        else {
            if (argsArr === undefined || argsArr.length === 0) {
                result = this._argsArr.splice(start, deleteCount);
            }
            else {
                result = (_a = this._argsArr).splice.apply(_a, __spreadArrays([start, deleteCount], argsArr));
            }
        }
        this.layout.rearrange();
        return result;
    };
    /**
     * 数据排序
     * @param call
     */
    VirtualList.prototype.sort = function (call) {
        var result = this._argsArr.sort(call);
        this.layout.rearrange();
        return result;
    };
    /**
     * 数据过滤
     */
    VirtualList.prototype.filter = function (call) {
        this._argsArr = this._argsArr.filter(call);
        this.layout.rearrange();
        return this._argsArr;
    };
    __decorate([
        property({ type: MainLayoutData, tooltip: CC_DEV && "列表主容器" })
    ], VirtualList.prototype, "main", void 0);
    __decorate([
        property({ type: OtherLayoutData, tooltip: CC_DEV && "列表副容器\n需要分层显示时使用，一般用于降低draw call" })
    ], VirtualList.prototype, "others", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "元素节点大小是否一致\n大小不一致时必须提供calcItemSize接口，且暂不支持grid排版" })
    ], VirtualList.prototype, "isFixedSize", void 0);
    VirtualList = __decorate([
        ccclass,
        disallowMultiple,
        executeInEditMode,
        requireComponent(cc.ScrollView),
        menu("Framework/UI组件/VirtualList")
    ], VirtualList);
    return VirtualList;
}(cc.Component));
exports.default = VirtualList;

cc._RF.pop();