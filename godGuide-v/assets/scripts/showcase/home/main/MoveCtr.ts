import ResSprite from "../../../common/cmpt/ui/res/ResSprite";
import { DirUrl } from "../../../common/const/Url";
import Tool from "../../../common/util/Tool";

/**移动控制 */
export default class MoveCtr {
    private targetNode: cc.Node = null;
    private targetShow: cc.Node = null;

    private _moveSpeed: number = 1500; // 运动速度
    private _maxWidth: number = 1300;
    private _maxHeight: number = 0;
    private _minWidth: number = -1300;
    private _minHeight: number = 0;

    private moveDirection: cc.Vec2 = cc.v2(1, 0); // 初始运动方向向右

    private _targetID: number = null
    public get targetID() { return this._targetID }

    constructor(targetNode: cc.Node, targetShow: cc.Node) {
        this.targetNode = targetNode;
        this.targetShow = targetShow;
        this.randomID();
    }

    randomID() {
        this._targetID = Tool.randInt(1, 6)
        const resSprite = this.targetNode.getComponent(ResSprite) ?? this.targetNode.addComponent(ResSprite)
        resSprite.setSpriteFrame(DirUrl.TEXTURE + "home/barrier/" + this._targetID)

        const resSpriteShow = this.targetShow.getComponent(ResSprite) ?? this.targetShow.addComponent(ResSprite)
        resSpriteShow.setSpriteFrame(DirUrl.TEXTURE + "home/barrier/" + this._targetID)
    }

    startMoving() {
        const schedule = cc.director.getScheduler();
        schedule.enableForTarget(this);
        schedule.schedule(this.updateMove, this, 0);
    }

    stopMoving() {
        const schedule = cc.director.getScheduler();
        schedule.unschedule(this.updateMove, this);
    }

    private updateMove(dt: number): void {
        this.targetNode.x += dt * this._moveSpeed * this.moveDirection.x
        this.targetNode.y += dt * this._moveSpeed * this.moveDirection.y

        const targetx = this.targetNode.x
        const targety = this.targetNode.y
        if (targetx >= this._maxWidth && targety >= this._maxHeight) this.moveDirection = cc.v2(-1, 0)
        if (targetx <= this._minWidth && targety <= this._minHeight) this.moveDirection = cc.v2(1, 0)
    }

    changeMoveDirection() {
        this.moveDirection = (this.moveDirection.equals(cc.v2(1, 0))) ? cc.v2(-1, 0) : cc.v2(1, 0);
    }

    // onDestroy() {
    //     this.stopMoving();
    // }

    gameOver() {
        this.stopMoving();
        this.targetNode.setPosition(0, 0)
    }
}
