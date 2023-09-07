
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/shader/ShaderTile.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e6e3agdOnJF/o7rgEOg4Iq+', 'ShaderTile');
// scripts/common/cmpt/shader/ShaderTile.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple, executeInEditMode = _a.executeInEditMode;
var ShaderTile = /** @class */ (function (_super) {
    __extends(ShaderTile, _super);
    function ShaderTile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scale = new cc.Vec2(1, 1);
        _this.offset = new cc.Vec2(0, 0);
        _this._mat = null;
        return _this;
    }
    Object.defineProperty(ShaderTile.prototype, "mat", {
        get: function () {
            if (!this._mat) {
                this._mat = this.getComponent(cc.RenderComponent).getMaterial(0);
            }
            return this._mat;
        },
        enumerable: false,
        configurable: true
    });
    ShaderTile.prototype.start = function () {
        this.updateShader();
    };
    ShaderTile.prototype.update = function () {
        if (CC_EDITOR) {
            this.updateShader();
        }
    };
    ShaderTile.prototype.updateShader = function () {
        this.mat.setProperty("tile", new cc.Vec4(this.scale.x, this.scale.y, this.offset.x, this.offset.y));
    };
    __decorate([
        property({ tooltip: CC_DEV && "uv坐标缩放倍数" })
    ], ShaderTile.prototype, "scale", void 0);
    __decorate([
        property({ tooltip: CC_DEV && "uv坐标偏移值" })
    ], ShaderTile.prototype, "offset", void 0);
    ShaderTile = __decorate([
        ccclass,
        disallowMultiple,
        executeInEditMode,
        menu("Framework/Shader/ShaderTile")
    ], ShaderTile);
    return ShaderTile;
}(cc.Component));
exports.default = ShaderTile;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFxzaGFkZXJcXFNoYWRlclRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFtRSxFQUFFLENBQUMsVUFBVSxFQUE5RSxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxpQkFBaUIsdUJBQWtCLENBQUM7QUFNdkY7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUEyQkM7UUF6QlUsV0FBSyxHQUFZLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbkMsWUFBTSxHQUFZLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbkMsVUFBSSxHQUFnQixJQUFJLENBQUM7O0lBcUJyQyxDQUFDO0lBcEJHLHNCQUFXLDJCQUFHO2FBQWQ7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRTtZQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVTLDBCQUFLLEdBQWY7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVTLDJCQUFNLEdBQWhCO1FBQ0ksSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRU0saUNBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBeEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxVQUFVLEVBQUUsQ0FBQzs2Q0FDRjtJQUUxQztRQURDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLENBQUM7OENBQ0E7SUFKMUIsVUFBVTtRQUo5QixPQUFPO1FBQ1AsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsNkJBQTZCLENBQUM7T0FDZixVQUFVLENBMkI5QjtJQUFELGlCQUFDO0NBM0JELEFBMkJDLENBM0J1QyxFQUFFLENBQUMsU0FBUyxHQTJCbkQ7a0JBM0JvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSwgZGlzYWxsb3dNdWx0aXBsZSwgZXhlY3V0ZUluRWRpdE1vZGUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AZGlzYWxsb3dNdWx0aXBsZVxyXG5AZXhlY3V0ZUluRWRpdE1vZGVcclxuQG1lbnUoXCJGcmFtZXdvcmsvU2hhZGVyL1NoYWRlclRpbGVcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZGVyVGlsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBDQ19ERVYgJiYgXCJ1duWdkOagh+e8qeaUvuWAjeaVsFwiIH0pXHJcbiAgICBwdWJsaWMgc2NhbGU6IGNjLlZlYzIgPSBuZXcgY2MuVmVjMigxLCAxKTtcclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IENDX0RFViAmJiBcInV25Z2Q5qCH5YGP56e75YC8XCIgfSlcclxuICAgIHB1YmxpYyBvZmZzZXQ6IGNjLlZlYzIgPSBuZXcgY2MuVmVjMigwLCAwKTtcclxuXHJcbiAgICBwcml2YXRlIF9tYXQ6IGNjLk1hdGVyaWFsID0gbnVsbDtcclxuICAgIHB1YmxpYyBnZXQgbWF0KCk6IGNjLk1hdGVyaWFsIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXQgPSB0aGlzLmdldENvbXBvbmVudChjYy5SZW5kZXJDb21wb25lbnQpLmdldE1hdGVyaWFsKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNoYWRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2hhZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWF0LnNldFByb3BlcnR5KFwidGlsZVwiLCBuZXcgY2MuVmVjNCh0aGlzLnNjYWxlLngsIHRoaXMuc2NhbGUueSwgdGhpcy5vZmZzZXQueCwgdGhpcy5vZmZzZXQueSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==