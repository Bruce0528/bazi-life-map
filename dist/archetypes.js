/* 八種角色是本站的遊戲化詮釋，不是傳統命理的固定分類。 */
(function(root){
 const profiles=[
  {id:'metal',element:'金',name:'鋼牙',theme:'界線與守護',gift:'先看清規則，再把重要的人事物守好。',watch:'標準太高時，記得給自己和別人留一點試錯空間。',x:'0%',y:'0%',row:'top'},
  {id:'wood',element:'木',name:'木羽',theme:'生長與修復',gift:'把新的想法慢慢養成能落地的成果。',watch:'照顧別人之前，也要確認自己的時間與界線。',x:'33.333%',y:'0%',row:'top'},
  {id:'water',element:'水',name:'潮龜',theme:'流動與適應',gift:'觀察局勢、換一條路，也能抵達想去的地方。',watch:'蒐集資訊後，替自己訂一個開始行動的日期。',x:'66.667%',y:'0%',row:'top'},
  {id:'fire',element:'火',name:'烈虎',theme:'熱情與行動',gift:'把想做的事點燃，也讓身邊的人看見可能。',watch:'衝刺之間安排恢復，讓熱度能持續。',x:'100%',y:'0%',row:'top'},
  {id:'earth',element:'土',name:'岩犬',theme:'穩固與承擔',gift:'在變動中把事情接穩，做出可信賴的節奏。',watch:'不是每件事都需要獨自扛；練習請求支援。',x:'0%',y:'82%',row:'bottom'},
  {id:'yin',element:'陰',name:'夜狼',theme:'內觀與洞察',gift:'留心微小訊號，從安靜思考中找到下一步。',watch:'想清楚之後，試著把需要直接說出口。',x:'33.333%',y:'82%',row:'bottom'},
  {id:'yang',element:'陽',name:'光兔',theme:'表達與帶領',gift:'主動提出方向，替一群人打開行動的入口。',watch:'決定前先聽一輪不同意見，影響力會更穩。',x:'66.667%',y:'82%',row:'bottom'},
  {id:'harmony',element:'和',name:'墨熊',theme:'平衡與整合',gift:'看見不同立場，找到可以共同前進的節奏。',watch:'協調大家時，也別讓自己的需求消失。',x:'100%',y:'82%',row:'bottom'}
 ];
 const byId=Object.fromEntries(profiles.map(function(p){return[p.id,p]}));
 const elementId={金:'metal',木:'wood',水:'water',火:'fire',土:'earth'};
 function choose(chart){
  const values=Object.values(chart.counts),total=values.reduce(function(a,b){return a+b},0);
  const spread=total?(Math.max.apply(null,values)-Math.min.apply(null,values))/total:1;
  const yin=chart.stemIndices.filter(function(n){return n%2===1}).length;
  const yang=chart.stemIndices.length-yin;
  let id=elementId[chart.dayElement],why='你的日主屬「'+chart.dayElement+'」，角色先以日主五行為主，而非只看哪一行數量最多。';
  if(chart.strength==='中和'&&spread<=.18){id='harmony';why='命盤判為「中和」，五行最大與最小的差距約占總量 '+Math.round(spread*100)+'%，因此以整合型的墨熊作為遊戲角色。'}
  else if(chart.dayStemIndex%2===1&&yin>=3){id='yin';why='日主為陰干，四個天干中有 '+yin+' 個陰干，因此以夜狼作為遊戲角色。'}
  else if(chart.dayStemIndex%2===0&&yang>=3){id='yang';why='日主為陽干，四個天干中有 '+yang+' 個陽干，因此以光兔作為遊戲角色。'}
  return{profile:byId[id],why:why,detail:'日主 '+chart.dayMaster+' · '+chart.strength+' · 天干陰 '+yin+'／陽 '+yang+'；此為本站設計的角色對應，不是八字定論。'};
 }
 function art(profile,extraClass){return'<span class="ip-art ip-art--'+profile.row+(extraClass?' '+extraClass:'')+'" style="--ip-x:'+profile.x+';--ip-y:'+profile.y+'" role="img" aria-label="'+profile.element+' · '+profile.name+'角色插畫"></span>'}
 function render(matched,selectedId){
  const p=byId[selectedId]||matched.profile;
  const isRecommended=p.id===matched.profile.id;
  const reason=isRecommended?matched.why:'你自行選擇了「'+p.name+'」；命盤原本推薦「'+matched.profile.name+'」。改選只影響遊戲角色，不會改變命盤與十年大運。';
  const selected=document.querySelector('#ip-selected');
  if(!selected)return;
  selected.innerHTML='<div class="ip-hero-art">'+art(p,'ip-art--hero')+'</div><div class="ip-hero-copy"><span class="ip-kicker">'+(isRecommended?'命盤推薦':'自行選擇')+' · '+p.element+'</span><h3>你的旅途夥伴：'+p.name+'</h3><p class="ip-theme">'+p.theme+'</p><p>'+p.gift+'</p><div class="ip-watch"><b>一起練習</b><span>'+p.watch+'</span></div><p class="ip-evidence">'+reason+'</p><small>'+matched.detail+'</small></div>';
  document.querySelector('#ip-gallery').innerHTML=profiles.map(function(item){return'<button type="button" class="ip-mini'+(item.id===p.id?' is-selected':'')+'" data-ip="'+item.id+'" aria-pressed="'+(item.id===p.id)+'" aria-label="選擇'+item.name+(item.id===matched.profile.id?'，命盤推薦':'')+'">'+art(item,'ip-art--mini')+'<b>'+item.name+'</b><small>'+item.element+(item.id===matched.profile.id?' · 推薦':'')+'</small></button>'}).join('');
 }
 root.BaziIps={profiles:profiles,choose:choose,art:art,render:render};
})(window);
