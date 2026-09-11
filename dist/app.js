const stems=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const branches=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const stemEls=['木','木','火','火','土','土','金','金','水','水'];
const branchEls=['水','土','木','木','土','火','火','土','金','金','土','水'];
const colors={木:'#4f8062',火:'#b74332',土:'#b59658',金:'#8a9195',水:'#315f77'};
const profiles={
 木:{trait:'伸展與創造',quote:'你擅長讓事物長出新的可能，但成長也需要適時修枝。',tags:['成長型思維','理想感','同理心'],strengths:['把零散線索發展成完整方案','重視長期價值與關係經營','遇到變化時仍能找到出口'],weaknesses:['選擇過多時容易分散','為了和諧而延後表態','心軟時會接下不屬於自己的責任']},
 火:{trait:'熱度與影響',quote:'你擅長點亮氣氛與方向，當熱情有了節奏，影響力就能持續。',tags:['行動感','感受敏銳','表達力'],strengths:['能快速集結團隊注意力','對機會與氣氛非常敏銳','適合成為發起者與鼓舞者'],weaknesses:['起伏過快容易耗能','急於推進時會忽略細節','過度在意即時回饋']},
 土:{trait:'承載與實現',quote:'你擅長把複雜放回現實，穩定是力量，但也要為自己保留轉彎。',tags:['務實','承擔力','整合力'],strengths:['能建立可信賴的節奏與流程','面對壓力仍有很好的承接力','重視結果，能把想法落地'],weaknesses:['改變前容易過度評估','把他人需求背在自己身上','慣性成形後不易放手']},
 金:{trait:'判斷與精準',quote:'你擅長看清邊界與標準，當鋒利多一份溫度，就會變成真正的信任。',tags:['原則感','辨析力','品質意識'],strengths:['能快速看見風險與品質落差','在混亂中建立清楚規則','適合需要判斷與取捨的角色'],weaknesses:['標準太高時也會逼緊自己','容易先判斷再理解','不習慣暴露未完成的狀態']},
 水:{trait:'流動與洞察',quote:'你擅長讀懂情勢與人心，流動是天賦，清楚的方向會讓它成為力量。',tags:['觀察力','適應力','溝通智慧'],strengths:['能掌握言語之外的訊號','跨領域學習與轉換速度快','懂得繞道找到可行解法'],weaknesses:['資訊過多時容易過度思考','環境波動會影響內在穩定','必須練習明確的界線']}
};
function mod(n,m){return((n%m)+m)%m}
function getPillars(date,time){
 const a=date.split('-').map(Number),y=a[0],m=a[1],d=a[2],hour=Number(time.split(':')[0]);
 const ys=mod(y-4,10),yb=mod(y-4,12),first=[2,4,6,8,0][ys%5],off=mod(m-2,12);
 const ms=mod(first+off,10),mb=mod(m,12),jdn=Math.floor(Date.UTC(y,m-1,d)/86400000+2440587.5),cycle=mod(jdn+49,60);
 const ds=cycle%10,db=cycle%12,hb=mod(Math.floor((hour+1)/2),12),hs=mod(ds*2+hb,10);
 return[{label:'年柱',s:ys,b:yb},{label:'月柱',s:ms,b:mb},{label:'日柱',s:ds,b:db},{label:'時柱',s:hs,b:hb}];
}
function advice(label,title,text){return '<div class="advice-card"><small>'+label+'</small><h4>'+title+'</h4><ul><li>'+text+'</li></ul></div>'}
function fill(id,value){document.querySelector(id).innerHTML=value}
function buildReading(input){
 const ps=getPillars(input.date,input.time),counts={木:0,火:0,土:0,金:0,水:0};
 ps.forEach(function(p){counts[stemEls[p.s]]++;counts[branchEls[p.b]]++});
 const master=stemEls[ps[2].s],profile=profiles[master],yinYang=ps[2].s%2===0?'陽':'陰';
 const sorted=Object.entries(counts).sort(function(a,b){return b[1]-a[1]}),strong=sorted[0][0],weak=sorted[sorted.length-1][0],max=Math.max.apply(null,Object.values(counts));
 fill('#report-name',input.name?input.name+'的':'你的');
 fill('#birth-summary',input.date.replaceAll('-','.')+' · '+input.time+' · '+document.querySelector('#place').selectedOptions[0].textContent);
 fill('#day-master',stems[ps[2].s]+master);fill('#day-trait',yinYang+master+' · '+profile.trait);
 fill('#pillars',ps.map(function(p){return '<div class="pillar"><small>'+p.label+'</small><b>'+stems[p.s]+branches[p.b]+'</b><span>'+stemEls[p.s]+' · '+branchEls[p.b]+'</span></div>'}).join(''));
 fill('#element-chart',Object.entries(counts).map(function(x){return '<div class="element-bar" style="--value:'+(18+x[1]/max*72)+'%;--color:'+colors[x[0]]+'"><i></i><b>'+x[1]+'</b><span>'+x[0]+'</span></div>'}).join(''));
 fill('#element-insight','命盤中'+strong+'的訊號最明顯，代表你很容易動用「'+profiles[strong].trait+'」。'+weak+'相對較少，可透過日常習慣刻意補足，不代表缺陷。');
 fill('#core-quote',profile.quote);fill('#core-tags',profile.tags.map(function(x){return '<span>'+x+'</span>'}).join(''));
 fill('#strength-list',profile.strengths.map(function(x){return '<li>'+x+'</li>'}).join(''));fill('#weakness-list',profile.weaknesses.map(function(x){return '<li>'+x+'</li>'}).join(''));
 fill('#life-copy','你的機會常來自「'+profiles[strong].trait+'」的場景：當環境正在轉型、整合或需要新方向時，你的優勢容易被看見。與其等待完美時機，更適合先建立一個可測試的小舞台，讓能力持續被驗證。');
 fill('#life-cards',advice('機會點','跨界整合','把你已知的事帶到一個新場域，往往比從零競爭更有優勢。')+advice('行動鍵','小步公開','以作品、提案或持續輸出累積能見度。')+advice('補強點','練習'+profiles[weak].trait,'不必強迫自己變成另一種人，只要建立一個小習慣。')+advice('關鍵詞','選擇積累','找能留下長期資產的機會，不只看眼前熱度。'));
 fill('#career-copy','你適合在需要'+profile.trait+'的位置上發揮。職位名稱不是重點，關鍵是能否擁有清楚的成果責任、適度自主性與可持續累積的專業籌碼。財務上適合以紀律取代情緒，重視現金流與風險邊界。');
 fill('#career-cards',advice('工作型態','專案與主導權','能清楚看到成果的工作，會比無限待命更適合你。')+advice('決策法','設定停損點','重要決策前先寫下上限、下限與回顧日期。')+advice('財務節奏','自動化累積','用固定比例儲蓄取代即興的緊繃與放鬆。')+advice('成長策略','建立可攜專長','選一項能跨公司、跨產業使用的核心能力。'));
 fill('#relations-copy','關係裡的你重視真實與可持續性。你可能會用解決問題表達關心，但對方有時更需要先被理解。愛情不必靠猜測：把需求說清楚、把邊界做溫柔，親密感反而會更安定。');
 fill('#relations-cards',advice('人際優勢','值得信賴','你容易成為別人願意倚靠與請教的對象。')+advice('關係練習','先共感再建議','問「你想要我聽，還是一起想辦法？」。')+advice('愛情線索','穩定回應','比起強烈戀愛感，說到做到更能累積安全感。')+advice('邊界提醒','不代替成長','支持對方，但不接管對方應負的責任。'));
 fill('#health-copy','從五行的隱喻來看，'+strong+'較旺時，容易把精力集中在一個方向；'+weak+'較少時，則提醒你留意生活的平衡感。真正有幫助的不是對號入座，而是穩定睡眠、規律活動與對壓力有意識的恢復。');
 fill('#health-cards',advice('每日','固定關機時間','睡前保留一段不解決問題的空白。')+advice('每週','有氧與伸展','選擇可長期維持的活動，不追求短期過量。')+advice('壓力高時','減少決策數','把重要事收斂到三件，先恢復再擴張。')+advice('專業協助','以感受為準','若身心不適持續，及早尋求專業協助。'));
 fill('#risk-copy','你的風險多半不是能力不足，而是把優勢使用過量。當'+profiles[strong].trait+'變成唯一反應，就容易忽略情勢已經改變。在高壓、高金額或重大承諾前，刻意加入第二意見與24小時緩衝。');
 fill('#risk-cards',advice('避免','情緒性承諾','熱情、罪惡感或焦慮升高時，不立即答應。')+advice('避免','單一資訊來源','重要決策至少核對兩種獨立觀點。')+advice('防護','事前清單','先寫下成功標準、最大成本與退出條件。')+advice('防護','找能反對你的人','真正的貴人不只支持，也能說出你沒看見的部分。'));
 buildLuck(ps,input.date,input.gender,strong,weak);buildBenefactor(weak);
 return{pillars:ps.map(function(p){return stems[p.s]+branches[p.b]}),dayMaster:stems[ps[2].s]+master,strongElement:strong,balancingElement:weak};
}
function buildLuck(ps,date,gender,strong,weak){
 const birthYear=Number(date.slice(0,4)),age=new Date().getFullYear()-birthYear,yang=ps[0].s%2===0,forward=(gender==='male')===yang;
 const themes={木:'學習、擴展與新起點',火:'表現、能見度與影響力',土:'積累、責任與穩定基礎',金:'選擇、專業化與取捨',水:'流動、轉型與視野'};let html='';
 for(let i=0;i<8;i++){const start=7+i*10,end=start+9,off=(i+1)*(forward?1:-1),s=mod(ps[1].s+off,10),b=mod(ps[1].b+off,12),el=stemEls[s],current=age>=start&&age<=end;html+='<div class="cycle '+(current?'current':'')+'"><small>'+(birthYear+start)+'—'+(birthYear+end)+'</small><b>'+stems[s]+branches[b]+'</b><span>'+start+'—'+end+' 歲'+(current?' · 當前':'')+'</span><p>'+themes[el]+'。'+(el===strong?'來得自然，記得留意過度使力。':el===weak?'是補齊格局、擴展能力的十年。':'用穩定節奏換取長期成果。')+'</p></div>'}
 fill('#luck-timeline',html);
}
function buildBenefactor(weak){
 const people={木:'願意鼓勵你嘗試、幫你開枝散葉的人',火:'能讓你被看見、帶來行動熱度的人',土:'務實可靠、會幫你把想法落地的人',金:'標準清楚、願意給你直接回饋的人',水:'資訊靈通、能為你打開新視野的人'};
 const dirs={木:['東方','教育／創意'],火:['南方','傳播／品牌'],土:['中央','營運／實務'],金:['西方','金融／專業'],水:['北方','科技／流通']};
 fill('#benefactor-title','尋找帶著「'+weak+'」特質的人');fill('#benefactor-copy','你的貴人不一定有特定身分，更像是'+people[weak]+'。與其等待被發現，不如主動進入這種人容易出現的場域。');
 const data=[['特質',profiles[weak].trait],['方位隱喻',dirs[weak][0]],['場域',dirs[weak][1]],['相處關鍵','主動請益']];
 fill('#benefactor-compass',data.map(function(x){return '<div class="compass-item"><small>'+x[0]+'</small><b>'+x[1]+'</b></div>'}).join(''));
}
let currentReading=null;
function showReport(input){const result=buildReading(input);currentReading=result;document.querySelector('.workbench').hidden=true;document.querySelector('.preview-strip').hidden=true;document.querySelector('#report').hidden=false;window.scrollTo({top:0,behavior:'smooth'});return result}
document.querySelector('#birth-form').addEventListener('submit',function(event){event.preventDefault();const input={name:document.querySelector('#name').value.trim(),date:document.querySelector('#birth-date').value,time:document.querySelector('#birth-time').value,gender:document.querySelector('#gender').value};if(!input.date||!input.time)return;const button=event.currentTarget.querySelector('button');button.firstElementChild.textContent='正在排列命盤…';button.disabled=true;setTimeout(function(){showReport(input);button.firstElementChild.textContent='生成我的命盤分析';button.disabled=false},550)});
document.querySelector('#back-button').addEventListener('click',function(){document.querySelector('#report').hidden=true;document.querySelector('.workbench').hidden=false;document.querySelector('.preview-strip').hidden=false;window.scrollTo({top:0,behavior:'smooth'})});
document.querySelectorAll('.report-tabs button').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.report-tabs button').forEach(function(x){x.classList.toggle('active',x===btn)});document.querySelectorAll('.tab-panel').forEach(function(x){x.classList.toggle('active',x.dataset.panel===btn.dataset.tab)})})});
const gua=[
 {name:'乾為天',key:'主動 · 開創',summary:'局勢需要清楚主導，但真正有利的不是硬推，而是先確立原則與可承擔的責任。',lines:[1,1,1,1,1,1]},
 {name:'坤為地',key:'承接 · 蓄勢',summary:'眼前更適合蒐集條件、穩住基本盤，讓事情自然成熟後再推進。',lines:[0,0,0,0,0,0]},
 {name:'水雷屯',key:'起步 · 排障',summary:'這是開局不順但可逐步打通的情境。先處理最小阻礙，不必一次解決全部問題。',lines:[1,0,0,0,1,0]},
 {name:'風山漸',key:'漸進 · 累積',summary:'優勢來自循序推進與可驗證的成果。速度不是關鍵，穩定增加信任才是。',lines:[0,0,1,0,1,1]},
 {name:'地天泰',key:'交流 · 通達',summary:'局勢有利於合作與資源交換。主動說清楚你能提供什麼，也明確提出需要什麼。',lines:[1,1,1,0,0,0]},
 {name:'水風井',key:'深耕 · 資源',summary:'答案不一定在換方向，而可能在重新整理既有資源、專長與人脈的使用方式。',lines:[0,1,1,0,1,0]},
 {name:'水澤節',key:'邊界 · 節制',summary:'設好範圍會讓事情更順。時間、金錢與責任都需要明確上限，才能保留長期選擇權。',lines:[1,1,0,0,1,0]},
 {name:'水火既濟',key:'完成 · 守成',summary:'條件已接近完整，現在的重點是收尾、驗證與防止最後階段因鬆懈而反覆。',lines:[1,0,1,0,1,0]}
];
const eventGuidance={
 career:{title:'讓能力在可見的成果中發揮',adv:['能取得明確成果責任的方案','可累積作品、經驗或決策權的位置','有可信任夥伴支援的漸進式改變'],act:['把選項拆成三個可比較條件','先談清楚權責、資源與檢核日期','用一次小型試行驗證適配度'],risk:['只被頭銜或短期薪資吸引','責任增加但權限與資源不變','未確認成功標準就匆忙承諾']},
 money:{title:'先保留選擇權，再追求成長',adv:['資訊透明且能理解的方案','最壞情境仍在可承擔範圍內','能分批驗證而非一次投入'],act:['先寫下最大損失與退出條件','核對至少兩個獨立資訊來源','把決策分成觀察、試行、加碼三階段'],risk:['把卦象當成投資依據','借貸或高槓桿放大不確定性','因害怕錯過而跳過查證']},
 love:{title:'讓真實需求有被聽見的空間',adv:['願意對話而非互相猜測的關係','行動與承諾一致的互動','彼此都保有邊界與生活重心'],act:['先描述感受，再提出具體需求','選一個情緒平穩的時間談','觀察對方是否持續用行動回應'],risk:['只看一時熱度忽略長期一致性','替對方解釋反覆或失信','用測試、冷戰取代直接溝通']},
 decision:{title:'把模糊選擇轉成可驗證條件',adv:['能留下長期能力與關係資產的方向','即使失敗也保有回頭路的方案','與核心價值一致而非只滿足期待'],act:['列出一年後最在意的三個結果','設定24小時冷靜期','找一位敢提出反對意見的人檢視'],risk:['在疲累或焦慮高峰做決定','把別人的期待誤認為自己的目標','追求零風險而無限延後']},
 other:{title:'先定義真正要解的問題',adv:['能增加資訊與回饋的下一步','成本小但學習價值高的嘗試','讓你更接近關鍵人物或資源的行動'],act:['用一句話重寫問題','區分可控制與不可控制項目','在七天內完成一個最小行動'],risk:['同時處理太多層次的問題','期待一次行動解決所有不確定','只在腦中推演而缺少真實回饋']}
};
function list(items){return items.map(function(x){return '<li>'+x+'</li>'}).join('')}
function hashText(text){let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function analyzeSituation(text,type,horizon){
 if(!currentReading)throw new Error('請先生成命盤');
 const seed=hashText(text+type+horizon+currentReading.dayMaster+new Date().toISOString().slice(0,10)),hex=gua[seed%gua.length],guide=eventGuidance[type]||eventGuidance.other;
 fill('#hexagram-name',hex.name);fill('#hexagram-keyword',hex.key);
 fill('#hexagram-lines',hex.lines.slice().reverse().map(function(v){return v?'<div class="gua-line yang"></div>':'<div class="gua-line"><i></i><i></i></div>'}).join(''));
 fill('#oracle-title',guide.title);fill('#oracle-summary',hex.summary+' 你的命盤以「'+currentReading.strongElement+'」為主要動能，這次若能同時加入「'+currentReading.balancingElement+'」的'+profiles[currentReading.balancingElement].trait+'，會比只靠原本習慣更有利。');
 fill('#oracle-advantage',list(guide.adv));fill('#oracle-actions',list(guide.act));fill('#oracle-risks',list(guide.risk));
 document.querySelector('#oracle-result').hidden=false;document.querySelector('#oracle-result').scrollIntoView({behavior:'smooth',block:'start'});
 return{hexagram:hex.name,keyword:hex.key,mostFavorable:guide.adv,recommendedActions:guide.act,risksToAvoid:guide.risk};
}
document.querySelector('#divination-form').addEventListener('submit',function(event){event.preventDefault();const text=document.querySelector('#event-text').value.trim();if(text.length<8)return;analyzeSituation(text,document.querySelector('#event-type').value,document.querySelector('#event-horizon').value)});
function registerWebMCP(){const context=document.modelContext;if(!context||!context.registerTool)return;try{Promise.resolve(context.registerTool({name:'generate_bazi_reading',title:'生成八字命盤分析',description:'使用生辰資料產生並顯示五行、特質、人生面向與十年大運的文化參考報告。',inputSchema:{type:'object',properties:{name:{type:'string'},birthDate:{type:'string',pattern:'^\\d{4}-\\d{2}-\\d{2}$'},birthTime:{type:'string',pattern:'^\\d{2}:\\d{2}$'},gender:{type:'string',enum:['female','male','other']}},required:['birthDate','birthTime','gender'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:function(input){if(!/^\d{4}-\d{2}-\d{2}$/.test(input.birthDate)||!/^\d{2}:\d{2}$/.test(input.birthTime))throw new Error('生日或時間格式不正確');document.querySelector('#name').value=input.name||'';document.querySelector('#birth-date').value=input.birthDate;document.querySelector('#birth-time').value=input.birthTime;document.querySelector('#gender').value=input.gender;return showReport({name:input.name||'',date:input.birthDate,time:input.birthTime,gender:input.gender})}})).catch(function(){})}catch(e){}}
registerWebMCP();
function registerDivinationWebMCP(){const context=document.modelContext;if(!context||!context.registerTool)return;try{Promise.resolve(context.registerTool({name:'analyze_current_situation',title:'近期事件算卦',description:'在已生成命盤後，根據近期事件提供有利發展、建設性行動與風險提醒。',inputSchema:{type:'object',properties:{situation:{type:'string',minLength:8,maxLength:500},category:{type:'string',enum:['career','money','love','decision','other']},horizonDays:{type:'string',enum:['30','90','365']}},required:['situation','category','horizonDays'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute:function(input){if(!currentReading)throw new Error('請先生成命盤');if(typeof input.situation!=='string'||input.situation.trim().length<8||input.situation.length>500)throw new Error('事件內容需為 8 至 500 個字');if(!eventGuidance[input.category]||!['30','90','365'].includes(input.horizonDays))throw new Error('事件分類或觀察時間不正確');document.querySelector('#event-text').value=input.situation;document.querySelector('#event-type').value=input.category;document.querySelector('#event-horizon').value=input.horizonDays;return analyzeSituation(input.situation,input.category,input.horizonDays)}})).catch(function(){})}catch(e){}}
registerDivinationWebMCP();
