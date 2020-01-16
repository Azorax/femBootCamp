let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

const buttonClick = value => isNaN(value) ? processFunc(value) : processNum(value); // Identifies the type of button (num or function)

function processNum(num) {
    if (buffer === "0") {
        buffer = num;
    } else {
        buffer += num;
    }
    displayToScreen(buffer)
}

function processFunc(func) {
    //    console.log(runningTotal);

    switch (func) {
        case 'c':
            clear();
            break;

        case '=':
            doMaths(func);
            displayToScreen(runningTotal);
            break;

        case "←":
            if (previousOperator === "=") {runningTotal = 0}
            if (runningTotal) {break;}
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            displayToScreen(buffer);
            break;

        default:
            doMaths(func);
    }
}

function doMaths(func) {
    if (previousOperator) {

        const intBuffer = parseInt(buffer)

        switch (previousOperator) {
            case '+':
                runningTotal += intBuffer;
                break;
            case '−':
                runningTotal -= intBuffer;
                break;
            case '×':
                runningTotal *= intBuffer;
                break;
            case '÷':
                runningTotal /= intBuffer;
                break;
            case '=':
                if (func === "=") {
                    runningTotal = parseInt(buffer);
                }
                break;
            default:
                console.log("what's happening?")
        }
    } else {
        runningTotal = parseInt(buffer);
        console.log('first')
    }
    previousOperator = func;
    buffer = "0";
    console.log(runningTotal);


}

function clear() {
    runningTotal = 0;
    buffer = "0";
    let previousOperator;
    displayToScreen(buffer);
}

function displayToScreen(value) {
    document.querySelector('.screen').innerText = value
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        if (event.target.tagName === "BUTTON") { //Only takes in the value if you clicked on a button
            buttonClick(event.target.innerText);
        }
    })
}

init();