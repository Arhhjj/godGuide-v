
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/core/AnimatorParams.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47250iiE8tKUZF6tjFUlfMo', 'AnimatorParams');
// scripts/animator/core/AnimatorParams.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimatorCondition_1 = require("./AnimatorCondition");
/**
 * 状态机参数
 */
var AnimatorParams = /** @class */ (function () {
    function AnimatorParams(dataArr) {
        var _this = this;
        this._paramMap = new Map();
        dataArr.forEach(function (data) {
            var param = {
                type: data.type,
                value: data.init
            };
            _this._paramMap.set(data.param, param);
        });
    }
    AnimatorParams.prototype.getParamType = function (key) {
        var param = this._paramMap.get(key);
        if (param) {
            return param.type;
        }
        else {
            return null;
        }
    };
    AnimatorParams.prototype.setNumber = function (key, value) {
        var param = this._paramMap.get(key);
        if (param && param.type === AnimatorCondition_1.ParamType.NUMBER) {
            param.value = value;
        }
    };
    AnimatorParams.prototype.setBool = function (key, value) {
        var param = this._paramMap.get(key);
        if (param && param.type === AnimatorCondition_1.ParamType.BOOLEAN) {
            param.value = value ? 1 : 0;
        }
    };
    AnimatorParams.prototype.setTrigger = function (key) {
        var param = this._paramMap.get(key);
        if (param && param.type === AnimatorCondition_1.ParamType.TRIGGER) {
            param.value = 1;
        }
    };
    AnimatorParams.prototype.resetTrigger = function (key) {
        var param = this._paramMap.get(key);
        if (param && param.type === AnimatorCondition_1.ParamType.TRIGGER) {
            param.value = 0;
        }
    };
    AnimatorParams.prototype.autoTrigger = function (key) {
        var param = this._paramMap.get(key);
        if (param && param.type === AnimatorCondition_1.ParamType.AUTO_TRIGGER) {
            param.value = 1;
        }
    };
    AnimatorParams.prototype.resetAutoTrigger = function (key) {
        var param = this._paramMap.get(key);
        if (param && param.type === AnimatorCondition_1.ParamType.AUTO_TRIGGER) {
            param.value = 0;
        }
    };
    AnimatorParams.prototype.resetAllAutoTrigger = function () {
        this._paramMap.forEach(function (param, key) {
            if (param.type === AnimatorCondition_1.ParamType.AUTO_TRIGGER) {
                param.value = 0;
            }
        });
    };
    AnimatorParams.prototype.getNumber = function (key) {
        var param = this._paramMap.get(key);
        if (param && param.type === AnimatorCondition_1.ParamType.NUMBER) {
            return param.value;
        }
        else {
            return 0;
        }
    };
    AnimatorParams.prototype.getBool = function (key) {
        var param = this._paramMap.get(key);
        if (param && param.type === AnimatorCondition_1.ParamType.BOOLEAN) {
            return param.value;
        }
        else {
            return 0;
        }
    };
    AnimatorParams.prototype.getTrigger = function (key) {
        var param = this._paramMap.get(key);
        if (param && param.type === AnimatorCondition_1.ParamType.TRIGGER) {
            return param.value;
        }
        else {
            return 0;
        }
    };
    AnimatorParams.prototype.getAutoTrigger = function (key) {
        var param = this._paramMap.get(key);
        if (param && param.type === AnimatorCondition_1.ParamType.AUTO_TRIGGER) {
            return param.value;
        }
        else {
            return 0;
        }
    };
    return AnimatorParams;
}());
exports.default = AnimatorParams;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXGNvcmVcXEFuaW1hdG9yUGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQWdEO0FBVWhEOztHQUVHO0FBQ0g7SUFHSSx3QkFBWSxPQUFjO1FBQTFCLGlCQVFDO1FBVk8sY0FBUyxHQUF1QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO1lBQ3RCLElBQUksS0FBSyxHQUFVO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbkIsQ0FBQztZQUNGLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0scUNBQVksR0FBbkIsVUFBb0IsR0FBVztRQUMzQixJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQztTQUNyQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFTSxrQ0FBUyxHQUFoQixVQUFpQixHQUFXLEVBQUUsS0FBYTtRQUN2QyxJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLDZCQUFTLENBQUMsTUFBTSxFQUFFO1lBQzFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVNLGdDQUFPLEdBQWQsVUFBZSxHQUFXLEVBQUUsS0FBYztRQUN0QyxJQUFJLEtB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QyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLDZCQUFTLENBQUMsT0FBTyxFQUFFO1lBQzNDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztTQUN0QjthQUFNO1lBQ0gsT0FBTyxDQUFDLENBQUM7U0FDWjtJQUNMLENBQUM7SUFFTSx1Q0FBYyxHQUFyQixVQUFzQixHQUFXO1FBQzdCLElBQUksS0FBSyxHQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssNkJBQVMsQ0FBQyxZQUFZLEVBQUU7WUFDaEQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ3RCO2FBQU07WUFDSCxPQUFPLENBQUMsQ0FBQztTQUNaO0lBQ0wsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0EzR0EsQUEyR0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhcmFtVHlwZSB9IGZyb20gXCIuL0FuaW1hdG9yQ29uZGl0aW9uXCI7XHJcblxyXG4vKipcclxuICog5Y+C5pWw57uT5p6EXHJcbiAqL1xyXG5pbnRlcmZhY2UgUGFyYW0ge1xyXG4gICAgdHlwZTogUGFyYW1UeXBlO1xyXG4gICAgdmFsdWU6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOeKtuaAgeacuuWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0b3JQYXJhbXMge1xyXG4gICAgcHJpdmF0ZSBfcGFyYW1NYXA6IE1hcDxzdHJpbmcsIFBhcmFtPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhQXJyOiBhbnlbXSkge1xyXG4gICAgICAgIGRhdGFBcnIuZm9yRWFjaCgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbTogUGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBkYXRhLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5pbml0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcmFtTWFwLnNldChkYXRhLnBhcmFtLCBwYXJhbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBhcmFtVHlwZShrZXk6IHN0cmluZyk6IFBhcmFtVHlwZSB7XHJcbiAgICAgICAgbGV0IHBhcmFtOiBQYXJhbSA9IHRoaXMuX3BhcmFtTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChwYXJhbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW0udHlwZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE51bWJlcihrZXk6IHN0cmluZywgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwYXJhbTogUGFyYW0gPSB0aGlzLl9wYXJhbU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0udHlwZSA9PT0gUGFyYW1UeXBlLk5VTUJFUikge1xyXG4gICAgICAgICAgICBwYXJhbS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Qm9vbChrZXk6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgcGFyYW06IFBhcmFtID0gdGhpcy5fcGFyYW1NYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKHBhcmFtICYmIHBhcmFtLnR5cGUgPT09IFBhcmFtVHlwZS5CT09MRUFOKSB7XHJcbiAgICAgICAgICAgIHBhcmFtLnZhbHVlID0gdmFsdWUgPyAxIDogMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRyaWdnZXIoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcGFyYW06IFBhcmFtID0gdGhpcy5fcGFyYW1NYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKHBhcmFtICYmIHBhcmFtLnR5cGUgPT09IFBhcmFtVHlwZS5UUklHR0VSKSB7XHJcbiAgICAgICAgICAgIHBhcmFtLnZhbHVlID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0VHJpZ2dlcihrZXk6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbTogUGFyYW0gPSB0aGlzLl9wYXJhbU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0udHlwZSA9PT0gUGFyYW1UeXBlLlRSSUdHRVIpIHtcclxuICAgICAgICAgICAgcGFyYW0udmFsdWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXV0b1RyaWdnZXIoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcGFyYW06IFBhcmFtID0gdGhpcy5fcGFyYW1NYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKHBhcmFtICYmIHBhcmFtLnR5cGUgPT09IFBhcmFtVHlwZS5BVVRPX1RSSUdHRVIpIHtcclxuICAgICAgICAgICAgcGFyYW0udmFsdWUgPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRBdXRvVHJpZ2dlcihrZXk6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbTogUGFyYW0gPSB0aGlzLl9wYXJhbU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0udHlwZSA9PT0gUGFyYW1UeXBlLkFVVE9fVFJJR0dFUikge1xyXG4gICAgICAgICAgICBwYXJhbS52YWx1ZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldEFsbEF1dG9UcmlnZ2VyKCkge1xyXG4gICAgICAgIHRoaXMuX3BhcmFtTWFwLmZvckVhY2goKHBhcmFtOiBQYXJhbSwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtLnR5cGUgPT09IFBhcmFtVHlwZS5BVVRPX1RSSUdHRVIpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtLnZhbHVlID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROdW1iZXIoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBwYXJhbTogUGFyYW0gPSB0aGlzLl9wYXJhbU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0udHlwZSA9PT0gUGFyYW1UeXBlLk5VTUJFUikge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW0udmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRCb29sKGtleTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgcGFyYW06IFBhcmFtID0gdGhpcy5fcGFyYW1NYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKHBhcmFtICYmIHBhcmFtLnR5cGUgPT09IFBhcmFtVHlwZS5CT09MRUFOKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbS52YWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFRyaWdnZXIoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBwYXJhbTogUGFyYW0gPSB0aGlzLl9wYXJhbU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0udHlwZSA9PT0gUGFyYW1UeXBlLlRSSUdHRVIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtLnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXV0b1RyaWdnZXIoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBwYXJhbTogUGFyYW0gPSB0aGlzLl9wYXJhbU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0udHlwZSA9PT0gUGFyYW1UeXBlLkFVVE9fVFJJR0dFUikge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW0udmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==