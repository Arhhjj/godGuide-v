
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerSliced.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0f3a2cHs8tKfqzmBuX9KEnV', 'MultiAssemblerSliced');
// scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerSliced.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var MultiAssembler_1 = require("./MultiAssembler");
var MultiAssemblerSliced = /** @class */ (function (_super) {
    __extends(MultiAssemblerSliced, _super);
    function MultiAssemblerSliced() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiAssemblerSliced.prototype.initData = function () {
        this.verticesCount = 16;
        this.indicesCount = 54;
        if (this._renderData.meshCount > 0)
            return;
        var data = this._renderData;
        // createFlexData支持创建指定格式的renderData
        data.createFlexData(0, this.verticesCount, this.indicesCount, this.getVfmt());
        var indices = this._renderData.iDatas[0];
        var indexOffset = 0;
        for (var r = 0; r < 3; ++r) {
            for (var c = 0; c < 3; ++c) {
                var start = r * 4 + c;
                indices[indexOffset++] = start;
                indices[indexOffset++] = start + 1;
                indices[indexOffset++] = start + 4;
                indices[indexOffset++] = start + 1;
                indices[indexOffset++] = start + 5;
                indices[indexOffset++] = start + 4;
            }
        }
    };
    MultiAssemblerSliced.prototype.initLocal = function () {
        this._local = [];
        this._local.length = 8;
    };
    MultiAssemblerSliced.prototype.updateRenderData = function (sprite) {
        var frame = sprite._spriteFrame;
        this.packToDynamicAtlas(sprite, frame);
        if (sprite._vertsDirty) {
            this.updateUVs(sprite);
            this.updateVerts(sprite);
            this.updateTextureIdx(sprite);
            sprite._vertsDirty = false;
        }
    };
    MultiAssemblerSliced.prototype.updateVerts = function (sprite) {
        var node = sprite.node, width = node.width, height = node.height, appx = node.anchorX * width, appy = node.anchorY * height;
        var frame = sprite.spriteFrame;
        var leftWidth = frame.insetLeft;
        var rightWidth = frame.insetRight;
        var topHeight = frame.insetTop;
        var bottomHeight = frame.insetBottom;
        var sizableWidth = width - leftWidth - rightWidth;
        var sizableHeight = height - topHeight - bottomHeight;
        var xScale = width / (leftWidth + rightWidth);
        var yScale = height / (topHeight + bottomHeight);
        xScale = (isNaN(xScale) || xScale > 1) ? 1 : xScale;
        yScale = (isNaN(yScale) || yScale > 1) ? 1 : yScale;
        sizableWidth = sizableWidth < 0 ? 0 : sizableWidth;
        sizableHeight = sizableHeight < 0 ? 0 : sizableHeight;
        // update local
        var local = this._local;
        local[0] = -appx;
        local[1] = -appy;
        local[2] = leftWidth * xScale - appx;
        local[3] = bottomHeight * yScale - appy;
        local[4] = local[2] + sizableWidth;
        local[5] = local[3] + sizableHeight;
        local[6] = width - appx;
        local[7] = height - appy;
        this.updateWorldVerts(sprite);
    };
    MultiAssemblerSliced.prototype.updateUVs = function (sprite) {
        var verts = this._renderData.vDatas[0];
        var uvSliced = sprite.spriteFrame.uvSliced;
        var uvOffset = this.uvOffset;
        var floatsPerVert = this.floatsPerVert;
        for (var row = 0; row < 4; ++row) {
            for (var col = 0; col < 4; ++col) {
                var vid = row * 4 + col;
                var uv = uvSliced[vid];
                var voffset = vid * floatsPerVert;
                verts[voffset + uvOffset] = uv.u;
                verts[voffset + uvOffset + 1] = uv.v;
            }
        }
    };
    MultiAssemblerSliced.prototype.updateWorldVerts = function (sprite) {
        var matrix = sprite.node._worldMatrix;
        var matrixm = matrix.m, a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5], tx = matrixm[12], ty = matrixm[13];
        var local = this._local;
        var world = this._renderData.vDatas[0];
        var floatsPerVert = this.floatsPerVert;
        for (var row = 0; row < 4; ++row) {
            var localRowY = local[row * 2 + 1];
            for (var col = 0; col < 4; ++col) {
                var localColX = local[col * 2];
                var worldIndex = (row * 4 + col) * floatsPerVert;
                world[worldIndex] = localColX * a + localRowY * c + tx;
                world[worldIndex + 1] = localColX * b + localRowY * d + ty;
            }
        }
    };
    return MultiAssemblerSliced;
}(MultiAssembler_1.default));
exports.default = MultiAssemblerSliced;
if (CC_NATIVERENDERER) {
    var proto = MultiAssemblerSliced.prototype;
    //@ts-ignore
    var nativeProto_1 = renderer.SlicedSprite2D.prototype;
    proto.updateWorldVerts = function (comp) {
        //@ts-ignore
        this._dirtyPtr[0] |= cc.Assembler.FLAG_VERTICES_DIRTY;
    };
    //@ts-ignore
    proto._extendNative = function () {
        nativeProto_1.ctor.call(this);
    };
    proto.initLocal = function () {
        this._local = new Float32Array(8);
        nativeProto_1.setLocalData.call(this, this._local);
    };
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcbXVsdGlUZXh0dXJlXFxhc3NlbWJsZXJcXE11bHRpQXNzZW1ibGVyU2xpY2VkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUU5QztJQUFrRCx3Q0FBYztJQUFoRTs7SUFnSEEsQ0FBQztJQS9HVSx1Q0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxDQUFDO1lBQUUsT0FBTztRQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFOUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDL0IsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFH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Q0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQztDQUNMIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE11bHRpQXNzZW1ibGVyIGZyb20gXCIuL011bHRpQXNzZW1ibGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdWx0aUFzc2VtYmxlclNsaWNlZCBleHRlbmRzIE11bHRpQXNzZW1ibGVyIHtcclxuICAgIHB1YmxpYyBpbml0RGF0YSgpIHtcclxuICAgICAgICB0aGlzLnZlcnRpY2VzQ291bnQgPSAxNjtcclxuICAgICAgICB0aGlzLmluZGljZXNDb3VudCA9IDU0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcmVuZGVyRGF0YS5tZXNoQ291bnQgPiAwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9yZW5kZXJEYXRhO1xyXG4gICAgICAgIC8vIGNyZWF0ZUZsZXhEYXRh5pSv5oyB5Yib5bu65oyH5a6a5qC85byP55qEcmVuZGVyRGF0YVxyXG4gICAgICAgIGRhdGEuY3JlYXRlRmxleERhdGEoMCwgdGhpcy52ZXJ0aWNlc0NvdW50LCB0aGlzLmluZGljZXNDb3VudCwgdGhpcy5nZXRWZm10KCkpO1xyXG5cclxuICAgICAgICBsZXQgaW5kaWNlcyA9IHRoaXMuX3JlbmRlckRhdGEuaURhdGFzWzBdO1xyXG4gICAgICAgIGxldCBpbmRleE9mZnNldCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCAzOyArK3IpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCAzOyArK2MpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHIgKiA0ICsgYztcclxuICAgICAgICAgICAgICAgIGluZGljZXNbaW5kZXhPZmZzZXQrK10gPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIGluZGljZXNbaW5kZXhPZmZzZXQrK10gPSBzdGFydCArIDE7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzW2luZGV4T2Zmc2V0KytdID0gc3RhcnQgKyA0O1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlc1tpbmRleE9mZnNldCsrXSA9IHN0YXJ0ICsgMTtcclxuICAgICAgICAgICAgICAgIGluZGljZXNbaW5kZXhPZmZzZXQrK10gPSBzdGFydCArIDU7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzW2luZGV4T2Zmc2V0KytdID0gc3RhcnQgKyA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0TG9jYWwoKSB7XHJcbiAgICAgICAgdGhpcy5fbG9jYWwgPSBbXTtcclxuICAgICAgICB0aGlzLl9sb2NhbC5sZW5ndGggPSA4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVSZW5kZXJEYXRhKHNwcml0ZSkge1xyXG4gICAgICAgIGxldCBmcmFtZSA9IHNwcml0ZS5fc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgdGhpcy5wYWNrVG9EeW5hbWljQXRsYXMoc3ByaXRlLCBmcmFtZSk7XHJcblxyXG4gICAgICAgIGlmIChzcHJpdGUuX3ZlcnRzRGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVVVnMoc3ByaXRlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWZXJ0cyhzcHJpdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHR1cmVJZHgoc3ByaXRlKTtcclxuICAgICAgICAgICAgc3ByaXRlLl92ZXJ0c0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVWZXJ0cyhzcHJpdGUpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IHNwcml0ZS5ub2RlLFxyXG4gICAgICAgICAgICB3aWR0aCA9IG5vZGUud2lkdGgsIGhlaWdodCA9IG5vZGUuaGVpZ2h0LFxyXG4gICAgICAgICAgICBhcHB4ID0gbm9kZS5hbmNob3JYICogd2lkdGgsIGFwcHkgPSBub2RlLmFuY2hvclkgKiBoZWlnaHQ7XHJcblxyXG4gICAgICAgIGxldCBmcmFtZSA9IHNwcml0ZS5zcHJpdGVGcmFtZTtcclxuICAgICAgICBsZXQgbGVmdFdpZHRoID0gZnJhbWUuaW5zZXRMZWZ0O1xyXG4gICAgICAgIGxldCByaWdodFdpZHRoID0gZnJhbWUuaW5zZXRSaWdodDtcclxuICAgICAgICBsZXQgdG9wSGVpZ2h0ID0gZnJhbWUuaW5zZXRUb3A7XHJcbiAgICAgICAgbGV0IGJvdHRvbUhlaWdodCA9IGZyYW1lLmluc2V0Qm90dG9tO1xyXG5cclxuICAgICAgICBsZXQgc2l6YWJsZVdpZHRoID0gd2lkdGggLSBsZWZ0V2lkdGggLSByaWdodFdpZHRoO1xyXG4gICAgICAgIGxldCBzaXphYmxlSGVpZ2h0ID0gaGVpZ2h0IC0gdG9wSGVpZ2h0IC0gYm90dG9tSGVpZ2h0O1xyXG4gICAgICAgIGxldCB4U2NhbGUgPSB3aWR0aCAvIChsZWZ0V2lkdGggKyByaWdodFdpZHRoKTtcclxuICAgICAgICBsZXQgeVNjYWxlID0gaGVpZ2h0IC8gKHRvcEhlaWdodCArIGJvdHRvbUhlaWdodCk7XHJcbiAgICAgICAgeFNjYWxlID0gKGlzTmFOKHhTY2FsZSkgfHwgeFNjYWxlID4gMSkgPyAxIDogeFNjYWxlO1xyXG4gICAgICAgIHlTY2FsZSA9IChpc05hTih5U2NhbGUpIHx8IHlTY2FsZSA+IDEpID8gMSA6IHlTY2FsZTtcclxuICAgICAgICBzaXphYmxlV2lkdGggPSBzaXphYmxlV2lkdGggPCAwID8gMCA6IHNpemFibGVXaWR0aDtcclxuICAgICAgICBzaXphYmxlSGVpZ2h0ID0gc2l6YWJsZUhlaWdodCA8IDAgPyAwIDogc2l6YWJsZUhlaWdodDtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIGxvY2FsXHJcbiAgICAgICAgbGV0IGxvY2FsID0gdGhpcy5fbG9jYWw7XHJcbiAgICAgICAgbG9jYWxbMF0gPSAtYXBweDtcclxuICAgICAgICBsb2NhbFsxXSA9IC1hcHB5O1xyXG4gICAgICAgIGxvY2FsWzJdID0gbGVmdFdpZHRoICogeFNjYWxlIC0gYXBweDtcclxuICAgICAgICBsb2NhbFszXSA9IGJvdHRvbUhlaWdodCAqIHlTY2FsZSAtIGFwcHk7XHJcbiAgICAgICAgbG9jYWxbNF0gPSBsb2NhbFsyXSArIHNpemFibGVXaWR0aDtcclxuICAgICAgICBsb2NhbFs1XSA9IGxvY2FsWzNdICsgc2l6YWJsZUhlaWdodDtcclxuICAgICAgICBsb2NhbFs2XSA9IHdpZHRoIC0gYXBweDtcclxuICAgICAgICBsb2NhbFs3XSA9IGhlaWdodCAtIGFwcHk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlV29ybGRWZXJ0cyhzcHJpdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVVVnMoc3ByaXRlKSB7XHJcbiAgICAgICAgbGV0IHZlcnRzID0gdGhpcy5fcmVuZGVyRGF0YS52RGF0YXNbMF07XHJcbiAgICAgICAgbGV0IHV2U2xpY2VkID0gc3ByaXRlLnNwcml0ZUZyYW1lLnV2U2xpY2VkO1xyXG4gICAgICAgIGxldCB1dk9mZnNldCA9IHRoaXMudXZPZmZzZXQ7XHJcbiAgICAgICAgbGV0IGZsb2F0c1BlclZlcnQgPSB0aGlzLmZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgNDsgKytyb3cpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgNDsgKytjb2wpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2aWQgPSByb3cgKiA0ICsgY29sO1xyXG4gICAgICAgICAgICAgICAgbGV0IHV2ID0gdXZTbGljZWRbdmlkXTtcclxuICAgICAgICAgICAgICAgIGxldCB2b2Zmc2V0ID0gdmlkICogZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgICAgIHZlcnRzW3ZvZmZzZXQgKyB1dk9mZnNldF0gPSB1di51O1xyXG4gICAgICAgICAgICAgICAgdmVydHNbdm9mZnNldCArIHV2T2Zmc2V0ICsgMV0gPSB1di52O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVXb3JsZFZlcnRzKHNwcml0ZSkge1xyXG4gICAgICAgIGxldCBtYXRyaXggPSBzcHJpdGUubm9kZS5fd29ybGRNYXRyaXg7XHJcbiAgICAgICAgbGV0IG1hdHJpeG0gPSBtYXRyaXgubSxcclxuICAgICAgICAgICAgYSA9IG1hdHJpeG1bMF0sIGIgPSBtYXRyaXhtWzFdLCBjID0gbWF0cml4bVs0XSwgZCA9IG1hdHJpeG1bNV0sXHJcbiAgICAgICAgICAgIHR4ID0gbWF0cml4bVsxMl0sIHR5ID0gbWF0cml4bVsxM107XHJcblxyXG4gICAgICAgIGxldCBsb2NhbCA9IHRoaXMuX2xvY2FsO1xyXG4gICAgICAgIGxldCB3b3JsZCA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xyXG5cclxuICAgICAgICBsZXQgZmxvYXRzUGVyVmVydCA9IHRoaXMuZmxvYXRzUGVyVmVydDtcclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCA0OyArK3Jvdykge1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxSb3dZID0gbG9jYWxbcm93ICogMiArIDFdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCA0OyArK2NvbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsQ29sWCA9IGxvY2FsW2NvbCAqIDJdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdvcmxkSW5kZXggPSAocm93ICogNCArIGNvbCkgKiBmbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgICAgICAgICAgd29ybGRbd29ybGRJbmRleF0gPSBsb2NhbENvbFggKiBhICsgbG9jYWxSb3dZICogYyArIHR4O1xyXG4gICAgICAgICAgICAgICAgd29ybGRbd29ybGRJbmRleCArIDFdID0gbG9jYWxDb2xYICogYiArIGxvY2FsUm93WSAqIGQgKyB0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaWYgKENDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICBsZXQgcHJvdG8gPSBNdWx0aUFzc2VtYmxlclNsaWNlZC5wcm90b3R5cGU7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGxldCBuYXRpdmVQcm90byA9IHJlbmRlcmVyLlNsaWNlZFNwcml0ZTJELnByb3RvdHlwZTtcclxuXHJcbiAgICBwcm90by51cGRhdGVXb3JsZFZlcnRzID0gZnVuY3Rpb24gKGNvbXApIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLl9kaXJ0eVB0clswXSB8PSBjYy5Bc3NlbWJsZXIuRkxBR19WRVJUSUNFU19ESVJUWTtcclxuICAgIH07XHJcblxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBwcm90by5fZXh0ZW5kTmF0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5hdGl2ZVByb3RvLmN0b3IuY2FsbCh0aGlzKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uaW5pdExvY2FsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2xvY2FsID0gbmV3IEZsb2F0MzJBcnJheSg4KTtcclxuICAgICAgICBuYXRpdmVQcm90by5zZXRMb2NhbERhdGEuY2FsbCh0aGlzLCB0aGlzLl9sb2NhbCk7XHJcbiAgICB9O1xyXG59XHJcbiJdfQ==