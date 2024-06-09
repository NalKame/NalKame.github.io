function evaluateRPN(expression) {
    const stack = [];
    const tokens = expression.split(' ');

    tokens.forEach(token => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
                default:
                    throw new Error(`Unsupported operator: ${token}`);
            }
        }
    });

    if (stack.length !== 1) {
        throw new Error('Invalid RPN expression');
    }

    return stack.pop();
}

function rpnToInfix(expression) {
    const stack = [];
    const operators = new Set(['+', '-', '*', '/']);
    const tokens = expression.split(' ');

    tokens.forEach(token => {
        if (!operators.has(token)) {
            stack.push(token);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            const subExpr = `(${a} ${token} ${b})`;
            stack.push(subExpr);
        }
    });

    if (stack.length !== 1) {
        throw new Error('Invalid RPN expression');
    }

    return stack.pop();
}

function findSolution(flgOne,numbers,pAnswer) {
    const answer=pAnswer!==undefined?pAnswer:10;
    const operators = ['+', '-', '*', '/'];
    const results = [];

    function* generateExpressions(numbers, operators) {
        if (numbers.length === 1) {
            yield numbers[0];
        } else {
            for (let i = 0; i < numbers.length; i++) {
                for (let j = 0; j < numbers.length; j++) {
                    if (i !== j) {
                        const remainingNumbers = numbers.filter((_, index) => index !== i && index !== j);
                        for (const operator of operators) {
                            const newExpr = `${numbers[i]} ${numbers[j]} ${operator}`;
                            yield* generateExpressions([newExpr, ...remainingNumbers], operators);
                        }
                    }
                }
            }
        }
    }

    for (const expression of generateExpressions(numbers, operators)) {
        try {
            const result = evaluateRPN(expression);
            if (result === answer) {
                results.push({
                    rpn: expression,
                    infix: rpnToInfix(expression)
                });
                if(flgOne)return results;
            }
        } catch (e) {
            // 無効な式の場合は無視する
        }
    }

    return results;
}
function findSolutions(numbers,pAnswer){
    return findSolution(false,numbers,pAnswer);
}
function findOneSolution(numbers,pAnswer){
    return findSolution(true,numbers,pAnswer);
}

function generateQuestion(){
    const gen=function(){
        const random = Math.floor(Math.random()*10000);
        const numbers = ("0000"+random).slice(-4).split("");
        const solution = findOneSolution(numbers);
        const question = numbers.join(" ");
        return {question,solution};
    }
    let tmp;
    while(!tmp||!tmp.solution||tmp.solution.length===0){
        tmp=gen();
    }
    return {question:tmp.question,answer:tmp.solution[0].infix.replaceAll("*","×").replaceAll("/","÷")};
}

