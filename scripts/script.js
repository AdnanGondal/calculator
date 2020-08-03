
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

function getOperate(operatorUsed,num1,num2){
    switch(operatorUsed){
        case 'x':
            return operate(multiply,num1,num2);
        case '+':
            return operate(add,num1,num2);
        case '÷':
            return operate(divide,num1,num2);
        case '-':
            return operate(subtract,num1,num2);
    }

}


function updateDisplay(){
    let dispStore = ""; //string to store what is displayed to user. 
    let result; 
    let operatorUsed;
    let num1;
    let num2;
    //num1 holds the entire previous calculations done
    // num2 holds the final number entered by the user. 

    //DOM elements: 

    const buttons = document.querySelectorAll('.digits');
    const operationButs = document.querySelectorAll('.operations');
    const clearBut = document.querySelector('#clear-but');
    const equalBut = document.querySelector('#equal-but');
    const decimalBut = document.querySelector('#point-but');
    const backSpaceBut = document.querySelector('#backspace-but');
    let display = document.querySelector('#display-text');
    display.textContent = "";

    //For keyboard input: use of .click
    document.onkeypress = function (e){
        
        document.querySelectorAll('button').forEach((button)=>{
            if (e.keyCode == button.textContent.charCodeAt(0)){
                button.click();
            }
        });
    }
    //For all the digit buttons: 
    buttons.forEach((button) => {

        button.addEventListener('click',()=>{
            dispStore += (button.textContent);
            num2 += (button.textContent);
            display.textContent = dispStore;

            //debugging: 
            console.log("num1: " + num1);
            console.log("num2: " + num2);
        });
    
    });

    //For the operators: 
    operationButs.forEach((operatorBut)=>{
    
        operatorBut.addEventListener('click',()=>{
            decimalBut.disabled = false;
            if (num1==undefined) {num1 = dispStore;}
            else if(operatorUsed!=undefined) num1 = getOperate(operatorUsed,num1,num2);
            
            //ie we change the operator used only after it is called 
            // for num1 or else I would get incorrect num1.
            operatorUsed = operatorBut.textContent;
            num2 = "";

            dispStore += operatorUsed;
            display.textContent = dispStore;
            
        });
    
    });
    
    //for all other important buttons: ---------
    
    equalBut.addEventListener('click',()=>{
        
       if (num1 == undefined || operatorUsed == undefined) {
            result = dispStore;
       } //ensures first equal doesnt return NaN or other error. 

        else result = getOperate(operatorUsed,num1,num2)
        
        //For results with long no of decimal places...
        if ((result.toString().length) > 16){
        result = result.toPrecision(15);
        }

        display.textContent = result;
        

    });

    clearBut.addEventListener('click',()=>{
        num1 = undefined;
        num2 = undefined;
        dispStore = "";
        display.textContent = dispStore;
    });

    decimalBut.addEventListener('click',()=>{
        decimalBut.disabled = true;
    });

    backSpaceBut.addEventListener('click',()=>{
        dispStore = dispStore.slice(0,-1);
        
        if (result != undefined) num1 = result;
        if (num2 != undefined) num2 = num2.slice(0,-1);
        else if (operatorUsed != undefined) operatorUsed = undefined;
        display.textContent = dispStore;
    });

  


}

