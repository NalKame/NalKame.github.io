const TextProgresbar=function(){
    var size=10;
    var emptyMark="░";
    var fillMark="▓";
    this.setSize=function(pSize){
        size=pSize;
    }
    this.setEmptyMark=function(pEmptyMark){
        emptyMark=pEmptyMark;
    }
    this.setFillMark=function(pFillMark){
        fillMark=pFillMark;
    }
    this.createProgressbar=function(pValue){
        var count=Math.round(pValue*size);
        var text="";
        for(var i=0;i<size;i++){
            var mark=i<count?fillMark:emptyMark;
            text+=mark;
        }
        return text;
    }
}