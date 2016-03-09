/**
 *  Signal class. It's a class that will hold collection of handlers and will
 *  manage triggering events on that collection as well as manage the collection.
 *  In simple terms it's a class that can be used to create named events 
 *  systems as well as strongly typed event systems (by making well defined 
 *  instances of Signal inside particular classes)
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
export class Signal {

    constructor () {
        this._handlers = [];
    }

    /**
     *  Register handler
     *
     *  @param  function
     *  @return Signal
     */
    on (handler) {
        this._handlers.push(handler);

        return this;
    }

    once (handler) {

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
        this._handlers = this._handlers.filter(function (item) {
            return item !== handler;
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
        this._handlers = [];

        // allow chaining
        return this;
    }

    /**
     *  Get the number of handlers registered with this Signal.
     *
     *  @return int
     */
    length() {
        return this._handlers.length;
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
        for (var idx = 0; idx < this._handlers.length; ++idx) { 

            // execute handler
            this._handlers[idx](event);

            // if event tells us to not propagate any more, we should stop here
            if (event && event.shouldPropagate && !event.shouldPropagate()) break;
        }

        // allow chaining
        return this;
    }
}
