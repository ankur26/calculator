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
        case "=":
            return "To be worked on";
        default:
            return "Ideally to be not reached.";
            break;
    }
}