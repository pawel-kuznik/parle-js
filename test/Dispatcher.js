// the assertion lib
import { expect } from 'chai'

// the class to test
import { Dispatcher, Event } from '../lib/parle'

describe('Dispatcher', () => {
    describe('#on', () => {

        it('Dispatcher should register handlers on channels', function (done) {
            // create instance of dispatcher
            var dispatcher = new Dispatcher;

            // 200 ms should be just ok
            this.timeout(200);

            // install test-event
            dispatcher.on('test-event', function (event) {
                
                done();
            });

            // trigger event
            dispatcher.trigger('test-event', { });
        });

        it('Dispatcher.on() should return itself for chaining', function () {
            var dispatcher = new Dispatcher;
            expect(dispatcher.on('test-event', function () { })).to.equal(dispatcher);
        });
    });

    describe('#once', () => {
        it('dispatcher.once() should return itself for chaining', function () {
            var dispatcher = new Dispatcher;
            expect(dispatcher.once('test-event', function () { })).to.equal(dispatcher);
        });
    });

    describe('#off', () => {

        it('Remove single handler from the dispatcher', function () {
            // create dispatcher instance
            var dispatcher = new Dispatcher;

            dispatcher.on('test-event', function () { });

            expect(dispatcher).to.have.property('_signals');
        });

        it('dispatcher.off() should return itself for chaining', function () {
            var dispatcher = new Dispatcher;
            expect(dispatcher.off('text-event', function () { })).to.equal(dispatcher);
        });
    });

    describe('#trigger', () => {
        it('dispatcher.trigger() should return itself for chaining', function () {
            var dispatcher = new Dispatcher;
            expect(dispatcher.trigger('test-event', { })).to.equal(dispatcher);
            expect(dispatcher.trigger(new Event('test-event'))).to.equal(dispatcher);
        });
    });
});
