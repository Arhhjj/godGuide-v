import DialogBase from "../../common/cmpt/base/DialogBase";
import { DirUrl } from "../../common/const/Url";
import Events from "../../common/util/Events";

const { ccclass, property, menu } = cc._decorator;

@ccclass
export default class DlgSign extends DialogBase {
    public static pUrl: string = DirUrl.PREFAB_DIALOG + "DlgSign";

    protected onLoad() {
        super.onLoad();
        Events.targetOn(this);
    }

    protected onDestroy() {
        Events.targetOff(this);
    }

    protected update() { }

}
