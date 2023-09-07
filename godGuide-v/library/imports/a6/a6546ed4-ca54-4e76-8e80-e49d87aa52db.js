"use strict";
cc._RF.push(module, 'a65467UylROdo6A5J2HqlLb', 'RecyclePool');
// scripts/common/util/RecyclePool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 节点池
 */
var RecyclePool = /** @class */ (function () {
    function RecyclePool() {
    }
    /**
     * 获取节点池中节点数量
     */
    RecyclePool.size = function (key) {
        var list = typeof key === "string" ? this._urlMap.get(key) : this._cmptMap.get(key);
        if (list === undefined) {
            return 0;
        }
        return list.length;
    };
    /**
     * 清空节点
     */
    RecyclePool.clear = function (key) {
        if (typeof key === "string") {
            var list = this._urlMap.get(key);
            if (list === undefined) {
                return;
            }
            var count = list.length;
            for (var i = 0; i < count; ++i) {
                list[i].destroy();
            }
            list.length = 0;
            this._urlMap.delete(key);
        }
        else {
            var list = this._cmptMap.get(key);
            if (list === undefined) {
                return;
            }
            var count = list.length;
            for (var i = 0; i < count; ++i) {
                list[i].destroy();
            }
            list.length = 0;
            this._cmptMap.delete(key);
        }
    };
    /**
     * 清空全部节点
     */
    RecyclePool.clearAll = function () {
        this._urlMap.forEach(function (list) {
            var count = list.length;
            for (var i = 0; i < count; ++i) {
                list[i].destroy();
            }
        });
        this._urlMap.clear();
        this._cmptMap.forEach(function (list) {
            var count = list.length;
            for (var i = 0; i < count; ++i) {
                list[i].destroy();
            }
        });
        this._cmptMap.clear();
    };
    /**
     * 根据类型从节点池取出节点
     */
    RecyclePool.get = function (key) {
        if (typeof key === "string") {
            var list = this._urlMap.get(key);
            if (list === undefined || list.length <= 0) {
                return null;
            }
            var last = list.length - 1;
            var node = list[last];
            list.length = last;
            return node;
        }
        else {
            var list = this._cmptMap.get(key);
            if (list === undefined || list.length <= 0) {
                return null;
            }
            var last = list.length - 1;
            var node = list[last];
            list.length = last;
            // Invoke pool handler
            var handler = node.getComponent(key);
            if (handler && handler.reuse) {
                handler.reuse();
            }
            return node;
        }
    };
    /**
     * 根据类型将节点放入节点池
     */
    RecyclePool.put = function (key, node) {
        if (!node) {
            cc.error("[RecyclePool.put] error: \u4F20\u5165\u8282\u70B9\u4E3A\u7A7A");
            return;
        }
        if (typeof key === "string") {
            var list = this._urlMap.get(key);
            if (list === undefined) {
                list = [];
                this._urlMap.set(key, list);
            }
            else if (list.indexOf(node) !== -1) {
                cc.error("[RecyclePool.put] error: \u4E0D\u53EF\u5C06\u8282\u70B9\u91CD\u590D\u653E\u5165\u8282\u70B9\u6C60\u4E2D");
                return;
            }
            else if (list.length >= RecyclePool.limit) {
                node.destroy();
                cc.warn("[RecyclePool.put] warn: \u8282\u70B9\u6C60\u5230\u8FBE\u6700\u5927\u6570\u91CF key: " + key);
                return;
            }
            node.removeFromParent(false);
            list.push(node);
        }
        else {
            var list = this._cmptMap.get(key);
            if (list === undefined) {
                list = [];
                this._cmptMap.set(key, list);
            }
            else if (list.indexOf(node) !== -1) {
                cc.error("[RecyclePool.put] error: \u4E0D\u53EF\u5C06\u8282\u70B9\u91CD\u590D\u653E\u5165\u8282\u70B9\u6C60\u4E2D");
                return;
            }
            else if (list.length >= RecyclePool.limit) {
                node.destroy();
                cc.warn("[RecyclePool.put] warn: \u8282\u70B9\u6C60\u5230\u8FBE\u6700\u5927\u6570\u91CF key: " + key);
                return;
            }
            node.removeFromParent(false);
            // Invoke pool handler
            var handler = node.getComponent(key);
            if (handler && handler.unuse) {
                handler.unuse();
            }
            list.push(node);
        }
    };
    /** 以url标记的节点池 */
    RecyclePool._urlMap = new Map();
    /** 以cccomponent标记的节点池，需要实现接口RecycleNode */
    RecyclePool._cmptMap = new Map();
    /** 单个节点池的最大节点数量 */
    RecyclePool.limit = 512;
    return RecyclePool;
}());
exports.default = RecyclePool;

cc._RF.pop();