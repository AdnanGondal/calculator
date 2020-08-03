
let display;
updateDisplay();

function add(num1,num2){
    return Number(num1)+Number(num2);
    // Number needed to avound concatenation/
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
    let dispStore = "";
    let number;
    display = document.querySelector('#display-text');
    display.textContent = dispStore;
    let operatorUsed;
    let num1;
    let num2;
    let operator;

    const buttons = document.querySelectorAll('.digits');
    const operationButs = document.querySelectorAll('.operations');
    const clearBut = document.querySelector('#clear-but');
    const equalBut = document.querySelector('#equal-but');

    //makes all the buttons add to the display their own text content. 
    buttons.forEach((button) => {

        button.addEventListener('click',()=>{
            dispStore += (button.textContent);
            num2 += (button.textContent);
            display.textContent = dispStore;
    
        });
    
    
    
    });

    //adds operators to the screen: 
    operationButs.forEach((operatorBut)=>{
    
        operatorBut.addEventListener('click',()=>{
            num2 = "";
            num1 = dispStore;
            operatorUsed = operatorBut.textContent;
            dispStore += operatorUsed;
            display.textContent = dispStore;

        });
    
    //for all other important buttons:
    
    equalBut.addEventListener('click',()=>{
        
        //gets the result that we need
        switch(operatorUsed){
            case 'X':
                result = operate(multiply,num1,num2);
                break;
            case '+':
                result = operate(add,num1,num2);
                break;
            case '÷':
                result = operate(divide,num1,num2);
                break;
            case '-':
                result = operate(subtract,num1,num2);
                break;
        }
        
        
        
        display.textContent = result;
    });



    clearBut.addEventListener('click',()=>{
        dispStore = "";
        display.textContent = dispStore;
    });




    });

    





}