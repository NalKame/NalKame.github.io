//本番環境のみ差し込み
if(location.hostname==='nalkame.github.io'){
    //googleアナリティクス
    {
        const script_element = document.createElement('script');
        script_element.src='https://www.googletagmanager.com/gtag/js?id=G-E66TFNPQ6Z';
        script_element.setAttribute('async','');
        document.head.appendChild(script_element);
    }
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-E66TFNPQ6Z');
}
