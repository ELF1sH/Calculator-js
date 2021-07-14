import { RPN } from "./RPN.js"
const RPNalgo = new RPN()
const calcInput = document.getElementById("calc-input")
const btns = document.getElementsByClassName("btn-calc")
const Cbtn = document.getElementById("C-btn")

export function setBtnListeners() {
    let cursorPos = 0

    for (const btn of btns) {
        btn.addEventListener("click", (event) => {
            const symbol = event.currentTarget.children[0].innerHTML
            if (symbol !== 'C' && symbol !== '=') {
                if (calcInput.value.length !== 0 && isSymbolSign(symbol) && 
                isSymbolSign(calcInput.value[calcInput.value.length - 1])) {
                    deleteOneSymbol(cursorPos)
                    cursorPos--
                }
                calcInput.value = addSymbol(calcInput.value, symbol, cursorPos)
                cursorPos++
                calcInput.focus()
                calcInput.setSelectionRange(cursorPos, cursorPos) 
            }
            calcLogic()
            inputSizeHandler()
        })
    }

    // handling keyboard behavior
    calcInput.addEventListener("keydown", (event) => {
        calcLogic()
        inputSizeHandler()
        if (event.code === "Backspace") cursorPos--
        if (calcInput.length === 0) cursorPos = 0
        else cursorPos++
    })

    calcInput.addEventListener("click", (event) => {
        cursorPos = event.target.selectionStart
    })

    Cbtn.addEventListener("click", () => {
        deleteOneSymbol(cursorPos)
        if (cursorPos > 0) cursorPos--
        calcInput.focus()
        calcInput.setSelectionRange(cursorPos, cursorPos) 
        calcLogic()
        inputSizeHandler()
    })

    

    // delete all input by holding C button
    let timerID
    Cbtn.addEventListener("mousedown", (event) => {
        const symbol = event.currentTarget.children[0].innerHTML
        if (symbol === 'C') {
            timerID = setTimeout(() => {
                clearInput()
                cursorPos = 0
            }, 500)
        }
    })
    Cbtn.addEventListener("mouseup", () => {
        clearTimeout(timerID)
    })
}


function clearInput() {
    calcInput.value = ""
}

function deleteOneSymbol(index) {
    const value = calcInput.value
    if (index - calcInput.value.length === 1) {
        calcInput.value = value.substring(0, index - 2) + value.substring(index - 1, value.length)
    }
    else {
        calcInput.value = value.substring(0, index - 1) + value.substring(index, value.length)
    }
}

function inputSizeHandler() {
    if (calcInput.value.length > 16) {
        calcInput.style.fontSize = "1.5rem"
    }
    else if (calcInput.value.length > 10) {
        calcInput.style.fontSize = "2rem"
    }
    else {
        calcInput.style.fontSize = "3rem"
    }
}

function addSymbol(string, symbol, index) {
    return string.substring(0, index) + symbol + string.substring(index, string.length)
}

function isSymbolSign(symbol) {
    if (symbol === "+" || symbol === "-" || symbol === "×" || symbol === "÷")
        return true
    else 
        return false
}




function calcLogic() {   
    RPNalgo.inputAnalyze(calcInput.value)
    RPNalgo.getRPN()
    RPNalgo.calculating()
}
