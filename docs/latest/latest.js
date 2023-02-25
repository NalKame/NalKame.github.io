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
    const getDebugMode=function(){
        if(typeof debugMode==='undefined'){
            console.error('debugMode not exists');
            return {
                console_log:function(){},
                window_alert:function(){}
            }
        }
        return debugMode;
    }
    const versions=[];
    if(typeof common!=='undefined')versions.push(new AssertEqual('commonJs',common?.version,'0'));
    versions.push(new AssertEqual('commonCss',getCssProperty('--commonCssVersion'),'0'));
    //とりあえずdebug時コンソール出力
    getDebugMode().console_log(versions);
    for(const assert of versions){
        if(!assert.actual)continue;//空文字(css)のときは無視
        if(!assert.equal){
            getDebugMode().window_alert('最新でないファイルがあります。');
            break;
        }
    }
}