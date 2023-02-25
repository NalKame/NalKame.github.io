/* /blog/articles/index.html 専用 */
class Pages{
    static #divideArray=function(array,numInPage){
        const ret=[];
        const isEnd=function(num){return num>=array.length;}
        let i=0;
        while(!isEnd(i)){
            const page=[];
            for(let j=0;j<numInPage;j++){
                page.push(array[i]);
                i++;
                if(isEnd(i))break;
            }
            ret.push(page);
        }
        return ret;
    }
    #pages;
    #now;
    #first=1;
    #last;
    constructor(array,numInPage,now){
        if(array.length===0)throw new Error('arrayに要素がありません');
        this.#pages=Pages.#divideArray(array,numInPage);
        this.#now=now?now:this.#first;
        this.#last=this.#pages.length;
    }
    prev(){
        let num=this.#now;
        num--;
        if(num<this.#first)num=this.#first;
        this.#now=num;
        return this;
    }
    next(){
        let num=this.#now;
        num++;
        if(num>this.#last)num=this.#last;
        this.#now=num;
        return this;
    }
    first(){
        this.#now=this.#first;
        return this;
    }
    last(){
        this.#now=this.#last;
        return this;
    }
    getArrayInPage(){
        return this.#pages[this.#now-this.#first];
    }
}