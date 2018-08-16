'use strict';

const BACKGROUND_COLOR = '#d6ffd6';
const TEXT_COLOR = '#088A29';
const START_FONT = '40px "ＭＳ ゴシック"';
const BUTTON_FONT = '25px "ＭＳ ゴシック"';
const START_BUTTON_COLOR = 'orange';

export default class DrawGame {

    constructor(parent) {
        this._parent = parent;
    }

    // 初期画面描画
    drawInit(ctx, rect) {
        // 背景描画
        this.drawBackground(ctx, rect);

        // タイトル描画
        this.drawTitle(ctx, rect);

        // スタートボタン描画
        this.drawStartButton(ctx, rect);
    }

    drawBackground(ctx, rect) {
        ctx.save();

        // 背景色描画
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

        ctx.restore();
    }

    drawTitle(ctx, rect) {
        ctx.save();

        // フォントの設定
        ctx.font = START_FONT;
        // 文字色の設定
        ctx.fillStyle = TEXT_COLOR;
        // 文字位置調整
        ctx.textAlign = 'center';
        // 文字の描画
        const edgeLength = rect.width;
        ctx.fillText('スマホロック', edgeLength / 2, edgeLength / 4, edgeLength);
        ctx.fillText('解除ゲーム', edgeLength / 2, edgeLength / 2, edgeLength);

        ctx.restore();
    }

    drawStartButton(ctx, rect) {
        ctx.save();

        // 下半分の領域の1/3の高さで描画する
        // 左右に画面の長さの1/3ずつのパディングを入れる
        const buttonRect = this._parent.getStartButtonRect();
        ctx.fillStyle = START_BUTTON_COLOR;
        ctx.fillRect(buttonRect.x, buttonRect.y, buttonRect.width, buttonRect.height);

        // フォントの設定
        ctx.font = BUTTON_FONT;
        // 文字色の設定
        ctx.fillStyle = TEXT_COLOR;
        // 文字位置調整
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // 文字の描画
        // 中央揃えにするため、y座標をrectの高さの半分だけ下げる
        const edgeLength = rect.width;
        ctx.fillText('START', edgeLength / 2, edgeLength * 2 / 3 + buttonRect.height / 2, buttonRect.width, buttonRect.height);

        ctx.restore();
    }

    drawSmartPhone(ctx, rect) {
        // 背景色描画
        this.drawBackground(ctx, rect);
    }
}