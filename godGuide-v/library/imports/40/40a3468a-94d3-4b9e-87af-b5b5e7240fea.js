"use strict";
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