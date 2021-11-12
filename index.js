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
const operators = "+/*-=br";
let warningFlag = false;
let calculationStack = "";
let operatorsDisabled = false;
const incompleteAnswer = document.getElementById("incomplete-answer");
const currentAction = document.getElementById("current-action");
const operation = document.getElementById("operation");
const buttons = document.querySelectorAll("button");
const warning = document.getElementById("warning");
const disableNumbersAndWarn = () =>{
    buttons.forEach(button =>{
        if(numbers.includes(`${button.value}`)){
            button.classList.toggle("disabled")
        }
    });
    warning.classList.toggle("invisible");
    warningFlag = true;
}
const disableOperators = () => {
    buttons.forEach(button =>{
        if(operators.includes(`${button.value}`)){
            button.classList.toggle("disabled")
        }
    });
    operatorsDisabled = true;
}
const reset = () => {
    incompleteAnswer.textContent = "";
    currentAction.textContent = "";
    operation.textContent = "";
    calculationStack = "";
    if(warningFlag){
        disableNumbersAndWarn();
        warningFlag = false;
    }
    disableOperators();
}

const clickHandler=(e)=>{
    // console.log(e.target)
    if(numbers.includes(e.target.value)){
        currentAction.textContent+=e.target.value;
        if(currentAction.textContent.length > 0 && operatorsDisabled){disableOperators();operatorsDisabled = false};
        if(currentAction.textContent.length > 20 && !warningFlag){
            // currentAction.textContent = "Char limit reached";
            disableNumbersAndWarn();
        }
        
    }
    else if(operators.includes(e.target.value)){
        if(e.target.value === "r") reset();
        else if(e.target.value === "b") {
            currentAction.textContent = currentAction.textContent.substr(0,currentAction.textContent.length-1);
            if(warningFlag){
                disableNumbersAndWarn();
                warningFlag = false;
            }
        }
        else{
            let currentValue = currentAction.textContent.includes(".")? currentAction.textContent * 1.0 : parseInt(currentAction.textContent)
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
        if(currentAction.textContent.length === 0){disableOperators();};
    }
}

buttons.forEach(button=>{button.addEventListener('click',clickHandler)});



reset();
