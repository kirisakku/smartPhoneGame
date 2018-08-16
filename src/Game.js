'use strict';

import DrawGame from './DrawGame.js';
import Rect from './Rect.js';
const LENGTH = 600;

export default class Game {

    init(){
        const canvas = document.getElementById('test');
        const ctx = canvas.getContext('2d');

        // 描画クラス作成
        const draw = new DrawGame(this);
        // 描画領域取得
        const rect = this.getGameRect();

        // 背景描画関数の呼び出し
        draw.drawBackground(ctx, rect);
    };

    getGameRect() {
        return new Rect(0, 0, LENGTH, LENGTH);
    }

    getStartButtonRect() {
        return new Rect(LENGTH / 3, LENGTH * 2 / 3, LENGTH / 3, LENGTH / 6);
    }
}
