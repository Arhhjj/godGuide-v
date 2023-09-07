"use strict";
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