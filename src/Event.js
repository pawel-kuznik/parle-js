/**
 *  Event class
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
export class Event {

    /**
     *  @param  string
     */
    constructor(name) {

        // set the name of the event
        this.name = name;

        // set 
        this._propagate = true;
    }

    /**
     *  Stop event propagation.
     *  @return boolean
     */
    stopPropagation() {
        // mark this event as one that should not be propagated
        this._propagate = false;

        // allow chaining
        return this;
    }

    /**
     *  Should this event be propagated?
     *  @return boolean
     */
    shouldPropagate() {
        return this._propagate;
    }
}
