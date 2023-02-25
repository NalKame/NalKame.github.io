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
        constructor(id,title,dates,tags){
            this.id=id;//フォルダ名としてurlに使用
            this.title=title;
            this.dates=dates;//['yyyy/mm/dd'] 作成日をいれ、更新日を追加していく
            this.tags=tags;//tagの配列
            if(blog.getDebugMode().isDebug()){
                this.validateDates();
            }
        }
        validateDates(){
            const regex = articleDateFormat.regexp;
            for(const date of this.dates){
                if(!regex.test(date)){
                    console.error('date format error');
                    console.log(this);
                }
            }
        }
        titleIncludes(array){
            return blog.utils.includesEvery(this.title,array);
        }
        hasTags(array){
            return blog.utils.includesEvery(this.tags,array);
        }
        hasTag(str){
            return this.hasTags([str]);
        }
        getUrl(){
            return blog.articlesUrl+this.id+'/';
        }
        getCreatedDate(){
            return this.dates[0];//最初の要素が作成日
        }
        isCreatedDate(year,month,day){
            return this.getCreatedDate().startsWith(articleDateFormat.format(year,month,day));
        }
        displayCreatedDate(){
            return articleDateFormat.display(this.getCreatedDate());
        }
        getLastModifiedDate(){
            return this.dates[this.dates.length-1];//最後の要素が最終更新日
        }
        displayLastModifiedDate(){
            return articleDateFormat.display(this.getLastModifiedDate());
        }
    }
    return new Article(id,title,dates,tags);
}