import ResSprite from "../../../common/cmpt/ui/res/ResSprite";
import { EventName } from "../../../common/const/EventName";
import { DirUrl } from "../../../common/const/Url";
import Events from "../../../common/util/Events";
import Tool from "../../../common/util/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Barrier extends cc.Component {
    private _randomID: number = null

    public init() {
        const randomID = Tool.randInt(1, 8)
        this._randomID = randomID
        console.log("randomID:", randomID);


        const x = Tool.randInt(-650, 650)
        const y = 200
        this.node.setPosition(x, y) //设置随机位置

        const spBarrier = this.addComponent(cc.Sprite)
        const resSpriteBarrier = this.addComponent(ResSprite)
        resSpriteBarrier.setSpriteFrame(DirUrl.TEXTURE + "home/barrier/" + randomID)

        this.node.group = "barrier"
        const collider = this.addComponent(cc.CircleCollider)
        collider.radius = 60
    }

    public move() {
        const targetPosition = cc.v3(this.node.position.x, this.node.position.y - 400);
        const time = 1.5;

        cc.tween(this.node)
            .to(time, { position: targetPosition })
            .call(() => { this.node.destroy() })
            .start();
    }

    onCollisionEnter(other, self) {
        Events.emit(EventName.JUDG_RESULT, this._randomID)

        this.node.destroy()
    }
}
