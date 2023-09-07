"use strict";
cc._RF.push(module, '37463cgERBLhI8K7rCWzz1m', 'MultiAssemblerRadialFilled');
// scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerRadialFilled.ts

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
var PI_2 = Math.PI * 2;
var _vertPos = [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)];
var _vertices = [0, 0, 0, 0];
var _uvs = [0, 0, 0, 0, 0, 0, 0, 0];
var _intersectPoint_1 = [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)];
var _intersectPoint_2 = [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)];
var _center = cc.v2(0, 0);
var _triangles = [];
function _calcInsectedPoints(left, right, bottom, top, center, angle, intersectPoints) {
    //left bottom, right, top
    var sinAngle = Math.sin(angle);
    var cosAngle = Math.cos(angle);
    var tanAngle, cotAngle;
    if (Math.cos(angle) !== 0) {
        tanAngle = sinAngle / cosAngle;
        //calculate right and left
        if ((left - center.x) * cosAngle > 0) {
            var yleft = center.y + tanAngle * (left - center.x);
            intersectPoints[0].x = left;
            intersectPoints[0].y = yleft;
        }
        if ((right - center.x) * cosAngle > 0) {
            var yright = center.y + tanAngle * (right - center.x);
            intersectPoints[2].x = right;
            intersectPoints[2].y = yright;
        }
    }
    if (Math.sin(angle) !== 0) {
        cotAngle = cosAngle / sinAngle;
        //calculate  top and bottom
        if ((top - center.y) * sinAngle > 0) {
            var xtop = center.x + cotAngle * (top - center.y);
            intersectPoints[3].x = xtop;
            intersectPoints[3].y = top;
        }
        if ((bottom - center.y) * sinAngle > 0) {
            var xbottom = center.x + cotAngle * (bottom - center.y);
            intersectPoints[1].x = xbottom;
            intersectPoints[1].y = bottom;
        }
    }
}
function _calculateVertices(sprite) {
    var node = sprite.node, width = node.width, height = node.height, appx = node.anchorX * width, appy = node.anchorY * height;
    var l = -appx, b = -appy, r = width - appx, t = height - appy;
    var vertices = _vertices;
    vertices[0] = l;
    vertices[1] = b;
    vertices[2] = r;
    vertices[3] = t;
    var fillCenter = sprite._fillCenter, cx = _center.x = Math.min(Math.max(0, fillCenter.x), 1) * (r - l) + l, cy = _center.y = Math.min(Math.max(0, fillCenter.y), 1) * (t - b) + b;
    _vertPos[0].x = _vertPos[3].x = l;
    _vertPos[1].x = _vertPos[2].x = r;
    _vertPos[0].y = _vertPos[1].y = b;
    _vertPos[2].y = _vertPos[3].y = t;
    _triangles.length = 0;
    if (cx !== vertices[0]) {
        _triangles[0] = [3, 0];
    }
    if (cx !== vertices[2]) {
        _triangles[2] = [1, 2];
    }
    if (cy !== vertices[1]) {
        _triangles[1] = [0, 1];
    }
    if (cy !== vertices[3]) {
        _triangles[3] = [2, 3];
    }
}
function _calculateUVs(spriteFrame) {
    var atlasWidth = spriteFrame._texture.width;
    var atlasHeight = spriteFrame._texture.height;
    var textureRect = spriteFrame._rect;
    var u0, u1, v0, v1;
    var uvs = _uvs;
    if (spriteFrame._rotated) {
        u0 = (textureRect.x) / atlasWidth;
        u1 = (textureRect.x + textureRect.height) / atlasWidth;
        v0 = (textureRect.y) / atlasHeight;
        v1 = (textureRect.y + textureRect.width) / atlasHeight;
        uvs[0] = uvs[2] = u0;
        uvs[4] = uvs[6] = u1;
        uvs[3] = uvs[7] = v1;
        uvs[1] = uvs[5] = v0;
    }
    else {
        u0 = (textureRect.x) / atlasWidth;
        u1 = (textureRect.x + textureRect.width) / atlasWidth;
        v0 = (textureRect.y) / atlasHeight;
        v1 = (textureRect.y + textureRect.height) / atlasHeight;
        uvs[0] = uvs[4] = u0;
        uvs[2] = uvs[6] = u1;
        uvs[1] = uvs[3] = v1;
        uvs[5] = uvs[7] = v0;
    }
}
function _getVertAngle(start, end) {
    var placementX, placementY;
    placementX = end.x - start.x;
    placementY = end.y - start.y;
    if (placementX === 0 && placementY === 0) {
        return undefined;
    }
    else if (placementX === 0) {
        if (placementY > 0) {
            return Math.PI * 0.5;
        }
        else {
            return Math.PI * 1.5;
        }
    }
    else {
        var angle = Math.atan(placementY / placementX);
        if (placementX < 0) {
            angle += Math.PI;
        }
        return angle;
    }
}
var MultiAssemblerRadialFilled = /** @class */ (function (_super) {
    __extends(MultiAssemblerRadialFilled, _super);
    function MultiAssemblerRadialFilled() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiAssemblerRadialFilled.prototype.initData = function () {
        this._renderData.createFlexData(0, 4, 6, this.getVfmt());
        this.updateIndices();
    };
    MultiAssemblerRadialFilled.prototype.updateRenderData = function (sprite) {
        var frame = sprite.spriteFrame;
        this.packToDynamicAtlas(sprite, frame);
        if (sprite._vertsDirty) {
            var fillStart = sprite._fillStart;
            var fillRange = sprite._fillRange;
            if (fillRange < 0) {
                fillStart += fillRange;
                fillRange = -fillRange;
            }
            //do round fill start [0,1), include 0, exclude 1
            while (fillStart >= 1.0)
                fillStart -= 1.0;
            while (fillStart < 0.0)
                fillStart += 1.0;
            fillStart *= PI_2;
            fillRange *= PI_2;
            //build vertices
            _calculateVertices(sprite);
            //build uvs
            _calculateUVs(frame);
            _calcInsectedPoints(_vertices[0], _vertices[2], _vertices[1], _vertices[3], _center, fillStart, _intersectPoint_1);
            _calcInsectedPoints(_vertices[0], _vertices[2], _vertices[1], _vertices[3], _center, fillStart + fillRange, _intersectPoint_2);
            this.updateVerts(sprite, fillStart, fillRange);
            this.updateTextureIdx(sprite);
            sprite._vertsDirty = false;
        }
    };
    MultiAssemblerRadialFilled.prototype.updateVerts = function (sprite, fillStart, fillRange) {
        var fillEnd = fillStart + fillRange;
        var local = this._local;
        local.length = 0;
        var offset = 0;
        var floatsPerTriangle = 3 * this.floatsPerVert;
        for (var triangleIndex = 0; triangleIndex < 4; ++triangleIndex) {
            var triangle = _triangles[triangleIndex];
            if (!triangle) {
                continue;
            }
            //all in
            if (fillRange >= PI_2) {
                local.length = offset + floatsPerTriangle;
                this._generateTriangle(local, offset, _center, _vertPos[triangle[0]], _vertPos[triangle[1]]);
                offset += floatsPerTriangle;
                continue;
            }
            //test against
            var startAngle = _getVertAngle(_center, _vertPos[triangle[0]]);
            var endAngle = _getVertAngle(_center, _vertPos[triangle[1]]);
            if (endAngle < startAngle)
                endAngle += PI_2;
            startAngle -= PI_2;
            endAngle -= PI_2;
            //testing
            for (var testIndex = 0; testIndex < 3; ++testIndex) {
                if (startAngle >= fillEnd) {
                    //all out
                }
                else if (startAngle >= fillStart) {
                    local.length = offset + floatsPerTriangle;
                    if (endAngle >= fillEnd) {
                        //startAngle to fillEnd
                        this._generateTriangle(local, offset, _center, _vertPos[triangle[0]], _intersectPoint_2[triangleIndex]);
                    }
                    else {
                        //startAngle to endAngle
                        this._generateTriangle(local, offset, _center, _vertPos[triangle[0]], _vertPos[triangle[1]]);
                    }
                    offset += floatsPerTriangle;
                }
                else {
                    //startAngle < fillStart
                    if (endAngle <= fillStart) {
                        //all out
                    }
                    else if (endAngle <= fillEnd) {
                        local.length = offset + floatsPerTriangle;
                        //fillStart to endAngle
                        this._generateTriangle(local, offset, _center, _intersectPoint_1[triangleIndex], _vertPos[triangle[1]]);
                        offset += floatsPerTriangle;
                    }
                    else {
                        local.length = offset + floatsPerTriangle;
                        //fillStart to fillEnd
                        this._generateTriangle(local, offset, _center, _intersectPoint_1[triangleIndex], _intersectPoint_2[triangleIndex]);
                        offset += floatsPerTriangle;
                    }
                }
                //add 2 * PI
                startAngle += PI_2;
                endAngle += PI_2;
            }
        }
        this.allocWorldVerts(sprite);
        this.updateWorldVerts(sprite);
    };
    MultiAssemblerRadialFilled.prototype.allocWorldVerts = function (sprite) {
        var color = sprite.node._color._val;
        var renderData = this._renderData;
        var floatsPerVert = this.floatsPerVert;
        var local = this._local;
        var verticesCount = local.length / floatsPerVert;
        this.verticesCount = this.indicesCount = verticesCount;
        var flexBuffer = renderData._flexBuffer;
        if (flexBuffer.reserve(verticesCount, verticesCount)) {
            this.updateIndices();
        }
        flexBuffer.used(this.verticesCount, this.indicesCount);
        var verts = renderData.vDatas[0], uintVerts = renderData.uintVDatas[0];
        var uvOffset = this.uvOffset;
        for (var offset = 0; offset < local.length; offset += floatsPerVert) {
            var start = offset + uvOffset;
            verts[start] = local[start];
            verts[start + 1] = local[start + 1];
            uintVerts[start + 2] = color;
        }
    };
    MultiAssemblerRadialFilled.prototype.updateIndices = function () {
        var iData = this._renderData.iDatas[0];
        for (var i = 0; i < iData.length; i++) {
            iData[i] = i;
        }
    };
    MultiAssemblerRadialFilled.prototype.updateWorldVerts = function (sprite) {
        if (CC_NATIVERENDERER) {
            var local = this._local;
            var world = this._renderData.vDatas[0];
            var floatsPerVert = this.floatsPerVert;
            for (var offset = 0, l = world.length; offset < l; offset += floatsPerVert) {
                world[offset] = local[offset];
                world[offset + 1] = local[offset + 1];
            }
        }
        else {
            var node = sprite.node;
            var matrix = node._worldMatrix;
            var matrixm = matrix.m, a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5], tx = matrixm[12], ty = matrixm[13];
            var local = this._local;
            var world = this._renderData.vDatas[0];
            var floatsPerVert = this.floatsPerVert;
            for (var offset = 0; offset < local.length; offset += floatsPerVert) {
                var x = local[offset];
                var y = local[offset + 1];
                world[offset] = x * a + y * c + tx;
                world[offset + 1] = x * b + y * d + ty;
            }
        }
    };
    MultiAssemblerRadialFilled.prototype._generateTriangle = function (verts, offset, vert0, vert1, vert2) {
        var vertices = _vertices;
        var v0x = vertices[0];
        var v0y = vertices[1];
        var v1x = vertices[2];
        var v1y = vertices[3];
        var floatsPerVert = this.floatsPerVert;
        verts[offset] = vert0.x;
        verts[offset + 1] = vert0.y;
        verts[offset + floatsPerVert] = vert1.x;
        verts[offset + floatsPerVert + 1] = vert1.y;
        verts[offset + floatsPerVert * 2] = vert2.x;
        verts[offset + floatsPerVert * 2 + 1] = vert2.y;
        var uvOffset = this.uvOffset;
        var progressX, progressY;
        progressX = (vert0.x - v0x) / (v1x - v0x);
        progressY = (vert0.y - v0y) / (v1y - v0y);
        this._generateUV(progressX, progressY, verts, offset + uvOffset);
        progressX = (vert1.x - v0x) / (v1x - v0x);
        progressY = (vert1.y - v0y) / (v1y - v0y);
        this._generateUV(progressX, progressY, verts, offset + floatsPerVert + uvOffset);
        progressX = (vert2.x - v0x) / (v1x - v0x);
        progressY = (vert2.y - v0y) / (v1y - v0y);
        this._generateUV(progressX, progressY, verts, offset + floatsPerVert * 2 + uvOffset);
    };
    MultiAssemblerRadialFilled.prototype._generateUV = function (progressX, progressY, verts, offset) {
        var uvs = _uvs;
        var px1 = uvs[0] + (uvs[2] - uvs[0]) * progressX;
        var px2 = uvs[4] + (uvs[6] - uvs[4]) * progressX;
        var py1 = uvs[1] + (uvs[3] - uvs[1]) * progressX;
        var py2 = uvs[5] + (uvs[7] - uvs[5]) * progressX;
        verts[offset] = px1 + (px2 - px1) * progressY;
        verts[offset + 1] = py1 + (py2 - py1) * progressY;
    };
    return MultiAssemblerRadialFilled;
}(MultiAssembler_1.default));
exports.default = MultiAssemblerRadialFilled;

cc._RF.pop();