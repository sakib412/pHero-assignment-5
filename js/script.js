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
    const v = Number(value);
    // if input value is less then 0 then show an error
    if (v < 0) {
        const toast = showToast("Please inpput a positive number to " + inputID);
        toast.show();
        return NaN;
    }

    return v;
}

// calculate expenses and balance
function calculate() {
    const income = getInputValue('income');
    const food = getInputValue('food');
    const rent = getInputValue('rent');
    const clothes = getInputValue('clothes');
    const totalExpenses = food + rent + clothes;
    console.log(totalExpenses.toString() == 'NaN')
    // if something went wrong with input then return the function, do nothing.         
    if (totalExpenses.toString() == 'NaN') {
        return;
    }

    const balance = income - totalExpenses;
    console.log(totalExpenses, balance)

}