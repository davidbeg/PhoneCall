function userSelectionChanged() {
    console.log("Calling userSelectionChanged");
    var sel = window.getSelection().toString();

    if(sel.length)
        chrome.extension.sendRequest({'message':'selectionChanged','data': sel},function(response){})
}

document.onselectionchange = userSelectionChanged;
console.log("SelectionChange listener created");