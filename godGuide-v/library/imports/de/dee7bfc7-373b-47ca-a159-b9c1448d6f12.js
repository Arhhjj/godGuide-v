"use strict";
cc._RF.push(module, 'dee7b/HNztHyqFZucFEjW8S', 'AnimatorCondition');
// scripts/animator/core/AnimatorCondition.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicType = exports.ParamType = void 0;
/** 参数类型 */
var ParamType;
(function (ParamType) {
    ParamType[ParamType["COMPLETE"] = 0] = "COMPLETE";
    ParamType[ParamType["BOOLEAN"] = 1] = "BOOLEAN";
    ParamType[ParamType["NUMBER"] = 2] = "NUMBER";
    ParamType[ParamType["TRIGGER"] = 3] = "TRIGGER";
    ParamType[ParamType["AUTO_TRIGGER"] = 4] = "AUTO_TRIGGER";
})(ParamType = exports.ParamType || (exports.ParamType = {}));
/** 逻辑类型 */
var LogicType;
(function (LogicType) {
    LogicType[LogicType["EQUAL"] = 0] = "EQUAL";
    LogicType[LogicType["NOTEQUAL"] = 1] = "NOTEQUAL";
    LogicType[LogicType["GREATER"] = 2] = "GREATER";
    LogicType[LogicType["LESS"] = 3] = "LESS";
    LogicType[LogicType["GREATER_EQUAL"] = 4] = "GREATER_EQUAL";
    LogicType[LogicType["LESS_EQUAL"] = 5] = "LESS_EQUAL";
})(LogicType = exports.LogicType || (exports.LogicType = {}));
/**
 * 单项条件
 */
var AnimatorCondition = /** @class */ (function () {
    function AnimatorCondition(data, ac) {
        this._ac = null;
        /** 此条件对应的参数名 */
        this._param = "";
        /** 此条件对应的值 */
        this._value = 0;
        /** 此条件与值比较的逻辑 */
        this._logic = LogicType.EQUAL;
        this._ac = ac;
        this._param = data.param;
        this._value = data.value;
        this._logic = data.logic;
    }
    AnimatorCondition.prototype.getParamName = function () {
        return this._param;
    };
    AnimatorCondition.prototype.getParamType = function () {
        return this._ac.params.getParamType(this._param);
    };
    /** 判断此条件是否满足 */
    AnimatorCondition.prototype.check = function () {
        var type = this.getParamType();
        if (type === ParamType.BOOLEAN) {
            return this._ac.params.getBool(this._param) === this._value;
        }
        else if (type === ParamType.NUMBER) {
            var value = this._ac.params.getNumber(this._param);
            switch (this._logic) {
                case LogicType.EQUAL:
                    return value === this._value;
                case LogicType.NOTEQUAL:
                    return value !== this._value;
                case LogicType.GREATER:
                    return value > this._value;
                case LogicType.LESS:
                    return value < this._value;
                case LogicType.GREATER_EQUAL:
                    return value >= this._value;
                case LogicType.LESS_EQUAL:
                    return value <= this._value;
                default:
                    return false;
            }
        }
        else if (type === ParamType.AUTO_TRIGGER) {
            return this._ac.params.getAutoTrigger(this._param) !== 0;
        }
        else if (type === ParamType.TRIGGER) {
            return this._ac.params.getTrigger(this._param) !== 0;
        }
        else {
            cc.error("[AnimatorCondition.check] \u9519\u8BEF\u7684type: " + type);
            return false;
        }
    };
    return AnimatorCondition;
}());
exports.default = AnimatorCondition;

cc._RF.pop();