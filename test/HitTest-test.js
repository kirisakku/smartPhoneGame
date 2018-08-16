/* global it describe beforeEach afterEach */
import sinon from 'sinon';
import {expect} from 'chai';
import HitTest from '../src/HitTest.js';
import Rect from '../src/Rect.js';
import Point from '../src/Point.js';

describe('HitTest', function() {
    const sandbox = sinon.sandbox.create();
    let hitTest = null;

    beforeEach(() => {
        hitTest = new HitTest();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('hitTest', function() {
        const ctx = 'ctx';
        const point = 'point';
        beforeEach(() => {
            hitTest._parent = {
                startGame: () => {}
            };
        });

        it('スタートボタンにヒットした場合は、ゲーム開始関数が呼ばれる', function() {
            const stub = sandbox.stub(hitTest, 'isHitStartButton').returns(true);
            const mock = sandbox.mock(hitTest._parent);
            mock.expects('startGame').withArgs(ctx);

            hitTest.hitTest(ctx, point);

            expect(stub.calledWith(ctx, point)).to.eql(true);
            mock.verify();
        });
        it('スタートボタンにヒットしなかった場合は、ゲーム開始関数は呼ばれない', function() {
            const stub = sandbox.stub(hitTest, 'isHitStartButton').returns(false);
            const mock = sandbox.mock(hitTest._parent);
            mock.expects('startGame').never();

            hitTest.hitTest(ctx, point);

            expect(stub.calledWith(ctx, point)).to.eql(true);
            mock.verify();
        });
    });

    describe('isHitStartButton', function() {
        let ctx = null;
        const point = new Point(10, 20);
        beforeEach(() => {
            hitTest._parent = {
                getStartButtonRect: () => new Rect(200, 400, 200, 100)
            };
            ctx = {
                rect: () => {},
                isPointInPath: () => {}
            };
        });

        it('ボタンサイズの矩形のパスが生成される', function() {
            const mock = sandbox.mock(ctx);
            mock.expects('rect').withArgs(200, 400, 200, 100);
            hitTest.isHitStartButton(ctx, point);
            mock.verify();
        });
        it('ボタンにヒットした場合はtrueが返される', function() {
            const stub = sandbox.stub(ctx, 'isPointInPath').returns(true);
            const result = hitTest.isHitStartButton(ctx, point);
            expect(stub.calledWith(10, 20)).to.eql(true);
            expect(result).to.eql(true);
        });
        it('ボタンにヒットしなかった場合はfalseが返される', function() {
            const stub = sandbox.stub(ctx, 'isPointInPath').returns(false);
            const result = hitTest.isHitStartButton(ctx, point);
            expect(stub.calledWith(10, 20)).to.eql(true);
            expect(result).to.eql(false);
        });
    });
});