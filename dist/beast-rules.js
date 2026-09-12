/* 命格獸與能力值是本站的遊戲規則，不是傳統八字的固定分類或心理測驗。 */
(function(root){
 'use strict';
 const profiles=[
  {id:'tiger',name:'虎',icon:'🐯',role:'行動型',gift:'敢開局、能帶人往前',shadow:'衝太快時忽略成本',talents:['決斷','開創','帶領'],accent:'#db8754',weights:{火:.34,木:.12,比劫:.24,食傷:.12},strong:8},
  {id:'wolf',name:'狼',icon:'🐺',role:'目標型',gift:'能把遠方的目標拆成路線',shadow:'容易把難題一個人扛',talents:['企圖心','規劃','承擔'],accent:'#827eae',weights:{火:.13,金:.16,官殺:.30,財星:.22},strong:4},
  {id:'fox',name:'狐',icon:'🦊',role:'策略型',gift:'觀察後找到更省力的路',shadow:'算得太久會錯過試驗時機',talents:['變通','談判','判讀'],accent:'#db9b5f',weights:{水:.30,木:.08,財星:.20,食傷:.16},weak:5},
  {id:'eagle',name:'鷹',icon:'🦅',role:'洞察型',gift:'看見長線與隱藏的連結',shadow:'可能等到全部想清楚才行動',talents:['洞察','專注','遠見'],accent:'#7e9eab',weights:{水:.24,金:.22,印星:.27,官殺:.07}},
  {id:'bear',name:'熊',icon:'🐻',role:'穩定型',gift:'把動盪中的事情接住',shadow:'安全感被挑戰時會延後改變',talents:['耐力','照顧','落地'],accent:'#b39a72',weights:{土:.35,印星:.18,官殺:.13},balanced:8},
  {id:'leopard',name:'豹',icon:'🐆',role:'自由型',gift:'能快速切換路線並獨立完成',shadow:'太多束縛時容易直接離開',talents:['爆發','獨立','應變'],accent:'#bd9c79',weights:{火:.20,金:.20,食傷:.23,比劫:.18},strong:4},
  {id:'rabbit',name:'兔',icon:'🐇',role:'共感型',gift:'理解人心並建立安心的連結',shadow:'太在乎感受時難以說不',talents:['共感','協調','傾聽'],accent:'#c69bb0',weights:{木:.26,水:.10,印星:.24,食傷:.12},weak:5},
  {id:'turtle',name:'龜',icon:'🐢',role:'累積型',gift:'用耐心換取長期複利',shadow:'可能把準備當成唯一的安全感',talents:['累積','節奏','守成'],accent:'#78a39a',weights:{土:.23,水:.22,財星:.18,印星:.17},balanced:6}
 ];
 const elements=['木','火','土','金','水'],gods=['比劫','食傷','財星','官殺','印星'];
 function clamp(v){return Math.min(100,Math.max(0,Math.round(v)))}
 function normalize(source,keys){const total=keys.reduce(function(sum,key){return sum+(Number(source[key])||0)},0)||1;return Object.fromEntries(keys.map(function(key){return[key,(Number(source[key])||0)/total*100]}))}
 function classify(chart){
  const e=normalize(chart.counts,elements),g=normalize(chart.gods,gods);
  const ranked=profiles.map(function(profile){
   let raw=38;Object.entries(profile.weights).forEach(function(pair){raw+=1.8*(e[pair[0]]||g[pair[0]]||0)*pair[1]});
   if(chart.strength==='身偏強')raw+=profile.strong||0;
   if(chart.strength==='身偏弱')raw+=profile.weak||0;
   if(chart.strength==='中和')raw+=profile.balanced||0;
   return{profile:profile,fit:clamp(raw)};
  }).sort(function(a,b){return b.fit-a.fit||profiles.indexOf(a.profile)-profiles.indexOf(b.profile)});
  const leadingElement=elements.slice().sort(function(a,b){return e[b]-e[a]})[0],leadingGod=gods.slice().sort(function(a,b){return g[b]-g[a]})[0];
  return{primary:ranked[0],secondary:ranked[1],ranked:ranked,elements:e,gods:g,evidence:'五行以「'+leadingElement+'」較顯著、十神以「'+leadingGod+'」較顯著，整體強弱為「'+chart.strength+'」。八獸符合度由這三組資料加權，並非生肖、命定人格或成功機率。'};
 }
 function capabilities(chart){const e=normalize(chart.counts,elements),g=normalize(chart.gods,gods);return{
  action:clamp(35+e.火*.55+e.木*.25+g.食傷*.20+g.比劫*.15),
  insight:clamp(35+e.水*.55+e.金*.20+g.印星*.25),
  social:clamp(35+e.木*.40+e.火*.20+g.比劫*.10+g.食傷*.20),
  stability:clamp(35+e.土*.50+e.金*.25+g.官殺*.20),
  wealth:clamp(35+e.金*.25+e.土*.15+g.財星*.55),
  emotion:clamp(35+e.木*.25+e.水*.30+g.印星*.20)
 }}
 root.BaziBeasts={profiles:profiles,classify:classify,capabilities:capabilities,normalize:normalize};
 if(typeof module!=='undefined'&&module.exports)module.exports={BaziBeasts:root.BaziBeasts};
})(typeof window==='undefined'?globalThis:window);
