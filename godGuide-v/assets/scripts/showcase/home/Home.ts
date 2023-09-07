import Layer from "../../common/cmpt/base/Layer";
import { EventName } from "../../common/const/EventName";
import { ResUrl } from "../../common/const/Url";
import Events, { preloadEvent } from "../../common/util/Events";
import DlgLevel from "../dialog/DlgLevel";
import DlgRole from "../dialog/DlgRole";
import DlgSign from "../dialog/DlgSign";
import DlgStore from "../dialog/DlgStore";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    protected onLoad() {
        Events.targetOn(this);
    }

    protected onDestroy() {
        Events.targetOff(this);
    }

    protected start(): void {
        Events.emit(EventName.EXCUTE_GUIDE_TASK, "guideTask1")
    }

    @preloadEvent(EventName.ADD_COIN)
    async addCoin() {

    }

    private onClickGame() {
        Layer.inst.enterMain(ResUrl.PREFAB.GAME);
    }

    private onClickLevel() {
        Layer.inst.openUniDialogAsync(DlgLevel.pUrl);
    }

    private onClickSign() {
        Layer.inst.openUniDialogAsync(DlgSign.pUrl);
    }

    private onClickRole() {
        Layer.inst.openUniDialogAsync(DlgRole.pUrl);
    }

    private onClickStore() {
        Layer.inst.openUniDialogAsync(DlgStore.pUrl);
    }

}
