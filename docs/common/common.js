const common={
    version:'0.1',
    site_name:'Kamemo',
    init:function(page_title){
        this.makeHeader();
        this.makeFooter();
        this.makeTitle(page_title);
        this.deleteNewLine();
    },
    makeHeader:function(){
        const $header=this.getFirstElementByTagName('header');
        if($header===null)return;//無ければ未設定
        $header.innerHTML=`
        <div class="Kamemo_logo_wrapper">
            <a href="/">
                <img class="Kamemo_logo" src="/common/image/Kamemo_logo.png" alt="Kamemoロゴ">
            </a>
        </div>
        <div class="link_list_wapper">
            <ul id="header_link_list" class="link_list">
            </ul>
        </div>
        `;//複雑になったらajaxやiframeを検討
    },
    headerLinkList:{
        append:function(href,text){
            const $header_link_list=document.getElementById('header_link_list');
            if($header_link_list===null)throw new Error('$header_link_list is null');//無ければエラー
            const $a=document.createElement('a');
            $a.href=href;
            $a.innerText=text;
            const $li=document.createElement('li');
            $li.appendChild($a);
            $header_link_list.appendChild($li);
        },
        appendHomeLink:function(){
            this.append('/','ホーム');
        },
        appendBlogTopLink:function(){
            this.append('/blog/','ブログTOP');
        },
        appendHistoryBack:function(){
            this.append('javascript:history.back();','戻る')
        }
    },
    makeFooter:function(){
        const $footer=this.getFirstElementByTagName('footer');
        if($footer===null)return;//無ければ未設定
        $footer.innerHTML=`
        <div class="copyright">
            <span>&copy; 2023</span>
            <span class="link_who_wrapper">
                <a class="link_who" href="/who.html">
                    <span class=my_name>NalKame</span>
                    <img class="kame_icon" src="/common/image/kame_icon.png" alt="かめアイコン">
                </a>
            </span>
        </div>
        `;//複雑になったらajaxやiframeを検討
    },
    makeTitle:function(page_title){
        const $title=this.getFirstElementByTagName('title');
        if($title===null)return;//無ければ未設定
        if(page_title!==undefined){
            $title.innerText=page_title+' - '+this.site_name;
        }
    },
    makeMainTitle:function(main_title_text){
        const $main_title=document.getElementById('main_title');
        if($main_title===null)return;//無ければ未設定
        const $h1=document.createElement('h1');
        $h1.innerText=main_title_text?main_title_text:'';
        $main_title.appendChild($h1);
    },
    getFirstElementByTagName:function(tagName){
        const $elements=document.getElementsByTagName(tagName);
        if($elements.length===0)return null;
        return $elements[0];
    },
    getURLSearchParams:function(){
        return new URLSearchParams(window.location.search);
    },
    getURLSearchParamValue:function(key){
        return this.getURLSearchParams().get(key);
    },
    deleteNewLine:function(){
        const $deleteNewLines=document.getElementsByClassName('deleteNewLine');
        for(const $el of $deleteNewLines){
            $el.innerHTML=$el.innerHTML.replace(/\s*\n\s*/g,'').replace(/\s*\r\s*/g,'');
        }
    }
};
