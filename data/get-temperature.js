
for (i = 0; i < 3; i++) {

    let node = document.createElement("li"),
        p = document.createElement("p"),
        textnode = document.createTextNode("aaa");


    node.appendChild(p);
    p.appendChild(textnode);

    document.getElementById('tempList').appendChild(node);
}
