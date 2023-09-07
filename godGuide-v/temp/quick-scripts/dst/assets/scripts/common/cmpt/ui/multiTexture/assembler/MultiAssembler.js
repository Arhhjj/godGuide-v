
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssembler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcbXVsdGlUZXh0dXJlXFxhc3NlbWJsZXJcXE11bHRpQXNzZW1ibGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0QixJQUFNLG1CQUFtQixHQUFHLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQztJQUM3QyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtJQUNoRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtJQUMzRCxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtJQUM1RSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO0NBQ2pFLENBQUMsQ0FBQztBQUVIO0lBQTRDLGtDQUFZO0lBZ0JwRDtRQUFBLFlBQ0ksaUJBQU8sU0FPVjtRQXZCRCxnQkFBZ0I7UUFDTixtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixrQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLHNCQUFnQixHQUFXLENBQUMsQ0FBQztRQUU3QixpQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixZ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UUFBUSxFQUFFO1lBQ3ZFLElBQUksV0FBVyxHQUFRLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RSxJQUFJLFdBQVcsRUFBRTtnQkFDYixLQUFLLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDNUM7U0FDSjtRQUNELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBRXRCLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUM3RCx5REFBeUQ7WUFDekQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0E5TUEsQUE4TUMsQ0E5TTJDLEVBQUUsQ0FBQyxTQUFTLEdBOE12RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdmeCA9IGNjW1wiZ2Z4XCJdO1xyXG5jb25zdCB2Zm10UG9zVXZDb2xvckluZGV4ID0gbmV3IGdmeC5WZXJ0ZXhGb3JtYXQoW1xyXG4gICAgeyBuYW1lOiBnZnguQVRUUl9QT1NJVElPTiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDIgfSxcclxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVVYwLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMiB9LFxyXG4gICAgeyBuYW1lOiBnZnguQVRUUl9DT0xPUiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9VSU5UOCwgbnVtOiA0LCBub3JtYWxpemU6IHRydWUgfSxcclxuICAgIHsgbmFtZTogXCJhX3RleHR1cmVfaWR4XCIsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAxIH0sXHJcbl0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlBc3NlbWJsZXIgZXh0ZW5kcyBjYy5Bc3NlbWJsZXIge1xyXG4gICAgLyoqIOavj+S4qumhtueCueeahOaVsOaNrumVv+W6piAqL1xyXG4gICAgcHJvdGVjdGVkIGZsb2F0c1BlclZlcnQ6IG51bWJlciA9IDY7XHJcbiAgICBwcm90ZWN0ZWQgdmVydGljZXNDb3VudDogbnVtYmVyID0gNDtcclxuICAgIHByb3RlY3RlZCBpbmRpY2VzQ291bnQ6IG51bWJlciA9IDY7XHJcbiAgICBwcm90ZWN0ZWQgdXZPZmZzZXQ6IG51bWJlciA9IDI7XHJcbiAgICBwcm90ZWN0ZWQgY29sb3JPZmZzZXQ6IG51bWJlciA9IDQ7XHJcbiAgICBwcm90ZWN0ZWQgdGV4dHVyZUlkeE9mZnNldDogbnVtYmVyID0gNTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3JlbmRlckRhdGEgPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIF9sb2NhbCA9IFtdO1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXQgdmVydGljZXNGbG9hdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmVydGljZXNDb3VudCAqIHRoaXMuZmxvYXRzUGVyVmVydDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhID0gbmV3IGNjW1wiUmVuZGVyRGF0YVwiXSgpO1xyXG4gICAgICAgIHRoaXMuX3JlbmRlckRhdGEuaW5pdCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdExvY2FsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXREYXRhKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fcmVuZGVyRGF0YTtcclxuICAgICAgICAvLyBjcmVhdGVGbGV4RGF0YeaUr+aMgeWIm+W7uuaMh+WumuagvOW8j+eahHJlbmRlckRhdGFcclxuICAgICAgICBkYXRhLmNyZWF0ZUZsZXhEYXRhKDAsIHRoaXMudmVydGljZXNDb3VudCwgdGhpcy5pbmRpY2VzQ291bnQsIHRoaXMuZ2V0VmZtdCgpKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlRmxleERhdGHkuI3kvJrloavlhYXpobbngrnntKLlvJXkv6Hmga/vvIzmiYvliqjooaXlhYXkuIDkuItcclxuICAgICAgICBsZXQgaW5kaWNlcyA9IGRhdGEuaURhdGFzWzBdO1xyXG4gICAgICAgIGxldCBjb3VudCA9IGluZGljZXMubGVuZ3RoIC8gNjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgaWR4ID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHZlcnRleHRJRCA9IGkgKiA0O1xyXG4gICAgICAgICAgICBpbmRpY2VzW2lkeCsrXSA9IHZlcnRleHRJRDtcclxuICAgICAgICAgICAgaW5kaWNlc1tpZHgrK10gPSB2ZXJ0ZXh0SUQgKyAxO1xyXG4gICAgICAgICAgICBpbmRpY2VzW2lkeCsrXSA9IHZlcnRleHRJRCArIDI7XHJcbiAgICAgICAgICAgIGluZGljZXNbaWR4KytdID0gdmVydGV4dElEICsgMTtcclxuICAgICAgICAgICAgaW5kaWNlc1tpZHgrK10gPSB2ZXJ0ZXh0SUQgKyAzO1xyXG4gICAgICAgICAgICBpbmRpY2VzW2lkeCsrXSA9IHZlcnRleHRJRCArIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0TG9jYWwoKSB7XHJcbiAgICAgICAgdGhpcy5fbG9jYWwgPSBbXTtcclxuICAgICAgICB0aGlzLl9sb2NhbC5sZW5ndGggPSA0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRCdWZmZXIodikge1xyXG4gICAgICAgIHJldHVybiBjYy5yZW5kZXJlcltcIl9oYW5kbGVcIl0uZ2V0QnVmZmVyKFwibWVzaFwiLCB0aGlzLmdldFZmbXQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFZmbXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHZmbXRQb3NVdkNvbG9ySW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUNvbG9yKGNvbXAsIGNvbG9yPykge1xyXG4gICAgICAgIGlmIChDQ19OQVRJVkVSRU5ERVJFUikge1xyXG4gICAgICAgICAgICB0aGlzW1wiX2RpcnR5UHRyXCJdWzBdIHw9IGNjLkFzc2VtYmxlcltcIkZMQUdfVkVSVElDRVNfT1BBQ0lUWV9DSEFOR0VEXCJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdWludFZlcnRzID0gdGhpcy5fcmVuZGVyRGF0YS51aW50VkRhdGFzWzBdO1xyXG4gICAgICAgIGlmICghdWludFZlcnRzKSByZXR1cm47XHJcbiAgICAgICAgY29sb3IgPSBjb2xvciAhPSBudWxsID8gY29sb3IgOiBjb21wLm5vZGUuY29sb3IuX3ZhbDtcclxuICAgICAgICBsZXQgZmxvYXRzUGVyVmVydCA9IHRoaXMuZmxvYXRzUGVyVmVydDtcclxuICAgICAgICBsZXQgY29sb3JPZmZzZXQgPSB0aGlzLmNvbG9yT2Zmc2V0O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBjb2xvck9mZnNldCwgbCA9IHVpbnRWZXJ0cy5sZW5ndGg7IGkgPCBsOyBpICs9IGZsb2F0c1BlclZlcnQpIHtcclxuICAgICAgICAgICAgdWludFZlcnRzW2ldID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVUZXh0dXJlSWR4KHNwcml0ZSkge1xyXG4gICAgICAgIGxldCB2ZXJ0cyA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmVydGljZXNDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkc3RPZmZzZXQgPSB0aGlzLmZsb2F0c1BlclZlcnQgKiBpICsgdGhpcy50ZXh0dXJlSWR4T2Zmc2V0O1xyXG4gICAgICAgICAgICB2ZXJ0c1tkc3RPZmZzZXRdID0gc3ByaXRlLnRleHR1cmVJZHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVXb3JsZFZlcnRzKGNvbXApIHtcclxuICAgICAgICBsZXQgbG9jYWwgPSB0aGlzLl9sb2NhbDtcclxuICAgICAgICBsZXQgdmVydHMgPSB0aGlzLl9yZW5kZXJEYXRhLnZEYXRhc1swXTtcclxuXHJcbiAgICAgICAgbGV0IG1hdHJpeCA9IGNvbXAubm9kZS5fd29ybGRNYXRyaXg7XHJcbiAgICAgICAgbGV0IG1hdHJpeG0gPSBtYXRyaXgubSxcclxuICAgICAgICAgICAgYSA9IG1hdHJpeG1bMF0sIGIgPSBtYXRyaXhtWzFdLCBjID0gbWF0cml4bVs0XSwgZCA9IG1hdHJpeG1bNV0sXHJcbiAgICAgICAgICAgIHR4ID0gbWF0cml4bVsxMl0sIHR5ID0gbWF0cml4bVsxM107XHJcblxyXG4gICAgICAgIGxldCB2bCA9IGxvY2FsWzBdLCB2ciA9IGxvY2FsWzJdLFxyXG4gICAgICAgICAgICB2YiA9IGxvY2FsWzFdLCB2dCA9IGxvY2FsWzNdO1xyXG5cclxuICAgICAgICBsZXQgZmxvYXRzUGVyVmVydCA9IHRoaXMuZmxvYXRzUGVyVmVydDtcclxuICAgICAgICBsZXQgdmVydGV4T2Zmc2V0ID0gMDtcclxuICAgICAgICBsZXQganVzdFRyYW5zbGF0ZSA9IGEgPT09IDEgJiYgYiA9PT0gMCAmJiBjID09PSAwICYmIGQgPT09IDE7XHJcblxyXG4gICAgICAgIGlmIChDQ19OQVRJVkVSRU5ERVJFUikge1xyXG4gICAgICAgICAgICAvLyBsZWZ0IGJvdHRvbVxyXG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXRdID0gdmw7XHJcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldCArIDFdID0gdmI7XHJcbiAgICAgICAgICAgIHZlcnRleE9mZnNldCArPSBmbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgICAgICAvLyByaWdodCBib3R0b21cclxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IHZyO1xyXG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXQgKyAxXSA9IHZiO1xyXG4gICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgLy8gbGVmdCB0b3BcclxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IHZsO1xyXG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXQgKyAxXSA9IHZ0O1xyXG4gICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgLy8gcmlnaHQgdG9wXHJcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldF0gPSB2cjtcclxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0ICsgMV0gPSB2dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoanVzdFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbGVmdCBib3R0b21cclxuICAgICAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldF0gPSB2bCArIHR4O1xyXG4gICAgICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0ICsgMV0gPSB2YiArIHR5O1xyXG4gICAgICAgICAgICAgICAgdmVydGV4T2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgICAgICAgICAvLyByaWdodCBib3R0b21cclxuICAgICAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldF0gPSB2ciArIHR4O1xyXG4gICAgICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0ICsgMV0gPSB2YiArIHR5O1xyXG4gICAgICAgICAgICAgICAgdmVydGV4T2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgICAgICAgICAvLyBsZWZ0IHRvcFxyXG4gICAgICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IHZsICsgdHg7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXQgKyAxXSA9IHZ0ICsgdHk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IHRvcFxyXG4gICAgICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IHZyICsgdHg7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXQgKyAxXSA9IHZ0ICsgdHk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWwgPSBhICogdmwsIGFyID0gYSAqIHZyLFxyXG4gICAgICAgICAgICAgICAgICAgIGJsID0gYiAqIHZsLCBiciA9IGIgKiB2cixcclxuICAgICAgICAgICAgICAgICAgICBjYiA9IGMgKiB2YiwgY3QgPSBjICogdnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGIgPSBkICogdmIsIGR0ID0gZCAqIHZ0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGxlZnQgYm90dG9tXHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXRdID0gYWwgKyBjYiArIHR4O1xyXG4gICAgICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0ICsgMV0gPSBibCArIGRiICsgdHk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IGJvdHRvbVxyXG4gICAgICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IGFyICsgY2IgKyB0eDtcclxuICAgICAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldCArIDFdID0gYnIgKyBkYiArIHR5O1xyXG4gICAgICAgICAgICAgICAgdmVydGV4T2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgICAgICAgICAvLyBsZWZ0IHRvcFxyXG4gICAgICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IGFsICsgY3QgKyB0eDtcclxuICAgICAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldCArIDFdID0gYmwgKyBkdCArIHR5O1xyXG4gICAgICAgICAgICAgICAgdmVydGV4T2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgICAgICAgICAvLyByaWdodCB0b3BcclxuICAgICAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldF0gPSBhciArIGN0ICsgdHg7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXQgKyAxXSA9IGJyICsgZHQgKyB0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmlsbEJ1ZmZlcnMoY29tcCwgcmVuZGVyZXIpIHtcclxuICAgICAgICBpZiAocmVuZGVyZXIud29ybGRNYXREaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdvcmxkVmVydHMoY29tcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVuZGVyRGF0YSA9IHRoaXMuX3JlbmRlckRhdGE7XHJcbiAgICAgICAgbGV0IHZEYXRhID0gcmVuZGVyRGF0YS52RGF0YXNbMF07XHJcbiAgICAgICAgbGV0IGlEYXRhID0gcmVuZGVyRGF0YS5pRGF0YXNbMF07XHJcblxyXG4gICAgICAgIGxldCBidWZmZXIgPSB0aGlzLmdldEJ1ZmZlcihyZW5kZXJlcik7XHJcbiAgICAgICAgbGV0IG9mZnNldEluZm8gPSBidWZmZXIucmVxdWVzdCh0aGlzLnZlcnRpY2VzQ291bnQsIHRoaXMuaW5kaWNlc0NvdW50KTtcclxuXHJcbiAgICAgICAgLy8gYnVmZmVyIGRhdGEgbWF5IGJlIHJlYWxsb2MsIG5lZWQgZ2V0IHJlZmVyZW5jZSBhZnRlciByZXF1ZXN0LlxyXG5cclxuICAgICAgICAvLyBmaWxsIHZlcnRpY2VzXHJcbiAgICAgICAgbGV0IHZlcnRleE9mZnNldCA9IG9mZnNldEluZm8uYnl0ZU9mZnNldCA+PiAyLFxyXG4gICAgICAgICAgICB2YnVmID0gYnVmZmVyLl92RGF0YTtcclxuXHJcbiAgICAgICAgaWYgKHZEYXRhLmxlbmd0aCArIHZlcnRleE9mZnNldCA+IHZidWYubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZidWYuc2V0KHZEYXRhLnN1YmFycmF5KDAsIHZidWYubGVuZ3RoIC0gdmVydGV4T2Zmc2V0KSwgdmVydGV4T2Zmc2V0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YnVmLnNldCh2RGF0YSwgdmVydGV4T2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZpbGwgaW5kaWNlc1xyXG4gICAgICAgIGxldCBpYnVmID0gYnVmZmVyLl9pRGF0YSxcclxuICAgICAgICAgICAgaW5kaWNlT2Zmc2V0ID0gb2Zmc2V0SW5mby5pbmRpY2VPZmZzZXQsXHJcbiAgICAgICAgICAgIHZlcnRleElkID0gb2Zmc2V0SW5mby52ZXJ0ZXhPZmZzZXQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBpRGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgaWJ1ZltpbmRpY2VPZmZzZXQrK10gPSB2ZXJ0ZXhJZCArIGlEYXRhW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFja1RvRHluYW1pY0F0bGFzKGNvbXAsIGZyYW1lKSB7XHJcbiAgICAgICAgaWYgKENDX1RFU1QpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCFmcmFtZS5fb3JpZ2luYWwgJiYgY2MuZHluYW1pY0F0bGFzTWFuYWdlciAmJiBmcmFtZS5fdGV4dHVyZS5wYWNrYWJsZSkge1xyXG4gICAgICAgICAgICBsZXQgcGFja2VkRnJhbWU6IGFueSA9IGNjLmR5bmFtaWNBdGxhc01hbmFnZXIuaW5zZXJ0U3ByaXRlRnJhbWUoZnJhbWUpO1xyXG4gICAgICAgICAgICBpZiAocGFja2VkRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIGZyYW1lLl9zZXREeW5hbWljQXRsYXNGcmFtZShwYWNrZWRGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gY29tcC5fbWF0ZXJpYWxzWzBdO1xyXG4gICAgICAgIGlmICghbWF0ZXJpYWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKG1hdGVyaWFsLmdldFByb3BlcnR5KFwidGV4dHVyZVwiKSAhPT0gZnJhbWUuX3RleHR1cmUuX3RleHR1cmUpIHtcclxuICAgICAgICAgICAgLy8gdGV4dHVyZSB3YXMgcGFja2VkIHRvIGR5bmFtaWMgYXRsYXMsIHNob3VsZCB1cGRhdGUgdXZzXHJcbiAgICAgICAgICAgIGNvbXAuX3ZlcnRzRGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb21wLl91cGRhdGVNYXRlcmlhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==