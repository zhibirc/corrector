'use strict';

(function() {
    addHandler([window], { 'load': initEvents });
})();

function addHandler(elems, actions) {
    var errors = ['Wrong invocation! Properly syntax: addHandler([element_0, ..., element_N], { event_0: callback_0, ..., event_N: callback_N})'],
        elem,
        i;

    /** The aim of this approach is unobtrusively display an error (and return particular marker) without panic, because wrong call may be no matter for other functionality. */
    if (arguments.length !== 2 || !Array.isArray(elems) || !(actions instanceof Object)) {
        if (typeof console !== 'undefined' && typeof console.warn !== 'undefined') {
            console.warn(errors[0]);
        }
        return 0;
    }

    for (i = elems.length; i--;) {
        elem = elems[i];
        for (var event in actions) {
            if (Object.prototype.hasOwnProperty.call(actions, event)) {
                if (elem.addEventListener) {
                    elem.addEventListener(event, actions[event], false);
                } else if (elem.attachEvent) {
                    elem.attachEvent('on' + event, function() { actions[event].call(elem); });
                } else {
                    elem['on' + event] = actions[event];
                }
            }
        }
    }
}

function initEvents() {
    var textBox = document.getElementById('user_input');
    // you add corrector to element which you want and on the event which you want
    addHandler([textBox], { 'keyup': function(e) { corrector(textBox, false, e); } });
}