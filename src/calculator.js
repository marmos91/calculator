const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');
const display = document.querySelector('.display');
let left_operator = 0;
let end = false;
let operator_pressed = false;
let operation = undefined;

function on_key_press(event)
{
    if(event.target.matches('button')) 
    {
        const key = event.target;
        const action = key.dataset.action;
        const number = key.textContent;

        if(!action)
            number_clicked(number);
        else
        {
            if(action === 'decimal')
                display.textContent = display.textContent + '.';
            else
                operator_clicked(action);
        }
    }
}

function number_clicked(number, action)
{
    if(display.textContent == '0' || operator_pressed || end)
    {
        display.textContent = number;
        end = false;
        operator_pressed = false;
    }
    else
        display.textContent = display.textContent + number;
}

function operator_clicked(action)
{
    if(action === 'calculate')
    {
        display.textContent = calculate(left_operator, operation, display.textContent);
        operator_pressed = false;
        end = true;
    }
    else if(action !== 'clear')
    {
        left_operator = display.textContent;
        operation = action;
        operator_pressed = true;
    }
    else
        clear_display();
}

function clear_display()
{
    left_operator = 0;
    operator_pressed = false;
    operation = undefined;
    display.textContent = '0';
}

function calculate(left_operator, operator, right_operator)
{
    let result = 0;

    if(operator === 'add')
        result = parseFloat(left_operator) + parseFloat(right_operator);
    else if(operator === 'subtract')
        result = parseFloat(left_operator) - parseFloat(right_operator);
    else if(operator === 'multiply')
        result = parseFloat(left_operator) * parseFloat(right_operator);
    else if(operator === 'divide')
        result = parseFloat(left_operator) / parseFloat(right_operator);

    return result;
}

keys.addEventListener('click', on_key_press);
