const common={
    site_name:'Kamemo',
    init:function(page_title){
        this.makeHeader();
        this.makeFooter();
        this.makeTitle(page_title);
    },
    makeHeader:function(){
        const $header=this.getFirstElementByTagName('header');
        if($header===null)return;//無ければ未設定
        $header.innerHTML=
        '<div class="Kamemo_logo_wrapper">'+
            '<a href="/">'+
                '<img class="Kamemo_logo" src="/common/image/Kamemo_logo.png" alt="Kamemoロゴ">'+
            '</a>'+
        '</div>'+
        '<div class="link_list_wapper">'+
            '<ul id="header_link_list" class="link_list">'+
            '</ul>'+
        '</div>';
    },
    headerLinkList:{
        append:function(href,text){
            const $header_link_list=document.getElementById('header_link_list');
            if($header_link_list===null)throw new Error('$header_link_list is null');//無ければエラー
            const $a=document.createElement("a");
            $a.href=href;
            $a.innerText=text;
            const $li=document.createElement("li");
            $li.appendChild($a);
            $header_link_list.appendChild($li);
        },
        appendHomeLink:function(){
            this.append("/","ホーム");
        }
    },
    makeFooter:function(){
        const $footer=this.getFirstElementByTagName('footer');
        if($footer===null)return;//無ければ未設定
        $footer.innerHTML=
        '<div class="copyright">'+
            '<span>&copy; 2023</span>'+
            '<span class="link_who_wrapper">'+
                '<a class="link_who" href="/who.html">'+
                    '<span class=my_name>NalKame</span>'+
                    '<img class="kame_icon" src="/common/image/kame_icon.png" alt="かめアイコン">'+
                '</a>'+
            '</span>'+
        '</div>';
    },
    makeTitle:function(page_title){
        const $title=this.getFirstElementByTagName('title');
        if($title===null)return;//無ければ未設定
        if(page_title!==undefined){
            $title.innerText=page_title+' - '+this.site_name;
        }
    },
    getFirstElementByTagName:function(tagName){
        const $elements=document.getElementsByTagName(tagName);
        if($elements.length===0)return null;
        return $elements[0];
    }
};

//Debug
common.debug={
    name:'Debug',
    value:'true',
    set:function(){
        sessionStorage.setItem(this.name,this.value);
    },
    unset:function(){
        sessionStorage.removeItem(this.name);
    },
    isDebug:function(){
        return sessionStorage.getItem(this.name)===this.value;
    },
    console_log:function(msg){
        if(this.isDebug()) console.log(msg);
    },
    window_alert:function(msg){
        if(this.isDebug()) window.alert(msg);
    }
}

