(function(root){
 'use strict';
 const types={opportunity:{name:'機會',icon:'✦'},resources:{name:'資源',icon:'◈'},connection:{name:'連結',icon:'♡'},recovery:{name:'修整',icon:'☘'}};
 const board=['opportunity','resources','connection','recovery','opportunity','connection','resources','recovery','opportunity','resources','connection','recovery'];
 const cards=[
  {id:'portfolio',type:'opportunity',title:'把作品拿到圈外',story:'有人邀你展示一項技能，但準備時間只有一週。',metric:'agency',target:68,mission:'完成一份能讓陌生人看懂的作品介紹',choices:{a:{label:'做小版本並請三人試看',delta:{energy:-6,resources:2,relations:5,agency:12}},b:{label:'等內容完美再公開',delta:{energy:-3,resources:0,relations:0,agency:2}}}},
  {id:'proposal',type:'opportunity',title:'跨領域邀約',story:'陌生團隊邀你試做一個月合作，成果與分工都還不清楚。',metric:'agency',target:65,mission:'拿到可驗證的小合作，而非空泛承諾',choices:{a:{label:'先談交付範圍與退出條件',delta:{energy:-4,resources:3,relations:6,agency:10}},b:{label:'立即答應全部需求',delta:{energy:-12,resources:7,relations:2,agency:-7}}}},
  {id:'trial',type:'opportunity',title:'新技能試水溫',story:'一項新工具可能改善工作，但你只有有限的空檔。',metric:'agency',target:64,mission:'用一個真實小問題測試新技能',choices:{a:{label:'安排兩小時做可交付實驗',delta:{energy:-5,resources:2,relations:0,agency:11}},b:{label:'只收藏教學等有空再學',delta:{energy:2,resources:0,relations:0,agency:1}}}},
  {id:'buffer',type:'resources',title:'意外支出',story:'原本預定投入進修的預算，突然碰上設備修繕。',metric:'resources',target:64,mission:'保住基本緩衝，同時不完全停止學習',choices:{a:{label:'分期安排並縮小學習計畫',delta:{energy:-3,resources:9,relations:1,agency:4}},b:{label:'照原計畫一次花完',delta:{energy:-5,resources:-11,relations:0,agency:2}}}},
  {id:'pricing',type:'resources',title:'第一次報價',story:'有人想付費買你的服務，但需求可能越做越多。',metric:'resources',target:67,mission:'寫出報價、交付項目與修改次數',choices:{a:{label:'先列範圍，再報試行價格',delta:{energy:-5,resources:12,relations:3,agency:5}},b:{label:'先免費做完再看對方心意',delta:{energy:-9,resources:-5,relations:2,agency:-4}}}},
  {id:'reserve',type:'resources',title:'收入突然增加',story:'一筆額外收入進帳，你同時想慶祝與投資下一步。',metric:'resources',target:68,mission:'訂出可執行的三筆資金分配',choices:{a:{label:'先留緩衝、再分學習與享受',delta:{energy:3,resources:10,relations:2,agency:3}},b:{label:'立即把全部押在新想法上',delta:{energy:-7,resources:-10,relations:-2,agency:4}}}},
  {id:'mentor',type:'connection',title:'請教圈外前輩',story:'你想認識一位不同領域的前輩，但不知道如何開口。',metric:'relations',target:65,mission:'提出具體問題並完成一次交流',choices:{a:{label:'寫三句自介和一個明確問題',delta:{energy:-3,resources:1,relations:12,agency:3}},b:{label:'只按讚，等對方主動聯繫',delta:{energy:1,resources:0,relations:1,agency:-1}}}},
  {id:'boundaries',type:'connection',title:'合作分工卡住',story:'夥伴期待你多做一點，你卻開始感到失衡。',metric:'relations',target:66,mission:'把彼此期待轉成可確認的分工',choices:{a:{label:'約 20 分鐘釐清責任與時程',delta:{energy:-3,resources:2,relations:11,agency:4}},b:{label:'先忍下來，避免破壞氣氛',delta:{energy:-8,resources:0,relations:-5,agency:-5}}}},
  {id:'community',type:'connection',title:'加入新社群',story:'一個主題社群能讓你遇見不同背景的人，但你需要主動參與。',metric:'relations',target:66,mission:'帶著一項可分享的經驗建立雙向連結',choices:{a:{label:'分享一次實作心得並回應他人',delta:{energy:-5,resources:1,relations:12,agency:4}},b:{label:'只默默瀏覽不留下交流',delta:{energy:0,resources:0,relations:2,agency:0}}}},
  {id:'rest',type:'recovery',title:'排滿的行事曆',story:'連續幾週都在趕進度，下一個邀約又來了。',metric:'energy',target:65,mission:'保住下週能穩定行動的時間',choices:{a:{label:'刪去低優先事項，保留休息時段',delta:{energy:12,resources:-2,relations:1,agency:5}},b:{label:'全部答應，再靠週末補進度',delta:{energy:-12,resources:4,relations:2,agency:-4}}}},
  {id:'review',type:'recovery',title:'計畫沒有達標',story:'一項嘗試的結果不如預期，繼續硬推或調整都需要勇氣。',metric:'energy',target:64,mission:'做一次可行的復盤，而非自責',choices:{a:{label:'記錄一個保留點與一個待改點',delta:{energy:9,resources:2,relations:1,agency:5}},b:{label:'再熬夜加做一輪相同方法',delta:{energy:-10,resources:-2,relations:-1,agency:-2}}}},
  {id:'routine',type:'recovery',title:'建立穩定節奏',story:'你已找到方向，但每天的零碎急事不斷打斷進度。',metric:'energy',target:65,mission:'設計下週可重複的行動節奏',choices:{a:{label:'每天固定留 30 分鐘深度時段',delta:{energy:10,resources:3,relations:0,agency:6}},b:{label:'有空再做，不設定固定時段',delta:{energy:1,resources:0,relations:0,agency:-2}}}}
 ];
 const byType=Object.keys(types).reduce(function(map,type){map[type]=cards.filter(function(card){return card.type===type});return map},{});
 const labels={energy:'精力',resources:'資源',relations:'關係',agency:'自主'};
 function clamp(n){return Math.max(0,Math.min(100,n))}
 function create(reading){return{reading:reading,round:0,position:0,stats:{energy:50,resources:50,relations:50,agency:50},completed:0,history:[],phase:'roll',current:null}}
 function roll(state,die){
  if(state.phase!=='roll'||!Number.isInteger(die)||die<1||die>6)throw Error('此回合無法擲骰');
  state.position=(state.position+die)%board.length;
  const type=board[state.position],pool=byType[type],used=state.history.map(function(item){return item.card.id});
  const start=(state.round+die+state.position)%pool.length;
  let card=pool[start];for(let i=0;i<pool.length;i++){const candidate=pool[(start+i)%pool.length];if(!used.includes(candidate.id)){card=candidate;break}}
  state.current={die:die,type:type,card:card,station:state.reading.lifeGameStations[state.round]};state.phase='card';return state.current;
 }
 function resolve(state,key){
  if(state.phase!=='card'||!['a','b'].includes(key))throw Error('請先擲骰並選擇行動');
  const turn=state.current,choice=turn.card.choices[key];
  Object.keys(state.stats).forEach(function(metric){state.stats[metric]=clamp(state.stats[metric]+(choice.delta[metric]||0))});
  const score=state.stats[turn.card.metric]+turn.die*3,success=score>=turn.card.target;
  const outcome={round:state.round+1,position:state.position,card:turn.card,station:turn.station,die:turn.die,choice:choice,score:score,success:success};
  if(success)state.completed++;
  state.history.push(outcome);state.phase='outcome';return outcome;
 }
 function next(state){if(state.phase!=='outcome')throw Error('請先完成任務');state.round++;state.current=null;state.phase=state.round===8?'done':'roll';return state.phase}
 function summary(state){if(state.phase!=='done')throw Error('尚未完成八回合');return{breakout:state.completed>=5&&Object.values(state.stats).every(function(value){return value>=35}),completed:state.completed,stats:state.stats,history:state.history}}
 function randomDie(){if(root.crypto&&root.crypto.getRandomValues){const a=new Uint32Array(1),limit=4294967296-(4294967296%6);do{root.crypto.getRandomValues(a)}while(a[0]>=limit);return a[0]%6+1}return Math.floor(Math.random()*6)+1}
 root.BaziLifeGame={types:types,board:board,cards:cards,labels:labels,create:create,roll:roll,resolve:resolve,next:next,summary:summary,randomDie:randomDie};
 if(typeof module!=='undefined'&&module.exports)module.exports={BaziLifeGame:root.BaziLifeGame};
})(typeof window==='undefined'?globalThis:window);
