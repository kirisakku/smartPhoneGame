'use strict';

import DrawGame from './DrawGame.js';
import Rect from './Rect.js';
import Point from './Point.js';
import HitTest from './HitTest.js';

const LENGTH = 600;

export default class Game {

    init(){
        const canvas = document.getElementById('test');
        this._ctx = canvas.getContext('2d');

        // イベントハンドラ追加
        canvas.addEventListener('mousedown', this.mouseDown, false);
        canvas.thisArg = this;

        // 描画クラス作成
        this._draw = new DrawGame(this);
        // 描画領域取得
        const rect = this.getGameRect();

        // ヒットテストクラス作成
        this._hitTest = new HitTest(this);

        // 背景描画関数の呼び出し
        this._draw.drawInit(this._ctx, rect);
    }

    startGame(ctx) {
        // 描画領域取得
        const rect = this.getGameRect();
        // スマートフォン画面の表示
        this._draw.drawSmartPhone(ctx, rect);
    }

    getGameRect() {
        return new Rect(0, 0, LENGTH, LENGTH);
    }

    getStartButtonRect() {
        return new Rect(LENGTH / 3, LENGTH * 2 / 3, LENGTH / 3, LENGTH / 6);
    }

    mouseDown(event) {
        const game = this.thisArg;

        // 座標の取得
        const point = new Point(event.x, event.y);
        // contextの取得
        const ctx = game._ctx;

        // ヒットテストを実施
        game._hitTest.hitTest(ctx, point);
    }
}
