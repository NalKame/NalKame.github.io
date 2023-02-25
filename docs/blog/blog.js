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
    const Article=function(id,title,dates,tags){
        this.id=id;//フォルダ名としてurlに使用
        this.title=title;
        this.dates=dates;//['yyyy/mm/dd'] 作成日をいれ、更新日を追加していく
        this.tags=tags;//tagの配列
        if(blog.getDebugMode().isDebug()){
            this.validateDates();
        }
    }
    Article.prototype.validateDates=function(){
        const regex = /^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
        for(const date of this.dates){
            if(!regex.test(date)){
                console.error('date format error');
                console.log(this);
            }
        }
    }
    Article.prototype.titleIncludes=function(array){
        return blog.utils.includesEvery(this.title,array);
    }
    Article.prototype.hasTags=function(array){
        return blog.utils.includesEvery(this.tags,array);
    }
    Article.prototype.hasTag=function(str){
        return this.hasTags([str]);
    }
    Article.prototype.getUrl=function(){
        return blog.articlesUrl+this.id+'/';
    }
    Article.prototype.getCreatedDate=function(){
        return this.dates[0];//最初の要素が作成日
    }
    Article.prototype.getLastModifiedDate=function(){
        return this.dates[this.dates.length-1];//最後の要素が最終更新日
    }
    //static
    Article.getDisplayDate=function(dateText){
        //todo:見た目を変更する際は修正
        return dateText;//とりあえず現状のまま返す
    }
    return new Article(id,title,dates,tags);
}