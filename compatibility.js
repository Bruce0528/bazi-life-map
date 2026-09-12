function compatibilityEscape(value){return String(value).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function compatibilityCard(title,evidence,reading,action){
 return '<article class="compat-card"><small>'+compatibilityEscape(evidence)+'</small><h3>'+compatibilityEscape(title)+'</h3><p>'+compatibilityEscape(reading)+'</p><div><b>可以這樣做</b><p>'+compatibilityEscape(action)+'</p></div></article>';
}
function compatibilityBranch(a,b){
 const clash={0:6,1:7,2:8,3:9,4:10,5:11,6:0,7:1,8:2,9:3,10:4,11:5};
 const combine={0:1,1:0,2:11,3:10,4:9,5:8,6:7,7:6,8:5,9:4,10:3,11:2};
 if(a===b)return{label:'同支',copy:'彼此對熟悉的事可能有共鳴，也可能在相似的堅持上互不相讓。',action:'爭論時各自先寫下「我願意讓步的一件事」，再交換。'};
 if(clash[a]===b)return{label:'六沖',copy:'日支出現傳統所說的「沖」，可把它當成生活節奏差異的提醒，並不表示不適合。',action:'選一個常爭執的情境，約定誰先決定、何時再回看一次。'};
 if(combine[a]===b)return{label:'六合',copy:'日支有傳統所說的「合」，象徵容易在日常安排上找到共同點；實際默契仍要靠相處驗證。',action:'挑一件兩人都想做的事共同排進行事曆，月底檢查是否都滿意。'};
 return{label:'無直接沖合',copy:'日支沒有直接六沖或六合；關係品質更值得從日常溝通與承諾是否一致觀察。',action:'每週花 15 分鐘各說一件感謝、一件想調整的事。'};
}
const compatibilityChoices={
 money:{steady:'先存足緊急預備金',budget:'共同記帳與預算規劃',independent:'各自保有財務自主',growth:'定期投資長期成長',experience:'願為旅行與體驗花費',family:'優先承擔家庭支出',flexible:'保留彈性與生活品質'},
 values:{steady:'規律作息與居家生活',flexible:'時間彈性與自由安排',growth:'事業成長與新挑戰',family:'家庭陪伴與照顧',social:'朋友社交與群體活動',travel:'旅行探索與新體驗',balance:'健康平衡與慢生活'},
 love:{talk:'有事坦誠直接談',time:'固定相處與專心陪伴',space:'保有個人空間與界線',action:'用行動照顧與支持',commit:'穩定承諾與未來規劃',affection:'言語肯定與親密表達',growth:'彼此鼓勵一起成長'}
};
function compatibilityValueCard(title,man,woman,labels,question,action){
 const male=man?labels[man]:'尚未提供',female=woman?labels[woman]:'尚未提供';
 const reading=man&&woman?(man===woman?'你們填寫的偏好一致：'+male+'。這是目前提供的真實資訊，不是由命盤推定。':'你們填寫的偏好不同：男方偏「'+male+'」，女方偏「'+female+'」。差異可協商，不代表不合。'):'目前資料不足，無法僅憑八字判斷兩人真實的'+title+'。請面對面討論：'+question;
 return compatibilityCard(title,'實際選擇 · 男：'+male+'／女：'+female,reading,action);
}
function compatibilityPartner(prefix){
 const date=document.querySelector('#'+prefix+'-date').value;
 const now=new Date(),today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
 if(!date||date>today)throw new Error('invalid birth date');
 // Noon is used only to pick a date-based reference chart; the hour pillar is excluded.
 const pillars=getPillars(date,'12:00').slice(0,3),chart=analyzeChart(pillars);
 const early=getPillars(date,'00:30'),late=getPillars(date,'23:30');
 const timeSensitive=pillars.some(function(p,i){return p.s!==early[i].s||p.b!==early[i].b||p.s!==late[i].s||p.b!==late[i].b});
 return{name:document.querySelector('#'+prefix+'-name').value.trim()||(prefix==='male'?'男方':'女方'),pillars:pillars,chart:chart,timeSensitive:timeSensitive,day:stems[pillars[2].s]+chart.master,money:document.querySelector('#'+prefix+'-money').value,values:document.querySelector('#'+prefix+'-values').value,love:document.querySelector('#'+prefix+'-love').value};
}
function compatibilityChartMarkup(person,label){
 const names=['年柱','月柱','日柱'];
 return '<div class="compat-chart"><div class="compat-chart-head"><span>'+label+'</span><strong>'+compatibilityEscape(person.name)+'</strong><small>日主 '+compatibilityEscape(person.day)+'</small></div><div class="compat-pillars">'+person.pillars.map(function(p,i){return '<div class="compat-pillar"><small>'+names[i]+'</small><b>'+stems[p.s]+branches[p.b]+'</b></div>'}).join('')+'</div><p class="compat-chart-note">未提供出生時刻，時柱不參與分析。'+(person.timeSensitive?'此日期的年月日柱可能因出生時刻而變動，以下僅供粗略參考。':'')+'</p></div>';
}
function compatibilityScore(man,woman){
 const mi=elementCycle.indexOf(man.chart.master),wi=elementCycle.indexOf(woman.chart.master);
 const dayMaster=mi===wi?24:((mi+1)%5===wi||(wi+1)%5===mi)?30:16;
 const dayRelation=compatibilityBranch(man.pillars[2].b,woman.pillars[2].b).label;
 const monthRelation=compatibilityBranch(man.pillars[1].b,woman.pillars[1].b).label;
 const branchPoints={六合:30,同支:24,'無直接沖合':18,六沖:8};
 const monthPoints={六合:20,同支:15,'無直接沖合':12,六沖:6};
 const complement=10+(man.chart.weak===woman.chart.strong?5:0)+(woman.chart.weak===man.chart.strong?5:0);
 const parts=[{label:'日主互動',value:dayMaster,max:30,note:man.day+' × '+woman.day},{label:'日支相處',value:branchPoints[dayRelation],max:30,note:dayRelation},{label:'月支節奏',value:monthPoints[monthRelation],max:20,note:monthRelation},{label:'五行互補',value:complement,max:20,note:'雙方強弱元素對照'}];
 return{total:parts.reduce(function(sum,part){return sum+part.value},0),parts:parts};
}
function compatibilityScoreMarkup(score){
 return '<div class="compat-score"><div class="compat-score-main"><span>三柱互動參考分</span><strong>'+score.total+'<small> / 100</small></strong><p>滿分 100，僅依年、月、日三柱的自訂規則計算；未納入時柱。不是交往成功率，也不代表關係好壞。</p></div><div class="compat-score-parts">'+score.parts.map(function(part){return '<div class="compat-score-part"><div><b>'+part.label+'</b><small>'+compatibilityEscape(part.note)+'</small><strong>'+part.value+' / '+part.max+'</strong></div><span class="compat-score-track"><i style="width:'+(part.value/part.max*100)+'%"></i></span></div>'}).join('')+'</div></div>';
}
function generateCompatibility(){
 const man=compatibilityPartner('male'),woman=compatibilityPartner('female'),relation=compatibilityBranch(man.pillars[2].b,woman.pillars[2].b);
 const score=compatibilityScore(man,woman);
 const me=elementCycle.indexOf(man.chart.master),we=elementCycle.indexOf(woman.chart.master);
 let elementRead='兩人的日主同屬'+man.chart.master+'，處理問題的基本語言可能相近；相似也會放大同一個盲點。';
 if((me+1)%5===we)elementRead='依五行相生，男方的'+man.chart.master+'可作為女方'+woman.chart.master+'的支持線索；現實中仍要確認支持是否被對方需要。';
 else if((we+1)%5===me)elementRead='依五行相生，女方的'+woman.chart.master+'可作為男方'+man.chart.master+'的支持線索；照顧不宜變成單方面承擔。';
 else if((me+2)%5===we||(we+2)%5===me)elementRead='兩個日主的五行存在相剋關係，傳統上表示處理方式有張力；它是討論分工的提示，不是關係好壞的判決。';
 else if(me!==we)elementRead='兩人的日主走不同路線，適合先講清楚各自習慣，再分配決策與執行。';
 const evidence=man.day+' × '+woman.day+'；男方主導'+man.chart.dominant+'，女方主導'+woman.chart.dominant;
 const dynamic=(me===we?'兩人日主同五行，容易理解彼此的出發點，但也可能同時卡在相似的盲點。':(me+1)%5===we||(we+1)%5===me?'日主呈相生，較容易找到互相支持的切入點；仍要確認付出是否對等。':'日主呈相剋，處理事情的節奏可能不同；先談規則與分工，比急著分對錯有用。');
 const branchNote=relation.label==='六沖'?'日支相沖，日常節奏值得多花時間對齊。':relation.label==='六合'?'日支相合，可觀察共同安排是否真的讓雙方都舒服。':relation.label==='同支'?'日支相同，熟悉感與相似的固執可能並存。':'日支無直接沖合，重點放在實際溝通與承諾。';
 const cards=[
  compatibilityCard('性格互動','日主：'+man.day+' × '+woman.day,elementRead+' 男方較常透過'+groupData[man.chart.dominant].label+'表現，女方較常透過'+groupData[woman.chart.dominant].label+'表現。','各自寫下遇到壓力時最想被怎樣對待；用一次最近的事件核對是否符合，不直接把命盤描述當事實。'),
  compatibilityCard('相處模式','日支：'+branches[man.pillars[2].b]+' × '+branches[woman.pillars[2].b]+' · '+relation.label,relation.copy,relation.action),
  compatibilityValueCard('金錢觀',man.money,woman.money,compatibilityChoices.money,'共同支出、個人可自由運用的錢與儲蓄目標如何分配？','先列共同固定支出、個人自由支出與儲蓄目標；各自寫一個可接受比例，再討論差距。'),
  compatibilityValueCard('生活型態',man.values,woman.values,compatibilityChoices.values,'平日作息、週末安排與家庭／社交時間怎麼分配？','各自排出理想的一週時間表，找出作息與獨處、社交需求落差最大的時段，先試行兩週。'),
  compatibilityValueCard('感情期待',man.love,woman.love,compatibilityChoices.love,'什麼互動最能讓你感到被愛，吵架後又希望怎麼修復？','各自說明最需要的一種關心方式，約定衝突後何時恢復對話；不要用自己的偏好代替對方的需求。')
 ];
 fill('#compatibility-summary','<div class="compat-result-head"><span>雙人三柱 · 互動總覽</span><h3>'+compatibilityEscape(man.name)+' × '+compatibilityEscape(woman.name)+'</h3><p>只依出生日期排年、月、日三柱；時柱未知且未納入分數。總分是命盤線索的整理，不是關係成敗的判決；生活偏好以你們填寫的實際選擇為準。</p></div>'+compatibilityScoreMarkup(score)+'<div class="compat-chart-grid">'+compatibilityChartMarkup(man,'男方')+compatibilityChartMarkup(woman,'女方')+'</div><div class="compat-verdict"><div><small>性格契合點</small><p>'+compatibilityEscape(dynamic)+'</p></div><div><small>相處提醒 · '+compatibilityEscape(relation.label)+'</small><p>'+compatibilityEscape(branchNote)+'</p></div></div><p class="compat-evidence">判讀依據：'+compatibilityEscape(evidence)+'；日支 '+branches[man.pillars[2].b]+' × '+branches[woman.pillars[2].b]+'。'+(man.timeSensitive||woman.timeSensitive?'提醒：至少一人出生於節氣或子時判讀可能交界的日期，沒有時間時分數可能不同。':'')+'</p>');
 fill('#compatibility-cards',cards.join(''));
 document.querySelector('#compatibility-result').hidden=false;
 document.querySelector('#compatibility-result').scrollIntoView({behavior:'smooth',block:'start'});
 return{malePillars:man.pillars.map(function(p){return stems[p.s]+branches[p.b]}),femalePillars:woman.pillars.map(function(p){return stems[p.s]+branches[p.b]}),dayBranchRelation:relation.label,score:score.total,scoreParts:score.parts};
}
document.querySelector('#compatibility-form').addEventListener('submit',function(event){event.preventDefault();try{generateCompatibility()}catch(e){alert('無法產生合盤，請確認兩人的出生日期。')}});
document.querySelector('.top-links a[href="#compatibility"]').addEventListener('click',function(){document.querySelector('#report').hidden=true;document.querySelector('.workbench').hidden=false;document.querySelector('.preview-strip').hidden=false;document.querySelector('#compatibility').hidden=false});
