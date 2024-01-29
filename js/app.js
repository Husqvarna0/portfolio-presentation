(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let intervals = {};
    function startAnimation(element) {
        let iteration = 0;
        let elementID = element.dataset.id;
        if (intervals[elementID]) clearInterval(intervals[elementID]);
        intervals[elementID] = setInterval((() => {
            element.innerText = element.innerText.split("").map(((letter, index) => {
                if (index < iteration) return element.dataset.value[index];
                return letters[Math.floor(Math.random() * 26)];
            })).join("");
            if (iteration >= element.dataset.value.length) clearInterval(intervals[elementID]);
            iteration += 1 / 3;
        }), 30);
    }
    function handleMouseOver(event) {
        startAnimation(event.target);
    }
    document.addEventListener("DOMContentLoaded", (() => {
        let elements = document.querySelectorAll(".title, .name");
        elements.forEach(((element, index) => {
            element.dataset.id = index;
            element.onmouseover = handleMouseOver;
            startAnimation(element);
        }));
    }));
    window["FLS"] = true;
    isWebp();
})();