"use strict";
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