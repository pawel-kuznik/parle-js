import { Signal } from './Signal'

/**
 *  Dispatcher class. This class will allow to manage one or many event channels. Such 
 *  channels will be created dynamically when it's needed. 
 *  
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
export class Dispatcher {

    /**
     *  Constructor
     */
    constructor () {
        this._signals = { };
    }

    /**
     *  Register callback on given event name.
     *  @param  string
     *  @param  function
     */
    on (eventName, handler) {

        // ensure that we have signal instance for given event type
        if (!this._signals.hasOwnProperty(eventName)) this._signals[eventName] = new Signal();

        // register handler on proper signal object
        this._signals[eventName].on(handler);

        // allow chaining
        return this;
    }

    /**
     *  Remove one or many handlers registered with given type of event.
     *
     *  This function has following signatures:
     *
     *  (name:string) => Dispatcher
     *
     *  This variation will remove all handlers reigistered with given event type.
     *
     *  -----------------------------------------------------------------------
     *
     *  (name:string, handlers:function) => Dispatcher
     *
     *  This variation will remove all handlers that match provided handler.
     *
     *  @param  string
     *  @param  function
     *
     *  @return Dispatcher
     */
    off(eventName, handler) {

        // check if we even have something to remove
        if (!this._signals.hasOwnProperty(eventName)) return this;

        // should we go all in and remove all handlers?
        if (typeof handler === 'undefined') this._signals[eventName].empty();

        // remove only selected handlers
        else this._signals[eventName].off(handler);

        // allow chaining
        return this;
    }

    /**
     *  Install a callback on given event name. This method differs from .on()
     *  in one way: handler will be executed only once. After it's executed 
     *  it will be removed from the collection.
     *
     *  @param  string
     *  @param  function
     *  @return Dispatcher
     */
    once(eventName, handler) {

        // chekc if we even have something to remove
        if (!this._signals.hasOwnProperty(eventName)) return this;

        // install handler
        this._signals[eventName].once(handler);

        // allow chaining
        return this;
    }

    /**
     *  Trigger given event
     *
     *  This method has 2 signatures:
     *
     *  (event:Event) => Dispatcher
     *
     *  This function will depend on the Event object to identify itself. 
     *
     *  -----------------------------------------------------------------------
     *
     *  (name:string, event:mixed) => Dispatcher
     *
     *  This function will expect that 1st parameter will identify the event type,
     *  and the second parameter will be the event object (can be even a plain object,
     *  or prime type)
     */
    trigger(name, event) {

        // cover 1st signature
        if (typeof event == 'undefined' && name.name) {
            event = name;
            name = event.name;
        }

        /**
         *  If we don't have registered handler for given event type, we can 
         *  assume that everything that was suppose to happen, already happend.
         */
        if (!this._signals.hasOwnProperty(name)) return this;

        // trigger event on given signals
        this._signals[name].trigger(event);

        // allow chaining
        return this;
    }
}
