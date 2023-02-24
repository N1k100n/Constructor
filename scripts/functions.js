if (ifrContentWindowOnload) {
    console.log(Get('Frame_Website').contentWindow.document.getElementsByTagName("html")[0]);
    ButtonResizePanel.resizeBottomPanelButtonT();
    ifr = Get('Frame_Website').contentWindow.document;
    ifrWin = Get('Frame_Website').contentWindow;
    Layer.addBodyLayer();
    HtmlCode.loading();
}
Get('Frame_Website').contentWindow.onload = function() {
    console.log(Get('Frame_Website').contentWindow.document.getElementsByTagName("html")[0]);
    ButtonResizePanel.resizeBottomPanelButtonT();
    ifr = Get('Frame_Website').contentWindow.document;
    ifrWin = Get('Frame_Website').contentWindow;
    Layer.addBodyLayer();
    HtmlCode.loading();
};