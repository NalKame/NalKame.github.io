//Debug
debugMode={
    name:'DebugMode',
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

