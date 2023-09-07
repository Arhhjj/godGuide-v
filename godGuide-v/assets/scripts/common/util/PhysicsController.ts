const { ccclass, property } = cc._decorator;

@ccclass
export default class PhysicsController extends cc.Component {
    @property({ tooltip: "是否开启物理" })
    enablePhysics: boolean = false;

    @property({ tooltip: "是否开启碰撞检测" })
    enableCollision: boolean = false;

    @property({ tooltip: "是否绘制碰撞框" })
    drawCollision: boolean = false;

    onLoad() {
        this.setPhysicsStatus(this.enablePhysics);
        this.setCollisionStatus(this.enableCollision);
        this.setCollisionDrawStatus(this.drawCollision);
    }

    /**
     * 设置物理引擎开启状态
     * @param enable {boolean} 是否开启物理引擎
     */
    setPhysicsStatus(enable: boolean) {
        cc.director.getPhysicsManager().enabled = enable;
    }

    /**
     * 设置碰撞检测开启状态
     * @param enable {boolean} 是否开启碰撞检测
     */
    setCollisionStatus(enable: boolean) {
        cc.director.getCollisionManager().enabled = enable;
    }

    /**
     * 设置碰撞绘制状态
     * @param enable {boolean} 是否绘制碰撞框
     */
    setCollisionDrawStatus(enable: boolean) {
        cc.director.getCollisionManager().enabledDebugDraw = enable;
    }
}
