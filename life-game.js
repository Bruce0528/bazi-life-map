/* 八關圓夢卡牌：八字只決定起始角色與輕量共鳴，不預測現實結果。 */
(function(root){
 'use strict';
 const labels={energy:'精力',relations:'關係',wealth:'財富',achievement:'成就'};
 const stages=[
  {name:'探索起點',question:'一份穩定工作找上你，你心裡卻也一直想轉去新領域學新技能，這一步你會怎麼選？',cards:[
   {title:'第一份工作',story:'一家中型公司開出正職缺，薪水穩定，主管也答應讓你加入一個正在擴編、氣氛不錯的新團隊；只是升遷與加薪的節奏，都得照公司既定的制度走。',focus:'achievement',delta:{energy:-2,relations:2,wealth:5,achievement:10},action:'先談清楚工作內容與三個月學習目標'},
   {title:'再學一項技能',story:'你一直對另一個領域很有興趣，剛好有一套線上課程加實作班可以報名，但要自己排出時間、投入一筆學費，短期內也看不到明確的收入回報。',focus:'energy',delta:{energy:7,relations:1,wealth:-3,achievement:10},action:'用兩週做一個可展示的小作品'}]},
  {name:'建立節奏',question:'有一個會占用週末的額外收入機會，但你其實已經有點累了，你會怎麼選？',cards:[
   {title:'額外收入',story:'一位舊同事私訊你，問願不願意接一個為期三個月的兼職案子，報酬不錯，但工作時段幾乎都落在週末，會犧牲掉原本用來休息的時間。',focus:'wealth',delta:{energy:-6,relations:-2,wealth:15,achievement:8},action:'先設定工時上限與交付範圍'},
   {title:'休息與進度',story:'手邊的進度比原訂計畫慢了一些，你有點想加班趕上；但一位熟識的朋友看你臉色不太好，直接提醒你最近該停下來好好休息了。',focus:'energy',delta:{energy:13,relations:4,wealth:-2,achievement:4},action:'先刪掉一項低優先任務，保留完整休息'}]},
  {name:'合作連結',question:'一邊是異業合作的邀約，一邊是重要的人想找你好好談談，你會先回應哪一邊？',cards:[
   {title:'跨圈合作',story:'一位做著完全不同領域工作的朋友，主動邀你一起完成一個跨界專案；雙方各自負責不熟悉的一半，成果對兩人來說都是全新的嘗試。',focus:'relations',delta:{energy:-3,relations:14,wealth:5,achievement:9},action:'先寫清雙方分工與試行期限'},
   {title:'修補關係',story:'身邊一位重要的人私下跟你說，最近覺得你總是很忙、很難約，想找一個晚上，兩人好好把話說開。',focus:'relations',delta:{energy:5,relations:16,wealth:-2,achievement:2},action:'約一段不被打斷的時間，先聽後說'}]},
  {name:'選擇轉折',question:'升遷機會來了，但你也開始懷疑起目前的方向，這次你會怎麼選？',cards:[
   {title:'升遷邀請',story:'主管找你談話，願意讓你升到一個新的職位，收入會提高一截；但責任範圍也跟著變大，開始要對整個小組的成果負責。',focus:'achievement',delta:{energy:-7,relations:-2,wealth:13,achievement:14},action:'確認權限、資源與考核標準'},
   {title:'換一條路',story:'最近你越來越常懷疑目前這條路是不是真的適合自己，心裡有一個一直沒去試的方向，但現在轉換代表要放掉已經累積的一些東西，重新開始。',focus:'energy',delta:{energy:9,relations:2,wealth:-5,achievement:11},action:'先做一個月的小規模實驗'}]},
  {name:'跨出舒適圈',question:'一邊是把還不夠完美的作品公開，一邊是嘗試需求還不明朗的新市場，你會先跨出哪一步？',cards:[
   {title:'發表自己的作品',story:'你手上有一份還沒打磨到滿意的作品，但已經有一個公開分享的機會在等你；公開之後就會被外界看見與評論，好壞都攤在陽光下。',focus:'achievement',delta:{energy:-4,relations:8,wealth:3,achievement:15},action:'先拿可用版本給三個人看'},
   {title:'把握新市場',story:'有個原本沒接觸過的新市場對你的技能表現出興趣，但對方也還說不清楚具體要什麼，你得先花時間摸索需求，才知道值不值得投入。',focus:'wealth',delta:{energy:-6,relations:4,wealth:15,achievement:9},action:'用一個付費小案驗證需求'}]},
  {name:'承擔取捨',question:'家人需要你多花時間，手上的工作也到了該交棒的時候，你會先處理哪一件事？',cards:[
   {title:'家人需要支持',story:'家裡有人需要你多花時間陪伴或處理事情，時間點剛好卡在你原本排好的重要計畫上，勢必得調整優先順序，可能得延後或縮減原訂計畫。',focus:'relations',delta:{energy:3,relations:16,wealth:-3,achievement:4},action:'談好你能提供的時間與需要的支援'},
   {title:'團隊交接',story:'手上累積的工作已經多到一個人扛不住，是時候把一部分交給團隊裡的其他人；但這代表你得放手讓別人用不同於你的方式去做，也要承擔交接期間可能出的狀況。',focus:'energy',delta:{energy:10,relations:9,wealth:4,achievement:7},action:'選一項任務寫出交接標準'}]},
  {name:'重新布局',question:'資源多了一些，你會把經驗轉成新計畫，還是先留一手穩住現況？',cards:[
   {title:'第二人生計畫',story:'這幾年累積下來的經驗和人脈，讓你開始認真考慮把它們轉成一個新的作品、服務或副業；但這代表要撥出時間精力，從零開始建立新的東西。',focus:'achievement',delta:{energy:5,relations:5,wealth:8,achievement:13},action:'先試做一場分享或小型服務'},
   {title:'留下緩衝',story:'手上可運用的資源比之前寬裕了一些，你可以趁勢加碼投入衝一波，也可以先把這筆餘裕留成緩衝，讓自己在接下來的不確定裡有更多轉圜空間。',focus:'wealth',delta:{energy:8,relations:3,wealth:15,achievement:4},action:'寫下緩衝金與下一步的投入上限'}]},
  {name:'圓夢終點',question:'旅程只剩最後一段時間，你會把它留給完成代表作，還是留給重要的人？',cards:[
   {title:'完成代表作',story:'距離這趟旅程的終點只剩最後一段時間，手上那個一直想做好的重要作品，也到了非交出去不可的時候，即使它還不是你心目中最完美的樣子。',focus:'achievement',delta:{energy:-3,relations:6,wealth:6,achievement:16},action:'訂公開日期，完成最小可交付版本'},
   {title:'和重要的人分享成果',story:'回頭看這段旅程走過的路，你發現真正想在最後留住的，或許不是再多做出一點成果，而是找一個安靜的時刻，把這段歷程好好分享給一路陪你走來的人。',focus:'relations',delta:{energy:6,relations:16,wealth:5,achievement:7},action:'安排一次不談績效的真誠對話'}]}
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
