const calculator = document.querySelector('.calculator');
//Calculator has two parts the Keys part and the Display part.
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');


//Adding event listener to the keys
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        //When a user hits a number key after an operator key
        //To release the pressed state, 
        //we remove the is-depressed class from all keys through a forEach loop
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'));
        

        //when a user hits a number key
        // if the calculator shows 0, we need to replace the display with clicked key
        if(!action) { 
            if (displayedNum === '0' || 
            previousKeyType ==='operator' || 
            previousKeyType === 'calculate')
            {
                
                display.textContent = keyContent;

            } else { // if the calcultor shows non zero number, we need to append the clicked key to the displayed numeber
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }

        //when a user hits the decimal key
        if (action === 'decimal') {
            if(!displayedNum.includes('.')){ //if the display doesn't have any decimal point, display the pressed decimal point
                display.textContent = displayedNum + '.';
            }else if (previousKeyType ==='operator' || 
            previousKeyType === 'calculate') {
                display.textContent = '0.';
            }

            calculator.dataset.previousKeyType = 'decimal';
            
        }

        //when a user hits an operator key
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            //if the user hits a number, an operator, a number and another operator
            // the display should be updated with the calculated value
            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
              ) {
                //To get the first number, we need to store the calculator’s displayed value 
                //before we wipe it clean. So we are storing the first number when the operator 
                //button gets clicked
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
              } else {
                calculator.dataset.firstValue = displayedNum;
              }
        
              key.classList.add('is-depressed');
              calculator.dataset.previousKeyType = 'operator';
              calculator.dataset.operator = action;
            }
    

        //when the user hits the equals key
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            //

            if (firstValue) {
                if(previousKeyType === 'calculate') {
                    firstValue = displayedNum; // the displayed num is stored as firstValue
                    secondValue = calculator.dataset.modValue;// the second value is saved as a modvalue
                }
            display.textContent = calculate(firstValue, operator, secondValue);
            //Now we have to create a calculate function with three parameters
            }

            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }




         // if the key's data-action is clear when the user clicked AC key
        if (action === 'clear') {
        
            if (key.textContent === 'AC') {
              calculator.dataset.firstValue = '';
              calculator.dataset.modValue = '';
              calculator.dataset.operator = '';
              calculator.dataset.previousKeyType = '';
            } else {
                key.textContent = 'AC';
                //All Clear (denoted by AC) clears everything and 
                //resets the calculator to its initial state.
            }
      
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear';
          
      
        }

        //Clear entry (denoted by CE) clears the current entry. 
        //It keeps previous numbers in memory.
        if (action != 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE';
        }
    }
})

//Calculate function using the operators
const calculate = (n1, operator, n2) => {

    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === 'add') return firstNum + secondNum;
    if (operator === 'subtract') return firstNum - secondNum;
    if (operator === 'multiply') return firstNum * secondNum;
    if (operator === 'divide') return firstNum / secondNum;

}



