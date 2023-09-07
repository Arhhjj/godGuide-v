"use strict";
cc._RF.push(module, '0d306+qdllOJo+T76peVXVI', 'MultiAssemblerBarFilled');
// scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerBarFilled.ts

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
var MultiAssemblerBarFilled = /** @class */ (function (_super) {
    __extends(MultiAssemblerBarFilled, _super);
    function MultiAssemblerBarFilled() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiAssemblerBarFilled.prototype.updateRenderData = function (sprite) {
        var frame = sprite._spriteFrame;
        this.packToDynamicAtlas(sprite, frame);
        if (!sprite._vertsDirty) {
            return;
        }
        var fillStart = sprite._fillStart;
        var fillRange = sprite._fillRange;
        if (fillRange < 0) {
            fillStart += fillRange;
            fillRange = -fillRange;
        }
        fillRange = fillStart + fillRange;
        fillStart = fillStart > 1.0 ? 1.0 : fillStart;
        fillStart = fillStart < 0.0 ? 0.0 : fillStart;
        fillRange = fillRange > 1.0 ? 1.0 : fillRange;
        fillRange = fillRange < 0.0 ? 0.0 : fillRange;
        fillRange = fillRange - fillStart;
        fillRange = fillRange < 0 ? 0 : fillRange;
        var fillEnd = fillStart + fillRange;
        fillEnd = fillEnd > 1 ? 1 : fillEnd;
        this.updateUVs(sprite, fillStart, fillEnd);
        this.updateVerts(sprite, fillStart, fillEnd);
        this.updateTextureIdx(sprite);
        sprite._vertsDirty = false;
    };
    MultiAssemblerBarFilled.prototype.updateUVs = function (sprite, fillStart, fillEnd) {
        var spriteFrame = sprite._spriteFrame;
        //build uvs
        var atlasWidth = spriteFrame._texture.width;
        var atlasHeight = spriteFrame._texture.height;
        var textureRect = spriteFrame._rect;
        //uv computation should take spritesheet into account.
        var ul, vb, ur, vt;
        var quadUV0, quadUV1, quadUV2, quadUV3, quadUV4, quadUV5, quadUV6, quadUV7;
        if (spriteFrame._rotated) {
            ul = (textureRect.x) / atlasWidth;
            vb = (textureRect.y + textureRect.width) / atlasHeight;
            ur = (textureRect.x + textureRect.height) / atlasWidth;
            vt = (textureRect.y) / atlasHeight;
            quadUV0 = quadUV2 = ul;
            quadUV4 = quadUV6 = ur;
            quadUV3 = quadUV7 = vb;
            quadUV1 = quadUV5 = vt;
        }
        else {
            ul = (textureRect.x) / atlasWidth;
            vb = (textureRect.y + textureRect.height) / atlasHeight;
            ur = (textureRect.x + textureRect.width) / atlasWidth;
            vt = (textureRect.y) / atlasHeight;
            quadUV0 = quadUV4 = ul;
            quadUV2 = quadUV6 = ur;
            quadUV1 = quadUV3 = vb;
            quadUV5 = quadUV7 = vt;
        }
        var verts = this._renderData.vDatas[0];
        var uvOffset = this.uvOffset;
        var floatsPerVert = this.floatsPerVert;
        switch (sprite._fillType) {
            case cc.Sprite.FillType.HORIZONTAL:
                verts[uvOffset] = quadUV0 + (quadUV2 - quadUV0) * fillStart;
                verts[uvOffset + 1] = quadUV1 + (quadUV3 - quadUV1) * fillStart;
                verts[uvOffset + floatsPerVert] = quadUV0 + (quadUV2 - quadUV0) * fillEnd;
                verts[uvOffset + floatsPerVert + 1] = quadUV1 + (quadUV3 - quadUV1) * fillEnd;
                verts[uvOffset + floatsPerVert * 2] = quadUV4 + (quadUV6 - quadUV4) * fillStart;
                verts[uvOffset + floatsPerVert * 2 + 1] = quadUV5 + (quadUV7 - quadUV5) * fillStart;
                verts[uvOffset + floatsPerVert * 3] = quadUV4 + (quadUV6 - quadUV4) * fillEnd;
                verts[uvOffset + floatsPerVert * 3 + 1] = quadUV5 + (quadUV7 - quadUV5) * fillEnd;
                break;
            case cc.Sprite.FillType.VERTICAL:
                verts[uvOffset] = quadUV0 + (quadUV4 - quadUV0) * fillStart;
                verts[uvOffset + 1] = quadUV1 + (quadUV5 - quadUV1) * fillStart;
                verts[uvOffset + floatsPerVert] = quadUV2 + (quadUV6 - quadUV2) * fillStart;
                verts[uvOffset + floatsPerVert + 1] = quadUV3 + (quadUV7 - quadUV3) * fillStart;
                verts[uvOffset + floatsPerVert * 2] = quadUV0 + (quadUV4 - quadUV0) * fillEnd;
                verts[uvOffset + floatsPerVert * 2 + 1] = quadUV1 + (quadUV5 - quadUV1) * fillEnd;
                verts[uvOffset + floatsPerVert * 3] = quadUV2 + (quadUV6 - quadUV2) * fillEnd;
                verts[uvOffset + floatsPerVert * 3 + 1] = quadUV3 + (quadUV7 - quadUV3) * fillEnd;
                break;
            default:
                cc["errorID"](2626);
                break;
        }
    };
    MultiAssemblerBarFilled.prototype.updateVerts = function (sprite, fillStart, fillEnd) {
        var node = sprite.node, width = node.width, height = node.height, appx = node.anchorX * width, appy = node.anchorY * height;
        var l = -appx, b = -appy, r = width - appx, t = height - appy;
        var progressStart, progressEnd;
        switch (sprite._fillType) {
            case cc.Sprite.FillType.HORIZONTAL:
                progressStart = l + (r - l) * fillStart;
                progressEnd = l + (r - l) * fillEnd;
                l = progressStart;
                r = progressEnd;
                break;
            case cc.Sprite.FillType.VERTICAL:
                progressStart = b + (t - b) * fillStart;
                progressEnd = b + (t - b) * fillEnd;
                b = progressStart;
                t = progressEnd;
                break;
            default:
                cc["errorID"](2626);
                break;
        }
        var local = this._local;
        local[0] = l;
        local[1] = b;
        local[2] = r;
        local[3] = t;
        this.updateWorldVerts(sprite);
    };
    return MultiAssemblerBarFilled;
}(MultiAssembler_1.default));
exports.default = MultiAssemblerBarFilled;

cc._RF.pop();