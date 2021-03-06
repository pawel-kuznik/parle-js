// get assertion lib
import { expect } from 'chai'

// get needed classes
import { Signal, Event } from '../lib/parle.js'

describe('Signal', () => {
    describe('#on', () => {
        it('Signal should increase number of handlers each time a new one is registered', function () {

            // initially signal should of length 0
            var signal = new Signal();
            expect(signal.length()).to.equal(0);

            // after we add a handler signal length should increase to 1
            signal.on(function () { });
            expect(signal.length()).to.equal(1);
        });

        it("Signal should properly handle events that are saying that there should be no further propagation", function () {
            
            var signal = new Signal();
    
            signal.on(function (event) { 
                event.stopPropagation();
            });

            signal.on(function (event) { 
               throw new Error("Later handler executed");
            });

            signal.trigger(new Event());
        });

        it('Singnal.on() should return same object for chaining', function () {
            var signal = new Signal();
            expect(signal.on(function() { })).to.equal(signal);
        });
    });

    describe('#once', () => {
        it("Signal.once() should increase the signal length", function () {
    
            // initially signal should of length 0
            var signal = new Signal();
            expect(signal.length()).to.equal(0);

            // after we add a handler signal length should increase to 1
            signal.once(function () { });
            expect(signal.length()).to.equal(1);
        });

        it("Signal.once() should remove callback after execution", function () {
            // initialize signal, counter and add handler
            var signal = new Signal();
            signal.once(function () { });

            // after we add a handler, length of the signal should increase
            expect(signal.length()).to.equal(1);

            // after we trigger, signal length should go down to 0
            signal.trigger();
            expect(signal.length()).to.equal(0);
        });

        it('Singnal.once() should return same object for chaining', function () {
            var signal = new Signal();
            expect(signal.once(function() { })).to.equal(signal);
        });
    });

    describe('#off', () => {
        it('Remove registered handler', function () {
            var signal = new Signal();
            var handler = function () { };
            signal.on(handler);
            signal.off(handler);
            expect(signal.length()).to.equal(0);
        });

        it('Remove specific registered handler', function () {
            var signal = new Signal();
            var handler = function () { };
            var otherHandler = function () { };
            signal.on(handler);
            signal.off(otherHandler);
            expect(signal.length()).to.equal(1);
        });

        it('Singnal.off() should return same object for chaining', function () {
            var signal = new Signal();
            expect(signal.off(function() { })).to.equal(signal);
        });
    });

    describe('#trigger', () => {
        it('Signal.trigger() should trigger the actual handler', function (done) {
            var signal = new Signal();
            signal.on(function () { done(); });
            signal.trigger();
        });

        it('Signal.trigger() should return same object for chaining', function () {
            var signal = new Signal();
            expect(signal.trigger(function() { })).to.equal(signal);
        });
    });

    describe('#empty', () => {
        it('When signal is removed the length should drop to zero', function () {
            var signal = new Signal();
            signal.on(function () { });
            expect(signal.length()).to.equal(1);
            signal.empty();
            expect(signal.length()).to.equal(0);
        });

        it('Singnal.empty() should return same object for chaining', function () {
            var signal = new Signal();
            expect(signal.empty()).to.equal(signal);
        });
    });

    describe('#length', () => {
        it('Initially length should return 0', function () {
            var signal = new Signal();
            expect(signal.length()).to.equal(0);
        });

        it('Lenght should increase with number of registered handlers', function () {
            var signal = new Signal();
            signal.on(function () { });
            expect(signal.length()).to.equal(1);
        });

        it('Lenght should increase with number of registered handlers', function () {
            var signal = new Signal();
            var handler = function () { };
            signal.on(handler);
            expect(signal.length()).to.equal(1);
            signal.off(handler);
            expect(signal.length()).to.equal(0);
        });
    });
});


