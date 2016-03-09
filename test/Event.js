// assertion lib
import { expect } from 'chai'

// the class that is tested
import { Event } from '../lib/Event'

describe('Event', () => {
    describe('#name', () => {

        // the object that we will need to test
        var testEvent = new Event('test-event');

        it("Event should have name property with it's name", ()  => {
            expect(testEvent).to.have.property('name').equal('test-event');
        });
    });

    describe('#stopPropagation', () => {

        var testEvent = new Event('test-event');

        it("Event should allow itself to stop propagation", () => {
            expect(testEvent.shouldPropagate()).to.be.true;
            testEvent.stopPropagation();
            expect(testEvent.shouldPropagate()).to.be.false;
        });
    });
});
