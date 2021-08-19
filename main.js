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

// making a funtction that opens and closes the calculator
let openCalculator = document.querySelectorAll('[data-calc-target]');
let closeCalculator = document.querySelectorAll('[data-closeCalc-button]');
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
    calcInputFeild.value = null
    calculator.classList.remove('active')
    overlay.classList.remove('active')
}