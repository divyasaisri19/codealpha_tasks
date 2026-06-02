const display = document.getElementById("display");

function appendValue(value){
display.value += value;
}

function clearDisplay(){
display.value = "";
}

function deleteLast(){
display.value = display.value.slice(0,-1);
}

function calculate(){

try{

    let expression = display.value;
    let result = eval(expression);

    document.getElementById("historyList").innerHTML +=
    `<li>${expression} = ${result}</li>`;

    display.value = result;

}

catch{

    display.value = "Error";

}


}

document.addEventListener("keydown", function(event){

if("0123456789+-*/.".includes(event.key)){
    appendValue(event.key);
}

if(event.key === "Enter"){
    calculate();
}

if(event.key === "Backspace"){
    deleteLast();
}

if(event.key === "Escape"){
    clearDisplay();
}

});
