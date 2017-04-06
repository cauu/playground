function EventHandler() {
}

EventHandler.prototype = Object.create(null);

/**
 * @desc 
 * EventEmitter的方法:
 *  setMaxListeners,
 *  getMaxListeners,
 *  emit,
 *  addListener/on,
 *  removeListener,
 *  once
 */
function EventEmitter() {
  this.init();
}

EventEmitter.prototype.init = function() {
  if(!this._events) {
    this._events = new EventHandler();
  }
}

EventEmitter._onceWrap = function(listener, state) {
  return function() {
    state.target.removeListener(state.type);

    if(!state.fired) {
      state.fired = true;
    }
    listener.apply(state.target, arguments);
  }
}

EventEmitter.prototype.once = function(type, listener) {
  if(typeof listener !== 'function') {
    throw new TypeError('"listener" argument must be a function.');
  }
  const state = { fired: false, listener, target: this, type };

  const onceListener = EventEmitter._onceWrap(listener, state);

  this.addListener(type, onceListener);
}

EventEmitter.prototype.addListener = function(type, listener) {
  if(typeof listener !== 'function') {
    throw new TypeError('argument "listener" must be a function.')
  }
  const events = this._events;

  if(!events) {
    events = this._events = new EventHandler();
  }

  if(!events[type]) {
    events[type] = listener;

    return; 
  }

  if(typeof events[type] === 'function') {
    events[type] = [listener, events[type]];
  } else {
    events[type].push(listener);
  }
}

EventEmitter.prototype.emit =function(type) {
  const events = this._events;

  if(!events[type]) { 
    console.log(`event ${type} is not exist`);
    return;
  }

  if(typeof events[type] === 'function') {
    events[type](...arguments);
  } else if(events[type].length > 0) {
    for(let i = events[type].length; i-- > 0;) {
      events[type][i](...arguments);
    }
  }
}

EventEmitter.prototype.removeListener = function(type) {
  const events = this._events;

  if(!!events[type]) {
    delete events[type];
  }
}

let myButton = {
  name: 'button'
};

myButton.event = new EventEmitter(myButton);

myButton.event.once('click', function(event) {
  console.log('on click event', event);
});

myButton.event.emit('click', myButton);
myButton.event.emit('click', myButton);