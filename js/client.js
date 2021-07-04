import { RPM } from "./RPM.js"
const RPMalgo = new RPM()
const calcInput = document.getElementById("calc-input")
const btns = document.getElementsByClassName("btn-calc")

export function setBtnListeners() {
    for (const btn of btns) {
        btn.addEventListener("click", (event) => {
            const symbol = event.currentTarget.children[0].innerHTML
            if (symbol !== 'C' && symbol !== '=') {
                calcInput.value += symbol
                calcLogic()
            }
            else if (symbol == 'C') {
                calcInput.value = ""
            }
        })
    }
}

function calcLogic(RPM) {   
    RPMalgo.launch(calcInput.value)
}