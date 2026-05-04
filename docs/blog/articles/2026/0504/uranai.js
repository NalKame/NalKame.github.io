const uranai = {};
uranai.symbols = [
    {
        id: "INITIATION",
        tarot: { n: 0, name: "The Fool" },
        keyword: "開始",
        desc: "状況はまだ固まっておらず、試行錯誤が許される段階。"
    },
    {
        id: "CAPABILITY",
        tarot: { n: 1, name: "The Magician" },
        keyword: "操作性",
        desc: "使える手段は揃っており、やり方次第で結果が変わる。"
    },
    {
        id: "HIDDEN_FACTOR",
        tarot: { n: 2, name: "The High Priestess" },
        keyword: "未開示",
        desc: "見えていない前提や情報が判断に影響している。"
    },
    {
        id: "NURTURING",
        tarot: { n: 3, name: "The Empress" },
        keyword: "育成",
        desc: "短期成果より、育てることに意味がある局面。"
    },
    {
        id: "STRUCTURE",
        tarot: { n: 4, name: "The Emperor" },
        keyword: "秩序",
        desc: "責任・枠組み・ルールを明確にする必要がある。"
    },
    {
        id: "CONVENTION",
        tarot: { n: 5, name: "The Hierophant" },
        keyword: "慣習",
        desc: "既存のやり方や前例が判断軸になる。"
    },
    {
        id: "TRADEOFF",
        tarot: { n: 6, name: "The Lovers" },
        keyword: "選択",
        desc: "一方を取れば、もう一方を捨てる必要がある。"
    },
    {
        id: "MOMENTUM",
        tarot: { n: 7, name: "The Chariot" },
        keyword: "推進",
        desc: "勢いがあり、方向付けが重要になる。"
    },
    {
        id: "SELF_CONTROL",
        tarot: { n: 8, name: "Strength" },
        keyword: "制御",
        desc: "力で押すより、扱い方が問われる。"
    },
    {
        id: "WITHDRAWAL",
        tarot: { n: 9, name: "The Hermit" },
        keyword: "距離",
        desc: "一時的に引いて考えることで見えるものがある。"
    },
    {
        id: "EXTERNAL_SHIFT",
        tarot: { n: 10, name: "Wheel of Fortune" },
        keyword: "転換",
        desc: "自分の制御外で状況が切り替わる。"
    },
    {
        id: "EVALUATION",
        tarot: { n: 11, name: "Justice" },
        keyword: "評価",
        desc: "感情より、整合性と事実が重視される。"
    },
    {
        id: "SUSPENSION",
        tarot: { n: 12, name: "The Hanged Man" },
        keyword: "保留",
        desc: "今は動かず、見方を変える段階。"
    },
    {
        id: "TERMINATION",
        tarot: { n: 13, name: "Death" },
        keyword: "終了",
        desc: "終わらせることで次が始まる。"
    },
    {
        id: "ADJUSTMENT",
        tarot: { n: 14, name: "Temperance" },
        keyword: "調整",
        desc: "極端を避け、バランスを取る必要がある。"
    },
    {
        id: "OVERDEPENDENCE",
        tarot: { n: 15, name: "The Devil" },
        keyword: "執着",
        desc: "無意識の依存や固定観念に縛られている。"
    },
    {
        id: "ASSUMPTION_BREAK",
        tarot: { n: 16, name: "The Tower" },
        keyword: "崩壊",
        desc: "前提が壊れ、再構築が避けられない。"
    },
    {
        id: "HOPE_SIGNAL",
        tarot: { n: 17, name: "The Star" },
        keyword: "希望",
        desc: "即効性はないが、回復の兆しがある。"
    },
    {
        id: "AMBIGUITY",
        tarot: { n: 18, name: "The Moon" },
        keyword: "曖昧",
        desc: "判断材料が不十分で、誤解が生じやすい。"
    },
    {
        id: "CLARITY",
        tarot: { n: 19, name: "The Sun" },
        keyword: "明瞭",
        desc: "状況は単純化でき、隠す必要はない。"
    },
    {
        id: "REASSESSMENT",
        tarot: { n: 20, name: "Judgement" },
        keyword: "再評価",
        desc: "過去の判断を見直し、再定義する時期。"
    },
    {
        id: "COMPLETION",
        tarot: { n: 21, name: "The World" },
        keyword: "完了",
        desc: "一つの区切り。次の段階へ移行できる。"
    }
];

// uranai.colors = {
//     INITIATION: "#C7D3E3",
//     CAPABILITY: "#5B7DB1",
//     HIDDEN_FACTOR: "#6B6E8C",
//     NURTURING: "#A9CBB7",
//     STRUCTURE: "#4F5D5A",
//     CONVENTION: "#8A857A",
//     TRADEOFF: "#C9A66B",
//     MOMENTUM: "#C76B4A",
//     SELF_CONTROL: "#8B5E3C",
//     WITHDRAWAL: "#7A7F8C",
//     EXTERNAL_SHIFT: "#6A8FA3",
//     EVALUATION: "#E1E1E1",
//     SUSPENSION: "#B0A7C3",
//     TERMINATION: "#4A4A4A",
//     ADJUSTMENT: "#7FB7A3",
//     OVERDEPENDENCE: "#7A3E48",
//     ASSUMPTION_BREAK: "#B94A48",
//     HOPE_SIGNAL: "#8EC3E6",
//     AMBIGUITY: "#5F6A7A",
//     CLARITY: "#F2D36B",
//     REASSESSMENT: "#9E9E9E",
//     COMPLETION: "#4FA3A5"
// };
uranai.stringSeededRandom = function(str){
    const hashString = function(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = (h << 5) - h + str.charCodeAt(i);
            h |= 0;
        }
        return h >>> 0;
    }
    const seededRandom = function(seed) {
        let v = seed;
        return () => {
            v = (v * 1664525 + 1013904223) >>> 0;
            return v / 4294967296;
            ;
        }
    }
    
    const seed = hashString(str);
    const rand = seededRandom(seed);
    return rand;
}

uranai.drawSymbol = function(inputText) {
    const rand = uranai.stringSeededRandom(inputText);
    const index = Math.floor(rand() * uranai.symbols.length);
    const symbol = uranai.symbols[index];

    return {
        symbol,
        input: inputText
    };
}

uranai.buildPrompt = function(result) {
    const s = result.symbol;
    return `
以下は意思決定補助のための象徴の抽選結果です。

【入力】
${result.input}

【象徴】
ID: ${s.id}
対応タロット: ${s.tarot.n} ${s.tarot.name}
キーワード: ${s.keyword}
説明: ${s.desc}

この象徴を比喩として用い、入力内容の整理と
今後取り得る行動の選択肢について助言してください。
決断を強制せず、複数の解釈可能性を残してください。
`.trim();
}

uranai.generatePrompt = function(inputText){
    const result = uranai.drawSymbol(inputText);
    return uranai.buildPrompt(result);
}