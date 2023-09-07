
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/hack/EditorBoxHack.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4a973xjr51JNIXUFY3Q2XsC', 'EditorBoxHack');
// scripts/common/hack/EditorBoxHack.ts

// 基于CocosCreator2.x EditBox组件hack代码
// 移动端web环境下，当EditBox会被弹出的软键盘遮挡时，视图向上滚动至EditBox在软键盘上方可见的位置。反之视图位置不变
if (!CC_PREVIEW && cc.sys.platform === cc.sys.MOBILE_BROWSER) {
    cc.EditBox["_ImplClass"].prototype._adjustWindowScroll = function () {
        var self = this;
        setTimeout(function () {
            if (window.scrollY < 100) {
                var editBox = self._delegate;
                if (editBox && editBox.node) {
                    var worldBox = editBox.node.getBoundingBoxToWorld();
                    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    var ratio = cc.winSize.height / scrollHeight;
                    var keyboardDomHeight = scrollHeight - clientHeight;
                    var keyboardCocosHeight = keyboardDomHeight * ratio;
                    console.error("scrollHeight: " + scrollHeight + ", clientHeight: " + clientHeight + ", ratio: " + ratio);
                    console.error("keyboardDomHeight: " + keyboardDomHeight + ", keyboardCocosHeight: " + keyboardCocosHeight);
                    if (worldBox.yMin >= keyboardCocosHeight) {
                        console.error("return");
                        return;
                    }
                    // DOM坐标系下，EditBox底部与软键盘顶部的距离
                    var domDelta = (keyboardCocosHeight - worldBox.yMin) / ratio;
                    window.scroll({ top: domDelta, behavior: 'smooth' });
                    console.error("domDelta: " + domDelta);
                }
                else {
                    self._elem.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
                    console.error("scrollIntoView");
                }
            }
        }, 500);
    };
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxoYWNrXFxFZGl0b3JCb3hIYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9DQUFvQztBQUNwQyxtRUFBbUU7QUFDbkUsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtJQUMxRCxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRztRQUNyRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsVUFBVSxDQUFDO1lBQ1AsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxPQUFPLEdBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDekMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtvQkFDekIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO29CQUNwRCxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDdkYsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQ3ZGLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztvQkFDN0MsSUFBSSxpQkFBaUIsR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDO29CQUNwRCxJQUFJLG1CQUFtQixHQUFHLGlCQUFpQixHQUFHLEtBQUssQ0FBQztvQkFDcEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBaUIsWUFBWSx3QkFBbUIsWUFBWSxpQkFBWSxLQUFPLENBQUMsQ0FBQztvQkFDL0YsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBc0IsaUJBQWlCLCtCQUEwQixtQkFBcUIsQ0FBQyxDQUFDO29CQUN0RyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksbUJBQW1CLEVBQUU7d0JBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3hCLE9BQU87cUJBQ1Y7b0JBRUQsNkJBQTZCO29CQUM3QixJQUFJLFFBQVEsR0FBRyxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQzdELE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNyRCxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWEsUUFBVSxDQUFDLENBQUM7aUJBQzFDO3FCQUFNO29CQUNILElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNyRixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQ25DO2FBQ0o7UUFDTCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUE7Q0FDSiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOWfuuS6jkNvY29zQ3JlYXRvcjIueCBFZGl0Qm9457uE5Lu2aGFja+S7o+eggVxyXG4vLyDnp7vliqjnq693ZWLnjq/looPkuIvvvIzlvZNFZGl0Qm945Lya6KKr5by55Ye655qE6L2v6ZSu55uY6YGu5oyh5pe277yM6KeG5Zu+5ZCR5LiK5rua5Yqo6IezRWRpdEJveOWcqOi9r+mUruebmOS4iuaWueWPr+ingeeahOS9jee9ruOAguWPjeS5i+inhuWbvuS9jee9ruS4jeWPmFxyXG5pZiAoIUNDX1BSRVZJRVcgJiYgY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuTU9CSUxFX0JST1dTRVIpIHtcclxuICAgIGNjLkVkaXRCb3hbXCJfSW1wbENsYXNzXCJdLnByb3RvdHlwZS5fYWRqdXN0V2luZG93U2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWRpdEJveDogY2MuRWRpdEJveCA9IHNlbGYuX2RlbGVnYXRlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVkaXRCb3ggJiYgZWRpdEJveC5ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvcmxkQm94ID0gZWRpdEJveC5ub2RlLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGllbnRIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYXRpbyA9IGNjLndpblNpemUuaGVpZ2h0IC8gc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXlib2FyZERvbUhlaWdodCA9IHNjcm9sbEhlaWdodCAtIGNsaWVudEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5Ym9hcmRDb2Nvc0hlaWdodCA9IGtleWJvYXJkRG9tSGVpZ2h0ICogcmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgc2Nyb2xsSGVpZ2h0OiAke3Njcm9sbEhlaWdodH0sIGNsaWVudEhlaWdodDogJHtjbGllbnRIZWlnaHR9LCByYXRpbzogJHtyYXRpb31gKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBrZXlib2FyZERvbUhlaWdodDogJHtrZXlib2FyZERvbUhlaWdodH0sIGtleWJvYXJkQ29jb3NIZWlnaHQ6ICR7a2V5Ym9hcmRDb2Nvc0hlaWdodH1gKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod29ybGRCb3gueU1pbiA+PSBrZXlib2FyZENvY29zSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZXR1cm5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIERPTeWdkOagh+ezu+S4i++8jEVkaXRCb3jlupXpg6jkuI7ova/plK7nm5jpobbpg6jnmoTot53nprtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZG9tRGVsdGEgPSAoa2V5Ym9hcmRDb2Nvc0hlaWdodCAtIHdvcmxkQm94LnlNaW4pIC8gcmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbCh7IHRvcDogZG9tRGVsdGEsIGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBkb21EZWx0YTogJHtkb21EZWx0YX1gKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZWxlbS5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiBcInN0YXJ0XCIsIGlubGluZTogXCJuZWFyZXN0XCIsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHNjcm9sbEludG9WaWV3YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG59Il19