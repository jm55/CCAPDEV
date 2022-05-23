var p2 = document.createElement("p");
var node = document.createTextNode("New Text");
p2.appendChild(node);
var element = document.getElementById("div1");
console.log(element)
element.appendChild(p2);