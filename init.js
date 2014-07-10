'use strict';

(function() {
    addHandler(window, 'load', initEvents);
})();

function addHandler(elem, event, callback) {
    if (elem.addEventListener) {
        elem.addEventListener(event, callback, false);
    }
    else if (elem.attachEvent) {
        elem.attachEvent('on' + event, callback);
    } else {
        elem[event] = callback;
    }
}

function initEvents() {
    var textBox = document.getElementById('user_input');
    // you add corrector to element which you want and on the event which you want
    addHandler(textBox, 'keyup', function() { corrector(textBox, false); });
}
