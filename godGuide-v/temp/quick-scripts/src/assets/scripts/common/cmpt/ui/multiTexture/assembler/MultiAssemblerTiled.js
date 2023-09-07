"use strict";
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