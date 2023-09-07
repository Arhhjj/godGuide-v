
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/RecyclePool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxSZWN5Y2xlUG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQVVBOztHQUVHO0FBQ0g7SUFBQTtJQXlKQSxDQUFDO0lBaEpHOztPQUVHO0lBQ1csZ0JBQUksR0FBbEIsVUFBbUIsR0FBeUM7UUFDeEQsSUFBSSxJQUFJLEdBQUcsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEYsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1csaUJBQUssR0FBbkIsVUFBb0IsR0FBeUM7UUFDekQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUNwQixPQUFPO2FBQ1Y7WUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNyQjtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDSCxJQUFJ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RSxJQUFJLENBQUMsQ0FBQzthQUNoQztpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xDLEVBQUUsQ0FBQyxLQUFLLENBQUMseUdBQXdDLENBQUMsQ0FBQztnQkFDbkQsT0FBTzthQUNWO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2YsRUFBRSxDQUFDLElBQUksQ0FBQyx5RkFBMEMsR0FBSyxDQUFDLENBQUM7Z0JBQ3pELE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixzQkFBc0I7WUFDdEIsSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUMxQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDbkI7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQXZKRCxpQkFBaUI7SUFDRixtQkFBTyxHQUEyQixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzNELDJDQUEyQztJQUM1QixvQkFBUSxHQUFnRCxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBRWpGLG1CQUFtQjtJQUNMLGlCQUFLLEdBQVcsR0FBRyxDQUFDO0lBa0p0QyxrQkFBQztDQXpKRCxBQXlKQyxJQUFBO2tCQXpKb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDnlKjkuo7kvb/nlKjoioLngrnmsaDnmoToioLngrnmiYDnu5HlrprohJrmnKznu4Tku7blrp7njrBcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVjeWNsZU5vZGUge1xyXG4gICAgLyoqIOWbnuaUtuWJjeiwg+eUqCAqL1xyXG4gICAgdW51c2UoKTogdm9pZDtcclxuICAgIC8qKiDlj5blh7rliY3osIPnlKggKi9cclxuICAgIHJldXNlKCk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDoioLngrnmsaBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3ljbGVQb29sIHtcclxuICAgIC8qKiDku6V1cmzmoIforrDnmoToioLngrnmsaAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF91cmxNYXA6IE1hcDxzdHJpbmcsIGNjLk5vZGVbXT4gPSBuZXcgTWFwKCk7XHJcbiAgICAvKiog5LulY2Njb21wb25lbnTmoIforrDnmoToioLngrnmsaDvvIzpnIDopoHlrp7njrDmjqXlj6NSZWN5Y2xlTm9kZSAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2NtcHRNYXA6IE1hcDx7IHByb3RvdHlwZTogY2MuQ29tcG9uZW50IH0sIGNjLk5vZGVbXT4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgLyoqIOWNleS4quiKgueCueaxoOeahOacgOWkp+iKgueCueaVsOmHjyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsaW1pdDogbnVtYmVyID0gNTEyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6IqC54K55rGg5Lit6IqC54K55pWw6YePXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2l6ZShrZXk6IHN0cmluZyB8IHsgcHJvdG90eXBlOiBjYy5Db21wb25lbnQgfSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiID8gdGhpcy5fdXJsTWFwLmdldChrZXkpIDogdGhpcy5fY21wdE1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3QubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF56m66IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXIoa2V5OiBzdHJpbmcgfCB7IHByb3RvdHlwZTogY2MuQ29tcG9uZW50IH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX3VybE1hcC5nZXQoa2V5KTtcclxuICAgICAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY291bnQgPSBsaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0W2ldLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3VybE1hcC5kZWxldGUoa2V5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2NtcHRNYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdFtpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9jbXB0TWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4heepuuWFqOmDqOiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3VybE1hcC5mb3JFYWNoKChsaXN0OiBjYy5Ob2RlW10pID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdFtpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl91cmxNYXAuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY21wdE1hcC5mb3JFYWNoKChsaXN0OiBjYy5Ob2RlW10pID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdFtpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9jbXB0TWFwLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7nsbvlnovku47oioLngrnmsaDlj5blh7roioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQoa2V5OiBzdHJpbmcgfCB7IHByb3RvdHlwZTogY2MuQ29tcG9uZW50IH0pOiBjYy5Ob2RlIHtcclxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX3VybE1hcC5nZXQoa2V5KTtcclxuICAgICAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCB8fCBsaXN0Lmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGxhc3QgPSBsaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gbGlzdFtsYXN0XTtcclxuICAgICAgICAgICAgbGlzdC5sZW5ndGggPSBsYXN0O1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2NtcHRNYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQgfHwgbGlzdC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsYXN0ID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGxpc3RbbGFzdF07XHJcbiAgICAgICAgICAgIGxpc3QubGVuZ3RoID0gbGFzdDtcclxuICAgICAgICAgICAgLy8gSW52b2tlIHBvb2wgaGFuZGxlclxyXG4gICAgICAgICAgICBsZXQgaGFuZGxlcjogYW55ID0gbm9kZS5nZXRDb21wb25lbnQoa2V5KTtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZXIgJiYgaGFuZGxlci5yZXVzZSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlci5yZXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruexu+Wei+WwhuiKgueCueaUvuWFpeiKgueCueaxoFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHB1dChrZXk6IHN0cmluZyB8IHsgcHJvdG90eXBlOiBjYy5Db21wb25lbnQgfSwgbm9kZTogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihgW1JlY3ljbGVQb29sLnB1dF0gZXJyb3I6IOS8oOWFpeiKgueCueS4uuepumApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX3VybE1hcC5nZXQoa2V5KTtcclxuICAgICAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXJsTWFwLnNldChrZXksIGxpc3QpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpc3QuaW5kZXhPZihub2RlKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKGBbUmVjeWNsZVBvb2wucHV0XSBlcnJvcjog5LiN5Y+v5bCG6IqC54K56YeN5aSN5pS+5YWl6IqC54K55rGg5LitYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPj0gUmVjeWNsZVBvb2wubGltaXQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybihgW1JlY3ljbGVQb29sLnB1dF0gd2Fybjog6IqC54K55rGg5Yiw6L6+5pyA5aSn5pWw6YePIGtleTogJHtrZXl9YCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChub2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2NtcHRNYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NtcHRNYXAuc2V0KGtleSwgbGlzdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdC5pbmRleE9mKG5vZGUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoYFtSZWN5Y2xlUG9vbC5wdXRdIGVycm9yOiDkuI3lj6/lsIboioLngrnph43lpI3mlL7lhaXoioLngrnmsaDkuK1gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA+PSBSZWN5Y2xlUG9vbC5saW1pdCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKGBbUmVjeWNsZVBvb2wucHV0XSB3YXJuOiDoioLngrnmsaDliLDovr7mnIDlpKfmlbDph48ga2V5OiAke2tleX1gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gSW52b2tlIHBvb2wgaGFuZGxlclxyXG4gICAgICAgICAgICBsZXQgaGFuZGxlcjogYW55ID0gbm9kZS5nZXRDb21wb25lbnQoa2V5KTtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZXIgJiYgaGFuZGxlci51bnVzZSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlci51bnVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19