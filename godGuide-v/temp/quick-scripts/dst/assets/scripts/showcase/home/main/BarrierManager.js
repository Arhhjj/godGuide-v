
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/showcase/home/main/BarrierManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '40a34aKlNNLnoevtbXnJA/q', 'BarrierManager');
// scripts/showcase/home/Card/BarrierManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Barrier_1 = require("./Barrier");
/**掉落物管理类 */
var BarrierManager = /** @class */ (function () {
    function BarrierManager(barrierArea) {
        this.barrierArea = null;
        this.barrierArea = barrierArea;
    }
    BarrierManager.prototype.createBarrier = function () {
        var barrier = new cc.Node();
        barrier.setParent(this.barrierArea);
        var barrierCmpt = barrier.addComponent(Barrier_1.default);
        barrierCmpt.init(); //记录此cmpt的唯一标识
        barrierCmpt.move();
    };
    return BarrierManager;
}());
exports.default = BarrierManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2hvd2Nhc2VcXGhvbWVcXENhcmRcXEJhcnJpZXJNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQStCO0FBRS9CLFlBQVk7QUFDWjtJQUdJLHdCQUFZLFdBQW9CO1FBRnhCLGdCQUFXLEdBQVksSUFBSSxDQUFBO1FBRy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxzQ0FBYSxHQUFiO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFFbkMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUE7UUFDakQsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBLENBQUMsY0FBYztRQUNqQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0FoQkEsQUFnQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXJyaWVyIGZyb20gXCIuL0JhcnJpZXJcIlxyXG5cclxuLyoq5o6J6JC954mp566h55CG57G7ICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhcnJpZXJNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgYmFycmllckFyZWE6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFycmllckFyZWE6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLmJhcnJpZXJBcmVhID0gYmFycmllckFyZWFcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCYXJyaWVyKCkge1xyXG4gICAgICAgIGNvbnN0IGJhcnJpZXIgPSBuZXcgY2MuTm9kZSgpXHJcbiAgICAgICAgYmFycmllci5zZXRQYXJlbnQodGhpcy5iYXJyaWVyQXJlYSlcclxuXHJcbiAgICAgICAgY29uc3QgYmFycmllckNtcHQgPSBiYXJyaWVyLmFkZENvbXBvbmVudChCYXJyaWVyKVxyXG4gICAgICAgIGJhcnJpZXJDbXB0LmluaXQoKSAvL+iusOW9leatpGNtcHTnmoTllK/kuIDmoIfor4ZcclxuICAgICAgICBiYXJyaWVyQ21wdC5tb3ZlKClcclxuICAgIH1cclxuXHJcbn0iXX0=