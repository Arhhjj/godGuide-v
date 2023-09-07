
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/cmpt/ui/multiTexture/assembler/MultiAssemblerBarFilled.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFxjbXB0XFx1aVxcbXVsdGlUZXh0dXJlXFxhc3NlbWJsZXJcXE11bHRpQXNzZW1ibGVyQmFyRmlsbGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUU5QztJQUFxRCwyQ0FBYztJQUFuRTs7SUF5SUEsQ0FBQztJQXhJVSxrREFBZ0IsR0FBdkIsVUFBd0IsTUFBTTtRQUMxQixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTztTQUNWO1FBRUQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBRWxDLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNmLFNBQVMsSUFBSSxTQUFTLENBQUM7WUFDdkIsU0FBUyxHQUFHLENBQUMsU0FBUyxDQUFDO1NBQzFCO1FBRUQsU0FBUyxHQUFHLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFbEMsU0FBUyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzlDLFNBQVMsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUU5QyxTQUFTLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDOUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxD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QU8sQ0FBQztnQkFFcEMsQ0FBQyxHQUFHLGFBQWEsQ0FBQztnQkFDbEIsQ0FBQyxHQUFHLFdBQVcsQ0FBQztnQkFDaEIsTUFBTTtZQUNWO2dCQUNJLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsTUFBTTtTQUNiO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDTCw4QkFBQztBQUFELENBeklBLEFBeUlDLENBeklvRCx3QkFBYyxHQXlJbEUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTXVsdGlBc3NlbWJsZXIgZnJvbSBcIi4vTXVsdGlBc3NlbWJsZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpQXNzZW1ibGVyQmFyRmlsbGVkIGV4dGVuZHMgTXVsdGlBc3NlbWJsZXIge1xyXG4gICAgcHVibGljIHVwZGF0ZVJlbmRlckRhdGEoc3ByaXRlKSB7XHJcbiAgICAgICAgbGV0IGZyYW1lID0gc3ByaXRlLl9zcHJpdGVGcmFtZTtcclxuICAgICAgICB0aGlzLnBhY2tUb0R5bmFtaWNBdGxhcyhzcHJpdGUsIGZyYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCFzcHJpdGUuX3ZlcnRzRGlydHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZpbGxTdGFydCA9IHNwcml0ZS5fZmlsbFN0YXJ0O1xyXG4gICAgICAgIGxldCBmaWxsUmFuZ2UgPSBzcHJpdGUuX2ZpbGxSYW5nZTtcclxuXHJcbiAgICAgICAgaWYgKGZpbGxSYW5nZSA8IDApIHtcclxuICAgICAgICAgICAgZmlsbFN0YXJ0ICs9IGZpbGxSYW5nZTtcclxuICAgICAgICAgICAgZmlsbFJhbmdlID0gLWZpbGxSYW5nZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpbGxSYW5nZSA9IGZpbGxTdGFydCArIGZpbGxSYW5nZTtcclxuXHJcbiAgICAgICAgZmlsbFN0YXJ0ID0gZmlsbFN0YXJ0ID4gMS4wID8gMS4wIDogZmlsbFN0YXJ0O1xyXG4gICAgICAgIGZpbGxTdGFydCA9IGZpbGxTdGFydCA8IDAuMCA/IDAuMCA6IGZpbGxTdGFydDtcclxuXHJcbiAgICAgICAgZmlsbFJhbmdlID0gZmlsbFJhbmdlID4gMS4wID8gMS4wIDogZmlsbFJhbmdlO1xyXG4gICAgICAgIGZpbGxSYW5nZSA9IGZpbGxSYW5nZSA8IDAuMCA/IDAuMCA6IGZpbGxSYW5nZTtcclxuICAgICAgICBmaWxsUmFuZ2UgPSBmaWxsUmFuZ2UgLSBmaWxsU3RhcnQ7XHJcbiAgICAgICAgZmlsbFJhbmdlID0gZmlsbFJhbmdlIDwgMCA/IDAgOiBmaWxsUmFuZ2U7XHJcblxyXG4gICAgICAgIGxldCBmaWxsRW5kID0gZmlsbFN0YXJ0ICsgZmlsbFJhbmdlO1xyXG4gICAgICAgIGZpbGxFbmQgPSBmaWxsRW5kID4gMSA/IDEgOiBmaWxsRW5kO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVVWcyhzcHJpdGUsIGZpbGxTdGFydCwgZmlsbEVuZCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWZXJ0cyhzcHJpdGUsIGZpbGxTdGFydCwgZmlsbEVuZCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0dXJlSWR4KHNwcml0ZSk7XHJcblxyXG4gICAgICAgIHNwcml0ZS5fdmVydHNEaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVVVnMoc3ByaXRlLCBmaWxsU3RhcnQsIGZpbGxFbmQpIHtcclxuICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSBzcHJpdGUuX3Nwcml0ZUZyYW1lO1xyXG5cclxuICAgICAgICAvL2J1aWxkIHV2c1xyXG4gICAgICAgIGxldCBhdGxhc1dpZHRoID0gc3ByaXRlRnJhbWUuX3RleHR1cmUud2lkdGg7XHJcbiAgICAgICAgbGV0IGF0bGFzSGVpZ2h0ID0gc3ByaXRlRnJhbWUuX3RleHR1cmUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCB0ZXh0dXJlUmVjdCA9IHNwcml0ZUZyYW1lLl9yZWN0O1xyXG4gICAgICAgIC8vdXYgY29tcHV0YXRpb24gc2hvdWxkIHRha2Ugc3ByaXRlc2hlZXQgaW50byBhY2NvdW50LlxyXG4gICAgICAgIGxldCB1bCwgdmIsIHVyLCB2dDtcclxuICAgICAgICBsZXQgcXVhZFVWMCwgcXVhZFVWMSwgcXVhZFVWMiwgcXVhZFVWMywgcXVhZFVWNCwgcXVhZFVWNSwgcXVhZFVWNiwgcXVhZFVWNztcclxuICAgICAgICBpZiAoc3ByaXRlRnJhbWUuX3JvdGF0ZWQpIHtcclxuICAgICAgICAgICAgdWwgPSAodGV4dHVyZVJlY3QueCkgLyBhdGxhc1dpZHRoO1xyXG4gICAgICAgICAgICB2YiA9ICh0ZXh0dXJlUmVjdC55ICsgdGV4dHVyZVJlY3Qud2lkdGgpIC8gYXRsYXNIZWlnaHQ7XHJcbiAgICAgICAgICAgIHVyID0gKHRleHR1cmVSZWN0LnggKyB0ZXh0dXJlUmVjdC5oZWlnaHQpIC8gYXRsYXNXaWR0aDtcclxuICAgICAgICAgICAgdnQgPSAodGV4dHVyZVJlY3QueSkgLyBhdGxhc0hlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHF1YWRVVjAgPSBxdWFkVVYyID0gdWw7XHJcbiAgICAgICAgICAgIHF1YWRVVjQgPSBxdWFkVVY2ID0gdXI7XHJcbiAgICAgICAgICAgIHF1YWRVVjMgPSBxdWFkVVY3ID0gdmI7XHJcbiAgICAgICAgICAgIHF1YWRVVjEgPSBxdWFkVVY1ID0gdnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1bCA9ICh0ZXh0dXJlUmVjdC54KSAvIGF0bGFzV2lkdGg7XHJcbiAgICAgICAgICAgIHZiID0gKHRleHR1cmVSZWN0LnkgKyB0ZXh0dXJlUmVjdC5oZWlnaHQpIC8gYXRsYXNIZWlnaHQ7XHJcbiAgICAgICAgICAgIHVyID0gKHRleHR1cmVSZWN0LnggKyB0ZXh0dXJlUmVjdC53aWR0aCkgLyBhdGxhc1dpZHRoO1xyXG4gICAgICAgICAgICB2dCA9ICh0ZXh0dXJlUmVjdC55KSAvIGF0bGFzSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgcXVhZFVWMCA9IHF1YWRVVjQgPSB1bDtcclxuICAgICAgICAgICAgcXVhZFVWMiA9IHF1YWRVVjYgPSB1cjtcclxuICAgICAgICAgICAgcXVhZFVWMSA9IHF1YWRVVjMgPSB2YjtcclxuICAgICAgICAgICAgcXVhZFVWNSA9IHF1YWRVVjcgPSB2dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2ZXJ0cyA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xyXG4gICAgICAgIGxldCB1dk9mZnNldCA9IHRoaXMudXZPZmZzZXQ7XHJcbiAgICAgICAgbGV0IGZsb2F0c1BlclZlcnQgPSB0aGlzLmZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgc3dpdGNoIChzcHJpdGUuX2ZpbGxUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuU3ByaXRlLkZpbGxUeXBlLkhPUklaT05UQUw6XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldF0gPSBxdWFkVVYwICsgKHF1YWRVVjIgLSBxdWFkVVYwKSAqIGZpbGxTdGFydDtcclxuICAgICAgICAgICAgICAgIHZlcnRzW3V2T2Zmc2V0ICsgMV0gPSBxdWFkVVYxICsgKHF1YWRVVjMgLSBxdWFkVVYxKSAqIGZpbGxTdGFydDtcclxuICAgICAgICAgICAgICAgIHZlcnRzW3V2T2Zmc2V0ICsgZmxvYXRzUGVyVmVydF0gPSBxdWFkVVYwICsgKHF1YWRVVjIgLSBxdWFkVVYwKSAqIGZpbGxFbmQ7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldCArIGZsb2F0c1BlclZlcnQgKyAxXSA9IHF1YWRVVjEgKyAocXVhZFVWMyAtIHF1YWRVVjEpICogZmlsbEVuZDtcclxuICAgICAgICAgICAgICAgIHZlcnRzW3V2T2Zmc2V0ICsgZmxvYXRzUGVyVmVydCAqIDJdID0gcXVhZFVWNCArIChxdWFkVVY2IC0gcXVhZFVWNCkgKiBmaWxsU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldCArIGZsb2F0c1BlclZlcnQgKiAyICsgMV0gPSBxdWFkVVY1ICsgKHF1YWRVVjcgLSBxdWFkVVY1KSAqIGZpbGxTdGFydDtcclxuICAgICAgICAgICAgICAgIHZlcnRzW3V2T2Zmc2V0ICsgZmxvYXRzUGVyVmVydCAqIDNdID0gcXVhZFVWNCArIChxdWFkVVY2IC0gcXVhZFVWNCkgKiBmaWxsRW5kO1xyXG4gICAgICAgICAgICAgICAgdmVydHNbdXZPZmZzZXQgKyBmbG9hdHNQZXJWZXJ0ICogMyArIDFdID0gcXVhZFVWNSArIChxdWFkVVY3IC0gcXVhZFVWNSkgKiBmaWxsRW5kO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuU3ByaXRlLkZpbGxUeXBlLlZFUlRJQ0FMOlxyXG4gICAgICAgICAgICAgICAgdmVydHNbdXZPZmZzZXRdID0gcXVhZFVWMCArIChxdWFkVVY0IC0gcXVhZFVWMCkgKiBmaWxsU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldCArIDFdID0gcXVhZFVWMSArIChxdWFkVVY1IC0gcXVhZFVWMSkgKiBmaWxsU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldCArIGZsb2F0c1BlclZlcnRdID0gcXVhZFVWMiArIChxdWFkVVY2IC0gcXVhZFVWMikgKiBmaWxsU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldCArIGZsb2F0c1BlclZlcnQgKyAxXSA9IHF1YWRVVjMgKyAocXVhZFVWNyAtIHF1YWRVVjMpICogZmlsbFN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdmVydHNbdXZPZmZzZXQgKyBmbG9hdHNQZXJWZXJ0ICogMl0gPSBxdWFkVVYwICsgKHF1YWRVVjQgLSBxdWFkVVYwKSAqIGZpbGxFbmQ7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldCArIGZsb2F0c1BlclZlcnQgKiAyICsgMV0gPSBxdWFkVVYxICsgKHF1YWRVVjUgLSBxdWFkVVYxKSAqIGZpbGxFbmQ7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0c1t1dk9mZnNldCArIGZsb2F0c1BlclZlcnQgKiAzXSA9IHF1YWRVVjIgKyAocXVhZFVWNiAtIHF1YWRVVjIpICogZmlsbEVuZDtcclxuICAgICAgICAgICAgICAgIHZlcnRzW3V2T2Zmc2V0ICsgZmxvYXRzUGVyVmVydCAqIDMgKyAxXSA9IHF1YWRVVjMgKyAocXVhZFVWNyAtIHF1YWRVVjMpICogZmlsbEVuZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2NbXCJlcnJvcklEXCJdKDI2MjYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVWZXJ0cyhzcHJpdGUsIGZpbGxTdGFydCwgZmlsbEVuZCkge1xyXG4gICAgICAgIGxldCBub2RlID0gc3ByaXRlLm5vZGUsXHJcbiAgICAgICAgICAgIHdpZHRoID0gbm9kZS53aWR0aCwgaGVpZ2h0ID0gbm9kZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIGFwcHggPSBub2RlLmFuY2hvclggKiB3aWR0aCwgYXBweSA9IG5vZGUuYW5jaG9yWSAqIGhlaWdodDtcclxuXHJcbiAgICAgICAgbGV0IGwgPSAtYXBweCwgYiA9IC1hcHB5LFxyXG4gICAgICAgICAgICByID0gd2lkdGggLSBhcHB4LCB0ID0gaGVpZ2h0IC0gYXBweTtcclxuXHJcbiAgICAgICAgbGV0IHByb2dyZXNzU3RhcnQsIHByb2dyZXNzRW5kO1xyXG4gICAgICAgIHN3aXRjaCAoc3ByaXRlLl9maWxsVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNjLlNwcml0ZS5GaWxsVHlwZS5IT1JJWk9OVEFMOlxyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NTdGFydCA9IGwgKyAociAtIGwpICogZmlsbFN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NFbmQgPSBsICsgKHIgLSBsKSAqIGZpbGxFbmQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbCA9IHByb2dyZXNzU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICByID0gcHJvZ3Jlc3NFbmQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5TcHJpdGUuRmlsbFR5cGUuVkVSVElDQUw6XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1N0YXJ0ID0gYiArICh0IC0gYikgKiBmaWxsU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VuZCA9IGIgKyAodCAtIGIpICogZmlsbEVuZDtcclxuXHJcbiAgICAgICAgICAgICAgICBiID0gcHJvZ3Jlc3NTdGFydDtcclxuICAgICAgICAgICAgICAgIHQgPSBwcm9ncmVzc0VuZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2NbXCJlcnJvcklEXCJdKDI2MjYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9jYWwgPSB0aGlzLl9sb2NhbDtcclxuICAgICAgICBsb2NhbFswXSA9IGw7XHJcbiAgICAgICAgbG9jYWxbMV0gPSBiO1xyXG4gICAgICAgIGxvY2FsWzJdID0gcjtcclxuICAgICAgICBsb2NhbFszXSA9IHQ7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlV29ybGRWZXJ0cyhzcHJpdGUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==