import DialogBase from "../../common/cmpt/base/DialogBase";
import Layer from "../../common/cmpt/base/Layer";
import { EventName } from "../../common/const/EventName";
import { DirUrl } from "../../common/const/Url";
import UserInfo, { UserInfoStorge } from "../../common/runtime/UserInfo";
import Events from "../../common/util/Events";
import Tool from "../../common/util/Tool";

const { ccclass, property, menu } = cc._decorator;

@ccclass
export default class DlgStore extends DialogBase {
    public static pUrl: string = DirUrl.PREFAB_DIALOG + "DlgStore";

    protected onLoad() {
        super.onLoad();
        Events.targetOn(this);
    }

    protected onDestroy() {
        Events.targetOff(this);
    }

    /**
     * @override
     */
    public onOpen() { }

}
