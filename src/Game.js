import DrawGame from './DrawGame.js';

'use strict';
export default class Game {

    init(){
        const canvas = document.getElementById('test');
        const ctx = canvas.getContext('2d');

        // 描画クラス作成
        const draw = new DrawGame(this);
        // 背景描画関数の呼び出し
        draw.drawBackground(ctx);
    };
}
