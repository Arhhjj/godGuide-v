"use strict";
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