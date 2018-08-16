import sinon from 'sinon';
import DrawGame from '../src/DrawGame.js';
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

            const mock = sandbox.mock(ctx)
            mock.expects('save').once();
            mock.expects('fillRect').withArgs(0, 0, 600, 600);
            mock.expects('restore').once();

            drawGame.drawBackground(ctx, rect);

            mock.verify();
        });

        it('タイトル描画関数が呼ばれる', function() {
            sandbox.stub(drawGame, 'drawStartButton');

            const mock = sandbox.mock(drawGame);
            mock.expects('drawTitle').withArgs(ctx, rect);
            drawGame.drawBackground(ctx, rect);
            mock.verify();
        });

        it('スタートボタン描画関数が呼ばれる', function() {
            sandbox.stub(drawGame, 'drawTitle');

            const mock = sandbox.mock(drawGame);
            mock.expects('drawStartButton').withArgs(ctx, rect);
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
});
