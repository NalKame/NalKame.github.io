function mahjong_katachi(num){
    if(num<1)throw new Error();
    if(num===1)return "123456789".split("").map(t=>[parseInt(t)]);
    const prevList=mahjong_katachi(num-1);
    const results=[];
    for(const prev of prevList){
        const max=prev[prev.length-1];
        const countMax=prev.filter(t=>t===max).length;
        const begin=countMax<4?max:max+1;
        for(let i=begin;i<=9;i++){
            const list=[];
            list.push(...prev);
            list.push(i);
            results.push(list);
        }
    }
    return results;
}

function buildMahjongKatachiDOMElements(pBegin,pEnd){
    const begin=pBegin;
    const end=pEnd===undefined?pBegin:pEnd;
    const elResults=document.getElementById("results");
    for(let i=begin;i<=end;i++){
        const elDeitals=document.createElement("details");
        elDeitals.classList.add("accordion");
        const elSummary=document.createElement("summary");
        elSummary.classList.add("accordion__summary");
        elSummary.innerText=i+"枚";
        elDeitals.append(elSummary);
        const elAccordion=document.createElement("div");
        elAccordion.classList.add("accordion__detail");
        const results=mahjong_katachi(i);
        for(const res of results){
            const el=document.createElement("div");
            el.innerText=res;
            elAccordion.append(el);
        }
        elDeitals.append(elAccordion);
        elResults.append(elDeitals);
    }
}