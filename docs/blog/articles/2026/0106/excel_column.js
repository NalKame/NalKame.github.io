class ExcelColumn{
    #number;
    constructor(number){
        if(typeof number !== 'number') throw new TypeError('引数は数値である必要があります');
        if(number<1) throw new RangeError('引数は1以上である必要があります');
        this.#number = number;
    }
    static numberToCode(number){
        if(typeof number !== 'number') throw new TypeError('引数は数値である必要があります');
        if(number<1) throw new RangeError('引数は1以上である必要があります');
        let code = '';
        while (number > 0) {
            number--; // 0始まりに調整
            code = String.fromCharCode(65 + (number % 26)) + code;
            number = Math.floor(number / 26);
        }
        return code;
    }
    static codeToNumber(code){
        if (typeof code !== 'string')  throw new TypeError('引数は文字列である必要があります');
        if (!/^[A-Z]+$/.test(code)) throw new Error('A〜Zの大文字アルファベットのみ使用できます');
        let num = 0;
        for (let i = 0; i < code.length; i++) {
            num = num * 26 + (code.charCodeAt(i) - 64);
        }
        return num;
    }
    static instance(arg){
        const number = (() => {
            if (typeof arg === 'string') {
                return ExcelColumn.codeToNumber(arg);
            }else if (typeof arg === 'number') {
                return arg;
            }else{
                throw new TypeError('引数は文字列または数値である必要があります');
            } 
        })();
        return new ExcelColumn(number);
    }
    getNumber(){
        return this.#number;
    }
    getCode(){
        return ExcelColumn.numberToCode(this.#number);
    }
}