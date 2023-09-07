"use strict";
cc._RF.push(module, '9fe50qokDpBJp9/BE0u0VTV', 'Singleton');
// scripts/common/cmpt/base/Singleton.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**单例 */
var Singleton = /** @class */ (function () {
    function Singleton() {
    }
    Singleton.getInstance = function () {
        if (this._instance === null) {
            this._instance = new this();
        }
        return this._instance;
    };
    Singleton._instance = null;
    return Singleton;
}());
exports.default = Singleton;

cc._RF.pop();