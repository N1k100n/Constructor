class HtmlCode {
    static loading() {
        var htmlArrText = null;
        var temporaryText = null;
        var code = Get("Html_Code_Elements_View").lastElementChild;
        code.insertAdjacentHTML("beforeend", "<p></p>");
        var pChildren = code.lastElementChild;
        var tagLast = null;
        htmlArrText = ifr.body.outerHTML.split('');
        for (let i = 0; i < htmlArrText.length; i++) {
            if (htmlArrText[i] == "<" && htmlArrText[i + 1] == "s" && htmlArrText[i + 2] == "c" && htmlArrText[i + 3] == "r" && htmlArrText[i + 4] == "i" && htmlArrText[i + 5] == "p" && htmlArrText[i + 6] == "t" && htmlArrText[i + 7] == ">") {
                for (let j = i; j < htmlArrText.length; j++) {
                    if (htmlArrText[j] == "<" && htmlArrText[j + 1] == "/" && htmlArrText[j + 2] == "s" && htmlArrText[j + 3] == "c" && htmlArrText[j + 4] == "r" && htmlArrText[j + 5] == "i" && htmlArrText[j + 6] == "p" && htmlArrText[j + 7] == "t" && htmlArrText[j + 8] == ">") {
                        console.log(i);
                        console.log(j);
                        htmlArrText.splice(i + 8, j - i - 8, "%%%%");
                        break;
                    }
                }
            }
            
        }
        console.log(htmlArrText);


        for (let i = 0; i < htmlArrText.length; i++) {
            if (htmlArrText[i] == "\n") {
                while (htmlArrText[i + 1] == "\n") {
                    i++
                }
                code.insertAdjacentHTML("beforeend", "<p></p>");
                pChildren = code.lastElementChild;

            } else if (htmlArrText[i] == "<" && htmlArrText[i + 1] == "!") {
                pChildren.insertAdjacentHTML("beforeend", "<span comm></span>");
                temporaryText = "";
                    for (i += 0; htmlArrText[i] != ">"; i++) {
                        // console.log(htmlArrText[i]);
                        if (htmlArrText[i] != "!") {
                            temporaryText += htmlArrText[i];
                        }
                    }
                    // for (i += 0; htmlArrText[i] != ">" && htmlArrText[i - 1] != "-"; i++) {
                    //     if (htmlArrText[i] != "!") {
                    //         temporaryText += htmlArrText[i];
                    //     }
                    // }
                    temporaryText += ">";
                    pChildren.lastElementChild.insertAdjacentHTML("beforeend", temporaryText);
            } else if (htmlArrText[i] == "<") {
                pChildren.insertAdjacentHTML("beforeend", "<span symbol><</span>");

                if (htmlArrText[i + 1] == "/") {
                    pChildren.lastElementChild.innerHTML = "</";
                    pChildren.insertAdjacentHTML("beforeend", "<span tag></span>");
                    temporaryText = "";
                    for (i += 2; htmlArrText[i] != " " && htmlArrText[i] != ">"; i++) {
                        temporaryText += htmlArrText[i];
                    }
                    pChildren.lastElementChild.insertAdjacentHTML("beforeend", temporaryText);
                    pChildren.insertAdjacentHTML("beforeend", "<span symbol>></span>");
                } else {
                    pChildren.insertAdjacentHTML("beforeend", "<span tag></span>");
                    temporaryText = "";
                    for (i += 1; htmlArrText[i] != " " && htmlArrText[i] != ">"; i++) {
                        temporaryText += htmlArrText[i];
                    }
                    tagLast = temporaryText;
                    pChildren.lastElementChild.insertAdjacentHTML("beforeend", temporaryText);
                    while (htmlArrText[i] != ">") {
                        
                        if (htmlArrText[i] == " ") {
                            pChildren.insertAdjacentHTML("beforeend", "<span> </span>");
                        } else {
                            if (htmlArrText[i - 1] == `"`) {
                                pChildren.insertAdjacentHTML("beforeend", "<span content></span>");
                                temporaryText = "";
                                for (i += 0; htmlArrText[i] != " " && htmlArrText[i] != ">" && htmlArrText[i] != "\"" && htmlArrText[i] != "="; i++) {
                                    temporaryText += htmlArrText[i];
                                }
                                pChildren.lastElementChild.insertAdjacentHTML("beforeend", temporaryText);

                            } else {
                                pChildren.insertAdjacentHTML("beforeend", "<span attribute></span>");
                                temporaryText = "";

                                for (i += 0; htmlArrText[i] != " " && htmlArrText[i] != ">" && htmlArrText[i] != "\"" && htmlArrText[i] != "="; i++) {
                                    temporaryText += htmlArrText[i];
                                    
                                }
                                pChildren.lastElementChild.insertAdjacentHTML("beforeend", temporaryText);
                            }
                            if (htmlArrText[i] == "=" && htmlArrText[i + 1] == "\"") {
                                pChildren.insertAdjacentHTML("beforeend", "<span symbol>=\"</span>");
                                i++;

                            } else {
                                pChildren.insertAdjacentHTML("beforeend", "<span symbol>\"</span>");
                            }
                        }
                        i++;
                    }
                    if (htmlArrText[i] == ">") {
                        pChildren.insertAdjacentHTML("beforeend", "<span symbol>></span>");
                    }
                }
            } else if (htmlArrText[i - 2] == ">" || htmlArrText[i - 1] == ">") {
                pChildren.insertAdjacentHTML("beforeend", "<span></span>");
                temporaryText = "";
                for (i += 0; htmlArrText[i] != "\n" && htmlArrText[i] != "<"; i++) {
                    temporaryText += htmlArrText[i];
                }
                i--;
                pChildren.lastElementChild.insertAdjacentHTML("beforeend", temporaryText);
            }
        }
        HtmlCode.updateLine();
    }
    static updateLine() {
        var elem =  Get("Html_Code_Elements_View").lastElementChild.children;
        var elemI =  Get("Html_Code_Elements_View").firstElementChild;
        var lastLine = parseInt(Get("Html_Code_Elements_View").firstElementChild.lastElementChild.innerHTML, 10) + 1;

        for (let i = 0; elem.length >= elemI.children.length; i++) {
            elemI.insertAdjacentHTML("beforeend", "<p>" + lastLine + "</p>");
            lastLine++;
        }
    }
}