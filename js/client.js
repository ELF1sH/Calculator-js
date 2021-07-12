import { RPN } from "./RPN.js"
const RPNalgo = new RPN()
const calcInput = document.getElementById("calc-input")
const btns = document.getElementsByClassName("btn-calc")
const Cbtn = document.getElementById("C-btn")

export function setBtnListeners() {
    for (const btn of btns) {
        btn.addEventListener("click", (event) => {
            const symbol = event.currentTarget.children[0].innerHTML
            if (symbol !== 'C' && symbol !== '=') {
                calcInput.value += symbol        
            }
            calcInput.focus()  // otherwise cursor doesn't follow symbols entering from btns
            calcLogic()
            inputSizeHandler()
        })
    }

    Cbtn.addEventListener("click", deleteLastSymbol)

    

    // delete all input by holding C button
    let timerID
    Cbtn.addEventListener("mousedown", (event) => {
        const symbol = event.currentTarget.children[0].innerHTML
        if (symbol === 'C') {
            timerID = setTimeout(clearInput, 500)
        }
    })
    Cbtn.addEventListener("mouseup", () => {
        clearTimeout(timerID)
    })


}

function clearInput() {
    calcInput.value = ""
}

function deleteLastSymbol() {
    calcInput.value = calcInput.value.substring(0, calcInput.value.length - 1)
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






function calcLogic(RPN) {   
    RPNalgo.inputAnalyze(calcInput.value)
    RPNalgo.getRPN()
    RPNalgo.calculating()
}
