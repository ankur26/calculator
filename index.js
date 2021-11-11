const add = (a,b) => {return a+b};
const subtract = (a,b) => {return a-b};
const divide = (a,b) => { return a/b};
const multiply = (a,b) => { return a*b};
const operate = (a,b,operator) => {
    switch(operator){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "/":
            return divide(a,b);
        case "*":
            return multiply(a,b);
        default:
            return "Ideally to be not reached.";
            break;
    }
}
const numbers = "1234567890.";
const operators = "+/*-r";
let calculationStack = "";
const incompleteAnswer = document.getElementById("incomplete-answer");
const currentAction = document.getElementById("current-action");
const operation = document.getElementById("operation");
const buttons = document.querySelectorAll("button");
const reset = () => {
    incompleteAnswer.textContent = "";
    currentAction.textContent = "";
    operation.textContent = "";
    calculationStack = "";
}

const clickHandler=(e)=>{
    // console.log(e.target)
    if(numbers.includes(e.target.value)){
        currentAction.textContent+=e.target.value;
    }
    else if(operators.includes(e.target.value)){
        if(e.target.value === "r") reset();
        else{
            let currentValue = currentAction.textContent.includes(".")? currentAction.textContent * 1.0 : parseInt(currentAction.textContent);
            if (!currentValue) {
                incompleteAnswer.textContent = "ERROR! RESET";
                return;
            } 
            if (incompleteAnswer.textContent === ""){
                incompleteAnswer.textContent = currentValue;

            }else{
                let prevValue = incompleteAnswer.textContent.includes(".") ? incompleteAnswer.textContent * 1.0 : parseInt(incompleteAnswer.textContent);
                incompleteAnswer.textContent = operate(currentValue,prevValue,calculationStack);
            }
            currentAction.textContent = "";
            calculationStack=e.target.value;
            operation.textContent = calculationStack;
        }
    }
}

buttons.forEach(button=>{button.addEventListener('click',clickHandler)});



reset();
