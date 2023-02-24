
//* Анимации
    class Animation {
        // Добавление стиля анимации
            // Примеры вызова
            //Animation.transition("Top_Panel", 1.5, "ease-out", 0.1);
            //Animation.transition("Top_Panel", 2, "cubic-bezier(0, 0, 1, 1)", 0);
        static transition(id, durationS, timingFunction, delayS){
            if (id.length != undefined) {
                Get(id).style.transition = "all " + durationS + "s " + timingFunction + " " + delayS + "s";
                setTimeout(Animation.delTransition, durationS * 1000 + delayS * 1000, id);
            } else {
                id.style.transition = "all " + durationS + "s " + timingFunction + " " + delayS + "s";
                setTimeout(Animation.delTransition, durationS * 1000 + delayS * 1000, id);
            }
        }
        // Удаление стиля анимации
        static delTransition(id) {
            if (id.length != undefined) {
                Get(id).style.transition = "";
            } else {
                id.style.transition = "";
            }
        }
    }
// //* Select/Выподающий список
//     Get("Window_Tools").addEventListener("click", function() {
//         // console.log(event.target.parentNode.getAttribute("select", ""));
//         if (event.target.parentNode.getAttribute("select", "")) {
//             event.target.parentNode.style.overflow = "visible"
//         }
//     });
//     // Get("Window_Tools").addEventListener("blur", function() {
//     //     console.log("ss");
//     // });