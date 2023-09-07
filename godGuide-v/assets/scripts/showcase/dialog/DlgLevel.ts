import DialogBase from "../../common/cmpt/base/DialogBase";
import Layer from "../../common/cmpt/base/Layer";
import { DirUrl, ResUrl } from "../../common/const/Url";
import GlobalInfo from "../../common/runtime/GlobalInfo";
import UserInfo from "../../common/runtime/UserInfo";
import Events from "../../common/util/Events";

const { ccclass, property, menu } = cc._decorator;

@ccclass
export default class DlgLevel extends DialogBase {
    public static pUrl: string = DirUrl.PREFAB_DIALOG + "DlgLevel";

    protected onLoad() {
        super.onLoad();
        Events.targetOn(this);
    }

    protected onDestroy() {
        Events.targetOff(this);
    }

    protected update() { }

    /**
     * @override
     */
    public onOpen() { }

}
