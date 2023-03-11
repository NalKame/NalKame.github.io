const blog_template0=
{
    version:'0',
    init:function(pvTitle){
        const article=blog.getThisPageAritcle();
        const list_title=article?.getTitle();
        common.init(pvTitle);
        common.makeMainTitle(pvTitle);
        if(pvTitle!==list_title)debugMode.window_alert('タイトルが異なっています');
        common.headerLinkList.appendBlogTopLink();
        common.headerLinkList.appendHistoryBack();
        {
            const $created_date=document.getElementById('created_date');
            const $last_modified_date=document.getElementById('last_modified_date');
            $created_date.innerText=article?.displayCreatedDate();
            $last_modified_date.innerText=article?.displayLastModifiedDate();
        }
        {
            const $tags=document.getElementById('tags');
            const tagArray=article?.getTags()||[];
            for(const tag of tagArray){
                const $a=document.createElement('a');
                $a.href=blog.getTagSearchUrl(tag);
                $a.innerText=tag;
                $tags.appendChild($a);
            }
        }
    }
}