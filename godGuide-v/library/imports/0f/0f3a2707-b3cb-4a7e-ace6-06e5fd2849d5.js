"use strict";
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