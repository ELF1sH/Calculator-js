import { RPN } from "./RPN.js"
const RPNalgo = new RPN()
const calcInput = document.getElementById("calc-input")
const btns = document.getElementsByClassName("btn-calc")

export function setBtnListeners() {
    for (const btn of btns) {
        btn.addEventListener("click", (event) => {
            const symbol = event.currentTarget.children[0].innerHTML
            if (symbol !== 'C' && symbol !== '=') {
                calcInput.value += symbol
                calcInput.focus()  // otherwise cursor doesn't follow symbols from btns
                calcLogic()
            }
            else if (symbol == 'C') {
                calcInput.value = ""
            }
        })
    }
}

function calcLogic(RPN) {   
    RPNalgo.launch(calcInput.value)
}