//本番環境のみ差し込み
if(location.hostname==='nalkame.github.io'){
    //googleアナリティクス
    document.head.insertAdjacentHTML('beforeend','<script async src="https://www.googletagmanager.com/gtag/js?id=G-E66TFNPQ6Z"></script>');
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-E66TFNPQ6Z');
}
