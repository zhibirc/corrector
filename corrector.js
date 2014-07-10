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

'use strict';

function corrector(aim, is_eng) {
    aim.value = aim.value
        .replace(/(\.){4,}/g, "$1$1$1")
        .replace(/([!?]){4,}/g, function(str) { return str.slice(0, 3); })
        .replace(/([.,:;?!])(?!\1)/g, "$1 ")
        .replace(/(\?|!) (?=\?|!)/g, "$1")
        .replace(/[ \t]+/g, " ")
        .replace(/(\s)-(\s)/g, "$1—$2")
        .replace(/(^|\s)"/g, function(str, p1) { return is_eng ? p1 + "“" : p1 + "«"; })
        .replace(/"(\s|[-.,:;?!]|$)/g, function(str, p1) { return is_eng ? "”" + p1 : "»" + p1; })
        .replace(/\.\s\.\s\./g, "...")
        .replace(/([a-zа-яё])\1+/gi, "$1$1")
        .replace(/(\.{3}|[?!]|\.(?!\s*[a-zа-яё]\.))(\s)([a-zа-яё])/g, function(str, p1, p2, p3) { return p1 + p2 + p3.toUpperCase(); })
        .replace(/\(c\)/gi, "©")
        .replace(/\(R\)/g, "®")
        .replace(/^([a-zа-яё])/, function(str, p1) { return p1.toUpperCase(); });
}

function trim(src) {
    src = src.replace(/^\s+|\s+$/g, "");
    return src;
}
