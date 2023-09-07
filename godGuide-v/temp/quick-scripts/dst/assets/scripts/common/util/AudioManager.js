
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/AudioManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ed9cbEOGDVGSIJOKhzlTwEi', 'AudioManager');
// scripts/common/util/AudioManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SfxType = void 0;
var Tween_1 = require("./Tween");
/**
 * 音效类型
 */
var SfxType;
(function (SfxType) {
    SfxType[SfxType["NORMAL"] = 0] = "NORMAL";
    SfxType[SfxType["UI"] = 1] = "UI";
})(SfxType = exports.SfxType || (exports.SfxType = {}));
/**
 * 音频管理类
 */
var AudioManager = /** @class */ (function () {
    function AudioManager() {
    }
    Object.defineProperty(AudioManager, "bgmVolume", {
        /** 全局bgm音量 */
        get: function () { return this._bgmVolume; },
        set: function (volume) {
            var _this = this;
            if (this._bgmVolume === volume) {
                return;
            }
            this._bgmVolume = cc.misc.clampf(volume, 0, 1);
            this._bgmMap.forEach(function (audioData, clip) {
                cc.audioEngine.setVolume(audioData.id, _this._bgmVolume * audioData.volume);
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager, "sfxVolume", {
        /** 全局sfx音量 */
        get: function () { return this._sfxVolume; },
        set: function (volume) {
            var _this = this;
            if (this._sfxVolume === volume) {
                return;
            }
            this._sfxVolume = cc.misc.clampf(volume, 0, 1);
            this._normalSfxMap.forEach(function (data, clip) {
                data.audioList.forEach(function (audioData) {
                    cc.audioEngine.setVolume(audioData.id, _this._sfxVolume * audioData.volume);
                });
            });
            this._uiSfxMap.forEach(function (data, clip) {
                data.audioList.forEach(function (audioData) {
                    cc.audioEngine.setVolume(audioData.id, _this._sfxVolume * audioData.volume);
                });
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager, "bgmOff", {
        /** bgm是否关闭 */
        get: function () { return this._bgmOff; },
        set: function (isOff) {
            var _this = this;
            if (this._bgmOff === isOff) {
                return;
            }
            this._bgmOff = isOff;
            if (this._bgmOff) {
                this._bgmMap.forEach(function (audioData, clip) {
                    _this.stop(audioData);
                });
                this._bgmMap.clear();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager, "sfxOff", {
        /** sfx是否关闭 */
        get: function () { return this._sfxOff; },
        set: function (isOff) {
            var _this = this;
            if (this._sfxOff === isOff) {
                return;
            }
            this._sfxOff = isOff;
            if (this._sfxOff) {
                this._normalSfxMap.forEach(function (data, clip) {
                    data.audioList.forEach(function (audioData) {
                        _this.stop(audioData);
                    });
                    data.audioList.length = 0;
                });
                this._uiSfxMap.forEach(function (data, clip) {
                    data.audioList.forEach(function (audioData) {
                        _this.stop(audioData);
                    });
                    data.audioList.length = 0;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager, "bgmPause", {
        /** bgm是否暂停 */
        get: function () { return this._bgmPause; },
        set: function (isPause) {
            var _this = this;
            if (this.bgmOff || this._bgmPause === isPause) {
                return;
            }
            this._bgmPause = isPause;
            this._bgmMap.forEach(function (audioData, clip) {
                var _a, _b;
                if (_this._bgmPause) {
                    (_a = audioData.tween) === null || _a === void 0 ? void 0 : _a.pause();
                    cc.audioEngine.pause(audioData.id);
                }
                else {
                    (_b = audioData.tween) === null || _b === void 0 ? void 0 : _b.resume();
                    cc.audioEngine.resume(audioData.id);
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager, "sfxPause", {
        /** sfx是否暂停，暂停时不暂停ui音效 */
        get: function () { return this._sfxPause; },
        set: function (isPause) {
            if (this.sfxOff || this._sfxPause === isPause) {
                return;
            }
            this._sfxPause = isPause;
            if (this._sfxPause) {
                this._normalSfxMap.forEach(function (data, clip) {
                    data.audioList.forEach(function (audioData) {
                        var _a;
                        (_a = audioData.tween) === null || _a === void 0 ? void 0 : _a.pause();
                        cc.audioEngine.pause(audioData.id);
                    });
                });
            }
            else {
                this._normalSfxMap.forEach(function (data, clip) {
                    data.audioList.forEach(function (audioData) {
                        var _a;
                        (_a = audioData.tween) === null || _a === void 0 ? void 0 : _a.resume();
                        cc.audioEngine.resume(audioData.id);
                    });
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 音量渐变
     * @param data
     * @param duration 音量渐变时长 单位s
     * @param from 音量初始值
     * @param to 音量目标值
     * @param call 渐变结束的回调
     */
    AudioManager.volumeFade = function (data, duration, from, to, call) {
        var _this = this;
        var _a;
        (_a = data.tween) === null || _a === void 0 ? void 0 : _a.stop();
        data.volume = from;
        cc.audioEngine.setVolume(data.id, data.volume * this.bgmVolume);
        data.tween = new Tween_1.Tween(data)
            .to({ volume: to }, duration * 1000)
            .onUpdate(function () {
            cc.audioEngine.setVolume(data.id, data.volume * _this.bgmVolume);
        })
            .onComplete(function () {
            data.tween = null;
            if (call) {
                call();
            }
        })
            .start();
    };
    /**
     * 停止音频
     * @param audioData
     */
    AudioManager.stop = function (audioData) {
        if (audioData.tween) {
            audioData.tween.stop();
            audioData.tween = null;
        }
        cc.audioEngine.stop(audioData.id);
    };
    /**
     * 播放音频并返回AudioData
     */
    AudioManager.play = function (args, volume, audioData) {
        if (audioData === void 0) { audioData = null; }
        var data = args instanceof cc.AudioClip ? { clip: args } : args;
        if (!data.hasOwnProperty("loop")) {
            data.loop = false;
        }
        if (!data.hasOwnProperty("fadeDuration")) {
            data.fadeDuration = 0;
        }
        if (!data.hasOwnProperty("finishCall")) {
            data.finishCall = null;
        }
        if (audioData) {
            audioData.id = cc.audioEngine.play(data.clip, data.loop, volume);
            audioData.volume = 1;
            if (audioData.tween) {
                audioData.tween.stop();
                audioData.tween = null;
            }
        }
        else {
            audioData = {
                id: cc.audioEngine.play(data.clip, data.loop, volume),
                volume: 1,
                tween: null
            };
        }
        if (data.finishCall) {
            cc.audioEngine.setFinishCallback(audioData.id, data.finishCall);
        }
        if (data.fadeDuration > 0) {
            this.volumeFade(audioData, data.fadeDuration, 0, 1);
        }
        return audioData;
    };
    /**
     * 播放bgm
     */
    AudioManager.playBgm = function (args) {
        var clip = args instanceof cc.AudioClip ? args : args.clip;
        if (this.bgmOff || !clip) {
            return;
        }
        var audioData = this._bgmMap.get(clip);
        if (audioData === undefined) {
            audioData = this.play(args, this.bgmVolume);
            this._bgmMap.set(clip, audioData);
        }
        else {
            this.stop(audioData);
            this.play(args, this.bgmVolume, audioData);
        }
    };
    /**
     * 播放sfx
     */
    AudioManager.playSfx = function (args, type) {
        if (type === void 0) { type = SfxType.NORMAL; }
        var clip = args instanceof cc.AudioClip ? args : args.clip;
        if (this.sfxOff || !clip) {
            return;
        }
        var sfxData = type === SfxType.NORMAL ? this._normalSfxMap.get(clip) : this._uiSfxMap.get(clip);
        var audioData = null;
        if (sfxData === undefined) {
            sfxData = this.setSfxData(clip, type);
            audioData = this.play(args, this.sfxVolume);
            sfxData.audioList.push(audioData);
        }
        else {
            // 剔除不处于播放状态的音频
            while (sfxData.audioList.length > 0 && cc.audioEngine.getState(sfxData.audioList[0].id) !== cc.audioEngine.AudioState.PLAYING) {
                this.stop(sfxData.audioList.shift());
            }
            // 已达到最大数量则剔除最先(第一个)缓存的音频
            while (sfxData.overStop && sfxData.audioList.length >= sfxData.maxNum) {
                this.stop(sfxData.audioList.shift());
            }
            // 缓存新的音频
            if (sfxData.audioList.length < sfxData.maxNum) {
                audioData = this.play(args, this.sfxVolume);
                sfxData.audioList.push(audioData);
            }
        }
    };
    /**
     * 设置音效数据（用于限制某些短时间内同时大量播放的音效）
     * @param clip
     * @param type 音效类型
     * @param maxNum 此音效最大同时播放的数量
     * @param overStop 超过最大数量时是否stop未播完的音效并缓存新的音效
     */
    AudioManager.setSfxData = function (clip, type, maxNum, overStop) {
        if (type === void 0) { type = SfxType.NORMAL; }
        if (maxNum === void 0) { maxNum = 8; }
        if (overStop === void 0) { overStop = false; }
        if (!clip) {
            return;
        }
        maxNum = Math.max(maxNum, 1);
        var map = type === SfxType.NORMAL ? this._normalSfxMap : this._uiSfxMap;
        var sfxData = map.get(clip);
        if (sfxData === undefined) {
            sfxData = {
                audioList: [],
                maxNum: maxNum,
                overStop: overStop
            };
            map.set(clip, sfxData);
        }
        else {
            sfxData.maxNum = maxNum;
            sfxData.overStop = overStop;
        }
        return sfxData;
    };
    /**
     * 停止bgm
     * @param clip 需停止的音频，clip返回值为false则停止所有
     * @param fadeDuration 音量渐变时长 单位s
     */
    AudioManager.stopBgm = function (clip, fadeDuration) {
        var _this = this;
        if (clip === void 0) { clip = null; }
        if (fadeDuration === void 0) { fadeDuration = 0; }
        if (this.bgmOff) {
            return;
        }
        if (clip) {
            var audioData_1 = this._bgmMap.get(clip);
            if (audioData_1 === undefined) {
                return;
            }
            if (fadeDuration <= 0) {
                this.stop(audioData_1);
                this._bgmMap.delete(clip);
            }
            else {
                this.volumeFade(audioData_1, fadeDuration, 1, 0, function () {
                    _this.stop(audioData_1);
                    _this._bgmMap.delete(clip);
                });
            }
        }
        else {
            if (fadeDuration <= 0) {
                this._bgmMap.forEach(function (audioData, clip) {
                    _this.stop(audioData);
                });
                this._bgmMap.clear();
            }
            else {
                this._bgmMap.forEach(function (audioData, clip) {
                    _this.volumeFade(audioData, fadeDuration, 1, 0, function () {
                        _this.stop(audioData);
                        _this._bgmMap.delete(clip);
                    });
                });
            }
        }
    };
    /**
     * 停止sfx
     * @param clip 需停止的音频，clip返回值为false则停止所有
     * @param type 音效类型
     */
    AudioManager.stopSfx = function (clip, type) {
        var _this = this;
        if (clip === void 0) { clip = null; }
        if (type === void 0) { type = SfxType.NORMAL; }
        if (this.sfxOff) {
            return;
        }
        if (clip) {
            var data = type === SfxType.NORMAL ? this._normalSfxMap.get(clip) : this._uiSfxMap.get(clip);
            if (data === undefined || data.audioList.length <= 0) {
                return;
            }
            data.audioList.forEach(function (audioData) {
                _this.stop(audioData);
            });
            data.audioList.length = 0;
        }
        else {
            this._normalSfxMap.forEach(function (data, clip) {
                data.audioList.forEach(function (audioData) {
                    _this.stop(audioData);
                });
                data.audioList.length = 0;
            });
            this._uiSfxMap.forEach(function (data, clip) {
                data.audioList.forEach(function (audioData) {
                    _this.stop(audioData);
                });
                data.audioList.length = 0;
            });
        }
    };
    /**
     * 停止所有音频
     */
    AudioManager.stopAll = function () {
        this.stopBgm();
        this.stopSfx();
    };
    /**
     * 暂停所有音频
     */
    AudioManager.pauseAll = function () {
        this.bgmPause = true;
        this.sfxPause = true;
    };
    /**
     * 恢复所有音频
     */
    AudioManager.resumeAll = function () {
        this.bgmPause = false;
        this.sfxPause = false;
    };
    /**
     * 停止所有音频，清除所有音频缓存
     */
    AudioManager.uncacheAll = function () {
        this.stopAll();
        this._bgmMap.clear();
        this._normalSfxMap.clear();
        this._uiSfxMap.clear();
        cc.audioEngine.uncacheAll();
    };
    /** 缓存的bgm数据 */
    AudioManager._bgmMap = new Map();
    /** 缓存的普通音效数据 */
    AudioManager._normalSfxMap = new Map();
    /** 缓存的ui音效数据 */
    AudioManager._uiSfxMap = new Map();
    AudioManager._bgmVolume = 1;
    AudioManager._sfxVolume = 1;
    AudioManager._bgmOff = false;
    AudioManager._sfxOff = false;
    AudioManager._bgmPause = false;
    AudioManager._sfxPause = false;
    return AudioManager;
}());
exports.default = AudioManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxBdWRpb01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBRWhDOztHQUVHO0FBQ0gsSUFBWSxPQUdYO0FBSEQsV0FBWSxPQUFPO0lBQ2YseUNBQU0sQ0FBQTtJQUNOLGlDQUFFLENBQUE7QUFDTixDQUFDLEVBSFcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBR2xCO0FBd0NEOztHQUVHO0FBQ0g7SUFBQTtJQW1aQSxDQUFDO0lBellHLHNCQUFrQix5QkFBUztRQUQzQixjQUFjO2FBQ2QsY0FBd0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUNqRSxVQUE0QixNQUFjO1lBQTFDLGlCQVNDO1lBUkcsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRTtnQkFDNUIsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsU0FBb0IsRUFBRSxJQUFrQjtnQkFDMUQsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvRSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7OztPQVZnRTtJQWNqRSxzQkFBa0IseUJBQVM7UUFEM0IsY0FBYzthQUNkLGNBQXdDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDakUsVUFBNEIsTUFBYztZQUExQyxpQkFnQkM7WUFmRyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO2dCQUM1QixPQUFPO2FBQ1Y7WUFFRCxJ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b0JBQU8sR0FBWSxLQUFLLENBQUM7SUF5QnpCLHNCQUFTLEdBQVksS0FBSyxDQUFDO0lBb0IzQixzQkFBUyxHQUFZLEtBQUssQ0FBQztJQTBTOUMsbUJBQUM7Q0FuWkQsQUFtWkMsSUFBQTtrQkFuWm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUd2VlbiB9IGZyb20gXCIuL1R3ZWVuXCI7XHJcblxyXG4vKipcclxuICog6Z+z5pWI57G75Z6LXHJcbiAqL1xyXG5leHBvcnQgZW51bSBTZnhUeXBlIHtcclxuICAgIE5PUk1BTCxcclxuICAgIFVJXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDpn7PpopHmkq3mlL7lj4LmlbBcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXVkaW9QbGF5QXJncyB7XHJcbiAgICAvKiogQXVkaW9DbGlwICovXHJcbiAgICBjbGlwOiBjYy5BdWRpb0NsaXA7XHJcbiAgICAvKiog5piv5ZCm5b6q546v77yM6buY6K6kZmFsc2UgKi9cclxuICAgIGxvb3A/OiBib29sZWFuO1xyXG4gICAgLyoqIOmfs+mHj+a4kOWPmOaXtumVv++8jOWNleS9jXPjgILpu5jorqQwICovXHJcbiAgICBmYWRlRHVyYXRpb24/OiBudW1iZXI7XHJcbiAgICAvKiog5pKt5pS+57uT5p2f55qE5Zue6LCDICovXHJcbiAgICBmaW5pc2hDYWxsPzogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEF1ZGlv57yT5a2Y5pWw5o2uXHJcbiAqL1xyXG5pbnRlcmZhY2UgQXVkaW9EYXRhIHtcclxuICAgIC8qKiBhdWRpb0lEICovXHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgLyoqIOeUqOS6juWNleeLrOaOp+WItueahOmfs+mHjyAqL1xyXG4gICAgdm9sdW1lOiBudW1iZXI7XHJcbiAgICAvKiog6Z+z6YeP5riQ5Y+YdHdlZW7lr7nosaEgKi9cclxuICAgIHR3ZWVuOiBUd2VlbjxBdWRpb0RhdGE+O1xyXG59XHJcblxyXG4vKipcclxuICog5Y2V5LiqQXVkaW9DbGlw5a+55bqU55qEc2Z4KOmfs+aViCnnvJPlrZjmlbDmja5cclxuICovXHJcbmludGVyZmFjZSBTZnhEYXRhIHtcclxuICAgIC8qKiDlt7LnvJPlrZjnmoTpn7PmlYjmlbDmja7mlbDnu4QgKi9cclxuICAgIGF1ZGlvTGlzdDogQXVkaW9EYXRhW107XHJcbiAgICAvKiog5q2k6Z+z5pWI5pyA5aSn5ZCM5pe25pKt5pS+55qE5pWw6YePICovXHJcbiAgICBtYXhOdW06IG51bWJlcjtcclxuICAgIC8qKiDotoXov4fmnIDlpKfmlbDph4/ml7bmmK/lkKZzdG9w5pyq5pKt5a6M55qE6Z+z5pWI5bm257yT5a2Y5paw55qE6Z+z5pWIICovXHJcbiAgICBvdmVyU3RvcDogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOmfs+mikeeuoeeQhuexu1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9NYW5hZ2VyIHtcclxuICAgIC8qKiDnvJPlrZjnmoRiZ23mlbDmja4gKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9iZ21NYXA6IE1hcDxjYy5BdWRpb0NsaXAsIEF1ZGlvRGF0YT4gPSBuZXcgTWFwKCk7XHJcbiAgICAvKiog57yT5a2Y55qE5pmu6YCa6Z+z5pWI5pWw5o2uICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbm9ybWFsU2Z4TWFwOiBNYXA8Y2MuQXVkaW9DbGlwLCBTZnhEYXRhPiA9IG5ldyBNYXAoKTtcclxuICAgIC8qKiDnvJPlrZjnmoR1aemfs+aViOaVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3VpU2Z4TWFwOiBNYXA8Y2MuQXVkaW9DbGlwLCBTZnhEYXRhPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfYmdtVm9sdW1lOiBudW1iZXIgPSAxO1xyXG4gICAgLyoqIOWFqOWxgGJnbemfs+mHjyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgYmdtVm9sdW1lKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9iZ21Wb2x1bWU7IH1cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IGJnbVZvbHVtZSh2b2x1bWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9iZ21Wb2x1bWUgPT09IHZvbHVtZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9iZ21Wb2x1bWUgPSBjYy5taXNjLmNsYW1wZih2b2x1bWUsIDAsIDEpO1xyXG4gICAgICAgIHRoaXMuX2JnbU1hcC5mb3JFYWNoKChhdWRpb0RhdGE6IEF1ZGlvRGF0YSwgY2xpcDogY2MuQXVkaW9DbGlwKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldFZvbHVtZShhdWRpb0RhdGEuaWQsIHRoaXMuX2JnbVZvbHVtZSAqIGF1ZGlvRGF0YS52b2x1bWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9zZnhWb2x1bWU6IG51bWJlciA9IDE7XHJcbiAgICAvKiog5YWo5bGAc2Z46Z+z6YePICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBzZnhWb2x1bWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NmeFZvbHVtZTsgfVxyXG4gICAgcHVibGljIHN0YXRpYyBzZXQgc2Z4Vm9sdW1lKHZvbHVtZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NmeFZvbHVtZSA9PT0gdm9sdW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NmeFZvbHVtZSA9IGNjLm1pc2MuY2xhbXBmKHZvbHVtZSwgMCwgMSk7XHJcbiAgICAgICAgdGhpcy5fbm9ybWFsU2Z4TWFwLmZvckVhY2goKGRhdGE6IFNmeERhdGEsIGNsaXA6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmF1ZGlvTGlzdC5mb3JFYWNoKChhdWRpb0RhdGE6IEF1ZGlvRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0Vm9sdW1lKGF1ZGlvRGF0YS5pZCwgdGhpcy5fc2Z4Vm9sdW1lICogYXVkaW9EYXRhLnZvbHVtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX3VpU2Z4TWFwLmZvckVhY2goKGRhdGE6IFNmeERhdGEsIGNsaXA6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmF1ZGlvTGlzdC5mb3JFYWNoKChhdWRpb0RhdGE6IEF1ZGlvRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0Vm9sdW1lKGF1ZGlvRGF0YS5pZCwgdGhpcy5fc2Z4Vm9sdW1lICogYXVkaW9EYXRhLnZvbHVtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9iZ21PZmY6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiBiZ23mmK/lkKblhbPpl60gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGJnbU9mZigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2JnbU9mZjsgfVxyXG4gICAgcHVibGljIHN0YXRpYyBzZXQgYmdtT2ZmKGlzT2ZmOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2JnbU9mZiA9PT0gaXNPZmYpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9iZ21PZmYgPSBpc09mZjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2JnbU9mZikge1xyXG4gICAgICAgICAgICB0aGlzLl9iZ21NYXAuZm9yRWFjaCgoYXVkaW9EYXRhOiBBdWRpb0RhdGEsIGNsaXA6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKGF1ZGlvRGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9iZ21NYXAuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3NmeE9mZjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIHNmeOaYr+WQpuWFs+mXrSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgc2Z4T2ZmKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2Z4T2ZmOyB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHNldCBzZnhPZmYoaXNPZmY6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5fc2Z4T2ZmID09PSBpc09mZikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zZnhPZmYgPSBpc09mZjtcclxuICAgICAgICBpZiAodGhpcy5fc2Z4T2ZmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25vcm1hbFNmeE1hcC5mb3JFYWNoKChkYXRhOiBTZnhEYXRhLCBjbGlwOiBjYy5BdWRpb0NsaXApID0+IHtcclxuICAgICAgICAgICAgICAgIGRhdGEuYXVkaW9MaXN0LmZvckVhY2goKGF1ZGlvRGF0YTogQXVkaW9EYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKGF1ZGlvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRhdGEuYXVkaW9MaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl91aVNmeE1hcC5mb3JFYWNoKChkYXRhOiBTZnhEYXRhLCBjbGlwOiBjYy5BdWRpb0NsaXApID0+IHtcclxuICAgICAgICAgICAgICAgIGRhdGEuYXVkaW9MaXN0LmZvckVhY2goKGF1ZGlvRGF0YTogQXVkaW9EYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKGF1ZGlvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRhdGEuYXVkaW9MaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfYmdtUGF1c2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiBiZ23mmK/lkKbmmoLlgZwgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGJnbVBhdXNlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYmdtUGF1c2U7IH1cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IGJnbVBhdXNlKGlzUGF1c2U6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5iZ21PZmYgfHwgdGhpcy5fYmdtUGF1c2UgPT09IGlzUGF1c2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9iZ21QYXVzZSA9IGlzUGF1c2U7XHJcblxyXG4gICAgICAgIHRoaXMuX2JnbU1hcC5mb3JFYWNoKChhdWRpb0RhdGE6IEF1ZGlvRGF0YSwgY2xpcDogY2MuQXVkaW9DbGlwKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9iZ21QYXVzZSkge1xyXG4gICAgICAgICAgICAgICAgYXVkaW9EYXRhLnR3ZWVuPy5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2UoYXVkaW9EYXRhLmlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGF1ZGlvRGF0YS50d2Vlbj8ucmVzdW1lKCk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWUoYXVkaW9EYXRhLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9zZnhQYXVzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIHNmeOaYr+WQpuaaguWBnO+8jOaaguWBnOaXtuS4jeaaguWBnHVp6Z+z5pWIICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBzZnhQYXVzZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3NmeFBhdXNlOyB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHNldCBzZnhQYXVzZShpc1BhdXNlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2Z4T2ZmIHx8IHRoaXMuX3NmeFBhdXNlID09PSBpc1BhdXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2Z4UGF1c2UgPSBpc1BhdXNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2Z4UGF1c2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbm9ybWFsU2Z4TWFwLmZvckVhY2goKGRhdGE6IFNmeERhdGEsIGNsaXA6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hdWRpb0xpc3QuZm9yRWFjaCgoYXVkaW9EYXRhOiBBdWRpb0RhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhdWRpb0RhdGEudHdlZW4/LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2UoYXVkaW9EYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxTZnhNYXAuZm9yRWFjaCgoZGF0YTogU2Z4RGF0YSwgY2xpcDogY2MuQXVkaW9DbGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmF1ZGlvTGlzdC5mb3JFYWNoKChhdWRpb0RhdGE6IEF1ZGlvRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1ZGlvRGF0YS50d2Vlbj8ucmVzdW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lKGF1ZGlvRGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmfs+mHj+a4kOWPmFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb24g6Z+z6YeP5riQ5Y+Y5pe26ZW/IOWNleS9jXNcclxuICAgICAqIEBwYXJhbSBmcm9tIOmfs+mHj+WIneWni+WAvFxyXG4gICAgICogQHBhcmFtIHRvIOmfs+mHj+ebruagh+WAvFxyXG4gICAgICogQHBhcmFtIGNhbGwg5riQ5Y+Y57uT5p2f55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHZvbHVtZUZhZGUoZGF0YTogQXVkaW9EYXRhLCBkdXJhdGlvbjogbnVtYmVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGNhbGw/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgZGF0YS50d2Vlbj8uc3RvcCgpO1xyXG4gICAgICAgIGRhdGEudm9sdW1lID0gZnJvbTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUoZGF0YS5pZCwgZGF0YS52b2x1bWUgKiB0aGlzLmJnbVZvbHVtZSk7XHJcbiAgICAgICAgZGF0YS50d2VlbiA9IG5ldyBUd2VlbihkYXRhKVxyXG4gICAgICAgICAgICAudG8oeyB2b2x1bWU6IHRvIH0sIGR1cmF0aW9uICogMTAwMClcclxuICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldFZvbHVtZShkYXRhLmlkLCBkYXRhLnZvbHVtZSAqIHRoaXMuYmdtVm9sdW1lKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS50d2VlbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLpn7PpopFcclxuICAgICAqIEBwYXJhbSBhdWRpb0RhdGEgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHN0b3AoYXVkaW9EYXRhOiBBdWRpb0RhdGEpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYXVkaW9EYXRhLnR3ZWVuKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvRGF0YS50d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgICAgIGF1ZGlvRGF0YS50d2VlbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3AoYXVkaW9EYXRhLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvumfs+mikeW5tui/lOWbnkF1ZGlvRGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwbGF5KGFyZ3M6IGNjLkF1ZGlvQ2xpcCB8IEF1ZGlvUGxheUFyZ3MsIHZvbHVtZTogbnVtYmVyLCBhdWRpb0RhdGE6IEF1ZGlvRGF0YSA9IG51bGwpOiBBdWRpb0RhdGEge1xyXG4gICAgICAgIGxldCBkYXRhOiBBdWRpb1BsYXlBcmdzID0gYXJncyBpbnN0YW5jZW9mIGNjLkF1ZGlvQ2xpcCA/IHsgY2xpcDogYXJncyB9IDogYXJncztcclxuICAgICAgICBpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkoXCJsb29wXCIpKSB7XHJcbiAgICAgICAgICAgIGRhdGEubG9vcCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkoXCJmYWRlRHVyYXRpb25cIikpIHtcclxuICAgICAgICAgICAgZGF0YS5mYWRlRHVyYXRpb24gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkoXCJmaW5pc2hDYWxsXCIpKSB7XHJcbiAgICAgICAgICAgIGRhdGEuZmluaXNoQ2FsbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYXVkaW9EYXRhKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvRGF0YS5pZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkoZGF0YS5jbGlwLCBkYXRhLmxvb3AsIHZvbHVtZSk7XHJcbiAgICAgICAgICAgIGF1ZGlvRGF0YS52b2x1bWUgPSAxO1xyXG4gICAgICAgICAgICBpZiAoYXVkaW9EYXRhLnR3ZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBhdWRpb0RhdGEudHdlZW4uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgYXVkaW9EYXRhLnR3ZWVuID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGF1ZGlvRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBjYy5hdWRpb0VuZ2luZS5wbGF5KGRhdGEuY2xpcCwgZGF0YS5sb29wLCB2b2x1bWUpLFxyXG4gICAgICAgICAgICAgICAgdm9sdW1lOiAxLFxyXG4gICAgICAgICAgICAgICAgdHdlZW46IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmZpbmlzaENhbGwpIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RmluaXNoQ2FsbGJhY2soYXVkaW9EYXRhLmlkLCBkYXRhLmZpbmlzaENhbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5mYWRlRHVyYXRpb24gPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudm9sdW1lRmFkZShhdWRpb0RhdGEsIGRhdGEuZmFkZUR1cmF0aW9uLCAwLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvmJnbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXlCZ20oYXJnczogY2MuQXVkaW9DbGlwIHwgQXVkaW9QbGF5QXJncyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGlwID0gYXJncyBpbnN0YW5jZW9mIGNjLkF1ZGlvQ2xpcCA/IGFyZ3MgOiBhcmdzLmNsaXA7XHJcbiAgICAgICAgaWYgKHRoaXMuYmdtT2ZmIHx8ICFjbGlwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhdWRpb0RhdGE6IEF1ZGlvRGF0YSA9IHRoaXMuX2JnbU1hcC5nZXQoY2xpcCk7XHJcbiAgICAgICAgaWYgKGF1ZGlvRGF0YSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvRGF0YSA9IHRoaXMucGxheShhcmdzLCB0aGlzLmJnbVZvbHVtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2JnbU1hcC5zZXQoY2xpcCwgYXVkaW9EYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoYXVkaW9EYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KGFyZ3MsIHRoaXMuYmdtVm9sdW1lLCBhdWRpb0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvnNmeFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXlTZngoYXJnczogY2MuQXVkaW9DbGlwIHwgQXVkaW9QbGF5QXJncywgdHlwZTogU2Z4VHlwZSA9IFNmeFR5cGUuTk9STUFMKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaXAgPSBhcmdzIGluc3RhbmNlb2YgY2MuQXVkaW9DbGlwID8gYXJncyA6IGFyZ3MuY2xpcDtcclxuICAgICAgICBpZiAodGhpcy5zZnhPZmYgfHwgIWNsaXApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNmeERhdGE6IFNmeERhdGEgPSB0eXBlID09PSBTZnhUeXBlLk5PUk1BTCA/IHRoaXMuX25vcm1hbFNmeE1hcC5nZXQoY2xpcCkgOiB0aGlzLl91aVNmeE1hcC5nZXQoY2xpcCk7XHJcbiAgICAgICAgbGV0IGF1ZGlvRGF0YTogQXVkaW9EYXRhID0gbnVsbDtcclxuICAgICAgICBpZiAoc2Z4RGF0YSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNmeERhdGEgPSB0aGlzLnNldFNmeERhdGEoY2xpcCwgdHlwZSk7XHJcbiAgICAgICAgICAgIGF1ZGlvRGF0YSA9IHRoaXMucGxheShhcmdzLCB0aGlzLnNmeFZvbHVtZSk7XHJcbiAgICAgICAgICAgIHNmeERhdGEuYXVkaW9MaXN0LnB1c2goYXVkaW9EYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDliZTpmaTkuI3lpITkuo7mkq3mlL7nirbmgIHnmoTpn7PpopFcclxuICAgICAgICAgICAgd2hpbGUgKHNmeERhdGEuYXVkaW9MaXN0Lmxlbmd0aCA+IDAgJiYgY2MuYXVkaW9FbmdpbmUuZ2V0U3RhdGUoc2Z4RGF0YS5hdWRpb0xpc3RbMF0uaWQpICE9PSBjYy5hdWRpb0VuZ2luZS5BdWRpb1N0YXRlLlBMQVlJTkcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcChzZnhEYXRhLmF1ZGlvTGlzdC5zaGlmdCgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g5bey6L6+5Yiw5pyA5aSn5pWw6YeP5YiZ5YmU6Zmk5pyA5YWIKOesrOS4gOS4qinnvJPlrZjnmoTpn7PpopFcclxuICAgICAgICAgICAgd2hpbGUgKHNmeERhdGEub3ZlclN0b3AgJiYgc2Z4RGF0YS5hdWRpb0xpc3QubGVuZ3RoID49IHNmeERhdGEubWF4TnVtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3Aoc2Z4RGF0YS5hdWRpb0xpc3Quc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOe8k+WtmOaWsOeahOmfs+mikVxyXG4gICAgICAgICAgICBpZiAoc2Z4RGF0YS5hdWRpb0xpc3QubGVuZ3RoIDwgc2Z4RGF0YS5tYXhOdW0pIHtcclxuICAgICAgICAgICAgICAgIGF1ZGlvRGF0YSA9IHRoaXMucGxheShhcmdzLCB0aGlzLnNmeFZvbHVtZSk7XHJcbiAgICAgICAgICAgICAgICBzZnhEYXRhLmF1ZGlvTGlzdC5wdXNoKGF1ZGlvRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7pn7PmlYjmlbDmja7vvIjnlKjkuo7pmZDliLbmn5Dkupvnn63ml7bpl7TlhoXlkIzml7blpKfph4/mkq3mlL7nmoTpn7PmlYjvvIlcclxuICAgICAqIEBwYXJhbSBjbGlwIFxyXG4gICAgICogQHBhcmFtIHR5cGUg6Z+z5pWI57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gbWF4TnVtIOatpOmfs+aViOacgOWkp+WQjOaXtuaSreaUvueahOaVsOmHj1xyXG4gICAgICogQHBhcmFtIG92ZXJTdG9wIOi2hei/h+acgOWkp+aVsOmHj+aXtuaYr+WQpnN0b3DmnKrmkq3lroznmoTpn7PmlYjlubbnvJPlrZjmlrDnmoTpn7PmlYhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzZXRTZnhEYXRhKGNsaXA6IGNjLkF1ZGlvQ2xpcCwgdHlwZTogU2Z4VHlwZSA9IFNmeFR5cGUuTk9STUFMLCBtYXhOdW06IG51bWJlciA9IDgsIG92ZXJTdG9wOiBib29sZWFuID0gZmFsc2UpOiBTZnhEYXRhIHtcclxuICAgICAgICBpZiAoIWNsaXApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWF4TnVtID0gTWF0aC5tYXgobWF4TnVtLCAxKTtcclxuICAgICAgICBsZXQgbWFwID0gdHlwZSA9PT0gU2Z4VHlwZS5OT1JNQUwgPyB0aGlzLl9ub3JtYWxTZnhNYXAgOiB0aGlzLl91aVNmeE1hcDtcclxuICAgICAgICBsZXQgc2Z4RGF0YTogU2Z4RGF0YSA9IG1hcC5nZXQoY2xpcCk7XHJcbiAgICAgICAgaWYgKHNmeERhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZnhEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgYXVkaW9MaXN0OiBbXSxcclxuICAgICAgICAgICAgICAgIG1heE51bTogbWF4TnVtLFxyXG4gICAgICAgICAgICAgICAgb3ZlclN0b3A6IG92ZXJTdG9wXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1hcC5zZXQoY2xpcCwgc2Z4RGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2Z4RGF0YS5tYXhOdW0gPSBtYXhOdW07XHJcbiAgICAgICAgICAgIHNmeERhdGEub3ZlclN0b3AgPSBvdmVyU3RvcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNmeERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraJiZ21cclxuICAgICAqIEBwYXJhbSBjbGlwIOmcgOWBnOatoueahOmfs+mike+8jGNsaXDov5Tlm57lgLzkuLpmYWxzZeWImeWBnOatouaJgOaciVxyXG4gICAgICogQHBhcmFtIGZhZGVEdXJhdGlvbiDpn7Pph4/muJDlj5jml7bplb8g5Y2V5L2Nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0b3BCZ20oY2xpcDogY2MuQXVkaW9DbGlwID0gbnVsbCwgZmFkZUR1cmF0aW9uOiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmdtT2ZmKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjbGlwKSB7XHJcbiAgICAgICAgICAgIGxldCBhdWRpb0RhdGE6IEF1ZGlvRGF0YSA9IHRoaXMuX2JnbU1hcC5nZXQoY2xpcCk7XHJcbiAgICAgICAgICAgIGlmIChhdWRpb0RhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZmFkZUR1cmF0aW9uIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcChhdWRpb0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmdtTWFwLmRlbGV0ZShjbGlwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudm9sdW1lRmFkZShhdWRpb0RhdGEsIGZhZGVEdXJhdGlvbiwgMSwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcChhdWRpb0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JnbU1hcC5kZWxldGUoY2xpcCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChmYWRlRHVyYXRpb24gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmdtTWFwLmZvckVhY2goKGF1ZGlvRGF0YTogQXVkaW9EYXRhLCBjbGlwOiBjYy5BdWRpb0NsaXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoYXVkaW9EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmdtTWFwLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iZ21NYXAuZm9yRWFjaCgoYXVkaW9EYXRhOiBBdWRpb0RhdGEsIGNsaXA6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudm9sdW1lRmFkZShhdWRpb0RhdGEsIGZhZGVEdXJhdGlvbiwgMSwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoYXVkaW9EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmdtTWFwLmRlbGV0ZShjbGlwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YGc5q2ic2Z4XHJcbiAgICAgKiBAcGFyYW0gY2xpcCDpnIDlgZzmraLnmoTpn7PpopHvvIxjbGlw6L+U5Zue5YC85Li6ZmFsc2XliJnlgZzmraLmiYDmnIlcclxuICAgICAqIEBwYXJhbSB0eXBlIOmfs+aViOexu+Wei1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0b3BTZngoY2xpcDogY2MuQXVkaW9DbGlwID0gbnVsbCwgdHlwZTogU2Z4VHlwZSA9IFNmeFR5cGUuTk9STUFMKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2Z4T2ZmKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjbGlwKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBTZnhEYXRhID0gdHlwZSA9PT0gU2Z4VHlwZS5OT1JNQUwgPyB0aGlzLl9ub3JtYWxTZnhNYXAuZ2V0KGNsaXApIDogdGhpcy5fdWlTZnhNYXAuZ2V0KGNsaXApO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEuYXVkaW9MaXN0Lmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGEuYXVkaW9MaXN0LmZvckVhY2goKGF1ZGlvRGF0YTogQXVkaW9EYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoYXVkaW9EYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRhdGEuYXVkaW9MaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbm9ybWFsU2Z4TWFwLmZvckVhY2goKGRhdGE6IFNmeERhdGEsIGNsaXA6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hdWRpb0xpc3QuZm9yRWFjaCgoYXVkaW9EYXRhOiBBdWRpb0RhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoYXVkaW9EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hdWRpb0xpc3QubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VpU2Z4TWFwLmZvckVhY2goKGRhdGE6IFNmeERhdGEsIGNsaXA6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hdWRpb0xpc3QuZm9yRWFjaCgoYXVkaW9EYXRhOiBBdWRpb0RhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoYXVkaW9EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hdWRpb0xpc3QubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YGc5q2i5omA5pyJ6Z+z6aKRXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RvcEFsbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0b3BCZ20oKTtcclxuICAgICAgICB0aGlzLnN0b3BTZngoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaaguWBnOaJgOaciemfs+mikVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhdXNlQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYmdtUGF1c2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2Z4UGF1c2UgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oGi5aSN5omA5pyJ6Z+z6aKRXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVzdW1lQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYmdtUGF1c2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNmeFBhdXNlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLmiYDmnInpn7PpopHvvIzmuIXpmaTmiYDmnInpn7PpopHnvJPlrZhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB1bmNhY2hlQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RvcEFsbCgpO1xyXG4gICAgICAgIHRoaXMuX2JnbU1hcC5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX25vcm1hbFNmeE1hcC5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3VpU2Z4TWFwLmNsZWFyKCk7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUudW5jYWNoZUFsbCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==