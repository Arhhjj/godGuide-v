
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/MultiTextureManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4fc9cgEvWxKZK0hYF2jjQq7', 'MultiTextureManager');
// scripts/common/cmpt/ui/multiTexture/MultiTextureManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiTextureManager = void 0;
/**
 * Multi-Texture 管理器
 */
var MultiTextureManager = /** @class */ (function () {
    function MultiTextureManager() {
    }
    /**
     * 初始化纹理管理器
     */
    MultiTextureManager.init = function (mat) {
        if (this._init || !(mat instanceof cc.Material) || mat instanceof cc.MaterialVariant) {
            return;
        }
        this._init = true;
        this._mat = mat;
        // 处理引用计数
        this._mat.addRef();
    };
    MultiTextureManager.addSprite = function (sp) {
        this._sprites.add(sp);
    };
    MultiTextureManager.removeSprite = function (sp) {
        this._sprites.delete(sp);
    };
    /**
     * 设置合批纹理
     * @param idx 纹理id
     * @param tex 纹理对象
     * @returns
     */
    MultiTextureManager.setTexture = function (idx, tex) {
        var _this = this;
        if (!this._init) {
            cc.error("[MultiSpriteManager.setTexture] 未初始化MultiSpriteManager");
            return;
        }
        if (!(tex instanceof cc.Texture2D)) {
            cc.error("[MultiSpriteManager.setTexture] 参数类型错误");
            return;
        }
        idx = cc.misc.clampf(idx, 0, MultiTextureManager.MAX_TEXTURE_NUM - 1);
        var oldTex = this._texMap.get(idx);
        if (oldTex === tex) {
            return;
        }
        // 处理引用计数
        if (oldTex) {
            oldTex.decRef();
        }
        tex.addRef();
        this._texMap.set(idx, tex);
        // 修改共享材质属性
        this._mat.setProperty("texture" + idx, tex);
        // 修改已存在的渲染组件上材质变体的属性，同时更新渲染组件textureIdx
        this._sprites.forEach(function (v) {
            /**
             * @bug
             * 2.4.5之前材质hash计算在utils.js中serializeUniforms有bug, 里面for-in遍历材质属性顺序受k-v对插入顺序影响(即setProperty顺序), 即使属性完全一致, hash却不一定一致
             * 因此在此直接创建新的材质
             */
            // v.setMaterial(0, this._mat);
            // 材质变体中的属性必须完全一致, 材质的hash值计算才会一致
            var material = v.getMaterial(0);
            for (var i = 0; i < MultiTextureManager.MAX_TEXTURE_NUM; i++) {
                var texture = _this._texMap.get(i);
                if (!texture) {
                    continue;
                }
                var textureImpl = texture.getImpl();
                if (material.getProperty("texture" + i, 0) !== textureImpl) {
                    material.setProperty("texture" + i, texture);
                }
            }
            // 修改共享材质属性后，必须手动设置材质变体的_effect._dirty，不然不会重新计算材质变体的hash值
            material["_effect"]._dirty = true;
            // 更新textureIdx与材质属性
            v._updateMaterial();
        });
    };
    /**
     * 根据纹理获取对应的textureIdx
     * @param tex
     * @returns
     */
    MultiTextureManager.getIdx = function (tex) {
        if (!this._init) {
            cc.error("[MultiSpriteManager.getIdx] 未初始化MultiSpriteManager");
            return;
        }
        for (var i = 0; i < MultiTextureManager.MAX_TEXTURE_NUM; i++) {
            if (this._texMap.get(i) === tex || this._mat.getProperty("texture" + i, 0) === tex.getImpl()) {
                return i;
            }
        }
        return -1;
    };
    /** 纹理最大数量 */
    MultiTextureManager.MAX_TEXTURE_NUM = 8;
    MultiTextureManager._init = false;
    /** 共享材质 */
    MultiTextureManager._mat = null;
    MultiTextureManager._texMap = new Map();
    MultiTextureManager._sprites = new Set();
    return MultiTextureManager;
}());
exports.MultiTextureManager = MultiTextureManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcbXVsdGlUZXh0dXJlXFxNdWx0aVRleHR1cmVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztHQUVHO0FBQ0g7SUFBQTtJQThHQSxDQUFDO0lBcEdHOztPQUVHO0lBQ1csd0JBQUksR0FBbEIsVUFBbUIsR0FBZ0I7UUFDL0IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFO1lBQ2xGLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLFNBQVM7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFYSw2QkFBUyxHQUF2QixVQUF3QixFQUFlO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFYSxnQ0FBWSxHQUExQixVQUEyQixFQUFlO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLDhCQUFVLEdBQXhCLFVBQXlCLEdBQVcsRUFBRSxHQUFpQjtRQUF2RCxpQkFxREM7UUFwREcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDYixFQUFFLENBQUMsS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7WUFDbkUsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLENBQUMsR0FBRyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoQyxFQUFFLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFD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ImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNdWx0aVNwcml0ZSBmcm9tIFwiLi9NdWx0aVNwcml0ZVwiO1xyXG5cclxuLyoqXHJcbiAqIE11bHRpLVRleHR1cmUg566h55CG5ZmoXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTXVsdGlUZXh0dXJlTWFuYWdlciB7XHJcbiAgICAvKiog57q555CG5pyA5aSn5pWw6YePICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE1BWF9URVhUVVJFX05VTSA9IDg7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiDlhbHkuqvmnZDotKggKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9tYXQ6IGNjLk1hdGVyaWFsID0gbnVsbDtcclxuICAgIHByaXZhdGUgc3RhdGljIF90ZXhNYXA6IE1hcDxudW1iZXIsIGNjLlRleHR1cmUyRD4gPSBuZXcgTWFwKCk7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfc3ByaXRlczogU2V0PE11bHRpU3ByaXRlPiA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlue6ueeQhueuoeeQhuWZqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQobWF0OiBjYy5NYXRlcmlhbCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbml0IHx8ICEobWF0IGluc3RhbmNlb2YgY2MuTWF0ZXJpYWwpIHx8IG1hdCBpbnN0YW5jZW9mIGNjLk1hdGVyaWFsVmFyaWFudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX21hdCA9IG1hdDtcclxuICAgICAgICAvLyDlpITnkIblvJXnlKjorqHmlbBcclxuICAgICAgICB0aGlzLl9tYXQuYWRkUmVmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhZGRTcHJpdGUoc3A6IE11bHRpU3ByaXRlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlcy5hZGQoc3ApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlU3ByaXRlKHNwOiBNdWx0aVNwcml0ZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3Nwcml0ZXMuZGVsZXRlKHNwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWQiOaJuee6ueeQhlxyXG4gICAgICogQHBhcmFtIGlkeCDnurnnkIZpZFxyXG4gICAgICogQHBhcmFtIHRleCDnurnnkIblr7nosaFcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFRleHR1cmUoaWR4OiBudW1iZXIsIHRleDogY2MuVGV4dHVyZTJEKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0KSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiW011bHRpU3ByaXRlTWFuYWdlci5zZXRUZXh0dXJlXSDmnKrliJ3lp4vljJZNdWx0aVNwcml0ZU1hbmFnZXJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghKHRleCBpbnN0YW5jZW9mIGNjLlRleHR1cmUyRCkpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCJbTXVsdGlTcHJpdGVNYW5hZ2VyLnNldFRleHR1cmVdIOWPguaVsOexu+Wei+mUmeivr1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWR4ID0gY2MubWlzYy5jbGFtcGYoaWR4LCAwLCBNdWx0aVRleHR1cmVNYW5hZ2VyLk1BWF9URVhUVVJFX05VTSAtIDEpO1xyXG4gICAgICAgIGxldCBvbGRUZXggPSB0aGlzLl90ZXhNYXAuZ2V0KGlkeCk7XHJcbiAgICAgICAgaWYgKG9sZFRleCA9PT0gdGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWkhOeQhuW8leeUqOiuoeaVsFxyXG4gICAgICAgIGlmIChvbGRUZXgpIHtcclxuICAgICAgICAgICAgb2xkVGV4LmRlY1JlZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXguYWRkUmVmKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RleE1hcC5zZXQoaWR4LCB0ZXgpO1xyXG4gICAgICAgIC8vIOS/ruaUueWFseS6q+adkOi0qOWxnuaAp1xyXG4gICAgICAgIHRoaXMuX21hdC5zZXRQcm9wZXJ0eShgdGV4dHVyZSR7aWR4fWAsIHRleCk7XHJcbiAgICAgICAgLy8g5L+u5pS55bey5a2Y5Zyo55qE5riy5p+T57uE5Lu25LiK5p2Q6LSo5Y+Y5L2T55qE5bGe5oCn77yM5ZCM5pe25pu05paw5riy5p+T57uE5Lu2dGV4dHVyZUlkeFxyXG4gICAgICAgIHRoaXMuX3Nwcml0ZXMuZm9yRWFjaCgodikgPT4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQGJ1Z1xyXG4gICAgICAgICAgICAgKiAyLjQuNeS5i+WJjeadkOi0qGhhc2jorqHnrpflnKh1dGlscy5qc+S4rXNlcmlhbGl6ZVVuaWZvcm1z5pyJYnVnLCDph4zpnaJmb3ItaW7pgY3ljobmnZDotKjlsZ7mgKfpobrluo/lj5drLXblr7nmj5LlhaXpobrluo/lvbHlk40o5Y2zc2V0UHJvcGVydHnpobrluo8pLCDljbPkvb/lsZ7mgKflrozlhajkuIDoh7QsIGhhc2jljbTkuI3kuIDlrprkuIDoh7RcclxuICAgICAgICAgICAgICog5Zug5q2k5Zyo5q2k55u05o6l5Yib5bu65paw55qE5p2Q6LSoXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAvLyB2LnNldE1hdGVyaWFsKDAsIHRoaXMuX21hdCk7XHJcblxyXG4gICAgICAgICAgICAvLyDmnZDotKjlj5jkvZPkuK3nmoTlsZ7mgKflv4XpobvlrozlhajkuIDoh7QsIOadkOi0qOeahGhhc2jlgLzorqHnrpfmiY3kvJrkuIDoh7RcclxuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gdi5nZXRNYXRlcmlhbCgwKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNdWx0aVRleHR1cmVNYW5hZ2VyLk1BWF9URVhUVVJFX05VTTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dHVyZSA9IHRoaXMuX3RleE1hcC5nZXQoaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0dXJlSW1wbCA9IHRleHR1cmUuZ2V0SW1wbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsLmdldFByb3BlcnR5KGB0ZXh0dXJlJHtpfWAsIDApICE9PSB0ZXh0dXJlSW1wbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KGB0ZXh0dXJlJHtpfWAsIHRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOS/ruaUueWFseS6q+adkOi0qOWxnuaAp+WQju+8jOW/hemhu+aJi+WKqOiuvue9ruadkOi0qOWPmOS9k+eahF9lZmZlY3QuX2RpcnR577yM5LiN54S25LiN5Lya6YeN5paw6K6h566X5p2Q6LSo5Y+Y5L2T55qEaGFzaOWAvFxyXG4gICAgICAgICAgICBtYXRlcmlhbFtcIl9lZmZlY3RcIl0uX2RpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIOabtOaWsHRleHR1cmVJZHjkuI7mnZDotKjlsZ7mgKdcclxuICAgICAgICAgICAgdi5fdXBkYXRlTWF0ZXJpYWwoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNrue6ueeQhuiOt+WPluWvueW6lOeahHRleHR1cmVJZHhcclxuICAgICAqIEBwYXJhbSB0ZXggXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJZHgodGV4OiBjYy5UZXh0dXJlMkQpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5pdCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIltNdWx0aVNwcml0ZU1hbmFnZXIuZ2V0SWR4XSDmnKrliJ3lp4vljJZNdWx0aVNwcml0ZU1hbmFnZXJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNdWx0aVRleHR1cmVNYW5hZ2VyLk1BWF9URVhUVVJFX05VTTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90ZXhNYXAuZ2V0KGkpID09PSB0ZXggfHwgdGhpcy5fbWF0LmdldFByb3BlcnR5KGB0ZXh0dXJlJHtpfWAsIDApID09PSB0ZXguZ2V0SW1wbCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbn1cclxuIl19