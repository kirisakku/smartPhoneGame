/* global it describe beforeEach afterEach */
import sinon from 'sinon';
import {expect} from 'chai';
import DrawGame from '../src/DrawGame.js';
import Path from '../src/Path.js';
import Rect from '../src/Rect.js';

describe('DrawGame', function() {
    const sandbox = sinon.sandbox.create();
    let drawGame = null;

    beforeEach(() => {
        drawGame = new DrawGame();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('drawInit', function() {
        const ctx = 'ctx';
        const rect = 'rect';

        it('背景描画関数が呼ばれる', function() {
            sandbox.stub(drawGame, 'drawTitle');
            sandbox.stub(drawGame, 'drawStartButton');

            const mock = sandbox.mock(drawGame);
            mock.expects('drawBackground').withArgs(ctx, rect);
            drawGame.drawInit(ctx, rect);
            mock.verify();
        });
        it('タイトル描画関数が呼ばれる', function() {
            sandbox.stub(drawGame, 'drawBackground');
            sandbox.stub(drawGame, 'drawStartButton');

            const mock = sandbox.mock(drawGame);
            mock.expects('drawTitle').withArgs(ctx, rect);
            drawGame.drawInit(ctx, rect);
            mock.verify();
        });
        it('スタートボタン描画関数が呼ばれる', function() {
            sandbox.stub(drawGame, 'drawBackground');
            sandbox.stub(drawGame, 'drawTitle');

            const mock = sandbox.mock(drawGame);
            mock.expects('drawStartButton').withArgs(ctx, rect);
            drawGame.drawInit(ctx, rect);
            mock.verify();
        });
    });

    describe('drawBackground', function() {
        let ctx = null;
        const rect = new Rect(0, 0, 600, 600);

        beforeEach(() => {
            ctx = {
                save: () => {},
                fillRect: () => {},
                restore: () => {}
            };
        });

        it('背景色描画関連の関数が呼ばれる', function() {
            sandbox.stub(drawGame, 'drawTitle');
            sandbox.stub(drawGame, 'drawStartButton');

            const mock = sandbox.mock(ctx);
            mock.expects('save').once();
            mock.expects('fillRect').withArgs(0, 0, 600, 600);
            mock.expects('restore').once();

            drawGame.drawBackground(ctx, rect);

            mock.verify();
        });
    });

    describe('drawTitle', function() {
        let ctx = null;
        const rect = new Rect(0, 0, 600, 600);
        beforeEach(() => {
            ctx = {
                save: () => {},
                fillText: () => {},
                restore: () => {}
            };
        });

        it('タイトル描画関連の関数が呼ばれる', function() {
            const mock = sandbox.mock(ctx);
            mock.expects('save').once();
            mock.expects('fillText').withArgs('スマホロック', 300, 150, 600);
            mock.expects('fillText').withArgs('解除ゲーム', 300, 300, 600);
            mock.expects('restore').once();
            drawGame.drawTitle(ctx, rect);
            mock.verify();
        });
    });

    describe('drawStartButton', function() {
        let ctx = null;
        const rect = new Rect(0, 0, 600, 600);

        beforeEach(() => {
            ctx = {
                save: () => {},
                fillRect: () => {},
                fillText: () => {},
                restore: () => {}
            };
        });

        it('長方形が描画され、その中にSTARTが描画される', function() {
            drawGame._parent =  {
                getStartButtonRect: () => new Rect(200, 400, 200, 100)
            };
            
            const mock = sandbox.mock(ctx);
            mock.expects('save').once();
            mock.expects('fillRect').withArgs(200, 400, 200, 100);
            mock.expects('fillText').withArgs('START');
            mock.expects('restore').once();
            drawGame.drawStartButton(ctx, rect);
            mock.verify();
        });
    });

    describe('drawNumButtons', function() {
        let ctx = null;
        // 1, 5, 9のみ検証
        const rectList = [
            new Rect(60, 60, 120, 120),
            new Rect(240, 240, 120, 120),
            new Rect(420, 420, 120, 120)
        ];
        const makeButtonPath = Path.makeButtonPath;

        beforeEach(() => {
            drawGame._parent = {
                getNumButtonsRect: () => rectList
            };
            ctx = {
                fill: () => {},
                stroke: () => {},
                fillText: () => {}
            };
            Path.makeButtonPath = () => {};
        });
        afterEach(() => {
            Path.makeButtonPath = makeButtonPath;
        });

        it('正しい引数でパス作成関数が呼ばれる', function() {
            const spy = sandbox.spy(Path, 'makeButtonPath');
            drawGame.drawNumButtons(ctx);
            expect(spy.callCount).to.eql(3);
            expect(spy.getCall(0).calledWith(ctx, new Rect(60, 60, 120, 120))).to.eql(true);
            expect(spy.getCall(1).calledWith(ctx, new Rect(240, 240, 120, 120))).to.eql(true);
            expect(spy.getCall(2).calledWith(ctx, new Rect(420, 420, 120, 120))).to.eql(true);
        });
        it('正しい引数で文字列描画関数が呼ばれる', function() {
            const spy = sandbox.spy(ctx, 'fillText');
            drawGame.drawNumButtons(ctx);
            expect(spy.callCount).to.eql(3);
            expect(spy.getCall(0).calledWith('1', 120, 120)).to.eql(true);
            expect(spy.getCall(1).calledWith('2', 300, 300)).to.eql(true);
            expect(spy.getCall(2).calledWith('3', 480, 480)).to.eql(true);
        });
    });

    describe('drawStartPhone', function() {
        const ctx = 'ctx';
        const rect = 'rect';

        it('背景色描画関数が呼ばれる', function() {
            sandbox.stub(drawGame, 'drawNumButtons');

            const mock = sandbox.mock(drawGame);
            mock.expects('drawBackground').withArgs(ctx, rect);
            drawGame.drawSmartPhone(ctx, rect);
            mock.verify();
        });
        it('ボタン描画関数が呼ばれる', function() {
            sandbox.stub(drawGame, 'drawBackground');

            const mock = sandbox.mock(drawGame);
            mock.expects('drawNumButtons').withArgs(ctx);
            drawGame.drawSmartPhone(ctx, rect);
            mock.verify();
        });
    });
});
