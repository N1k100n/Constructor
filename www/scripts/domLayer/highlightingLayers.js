
Get("Dom_Layers_Elements_Content").addEventListener("mouseover", function() {
    var elem = null;

    if (event.target.tagName == "P") {
        elem = event.target.parentNode.firstElementChild;
    }
    if (event.target.tagName == "SPAN") {
        elem = event.target.parentNode.parentNode.firstElementChild;
    }
    if (elem != null) {
        var index = [];

        while (elem.parentNode.id != "Dom_Layers_Elements_Content") {
            index.unshift(parseInt(elem.parentNode.getAttribute("name"), 10));
            elem = elem.parentNode.parentNode.firstElementChild;
        }

        elem = ifr.body.parentNode;
        for (let i = 0; i < index.length; i++) {
            elem = elem.children[index[i]];
        }

        marginTopElem = parseInt(getComputedStyle(elem).marginTop, 10);
        marginRightElem = parseInt(getComputedStyle(elem).marginRight, 10);
        marginBottomElem = parseInt(getComputedStyle(elem).marginBottom, 10);
        marginLeftElem = parseInt(getComputedStyle(elem).marginLeft, 10);

        var lights = Get('Highlight_From_The_Layer').style;

        lights.top = Math.round(elem.getBoundingClientRect().top) - marginTopElem + "px";
        lights.left = Math.round(elem.getBoundingClientRect().left) - marginLeftElem + "px";
        lights.height = Math.round(elem.getBoundingClientRect().height) + "px";
        lights.width = Math.round(elem.getBoundingClientRect().width) + "px";

        lights.marginTop = marginTopElem + "px";
        lights.marginRight = marginRightElem + "px";
        lights.marginBottom = marginBottomElem + "px";
        lights.marginLeft = marginLeftElem + "px";
    }
    event.preventDefault();
});
Get("Dom_Layers_Elements_Content").addEventListener("mouseout", function() {
    var lights = Get('Highlight_From_The_Layer').style;

    lights.top = "";
    lights.left = "";
    lights.height = "";
    lights.width = "";

    lights.margin = "";
    event.preventDefault();
});
Get("Dom_Layers_Elements_Content").addEventListener("click", function() {
    var elem = null;
    
    if (event.target.tagName == "P") {
        elem = event.target.parentNode.firstElementChild;
    }
    if (event.target.tagName == "SPAN") {
        elem = event.target.parentNode.parentNode.firstElementChild;
    }
    if (elem != null) {
        var index = [];

        while (elem.parentNode.id != "Dom_Layers_Elements_Content") {
            index.unshift(parseInt(elem.parentNode.getAttribute("name"), 10));
            elem = elem.parentNode.parentNode.firstElementChild;
        }

        elem = ifr.body.parentNode;
        for (let i = 0; i < index.length; i++) {
            elem = elem.children[index[i]];
        }
        elemIfr = [];
        elemIfr.push(elem);
        console.log(elemIfr);
    }
});