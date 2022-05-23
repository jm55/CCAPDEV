function btnClicked() {
    var x = document.getElementById("p1");
    var textNode;
    for (let child of x.childNodes)
        if (child.nodeType === document.TEXT_NODE)
            textNode = child;
    console.log(textNode);
    x.removeChild(textNode);
}