let original = document.getElementById("input");
let converted = document.getElementById("output");
let initialCurrency = document.getElementById("inputCurrency");
let finalCurrency = document.getElementById("outputCurrency");
let inputTypeValue, resultTypeValue;

// adding event listeners

original.addEventListener("keyup", myResult);
initialCurrency.addEventListener("change", myResult);
finalCurrency.addEventListener("change", myResult);

// to take initial values and final value of the currency types
inputTypeValue = initialCurrency.value;
resultTypeValue = finalCurrency.value;

function myResult() {

  // when we change the initial currency and final currency we need to update the inputvalue and outputvalue
  inputTypeValue = initialCurrency.value;
  resultTypeValue = finalCurrency.value;

    // we compare the input and result type value and give a function for every case.
    if(inputTypeValue === 'NIS' && resultTypeValue === 'NIS'){
        converted.value = Number(original.value);
    }
    else if (inputTypeValue === 'NIS' && resultTypeValue === 'USD') {
        converted.value = (Number(original.value) / 3.24).toFixed(2);
    }
    else if(inputTypeValue === 'NIS' && resultTypeValue === 'EUR'){
        converted.value = (Number(original.value) / 3.79).toFixed(2);
    }
    else if(inputTypeValue === 'USD' && resultTypeValue === 'NIS'){
        converted.value = (Number(original.value) * 3.24).toFixed(2);
    }
    else if (inputTypeValue === 'USD' && resultTypeValue === 'USD') {
        converted.value = Number(original.value)
    }
    else if(inputTypeValue === 'USD' && resultTypeValue === 'EUR'){
        converted.value = (Number(original.value) / 1.17).toFixed(2);
    }
    else if(inputTypeValue === 'EUR' && resultTypeValue === 'NIS'){
        converted.value = (Number(original.value) * 3.79).toFixed(2);
    }
    else if (inputTypeValue === 'EUR' && resultTypeValue === 'USD') {
        converted.value = (Number(original.value) * 1.17).toFixed(2)
    }
    else if(inputTypeValue === 'EUR' && resultTypeValue === 'EUR'){
        converted.value = Number(original.value)
    }

}

// making function that opens and closes the container of the currency converter
let openCurencyConverter = document.querySelectorAll('[data-modal-target]')
let closeCurencyConverter = document.querySelectorAll('[data-close-button]')
let overlay = document.getElementById('overlay')

openCurencyConverter.forEach(button =>{
    button.addEventListener('click', () =>{
        const conv = document.querySelector(button.dataset.modalTarget)
        openConv(conv)
    })
})


closeCurencyConverter.forEach(button =>{
    button.addEventListener('click', () =>{
        const conv = button.closest('.curencyConverter')
        original.value = null
        converted.value = null
        closeConv(conv)
    })
})


function openConv() {
    if(currencyConverter == null)
    return
    currencyConverter.classList.add('active')
    overlay.classList.add('active')
}


function closeConv() {
    if(currencyConverter == null)
    return
    currencyConverter.classList.remove('active')
    overlay.classList.remove('active')
}

// creating the calculation application.
// creating a constructor to call all the html elements and create the functions in them.
class calculatorfn{
    constructor(currentOperandText, previousOperandText) {
        this.currentOperandText = currentOperandText
        this.previousOperandText = previousOperandText
        this.clear()
        this.compute()
    }


    // this function is to clear the inputs 
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // this function is use to turn the input into string an remove the last input.
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // this function is created to append the number to the input feild 
    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.'))return     // it also limits the dicimal point input to one every number input
        this.currentOperand = this.currentOperand.toString() + number.toString()     // we turned the numbers into strings so that it adds a character instead of doing a logical operation.

    }

    // this function is used to choose operations
    ChooseOperation(operation){
        if(this.currentOperand === '') return     // if the input feild empty this function will not execute
        if(this.previousOperand !== ''){     // this function also updates the 2nd feild with the computed value if it was empty.

            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // this function is used to add the logical operations of the calculator
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation     // once the function is finished it will update the input feild with the answer and empty all other inputs.
        this.operation = undefined
        this.previousOperand = ''
    }

    // this function is used to display the inputs and outputs.
    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand
        if(this.operation != null){
            this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`
        }
        else{
            this.previousOperandText.innerText = ''
        }

    }
}
 
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous-Operand]')
const currentOperandText = document.querySelector('[data-current-Operand]')


// after the constructor is finished and all the functoions are written they are added to the event listeners below.
const calculatorFunction = new calculatorfn(currentOperandText, previousOperandText)

numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculatorFunction.appendNumber(button.innerText)
        calculatorFunction.updateDisplay()
    })
})


operationButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculatorFunction.ChooseOperation(button.innerText)
        calculatorFunction.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    calculatorFunction.compute()
    calculatorFunction.updateDisplay()
})

clearButton.addEventListener('click', button =>{
    calculatorFunction.clear()
    calculatorFunction.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculatorFunction.delete()
    calculatorFunction.updateDisplay()
})


// making a funtction that opens and closes the calculator
let openCalculator = document.querySelectorAll('[data-calc-target]');
let closeCalculator = document.querySelectorAll('[data-closeCalc-button]');
let preCalcInputFeild = document.getElementById('prevCalcInput');
let calcInputFeild = document.getElementById('calcInput');

openCalculator.forEach(button =>{
    button.addEventListener('click', () =>{
        const calc = document.querySelector(button.dataset.calcTarget)
        openCalc(calc)
    })
})

closeCalculator.forEach(button =>{
    button.addEventListener('click', () =>{
        const calc = button.closest('.calculator')
        closeCalc(calc)
        calculatorFunction.clear()
        calculatorFunction.updateDisplay()
    })
})

function openCalc(){
    if(calculator == null)
    return
    calculator.classList.add('active')
    overlay.classList.add('active')
}

function closeCalc(){
    if(calculator == null)
    return
    calculator.classList.remove('active')
    overlay.classList.remove('active')
}