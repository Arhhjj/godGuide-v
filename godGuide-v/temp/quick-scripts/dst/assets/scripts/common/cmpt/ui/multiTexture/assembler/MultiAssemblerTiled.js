
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerTiled.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '825c0CUhQhLHIOj5ulatGUZ', 'MultiAssemblerTiled');
// scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerTiled.ts

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
var MultiAssemblerTiled = /** @class */ (function (_super) {
    __extends(MultiAssemblerTiled, _super);
    function MultiAssemblerTiled() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentWidth = 0;
        _this.contentHeight = 0;
        _this.rectWidth = 0;
        _this.rectHeight = 0;
        _this.hRepeat = 0;
        _this.vRepeat = 0;
        _this.row = 0;
        _this.col = 0;
        _this.sizableWidth = 0;
        _this.sizableHeight = 0;
        return _this;
    }
    MultiAssemblerTiled.prototype.initData = function () {
        this.verticesCount = 0;
        this.contentWidth = 0;
        this.contentHeight = 0;
        this.rectWidth = 0;
        this.rectHeight = 0;
        this.hRepeat = 0;
        this.vRepeat = 0;
        this.row = 0;
        this.col = 0;
        if (this._renderData.meshCount > 0)
            return;
        var data = this._renderData;
        // createFlexData支持创建指定格式的renderData
        data.createFlexData(0, 4, 6, this.getVfmt());
        this._updateIndices();
    };
    MultiAssemblerTiled.prototype.initLocal = function () {
        this._local = { x: [], y: [] };
    };
    MultiAssemblerTiled.prototype._updateIndices = function () {
        var iData = this._renderData.iDatas[0];
        for (var i = 0, vid = 0, l = iData.length; i < l; i += 6, vid += 4) {
            iData[i] = vid;
            iData[i + 1] = vid + 1;
            iData[i + 2] = vid + 2;
            iData[i + 3] = vid + 1;
            iData[i + 4] = vid + 3;
            iData[i + 5] = vid + 2;
        }
    };
    MultiAssemblerTiled.prototype.updateRenderData = function (sprite) {
        var frame = sprite._spriteFrame;
        this.packToDynamicAtlas(sprite, frame);
        var node = sprite.node;
        var contentWidth = this.contentWidth = Math.abs(node.width);
        var contentHeight = this.contentHeight = Math.abs(node.height);
        var rect = frame._rect;
        var leftWidth = frame.insetLeft, rightWidth = frame.insetRight, centerWidth = rect.width - leftWidth - rightWidth, topHeight = frame.insetTop, bottomHeight = frame.insetBottom, centerHeight = rect.height - topHeight - bottomHeight;
        this.sizableWidth = contentWidth - leftWidth - rightWidth;
        this.sizableHeight = contentHeight - topHeight - bottomHeight;
        this.sizableWidth = this.sizableWidth > 0 ? this.sizableWidth : 0;
        this.sizableHeight = this.sizableHeight > 0 ? this.sizableHeight : 0;
        var hRepeat = this.hRepeat = centerWidth === 0 ? this.sizableWidth : this.sizableWidth / centerWidth;
        var vRepeat = this.vRepeat = centerHeight === 0 ? this.sizableHeight : this.sizableHeight / centerHeight;
        var row = this.row = Math.ceil(vRepeat + 2);
        var col = this.col = Math.ceil(hRepeat + 2);
        // update data property
        var count = row * col;
        this.verticesCount = count * 4;
        this.indicesCount = count * 6;
        var renderData = this._renderData;
        var flexBuffer = renderData._flexBuffer;
        if (flexBuffer.reserve(this.verticesCount, this.indicesCount)) {
            this._updateIndices();
            this.updateColor(sprite);
        }
        flexBuffer.used(this.verticesCount, this.indicesCount);
        if (sprite._vertsDirty) {
            this.updateUVs(sprite);
            this.updateVerts(sprite);
            this.updateTextureIdx(sprite);
            sprite._vertsDirty = false;
        }
    };
    MultiAssemblerTiled.prototype.updateVerts = function (sprite) {
        var frame = sprite._spriteFrame;
        var rect = frame._rect;
        var node = sprite.node, appx = node.anchorX * node.width, appy = node.anchorY * node.height;
        var _a = this, row = _a.row, col = _a.col, contentWidth = _a.contentWidth, contentHeight = _a.contentHeight;
        var _b = this._local, x = _b.x, y = _b.y;
        x.length = y.length = 0;
        var leftWidth = frame.insetLeft, rightWidth = frame.insetRight, centerWidth = rect.width - leftWidth - rightWidth, topHeight = frame.insetTop, bottomHeight = frame.insetBottom, centerHeight = rect.height - topHeight - bottomHeight;
        var xScale = (node.width / (leftWidth + rightWidth)) > 1 ? 1 : (node.width / (leftWidth + rightWidth));
        var yScale = (node.height / (topHeight + bottomHeight)) > 1 ? 1 : (node.height / (topHeight + bottomHeight));
        var offsetWidth = 0, offsetHeight = 0;
        if (centerWidth > 0) {
            /*
             * Because the float numerical calculation in javascript is not accurate enough,
             * there is an expected result of 1.0, but the actual result is 1.000001.
             */
            offsetWidth = Math.floor(this.sizableWidth * 1000) / 1000 % centerWidth === 0 ? centerWidth : this.sizableWidth % centerWidth;
        }
        else {
            offsetWidth = this.sizableWidth;
        }
        if (centerHeight > 0) {
            offsetHeight = Math.floor(this.sizableHeight * 1000) / 1000 % centerHeight === 0 ? centerHeight : this.sizableHeight % centerHeight;
        }
        else {
            offsetHeight = this.sizableHeight;
        }
        for (var i = 0; i <= col; i++) {
            if (i === 0) {
                x[i] = -appx;
            }
            else if (i > 0 && i < col) {
                if (i === 1) {
                    x[i] = leftWidth * xScale + Math.min(centerWidth, this.sizableWidth) - appx;
                }
                else {
                    if (centerWidth > 0) {
                        if (i === (col - 1)) {
                            x[i] = leftWidth + offsetWidth + centerWidth * (i - 2) - appx;
                        }
                        else {
                            x[i] = leftWidth + Math.min(centerWidth, this.sizableWidth) + centerWidth * (i - 2) - appx;
                        }
                    }
                    else {
                        x[i] = leftWidth + this.sizableWidth - appx;
                    }
                }
            }
            else if (i === col) {
                x[i] = Math.min(leftWidth + this.sizableWidth + rightWidth, contentWidth) - appx;
            }
        }
        for (var i = 0; i <= row; i++) {
            if (i === 0) {
                y[i] = -appy;
            }
            else if (i > 0 && i < row) {
                if (i === 1) {
                    y[i] = bottomHeight * yScale + Math.min(centerHeight, this.sizableHeight) - appy;
                }
                else {
                    if (centerHeight > 0) {
                        if (i === (row - 1)) {
                            y[i] = bottomHeight + offsetHeight + (i - 2) * centerHeight - appy;
                        }
                        else {
                            y[i] = bottomHeight + Math.min(centerHeight, this.sizableHeight) + (i - 2) * centerHeight - appy;
                        }
                    }
                    else {
                        y[i] = bottomHeight + this.sizableHeight - appy;
                    }
                }
            }
            else if (i === row) {
                y[i] = Math.min(bottomHeight + this.sizableHeight + topHeight, contentHeight) - appy;
            }
        }
        this.updateWorldVerts(sprite);
    };
    MultiAssemblerTiled.prototype.updateWorldVerts = function (sprite) {
        var renderData = this._renderData;
        var local = this._local;
        var localX = local.x, localY = local.y;
        var world = renderData.vDatas[0];
        var _a = this, row = _a.row, col = _a.col;
        var matrix = sprite.node._worldMatrix;
        var matrixm = matrix.m;
        var a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5], tx = matrixm[12], ty = matrixm[13];
        var x, x1, y, y1;
        var floatsPerVert = this.floatsPerVert;
        var vertexOffset = 0;
        if (CC_NATIVERENDERER) {
            for (var yindex = 0, ylength = row; yindex < ylength; ++yindex) {
                y = localY[yindex];
                y1 = localY[yindex + 1];
                for (var xindex = 0, xlength = col; xindex < xlength; ++xindex) {
                    x = localX[xindex];
                    x1 = localX[xindex + 1];
                    // lb
                    world[vertexOffset] = x;
                    world[vertexOffset + 1] = y;
                    vertexOffset += floatsPerVert;
                    // rb
                    world[vertexOffset] = x1;
                    world[vertexOffset + 1] = y;
                    vertexOffset += floatsPerVert;
                    // lt
                    world[vertexOffset] = x;
                    world[vertexOffset + 1] = y1;
                    vertexOffset += floatsPerVert;
                    // rt
                    world[vertexOffset] = x1;
                    world[vertexOffset + 1] = y1;
                    vertexOffset += floatsPerVert;
                }
            }
        }
        else {
            for (var yindex = 0, ylength = row; yindex < ylength; ++yindex) {
                y = localY[yindex];
                y1 = localY[yindex + 1];
                for (var xindex = 0, xlength = col; xindex < xlength; ++xindex) {
                    x = localX[xindex];
                    x1 = localX[xindex + 1];
                    // lb
                    world[vertexOffset] = x * a + y * c + tx;
                    world[vertexOffset + 1] = x * b + y * d + ty;
                    vertexOffset += floatsPerVert;
                    // rb
                    world[vertexOffset] = x1 * a + y * c + tx;
                    world[vertexOffset + 1] = x1 * b + y * d + ty;
                    vertexOffset += floatsPerVert;
                    // lt
                    world[vertexOffset] = x * a + y1 * c + tx;
                    world[vertexOffset + 1] = x * b + y1 * d + ty;
                    vertexOffset += floatsPerVert;
                    // rt
                    world[vertexOffset] = x1 * a + y1 * c + tx;
                    world[vertexOffset + 1] = x1 * b + y1 * d + ty;
                    vertexOffset += floatsPerVert;
                }
            }
        }
    };
    MultiAssemblerTiled.prototype.updateUVs = function (sprite) {
        var verts = this._renderData.vDatas[0];
        if (!verts)
            return;
        var frame = sprite._spriteFrame;
        var rect = frame._rect;
        var leftWidth = frame.insetLeft, rightWidth = frame.insetRight, centerWidth = rect.width - leftWidth - rightWidth, topHeight = frame.insetTop, bottomHeight = frame.insetBottom, centerHeight = rect.height - topHeight - bottomHeight;
        var _a = this, row = _a.row, col = _a.col, hRepeat = _a.hRepeat, vRepeat = _a.vRepeat;
        var coefu = 0, coefv = 0;
        var uv = sprite.spriteFrame.uv;
        var uvSliced = sprite.spriteFrame.uvSliced;
        var rotated = sprite.spriteFrame._rotated;
        var floatsPerVert = this.floatsPerVert, uvOffset = this.uvOffset;
        var tempXVerts = [], tempYVerts = [];
        for (var yindex = 0, ylength = row; yindex < ylength; ++yindex) {
            if (this.sizableHeight > centerHeight) {
                if (this.sizableHeight >= yindex * centerHeight) {
                    coefv = 1;
                }
                else {
                    coefv = vRepeat % 1;
                }
            }
            else {
                coefv = vRepeat;
            }
            for (var xindex = 0, xlength = col; xindex < xlength; ++xindex) {
                if (this.sizableWidth > centerWidth) {
                    if (this.sizableWidth >= xindex * centerWidth) {
                        coefu = 1;
                    }
                    else {
                        coefu = hRepeat % 1;
                    }
                }
                else {
                    coefu = hRepeat;
                }
                if (rotated) {
                    if (yindex === 0) {
                        tempXVerts[0] = uvSliced[0].u;
                        tempXVerts[1] = uvSliced[0].u;
                        tempXVerts[2] = uvSliced[4].u + (uvSliced[8].u - uvSliced[4].u) * coefv;
                    }
                    else if (yindex < (row - 1)) {
                        tempXVerts[0] = uvSliced[4].u;
                        tempXVerts[1] = uvSliced[4].u;
                        tempXVerts[2] = uvSliced[4].u + (uvSliced[8].u - uvSliced[4].u) * coefv;
                    }
                    else if (yindex === (row - 1)) {
                        tempXVerts[0] = uvSliced[8].u;
                        tempXVerts[1] = uvSliced[8].u;
                        tempXVerts[2] = uvSliced[12].u;
                    }
                    if (xindex === 0) {
                        tempYVerts[0] = uvSliced[0].v;
                        tempYVerts[1] = uvSliced[1].v + (uvSliced[2].v - uvSliced[1].v) * coefu;
                        tempYVerts[2] = uvSliced[0].v;
                    }
                    else if (xindex < (col - 1)) {
                        tempYVerts[0] = uvSliced[1].v;
                        tempYVerts[1] = uvSliced[1].v + (uvSliced[2].v - uvSliced[1].v) * coefu;
                        tempYVerts[2] = uvSliced[1].v;
                    }
                    else if (xindex === (col - 1)) {
                        tempYVerts[0] = uvSliced[2].v;
                        tempYVerts[1] = uvSliced[3].v;
                        tempYVerts[2] = uvSliced[2].v;
                    }
                    tempXVerts[3] = tempXVerts[2];
                    tempYVerts[3] = tempYVerts[1];
                }
                else {
                    if (xindex === 0) {
                        tempXVerts[0] = uvSliced[0].u;
                        tempXVerts[1] = uvSliced[1].u + (uvSliced[2].u - uvSliced[1].u) * coefu;
                        tempXVerts[2] = uv[0];
                    }
                    else if (xindex < (col - 1)) {
                        tempXVerts[0] = uvSliced[1].u;
                        tempXVerts[1] = uvSliced[1].u + (uvSliced[2].u - uvSliced[1].u) * coefu;
                        tempXVerts[2] = uvSliced[1].u;
                    }
                    else if (xindex === (col - 1)) {
                        tempXVerts[0] = uvSliced[2].u;
                        tempXVerts[1] = uvSliced[3].u;
                        tempXVerts[2] = uvSliced[2].u;
                    }
                    if (yindex === 0) {
                        tempYVerts[0] = uvSliced[0].v;
                        tempYVerts[1] = uvSliced[0].v;
                        tempYVerts[2] = uvSliced[4].v + (uvSliced[8].v - uvSliced[4].v) * coefv;
                    }
                    else if (yindex < (row - 1)) {
                        tempYVerts[0] = uvSliced[4].v;
                        tempYVerts[1] = uvSliced[4].v;
                        tempYVerts[2] = uvSliced[4].v + (uvSliced[8].v - uvSliced[4].v) * coefv;
                    }
                    else if (yindex === (row - 1)) {
                        tempYVerts[0] = uvSliced[8].v;
                        tempYVerts[1] = uvSliced[8].v;
                        tempYVerts[2] = uvSliced[12].v;
                    }
                    tempXVerts[3] = tempXVerts[1];
                    tempYVerts[3] = tempYVerts[2];
                }
                // lb
                verts[uvOffset] = tempXVerts[0];
                verts[uvOffset + 1] = tempYVerts[0];
                uvOffset += floatsPerVert;
                // rb
                verts[uvOffset] = tempXVerts[1];
                verts[uvOffset + 1] = tempYVerts[1];
                uvOffset += floatsPerVert;
                // lt
                verts[uvOffset] = tempXVerts[2];
                verts[uvOffset + 1] = tempYVerts[2];
                uvOffset += floatsPerVert;
                // rt
                verts[uvOffset] = tempXVerts[3];
                verts[uvOffset + 1] = tempYVerts[3];
                uvOffset += floatsPerVert;
            }
        }
    };
    return MultiAssemblerTiled;
}(MultiAssembler_1.default));
exports.default = MultiAssemblerTiled;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcbXVsdGlUZXh0dXJlXFxhc3NlbWJsZXJcXE11bHRpQXNzZW1ibGVyVGlsZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBRTlDO0lBQWlELHVDQUFjO0lBQS9EO1FBQUEscUVBNldDO1FBNVdXLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLFNBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsU0FBRyxHQUFXLENBQUMsQ0FBQztRQUNoQixrQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixtQkFBYSxHQUFXLENBQUMsQ0FBQzs7SUFtV3RDLENBQUM7SUFqV1Usc0NBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFYixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLENBQUM7WUFBRSxPQUFPO1FBQzNDLElBQUksSUFBSSxH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QUFDLENBQUM7d0JBQzlCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDbEM7b0JBQ0QsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNkLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzt3QkFDeEUsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2pDO3lCQUFNLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUMzQixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7d0JBQ3hFLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNqQzt5QkFBTSxJQUFJLE1BQU0sS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDN0IsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDakM7b0JBQ0QsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakM7cUJBQ0k7b0JBQ0QsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNkLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzt3QkFDeEUsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDekI7eUJBQU0sSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzNCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzt3QkFDeEUsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2pDO3lCQUFNLElBQUksTUFBTSxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUM3QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNqQztvQkFDRCxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQ2QsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztxQkFDM0U7eUJBQU0sSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzNCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7cUJBQzNFO3lCQUFNLElBQUksTUFBTSxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUM3QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNsQztvQkFDRCxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQztnQkFDRCxLQUFLO2dCQUNMLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxRQUFRLElBQUksYUFBYSxDQUFDO2dCQUMxQixLQUFLO2dCQUNMLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxRQUFRLElBQUksYUFBYSxDQUFDO2dCQUMxQixLQUFLO2dCQUNMLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxRQUFRLElBQUksYUFBYSxDQUFDO2dCQUMxQixLQUFLO2dCQUNMLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxRQUFRLElBQUksYUFBYSxDQUFDO2FBQzdCO1NBQ0o7SUFDTCxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQTdXQSxBQTZXQyxDQTdXZ0Qsd0JBQWMsR0E2VzlEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE11bHRpQXNzZW1ibGVyIGZyb20gXCIuL011bHRpQXNzZW1ibGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdWx0aUFzc2VtYmxlclRpbGVkIGV4dGVuZHMgTXVsdGlBc3NlbWJsZXIge1xyXG4gICAgcHJpdmF0ZSBjb250ZW50V2lkdGg6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGNvbnRlbnRIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHJlY3RXaWR0aDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgcmVjdEhlaWdodDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgaFJlcGVhdDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgdlJlcGVhdDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgcm93OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBjb2w6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHNpemFibGVXaWR0aDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgc2l6YWJsZUhlaWdodDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgaW5pdERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlc0NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmNvbnRlbnRXaWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb250ZW50SGVpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLnJlY3RXaWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZWN0SGVpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLmhSZXBlYXQgPSAwO1xyXG4gICAgICAgIHRoaXMudlJlcGVhdCA9IDA7XHJcbiAgICAgICAgdGhpcy5yb3cgPSAwO1xyXG4gICAgICAgIHRoaXMuY29sID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlckRhdGEubWVzaENvdW50ID4gMCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fcmVuZGVyRGF0YTtcclxuICAgICAgICAvLyBjcmVhdGVGbGV4RGF0YeaUr+aMgeWIm+W7uuaMh+WumuagvOW8j+eahHJlbmRlckRhdGFcclxuICAgICAgICBkYXRhLmNyZWF0ZUZsZXhEYXRhKDAsIDQsIDYsIHRoaXMuZ2V0VmZtdCgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlSW5kaWNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0TG9jYWwoKSB7XHJcbiAgICAgICAgdGhpcy5fbG9jYWwgPSB7IHg6IFtdLCB5OiBbXSB9IGFzIGFueTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVJbmRpY2VzKCkge1xyXG4gICAgICAgIGxldCBpRGF0YSA9IHRoaXMuX3JlbmRlckRhdGEuaURhdGFzWzBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCB2aWQgPSAwLCBsID0gaURhdGEubGVuZ3RoOyBpIDwgbDsgaSArPSA2LCB2aWQgKz0gNCkge1xyXG4gICAgICAgICAgICBpRGF0YVtpXSA9IHZpZDtcclxuICAgICAgICAgICAgaURhdGFbaSArIDFdID0gdmlkICsgMTtcclxuICAgICAgICAgICAgaURhdGFbaSArIDJdID0gdmlkICsgMjtcclxuICAgICAgICAgICAgaURhdGFbaSArIDNdID0gdmlkICsgMTtcclxuICAgICAgICAgICAgaURhdGFbaSArIDRdID0gdmlkICsgMztcclxuICAgICAgICAgICAgaURhdGFbaSArIDVdID0gdmlkICsgMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVJlbmRlckRhdGEoc3ByaXRlKSB7XHJcbiAgICAgICAgbGV0IGZyYW1lID0gc3ByaXRlLl9zcHJpdGVGcmFtZTtcclxuICAgICAgICB0aGlzLnBhY2tUb0R5bmFtaWNBdGxhcyhzcHJpdGUsIGZyYW1lKTtcclxuXHJcbiAgICAgICAgbGV0IG5vZGUgPSBzcHJpdGUubm9kZTtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRlbnRXaWR0aCA9IHRoaXMuY29udGVudFdpZHRoID0gTWF0aC5hYnMobm9kZS53aWR0aCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRIZWlnaHQgPSB0aGlzLmNvbnRlbnRIZWlnaHQgPSBNYXRoLmFicyhub2RlLmhlaWdodCk7XHJcbiAgICAgICAgbGV0IHJlY3QgPSBmcmFtZS5fcmVjdDtcclxuICAgICAgICBsZXQgbGVmdFdpZHRoID0gZnJhbWUuaW5zZXRMZWZ0LCByaWdodFdpZHRoID0gZnJhbWUuaW5zZXRSaWdodCwgY2VudGVyV2lkdGggPSByZWN0LndpZHRoIC0gbGVmdFdpZHRoIC0gcmlnaHRXaWR0aCxcclxuICAgICAgICAgICAgdG9wSGVpZ2h0ID0gZnJhbWUuaW5zZXRUb3AsIGJvdHRvbUhlaWdodCA9IGZyYW1lLmluc2V0Qm90dG9tLCBjZW50ZXJIZWlnaHQgPSByZWN0LmhlaWdodCAtIHRvcEhlaWdodCAtIGJvdHRvbUhlaWdodDtcclxuICAgICAgICB0aGlzLnNpemFibGVXaWR0aCA9IGNvbnRlbnRXaWR0aCAtIGxlZnRXaWR0aCAtIHJpZ2h0V2lkdGg7XHJcbiAgICAgICAgdGhpcy5zaXphYmxlSGVpZ2h0ID0gY29udGVudEhlaWdodCAtIHRvcEhlaWdodCAtIGJvdHRvbUhlaWdodDtcclxuICAgICAgICB0aGlzLnNpemFibGVXaWR0aCA9IHRoaXMuc2l6YWJsZVdpZHRoID4gMCA/IHRoaXMuc2l6YWJsZVdpZHRoIDogMDtcclxuICAgICAgICB0aGlzLnNpemFibGVIZWlnaHQgPSB0aGlzLnNpemFibGVIZWlnaHQgPiAwID8gdGhpcy5zaXphYmxlSGVpZ2h0IDogMDtcclxuICAgICAgICBsZXQgaFJlcGVhdCA9IHRoaXMuaFJlcGVhdCA9IGNlbnRlcldpZHRoID09PSAwID8gdGhpcy5zaXphYmxlV2lkdGggOiB0aGlzLnNpemFibGVXaWR0aCAvIGNlbnRlcldpZHRoO1xyXG4gICAgICAgIGxldCB2UmVwZWF0ID0gdGhpcy52UmVwZWF0ID0gY2VudGVySGVpZ2h0ID09PSAwID8gdGhpcy5zaXphYmxlSGVpZ2h0IDogdGhpcy5zaXphYmxlSGVpZ2h0IC8gY2VudGVySGVpZ2h0O1xyXG4gICAgICAgIGxldCByb3cgPSB0aGlzLnJvdyA9IE1hdGguY2VpbCh2UmVwZWF0ICsgMik7XHJcbiAgICAgICAgbGV0IGNvbCA9IHRoaXMuY29sID0gTWF0aC5jZWlsKGhSZXBlYXQgKyAyKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIGRhdGEgcHJvcGVydHlcclxuICAgICAgICBsZXQgY291bnQgPSByb3cgKiBjb2w7XHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlc0NvdW50ID0gY291bnQgKiA0O1xyXG4gICAgICAgIHRoaXMuaW5kaWNlc0NvdW50ID0gY291bnQgKiA2O1xyXG5cclxuICAgICAgICBsZXQgcmVuZGVyRGF0YSA9IHRoaXMuX3JlbmRlckRhdGE7XHJcbiAgICAgICAgbGV0IGZsZXhCdWZmZXIgPSByZW5kZXJEYXRhLl9mbGV4QnVmZmVyO1xyXG4gICAgICAgIGlmIChmbGV4QnVmZmVyLnJlc2VydmUodGhpcy52ZXJ0aWNlc0NvdW50LCB0aGlzLmluZGljZXNDb3VudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlSW5kaWNlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbG9yKHNwcml0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZsZXhCdWZmZXIudXNlZCh0aGlzLnZlcnRpY2VzQ291bnQsIHRoaXMuaW5kaWNlc0NvdW50KTtcclxuXHJcbiAgICAgICAgaWYgKHNwcml0ZS5fdmVydHNEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVWcyhzcHJpdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZlcnRzKHNwcml0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dHVyZUlkeChzcHJpdGUpO1xyXG4gICAgICAgICAgICBzcHJpdGUuX3ZlcnRzRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVZlcnRzKHNwcml0ZSkge1xyXG4gICAgICAgIGxldCBmcmFtZSA9IHNwcml0ZS5fc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgbGV0IHJlY3QgPSBmcmFtZS5fcmVjdDtcclxuICAgICAgICBsZXQgbm9kZSA9IHNwcml0ZS5ub2RlLFxyXG4gICAgICAgICAgICBhcHB4ID0gbm9kZS5hbmNob3JYICogbm9kZS53aWR0aCwgYXBweSA9IG5vZGUuYW5jaG9yWSAqIG5vZGUuaGVpZ2h0O1xyXG5cclxuICAgICAgICBsZXQgeyByb3csIGNvbCwgY29udGVudFdpZHRoLCBjb250ZW50SGVpZ2h0IH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7IHgsIHkgfSA9IHRoaXMuX2xvY2FsIGFzIGFueTtcclxuICAgICAgICB4Lmxlbmd0aCA9IHkubGVuZ3RoID0gMDtcclxuICAgICAgICBsZXQgbGVmdFdpZHRoID0gZnJhbWUuaW5zZXRMZWZ0LCByaWdodFdpZHRoID0gZnJhbWUuaW5zZXRSaWdodCwgY2VudGVyV2lkdGggPSByZWN0LndpZHRoIC0gbGVmdFdpZHRoIC0gcmlnaHRXaWR0aCxcclxuICAgICAgICAgICAgdG9wSGVpZ2h0ID0gZnJhbWUuaW5zZXRUb3AsIGJvdHRvbUhlaWdodCA9IGZyYW1lLmluc2V0Qm90dG9tLCBjZW50ZXJIZWlnaHQgPSByZWN0LmhlaWdodCAtIHRvcEhlaWdodCAtIGJvdHRvbUhlaWdodDtcclxuICAgICAgICBsZXQgeFNjYWxlID0gKG5vZGUud2lkdGggLyAobGVmdFdpZHRoICsgcmlnaHRXaWR0aCkpID4gMSA/IDEgOiAobm9kZS53aWR0aCAvIChsZWZ0V2lkdGggKyByaWdodFdpZHRoKSk7XHJcbiAgICAgICAgbGV0IHlTY2FsZSA9IChub2RlLmhlaWdodCAvICh0b3BIZWlnaHQgKyBib3R0b21IZWlnaHQpKSA+IDEgPyAxIDogKG5vZGUuaGVpZ2h0IC8gKHRvcEhlaWdodCArIGJvdHRvbUhlaWdodCkpO1xyXG4gICAgICAgIGxldCBvZmZzZXRXaWR0aCA9IDAsIG9mZnNldEhlaWdodCA9IDA7XHJcbiAgICAgICAgaWYgKGNlbnRlcldpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKiBCZWNhdXNlIHRoZSBmbG9hdCBudW1lcmljYWwgY2FsY3VsYXRpb24gaW4gamF2YXNjcmlwdCBpcyBub3QgYWNjdXJhdGUgZW5vdWdoLCBcclxuICAgICAgICAgICAgICogdGhlcmUgaXMgYW4gZXhwZWN0ZWQgcmVzdWx0IG9mIDEuMCwgYnV0IHRoZSBhY3R1YWwgcmVzdWx0IGlzIDEuMDAwMDAxLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgb2Zmc2V0V2lkdGggPSBNYXRoLmZsb29yKHRoaXMuc2l6YWJsZVdpZHRoICogMTAwMCkgLyAxMDAwICUgY2VudGVyV2lkdGggPT09IDAgPyBjZW50ZXJXaWR0aCA6IHRoaXMuc2l6YWJsZVdpZHRoICUgY2VudGVyV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvZmZzZXRXaWR0aCA9IHRoaXMuc2l6YWJsZVdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2VudGVySGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICBvZmZzZXRIZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuc2l6YWJsZUhlaWdodCAqIDEwMDApIC8gMTAwMCAlIGNlbnRlckhlaWdodCA9PT0gMCA/IGNlbnRlckhlaWdodCA6IHRoaXMuc2l6YWJsZUhlaWdodCAlIGNlbnRlckhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IHRoaXMuc2l6YWJsZUhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGNvbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB4W2ldID0gLSBhcHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPiAwICYmIGkgPCBjb2wpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeFtpXSA9IGxlZnRXaWR0aCAqIHhTY2FsZSArIE1hdGgubWluKGNlbnRlcldpZHRoLCB0aGlzLnNpemFibGVXaWR0aCkgLSBhcHB4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbnRlcldpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gKGNvbCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4W2ldID0gbGVmdFdpZHRoICsgb2Zmc2V0V2lkdGggKyBjZW50ZXJXaWR0aCAqIChpIC0gMikgLSBhcHB4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeFtpXSA9IGxlZnRXaWR0aCArIE1hdGgubWluKGNlbnRlcldpZHRoLCB0aGlzLnNpemFibGVXaWR0aCkgKyBjZW50ZXJXaWR0aCAqIChpIC0gMikgLSBhcHB4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4W2ldID0gbGVmdFdpZHRoICsgdGhpcy5zaXphYmxlV2lkdGggLSBhcHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID09PSBjb2wpIHtcclxuICAgICAgICAgICAgICAgIHhbaV0gPSBNYXRoLm1pbihsZWZ0V2lkdGggKyB0aGlzLnNpemFibGVXaWR0aCArIHJpZ2h0V2lkdGgsIGNvbnRlbnRXaWR0aCkgLSBhcHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHJvdzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB5W2ldID0gLSBhcHB5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPiAwICYmIGkgPCByb3cpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeVtpXSA9IGJvdHRvbUhlaWdodCAqIHlTY2FsZSArIE1hdGgubWluKGNlbnRlckhlaWdodCwgdGhpcy5zaXphYmxlSGVpZ2h0KSAtIGFwcHk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VudGVySGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gKHJvdyAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5W2ldID0gYm90dG9tSGVpZ2h0ICsgb2Zmc2V0SGVpZ2h0ICsgKGkgLSAyKSAqIGNlbnRlckhlaWdodCAtIGFwcHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5W2ldID0gYm90dG9tSGVpZ2h0ICsgTWF0aC5taW4oY2VudGVySGVpZ2h0LCB0aGlzLnNpemFibGVIZWlnaHQpICsgKGkgLSAyKSAqIGNlbnRlckhlaWdodCAtIGFwcHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlbaV0gPSBib3R0b21IZWlnaHQgKyB0aGlzLnNpemFibGVIZWlnaHQgLSBhcHB5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID09PSByb3cpIHtcclxuICAgICAgICAgICAgICAgIHlbaV0gPSBNYXRoLm1pbihib3R0b21IZWlnaHQgKyB0aGlzLnNpemFibGVIZWlnaHQgKyB0b3BIZWlnaHQsIGNvbnRlbnRIZWlnaHQpIC0gYXBweTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVXb3JsZFZlcnRzKHNwcml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVdvcmxkVmVydHMoc3ByaXRlKSB7XHJcbiAgICAgICAgbGV0IHJlbmRlckRhdGEgPSB0aGlzLl9yZW5kZXJEYXRhO1xyXG4gICAgICAgIGxldCBsb2NhbDogYW55ID0gdGhpcy5fbG9jYWw7XHJcbiAgICAgICAgbGV0IGxvY2FsWCA9IGxvY2FsLngsIGxvY2FsWSA9IGxvY2FsLnk7XHJcbiAgICAgICAgbGV0IHdvcmxkID0gcmVuZGVyRGF0YS52RGF0YXNbMF07XHJcbiAgICAgICAgbGV0IHsgcm93LCBjb2wgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG1hdHJpeCA9IHNwcml0ZS5ub2RlLl93b3JsZE1hdHJpeDtcclxuICAgICAgICBsZXQgbWF0cml4bSA9IG1hdHJpeC5tO1xyXG4gICAgICAgIGxldCBhID0gbWF0cml4bVswXSwgYiA9IG1hdHJpeG1bMV0sIGMgPSBtYXRyaXhtWzRdLCBkID0gbWF0cml4bVs1XSxcclxuICAgICAgICAgICAgdHggPSBtYXRyaXhtWzEyXSwgdHkgPSBtYXRyaXhtWzEzXTtcclxuXHJcbiAgICAgICAgbGV0IHgsIHgxLCB5LCB5MTtcclxuICAgICAgICBsZXQgZmxvYXRzUGVyVmVydCA9IHRoaXMuZmxvYXRzUGVyVmVydDtcclxuICAgICAgICBsZXQgdmVydGV4T2Zmc2V0ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKENDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHlpbmRleCA9IDAsIHlsZW5ndGggPSByb3c7IHlpbmRleCA8IHlsZW5ndGg7ICsreWluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB5ID0gbG9jYWxZW3lpbmRleF07XHJcbiAgICAgICAgICAgICAgICB5MSA9IGxvY2FsWVt5aW5kZXggKyAxXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHhpbmRleCA9IDAsIHhsZW5ndGggPSBjb2w7IHhpbmRleCA8IHhsZW5ndGg7ICsreGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IGxvY2FsWFt4aW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIHgxID0gbG9jYWxYW3hpbmRleCArIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBsYlxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkW3ZlcnRleE9mZnNldF0gPSB4O1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkW3ZlcnRleE9mZnNldCArIDFdID0geTtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgICAgICAgICAvLyByYlxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkW3ZlcnRleE9mZnNldF0gPSB4MTtcclxuICAgICAgICAgICAgICAgICAgICB3b3JsZFt2ZXJ0ZXhPZmZzZXQgKyAxXSA9IHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4T2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbHRcclxuICAgICAgICAgICAgICAgICAgICB3b3JsZFt2ZXJ0ZXhPZmZzZXRdID0geDtcclxuICAgICAgICAgICAgICAgICAgICB3b3JsZFt2ZXJ0ZXhPZmZzZXQgKyAxXSA9IHkxO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleE9mZnNldCArPSBmbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJ0XHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRbdmVydGV4T2Zmc2V0XSA9IHgxO1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkW3ZlcnRleE9mZnNldCArIDFdID0geTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4T2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5aW5kZXggPSAwLCB5bGVuZ3RoID0gcm93OyB5aW5kZXggPCB5bGVuZ3RoOyArK3lpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgeSA9IGxvY2FsWVt5aW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgeTEgPSBsb2NhbFlbeWluZGV4ICsgMV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB4aW5kZXggPSAwLCB4bGVuZ3RoID0gY29sOyB4aW5kZXggPCB4bGVuZ3RoOyArK3hpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSBsb2NhbFhbeGluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICB4MSA9IGxvY2FsWFt4aW5kZXggKyAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGJcclxuICAgICAgICAgICAgICAgICAgICB3b3JsZFt2ZXJ0ZXhPZmZzZXRdID0geCAqIGEgKyB5ICogYyArIHR4O1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkW3ZlcnRleE9mZnNldCArIDFdID0geCAqIGIgKyB5ICogZCArIHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleE9mZnNldCArPSBmbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJiXHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRbdmVydGV4T2Zmc2V0XSA9IHgxICogYSArIHkgKiBjICsgdHg7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRbdmVydGV4T2Zmc2V0ICsgMV0gPSB4MSAqIGIgKyB5ICogZCArIHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleE9mZnNldCArPSBmbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGx0XHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRbdmVydGV4T2Zmc2V0XSA9IHggKiBhICsgeTEgKiBjICsgdHg7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRbdmVydGV4T2Zmc2V0ICsgMV0gPSB4ICogYiArIHkxICogZCArIHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleE9mZnNldCArPSBmbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJ0XHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRbdmVydGV4T2Zmc2V0XSA9IHgxICogYSArIHkxICogYyArIHR4O1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkW3ZlcnRleE9mZnNldCArIDFdID0geDEgKiBiICsgeTEgKiBkICsgdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4T2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVVWcyhzcHJpdGUpIHtcclxuICAgICAgICBsZXQgdmVydHMgPSB0aGlzLl9yZW5kZXJEYXRhLnZEYXRhc1swXTtcclxuICAgICAgICBpZiAoIXZlcnRzKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBmcmFtZSA9IHNwcml0ZS5fc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgbGV0IHJlY3QgPSBmcmFtZS5fcmVjdDtcclxuICAgICAgICBsZXQgbGVmdFdpZHRoID0gZnJhbWUuaW5zZXRMZWZ0LCByaWdodFdpZHRoID0gZnJhbWUuaW5zZXRSaWdodCwgY2VudGVyV2lkdGggPSByZWN0LndpZHRoIC0gbGVmdFdpZHRoIC0gcmlnaHRXaWR0aCxcclxuICAgICAgICAgICAgdG9wSGVpZ2h0ID0gZnJhbWUuaW5zZXRUb3AsIGJvdHRvbUhlaWdodCA9IGZyYW1lLmluc2V0Qm90dG9tLCBjZW50ZXJIZWlnaHQgPSByZWN0LmhlaWdodCAtIHRvcEhlaWdodCAtIGJvdHRvbUhlaWdodDtcclxuXHJcbiAgICAgICAgbGV0IHsgcm93LCBjb2wsIGhSZXBlYXQsIHZSZXBlYXQgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNvZWZ1ID0gMCwgY29lZnYgPSAwO1xyXG4gICAgICAgIGxldCB1diA9IHNwcml0ZS5zcHJpdGVGcmFtZS51djtcclxuICAgICAgICBsZXQgdXZTbGljZWQgPSBzcHJpdGUuc3ByaXRlRnJhbWUudXZTbGljZWQ7XHJcbiAgICAgICAgbGV0IHJvdGF0ZWQgPSBzcHJpdGUuc3ByaXRlRnJhbWUuX3JvdGF0ZWQ7XHJcbiAgICAgICAgbGV0IGZsb2F0c1BlclZlcnQgPSB0aGlzLmZsb2F0c1BlclZlcnQsIHV2T2Zmc2V0ID0gdGhpcy51dk9mZnNldDtcclxuICAgICAgICBsZXQgdGVtcFhWZXJ0cyA9IFtdLCB0ZW1wWVZlcnRzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgeWluZGV4ID0gMCwgeWxlbmd0aCA9IHJvdzsgeWluZGV4IDwgeWxlbmd0aDsgKyt5aW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2l6YWJsZUhlaWdodCA+IGNlbnRlckhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2l6YWJsZUhlaWdodCA+PSB5aW5kZXggKiBjZW50ZXJIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2VmdiA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2VmdiA9IHZSZXBlYXQgJSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29lZnYgPSB2UmVwZWF0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IHhpbmRleCA9IDAsIHhsZW5ndGggPSBjb2w7IHhpbmRleCA8IHhsZW5ndGg7ICsreGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaXphYmxlV2lkdGggPiBjZW50ZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNpemFibGVXaWR0aCA+PSB4aW5kZXggKiBjZW50ZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2VmdSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2VmdSA9IGhSZXBlYXQgJSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvZWZ1ID0gaFJlcGVhdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocm90YXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh5aW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFhWZXJ0c1swXSA9IHV2U2xpY2VkWzBdLnU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBYVmVydHNbMV0gPSB1dlNsaWNlZFswXS51O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWFZlcnRzWzJdID0gdXZTbGljZWRbNF0udSArICh1dlNsaWNlZFs4XS51IC0gdXZTbGljZWRbNF0udSkgKiBjb2VmdjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHlpbmRleCA8IChyb3cgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWFZlcnRzWzBdID0gdXZTbGljZWRbNF0udTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFhWZXJ0c1sxXSA9IHV2U2xpY2VkWzRdLnU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBYVmVydHNbMl0gPSB1dlNsaWNlZFs0XS51ICsgKHV2U2xpY2VkWzhdLnUgLSB1dlNsaWNlZFs0XS51KSAqIGNvZWZ2O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeWluZGV4ID09PSAocm93IC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFhWZXJ0c1swXSA9IHV2U2xpY2VkWzhdLnU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBYVmVydHNbMV0gPSB1dlNsaWNlZFs4XS51O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWFZlcnRzWzJdID0gdXZTbGljZWRbMTJdLnU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFlWZXJ0c1swXSA9IHV2U2xpY2VkWzBdLnY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBZVmVydHNbMV0gPSB1dlNsaWNlZFsxXS52ICsgKHV2U2xpY2VkWzJdLnYgLSB1dlNsaWNlZFsxXS52KSAqIGNvZWZ1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWVZlcnRzWzJdID0gdXZTbGljZWRbMF0udjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhpbmRleCA8IChjb2wgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWVZlcnRzWzBdID0gdXZTbGljZWRbMV0udjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFlWZXJ0c1sxXSA9IHV2U2xpY2VkWzFdLnYgKyAodXZTbGljZWRbMl0udiAtIHV2U2xpY2VkWzFdLnYpICogY29lZnU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBZVmVydHNbMl0gPSB1dlNsaWNlZFsxXS52O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeGluZGV4ID09PSAoY29sIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFlWZXJ0c1swXSA9IHV2U2xpY2VkWzJdLnY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBZVmVydHNbMV0gPSB1dlNsaWNlZFszXS52O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWVZlcnRzWzJdID0gdXZTbGljZWRbMl0udjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcFhWZXJ0c1szXSA9IHRlbXBYVmVydHNbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcFlWZXJ0c1szXSA9IHRlbXBZVmVydHNbMV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBYVmVydHNbMF0gPSB1dlNsaWNlZFswXS51O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWFZlcnRzWzFdID0gdXZTbGljZWRbMV0udSArICh1dlNsaWNlZFsyXS51IC0gdXZTbGljZWRbMV0udSkgKiBjb2VmdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFhWZXJ0c1syXSA9IHV2WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeGluZGV4IDwgKGNvbCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBYVmVydHNbMF0gPSB1dlNsaWNlZFsxXS51O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWFZlcnRzWzFdID0gdXZTbGljZWRbMV0udSArICh1dlNsaWNlZFsyXS51IC0gdXZTbGljZWRbMV0udSkgKiBjb2VmdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFhWZXJ0c1syXSA9IHV2U2xpY2VkWzFdLnU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh4aW5kZXggPT09IChjb2wgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWFZlcnRzWzBdID0gdXZTbGljZWRbMl0udTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFhWZXJ0c1sxXSA9IHV2U2xpY2VkWzNdLnU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBYVmVydHNbMl0gPSB1dlNsaWNlZFsyXS51O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeWluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBZVmVydHNbMF0gPSB1dlNsaWNlZFswXS52O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWVZlcnRzWzFdID0gdXZTbGljZWRbMF0udjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFlWZXJ0c1syXSA9IHV2U2xpY2VkWzRdLnYgKyAodXZTbGljZWRbOF0udiAtIHV2U2xpY2VkWzRdLnYpICogY29lZnY7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh5aW5kZXggPCAocm93IC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFlWZXJ0c1swXSA9IHV2U2xpY2VkWzRdLnY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBZVmVydHNbMV0gPSB1dlNsaWNlZFs0XS52O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWVZlcnRzWzJdID0gdXZTbGljZWRbNF0udiArICh1dlNsaWNlZFs4XS52IC0gdXZTbGljZWRbNF0udikgKiBjb2VmdjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHlpbmRleCA9PT0gKHJvdyAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBZVmVydHNbMF0gPSB1dlNsaWNlZFs4XS52O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wWVZlcnRzWzFdID0gdXZTbGljZWRbOF0udjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFlWZXJ0c1syXSA9IHV2U2xpY2VkWzEyXS52O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0ZW1wWFZlcnRzWzNdID0gdGVtcFhWZXJ0c1sxXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wWVZlcnRzWzNdID0gdGVtcFlWZXJ0c1syXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGxiXHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldF0gPSB0ZW1wWFZlcnRzWzBdO1xyXG4gICAgICAgICAgICAgICAgdmVydHNbdXZPZmZzZXQgKyAxXSA9IHRlbXBZVmVydHNbMF07XHJcbiAgICAgICAgICAgICAgICB1dk9mZnNldCArPSBmbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgICAgICAgICAgLy8gcmJcclxuICAgICAgICAgICAgICAgIHZlcnRzW3V2T2Zmc2V0XSA9IHRlbXBYVmVydHNbMV07XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldCArIDFdID0gdGVtcFlWZXJ0c1sxXTtcclxuICAgICAgICAgICAgICAgIHV2T2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgICAgICAgICAvLyBsdFxyXG4gICAgICAgICAgICAgICAgdmVydHNbdXZPZmZzZXRdID0gdGVtcFhWZXJ0c1syXTtcclxuICAgICAgICAgICAgICAgIHZlcnRzW3V2T2Zmc2V0ICsgMV0gPSB0ZW1wWVZlcnRzWzJdO1xyXG4gICAgICAgICAgICAgICAgdXZPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgICAgIC8vIHJ0XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldF0gPSB0ZW1wWFZlcnRzWzNdO1xyXG4gICAgICAgICAgICAgICAgdmVydHNbdXZPZmZzZXQgKyAxXSA9IHRlbXBZVmVydHNbM107XHJcbiAgICAgICAgICAgICAgICB1dk9mZnNldCArPSBmbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==