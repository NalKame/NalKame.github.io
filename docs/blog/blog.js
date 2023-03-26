const blog={
    version:'0',
    articlesUrl:'/blog/articles/',
    getDebugMode:function(){
        if(typeof debugMode==='undefined'){
            console.error('debugMode not exists');
            return {
                isDebug:function(){return false;}
            }
        }
        return debugMode;
    },
    utils:{
        includesEvery:function(parent,child){
            return child.every(el=>parent.includes(el));
        },
        includesSome:function(parent,child){
            return child.some(el=>parent.includes(el));
        },
        convertTextToArray:function(text){
            const separator =/[\s\uFEFF\xA0]+/;
            return text.split(separator).filter(s=>!!s);//分割後、空文字の要素を削除
        },
        zeroPadStart:function(val,len){
            return String(val).padStart(len,'0');
        }
    }
}
blog.article=function(id,title,dates,tags){
    const articleDateFormat={
        regexp:/^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
        separator:'/',
        split:function(date){
            const ary=date.split(this.separator);
            return {
                year:Number(ary[0]),
                month:Number(ary[1]),
                day:Number(ary[2])
            }
        },
        display:function(date){
            const splited=this.split(date);
            return `${splited.year}年${splited.month}月${splited.day}日`;
        },
        format:function(year,month,day){
            let ret=year+this.separator;
            if(month){
                ret+=blog.utils.zeroPadStart(month,2)+this.separator;
            }else{
                return ret;
            }
            if(day){
                ret+=blog.utils.zeroPadStart(day,2);
            }
            return ret;
        }
    }
    class Article{
        #id;
        #title;
        #dates;
        #tags;
        constructor(id,title,dates,tags){
            this.#id=id;//フォルダ名としてurlに使用
            this.#title=title;
            this.#dates=dates;//['yyyy/mm/dd'] 作成日をいれ、更新日を追加していく
            this.#tags=tags;//tagの配列
            if(blog.getDebugMode().isDebug()){
                this.validateDates();
            }
        }
        validateDates(){
            const regex = articleDateFormat.regexp;
            for(const date of this.#dates){
                if(!regex.test(date)){
                    console.error('date format error');
                    console.log(this);
                }
            }
        }
        titleIncludes(array){
            return blog.utils.includesEvery(this.#title,array);
        }
        hasTags(array){
            return blog.utils.includesEvery(this.#tags,array);
        }
        isId(id){
            return this.#id===id;
        }
        getUrl(){
            return blog.articlesUrl+this.#id+'/';
        }
        getTitle(){
            return this.#title;
        }
        getTags(){
            return this.#tags;
        }
        getCreatedDate(){
            return this.#dates[0];//最初の要素が作成日
        }
        isCreatedDate(year,month,day){
            return this.getCreatedDate().startsWith(articleDateFormat.format(year,month,day));
        }
        displayCreatedDate(){
            return articleDateFormat.display(this.getCreatedDate());
        }
        getLastModifiedDate(){
            return this.#dates[this.#dates.length-1];//最後の要素が最終更新日
        }
        displayLastModifiedDate(){
            return articleDateFormat.display(this.getLastModifiedDate());
        }
        createLinkElement(){
            const $a=document.createElement('a');
            $a.href=this.getUrl();
            $a.innerText=this.#title;
            return $a;
        }
    }
    return new Article(id,title,dates,tags);
}

blog.wrapArticles=function(arrayArticles){
    class Articles{
        #arrayArticles;
        constructor(arrayArticles){
            this.#arrayArticles=arrayArticles;
        }
        getArrayArticles(){return this.#arrayArticles;}
        searchTitle(text){
            const array=blog.utils.convertTextToArray(text);
            this.#arrayArticles=this.#arrayArticles.filter(v=>v.titleIncludes(array));
            return this;
        }
        searchTags(text){
            const array=blog.utils.convertTextToArray(text);
            this.#arrayArticles=this.#arrayArticles.filter(v=>v.hasTags(array));
            return this;
        }
        getById(id){
            return this.#arrayArticles.find(v=>v.isId(id));
        }
        getNewArticle(){
            //通常の表示で最新が先に並ぶようにするため最初の要素が最新
            return this.#arrayArticles[0];
        }
    }
    return new Articles(arrayArticles);
}

blog.getThisPageAritcle=function(){
    //記事ページの中で呼び出すとそのページのArticleを取得する
    /*全検索するので重くなったら、
    ページ開く前にsessionStorage保存などを検討する */
    const pathname=window.location.pathname;
    const article_id=pathname.replaceAll(blog.articlesUrl,'').replaceAll('index.html','').slice(0,-1);
    const article=blog.getAllArticles().getById(article_id);
    if(!debugMode?.isDebug()||article){
        //debugでないかarticleが存在すればarticleを返す
        return article;
    }else{
        //debug時でarticleが見つからない場合はdebugのものを返す
        return blog.getAllArticles().getById('debug');
    }
}

blog.getTagSearchUrl=function(tag){
    const params=new URLSearchParams();
    params.append('tag',tag);//nameはsearchページと合わせる
    return '/blog/search/?'+params.toString();
}

/* 記事一覧 */
blog.getAllArticles=function(){
    //最後にひっくり返すので最新が後ろでok
    const arrayAllArticles=[
        /*id,title,dates,tags*/
        blog.article('2023/0305','Kamemoについて',['2023/03/05','2023/03/11'],['初めての方へ','サイト作成']),
        blog.article('2023/0311','ロゴを自作した',['2023/03/11'],['サイト作成','ロゴ・アイコン']),
        blog.article('2023/0314','キャッシュについて',['2023/03/14'],['サイト作成','WEB','初めての方へ']),
        blog.article('2023/0318','PDFを公開しています',['2023/03/18','2023/03/19'],['PDF','サイト作成']),
        blog.article('2023/0319','PDF「温度の定義とエントロピー」について',['2023/03/19','2023/03/21'],['PDF','物理']),
        blog.article('2023/0320','小田原に行った。ういろうを買った。',['2023/03/20','2023/03/21'],['旅行']),
        blog.article('2023/0321','GitHubアクセストークン更新',['2023/03/21','2023/03/25'],['git','Github','サイト作成']),
        blog.article('2023/0325','Google Analytics を設定した',['2023/03/25'],['サイト作成']),
        blog.article('2023/0326','Debugモードについて',['2023/03/26'],['サイト作成','debug']),
        ];
    //以下debug用の追加
    if(blog.getDebugMode().isDebug()){
        for(let i=0;i<10002;i++){
            const article=blog.article(String(i),'debug'+i,['2023/03/04'],['debug',String(i)]);
            arrayAllArticles.push(article);
        }
        arrayAllArticles.push(blog.article('debug/debug','debug',['2023/03/05','2023/03/06','2023/03/26'],['debug','test','aaa','#$%&']));
    }
    //最新を初めに表示したいのでreverse
    return blog.wrapArticles(arrayAllArticles.reverse());
}