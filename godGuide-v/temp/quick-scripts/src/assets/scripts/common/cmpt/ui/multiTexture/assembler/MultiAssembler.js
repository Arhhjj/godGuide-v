"use strict";
cc._RF.push(module, 'ac3d4pn45pPbIIUTWTJWqn4', 'MultiAssembler');
// scripts/common/cmpt/ui/multiTexture/assembler/MultiAssembler.ts

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
var gfx = cc["gfx"];
var vfmtPosUvColorIndex = new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
    { name: "a_texture_idx", type: gfx.ATTR_TYPE_FLOAT32, num: 1 },
]);
var MultiAssembler = /** @class */ (function (_super) {
    __extends(MultiAssembler, _super);
    function MultiAssembler() {
        var _this = _super.call(this) || this;
        /** 每个顶点的数据长度 */
        _this.floatsPerVert = 6;
        _this.verticesCount = 4;
        _this.indicesCount = 6;
        _this.uvOffset = 2;
        _this.colorOffset = 4;
        _this.textureIdxOffset = 5;
        _this._renderData = null;
        _this._local = [];
        _this._renderData = new cc["RenderData"]();
        _this._renderData.init(_this);
        _this.initData();
        _this.initLocal();
        return _this;
    }
    Object.defineProperty(MultiAssembler.prototype, "verticesFloats", {
        get: function () {
            return this.verticesCount * this.floatsPerVert;
        },
        enumerable: false,
        configurable: true
    });
    MultiAssembler.prototype.initData = function () {
        var data = this._renderData;
        // createFlexData支持创建指定格式的renderData
        data.createFlexData(0, this.verticesCount, this.indicesCount, this.getVfmt());
        // createFlexData不会填充顶点索引信息，手动补充一下
        var indices = data.iDatas[0];
        var count = indices.length / 6;
        for (var i = 0, idx = 0; i < count; i++) {
            var vertextID = i * 4;
            indices[idx++] = vertextID;
            indices[idx++] = vertextID + 1;
            indices[idx++] = vertextID + 2;
            indices[idx++] = vertextID + 1;
            indices[idx++] = vertextID + 3;
            indices[idx++] = vertextID + 2;
        }
    };
    MultiAssembler.prototype.initLocal = function () {
        this._local = [];
        this._local.length = 4;
    };
    MultiAssembler.prototype.getBuffer = function (v) {
        return cc.renderer["_handle"].getBuffer("mesh", this.getVfmt());
    };
    MultiAssembler.prototype.getVfmt = function () {
        return vfmtPosUvColorIndex;
    };
    MultiAssembler.prototype.updateColor = function (comp, color) {
        if (CC_NATIVERENDERER) {
            this["_dirtyPtr"][0] |= cc.Assembler["FLAG_VERTICES_OPACITY_CHANGED"];
        }
        var uintVerts = this._renderData.uintVDatas[0];
        if (!uintVerts)
            return;
        color = color != null ? color : comp.node.color._val;
        var floatsPerVert = this.floatsPerVert;
        var colorOffset = this.colorOffset;
        for (var i = colorOffset, l = uintVerts.length; i < l; i += floatsPerVert) {
            uintVerts[i] = color;
        }
    };
    MultiAssembler.prototype.updateTextureIdx = function (sprite) {
        var verts = this._renderData.vDatas[0];
        for (var i = 0; i < this.verticesCount; i++) {
            var dstOffset = this.floatsPerVert * i + this.textureIdxOffset;
            verts[dstOffset] = sprite.textureIdx;
        }
    };
    MultiAssembler.prototype.updateWorldVerts = function (comp) {
        var local = this._local;
        var verts = this._renderData.vDatas[0];
        var matrix = comp.node._worldMatrix;
        var matrixm = matrix.m, a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5], tx = matrixm[12], ty = matrixm[13];
        var vl = local[0], vr = local[2], vb = local[1], vt = local[3];
        var floatsPerVert = this.floatsPerVert;
        var vertexOffset = 0;
        var justTranslate = a === 1 && b === 0 && c === 0 && d === 1;
        if (CC_NATIVERENDERER) {
            // left bottom
            verts[vertexOffset] = vl;
            verts[vertexOffset + 1] = vb;
            vertexOffset += floatsPerVert;
            // right bottom
            verts[vertexOffset] = vr;
            verts[vertexOffset + 1] = vb;
            vertexOffset += floatsPerVert;
            // left top
            verts[vertexOffset] = vl;
            verts[vertexOffset + 1] = vt;
            vertexOffset += floatsPerVert;
            // right top
            verts[vertexOffset] = vr;
            verts[vertexOffset + 1] = vt;
        }
        else {
            if (justTranslate) {
                // left bottom
                verts[vertexOffset] = vl + tx;
                verts[vertexOffset + 1] = vb + ty;
                vertexOffset += floatsPerVert;
                // right bottom
                verts[vertexOffset] = vr + tx;
                verts[vertexOffset + 1] = vb + ty;
                vertexOffset += floatsPerVert;
                // left top
                verts[vertexOffset] = vl + tx;
                verts[vertexOffset + 1] = vt + ty;
                vertexOffset += floatsPerVert;
                // right top
                verts[vertexOffset] = vr + tx;
                verts[vertexOffset + 1] = vt + ty;
            }
            else {
                var al = a * vl, ar = a * vr, bl = b * vl, br = b * vr, cb = c * vb, ct = c * vt, db = d * vb, dt = d * vt;
                // left bottom
                verts[vertexOffset] = al + cb + tx;
                verts[vertexOffset + 1] = bl + db + ty;
                vertexOffset += floatsPerVert;
                // right bottom
                verts[vertexOffset] = ar + cb + tx;
                verts[vertexOffset + 1] = br + db + ty;
                vertexOffset += floatsPerVert;
                // left top
                verts[vertexOffset] = al + ct + tx;
                verts[vertexOffset + 1] = bl + dt + ty;
                vertexOffset += floatsPerVert;
                // right top
                verts[vertexOffset] = ar + ct + tx;
                verts[vertexOffset + 1] = br + dt + ty;
            }
        }
    };
    MultiAssembler.prototype.fillBuffers = function (comp, renderer) {
        if (renderer.worldMatDirty) {
            this.updateWorldVerts(comp);
        }
        var renderData = this._renderData;
        var vData = renderData.vDatas[0];
        var iData = renderData.iDatas[0];
        var buffer = this.getBuffer(renderer);
        var offsetInfo = buffer.request(this.verticesCount, this.indicesCount);
        // buffer data may be realloc, need get reference after request.
        // fill vertices
        var vertexOffset = offsetInfo.byteOffset >> 2, vbuf = buffer._vData;
        if (vData.length + vertexOffset > vbuf.length) {
            vbuf.set(vData.subarray(0, vbuf.length - vertexOffset), vertexOffset);
        }
        else {
            vbuf.set(vData, vertexOffset);
        }
        // fill indices
        var ibuf = buffer._iData, indiceOffset = offsetInfo.indiceOffset, vertexId = offsetInfo.vertexOffset;
        for (var i = 0, l = iData.length; i < l; i++) {
            ibuf[indiceOffset++] = vertexId + iData[i];
        }
    };
    MultiAssembler.prototype.packToDynamicAtlas = function (comp, frame) {
        if (CC_TEST)
            return;
        if (!frame._original && cc.dynamicAtlasManager && frame._texture.packable) {
            var packedFrame = cc.dynamicAtlasManager.insertSpriteFrame(frame);
            if (packedFrame) {
                frame._setDynamicAtlasFrame(packedFrame);
            }
        }
        var material = comp._materials[0];
        if (!material)
            return;
        if (material.getProperty("texture") !== frame._texture._texture) {
            // texture was packed to dynamic atlas, should update uvs
            comp._vertsDirty = true;
            comp._updateMaterial();
        }
    };
    return MultiAssembler;
}(cc.Assembler));
exports.default = MultiAssembler;

cc._RF.pop();