
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/EditorTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50fe9qyZR5LgYuxXN3oK78x', 'EditorTool');
// scripts/common/util/EditorTool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 编辑器工具类
 */
var EditorTool = /** @class */ (function () {
    function EditorTool() {
    }
    /**
     * 编辑器模式下加载资源
     * @param url db://assets/
     */
    EditorTool.load = function (url) {
        return new Promise(function (resolve, reject) {
            if (!CC_EDITOR) {
                resolve(null);
                return;
            }
            Editor.assetdb.queryUuidByUrl("db://assets/" + url, function (error, uuid) {
                if (error || !uuid) {
                    resolve(null);
                    cc.warn("[EditorTool.load] uuid\u67E5\u8BE2\u5931\u8D25 url: " + url);
                    return;
                }
                //@ts-ignore
                cc.resources.load({ type: "uuid", uuid: uuid }, function (error, result) {
                    if (error || !result) {
                        resolve(null);
                        cc.warn("[EditorTool.load] \u8D44\u6E90\u52A0\u8F7D\u5931\u8D25 url: " + url);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    };
    /**
     * 编辑器模式下设置ccclass的属性装饰器中的枚举值
     */
    EditorTool.setClassAttrPropEnum = function (ctor, propName, value) {
        if (!CC_EDITOR) {
            return;
        }
        cc.Class["Attr"].setClassAttr(ctor, propName, "enumList", value);
    };
    /**
     * 编辑器模式下刷新选中节点的属性检查器窗口
     * @param node 选中的节点
     */
    EditorTool.refreshSelectedInspector = function (node) {
        if (!CC_EDITOR) {
            return;
        }
        Editor.Utils.refreshSelectedInspector("node", node.uuid);
    };
    return EditorTool;
}());
exports.default = EditorTool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxFZGl0b3JUb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSDtJQUFBO0lBa0RBLENBQUM7SUFqREc7OztPQUdHO0lBQ1csZUFBSSxHQUFsQixVQUFzQixHQUFXO1FBQzdCLE9BQU8sSUFBSSxPQUFPLENBQUksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNsQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZCxPQUFPO2FBQ1Y7WUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxpQkFBZSxHQUFLLEVBQUUsVUFBQyxLQUFVLEVBQUUsSUFBWTtnQkFDekUsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDZCxFQUFFLENBQUMsSUFBSSxDQUFDLHlEQUFtQyxHQUFLLENBQUMsQ0FBQztvQkFDbEQsT0FBTztpQkFDVjtnQkFDRCxZQUFZO2dCQUNaLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsVUFBQyxLQUFVLEVBQUUsTUFBUztvQkFDbEUsSUFBSSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDZCxFQUFFLENBQUMsSUFBSSxDQUFDLGlFQUFpQyxHQUFLLENBQUMsQ0FBQzt3QkFDaEQsT0FBTztxQkFDVjtvQkFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNXLCtCQUFvQixHQUFsQyxVQUFtQyxJQUFhLEVBQUUsUUFBZ0IsRUFBRSxLQUFjO1FBQzlFLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixPQUFPO1NBQ1Y7UUFDRCxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ1csbUNBQXdCLEdBQXRDLFVBQXVDLElBQWE7UUFDaEQsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNaLE9BQU87U0FDVjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQWxEQSxBQWtEQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOe8lui+keWZqOW3peWFt+exu1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yVG9vbCB7XHJcbiAgICAvKipcclxuICAgICAqIOe8lui+keWZqOaooeW8j+S4i+WKoOi9vei1hOa6kFxyXG4gICAgICogQHBhcmFtIHVybCBkYjovL2Fzc2V0cy9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkPFQ+KHVybDogc3RyaW5nKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRWRpdG9yLmFzc2V0ZGIucXVlcnlVdWlkQnlVcmwoYGRiOi8vYXNzZXRzLyR7dXJsfWAsIChlcnJvcjogYW55LCB1dWlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvciB8fCAhdXVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihgW0VkaXRvclRvb2wubG9hZF0gdXVpZOafpeivouWksei0pSB1cmw6ICR7dXJsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoeyB0eXBlOiBcInV1aWRcIiwgdXVpZDogdXVpZCB9LCAoZXJyb3I6IGFueSwgcmVzdWx0OiBUKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIHx8ICFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Mud2FybihgW0VkaXRvclRvb2wubG9hZF0g6LWE5rqQ5Yqg6L295aSx6LSlIHVybDogJHt1cmx9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57yW6L6R5Zmo5qih5byP5LiL6K6+572uY2NjbGFzc+eahOWxnuaAp+ijhemlsOWZqOS4reeahOaemuS4vuWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldENsYXNzQXR0clByb3BFbnVtKGN0b3I6IHVua25vd24sIHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiB1bmtub3duKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5DbGFzc1tcIkF0dHJcIl0uc2V0Q2xhc3NBdHRyKGN0b3IsIHByb3BOYW1lLCBcImVudW1MaXN0XCIsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8lui+keWZqOaooeW8j+S4i+WIt+aWsOmAieS4reiKgueCueeahOWxnuaAp+ajgOafpeWZqOeql+WPo1xyXG4gICAgICogQHBhcmFtIG5vZGUg6YCJ5Lit55qE6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVmcmVzaFNlbGVjdGVkSW5zcGVjdG9yKG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEVkaXRvci5VdGlscy5yZWZyZXNoU2VsZWN0ZWRJbnNwZWN0b3IoXCJub2RlXCIsIG5vZGUudXVpZCk7XHJcbiAgICB9XHJcbn1cclxuIl19