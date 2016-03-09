// dependencies
import  'babel-polyfill'

/**
 *  Signal binding class will define rules of how a handler is is bound to a 
 *  signal. It's essentially a wrapper around handle with meta data.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
var _handler = Symbol("_handler");
var _repeat = Symbol("_repeat");
export class SignalBinding {

    /**
     *  Constructor
     *  @param  function    The actual handler
     *  @param  boolean     Should binding remove itself after execution?
     */
    constructor (handler, repeat) {
        this[_handler] = handler;
        this[_repeat] = repeat;
    }

    /**
     *  Should handler be allowed to be executed in the future?
     *
     *  @return boolean
     */
    repeat() {
        return this[_repeat];
    }

    /**
     *  Get handler instance to be executed.
     *
     *  @return function
     */
    handler() {
        return this[_handler];
    }
}
