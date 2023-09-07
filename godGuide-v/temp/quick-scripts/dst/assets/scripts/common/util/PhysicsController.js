
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/PhysicsController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '017643KzK1BHIp4utqzkkFO', 'PhysicsController');
// scripts/common/util/PhysicsController.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PhysicsController = /** @class */ (function (_super) {
    __extends(PhysicsController, _super);
    function PhysicsController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enablePhysics = false;
        _this.enableCollision = false;
        _this.drawCollision = false;
        return _this;
    }
    PhysicsController.prototype.onLoad = function () {
        this.setPhysicsStatus(this.enablePhysics);
        this.setCollisionStatus(this.enableCollision);
        this.setCollisionDrawStatus(this.drawCollision);
    };
    /**
     * 设置物理引擎开启状态
     * @param enable {boolean} 是否开启物理引擎
     */
    PhysicsController.prototype.setPhysicsStatus = function (enable) {
        cc.director.getPhysicsManager().enabled = enable;
    };
    /**
     * 设置碰撞检测开启状态
     * @param enable {boolean} 是否开启碰撞检测
     */
    PhysicsController.prototype.setCollisionStatus = function (enable) {
        cc.director.getCollisionManager().enabled = enable;
    };
    /**
     * 设置碰撞绘制状态
     * @param enable {boolean} 是否绘制碰撞框
     */
    PhysicsController.prototype.setCollisionDrawStatus = function (enable) {
        cc.director.getCollisionManager().enabledDebugDraw = enable;
    };
    __decorate([
        property({ tooltip: "是否开启物理" })
    ], PhysicsController.prototype, "enablePhysics", void 0);
    __decorate([
        property({ tooltip: "是否开启碰撞检测" })
    ], PhysicsController.prototype, "enableCollision", void 0);
    __decorate([
        property({ tooltip: "是否绘制碰撞框" })
    ], PhysicsController.prototype, "drawCollision", void 0);
    PhysicsController = __decorate([
        ccclass
    ], PhysicsController);
    return PhysicsController;
}(cc.Component));
exports.default = PhysicsController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxQaHlzaWNzQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQXVDQztRQXJDRyxtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUcvQixxQkFBZSxHQUFZLEtBQUssQ0FBQztRQUdqQyxtQkFBYSxHQUFZLEtBQUssQ0FBQzs7SUErQm5DLENBQUM7SUE3Qkcsa0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7O09BR0c7SUFDSCw0Q0FBZ0IsR0FBaEIsVUFBaUIsTUFBZTtRQUM1QixFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUNyRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsOENBQWtCLEdBQWxCLFVBQW1CLE1BQWU7UUFDOUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNILGtEQUFzQixHQUF0QixVQUF1QixNQUFlO1FBQ2xDLEVBQUUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7SUFDaEUsQ0FBQztJQXBDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzs0REFDRDtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQzs4REFDRDtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQzs0REFDRjtJQVJkLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBdUNyQztJQUFELHdCQUFDO0NBdkNELEFBdUNDLENBdkM4QyxFQUFFLENBQUMsU0FBUyxHQXVDMUQ7a0JBdkNvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGh5c2ljc0NvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLmmK/lkKblvIDlkK/niannkIZcIiB9KVxyXG4gICAgZW5hYmxlUGh5c2ljczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5piv5ZCm5byA5ZCv56Kw5pKe5qOA5rWLXCIgfSlcclxuICAgIGVuYWJsZUNvbGxpc2lvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5piv5ZCm57uY5Yi256Kw5pKe5qGGXCIgfSlcclxuICAgIGRyYXdDb2xsaXNpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRQaHlzaWNzU3RhdHVzKHRoaXMuZW5hYmxlUGh5c2ljcyk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xsaXNpb25TdGF0dXModGhpcy5lbmFibGVDb2xsaXNpb24pO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sbGlzaW9uRHJhd1N0YXR1cyh0aGlzLmRyYXdDb2xsaXNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u54mp55CG5byV5pOO5byA5ZCv54q25oCBXHJcbiAgICAgKiBAcGFyYW0gZW5hYmxlIHtib29sZWFufSDmmK/lkKblvIDlkK/niannkIblvJXmk45cclxuICAgICAqL1xyXG4gICAgc2V0UGh5c2ljc1N0YXR1cyhlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmVuYWJsZWQgPSBlbmFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7norDmkp7mo4DmtYvlvIDlkK/nirbmgIFcclxuICAgICAqIEBwYXJhbSBlbmFibGUge2Jvb2xlYW59IOaYr+WQpuW8gOWQr+eisOaSnuajgOa1i1xyXG4gICAgICovXHJcbiAgICBzZXRDb2xsaXNpb25TdGF0dXMoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSBlbmFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7norDmkp7nu5jliLbnirbmgIFcclxuICAgICAqIEBwYXJhbSBlbmFibGUge2Jvb2xlYW59IOaYr+WQpue7mOWItueisOaSnuahhlxyXG4gICAgICovXHJcbiAgICBzZXRDb2xsaXNpb25EcmF3U3RhdHVzKGVuYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gZW5hYmxlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==