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
function openResultView(view){
 document.querySelector('#report-eyebrow').textContent={chart:'命盤結果 · PERSONAL READING',game:'角色遊戲 · LIFE SIMULATION',daily:'每日運勢 · DAILY FORTUNE',numgua:'數字易經 · NUMBER YI JING'}[view];
 document.querySelector('#chart-view').hidden=view!=='chart';
 document.querySelector('#game-view').hidden=view!=='game';
 document.querySelector('#daily-view').hidden=view!=='daily';
 document.querySelector('#numgua-view').hidden=view!=='numgua';
 if(view==='game'){
  document.querySelector('#game-picker').hidden=false;
  document.querySelector('#lifegame').hidden=true;
  document.querySelector('#lifegame-start').hidden=false;
  document.querySelector('#lifegame-play').hidden=true;
 }
 window.scrollTo({top:0,behavior:'smooth'});
}
function showReport(input){const result=buildReading(input);currentReading=result;document.querySelector('.workbench').hidden=true;document.querySelector('.preview-strip').hidden=true;document.querySelector('#compatibility').hidden=true;document.querySelector('#report').hidden=false;if(result.numericGua&&result.numericGua.mainGua){const guaCircle=document.querySelector('#main-gua-circle');document.querySelector('#gua-number').textContent=result.numericGua.mainGua.num;document.querySelector('#gua-label').textContent=result.numericGua.mainGua.name;guaCircle.hidden=false}openResultView('chart');return result}
document.querySelector('#choose-game').addEventListener('click',function(){openResultView('game')});
document.querySelector('#choose-daily').addEventListener('click',function(){renderDailyFortune();openResultView('daily')});
document.querySelector('#daily-back').addEventListener('click',function(){openResultView('chart')});
document.querySelector('#choose-numgua').addEventListener('click',function(){renderNumericYijing();openResultView('numgua')});
document.querySelector('#numgua-back').addEventListener('click',function(){openResultView('chart')});
document.querySelector('#choose-compatibility').addEventListener('click',function(){document.querySelector('#report').hidden=true;document.querySelector('.workbench').hidden=false;document.querySelector('.preview-strip').hidden=false;document.querySelector('#compatibility').hidden=false;document.querySelector('#compatibility-return').hidden=false;document.querySelector('#compatibility').scrollIntoView({behavior:'smooth',block:'start'})});
document.querySelector('#nav-compatibility').addEventListener('click',function(event){event.preventDefault();document.querySelector('#report').hidden=true;document.querySelector('.workbench').hidden=false;document.querySelector('.preview-strip').hidden=false;document.querySelector('#compatibility').hidden=false;document.querySelector('#compatibility-return').hidden=false;document.querySelector('#compatibility').scrollIntoView({behavior:'smooth',block:'start'})});
document.querySelector('#compatibility-return').addEventListener('click',function(){document.querySelector('#report').hidden=false;document.querySelector('.workbench').hidden=true;document.querySelector('.preview-strip').hidden=true;document.querySelector('#compatibility').hidden=true;openResultView('chart')});
document.querySelector('#game-back').addEventListener('click',function(){openResultView('chart')});
const gameGallery=document.querySelector('#ip-gallery');if(gameGallery)gameGallery.addEventListener('click',function(event){
 const button=event.target.closest('button[data-ip]');
 if(!button||!currentReading)return;
 const chosen=BaziIps.profiles.find(function(p){return p.id===button.dataset.ip});
 if(!chosen)return;
 currentReading.character=chosen;
 BaziIps.render(currentReading.characterMatch,chosen.id);
});
document.querySelector('#birth-form').addEventListener('submit',function(event){event.preventDefault();const input={name:document.querySelector('#name').value.trim(),date:document.querySelector('#birth-date').value,time:document.querySelector('#birth-time').value,gender:document.querySelector('#gender').value};if(!input.date||!input.time)return;const button=event.currentTarget.querySelector('button');button.firstElementChild.textContent='正在排列命盤…';button.disabled=true;setTimeout(function(){showReport(input);button.firstElementChild.textContent='生成我的命盤分析';button.disabled=false},550)});
document.querySelector('#back-button').addEventListener('click',function(){document.querySelector('#report').hidden=true;document.querySelector('.workbench').hidden=false;document.querySelector('.preview-strip').hidden=false;document.querySelector('#compatibility').hidden=false;window.scrollTo({top:0,behavior:'smooth'})});
document.querySelectorAll('.report-tabs button').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.report-tabs button').forEach(function(x){x.classList.toggle('active',x===btn)});document.querySelectorAll('.tab-panel').forEach(function(x){x.classList.toggle('active',x.dataset.panel===btn.dataset.tab)})})});
function registerWebMCP(){const context=document.modelContext;if(!context||!context.registerTool)return;try{Promise.resolve(context.registerTool({name:'generate_bazi_reading',title:'生成八字命盤分析',description:'使用生辰資料產生並顯示五行、特質、人生面向與十年大運的文化參考報告。',inputSchema:{type:'object',properties:{name:{type:'string'},birthDate:{type:'string',pattern:'^\\d{4}-\\d{2}-\\d{2}$'},birthTime:{type:'string',pattern:'^\\d{2}:\\d{2}$'},gender:{type:'string',enum:['female','male','other']}},required:['birthDate','birthTime','gender'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:function(input){if(!/^\d{4}-\d{2}-\d{2}$/.test(input.birthDate)||!/^\d{2}:\d{2}$/.test(input.birthTime))throw new Error('生日或時間格式不正確');document.querySelector('#name').value=input.name||'';document.querySelector('#birth-date').value=input.birthDate;document.querySelector('#birth-time').value=input.birthTime;document.querySelector('#gender').value=input.gender;return showReport({name:input.name||'',date:input.birthDate,time:input.birthTime,gender:input.gender})}})).catch(function(){})}catch(e){}}
registerWebMCP();

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
/* 每日運勢：用當天真實干支對照日主算出今天的十神，再套用本站既有的五組解讀；方位與吉凶取自排盤引擎內建的黃曆資料。 */
const shengxiao=['鼠','牛','虎','兔','龍','蛇','馬','羊','猴','雞','狗','豬'];
const dailyGoodLuckLine={順勢開展:'這類日子特別適合順勢而為，投入的努力比較容易比預期更快看到成果。',主題加倍:'今天效果容易被放大——選對方向會加速，選錯方向也會更快看到代價，重要決定前多想一步。',調整鍛鍊:'今天比較像調整期，步調放慢一點、把基本功顧好，比急著衝刺更划算。'};
function normalizePosition(s){return String(s||'').replace(/东/g,'東')}
function dailyStars(tianShenLuck,helpful,dayStrength){
 let n=3;
 n+=tianShenLuck==='吉'?1:-1;
 n+=dayStrength==='中和'?1:(helpful?1:-1);
 return Math.max(1,Math.min(5,n));
}
function buildDailyFortune(reading,now){
 now=now||new Date();
 const solar=Solar.fromYmd(now.getFullYear(),now.getMonth()+1,now.getDate()),lunar=solar.getLunar();
 const dayGZ=lunar.getDayInGanZhi(),todayStemIdx=stems.indexOf(dayGZ[0]),todayBranchIdx=branches.indexOf(dayGZ[1]);
 const god=tenGod(reading.dayStemIndex,todayStemIdx),group=godGroup(god);
 const tianShenLuck=lunar.getDayTianShenLuck();
 const helpful=(reading.dayStrength==='身偏弱'&&['比劫','印星'].includes(group))||(reading.dayStrength==='身偏強'&&['食傷','財星','官殺'].includes(group));
 const tone=helpful?'順勢開展':group===reading.dominantTenGod?'主題加倍':'調整鍛鍊';
 return{
  dateLabel:now.getFullYear()+'/'+String(now.getMonth()+1).padStart(2,'0')+'/'+String(now.getDate()).padStart(2,'0'),
  ganzhi:dayGZ,shengxiao:shengxiao[mod(todayBranchIdx,12)],chongAnimal:shengxiao[mod(todayBranchIdx+6,12)],
  god:god,group:group,tone:tone,tianShenLuck:tianShenLuck,
  caiPos:normalizePosition(lunar.getDayPositionCaiDesc()),
  xiPos:normalizePosition(lunar.getDayPositionXiDesc()),
  guiPos:normalizePosition(lunar.getDayPositionYangGuiDesc())+'／'+normalizePosition(lunar.getDayPositionYinGuiDesc()),
  stars:dailyStars(tianShenLuck,helpful,reading.dayStrength)
 };
}
function renderDailyFortune(){
 if(!currentReading)return;
 const df=buildDailyFortune(currentReading),group=df.group,stars='★'.repeat(df.stars)+'☆'.repeat(5-df.stars);
 fill('#daily-fortune','<div class="daily-head"><div><small>'+df.dateLabel+' · '+df.ganzhi+'日</small><h3>今天對你來說，是「'+df.god+'（'+groupData[group].label+'）」的日子</h3><p>值日星判斷屬於「'+df.tianShenLuck+'」，整體走勢偏向「'+df.tone+'」。</p></div><div class="daily-stars" aria-label="今日星等 '+df.stars+' 顆星">'+stars+'</div></div>'+'<div class="advice-cards">'+advice('今日宜做什麼','把握「'+groupData[group].label+'」的節奏',luckActionByGod[group])+advice('有什麼好運','今天環繞的主題：'+luckThemeByGod[group],dailyGoodLuckLine[df.tone])+advice('身體健康須注意',groupData[group].label+'型的體質提醒',healthByGod[group].copy)+advice('事業發展需注意','避免「'+group+'」用過頭',luckWarningByGod[group]+'；'+groupData[group].risk)+advice('貴人運','貴人方位：'+df.guiPos,'今天若遇到具備「'+groupData[group].talents[0]+'」特質的人主動伸出援手，特別把握這個機會。')+advice('財運','財神方位：'+df.caiPos,financeByGod[group])+'</div>'+'<p class="daily-disclaimer">沖'+df.chongAnimal+'肖；喜神方位在'+df.xiPos+'。本頁以你的日主對照今天的干支與排盤引擎內建的黃曆資料產生，僅供文化參考與自我提醒，不是對今天的預言，也不能取代醫療、法律或財務專業建議。</p>');
}
/* 數字易經：先把國曆生辰換算成農曆日期，再用傳統「數字磁場／大遊年」對照表解讀每一組相鄰數字。伏位/生氣/天醫/延年為吉，禍害/六煞/五鬼/絕命為凶；0與5或相同數字一律視為伏位。 */
const numGuaPairs={生氣:[[1,4],[6,7],[3,9],[2,8]],天醫:[[1,3],[6,8],[4,9],[2,7]],延年:[[1,9],[7,8],[3,4],[2,6]],禍害:[[1,7],[2,3],[4,6],[8,9]],六煞:[[1,6],[2,9],[3,8],[4,7]],五鬼:[[1,8],[7,9],[3,6],[2,4]],絕命:[[1,2],[3,7],[4,8],[6,9]]};
const numGuaMeta={
 伏位:{luck:'中性',tag:'蓄勢待發',desc:'代表安穩與固守：事情多半照原本的步調走，不容易出大亂子，但也少有意外的驚喜，適合守成而不是躁進。'},
 生氣:{luck:'吉',tag:'貴人與轉機',desc:'傳統上是八組裡最活躍的一組，代表新的機會、貴人與人氣，適合主動出擊、認識新的人事物。'},
 天醫:{luck:'吉',tag:'健康與財富',desc:'與健康、財富和貴人資源有關，傳統上認為這組數字有助於累積與復原，也常被拿來化解其他凶星。'},
 延年:{luck:'吉',tag:'責任與長久',desc:'代表穩定綿長的力量，與人際關係、婚姻和事業的長期經營有關，適合需要耐心累積的事。'},
 禍害:{luck:'凶',tag:'口舌與衝擊',desc:'傳統上多與口舌是非、小摩擦有關，程度較輕，提醒溝通時多一分耐性。'},
 六煞:{luck:'凶',tag:'矛盾與反覆',desc:'代表猶豫、反覆與人際間的小矛盾，重大決定前建議多給自己一點時間確認。'},
 五鬼:{luck:'凶',tag:'變動與意外',desc:'與突發變動、耗財或人事紛擾有關，傳統上建議這段期間行事更謹慎、多留備案。'},
 絕命:{luck:'凶',tag:'波動最大',desc:'八組裡波動最大的一組，傳統上提醒健康、財務或關係要格外留意風險控管。'}
};
function classifyNumPair(a,b){
 if(a===0||a===5||b===0||b===5||a===b)return'伏位';
 const key=Object.keys(numGuaPairs).find(function(k){return numGuaPairs[k].some(function(p){return(p[0]===a&&p[1]===b)||(p[0]===b&&p[1]===a)})});
 return key||'伏位';
}
function buildNumericYijing(input){
 const a=input.date.split('-').map(Number),t=(input.time||'12:00').split(':').map(Number);
 const solar=Solar.fromYmdHms(a[0],a[1],a[2],t[0]||0,t[1]||0,0),lunar=solar.getLunar();
 const ly=lunar.getYear(),lm=lunar.getMonth(),ld=lunar.getDay(),leap=lm<0,rocYear=Math.abs(ly)-1911;
 const digitsStr=String(Math.abs(rocYear))+String(Math.abs(lm))+String(ld).padStart(2,'0');
 const digits=digitsStr.split('').map(Number),pairs=[];
 for(let i=0;i<digits.length-1;i++)pairs.push({a:digits[i],b:digits[i+1],key:classifyNumPair(digits[i],digits[i+1])});
 const counts={};Object.keys(numGuaMeta).forEach(function(k){counts[k]=0});pairs.forEach(function(p){counts[p.key]++});
 const present=Object.keys(counts).filter(function(k){return counts[k]>0}).sort(function(x,y){return counts[y]-counts[x]});
 const goodKeys=['生氣','天醫','延年','伏位'],badKeys=['禍害','六煞','五鬼','絕命'];
 const goodCount=goodKeys.reduce(function(s,k){return s+counts[k]},0),badCount=badKeys.reduce(function(s,k){return s+counts[k]},0);
 return{lunarLabel:'農曆（民國 '+rocYear+' 年）'+Math.abs(lm)+(leap?'（閏）':'')+' 月 '+ld+' 日',digitsStr:digitsStr,digits:digits,pairs:pairs,counts:counts,present:present,goodCount:goodCount,badCount:badCount};
}
function renderNumericYijing(){
 if(!currentReading)return;
 const input=currentReading.birthInput||{date:'',time:''};
 const ny=buildNumericYijing(input);
 const trail=ny.pairs.map(function(p){const meta=numGuaMeta[p.key];return'<div class="numgua-pair numgua-'+meta.luck+'"><span class="numgua-digits">'+p.a+p.b+'</span><small>'+p.key+'</small></div>'}).join('<span class="numgua-link" aria-hidden="true">→</span>');
 const overall=ny.badCount===0?'這組數字幾乎都落在吉星，屬於比較平順、少波折的組合。':ny.goodCount>=ny.badCount*2?'吉星明顯較多，整體走向偏向平順，遇到的凶星影響也相對有限。':ny.badCount>ny.goodCount?'凶星比重不低，代表這組數字提醒你多一分謹慎，尤其在對應的面向上。':'吉凶星大致參半，好壞都要看你怎麼因應，不是單純的好或壞。';
 fill('#numgua-fortune','<div class="numgua-head"><small>國曆 '+input.date.replaceAll('-','.')+' → '+ny.lunarLabel+'</small><h3>數字組合：'+ny.digitsStr+'</h3><p>'+overall+'</p></div>'+'<div class="numgua-trail">'+trail+'</div>'+'<div class="numgua-service"><p>想得到免費命理解說，請加官方 LINE 中詢問：<a href="https://lin.ee/YmmzSpA" target="_blank" rel="noopener">https://lin.ee/YmmzSpA</a></p></div>'+'<div class="advice-cards">'+ny.present.map(function(k){const meta=numGuaMeta[k];return advice(k+'（'+meta.luck+'）· 出現 '+ny.counts[k]+' 次',meta.tag,meta.desc)}).join('')+'</div>'+'<p class="numgua-disclaimer">數字易經（數字磁場）是把出生農曆日期拆成相鄰兩位數字，對照傳統「大遊年」吉凶表解讀的民俗玩法：伏位、生氣、天醫、延年屬吉，禍害、六煞、五鬼、絕命屬凶；0與5或相同數字一律歸類為伏位。同一天出生換算結果固定不變，僅供文化參考與自我觀察，不是命定的吉凶判斷，也不能取代醫療、法律或財務專業建議。</p>');
}
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
 const character=BaziIps.choose({counts:chart.counts,strength:chart.strength,dayElement:chart.master,dayStemIndex:day,dayMaster:stems[day]+chart.master,stemIndices:ps.map(function(p){return p.s})});
 BaziIps.render(character);
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
 const luck=buildLuck(ps,input.date,input.time,input.gender,chart);buildBenefactor(chart.balance);
 const beastMatch=BaziBeasts.classify(chart),capabilities=BaziBeasts.capabilities(chart);
 const ny=buildNumericYijing(input),mainGua=ny.pairs.length>0?ny.pairs[ny.pairs.length-1]:null;
 const reading={pillars:ps.map(function(p){return stems[p.s]+branches[p.b]}),dayMaster:stems[day]+chart.master,dayStemIndex:day,strongElement:chart.strong,balancingElement:chart.balance,dayStrength:chart.strength,dominantTenGod:chart.dominant,skills:sp.skills,risks:sp.risks,currentCycle:luck.currentCycle,lifeGameStations:luck.stations,character:character.profile,characterMatch:character,beastMatch:beastMatch,capabilities:capabilities,birthInput:{date:input.date,time:input.time},numericGua:{digitsStr:ny.digitsStr,mainGua:mainGua}};
 renderLifeGame(reading);
 return reading;
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
 let html='',currentCycle=null;const stations=[];
 const cycles=yun.getDaYun(9).slice(1);
 for(let i=0;i<cycles.length;i++){const cycle=cycles[i],gz=cycle.getGanZhi(),s=stems.indexOf(gz[0]),b=branches.indexOf(gz[1]),god=godGroup(tenGod(day,s)),link=branchLink(b,natal),current=new Date().getFullYear()>=cycle.getStartYear()&&new Date().getFullYear()<=cycle.getEndYear(),helpful=(chart.strength==='身偏弱'&&['比劫','印星'].includes(god))||(chart.strength==='身偏強'&&['食傷','財星','官殺'].includes(god)),tone=helpful?'順勢開展':god===chart.dominant?'主題加倍':'調整鍛鍊';
  stations.push({ganzhi:gz,god:god,tone:tone,startYear:cycle.getStartYear(),endYear:cycle.getEndYear(),startAge:cycle.getStartAge(),endAge:cycle.getEndAge()});
  html+='<div class="cycle '+(current?'current':'')+'"><small>'+cycle.getStartYear()+'—'+cycle.getEndYear()+'</small><b>'+gz+'</b><span>'+cycle.getStartAge()+'—'+cycle.getEndAge()+' 虛歲'+(current?' · 當前':'')+'</span><div class="cycle-tone">'+tone+' · '+god+'</div><p>這十年主要圍繞著'+luckThemeByGod[god]+'；'+link+'。</p><ul><li>'+luckActionByGod[god]+'</li><li>'+luckWarningByGod[god]+'</li></ul></div>';
  if(current)currentCycle={ganzhi:gz,god:god,tone:tone,startYear:cycle.getStartYear(),endYear:cycle.getEndYear(),startAge:cycle.getStartAge(),endAge:cycle.getEndAge()};
 }
 fill('#luck-timeline',html);
 return{currentCycle:currentCycle,stations:stations};
}

/* 八關雙情境遊戲與命盤分析分開；結果是遊戲分數，不是人生預測。 */
let lifeGameState=null,lifeGameReading=null;
const lifeGameStatLabels=BaziLifeGame.labels;
function gameTradeoff(delta){return Object.keys(delta).map(function(key){const mag=Math.abs(delta[key]),tier=mag>=9?'大幅':mag>=4?'明顯':'些微';return lifeGameStatLabels[key]+' '+tier+(delta[key]>=0?'上升':'下降')}).join(' · ')}
function gameOverallTier(score){return score>=80?'狀態很不錯':score>=65?'穩定前進中':score>=50?'持續累積中':'還在起步'}
function renderLifeGame(reading){
 lifeGameReading=reading;lifeGameState=null;
 const beast=reading.beastMatch.primary.profile,fit=reading.beastMatch.primary.fit;
 fill('#beast-profile','<article class="beast-main" style="--beast-accent:'+beast.accent+'"><small>你的命格獸 · 遊戲符合度 '+fit+'／100</small><div class="beast-symbol" aria-hidden="true">'+beast.icon+'</div><h4>'+beast.name+' · '+beast.role+'</h4><p>'+beast.gift+'</p><div class="beast-tags">'+beast.talents.map(function(x){return'<span>'+x+'</span>'}).join('')+'</div><p class="beast-shadow">需要留意：'+beast.shadow+'</p><small>依五行、十神與強弱的自訂規則計算，不按生肖分配，也不是人格定論。</small></article>');
 document.querySelector('#lifegame').hidden=true;
 document.querySelector('#lifegame-play').hidden=true;
}
function startLifeGame(){
 if(!lifeGameReading)return;
 lifeGameState=BaziLifeGame.create(lifeGameReading);
 document.querySelector('#game-picker').hidden=true;
 document.querySelector('#lifegame').hidden=false;
 document.querySelector('#lifegame-play').hidden=false;
 document.querySelector('#lifegame-stage').hidden=false;
 document.querySelector('#lifegame-result').hidden=true;
 fill('#lifegame-rule','八個關卡循序漸進，每關都有兩張不同情境卡。選一張後會改變精力、關係、財富、成就，一關接著一關累積下去；四項都要<b>明顯站穩</b>才算這一局破圈。走完八關後，會依你的命盤說明這趟旅程比較容易卡住的地方與風險。');
 fill('#lifegame-history','八字決定起始角色，接下來由你選擇。');
 renderLifeGameStage();
 document.querySelector('#lifegame-play').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderLifeGameStats(stats){
 fill('#lifegame-stats',Object.keys(lifeGameStatLabels).map(function(key){return'<div class="lg-stat"><span>'+lifeGameStatLabels[key]+'</span><i><em style="width:'+stats[key]+'%"></em></i></div>'}).join(''));
}
function renderLifeGameStage(){
 const st=lifeGameState,beast=st.reading.beastMatch.primary.profile,stage=BaziLifeGame.stages[st.round];
 fill('#lifegame-progress','<b>第 '+(st.round+1)+'／8 關 · '+stage.name+'</b><span>'+gameOverallTier(BaziLifeGame.score(st.stats))+'</span>');
 fill('#lifegame-board',BaziLifeGame.stages.map(function(item,i){const done=i<st.round,current=i===st.round,tile='<div class="lg-space '+(current?'is-current':done?'is-done':'is-future')+'"><span class="lg-space-icon" aria-hidden="true">'+(done?'✿':'✦')+'</span><small>'+(i+1)+' · '+item.name+'</small>'+(current?'<b aria-label="目前位置">'+beast.icon+'</b>':'')+'</div>',arrow=i<BaziLifeGame.stages.length-1?'<span class="lg-arrow" aria-hidden="true">→</span>':'';return tile+arrow}).join(''));
 document.querySelector('#lifegame-board').style.setProperty('--lg-progress',(st.round/BaziLifeGame.stages.length*100)+'%');
 renderLifeGameStats(st.stats);
 if(st.phase==='choose'){
  fill('#lifegame-stage','<div class="lg-station"><span class="lg-beast-avatar" aria-hidden="true">'+beast.icon+'</span><div><small>命格獸 '+beast.name+' 陪你走這一關 · 第 '+(st.round+1)+'／8 關</small><b>'+stage.name+'</b><p>'+stage.question+'</p></div></div><div class="lg-choices lg-two-cards">'+stage.cards.map(function(card,i){return'<button type="button" data-c="'+i+'"><small>回答 '+['A','B'][i]+'</small><b>'+card.title+'</b><span>'+card.story+'</span></button>'}).join('')+'</div>');
  document.querySelectorAll('#lifegame-stage .lg-choices button').forEach(function(btn){btn.addEventListener('click',function(){BaziLifeGame.choose(st,Number(btn.dataset.c));renderLifeGameStage()})});
 }else if(st.phase==='result'){
  const last=st.history[st.history.length-1];
  fill('#lifegame-stage','<div class="lg-outcome"><span aria-hidden="true">✿</span><small>第 '+last.round+' 關 · '+last.card.title+'</small><h4>這一步，留下了新的變化</h4><p>'+gameTradeoff(last.card.delta)+'。'+(last.resonance?'命格獸共鳴讓「'+lifeGameStatLabels[last.card.focus]+'」再加分。':'這張卡沒有額外共鳴。')+'</p><p>目前整體狀態：'+gameOverallTier(last.average)+'。</p><button type="button" id="lifegame-next">'+(st.round===7?'查看破圈結果':'進入下一關 →')+'</button></div>');
  document.querySelector('#lifegame-next').addEventListener('click',function(){BaziLifeGame.next(st);if(st.phase==='done')finishLifeGame();else renderLifeGameStage()});
 }
}
function finishLifeGame(){
 const st=lifeGameState,result=BaziLifeGame.summary(st);
 document.querySelector('#lifegame-stage').hidden=true;
 fill('#lifegame-progress','<b>八關完成</b><span>'+gameOverallTier(result.score)+'</span>');
 renderLifeGameStats(result.stats);
 const lowest=Object.keys(result.stats).sort(function(a,b){return result.stats[a]-result.stats[b]})[0];
 const suggestions={energy:'未來一週，先留兩段各 30 分鐘不被打擾的休息，再接新的承諾。',relations:'找一位重要的人，約 20 分鐘確認彼此期待，先聽完再給建議。',wealth:'列出目前必要支出與一個可承擔的上限，先保留緩衝再試新計畫。',achievement:'挑一個能在七天完成的小作品，訂交付日並請一人回饋。'};
 const route=result.history.map(function(item){return'<li><span>'+String(item.round).padStart(2,'0')+' · '+item.stage+'</span>'+item.card.title+'</li>'}).join('');
 const dom=st.reading.dominantTenGod,domRisk=groupData[dom].risk,traitRisk=st.reading.risks&&st.reading.risks[0];
 fill('#lifegame-result','<div class="lg-result-head"><span class="lg-ending-icon" aria-hidden="true">'+st.reading.beastMatch.primary.profile.icon+'</span><div><small>你的命格獸：'+st.reading.beastMatch.primary.profile.name+'</small><h4>'+(result.breakout?'✿ 成功破圈！':'☘ 這一局還沒破圈')+'</h4><p>精力、關係、財富、成就四項的整體表現，決定這一局是否算破圈；八關循序漸進、一步接一步累積出這個結果。</p></div></div><div class="lg-result-rules">目前相對較弱的是「'+lifeGameStatLabels[lowest]+'」。這只是遊戲設定的高低，不代表你的真實能力。</div><h5>你的卡點與風險</h5><p>對照命盤，你的性格主軸是「'+dom+'（'+groupData[dom].label+'）」，用過頭時常見的卡點是：'+domRisk+'。'+(traitRisk?'再加上你的日主特質，也容易出現：'+traitRisk+'。':'')+'這趟旅程裡「'+lifeGameStatLabels[lowest]+'」比較吃緊，很可能就是這類慣性被放大的地方。</p><h5>給這局的你一個人生建議</h5><p>'+suggestions[lowest]+'</p><h5>八關選擇紀錄</h5><ol class="lg-route">'+route+'</ol><p class="lg-disclaimer">本遊戲以八字作為文化情境與初始角色，分數只供娛樂與自我反思。</p><button type="button" id="lifegame-restart">再玩一次</button>');
 document.querySelector('#lifegame-result').hidden=false;
 document.querySelector('#lifegame-restart').addEventListener('click',startLifeGame);
}
document.querySelector('#lifegame-start').addEventListener('click',startLifeGame);
