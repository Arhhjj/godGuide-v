"use strict";
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