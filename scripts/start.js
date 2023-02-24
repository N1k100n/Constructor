var Get = (argument) => {
	return (document.getElementById(argument));
}
var ifr = null;
var ifrWin = null;
var elemIfr = [];

var clientX = 0;
var clientY = 0;
var _clientX = 0;
var _clientY = 0;

var top_RightPanel = Get("Right_Panel").getBoundingClientRect().top;
var right_RightPanel = window.innerWidth - Get("Right_Panel").getBoundingClientRect().right;
var bottom_RightPanel = window.innerHeight - Get("Right_Panel").getBoundingClientRect().bottom;
var left_RightPanel = Get("Right_Panel").getBoundingClientRect().left;
var height_RightPanel = Get("Right_Panel").getBoundingClientRect().height;
var width_RightPanel = Get("Right_Panel").getBoundingClientRect().width;

var top_BottomPanel = Get("Bottom_Panel").getBoundingClientRect().top;
var right_BottomPanel = window.innerWidth - Get("Bottom_Panel").getBoundingClientRect().right;
var bottom_BottomPanel = window.innerHeight - Get("Bottom_Panel").getBoundingClientRect().bottom;
var left_BottomPanel = Get("Bottom_Panel").getBoundingClientRect().left;
var height_BottomPanel = Get("Bottom_Panel").getBoundingClientRect().height;
var width_BottomPanel = Get("Bottom_Panel").getBoundingClientRect().width;

var top_LeftPanel = Get("Left_Panel").getBoundingClientRect().top;
var right_LeftPanel = window.innerWidth - Get("Left_Panel").getBoundingClientRect().right;
var bottom_LeftPanel = window.innerHeight - Get("Left_Panel").getBoundingClientRect().bottom;
var left_LeftPanel = Get("Left_Panel").getBoundingClientRect().left;
var height_LeftPanel = Get("Left_Panel").getBoundingClientRect().height;
var width_LeftPanel = Get("Left_Panel").getBoundingClientRect().width;

var tabs_RightPanel = ["Css_Styles_Elements_Button"];
var tabs_BottomPanel = ["Html_Code_Elements_Button", "Css_Code_Elements_Button"];
var tabs_LeftPanel = ["Dom_Layers_Elements_Button"];

var marginTopElem = 0;
var marginRightElem = 0;
var marginBottomElem = 0;
var marginLeftElem = 0;

var paddingTopElem = 0;
var paddingRightElem = 0;
var paddingBottomElem = 0;
var paddingLeftElem = 0;