
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/Res.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e6bb4ug0+BII76RLebcZhXt', 'Res');
// scripts/common/util/Res.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/** asset bundle路径校验 */
var BUNDLE_CHECK = "ab:";
/**
 * 资源管理类
 *
 * 资源加载:
 * 1. 如果加载resources内的资源，直接写明resources内的路径即可
 * 2. 如果加载路径以ab:开头，则会加载对应bundle内的资源。例：ab:bundleA/xxx/a表示bundle名为bundleA，资源路径为xxx/a
 *
 * 引用计数管理：
 * 1. 尽量使用此类的接口加载所有资源、instantiate节点实例，否则需要自行管理引用计数
 * 2. Res.instantiate不要对动态生成的节点使用，尽量只instantiate prefab上预设好的节点，否则有可能会导致引用计数的管理出错
 * 3. 调用load接口时如需传入release参数，则同一资源在全局调用load时release参数尽量保持一致，否则可能不符合预期
 * 4. 请使用ResSpine、ResSprite组件去动态加载spine、图片资源，否则需要自行管理这些资源的引用计数
 */
var Res = /** @class */ (function () {
    function Res() {
    }
    /**
     * 资源路径解析
     * @param url
     */
    Res.parseUrl = function (url) {
        if (url.startsWith(BUNDLE_CHECK)) {
            var loadUrl = url.substring(BUNDLE_CHECK.length);
            var idx = loadUrl.indexOf("/");
            var bundle = loadUrl.substring(0, idx);
            loadUrl = loadUrl.substring(idx + 1);
            return { bundle: bundle, loadUrl: loadUrl };
        }
        else {
            return { loadUrl: url };
        }
    };
    /**
     * 通过节点或预制查找已缓存prefab路径
     * @param target
     */
    Res.getCachePrefabUrl = function (target) {
        var url = "";
        if (target instanceof cc.Node) {
            var cur = target;
            while (cur) {
                if (cur["_prefab"] && cur["_prefab"]["root"]) {
                    url = this._nodePath.get(cur["_prefab"]["root"]) || "";
                    if (url) {
                        break;
                    }
                }
                cur = cur.parent;
            }
        }
        else if (target instanceof cc.Prefab) {
            url = this._prefabPath.get(target) || "";
        }
        return url;
    };
    /**
     * 缓存资源
     * @param url 资源路径
     * @param asset 资源
     * @param release 资源是否需要释放
     */
    Res.cacheAsset = function (url, asset, release) {
        var _this = this;
        if (release === void 0) { release = true; }
        if (!asset) {
            return;
        }
        var func = function (map) {
            if (map.has(url)) {
                return;
            }
            asset.addRef();
            if (asset instanceof cc.Prefab) {
                _this._prefabPath.set(asset, url);
            }
            var cacheData = {
                asset: asset,
                release: release,
                lastLoadTime: Date.now() / 1000
            };
            map.set(url, cacheData);
        };
        if (asset instanceof cc.Prefab) {
            func(this._prefabCache);
        }
        else if (asset instanceof cc.SpriteFrame) {
            func(this._spriteFrameCache);
        }
        else if (asset instanceof cc.SpriteAtlas) {
            func(this._spriteAtlasCache);
        }
        else if (asset instanceof sp.SkeletonData) {
            func(this._skeletonDataCache);
        }
        else {
            if (this._otherCache.has(url)) {
                return;
            }
            asset.addRef();
            this._otherCache.set(url, asset);
        }
    };
    /**
     * 获取缓存资源。通常不应直接调用此接口，除非调用前能确保资源已加载并且能自行管理引用计数
     * @param url 资源路径
     * @param type 资源类型
     */
    Res.get = function (url, type) {
        var asset = null;
        var func = function (map) {
            var data = map.get(url);
            if (data) {
                asset = data.asset;
                data.lastLoadTime = Date.now() / 1000;
            }
        };
        if (type === cc.Prefab) {
            func(this._prefabCache);
        }
        else if (type === cc.SpriteFrame) {
            func(this._spriteFrameCache);
        }
        else if (type === cc.SpriteAtlas) {
            func(this._spriteAtlasCache);
        }
        else if (type === sp.SkeletonData) {
            func(this._skeletonDataCache);
        }
        else {
            asset = this._otherCache.get(url);
        }
        return asset;
    };
    /**
     * 加载bundle
     * @param nameOrUrl bundle路径
     */
    Res.loadBundle = function (nameOrUrl) {
        return new Promise(function (resolve, reject) {
            cc.assetManager.loadBundle(nameOrUrl, function (error, bundle) {
                if (error) {
                    cc.error("[Res.loadBundle] error: " + error);
                    resolve(null);
                }
                else {
                    resolve(bundle);
                }
            });
        });
    };
    /**
     * 加载单个资源
     * @param url 资源路径
     * @param type 资源类型
     * @param release 资源是否需要释放
     */
    Res.load = function (url, type, release) {
        if (release === void 0) { release = true; }
        return __awaiter(this, void 0, Promise, function () {
            var asset, parseData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!url) {
                            cc.error("[Res.load] url is empty");
                            return [2 /*return*/, null];
                        }
                        asset = this.get(url, type);
                        if (asset) {
                            return [2 /*return*/, asset];
                        }
                        parseData = this.parseUrl(url);
                        if (!(parseData.bundle && !cc.assetManager.getBundle(parseData.bundle))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadBundle(parseData.bundle)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var bundle = parseData.bundle ? cc.assetManager.getBundle(parseData.bundle) : cc.resources;
                            if (!bundle) {
                                cc.error("[Res.load] cant find bundle: " + url);
                                resolve(null);
                                return;
                            }
                            bundle.load(parseData.loadUrl, type, function (error, resource) {
                                if (error) {
                                    cc.error("[Res.load] load error: " + error);
                                    resolve(null);
                                }
                                else {
                                    _this.cacheAsset(url, resource, release);
                                    resolve(resource);
                                }
                            });
                        })];
                    case 3:
                        asset = _a.sent();
                        return [2 /*return*/, asset];
                }
            });
        });
    };
    /**
     * 加载某个文件夹内的某类资源
     * @param url 资源路径
     * @param type 资源类型
     * @param release 资源是否需要释放
     */
    Res.loadDir = function (url, type, release) {
        if (release === void 0) { release = true; }
        return __awaiter(this, void 0, Promise, function () {
            var parseData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!url) {
                            cc.error("[Res.load] url is empty");
                            return [2 /*return*/, []];
                        }
                        parseData = this.parseUrl(url);
                        if (!(parseData.bundle && !cc.assetManager.getBundle(parseData.bundle))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadBundle(parseData.bundle)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            var bundle = parseData.bundle ? cc.assetManager.getBundle(parseData.bundle) : cc.resources;
                            if (!bundle) {
                                cc.error("[Res.loadDir] cant find bundle: " + url);
                                resolve([]);
                                return;
                            }
                            bundle.loadDir(parseData.loadUrl, type, function (error, resource) {
                                if (error) {
                                    cc.error("[Res.loadDir] load error: " + error);
                                    resolve([]);
                                }
                                else {
                                    var infos_1 = bundle.getDirWithPath(url, type);
                                    resource.forEach(function (asset, i) { _this.cacheAsset(infos_1[i].path, asset, release); });
                                    resolve(resource);
                                }
                            });
                        })];
                }
            });
        });
    };
    /**
     * 获取节点实例，并建立新节点与prefab资源的联系
     * @param original 用于实例化节点的prefab或node
     * @param related 如果original不是动态加载的prefab，则需传入与original相关联的动态加载的prefab或node，以便资源释放的管理
     * @example
     * // 1.original为动态加载的prefab，无需传related参数
     * Res.instantiate(original)
     *
     * // 2.aPrefab为动态加载的prefab，aNode为aPrefab的实例节点（aNode = Res.instantiate(aPrefab)），original为被aPrefab静态引用的prefab，则调用时需要用如下方式才能保证引用关系正确
     * Res.instantiate(original, aPrefab)
     * Res.instantiate(original, aNode)
     *
     * // 3.aPrefab为动态加载的prefab，aNode为aPrefab的实例节点（aNode = Res.instantiate(aPrefab)），original为aNode的某个子节点，则如下方式均可保证引用关系正确
     * Res.instantiate(original)
     * Res.instantiate(original, aPrefab)
     * Res.instantiate(original, aNode)
     */
    Res.instantiate = function (original, related) {
        if (!original) {
            cc.error("[Res.instantiate] original is null");
            return null;
        }
        var node = cc.instantiate(original);
        var url = this.getCachePrefabUrl(related) || this.getCachePrefabUrl(original);
        if (url) {
            var cacheData = this._prefabCache.get(url);
            // release为true才缓存关联节点
            if (cacheData && cacheData.release) {
                if (!Array.isArray(cacheData.nodes)) {
                    cacheData.nodes = [];
                }
                cacheData.nodes.push(node);
                this._nodePath.set(node, url);
            }
        }
        return node;
    };
    /**
     * 尝试释放所有缓存资源
     * - 只要遵守本文件的规则注释，此接口不会导致正在被使用的资源被引擎释放，可放心使用
     */
    Res.releaseAll = function () {
        var _this = this;
        var nowSec = Date.now() / 1000;
        // prefab
        this._prefabCache.forEach(function (cacheData, url) {
            if (!cacheData.release || nowSec - cacheData.lastLoadTime < _this.releaseSec) {
                return;
            }
            if (Array.isArray(cacheData.nodes)) {
                for (var i = cacheData.nodes.length - 1; i >= 0; i--) {
                    var node = cacheData.nodes[i];
                    if (node.isValid) {
                        continue;
                    }
                    _this._nodePath.delete(node);
                    cacheData.nodes.splice(i, 1);
                }
                if (cacheData.nodes.length === 0) {
                    delete cacheData.nodes;
                }
            }
            if (!Array.isArray(cacheData.nodes)) {
                cacheData.asset.decRef();
                _this._prefabPath.delete(cacheData.asset);
                _this._prefabCache.delete(url);
            }
        });
        // spriteFrame、spriteAtlas、skeletonData
        var arr = [this._spriteFrameCache, this._spriteAtlasCache, this._skeletonDataCache];
        arr.forEach(function (map) {
            map.forEach(function (cacheData, url) {
                if (!cacheData.release || nowSec - cacheData.lastLoadTime < _this.releaseSec) {
                    return;
                }
                cacheData.asset.decRef();
                map.delete(url);
            });
        });
        // other
    };
    /**
     * 获取resources包内资源打包后的真实路径
     * @param url resources下的资源路径
     * @param ext 资源的后缀名
     * @param isNative true:返回打包后native目录下的路径，false:返回打包后import目录下的路径
     */
    Res.getNativeUrlByResources = function (url, ext, isNative) {
        if (isNative === void 0) { isNative = true; }
        try {
            var nativeUrl = cc.assetManager["_transform"]({ path: url, bundle: cc.AssetManager.BuiltinBundleName.RESOURCES, __isNative__: isNative, ext: ext });
            return nativeUrl;
        }
        catch (error) {
            cc.error("[Res.getNativeUrlByResources] error url: " + url);
            return "";
        }
    };
    /** 节点与其关联的prefab路径 */
    Res._nodePath = new Map();
    /** prefab资源与路径 */
    Res._prefabPath = new Map();
    Res._prefabCache = new Map();
    Res._spriteFrameCache = new Map();
    Res._spriteAtlasCache = new Map();
    Res._skeletonDataCache = new Map();
    Res._otherCache = new Map();
    /** 资源释放的间隔时间（秒），资源超过此间隔未被load才可释放 */
    Res.releaseSec = 0;
    return Res;
}());
exports.default = Res;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxSZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSx1QkFBdUI7QUFDdkIsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBRTNCOzs7Ozs7Ozs7Ozs7R0FZRztBQUNIO0lBQUE7SUFzVUEsQ0FBQztJQXZURzs7O09BR0c7SUFDWSxZQUFRLEdBQXZCLFVBQXdCLEdBQVc7UUFDL0IsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzlCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztTQUMvQzthQUFNO1lBQ0gsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDWSxxQkFBaUIsR0FBaEMsVUFBaUMsTUFBMkI7UUFDeEQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxNQUFNLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRTtZQUMzQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDakIsT0FBTyxHQUFHLEVBQUU7Z0JBQ1IsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFD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QUNILFFBQVE7SUFDWixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVywyQkFBdUIsR0FBckMsVUFBc0MsR0FBVyxFQUFFLEdBQVcsRUFBRSxRQUF3QjtRQUF4Qix5QkFBQSxFQUFBLGVBQXdCO1FBQ3BGLElBQUk7WUFDQSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNwSixPQUFPLFNBQVMsQ0FBQztTQUNwQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osRUFBRSxDQUFDLEtBQUssQ0FBQyw4Q0FBNEMsR0FBSyxDQUFDLENBQUM7WUFDNUQsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNMLENBQUM7SUFwVUQsc0JBQXNCO0lBQ1AsYUFBUyxHQUF5QixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzNELGtCQUFrQjtJQUNILGVBQVcsR0FBMkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVoRCxnQkFBWSxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3ZELHFCQUFpQixHQUEyQixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3RELHFCQUFpQixHQUEyQixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3RELHNCQUFrQixHQUEyQixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3ZELGVBQVcsR0FBMEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUU5RCxxQ0FBcUM7SUFDdkIsY0FBVSxHQUFXLENBQUMsQ0FBQztJQXlUekMsVUFBQztDQXRVRCxBQXNVQyxJQUFBO2tCQXRVb0IsR0FBRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiDotYTmupDnvJPlrZjln7rnoYDmlbDmja7nu5PmnoQgKi9cclxuaW50ZXJmYWNlIENhY2hlRGF0YSB7XHJcbiAgICBhc3NldDogY2MuQXNzZXQsXHJcbiAgICAvKiog6LWE5rqQ5piv5ZCm6ZyA6KaB6YeK5pS+ICovXHJcbiAgICByZWxlYXNlOiBib29sZWFuLFxyXG4gICAgLyoqIOi1hOa6kOacgOWQjuS4gOasoeiiq+WKoOi9veeahOaXtumXtOeCue+8iOenku+8iSAqL1xyXG4gICAgbGFzdExvYWRUaW1lOiBudW1iZXIsXHJcbn1cclxuXHJcbi8qKiDpooTliLbkvZPotYTmupDnvJPlrZjmlbDmja4gKi9cclxuaW50ZXJmYWNlIFByZWZhYkNhY2hlRGF0YSBleHRlbmRzIENhY2hlRGF0YSB7XHJcbiAgICAvKiog5q2kcHJlZmFi5YWz6IGU55qE5a6e5L6L6IqC54K5ICovXHJcbiAgICBub2Rlcz86IGNjLk5vZGVbXSxcclxufVxyXG5cclxuLyoqIGFzc2V0IGJ1bmRsZei3r+W+hOagoemqjCAqL1xyXG5jb25zdCBCVU5ETEVfQ0hFQ0sgPSBcImFiOlwiO1xyXG5cclxuLyoqXHJcbiAqIOi1hOa6kOeuoeeQhuexu1xyXG4gKiBcclxuICog6LWE5rqQ5Yqg6L29OlxyXG4gKiAxLiDlpoLmnpzliqDovb1yZXNvdXJjZXPlhoXnmoTotYTmupDvvIznm7TmjqXlhpnmmI5yZXNvdXJjZXPlhoXnmoTot6/lvoTljbPlj69cclxuICogMi4g5aaC5p6c5Yqg6L296Lev5b6E5LulYWI65byA5aS077yM5YiZ5Lya5Yqg6L295a+55bqUYnVuZGxl5YaF55qE6LWE5rqQ44CC5L6L77yaYWI6YnVuZGxlQS94eHgvYeihqOekumJ1bmRsZeWQjeS4umJ1bmRsZUHvvIzotYTmupDot6/lvoTkuLp4eHgvYVxyXG4gKiBcclxuICog5byV55So6K6h5pWw566h55CG77yaXHJcbiAqIDEuIOWwvemHj+S9v+eUqOatpOexu+eahOaOpeWPo+WKoOi9veaJgOaciei1hOa6kOOAgWluc3RhbnRpYXRl6IqC54K55a6e5L6L77yM5ZCm5YiZ6ZyA6KaB6Ieq6KGM566h55CG5byV55So6K6h5pWwXHJcbiAqIDIuIFJlcy5pbnN0YW50aWF0ZeS4jeimgeWvueWKqOaAgeeUn+aIkOeahOiKgueCueS9v+eUqO+8jOWwvemHj+WPqmluc3RhbnRpYXRlIHByZWZhYuS4iumihOiuvuWlveeahOiKgueCue+8jOWQpuWImeacieWPr+iDveS8muWvvOiHtOW8leeUqOiuoeaVsOeahOeuoeeQhuWHuumUmVxyXG4gKiAzLiDosIPnlKhsb2Fk5o6l5Y+j5pe25aaC6ZyA5Lyg5YWlcmVsZWFzZeWPguaVsO+8jOWImeWQjOS4gOi1hOa6kOWcqOWFqOWxgOiwg+eUqGxvYWTml7ZyZWxlYXNl5Y+C5pWw5bC96YeP5L+d5oyB5LiA6Ie077yM5ZCm5YiZ5Y+v6IO95LiN56ym5ZCI6aKE5pyfXHJcbiAqIDQuIOivt+S9v+eUqFJlc1NwaW5l44CBUmVzU3ByaXRl57uE5Lu25Y675Yqo5oCB5Yqg6L29c3BpbmXjgIHlm77niYfotYTmupDvvIzlkKbliJnpnIDopoHoh6rooYznrqHnkIbov5nkupvotYTmupDnmoTlvJXnlKjorqHmlbBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcyB7XHJcbiAgICAvKiog6IqC54K55LiO5YW25YWz6IGU55qEcHJlZmFi6Lev5b6EICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbm9kZVBhdGg6IE1hcDxjYy5Ob2RlLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xyXG4gICAgLyoqIHByZWZhYui1hOa6kOS4jui3r+W+hCAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3ByZWZhYlBhdGg6IE1hcDxjYy5QcmVmYWIsIHN0cmluZz4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3ByZWZhYkNhY2hlOiBNYXA8c3RyaW5nLCBQcmVmYWJDYWNoZURhdGE+ID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3Nwcml0ZUZyYW1lQ2FjaGU6IE1hcDxzdHJpbmcsIENhY2hlRGF0YT4gPSBuZXcgTWFwKCk7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfc3ByaXRlQXRsYXNDYWNoZTogTWFwPHN0cmluZywgQ2FjaGVEYXRhPiA9IG5ldyBNYXAoKTtcclxuICAgIHByaXZhdGUgc3RhdGljIF9za2VsZXRvbkRhdGFDYWNoZTogTWFwPHN0cmluZywgQ2FjaGVEYXRhPiA9IG5ldyBNYXAoKTtcclxuICAgIHByaXZhdGUgc3RhdGljIF9vdGhlckNhY2hlOiBNYXA8c3RyaW5nLCBjYy5Bc3NldD4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgLyoqIOi1hOa6kOmHiuaUvueahOmXtOmalOaXtumXtO+8iOenku+8ie+8jOi1hOa6kOi2hei/h+atpOmXtOmalOacquiiq2xvYWTmiY3lj6/ph4rmlL4gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVsZWFzZVNlYzogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi1hOa6kOi3r+W+hOino+aekFxyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFyc2VVcmwodXJsOiBzdHJpbmcpOiB7IGJ1bmRsZT86IHN0cmluZywgbG9hZFVybDogc3RyaW5nIH0ge1xyXG4gICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aChCVU5ETEVfQ0hFQ0spKSB7XHJcbiAgICAgICAgICAgIGxldCBsb2FkVXJsID0gdXJsLnN1YnN0cmluZyhCVU5ETEVfQ0hFQ0subGVuZ3RoKTtcclxuICAgICAgICAgICAgbGV0IGlkeCA9IGxvYWRVcmwuaW5kZXhPZihcIi9cIik7XHJcbiAgICAgICAgICAgIGxldCBidW5kbGUgPSBsb2FkVXJsLnN1YnN0cmluZygwLCBpZHgpO1xyXG4gICAgICAgICAgICBsb2FkVXJsID0gbG9hZFVybC5zdWJzdHJpbmcoaWR4ICsgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGJ1bmRsZTogYnVuZGxlLCBsb2FkVXJsOiBsb2FkVXJsIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbG9hZFVybDogdXJsIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H6IqC54K55oiW6aKE5Yi25p+l5om+5bey57yT5a2YcHJlZmFi6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRDYWNoZVByZWZhYlVybCh0YXJnZXQ6IGNjLk5vZGUgfCBjYy5QcmVmYWIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1cmwgPSBcIlwiO1xyXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXIgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHdoaWxlIChjdXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJbXCJfcHJlZmFiXCJdICYmIGN1cltcIl9wcmVmYWJcIl1bXCJyb290XCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gdGhpcy5fbm9kZVBhdGguZ2V0KGN1cltcIl9wcmVmYWJcIl1bXCJyb290XCJdKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VyID0gY3VyLnBhcmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgY2MuUHJlZmFiKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHRoaXMuX3ByZWZhYlBhdGguZ2V0KHRhcmdldCkgfHwgXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8k+WtmOi1hOa6kFxyXG4gICAgICogQHBhcmFtIHVybCDotYTmupDot6/lvoRcclxuICAgICAqIEBwYXJhbSBhc3NldCDotYTmupBcclxuICAgICAqIEBwYXJhbSByZWxlYXNlIOi1hOa6kOaYr+WQpumcgOimgemHiuaUvlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjYWNoZUFzc2V0KHVybDogc3RyaW5nLCBhc3NldDogY2MuQXNzZXQsIHJlbGVhc2U6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFhc3NldCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZnVuYyA9IChtYXA6IE1hcDxzdHJpbmcsIENhY2hlRGF0YT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKG1hcC5oYXModXJsKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFzc2V0LmFkZFJlZigpO1xyXG4gICAgICAgICAgICBpZiAoYXNzZXQgaW5zdGFuY2VvZiBjYy5QcmVmYWIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZWZhYlBhdGguc2V0KGFzc2V0LCB1cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjYWNoZURhdGE6IENhY2hlRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGFzc2V0OiBhc3NldCxcclxuICAgICAgICAgICAgICAgIHJlbGVhc2U6IHJlbGVhc2UsXHJcbiAgICAgICAgICAgICAgICBsYXN0TG9hZFRpbWU6IERhdGUubm93KCkgLyAxMDAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1hcC5zZXQodXJsLCBjYWNoZURhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChhc3NldCBpbnN0YW5jZW9mIGNjLlByZWZhYikge1xyXG4gICAgICAgICAgICBmdW5jKHRoaXMuX3ByZWZhYkNhY2hlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFzc2V0IGluc3RhbmNlb2YgY2MuU3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgZnVuYyh0aGlzLl9zcHJpdGVGcmFtZUNhY2hlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFzc2V0IGluc3RhbmNlb2YgY2MuU3ByaXRlQXRsYXMpIHtcclxuICAgICAgICAgICAgZnVuYyh0aGlzLl9zcHJpdGVBdGxhc0NhY2hlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFzc2V0IGluc3RhbmNlb2Ygc3AuU2tlbGV0b25EYXRhKSB7XHJcbiAgICAgICAgICAgIGZ1bmModGhpcy5fc2tlbGV0b25EYXRhQ2FjaGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vdGhlckNhY2hlLmhhcyh1cmwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXNzZXQuYWRkUmVmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX290aGVyQ2FjaGUuc2V0KHVybCwgYXNzZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlue8k+WtmOi1hOa6kOOAgumAmuW4uOS4jeW6lOebtOaOpeiwg+eUqOatpOaOpeWPo++8jOmZpOmdnuiwg+eUqOWJjeiDveehruS/nei1hOa6kOW3suWKoOi9veW5tuS4lOiDveiHquihjOeuoeeQhuW8leeUqOiuoeaVsFxyXG4gICAgICogQHBhcmFtIHVybCDotYTmupDot6/lvoRcclxuICAgICAqIEBwYXJhbSB0eXBlIOi1hOa6kOexu+Wei1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHVybDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgbGV0IGFzc2V0OiB1bmtub3duID0gbnVsbDtcclxuICAgICAgICBsZXQgZnVuYyA9IChtYXA6IE1hcDxzdHJpbmcsIENhY2hlRGF0YT4pID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBtYXAuZ2V0KHVybCk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBhc3NldCA9IGRhdGEuYXNzZXQ7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmxhc3RMb2FkVGltZSA9IERhdGUubm93KCkgLyAxMDAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGNjLlByZWZhYikge1xyXG4gICAgICAgICAgICBmdW5jKHRoaXMuX3ByZWZhYkNhY2hlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IGNjLlNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgIGZ1bmModGhpcy5fc3ByaXRlRnJhbWVDYWNoZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBjYy5TcHJpdGVBdGxhcykge1xyXG4gICAgICAgICAgICBmdW5jKHRoaXMuX3Nwcml0ZUF0bGFzQ2FjaGUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gc3AuU2tlbGV0b25EYXRhKSB7XHJcbiAgICAgICAgICAgIGZ1bmModGhpcy5fc2tlbGV0b25EYXRhQ2FjaGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFzc2V0ID0gdGhpcy5fb3RoZXJDYWNoZS5nZXQodXJsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhc3NldCBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L29YnVuZGxlXHJcbiAgICAgKiBAcGFyYW0gbmFtZU9yVXJsIGJ1bmRsZei3r+W+hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRCdW5kbGUobmFtZU9yVXJsOiBzdHJpbmcpOiBQcm9taXNlPGNjLkFzc2V0TWFuYWdlci5CdW5kbGU+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEJ1bmRsZShuYW1lT3JVcmwsIChlcnJvcjogRXJyb3IsIGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoYFtSZXMubG9hZEJ1bmRsZV0gZXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShidW5kbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWNleS4qui1hOa6kFxyXG4gICAgICogQHBhcmFtIHVybCDotYTmupDot6/lvoRcclxuICAgICAqIEBwYXJhbSB0eXBlIOi1hOa6kOexu+Wei1xyXG4gICAgICogQHBhcmFtIHJlbGVhc2Ug6LWE5rqQ5piv5ZCm6ZyA6KaB6YeK5pS+XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9hZDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHVybDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIHJlbGVhc2U6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxUIHwgbnVsbD4ge1xyXG4gICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGBbUmVzLmxvYWRdIHVybCBpcyBlbXB0eWApO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhc3NldDogVCA9IHRoaXMuZ2V0KHVybCwgdHlwZSk7XHJcbiAgICAgICAgaWYgKGFzc2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhc3NldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJzZURhdGEgPSB0aGlzLnBhcnNlVXJsKHVybCk7XHJcbiAgICAgICAgaWYgKHBhcnNlRGF0YS5idW5kbGUgJiYgIWNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGUocGFyc2VEYXRhLmJ1bmRsZSkpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkQnVuZGxlKHBhcnNlRGF0YS5idW5kbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXNzZXQgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUgPSBwYXJzZURhdGEuYnVuZGxlID8gY2MuYXNzZXRNYW5hZ2VyLmdldEJ1bmRsZShwYXJzZURhdGEuYnVuZGxlKSA6IGNjLnJlc291cmNlcztcclxuICAgICAgICAgICAgaWYgKCFidW5kbGUpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKGBbUmVzLmxvYWRdIGNhbnQgZmluZCBidW5kbGU6ICR7dXJsfWApO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnVuZGxlLmxvYWQocGFyc2VEYXRhLmxvYWRVcmwsIHR5cGUsIChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBUKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihgW1Jlcy5sb2FkXSBsb2FkIGVycm9yOiAke2Vycm9yfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVBc3NldCh1cmwsIHJlc291cmNlLCByZWxlYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFzc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295p+Q5Liq5paH5Lu25aS55YaF55qE5p+Q57G76LWE5rqQXHJcbiAgICAgKiBAcGFyYW0gdXJsIOi1hOa6kOi3r+W+hFxyXG4gICAgICogQHBhcmFtIHR5cGUg6LWE5rqQ57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gcmVsZWFzZSDotYTmupDmmK/lkKbpnIDopoHph4rmlL5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBsb2FkRGlyPFQgZXh0ZW5kcyBjYy5Bc3NldD4odXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgcmVsZWFzZTogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPFRbXT4ge1xyXG4gICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGBbUmVzLmxvYWRdIHVybCBpcyBlbXB0eWApO1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyc2VEYXRhID0gdGhpcy5wYXJzZVVybCh1cmwpO1xyXG4gICAgICAgIGlmIChwYXJzZURhdGEuYnVuZGxlICYmICFjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKHBhcnNlRGF0YS5idW5kbGUpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEJ1bmRsZShwYXJzZURhdGEuYnVuZGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUgPSBwYXJzZURhdGEuYnVuZGxlID8gY2MuYXNzZXRNYW5hZ2VyLmdldEJ1bmRsZShwYXJzZURhdGEuYnVuZGxlKSA6IGNjLnJlc291cmNlcztcclxuICAgICAgICAgICAgaWYgKCFidW5kbGUpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKGBbUmVzLmxvYWREaXJdIGNhbnQgZmluZCBidW5kbGU6ICR7dXJsfWApO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJ1bmRsZS5sb2FkRGlyKHBhcnNlRGF0YS5sb2FkVXJsLCB0eXBlLCAoZXJyb3I6IEVycm9yLCByZXNvdXJjZTogVFtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihgW1Jlcy5sb2FkRGlyXSBsb2FkIGVycm9yOiAke2Vycm9yfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoW10pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5mb3MgPSBidW5kbGUuZ2V0RGlyV2l0aFBhdGgodXJsLCB0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5mb3JFYWNoKChhc3NldCwgaSkgPT4geyB0aGlzLmNhY2hlQXNzZXQoaW5mb3NbaV0ucGF0aCwgYXNzZXQsIHJlbGVhc2UpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5boioLngrnlrp7kvovvvIzlubblu7rnq4vmlrDoioLngrnkuI5wcmVmYWLotYTmupDnmoTogZTns7tcclxuICAgICAqIEBwYXJhbSBvcmlnaW5hbCDnlKjkuo7lrp7kvovljJboioLngrnnmoRwcmVmYWLmiJZub2RlXHJcbiAgICAgKiBAcGFyYW0gcmVsYXRlZCDlpoLmnpxvcmlnaW5hbOS4jeaYr+WKqOaAgeWKoOi9veeahHByZWZhYu+8jOWImemcgOS8oOWFpeS4jm9yaWdpbmFs55u45YWz6IGU55qE5Yqo5oCB5Yqg6L2955qEcHJlZmFi5oiWbm9kZe+8jOS7peS+v+i1hOa6kOmHiuaUvueahOeuoeeQhlxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiAvLyAxLm9yaWdpbmFs5Li65Yqo5oCB5Yqg6L2955qEcHJlZmFi77yM5peg6ZyA5LygcmVsYXRlZOWPguaVsFxyXG4gICAgICogUmVzLmluc3RhbnRpYXRlKG9yaWdpbmFsKVxyXG4gICAgICogXHJcbiAgICAgKiAvLyAyLmFQcmVmYWLkuLrliqjmgIHliqDovb3nmoRwcmVmYWLvvIxhTm9kZeS4umFQcmVmYWLnmoTlrp7kvovoioLngrnvvIhhTm9kZSA9IFJlcy5pbnN0YW50aWF0ZShhUHJlZmFiKe+8ie+8jG9yaWdpbmFs5Li66KKrYVByZWZhYumdmeaAgeW8leeUqOeahHByZWZhYu+8jOWImeiwg+eUqOaXtumcgOimgeeUqOWmguS4i+aWueW8j+aJjeiDveS/neivgeW8leeUqOWFs+ezu+ato+ehrlxyXG4gICAgICogUmVzLmluc3RhbnRpYXRlKG9yaWdpbmFsLCBhUHJlZmFiKVxyXG4gICAgICogUmVzLmluc3RhbnRpYXRlKG9yaWdpbmFsLCBhTm9kZSlcclxuICAgICAqIFxyXG4gICAgICogLy8gMy5hUHJlZmFi5Li65Yqo5oCB5Yqg6L2955qEcHJlZmFi77yMYU5vZGXkuLphUHJlZmFi55qE5a6e5L6L6IqC54K577yIYU5vZGUgPSBSZXMuaW5zdGFudGlhdGUoYVByZWZhYinvvInvvIxvcmlnaW5hbOS4umFOb2Rl55qE5p+Q5Liq5a2Q6IqC54K577yM5YiZ5aaC5LiL5pa55byP5Z2H5Y+v5L+d6K+B5byV55So5YWz57O75q2j56GuXHJcbiAgICAgKiBSZXMuaW5zdGFudGlhdGUob3JpZ2luYWwpXHJcbiAgICAgKiBSZXMuaW5zdGFudGlhdGUob3JpZ2luYWwsIGFQcmVmYWIpXHJcbiAgICAgKiBSZXMuaW5zdGFudGlhdGUob3JpZ2luYWwsIGFOb2RlKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbnRpYXRlKG9yaWdpbmFsOiBjYy5Ob2RlIHwgY2MuUHJlZmFiLCByZWxhdGVkPzogY2MuTm9kZSB8IGNjLlByZWZhYik6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWwpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCJbUmVzLmluc3RhbnRpYXRlXSBvcmlnaW5hbCBpcyBudWxsXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUob3JpZ2luYWwpIGFzIGNjLk5vZGU7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2V0Q2FjaGVQcmVmYWJVcmwocmVsYXRlZCkgfHwgdGhpcy5nZXRDYWNoZVByZWZhYlVybChvcmlnaW5hbCk7XHJcbiAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICBsZXQgY2FjaGVEYXRhOiBQcmVmYWJDYWNoZURhdGEgPSB0aGlzLl9wcmVmYWJDYWNoZS5nZXQodXJsKTtcclxuICAgICAgICAgICAgLy8gcmVsZWFzZeS4unRydWXmiY3nvJPlrZjlhbPogZToioLngrlcclxuICAgICAgICAgICAgaWYgKGNhY2hlRGF0YSAmJiBjYWNoZURhdGEucmVsZWFzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNhY2hlRGF0YS5ub2RlcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZURhdGEubm9kZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhY2hlRGF0YS5ub2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9kZVBhdGguc2V0KG5vZGUsIHVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsJ3or5Xph4rmlL7miYDmnInnvJPlrZjotYTmupBcclxuICAgICAqIC0g5Y+q6KaB6YG15a6I5pys5paH5Lu255qE6KeE5YiZ5rOo6YeK77yM5q2k5o6l5Y+j5LiN5Lya5a+86Ie05q2j5Zyo6KKr5L2/55So55qE6LWE5rqQ6KKr5byV5pOO6YeK5pS+77yM5Y+v5pS+5b+D5L2/55SoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVsZWFzZUFsbCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbm93U2VjID0gRGF0ZS5ub3coKSAvIDEwMDA7XHJcbiAgICAgICAgLy8gcHJlZmFiXHJcbiAgICAgICAgdGhpcy5fcHJlZmFiQ2FjaGUuZm9yRWFjaCgoY2FjaGVEYXRhLCB1cmwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjYWNoZURhdGEucmVsZWFzZSB8fCBub3dTZWMgLSBjYWNoZURhdGEubGFzdExvYWRUaW1lIDwgdGhpcy5yZWxlYXNlU2VjKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNhY2hlRGF0YS5ub2RlcykpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBjYWNoZURhdGEubm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNhY2hlRGF0YS5ub2Rlc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub2RlUGF0aC5kZWxldGUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVEYXRhLm5vZGVzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjYWNoZURhdGEubm9kZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhY2hlRGF0YS5ub2RlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNhY2hlRGF0YS5ub2RlcykpIHtcclxuICAgICAgICAgICAgICAgIGNhY2hlRGF0YS5hc3NldC5kZWNSZWYoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZWZhYlBhdGguZGVsZXRlKGNhY2hlRGF0YS5hc3NldCBhcyBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlZmFiQ2FjaGUuZGVsZXRlKHVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBzcHJpdGVGcmFtZeOAgXNwcml0ZUF0bGFz44CBc2tlbGV0b25EYXRhXHJcbiAgICAgICAgbGV0IGFyciA9IFt0aGlzLl9zcHJpdGVGcmFtZUNhY2hlLCB0aGlzLl9zcHJpdGVBdGxhc0NhY2hlLCB0aGlzLl9za2VsZXRvbkRhdGFDYWNoZV07XHJcbiAgICAgICAgYXJyLmZvckVhY2goKG1hcCkgPT4ge1xyXG4gICAgICAgICAgICBtYXAuZm9yRWFjaCgoY2FjaGVEYXRhLCB1cmwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghY2FjaGVEYXRhLnJlbGVhc2UgfHwgbm93U2VjIC0gY2FjaGVEYXRhLmxhc3RMb2FkVGltZSA8IHRoaXMucmVsZWFzZVNlYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhY2hlRGF0YS5hc3NldC5kZWNSZWYoKTtcclxuICAgICAgICAgICAgICAgIG1hcC5kZWxldGUodXJsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gb3RoZXJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlnJlc291cmNlc+WMheWGhei1hOa6kOaJk+WMheWQjueahOecn+Wunui3r+W+hFxyXG4gICAgICogQHBhcmFtIHVybCByZXNvdXJjZXPkuIvnmoTotYTmupDot6/lvoRcclxuICAgICAqIEBwYXJhbSBleHQg6LWE5rqQ55qE5ZCO57yA5ZCNXHJcbiAgICAgKiBAcGFyYW0gaXNOYXRpdmUgdHJ1ZTrov5Tlm57miZPljIXlkI5uYXRpdmXnm67lvZXkuIvnmoTot6/lvoTvvIxmYWxzZTrov5Tlm57miZPljIXlkI5pbXBvcnTnm67lvZXkuIvnmoTot6/lvoRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXROYXRpdmVVcmxCeVJlc291cmNlcyh1cmw6IHN0cmluZywgZXh0OiBzdHJpbmcsIGlzTmF0aXZlOiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IG5hdGl2ZVVybCA9IGNjLmFzc2V0TWFuYWdlcltcIl90cmFuc2Zvcm1cIl0oeyBwYXRoOiB1cmwsIGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1aWx0aW5CdW5kbGVOYW1lLlJFU09VUkNFUywgX19pc05hdGl2ZV9fOiBpc05hdGl2ZSwgZXh0OiBleHQgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmVVcmw7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoYFtSZXMuZ2V0TmF0aXZlVXJsQnlSZXNvdXJjZXNdIGVycm9yIHVybDogJHt1cmx9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=