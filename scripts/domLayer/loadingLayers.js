
//* Слои DOM дерева сайта
    var layersIndexElem = [];

    class Layer {
        // Добавление стартового body слоя
        static addBodyLayer() {
            Layer.addLayer(ifr.body, Get("Dom_Layers_Elements_Content"), "")
        }
        // Добовление нового слоя
        static addLayer(elem, parentLayer, br) {
            if (elem.children.length > 0) {
                parentLayer.insertAdjacentHTML("beforeend",`
                    ` + br + `
                    <div name="` + Layer.elemIndex(elem) + `">
                        <button>
                            <svg width="15" height="20" viewBox="-10 -10 84 84">
                                <path d="M50 32L14 0V64C27.2778 51.5032 50 32 50 32Z"/>
                            </svg>                            
                        </button>
                        <p>
                            <span>` + elem.tagName + `</span>
                            <input type="text" value="` + Layer.idOrClass(elem) + `">
                        </p>
                    </div>
                `);
            } else {
                parentLayer.insertAdjacentHTML("beforeend",`
                    ` + br + `
                    <div name="` + Layer.elemIndex(elem) + `">
                        <br>
                        <p>
                            <span>` + elem.tagName + `</span>
                            <input type="text" value="` + Layer.idOrClass(elem) + `">
                        </p>
                    </div>
                `);
            }
            parentLayer.lastElementChild.lastElementChild.lastElementChild.addEventListener("blur", blurInput);
        }
        // Возвращяет id или class
        static idOrClass(elem) {
            if (elem.id != "") {
                return "#" + elem.id;
            } else if (elem.className != "") {
                return "." + elem.className;
            } else {
                return "";
            }
        }
        static elemIndex(elem) {
            var index = 0;
            while (elem.parentNode.children[index] != elem) {
                index++;
            }
            return index;
        }
    }
    Get("Dom_Layers_Elements_Content").addEventListener("click", function() {
        if (event.target.tagName == "BUTTON") {
            if (event.target.style.transform == "") {
                event.target.style.transform = "rotate(90deg)";
                
                var index = [];
                var elemI = event.target;
                while (elemI.parentNode.id != "Dom_Layers_Elements_Content") {
                    index.unshift(parseInt(elemI.parentNode.getAttribute("name"), 10));
                    elemI = elemI.parentNode.parentNode.firstElementChild;
                }
                console.log(index);
                elemI = ifr.body.parentNode;
                for (let i = 0; i < index.length; i++) {
                    elemI = elemI.children[index[i]];
                }

                for (let i = 0; i < elemI.children.length; i++) {
                    Layer.addLayer(elemI.children[i], event.target.parentNode, "<br>")
                }
            } else {
                event.target.style.transform = "";
                var childrenLength = event.target.parentNode.children.length;
                for (let i = 2; i < childrenLength; i++) {
                    event.target.parentNode.children[2].remove();
                }
            }
        }
    });
    Get("Dom_Layers_Elements_Content").addEventListener("dblclick", function() {
        if (event.target.tagName == "P" && event.target.lastElementChild.getBoundingClientRect().left < event.clientX) {
            event.target.lastElementChild.select();
            event.target.lastElementChild.style.pointerEvents = "all";
            event.target.lastElementChild.setAttribute("active", "");
        }
    });
    function blurInput() {
        event.target.style.pointerEvents = "";
        event.target.removeAttribute("active", "");
    }