import { printAnswerInArea, clearAnswerArea } from "./client.js"

// Reverse Polish Notation
export class RPN {
    elemArray
    RPN
    inputAnalyze(inputValue) {
        this.elemArray = []
        this.RPN = []
        
        let elemArray = new Array()
        let currentNumber = ""
        for (let index = 0; index < inputValue.length; index++) {
            const symbol = inputValue[index]
            if (symbol !== "+" && symbol !== "-" && symbol !== "×" && symbol !== "÷"
            && symbol !== "(" && symbol !== ")") {
                currentNumber += symbol
            }
            else {
                if (currentNumber !== "") {
                    if (elemArray.length > 0 && elemArray[elemArray.length - 1].status === 5) {
                        // add multiplication sign
                        elemArray.push(new Sign(2))
                    }    
                    elemArray.push(+currentNumber)
                    currentNumber = ""
                }
                switch (symbol) {
                    case "+":
                        elemArray.push(new Sign(0))
                        break
                    case "-":
                        if (index === 0 && isSymbolDigit(inputValue[index + 1])) {
                            currentNumber += "-"
                        }
                        else if (index !== 0 && 
                            !isSymbolDigit(inputValue[index - 1]) && 
                            inputValue[index - 1] !== ")" && 
                            isSymbolDigit(inputValue[index + 1])) {
                                currentNumber += "-"
                        }
                        else {
                            elemArray.push(new Sign(1))
                        }
                        break
                    case "×":
                        elemArray.push(new Sign(2))
                        break
                    case "÷":
                        elemArray.push(new Sign(3))
                        break
                    case "(":
                        if (elemArray.length > 0 && typeof elemArray[elemArray.length - 1] === "number") {
                            // add multiplication sign
                            elemArray.push(new Sign(2))
                        }
                        if (elemArray.length > 0 && elemArray[elemArray.length - 1].status === 5) {
                            // add multiplication sign
                            elemArray.push(new Sign(2))
                        }
                        elemArray.push(new Sign(4))
                        break
                    case ")":
                        elemArray.push(new Sign(5))
                        break
                }
            }
        }
        if (currentNumber !== "") {
            if (elemArray.length > 0 && elemArray[elemArray.length - 1].status === 5) {
                // add multiplication sign
                elemArray.push(new Sign(2))
            }  
            elemArray.push(+currentNumber)
        }

        this.elemArray = elemArray  // updating private variable 
    }

    getRPN() {
        // elemArray is just an array of elements in expression
        // now we need to get RPN from this expression
        const s = new Stack()
        let RPN = new Array()
        for (const elem of this.elemArray) {
            if (typeof elem === "number") {
                RPN.push(elem)
            }
            else {
                if (s.isEmpty()) {
                    s.push(elem)
                }
                else {
                    if (elem.status === 4) {
                        s.push(elem)
                    }
                    else if (elem.status === 5) {
                        while (s.getLast().status !== 4) {
                            RPN.push(s.getLast())
                            s.pop()
                            if (s.isEmpty()) return
                        }
                        s.pop() // removing opening bracket
                    }
                    else if (s.getLast().status == 4 || s.getLast().status == 5) {
                        s.push(elem)
                    }
                    else {
                        let currentSignPriority
                        if (elem.status === 0 || elem.status === 1) currentSignPriority = 0
                        else currentSignPriority = 1

                        let lastSignPriority 
                        let lastSign = s.getLast()
                        if (lastSign.status === 0 || lastSign.status === 1) lastSignPriority = 0
                        else lastSignPriority = 1

                        while (currentSignPriority <= lastSignPriority) {
                            RPN.push(lastSign)
                            s.pop()
                            
                            if (s.isEmpty() || s.getLast().status === 4 || s.getLast().status === 5) break
                            lastSign = s.getLast()
                            if (lastSign.status === 0 || lastSign.status === 1) lastSignPriority = 0
                            else lastSignPriority = 1
                        }

                        s.push(elem)
                    }
                }
            }
        }
        // adding the rest of the signs (if it's needed)
        while (!s.isEmpty()) {
            RPN.push(s.getLast())
            s.pop()
        }

        this.RPN = RPN
    }


    calculating() {
        let isExpressionBad = false
        
        // checking for obvious errors in RPN
        for (let index = 0; index < this.RPN.length; index++) {
            const item = this.RPN[index]
            if (typeof item !== "number" && (item.status === 4 || item.status === 5)) {
                isExpressionBad = true
                break
            }
            if ((index === 1 || index === 0) && typeof item !== "number") {
                isExpressionBad = true
                break
            }
        }

        // calculating cycle
        while (true) {
            if (this.RPN.length < 2) break

            if (typeof this.RPN[0] !== "number" || typeof this.RPN[1] !== "number") {
                isExpressionBad = true
                break
            }

            for (let i = 0; i < this.RPN.length; i++) {
                if (typeof this.RPN[i] !== "number") {
                    const status = this.RPN[i].status
                    let answer
                    switch (status) {
                        case 0:
                            answer = this.RPN[i - 2] + this.RPN[i - 1]
                            break
                        case 1:
                            answer = this.RPN[i - 2] - this.RPN[i - 1]
                            break
                        case 2:
                            answer = this.RPN[i - 2] * this.RPN[i - 1]
                            break
                        case 3:
                            answer = this.RPN[i - 2] / this.RPN[i - 1]
                            break
                    }
                    this.RPN.splice(i - 2, 3, answer)
                    break
                }
            }   
        }
        clearAnswerArea()

        if (!isExpressionBad && !isNaN(this.RPN[0])) {
            printAnswerInArea(this.RPN[0])
        }
        else {
            clearAnswerArea()
        }
    }
}


function isSymbolDigit(symbol) {
    if (symbol == "0" || symbol == "1" || symbol == "2" || symbol == "3" || symbol == "4" ||
        symbol == "5" || symbol == "6" || symbol == "7" || symbol == "8" || symbol == "9") {
            return true
    }
    else return false
}


class Stack {
    arr = new Array()
    push(elem) {
        this.arr.push(elem)
    }
    print() {
        for (const elem of this.arr) {
            console.log(elem)
        }
    }
    isEmpty() {
        if (this.arr.length === 0) return true
        else return false
    }
    getLast() {
        if (this.arr.length !== 0) return this.arr[this.arr.length - 1]
        return null
    }
    pop() {
        this.arr.pop()
    }
}

class Sign {
    constructor(status) {
        this.status = status
        // 0 - plus
        // 1 - minus
        // 2 - multiplication
        // 3 - division
        // 4 - opening bracket
        // 5 - closing bracket
    }
}