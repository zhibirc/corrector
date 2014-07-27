'use strict';

(function() {
    addHandler(window, 'load', initEvents);
})();

// Event handlers universal installation
function addHandler(elem, events, callback) {

    events = events.split(' ');

    for (var i = events.length - 1; i >= 0; i--) {
        if (elem.addEventListener) {
            elem.addEventListener(events[i], callback, false);
        } else if (elem.attachEvent) {
            // Fix correctly transferring 'this' in old IE
            elem.attachEvent('on' + events[i], function() { callback.call(elem); });
        } else {
            elem['on' + events[i]] = callback;
        }
    }
}

function initEvents() {
    var textBox = document.getElementById('user_input');
    // you add corrector to element which you want and on the event which you want
    addHandler(textBox, 'keyup', function(e) { corrector(textBox, false, e); });
}
