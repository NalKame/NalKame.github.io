const dateProgress=function(pDate){
    const date=(function(){
        if(pDate===undefined||pDate===null){
            return new Date();
        }else{
            return new Date(pDate);
        }
    })();
    const Progress=function(begin,now,end){
        this.begin=begin;
        this.now=now;
        this.end=end;
        this.rate=(this.now.getTime()-this.begin.getTime())/(this.end.getTime()-this.begin.getTime())
    }
    const ProgressYear=new Progress(
        new Date(date.getFullYear(),0),
        date,
        new Date(date.getFullYear()+1,0)
    );
    const ProgressMonth=new Progress(
        new Date(date.getFullYear(),date.getMonth(),1),
        date,
        new Date(date.getFullYear(),date.getMonth()+1,1)
    );
    const ProgressDate=new Progress(
        new Date(date.getFullYear(),date.getMonth(),date.getDate()),
        date,
        new Date(date.getFullYear(),date.getMonth(),date.getDate()+1)
    );
    return {
        year:ProgressYear,
        month:ProgressMonth,
        date:ProgressDate,
        now:date
    }
}