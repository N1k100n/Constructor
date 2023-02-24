
//* Перетаскивание окон
    var elemEvent;
    var elemEventButtton;

    function clickButtonPanel(idPanel) {
        elemEvent = Get(idPanel);
        elemEventButtton = Get(idPanel).firstElementChild;
        WindowPanel.comingToTheFore(Get(idPanel).parentNode.id);
        ButtonPanel.changeColor(Get(idPanel).parentNode.id);
    }
    // Перетаскивание "Css_Styles_Elements"
    Get("Css_Styles_Elements_Button").addEventListener("mousedown", function() {
        clickButtonPanel("Css_Styles_Elements");
        setTimeout(addEventListenerMovement,10,"Css_Styles_Elements_Button");
    });
    Get("Css_Styles_Elements_Button").addEventListener("touchstart", function() {
        clickButtonPanel("Css_Styles_Elements");
        setTimeout(addEventListenerMovement,10,"Css_Styles_Elements_Button", "touch");
    });

    // Перетаскивание "Dom_Layers_Elements"
    Get("Dom_Layers_Elements_Button").addEventListener("mousedown", function() {
        clickButtonPanel("Dom_Layers_Elements");
        setTimeout(addEventListenerMovement,10,"Dom_Layers_Elements_Button");
    });
    Get("Dom_Layers_Elements_Button").addEventListener("touchstart", function() {
        clickButtonPanel("Dom_Layers_Elements");
        setTimeout(addEventListenerMovement,10,"Dom_Layers_Elements_Button", "touch");
    });

    // Перетаскивание "Html_Code_Elements"
    Get("Html_Code_Elements_Button").addEventListener("mousedown", function() {
        clickButtonPanel("Html_Code_Elements");
        setTimeout(addEventListenerMovement,10,"Html_Code_Elements_Button");
    });
    Get("Html_Code_Elements_Button").addEventListener("touchstart", function() {
        clickButtonPanel("Html_Code_Elements");
        setTimeout(addEventListenerMovement,10,"Html_Code_Elements_Button", "touch");
    });

    // Перетаскивание "Css_Code_Elements"
    Get("Css_Code_Elements_Button").addEventListener("mousedown", function() {
        clickButtonPanel("Css_Code_Elements");
        setTimeout(addEventListenerMovement,10,"Css_Code_Elements_Button");
    });
    Get("Css_Code_Elements_Button").addEventListener("touchstart", function() {
        clickButtonPanel("Css_Code_Elements");
        setTimeout(addEventListenerMovement,10,"Css_Code_Elements_Button", "touch");
    });

    // Инициализация переменных и добавление ивентов
    function addEventListenerMovement(idButton, type) {
        if (type == "touch") {
            window.addEventListener("touchmove", startMovement);
            window.addEventListener("touchend", stopMovement);
        } else {
            window.addEventListener("mousemove", startMovement);
            window.addEventListener("mouseup", stopMovement);
        }
        elemEvent = Get(idButton).parentNode;
        elemEventButtton = Get(idButton);
    }

    // Передвигаемые панели
    class WindowPanel {
        // Панель "клеится" или начинает "плавать"
        static stickingPanel(idPanel, clientX, clientY) {
            // Панель "клеится" к "Left_Panel"
            if (idPanel == "Left_Panel") {
                elemEvent.style.top = "70px";
                elemEvent.style.bottom = "0px";
                elemEvent.style.right = "";
                elemEvent.style.left = "0px";
                elemEvent.style.height = "";
                elemEvent.style.width = width_LeftPanel + "px";
            }
            // Панель "клеится" к "Right_Panel"
            if (idPanel == "Right_Panel") {
                elemEvent.style.top = "70px";
                elemEvent.style.bottom = "0px";
                elemEvent.style.right = "0px";
                elemEvent.style.left = "";
                elemEvent.style.height = "";
                elemEvent.style.width = width_RightPanel + "px";
            }
            // Панель "клеится" к "Bottom_Panel"
            if (idPanel == "Bottom_Panel") {
                elemEvent.style.top = "";
                elemEvent.style.bottom = "0px";
                elemEvent.style.right = right_BottomPanel + "px";
                elemEvent.style.left = left_BottomPanel + "px";
                elemEvent.style.height = height_BottomPanel + "px";
                elemEvent.style.width = "";
            }
            // Панель начинает "плавать"
            if (idPanel == "Moving_Window") {
                if (clientY >= 10) {
                    if (window.innerHeight - clientY >= 10) {
                        elemEvent.style.top = clientY + 10 + "px";
                    } else {
                        elemEvent.style.top = window.innerHeight + "px";
                    }
                } else {
                    elemEvent.style.top = "20px";
                }
                elemEvent.style.right = "";
                elemEvent.style.bottom = "";
                if (clientX >= 19) {
                    if (window.innerWidth - clientX >= 19) {
                        elemEvent.style.left = clientX - 19 + "px";
                    } else {
                        elemEvent.style.left = window.innerWidth - 38 + "px";
                    }
                } else {
                    elemEvent.style.left = "0px";
                }
                if (elemEvent.id == "Html_Code_Elements" || elemEvent.id == "Css_Code_Elements") {
                    elemEvent.style.height = "300px";
                    elemEvent.style.width = "600px";
                } else {
                    elemEvent.style.height = "300px";
                    elemEvent.style.width = "210px";
                }
            }
            if (idPanel != "Moving_Window") {
                elemEvent.removeAttribute("movement", "");
                if (elemEvent.parentNode != Get('Moving_Window')) {
                    ButtonPanel.min(elemEvent.parentNode, false);
                }
                WindowPanel.comingToTheFore(idPanel);
                ButtonPanel.changeColor(idPanel);
            } else {
                elemEvent.setAttribute("movement", "");
                if (elemEvent.parentNode != Get('Moving_Window')) {
                    ButtonPanel.min(elemEvent.parentNode);
                }
                elemEventButtton.style.left = "0px";
                ButtonPanel.changeColorRemaining();
                WindowPanel.comingToTheFore("Moving_Window");
                ButtonPanel.changeColor("Moving_Window");
            }
        }
        // Выходит на передний план
        static comingToTheFore(idPanel) {
            switch (idPanel) {
                case "Moving_Window":
                    Get('Moving_Window').appendChild(elemEvent);
                    elemEvent.style.zIndex = "50";
                    break;
                default:
                    Get(idPanel).appendChild(elemEvent);
                    elemEvent.style.zIndex = "";
                    break;
            }
        }
    }

    // Проверка куда липнуть
    function checkingWhereSticky(clientX, clientY) {
        _clientX = window.innerWidth - clientX;
        if (clientX < width_LeftPanel + 15 && clientY > 35 && clientY < 85) {
            // Приклеивание к "Left_Panel"
            WindowPanel.stickingPanel("Left_Panel", clientX, clientY);

            // Движение кнопки за мышью
            if (clientX > 19 && clientX < width_LeftPanel - 19) {
                elemEventButtton.style.left = clientX - 19 + "px";
                ButtonPanel.min(elemEvent.parentNode, false);
            }
            // Выравникание по краям
            if (clientX < 19) {
                elemEventButtton.style.left = "0px";
            }
            if (clientX > width_LeftPanel - 19) {
                elemEventButtton.style.left = width_LeftPanel - 38 + "px";
            }
            if (Get('Left_Panel').children.length * 45 > width_LeftPanel + 5) {
                ButtonResizePanel.leftPanelZero();
                ButtonResizePanel.resizeWidthLeftPanel();
            }
            ButtonResizePanel.displayPanel(elemEvent);
        } else if (_clientX < width_RightPanel + 15 && clientY > 35 && clientY < 85) {
            // Приклеивание к "Right_Panel"
            WindowPanel.stickingPanel("Right_Panel", clientX, clientY);
            
            // Движение кнопки за мышью
            if (_clientX > 19 && _clientX < width_RightPanel - 19) {
                elemEventButtton.style.left = width_RightPanel - _clientX - 19 + "px";
                ButtonPanel.min(elemEvent.parentNode, false);
            }
            // Выравникание по краям
            if (_clientX < 19) {
                elemEventButtton.style.left = width_RightPanel - 38 + "px";
            }
            if (_clientX > width_RightPanel - 19) {
                elemEventButtton.style.left = "0px";
            }
            if (Get('Right_Panel').children.length * 45 > width_RightPanel + 5) {
                ButtonResizePanel.rightPanelZero();
                ButtonResizePanel.resizeWidthRightPanel();
            }
            ButtonResizePanel.displayPanel(elemEvent);
        } else if (clientX > left_BottomPanel - 15 && _clientX > right_BottomPanel - 15 && clientY > top_BottomPanel - 35 && clientY < top_BottomPanel + 15) {
            // Приклеивание к "Bottom_Panel"
            WindowPanel.stickingPanel("Bottom_Panel", clientX, clientY);

            // Движение кнопки за мышью
            if (clientX > left_BottomPanel + 19 && _clientX > right_BottomPanel + 19) {
                elemEventButtton.style.left = clientX - left_BottomPanel - 19 + "px";
                ButtonPanel.min(elemEvent.parentNode, false);
            }
            // Выравникание по краям
            if (clientX - left_BottomPanel < 19) {
                elemEventButtton.style.left = "0px";
            }
            if (_clientX < right_BottomPanel + 19) {
                elemEventButtton.style.left = width_BottomPanel - 38 + "px";
            }
        } else {
            // Окно становится перетаскиваемым
            WindowPanel.stickingPanel("Moving_Window", clientX, clientY);
            ButtonPanel.min(Get('Right_Panel'), false);
            ButtonPanel.min(Get('Left_Panel'), false);
            ButtonPanel.min(Get('Bottom_Panel'), false);
            ButtonResizePanel.displayPanel(elemEvent);
            ButtonResizePanel.displayPanel(Get('Right_Panel').lastElementChild);
            ButtonResizePanel.displayPanel(Get('Left_Panel').lastElementChild);
        }
    }
    function startMovement() {
        if (event.clientX != undefined) {
            clientX = event.clientX;
            clientY = event.clientY;
        } else {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        }
        checkingWhereSticky(clientX, clientY);
        elemEvent.lastElementChild.style.pointerEvents = "none";
        Get('Frame_Website').style.pointerEvents = "none";
        Get('Right_Panel').style.pointerEvents = "none"
        Get('Left_Panel').style.pointerEvents = "none"
        Get('Bottom_Panel').style.pointerEvents = "none"
    }
    function stopMovement() {
        window.removeEventListener("mousemove", startMovement);
        window.removeEventListener("mouseup", stopMovement);
        window.removeEventListener("touchmove", startMovement);
        window.removeEventListener("touchend", stopMovement);
        if (elemEvent.parentNode != Get('Moving_Window')) {
            ButtonPanel.min(elemEvent.parentNode);
        }
        elemEvent.lastElementChild.style.pointerEvents = "";
        Get('Frame_Website').style.pointerEvents = "";
        Get('Right_Panel').style.pointerEvents = ""
        Get('Left_Panel').style.pointerEvents = ""
        Get('Bottom_Panel').style.pointerEvents = ""
    }

    // Кнопки в панелях
    class ButtonPanel {
        // Изменение цвета кнопки
        static changeColor(idPanel) {
            var parent = false;
            switch (idPanel) {
                case "Moving_Window":
                    elemEventButtton.setAttribute("active", "");
                    break;
                case "Right_Panel":
                    parent = Get('Right_Panel');
                    break;
                case "Bottom_Panel":
                    parent = Get('Bottom_Panel');
                    break;
                case "Left_Panel":
                    parent = Get('Left_Panel');
                    break;
            }
            if (parent != false) {
                for (let i = 0; i < parent.children.length - 1; i++) {
                    parent.children[i].firstElementChild.removeAttribute("active", "");
                }
                elemEventButtton.setAttribute("active", "");
            }
        }
        static changeColorRemaining() {
            if (elemEvent.parentNode.children.length > 1) {
                elemEvent.parentNode.children[elemEvent.parentNode.children.length - 2].firstElementChild.setAttribute("active", "");
            }
        }
        static min(parent, activeButton = true) {
            var arr = [];
            for (let i = 0; i < parent.children.length; i++) {
                arr[i] = parent.children[i].firstElementChild;
            }
            arr.sort(function(a, b) {
                return parseInt(a.style.left, 10) - parseInt(b.style.left, 10);
            });

            ButtonPanel.alignment(arr, activeButton);
        }
        static alignment(arr, activeButton) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == elemEventButtton) {
                    arr.slice(i, 1);
                }
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] != elemEventButtton || activeButton) {
                    arr[i].style.left = i * 45 + 5 + "px";
                }
            }
            ButtonResizePanel.resizeBottomPanelButtonT();
        }
    }

//* Изменение размера экрана
    window.addEventListener('resize', function() {
        left_RightPanel = Get("Right_Panel").getBoundingClientRect().left;
        height_RightPanel = Get("Right_Panel").getBoundingClientRect().height;
        width_RightPanel = Get("Right_Panel").getBoundingClientRect().width;

        top_BottomPanel = Get("Bottom_Panel").getBoundingClientRect().top;
        right_BottomPanel = window.innerWidth - Get("Bottom_Panel").getBoundingClientRect().right;
        left_BottomPanel = Get("Bottom_Panel").getBoundingClientRect().left;
        height_BottomPanel = Get("Bottom_Panel").getBoundingClientRect().height;
        width_BottomPanel = Get("Bottom_Panel").getBoundingClientRect().width;

        right_LeftPanel = window.innerWidth - Get("Left_Panel").getBoundingClientRect().right;
        height_LeftPanel = Get("Left_Panel").getBoundingClientRect().height;
        width_LeftPanel = Get("Left_Panel").getBoundingClientRect().width;
    });

//* Изменение размера панелей
    Get("Bottom_Panel_Resize_Button_T").addEventListener("mousedown", function() {
        elemEventButtton = Get("Bottom_Panel_Resize_Button_T");
        document.body.style.cursor = "row-resize";
        window.addEventListener("mousemove", ButtonResizePanel.startResize);
        window.addEventListener("mouseup", ButtonResizePanel.stopResize);
    });
    Get("Bottom_Panel_Resize_Button_T").addEventListener("touchstart", function() {
        elemEventButtton = Get("Bottom_Panel_Resize_Button_T");
        window.addEventListener("touchmove", ButtonResizePanel.startResize);
        window.addEventListener("touchend", ButtonResizePanel.stopResize);
    });
    Get("Bottom_Panel_Resize_Button_R").addEventListener("mousedown", function() {
        elemEventButtton = Get("Bottom_Panel_Resize_Button_R");
        document.body.style.cursor = "col-resize";
        window.addEventListener("mousemove", ButtonResizePanel.startResize);
        window.addEventListener("mouseup", ButtonResizePanel.stopResize);
    });
    Get("Bottom_Panel_Resize_Button_R").addEventListener("touchstart", function() {
        elemEventButtton = Get("Bottom_Panel_Resize_Button_R");
        window.addEventListener("touchmove", ButtonResizePanel.startResize);
        window.addEventListener("touchend", ButtonResizePanel.stopResize);
    });
    Get("Bottom_Panel_Resize_Button_L").addEventListener("mousedown", function() {
        elemEventButtton = Get("Bottom_Panel_Resize_Button_L");
        document.body.style.cursor = "col-resize";
        window.addEventListener("mousemove", ButtonResizePanel.startResize);
        window.addEventListener("mouseup", ButtonResizePanel.stopResize);
    });
    Get("Bottom_Panel_Resize_Button_L").addEventListener("touchstart", function() {
        elemEventButtton = Get("Bottom_Panel_Resize_Button_L");
        window.addEventListener("touchmove", ButtonResizePanel.startResize);
        window.addEventListener("touchend", ButtonResizePanel.stopResize);
    });
    Get("Right_Panel_Resize_Button").addEventListener("mousedown", function() {
        elemEventButtton = Get("Right_Panel_Resize_Button");
        document.body.style.cursor = "col-resize";
        window.addEventListener("mousemove", ButtonResizePanel.startResize);
        window.addEventListener("mouseup", ButtonResizePanel.stopResize);
    });
    Get("Right_Panel_Resize_Button").addEventListener("touchstart", function() {
        elemEventButtton = Get("Right_Panel_Resize_Button");
        window.addEventListener("touchmove", ButtonResizePanel.startResize);
        window.addEventListener("touchend", ButtonResizePanel.stopResize);
    });
    Get("Left_Panel_Resize_Button").addEventListener("mousedown", function() {
        elemEventButtton = Get("Left_Panel_Resize_Button");
        document.body.style.cursor = "col-resize";
        window.addEventListener("mousemove", ButtonResizePanel.startResize);
        window.addEventListener("mouseup", ButtonResizePanel.stopResize);
    });
    Get("Left_Panel_Resize_Button").addEventListener("touchstart", function() {
        elemEventButtton = Get("Left_Panel_Resize_Button");
        window.addEventListener("touchmove", ButtonResizePanel.startResize);
        window.addEventListener("touchend", ButtonResizePanel.stopResize);
    });

    class ButtonResizePanel {
         // Начало  изменение размера панели
         static startResize() {
            if (event.clientX != undefined) {
                clientX = event.clientX;
                clientY = event.clientY;
            } else {
                clientX = event.touches[0].clientX;
                clientY = event.touches[0].clientY;
            }
            Get('Frame_Website').style.pointerEvents = "none";
            ButtonResizePanel.resize(clientX, clientY);
        }
        // Изменение размера панели
        static resize(clientX, clientY) {
            switch (elemEventButtton.id) {
                case "Bottom_Panel_Resize_Button_T":
                    if (clientY > window.innerHeight - 600) {
                        if (clientY < window.innerHeight) {
                            top_BottomPanel = clientY;
                            height_BottomPanel = window.innerHeight - clientY;
                        } else {
                            top_BottomPanel = window.innerHeight;
                            height_BottomPanel = 0;
                        }
                    } else {
                        top_BottomPanel = (window.innerHeight - 600);
                        height_BottomPanel = window.innerHeight - (window.innerHeight - 600);
                    }
    
                    Get("Bottom_Panel").style.height = height_BottomPanel + "px";
                    for (let i = 0; i < Get("Bottom_Panel").children.length; i++) {
                        Get("Bottom_Panel").children[i].style.height = height_BottomPanel + "px";
                    }
                    Get('Bottom_Panel_Resize_Button_T').style.bottom = height_BottomPanel + "px";
                    Get('Bottom_Panel_Resize_Button_R').style.height = height_BottomPanel + "px";
                    Get('Bottom_Panel_Resize_Button_L').style.height = height_BottomPanel + "px";
                    Get('Frame').style.bottom = height_BottomPanel + 30 + "px";
                    break;
                case "Bottom_Panel_Resize_Button_R":
                    if (clientX > window.innerWidth / 2 + 200) {
                        if (clientX < window.innerWidth - ButtonResizePanel.widthChildrenRightPanelZero() - 10) {
                            right_BottomPanel = window.innerWidth - clientX;
                            width_BottomPanel = window.innerWidth - left_BottomPanel - (window.innerWidth - clientX);
                            left_RightPanel = clientX + 10;
                            width_RightPanel = window.innerWidth - clientX - 10;
                        } else {
                            ButtonResizePanel.rightPanelZero();
                        }
                    } else {
                        ButtonResizePanel.rightPanelCenter();
                    }
                    ButtonResizePanel.resizeWidthRightPanel();
                    ButtonResizePanel.displayPanel(Get('Right_Panel').lastElementChild);
                    break;
                case "Bottom_Panel_Resize_Button_L":
                    if (clientX < window.innerWidth / 2 - 200) {
                        if (clientX > ButtonResizePanel.widthChildrenLeftPanelZero() + 10) {
                            left_BottomPanel = clientX;
                            width_BottomPanel = window.innerWidth - right_BottomPanel - clientX;
                            right_LeftPanel = window.innerWidth - clientX + 10;
                            width_LeftPanel = clientX - 10;
                        } else {
                            ButtonResizePanel.leftPanelZero();
                        }
                    } else {
                        ButtonResizePanel.leftPanelCenter();
                    }
                    ButtonResizePanel.resizeWidthLeftPanel();
                    ButtonResizePanel.displayPanel(Get('Left_Panel').lastElementChild);
                    break;
                case "Right_Panel_Resize_Button":
                    if (clientX - 10 > window.innerWidth / 2 + 200) {
                        if (clientX < window.innerWidth - ButtonResizePanel.widthChildrenRightPanelZero()) {
                            right_BottomPanel = window.innerWidth - clientX + 10;
                            width_BottomPanel = window.innerWidth - left_BottomPanel - (window.innerWidth - clientX) - 10;
                            left_RightPanel = clientX;
                            width_RightPanel = window.innerWidth - clientX;
                        } else {
                            ButtonResizePanel.rightPanelZero();
                        }
                    } else {
                        ButtonResizePanel.rightPanelCenter();
                    }
                    ButtonResizePanel.resizeWidthRightPanel();
                    ButtonResizePanel.displayPanel(Get('Right_Panel').lastElementChild);
                    break;
                case "Left_Panel_Resize_Button":
                    if (clientX + 10 < window.innerWidth / 2 - 200) {
                        if (clientX > ButtonResizePanel.widthChildrenLeftPanelZero()) {
                            left_BottomPanel = clientX + 10;
                            width_BottomPanel = window.innerWidth - right_BottomPanel - clientX + 10;
                            right_LeftPanel = window.innerWidth - clientX;
                            width_LeftPanel = clientX;
                        } else {
                            ButtonResizePanel.leftPanelZero();
                        }
                    } else {
                        ButtonResizePanel.leftPanelCenter();
                    }
                    ButtonResizePanel.resizeWidthLeftPanel();
                    ButtonResizePanel.displayPanel(Get('Left_Panel').lastElementChild);
                    break;
            }
        }
        // Правая панель выравнивание к 0
        static rightPanelZero() {
            right_BottomPanel = ButtonResizePanel.widthChildrenRightPanelZero() + 10;
            width_BottomPanel = window.innerWidth - left_BottomPanel - ButtonResizePanel.widthChildrenRightPanelZero() - 10;
            left_RightPanel = window.innerWidth - ButtonResizePanel.widthChildrenRightPanelZero();
            width_RightPanel = ButtonResizePanel.widthChildrenRightPanelZero();
        }
        // Правая панель выравнивание к центру
        static rightPanelCenter() {
            right_BottomPanel = window.innerWidth - (window.innerWidth / 2 + 200);
            width_BottomPanel = window.innerWidth - left_BottomPanel - (window.innerWidth - (window.innerWidth / 2 + 200));
            left_RightPanel = (window.innerWidth / 2 + 200) + 10;
            width_RightPanel = window.innerWidth - (window.innerWidth / 2 + 200) - 10;
        }
        // Левая панель выравнивание к 0
        static leftPanelZero() {
            left_BottomPanel = ButtonResizePanel.widthChildrenLeftPanelZero() + 10;
            width_BottomPanel = window.innerWidth - right_BottomPanel - ButtonResizePanel.widthChildrenLeftPanelZero() - 10;
            right_LeftPanel = window.innerWidth - ButtonResizePanel.widthChildrenLeftPanelZero();
            width_LeftPanel = ButtonResizePanel.widthChildrenLeftPanelZero();
        }
        // Левая панель выравнивание к центру
        static leftPanelCenter() {
            left_BottomPanel = (window.innerWidth / 2 - 200);
            width_BottomPanel = window.innerWidth - right_BottomPanel - (window.innerWidth / 2 - 200);
            right_LeftPanel = window.innerWidth - (window.innerWidth / 2 - 200) + 10;
            width_LeftPanel = (window.innerWidth / 2 - 200) - 10;
        }
        static resizeWidthRightPanel() {
            Get("Bottom_Panel").style.right = right_BottomPanel + "px";
            for (let i = 0; i < Get("Bottom_Panel").children.length; i++) {
                Get("Bottom_Panel").children[i].style.right = right_BottomPanel + "px";
            }
            ButtonResizePanel.resizeBottomPanelButtonT();
            Get('Bottom_Panel_Resize_Button_T').style.right = right_BottomPanel + "px";
            Get('Bottom_Panel_Resize_Button_R').style.right = right_BottomPanel - 3 + "px";
            Get('Right_Panel_Resize_Button').style.right = window.innerWidth - left_RightPanel + "px";
            Get('Right_Panel').style.width = width_RightPanel + "px";
            for (let i = 0; i < Get("Right_Panel").children.length; i++) {
                Get("Right_Panel").children[i].style.width = width_RightPanel + "px";
            }
            Get('Frame').style.right = right_BottomPanel + 10 + "px";
        }
        static resizeWidthLeftPanel() {
            Get("Bottom_Panel").style.left = left_BottomPanel + "px";
            for (let i = 0; i < Get("Bottom_Panel").children.length; i++) {
                Get("Bottom_Panel").children[i].style.left = left_BottomPanel + "px";
            }
            ButtonResizePanel.resizeBottomPanelButtonT();
            Get('Bottom_Panel_Resize_Button_L').style.left = left_BottomPanel - 3 + "px";
            Get('Left_Panel_Resize_Button').style.left = window.innerWidth - right_LeftPanel + "px";
            Get('Left_Panel').style.width = width_LeftPanel + "px";
            for (let i = 0; i < Get("Left_Panel").children.length; i++) {
                Get("Left_Panel").children[i].style.width = width_LeftPanel + "px";
            }
            Get('Frame').style.left = left_BottomPanel + 10 + "px";
        }
        // Размер кнопок в левой панели
        static widthChildrenLeftPanelZero() {
            if (Get('Left_Panel').children.length > 0) {
                return Get('Left_Panel').children.length * 45 + 5;
            }
            return 0;
        }
        // Размер кнопок в правой панели
        static widthChildrenRightPanelZero() {
            if (Get('Right_Panel').children.length > 0) {
                return Get('Right_Panel').children.length * 45 + 5;
            }
            return 0;
        }
        static stopResize() {
            document.body.style.cursor = "";
            window.removeEventListener("mousemove", ButtonResizePanel.startResize);
            window.removeEventListener("mouseup", ButtonResizePanel.stopResize);
            window.removeEventListener("touchmove", ButtonResizePanel.startResize);
            window.removeEventListener("touchend", ButtonResizePanel.stopResize);
            Get('Frame_Website').style.pointerEvents = "";
        }
        // Изменение размера кнопки "Bottom_Panel_Resize_Button_T"
        static resizeBottomPanelButtonT() {
            if (Get("Bottom_Panel").children.length > 0) {
                Get('Bottom_Panel_Resize_Button_T').style.width = "100%";
                for (let i = 0; i < Get("Bottom_Panel").children.length; i++) {
                    if (Get('Bottom_Panel_Resize_Button_T').getBoundingClientRect().left <= Get("Bottom_Panel").children[i].firstElementChild.getBoundingClientRect().right) {
                        Get('Bottom_Panel_Resize_Button_T').style.width = window.innerWidth - (parseInt(Get("Bottom_Panel").children[i].firstElementChild.style.left, 10) + left_BottomPanel + 45) - right_BottomPanel + "px";
                    }
                }
            } else {
                Get('Bottom_Panel_Resize_Button_T').style.width = window.innerWidth - (left_BottomPanel + right_BottomPanel) + "px";
            }
        }
        static displayPanel(elem) {
            if (elem != null) {
                if (elem.parentNode.getBoundingClientRect().width == 50) {
                    Animation.transition(elem.lastElementChild, 0.2, "cubic-bezier(0, 0, 1, 1)", 0);
                    elem.lastElementChild.style.opacity = "0";
                    elem.lastElementChild.style.pointerEvents = "none";
                } else {
                    Animation.transition(elem.lastElementChild, 0.2, "cubic-bezier(0, 0, 1, 1)", 0);
                    elem.lastElementChild.style.opacity = "";
                    elem.lastElementChild.style.pointerEvents = "";
                }
            }
        }
    }

//* Нажатие на кнопки в "Top_Panel"
    Get('Top_Panel').addEventListener("click", function() {
        if (event.target.parentNode.id == "Top_Panel") {
            for (let i = 0; i < event.target.parentNode.children.length; i++) {
                event.target.parentNode.children[i].removeAttribute("active", "");
            }
            event.target.setAttribute("active", "");
        }
    });