/*
latest.jsに時間のクエリパラメータをつけて読み込む
これによりキャッシュされずにlatest.jsを読み込める
静的ファイルのみだと全てのファイルのキャッシュ対策をするのは現実的でないと判断した
そのため、何かあればlatest.js内で対応する
*/
{
    const script_element = document.createElement('script');
    script_element.src='/latest/latest.js?ver='+(new Date).getTime();
    document.body.appendChild(script_element);
}