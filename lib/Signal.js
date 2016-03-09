
// dependecies
import 'babel-polyfill'
import { SignalBinding } from './SignalBinding'

/**
 *  Signal class. It's a class that will hold collection of handlers and will
 *  manage triggering events on that collection as well as manage the collection.
 *  In simple terms it's a class that can be used to create named events 
 *  systems as well as strongly typed event systems (by making well defined 
 *  instances of Signal inside particular classes)
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
var _handlers = Symbol("_handlers");
export class Signal {

    constructor () {
        this[_handlers] = [];
    }

    /**
     *  Register handler
     *
     *  @param  function
     *  @return Signal
     */
    on (handler) {
        // add additional handler
        this[_handlers].push(new SignalBinding(handler, true));

        // allow chaining
        return this;
    }
    
    /**
     *  Register handler. The difference between this method and .on() is that 
     *  handler will be executed only once. After that handler will be removed 
     *  from available handles.
     *
     *  @param  function
     *  @return Signal
     */
    once (handler) {
        // add additional handler
        this[_handlers].push(new SignalBinding(handler, false));

        // allow chaining
        return this;
    }

    /**
     *  Remove one specific handler.
     *
     *  @param  function
     *  @return Signal
     */
    off (handler) {

        // filter handlers array from all occurences of given handler
        this[_handlers]= this[_handlers].filter(function (item) {
            return item.handler() !== handler;
        });

        // allow chaining
        return this;
    }

    /**
     *  Empty out all registered handlers.
     *
     *  @return Signal
     */
    empty() {
        // create new handlers array
        this[_handlers] = [];

        // allow chaining
        return this;
    }

    /**
     *  Get the number of handlers registered with this Signal.
     *
     *  @return int
     */
    length() {
        return this[_handlers].length;
    }

    /**
     *  Trigger event on signal. Preferably we are expecting an instance of 
     *  Event class, but it may be that event will be something completly 
     *  custom or one of primal types. Anyways 1st parameter will be passed
     *  to handler function.
     *
     *  @param  Event|mixed
     *  @return Signal
     */
    trigger (event) {

        // iterate over all handlers and trigger execute all registered handlers
        for (var idx = 0; idx < this[_handlers].length; ++idx) { 

            // fetch binding
            var binding = this[_handlers][idx];

            // execute handler
            binding.handler()(event);

            // if binding is telling us that handler should not be repeated we 
            // should remove the handler and the binding.
            if (!binding.repeat()) this[_handlers][idx] = false;

            // if event tells us to not propagate any more, we should stop here
            if (event && event.shouldPropagate && !event.shouldPropagate()) break;
        }

        // and filter out all bindigns that were marked to be removed
        this[_handlers] = this[_handlers].filter(function (item) {
            return item;
        });

        // allow chaining
        return this;
    }
}
