"use strict";

let form = document.forms.regform;
let btnNextEx = document.getElementById("next-ex");
let boxNextEx = document.getElementsByClassName("box-next-ex");

let textBefore = document.getElementById("text-box__before-text");
let textAfter = document.getElementById("text-box__after-text");

let openNextEx = () => {
    form.style.display = "none";
    boxNextEx[0].style.display = "block";
};

let changeText = () => {
    let str = textBefore.textContent;
    console.log(str);

    // textAfter.innerText = str.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');

    //вариант учителя
    textAfter.innerText = str.replace(/\B'|'\B/g, '"');
};