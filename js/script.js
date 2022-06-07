// show toast with custom message 
function showToast(message) {
    // set message first 
    document.getElementById('toast-msg').innerText = message;
    const toastEl = document.querySelector('.toast');
    return new bootstrap.Toast(toastEl);
}

// get input value function
function getInputValue(inputID) {
    const value = document.getElementById(inputID).value;
    // if user input nothing then return 0
    if (value == '') {
        return 0;
    }

    // check if this a number
    if (isNaN(value)) {
        const toast = showToast("Please inpput a number to " + inputID);
        toast.show();
    }
    const numberedValue = Number(value);
    // if input value is less then 0 then show an error
    if (numberedValue < 0) {
        const toast = showToast("Please inpput a positive number to " + inputID);
        toast.show();
        return NaN;
    }

    return numberedValue;
}


// set element text 
function setTextToElement(elID, text) {
    document.getElementById(elID).innerText = text;
}

// calculate expenses and balance
function calculate() {
    const income = getInputValue('income');
    const food = getInputValue('food');
    const rent = getInputValue('rent');
    const clothes = getInputValue('clothes');
    const totalExpenses = food + rent + clothes;
    // if something went wrong with input then return the function, do nothing.         
    if (totalExpenses.toString() == 'NaN' || income.toString() == 'NaN') {
        return;
    }

    // Check if expenses bigger than income then show an error
    if (totalExpenses > income) {
        const toast = showToast("Your expenses is bigger than income, please try to reduce expenses or income more");
        toast.show();
        return;
    }

    const balance = income - totalExpenses;
    setTextToElement('total-expenses', totalExpenses);
    setTextToElement('balance', balance);
}

// when click save button
document.getElementById('save-button').addEventListener('click', function () {
    const percentage = getInputValue('save-input');
    const income = getInputValue('income');
    const balance = Number(document.getElementById('balance').innerText);
    // if something went wrong with input then return the function, do nothing.         
    if (percentage.toString() == 'NaN' ||
        balance.toString() == 'NaN' ||
        income.toString() == 'NaN') {
        return;
    }
    if (percentage > 100) {
        const toast = showToast("Please input 100 or less.");
        toast.show();
        return;
    }

    const savingAmount = (income * percentage) / 100;
    setTextToElement('saving-amount', savingAmount);
    // show error if saving amoun is bigger than balance
    if (savingAmount > balance) {
        const toast = showToast("You don't have much money to save.");
        toast.show();
        return;
    }
    const remainingBalance = balance - savingAmount;
    setTextToElement('remaining-balance', remainingBalance);
})