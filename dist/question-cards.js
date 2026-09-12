(function(){
 'use strict';
 const cards=[
  {title:'先問清楚',icon:'✧',question:'你現在真正想解決的，是表面的選項，還是背後未說出口的需求？',action:'把問題改寫成一句可回答的句子，再列三個必須知道的事實。',risk:'別讓模糊焦慮替你做決定。'},
  {title:'小步試行',icon:'✿',question:'能否先做一個可撤回、成本低的小實驗？',action:'在七天內設計一個最多花兩小時的測試，記下實際回饋。',risk:'不要一開始就押上無法承受的代價。'},
  {title:'交換視角',icon:'◇',question:'如果重要的人也面臨相同情況，你會提醒他看見什麼？',action:'找一位願意提出不同意見的人，請他說出你最可能忽略的地方。',risk:'避免只蒐集支持原本想法的答案。'},
  {title:'設定邊界',icon:'▣',question:'什麼條件出現時，你就不再繼續投入？',action:'先寫下投入上限、停損訊號與重新評估日期。',risk:'不要讓沉沒成本變成繼續下去的唯一理由。'},
  {title:'資源盤點',icon:'◈',question:'你真正擁有的時間、金錢、關係和能力各有多少？',action:'列一張四欄清單，標出目前可使用的一項支援。',risk:'別把想像中的資源當成已到手的條件。'},
  {title:'等一個訊號',icon:'☼',question:'哪一個可觀察的訊號，會讓你更有把握？',action:'設定一個明確的觀察期限，到期就根據事實行動。',risk:'觀察不能變成無限拖延。'},
  {title:'打開對話',icon:'♡',question:'誰最需要知道你真正在意的是什麼？',action:'約一次 20 分鐘對話，先說感受，再提出具體請求。',risk:'不要期待對方能猜中沒有說出口的需求。'},
  {title:'回到主線',icon:'✦',question:'一年後回看，哪個選擇最符合你想成為的人？',action:'寫下最在意的三個價值，逐一對照眼前選項。',risk:'不要只因短期評價就放棄長期方向。'},
  {title:'把風險寫出來',icon:'☘',question:'最壞情況若發生，你能承受多少？',action:'分別列出最可能、最好與最壞情況，先準備一個退路。',risk:'避開「一定成功」或「一定失敗」的想像。'}
 ];
 const category={career:'工作／職涯',money:'金錢／資源',love:'關係／感情',decision:'重大選擇',other:'當前情境'};
 function escape(value){return String(value).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
 function hash(value){let n=2166136261;for(let i=0;i<value.length;i++){n^=value.charCodeAt(i);n=Math.imul(n,16777619)}return n>>>0}
 let deck=null,question='';
 document.querySelector('#question-card-form').addEventListener('submit',function(event){
  event.preventDefault();question=document.querySelector('#question-card-text').value.trim();if(question.length<8)return;
  const type=document.querySelector('#question-card-type').value,order=cards.map(function(_,i){return i});let seed=hash(question+type);
  for(let i=order.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1),temp=order[i];order[i]=order[j];order[j]=temp}
  deck={type:type,cards:order.slice(0,3).map(function(i){return cards[i]})};
  const target=document.querySelector('#question-card-deck');target.innerHTML='<p>針對「'+escape(category[type])+'」問題，直覺選一張卡。三張都蓋著，選後才翻開。</p>'+deck.cards.map(function(_,i){return'<button type="button" class="question-cover" data-card="'+i+'" aria-label="選擇第 '+(i+1)+' 張覆蓋牌"><span>✿</span><b>未翻開的卡</b><small>0'+(i+1)+'</small></button>'}).join('');target.hidden=false;document.querySelector('#question-card-result').hidden=true;
 });
 document.querySelector('#question-card-deck').addEventListener('click',function(event){
  const button=event.target.closest('button[data-card]');if(!button||!deck)return;
  const picked=deck.cards[Number(button.dataset.card)],result=document.querySelector('#question-card-result');
  document.querySelectorAll('#question-card-deck button').forEach(function(item){item.disabled=true;item.classList.toggle('is-picked',item===button)});
  result.innerHTML='<small>你選中的思考卡 · '+escape(category[deck.type])+'</small><div class="question-reveal-icon" aria-hidden="true">'+picked.icon+'</div><h4>'+picked.title+'</h4><p class="question-asked">你的問題：「'+escape(question)+'」</p><div><b>換個角度問</b><p>'+picked.question+'</p></div><div><b>接下來 7 天可做</b><p>'+picked.action+'</p></div><div><b>留意</b><p>'+picked.risk+'</p></div><p class="question-disclaimer">這張卡是自我反思提示，並非對問題結果的預測；重大醫療、法律或財務決策請尋求合格專業意見。</p><button type="button" id="question-again">重新洗牌</button>';
  result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'start'});
  document.querySelector('#question-again').addEventListener('click',function(){document.querySelector('#question-card-form').requestSubmit()});
 });
})();
