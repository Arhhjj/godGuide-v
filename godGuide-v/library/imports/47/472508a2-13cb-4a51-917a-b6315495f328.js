"use strict";
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