'use strict';

export default class Path {
    // ボタンのパス作成関数
    static makeButtonPath(ctx, rect) {
        ctx.beginPath();

        const redius = rect.height * 0.5;
        ctx.arc(rect.x + redius, rect.y + redius, redius, 0, 2 * Math.PI, false);
    }
}