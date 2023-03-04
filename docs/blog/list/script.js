/* /blog/articles/index.html 専用 */
class Pages{
    static #divideArray=function(array,numInPage){
        const ret=[];
        const MAX_LOOP=100000;//無限ループ回避
        const isEnd=function(num){return num>=array.length || num>MAX_LOOP;}
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
        if(i>MAX_LOOP)throw new Error('無限ループの可能性があります。');
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
        this.setNow(this.#now);//範囲外のとき修正
    }
    setNow(pvNow){
        let now=pvNow;
        if(now<this.#first)now=this.#first;
        if(now>this.#last)now=this.#last;
        this.#now=now;
    }
    getDisplayPageNum(){
        //ページ数表示
        return this.#now+'/'+this.#last;
    }
    prev(){
        let now=this.#now;
        now--;
        this.setNow(now);
        return this;
    }
    next(){
        let now=this.#now;
        now++;
        this.setNow(now);
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
    static #PAGE_NUM_PARAM='page';
    static getPageNum(){
        //page番号を取得
        return common.getURLSearchParamValue(Pages.#PAGE_NUM_PARAM);
    }
    gotoPage(){
        const params=new URLSearchParams();
        params.append(Pages.#PAGE_NUM_PARAM,this.#now);
        window.location.href='./?'+params.toString();
    }
}