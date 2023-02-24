Get("Html_Code_Elements_View").lastElementChild.onkeydown = function() {
    if(event.key == "Enter") {
        HtmlCode.updateLine();
    }
}
