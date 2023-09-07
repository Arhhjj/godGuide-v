"use strict";
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