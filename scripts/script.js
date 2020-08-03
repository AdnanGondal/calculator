
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
    let result;
    display = document.querySelector('#display-text');
    display.textContent = dispStore;
    let operatorUsed;
    let num1;
    let num2;

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

           

            if (result && num1) {
                num1 = result;
            }

            console.log("num1: " + num1);
            console.log("num2: " + num2);
        });
    
    
    
    });

    //adds operators to the screen: 
    operationButs.forEach((operatorBut)=>{
    
        operatorBut.addEventListener('click',()=>{
            
            
            operatorUsed = operatorBut.textContent;

            if (num1==undefined) {num1 = dispStore;}
            else num1 = getOperate(operatorUsed,num1,num2);
            num2 = "";

            dispStore += operatorUsed;
            display.textContent = dispStore;

        });
    
    //for all other important buttons:
    
    equalBut.addEventListener('click',()=>{
        
        //gets the result that we nee
        result = getOperate(operatorUsed,num1,num2)
        display.textContent = result;
    });



    clearBut.addEventListener('click',()=>{
        num1 = undefined;
        num2 = undefined;
        dispStore = "";
        display.textContent = dispStore;
    });

    });

    function getOperate(operatorUsed,num1,num2){
        switch(operatorUsed){
            case 'X':
                return operate(multiply,num1,num2);
                break;
            case '+':
                return operate(add,num1,num2);
                break;
            case '÷':
                return operate(divide,num1,num2);
                break;
            case '-':
                return operate(subtract,num1,num2);
                break;
        }

    }

    





}