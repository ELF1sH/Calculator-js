import { RPN } from "./RPN.js"
import { fullErasureAnimation, oneSymbolErasureAnimation } from "./animations.js"
import { addItem } from "./history.js"
const RPNalgo = new RPN()
const calcInput = document.getElementById("calc-input")
const btns = document.getElementsByClassName("btn-calc")
const Cbtn = document.getElementById("C-btn")
const answerSpan = document.getElementById("answer-span")
const underInput = document.getElementById("under-input")

let cursorPos = 0
let wasError = false

export function setBtnListeners() {
    for (const btn of btns) {
        btn.addEventListener("click", (event) => {
            if (wasError) {
                clearInput()
                wasError = false
            }
            const symbol = event.currentTarget.children[0].innerHTML
            if (symbol !== 'C' && symbol !== '=') {
                if (calcInput.value.length !== 0 && isSymbolSign(symbol) && 
                isSymbolSign(calcInput.value[calcInput.value.length - 1])) {
                    deleteOneSymbol(cursorPos)
                }
                calcInput.value = addSymbol(calcInput.value, symbol, cursorPos, true)
                underInput.innerText = addSymbol(underInput.innerText, symbol, cursorPos, false)
                calcInput.focus()
                calcInput.setSelectionRange(cursorPos, cursorPos) 

                calcLogic() 
            }
            if (symbol === "=") {
                getResultHandler()
            }   
            inputSizeHandler()
        })
    }


    // handling keyboard behavior
    calcInput.addEventListener("keyup", (event) => {
        if (event.key === "=") {
            getResultHandler()
        }
        else if (event.key === "Backspace") {
            if (calcInput.value.length === 0) return
        
            deleteOneSymbol(cursorPos)
            calcInput.focus()
            calcInput.setSelectionRange(cursorPos, cursorPos) 
            calcLogic()
            inputSizeHandler()
            oneSymbolErasureAnimation()
        }
        else {
            cursorPos = calcInput.value.length
            calcLogic()
            inputSizeHandler()
            if (cursorPos < 0) cursorPos = 0
        }
    })
    calcInput.addEventListener("keydown", event => {
        if (!isSymbolDigit(event.key) && event.key !== "+" && event.key !== "-" && 
        event.key !== "*" && event.key !== "/" && event.key !== "(" && event.key !== ")"  && event.key !== ".") {
            event.preventDefault()
        }
        else if (event.key === "*") {
            event.preventDefault()
            calcInput.value = addSymbol(calcInput.value, "×", cursorPos, true)
            underInput.innerText = addSymbol(underInput.innerText, "×", cursorPos, false)
            calcInput.focus()
            calcInput.setSelectionRange(cursorPos, cursorPos) 
            cursorPos++
        }
        else if (event.key === "/") {
            event.preventDefault()
            calcInput.value = addSymbol(calcInput.value, "÷", cursorPos, true)
            underInput.innerText = addSymbol(underInput.innerText, "÷", cursorPos, false)
            calcInput.focus()
            calcInput.setSelectionRange(cursorPos, cursorPos) 
            cursorPos++
        }
        else {
            const symbol = event.key
            console.log(symbol)
            underInput.innerText = addSymbol(underInput.innerText, symbol, cursorPos, true)
            calcInput.focus()
            calcInput.setSelectionRange(cursorPos, cursorPos) 
            cursorPos++
        }
    })



    // handling clicking on input by setting cursorPos 
    calcInput.addEventListener("click", (event) => {
        cursorPos = event.target.selectionStart 
    })


    // listener for deleting only one symbol
    Cbtn.addEventListener("click", () => {
        if (calcInput.value.length === 0) return
        
        deleteOneSymbol(cursorPos)
        calcInput.focus()
        calcInput.setSelectionRange(cursorPos, cursorPos) 
        calcLogic()
        inputSizeHandler()
        oneSymbolErasureAnimation()
    })

    
    // delete all input by holding C button
    let timerID
    Cbtn.addEventListener("mousedown", (event) => {
        const symbol = event.currentTarget.children[0].innerHTML
        let timeDelay 
        if (symbol === 'C') {
            timerID = setTimeout(() => {
                timeDelay = fullErasureAnimation()
                setTimeout(() => {
                    clearInput()
                    cursorPos = 0
                }, timeDelay * 0.4)
            }, 500)
        }
    })
    Cbtn.addEventListener("mouseup", () => {
        clearTimeout(timerID)
    })
}


function clearInput() {
    calcInput.value = ""
    answerSpan.innerHTML = ""
    underInput.innerText = ""
}

function deleteOneSymbol(index) {
    const value = calcInput.value
    if (index - calcInput.value.length === 1) {
        calcInput.value = value.substring(0, index - 2) + value.substring(index - 1, value.length)
    }
    else {
        calcInput.value = value.substring(0, index - 1) + value.substring(index, value.length)
    }
    if (cursorPos > 0) cursorPos--
}

function inputSizeHandler() {
    if (calcInput.value.length > 16) {
        calcInput.style.fontSize = "1.5rem"
        underInput.style.fontSize = "1.5rem"
        underInput.style.top = "36px"
    }
    else if (calcInput.value.length > 10) {
        calcInput.style.fontSize = "2rem"
        underInput.style.fontSize = "2rem"
        underInput.style.top = "30px"
    }
    else {
        calcInput.style.fontSize = "3rem"
        underInput.style.fontSize = "3rem"
        underInput.style.top = "21px"
    }
}

function addSymbol(string, symbol, index, isInput) {
    if (isInput) cursorPos++
    return string.substring(0, index) + symbol + string.substring(index, string.length)
}

function isSymbolSign(symbol) {
    if (symbol === "+" || symbol === "-" || symbol === "×" || symbol === "÷")
        return true
    else 
        return false
}

function isSymbolDigit(symbol) {
    if (symbol == "0" || symbol == "1" || symbol == "2" || symbol == "3" || symbol == "4"
        || symbol == "5" || symbol == "6" || symbol == "7" || symbol == "8" || symbol == "9") {
        return true
    }
    else return false
}

function getResultHandler() {
    if (!answerSpan.innerHTML && calcInput.value.length > 0) {
        calcInput.value = "BAD EXPRESSION"
        underInput.innerHTML = ""
        clearAnswerArea()
        wasError = true
        inputSizeHandler()
    }
    else if (answerSpan.innerHTML) {
        addItem(calcInput.value, answerSpan.innerHTML)

        calcInput.value = answerSpan.innerHTML
        underInput.innerText = answerSpan.innerText
        clearAnswerArea()
        cursorPos = calcInput.value.length
        calcInput.focus()
        calcInput.setSelectionRange(cursorPos, cursorPos)
        inputSizeHandler()
    }
}



function calcLogic() {   
    RPNalgo.inputAnalyze(calcInput.value)
    if (calcInput.value.length > 0) {
        RPNalgo.getRPN()
        RPNalgo.calculating()
    }
    else {
        clearAnswerArea()
    }
}



export function printAnswerInArea(answer) {
    answerSpan.innerHTML = answer
}

export function clearAnswerArea() {
    answerSpan.innerHTML = ""
}