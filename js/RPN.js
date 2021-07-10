// Reverse Polish Notation
export class RPN {
    launch(inputValue) {
        let isExpressionBad = false

        let elemArray = new Array()
        let currentNumber = ""
        for (const symbol of inputValue) {
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
                        elemArray.push(new Sign(1))
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
        // elemArray is just an array of elements in expression
        // now we need to get RPN from this expression


        // main algorithm
        const s = new Stack()
        let RPN = new Array()
        for (const elem of elemArray) {
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
                            if (s.isEmpty()) {
                                isExpressionBad = true
                                console.log("bad")
                                return
                            }
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
        // end of the cycle

        // adding the rest of the signs (if it's needed)
        while (!s.isEmpty()) {
            RPN.push(s.getLast())
            s.pop()
        }

        for (const elem of RPN) {
            console.log(elem)
        }
        console.log("------------------")
    }
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