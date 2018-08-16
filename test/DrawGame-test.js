import sinon from 'sinon';
import DrawGame from '../src/DrawGame.js';

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
            mock.expects('fillRect').once();
            mock.expects('restore').once();

            drawGame.drawBackground(ctx);

            mock.verify();
        });

        it('タイトル描画関数が呼ばれる', function() {
            sandbox.stub(drawGame, 'drawStartButton');

            const mock = sandbox.mock(drawGame);
            mock.expects('drawTitle').once();
            drawGame.drawBackground(ctx);
            mock.verify();
        });

        it('スタートボタン描画関数が呼ばれる', function() {
            sandbox.stub(drawGame, 'drawTitle');

            const mock = sandbox.mock(drawGame);
            mock.expects('drawStartButton').once();
            drawGame.drawBackground(ctx);
            mock.verify();
        });
    });

    describe('drawTitle', function() {
        let ctx = null;
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
            mock.expects('fillText').withArgs('スマホロック');
            mock.expects('fillText').withArgs('解除ゲーム');
            mock.expects('restore').once();
            drawGame.drawTitle(ctx);
            mock.verify();
        });
    });

    describe('drawStartButton', function() {
        let ctx = null;
        beforeEach(() => {
            ctx = {
                save: () => {},
                fillRect: () => {},
                fillText: () => {},
                restore: () => {}
            };
        });

        it('長方形が描画され、その中にSTARTが描画される', function() {
            const mock = sandbox.mock(ctx);
            mock.expects('save').once();
            mock.expects('fillRect').once();
            mock.expects('fillText').withArgs('START');
            mock.expects('restore').once();
            drawGame.drawStartButton(ctx);
            mock.verify();
        });
    });
});
