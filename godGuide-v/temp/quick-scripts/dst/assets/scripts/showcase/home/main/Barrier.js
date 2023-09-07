
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/home/main/Barrier.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f8b28+GcydKlrxxzBuziF5P', 'Barrier');
// scripts/showcase/home/Card/Barrier.ts

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
var ResSprite_1 = require("../../../common/cmpt/ui/res/ResSprite");
var EventName_1 = require("../../../common/const/EventName");
var Url_1 = require("../../../common/const/Url");
var Events_1 = require("../../../common/util/Events");
var Tool_1 = require("../../../common/util/Tool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Barrier = /** @class */ (function (_super) {
    __extends(Barrier, _super);
    function Barrier() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._randomID = null;
        return _this;
    }
    Barrier.prototype.init = function () {
        var randomID = Tool_1.default.randInt(1, 8);
        this._randomID = randomID;
        console.log("randomID:", randomID);
        var x = Tool_1.default.randInt(-650, 650);
        var y = 200;
        this.node.setPosition(x, y); //设置随机位置
        var spBarrier = this.addComponent(cc.Sprite);
        var resSpriteBarrier = this.addComponent(ResSprite_1.default);
        resSpriteBarrier.setSpriteFrame(Url_1.DirUrl.TEXTURE + "home/barrier/" + randomID);
        this.node.group = "barrier";
        var collider = this.addComponent(cc.CircleCollider);
        collider.radius = 60;
    };
    Barrier.prototype.move = function () {
        var _this = this;
        var targetPosition = cc.v3(this.node.position.x, this.node.position.y - 400);
        var time = 1.5;
        cc.tween(this.node)
            .to(time, { position: targetPosition })
            .call(function () { _this.node.destroy(); })
            .start();
    };
    Barrier.prototype.onCollisionEnter = function (other, self) {
        Events_1.default.emit(EventName_1.EventName.JUDG_RESULT, this._randomID);
        this.node.destroy();
    };
    Barrier = __decorate([
        ccclass
    ], Barrier);
    return Barrier;
}(cc.Component));
exports.default = Barrier;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGhvbWVcXENhcmRcXEJhcnJpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUVBQThEO0FBQzlELDZEQUE0RDtBQUM1RCxpREFBbUQ7QUFDbkQsc0RBQWlEO0FBQ2pELGtEQUE2QztBQUV2QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFxQywyQkFBWTtJQUFqRDtRQUFBLHFFQXFDQztRQXBDVyxlQUFTLEdBQVcsSUFBSSxDQUFBOztJQW9DcEMsQ0FBQztJQWxDVSxzQkFBSSxHQUFYO1FBQ0ksSUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFHbkMsSUFBTSxDQUFDLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNqQyxJQUFNLENBQUMsR0FBRyxHQUFHLENBQUE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxRQUFRO1FBRXBDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzlDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUE7UUFDckQsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFlBQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxHQUFHLFFBQVEsQ0FBQyxDQUFBO1FBRTVFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNyRCxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBRU0sc0JBQUksR0FBWDtRQUFBLGlCQVFDO1FBUEcsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQy9FLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUVqQixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDZCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxDQUFDO2FBQ3RDLElBQUksQ0FBQyxjQUFRLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUM7YUFDbkMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELGtDQUFnQixHQUFoQixVQUFpQixLQUFLLEVBQUUsSUFBSTtRQUN4QixnQkFBTSxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBcENnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBcUMzQjtJQUFELGNBQUM7Q0FyQ0QsQUFxQ0MsQ0FyQ29DLEVBQUUsQ0FBQyxTQUFTLEdBcUNoRDtrQkFyQ29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzU3ByaXRlIGZyb20gXCIuLi8uLi8uLi9jb21tb24vY21wdC91aS9yZXMvUmVzU3ByaXRlXCI7XHJcbmltcG9ydCB7IEV2ZW50TmFtZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29uc3QvRXZlbnROYW1lXCI7XHJcbmltcG9ydCB7IERpclVybCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29uc3QvVXJsXCI7XHJcbmltcG9ydCBFdmVudHMgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi91dGlsL0V2ZW50c1wiO1xyXG5pbXBvcnQgVG9vbCBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3V0aWwvVG9vbFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhcnJpZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBfcmFuZG9tSUQ6IG51bWJlciA9IG51bGxcclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpIHtcclxuICAgICAgICBjb25zdCByYW5kb21JRCA9IFRvb2wucmFuZEludCgxLCA4KVxyXG4gICAgICAgIHRoaXMuX3JhbmRvbUlEID0gcmFuZG9tSURcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJhbmRvbUlEOlwiLCByYW5kb21JRCk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCB4ID0gVG9vbC5yYW5kSW50KC02NTAsIDY1MClcclxuICAgICAgICBjb25zdCB5ID0gMjAwXHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHgsIHkpIC8v6K6+572u6ZqP5py65L2N572uXHJcblxyXG4gICAgICAgIGNvbnN0IHNwQmFycmllciA9IHRoaXMuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICBjb25zdCByZXNTcHJpdGVCYXJyaWVyID0gdGhpcy5hZGRDb21wb25lbnQoUmVzU3ByaXRlKVxyXG4gICAgICAgIHJlc1Nwcml0ZUJhcnJpZXIuc2V0U3ByaXRlRnJhbWUoRGlyVXJsLlRFWFRVUkUgKyBcImhvbWUvYmFycmllci9cIiArIHJhbmRvbUlEKVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZ3JvdXAgPSBcImJhcnJpZXJcIlxyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyID0gdGhpcy5hZGRDb21wb25lbnQoY2MuQ2lyY2xlQ29sbGlkZXIpXHJcbiAgICAgICAgY29sbGlkZXIucmFkaXVzID0gNjBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZSgpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IGNjLnYzKHRoaXMubm9kZS5wb3NpdGlvbi54LCB0aGlzLm5vZGUucG9zaXRpb24ueSAtIDQwMCk7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IDEuNTtcclxuXHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxyXG4gICAgICAgICAgICAudG8odGltZSwgeyBwb3NpdGlvbjogdGFyZ2V0UG9zaXRpb24gfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4geyB0aGlzLm5vZGUuZGVzdHJveSgpIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcclxuICAgICAgICBFdmVudHMuZW1pdChFdmVudE5hbWUuSlVER19SRVNVTFQsIHRoaXMuX3JhbmRvbUlEKVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpXHJcbiAgICB9XHJcbn1cclxuIl19