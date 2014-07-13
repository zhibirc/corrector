/*
 Copyright (C) zhibirc  Developer

 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version.  The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.
 */

function corrector(textContainer, is_eng, event) {

    'use strict';

    var allow = 1;

    // implementing trim() method to strings in cases when it's unsupported (unused at current time)
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^\s*((?:.*\S)?)\s*$/, '$1');
        };
    }

    // verify Event Object as an argument and
    // do nothing if user presses Backspace to correct his input
    allow = ((event || null) && event.keyCode == 8) ? 0 : 1;

    if (allow) {
        textContainer.value = textContainer.value
            // replace unnecessary whitespace sequences with one whitespace
            .replace(/[ \t]+/g, " ")
            // replace sequence of more than three dots with three ones
            .replace(/(\.){4,}/g, "$1$1$1")
            // replace sequence of more than three question or exclamation marks with three ones
            .replace(/[!?]{4,}/g, function(str) { return str.slice(0, 3); })
            // remove whitespaces between question and exclamation marks
            .replace(/(\?|!) (?=\?|!)/g, "$1")
            // replace hyphen with a dash
            .replace(/(\s)-(\s)/g, "$1—$2")
            // replace left-side double quotes
            .replace(/(^|\s)"/g, function(str, p1) { return is_eng ? p1 + "“" : p1 + "«"; })
            // replace right-side double quotes
            .replace(/"(\s|[-.,:;?!]|$)/g, function(str, p1) { return is_eng ? "”" + p1 : "»" + p1; })
            // remove whitespaces between dots
            .replace(/\.\s\.\s\./g, "...")
            // adding single whitespace after comma, colon, semicolon and after each sentence before next one
            .replace(/([.,:;])(?=[«“a-zа-яё\d])/gi, '$1 ')
            // adding single whitespace after single ore more question or exclamation marks before the next sentence
            .replace(/([!?])(?![!?”» ])/g, '$1 ')
            // inserting real copyright symbol
            .replace(/\([cс]\)/gi, "©")
            // inserting real trade mark symbol
            .replace(/\(r\)/gi, "®")
            // capitalize first letter in the text
            .replace(/^([a-zа-яё])/, function(str, p1) { return p1.toUpperCase(); })
            // capitalize first letter in the sentence
            .replace(/([.?!])(\s?)([a-zа-яё])/g, function(str, p1, p2, p3) { return p1 + p2 + p3.toUpperCase(); });
    }
}
