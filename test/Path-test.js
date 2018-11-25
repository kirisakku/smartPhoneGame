/* global it describe afterEach */
import sinon from 'sinon';
import Path from '../src/Path.js';
import Rect from '../src/Rect.js';

describe('Path', function() {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        sandbox.restore();
    });

    describe('makeButtonsPath', function() {
        it('正しい引数で円のパス作成関数が呼ばれる', function() {
            const rect = new Rect(60, 60, 120, 120);
            const ctx = {
                beginPath: () => {},
                arc: () => {}
            };

            const mock = sandbox.mock(ctx);
            mock.expects('arc').withArgs(120, 120, 60, 0, 2 * Math.PI, false);
            Path.makeButtonPath(ctx, rect);
        });
    });
});
