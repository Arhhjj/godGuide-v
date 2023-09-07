
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/home/main/MoveCtr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85314W/qlpJdrs34pUNKN2i', 'MoveCtr');
// scripts/showcase/home/Card/MoveCtr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResSprite_1 = require("../../../common/cmpt/ui/res/ResSprite");
var Url_1 = require("../../../common/const/Url");
var Tool_1 = require("../../../common/util/Tool");
/**移动控制 */
var MoveCtr = /** @class */ (function () {
    function MoveCtr(targetNode, targetShow) {
        this.targetNode = null;
        this.targetShow = null;
        this._moveSpeed = 1500; // 运动速度
        this._maxWidth = 1300;
        this._maxHeight = 0;
        this._minWidth = -1300;
        this._minHeight = 0;
        this.moveDirection = cc.v2(1, 0); // 初始运动方向向右
        this._targetID = null;
        this.targetNode = targetNode;
        this.targetShow = targetShow;
        this.randomID();
    }
    Object.defineProperty(MoveCtr.prototype, "targetID", {
        get: function () { return this._targetID; },
        enumerable: false,
        configurable: true
    });
    MoveCtr.prototype.randomID = function () {
        var _a, _b;
        this._targetID = Tool_1.default.randInt(1, 6);
        var resSprite = (_a = this.targetNode.getComponent(ResSprite_1.default)) !== null && _a !== void 0 ? _a : this.targetNode.addComponent(ResSprite_1.default);
        resSprite.setSpriteFrame(Url_1.DirUrl.TEXTURE + "home/barrier/" + this._targetID);
        var resSpriteShow = (_b = this.targetShow.getComponent(ResSprite_1.default)) !== null && _b !== void 0 ? _b : this.targetShow.addComponent(ResSprite_1.default);
        resSpriteShow.setSpriteFrame(Url_1.DirUrl.TEXTURE + "home/barrier/" + this._targetID);
    };
    MoveCtr.prototype.startMoving = function () {
        var schedule = cc.director.getScheduler();
        schedule.enableForTarget(this);
        schedule.schedule(this.updateMove, this, 0);
    };
    MoveCtr.prototype.stopMoving = function () {
        var schedule = cc.director.getScheduler();
        schedule.unschedule(this.updateMove, this);
    };
    MoveCtr.prototype.updateMove = function (dt) {
        this.targetNode.x += dt * this._moveSpeed * this.moveDirection.x;
        this.targetNode.y += dt * this._moveSpeed * this.moveDirection.y;
        var targetx = this.targetNode.x;
        var targety = this.targetNode.y;
        if (targetx >= this._maxWidth && targety >= this._maxHeight)
            this.moveDirection = cc.v2(-1, 0);
        if (targetx <= this._minWidth && targety <= this._minHeight)
            this.moveDirection = cc.v2(1, 0);
    };
    MoveCtr.prototype.changeMoveDirection = function () {
        this.moveDirection = (this.moveDirection.equals(cc.v2(1, 0))) ? cc.v2(-1, 0) : cc.v2(1, 0);
    };
    // onDestroy() {
    //     this.stopMoving();
    // }
    MoveCtr.prototype.gameOver = function () {
        this.stopMoving();
        this.targetNode.setPosition(0, 0);
    };
    return MoveCtr;
}());
exports.default = MoveCtr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGhvbWVcXENhcmRcXE1vdmVDdHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBOEQ7QUFDOUQsaURBQW1EO0FBQ25ELGtEQUE2QztBQUU3QyxVQUFVO0FBQ1Y7SUFlSSxpQkFBWSxVQUFtQixFQUFFLFVBQW1CO1FBZDVDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQVcsSUFBSSxDQUFDLENBQUMsT0FBTztRQUNsQyxjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3pCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsY0FBUyxHQUFXLENBQUMsSUFBSSxDQUFDO1FBQzFCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsa0JBQWEsR0FBWSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7UUFFakQsY0FBUyxHQUFXLElBQUksQ0FBQTtRQUk1QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQU5ELHNCQUFXLDZCQUFRO2FBQW5CLGNBQXdCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQSxDQUFDLENBQUM7OztPQUFBO0lBUS9DLDBCQUFRLEdBQVI7O1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNuQyxJQUFNLFNBQVMsU0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLG1DQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQTtRQUNwRyxTQUFTLENBQUMsY0FBYyxDQUFDLFlBQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUUzRSxJQUFNLGFBQWEsU0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLG1DQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQTtRQUN4RyxhQUFhLENBQUMsY0FBYyxDQUFDLFlBQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNuRixDQUFDO0lBRUQsNkJBQVcsR0FBWDtRQUNJLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDNUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCw0QkFBVSxHQUFWO1FBQ0ksSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM1QyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLDRCQUFVLEdBQWxCLFVBQW1CLEVBQVU7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFFaEUsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7UUFDakMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7UUFDakMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVU7WUFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDOUYsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVU7WUFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2pHLENBQUM7SUFFRCxxQ0FBbUIsR0FBbkI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLHlCQUF5QjtJQUN6QixJQUFJO0lBRUosMEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQS9EQSxBQStEQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlc1Nwcml0ZSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NtcHQvdWkvcmVzL1Jlc1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBEaXJVcmwgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbnN0L1VybFwiO1xyXG5pbXBvcnQgVG9vbCBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3V0aWwvVG9vbFwiO1xyXG5cclxuLyoq56e75Yqo5o6n5Yi2ICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmVDdHIge1xyXG4gICAgcHJpdmF0ZSB0YXJnZXROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgdGFyZ2V0U2hvdzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW92ZVNwZWVkOiBudW1iZXIgPSAxNTAwOyAvLyDov5DliqjpgJ/luqZcclxuICAgIHByaXZhdGUgX21heFdpZHRoOiBudW1iZXIgPSAxMzAwO1xyXG4gICAgcHJpdmF0ZSBfbWF4SGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbWluV2lkdGg6IG51bWJlciA9IC0xMzAwO1xyXG4gICAgcHJpdmF0ZSBfbWluSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgbW92ZURpcmVjdGlvbjogY2MuVmVjMiA9IGNjLnYyKDEsIDApOyAvLyDliJ3lp4vov5DliqjmlrnlkJHlkJHlj7NcclxuXHJcbiAgICBwcml2YXRlIF90YXJnZXRJRDogbnVtYmVyID0gbnVsbFxyXG4gICAgcHVibGljIGdldCB0YXJnZXRJRCgpIHsgcmV0dXJuIHRoaXMuX3RhcmdldElEIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXROb2RlOiBjYy5Ob2RlLCB0YXJnZXRTaG93OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXROb2RlID0gdGFyZ2V0Tm9kZTtcclxuICAgICAgICB0aGlzLnRhcmdldFNob3cgPSB0YXJnZXRTaG93O1xyXG4gICAgICAgIHRoaXMucmFuZG9tSUQoKTtcclxuICAgIH1cclxuXHJcbiAgICByYW5kb21JRCgpIHtcclxuICAgICAgICB0aGlzLl90YXJnZXRJRCA9IFRvb2wucmFuZEludCgxLCA2KVxyXG4gICAgICAgIGNvbnN0IHJlc1Nwcml0ZSA9IHRoaXMudGFyZ2V0Tm9kZS5nZXRDb21wb25lbnQoUmVzU3ByaXRlKSA/PyB0aGlzLnRhcmdldE5vZGUuYWRkQ29tcG9uZW50KFJlc1Nwcml0ZSlcclxuICAgICAgICByZXNTcHJpdGUuc2V0U3ByaXRlRnJhbWUoRGlyVXJsLlRFWFRVUkUgKyBcImhvbWUvYmFycmllci9cIiArIHRoaXMuX3RhcmdldElEKVxyXG5cclxuICAgICAgICBjb25zdCByZXNTcHJpdGVTaG93ID0gdGhpcy50YXJnZXRTaG93LmdldENvbXBvbmVudChSZXNTcHJpdGUpID8/IHRoaXMudGFyZ2V0U2hvdy5hZGRDb21wb25lbnQoUmVzU3ByaXRlKVxyXG4gICAgICAgIHJlc1Nwcml0ZVNob3cuc2V0U3ByaXRlRnJhbWUoRGlyVXJsLlRFWFRVUkUgKyBcImhvbWUvYmFycmllci9cIiArIHRoaXMuX3RhcmdldElEKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TW92aW5nKCkge1xyXG4gICAgICAgIGNvbnN0IHNjaGVkdWxlID0gY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCk7XHJcbiAgICAgICAgc2NoZWR1bGUuZW5hYmxlRm9yVGFyZ2V0KHRoaXMpO1xyXG4gICAgICAgIHNjaGVkdWxlLnNjaGVkdWxlKHRoaXMudXBkYXRlTW92ZSwgdGhpcywgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcE1vdmluZygpIHtcclxuICAgICAgICBjb25zdCBzY2hlZHVsZSA9IGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpO1xyXG4gICAgICAgIHNjaGVkdWxlLnVuc2NoZWR1bGUodGhpcy51cGRhdGVNb3ZlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU1vdmUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0Tm9kZS54ICs9IGR0ICogdGhpcy5fbW92ZVNwZWVkICogdGhpcy5tb3ZlRGlyZWN0aW9uLnhcclxuICAgICAgICB0aGlzLnRhcmdldE5vZGUueSArPSBkdCAqIHRoaXMuX21vdmVTcGVlZCAqIHRoaXMubW92ZURpcmVjdGlvbi55XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldHggPSB0aGlzLnRhcmdldE5vZGUueFxyXG4gICAgICAgIGNvbnN0IHRhcmdldHkgPSB0aGlzLnRhcmdldE5vZGUueVxyXG4gICAgICAgIGlmICh0YXJnZXR4ID49IHRoaXMuX21heFdpZHRoICYmIHRhcmdldHkgPj0gdGhpcy5fbWF4SGVpZ2h0KSB0aGlzLm1vdmVEaXJlY3Rpb24gPSBjYy52MigtMSwgMClcclxuICAgICAgICBpZiAodGFyZ2V0eCA8PSB0aGlzLl9taW5XaWR0aCAmJiB0YXJnZXR5IDw9IHRoaXMuX21pbkhlaWdodCkgdGhpcy5tb3ZlRGlyZWN0aW9uID0gY2MudjIoMSwgMClcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VNb3ZlRGlyZWN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubW92ZURpcmVjdGlvbiA9ICh0aGlzLm1vdmVEaXJlY3Rpb24uZXF1YWxzKGNjLnYyKDEsIDApKSkgPyBjYy52MigtMSwgMCkgOiBjYy52MigxLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvbkRlc3Ryb3koKSB7XHJcbiAgICAvLyAgICAgdGhpcy5zdG9wTW92aW5nKCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgZ2FtZU92ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wTW92aW5nKCk7XHJcbiAgICAgICAgdGhpcy50YXJnZXROb2RlLnNldFBvc2l0aW9uKDAsIDApXHJcbiAgICB9XHJcbn1cclxuIl19