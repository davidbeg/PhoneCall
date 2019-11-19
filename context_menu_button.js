// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var call_button_id = 0;
var enabled_flag = true;
// A generic onclick callback function.

function genericOnClick(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    console.log("selection: " + window.getSelection().toString());
    chrome.contextMenus.update(checkbox1, {
        enabled: enabled_flag
    });
}

function is_valid_number(request) {
    let selected_text = request.data;
    selected_text = selected_text.replace(/[ \-]/g, "");
    if (selected_text.startsWith("+") || selected_text.startsWith("*"))
    {
        selected_text = selected_text.substring(1);
    }
    return !isNaN(selected_text);
}

call_button_id = chrome.contextMenus.create({"title": "Call Phone", "contexts":["selection"],
    "onclick": genericOnClick});
console.log("'" + "selection" + "' item:" + call_button_id);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
    switch(request.message)
    {
        case 'selectionChanged':
            enabled_flag = is_valid_number(request);
            chrome.contextMenus.update(call_button_id, {
                enabled: enabled_flag,
                title: enabled_flag ? "Call " + request.data : "Call Phone"
            });
            break;
    }
});
