
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

function operateString(num){
    let nos = num.split(/([-x÷+]+)/);
    console.log(nos)
    let res = nos[0];
    for (let i=1;i<nos.length;i=i+2){
        let ops = nos[i];
        let no = nos[i+1];
        res = getOperate(ops,res,no)
    }
    return res;

}


function updateDisplay(){
    let dispStore = ""; //string to store what is displayed to user. 
    let result; 
    let operatorUsed;
    let num1;
    let num2;
    let num2clear=false;
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
            else if (e.keyCode == 13){
                equalBut.click();
            }
            else if (e.keyCode == 8){
                backSpaceBut.click();
            }
        });
    }
    //For all the digit buttons: 
    buttons.forEach((button) => {

        button.addEventListener('click',()=>{
            dispStore += (button.textContent);
            if (num2clear == false) num2 += (button.textContent);
            else {num1 += button.textContent}
            display.textContent = dispStore;

            //debugging: 
            console.log({num1,num2,operatorUsed});
        });
    
    });

    //For the operators: 
    operationButs.forEach((operatorBut)=>{
    
        operatorBut.addEventListener('click',()=>{
            num2clear = false;
            decimalBut.disabled = false;
            if (num1==undefined) {num1 = dispStore;}
            else if (isNaN(num1)){
                //alert("we are here");
                num1 = operateString(num1);
            }
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
    
    console.log(isNaN(num1));
    
    if (num1 == undefined || operatorUsed == undefined) {
        result = dispStore;
    } //ensures first equal doesnt return NaN or other error. 
    else if (isNaN(num1)){
    //console.log("here we are");
    result = operateString(num1);
    }
    else result = getOperate(operatorUsed,num1,num2)
        
    //For results with long no of decimal places...
    if ((result.toString().length) > 16){
        result = result.toPrecision(15);
        }
    // need to add below line as some smaller numbers were 
    //being put outside the calculator.
    if ((result.toString().length)>16){ 
        result = Number(result).toExponential(12)
    }

    display.textContent = result; 
    });

    clearBut.addEventListener('click',()=>{
        num1 = undefined;
        num2 = undefined;
        dispStore = "";
        num2clear=false;
        display.textContent = dispStore;
    });

    decimalBut.addEventListener('click',()=>{
        decimalBut.disabled = true;
    });

    backSpaceBut.addEventListener('click',()=>{
        removed = dispStore.slice(0,-1)
        dispStore = removed;
        if (dispStore == "") num1 = undefined;
       
        if (num2 == "") {
            num1 = dispStore;
            num2clear = true;
        }
        if (num2 != undefined) num2 = num2.slice(0,-1);
       
        
        //else if (operatorUsed != undefined) operatorUsed = undefined;
        
        console.log({num1,num2,operatorUsed});
        
        display.textContent = dispStore;
    });

}

