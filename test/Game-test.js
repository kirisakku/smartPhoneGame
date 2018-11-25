/* global it describe beforeEach afterEach */
import sinon from 'sinon';
import {expect} from 'chai';
import Game from '../src/Game.js';
import Rect from '../src/Rect.js';

describe('Game', function() {
    const sandbox = sinon.sandbox.create();
    let game = null;

    beforeEach(() => {
        game = new Game();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getNumButtonsRect', function() {
        it('正しい結果が返される', function() {
            // margin = 600/10 = 60
            // edgeLength = margin * 2 = 120
            const button1 = new Rect(60, 60, 120, 120);
            const button2 = new Rect(240, 60, 120, 120);
            const button3 = new Rect(420, 60, 120, 120);
            const button4 = new Rect(60, 240, 120, 120);
            const button5 = new Rect(240, 240, 120, 120);
            const button6 = new Rect(420, 240, 120, 120);
            const button7 = new Rect(60, 420, 120, 120);
            const button8 = new Rect(240, 420, 120, 120);
            const button9 = new Rect(420, 420, 120, 120);

            const result = game.getNumButtonsRect();
            expect(result).to.eql([
                button1, button2, button3, button4, button5, button6, button7, button8, button9
            ]);
        });
    });
});
