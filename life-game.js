/* 八關圓夢卡牌：八字只決定起始角色與輕量共鳴，不預測現實結果。 */
(function(root){
 'use strict';
 const labels={energy:'精力',relations:'關係',wealth:'財富',achievement:'成就'};
 const stages=[
  {name:'探索起點',cards:[
   {title:'第一份工作',story:'一份穩定工作和一個有成長空間的新團隊同時找上你。',focus:'achievement',delta:{energy:-2,relations:2,wealth:5,achievement:10},action:'先談清楚工作內容與三個月學習目標'},
   {title:'再學一項技能',story:'你想轉向新的領域，需要安排時間與一筆學習預算。',focus:'energy',delta:{energy:7,relations:1,wealth:-3,achievement:10},action:'用兩週做一個可展示的小作品'}]},
  {name:'建立節奏',cards:[
   {title:'額外收入',story:'新的接案邀請到來，但也會占用週末。',focus:'wealth',delta:{energy:-6,relations:-2,wealth:15,achievement:8},action:'先設定工時上限與交付範圍'},
   {title:'休息與進度',story:'進度有點落後，朋友卻提醒你最近太疲憊。',focus:'energy',delta:{energy:13,relations:4,wealth:-2,achievement:4},action:'先刪掉一項低優先任務，保留完整休息'}]},
  {name:'合作連結',cards:[
   {title:'跨圈合作',story:'一位不同領域的夥伴邀你共同完成專案。',focus:'relations',delta:{energy:-3,relations:14,wealth:5,achievement:9},action:'先寫清雙方分工與試行期限'},
   {title:'修補關係',story:'重要的人覺得你總是太忙，想好好談一次。',focus:'relations',delta:{energy:5,relations:16,wealth:-2,achievement:2},action:'約一段不被打斷的時間，先聽後說'}]},
  {name:'選擇轉折',cards:[
   {title:'升遷邀請',story:'職位升級，責任與收入同時增加。',focus:'achievement',delta:{energy:-7,relations:-2,wealth:13,achievement:14},action:'確認權限、資源與考核標準'},
   {title:'換一條路',story:'你開始懷疑目前方向，想試一條更符合自己的路。',focus:'energy',delta:{energy:9,relations:2,wealth:-5,achievement:11},action:'先做一個月的小規模實驗'}]},
  {name:'跨出舒適圈',cards:[
   {title:'發表自己的作品',story:'你有一個尚未完美的成果，可以公開給別人看。',focus:'achievement',delta:{energy:-4,relations:8,wealth:3,achievement:15},action:'先拿可用版本給三個人看'},
   {title:'把握新市場',story:'一個新市場對你的技能有興趣，但需求還不明確。',focus:'wealth',delta:{energy:-6,relations:4,wealth:15,achievement:9},action:'用一個付費小案驗證需求'}]},
  {name:'承擔取捨',cards:[
   {title:'家人需要支持',story:'家人需要你投入時間，原本安排好的計畫必須調整。',focus:'relations',delta:{energy:3,relations:16,wealth:-3,achievement:4},action:'談好你能提供的時間與需要的支援'},
   {title:'團隊交接',story:'手上的工作越來越多，是時候讓別人一起承擔。',focus:'energy',delta:{energy:10,relations:9,wealth:4,achievement:7},action:'選一項任務寫出交接標準'}]},
  {name:'重新布局',cards:[
   {title:'第二人生計畫',story:'你想把累積的經驗轉成新的作品或服務。',focus:'achievement',delta:{energy:5,relations:5,wealth:8,achievement:13},action:'先試做一場分享或小型服務'},
   {title:'留下緩衝',story:'手上資源增加了，你可以選擇加速，也可以先穩住底盤。',focus:'wealth',delta:{energy:8,relations:3,wealth:15,achievement:4},action:'寫下緩衝金與下一步的投入上限'}]},
  {name:'圓夢終點',cards:[
   {title:'完成代表作',story:'只剩最後一段時間，你要把一個重要作品真正交出去。',focus:'achievement',delta:{energy:-3,relations:6,wealth:6,achievement:16},action:'訂公開日期，完成最小可交付版本'},
   {title:'和重要的人分享成果',story:'回頭看這段旅程，你想把時間與成果留給誰？',focus:'relations',delta:{energy:6,relations:16,wealth:5,achievement:7},action:'安排一次不談績效的真誠對話'}]}
 ];
 const affinity={snowleopard:'achievement',woodbird:'relations',seaturtle:'wealth',firetiger:'energy',stonedog:'achievement',moonwolf:'energy',lightrabbit:'relations',panda:'wealth'};
 function clamp(n){return Math.max(0,Math.min(100,Math.round(n)))}
 function initialStats(c){return{energy:clamp(28+c.stability*.25),relations:clamp(28+c.social*.25),wealth:clamp(28+c.wealth*.25),achievement:clamp(28+c.action*.25)}}
 function create(reading){return{reading:reading,round:0,stats:initialStats(reading.capabilities),history:[],phase:'choose'}}
 function choose(state,index){
  if(state.phase!=='choose'||![0,1].includes(index))throw Error('請先選擇一張情境卡');
  const stage=stages[state.round],card=stage.cards[index],beast=state.reading.beastMatch.primary.profile,bonus=affinity[beast.id]===card.focus?3:0;
  const before=Object.assign({},state.stats);
  Object.entries(card.delta).forEach(function(pair){state.stats[pair[0]]=clamp(state.stats[pair[0]]+pair[1])});
  if(bonus)state.stats[card.focus]=clamp(state.stats[card.focus]+bonus);
  const result={round:state.round+1,stage:stage.name,card:card,index:index,before:before,after:Object.assign({},state.stats),resonance:bonus,average:score(state.stats)};
  state.history.push(result);state.phase='result';return result;
 }
 function next(state){if(state.phase!=='result')throw Error('請先完成本關');state.round++;state.phase=state.round===8?'done':'choose';return state.phase}
 function score(stats){return Math.round(Object.values(stats).reduce(function(sum,value){return sum+value},0)/4)}
 function summary(state){if(state.phase!=='done')throw Error('尚未完成八關');return{score:score(state.stats),breakout:score(state.stats)>80,stats:Object.assign({},state.stats),history:state.history.slice()}}
 root.BaziLifeGame={stages:stages,labels:labels,affinity:affinity,create:create,choose:choose,next:next,score:score,summary:summary};
 if(typeof module!=='undefined'&&module.exports)module.exports={BaziLifeGame:root.BaziLifeGame};
})(typeof window==='undefined'?globalThis:window);
