/**
 *  Tests for signal binding.
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// import assets
import { expect } from 'chai'

// SignalBinding is a in-module class
import { SignalBinding } from '../lib/SignalBinding'

describe('SignalBinding', () => {
    describe('#handler', () => {
        it("SignalBinding should provide handler", function () {

            var handler = function () { };
            var binding = new SignalBinding(handler, true);
            expect(binding.handler()).to.equal(handler);
        });
    });

    describe("#repeat", () => {
        it("SignalBinding should provide passed repeat option", function () {

            var binding = new SignalBinding(function () { }, true);
            expect(binding.repeat()).to.equal(true);
        });
    });
});
