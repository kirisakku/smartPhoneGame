'use strict';

export default class HitTest {

    constructor(parent) {
        this._parent = parent;
    }

    hitTest(ctx, point) {
        // スタートボタンに対するヒットテスト
        if (this.isHitStartButton(ctx, point)) {
            this._parent.startGame(ctx);
        }
    }

    isHitStartButton(ctx, point) {
        const startButtonRect = this._parent.getStartButtonRect();
        ctx.rect(startButtonRect.x, startButtonRect.y, startButtonRect.width, startButtonRect.height);
        return ctx.isPointInPath(point.x, point.y);
    }
}