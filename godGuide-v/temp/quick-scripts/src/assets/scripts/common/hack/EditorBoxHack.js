"use strict";
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