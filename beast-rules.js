/* 命格獸與能力值是本站的遊戲規則，不是傳統八字的固定分類或心理測驗。 */
(function(root){
 'use strict';
 const profiles=[
  {id:'snowleopard',name:'雪豹',icon:'🐆',role:'決斷型',gift:'看清局勢後，能果斷做出決定並收尾',shadow:'原則守得太緊時，會少一點彈性',talents:['決斷','秩序','原則'],accent:'#8fa8c2',weights:{金:.34,木:.06,官殺:.22,比劫:.08},strong:4},
  {id:'woodbird',name:'木鳥',icon:'🐦',role:'成長型',gift:'順著自己的節奏成長，也願意照顧身邊的人',shadow:'心太軟時，容易被別人的情緒拖著走',talents:['溫暖','成長','仁慈'],accent:'#7fae5e',weights:{木:.34,水:.06,印星:.20,食傷:.10}},
  {id:'seaturtle',name:'海龜',icon:'🐢',role:'包容型',gift:'想得長遠，也能包容不同的意見',shadow:'太求周全時，行動會慢下來',talents:['聰明','流動','包容'],accent:'#4f97b0',weights:{水:.34,土:.08,印星:.18,財星:.10},balanced:5},
  {id:'firetiger',name:'火虎',icon:'🐯',role:'行動型',gift:'熱情能帶動場面，也敢直接動手創造',shadow:'衝太快時，容易忽略細節',talents:['熱情','行動','創造'],accent:'#d9633f',weights:{火:.34,木:.08,食傷:.20,比劫:.10},strong:6},
  {id:'stonedog',name:'石狗',icon:'🐕',role:'踏實型',gift:'穩定可靠，讓人放心把事情交給你',shadow:'變動來得太快時，需要多一點時間適應',talents:['穩定','踏實','信賴'],accent:'#b3946a',weights:{土:.34,金:.06,印星:.16,官殺:.10},balanced:6},
  {id:'moonwolf',name:'月狼',icon:'🐺',role:'內斂型',gift:'安靜觀察，想得比說得更深更遠',shadow:'心事太多時，不容易主動開口求助',talents:['敏銳','直覺','深思'],accent:'#5f6699',weights:{水:.20,木:.08,印星:.22,食傷:.06},weak:8},
  {id:'lightrabbit',name:'光兔',icon:'🐇',role:'領導型',gift:'外放的能量能感染身邊的人一起往前',shadow:'太急著表現時，容易忽略別人的步調',talents:['開朗','領導','感染力'],accent:'#e0ac3a',weights:{火:.18,金:.10,比劫:.20,官殺:.14},strong:8},
  {id:'panda',name:'熊貓',icon:'🐼',role:'調和型',gift:'能在不同立場間找到平衡與共識',shadow:'太想面面俱到時，決定會拖比較久',talents:['平衡','整合','共生'],accent:'#4f8a63',weights:{土:.20,水:.10,印星:.16,財星:.10},balanced:8}
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
