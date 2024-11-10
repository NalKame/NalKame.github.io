class MahjongChinnitsu{
    constructor(array){
        this.array=array;
    }
    static instance(nums){
        if(typeof nums!=="string")throw new Error();
        if(nums.match(/[^1-9]+/g)!==null)throw new Error();
        const aryNums=nums.split("");
        let iArray=Array(9);
        iArray.fill(0);
        for(const num of aryNums){
            iArray[Number.parseInt(num)-1]++;
        }
        return new MahjongChinnitsu(iArray);
    }
    judgeAgari(pArray){
        let ret=[];
        if(pArray===undefined)pArray=this.array;
        if(pArray.filter(t=>(t>4)).length!==0)return ret;//4枚越えがあればそのまま返す
        const n=pArray.reduce((sum, el) => sum + el, 0);
        if(n>14)return ret;//14枚超えはそのまま返す
        if(n===0){//0のときは空の配列を入れて返す
            ret.push([]);
            return ret;
        }
        let hasAtama;
        switch(n%3){
            case 0:
                hasAtama=false;
                break;
            case 1:
                return ret;
            case 2:
                if(pArray.filter(el=>el>=2).length===0)return ret;
                hasAtama=true;
                break;
        }
        const target=(function(){
            let idx=0;
            let maisu;
            for(const el of pArray){
                if(el<0)throw new Error();
                if(el>0){
                    maisu=el;
                    break;
                }
                idx++;
            }
            return {idx,maisu};
        })();
        if(hasAtama&&target.maisu>=2){//toitsu
            const strToitsu=String(target.idx+1)+String(target.idx+1);
            const newArray=pArray.concat();
            newArray[target.idx]-=2;
            const tmpRet=this.judgeAgari(newArray);
            for(const tmp of tmpRet){
                tmp.push(strToitsu);
                ret.push(tmp);
            }
        }
        if(target.maisu>=3){//kotsu
            const strKotsu=String(target.idx+1)+String(target.idx+1)+String(target.idx+1);
            const newArray=pArray.concat();
            newArray[target.idx]-=3;
            const tmpRet=this.judgeAgari(newArray);
            for(const tmp of tmpRet){
                tmp.push(strKotsu);
                ret.push(tmp);
            }
        }
        if(target.idx+2<pArray.length&&pArray[target.idx+1]>0&&pArray[target.idx+2]>0){//shuntsu
            const strShuntsu=String(target.idx+1)+String(target.idx+2)+String(target.idx+3);
            const newArray=pArray.concat();
            newArray[target.idx]--;
            newArray[target.idx+1]--;
            newArray[target.idx+2]--;
            const tmpRet=this.judgeAgari(newArray);
            for(const tmp of tmpRet){
                tmp.push(strShuntsu);
                ret.push(tmp);
            }
        }
        {//並べ替えと重複削除      
            ret.map(el=>el.sort());
            ret=ret.map(el=>el.join(","));
            ret=Array.from(new Set(ret));
            ret=ret.map(el=>el.split(","));
        }
        return ret;
    }
    isAgari(pArray){
        if(pArray===undefined)pArray=this.array;
        return this.judgeAgari(pArray).length!==0;
    }
    judgeTempai(){
        let ret=[];
        for(let i=0;i<9;i++){
            const tmpArray=this.array.concat();
            tmpArray[i]++;
            if(this.isAgari(tmpArray)){
                ret.push(i+1);
            }
        }
        return ret;
    }
    isTempai(){
        return this.judgeTempai().length!==0;
    }
}
class MahjongZihai{
    constructor(array){
        this.array=array;
    }
    static instance(nums){
        if(typeof nums!=="string")throw new Error();
        if(nums.match(/[^1-7]+/g)!==null)throw new Error();
        const aryNums=nums.split("");
        let iArray=Array(7);
        iArray.fill(0);
        for(const num of aryNums){
            iArray[Number.parseInt(num)-1]++;
        }
        return new MahjongZihai(iArray);
    }
    judgeAgari(pArray){
        let ret=[];
        if(pArray===undefined)pArray=this.array;
        if(pArray.filter(t=>(t>4)).length!==0)return ret;//4枚越えがあればそのまま返す
        const n=pArray.reduce((sum, el) => sum + el, 0);
        if(n>14)return ret;//14枚超えはそのまま返す
        if(n===0){//0のときは空の配列を入れて返す。
            ret.push([]);
            return ret;
        }
        let hasAtama;
        switch(n%3){
            case 0:
                hasAtama=false;
                break;
            case 1:
                return ret;
            case 2:
                if(pArray.filter(el=>el>=2).length===0)return ret;
                hasAtama=true;
                break;
        }
        const target=(function(){
            let idx=0;
            let maisu;
            for(const el of pArray){
                if(el<0)throw new Error();
                if(el>0){
                    maisu=el;
                    break;
                }
                idx++;
            }
            return {idx,maisu};
        })();
        if(hasAtama&&target.maisu>=2){//toitsu
            const strToitsu=String(target.idx+1)+String(target.idx+1);
            const newArray=pArray.concat();
            newArray[target.idx]-=2;
            const tmpRet=this.judgeAgari(newArray);
            for(const tmp of tmpRet){
                tmp.push(strToitsu);
                ret.push(tmp);
            }
        }
        if(target.maisu>=3){//kotsu
            const strKotsu=String(target.idx+1)+String(target.idx+1)+String(target.idx+1);
            const newArray=pArray.concat();
            newArray[target.idx]-=3;
            const tmpRet=this.judgeAgari(newArray);
            for(const tmp of tmpRet){
                tmp.push(strKotsu);
                ret.push(tmp);
            }
        }
        {//並べ替えだけでよい         
            ret.map(el=>el.sort());
            // ret=ret.map(el=>el.join(","));
            // ret=Array.from(new Set(ret));
            // ret=ret.map(el=>el.split(","));
        }
        return ret;
    }
    isAgari(pArray){
        if(pArray===undefined)pArray=this.array;
        return this.judgeAgari(pArray).length!==0;
    }
    judgeTempai(){
        let ret=[];
        for(let i=0;i<7;i++){
            const tmpArray=this.array.concat();
            tmpArray[i]++;
            if(this.isAgari(tmpArray)){
                ret.push(i+1);
            }
        }
        return ret;
    }
    isTempai(){
        return this.judgeTempai().length!==0;
    }
}