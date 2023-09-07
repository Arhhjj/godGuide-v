import Barrier from "./Barrier"

/**掉落物管理类 */
export default class BarrierManager {
    private barrierArea: cc.Node = null

    constructor(barrierArea: cc.Node) {
        this.barrierArea = barrierArea
    }

    createBarrier() {
        const barrier = new cc.Node()
        barrier.setParent(this.barrierArea)

        const barrierCmpt = barrier.addComponent(Barrier)
        barrierCmpt.init() //记录此cmpt的唯一标识
        barrierCmpt.move()
    }

}