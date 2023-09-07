import Layer from "../../common/cmpt/base/Layer";
import { DirUrl } from "../../common/const/Url";
import UserInfo, { UserInfoStorge } from "../../common/runtime/UserInfo";
import Res from "../../common/util/Res";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    onLoad() {
        UserInfo.instance.initUserInfo()
        // console.log = () => { } //置空log 不显示打印

        let userInfo = UserInfoStorge.getUserInfo()
        console.log(">>> 本地的UserInfo___> ", userInfo)

        if (!userInfo) //如果本地没有数据则储存数据在本地
            UserInfoStorge.setUserInfo()
        else //若本地已有数据则将UserInfo更新为已有的数据
            UserInfo.instance.setUserInfo(userInfo)
    }

    async start() {
        await this.initData()
        this.preloadScene()
    }

    enterMain() {
        Layer.inst.enterScene("Main")
    }

    preloadScene() {
        return new Promise<void>((reslove, reject) => {
            cc.director.preloadScene('Main', (completedCount, totalCount, item) => {
                const progress = completedCount / totalCount;
                console.log('预加载进度：', progress);
            }, (error) => {
                if (error) {
                    console.error('预加载Main场景资源失败：', error);
                } else {
                    console.log('预加载Main场景资源成功！');
                }
            });
        })
    }

    private async initData() {
        console.log(">>> initData__> 开始加载资源");

        const promises = [];

        // 添加各个资源加载函数返回的Promise对象到数组
        promises.push(Res.loadDir(DirUrl.TEXTURE, cc.SpriteFrame));
        promises.push(Res.loadDir(DirUrl.PREFAB, cc.Prefab));
        promises.push(Res.loadDir(DirUrl.AUDIO, cc.AudioClip));
        // promises.push(Res.loadDir(DirUrl.JSON, cc.JsonAsset));
        // promises.push(Res.loadDir(DirUrl.ANIMATION, cc.AnimationClip));

        try {
            await Promise.all(promises);
            console.log(">>> 资源加载完成");
        } catch (error) {
            console.error(">>> 资源加载失败：", error);
        }
    }


}
