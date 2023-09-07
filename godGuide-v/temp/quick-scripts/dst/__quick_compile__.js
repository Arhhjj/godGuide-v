
(function () {
var scripts = [{"deps":{"./assets/scripts/animator/AnimatorSpine":5,"./assets/scripts/animator/AnimatorSpineSecondary":18,"./assets/scripts/animator/AnimatorAnimation":23,"./assets/scripts/animator/core/AnimatorParams":20,"./assets/scripts/animator/core/AnimatorCondition":1,"./assets/scripts/animator/core/AnimatorState":31,"./assets/scripts/animator/core/AnimatorController":19,"./assets/scripts/animator/core/AnimatorStateLogic":36,"./assets/scripts/animator/core/AnimatorTransition":22,"./assets/scripts/animator/core/AnimatorBase":25,"./assets/scripts/animator/AnimatorCustomization":37,"./assets/scripts/common/config/En":54,"./assets/scripts/common/const/Url":56,"./assets/scripts/common/const/EventName":12,"./assets/scripts/common/hack/EditorBoxHack":58,"./assets/scripts/common/hack/ButtonHack":14,"./assets/scripts/common/runtime/UserInfo":15,"./assets/scripts/common/runtime/GlobalInfo":59,"./assets/scripts/common/runtime/EnumIndex":63,"./assets/scripts/common/util/Behavior3":62,"./assets/scripts/common/util/Decorator":16,"./assets/scripts/common/util/EditorTool":65,"./assets/scripts/common/util/Events":60,"./assets/scripts/common/util/I18n":61,"./assets/scripts/common/util/PhysicsController":64,"./assets/scripts/common/util/Random":68,"./assets/scripts/common/util/RecyclePool":69,"./assets/scripts/common/util/Res":70,"./assets/scripts/common/util/Tool":71,"./assets/scripts/common/util/Tween":67,"./assets/scripts/common/util/AudioManager":72,"./assets/scripts/common/cmpt/base/Timer":28,"./assets/scripts/common/cmpt/base/Singleton":66,"./assets/scripts/common/cmpt/base/Tip":3,"./assets/scripts/common/cmpt/base/DialogBase":26,"./assets/scripts/common/cmpt/shader/ShaderShining":6,"./assets/scripts/common/cmpt/shader/ShaderFill":33,"./assets/scripts/common/cmpt/shader/ShaderTile":29,"./assets/scripts/common/cmpt/shader/ShaderOutline":27,"./assets/scripts/common/cmpt/ui/ShakeNode":30,"./assets/scripts/common/cmpt/ui/CountdownLabel":32,"./assets/scripts/common/cmpt/ui/adapt/AdaptSize":7,"./assets/scripts/common/cmpt/ui/adapt/AdaptCanvas":35,"./assets/scripts/common/cmpt/ui/animValue/AnimValue":39,"./assets/scripts/common/cmpt/ui/animValue/AnimValueProgress":34,"./assets/scripts/common/cmpt/ui/animValue/AnimValueProgressHP":38,"./assets/scripts/common/cmpt/ui/animValue/AnimValueLabel":4,"./assets/scripts/common/cmpt/ui/button/ButtonChildGray":41,"./assets/scripts/common/cmpt/ui/button/ButtonSingle":8,"./assets/scripts/common/cmpt/ui/button/ButtonChildPos":40,"./assets/scripts/common/cmpt/ui/i18n/I18nSprite":44,"./assets/scripts/common/cmpt/ui/i18n/I18nLabel":9,"./assets/scripts/common/cmpt/ui/multiTexture/MultiTextureManager":47,"./assets/scripts/common/cmpt/ui/multiTexture/MultiSprite":45,"./assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerRadialFilled":42,"./assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerBarFilled":2,"./assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerSimple":43,"./assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerSliced":46,"./assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerTiled":48,"./assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssembler":50,"./assets/scripts/common/cmpt/ui/res/ResSprite":49,"./assets/scripts/common/cmpt/ui/res/ResSpine":10,"./assets/scripts/common/cmpt/ui/scrollList/CircleList":11,"./assets/scripts/common/cmpt/ui/scrollList/VirtualItem":57,"./assets/scripts/common/cmpt/ui/scrollList/VirtualList":51,"./assets/scripts/common/cmpt/ui/scrollList/VirtualLayout":55,"./assets/scripts/common/cmpt/ui/scrollList/LoopList":53,"./assets/scripts/common/cmpt/base/Layer":52,"./assets/scripts/common/config/Zh":13,"./assets/scripts/showcase/dialog/DlgStore":76,"./assets/scripts/showcase/dialog/DlgLevel":73,"./assets/scripts/showcase/dialog/DlgRole":74,"./assets/scripts/showcase/home/Home":77,"./assets/scripts/showcase/game/Game":17,"./assets/scripts/showcase/home/guide/GuideFinger":90,"./assets/scripts/showcase/home/guide/GodGuide":83,"./assets/scripts/showcase/home/guide/task/GuideTaskIndex":87,"./assets/scripts/showcase/home/guide/task/GuideTask1":86,"./assets/scripts/showcase/home/guide/task/GuideTask2":88,"./assets/scripts/showcase/home/main/BarrierManager":79,"./assets/scripts/showcase/home/main/GameController":80,"./assets/scripts/showcase/home/main/MoveCtr":82,"./assets/scripts/showcase/home/main/Barrier":81,"./assets/scripts/showcase/scenes/Main":21,"./assets/scripts/showcase/scenes/Loading":78,"./assets/scripts/showcase/dialog/DlgSign":75,"./assets/scripts/animator/AnimatorDragonBones":24},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/scripts/animator/core/AnimatorCondition.js"},{"deps":{"./MultiAssembler":50},"path":"preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerBarFilled.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/cmpt/base/Tip.js"},{"deps":{"./AnimValue":39},"path":"preview-scripts/assets/scripts/common/cmpt/ui/animValue/AnimValueLabel.js"},{"deps":{"./core/AnimatorBase":25},"path":"preview-scripts/assets/scripts/animator/AnimatorSpine.js"},{"deps":{"../base/Timer":28},"path":"preview-scripts/assets/scripts/common/cmpt/shader/ShaderShining.js"},{"deps":{"../../../const/EventName":12,"../../../util/Events":60},"path":"preview-scripts/assets/scripts/common/cmpt/ui/adapt/AdaptSize.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/cmpt/ui/button/ButtonSingle.js"},{"deps":{"../../../util/Events":60,"../../../util/I18n":61,"../../../const/EventName":12},"path":"preview-scripts/assets/scripts/common/cmpt/ui/i18n/I18nLabel.js"},{"deps":{"../../../util/Res":70},"path":"preview-scripts/assets/scripts/common/cmpt/ui/res/ResSpine.js"},{"deps":{"../../../util/Tool":71},"path":"preview-scripts/assets/scripts/common/cmpt/ui/scrollList/CircleList.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/const/EventName.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/config/Zh.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/hack/ButtonHack.js"},{"deps":{"../cmpt/base/Singleton":66},"path":"preview-scripts/assets/scripts/common/runtime/UserInfo.js"},{"deps":{"./Tool":71},"path":"preview-scripts/assets/scripts/common/util/Decorator.js"},{"deps":{},"path":"preview-scripts/assets/scripts/showcase/game/Game.js"},{"deps":{"./AnimatorSpine":5,"./core/AnimatorBase":25},"path":"preview-scripts/assets/scripts/animator/AnimatorSpineSecondary.js"},{"deps":{"./AnimatorParams":20,"./AnimatorState":31},"path":"preview-scripts/assets/scripts/animator/core/AnimatorController.js"},{"deps":{"./AnimatorCondition":1},"path":"preview-scripts/assets/scripts/animator/core/AnimatorParams.js"},{"deps":{"../../common/cmpt/base/Layer":52,"../../common/const/Url":56},"path":"preview-scripts/assets/scripts/showcase/scenes/Main.js"},{"deps":{"./AnimatorCondition":1},"path":"preview-scripts/assets/scripts/animator/core/AnimatorTransition.js"},{"deps":{"./core/AnimatorBase":25},"path":"preview-scripts/assets/scripts/animator/AnimatorAnimation.js"},{"deps":{"./core/AnimatorBase":25},"path":"preview-scripts/assets/scripts/animator/AnimatorDragonBones.js"},{"deps":{"./AnimatorController":19},"path":"preview-scripts/assets/scripts/animator/core/AnimatorBase.js"},{"deps":{"../../util/EditorTool":65,"../../util/Tool":71},"path":"preview-scripts/assets/scripts/common/cmpt/base/DialogBase.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/cmpt/shader/ShaderOutline.js"},{"deps":{"../../const/EventName":12,"../../util/Tween":67,"../../util/Events":60},"path":"preview-scripts/assets/scripts/common/cmpt/base/Timer.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/cmpt/shader/ShaderTile.js"},{"deps":{"../../util/Tween":67},"path":"preview-scripts/assets/scripts/common/cmpt/ui/ShakeNode.js"},{"deps":{"./AnimatorTransition":22},"path":"preview-scripts/assets/scripts/animator/core/AnimatorState.js"},{"deps":{"../../util/Tool":71,"../../util/Tween":67},"path":"preview-scripts/assets/scripts/common/cmpt/ui/CountdownLabel.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/cmpt/shader/ShaderFill.js"},{"deps":{"./AnimValue":39},"path":"preview-scripts/assets/scripts/common/cmpt/ui/animValue/AnimValueProgress.js"},{"deps":{"../../../const/EventName":12,"../../../util/Events":60},"path":"preview-scripts/assets/scripts/common/cmpt/ui/adapt/AdaptCanvas.js"},{"deps":{},"path":"preview-scripts/assets/scripts/animator/core/AnimatorStateLogic.js"},{"deps":{"./core/AnimatorBase":25},"path":"preview-scripts/assets/scripts/animator/AnimatorCustomization.js"},{"deps":{"./AnimValueProgress":34},"path":"preview-scripts/assets/scripts/common/cmpt/ui/animValue/AnimValueProgressHP.js"},{"deps":{"../../../util/Tween":67},"path":"preview-scripts/assets/scripts/common/cmpt/ui/animValue/AnimValue.js"},{"deps":{"../../../hack/ButtonHack":14},"path":"preview-scripts/assets/scripts/common/cmpt/ui/button/ButtonChildPos.js"},{"deps":{"../../../hack/ButtonHack":14,"../../../util/Tool":71},"path":"preview-scripts/assets/scripts/common/cmpt/ui/button/ButtonChildGray.js"},{"deps":{"./MultiAssembler":50},"path":"preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerRadialFilled.js"},{"deps":{"./MultiAssembler":50},"path":"preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerSimple.js"},{"deps":{"../../../const/EventName":12,"../res/ResSprite":49,"../../../util/I18n":61,"../../../util/Events":60},"path":"preview-scripts/assets/scripts/common/cmpt/ui/i18n/I18nSprite.js"},{"deps":{"../../../util/EditorTool":65,"./assembler/MultiAssemblerBarFilled":2,"./assembler/MultiAssemblerSimple":43,"./assembler/MultiAssemblerRadialFilled":42,"./assembler/MultiAssemblerSliced":46,"./assembler/MultiAssemblerTiled":48,"./MultiTextureManager":47},"path":"preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/MultiSprite.js"},{"deps":{"./MultiAssembler":50},"path":"preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerSliced.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/MultiTextureManager.js"},{"deps":{"./MultiAssembler":50},"path":"preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerTiled.js"},{"deps":{"../../../util/Res":70},"path":"preview-scripts/assets/scripts/common/cmpt/ui/res/ResSprite.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssembler.js"},{"deps":{"../../../util/EditorTool":65,"../../../util/Tool":71,"./VirtualLayout":55},"path":"preview-scripts/assets/scripts/common/cmpt/ui/scrollList/VirtualList.js"},{"deps":{"../../util/Res":70,"../../const/Url":56,"../../util/Tool":71,"./DialogBase":26,"./Tip":3},"path":"preview-scripts/assets/scripts/common/cmpt/base/Layer.js"},{"deps":{"../../../util/Res":70},"path":"preview-scripts/assets/scripts/common/cmpt/ui/scrollList/LoopList.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/config/En.js"},{"deps":{"../../../util/Res":70,"../../../util/Tool":71,"./VirtualItem":57,"./VirtualList":51},"path":"preview-scripts/assets/scripts/common/cmpt/ui/scrollList/VirtualLayout.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/const/Url.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/cmpt/ui/scrollList/VirtualItem.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/hack/EditorBoxHack.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/runtime/GlobalInfo.js"},{"deps":{"../const/EventName":12},"path":"preview-scripts/assets/scripts/common/util/Events.js"},{"deps":{"../config/En":54,"../config/Zh":13,"../const/EventName":12,"./Events":60,"./Tool":71},"path":"preview-scripts/assets/scripts/common/util/I18n.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/util/Behavior3.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/runtime/EnumIndex.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/util/PhysicsController.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/util/EditorTool.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/cmpt/base/Singleton.js"},{"deps":{"../cmpt/base/Timer":28},"path":"preview-scripts/assets/scripts/common/util/Tween.js"},{"deps":{"./Tool":71},"path":"preview-scripts/assets/scripts/common/util/Random.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/util/RecyclePool.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/util/Res.js"},{"deps":{"./Tween":67},"path":"preview-scripts/assets/scripts/common/util/Tool.js"},{"deps":{"./Tween":67},"path":"preview-scripts/assets/scripts/common/util/AudioManager.js"},{"deps":{"../../common/const/Url":56,"../../common/cmpt/base/DialogBase":26,"../../common/util/Events":60},"path":"preview-scripts/assets/scripts/showcase/dialog/DlgLevel.js"},{"deps":{"../../common/cmpt/base/DialogBase":26,"../../common/const/Url":56,"../../common/util/Events":60},"path":"preview-scripts/assets/scripts/showcase/dialog/DlgRole.js"},{"deps":{"../../common/cmpt/base/DialogBase":26,"../../common/const/Url":56,"../../common/util/Events":60},"path":"preview-scripts/assets/scripts/showcase/dialog/DlgSign.js"},{"deps":{"../../common/cmpt/base/DialogBase":26,"../../common/const/Url":56,"../../common/util/Events":60},"path":"preview-scripts/assets/scripts/showcase/dialog/DlgStore.js"},{"deps":{"../dialog/DlgRole":74,"../dialog/DlgSign":75,"../dialog/DlgStore":76,"../dialog/DlgLevel":73,"../../common/const/EventName":12,"../../common/util/Events":60,"../../common/const/Url":56,"../../common/cmpt/base/Layer":52},"path":"preview-scripts/assets/scripts/showcase/home/Home.js"},{"deps":{"../../common/const/Url":56,"../../common/cmpt/base/Layer":52,"../../common/runtime/UserInfo":15,"../../common/util/Res":70},"path":"preview-scripts/assets/scripts/showcase/scenes/Loading.js"},{"deps":{"./Barrier":81},"path":"preview-scripts/assets/scripts/showcase/home/main/BarrierManager.js"},{"deps":{"./BarrierManager":79,"./MoveCtr":82,"../../../common/util/Tool":71,"../../../common/util/Events":60,"../../../common/runtime/EnumIndex":63,"../../../common/cmpt/base/Layer":52,"../../../common/const/EventName":12},"path":"preview-scripts/assets/scripts/showcase/home/main/GameController.js"},{"deps":{"../../../common/const/Url":56,"../../../common/util/Tool":71,"../../../common/util/Events":60,"../../../common/const/EventName":12,"../../../common/cmpt/ui/res/ResSprite":49},"path":"preview-scripts/assets/scripts/showcase/home/main/Barrier.js"},{"deps":{"../../../common/util/Tool":71,"../../../common/const/Url":56,"../../../common/cmpt/ui/res/ResSprite":49},"path":"preview-scripts/assets/scripts/showcase/home/main/MoveCtr.js"},{"deps":{"./task/GuideTaskIndex":87,"../../../common/util/Events":60,"../../../common/const/EventName":12,"async":89},"path":"preview-scripts/assets/scripts/showcase/home/guide/GodGuide.js"},{"deps":{"../../process/browser.js":85},"path":"preview-scripts/__node_modules/async/dist/async.js"},{"deps":{},"path":"preview-scripts/__node_modules/process/browser.js"},{"deps":{},"path":"preview-scripts/assets/scripts/showcase/home/guide/task/GuideTask1.js"},{"deps":{"./GuideTask1":86,"./GuideTask2":88},"path":"preview-scripts/assets/scripts/showcase/home/guide/task/GuideTaskIndex.js"},{"deps":{},"path":"preview-scripts/assets/scripts/showcase/home/guide/task/GuideTask2.js"},{"deps":{"F:/cocos-dashboard-editors/2.4.5/resources/app.asar/node_modules/process/browser.js":85},"path":"preview-scripts/__node_modules/async/dist/async.js"},{"deps":{},"path":"preview-scripts/assets/scripts/showcase/home/guide/GuideFinger.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    