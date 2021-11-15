const add = (a, b) => {
	return a + b;
};
const subtract = (a, b) => {
	return a - b;
};
const divide = (a, b) => {
    if(b===0){
        setTimeout(reset,5000);
        return "You did something wrong,resetting in 5 seconds";
    }
    return a/b;
	
};
const multiply = (a, b) => {
	return a * b;
};
const operate = (a, b, operator) => {
	switch (operator) {
		case '+':
			return add(a, b);
		case '-':
			return subtract(a, b);
		case '/':
			return divide(a, b);
		case '*':
			return multiply(a, b);
		default:
			return 'Ideally to be not reached.';
			break;
	}
};
const numbers = '1234567890.';
const operators = '+/*-=br';
let numbersDisabled = false;
let calculationStack = '';
let operatorsDisabled = false;
let equalsClicked = false;
// let dotDisabled = false;
const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');
const operation = document.getElementById('operation');
const buttons = document.querySelectorAll('button');
const warning = document.getElementById('warning');
const dotButton = document.getElementById('dot');
// const doCalculatorValidations = () => {
//     if
//
const disableNumbers = () => {
	warning.classList.toggle('invisible');
	buttons.forEach((button) => {
		if (numbers.includes(button.value)) {
			// if(button.value === "." && dotDisabled) continue;
			button.classList.toggle('disabled');
		}
	});
	numbersDisabled = true;
};
const checkDot = () => {
	if (secondNumber.textContent.includes('.')) {
		dotButton.classList.add('disabled');
		// dotDisabled = true;
	} else {
		dotButton.classList.remove('disabled');
	}
};
const parseValue = (number) => {
	return number.includes('.') ? number * 1.0 : parseInt(number);
};
const checkNumbers = () => {
	if (firstNumber.textContent === '' && secondNumber.textContent === '') {
		buttons.forEach((button) => {
			if (operators.includes(button.value)) {
				button.classList.add('disabled');
			}
		});
	} else {
		buttons.forEach((button) => {
			if (operators.includes(button.value)) {
				button.classList.remove('disabled');
			}
		});
	}
};
const clickHandler = (e) => {
    if(equalsClicked){equalsClicked=false;reset();}
	let current = e.target.value;
	if (numbers.includes(current)) {
		secondNumber.textContent += current;
		if (secondNumber.textContent.length > 20) {
			disableNumbers();
		}
		checkDot();
	} else if (operators.includes(current)) {
		// console.log("Operator");
		if (current === 'r') {
			reset();
		} else if (current === 'b') {
			secondNumber.textContent = secondNumber.textContent.substr(0, secondNumber.textContent.length - 1);
			checkDot();
		} else {
			if (current === '=') {
				// To be implemented later
				if (operation.textContent) {
					if (secondNumber.textContent === '') {
						secondNumber.textContent = firstNumber.textContent;
                        firstNumber.textContent = "";
					} else {
						let result = operate(
							parseValue(firstNumber.textContent),parseValue(secondNumber.textContent), operation.textContent
						);
						secondNumber.textContent = result;
						firstNumber.textContent = '';
					}
				}
                equalsClicked = true;
				operation.textContent = '';
			} else {
				if (firstNumber.textContent === '') {
					firstNumber.textContent = secondNumber.textContent;
					secondNumber.textContent = '';
					operation.textContent = current;
				} else {
					if (secondNumber.textContent) {
						let firstNum = parseValue(firstNumber.textContent);
						let secondNum = parseValue(secondNumber.textContent);
						if (operation.textContent !== '') {
							let result = operate(firstNum, secondNum, operation.textContent);
							firstNumber.textContent = result;
							operation.textContent = current;
							secondNumber.textContent = '';
						}
					} else {
						operation.textContent = current;
					}
				}
			}
		}
	}
	checkNumbers();
};
const reset = () => {
	firstNumber.textContent = '';
	secondNumber.textContent = '';
	operation.textContent = '';
	dotButton.classList.remove('disabled');
	buttons.forEach((button) => {
		button.classList.remove('disabled');
	});
	checkNumbers();
};

buttons.forEach((button) => {
	button.addEventListener('click', clickHandler);
});

// buttons.forEach(button=>{button.addEventListener('click',clickHandler)});

reset();
