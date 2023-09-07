
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/scrollList/VirtualList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcc2Nyb2xsTGlzdFxcVmlydHVhbExpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBa0Q7QUFDbEQsMkNBQXNDO0FBQ3RDLGlEQUE0QztBQUV0QyxJQUFBLEtBQXFGLEVBQUUsQ0FBQyxVQUFVLEVBQWhHLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLGlCQUFpQix1QkFBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUV6RyxjQUFjO0FBQ2QsSUFBWSxnQkFHWDtBQUhELFdBQVksZ0JBQWdCO0lBQ3hCLHVEQUFJLENBQUE7SUFDSiwyREFBTSxDQUFBO0FBQ1YsQ0FBQyxFQUhXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBRzNCO0FBRUQsY0FBYztBQUNkLElBQVksaUJBSVg7QUFKRCxXQUFZLGlCQUFpQjtJQUN6Qix5REFBSSxDQUFBO0lBQ0osNkRBQU0sQ0FBQTtJQUNOLCtFQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUpXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBSTVCO0FBS0Q7O0dBRUc7QUFFSDtJQUFBO1FBTVcsWUFBTyxHQUFZLElBQUksQ0FBQztRQUd2QixrQkFBYSxHQUFxQixnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFlMUQsb0JBQWUsR0FBYyxJQUFJLENBQUM7UUFnQmxDLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBZS9CLGVBQVUsR0FBdUQsSUFBSSxDQUFDO0lBbUJqRixDQUFDO0lBNURHLHNCQUFXLHdDQUFZO2FBQXZCLGNBQThDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDMUUsVUFBd0IsQ0FBbUI7WUFDdkMsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQVB5RTtJQWdCMUUsc0JBQVcsMENBQWM7YUFBekIsY0FBeUMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzthQUN2RSxVQUEwQixDQUFZO1lBQ2xDLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDOzs7T0FQc0U7SUFnQnZFLHNCQUFXLHdDQUFZO2FBQXZCLGNBQXFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDakUsVUFBd0IsQ0FBVTtZQUM5QixJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQzs7O09BUGdFO0lBV2pFOzs7O09BSUc7SUFDSSwyQ0FBa0IsR0FBekIsVUFBMEIsT0FBd0I7O1FBQXhCLHdCQUFBLEVBQUEsZUFBd0I7UUFDOUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNaLE9BQU87U0FDVjtRQUNELElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssZ0JBQWdCLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBTyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hGO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzdFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkY7UUFDRCxNQUFBLElBQUksQ0FBQyxVQUFVLCtDQUFmLElBQUksRUFBYyxhQUFhLEVBQUUsT0FBTyxFQUFFO0lBQzlDLENBQUM7SUFuRUQ7UUFMQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7WUFDYixPQUFPLEVBQUUsTUFBTSxJQUFJLFFBQVE7WUFDM0IsT0FBTyxnQkFBSyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDOUIsQ0FBQzttREFDNkI7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7eURBQ29CO0lBS2xFO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsT0FBTyxFQUFFLE1BQU0sSUFBSSxVQUFVO1NBQ2hDLENBQUM7c0RBQ3dFO0lBVTFFO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkRBQ3NCO0lBTTFDO1FBTEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNO1lBQ2YsT0FBTyxFQUFFLE1BQU0sSUFBSSxXQUFXO1lBQzlCLE9BQU8sZ0JBQUssT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdEUsQ0FBQzt3REFDcUU7SUFVdkU7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDb0I7SUFNdEM7UUFMQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7WUFDYixPQUFPLEVBQUUsTUFBTSxJQUFJLFVBQVU7WUFDN0IsT0FBTyxnQkFBSyxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwRSxDQUFDO3NEQUMrRDtJQTlDeEQsY0FBYztRQUQxQixPQUFPLENBQUMsZ0JBQWdCLENBQUM7T0FDYixjQUFjLENBMEUxQjtJQUFELHFCQUFDO0NBMUVELEFBMEVDLElBQUE7QUExRVksd0NBQWM7QUE0RTNCOztHQUVHO0FBRUg7SUFBQTtRQUtXLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFNeEIsaUJBQVksR0FBc0IsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1FBTzNELG1CQUFjLEdBQWMsSUFBSSxDQUFDO1FBT2pDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBTzdCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQTVCRztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTtZQUNiLE9BQU8sRUFBRSxNQUFNLElBQUksUUFBUTtTQUM5QixDQUFDO29EQUM2QjtJQU0vQjtRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2hDLE9BQU8sRUFBRSxNQUFNLElBQUksVUFBVTtTQUNoQyxDQUFDO3lEQUNnRTtJQU9sRTtRQUxDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTTtZQUNmLE9BQU8sRUFBRSxNQUFNLElBQUksV0FBVztZQUM5QixPQUFPLGdCQUFLLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFLENBQUM7MkRBQ3NDO0lBT3hDO1FBTEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJO1lBQ2IsT0FBTyxFQUFFLE1BQU0sSUFBSSxVQUFVO1lBQzdCLE9BQU8sZ0JBQUssT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckUsQ0FBQzt5REFDa0M7SUFPcEM7UUFMQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDakIsT0FBTyxFQUFFLE1BQU0sSUFBSSxrQkFBa0I7WUFDckMsT0FBTyxnQkFBSyxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztTQUNoRixDQUFDOzBEQUNnQztJQWhDekIsZUFBZTtRQUQzQixPQUFPLENBQUMsaUJBQWlCLENBQUM7T0FDZCxlQUFlLENBaUMzQjtJQUFELHNCQUFDO0NBakNELEFBaUNDLElBQUE7QUFqQ1ksMENBQWU7QUFtQzVCOztHQUVHO0FBTUg7SUFBZ0UsK0JBQVk7SUFBNUU7UUFBQSxxRUE4T0M7UUE1T1UsVUFBSSxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBRzVDLFlBQU0sR0FBc0IsRUFBRSxDQUFDO1FBRy9CLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTNCLGlCQUFXLEdBQWtCLElBQUksQ0FBQztRQVFsQyxhQUFPLEdBQXFCLElBQUksQ0FBQztRQVFqQyxjQUFRLEdBQVEsRUFBRSxDQUFDO1FBUW5CLG1CQUFhLEdBQXlCLElBQUksQ0FBQzs7SUE0TXZELENBQUM7SUFuT0csc0JBQVcsbUNBQVU7YUFBckI7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN2RDtZQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUdELHNCQUFXLCtCQUFNO2FBQWpCO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDO2FBQ3RFO1lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBSUQsc0JBQVcsZ0NBQU87UUFEbEIsZ0JBQWdCO2FBQ2hCLGNBQTRCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDbkQsVUFBbUIsQ0FBTTtZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVCLENBQUM7OztPQUprRDtJQVFuRCxzQkFBVyxxQ0FBWTtRQUR2Qiw0Q0FBNEM7YUFDNUMsY0FBa0QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBRXJFLDRCQUFNLEdBQWhCO1FBQ0ksSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRVMsbUNBQWEsR0FBdkI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVTLHFDQUFlLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNLLCtCQUFTLEdBQWpCO1FBQUEsaUJBNEJDO1FBM0JHLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixPQUFPO1NBQ1Y7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyx1QkFBYSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBQyxhQUFzQixFQUFFLE9BQWdCO1lBQzVELElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztZQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pDLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssaUJBQWlCLENBQUMsZUFBZSxFQUFFO29CQUNuRSxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUNwQixNQUFNO2lCQUNUO2FBQ0o7WUFDRCxJQUFJLFlBQVksRUFBRTtnQkFDZCxvQkFBVSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNyRyxJQUFJLE9BQU8sRUFBRTtvQkFDVCxvQkFBVSxDQUFDLHdCQUF3QixDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEQ7YUFDSjtRQUNMLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLHNDQUFnQixHQUF2QixVQUF3QixHQUFXLEVBQUUsVUFBNkIsRUFBRSxVQUE2QixFQUFFLENBQWEsRUFBRSxDQUFpQjtRQUE5RiwyQkFBQSxFQUFBLGFBQXNCLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFBRSwyQkFBQSxFQUFBLGFBQXNCLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFBRSxrQkFBQSxFQUFBLEtBQWE7UUFBRSxrQkFBQSxFQUFBLFFBQWlCO1FBQy9ILElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFRDs7T0FFRztJQUNJLGlDQUFXLEdBQWxCLFVBQW1CLFlBQXdCLEVBQUUsVUFBMEI7UUFBcEQsNkJBQUEsRUFBQSxnQkFBd0I7UUFBRSwyQkFBQSxFQUFBLGlCQUEwQjtRQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksb0NBQWMsR0FBckIsVUFBc0IsWUFBd0IsRUFBRSxVQUEwQjtRQUFwRCw2QkFBQSxFQUFBLGdCQUF3QjtRQUFFLDJCQUFBLEVBQUEsaUJBQTBCO1FBQ3RFLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxrQ0FBWSxHQUFuQixVQUFvQixZQUF3QixFQUFFLFVBQTBCO1FBQXBELDZCQUFBLEVBQUEsZ0JBQXdCO1FBQUUsMkJBQUEsRUFBQSxpQkFBMEI7UUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7T0FFRztJQUNJLG1DQUFhLEdBQXBCLFVBQXFCLFlBQXdCLEVBQUUsVUFBMEI7UUFBcEQsNkJBQUEsRUFBQSxnQkFBd0I7UUFBRSwyQkFBQSxFQUFBLGlCQUEwQjtRQUNyRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOztPQUVHO0lBQ0kscUNBQWUsR0FBdEIsVUFBdUIsSUFBMEI7UUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksaUNBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7T0FFRztJQUNJLHFDQUFlLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDJCQUFLLEdBQVosVUFBYSxLQUFhLEVBQUUsSUFBTztRQUMvQixJQUFJLGNBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDBCQUFJLEdBQVgsVUFBWSxJQUFPO1FBQ2YsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0kseUJBQUcsR0FBVjtRQUNJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4QixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNkJBQU8sR0FBZCxVQUFlLElBQU87UUFDbEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4QixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSSwyQkFBSyxHQUFaO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLDRCQUFNLEdBQWIsVUFBYyxLQUFhLEVBQUUsV0FBb0I7O1FBQUUsaUJBQWU7YUFBZixVQUFlLEVBQWYscUJBQWUsRUFBZixJQUFlO1lBQWYsZ0NBQWU7O1FBQzlELElBQUksTUFBVyxDQUFDO1FBQ2hCLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUMzQixNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEM7YUFBTTtZQUNILElBQUksT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDL0MsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQzthQUNyRDtpQkFBTTtnQkFDSCxNQUFNLEdBQUcsQ0FBQSxLQUFBLElBQUksQ0FBQyxRQUFRLENBQUEsQ0FBQyxNQUFNLDJCQUFDLEtBQUssRUFBRSxXQUFXLEdBQUssT0FBTyxFQUFDLENBQUM7YUFDakU7U0FDSjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDBCQUFJLEdBQVgsVUFBWSxJQUE0QjtRQUNwQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLDRCQUFNLEdBQWIsVUFBYyxJQUFzRDtRQUNoRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUEzT0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7NkNBQ1o7SUFHbkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksa0NBQWtDLEVBQUUsQ0FBQzsrQ0FDckQ7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLGtEQUFrRCxFQUFFLENBQUM7b0RBQ2pEO0lBUmxCLFdBQVc7UUFML0IsT0FBTztRQUNQLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakIsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUMvQixJQUFJLENBQUMsNEJBQTRCLENBQUM7T0FDZCxXQUFXLENBOE8vQjtJQUFELGtCQUFDO0NBOU9ELEFBOE9DLENBOU8rRCxFQUFFLENBQUMsU0FBUyxHQThPM0U7a0JBOU9vQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVkaXRvclRvb2wgZnJvbSBcIi4uLy4uLy4uL3V0aWwvRWRpdG9yVG9vbFwiO1xyXG5pbXBvcnQgVG9vbCBmcm9tIFwiLi4vLi4vLi4vdXRpbC9Ub29sXCI7XHJcbmltcG9ydCBWaXJ0dWFsTGF5b3V0IGZyb20gXCIuL1ZpcnR1YWxMYXlvdXRcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIHJlcXVpcmVDb21wb25lbnQsIGV4ZWN1dGVJbkVkaXRNb2RlLCBkaXNhbGxvd011bHRpcGxlLCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqIOS4u+WFg+e0oOaooeadv+exu+WeiyAqL1xyXG5leHBvcnQgZW51bSBNYWluVGVtcGxhdGVUeXBlIHtcclxuICAgIE5PREUsXHJcbiAgICBQUkVGQUJcclxufVxyXG5cclxuLyoqIOWJr+WFg+e0oOaooeadv+exu+WeiyAqL1xyXG5leHBvcnQgZW51bSBPdGhlclRlbXBsYXRlVHlwZSB7XHJcbiAgICBOT0RFLFxyXG4gICAgUFJFRkFCLFxyXG4gICAgTUFJTl9JVEVNX0NISUxELFxyXG59XHJcblxyXG4vKiog6Jma5ouf5YiX6KGo5YWD57Sg5Y+C5pWw57G75Z6LICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmlydHVhbEFyZ3MgeyB9XHJcblxyXG4vKipcclxuICog6Jma5ouf5YiX6KGo5Li75a655ZmoXHJcbiAqL1xyXG5AY2NjbGFzcyhcIk1haW5MYXlvdXREYXRhXCIpXHJcbmV4cG9ydCBjbGFzcyBNYWluTGF5b3V0RGF0YSB7XHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5YiX6KGo5a655Zmo6IqC54K5XCIsXHJcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICB9KVxyXG4gICAgcHVibGljIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oTWFpblRlbXBsYXRlVHlwZSkgfSlcclxuICAgIHByaXZhdGUgX3RlbXBsYXRlVHlwZTogTWFpblRlbXBsYXRlVHlwZSA9IE1haW5UZW1wbGF0ZVR5cGUuUFJFRkFCO1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5FbnVtKE1haW5UZW1wbGF0ZVR5cGUpLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiBcIuWIl+ihqOWFg+e0oOaooeadv+exu+Wei1wiXHJcbiAgICB9KVxyXG4gICAgcHVibGljIGdldCB0ZW1wbGF0ZVR5cGUoKTogTWFpblRlbXBsYXRlVHlwZSB7IHJldHVybiB0aGlzLl90ZW1wbGF0ZVR5cGU7IH1cclxuICAgIHB1YmxpYyBzZXQgdGVtcGxhdGVUeXBlKHY6IE1haW5UZW1wbGF0ZVR5cGUpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGVtcGxhdGVUeXBlID09PSB2KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGVtcGxhdGVUeXBlID0gdjtcclxuICAgICAgICB0aGlzLnJlc2V0TWFpbkl0ZW1DaGlsZCh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgXCLliJfooajlhYPntKDmqKHmnb/pooTliLbkvZNcIixcclxuICAgICAgICB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy50ZW1wbGF0ZVR5cGUgPT09IE1haW5UZW1wbGF0ZVR5cGUuUFJFRkFCOyB9XHJcbiAgICB9KVxyXG4gICAgcHVibGljIGdldCB0ZW1wbGF0ZVByZWZhYigpOiBjYy5QcmVmYWIgeyByZXR1cm4gdGhpcy5fdGVtcGxhdGVQcmVmYWI7IH1cclxuICAgIHB1YmxpYyBzZXQgdGVtcGxhdGVQcmVmYWIodjogY2MuUHJlZmFiKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RlbXBsYXRlUHJlZmFiID09PSB2KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGVtcGxhdGVQcmVmYWIgPSB2O1xyXG4gICAgICAgIHRoaXMucmVzZXRNYWluSXRlbUNoaWxkKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgXCLliJfooajlhYPntKDmqKHmnb/oioLngrlcIixcclxuICAgICAgICB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy50ZW1wbGF0ZVR5cGUgPT09IE1haW5UZW1wbGF0ZVR5cGUuTk9ERTsgfVxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBnZXQgdGVtcGxhdGVOb2RlKCk6IGNjLk5vZGUgeyByZXR1cm4gdGhpcy5fdGVtcGxhdGVOb2RlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHRlbXBsYXRlTm9kZSh2OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RlbXBsYXRlTm9kZSA9PT0gdikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3RlbXBsYXRlTm9kZSA9IHY7XHJcbiAgICAgICAgdGhpcy5yZXNldE1haW5JdGVtQ2hpbGQodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVkaXRvckNhbGw6IChtYWluSXRlbUNoaWxkOiB1bmtub3duLCByZWZyZXNoOiBib29sZWFuKSA9PiB2b2lkID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOaemuS4vuWGheWuuVxyXG4gICAgICogQHBhcmFtIHJlZnJlc2gg5piv5ZCm5by65Yi25Yi35pawaW5zcGVjdG9yIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNldE1haW5JdGVtQ2hpbGQocmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWFpbkl0ZW1DaGlsZCA9IHt9O1xyXG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlVHlwZSA9PT0gTWFpblRlbXBsYXRlVHlwZS5OT0RFICYmIHRoaXMudGVtcGxhdGVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVOb2RlLmNoaWxkcmVuLmZvckVhY2goKGMsIGkpID0+IHsgbWFpbkl0ZW1DaGlsZFtjLm5hbWVdID0gaTsgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRlbXBsYXRlVHlwZSA9PT0gTWFpblRlbXBsYXRlVHlwZS5QUkVGQUIgJiYgdGhpcy50ZW1wbGF0ZVByZWZhYikge1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlUHJlZmFiLmRhdGEuY2hpbGRyZW4uZm9yRWFjaCgoYywgaSkgPT4geyBtYWluSXRlbUNoaWxkW2MubmFtZV0gPSBpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lZGl0b3JDYWxsPy4obWFpbkl0ZW1DaGlsZCwgcmVmcmVzaCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDomZrmi5/liJfooajlia/lrrnlmahcclxuICovXHJcbkBjY2NsYXNzKFwiT3RoZXJMYXlvdXREYXRhXCIpXHJcbmV4cG9ydCBjbGFzcyBPdGhlckxheW91dERhdGEge1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiBcIuWIl+ihqOWuueWZqOiKgueCuVwiLFxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLkVudW0oT3RoZXJUZW1wbGF0ZVR5cGUpLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiBcIuWIl+ihqOWFg+e0oOaooeadv+exu+Wei1wiXHJcbiAgICB9KVxyXG4gICAgcHVibGljIHRlbXBsYXRlVHlwZTogT3RoZXJUZW1wbGF0ZVR5cGUgPSBPdGhlclRlbXBsYXRlVHlwZS5QUkVGQUI7XHJcblxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5YiX6KGo5YWD57Sg5qih5p2/6aKE5Yi25L2TXCIsXHJcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMudGVtcGxhdGVUeXBlID09PSBPdGhlclRlbXBsYXRlVHlwZS5QUkVGQUI7IH1cclxuICAgIH0pXHJcbiAgICBwdWJsaWMgdGVtcGxhdGVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiBcIuWIl+ihqOWFg+e0oOaooeadv+iKgueCuVwiLFxyXG4gICAgICAgIHZpc2libGUoKSB7IHJldHVybiB0aGlzLnRlbXBsYXRlVHlwZSA9PT0gT3RoZXJUZW1wbGF0ZVR5cGUuTk9ERTsgfVxyXG4gICAgfSlcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuRW51bSh7fSksXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmIFwi5Lul5YiX6KGo5Li75YWD57Sg55qE5a2Q6IqC54K55L2c5Li65qih5p2/6IqC54K5XCIsXHJcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMudGVtcGxhdGVUeXBlID09PSBPdGhlclRlbXBsYXRlVHlwZS5NQUlOX0lURU1fQ0hJTEQ7IH1cclxuICAgIH0pXHJcbiAgICBwdWJsaWMgdGVtcGxhdGVDaGlsZDogbnVtYmVyID0gLTE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDomZrmi5/liJfooahcclxuICovXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkBleGVjdXRlSW5FZGl0TW9kZVxyXG5AcmVxdWlyZUNvbXBvbmVudChjYy5TY3JvbGxWaWV3KVxyXG5AbWVudShcIkZyYW1ld29yay9VSee7hOS7ti9WaXJ0dWFsTGlzdFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXJ0dWFsTGlzdDxUIGV4dGVuZHMgVmlydHVhbEFyZ3M+IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IE1haW5MYXlvdXREYXRhLCB0b29sdGlwOiBDQ19ERVYgJiYgXCLliJfooajkuLvlrrnlmahcIiB9KVxyXG4gICAgcHVibGljIG1haW46IE1haW5MYXlvdXREYXRhID0gbmV3IE1haW5MYXlvdXREYXRhKCk7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogT3RoZXJMYXlvdXREYXRhLCB0b29sdGlwOiBDQ19ERVYgJiYgXCLliJfooajlia/lrrnlmahcXG7pnIDopoHliIblsYLmmL7npLrml7bkvb/nlKjvvIzkuIDoiKznlKjkuo7pmY3kvY5kcmF3IGNhbGxcIiB9KVxyXG4gICAgcHVibGljIG90aGVyczogT3RoZXJMYXlvdXREYXRhW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBDQ19ERVYgJiYgXCLlhYPntKDoioLngrnlpKflsI/mmK/lkKbkuIDoh7RcXG7lpKflsI/kuI3kuIDoh7Tml7blv4Xpobvmj5DkvptjYWxjSXRlbVNpemXmjqXlj6PvvIzkuJTmmoLkuI3mlK/mjIFncmlk5o6S54mIXCIgfSlcclxuICAgIHB1YmxpYyBpc0ZpeGVkU2l6ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyA9IG51bGw7XHJcbiAgICBwdWJsaWMgZ2V0IHNjcm9sbFZpZXcoKTogY2MuU2Nyb2xsVmlldyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zY3JvbGxWaWV3KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFZpZXcgPSB0aGlzLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbFZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbGF5b3V0OiBWaXJ0dWFsTGF5b3V0PFQ+ID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgbGF5b3V0KCk6IFZpcnR1YWxMYXlvdXQ8VD4ge1xyXG4gICAgICAgIGlmICghdGhpcy5fbGF5b3V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dCA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LmdldENvbXBvbmVudChWaXJ0dWFsTGF5b3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheW91dDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hcmdzQXJyOiBUW10gPSBbXTtcclxuICAgIC8qKiDliJfooajnvJPlrZjnmoTmiYDmnInmlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXQgYXJnc0FycigpOiBUW10geyByZXR1cm4gdGhpcy5fYXJnc0FycjsgfVxyXG4gICAgcHVibGljIHNldCBhcmdzQXJyKHY6IFRbXSkge1xyXG4gICAgICAgIHRoaXMuX2FyZ3NBcnIgPSB2O1xyXG4gICAgICAgIHRoaXMubGF5b3V0LnJlYXJyYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NhbGNJdGVtU2l6ZTogKGFyZ3M6IFQpID0+IGNjLlNpemUgPSBudWxsO1xyXG4gICAgLyoqIOagueaNruWPguaVsOiuoeeul+WFg+e0oOWkp+Wwj+eahOaOpeWPo++8iGlzRml4ZWRTaXpl5Li6ZmFsc2Xml7blv4Xpobvmj5DkvpvvvIkgKi9cclxuICAgIHB1YmxpYyBnZXQgY2FsY0l0ZW1TaXplKCk6IChhcmdzOiBUKSA9PiBjYy5TaXplIHsgcmV0dXJuIHRoaXMuX2NhbGNJdGVtU2l6ZTsgfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW5FZGl0b3IoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Lm9uSW5pdCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlc2V0SW5FZGl0b3IoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ydW5FZGl0b3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Gb2N1c0luRWRpdG9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFpbi5yZXNldE1haW5JdGVtQ2hpbGQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8lui+keWZqOaooeW8j+S4i+eahOS4gOS6m+iuvue9rlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJ1bkVkaXRvcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzY3JvbGxWaWV3ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgbGV0IGxheW91dCA9IHNjcm9sbFZpZXcuY29udGVudC5nZXRDb21wb25lbnQoVmlydHVhbExheW91dCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1haW4uY29udGVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm1haW4uY29udGVudCA9IHNjcm9sbFZpZXcuY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFsYXlvdXQpIHtcclxuICAgICAgICAgICAgc2Nyb2xsVmlldy5jb250ZW50LmFkZENvbXBvbmVudChWaXJ0dWFsTGF5b3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWluLmVkaXRvckNhbGwgPSAobWFpbkl0ZW1DaGlsZDogdW5rbm93biwgcmVmcmVzaDogYm9vbGVhbik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaGFzQ2hpbGRUeXBlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vdGhlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm90aGVyc1tpXS50ZW1wbGF0ZVR5cGUgPT09IE90aGVyVGVtcGxhdGVUeXBlLk1BSU5fSVRFTV9DSElMRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0NoaWxkVHlwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGhhc0NoaWxkVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgRWRpdG9yVG9vbC5zZXRDbGFzc0F0dHJQcm9wRW51bShPdGhlckxheW91dERhdGEsIFwidGVtcGxhdGVDaGlsZFwiLCBjYy5FbnVtW1wiZ2V0TGlzdFwiXShtYWluSXRlbUNoaWxkKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEVkaXRvclRvb2wucmVmcmVzaFNlbGVjdGVkSW5zcGVjdG9yKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubWFpbi5yZXNldE1haW5JdGVtQ2hpbGQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa7muWKqOWFg+e0oOiKgueCueWIsHZpZXfnmoTmjIflrprkvY3nva5cclxuICAgICAqIEBwYXJhbSBpZHgg5YWD57Sg5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0gaXRlbUFuY2hvciDlhYPntKDnmoTplJrngrnkvY3nva7vvIjlt6bkuIvop5LkuLow54K577yJXHJcbiAgICAgKiBAcGFyYW0gdmlld0FuY2hvciB2aWV355qE6ZSa54K55L2N572u77yI5bem5LiL6KeS5Li6MOeCue+8iVxyXG4gICAgICogQHBhcmFtIHQg5pe26Ze0IHNcclxuICAgICAqIEBwYXJhbSBhIOWKoOmAn+W6puaYr+WQpuihsOWHj++8jOS4unRydWXkuJTmu5rliqjot53nprvlpKfml7bmu5rliqjkvJrkuI3lh4bnoa5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNjcm9sbEl0ZW1Ub1ZpZXcoaWR4OiBudW1iZXIsIGl0ZW1BbmNob3I6IGNjLlZlYzIgPSBjYy52MigpLCB2aWV3QW5jaG9yOiBjYy5WZWMyID0gY2MudjIoKSwgdDogbnVtYmVyID0gMCwgYTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9PZmZzZXQodGhpcy5sYXlvdXQuZ2V0U2Nyb2xsT2Zmc2V0KGlkeCwgaXRlbUFuY2hvciwgdmlld0FuY2hvciksIHQsIGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rua5Yqo5Yiw6KeG5Zu+6aG26YOoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzY3JvbGxUb1RvcCh0aW1lSW5TZWNvbmQ6IG51bWJlciA9IDAsIGF0dGVudWF0ZWQ6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvVG9wKHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmu5rliqjliLDop4blm77lupXpg6hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNjcm9sbFRvQm90dG9tKHRpbWVJblNlY29uZDogbnVtYmVyID0gMCwgYXR0ZW51YXRlZDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b20odGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa7muWKqOWIsOinhuWbvuW3pumDqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9MZWZ0KHRpbWVJblNlY29uZDogbnVtYmVyID0gMCwgYXR0ZW51YXRlZDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9MZWZ0KHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmu5rliqjliLDop4blm77lj7Ppg6hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNjcm9sbFRvUmlnaHQodGltZUluU2Vjb25kOiBudW1iZXIgPSAwLCBhdHRlbnVhdGVkOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1JpZ2h0KHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lj4LmlbDorqHnrpflhYPntKDlpKflsI/nmoTmjqXlj6PvvIhpc0ZpeGVkU2l6ZeS4umZhbHNl5pe25b+F6aG75o+Q5L6b77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDYWxjSXRlbVNpemUoY2FsbDogKGFyZ3M6IFQpID0+IGNjLlNpemUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jYWxjSXRlbVNpemUgPSBjYWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56uL5Y2z5pu05paw5biD5bGAXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmb3JjZVVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxheW91dC5mb3JjZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5omA5pyJ5r+A5rS755qEaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVmcmVzaEFsbEl0ZW1zKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGF5b3V0LnJlZnJlc2hBbGxJdGVtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN572u5p+Q5Liq5YWD57Sg5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggXHJcbiAgICAgKiBAcGFyYW0gYXJncyDlhYPntKDmiYDpnIDlj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0KGluZGV4OiBudW1iZXIsIGFyZ3M6IFQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoVG9vbC5pblJhbmdlKDAsIHRoaXMuX2FyZ3NBcnIubGVuZ3RoIC0gMSwgaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyZ3NBcnJbaW5kZXhdID0gYXJncztcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXQucmVhcnJhbmdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5YWD57Sg5pWw5o2u5Yiw5bC+6YOoXHJcbiAgICAgKiBAcGFyYW0gYXJncyDlhYPntKDmiYDpnIDlj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHB1c2goYXJnczogVCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX2FyZ3NBcnIucHVzaChhcmdzKTtcclxuICAgICAgICB0aGlzLmxheW91dC5yZWFycmFuZ2UoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKDpmaTlsL7pg6jlhYPntKDmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvcCgpOiBUIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fYXJnc0Fyci5wb3AoKTtcclxuICAgICAgICB0aGlzLmxheW91dC5yZWFycmFuZ2UoKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5YWD57Sg5pWw5o2u5Yiw5aS06YOoXHJcbiAgICAgKiBAcGFyYW0gYXJncyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVuc2hpZnQoYXJnczogVCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX2FyZ3NBcnIudW5zaGlmdChhcmdzKTtcclxuICAgICAgICB0aGlzLmxheW91dC5yZWFycmFuZ2UoKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk5aS06YOo5YWD57Sg5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaGlmdCgpOiBUIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fYXJnc0Fyci5zaGlmdCgpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0LnJlYXJyYW5nZSgpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaXmiJbliKDpmaTlhYPntKAg55So5rOV5ZCM5pWw57uEc3BsaWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzcGxpY2Uoc3RhcnQ6IG51bWJlciwgZGVsZXRlQ291bnQ/OiBudW1iZXIsIC4uLmFyZ3NBcnI6IFRbXSk6IFRbXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogVFtdO1xyXG4gICAgICAgIGlmIChkZWxldGVDb3VudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2FyZ3NBcnIuc3BsaWNlKHN0YXJ0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoYXJnc0FyciA9PT0gdW5kZWZpbmVkIHx8IGFyZ3NBcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9hcmdzQXJyLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fYXJnc0Fyci5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50LCAuLi5hcmdzQXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYXlvdXQucmVhcnJhbmdlKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaVsOaNruaOkuW6j1xyXG4gICAgICogQHBhcmFtIGNhbGwgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzb3J0KGNhbGw6IChhOiBULCBiOiBUKSA9PiBudW1iZXIpOiBUW10ge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9hcmdzQXJyLnNvcnQoY2FsbCk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQucmVhcnJhbmdlKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaVsOaNrui/h+a7pFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmlsdGVyKGNhbGw6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gYm9vbGVhbik6IFRbXSB7XHJcbiAgICAgICAgdGhpcy5fYXJnc0FyciA9IHRoaXMuX2FyZ3NBcnIuZmlsdGVyKGNhbGwpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0LnJlYXJyYW5nZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcmdzQXJyO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==