var btn1 = document.querySelector("#all");
var btn2 = document.querySelector("#hair");
var btn3 = document.querySelector("#nails");
var btn4 = document.querySelector("#makeup");

var elem1 = document.getElementById('1');
var elem2 = document.getElementById('2');
var elem3 = document.getElementById('3');
var elem4 = document.getElementById('4');
var elem5 = document.getElementById('5');
var elem6 = document.getElementById('6');
var elem7 = document.getElementById('7');
var elem8 = document.getElementById('8');
var elem9 = document.getElementById('9');

var s1 = document.querySelector("#s1");

FormButton = document.querySelector("button");
formWindow = document.querySelector(".form");
bg2 = document.querySelector(".bg2");
inputBtn = document.querySelector(".inputbtn");

function New(){
		elem1.style.display ="inline-block";
        elem2.style.display ="inline-block";
        elem3.style.display ="inline-block";
        elem4.style.display ="inline-block";
        elem5.style.display ="inline-block";
        elem6.style.display ="inline-block";
        elem7.style.display ="inline-block";
        elem8.style.display ="inline-block";
        elem9.style.display ="inline-block";
}
btn2.onclick=function(){
		New();
        elem1.style.display ="none";
        elem2.style.display ="none";
        elem3.style.display ="none";
        elem4.style.display ="none";
        elem5.style.display ="none";
        elem6.style.display ="none";
        elem8.style.display ="none";
        elem9.style.display ="none";
        

}
btn1.onclick=function(){
     New();
}
btn3.onclick=function(){
		New();
        elem1.style.display ="none";
        elem2.style.display ="none";
        elem5.style.display ="none";
        elem6.style.display ="none";
        elem7.style.display ="none";
        elem8.style.display ="none";
        elem9.style.display ="none";
        

}
btn4.onclick=function(){
		New();
        elem1.style.display ="none";
        elem3.style.display ="none";
        elem4.style.display ="none";
        elem7.style.display ="none";
}
FormButton.onclick = function () {
    bg2.style.display = "none";
    formWindow.style.display = "block";
}

inputBtn.onclick = function () {
    formWindow.style.display = "none";
    alert("Спасибо за вашу завяку")
}