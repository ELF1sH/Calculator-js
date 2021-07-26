const iconSidePanel = document.getElementById("icon-side-panel")
const iconWrapper = document.getElementById("icon-wrapper")
const sidePanel = document.getElementById("side-panel-wrapper")
const examplesList = document.getElementById("examples-list")
const emptyMessage = document.getElementById("empty-message")

export class calcHistory {
    isOpened = false

    init() {
        this.btnListener()
    }

    btnListener() {
        if (!this.isOpened) {
            iconSidePanel.addEventListener("click", () => {
                const timeLength = 500   // ms
                if (!this.isOpened) {
                    sidePanel.style.animation = `sidebarMovingLeft ${timeLength / 1000}s ease forwards`
                    iconWrapper.style.animation = `btnMovingLeft ${timeLength / 1000}s ease forwards`
                    this.isOpened = true
                }
                else {
                    sidePanel.style.animation = `sidebarMovingRight ${timeLength / 1000}s ease forwards`
                    iconWrapper.style.animation = `btnMovingRight ${timeLength / 1000}s ease forwards`
                    this.isOpened = false
                }
            })
        }
    }
}

let itemsNumber = 0
export function addItem(mainBody, answer) {
    if (itemsNumber === 0) emptyMessage.remove()
    if (itemsNumber > 0) addSeparator()
    itemsNumber++
    const editedMainBody = addSpacesBySigns(mainBody)
    examplesList.insertAdjacentHTML(
        "beforeend",
        `<p class="item">
            <span class="main-body">${editedMainBody}</span>
            <span class="equal">=</span>
            <span class="answer">${answer}</span>
        </p>`
    )
}

function addSeparator() {
    examplesList.insertAdjacentHTML("beforeend", `<div class="separator"></div>`)
}

function addSpacesBySigns(expression) {
    let newExpression = ""
    for (const symbol of expression) {
        if (symbol !== "+" && symbol !== "-" && symbol !== "×" && symbol !== "÷") {
            newExpression += symbol
        }
        else {
            newExpression += ` ${symbol} `
        }
    }
    return newExpression
}