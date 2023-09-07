
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/const/Url.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjb25zdFxcVXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ1UsUUFBQSxNQUFNLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ0osR0FBRyxFQUFFLGdCQUFnQjtRQUNyQixJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLElBQUksRUFBRSxrQkFBa0I7S0FFM0I7SUFFRCxLQUFLLEVBQUU7UUFDSCxFQUFFLEVBQUUsc0NBQXNDO1FBQzFDLEVBQUUsRUFBRSxzQ0FBc0M7S0FDN0M7SUFFRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsWUFBWTtRQUNsQixJQUFJLEVBQUUsWUFBWTtRQUVsQixJQUFJLEVBQUUsWUFBWTtRQUNsQixJQUFJLEVBQUUsWUFBWTtRQUNsQixNQUFNLEVBQUUsYUFBYTtLQUN4QjtDQUNKLENBQUE7QUFFRDs7R0FFRztBQUNVLFFBQUEsTUFBTSxHQUFHO0lBQ2xCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLGFBQWEsRUFBRSxnQkFBZ0I7SUFFL0IsS0FBSyxFQUFFLFFBQVE7SUFFZixPQUFPLEVBQUUsV0FBVztJQUVwQixLQUFLLEVBQUUsUUFBUTtJQUVmLElBQUksRUFBRSxPQUFPO0lBRWIsU0FBUyxFQUFFLFlBQVk7Q0FDMUIsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDljZXkuKrotYTmupDot6/lvoRcclxuICovXHJcbmV4cG9ydCBjb25zdCBSZXNVcmwgPSB7XHJcbiAgICBQUkVGQUI6IHtcclxuICAgICAgICBUSVA6IFwicHJlZmFiL3RpcC9UaXBcIixcclxuICAgICAgICBIT01FOiBcInByZWZhYi9ob21lL0hvbWVcIixcclxuICAgICAgICBHQU1FOiBcInByZWZhYi9nYW1lL0dhbWVcIixcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIEFUTEFTOiB7XHJcbiAgICAgICAgRU46IFwidGV4dHVyZXMvbG9jYWxpemVkSW1hZ2UvZW4vQXV0b0F0bGFzXCIsXHJcbiAgICAgICAgWkg6IFwidGV4dHVyZXMvbG9jYWxpemVkSW1hZ2UvemgvQXV0b0F0bGFzXCJcclxuICAgIH0sXHJcblxyXG4gICAgQVVESU86IHtcclxuICAgICAgICBCR00xOiBcImF1ZGlvL2JnbTFcIixcclxuICAgICAgICBCR00yOiBcImF1ZGlvL2JnbTJcIixcclxuXHJcbiAgICAgICAgU0ZYMTogXCJhdWRpby9zZngxXCIsXHJcbiAgICAgICAgU0ZYMjogXCJhdWRpby9zZngyXCIsXHJcbiAgICAgICAgU0ZYX1VJOiBcImF1ZGlvL3NmeFVpXCIsXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmlofku7blpLnot6/lvoRcclxuICovXHJcbmV4cG9ydCBjb25zdCBEaXJVcmwgPSB7XHJcbiAgICBQUkVGQUI6IFwicHJlZmFiL1wiLFxyXG4gICAgUFJFRkFCX0RJQUxPRzogXCJwcmVmYWIvZGlhbG9nL1wiLFxyXG5cclxuICAgIEFUTEFTOiBcImF0bGFzL1wiLFxyXG5cclxuICAgIFRFWFRVUkU6IFwidGV4dHVyZXMvXCIsXHJcblxyXG4gICAgQVVESU86IFwiYXVkaW8vXCIsXHJcblxyXG4gICAgSlNPTjogXCJqc29uL1wiLFxyXG5cclxuICAgIEFOSU1BVElPTjogXCJhbmltYXRpb24vXCIsXHJcbn1cclxuIl19