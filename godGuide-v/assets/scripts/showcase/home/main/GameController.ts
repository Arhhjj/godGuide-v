import Layer from "../../../common/cmpt/base/Layer";
import { EventName } from "../../../common/const/EventName";
import { EGameStatus } from "../../../common/runtime/EnumIndex";
import Events, { preloadEvent } from "../../../common/util/Events";
import Tool from "../../../common/util/Tool";
import BarrierManager from "./BarrierManager";
import MoveCtr from "./MoveCtr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
    @property(cc.Node) touchArea: cc.Node = null
    @property(cc.Node) targetMove: cc.Node = null
    @property(cc.Node) targetShow: cc.Node = null
    private moveCtrCmpt: MoveCtr = null

    @property(cc.Node) barrierArea: cc.Node = null
    private barrierManagerCmpt: BarrierManager = null

    private gameStatus: EGameStatus = EGameStatus.END
    @property(cc.Node) dlgOver: cc.Node = null
    private isOver: boolean = false //控制开始游戏的速度

    protected onLoad(): void {
        Events.targetOn(this)

        this.moveCtrCmpt = new MoveCtr(this.targetMove, this.targetShow)
        this.barrierManagerCmpt = new BarrierManager(this.barrierArea)
    }

    async startGame() {
        if (this.isOver) return
        this.isOver = true

        this.gameStatus = EGameStatus.START
        this.toggleDlgOver()

        this.moveCtrCmpt.startMoving()
        while (this.gameStatus === EGameStatus.START) {
            this.barrierManagerCmpt.createBarrier()
            await Tool.waitCmpt(this, 1)
        }

        this.isOver = false
    }

    /**改变移动方向 */
    changeMoveDirection() {
        if (this.gameStatus !== EGameStatus.START) return
        this.moveCtrCmpt.changeMoveDirection()
    }

    @preloadEvent(EventName.JUDG_RESULT)
    judgResult(barrierID: number) {
        const tip = {
            text: "",
            unique: false,
            end: cc.v2(0, 100)
        }

        if (barrierID === 7) {
            console.log("加道具数量");

            tip.text = "获得道具："
            Layer.inst.showTip(tip)
            return
        }

        const targetID = this.moveCtrCmpt.targetID
        if (barrierID === targetID) {
            console.log("加点金币");

            tip.text = "获得金币："
            Layer.inst.showTip(tip)

        } else {
            console.log("gameOver");

            tip.text = "结束获取"
            Layer.inst.showTip(tip)

            this.gameOver();
        }
    }

    gameOver() {
        this.gameStatus = EGameStatus.END
        this.moveCtrCmpt.randomID()
        this.moveCtrCmpt.gameOver()
        this.barrierArea.destroyAllChildren()
        this.toggleDlgOver()
    }

    toggleDlgOver() {
        this.dlgOver.active = this.gameStatus === EGameStatus.END
    }

    protected onDestroy(): void {
        Events.targetOff(this)
        // this.moveCtrCmpt.onDestroy()
    }

}
