'use strict';

const BACKGROUND_COLOR = '#d6ffd6';
const TEXT_COLOR = '#088A29';
const LENGTH = 400;
const START_FONT = "40px 'ＭＳ ゴシック'";
const BUTTON_FONT = "25px 'ＭＳ ゴシック'";
const START_BUTTON_COLOR = 'orange';

export default class DrawGame {

    constructor(parent) {
        this._parent = parent;
    };

    drawBackground(ctx) {
        ctx.save();

        // 背景色描画
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, LENGTH, LENGTH);

        // タイトル描画
        this.drawTitle(ctx);

        // スタートボタン描画
        this.drawStartButton(ctx);

        ctx.restore();
    }

    drawTitle(ctx) {
        ctx.save();

        // フォントの設定
        ctx.font = START_FONT;
        // 文字色の設定
        ctx.fillStyle = TEXT_COLOR;
        // 文字位置調整
        ctx.textAlign = 'center';
        // 文字の描画
        ctx.fillText('スマホロック', LENGTH / 2, LENGTH / 4, LENGTH);
        ctx.fillText('解除ゲーム', LENGTH / 2, LENGTH / 2, LENGTH);

        ctx.restore();
    }

    drawStartButton(ctx) {
        ctx.save();

        // 下半分の領域の1/3の高さで描画する
        const buttonHeight = LENGTH / 6;
        // 左右に画面の長さの1/3ずつのパディングを入れる
        const buttonWidth = LENGTH / 3;
        ctx.fillStyle = START_BUTTON_COLOR;
        ctx.fillRect(LENGTH / 3, LENGTH * 2 / 3, buttonWidth, buttonHeight);

        // フォントの設定
        ctx.font = BUTTON_FONT;
        // 文字色の設定
        ctx.fillStyle = TEXT_COLOR;
        // 文字位置調整
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // 文字の描画
        // 中央揃えにするため、y座標をrectの高さの半分だけ下げる
        ctx.fillText('START', LENGTH / 2, LENGTH * 2 / 3 + buttonHeight / 2, buttonWidth, buttonHeight);

        ctx.restore();
    }
}