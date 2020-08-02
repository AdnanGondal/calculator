
let display;
updateDisplay();

function add(num1,num2){
    return num1+num2;
}

function subtract(num1,num2){
    return num1-num2;
}

function multiply(num1,num2){
    return num1*num2;
}

function divide(num1,num2){
    return num1/num2;
}

function operate(operator,num1,num2){
    return operator(num1,num2);
}

function updateDisplay(){
    store = ""
    display = document.querySelector('#display-text')
    display.textContent = store;

    button0 = document.querySelector('#zero-but');

    button0.addEventListener('click',()=>{
        store += "0"
        display.textContent = store;
    });
}