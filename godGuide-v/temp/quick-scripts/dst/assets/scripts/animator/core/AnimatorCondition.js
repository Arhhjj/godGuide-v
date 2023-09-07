
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/animator/core/AnimatorCondition.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYW5pbWF0b3JcXGNvcmVcXEFuaW1hdG9yQ29uZGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFdBQVc7QUFDWCxJQUFZLFNBTVg7QUFORCxXQUFZLFNBQVM7SUFDakIsaURBQVksQ0FBQTtJQUNaLCtDQUFXLENBQUE7SUFDWCw2Q0FBVSxDQUFBO0lBQ1YsK0NBQVcsQ0FBQTtJQUNYLHlEQUFnQixDQUFBO0FBQ3BCLENBQUMsRUFOVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQU1wQjtBQUVELFdBQVc7QUFDWCxJQUFZLFNBT1g7QUFQRCxXQUFZLFNBQVM7SUFDakIsMkNBQVMsQ0FBQTtJQUNULGlEQUFZLENBQUE7SUFDWiwrQ0FBVyxDQUFBO0lBQ1gseUNBQVEsQ0FBQTtJQUNSLDJEQUFpQixDQUFBO0lBQ2pCLHFEQUFjLENBQUE7QUFDbEIsQ0FBQyxFQVBXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBT3BCO0FBRUQ7O0dBRUc7QUFDSDtJQVNJLDJCQUFZLElBQVMsRUFBRSxFQUFzQjtRQVJyQyxRQUFHLEdBQXVCLElBQUksQ0FBQztRQUN2QyxnQkFBZ0I7UUFDUixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQzVCLGNBQWM7UUFDTixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLGlCQUFpQjtRQUNULFdBQU0sR0FBYyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBR3hDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVNLHdDQUFZLEdBQW5CO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSx3Q0FBWSxHQUFuQjtRQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ1QsaUNBQUssR0FBWjtRQUNJLElBQUksSUFBSSxHQUFjLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQyxJQUFJLElBQUksS0FBSyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQy9EO2FBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNELFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsS0FBSyxTQUFTLENBQUMsS0FBSztvQkFDaEIsT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDakMsS0FBSyxTQUFTLENBQUMsUUFBUTtvQkFDbkIsT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDakMsS0FBSyxTQUFTLENBQUMsT0FBTztvQkFDbEIsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDL0IsS0FBSyxTQUFTLENBQUMsSUFBSTtvQkFDZixPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMvQixLQUFLLFNBQVMsQ0FBQyxhQUFhO29CQUN4QixPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNoQyxLQUFLLFNBQVMsQ0FBQyxVQUFVO29CQUNyQixPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNoQztvQkFDSSxPQUFPLEtBQUssQ0FBQzthQUNwQjtTQUNKO2FBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxDQUFDLFlBQVksRUFBRTtZQUN4QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVEO2FBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNuQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDSCxFQUFFLENBQUMsS0FBSyxDQUFDLHVEQUFzQyxJQUFNLENBQUMsQ0FBQztZQUN2RCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFDTCx3QkFBQztBQUFELENBeERBLEFBd0RDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQW5pbWF0b3JDb250cm9sbGVyIGZyb20gXCIuL0FuaW1hdG9yQ29udHJvbGxlclwiO1xyXG5cclxuLyoqIOWPguaVsOexu+WeiyAqL1xyXG5leHBvcnQgZW51bSBQYXJhbVR5cGUge1xyXG4gICAgQ09NUExFVEUgPSAwLFxyXG4gICAgQk9PTEVBTiA9IDEsXHJcbiAgICBOVU1CRVIgPSAyLFxyXG4gICAgVFJJR0dFUiA9IDMsXHJcbiAgICBBVVRPX1RSSUdHRVIgPSA0XHJcbn1cclxuXHJcbi8qKiDpgLvovpHnsbvlnosgKi9cclxuZXhwb3J0IGVudW0gTG9naWNUeXBlIHtcclxuICAgIEVRVUFMID0gMCxcclxuICAgIE5PVEVRVUFMID0gMSxcclxuICAgIEdSRUFURVIgPSAyLFxyXG4gICAgTEVTUyA9IDMsXHJcbiAgICBHUkVBVEVSX0VRVUFMID0gNCxcclxuICAgIExFU1NfRVFVQUwgPSA1XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDljZXpobnmnaHku7ZcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1hdG9yQ29uZGl0aW9uIHtcclxuICAgIHByaXZhdGUgX2FjOiBBbmltYXRvckNvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgLyoqIOatpOadoeS7tuWvueW6lOeahOWPguaVsOWQjSAqL1xyXG4gICAgcHJpdmF0ZSBfcGFyYW06IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKiog5q2k5p2h5Lu25a+55bqU55qE5YC8ICovXHJcbiAgICBwcml2YXRlIF92YWx1ZTogbnVtYmVyID0gMDtcclxuICAgIC8qKiDmraTmnaHku7bkuI7lgLzmr5TovoPnmoTpgLvovpEgKi9cclxuICAgIHByaXZhdGUgX2xvZ2ljOiBMb2dpY1R5cGUgPSBMb2dpY1R5cGUuRVFVQUw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YTogYW55LCBhYzogQW5pbWF0b3JDb250cm9sbGVyKSB7XHJcbiAgICAgICAgdGhpcy5fYWMgPSBhYztcclxuICAgICAgICB0aGlzLl9wYXJhbSA9IGRhdGEucGFyYW07XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBkYXRhLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2xvZ2ljID0gZGF0YS5sb2dpYztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFyYW1OYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFyYW1UeXBlKCk6IFBhcmFtVHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjLnBhcmFtcy5nZXRQYXJhbVR5cGUodGhpcy5fcGFyYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDliKTmlq3mraTmnaHku7bmmK/lkKbmu6HotrMgKi9cclxuICAgIHB1YmxpYyBjaGVjaygpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgdHlwZTogUGFyYW1UeXBlID0gdGhpcy5nZXRQYXJhbVR5cGUoKTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gUGFyYW1UeXBlLkJPT0xFQU4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FjLnBhcmFtcy5nZXRCb29sKHRoaXMuX3BhcmFtKSA9PT0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBQYXJhbVR5cGUuTlVNQkVSKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gdGhpcy5fYWMucGFyYW1zLmdldE51bWJlcih0aGlzLl9wYXJhbSk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fbG9naWMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9naWNUeXBlLkVRVUFMOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIExvZ2ljVHlwZS5OT1RFUVVBTDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBMb2dpY1R5cGUuR1JFQVRFUjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPiB0aGlzLl92YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9naWNUeXBlLkxFU1M6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlIDwgdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIExvZ2ljVHlwZS5HUkVBVEVSX0VRVUFMOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA+PSB0aGlzLl92YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9naWNUeXBlLkxFU1NfRVFVQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlIDw9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFBhcmFtVHlwZS5BVVRPX1RSSUdHRVIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FjLnBhcmFtcy5nZXRBdXRvVHJpZ2dlcih0aGlzLl9wYXJhbSkgIT09IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBQYXJhbVR5cGUuVFJJR0dFUikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYWMucGFyYW1zLmdldFRyaWdnZXIodGhpcy5fcGFyYW0pICE9PSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGBbQW5pbWF0b3JDb25kaXRpb24uY2hlY2tdIOmUmeivr+eahHR5cGU6ICR7dHlwZX1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=