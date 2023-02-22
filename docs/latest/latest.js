/*
キャッシュ対策をして読み込むので常に最新とみなしてよい
ただし、scriptタグを動的に差し込んでいるので実行タイミングに注意
*/
{
    //versionが最新かチェックする
    const AssertEqual=function(name,actual,expected){
        this.name=name;
        this.actual=actual;
        this.expected=expected;
        this.equal=(actual===expected);
    }
    const getCssProperty=function(name){
        return getComputedStyle(document.documentElement).getPropertyValue(name);
    }
    const versions=[
        new AssertEqual('commonJs',common.version,'0'),
        new AssertEqual('commonCss',getCssProperty('--getCssProperty'),'0')
    ];
    //とりあえずdebug時コンソール出力
    debugMode.console_log(versions);
    for(const assert of versions){
        if(!assert.actual)continue;//undefined(js)や空文字(css)のときは無視
        if(!assert.equal){
            debugMode.window_alert('最新でないファイルがあります。');
            break;
        }
    }
}