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

    // 1〜9の全てのボタンの描画範囲となる矩形を返す
    getNumButtonsRect() {
        // 余白を1/10、ボタンの幅/高さを2/10ずつ割り当てる
        const margin = LENGTH * 0.1;
        const edgeLength = LENGTH * 0.2;

        // 1行目
        const button1 = new Rect(margin, margin, edgeLength, edgeLength);
        const button2 = new Rect(button1.x + button1.width + margin, margin, edgeLength, edgeLength);
        const button3 = new Rect(button2.x + button2.width + margin, margin, edgeLength, edgeLength);
        // 2行目
        const button4 = new Rect(button1.x, button1.y + button1.height + margin, edgeLength, edgeLength);
        const button5 = new Rect(button2.x, button4.y, edgeLength, edgeLength);
        const button6 = new Rect(button3.x, button4.y, edgeLength, edgeLength);
        // 3行目
        const button7 = new Rect(button1.x, button4.y + button4.height + margin, edgeLength, edgeLength);
        const button8 = new Rect(button2.x, button7.y, edgeLength, edgeLength);
        const button9 = new Rect(button3.x, button7.y, edgeLength, edgeLength);

        return [
            button1, button2, button3, button4, button5, button6, button7, button8, button9
        ];
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

