
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/scenes/Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eef8c5qJslOQ71iswi/FuxY', 'Main');
// scripts/showcase/scenes/Main.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Layer_1 = require("../../common/cmpt/base/Layer");
var Url_1 = require("../../common/const/Url");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.start = function () {
        Layer_1.default.inst.enterMain(Url_1.ResUrl.PREFAB.HOME);
        // 60s清理一次缓存
        // this.schedule(() => {
        //     Res.releaseAll();
        // }, 60);
    };
    Main.prototype.lateUpdate = function () { };
    Main = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXHNjZW5lc1xcTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBaUQ7QUFDakQsOENBQWdEO0FBRzFDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDOztJQVdBLENBQUM7SUFUYSxvQkFBSyxHQUFmO1FBQ0ksZUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxZQUFZO1FBQ1osd0JBQXdCO1FBQ3hCLHdCQUF3QjtRQUN4QixVQUFVO0lBQ2QsQ0FBQztJQUVTLHlCQUFVLEdBQXBCLGNBQXlCLENBQUM7SUFWVCxJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBV3hCO0lBQUQsV0FBQztDQVhELEFBV0MsQ0FYaUMsRUFBRSxDQUFDLFNBQVMsR0FXN0M7a0JBWG9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF5ZXIgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbXB0L2Jhc2UvTGF5ZXJcIjtcclxuaW1wb3J0IHsgUmVzVXJsIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25zdC9VcmxcIjtcclxuaW1wb3J0IFJlcyBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWwvUmVzXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCkge1xyXG4gICAgICAgIExheWVyLmluc3QuZW50ZXJNYWluKFJlc1VybC5QUkVGQUIuSE9NRSk7XHJcbiAgICAgICAgLy8gNjBz5riF55CG5LiA5qyh57yT5a2YXHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIFJlcy5yZWxlYXNlQWxsKCk7XHJcbiAgICAgICAgLy8gfSwgNjApO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsYXRlVXBkYXRlKCkgeyB9XHJcbn1cclxuIl19