
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/adapt/AdaptCanvas.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2174f+PKGlGH7csvm0koWVs', 'AdaptCanvas');
// scripts/common/cmpt/ui/adapt/AdaptCanvas.ts

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
var EventName_1 = require("../../../const/EventName");
var Events_1 = require("../../../util/Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
// 仅web有效
cc.view.setResizeCallback(function () {
    Events_1.default.emit(EventName_1.EventName.RESIZE);
});
/**
 * 分辨率适配组件，保证设计分辨率区域全部都能显示
 */
var AdaptCanvas = /** @class */ (function (_super) {
    __extends(AdaptCanvas, _super);
    function AdaptCanvas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptCanvas.prototype.onLoad = function () {
        this.adapt();
    };
    AdaptCanvas.prototype.adapt = function () {
        var resolutionRatio = cc.Canvas.instance.designResolution.width / cc.Canvas.instance.designResolution.height;
        var ratio = cc.winSize.width / cc.winSize.height;
        if (ratio > resolutionRatio) {
            cc.Canvas.instance.fitHeight = true;
            cc.Canvas.instance.fitWidth = false;
        }
        else {
            cc.Canvas.instance.fitHeight = false;
            cc.Canvas.instance.fitWidth = true;
        }
    };
    __decorate([
        Events_1.preloadEvent(EventName_1.EventName.RESIZE)
    ], AdaptCanvas.prototype, "adapt", null);
    AdaptCanvas = __decorate([
        ccclass,
        Events_1.eventsOnLoad(),
        disallowMultiple,
        menu("Framework/UI组件/AdaptCanvas")
    ], AdaptCanvas);
    return AdaptCanvas;
}(cc.Component));
exports.default = AdaptCanvas;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcYWRhcHRcXEFkYXB0Q2FudmFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFxRDtBQUNyRCwrQ0FBMEU7QUFFcEUsSUFBQSxLQUFnRCxFQUFFLENBQUMsVUFBVSxFQUEzRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQWtCLENBQUM7QUFFcEUsU0FBUztBQUNULEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDdEIsZ0JBQU0sQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQztBQUVIOztHQUVHO0FBS0g7SUFBeUMsK0JBQVk7SUFBckQ7O0lBaUJBLENBQUM7SUFoQmEsNEJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUdPLDJCQUFLLEdBQWI7UUFDSSxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQzdHLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2pELElBQUksS0FBSyxHQUFHLGVBQWUsRUFBRTtZQUN6QixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDdkM7YUFBTTtZQUNILEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDckMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN0QztJQUNMLENBQUM7SUFWRDtRQURDLHFCQUFZLENBQUMscUJBQVMsQ0FBQyxNQUFNLENBQUM7NENBVzlCO0lBaEJnQixXQUFXO1FBSi9CLE9BQU87UUFDUCxxQkFBWSxFQUFFO1FBQ2QsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztPQUNkLFdBQVcsQ0FpQi9CO0lBQUQsa0JBQUM7Q0FqQkQsQUFpQkMsQ0FqQndDLEVBQUUsQ0FBQyxTQUFTLEdBaUJwRDtrQkFqQm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudE5hbWUgfSBmcm9tIFwiLi4vLi4vLi4vY29uc3QvRXZlbnROYW1lXCI7XHJcbmltcG9ydCBFdmVudHMsIHsgZXZlbnRzT25Mb2FkLCBwcmVsb2FkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbC9FdmVudHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUsIGRpc2FsbG93TXVsdGlwbGUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vLyDku4V3ZWLmnInmlYhcclxuY2Mudmlldy5zZXRSZXNpemVDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBFdmVudHMuZW1pdChFdmVudE5hbWUuUkVTSVpFKTtcclxufSk7XHJcblxyXG4vKipcclxuICog5YiG6L6o546H6YCC6YWN57uE5Lu277yM5L+d6K+B6K6+6K6h5YiG6L6o546H5Yy65Z+f5YWo6YOo6YO96IO95pi+56S6XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5AZXZlbnRzT25Mb2FkKClcclxuQGRpc2FsbG93TXVsdGlwbGVcclxuQG1lbnUoXCJGcmFtZXdvcmsvVUnnu4Tku7YvQWRhcHRDYW52YXNcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRhcHRDYW52YXMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFkYXB0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQHByZWxvYWRFdmVudChFdmVudE5hbWUuUkVTSVpFKVxyXG4gICAgcHJpdmF0ZSBhZGFwdCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcmVzb2x1dGlvblJhdGlvID0gY2MuQ2FudmFzLmluc3RhbmNlLmRlc2lnblJlc29sdXRpb24ud2lkdGggLyBjYy5DYW52YXMuaW5zdGFuY2UuZGVzaWduUmVzb2x1dGlvbi5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHJhdGlvID0gY2Mud2luU2l6ZS53aWR0aCAvIGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgICAgIGlmIChyYXRpbyA+IHJlc29sdXRpb25SYXRpbykge1xyXG4gICAgICAgICAgICBjYy5DYW52YXMuaW5zdGFuY2UuZml0SGVpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuQ2FudmFzLmluc3RhbmNlLmZpdFdpZHRoID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MuQ2FudmFzLmluc3RhbmNlLmZpdEhlaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5DYW52YXMuaW5zdGFuY2UuZml0V2lkdGggPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=