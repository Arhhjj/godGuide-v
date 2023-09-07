"use strict";
cc._RF.push(module, 'a8f33QbcWNMTZ0PfOQy5Uvh', 'Url');
// scripts/common/const/Url.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirUrl = exports.ResUrl = void 0;
/**
 * 单个资源路径
 */
exports.ResUrl = {
    PREFAB: {
        TIP: "prefab/tip/Tip",
        HOME: "prefab/home/Home",
        GAME: "prefab/game/Game",
    },
    ATLAS: {
        EN: "textures/localizedImage/en/AutoAtlas",
        ZH: "textures/localizedImage/zh/AutoAtlas"
    },
    AUDIO: {
        BGM1: "audio/bgm1",
        BGM2: "audio/bgm2",
        SFX1: "audio/sfx1",
        SFX2: "audio/sfx2",
        SFX_UI: "audio/sfxUi",
    }
};
/**
 * 文件夹路径
 */
exports.DirUrl = {
    PREFAB: "prefab/",
    PREFAB_DIALOG: "prefab/dialog/",
    ATLAS: "atlas/",
    TEXTURE: "textures/",
    AUDIO: "audio/",
    JSON: "json/",
    ANIMATION: "animation/",
};

cc._RF.pop();