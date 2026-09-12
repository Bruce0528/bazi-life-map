const stems=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const branches=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const stemEls=['木','木','火','火','土','土','金','金','水','水'];
const branchEls=['水','土','木','木','土','火','火','土','金','金','土','水'];
const colors={木:'#4f8062',火:'#b74332',土:'#b59658',金:'#8a9195',水:'#315f77'};
const elementIcons={
 木:'<svg viewBox="0 0 32 32"><path d="M16 27V15" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/><path d="M16 17c0-6 5-9 10-9-1 6-4 9-10 9Z" fill="currentColor"/><path d="M16 20c0-5-5-8-10-8 1 5 4 8 10 8Z" fill="currentColor"/></svg>',
 火:'<svg viewBox="0 0 32 32"><path d="M16 4c3 5-2 6-2 10a4 4 0 0 0 8 0c0-2-1-3-1-3 2 2 3 5 3 8a8 8 0 1 1-16 0c0-6 4-9 8-15Z" fill="currentColor"/></svg>',
 土:'<svg viewBox="0 0 32 32"><path d="M4 24 12 12l5 6 3-4 8 10Z" fill="currentColor"/><circle cx="9" cy="20" r="1.6" fill="currentColor" opacity=".5"/></svg>',
 金:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="2.6"/><rect x="11.5" y="11.5" width="9" height="9" rx="1.5" fill="currentColor"/></svg>',
 水:'<svg viewBox="0 0 32 32"><path d="M16 4c5 7 9 12 9 17a9 9 0 1 1-18 0c0-5 4-10 9-17Z" fill="currentColor"/><path d="M11 21a5 5 0 0 0 5 5" stroke="#f1eee6" stroke-width="1.6" stroke-linecap="round" opacity=".6" fill="none"/></svg>'
};
const profiles={
 木:{trait:'伸展與創造',quote:'你擅長讓事物長出新的可能，但成長也需要適時修枝。',tags:['成長型思維','理想感','同理心'],strengths:['把零散線索發展成完整方案','重視長期價值與關係經營','遇到變化時仍能找到出口'],weaknesses:['選擇過多時容易分散','為了和諧而延後表態','心軟時會接下不屬於自己的責任']},
 火:{trait:'熱度與影響',quote:'你擅長點亮氣氛與方向，當熱情有了節奏，影響力就能持續。',tags:['行動感','感受敏銳','表達力'],strengths:['能快速集結團隊注意力','對機會與氣氛非常敏銳','適合成為發起者與鼓舞者'],weaknesses:['起伏過快容易耗能','急於推進時會忽略細節','過度在意即時回饋']},
 土:{trait:'承載與實現',quote:'你擅長把複雜放回現實，穩定是力量，但也要為自己保留轉彎。',tags:['務實','承擔力','整合力'],strengths:['能建立可信賴的節奏與流程','面對壓力仍有很好的承接力','重視結果，能把想法落地'],weaknesses:['改變前容易過度評估','把他人需求背在自己身上','慣性成形後不易放手']},
 金:{trait:'判斷與精準',quote:'你擅長看清邊界與標準，當鋒利多一份溫度，就會變成真正的信任。',tags:['原則感','辨析力','品質意識'],strengths:['能快速看見風險與品質落差','在混亂中建立清楚規則','適合需要判斷與取捨的角色'],weaknesses:['標準太高時也會逼緊自己','容易先判斷再理解','不習慣暴露未完成的狀態']},
 水:{trait:'流動與洞察',quote:'你擅長讀懂情勢與人心，流動是天賦，清楚的方向會讓它成為力量。',tags:['觀察力','適應力','溝通智慧'],strengths:['能掌握言語之外的訊號','跨領域學習與轉換速度快','懂得繞道找到可行解法'],weaknesses:['資訊過多時容易過度思考','環境波動會影響內在穩定','必須練習明確的界線']}
};
function mod(n,m){return((n%m)+m)%m}
function advice(label,title,text){return '<div class="advice-card"><small>'+label+'</small><h4>'+title+'</h4><ul><li>'+text+'</li></ul></div>'}
function fill(id,value){document.querySelector(id).innerHTML=value}
function buildBenefactor(weak){
 const people={木:'願意鼓勵你嘗試、幫你開枝散葉的人',火:'能讓你被看見、帶來行動熱度的人',土:'務實可靠、會幫你把想法落地的人',金:'標準清楚、願意給你直接回饋的人',水:'資訊靈通、能為你打開新視野的人'};
 const dirs={木:['東方','教育／創意'],火:['南方','傳播／品牌'],土:['中央','營運／實務'],金:['西方','金融／專業'],水:['北方','科技／流通']};
 fill('#benefactor-title','尋找帶著「'+weak+'」特質的人');fill('#benefactor-copy','你的貴人不一定有特定身分，更像是'+people[weak]+'。與其等待被發現，不如主動進入這種人容易出現的場域。');
 const data=[['特質','<span class="element-icon" style="color:'+colors[weak]+'">'+elementIcons[weak]+'</span>'+profiles[weak].trait],['方位隱喻',dirs[weak][0]],['場域',dirs[weak][1]],['相處關鍵','主動請益']];
 fill('#benefactor-compass',data.map(function(x){return '<div class="compass-item"><small>'+x[0]+'</small><b>'+x[1]+'</b></div>'}).join(''));
}
let currentReading=null;
function showReport(input){const result=buildReading(input);currentReading=result;document.querySelector('.workbench').hidden=true;document.querySelector('.preview-strip').hidden=true;document.querySelector('#compatibility').hidden=true;document.querySelector('#report').hidden=false;window.scrollTo({top:0,behavior:'smooth'});return result}
document.querySelector('#birth-form').addEventListener('submit',function(event){event.preventDefault();const input={name:document.querySelector('#name').value.trim(),date:document.querySelector('#birth-date').value,time:document.querySelector('#birth-time').value,gender:document.querySelector('#gender').value};if(!input.date||!input.time)return;const button=event.currentTarget.querySelector('button');button.firstElementChild.textContent='正在排列命盤…';button.disabled=true;setTimeout(function(){showReport(input);button.firstElementChild.textContent='生成我的命盤分析';button.disabled=false},550)});
document.querySelector('#back-button').addEventListener('click',function(){document.querySelector('#report').hidden=true;document.querySelector('.workbench').hidden=false;document.querySelector('.preview-strip').hidden=false;document.querySelector('#compatibility').hidden=false;window.scrollTo({top:0,behavior:'smooth'})});
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
function listPlus(items,extra){return list(items)+'<li class="chart-linked">'+extra+'</li>'}
function hashText(text){let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
const categoryFrame={career:'這次的工作機會',money:'這次的金錢決定',love:'這段感情裡的選擇',decision:'這個重大選擇',other:'眼前這件事'};
const categoryNoun={career:'職涯決定',money:'金錢決定',love:'感情選擇',decision:'重大選擇',other:'這件事'};
const situationThemes={
 career:[
  {kw:['升遷','晉升','升職','主管職'],theme:'升遷／晉升機會',concern:'這個新位置能不能讓你真正拿到更大的舞台，而不只是換個頭銜。'},
  {kw:['離職','跳槽','轉職','換工作','裸辭'],theme:'轉職／離職',concern:'離開熟悉的環境後，新選擇是否真的比現在更好。'},
  {kw:['創業','開公司','接案','自己出來做'],theme:'創業／接案',concern:'從穩定收入跨到不確定的自主性，能不能撐過起步期。'},
  {kw:['加薪','薪水','薪資','待遇'],theme:'薪資／待遇調整',concern:'付出與回報是否對等，值不值得繼續投入。'},
  {kw:['代理商','經銷','合作案','新客戶','新團隊','新業務'],theme:'新合作／新業務機會',concern:'新的合作關係能不能真的帶來成長，還是只是換個包裝的舊問題。'}
 ],
 money:[
  {kw:['投資','買股','基金','加密貨幣','比特幣','股票'],theme:'投資決策',concern:'現在進場的時機與風險，是否在你能承受的範圍內。'},
  {kw:['借錢','貸款','負債','信貸'],theme:'借貸／資金調度',concern:'這筆資金壓力會不會超出你長期可負擔的範圍。'},
  {kw:['買房','買車','大筆支出'],theme:'大額支出決策',concern:'這筆支出是否會犧牲掉其他更重要的財務彈性。'}
 ],
 love:[
  {kw:['分手','離婚','冷戰'],theme:'關係是否要結束',concern:'留下來是因為還有希望，還是只是不想面對結束。'},
  {kw:['告白','曖昧','追求'],theme:'關係的下一步',concern:'對方的態度和你想要的方向，是不是真的一致。'},
  {kw:['結婚','訂婚','同居'],theme:'進入更深的承諾',concern:'這段關係的基礎，禁不禁得起長期生活的考驗。'},
  {kw:['外遇','出軌','劈腿'],theme:'信任受損',concern:'關係還有沒有修復的空間，或已經到了該離開的時候。'}
 ],
 decision:[
  {kw:['搬家','移民','出國'],theme:'環境的重大改變',concern:'離開熟悉的環境，能不能換來真正想要的生活。'},
  {kw:['讀書','進修','考試','留學'],theme:'進修／升學選擇',concern:'投入的時間與成本，能不能換回相應的長期價值。'}
 ],
 other:[]
};
function detectTheme(text,type){
 const list=situationThemes[type]||[];
 for(let i=0;i<list.length;i++){if(list[i].kw.some(function(k){return text.indexOf(k)>-1}))return list[i]}
 return null;
}
function restateProblem(text,type,detected){
 const noun=categoryNoun[type]||categoryNoun.other,excerpt=text.length>44?text.slice(0,44)+'…':text;
 if(detected)return'整理你寫的內容，這其實是一個關於「'+detected.theme+'」的'+noun+'。你在意的核心，很可能不是表面的選項本身，而是：'+detected.concern+'（你的原話：「'+excerpt+'」）';
 return'整理你寫的內容，這是一個關於'+noun+'的抉擇（你的原話：「'+excerpt+'」）。真正要問自己的，往往不是「行不行」，而是「這是不是我現在最想要的方向」。';
}
function trendLine(cycle,horizon){
 const span=horizon==='30'?'這 30 天':horizon==='90'?'這 3 個月':'這 1 年';
 if(!cycle)return span+'內主要受你原本性格慣性影響，還沒有明顯大運加成，重點是先把基本盤顧好，不必躁進。';
 if(cycle.tone==='順勢開展')return span+'內走勢偏向緩步向上；只要持續投入，成果會比你預期的更快浮現。';
 if(cycle.tone==='主題加倍')return span+'內容易出現放大效應——選對方向會加速成長，選錯方向也會更快看到代價，值得把決策想清楚再出手。';
 return span+'內可能會先卡在調整期，短期不一定馬上見效，撐過磨合階段後，後段會比開頭更順。';
}
function crossAnalysis(reading,type,detected){
 const dom=reading.dominantTenGod,label=groupData[dom].label,cycle=reading.currentCycle,themeWord=detected?detected.theme+'這種情境':(categoryFrame[type]||categoryFrame.other);
 const natureLine='從你的命盤看，你的性格主軸是「'+dom+'（'+label+'）」，遇到'+themeWord+'時，你習慣的反應模式就是'+groupData[dom].talents[0]+'。';
 const cycleLine=cycle?('你目前正走在「'+cycle.ganzhi+'」大運（'+cycle.startYear+'—'+cycle.endYear+'年，'+cycle.startAge+'—'+cycle.endAge+' 虛歲），主題是'+luckThemeByGod[cycle.god]+'，屬於「'+cycle.tone+'」：這幾年你在'+label+'相關的事情上，會'+(cycle.tone==='順勢開展'?'特別順手，是加碼投入的好時機。':cycle.tone==='主題加倍'?'被放大檢視，成敗都會比平常更明顯。':'需要花更多力氣調整節奏，急不得。')):'你目前尚未進入第一步大運，還是以原本命盤的性格慣性為主，沒有明顯的大運加成或考驗。';
 return natureLine+cycleLine;
}
function crossGrid(reading,cycle,horizon){
 const dom=reading.dominantTenGod;
 return[['機會點',groupData[dom].talents[2]],['優勢',reading.skills[0]],['劣勢',reading.risks[0]],['未來走勢',trendLine(cycle,horizon)]].map(function(x){return'<div class="structure-chip"><small>'+x[0]+'</small><b>'+x[1]+'</b></div>'}).join('');
}
function personalizedGuidance(type,reading,detected){
 const dom=reading.dominantTenGod,label=groupData[dom].label,domRisk=groupData[dom].risk,bal=reading.balancingElement,frame=detected?detected.theme:(categoryFrame[type]||categoryFrame.other);
 const strengthTip=reading.dayStrength==='身偏強'?'你的命盤偏「身強」，容易靠自己硬推到底，這次可以主動找一位敢說出不同意見的人一起確認判斷。':reading.dayStrength==='身偏弱'?'你的命盤偏「身弱」，比起單打獨鬥，借助夥伴、平台或導師的資源，這次會比獨自扛下更穩。':'你的命盤五行中和，不必套用單一策略，依現場狀況彈性調整反而對你更有利。';
 return{
  adv:'你的命盤以「'+dom+'（'+label+'）」為主要動能，'+frame+'如果剛好用得上這項能力，會比一般情況更順手、更省力。',
  act:strengthTip,
  risk:frame+'最大的風險，其實和你命盤「'+dom+'（'+label+'）」用過頭的傾向重疊：'+domRisk+'。行動前，不妨刻意做一件「'+bal+'（'+profiles[bal].trait+'）」屬性的小事來提醒自己踩煞車，例如：'+balancePractice[bal]
 };
}
function analyzeSituation(text,type,horizon){
 if(!currentReading)throw new Error('請先生成命盤');
 const detected=detectTheme(text,type);
 const seed=hashText(text+type+horizon+currentReading.dayMaster+new Date().toISOString().slice(0,10)),hex=gua[seed%gua.length],guide=eventGuidance[type]||eventGuidance.other,personal=personalizedGuidance(type,currentReading,detected);
 fill('#hexagram-name',hex.name);fill('#hexagram-keyword',hex.key);
 fill('#hexagram-lines',hex.lines.slice().reverse().map(function(v){return v?'<div class="gua-line yang"></div>':'<div class="gua-line"><i></i><i></i></div>'}).join(''));
 fill('#oracle-title',guide.title);
 fill('#oracle-restate',restateProblem(text,type,detected));
 fill('#oracle-summary',hex.summary);
 fill('#oracle-cross-copy',crossAnalysis(currentReading,type,detected));
 fill('#oracle-cross-grid',crossGrid(currentReading,currentReading.currentCycle,horizon));
 fill('#oracle-advantage',listPlus(guide.adv,personal.adv));fill('#oracle-actions',listPlus(guide.act,personal.act));fill('#oracle-risks',listPlus(guide.risk,personal.risk));
 document.querySelector('#oracle-result').hidden=false;document.querySelector('#oracle-result').scrollIntoView({behavior:'smooth',block:'start'});
 return{hexagram:hex.name,keyword:hex.key,mostFavorable:guide.adv.concat([personal.adv]),recommendedActions:guide.act.concat([personal.act]),risksToAvoid:guide.risk.concat([personal.risk])};
}
document.querySelector('#divination-form').addEventListener('submit',function(event){event.preventDefault();const text=document.querySelector('#event-text').value.trim();if(text.length<8)return;analyzeSituation(text,document.querySelector('#event-type').value,document.querySelector('#event-horizon').value)});

/* 付款解鎖：呼叫 worker/ 後端（尚未部署前 PAYMENT_API_BASE 為空，維持暫停狀態，不會扣款也不會暴露繞過付款的路徑） */
const PAYMENT_API_BASE=(window.PAYMENT_API_BASE||'').replace(/\/$/,'');
function paymentReady(){return!!PAYMENT_API_BASE}
function getDeviceToken(){return localStorage.getItem('bazi_device_token')||''}
function setDeviceToken(t){localStorage.setItem('bazi_device_token',t)}
function isDivinationUnlocked(){return localStorage.getItem('bazi_divination_unlocked')==='1'}
function setDivinationUnlocked(){localStorage.setItem('bazi_divination_unlocked','1')}
function renderDivinationGate(){
 const paywall=document.querySelector('#paywall'),form=document.querySelector('#divination-form'),note=document.querySelector('#payment-note'),btn=document.querySelector('#unlock-button');
 if(!paywall||!form)return;
 if(isDivinationUnlocked()){paywall.hidden=true;form.hidden=false;return}
 form.hidden=true;paywall.hidden=false;
 if(!paymentReady()){btn.disabled=true;btn.firstElementChild.textContent='藍新金流尚未開通';note.textContent='藍新商店與安全付款後端尚待設定。目前不會收費，也不會產生推演結果。'}
 else{btn.disabled=false;btn.firstElementChild.textContent='NT$99 解鎖並開始推演';note.textContent=''}
}
async function startCheckout(){
 const btn=document.querySelector('#unlock-button'),note=document.querySelector('#payment-note'),original=btn.firstElementChild.textContent;
 btn.disabled=true;btn.firstElementChild.textContent='正在建立訂單…';
 try{
  const orderRes=await fetch(PAYMENT_API_BASE+'/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({deviceToken:getDeviceToken()||undefined})});
  if(!orderRes.ok)throw new Error('order');
  const order=await orderRes.json();setDeviceToken(order.deviceToken);
  const payRes=await fetch(PAYMENT_API_BASE+'/payments/newebpay',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({orderId:order.orderId})});
  if(!payRes.ok)throw new Error('payment');
  const pay=await payRes.json(),form=document.createElement('form');
  form.method='POST';form.action=pay.gatewayUrl;form.style.display='none';
  Object.entries(pay.fields).forEach(function(entry){const i=document.createElement('input');i.type='hidden';i.name=entry[0];i.value=entry[1];form.appendChild(i)});
  document.body.appendChild(form);form.submit();
 }catch(e){
  btn.disabled=false;btn.firstElementChild.textContent=original;
  note.textContent='連線失敗，請稍後再試，或聯絡客服 a00168201@gmail.com。';
 }
}
async function tryRedeemFromReturn(){
 const url=new URL(location.href),payment=url.searchParams.get('payment');
 if(!payment)return;
 url.searchParams.delete('payment');url.searchParams.delete('orderId');
 history.replaceState(null,'',url.pathname+url.search+url.hash);
 const note=document.querySelector('#payment-note');
 if(payment!=='paid'){if(note)note.textContent='付款未完成或已取消，請重新嘗試。';return}
 const deviceToken=getDeviceToken();
 if(!deviceToken)return;
 try{
  const res=await fetch(PAYMENT_API_BASE+'/premium/reading',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({deviceToken})}),data=await res.json();
  if(data.ok){setDivinationUnlocked();renderDivinationGate();document.querySelector('#divination').scrollIntoView({behavior:'smooth'})}
  else if(note)note.textContent='解鎖失敗，請聯絡客服協助處理。';
 }catch(e){if(note)note.textContent='連線失敗，請稍後再試，或聯絡客服。'}
}
document.querySelector('#unlock-button').addEventListener('click',startCheckout);
renderDivinationGate();
tryRedeemFromReturn();
function registerWebMCP(){const context=document.modelContext;if(!context||!context.registerTool)return;try{Promise.resolve(context.registerTool({name:'generate_bazi_reading',title:'生成八字命盤分析',description:'使用生辰資料產生並顯示五行、特質、人生面向與十年大運的文化參考報告。',inputSchema:{type:'object',properties:{name:{type:'string'},birthDate:{type:'string',pattern:'^\\d{4}-\\d{2}-\\d{2}$'},birthTime:{type:'string',pattern:'^\\d{2}:\\d{2}$'},gender:{type:'string',enum:['female','male','other']}},required:['birthDate','birthTime','gender'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:function(input){if(!/^\d{4}-\d{2}-\d{2}$/.test(input.birthDate)||!/^\d{2}:\d{2}$/.test(input.birthTime))throw new Error('生日或時間格式不正確');document.querySelector('#name').value=input.name||'';document.querySelector('#birth-date').value=input.birthDate;document.querySelector('#birth-time').value=input.birthTime;document.querySelector('#gender').value=input.gender;return showReport({name:input.name||'',date:input.birthDate,time:input.birthTime,gender:input.gender})}})).catch(function(){})}catch(e){}}
registerWebMCP();
function registerDivinationWebMCP(){const context=document.modelContext;if(!context||!context.registerTool)return;try{Promise.resolve(context.registerTool({name:'analyze_current_situation',title:'近期事件算卦',description:'在已生成命盤後，根據近期事件提供有利發展、建設性行動與風險提醒。',inputSchema:{type:'object',properties:{situation:{type:'string',minLength:8,maxLength:500},category:{type:'string',enum:['career','money','love','decision','other']},horizonDays:{type:'string',enum:['30','90','365']}},required:['situation','category','horizonDays'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute:function(input){if(!currentReading)throw new Error('請先生成命盤');if(typeof input.situation!=='string'||input.situation.trim().length<8||input.situation.length>500)throw new Error('事件內容需為 8 至 500 個字');if(!eventGuidance[input.category]||!['30','90','365'].includes(input.horizonDays))throw new Error('事件分類或觀察時間不正確');document.querySelector('#event-text').value=input.situation;document.querySelector('#event-type').value=input.category;document.querySelector('#event-horizon').value=input.horizonDays;return analyzeSituation(input.situation,input.category,input.horizonDays)}})).catch(function(){})}catch(e){}}
// 付款後單次推演須由後端核銷；商店未開通前不暴露可繞過付款的工具。

/* 精細排盤引擎：節氣月、藏干、十神、旺衰與沖合交叉判讀 */
const hiddenStems=[[9],[5,9,7],[0,2,4],[1],[4,1,9],[2,4,6],[3,5],[5,3,1],[6,8,4],[7],[4,7,3],[8,0]];
const hiddenWeights=[0.7,0.2,0.1];
const elementCycle=['木','火','土','金','水'];
const pillarRoles=['早年／外部環境','職涯／社會模式','自我／伴侶模式','內在／後期發展'];
const stemProfiles=[
 {image:'甲木 · 參天之木',core:'你傾向先看方向與長期價值，再決定投入多少。對能持續成長的事有耐性，也自然想建立秩序與主幹。',skills:['長線規劃與系統搭建','在混亂中立起共同方向','承擔開創期的不確定'],risks:['容易把堅持變成不易轉彎','責任感過強時不願求助']},
 {image:'乙木 · 藤蔓花木',core:'你不是靠正面硬推取勝，而是靠觀察環境、連結資源與逐步滲透。你能辨認細微差異，也擅長讓關係與方案慢慢成熟。',skills:['跨人脈與資源的柔性整合','細節優化與情境式溝通','在限制中另闢可行路徑'],risks:['顧及太多人而推遲自己的決定','選項過多時主線容易模糊']},
 {image:'丙火 · 太陽之火',core:'你習慣用清楚、直接與可見的方式帶動局面。當目標值得相信，你能快速凝聚注意力並把氣氛推向行動。',skills:['公開表達與動員共識','快速抓住趨勢和機會窗口','把抽象願景轉成可感受的畫面'],risks:['高昂狀態下容易答應過多','回饋不足時熱度下降得快']},
 {image:'丁火 · 燈燭之火',core:'你擅長聚焦少數關鍵人事物，以細緻觀察持續照亮問題。影響力不一定張揚，卻常能深入人心。',skills:['洞察情緒與隱性需求','精準內容、設計或顧問式表達','長時間打磨一項專業'],risks:['對環境氣氛過度敏感','容易把在意放在心裡反覆燃燒']},
 {image:'戊土 · 高山厚土',core:'你重視架構、信用與可承擔性。面對複雜局面，會本能地穩住秩序，讓他人知道可以依靠什麼。',skills:['大型專案的承載與整合','建立制度、邊界與穩定預期','危機中維持判斷與節奏'],risks:['容易把穩定變成不願改變','承擔過久才承認已經超載']},
 {image:'己土 · 田園之土',core:'你擅長把資源照顧到能真正產出，重視細節、節奏與人的實際感受。你追求的不是聲勢，而是可持續運作。',skills:['營運優化與細節管理','培育人才、客戶與長期關係','把零散工作整理成順暢流程'],risks:['容易默默接下別人的缺口','改善細節時可能錯過更大方向']},
 {image:'庚金 · 刀斧礦石',core:'你傾向直接面對問題、切除無效部分並推動改革。壓力越清楚，反而越能激發你的決斷力。',skills:['危機處理與果斷取捨','流程改革與效率提升','處理高難度或高壓任務'],risks:['推進太快時忽略他人的接受速度','容易用解決問題代替理解感受']},
 {image:'辛金 · 珠玉精金',core:'你對品質、差異與邊界有高度感受力。擅長從細節辨認價值，並以精準標準提升成果。',skills:['品質控制、風險辨識與審核','美感、品牌與精細表達','把複雜內容修整得清楚有序'],risks:['標準過高造成延遲或自我壓力','不易讓他人看見尚未完成的過程']},
 {image:'壬水 · 江海之水',core:'你善於掌握大範圍資訊、人脈與流向，對變化有較高容納度。越是跨域與複雜的場景，越能看見路徑。',skills:['跨域策略與資源調度','建立廣泛網絡與資訊優勢','在快速變動中找到替代路線'],risks:['擴張太快時忽略收斂與落地','容易同時開啟過多戰線']},
 {image:'癸水 · 雨露之水',core:'你習慣從微小訊號理解整體，直覺與觀察常比外在表現更先運作。適合深度研究與精準陪伴。',skills:['研究、診斷與細節洞察','理解未明說的需求','以耐心累積信任與專業'],risks:['吸收太多情緒或資訊而內耗','想得周全後才行動，容易錯過窗口']}
];
const groupData={
 '比劫':{label:'自主／協作',talents:['自主啟動，不等外部指令才前進','在同儕競合中快速校準能力','適合共同創業、社群或需要主體性的角色'],risk:'主見與競爭感過強時，協作成本會升高'},
 '食傷':{label:'創造／表達',talents:['把複雜內容轉譯成可理解的成果','提出新方法並以作品驗證','適合內容、產品、技術輸出與顧問工作'],risk:'輸出太快時，容易先表達後評估後果'},
 '財星':{label:'資源／成果',talents:['對市場需求、成本與交換價值敏感','能把人力與資源轉成具體成果','適合商務、營運、客戶與資產管理'],risk:'過度追逐可量化成果，容易壓縮恢復空間'},
 '官殺':{label:'責任／決策',talents:['在規範與壓力中建立秩序','願意對成果負責並作困難決定','適合管理、法遵、專案治理與高標準場域'],risk:'把外部標準內化過度，容易長期緊繃'},
 '印星':{label:'學習／洞察',talents:['快速建立知識架構並追溯根因','能從經驗與專業系統取得支援','適合研究、教育、策略與知識密集工作'],risk:'準備與推演過多時，行動速度會下降'}
};
const balancePractice={木:'定期接觸新領域、新方法，保持成長感。',火:'主動分享進度與成果，讓熱度被更多人看見。',土:'把想法排進行事曆，變成具體、可檢核的產出。',金:'替重要決定設立清楚的標準與截止日。',水:'固定留時間吸收不同來源的資訊與觀點。'};
const strengthShort={身偏強:'能量較足，習慣自己扛',身偏弱:'能量較收斂，適合借力',中和:'強弱平衡，彈性最大'};
const luckThemeByGod={比劫:'自主權、同儕網絡與新團隊',食傷:'作品輸出、創新與個人品牌',財星:'客戶、商務與資源變現',官殺:'職位責任、制度與領導機會',印星:'進修、證照、導師與知識資產'};
const luckActionByGod={比劫:'先界定權責，再擴大合作',食傷:'以可見作品持續驗證市場',財星:'用數字管理資源與報酬',官殺:'承擔前先確認授權和標準',印星:'把學習轉成可交付成果'};
const luckWarningByGod={比劫:'避免因比較或義氣做決定',食傷:'避免表達過快而忽略規範',財星:'避免成果壓力侵蝕長期節奏',官殺:'避免把高壓視為唯一成長方式',印星:'避免準備太久卻沒有實際輸出'};
const financeByGod={
 比劫:'比起精算報表，你更習慣憑感覺與行動力累積資源；建議設一個自動化的強制儲蓄機制，避免衝動消費侵蝕本金。',
 食傷:'收入常跟著作品、專案或創意輸出波動；建議準備至少半年的生活緩衝金，讓你等待下一個機會時不必倉促妥協。',
 財星:'你對數字與交換價值敏感，理財紀律通常不是問題；真正的風險是把太多精力放在賺錢，忽略對長期關係與健康的投資。',
 官殺:'穩定與制度感是你的財務優勢，適合長期、規則明確的累積方式；避免只因責任感就承擔超出能力的財務壓力或保證。',
 印星:'你習慣先研究透徹再行動，理財上不容易衝動；但也別因為想得太周全而一直觀望，分批進場比完全不進場更有累積效果。'
};
const relationsByGod={
 比劫:{copy:'在關係裡，你重視「對等」勝過「浪漫」：比起被追求，你更想被當成勢均力敵的夥伴。伴侶若也能有自己的重心與空間，這段關係反而走得更穩。',cards:[['相處優勢','平等對待','不會用情緒勒索或道德綁架控制對方，也讓人感覺被尊重。'],['常見摩擦','較量心','意見不合時，先分清楚你們是在討論事情，還是在爭輸贏。'],['愛情訊號','各自留白','感情穩定不代表要隨時黏在一起，保有各自生活反而更持久。'],['邊界提醒','少比較','避免拿伴侶和別人比較來激勵對方，這容易被解讀成不被珍惜。']]},
 食傷:{copy:'你習慣用表達與行動證明在乎：一句「我幫你想了辦法」，往往比甜言蜜語更接近你的愛。但關係裡有時對方要的不是解法，而是先被聽懂。',cards:[['相處優勢','坦率真誠','你不太演，對方通常能感覺到你的情緒是真的。'],['常見摩擦','說得比聽得多','先問「你想要我聽，還是一起想辦法？」，再決定要不要給建議。'],['愛情訊號','用行動示愛','記得對方說過的小事、幫忙處理實際問題，比說「我愛你」更有份量。'],['邊界提醒','拿捏分寸','熱度上來時容易把話說得太滿，重要承諾先放一晚再說出口。']]},
 財星:{copy:'你的愛常展現在「務實照顧」上：記得對方的行程、幫忙處理雜事、把生活打理好。你不太擅長說甜言蜜語，但對方過得好不好，你其實都放在心上。',cards:[['相處優勢','務實付出','你會把承諾落實成具體行動，而不只是說說而已。'],['常見摩擦','以成果衡量感情','關係不是專案，不需要每次付出都要看見對等回報。'],['愛情訊號','安全感來自穩定','比起浪漫驚喜，你更容易靠「說到做到」讓人安心。'],['邊界提醒','留時間給關係','別把所有精力都給了工作與目標，記得排時間單獨相處。']]},
 官殺:{copy:'你對關係有一份責任感：一旦認定，就會認真扛起承諾與角色。但也容易不自覺把「標準」帶進感情，讓親密關係變得像在被檢視。',cards:[['相處優勢','值得託付','你說到的事會盡力做到，是能被長期依靠的人。'],['常見摩擦','標準內化過高','試著把「應該」換成「我們可以怎麼調整」。'],['愛情訊號','用行動守護','保護與承擔是你的表達方式，記得偶爾也說出口。'],['邊界提醒','放下評分心態','親密關係不是考核，允許彼此都有不完美的狀態。']]},
 印星:{copy:'你需要精神上的共鳴：能聊得深、能被理解，比表面的浪漫更讓你有安全感。但想得太多、太早在腦中預演結局，有時反而讓你卻步。',cards:[['相處優勢','深度陪伴','你願意花時間真正了解對方，而不只是停留在表面。'],['常見摩擦','想太多','有疑慮時，直接問對方，比自己在腦中演練十種劇本更有效。'],['愛情訊號','需要被理解','比起解決問題，你更希望對方先聽懂你在意什麼。'],['邊界提醒','練習先行動','等到「想清楚」才願意投入，容易錯過關係自然發展的時機。']]}
};
const healthByGod={
 比劫:{copy:'你的體力與行動力通常不差，容易靠「衝一波」撐過高壓期，但長期下來恢復速度會跟不上消耗速度。規律運動能幫你釋放好勝心帶來的緊繃，而不是把它憋在心裡。',cards:[['每日','固定活動時段','把運動排進行事曆，而不是等有空才做。'],['每週','有對手的運動','球類、競速類活動能健康地釋放好勝心。'],['壓力訊號','煩躁易怒','出現這個訊號時，先離開現場動一動，再回來討論。'],['專業協助','別硬撐','若持續失眠或情緒起伏大，及早尋求專業協助。']]},
 食傷:{copy:'靈感來的時候，你容易忽略時間、熬夜把想法做完，長期會打亂作息節奏。你的身體需要的不是完全停下創造力，而是替它加上一個固定的收尾時間。',cards:[['每日','設定收工時間','靈感再多，也給自己一個上限時間收尾。'],['每週','安排無輸出日','留一天完全不追進度，讓神經系統真正休息。'],['壓力訊號','坐不住、易分心','代表能量需要出口，先安排一次短暫的身體活動。'],['專業協助','留意睡眠品質','長期日夜顛倒建議諮詢專業評估作息調整方式。']]},
 財星:{copy:'你容易用「有沒有成果」衡量今天過得好不好，休息時反而會有罪惡感。但身體不會分辨忙碌是不是有意義，它只認得有沒有恢復。刻意把休息也排進計畫裡，才不會被無限延後。',cards:[['每日','把休息排進行程','像排會議一樣，把休息時段寫進行事曆。'],['每週','離開螢幕的活動','散步、烹飪等不產出數字的活動能平衡追求成果的慣性。'],['壓力訊號','身體先於情緒發出警訊','肩頸緊繃、腸胃不適常是過勞的早期訊號。'],['專業協助','定期健康檢查','把健康也當成一項需要維護的長期資產。']]},
 官殺:{copy:'責任感讓你習慣把壓力留給自己扛，久了容易長期處在「隨時備戰」的緊繃狀態。你需要的不是逼自己更有紀律，而是刻意練習「放下也沒關係」。',cards:[['每日','刻意的放鬆練習','深呼吸、伸展或短暫冥想，打斷長期緊繃的慣性。'],['每週','不被打擾的休假時段','關掉通知，練習真正離線的休息。'],['壓力訊號','肩頸僵硬、淺眠','是身體在提醒你已經超載一段時間了。'],['專業協助','別把撐住當唯一選項','長期壓力累積建議尋求專業紓壓或心理支持。']]},
 印星:{copy:'你的大腦很少真正關機，睡前容易還在反覆推演白天的事。真正影響睡眠品質的，往往不是想得不夠周全，而是想得太多。',cards:[['每日','睡前書寫清單','把腦中盤旋的念頭寫下來，而不是留在腦中運轉。'],['每週','安排單純的體力活動','走路、家務等不需要思考的活動能讓大腦真正休息。'],['壓力訊號','入睡困難、多夢','代表白天累積的思緒還沒被安放。'],['專業協助','持續失眠及早求助','超過兩週的睡眠困擾建議諮詢專業協助。']]}
};
function solarMonthInfo(y,m,d){
 const cut=[0,6,4,6,5,6,6,7,8,8,8,7,7],branchBefore=[0,0,1,2,3,4,5,6,7,8,9,10,11];
 const b=d>=cut[m]?mod(branchBefore[m]+1,12):branchBefore[m];
 const solarYear=(m<2||(m===2&&d<4))?y-1:y;
 return{branch:b,solarYear:solarYear,nearTerm:Math.abs(d-cut[m])<=1};
}
function getPillars(date,time){
 const a=date.split('-').map(Number),t=time.split(':').map(Number);
 const solar=Solar.fromYmdHms(a[0],a[1],a[2],t[0],t[1],0),lunar=solar.getLunar(),eight=lunar.getEightChar();
 const labels=['年柱','月柱','日柱','時柱'],values=[eight.getYear(),eight.getMonth(),eight.getDay(),eight.getTime()];
 const result=values.map(function(v,i){return{label:labels[i],s:stems.indexOf(v[0]),b:branches.indexOf(v[1])}});
 if(result.some(function(p){return p.s<0||p.b<0}))throw new Error('四柱排盤失敗');
 const previous=lunar.getPrevJie().getSolar(),next=lunar.getNextJie().getSolar();
 result.nearTerm=Math.min(Math.abs(solar.subtract(previous)),Math.abs(next.subtract(solar)))<=1;
 result.solar=solar;result.eight=eight;return result;
}
function tenGod(dayStem,otherStem){
 if(dayStem===otherStem)return'比肩';
 const dayEl=stemEls[dayStem],otherEl=stemEls[otherStem],di=elementCycle.indexOf(dayEl),oi=elementCycle.indexOf(otherEl),samePolarity=dayStem%2===otherStem%2,rel=mod(oi-di,5);
 if(rel===0)return samePolarity?'比肩':'劫財';
 if(rel===1)return samePolarity?'食神':'傷官';
 if(rel===2)return samePolarity?'偏財':'正財';
 if(rel===3)return samePolarity?'七殺':'正官';
 return samePolarity?'偏印':'正印';
}
function godGroup(name){if(['比肩','劫財'].includes(name))return'比劫';if(['食神','傷官'].includes(name))return'食傷';if(['偏財','正財'].includes(name))return'財星';if(['七殺','正官'].includes(name))return'官殺';return'印星'}
function seasonName(b){if([2,3,4].includes(b))return'春天（木氣當旺）';if([5,6,7].includes(b))return'夏天（火氣當旺）';if([8,9,10].includes(b))return'秋天（金氣當旺）';return'冬天（水氣當旺）'}
function analyzeChart(ps){
 const counts={木:0,火:0,土:0,金:0,水:0},gods={比劫:0,食傷:0,財星:0,官殺:0,印星:0},day=ps[2].s,master=stemEls[day],monthB=ps[1].b;
 const seasonEl=[2,3,4].includes(monthB)?'木':[5,6,7].includes(monthB)?'火':[8,9,10].includes(monthB)?'金':'水';
 const si=elementCycle.indexOf(seasonEl),multipliers={};elementCycle.forEach(function(el,i){const diff=mod(i-si,5);multipliers[el]=[1.45,1.12,.88,.68,.95][diff]});
 ps.forEach(function(p,index){
  counts[stemEls[p.s]]+=1*multipliers[stemEls[p.s]];if(index!==2)gods[godGroup(tenGod(day,p.s))]+=1;
  hiddenStems[p.b].forEach(function(h,j){const w=hiddenWeights[j]||0.1;counts[stemEls[h]]+=w*multipliers[stemEls[h]];gods[godGroup(tenGod(day,h))]+=w});
 });
 const total=Object.values(counts).reduce(function(a,b){return a+b},0),resource=elementCycle[mod(elementCycle.indexOf(master)-1,5)],support=(counts[master]+counts[resource])/total,roots=ps.filter(function(p){return hiddenStems[p.b].some(function(h){return stemEls[h]===master})}).length;
 const strengthScore=support+(roots>=2?.05:roots===0?-.04:0),strength=strengthScore>.53?'身偏強':strengthScore<.39?'身偏弱':'中和';
 const dominant=Object.entries(gods).sort(function(a,b){return b[1]-a[1]})[0][0],sortedEls=Object.entries(counts).sort(function(a,b){return b[1]-a[1]});
 const mi=elementCycle.indexOf(master),balance=strength==='身偏強'?elementCycle[mod(mi+(counts[elementCycle[mod(mi+1,5)]]<=counts[elementCycle[mod(mi+2,5)]]?1:2),5)]:strength==='身偏弱'?resource:sortedEls[sortedEls.length-1][0];
 const interactions=[],clashes=[[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]],combines=[[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
 for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const pair=[ps[i].b,ps[j].b];if(clashes.some(function(x){return x.every(function(v){return pair.includes(v)})}))interactions.push(pillarRoles[i]+'與'+pillarRoles[j]+'有「'+branches[ps[i].b]+branches[ps[j].b]+'沖」：變動會逼出調整能力');else if(combines.some(function(x){return x.every(function(v){return pair.includes(v)})}))interactions.push(pillarRoles[i]+'與'+pillarRoles[j]+'形成「'+branches[ps[i].b]+branches[ps[j].b]+'合」：擅長透過連結與協調整合資源')}
 if(!interactions.length)interactions.push('原局地支沒有明顯六合或六沖：做事較依靠自身節奏，重大變化通常來自大運觸發');
 return{counts:counts,gods:gods,master:master,resource:resource,support:support,roots:roots,strength:strength,dominant:dominant,strong:sortedEls[0][0],weak:sortedEls[sortedEls.length-1][0],balance:balance,season:seasonName(monthB),interactions:interactions};
}
function refinedStrengths(profile,chart){
 const extra=groupData[chart.dominant].talents;
 return[profile.skills[0]+'：'+(chart.strength==='身偏弱'?'善用資訊與合作放大成果':'能自行建立節奏並持續推進'),profile.skills[1]+'：在'+groupData[chart.dominant].label+'場景中特別容易被看見',extra[0],extra[1]];
}
function refinedRisks(profile,chart){
 const stateRisk=chart.strength==='身偏強'?'自我驅動充足，但要防止只用熟悉方式硬推':'感受環境與他人要求較快，需要避免把主導權全部交出去';
 return[profile.risks[0],profile.risks[1],groupData[chart.dominant].risk,stateRisk];
}
function buildReading(input){
 const ps=getPillars(input.date,input.time),chart=analyzeChart(ps),day=ps[2].s,sp=stemProfiles[day],profile=profiles[chart.master],max=Math.max.apply(null,Object.values(chart.counts));
 fill('#report-name',input.name?input.name.replace(/[<>]/g,'')+'的':'你的');fill('#birth-summary',input.date.replaceAll('-','.')+' · '+input.time+' · '+document.querySelector('#place').selectedOptions[0].textContent);
 fill('#day-master',stems[day]+chart.master);fill('#day-trait',(day%2===0?'陽':'陰')+chart.master+' · '+sp.image.split(' · ')[1]);
 fill('#pillars',ps.map(function(p,i){const hidden=hiddenStems[p.b].map(function(h){return stems[h]}).join('、'),god=i===2?'日主':tenGod(day,p.s);return'<div class="pillar"><small>'+p.label+' · '+god+'</small><b>'+stems[p.s]+branches[p.b]+'</b><span>'+stemEls[p.s]+' · '+branchEls[p.b]+'</span><em>藏干 '+hidden+'</em></div>'}).join(''));
 fill('#calculation-note','排盤已依你填寫的出生地時間與正確的節氣日期換算，晚上 11 點後算隔天的子時。'+(ps.nearTerm?'你的出生時間剛好卡在節氣交替前後，如果對出生地或時間不太確定，建議再次確認，結果可能會受影響。':'')+' 以下的強弱判斷與文字說明，是本站設計的解讀方式，提供一個思考角度，不是絕對的命理定論。');
 fill('#element-chart',Object.entries(chart.counts).map(function(x){const value=Math.round(x[1]*10)/10;return'<div class="element-bar" style="--value:'+(18+x[1]/max*72)+'%;--color:'+colors[x[0]]+'"><i></i><b>'+value+'</b><span><span class="element-icon" style="color:'+colors[x[0]]+'">'+elementIcons[x[0]]+'</span>'+x[0]+'</span></div>'}).join(''));
 fill('#element-insight','你出生在'+chart.season+'，五個元素裡「'+chart.strong+'」的力量最明顯，代表你很容易自然而然動用它。綜合季節與整張命盤來看，你的命盤屬於「'+chart.strength+'」（'+strengthShort[chart.strength]+'）。這不是「好」或「不好」的評分，比較像是體質：'+chart.balance+'（'+profiles[chart.balance].trait+'）目前比較少，是平常可以多留意、刻意補一點的方向，並不是缺陷。');
 fill('#core-quote',sp.core+' 你的命盤又以「'+chart.dominant+'（'+groupData[chart.dominant].label+'）」的力量最重，所以這項特質最常出現在'+groupData[chart.dominant].label+'相關的場合。');
 fill('#core-tags',[sp.image,chart.strength,chart.dominant+'主導'].map(function(x){return'<span>'+x+'</span>'}).join(''));
 fill('#structure-summary','<div class="structure-chip"><small>出生季節</small><b>'+chart.season+'</b></div><div class="structure-chip"><small>先天強弱</small><b>'+chart.strength+'（'+strengthShort[chart.strength]+'）</b></div><div class="structure-chip"><small>性格主軸</small><b>'+chart.dominant+' · '+groupData[chart.dominant].label+'</b></div>');
 fill('#strength-list',refinedStrengths(sp,chart).map(function(x){return'<li>'+x+'</li>'}).join(''));fill('#weakness-list',refinedRisks(sp,chart).map(function(x){return'<li>'+x+'</li>'}).join(''));
 const godMax=Math.max.apply(null,Object.values(chart.gods));fill('#ten-god-chart',Object.entries(chart.gods).map(function(x){return'<div class="god-row"><span>'+x[0]+'</span><div class="god-track"><i style="--god:'+Math.round(x[1]/godMax*100)+'%"></i></div><b>'+x[1].toFixed(1)+'</b></div>'}).join(''));
 const evidence=['你的出生月份是「'+branches[ps[1].b]+'」月，屬於'+chart.season+'——這是判斷命盤強弱時的季節背景。','你的日主是'+stems[day]+chart.master+'，四個地支裡有 '+chart.roots+' 個能替它撐腰；同類和能生助它的力量，合計約占整體的 '+Math.round(chart.support*100)+'%，這是判斷「'+chart.strength+'」的主要依據。','把整張命盤都算進去之後，「'+chart.dominant+'（'+groupData[chart.dominant].label+'）」的份量最重，所以解讀會偏向這個方向。'].concat(chart.interactions);
 fill('#evidence-list',evidence.map(function(x){return'<li>'+x+'</li>'}).join(''));
 fill('#talent-list',refinedStrengths(sp,chart).concat(['最適合你補強的能力：'+profiles[chart.balance].trait+'，可以用來平衡「'+chart.dominant+'（'+groupData[chart.dominant].label+'）」用過頭的狀況。']).map(function(x){return'<li>'+x+'</li>'}).join(''));
 fill('#life-copy','你的機會不是泛泛的「多嘗試」，而是把「'+sp.skills[0]+'」用在需要'+groupData[chart.dominant].label+'的情境。以「'+chart.strength+'」（'+strengthShort[chart.strength]+'）來說，你'+(chart.strength==='身偏強'?'可以主動創造局面，但也要刻意練一點「'+chart.balance+'（'+profiles[chart.balance].trait+'）」，來疏通過度集中的狀態':'更適合借助平台、導師與既有資源起步，再逐步取得主導權')+'。');
 fill('#career-copy','職涯上最能形成差異化的組合是「'+sp.skills[0]+' × '+groupData[chart.dominant].talents[0]+'」。比起只看產業名稱，更應檢查工作是否讓你運用這兩項能力；若長期只要求你做'+profiles[chart.balance].trait+'之外的單一反應，容易感到耗損。');
 fill('#risk-copy','這張命盤的風險不是固定缺點，而是「'+chart.dominant+'（'+groupData[chart.dominant].label+'）」用過頭了。具體表現為：'+groupData[chart.dominant].risk+'。再加上'+sp.risks[0]+'，重要選擇前不妨刻意做一件「'+chart.balance+'（'+profiles[chart.balance].trait+'）」屬性的小事來提醒自己踩煞車，例如：'+balancePractice[chart.balance]);
 fill('#life-cards',advice('機會點','放大'+groupData[chart.dominant].label,groupData[chart.dominant].talents[2])+advice('行動鍵','善用你的主力','把「'+sp.skills[0]+'」直接用在目前最需要突破的場景，而不是等準備更周全。')+advice('補強點','練習'+profiles[chart.balance].trait,balancePractice[chart.balance])+advice('關鍵詞','參考命局動力',chart.interactions[0]));
 fill('#career-cards',advice('工作型態',sp.skills[0],'找一個能持續運用「'+sp.skills[0]+'」的位置，比職稱名稱更重要。')+advice('決策法',chart.strength==='身偏強'?'設定停損點':'借力而為',chart.strength==='身偏強'?'重要決策前先寫下上限、下限與回顧日期，避免只靠一股衝勁硬推到底。':'重要決策前先寫下上限、下限與回顧日期，同時主動尋求導師、平台或夥伴支持再出手。')+advice('財務節奏','量身理財策略',financeByGod[chart.dominant])+advice('成長策略','建立可攜專長','把「'+sp.skills[1]+'」練成一項能跨公司、跨產業使用的核心能力，而不只依附單一職位。'));
 const rel=relationsByGod[chart.dominant],hea=healthByGod[chart.dominant],spouseLine=chart.interactions.find(function(x){return x.indexOf('自我／伴侶模式')>-1});
 fill('#relations-copy',rel.copy+(spouseLine?' 從命盤來看，'+spouseLine+'，這類變動很可能會直接反映在感情或伴侶關係裡。':''));
 fill('#relations-cards',rel.cards.map(function(c){return advice(c[0],c[1],c[2])}).join(''));
 fill('#health-copy',hea.copy);
 fill('#health-cards',hea.cards.map(function(c){return advice(c[0],c[1],c[2])}).join(''));
 fill('#risk-cards',advice('體質傾向','慣性風險',sp.risks[0])+advice('思考盲點','視角風險',sp.risks[1])+advice('本階段風險',chart.dominant+'（'+groupData[chart.dominant].label+'）用過頭',groupData[chart.dominant].risk)+advice('防護機制','事前清單','重大決定前先寫下成功標準、最大成本與退出條件，並找一位敢對你說不同意見的人。'));
 const currentCycle=buildLuck(ps,input.date,input.time,input.gender,chart);buildBenefactor(chart.balance);
 return{pillars:ps.map(function(p){return stems[p.s]+branches[p.b]}),dayMaster:stems[day]+chart.master,strongElement:chart.strong,balancingElement:chart.balance,dayStrength:chart.strength,dominantTenGod:chart.dominant,skills:sp.skills,risks:sp.risks,currentCycle:currentCycle};
}
function approximateLuckStart(date,forward){
 const a=date.split('-').map(Number),base=Date.UTC(a[0],a[1]-1,a[2]),cuts=[[1,6],[2,4],[3,6],[4,5],[5,6],[6,6],[7,7],[8,8],[9,8],[10,8],[11,7],[12,7]],points=[];
 for(let y=a[0]-1;y<=a[0]+1;y++)cuts.forEach(function(c){points.push(Date.UTC(y,c[0]-1,c[1]))});
 const target=forward?Math.min.apply(null,points.filter(function(x){return x>base})):Math.max.apply(null,points.filter(function(x){return x<base}));
 return Math.max(1,Math.min(10,Math.abs(target-base)/86400000/3));
}
function branchLink(branch,natal){
 const clash={0:6,1:7,2:8,3:9,4:10,5:11,6:0,7:1,8:2,9:3,10:4,11:5},combine={0:1,1:0,2:11,11:2,3:10,10:3,4:9,9:4,5:8,8:5,6:7,7:6};
 if(natal.includes(branch))return'與原局同支，熟悉議題會被放大';
 if(natal.includes(clash[branch]))return'沖動原局，環境或角色較容易變動';
 if(natal.includes(combine[branch]))return'與原局有合，合作與資源整合機會增加';
 return'與原局互動平穩，成果更依賴主動經營';
}
function buildLuck(ps,date,time,gender,chart){
 const birthYear=Number(date.slice(0,4)),day=ps[2].s,yang=ps[0].s%2===0,forward=gender==='other'?true:(gender==='male')===yang,natal=ps.map(function(p){return p.b});
 const yun=ps.eight.getYun(gender==='other'?(yang?1:0):(gender==='male'?1:0),2),startSolar=yun.getStartSolar(),startDate=startSolar.toYmdHms(),startAge=(Date.UTC(startSolar.getYear(),startSolar.getMonth()-1,startSolar.getDay())-Date.UTC(birthYear,Number(date.slice(5,7))-1,Number(date.slice(8,10))))/31557600000;
 fill('#luck-start','約在 '+startAge.toFixed(1)+' 歲、'+startDate.slice(0,16)+' 前後，開始進入你的第一步十年大運'+(gender==='other'?'（未指定性別時，暫以較常見的方向示意，請勿當作精準定盤）':'')+'。實際起算時間仍會受流派與出生地時差影響，僅供參考。');
 let html='',currentCycle=null;
 const cycles=yun.getDaYun(9).slice(1);
 for(let i=0;i<cycles.length;i++){const cycle=cycles[i],gz=cycle.getGanZhi(),s=stems.indexOf(gz[0]),b=branches.indexOf(gz[1]),god=godGroup(tenGod(day,s)),link=branchLink(b,natal),current=new Date().getFullYear()>=cycle.getStartYear()&&new Date().getFullYear()<=cycle.getEndYear(),helpful=(chart.strength==='身偏弱'&&['比劫','印星'].includes(god))||(chart.strength==='身偏強'&&['食傷','財星','官殺'].includes(god)),tone=helpful?'順勢開展':god===chart.dominant?'主題加倍':'調整鍛鍊';
  html+='<div class="cycle '+(current?'current':'')+'"><small>'+cycle.getStartYear()+'—'+cycle.getEndYear()+'</small><b>'+gz+'</b><span>'+cycle.getStartAge()+'—'+cycle.getEndAge()+' 虛歲'+(current?' · 當前':'')+'</span><div class="cycle-tone">'+tone+' · '+god+'</div><p>這十年主要圍繞著'+luckThemeByGod[god]+'；'+link+'。</p><ul><li>'+luckActionByGod[god]+'</li><li>'+luckWarningByGod[god]+'</li></ul></div>';
  if(current)currentCycle={ganzhi:gz,god:god,tone:tone,startYear:cycle.getStartYear(),endYear:cycle.getEndYear(),startAge:cycle.getStartAge(),endAge:cycle.getEndAge()};
 }
 fill('#luck-timeline',html);
 return currentCycle;
}
