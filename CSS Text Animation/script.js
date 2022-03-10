var i = 0;
var el = document.querySelector(".lineUp"); //the element
el.addEventListener("animationend", () => { //trigger this when the animation ends
    el.classList.remove("lineUp");  //remove animation class from element
    void el.offsetWidth; //magic
    i++; //counter
    el.innerHTML = i; //inner text to be animated
    el.classList.add("lineUp"); //add back the animation class to the element
});

